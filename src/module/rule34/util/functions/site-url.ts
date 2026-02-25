export function comment(post: number, id: number, query?: string): string {
    return `https://rule34.xxx/?page=post&s=view&id=${post}${
        query
            ? "&" + encodeURIComponent(query)
            : ""
    }#c${id}`;
}

export function search(query: string): string {
    return `https://rule34.xxx/?page=post&s=list&tags=${
        encodeURIComponent(query) || "all"
    }`;    
}    

export function tagWiki(id: number): string {
    return `https://rule34.xxx/?page=wiki&s=view&id=${id}`;
}

export function user(name: string): string {
    return `https://rule34.xxx/?page=account&s=profile&uname=${name}`;
}
