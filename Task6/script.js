class Notification {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'container';
        document.body.appendChild(this.container);
    }

    createNotification(message, type = 'info', duration = 3000) {
        let notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        let closeButton = document.createElement('span');
        closeButton.className = 'close-button';
        closeButton.textContent = '×';
        closeButton.addEventListener('click', () => this.closeNotification(notification));

        notification.appendChild(closeButton);
        this.container.appendChild(notification);

        setTimeout(() => this.closeNotification(notification), duration);
    }

    closeNotification(notification) {
        if (notification) {
            notification.classList.add('hide');
            notification.addEventListener('transitionend', () => notification.remove());
        }
    }
}

let notifier = new Notification();
notifier.createNotification('Благодійний ярмарок. Читати більше..', 'info');
notifier.createNotification('Оплата пройшла успішно', 'success', 4000);
notifier.createNotification('Увага! Повітряна тривога', 'warning', 5000);
notifier.createNotification('Помилка при введені значень', 'error', 6000);
