//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_suggestionBox = function(owner){
	window.portalui_suggestionBox.prototype.parent.constructor.call(this,owner);	
	this.className = "portalui_suggestionBox";	
	this.items = [];
	this.page = 0;
	this.onItemClick = new portalui_eventHandler();
	this.maxHeight = 200;
};
window.portalui_suggestionBox.extend(window.portalui_commonForm);
window.suggestionBox = window.portalui_suggestionBox;
window.portalui_suggestionBox.implement({
	doDraw: function(canvas){
	    var n = this.getFullId();
		var html = "<div id='" + n + "_sLeftTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeftTop.png) top left no-repeat; position: absolute; left: -8; top: 0; width: 8; height: 8}' ></div>" +
	                    "<div style='{position: absolute; left: -8; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeft.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                    "<div id='" + n + "_sEdgeLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeLeft.png) top left no-repeat; position: absolute; left: -8; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div id='" + n + "_sBottomLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomLeft.png) top left no-repeat; position: absolute; left: 0; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div id='" + n + "_sRightTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRightTop.png) top left no-repeat; position: absolute; left: 100%; top: 0; width: 8; height: 8}' ></div>" +
	                    "<div style='{position: absolute; left: 100%; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRight.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                    "<div id='" + n + "_sEdgeRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeRight.png) top left no-repeat; position: absolute; left: 100%; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div style='{position: absolute; left: -8; top: 100%; width: 100%; height: 12;}' >" +
	                        "<div id='" + n + "_sBottomRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomRight.png) top left no-repeat; position: absolute; left: 100%; top: 0; width: 8; height: 12}' ></div>" +
	                    "</div>" +
	                    "<div style='{position: absolute; left: -8; top: 100%; width: 100%; height: 12; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sBottom' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottom.png) top left repeat-x; position: absolute; left: 16; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "</div>" + 
                    "<div id='"+this.getFullId()+"_frame' style='position:absolute;left:0;top:0;height:100%;width:100%;overflow:auto'>"+
                    "<div id='"+this.getFullId()+"_cont' style='position:absolute;left:0;top:0;height:auto;width:100%'></div></div>";
	   canvas.style.background = "#ffffff";
	   canvas.style.border = "1px solid #cccccc";
	   this.setInnerHTML(html,canvas);
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
	add: function(value){	   
	   var founded = false;
	   for (var i in this.items)
	       if (this.items[i] == value) founded = true;
       if (!founded) this.items[this.items.length] = value;
    },
    del: function(value){
        this.items = deleteByObject(this.items,value);
    },
    setCtrl: function(ElmToLink){
        try{
            //this.setBound(ElmToLink.left,ElmToLink.top + ElmToLink.height,ElmToLink.width,20); 
            this.inputElm = $(ElmToLink.getFullId()+"_edit");					
			this.linkCtrl = ElmToLink;
        }catch(e){
            systemAPI.alert(this+"$init()",e);
        }
    },
    search: function(text){
        try{
            this.show();
            var html = "";
            for (var i in this.items){
                if (this.items[i].substr(0,text.length) == text)
                    html += "<span onMouseOver='$$("+this.resourceId+").itemsOver(event);' onMouseOut='$$("+this.resourceId+").itemsOut(event);'"+
                    "   onclick='$$("+this.resourceId+").doSearchClick(\""+this.items[i]+"\")'  style='width:100%;display:block;left:0;position:relative;height:20;'>"+this.items[i]+"</span>";
            }
            $(this.getFullId()+"_cont").innerHTML = html;
            if (parseInt($(this.getFullId()+"_cont").offsetHeight) > this.maxHeight) this.setHeight(this.maxHeight);
            else if (parseInt($(this.getFullId()+"_cont").offsetHeight) == 0 ) this.setHeight(20);
            else this.setHeight(parseInt($(this.getFullId()+"_cont").offsetHeight));
            this.bringToFront();    
        }catch(e){
            systemAPI.alert(this+"$search()",e);
        }
    },
    doSearchClick: function(selText){
		try{
			this.inputElm.value = selText;
			this.inputElm.focus();
			this.hide();
		}catch(e){
			alert(e);
		}
    },
    itemsOver: function(event){
        var target = systemAPI.browser.msie ? event.srcElement:event.target;
        target.style.background = "#ff9900";
    },
    itemsOut: function(event){
        var target = systemAPI.browser.msie ? event.srcElement:event.target;
        target.style.background = "";
    },
	show: function(){
		var app = this.linkCtrl.getApplication();
		var x,y,canvas = this.linkCtrl.getCanvas();			
		var width = parseInt(this.inputElm.offsetWidth);			
		x = findPos(window.pageCnv,this.inputElm);
		y = x[1] + parseInt(this.inputElm.offsetHeight);    				
		x = x[0];						
		if (this.linkCtrl.className == "portalui_saiGrid"){
			x += 3,y+=3;
		}
		this.setWidth(width);			
		var scrHeight = app.activeForm.getHeight();
		if ((y + this.getHeight()) > scrHeight){
			if (document.all)
				this.setTop(y - 2);
			else
				this.setTop(y - 1);
		}else this.setTop(y);		
		this.setLeft(x + 1);		
		this.setVisible(true);
		this.bringToFront();
	},
	hide: function(){
		this.setVisible(false);
	}
});
