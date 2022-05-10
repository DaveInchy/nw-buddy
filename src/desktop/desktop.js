import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import StorageInterface from '../storage';
import { logMessage, logError } from '../debug';

import "../assets/css/overlay.css";
import "../assets/css/tailwind.css";

import xIcon from "../assets/img/new-world/ui/smallx_06_05_2022.png";

import checkIconActive from "../assets/img/new-world/icons/icon_checkmark_active.png";
import checkIconInactive from "../assets/img/new-world/icons/icon_checkmark_inactive.png";

import bookIcon from "../assets/img/nw_artbook.png"
import nwBackground from "../assets/img/new-world/textures/continent-diff.png";
import bannerBackground from "../assets/img/new-world/backgrounds/banner-bg1.png";

globalThis.nwBackground = nwBackground;
globalThis.bookIcon = bookIcon;
globalThis.checkIconActive = checkIconActive;
globalThis.checkIconInactive = checkIconInactive;
globalThis.crossIcon = xIcon;

import runicCircleA from "../assets/img/new-world/banner_runebiga.png";
import runicCircleB from "../assets/img/new-world/banner_runebigb.png";
import runicCircleC from "../assets/img/new-world/banner_runebigc.png";
import runicCircleBackground from "../assets/img/new-world/banner_runebg.png";
import runicCircleInner from "../assets/img/new-world/banner_runeinner.png";
import runicCircleTitle from "../assets/img/new-world/banner_titleinner.png";

export default function DesktopComponent({props})
{
    const [offset, setOffset] = useState(0);
    const [checkmark, setCheckmark] = useState(false);
    const circleInnerElem1 = useRef(null);
    const circleBackgroundElem1 = useRef(null);
    const circleElem1 = useRef(null);
    const circleElem2 = useRef(null);
    const circleElem3 = useRef(null);
    const checkElem1 = useRef(null);
    const closeElem1 = useRef(null);
    const Storage = StorageInterface;

    const closeSplash = () => {
        window.close();
        logMessage("action", "Splash closed");
    }

    const disableSplash = () => {
        Storage.set("splash_enabled", false);
        logMessage("action", "Splash disabled");
    }

    const enableSplash = () => {
        Storage.set("splash_enabled", true);
        logMessage("action", "Splash enabled");
    }

    const rotateCircle = (elem, offset) => {
        elem.current.style.transform = `rotate(${offset}deg)`;
        return offset;
    }

    useEffect(() => {
        logMessage("action", "React mounted desktop");
        setTimeout(() => {
            setCheckmark(StorageInterface.get("splash_enabled") !== true ? false : true);
        }, 1000);
    }, []);

    // call every render refresh
    useLayoutEffect(() => {
        setTimeout(() => {
            setOffset(offset + 1);
        }, 150);
    }, [offset]);

    useEffect(() => {
        rotateCircle(circleElem1, offset * 1.5);
        rotateCircle(circleElem2, -(offset * 1.75));
        rotateCircle(circleElem3, offset * 1.25);
    }, [offset]);

    useLayoutEffect(() => {
        if (checkmark) {
            enableSplash();
        } else {
            disableSplash();
        }
    }, [checkmark]);

    useEffect(() => {
        if (checkmark) {
            checkElem1.current.src = checkIconActive;
        } else {
            checkElem1.current.src = checkIconInactive;
        }
    }, [checkmark]);

    return (
        <>
            <React.StrictMode>
                <Section id={1}>
                    <div className="flex flex-col items-center justify-center">
                        <div className="fixed top-auto left-auto translate-x-0 translate-y-0 z-0 w-[100vw] h-[100vh] flex flex-col justify-center items-center">
                            <img ref={circleBackgroundElem1} src={runicCircleBackground} className={`relative opacity-50 animate-pulse duration-1000 w-[500px] h-[500px] transform-gpu transition-all`} />
                        </div>
                        <div className="fixed top-auto left-auto translate-x-0 translate-y-0 z-0 w-[100vw] h-[100vh] flex flex-col justify-center items-center">
                            <img ref={circleInnerElem1} src={runicCircleInner} className={`relative opacity-50 w-[600px] h-[600px] duration-1000 animate-pulse transform-gpu transition-all`} />
                        </div>
                        <div className="fixed top-auto left-auto translate-x-0 translate-y-0 z-0 w-[100vw] h-[100vh] flex flex-col justify-center items-center">
                            <img ref={circleElem1} src={runicCircleA} className={`relative opacity-100 animate-pulse duration-500 w-[1000px] h-[1000px] transform-gpu transition-all`} />
                        </div>
                        <div className="fixed top-auto left-auto translate-x-0 translate-y-0 z-0 w-[100vw] h-[100vh] flex flex-col justify-center items-center">
                            <img ref={circleElem2} src={runicCircleB} className={`relative opacity-100 animate-pulse duration-800 w-[750px] h-[750px] transform-gpu transition-all`} />
                        </div>
                        <div className="fixed top-auto left-auto translate-x-0 translate-y-0 z-0 w-[100vw] h-[100vh] flex flex-col justify-center items-center">
                            <img ref={circleElem3} src={runicCircleC} className={`relative opacity-100 animate-pulse duration-700 w-[666px] h-[666px] transform-gpu transition-all`} />
                        </div>
                        <div class="absolute z-20 top-[20px] right-[20px] w-auto h-[30px]">
                            <img ref={checkElem1} src={checkmark ? checkIconActive : checkIconInactive} className="inline-block float-right w-auto h-[100%] justify-center align-center mr-5" onClick={() => setCheckmark(!checkmark ? true : false)} />
                            <span className="inline-block text-slate-200 mr-5 float-right h-[100%] justify-center align-center text-2xl font-new-world font-thin" style={{ lineHeight: "30px" }}>dont show window again?</span>
                        </div>
                        <div class="absolute z-20 top-[20px] left-[20px] w-auto h-[30px]">
                            <img ref={closeElem1} src={xIcon} className="inline-block float-left w-auto h-[100%] justify-center align-center mr-5" onClick={() => closeSplash()} />
                            <span className="inline-block text-slate-200 mr-5 float-left h-[100%] justify-center align-center text-2xl font-new-world font-thin" style={{ lineHeight: "30px" }}></span>
                        </div>
                        <div className="flex flex-col h-screen justify-center items-center -translate-y-[30px]">
                            <h4 class="flex flex-col justify-center items-center">
                                <span className="text-4xl font-new-world text-slate-400 mt-5 z-20 opacity-60">thanks for using</span>
                            </h4>
                            <h1 className={"bg-gradient-to-bl from-amber-600 to-amber-400 text-transparent text-8xl bg-clip-text font-semibold text-center uppercase text-clip z-20 opacity-80"}>
                                New World<br />
                                <hr class="my-2 border-[1px] rounded border-slate-200" />
                                Buddy
                            </h1>
                        </div>
                    </div>
                </Section>
            </React.StrictMode>
        </>
    );
}


class Section extends React.Component {
    render() {
        return (
            <div id={`section_${this.props.id}`} className={"flex flex-col w-screen h-screen overflow-visible bg-[#00000080] rounded-2xl justify-center items-center p-0 snap-center" + ` ${this.props.bg ? this.props.bg : ""}` + ` ${this.props.depth ? this.props.depth : "z-10"} w-full h-full`} style={{ backgroundImage: this.props.bgSrc ? "url(" + this.props.bgSrc + ")" : null, backgroundPosition: "center", backgroundSize: "102vw 102vh" }}>
                {this.props.children}
            </div>
        );
    }
}
