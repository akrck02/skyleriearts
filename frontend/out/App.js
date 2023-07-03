(function (exports) {
    'use strict';

    const Language = {
        ENGLISH: "en",
        SPANISH: "es",
    };
    /**
     * Get the language given a locale
     * or the first occurrence if nothing was found
     * @param locale The locale to search for
     * @returns A language for the locale
     */
    function getLanguage(locale) {
        const keys = Object.keys(Language);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (locale.includes(Language[key])) {
                return Language[key];
            }
        }
        return Language[keys[0]];
    }

    /**
     * Environment states
     */
    var ENVIRONMENT;
    (function (ENVIRONMENT) {
        ENVIRONMENT["DEVELOPMENT"] = "development";
        ENVIRONMENT["PRODUCTION"] = "production";
    })(ENVIRONMENT || (ENVIRONMENT = {}));
    /**
     * Configuration for the application
     */
    class Config {
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

    class InitializeError extends Error {
        constructor(m) {
            super(m);
            // Set the prototype explicitly.
            Object.setPrototypeOf(this, InitializeError.prototype);
        }
    }

    /**
     * Class representing a UI component (HTML element) with custom properties and methods.
     * @description This class is a base class for all UI components.
     * @class UIComponent
     */
    class UIComponent {
        constructor(props) {
            this.type = props.type ?? "div";
            this.text = props.text;
            this.id = props.id;
            this.classes = props.classes;
            this.attributes = props.attributes;
            this.styles = props.styles;
            this.data = props.data;
            this.events = props.events;
            this.element = this.createElement();
        }
        createElement() {
            let element;
            if (!this.type) {
                throw "Element without type.";
            }
            element = document.createElement(this.type);
            if (this.text) {
                element.innerHTML = this.text;
            }
            if (this.id) {
                element.id = this.id;
            }
            if (this.classes) {
                setClasses(element, this.classes);
            }
            if (this.attributes) {
                setAttributes(element, this.attributes);
            }
            if (this.styles) {
                setStyles(element, this.styles);
            }
            if (this.data) {
                setDataset(element, this.data);
            }
            if (this.events) {
                setEvents(element, this.events);
            }
            return element;
        }
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
    }
    /**
     * Set attributes to a DOM element
     * @param element DOM element to set attributes
     * @param options Object with attributes and values
     * @returns DOM element with attributes in order to chain methods
     * @example
     *      element = setAttributes(element, {
     *           "id": "my-id",
     *           "class": "my-class"
     *      });
     *
     *      console.log(element.id); // "my-id"
     *      console.log(element.className); // "my-class"
     */
    function setAttributes(element, options) {
        if (options)
            for (const key in options)
                element.setAttribute(key, options[key]);
        return element;
    }
    /**
     * Set dataset to a DOM element
     * @param element DOM element to set dataset
     * @param dataset Object with dataset values
     * @returns DOM element itself in order to chain methods
     * @example
     *      setDataset(element, {
     *         "key": "value",
     *        "key2": "value2"
     *      });
     *
     *      console.log(element.dataset.key); // value
     *      console.log(element.dataset.key2); // value2
     */
    function setDataset(element, dataset) {
        if (dataset)
            for (const key in dataset)
                element.dataset[key] = dataset[key];
        return element;
    }
    /**
     * Set events to a DOM element
     * @param element DOM element to set events
     * @param events Object with event names and functions as values
     * @returns DOM element itself in order to chain methods
     * @example
     *      setEvents(element, {
     *          "click": () => console.log("Clicked!")
     *      });
     *
     *      // Output on click: Clicked!
     */
    function setEvents(element, events) {
        if (events)
            for (const key in events)
                element.addEventListener(key, events[key]);
        return element;
    }
    /**
     * Set styles to a DOM element
     * @param element DOM element
     * @param styles Object with styles
     * @returns DOM element itself in order to chain methods
     * @example
     *      setStyles(element, {
     *          "width": "100px",
     *          "height": "100px",
     *          "background-color": "red"
     *      });
     *
     *      console.log(element.style.width); // 100px
     *      console.log(element.style.height); // 100px
     *      console.log(element.style.backgroundColor); // red
     */
    function setStyles(element, styles) {
        if (styles)
            for (const key in styles)
                element.style[key] = styles[key];
        return element;
    }
    /**
     * Set classes to a DOM element
     * @param element DOM element to set classes
     * @param classes Array with classnames
     * @returns DOM element itself in order to chain methods
     * @example
     *      setClasses(element, ["class1", "class2"]);
     *      // element.className = "class1 class2";
     */
    function setClasses(element, classes) {
        if (classes)
            classes.forEach((cl) => element.classList.add(cl));
        return element;
    }

    const Errors = {
        200: {
            code: 200,
            message: 'Success',
            friendly: 'Success',
            description: 'The operation succeded.'
        },
        400: {
            code: 400,
            message: 'Bad request',
            friendly: 'The request is not valid',
            description: 'The parameters may be wrong or missing.'
        },
        401: {
            code: 401,
            message: 'Unauthorized',
            friendly: 'You have no permissions to access this content 🔐',
            description: 'The content is protected, contact the administrator to get access.'
        },
        404: {
            code: 404,
            message: 'Not found',
            friendly: 'We can\'t find the page you are looking for 😓',
            description: 'The page you\'re searching for is no longer available.'
        },
        500: {
            code: 500,
            message: 'Internal server error',
            friendly: 'Ups, something went wrong 😓',
            description: 'The server is experimenting an unexpected error, contact the administrator for more information.'
        },
    };
    /**
     * Returns the error corresponding to the given code
     * @param code The code of the error
     * @returns The corresponding error by code
     */
    function getErrorByCode(code) {
        return Errors[code];
    }

    class ViewUI extends UIComponent {
        constructor(details) {
            super(details);
        }
    }

    class ErrorView extends ViewUI {
        constructor() {
            super({
                type: "view",
                id: ErrorView.ID,
                classes: ["box-column", "box-center"],
            });
        }
        show(params, container) {
            const code = parseInt(params[0]);
            let error = getErrorByCode(code);
            // Default error set if no error parameter was given
            if (!error) {
                error = getErrorByCode(ErrorView.DEFAULT_ERROR_CODE);
            }
            // Image
            const image = new UIComponent({
                type: "img",
                id: ErrorView.IMAGE_ID,
                attributes: {
                    src: Config.PATHS.ICONS + "error.svg",
                },
            });
            this.appendChild(image);
            // Error title
            const title = new UIComponent({
                type: "h1",
                id: ErrorView.TITLE_ID,
                text: error.friendly,
            });
            this.appendChild(title);
            // Error description
            const description = new UIComponent({
                type: "p",
                text: error.description
            });
            this.appendChild(description);
            this.appendTo(container);
        }
    }
    ErrorView.DEFAULT_ERROR_CODE = 404;
    ErrorView.ID = "error";
    ErrorView.IMAGE_ID = "error-img";
    ErrorView.TITLE_ID = "error-title";

    /**
     * Get a Material Icons SVG by name.
     * @param name The name of the icon.
     * @param properties The properties of the icon.
     * @returns The container of the SVG as a UIComponent.
     */
    function getMaterialIcon(name, properties) {
        properties.svg = MATERIAL_ICONS$1[name] || "";
        let text = createSVG$1(properties);
        const icon = new UIComponent({
            type: "div",
            classes: ["icon", "box-center"],
            text: text,
        });
        return icon;
    }
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
    function createSVG$1(properties) {
        const svg = `
    <svg class="${properties?.classes?.join(" ")}" width="${properties.size}" height="${properties.size}" viewBox="0 0 24 24" fill="${properties.fill}" xmlns="http://www.w3.org/2000/svg">
    ${properties.svg}
    </svg>
    `;
        return svg;
    }
    const MATERIAL_ICONS$1 = {
        "back": `<path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="inherit"/>`,
        "front": `<path d="M12 20L10.95 18.925L17.125 12.75H4V11.25H17.125L10.95 5.075L12 4L20 12L12 20Z" fill="inherit"/>`,
        "clock": `<path d="M0 0h24v24H0z" fill="none" /><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" /><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />`,
        "expand": `<path d="M16.59 8.59L12 13.17L7.41 8.59L6 10L12 16L18 10L16.59 8.59Z" fill="inherit"/>`,
        "expand_less": `<path d="M0 0h24v24H0z" fill="none" /> <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />`,
        "summation": `<path d="M17.9633 4.00003H5.98776V6.00003L12.4745 12L5.98776 18V20H17.9633V17H10.9776L15.9674 12L10.9776 7.00003H17.9633V4.00003Z" fill="inherit"/><path d="M17.9633 4.00003H5.98776V6.00003L12.4745 12L5.98776 18V20H17.9633V17H10.9776L15.9674 12L10.9776 7.00003H17.9633V4.00003Z" stroke="inherit"/>`,
        "help": `<path d="M0 0h24v24H0V0z" fill="none" /><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />`,
        "info": `<path d="M0 0h24v24H0V0z" fill="none" /><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />`,
        "logout": `<path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="inherit"/>`,
        "notifications": `<path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z" fill="inherit"/>`,
        "support": `<path d="M21 12.22C21 6.73 16.74 3 12 3C7.31 3 3 6.65 3 12.28C2.4 12.62 2 13.26 2 14V16C2 17.1 2.9 18 4 18H5V11.9C5 8.03 8.13 4.9 12 4.9C15.87 4.9 19 8.03 19 11.9V19H11V21H19C20.1 21 21 20.1 21 19V17.78C21.59 17.47 22 16.86 22 16.14V13.84C22 13.14 21.59 12.53 21 12.22Z" fill="inherit"/><path d="M9 14C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14Z" fill="inherit"/><path d="M15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12C14.4477 12 14 12.4477 14 13C14 13.5523 14.4477 14 15 14Z" fill="inherit"/><path d="M18 11.03C17.52 8.18 15.04 6 12.05 6C9.02003 6 5.76003 8.51 6.02003 12.45C8.49003 11.44 10.35 9.24 10.88 6.56C12.19 9.19 14.88 11 18 11.03Z" fill="inherit"/>`,
        "location": `<path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />`,
        "no_location": `<path d="M0 0h24v24H0zm11.75 11.47l-.11-.11z" fill="none" /><path d="M12 6.5c1.38 0 2.5 1.12 2.5 2.5 0 .74-.33 1.39-.83 1.85l3.63 3.63c.98-1.86 1.7-3.8 1.7-5.48 0-3.87-3.13-7-7-7-1.98 0-3.76.83-5.04 2.15l3.19 3.19c.46-.52 1.11-.84 1.85-.84zm4.37 9.6l-4.63-4.63-.11-.11L3.27 3 2 4.27l3.18 3.18C5.07 7.95 5 8.47 5 9c0 5.25 7 13 7 13s1.67-1.85 3.38-4.35L18.73 21 20 19.73l-3.63-3.63z" />`,
        "no_event": `<path d="M9.31 17l2.44-2.44L14.19 17l1.06-1.06-2.44-2.44 2.44-2.44L14.19 10l-2.44 2.44L9.31 10l-1.06 1.06 2.44 2.44-2.44 2.44L9.31 17zM19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />`,
        "events": `<path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>`,
        "check": `<path d="M0 0h24v24H0z" fill="none" /><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />`,
        "check_all": `<path d="M0 0h24v24H0z" fill="none" /><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />`,
        "edit": `<path d="M0 0h24v24H0z" fill="none" /><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />`,
        "plus": `<path d="M0 0h24v24H0z" fill="none" /><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />`,
        "minus": `<path d="M0 0h24v24H0z" fill="none" /><path d="M19 13H5v-2h14v2z" />`,
        "close": `<path d="M0 0h24v24H0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />`,
        "save": `<path d="M0 0h24v24H0z" fill="none" /><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" /> `,
        "shipping": `<path d="M0 0h24v24H0z" fill="none"/><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>`,
        "shopping_kart": `<path d="M0 0h24v24H0z" fill="none" /><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />`,
        "qr_code": `<g><rect fill="none" height="24" width="24"/></g><path d="M15,21h-2v-2h2V21z M13,14h-2v5h2V14z M21,12h-2v4h2V12z M19,10h-2v2h2V10z M7,12H5v2h2V12z M5,10H3v2h2V10z M12,5h2V3h-2V5 z M4.5,4.5v3h3v-3H4.5z M9,9H3V3h6V9z M4.5,16.5v3h3v-3H4.5z M9,21H3v-6h6V21z M16.5,4.5v3h3v-3H16.5z M21,9h-6V3h6V9z M19,19v-3 l-4,0v2h2v3h4v-2H19z M17,12l-4,0v2h4V12z M13,10H7v2h2v2h2v-2h2V10z M14,9V7h-2V5h-2v4L14,9z M6.75,5.25h-1.5v1.5h1.5V5.25z M6.75,17.25h-1.5v1.5h1.5V17.25z M18.75,5.25h-1.5v1.5h1.5V5.25z"/>`,
        "download": `<path d="M0 0h24v24H0z" fill="none"/><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>`,
        "receipt": `<path d="M0 0h24v24H0z" fill="none"/><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"/>`,
        "euro": `<g><rect fill="none" height="24" width="24"/></g><g><g/><path d="M15,18.5c-2.51,0-4.68-1.42-5.76-3.5H15l1-2H8.58c-0.05-0.33-0.08-0.66-0.08-1s0.03-0.67,0.08-1H15l1-2H9.24 C10.32,6.92,12.5,5.5,15,5.5c1.61,0,3.09,0.59,4.23,1.57L21,5.3C19.41,3.87,17.3,3,15,3c-3.92,0-7.24,2.51-8.48,6H3l-1,2h4.06 C6.02,11.33,6,11.66,6,12s0.02,0.67,0.06,1H3l-1,2h4.52c1.24,3.49,4.56,6,8.48,6c2.31,0,4.41-0.87,6-2.3l-1.78-1.77 C18.09,17.91,16.62,18.5,15,18.5z"/></g>`,
        "search": `<path d="M0 0h24v24H0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />`,
        "user": `<path d="M0 0h24v24H0z" fill="none" /><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />`,
        "password": `<g><path d="M0,0h24v24H0V0z" fill="none" /></g><g><g><path d="M2,17h20v2H2V17z M3.15,12.95L4,11.47l0.85,1.48l1.3-0.75L5.3,10.72H7v-1.5H5.3l0.85-1.47L4.85,7L4,8.47L3.15,7l-1.3,0.75 L2.7,9.22H1v1.5h1.7L1.85,12.2L3.15,12.95z M9.85,12.2l1.3,0.75L12,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H15v-1.5h-1.7l0.85-1.47 L12.85,7L12,8.47L11.15,7l-1.3,0.75l0.85,1.47H9v1.5h1.7L9.85,12.2z M23,9.22h-1.7l0.85-1.47L20.85,7L20,8.47L19.15,7l-1.3,0.75 l0.85,1.47H17v1.5h1.7l-0.85,1.48l1.3,0.75L20,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H23V9.22z" /></g></g>`,
        "delete": `<path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>`,
        "calendar_today": `<path d="M20 3H19V1H17V3H7V1H5V3H4C2.9 3 2 3.9 2 5V21C2 22.1 2.9 23 4 23H20C21.1 23 22 22.1 22 21V5C22 3.9 21.1 3 20 3ZM20 21H4V8H20V21Z"/>`,
        "task": `<g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M14,2H6C4.9,2,4.01,2.9,4.01,4L4,20c0,1.1,0.89,2,1.99,2H18c1.1,0,2-0.9,2-2V8L14,2z M10.94,18L7.4,14.46l1.41-1.41 l2.12,2.12l4.24-4.24l1.41,1.41L10.94,18z M13,9V3.5L18.5,9H13z"/></g>`,
        "task_alt": `<path d="M22 5.18L10.59 16.6L6.35 12.36L7.76 10.95L10.59 13.78L20.59 3.78L22 5.18ZM19.79 10.22C19.92 10.79 20 11.39 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C13.58 4 15.04 4.46 16.28 5.25L17.72 3.81C16.1 2.67 14.13 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 10.81 21.78 9.67 21.4 8.61L19.79 10.22Z"/>`,
        "group": `<path d="M22 5.18L10.59 16.6L6.35 12.36L7.76 10.95L10.59 13.78L20.59 3.78L22 5.18ZM19.79 10.22C19.92 10.79 20 11.39 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C13.58 4 15.04 4.46 16.28 5.25L17.72 3.81C16.1 2.67 14.13 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 10.81 21.78 9.67 21.4 8.61L19.79 10.22Z"/>`,
        "spoke": `<path d="M6 13C3.8 13 2 14.8 2 17C2 19.2 3.8 21 6 21C8.2 21 10 19.2 10 17C10 14.8 8.2 13 6 13ZM12 3C9.8 3 8 4.8 8 7C8 9.2 9.8 11 12 11C14.2 11 16 9.2 16 7C16 4.8 14.2 3 12 3ZM18 13C15.8 13 14 14.8 14 17C14 19.2 15.8 21 18 21C20.2 21 22 19.2 22 17C22 14.8 20.2 13 18 13Z" />`,
        "tune": `<path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z"/>`,
        "terminal": `<g><rect fill="none" height="24" width="24"/></g><g><path d="M20,4H4C2.89,4,2,4.9,2,6v12c0,1.1,0.89,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.11,4,20,4z M20,18H4V8h16V18z M18,17h-6v-2 h6V17z M7.5,17l-1.41-1.41L8.67,13l-2.59-2.59L7.5,9l4,4L7.5,17z"/></g>`,
        "cloud": `<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/>`,
        "cloud_off": `<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"/>`,
        "tag": `<path d="M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z"/>`,
        "sync": `<path d="M0 0h24v24H0z" fill="none"/><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>`,
        "manage_search": `</g><g><path d="M7,9H2V7h5V9z M7,12H2v2h5V12z M20.59,19l-3.83-3.83C15.96,15.69,15.02,16,14,16c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5 c0,1.02-0.31,1.96-0.83,2.75L22,17.59L20.59,19z M17,11c0-1.65-1.35-3-3-3s-3,1.35-3,3s1.35,3,3,3S17,12.65,17,11z M2,19h10v-2H2 V19z"/></g>`,
        "palette": `</g><g><path d="M12,2C6.49,2,2,6.49,2,12s4.49,10,10,10c1.38,0,2.5-1.12,2.5-2.5c0-0.61-0.23-1.2-0.64-1.67c-0.08-0.1-0.13-0.21-0.13-0.33 c0-0.28,0.22-0.5,0.5-0.5H16c3.31,0,6-2.69,6-6C22,6.04,17.51,2,12,2z M17.5,13c-0.83,0-1.5-0.67-1.5-1.5c0-0.83,0.67-1.5,1.5-1.5 s1.5,0.67,1.5,1.5C19,12.33,18.33,13,17.5,13z M14.5,9C13.67,9,13,8.33,13,7.5C13,6.67,13.67,6,14.5,6S16,6.67,16,7.5 C16,8.33,15.33,9,14.5,9z M5,11.5C5,10.67,5.67,10,6.5,10S8,10.67,8,11.5C8,12.33,7.33,13,6.5,13S5,12.33,5,11.5z M11,7.5 C11,8.33,10.33,9,9.5,9S8,8.33,8,7.5C8,6.67,8.67,6,9.5,6S11,6.67,11,7.5z"/></g>`,
        "light_mode": `<path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/>`,
        "dark_mode": `<rect fill="none" height="24" width="24"/><path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/>`,
        "clear_all": `<path d="M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z"/>`,
        "checklist": `<path d="M22,7h-9v2h9V7z M22,15h-9v2h9V15z M5.54,11L2,7.46l1.41-1.41l2.12,2.12l4.24-4.24l1.41,1.41L5.54,11z M5.54,19L2,15.46 l1.41-1.41l2.12,2.12l4.24-4.24l1.41,1.41L5.54,19z"/>`,
        "radio_button_unchecked": `<path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>`,
        "label": `<path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/>`,
        "label_off": `<path d="M3.25 2.75l17 17L19 21l-2-2H5c-1.1 0-2-.9-2-2V7c0-.55.23-1.05.59-1.41L2 4l1.25-1.25zM22 12l-4.37-6.16C17.27 5.33 16.67 5 16 5H8l11 11 3-4z"/>`,
        "label_important": `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/>`,
        "wallpaper": `<path d="M0 0h24v24H0z" fill="none"/><path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z"/>`,
        "block": `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/>`,
        "science": `<g><rect fill="none" height="24" width="24"/></g><g><path d="M19.8,18.4L14,10.67V6.5l1.35-1.69C15.61,4.48,15.38,4,14.96,4H9.04C8.62,4,8.39,4.48,8.65,4.81L10,6.5v4.17L4.2,18.4 C3.71,19.06,4.18,20,5,20h14C19.82,20,20.29,19.06,19.8,18.4z"/></g>`,
        "article": `<path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>`,
        "person_add": `<path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>`,
        "event": `<path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>`,
        "edit_note": `<rect fill="none" height="24" width="24"/><path d="M3,10h11v2H3V10z M3,8h11V6H3V8z M3,16h7v-2H3V16z M18.01,12.87l0.71-0.71c0.39-0.39,1.02-0.39,1.41,0l0.71,0.71 c0.39,0.39,0.39,1.02,0,1.41l-0.71,0.71L18.01,12.87z M17.3,13.58l-5.3,5.3V21h2.12l5.3-5.3L17.3,13.58z"/>`,
        "sticky_note_2": `<path d="M19,3H4.99C3.89,3,3,3.9,3,5l0.01,14c0,1.1,0.89,2,1.99,2h10l6-6V5C21,3.9,20.1,3,19,3z M7,8h10v2H7V8z M12,14H7v-2h5V14z M14,19.5V14h5.5L14,19.5z"/>`,
        "image": `<path d="M0 0h24v24H0z" fill="none"/><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>`,
        "content_copy": `<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>`,
        "content_paste": `<path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/>`,
        "cancel": `<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>`,
        "home": `<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>`,
        "code": `<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>`,
        "business": `<path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>`,
        "all_inclusive": `<path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/>`,
        "videogame_asset": `<path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>`,
        "sport_esports": `<g><rect fill="none" height="24" width="24"/></g><g><g><path d="M21.58,16.09l-1.09-7.66C20.21,6.46,18.52,5,16.53,5H7.47C5.48,5,3.79,6.46,3.51,8.43l-1.09,7.66 C2.2,17.63,3.39,19,4.94,19h0c0.68,0,1.32-0.27,1.8-0.75L9,16h6l2.25,2.25c0.48,0.48,1.13,0.75,1.8,0.75h0 C20.61,19,21.8,17.63,21.58,16.09z M11,11H9v2H8v-2H6v-1h2V8h1v2h2V11z M15,10c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1 C16,9.55,15.55,10,15,10z M17,13c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C18,12.55,17.55,13,17,13z"/></g></g>`,
        "games": `<path d="M0 0h24v24H0z" fill="none"/><path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"/>`,
        "movie": `<path d="M0 0h24v24H0z" fill="none"/><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/`,
        "menu_open": `<path d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z"/>`,
        "construction": `<g><rect fill="none" height="24" width="24"/></g><g><g><rect height="8.48" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.8717 17.6255)" width="3" x="16.34" y="12.87"/><path d="M17.5,10c1.93,0,3.5-1.57,3.5-3.5c0-0.58-0.16-1.12-0.41-1.6l-2.7,2.7L16.4,6.11l2.7-2.7C18.62,3.16,18.08,3,17.5,3 C15.57,3,14,4.57,14,6.5c0,0.41,0.08,0.8,0.21,1.16l-1.85,1.85l-1.78-1.78l0.71-0.71L9.88,5.61L12,3.49 c-1.17-1.17-3.07-1.17-4.24,0L4.22,7.03l1.41,1.41H2.81L2.1,9.15l3.54,3.54l0.71-0.71V9.15l1.41,1.41l0.71-0.71l1.78,1.78 l-7.41,7.41l2.12,2.12L16.34,9.79C16.7,9.92,17.09,10,17.5,10z"/></g></g>`,
        "coffee": `<g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M18.5,3H6C4.9,3,4,3.9,4,5v5.71c0,3.83,2.95,7.18,6.78,7.29c3.96,0.12,7.22-3.06,7.22-7v-1h0.5c1.93,0,3.5-1.57,3.5-3.5 S20.43,3,18.5,3z M16,5v3H6V5H16z M18.5,8H18V5h0.5C19.33,5,20,5.67,20,6.5S19.33,8,18.5,8z M4,19h16v2H4V19z"/></g>`,
        "wifi": `<path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>`,
        "wifi_off": `<path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4c-1.29-1.29-2.84-2.13-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24C7.81 10.89 6.27 11.73 5 13v.01L6.99 15c1.36-1.36 3.14-2.04 4.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3c-1.65-1.66-4.34-1.66-6 0z"/>`,
        "translate": `<path d="M0 0h24v24H0z" fill="none"/><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>`,
        "animation": `<path d="M15 2c-2.71 0-5.05 1.54-6.22 3.78-1.28.67-2.34 1.72-3 3C3.54 9.95 2 12.29 2 15c0 3.87 3.13 7 7 7 2.71 0 5.05-1.54 6.22-3.78 1.28-.67 2.34-1.72 3-3C20.46 14.05 22 11.71 22 9c0-3.87-3.13-7-7-7zM9 20c-2.76 0-5-2.24-5-5 0-1.12.37-2.16 1-3 0 3.87 3.13 7 7 7-.84.63-1.88 1-3 1zm3-3c-2.76 0-5-2.24-5-5 0-1.12.37-2.16 1-3 0 3.86 3.13 6.99 7 7-.84.63-1.88 1-3 1zm4.7-3.3c-.53.19-1.1.3-1.7.3-2.76 0-5-2.24-5-5 0-.6.11-1.17.3-1.7.53-.19 1.1-.3 1.7-.3 2.76 0 5 2.24 5 5 0 .6-.11 1.17-.3 1.7zM19 12c0-3.86-3.13-6.99-7-7 .84-.63 1.87-1 3-1 2.76 0 5 2.24 5 5 0 1.12-.37 2.16-1 3z"/><path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"/>`,
        "system_update": `<path d="M0 0h24v24H0z" fill="none"/><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3V8h-2v5H8l4 4 4-4z"/>`,
        "update": `</g><g><g><g><path d="M21,10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-0.1c-2.73,2.71-2.73,7.08,0,9.79s7.15,2.71,9.88,0 C18.32,15.65,19,14.08,19,12.1h2c0,1.98-0.88,4.55-2.64,6.29c-3.51,3.48-9.21,3.48-12.72,0c-3.5-3.47-3.53-9.11-0.02-12.58 s9.14-3.47,12.65,0L21,3V10.12z M12.5,8v4.25l3.5,2.08l-0.72,1.21L11,13V8H12.5z"/></g></g></g>`,
        "alternate_email": `<path d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12V13.325C22 14.2583 21.6708 15.0458 21.0125 15.6875C20.3542 16.3292 19.55 16.65 18.6 16.65C18 16.65 17.4333 16.5042 16.9 16.2125C16.3667 15.9208 15.9583 15.5083 15.675 14.975C15.2417 15.5417 14.7 15.9625 14.05 16.2375C13.4 16.5125 12.7167 16.65 12 16.65C10.7 16.65 9.59583 16.2 8.6875 15.3C7.77917 14.4 7.325 13.3 7.325 12C7.325 10.7 7.77917 9.59167 8.6875 8.675C9.59583 7.75833 10.7 7.3 12 7.3C13.3 7.3 14.4042 7.75833 15.3125 8.675C16.2208 9.59167 16.675 10.7 16.675 12V13.325C16.675 13.8417 16.8625 14.275 17.2375 14.625C17.6125 14.975 18.0667 15.15 18.6 15.15C19.1167 15.15 19.5625 14.975 19.9375 14.625C20.3125 14.275 20.5 13.8417 20.5 13.325V12C20.5 9.63333 19.675 7.625 18.025 5.975C16.375 4.325 14.3667 3.5 12 3.5C9.63333 3.5 7.625 4.325 5.975 5.975C4.325 7.625 3.5 9.63333 3.5 12C3.5 14.3667 4.325 16.375 5.975 18.025C7.625 19.675 9.63333 20.5 12 20.5H17.35V22H12ZM12 15.15C12.8833 15.15 13.6333 14.8458 14.25 14.2375C14.8667 13.6292 15.175 12.8833 15.175 12C15.175 11.1 14.8667 10.3417 14.25 9.725C13.6333 9.10833 12.8833 8.8 12 8.8C11.1167 8.8 10.3667 9.10833 9.75 9.725C9.13333 10.3417 8.825 11.1 8.825 12C8.825 12.8833 9.13333 13.6292 9.75 14.2375C10.3667 14.8458 11.1167 15.15 12 15.15Z" fill="inherit"/>`,
        "badge": `<path d="M3.5 22C3.1 22 2.75 21.85 2.45 21.55C2.15 21.25 2 20.9 2 20.5V8.5C2 8.1 2.15 7.75 2.45 7.45C2.75 7.15 3.1 7 3.5 7H9.75V3.5C9.75 3.1 9.9 2.75 10.2 2.45C10.5 2.15 10.8534 2 11.2603 2H12.7397C13.1466 2 13.5 2.15 13.8 2.45C14.1 2.75 14.25 3.1 14.25 3.5V7H20.5C20.9 7 21.25 7.15 21.55 7.45C21.85 7.75 22 8.1 22 8.5V20.5C22 20.9 21.85 21.25 21.55 21.55C21.25 21.85 20.9 22 20.5 22H3.5ZM3.5 20.5H20.5V8.5H14.25V9.25C14.25 9.71667 14.1 10.0833 13.8 10.35C13.5 10.6167 13.1466 10.75 12.7397 10.75H11.2603C10.8534 10.75 10.5 10.6167 10.2 10.35C9.9 10.0833 9.75 9.71667 9.75 9.25V8.5H3.5V20.5ZM5.8 17.825H11.775V17.475C11.775 17.175 11.7 16.9083 11.55 16.675C11.4 16.4417 11.2083 16.2833 10.975 16.2C10.4417 16.0167 10.025 15.8958 9.725 15.8375C9.425 15.7792 9.13333 15.75 8.85 15.75C8.53333 15.75 8.19583 15.7875 7.8375 15.8625C7.47917 15.9375 7.075 16.05 6.625 16.2C6.375 16.2833 6.175 16.4417 6.025 16.675C5.875 16.9083 5.8 17.175 5.8 17.475V17.825ZM14.2 16.15H18.45V14.9H14.2V16.15ZM8.85 14.9C9.225 14.9 9.54375 14.7688 9.80625 14.5063C10.0688 14.2438 10.2 13.925 10.2 13.55C10.2 13.175 10.0688 12.8563 9.80625 12.5938C9.54375 12.3313 9.225 12.2 8.85 12.2C8.475 12.2 8.15625 12.3313 7.89375 12.5938C7.63125 12.8563 7.5 13.175 7.5 13.55C7.5 13.925 7.63125 14.2438 7.89375 14.5063C8.15625 14.7688 8.475 14.9 8.85 14.9ZM14.2 13.325H18.45V12.075H14.2V13.325ZM11.25 9.25H12.75V3.5H11.25V9.25Z" fill="inherit"/>`,
        "gallery_thumbnail": `<path d="M2.5 19C2.0875 19 1.73438 18.8531 1.44063 18.5594C1.14688 18.2656 1 17.9125 1 17.5V6.5C1 6.0875 1.14688 5.73438 1.44063 5.44063C1.73438 5.14688 2.0875 5 2.5 5H13.5C13.9125 5 14.2656 5.14688 14.5594 5.44063C14.8531 5.73438 15 6.0875 15 6.5V17.5C15 17.9125 14.8531 18.2656 14.5594 18.5594C14.2656 18.8531 13.9125 19 13.5 19H2.5ZM18 11C17.7167 11 17.4792 10.9042 17.2875 10.7125C17.0958 10.5208 17 10.2833 17 10V6C17 5.71667 17.0958 5.47917 17.2875 5.2875C17.4792 5.09583 17.7167 5 18 5H22C22.2833 5 22.5208 5.09583 22.7125 5.2875C22.9042 5.47917 23 5.71667 23 6V10C23 10.2833 22.9042 10.5208 22.7125 10.7125C22.5208 10.9042 22.2833 11 22 11H18ZM18.5 9.5H21.5V6.5H18.5V9.5ZM2.5 17.5H13.5V6.5H2.5V17.5ZM4 15H12L9.375 11.5L7.5 14L6.125 12.175L4 15ZM18 19C17.7167 19 17.4792 18.9042 17.2875 18.7125C17.0958 18.5208 17 18.2833 17 18V14C17 13.7167 17.0958 13.4792 17.2875 13.2875C17.4792 13.0958 17.7167 13 18 13H22C22.2833 13 22.5208 13.0958 22.7125 13.2875C22.9042 13.4792 23 13.7167 23 14V18C23 18.2833 22.9042 18.5208 22.7125 18.7125C22.5208 18.9042 22.2833 19 22 19H18ZM18.5 17.5H21.5V14.5H18.5V17.5Z" fill="inherit"/>`
    };

    class Navbar extends UIComponent {
        constructor() {
            super({
                type: "div",
                classes: ["box-column", "box-center"],
                id: Navbar.ID,
            });
            this.buttons = [];
            const logo = new UIComponent({
                type: "img",
                id: "logo",
                attributes: {
                    src: Config.PATHS.ICONS + "logo.svg",
                    alt: "GTD Framework logo"
                },
            });
            const title = new UIComponent({
                type: "h1",
                text: "Skylerie",
            });
            const buttonBar = this.createNavbar();
            logo.appendTo(this);
            title.appendTo(this);
            buttonBar.appendTo(this);
        }
        draw() {
            this.element.classList.remove("box-row");
            this.element.classList.remove("box-center");
            setClasses(this.element, [
                "box-column",
                "box-center"
            ]);
        }
        drawCompact() {
            this.element.classList.remove("box-column");
            this.element.classList.remove("box-center");
            setClasses(this.element, [
                "box-row",
                "box-center",
                "compact"
            ]);
        }
        createNavbar() {
            const buttonBar = new UIComponent({
                type: "div",
                id: "button-bar",
                classes: ["box-row", "box-center"],
            });
            const galleryButton = new UIComponent({
                type: "a",
                id: "gallery",
                classes: [Navbar.BUTTON_CLASS],
                attributes: {
                    href: Config.VIEWS.GALLERY,
                }
            });
            const galleryLabel = new UIComponent({
                type: "span",
                text: "Gallery",
            });
            const galleryIcon = getMaterialIcon("gallery_thumbnail", {
                size: "24",
                fill: "white",
            });
            galleryLabel.appendTo(galleryButton);
            galleryIcon.appendTo(galleryButton);
            setEvents(galleryButton.element, {
                click: () => {
                    this.select("gallery");
                }
            });
            const aboutButton = new UIComponent({
                type: "a",
                id: "about",
                classes: [Navbar.BUTTON_CLASS],
                attributes: {
                    href: Config.VIEWS.ABOUT,
                }
            });
            const aboutLabel = new UIComponent({
                type: "span",
                text: "About me",
            });
            const aboutIcon = getMaterialIcon("badge", {
                size: "24",
                fill: "white",
            });
            aboutLabel.appendTo(aboutButton);
            aboutIcon.appendTo(aboutButton);
            setEvents(aboutButton.element, {
                click: () => {
                    this.select("about");
                }
            });
            const contactButton = new UIComponent({
                type: "a",
                id: "contact",
                classes: [Navbar.BUTTON_CLASS],
                attributes: {
                    href: Config.VIEWS.CONTACT,
                }
            });
            const contactLabel = new UIComponent({
                type: "span",
                text: "Contact",
            });
            const contactIcon = getMaterialIcon("alternate_email", {
                size: "24",
                fill: "white",
            });
            contactLabel.appendTo(contactButton);
            contactIcon.appendTo(contactButton);
            setEvents(contactButton.element, {
                click: () => {
                    this.select("contact");
                }
            });
            this.buttons.push(galleryButton);
            this.buttons.push(aboutButton);
            this.buttons.push(contactButton);
            galleryButton.appendTo(buttonBar);
            aboutButton.appendTo(buttonBar);
            contactButton.appendTo(buttonBar);
            return buttonBar;
        }
        select(name) {
            this.buttons.forEach((button) => {
                if (button.element.id === name) {
                    setClasses(button.element, [Navbar.BUTTON_CLASS, "selected"]);
                    return;
                }
                button.element.classList.remove("selected");
            });
        }
    }
    Navbar.ID = "navbar";
    Navbar.BUTTON_CLASS = "nav-button";

    class Visualizer extends UIComponent {
        constructor() {
            super({
                type: "div",
                id: Visualizer.ID,
                classes: ["box-row", "box-center"],
            });
            setEvents(this.element, {
                click: (event) => {
                    //if the click is not on the image, close the visualizer
                    if (event.target != this.element) {
                        return;
                    }
                    event.stopPropagation();
                    this.close();
                }
            });
            this.buttonClose = getMaterialIcon("close", {
                fill: "white",
                size: "48px",
            });
            setEvents(this.buttonClose.element, {
                click: () => this.close()
            });
            setStyles(this.buttonClose.element, {
                position: "absolute",
                top: "0px",
                right: "0px",
            });
            this.buttonBack = getMaterialIcon("back", {
                fill: "white",
                size: "48px",
            });
            setEvents(this.buttonBack.element, {
                click: () => this.showBack()
            });
            this.image = new UIComponent({
                type: "img",
                attributes: { src: "" },
            });
            this.buttonNext = getMaterialIcon("front", {
                fill: "white",
                size: "48px",
            });
            setEvents(this.buttonNext.element, {
                click: () => this.showNext()
            });
            this.infoText = new UIComponent({
                type: "p",
                id: Visualizer.INFO_TEXT_ID,
                text: "Touch outside the image to close the visualizer.",
                classes: ["info-text"],
            });
            this.buttonClose.element.id = Visualizer.BUTTON_CLOSE_ID;
            this.buttonBack.element.id = Visualizer.BUTTON_BACK_ID;
            this.buttonNext.element.id = Visualizer.BUTTON_NEXT_ID;
            this.buttonClose.appendTo(this);
            this.buttonBack.appendTo(this);
            this.image.appendTo(this);
            this.buttonNext.appendTo(this);
            this.infoText.appendTo(this);
        }
        async show(image, list) {
            console.log(image);
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
            this.image.element.setAttribute("src", image);
            //if(view)
            //view.style.overflow = "hidden";
        }
        showBack() {
            this.show(this.list[this.index - 1], this.list);
        }
        showNext() {
            this.show(this.list[this.index + 1], this.list);
        }
        close() {
            //if(view)
            //view.style.overflow = "auto";
            this.element.style.display = "none";
        }
    }
    Visualizer.ID = "visualizer";
    Visualizer.BUTTON_CLOSE_ID = "close";
    Visualizer.BUTTON_BACK_ID = "back";
    Visualizer.BUTTON_NEXT_ID = "next";
    Visualizer.INFO_TEXT_ID = "info-text";

    var HTTPS_METHOD;
    (function (HTTPS_METHOD) {
        HTTPS_METHOD["GET"] = "GET";
        HTTPS_METHOD["POST"] = "POST";
        HTTPS_METHOD["PUT"] = "PUT";
        HTTPS_METHOD["DELETE"] = "DELETE";
        HTTPS_METHOD["PATCH"] = "PATCH";
        HTTPS_METHOD["HEAD"] = "HEAD";
        HTTPS_METHOD["OPTIONS"] = "OPTIONS";
        HTTPS_METHOD["CONNECT"] = "CONNECT";
        HTTPS_METHOD["TRACE"] = "TRACE";
        HTTPS_METHOD["ALL"] = "ALL";
    })(HTTPS_METHOD || (HTTPS_METHOD = {}));

    /**
     * A class that represents a response from a fetch request.
     * @description Encapsulates the data and methods for easy fetching
     * @author Akrck02
     */
    class Response {
        constructor(response) {
            this.response = response;
            this.successFn = (data) => console.log(data);
            this.errorFn = (err) => console.log("Error in response : ", err);
        }
        getResponse() {
            return this.response;
        }
        /**
         *  Executes tne callback function with the response json as an argument.
         * @returns the response itself
         * @description This method is useful for fetching json files.
         * @example
         *      Response
         *      .success(text => console.log(text))
         *      .error(err => console.log(err))
         *      .json();
         *
         */
        json() {
            this.response
                .then((res) => res.json().then((json) => this.successFn(json, res.status)))
                .catch((err) => this.errorFn(err));
            return this;
        }
        /**
         *  Executes tne callback function with the response json as an argument.
         * @returns the response itself
         * @description This method is useful for fetching json files.
         * @example
         *      Response
         *      .success(text => console.log(text))
         *      .error(err => console.log(err))
         *      .json();
         *
         */
        async jsonPromise() {
            await this.response
                .then((res) => res.json().then((json) => this.successFn(json, res.status)))
                .catch((err) => this.errorFn(err));
        }
        /**
         * Executes the callback function with the response text as an argument.
         * @returns the response itself
         * @description This method is useful for fetching text files.
         * @example
         *      Response
         *      .success(text => console.log(text))
         *      .error(err => console.log(err))
         *      .text();
         *
         */
        text() {
            this.response
                .then((res) => res.text().then((text) => this.successFn(text, res.status)))
                .catch((err) => this.errorFn(err));
            return this;
        }
        /**
         * Executes the callback function with the response blob as an argument.
         * @returns the response itself
         * @description This method is useful for fetching binary files.
         * @example
         *     Response
         *     .success(blob => console.log(blob))
         *     .error(err => console.log(err))
         *     .blob();
         */
        blob() {
            this.response
                .then((res) => res.blob().then((blob) => this.successFn(blob, res.status)))
                .catch((err) => this.errorFn(err));
        }
        /**
         * Sets the callback function to be executed when the response is successful.
         * @param success the callback function
         * @returns the response itself
         */
        success(success) {
            this.successFn = success;
            return this;
        }
        /**
         * Sets the callback function to be executed when the response is unsuccessful.
         * @param error the callback function
         * @returns the response itself
         */
        error(error) {
            this.errorFn = error;
            return this;
        }
    }
    /**
     * @param properties fetch properties
     * @returns a Response object encapsulating the response.
     * @description This method is useful for fetching data from the server.
     * @example
     *     const response = EasyFetch(
     *       {
     *          method: HTTPS_METHOD.GET,
     *          parameters: {
     *             id: "1Y123",
     *             name: "Akrck02"
     *          },
     *          url: 'https://example.org/api/todos/1'
     *       }
     *     );
     *     response.json();
     */
    function efetch(properties) {
        let options = {
            method: properties.method,
            headers: { "Content-type": "application/json; charset=UTF-8" },
        };
        if (properties.method === HTTPS_METHOD.POST) {
            options["body"] = JSON.stringify(properties.parameters);
        }
        const promise = fetch(properties.url, options);
        const response = new Response(promise);
        return response;
    }

    class GalleryView extends ViewUI {
        constructor() {
            super({
                type: "view",
                id: GalleryView.ID,
                classes: ["box-row", "box-center", "box-warp"],
            });
            this.images = [];
        }
        async show(params, container) {
            let speed = 100;
            this.visualizer = new Visualizer();
            await efetch({
                method: HTTPS_METHOD.GET,
                url: Config.PATHS.IMAGES + "List.json",
                parameters: {}
            }).success((list) => {
                list = list.map(element => Config.PATHS.IMAGES + element);
                list.forEach((element) => {
                    const image = this.createImage(element, speed);
                    setEvents(image.element, {
                        click: () => this.visualizer.show(element, list)
                    });
                    speed += 100;
                });
            }).jsonPromise();
            this.visualizer.appendTo(this);
            this.appendTo(container);
        }
        createImage(image, speed) {
            const canvas = new UIComponent({
                type: "div",
                classes: ["canvas"]
            });
            const imageComponent = new UIComponent({
                type: "img",
                attributes: {
                    src: image,
                    alt: image,
                    loading: "lazy"
                }
            });
            setEvents(imageComponent.element, {
                load: () => imageComponent.element.style.opacity = "1"
            });
            imageComponent.appendTo(canvas);
            canvas.appendTo(this);
            setTimeout(() => canvas.element.style.opacity = "1", speed);
            this.images.push(canvas);
            return canvas;
        }
    }
    GalleryView.ID = "gallery";

    class AboutMeView extends ViewUI {
        constructor() {
            super({
                type: "view",
                id: AboutMeView.ID,
                classes: ["box-column", "box-center"],
            });
        }
        async show(params, container) {
            const text = new UIComponent({
                type: "p",
                id: AboutMeView.INFO_TEXT_ID,
                text: `Hi! I'm Skylerie, a freelance spanish
            artist who loves nature and mystical stuff.
            I have a passion for creating character designs and concepts! I'm fulltime a freelancer artist and part from commissions, I'm working an original graphic novel called 'Selenite'.`,
            });
            text.appendTo(this);
            this.appendTo(container);
        }
    }
    AboutMeView.ID = "about-me";
    AboutMeView.INFO_TEXT_ID = "info-text";

    /**
     * Get a Material Icons SVG by name.
     * @param name The name of the icon.
     * @param properties The properties of the icon.
     * @returns The container of the SVG as a UIComponent.
     */
    function getSocialIcon(name, properties) {
        properties.svg = MATERIAL_ICONS[name] || "";
        let text = createSVG(properties);
        const icon = new UIComponent({
            type: "div",
            classes: ["icon", "box-center"],
            text: text,
        });
        return icon;
    }
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
    const MATERIAL_ICONS = {
        "twitter": `<path d="M21 6.2145C20.3385 6.5075 19.627 6.703 18.8765 6.7955C19.6395 6.3425 20.2265 5.62 20.502 4.7665C19.788 5.185 18.997 5.4925 18.1555 5.6545C17.4835 4.942 16.525 4.5 15.463 4.5C13.423 4.5 11.7695 6.139 11.7695 8.16C11.7695 8.446 11.803 8.7245 11.866 8.995C8.79704 8.841 6.07504 7.382 4.25404 5.168C3.93404 5.709 3.75403 6.3425 3.75403 7.011C3.75403 8.2815 4.40454 9.4 5.39654 10.059C4.79104 10.0405 4.22103 9.872 3.72203 9.602C3.72203 9.613 3.72203 9.6295 3.72203 9.645C3.72203 11.4205 4.99553 12.899 6.68353 13.2355C6.37503 13.32 6.04903 13.367 5.71303 13.367C5.47453 13.367 5.24204 13.34 5.01704 13.2995C5.48704 14.7505 6.85053 15.811 8.46603 15.8425C7.20203 16.8225 5.61003 17.4095 3.87903 17.4095C3.58004 17.4095 3.28754 17.3925 2.99854 17.3575C4.63404 18.393 6.57603 19 8.66053 19C15.453 19 19.169 13.422 19.169 8.583C19.169 8.4245 19.164 8.2665 19.1565 8.1105C19.8815 7.5985 20.5065 6.9525 21 6.2145Z" fill="#inherit"/>`,
        "instagram": `<path d="M8.25 2.5C5.08319 2.5 2.5 5.08319 2.5 8.25V15.75C2.5 18.9164 5.0831 21.5 8.25 21.5H15.75C18.9165 21.5 21.5 18.9165 21.5 15.75V8.25C21.5 5.0831 18.9164 2.5 15.75 2.5H8.25ZM8.25 4H15.75C18.1056 4 20 5.8939 20 8.25V15.75C20 18.1055 18.1055 20 15.75 20H8.25C5.8939 20 4 18.1056 4 15.75V8.25C4 5.89381 5.89381 4 8.25 4ZM17 6C16.4475 6 16 6.4475 16 7C16 7.5525 16.4475 8 17 8C17.5525 8 18 7.5525 18 7C18 6.4475 17.5525 6 17 6ZM12 7C9.24759 7 7 9.24759 7 12C7 14.7524 9.24759 17 12 17C14.7524 17 17 14.7524 17 12C17 9.24759 14.7524 7 12 7ZM12 8.5C13.9416 8.5 15.5 10.0584 15.5 12C15.5 13.9416 13.9416 15.5 12 15.5C10.0584 15.5 8.5 13.9416 8.5 12C8.5 10.0584 10.0584 8.5 12 8.5Z" fill="INHERIT"/>`,
        "telegram": `<path d="M18.9932 6.58221C19.0223 6.40736 18.9567 6.23016 18.8208 6.11645C18.6848 6.00274 18.4988 5.96952 18.3318 6.02914L4.33184 11.0291C4.14321 11.0965 4.01299 11.2699 4.00091 11.4699C3.98884 11.6698 4.09725 11.8576 4.2764 11.9472L8.2764 13.9472C8.43688 14.0275 8.62806 14.0156 8.77735 13.916L12.0977 11.7024L10.1096 14.1877C10.022 14.2971 9.98442 14.4382 10.0059 14.5767C10.0274 14.7152 10.1061 14.8383 10.2227 14.916L16.2227 18.916C16.3638 19.0101 16.5431 19.0262 16.6988 18.9588C16.8545 18.8914 16.9653 18.7496 16.9932 18.5822L18.9932 6.58221Z" fill="inherit"/>`,
        "patreon": `<g clip-path="url(#clip0_22_5)"><path d="M6.82097 4.28125V19.6781H4V4.28125H6.82097ZM14.2286 4.28125C17.416 4.28125 20 6.86521 20 10.0527C20 13.2402 17.416 15.8241 14.2286 15.8241C11.0411 15.8241 8.45714 13.2402 8.45714 10.0527C8.45714 6.86521 11.0411 4.28125 14.2286 4.28125Z" fill="inherit"/></g><defs><clipPath id="clip0_22_5"><rect width="16" height="16" fill="none" transform="translate(4 4)"/></clipPath></defs>`,
    };

    class ContactsView extends ViewUI {
        constructor() {
            super({
                type: "view",
                id: ContactsView.ID,
                classes: ["box-column", "box-center"],
            });
        }
        async show(params, container) {
            this.createSocialBox("twitter", "Skyleriearts", "https://twitter.com/Skyleriearts", "#1DA1F2");
            this.createSocialBox("instagram", "Skyleriie", "https://www.instagram.com/skyleriie", "#C13584");
            this.createSocialBox("telegram", "SkylerieArt", "https://t.me/skylerie", "#0088cc");
            this.createSocialBox("patreon", "Skylerie", "https://www.patreon.com/skylerie", "#F96854");
            this.appendTo(container);
        }
        createSocialBox(icon, text, link, hoverColor = "rgba(255,255,255,0.17)") {
            const twitterBox = new UIComponent({
                type: "a",
                classes: ["box-row", "box-center", "box-x-start", ContactsView.BOX_CLASS],
                attributes: {
                    href: link,
                    target: "_blank",
                },
            });
            twitterBox.element.style.setProperty("--hover-color", hoverColor);
            const iconComponent = getSocialIcon(icon, {
                fill: "rgba(255,255,255,0.7)",
                size: "2.5rem",
            });
            setStyles(iconComponent.element, {
                margin: "0 .5rem",
            });
            const textComponent = new UIComponent({
                type: "p",
                text: text,
            });
            iconComponent.appendTo(twitterBox);
            textComponent.appendTo(twitterBox);
            twitterBox.appendTo(this);
        }
    }
    ContactsView.ID = "contacts";
    ContactsView.BOX_CLASS = "social-box";

    class HomeView extends ViewUI {
        constructor() {
            super({
                type: "view",
                id: HomeView.ID,
                classes: ["box-column", "box-y-center"],
                styles: {
                    height: "100%",
                    width: "100%",
                    overflow: "auto",
                }
            });
        }
        async show(params, container) {
            console.log(params);
            const navmenu = new Navbar();
            navmenu.appendTo(this);
            const navmenuMobile = new Navbar();
            navmenuMobile.appendTo(this);
            navmenuMobile.drawCompact();
            let lastY = 0;
            let colapsed = false;
            document.addEventListener("scroll", (event) => {
                //capture the scroll event
                const scroll = document.documentElement.scrollTop;
                console.log("Y: ", scroll);
                console.log("lastY: ", lastY);
                if (scroll == lastY) {
                    return;
                }
                if (colapsed && scroll > 600) {
                    return;
                }
                if (!colapsed && scroll < 600) {
                    return;
                }
                if (scroll > 600) {
                    navmenuMobile.element.classList.remove("hide");
                    setTimeout(() => {
                        navmenuMobile.element.classList.add("show");
                    }, 1);
                    colapsed = true;
                    return;
                }
                navmenuMobile.element.classList.remove("show");
                navmenuMobile.element.classList.add("hide");
                colapsed = false;
            });
            switch (params[0]) {
                case "about":
                    const about = new AboutMeView();
                    navmenu.select("about");
                    navmenuMobile.select("about");
                    await about.show(params.splice(1), this);
                    break;
                case "contact":
                    const contact = new ContactsView();
                    navmenu.select("contact");
                    navmenuMobile.select("contact");
                    await contact.show(params.splice(1), this);
                    break;
                default:
                    const gallery = new GalleryView();
                    navmenu.select("gallery");
                    navmenuMobile.select("gallery");
                    await gallery.show(params.splice(1), this);
                    break;
            }
            this.appendTo(container);
        }
    }
    HomeView.ID = "home";

    class Router {
        constructor() {
            {
                this.parent = document.getElementById("view-container");
                //If no parent is present on the HTML file throws an error
                if (!this.parent) {
                    throw new InitializeError("view-container does not exist");
                }
                this.container = new UIComponent({
                    type: "div",
                    id: "view-container-box",
                    styles: {
                        width: "100%",
                        height: "100%",
                    },
                });
                this.container.appendTo(this.parent);
            }
        }
        /**
         * Load the app state with the given params
         * @param params The list of params
         */
        load(params) {
            try {
                this.clear();
                switch (params[0]) {
                    case undefined:
                    case "":
                    case "home":
                        new HomeView().show(params.splice(1), this.container);
                        break;
                    case "about":
                        new HomeView().show(params.splice(0), this.container);
                        break;
                    case "gallery":
                        new HomeView().show(params.splice(0), this.container);
                        break;
                    case "contact":
                        new HomeView().show(params.splice(0), this.container);
                        break;
                    case "lang":
                        Config.setLanguage(params.splice(1)[0]);
                        location.href = Config.VIEWS.HOME;
                        break;
                    case "blank":
                        break;
                    case "error":
                        new ErrorView().show(params.slice(1), this.container);
                        break;
                    default:
                        new ErrorView().show(["404"], this.container);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        /**
         * Clear the container
         */
        clear() {
            this.container.element.innerHTML = "";
        }
    }

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
    function getParametersByIndex(url, index) {
        let params = url.split("/");
        params = params.slice(index, params.length);
        return params;
    }

    const HomeBundleEn = {
        WELCOME_MESSAGE: "Welcome to GTD Framework!",
        WELCOME_DESCRIPTION: "Start building your application now",
        HELLO_WORLD: "Hello World",
        HELLO_WORLD_DESCRIPTION: "Create your first app with GTDF",
        CONFIGURATIONS: "Configurations",
        CONFIGURATIONS_DESCRIPTION: "Learn how to set up a new project",
        CONTRIBUTE: "Contribute",
        CONTRIBUTE_DECRIPTION: "Help us to improve!",
    };

    const HomeBundleEs = {
        WELCOME_MESSAGE: "Bienvenido a GTD Framework!",
        WELCOME_DESCRIPTION: "Comienza a crear tu app ahora",
        HELLO_WORLD: "Hola mundo",
        HELLO_WORLD_DESCRIPTION: "Crea tu primera app con GTDF",
        CONFIGURATIONS: "Configuraciones",
        CONFIGURATIONS_DESCRIPTION: "Aprende a configurar un nuevo proyecto",
        CONTRIBUTE: "Contribuye",
        CONTRIBUTE_DECRIPTION: "Ayudanos a mejorar!",
    };

    class TextBundle {
        static get(lang) {
            switch (lang) {
                case Language.ENGLISH:
                    return this.getBundleEn();
                case Language.SPANISH:
                    return this.getBundleEs();
                default:
                    return this.getBundleEn();
            }
        }
        static getBundleEn() {
            return {
                home: HomeBundleEn
            };
        }
        static getBundleEs() {
            return {
                home: HomeBundleEs
            };
        }
    }

    /**
     * Abstract class representing those classes
     * that listen to events to handle them in a
     * specific way.
     *
     * The ping() method has testing purposes and
     * can be deleted.
     */
    class Listener {
        ping() {
            alert({
                title: "Connected",
                icon: "notifications",
                message: "Pong!",
                desktop: true,
            });
        }
        ;
    }

    /**
     * Example listener to show how to create Listener
     * extended classes
     */
    class ExampleListener extends Listener {
        constructor() {
            super();
        }
    }

    /**
     * Event listeners for the application
     */
    const Events = {
        example: new ExampleListener()
    };

    class Keyboard {
        static setEventListeners(listeners) {
            document.addEventListener('keyup', function (event) {
                // CTRL + period
                if (event.ctrlKey && event.code === 'Period') {
                    listeners.example.ping();
                }
            });
        }
    }

    class NotificationUI extends UIComponent {
        constructor() {
            super({
                type: "notification",
                classes: ["box-column"],
            });
            this.bar = new UIComponent({
                id: "nt-bar",
            });
            this.content = new UIComponent({
                id: "nt-content",
                classes: ["box-row", "box-y-center", "box-x-between"],
            });
            this.showing = false;
            this.appendChild(this.bar);
            this.appendChild(this.content);
        }
        /**
         * Set the notification content
         * @param properties The content to set with title, message and other properties
         */
        setContent(properties) {
            this.bar.clean();
            this.content.clean();
            if (properties.title) {
                const title = new UIComponent({
                    type: "h1",
                    id: "nt-title",
                    text: properties.title,
                });
                this.bar.element.classList.remove("hidden");
                this.bar.appendChild(title);
            }
            else {
                setClasses(this.bar.element, ["hidden"]);
            }
            if (properties.message) {
                const text = new UIComponent({
                    type: "span",
                    text: properties.message
                });
                this.content.appendChild(text);
            }
            if (properties.icon) {
                const icon = getMaterialIcon(properties.icon, { size: "1.25rem", fill: "#404040" });
                this.content.appendChild(icon);
            }
        }
        async show(seconds = 1) {
            if (this.showing)
                return;
            setTimeout(() => {
                setClasses(this.element, ["show"]);
            }, 1);
            this.showing = true;
            setTimeout(() => {
                this.element.classList.remove("show");
                this.showing = false;
            }, 1000 + seconds * 1000);
        }
    }

    /**
     * Class that represents the application frontend proccess
     * it can be intantiated more than once, but the classic
     * web application structure wont need it.
     */
    class App {
        /**
         * Create an instance of the application
         */
        constructor() {
            this.router = new Router();
            this.events = Events;
            Keyboard.setEventListeners(this.events);
            // Set the notification element
            this.notification = new NotificationUI();
            document.body.appendChild(this.notification.element);
            this.setNoficationSystem();
            console.log("App loaded!");
        }
        /**
         * Load the app state with the given URL address
         * The URL get parsed to take the parameters in
         * a list.
         *
         * In the URL https://mydomain.org/#/object/123
         * the parameter list will be the following : [object,123]
         *
         * The first parameter must be a view name, otherwise the
         * app will redirect the user to an 404 error page.
         */
        load() {
            const params = getParametersByIndex(window.location.hash.slice(1).toLowerCase(), 1);
            this.router.load(params);
        }
        /**
         * Override the alert system  with a custom notification widget
         * to send notifications across the app without having to
         * implement an external alert system,
         */
        setNoficationSystem() {
            // Override the default notification function
            window.alert = (properties) => {
                this.notification.setContent(properties);
                this.notification.show(properties.time);
                // If the desktop notification are active 
                if (properties.desktop) {
                    new Notification(Config.BASE.APP_NAME, {
                        icon: Config.PATHS.ICONS + "logo.svg",
                        body: properties.message,
                    });
                }
            };
        }
        /**
         * Get current language text bundle
         * @returns The text bundle int the current app language.
         */
        static getBundle() {
            let lang = Config.getLanguage();
            return TextBundle.get(lang);
        }
    }

    exports.app = void 0;
    /**
     * When the dynamic URL changes loads
     * the correspoding view from the URL
     */
    window.addEventListener('hashchange', () => {
        exports.app.load();
    });
    /**
     * When the window is loaded load
     * the app state to show
     */
    window.onload = async () => {
        if (exports.app === undefined) {
            await Config.setDefaultVariables();
            exports.app = new App();
        }
        exports.app.load();
    };

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
