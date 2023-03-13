import React from 'react';
import '../../assets/css/app.tailwind.css';

export default function SidebarMenu() {
    return (<>
        <div className="bg-stone-500 w-[100%] p-5 flex flex-col justify-center items-center">
            <h1 className="text-stone-300 text-4xl font-new-world text-center">New World<br />Buddy</h1>
        </div>
        <div className="bg-stone-400 w-[100%] p-5 flex flex-col justify-center items-center h-auto">
            {/* <button className="bg-stone-200 border-2 rounded-md border-stone-300 p-3 my-3 text-2xl w-full text-stone-600 font-new-world text-center">New Resource Node</button>
            <button className="bg-stone-200 border-2 rounded-md border-stone-300 p-3 my-3 text-2xl w-full text-stone-600 font-new-world text-center">New Route</button> */}
            <button className="bg-stone-200 border-4 rounded-md border-stone-300 p-2 my-2 text-xl w-full text-stone-600 font-new-world text-center">Map</button>
            <button className="bg-stone-200 border-4 rounded-md border-stone-300 p-2 my-2 text-xl w-full text-stone-600 font-new-world text-center">Settings</button>
            <button className="bg-stone-200 border-4 rounded-md border-stone-300 p-2 my-2 text-xl w-full text-stone-600 font-new-world text-center">Guide</button>
            <button className="bg-stone-200 border-4 rounded-md border-stone-300 p-2 my-2 text-xl w-full text-stone-600 font-new-world text-center">Close</button>
        </div>
    </>)
}