//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_projectSynch_app = function(owner){
	window.app_projectSynch_app.prototype.parent.constructor.call(this, owner);
	this.className = "app_projectSynch_app";
	this.onTerminate.set(this,"doTerminate");
	this.form = undefined;
	this.setTitle("jProjectSynch -- Sinkroninasi File Project(Hanya untuk Client - no Developer)");
	this.showForm();
};
window.app_projectSynch_app.extend(window.portalui_application);
window.app_projectSynch_app.implement({
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
			var target = document.all ? event.srcElement : event.target;
			window.app_projectSynch_app.prototype.parent.doKeyDown.call(this, charCode, buttonState, keyCode, event);			
			if (this._mainForm !== undefined){
				this._mainForm.doKeyDown(charCode, buttonState, keyCode, event);
			}
			if ((keyCode == 32 || keyCode == 40 || keyCode == 33 || keyCode == 34 || keyCode == 35 || keyCode == 39) && target.id.toLowerCase().search("swf") == -1 && (target.id.toLowerCase().search("edit") == -1 && (target.id.search("input") == -1 || target.id.search("textarea") == -1)))
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
			uses("portalui_image;portalui_imageButton;portalui_button;portalui_saiMemo;portalui_label;portalui_saiLabelEdit;portalui_panel;portalui_saiGrid;portalui_saiGrid;portalui_radioButton");			
			this.className  = "fMain";
			this.formCaption = "sqlSynch";									
			//this.dbLib = new util_dbLib();
			//this.dbLib.addListener(this);
			this.pFile = new portalui_panel(this,{bound:[10,40,system.screenWidth - 20,system.screenHeight - 90],caption:"Sinkronisasi dengan server"});
			this.eFile = new portalui_saiLabelEdit(this.pFile,{bound:[10,30,700,20],caption:"Server"});			
			this.bSynch = new portalui_button(this.pFile,{bound:[720,30,80,20],caption:"synchronized",click:[this,"doClick"]});			
			this.bTrans = new portalui_button(this.pFile,{bound:[820,30,80,20],caption:"Update",click:[this,"doClick"]});			
			this.bInit = new portalui_button(this.pFile,{bound:[910,30,80,20],caption:"Checkout",click:[this,"doClick"]});
			this.mSvr = new portalui_saiMemo(this.pFile,{bound:[10,53,700,this.pFile.height / 2 - 63],caption:"Server >> Client"});											
			this.gLocal = new portalui_saiGrid(this.pFile,{bound:[720,53,this.pFile.width - 720,this.pFile.height - 83],colCount:3,colTitle:["T/F","Filename","Data"],colFormat:[[0],[cfBoolean]],colWidth:[[0,1,2],[50,300,100]]});
			this.mLcl = new portalui_saiMemo(this.pFile,{bound:[10,this.pFile.height / 2,700,this.pFile.height / 2 - 20],caption:"Client >> Server"});														
			this.httpRequest = new XMLHttpRequest();			
			this.setTabChildIndex();
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
			if (sender == this.bInit){
				showProgress();
				var params = "cmd=flist&url="+urlencode(this.eFile.getText())+"&file=.&key=nankninknonk";
				this.httpRequest.open("POST","project.php",false);
				this.httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
				this.httpRequest.send(params);
				var script = "";				
				if (this.httpRequest.status == 200){
					script =  this.httpRequest.responseText;
					script = script.replace(/<br>/gi,"\r\n");
					this.mSvr.setText(script);
					var line,data = script.split("\r\n");
					this.svrFile = new portalui_arrayMap();
					for (var  i in data){
						line = data[i].split("=");
						if (line[0] != "") this.svrFile.set(line[0],line[1]);
					}
				}
				this.saveLog(this.svrFile);
				hideProgress();
			}else if (sender == this.bSynch){
				showProgress();
				//if (this.mSvr.getText() == "")
				{
					var params = "cmd=flist&url="+urlencode(this.eFile.getText())+"&file=.&key=nankninknonk";
					this.httpRequest.open("POST","project.php",false);
					this.httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
					this.httpRequest.send(params);
					var script = "";				
					if (this.httpRequest.status == 200){
						script =  this.httpRequest.responseText;
						script = script.replace(/<br>/gi,"\r\n");
						this.mSvr.setText(script);
						var line,data = script.split("\r\n");
						this.svrFile = new portalui_arrayMap();
						for (var  i in data){
							line = data[i].split("=");
							if (trim(line[0]) != "") this.svrFile.set(line[0],line[1]);							
						}
					}
				}
				var params = "cmd=checkout&file=classes_app_projectSynch_lastupdate.log&key=nankninknonk";
				this.httpRequest.open("POST","project.php",false);
				this.httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
				this.httpRequest.send(params);
				var script = "";	
				this.gLocal.clear();
				if (this.httpRequest.status == 200){
					script =  this.httpRequest.responseText;					
					this.mLcl.setText(script);
					var gridData,line,data = script.split("\r\n");					
					this.lclFile = new portalui_arrayMap();
					for (var  i in data){
						line = data[i].split("=");
						this.lclFile.set(line[0],line[1]);
						if (this.svrFile.get(line[0]) != line[1] && line[0] != "")
							this.gLocal.appendData(["false",line[0],this.svrFile.get(line[0])]);
					} 
				}
				hideProgress();				
			}else if(sender == this.bTrans){
				showProgress();	
				var sql = "";
				for (var  i=0;i < this.gLocal.getRowCount();i++){
					sql = this.gLocal.cells(1,i);
					if (sql == "") continue;
					if (this.gLocal.cells(0,i) == "true")
                    {
    					var params = "cmd=update&url="+urlencode(this.eFile.getText())+"&file="+urlencode(sql)+"&key=nankninknonk";
    					this.httpRequest.open("POST","project.php",false);
    					this.httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
    					this.httpRequest.send(params);
    					var script = "";
    					if (this.httpRequest.status == 200){
    						script =  this.httpRequest.responseText;
    					}
    					if (script.search("error") !== -1){
    						systemAPI.alert(script);
    						this.svrFile.set(sql,this.gLocal.cells(2,i));
    					}else {
    						systemAPI.alert(script);					
    					}
					}
				}
				this.saveLog(this.svrFile);
				hideProgress();
			}
		}catch(e){
			hideProgress();
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
	saveLog: function(){		
		var script = "";
		for (var  i in this.svrFile.objList){
			script += i +"="+this.svrFile.get(i)+"\r\n";
		}
		var params = "cmd=save&file=lastupdate.log&key=nankninknonk&content="+urlencode(script);
		this.httpRequest.open("POST","project.php",false);
		this.httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
		this.httpRequest.send(params);
		if (this.httpRequest.status == 200){
			script =  this.httpRequest.responseText;
		}
	}
});
