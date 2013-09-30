var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
}

$(function() {
	
	var obj = eval ("(" + txt + ")");
    
  var instants = obj.instants;
	
  var createRows = function() {
		var instant = null;
		for (var i = 0; i < instants.length; i++) {
      instant = instants[i];
			$('table#instants > tbody').append('<tr data-row-key="'+(i+1)+'"><td>'+instant.startAt+'</td><td>'+instant.title+'</td></tr>');
    }
	};
	
	var addGuard = function() {
		$('table#instants > tbody > tr').click(function() {
					
			$('table#instants > tbody > tr').removeClass("success");
			$(this).addClass("success");
			
			var rowId = $(this).data("row-key");
			var instantIndex = rowId - 1;
			
			var instant = instants[instantIndex];
			
			$('div#message').html('');
			
			if (instant.hasOwnProperty('file')) {
				var file = instant.file;
			  $('div#message').html('<strong>file: ' + file + '</strong><br />');
			}

			if (instant.hasOwnProperty('messages')) {
				var messages = instant.messages;
				var message = '';
				var i = 0;
				$('div#message').append('<pre>');
				for ( i; i < messages.length; i++ ) {
      		message = instant.messages[i];
					line = safe_tags_replace(message.line);
					$('div#message pre').append(line + '<br />');
    		}
			}
			
			var startAt = instant.startAt;
			toInstant(startAt);
			
		});
	};
	
	createRows();
	addGuard();
	
});