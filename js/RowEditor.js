class RowEditor {

    constructor(tableId, dt, config) {
    this.table = tableId;
    this.dataTable = dt;
    this.editRowSettings = config;
    this.rowInEditMode = null;
    this.originalRowValues = null;
    }

    editRow(indexOfCallingRow) {
        if (this.rowInEditMode) {
            this.resetRow();
        }
        var listener = document.addEventListener('keyup', (e) => this.escapeHandler(e));
        let c = this.editRowSettings;
        this.setRowEditMode(indexOfCallingRow);
        this.setOriginalRowValuesFor(indexOfCallingRow);
        let row = $(this.table).find('tr').eq(indexOfCallingRow);
        row.find('td').each((index, element)=>{
            if(index in c) {
                $(element).html(this.getInputHTML(element, index, c));
            }
        });
    }

    escapeHandler (event) {
        if (event.key ==="Escape") {
            this.resetRow();
            this.setRowEditMode(null);
            this.setOriginalRowValuesFor(null);
        }
        if (event.key==="Enter") {
            this.setOutput(this.rowInEditMode);
            this.setRowEditMode(null);
            this.setOriginalRowValuesFor(null);
        }
    }

    setRowEditMode (index) {
        this.rowInEditMode = index;
    }

    setOriginalRowValuesFor (index) {
        let row = [];
        this.originalRowValues=$(this.table).find('tr').eq(index).html();
    }

    setOutput(index) {
        let row = $(this.table).find('tr').eq(index).find('td');
        row.each((index, element) => {
            let htmlCell = element;
            if(index in this.editRowSettings) {
                let htmlElement = $('#'+this.classIdOf(index));
                let tagName = htmlElement.prop("tagName");
                $(element).html(htmlElement.val());
                this.dataTable.cell(element._DT_CellIndex.row, element._DT_CellIndex.column).data(htmlElement.val());
            }
        });
    }

    resetRow () {
        if (this.rowInEditMode) {
            $(this.table).find('tr').eq(this.rowInEditMode).html(this.originalRowValues);
        }
    }


    classIdOf(index) {
        if (this.editRowSettings[index])
            return this.editRowSettings[index].type+'_'+index;
        else {
            console.log(index + " is not configured for editing.")
        }
    }

    getInputHTML(element, index, settings) {
        let inputType = settings[index]["type"];
        switch (inputType) {
            case "input":
                return '<input id=\''+ this.classIdOf(index) +'\' value=\''+$(element).text()+'\'></input>'
            case "select":
                let html = '<select id=\''+ this.classIdOf(index) +'\'>';
                let options = settings[index]["options"];
                for (let i = 1; i<=Object.keys(options).length; i++){
                    html+="<option value=\""+options[i].value+"\">"+options[i].title+"</option>"
                }
                html+="</select>"
                return html;
            default:
                console.log("Unknown input type. Element stays untouched.");
                return '<td value='+$(element).text()+'></td>'

        }

    }

}
