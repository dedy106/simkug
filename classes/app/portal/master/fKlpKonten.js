window.app_portal_master_fKlpKonten = function(owner)
{
  if (owner)
	{
		window.app_portal_master_fKlpKonten.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_master_fKlpKonten";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelompok Konten : Input/Koreksi", 0);
		this.maximize();
		uses("portalui_saiCBB;portalui_imageButton;portalui_saiCB",true);
		this.elokasi = new portalui_saiCBB(this,{bound:[20,25,150,20],caption:"Lokasi",btnClick:[this,"FindBtnClick"],btnRefreshClick:[this,"doClick"],maxLength:50,text:this.app._lokasi});
		if (this.app._userStatus !="A"){
			this.elokasi.setReadOnly(true);
			this.elokasi.setBtnVisible(false);
		}
		this.treev = new portalui_treeView(this,{bound:[20,90,700,this.getHeight() - 130],childLength:700,dblClick:"treeClick"});
		this.addBtn = new portalui_imageButton(this,{bound:[27,68,22,22],image:"icon/"+system.getThemes()+"/createentries.png",click:[this,"entriesClick"]});
		this.addBtn.setHint("create new entries");
		this.editBtn = new portalui_imageButton(this,{bound:[47,68,22,22],image:"icon/"+system.getThemes()+"/editentries.png",click:[this,"entriesClick"]});
		this.editBtn.setHint("edit entries");
		this.delBtn = new portalui_imageButton(this,{bound:[67,68,22,22],image:"icon/"+system.getThemes()+"/delentries.png",click:[this,"entriesClick"]});
		this.delBtn.setHint("delete entries");
		this.relBtn = new portalui_imageButton(this,{bound:[87,68,22,22],image:"icon/"+system.getThemes()+"/relakun.png",click:[this,"entriesClick"]});
		this.relBtn.setHint("Select Root");
		this.downBtn = new portalui_imageButton(this,{bound:[107,68,22,22],image:"icon/"+system.getThemes()+"/down.png",click:[this,"entriesClick"]});
		this.downBtn.setHint("Move Down");
		this.upBtn = new portalui_imageButton(this,{bound:[127,68,22,22],image:"icon/"+system.getThemes()+"/up.png",click:[this,"entriesClick"]});
		this.upBtn.setHint("Move Up");
		this.leftBtn = new portalui_imageButton(this,{bound:[147,68,22,22],image:"icon/"+system.getThemes()+"/bleft.png",click:[this,"entriesClick"]});
		this.leftBtn.setHint("Geser Kiri");
		this.rightBtn = new portalui_imageButton(this,{bound:[167,68,22,22],image:"icon/"+system.getThemes()+"/bright.png",click:[this,"entriesClick"]});
		this.rightBtn.setHint("Geser Kanan");
		this.pAdd = new portalui_panel(this,{bound:[270,100,350,165],caption:"Editor"});
		this.pAdd.hide();
			this.e0 = new portalui_saiLabelEdit(this.pAdd,{bound:[20,20,150,20],text:"",caption:"Kode"});
			this.e1 = new portalui_saiLabelEdit(this.pAdd,{bound:[20,45,300,20],text:"",caption:"Nama"});
			this.e2 = new portalui_saiCB(this.pAdd,{bound:[20,70,200,20],caption:"Level Laporan",items:["1","2","3","4","5"]});
			this.e3 = new portalui_saiCB(this.pAdd,{bound:[20,95,200,20],caption:"Tipe",items:["Summary","Header","Posting","SumPosted","Spasi"]});
			this.okBtn = new portalui_imageButton(this.pAdd,{bound:[20,130,22,22],image:"icon/"+system.getThemes()+"/bOk.png",click:[this,"entriesClick"]});
			this.okBtn.setHint("Save Entries");
			this.cancelBtn = new portalui_imageButton(this.pAdd,{bound:[42,130,22,22],image:"icon/"+system.getThemes()+"/bCancel.png",click:[this,"entriesClick"]});
			this.cancelBtn.setHint("Cancel Entries");
		try
		{
			this.dblib = new util_dbLib();
			this.dblib.addListener(this);
			this.menuStr = "";
			
			this.standarLib = new util_standar();
			setTipeButton(tbSimpan);
			this.rowIndex = -1;
			this.setTabChildIndex();
			this.standarLib.clearByTag(this, new Array("0"), this.e0);
			this.elokasi.setText(this.app._lokasi);
		}catch(e)
		{
			alert("[app_portal_master_fKlpKonten]->constructor : "+e);
		}
	}
};
window.app_portal_master_fKlpKonten.extend(window.portalui_childForm);
window.app_portal_master_fKlpKonten.prototype.mainButtonClick = function(sender)
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
window.app_portal_master_fKlpKonten.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_portal_master_fKlpKonten.prototype.doModalResult = function(event, modalResult, value)
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
						data.set("kode_klp",this.e0.getText());
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
					data.set("kode_klp",this.e0.getText());
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
						var sql2,sql1 = "delete from portal_klp_konten where kode_lokasi = '"+this.elokasi.getText()+"'";	
						var sql = new server_util_arrayList();
						sql.add(sql1);
						var driver = this.app._dbname.split("-");
						driver = driver[1];
						if (driver.search("mssql") != -1){
							var data = value.split("#");
							for (var i in data){
								sql2 = "insert into portal_klp_konten (kode_klp,nama,level_spasi,level_lap,tipe,sum_header,kode_induk,kode_lokasi,tgl_input,nik_user,rowindex) values ";
								sql2 += data[i];
								sql.add(sql2);
							}
						}else if (driver.search("mysql") != -1){
							var data = value.replace(/#/g,",");
							if (data!='')
							{
								sql2 = "insert into portal_klp_konten (kode_klp,nama,level_spasi,level_lap,tipe,sum_header,kode_induk,kode_lokasi,tgl_input,nik_user,rowindex) values ";
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
		alert("[app_portal_master_fKlpKonten]::doModalResult: event="+event+" "+e);
	}
};
window.app_portal_master_fKlpKonten.prototype.loadMenu = function(daftarNrc)
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
			kode = itemValues.get("kode_klp");							
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
window.app_portal_master_fKlpKonten.prototype.doClick = function(sender)
{	
	var nrc = this.dblib.runSQL("select kode_klp,nama,level_spasi,level_lap,tipe,sum_header,kode_induk,kode_lokasi,tgl_input,nik_user,rowindex from portal_klp_konten where kode_lokasi = '"+this.elokasi.getText()+"' order by rowindex",0,0);
	this.loadMenu(nrc);
};
window.app_portal_master_fKlpKonten.prototype.entriesClick = function(sender)
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
				system.confirm(this, "Remove","Yakin Kelompok Konten ini ("+item.getCaption()+") akan dihapus?");
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
window.app_portal_master_fKlpKonten.prototype.treeClick = function(item)
{	
};
window.app_portal_master_fKlpKonten.prototype.getTreeData = function(node)
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
window.app_portal_master_fKlpKonten.prototype.getSummary = function(node)
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
window.app_portal_master_fKlpKonten.prototype.doFindLokasi = function(sender)
{
	if (this.app._userStatus =="A")
		this.standarLib.showListDataFromItems(this, "Data Lokasi",this.elokasi, 
										"select kode_lokasi,nama from lokasi","select count(*) from lokasi",
										["kode_lokasi","nama"],"where",["Kode","Nama Lokasi"]);
};
window.app_portal_master_fKlpKonten.prototype.copyChilds = function(from, to)
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
window.app_portal_master_fKlpKonten.prototype.switchItem = function(from, to)
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
	child.data.set("kode_klp",item.getKode());					
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
window.app_portal_master_fKlpKonten.prototype.moveItem = function(item, owner)
{	
	var child = new portalui_treeNode(owner);
	child.setKodeForm(item.getKodeForm());
	child.setKode(item.getKode());
	child.setCaption(item.getCaption());				
	child.setShowKode(item.showKode);
	child.data = item.data;
	child.data2 = item.data2;
	child.data.set("kode_klp",item.getKode());					
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