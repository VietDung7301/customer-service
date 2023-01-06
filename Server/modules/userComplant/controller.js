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