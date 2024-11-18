import { Configuration } from "../../configuration/configuration.js";
import Project, { Image } from "../../core/models/project.js";
import { BubbleUI } from "../../lib/bubble/bubble.js";
import DOM, { Html } from "../../lib/gtdf/component/dom.js";
import { UIComponent } from "../../lib/gtdf/component/ui.component.js";
import { Signal } from "../../lib/gtdf/core/signals/signals.js";
import { Browser } from "../../lib/gtdf/web/browser.js";

export interface ImageGalleryData {
  images: Image[];
  selected: number;
}

/**
 * Gallery component to show images
 * for a project
 */
export default class ProjectGallery extends UIComponent {
  private static readonly CLASS = "gallery";
  private static readonly TITLE_ID = "title";
  private static readonly LIST_ID = "image-list";
  private static readonly MOBILE_CLASS = "mobile";

  public visualizeImageSignal: Signal<ImageGalleryData> =
    new Signal<ImageGalleryData>("visualize-image");

  public constructor(project: Project) {
    super({
      type: Html.Div,
      classes: [
        ProjectGallery.CLASS,
        BubbleUI.BoxColumn,
        BubbleUI.BoxXStart,
        BubbleUI.BoxYStart,
      ],
    });
    this.configure(project);
  }

  /**
   * Configure the gallery
   * @param project Project to show
   * @returns void
   */
  public async configure(project: Project) {
    // if nothing to show, return
    if (
      undefined == project ||
      undefined == project.images ||
      project.images.length == 0
    )
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
  register(list: UIComponent, image: Image, album : Array<Image>): void {
    const listItem = new UIComponent({ type: Html.Li });
    const url = image.url;
    const canvas = new ImageCanvas(image, album, this.visualizeImageSignal);
    setTimeout(() => (canvas.element.style.opacity = "1"), 1);
    canvas.appendTo(listItem);
    listItem.appendTo(list);
  }
}

/**
 * ImageCanvas component to show an image
 * in the gallery
 */
class ImageCanvas extends UIComponent {
  
  private imageClickedSignal: Signal<ImageGalleryData>;

  public constructor(image: Image, album : Array<Image>, signal?: Signal<ImageGalleryData>) {
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
  configure(image: Image): void {
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
