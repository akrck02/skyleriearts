/**
 * This class contains methods to manipulate the DOM elements
 * @author akrck02
 */
export default class DOM {
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
export var Html;
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
