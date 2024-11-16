var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MaterialIcons_1;
import { Configuration } from "../../configuration/configuration.js";
import { BubbleUI } from "../bubble/bubble.js";
import { Html } from "../gtdf/component/dom.js";
import { UIComponent } from "../gtdf/component/ui.component.js";
import { Singleton } from "../gtdf/core/decorator/singleton.js";
import { StaticImplements } from "../gtdf/core/static/static.inteface.js";
/**
 * Material icon loader class
 * loads the material icons from the json file
 * @implements IObserver the observer interface
 * @author akrck02
 */
export class MaterialIconsLoader {
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
MaterialIcons = MaterialIcons_1 = __decorate([
    Singleton(),
    StaticImplements(),
    __metadata("design:paramtypes", [])
], MaterialIcons);
export default MaterialIcons;
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
export function createSVG(properties) {
    const svg = `
    <svg class="${properties?.classes?.join(" ")}" width="${properties.size}" height="${properties.size}" viewBox="0 0 24 24" fill="${properties.fill}" xmlns="http://www.w3.org/2000/svg">
    ${properties.svg}
    </svg>
    `;
    return svg;
}
