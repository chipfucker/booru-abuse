import type { XMLNode, XMLObject } from "../types/xml.ts";

export let xmlToObject = (xml: XMLNode) => {
    return convert(xml);

    function convert(node: XMLNode) {
        const object: XMLObject = {
            attr: {},
            children: []
        };
    
        Array.from(node.attributes).forEach(attr =>
            object.attr[attr.name] = attr.value
        );
        Array.from(node.children).forEach(child =>
            object.children.push(convert(child))
        );
    
        return object;
    }
}
