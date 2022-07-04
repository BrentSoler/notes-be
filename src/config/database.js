const mongoose = require("mongoose");

const DBCONN = async () => {
	try {
		const conn = mongoose.connect(process.env.DB_DEVURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

module.exports = DBCONN;
