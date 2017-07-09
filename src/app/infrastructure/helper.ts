
export const deepExtend = function (...objects: Array<any>) {
    if (typeof arguments[0] !== 'object' || arguments.length < 1) {
        return false;
    }
    if (arguments.length === 1) {
        return arguments[0];
    }
    var target = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);

    var src: any, val: any, clone: any;

    args.forEach(function (arg: any) {
        if (typeof arg !== 'object' || Array.isArray(arg)) {
            return false;
        }
        Object.keys(arg).forEach(function (key: any) {
            src = target[key];
            val = arg[key];
            //if val===target, val[key]===target, no need to extend
            if (val === target || val === src) {
                return;
            } else if (typeof val !== 'object' || val == null) {
                target[key] = val;
                return;
            } else if (Array.isArray(val)) {
                target[key] = deepCloneArray(val);
                return;
            } else if (isSpecificValue(val)) {
                target[key] = cloneSpecificValue(val);
                return;
            } else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                target[key] = deepExtend({}, val);
                return;
            } else {
                target[key] = deepExtend(src, val);
            }
        })

    })

    return target;
}
function deepCloneArray(arr: Array<any>): Array<any> {
    var clone: Array<any> = [];
    arr.forEach(function (item, index) {
        if (typeof item === 'object' && item !== null) {
            if (Array.isArray(item)) {
                clone[index] = deepCloneArray(item);
            } else if (isSpecificValue(item)) {
                clone[index] = cloneSpecificValue(item);
            } else {
                clone[index] = deepExtend({}, item);
            }
        } else {
            clone[index] = item;
        }

    })
    return clone;
}
function cloneSpecificValue(val: any): any {

    if (val instanceof Date) {
        return new Date(val.getTime());

    } else if (val instanceof RegExp) {
        return new RegExp(val);

    } else {
        throw Error("unexpected situation")
    }

}
function isSpecificValue(val: any): any {
    return (
        val instanceof RegExp ||
        val instanceof Date
    ) ? true : false;
}
export function getDeepFromObject(object: Object = {}, name: string, defaultValue?: any): any {
    let keys = name.split('.');
    let obj = deepExtend({}, object);

    keys.forEach((k) => {
        if (obj && obj[k] !== undefined) {
            obj = obj[k];
        }else{
            obj=undefined;
        }

    })

    return obj === undefined ? defaultValue : obj;

}
export class Deferred {
    promise: Promise<any>;
    resolve: any;   
    reject: any;
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        })
    }
}
console.log( getDeepFromObject({result:{data:2}},'result.dat'))