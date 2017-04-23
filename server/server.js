'use strict';

const app = require('./app');

const PORT = parseInt(process.env.PORT);

app().listen(PORT, console.log(`Process ${process.pid} listening on port ${PORT}`));
