exports.findAll = function(req, res) {
    res.send([{name:'book1'}, {name:'book2'}, {name:'book3'}]);
};

exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", author: "unknown"});
};
