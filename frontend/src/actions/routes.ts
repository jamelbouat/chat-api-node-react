import { push } from 'connected-react-router';

import { ROUTES } from '../constants';

interface IReplacement {
    [key: string]: string;
}

const replacerFunction = (pathname: string, replacement: IReplacement) => {
    let newPathName = pathname;
    Object
        .keys(replacement)
        .forEach(key => (
            newPathName = newPathName.replace(key, replacement[key])
        ));
    return newPathName;
};

export const routeChange = (pathname: ROUTES, replacement?: IReplacement) => {
    const newPathname = replacement ? replacerFunction(pathname, replacement) : pathname;

    return push(newPathname);
};
