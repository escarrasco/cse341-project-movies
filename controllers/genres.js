const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//return all genres
const getAll = async (req, res, next) => {
  try{
    const result = await mongodb.getDb().db().collection('genres').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  }  catch (err){
    res.status(500).json({message: err.message});
  }
};

// return an specific genre by id
const getSingle = async (req, res, next) => {
  try{
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('genres')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err){
    res.status(500).json(err);
  }
  
};

//create a genre
const createGenre = async (req, res, next) => {
  try{
    const genre = {
      genre: req.body.genre
    };
    const response = await mongodb.getDb().db().collection('genres').insertOne(genre);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the genre.');
    }
  } catch (err){
    res.status(500).json(err);
  }
};


//update a genre
const updateGenre = async (req, res, next) => {
  try{
    const userId = new ObjectId(req.params.id);
    const genre = {
      genre: req.body.genre
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('genres')
      .replaceOne({ _id: userId }, genre);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the genre.');
    }
  } catch (err){
    res.status(500).json(err);
  }
};


//delete a genre
const deleteGenre = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
                      .getDb()
                      .db()
                      .collection('genres')
                      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the genre.');
    }
  } catch (err){
    res.status(500).json(err);
  }
};

module.exports = { getAll, getSingle, createGenre, updateGenre, deleteGenre };