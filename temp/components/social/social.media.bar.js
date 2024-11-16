import { BubbleUI } from "../../lib/bubble/bubble.js";
import { Html } from "../../lib/gtdf/component/dom.js";
import { UIComponent } from "../../lib/gtdf/component/ui.component.js";
import { SocialIcons } from "../../lib/social/SocialIcons";
/**
 * SocialMediaBar is a UIComponent that displays a bar of social media icons.
 */
export default class SocialMediaBar extends UIComponent {
    constructor() {
        super({
            type: Html.Div,
            classes: ["social-media-bar", BubbleUI.BoxRow, BubbleUI.BoxCenter],
        });
        this.configure();
    }
    /**
     * Configures the social media bar by adding social media buttons.
     */
    configure() {
        const socialMedia = {
            twitter: "https://twitter.com/Skyleriearts",
            instagram: "https://www.instagram.com/skyleriie/",
            telegram: "https://t.me/skylerie",
            patreon: "https://www.patreon.com/skylerie",
        };
        for (const media in socialMedia) {
            const url = socialMedia[media];
            const button = new SocialMediaButton({
                icon: media,
                url: url,
            });
            button.appendTo(this);
        }
    }
}
/**
 * SocialMediaButton is a UIComponent that displays a social media icon as a button.
 */
class SocialMediaButton extends UIComponent {
    constructor(properties) {
        super({
            type: Html.A,
            classes: [BubbleUI.BoxCenter],
            attributes: {
                href: properties.url,
            },
        });
        this.configure(properties);
    }
    /**
     * Configures the social media button by adding an icon.
     * @param properties The properties of the social media button.
     */
    configure(properties) {
        const iconComponent = SocialIcons.get(properties.icon, {
            fill: "#444",
            size: "2rem",
            classes: ["material-icons"],
        });
        iconComponent.appendTo(this);
    }
}
