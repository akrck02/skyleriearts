import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
export class ContactsView extends ViewUI {
    constructor() {
        super({
            type: "view",
            id: "contacts",
            classes: ["box-column", "box-center"],
        });
    }
    async show(params, container) {
        const contact = new UIComponent({
            type: "p",
            id: ContactsView.INFO_TEXT_ID,
            text: "Contact me at: @skylerie",
        });
        contact.appendTo(this);
        this.appendTo(container);
    }
}
ContactsView.ID = "contacts";
ContactsView.INFO_TEXT_ID = "info-text";
