//Assignment model
"use strict"
const squel = require('squel').useFlavour('mysql');
const connection = require('../config/db');
const uuid = require('uuid')
connection.query(`create table if not exists assignments (
  id varchar(50),
  name varchar(100),
  total int,
  score int)`, err => {
    if (err) throw err;
  });

exports.getAll = function() {
  return new Promise((resolve, reject) => {
    let sql = squel.select().from('assignments').toString()
    connection.query(sql , (err, assignments) => {
      //console.log('ERROR ' , err)
      if (err) reject(err)
      else resolve(assignments)
    });
  })
}

//Create an assignment
exports.create = function(newAssignment) {
  return new Promise((resolve, reject) => {
    let sql = squel.insert()
              .into('assignments')
              .setFields(newAssignment)
              .set(`id = "${uuid.v4()}"`)
              .toString();
    connection.query(sql,  err => {
      console.log(add)
      if (err) reject(err)
      else resolve();
    })
  });
}

