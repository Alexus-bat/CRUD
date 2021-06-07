export {};
const {Router} = require('express');
const config = require('config');
const Author = require('../models/Author')
const router = Router();

router.get('/get', async (req: null, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    try {
        const author = await Author.find();
        res.json(author);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так :('});
    }
})

router.post('/add', async (req: { body: { name: string; }; }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    const {name} = req.body;

    try {
        const newAuthor = new Author({name})
        await newAuthor.save();
        const author = await Author.find();
        res.json(author);
    } catch (e) {        
        res.status(500).json({message: 'Oops, something goes wrong, try again later'})
    }
})

router.post('/delete', async (req: { body: { _id: number; }; }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    const {_id} = req.body;

    try {
        await Author.findOneAndDelete({_id})
        const author = await Author.find();
        res.json(author);
    } catch (e) {
        res.status(500).json({message: 'Oops, something goes wrong, try again later'})
    }
})

router.post('/update', async (req: { body: { _id: number; title: string; }; }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    const {_id, title} = req.body;

    try {
        await Author.findOneAndUpdate({_id}, {$push: {books: title}});
        const author = await Author.find();
        res.json(author);
    } catch (e) {
        res.status(500).json({message: 'Oops, something goes wrong, try again later'});
    }
})

router.post('/remove', async (req: { body: { _id: number; title: string; }; }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    const {_id, title} = req.body;

    try {
        await Author.findOneAndUpdate({_id}, {$pull: {books: title}});
        const author = await Author.find();
        res.json(author);        
    } catch (e) {
        res.status(500).json({message: 'Oops, something goes wrong, try again later'});
    }
})

module.exports = router;
