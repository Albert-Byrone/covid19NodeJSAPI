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
