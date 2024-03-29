import "../../assets/css/overlay.css";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import StorageInterface from "../../storage";
import bannerBackground from "../../assets/img/new-world/backgrounds/banner-bg1.png";
import bgImage from "../../assets/loadingimages/loadingimage5_07_05_2022.png";
import bookIcon from "../../assets/img/book-original.png";
import checkIconActive from "../../assets/img/new-world/icons/icon_checkmark_active.png";
import checkIconInactive from "../../assets/img/new-world/icons/icon_checkmark_inactive.png";
import nwBackground from "../../assets/img/new-world/textures/continent-diff.png";
import runicCircleA from "../../assets/img/new-world/banner_runebiga.png";
import runicCircleB from "../../assets/img/new-world/banner_runebigb.png";
import runicCircleBackground from "../../assets/img/new-world/banner_runebg.png";
import runicCircleC from "../../assets/img/new-world/banner_runebigc.png";
import runicCircleInner from "../../assets/img/new-world/banner_runeinner.png";
import runicCircleTitle from "../../assets/img/new-world/banner_titleinner.png";
import xIcon from "../../assets/img/new-world/ui/smallx_06_05_2022.png";
import { logError, logMessage } from "../../debug";

// @ts-ignore


// @ts-ignore

// @ts-ignore
// @ts-ignore

// @ts-ignore
// @ts-ignore
// @ts-ignore

globalThis.nwBackground = nwBackground;
globalThis.bookIcon = bookIcon;
globalThis.checkIconActive = checkIconActive;
globalThis.checkIconInactive = checkIconInactive;
globalThis.crossIcon = xIcon;

// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore

// @ts-ignore

// @ts-ignore
export default function DesktopComponent({ props }) {
    // @ts-ignore
    var backgroundImageList = new Array();

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

    const isEnabled = () => Storage.get("splash_enabled") === true ? true : false;

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
        setCheckmark(!isEnabled());
        if (!isEnabled()) {
            closeSplash();
        }
    }, []);

    // call every render refresh
    useLayoutEffect(() => {
        setTimeout(() => {
            setOffset(offset + 1);
        }, 500);
    }, [offset]);

    useEffect(() => {
        rotateCircle(circleElem1, offset * 2.0);
        rotateCircle(circleElem2, -(offset * 2.4));
        rotateCircle(circleElem3, offset * 1.6);
    }, [offset]);

    useEffect(() => {
        if (checkmark) {
            checkElem1.current.src = checkIconInactive;
            disableSplash();
        } else {
            checkElem1.current.src = checkIconActive;
            enableSplash();
        }
    }, [checkmark]);

    return (
        <>
            <Section id={1} className="splash-section h-screen w-screen" bg="" depth="z-30" bgSrc={bgImage}>
                <div className="fixed top-auto left-auto translate-x-0 translate-y-0 z-20 w-full h-full flex flex-col justify-center items-center">
                    <img ref={circleBackgroundElem1} src={runicCircleBackground} className={`relative opacity-50 duration-500 w-[250px] h-[250px] transform-cpu transition-all`} />
                </div>
                <div className="fixed top-auto left-auto translate-x-0 translate-y-0 z-20 w-full h-full flex flex-col justify-center items-center">
                    <img ref={circleInnerElem1} src={runicCircleInner} className={`relative opacity-50 w-[300px] h-[300px] duration-500 transform-cpu transition-all`} />
                </div>
                <div className="fixed top-auto left-auto translate-x-0 translate-y-0 z-20 w-full h-full flex flex-col justify-center items-center">
                    <img ref={circleElem1} src={runicCircleA} className={`relative opacity-100 duration-500 w-[500px] h-[500px] transform-cpu transition-all`} />
                </div>
                <div className="fixed top-auto left-auto translate-x-0 translate-y-0 z-20 w-full h-full flex flex-col justify-center items-center">
                    <img ref={circleElem2} src={runicCircleB} className={`relative opacity-100 duration-500 w-[375px] h-[375px] transform-cpu transition-all`} />
                </div>
                <div className="fixed top-auto left-auto translate-x-0 translate-y-0 z-20 w-full h-full flex flex-col justify-center items-center">
                    <img ref={circleElem3} src={runicCircleC} className={`relative opacity-100 duration-500 w-[333px] h-[333px] transform-cpu transition-all`} />
                </div>
                <div
// @ts-ignore
                class="absolute z-20 top-[20px] right-[20px] w-auto h-[30px]">
                    <img ref={checkElem1} src={checkmark ? checkIconActive : checkIconInactive} className="inline-block float-right w-auto h-[100%] justify-center align-center mr-5 border: 1px solid #eee;" onClick={() => setCheckmark(!checkmark)} />
                    <span className="inline-block text-slate-200 mr-5 float-right h-[100%] justify-center align-center text-2xl font-new-world font-thin" style={{ lineHeight: "30px" }}>dont show window again?</span>
                </div>
                <div
// @ts-ignore
                class="absolute z-30 top-[20px] left-[20px] w-auto h-[30px]">
                    <img ref={closeElem1} src={xIcon} className="inline-block float-left w-auto h-[100%] justify-center align-center mr-5" onClick={() => closeSplash()} />
                    <span className="inline-block text-slate-200 mr-5 float-left h-[100%] justify-center align-center text-2xl font-new-world font-thin" style={{ lineHeight: "30px" }}></span>
                </div>
                <div className="flex flex-col h-screen justify-center items-center -translate-y-[30px]">
                    <h4
// @ts-ignore
                    class="flex flex-col justify-center items-center">
                        <span className="text-2xl font-new-world text-slate-400 mt-5 z-30">thanks for using</span>
                    </h4>
                    <h1 className={"translate-y-1 bg-gradient-to-bl from-amber-600 to-amber-400 text-transparent text-4xl bg-clip-text font-extrabold text-center uppercase text-clip z-30"}>
                        New World<br />
                        <hr
// @ts-ignore
                        class="my-2 border-[1px] rounded border-slate-200/50" />
                        BUDDY
                    </h1>
                </div>
                <div
// @ts-ignore
                class="absolute z-40 bottom-[20px] left-[0px] w-full h-[30px] bg-slate-500">

                </div>
            </Section>
        </>
    );
}


class Section extends React.Component {
    render() {
        var classes = this.props.className;
        return (
            <div className={classes.toString() + "flex flex-col w-screen h-screen bg-[#333] p-0" + ` ${this.props.bg ? this.props.bg : ""}` + ` ${this.props.depth ? this.props.depth : "z-20"} w-full h-full`} style={{ backgroundImage: this.props.bgSrc ? "url(" + this.props.bgSrc + ")" : null, backgroundPosition: "center", backgroundSize: "100vw 100vh" }}>
                {this.props.children}
            </div>
        );
    }
}
