//Assignment model
const squel = require('squel').useFlavour('mysql');
const connection = require('../config/db');

connection.query(`create table if not exists assignments (
  id varchar(50),
  name varchar(100),
  total int,
  score init)`, err => {
    if (err) throw err;
  });

exports.getAll = function() {
  return new Promise((resolve, reject) => {
    let sql = squel.select().from('assignments').toString()
    connection.query(squel , (err, assignments) => {
      console.log('ERROR ' , err)
      if (err) reject(err)
      else resolve(assignments)
    });
  })
}

