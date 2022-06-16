import http from 'http';
import { utils } from './utils.js';
import { file } from './file.js';
import config from '../config.js';

import { PageHome } from '../pages/Home.js';
import { Page404 } from '../pages/404.js';
import { PageRegister } from '../pages/Register.js';
import { PageLogin } from '../pages/Login.js';
import { PageAccount } from '../pages/Account.js';
import { PageLogout } from '../pages/Logout.js';

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

    const maxAge = config.cache.periods[fileExtension] ?? config.cache.default;
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

    let responseContent = '';

    const dataForHandlers = {
        baseURL,
        trimmedPath,
        httpMethod,
        user: {
            isLoggedIn: true,
            email: '',
            browser: '',
        }
    }

    if (isTextFile) {
        responseContent = await file.readPublic(trimmedPath);
        if (responseContent === false) {
            res.writeHead(404);
        } else {
            res.writeHead(200, {
                'Content-Type': MIMES[fileExtension] || MIMES.html,
                'Cache-Control': `max-age=${maxAge}`,
            })
        }
    }

    if (isBinaryFile) {
        responseContent = await file.readPublicBinary(trimmedPath);
        if (responseContent === false) {
            res.writeHead(404);
        } else {
            res.writeHead(200, {
                'Content-Type': MIMES[fileExtension] || MIMES.html,
                'Cache-Control': `max-age=${maxAge}`,
            })
        }
    }

    if (isAPI) {
        res.writeHead(503, {
            'Content-Type': MIMES.json,
        })
        responseContent = 'STAI TAU API ATSAKYMAS...';
    }

    if (isPage) {
        res.writeHead(200, {
            'Content-Type': MIMES.html,
        })

        let pageClass = server.routes[404];
        if (trimmedPath in server.routes) {
            pageClass = server.routes[trimmedPath];
        }
        const pageObj = new pageClass(dataForHandlers);
        responseContent = pageObj.render();
    }

    return res.end(responseContent);
});

server.routes = {
    '': PageHome,
    '404': Page404,
    'register': PageRegister,
    'login': PageLogin,
    'account': PageAccount,
    'logout': PageLogout,
}

server.init = () => {
    server.httpServer.listen(config.httpPort, () => {
        console.log(`Sveikiname, tavo serveris sukasi ant http://localhost:${config.httpPort}`);
    });
}

export { server };