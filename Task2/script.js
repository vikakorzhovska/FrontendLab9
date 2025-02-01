// Створюємо Enum для напрямку
const Direction = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical'
};

// Клас SliderRenderer
class SliderRenderer {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.slidesContainer = document.createElement('div');
        this.slides = [];
        this.direction = Direction.HORIZONTAL;  // Замінили рядок на Enum

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
        let slide = this.createSlide(content);
        this.slidesContainer.appendChild(slide);
        this.slides.push(slide);
    }

    createSlide(content) {
        let slide = document.createElement('div');
        slide.classList.add('slide');
        slide.style.width = '1000px';
        slide.style.height = '1000px';
        slide.style.display = 'flex';
        slide.style.alignItems = 'center';
        slide.style.justifyContent = 'center';
        slide.innerHTML = content;
        return slide;
    }

    setDirection(direction) {
        if (direction === Direction.HORIZONTAL) {
            this.slidesContainer.style.flexDirection = 'row';
        } else {
            this.slidesContainer.style.flexDirection = 'column';
        }
    }

    updateSlidePosition({ currentSlide, direction }) {
        const offset = currentSlide * 1000;
        this.slidesContainer.style.transform = direction === Direction.HORIZONTAL
            ? `translateX(-${offset}px)`
            : `translateY(-${offset}px)`;
    }
}

// Клас SliderController
class SliderController {
    constructor(renderer) {
        this.renderer = renderer;
        this.currentSlide = 0;
        this.direction = Direction.HORIZONTAL;  // Замінили рядок на Enum
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.renderer.slides.length;
        this.renderer.updateSlidePosition({ currentSlide: this.currentSlide, direction: this.direction });
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.renderer.slides.length) % this.renderer.slides.length;
        this.renderer.updateSlidePosition({ currentSlide: this.currentSlide, direction: this.direction });
    }

    toggleDirection() {
        this.direction = this.direction === Direction.HORIZONTAL ? Direction.VERTICAL : Direction.HORIZONTAL;
        this.renderer.setDirection(this.direction);
        this.renderer.updateSlidePosition({ currentSlide: this.currentSlide, direction: this.direction });
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
