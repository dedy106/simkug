window.app_saku3_transaksi_belajar_fModal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_belajar_fModal.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_belajar_fModal";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Modal Test",0);
		uses("portalui_saiCBBL;util_standar");
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.addBtn = new button(this,{bound:[27,10,80,18],caption:"Tambah",click:[this,"entriesClick"]});

		// this.editBtn = new portalui_imageButton(this,{bound:[47,13,22,22], hint:"Edit",image:"icon/"+system.getThemes()+"/editentries.png", click:[this,"entriesClick"]});				
		// this.delBtn = new button(this,{bound:[117,13,80,18], caption:"Hapus", click:[this,"entriesClick"]});

		this.sg1 = new saiGrid(this,{bound:[10,5,1000,400],colCount:8,tag:0,
			colTitle:["Kode","Nama","Level Lap","Tipe","Sum Header","Jenis Akun","Edit","Hapus"],
			colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,100,100,200,100]],
			click:[this,"entriesClick"],
			colAlign:[[6,7],[alCenter,alCenter]],
			// columnReadOnly:[true,[1,3],[0,2]],
			// buttonStyle:[[0],[bsEllips]],
			colFormat:[[6,7],[cfButton,cfButton]],
			readOnly:true,		
			autoAppend:true,defaultRow:1,
			ellipsClick:[this,"doEllipsClick2"],
			change:[this,"doChangeCell2"]
			});		
		this.sgn1 = new portalui_sgNavigator(this,{bound:[10,this,this.width-1,25],buttonStyle:3,grid:this.sg1});
		
		this.rearrangeChild(20,23);
		
		setTipeButton(tbSimpan);
		this.maximize();					
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_belajar_fModal.extend(window.portalui_childForm);
window.app_saku3_transaksi_belajar_fModal.implement({
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
						system.info(this,"Transaksi Sukses..", "");
					else system.alert(this, result,""); 
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
							var valArray = value.split(";");
							this.sg1.appendData(valArray);
							var rowCount = this.sg1.getRowCount();
							
							this.sgn1.setTotalPage(Math.ceil(rowCount / 20));
							this.sgn1.rearrange();					
							
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
						row = item;
						
						var valArray = value.split(";");
						this.sg1.cells(0,row,valArray[0]);
						this.sg1.cells(1,row,valArray[1]);
						this.sg1.cells(2,row,valArray[2]);
						this.sg1.cells(3,row,valArray[3]);
						this.sg1.cells(4,row,valArray[4]);
						this.sg1.cells(5,row,valArray[5]);
						this.sg1.cells(6,row,"Edit");		
						this.sg1.cells(7,row,"Hapus");											
					}
					break;
				case "Remove" :
					if (modalResult == mrOk)			
					this.sg1.delRow(this.selectedItem);
					break;
				case "simpan" :
					if (modalResult == mrOk)
					{
						this.rowIndex = -1;
						this.value2 = "";
						this.listAkun = "";
						var value = this.getTreeData(this.treev);
						value = value.substr(1);
						this.value2 = this.value2.substr(1);				
						this.listAkun = this.listAkun.substr(1);				
						try
						{
							var modul = this.e0.getText().substr(0,1);//
							var sql2,sql1 = "delete from neraca where modul = '"+modul+"'  and kode_fs = '"+this.eKlp.getText()+"' ";					// kode_lokasi,
							var sql = new server_util_arrayList();
							sql.add("delete from relakun  where  kode_fs = '"+this.eKlp.getText()+"' "+
								"and kode_neraca in (select distinct kode_neraca from neraca where modul = '"+modul+"'  and kode_fs = '"+this.eKlp.getText()+"' )");
							sql.add(sql1);							
							//if mysql langsung														
							var data = value.split("#");
							for (var i in data){
								sql2 = "insert into neraca(kode_neraca, kode_lokasi, kode_fs, nama, level_spasi, level_lap, tipe, sum_header, jenis_akun, kode_induk, rowindex, modul) values ";
								sql2 += " "+ data[i] +" ";
								sql.add(sql2);
							}	
							data = this.value2.split("#");
							for (var i in data){
								sql3 = "insert into relakun(kode_neraca, kode_fs, kode_akun, kode_lokasi) values ";
								if (data[i]) {
									sql3 += " "+ data[i] +" ;";
									sql.add(sql3);					
								}
							}							
						
							
							sql.add("insert into neraca(kode_neraca, kode_lokasi, kode_fs, nama, level_spasi, level_lap, tipe, sum_header, jenis_akun, kode_induk, rowindex, modul) "+
								" select distinct a.kode_neraca, b.kode_lokasi, a.kode_fs, a.nama, a.level_spasi, a.level_lap, a.tipe, a.sum_header, a.jenis_akun, a.kode_induk, a.rowindex, a.modul "+
								" from neraca a cross join lokasi b  where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_lokasi <> '"+this.app._lokasi+"' and a.modul = '"+modul+"' and a.kode_fs = '"+this.eKlp.getText()+"' ");
							
							sql.add("insert into relakun(kode_neraca, kode_fs, kode_akun, kode_lokasi) "+
								" select distinct a.kode_neraca, a.kode_fs, a.kode_akun, b.kode_lokasi "+
								" from relakun a cross join lokasi b  where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_lokasi <> '"+this.app._lokasi+"' and kode_fs = '"+this.eKlp.getText()+"' "+
								"and kode_neraca in (select distinct kode_neraca from neraca where modul = '"+modul+"'  and kode_fs = '"+this.eKlp.getText()+"' )");
							
							this.dblib.execArraySQL(sql);	
						}catch(e){
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
	entriesClick: function(sender,col,row){
		try
		{ 
		 	
				if (sender == this.addBtn ){
					uses("app_saku3_transaksi_belajar_fModalDet");
					// if (this.entryMenu == undefined)
					this.entryMenu = new app_saku3_transaksi_belajar_fModalDet(this.app,"");
					this.entryMenu.setTop((this.app._mainForm.height / 2) - 150);
					this.entryMenu.setLeft((this.app._mainForm.width / 2)- 200);			
					this.entryMenu.setHeight(300);
					this.entryMenu.setWidth(400);
					this.entryMenu.doAfterResize(this.entryMenu.width, this.entryMenu.height);

					this.selectedItem = undefined;		
					this.entryMenu.setCaption("Add Entries");			
										
					this.entryMenu.event = "Add";					
					// this.entryMenu.setItemParent(this.selectedItem);
					this.entryMenu.formRequester = this;
					this.entryMenu.e0.setReadOnly(false);
					this.entryMenu.e0.setText("");
					this.entryMenu.e1.setText("");
					this.entryMenu.showModal();
					
					// this.entryMenu.setModul(this.e0.getText());
					// var result = this.getSummary("");
					// result += ";-";
					// result = result.substr(1);
					// var resArray = result.split(";");
					// var resArray= [];
					// this.entryMenu.setSummaryItems(resArray);
				}
				else if (sender == this.sg1 && this.sg1.cells(0,row) != ""){
					if (col == 6){
						uses("app_saku3_transaksi_belajar_fModalDet");
						// if (this.entryMenu == undefined)
						this.entryMenu = new app_saku3_transaksi_belajar_fModalDet(this.app,"");
						this.entryMenu.setTop((this.app._mainForm.height / 2) - 150);
						this.entryMenu.setLeft((this.app._mainForm.width / 2)- 200);			
						this.entryMenu.setHeight(300);
						this.entryMenu.setWidth(400);
						this.entryMenu.doAfterResize(this.entryMenu.width, this.entryMenu.height);
						// var item = this.treev.getSelectedItem();
						this.selectedItem = this.sg1.row;
						this.entryMenu.event = "Edit";					
						this.entryMenu.formRequester = this;
						this.entryMenu.setCaption("Edit Data");
						// this.entryMenu.setItemParent(item);
						this.entryMenu.e0.setText(this.sg1.cells(0,row));
						this.entryMenu.e0.setReadOnly(true);
						this.entryMenu.e1.setText(this.sg1.cells(1,row));
						this.entryMenu.e2.setText(this.sg1.cells(2,row));
						this.entryMenu.e3.setText(this.sg1.cells(3,row));
						this.entryMenu.e4.setText(this.sg1.cells(4,row));
						this.entryMenu.e5.setText(this.sg1.cells(5,row));

						this.entryMenu.showModal();		
					}
					if (col == 7){
						var item = this.sg1.row;
						this.selectedItem = item;
						var kode = this.sg1.cells(0,item);
						system.confirm(this, "Remove","Yakin data kode = "+kode+" akan dihapus?","");
					}
				}else if (sender == this.delBtn){
					var item = this.sg1.row;
					this.selectedItem = item;
					var kode = this.sg1.cells(0,item);
					system.confirm(this, "Remove","Yakin data kode = "+kode+" akan dihapus?","");
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
			result = result.substr(1);
			if (result != "''")
			{			
				result = "#(" + result + ")";
			}else result = "";
			
			var value = node.data2;		
			if (value != undefined && value != ""){
				
				for (var i in value.objList){				
					this.value2 += "#('"+node.getKode()+"','"+this.eKlp.getText()+"','" + value.get(i).get("kode_akun") +"','"+this.elokasi.getText()+"')";		
					this.listAkun += ",'" + value.get(i).get("kode_akun") +"'";
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
	},
	getDataAkun: function(node){
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
					this.listAkun += ",'" + value.get(i).get("kode_akun") +"'";
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
			result = value.get("tipe");
			if (result != "Summary")
				result = "";
			else result = ";" + value.get("kode_neraca");
					
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
											  ["kode_lokasi","nama"],"where", ["Lokasi","Nama"]);
		
	},
	doFindKlp: function(sender){	
		this.standarLib.showListDataFromItems(this, "Data Versi Neraca",this.eKlp, 
												  "select kode_fs, nama from fs where kode_lokasi = '"+this.elokasi.getText()+"' ",
												  "select count(*) from fs where kode_lokasi = '"+this.elokasi.getText()+"' ",
											  ["kode_fs","nama"],"and",["Kode FS","Nama"]);	
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
			chld.data.set("kode_neraca",temp.getKode());					
			chld.data.set("nama",temp.getCaption());
			chld.data.set("level_lap",temp.getKodeForm());		
			if (temp.childs.getLength() != 0)
			{
				this.copyChilds(temp,chld);
			}
		}
		from.clearChild();
		to.setShowKode(true);
	},
	doEditChange: function(sender){
		this.eKlp.setText("");
		this.treev.clear();
	},
	switchItem: function(from, to){
		var item = from; var child = to;
		var data,data2,  kdForm, kd,  caption, tmp;
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
		child.data.set("kode_neraca",item.getKode());					
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
		var tmp = "";
		child.setKodeForm(item.getKodeForm());
		child.setKode(item.getKode());
		child.setCaption(item.getCaption());				
		child.setShowKode(item.showKode);
		child.data = item.data;
		child.data2 = item.data2;
		child.data.set("kode_neraca",item.getKode());					
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
	}
});
