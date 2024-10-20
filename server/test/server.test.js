import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';  // Assuming your server is being exported from server.js

const { expect } = chai;
chai.use(chaiHttp);

describe('Server routes', () => {
  it('should respond with status 200', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

//   it('should return 200 for /upload/profile (if route exists)', (done) => {
//     chai.request(server)
//       .get('/upload/profile')
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
// });
