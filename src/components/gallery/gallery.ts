import { Image } from "../../core/models/project.js";
import { Browser } from "../../lib/gtdf/components/browser.js";
import { HTML } from "../../lib/gtdf/components/dom.js";
import { UIComponent } from "../../lib/gtdf/components/uicomponent.js";
import { Gtdf } from "../../lib/others/gtdf.js";

export default class Gallery extends UIComponent {
  private static readonly CLASS = "gallery";
  private static readonly TITLE_ID = "title";
  private static readonly LIST_ID = "image-list";
  private static readonly MOBILE_CLASS = "mobile";

  public constructor(name: string, images: Image[]) {
    super({
      type: HTML.DIV,
      classes: [
        Gallery.CLASS,
        Gtdf.BOX_COLUMN,
        Gtdf.BOX_X_START,
        Gtdf.BOX_Y_START,
      ],
    });
    this.configure(name, images);
  }

  public async configure(name: string, images: Image[]) {
    if (Browser.isSmallDevice()) {
      this.element.classList.add(Gallery.MOBILE_CLASS);
    }

    const list = new UIComponent({
      type: HTML.UL,
      id: Gallery.LIST_ID,
    });

    images.forEach((image) => {
      const listItem = new UIComponent({ type: HTML.LI });
      const imageComponent = this.createImage(image.url, 100);
      imageComponent.appendTo(listItem);
      listItem.appendTo(list);
    });

    list.appendTo(this);
  }

  createImage(image: string, speed: number): UIComponent {
    const canvas = new UIComponent({
      type: "div",
      classes: ["canvas"],
    });

    const imageComponent = new UIComponent({
      type: "img",
      attributes: {
        src: image,
        alt: image,
        loading: "lazy",
        background: "#fff",
      },
    });

    imageComponent.setEvents({
      load: () => (imageComponent.element.style.opacity = "1"),
    });

    imageComponent.appendTo(canvas);
    canvas.appendTo(this);
    setTimeout(() => (canvas.element.style.opacity = "1"), speed);

    return canvas;
  }
}
