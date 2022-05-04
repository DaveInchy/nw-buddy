import React from 'react';

import "../assets/overlay.css";

export default class DesktopComponent extends React.Component {

    render() {
        return (
            <React.StrictMode>
                <Section id={1} bg={"bg-slate-900"} >
                    <div class="h-screen flex flex-col justify-center items-center">
                        <h4 class="flex flex-col justify-center items-center"><span class="text-4xl font-new-world text-slate-800 mt-5">thanks for using</span></h4>
                        <h1 className={"bg-gradient-to-tr from-red-600 to-rose-600 text-transparent text-8xl bg-clip-text font-extrabold text-center uppercase text-clip"}>New World<br/>
                        <hr class="my-2 border-2 rounded border-slate-800"/>Buddy</h1>
                        <div className="btn animate-bounce mt-5 cursor-pointer">
                            <span className="btn-text text-clip text-6xl">🖱️</span>
                        </div>
                    </div>
                </Section>
                <Section id={2} bg={"bg-slate-800"}>
                    <Index />
                </Section>
            </React.StrictMode>
        );
    }
}


class Section extends React.Component {
    render() {
        return (
            <div id={`section_${Number(this.props.id).toString()}`} className={"flex flex-col w-full justify-center items-center p-1 snap-center" + ` ${this.props.bg ? this.props.bg : "bg-none"}`}>
                {this.props.children}
            </div>
        );
    }
}

class Index extends React.Component {

