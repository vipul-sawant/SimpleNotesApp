import asyncHandler from "../utils/asyncHandler.js";

import Note from "../models/note.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";

import checkID from "../utils/validateObjectId.js";

const addNote = asyncHandler(async(req, res)=>{

    const { body={}, user } = req;

    const userID = checkID(user._id, "User ID");
    // console.log('userID :', userID);

    const requiredFields = ['title', 'content'];
    const missingFields = requiredFields.filter(field=>!body[field]);

    try {
        
        if (missingFields.length > 0) {
            
            throw new ApiError(400, "Enter all required fields!");
        }

        // console.log('missing fields :', missingFields);

        const { title, content } = body;
        

        const existingNote = await Note.isTitleAvailable(userID, title);

        // console.log('existingNote :', existingNote);

        if (existingNote) {
            
            throw new ApiError(400, "Note with this Title Exist!");
        }

        const note = await Note.createNote(title, content, userID);

        // console.log('note :', note);

        const noteID = checkID(note._id, "Note ID");
        await user.addNote(noteID);

        return res.status(200)
        .json(new ApiResponse(201, note, "Note created Successfully!"));
    } catch (error) {

        // console.log("Add Note Error Object :", error);

        if (error instanceof ApiError) {

            const {statusCode=null, message=null} = error;

            return res.status(statusCode)
            .json(new ApiResponse(statusCode, {}, message));
        }

        return res.status(500)
        .json(new ApiResponse(500, {}, "Something went Wrong with adding note!"));
    }
});

const fetchAllNotes = asyncHandler(async(req, res)=>{

    const { user } = req;
    const userID = checkID(user._id, "User ID");
    // console.log('userID :', userID);

    try {

        const notes = await User.aggregate([
            {
                $match: { _id:userID } // Ensure it's an ObjectId
            },
            {
                $lookup: {
                    from: "notes",
                    localField: "_id", // User's _id
                    foreignField: "userID", // Notes reference userID
                    as: "notes",
                    pipeline: [
                        { $sort: { updatedAt: -1 } } // Sort by latest updates
                    ]
                }
            },
            { $unwind: "$notes" }, // Flatten the notes array
            {
                $project: {
                    _id: "$notes._id",
                    title: "$notes.title",
                    content: "$notes.content",
                    createdAt: "$notes.createdAt",
                    updatedAt: "$notes.updatedAt"
                }
            }
        ]);

        if (notes.length === 0) {
            
            throw new ApiError(500, "No Notes");
        }

        return res.status(200)
        .json(new ApiResponse(200, notes, "Notes fetched Successfully!"));

    } catch (error) {

        // console.log("Fetch notes Error Object :", error);

        if (error instanceof ApiError) {

            const {statusCode=null, message=null} = error;

            return res.status(statusCode)
            .json(new ApiResponse(statusCode, {}, message));
        }

        return res.status(500)
        .json(new ApiResponse(500, {}, error.message || "Something went Wrong with Fetching notes!"));

    }
});

const updateNote = asyncHandler(async(req, res) => {

    console.log("Update controller");
    const { params = {}, body = {}, user } = req;
    console.log(body);
    const userID = checkID(user._id, "User ID");
    // console.log('userID :', userID);

    const  { id = null } = params;

    try {

        if (!id) {
            
            throw new ApiError(400, "note ID is missing!");
        }

        const noteID = checkID(id, "Note ID");
        console.log("noteID :",noteID);

        if (Object.keys(body).length === 0) {
            
            throw new ApiError(400, "data to update not fetched!");
        }

        const note = await Note.findById(noteID);

        console.log('the note :', note);
        if (!note) {
            
            throw new ApiError(400, "note doest exist!");
        }

        const updatedNote = await note.changeNote(userID, body);

        if (!updatedNote) {
            
            throw new ApiError(500, "SomeError");
        }

        console.log('updatedNote :', updatedNote);
        return res.status(200)
        .json(new ApiResponse(204, updatedNote, "Note updated Successfully!"));
    } catch (error) {
        
        // console.log("update note Error Object :", error);

        if (error instanceof ApiError) {

            const {statusCode=null, message=null} = error;

            return res.status(statusCode)
            .json(new ApiResponse(statusCode, {}, message));
        }

        return res.status(500)
        .json(new ApiResponse(500, {}, error.message || "Something went Wrong with Updating note!"));
    }
});

const deleteNote = asyncHandler(async(req, res) => {

    const { params = {}, user } = req;
    
    const userID = checkID(user._id, "User ID");
    // console.log('userID :', userID);

    const  { id = null } = params;

    try {

        if (!id) {
            
            throw new ApiError(400, "note ID is missing!");
        }

        const noteID = checkID(id, "Note ID");
        
        const note = await Note.findById(noteID);

        if (!note) {
            
            throw new ApiError(400, "note doest exist!");
        }

        const deletedNote = await Note.removeNote(userID, noteID);

        await user.removeNote(deletedNote._id);

        return res.status(200)
        .json(new ApiResponse(204, deletedNote, "Note deleted Successfully!"));
    } catch(error){

        // console.log("update note Error Object :", error);

        if (error instanceof ApiError) {

            const {statusCode=null, message=null} = error;

            return res.status(statusCode)
            .json(new ApiResponse(statusCode, {}, message));
        }

        return res.status(500)
        .json(new ApiResponse(500, {}, "Something went Wrong with deleting note!"));
    }
});

export { addNote, fetchAllNotes, updateNote, deleteNote };