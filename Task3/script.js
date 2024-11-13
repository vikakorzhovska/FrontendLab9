class Table {
    constructor() {
        this.headers = [];
        this.rows = [];
    }

    addColumn(columnName) {
        this.headers.push(columnName);
        this.rows.forEach(row => row.push(""));
    }

    addRow(rowData) {
        let row = Array.from({ length: this.headers.length }, (_, i) => rowData[i] || "");
        this.rows.push(row);
    }

    generateHTML() {
        let html = "<table class='table'><thead><tr>";
        html += this.headers.map(header => `<th>${header}</th>`).join("");
        html += "</tr></thead><tbody>";

        this.rows.forEach(row => {
            html += "<tr>";
            html += row.map(cell => `<td>${cell}</td>`).join("");
            html += "</tr>";
        });

        html += "</tbody></table>";
        return html;
    }
}

let table = new Table();
table.addColumn("Ім'я");
table.addColumn("Прізвище");
table.addRow(["Вікторія", "Коржовська"]);
table.addRow(["Надія", "Хоменко"]);

document.body.innerHTML = table.generateHTML();

