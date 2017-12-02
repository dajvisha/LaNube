import { Schema, Model, model } from 'mongoose';
import { IUpdate, ICategory } from '.'

interface ICategoryModel extends Model<ICategory> { }

var CategorySchema = new Schema({
    name: { type: String, maxlength: 200, required: true, unique: true },
    description: { type: String, maxlength: 20000, default: "" },
    updated_by: { type: Array<IUpdate>(), default: [] },    
});

var Category: any;
try {
    if (model('Category')) {
        Category = model('Category');
    }
} catch (e) {
    if (e.name === 'MissingSchemaError') {
        Category = model<ICategory, ICategoryModel>('Category', CategorySchema);
    }
}
export = Category;