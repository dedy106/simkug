//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_sgNavigator = function(owner, options){
	if (owner){
		try{
			window.app_builder_component_controls_sgNavigator.prototype.parent.constructor.call(this, owner, options);
			this.className = "portalui_sgNavigator";
			window.app_builder_component_controls_sgNavigator.prototype.parent.setHeight.call(this, 25);
			this.sg = undefined;
			this.showPager = false;			
			this.totalPage = 0;
			this.activePage = 1;	
			this.startPage = 1;
			this.activeBtn = undefined;
					
			uses("app_builder_component_controls_imageButton");		
			this.addBtn = new app_builder_component_controls_imageButton(this);
			this.addBtn.setBound(2,2,22,22);		
			this.addBtn.setImage("icon/"+system.getThemes()+"/createentries.png");
			this.addBtn.setHint("Append row");
			this.addBtn.onClick.set(this, "doNavigatorClick");			
			this.addBtn.setName("addBtn");
			
			this.delBtn = new app_builder_component_controls_imageButton(this);
			this.delBtn.setTop(2);
			this.delBtn.setLeft(24);
			this.delBtn.setWidth(22);
			this.delBtn.setHeight(22);
			this.delBtn.setImage("icon/"+system.getThemes()+"/delentries.png");
			this.delBtn.setHint("Delete row");
			this.delBtn.onClick.set(this,"doNavigatorClick");		
			this.delBtn.setName("delBtn");
			uses("app_builder_component_controls_image");
			this.separator = new app_builder_component_controls_image(this);
			this.separator.setTop(2);
			this.separator.setLeft(46);
			this.separator.setHeight(22);
			this.separator.setWidth(2);
			this.separator.setImage("icon/"+system.getThemes()+"/separator.png");
			this.separator.setName("separator");
			
			this.downBtn = new app_builder_component_controls_imageButton(this);
			this.downBtn.setTop(2);
			this.downBtn.setLeft(50);
			this.downBtn.setHeight(22);
			this.downBtn.setWidth(22);
			this.downBtn.setImage("icon/"+system.getThemes()+"/down.png");
			this.downBtn.setHint("down data");
			this.downBtn.onClick.set(this, "doNavigatorClick");			
			this.downBtn.setName("addBtn");
			
			this.upBtn = new app_builder_component_controls_imageButton(this);
			this.upBtn.setTop(2);
			this.upBtn.setLeft(72);
			this.upBtn.setWidth(22);
			this.upBtn.setHeight(22);
			this.upBtn.setImage("icon/"+system.getThemes()+"/up.png");
			this.upBtn.setHint("up data");
			this.upBtn.onClick.set(this,"doNavigatorClick");		
			this.upBtn.setName("UpBtn");
			
			this.separator2 = new app_builder_component_controls_image(this);
			this.separator2.setTop(2);
			this.separator2.setLeft(94);
			this.separator2.setHeight(22);
			this.separator2.setWidth(2);
			this.separator2.setImage("icon/"+system.getThemes()+"/separator.png");
			this.separator2.setName("separator2");
			
			this.firstBtn = new app_builder_component_controls_imageButton(this);
			this.firstBtn.setTop(2);
			this.firstBtn.setLeft(96);
			this.firstBtn.setWidth(22);
			this.firstBtn.setHeight(22);
			this.firstBtn.setImage("icon/"+system.getThemes()+"/imgFirst.png");
			this.firstBtn.setHint("first page");
			this.firstBtn.onClick.set(this,"doNavigatorClick");		
			this.firstBtn.setName("firstBtn");
			this.firstBtn.setTag1(1);
			
			this.leftBtn = new app_builder_component_controls_imageButton(this);
			this.leftBtn.setTop(2);
			this.leftBtn.setLeft(118);
			this.leftBtn.setWidth(22);
			this.leftBtn.setHeight(22);
			this.leftBtn.setImage("icon/"+system.getThemes()+"/imgLeft.png");
			this.leftBtn.setHint("prev page");
			this.leftBtn.onClick.set(this,"doNavigatorClick");		
			this.leftBtn.setName("leftBtn");
			
			this.rightBtn = new app_builder_component_controls_imageButton(this);
			this.rightBtn.setTop(2);
			this.rightBtn.setLeft(140);
			this.rightBtn.setWidth(22);
			this.rightBtn.setHeight(22);
			this.rightBtn.setImage("icon/"+system.getThemes()+"/imgRight.png");
			this.rightBtn.setHint("next page");
			this.rightBtn.onClick.set(this,"doNavigatorClick");		
			this.rightBtn.setName("rightBtn");
			
			this.lastBtn = new app_builder_component_controls_imageButton(this);
			this.lastBtn.setTop(2);
			this.lastBtn.setLeft(162);
			this.lastBtn.setWidth(22);
			this.lastBtn.setHeight(22);
			this.lastBtn.setImage("icon/"+system.getThemes()+"/imgLast.png");
			this.lastBtn.setHint("last page");
			this.lastBtn.onClick.set(this,"doNavigatorClick");		
			this.lastBtn.setName("lastBtn");
			
			this.printBtn = new app_builder_component_controls_imageButton(this);
			this.printBtn.setTop(2);
			this.printBtn.setLeft(184);
			this.printBtn.setWidth(22);
			this.printBtn.setHeight(22);
			this.printBtn.setImage("icon/"+system.getThemes()+"/print.png");
			this.printBtn.setHint("Print");
			this.printBtn.onClick.set(this,"doNavigatorClick");		
			this.printBtn.setName("printBtn");		
			
			this.xlsBtn = new app_builder_component_controls_imageButton(this);
			this.xlsBtn.setTop(2);
			this.xlsBtn.setLeft(206);
			this.xlsBtn.setWidth(22);
			this.xlsBtn.setHeight(22);
			this.xlsBtn.setImage("icon/"+system.getThemes()+"/excel.png");
			this.xlsBtn.setHint("Save To excels");
			this.xlsBtn.onClick.set(this,"doNavigatorClick");		
			this.xlsBtn.setName("printBtn");		
			
			this.docBtn = new app_builder_component_controls_imageButton(this);
			this.docBtn.setTop(2);
			this.docBtn.setLeft(228);
			this.docBtn.setWidth(22);
			this.docBtn.setHeight(22);
			this.docBtn.setImage("icon/"+system.getThemes()+"/word.png");
			this.docBtn.setHint("Save To word");
			this.docBtn.onClick.set(this,"doNavigatorClick");		
			this.docBtn.setName("printBtn");		
			
			this.loadBtn = new app_builder_component_controls_imageButton(this);
			this.loadBtn.setTop(2);
			this.loadBtn.setLeft(250);
			this.loadBtn.setWidth(22);
			this.loadBtn.setHeight(22);
			this.loadBtn.setImage("icon/"+system.getThemes()+"/upload.png");
			this.loadBtn.setHint("Load From Files");
			this.loadBtn.onClick.set(this,"doNavigatorClick");		
			this.loadBtn.setName("printBtn");		
			
			uses("app_builder_component_controls_uploader",true);		
			this.uploader = new app_builder_component_controls_uploader(this);
			this.uploader.setTop(2);
			this.uploader.setWidth(210);
			this.uploader.hide();
			this.uploader.setParam4("gridupload");
			this.uploader.onAfterUpload.set(this,"doAfterLoad");
			this.setTabChildIndex();
			
			this.onPager = new portalui_eventHandler();
			this.onAfterUpload = new portalui_eventHandler();
			this.onBeforePrint = new portalui_eventHandler();
			this.setColor(system.getConfig("form.navigator.color"));
			this.printHeader = "";
			
			if (options !== undefined){
				this.updateByOptions(options);
				if (options.buttonStyle !== undefined) this.setButtonStyle(options.buttonStyle);
				if (options.pager !== undefined) this.onPager.set(options.pager[0],options.pager[1]);
				if (options.grid !== undefined) this.setGrid(options.grid);
			}
			this.addProperty({className:this.className, buttonStyle:this.buttonStyle, grid:"", color:this.bgColor, borderStyle: this.borderStyle, showPager: this.showPager});	
			this.addEvent({pager:"", afterUpload:"",beforePrint:""});
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_builder_component_controls_sgNavigator.extend(window.app_builder_component_controls_containerControl);
window.app_builder_component_controls_sgNavigator.implement({
	draw: function(canvas){
		window.app_builder_component_controls_sgNavigator.prototype.parent.draw.call(this, canvas);
		var n = this.getFullId();
	    var html = "";	    
		var nd = this.getContainer();
		nd.style.background = system.getConfig("form.panel.color");

		nd.style.overflow = "hidden";
	    if (document.all)
	        html =  "<div style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +
					"<div id='" + n + "_border1' style='{position: absolute;left: 0;top: 0;width: 100%;height: 100%;border-left: " + window.system.getConfig("3dborder.outer.right") + ";border-top: " + window.system.getConfig("3dborder.outer.bottom") + ";}'></div>" +
	                "<div id='" + n + "_border2' style='{position: absolute;left: 0;top: 0;width: 100%;height: 100%;border-right: " + window.system.getConfig("3dborder.outer.left") + ";border-bottom: " + window.system.getConfig("3dborder.outer.top") + ";}'></div>" +
					"<div id= '"+n+"_bottom' style='{position: absolute; left: 0; top: 100%; width: 100%; height: 100%; }' >" +
	                	"<div id='" + n + "_sBottom' style='{background: url(icon/"+system.getThemes()+"/panelShadow.png) top left repeat-x; position: absolute; left: 0; top: 0; width:100%; height: 100%}' ></div>" +
					"</div>"+
					"<div id='" + n + "_lcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 100%;}'> </div>"+
					"<div id='" + n + "_cap' style='{position: absolute;left: 0;top: 0; width:100%; height: 100%;color:#ffffff}'> </div>"+
					"<div id='" + n + "_rcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 100%;}'> </div>"+
	                "<div id='" + n + "form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>"+
					"<div id='" + n + "_block' style='{background: url(icon/"+system.getThemes()+"/background.png) left top; display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>"+
					"</div>";
	    else
	        html =  "<div id='" + n + "_border1' style='{position: absolute;left: 0;top: 0;width: 100%;height: 100%;border-left: " + window.system.getConfig("3dborder.outer.right") + ";border-top: " + window.system.getConfig("3dborder.outer.bottom") + ";}'></div>" +
	                "<div id='" + n + "_border2' style='{position: absolute;left: -1;top: -1;width: 100%;height: 100%;border-right: " + window.system.getConfig("3dborder.outer.left") + ";border-bottom: " + window.system.getConfig("3dborder.outer.top") + ";}'></div>" +
					"<div id='" + n + "_bottom' style='{background: url(icon/"+system.getThemes()+"/panelShadow.png) bottom left repeat-x; position: absolute; left: 0; top: 0; width:100%; height: 100%;display:none}' ></div>" +
					"<div id='" + n + "_lcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 100%;}'> </div>"+
					"<div id='" + n + "_cap' style='{position: absolute;left: 0;top: 0; width:100%; height: 100%;color:#ffffff}'> </div>"+
					"<div id='" + n + "_rcap' style='{position: absolute;left: 0;top: 0; width:100%; height: 100%;}'> </div>"+
	                "<div id='" + n + "form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>"+
					"<div id='" + n + "_block' style='{background: transparent;position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>";
	    this.setInnerHTML(html, nd);
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
	setBorder: function(data){	
	    if (this.borderStyle != data)
	    {
	        var node = undefined;
	        var n = this.getFullId();
	        this.borderStyle = data;
			this.setProperty("border",data);
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
	setWidth: function(data){
		window.app_builder_component_controls_sgNavigator.prototype.parent.setWidth.call(this,data);
		if (this.uploader !== undefined) this.uploader.setLeft(data - 220);
	},
	setGrid: function(grid){
		this.sg = grid;
		this.setProperty("grid",grid.name);
	},	
	rearrange: function(){
		this.activeBtn = undefined;
		var startPos = 140;
		var script = "";
		var totPage = this.totalPage;
		if (totPage  > 5 )
		{
			for (var i = 1; i <= 5; i++)
			{
				script = "this.imgBtn"+i+" = new app_builder_component_controls_imageButton(this); "+
						"this.imgBtn"+i+".setTop(2); "+
						"this.imgBtn"+i+".setLeft(startPos); "+
						"this.imgBtn"+i+".setWidth(22); "+
						"this.imgBtn"+i+".setHeight(22); "+
						"this.imgBtn"+i+".setImage('icon/"+system.getThemes()+"/imgBtn.png'); "+
						"this.imgBtn"+i+".setHint('"+i+" page'); "+					
						"this.imgBtn"+i+".setName('imgBtn"+i+"');	"+		
						"this.imgBtn"+i+".setTag1("+i+"); "+
						"this.imgBtn"+i+".setCaption("+i+"); "+
						"startPos = 140 + (22 * "+i+");";
				eval(script);
			}		
			this.rightBtn.setLeft(startPos);
			this.lastBtn.setLeft(startPos + 22);
			this.printBtn.setLeft(startPos + 44);
			this.xlsBtn.setLeft(startPos + 66);
			this.docBtn.setLeft(startPos + 88);
			this.loadBtn.setLeft(startPos + 110);
			this.lastBtn.setTag1(totPage);
		}else
		{		
			for (var i = 1; i <= totPage; i++)
			{
				script = "this.imgBtn"+i+" = new app_builder_component_controls_imageButton(this); "+
						"this.imgBtn"+i+".setTop(2); "+
						"this.imgBtn"+i+".setLeft(startPos); "+
						"this.imgBtn"+i+".setWidth(22); "+
						"this.imgBtn"+i+".setHeight(22); "+
						"this.imgBtn"+i+".setImage('icon/"+system.getThemes()+"/imgBtn.png'); "+
						"this.imgBtn"+i+".setHint('"+i+" page'); "+						
						"this.imgBtn"+i+".setName('imgBtn"+i+"');	"+		
						"this.imgBtn"+i+".setTag1("+i+"); "+
						"this.imgBtn"+i+".setCaption("+i+"); "+
						"startPos = 140 + (22 * "+i+");";
				eval(script);
			}		
			this.rightBtn.setLeft(startPos);
			this.lastBtn.setLeft(startPos + 22);
			this.printBtn.setLeft(startPos + 44);
			this.xlsBtn.setLeft(startPos + 66);
			this.docBtn.setLeft(startPos + 88);
			this.loadBtn.setLeft(startPos + 110);
			this.lastBtn.setTag1(totPage);
		}
		if (totPage > 0)
			this.setSelectedPage(this.imgBtn1);
	},
	setShowPager: function(data){
		this.showPager = data;
		this.setProperty("showPager",data);
		if (this.showPager)
		{
			this.firstBtn.setVisible(true);
			this.leftBtn.setVisible(true);
			this.rightBtn.setVisible(true);
			this.lastBtn.setVisible(true);
		}else
		{
			this.firstBtn.setVisible(false);
			this.leftBtn.setVisible(false);
			this.rightBtn.setVisible(false);
			this.lastBtn.setVisible(false);
		}
	},
	setSelectedPage: function(sender){
		if (this.activeBtn != undefined)
			this.activeBtn.setImage("icon/"+system.getThemes()+"/imgBtn.png");
		sender.setImage("icon/"+system.getThemes()+"/imgSelect.png");	
		this.activeBtn = sender;
	},
	setButtonStyle: function(button){
		try{
			this.setProperty("buttonStyle",button);			
			this.buttonStyle = button;
			this.addBtn.setVisible(false);
			this.delBtn.setVisible(false);
			this.upBtn.setVisible(false);
			this.downBtn.setVisible(false);
			this.firstBtn.setVisible(false);
			this.leftBtn.setVisible(false);
			this.rightBtn.setVisible(false);
			this.lastBtn.setVisible(false);
			this.printBtn.setVisible(false);
			this.xlsBtn.setVisible(false);
			this.docBtn.setVisible(false);
			this.loadBtn.setVisible(false);
			this.separator.setVisible(false);
			this.separator2.setVisible(false);
			
			if (this.totalPage  > 5 )
			{
				for (var i = 1; i <= 5; i++)
				{
					script = "this.imgBtn"+i+".setVisible(false);";
					eval(script);
				}		
			}else
			{		
				for (var i = 1; i <= this.totalPage; i++)
				{
					script = "this.imgBtn"+i+".setVisible(false);";
					eval(script);
				}	
			}
			if (button == 0)
			{
				this.addBtn.setVisible(true);
				this.delBtn.setVisible(true);
				this.upBtn.setVisible(true);
				this.downBtn.setVisible(true);
				this.firstBtn.setVisible(true);
				this.leftBtn.setVisible(true);
				this.rightBtn.setVisible(true);
				this.lastBtn.setVisible(true);
				this.separator.setVisible(true);
				this.separator2.setVisible(true);
				if (this.totalPage  > 5 )
				{
					for (var i = 1; i <= 5; i++)
					{
						script = "this.imgBtn"+i+".setVisible(true);";
						eval(script);
					}		
				}else
				{		
					for (var i = 1; i <= this.totalPage; i++)
					{
						script = "this.imgBtn"+i+".setVisible(true);";
						eval(script);
					}	
				}
			}else if (button == 1)
			{
				this.addBtn.setVisible(true);
				this.delBtn.setVisible(true);
			}else if (button == 2)
			{
				this.addBtn.setVisible(true);
				this.delBtn.setVisible(true);
				this.separator.setVisible(true);
				this.upBtn.setVisible(true);
				this.downBtn.setVisible(true);	
			}else if (button == 3)
			{
				this.firstBtn.setVisible(true);
				this.firstBtn.setLeft(2);
				this.leftBtn.setVisible(true);
				this.leftBtn.setLeft(24);
				var startPos = 46;
				if (this.totalPage > 5)
				{
					for (var i = 1; i <= 5; i++)
					{
						script = "this.imgBtn"+i+".setVisible(true);"+
								 "this.imgBtn"+i+".setLeft(startPos);"+
								 "startPos = 46 + (22 * "+i+");";
						eval(script);
					}
				}else
				{
					for (var i = 1; i <= this.totalPage; i++)
					{
						script = "this.imgBtn"+i+".setVisible(true);"+
								 "this.imgBtn"+i+".setLeft(startPos);"+
								 "startPos = 46 + (22 * "+i+");";
						eval(script);
					}
				}
				
				this.rightBtn.setVisible(true);
				this.rightBtn.setLeft(startPos);			
				this.lastBtn.setVisible(true);
				this.lastBtn.setLeft(startPos+22);
				this.printBtn.setVisible(true);			
				this.printBtn.setLeft(startPos + 44);			
			}else if (button == 4){
				this.firstBtn.setVisible(true);
				this.firstBtn.setLeft(2);
				this.leftBtn.setVisible(true);
				this.leftBtn.setLeft(24);
				var startPos = 46;
				if (this.totalPage > 5){
					for (var i = 1; i <= 5; i++){
						script = "this.imgBtn"+i+".setVisible(true);"+
								 "this.imgBtn"+i+".setLeft(startPos);"+
								 "startPos = 46 + (22 * "+i+");";
						eval(script);
					}
				}else{
					for (var i = 1; i <= this.totalPage; i++)
					{
						script = "this.imgBtn"+i+".setVisible(true);"+
								 "this.imgBtn"+i+".setLeft(startPos);"+
								 "startPos = 46 + (22 * "+i+");";
						eval(script);
					}
				}
				
				this.rightBtn.setVisible(true);
				this.rightBtn.setLeft(startPos);			
				this.lastBtn.setVisible(true);
				this.lastBtn.setLeft(startPos+22);
				this.printBtn.setVisible(true);
				this.xlsBtn.setVisible(true);
				this.docBtn.setVisible(true);
				this.loadBtn.setVisible(true);
				this.printBtn.setLeft(startPos + 44);
				this.xlsBtn.setLeft(startPos + 66);
				this.docBtn.setLeft(startPos + 88);
				this.loadBtn.setLeft(startPos + 110);
			}else {				
				this.firstBtn.hide();				
				this.leftBtn.hide();				
				var startPos = 2;								
				this.rightBtn.hide();				
				this.lastBtn.hide();				
				this.printBtn.setVisible(true);
				this.xlsBtn.setVisible(true);
				this.docBtn.setVisible(true);
				this.loadBtn.setVisible(true);
				this.printBtn.setLeft(startPos);
				this.xlsBtn.setLeft(startPos + 22);
				this.docBtn.setLeft(startPos + 44);
				this.loadBtn.hide();			
			}
		}catch(e){
			alert("[setButtonStyle]:"+e);
		}		
	},
	doAfterLoad: function(sender, result, data){
		this.onAfterUpload.call(this, result, data);
	},
	setTotalPage: function(data){
		var totPage = this.totalPage;	
		if (totPage  > 5 ){
			for (var i = 1; i <= 5; i++){
				script = "this.imgBtn"+i+".free();";
				eval(script);
			}		
		}else{		
			for (var i = 1; i <= totPage; i++){
				script = "this.imgBtn"+i+".free();";
				eval(script);
			}		
		}
		this.startPage = 1;
		this.activePage = 1;
		this.totalPage = data;
		this.lastBtn.setTag1(data);
	},
	refreshPage: function(){
		if (this.sg != undefined) this.sg.hideFrame();
		this.onPager.call(sender, this.activePage);
	}
});
