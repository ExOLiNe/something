(function() {
	(function () {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
				|| window[vendors[x] + 'CancelRequestAnimationFrame'];
		}


		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function (callback) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function () {
						callback(currTime + timeToCall);
					},
					timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function (id) {
				clearTimeout(id);
			};
	})();

	window.animationLoop = function(callback, interval, delay) {
		var time = 0;
		var animationResource = {};
		function loop(startTime) {
			if(startTime - time > interval) {
				callback();
				time = startTime;
			}
			animationResource.id = window.requestAnimationFrame(loop);
		}
		if(delay) {
			setTimeout(loop, delay);
		} else {
			loop();
		}
		return animationResource;
	};

	var speed = 200;
	var typeText = document.getElementById("typetext").children[0].innerText;
	var chars = ["eе", "EЕ", "TТ", "oо", "OО", "pр", "PР", "aа", "AА", "HН", "KК", "xх", "XХ", "cс", "CС", "BВ", "MМ"];
	for (i = 0; i < chars.length; ++i) typeText = typeText.replace(new RegExp(chars[i].charAt(0), "gm"), chars[i].charAt(1));
	i = 0;
	var inputText = document.getElementById('inputtext');
	var loop = animationLoop(function() {
		if(i >= typeText.length) {
			window.cancelAnimationFrame(loop);
			return;
		}
		inputText.value += typeText.charAt(i);
		var charCode = typeText.charCodeAt(i);
		var keyboardEvent = document.createEvent('KeyboardEvent');
		keyboardEvent.initEvent('keyup', true, true);
		keyboardEvent.keyCode = charCode;
		keyboardEvent.which = charCode;
		inputText.dispatchEvent(keyboardEvent);
		i++;
	}, speed);
})();
