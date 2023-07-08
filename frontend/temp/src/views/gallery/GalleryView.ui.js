import { Visualizer } from "../../components/visualizer/Visualizer.js";
import { Config } from "../../config/Config.js";
import { HTTPS_METHOD } from "../../lib/gtd/core/http.js";
import { efetch } from "../../lib/gtd/data/easyfetch.js";
import { UIComponent, setEvents } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
export class GalleryView extends ViewUI {
    constructor() {
        super({
            type: "view",
            id: GalleryView.ID,
            classes: ["box-row", "box-center", "box-warp"],
        });
        this.images = [];
    }
    async show(params, container) {
        let speed = 100;
        this.visualizer = new Visualizer();
        await efetch({
            method: HTTPS_METHOD.GET,
            url: Config.PATHS.IMAGES + "List.json",
            parameters: {}
        }).success((list) => {
            list = list.map(element => Config.PATHS.IMAGES + element);
            list.forEach((element) => {
                const image = this.createImage(element, speed);
                setEvents(image.element, {
                    click: () => this.visualizer.show(element, list)
                });
                speed += 100;
            });
        }).jsonPromise();
        this.visualizer.appendTo(this);
        this.appendTo(container);
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
        setEvents(imageComponent.element, {
            load: () => imageComponent.element.style.opacity = "1"
        });
        imageComponent.appendTo(canvas);
        canvas.appendTo(this);
        setTimeout(() => canvas.element.style.opacity = "1", speed);
        this.images.push(canvas);
        return canvas;
    }
}
GalleryView.ID = "gallery";
