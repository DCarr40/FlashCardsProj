const {Card, validate} = require('../models/card');
const {Collection} = require('../models/collections');
const express = require('express');
const router = express.Router();

//All end points and routes handlers go here
router.get('/', async (req, res) => {
    try {
    const collections = await Collection.find();
    return res.send(collections);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });

router.get('/:id', async (req, res) => {
    try {
   
    const collection = await Collection.findById(req.params.id);
    if (!collection)
    return res.status(400).send(`The card with id "${req.params.id}" d
   oes not exist.`);
    return res.send(collection);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });

   router.get('/:id/cards', async (req, res) => {
    try {
   
    const collection = await Collection.findById(req.params.id);
    if (!collection)
    return res.status(400).send(`The card with id "${req.params.id}" d
   oes not exist.`);
    return res.send(collection.cards);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });

router.post('/', async (req, res) => {
    try{

        const {error} = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const collection = new Collection({
            name: req.body.name,
            description: req.body.description,
        })
        await collection.save()

        return res.send(collection);

    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/:collectionId/cards', async (req, res) => {
    try{
        const collection = await Collection.findById(req.params.collectionId);


        //use collectionId to find the collection just like in a get
        //create a new Card using the req.body
        //push that new card into the found collection's card array
        //save the collection
        // const {error} = validate(req.body);
        // if (error)
        //     return res.status(400).send(error);

        const card = new Card({
            name: req.body.name,
            description: req.body.description,
        })
        
        collection.cards.push(card);

        await collection.save()

        return res.send(collection.cards);

    } catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error);
        const collection = await Collection.findByIdAndUpdate(
        req.params.id,
        {
        name: req.body.name,
        cards: req.body.description,
        },
        { new: true }
        );
        if (!collection)
        return res.status(400).send(`The card with id "${req.params.id}" d
    oes not exist.`);
        await collection.save();
        return res.send(collection);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });

// router.delete('/:id', async (req, res) => {
//     try {
   
//     const collection = await Collection.findByIdAndRemove(req.params.id);
//     if (!card)
//     return res.status(400).send(`The card with id "${req.params.id}" d
//    oes not exist.`);
//     return res.send(card);
//     } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//     }
//    });

module.exports = router;