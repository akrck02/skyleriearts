import { Configuration } from "../../configuration/configuration.js";
import { BubbleUI } from "../../lib/bubble/bubble.js";
import { Html } from "../../lib/gtdf/component/dom.js";
import { UIComponent } from "../../lib/gtdf/component/ui.component.js";
import { Signal } from "../../lib/gtdf/core/signals/signals.js";
/**
 * Header component for the website
 */
export default class Header extends UIComponent {
    constructor(tags) {
        super({
            type: Html.Div,
            id: Header.ID,
            classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYCenter],
        });
        this.tagSelectedSignal = new Signal("menu-changed");
        this.configure(tags);
    }
    async configure(tags) {
        const profilePicture = new UIComponent({
            type: Html.Img,
            id: "logo",
            attributes: {
                src: `${Configuration.instance.path.images}logo.jpg`,
            },
        });
        const title = new UIComponent({
            type: Html.H1,
            text: "Skylerie",
            id: "title",
            classes: [BubbleUI.TextCenter],
        });
        const selected = tags.values().next().value;
        const tagMenu = new TagMenu(this.tagSelectedSignal, tags, selected);
        profilePicture.appendTo(this);
        title.appendTo(this);
        tagMenu.appendTo(this);
    }
}
Header.ID = "header";
/**
 * TagMenu is a UIComponent that displays a list of tags as buttons.
 */
class TagMenu extends UIComponent {
    constructor(signal, tags, selectedTag) {
        super({
            type: Html.Div,
            id: TagMenu.ID,
            classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
        });
        this.buttons = new Map();
        this.tagSelectedSignal = signal;
        this.configure(tags, selectedTag);
    }
    async configure(tags, selectedTag) {
        tags.forEach((tag) => this.addTagButton(tag, selectedTag));
    }
    /**
     * Add a tag button to the tag menu.
     */
    addTagButton(tag, selectedTag) {
        const button = new UIComponent({
            type: Html.Button,
            text: tag,
            classes: selectedTag == tag ? ["selected"] : [],
            events: {
                click: () => this.selectTag(tag),
            },
        });
        this.buttons.set(tag, button);
        button.appendTo(this);
    }
    selectTag(selectedTag) {
        this.buttons.forEach((button, tag, map) => {
            button.element.classList.remove("selected");
            if (tag === selectedTag) {
                button.element.classList.add("selected");
            }
        });
        this.tagSelectedSignal.emit({ tag: selectedTag });
    }
}
TagMenu.ID = "tag-menu";
