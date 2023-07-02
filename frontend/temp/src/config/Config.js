import { getLanguage } from "../lang/Language.js";
/**
 * Environment states
 */
export var ENVIRONMENT;
(function (ENVIRONMENT) {
    ENVIRONMENT["DEVELOPMENT"] = "development";
    ENVIRONMENT["PRODUCTION"] = "production";
})(ENVIRONMENT || (ENVIRONMENT = {}));
/**
 * Configuration for the application
 */
export class Config {
    /**
     * Set default configurations for the application
     */
    static async setDefaultVariables() {
        if (Config.getConfigVariable(this.VARIABLES.ANIMATIONS) == undefined) {
            this.setAnimations(true);
        }
        if (Config.getConfigVariable(this.VARIABLES.LANGUAGE) == undefined) {
            this.setLanguage(getLanguage(navigator.language));
        }
    }
    /**
     * Get application configurations
     * @returns the application configurations
     */
    static getConfig() {
        let localStorageConfiguration = JSON.parse(localStorage.getItem(Config.BASE.APP_NAME + "-config"));
        if (!localStorageConfiguration) {
            localStorageConfiguration = {};
        }
        return localStorageConfiguration;
    }
    /**
     * Add a configuration variable
     * @param key the name of the variable
     * @param value the value of the variable
     */
    static setConfigVariable(key, value) {
        let localStorageConfiguration = Config.getConfig();
        const config = localStorageConfiguration;
        config[key] = value;
        localStorage.setItem(Config.BASE.APP_NAME + "-config", JSON.stringify(config));
    }
    /**
     * Get a configuration variable
     * @param key the name of the variable
     * @returns the value of the variable
     */
    static getConfigVariable(key) {
        let localStorageConfiguration = this.getConfig();
        return localStorageConfiguration[key];
    }
    /**
     * Set animation for application on|off
     * @param on The boolean to set animations
     */
    static setAnimations(on) {
        this.setConfigVariable(this.VARIABLES.ANIMATIONS, on);
    }
    /**
     * Get if animations are enabled
     * @returns if animations are enabled
     */
    static areAnimationsEnabled() {
        return this.getConfigVariable(this.VARIABLES.ANIMATIONS) === "true";
    }
    /**
     * Set the application language
     */
    static setLanguage(lang) {
        this.setConfigVariable(this.VARIABLES.LANGUAGE, lang);
    }
    /**
     * Get the current app language
     * @returns The app language
     */
    static getLanguage() {
        return getLanguage(this.getConfigVariable(this.VARIABLES.LANGUAGE));
    }
}
Config.VARIABLES = {
    ANIMATIONS: "ANIMATIONS",
    LANGUAGE: "LANG"
};
//global runtime configurations
Config.BASE = {
    APP_NAME: "Gtdf-App",
    APP_VERSION: "v.x.x",
    HOST: "127.0.0.1",
    PORT: 80,
    URL: location.href,
    ENVIRONMENT: ENVIRONMENT.DEVELOPMENT,
    DEBUG: true,
    LOG_LEVEL: "debug",
    LOG_FILE: "app.log",
    WEBSITE: "https://akrck02.github.io/#/software/GTD-Framework"
};
Config.PATHS = {
    APP: "../app/",
    ROOT: "../frontend/",
    LOGS: "../frontend/logs/",
    RESOURCES: "../resources/",
    IMAGES: "../resources/images/",
    ICONS: "../resources/icons/",
};
Config.VIEWS = {
    BASE_URL: "../app/#/",
    HOME: "../app/#/home/",
    ERROR: "../app/#/error/",
    BLANK: "../app/#/blank/",
    CONTACT: "../app/#/contact/",
    ABOUT: "../app/#/about/",
    GALLERY: "../app/#/gallery/",
};
Config.API = {
    URL: "http://127.0.0.1:3333/api/v1/",
    PING: "http://127.0.0.1:3333/api/v1/ping/",
};
