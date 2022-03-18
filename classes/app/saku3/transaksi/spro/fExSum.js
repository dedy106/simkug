window.app_saku3_transaksi_spro_fExSum = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spro_fExSum.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_spro_fExSum";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Setting Struktur Executive Summary", 0);	
		
		this.maximize();
		uses("saiCBBL;util_standar;treeView;treeNode");
		
		this.elokasi = new saiCBBL(this,{bound:[20,25,150,20], caption:"Lokasi", multiSelection:false, 
			sql:["select kode_lokasi, nama from lokasi  ", ["kode_lokasi","nama"], false, ["Kode Lokasi", "Nama"], "and", "Daftar Lokasi", true]
		});				
		
		if (this.app._userStatus !="A"){
			this.elokasi.setReadOnly(true);			
		}
		this.eKlp = new saiCBBL(this,{bound:[20, 11, 200, 20], caption:"Model Report", multiSelection:false, 
			sql:["select kode_fs, nama from fs where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_fs","nama"], false, ["Kode fs","Nama"],"and","Daftar Model Laporan",true]
		});					
		this.e0 = new saiCB(this,{bound:[20,12,200,20], caption:"Tipe B/S PL", items:["AKTIVA","PASIVA","LABARUGI","MODAL"]});						
		this.btn = new button(this,{bound:[220,12,70,18], caption:"Reload", icon:"icon/reload.png", click:"doClick"});								
		this.addBtn = new button(this,{bound:[27,13,20,20],caption:" ", icon:"icon/plus.png", hint:"Tambah Item",showHint:true, click:[this,"entriesClick"]});				
		this.editBtn = new button(this,{bound:[50,13,20,20],caption:" ",icon:"icon/edit.png", hint:"Edit Item",showHint:true, click:[this,"entriesClick"]});				
		this.delBtn = new button(this,{bound:[73,13,20,20],caption:" ",icon:"icon/minus.png", hint:"Hapus Item",showHint:true, click:[this,"entriesClick"]});		
		this.relBtn = new button(this,{bound:[96, 13, 20, 20], caption:" ", icon:"icon/link.png", hint:"Relasi Akun",showHint:true, click:[this,"entriesClick"]});		
		this.downBtn = new button(this,{bound:[119,13,20,20],caption:" ", icon:"icon/down.png", hint:"Turun",showHint:true, click:[this,"entriesClick"]});				
		this.upBtn = new button(this,{bound:[142,13,20,20], caption:" ", icon:"icon/up.png", hint:"Naik",showHint:true, click:[this,"entriesClick"]});		
		this.leftBtn = new button(this,{bound:[165,13,20,20], caption:" ", icon:"icon/left.png", hint:"Geser Kiri(keluar dari Sub Item)",showHint:true, click:[this,"entriesClick"]});				
		this.rightBtn = new button(this,{bound:[188,13,20,20],caption:" ", icon:"icon/right.png", hint:"Geser Kanan(menjadi Sub Item)",showHint:true, click:[this,"entriesClick"]});								
		this.rootBtn = new button(this,{bound:[211,13,20,20], caption:"Tidak ada yang pilih", caption:" ",icon:"icon/gear.png", click:[this,"entriesClick"]});						
		this.pasteBtn = new button(this,{bound:[800,13,100,20], caption:"Paste Editor", icon:"icon/paste2.png", click:[this,"entriesClick"]});				
		this.bCari = new button(this,{bound:[700, 13,80,20], caption:"Cari Akun", icon:"icon/magnifier.png",click:[this, "doShowFindAkun"]});		            
			
		this.treev = new treeView(this,{bound:[20,14,900,this.getHeight() - 130], dblClick:[this,"treeClick"]});
		this.treev.childLength = 700;				
		//this.treev.setShadow(true);
		this.dblib = new util_dbLib();
		this.dblib.addListener(this);
		this.menuStr = "";
		
		this.rearrangeChild(20,23);
		this.pFindAkun = new panel(this, {bound:[600, this.treev.top, 250,80],caption:"Cari Akun", color:"#eee", visible:false});
            this.eAkun = new saiLabelEdit(this.pFindAkun, {bound:[20,25,200,20],caption:"Akun"});
            this.bFind = new button(this.pFindAkun,{bound:[20,48,80,20],caption:"Cari",icon:"icon/magnifier.png",click:[this, "doFindAkun"]});
			this.cariAkun = false;

		this.standarLib = new util_standar();
		
		
		this.rowIndex = -1;
		this.setTabChildIndex();
		this.standarLib.clearByTag(this, new Array("0"), this.e0);
		this.elokasi.setText(this.app._lokasi);		
		this.elokasi.onChange.set(this,"doEditChange");
		this.captionConf = new arrayMap();
		this.captionConf.set(this.addBtn.getFullId(), "Tambah");
		this.captionConf.set(this.editBtn.getFullId(), "Edit");
		this.captionConf.set(this.delBtn.getFullId(), "Hapus");
		this.captionConf.set(this.relBtn.getFullId(), "Relasi");
		this.captionConf.set(this.downBtn.getFullId(), "Turun");
		this.captionConf.set(this.upBtn.getFullId(), "Naik");
		this.captionConf.set(this.leftBtn.getFullId(), "Kiri");
		this.captionConf.set(this.rightBtn.getFullId(), "Kanan");
		this.captionConf.set(this.rootBtn.getFullId(), "Root");
		this.listAllAkunRelasi = [];
		this.dataAkun = new arrayMap();
		this.akunBaru = new arrayList();
		var data = this.dblib.getDataProvider("select kode_akun from masakun where kode_lokasi = '"+this.app._lokasi+"' ",true);
		if (typeof data != 'string'){
			for (var i = 0; i < data.rs.rows.length; i++){
				var line = data.rs.rows[i];
				this.dataAkun.set(line.kode_akun, line.kode_akun);
			}

		}

	}
};
window.app_saku3_transaksi_spro_fExSum.extend(window.childForm);
window.app_saku3_transaksi_spro_fExSum.implement({
	doShowFindAkun: function(){
		if (this.pFindAkun.visible)
			this.pFindAkun.hide();
		else this.pFindAkun.show();
	},
	doFindAkun: function(){
		try{
			showLoading();
			/*var data =this.dblib.getDataProvider("select a.kode_akun, a.nama, b.kode_neraca, c.nama as nmneraca "+
					" from masakun a "+
					" inner join relakun b on b.kode_akun = a.kode_akun and b.kode_fs = '"+this.eKlp.getText()+"' "+
					" inner join neraca c on c.kode_neraca = b.kode_neraca "+
					" where a.kode_akun = '"+this.eAkun.getText()+"' ", true)*/
			this.akunKetemu = false;
			this.traversalAkun(this.treev, this.eAkun.getText());
			if (this.akunKetemu){
				this.cariAkun = true;
				this.traversalTree(this.treev, this.kodeNeraca);
			}else {
				var data =this.dblib.getDataProvider("select a.kode_akun, a.nama  "+
					" from masakun a "+
					" where a.kode_akun = '"+this.eAkun.getText()+"' ", true);
				if (data.rs.rows[0])
					var namaAkun = data.rs.rows[0].nama;
				else var namaAkun = "";
				system.info(this, "Akun tidak ditemukan di dalam relasi.<br>Akun masih belum terelasi.<br>"+this.eAkun.getText()+" - "+namaAkun);
			}
			hideLoading();
		}catch(e){
			hideLoading();
			error_log(e);
		}
	},
	traversalAkun: function(node, akun){
		if (!this.akunKetemu){
			for (var i in node.childs.objList)
			{
				var child = system.getResource(node.childs.objList[i]);
				showLoading(child.getCaption());
				var value = child.data2;		
				if (value != undefined && value != ""){			
					for (var i in value.objList){						
						if ( akun == value.get(i).get("kode_akun") ){
							this.kodeNeraca = child.getKode();
							this.akunKetemu = true;
							break;
						}
					}
				}
				this.traversalAkun(child, akun);	
			}
		}

	},
	listAkunRelasi: function(node){
		for (var i in node.childs.objList)
			{
				var child = system.getResource(node.childs.objList[i]);
				var value = child.data2;		
				if (value != undefined && value != ""){			
					for (var i in value.objList){						
						this.listAllAkunRelasi.push(value.get(i).get("kode_akun"));
					}
				}
				this.listAkunRelasi(child);	
			}
	},
	traversalTree: function(node, kode){
		if (this.cariAkun){
			for (var i in node.childs.objList)
			{
				child = system.getResource(node.childs.objList[i]);
				
				if(child != undefined){
					if (child.kode == kode){
						while (node instanceof treeNode){
							node.expand();
							node = node.owner;
						}
						child.doSelect();
						this.entriesClick(this.relBtn);
						this.cariAkun = false;
						for (var i = 0; i < this.relakun.sg.getRowCount();i++){
							if (this.eAkun.getText() == this.relakun.sg.cells(0,i)){
								this.relakun.sg.goToRow(i);
								var node = $("#"+this.relakun.sg.getFullId()+"_row"+i);
	       	 						//node.focus();
	       	 						node.css({background:"#19acf5"});
								break;
							}
						}
						break;
					}else this.traversalTree(child, kode);
				}
			}
		}
	},
    rearrangeLeft : function(obj){
        /*var left = obj.left + obj.width + 3;
        if (obj == this.addBtn){
            this.editBtn.setLeft(left); left += 23;
            this.delBtn.setLeft(left); left += 23;
            this.relBtn.setLeft(left); left += 23;
            this.downBtn.setLeft(left); left += 23;
            this.upBtn.setLeft(left); left += 23;
            this.leftBtn.setLeft(left); left += 23;
            this.rightBtn.setLeft(left); left += 23;
            this.rootBtn.setLeft(left); left += 23;
        }else if (obj == this.editBtn){
            this.delBtn.setLeft(left); left += 23;
            this.relBtn.setLeft(left); left += 23;
            this.downBtn.setLeft(left); left += 23;
            this.upBtn.setLeft(left); left += 23;
            this.leftBtn.setLeft(left); left += 23;
            this.rightBtn.setLeft(left); left += 23;
            this.rootBtn.setLeft(left); left += 23;
        }else if (obj == this.delBtn){
            this.relBtn.setLeft(left); left += 23;
            this.downBtn.setLeft(left); left += 23;
            this.upBtn.setLeft(left); left += 23;
            this.leftBtn.setLeft(left); left += 23;
            this.rightBtn.setLeft(left); left += 23;
            this.rootBtn.setLeft(left); left += 23;
        }else if (obj == this.relBtn){
            this.downBtn.setLeft(left); left += 23;
            this.upBtn.setLeft(left); left += 23;
            this.leftBtn.setLeft(left); left += 23;
            this.rightBtn.setLeft(left); left += 23;
            this.rootBtn.setLeft(left); left += 23;
        }else if (obj == this.downBtn){
            this.upBtn.setLeft(left); left += 23;
            this.leftBtn.setLeft(left); left += 23;
            this.rightBtn.setLeft(left); left += 23;
            this.rootBtn.setLeft(left); left += 23;
        }else if (obj == this.upBtn){
            this.leftBtn.setLeft(left); left += 23;
            this.rightBtn.setLeft(left); left += 23;
            this.rootBtn.setLeft(left); left += 23;
        }else if (obj == this.leftBtn){
            this.rightBtn.setLeft(left); left += 23;
            this.rootBtn.setLeft(left); left += 23;
        }else if (obj == this.rightBtn){
            this.rootBtn.setLeft(left); left += 23;
        } */
    },
    doButtonMouseOver: function(sender){
        
      sender.setCaption(this.captionConf.get(sender.getFullId()));
      sender.setWidth(80);
      this.rearrangeLeft(sender);  
    },
    doButtonMouseOut: function(sender){
        
      sender.setCaption(" ");
      sender.setWidth(20);
      this.rearrangeLeft(sender);    
    },
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
				case "relakun":
					if (modalResult == mrOk)
					{
						uses("arrayMap");								
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
							  node = new treeNode(this.treev);
							  induk = "00";
							}else
							{
							  node = new treeNode(this.selectedItem);
							  induk = this.selectedItem.getKode();
							}
							node.setKode(valArray[0]);
							node.setCaption(valArray[1]);	
							node.setKodeForm(valArray[2]);
							node.setShowKode(true);
							var lvl = node.getLevel() - 1;
							uses("arrayMap");												
							var data = new arrayMap();
							data.set("kode_neraca",valArray[0]);
							data.set("kode_lokasi",this.elokasi.getText());	
							data.set("kode_fs",this.eKlp.getText());	
							data.set("nama",valArray[1]);
							data.set("level_spasi",lvl);
							data.set("level_lap",valArray[2]);
							data.set("tipe",valArray[3]);
							data.set("sum_header",valArray[4]);	
							data.set("jenis_akun",valArray[5]);	
							data.set("kode_induk",induk);							
							data.set("rowindex",induk);		
							data.set("modul",this.e0.getText());														
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
						data.set("kode_neraca",valArray[0]);					
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
						this.e0.clear();				
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
							var sql2,sql1 = "delete from neraca where modul = '"+modul+"'  and kode_fs = '"+this.eKlp.getText()+"' and kode_lokasi ='"+this.elokasi.getText()+"' ";	
							var sql = new server_util_arrayList();
							sql.add("delete from relakun  where  kode_fs = '"+this.eKlp.getText()+"' "+
								"and kode_neraca in (select distinct kode_neraca from neraca where modul = '"+modul+"'  and kode_fs = '"+this.eKlp.getText()+"' and kode_lokasi ='"+this.elokasi.getText()+"' ) and kode_lokasi ='"+this.elokasi.getText()+"'");
							sql.add(sql1);							
							//if mysql langsung		
							for (var i=0; i < this.akunBaru.getLength(); i++){
								var akun = this.akunBaru.get(i);
								sql.add("insert into masakun(kode_akun,kode_lokasi,nama,modul,jenis,kode_curr,block,status_gar)"+
										"	values('"+akun.kode+"','"+this.elokasi.getText()+"','"+akun.uraian+"','"+modul+"','"+akun.jenis+"','IDR','0','0')");
								
							}
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
									sql3 += " "+ data[i] +" ";
									sql.add(sql3);					
								}
							}							
							/*sql.add("insert into neraca(kode_neraca, kode_lokasi, kode_fs, nama, level_spasi, level_lap, tipe, sum_header, jenis_akun, kode_induk, rowindex, modul) "+
								" select distinct a.kode_neraca, b.kode_lokasi, a.kode_fs, a.nama, a.level_spasi, a.level_lap, a.tipe, a.sum_header, a.jenis_akun, a.kode_induk, a.rowindex, a.modul "+
								" from neraca a cross join lokasi b  where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_lokasi <> '"+this.app._lokasi+"' and a.modul = '"+modul+"' ");
							
							sql.add("insert into relakun(kode_neraca, kode_fs, kode_akun, kode_lokasi) "+
								" select distinct a.kode_neraca, a.kode_fs, a.kode_akun, b.kode_lokasi "+
								" from relakun a cross join lokasi b  where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_lokasi <> '"+this.app._lokasi+"' "+
								"and kode_neraca in (select distinct kode_neraca from neraca where modul = '"+modul+"'  and kode_fs = '"+this.eKlp.getText()+"' )");
							*/
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
			var line, ix = -1, nrcRls, lineData, nrc_d = this.dblib.loadQuery("select kode_neraca, kode_akun from relakun where kode_lokasi ='"+this.elokasi.getText()+"' and kode_fs = '"+this.eKlp.getText()+"' order by kode_neraca");															
			var kdNrc = '-', dataRelakun = new arrayMap();
			nrcRls = new arrayMap();
			if (nrc_d != ""){					
				nrc_d = nrc_d.split("\r\n");							
				for (var c = 1; c < nrc_d.length;c++){
					line = new arrayMap();
					lineData = nrc_d[c].split(";");				
					if (lineData[0] != kdNrc){
						kdNrc = lineData[0];
						nrcRls = new arrayMap();
						dataRelakun.set(kdNrc,nrcRls);					
						ix = -1;
					}	
					line.set("kode_akun",lineData[1]);								
					ix++;
					nrcRls.set(ix,line);
				}
			}
					
			//while (rowNo < menu.getLength())
			for (var r in menu.objList)
			{
				itemValues = menu.objList[r];			
				kode = itemValues.get("kode_neraca");							
				if (kode != "")
				{
					nama = itemValues.objList["nama"];
					levelLap = itemValues.objList["level_lap"];
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
					node.setKodeForm(levelLap);
					node.setKode(kode);
					node.setCaption(nama);
					node.setShowKode(true);
					node.data = itemValues;
					var data2 = new arrayMap();
					data2 = dataRelakun.get(kode);				
					node.data2 = data2;
				}
				rowNo++;
			}
			system.hideProgress();
		}catch(e)
		{
			systemAPI.alert("row "+ rowNo +" : "+e);
		}
	},
	doClick: function(sender){
		try{
			if (this.e0.getText() != "")
			{
				var modul = this.e0.getText();
				var nrc = this.dblib.runSQL("select distinct * from neraca where Modul = '"+modul+"' and kode_fs = '"+this.eKlp.getText()+"' and kode_lokasi = '"+this.elokasi.getText()+"'  order by rowindex",0,0);
				this.loadMenu(nrc);
			}	
		}catch(e){
			error_log(e);
		}
	},
	doSystemPaste: function(str){
		try{
			var line,rows = str.split("\n");
			var dataRelakun = new arrayMap();
			this.treev.clear();
			this.akunBaru = new arrayList();
			for (var i in rows){
				if (rows[i] == "") continue;
				line = rows[i];			
				var dataTmp = line.split("\t");
				for (var dt=0; dt < dataTmp.length; dt++){
					if (dataTmp[dt] == "") dataTmp[dt] = "-";
				}
				if (dataTmp[4].toUpperCase() == 'AKUN') //akun
				{
					var akun = new arrayMap();
					akun.set("kode_akun", dataTmp[0]);
					dataAkun.set(ix, akun);
					if (this.dataAkun.get(dataTmp[0]) == undefined){
						this.akunBaru.add({	kode : dataTmp[0],
											uraian : dataTmp[1],
											jenis : dataTmp[3].substr(0,1)
										 });
						this.dataAkun.set(dataTmp[0],dataTmp[0]);
					}
					ix++;
				}else {	
					var node, itemValues =new arrayMap();
					itemValues.set("kode_neraca", dataTmp[0]);
					itemValues.set("kode_lokasi",this.elokasi.getText());
					itemValues.set("kode_fs",this.eKlp.getText());
					itemValues.set("nama", trim(dataTmp[1]) );
					itemValues.set("level_spasi", parseFloat(dataTmp[2]));
					itemValues.set("level_lap",1);//tipe, sum_header, jenis_akun, kode_induk, rowindex, modul
					itemValues.set("tipe",dataTmp[4]);
					itemValues.set("sum_header",dataTmp[5]);
					itemValues.set("jenis_akun",dataTmp[3]);
					itemValues.set("kode_induk","-");
					itemValues.set("rowindex",0);
					itemValues.set("modul", this.e0.getText());
					var dataAkun = new arrayMap();
					var ix = 0;
					var kode = dataTmp[0];
					var nama = dataTmp[1];
					var level = dataTmp[2];
					var levelLap = 1;
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
					node.setKodeForm(levelLap);
					node.setKode(kode);
					node.setCaption(nama);
					node.setShowKode(true);
					node.data = itemValues;
					node.data2 = dataAkun;
				}
			}		
			
		}catch(e){
			system.alert(this,e,"");
		}
	},
	entriesClick: function(sender){
		try
		{ 
			if (sender == this.pasteBtn){
				uses("system_fPaste",true);
				system.showPasteEditor(this);
				return;
			}
		 	if (sender == this.relBtn)
			{
				this.listAkun = "";
				this.getDataAkun(this.treev);
				if (this.listAkun != "")
					this.listAkun = this.listAkun.substr(1);			
				this.selectedItem = this.treev.getSelectedItem();
				this.listAllAkunRelasi = [];
				this.listAkunRelasi(this.treev);			
				//if (this.selectedItem.data.get("tipe").toLowerCase() == "posting")
				{
					uses("app_saku2_master_gl_fRelakun",true);
					if (this.relakun != undefined)
						this.relakun.free();
					this.relakun = new app_saku2_master_gl_fRelakun(this.app);
					this.relakun.setHeight(400);
					this.relakun.setWidth(800);
					this.relakun.elokasi = this.elokasi.getText();
					this.relakun.fs = this.eKlp.getText();	
					this.relakun.setTop((this.app._mainForm.height / 2) - 150);
					this.relakun.setLeft((this.app._mainForm.width / 2)- 400);
					
					this.relakun.doAfterResize(this.relakun.width, this.relakun.height);
					this.relakun.formRequester = this;
					this.relakun.setCaption(this.selectedItem.getCaption());
					this.relakun.listAkun = this.selectedItem.data2;			
					this.relakun.modul = this.e0.getText();
					this.relakun.allSelectAkun = this.listAllAkunRelasi;			
					this.relakun.show();
				}//system.alert(this,"Hanya yang bertipe posting saja yang bisa direlasikan dengan akun");
			}else
			{
				if (sender == this.addBtn || sender == this.editBtn){
					uses("app_saku3_transaksi_spro_fExSumD", true);
					if (this.entryMenu != undefined) this.entryMenu.free();
					this.entryMenu = new app_saku3_transaksi_spro_fExSumD(this.app,this.e0.getText());
					this.entryMenu.setTop((this.app._mainForm.height / 2) - 150);
					this.entryMenu.setLeft((this.app._mainForm.width / 2)- 200);			
					this.entryMenu.setHeight(300);
					this.entryMenu.setWidth(400);
					this.entryMenu.doAfterResize(this.entryMenu.width, this.entryMenu.height);
					this.entryMenu.setModul(this.e0.getText());
					var result = this.getSummary(this.treev);
					result += ";-";
					result = result.substr(1);
					var resArray = result.split(";");
					this.entryMenu.setSummaryItems(resArray);
				}
				if (sender == this.addBtn){
					var item = this.treev.getSelectedItem();
					if (item != undefined){
						this.selectedItem = item;		
						this.entryMenu.setCaption(item.getCaption());						
					}else{
						this.selectedItem = undefined;		
						this.entryMenu.setCaption("Create Entries");			
					}					
					this.entryMenu.event = "Add";					
					this.entryMenu.setItemParent(this.selectedItem);
					this.entryMenu.formRequester = this;
					//this.entryMenu.e0.setReadOnly(false);
					this.entryMenu.e0.setText("");
					this.entryMenu.e1.setText("");
					this.entryMenu.showModal();		
				}else if (sender == this.editBtn){
					var item = this.treev.getSelectedItem();
					this.selectedItem = item;
					this.entryMenu.event = "Edit";					
					this.entryMenu.formRequester = this;
					this.entryMenu.setCaption(item.getCaption());
					this.entryMenu.setItemParent(item);
					this.entryMenu.e0.setText(item.getKode());
					//this.entryMenu.e0.setReadOnly(true);
					this.entryMenu.e1.setText(trim(item.getCaption()));
					this.entryMenu.e2.setText(item.getKodeForm());
					this.entryMenu.e3.setText(item.data.get("tipe"));
					this.entryMenu.e4.setText(item.data.get("sum_header"));
					this.entryMenu.e5.setText(item.data.get("jenis_akun"));
					this.entryMenu.showModal();		
				}else if (sender == this.delBtn){
					var item = this.treev.getSelectedItem();	
					this.selectedItem = item;
					system.confirm(this, "Remove","Yakin data "+item.getCaption()+" akan dihapus?");
				}else if (sender == this.rootBtn){
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
		if (node instanceof treeView)
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
		this.standarLib.showListDataFromItems(this, "Data Versi neraca",this.eKlp, 
												  "select kode_fs, nama from fs where kode_lokasi = '"+this.elokasi.getText()+"' ",
												  "select count(*) from fs where kode_lokasi = '"+this.elokasi.getText()+"' ",
											  ["kode_fs","nama"],"and",["Kode fs","Nama"]);	
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
		var child = new treeNode(owner);
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
			tmp = new treeNode(this.treev);
			this.copyChilds(item, tmp);	
		}									
		if (tmp instanceof treeNode)
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
