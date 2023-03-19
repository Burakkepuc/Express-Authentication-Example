require('dotenv').config();
const jwt  = require('jsonwebtoken');
const users = require('../api/db'); // users.js dosyasını dahil et

 function generateAccessToken(user) {
  return jwt.sign(user,process.env.ACCESS_TOKEN_KEY,{expiresIn:'15m'})
}

 function generateRefreshToken(user) {
  return jwt.sign(user,process.env.REFRESH_TOKEN_KEY,{expiresIn:'3d'})
}

const verifyToken = (req,res,next) => {
  try {
    // Session'ın içinde access token var mı bak 
    const accessToken = req.session.accessToken;
    if(!accessToken) return res.status(401).json('You are not authenticated!');

    // Access token varsa verify et
    jwt.verify(accessToken,process.env.ACCESS_TOKEN_KEY,(err,user) => {
      // Access token doğrulanmadıysa refresh token var mı bak
      if(err) {
        // user'a db'den bak
        const user = users.find(u => u.id === req.session.userId);
          if(!user) {
          return res.status(401).send('User not found!');
        }
        
        // refresh token var mı bak db'den
        const refreshToken = user.refreshToken;
        if(!refreshToken){
        return res.status(401).send('No Refresh Token.');
        }
        // refresh token varsa verify et
          jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY,(err2,user2) => {
          if(err2){
              return res.status(401).send('Invalid Refresh Token.');
          }

          // Refresh token geçerliyse yeni bir access token oluştur
            const newAccessToken = generateAccessToken({userId:user.id});
            req.session.accessToken = newAccessToken;
            req.user = user2;
            next();
          });
      }else{
        // Access token doğrulandı
        req.user = user;
        next();
      }
    })
    }catch(error){
    		return res.status(401).send(error.message);

    }
  }

module.exports = {generateAccessToken,generateRefreshToken,verifyToken}

