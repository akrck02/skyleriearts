import { Config } from "../../config/Config.js";
import { UIComponent, setEvents } from "../../lib/gtd/web/uicomponent.js";
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
                console.log("colapsing");
                navmenu.element.classList.remove("hide");
                navmenu.drawCompact();
                
                setTimeout(() => {
                    navmenu.element.classList.add("show");
                }, 1);
                colapsed = true;
                return;
            } 

            console.log("expanding");
            navmenu.element.classList.remove("show");
            navmenu.element.classList.add("hide");
             

            setTimeout(() => {
                navmenu.draw();
                navmenu.element.classList.remove("compact");
            }, 250);
            
            colapsed = false;

        });

        switch (params[0]) {
            case "about":

                const text = new UIComponent({
                    type: "p",
                    text: "I simp miguel o'hara 🥰🥰🥰",
                    styles: {
                        margin: "1rem 0px",
                    },
                });

                const image = new UIComponent({
                    type: "img",
                    styles: {
                        width: "80%",
                        height: "auto",
                    },
                    attributes: {
                        src: "https://cdnb.artstation.com/p/assets/images/images/063/719/763/large/julie-shuploc-damgaard-x-987f3f5de4b91a5a287db800ce1974f9-2796be24-20481.jpg?1686186677",
                    },
                });

                text.appendTo(this);
                image.appendTo(this);
                break;
            case "gallery":
                const gallery = new GalleryView();
                await gallery.show(params.splice(1), this);
                break;
            case "contact":
                const contact = new UIComponent({
                    type: "p",
                    text: "Contact me at: @skylerieAD",
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