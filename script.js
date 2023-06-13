// Scroll with Mouse
const container = document.querySelector('.container');
const sections = document.querySelectorAll('.container > section');
let isScrolling = false;

container.addEventListener('wheel', (event) => {
  event.preventDefault();
  clearTimeout(isScrolling);

  isScrolling = setTimeout(() => {
    const scrollAmount = event.deltaY;

    const currentScrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (scrollAmount < 0 && currentScrollLeft === 0) {
      container.scrollLeft = maxScrollLeft;
    } else if (scrollAmount > 0 && currentScrollLeft === maxScrollLeft) {
      const observer = new IntersectionObserver((entries) => {
        const lastSection = entries[0];
        if (lastSection.isIntersecting) {
          container.scrollLeft = 0;
          observer.disconnect();
        }
      });
      observer.observe(sections[sections.length - 1]);
    } else {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, 100);
});

//Arrows
const leftArrows = document.querySelectorAll('.left-arrow');
const rightArrows = document.querySelectorAll('.right-arrow');

leftArrows.forEach((arrow, index) => {
  arrow.addEventListener('click', () => {
    const sectionWidth = container.clientWidth;
    let targetScrollLeft = container.scrollLeft - sectionWidth;
    if(index == 0){
        targetScrollLeft = container.scrollLeft + sections[2].offsetLeft;
    }
    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  });
});

rightArrows.forEach((arrow, index) => {
  arrow.addEventListener('click', () => {
    const sectionWidth = container.clientWidth;
    let targetScrollLeft = container.scrollLeft + sectionWidth;
    if(index == 2){
        targetScrollLeft = container.scrollLeft + sections[2].offsetRight;
    }
    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  });
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