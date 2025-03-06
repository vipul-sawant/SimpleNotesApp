import mongoose, { Schema, Types } from "mongoose";
import ApiError from "../utils/ApiError.js";

const noteSchema = new Schema({
    userID: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        index: true // ✅ Improves query performance
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

noteSchema.statics.isTitleAvailable = async function (userID, title) {

    const existingNote = await this.findOne({ userID, title })
        .collation({ locale: "en", strength: 2 }); // ✅ Case-insensitive check

    return existingNote;
};

noteSchema.statics.createNote = async function (title, content, userID) {

    const createdNote = await this.create({ title, content, userID });
    
    const returnObj = createdNote.toObject();
    delete returnObj.__v;
    delete returnObj.userID;

    return returnObj;
}

noteSchema.methods.changeNote = async function (userID, body) {
    if (this.userID.toString() !== userID.toString()) {
        throw new ApiError(403, "Unauthorized: You cannot update this note");
    }
    // Convert Mongoose document to a plain object for comparison
    const existingNote = this.toObject(); 

    // Check if there are any differences
    const isDifferent = Object.keys(body).some(
        key => existingNote[key] !== body[key]
    );

    if (!isDifferent) {
        throw new ApiError(400, "Nothing to update");
    }

    // If `title` is being updated, check availability
    if (body.title) {
        const titleExists = await this.constructor.isTitleAvailable(userID, body.title);
        if (titleExists) {
            throw new ApiError(400, "Note with this Title Exist");
        }
    }

    // Update only the changed fields
    Object.assign(this, body);

    // return await this.save(); // Save the updated document
    await this.save(); // Save the updated document

    const returnObj = this.toObject();
    delete returnObj.__v;
    delete returnObj.userID;

    return returnObj;
};

noteSchema.statics.removeNote = async function (userID, noteID) {
    // Find and delete the note while ensuring it belongs to the user
    const deletedNote = await this.findOneAndDelete({ _id: noteID, userID });

    if (!deletedNote) {
        throw new ApiError(404, "Note not found or unauthorized");
    }

    const returnObj = deletedNote.toObject();
    delete returnObj.__v;
    delete returnObj.userID;

    return returnObj;
};


const Note = mongoose.model('Note', noteSchema);

export default Note;