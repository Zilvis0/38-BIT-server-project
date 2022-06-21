class IsValid {
    static fullname(str) {
        if (str === undefined) {
            return [true, 'Neduotas parametras'];
        }
        if (typeof str !== 'string') {
            return [true, 'Netinkamas tipas, turi buti "string"'];
        }
        return [false, 'OK'];
    }

    static email(str) {
        if (str.length < 2) {
            return [true, 'Per trumpas email tekstas'];
        }

        return [false, 'OK'];
    }

    static password(str) {
        if (str.length < 2) {
            return [true, 'Per trumpas password tekstas'];
        }

        return [false, 'OK'];
    }
}

export { IsValid }