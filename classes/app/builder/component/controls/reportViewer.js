//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_reportViewer = function(owner,options){
	try{
		if (owner){
			this.caption = "";
			window.app_builder_component_controls_reportViewer.prototype.parent.constructor.call(this, owner,options);
			
			this.className = "portalui_reportViewer";
			this.owner = owner;
			this.bgColor = "#284b60";
			this.borderStyle = 1;	
			this.totalPage = 0;
			this.addProperty({className:this.className, caption:this.caption,color:this.bgColor, borderStyle:this.border, totalPage:0});	
			this.addEvent({change:""});
		}
	}catch(e){
		alert("[reportViewer]::constructor:"+e);
	}
};
window.app_builder_component_controls_reportViewer.extend(window.app_builder_component_controls_containerControl);
window.app_builder_component_controls_reportViewer.implement({
	draw: function(canvas){
		window.app_builder_component_controls_reportViewer.prototype.parent.draw.call(this, canvas);
		var n = this.getFullId();
	    var html = "";	    
		var nd = this.getContainer();
		nd.style.background = "#284b60";
		nd.style.overflow = "hidden";
	    if (document.all)
	        html =  "<div id='" + n + "_border1' style='{position: absolute;left: 0;top: 0;width: 100%;height: 100%;border-left: " + window.system.getConfig("3dborder.outer.right") + ";border-top: " + window.system.getConfig("3dborder.outer.bottom") + ";}'></div>" +
	                "<div id='" + n + "_border2' style='{position: absolute;left: 0;top: 0;width: 100%;height: 100%;border-right: " + window.system.getConfig("3dborder.outer.left") + ";border-bottom: " + window.system.getConfig("3dborder.outer.top") + ";}'></div>" +
					"<div id='" + n + "_lcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 100%;}'> </div>"+
					"<div id='" + n + "_cap' style='{position: absolute;left: 0;top: 0; width:100%; height: 100%;color:#ffffff}'> </div>"+
					"<div id='" + n + "_rcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 100%;}'> </div>"+
					
	                "<div id='" + n + "_frame' style='{position: absolute; background:#ffffff;left: 10; top: 10; width: 100%; height: 100%;overflow:auto;}' >"+
	                "<div id='" + n + "_preview' style='{position: absolute; background:#ffffff;left: 10; top: 0; width: 100%; height: 100%;overflow:visible;}' align=center></div>"+
					"</div>"+
					"<iframe name='"+ n +"_iframe' id='"+ n +"_iframe' style='{display:none;position: absolute;left: 0;top: 0; width:100%; height: 100%;background:#ffffff;}'></iframe>" +				
					"<div id='" + n + "form' style='{position: absolute;left: 0;top: 0; width:100%; height: 30;}'> </div>"+
					"<div id='"+ n +"_block' style='{background:"+system.getConfig("form.grid.color")+";display:none;position:absolute;left: 0;top: 0; width: 100%; height: 100%;}'>"+
						"<div style='{background:url(image/gridload.gif) center no-repeat;position:absolute;left: 0;top: 0; width: 100%; height: 100%;color:#ff8a00}'>"+
						"<span style='{position:absolute;left: 40%;top:40%;width: 100%; height: 100%;}'>P r o c e s s i n g</span></div>"+
					"</div>";
	    else
	        html =  "<div id='" + n + "_border1' style='{position: absolute;left: 0;top: 0;width: 100%;height: 100%;border-left: " + window.system.getConfig("3dborder.outer.right") + ";border-top: " + window.system.getConfig("3dborder.outer.bottom") + ";}'></div>" +
	                "<div id='" + n + "_border2' style='{position: absolute;left: -1;top: -1;width: 100%;height: 100%;border-right: " + window.system.getConfig("3dborder.outer.left") + ";border-bottom: " + window.system.getConfig("3dborder.outer.top") + ";}'></div>" +
					"<div id='" + n + "_lcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 100%;}'> </div>"+
					"<div id='" + n + "_cap' style='{position: absolute;left: 0;top: 0; width:100%; height: 100%;color:#ffffff}'> </div>"+
					"<div id='" + n + "_rcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 100%;}'> </div>"+
					"<div id='" + n + "_frame' style='{position: absolute; background:#ffffff;left: 10; top: 10; width: 100%; height: 100%;overflow:auto;}' >"+
	                "<div id='" + n + "_preview' style='{position: absolute; background:#ffffff;left: 10; top: 0; width: 100%; height: 100%;overflow:visible;}' align=center></div>"+
					"</div>"+
					"<div id='" + n + "form' style='{position: absolute;left: 0;top: 0; width:100%; height:30;background:#ffffff;}'> </div>"+
					"<iframe name='"+ n +"_iframe' id ='"+ n +"_iframe' style='{display:none;position: absolute;left: 0;top: 0; width:100%; height: 100%;background:#ffffff}'></iframe>" +
					"<div id='"+ n +"_block' style='{background:"+system.getConfig("form.grid.color")+";display:none;position:absolute;left: 0;top: 0; width: 100%; height: 100%;}'>"+
						"<div style='{background:url(image/gridload.gif) center no-repeat;position:absolute;left: 0;top: 0; width: 100%; height: 100%;color:#ff8a00}'>"+
						"<span style='{position:absolute;left:49%;top:40%;width: 100%; height: 100%;}'>P r o c e s s i n g</span></div>"+
					"</div>";
	    this.setInnerHTML(html, nd);
		this.block = $(n+"_block"); 
	},
	showLoading: function(){
		this.block.style.display = "";
	},
	hideLoading: function(){
		this.block.style.display = "none";
	},
	setColor: function(data){
		this.bgColor = data;
		this.setProperty("color",data);
		var nd = this.getContainer();
		nd.style.background = this.bgColor;
	},
	getColor: function(){
		return this.bgColor;
	},
	setBorderStyle: function(data){	
	    if (this.borderStyle != data){
	        var node = undefined;
	        var n = this.getFullId();
			this.setProperty("borderStyle",data);
	        switch (data)
	        {
	            case 0 : // none
	                    node = $(n + "_border1");
	                    if (node != undefined)
	                        node.style.border = "";
	                    node = $(n + "_border2");
	                    if (node != undefined)
	                        node.style.border = "";
	                    break;
	            case 1 : // raised
	                    node = $(n + "_border1");
	                    if (node != undefined){
	                        node.style.borderLeft = window.system.getConfig("3dborder.outer.right");
	                        node.style.borderTop = window.system.getConfig("3dborder.outer.bottom");
	                    }
	                    node = $(n + "_border2");
	                    if (node != undefined){
	                        node.style.borderRight = window.system.getConfig("3dborder.outer.left");
	                        node.style.borderBottom = window.system.getConfig("3dborder.outer.top");
	                    }
	                    break;
	            case 2 : // lowered
	                    node = $(n + "_border1");
	                    if (node != undefined){
	                        node.style.borderLeft = window.system.getConfig("3dborder.outer.left");
	                        node.style.borderTop = window.system.getConfig("3dborder.outer.top");
	                    }
	                    node = $(n + "_border2");
	                    if (node != undefined){
	                        node.style.borderRight = window.system.getConfig("3dborder.outer.right");
	                        node.style.borderBottom = window.system.getConfig("3dborder.outer.bottom");
	                    }
	                    break;
				case 3 : // bordered
	                    node = $(n + "_border1");		
	                    if (node != undefined){
	                        node.style.borderLeft = window.system.getConfig("nonborder.inner.right");
	                        node.style.borderTop = window.system.getConfig("nonborder.inner.bottom");
	                    }
	                    node = $(n + "_border2");
	                    if (node != undefined){
	                        node.style.borderRight = window.system.getConfig("nonborder.inner.left");
	                        node.style.borderBottom = window.system.getConfig("nonborder.inner.top");
	                    }	                    
	                    break;
	        }
	    }
	},
	setCaption: function(data){
		this.caption = data;	
		this.setProperty("caption",data);
		if (this.caption != "");{
			var wdth = data.length * 6;
			var l = $(this.getFullId() + "_lcap");
			l.style.background = "url(image/themes/"+system.getThemes()+"/plheader.png) 0 0 no-repeat";
			var n = $(this.getFullId() + "_cap");
			n.style.background = "url(image/themes/"+system.getThemes()+"/pheader.png) 0 0 repeat-x";
			n.style.left = 10;
			n.style.width = wdth;
			var r = $(this.getFullId() + "_rcap");
			r.style.background = "url(image/themes/"+system.getThemes()+"/prheader.png) 0 0 no-repeat";
			n.innerHTML = "<div style='position:absolute;top:3;width:100%; height:100%;'><bold>"+data+" </bold></div>";
			r.style.left = wdth + 10;
		}
	},
	block: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "";
	},
	unblock: function(){
	    var node = $(this.getFullId() + "_block");
	    if (node != undefined)
	        node.style.display = "none";
	},
	prepare: function(){
		var cnv = $(this.getFullId() + "_preview");
		if (cnv != undefined){
			cnv.style.width = this.getWidth() - 20;
			cnv.style.display = "";
		}
		cnv = $(this.getFullId() + "_iframe");
		if (cnv != undefined)
			cnv.style.display = "none";		
		cnv = $(this.getFullId() + "_frame");
		if (cnv != undefined){
			cnv.style.width = this.getWidth() - 20;
			cnv.style.height = this.getHeight() - 20;
		}
	},
	preview: function(html){
		var cnv = $(this.getFullId() + "_preview");
		if (cnv != undefined){
			cnv.style.display = "";
			cnv.innerHTML = html;
		}
		cnv = $(this.getFullId() + "_iframe");
		if (cnv != undefined)
			cnv.style.display = "none";		
		cnv = $(this.getFullId() + "form");
		if (cnv != undefined)
			cnv.style.display = "none";		
	},
	setTotalPage: function(page){
		this.totalPage = page;	
		this.setProperty("totalPage",page);
	},
	getTotalPage: function(page){
		return this.totalPage;
	},
	doSelectedPage: function(sender, page){
		this.onSelectedsystem.call(sender, page);
	},
	doCloseClick: function(sender){	
		this.onCloseClick.call(sender);	
	},
	doAllClick: function(sender){
		this.onAllsystem.call(sender);
	},
	hideNavigator: function(sender){
	},
	enabledIframe: function(){
		var cnv = $(this.getFullId() + "_preview");
		if (cnv != undefined)
			cnv.style.display = "none";			
		if (document.all){		
			cnv = $(this.getFullId() + "_iframe");
			if (cnv != undefined)		
				cnv.style.display = "";	
		}else{
			cnv = $(this.getFullId() + "_iframe");
			if (cnv != undefined)		
				cnv.style.display = "";					
		}
	},
	useIframe: function(location){
		var cnv = $(this.getFullId() + "_preview");
		if (cnv != undefined)
			cnv.style.display = "none";			
		if (document.all){		
			cnv = $(this.getFullId() + "_iframe");
			if (cnv != undefined){
				cnv.src = location;
				cnv.style.display = "";	
			}
		}else{
			cnv = $(this.getFullId() + "_iframe");
			if (cnv != undefined){
				cnv.src = location;
				cnv.style.display = "";					
			}
		}
	},
	frameLoad: function(event){
	},
	frameUnload: function(event){
	}
});
