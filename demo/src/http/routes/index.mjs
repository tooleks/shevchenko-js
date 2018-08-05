import registerHomeRoutes from "./home";
import registerContactMe from "./contactMe";

export default function (app, dc) {
    registerHomeRoutes(app, dc);
    registerContactMe(app, dc);
}
