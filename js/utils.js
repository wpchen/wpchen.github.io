function getFileID(file) {
	return file.size;
	//+ '-' + Math.round(file.duration * 100); // todo: change
}

// Converts a timestring to a timestamp (ex: "0:01:14" => 74)
function timestampFromTimestring(timestring) {
	var matches = timestring.match(/^(\d+):(\d+):(\d+)$/);
	if (!matches) {
		throw 'Attempting to convert invalid timestring to timestamp: ' +
		 timestring;
	}
	var hour = parseInt(matches[1]);
	var min = parseInt(matches[2]);
	var sec = parseInt(matches[3]);
	return  (3600 * hour) + (60 * min) + sec;
}

// ex: "0:04:45" => "   4:45"
function prettifyTimestring(timestring) {
	// omg, there has to be an easier way t
	return timestring.replace(/^(0:0|0:)/, function(match) {
		return Array(match.length + 1).join(" ");
	});
}

// ex: 5437.189333 => "01:30:37.189"
function timestringFromTimestamp(timestamp) {
  timestamp = Math.round(timestamp * 1000);
  var millisec = timestamp % 1000;
  timestamp = Math.floor(timestamp / 1000);
  var sec = timestamp % 60;
  timestamp = Math.floor(timestamp / 60);
  var min = timestamp % 60;
  var hour = Math.floor(timestamp / 60);

  if (hour < 10) {
    hour = "0" + hour;
  }
	if (min < 10) {
		min = "0" + min;
	}
	if (sec < 10) {
		sec = "0" + sec;
	}
  if (millisec < 10) {
    millisec = "0" + millisec;
  }
  if (millisec < 100) {
    millisec = "0" + millisec;
  }
	return hour + ":" + min + ":" + sec + "." + millisec;
}

// Copied from http://api.jquery.com/jquery.callbacks/
var topics = {};
jQuery.Topic = function( id ) {
  var callbacks, method,
    topic = id && topics[ id ];

  if ( !topic ) {
    callbacks = jQuery.Callbacks();
    topic = {
      publish: callbacks.fire,
      subscribe: callbacks.add,
      unsubscribe: callbacks.remove
    };
    if ( id ) {
      topics[ id ] = topic;
    }
  }
  return topic;
};
// end copy and paste
