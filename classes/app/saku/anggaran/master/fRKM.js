window.app_saku_anggaran_master_fRKM = function(owner)
{
	if (owner)
	{
		window.app_saku_anggaran_master_fRKM.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku_anggaran_master_fRKM";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Setting Versi RKM", 0);	
		this.maximize();
		
		uses("portalui_saiCBBL");
		this.elokasi = new portalui_saiCBBL(this);
		this.elokasi.setTop(25);
		this.elokasi.setLeft(20);
		this.elokasi.setWidth(150);
		this.elokasi.setCaption("Lokasi");
		this.elokasi.onBtnClick.set(this, "doFindLokasi");
		
		this.eKlp = new portalui_saiCBBL(this);
		this.eKlp.setTop(47);
		this.eKlp.setLeft(20);
		this.eKlp.setWidth(200);
		this.eKlp.setCaption("Versi DRK");
		this.eKlp.onBtnClick.set(this, "doFindKlp");
		
		uses("portalui_saiCB");
		this.e0 = new portalui_saiCB(this);
		this.e0.setLeft(20);
		this.e0.setTop(69);
		this.e0.setWidth(200);
		this.e0.setCaption("Modul");
		this.e0.addItem(0, "INVESTASI");
		this.e0.addItem(1, "PENDAPATAN");
		this.e0.addItem(2, "BEBAN");		
		
		uses("portalui_imageButton");
		this.btn = new portalui_imageButton(this);
		this.btn.setLeft(220);
		this.btn.setTop(91);
		this.btn.setHeight(22);
		this.btn.setWidth(22);
		this.btn.setHint("Reload");
		this.btn.setImage("icon/"+system.getThemes()+"/reload.png");
		this.btn.onClick.set(this, "doClick");
		
		this.eThn = new portalui_saiLabelEdit(this);
		this.eThn.setTop(91);
		this.eThn.setLeft(20);
		this.eThn.setWidth(200);
		this.eThn.setTipeText(ttAngka);
		this.eThn.setCaption("Tahun");
		
		this.treev = new portalui_treeView(this);
		this.treev.setTop(140);
		this.treev.setLeft(20);
		this.treev.setWidth(700);
		this.treev.setHeight(this.getHeight() - 155);
		this.treev.childLength = 700;
		this.treev.onDblClick.set(this, "treeClick");				
		
		this.addBtn = new portalui_imageButton(this);
		this.addBtn.setTop(115);
		this.addBtn.setLeft(27);
		this.addBtn.setWidth(22);
		this.addBtn.setHeight(22);
		this.addBtn.setImage("icon/"+system.getThemes()+"/createentries.png");
		this.addBtn.setHint("Buat Item");
		this.addBtn.onClick.set(this,"entriesClick");
		
		this.editBtn = new portalui_imageButton(this);
		this.editBtn.setTop(115);
		this.editBtn.setLeft(47);
		this.editBtn.setWidth(22);
		this.editBtn.setHeight(22);
		this.editBtn.setImage("icon/"+system.getThemes()+"/editentries.png");
		this.editBtn.setHint("Edit Item");
		this.editBtn.onClick.set(this,"entriesClick");
		
		this.delBtn = new portalui_imageButton(this);
		this.delBtn.setTop(115);
		this.delBtn.setLeft(67);
		this.delBtn.setWidth(22);
		this.delBtn.setHeight(22);
		this.delBtn.setImage("icon/"+system.getThemes()+"/delentries.png");
		this.delBtn.setHint("Hapus item");
		this.delBtn.onClick.set(this,"entriesClick");
		
		this.relBtn = new portalui_imageButton(this);
		this.relBtn.setTop(115);
		this.relBtn.setLeft(87);
		this.relBtn.setWidth(22);
		this.relBtn.setHeight(22);
		this.relBtn.setImage("icon/"+system.getThemes()+"/relakun.png");
		this.relBtn.setHint("Tidak ada yang dipilih");
		this.relBtn.onClick.set(this,"entriesClick");
		
		this.downBtn = new portalui_imageButton(this);
		this.downBtn.setTop(115);
		this.downBtn.setLeft(107);
		this.downBtn.setWidth(22);
		this.downBtn.setHeight(22);
		this.downBtn.setImage("icon/"+system.getThemes()+"/down.png");
		this.downBtn.setHint("Geser ke bawah");
		this.downBtn.onClick.set(this,"entriesClick");
		
		this.upBtn = new portalui_imageButton(this);
		this.upBtn.setTop(115);
		this.upBtn.setLeft(127);
		this.upBtn.setWidth(22);
		this.upBtn.setHeight(22);
		this.upBtn.setImage("icon/"+system.getThemes()+"/up.png");
		this.upBtn.setHint("Geser ke atas");
		this.upBtn.onClick.set(this,"entriesClick");
		
		this.leftBtn = new portalui_imageButton(this);
		this.leftBtn.setTop(115);
		this.leftBtn.setLeft(147);
		this.leftBtn.setWidth(22);
		this.leftBtn.setHeight(22);
		this.leftBtn.setImage("icon/"+system.getThemes()+"/bleft.png");
		this.leftBtn.setHint("Geser ke kiri");
		this.leftBtn.onClick.set(this,"entriesClick");
		
		this.rightBtn = new portalui_imageButton(this);
		this.rightBtn.setTop(115);
		this.rightBtn.setLeft(167);
		this.rightBtn.setWidth(22);
		this.rightBtn.setHeight(22);
		this.rightBtn.setImage("icon/"+system.getThemes()+"/bright.png");
		this.rightBtn.setHint("Geser ke kanan");
		this.rightBtn.onClick.set(this,"entriesClick");
		
		this.dblib = new util_dbLib();
		this.dblib.addListener(this);
		this.menuStr = "";
		
		uses("util_standar");
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);				
		this.rowIndex = -1;
		this.setTabChildIndex();
		this.standarLib.clearByTag(this, new Array("0"), this.e0);
	}
};
window.app_saku_anggaran_master_fRKM.extend(window.portalui_childForm);
window.app_saku_anggaran_master_fRKM.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","");
	}
};
window.app_saku_anggaran_master_fRKM.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "listData" : 
			
			this.menuStr = result;
			this.loadMenu();
		break;
		case "execArraySQL" :
			if (result.toLowerCase().search("error") == -1)
				this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
			else this.app._mainForm.pesan(0, result); 
		break;
	}
};
window.app_saku_anggaran_master_fRKM.prototype.doModalResult = function(event, modalResult, value)
{
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
						var data = new portalui_arrayMap();
						data.set("kode_drk",valArray[0]);
						data.set("kode_fsrkm",this.eKlp.getText());	
						data.set("nama",valArray[1]);
						data.set("level_spasi",lvl);
						data.set("level_lap",valArray[2]);
						data.set("tipe",valArray[3]);
						data.set("sum_header",valArray[4]);	
						data.set("jenis_akun",valArray[5]);	
						data.set("kode_induk",induk);							
						data.set("rowindex",induk);		
						data.set("modul",this.e0.getText().substr(0,1));								
						data.set("tgl_input",(new Date).getDateStr());
						data.set("nik_user",this.app._userLog);
						data.set("kode_lokasi",this.elokasi.getText());	
						data.set("tahun",this.eThn.getText());	
						data.set("block","0");
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
					data.set("kode_drk",valArray[0]);					
					data.set("nama",valArray[1]);					
					data.set("level_lap",valArray[2]);
					data.set("tipe",valArray[3]);
					data.set("sum_header",valArray[4]);	
					data.set("jenis_akun",valArray[5]);								
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
					this.e0.clear();
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
						var modul = this.e0.getText().substr(0,1);//and kode_lokasi = '"+this.app._lokasi+"'
						var sql1 = "delete from drk where modul = '"+modul+"'  and kode_fsrkm = '"+this.eKlp.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' and tahun ="+this.eThn.getText()+"";					// kode_lokasi,
						var sql2, sql = new server_util_arrayList();
						sql.add(sql1);						
						//if mysql langsung
							var data = value.split("#");
							for (var i in data){
								sql2 = "insert into drk(kode_drk, kode_fsrkm, nama, level_spasi, level_lap, tipe, sum_header, jenis_akun, kode_induk, rowindex, modul, tgl_input, nik_user, kode_lokasi, tahun,block) values ";
								sql2 += " "+ data[i] +" ";								
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
};
window.app_saku_anggaran_master_fRKM.prototype.loadMenu = function(daftarNrc)
{
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
		for (var r in menu.objList)
		{
			itemValues = menu.objList[r];			
			kode = itemValues.get("kode_drk");							
			if (kode != "")
			{
				nama = itemValues.objList["nama"];
				levelLap = itemValues.objList["level_lap"];
				level = itemValues.objList["level_spasi"];								
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
};
window.app_saku_anggaran_master_fRKM.prototype.doClick = function(sender)
{
	if (this.e0.getText() != "")
	{
		var modul = this.e0.getText();
		modul = modul.substr(0,1);//and kode_lokasi = '"+this.elokasi.getText()+"'  
		var nrc = this.dblib.runSQL("select kode_drk, kode_fsrkm, nama, level_spasi, level_lap, tipe, sum_header, jenis_akun, kode_induk, rowindex, modul, tgl_input, nik_user, kode_lokasi, tahun, block from drk where modul = '"+modul+"' and kode_fsrkm = '"+this.eKlp.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' and tahun = "+this.eThn.getText()+" order by rowindex",0,0);
		this.loadMenu(nrc);
	}	
};
window.app_saku_anggaran_master_fRKM.prototype.entriesClick = function(sender)
{
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
				this.entryMenu.e3.setText(item.data.get("tipe"));
				this.entryMenu.e4.setText(item.data.get("sum_header"));
				this.entryMenu.e5.setText(item.data.get("jenis_akun"));
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
};
window.app_saku_anggaran_master_fRKM.prototype.treeClick = function(item)
{
};
window.app_saku_anggaran_master_fRKM.prototype.getTreeData = function(node)
{
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
		for (var i in value.objList)
		{
			if (i == "rowindex")
				result += ",'" + this.rowIndex +"'";
			else if (i == "level_spasi")
				result += ",'" + (node.getLevel() - 1) +"'";
			else if (i == "kode_induk"){
				if (node.owner instanceof portalui_treeView)
					result += ",'00'";
				else result += ",'" + node.owner.getKode() +"'";
			}else
				result += ",'" + value.get(i) +"'";
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
};
window.app_saku_anggaran_master_fRKM.prototype.getSummary = function(node)
{
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
		result = value.get("tipe");
		if (result != "Summary")
			result = "";
		else result = ";" + value.get("kode_drk");
		
		if (node.isHasChild())
			for (var i in node.childs.objList)
			{
				child = system.getResource(node.childs.objList[i]);
				if(child != undefined)
					result += this.getSummary(child);
			}
	}
	return result;
};
window.app_saku_anggaran_master_fRKM.prototype.doFindLokasi = function(sender)
{
	var lokasi = this.app._lokasi;
	if (this.app._userStatus =="A")
		lokasi = "%";
	this.standarLib.showListDataFromItems(this, "Data Lokasi",this.elokasi, 
								"select kode_lokasi, nama from lokasi where kode_lokasi like '"+lokasi+"' ",
								"select count(*) from lokasi where kode_lokasi like '"+lokasi+"'",
								["kode_lokasi","nama"],"and",["Kode","Nama"]);
};
window.app_saku_anggaran_master_fRKM.prototype.doFindKlp = function(sender)
{
	this.standarLib.showListDataFromItems(this, "Data Versi RKM",this.eKlp, 
									"select kode_fsrkm, nama from fsrkm where kode_lokasi = '"+this.elokasi.getText()+"' ",
									"select count(*) from fsrkm where kode_lokasi = '"+this.elokasi.getText()+"' ",
									["kode_fsrkm","nama"],"and",["Kode","Nama"]);
};
window.app_saku_anggaran_master_fRKM.prototype.copyChilds = function(from, to)
{
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
		chld.data.set("kode_drk",temp.getKode());					
		chld.data.set("nama",temp.getCaption());
		chld.data.set("level_lap",temp.getKodeForm());		
		if (temp.childs.getLength() != 0)
		{
			this.copyChilds(temp,chld);
		}
	}
	from.clearChild();
	to.setShowKode(true);
};
window.app_saku_anggaran_master_fRKM.prototype.switchItem = function(from, to)
{
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
	child.data.set("kode_drk",item.getKode());					
	child.data.set("nama",item.getCaption());
	child.data.set("level_lap",item.getKodeForm());
	item.setKodeForm(kdForm);
	item.setKode(kd);
	item.setCaption(caption);
	item.setShowKode(true);					
	item.data = data;
	item.data2 = data2;
	item.data.set("kode_drk",kd);					
	item.data.set("nama",caption);
	item.data.set("level_lap",kdForm);
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
};
window.app_saku_anggaran_master_fRKM.prototype.moveItem = function(item, owner)
{	
	var child = new portalui_treeNode(owner);
	child.setKodeForm(item.getKodeForm());
	child.setKode(item.getKode());
	child.setCaption(item.getCaption());				
	child.setShowKode(item.showKode);
	child.data = item.data;
	child.data2 = item.data2;
	child.data.set("kode_drk",item.getKode());					
	child.data.set("nama",item.getCaption());
	child.data.set("level_lap",item.getKodeForm());
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
};