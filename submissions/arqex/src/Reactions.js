import State from './State';

var currentRequest = {};

State.on('planet:update', function( planet ){
	var state = State.get(),
		sithAtHome = isSithAtHome( planet )
	;

	state.set({
		currentPlanet: planet,
		sithAtHome: sithAtHome
	});

	if( sithAtHome )
		cancelRequests();
	else
		State.trigger('siths:findNext');
});

State.on('siths:fetch', function( id ){
	fetchSith( id, function( sith ){
		var state = State.get().pivot(),
			found = false,
			i = 0,
			sithAtHome = sith.homeworld.id == state.currentPlanet.id
		;

		while( !found && i<state.siths.length ){
			if( sith.id == state.siths[i].id ){
				found = true;
				state = state.siths.set( i, sith );
			}
			i++;
		}

		state.set({
			upDisabled: checkUpDisabled(),
			downDisabled: checkDownDisabled(),
			sithAtHome: state.sithAtHome || sithAtHome
		});

		// Look for the next sith
		if( !sithAtHome )
			State.trigger('siths:findNext');
	});
});

State.on('siths:goUp', function(){
	var state = State.get();
	if( state.sithAtHome || state.upDisabled )
		return;

	cancelRequests();
	state
		.set({
			siths: [{},{}].concat( state.siths.slice(0,3) )
		})
		.set({
			upDisabled: checkUpDisabled(),
			downDisabled: checkDownDisabled()
		})
	;
	State.trigger('siths:findNext');
});

State.on('siths:goDown', function(){
	var state = State.get();
	if( state.sithAtHome || state.downDisabled )
		return;

	cancelRequests();
	state
		.set({
			siths: state.siths.slice(2).concat([{},{}])
		})
		.set({
			upDisabled: checkUpDisabled(),
			downDisabled: checkDownDisabled()
		})
	;
	State.trigger('siths:findNext');
});

State.on('siths:findNext', function(){
	var state = State.get(),
		mode = 'master',
		candidate = false,
		found = false,
		i = 0,
		current
	;

	while( !found && i < state.siths.length ){
		current = state.siths[i];
		if( current.id && !current.name )
			found = current.id;
		else if( !current.id ){
			if( mode == 'master' ){
				candidate = i;
			}
			else if( state.siths[i-1].apprentice ) {
				found = state.siths[ i - 1 ].apprentice.id;
				state.siths.set( i,  {id: found} );
			}
		}
		else {
			if( candidate !== false && current.master ){
				found = current.master.id;
				state.siths.set( candidate,  {id: found} );
			}
			else {
				mode = 'apprentice';
			}
		}
		i++;
	}

	if( found )
		State.trigger('siths:fetch', found);
});


function isSithAtHome( planet ){
	var state = State.get(),
		found = false,
		i = 0,
		currentSith
	;

	while( !found && i<state.siths.length ){
		currentSith = state.siths[i++];
		found = currentSith.homeworld && planet.id == currentSith.homeworld.id;
	}

	return found;
}

function fetchSith( id, clbk ){
	if( currentRequest.id === id )
		return;

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:3000/dark-jedis/' + id);
	xhr.responseType = 'json';

	xhr.onload = function() {
		if(this.status == 200) {
			clbk(this.response);
		}
	};

	xhr.send();
	currentRequest = { id: id, xhr: xhr };
}

function cancelRequests(){
	if( currentRequest.xhr ){
		currentRequest.xhr.abort();
		currentRequest = {};
	}
}

/**
 * Check if the down button should be disabled.
 * When the last sith have no apprentice or it is in slot 0 or 1.
 * @return {Boolean}
 */
function checkDownDisabled(){
	var last = false,
		siths = State.get().siths,
		i = siths.length - 1
	;

	while( !last ){
		if( siths[i].name ){
			last = siths[i];
		}
		else {
			i--;
		}
	}

	return i < 2 || !last.apprentice.id;
}
/**
 * Check if the up button should be disabled.
 * When the first sith have no master or it is in slot 3 or 4.
 * @return {Boolean}
 */
function checkUpDisabled(){
	var first = false,
		siths = State.get().siths,
		i = 0
	;

	while( !first ){
		if( siths[i].name ){
			first = siths[i];
		}
		else {
			i++;
		}
	}

	return i > 2 || !first.master.id;
}
