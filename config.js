const config = {};

config.dev = {
    name: 'dev',
    passwordLength: 2,
    defaultLanguage: 'en',
    languages: ['en', 'lt', 'ee'],
    db: {
        user: 'root',
        password: 'admin',
        database: 'batai',
    },
}

config.prod = {
    name: 'prod',
    passwordLength: 12,
    defaultLanguage: 'lt',
    languages: ['en', 'lt'],
    db: {
        user: 'node_batai_user',
        password: 'r84tr5s25e84rrg52f5er84r5ert8r4g55e',
        database: 'batai-r5fe1d15',
    },
}

const nodeEnv = process.env.NODE_ENV;
const env = nodeEnv ? nodeEnv : 'dev';
const options = config[env] ? config[env] : config.dev;

// console.log('kur dirba kodas?');
// console.log('Ka parasiau terminale:', nodeEnv);
// console.log('Kokia aplinka turesiu paleisti:', env);

export default options;