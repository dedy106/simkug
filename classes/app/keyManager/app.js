//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
uses("util_dbLib;util_standar;portalui_sysForm;portalui_button;portalui_label;portalui_childForm;portalui_saiLabelEdit;portalui_panel;portalui_saiGrid;portalui_radioButton;portalui_saiCBBL;portalui_groupBox;portalui_radioButton;portalui_checkBox;portalui_saiCB;portalui_sgNavigator;util_keyManager;portalapp_fListData");
window.app_keyManager_app = function(owner){
	window.app_keyManager_app.prototype.parent.constructor.call(this, owner);
	this.className = "app_keyManager_app";
	this.onTerminate.set(this,"doTerminate");
	this.form = undefined;
	this.setTitle("jkeyManager -- License Manager");
	this.showForm();
};
window.app_keyManager_app.extend(window.portalui_application);
window.app_keyManager_app.implement({
	showForm: function(){
		try
		{						
			this._mainForm = new app_keyManager_fMain(this);			
			this.activeForm = this._mainForm;
			this.setActiveForm(this._mainForm);				
			this._mainForm.show();							
		}catch(e){
			systemAPI.alert("[saku]::showMainForm:",e);
		}
	},
	doTerminate: function(sender){	
	},	
	doKeyDown: function(charCode, buttonState, keyCode, event){
		try{			
			var target = document.all ? event.srcElement : event.target;
			window.app_keyManager_app.prototype.parent.doKeyDown.call(this, charCode, buttonState, keyCode, event);			
			if (this._mainForm !== undefined){
				this._mainForm.doKeyDown(charCode, buttonState, keyCode, event);
			}
			if ((keyCode == 40 || keyCode == 33 || keyCode == 34 || keyCode == 35 || keyCode == 39) && target.id.toLowerCase().search("swf") == -1 && (target.id.toLowerCase().search("edit") == -1 && (target.id.search("input") == -1 || target.id.search("textarea") == -1)))
				return false;
			return true;			
		}catch(e){
			systemAPI.alert(e);
		}
	}
});

