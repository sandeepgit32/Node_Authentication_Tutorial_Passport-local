module.exports = function(app, passport){
	app.get('/', function(req,res){
	res.render('index.ejs');
	});

	app.get('/login', function(req, res){
		res.render('login.ejs', {message: req.flash('loginFailureMessage')});
	});

	app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

	app.get('/signup', function(req,res){
		res.render('signup.ejs', {message: req.flash('signupFailureMessage')});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true,
	}));

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', {user: req.user});
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

};

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}