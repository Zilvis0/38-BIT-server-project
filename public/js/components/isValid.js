class IsValid {
    static fullname(str) {
        if (str.length < 2) {
            return [true, 'Per trumpas fullname tekstas'];
        }

        const parts = str.split(' ');
        if (parts.length < 2) {
            return [true, 'Per mazai fullname zodziu'];
        }

        return [false, "ok"];
    }

    static email(str) {
        if (str.length < 2) {
            return [true, 'Per trumpas email tekstas'];
        }
        return [false, "ok"];
    }

    static password(str) {
        if (str.length < 2) {
            return [true, 'Per trumpas password tekstas'];
        }
        return [false, "ok"];
    }
}

export { IsValid }