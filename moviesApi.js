async function getMovies(value) {
	try {
		const res = await axios({
			method: 'GET',
			url: 'http://api.tvmaze.com/search/shows',
			params: {
				q: value,
			},
		});
		if (res.data) {
			return res.data;
		} else {
			return null;
		}
	} catch (err) {
		console.log(err.message);
	}
}

async function getCastByShowId(id) {
	try {
		const res = await axios({
			method: 'GET',
			url: `http://api.tvmaze.com/shows/${id}/cast`,
		});
		if (res.data) {
			return res.data;
		} else {
			return null;
		}
	} catch (err) {
		console.log(err.message);
	}
}
