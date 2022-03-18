/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_sqlTools_fDataBrowser = function(owner)
{
	if (owner)
	{
		window.app_sqlTools_fDataBrowser.prototype.parent.constructor.call(this, owner);
		this.className = "app_sqlTools_fDataBrowser";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Browser", 8);	
		
		this.maximize();
		uses("portalui_panel;portalui_selection;portalui_checkBox;portalui_sgNavigator;util_dbLarge;server_report_report");
		uses("portalui_saiDataGrid",true);
		this.p1 = new portalui_panel(this,{bound:[10,10,270,60],caption:"Table"});								
		this.data = new portalui_selection(this.p1,{bound:[5,25,250,20],change:[this,"doChange"]});		
		this.btn = new portalui_button(this,{bound:[380,25,80,20],caption:"Set InnoDB",click:[this,"doClick"]});				
		this.cb = new portalui_checkBox(this,{bound:[290,25,100,18],caption:"Buffering",selected:true});		
		this.tbl = new portalui_saiDataGrid(this,{bound:[10,80,this.width - 30, 300]});						
		this.sgn = new portalui_sgNavigator(this,{bound:[10,380,this.width - 30, 25], buttonStyle:4, grid:this.tbl, afterUpload:[this,"doAfterLoad"]});		
		this.sgn.onPager.set(this, "doSelectedPage");
		this.sgn.onAfterUpload.set(this,"doAfterLoad");				
		this.dbLib = new util_dbLarge();
		this.dbLib.addListener(this);
		var rs = this.dbLib.getAllTables();
		rs = rs.split(",");
		this.data.setItemsWithId(rs);			
		this.report = new server_report_report();
		this.report.addListener(this);
		this.rowPerPage = 10000;		
	}
};
window.app_sqlTools_fDataBrowser.extend(window.portalui_childForm);

window.app_sqlTools_fDataBrowser.prototype.doClick = function(sender){	
	
};
window.app_sqlTools_fDataBrowser.prototype.doAfterLoad = function(sender, result, data){	
	if (result){		
		this.tbl.clearAll();
		var rs = data;
		if (rs instanceof portalui_arrayMap){
			this.tbl.setHTML(rs.toHTMLCtrl(this.tbl.resourceId));			
		}
	}
};

window.app_sqlTools_fDataBrowser.prototype.mainButtonClick = function(sender){
	try{
		
		var dt = this.data.getTextAndId();
		dt = dt.split(";");
		dt = dt[1];
		var str = "select * from " +dt;
		this.script = str;
		str = replaceStrBetween("select","from","count(*) as tot",str);
		if (str.indexOf("order by") != -1) str = str.substr(0,str.indexOf("order by"));
		var pageCount = this.dbLib.getRowCount(str, this.rowPerPage);
		this.sgn.setTotalPage(pageCount);
		this.sgn.rearrange();
		this.sgn.activePage = 0;	
		this.sgn.setButtonStyle(4);
		if (this.cb.selected)
			this.resultSet = this.dbLib.getDataProvider(this.script);
		this.loadData(1);
	}catch(e){
		alert(e);
	}
};
window.app_sqlTools_fDataBrowser.prototype.loadData = function(page){
	try{						
		//this.dbLib.getDataProviderPageA(this.script, page,this.rowPerPage,true);				
		this.tbl.setSQL(this.script, page,this.rowPerPage);
	}catch(e){
		alert(e,"");
	}
};
window.app_sqlTools_fDataBrowser.prototype.doSelectedPage = function(sender, page){
	switch (sender){		
		default:
			this.loadData(page);
		break;
	}
};
window.app_sqlTools_fDataBrowser.prototype.doClick = function(sender){
	var rs = this.dbLib.updateEngine();
	system.info(this, rs,"");
};