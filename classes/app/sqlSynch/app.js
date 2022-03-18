//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_sqlSynch_app = function(owner){
	window.app_sqlSynch_app.prototype.parent.constructor.call(this, owner);
	this.className = "app_sqlSynch_app";
	this.onTerminate.set(this,"doTerminate");
	this.form = undefined;
	this.setTitle("jsqlSynch -- Sinkroninasi Database");
	this.showForm();
};
window.app_sqlSynch_app.extend(window.portalui_application);
window.app_sqlSynch_app.implement({
	showForm: function(){
		try
		{			
			uses("util_dbLib;portalui_form;portalui_sysForm;portalui_childForm");		
			this._mainForm = new app_sqlSynch_fMain(this);			
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
			window.app_sqlSynch_app.prototype.parent.doKeyDown.call(this, charCode, buttonState, keyCode, event);			
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

window.app_sqlSynch_fMain = function(owner)
{
	if (owner)
	{	
		try
		{
			window.app_sqlSynch_fMain.prototype.parent.constructor.call(this, owner);
			this.onClose.set(this,"doClose");		
			this.maximize();					
			this.centerize();
			uses("portalui_image;portalui_imageButton;portalui_button;portalui_saiMemo;util_dbLarge");
			uses("portalui_label;portalui_saiLabelEdit;portalui_panel;portalui_saiGrid;portalui_saiGrid;portalui_radioButton");			
			this.className  = "fMain";
			this.formCaption = "sqlSynch";									
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.dbLarge = new util_dbLarge();
			this.pFile = new portalui_panel(this,{bound:[10,40,system.screenWidth - 20,system.screenHeight - 90],caption:"Sinkronisasi dengan server"});
			this.eFile = new portalui_saiLabelEdit(this.pFile,{bound:[10,30,700,20],caption:"Server"});			
			this.bSynch = new portalui_button(this.pFile,{bound:[720,30,80,20],caption:"synchronized",click:[this,"doClick"]});			
			this.bTrans = new portalui_button(this.pFile,{bound:[820,30,80,20],caption:"Transfer Data",click:[this,"doClick"]});			
			this.mSvr = new portalui_saiMemo(this.pFile,{bound:[10,53,700,this.pFile.height / 2 - 63],caption:"Server >> Client"});											
			this.gLocal = new portalui_saiGrid(this.pFile,{bound:[720,53,this.pFile.width - 720,this.pFile.height / 2 - 83],colCount:3,colTitle:["T/F","Script","Data"],colFormat:[[0,2],[cfBoolean,cfBoolean]],colWidth:[[0,1,2],[50,300,50]]});
			this.bUpdLcl = new portalui_button(this.pFile,{bound:[720,this.pFile.height / 2 - 30,80,20],caption:"Update Local",click:[this,"doClick"]});
			this.mLcl = new portalui_saiMemo(this.pFile,{bound:[10,this.pFile.height / 2,700,this.pFile.height / 2 - 20],caption:"Client >> Server"});											
			this.gServer = new portalui_saiGrid(this.pFile,{bound:[720,this.pFile.height / 2,this.pFile.width - 720,this.pFile.height / 2 - 40],colCount:3,colTitle:["T/F","Script","Data"],colFormat:[[0,2],[cfBoolean,cfBoolean]],colWidth:[[0,1,2],[50,300,50]]});
			this.bUpdSvr = new portalui_button(this.pFile,{bound:[720,(this.pFile.height - 40),80,20],caption:"Update Server",click:[this,"doClick"]});
			this.httpRequest = new XMLHttpRequest();			
		}catch(e){
			systemAPI.alert("[fMain]::constructor:lib : " + e,"");
		}
	}	
};
window.app_sqlSynch_fMain.extend(window.portalui_commonForm);
window.app_sqlSynch_fMain.implement({
	doDraw: function(canvas){		
		var n = this.getFullId();   
		canvas.style.background = "";
		canvas.style.overflow = "hidden";
		var html =  "<div id='"+n+"_frame' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +                    									
			"<div id='" + n + "_form' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;overflow:auto}' ></div>" +                    
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
	doClick: function(sender){
		try{
			if (sender == this.bSynch){
				showProgress();
				var params = "cmd=structure&url="+urlencode(this.eFile.getText());
				this.httpRequest.open("POST","admin/getdb.php",false);
				this.httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
				this.httpRequest.send(params);
				var script = "";				
				if (this.httpRequest.status == 200){
					script =  this.httpRequest.responseText;					
					eval("var svrData = "+script+";");					
					var lclData = this.dbLarge.getAllTableStructure();					
					eval("lclData = "+lclData+";");					
					showProgress();
					var sql1 = this.compareDB(svrData, lclData, this.mSvr);
					var sql2 =  this.compareDB(lclData, svrData, this.mLcl);				
					var data = [];
					this.gLocal.clear();
					this.gServer.clear();
					for (var i in sql1.objList){
						data = ["false",sql1.get(i),"false"];
						this.gLocal.appendData(data);
					}				
					for (var i in sql2.objList){						
						data = ["false",sql2.get(i),"false"];
						this.gServer.appendData(data);
					}					
					this.svrData = svrData;
					this.lclData = lclData;
				}
				hideProgress();
			}else if(sender == this.bUpdLcl){
				var sqlUpdLcl = new server_util_arrayList();				
				for (var  i=0;i < this.gLocal.getRowCount();i++){
					if (this.gLocal.cells(0,i) == "true") sqlUpdLcl.add(this.gLocal.cells(1,i));
				}				
				this.dbLib.execArraySQL(sqlUpdLcl);
			}else if(sender == this.bUpdSvr){
				showProgress();	
				var sql = "";
				for (var  i=0;i < this.gServer.getRowCount();i++){
					if (this.gServer.cells(0,i) == "true") sql += "\n"+this.gServer.cells(1,i);
				}				
				sql = sql.substr(1);				
				var params = "cmd=alter&url="+urlencode(this.eFile.getText())+"&sql="+urlencode(sql);
				this.httpRequest.open("POST","admin/getdb.php",false);
				this.httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
				this.httpRequest.send(params);
				var script = "";
				if (this.httpRequest.status == 200){
					script =  this.httpRequest.responseText;
				}
				if (script.search("error") !== -1){
					systemAPI.alert(script);
				}else systemAPI.alert(script);
				hideProgress();
			}else{
				if (this.fTransfer === undefined){
					uses("app_sqlSynch_fTransfer");
					this.fTransfer = new app_sqlSynch_fTransfer(this.app,{closeToHide:true,visible:true});					
					this.fTransfer.gSvr.clear();
					this.fTransfer.gLcl.clear();
					this.fTransfer.bSvr.onClick.set(this,"doTransferClick");
					this.fTransfer.bLcl.onClick.set(this,"doTransferClick");
					var tableName;
					for (var t in this.svrData.tables){
						line = this.svrData.tables[t];
						tableName	= "";
						for (var n in line)tableName = n;						
						this.fTransfer.gSvr.appendData(["false",tableName]);
					}
					for (var t in this.lclData.tables){
						line = this.lclData.tables[t];
						tableName	= "";
						for (var n in line) tableName = n;
						this.fTransfer.gLcl.appendData(["false",tableName]);
					}
				}				
				this.fTransfer.show();
			}
		}catch(e){
			hideProgress();
			alert(e);
		}
		
	},
	compareDB: function(svrData, lclData, logMemo){
		try{
			var line,tmp,tmp2,columnSql,primary,text = "";
			uses("server_util_arrayList");
			var sqlArray = new server_util_arrayList();
			text = "Source tables ("+svrData.tables.length+") <=> Dest tables ("+ lclData.tables.length+") ===> "+(svrData.tables.length != lclData.tables.length ? "Beda" :"Sama")+"\r\n";
			var first = false;
			var tableName ="";
			for (var t in svrData.tables){
				line = svrData.tables[t];
				tableName	= "";
				for (var n in line){				
					tmp = line[n];
					text += "table "+ n +"";					
					tableName = n;
				}
				tmp2 = undefined;
				for (var tt in lclData.tables){
					line = lclData.tables[tt];					
					if (line[tableName] !== undefined){
						text += "(ada)";
						tmp2 = line[tableName];
					}else if (line[tableName.toString().toUpperCase()] !== undefined){
						text += "(ada)";
						tmp2 = line[tableName.toString().toUpperCase()];
					}else if (line[tableName.toString().toLowerCase()] !== undefined){
						text += "(ada)";
						tmp2 = line[tableName.toString().toLowerCase()];
					}
				}				
				if (tmp2 === undefined)  text += "(tidak ada)";
				text += ":\r\n";
				columnSql = "";
				primary = "";
				first = true;
				var lineTmp,ketemu = false;
				for (var d in tmp){
					line = tmp[d];												
					text += "\t\t" + line.Field+"("+line.Type+")";
					if (tmp2 !== undefined){
						ketemu = false;
						for (var j in tmp2){						 
							lineTmp = tmp2[j];
							if (lineTmp.Field.toLowerCase() == line.Field.toLowerCase()){								
								text += "\t\t("+lineTmp.Type+")";
								if (lineTmp.Type != line.Type){
									text += "\t\t(beda)";
									sqlArray.add("alter table `"+tableName+"`  modify column "+line.Field+" "+line.Type);
								}
								ketemu = true;
								break;
							}													
						}
						if (!ketemu){							
							text += "\t\t(tidak ada)";
							sqlArray.add("alter table `"+tableName+"`  add column "+line.Field+" "+line.Type+" "+(line.Null == "NO" ? "NOT NULL" : ""));					
						}
					}else{					
						if (!first) columnSql += ",";
						columnSql += "`"+line.Field+"` "+line.Type+" "+(line.Null == "NO" ? "NOT NULL" : "")+" ";
						first = false;
						if (line.Key === "PRI")
							primary += ",`"+line.Field+"`";
					}
					text += "\r\n";
				}
				if (primary != "") primary = primary.substr(1);
				if (tmp2 === undefined) {					
					sqlArray.add("create table `"+tableName+"`  ("+columnSql+""+(primary == "" ? "" : ", PRIMARY KEY ("+ primary+")") +")");					
				}								
			}
			logMemo.setText(text);
			return sqlArray;
		}catch(e){
			logMemo.setText(text);
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{								
			if (sender == this.dbLib){
				switch(methodName){
					case "execArraySQL":
					systemAPI.alert(result);
					break;
				}
			}
		}catch(e){
			alert("erquest:"+e);
		}
	},
	doChange: function(sender){
		try{
			
		}catch(e){
			alert("doChange::"+e);
		}
	},
	doAfterResize: function(width, height){
		this.setWidth(width);
		this.setHeight(height);
	},
	getRemoteData: function(sql){
		try{
			sql = sql.substr(1);				
			var params = "cmd=select&url="+urlencode(this.eFile.getText())+"&sql="+urlencode(sql);
			this.httpRequest.open("POST","admin/getdb.php",false);
			this.httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
			this.httpRequest.send(params);
			var script = "";
			if (this.httpRequest.status == 200){
				script =  this.httpRequest.responseText;
				eval("var data = "+script);
				var table;
				var sql, line,value,sqlText = "",lineValue="";
				for (var i in this.transTable){
					eval("table = data.table"+i);
					sql = new server_util_arrayList();
					sqlText = "insert into "+this.transTable[i] +" values ";
					lineValue = "";
					for (var r in table.rs.rows){
						line = table.rs.rows[i];
						value = "";
						for (var c in line) value += ",'" + line[c] +"'"; 
						value = value.substr(1);
						lineValue += ",(" + value +")";
					}
					lineValue= lineValue.substr(1);
					sql.add(sqlText + lineValue);
					this.dbLib.execQuery(sql);
				}
			}
			if (script.search("error") !== -1){
				systemAPI.alert(script);
			}else systemAPI.alert(script);
		}catch(e){
			systemAPI.alert(e);
		}
			
	},
	doTransferClick: function(sender){
		showProgress();	
		var sql = "";
		this.transTable = [];
		for (var  i=0;i < this.fTransfer.gSvr.getRowCount();i++){
			if (this.fTransfer.gSvr.cells(0,i) == "true" && this.fTransfer.gSvr.cells(1,i) != "") {
				var table = this.fTransfer.gSvr.cells(1,i);
				sql += "\n select * from "+ table ;
				this.transTable.push(table);
			}
		}
		sql = sql.substring(1);
		getRemoteData(sql);
		hideProgress();	
	}
});