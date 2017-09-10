exports.install = function() {
    // F.route('/login/github/', oauth_login, ['unauthorize']);
    // F.route('/login/github/callback/', oauth_login_callback, ['unauthorize']);
    // F.route('/login/facebook/', oauth_login, ['unauthorize']);
    // F.route('/login/facebook/callback/', oauth_login_callback, ['unauthorize']);
    F.route('/api/login/google/', oauth_login, ['unauthorize']);
    F.route('/api/login/google/callback/', oauth_login_callback, ['unauthorize']);
}

// Controller action
function oauth_login() {
    var self = this;
    var type = self.req.path[2];

    // config:
    // oauth2.google.key =
    // oauth2.google.secret =
    // oauth2.github.key =
    // oauth2.github.secret =
    // ...

    MODULE('oauth2').redirect(type, CONFIG('oauth2.' + type + '.key'), self.host('/api/login/' + type + '/callback/'), self);
}

// Controller action
function oauth_login_callback() {
    var self = this;
    var type = self.req.path[2];
    var url = self.host('/api/login/' + type + '/callback/');

    // config:
    // oauth2.google.key =
    // oauth2.google.secret =
    // oauth2.github.key =
    // oauth2.github.secret =
    // ...

    MODULE('oauth2').callback(type, CONFIG('oauth2.' + type + '.key'), CONFIG('oauth2.' + type + '.secret'), url, self, function(err, profile, access_token) {
        // console.log(profile);

        //TODO: write google data to user database for notifications

        //TODO: if email from google === email from config then admin CONFIG('adminemail')

        //TODO: create login session for this user

        let user = {displayName: profile.displayName, email: profile.emails[0].value};




        self.json(SUCCESS(true));
    });
}