import { BubbleUI } from "../../lib/bubble/bubble.js";
import { Html } from "../../lib/gtdf/component/dom.js";
import { UIComponent } from "../../lib/gtdf/component/ui.component.js";
import MaterialIcons from "../../lib/material/material.icons.js";
export default class Select extends UIComponent {
    constructor(map, onclick, selected = Object.keys(map)[0]) {
        super({
            type: "gtdf-select",
            classes: [BubbleUI.BoxColumn],
            selectable: false,
        });
        this.selected = 0;
        const displayBox = new UIComponent({
            type: Html.Div,
            classes: [BubbleUI.BoxRow],
            id: Select.DISPLAY_BOX_ID,
        });
        displayBox.appendTo(this);
        displayBox.setEvents({
            click: (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            },
        });
        this.display = new UIComponent({
            type: Html.P,
            text: selected,
            data: {
                value: map[selected],
            },
        });
        this.display.appendTo(displayBox);
        const icon = MaterialIcons.get("expand", {
            size: "1.15em",
            fill: "#404040",
        });
        icon.element.id = Select.DISPLAY_BOX_ICON_ID;
        icon.appendTo(displayBox);
        this.selector = new UIComponent({
            type: Html.Div,
            id: Select.SELECTOR_ID,
            classes: [BubbleUI.BoxColumn],
        });
        Object.keys(map).forEach((l) => {
            const option = new UIComponent({
                type: Html.Div,
                text: l,
                classes: [Select.OPTION_CLASS],
                data: {
                    value: map[l],
                },
            });
            option.setEvents({
                click: () => {
                    onclick(option.element.dataset.value);
                    this.display.element.textContent = option.element.textContent;
                    this.toggle();
                },
            });
            option.appendTo(this.selector);
        });
        this.selector.appendTo(this);
    }
    toggle() {
        if (this.element.classList.contains("show")) {
            this.element.classList.remove("show");
            return;
        }
        this.element.classList.add("show");
    }
}
Select.DISPLAY_BOX_ID = "display-box";
Select.DISPLAY_BOX_ICON_ID = "display-box-icon";
Select.SELECTOR_ID = "selector";
Select.OPTION_CLASS = "option";
