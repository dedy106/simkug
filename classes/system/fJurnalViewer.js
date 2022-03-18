/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
uses("sysForm");
window.system_fJurnalViewer = function(owner,options){
	try{
		if (owner)
		{
			window.system_fJurnalViewer.prototype.parent.constructor.call(this, owner,options);
			this.className = "system_fJurnalViewer";			
			this.isClick = false;
			this.mouseX = 0;
			this.mouseY = 0;
			this.maximize();			
			this.caption = "l i s t d a t a";
			this.kode = "";
			this.nama = "";						
			this.onClose.set(this,"doClose");
			this.initComponent();		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			if (options !== undefined){
				this.updateByOptions(options);
			}
		}
	}catch(e){
		systemAPI.alert("[system_fJurnalViewer]::contruct:"+e);
	}
};
window.system_fJurnalViewer.extend(window.sysForm);
window.system_fJurnalViewer.implement({
	/*doDraw: function(canvas){
	    var n = this.getFullId();   
		//canvas.style.border = "1px solid #ffffff";
		canvas.style.background = "";
	    var html =	"<div id='"+n+"_hidden' style='{background:#d2e0ff;position: absolute; left: 0; top: 0; width: 100%; height: 100%;display:; "+				
					"filter:alpha(opacity:0.8);opacity:0.8;moz-opacity:0.8;}' "+
						"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
						"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
					"></div>"+
						"<div id='"+n+"_frame' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +
	                    "<div id='" + n + "_form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}'></div>" +                    
	                "</div>"+
	                "<iframe name='"+ n +"_iframe' id='"+n+"_iframe' frameborder='1' style='display:none;border:1px solid #f90;position: absolute;left: 0;top: 0; width:100%; height: 100%;background:#ffffff;'></iframe>";

	    this.setInnerHTML(html,canvas);
		this.blockElm = $(n +"_hidden");
		this.frameElm = $(n +"_frame");
		this.iframe = $(n +"_iframe");
	},*/
	initComponent: function(){
		try{
			this.p = new panel(this,{bound:[0,50,800,425],caption:"Data Jurnal"});		
			this.sg = new saiGrid(this.p,{bound:[1,20,796,380], readOnly:true});
			this.sgn = new sgNavigator(this.p,{bound:[0,400,800,25],buttonStyle:3,grid:this.sg});		
			this.sgn.setTotalPage(1);		
			this.btn = new button(this,{bound:[0,480,80,18],caption:"Close",click:[this,"doClick"]});		
			this.ctrl = new control(this,{bound:[0,26,800,401], visible:false});
			var n = this.getFullId();
			var html = "<iframe name='"+ n +"_iframe' id='"+n+"_iframe' frameborder='1' style='border:1px solid #f90;position: absolute;left: 0;top: 0; width:100%; height: 100%;background:#ffffff;'></iframe>";
			this.ctrl.setInnerHTML(html);
			this.iframe = $(n +"_iframe");
			this.pPrint = new panel(this,{bound:[0,0,this.width,26],visible:false});		
			this.PrintBtn = new imageButton(this,{bound:[2,2,22,22],image:"icon/"+system.getThemes()+"/print.png", hint:"Print Page",tag:1,click:[this,"doPrintClick"],name:"PrintBtn"});																		
			this.PreviewBtn = new imageButton(this,{bound:[24,2,22,22],image:"icon/"+system.getThemes()+"/printPreview.png", hint:"Print Preview",tag:1,click:[this,"doPreviewClick"],name:"PreviewBtn"});
		}catch(e){
			alert("initComponent of Main : " + e);
		}
	},
	setData: function(data){
		if (data instanceof arrayMap) 
			this.sg.setData(data);
		else if (data) this.sg.setData(data);
	},
	doClick: function(sender){
		this.close();
	},
	previewHtml: function(html){		
		this.ctrl.show();
		this.pPrint.show();
		var winfram= this.iframe.contentWindow;
		winfram.document.open();
		winfram.document.write(loadCSS("server_util_laporan"));		
		winfram.document.write(html);		
		winfram.document.close();					
		this.showModal();
		this.html = html;
	},
	doPrintClick: function(){
		this.iframe.contentWindow.focus();
		this.iframe.contentWindow.print();
	},	
	doPreviewClick: function(){
		printPreview(this.html);
	},
	location: function(url){
		this.ctrl.show();
		this.pPrint.show();
		this.iframe.src = url;
		this.showModal();
		this.html = html;
	}
});

