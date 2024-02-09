import { User } from "../schema/user.js";

// get user by email
export async function getUser(req) {
  return User.findOne({ email: req.body.email })
}

// get user by token
export async function getUserByToken(token){
  return User.findOne({ token: token })
}

// add new user
export function newUser(user){
  return new User(user).save() ;
}

// activate account by activation token
export function getUserBytoken(req){
  return User.findOne({activationToken: req.params.token})
}

// validate User by session token
export function getUserSessionToken(sessionToken){
  return User.findOne({sessionToken: sessionToken})
}