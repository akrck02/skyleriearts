import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
export class AboutMeView extends ViewUI {
    constructor() {
        super({
            type: "view",
            id: AboutMeView.ID,
            classes: ["box-column", "box-center"],
        });
    }
    async show(params, container) {
        const text = new UIComponent({
            type: "p",
            id: AboutMeView.INFO_TEXT_ID,
            text: `Hi! I'm Skylerie, a freelance spanish
            artist who loves nature and mystical stuff.
            I have a passion for creating character designs and concepts! I'm fulltime a freelancer artist and part from commissions, I'm working an original graphic novel called 'Selenite'.`,
        });
        text.appendTo(this);
        this.appendTo(container);
    }
}
AboutMeView.ID = "about-me";
AboutMeView.INFO_TEXT_ID = "info-text";
