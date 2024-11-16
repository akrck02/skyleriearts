import { Text } from "../../../language/text.js";
import { UIComponent } from "./ui.component.js";
/**
 * This class represents a UIComponent that translates the text
 * of the component to the language of the user.
 * @extends UIComponent The UIComponent class.
 * @author akrck02
 */
export default class I18nUIComponent extends UIComponent {
    constructor(properties) {
        super(properties);
        this.category = properties.category;
        this.name = properties.name;
        Text.reloadTextSignal.connect({
            origin: "I18nUIComponent" + this.name,
            action: (data) => this.translate(),
        });
        this.translate();
    }
    /**
     * This method will be called when the component is created
     * and will translate the text of the component
     * @returns The translated text
     */
    async getTranslatedText() {
        return await Text.instance.get(this.category, this.name);
    }
    /**
     * This method will be called when the component is created
     */
    async translate() {
        this.element.innerText = await this.getTranslatedText();
    }
}
