const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Gotta catch them all!');
});

app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
