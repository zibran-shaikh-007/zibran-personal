//Pushing Footer to all the pages

fetch("./footer.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("footer").innerHTML = data;
    });



//Refresh table
setInterval("my_function();", 1000);

function my_function() {
    //$('#one').load(location.href + ' #refresh');
    $('#refreshtable').load(location.href + ' #refreshtable');
}


//sorting wallet gambling and mining 

$('#r').click(function() {
    var table = $(this).parents('table').eq(0)
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
    this.desc = !this.desc
    if (!this.desc) {
        rows = rows.reverse()
    }
    for (var i = 0; i < rows.length; i++) {
        table.append(rows[i])
    }
})

//sorting
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index),
            valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valB - valA : valA.toString().localeCompare(valB)
    }
}

function getCellValue(row, index) { return $(row).children('td').eq(index).text() }


// Color mode change switch


var color = $("#toggleSwitch").val();
$("body").css('background', color);
$("#toggleSwitch").on("change", () => {
    var color = $("#toggleSwitch").val();
    $("body").css('background', color);
})