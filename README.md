# RowEditor
This repo contains a row editor for rows within a DataTable.

![alt text](https://github.com/JohnnyMoonlight/RowEditor/blob/master/img/screenshot.png)

## Usage

After setting up the plug in (see 'How To' below), add a button for each column calling the edit functionality. Press 'escape' to cancel, press 'enter' to confirm.

## How To

1. Integrate the RowEditor.js-file `<script type="text/javascript" charset="utf8" src="/js/RowEditor.js"></script>`
2. Set up the RowEditorSettings (find explanation in Chapter Config):
```
editRowSettings  = {
       "1":{"type":"input"},
       "2":{"type":"input"},
       "3":{"type":"select",
           "options":{
               "1":{"value":'Sales Assistant', "title":'Sales Assistant'},
               "2":{"value":'Tech Lead', "title":'Tech Lead'},
               "3":{"value":'Secretary', "title":'Secretary'},
               "4":{"value":'Developer', "title":'Developer'},
               "5":{"value":'Trainee', "title":'Trainee'}
           }
       }
}
```
3. Set up your DataTable as you usually do and initialize the rowEditor with the previously defined settings:
  ```
  $(document).ready( function () {
      table = $('#table').DataTable();
      rowEditor = new RowEditor('#table', table, editRowSettings);

  });
  ```

  4. Call the editRow-function
Finally call the edit row function. You can place it in the table as button or in any way you like it.
  `<button onclick="rowEditor.editRow(1)">Edit</button>`

## Config

The config requires a json object, which explicitely defines the rows, that are editable (all mentioned rows).
Further it must be defined if we want to manipulate the row through `<input>` or `<select>` modalities.
The input-style is pretty straigt forward, take a look at the example above. For a select-type, give a "value" that will be set in the table; the "title" is what is shown in the dropdown.
