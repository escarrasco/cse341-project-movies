const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//return all movies
const getAll = async (req, res, next) => {
  try{
    const result = await mongodb.getDb().db().collection('movies').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  }  catch (err){
    res.status(500).json({message: err.message});
  }
};

// return an specific movie by id
const getSingle = async (req, res, next) => {
  try{
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('movies')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err){
    res.status(500).json(err);
  }
  
};

//create a movie
const createMovie = async (req, res, next) => {
  try{
    const movie = {
      title: req.body.title,
      language: req.body.language,
      release_date: req.body.release_date,
      rating: req.body.rating,
      origen_country: req.body.origen_country,
      production_company: req.body.production_company,
      budget: req.body.budget,
      runtime: req.body.runtime
    };
    const response = await mongodb.getDb().db().collection('movies').insertOne(movie);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the movie.');
    }
  } catch (err){
    res.status(500).json(err);
  }
};


//update a movie
const updateMovie = async (req, res, next) => {
  try{
    const userId = new ObjectId(req.params.id);
    const movie = {
      title: req.body.title,
      language: req.body.language,
      release_date: req.body.release_date,
      rating: req.body.rating,
      origen_country: req.body.origen_country,
      production_company: req.body.production_company,
      budget: req.body.budget,
      runtime: req.body.runtime
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('movies')
      .replaceOne({ _id: userId }, movie);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the movie.');
    }
  } catch (err){
    res.status(500).json(err);
  }
};


//delete a movie
const deleteMovie = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
                      .getDb()
                      .db()
                      .collection('movies')
                      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the movie.');
    }
  } catch (err){
    res.status(500).json(err);
  }
};

module.exports = { getAll, getSingle, createMovie, updateMovie, deleteMovie };