'use strict';

const app = require('./app');

const PORT = parseInt(process.env.PORT) || 3000;

app().listen(PORT, console.log(`Process ${process.pid} listening on port ${PORT}`));
