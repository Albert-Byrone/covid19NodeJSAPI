// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Case.find()
    .then(cases => {
        res.send(cases);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
