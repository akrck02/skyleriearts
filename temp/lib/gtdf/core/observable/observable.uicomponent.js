import { UIComponent } from "../../component/ui.component.js";
/**
 * This class represents an UI component that observes an observable object
 * and updates when the observable object changes
 * @extends UIComponent the UI component class
 * @implements IObserver the observer interface
 */
export class ObservableUIComponent extends UIComponent {
    /**
     * @inheritdoc
     */
    constructor(properties) {
        super(properties);
        this.observable = properties.observable;
        this.observable.subscribe(this);
    }
    /**
     * The update method of the observer UI component
     * MUST be implemented by the child
     */
    async update() {
        console.warn("ObservableUIComponent.update() not implemented.");
    }
}
