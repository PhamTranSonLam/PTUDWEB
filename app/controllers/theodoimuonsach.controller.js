const TheodoimuonsachService = require("../services/theodoimuonsach.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
exports.create = async (req, res, next)=>{
    if (!req.body?.madocgia){
        return next(new ApiError(400, "Name can not be empty"));

    }
    try {
        const theodoimuonsachService = new TheodoimuonsachService(MongoDB.client);
        const document = await theodoimuonsachService.create(req.body);
        return res.send(document);

    } catch (error){
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};
// Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next)=> {
    let documents = [];
    try{
        const theodoimuonsachService = new TheodoimuonsachService(MongoDB.client);
        const {name} = req.query;
        if(name){
            documents = await theodoimuonsachService.findByname(name);

        }else{
            documents = await theodoimuonsachService.find({});
        }
    }catch (error){
        return next (
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};
// Find a single contact with an id
exports.findOne = async (req, res, next)=>{
    try{
        const theodoimuonsachService = new TheodoimuonsachService(MongoDB.client);
        const document = await theodoimuonsachService.findById(req.params.id);
        if (!document){
            return next (new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    }catch (error){
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id = ${req.params.id}`
            )
        );
    }
};
// update a contact by the id in the request
exports.update = async (req, res, next)=>{
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try{
        const theodoimuonsachService = new Theodoimuonsach(MongoDB.client);
        const document = await theodoimuonsachService.update(req.params.id, req.body);
        if(!document){
            return next (new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was updated successfully"});
    }catch (error){
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};
//Delete a contact with the specified id the request
exports.delete = async (req, res, next)=> {
    try {
        const theodoimuonsachService = new TheodoimuonsachService(MongoDB.client);
        const document = await theodoimuonsachService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was deleted successfully"});
    }catch(error){
        return next(
            new ApiError (
                500, `Could not delete contact with id=${req.params.id}`
            )
        );
    }
};

// Find all favorite contacts of a user
exports.findAllFavorite = async (_req, res, next)=>{
    try {
        const theodoimuonsachService = new TheodoimuonsachService(MongoDB.client);
        const documents = await theodoimuonsachService.findFavorite();
        return res.send(documents);
    }catch (error){
        return next (
            new ApiError(
                500, `An error occurred while retrieving favorite contacts`
            )
        );
    }
};

// Delete all contacts of a user from the database
exports.deleteAll = async (_req, res, next)=>{
    try {
        const theodoimuonsachService = new TheodoimuonsachService(MongoDB.client);
        const deleteCount = await theodoimuonsachService.deleteAll();
        return res.send({
            message:`${deleteCount} contacts were deleted successfully`,
        });
    } catch (error){
        return next (
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};


    