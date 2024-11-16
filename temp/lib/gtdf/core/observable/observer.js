/**
 * This class represents an observable object
 * that can be observed by an observer
 * and notify the observer when the content changes
 * @implements IObservable the observable interface
 * @author akrck02
 */
export class Observable {
    constructor(sync = false) {
        this.observers = [];
        this.sync = sync;
        let a = this;
        this.content = {};
        this.content = new Proxy(this.content, {
            set: function (target, key, value) {
                target[key] = value;
                a.notify();
                return true;
            },
        });
    }
    /**
     * @inheritdoc
     */
    async subscribe(observer) {
        this.observers.push(observer);
    }
    /**
     * @inheritdoc
     */
    async unsubscribe(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }
    /**
     * @inheritdoc
     */
    async notify() {
        for (let observer of this.observers) {
            try {
                if (this.sync)
                    await observer.update();
                else
                    observer.update();
            }
            catch (e) {
                console.error("Error notifying observer", e);
            }
        }
    }
}
