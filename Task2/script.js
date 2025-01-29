class SliderRenderer {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.slidesContainer = document.createElement('div');
        this.slides = [];

        this.setupSlider();
    }

    setupSlider() {
        this.container.classList.add('slider');
        this.container.style.overflow = 'hidden';
        this.container.style.width = '1000px';
        this.container.style.height = '1000px';

        this.slidesContainer.style.display = 'flex';
        this.slidesContainer.style.transition = 'transform 0.5s ease';
        this.container.appendChild(this.slidesContainer);
    }

    addSlide(content) {
        let slide = document.createElement('div');
        slide.classList.add('slide');
        slide.style.width = '1000px';
        slide.style.height = '1000px';
        slide.style.display = 'flex';
        slide.style.alignItems = 'center';
        slide.style.justifyContent = 'center';
        slide.innerHTML = content;
        this.slidesContainer.appendChild(slide);
        this.slides.push(slide);
    }

    setDirection(direction) {
        this.slidesContainer.style.flexDirection = direction === 'horizontal' ? 'row' : 'column';
    }

    updateSlidePosition(currentSlide, direction) {
        const offset = currentSlide * 1000;
        this.slidesContainer.style.transform = direction === 'horizontal'
            ? `translateX(-${offset}px)`
            : `translateY(-${offset}px)`;
    }
}

class SliderController {
    constructor(renderer) {
        this.renderer = renderer;
        this.currentSlide = 0;
        this.direction = 'horizontal';
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.renderer.slides.length;
        this.renderer.updateSlidePosition(this.currentSlide, this.direction);
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.renderer.slides.length) % this.renderer.slides.length;
        this.renderer.updateSlidePosition(this.currentSlide, this.direction);
    }

    toggleDirection() {
        this.direction = this.direction === 'horizontal' ? 'vertical' : 'horizontal';
        this.renderer.setDirection(this.direction);
        this.renderer.updateSlidePosition(this.currentSlide, this.direction);
    }
}

let sliderRenderer = new SliderRenderer('#sliderContainer');
let sliderController = new SliderController(sliderRenderer);
sliderRenderer.addSlide('<img src="images/photo1.jpg" alt="Slide 1">');
sliderRenderer.addSlide('<img src="images/photo2.jpg" alt="Slide 2">');
sliderRenderer.addSlide('<img src="images/photo3.jpg" alt="Slide 3">');
sliderRenderer.addSlide('<img src="images/photo4.jpg" alt="Slide 4">');
sliderRenderer.addSlide('<img src="images/photo5.jpg" alt="Slide 5">');
sliderRenderer.addSlide('<img src="images/photo6.jpg" alt="Slide 6">');
sliderRenderer.addSlide('<img src="images/photo7.jpg" alt="Slide 7">');
sliderRenderer.addSlide('<img src="images/photo8.jpg" alt="Slide 8">');


document.querySelector('#nextButton').addEventListener('click', () => sliderController.nextSlide());
document.querySelector('#prevButton').addEventListener('click', () => sliderController.prevSlide());
document.querySelector('#toggleButton').addEventListener('click', () => sliderController.toggleDirection());