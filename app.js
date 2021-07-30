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

let moviesRes;

button.addEventListener('click', async function () {
	if (input.value !== '') {
		moviesRes = await getMovies(input.value);
		if (moviesRes.length) {
			const movies = moviesRes
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
				movieItems[i].setAttribute('id', moviesRes[i].show.id);
				movieItems[i].setAttribute('onCLick', `onMovieClick(this)`);
				movieItems[i].setAttribute('index', `${i}`);
			}
		} else {
			alert('No Movies founds');
			input.value = '';
		}
	}
});

async function onMovieClick(item) {
	popup.style.display = 'block';
	const castContainer = document.querySelector('.cast-container');
	const popUpContent = document.querySelector('.popup-content');

	const index = item.getAttribute('index');

	const res = await getCastByShowId(item.id);

	if (res) {
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
		const { show } = moviesRes[index];
		popUpContent.innerHTML = `
	    <h2 class>${show.name}</h2>
	    <img src=${show.image ? show.image.medium : '#'} alt="" />
	    <a href=${show.url ? show.url : 'N/A'}>link</a>
	    <p>${show.genres ? 'Genres: ' + show.genres.join(',') : ''}</p>
	    ${show.summary}
	    <div class="cast-container">
         ${characters}
        </div>
	`;
	} else {
		castContainer.innerHTML = '';
	}
}
