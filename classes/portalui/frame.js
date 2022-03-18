//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_frame = function(owner,options){
    if (owner){
        this.showBorder = true;
        this.bgColor = "#FFFFFF";
        this.title = "Title";        
        window.portalui_frame.prototype.parent.constructor.call(this, owner, options);
        this.className = "portalui_frame";		
		this.onAfterResize = new portalui_eventHandler();
        this.isMinimize = false;
		this.isMaximize = false;
		if (options !== undefined){
			this.updateByOptions(options);	
			if (options.pointPosition) this.setPointPosition(options.pointPosition);
			if (options.pointMode) this.setPointMode(options.pointMode);			
		}
    }       
};
window.portalui_frame.extend(window.portalui_containerControl);
window.portalui_frame.PM_UP = 0;
window.portalui_frame.PM_DOWN = 1;
window.portalui_frame.PM_LEFT = 2;
window.portalui_frame.PM_RIGHT = 3;
window.frame = window.portalui_frame;
//---------------------------- Function ----------------------------------------
window.portalui_frame.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();
	    var html =  "<div id='"+ n +"formBody'style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;background-color:"+this.color+";}' " +
				    "onMouseDown ='$$(" + this.resourceId + ").eventMouseDown(event);' >" +
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
				    "</div>" +                //
				    "<div id='" + n + "_bg' style='{background-color:"+system.getConfig("form.color")+"; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +							//background: url(image/themes/formLeft.png) top left repeat-y; 
				    "<div id='" + n + "_left' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
													//background: url(image/themes/formRight.png) top right repeat-y; 
				    "<div id='" + n + "_right' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +											//background: url(image/themes/formTop.png) top left repeat-x
				    "<div id='" + n + "_top' style='{background:url(icon/"+system.getThemes()+"/formHeader.png) repeat-x; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +//background: url(image/themes/formBottom.png) bottom left repeat-x;
				    "<div id='" + n + "_bottom' style='{ position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
																//background: url(image/themes/formTopLeft.png) top left no-repeat;
				    "<div id='" + n + "_topLeft' style='{ position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
																//background: url(image/themes/formTopRight.png) top right no-repeat; 
				    "<div id='" + n + "_topRight' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
																//background: url(image/themes/formBottomLeft.png) bottom left no-repeat; 
				    "<div id='" + n + "_bottomLeft' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
															//background: url(image/themes/formBottomRight.png) bottom right no-repeat;
				    "<div id='" + n + "_bottomRight' style='{ position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
				    "<div style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: hidden;}' >" +
					"<div id='" + n + "form' style='{background-color:"+system.getConfig("form.color")+";position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>" +
				    "</div>" +                                  //"+system.getConfig("form.color")+"
						
					"</div>"+
					"<div id='"+ n +"_point' style='position:absolute;left:0;top:0;width:28;height:17'> </div>";				
				
		    this.setInnerHTML(html, canvas);
			this.pointCnv = $(n +"_point");
			if (systemAPI.browser.msie && systemAPI.browser.version == 6){
				var b1 = $( n +"_sLeftTop");
				var b2 = $( n +"_sLeft");
				var b3 = $( n +"_sEdgeLeft");
				var b4 = $( n +"_sBottomLeft");
				var b5 = $( n +"_sRightTop");
				var b6 = $( n +"_sRight");
				var b7 = $( n +"_sEdgeRight");
				var b8 = $( n +"_sBottomRight");
				var b9 = $( n +"_sBottom");			
				DD_belatedPNG.fixPngArray([b1,b2,b3,b4,b5,b6,b7,b8,b9]);
			}
	   
	},
	setPointPosition : function(point){
		this.pointPosition = point;
		this.update();
	},
	setPointMode: function(mode){
		this.pointMode = mode;
		this.update();
	},
	update: function(){
		switch (this.pointMode){
			case 0 : //up
				this.pointCnv.style.left = this.pointPosition;
				this.pointCnv.style.top = -17;
				this.pointCnv.style.width = 28;
				this.pointCnv.style.height = 17;
				this.pointCnv.style.background = "url(image/themes/"+system.getThemes()+"/framePointUp.png)0 0 no-repeat";
			break;
			case 1 : //down
				this.pointCnv.style.left = this.pointPosition;
				this.pointCnv.style.top = this.height;
				this.pointCnv.style.width = 28;
				this.pointCnv.style.height = 17;
				this.pointCnv.style.background = "url(image/themes/"+system.getThemes()+"/framePointDown.png)0 0 no-repeat";
			break;
			case 2 : //left
				this.pointCnv.style.top = this.pointPosition;
				this.pointCnv.style.left = -17;
				this.pointCnv.style.width = 17;
				this.pointCnv.style.height = 28;
				this.pointCnv.style.background = "url(image/themes/"+system.getThemes()+"/framePointLeft.png)0 0 no-repeat";
			break;
			case 3: //right
				this.pointCnv.style.top = this.pointPosition;
				this.pointCnv.style.left = this.width;
				this.pointCnv.style.width = 17;
				this.pointCnv.style.height = 28;
				this.pointCnv.style.background = "url(image/themes/"+system.getThemes()+"/framePointRight.png)0 0 no-repeat";
			break;	
		}
	},
	block: function(){

	},
	unblock: function(){
		
	},
	setColor: function(color){
		$(this.getFullId() + "form").style.backgroundColor = color;
	},
	setPointImg: function(img){
		this.pointCnv.style.background = img;
	}
});
