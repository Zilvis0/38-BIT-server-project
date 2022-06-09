import http from 'http';
import { utils } from './utils.js';
import { file } from './file.js';

const server = {};

server.httpServer = http.createServer(async (req, res) => {
    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}/`;
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method;
    const parsedPathName = parsedURL.pathname;
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');   // regex

    /*
    Tekstiniai failai:
        - css
        - js
        - svg
    Binary failai:
        - jpg, png, gif, ico (nuotraukos)
        - woff, eot, ttf (sriftai)
        - audio, video
    API (formos, upload file, t.t.)
    HTML turinys (puslapis)
    */

    const fileExtension = utils.fileExtension(trimmedPath);
    const textFileExtensions = ['css', 'js', 'svg', 'webmanifest', 'txt'];
    const binaryFileExtensions = ['jpg', 'png', 'ico'];
    const isTextFile = textFileExtensions.includes(fileExtension);
    const isBinaryFile = binaryFileExtensions.includes(fileExtension);
    const isAPI = trimmedPath.indexOf('api/') === 0;
    const isPage = !isTextFile && !isBinaryFile && !isAPI;

    if (isTextFile) {
        const fileContent = await file.readPublic(trimmedPath);
        res.end(fileContent);
        return;
    }

    if (isBinaryFile) {
        const fileContent = await file.readPublicBinary(trimmedPath);
        res.end(fileContent);
        return;
    }

    if (isAPI) {
        res.end('STAI TAU API ATSAKYMAS...');
        return;
    }

    if (isPage) {
        res.end(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Server</title>
                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
                    <link rel="manifest" href="/favicon/site.webmanifest">
                    <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
                    <meta name="msapplication-TileColor" content="#da532c">
                    <meta name="theme-color" content="#ffffff">
                    <link rel="stylesheet" href="/css/base/base.css">
                </head>
                <body>
                    <h1>Labas rytas 🎅</h1>
                    <img src="/img/logo.png" alt="Logo">
                    <script src="/js/pages/home.js" defer></script>
                </body>
                </html>`);
        return;
    }
});

server.init = () => {
    const httpPort = 6969
    server.httpServer.listen(httpPort);
}

export { server };