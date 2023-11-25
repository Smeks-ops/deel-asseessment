const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Jobs Route', function () {
  describe('GET /jobs/unpaid', function () {
    it('should return all unpaid jobs for a user', function (done) {
      chai
        .request(server)
        .get('/jobs/unpaid')
        .set('profile_id', '1') // Set the profile_id header
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return 400 if profile_id is missing', function (done) {
      chai
        .request(server)
        .get('/jobs/unpaid')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
});
