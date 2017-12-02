import * as User from '../models/user';
import { Success, CustomError, ResponseObjectType } from '../helpers/response';
import { isUserLoggedInAsync } from '../helpers/currentUser';

// TODO: Figure out login and logout with client/server side
export class SessionController {
    public async login(req: any, res: any) {
        var loggedIn = await isUserLoggedInAsync(req);
        if (loggedIn) {
            return CustomError(res, 401, "El usuario ya ha iniciado una sesión.");
        }
        if (SessionController.validateRequiredParams(req)) {
            var error: any = null;
            var user = await User.authenticate(req.body.email, req.body.password, (err) => {
                if (err) error = err;
            });
            if (error) {
                return CustomError(res, 400, "El correo o la contraseña son incorrectos");
            }

            req.session.auth_token = user._id;
            return Success(res, ResponseObjectType.Object, "user", {
                _id: user._id,
                name: user.name,                
                email: user.email
            });
        }
        return CustomError(res, 400, "Todos los campos son requeridos");
    }

    public async logout(req: any, res: any) {
        var loggedIn = await isUserLoggedInAsync(req);
        if (!loggedIn) {
            return CustomError(res, 403, "Por favor inicia sesión.");
        }
        if (!!req.session.auth_token) {
            req.session.auth_token = null;
            return Success(res, ResponseObjectType.Object, "message", 'Logout successful');
        }
    }

    private static validateRequiredParams(req: any): boolean {
        return req.body.email && req.body.password
    }
}