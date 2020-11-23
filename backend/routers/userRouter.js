import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    let srvproviderid = (Object.keys(req.body.socialresponse).length !== 0 && req.body.socialresponse.providerid)?req.body.socialresponse.providerid:"indiatalks";
    //const user = await User.findOne({ email: req.body.email });
    let user = await User.findOne({
      $and: [
        { email: req.body.email },
        { providerid: srvproviderid },
      ],
    });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isHost:user.isHost,
          image:user.image,
          token: generateToken(user),
        });
        return;
      }
    } else if (Object.keys(req.body.socialresponse).length !== 0) {
      console.log("request body=====",req.body);
      const user = new User({
        name: req.body.socialresponse.name,
        email: req.body.socialresponse.email,
        providerid: req.body.socialresponse.providerid,
        password: bcrypt.hashSync(req.body.socialresponse.token, 8),
        image: req.body.socialresponse.image,
      });
    

    const createdUser = await user.save(function(err) {
      //winston.log('debug', 'save');
      if (err) {
        //winston.log('debug', err);
        console.log("error===",err);
        
      }
    });
      console.log("created user=====",createdUser);
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isHost: createdUser.isHost,
        token: generateToken(createdUser),
        image: createdUser.image,
      });
      return;
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  '/socialmediasignin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.socialmediaresponse.email });
    if(user){
console.log("user exists",user,"and request object====",req.body.socialmediaresponse);
    }else{
      const user = new User({
        name: req.body.socialmediaresponse.name,
        email: req.body.socialmediaresponse.email,
        providerid:req.body.socialmediaresponse.providerid,
        password: bcrypt.hashSync(req.body.socialmediaresponse.token, 8),
        image:req.body.socialmediaresponse.image
      });
      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isHost:createdUser.isHost,
        token: generateToken(createdUser),
        image:createdUser.image
      });
    }
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);
export default userRouter;
