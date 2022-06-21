class IsValid {
    static fullname(str) {
        if (str === undefined) {
            return [true, 'Neduotas parametras'];
        }
        if (typeof str !== 'string') {
            return [true, 'Netinkamas tipas, turi buti "string"'];
        }

        str = str.trim().replace(/\s+/g, ' ');
        // str = str.trim().replaceAll('  ', ' '); // nes neveikia su daugiau nei vienu tarpu :(

        const minWordsCount = 2;
        const minWordLength = 2;
        const minTextLength = minWordsCount * minWordLength + (minWordsCount - 1);
        if (str.length < minTextLength) {
            return [true, `Per trumpas tekstas, turi buti minimum ${minTextLength} simboliai`];
        }

        const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const words = str.split(' ');
        if (words.length < minWordsCount) {
            return [true, `Tekstas turi tureti ${minWordsCount} arba daigiau zodziu`];
        }
        for (const word of words) {
            if (word.length < minWordLength) {
                return [true, `Visos vardo dalys turi buti minimum ${minWordLength} simboliu`];
            }

            // pirma raide
            if (word[0].toUpperCase() !== word[0]) {
                return [true, `Pirma zodzio raide turi buti didzioji`];
            }

            // kitos raides
            const otherLetters = word.slice(1);
            if (otherLetters.toLowerCase() !== otherLetters) {
                return [true, `Ne pirma zodzio raide turi buti mazoji`];
            }

            // ar tik leistinos raides
            for (const s of word) {
                if (!allowedSymbols.includes(s)) {
                    return [true, `Neleistinas simbolis "${s}"`];
                }
            }
        }

        return [false, 'OK'];
    }

    static email(str) {
        if (str === undefined) {
            return [true, 'Neduotas parametras'];
        }
        if (typeof str !== 'string') {
            return [true, 'Netinkamas tipas, turi buti "string"'];
        }

        str = str.trim();

        const necessarySimbol = "@";

        const minEmailSymbols = 6;
        if (str.length < minEmailSymbols) {
            return [true, 'Per trumpas email, turi buti ne maziau 6 simboliu'];
        }
        
        if(!str.includes(necessarySimbol)){
            return [true, `Neturi butino ${necessarySimbol} zenklo`]
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