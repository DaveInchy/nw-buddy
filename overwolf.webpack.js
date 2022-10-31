const
  path    = require('path'),
  fs      = require('fs'),
  semver  = require('semver'),
  zip     = require('zip-a-folder');

const handleErrors = (error, compilation) => {
  error = new Error(error)
  compilation.errors.push(error);
  throw error;
};

const PluginName = 'OverwolfPlugin';

module.exports = class OverwolfPlugin {
  version;
  constructor(env) {
    this.env = env

    const
      packagePath = path.resolve(__dirname, './package.json'),
      manifestPath = path.resolve(__dirname, './public/manifest.json');

    const
      pkg = this.readFile(packagePath),
      manifest = this.readFile(manifestPath);

    if ( !pkg )
      throw 'could not read package.json';

    if ( !manifest )
      throw 'could not read manifest.json';

    var version = pkg.version;

    var newDate = new Date();
    var release = newDate.getUTCFullYear();
    var major = newDate.getUTCMonth() + 1;
    var minor = newDate.getUTCDate();
    var revision = newDate.getUTCHours();
    var build = newDate.getUTCMinutes();
    var newVersion = `0.${release.toString().split(20)[1]}.${major}${minor}`;

    this.version = newVersion === version ? `${newVersion}.revision-${revision}.build-${build}` : `${newVersion}`;
  }
  apply(compiler) {
    compiler.hooks.run.tapPromise(PluginName, async (compilation) => {
      try {

        if ( this.version && semver.valid(this.version) ) {
          await this.setVersion(this.version);
        }

      } catch(e) {
        handleErrors(e, compilation);
      }
    });
    compiler.hooks.afterEmit.tapPromise(PluginName, async (compilation) => {
      try {
        const makeOpk = this.env.makeOpk;

        if ( makeOpk ) {
          await this.makeOPK();
        }

      } catch(e) {
        handleErrors(e, compilation);
      }
    });
  }

  async makeOPK(suffix = undefined) {
    const
      packagePath = path.resolve(__dirname, './package.json'),
      manifestPath = path.resolve(__dirname, './public/manifest.json')

    const [
      pkg,
      manifest
    ] = await Promise.all([
      this.readFile(packagePath),
      this.readFile(manifestPath)
    ]);

    if ( !pkg )
      throw 'could not read package.json';

    if ( !manifest )
      throw 'could not read manifest.json';

    const version = pkg.version, name = pkg.name,
    opkPath = path.join(__dirname, `releases/${name}_${version}${(suffix) ? `.${suffix}` : ''}.opk`),
    distPath = path.join(__dirname, 'dist/');

    await this.deleteFile(opkPath);
    await zip.zip(distPath, opkPath);
  }

  async setVersion(newVersion) {
    const packagePath = path.resolve(__dirname, './package.json'),
    manifestPath = path.resolve(__dirname, './public/manifest.json');

    const [
      pkg,
      manifest
    ] = await Promise.all([
      this.readFile(packagePath),
      this.readFile(manifestPath)
    ]);

    if ( !pkg )
      throw 'could not read package.json';

    if ( !manifest )
      throw 'could not read manifest.json';

    const
      version = pkg.version,
      name = pkg.name;

    this.version = newVersion;

    pkg.version = newVersion;
    manifest.meta.version = newVersion;

    const pkgJSON = JSON.stringify(pkg, null, '  '),
    manifestJSON = JSON.stringify(manifest, null, '  ');

    await Promise.all([
      this.writeFile(packagePath, pkgJSON),
      this.writeFile(manifestPath, manifestJSON)
    ]);
  }

  readFile(filePath) { return new Promise(resolve => {
    fs.readFile(filePath, (err, response) => {
      try {
        if ( err )
          resolve(null);
        else
          resolve(JSON.parse(response));
      } catch(e) {
        resolve(null);
      }
    });
  })}

  writeFile(filePath, content) { return new Promise(resolve => {
    fs.writeFile(filePath, content, resolve);
  })}

  deleteFile(filePath) { return new Promise(resolve => {
    fs.unlink(filePath, resolve);
  })}
}
