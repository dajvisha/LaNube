import { Schema, Model, model } from 'mongoose';
import { ITag } from '.';

// class methods
interface ITagModel extends Model<ITag> {
    findOrCreateBatch(tags: any, callback?: (err, tags) => void);
}

// database attributes (should be the same as ITagModel)
var TagSchema = new Schema({
    name: { type: String, maxlength: 100, unique: true, required: true },
    count: { type: Number, default: 1 }
});

TagSchema.statics.findOrCreateBatch = async (tagsNames: Array<string>, callback?: (errs, tags) => void): Promise<Array<any>> => {
    var rawTags: any[] = [];
    var errs: any[] = [];
    for (var i = 0; i < tagsNames.length; i++) {
        var tagName = tagsNames[i].trim();
        var tag = await Tag.findOne({ name: tagName }, "name count", (err, _) => {
            if (err) errs.push(err);
        });
        if (tag) {
            tag.count += 1;
            var updatedTag = await Tag.findOneAndUpdate({ _id: tag._id },
                { count: tag.count },
                { new: true, fields: "id name count" }).catch(e => {
                    errs.push(e);
                });
            rawTags.push({ name: updatedTag.name });
        } else {
            var createdTag = await Tag.create({ name: tagName, count: 1 }, (err, _) => {
                if (err) errs.push(err);
            });
            rawTags.push({ name: createdTag.name });
        }
    }
    if (callback) {
        callback(errs, rawTags);
    }
    return rawTags;
}

var Tag: any;
try {
    if (model('Tag')) {
        Tag = model('Tag');
    }
} catch (e) {
    if (e.name === 'MissingSchemaError') {
        Tag = model<ITag, ITagModel>('Tag', TagSchema);
    }
}
export = Tag;