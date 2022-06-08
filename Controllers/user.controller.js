const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../Models/user.model')

// USER Sign Up
exports.signUp = async (req, res) => {
  try {
    // Validate Body
    if (!req.body) {
      return res.status(400).json({
        message: 'Enter required fileds.'
      });
    };

    // Else Check if the email already exist
    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
      return res.status(400).json({
        message: 'User with this email already exist !'
      });
    }

    else {
      bcrypt.hash(req.body.password, 8, async (err, hash) => {
        try {
          if (err) {
            console.log('ERROR AT BCRYPT = ', err);
            res.status(400).json({
              message: 'Error at BCRYPT !',
              err: err
            })
          }
          else {
            const user = await new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              role: req.body.role,
            });
            let userSaved = await user.save();
            return res.status(201).json({
              message: 'Sign Up is Successful', userSaved
            });
          }
        }
        catch (error) {
          return res.status(401).json({
            message: 'Error at Sign Up (Inner Function) !',
            error: error,
          });
        }
      })
    }
  }
  catch (error) {
    console.log("ERROR AT SIGN UP = ", error)
    return res.status(401).json({
      message: 'Error at Sign Up !',
      error: error,
    });
  }
};

// USER Log In
exports.login = async (req, res) => {
  try {
    // Validate Body
    if (!req.body) {
      res.status(400).json({
        message: 'Enter required fields.'
      });
    }

    // Check if the email exist or not
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      bcrypt.compare(req.body.password, user.password, async (err, result) => {
        try {
          if (err) {
            res.status(400).json({
              message: 'Error at Bcrypt Compare',
              err: err
            })
          }
          else {
            const token = await jwt.sign(
              { email: result.email }, 'mySecretKey', { expiresIn: '1h' }
            );
            return res.status(200).json({
              message: 'Login Successful !',
              token: token
            })
          }
        }
        catch (error) {
          res.status(401).json({
            message: 'Error at Sign In (Inner Function) !',
            error: error
          });
        }
      });
    }
    else {
      res.status(400).json({
        message: 'User with this email does not exist. Sign Up first.'
      });
    }

  }
  catch (error) {
    console.log("ERROR AT LOG IN = ", error)
    return res.status(401).json({
      message: 'Error at Log In !',
      error: error,
    });
  }
};