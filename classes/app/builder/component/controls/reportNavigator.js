//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_builder_component_controls_reportNavigator = function(owner, options){
	if (owner){
		try{
			window.app_builder_component_controls_reportNavigator.prototype.parent.constructor.call(this, owner);
			this.className = "portalui_reportNavigator";
			window.app_builder_component_controls_reportNavigator.prototype.parent.setHeight.call(this, 30);
			window.app_builder_component_controls_reportNavigator.prototype.parent.setWidth.call(this, 320);
			
			this.report = undefined;
			this.showPager = false;			
			this.totalPage = 0;
			
			this.activePage = 1;	
			this.startPage = 1;
			this.activeBtn = undefined;
			this.onCloseClick = new portalui_eventHandler();
			this.onAllClick = new portalui_eventHandler();
			this.onPdfClick = new portalui_eventHandler();
			this.onXlsClick = new portalui_eventHandler();
			this.onRowPPClick = new portalui_eventHandler();
			this.onTransClick = new portalui_eventHandler();
			this.onFindClick = new portalui_eventHandler();
			this.onGraphClick = new portalui_eventHandler();
			this.onPrintClick = new portalui_eventHandler();
			this.onPreviewClick = new portalui_eventHandler();
			this.rowPerPage = 30;
			
			var app = this.getApplication();
			uses("portalui_frameNavigator");
			this.frame = new portalui_frameNavigator(app);//(window.app);
			this.frame.setWidth(620);
			this.frame.setHeight(40);
			this.frame.setLeft(20);
			this.frame.setTop(this.getTop() + this.getHeight() + 30);
			this.frame.hide();			
			uses("portalui_frameBrowser");
			this.browser = new portalui_frameBrowser(app);
			this.browser.setWidth(this.width);
			this.browser.setHeight(this.height - 117);
			this.browser.setLeft(5);
			this.browser.setTop(this.getTop() + this.getHeight() + 35);
			this.browser.hide();
			
			uses("portalui_saiLabelEdit");
			this.e0 = new portalui_saiLabelEdit(this.frame);
			this.e0.setTop(5);
			this.e0.setWidth(300);
			this.e0.setLeft(20);
			this.e0.setCaption("search");
			
			this.e1 = new portalui_saiCB(this.frame);
			this.e1.setTop(5);
			this.e1.setWidth(200);
			this.e1.setLeft(325);
			this.e1.setCaption("in field");
			this.e1.onChange.set(this, "doChange");
			
			this.b1 = new portalui_button(this.frame);
			this.b1.setTop(5);
			this.b1.setLeft(530);
			this.b1.setCaption("find");
			this.b1.onClick.set(this, "doFindText");
			
			this.btnTop = 4;			
			this.firstBtn = new portalui_imageButton(this);
			this.firstBtn.setTop(this.btnTop);
			this.firstBtn.setLeft(20);
			this.firstBtn.setWidth(22);
			this.firstBtn.setHeight(22);
			this.firstBtn.setImage("icon/"+system.getThemes()+"/imgFirst.png");
			this.firstBtn.setHint("first page");
			this.firstBtn.onClick.set(this,"doNavigatorClick");		
			this.firstBtn.setName("firstBtn");
			this.firstBtn.setTag1(1);
			
			this.leftBtn = new portalui_imageButton(this);
			this.leftBtn.setTop(this.btnTop);
			this.leftBtn.setLeft(42);
			this.leftBtn.setWidth(22);
			this.leftBtn.setHeight(22);
			this.leftBtn.setImage("icon/"+system.getThemes()+"/imgLeft.png");
			this.leftBtn.setHint("prev page");
			this.leftBtn.onClick.set(this,"doNavigatorClick");		
			this.leftBtn.setName("leftBtn");
			
			this.rightBtn = new portalui_imageButton(this);
			this.rightBtn.setTop(this.btnTop);
			this.rightBtn.setLeft(64);
			this.rightBtn.setWidth(22);
			this.rightBtn.setHeight(22);
			this.rightBtn.setImage("icon/"+system.getThemes()+"/imgRight.png");
			this.rightBtn.setHint("next page");
			this.rightBtn.onClick.set(this,"doNavigatorClick");		
			this.rightBtn.setName("rightBtn");
			
			this.lastBtn = new portalui_imageButton(this);
			this.lastBtn.setTop(this.btnTop);
			this.lastBtn.setLeft(88);
			this.lastBtn.setWidth(22);
			this.lastBtn.setHeight(22);
			this.lastBtn.setImage("icon/"+system.getThemes()+"/imgLast.png");
			this.lastBtn.setHint("last page");
			this.lastBtn.onClick.set(this,"doNavigatorClick");		
			this.lastBtn.setName("lastBtn");
			
			this.allBtn = new portalui_imageButton(this);
			this.allBtn.setTop(this.btnTop);
			this.allBtn.setLeft(110);
			this.allBtn.setWidth(22);
			this.allBtn.setHeight(22);
			this.allBtn.setImage("icon/"+system.getThemes()+"/fullscreen.png");
			this.allBtn.setHint("All page");
			//this.allBtn.setCaption("A");
			this.allBtn.onClick.set(this,"doAllClick");		
			this.allBtn.setName("allBtn");
			
			this.pdfBtn = new portalui_imageButton(this);
			this.pdfBtn.setTop(this.btnTop);
			this.pdfBtn.setLeft(132);
			this.pdfBtn.setWidth(22);
			this.pdfBtn.setHeight(22);
			this.pdfBtn.setImage("icon/"+system.getThemes()+"/pdf.png");
			this.pdfBtn.setHint("Create Pdf");		
			//this.pdfBtn.setCaption("P");
			this.pdfBtn.onClick.set(this,"doPdfClick");		
			this.pdfBtn.setName("pdfBtn");
			
			this.xlsBtn = new portalui_imageButton(this);
			this.xlsBtn.setTop(this.btnTop);
			this.xlsBtn.setLeft(154);
			this.xlsBtn.setWidth(22);
			this.xlsBtn.setHeight(22);
			this.xlsBtn.setImage("icon/"+system.getThemes()+"/excel.png");
			this.xlsBtn.setHint("Create Xls");
			//this.xlsBtn.setCaption("Xls");
			this.xlsBtn.onClick.set(this,"doXlsClick");		
			this.xlsBtn.setName("xlsBtn");
			
			this.create = new portalui_imageButton(this);
			this.create.setTop(this.btnTop);
			this.create.setLeft(176);
			this.create.setHeight(22);
			this.create.setWidth(22);
			this.create.setImage("icon/"+system.getThemes()+"/createentries.png");
			this.create.setHint("Create Record");
			this.create.onClick.set(this,"doCreateClick");		
			this.create.setName("create");
			
			this.edit = new portalui_imageButton(this);
			this.edit.setTop(this.btnTop);
			this.edit.setLeft(198);
			this.edit.setHeight(22);
			this.edit.setWidth(22);
			this.edit.setImage("icon/"+system.getThemes()+"/editentries.png");
			this.edit.setHint("Edit Record");
			this.edit.onClick.set(this,"doCreateClick");		
			this.edit.setName("edit");
			
			this.del = new portalui_imageButton(this);
			this.del.setTop(this.btnTop);
			this.del.setLeft(220);
			this.del.setHeight(22);
			this.del.setWidth(22);
			this.del.setImage("icon/"+system.getThemes()+"/delentries.png");
			this.del.setHint("Delete Record");
			this.del.onClick.set(this,"doCreateClick");		
			this.del.setName("del");
			
			this.findText = new portalui_imageButton(this);
			this.findText.setTop(this.btnTop);
			this.findText.setLeft(242);
			this.findText.setHeight(22);
			this.findText.setWidth(22);
			this.findText.setImage("icon/"+system.getThemes()+"/relakun.png");
			this.findText.setHint("Find Record");
			this.findText.onClick.set(this,"doFindClick");		
			this.findText.setName("findText");
			
			this.graph = new portalui_imageButton(this);
			this.graph.setTop(this.btnTop);
			this.graph.setLeft(264);
			this.graph.setHeight(22);
			this.graph.setWidth(22);
			this.graph.setImage("icon/"+system.getThemes()+"/graph.png");
			this.graph.setHint("Graph");
			this.graph.onClick.set(this,"doGraphClick");		
			this.graph.setName("graphBtn");
			
	        this.PrintBtn = new portalui_imageButton(this);
			this.PrintBtn.setTop(this.btnTop);
			this.PrintBtn.setLeft(286);
			this.PrintBtn.setHeight(22);
			this.PrintBtn.setWidth(22);
			this.PrintBtn.setImage("icon/"+system.getThemes()+"/print.png");
			this.PrintBtn.setHint("Print");
			this.PrintBtn.onClick.set(this,"doPrintClick");		
			this.PrintBtn.setName("PrintBtn");
			
			this.PreviewBtn = new portalui_imageButton(this);
			this.PreviewBtn.setTop(this.btnTop);
			this.PreviewBtn.setLeft(308);
			this.PreviewBtn.setHeight(22);
			this.PreviewBtn.setWidth(22);
			this.PreviewBtn.setImage("icon/"+system.getThemes()+"/printPreview.png");
			this.PreviewBtn.setHint("Print Preview");
			this.PreviewBtn.onClick.set(this,"doPreviewClick");		
			this.PreviewBtn.setName("PreviewBtn");
			
			
			uses("portalui_image");
			this.img = new portalui_image(this);
			this.img.setTop(5);
			this.img.setWidth(210);
			this.img.setHeight(15);
			this.img.setLeft(20);
			this.img.setImage("image/loader.gif");
			this.img.hide();
			
			
			uses("portalui_saiCB");
			this.cb = new portalui_saiCB(this);
			this.cb.setTop(this.btnTop);
			this.cb.setWidth(150);
			this.cb.setCaption("row Per Page");
			this.cb.setLeft(this.getWidth() / 2  - 75);
			this.cb.onChange.set(this, "doSelectChange");
				this.cb.addItem(1,"10");
				this.cb.addItem(2,"20");
				this.cb.addItem(3,"30");
				this.cb.addItem(4,"50");
				this.cb.addItem(5,"100");
				this.cb.addItem(6,"500");
				this.cb.addItem(7,"1000");
			this.cb.setSelectedId(3);	
			
			/*10 20 30 50 100 500 */
			
			uses("portalui_button");					
			this.closeBtn = new portalui_button(this);
			this.closeBtn.setBound(this.getWidth() - 80,this.btnTop,80,18);
			this.closeBtn.onClick.set(this, "doClick");
			this.closeBtn.setCaption("Back");		
			this.setTabChildIndex();
			
			this.onPager = new portalui_eventHandler();				
			if (options !== undefined){
				this.updateByOptions(options);				
			}
			this.addProperty({className:this.className, address:"", html:"",showPager:true, totalPage:0});	
			this.addEvent({pager:""});
		}catch(e){
			systemAPI.alert("reportNavigator",e);
		}
	}	
};
window.app_builder_component_controls_reportNavigator.extend(window.app_builder_component_controls_panel);
window.app_builder_component_controls_reportNavigator.implement({
	setReport:function(report){
		this.report = report;		
	},
	doNavigatorClick: function(sender){
		try{
			var script = "";
			var pos = 0;
			var tmp = this.activePage;
			if (sender == this.leftBtn)
			{
				if (this.startPage > 1) 
					this.startPage--;	
				else this.startPage = 1;
				if (this.totalPage > 5)
				{					
					for (var i = this.startPage; i < (this.startPage + 5); i++)
					{
						pos = (i - this.startPage) + 1;
						script = "this.imgBtn"+pos+".setTag1("+i+");" +
								 "this.imgBtn"+pos+".setCaption("+i+");";						
						eval(script);
					}					
				}
				if (this.activePage > 1)
					this.activePage--;				
				if ((this.startPage + 4) == 5)
				{
					pos = (this.activePage - this.startPage) + 1;
					if ((pos > 0) && (pos <=5))
					{
						script = "this.setSelectedPage(this.imgBtn"+pos+")";						
						eval(script);
					}
				}
			}else if (sender == this.rightBtn)
			{
				if (this.activePage == this.totalPage)
					return false;
				if (this.totalPage > 5)
				{					
					if (this.startPage < (this.totalPage-4))
						this.startPage++;				
					var max = (this.startPage + 5) > this.totalPage ? this.totalPage +1:(this.startPage + 5);
					
					for (var i = this.startPage; i < max; i++)
					{
						pos = (i - this.startPage) + 1;
						script = "this.imgBtn"+pos+".setTag1("+i+");" +
								 "this.imgBtn"+pos+".setCaption("+i+");";						
						eval(script);
					}					
				}	
				if (this.activePage < this.totalPage)
					this.activePage++;	
				//alert(this.startPage +" "+this.activePage);
				//if ((this.startPage + 4) < this.totalPage)
				{
					pos = (this.activePage - this.startPage) + 1;
					if ((pos > 0) && (pos <=5))
					{
						script = "this.setSelectedPage(this.imgBtn"+pos+")";						
						eval(script);
					}
				}
						
			}else if (sender == this.firstBtn)
			{
				this.activePage = 1;
				this.startPage = 1;
				script = "this.setSelectedPage(this.imgBtn1)";						
				eval(script);					
				if (this.totalPage  > 5 )
				{		
					for (var i = 1; i <= 5; i++)
					{
						script = "this.imgBtn"+i+".setTag1("+i+");" +
								 "this.imgBtn"+i+".setCaption("+i+");";						
						eval(script);
					}
				}
			}else if (sender == this.lastBtn)
			{
				this.activePage = this.totalPage;				
				if (this.totalPage > 5)
				{
					this.startPage = this.totalPage - 4;
					script = "this.setSelectedPage(this.imgBtn5);";						
				}else 
				{
					this.startPage = 1;
					script = "this.setSelectedPage(this.imgBtn"+this.totalPage+");";
				}
				eval(script);					
				if (this.totalPage > 5)
				{
					for (var i = (this.totalPage - 4); i <= this.totalPage; i++)
					{					
						pos = i - (this.totalPage - 4) + 1;	
						script = "this.imgBtn"+pos+".setTag1("+i+");" +
								 "this.imgBtn"+pos+".setCaption("+i+");";	
						eval(script);
					}
				}
			}else
				this.activePage = sender.getTag1();				
			if ((sender != this.firstBtn) && (sender != this.leftBtn) && (sender != this.rightBtn) && (sender != this.lastBtn))	
				this.setSelectedPage(sender);
			if (tmp != this.activePage)	
				this.onPager.call(sender, this.activePage);
		}catch(e){
			alert("[sgNavigator]::doClick:"+e+"\r\n"+sender.getName());
		}
	},
	rearrange: function(){
		this.activeBtn = undefined;
		this.activePage = 1;
		this.startPage = 1;
		var startPos = 64;
		var script = "";
		var totPage = this.totalPage;
		if (totPage  > 5 )
		{
			for (var i = 1; i <= 5; i++)
			{
				script = "this.imgBtn"+i+" = new portalui_imageButton(this); "+
						"this.imgBtn"+i+".setTop(this.btnTop); "+
						"this.imgBtn"+i+".setLeft(startPos); "+
						"this.imgBtn"+i+".setWidth(22); "+
						"this.imgBtn"+i+".setHeight(22); "+
						"this.imgBtn"+i+".setImage('icon/"+system.getThemes()+"/imgBtn.png'); "+
						"this.imgBtn"+i+".setHint('"+i+" page'); "+
						"this.imgBtn"+i+".onClick.set(this,'doNavigatorClick');	"+	
						"this.imgBtn"+i+".setName('imgBtn"+i+"');	"+		
						"this.imgBtn"+i+".setTag1("+i+"); "+
						"this.imgBtn"+i+".setCaption("+i+"); "+
						"startPos = 64 + (22 * "+i+");";
				eval(script);
			}		
			this.rightBtn.setLeft(startPos);
			this.lastBtn.setLeft(startPos + 22);
			this.lastBtn.setTag1(totPage);
			this.allBtn.setLeft(startPos + 44);
			this.pdfBtn.setLeft(startPos + 66);
			this.xlsBtn.setLeft(startPos + 88);
			this.create.setLeft(startPos + 110);
			this.edit.setLeft(startPos + 132);
			this.del.setLeft(startPos + 154);
			this.findText.setLeft(startPos + 176);
			this.graph.setLeft(startPos + 198);
			this.PrintBtn.setLeft(startPos + 220);
			this.PreviewBtn.setLeft(startPos + 242);
		}else
		{		
			for (var i = 1; i <= totPage; i++)
			{
				script = "this.imgBtn"+i+" = new portalui_imageButton(this); "+
						"this.imgBtn"+i+".setTop(this.btnTop); "+
						"this.imgBtn"+i+".setLeft(startPos); "+
						"this.imgBtn"+i+".setWidth(22); "+
						"this.imgBtn"+i+".setHeight(22); "+
						"this.imgBtn"+i+".setImage('icon/"+system.getThemes()+"/imgBtn.png'); "+
						"this.imgBtn"+i+".setHint('"+i+" page'); "+
						"this.imgBtn"+i+".onClick.set(this,'doNavigatorClick');	"+	
						"this.imgBtn"+i+".setName('imgBtn"+i+"');	"+		
						"this.imgBtn"+i+".setTag1("+i+"); "+
						"this.imgBtn"+i+".setCaption("+i+"); "+
						"startPos = 64 + (22 * "+i+");";
				eval(script);
			}		
			this.rightBtn.setLeft(startPos);
			this.lastBtn.setLeft(startPos + 22);
			this.lastBtn.setTag1(totPage);
			this.allBtn.setLeft(startPos + 44);
			this.pdfBtn.setLeft(startPos + 66);
			this.xlsBtn.setLeft(startPos + 88);
			this.create.setLeft(startPos + 110);
			this.edit.setLeft(startPos + 132);
			this.del.setLeft(startPos + 154);
			this.findText.setLeft(startPos + 176);
			this.graph.setLeft(startPos + 198);
			this.PrintBtn.setLeft(startPos + 220);
			this.PreviewBtn.setLeft(startPos + 242);
		}
		if (totPage > 0 )
			this.setSelectedPage(this.imgBtn1);
	},
	setShowPager: function(data){
		this.showPager = data;
		this.setProperty("showPager",data);
		if (this.showPager){
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
	setTotalPage: function(data){
		var totPage = this.totalPage;
		this.setProperty("totalPage",data);
		this.activePage= 1;
		this.startPage = 1;
		this.activeBtn = undefined;
		if (totPage > 5 ){
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
		this.totalPage = data;
		this.lastBtn.setTag1(data);
	},
	setWidth: function(data){
		window.app_builder_component_controls_reportNavigator.prototype.parent.setWidth.call(this, data);
		if (this.closeBtn !== undefined) this.closeBtn.setLeft(this.getWidth() - 80);
		if (this.img !== undefined) this.img.setLeft(this.getWidth() - 350);
		if (this.cb !== undefined) this.cb.setLeft(this.getWidth() / 2  - 75);
		if (this.browser !== undefined) this.browser.setWidth(this.getWidth() - 20);
	},
	doClick: function(sender){
		this.onCloseClick.call(sender);
	},
	doAllClick: function(sender){
		this.onAllClick.call(sender);
	},
	doPdfClick: function(sender){
		this.onPdfClick.call(sender);
	},
	doXlsClick: function(sender){
		this.onXlsClick.call(sender);
	},
	hideNavigator: function(){
		this.setTotalPage(0);	
//	this.setWidth(90);
		this.firstBtn.setVisible(false);
		this.leftBtn.setVisible(false);
		this.rightBtn.setVisible(false);
		this.lastBtn.setVisible(false);
		this.allBtn.setVisible(false);
		this.closeBtn.setLeft(this.getWidth() - 80);
	},
	showProgress: function(){
	},
	hideProgress: function(){
	},
	doRowPPageClick: function(sender){
		if (this.rowPerPage != sender.getTag1()){
			this.rowPerPage = sender.getTag1();		
			this.onRowPPClick.call(this, this.rowPerPage);
		}
	},
	doFindClick: function(){	
		this.frame.setTop(83);
		if (this.frame.visible)
			this.frame.hide();		
		else
			this.frame.show();				
	},
	doSelectChange: function(sender, text, itemIdx){
		if (this.rowPerPage != parseInt(text)){
			this.rowPerPage = parseInt(text);
			this.onRowPPClick.call(this, this.rowPerPage);
		}	
	},
	doCreateClick: function(sender){
		this.onTransClick.call(sender, sender.getName()); 
	},
	setFields: function(items){
		for (var i in items.objList)
			this.e1.addItem(i, items.objList[i]);	
	},
	doFindText: function(sender){
		this.onFindClick.call(sender, this.e0.getText(), this.e1.getText());	
	},
	doGraphClick: function(sender){
		this.onGraphClick.call(sender);	
	},
	doPrintClick: function(sender){  
		this.onPrintClick.call(sender);		
	},
	doPreviewClick: function(sender){  
		this.onPreviewClick.call(sender);	
	},
	doChange: function(sender, text, itemIdx){
	},
	setAddress: function(address){
		this.browser.setAddress(address);
		this.setProperty("address",address);
		this.browser.setHeight(system.activeApplication.activeForm.getHeight() - 117);
		this.browser.setTop(this.top + this.height + 35);
		this.browser.show();
	},
	setHtml: function(html){
		this.browser.setHtml(html);
		this.setProperty("html",html);
		this.browser.setTop(this.top + this.height + 35);
		this.browser.setHeight(system.activeApplication.activeForm.getHeight() - 117);
		this.browser.show();
	},
	hideBrowser: function(){
		this.browser.hide();	
	}
});