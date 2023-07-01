import { Config } from "../../config/Config.js";
import { UIComponent, setClasses, setEvents, setStyles } from "../../lib/gtd/web/uicomponent.js";

export class Navbar extends UIComponent {

    private static ID = "navbar";
    private static BUTTON_CLASS = "nav-button";
    private buttons : UIComponent[] = [];

    constructor(){
        super({
            type: "div",
            classes: ["box-column", "box-center"],
            id : Navbar.ID,
        });

        const logo = new UIComponent({
            type : "img",
            id: "logo",
            attributes : {
                src: Config.PATHS.ICONS + "logo.svg",
                alt: "GTD Framework logo"
            },
        })

        const title = new UIComponent({
            type: "h1",
            text: "Skylerie",
        });

        const buttonBar = new UIComponent({
            type: "div",
            id : "button-bar",
            classes: ["box-row", "box-center"],
        });

        const galleryButton = new UIComponent({
            type: "a",
            text: "Gallery",
            id: "gallery",
            classes : [Navbar.BUTTON_CLASS],
            attributes: {
                href: Config.VIEWS.GALLERY,
            }
        });

        setEvents(galleryButton.element, {
            click: () => {
                this.select("gallery");
            }
        });
        
        const aboutButton = new UIComponent({
            type: "a",
            text: "About me",
            id: "about",
            classes : [Navbar.BUTTON_CLASS],
            attributes: {
                href: Config.VIEWS.ABOUT,
            }
        });

        setEvents(aboutButton.element, {
            click: () => {
                this.select("about");
            }
        });

        const contactButton = new UIComponent({
            type: "a",
            text: "Contact",
            id: "contact",
            classes : [Navbar.BUTTON_CLASS],
            attributes: {
                href: Config.VIEWS.CONTACT,
            }
        });


        setEvents(contactButton.element, {
            click: () => {
                this.select("contact");
            }
        });



        this.buttons.push(galleryButton);
        this.buttons.push(aboutButton);
        this.buttons.push(contactButton);

        galleryButton.appendTo(buttonBar);
        aboutButton.appendTo(buttonBar);
        contactButton.appendTo(buttonBar);

        logo.appendTo(this);
        title.appendTo(this);
        buttonBar.appendTo(this);

    }

    draw() {

        this.element.classList.remove("box-row");
        this.element.classList.remove("box-center");

        setClasses(this.element, [
            "box-column", 
            "box-center"            
        ]); 
    }


    drawCompact() {

        this.element.classList.remove("box-column");
        this.element.classList.remove("box-center");

        setClasses(this.element, [
            "box-row", 
            "box-center",
            "compact"            
        ]); 
    }

    select(name : string) {
        this.buttons.forEach((button) => {

            if(button.element.id === name) {
                setClasses(button.element, [Navbar.BUTTON_CLASS, "selected"]);
                return;
            } 
            
            button.element.classList.remove("selected");
        });
    }

}