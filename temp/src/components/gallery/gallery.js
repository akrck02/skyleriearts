import { Browser } from "../../lib/gtdf/components/browser.js";
import { HTML } from "../../lib/gtdf/components/dom.js";
import { UIComponent } from "../../lib/gtdf/components/uicomponent.js";
import { Gtdf } from "../../lib/others/gtdf.js";
export default class Gallery extends UIComponent {
    constructor(name, urls) {
        super({
            type: HTML.DIV,
            classes: [Gallery.CLASS, Gtdf.BOX_COLUMN, Gtdf.BOX_X_CENTER],
        });
        this.configure(name, urls);
    }
    async configure(name, urls) {
        if (Browser.isSmallDevice()) {
            this.element.classList.add(Gallery.MOBILE_CLASS);
        }
        const title = new UIComponent({
            type: HTML.H1,
            text: name,
            id: Gallery.TITLE_ID
        });
        title.appendTo(this);
        const list = new UIComponent({
            type: HTML.UL,
            id: Gallery.LIST_ID
        });
        urls.forEach((url) => {
            const listItem = new UIComponent({ type: HTML.LI });
            const image = this.createImage(url, 100);
            image.appendTo(listItem);
            listItem.appendTo(list);
        });
        list.appendTo(this);
    }
    createImage(image, speed) {
        const canvas = new UIComponent({
            type: "div",
            classes: ["canvas"]
        });
        const imageComponent = new UIComponent({
            type: "img",
            attributes: {
                src: image,
                alt: image,
                loading: "lazy",
            }
        });
        imageComponent.setEvents({
            load: () => imageComponent.element.style.opacity = "1"
        });
        imageComponent.appendTo(canvas);
        canvas.appendTo(this);
        setTimeout(() => canvas.element.style.opacity = "1", speed);
        return canvas;
    }
}
Gallery.CLASS = "gallery";
Gallery.TITLE_ID = "title";
Gallery.LIST_ID = "image-list";
Gallery.MOBILE_CLASS = "mobile";
