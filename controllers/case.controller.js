// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Case.findByIdAndUpdate(req.params.id, {
        date: req.body.date,
        state: req.body.state,
        country: req.body.country,
        deaths: req.body.deaths,
        cases: req.body.cases,
    }, {new: true})
    .then(casee => {
        if(!casee) {
            return res.status(404).send({
                message: "Case not found with id " + req.params.id
            });
        }
        res.send(casee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};
