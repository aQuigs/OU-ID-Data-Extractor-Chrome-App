var dt;

function getDateFormatted() {
    var date = new Date();
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function addRecord() {
    if (dt) {
        var gnum = $('#gnumber').val();
        var eventName = $('#event-name').val();
        var staffName = $('#staff-name').val();

        if (gnum && eventName && staffName) {
            dt.row.add([
                gnum,
                getDateFormatted(),
                eventName,
                staffName
            ]).draw(false);
            $('#gnumber').val('');
        } else {
            if (!eventName) {
                $('#event-error').css('visibility', 'visible');
            }

            if (!staffName) {
                $('#staff-error').css('visibility', 'visible');
            }
        }
    }
}

function addEvent() {
    var eventName = $('#new-event').val();
    if (eventName) {
        var newElement = '<option value="'+eventName+'">'+eventName+'</option>';
        $('#event-manager-list').append(newElement);
        $('#event-name').append(newElement);
        $('#new-event').val('');
        $('#event-manager-list').val(eventName);
    }
}

function addStaff() {
    var staffName = $('#new-staff').val();
    if (staffName) {
        var newElement = '<option value="'+staffName+'">'+staffName+'</option>';
        $('#staff-manager-list').append(newElement);
        $('#staff-name').append(newElement);
        $('#new-staff').val('');
        $('#staff-manager-list').val(staffName);
    }
}

function onEnter(id, callback) {
    $(id).keyup(function (e) {
        if (e.keyCode == 13) {
            callback();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {

    onEnter('#gnumber', addRecord);
    onEnter('#new-event', addEvent);
    onEnter('#new-staff', addStaff);

    $('#tracker-button').on('click', function() {
        $('#ui-staff').hide();
        $('#ui-event').hide();
        $('#header').text("Event Tracker");
        $('#event-name').val('');
        $('#staff-name').val('');
        $('#gnumber').val('');
        $('#event-error').css('visibility', 'hidden');
        $('#staff-error').css('visibility', 'hidden');
        $('#ui-tracker').show();

        // fix to accomodate for lack of resizing table headers when display: none;
        if (dt) {
            dt.columns.adjust();
        }
    });
    
    $('#staff-button').on('click', function() {
        $('#ui-event').hide();
        $('#ui-tracker').hide();
        $('#header').text("Staff Manager");
        $('#staff-manager-list').val('');
        $('#new-staff').val('');
        $('#ui-staff').show();
    });
    
    $('#event-button').on('click', function() {
        $('#ui-staff').hide();
        $('#ui-tracker').hide();
        $('#header').text("Event Manager");
        $('#event-manager-list').val('');
        $('#new-event').val('');
        $('#ui-event').show();
    });

    $('#event-name').on('change', function() {
            console.log($('#event-name').val());
        if ($('#event-name').val()) {
            $('#event-error').css('visibility', 'hidden');
        }
    });

    $('#staff-name').on('change', function() {
        if ($('#staff-name').val()) {
            $('#staff-error').css('visibility', 'hidden');
        }
    });

    dt = $('#data-table').DataTable({
        "scrollY":        "300px",
        "scrollCollapse": true,
        "paging":         false
    });

    $('#add-record-btn').on('click', addRecord);

    $('#add-event-btn').on('click', addEvent);

    $('#add-staff-btn').on('click', addStaff);

    $('#delete-staff-btn').on('click', function() {
        var selector = $("#staff-manager-list");
        if (selector.val()) {
            var toremove = selector.find(":selected");
            $('#staff-name').children("[value='"+toremove.val()+"']").remove();
            toremove.remove();
            selector.val('');
        }
    });

    $('#delete-event-btn').on('click', function() {
        var selector = $("#event-manager-list");
        if (selector.val()) {
            var toremove = selector.find(":selected");
            $('#staff-name').children("[value='"+toremove.val()+"']").remove();
            toremove.remove();
            selector.val('');
        }
    });
});
