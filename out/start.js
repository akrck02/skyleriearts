(function () {
    'use strict';

    /**
     * Singleton decorator to make a class a singleton
     *
     */
    function Singleton() {
        return function (target) {
            console.debug(`Singleton instanciated: ${target.name}`);
            target.instanceFn = () => {
                if (!target.instance)
                    target.instance = new target();
                return target.instance;
            };
            target.instanceFn();
        };
    }

    /**
     * This decorator is used to mark a class as implementing an interface
     * as static classes cannot implement interfaces
     */
    function StaticImplements() {
        return (constructor) => {
        };
    }

    /**
     * This class provides methods for url manipulation.
     * @author akrck02
     */
    class Urls {
        /**
         * Get parameters of a url by breakpoint
         * @param url url to get parameters from
         * @param breakpoint breakpoint to get parameters from
         * @description This method is useful for getting parameters of a url by breakpoint.
         * @returns parameters of a url
         * @example
         *     const url = "https://www.website.org/search/user/1/page/2";
         *     const breakpoint = "search";
         *     const parameters = getParametersByBreakPoint(url, breakpoint);
         *     console.log(parameters); // ["user","1","page","2"]
         */
        static getParametersByBreakPoint(url, breakpoint) {
            let params = url.split("/");
            const index = params.indexOf(breakpoint);
            if (index == -1)
                return [];
            return params.slice(index, params.length);
        }
        /**
         * Get parameters of a url by index
         * @param url url to get parameters from
         * @param index index to get parameters from
         * @description This method is useful for getting parameters of a url by index.
         * @returns parameters of a url
         * @example
         *      const url = "https://www.website.org/search/user/1/page/2";
         *      const index = 1;
         *      const parameters = getParametersByIndex(url, index);
         *      console.log(parameters); // ["1","page","2"]
         */
        static getParametersByIndex(url, index) {
            let params = url.split("/");
            params = params.slice(index, params.length);
            return params;
        }
        /**
         * Download a file from a url on the client
         * @param url url of the file
         * @param filename name of the file
         * @description This method is useful for downloading a file from a url on the client.
         * @example
         *     const url = "https://www.website.org/search/files/17293.jpg";
         *     const filename = "cat.jpg";
         *     downloadFile(url, filename);
         */
        static downloadFile(uri, name) {
            let link = document.createElement("a");
            link.download = name;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        /**
         * Get url GET parameters
         * @param url url to get parameters from
         * @description This method is useful for getting parameters of a url.
         * @returns parameters of a url
         * @example
         *    const url = "https://www.website.org?search=&user=akrck02&page=2";
         *    const parameters = getUrlGetParameters(url);
         *    console.log(parameters); // {search: "", user: "akrck02", page: "2"}
         */
        static getUrlGetParameters(url) {
            let params = url.split("?");
            if (params.length < 2)
                return {};
            params = params[1].split("&");
            let result = {};
            params.forEach((param) => {
                let paramArray = param.split("=");
                result[paramArray[0]] = paramArray[1];
            });
            return result;
        }
        /**
         * Get url GET parameter
         * @param url url to get parameter from
         * @returns parameter of a url
         */
        static addSlash(url) {
            return url[url.length - 1] === "/" ? url : url + "/";
        }
        /**
         * Get url GET parameter
         * @param url url to get parameter from
         * @returns parameter of a url
         */
        static addStartSlash(url) {
            return url[0] === "/" ? url : "/" + url;
        }
    }

    /**
     * Languages that can be used in the application
     * @author akrck02
     */
    const Languages = {
        English: { name: "english", main: "en", locales: ["en", "en-US", "en-GB"] },
        Spanish: { name: "spanish", main: "es", locales: ["es", "es-ES"] },
        French: { name: "french", main: "fr", locales: ["fr", "fr-FR"] },
        German: { name: "german", main: "de", locales: ["de", "de-DE"] },
        Italian: { name: "italian", main: "it", locales: ["it", "it-IT"] },
        Portuguese: { name: "portuguese", main: "pt", locales: ["pt", "pt-PT"] },
        Russian: { name: "russian", main: "ru", locales: ["ru", "ru-RU"] },
        Chinese: { name: "chinese", main: "zh", locales: ["zh", "zh-CN"] },
        Japanese: { name: "japanese", main: "ja", locales: ["ja", "ja-JP"] },
        Korean: { name: "korean", main: "ko", locales: ["ko", "ko-KR"] },
        Arabic: { name: "arabic", main: "ar", locales: ["ar", "ar-SA"] },
        Hindi: { name: "hindi", main: "hi", locales: ["hi", "hi-IN"] },
        Turkish: { name: "turkish", main: "tr", locales: ["tr", "tr-TR"] },
        Dutch: { name: "dutch", main: "nl", locales: ["nl", "nl-NL"] },
        Polish: { name: "polish", main: "pl", locales: ["pl", "pl-PL"] },
        Swedish: { name: "swedish", main: "sv", locales: ["sv", "sv-SE"] },
        Danish: { name: "danish", main: "da", locales: ["da", "da-DK"] },
        Norwegian: { name: "norwegian", main: "no", locales: ["no", "no-NO"] },
        Finnish: { name: "finnish", main: "fi", locales: ["fi", "fi-FI"] },
        Greek: { name: "greek", main: "el", locales: ["el", "el-GR"] },
        Czech: { name: "czech", main: "cs", locales: ["cs", "cs-CZ"] },
        Hungarian: { name: "hungarian", main: "hu", locales: ["hu", "hu-HU"] },
        Romanian: { name: "romanian", main: "ro", locales: ["ro", "ro-RO"] },
        Slovak: { name: "slovak", main: "sk", locales: ["sk", "sk-SK"] },
        Bulgarian: { name: "bulgarian", main: "bg", locales: ["bg", "bg-BG"] },
        Croatian: { name: "croatian", main: "hr", locales: ["hr", "hr-HR"] },
        Lithuanian: { name: "lithuanian", main: "lt", locales: ["lt", "lt-LT"] },
        Latvian: { name: "latvian", main: "lv", locales: ["lv", "lv-LV"] },
        Estonian: { name: "estonian", main: "et", locales: ["et", "et-EE"] },
        Slovenian: { name: "slovenian", main: "sl", locales: ["sl", "sl-SI"] },
        Serbian: { name: "serbian", main: "sr", locales: ["sr", "sr-RS"] },
        Ukrainian: { name: "ukrainian", main: "uk", locales: ["uk", "uk-UA"] },
        Hebrew: { name: "hebrew", main: "he", locales: ["he", "he-IL"] },
        Thai: { name: "thai", main: "th", locales: ["th", "th-TH"] },
        Vietnamese: { name: "vietnamese", main: "vi", locales: ["vi", "vi-VN"] },
        Indonesian: { name: "indonesian", main: "id", locales: ["id", "id-ID"] },
        Malay: { name: "malay", main: "ms", locales: ["ms", "ms-MY"] },
        Filipino: { name: "filipino", main: "fil", locales: ["fil", "fil-PH"] },
        Swahili: { name: "swahili", main: "sw", locales: ["sw", "sw-KE"] },
        Afrikaans: { name: "afrikaans", main: "af", locales: ["af", "af-ZA"] },
        Amharic: { name: "amharic", main: "am", locales: ["am", "am-ET"] },
        Armenian: { name: "armenian", main: "hy", locales: ["hy", "hy-AM"] },
        Azerbaijani: { name: "azerbaijani", main: "az", locales: ["az", "az-AZ"] },
        Belarusian: { name: "belarusian", main: "be", locales: ["be", "be-BY"] },
        Bengali: { name: "bengali", main: "bn", locales: ["bn", "bn-BD"] },
        Bosnian: { name: "bosnian", main: "bs", locales: ["bs", "bs-BA"] },
        Galician: { name: "galician", locales: ["gl", "gl-ES"] },
        // Add more languages here
    };
    /**
     * This class is used to get the language from the locale
     * @author akrck02
     */
    class Language {
        /**
         * Get the language from the locale
         * @param locale The locale
         * @returns The language
         */
        static get(locale) {
            if (locale === undefined)
                return Language.DEFAULT;
            const found = Language.available.find((lang) => lang.locales.includes(locale));
            if (found === undefined)
                return Language.DEFAULT;
            return found;
        }
    }
    /**
     * Available languages for the app
     */
    Language.available = [
        Languages.English,
        Languages.Spanish,
    ];
    /**
     * Default language for the app
     */
    Language.DEFAULT = Languages.English;

    var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var Configuration_1;
    /**
     * Environment states
     */
    var Environment;
    (function (Environment) {
        Environment["DEVELOPMENT"] = "development";
        Environment["PRODUCTION"] = "production";
    })(Environment || (Environment = {}));
    /**
     * Available themes for the application
     */
    var Theme;
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
                this.views[key];
                if (key == Configuration_1.URL_KEY) {
                    this.views[key] = Urls.addStartSlash(this.views[key]);
                    this.views[key] = Urls.addSlash(this.views[key]);
                    continue;
                }
                this.views[key] = this.views.url + Urls.addSlash(this.views[key]);
            }
            for (const key in this.api) {
                this.api[key];
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
    Configuration = Configuration_1 = __decorate$6([
        Singleton(),
        StaticImplements()
    ], Configuration);

    /**
     * This enum represents the available HTTP methods
     * @author akrck02
     */
    var HttpMethod;
    (function (HttpMethod) {
        HttpMethod["Get"] = "GET";
        HttpMethod["Post"] = "POST";
        HttpMethod["Put"] = "PUT";
        HttpMethod["Delete"] = "DELETE";
        HttpMethod["Update"] = "UPDATE";
        HttpMethod["Patch"] = "PATCH";
        HttpMethod["Head"] = "HEAD";
        HttpMethod["Options"] = "OPTIONS";
        HttpMethod["Connect"] = "CONNECT";
        HttpMethod["Trace"] = "TRACE";
        HttpMethod["All"] = "ALL";
    })(HttpMethod || (HttpMethod = {}));
    /**
     * This enum represents the available mime types
     * @author akrck02
     */
    var MimeType;
    (function (MimeType) {
        MimeType["Json"] = "application/json";
        MimeType["Xml"] = "application/xml";
        MimeType["Html"] = "text/html";
        MimeType["Text"] = "text/plain";
        MimeType["Form"] = "multipart/form-data";
        MimeType["UrlEncoded"] = "application/x-www-form-urlencoded";
        MimeType["Blob"] = "application/octet-stream";
        MimeType["Pdf"] = "application/pdf";
        MimeType["Zip"] = "application/zip";
        MimeType["Mp3"] = "audio/mpeg";
        MimeType["Mp4"] = "video/mp4";
        MimeType["Png"] = "image/png";
        MimeType["Jpeg"] = "image/jpeg";
        MimeType["Gif"] = "image/gif";
        MimeType["Svg"] = "image/svg+xml";
        MimeType["Ico"] = "image/x-icon";
        MimeType["Csv"] = "text/csv";
        MimeType["Css"] = "text/css";
        MimeType["Javascript"] = "text/javascript";
        MimeType["Typescript"] = "text/typescript";
        MimeType["Webm"] = "video/webm";
        MimeType["Ogg"] = "video/ogg";
        MimeType["Ogv"] = "video/ogv";
        MimeType["Wav"] = "audio/wav";
        MimeType["Webp"] = "image/webp";
        MimeType["Woff"] = "font/woff";
        MimeType["Woff2"] = "font/woff2";
        MimeType["Ttf"] = "font/ttf";
        MimeType["Eot"] = "application/vnd.ms-fontobject";
        MimeType["Otf"] = "font/otf";
        MimeType["Xls"] = "application/vnd.ms-excel";
        MimeType["Xlsx"] = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        MimeType["Doc"] = "application/msword";
        MimeType["Docx"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        MimeType["Ppt"] = "application/vnd.ms-powerpoint";
        MimeType["Pptx"] = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        MimeType["Msg"] = "application/vnd.ms-outlook";
        MimeType["Rtf"] = "application/rtf";
        MimeType["Psd"] = "application/photoshop";
        MimeType["Ai"] = "application/postscript";
        MimeType["Eps"] = "application/postscript";
        MimeType["Xps"] = "application/vnd.ms-xpsdocument";
        MimeType["Swf"] = "application/x-shockwave-flash";
        MimeType["Flv"] = "video/x-flv";
        MimeType["Midi"] = "audio/midi";
        MimeType["Wma"] = "audio/x-ms-wma";
        MimeType["Wax"] = "audio/x-ms-wax";
        MimeType["Mka"] = "audio/x-matroska";
        MimeType["Mkv"] = "video/x-matroska";
        MimeType["Avi"] = "video/x-msvideo";
        MimeType["Mov"] = "video/quicktime";
        MimeType["Wmv"] = "video/x-ms-wmv";
        MimeType["M4a"] = "audio/mp4";
        MimeType["M4v"] = "video/mp4";
        MimeType["F4v"] = "video/mp4";
        MimeType["F4a"] = "audio/mp4";
        MimeType["F4b"] = "audio/mp4";
        MimeType["M4b"] = "audio/mp4";
        MimeType["M4r"] = "audio/mp4";
        MimeType["Mpga"] = "audio/mpeg";
        MimeType["Mp2"] = "audio/mpeg";
        MimeType["Mp2A"] = "audio/mpeg";
        MimeType["M2a"] = "audio/mpeg";
        MimeType["M3a"] = "audio/mpeg";
        MimeType["Oga"] = "audio/ogg";
    })(MimeType || (MimeType = {}));
    /**
     * This enum represents the available text encodings
     * @author akrck02
     */
    var TextEncoding;
    (function (TextEncoding) {
        TextEncoding["Utf8"] = "UTF-8";
        TextEncoding["Utf16"] = "UTF-16";
        TextEncoding["Utf16be"] = "UTF-16BE";
        TextEncoding["Utf16le"] = "UTF-16LE";
        TextEncoding["Iso88591"] = "ISO-8859-1";
        TextEncoding["Iso88592"] = "ISO-8859-2";
        TextEncoding["Iso88593"] = "ISO-8859-3";
        TextEncoding["Iso88594"] = "ISO-8859-4";
        TextEncoding["Iso88595"] = "ISO-8859-5";
        TextEncoding["Iso88596"] = "ISO-8859-6";
        TextEncoding["Iso88597"] = "ISO-8859-7";
        TextEncoding["Iso88598"] = "ISO-8859-8";
        TextEncoding["Iso88599"] = "ISO-8859-9";
        TextEncoding["Iso885910"] = "ISO-8859-10";
        TextEncoding["Iso885913"] = "ISO-8859-13";
        TextEncoding["Iso885914"] = "ISO-8859-14";
        TextEncoding["Iso885915"] = "ISO-8859-15";
        TextEncoding["Iso885916"] = "ISO-8859-16";
        TextEncoding["Koi8R"] = "KOI8-R";
        TextEncoding["Koi8U"] = "KOI8-U";
        TextEncoding["Macintosh"] = "macintosh";
        TextEncoding["Windows1250"] = "windows-1250";
        TextEncoding["Windows1251"] = "windows-1251";
        TextEncoding["Windows1252"] = "windows-1252";
        TextEncoding["Windows1253"] = "windows-1253";
        TextEncoding["Windows1254"] = "windows-1254";
        TextEncoding["Windows1255"] = "windows-1255";
        TextEncoding["Windows1256"] = "windows-1256";
        TextEncoding["Windows1257"] = "windows-1257";
        TextEncoding["Windows1258"] = "windows-1258";
        TextEncoding["Xmaccyrillic"] = "x-mac-cyrillic";
        TextEncoding["Gb18030"] = "GB18030";
        TextEncoding["Big5"] = "Big5";
        TextEncoding["Shiftjis"] = "Shift_JIS";
        TextEncoding["Eucjp"] = "EUC-JP";
        TextEncoding["Iso2022jp"] = "ISO-2022-JP";
        TextEncoding["Euckr"] = "EUC-KR";
        TextEncoding["Iso2022kr"] = "ISO-2022-KR";
        TextEncoding["Ibm866"] = "IBM866";
        TextEncoding["Ibm775"] = "IBM775";
        TextEncoding["Iso885911"] = "ISO-8859-11";
        TextEncoding["Windows874"] = "windows-874";
        TextEncoding["Tis620"] = "TIS-620";
    })(TextEncoding || (TextEncoding = {}));

    /**
     * A class that represents a response from a fetch request.
     * @description Encapsulates the data and methods for easy fetching
     * @author Akrck02
     */
    class Response {
        constructor(response) {
            this.response = response;
            this.middleware = [];
            this.errorFunction = (err) => console.error("Error in response : ", err);
            this.statusFunctions = new Map();
            this.statusFunctions.set(200, (res) => console.log("Success", res));
        }
        /**
         * Handles the response status code transforming the response with the responseTransformFunction
         * and executing the corresponding status function.
         * @param res The response object
         * @param statusFunctions The map of status functions
         * @param errorFunction The error function
         * @param responseTranformFunction The response transform function
         */
        async handleResponseStatus(res, statusFunctions, errorFunction, responseTranformFunction) {
            if (this.statusFunctions.has(res.status)) {
                let data = await responseTranformFunction(res);
                await this.statusFunctions.get(res.status)(data);
            }
            else
                this.errorFunction(new Error("Status code not handled"));
        }
        /**
         * Executes the callback functions corresponding to the status code getting the response as a json object.
         * in case of an error, the error function will be executed.
         *
         * @example
         * await EasyFetch.get({
         *   url: "https://mydomain/json/1",
         *   parameters: {
         *        name: "John",
         *   },
         *   headers: {
         *      "Content-type": "application/json",
         *   }
         * })
         * .status(200,(response) => {
         *    console.log(response);
         * })
         * .status(404,(response) => {
         *   console.log("NOT FOUND: ",response);
         * })
         * .error((error) => {
         *   console.error(error);
         * })
         * .json()
         */
        async json() {
            await this.response
                .then(async (res) => await this.handleResponseStatus(res, this.statusFunctions, this.errorFunction, async (res) => await res.json()))
                .catch((err) => this.errorFunction(err));
        }
        /**
         * Executes the callback function corresponding to the status code getting the response as a text.
         * in case of an error, the error function will be executed.
         * @example
         * await EasyFetch.get({
         *   url: "https://mydomain/text/1",
         *   parameters: {
         *        name: "John",
         *   },
         *   headers: {
         *      "Content-type": "text/plain",
         *   }
         * })
         * .status(200,(response) => {
         *    console.log(response);
         * })
         * .status(404,(response) => {
         *   console.log("NOT FOUND: ",response);
         * })
         * .error((error) => {
         *   console.error(error);
         * })
         * .text()
         */
        async text() {
            await this.response
                .then(async (res) => await this.handleResponseStatus(res, this.statusFunctions, this.errorFunction, async (res) => await res.text()))
                .catch((err) => this.errorFunction(err));
        }
        /**
         * Executes the callback function corresponding to the status code getting the response as a blob.
         * in case of an error, the error function will be executed.
         * @example
         * await EasyFetch.get({
         *  url: "https://mydomain/blob/1",
         * parameters: {
         *     name: "John",
         * },
         * headers: {
         *    "Content-type": "application/octet-stream",
         * }
         * })
         * .status(200,(response) => {
         *   console.log(response);
         * })
         * .status(404,(response) => {
         *  console.log("NOT FOUND: ",response);
         * })
         * .error((error) => {
         *  console.error(error);
         * })
         * .blob()
         */
        async blob() {
            await this.response
                .then(async (res) => await this.handleResponseStatus(res, this.statusFunctions, this.errorFunction, async (res) => await res.blob()))
                .catch((err) => this.errorFunction(err));
        }
        /**
         * Sets the callback function to be executed corresponding to the status code.
         * @param code the status code or list of status codes
         * @param success the callback function
         * @returns the response itself
         */
        status(code, func) {
            let numbers = [];
            if (typeof code === "number") {
                numbers.push(code);
            }
            else {
                numbers = code;
            }
            for (let i = 0; i < numbers.length; i++) {
                this.statusFunctions.set(numbers[i], func);
            }
            return this;
        }
        /**
         * Sets the callback function to be executed when the response is unsuccessful.
         * @param error the callback function
         * @returns the response itself
         */
        error(error) {
            this.errorFunction = error;
            return this;
        }
    }
    class EasyFetch {
        static get(properties) {
            return EasyFetch.exec({
                method: HttpMethod.Get,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType,
            });
        }
        static post(properties) {
            return EasyFetch.exec({
                method: HttpMethod.Post,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType,
            });
        }
        static put(properties) {
            return EasyFetch.exec({
                method: HttpMethod.Put,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType,
            });
        }
        static delete(properties) {
            return EasyFetch.exec({
                method: HttpMethod.Delete,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType,
            });
        }
        static patch(properties) {
            return EasyFetch.exec({
                method: HttpMethod.Patch,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType,
            });
        }
        static head(properties) {
            return EasyFetch.exec({
                method: HttpMethod.Head,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType,
            });
        }
        static options(properties) {
            return EasyFetch.exec({
                method: HttpMethod.Options,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType,
            });
        }
        static connect(properties) {
            return EasyFetch.exec({
                method: HttpMethod.Connect,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType,
            });
        }
        static trace(properties) {
            return EasyFetch.exec({
                method: HttpMethod.Trace,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType,
            });
        }
        static update(properties) {
            return EasyFetch.exec({
                method: HttpMethod.Update,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType,
            });
        }
        /**
         * Adds a middleware function to be executed before the request is sent.
         * @param func the middleware function
         */
        static addMiddleware(func) {
            EasyFetch.middleware.push(func);
        }
        /**
         * Removes a middleware function.
         * @param func the middleware function
         * @returns true if the function was removed, false otherwise
         */
        static exec(properties) {
            let options = {
                method: properties.method,
                headers: {
                    "Content-type": `${properties.contentType || "application/json"};charset=${properties.charset || "UTF-8"}`,
                    mode: "cors",
                    "Sec-Fetch-Site": "cross-site",
                },
            };
            properties.headers && Object.assign(options.headers, properties.headers);
            if (properties.method !== HttpMethod.Get) {
                if (properties.parameters instanceof FormData) {
                    options["body"] = properties.parameters;
                    options.headers["Content-type"] =
                        `multipart/form-data;charset=${properties.charset || "UTF-8"}`;
                }
                else {
                    options["body"] = JSON.stringify(properties.parameters);
                }
            }
            const promise = fetch(properties.url, options);
            return new Response(promise);
        }
    }
    EasyFetch.middleware = [];

    class ConfigurationLoader {
        async start() {
            console.debug("ConfigurationLoader start");
            await EasyFetch.get({
                url: "./gtdf.config.json",
                parameters: {},
            })
                .status(200, (configuration) => Configuration.instance.load(configuration))
                .error(this.errorHandle)
                .json();
            console.debug("Configuration loaded");
        }
        errorHandle(error) {
            console.error(error);
        }
    }

    class KeyboardLoader {
        async start() {
            console.log("KeyboardLoader started");
        }
    }

    /**
     * This enum represents the Bubble UI css framework
     */
    var BubbleUI;
    (function (BubbleUI) {
        BubbleUI["BoxColumn"] = "box-column";
        BubbleUI["BoxRow"] = "box-row";
        BubbleUI["boxWrap"] = "box-warp";
        BubbleUI["BoxCenter"] = "box-center";
        BubbleUI["BoxXCenter"] = "box-x-center";
        BubbleUI["BoxYCenter"] = "box-y-center";
        BubbleUI["BoxXStart"] = "box-x-start";
        BubbleUI["BoxXEnd"] = "box-x-end";
        BubbleUI["BoxYStart"] = "box-y-start";
        BubbleUI["BoxXBetween"] = "box-x-between";
        BubbleUI["TextCenter"] = "text-center";
    })(BubbleUI || (BubbleUI = {}));

    /**
     * This class contains methods to manipulate the DOM elements
     * @author akrck02
     */
    class DOM {
        /**
         * Set HTML attributes to the given element.
         * @param element Element to set attributes
         * @param attributes Attributes to set
         * @returns The element with attributes in order to chain methods
         */
        static setAttributes(element, attributes) {
            if (!attributes)
                return element;
            for (const key in attributes)
                element.setAttribute(key, attributes[key]);
            return element;
        }
        /**
         * Remove the HTML attributes to the given component.
         * @param element The element to remove attributes
         * @param attributes list of data attributes to be removed
         * @returns DOM element in order to chain methods
         */
        static removeAttributes(element, attributes) {
            if (!attributes)
                return element;
            attributes.forEach((attr) => element.removeAttribute(attr));
            return element;
        }
        /**
         * Set the classes to the given component.
         * @param element element to set classes to
         * @param classes list of classes to be set
         * @returns DOM element in order to chain methods
         */
        static setClasses(element, classes) {
            if (!classes)
                return element;
            classes.forEach((cl) => element.classList.add(cl));
            return element;
        }
        /**
         * Remove the classes to the given component.
         * @param element element to remove classes to
         * @param classes list of classes to be removed
         * @returns DOM element in order to chain methods
         */
        static removeClasses(element, classes) {
            if (!classes)
                return element;
            classes.forEach((cl) => element.classList.remove(cl));
            return element;
        }
        /**
         * Set the styles to the given component.
         * @param element element to set styles to
         * @param styles Object with style names and values
         * @returns DOM element with classes in order to chain methods
         */
        static setStyles(element, styles) {
            if (!styles)
                return element;
            for (const key in styles)
                element.style[key] = styles[key];
            return element;
        }
        /**
         * Remove the classes to the given component.
         * @param element element to remove styles to
         * @param styles List of styles to be removed
         * @returns DOM element with classes in order to chain methods
         */
        static removeStyles(element, styles) {
            if (!styles)
                return element;
            styles.forEach((style) => element.style.removeProperty(style));
            return element;
        }
        /**
         * Set the events to the given component.
         * @param element element to set events to
         * @param events Object with events and listener functions
         * @returns DOM element with classes in order to chain methods
         */
        static setEvents(element, events) {
            if (!events)
                return element;
            for (const key in events)
                element.addEventListener(key, events[key]);
            return element;
        }
        /**
         * Remove the events to the given component.
         * @param element element to remove events to
         * @param events List of events to be removed
         * @returns DOM element with classes in order to chain methods
         */
        static removeEvents(element, events) {
            if (!events)
                return element;
            for (const key in events)
                element.removeEventListener(key, events[key]);
            return element;
        }
        /**
         * Set the HTML data attributes to the given component.
         * @param element element to set data attributes
         * @param dataset Object with data attributes and values
         * @returns DOM element with data attributes in order to chain methods
         */
        static setDataset(element, dataset) {
            if (!dataset)
                return element;
            for (const key in dataset)
                element.dataset[key] = dataset[key];
            return element;
        }
        /**
         * Remove the HTML data attributes to the given component.
         * @param element element to set data attributes
         * @param dataset Object with data attributes and values
         * @returns DOM element with data attributes in order to chain methods
         */
        static removeDataset(element, dataset) {
            if (!dataset)
                return element;
            dataset.forEach((data) => delete element.dataset[data]);
            return element;
        }
        /**
         * Remove all the NODEs matching the selector
         * @param selector a query selector to find the elements
         * @returns Promise with the number of elements removed
         * @example
         *    const removed = await UIComponent.removeAll("div");
         *    console.log(`removed ${removed} elements`);
         */
        static async removeAll(selector) {
            const comps = document.querySelectorAll(selector);
            if (!comps)
                return new Promise((resolve, reject) => reject(0));
            let count = 0;
            comps.forEach((comp) => {
                comp.parentNode.removeChild(comp);
                count++;
            });
            return new Promise((resolve) => resolve(count));
        }
        /**
         * Execute a function for each element matching the selector
         * @param selector a query selector to match the node to remove
         * @param funct Function to execute for each element
         * @returns a promise representing if the node was removed
         */
        static async forAll(selector, funct) {
            const comps = document.querySelectorAll(selector);
            if (!comps)
                return new Promise((resolve, reject) => reject("No element found"));
            for (let i = 0; i < comps.length; i++) {
                const comp = comps[i];
                await funct(comp);
            }
            return new Promise((resolve) => resolve());
        }
        /**
         * Remove the component matching the given component.
         * @param selector a query selector to match the node to remove
         * @returns a promise representing if the node was removed
         * @example
         *   const removed = await UIComponent.remove("div");
         *   console.log(`removed ${removed} elements`);
         */
        static async remove(selector) {
            const comp = document.querySelector(selector);
            if (comp == null)
                return new Promise((resolve, reject) => reject("No element found"));
            comp.parentNode.removeChild(comp);
            return new Promise((resolve) => resolve(1));
        }
    }
    /**
     * This enum contains the most common HTML tags
     */
    var Html;
    (function (Html) {
        Html["View"] = "view";
        Html["Div"] = "div";
        Html["Span"] = "span";
        Html["Input"] = "input";
        Html["Button"] = "button";
        Html["Textarea"] = "textarea";
        Html["Select"] = "select";
        Html["Option"] = "option";
        Html["Form"] = "form";
        Html["Label"] = "label";
        Html["Img"] = "img";
        Html["A"] = "a";
        Html["B"] = "b";
        Html["Table"] = "table";
        Html["Thead"] = "thead";
        Html["Tbody"] = "tbody";
        Html["Tr"] = "tr";
        Html["Th"] = "th";
        Html["Td"] = "td";
        Html["I"] = "i";
        Html["Ul"] = "ul";
        Html["Li"] = "li";
        Html["Nav"] = "nav";
        Html["Header"] = "header";
        Html["Footer"] = "footer";
        Html["Section"] = "section";
        Html["Article"] = "article";
        Html["Aside"] = "aside";
        Html["H1"] = "h1";
        Html["H2"] = "h2";
        Html["H3"] = "h3";
        Html["H4"] = "h4";
        Html["H5"] = "h5";
        Html["H6"] = "h6";
        Html["P"] = "p";
        Html["Hr"] = "hr";
        Html["Br"] = "br";
        Html["Canvas"] = "canvas";
        Html["Svg"] = "svg";
        Html["Path"] = "path";
        Html["Polygon"] = "polygon";
        Html["Polyline"] = "polyline";
        Html["Circle"] = "circle";
        Html["Ellipse"] = "ellipse";
        Html["Rect"] = "rect";
        Html["Line"] = "line";
        Html["Text"] = "text";
        Html["Tspan"] = "tspan";
        Html["G"] = "g";
        Html["Mask"] = "mask";
        Html["Pattern"] = "pattern";
        Html["Defs"] = "defs";
        Html["Symbol"] = "symbol";
        Html["Use"] = "use";
        Html["Clippath"] = "clipPath";
        Html["Stop"] = "stop";
        Html["LinearGradient"] = "linearGradient";
        Html["RadialGradient"] = "radialGradient";
        Html["Filter"] = "filter";
    })(Html || (Html = {}));

    /**
     * Class representing a UI component (HTML element) with custom properties and methods.
     * @description This class is a base class for all UI components.
     * @class UIComponent
     * @author akrck02
     */
    class UIComponent {
        constructor(props) {
            this.type = props.type ?? "div";
            this.text = props.text;
            this.id = props.id;
            this.classes = props.classes;
            this.attributes = props.attributes;
            this.selectable = props.selectable;
            this.styles = props.styles;
            this.data = props.data;
            this.events = props.events;
            this.element = this.createElement();
        }
        createElement() {
            let element;
            if (!this.type)
                throw "Element without type.";
            element = document.createElement(this.type);
            if (this.text)
                element.innerHTML = this.text;
            if (this.id)
                element.id = this.id;
            if (this.classes)
                DOM.setClasses(element, this.classes);
            if (this.attributes)
                DOM.setAttributes(element, this.attributes);
            if (this.styles)
                DOM.setStyles(element, this.styles);
            if (this.data)
                DOM.setDataset(element, this.data);
            if (this.events)
                DOM.setEvents(element, this.events);
            if (this.selectable == false)
                DOM.setStyles(element, { userSelect: "none" });
            return element;
        }
        /**
         * Get the HTML code of the component.
         * @returns The HTML code of the component
         */
        toHTML() {
            return this.element.outerHTML;
        }
        /**
         * Appends a child to the component.
         * @param child  Child component to be added
         * @returns      The component itself (for chaining)
         */
        appendChild(child) {
            this.element.appendChild(child instanceof UIComponent ? child.element : child);
            return this;
        }
        /**
         * removes a child from the component.
         * @param child  Child component to be removed
         * @returns      The component itself (for chaining)
         * @description  If the child is not a child of the component, a message appears.
         */
        removeChild(child) {
            try {
                this.element.removeChild(child instanceof UIComponent ? child.element : child);
            }
            catch (e) {
                console.log(child, "is not a child of", this.element);
            }
            return this;
        }
        /**
         * append this component to a parent component.
         * @param parent Parent component to be appended to
         * @returns      The component itself (for chaining)
         */
        appendTo(parent) {
            parent.appendChild(this.element);
            return this;
        }
        /**
         * Clears the component.
         * @returns The component itself (for chaining)
         */
        clean() {
            this.element.innerHTML = "";
            return this;
        }
        /**
         * Get the value of the component.
         * @returns The value of the component
         */
        getValue() {
            if (this.element instanceof HTMLInputElement) {
                return this.element.value;
            }
            return this.element.innerHTML;
        }
        /**
         * Set the attributes to the given component.
         * @param options Object with attributes and values
         * @returns UIComponent in order to chain methods
         */
        setAttributes(options) {
            this.element = DOM.setAttributes(this.element, options);
            return this;
        }
        /**
         * Remove the attributes to the given component.
         * @param options list of atributtes to be removed
         * @returns UIComponent in order to chain methods
         * @example
         *  mycomponent.removeAttributes(["id", "alt"]);
         */
        removeAttributes(options) {
            this.element = DOM.removeAttributes(this.element, options);
            return this;
        }
        /**
         * Set the HTML data attributes to the given component.
         * @param dataset Object with data attributes and values
         * @returns UIComponent in order to chain methods
         * @example
         *    mycomponent.setDataset({
         *       "id": "1",
         *      "name": "John"
         *   });
         */
        setDataset(dataset) {
            this.element = DOM.setDataset(this.element, dataset);
            return this;
        }
        /**
         * Remove the HTML data attributes to the given component.
         * @param dataset list of data attributes to be removed
         * @returns UIComponent with data attributes in order to chain methods
         * @example
         *   mycomponent.removeDataset(["id", "name"]);
         */
        removeDataset(dataset) {
            this.element = DOM.removeDataset(this.element, dataset);
            return this;
        }
        /**
         * Set the events to the given component.
         * @param events Object with events and listener functions
         * @returns UIComponent in order to chain methods
         * @example
         *    mycomponent.setEvents({
         *         "click": () => console.log("Clicked!")
         *    });
         */
        setEvents(events) {
            this.element = DOM.setEvents(this.element, events);
            return this;
        }
        /**
         * Remove the events to the given component.
         * @param events list of events to be removed
         * @returns UIComponent in order to chain methods
         * @example mycomponent.removeEvents(["click"]);
         */
        removeEvents(events) {
            this.element = DOM.removeEvents(this.element, events);
            return this;
        }
        /**
         * Set the classes to the given component.
         * @param styles Object with styles and values
         * @returns UIComponent in order to chain methods
         * @example
         * mycomponent.setStyles({
         *     "color": "red",
         *    "font-size": "12px"
         * });
         */
        setStyles(styles) {
            this.element = DOM.setStyles(this.element, styles);
            return this;
        }
        /**
         * Remove the styles to the given component.
         * @param styles list of styles to be removed
         * @returns UIComponent in order to chain methods
         * @example
         * mycomponent.removeStyles(["color", "font-size"]);
         */
        removeStyles(styles) {
            this.element = DOM.removeStyles(this.element, styles);
            return this;
        }
        /**
         * Set the classes to the given component.
         * @param classes List of classes to be added
         * @returns UIComponent in order to chain methods
         * @example mycomponent.setClasses(["class1", "class2"]);
         */
        setClasses(classes) {
            this.element = DOM.setClasses(this.element, classes);
            return this;
        }
        /**
         * Remove the classes to the given component.
         * @param classes List of classes to be removed
         * @returns UIComponent in order to chain methods
         * @example mycomponent.removeClasses(["class1", "class2"]);
         */
        removeClasses(classes) {
            this.element = DOM.removeClasses(this.element, classes);
            return this;
        }
        /**
         * Remove the component matching the given component.
         * @param selector a query selector to match the node to remove
         * @returns a promise representing if the node was removed
         * @example mycomponent.remove(".mycomponentclass");
         */
        remove(selector) {
            this.element.parentNode.removeChild(this.element);
            return this;
        }
    }

    var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$5 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MaterialIcons_1;
    /**
     * Material icon loader class
     * loads the material icons from the json file
     * @implements IObserver the observer interface
     * @author akrck02
     */
    class MaterialIconsLoader {
        constructor() { }
        async update() {
            if (this.collection != undefined)
                return;
            this.collection = await fetch(Configuration.instance.path.icons + "materialicons.json").then((response) => response.json());
        }
    }
    /**
     * Material Icon utility class
     * @implements IObserver the observer interface
     * @implements ISingleton the singleton interface
     * @author akrck02
     */
    let MaterialIcons = MaterialIcons_1 = class MaterialIcons {
        constructor() {
            this.loader = new MaterialIconsLoader();
        }
        /**
         * Get collection of Material Icons
         * @returns The collection of Material Icons
         * @example
         *   MaterialIcons.collection();
         *
         *  // Returns
         * {
         *   "add": "<svg>...</svg>",
         *  "add_circle": "<svg>...</svg>",
         * ...
         * }
         */
        get collection() {
            return this.loader.collection;
        }
        /**
         * Get a Material Icons SVG by name.
         * @param name The name of the icon.
         * @param properties The properties of the icon.
         * @returns The container of the SVG as a UIComponent.
         */
        static get(name, properties) {
            properties.svg = MaterialIcons_1.instance.collection[name] || "";
            const icon = new UIComponent({
                type: Html.Div,
                classes: ["icon", BubbleUI.BoxCenter],
                text: createSVG(properties),
            });
            return icon;
        }
    };
    MaterialIcons = MaterialIcons_1 = __decorate$5([
        Singleton(),
        StaticImplements(),
        __metadata$5("design:paramtypes", [])
    ], MaterialIcons);
    var MaterialIcons$1 = MaterialIcons;
    /**
     * Create svg in 24 x 24 viewBox
     * @param properties properties
     * @returns svg inside a string
     * @example
     *    createSvg({
     *        fill: '#202020',
     *        size: '24',
     *        classes: ['material-icons'],
     *        svg: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>'
     *    });
     *    // returns: <svg viewBox="0 0 24 24" class="material-icons">
     */
    function createSVG(properties) {
        const svg = `
    <svg class="${properties?.classes?.join(" ")}" width="${properties.size}" height="${properties.size}" viewBox="0 0 24 24" fill="${properties.fill}" xmlns="http://www.w3.org/2000/svg">
    ${properties.svg}
    </svg>
    `;
        return svg;
    }

    class ResourceLoader {
        async start() {
            await MaterialIcons$1.instance.loader.update();
        }
    }

    class BootHandler {
        constructor() {
            this.configuration = new ConfigurationLoader();
            this.resources = new ResourceLoader();
            this.keyboard = new KeyboardLoader();
        }
        async start() {
            await this.configuration.start();
            await this.resources.start();
            await this.keyboard.start();
        }
    }

    class InitializeError extends Error {
        constructor(m) {
            super(m);
            // Set the prototype explicitly.
            Object.setPrototypeOf(this, InitializeError.prototype);
        }
    }

    /*
     * This is filled by the annotation processor with the ViewUI instances
     * that have the @Route annotation
     * @author akrck02
     */
    const Routes = [];
    /*
     * This is the annotation that will be used to register the routes
     * @author akrck02
     */
    function Route(value) {
        return (target) => {
            if (!target.instance)
                throw new Error("The @Route annotation can only be used in ViewUI instances");
            if (typeof value == "string")
                target.instance.routes = [value];
            else
                target.instance.routes = value;
            // if it is no ViewUI instance, it will not be added to the Routes
            console.debug(`Route registered /${value}`);
            Routes.push(target.instance);
        };
    }

    class Crypto {
        /**
         * Hash a message using SHA-256
         * @param message The message to hash
         * @returns The hash of the message
         */
        static async sha256(message) {
            // encode as UTF-8
            const msgBuffer = new TextEncoder().encode(message);
            // hash the message
            const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
            // convert ArrayBuffer to Array
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            // convert bytes to hex string
            const hashHex = hashArray
                .map((b) => b.toString(16).padStart(2, "0"))
                .join("");
            return hashHex;
        }
    }

    /**
     * This class represents a signal that can be emitted
     * and listen by functions
     * @author akrck02
     */
    class Signal {
        /**
         * Create a new signal
         * @param id The id of the signal
         */
        constructor(id) {
            this.id = id;
            this.actions = {};
        }
        /**
         * @inheritdoc
         */
        async connect(action) {
            action.action.toString();
            this.actions[await this.hashAction(action)] = action;
        }
        /**
         * @inheritdoc
         */
        async disconnect(action) {
            this.actions[await this.hashAction(action)] = undefined;
        }
        /**
         * @inheritdoc
         */
        async emit(data) {
            for (const name in this.actions) {
                await this.actions[name].action(data);
            }
        }
        /**
         * Hash the body of the action using sha256
         */
        async hashAction(action) {
            const prototypeString = action.toString();
            const hashedBody = await Crypto.sha256(prototypeString);
            const hashedOrigin = await Crypto.sha256(action.origin);
            return `${hashedOrigin}-${hashedBody}`;
        }
    }

    class Errors {
        /**
         * Returns the error corresponding to the given code
         * @param code The code of the error
         * @returns The corresponding error by code
         */
        static getByCode(code) {
            return Error[code];
        }
    }
    Errors.archive = {
        200: {
            code: 200,
            message: "Success",
            friendly: "Success",
            description: "The operation succeded.",
        },
        400: {
            code: 400,
            message: "Bad request",
            friendly: "The request is not valid",
            description: "The parameters may be wrong or missing.",
        },
        401: {
            code: 401,
            message: "Unauthorized",
            friendly: "You have no permissions to access this content 🔐",
            description: "The content is protected, contact the administrator to get access.",
        },
        404: {
            code: 404,
            message: "Not found",
            friendly: "We can't find the page you are looking for 😓",
            description: "The page you're searching for is no longer available.",
        },
        500: {
            code: 500,
            message: "Internal server error",
            friendly: "Ups, something went wrong 😓",
            description: "The server is experimenting an unexpected error, contact the administrator for more information.",
        },
    };

    var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$4 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    /**
     * This class is the base class for all views
     * containing the basic functionality for a view
     * @implements ISingleton the singleton interface
     * that assure that only one instance of this class is created
     * @author akrck02
     */
    let ViewUI = class ViewUI extends UIComponent {
        /**
         * The constructor of the view
         * @param details The details of the view,
         * same as the UIComponent constructor
         */
        constructor(details) {
            super(details);
            this.routes = [];
        }
        /**
         * Check if the view is pointing to the given path
         * @param name The name to check
         * @returns if the view is pointing to the given path
         */
        isPointing(path) {
            return this.routes.includes(path);
        }
    };
    ViewUI = __decorate$4([
        StaticImplements(),
        __metadata$4("design:paramtypes", [Object])
    ], ViewUI);

    var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$3 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var ErrorView_1;
    let ErrorView = ErrorView_1 = class ErrorView extends ViewUI {
        constructor() {
            super({
                type: "view",
                id: ErrorView_1.ID,
                classes: ["box-column", "box-center"],
            });
        }
        async show(params, container) {
            this.clean();
            const code = parseInt(params[0]);
            let error = Errors.getByCode(code);
            // Default error set if no error parameter was given
            if (!error) {
                error = Errors.getByCode(ErrorView_1.DEFAULT_ERROR_CODE);
            }
            // Image
            const image = new UIComponent({
                type: Html.Img,
                id: ErrorView_1.IMAGE_ID,
                attributes: {
                    src: Configuration.instance.path.icons + "error.svg",
                },
            });
            this.appendChild(image);
            // Error title
            const title = new UIComponent({
                type: Html.H1,
                id: ErrorView_1.TITLE_ID,
                text: error.friendly,
            });
            this.appendChild(title);
            // Error description
            const description = new UIComponent({
                type: Html.P,
                text: error.description,
            });
            this.appendChild(description);
            this.appendTo(container);
        }
    };
    ErrorView.DEFAULT_ERROR_CODE = 404;
    ErrorView.ID = "error";
    ErrorView.IMAGE_ID = "error-img";
    ErrorView.TITLE_ID = "error-title";
    ErrorView = ErrorView_1 = __decorate$3([
        Route("error"),
        Singleton(),
        __metadata$3("design:paramtypes", [])
    ], ErrorView);
    var ErrorView$1 = ErrorView;

    class Browser {
        /**
         * Get if the device is a small device
         * @returns True if the device is a small device
         */
        static isSmallDevice() {
            return window.matchMedia(`only screen and (max-width: ${Browser.SMALL_DEVICE_WIDTH}px)`).matches;
        }
        /**
         * Get if the device is a medium device
         * @returns True if the device is a medium device
         */
        static isMediumDevice() {
            return window.matchMedia(`only screen and (min-width: ${Browser.SMALL_DEVICE_WIDTH}px) and (max-width: ${Browser.MEDIUM_DEVICE_WIDTH}px)`).matches;
        }
        /**
         * Get if the device is a large device
         * @returns True if the device is a large device
         */
        static isLargeDevice() {
            return window.matchMedia(`only screen and (min-width: ${Browser.MEDIUM_DEVICE_WIDTH + 1}px)`).matches;
        }
        /**
         * Get if the device is a dark mode
         * @returns True if the device is a dark mode
         */
        static prefersDarkMode() {
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        /**
         * Returns true if the device is a light mode
         * @returns True if the device is a light mode
         */
        static prefersLightMode() {
            return window.matchMedia("(prefers-color-scheme: light)").matches;
        }
        /**
         * Get if device prefers reduced motion
         * @returns True if the device prefers reduced motion
         */
        static prefersReducedMotion() {
            return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }
        /**
         * Get if the device prefers reduced data
         * @param query The query to check
         * @returns True if the device prefers reduced data
         */
        static mediaQuery(query) {
            return window.matchMedia(query).matches;
        }
        /**
         * Get if matches one of the mobile media queries
         * @returns True if the device is a mobile device
         */
        static isMobile() {
            return (navigator.userAgent.match(/Android/i) ||
                navigator.userAgent.match(/BlackBerry/i) ||
                navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
                navigator.userAgent.match(/Opera Mini/i) ||
                navigator.userAgent.match(/IEMobile/i));
        }
        /**
         * Get the OS of the device
         * @returns The OS of the device as a string
         */
        static getOs() {
            if (navigator.userAgent.indexOf("Win") != -1)
                return "Windows";
            if (navigator.userAgent.indexOf("Mac") != -1)
                return "MacOS";
            if (navigator.userAgent.indexOf("Linux") != -1)
                return "Linux";
            if (navigator.userAgent.indexOf("X11") != -1)
                return "UNIX";
        }
    }
    Browser.SMALL_DEVICE_WIDTH = 760;
    Browser.MEDIUM_DEVICE_WIDTH = 1024;

    /**
     * Gallery component to show images
     * for a project
     */
    class ProjectGallery extends UIComponent {
        constructor(project) {
            super({
                type: Html.Div,
                classes: [
                    ProjectGallery.CLASS,
                    BubbleUI.BoxColumn,
                    BubbleUI.BoxXStart,
                    BubbleUI.BoxYStart,
                ],
            });
            this.visualizeImageSignal = new Signal("visualize-image");
            this.configure(project);
        }
        /**
         * Configure the gallery
         * @param project Project to show
         * @returns void
         */
        async configure(project) {
            // if nothing to show, return
            if (undefined == project ||
                undefined == project.images ||
                project.images.length == 0)
                return;
            // turn on mobile class if needed
            if (Browser.isSmallDevice()) {
                this.element.classList.add(ProjectGallery.MOBILE_CLASS);
            }
            // Add a list of images to show
            // in the gallery
            const list = new UIComponent({
                type: Html.Ul,
                id: ProjectGallery.LIST_ID,
            });
            project.images?.forEach((image) => this.register(list, image, project.images));
            list.appendTo(this);
        }
        /**
         * Register an image to the gallery
         * @param list List to append the image
         * @param image Image to register
         * @param album Album of images
         * @returns void
         */
        register(list, image, album) {
            const listItem = new UIComponent({ type: Html.Li });
            image.url;
            const canvas = new ImageCanvas(image, album, this.visualizeImageSignal);
            setTimeout(() => (canvas.element.style.opacity = "1"), 1);
            canvas.appendTo(listItem);
            listItem.appendTo(list);
        }
    }
    ProjectGallery.CLASS = "gallery";
    ProjectGallery.TITLE_ID = "title";
    ProjectGallery.LIST_ID = "image-list";
    ProjectGallery.MOBILE_CLASS = "mobile";
    /**
     * ImageCanvas component to show an image
     * in the gallery
     */
    class ImageCanvas extends UIComponent {
        constructor(image, album, signal) {
            super({
                type: Html.Div,
                classes: ["canvas"]
            });
            this.imageClickedSignal = signal;
            this.setEvents({
                click: () => {
                    this.imageClickedSignal?.emit({
                        images: album,
                        selected: album.indexOf(image),
                    });
                },
            });
            this.configure(image);
        }
        /**
         * Configure the image
         * @param image Image to show
         */
        configure(image) {
            const imageComponent = new UIComponent({
                type: Html.Img,
                attributes: {
                    src: image.url,
                    alt: image.title,
                    loading: "lazy",
                    background: "#fff",
                },
            });
            imageComponent.setEvents({
                load: () => (imageComponent.element.style.opacity = "1"),
            });
            imageComponent.appendTo(this);
        }
    }

    /**
     * Header component for the website
     */
    class Header extends UIComponent {
        constructor(tags) {
            super({
                type: Html.Div,
                id: Header.ID,
                classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYCenter],
            });
            this.tagSelectedSignal = new Signal("menu-changed");
            this.configure(tags);
        }
        async configure(tags) {
            const profilePicture = new UIComponent({
                type: Html.Img,
                id: "logo",
                attributes: {
                    src: `${Configuration.instance.path.images}logo.jpg`,
                },
            });
            const title = new UIComponent({
                type: Html.H1,
                text: "Skylerie",
                id: "title",
                classes: [BubbleUI.TextCenter],
            });
            const selected = tags.values().next().value;
            const tagMenu = new TagMenu(this.tagSelectedSignal, tags, selected);
            profilePicture.appendTo(this);
            title.appendTo(this);
            tagMenu.appendTo(this);
        }
    }
    Header.ID = "header";
    /**
     * TagMenu is a UIComponent that displays a list of tags as buttons.
     */
    class TagMenu extends UIComponent {
        constructor(signal, tags, selectedTag) {
            super({
                type: Html.Div,
                id: TagMenu.ID,
                classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
            });
            this.buttons = new Map();
            this.tagSelectedSignal = signal;
            this.configure(tags, selectedTag);
        }
        async configure(tags, selectedTag) {
            tags.forEach((tag) => this.addTagButton(tag, selectedTag));
        }
        /**
         * Add a tag button to the tag menu.
         */
        addTagButton(tag, selectedTag) {
            const button = new UIComponent({
                type: Html.Button,
                text: tag,
                classes: selectedTag == tag ? ["selected"] : [],
                events: {
                    click: () => this.selectTag(tag),
                },
            });
            this.buttons.set(tag, button);
            button.appendTo(this);
        }
        selectTag(selectedTag) {
            this.buttons.forEach((button, tag, map) => {
                button.element.classList.remove("selected");
                if (tag === selectedTag) {
                    button.element.classList.add("selected");
                }
            });
            this.tagSelectedSignal.emit({ tag: selectedTag });
        }
    }
    TagMenu.ID = "tag-menu";

    /**
     * Image visualizer component
     */
    class ImageVisualizer extends UIComponent {
        constructor() {
            super({
                type: Html.Div,
                id: ImageVisualizer.ID,
                classes: [BubbleUI.BoxRow, BubbleUI.BoxCenter],
            });
            this.setEvents({
                click: (event) => {
                    //if the click is not on the image, close the visualizer
                    if (event.target != this.element) {
                        return;
                    }
                    event.stopPropagation();
                    this.close();
                },
            });
            this.buttonClose = MaterialIcons$1.get("close", {
                fill: "var(--text-color)",
                size: "48px",
            });
            this.buttonClose.setEvents({
                click: () => this.close(),
            });
            this.buttonClose.setStyles({
                position: "absolute",
                top: "0px",
                right: "0px",
            });
            this.buttonBack = MaterialIcons$1.get("back", {
                fill: "var(--text-color)",
                size: "48px",
            });
            this.buttonBack.setEvents({
                click: () => this.showBack(),
            });
            this.image = new UIComponent({
                type: Html.Img,
                attributes: { src: "" },
            });
            this.buttonNext = MaterialIcons$1.get("front", {
                fill: "var(--text-color)",
                size: "48px",
            });
            this.buttonNext.setEvents({
                click: () => this.showNext(),
            });
            this.infoText = new UIComponent({
                type: Html.P,
                id: ImageVisualizer.INFO_TEXT_ID,
                text: "Touch outside the image to close the visualizer.",
                classes: ["info-text"],
            });
            this.buttonClose.element.id = ImageVisualizer.BUTTON_CLOSE_ID;
            this.buttonBack.element.id = ImageVisualizer.BUTTON_BACK_ID;
            this.buttonNext.element.id = ImageVisualizer.BUTTON_NEXT_ID;
            this.buttonClose.appendTo(this);
            this.buttonBack.appendTo(this);
            this.image.appendTo(this);
            this.buttonNext.appendTo(this);
            this.infoText.appendTo(this);
        }
        /**
         * Show the image visualizer
         * @param image Image to show
         * @param list List of images
         * @returns void
         */
        async show(image, list) {
            console.debug("Showing image: ", image);
            this.list = list;
            this.index = list.indexOf(image);
            this.element.style.display = "flex";
            if (this.index == 0) {
                this.buttonBack.element.style.visibility = "hidden";
            }
            else {
                this.buttonBack.element.style.visibility = "visible";
            }
            if (this.index == list.length - 1) {
                this.buttonNext.element.style.visibility = "hidden";
            }
            else {
                this.buttonNext.element.style.visibility = "visible";
            }
            this.image.element.setAttribute("src", image.url);
        }
        showBack() {
            this.show(this.list[this.index - 1], this.list);
        }
        showNext() {
            this.show(this.list[this.index + 1], this.list);
        }
        close() {
            this.element.style.display = "none";
        }
    }
    ImageVisualizer.ID = "visualizer";
    ImageVisualizer.BUTTON_CLOSE_ID = "close";
    ImageVisualizer.BUTTON_BACK_ID = "back";
    ImageVisualizer.BUTTON_NEXT_ID = "next";
    ImageVisualizer.INFO_TEXT_ID = "info-text";

    var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var HomeView_1;
    let HomeView = HomeView_1 = class HomeView extends ViewUI {
        constructor() {
            super({
                type: Html.View,
                id: HomeView_1.ID,
                classes: [BubbleUI.BoxRow, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
            });
            this.redrawSignal = new Signal("load-project");
            this.galleryData = [];
            this.tags = new Set();
            this.redrawSignal.connect({
                origin: HomeView_1.ID,
                action: async (params) => {
                    await this.showTag(params?.tag, params?.project?.name);
                },
            });
        }
        /**
         * Show the view
         * @param params The parameters of the view
         * @param container The container to append the view to
         */
        async show(params, container) {
            Configuration.instance.setTitle(`${Configuration.instance.base.app_name} - home`);
            if (Browser.isSmallDevice()) {
                this.element.classList.add(HomeView_1.MOBILE_CLASS);
            }
            this.visualizer = new ImageVisualizer();
            this.visualizer.appendTo(this);
            this.galleryContainer = new UIComponent({
                type: Html.Div,
                id: "gallery-container",
                classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
            });
            this.galleryData = await this.getGalleryData();
            // Get all tags and the selected tag or the first one
            this.tags = this.getTags(this.galleryData);
            const currentTag = params.length > 0 ? params[0] : this.tags.values().next().value;
            // Show the header
            this.header = new Header(this.tags);
            this.header.tagSelectedSignal.connect({
                origin: HomeView_1.ID,
                action: async (data) => this.redrawSignal.emit(data),
            });
            this.header.appendTo(this);
            // Get the current project
            let currentProject = undefined;
            if (params.length > 1) {
                currentProject = this.galleryData.find((project) => project.name == params[1]);
            }
            this.redrawSignal.emit({
                tag: currentTag,
                project: currentProject,
            });
            this.galleryContainer.appendTo(this);
            this.appendTo(container);
        }
        /**
         * Get the gallery data from JSON file
         * @returns Promise<Array<Project>> The gallery data
         */
        async getGalleryData() {
            const dataPath = `${Configuration.instance.path.resources}/data/images.json`;
            const response = await fetch(dataPath);
            return await response.json();
        }
        /**
         * Get all tags
         * @param projects The projects
         * @returns Set<string> The tags
         */
        getTags(projects) {
            const tags = new Set();
            projects.forEach((project) => project.tags.forEach((tag) => tags.add(tag)));
            return tags;
        }
        /**
         * Show the projects of the selected tag
         * @param currentTag The selected tag
         * @returns Promise<void>
         */
        async showTag(currentTag, currentProjectName) {
            if (!this.tags.has(currentTag)) {
                console.error(`Tag ${currentTag} not found`);
                return;
            }
            // get the projects with the current tag
            const projects = this.galleryData.filter((project) => project.tags.includes(currentTag));
            // find the project with the current name
            let currentProject = projects.find((project) => project.name == currentProjectName);
            // if the project is not found, get the first one
            if (currentProject == undefined) {
                currentProject = projects.values().next().value;
            }
            // disappear animation
            this.galleryContainer.element.style.opacity = "0";
            await new Promise((resolve) => setTimeout(resolve, 500));
            // Clear the gallery container
            this.galleryContainer.clean();
            // Add tag title to UI
            const title = new UIComponent({
                type: Html.H1,
                text: currentTag,
                id: "title",
            });
            title.appendTo(this.galleryContainer);
            // Create the project bar
            const projectBar = new ProjectBar(projects, currentProject, currentTag);
            projectBar.projectSelectedSignal.connect({
                origin: HomeView_1.ID,
                action: async (data) => this.redrawSignal.emit(data),
            });
            projectBar.appendTo(this.galleryContainer);
            // Create the project gallery
            const gallery = new ProjectGallery(currentProject);
            gallery.visualizeImageSignal.connect({
                action: async (data) => {
                    console.log("Show image: ", data);
                    await this.visualizer.show(data.images[data.selected], data.images);
                },
                origin: HomeView_1.ID,
            });
            gallery.appendTo(this.galleryContainer);
            // appear animation
            this.galleryContainer.element.style.opacity = "1";
            await new Promise((resolve) => setTimeout(resolve, 260));
        }
    };
    HomeView.ID = "home";
    HomeView.MOBILE_CLASS = "mobile";
    HomeView = HomeView_1 = __decorate$2([
        Route(["home", "", undefined]),
        Singleton(),
        __metadata$2("design:paramtypes", [])
    ], HomeView);
    var HomeView$1 = HomeView;
    /**
     * Bar with the available projects
     */
    class ProjectBar extends UIComponent {
        constructor(projects, current, tag) {
            super({
                type: Html.Div,
                id: "project-bar",
                classes: [BubbleUI.BoxRow, BubbleUI.BoxXCenter, BubbleUI.BoxYStart],
            });
            this.projectSelectedSignal = new Signal("project-selected");
            this.configure(projects, current, tag);
        }
        /**
         * Configure the project bar
         * @param projects The available projects
         * @param current The current project
         * @param tag The current tag
         */
        configure(projects, current, tag) {
            projects.forEach((project) => {
                const button = new UIComponent({
                    type: Html.Button,
                    text: project.name,
                    classes: project.name == current.name ? ["selected"] : [],
                });
                button.element.onclick = () => this.projectSelectedSignal.emit({
                    tag: tag,
                    project: project,
                });
                button.appendTo(this);
            });
        }
    }

    var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var Router_1;
    let Router = Router_1 = class Router {
        constructor() {
            this.Endpoints = [HomeView$1, ErrorView$1];
            this.parent = document.getElementById("view-container");
            //If no parent is present on the HTML file throws an error
            if (!this.parent)
                throw new InitializeError("view-container does not exist");
            this.container = new UIComponent({
                type: Html.Div,
                id: Router_1.VIEW_CONTAINER_BOX_ID,
                styles: {
                    width: "100%",
                    height: "100%",
                },
            });
            this.suscribeToSignals();
            this.container.appendTo(this.parent);
        }
        /**
         * Suscribe to the signals
         */
        suscribeToSignals() {
            this.changeViewRequestedSignal = new Signal(Router_1.VIEW_CHANGE_REQUESTED_SIGNAL);
            this.changeViewRequestedSignal.connect({
                origin: "Router",
                action: async () => console.log("a"),
            });
            this.reloadCurrentViewSignal = new Signal(Router_1.VIEW_RELOAD_SIGNAL);
            this.reloadCurrentViewSignal.connect({
                origin: "Router",
                action: async () => this.reloadCurrentView(),
            });
        }
        /**
         * @inheritdoc
         */
        async update(data) {
            console.debug(data);
            console.debug(`Router update to /${data.view}`);
            let params = [];
            if (data.params) {
                params.push(data.view);
                params = params.concat(data.params);
            }
            await this.load(params);
        }
        /**
         * Load the app state with the given params
         * @param params The list of params
         */
        async load(params) {
            try {
                this.container.clean();
                this.clear();
                // load the ViewUI instances created with the @Route decorator
                for (const route of Routes)
                    if (await this.navigate(route, params))
                        return;
                ErrorView$1.instance.show(["404"], this.container);
            }
            catch (error) {
                console.error(error);
            }
        }
        /**
         * Navigate to the given view
         */
        async navigate(view, params = []) {
            if (!view.isPointing(params[0]))
                return false;
            this.currentView = view;
            this.currentParams = params;
            view.clean();
            await view.show(params.splice(1), this.container);
            return true;
        }
        /**
         * Reload the current view
         */
        async reloadCurrentView() {
            await this.currentView.show(this.currentParams, this.container);
        }
        /**
         * Clear the container
         */
        clear() {
            this.container.element.innerHTML = "";
        }
    };
    Router.VIEW_CONTAINER_ID = "view-container";
    Router.VIEW_CONTAINER_BOX_ID = "view-container-box";
    Router.VIEW_CHANGE_REQUESTED_SIGNAL = "viewChangeRequested";
    Router.VIEW_RELOAD_SIGNAL = "viewReload";
    Router = Router_1 = __decorate$1([
        Singleton(),
        StaticImplements(),
        __metadata$1("design:paramtypes", [])
    ], Router);
    var Router$1 = Router;

    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    /**
     * Class that represents the application frontend proccess
     * it can be intantiated more than once, but the classic
     * web application structure wont need it.
     * @author akrck02
     */
    let App = class App {
        constructor() { }
        async load() {
            this.boot = new BootHandler();
            await this.boot.start();
            this.overrides();
            const params = Urls.getParametersByIndex(window.location.hash.slice(1).toLowerCase(), 1);
            Router$1.instance.load(params);
            console.debug("App is starting...");
        }
        overrides() {
            console.debug = (logs) => {
                if (Configuration.instance.isDevelopment())
                    console.log(logs);
            };
        }
        async start() {
            await this.boot.start();
        }
    };
    App = __decorate([
        Singleton(),
        StaticImplements(),
        __metadata("design:paramtypes", [])
    ], App);
    var App$1 = App;

    /**
     * When the dynamic URL changes loads
     * the correspoding view from the URL
     */
    window.addEventListener("hashchange", async () => await App$1.instance.load());
    /**
     * When the window is loaded load
     * the app state to show
     */
    window.onload = async () => App$1.instance.load();

})();
