const paragraphs = document.querySelectorAll('p');
delay = 0;
for (let i = 0; i < paragraphs.length; i++) {
	paragraphs[i].classList.add('fade-in');
	paragraphs[i].style.animationDelay = `${delay}s`;
	delay = delay + 0.05;
}
