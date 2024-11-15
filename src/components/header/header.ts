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

  public constructor() {
    super({
      type: HTML.DIV,
      id: Header.ID,
      classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_X_START, Gtdf.BOX_Y_CENTER],
    });
    this.configure();
  }

  public async configure(): Promise<void> {
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

    profilePicture.appendTo(this);
    title.appendTo(this);
  }
}

/**
 * TagMenu is a UIComponent that displays a list of tags as buttons.
 */
class TagMenu extends UIComponent {
  private static readonly ID = "tag-menu";

  public constructor(tags: Set<string>) {
    super({
      type: HTML.DIV,
      id: TagMenu.ID,
      classes: [Gtdf.BOX_ROW, Gtdf.BOX_X_START, Gtdf.BOX_Y_START],
      styles: {
        width: "100%",
        height: "5vh",
        padding: "1rem",
      },
    });
    this.configure(tags);
  }

  public async configure(tags: Set<string>): Promise<void> {
    tags.forEach((tag) => this.addTagButton(tag));
  }

  /**
   * Add a tag button to the tag menu.
   */
  addTagButton(tag: string): void {
    const button = new UIComponent({
      type: HTML.BUTTON,
      text: tag,
      classes: [],
      styles: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        margin: "10px",
      },
    });
    button.appendTo(this);
  }
}
