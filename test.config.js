global.chai = require('chai');
global.expect = chai.expect;

chai.use(require('chai-http'));

global.PORT = 3001;
global.URL = `http://localhost:${global.PORT}`; 
