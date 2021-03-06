const jwt = require('jsonwebtoken');
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
          if (result) {
            const token = jwt.sign(
              { email: user.email, id: user.id }, 'mySecretKey', { expiresIn: '1h' }
            );
            return res.status(200).json({
              message: 'Login Successful !',
              token: token
            })
          }
          else {
            res.status(400).json({
              message: 'Password Not Matched',
              err: err
            })
          }
        }
        catch (error) {
          console.log('ERROR AT SIGN IN (INNER FUNCTION', error)
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

// Get a USER
exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id)
    if (!user) {
      return res.status(401).json({
        message: `No user found.`
      });
    }
    else {
      return res.status(201).json({
        message: `User with Id (${id}) = `, user
      });
    }

  }
  catch (error) {
    console.log("ERROR AT GET A USER = ", error)
    return res.status(401).json({
      message: 'Error at Get A User !',
      error: error,
    });
  }
};

// Get all USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(201).json({
      message: 'All Users : ', users
    });
  }
  catch (error) {
    console.log("ERROR AT GET ALL USERS = ", error)
    return res.status(401).json({
      message: 'Error at Get All Users !',
      error: error,
    });
  }
};

// Edit User
exports.edit = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: 'Fill the required fileds.'
      })
    }
    else {
      const update = await User.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          role: req.body.role,
        }
      );
      if (update) {
        return res.status(200).json({
          message: 'Data Updated Successfully !'
        })
      }
      else {
        return res.status(400).json({
          message: 'User Not Found !'
        })
      }
    }
  }
  catch (error) {
    console.log("ERROR AT EDIT USER = ", error)
    return res.status(401).json({
      message: 'Error at Edit User !',
      error: error,
    });
  }
};

// Delete User
exports.delete = async (req, res) => {
  try {
    if (await User.findByIdAndDelete(req.params.id)) {
      return res.status(200).json({
        message: 'User Deleted Successfully !'
      })
    }
    else {
      return res.status(200).json({
        message: 'User Not Found !'
      })
    }
  }
  catch (error) {
    console.log("ERROR AT DELETE USER = ", error)
    return res.status(401).json({
      message: 'Error at Delete User.',
      error: error,
    });
  }
};


