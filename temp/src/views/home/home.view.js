var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HomeView_1;
import Gallery from "../../components/gallery/gallery.js";
import Header from "../../components/header/header.js";
import { Visualizer } from "../../components/visualizer/visualizer.js";
import { Config } from "../../config/config.js";
import { Browser } from "../../lib/gtdf/components/browser.js";
import { HTML } from "../../lib/gtdf/components/dom.js";
import { UIComponent } from "../../lib/gtdf/components/uicomponent.js";
import { Route } from "../../lib/gtdf/decorators/Route.js";
import { Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { Gtdf } from "../../lib/others/gtdf.js";
let HomeView = HomeView_1 = class HomeView extends ViewUI {
    constructor() {
        super({
            type: HTML.VIEW,
            id: HomeView_1.ID,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_X_START, Gtdf.BOX_Y_START],
            styles: {
                minHeight: "100vh",
                height: "100%",
                width: "100%",
            },
        });
    }
    async show(params, container) {
        Config.setTitle(`${Config.Base.app_name} - home`);
        if (Browser.isSmallDevice()) {
            this.element.classList.add(HomeView_1.MOBILE_CLASS);
        }
        this.visualizer = new Visualizer();
        new Header().appendTo(this);
        const response = await fetch(Config.Path.resources + "/data/images.json");
        const galleryData = await response.json();
        let galleryContainer = new UIComponent({
            type: HTML.DIV,
            classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_X_START, Gtdf.BOX_Y_START],
            styles: {
                width: "100%",
                height: "100vh",
                maxHeight: "100vh",
                overflow: "auto",
            },
        });
        // Draw project bar
        const projects = new Set();
        const tags = new Set();
        galleryData.forEach((project) => {
            projects.add(project.name);
            project.images.forEach((image) => image.tags.forEach((tag) => tags.add(tag)));
        });
        const project = galleryData[0];
        const title = new UIComponent({
            type: HTML.H1,
            text: project.name,
            id: "title",
            styles: {
                fontFamily: "just another hand",
                fontSize: "10rem",
                color: "#9a8e75",
                width: "100%",
                textAlign: "center",
                paddingTop: "2rem",
            },
        });
        title.appendTo(galleryContainer);
        let projectBar = this.getProjectBar(projects);
        projectBar.appendTo(galleryContainer);
        new Gallery(project.name, project.images).appendTo(galleryContainer);
        galleryContainer.appendTo(this);
        this.appendTo(container);
    }
    /**
     * Get the project selection bar
     */
    getProjectBar(projects) {
        const projectBar = new UIComponent({
            type: HTML.DIV,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_X_CENTER, Gtdf.BOX_Y_START],
            styles: {
                width: "100%",
                height: "5vh",
                padding: "1rem",
            },
        });
        projects.forEach((project) => {
            const button = new UIComponent({
                type: HTML.BUTTON,
                text: project,
                classes: [],
                styles: {
                    backgroundColor: "#D9D2C3",
                    color: "#9A8E75",
                    fontSize: "1.2rem",
                    margin: "10px",
                },
            });
            button.appendTo(projectBar);
        });
        return projectBar;
    }
};
HomeView.ID = "home";
HomeView.MOBILE_CLASS = "mobile";
HomeView = HomeView_1 = __decorate([
    Route(["home", "", undefined]),
    Singleton(),
    __metadata("design:paramtypes", [])
], HomeView);
export default HomeView;
