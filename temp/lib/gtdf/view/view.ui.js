var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { UIComponent } from "../component/ui.component.js";
import { StaticImplements } from "../core/static/static.inteface.js";
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
ViewUI = __decorate([
    StaticImplements(),
    __metadata("design:paramtypes", [Object])
], ViewUI);
export { ViewUI };
