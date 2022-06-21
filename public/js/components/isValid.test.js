import { IsValid } from "./IsValid.js";

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

    test('string', () => {
        const [err, msg] = IsValid.fullname('');
        expect(err).toBe(false);
        expect(msg).toBe('OK');
    })
})