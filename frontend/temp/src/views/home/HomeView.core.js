import { Config } from "../../config/Config.js";
import Utils from "../../core/Utils.js";
import { ViewCore } from "../../lib/gtdf/views/ViewCore.js";
import LanguageService from "../../services/LanguageService.js";
export default class HomeCore extends ViewCore {
    /**
     * Get available languages to add to the select
     * @returns The available languages
     */
    static getLanguages() {
        const languages = LanguageService.getAvailableLanguages();
        const formatted = {};
        const list = Object.keys(languages);
        list.forEach(lang => {
            formatted[lang.toUpperCase().substring(0, 1) + lang.toLowerCase().substring(1)] = languages[lang];
        });
        return formatted;
    }
    /**
     * Set the app language and reload
     * @param selected The selected language
     */
    static setLanguage(selected) {
        Config.setLanguage(selected);
        Utils.redirect(Config.VIEWS.HOME, [], true);
    }
}
HomeCore.CONTRIBUTE_URL = "https://github.com/akrck02/GTD-Framework";