window.app_keyManager_fMain = function(owner)
{
	if (owner)
	{	
		try
		{
			window.app_keyManager_fMain.prototype.parent.constructor.call(this, owner);
			this.onClose.set(this,"doClose");		
			this.maximize();					
			this.centerize();			
			this.className  = "fMain";
			this.formCaption = "keyManager";				
			this.setBorderStyle(bsDialog);
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			this.keyMgr = new util_keyManager();
			this.keyMgr.addListener(this);
			this.cb_cust = new portalui_saiCBBL(this,{bound:[10,20,200,20],caption:"Customer",btnClick:[this,"FindBtnClick"],change:[this,"doChange"]});
			this.cb_lokasi = new portalui_saiCBBL(this,{bound:[10,43,200,20],caption:"Lokasi",btnClick:[this,"FindBtnClick"],change:[this,"doChange"]});
			this.gb1 = new portalui_groupBox(this,{bound:[10,55,400,50],caption:"Group Berdasar"});
			this.rb1 = new portalui_radioButton(this.gb1,{bound:[10,6,100,20],caption:"Menu"});
			this.cbMenu = new portalui_saiCB(this.gb1,{bound:[70,3,100,20],caption:"",labelWidth:0});
			this.rb2 = new portalui_radioButton(this.gb1,{bound:[200,6,100,20],caption:"Form",selected:true});
			this.bLoad = new portalui_button(this,{bound:[20, 115,80,20],caption:"Load",click:[this,"doClick"]});
			this.bGen = new portalui_button(this,{bound:[320, 115,80,20],caption:"Simpan",click:[this,"doClick"]});
			this.p1  = new portalui_panel(this,{bound:[10,140,400,400],caption:"Data Form"});			
			this.gForm = new portalui_saiGrid(this.p1,{bound:[0,20,400,350],colCount:2,colTitle:["T/F","Data Form"],colWidth:[[0,1],[50,300]], colFormat:[[0],[cfBoolean]]});					
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,376,400,25], buttonStyle:3,grid:this.gForm, pager:[this,"doSelectedPage"]});
			this.cb1 = new portalui_checkBox(this.sgn,{bound:[250,3,100,20],caption:"Select / Deselect All",click:[this,"doClick"]});									
			this.httpRequest = new XMLHttpRequest();		
			var data = this.dbLib.getDataProvider("select distinct kode_klp from menu",true);
			var item = [];
			this.rearrangeChild(10,23);
			this.bRight = new portalui_imageButton(this,{bound:[420,300,22,22],image:"icon/dynpro/bright.png",click:[this,"doClick"]});
			this.bLeft = new portalui_imageButton(this,{bound:[420,325,22,22],image:"icon/dynpro/bleft.png",click:[this,"doClick"]});
			this.p2  = new portalui_panel(this,{bound:[460,this.p1.top,400,400],caption:"Data Form"});
			this.gFormSelect = new portalui_saiGrid(this.p2,{bound:[0,20,400,350],colCount:2,colTitle:["T/F","Data Form"],colWidth:[[0,1],[50,300]], colFormat:[[0],[cfBoolean]]});					
			this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[0,376,400,25], buttonStyle:3,grid:this.gFormSelect, pager:[this,"doSelectedPage"]});
			this.cb2 = new portalui_checkBox(this.sgn2,{bound:[250,3,100,20],caption:"Select / Deselect All",click:[this,"doClick"]});			
			for (var i in data.rs.rows) item[item.length] = data.rs.rows[i].kode_klp;
			this.cbMenu.setItem(new portalui_arrayMap({items:item}));
			this.createListData();	
		}catch(e){
			systemAPI.alert("[fMain]::constructor:lib : " + e,"");
		}
	}	
};
window.app_keyManager_fMain.extend(window.portalui_sysForm);
window.app_keyManager_fMain.implement({
	doClose: function(sender){
		this.getApplication().terminate();
	},
	doClick: function(sender){
		try{
			if (sender == this.bLoad){
				if (this.rb1.isSelected()){					
					this.scriptSqlCount = "select count(b.form) as tot from menu a inner join m_form b on b.kode_form = a.kode_form where a.kode_klp = '"+this.cbMenu.getText()+"' ";
					this.sql = "select b.form, b.nama_form from menu a inner join m_form b on b.kode_form = a.kode_form where a.kode_klp = '"+this.cbMenu.getText()+"' ";
					this.pager = 50;
					this.operator = " and ";
				}else {
					this.scriptSqlCount = "select count(form) as tot from m_form ";
					this.sql = "select form, nama_form from m_form b ";
					this.pager = 50;
					this.operator = " where  ";
				}				
				this.page = 1;
				var filter = "";
				for (var i=0; i < this.gFormSelect.getRowCount();i++){
					filter += ",'" + this.gFormSelect.cells(1,i)+"'";
				}
				if (filter != "") filter = this.operator+ " b.form not in ("+filter.substr(1) +")";				
				this.dbLib.getDataProviderPageA(this.sql+ filter +"  order by form",1,this.pager,true);
				var tmp = this.dbLib.getRowCount(this.scriptSqlCount, this.pager);						
				this.sgn.setTotalPage(tmp);
				this.sgn.rearrange();
				this.sgn.setButtonStyle(3);
				this.sgn.activePage = 0;	
				this.gForm.clear();
			}else if (sender == this.cb1){
				for (var i= 0;i < this.gForm.getRowCount();i++)
					this.gForm.cells(0,i,sender.isSelected() ? "true" : "false");
			}else if (sender == this.cb2){			
				for (var i= 0;i < this.gFormSelect.getRowCount();i++)
					this.gFormSelect.cells(0,i,sender.isSelected() ? "true" : "false");
			}else if (sender == this.bRight){
				var i= 0;
				while (i < this.gForm.getRowCount()){
					if (this.gForm.cells(0,i) == "true"){
						this.gFormSelect.appendData(["false",this.gForm.cells(1,i)]);
						this.gForm.delRow(i);
					}else i++;
				}
			}else if (sender == this.bLeft){
				var i= 0;
				while (i < this.gFormSelect.getRowCount()){
					if (this.gFormSelect.cells(0,i) == "true"){
						this.gForm.appendData(["false",this.gFormSelect.cells(1,i)]);
						this.gFormSelect.delRow(i);
					}else i++;
				}
			}else if (sender == this.bGen){				
				uses("server_util_arrayList");
				var data = new server_util_arrayList();
				for (var i=0; i < this.gFormSelect.getRowCount();i++){
					data.add("'"+ this.gFormSelect.cells(1,i)+"'");
				}
				this.keyMgr.setContent(data);				
			}
			
		}catch(e){
			hideProgress();
			alert(e);
		}
		
	},
	doSelectedPage: function(sender, page){	
		var filter = "";
		for (var i=0; i < this.gFormSelect.getRowCount();i++){
			filter += ",'" + this.gFormSelect.cells(1,i)+"'";
		}
		if (filter != "") filter = this.operator+ " b.form not in ("+filter.substr(1) +")";
		this.dbLib.getDataProviderPageA(this.sql+ filter +" order by b.form",page,this.pager,true);
		this.page = page;
	},
	doRequestReady: function(sender, methodName, result){
		try{								
			if (sender == this.dbLib){
				switch(methodName){
					case "getDataProviderPage":
						eval("result = "+result+";");
						var line;
						this.gForm.showLoading();
						this.gForm.clear();
						for (var i in result.rs.rows){
							line = result.rs.rows[i];
							this.gForm.appendData(["false",line.form, line.nama_form]);
						}		
						this.gForm.hideLoading();
						this.gForm.setRowNumber((this.page - 1) * this.pager);
					break;
				}
			}
		}catch(e){
			this.gForm.hideLoading();
			alert("erquest:"+e);
		}
	},
	doChange: function(sender){
		try{
			var key = this.keyMgr.getKey(this.cb_cust.getText());
			var data = this.keyMgr.getContent();			
			eval("data = "+data);			
			this.gFormSelect.clear();
			for (var i in data) this.gFormSelect.appendData(["false",data[i]]);
		}catch(e){
			alert("doChange::"+e);
		}
	},
	doAfterResize: function(width, height){
		this.setWidth(width);
		this.setHeight(height);
	},
	FindBtnClick: function(sender){
		if (sender == this.cb_cust){
			this.standarLib.showListData(this, "Daftar Customer",sender,undefined, 
										  "select kode_cust, nama  from cust  ",
										  "select count(kode_cust) as tot from cust ",
										  ["kode_cust","nama"],"where",["Kode Cust","Nama"],false);
			
		}
	},
	createListData: function(){
		try{					
			this.listDataForm = new portalapp_fListData(this.app);		
			this.listDataForm.setWidth(450);
			this.listDataForm.setHeight(477);			
			this.listDataForm.hide();			
		}catch(e){
			systemAPI.alert(e);
		}
	}
});