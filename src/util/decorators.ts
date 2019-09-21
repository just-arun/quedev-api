import { request } from "http";

function Emoji() {
    return function(target: Object, key: string | number) {
        
        let val = target[key];

        const getter = () => {
            return val;
        };

        const setter = (next) => {
            console.log('Updating flavor...');
            val = `(: ${next} :)`;
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });

    };
}

class IseChit {

    @Emoji()
    color = "shit";
    shit() {
        console.log(this.color);
    }
    
}
