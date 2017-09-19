exports.install = function () {
    F.route('/api/get/user', getUser)
    F.route('/api/logoff/', json_logoff, ['authorize']);
};


function getUser () {
    var self = this;
    self.json(self.user);


}

function json_logoff () {

    let self = this;
    let auth = MODULE('auth');
    let user = self.user;

    // remove cookie
    // remove user session
    // @controller {Controller}
    // @id {String}
    // console.log(user.uid);

    auth.logoff(self, user.uid);

    self.json(SUCCESS(true));
}
