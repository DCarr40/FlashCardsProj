const {Card, validate} = require('../models/card');
const express = require('express');
const router = express.Router();

//All end points and routes handlers go here
router.get('/', async (req, res) => {
    try {
    const cards = await Card.find();
    return res.send(cards);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });

router.get('/:id', async (req, res) => {
    try {
   
    const card = await Card.findById(req.params.id);
    if (!card)
    return res.status(400).send(`The card with id "${req.params.id}" d
   oes not exist.`);
    return res.send(card);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });

router.post('/', async (req, res) => {
    try{

        const {error} = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const card = new Card({
            name: 'Stanley Classic Vacuum Bottle',
            description: 'Our Stanley Classic Vacuum Bottle is made with superior insulation that keeps liquids (soup, coffee, tea) hot or cold drinks for up to 24hrs.',
            category: 'Travel',
            price: 19.82,
        })
        await card.save()

        return res.send(card);

    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);
    const card = await Card.findByIdAndUpdate(
    req.params.id,
    {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    },
    { new: true }
    );
    if (!card)
    return res.status(400).send(`The card with id "${req.params.id}" d
   oes not exist.`);
    await card.save();
    return res.send(card);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });

router.delete('/:id', async (req, res) => {
    try {
   
    const card = await Card.findByIdAndRemove(req.params.id);
    if (!card)
    return res.status(400).send(`The card with id "${req.params.id}" d
   oes not exist.`);
    return res.send(card);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });

module.exports = router;