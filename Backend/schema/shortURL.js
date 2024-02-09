import mongoose from 'mongoose';
import { ObjectId } from 'bson';
import ShortUniqueId from 'short-unique-id';

// random String Generator
const randomStr = new ShortUniqueId();

const shortURLSchema =  new mongoose.Schema({
    fullURL: {
        type: String,
        required: true,
        trim: true
    },
    shortURL: {
        type: String,
        required: true,
        trim: true,
        default: () => randomStr.rnd()
    },
    count: {
        type: Number,
        required: true,
        default: 0
    },
    time: {
        type: Date,
        required: true,
        default: Date.now,
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }
});

export const ShortURL = mongoose.model('ShortUrl', shortURLSchema); 