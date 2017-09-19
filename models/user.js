NEWSCHEMA('User').make(function (schema) {

    schema.define('uid', 'Number', true);
    schema.define('displayName', 'String', true);
    schema.define('email', 'Email', true);
    schema.define('image', 'String', true);
    schema.define('created', 'Date', true);
    schema.define('admin', 'Boolean', true);
    schema.define('isremoved', 'Boolean', true);


    schema.setQuery(function (error, options, callback) {

        // options.id
        // options.user
        // options.page
        // options.limit

        var sql = DB(error);

        sql.select('items', 'user').make(function (builder) {
            builder.where('isremoved', false);
            // builder.skip(options.page * options.limit);
            // builder.take(options.limit);
        });

        sql.exec(callback, 'items');
    });

    schema.setGet(function (error, model, options, callback) {

        // options.id
        // options.user

        var sql = DB(error);

        sql.select('item', 'user').make(function (builder) {
            builder.where('uid', options.id);
            builder.where('isremoved', false);
            builder.first();
        });

        sql.validate('item', 'notfound');
        sql.exec(callback);
    });

    schema.setSave(function (error, model, options, callback) {

        // options.id
        // options.user
        // console.log('save user');
        // console.log(options);
        // console.log(model);

        var sql = DB(error);

        sql.save('item', 'user', !options.uid, function (builder, newbie) {
            if (newbie) {
                options.uid = UID();
                options.created = F.datetime;
                options.isremoved = false;

                options.admin = options.email === CONFIG('adminemail');

                builder.set(options);
                return;
            }
            builder.where('uid', options.uid);
            builder.where('isremoved', false);
        });

        sql.validate('item', 'notfound');
        sql.exec(SUCCESS(callback), 'item');
    });

    schema.setRemove(function (error, options, callback) {

        // options.id
        // options.user

        var sql = DB(error);

        sql.update('item', 'user').make(function (builder) {
            builder.set('isremoved', true);
            builder.where('uid', options.id);
        });

        sql.validate('item', 'notfound');
        sql.exec(SUCCESS(callback), 'item');
    });

    schema.addWorkflow('emailStillExist', function (error, model, user, callback) {
        // console.log(user);

        var sql = DB(error);

        sql.select('item', 'user').make(function (builder) {
            builder.where('email', user.email);
            builder.and();
            builder.where('isremoved', false);
            builder.first();
        });

        sql.exec(function (err, response) {
            if (err || !response.item)
                callback(false);

            if (response.item)
                callback(response.item)
        });
    });


});
