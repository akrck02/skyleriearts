var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Configuration_1;
import { Singleton } from "../lib/gtdf/core/decorator/singleton.js";
import { StaticImplements } from "../lib/gtdf/core/static/static.inteface.js";
import Urls from "../lib/gtdf/data/urls.js";
import Language from "../lib/gtdf/language/language.js";
/**
 * Environment states
 */
export var Environment;
(function (Environment) {
    Environment["DEVELOPMENT"] = "development";
    Environment["PRODUCTION"] = "production";
})(Environment || (Environment = {}));
/**
 * Available themes for the application
 */
export var Theme;
(function (Theme) {
    Theme["DARK"] = "dark";
    Theme["LIGHT"] = "light";
})(Theme || (Theme = {}));
/**
 * Configuration for the application
 */
let Configuration = Configuration_1 = class Configuration {
    /**
     * Load a configuration object into the class
     * this mehod adapts the urls
     */
    load(response) {
        this.variables = response.variables;
        this.base = response.base;
        this.path = response.path;
        this.views = response.views;
        this.api = response.api;
        for (const key in this.path) {
            if (key == Configuration_1.URL_KEY) {
                this.path[key] = Urls.addSlash(this.path[key]);
                continue;
            }
            this.path[key] = this.path.url + Urls.addSlash(this.path[key]);
        }
        for (const key in this.views) {
            const element = this.views[key];
            if (key == Configuration_1.URL_KEY) {
                this.views[key] = Urls.addStartSlash(this.views[key]);
                this.views[key] = Urls.addSlash(this.views[key]);
                continue;
            }
            this.views[key] = this.views.url + Urls.addSlash(this.views[key]);
        }
        for (const key in this.api) {
            const element = this.api[key];
            if (key == Configuration_1.URL_KEY) {
                this.api[key] = Urls.addSlash(this.api[key]);
                continue;
            }
            this.api[key] = this.api.url + this.api[key];
        }
        this.setDefaultVariablesIfNeeded();
    }
    /**
     * Set configuration variables with default values
     * if they are not set
     */
    setDefaultVariablesIfNeeded() {
        if (this.getStorageConfigurationVariable(Configuration_1.ANIMATION_KEY) ==
            undefined)
            this.setAnimations(true);
        if (this.getStorageConfigurationVariable(Configuration_1.LANGUAGE_KEY) ==
            undefined)
            this.setLanguage(Language.get(navigator.language).main);
        if (this.getStorageConfigurationVariable(Configuration_1.THEME) == undefined)
            this.setTheme(Theme.LIGHT);
        else if (this.isDarkTheme())
            this.setDarkTheme();
        else
            this.setLightTheme();
        console.debug("Theme: " + this.getStorageConfigurationVariable(Configuration_1.THEME));
    }
    /**
     * Get application configurations from storage
     * @returns the application configurations
     */
    getStorageConfiguration() {
        let localStorageConfiguration = JSON.parse(localStorage.getItem(this.base.app_name + Configuration_1.CONFIGURATION_NAME_APPENDIX));
        if (!localStorageConfiguration)
            localStorageConfiguration = {};
        return localStorageConfiguration;
    }
    /**
     * Add a configuration variable to storage
     * @param key the name of the variable
     * @param value the value of the variable
     */
    setStorageConfigurationVariable(key, value) {
        let localStorageConfiguration = this.getStorageConfiguration();
        const config = localStorageConfiguration;
        config[key] = value;
        localStorage.setItem(this.base.app_name + Configuration_1.CONFIGURATION_NAME_APPENDIX, JSON.stringify(config));
    }
    /**
     * Get a configuration variable from storage
     * @param key the name of the variable
     * @returns the value of the variable
     */
    getStorageConfigurationVariable(key) {
        let localStorageConfiguration = this.getStorageConfiguration();
        return localStorageConfiguration[key];
    }
    /**
     * Set animation for application on|off
     * @param on The boolean to set animations
     */
    setAnimations(on) {
        this.setStorageConfigurationVariable(Configuration_1.ANIMATION_KEY, on);
    }
    /**
     * Get if animations are enabled
     * @returns if animations are enabled
     */
    areAnimationsEnabled() {
        return (this.getStorageConfigurationVariable(Configuration_1.ANIMATION_KEY) ===
            "true");
    }
    /**
     * Set the application language
     */
    setLanguage(lang) {
        this.setStorageConfigurationVariable(Configuration_1.LANGUAGE_KEY, lang);
    }
    /**
     * Get the current app language
     * @returns The app language
     */
    getLanguage() {
        return Language.get(this.getStorageConfigurationVariable(Configuration_1.LANGUAGE_KEY));
    }
    /**
     * Set the title of the page
     * @param title The title of the page
     */
    setTitle(title) {
        document.title = title;
        window.history.pushState({}, title, window.location.href);
    }
    /**
     * Set animation for application on|off
     * @param on The boolean to set animations
     */
    setTheme(theme) {
        this.setStorageConfigurationVariable(Configuration_1.THEME, theme);
    }
    /**
     * Get if animations are enabled
     * @returns if animations are enabled
     */
    isDarkTheme() {
        return (this.getStorageConfigurationVariable(Configuration_1.THEME) === Theme.DARK);
    }
    /**
     * Toggle the theme of the application
     */
    toggleTheme() {
        if (this.isDarkTheme())
            return this.setLightTheme();
        else
            return this.setDarkTheme();
    }
    /**
     * Set the theme of the application to dark
     */
    setDarkTheme() {
        document.documentElement.dataset.theme = Theme.DARK;
        this.setTheme(Theme.DARK);
        return Theme.DARK;
    }
    /**
     * Set the theme of the application to light
     */
    setLightTheme() {
        document.documentElement.dataset.theme = Theme.LIGHT;
        this.setTheme(Theme.LIGHT);
        return Theme.LIGHT;
    }
    /**
     * Get if the application is in development mode
     */
    isDevelopment() {
        return this.base.environment === Environment.DEVELOPMENT;
    }
};
Configuration.ANIMATION_KEY = "animations";
Configuration.LANGUAGE_KEY = "language";
Configuration.THEME = "theme";
Configuration.URL_KEY = "url";
Configuration.CONFIGURATION_NAME_APPENDIX = "-config";
Configuration = Configuration_1 = __decorate([
    Singleton(),
    StaticImplements()
], Configuration);
export { Configuration };
