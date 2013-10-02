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

function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}

function loadJSON() {
	var request = makeHttpObject();
	request.open("GET", "json/" + YOUTUBE_ID + ".json", false);
	request.send(null);
	return request.responseText;
};

$(function() {
	
	var txt = loadJSON();
	
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
				$('div#messages-container').append('<p id="file"></p>');
			  $('div#messages-container > p#file').html('<strong>file: ' + file + '</strong>');
			}

			if (instant.hasOwnProperty('messages')) {
				var messages = instant.messages;
				var message = '';
				var i = 0;
				$('div#messages-container').append('<pre id="messages"></pre>');
				for ( i; i < messages.length; i++ ) {
      		message = instant.messages[i];
					line = safe_tags_replace(message.line);
					$('div#messages-container > pre#messages').append(line + '\n');
    		}
			}
			
			startAt = instant.startAt;
			callPlayer('player-container','seekTo',[startAt]);
			
		});
	};
	
	createRows();
	addGuard();
	
});