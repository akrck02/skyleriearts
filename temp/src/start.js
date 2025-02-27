(function () {
    'use strict';

    /**
    * The id of the configuration used in the LocalStorage API
    * NOTE: Change this value with your app name.
    */
    const configurationId = "skyleriearts-website-config";
    /**
     * Load a JSON file as the configuration of the app
     * @param path The file path
     */
    async function loadConfiguration(path) {
        const loadedConfiguration = await fetch(path).then(res => res.json());
        localStorage[configurationId] = JSON.stringify(loadedConfiguration);
    }
    /**
     * Get configuration value
     * @param id The parameter id
     * @returns The parameter value
     */
    function getConfiguration(id) {
        const configuration = JSON.parse(localStorage[configurationId]);
        return configuration[id];
    }

    /** Create a DOM element */
    function uiComponent(properties) {
        const element = document.createElement(properties.type || "div");
        element.innerHTML = undefined != properties.text ? properties.text : "";
        if (undefined != properties.id)
            element.id = properties.id;
        setDomClasses(element, properties.classes);
        setDomAttributes(element, properties.attributes);
        setDomStyles(element, properties.styles);
        setDomDataset(element, properties.data);
        if (false == properties.selectable) {
            setDomStyles(element, { userSelect: "none" });
        }
        return element;
    }
    /** Set DOM attributes */
    function setDomAttributes(element, attributes) {
        if (undefined == element || undefined == attributes)
            return element;
        for (const key in attributes)
            element.setAttribute(key, attributes[key]);
        return element;
    }
    /** Set DOM classes */
    function setDomClasses(element, classes) {
        if (undefined == element || undefined == classes)
            return element;
        for (const cl of classes) {
            element.classList.add(cl);
        }
        return element;
    }
    /** Set DOM styles */
    function setDomStyles(element, styles) {
        if (undefined == element || undefined == styles)
            return element;
        for (const key in styles)
            element.style[key] = styles[key];
        return element;
    }
    /** Set DOM events*/
    function setDomEvents(element, events) {
        if (undefined == element || undefined == events)
            return element;
        for (const key in events)
            element.addEventListener(key, events[key]);
        return element;
    }
    /** Set DOM dataset */
    function setDomDataset(element, dataset) {
        if (undefined == element || undefined == dataset)
            return element;
        for (const key in dataset)
            element.dataset[key] = dataset[key];
        return element;
    }

    const icons = new Map();
    /**
     * Load icon collection from the given path
     * WARNING: Icon collection must be a json file
     * with svg contents for each key.
     *
     * @param id The id to set to the collection
     * @param path The path to search the collection for
     */
    async function loadIcons(id, path) {
        const collection = await fetch(path).then(res => res.json()).catch(console.error);
        icons.set(id, collection);
    }
    /**
     * Get an icon from current bundle
     * @param collectionId The id of the collection to search in
     * @param key The id of the icon to search for
     * @param size (Optional) The size to apply to the icon, applies 24px by default
     * @param fill (Optional) The color to fill the icon, applies #222222 by default
     * @returns HTMLElement with the svg element inside, nothing if the icon or collection does not exist
     */
    function getIcon(collectionId, key, size = "24px", fill = "#222222") {
        const collection = icons.get(collectionId);
        if (undefined == collection)
            return undefined;
        const content = collection[key];
        if (undefined == content)
            return undefined;
        const svg = `<svg height="${size}" width="${size}" viewBox="0 0 24 24" fill="${fill}">${content || ""}</svg>`;
        return uiComponent({ type: "div", text: svg });
    }

    const paths = new Map();
    let homeHandler = async (_p, c) => { c.innerHTML = "Home page."; };
    let notFoundHandler = async (_p, c) => { c.innerHTML = "Page not found."; };
    /**
     * Register a new route.
     * @param path The router path
     * @param handler The route handler
     */
    function setRoute(path, handler) {
        // If the path is empry return 
        if (undefined == path)
            return;
        // If the path is blank or /, register home and return
        path = path.trim();
        // If the path is home
        if ("/" == path || "" == path) {
            homeHandler = handler;
            return;
        }
        // If the path ends with / trim it
        const indexOfSlash = path.indexOf("/");
        if (-1 != indexOfSlash && "/" == path.substring(path.length - 1))
            path = path.substring(0, path.length - 1);
        // Replace all the variables with regex expressions to capture them later
        const regexp = /\/(\$+)/g;
        path = path.replaceAll(regexp, "/([^\/]+)");
        paths.set(path, handler);
        console.debug(`Set route ${path}`);
    }
    /**
     * Register the route to display when route path is not found.
     * @param handler The view handler to call
     */
    function setNotFoundRoute(handler) {
        notFoundHandler = handler;
    }
    /**
     * Show view for the given route.
     * @param path The given path to search for
     * @param container The container to display the views in
     */
    function showRoute(path, container) {
        container.innerHTML = "";
        // If it is the home route, show
        if ("/" == path || "" == path) {
            homeHandler([], container);
            return;
        }
        // Else search matching route
        const keys = Array.from(paths.keys()).sort(compareRouteLength);
        for (const route of keys) {
            // Check if route matches
            const regexp = RegExp(route);
            const params = path.match(regexp);
            if (null != params && 0 != params.length) {
                paths.get(route)(params.slice(1), container);
                return;
            }
        }
        // If no route found, show not found view.
        notFoundHandler([], container);
    }
    /**
     * Compare the length of two routes
     */
    function compareRouteLength(a, b) {
        const aLength = a.split("/").length - 1;
        const bLength = b.split("/").length - 1;
        if (aLength == bLength)
            return 0;
        if (aLength < bLength)
            return 1;
        return -1;
    }

    let projects = [];
    async function loadProjects() {
        const dataPath = `${getConfiguration("path")["resources"]}/data/images.json`;
        const response = await fetch(dataPath);
        projects = await response.json();
    }
    function getProjectTags() {
        const tags = new Set();
        projects.forEach(project => project?.tags?.forEach((tag) => tags.add(tag)));
        return tags;
    }
    function getProjectsByTag(tag) {
        return projects.filter(projects => projects.tags.indexOf(tag) != -1);
    }

    const errors = {
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
    function getErrorByCode(code) {
        return errors[code];
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

    const DEFAULT_ERROR_CODE = 404;
    const ID = "error";
    const IMAGE_ID$1 = "error-img";
    const TITLE_ID = "error-title";
    async function showErrorView(params, container) {
        const view = uiComponent({
            type: "view",
            id: ID,
            classes: ["box-column", "box-center"],
        });
        const code = parseInt(params[0]);
        let error = getErrorByCode(code);
        // Default error set if no error parameter was given
        if (!error) {
            error = getErrorByCode(DEFAULT_ERROR_CODE);
        }
        // Image
        const image = uiComponent({
            type: Html.Img,
            id: IMAGE_ID$1,
            attributes: {
                src: `${getConfiguration("path")["icons"]}/error.svg`,
            },
        });
        view.appendChild(image);
        // Error title
        const title = uiComponent({
            type: Html.H1,
            id: TITLE_ID,
            text: error.friendly,
        });
        view.appendChild(title);
        // Error description
        const description = uiComponent({
            type: Html.P,
            text: error.description,
        });
        view.appendChild(description);
        container.appendChild(view);
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

    const SMALL_DEVICE_WIDTH = 760;
    /**
    * Get if the device is a small device
    * @returns True if the device is a small device
    */
    function isSmallDevice() {
        return window.matchMedia(`only screen and (max-width: ${SMALL_DEVICE_WIDTH}px)`).matches;
    }

    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16));
    }

    const buffer = new Map();
    /**
     * Set a new signal
     */
    function setSignal() {
        const id = uuidv4();
        buffer.set(id, []);
        return id;
    }
    /**
     * Connect a function to a signal
     * @param id The signal id
     * @param handler The signal handler function
     */
    function connectToSignal(id, handler) {
        if (false == buffer.has(id)) {
            console.error(`Error connecting: The signal ${id} does not exist.`);
            return;
        }
        buffer.get(id).push(handler);
    }
    /**
     * Emit a signal with the given dat
     */
    async function emitSignal(id, data) {
        if (false == buffer.has(id))
            return;
        const targets = buffer.get(id);
        for (const target of targets) {
            target(data);
        }
    }

    class ProjectGallery {
        static render(project) {
            // if nothing to show, return
            if (undefined == project?.images || 0 == project.images.length)
                return;
            let gallery = uiComponent({
                type: Html.Div,
                classes: [
                    ProjectGallery.CLASS,
                    BubbleUI.BoxColumn,
                    BubbleUI.BoxXStart,
                    BubbleUI.BoxYStart,
                ],
            });
            // turn on mobile class if needed
            if (isSmallDevice()) {
                gallery.classList.add(ProjectGallery.MOBILE_CLASS);
            }
            // Add a list of images to show
            // in the gallery
            const list = uiComponent({
                type: Html.Ul,
                id: ProjectGallery.LIST_ID,
            });
            project?.images?.forEach((image) => this.register(list, image, project.images));
            gallery.appendChild(list);
            return gallery;
        }
        static register(list, image, album) {
            console.log(image);
            const listItem = uiComponent({ type: Html.Li });
            const canvas = this.imageCanvas(image, album);
            setTimeout(() => canvas.style.opacity = "1", 1);
            listItem.appendChild(canvas);
            list.appendChild(listItem);
        }
        static imageCanvas(image, album) {
            const canvas = uiComponent({
                type: Html.Div,
                classes: ["canvas"],
            });
            setDomEvents(canvas, {
                click: () => {
                    emitSignal(ProjectGallery.IMAGE_SELECTED_SIGNAL, {
                        images: album,
                        selected: album.indexOf(image),
                    });
                },
            });
            const imageComponent = uiComponent({
                type: Html.Img,
                attributes: {
                    src: image.url,
                    alt: image.title,
                    loading: "lazy",
                    background: "#fff",
                },
            });
            setDomEvents(imageComponent, {
                load: () => (imageComponent.style.opacity = "1"),
            });
            canvas.appendChild(imageComponent);
            return canvas;
        }
    }
    ProjectGallery.CLASS = "gallery";
    ProjectGallery.TITLE_ID = "title";
    ProjectGallery.LIST_ID = "image-list";
    ProjectGallery.MOBILE_CLASS = "mobile";
    ProjectGallery.IMAGE_SELECTED_SIGNAL = setSignal();

    class Header {
        static render(tags) {
            return Header.create(tags);
        }
        static create(tags) {
            let header = uiComponent({
                type: Html.Div,
                id: Header.HEADER_ID,
                classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYCenter],
            });
            const profilePicture = uiComponent({
                type: Html.Img,
                id: "logo",
                attributes: {
                    src: `${getConfiguration("path")["images"]}/logo.jpg`,
                },
            });
            const title = uiComponent({
                type: Html.H1,
                text: "Skylerie",
                id: "title",
                classes: [BubbleUI.TextCenter],
            });
            const selected = tags.values().next().value;
            const tagMenu = this.drawTags(tags, selected);
            header.appendChild(profilePicture);
            header.appendChild(title);
            header.appendChild(tagMenu);
            return header;
        }
        static drawTags(tags, selected) {
            const menu = uiComponent({
                type: Html.Div,
                id: Header.TAG_MENU_ID,
                classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
            });
            tags.forEach(tag => {
                const button = uiComponent({
                    type: Html.Button,
                    text: tag,
                    classes: selected == tag ? [Header.TAG_BUTTON_CLASS, "selected"] : [Header.TAG_BUTTON_CLASS],
                });
                setDomEvents(button, {
                    click: () => {
                        const buttons = document.querySelectorAll(`#${Header.HEADER_ID} .${Header.TAG_BUTTON_CLASS}`);
                        buttons.forEach(b => b.classList.remove("selected"));
                        button.classList.add("selected");
                        emitSignal(Header.TAG_SELECTED_SIGNAL, tag);
                    }
                });
                menu.appendChild(button);
            });
            return menu;
        }
    }
    Header.HEADER_ID = "header";
    Header.TAG_MENU_ID = "tag-menu";
    Header.TAG_BUTTON_CLASS = "tag-button";
    Header.TAG_SELECTED_SIGNAL = setSignal();

    const VISUALIZER_ID = "visualizer";
    const BUTTON_BACK_ID = "visualizer-back";
    const BUTTON_NEXT_ID = "visualizer-next";
    const IMAGE_ID = "visualizer-image";
    const INFO_TEXT_ID = "visualizer-info-text";
    /**
     * This class is responsible of processing
     * the image gallery and current image to
     * display.
     */
    class VisualizerProcessor {
        constructor() {
            this.images = [];
            this.index = 0;
        }
        load(images) {
            this.images = images;
        }
        isFirstImage() {
            if (0 == this.images.length)
                return false;
            return 0 == this.index;
        }
        isLastImage() {
            if (0 == this.images.length)
                return false;
            return this.images.length - 1 == this.index;
        }
        set(currentImage) {
            this.index = this.images.indexOf(currentImage);
            if (-1 == this.index)
                this.index = 0;
        }
        getCurrentImage() {
            if (0 == this.images.length)
                return null;
            return this.images[this.index];
        }
        next() {
            console.log(this);
            if (0 == this.images.length)
                return;
            this.index++;
            if (this.images.length <= this.index)
                this.index = 0;
        }
        previous() {
            console.log(this);
            if (0 == this.images.length)
                return;
            this.index--;
            if (0 > this.index)
                this.index = this.images.length - 1;
        }
    }
    /**
     * This is a ui component responsible of showing
     * a gallery of images.
     */
    class Visualizer {
        /**
         * Render a visualizer
         */
        static render(processor) {
            let visualizer = document.getElementById(VISUALIZER_ID);
            return null == visualizer ? Visualizer.create(processor) : Visualizer.update(visualizer, processor);
        }
        /**
         * Create a new visualizer given an state
         */
        static create(processor) {
            const visualizer = uiComponent({
                type: Html.Div,
                id: VISUALIZER_ID,
                classes: [BubbleUI.BoxRow, BubbleUI.BoxCenter],
            });
            setDomEvents(visualizer, {
                click: (event) => {
                    //if the click is not on the image, close the visualizer
                    if (event.target != visualizer)
                        return;
                    event.stopPropagation();
                    visualizer.style.display = "none";
                }
            });
            const buttonBack = getIcon("material", "back", "48px", "var(--text-color)");
            buttonBack.id = BUTTON_BACK_ID;
            setDomEvents(buttonBack, {
                click: () => {
                    processor.previous();
                    this.render(processor);
                }
            });
            const buttonNext = getIcon("material", "back", "48px", "var(--text-color)");
            buttonNext.id = BUTTON_NEXT_ID;
            setDomEvents(buttonNext, {
                click: () => {
                    processor.next();
                    this.render(processor);
                }
            });
            const image = uiComponent({
                type: Html.Img,
                id: IMAGE_ID,
                attributes: { src: processor.getCurrentImage()?.url || "" },
            });
            const infoText = uiComponent({
                type: Html.P,
                id: INFO_TEXT_ID,
                text: "Touch outside the image to close the visualizer.",
                classes: ["info-text"],
            });
            visualizer.appendChild(buttonBack);
            visualizer.appendChild(image);
            visualizer.appendChild(buttonNext);
            visualizer.appendChild(infoText);
            return visualizer;
        }
        /**
         * Update the visualizer with the current processor state.
         */
        static update(visualizer, processor) {
            const image = document.getElementById(IMAGE_ID);
            image.style.display = "flex";
            image.setAttribute("src", processor.getCurrentImage()?.url || "");
            return visualizer;
        }
        static show() {
            const visualizer = document.getElementById(VISUALIZER_ID);
            if (null == visualizer)
                return;
            visualizer.style.display = "flex";
        }
    }

    // HTML ids and classes
    const VIEW_ID = "home";
    // Signals
    const PROJECT_SELECTED_SIGNAL = setSignal();
    // Data
    let visualizerProcessor = new VisualizerProcessor();
    /**
     * Show home view
     */
    async function showHomeView(parameters, container) {
        const tags = new Set(getProjectTags());
        const view = uiComponent({
            type: Html.View,
            id: VIEW_ID,
            classes: [BubbleUI.BoxRow, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
        });
        const visualizerProcessor = new VisualizerProcessor();
        const selectedTag = parameters[0] || getProjectTags().values().next().value;
        const visualizer = Visualizer.render(visualizerProcessor);
        const header = Header.render(tags);
        const galleryContainer = uiComponent({
            type: Html.Div,
            id: "gallery-container",
            classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
        });
        connectToSignal(Header.TAG_SELECTED_SIGNAL, async (tag) => showTag(galleryContainer, tag, undefined));
        connectToSignal(PROJECT_SELECTED_SIGNAL, async (data) => showTag(galleryContainer, data?.tag, data?.project?.name));
        view.appendChild(header);
        view.appendChild(galleryContainer);
        view.appendChild(visualizer);
        container.appendChild(view);
        emitSignal(Header.TAG_SELECTED_SIGNAL, selectedTag);
    }
    /**
     * Show the projects of the selected tag
     * @param container The container of the gallery
     * @param currentTag The selected tag
     * @param currentProject The selected project
     */
    async function showTag(container, currentTag, currentProjectName) {
        // If container is not present, return
        if (undefined == container) {
            console.error(`Undefined container`);
            return;
        }
        // If tag is not selected, return
        if (undefined == currentTag) {
            console.error(`Tag ${currentTag} not found`);
            return;
        }
        console.log(currentProjectName);
        // If the project is not found, return
        const projects = getProjectsByTag(currentTag);
        const currentProject = currentProjectName == undefined ? projects[0] : projects.find(project => project.name.toLowerCase() == currentProjectName.toLowerCase());
        if (undefined == currentProject) {
            console.error(`Project not selected`);
            return;
        }
        // Disappear animation
        container.style.opacity = "0";
        await new Promise(resolve => setTimeout(resolve, 500));
        // Clear the gallery container
        container.innerHTML = "";
        // Add tag title to UI
        const title = uiComponent({
            type: Html.H1,
            text: currentTag,
            id: "title",
        });
        container.appendChild(title);
        // Create the project bar
        const bar = projectBar(projects, currentProject, currentTag);
        container.appendChild(bar);
        // Create the project gallery
        const gallery = ProjectGallery.render(currentProject);
        connectToSignal(ProjectGallery.IMAGE_SELECTED_SIGNAL, async (data) => {
            console.log(data);
            visualizerProcessor.load(data.images);
            visualizerProcessor.set(data.selected);
            Visualizer.render(visualizerProcessor);
            Visualizer.show();
        });
        container.appendChild(gallery);
        // appear animation
        container.style.opacity = "1";
        await new Promise(resolve => setTimeout(resolve, 260));
    }
    function projectBar(projects, current, tag) {
        const bar = uiComponent({
            type: Html.Div,
            id: "project-bar",
            classes: [BubbleUI.BoxRow, BubbleUI.BoxXCenter, BubbleUI.BoxYStart],
        });
        projects.forEach(project => {
            const button = uiComponent({
                type: Html.Button,
                text: project.name,
                classes: project.name == current.name ? ["selected"] : [],
            });
            button.onclick = () => emitSignal(PROJECT_SELECTED_SIGNAL, {
                tag: tag,
                project: project,
            });
            bar.appendChild(button);
        });
        return bar;
    }

    /**
     * When the dynamic URL changes loads
     * the correspoding view from the URL
     */
    window.addEventListener("hashchange", start);
    /**
     * When the window is loaded load
     * the app state to show
     */
    window.onload = start;
    /** Start the web app */
    async function start() {
        await loadConfiguration("gtdf.config.json");
        await loadIcons("material", `${getConfiguration("path")["icons"]}/materialicons.json`);
        await loadIcons("social", `${getConfiguration("path")["icons"]}/socialicons.json`);
        await loadProjects();
        setRoute("", showHomeView);
        setNotFoundRoute(showErrorView);
        showRoute(window.location.hash.slice(1).toLowerCase(), document.body);
    }

})();
