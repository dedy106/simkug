/**
 * @author dweexfuad
 */
window.app_assetsap_master_fLokasi = function(owner)
{
	if (owner)
	{
		window.app_assetsap_master_fLokasi.prototype.parent.constructor.call(this, owner);
		this.className = "app_assetsap_master_fLokasi";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Lokasi Asset", 0);	
		
		this.maximize();
		uses("saiCBBL");
		this.elokasi = new saiCBBL(this, {
			bound: [20, 10, 150, 20],
			caption: "Lokasi",
			multiSelection:false,
			readOnly:true,
			text: this.app._lokasi, 
			rightLabelCaption:this.app._namalokasi,
			btnVisible:false			
		});									
		this.btn = new imageButton(this, {
			bound: [167, 10, 22, 22],
			hint: "Reload",
			image: "icon/" + system.getThemes() + "/reload.png",
			click: [this, "doClick"]
		});											
		this.addBtn = new imageButton(this, {
			bound: [27, 11, 22, 22],
			hint: "Item Baru",
			image: "icon/" + system.getThemes() + "/createentries.png",
			click: [this, "entriesClick"]
		});
				
		this.editBtn = new imageButton(this, {
			bound: [47, 11, 22, 22],
			hint: "Edit Item",
			image: "icon/" + system.getThemes() + "/editentries.png",
			click: [this, "entriesClick"]
		});
		
		this.delBtn = new imageButton(this,{
			bound: [67, 11, 22, 22],
			hint: "Hapus Baru",
			image: "icon/" + system.getThemes() + "/delentries.png",
			click: [this, "entriesClick"]
		});		
		
		this.rootBtn = new imageButton(this,{
			bound: [87, 11, 22, 22],
			hint: "Root",
			image: "icon/" + system.getThemes() + "/relakun.png",
			click: [this, "entriesClick"]
		});		
		this.downBtn = new imageButton(this,{
			bound: [107, 11, 22, 22],
			hint: "Geser Bawah",
			image: "icon/" + system.getThemes() + "/down.png",
			click: [this, "entriesClick"]
		});		
		
		this.upBtn = new imageButton(this,{
			bound: [127, 11, 22, 22],
			hint: "Geser Atas",
			image: "icon/" + system.getThemes() + "/up.png",
			click: [this, "entriesClick"]
		});				
		this.leftBtn = new imageButton(this,{
			bound: [147, 11, 22, 22],
			hint: "Geser Kiri",
			image: "icon/" + system.getThemes() + "/bleft.png",
			click: [this, "entriesClick"]
		});		
		this.rightBtn = new imageButton(this,{
			bound: [167, 11, 22, 22],
			hint: "Geser Kanan",
			image: "icon/" + system.getThemes() + "/bright.png",
			click: [this, "entriesClick"]
		});
		
		this.treev = new treeView(this,{
			bound:[20,12,700,this.getHeight() - 130],
			childLength:700,
			dblClick:[this,"treeClick"]
		});		
		
		this.rearrangeChild(10,23);
		this.pAdd = new panel(this,{
			bound:[150,70,400,200],
			caption:"Konfigurasi",
			visible: false
		});				
			
			this.e0 = new saiLabelEdit(this.pAdd,{
				bound:[20,20,150,20],
				caption:"Kode"
			});						
			this.e1 = new saiLabelEdit(this.pAdd,{
				bound:[20,21,300,20],
				caption:"Nama"
			});			
								
			this.e3 = new saiCB(this.pAdd,{
				bound:[20,22,200,20],
				caption:"tipe",
				items:["UBIS","SBIS","AREA"]
			});														
			this.e4 = new saiLabelEdit(this.pAdd,{
				bound:[20,23,300,20],
				caption:"Tempat"
			});
			this.e5 = new saiLabelEdit(this.pAdd,{
				bound:[20,24,300,20],
				caption:"Alamat"
			});	
			this.pAdd.rearrangeChild(20,23);
			this.okBtn = new imageButton(this.pAdd,{
				bound:[20,170,22,22],
				image:"icon/"+system.getThemes()+"/bOk.png",
				hint:"OK",
				click:[this,"entriesClick"]
			});					
			this.cancelBtn = new imageButton(this.pAdd,{
				bound:[40,170,22,22],
				image:"icon/"+system.getThemes()+"/bCancel.png",
				hint:"Cancel",
				click:[this,"entriesClick"]
			});						
		
		this.dblib = new util_dbLib();
		this.dblib.addListener(this);
		
				
		this.standarLib = new util_standar();
		
		setTipeButton(tbSimpan);				
		
		this.rowIndex = -1;
		this.setTabChildIndex();
		this.standarLib.clearByTag(this, new Array("0"), this.e0);
		this.elokasi.setText(this.app._lokasi);		
	}
};
window.app_assetsap_master_fLokasi.extend(window.childForm);
window.app_assetsap_master_fLokasi.implement({
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
		switch (methodName)
			{
				case "listData" : 
					
					this.menuStr = result;
					this.loadMenu();
					break;
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)
						system.info(this,"Transaksi Sukses ("+ this.elokasi.getText()+")","");
					else systemAPI.alert(this,"Transaksi Gagal", result); 
					break;
			}
	},
	doModalResult: function(event, modalResult, value){
		try
		{
			switch (event)
			{
				case "Add" :
				   if ( modalResult == mrOk)
				   {
						try
						{   						
							var node = this.selectedItem;
							var induk = undefined;
							if (node == undefined)
							{
							  node = new treeNode(this.treev);
							  induk = "00000";
							}else{
							  node = new treeNode(this.selectedItem);
							  induk = this.selectedItem.getKode();
							}						
							node.setKode(this.e0.getText());
							node.setCaption(this.e1.getText());	
							node.setShowKode(false);
							var lvl = node.getLevel() - 1;
							uses("arrayMap");
							var data = new arrayMap();						
							data.set("kode_lokfa",this.e0.getText());						
							data.set("nama",this.e1.getText());		
							data.set("kode_lokasi",this.elokasi.getText());														
							data.set("tipe",this.e3.getText());
							data.set("tempat",this.e4.getText());
							data.set("alamat",this.e5.getText());
							data.set("rowindex",0);		
							data.set("kode_induk",induk);								
							data.set("level_spasi",lvl);																								
							node.data = data;
						}catch(e)
						{
							systemAPI.alert(e);
						}
					}
					break;
				case "Edit" :
					if (modalResult == mrOk)
					{
						var item = this.selectedItem;					
						item.setKode(this.e0.getText());
						item.setCaption(this.e1.getText());
						item.setShowKode(true);
						var data = item.data;
						data.set("kode_lokfa",this.e0.getText());
						data.set("kode_lokasi",this.elokasi.getText());								
						data.set("nama",this.e1.getText());					
						
						data.set("tipe",this.e3.getText());
						data.set("tempat",this.e4.getText());	
						data.set("alamat",this.e5.getText());												
						data.set("rowindex",0);
						item.data = data;
					}
					break;
				case "Remove" :
					if (modalResult == mrOk)			
						 this.treev.delItem(this.selectedItem);
					break;
				case "clear" :
					if (modalResult == mrOk)
						this.e0.clear();				
					break;
				case "simpan" :
					if (modalResult == mrOk)
					{
						this.rowIndex = -1;
						var value = this.getTreeData(this.treev);
						value = value.substr(1);						
						try
						{						
							var sql2,sql1 = "delete from amu_lokasi where kode_lokasi = '"+this.elokasi.getText()+"'";					// kode_lokasi,						
							var sql = new server_util_arrayList();
							sql.add(sql1);
							var data = value.split("#");
							for (var i in data){
								sql2 = "insert into amu_lokasi(kode_lokfa, nama, kode_lokasi,tipe, tempat, alamat,rowindex, kode_induk, level_spasi,  nik_user, tgl_input) values ";
								sql2 += data[i];
								sql.add(sql2);
							}							
							this.dblib.execArraySQL(sql);	
						}
						catch(e)
						{
							system.alert(e);
						}		
					}
					break;
				
			}
		}catch(e){
			systemAPI.alert("[fNeraca]::doModalResult:"+e);
		}
	},
	loadMenu: function(daftarNrc){
		try
		{
			var menu = daftarNrc;//strToArray(this.menuStr);
			var rowNo = 0;		
			var itemValues = undefined;
			if (this.treev != undefined)
				this.treev.clear();
				
			var kode = undefined;
			var nama = undefined;
			//var levelLap = undefined;
			var level = undefined;
			var item = undefined;
			var node = undefined;
			
			//while (rowNo < menu.getLength())
			for (var r in menu.objList)
			{
				itemValues = menu.objList[r];			
				kode = itemValues.get("kode_lokfa");							
				if (kode != "")
				{
					nama = itemValues.objList["nama"];
				
					level = itemValues.objList["level_spasi"];								
					level++;
					if (node == undefined)
						node = new treeNode(this.treev);
					else if ((node instanceof treeNode) && (node.getLevel() == level - 1))
						node = new treeNode(node);
					else if ((node instanceof treeNode) && (node.getLevel() == level))
						node = new treeNode(node.owner);
					else if ((node instanceof treeNode) && (node.getLevel() > level))
					{	
						if (!(node.owner instanceof treeView))
						{
							node = node.owner;
							while (node.getLevel() > level)
							{
								if (node.owner instanceof treeNode)
									node = node.owner;
							}
						}	
						node = new treeNode(node.owner);				
					}		
					node.setKodeForm(level);
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
		var nrc = this.dblib.runSQL("select kode_lokfa, nama, kode_lokasi,tipe,tempat,alamat,rowindex, kode_induk, level_spasi from amu_lokasi where  kode_lokasi = '"+this.elokasi.getText()+"' order by rowindex",0,0);	
		this.loadMenu(nrc);
	},
	entriesClick: function(sender){
		try
		{ 
		 	if (sender == this.okBtn)
			{					
				this.doModalResult(this.EditStatus,mrOk);
				this.pAdd.hide();
			}else if (sender == this.cancelBtn)
			{
				this.pAdd.hide();
			}else if (sender == this.relBtn)
			{
				this.selectedItem = undefined;
			}else
			{			
				var result = this.getSummary(this.treev);
				result = result.substr(1);
				var resArray = result.split(";");
				this.setSummaryItems(resArray);
				
				if (sender == this.addBtn)
				{
					var item = this.treev.getSelectedItem();
					if (item != undefined)
					{
						this.selectedItem = item;		
						this.pAdd.setCaption(item.getCaption());					
					}else
					{
						this.selectedItem = undefined;		
						this.pAdd.setCaption("Create Entries");			
					}
					this.e0.setReadOnly(false);
					this.e0.setText("");this.e1.setText("");this.e3.setText("");					
					this.EditStatus = "Add";
					this.pAdd.show();
				}else if (sender == this.editBtn)
				{
					var item = this.treev.getSelectedItem();
					this.selectedItem = item;				
					this.pAdd.setCaption(item.getCaption());
					this.e0.setText(item.getKode());				
					this.e0.setReadOnly(true);
					this.e1.setText(trim(item.getCaption()));
					this.e3.setText(item.data.get("tipe"));								
					this.EditStatus = "Edit";
					this.pAdd.show();
				}else if (sender == this.delBtn)	
				{
					var item = this.treev.getSelectedItem();	
					this.selectedItem = item;
					system.confirm(this, "Remove","Yakin Lokasi "+item.getCaption()+" akan dihapus?");
				}else if (sender == this.rootBtn)	
				{
					this.treev.doSelectItem(undefined);	
					this.selectedItem = undefined;				
				}else if (sender == this.upBtn){
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
						this.switchItem(item, child);							
				}else if (sender == this.downBtn){
					var item = this.treev.getSelectedItem();
					var owner = item.owner;
					var child = tmp = undefined;
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
						if (owner instanceof treeView) return false;
						this.moveItem(item, owner.owner);
					}
				}else if (sender == this.rightBtn){
					var item = this.treev.getSelectedItem();
					var owner = item.owner;				
					var child = tmp = undefined;
					for (var i in owner.childs.objList)
					{
						tmp = system.getResource(owner.childs.objList[i]);
						if (tmp instanceof treeNode && tmp.childIndex == (item.childIndex - 1)) 
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
	treeClick: function(item){
	},
	getTreeData: function(node){
		var result = "";
		var child = undefined;
		if (node instanceof treeView)
		{
			for (var i in node.childs.objList)
			{
				child = system.getResource(node.childs.objList[i]);
				
				if(child != undefined)
					result += this.getTreeData(child);	
				
			}
		}else
		{
			this.rowIndex++;
			var value = node.data;
			result = "";
			for (var i in value.objList)
			{
				if (i == "rowindex")
					result += ",'" + this.rowIndex +"'";
				else if (i == "level_spasi")
					result += ",'" + (node.getLevel() - 1).toString() +"'";
				else if (i == "kode_induk"){
					if (node.owner instanceof treeView)
						result += ",'00'";
					else result += ",'" + node.owner.getKode() +"'";
				}else
					result += ",'" + value.get(i) +"'";
			}	
			result += ",'"+this.app._userLog+"',now()";
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
	getSummary: function(node){
		var result = "";
		var child = undefined;
		if (node instanceof treeView)
		{
			for (var i in node.childs.objList)
			{
				child = system.getResource(node.childs.objList[i]);
				
				if(child != undefined)
					result += this.getSummary(child);	
				
			}
		}else
		{
			this.rowIndex++;
			var value = node.data;
			result = value.objList[4];
			if (result != "Summary")
				result = "";
			else result = ";" + value.objList[0];
			
			if (node.isHasChild())
				for (var i in node.childs.objList)
				{
					child = system.getResource(node.childs.objList[i]);
					if(child != undefined)
						result += this.getSummary(child);	
				}
			
		}
		return result;	
	},
	doFindLokasi: function(sender){
		if (this.app._userStatus =="A")
			this.standarLib.showListDataFromItems(this, "Data Lokasi",this.elokasi, 
												  "select kode_lokasi, nama from lokasi","select count(*) from lokasi",
											  new Array("lokasi","nama"),"where");
		
	},
	setSummaryItems: function(data){
		
	},
	copyChilds: function(from, to){
		var temp = undefined;
		for (var i in from.childs.objList)
		{			
			temp = system.getResource(from.childs.objList[i]);						
			chld = new treeNode(to);
			chld.setKodeForm(temp.getKodeForm());
			chld.setKode(temp.getKode());
			chld.setCaption(temp.getCaption());
			chld.setShowKode(temp.showKode);												
			chld.data = temp.data;
			chld.data2 = temp.data2;
			chld.data.set("kode_lokfa",temp.getKode());					
			chld.data.set("nama",temp.getCaption());
		
			if (temp.childs.getLength() != 0)
			{
				this.copyChilds(temp,chld);
			}
		}
		from.clearChild();
		to.setShowKode(true);
	},
	switchItem: function(from, to){
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
		child.data.set("kode_lokfa",item.getKode());					
		child.data.set("nama",item.getCaption());
		
		item.setKodeForm(kdForm);
		item.setKode(kd);
		item.setCaption(caption);
		item.setShowKode(true);					
		item.data = data;
		item.data2 = data2;
		item.data.set("kode_lokfa",kd);					
		item.data.set("nama",caption);
		
		item.owner.rearrange();
		child.doSelect();					
		if (item.childs.getLength() != 0)
		{
			tmp = new treeNode(this.treev);
			this.copyChilds(item, tmp);	
		}				
		if (child.childs.getLength() != 0)
			this.copyChilds(child, item);													
		if (tmp instanceof treeNode)
		{
			if (tmp.childs.getLength() != 0)
			{
				this.copyChilds(tmp, child);
				this.treev.delItem(tmp);
			}				
		}	
	},
	moveItem: function(item, owner){
		try {
			var tmp,child = new treeNode(owner);
			child.setKodeForm(item.getKodeForm());
			child.setKode(item.getKode());
			child.setCaption(item.getCaption());
			child.setShowKode(item.showKode);
			child.data = item.data;
			child.data2 = item.data2;
			child.data.set("kode_lokfa", item.getKode());
			child.data.set("nama", item.getCaption());
			
			if (item.childs.getLength() != 0) {
				tmp = new treeNode(this.treev);
				this.copyChilds(item, tmp);
			}			
			if (tmp instanceof treeNode) {
				if (tmp.childs.getLength() != 0) {
					this.copyChilds(tmp, child);
					this.treev.delItem(tmp);
				}
			}
			child.doSelect();
			this.treev.delItem(item);
		}catch(e){
			alert(e);
		}
	}
});
