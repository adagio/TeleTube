$(function() {
	
  var createRows = function() {
		instants = obj.instants;
		for (var i = 0; i < instants.length; i++) {
      var instant = obj.instants[i];
			$('table#instants > tbody').append('<tr data-row-key="'+(i+1)+'"><td>'+instant.startAt+'</td><td>'+instant.title+'</td></tr>');
    }
	};
	
	var addGuard = function() {
		$('table#instants > tbody > tr').click(function() {
					
			$('table#instants > tbody > tr').removeClass("success");
			$(this).addClass("success");
			
			var rowId = $(this).data("row-key");
			var instantIndex = rowId - 1;
			var command = instants[instantIndex][2]
			$('#message').attr("value", command);
			
			var time = instants[instantIndex][0]
			toInstant(time);
			
		});
	};
	
	createRows();
	addGuard();
	
});