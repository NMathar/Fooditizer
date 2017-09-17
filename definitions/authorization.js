F.on('module#auth', function(type, name) {
    let auth = MODULE('auth');
    auth.onAuthorize = function(id, callback, flags) {

        // - this function is cached
        // - here you have to read user information from a database
        // - insert the user object into the callback (this object will be saved to session/cache)

        let nosql = DB();

        nosql.select('user', 'user').make(function (builder) {
            builder.where('uid', id);
            builder.and();
            builder.where('isremoved', false);
            builder.first();
            // builder.skip(options.page * options.limit);
            // builder.take(options.limit);
        });

        nosql.exec(callback, 'user');
    };
});