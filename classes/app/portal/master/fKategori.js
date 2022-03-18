window.app_portal_master_fKategori = function(owner)
{
	if (owner)
	{
		window.app_portal_master_fKategori.prototype.parent.constructor.call(this, owner);
		this.className = "app_portal_master_fKategori";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kategori Barang : Input/Koreksi", 0);
		this.maximize();
		uses("portalui_saiCBBL",true);
		this.elokasi = new portalui_saiCBBL(this);
		this.elokasi.setTop(25);
		this.elokasi.setLeft(20);
		this.elokasi.setWidth(150);
		this.elokasi.setCaption("Lokasi");
		this.elokasi.onBtnClick.set(this, "doFindLokasi");
		this.elokasi.setText(this.app._lokasi);
		if (this.app._userStatus !="A"){
			this.elokasi.setReadOnly(true);
			this.elokasi.setBtnVisible(false);
		}
		
		uses("portalui_imageButton",true);
		this.btn = new portalui_imageButton(this);
		this.btn.setLeft(170);
		this.btn.setTop(25);
		this.btn.setHeight(22);
		this.btn.setWidth(22);
		this.btn.setHint("Reload");
		this.btn.setImage("icon/"+system.getThemes()+"/reload.png");
		this.btn.onClick.set(this, "doClick");
		
		this.treev = new portalui_treeView(this);
		this.treev.setTop(91);
		this.treev.setLeft(20);
		this.treev.setWidth(700);
		this.treev.setHeight(this.getHeight() - 130);
		this.treev.childLength = 700;
		this.treev.onDblClick.set(this, "treeClick");				
		
		this.addBtn = new portalui_imageButton(this);
		this.addBtn.setTop(69);
		this.addBtn.setLeft(27);
		this.addBtn.setWidth(22);
		this.addBtn.setHeight(22);
		this.addBtn.setImage("icon/"+system.getThemes()+"/createentries.png");
		this.addBtn.setHint("create new entries");
		this.addBtn.onClick.set(this,"entriesClick");
		
		this.editBtn = new portalui_imageButton(this);
		this.editBtn.setTop(69);
		this.editBtn.setLeft(47);
		this.editBtn.setWidth(22);
		this.editBtn.setHeight(22);
		this.editBtn.setImage("icon/"+system.getThemes()+"/editentries.png");
		this.editBtn.setHint("edit entries");
		this.editBtn.onClick.set(this,"entriesClick");
		
		this.delBtn = new portalui_imageButton(this);
		this.delBtn.setTop(69);
		this.delBtn.setLeft(67);
		this.delBtn.setWidth(22);
		this.delBtn.setHeight(22);
		this.delBtn.setImage("icon/"+system.getThemes()+"/delentries.png");
		this.delBtn.setHint("delete entries");
		this.delBtn.onClick.set(this,"entriesClick");
		
		this.relBtn = new portalui_imageButton(this);
		this.relBtn.setTop(69);
		this.relBtn.setLeft(87);
		this.relBtn.setWidth(22);
		this.relBtn.setHeight(22);
		this.relBtn.setImage("icon/"+system.getThemes()+"/relakun.png");
		this.relBtn.setHint("Select Root");
		this.relBtn.onClick.set(this,"entriesClick");
		
		this.downBtn = new portalui_imageButton(this);
		this.downBtn.setTop(69);
		this.downBtn.setLeft(107);
		this.downBtn.setWidth(22);
		this.downBtn.setHeight(22);
		this.downBtn.setImage("icon/"+system.getThemes()+"/down.png");
		this.downBtn.setHint("Move Down");
		this.downBtn.onClick.set(this,"entriesClick");
		
		this.upBtn = new portalui_imageButton(this);
		this.upBtn.setTop(69);
		this.upBtn.setLeft(127);
		this.upBtn.setWidth(22);
		this.upBtn.setHeight(22);
		this.upBtn.setImage("icon/"+system.getThemes()+"/up.png");
		this.upBtn.setHint("Move Up");
		this.upBtn.onClick.set(this,"entriesClick");
		
		this.leftBtn = new portalui_imageButton(this);
		this.leftBtn.setTop(69);
		this.leftBtn.setLeft(147);
		this.leftBtn.setWidth(22);
		this.leftBtn.setHeight(22);
		this.leftBtn.setImage("icon/"+system.getThemes()+"/bleft.png");
		this.leftBtn.setHint("Geser Kiri");
		this.leftBtn.onClick.set(this,"entriesClick");
		
		this.rightBtn = new portalui_imageButton(this);
		this.rightBtn.setTop(69);
		this.rightBtn.setLeft(167);
		this.rightBtn.setWidth(22);
		this.rightBtn.setHeight(22);
		this.rightBtn.setImage("icon/"+system.getThemes()+"/bright.png");
		this.rightBtn.setHint("Geser Kanan");
		this.rightBtn.onClick.set(this,"entriesClick");
		
		this.pAdd = new portalui_panel(this);
		this.pAdd.setTop(100);
		this.pAdd.setLeft(270);
		this.pAdd.setWidth(350);
		this.pAdd.setHeight(165);
		this.pAdd.setCaption("Editor");
		this.pAdd.hide();
			
			this.e0 = new portalui_saiLabelEdit(this.pAdd);
			this.e0.setTop(20);
			this.e0.setLeft(20);
			this.e0.setWidth(150);
			this.e0.setText("");
			this.e0.setCaption("Kode");
			
			this.e1 = new portalui_saiLabelEdit(this.pAdd);
			this.e1.setTop(45);
			this.e1.setLeft(20);
			this.e1.setWidth(300);
			this.e1.setText("");
			this.e1.setCaption("Nama");
			
			uses("portalui_saiCB",true);
			this.e2 = new portalui_saiCB(this.pAdd);
			this.e2.setTop(70);
			this.e2.setLeft(20);
			this.e2.setWidth(200);
			this.e2.setCaption("Level Laporan");
			this.e2.addItem(0,"1");
			this.e2.addItem(1,"2");
			this.e2.addItem(2,"3");
			this.e2.addItem(3,"4");
			this.e2.addItem(4,"5");
			
			this.e3 = new portalui_saiCB(this.pAdd);
			this.e3.setTop(95);
			this.e3.setLeft(20);
			this.e3.setWidth(200);
			this.e3.setCaption("Tipe");
			this.e3.addItem("Summary","Summary");
			this.e3.addItem("Header","Header");
			this.e3.addItem("Posting","Posting");
			this.e3.addItem("SumPosted","SumPosted");
			this.e3.addItem("spasi","Spasi");
			
			this.okBtn = new portalui_imageButton(this.pAdd);
			this.okBtn.setTop(130);
			this.okBtn.setLeft(20);
			this.okBtn.setWidth(22);
			this.okBtn.setHeight(22);
			this.okBtn.setImage("icon/"+system.getThemes()+"/bOk.png");
			this.okBtn.setHint("Save Entries");
			this.okBtn.onClick.set(this,"entriesClick");
			
			this.cancelBtn = new portalui_imageButton(this.pAdd);
			this.cancelBtn.setTop(130);
			this.cancelBtn.setLeft(42);
			this.cancelBtn.setWidth(22);
			this.cancelBtn.setHeight(22);
			this.cancelBtn.setImage("icon/"+system.getThemes()+"/bCancel.png");
			this.cancelBtn.setHint("Cancel Entries");
			this.cancelBtn.onClick.set(this,"entriesClick");
		
		this.dblib = new util_dbLib();
		this.dblib.addListener(this);
		this.menuStr = "";
		
		uses("util_standar");
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
		this.rowIndex = -1;
		this.setTabChildIndex();
		this.standarLib.clearByTag(this, new Array("0"), this.e0);
		this.elokasi.setText(this.app._lokasi);		
	}
};
window.app_portal_master_fKategori.extend(window.portalui_childForm);
window.app_portal_master_fKategori.prototype.mainButtonClick = function(sender)
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
window.app_portal_master_fKategori.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "listData" :
			this.menuStr = result;
			this.loadMenu();
		break;
		case "execArraySQL" :
			if (result.toLowerCase().search("error") == -1)
				this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.elokasi.getText()+")");
			else this.app._mainForm.pesan(0, result); 
		break;
	}
};
window.app_portal_master_fKategori.prototype.doModalResult = function(event, modalResult, value)
{
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
						  node = new portalui_treeNode(this.treev);
						  induk = "00000";
						}else
						{
						  node = new portalui_treeNode(this.selectedItem);
						  induk = this.selectedItem.getKode();
						}						
						node.setKode(this.e0.getText());
						node.setCaption(this.e1.getText());	
						node.setKodeForm(this.e2.getText());
						node.setShowKode(true);
						var lvl = node.getLevel() - 1;
						uses("portalui_arrayMap",true);
						var tgl = new Date();
						var data = new portalui_arrayMap();						
						data.set("kode_kategori",this.e0.getText());
						data.set("nama",this.e1.getText());
						data.set("level_spasi",lvl);
						data.set("level_lap",this.e2.getText());
						data.set("tipe",this.e3.getText());
						data.set("sum_header","-");
						data.set("kode_induk",induk);
						data.set("kode_lokasi",this.elokasi.getText());
						data.set("tgl_input",tgl.getFullYear()+"-"+tgl.getBln()+"-"+tgl.getDate());
						data.set("nik_user",this.app._userLog);
						data.set("rowindex",0);
						data.set("no_dok_file","-");
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
					//var valArray = value.split(";");
					item.setKode(this.e0.getText());
					item.setCaption(this.e1.getText());
					item.setKodeForm(this.e2.getText());
					item.setShowKode(true);
					var tgl = new Date();
					var data = item.data;
					data.set("kode_kategori",this.e0.getText());
					data.set("nama",this.e1.getText());
					data.set("level_spasi",lvl);
					data.set("level_lap",this.e2.getText());
					data.set("tipe",this.e3.getText());
					data.set("sum_header","-");
					data.set("kode_induk",induk);
					data.set("kode_lokasi",this.elokasi.getText());
					data.set("tgl_input",tgl.getFullYear()+"-"+tgl.getBln()+"-"+tgl.getDate());
					data.set("nik_user",this.app._userLog);
					data.set("rowindex",0);
					data.set("no_dok_file","-");
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
						var sql2,sql1 = "delete from portal_kategori where kode_lokasi = '"+this.elokasi.getText()+"'";	
						var sql = new server_util_arrayList();
						sql.add(sql1);
						var driver = this.app._dbname.split("-");
						driver = driver[1];
						if (driver.search("mssql") != -1){
							var data = value.split("#");
							for (var i in data){
								sql2 = "insert into portal_kategori (kode_kategori,nama,level_spasi,level_lap,tipe,sum_header,kode_induk,kode_lokasi,tgl_input,nik_user,rowindex,no_dok_file) values ";
								sql2 += data[i];
								sql.add(sql2);
							}
						}else if (driver.search("mysql") != -1){
							var data = value.replace(/#/g,",");
							if (data!='')
							{
								sql2 = "insert into portal_kategori (kode_kategori,nama,level_spasi,level_lap,tipe,sum_header,kode_induk,kode_lokasi,tgl_input,nik_user,rowindex,no_dok_file) values ";
								sql2 += " "+ data +" ";
								sql.add(sql2);
							}
						
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
		alert("[app_portal_master_fKategori]::doModalResult: event="+event+" "+e);
	}
};
window.app_portal_master_fKategori.prototype.loadMenu = function(daftarNrc)
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
		for (var r in menu.objList)
		{
			itemValues = menu.objList[r];			
			kode = itemValues.get("kode_kategori");							
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
window.app_portal_master_fKategori.prototype.doClick = function(sender)
{	
	var nrc = this.dblib.runSQL("select * from portal_kategori where kode_lokasi = '"+this.elokasi.getText()+"' order by rowindex",0,0);	
	this.loadMenu(nrc);
};
window.app_portal_master_fKategori.prototype.entriesClick = function(sender)
{
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
			this.treev.doSelectItem(undefined);	
			this.selectedItem = undefined;							
		}else
		{			
			var result = this.getSummary(this.treev);
			result = result.substr(1);
			
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
				this.e0.setText("");this.e1.setText("");this.e2.setText("");this.e3.setText("");
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
				this.e2.setText(item.getKodeForm());
				this.e3.setText(item.data.get("tipe"));
				this.EditStatus = "Edit";
				this.pAdd.show();
			}else if (sender == this.delBtn)	
			{
				var item = this.treev.getSelectedItem();	
				this.selectedItem = item;
				system.confirm(this, "Remove","Yakin Kategori "+item.getCaption()+" akan dihapus?");
			}else if (sender == this.upBtn)		
			{
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
					var kdForm = kd = caption = tmp = undefined;
					kdForm = child.getKodeForm();
					kd = child.getKode();
					caption = child.getCaption();
					child.setKodeForm(item.getKodeForm());
					child.setKode(item.getKode());
					child.setCaption(item.getCaption());				
					child.setShowKode(true);
					item.setKodeForm(kdForm);
					item.setKode(kd);
					item.setCaption(caption);
					item.setShowKode(true);
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
				}
			}else if (sender == this.downBtn)		
			{
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
				{
					var kdForm = kd = caption = tmp = undefined;
					kdForm = child.getKodeForm();
					kd = child.getKode();
					caption = child.getCaption();
					child.setKodeForm(item.getKodeForm());
					child.setKode(item.getKode());
					child.setCaption(item.getCaption());				
					child.setShowKode(true);
					item.setKodeForm(kdForm);
					item.setKode(kd);
					item.setCaption(caption);
					item.setShowKode(true);
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
window.app_portal_master_fKategori.prototype.treeClick = function(item)
{	
};
window.app_portal_master_fKategori.prototype.getTreeData = function(node)
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
			else
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
window.app_portal_master_fKategori.prototype.getSummary = function(node)
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
};
window.app_portal_master_fKategori.prototype.doFindLokasi = function(sender)
{
	if (this.app._userStatus =="A")
		this.standarLib.showListDataFromItems(this, "Data Lokasi",this.elokasi, 
											  "select kode_lokasi, nama from lokasi","select count(*) from lokasi",
										  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
};
window.app_portal_master_fKategori.prototype.copyChilds = function(from, to)
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
		if (temp.childs.getLength() != 0)
		{
			this.copyChilds(temp,chld);
		}
	}
	from.clearChild();
	to.setShowKode(true);
};
window.app_portal_master_fKategori.prototype.switchItem = function(from, to)
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
	child.data.set("kode_kategori",item.getKode());					
	child.data.set("nama",item.getCaption());
	child.data.set("level_lap",item.getKodeForm());
	item.setKodeForm(kdForm);
	item.setKode(kd);
	item.setCaption(caption);
	item.setShowKode(true);					
	item.data = data;
	item.data2 = data2;
	item.data.set("kode_neraca",kd);					
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
window.app_portal_master_fKategori.prototype.moveItem = function(item, owner)
{	
	var child = new portalui_treeNode(owner);
	child.setKodeForm(item.getKodeForm());
	child.setKode(item.getKode());
	child.setCaption(item.getCaption());				
	child.setShowKode(item.showKode);
	child.data = item.data;
	child.data2 = item.data2;
	child.data.set("kode_kategori",item.getKode());					
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