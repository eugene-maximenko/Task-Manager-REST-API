const app = require('./app');

// Configurate the port
const port = process.env.PORT;

// Listen to the port
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

