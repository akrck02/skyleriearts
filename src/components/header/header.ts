import { Configuration } from "../../configuration/configuration.js";
import { GalleryRequestParams } from "../../core/models/gallery.request.params.js";
import { BubbleUI } from "../../lib/bubble/bubble.js";
import { Html } from "../../lib/gtdf/component/dom.js";
import { UIComponent } from "../../lib/gtdf/component/ui.component.js";
import { Signal } from "../../lib/gtdf/core/signals/signals.js";

/**
 * Header component for the website
 */
export default class Header extends UIComponent {
  private static readonly ID = "header";
  public tagSelectedSignal: Signal<GalleryRequestParams>;

  public constructor(tags: Set<string>) {
    super({
      type: Html.Div,
      id: Header.ID,
      classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYCenter],
    });
    this.tagSelectedSignal = new Signal<GalleryRequestParams>("menu-changed");
    this.configure(tags);
  }

  public async configure(tags: Set<string>): Promise<void> {
    const profilePicture = new UIComponent({
      type: Html.Img,
      id: "logo",
      attributes: {
        src: `${Configuration.instance.path.images}logo.jpg`,
      },
    });

    const title = new UIComponent({
      type: Html.H1,
      text: "Skylerie",
      id: "title",
      classes: [BubbleUI.TextCenter],
    });

    const selected = tags.values().next().value;
    const tagMenu = new TagMenu(this.tagSelectedSignal, tags, selected);

    profilePicture.appendTo(this);
    title.appendTo(this);
    tagMenu.appendTo(this);
  }
}

/**
 * TagMenu is a UIComponent that displays a list of tags as buttons.
 */
class TagMenu extends UIComponent {
  private static readonly ID = "tag-menu";
  private buttons: Map<string, UIComponent> = new Map();
  private tagSelectedSignal: Signal<GalleryRequestParams>;

  public constructor(
    signal: Signal<GalleryRequestParams>,
    tags: Set<string>,
    selectedTag?: string,
  ) {
    super({
      type: Html.Div,
      id: TagMenu.ID,
      classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYStart],
    });
    this.tagSelectedSignal = signal;
    this.configure(tags, selectedTag);
  }

  public async configure(
    tags: Set<string>,
    selectedTag?: string,
  ): Promise<void> {
    tags.forEach((tag) => this.addTagButton(tag, selectedTag));
  }

  /**
   * Add a tag button to the tag menu.
   */
  addTagButton(tag: string, selectedTag?: string): void {
    const button = new UIComponent({
      type: Html.Button,
      text: tag,
      classes: selectedTag == tag ? ["selected"] : [],
      events: {
        click: () => this.selectTag(tag),
      },
    });
    this.buttons.set(tag, button);
    button.appendTo(this);
  }

  selectTag(selectedTag: string): void {
    this.buttons.forEach(
      (button: UIComponent, tag: string, map: Map<string, UIComponent>) => {
        button.element.classList.remove("selected");

        if (tag === selectedTag) {
          button.element.classList.add("selected");
        }
      },
    );

    this.tagSelectedSignal.emit({ tag: selectedTag });
  }
}
