const express = require('express');

const morgan = require('morgan');

const app = express();
const port = 3000;
const lazadaRouter = require('./routes/Lazada.routes');
// const userRouter = require('./routes/userRoutes');

app.use(morgan('dev'));
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log('Hello from middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello from the server side!',
        app: 'Google Api Demo'
    });
});

// Routes

app.use('/api/v1/lazada',lazadaRouter);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
// Start Server
module.exports = app;