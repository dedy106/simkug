/*
insert-in utk semua lokasi
*/
window.app_budget_master_fKlpAsset = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fKlpAsset.prototype.parent.constructor.call(this, owner);
		this.className = "app_budget_master_fKlpAsset";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Kelompok Aktiva Tetap: Input/Koreksi", 0);	
		
		this.maximize();
		uses("portalui_saiCBBL");
		/*
		this.elokasi = new portalui_saiCBBL(this, {bound: [20, 25, 150, 20],caption: "Lokasi",multiSelection:false,
		               sql: ["select  kode_lokasi, nama from lokasi ",["kode_lokasi","nama"],false,["Kode Lokais","Nama"],"where","Daftar Lokasi", true],change:[this,"doChange"]});
		if (this.app._userStatus !="A"){this.elokasi.setReadOnly(true);this.elokasi.setBtnVisible(false);}			
		*/
		this.btn = new portalui_imageButton(this,{bound:[220,22,22,22], hint:"Reload",image:"icon/"+system.getThemes()+"/reload.png", click:[this,"doClick"]});
		this.addBtn = new portalui_imageButton(this,{bound:[27,22,22,22],chint:"Tambah Item",image:"icon/"+system.getThemes()+"/createentries.png",click:[this,"entriesClick"]});				
		this.editBtn = new portalui_imageButton(this,{bound:[47,22,22,22],chint:"Edit Item",image:"icon/"+system.getThemes()+"/editentries.png",click:[this,"entriesClick"]});		
		this.delBtn = new portalui_imageButton(this,{bound:[67,22,22,22],chint:"Hapus Item",image:"icon/"+system.getThemes()+"/delentries.png",click:[this,"entriesClick"]});		
		this.relBtn = new portalui_imageButton(this,{bound:[87,22,22,22],chint:"Relasi",image:"icon/"+system.getThemes()+"/relakun.png",click:[this,"entriesClick"]});		
		this.downBtn = new portalui_imageButton(this,{bound:[107,22,22,22],chint:"Geser Bawah",image:"icon/"+system.getThemes()+"/down.png",click:[this,"entriesClick"]});		
		this.upBtn = new portalui_imageButton(this,{bound:[127,22,22,22],chint:"Geser Atas",image:"icon/"+system.getThemes()+"/up.png",click:[this,"entriesClick"]});		
		this.leftBtn = new portalui_imageButton(this,{bound:[147,22,22,22],chint:"Geser Kiri",image:"icon/"+system.getThemes()+"/bleft.png",click:[this,"entriesClick"]});		
		this.rightBtn = new portalui_imageButton(this,{bound:[167,22,22,22],chint:"Geser Kanan",image:"icon/"+system.getThemes()+"/bright.png",click:[this,"entriesClick"]});
		this.rootBtn = new portalui_imageButton(this,{bound:[187,22,22,22],chint:"Deselect",image:"icon/"+system.getThemes()+"/imgSelect.png",caption:"R",click:[this,"entriesClick"]});		
		this.treev = new portalui_treeView(this,{bound:[20,24,700,this.getHeight() - 155],dblClick:[this,"treeClick"]});		
		this.treev.childLength = 700;				
		
		this.rearrangeChild(10,23);
		
		this.pAdd = new portalui_panel(this);
		this.pAdd.setTop(170);
		this.pAdd.setLeft(150);
		this.pAdd.setWidth(400);
		this.pAdd.setHeight(200);
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
			
			uses("portalui_saiCB");
			this.e2 = new portalui_saiCB(this.pAdd);
			this.e2.setTop(70);
			this.e2.setLeft(20);
			this.e2.setWidth(200);
			this.e2.setCaption("Level Lap");			
			this.e2.addItem(0,"1");
			this.e2.addItem(1,"2");
			this.e2.addItem(2,"3");
			this.e2.addItem(3,"4");
			this.e2.addItem(4,"5");
			
			this.e3 = new portalui_saiCB(this.pAdd);
			this.e3.setTop(92);
			this.e3.setLeft(20);
			this.e3.setWidth(220);
			this.e3.setCaption("Tipe");
			this.e3.addItem("Summary","Summary");
			this.e3.addItem("Header","Header");
			this.e3.addItem("Posting","Posting");
			this.e3.addItem("SumPosted","SumPosted");
			this.e3.addItem("spasi","Spasi");
			
			this.e4 = new portalui_saiCB(this.pAdd);
			this.e4.setTop(114);
			this.e4.setLeft(20);
			this.e4.setWidth(220);
			this.e4.setCaption("Sum Header");	
			
			this.e5 = new portalui_saiCBBL(this.pAdd, {
				bound: [20, 115, 220, 20],
				caption: "Klp Akun",
				multiSelection: false,
				sql :["select kode_klpakun, nama from agg_fa_klpakun ",["kode_klpakun","nama"],false, ["Kode Klp Akun","Nama"],"where","Daftar Kelompok Akun",true]				
			});
					
			this.okBtn = new portalui_imageButton(this.pAdd);
			this.okBtn.setTop(170);
			this.okBtn.setLeft(20);
			this.okBtn.setWidth(22);
			this.okBtn.setHeight(22);
			this.okBtn.setImage("icon/"+system.getThemes()+"/bOk.png");
			this.okBtn.setHint("delete entries");
			this.okBtn.onClick.set(this,"entriesClick");
			
			this.cancelBtn = new portalui_imageButton(this.pAdd);
			this.cancelBtn.setTop(170);
			this.cancelBtn.setLeft(42);
			this.cancelBtn.setWidth(22);
			this.cancelBtn.setHeight(22);
			this.cancelBtn.setImage("icon/"+system.getThemes()+"/bCancel.png");
			this.cancelBtn.setHint("delete entries");
			this.cancelBtn.onClick.set(this,"entriesClick");
		this.pAdd.rearrangeChild(20,23);		
		this.dblib = new util_dbLib();
		this.dblib.addListener(this);
		this.menuStr = "";
		
		uses("util_standar");
		this.standarLib = new util_standar();
		
		setTipeButton(tbSimpan);				
		
		this.rowIndex = -1;
		this.setTabChildIndex();
		this.standarLib.clearByTag(this, new Array("0"), this.e0);
		//this.elokasi.setText(this.app._lokasi);		
	}
};
window.app_budget_master_fKlpAsset.extend(window.portalui_childForm);
window.app_budget_master_fKlpAsset.implement({
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
						this.app.info(this,"Transaksi Sukses ",""); //("+ this.elokasi.getText()+")"
					else systemAPI.alert(result); 
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
							uses("portalui_arrayMap");
							var data = new portalui_arrayMap();						
							data.set("kode_klpfa",this.e0.getText());						
							data.set("nama",this.e1.getText());		
							//data.set("kode_lokasi",this.elokasi.getText());														
							data.set("tipe",this.e3.getText());
							data.set("rowindex",0);		
							data.set("kode_induk",induk);								
							data.set("sum_header",this.e4.getText());							
							data.set("level_lap",this.e2.getText());						
							data.set("level_spasi",lvl);				
							data.set("kode_klpakun",this.e5.getText());																				
							node.data = data;
						}catch(e){
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
						item.setKodeForm(this.e2.getText());
						item.setShowKode(true);
						var data = item.data;
						data.set("kode_klpfa",this.e0.getText());					
						data.set("nama",this.e1.getText());		
						//data.set("kode_lokasi",this.elokasi.getText());													
						data.set("tipe",this.e3.getText());									
						data.set("sum_header",this.e4.getText());																				
						data.set("level_lap",this.e2.getText());
						data.set("kode_klpakun",this.e5.getText());																																								
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
							var sql2,sql1 = "delete from agg_fa_klp ";					// where kode_lokasi = '"+this.elokasi.getText()+"'
							var sql = new server_util_arrayList();
							sql.add(sql1);
							var driver = this.app._dbname.split("-");
							driver = driver[1];							
							var data = value.split("#");
							for (var i in data){
								sql2 = "insert into agg_fa_klp(kode_klpfa, nama, tipe, rowindex, kode_induk,sum_header, level_lap,level_spasi, kode_klpakun,  nik_user, tgl_input) values "; //kode_lokasi,
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
		}catch(e)
		{
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
			var levelLap = undefined;
			var level = undefined;
			var item = undefined;
			var node = undefined;
			
			//while (rowNo < menu.getLength())
			for (var r in menu.objList)
			{
				itemValues = menu.objList[r];			
				kode = itemValues.get("kode_klpfa");							
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
			systemAPI.alert("row "+ rowNo +" : "+e);
		}
	},
	doClick: function(sender){	
		var nrc = this.dblib.runSQL("select kode_klpfa, nama, tipe, rowindex, kode_induk,sum_header, level_lap,level_spasi,kode_klpakun from agg_fa_klp order by rowindex",0,0);	//kode_lokasi,   where  kode_lokasi = '"+this.elokasi.getText()+"' 
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
					this.e0.setText("");this.e1.setText("");this.e2.setText("");this.e3.setText("");
					this.e4.setText("");
					this.e5.setText("");
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
					this.e4.setText(item.data.get("sum_header"));
					this.e5.setText(item.data.get("kode_klpakun"));				
					this.EditStatus = "Edit";
					this.pAdd.show();
				}else if (sender == this.delBtn)	
				{
					var item = this.treev.getSelectedItem();	
					this.selectedItem = item;
					system.confirm(this, "Remove","Yakin akan dihapus?"); //Lokasi "+item.getCaption()+"
				}else if (sender == this.rootBtn)	
				{
					this.treev.doSelectItem(undefined);	
					this.selectedItem = undefined;				
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
							this.copyChilds(child, item);																
						if (tmp instanceof portalui_treeNode)
						{
							if (tmp.childs.getLength() != 0)
							{
								this.copyChilds(tmp, child);
								this.treev.delItem(tmp);
							}				
						}	
					}
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
					result += ",'" + (node.getLevel() - 1).toString() +"'";
				else if (i == "kode_induk"){
					if (node.owner instanceof portalui_treeView)
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
	},
	/*
	doFindLokasi: function(sender){
		if (this.app._userStatus =="A")
			this.standarLib.showListDataFromItems(this, "Data Lokasi",this.elokasi, 
												  "select kode_lokasi, nama from lokasi","select count(*) from lokasi",
											  new Array("lokasi","nama"),"where");
		
	},
	*/
	setSummaryItems: function(data){
		this.e4.clearItem();
		for (var i in data)
			this.e4.addItem(i, data[i]);	
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
			chld.data.set("kode_klpfa",temp.getKode());					
			chld.data.set("nama",temp.getCaption());
			chld.data.set("level_lap",temp.getKodeForm());		
			if (temp.childs.getLength() != 0)
				this.copyChilds(temp,chld);			
		}
		from.clearChild();
		to.setShowKode(true);
	},
	switchItem: function(from, to){
		var item = from; var child = to;
		var data,  data2,  kdForm, kd,  caption,tmp;
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
		child.data.set("kode_klpfa",item.getKode());					
		child.data.set("nama",item.getCaption());
		child.data.set("level_lap",item.getKodeForm());
		item.setKodeForm(kdForm);
		item.setKode(kd);
		item.setCaption(caption);
		item.setShowKode(true);					
		item.data = data;
		item.data2 = data2;
		item.data.set("kode_klpfa",kd);					
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
			this.copyChilds(child, item);		
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
		child.data.set("kode_klpfa",item.getKode());					
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
	},
	doChange: function(sender){
		this.treev.clear();
	}
});