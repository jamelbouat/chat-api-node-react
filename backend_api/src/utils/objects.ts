import { IObject } from '../lib/interfaces/object';

export const removePropertiesFromCurrentObject = (object: IObject, ...removeKeys: Array<string>): IObject => {
    return Object
        .entries(object)
        .reduce((accum, [key, value]) => (
            { ...accum, ...(!removeKeys.includes(key) && { [key]: value }) }
        ), {});
};
