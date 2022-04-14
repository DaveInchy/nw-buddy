
import CacheInterface from './cache';
import StorageInterface from './storage';
import { logError, logMessage } from './debug';

export default class DocumentStateController
{

    public constructor(private readonly interfaces = [
        {
            id: "editor",
            data: {
                pins: StorageInterface.getAll(),
                save: CacheInterface.getAll(),
            },
            target: "div#pin-editor",
            document: "overlay",
            classes: `w-2/3`,
            styles: `display: block;`,
        },
    ])
    {
        logMessage("document", `loading interface settings and state controlls ...`);

        // Setup all interface elements
        this.interfaces.forEach(
            (i, a) => {
                let iface = i;
                let id = iface.id;

                logMessage(iface.document.toString(), `found interface: ${id} => DOM target: ${iface.target}`);

                let target: NodeListOf<HTMLElement> = document.querySelectorAll(iface.target.toString());
                target.forEach(
                    (j, b) => {
                        var elem = j;

                        logMessage(iface.document.toString(), `found target element: ${elem.id} => ${elem.nodeType}`);

                        try
                        {
                            // Set styles of the HTMLElement
                            var thisStyle = elem.style;
                            var str = thisStyle.all;
                                str = str + iface.styles.toString();
                            thisStyle.setProperty('all', str);

                            // Set classes of the HTMLElement
                            iface.classes.split(` `).forEach((l, c) => {
                                var thisClass = l.toString();
                                if (!elem.classList[thisClass])
                                {
                                    elem.classList.add(thisClass);
                                }
                                return;
                            });

                            logMessage(iface.document.toString(), `successfully set classes and styles of target element: ${elem.id}`);
                        }
                        catch(e)
                        {
                            logError(e);
                        }
                        return;
                    }
                );
            }
        );
    }

}