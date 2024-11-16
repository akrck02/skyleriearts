var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Text_1;
import { Configuration } from "../configuration/configuration.js";
import { EasyFetch } from "../lib/gtdf/core/connection/easy.fetch.js";
import { Singleton } from "../lib/gtdf/core/decorator/singleton.js";
import { Signal } from "../lib/gtdf/core/signals/signals.js";
import { StaticImplements } from "../lib/gtdf/core/static/static.inteface.js";
let Text = Text_1 = class Text {
    constructor() {
        this.availableBundles = {};
    }
    /**
     * get the category from the bundle
     * if the category does not exist,
     * it will try to fetch it 3 times
     * @param name The name of the category
     * @returns The category
     */
    async getCategory(name) {
        let category = this.availableBundles[name];
        if (category !== undefined &&
            this.currentLanguage === Configuration.instance.getLanguage())
            return category;
        const language = Configuration.instance.getLanguage();
        category = await this.fetchCategoryRetrying(name, language, Text_1.RETRY_ATTEMPTS);
        if (category != undefined)
            this.currentLanguage = language;
        this.availableBundles[name] = category;
        return category;
    }
    /**
     * Fetch the category from the server
     */
    async fetchCategoryRetrying(name, language, maxAttempts = 1) {
        let category = undefined;
        let currentAttempts = 0;
        while (undefined === category && currentAttempts < maxAttempts) {
            maxAttempts++;
            await EasyFetch.get({
                url: `${Configuration.instance.path.language}${language.main}/${name}.json`,
                parameters: {},
            })
                .status(200, (json) => (category = json))
                .json();
        }
        return category;
    }
    /**
     * Get the text from the category
     * @param category The category to get the text from
     * @param key The key of the text
     * @returns The text
     */
    async get(category, key) {
        const categoryBundle = await this.getCategory(category);
        if (categoryBundle === undefined)
            return "";
        const text = categoryBundle[key];
        if (text === undefined)
            return "";
        return text;
    }
};
Text.RELOAD_TEXT_SIGNAL = "reload_text";
Text.RETRY_ATTEMPTS = 3;
Text.reloadTextSignal = new Signal(Text_1.RELOAD_TEXT_SIGNAL);
Text = Text_1 = __decorate([
    Singleton(),
    StaticImplements(),
    __metadata("design:paramtypes", [])
], Text);
export { Text };
