import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";

export class ContactsView extends ViewUI {

    private static ID = "contacts";
    private static INFO_TEXT_ID = "info-text";

    constructor(){
        super({
            type: "view",
            id: "contacts",
            classes: ["box-column","box-center"],
        });
    }


    public async show(params : string[], container : UIComponent): Promise<void> {
        const contact = new UIComponent({
            type: "p",
            id: ContactsView.INFO_TEXT_ID,
            text: "Contact me at: @skylerie",
        });

        contact.appendTo(this);
        this.appendTo(container);
    }


}