const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Pour utiliser les variables d'environnement

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const transporteur = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'iaia4gaetan@gmail.com', // Remplacez par votre adresse Gmail
    clientId: '1098573266806-75jj2h16d2b47c2vnukohfjoinjk21do.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: '1//04_gWwln2i-COCgYIARAAGAQSNwF-L9IrXq9EaXkwufOWUOBlDTS7dkjn3N0WCfitETSQSg8BLwQZp_QP2EAUMZZo-AzW8VBYz8c',
    accessToken: 'ya29.a0AXooCgvLjfsyMHBHOH9Y-xoMVOzrtzAPvd1Vd6InuKwQmMJdpIFyW6gZcJYMqPU5yW4P-zhmrz_j_jeY9an7h8BMHpolW8mwo3PFkaPrgmREjgoutHgp0XR4mEpRhcEAubiMtgCd_j1x90CUW0akeOUfXubdOQ-wFomnaCgYKAVISARESFQHGX2MiV3BNy1gbz_xaydCE3rGE_w0171',
  },
});

app.post('/envoyer-email', (req, res) => {
  const { societe, email, message } = req.body;
  console.log('Requête reçue :', { societe, email, message });

  const optionsMail = {
    from: email,
    to: 'sarah.q@freelanceweb16.fr', // Remplacez par l'adresse email du destinataire
    subject: `La société : ${societe} vous a envoyé un message`,
    text: `Message : ${message}\n\nRecontactez-le via : ${email}`,
  };

  transporteur.sendMail(optionsMail, (erreur, info) => {
    if (erreur) {
      console.error('Erreur lors de l\'envoi de l\'email:', erreur);
      return res.status(500).send('Erreur lors de l\'envoi de l\'email. Veuillez réessayer plus tard.');
    }
    console.log('Email envoyé:', info.response);
    res.send('Email envoyé: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution à l'adresse http://localhost:${port}`);
});