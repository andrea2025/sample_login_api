module.exports = (req,res,next) =>{
    if(req.session.loggedIn){
        next();
    }else {
        return res.status(401).send('you are not logged in');
    }
}