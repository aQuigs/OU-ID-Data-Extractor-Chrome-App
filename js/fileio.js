
function saveStaffNames(data) {
    saveList('staffNames.csv',data)
}

function saveEventNames(data) {
    saveList('eventNames.csv',data)
}

function saveList(filename, data) {
    cd('/ouid').rmrf(filename).write(filename, data.join('\n'));
}

document.addEventListener('DOMContentLoaded', function() {
    cd(function() {
        cd().mkdir('/ouid');
    });
});
