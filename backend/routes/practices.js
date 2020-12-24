const router = require('express').Router();
let Practice = require('../models/practice.model');

router.route('/').get((req, res) => {
  Practice.find()
    .then(practices => res.json(practices))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newPractice = new Practice({
    username,
    description,
    duration,
    date,
  });

  newPractice.save()
  .then(() => res.json('New practice added'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Practice.findById(req.params.id)
    .then(practice => res.json(practice))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Practice.findByIdAndDelete(req.params.id)
    .then(() => res.json('Practice deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Practice.findById(req.params.id)
    .then(practice => {
      practice.username = req.body.username;
      practice.description = req.body.description;
      practice.duration = Number(req.body.duration);
      practice.date = Date.parse(req.body.date);

      practice.save()
        .then(() => res.json('Practice updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
