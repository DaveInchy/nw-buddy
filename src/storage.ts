export default class StorageInterface
{

    private static getStorage(isPersistent: boolean = true): Storage
    {
        return isPersistent ? localStorage : sessionStorage;
    }

    public static get(key: string): any
    {
        return this.getStorage().getItem(key);
    }

    public static set(key: string, value: any): void
    {
        return this.getStorage().setItem(key, value);
    }

    public static remove(key: string): void
    {
        return this.getStorage().removeItem(key);
    }

    public static clear(): void
    {
        return this.getStorage().clear();
    }

    public static getAll(): [string, any][]
    {
        return Object.entries(this.getStorage());
    }

    public static getAllKeys(): string[]
    {
        return Object.keys(this.getStorage());
    }

    public static getAllValues(): any[]
    {
        return Object.values(this.getStorage());
    }
}