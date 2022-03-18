//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_uploader_app = function(owner){
	window.app_uploader_app.prototype.parent.constructor.call(this, owner);
	this.className = "app_uploader_app";
	this.onTerminate.set(this,"doTerminate");
	this.form = undefined;
	this.setTitle("juploader -- is your office");
	this.showForm();
};
window.app_uploader_app.extend(window.portalui_application);
window.app_uploader_app.implement({
	showForm: function(){
		try
		{			
			uses("util_dbLib;portalui_form;portalui_sysForm;portalui_childForm");		
			this._mainForm = new app_uploader_fMain(this);			
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
			window.app_uploader_app.prototype.parent.doKeyDown.call(this, charCode, buttonState, keyCode, event);			
			var target = document.all ? event.srcElement : event.target;
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

window.app_uploader_fMain = function(owner)
{
	if (owner)
	{	
		try
		{
			window.app_uploader_fMain.prototype.parent.constructor.call(this, owner);
			this.onClose.set(this,"doClose");		
			this.maximize();					
			this.centerize();
			uses("portalui_saiCB;portalui_image;portalui_imageButton;portalui_button;portalui_uploader;portalui_saiMemo");
			uses("portalui_label;portalui_saiLabelEdit;portalui_panel;portalui_saiGrid;portalui_pageControl;portalui_radioButton");			
			this.className  = "fMain";
			this.formCaption = "uploader";									
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.pFile = new portalui_panel(this,{bound:[10,10,450,150],caption:"Browse File"});
			this.eFile = new portalui_saiLabelEdit(this.pFile,{bound:[10,30,300,20],caption:"File",readOnly:true});
			this.uploader1 = new portalui_uploader(this.pFile,{bound:[320,30,80,20],autoSubmit:true,afterUpload:[this,"doAfterUpload"],param4:"gridupload",param3:"object"});
			this.mFile = new portalui_saiMemo(this.pFile,{bound:[10,53,300,80],caption:"File Column"});			
			
			this.pTable = new portalui_panel(this,{bound:[10,170,450,150],caption:"Pilih Table"});
			this.eTable = new portalui_saiCB(this.pTable,{bound:[10,30,300,20],caption:"Table",change:[this,"doChange"]});
			this.bLoad = new portalui_button(this.pTable,{bound:[320,30,80,18],caption:"Load",click:[this,"doClick"]});
			this.mColumn = new portalui_saiMemo(this.pTable,{bound:[10,53,300,80],caption:"Column"});			
			
			this.pRelasi = new portalui_panel(this,{bound:[10,330,450,this.height - 350],caption:"Relasi Column"});
			this.sgRelasi = new portalui_saiGrid(this.pRelasi,{bound:[10,30,300,this.pRelasi.height - 35],readOnly:true,colCount:2,colTitle:["File Column","Table Column"],colWidth:[[1,0],[130,130]],buttonStyle:[[1],[bsAuto]]});
			this.bUpload = new portalui_button(this.pRelasi,{bound:[320,30,80,18],caption:"Transfer",click:[this,"insertData"]});
			this.cbAppend = new portalui_radioButton(this.pRelasi,{bound:[320,65,100,20],caption:"Ditambahkan diakhir",selected:true});
			this.cbDelete = new portalui_radioButton(this.pRelasi,{bound:[320,90,100,20],caption:"Hapus data table"});
			
			this.pgControl = new portalui_pageControl(this,{bound:[470,10,this.width - 500,this.height-50],childPage:["Data File","Data Table"]});
			this.sgData1 = new portalui_saiGrid(this.pgControl.childPage[0],{bound:[10,10,this.pgControl.width - 20, this.height - 70]});
			this.sgData2 = new portalui_saiGrid(this.pgControl.childPage[1],{bound:[10,10,this.pgControl.width - 20, this.height - 70]});
			
		}catch(e){
			systemAPI.alert("[fMain]::constructor:lib : " + e,"");
		}
	}	
};
window.app_uploader_fMain.extend(window.portalui_commonForm);
window.app_uploader_fMain.implement({
	doDraw: function(canvas){		
		var n = this.getFullId();   
		canvas.style.background = "transparent";
		canvas.style.overflow = "hidden";
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
	},
	doClose: function(sender){
		this.getApplication().terminate();
	},
	doClick: function(){		
		this.dbLib.getAllTablesA();
	},
	doRequestReady: function(sender, methodName, result){
		try{								
			if (sender == this.dbLib){
				switch(methodName){
					case "getAllTables":
						result = result.split(",");
						this.eTable.setItem(new portalui_arrayMap({items:result}));												
					break;
					case "getColumnOfTable":						
						var data = result.replace(/,/gi,"\r\n");
						this.mColumn.setText(data);						
						result = result.split(",");						
						this.sgRelasi.columns.get(1).setPicklist(new portalui_arrayMap({items:result}));
					break;
					case "getDataProvider":
						this.sgData2.clear();						
						eval("result = "+result+";");
						this.sgData2.setData(result);
					break;
				}
			}
		}catch(e){
			alert("erquest:"+e);
		}
	},
	doChange: function(sender){
		try{
			this.mColumn.setText("-");		
			this.dbLib.getColumnOfTableA(this.eTable.getText());
			this.dbLib.getDataProviderA("select * from "+this.eTable.getText());
		}catch(e){
			alert("doChange::"+e);
		}
	},
	doAfterUpload: function(sender, result, data, filename){
		try{						
			header = data.fieldDesc[0];
			this.eFile.setText(filename);
			this.sgRelasi.clear();	
			var colTitle = [], colWidth=[],column=[],col=0;
			for (var i in header){
				this.sgRelasi.appendData([i,"-"]);
				colTitle[colTitle.length] = i;
				colWidth.push(header[i]);
				column.push(col);
				col++;
			}	
			this.mFile.setText(colTitle.toString().replace(/,/gi,"\r\n"));						
			this.sgData1.setColCount(colTitle.length);
			this.sgData1.setColTitle(colTitle);
			this.sgData1.setColWidth(column,colWidth);
			this.dataUpload = data;
			var line,lineData = [];
			for (var i in data.rows){
				line = data.rows[i];
				lineData = [];
				for (var c in line) lineData.push(line[c]);
				this.sgData1.appendData(lineData);
			}
		}catch(e){
			alert("afterUpload"+e);
		}
	},
	insertData: function(){	
		try{
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();
			var sqlText = "insert into "+this.eTable.getText()+"(";
			var ix = 0;
			for (var i= 0; i < this.sgRelasi.getRowCount();i++){				
				if(this.sgRelasi.cells(1,i) != "-"){
					if (ix >0) sqlText += ",";
					sqlText += this.sgRelasi.cells(1,i);
					ix++;
				}
			}		
			sqlText += ")values";
			var line,lineData,data= "";
			for (var i in this.dataUpload.rows){
				if (i >0) data +=",";
				line = this.dataUpload.rows[i];
				lineData = "";
				var first = true;
				ix = 0;
				var ij = 0;
				for (var c in line){
					if(this.sgRelasi.cells(1,ij) != "-"){
						if (ix >0) lineData += ",";
						lineData += "'"+line[c]+"'";
						ix++;
					}
					ij++;					
				}
				data += lineData;
			}
			if (this.cbDelete.isSelected()) sql.add("delete from "+this.eTable.getText());
			sql.add(sqlText);		
			this.dbLib.execArraySQL(sql);
		}catch(e){
			alert(e);
		}
	}
});