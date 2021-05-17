
export type IObject = { [name: string]: any };

export const removeProperties = (object: IObject, ...removeKeys: Array<string>): IObject => {
    return Object.entries(object)
        .reduce((accum, [key, value]) => (
            { ...accum, ...(!removeKeys.includes(key) && { [key]: value }) }
        ), {});
};
