class Tab {
    constructor(container) {
        this.container = container;
        this.tabs = new Map(); // Використовуємо Map для зберігання вкладок
        this.activeTabIndex = null;

        this.tabContainer = document.createElement('div');
        this.contentContainer = document.createElement('div');

        this.tabContainer.className = 'tab-container';
        this.contentContainer.className = 'content-container';

        this.container.appendChild(this.tabContainer);
        this.container.appendChild(this.contentContainer);
    }

    addTab(title, content) {
        const tab = this.createTab(title);
        const contentDiv = this.createContent(content);

        this.tabs.set(title, { tab, contentDiv });

        this.tabContainer.appendChild(tab);
        this.contentContainer.appendChild(contentDiv);

        if (this.activeTabIndex === null) {
            this.setActiveTab(title); // Якщо вкладка перша, зробити її активною
        }
    }

    createTab(title) {
        const tab = document.createElement('button');
        tab.textContent = title;
        tab.className = 'tab';
        tab.addEventListener('click', () => this.switchTab(title));
        return tab;
    }

    createContent(content) {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'tab-content';
        contentDiv.style.display = 'none'; // Всі вкладки сховані спочатку
        contentDiv.appendChild(content);
        return contentDiv;
    }

    switchTab(title) {
        this.setActiveTab(title);
    }

    setActiveTab(title) {
        if (this.activeTabIndex !== null) {
            const previousTab = this.tabs.get(this.activeTabIndex);
            previousTab.tab.classList.remove('active');
            previousTab.contentDiv.style.display = 'none';
        }

        this.activeTabIndex = title;

        const activeTab = this.tabs.get(this.activeTabIndex);
        activeTab.tab.classList.add('active');
        activeTab.contentDiv.style.display = 'block';
    }
}

const container = document.getElementById('tab-container');
const tabSystem = new Tab(container);

tabSystem.addTab('Вкладка 1', document.createTextNode('Вміст для вкладки 1'));
tabSystem.addTab('Вкладка 2', document.createTextNode('Вміст для вкладки 2'));
tabSystem.addTab('Вкладка 3', document.createTextNode('Вміст для вкладки 3'));
