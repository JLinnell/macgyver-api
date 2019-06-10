const hacksModel = require('./hacks.model');

exports.createNew = (req, res) => {

console.log('create a new hack');
   
  let newHack = new hacksModel();
  newHack.type = req.body.type; 
  newHack.description = req.body.description; 
  newHack.item = req.body.item; 
  newHack.userId = req.user.id; 

    newHack.save()
        .then((result) => {
            res.status(200).json({
                message: "hack saved successfully!",
                data: result
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something happened!",
                //Message shouldn't be specific, correct?
                data: err
            })
        })
}

exports.fetchAll = (req, res) => {
    hacksModel.find()
        .then((hack) => {
            res.status(200).json({
                message: "hacks fetched successfully!",
                data: hack
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something happened!",
                data: err
            })
        })
}

exports.fetchSelectedHack = (req, res) => {
    hacksModel.findById(req.params.id)
        .then((hack) => {
            res.status(200).json({
                message: "selected hack fetched successfully!",
                data: hack
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something happened!",
                data: err
            })
        })
}

exports.deleteSelectedHack = (req, res) => {
    hacksModel.findByIdAndRemove(req.params.id)
    .then((hack) => {
        res.status(200).json({
            message: "hack deleted successfully!",
            data: hack
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: "Something happened!",
            data: err
        })
    })
}

// exports.findByCategory = (req, res) => {
//     console.log(req.params.searchQueryText);
//     hacksModel.find({category:  new RegExp(req.params.searchQueryText, "i")})
//         .then((hack) => {
//             res.status(200).json({
//                 message: "Search query fetched successfully!",
//                 data: hack
//             })
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 message: "Something happened!",
//                 data: err
//             })
//         })
// }

// exports.findByItem = (req, res) => {
//     console.log(req.params.searchQueryText);
//     hacksModel.find({item:  new RegExp(req.params.searchQueryText, "i")})
//         .then((hack) => {
//             res.status(200).json({
//                 message: "Search query fetched successfully!",
//                 data: hack
//             })
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 message: "Something happened!",
//                 data: err
//             })
//         })
// }

exports.fetchAllByUser = (req, res) => {
    hacksModel.find({userId: req.params.id})
        .then((hack) => {
            res.status(200).json({
                message: "Hacks fetched successfully!",
                data: hack
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something happened!",
                data: err
            })
        })
}
