import { IsValid } from "../lib/is-valid/IsValid.js";

const handler = {};

handler.account = (data, callback) => {
    // kliento intensija - ka jis nori daryti?
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        const httpMethodFunc = handler._innerMethods[data.httpMethod];
        return httpMethodFunc(data, callback);
    }

    return callback(405, {
        msg: 'Tavo norimas HTTPmethod yra nepalaikomas'
    });
}

handler._innerMethods = {};

// GET
handler._innerMethods.get = (data, callback) => {
    return callback(200, {
        msg: 'Account: get'
    });
}

// POST - sukuriame paskyra
handler._innerMethods.post = (data, callback) => {
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
        return callback(400, {
            msg: 'Atsiustuose duomenyse gali buti tik: fullname, email ir pass',
        });
    }

    const { fullname, email, pass } = payload;

    const [fullnameErr, fullnameMsg] = IsValid.fullname(fullname);
    if (fullnameErr) {
        return callback(400, {
            msg: fullnameMsg,
        });
    }

    const [emailErr, emailMsg] = IsValid.email(email);
    if (emailErr) {
        return callback(400, {
            msg: emailMsg,
        });
    }

    const [passErr, passMsg] = IsValid.password(pass);
    if (passErr) {
        return callback(400, {
            msg: passMsg,
        });
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

    return callback(200, {
        msg: 'Paskyra sukurta sekmingai',
    });
}

// PUT (kapitalinis info pakeistimas) / PATCH (vienos info dalies pakeitimas)
handler._innerMethods.put = (data, callback) => {
    return callback(200, {
        msg: 'Account: put',
    });
}

// DELETE
handler._innerMethods.delete = (data, callback) => {
    return callback(200, {
        msg: 'Account: delete',
    });
}

export default handler;