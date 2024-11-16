import { Config } from "../../config/config.js";
import { HTML } from "../../lib/gtdf/components/dom.js";
import { UIComponent } from "../../lib/gtdf/components/uicomponent.js";
import { SocialIcons } from "../../lib/gtdf/resources/SocialIcons.js";
import { Gtdf } from "../../lib/others/gtdf.js";

/**
 * Header component for the website
 */
export default class Header extends UIComponent {
  private static readonly ID = "header";

  public constructor(tags: Set<string>) {
    super({
      type: HTML.DIV,
      id: Header.ID,
      classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_X_START, Gtdf.BOX_Y_CENTER],
    });
    this.configure(tags);
  }

  public async configure(tags: Set<string>): Promise<void> {
    const profilePicture = new UIComponent({
      type: HTML.IMG,
      id: "logo",
      attributes: {
        src: `${Config.Path.images}logo.jpg`,
      },
    });

    const title = new UIComponent({
      type: HTML.H1,
      text: "Skylerie",
      id: "title",
      classes: [Gtdf.TEXT_CENTER],
    });

    const selected = tags.values().next().value;
    const tagMenu = new TagMenu(tags, selected);

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

  public constructor(tags: Set<string>, selectedTag?: string) {
    super({
      type: HTML.DIV,
      id: TagMenu.ID,
      classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_X_START, Gtdf.BOX_Y_START],
    });
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
      type: HTML.BUTTON,
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
  }
}
