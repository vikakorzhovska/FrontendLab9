class Slider {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.slidesContainer = document.createElement('div');
        this.slides = [];
        this.currentSlide = 0;
        this.direction = 'horizontal';

        this.currentSlider();
    }

    currentSlider() {
        this.container.classList.add('slider');
        this.container.style.overflow = 'hidden';
        this.container.style.width = '1000px';
        this.container.style.height = '1000px';

        this.slidesContainer.style.display = 'flex';
        this.slidesContainer.style.transition = 'transform 0.5s ease';
        this.container.appendChild(this.slidesContainer);

        this.updateSliderDirection();
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

    toggleDirection() {
        this.direction = this.direction === 'horizontal' ? 'vertical' : 'horizontal';
        this.updateSliderDirection();
        this.updateSlidePosition();
    }

    updateSliderDirection() {
        this.slidesContainer.style.flexDirection = this.direction === 'horizontal' ? 'row' : 'column';
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlidePosition();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlidePosition();
    }

    updateSlidePosition() {
        const offset = this.currentSlide * 1000;
        if (this.direction === 'horizontal') {
            this.slidesContainer.style.transform = `translateX(-${offset}px)`;
        } else {
            this.slidesContainer.style.transform = `translateY(-${offset}px)`;
        }
    }
}

let slider = new Slider('#sliderContainer');
slider.addSlide('<img src="images/photo1.jpg" alt="Slide 1">');
slider.addSlide('<img src="images/photo2.jpg" alt="Slide 2">');
slider.addSlide('<img src="images/photo3.jpg" alt="Slide 3">');
slider.addSlide('<img src="images/photo4.jpg" alt="Slide 4">');
slider.addSlide('<img src="images/photo5.jpg" alt="Slide 5">');
slider.addSlide('<img src="images/photo6.jpg" alt="Slide 6">');
slider.addSlide('<img src="images/photo7.jpg" alt="Slide 7">');
slider.addSlide('<img src="images/photo8.jpg" alt="Slide 8">');

document.querySelector('#nextButton').addEventListener('click', () => slider.nextSlide());
document.querySelector('#prevButton').addEventListener('click', () => slider.prevSlide());
document.querySelector('#toggleButton').addEventListener('click', () => slider.toggleDirection());
