/*
	Design Notes:
	This should only ever act as _enhancement_, not a _required_ feature.
	If JS fails to load, the user _should not need to be notified_.
	That is, minimum cosmetics. Nothing more.
*/

function check_storage() {
	var test = 'test';
    try {
        localStorage.setItem(test, test);
        if(localStorage.getItem(test) === test) {
	        localStorage.removeItem(test);
	        return true;
	    } else {
	    	return false;
	    }
    } catch(e) {
        return false;
    }
}

function record_details() {
	var elements = document.getElementsByTagName("details");

	var found = [];

	for(var i = 0; i < elements.length; i++) {
		if(elements[i].open) {
			found.push(elements[i].id);
		}
	}

	if(check_storage()) {
		localStorage.setItem('state', JSON.stringify(found));
	}
}

function click_detail(event) {
	window.setTimeout(record_details, 300);
}

function init_open() {
	// Hook up elements to record changes
	var elements = document.getElementsByTagName("details");
	for(var i = 0; i < elements.length; i++) {
		elements[i].addEventListener('click', click_detail);
	}

	// Is there a game state to restore?
	if(check_storage()) {
		if(!!localStorage.getItem('state')) {
			try {
				var items = JSON.parse(localStorage.getItem('state'));
				for(var i = 0; i < items.length; i++) {
					var el = document.getElementById(items[i]);
					el.setAttribute('open', true);
				}
			} catch(e) {
				// TODO: Save state corrupted!
			}
		}
	}
}

window.addEventListener('load', init_open);
