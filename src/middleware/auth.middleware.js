const {ExtractJwt, Strategy}= require('passport-jwt')
const passport= require('passport')

const userControllers= require('../users/users.controllers')
const config= require('../../config').api

const passportConfigs={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

passport.use(new Strategy(passportConfigs, (tokenDecoded, done)=>{
    userControllers.findUserById(tokenDecoded.id)
    .then(data=>{
        if(data){
            done(null, tokenDecoded)
        }else{
            done(null, false, {message:'Token Incorrect, try Again!'})
        }
    })
    .catch(error=>{
        done(error, false)
    })
}))

module.exports = passport.authenticate('jwt', {session:false})