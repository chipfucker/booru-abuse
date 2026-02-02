import { DOMParser } from "xmldom";

export let parseXML = (string: string) => new DOMParser().parseFromString(string).documentElement;

export function documentToObject(xml: XMLDocument) {
    return getAttributes(xml);

    function getAttributes(node: XMLNode) {
        const object = {
            _children: []
        };
        Array.from(node.attributes).forEach(attr => 
            object[attr.name] = attr.value
        );
        Array.from(node.children).forEach(child =>
            object._children.push(getAttributes(child))
        );
        return object;
    }
}

export type XMLDocument = ReturnType<typeof parseXML>;
export type XMLNode = XMLDocument["children"][number];

interface XMLAttributes {
    [key: Parameters<XMLNode["getAttribute"]>[0]]: ReturnType<XMLNode["getAttribute"]>
}
export type XMLObject = XMLAttributes & {
    _children: XMLObject[];
}
