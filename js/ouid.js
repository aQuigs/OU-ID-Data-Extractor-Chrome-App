document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('tracker-button').addEventListener('click', function() {
		$('#ui-staff').hide();
		$('#ui-event').hide();
		$('#header').text("Event Tracker");
		$('#ui-tracker').show();
    });
    
    document.getElementById('staff-button').addEventListener('click', function() {
		$('#ui-event').hide();
		$('#ui-tracker').hide();
		$('#header').text("Staff Manager");
		$('#ui-staff').show();
    });
    
    document.getElementById('event-button').addEventListener('click', function() {
		$('#ui-staff').hide();
		$('#ui-tracker').hide();
		$('#header').text("Event Manager");
		$('#ui-event').show();
    });
});
