const express=require('express');
const bookRouter= require('./routes/bookRouter');

const app=express();

app.use(express.json());
app.use(bookRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported!' });
});

app.use((err, req, res, next) => {
    if (err.message === 'NOT Found') {
        res.status(404).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Something is wrong! Try later' });
    }
});



app.listen(3000,()=>console.log('listening to port 3000'));