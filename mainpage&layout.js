const contactDiv = document.querySelector('#contactDiv');
const popMenuIcon = document.querySelector('#popMenuDiv');
const inactiveMenu = document.querySelector('.popUpMenu');
const wave1 = document.querySelector('.custom-shape-divider-top-1632789334');
const wave2 = document.querySelector('.custom-shape-divider-bottom-1632789981');
const getStarted = document.querySelector('.getStartedDiv');
const linkedIn = document.querySelector('#linkedInDiv');
const gitHub = document.querySelector('#gitHub');
const email = document.querySelector('#email');
aux = -1;

// contactDiv.addEventListener('click', () => {
// 	positionPopMenu();
// 	inactiveMenu.style.display = 'flex';

// 	if (aux === -1) {
// 		removeInactivity(inactiveMenu);
// 	} else {
// 		addInactivity(inactiveMenu);
// 	}
// 	aux = aux * -1;
// });

const toggleMenu = () => {
	positionPopMenu();
	inactiveMenu.style.display = 'flex';

	if (aux === -1) {
		removeInactivity(inactiveMenu);
	} else {
		addInactivity(inactiveMenu);
	}
	aux = aux * -1;
};

contactDiv.addEventListener('click', toggleMenu);

const positionPopMenu = () => {
	inactiveMenu.style.left = `${contactDiv.getBoundingClientRect().left - 95}px`;
	inactiveMenu.style.top = `${
		contactDiv.getBoundingClientRect().bottom + 15
	}px`;
};

popMenuIcon.addEventListener('click', () => {
	positionPopMenuSmall();
	if (aux === -1) {
		removeInactivity(inactiveMenu);
	} else {
		addInactivity(inactiveMenu);
	}
	aux = aux * -1;
});

const positionPopMenuSmall = () => {
	inactiveMenu.style.left = `${
		popMenuIcon.getBoundingClientRect().left - 125
	}px`;
	inactiveMenu.style.top = `${
		popMenuIcon.getBoundingClientRect().bottom + 15
	}px`;
};

function removeInactivity(thing) {
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

// const positionGetStarted = () => {
// 	let altura = innerHeight / 2;
// 	getStarted.style.top = `${altura - 80}px`;
// };

// positionGetStarted();
