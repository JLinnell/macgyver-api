const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const {
    app,
    runServer,
    closeServer
} = require('../server');

const hacks = require('../hacks/hacks.model');
const user = require('../users/users.model');

chai.use(chaiHttp);
let token;
let userId;
let testUser = {
    email: "testUser1@testing.com",
    password: "testingpasswordddd"
}



function tearDownDb() {
    return new Promise((resolve, reject) => {
        mongoose.connection.dropDatabase().then((result) => resolve(result)).catch((err) => reject(err));
    });
}

describe('tests', function () {
    before(function () {
         return runServer('mongodb://admin:adm1nadm1n@ds037047.mlab.com:37047/macgyvertest');
    });
    after(function () {
        tearDownDb();
        return closeServer();
    });

    it('should create one user', function (done) {
        let res;
        chai.request(app)
            .post(`/users/register`)
            .send(testUser)
            .then(_res => {
                res = _res;
                console.log("USER IDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
                console.log(res.body.data._id);
                userId = res.body.data._id;
                expect(res).to.have.status(200);
                done();
            })
            .catch((error) => {
                console.log(error);
                done();
            });
    });
    it('should log in one user', function (done) {
        let res;
        chai
            .request(app)
            .post(`/users/login`)
            .send(testUser)
            .then(_res => {
                res = _res;
                console.log("TOKENNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN");
                console.log(res.body.data.token);
                token = res.body.data.token;
                expect(res).to.have.status(200);
                done();
            })
            .catch((error) => {
                console.log(error);
                done();
            });
    });

    it('should list hacks on GET', function (done) {
        let res;
        chai.request(app)
            .get(`/hacks/all/${token}`)
            .then(_res => {
                res = _res;
                expect(res).to.have.status(200);
                done();
            })
            .catch((error) => {
                console.log(error);
                done();
            });
    });
});