const usersControllers=require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto')

const checkUsersCredentials = async (email, password) => {
try {
    const user= await usersControllers.findUserByEmail(email)
    const userPassword= comparePassword(password, user.password)
    if(userPassword){
        return user
    }else{
        return false
    }
} catch (error) {
    return error
}
}

module.exports = checkUsersCredentials