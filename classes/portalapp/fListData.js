//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalapp_fListData = function(owner){
	try{
		if (owner){
			window.portalapp_fListData.prototype.parent.constructor.call(this, owner);
			this.className = "portalapp_fListData";			
			this.items = [];
			this.items2 = [];						
			this.isClick = false;
			this.mouseX = 0;
			this.mouseY = 0;
			this.init();
			this.requester = undefined;
			this.editNama = undefined;
			this.caption = "l i s t d a t a";
			this.kode = "";
			this.nama = "";
			this.startFind = 0;
			this.isFilter = false;	
			this.formRequester = undefined;
			this.fields = undefined;
			this.operator = undefined;
			this.filter = "";			
			this.scriptSql = undefined;
			this.scriptSqlCount = undefined;
			this.basicScript = undefined;
			this.basicCountScript = undefined;			
			this.pager = 15;
			this.withBlankRow = false;//						
			this.dbLib = this.app.dbLib;//new util_dbLib(undefined, this.app._dbSetting);
			this.dbLib.addListener(this);			
			this.onClose.set(this,"doClose");
			this.dataList = undefined;
			this.formWidth = 450;
			this.formHeight = 477;
			this.maximize();
		}
	}catch(e){
		systemAPI.alert("[fListData]::contruct:"+e,"");
	}
};
window.portalapp_fListData.extend(window.portalui_commonForm);
window.portalapp_fListData.implement({
	doDraw: function(canvas){		
	    var n = this.getFullId(); 
	    canvas.style.background = "";
	    var html =  "<div id='"+n+"_frame' style='{border:1px solid #ccc;position: absolute; left: 0; top: 0; width: 450; height: 477;}' >" +                    
						"<div id='" + n + "_sLeftTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeftTop.png) top left no-repeat; position: absolute; left: -8; top: 0; width: 8; height: 8}' ></div>" +
	                    "<div style='{position: absolute; left: -8; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowLeft.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                    "<div id='" + n + "_sEdgeLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeLeft.png) top left no-repeat; position: absolute; left: -8; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div id='" + n + "_sBottomLeft' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomLeft.png) top left no-repeat; position: absolute; left: 0; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div id='" + n + "_sRightTop' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRightTop.png) top left no-repeat; position: absolute; left: 100%; top: 0; width: 8; height: 8}' ></div>" +
	                    "<div style='{position: absolute; left: 100%; top: 0; width: 8; height: 100%; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowRight.png) top left repeat-y; position: absolute; left: 0; top: 8; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
	                    "<div id='" + n + "_sEdgeRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowEdgeRight.png) top left no-repeat; position: absolute; left: 100%; top: 100%; width: 8; height: 12}' ></div>" +
	                    "<div style='{position: absolute; left: -8; top: 100%; width: 100%; height: 12;}' >" +
	                        "<div id='" + n + "_sBottomRight' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottomRight.png) top left no-repeat; position: absolute; left: 100%; top: 0; width: 8; height: 12}' ></div>" +
	                    "</div>" +
	                    "<div style='{position: absolute; left: -8; top: 100%; width: 100%; height: 12; overflow: hidden;}' >" +
	                        "<div id='" + n + "_sBottom' style='{background: url(image/themes/"+system.getThemes()+"/frameShadowBottom.png) top left repeat-x; position: absolute; left: 16; top: 0; width: 100%; height: 100%}' ></div>" +
	                    "</div>" +
						//#90AFBF
	                    "<div id='" + n + "_bg' style='{background: #fff; position: absolute; left: 0; top: 0; width: 450; height: 477}' "+
						"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
						"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
						">"+
						"<div id = '"+n+"_top' style='{position:absolute;background:#fff;"+
						"left: 0; top: 0; height: 25; width: 450;cursor:pointer;font-family: " + window.system.getConfig("form.titleFontName") + "; font-size: " + window.system.getConfig("form.titleFontSize") + "; color: " + window.system.getConfig("form.titleFontColor") + ";}' "+					
						" > <span style='{position:absolute;left:20; top:5; width:100%; height:100%;}'> l i s t d a t a </span></div>"+							
						"<div style='{position:absolute;"+
						"left: 427; top: 0; height: 25; width: 23;cursor:pointer;}' "+
						"></div>"+				
						
						"</div>" +
	                    "<div id='" + n + "form' style='{position: absolute; left: 0; top: 25; width: 100%; height: 100%;}' ></div>" +
	                    
	                "</div>"+
					"<div id='"+n+"_hidden' style='{position: absolute; left: 0; top: -5; width: 450; height: 477;border:1px solid #ff9900;display:none;}' "+
						"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
						"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
						"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
					"></div>";
	    this.setInnerHTML(html,canvas);
		this.blockElm = $(n +"_hidden");
		this.frameElm = $(n +"_frame");
		if (BrowserDetect.browser == "Explorer" && BrowserDetect.version == 6){
			var b1 = $( n +"_sLeftTop");
			var b2 = $( n +"_sLeft");
			var b3 = $( n +"_sEdgeLeft");
			var b4 = $( n +"_sBottomLeft");
			var b5 = $( n +"_sRightTop");
			var b6 = $( n +"_sRight");
			var b7 = $( n +"_sEdgeRight");
			var b8 = $( n +"_sBottomRight");
			var b9 = $( n +"_sBottom");					
			DD_belatedPNG.fixPngArray([b1,b2,b3,b4,b5,b6,b7,b8,b9]);			
		}
		eventOn(canvas,"mousemove","$$$(" + this.resourceId + ").eventMouseMove(event);");
		eventOn(canvas,"mouseup","$$$(" + this.resourceId + ").eventMouseUp(event);");
	},
	setItems: function(items, items2){
	},
	centerize: function(){    
		//var screenWidth = system.screenWidth;
	    //var screenHeight = system.screenHeight;
	    //this.setLeft(parseInt((screenWidth - this.width) / 2, 10));
	    //this.setTop(parseInt((screenHeight - this.height) / 3, 10));
	},
	setLabels: function(data){
		this.sg.clear();	
		if (data == undefined)
			data = this.fields;		
		var script, top = 23;
		for (var i in this.p1.childs.objList) 
			if (!(system.getResource(i) instanceof portalui_imageButton))
				system.getResource(i).free();
		for (var i in data){			
			script = "this.e"+i+" = new portalui_saiLabelEdit(this.p1);";
			script += "this.e"+i+".setBound(10,"+top+",this.formWidth - 20, 20);";
			script += "this.e"+i+".setCaption('"+data[i]+"');";
			script += "this.e"+i+".setText('');";
			script += "this.e"+i+".onKeyPress.set(this, 'editKeyPress');";
			script += "this.e"+i+".onKeyDown.set(this, 'doEditKeyDown');";
			eval(script);
			top += 23;
		}		
		this.e0.setWidth(this.formWidth - 48);
		this.p1.setHeight(top + 3);
		this.sg.setColCount(data.length);
		this.sg.setColTitle(data);
		this.sg.refreshLayout();				
		this.pButton.setTop(this.p1.top + this.p1.height);
		this.sg.setTop(this.pButton.top + this.pButton.height);
		this.sg.setHeight(this.formHeight - this.sg.top - 3 - this.pButton.height);		
	
	},
	show: function(withBlank){
		try{
			this.maximize();
						
			this.frameElm.style.left = this.width / 2 - 225;
			this.frameElm.style.top = this.height / 2 - 235;
			this.blockElm.style.left = this.width / 2 - 225;
			this.blockElm.style.top = this.height / 2 - 235;
			
			system.addMouseListener(this);
			this.withBlankRow = withBlank;		
			this.showModal();
			this.nama = "";
			this.kode = "";			
			this.centerize();
			this.setVisible(true);
			this.bringToFront();
			this.startFind = 0;
			var tmp = this.dbLib.getRowCount(this.scriptSqlCount, this.pager);						
			this.sgNav.setTotalPage(tmp);
			this.sgNav.rearrange();
			this.sgNav.setButtonStyle(3);		
			this.basicScript = this.scriptSql;
			if (this.basicScript.search("order by") != -1){
				var pos = this.basicScript.search("order by");
				this.basicScript = this.basicScript.substr(0,pos);
			}				
			this.sg.clear();			
			this.page = 1;
			this.pageCount = tmp;
			this.dbLib.getDataProviderPageA(this.basicScript +" order by "+this.fields[0], 1,this.pager, undefined, this);														
			this.basicCountScript = this.scriptSqlCount;		
			this.eStatus.setCaption("Page 1 of "+this.pageCount);
			if (this.pageCount > 0)
			{
				if (this.sgNav.imgBtn1 != undefined)
					this.sgNav.setSelectedPage(this.sgNav.imgBtn1);
			}			
			this.getApplication().setActiveForm(this);
			
		}catch(e){
			systemAPI.alert(this+"::"+e,"Error Data");
		}
	},
	hide: function(){	
		this.setVisible(false);
		if (this.requester != undefined){
			this.requester.doSetFocus();
			if (this.formRequester.className == "portalui_childForm")
				this.getApplication().setActiveForm(this.formRequester.getForm());
			else this.getApplication().setActiveForm(this.formRequester);
			this.formRequester.unblock();
		}
	},
	doSysMouseUp: function(x, y, button, buttonState){
		window.portalapp_fListData.prototype.parent.doSysMouseUp.call(this,x, y, button, buttonState);
		this.isClick = false;
		this.blockElm.style.display = "none";
		this.frameElm.style.display = "";
	},
	doSysMouseMove: function(x, y, button, buttonState){
		window.portalapp_fListData.prototype.parent.doSysMouseMove.call(this,x, y, button, buttonState);
		if (this.isClick)
		{					
			var newLeft = parseFloat(this.blockElm.style.left) + (x - this.mouseX);
			var newTop = parseFloat(this.blockElm.style.top) + (y - this.mouseY);		
			if (newLeft < 0) newLeft = 0;			
			if (newLeft + this.formWidth > system.screenWidth) newLeft = system.screenWidth - this.formWidth;
			if (newTop < 0) newTop = 0;
			if (newTop + this.formHeight > system.screenHeight) newTop = system.screenHeight - this.formHeight;
			this.frameElm.style.left = newLeft;
			this.frameElm.style.top = newTop;
			this.blockElm.style.left = newLeft;
			this.blockElm.style.top = newTop;
			this.mouseX = x;
			this.mouseY = y;		
		}
	},
	eventMouseDown: function(event){
		this.mouseX = event.clientX;
	    this.mouseY = event.clientY;
		
		this.isClick = true;
		this.blockElm.style.display = "";
		this.frameElm.style.display = "none";
	},
	eventMouseUp: function(event){
		this.isClick = false;
		this.blockElm.style.display = "none";
		this.frameElm.style.display = "";
	},
	eventMouseMove: function(event){
		if (this.isClick){
			var x = event.clientX;
			var y = event.clientY;
			if (x < 0) x = 0;
			if (y < 0) y = 0;
			var newLeft = parseFloat(this.blockElm.style.left) + (x - this.mouseX);
			var newTop = parseFloat(this.blockElm.style.top) + (y - this.mouseY);
			this.blockElm.style.left = (newLeft);
			this.blockElm.style.top = (newTop);
			this.frameElm.style.left = newLeft;
			this.frameElm.style.top = newTop;
			this.mouseX = x;
			this.mouseY = y;
		}
	},
	doClick: function(sender){
		try{
			this.close();					
			if (sender == this.b1)
			{
				if (this.formRequester.className == "portalui_childForm")
					this.getApplication().setActiveForm(this.formRequester.getForm());
				else this.getApplication().setActiveForm(this.formRequester);
				var data  = [];
				for (var i = 0; i < this.sg.columns.getLength();i++)
					data[data.length] = this.sg.getCell(i,this.sg.row);				
				this.requester.dataFromList = data;								
				if (this.requester.className == "portalui_saiCBBL"){								
					this.requester.setText(data[0]);
					this.requester.setRightLabelCaption(data[1]);
					if (this.editNama !== undefined) this.editNama.setText(data[1]);
					this.requester.setFocus();
				} else
				if (this.requester.className == "portalui_saiCBB"){								
					this.requester.setText(data[0]);					
					if (this.editNama !== undefined) this.editNama.setText(data[1]);
					this.requester.setFocus();
				} else
				if ((this.requester.className == "portalui_saiGrid") && (!this.isFilter)){
					this.requester.setCell(this.requester.col,this.requester.row,data[0]);
					this.requester.setCell(this.requester.col+1,this.requester.row,data[1]);				
					this.requester.setFocusCell(this.requester.col,this.requester.row);
				}else
				if ((this.requester.className == "portalui_saiGrid") && (this.isFilter)){
					this.requester.setCell(this.requester.col,this.requester.row,data[0]);				
					this.requester.setFocusCell(this.requester.col,this.requester.row);
				}else
				if ((this.requester.className == "portalui_saiLabelEdit")||(this.requester.className == "portalui_saiEdit")){
					this.requester.setText(data[0]);
					this.requester.setFocus();
					if (this.editNama !== undefined) this.editNama.setText(data[1]);
				}				
			}else{
			    if (this.formRequester.className == "portalui_childForm")
					this.getApplication().setActiveForm(this.formRequester.getForm());
				else this.getApplication().setActiveForm(this.formRequester);
				this.requester.setFocus();
				if ((this.requester.className == "portalui_saiGrid")){
					this.requester.setFocusCell(this.requester.col,this.requester.row);
				}
            }
			this.formRequester.setActiveControl(this.requester);									
		}catch(e){
			systemAPI.alert("[GUI fListData] :: doClick :" + e,"");
		}
	},
	setCaption: function(data){
		var canvas = $(this.getFullId() +"_top");
		if (canvas != undefined)
			canvas.innerHTML = "<div style='{positon:absolute; left: 2; top : 4; background:url(icon/"+system.getThemes()+"/folder.png) no-repeat;width:18;height:16;}'> </div>"+"<span style='{align:center;position:absolute;left:20; top: 4;"+
				"width:100%; height:100%;}'>"+data+"</span>";
		this.caption = data;
	},
	init: function(){
		try{		    
			uses("portalui_saiLabelEdit;portalui_saiGrid;portalui_sgNavigator");
			this.p1 = new portalui_panel(this,{bound:[0,3,449,45], border:0, caption:"Search"});			
			this.b3 = new portalui_imageButton(this.p1, {bound:[413,23,22,22], click:"doFind", image:"icon/"+system.getThemes()+"/bOk.png", hint:"klik untuk cari data"});			
			this.pButton = new portalui_panel(this,{bound:[0,425,449,24], border:0, color:system.getConfig("app.color.panel")});			
			this.sg = new portalui_saiGrid(this,{bound:[1,100,447,320], dblClick:[this,"doDblClick"], readOnly:true});						
			this.sg.onSelectCell.set(this, "doSelectCell");
			this.sg.setRowSelect(true);			
			this.sg.setAllowAutoAppend(false);
			this.b1 = new portalui_imageButton(this.pButton,{bound:[10,2,42,22], click:"doClick", hint:"Select Row", image:"icon/"+system.getThemes()+"/bOkMed.png"});
			this.b2 = new portalui_imageButton(this.pButton,{bound:[51,2,42,22], click:"doClick", hint:"Cancel", image:"icon/"+system.getThemes()+"/bCancelMed.png"});			
			this.separator = new portalui_image(this.pButton,{bound:[97,2,2,22],image:"icon/"+system.getThemes()+"/separator.png",name:"separator"});		
			this.sgNav =  new portalui_sgNavigator(this.pButton,{bound:[104,0,297,24], grid:this.sg, borderStyle:0, buttonStyle:3});			
			this.sgNav.setColor("transparent");
			this.sgNav.onPager.set(this, "doSelectedPage");						
			
			//this.pStatus = new portalui_panel(this);
			//this.pStatus.setBound(0,425,449,25);		
			//this.pStatus.setColor(system.getConfig("app.color.panel"));	
			
			this.eStatus = new portalui_label(this.pButton, {bound:[this.pButton.width - 100,5,100,19], caption:"Page 0 / 0"});		   		    
		    
			this.setTabChildIndex();	
		}catch(e){
			systemAPI.alert("[fListData2]::init:"+e,step);
		}
	},
	setDataFromItems: function(){	
	},
	editKeyPress: function(sender){
		this.startFind = 0;
	},
	doEditKeyDown: function(sender, keyCode, buttonState){
		if (keyCode == 13)
			this.b3.click();
	},
	doKeyDown: function(charCode, buttonState,keyCode,event){   
	    try{
    		if (keyCode == 13 && this.activeControl.className == "portalui_saiGrid"){ 
    			this.b1.click();
    			return false;
    		}if (keyCode == 27){
                 this.b2.click();
                 return false;
            }            
    		if (this.activeControl == this.sg){
    		      switch(keyCode){
    		          case 38 :
    		              if (this.sg.row == 0){		               
                                this.sgNav.leftBtn.click();
                                return false;
                          }
    		          break;
    		          case 40:
    		             if (this.sg.row == (this.pager  - 1)){
                                this.sgNav.rightBtn.click();
                                return false;
                          } 
    		          break;
                  }
            }
            return window.portalapp_fListData.prototype.parent.doKeyDown.call(this, charCode, buttonState, keyCode,event);
        }catch(e){
            alert(e);
        }
	},
	setRequester: function(formReq, req, row, col, isFilter, editNama){
		this.requester = req;
		this.formRequester = formReq;
		this.isFilter = isFilter;
		this.editNama = editNama;	
	},
	doDblClick: function(sender, colIdx, rowIdx){		
		this.doClick(this.b1);
	},
	doSelectCell: function(sender, colIdx, rowIdx){
		this.e0.setText(this.sg.getCell(0, rowIdx));
		this.startFind = rowIdx + 1;	
	},
	doFind: function(sender){
		try{
			var child;
			var text; 
			for (var i in this.p1.childs.objList){
				child = system.getResource(i);
				if (child !== undefined && child instanceof portalui_saiLabelEdit && child.getText() != ""){
					text = child.getText();
					break;
				}
			}
			var value;
			var i = 0;		
			if (text != ""){
		  		for (i = this.startFind; i < this.sg.rows.getLength(); i++){
		  			for (var j in this.sg.columns.objList){		  		  				
						value = this.sg.getCell(j,i);
						value = value.toLowerCase();
						text = text.toLowerCase();
						if (value.search(text) != -1)  {
							this.startFind = i + 1;
							this.sg.goToRow(i);								
							return value;
						}
		  			}
		  		}
		  	}
			var script = "";
			var filter = "";			
			for (var i in this.fields){		
				if (this.app._dbEng == 'oci8'){						
					if ( i > 0)
						script += "filter += \"and( lower(\" + this.fields["+i+"] +\") like '\" +this.e"+i+".getText().toLowerCase() +\"%')\"; ";			
					else
						script += "filter += \"( lower(\" + this.fields["+i+"] +\") like '\" +this.e"+i+".getText().toLowerCase() +\"%')\";";
				}else {
					if ( i > 0)
						script += "filter += \"and( \" + this.fields["+i+"] +\" like '\" +this.e"+i+".getText() +\"%')\"; ";			
					else
						script += "filter += \"( \" + this.fields["+i+"] +\" like '\" +this.e"+i+".getText() +\"%')\";";
				}
			}						
			eval(script);				
			filter = filter.replace(/\*/gi,"%");									
			this.filter = " "+this.operator+" (" + filter +")";
			this.scriptSql = this.basicScript +" "+this.filter ;
			this.scriptSqlCount = this.basicCountScript+" "+this.filter;			
			this.sg.clear();
			this.dbLib.getDataProviderPageA(this.scriptSql +" order by "+this.fields[0], 1,this.pager, undefined, this);							
			this.pageCount = this.dbLib.getRowCount(this.scriptSqlCount, this.pager);		
			this.sgNav.setTotalPage(this.pageCount);
			this.sgNav.rearrange();
			this.sgNav.setButtonStyle(3);
			this.eStatus.setCaption("Page 1/"+this.pageCount);			
			this.startFind = 0;
		}catch(e){
			systemAPI.alert("[GUI fListData]::doFind :" + e,"");
		}
	},
	doRequestReady: function(sender, methodName, result, callObj){		
		try{	
			if (callObj != this) return;
			switch(methodName)
			{
				case "getDataProviderPage" :					
					try{
						eval("result = "+result+";");
					}catch(e){
						try{
							result = JSON.parse(result);
						}catch(e){
							systemAPI.alert("[doRequestReady]"+result+"<br>"+this.scriptSql);
							return;
						}
					}
					if (typeof result !="string"){				
						this.sg.setData(result);												
						if (this.withBlankRow){					    						
		                      this.sg.addRowValues(['-','-']);
						}
						this.sg.frame.scrollTop = 0;
						this.getApplication().setActiveForm(this);
						this.sg.setNoUrut((this.page - 1) * this.pager);
						if (this.sg.rows.getLength() > 0){
    						this.sg.col  = 0;
    						this.sg.row  = 0;
    						this.sg.rows.get(0).eventClick(undefined,0);
    						this.e0.setText("");
						}
                        //this.setActiveControl(this.sg);
					}else throw(result);
					/*
					if (result instanceof portalui_arrayMap){				
						this.sg.setData(result);												
						if (this.withBlankRow){					    						
		                      this.sg.addRowValues(['-','-']);
						}
						this.getApplication().setActiveForm(this);
						this.sg.setRowNumber((this.page - 1) * this.pager);
						if (this.sg.rows.getLength() > 0){
    						this.sg.col  = 0;
    						this.sg.row  = 0;
    						this.sg.rows.get(0).eventClick(undefined,0);
    						this.e0.setText("");
						}
                        //this.setActiveControl(this.sg);
					}else throw(result);
					*/
				break;
			}		
		}catch(e){
			systemAPI.alert("[doRequestReady]"+e+"<br>"+result);
		}
	},
	doSelectedPage: function(sender, page){
		this.sg.clear();
		this.dbLib.getDataProviderPageA(this.scriptSql +" order by "+this.fields[0], page,this.pager, undefined, this);					
		this.eStatus.setCaption("Page "+page+"/"+this.pageCount);				
		this.page = page;
	},
	setScriptSql: function(sql, sql2){
		if (sql.search("order by") != -1){
			var pos = sql.search("order by");
			sql = sql.substr(0,pos);
		}				
		this.scriptSql = sql;
		this.scriptSqlCount = sql2;
	},
	doTimer: function(){
		window.clearTimeout(this.interval);
	},
	setFields: function(fields, operator){	
		this.fields = fields;
		this.operator = operator;
		this.filter = "";
	},
	doClose: function(sender){
		system.delMouseListener(this);		
	},
	changeDBLib: function(dbLib){
		if (this.dbLib)
			this.dbLib.delListener(this);
		this.dbLib = dbLib;//new util_dbLib(undefined, this.app._dbSetting);
		this.dbLib.addListener(this);		
	}
});
