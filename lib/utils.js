const utils = {};

utils.fileExtension = (URL) => {
    // services -> undefined
    // services/design -> undefined
    // css/main.css -> css
    return URL.split('.')[1];
}

export { utils };