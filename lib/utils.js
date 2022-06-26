const utils = {};

utils.fileExtension = (URL) => {
    // services -> undefined
    // services/design -> undefined
    // css/main.css -> css
    return URL.split('.')[1];
}

utils.parseJSONtoObject = (str) => {
    try {
        return [false, JSON.parse(str)];
    } catch (error) {
        return [true, 'ERROR'];
    }
}

export { utils };