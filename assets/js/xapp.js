var searchTable =
'<table id="contacts" class="mdl-data-table mdl-js-data-table mdl-shadow--2dp"> \
<thead> \
<tr> \
<th class="mdl-data-table__cell--non-numeric">Image</th> \
<th>Display Name</th> \
<th>Email</th> \
</tr> \
</thead> \
<tbody> \
</tbody> \
</table>';


$(function() {
    $( "#contacts" ).click(function() {
      //alert( "Handler for .click() called." );
      getContacts();
    });

    $( "#search" ).click(function() {
      //alert( "Handler for .click() called." );
      displaySearch();
    });
});


function getContacts(){

    $("#results").empty().load("views/contacts.html", function () {
      console.log("table added");
      $.getJSON( "contacts", function( data ) {
        console.log(data);
        var items = '';
        $.each( data, function( key, val ) {
          items += "<tr><td><img src='" +val.photoURL +"' /></td><td>" + val.displayName + "</td><td>" + val.profileURL + " | "+ val.email + "</td></tr>";
        }        );
        console.log(items);
        $('#contacts > tbody:last-child').append(items);
      });
    });
}


function displaySearch(){

  $("#results").empty().load("views/search.html", function () {
    console.log("search mask successfully added");
    $('#keywords').on('change', function() {
      var keyword= $(this).val() // get the current value of the input field.
      console.log(keyword);
      executeSearch(keyword);
    });
  });
}

function executeSearch(keyword){
  $.getJSON( "search/" + keyword, function( data ) {
    $('.searchResults').append(searchTable);
    console.log(data);
    var items = '';
    console.log(data.users.total);
    $.each( data.users, function( key, val ) {
      console.log(key, val);
      items += "<tr><td><img src='" +val.photoURL +"' /></td><td>" + val.id + "</td><td>" + val.id + " | "+ val.email + "</td></tr>";
    });
    console.log(items);
    $('#contacts > tbody:last-child').append(items);
  });
}