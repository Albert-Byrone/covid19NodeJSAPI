const Case = require('../models/case.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
    if(!req.body.date) {
        return res.status(400).send({
            message: "Date ontent can not be empty"
        });
    }

    if(!req.body.state) {
        return res.status(400).send({
            message: "State content can not be empty"
        });
    }


    if(!req.body.country) {
        return res.status(400).send({
            message: "Country content can not be empty"
        });
    }


    if(!req.body.deaths) {
        return res.status(400).send({
            message: "Deaths content can not be empty"
        });
    }


    if(!req.body.cases) {
        return res.status(400).send({
            message: "Cases content can not be empty"
        });
    }


    // Create a Note
    const casee = new Case({
        date: req.body.date,
        country: req.body.country, 
        state: req.body.state,
        country: req.body.country,
        deaths: req.body.deaths,
        cases: req.body.cases,
    });

    // Save Note in the database
    casee.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};
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