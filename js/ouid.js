document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('back-button').addEventListener('click', function() {
		$('#back-button').hide();
		$('#ui-staff').hide();
		$('#ui-event').hide();
		$('#ui-tracker').hide();
		$('#ui-main').show();
    });
    
    document.getElementById('tracker-button').addEventListener('click', function() {
		$('#ui-main').hide();
		$('#ui-tracker').show();
		$('#back-button').show();
    });
    
    document.getElementById('staff-button').addEventListener('click', function() {
		$('#ui-main').hide();
		$('#ui-staff').show();
		$('#back-button').show();
    });
    
    document.getElementById('event-button').addEventListener('click', function() {
		$('#ui-main').hide();
		$('#ui-event').show();
		$('#back-button').show();
    });
});
