import { IsValid } from "./IsValid.js";

describe('Fullname', () => {
    describe('Gaudome netinkamus tipus', () => {
        test('no params', () => {
            const [err, msg] = IsValid.fullname();
            expect(err).toBe(true);
            expect(msg).toBe('Neduotas parametras');
        })

        test('number', () => {
            const [err, msg] = IsValid.fullname(1);
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamas tipas, turi buti "string"');
        })

        test('boolean', () => {
            const [err, msg] = IsValid.fullname(true);
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamas tipas, turi buti "string"');
        })

        test('array', () => {
            const [err, msg] = IsValid.fullname([]);
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamas tipas, turi buti "string"');
        })

        test('null', () => {
            const [err, msg] = IsValid.fullname(null);
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamas tipas, turi buti "string"');
        })

        test('object', () => {
            const [err, msg] = IsValid.fullname({});
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamas tipas, turi buti "string"');
        })

        test('function', () => {
            const [err, msg] = IsValid.fullname(() => { });
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamas tipas, turi buti "string"');
        })
    })

    describe('Gauname netinkamas reiksmes', () => {
        test('empty string', () => {
            const [err, msg] = IsValid.fullname('');
            expect(err).toBe(true);
            expect(msg).toBe('Per trumpas tekstas, turi buti minimum 5 simboliai');
        })

        test('single symbol too short', () => {
            const [err, msg] = IsValid.fullname('Petr');
            expect(err).toBe(true);
            expect(msg).toBe('Per trumpas tekstas, turi buti minimum 5 simboliai');
        })

        test('single word', () => {
            const [err, msg] = IsValid.fullname('Petra');
            expect(err).toBe(true);
            expect(msg).toBe('Tekstas turi tureti 2 arba daigiau zodziu');
        })

        test('long single word', () => {
            const [err, msg] = IsValid.fullname('PetrasPetraitis');
            expect(err).toBe(true);
            expect(msg).toBe('Tekstas turi tureti 2 arba daigiau zodziu');
        })

        test('one of words is too short', () => {
            const [err, msg] = IsValid.fullname('Petras P');
            expect(err).toBe(true);
            expect(msg).toBe('Visos vardo dalys turi buti minimum 2 simboliu');
        })

        test('few words is too short', () => {
            const [err, msg] = IsValid.fullname('Petras P A Petraitis');
            expect(err).toBe(true);
            expect(msg).toBe('Visos vardo dalys turi buti minimum 2 simboliu');
        })

        test('not allowed symbol: 🎅', () => {
            const [err, msg] = IsValid.fullname('Santa 🎅🎅🎅 Clause');
            expect(err).toBe(true);
            expect(msg).toBe('Neleistinas simbolis "🎅"');
        })

        test('not allowed symbol: 5', () => {
            const [err, msg] = IsValid.fullname('Santa Area5 Clause');
            expect(err).toBe(true);
            expect(msg).toBe('Neleistinas simbolis "5"');
        })

        test('not allowed symbol: .', () => {
            const [err, msg] = IsValid.fullname('Santa Area. Clause');
            expect(err).toBe(true);
            expect(msg).toBe('Neleistinas simbolis "."');
        })

        test('uppercase letter: end', () => {
            const [err, msg] = IsValid.fullname('Santa MariA');
            expect(err).toBe(true);
            expect(msg).toBe('Ne pirma zodzio raide turi buti mazoji');
        })

        test('uppercase letter: middle', () => {
            const [err, msg] = IsValid.fullname('SanTa Maria');
            expect(err).toBe(true);
            expect(msg).toBe('Ne pirma zodzio raide turi buti mazoji');
        })

        test('uppercase letter: all', () => {
            const [err, msg] = IsValid.fullname('SANTA MARIA');
            expect(err).toBe(true);
            expect(msg).toBe('Ne pirma zodzio raide turi buti mazoji');
        })

        test('lowercase letter: first (1)', () => {
            const [err, msg] = IsValid.fullname('santa Maria');
            expect(err).toBe(true);
            expect(msg).toBe('Pirma zodzio raide turi buti didzioji');
        })

        test('lowercase letter: first (2)', () => {
            const [err, msg] = IsValid.fullname('Santa maria');
            expect(err).toBe(true);
            expect(msg).toBe('Pirma zodzio raide turi buti didzioji');
        })

        test('mixed upper/lower letters (1)', () => {
            const [err, msg] = IsValid.fullname('SanTa marIa');
            expect(err).toBe(true);
            expect(msg).toBe('Ne pirma zodzio raide turi buti mazoji');
        })

        test('mixed upper/lower letters (2)', () => {
            const [err, msg] = IsValid.fullname('sANTA mARIA');
            expect(err).toBe(true);
            expect(msg).toBe('Pirma zodzio raide turi buti didzioji');
        })
    })

    describe('Gauname tinkamas reiksmes, bet su atleistinomis klaidomis', () => {
        test('many spaces in between', () => {
            const [err, msg] = IsValid.fullname('Jonas   Jonaitis');
            expect(err).toBe(false);
            expect(msg).toBe('OK');
        })

        test('many spaces in front', () => {
            const [err, msg] = IsValid.fullname('   Jonas Jonaitis');
            expect(err).toBe(false);
            expect(msg).toBe('OK');
        })

        test('many spaces at the end', () => {
            const [err, msg] = IsValid.fullname('Jonas Jonaitis   ');
            expect(err).toBe(false);
            expect(msg).toBe('OK');
        })
    })

    describe('Gauname tinkamas reiksmes', () => {
        test('two words', () => {
            const [err, msg] = IsValid.fullname('Petras Petraitis');
            expect(err).toBe(false);
            expect(msg).toBe('OK');
        })

        test('three words', () => {
            const [err, msg] = IsValid.fullname('Jon Bon Jovi');
            expect(err).toBe(false);
            expect(msg).toBe('OK');
        })

        test('four words', () => {
            const [err, msg] = IsValid.fullname('Jean Clode Van Damme');
            expect(err).toBe(false);
            expect(msg).toBe('OK');
        })
    })
})

