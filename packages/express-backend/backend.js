import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
    users_list: [
        {
            id: 'xyz789',
            name: 'Charlie',
            job: 'Janitor'
        },
        {
            id: 'abc123',
            name: 'Mac',
            job: 'Bouncer'
        },
        {
            id: 'ppp222',
            name: 'Mac',
            job: 'Professor'
        },
        {
            id: 'yat999',
            name: 'Dee',
            job: 'Aspiring actress'
        },
        {
            id: 'zap555',
            name: 'Dennis',
            job: 'Bartender'
        }
    ]
}

app.use(cors());
app.use(express.json());

const findUserByName = (name) => {
    return users['users_list']
        .filter((user) => user['name'] === name);
}

const findUserByJob = (job) => {
    return users['users_list']
        .filter((user) => user['job'] === job);
}

app.get('/users', (req,res) => {
    const name = req.query.name;
    const job = req.query.job;
    if(name != undefined && job != undefined){
        console.log("hi");
        let result = findUserByName(name);
        result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    }
    if(name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserById = (id) => {
    return users['users_list']
        .find((user) => user['id'] === id);
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if(result === undefined){
        res.status(404).send('Resource not found.');
    }
    else{
        res.send(result);
    }
})

const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status.send(201);
})

const deleteUserById = (id) => {
    const updated = users['users_list']
        .filter((user) => user['id'] !== id);
    users.users_list = updated;
}

app.delete('/users/:id', (req, res) => {
    if(findUserById(req.params.id) === undefined){
        res.status(404).send('Resource not found.');
    }
    else{
        deleteUserById(req.params.id);
        res.status(204).send()
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});