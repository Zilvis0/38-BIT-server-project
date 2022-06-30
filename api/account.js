import { file } from "../lib/file.js";
import { IsValid } from "../lib/is-valid/IsValid.js";
import { utils } from "../lib/utils.js";

const handler = {};

handler.account = async (data, callback) => {
    // kliento intensija - ka jis nori daryti?
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        const httpMethodFunc = handler._innerMethods[data.httpMethod];
        return await httpMethodFunc(data, callback);
    }

    return callback(405, {
        msg: 'Tavo norimas HTTPmethod yra nepalaikomas',
    });
}

handler._innerMethods = {};

// POST - sukuriame paskyra
handler._innerMethods.post = async (data, callback) => {
    const { payload } = data;

    /*
    1) patikrinti, ar teisinga info (payload):
        - email
        - pass
        - fullname
        - isitikinti, jog atejusiame objekte nera kitu key's apart: email, fullname ir password
    */

    const [validErr, validMsg] = utils.objectValidator(payload, {
        required: ['fullname', 'email', 'pass'],
    });

    if (validErr) {
        return callback(400, {
            msg: validMsg,
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

    // accounts/${user-email}.json
    const [readErr] = await file.read('accounts', email + '.json');
    if (!readErr) {
        return callback(400, {
            msg: 'Paskyra jau egzistuoja',
        })
    }

    /*
    3) issaugoti duomenis (payload)
        - jei pavyko - paskyra sukurta
            - siunciam patvirtinimo laiska
        - jei nepavyko - error
    */

    delete payload.pass;
    payload.hashedPassword = utils.hash(pass)[1];

    const [createErr] = await file.create('accounts', email + '.json', payload);
    if (createErr) {
        return callback(500, {
            msg: 'Nepavyko sukurti paskyrtos del vidines serverio klaidos. Pabandykite veliau',
        })
    }

    return callback(200, {
        msg: 'Paskyra sukurta sekmingai',
    });
}

// GET
handler._innerMethods.get = async (data, callback) => {

    // 1) suzinoti apie kuri vartotoja norima gauti duomenis
    const email = data.searchParams.get('email');

    // 2) Patikriname ar gautas email yra email formato
    const [emailErr, emailMsg] = IsValid.email(email);
    if (emailErr) {
        return callback(400, {
            msg: emailMsg,
        });
    }

    // 3) Bandom perskaityti vartotojo duomenis
    // - jei ERROR - vartotojas neegzistuoja
    // - jei OK - vartotojas egzistuoja ir gavom jo duomenis
    const [readErr, readMsg] = await file.read('accounts', email + '.json');
    if (readErr) {
        return callback(404, {
            msg: 'Toks vartotojas neegzistouja, arba nepavyko gauti duomenu del teisiu trukumo',
        });
    }

    const [userErr, userData] = utils.parseJSONtoObject(readMsg);
    if (userErr) {
        return callback(500, {
            msg: 'Nepavyko nuskaityti duomenu',
        });
    }

    delete userData.hashedPassword;

    return callback(200, {
        msg: userData,
    });
}

// PUT (kapitalinis info pakeistimas)
// PATCH (vienos info dalies pakeitimas)
// Leidziam pasikeisti tik: fullname, pass -> hashedPassword
handler._innerMethods.put = async (data, callback) => {
    const { payload } = data;
    const email = data.searchParams.get('email');

    const [emailErr, emailMsg] = IsValid.email(email);
    if (emailErr) {
        return callback(400, {
            msg: emailMsg,
        });
    }

    const [validErr, validMsg] = utils.objectValidator(payload, {
        optional: ['fullname', 'pass'],
    });

    if (validErr) {
        return callback(400, {
            msg: validMsg,
        });
    }

    // cia kazkur klaida: start
    const { fullname, pass } = payload;

    console.log(fullname, pass);

    if (fullname) {
        const [fullnameErr, fullnameMsg] = IsValid.fullname(fullname);
        if (fullnameErr) {
            return callback(400, {
                msg: fullnameMsg,
            });
        }
    }

    if (pass) {
        const [passErr, passMsg] = IsValid.password(pass);
        if (passErr) {
            return callback(400, {
                msg: passMsg,
            });
        }
    }
    // cia kazkur klaida: end

    const [readErr, readMsg] = await file.read('accounts', email + '.json');
    if (readErr) {
        return callback(404, {
            msg: 'Toks vartotojas neegzistouja, arba nepavyko gauti duomenu del teisiu trukumo',
        });
    }

    const [parseErr, userData] = utils.parseJSONtoObject(readMsg);
    if (parseErr) {
        return callback(500, {
            msg: 'Nepavyko atnaujinti paskyros informacijos, del vidines serverio klaidos',
        });
    }

    userData.fullname = fullname;
    userData.pass = pass;

    const [updateErr] = await file.update('accounts', email + '.json', userData);

    if (updateErr) {
        return callback(500, {
            msg: 'Nepavyko atnaujinti paskyros informacijos, del vidines serverio klaidos',
        });
    }

    return callback(200, {
        msg: 'Vartotojo informacija sekmingai atnaujinta',
    });
}

// DELETE
handler._innerMethods.delete = (data, callback) => {
    return callback(200, {
        msg: 'Account: delete',
    });
}

export default handler;