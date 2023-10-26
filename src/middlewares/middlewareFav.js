exports.favVerify = (req, res, next) => {
	try {
		if (req.body.fav) {
		}
		next();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
