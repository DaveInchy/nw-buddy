export default class OverlayInterface
{
    _instance = null;
    public constructor(
        public readonly Identifier: string,
        public readonly Selector: string,
        public Container?: HTMLElement,
        public Children?: HTMLElement[],
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
}