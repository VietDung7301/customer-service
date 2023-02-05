const service = require("./service");

exports.createUserComplain = async (req, res)=>{
    try {
        console.log("req",req.body);
        const newUserComplain = await service.createUserComplain(req.body);
        res.status(201).json({
            success: true,
            messages: ["Add success"],
            content: newUserComplain
        })
    } catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            messages: "Add fail",
            content: error.messages
        })
    }
}
exports.getListRequest = async (req, res)=>{
    try{
        console.log(req.body);
        const listRequest = await service.getListRequest();
        res.status(201).json({
            success: true,
            messages: ["Get success"],
            content: listRequest
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            messages: "Get fail",
            content: error.messages
        })
    }
}
exports.updateRequest = async (req, res)=>{
    try{
        console.log(req.body);
        const newRequest = await service.updateRequest(req.body);
        res.status(201).json({
            success: true,
            messages: ["Update success"],
            content: newRequest
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            messages: "Update fail",
            content: error.messages
        })
    }
    
}