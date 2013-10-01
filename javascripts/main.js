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
			
			$('div#messages-container').html('');
			
			if (instant.hasOwnProperty('file')) {
				var file = instant.file;
				$('div#messages-container').html('<p id="file"></p>');
			  $('div#messages-container > p#file').html('<strong>file: ' + file + '</strong>');
			}

			if (instant.hasOwnProperty('messages')) {
				var messages = instant.messages;
				var message = '';
				var i = 0;
				$('div#messages-container').html('<pre id="messages"></pre>');
				for ( i; i < messages.length; i++ ) {
      		message = instant.messages[i];
					line = safe_tags_replace(message.line);
					$('div#messages-container > pre#messages').append(line + '\n');
    		}
			}
			
			var startAt = instant.startAt;
			toInstant(startAt);
			
		});
	};
	
	createRows();
	addGuard();
	
});