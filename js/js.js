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

$(document).ready( function () {
    table = $('#table').DataTable();
    
    rowEditor = new RowEditor('#table', table, editRowSettings);
    
} );