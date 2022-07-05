const express = require('express');
const router = express.Router();
const Pet = require('../../models/Pet');
const mongoose = require('mongoose');
const passport = require('passport');

const validatePetInput = require('../../validation/pets');

router.get('/', (req, res) => {
    Pet.find()
        .sort({ date: -1 })
        .then(pets => res.json(pets))
        .catch(err => res.status(404).json({ nopetsfound: 'No pets found' }));
});

// router.get('/user/:user_id', (req, res) => {
//     Pet.find({user: req.params.user_id})
//         .then(pets => res.json(pets))
//         .catch(err =>
//             res.status(404).json({ nopetsfound: 'No pets found from that user' }
//         )
//     );
// });

router.get('/:id', (req, res) => {
    Pet.findById(req.params.id)
        .then(pet => res.json(pet))
        .catch(err =>
            res.status(404).json({ nopetfound: 'No pet found with that ID' })
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validatePetInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }

    //   const pet = Pet.find({id: req.params.pet_id })
  
      const newpet = new Pet({
        name: req.body.name,
        petType: req.body.petType,
        description: req.body.description,
        price: req.body.price
      });
  
      newpet.save().then(pet => res.json(pet));
    }
);


module.exports = router;