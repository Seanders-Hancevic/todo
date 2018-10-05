const db = require('../data/toDoSchema.js');


module.exports = function (app) {

    app.get('/api/toDoSchema/', function (req, res) {

        db.find({})
            .then(function (dbtodo) {
                res.json(dbtodo);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post('/api/toDoSchema', function (req, res) {
        db.create(req.body)
            .then(function (data) {
                console.log(data);
                res.json({ success: true });
            })
            .catch(function (err) {
                console.log(err);
                res.json({ success: false });
            });
    });

    app.put('/api/toDoSchema/:id', function (req, res) {

        db.findOneAndUpdate({ _id: req.params.id },{
        $set: {completed: req.body.completed}
        })
            .then(function (dbtodos) {
                res.json({
                    success: true
                });
            });
    });

    app.delete('/api/toDoSchema/:id', function (req, res) {

        db.deleteOne({_id: req.params.id})
            .then(function (dbtodos) {
                res.json({
                    success: true
                })
            })
            .catch(function (err) {
                res.json({
                    success: false})
            })
    });
}



