import * as Category from '../models/category';
import { Success, CustomError, ResponseObjectType } from '../helpers/response';
import { isUserLoggedInAsync, getCurrentUserAsync } from '../helpers/currentUser';

export class CategoryController {
    public async create(req: any, res: any) {
        var loggedIn = await isUserLoggedInAsync(req);
        if (!loggedIn) {
            return CustomError(res, 403, "Por favor inicia sesión");
        }
        if (CategoryController.validateRequiredParams(req)) {
            var categoryObject = await CategoryController.createResponseObject(req);
            return await Category.create(categoryObject, (err, category: any) => {
                if (err) {
                    return CustomError(res, 500, "La categoría ya existe");
                }
                return Success(res, ResponseObjectType.Object, "category", {
                    _id: category._id,
                    name: category.name,
                    updated_by: category.updated_by,
                    description: category.description
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
        if (CategoryController.validateRequiredParams(req)) {
            var categoryObject = await CategoryController.createUpdateObject(req);        
            return await Category.findOneAndUpdate({ _id: req.params.id }, 
                categoryObject,
                { new: true, fields: "id name description updated_by" }, (err, category) => {
                    if (err) {
                        return CustomError(res, 400, "La categoría ya existe");
                    }
                    if (!category) {
                        return CustomError(res, 404, "No se encontró la categoría");
                    }
                    return Success(res, ResponseObjectType.Object, "category", {
                        _id: category._id,
                        name: category.name,
                        updated_by: category.updated_by,
                        description: category.description
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
        return await Category.findByIdAndRemove(req.params.id, (err, category) => {
            if (err) {
                return CustomError(res, 500, "No se encontró la categoría");
            }
            return Success(res, ResponseObjectType.Object, "category", category);
        });
    }

    public async index(_: any, res: any) {
        return await Category.find({}, "id name description updated_by").exec((err, categories) => {
            if (err) {
                return CustomError(res, 500, "No se encontró la categoría");
            }
            return Success(res, ResponseObjectType.Array, "categories", categories);
        });
    }

    private static validateRequiredParams(req: any): boolean {
        return req.body.name && req.body.description;
    }

    private static async createResponseObject(req: any): Promise<any> {
        var currentUser = await getCurrentUserAsync(req);
        return {
            name: req.body.name,
            description: req.body.description,
            updated_by: [{
                user: { 
                    name: currentUser.name,
                    email: currentUser.email
                },
                at: Date.now()
            }]
        }
    }

    private static async createUpdateObject(req: any): Promise<any> {
        var currentUser = await getCurrentUserAsync(req);
        var obj: any = {};
        if (req.body.name != null) {
            obj.name = req.body.name;
        }
        if (req.body.description != null) {
            obj.description = req.body.description;
        }

        return { 
            $set: {
                ...obj
            },
            $push: {
                updated_by: {
                    user: {
                        name: currentUser.name,
                            email: currentUser.email
                    },
                    at: Date.now()
                }
            }
        }
    }
}