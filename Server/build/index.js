"use strict";
const { app } = require('./app');
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto: ${PORT}`);
});
module.exports = app;
