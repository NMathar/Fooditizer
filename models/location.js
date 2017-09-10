NEWSCHEMA('Location').make(function(schema) {

	schema.define('uid', 'String', true);
	schema.define('name', 'String', true);
	schema.define('created', 'Date', true);
	schema.define('isremoved', 'Boolean', true);

	schema.setQuery(function(error, options, callback) {

		// options.id
		// options.user
		// options.page
		// options.limit

		var sql = DB(error);

		sql.select('items', 'location').make(function(builder) {
			builder.where('isremoved', false);
			// builder.skip(options.page * options.limit);
			// builder.take(options.limit);
		});

		sql.exec(callback, 'items');
	});

	schema.setGet(function(error, model, options, callback) {

		// options.id
		// options.user

		var sql = DB(error);

		sql.select('item', 'location').make(function(builder) {
			builder.where('uid', options.id);
			builder.where('isremoved', false);
			builder.first();
		});

		sql.validate('item', 'notfound');
		sql.exec(callback);
	});

	schema.setSave(function(error, model, options, callback) {

		// options.id
		// options.user

		var sql = DB(error);

		sql.save('item', 'location', !options.id, function(builder, newbie) {
			if (newbie) {
				builder.set('datecreated', F.datetime);
				return;
			}
			builder.where('uid', options.id);
			builder.where('isremoved', false);
		});

		sql.validate('item', 'notfound');
		sql.exec(SUCCESS(callback), 'item');
	});

	schema.setRemove(function(error, options, callback) {

		// options.id
		// options.user

		var sql = DB(error);

		sql.update('item', 'location').make(function(builder) {
			builder.set('isremoved', true);
			builder.where('uid', options.id);
		});

		sql.validate('item', 'notfound');
		sql.exec(SUCCESS(callback), 'item');
	});

});
