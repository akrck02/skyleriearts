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
import ProjectGallery from "../../components/gallery/gallery.js";
import Header from "../../components/header/header.js";
import { ImageVisualizer } from "../../components/visualizer/visualizer.js";
import { Configuration } from "../../configuration/configuration.js";
import { BubbleUI } from "../../lib/bubble/bubble.js";
import { Html } from "../../lib/gtdf/component/dom.js";
import { UIComponent } from "../../lib/gtdf/component/ui.component.js";
import { Route } from "../../lib/gtdf/core/decorator/route.js";
import { Singleton } from "../../lib/gtdf/core/decorator/singleton.js";
import { Signal } from "../../lib/gtdf/core/signals/signals.js";
import { ViewUI } from "../../lib/gtdf/view/view.ui.js";
import { Browser } from "../../lib/gtdf/web/browser.js";
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
        gallery.appendTo(this.galleryContainer);
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
