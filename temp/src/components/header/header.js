import { Config } from "../../config/config.js";
import { HTML } from "../../lib/gtdf/components/dom.js";
import { UIComponent } from "../../lib/gtdf/components/uicomponent.js";
import { Gtdf } from "../../lib/others/gtdf.js";
/**
 * Header component for the website
 */
export default class Header extends UIComponent {
    constructor() {
        super({
            type: HTML.DIV,
            id: Header.ID,
            classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_X_START, Gtdf.BOX_Y_CENTER],
        });
        this.configure();
    }
    async configure() {
        const profilePicture = new UIComponent({
            type: HTML.IMG,
            id: "logo",
            attributes: {
                src: `${Config.Path.images}logo.jpg`,
            },
        });
        const title = new UIComponent({
            type: HTML.H1,
            text: "Skylerie",
            id: "title",
            classes: [Gtdf.TEXT_CENTER],
        });
        profilePicture.appendTo(this);
        title.appendTo(this);
    }
}
Header.ID = "header";
/**
 * TagMenu is a UIComponent that displays a list of tags as buttons.
 */
class TagMenu extends UIComponent {
    constructor(tags) {
        super({
            type: HTML.DIV,
            id: TagMenu.ID,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_X_START, Gtdf.BOX_Y_START],
            styles: {
                width: "100%",
                height: "5vh",
                padding: "1rem",
            },
        });
        this.configure(tags);
    }
    async configure(tags) {
        tags.forEach((tag) => this.addTagButton(tag));
    }
    /**
     * Add a tag button to the tag menu.
     */
    addTagButton(tag) {
        const button = new UIComponent({
            type: HTML.BUTTON,
            text: tag,
            classes: [],
            styles: {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                margin: "10px",
            },
        });
        button.appendTo(this);
    }
}
TagMenu.ID = "tag-menu";
