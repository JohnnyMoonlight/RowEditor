# RowEditor
This repo contains a row editor for rows within a DataTable.

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

## Config

The config requires a json object, which explicitely defines the rows, that are editable (all mentioned rows).
Further it must be defined if we want to manipulate the row through `<input>` or `<select>` modalities. 
