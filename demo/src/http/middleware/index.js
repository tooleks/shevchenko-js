import {shareLinksProvider, urlService} from "../../services";

import ErrorHandler from "./ErrorHandler";
import RedirectToHome from "./RedirectToHome";
import Utils from "./Utils";

const errorHandler = new ErrorHandler(urlService);
const redirectToHome = new RedirectToHome(urlService);
const utils = new Utils(urlService, shareLinksProvider);

export {errorHandler, redirectToHome, utils};
