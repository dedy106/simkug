//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalui_reportViewer = function(owner,options){
	try{
		if (owner){
			this.caption = "";
			window.portalui_reportViewer.prototype.parent.constructor.call(this, owner,options);
			
			this.className = "portalui_reportViewer";
			this.owner = owner;
			this.bgColor = "#284b60";
			this.border = 1;	

			this.totalPage = 0;
			this.multiPage = false;			
			if (options !== undefined){
				this.updateByOptions(options);
			}				
		}
	}catch(e){
		alert("[reportViewer]::constructor:"+e);
	}
};
window.portalui_reportViewer.extend(window.portalui_containerControl);
window.reportViewer = window.portalui_reportViewer;
window.portalui_reportViewer.implement({
	draw: function(canvas){
		window.portalui_reportViewer.prototype.parent.draw.call(this, canvas);
		var n = this.getFullId();
	    var html = "";	    
		var nd = this.getCanvas();
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
					"<div id='"+ n +"_multiple' style='position:absolute;left:0;top:0;width:100%;height:100%;display:none;overflow:auto'></div>"+
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
					"<iframe name='"+ n +"_iframe'  id ='"+ n +"_iframe' style='{display:none;position: absolute;left: 0;top: 0; width:100%; height: 100%;background:#ffffff}'></iframe>" +
					"<div id='"+ n +"_multiple' style='position:absolute;left:0;top:0;width:100%;height:100%;display:none;overflow:auto'></div>"+
					"<div id='"+ n +"_block' style='{background:"+system.getConfig("form.grid.color")+";display:none;position:absolute;left: 0;top: 0; width: 100%; height: 100%;}'>"+
						"<div style='{background:url(image/gridload.gif) center no-repeat;position:absolute;left: 0;top: 0; width: 100%; height: 100%;color:#ff8a00}'>"+
						"<span style='{position:absolute;left:49%;top:40%;width: 100%; height: 100%;}'>P r o c e s s i n g</span></div>"+
					"</div>";
	    this.setInnerHTML(html, nd);
		this.block = $(n+"_block"); 
		this.container = $( n +"_iframe");
		eventOn(this.container,"load","$$(" + this.resourceId + ").frameLoad(event);");
	},
	showLoading: function(){
		this.block.style.display = "";
	},
	hideLoading: function(){
		this.block.style.display = "none";
	},
	setColor: function(data){
		this.bgColor = data;
		var nd = this.getCanvas();
		nd.style.background = this.bgColor;
	},
	getColor: function(){
		return this.bgColor;
	},
	setBorder: function(data){	
	    if (this.border != data){
	        var node = undefined;
	        var n = this.getFullId();
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
			cnv.style.display = "none";
		}
		cnv = $(this.getFullId() + "_iframe");
		if (cnv != undefined)
			cnv.style.display = "";		
		cnv = $(this.getFullId() + "_frame");
		if (cnv != undefined){
			cnv.style.width = this.getWidth() - 20;
			cnv.style.height = this.getHeight() - 20;
		}
	},
	getFrame: function(){
		return document.frames ? window.frames[this.getFullId() +"_iframe"] : $(this.getFullId()+"_iframe");
	},
	getFrameWindow: function(){
		return this.getFrame().contentWindow;
	},
	getFrameDocument: function(){
		return this.getFrame().document || this.getFrame().contentDocument;
	},
	getFrameBody: function(){
		return this.getFrameDocument().body;
	},	
	preview: function(html, append){
	    try{
			this.multiPage = false;
    		var cnv = $(this.getFullId() + "_iframe");
    		if (cnv != undefined){
    			cnv.style.display = "";
    			//cnv.innerHTML = html;
				var winfram= window.frames[this.getFullId() +"_iframe"];
				if (append === undefined){					
					winfram.document.open();
					winfram.document.write("");
					winfram.document.close();
					winfram.document.open();
					winfram.document.write(loadCSS("server_util_laporan"));
				} else{
					var htmlTmp = this.getFrameBody().innerHTML;					
					winfram.document.open();
					winfram.document.write(loadCSS("server_util_laporan"));
					winfram.document.write(htmlTmp);
					winfram.document.write("<br>");
				}  				
				winfram.document.write("<div align='center'>");
    			winfram.document.write(html);
				winfram.document.write("</div>");
    			winfram.document.close();
    			winfram.focus();
				
    		}		
    		$(this.getFullId() + "form").style.display = "none";
    		$(this.getFullId() +"_multiple").style.display = "none";
	   }catch(e){
	       alert(e);
       }
	},
	getContent: function(){
		if (this.multiPage){			
			return $(this.getFullId() + "_iframe"+this.activePage).contentWindow.document.body.innerHTML;		
		}else 
			return this.container.contentWindow.document.body.innerHTML;		
	},
	setTotalPage: function(page){
		this.totalPage = page;	
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
		$(this.getFullId() +"_multiple").style.display = "none";    	
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
		//showProgress("Please wait....");
		$(this.getFullId() +"_multiple").style.display = "none";    	
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
		var winframe= window.frames[this.getFullId() +"_iframe"];
		winframe.focus();
	},
	frameLoad: function(event){	
		hideProgress();
		hideStatus();		
	},
	frameUnload: function(event){
	},
	addButton: function(cnv, bound, id, first, hint){
		var node = document.createElement("div");
		node.id = this.getFullId()+"_btn"+id;
		node.style.cssText = "cursor:pointer;position:absolute;left:"+bound[0]+";top:"+bound[1]+";width:"+bound[2]+";height:"+bound[3]+";-webkit-border-radius: 5px;-moz-border-radius: 5px;border:1px solid #f90;"+
				" background:url(icon/"+(first ? "buttonact.png":"button.png")+")no-repeat;text-align:center";
		node.innerHTML = "<table border='0' width='100%' height='100%'> <tr><td valign='middle' align='center'>"+(parseFloat(id) + 1).toString()+"</td></tr><table>";		
		cnv.appendChild(node);
		eventOn(node,"click","$$("+this.resourceId+").doButtonClick(event,'"+id+"','"+hint+"')");
		eventOn(node,"mouseover","$$("+this.resourceId+").doMouseOver(event,'"+id+"','"+hint+"')");
	},
	doMouseOver: function(event,id, hint){
		var target = document.all ? event.srcElement : event.target;
		if (event.clientY + 10 < system.getScreenHeight())
			window.system.showHint(event.clientX, event.clientY, hint,true);
		else window.system.showHint(event.clientX, event.clientY, hint,true);    	        
		
	},
	doButtonClick: function(event, param){		
		try{			
			if (param != this.activePage){
				var n = this.getFullId();
				var cnv = $(n + "_iframe"+this.activePage);
				var btn = $(n + "_btn"+this.activePage);
				btn.style.background = "url(icon/button.png)no-repeat";
				cnv.style.display = "none";
				cnv = $(n + "_iframe"+param);
				cnv.style.display = "";
				btn = $(n + "_btn"+param);				
				btn.style.background = "url(icon/buttonact.png)no-repeat";
				this.activePage = param;
			}
		}catch(e){
			alert(e);
		}
	},
	previewMultiPage: function(data, isUrl,caption){
		this.multiPage = true;
		this.activePage = 0;
		this.urls = data;
		var n = this.getFullId();
		var tmp,cnv = $(n + "_iframe");
    	if (cnv != undefined) cnv.style.display = "none";
    	cnv = $(n+"_multiple");    	
    	cnv.style.display = "";    	
    	var innerCtrl  = "", first = true;    	
    	for (var i=0; i < data.length; i++){									
			innerCtrl += "<iframe name='"+ n +"_iframe"+i+"' id ='"+ n +"_iframe"+i+"' style='display:none;position: absolute;left: 0px;top: 0px; width:100%; height: 100%;background:#ffffff'></iframe>";
			first = false;
		}				
		//innerCtrl += "<span style='position:absolute;left:10;top:10;width:auto;height:14'><b>Report</b></span>";
		cnv.innerHTML = innerCtrl;
		var first = true, hint = "";
		for (var i=0; i < data.length; i++){									
			hint = ( caption[i] ? caption[i]: hint);
			this.addButton(cnv,[(40 * i) + 10 , 5, 30,30], i, first, hint);			
			tmp = $(n+"_iframe"+i);
			if (tmp) {
				if (isUrl)
					tmp.src = data[i];
				else writeToIframe(n+"_iframe"+i, data[i]);
			}
			first = false;
		}		
		$(n +"_iframe0").style.display = "";
		cnv = $(n + "form");
		if (cnv != undefined)
			cnv.style.display = "none";		
		this.doButtonClick(undefined, 0);
	},
	print: function(){
		try{
			if (this.multiPage){				
				//for (var i=0; i < this.urls.length; i++){									
				var winframe= window.frames[this.getFullId() +"_iframe"+this.activePage];					
				winframe.print();
				//}
			}else {
				var winframe= window.frames[this.getFullId() +"_iframe"];
				winframe.print();
			}
		}catch(e){
			alert(e);
		}
	}
});
