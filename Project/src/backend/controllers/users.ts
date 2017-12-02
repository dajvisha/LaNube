import * as User from '../models/user';
import { Success, CustomError, ResponseObjectType } from '../helpers/response';
import { isUserLoggedInAsync, getCurrentUserAsync, currentUserIsAdminAsync } from '../helpers/currentUser';
import * as bcrypt from 'bcrypt-nodejs';

export class UserController {
    public async currentUser(req: any, res: any) {
        var loggedIn = await isUserLoggedInAsync(req);
        if (!loggedIn) {
            return CustomError(res, 403, "Por favor inicia sesión");
        }
        var user = await getCurrentUserAsync(req);
        if (!user) {
            return CustomError(res, 500, "No ha iniciado sesión")
        }
        return Success(res, ResponseObjectType.Object, "user", user)
    }

    public async get(req: any, res: any) {
        var loggedIn = await isUserLoggedInAsync(req);
        if (!loggedIn) {
            return CustomError(res, 403, "Por favor inicia sesión");
        }
        var isAdmin = await currentUserIsAdminAsync(req);
        if (!isAdmin) {
            return CustomError(res, 403, "No tienes permisos para acceder a este recurso")
        }
        return await User.findById(req.params.id, "id name email isAdmin").exec((err, user) => {
            if (err) {
                return CustomError(res, 500, "No se encontró al usuario");
            }
            return Success(res, ResponseObjectType.Object, "user", user);
        });
    }

    public async index(req: any, res: any) {
        var loggedIn = await isUserLoggedInAsync(req);
        if (!loggedIn) {
            return CustomError(res, 403, "Por favor inicia sesión");
        }
        var isAdmin = await currentUserIsAdminAsync(req);
        if (!isAdmin) {
            return CustomError(res, 403, "No tienes permisos para acceder a este recurso")
        }
        return await User.find({}, "id name email isAdmin").exec((err, users) => {
            if (err) {
                return CustomError(res, 500, "No se encontró al usuario");
            }
            return Success(res, ResponseObjectType.Array, "users", users);
        });
    }

    public async create(req: any, res: any) {
        var loggedIn = await isUserLoggedInAsync(req);
        if (!loggedIn) {
            return CustomError(res, 403, "Por favor inicia sesión");
        }
        var isAdmin = await currentUserIsAdminAsync(req);
        if (!isAdmin) {
            return CustomError(res, 403, "No tienes permisos para acceder a este recurso")
        }
        if (UserController.validateRequiredParams(req)) {
            if (req.body.password !== req.body.passwordConf) {
                return CustomError(res, 400, 'La contraseña y la confirmación de contraseña no coinciden');
            }
            return await User.create(UserController.createUpdateObject(req), (err, user: any) => {
                if (err) {
                    console.log(err);
                    return CustomError(res, 500, "El correo ya esta en uso");
                }
                return Success(res, ResponseObjectType.Object, "user", {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                });
            });
        }
        return CustomError(res, 400, 'Todos los campos son requeridos');
    }

    public async edit(req: any, res: any) {
        var loggedIn = await isUserLoggedInAsync(req);
        if (!loggedIn) {
            return CustomError(res, 403, "Por favor inicia sesión");
        }
        var isAdmin = await currentUserIsAdminAsync(req);
        if (!isAdmin) {
            return CustomError(res, 403, "No tienes permisos para acceder a este recurso")
        }
        if (UserController.validateChanges(req)) {
            if (req.body.password == '') {
                return CustomError(res, 400, 'La contraseña no puede estar vacía');
            }
            console.log(req.params.id);
            return await User.findOneAndUpdate({ _id: req.params.id }, UserController.createUpdateObject(req),
            { new: true, fields: "id name email isAdmin" }, (err, user) => {
                if (err) {
                    return CustomError(res, 400, "El correo ya esta en uso");
                }

                if (!user) {
                    return CustomError(res, 404, "No se encontró al usuario");
                }

                return Success(res, ResponseObjectType.Object, "user", {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                });
            });
        }
        return CustomError(res, 400, 'Todos los campos son requeridos');
    }

    public async delete(req: any, res: any) {
        var loggedIn = await isUserLoggedInAsync(req);
        if (!loggedIn) {
            return CustomError(res, 403, "Por favor inicia sesión");
        }
        return await User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) {
                return CustomError(res, 500, "No se encontró al usuario");
            }
            return Success(res, ResponseObjectType.Object, "user", user);
        });
    }

    private static validateRequiredParams(req: any): boolean {
        return req.body.email && req.body.name && req.body.password
    }

    private static validateChanges(req: any): boolean {
        return req.body.email && req.body.name
    }

    private static createUpdateObject(req: any): any {
        var passwordHash = bcrypt.hashSync(req.body.password);
        var obj: any = {};

        if (req.body.name != null) {
            obj.name = req.body.name;
        }
        if (req.body.email != null) {
            obj.email = req.body.email;
        }
        if (req.body.password != null) {
            obj.password = passwordHash;
        }
        if (req.body.isAdmin != null) {
            obj.isAdmin = req.body.isAdmin;
        }

        return obj;
    }
}