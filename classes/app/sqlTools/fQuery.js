/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_sqlTools_fQuery = function(owner)
{
	if (owner)
	{
		window.app_sqlTools_fQuery.prototype.parent.constructor.call(this, owner);
		this.className = "app_sqlTools_fQuery";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Query Browser", 8);	
		
		this.maximize();
		uses("controls_panel");
		this.p1 = new controls_panel(this);
		this.p1.setTop(10);
		this.p1.setWidth(this.getWidth() - 30);
		this.p1.setLeft(10);
		this.p1.setHeight(200);
		this.p1.setCaption("SQL Script");
		
		uses("controls_saiMemo");
		this.editor = new controls_saiMemo(this.p1);
		this.editor.setTop(20);
		this.editor.setWidth(this.p1.getWidth()-10);
		this.editor.setHeight(this.p1.getHeight()-23);
		this.editor.setLeft(5);
		this.editor.setLabelWidth(0);
		
		uses("controls_saiSG",true);
		this.table = new controls_saiSG(this);
		this.table.setTop(230);
		this.table.setLeft(10);
		this.table.setWidth(this.getWidth() - 30);
		this.table.setHeight(200);
		
		uses("controls_sgNavigator");
		this.sgn = new controls_sgNavigator(this);
		this.sgn.setTop(433);
		this.sgn.setLeft(10);
		this.sgn.setWidth(this.getWidth() - 30);	
		this.sgn.onPager.set(this, "doSelectedPage");
		
		uses("util_dbLib");
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
	}
}
window.app_sqlTools_fQuery.extend(window.controls_childForm);
window.app_sqlTools_fQuery.prototype.doClick = function(sender){
	if (sender == this.b1)
		alert(this.table.getCell(this.table.col,this.table.row));
	if (sender == this.b2)
		this.table.setCell(3,4,"test dicell dengan string panjang");
	
}
window.app_sqlTools_fQuery.prototype.mainButtonClick = function(sender){
			
	var str = this.editor.getText().toLowerCase();
	str = replaceStrBetween("select","from","count(*) as tot",str);
	if (str.indexOf("order by") != -1) str = str.substr(0,str.indexOf("order by"));
//alert(str);	
	var pageCount = this.dbLib.getRowCount(str, 20);
	this.sgn.setTotalPage(pageCount);
	this.sgn.rearrange();
	this.sgn.activePage = 0;	
	this.sgn.setButtonStyle(3);
	this.loadData(1);
}
window.app_sqlTools_fQuery.prototype.loadData = function(page){
	try{
	
		this.table.clear();
		var rs = this.dbLib.listDataObj(this.editor.getText(),page, 20);
		if (rs instanceof controls_arrayMap){
			var first = true;
			var value = undefined;
			for (var i in rs.objList){
				var data = rs.get(i);
				value = new Array();
				if (first) {								
					this.table.setColCount(data.getLength());
					//value[value.length] = "No";	
					for (var d in data.objList)
						value[value.length] = d;							
					this.table.setColTitle(value);
					first = false;
				}
				value = new Array();
				for (var d in data.objList)
					value[value.length] = data.get(d);
				this.table.appendData(value);
			}
			this.table.setNoUrut((page - 1) * 20);
		}else throw(rs);
	}catch(e){
		page.alert(this, e,"");
	}
}
window.app_sqlTools_fQuery.prototype.doSelectedPage = function(sender, page){
	this.loadData(page);
}