export default class UIElement
{
    _instance = null;
    public constructor(
        public readonly Identifier: string,
        public readonly Selector: string,
        public Container?: HTMLElement,
        public Children?: HTMLCollection,
    )
    {
        return this;
    }

    private getElement = (): HTMLElement =>
    {
        return document.querySelector(this.Selector);
    }

    private setStyles = async (Styles: { property: string, value: string }[]) =>
    {
        if (this.getElement().tagName === 'DIV') {
            for (const Style of Styles) {
                this.getElement().style[Style.property] = Style.value;
            }
        }
    }

    public createInterface = (): HTMLElement =>
    {
        this._instance = this.getElement();
        return this._instance;
    }

    public setContainer = (Container: HTMLElement): void =>
    {
        this.Container = Container;
    }

    public setChildren = (Children: HTMLCollection): void =>
    {
        this.Children = Children;
    }

    public setClass = async (Class: string): Promise<void> =>
    {
        this.getElement().classList.add(Class);
    }

    public dragHeader = async (): Promise<void> =>
    {
        this.getElement().addEventListener('mousedown', (event) =>
            this.getElement().addEventListener('mousemove', (event) => {
                this.getElement().style.left = `calc(${event.clientX}px - ${this.getElement().offsetWidth / 2}px)`;
                this.getElement().style.top = `calc(${event.clientY}px - ${this.getElement().offsetHeight / 2}px)`;
            })
        );
        this.getElement().addEventListener('mouseup', () =>
            this.getElement().removeEventListener('mousemove', () => { })
        );
        return;
    }
}