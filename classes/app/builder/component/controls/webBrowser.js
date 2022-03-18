//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_webBrowser = function(owner){
    if (owner){        
		window.app_builder_component_controls_webBrowser.prototype.parent.constructor.call(this, owner);		
        this.className = "portalui_webBrowser";
        this.owner = owner;
		this.location = "";
    }
};
window.app_builder_component_controls_webBrowser.extend(window.app_builder_component_controls_control);
//---------------------------- Function ----------------------------------------
window.app_builder_component_controls_webBrowser.implement({
	doDraw: function(canvas){
		var n = this.getFullId();
	    if (document.all)
	        var html =  "<div style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +
					"<iframe id='" + n + "_frame' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></iframe>"+
					"<div id='" + n + "_block' style='{background: url(icon/"+system.getThemes()+"/background.png) left top; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>"+
					"</div>";
	    else
	        var html =  "<div style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +
					"<iframe id='" + n + "_frame' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></iframe>"+
					"<div id='" + n + "_block' style='{background: url(icon/"+system.getThemes()+"/background.png) left top; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>"+
					"</div>";
	    this.setInnerHTML(html, canvas);
		this.frame = $( n +"_frame");	
	},
	setColor: function(data){
		this.bgColor = data;
		var nd = this.getCanvas();
		nd.style.background = this.bgColor;
	},
	getColor: function(){
		return this.bgColor;
	},
	block: function(){
	    var node = $(this.getFullId() + "_block");

	    if (node != undefined)
	        node.style.display = "";
	},
	setHeight: function(data){
		window.app_builder_component_controls_webBrowser.prototype.parent.setHeight.call(this, data);
	},
	unblock: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "none";
	},
	navigate: function(url){
		this.location = url;
		this.frame.src = url;
	},
	saveAs: function(){
		for (var i in this.frame) alert(i+" "+this.frame[i]);
	},
	getContent: function(){	
		alert(this.frame.innerHTML);
		alert(this.frame.contentWindow.document);
	
	}
});