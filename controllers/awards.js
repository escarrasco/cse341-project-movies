const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//return all awards
const getAll = async (req, res, next) => {
  try{
    const result = await mongodb.getDb().db().collection('awards').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  }  catch (err){
    res.status(500).json({message: err.message});
  }
};

// return an specific award by id
const getSingle = async (req, res, next) => {
  try{
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('awards')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err){
    res.status(500).json(err);
  }
  
};

//create a award
const createAward = async (req, res, next) => {
  try{
    const award = {
      title: req.body.title,
      country: req.body.country,
      first_awarded: req.body.first_awarded
    };
    const response = await mongodb.getDb().db().collection('awards').insertOne(award);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the award.');
    }
  } catch (err){
    res.status(500).json(err);
  }
};


//update a award
const updateAward = async (req, res, next) => {
  try{
    const userId = new ObjectId(req.params.id);
    const award = {
      title: req.body.title,
      country: req.body.country,
      first_awarded: req.body.first_awarded
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('awards')
      .replaceOne({ _id: userId }, award);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the award.');
    }
  } catch (err){
    res.status(500).json(err);
  }
};


//delete a award
const deleteAward = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
                      .getDb()
                      .db()
                      .collection('awards')
                      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the award.');
    }
  } catch (err){
    res.status(500).json(err);
  }
};

module.exports = { getAll, getSingle, createAward, updateAward, deleteAward };