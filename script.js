// Scroll with Mouse
const container = document.querySelector('.container');
let isScrolling = false;

container.addEventListener('wheel', (event) => {
    event.preventDefault();
    clearTimeout(isScrolling);
  
    isScrolling = setTimeout(() => {
        const scrollAmount = event.deltaY;
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }, 100);
});

// Animations
const observer = new IntersectionObserver((enteries) => {
    enteries.forEach((entery) => {
        if(entery.isIntersecting){
            entery.target.classList.add('fade');
        }else{
            entery.target.classList.remove('fade');
        }
    })
})

const hiddenElements = document.querySelectorAll('.animation-fade');
hiddenElements.forEach((element) => {
    observer.observe(element);
})