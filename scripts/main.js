$(function() {
	
  var createRows = function() {
		for (var i = 0; i < instants.length; i++) {
      var instant = instants[i];
			$('table#instants > tbody').append('<tr data-row-key="'+(i+1)+'"><td>'+instant[0]+'</td><td>'+instant[1]+'</td></tr>');
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