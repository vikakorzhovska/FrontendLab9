// Відповідає тільки за DOM-операції з контейнером
class NotificationContainer {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'container';
        document.body.appendChild(this.container);
    }

    add(element) {
        this.container.appendChild(element);
    }
}

// Відповідає тільки за створення та видалення повідомлень
class NotificationElement {
    create(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        const closeButton = document.createElement('span');
        closeButton.className = 'close-button';
        closeButton.textContent = '×';
        notification.appendChild(closeButton);

        return notification;
    }

    remove(notification) {
        notification.classList.add('hide');
        notification.addEventListener('transitionend', () => notification.remove());
    }
}

// Відповідає за логіку роботи повідомлень
class Notification {
    constructor() {
        this.container = new NotificationContainer();
        this.element = new NotificationElement();
    }

    createNotification(message, type = 'info', duration = 3000) {
        const notification = this.element.create(message, type);

        notification.querySelector('.close-button')
            .addEventListener('click', () => this.element.remove(notification));

        this.container.add(notification);

        setTimeout(() => this.element.remove(notification), duration);
    }
}

let notifier = new Notification();
notifier.createNotification('Благодійний ярмарок. Читати більше..', 'info');
notifier.createNotification('Оплата пройшла успішно', 'success', 4000);
notifier.createNotification('Увага! Повітряна тривога', 'warning', 5000);
notifier.createNotification('Помилка при введені значень', 'error', 6000);