import { logError, logMessage } from './debug';
import CacheInterface from './cache';
import StorageInterface from './storage';
import OverlayInterface from './interface';

export default class Editor extends OverlayInterface
{
    public constructor(
        Identifier: string,
        Selector: string,
        Container?: HTMLElement,
        Children?: HTMLElement[],
    )
    {
        super(Identifier, Selector, Container, Children);
        return this;
    }

}