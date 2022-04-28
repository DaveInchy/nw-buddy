import React from 'react';

export default class DesktopContent extends React.Component {
    render() {
        return (
            <React.StrictMode>
                <Section>
                    <h1 className={"text-yellow text-6xl bg-clip-text font-bold text-center uppercase my-5"}>New World Buddy</h1>
                </Section>
                <Section>
                    <h2 className={"text-yellow text-3xl bg-clip-text text-center my-3"}>
                        Changelog: [0.22.5]
                    </h2>
                </Section>
            </React.StrictMode>
        );
    }
}

class Section extends React.Component {
    render() {
        return (
            <div className={"flex w-full justify-center items-center p-5"}>
                {this.props.children}
            </div>
        );
    }
}