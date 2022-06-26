import { IsValid } from "../lib/is-valid/IsValid.js";

const handler = {};

handler.account = (data, res) => {
    // kliento intensija - ka jis nori daryti?
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        const httpMethodFunc = handler._innerMethods[data.httpMethod];
        return httpMethodFunc(data, res);
    }

    return res.end(JSON.stringify('Tavo norimas HTTPmethod yra nepalaikomas'));
}

handler._innerMethods = {};

// GET
handler._innerMethods.get = (data, res) => {
    return res.end(JSON.stringify('Account: get'));
}

// POST - sukuriame paskyra
handler._innerMethods.post = (data, res) => {
    const { payload } = data;

    /*
    1) patikrinti, ar teisinga info (payload):
        - email
        - pass
        - fullname
        - isitikinti, jog atejusiame objekte nera kitu key's apart: email, fullname ir password
    */

    const allowedKeys = ['fullname', 'email', 'pass'];
    if (Object.keys(payload).length > allowedKeys.length) {
        return res.end(JSON.stringify('Atsiustuose duomenyse gali buti tik: fullname, email ir pass'));
    }

    const { fullname, email, pass } = payload;

    const [fullnameErr, fullnameMsg] = IsValid.fullname(fullname);
    if (fullnameErr) {
        return res.end(JSON.stringify(fullnameMsg));
    }

    const [emailErr, emailMsg] = IsValid.email(email);
    if (emailErr) {
        return res.end(JSON.stringify(emailMsg));
    }

    const [passErr, passMsg] = IsValid.password(pass);
    if (passErr) {
        return res.end(JSON.stringify(passMsg));
    }

    /*
    2) ar toks vartotojas jau egzistuoja
        - jei taip - error
        - jei ne - tęsiam
    */



    /*
    3) issaugoti duomenis (payload)
        - jei pavyko - paskyra sukurta
            - siunciam patvirtinimo laiska
        - jei nepavyko - error
    */

    console.log(payload);

    return res.end(JSON.stringify('Paskyra sukurta sekmingai'));
}

// PUT (kapitalinis info pakeistimas) / PATCH (vienos info dalies pakeitimas)
handler._innerMethods.put = (data, res) => {
    return res.end(JSON.stringify('Account: put'));
}

// DELETE
handler._innerMethods.delete = (data, res) => {
    return res.end(JSON.stringify('Account: delete'));
}

export default handler;