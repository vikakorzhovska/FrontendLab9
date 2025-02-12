class Modal {
    constructor() {
        this.modal = document.createElement('div');
        this.modal.classList.add('modal');

        this.header = document.createElement('div');
        this.header.classList.add('modal-header');
        this.modal.appendChild(this.header);

        this.content = document.createElement('div');
        this.content.classList.add('modal-content');
        this.modal.appendChild(this.content);

        this.closeButton = document.createElement('button');
        this.closeButton.innerText = 'Закрити';
        this.closeButton.onclick = () => this.close();
        this.modal.appendChild(this.closeButton);

        document.querySelector('#modalWindow').appendChild(this.modal);

        this.header.addEventListener('mousedown', this.onMouseDown.bind(this));
    }

    open() {
        this.modal.style.display = 'block';
    }

    close() {
        this.modal.style.display = 'none';
    }

    setContent(content) {
        this.content.innerHTML = content;
    }

    setTitle(title) {
        this.header.innerText = title;
    }

    onMouseDown(event) {
        event.preventDefault();
        this.offsetX = event.clientX - this.modal.getBoundingClientRect().left;
        this.offsetY = event.clientY - this.modal.getBoundingClientRect().top;

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseMove = (event) => {
        this.modal.style.left = `${event.clientX - this.offsetX}px`;
        this.modal.style.top = `${event.clientY - this.offsetY}px`;
    }

    onMouseUp = () => {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }
}
let modal = new Modal();
modal.setTitle("Заголовок");
modal.setContent("<p>Якийсь контент.</p>");
modal.open();
