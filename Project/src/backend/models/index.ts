import { Document } from 'mongoose';

export interface IUpdate {
    user: IUser,
    at: Date
}

// instance methods
export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
}

// object attributes
export interface ITag extends Document {
    name: string,
    count: number
}

export interface ICategory extends Document {
    name: string,
    description: string,
    updated_by: Array<IUpdate>,    
}

// object attributes
export interface IResource extends Document {
    name: string,
    image: string,
    url: string,
    description: string,
    tags: Array<ITag>,
    category: ICategory,
    updated_by: Array<IUpdate>,
    type: string
}