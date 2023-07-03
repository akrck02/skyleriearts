import { Config } from "../../config/Config.js";
import { getMaterialIcon } from "../../lib/gtd/material/materialicons.js";
import { UIComponent, setClasses, setEvents } from "../../lib/gtd/web/uicomponent.js";
export class Navbar extends UIComponent {
    constructor() {
        super({
            type: "div",
            classes: ["box-column", "box-center"],
            id: Navbar.ID,
        });
        this.buttons = [];
        const logo = new UIComponent({
            type: "img",
            id: "logo",
            attributes: {
                src: Config.PATHS.ICONS + "logo.svg",
                alt: "GTD Framework logo"
            },
        });
        const title = new UIComponent({
            type: "h1",
            text: "Skylerie",
        });
        const buttonBar = this.createNavbar();
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
    createNavbar() {
        const buttonBar = new UIComponent({
            type: "div",
            id: "button-bar",
            classes: ["box-row", "box-center"],
        });
        const galleryButton = new UIComponent({
            type: "a",
            id: "gallery",
            classes: [Navbar.BUTTON_CLASS],
            attributes: {
                href: Config.VIEWS.GALLERY,
            }
        });
        const galleryLabel = new UIComponent({
            type: "span",
            text: "Gallery",
        });
        const galleryIcon = getMaterialIcon("gallery_thumbnail", {
            size: "24",
            fill: "white",
        });
        galleryLabel.appendTo(galleryButton);
        galleryIcon.appendTo(galleryButton);
        setEvents(galleryButton.element, {
            click: () => {
                this.select("gallery");
            }
        });
        const aboutButton = new UIComponent({
            type: "a",
            id: "about",
            classes: [Navbar.BUTTON_CLASS],
            attributes: {
                href: Config.VIEWS.ABOUT,
            }
        });
        const aboutLabel = new UIComponent({
            type: "span",
            text: "About me",
        });
        const aboutIcon = getMaterialIcon("badge", {
            size: "24",
            fill: "white",
        });
        aboutLabel.appendTo(aboutButton);
        aboutIcon.appendTo(aboutButton);
        setEvents(aboutButton.element, {
            click: () => {
                this.select("about");
            }
        });
        const contactButton = new UIComponent({
            type: "a",
            id: "contact",
            classes: [Navbar.BUTTON_CLASS],
            attributes: {
                href: Config.VIEWS.CONTACT,
            }
        });
        const contactLabel = new UIComponent({
            type: "span",
            text: "Contact",
        });
        const contactIcon = getMaterialIcon("alternate_email", {
            size: "24",
            fill: "white",
        });
        contactLabel.appendTo(contactButton);
        contactIcon.appendTo(contactButton);
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
        return buttonBar;
    }
    select(name) {
        this.buttons.forEach((button) => {
            if (button.element.id === name) {
                setClasses(button.element, [Navbar.BUTTON_CLASS, "selected"]);
                return;
            }
            button.element.classList.remove("selected");
        });
    }
}
Navbar.ID = "navbar";
Navbar.BUTTON_CLASS = "nav-button";
