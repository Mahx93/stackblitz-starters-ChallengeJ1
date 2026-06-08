const express = require('express');
const app = express();
const PORT = 3000;

// Servir les fichiers du dossier public (notre CSS)
app.use(express.static(path.join(__dirname, 'public')));

// 1. PAGE D'ACCUEIL : Récupère un personnage (via query param ou ID 1 par défaut)
app.get('/', async (req, res) => {
    try {
        // On récupère le paramètre "id" dans l'URL (ex: /?id=4). S'il n'y en a pas, on prend 1 (Luke)
        const characterId = req.query.id || 1;

        // On injecte dynamiquement l'ID dans l'URL de l'API
        const response = await fetch(`https://swapi.info/api/people/${characterId}`);
        
        if (!response.ok) {
            return res.status(404).send("Personnage non trouvé. Essayez un autre ID (ex: 1, 2, 3, 4...) !");
        }

        const character = await response.json();

        // On renvoie le HTML
        res.send(`
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <title>Accueil - Star Wars</title>
                <link rel="stylesheet" href="/css/style.css">
            </head>
            <body>
                <h1>${character.name}</h1>
                <p><strong>Année de naissance :</strong> ${character.birth_year}</p>
                <p><strong>Poids :</strong> ${character.mass} kg</p>
                <p><strong>Taille :</strong> ${character.height} cm</p>
                <br>
                <p><a href="/about">À propos</a></p>
            </body>
            </html>
        `);
    } catch (error) {
        res.status(500).send("Erreur lors du chargement des données de l'API Star Wars.");
    }
});

// 2. PAGE À PROPOS : Contenu textuel strict demandé par l'énoncé
app.get('/about', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <title>À propos</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <h1>À propos</h1>
            <p>Bonjour Sara,</p>
            <p>Ce site a un seul et unique but : afficher mon personnage préféré de l'univers Star Wars.</p>
            <p>Sur la page d'accueil, vous y trouverez son nom, son année de naissance, son poids et sa taille. Toutes ces informations sont récupérées en direct depuis SWAPI, une API publique et gratuite qui recense les données de la saga.</p>
            <br>
            <p><a href="/">Retour à l'accueil</a></p>
        </body>
        </html>
    `);
});

// Configuration spécifique pour le déploiement Vercel (Serverless)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Le serveur tourne localement sur http://localhost:${PORT}`);
    });
}

// Exportation de l'application pour que Vercel puisse l'exécuter
module.exports = app;