//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.desktop_fMain = function(owner,options){
	try
	{
		if (owner)
		{
			window.desktop_fMain.prototype.parent.constructor.call(this, owner);
			this.className = "desktop_fMain";								
			this.isClick = false;
			this.mouseX = 0;
			this.mouseY = 0;
			this.maximize();
			this.tabToko = undefined;
			this.app._lokasi="03";			
			this.initComponent();		
			this.frame = new portalui_arrayMap();
			if (options !== undefined){
				this.app.userlog = options.user;
				this.app.uname = options.user;
				this.app.logtime = new Date().valueOf();
				this.app.islogin = true;
				this.showTaskBar();						
			}
		}
	}catch(e)
	{
		systemAPI.alert(this+"$contruct()",e);
	}
};
window.desktop_fMain.extend(window.portalui_commonForm);
window.desktop_fMain.implement({
	doDraw: function(canvas){
		try{
			var n = this.getFullId();   
			canvas.style.background = "transparent";
			canvas.style.overflow = "auto";
			var html =  "<div id='"+n+"_frame' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +                    									
				"<div id='" + n + "_form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' ></div>" +                    
				"</div>"+
						"<div id='"+n+"_hidden' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;border:1px solid #ff9900;display:none;}' "+
							"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
							"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
							"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
						"></div>"+
						"<div id='" + n + "_block' style='{background:#4d7795; filter:alpha(opacity:70);opacity:0.7;moz-opacity:0.7; zindex:1000000;display: none; position: absolute; left: 0; top: 0; width: 100%; height: 100%}' ></div>";
			this.setInnerHTML(html, canvas);
			this.blockElm = $(n +"_hidden");
			this.frameElm = $(n +"_frame");
		}catch(e){
			systemAPI.alert(this+"$doDraw()",e);
		}
	},	
	initComponent:function(){
	    try{			
			uses("util_dbLib;portalui_childForm;portalui_imageButton;portalui_saiLabelEdit;portalui_button;portalui_label;portalui_panel;portalui_timer;portalui_saiCB;portalui_image");									
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.timer = new portalui_timer(this);
			this.timer.setInterval(2000);
			this.timer.setEnabled(false);
			this.timer.onTimer.set(this,"doTimer");
			
			this.createLogin();
		}catch(e){
			systemAPI.alert(e,"");
		}		
	},
	doAfterResize:function(width, height){	
		try{
			if (this.form !== undefined && this.form.className == "desktop_fLogin"){
				this.setWidth(width);	
				this.setHeight(height);		
			}
			if (this.taskbar !== undefined){				
				this.taskbar.setLeft(system.screenWidth / 2 - 50);
				this.taskbar.setTop(system.screenHeight - 50);
			}
			if (this.form != undefined){				
				this.form.setWidth(system.screenWidth);
				this.form.setHeight(system.screenHeight - 200);		
			}
			
		}catch(e){	
			systemAPI.alert(e);
		}				
	},
		
	userLogin : function(user, pwd, status){
		try{
			this.app.statuslog =  status;
			this.app.userlog = user;
			var pwd = pwd;		
			if (this.app.statuslog == "Anggota" || this.app.statuslog == "Customer"){			
				var data = this.dbLib.getDataProvider("select kode_cust,nama,paswd from portal_cust where kode_cust ='"+this.app.userlog+"' and paswd='"+pwd+"'");
				this.sqlUpdt = "update portal_cust set status_ol='1' "+
											"where kode_cust='"+this.app.userlog+"' ";
			}else if (this.app.statuslog == "Sales" || this.app.statuslog == "Admin"){
				var data = this.dbLib.getDataProvider("select kode_sales,nama,paswd from portal_sales where kode_sales ='"+this.app.userlog+"' and paswd='"+pwd+"'");
				this.sqlUpdt = "update portal_sales set status_ol='1' "+
											"where kode_sales='"+this.app.userlog+"' ";				
			}				
			eval("data = "+data+";");
			this.data = data;
			return (data.rs.rows[0] != undefined);
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	createListData: function(){
		try{		
			uses("portalapp_fListData");
			this.listDataForm = new portalapp_fListData(this.app);		
			this.listDataForm.setWidth(450);
			this.listDataForm.setHeight(477);			
			this.listDataForm.hide();			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTimer : function(sender){		
	}, 
	createBlock : function(){		
		this.childBlock = new portalui_panel(this);
		this.childBlock.setBound(11,21,this.tab.getWidth()-2,this.tab.getHeight()-2);		
		this.childBlock.setBorder(0);
		this.childBlock.setColor("#FFF");
		this.childBlock.getCanvas().style.zIndex = 999999;
		this.childBlock.hide();			
		this.load = new portalui_image(this.childBlock);
		this.load.setBound(this.childBlock.getWidth() / 2 - 15,this.childBlock.getHeight() / 2 - 30,31,31);
		this.load.setImage("image/gridload.gif");
	},	
	doRequestReady: function(sender, methodName, result){
		try{
			switch(methodName){
				case "getDataProvider" : 															
				break;
			}
		}catch(e){
			systemAPI.alert(e,result);
		}	
	},
	createLogin: function(){
		this.app.userlog = "";
		this.app.uname = "";
		this.app.islogin = false;
		uses("desktop_fLogin");
		this.form = new desktop_fLogin(this);
		this.form.setBound(0,100, system.screenWidth, system.screenHeight - 200);		
		this.form.setColor("#1d93aa");
		if (systemAPI.MSIE){
			this.form.getCanvas().onmouseover = new Function("system.getResource("+this.resourceId+").mouseOver(event);");
			this.form.getCanvas().onmouseout = new Function("system.getResource("+this.resourceId+").mouseOut(event);");
		}else{
			this.form.getCanvas().onmouseover = new Function("event","system.getResource("+this.resourceId+").mouseOver(event);");
			this.form.getCanvas().onmouseout = new Function("event","system.getResource("+this.resourceId+").mouseOut(event);");
		}
		this.form.setBorderColor("1px solid #ffffff",{top:true,bottom:true});
	},
	hideTaskbar : function(){
		if (this.taskbar !== undefined){
			this.taskbar.hide();
		}
	},
	showTaskBar: function(){
		if (this.form !== undefined) this.form.free();
		this.form = undefined;		
		if (this.taskbar === undefined){
			uses("desktop_taskbar",true);
			this.taskbar = new desktop_taskbar(this.app);
			this.taskbar.setBound(system.screenWidth / 2 - 50,system.screenHeight - 50,100,40);
			this.taskbar.onClick.set(this,"toggleMenu");
			this.createMenu();
		}
		this.setBound(0,0,0,0);
		this.taskbar.show();
		this.app.setActiveForm(this);
	},
	createMenu: function(){
		uses("portalui_sysPopUpMenu;portalui_sysMenuItem");
		var menu = this.dbLib.getDataProvider("select nama, classname, status, tipe from sysmenu");
		eval("menu = "+menu+";");
		this.sysMenu = new portalui_sysPopUpMenu(this);		
		if (typeof(menu) == "object"){		
			var line;
			for (var i in menu.rs.rows){
				line = menu.rs.rows[i];
				var sysProgram = new portalui_sysMenuItem(this.sysMenu);
				sysProgram.setCaption(line.nama);		
				sysProgram.setData(line.classname,line.status);
				sysProgram.onClick.set(this,"menuExecute");
				sysProgram.setIcon("");			
			}
		}
		this.sysSep = new portalui_sysMenuItem(this.sysMenu);
		this.sysSep.setCaption("-");						
		
		this.sysPanel = new portalui_sysMenuItem(this.sysMenu);
		this.sysPanel.setCaption("Control Panel");		
		this.sysPanel.setIcon("");
		this.sysPanel.onClick.set(this,"menuExecute");					
		
		this.sysHelp = new portalui_sysMenuItem(this.sysMenu);
		this.sysHelp.setCaption("Help and Support");		
		this.sysHelp.setIcon("");
		this.sysHelp.onClick.set(this,"menuExecute");			
		
		this.sysRun = new portalui_sysMenuItem(this.sysMenu);
		this.sysRun.setCaption("Run");		
		this.sysRun.setIcon("");
		this.sysRun.onClick.set(this,"menuExecute");			
		this.sysSep = new portalui_sysMenuItem(this.sysMenu);
		this.sysSep.setCaption("-");						
		this.syslogout = new portalui_sysMenuItem(this.sysMenu);
		this.syslogout.setCaption("Logout "+this.app.uname);		
		this.syslogout.setIcon("");
		this.syslogout.setData("system.restart();","EVENT");
		this.syslogout.onClick.set(this,"menuExecute");			
		
	},
	toggleMenu:function(sender){
		if (this.sysMenu.isPopUp)
			this.sysMenu.unPopUp();
		else
		 this.sysMenu.popUp(sender.left - this.sysMenu.menuForm.width / 2 + sender.width / 2, sender.top - this.sysMenu.menuForm.height - 5);
	},
	menuExecute: function(sender){	
		try{								
			var app = sender.getData();			
			system.showProgress("run "+app);
			if (sender.getDataType() == "APP"){				    
				uses(app+";"+app.substr(0,app.length - 3)+"fMain");
				eval("app = new "+app+"(system);");
				app.run();
			}else{
				eval(app);
			}
			system.hideProgress();
		}catch(e){			
			systemAPI.alert(e);
			system.hideProgress();
		}
	},
	mouseOver : function(event){		
		this.form.fadeBackground("1d93aa","15382d",10,100);//96dcfd
	},	
	mouseOut: function(event){		
		this.form.fadeBackground("15382d","1d93aa",10,100);
	}
});
