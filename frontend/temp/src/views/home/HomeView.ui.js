import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { Navbar } from "../../components/navbar/navbar.js";
import { GalleryView } from "../gallery/GalleryView.ui.js";
import { AboutMeView } from "../about/AboutView.js";
import { ContactsView } from "../contacts/ContactsView.ui.js";
export default class HomeView extends ViewUI {
    constructor() {
        super({
            type: "view",
            id: HomeView.ID,
            classes: ["box-column", "box-y-center"],
            styles: {
                height: "100%",
                width: "100%",
                overflow: "auto",
            }
        });
    }
    async show(params, container) {
        console.log(params);
        const navmenu = new Navbar();
        navmenu.appendTo(this);
        const navmenuMobile = new Navbar();
        navmenuMobile.appendTo(this);
        navmenuMobile.drawCompact();
        let lastY = 0;
        let colapsed = false;
        document.addEventListener("scroll", (event) => {
            //capture the scroll event
            const scroll = document.documentElement.scrollTop;
            console.log("Y: ", scroll);
            console.log("lastY: ", lastY);
            if (scroll == lastY) {
                return;
            }
            if (colapsed && scroll > 600) {
                return;
            }
            if (!colapsed && scroll < 600) {
                return;
            }
            if (scroll > 600) {
                navmenuMobile.element.classList.remove("hide");
                setTimeout(() => {
                    navmenuMobile.element.classList.add("show");
                }, 1);
                colapsed = true;
                return;
            }
            navmenuMobile.element.classList.remove("show");
            navmenuMobile.element.classList.add("hide");
            colapsed = false;
        });
        switch (params[0]) {
            case "about":
                const about = new AboutMeView();
                navmenu.select("about");
                navmenuMobile.select("about");
                await about.show(params.splice(1), this);
                break;
            case "contact":
                const contact = new ContactsView();
                navmenu.select("contact");
                navmenuMobile.select("contact");
                await contact.show(params.splice(1), this);
                break;
            default:
                const gallery = new GalleryView();
                navmenu.select("gallery");
                navmenuMobile.select("gallery");
                await gallery.show(params.splice(1), this);
                break;
        }
        this.appendTo(container);
    }
}
HomeView.ID = "home";
