import { PageHome } from '../pages/Home.js';
import { Page404 } from '../pages/404.js';
import { PageRegister } from '../pages/Register.js';
import { PageLogin } from '../pages/Login.js';
import { PageAccount } from '../pages/Account.js';
import { PageLogout } from '../pages/Logout.js';

const router = {};

router.commonRoutes = {
    '': PageHome,
    '404': Page404,
}

router.publicRoutes = {
    ...router.commonRoutes,
    'register': PageRegister,
    'login': PageLogin,
}

router.privateRoutes = {
    ...router.commonRoutes,
    'account': PageAccount,
    'logout': PageLogout,
}

router.getRoute = (data) => {
    let pageClass = router.commonRoutes[404];
    const routes = data.user.isLoggedIn
        ? router.privateRoutes
        : router.publicRoutes;
    if (data.trimmedPath in routes) {
        pageClass = routes[data.trimmedPath];
    }
    return pageClass;
}

export { router };