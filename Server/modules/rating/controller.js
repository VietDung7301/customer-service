const service = require("./service");

exports.createProductRating = async (req, res) => {
    try {
        console.log("req", req.body);
        const newProductRating = await service.createProductRating(req.body);

        res.status(201).json({
            success: true,
            messages: ["Add success"],
            content: newProductRating
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            messages: ["Add fail"],
            content: error.messages
        })
    }
}

exports.getAllRating = async(req, res) => {
    try {
        const allRating = await service.getAllRating();
        console.log("rating", allRating);
        res.send(allRating);
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Get fail"],
            content: error.messages
        })
    }
}

exports.test = async(req, res) => {
    res.status(200).json({
        success: true,
        messages:["okee roi"],
        content: "lay thanh cong du lieu"
    })
}