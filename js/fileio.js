var DIRNAME = '/ouid';
var STAFF_CSV = 'staffNames.csv'
var EVENT_CSV = 'eventNames.csv'
var SWIPES_CSV = 'swipeData.csv'

function saveList(filename, data) {
    if (data) {
        cd(DIRNAME).rmrf(filename).write(filename, data.join('\n'));
    } else {
        cd(DIRNAME).rmrf(filename);
    }
}

function saveStaffNames(data) {
    saveList(STAFF_CSV,data)
}

function saveEventNames(data) {
    saveList(EVENT_CSV,data)
}

function getSwipeCSVData() {
    return $('#data-table tbody tr').map(function() {
        return $(this.children).map(function() {
            return $(this).text()
        }).get().join(',')
    }).get().join('\n');
}

function saveSwipes() {
    // convert all data in #data-table into comma-separated attributes
    // with newlines between each record
    var csvData = getSwipeCSVData();
    if (csvData) {
        cd(DIRNAME).rmrf(SWIPES_CSV).write(SWIPES_CSV, csvData);
    } else {
        cd(DIRNAME).rmrf(SWIPES_CSV);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    cd(function() {
        cd().mkdir(DIRNAME);

        cd(DIRNAME).read(STAFF_CSV, function(done, fileContent) {
            fileContent.split('\n').forEach(addStaffByName);
        }, function(){});

        cd(DIRNAME).read(EVENT_CSV, function(done, fileContent) {
            fileContent.split('\n').forEach(addEventByName);
        }, function(){});

        cd(DIRNAME).read(SWIPES_CSV, function(done, fileContent) {
            fileContent.split('\n').forEach(function(record) {
                var recordData = record.split(',');
                if (recordData.length == 4) {
                    addRecordByData(recordData[0], recordData[1], recordData[2], recordData[3]);
                }
            });
        }, function(){});

        $('#download-swipe-btn').on('click', function() {
                chrome.fileSystem.chooseEntry( {
                type: 'saveFile',
                suggestedName: SWIPES_CSV,
                accepts: [ { extensions: ['txt']} ],
                acceptsAllTypes: true
            }, function (fileEntry) { 
                // $('#download-swipe-btn').prop("disabled",true);
                fileEntry.createWriter(function(fileWriter) {

                    var truncated = false;
                    var blob = new Blob([getSwipeCSVData()]);

                    fileWriter.onwriteend = function(e) {
                        // $('#download-swipe-btn').prop("disabled",false);
                    };

                    fileWriter.write(blob);
                });
            });
        });
    });
});
