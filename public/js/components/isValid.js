class IsValid {
    static fullname(str) {
        if (str.length < 2) {
            return 'Per trumpas fullname tekstas';
        }

        const parts = str.split(' ');
        if (parts.length < 2) {
            return 'Per mazai fullname zodziu';
        }

        return true;
    }

    static email(str) {
        if (str.length < 2) {
            return 'Per trumpas email tekstas';
        }
        return true;
    }

    static password(str) {
        if (str.length < 2) {
            return 'Per trumpas password tekstas';
        }
        return true;
    }
}

export { IsValid }