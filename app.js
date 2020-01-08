const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const consola = require('consola');
const cors = require('cors');

const app = express();
const PORT = config.get('port') || 1337;

app.use(express.json({extended: true}));
app.use(cors());

app.use('/api/auth/', require('./routes/auth.routes'));
app.use('/api/users/', require('./routes/users.routes'));

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => {
            consola.ready({
                badge: true,
                message: `App has been started on port ${PORT}...`
            });
        });
    } catch (e) {
        console.log('SERVER ERROR:', e.message);
        process.exit(1);
    }
};

start().then(() => consola.log({
    badge: true,
    message: 'Start...'
}));
