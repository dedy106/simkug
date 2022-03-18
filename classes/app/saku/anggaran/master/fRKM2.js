window.app_saku_anggaran_master_fRKM2 = function(owner)
{
	if (owner)
	{
		window.app_saku_anggaran_master_fRKM2.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku_anggaran_master_fRKM2";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Setting Versi RKM", 0);	
		this.maximize();
		
		uses("portalui_saiCBBL;portalui_imageButton");
		this.elokasi = new portalui_saiCBBL(this,{bound:[20,20,150,20],caption:"Lokasi", multiSelection:false,change:[this,"doEditChange"]});		
		this.eKlp = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Versi DRK", multiSelection:false,change:[this,"doEditChange"]});										
		this.eThn = new portalui_saiLabelEdit(this,{bound:[20,22,200,20],caption:"Tahun",tipeText:ttAngka});		
		this.btn = new portalui_imageButton(this,{bound:[220,22,22,22], hint:"Reload",image:"icon/"+system.getThemes()+"/reload.png", click:[this,"doClick"]});
		this.addBtn = new portalui_imageButton(this,{bound:[27,23,22,22],chint:"Tambah Item",image:"icon/"+system.getThemes()+"/createentries.png",click:[this,"entriesClick"]});				
		this.editBtn = new portalui_imageButton(this,{bound:[47,23,22,22],chint:"Edit Item",image:"icon/"+system.getThemes()+"/editentries.png",click:[this,"entriesClick"]});		
		this.delBtn = new portalui_imageButton(this,{bound:[67,23,22,22],chint:"Hapus Item",image:"icon/"+system.getThemes()+"/delentries.png",click:[this,"entriesClick"]});		
		this.relBtn = new portalui_imageButton(this,{bound:[87,23,22,22],chint:"Deselect",image:"icon/"+system.getThemes()+"/relakun.png",click:[this,"entriesClick"]});		
		this.downBtn = new portalui_imageButton(this,{bound:[107,23,22,22],chint:"Geser Bawah",image:"icon/"+system.getThemes()+"/down.png",click:[this,"entriesClick"]});		
		this.upBtn = new portalui_imageButton(this,{bound:[127,23,22,22],chint:"Geser Atas",image:"icon/"+system.getThemes()+"/up.png",click:[this,"entriesClick"]});		
		this.leftBtn = new portalui_imageButton(this,{bound:[147,23,22,22],chint:"Geser Kiri",image:"icon/"+system.getThemes()+"/bleft.png",click:[this,"entriesClick"]});		
		this.rightBtn = new portalui_imageButton(this,{bound:[167,23,22,22],chint:"Geser Kanan",image:"icon/"+system.getThemes()+"/bright.png",click:[this,"entriesClick"]});
		this.treev = new portalui_treeView(this,{bound:[20,23,700,this.getHeight() - 155],dblClick:[this,"treeClick"]});		
		this.treev.childLength = 700;				
		
		this.dblib = new util_dbLib();
		this.dblib.addListener(this);
		this.menuStr = "";
		
		this.rearrangeChild(10,23);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);				
		this.rowIndex = -1;
		this.setTabChildIndex();
		this.standarLib.clearByTag(this, new Array("0"), this.eKlp);
		this.elokasi.setText(this.app._lokasi);
		var lokasi = (this.app._userStatus == "A" ? "%" : this.app._lokasi);				
		this.elokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi like '"+lokasi+"' ",["kode_lokasi","nama"],undefined,["Kode","Nama"],"and","Data Lokasi");
		this.eKlp.setSQL("select kode_fsrkm, nama from fsrkm where kode_lokasi = '"+this.app._lokasi+"' ",["kode_fsrkm","nama"],undefined,["Kode FS","Nama"],"and","Data RKM");	
	}
};
window.app_saku_anggaran_master_fRKM2.extend(window.portalui_childForm);
window.app_saku_anggaran_master_fRKM2.implement({
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
	doRequestReady : function(sender, methodName, result){
		try{			
			switch (methodName)
			{				
				case "getDataProvider" : 				
					eval("result = "+result+";");
					this.loadMenu(result);
				break;
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eKlp.getText()+")");
					else this.app._mainForm.pesan(0, result); 
				break;
			}
		}catch(e){
			alert(e);
		}
	},
	doModalResult : function(event, modalResult, value){
		try
		{
			switch (event)
			{
				case "relakun":
					if (modalResult == mrOk)
					{
						uses("portalui_arrayMap");
						var data = new portalui_arrayMap();
						for (var i in value.objList)
						{
							data.set(i, value[i]);
						}
						var node = this.selectedItem;
						node.data2 = data;
					}
					break;
				case "Add" :
				   if ( modalResult == mrOk)
				   {
						try
						{   
							var valArray = value.split(";");
							var node = this.selectedItem;
							var induk = undefined;
							if (node == undefined)
							{
							  node = new portalui_treeNode(this.treev);
							  induk = "00000";
							}else
							{
							  node = new portalui_treeNode(this.selectedItem);
							  induk = this.selectedItem.getKode();
							}
							node.setKode(valArray[0]);
							node.setCaption(valArray[1]);	
							node.setKodeForm(valArray[2]);
							node.setShowKode(true);
							var lvl = node.getLevel() - 1;
							uses("portalui_arrayMap");
							var data = {};
							data.kode_drk = valArray[0];
							data.kode_fsrkm = this.eKlp.getText();	
							data.nama = valArray[1];
							data.level_spasi = lvl;
							data.level_lap = valArray[2];
							data.tipe = valArray[3];
							data.sum_header = valArray[4];	
							data.jenis_akun = valArray[5];	
							data.kode_induk = induk;
							data.rowindex = induk;
							data.modul = "-";
							data.tgl_input = (new Date).getDateStr();
							data.nik_user = this.app._userLog;
							data.kode_lokasi = this.elokasi.getText();	
							data.tahun = this.eThn.getText();	
							data.block = "0";
							node.data = data;
						}catch(e)
						{
							alert(e);
						}
					}
					break;
				case "Edit" :
					if (modalResult == mrOk)
					{
						var item = this.selectedItem;
						var valArray = value.split(";");
						item.setKode(valArray[0]);
						item.setCaption(valArray[1]);
						item.setKodeForm(valArray[2]);
						item.setShowKode(true);
						var data = item.data;
						data.kode_drk = valArray[0];
						data.nama = valArray[1];					
						data.level_lap = valArray[2];
						data.tipe = valArray[3];
						data.sum_header = valArray[4];	
						data.jenis_akun = valArray[5];								
						item.data = data;
					}
					break;
				case "Remove" :
					if (modalResult == mrOk)			
						 this.treev.delItem(this.selectedItem);
					break;
				case "clear" :
					if (modalResult == mrOk)
					{
						this.standarLib.clearByTag(this,[0,1,2], this.eKlp);
						this.elokasi.setText(this.app._lokasi);
					}
					break;
				case "simpan" :
					if (modalResult == mrOk)
					{
						this.rowIndex = -1;
						var value = this.getTreeData(this.treev);
						value = value.substr(1);
						try
						{
							var sql1 = "delete from drk where kode_fsrkm = '"+this.eKlp.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' and tahun ="+this.eThn.getText()+"";
							var sql2, sql = new server_util_arrayList();
							sql.add(sql1);						
							//if mysql langsung
							var driver = this.app._dbname.split("-");
							driver = driver[1];
							if (driver.search("mssql") != -1){
								var data = value.split("#");
								for (var i in data){
									sql2 = "insert into drk(kode_drk, kode_fsrkm, nama, level_spasi, level_lap, tipe, sum_header, jenis_akun, kode_induk, rowindex, modul, tgl_input, nik_user, kode_lokasi, tahun,block) values ";
									sql2 += " "+ data[i] +" ";
									sql.add(sql2);
								}																		
							}else if (driver.search("mysql") != -1){
								var data = value.replace(/#/g,",");													
								sql2 = "insert into drk(kode_drk, kode_fsrkm, nama, level_spasi, level_lap, tipe, sum_header, jenis_akun, kode_induk, rowindex, modul, tgl_input, nik_user, kode_lokasi, tahun, block) values ";
								sql2 += " "+ data +" ";
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
		}catch(e)
		{
			alert("[fNeraca]::doModalResult:"+e);
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
			var levelLap = undefined;
			var level = undefined;
			var item = undefined;
			var node = undefined;
			
			//while (rowNo < menu.getLength())			
			for (var r in menu.rs.rows)
			{
				itemValues = menu.rs.rows[r];			
				kode = itemValues.kode_drk;				
				if (kode != "")
				{
					nama = itemValues.nama;
					levelLap = itemValues.level_lap;
					level = itemValues.level_spasi;								
					level++;
					if (node == undefined)
					{
						node = new portalui_treeNode(this.treev);
					}else if ((node instanceof portalui_treeNode) && (node.getLevel() == level - 1))
					{
						node = new portalui_treeNode(node);
					}else if ((node instanceof portalui_treeNode) && (node.getLevel() == level))
					{	
						node = new portalui_treeNode(node.owner);
					}else if ((node instanceof portalui_treeNode) && (node.getLevel() > level))
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
		}catch(e)
		{
			alert("row "+ rowNo +" : "+e);
		}
	},
	doClick: function(sender){
		this.dblib.getDataProviderA("select kode_drk, kode_fsrkm, nama, level_spasi, level_lap, tipe, sum_header, jenis_akun, kode_induk, rowindex, modul, tgl_input, nik_user, kode_lokasi, tahun, block from drk where kode_fsrkm = '"+this.eKlp.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' and tahun = "+this.eThn.getText()+" order by rowindex",0,0);					
	},
	entriesClick: function(sender){
		try
		{ 
			if (sender == this.relBtn)
			{
				this.treev.doSelectedItem(undefined);	
				this.selectedItem = undefined;
			}else
			{
				if (sender == this.addBtn || sender == this.editBtn){
					uses("app_saku_anggaran_master_fRKMDetail");
					if (this.entryMenu == undefined)
						this.entryMenu = new app_saku_anggaran_master_fRKMDetail(this.app);
					this.entryMenu.setTop(20);
					this.entryMenu.setHeight(300);
					this.entryMenu.setWidth(400);
					this.entryMenu.doAfterResize(this.entryMenu.width, this.entryMenu.height);
					
					var result = this.getSummary(this.treev);
					result = result.substr(1);
					var resArray = result.split(";");
					this.entryMenu.setSummaryItems(resArray);
				}
				if (sender == this.addBtn)
				{
					var item = this.treev.getSelectedItem();
					if (item != undefined)
					{
						this.selectedItem = item;		
						this.entryMenu.setCaption(item.getCaption());
						this.entryMenu.setItemParent(item);
					}else
					{
						this.selectedItem = undefined;		
						this.entryMenu.setCaption("Create Entries");			
					}
					this.entryMenu.event = "Add";
					this.entryMenu.formRequester = this;
					this.entryMenu.e0.setReadOnly(false);
					this.entryMenu.e0.setText("");
					this.entryMenu.e1.setText("");
					this.entryMenu.showModal();		
				}else if (sender == this.editBtn)
				{
					var item = this.treev.getSelectedItem();
					this.selectedItem = item;
					this.entryMenu.event = "Edit";
					this.entryMenu.formRequester = this;
					this.entryMenu.setCaption(item.getCaption());
					this.entryMenu.setItemParent(item);
					this.entryMenu.e0.setText(item.getKode());
					this.entryMenu.e0.setReadOnly(true);
					this.entryMenu.e1.setText(trim(item.getCaption()));
					this.entryMenu.e2.setText(item.getKodeForm());
					this.entryMenu.e3.setText(item.data.tipe);
					this.entryMenu.e4.setText(item.data.sum_header);
					this.entryMenu.e5.setText(item.data.jenis_akun);
					this.entryMenu.showModal();		
				}else if (sender == this.delBtn)	
				{
					var item = this.treev.getSelectedItem();	
					this.selectedItem = item;
					system.confirm(this, "Remove","Yakin menu "+item.getCaption()+" akan dihapus?");
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
					{					
						this.switchItem(item, child);		
					}
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
					if (child != undefined){
						this.switchItem(item, child);
					}
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
					{																	
						this.moveItem(item, child);
					}
				}
			}
		}catch(e)
		{
			alert(e);
		}
	},
	treeClick: function(item){},
	getTreeData : function(node){
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
		}else
		{
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
				result = ",(" + result + ")";
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
		if (node instanceof portalui_treeView)
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
			result = value.tipe;
			if (result != "Summary")
				result = "";
			else result = ";" + value.kode_dr;
			
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
	copyChilds: function(from, to){
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
			chld.data.kode_drk = temp.getKode();
			chld.data.nama = temp.getCaption();
			chld.data.level_lap = temp.getKodeForm();		
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
		var data =  data2 =  kdForm = kd =  caption = tmp = undefined;
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
		child.data.kode_drk = item.getKode();
		child.data.nama = item.getCaption();
		child.data.level_lap = item.getKodeForm();
		item.setKodeForm(kdForm);
		item.setKode(kd);
		item.setCaption(caption);
		item.setShowKode(true);					
		item.data = data;
		item.data2 = data2;
		item.data.kode_drk = kd;					
		item.data.nama = caption;
		item.data.level_lap = kdForm;
		item.owner.rearrange();
		child.doSelect();					
		if (item.childs.getLength() != 0)
		{
			tmp = new portalui_treeNode(this.treev);
			this.copyChilds(item, tmp);	
		}				
		if (child.childs.getLength() != 0)
		{
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
		child.setKodeForm(item.getKodeForm());
		child.setKode(item.getKode());
		child.setCaption(item.getCaption());				
		child.setShowKode(item.showKode);
		child.data = item.data;
		child.data2 = item.data2;
		child.data.kode_drk = item.getKode();
		child.data.nama = item.getCaption();
		child.data.level_lap = item.getKodeForm();
		if (item.childs.getLength() != 0)
		{
			tmp = new portalui_treeNode(this.treev);
			this.copyChilds(item, tmp);	
		}									
		if (tmp instanceof portalui_treeNode)
		{
			if (tmp.childs.getLength() != 0)
			{
				this.copyChilds(tmp, child);
				this.treev.delItem(tmp);
			}				
		}		
		child.doSelect();
		this.treev.delItem(item);
	},
	doEditChange: function(sender){		
		if (sender ==this.elokasi){
			this.eKlp.setSQL("select kode_fsrkm, nama from fsrkm where kode_lokasi = '"+this.elokasi.getText()+"' ",["kode_fsrkm","nama"],undefined,["Kode FS","Nama"],"and","Data RKM");			
		}
		if (sender == this.eKlp) {
			
		}
	}
});