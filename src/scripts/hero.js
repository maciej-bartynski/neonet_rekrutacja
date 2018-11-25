export class HeroSlider {
    constructor() {

        this.angles = [
            document.querySelector('.switches__angle--left'),
            document.querySelector('.switches__angle--right')
        ];

        this.dotsBelt = document.querySelector('.switches__dots');
        this.dots = [];

        this.slider = document.querySelector('.banner__slider');
        this.banners = document.querySelectorAll('.banner__item');
        this.slidePositions = this.banners.length;
        this.maxPositionIndex = -(this.slidePositions - 1);
        this.currentPositionIndex = 0;
        this.direction = -1;
        this.timeBetweenSlides = 24000;
        this.timer = setInterval(() => {
            this.slide()
        }, this.timeBetweenSlides);

        this.printBanner();
        this.printDots();
        this.angleClick(-1);
        this.angleClick(1);
        this.dotClick();
        this.swipeEvent();

    }

    swipeEvent() {
        var touchEnded, touchStarted;
        let touchArea = document.querySelector('.switches');
        touchArea.addEventListener('touchstart', e => handleTouchStart(e), false);
        touchArea.addEventListener('touchend', e => handleTouchEnd(e), false);
        const handleTouchStart = (e) => {
            touchStarted = e.touches[0].clientX;
        };

        const handleTouchEnd = (e) => {
            touchEnded = e.changedTouches[0].clientX;
            if (touchStarted - touchEnded > 20) {
                this.actionOnAngleClickOrSwipe(-1);
            } else if (touchStarted - touchEnded < -20) {
                this.actionOnAngleClickOrSwipe(1);
            }
        }
    }

    actionOnAngleClickOrSwipe(dir) {
        this.direction = dir;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.slide()
        }, this.timeBetweenSlides);
        if (dir === -1 && this.currentPositionIndex === this.maxPositionIndex) {
            this.banners[this.currentPositionIndex * -1].classList.add('banner__item--slide-fail');
            setTimeout(() => {
                this.banners[this.currentPositionIndex * -1].classList.remove('banner__item--slide-fail')
            }, 100);
            return;
        } else if (dir === 1 && this.currentPositionIndex === 0) {
            this.banners[this.currentPositionIndex * -1].classList.add('banner__item--slide-fail');
            setTimeout(() => {
                this.banners[this.currentPositionIndex * -1].classList.remove('banner__item--slide-fail')
            }, 100);
            return;
        }
        this.slide();
    }

    angleClick(dir) {
        let currentAngle = dir === 1 ? this.angles[1] : this.angles[0];
        currentAngle.addEventListener('click', () => {
            this.actionOnAngleClickOrSwipe(dir)
        });
    }

    dotClick() {
        this.dots.forEach((item, idx) => {
            item.addEventListener('click', () => {
                clearInterval(this.timer);
                this.currentPositionIndex = -idx + (this.direction * -1);
                this.slide();
                this.timer = setInterval(() => {
                    this.slide()
                }, this.timeBetweenSlides);
            });
        })
    }

    slide() {
        this.direction = this.currentPositionIndex === this.maxPositionIndex ? 1 : this.direction;
        this.direction = this.currentPositionIndex === 0 ? -1 : this.direction;
        this.currentPositionIndex = this.currentPositionIndex + this.direction;
        this.slider.style.left = `${(this.currentPositionIndex)*100}vw`;

        this.markCurrentDot();
    }

    markCurrentDot() {
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].classList.remove('switches__dot--active');
        }
        this.dots[this.currentPositionIndex * -1].classList.add('switches__dot--active');
    }

    printBanner(){
        this.slider.style.width = `${this.slidePositions*100}vw`;
    }

    printDots() {
        let dotsAmount = this.slidePositions;
        for (let i = 0; i < dotsAmount; i++) {
            let dot = document.createElement('DIV');
            dot.classList.add('switches__dot');
            if (i === 0) dot.classList.add('switches__dot--active');
            this.dotsBelt.appendChild(dot);
            this.dots.push(dot);
        }
    }
}