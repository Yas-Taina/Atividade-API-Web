const express = require('express');
const router = express.Router();

let pokemons = [];

router.post('/pokemons', (req, res) => {
    const { nome, tipo, nivel } = req.body;

    if (!nome || !tipo || nivel === undefined) {
        return res.status(400).json({ message: 'Parâmetros inválidos.' });
    }

    const newPokemon = {
        id: pokemons.length + 1,
        nome,
        tipo,
        nivel
    };

    pokemons.push(newPokemon);
    res.status(201).json(newPokemon);
});

router.get('/pokemons', (req, res) => {
    res.json(pokemons);
});

router.get('/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(p => p.id === id);
    if (pokemon) {
        res.json(pokemon);
    } else {
        res.status(404).json({ message: 'Pokémon não encontrado' });
    }
});

router.put('/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, tipo, nivel } = req.body;
    const index = pokemons.findIndex(p => p.id === id);

    if (index !== -1) {
        if (!nome || !tipo || nivel === undefined) {
            return res.status(400).json({ message: 'Parâmetros inválidos.' });
        }

        pokemons[index] = { id, nome, tipo, nivel };
        res.json(pokemons[index]);
    } else {
        res.status(404).json({ message: 'Pokémon não encontrado' });
    }
});

router.delete('/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = pokemons.findIndex(p => p.id === id);

    if (index !== -1) {
        const deletedPokemon = pokemons.splice(index, 1);
        res.json(deletedPokemon);
    } else {
        res.status(404).json({ message: 'Pokémon não encontrado' });
    }
});

module.exports = router;
