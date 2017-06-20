import * as React from 'react';
import { IPage } from './models';
import { toPath } from "./helpers/toPath";
import { IDictionary } from "./models";
import { HelloFromStore } from "../Home/Body/Pages/Hello/Hello";
import { WorldFromStore } from "../Home/Body/Pages/World/World";

function Page(name, component) {
    this.name= name;
    this.path= toPath(this.name);
    this.component= component;
}

export const contentsList: IPage[] = [
    new Page(
        "Hello",
        <HelloFromStore/>
    ),
    new Page(
        "World",
        <WorldFromStore/>
    )
];

export const contents: IDictionary<IPage> = contentsList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
