(function(jQuery){
	jQuery.fn.elemental = function(options){
		//canceling eventuel animations allready running on the same element
		if (jQuery.fn.elemental.elements.indexOf(this[0]) >= 0){
			clearTimeout(this.data('timeout'));
		}
		
		//fetching options
		if (typeof options === 'string'){
			if (jQuery.fn.elemental.optionSets[options]) options = jQuery.fn.elemental.optionSets[options];
			else options = {};
		}
		else options = options || {};
		
		var colorStart = (function(){
				if (typeof options.colorStart === 'string' && options.colorStart.split(',').length === 3){
					var colors = options.colorStart.split(',');
					for (var i = 0; i < 3; i++){
						colors[i] = parseInt(colors[i]);
					}
					return colors;
				}
				else return [198,65,24];
			})(),
			colorEnd = (function(){
				if (typeof options.colorEnd === 'string' && options.colorEnd.split(',').length === 3){
					var colors = options.colorEnd.split(',');
					for (var i = 0; i < 3; i++){
						colors[i] = parseInt(colors[i]);
					}
					return colors;
				}
				else return [198,188,24];
			})(),
			y = options.y || 30,
			yVariation = options.yVariation || 3,
			yMax = options.yMax || 100,
			x = options.x || 0;
			xVariation = options.xVariation || 0,
			xMax = options.xMax || 100,
			direction = (options.direction == 'down') ? 1 : -1,
			wind = options.wind || 0;
			interval = options.interval || 100;
			
		//split innerhtml into spans?
		if (options.split === false) self = this;
		else {
			var pieces = this.text().split('');
			this.empty();
			for (var i = 0, l = pieces.length; i < l; i++){
				this.append('<span>'+pieces[i]+'</span>');
			}
			self = this.find('span');
		}
		
		//ineternal constants
		var bluring = .7,
			layerjumps = 4;
		
		(function(element){
			if (self.data('timeout') === false) {
				return;
			}
			
			self.each(function(){
				//core function
				var iterations = Math.max(Math.min(y+Math.round(Math.random()*(yVariation*2))-yVariation, yMax), -yMax),
					layers = [];
					decalllage = x;
					
				for (var i = 0; i < iterations; i+=layerjumps){
					var a = (iterations-i)/(iterations*2)+.5,
						r = Math.round((colorEnd[0]-colorStart[0])*(iterations-i)/iterations+colorStart[0]),
						g = Math.round((colorEnd[1]-colorStart[1])*(iterations-i)/iterations+colorStart[1]),
						b = Math.round((colorEnd[2]-colorStart[2])*(iterations-i)/iterations+colorStart[2]);
					layers.push(decalllage+'px '+(i*direction)+'px '+Math.round(i*bluring)+'px rgba('+r+', '+g+', '+b+', '+a+')');
					
					decalllage = Math.max(Math.min(decalllage+wind+Math.round(Math.random()*(xVariation*2))-xVariation, xMax), -xMax);
				}
				
				jQuery(this).css('text-shadow', layers.join(','));
			});
			
			//rerun the function
			var fn = arguments.callee;
			var to = setTimeout(function(){
				fn(element);
			}, interval);
			element.data('timeout', to);
		})(this);
		
		jQuery.fn.elemental.elements.push(this[0]);
		return this;
	}
	
	jQuery.fn.elemental.elements = [];
	jQuery.fn.elemental.optionSets = {
		fire:  {},//fire is the default options
		water: {colorStart:'100,100,225',colorEnd:'12,12,101',y:50,yMax:50,yVariation:5,direction:'down'},
		earth: {colorStart:'60,35,6',colorEnd:'142,106,67',y:80,yMax:50,yVariation:0,direction:'down'}
	};
})(jQuery);