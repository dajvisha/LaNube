import * as Tag from '../models/tag';
import { Success, CustomError, ResponseObjectType } from '../helpers/response';
import { isUserLoggedInAsync } from '../helpers/currentUser';

export class TagController {
    public async search(req: any, res: any) {
        var query = {};
        if (req.query.q) {
            query = { name: { $regex: req.query.q } };
        }
        return await Tag.find(query, "id name count", {sort: {count: -1}}, (err, tags) => {
            if (err) {
                return CustomError(res, 500, "No se encontró la etiqueta");
            }
            return Success(res, ResponseObjectType.Array, "tags", tags)
        });
    }

    public async create(req: any, res: any) {
        var loggedIn = await isUserLoggedInAsync(req);
        if (!loggedIn) {
            return CustomError(res, 403, "Por favor inicia sesión");
        }
        if (TagController.validateRequiredParams(req)) {
            return await Tag.create(TagController.createResponseObject(req), (err, tag) => {
                if (err) {
                    return CustomError(res, 500, "No se pudo crear la etiqueta");
                }
                return Success(res, ResponseObjectType.Object, "tag", {
                    _id: tag._id,
                    name: tag.name,
                    count: tag.count
                });
            });
        }
        return CustomError(res, 400, "Todos los campos son requeridos");
    }

    public async edit(req: any, res: any) {
        var loggedIn = await isUserLoggedInAsync(req);
        if (!loggedIn) {
            return CustomError(res, 403, "Por favor inicia sesión.");
        }
        await Tag.findOneAndUpdate({ _id: req.params.id }, 
            TagController.createUpdateObject(req),
            { new: true, fields: "id name count" }, (err, tag) => {
                if (err) {
                    return CustomError(res, 400, "No se encontró la etiqueta");
                }

                if (!tag) {
                    return CustomError(res, 404, "No se encontró la etiqueta");
                }

                return Success(res, ResponseObjectType.Object, "tag", {
                    _id: tag._id,
                    name: tag.name,
                    count: tag.count
                });
            });
    }

    private static validateRequiredParams(req: any): boolean {
        return req.body.name;
    }

    private static createResponseObject(req: any): any {
        return {
            name: req.body.name,
            count: req.body.count || 0
        }
    }

    private static createUpdateObject(req: any): any {
        var obj: any = {};
        if (req.body.name != null) {
            obj.name = req.body.name;
        }
        if (req.body.count != null) {
            obj.count = req.body.count;
        }
        return obj
    }
}