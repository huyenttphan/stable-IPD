function PathLoader( el ) {
	this.el = el;
	// clear stroke
	this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.el.getTotalLength();
}

PathLoader.prototype._draw = function( val ) {
	this.el.style.strokeDashoffset = this.el.getTotalLength() * ( 1 - val );
}

PathLoader.prototype.setProgress = function( val, callback ) {
	this._draw(val);
	if( callback && typeof callback === 'function' ) {
		// give it a time (ideally the same like the transition time) so that the last progress increment animation is still visible.
		setTimeout( callback, 200 );
	}
}

PathLoader.prototype.setProgressFn = function( fn ) {
	if( typeof fn === 'function' ) { fn( this ); }
}

var simulationFn = function(instance) {
	var progress = 0,
		interval = setInterval( function() {
			progress = Math.min( progress + Math.random() * 0.1, 1 );
			instance.setProgress( progress );
			// reached the end
			if( progress === 1 ) {
				clearInterval( interval );
			}
		}, 100 );
};

var loader = new PathLoader([pathselector]);
loader.setProgressFn(simulationFn);



(function() {

	var support = { animations : Modernizr.cssanimations },
		container = document.getElementById( 'ip-container' ),
		header = container.querySelector( 'header.ip-header' ),
		loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

	function init() {
		var onEndInitialAnimation = function() {
			if( support.animations ) {
				this.removeEventListener( animEndEventName, onEndInitialAnimation );
			}

			startLoading();
		};

		// disable scrolling
		window.addEventListener( 'scroll', noscroll );

		// initial animation
		classie.add( container, 'loading' );

		if( support.animations ) {
			container.addEventListener( animEndEventName, onEndInitialAnimation );
		}
		else {
			onEndInitialAnimation();
		}
	}

	function startLoading() {
		// simulate loading something..
		var simulationFn = function(instance) {
			var progress = 0,
				interval = setInterval( function() {
					progress = Math.min( progress + Math.random() * 0.1, 1 );

					instance.setProgress( progress );

					// reached the end
					if( progress === 1 ) {
						classie.remove( container, 'loading' );
						classie.add( container, 'loaded' );
						clearInterval( interval );

						var onEndHeaderAnimation = function(ev) {
							if( support.animations ) {
								if( ev.target !== header ) return;
								this.removeEventListener( animEndEventName, onEndHeaderAnimation );
							}

							classie.add( document.body, 'layout-switch' );
							window.removeEventListener( 'scroll', noscroll );
						};

						if( support.animations ) {
							header.addEventListener( animEndEventName, onEndHeaderAnimation );
						}
						else {
							onEndHeaderAnimation();
						}
					}
				}, 80 );
		};

		loader.setProgressFn( simulationFn );
	}
	
	function noscroll() {
		window.scrollTo( 0, 0 );
	}

	init();
})();