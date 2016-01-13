var dt;
// for duplicate-avoiding purposes and saving without jquery HTML parsing
var usedEvents = [];
var usedStaff = [];
var usedRecordsByGID = {};

function adjustColumnSize() {
    if (dt) {
        dt.columns.adjust();
    }
}

function getDateFormatted() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    month   = month   < 10 ? '0'+month : month;
    day     = day     < 10 ? '0'+day : day;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    return month + "/" + day + "/" + date.getFullYear() + " " +  hours+ ":" + minutes+ ":" + seconds + " " + ampm;
}

function addRecordByData(gnum, date, eventName, staffName) {
    dt.row.add([
        gnum,
        getDateFormatted(),
        eventName,
        staffName
    ]).draw(false);
    if (usedRecordsByGID[gnum]) {
        usedRecordsByGID[gnum].push(eventName);
    } else {
        usedRecordsByGID[gnum] = [eventName];
    }
    adjustColumnSize();
}

function addRecord() {
    if (dt) {
        var gnum = $('#gnumber').val();
        var eventName = $('#event-name').val();
        var staffName = $('#staff-name').val();

        if (gnum && eventName && staffName) {
            if (!usedRecordsByGID[gnum] || usedRecordsByGID[gnum].indexOf(eventName) == -1) {
                addRecordByData(gnum, getDateFormatted(), eventName, staffName);
                saveSwipes();
            }
            $('#gnumber').val('');
            $('#gnumber').focus();
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

function addEventByName(eventName) {
    if (usedEvents.indexOf(eventName) == -1) {
        var newElement = '<option value="'+eventName+'">'+eventName+'</option>';
        $('#event-manager-list').append(newElement);
        $('#event-name').append(newElement);
        usedEvents.push(eventName);
    }
}

function addEvent() {
    var eventName = $('#new-event').val();
    if (eventName) {
        addEventByName(eventName);
        saveEventNames(usedEvents);
    }
    $('#new-event').val('');
    $('#event-manager-list').val(eventName);
}

function addStaffByName(staffName) {
    if (usedStaff.indexOf(staffName) == -1) {
        var newElement = '<option value="'+staffName+'">'+staffName+'</option>';
        $('#staff-manager-list').append(newElement);
        $('#staff-name').append(newElement);
        usedStaff.push(staffName);
    }
}

function addStaff() {
    var staffName = $('#new-staff').val();
    if (staffName) {
        addStaffByName(staffName);
        saveStaffNames(usedStaff);
    }
    $('#new-staff').val('');
    $('#staff-manager-list').val(staffName);
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
    $('#add-record-btn').on('click', addRecord);
    $('#add-event-btn').on('click', addEvent);
    $('#add-staff-btn').on('click', addStaff);

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
        adjustColumnSize();
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
        $('#gnumber').focus();
    });

    $('#staff-name').on('change', function() {
        if ($('#staff-name').val()) {
            $('#staff-error').css('visibility', 'hidden');
        }
        $('#gnumber').focus();
    });

    dt = $('#data-table').DataTable({
        "scrollY":        "200px",
        "scrollCollapse": true,
        "paging":         false
    });

    $('#delete-staff-btn').on('click', function() {
        var selector = $("#staff-manager-list");
        if (selector.val()) {
            var toremove = selector.find(":selected");
            // Remove from usedStaff array
            usedStaff.splice(usedStaff.indexOf(toremove.val(), 1));
            saveStaffNames(usedStaff);
            $('#staff-name').children("[value='"+toremove.val()+"']").remove();
            toremove.remove();
            selector.val('');
        }
    });

    $('#delete-event-btn').on('click', function() {
        var selector = $("#event-manager-list");
        if (selector.val()) {
            var toremove = selector.find(":selected");
            // Remove from usedEvents array
            usedEvents.splice(usedEvents.indexOf(toremove.val(), 1));
            saveEventNames(usedEvents);
            $('#event-name').children("[value='"+toremove.val()+"']").remove();
            toremove.remove();
            selector.val('');
        }
    });

    $('#download-swipe-btn').on('click', function() {
        if (!$.isEmptyObject(usedRecordsByGID)) {
                chrome.fileSystem.chooseEntry( {
                type: 'saveFile',
                suggestedName: SWIPES_CSV,
                accepts: [ { extensions: ['csv']} ],
                acceptsAllTypes: true
            }, function (fileEntry) { 
                fileEntry.createWriter(function(fileWriter) {

                    var blob = new Blob([getSwipeCSVData()]);

                    fileWriter.onwriteend = function(e) {
                        // truncate will cause a call to onwriteend, so without adjusting this there will be an infinite loop
                        fileWriter.onwriteend = function() {
                            deleteSwipeData();
                            usedRecordsByGID = {};
                            dt.clear().draw();
                        }
                        // truncate to prevent leaving residual content when overwriting a larger file than the csv data
                        e.currentTarget.truncate(e.currentTarget.position);
                    };

                    fileWriter.write(blob);
                });
            });
        }
    });
});
