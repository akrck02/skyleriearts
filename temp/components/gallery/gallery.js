import { BubbleUI } from "../../lib/bubble/bubble.js";
import { Html } from "../../lib/gtdf/component/dom.js";
import { UIComponent } from "../../lib/gtdf/component/ui.component.js";
import { Signal } from "../../lib/gtdf/core/signals/signals.js";
import { Browser } from "../../lib/gtdf/web/browser.js";
/**
 * Gallery component to show images
 * for a project
 */
export default class ProjectGallery extends UIComponent {
    constructor(project) {
        super({
            type: Html.Div,
            classes: [
                ProjectGallery.CLASS,
                BubbleUI.BoxColumn,
                BubbleUI.BoxXStart,
                BubbleUI.BoxYStart,
            ],
        });
        this.visualizeImageSignal = new Signal("visualize-image");
        this.configure(project);
    }
    /**
     * Configure the gallery
     * @param project Project to show
     * @returns void
     */
    async configure(project) {
        // if nothing to show, return
        if (undefined == project ||
            undefined == project.images ||
            project.images.length == 0)
            return;
        // turn on mobile class if needed
        if (Browser.isSmallDevice()) {
            this.element.classList.add(ProjectGallery.MOBILE_CLASS);
        }
        // Add a list of images to show
        // in the gallery
        const list = new UIComponent({
            type: Html.Ul,
            id: ProjectGallery.LIST_ID,
        });
        project.images?.forEach((image) => this.register(list, image, project.images));
        list.appendTo(this);
    }
    /**
     * Register an image to the gallery
     * @param list List to append the image
     * @param image Image to register
     * @param album Album of images
     * @returns void
     */
    register(list, image, album) {
        const listItem = new UIComponent({ type: Html.Li });
        const url = image.url;
        const canvas = new ImageCanvas(image, album, this.visualizeImageSignal);
        setTimeout(() => (canvas.element.style.opacity = "1"), 1);
        canvas.appendTo(listItem);
        listItem.appendTo(list);
    }
}
ProjectGallery.CLASS = "gallery";
ProjectGallery.TITLE_ID = "title";
ProjectGallery.LIST_ID = "image-list";
ProjectGallery.MOBILE_CLASS = "mobile";
/**
 * ImageCanvas component to show an image
 * in the gallery
 */
class ImageCanvas extends UIComponent {
    constructor(image, album, signal) {
        super({
            type: Html.Div,
            classes: ["canvas"]
        });
        this.imageClickedSignal = signal;
        this.setEvents({
            click: () => {
                this.imageClickedSignal?.emit({
                    images: album,
                    selected: album.indexOf(image),
                });
            },
        });
        this.configure(image);
    }
    /**
     * Configure the image
     * @param image Image to show
     */
    configure(image) {
        const imageComponent = new UIComponent({
            type: Html.Img,
            attributes: {
                src: image.url,
                alt: image.title,
                loading: "lazy",
                background: "#fff",
            },
        });
        imageComponent.setEvents({
            load: () => (imageComponent.element.style.opacity = "1"),
        });
        imageComponent.appendTo(this);
    }
}
