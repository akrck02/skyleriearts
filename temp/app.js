var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Configuration } from "./configuration/configuration.js";
import BootHandler from "./core/boot.handler.js";
import { Singleton } from "./lib/gtdf/core/decorator/singleton.js";
import { StaticImplements } from "./lib/gtdf/core/static/static.inteface.js";
import Urls from "./lib/gtdf/data/urls.js";
import Router from "./views/router.js";
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
        Router.instance.load(params);
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
export default App;
