/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.GUI_tools_fUpload = function(owner)
{
	try
	{
		if (owner)
		{
			window.GUI_tools_fUpload.prototype.parent.constructor.call(this, owner);
			this.className = "GUI_tools_fUpload";
			
			this.maximize();
			
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Jurnal Umum", 0);
			uses("controls_uploader");
			this.uploader = new controls_uploader(this);
			this.uploader.setTop(20);
			this.uploader.setLeft(20);
			this.uploader.setWidth(200);
			this.uploader.setHeight(30);
			this.uploader.setMaxFile(10);
			this.uploader.setMultiFile(true);
			this.uploader.onAfterUpload.set(this,"doAfterUpload");
			this.uploader.setUploadClassName("server_util_uploader");
			this.uploader.setFuncName("upload");
			
			uses("controls_button");
			this.btn = new controls_button(this);
			this.btn.setTop(20);
			this.btn.setLeft(220);
			this.btn.setCaption("upload");
			this.btn.onClick.set(this,"doClick");
			
			
			uses("controls_mdGrid");
			this.sg = new controls_mdGrid(this);
			this.sg.setTop(50);
			this.sg.setWidth(500);
			this.sg.setLeft(20);
			this.sg.setHeight(300);
			this.sg.setColCount(3);
				this.sg.columns.get(2).setColWidth(320);				
				this.sg.appendRow(this.sg);				
				this.sg.appendRow(this.sg);
				this.sg.appendRow(this.sg);
				
				var node = this.sg.rows.get(0);				
				node.setDetailHeight(120);				
				this.p1 = new controls_mdGrid(node);
				this.p1.setTop(10);
				this.p1.setLeft(10);
				this.p1.setWidth(400);
				this.p1.setHeight(100);
				this.p1.setColCount(3);
				
				node = this.sg.rows.get(1);
				node.setDetailHeight(120);
				
				this.p1 = new controls_panel(node);
				this.p1.setTop(10);
				this.p1.setLeft(10);
				this.p1.setWidth(400);
				this.p1.setHeight(100);
				this.p1.setCaption("detail");
				this.sg.setCell(1,0,"test");
				
		}
	}catch(e)
	{
		alert("[fUpload]::contructor:"+e);
	}
}

window.GUI_tools_fUpload.extend(window.controls_childForm);
window.GUI_tools_fUpload.prototype.doClick = function(sender)
{
	this.uploader.upload();
}
window.GUI_tools_fUpload.prototype.doAfterUpload = function(sender)
{
	this.uploader.reset();
}

