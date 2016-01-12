var DIRNAME = '/ouid';
var STAFF_CSV = 'staffNames.csv'
var EVENT_CSV = 'eventNames.csv'
var SWIPES_CSV = 'swipeData.csv'

function saveList(filename, data) {
    cd(DIRNAME).rmrf(filename).write(filename, data.join('\n'));
}

function saveStaffNames(data) {
    saveList(STAFF_CSV,data)
}

function saveEventNames(data) {
    saveList(EVENT_CSV,data)
}

function saveSwipes() {
    // convert all data in #data-table into comma-separated attributes
    // with newlines between each record
    var csvData = $('#data-table tbody tr').map(function() {
        return $(this.children).map(function() {
            return $(this).text()
        }).get().join(',')
    }).get().join('\n');
    cd(DIRNAME).rmrf(SWIPES_CSV).write(SWIPES_CSV, csvData);
}

document.addEventListener('DOMContentLoaded', function() {
    cd(function() {
        cd().mkdir(DIRNAME);
    });
});
