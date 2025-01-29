class Form {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.form = document.createElement('form');
        this.fields = [];
        this.submitAction = null;
        this.validations = {};

        this.initForm();
    }

    initForm() {
        this.container.appendChild(this.form);
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    addInputField({ name, type = 'text', placeholder = '', validation = null, errorMessage = '' }) {  // зміна тут
        let wrapper = document.createElement('div');
        wrapper.className = 'field-wrapper';

        let input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.placeholder = placeholder;

        let errorText = document.createElement('span');
        errorText.className = 'error-message';
        errorText.style.color = 'red';
        errorText.style.display = 'none';
        errorText.textContent = errorMessage;

        wrapper.appendChild(input);
        wrapper.appendChild(errorText);
        this.form.appendChild(wrapper);

        this.fields.push({ input, errorText });

        if (validation) {
            this.validations[name] = { rule: validation, errorText };
        }
    }

    addSelectField({ name, options = [], validation = null, errorMessage = '' }) {  // зміна тут
        let wrapper = document.createElement('div');
        wrapper.className = 'field-wrapper';

        let select = document.createElement('select');
        select.name = name;

        options.forEach(option => {
            let optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            select.appendChild(optionElement);
        });

        let errorText = document.createElement('span');
        errorText.className = 'error-message';
        errorText.style.color = 'red';
        errorText.style.display = 'none';
        errorText.textContent = errorMessage;

        wrapper.appendChild(select);
        wrapper.appendChild(errorText);
        this.form.appendChild(wrapper);

        this.fields.push({ input: select, errorText });

        if (validation) {
            this.validations[name] = { rule: validation, errorText };
        }
    }

    addButton(label, type = 'button', onClickCallback = null) {
        let button = document.createElement('button');
        button.type = type;
        button.textContent = label;
        this.form.appendChild(button);

        if (onClickCallback) {
            button.addEventListener('click', onClickCallback);
        }
    }

    setSubmitAction(callback) {
        this.submitAction = callback;
    }

    handleSubmit(event) {
        event.preventDefault();
        let isValid = this.validateForm();

        if (isValid && this.submitAction) {
            let formData = {};
            this.fields.forEach(({ input }) => {
                formData[input.name] = input.value;
            });
            this.submitAction(formData);
            alert("Форма успішно відправлена!");
        } else {
            alert("Форма містить помилки. Перевірте введені дані.");
        }
    }

    validateForm() {
        let isValid = true;

        this.fields.forEach(({ input, errorText }) => {
            let validation = this.validations[input.name];
            if (validation && !validation.rule(input.value)) {
                isValid = false;
                input.style.borderColor = 'red';
                errorText.style.display = 'block';
            } else {
                input.style.borderColor = '';
                errorText.style.display = 'none';
            }
        });

        return isValid;
    }
}

let form = new Form('#formContainer');

form.addInputField({
    name: 'username',
    type: 'text',
    placeholder: 'Введіть ім\'я користувача',
    validation: value => /^[a-zA-Z]+$/.test(value.trim()),
    errorMessage: 'Ім\'я користувача повинно містити лише літери'
});

form.addInputField({
    name: 'email',
    type: 'email',
    placeholder: 'Введіть електронну пошту',
    validation: value => /\S+@\S+\.\S+/.test(value),
    errorMessage: 'Введіть коректну електронну пошту (example@gmail.com)'
});

form.addSelectField({
    name: 'gender',
    options: [
        { value: '', label: 'Виберіть стать' },
        { value: 'male', label: 'Чоловік' },
        { value: 'female', label: 'Жінка' }
    ],
    validation: value => value !== '',
    errorMessage: 'Будь ласка, виберіть стать'
});

form.addButton('Відправити', 'submit');

form.setSubmitAction(formData => {
    console.log('Дані форми:', formData);
});
