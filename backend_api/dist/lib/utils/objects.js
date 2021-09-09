"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePropertiesFromCurrentObject = void 0;
const removePropertiesFromCurrentObject = (object, ...removeKeys) => {
    return Object
        .entries(object)
        .reduce((accum, [key, value]) => (Object.assign(Object.assign({}, accum), (!removeKeys.includes(key) && { [key]: value }))), {});
};
exports.removePropertiesFromCurrentObject = removePropertiesFromCurrentObject;
