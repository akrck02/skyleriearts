import Gallery from "../../components/gallery/gallery.js";
import Header from "../../components/header/header.js";
import { Visualizer } from "../../components/visualizer/visualizer.js";
import { Config } from "../../config/config.js";
import IProject from "../../core/models/project.js";
import { Browser } from "../../lib/gtdf/components/browser.js";
import { HTML } from "../../lib/gtdf/components/dom.js";
import { UIComponent } from "../../lib/gtdf/components/uicomponent.js";
import { Route } from "../../lib/gtdf/decorators/Route.js";
import { Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { Gtdf } from "../../lib/others/gtdf.js";

@Route(["home", "", undefined])
@Singleton()
export default class HomeView extends ViewUI {
  private static readonly ID = "home";
  private static readonly MOBILE_CLASS = "mobile";
  private visualizer: Visualizer;

  public constructor() {
    super({
      type: HTML.VIEW,
      id: HomeView.ID,
      classes: [Gtdf.BOX_ROW, Gtdf.BOX_X_START, Gtdf.BOX_Y_START],
      styles: {
        minHeight: "100vh",
        height: "100%",
        width: "100%",
      },
    });
  }

  public async show(params: string[], container: UIComponent): Promise<void> {
    Config.setTitle(`${Config.Base.app_name} - home`);

    if (Browser.isSmallDevice()) {
      this.element.classList.add(HomeView.MOBILE_CLASS);
    }

    this.visualizer = new Visualizer();

    const header = new Header();
    header.appendTo(this);

    const response = await fetch(Config.Path.resources + "/data/images.json")
    const galleryData : Array<IProject> = await response.json();

    let galleryContainer = new UIComponent({
      type: HTML.DIV,
      classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_X_START, Gtdf.BOX_Y_START],
      styles: {
        width: "100%",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "auto",
        background: `url('${Config.Path.images}wall.png')`,
      },
    });

    // Draw project bar
    const projects = Object.keys(galleryData);
    let projectBar = this.getProjectBar(projects);
    projectBar.appendTo(galleryContainer);
    
    // Draw tag bar 
    const tags = new Set<string>();
    Object.values(galleryData).forEach((project : IProject) => {
        project.images.forEach(
            (image) => image.tags.forEach((tag) => tags.add(tag))
        );
    });

    console.log(tags);
    console.log(projects);
    

    for (const category in galleryData) {
      const images = galleryData[category];
    //   const gallery = new Gallery("", images);
    //   gallery.appendTo(galleryContainer);
    }

    galleryContainer.appendTo(this);
    this.appendTo(container);
  }


  /**
   * Get the project selection bar
   */
  getProjectBar(projects : Array<string>) : UIComponent {
    const projectBar = new UIComponent({
        type: HTML.DIV,
        classes: [Gtdf.BOX_ROW, Gtdf.BOX_X_START, Gtdf.BOX_Y_START],
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
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                margin: "10px",
            }
        });
        button.appendTo(projectBar);
    });

    return projectBar;
  }
}
