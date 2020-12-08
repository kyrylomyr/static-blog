export function updateResourceUrls(text) {
    return text ? text.replace(/\(..\/..\/public/g, "(") : text;
}

export function joinExcerptAndContent(content) {
    return content.replace(/(\r?\n)---(\r?\n)/g, "$1");
}
