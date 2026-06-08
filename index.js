const express = require('express');
const app = express();
const PORT = 3000;

// Permet à Express de servir notre dossier "public" (où se trouve le CSS)
app.use(express.static('public'));

// Une route de test temporaire pour vérifier que le serveur répond
app.get('/', (req, res) => {
    res.send('Le serveur fonctionne !');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
