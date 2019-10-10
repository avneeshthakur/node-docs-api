const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'docs-api-secret';

//generate hash password
const generateHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash  = await bcrypt.hash(password, salt); 
    return hash;
};

//check hash password
const checkHashPassword = async (password, user) => {
   const isMatch = await bcrypt.compare(password, user.password);     
   return isMatch;
};

// generate JWT token
const generateAuthToken = async ({_id, email}) => {
 let payload = { id:_id, email };
 let token = await jwt.sign(payload, secret, { expiresIn: '1d' });
 return token;
}

module.exports = {
	generateHashPassword,
	checkHashPassword,
	generateAuthToken
}