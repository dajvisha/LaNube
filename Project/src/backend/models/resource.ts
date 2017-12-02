import { Schema, model, Model } from 'mongoose';
import { IResource, IUpdate } from '.';

// class methods
interface IResourceModel extends Model<IResource> { }

// database attributes (should be the same as IResourceModel)
var ResourceSchema = new Schema({
    name: { type: String, maxlength: 100, required: true },
    url: { type: String, maxlength: 1000, required: true },
    description: { type: String, maxlength: 20000, required: true },
    tags: { type: Array(), default: [] },
    category: { type: {}, required: true },
    updated_by: { type: Array<IUpdate>(), default: [] },
    type: { type: String, required: true, default: "web", maxlength: 50 }
});

var Resource: any;
try {
    if (model('Resource')) {
        Resource = model('Resource');
    }
} catch (e) {
    if (e.name === 'MissingSchemaError') {
        Resource = model<IResource, IResourceModel>('Resource', ResourceSchema);
    }
}
export = Resource;