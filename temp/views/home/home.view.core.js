import { Configuration } from "../../configuration/configuration.js";
import { Text } from "../../language/text.js";
import { ViewCore } from "../../lib/gtdf/view/view.core.js";
import LanguageService from "../../services/language.service.js";
/**
 * This class represents the core of the home view
 * it handles the logic of the home view, calculations, etc.
 */
export default class HomeViewCore extends ViewCore {
    /**
     * Get available languages to add to the select
     * @returns The available languages
     */
    static getLanguages() {
        return LanguageService.getLanguages();
    }
    /**
     * Set the app language and reload
     * @param selected The selected language
     */
    static async setLanguage(selected) {
        Configuration.instance.setLanguage(selected);
        await Text.reloadTextSignal.emit(Configuration.instance.getLanguage());
        // Utils.redirect(Configuration.instance.views.home, [], true);
    }
}
HomeViewCore.CONTRIBUTE_URL = "https://github.com/akrck02/GTD-Framework";