    render() {
        return (
            <div className="flex flex-col w-full justify-center items-center">
                <div class="h-screen lg:w-2/3 xs:container flex flex-col justify-center items-center">
                    <h1 className={"bg-gradient-to-tr from-red-600 to-rose-600 text-transparent text-6xl bg-clip-text font-extrabold text-center uppercase text-clip"}>
                        Help &amp; Support<br/>
                        <hr class="my-2 border-2 rounded border-slate-900"/>
                    </h1>
                    <div id="card_get-started-wrapper" class="w-full flex flex-grid justify-center items-center">
                        <div class="flex flex-col w-1/3 h-72 border-2 rounded-sm border-slate-800 bg-slate-700 text-rose-800 p-4 my-2 mx-2 justify-between items-center shadow-lg shadow-slate-900">
                            <h3 className={"bg-gradient-to-tr from-black to-slate-900 text-transparent text-2xl bg-clip-text font-extrabold text-center capitalize text-clip"}>Keyboard Hotkeys<br /><hr class="border-slate-800 h-1 rounded-xs border-2 my-1 w-32 mx-auto" /></h3>

                            <p class="text-slate-200 text-[18px] font-normal text-justified text-center">Can't figure out why things work the way they do? Here you'll find information on how to contact the support staff.</p>

                            <button onclick="(this, button) => { console.log(`Pressed a button ${this}`) }" class="bg-rose-600 hove:bg-rose-800 text-white p-2 px-4 rounded-full m-1 justify-self-end">Read More</button>
                        </div>
                        <div class="flex flex-col w-1/3 h-72 border-2 rounded-sm border-slate-800 bg-slate-700 text-rose-800 p-4 my-2 mx-2 justify-between items-center shadow-lg shadow-slate-900">
                            <h3 className={"bg-gradient-to-tr from-black to-slate-900 text-transparent text-2xl bg-clip-text font-extrabold text-center capitalize text-clip"}>Search Database<br /><hr class="border-slate-800 h-1 rounded-xs border-2 my-1 w-32 mx-auto" /></h3>

                            <p class="text-slate-200 text-[18px] font-normal text-justified text-center">Can't figure out why things work the way they do? Here you'll find information on how to contact the support staff.</p>

                            <button onclick="(this, button) => { console.log(`Pressed a button ${this}`) }" class="bg-rose-600 hove:bg-rose-800 text-white p-2 px-4 rounded-full m-1 justify-self-end">Read More</button>
                        </div>
                        <div class="flex flex-col w-1/3 h-72 border-2 rounded-sm border-slate-800 bg-slate-700 text-rose-800 p-4 my-2 mx-2 justify-between items-center shadow-lg shadow-slate-900">
                            <h3 className={"bg-gradient-to-tr from-black to-slate-900 text-transparent text-2xl bg-clip-text font-extrabold text-center capitalize text-clip"}>Features<br /><hr class="border-slate-800 h-1 rounded-xs border-2 my-1 w-32 mx-auto" /></h3>

                            <p class="text-slate-200 text-[18px] font-normal text-justified text-center">Can't figure out why things work the way they do? Here you'll find information on how to contact the support staff.</p>

                            <button onclick="(this, button) => { console.log(`Pressed a button ${this}`) }" class="bg-rose-600 hove:bg-rose-800 text-white p-2 px-4 rounded-full m-1 justify-self-end">Read More</button>
                        </div>
                    </div>
                    <div id="card_get-support-wrapper" class="w-full flex flex-grid justify-center items-center">
                        <div class="flex flex-col w-1/3 h-72 border-2 rounded-sm border-slate-800 bg-slate-700 text-rose-800 p-4 my-2 mx-2 justify-between items-center shadow-lg shadow-slate-900">
                            <h3 className={"bg-gradient-to-tr from-black to-slate-900 text-transparent text-2xl bg-clip-text font-extrabold text-center capitalize text-clip"}>Subscription<br /><hr class="border-slate-800 h-1 rounded-xs border-2 my-1 w-32 mx-auto" /></h3>

                            <p class="text-slate-200 text-[18px] font-normal text-justified text-center">Sick of closing ads? To be honest i'd rather dont show ads on this product. But there is a way to get rid of them! and unlock awesome features.</p>

                            <button onclick="(this, button) => { console.log(`Pressed a button ${this}`) }" class="bg-rose-600 hove:bg-rose-800 text-white p-2 px-4 rounded-full m-1 justify-self-end">Read More</button>
                        </div>
                        <div class="flex flex-col w-1/3 h-72 border-2 rounded-sm border-slate-800 bg-slate-700 text-rose-800 p-4 my-2 mx-2 justify-between items-center shadow-lg shadow-slate-900">
                            <h3 className={"bg-gradient-to-tr from-black to-slate-900 text-transparent text-2xl bg-clip-text font-extrabold text-center capitalize text-clip"}>Support &amp; FAQ<br /><hr class="border-slate-800 h-1 rounded-xs border-2 my-1 w-32 mx-auto" /></h3>

                            <p class="text-slate-200 text-[18px] font-normal text-justified text-center">Can't figure out why things work the way they do? Here you'll find information on how to contact the support staff.</p>

                            <button onclick="(this, button) => { console.log(`Pressed a button ${this}`) }" class="bg-rose-600 hove:bg-rose-800 text-white p-2 px-4 rounded-full m-1 justify-self-end">Read More</button>
                        </div>
                        <div class="flex flex-col w-1/3 h-72 border-2 rounded-sm border-slate-800 bg-slate-700 text-rose-800 p-4 my-2 mx-2 justify-between items-center shadow-lg shadow-slate-900">
                            <h3 className={"bg-gradient-to-tr from-black to-slate-900 text-transparent text-2xl bg-clip-text font-extrabold text-center capitalize text-clip"}>Feedback<br/><hr class="border-slate-800 h-1 rounded-xs border-2 my-1 w-32 mx-auto"/></h3>

                            <p class="text-slate-200 text-[18px] font-normal text-justified text-center">We'd be glad to recieve some feedback on this product. Here you'll find more info on how to propose features or bug fixes.</p>

                            <button onclick="(this, button) => { console.log(`Pressed a button ${this}`) }" class="bg-rose-600 hove:bg-rose-800 text-white p-2 px-4 rounded-full m-1 justify-self-end">Read More</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ChangeLog extends React.Component {
    render() {
        return (
            <div class="w-full rounded p-5">
                <h2 className={"text-white text-4xl bg-clip-text my-5"}>
                    Changelog: [0.22.5]
                </h2>
                <ul class="text-slate-200 text-2xl bg-slate-900 w-full rounded-xl p-5 text-left h-auto list-decimal list-inside">
                    <li class="text-light hover:text-gray-500">Start using "changelog" over "change log" since it's the common usage.</li>
                    <li class="text-light hover:text-gray-500">Start versioning with 0.22.5 based on the current version at 22.5.0.</li>
                    <li class="text-light hover:text-gray-500">Rewrite "What makes unicorns cry?" section.</li>
                    <li class="text-light hover:text-gray-500">Rewrite "Ignoring Deprecations" sub-section to clarify the ideal scenario.</li>
                    <li class="text-light hover:text-gray-500">Improve "Commit log diffs" sub-section to further argument against them.</li>
                    <li class="text-light hover:text-gray-500">Merge "Why can’t people just use a git log diff?" with "Commit log diffs"</li>
                    <li class="text-light hover:text-gray-500">Added Links to latest released version in previous versions.</li>
                </ul>
            </div>
        );
    }
}