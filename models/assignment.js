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
              .set("id",  uuid.v4())
              .toString();
    connection.query(sql,  err => {
      // console.log('ERROR ' , err)
      if (err) reject(err)
      else resolve();
    });
  });
}

//Delete an assignment

exports.delete = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.delete()
                .from('assignments')
                .where(`id = "${id}"`)
                .toString();
    connection.query(sql, err => {
      if (err) reject(err)
      else resolve()
    })
  });
}

//Updates the assignment
exports.update = function(id, updateObj) {
  // if (updateObj.total) updateObj.total = parseInt(updateObj.total)
  // if (updateObj.score) updateObj.score = parseInt(updateObj.score)
  return new Promise((resolve, reject) => {
    let sql = squel.update()
                .table('assignments')
                .setFields(updateObj)
                .where(`id = "${id}"`)
                .toString();
    connection.query(sql, err => {
      if (err) reject(err)
      else resolve()
    })
  })
}
