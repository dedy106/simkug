window.app_saku2_transaksi_aka_fJurusanTU = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fJurusanTU.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_fJurusanTU";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Program Pendidikan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");		
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:100});		
		this.cb_pp = new saiCBBL(this,{bound:[20,21,200,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:2});
		this.c_tahun = new saiCB(this,{bound:[20,22,180,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_drktagih = new saiCBBL(this,{bound:[20,20,200,20],caption:"DRK Tagihan", multiSelection:false, maxLength:10, tag:2});
		this.cb_drk = new saiCBBL(this,{bound:[20,23,200,20],caption:"DRK Amortisasi", multiSelection:false, maxLength:10, tag:2});
		this.cb_fak = new saiCBBL(this,{bound:[20,21,200,20],caption:"Fakultas", multiSelection:false, maxLength:10, tag:2});
		this.bTampil = new button(this,{bound:[729,21,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,800,410],caption:"Daftar Prodi"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,795,357],tag:9,readOnly:true,colTitle: ["Kode","Nama","Kode PP","Nama PP","DRK Tagih","Nama DRK","DRK Amor","Nama DRK","Tahun","Fakultas"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,385,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where tipe = 'posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Daftar PP",true);
			this.cb_fak.setSQL("select kode_fakultas, nama from aka_fakultas where kode_lokasi='"+this.app._lokasi+"'",["kode_fakultas","nama"],false,["Kode","Nama"],"and","Daftar Fakultas",true);
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_fJurusanTU.extend(window.childForm);
window.app_saku2_transaksi_aka_fJurusanTU.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into aka_jurusan(kode_jur,nama,kode_lokasi,kode_pp,kode_drktagih,kode_drk,tahun,kode_fakultas) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_drktagih.getText()+"','"+this.cb_drk.getText()+"','"+this.c_tahun.getText()+"','"+this.cb_fak.getText()+"')");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update aka_jurusan set kode_pp='"+this.cb_pp.getText()+"',nama = '"+this.e_nama.getText()+"',kode_drktagih='"+this.cb_drktagih.getText()+"',kode_drk='"+this.cb_drk.getText()+"',tahun='"+this.c_tahun.getText()+"',kode_fakultas='"+this.cb_fak.getText()+"' where kode_jur = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from aka_jurusan where kode_jur = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
				setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode) {
				if (this.cb_kode.getText() != ""){
					var data = this.dbLib.getDataProvider("select a.nama,a.kode_pp,b.nama as nama_pp,a.tahun,a.kode_drk,c.nama as nama_drk,a.kode_drktagih,d.nama as nama_drktagih,a.kode_fakultas "+
							   " from aka_jurusan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							   "                    inner join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+
							   "                    inner join drk d on a.kode_drktagih=d.kode_drk and a.kode_lokasi=d.kode_lokasi and a.tahun=d.tahun "+							   
							   "where a.kode_jur ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.e_nama.setText(line.nama);
							this.cb_pp.setText(line.kode_pp,line.nama_pp);
							this.cb_fak.setText(line.kode_fakultas);
							this.c_tahun.setText(line.tahun);
							this.cb_drktagih.setText(line.kode_drktagih,line.nama_drktagih);							
							this.cb_drk.setText(line.kode_drk,line.nama_drk);							
							setTipeButton(tbUbahHapus);
						}
						else{
							setTipeButton(tbSimpan);
						}
					}
				}
			}
			if (sender == this.c_tahun && this.c_tahun.getText()!="") {				
				this.cb_drktagih.setSQL("select kode_drk, nama from drk where tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);
				this.cb_drk.setSQL("select kode_drk, nama from drk where tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select a.kode_jur,a.nama,a.kode_pp,b.nama as nama_pp,a.kode_drktagih,d.nama as nama_drktagih,a.kode_drk,c.nama as nama_drk,a.tahun,e.kode_fakultas+' - '+e.nama as fakultas "+
			           "from aka_jurusan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi = b.kode_lokasi "+
					   "                   inner join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+
					   "                   inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and a.tahun=d.tahun "+
					   "                   inner join aka_fakultas e on a.kode_fakultas=e.kode_fakultas and a.kode_lokasi=e.kode_lokasi "+
					   "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_jur");
			if (temp instanceof arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Referensi",sender,undefined, 
											  "select kode_jur, nama  from aka_jurusan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_jur) from aka_jurusan where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_jur","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page) {
		this.sg1.selectPage(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});