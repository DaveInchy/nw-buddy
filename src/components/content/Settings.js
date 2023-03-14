import "../../assets/css/app.tailwind.css";
import Minimap from "./Minimap";
import React from "react";
import SidebarMenu from "./Sidebar";

const Styles = ({
    Container: {
        width: "100%",
        height: "90%",
        minHeight: "90%",
        maxHeight: "90%",
        backgroundColor: "#333",
        overflow: "hidden",
    },
    LeftMenu: {
        width: "25%",
        maxWidth: "25%",
        minWidth: "25%",
        minHeight: "100%",
        maxHeight: "100%",
        height: "100%"
    },
    RightMap: {
        width: "75%",
        maxWidth: "75%",
        minWidth: "75%",
        minHeight: "100%",
        maxHeight: "100%",
        height: "100%"
    },
    BottomRibbon: {
        width: "100%",
        minWidth: "100%",
        height: "10%",
        maxHeight: "10%",
        padding: "2%",
        backgroundColor: "#3e3e3e",
        overflow: "hidden",
    }
});

export default class UserInterface extends React.Component
{
    render()
    {
        return (<>
            <section style={Styles.Container}>
                <div style={Styles.LeftMenu} className="">
                    <SidebarMenu/>
                </div>
                <div style={Styles.RightMap} className="">
                    <Minimap />
                </div>
            </section>
            <section style={Styles.BottomRibbon}>Copyright by Dave Inchy</section>
        </>);
    }
}