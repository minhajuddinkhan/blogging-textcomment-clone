

function mongoose({db},{mongoose}) {
    mongoose.Promise = global.Promise;
    mongoose.connect(db.connectionString);
    let dbConString = mongoose.connection;
    dbConString.on('error', console.error.bind(console, 'Error in Connection :: Cannot Connect to ' + db.name));
    dbConString.once('open', function () {
        console.log('Successfull Connected to Database ', db.name);
    });

}

module.exports = mongoose;