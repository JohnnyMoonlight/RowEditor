class RowEditor {

    constructor(tableId, dt, config) {
        this.table = tableId;
        this.dataTable = dt;
        this.editRowSettings = config;
        this.rowInEditMode = null;
        this.originalRowValues = null;
    }

    deleteRow(indexOfCallingRow) {
        if (this.rowInEditMode) {
            this.resetRow();
        }
        table.row(indexOfCallingRow).remove().draw();
    }

    editRow(indexOfCallingRow) {
        let indexOfCallingRowSanitized = indexOfCallingRow+1;
        //if command is called on the same row, save the values
        if (this.rowInEditMode===indexOfCallingRowSanitized) {
            this.saveValues();
            return;
        }
        //if command is called on a different row, reset
        if (this.rowInEditMode) {
            this.resetRow();
        }
        let c = this.editRowSettings;
        this.setRowEditMode(indexOfCallingRowSanitized);
        this.setOriginalRowValuesFor(indexOfCallingRowSanitized);
        let row = $(this.table).find('tr').eq(indexOfCallingRowSanitized);
        row.find('td').each((index, element)=>{
            if(index in c) {
                $(element).html(this.getInputHTML(element, index, c));
            }
        });
    }

    setRowEditMode (index) {
        this.rowInEditMode = index;
    }

    setOriginalRowValuesFor (index) {
        this.originalRowValues=this.dataTable.row(index-1);
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

    /*save value needs to
     - firstly, check if any row is being edited and could have new input,
     - secondly, set the output view (method setOutput()) and
     - thirdly, clear the edit modals (methods rowEditMode() and setOriginalRowValues())
    */
    saveValues () {
    if (this.rowInEditMode) {
        this.setOutput(this.rowInEditMode);
        this.setRowEditMode(null);
        this.setOriginalRowValues=null;
        $("[id*='tooltip']" ).remove();
    }
    }

    resetRow (index) {
        $(this.table).find('tr').eq(index).html(this.originalRowValues);
    }

    resetRow () {
        if (this.rowInEditMode) {
            this.dataTable.row(this.rowInEditMode-1).data(this.originalRowValues.data());
            this.dataTable.draw(false);
            this.setRowEditMode(null);
            this.setOriginalRowValuesFor(null);
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
                    html+="<option value="+options[i].value+">"+options[i].title+"</option>"
                }
                html+="</select>"
                return html;
            default:
                console.log("Unknown input type. Element stays untouched.");
                return '<td value='+$(element).text()+'></td>'

        }

    }

}
