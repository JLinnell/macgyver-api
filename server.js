const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hackRoutes = require('./hacks/hacks.routes.js');
const usersRoutes = require('./users/users.routes.js');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json({urlencoded: true}));
app.use('/hacks', hackRoutes);
app.use('/users', usersRoutes);

function runServer(db) {
	return new Promise((resolve, reject) => {
		mongoose
			.connect(db, { useNewUrlParser: true }, (err) => {
				if (err) {
					return reject(err);
        }
        const PORT = process.env.PORT || 1212;
				server = app.listen(PORT, () => {
					console.log(`Magic is happening on  ${PORT}`);
					resolve();
				})
				.on('error', (err) => {
					mongoose.disconnect();
					reject(err);
				})
			})
	})
}


  
  let server;
  
  
  
  // like `runServer`, this function also needs to return a promise.
  // `server.close` does not return a promise on its own, so we manually
  // create one.
  function closeServer() {
    return mongoose
      .disconnect()
      .then(() => {
        return new Promise((resolve, reject) => {
          console.log('Closing server');
          server.close((err) => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        });
      });
  }
  
  // if server.js is called directly (aka, with `node server.js`), this block
  // runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
  if (require.main === module) {
    runServer('mongodb://admin:adminadmin1@ds039778.mlab.com:39778/macgyver').catch((err) => {
      console.log(err);
  });

  };
  
  module.exports = {app, runServer, closeServer};

