import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { Navbar } from "../../components/navbar/navbar.js";
import { GalleryView } from "../gallery/Gallery.ui.js";

export default class HomeView extends ViewUI {

    private static ID = "home";

    public constructor(){
        super({
            type: "view",
            id: HomeView.ID,
            classes: ["box-column","box-center"],
        });
    }

    public async show(params : string[], container : UIComponent): Promise<void> {

        console.log(params);
        const navmenu = new Navbar();
        navmenu.select(params[0]);
        navmenu.appendTo(this);

        const navmenuMobile = new Navbar();
        navmenuMobile.select(params[0]);
        navmenuMobile.appendTo(this);
        navmenuMobile.drawCompact();



        let lastY = 0;
        let colapsed  = false;
        document.addEventListener("scroll", (event) => {

            //capture the scroll event
            const scroll = document.documentElement.scrollTop;

            if(scroll == lastY) {
                return;
            }
            
            if(colapsed && scroll > 600) {
                return;
            }

            if(!colapsed && scroll < 600) {
                return;
            }


            if(scroll > 600) {
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

                const text = new UIComponent({
                    type: "p",
                    text: `Hi! I'm Skylerie, a freelance spanish
                    artist who loves nature and mystical stuff.
                    I have a passion for creating character designs and concepts! I'm fulltime a freelancer artist and ppart from commissions, I'm working an original graphic novel called 'Selenite'.`,
                    styles: {
                        margin: "1rem 0px",
                    },
                });
                
                text.appendTo(this);
                break;
            case "gallery":
                const gallery = new GalleryView();
                await gallery.show(params.splice(1), this);
                break;
            case "contact":
                const contact = new UIComponent({
                    type: "p",
                    text: "Contact me at: @skylerie",
                    styles: {
                        margin: "1rem 0px",
                    },
                });

                contact.appendTo(this);
                break;
            default:
                
                break;
        }

        this.appendTo(container);

    }



}