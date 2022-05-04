import { logError, logMessage } from './debug';
import CacheInterface from './cache';
import StorageInterface from './storage';
import UIElement from './interface';

export class Editor extends UIElement
{
    public constructor(
        public readonly Identifier: string,
        public readonly Selector: string,
        public Container?: HTMLElement,
        public Children?: HTMLCollection,
    )
    {
        super(Identifier, Selector, Container, Children);
        return this;
    }

}
const editor = new Editor('pin-editor', '#editor').createInterface();
export default editor;