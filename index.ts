const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');

const app = express();

app.use(express.json({extended: true}));

app.use('/api/author', require('./routes/author.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req: any, res: { sendFile: (arg0: any) => void; }) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

async function start(): Promise<void> {
    try {
        await mongoose.connect(process.env.mongoUri || config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        })

        app.listen(PORT, (): void => {
            console.log(`Started on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();
