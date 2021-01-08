// Find a single note with a noteId
exports.findOne = (req, res) => {
    Case.findById(req.params.id)
    .then(cases => {
        if(!cases) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });            
        }
        res.send(cases);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.id
        });
    });
};
