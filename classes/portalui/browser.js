//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_browser = function(owner){
	if (owner){		
		window.portalui_browser.prototype.parent.constructor.call(this, owner);		
		this.className = "portalui_browser";	
		uses("portalui_timer");
		this.timer = new portalui_timer(this);
		this.timer.setInterval(5000);
		this.timer.onTimer.set(this, "timerTimer");
		this.timer.setEnabled(true);
		
		this.timer2 = new portalui_timer(this);
		this.timer2.setInterval(200);
		this.timer2.onTimer.set(this, "timerTimer2");
		this.timer2.setEnabled(true);
		this.selectedId = 1;
		this.opacity = 0;
		this.counter = 1;
	}
	
};
window.portalui_browser.extend(window.portalui_control);
window.browser = window.portalui_browser;
window.portalui_browser.implement({
	doDraw: function(canvas){
		var n = this.getFullId();
		canvas.style.background = system.getConfig("app.color.grid");
		canvas.style.border = system.getConfig("nonborder.inner.right");
		var html = "<div style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;background-color:"+system.getConfig("form.color")+";}' " +
	                    "onMouseDown ='window.system.getResource(" + this.resourceId + ").eventMouseDown(event);' onMouseUp='window.system.getResource(" + this.resourceId + ").eventMouseUp(event);'>" +
	                    "<div id='" + n + "_sLeftTop' style='{background: url(image/themes/"+system.getThemes()+"/shadowLeftTop.png) top left; position: absolute; left: -15; top: 0; width: 15; height: 20}' ></div>" +
	                    "<div style='{position: absolute; left: -15; top: -20; width: 15; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sLeft' style='{background: url(image/themes/"+system.getThemes()+"/shadowLeft.png) top left repeat-y; position: absolute; left: 0; top: 40; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                    "<div style='{position: absolute; left: -15; top: -20; width: 15; height: 100%;}' >" +
	                        "<div id='" + n + "_sLeftBottom' style='{background: url(image/themes/"+system.getThemes()+"/shadowLeftBottom.png) top left; position: absolute; left: 0; top: 100%; width: 100%; height: 20}' ></div>" +
	                    "</div>" +
	                    "<div id='" + n + "_sEdgeLeft' style='{background: url(image/themes/"+system.getThemes()+"/shadowEdgeLeft.png) top left; position: absolute; left: -15; top: 100%; width: 15; height: 20}' ></div>" +
	                    "<div id='" + n + "_sRightTop' style='{background: url(image/themes/"+system.getThemes()+"/shadowRightTop.png) top left; position: absolute; left: 100%; top: 0; width: 15; height: 20}' ></div>" +
	                    "<div style='{position: absolute; left: 100%; top: -20; width: 15; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sRight' style='{background: url(image/themes/"+system.getThemes()+"/shadowRight.png) top left repeat-y; position: absolute; left: 0; top: 40; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                    "<div style='{position: absolute; left: 100%; top: -20; width: 15; height: 100%;}' >" +
	                        "<div id='" + n + "_sRightBottom' style='{background: url(image/themes/"+system.getThemes()+"/shadowRightBottom.png) top left; position: absolute; left: 0; top: 100%; width: 100%; height: 20}' ></div>" +
	                    "</div>" +
	                    "<div id='" + n + "_sEdgeRight' style='{background: url(image/themes/"+system.getThemes()+"/shadowEdgeRight.png) top left; position: absolute; left: 100%; top: 100%; width: 15; height: 20}' ></div>" +
	                    "<div id='" + n + "_sBottomLeft' style='{background: url(image/themes/"+system.getThemes()+"/shadowBottomLeft.png) top left; position: absolute; left: 0; top: 100%; width: 15; height: 20}' ></div>" +
	                    "<div style='{position: absolute; left: -15; top: 100%; width: 100%; height: 20; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sBottom' style='{background: url(image/themes/"+system.getThemes()+"/shadowBottom.png) top left repeat-x; position: absolute; left: 30; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                    "<div style='{position: absolute; left: -15; top: 100%; width: 100%; height: 20;}' >" +
	                        "<div id='" + n + "_sBottomRight' style='{background: url(image/themes/"+system.getThemes()+"/shadowBottomRight.png) top left repeat-x; position: absolute; left: 100%; top: 0; width: 15; height: 100%}' ></div>" +
	                    "</div>" +
				"<div id='"+ n +"_frame' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;background-color:"+system.getConfig("form.color")+";}'>"+
					"<div id='"+ n +"_image1' style='{position:absolute;left:10; top:20; width:400; height:200;border:"+system.getConfig("nonborder.inner.right")+"}'> </div>"+
					"<div id='"+ n +"_image2' style='{position:absolute;left:10; top:20; width:400; height:200;border:"+system.getConfig("nonborder.inner.right")+"}'> </div>"+
					"<div id='"+ n +"_image3' style='{position:absolute;left:10; top:20; width:400; height:200;border:"+system.getConfig("nonborder.inner.right")+"}'> </div>"+
					"<div id='"+ n +"_image4' style='{position:absolute;left:10; top:20; width:400; height:200;border:"+system.getConfig("nonborder.inner.right")+"}'> </div>"+
					"<div id='"+ n +"_image5' style='{position:absolute;left:10; top:20; width:400; height:200;border:"+system.getConfig("nonborder.inner.right")+"}'> </div>"+
					"<div id='"+ n +"_btn1' style='{position:absolute;left:10; top:222; width:52; height:22;border:"+
						system.getConfig("nonborder.inner.right")+";background:"+system.getConfig("app.color.panel")+";cursor:pointer;}'"+
						"onClick='window.system.getResource(" + this.resourceId + ").eventButtonMouseClick(event, 1);' " +
						"onMouseOver='window.system.getResource(" + this.resourceId + ").eventButtonMouseOver(event, 1);' " +
						"onMouseOut='window.system.getResource(" + this.resourceId + ").eventButtonMouseOut(event, 1);' " +
					" align=center>1</div>"+
					"<div id='"+ n +"_btn2' style='{position:absolute;left:65; top:222; width:52; height:22;border:"+
						system.getConfig("nonborder.inner.right")+";background:"+system.getConfig("app.color.panel")+";cursor:pointer;}'"+
						"onClick='window.system.getResource(" + this.resourceId + ").eventButtonMouseClick(event, 2);' " +
						"onMouseOver='window.system.getResource(" + this.resourceId + ").eventButtonMouseOver(event, 2);' " +
						"onMouseOut='window.system.getResource(" + this.resourceId + ").eventButtonMouseOut(event, 2);' " +
					" align=center>2</div>"+
					"<div id='"+ n +"_btn3' style='{position:absolute;left:120; top:222; width:52; height:22;border:"+
						system.getConfig("nonborder.inner.right")+";background:"+system.getConfig("app.color.panel")+";cursor:pointer;}'"+
						"onClick='window.system.getResource(" + this.resourceId + ").eventButtonMouseClick(event, 3);' " +
						"onMouseOver='window.system.getResource(" + this.resourceId + ").eventButtonMouseOver(event, 3);' " +
						"onMouseOut='window.system.getResource(" + this.resourceId + ").eventButtonMouseOut(event, 3);' " +
					" align=center>3</div>"+
					"<div id='"+ n +"_btn4' style='{position:absolute;left:175; top:222; width:52; height:22;border:"+
						system.getConfig("nonborder.inner.right")+";background:"+system.getConfig("app.color.panel")+";cursor:pointer;}'"+
						"onClick='window.system.getResource(" + this.resourceId + ").eventButtonMouseClick(event, 4);' " +
						"onMouseOver='window.system.getResource(" + this.resourceId + ").eventButtonMouseOver(event, 4);' " +
						"onMouseOut='window.system.getResource(" + this.resourceId + ").eventButtonMouseOut(event, 4);' " +
					" align=center>4</div>"+
					"<div id='"+ n +"_btn5' style='{position:absolute;left:230; top:222; width:52; height:22;border:"+
						system.getConfig("nonborder.inner.right")+";background:"+system.getConfig("app.color.panel")+";cursor:pointer;}'"+
						"onClick='window.system.getResource(" + this.resourceId + ").eventButtonMouseClick(event, 5);' " +
						"onMouseOver='window.system.getResource(" + this.resourceId + ").eventButtonMouseOver(event, 5);' " +
						"onMouseOut='window.system.getResource(" + this.resourceId + ").eventButtonMouseOut(event, 5);' " +
					"align=center>5</div>"+
					
					"<div id='"+ n +"_text1' style='{position:absolute;left:10; top:250; width:400; height:200;border:"+system.getConfig("nonborder.inner.right")+";overflow:auto}'> </div>"+
					"<div id='"+ n +"_text2' style='{position:absolute;left:10; top:250; width:400; height:200;border:"+system.getConfig("nonborder.inner.right")+";overflow:auto}'> </div>"+
					"<div id='"+ n +"_text3' style='{position:absolute;left:10; top:250; width:400; height:200;border:"+system.getConfig("nonborder.inner.right")+";overflow:auto}'> </div>"+
					"<div id='"+ n +"_text4' style='{position:absolute;left:10; top:250; width:400; height:200;border:"+system.getConfig("nonborder.inner.right")+";overflow:auto}'> </div>"+
					"<div id='"+ n +"_text5' style='{position:absolute;left:10; top:250; width:400; height:200;border:"+system.getConfig("nonborder.inner.right")+";overflow:auto}'> </div>"+					
				"</div>";
		this.setInnerHTML(html, canvas);
	},
	setHtml: function(html){
		var cnv = $(this.getFullId() +"_container");
		cnv.innerHTML = html;
	},
	setAddress: function(address){
		var cnv = $(this.getFullId() +"_container");
		cnv.src = address;
	},
	setWidth: function(data){
		window.portalui_browser.prototype.parent.setWidth.call(this, data);
		var cnv = $(this.getFullId() +"_image1");
		cnv.style.width = this.getWidth() - 20;
		cnv = $(this.getFullId() +"_image2");
		cnv.style.width = this.getWidth() - 20;
		cnv = $(this.getFullId() +"_image3");
		cnv.style.width = this.getWidth() - 20;
		cnv = $(this.getFullId() +"_image4");
		cnv.style.width = this.getWidth() - 20;
		cnv = $(this.getFullId() +"_image5");
		cnv.style.width = this.getWidth() - 20;
		cnv = $(this.getFullId() +"_text1");
		cnv.style.width = this.getWidth() - 20;
		cnv = $(this.getFullId() +"_text2");
		cnv.style.width = this.getWidth() - 20;
		cnv = $(this.getFullId() +"_text3");
		cnv.style.width = this.getWidth() - 20;
		cnv = $(this.getFullId() +"_text4");
		cnv.style.width = this.getWidth() - 20;
		cnv = $(this.getFullId() +"_text5");
		cnv.style.width = this.getWidth() - 20;		
	},
	setHeight: function(data){
		window.portalui_browser.prototype.parent.setHeight.call(this, data);
	},
	eventButtonMouseClick: function(event, id){
		if (this.selectedId != id)
		{
			var cnv = $(this.getFullId() +"_btn"+this.selectedId);
			cnv.style.background = system.getConfig("app.color.panel");
			this.changeData(id);
			this.selectedId = id;
		}	
	},
	eventButtonMouseOver: function(event, id){
		var cnv = $(this.getFullId() +"_btn"+id);
		cnv.style.background = system.getConfig("text.highlightBgColor");
	},
	eventButtonMouseOut: function(event, id){
		var cnv = $(this.getFullId() +"_btn"+id);
		if (this.selectedId == id)
			cnv.style.background = system.getConfig("form.button.color");
		else
			cnv.style.background = system.getConfig("app.color.panel");
	},
	timerTimer: function(sender){
		var cnv = $(this.getFullId() +"_btn"+this.selectedId);
		cnv.style.background = system.getConfig("app.color.panel");
		
		this.selectedId++;
		if (this.selectedId == 6)
			this.selectedId = 1;
		this.counter = 1;
		this.opacity = 0;
		this.timer2.setEnabled(true);
		this.changeData(this.selectedId);
	},
	timerTimer2: function(sender){
		var cnv = $(this.getFullId() +"_image"+this.selectedId);		
		if (this.opacity < 100)
			this.opacity += 10;
		else 
			this.timer2.setEnabled(false);		
		this.counter++;		
		cnv.style.MozOpacity = (this.opacity/100);
	    cnv.style.opacity = (this.opacity/100);
	    cnv.style.filter = 'alpha(opacity='+this.opacity+')';
	},
	setImageList: function(imageList){
		try{
			var cnv = undefined;
			for (var i =0;i < imageList.length;i++){
				cnv = $(this.getFullId() +"_image"+(i+1));
				cnv.style.background = "url("+imageList[i]+") no-repeat";
				cnv.style.MozOpacity = (10/100);
				cnv.style.opacity = (10/100);
				cnv.style.filter = 'alpha(opacity='+10+')';
				if (i > 0)
					cnv.style.display = "none";
			}
		}catch(e){
			alert("[browser]::setImageList:"+e);
		}
	},
	setTextList: function(textList){
		try
		{
			var cnv = undefined;

			for (var i =0;i < textList.length;i++)
			{
				cnv = $(this.getFullId() +"_text"+(i+1));
				cnv.innerHTML = textList[i];
				cnv.style.background = system.getConfig("form.color");
				if (i > 0)
					cnv.style.display = "none";
			}
		}catch(e)
		{
			alert("[browser]::setTextList:"+e);
		}
	},
	changeData: function(id){
		try
		{
			var cnv = undefined;
			for (var i =0;i < 5;i++)
			{
				cnv = $(this.getFullId() +"_image"+(i+1));
				if (id == (i + 1))
					cnv.style.display = "";
				else
					cnv.style.display = "none";
				cnv.style.MozOpacity = (10/100);
				cnv.style.opacity = (10/100);
				cnv.style.filter = 'alpha(opacity='+10+')';
				
				cnv = $(this.getFullId() +"_text"+(i+1));
				if (id == (i + 1))
					cnv.style.display = "";
				else
					cnv.style.display = "none";
			}
			var cnv = $(this.getFullId() +"_btn"+id);
			if (this.selectedId == id)
				cnv.style.background = system.getConfig("form.button.color");
		}catch(e)
		{
			alert("[browser]::changeData:"+e);
		}	
	}
});
