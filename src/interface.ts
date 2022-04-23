export default class OverlayInterface
{
    public constructor(
        public readonly Identifier: string,
        public readonly Selector: string,
        private Container?: HTMLElement,
        private Children?: HTMLElement[],
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
}