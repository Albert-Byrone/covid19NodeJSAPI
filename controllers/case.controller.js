// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Case.findByIdAndRemove(req.params.id)
    .then(casee => {
        if(!casee) {
            return res.status(404).send({
                message: "casee not found with id " + req.params.id
            });
        }
        res.send({message: "casee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "casee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};