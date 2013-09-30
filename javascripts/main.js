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

function pad(num) {
    var s = num+"";
    while (s.length < 2) s = "0" + s;
    return s;
}

$(function() {
	
	var obj = eval ("(" + txt + ")");
    
  var instants = obj.instants;
	
  var createRows = function() {
		var instant = null;
		var startAt = null;
		for (var i = 0; i < instants.length; i++) {
      instant = instants[i];
			startAt = instant.startAt;
			startAtFormatted = pad(Math.floor((startAt/60))) + ':' + pad(startAt%60);
			$('div#instants-container > table#instants> tbody').append('<tr data-row-key="'+(i+1)+'"><td>['+startAtFormatted+'] '+instant.title+'</td></tr>');
    }
	};
	
	var addGuard = function() {
		$('div#instants-container > table#instants > tbody > tr').click(function() {
					
			$('div#instants-container > table#instants > tbody > tr').removeClass("success");
			$(this).addClass("success");
			
			var rowId = $(this).data("row-key");
			var instantIndex = rowId - 1;
			
			var instant = instants[instantIndex];
			
			$('div#messages-container > p#file').html('');
			$('div#messages-container > pre#messages').html('');
			
			if (instant.hasOwnProperty('file')) {
				var file = instant.file;
			  $('div#messages-container > p#file').prepend('<p><strong>file: ' + file + '</strong><br /></p>');
			}

			if (instant.hasOwnProperty('messages')) {
				var messages = instant.messages;
				var message = '';
				var i = 0;
				for ( i; i < messages.length; i++ ) {
      		message = instant.messages[i];
					line = safe_tags_replace(message.line);
					$('div#messages-container > pre#messages').append(line + '<br />');
    		}
			}
			
			var startAt = instant.startAt;
			toInstant(startAt);
			
		});
	};
	
	createRows();
	addGuard();
	
});