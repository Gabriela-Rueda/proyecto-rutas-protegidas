const checkUsersCredentials= require('./auth.controllers')
const response=require('../utils/responses.handler')
const jwt= require('jsonwebtoken')
const config=require('../../config').api

const Login=(req, res)=>{
    const {email, password}= req.body 
    checkUsersCredentials(email, password)
    .then(data=>{
        if(data){
            const token=jwt.sign({
                id:data.id,
                email:data.email,
                firtsName:data.firtsname,
                lastName:data.lastName
            }, config.jwtSecret,{
                expiresIn:'1d'
            })

            response.success({
                res,
                status:200,
                message:'Correct Credential, Welcome! here is your token',
                data:token
            })
        }else{
            response.error({
                res,
                status: 401,
                message: 'Wrong Credentials, try Again'
            })
        }
    })
    .catch(error=>{
        response.error({
            res,
            status:400,
            data:error,
            message:'Something bad happen'
        })
    })
}

module.exports= Login