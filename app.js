const input = document.querySelector('.input');
const button = document.querySelector('.search-button');
const moviesContainer = document.querySelector('.movies-container');
const popup = document.querySelector('.popup');
const popupBtn = document.querySelector('.popup-close-btn');

window.onclick = function (event) {
	if (event.target === popup) {
		popup.style.display = 'none';
	}
};

popupBtn.addEventListener('click', function () {
	popup.style.display = 'none';
});

button.addEventListener('click', async function () {
	if (input.value !== '') {
		const res = await getMovies(input.value);
		console.log(res);
		if (res.length) {
			const movies = res
				.map((movie) => {
					return `
                            <div class="movie-container">
                                <img class="movie-image" src="${
																	movie.show.image ? movie.show.image.medium : '#'
																}"/>
                                <p class="movie-name">${movie.show.name}</p>
                            </div>`;
				})
				.join('');
			moviesContainer.innerHTML = movies;
			const movieItems = moviesContainer.querySelectorAll('.movie-container');
			for (let i = 0; i < movieItems.length; i++) {
				movieItems[i].setAttribute('id', res[i].show.id);
				movieItems[i].setAttribute('onCLick', `onMovieClick(this)`);
			}
		} else {
			alert('No Movies founds');
			input.value = '';
		}
	}
});

async function onMovieClick(item, data) {
	const castContainer = document.querySelector('.cast-container');

	popup.style.display = 'block';
	const res = await getCastByShowId(item.id);
	console.log(res);
	if (res.length) {
		const characters = res
			.map((char) => {
				const { character, person } = char;
				return `
                    <div class="character-container">
                        <img src="${person.image ? person.image.medium : '#'}" alt="" />
                        <p>${person.name} <br/> as <br/> ${character.name}</p>
                    </div>`;
			})
			.join('');
		castContainer.innerHTML = characters;
	} else {
		castContainer.innerHTML = '';
	}
}
