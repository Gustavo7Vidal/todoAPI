const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const users = [];

function checkExistsUserAccount(req, res, next) {
    //
    const { username } = req.headers;

    const user = users.find((user) => user.username === username)

    if (!user) {
        return res.status(404).json({ error: 'User not exists' })
    }
    req.user = user;
    return next()
}

app.post('/users', (req, res) => {
    const { name, username } = req.body;

    if (users.find((userSearch) => userSearch.username === username)) {
        return res.status(400).json({ error: 'User already exists' })
    }
    const user = {
        id: uuidv4(),
        name,
        username,
        todos: []
    }
    users.push(user)

    return res.status(201).json(user);
});

app.get('/todos', checkExistsUserAccount, (req, res) => {
    const { user } = req;

    return res.status(200).json(user.todos);

});

/* 
    id: uuid
    title: string
    done: false
    deadline: date
    created_at: date
*/
app.post('/todos', checkExistsUserAccount, (req, res) => {
    const { user } = req;
    const { title, deadline } = req.body;

    const dataFormat = new Date(deadline + " 00:00");

    const todoUserAdd = {
        id: uuidv4(),
        title,
        done: false,
        deadline: new Date(dataFormat),
        created_at: new Date()
    }

    user.todos.push(todoUserAdd)

    return res.status(201).json(todoUserAdd);
});
// Continuar daqui ----------------- // ----------------
app.put('/todos', checkExistsUserAccount, (req, res) => {

});

app.patch('/todos/:id/done', checkExistsUserAccount, (req, res) => {

});

app.delete('/todos/:id', checkExistsUserAccount, (req, res) => {

});

app.listen(3333);