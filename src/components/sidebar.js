import React, { useState, useEffect } from 'react';

export default class SidebarUI extends React.Component {

    metadata;
    props;
    parent;

    render() {
        return (
            <>
                <div id="sidebar-header" class="flex flex-col justify-center items-center bg-slate-900 text-slate-600 h-[80px] w-full border-slate-700 border-b-2">
                    <h1 class="bg-gradient-to-bl from-amber-600 to-amber-400 text-clip bg-clip-text font-semibold text-center uppercase text-4xl">New World Buddy</h1>
                </div>
                <div id="sidebar-context" class="flex flex-col justify-center items-center h-fit w-full py-10 px-5 text-5xl">
                    <NavigationLink page={"routes"} text={"Routes"} />
                    <NavigationLink page={"filter"} text={"Filter"} />
                    <div class="align-bottom">
                        <NavigationLink page={"index"} text={"Close"} />
                    </div>
                </div>
            </>
        );
    }
}

export class NavigationLink extends React.Component {
    render() {
        var data = this.props ? this.props : {};
        var buttonText = data.text ? data.text : "error";
        return (
            <>
                <a href={"/overlay.html?p=" + (this.props.page ? this.props.page : "index")} class="flex flex-col hover:text-rose-500 hover:bg-slate-400 justify-center items-center w-[100%] h-auto my-3 mx-auto  bg-slate-800 rounded-sm border-2 border-slate-600 p-4"><span class="w-full h-full text-[4.0rem] text-center text-slate-400 font-extrabold uppercase font-new-world">{buttonText.toString()}</span></a>
            </>
        );
    }
}