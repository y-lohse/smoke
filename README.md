# Elemental.js

A simple and quite useless jquery plugin that simulates some elemental effects on text 
using css3 shadows.

## Usage

You can use predefined options --fire__, __water__ and __earth__

```
$('element').elemental('fire');//simulates burning text
$('element').elemental('water');//simulates water falling from text
$('element').elemental('earth');//adds some ground beneath the tex
```

Or pass in a custom object. It's essentially going to draw a gradient from one color to another,
and tghen animate the height ofthe gradient.

```
$('element').elemental({
	colorStart:'100,85,50',//color closest to the text
	colorEnd:'100,85,150',//color most far away from text
	y:50,//height of the gradient
	yMax:50,//maximum height
	yVariation:5,//allowed variation between heights at differnet points
	direction:'down'//gradients direction. Can be either up or down.
});
```

## Why ?
See [my blog post about it](http://yannick-lohse.fr/2012/09/jquery-plugin/). But really, this shouldn't be used in the real world. Ever.