describe('Email', () => {
    describe('Gaudome netinkamus tipus', () => {
        test('no params', () => {
            const [err, msg] = IsValid.email();
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamas tipas, turi buti "string"');
        })

        test('number', () => {
            const [err, msg] = IsValid.email(1);
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamas tipas, turi buti "string"');
        })

        test('boolean', () => {
            const [err, msg] = IsValid.email(true);
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamas tipas, turi buti "string"');
        })

        test('array', () => {
            const [err, msg] = IsValid.email([]);
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamas tipas, turi buti "string"');
        })

        test('null', () => {
            const [err, msg] = IsValid.email(null);
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamas tipas, turi buti "string"');
        })

        test('object', () => {
            const [err, msg] = IsValid.email({});
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamas tipas, turi buti "string"');
        })

        test('function', () => {
            const [err, msg] = IsValid.email(() => { });
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamas tipas, turi buti "string"');
        })
    })

    describe('Gauname netinkamas reiksmes', () => {
        test('empty string value', () => {
            const [error, msg] = IsValid.email('');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('string without @ symbol', () => {
            const [error, msg] = IsValid.email('qwertyuiop');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('string with too many @ symbols', () => {
            const [error, msg] = IsValid.email('qwe@rty@uiop');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('string with too many @ symbols (2)', () => {
            const [error, msg] = IsValid.email('qwe@@uiop');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('email withour locale part', () => {
            const [error, msg] = IsValid.email('@uiop');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('email withour domain part', () => {
            const [error, msg] = IsValid.email('uiop@');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('locale can contain only: letters, numbers and dot', () => {
            const [error, msg] = IsValid.email('asd.123_@asd.lt');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('locale can begin with letters only', () => {
            const [error, msg] = IsValid.email('.asd123@asd.lt');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('locale can begin with letters only (2)', () => {
            const [error, msg] = IsValid.email('123.asd@asd.lt');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('locale can not contain two dots in a row', () => {
            const [error, msg] = IsValid.email('123..asd@asd.lt');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('domain part require dot symbol', () => {
            const [error, msg] = IsValid.email('asd.123@asd');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('domain part can contain only: letters, numbers and dot', () => {
            const [error, msg] = IsValid.email('asd.123@123a_sd.lt');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('domain part cannot begin with dot symbol', () => {
            const [error, msg] = IsValid.email('asd.123@.asd');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('domain part cannot end with dot symbol', () => {
            const [error, msg] = IsValid.email('asd.123@asd.');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('domain part contains invalid TLD', () => {
            const [error, msg] = IsValid.email('asd.123@asd.a');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('domain part contains invalid TLD (2)', () => {
            const [error, msg] = IsValid.email('asd.123@asd.asd.a');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })

        test('domain part cannot have multiple dot symbols in a row', () => {
            const [error, msg] = IsValid.email('asd.123@as..df');
            expect(error).toEqual(true);
            expect(msg.length).toBeGreaterThan(0);
        })
    })

    describe('Gauname tinkamas reiksmes, bet su atleistinomis klaidomis', () => {
        test('many spaces in front', () => {
            const [err, msg] = IsValid.email('  petras@petras.xyz');
            expect(err).toBe(false);
            expect(msg).toBe('OK');
        })

        test('many spaces at the end', () => {
            const [err, msg] = IsValid.email('petras@petras.xyz   ');
            expect(err).toBe(false);
            expect(msg).toBe('OK');
        })
    })

    describe('Gauname tinkamas reiksmes', () => {
        test('correct value', () => {
            const [error, msg] = IsValid.email('name@mail.com');
            expect(error).toEqual(false);
            expect(msg).toBe('OK');
        })

        test('correct value (2)', () => {
            const [error, msg] = IsValid.email('name2@mail.com');
            expect(error).toEqual(false);
            expect(msg).toBe('OK');
        })

        test('correct value (3)', () => {
            const [error, msg] = IsValid.email('name.surname@mail.com');
            expect(error).toEqual(false);
            expect(msg).toBe('OK');
        })

        test('correct value (4)', () => {
            const [error, msg] = IsValid.email('name.surname123@mail.com');
            expect(error).toEqual(false);
            expect(msg).toBe('OK');
        })

        test('correct value (5)', () => {
            const [error, msg] = IsValid.email('name.surname@123mail.com');
            expect(error).toEqual(false);
            expect(msg).toBe('OK');
        })

        test('correct value (6)', () => {
            const [error, msg] = IsValid.email('name.surname@sub.mail.com');
            expect(error).toEqual(false);
            expect(msg).toBe('OK');
        })

        test('correct value (7)', () => {
            const [error, msg] = IsValid.email('name.surname@y.x.co.uk');
            expect(error).toEqual(false);
            expect(msg).toBe('OK');
        })
    })
})

// describe('Password', () => {
//     describe('Gaudome netinkamus tipus', () => {
//         test('no params', () => {
//             const [err, msg] = IsValid.password();
//             expect(err).toBe(true);
//             expect(msg).toBe('Neduotas parametras');
//         })
//     })

//     describe('Gauname netinkamas reiksmes', () => {
//         test('empty string', () => {
//             const [err, msg] = IsValid.password('');
//             expect(err).toBe(true);
//             expect(msg).toBe('Per trumpas tekstas, turi buti minimum 8 simboliai');
//         })
//     })

//     describe('Gauname tinkamas reiksmes', () => {
//         test('ok (1)', () => {
//             const [err, msg] = IsValid.password('qwertyui');
//             expect(err).toBe(false);
//             expect(msg).toBe('OK');
//         })

//         test('ok (2)', () => {
//             const [err, msg] = IsValid.password('AdeD526665');
//             expect(err).toBe(false);
//             expect(msg).toBe('OK');
//         })

//         test('ok (3)', () => {
//             const [err, msg] = IsValid.password('./?<>{}+-');
//             expect(err).toBe(false);
//             expect(msg).toBe('OK');
//         })
//     })
// })