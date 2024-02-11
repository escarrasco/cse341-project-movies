const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//return all directors
const getAll = async (req, res, next) => {
  try{
    const result = await mongodb.getDb().db().collection('directors').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  }  catch (err){
    res.status(500).json({message: err.message});
  }
};

// return an specific director by id
const getSingle = async (req, res, next) => {
  try{
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('directors')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err){
    res.status(500).json(err);
  }
  
};

//create a director
const createDirector = async (req, res, next) => {
  try{
    const director = {
      first_name: req.body.first_name,
      last_name: req.body.last_name
    };
    const response = await mongodb.getDb().db().collection('directors').insertOne(director);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the director.');
    }
  } catch (err){
    res.status(500).json(err);
  }
};


//update a director
const updateDirector = async (req, res, next) => {
  try{
    const userId = new ObjectId(req.params.id);
    const director = {
      first_name: req.body.first_name,
      last_name: req.body.first_name
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('directors')
      .replaceOne({ _id: userId }, director);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the director.');
    }
  } catch (err){
    res.status(500).json(err);
  }
};


//delete a director
const deleteDirector = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
                      .getDb()
                      .db()
                      .collection('directors')
                      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the director.');
    }
  } catch (err){
    res.status(500).json(err);
  }
};

module.exports = { getAll, getSingle, createDirector, updateDirector, deleteDirector };