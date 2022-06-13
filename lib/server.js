import http from 'http';
import { utils } from './utils.js';
import { file } from './file.js';
import config from '../config.js';

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

    const MIMES = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        svg: 'image/svg+xml',
        png: 'image/png',
        jpg: 'image/jpeg',
        ico: 'image/x-icon',
        woff2: 'font/woff2',
        woff: 'font/woff',
        ttf: 'font/ttf',
        otf: 'font/otf',
        eot: 'application/vnd.ms-fontobject',
        webmanifest: 'application/manifest+json',
        pdf: 'application/pdf',
        json: 'application/json',
    };

    const cacheHour = (60 * 60);
    const cacheTimes = {
        css: cacheHour,
        js: cacheHour,
        svg: cacheHour,
        png: cacheHour * 6,
        jpg: cacheHour * 24,
        ico: cacheHour * 24,
        woff2: cacheHour * 24,
        woff: cacheHour * 24,
        ttf: cacheHour * 24,
        otf: cacheHour * 24,
        eot: cacheHour * 24,
        webmanifest: cacheHour * 24,
        pdf: cacheHour * 24,
        json: cacheHour * 24,
    };

    if (isTextFile) {
        const fileContent = await file.readPublic(trimmedPath);
        res.writeHead(200, {
            'Content-Type': MIMES[fileExtension],
            "Cache-Control": `max-age = ${cacheTimes[fileExtension] ?? cacheHour}`,
        })
        res.end(fileContent);
        return;
    }

    if (isBinaryFile) {
        const fileContent = await file.readPublicBinary(trimmedPath);
        res.writeHead(200, {
            'Content-Type': MIMES[fileExtension],
            "Cache-Control": `max-age = ${cacheTimes[fileExtension] ?? cacheHour}`,
        })
        res.end(fileContent);
        return;
    }

    if (isAPI) {
        res.writeHead(503, {
            'Content-Type': MIMES.json,
            "Cache-Control": `max-age = ${cacheTimes[fileExtension] ?? cacheHour}`,
        })
        res.end('STAI TAU API ATSAKYMAS...');
        return;
    }

    if (isPage) {
        res.writeHead(200, {
                "Content-Type": MIMES.html,
            })
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
                    <img src="https://raw.githubusercontent.com/front-end-by-rimantas/39-grupe-ufo/master/ufo.png" alt="UFO">
                    <script src="/js/pages/home.js" defer></script>
                </body>
                </html>`);
        return;
    }
});

server.init = () => {
    server.httpServer.listen(config.httpPort, () => {
        console.log(`Sveikiname, tavo serveris sukasi ant http://localhost:${config.httpPort}`);
    });
}

export { server };