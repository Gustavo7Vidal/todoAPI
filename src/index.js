const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const users = [];

//MiddleWares

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

function checkTask(user, id){
    const check = user.todos.find((element) => element.id === id);

    return check;
}

//Routes
app.get('/users', (req, res) => {
    return res.status(200).json(users);
})

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

app.put('/todos/:id', checkExistsUserAccount, (req, res) => {
    const { title, deadline} = req.body;
    const { id } = req.params;
    const { user } = req;

    const checking = checkTask(user, id);

    if(!checking){
        return res.status(404).json({ error : "Task not found!"});
    }

    user.todos.find((element)=> {
        if(element.id === id){
            element.title = title;
            element.deadline = deadline;
        }
    });

    return res.status(200).send();

});

app.patch('/todos/:id/done', checkExistsUserAccount, (req, res) => {
    const { user } = req;
    const { id } = req.params;

    const checking = checkTask(user, id);

    if(!checking){
        return res.status(404).json({ error : "Task not found"});
    }

    user.todos.find((element) => {
        if(element.id === id){
            element.done = true;
        }
    })

    return res.status(200).send();
});

app.delete('/todos/:id', checkExistsUserAccount, (req, res) => {
    //const { user } = req;
    const { id } = req.params;

    const checkTask = users.find((element) => element.id === id);

    if(!checkTask){
        return res.status(404).json({ error : "User"});
    }

    users.splice(checkTask,1);

    return res.status(200).send();
});

app.listen(3333);