window.app_saku3_transaksi_siaga_hris_fKlpLoker = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_siaga_hris_fKlpLoker";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Setting Versi RKM", 0);	
		this.maximize();
		uses("portalui_saiCBBL");
		uses("portalui_imageButton");
		this.elokasi = new saiCBBL(this,{bound:[20,11,200,20],caption:"Lokasi",multiSelection:false,maxLength:10});
		this.eKlp = new saiCBBL(this,{bound:[20,12,200,20],caption:"Versi",multiSelection:false,maxLength:10});
		this.addBtn = new portalui_imageButton(this,{bound:[27,13,20,20],hint:"Buat Item",image:"icon/"+system.getThemes()+"/createentries.png",click:[this,"entriesClick"]});
		this.editBtn = new portalui_imageButton(this,{bound:[47,13,20,20],hint:"Edit Item",image:"icon/"+system.getThemes()+"/editentries.png",click:[this,"entriesClick"]});
		this.delBtn = new portalui_imageButton(this,{bound:[67,13,20,20],hint:"Hapus Item",image:"icon/"+system.getThemes()+"/delentries.png",click:[this,"entriesClick"]});
		this.relBtn = new portalui_imageButton(this,{bound:[87,13,20,20],hint:"Relasi Loker",image:"icon/"+system.getThemes()+"/relakun.png",click:[this,"entriesClick"]});
		this.downBtn = new portalui_imageButton(this,{bound:[107,13,20,20],hint:"Geser ke bawah",image:"icon/"+system.getThemes()+"/down.png",click:[this,"doClick"]});
		this.upBtn = new portalui_imageButton(this,{bound:[127,13,20,20],hint:"Geser ke atas",image:"icon/"+system.getThemes()+"/up.png",click:[this,"entriesClick"]});
		this.leftBtn = new portalui_imageButton(this,{bound:[147,13,20,20],hint:"Geser ke kiri",image:"icon/"+system.getThemes()+"/bleft.png",click:[this,"entriesClick"]});
		this.rightBtn = new portalui_imageButton(this,{bound:[167,13,20,20],hint:"Geser ke kanan",image:"icon/"+system.getThemes()+"/bright.png",click:[this,"entriesClick"]});
		this.btn = new portalui_imageButton(this,{bound:[187,13,20,20],hint:"Reload",image:"icon/"+system.getThemes()+"/reload.png",click:[this,"doClick"]});
				
		this.treev = new portalui_treeView(this,{bound:[20,14,700,this.getHeight() - 130], dblClick:[this,"treeClick"]});
		this.treev.childLength = 700;	
		
		this.menuStr = "";
		setTipeButton(tbSimpan);				
		this.rowIndex = -1;
		this.setTabChildIndex();
		this.rearrangeChild(10, 23);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.elokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi='"+this.app._lokasi+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);						
			this.eKlp.setSQL("select kode_fs, nama from gr_fs where kode_lokasi='"+this.app._lokasi+"'",["kode_fs","nama"],false,["Kode","Nama"],"and","Data Kelompok",true);						
			//this.standarLib.clearByTag(this, new Array("0"), this.e0);
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_fKlpLoker.extend(window.portalui_childForm);
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.mainButtonClick = function(sender)
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
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.doRequestReady = function(sender, methodName, result)
{
	switch (methodName)
	{
		case "listData" : 
			
			this.menuStr = result;
			this.loadMenu();
		break;
		case "execArraySQL" :			
			if (result.toLowerCase().search("error") == -1)
				system.info(this,"Transaksi Sukses ");
			else system.alert(this, result, ""); 
		break;
	}
};
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.doModalResult = function(event, modalResult, value)
{
	try
	{
		switch (event)
		{
			case "relakun":
				if (modalResult == mrOk)
				{
					uses("portalui_arrayMap");					
					var node = this.selectedItem;
					for (var i in value.objList){
						value.get(i).set("kode_fs",this.eKlp.getText());
					}
					node.data2 = value;					
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
						data.set("kode_klploker",valArray[0]);
						data.set("kode_fs",this.eKlp.getText());	
						data.set("nama",valArray[1]);
						data.set("level_spasi",lvl);
						data.set("level_lap",valArray[2]);
						data.set("tipe",valArray[3]);
						data.set("sum_header",valArray[4]);							
						data.set("kode_induk",induk);							
						data.set("rowindex",induk);						
						data.set("tgl_input",(new Date).getDateStr());
						data.set("nik_user",this.app._userLog);
						data.set("kode_lokasi",this.elokasi.getText());							
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
					data.set("kode_klploker",valArray[0]);					
					data.set("nama",valArray[1]);					
					data.set("level_lap",valArray[2]);
					data.set("tipe",valArray[3]);
					data.set("sum_header",valArray[4]);						
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
					this.value2 = "";
					var value = this.getTreeData(this.treev);
					value = value.substr(1);
					this.value2 = this.value2.substr(1);				
					this.listAkun = this.listAkun.substr(1);			
					try
					{						
						var sql1 = "delete from gr_klploker where kode_fs = '"+this.eKlp.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' ";					// kode_lokasi,
						var sql3 = "delete from gr_relaloker where kode_fs = '"+this.eKlp.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"' ";					// kode_lokasi,
						var sql2, sql = new server_util_arrayList();
						sql.add(sql1);	
						sql.add(sql3);	
						//if mysql langsung
						var data = value.split("#");
						for (var i in data){
							sql2 = "insert into gr_klploker(kode_klploker, kode_fs, nama, level_spasi, level_lap, tipe, sum_header, kode_induk, rowindex, tgl_input, nik_user, kode_lokasi) values ";
							sql2 += " "+ data[i] +" ";		
							
							sql.add(sql2);
						}							
						data = this.value2.split("#");
						for (var i in data){
							sql3 = "insert into gr_relaloker(kode_klploker, kode_fs, kode_loker, kode_lokasi) values ";
							if (data[i]) {
								sql3 += " "+ data[i] +" ;";
								sql.add(sql3);					
							}
						}
						
						this.dbLib.execArraySQL(sql);	
					}
					catch(e)
					{
						system.alert(this,e);
					}
				}
				break;
		}
	}catch(e)
	{
		alert("[fNeraca]::doModalResult:"+e);
	}
};
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.loadMenu = function(daftarNrc)
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
		var line, ix = -1, nrcRls, lineData, nrc_d = this.dbLib.loadQuery("select kode_klploker, kode_loker from gr_relaloker where kode_lokasi ='"+this.elokasi.getText()+"' and kode_fs = '"+this.eKlp.getText()+"' order by kode_klploker");															
		var kdNrc = '-', dataRelakun = new portalui_arrayMap();
		nrcRls = new portalui_arrayMap();
		if (nrc_d != ""){					
			nrc_d = nrc_d.split("\r\n");							
			for (var c = 1; c < nrc_d.length;c++){
				line = new portalui_arrayMap();
				lineData = nrc_d[c].split(";");				
				if (lineData[0] != kdNrc){
					kdNrc = lineData[0];
					nrcRls = new portalui_arrayMap();
					dataRelakun.set(kdNrc,nrcRls);					
					ix = -1;
				}	
				line.set("kode_loker",lineData[1]);								
				ix++;
				nrcRls.set(ix,line);
			}
		}
		//while (rowNo < menu.getLength())
		for (var r in menu.objList)
		{
			itemValues = menu.objList[r];			
			kode = itemValues.get("kode_klploker");		
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
				var data2 = new portalui_arrayMap();
				data2 = dataRelakun.get(kode);				
				node.data2 = data2;
				node.data = itemValues;
			}
			rowNo++;
		}
	}catch(e)
	{
		alert("row "+ rowNo +" : "+e);
	}
};
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.doClick = function(sender)
{
	if (this.eKlp.getText() != "")	
	{	try{
			var sql="select kode_klploker, kode_fs, nama, level_spasi, level_lap, tipe, sum_header, kode_induk, rowindex, tgl_input, nik_user, kode_lokasi "+
					"from gr_klploker where kode_fs = '"+this.eKlp.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"'  "+
					" order by rowindex";			
			var nrc = this.dbLib.runSQL(sql,0,0);			
			this.loadMenu(nrc);
		}catch(e){
			alert(e);
		}
	}	
};
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.getDataAkun= function(node){
		var result = "";
		var child = undefined;
		if (node instanceof portalui_treeView)
		{
			for (var i in node.childs.objList)
			{
				child = system.getResource(node.childs.objList[i]);
				
				if(child != undefined)
					result += this.getDataAkun(child);	
				
			}
		}else
		{
			this.rowIndex++;
			var value = node.data2;		
			if (value != undefined && value != ""){			
				for (var i in value.objList){						
					this.listAkun += ",'" + value.get(i).get("kode_loker") +"'";
				}
				
			}		
			if (node.isHasChild())
				for (var i in node.childs.objList)
				{
					child = system.getResource(node.childs.objList[i]);
					if(child != undefined)
						result += this.getDataAkun(child);	
				}		
		}
		return result;
};
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.entriesClick = function(sender)
{
	try
	{ 
	 	if (sender == this.relBtn)
		{
			this.listAkun = "";
			this.getDataAkun(this.treev);
			if (this.listAkun != "")
				this.listAkun = this.listAkun.substr(1);			
			this.selectedItem = this.treev.getSelectedItem();			
			if (this.selectedItem.data.get("tipe").toLowerCase() == "posting"){
				uses("app_hris_master_fRelloker",true);
				if (this.relakun != undefined)
					this.relakun.free();
				this.relakun = new app_hris_master_fRelloker(this.app);
				this.relakun.elokasi = this.elokasi.getText();
				this.relakun.setTop((this.app._mainForm.height / 2) - 150);
				this.relakun.setLeft((this.app._mainForm.width / 2)- 400);
				this.relakun.setHeight(400);
				this.relakun.setWidth(800);
				this.relakun.doAfterResize(this.relakun.width, this.relakun.height);
				this.relakun.formRequester = this;
				this.relakun.setCaption("Relasi Loker");
				this.relakun.listAkun = this.selectedItem.data2;							
				this.relakun.allSelectAkun = this.listAkun;			
				this.relakun.show();
			}else system.alert(this,"Hanya yang bertipe posting saja yang bisa direlasikan dengan akun");
		}else
		{
			if (sender == this.addBtn || sender == this.editBtn){
				uses("app_saku3_transaksi_siaga_hris_fKlpLokerDetail",true);
				if (this.entryMenu == undefined)
					this.entryMenu = new app_saku3_transaksi_siaga_hris_fKlpLokerDetail(this.app);
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
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.treeClick = function(item)
{
};
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.getTreeData = function(node)
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
		
		var value = node.data2;
		if (value != undefined && value != ""){
				
			for (var i in value.objList){				
				this.value2 += "#('"+node.getKode()+"','"+this.eKlp.getText()+"','" + value.get(i).get("kode_loker") +"','"+this.elokasi.getText()+"')";		
				this.listAkun += ",'" + value.get(i).get("kode_loker") +"'";
			}
			
		}
			
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
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.getSummary = function(node)
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
		else result = ";" + value.get("kode_klploker");
		
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
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.doFindLokasi = function(sender)
{
	var lokasi = this.app._lokasi;
	if (this.app._userStatus =="A")
		lokasi = "%";
	this.standarLib.showListDataFromItems(this, "Data Lokasi",this.elokasi, 
								"select kode_lokasi, nama from lokasi where kode_lokasi like '"+lokasi+"' ",
								"select count(*) from lokasi where kode_lokasi like '"+lokasi+"'",
								["kode_lokasi","nama"],"and",["Kode","Nama"]);
};
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.doFindKlp = function(sender)
{
	this.standarLib.showListDataFromItems(this, "Data Versi ",this.eKlp, 
									"select kode_fs, nama from gr_fs where kode_lokasi = '"+this.elokasi.getText()+"' ",
									"select count(*) from gr_fs where kode_lokasi = '"+this.elokasi.getText()+"' ",
									["kode_fs","nama"],"and",["Kode","Nama"]);
};
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.copyChilds = function(from, to)
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
		chld.data.set("kode_klploker",temp.getKode());					
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
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.switchItem = function(from, to)
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
	child.data.set("kode_klploker",item.getKode());					
	child.data.set("nama",item.getCaption());
	child.data.set("level_lap",item.getKodeForm());
	item.setKodeForm(kdForm);
	item.setKode(kd);
	item.setCaption(caption);
	item.setShowKode(true);					
	item.data = data;
	item.data2 = data2;
	item.data.set("kode_klploker",kd);					
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
window.app_saku3_transaksi_siaga_hris_fKlpLoker.prototype.moveItem = function(item, owner)
{	
	var child = new portalui_treeNode(owner);
	child.setKodeForm(item.getKodeForm());
	child.setKode(item.getKode());
	child.setCaption(item.getCaption());				
	child.setShowKode(item.showKode);
	child.data = item.data;
	child.data2 = item.data2;
	child.data.set("kode_klploker",item.getKode());					
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
