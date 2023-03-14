const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());

const users = [];

function checkExistsUserAccount(req, res, next){
    //
    const {id} = req;
    
    users.filter()
}

app.post('/users',  (req, res) => {
    const { name, username } = req.body;

    users.push({
        id : uuid(),
        name,
        username,
        todos : []
    })

    console.log(users)
    return res.status(201).send()
});

app.get('/todos', checkExistsUserAccount, (req, res) => {

});

app.post('/todos', checkExistsUserAccount, (req, res) => {

});

app.put('/todos', checkExistsUserAccount, (req, res) => {

});

app.patch('/todos/:id/done', checkExistsUserAccount, (req, res) => {

});

app.delete('/todos/:id', checkExistsUserAccount, (req, res) => {

});

app.listen(3333);