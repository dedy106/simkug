function findPos(form, obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent != form?obj.offsetParent:undefined) {
			curleft += obj.offsetLeft - obj.scrollLeft;
			curtop += obj.offsetTop - obj.scrollTop;
		}
	}
	return [curleft,curtop];
};
function delay(interval){
	var date = new Date();
	var curDate = null; 
	do { curDate = new Date(); } 
	while(curDate-date < interval);
};
// convert the color to rgb from hex //
function colorConv(color) {
  var rgb = [parseInt(color.substring(0,2),16), 
    parseInt(color.substring(2,4),16), 
    parseInt(color.substring(4,6),16)];
  return rgb;
};
function colorFade(target,element,start,end,steps,speed) {
	var startrgb,endrgb,er,eg,eb,step,rint,gint,bint,step;	
	steps = steps || 20;
	speed = speed || 20;
	clearInterval(target.timer);
	endrgb = colorConv(end);
	er = endrgb[0];
	eg = endrgb[1];
	eb = endrgb[2];
	if(!target.r) {
		startrgb = colorConv(start);
		r = startrgb[0];
		g = startrgb[1];
		b = startrgb[2];
		target.r = r;
		target.g = g;
		target.b = b;
	}
	rint = Math.round(Math.abs(target.r-er)/steps);
	gint = Math.round(Math.abs(target.g-eg)/steps);
	bint = Math.round(Math.abs(target.b-eb)/steps);
	if(rint == 0) { rint = 1 }
	if(gint == 0) { gint = 1 }
	if(bint == 0) { bint = 1 }
	target.step = 1;
	target.timer = setInterval( function() { animateColor(target,element,steps,er,eg,eb,rint,gint,bint) }, speed);
};
function animateColor(target,element,steps,er,eg,eb,rint,gint,bint) {  
  var color;
  if(target.step <= steps) {
    var r = target.r;
    var g = target.g;
    var b = target.b;
    if(r >= er) {
      r = r - rint;
    } else {
      r = parseInt(r) + parseInt(rint);
    }
    if(g >= eg) {
      g = g - gint;
    } else {
      g = parseInt(g) + parseInt(gint);
    }
    if(b >= eb) {
      b = b - bint;
    } else {
      b = parseInt(b) + parseInt(bint);
    }
    color = 'rgb(' + r + ',' + g + ',' + b + ')';
    if(element == 'background') {
      target.style.backgroundColor = color;
    } else if(element == 'border') {
      target.style.borderColor = color;
    } else {
      target.style.color = color;
    }
    target.r = r;
    target.g = g;
    target.b = b;
    target.step = target.step + 1;
  } else {
    clearInterval(target.timer);
    color = 'rgb(' + er + ',' + eg + ',' + eb + ')';
    if(element == 'background') {
      target.style.backgroundColor = color;
    } else if(element == 'border') {
      target.style.borderColor = color;
    } else {
      target.style.color = color;
    }
  }
};
function setProportional(img, height, width){				
		if (document.all || window.opera) {
			img.naturalHeight = img.height;
			img.naturalWidth = img.width;
		}
		
		var sH = height / img.naturalHeight;
		var sW = width / img.naturalWidth;					
		
		if (sH < sW) {
			img.height = height;
			img.width = Math.round(img.naturalWidth * sH);
			img.style.height = height;
			img.style.width = Math.round(img.naturalWidth * sH);
		} else {
			img.width = width;
			img.height = Math.round(img.naturalHeight * sW);
			img.style.width = width;
			img.style.height = Math.round(img.naturalHeight * sW);
		}				
	}
