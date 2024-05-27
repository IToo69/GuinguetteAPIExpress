const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

// En mémoire pour stocker les personnes et leurs pichets
let people = [];
let nextId = 1;

// Route pour créer une nouvelle personne
app.post('/api/people', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send({ message: 'Name is required' });
    }
    const newPerson = { id: nextId++, name, pichets: 0 };
    people.push(newPerson);
    res.status(201).send(newPerson);
});

// Route pour incrémenter le nombre de pichets pour une personne
app.post('/api/people/:id/pichets', (req, res) => {
    const personId = parseInt(req.params.id, 10);
    const { pichets } = req.body;
    const increment = pichets || 1; // Si le nombre de pichets n'est pas spécifié, incrémentez de 1

    const person = people.find(p => p.id === personId);
    if (!person) {
        return res.status(404).send({ message: 'Person not found' });
    }

    person.pichets += increment;
    res.send(person);
});

// Route pour obtenir toutes les personnes
app.get('/api/people', (req, res) => {
    res.send(people);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});