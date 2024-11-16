import { BubbleUI } from "../../lib/bubble/bubble.js";
import { Html } from "../../lib/gtdf/component/dom.js";
import { UIComponent } from "../../lib/gtdf/component/ui.component.js";
import MaterialIcons from "../../lib/material/material.icons.js";
/**
 * Image visualizer component
 */
export class ImageVisualizer extends UIComponent {
    constructor() {
        super({
            type: Html.Div,
            id: ImageVisualizer.ID,
            classes: [BubbleUI.BoxRow, BubbleUI.BoxCenter],
        });
        this.setEvents({
            click: (event) => {
                //if the click is not on the image, close the visualizer
                if (event.target != this.element) {
                    return;
                }
                event.stopPropagation();
                this.close();
            },
        });
        this.buttonClose = MaterialIcons.get("close", {
            fill: "white",
            size: "48px",
        });
        this.buttonClose.setEvents({
            click: () => this.close(),
        });
        this.buttonClose.setStyles({
            position: "absolute",
            top: "0px",
            right: "0px",
        });
        this.buttonBack = MaterialIcons.get("back", {
            fill: "white",
            size: "48px",
        });
        this.buttonBack.setEvents({
            click: () => this.showBack(),
        });
        this.image = new UIComponent({
            type: Html.Img,
            attributes: { src: "" },
        });
        this.buttonNext = MaterialIcons.get("front", {
            fill: "white",
            size: "48px",
        });
        this.buttonNext.setEvents({
            click: () => this.showNext(),
        });
        this.infoText = new UIComponent({
            type: Html.P,
            id: ImageVisualizer.INFO_TEXT_ID,
            text: "Touch outside the image to close the visualizer.",
            classes: ["info-text"],
        });
        this.buttonClose.element.id = ImageVisualizer.BUTTON_CLOSE_ID;
        this.buttonBack.element.id = ImageVisualizer.BUTTON_BACK_ID;
        this.buttonNext.element.id = ImageVisualizer.BUTTON_NEXT_ID;
        this.buttonClose.appendTo(this);
        this.buttonBack.appendTo(this);
        this.image.appendTo(this);
        this.buttonNext.appendTo(this);
        this.infoText.appendTo(this);
    }
    /**
     * Show the image visualizer
     * @param image Image to show
     * @param list List of images
     * @returns void
     */
    async show(image, list) {
        console.debug("Showing image: ", image);
        this.list = list;
        this.index = list.indexOf(image);
        this.element.style.display = "flex";
        if (this.index == 0) {
            this.buttonBack.element.style.visibility = "hidden";
        }
        else {
            this.buttonBack.element.style.visibility = "visible";
        }
        if (this.index == list.length - 1) {
            this.buttonNext.element.style.visibility = "hidden";
        }
        else {
            this.buttonNext.element.style.visibility = "visible";
        }
        this.image.element.setAttribute("src", image);
    }
    showBack() {
        this.show(this.list[this.index - 1], this.list);
    }
    showNext() {
        this.show(this.list[this.index + 1], this.list);
    }
    close() {
        this.element.style.display = "none";
    }
}
ImageVisualizer.ID = "visualizer";
ImageVisualizer.BUTTON_CLOSE_ID = "close";
ImageVisualizer.BUTTON_BACK_ID = "back";
ImageVisualizer.BUTTON_NEXT_ID = "next";
ImageVisualizer.INFO_TEXT_ID = "info-text";
