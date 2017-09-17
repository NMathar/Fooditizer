exports.install = function () {
    // F.route('/login/github/', oauth_login, ['unauthorize']);
    // F.route('/login/github/callback/', oauth_login_callback, ['unauthorize']);
    // F.route('/login/facebook/', oauth_login, ['unauthorize']);
    // F.route('/login/facebook/callback/', oauth_login_callback, ['unauthorize']);
    F.route('/api/login/google/', oauth_login, ['unauthorize', '*User']);
    F.route('/api/login/google/callback/', oauth_login_callback, ['unauthorize', '*User']);
}

// Controller action
function oauth_login () {
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
function oauth_login_callback () {
    let self = this;
    let type = self.req.path[2];
    let url = self.host('/api/login/' + type + '/callback/');

    // config:
    // oauth2.google.key =
    // oauth2.google.secret =
    // oauth2.github.key =
    // oauth2.github.secret =
    // ...

    MODULE('oauth2').callback(type, CONFIG('oauth2.' + type + '.key'), CONFIG('oauth2.' + type + '.secret'), url, self, function (err, profile, access_token) {
        // console.log(profile);

        //TODO: write google data to user database for notifications

        //TODO: if email from google === email from config then admin CONFIG('adminemail')


        if (profile) {
            let user = {
                displayName: profile.displayName,
                email: profile.emails[0].value,
                created: new Date(),
                isremoved: false
            };
            // console.log(user);
            // console.log('--------------------------');
            // self.user.displayname = profile.displayName;
            // self.user.email = profile.emails[0].value;

            // GETSCHEMA('User').workflow('emailStillExist', user, function (res) {
            //     console.log(res);
            // });

            $WORKFLOW('User', 'emailStillExist', user, function (err, res) {
                //TODO: double user create need to be fixt
                console.log('emailCheck---> ',res);
                // self.json({success: true});
                let auth = MODULE('auth');
                if (res) {
                    //auth user
                    auth.login(self, res.uid, res);
                    self.redirect('/about');
                } else {
                    //create new user
                    self.$save(user, function (err, res) {
                        user.uid = res.value.identity;
                        auth.login(self, res.value.identity, user);
                        self.redirect('/about');
                    })
                }
            });

            // console.log(self.user);
            // self.$workflow('emailStillExist', user, self.callback());
        }

    });
}

