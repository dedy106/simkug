window.app_eclaim_master_fLokasi = function(owner)
{
	if (owner){
		window.app_eclaim_master_fLokasi.prototype.parent.constructor.call(this, owner);
		this.className = "app_eclaim_master_fLokasi";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Lokasi", 0);	
		
		this.maximize();
		uses("portalui_saiCBBL");
		this.cb_ttg = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Tertanggung",btnClick:[this,"FindBtnClick"]});
		
		this.addBtn = new portalui_imageButton(this,{bound:[27,20,22,22],image:"icon/"+system.getThemes()+"/createentries.png",hint:"Add",click:[this,"entriesClick"]});		
		this.editBtn = new portalui_imageButton(this,{bound:[47,20,22,22],image:"icon/"+system.getThemes()+"/editentries.png",hint:"Edit",click:[this,"entriesClick"]});
		this.delBtn = new portalui_imageButton(this,{bound:[67,20,22,22],image:"icon/"+system.getThemes()+"/delentries.png",hint:"Delete",click:[this,"entriesClick"]});		
		this.relBtn = new portalui_imageButton(this,{bound:[87,20,22,22],image:"icon/"+system.getThemes()+"/relakun.png",hint:"Deselect",click:[this,"entriesClick"]});						
		this.downBtn = new portalui_imageButton(this,{bound:[107,20,22,22],image:"icon/"+system.getThemes()+"/down.png",hint:"Geser ke Bawah",click:[this,"entriesClick"]});								
		this.upBtn = new portalui_imageButton(this,{bound:[127,20,22,22],image:"icon/"+system.getThemes()+"/up.png",hint:"Geser ke Atas",click:[this,"entriesClick"]});								
		this.leftBtn = new portalui_imageButton(this,{bound:[147,20,22,22],image:"icon/"+system.getThemes()+"/bleft.png",hint:"Geser Kiri",click:[this,"entriesClick"]});				
		this.rightBtn = new portalui_imageButton(this,{bound:[167,20,22,22],image:"icon/"+system.getThemes()+"/bright.png",hint:"Geser Kanan",click:[this,"entriesClick"]});				
		this.reloadBtn = new portalui_imageButton(this,{bound:[197,20,22,22],image:"icon/"+system.getThemes()+"/reload.png",hint:"Refresh",click:[this,"entriesClick"]});								
		this.treev = new portalui_treeView(this,{bound:[20,50,700,this.getHeight() - 130],childLength:700,dblClick:[this,"treeClick"]});
		
		uses("util_dbLib;util_standar");		
		this.dblib = new util_dbLib();
		this.dblib.addListener(this);
		this.menuStr = "";
		this.rearrangeChild(10,23);
		this.standarLib = new util_standar();		
		setTipeButton(tbSimpan);						
		this.rowIndex = -1;
		this.setTabChildIndex();
		this.standarLib.clearByTag(this, [0], this.e0);		
		this.cb_ttg.setText(this.app._kodeTtg,this.app._namaTtg);
	}
};
window.app_eclaim_master_fLokasi.extend(window.portalui_childForm);
window.app_eclaim_master_fLokasi.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","");
	},
	doRequestReady: function(sender, methodName, result){
		switch (methodName){
			case "listData" : 				
				this.menuStr = result;
				this.loadMenu();
				break;
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.app._lokasi+")");
				else system.alert(this,result); 
				break;
		}
	},
	doModalResult: function(event, modalResult, value){
		if (modalResult == mrCancel) return;		
		try{
			switch (event){
				case "Add" :				   
					try{
						var node = this.selectedItem;
						var induk;
						if (node == undefined){
							node = new portalui_treeNode(this.treev);
							induk = "00000";
						}else{
							node = new portalui_treeNode(this.selectedItem);
							induk = this.selectedItem.getKode();
						}						
						node.setKode(value.kode);
						node.setCaption(value.nama);	
						node.setKodeForm('-');
						node.setShowKode(true);
						var lvl = node.getLevel() - 1;						
						var data = {};
						data.kode_lok = value.kode;
						data.kode_ttg = this.cb_ttg.getText();
						data.kode_lokasi = this.app._lokasi;
						data.nama = value.nama;												
						data.level_lap = 1;
						data.level_spasi = lvl;
						data.tipe= value.tipe;
						data.sum_header = '-';	
						data.kode_induk = induk;	
						data.rowindex = 0;		
						data.nik_user = this.app._userLog;
						data.tgl_input = new Date().getDateStr();										
						node.data = data;
					}catch(e)
					{
						alert(e);
					}
					break;
				case "Edit" :
					var item = this.selectedItem;					
					item.setKode(value.kode);
					item.setCaption(value.nama);
					item.setKodeForm('-');
					item.setShowKode(true);
					var data = item.data;
					data.kode_lok = value.kode;					
					data.nama = value.nama;
					data.level_lap = 1;					
					data.tipe = value.tipe;
					data.sum_header = "-";
					data.rowindex = 0;					
					item.data = data;
					break;
				case "Remove" :						
					this.treev.delItem(this.selectedItem);
					break;
				case "clear" :
					this.treev.clear();					
					break;
				case "simpan" :
					this.rowIndex = -1;
					var value = this.getTreeData(this.treev);
					if (value != "") value = value.substr(1);					
					try{
						var sql2;
						var sql = new server_util_arrayList();
						sql.add("delete from eclaim_lokasi where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg = '"+this.cb_ttg.getText()+"' ");						
						var data = value.replace(/#/g,",");
						sql2 = "insert into eclaim_lokasi(kode_lok, kode_ttg, kode_lokasi,nama, level_lap,level_spasi, tipe, sum_header, kode_induk, rowindex, nik_user, tgl_input) values ";
						sql2 += " "+ data +" ";
						sql.add(sql2);						
						this.dblib.execArraySQL(sql);	
					}catch(e){
						system.alert(this,e,"error Simpan");
					}	
					break;
				
			}
		}catch(e){
			systemAPI.alert("[fNeraca]::doModalResult:"+e);
		}
	},
	loadMenu: function(daftarNrc){
		try{
			var menu = daftarNrc, rowNo = 0, itemValues;
			if (this.treev != undefined) this.treev.clear();				
			var kode, nama, levelLap, level, item, node;
					
			for (var r in menu.rs.rows){				
				itemValues = menu.rs.rows[r];			
				kode = itemValues.kode_lok;							
				if (kode != "")
				{
					nama = itemValues.nama;
					levelLap = itemValues.level_lap;
					level = itemValues.level_spasi;
					level++;
					if (node == undefined)
						node = new portalui_treeNode(this.treev);
					else if ((node instanceof portalui_treeNode) && (node.getLevel() == level - 1))
						node = new portalui_treeNode(node);
					else if ((node instanceof portalui_treeNode) && (node.getLevel() == level))
						node = new portalui_treeNode(node.owner);
					else if ((node instanceof portalui_treeNode) && (node.getLevel() > level))
					{	
						if (!(node.owner instanceof portalui_treeView))
						{
							node = node.owner;
							while (node.getLevel() > level)
							{
								if (node.owner instanceof portalui_treeNode)
									node = node.owner;
							}
						}
		
						node = new portalui_treeNode(node.owner);				
					}		
					node.setKodeForm(levelLap);
					node.setKode(kode);
					node.setCaption(nama);
					node.setShowKode(true);
					node.data = itemValues;
				}
				rowNo++;
			}
		}catch(e){
			systemAPI.alert("row "+ rowNo +" : "+e);
		}
	},	
	doClick: function(sender){	
		var nrc = this.dblib.runSQL("select kode_lok, kode_ttg, kode_lokasi,nama, level_lap,level_spasi, tipe, sum_header, kode_induk, rowindex, nik_user, tgl_input from eclaim_lokasi where  kode_lokasi = '"+this.app._lokasi+"' order by rowindex",0,0);	
		this.loadMenu(nrc);	
	},	
	entriesClick: function(sender){
		try
		{ 
			if (sender == this.reloadBtn){				
				var nrc = this.dblib.getDataProvider("select kode_lok, kode_ttg, kode_lokasi,nama, level_lap,level_spasi, tipe, sum_header, kode_induk, rowindex, nik_user, tgl_input from eclaim_lokasi where kode_lokasi = '"+this.app._lokasi+"' and kode_ttg = '"+this.cb_ttg.getText()+"' order by rowindex",true);
				this.loadMenu(nrc);		
			}else if (sender == this.relBtn){
				this.selectedItem = undefined;
				this.treev.doSelectItem(undefined);
			}else{			
				if (sender == this.addBtn || sender == this.editBtn){
					if (this.frameAdd == undefined){
						this.frameAdd = new app_eclaimg_master_fFrameAddLks(this.app, this);						
					}
				}
				if (sender == this.addBtn)
				{					
					var item = this.treev.getSelectedItem();
					if (item != undefined){
						this.selectedItem = item;		
						this.frameAdd.setCaption(item.getCaption());					
					}else{
						this.selectedItem = undefined;		
						this.frameAdd.setCaption("Create Entries");			
					}					
					this.frameAdd.setEvent("Add");
					this.frameAdd.showModal();
				}else if (sender == this.editBtn)
				{
					var item = this.treev.getSelectedItem();
					if (item == undefined) return;
					this.selectedItem = item;
					this.frameAdd.setEvent("Edit");
					this.frameAdd.setCaption(item.getCaption());
					this.frameAdd.e0.setText(item.getKode());				
					this.frameAdd.e0.setReadOnly(true);
					this.frameAdd.e1.setText(trim(item.getCaption()));
					this.frameAdd.e2.setText(item.data.tipe);					
					this.EditStatus = "Edit";					
					this.frameAdd.showModal();
				}else if (sender == this.delBtn){
					var item = this.treev.getSelectedItem();	
					this.selectedItem = item;
					system.confirm(this, "Remove","Yakin Data "+item.getCaption()+" akan dihapus?");
				}else if (sender == this.upBtn){
					var item = this.treev.getSelectedItem();
					var owner = item.owner;
					var child, tmp;
					for (var i in owner.childs.objList){
						tmp = system.getResource(owner.childs.objList[i]);
						if (tmp.childIndex == (item.childIndex - 1)) 
							child = tmp;																	
					}
					if (child != undefined)
						this.switchItem(item, child);						
				}else if (sender == this.downBtn){
					var item = this.treev.getSelectedItem();
					var owner = item.owner;
					var child, tmp;
					for (var i in owner.childs.objList)
					{
						tmp = system.getResource(owner.childs.objList[i]);				
						if (tmp.childIndex == (item.childIndex + 1)) 
							child = tmp;																
					}				
					if (child != undefined)
						this.switchItem(item, child);
				}else if (sender == this.leftBtn){
					var item = this.treev.getSelectedItem();
					var owner = item.owner;
					var tmp,child = owner;
					if (child != undefined)
					{	
						if (owner instanceof portalui_treeView) return false;
						this.moveItem(item, owner.owner);
					}
				}else if (sender == this.rightBtn){
					var item = this.treev.getSelectedItem();
					var owner = item.owner;				
					var child = tmp = undefined;
					for (var i in owner.childs.objList)
					{
						tmp = system.getResource(owner.childs.objList[i]);
						if (tmp.childIndex == (item.childIndex - 1)) 
							child = tmp;																	
					}
					if (child != undefined)											
						this.moveItem(item, child);				
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	treeClick : function(item){
		this.entriesClick(this.editBtn);
	},
	getTreeData: function(node){
		var result = "";
		var child = undefined;
		if (node instanceof portalui_treeView)
		{
			for (var i in node.childs.objList)
			{
				child = system.getResource(node.childs.objList[i]);
				if(child != undefined)
					result += this.getTreeData(child);	
				
			}
		}else{
			this.rowIndex++;
			var value = node.data;
			result = "";
			for (var i in value)
			{
				if (i == "rowindex")
					result += ",'" + this.rowIndex +"'";
				else if (i == "level_spasi")
					result += ",'" + (node.getLevel() - 1).toString() +"'";
				else if (i == "kode_induk"){
					if (node.owner instanceof portalui_treeView)
						result += ",'00'";
					else result += ",'" + node.owner.getKode() +"'";
				}else
					result += ",'" + value[i] +"'";
			}	
			result = result.substr(1);
			if (result != "''")
			{			
				result = "#(" + result + ")";
			}else result = "";
			
			if (node.isHasChild())
				for (var i in node.childs.objList)
				{
					child = system.getResource(node.childs.objList[i]);
					if(child != undefined)
						result += this.getTreeData(child);	
				}
		}
		return result;
	},		
	copyChilds : function(from, to){
		var temp = undefined;
		for (var i in from.childs.objList)
		{			
			temp = system.getResource(from.childs.objList[i]);						
			chld = new portalui_treeNode(to);
			chld.setKodeForm(temp.getKodeForm());
			chld.setKode(temp.getKode());
			chld.setCaption(temp.getCaption());
			chld.setShowKode(temp.showKode);												
			chld.data = temp.data;
			chld.data2 = temp.data2;
			chld.data.kode_lok = temp.getKode();					
			chld.data.nama = temp.getCaption();			
			if (temp.childs.getLength() != 0){
				this.copyChilds(temp,chld);
			}
		}
		from.clearChild();
		to.setShowKode(true);
	},
	switchItem : function(from, to){
		var item = from; var child = to;
		var data,  data2,  kdForm, kd,  caption, tmp;
		kdForm = child.getKodeForm();
		kd = child.getKode();
		data = child.data;
		data2 = child.data2;					
		caption = child.getCaption();
		child.setKodeForm(item.getKodeForm());
		child.setKode(item.getKode());
		child.setCaption(item.getCaption());				
		child.setShowKode(true);
		child.data = item.data;
		child.data2 = item.data2;						
		child.data.kode_lok = item.getKode();
		child.data.nama = item.getCaption();		
		item.setKodeForm(kdForm);
		item.setKode(kd);
		item.setCaption(caption);
		item.setShowKode(true);					
		item.data = data;
		item.data2 = data2;
		item.data.kode_lok = kd;
		item.data.nama = caption;		
		item.owner.rearrange();
		child.doSelect();					
		if (item.childs.getLength() != 0){
			tmp = new portalui_treeNode(this.treev);
			this.copyChilds(item, tmp);	
		}				
		if (child.childs.getLength() != 0){
			this.copyChilds(child, item);											
		}
		if (tmp instanceof portalui_treeNode)
		{
			if (tmp.childs.getLength() != 0)
			{
				this.copyChilds(tmp, child);
				this.treev.delItem(tmp);
			}				
		}	
	},
	moveItem: function(item, owner){	
		var child = new portalui_treeNode(owner);
		var tmp="";
		child.setKodeForm(item.getKodeForm());
		child.setKode(item.getKode());
		child.setCaption(item.getCaption());				
		child.setShowKode(item.showKode);
		child.data = item.data;
		child.data2 = item.data2;
		child.data.kode_lok = item.getKode();
		child.data.nama = item.getCaption();		
		if (item.childs.getLength() != 0){
			tmp = new portalui_treeNode(this.treev);
			this.copyChilds(item, tmp);	
		}									
		if (tmp instanceof portalui_treeNode){
			if (tmp.childs.getLength() != 0)
			{
				this.copyChilds(tmp, child);
				this.treev.delItem(tmp);
			}				
		}		
		child.doSelect();
		this.treev.delItem(item);
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_ttg) 
			{
				this.standarLib.showListData(this, "Data Tertanggung",sender,undefined, 
											  "select kode_ttg, nama  from eclaim_ttg where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(kode_ttg) from eclaim_ttg where kode_lokasi = '"+this.app._lokasi+"' ",
											  new Array("kode_ttg","nama"),"where",new Array("Kode Tertanggung","Deskripsi"),false);				
			}
			
		}catch(e){
			system.alert(this,e,"");
		}
	}
});
//------------------------------------- Frame
window.app_eclaimg_master_fFrameAddLks = function(owner, requester){
	if (owner){
		window.app_eclaimg_master_fFrameAddLks.prototype.parent.constructor.call(this, owner);
		this.setHeight(150);
		this.setWidth(400);
		this.className = "app_eclaimg_master_fFrameAddLks";
		this.centerize();		
		this.e0 = new portalui_saiLabelEdit(this,{bound:[20,20,220,20],caption:"Kode Objek"});		
		this.e1 = new portalui_saiLabelEdit(this,{bound:[20,43,350,20],caption:"Nama"});						
		this.e2 = new portalui_saiCB(this,{bound:[20,66,220,20],caption:"Tipe",items:["Header","Posting"]});		
		
		this.b1 = new portalui_imageButton(this,{bound:[20,90,22,22],image:"icon/"+system.getThemes()+"/bOk.png",hint:"Ok",click:"doClick"});
		this.b2 = new portalui_imageButton(this,{bound:[42,90,22,22],image:"icon/"+system.getThemes()+"/bCancel.png",hint:"Cancel",click:"doClick"});				
		system.addMouseListener(this);
		this.formRequester = requester;
	}
};
window.app_eclaimg_master_fFrameAddLks.extend(window.portalui_commonForm);
window.app_eclaimg_master_fFrameAddLks.implement({
	doDraw: function(canvas){
		var n = this.getFullId();
		var html = "<div id='"+n+"_frame' style='{border:1px #ffffff solid;background:url(icon/"+system.getThemes()+"/bg.png) repeat;position: absolute; left: 0; top: 0; width: 100%; height: 100%;}' >" +
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
				"<div id = '"+n+"_header' style='{position:absolute;background:url(icon/"+system.getThemes()+"/formHeader.png) repeat;"+
				"left: 0; top: 0; height: 23; width: 377;cursor:pointer;color:#ffffff}' "+
				"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
				"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
				"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
				" > </div>"+							
				"<div style='{position:absolute;background:url(icon/"+system.getThemes()+"/rBg.png) no-repeat;"+
				"left: 377; top: 0; height: 23; width: 23;cursor:pointer;}' "+
				"onMouseDown='system.getResource("+this.resourceId+").eventMouseDown(event)' "+
				"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
				"onMouseUp='system.getResource("+this.resourceId+").eventMouseUp(event)' "+
				"></div>"+				
				"<div id = '"+n+"_form' style = '{position:absolute;"+
				"left: 20; top: 23; height: 100%; width: 100%;}'"+
				"onMouseMove='system.getResource("+this.resourceId+").eventMouseMove(event)' "+
				"> </div>"+
			"</div>"+
			"<div id='"+n+"_hidden' style='{position: absolute; left: 0; top: 0; width: 100%; height: 100%;border:1px solid #ff9900;display:none;}' "+
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
	},
	doSysMouseMove: function(x, y, button, buttonState){
		window.app_eclaimg_master_fFrameAddLks.prototype.parent.doSysMouseMove.call(this,x, y, button, buttonState);
		if (this.isClick)
		{		
			var newLeft = this.left + (x - this.mouseX);
			var newTop = this.top + (y - this.mouseY);
		
			this.setLeft(newLeft);
			this.setTop(newTop);
		
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
	eventMouseMove: function(event)
	{
		if (this.isClick)
		{
			var x = event.clientX;
			var y = event.clientY;
			var newLeft = this.left + (x - this.mouseX);
			var newTop = this.top + (y - this.mouseY);
		
			this.setLeft(newLeft);
			this.setTop(newTop);
		
			this.mouseX = x;
			this.mouseY = y;
		}
	},
	doClick: function(sender){
		if (sender == this.b1)
			this.modalResult = mrOk;
		else this.modalResult = mrCancel;
		var value = {kode:this.e0.getText(), nama: this.e1.getText(),tipe:this.e2.getText()};		
		this.formRequester.doModalResult(this.event, this.modalResult, value);
		this.close();
	},
	setCaption: function(data){
		var caption = $(this.getFullId() + "_header");
		if (caption != undefined)
			caption.innerHTML = "<div style='{positon:absolute; left: 2; top : 4; background:url(icon/"+system.getThemes()+"/sai.png) no-repeat;width:22;height:16;}'> </div>"+"<span style='{align:center;position:absolute;left:25; top: 4;"+
				"width:100%; height:100%;color:#ffffff; }'>"+data+"</span>";
	},
	doClose: function(sender){
		system.delMouseListener(this);
	},
	setEvent: function(event){
		this.event = event;
		this.e0.clear();this.e1.clear();this.e2.clear();
		if (event == "Edit"){
			this.e0.setReadOnly(true);
		}else this.e0.setReadOnly(false);
	}
});
