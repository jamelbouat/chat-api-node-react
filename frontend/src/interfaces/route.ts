import React from 'react';

interface IRoute {
    path: string;
    name: string;
    exact: boolean;
    component: React.FC;
    props?: any
}

export default IRoute;

