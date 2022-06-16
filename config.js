const config = {};

config.dev = {
    name: 'dev',
    httpPort: 6969,
    passwordLength: 2,
    defaultLanguage: 'en',
    languages: ['en', 'lt', 'ee'],
    db: {
        user: 'root',
        password: 'admin',
        database: 'batai',
    },
    cache: {
        default: 0,
        periods: {},
    }
}

config.prod = {
    name: 'prod',
    httpPort: 42069,
    passwordLength: 12,
    defaultLanguage: 'lt',
    languages: ['en', 'lt'],
    db: {
        user: 'node_batai_user',
        password: 'r84tr5s25e84rrg52f5er84r5ert8r4g55e',
        database: 'batai-r5fe1d15',
    },
    cache: {
        default: 60 * 60,
        periods: {
            css: 60 * 60,
            js: 60 * 60,
            svg: 60 * 60,
            png: 60 * 60,
            jpg: 60 * 60,
            ico: 60 * 60,
            woff2: 60 * 60,
            woff: 60 * 60,
            ttf: 60 * 60,
            otf: 60 * 60,
            eot: 60 * 60,
            webmanifest: 60 * 60,
            pdf: 60 * 60,
            json: 60 * 60,
        },
    }
}

const nodeEnv = process.env.NODE_ENV;
const env = nodeEnv ? nodeEnv : 'dev';
const options = config[env] ? config[env] : config.dev;

// console.log('kur dirba kodas?');
// console.log('Ka parasiau terminale:', nodeEnv);
// console.log('Kokia aplinka turesiu paleisti:', env);

export default options;