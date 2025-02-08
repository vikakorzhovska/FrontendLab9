class Tab {
    constructor(container) {
        this.container = container;
        this.tabs = [];
        this.contents = [];
        this.activeTabIndex = 0;

        this.tabContainer = document.createElement('div');
        this.contentContainer = document.createElement('div');

        this.tabContainer.className = 'tab-container';
        this.contentContainer.className = 'content-container';

        this.container.appendChild(this.tabContainer);
        this.container.appendChild(this.contentContainer);
    }

    createElement(tag, className, text = '') {
        const element = document.createElement(tag);
        element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    addTab(title, content) {
        const tabIndex = this.tabs.length;

        const tab = this.createElement('button', 'tab', title);
        tab.addEventListener('click', () => this.switchTab(tabIndex));

        const contentDiv = this.createElement('div', 'tab-content');
        contentDiv.appendChild(content);

        this.tabs.push(tab);
        this.contents.push(contentDiv);

        this.tabContainer.appendChild(tab);
        this.contentContainer.appendChild(contentDiv);

        if (tabIndex === 0) {
            this.switchTab(0);
        }
    }

    switchTab(index) {
        this.setActiveTab(index);
    }

    setActiveTab(index) {
        this.tabs[this.activeTabIndex].classList.remove('active');
        this.contents[this.activeTabIndex].style.display = 'none';

        this.activeTabIndex = index;

        this.tabs[this.activeTabIndex].classList.add('active');
        this.contents[this.activeTabIndex].style.display = 'block';
    }
}

const container = document.getElementById('tab-container');
const tabSystem = new Tab(container);

tabSystem.addTab('Вкладка 1', document.createTextNode('Вміст для вкладки 1'));
tabSystem.addTab('Вкладка 2', document.createTextNode('Вміст для вкладки 2'));
tabSystem.addTab('Вкладка 3', document.createTextNode('Вміст для вкладки 3'));


