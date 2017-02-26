'use strict';

const app = require('./app');

describe('(routes)', () => {
  let server;

  beforeEach(() => {
    server = app().listen(PORT);
  });

  afterEach(() => server.close());

  it('should respond with an html page when user goes to /', done => {
    chai.request(URL)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });
});
