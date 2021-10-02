// POSITION TITLE RIGHT ALONG IMAGE TOP SIDE
const currentTitle = document.querySelector('.currentTitle');
const currentResultImage = document.querySelector('.currentResultImage');
const searchBar = document.querySelector('.searchBar');
const searchButton = document.querySelector('.searchButton');
const searchingInputCopy = document.querySelector('.searchingInputCopy');
const writing = document.querySelector('.writing');
const loadingIcon = document.querySelector('.loadingIcon');
const loadingCards = document.querySelector('.loadingCards');
const showStatus = document.querySelector('.showStatus');
const showSummary = document.querySelector('.showSummary');
const showGenres = document.querySelector('.showGenres');
const closeCurrentResult = document.querySelector('.closeCurrentResult');
const searchResultsCurrent = document.querySelector('.searchResultsCurrent');
let bottomPosition;

const youShallNotPass = () => {
	bottomPosition = searchResultsCurrent.getBoundingClientRect().bottom;
	console.log(innerWidth);
	if (window.innerWidth >= 600) {
		if (bottomPosition < window.innerHeight) {
			window.scrollTo(0, 0);
		}
	} else {
		if (bottomPosition < window.innerHeight) {
			window.scrollTo(0, 450);
			console.log('funcion mobike');
		}
	}
};

// POSITION TITLE RIGHT ALONG IMAGE TOP SIDE

let wrt;

function searchBarLookUpdate() {
	searchButton.classList.toggle('searchButtonActive');
	searchBar.classList.toggle('searchBarActive');
	searchBar.value = '';
	clearInterval(wrt);
	wrt = setInterval(() => {
		writing.classList.toggle('inactiveOpacity');
	}, 500);
}

searchButton.addEventListener('click', () => {
	searchBarLookUpdate();
});

searchBar.addEventListener('focusout', () => {
	searchBarLookUpdate();
});

searchBar.addEventListener('keyup', isEnter);

function isEnter(e) {
	searchingInputCopy.innerHTML = `${searchBar.value}`;
	console.log(e.keyCode);
	if (e.keyCode === 13) {
		loadingIcon.classList.add('writingInactive');
		clearInterval(wrt);
		searchEngine();
		searchBarLookUpdate();
		clearInterval(wrt);
		writing.classList.add('inactiveOpacity');
	}
}

async function searchEngine() {
	try {
		deleteOnSearch();
		loadingIcon.classList.remove('writingInactive');
		const res = await axios.get(
			`https://api.tvmaze.com/search/shows?q=${searchBar.value}`
		);
		if (res.data.length != 0) {
			displayShows(res.data);
		} else {
			alert(`There are no search results for that`);
		}
		loadingIcon.classList.add('writingInactive');
		lowerWavePosition();
	} catch (err) {
		alert('Something went wrong');
	}
}

function displayShows(shows) {
	delay = 0;
	for (let result of shows) {
		a = document.createElement('A');
		a.href = '#';
		img = document.createElement('IMG');
		img.classList.add('loadedImg');
		if (result.show.image) {
			img.src = result.show.image.medium;
		} else {
			img.src =
				'https://it.gilson.com/pub/media/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/F/1/F172200_MAIN_Diamond-Blister-DL10-960-tips_11.jpg';
		}
		a.append(img);
		loadingCards.append(a);
		img.style.animationDelay = `${delay}s`;

		delay = delay + 0.05;

		img.addEventListener('click', () => {
			currentPhoto(result.show);
			if (window.innerWidth >= 600) {
				document.body.style.overflow = 'hidden';
			}
			window.addEventListener('scroll', youShallNotPass);
			removeInactive(searchResultsCurrent);
		});
	}
}

const lowerWave = document.querySelector(
	'.custom-shape-divider-bottom-1632789981'
);

const lowerWavePosition = () => {
	const footer = document.querySelector('.footerUpperSection');
	height = footer.getBoundingClientRect().top;
	lowerWave.style.top = `${height - 100}px`;
};

window.addEventListener('resize', lowerWavePosition);

lowerWavePosition();

const deleteOnSearch = () => {
	let child = loadingCards.lastElementChild;
	while (child) {
		loadingCards.removeChild(child);
		child = loadingCards.lastElementChild;
	}
};

function checkStatus(showParam, domCosa, show) {
	if (show[showParam]) {
		domCosa.innerHTML = show[showParam];
	} else {
		domCosa.innerHTML = 'N/A';
	}
}

function currentPhoto(show) {
	checkStatus('name', currentTitle, show);
	if (show.image) {
		currentResultImage.src = show.image.medium;
		setTimeout(() => {
			currentResultImage.src = show.image.original;
		}, 10);
	} else {
		currentResultImage.src =
			'https://it.gilson.com/pub/media/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/F/1/F172200_MAIN_Diamond-Blister-DL10-960-tips_11.jpg';
	}
	checkStatus('status', showStatus, show);
	checkStatus('summary', showSummary, show);
	checkStatus('genres', showGenres, show);
}

// OPEN AND CLOSE CURRENT RESULT

closeCurrentResult.addEventListener('click', () => {
	addInactivity(searchResultsCurrent);
	document.body.style.overflow = 'scroll';
	window.removeEventListener('scroll', youShallNotPass);
});

function removeInactive(thing) {
	thing.classList.remove('inactive');
	thing.classList.add('inactiveOpacity');
	setTimeout(() => {
		thing.classList.remove('inactiveOpacity');
	}, 10);
}

function addInactivity(thing) {
	thing.classList.add('inactiveOpacity');
	setTimeout(() => {
		thing.classList.add('inactive');
	}, 200);
}
