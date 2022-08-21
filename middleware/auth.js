// helps with user auth, so people cant just by pass routes to site

module.exports = {
    ensureAuth: function(req, res, next){
        if (req.isAuthenticated()){
            return next()
        }else{
            res.redirect('/')
        }
    },
    ensureGuest: function(req, res, next){
        if(req.isAuthenticated()){
            res.redirect('/dashboard')
        }else{
            return next()
        }
    }
}