const validator = require('../helpers/validate');

//validate movies data
const saveMovie = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    language: 'required|string',
    release_date: 'required|date',
    rating: 'required|string|max:5',
    production_company: 'required|string',
    //budget: ['regex:/^\$(?!0\.00)[1-9]\d{0,2}(,\d{3})*(\.\d\d)?$/'],
    //budget: ['regex:/^\$(?!0\.00)[1-9]\[0-9]{0,2}(,\[0-9]{3})*(\.\[0-9]\[0-9])?$/'],
    budget: ['regex:/^\\$?-?(((\\d{1,3},?)(\\d{3},?)+|\\d{1,3})|\\d+)(\\.\\d{1,2})?$/'],
    runtime: ['regex:/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
    origen_country: 'required|string'

  };
  //console.log(req.body.budget);
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

//validate directors data
const saveDirector = (req, res, next) => {
    const validationRule = {
      first_name: ['required', 'regex:/^[a-zA-Z]+$/', 'min:2'],
      last_name: ['required', 'regex:/^[a-zA-Z]+$/', 'min:2']
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

//validate genre data
const saveGenre = (req, res, next) => {
    const validationRule = {
      genre: ['required', 'regex:/^[a-zA-Z]+$/', 'min:3']
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };


module.exports = {
  saveMovie,
  saveDirector,
  saveGenre
};