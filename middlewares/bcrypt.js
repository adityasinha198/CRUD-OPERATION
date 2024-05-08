const bcrypt = require("bcrypt");

exports.genSalt = () =>
  new Promise(async (resolve, reject) => {
    try {
      const salt = bcrypt.genSalt(10);
      return resolve(salt);
    } catch (err) {
      return reject(err);
    }
  });

exports.hashPassword = (password, salt) =>
  new Promise(async (resolve, reject) => {
    try {
      const hash = bcrypt.hash(password, salt);
      return resolve(hash);
    } catch (err) {
      return reject(err);
    }
  });

exports.decryptPassword = (password, dataBasePassword) =>
  new Promise(async (resolve, reject) => {
    try {
      const compare = bcrypt.compare(password, dataBasePassword);
      if (compare) {
        console.log("Yes")
        return resolve(true);
      } else {
        return reject(false);
      }
    } catch (err) {
      return reject(err);
    }
  });

