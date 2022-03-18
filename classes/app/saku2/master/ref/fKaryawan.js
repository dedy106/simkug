window.app_saku2_master_ref_fKaryawan = function(owner)
{
	if (owner)
	{
		window.app_saku2_master_ref_fKaryawan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_master_ref_fKaryawan";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Karyawan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.cb_lokasi = new saiCBBL(this,{bound:[20,17,200,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_pp = new saiCBBL(this,{bound:[20,18,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_jabatan = new saiLabelEdit(this,{bound:[20,13,400,20],caption:"Jabatan", maxLength:150, tag:1});		
		this.c_band = new saiCB(this,{bound:[20,22,202,20],caption:"Band",items:["01","02","03","04","05","06","07","11","12","13","14","15"], readOnly:true,tag:2});		
		this.e_alamat = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Alamat", maxLength:150, tag:1});	
		this.e_kota = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Kota", maxLength:50, tag:1});	
		this.e_kodepos = new saiLabelEdit(this,{bound:[240,13,180,20],caption:"Kode Pos", maxLength:5, tipeText:ttAngka, tag:1});	
		this.e_telp = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"No Telpon", maxLength:50, tag:1});	
		this.e_npwp = new saiLabelEdit(this,{bound:[20,17,300,20],caption:"NPWP", maxLength:50, tag:1});	
		this.e_bank = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Bank", maxLength:50, tag:1});	
		this.e_cabang = new saiLabelEdit(this,{bound:[20,20,400,20],caption:"Cabang", maxLength:50, tag:1});	
		this.e_norek = new saiLabelEdit(this,{bound:[20,21,300,20],caption:"No Rekening", maxLength:50, tag:1});	
		this.e_namarek = new saiLabelEdit(this,{bound:[20,22,300,20],caption:"Nama Rekening", maxLength:50, tag:1});	
		
		this.bTampil = new button(this,{bound:[829,22,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,900,203],caption:"Daftar Karyawan"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,895,150],tag:9,readOnly:true,
			colTitle: ["NIK","Nama","Lokasi","PP","Alamat","Kota","Kode Pos","No Telpon","NPWP","Bank","Cabang","No Rekening","Nama Rekening","Jabatan"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,178,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi",["kode_lokasi","nama"],false,["Kode","Nama"],"where","Data Lokasi",true);
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_master_ref_fKaryawan.extend(window.childForm);
window.app_saku2_master_ref_fKaryawan.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into karyawan(nik,nama,kode_lokasi,alamat,kota,kode_pos,no_telp,npwp,bank,cabang,no_rek,nama_rek,kode_pp,jabatan,grade) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_lokasi.getText()+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_kodepos.getText()+"','"+this.e_telp.getText()+"','"+this.e_npwp.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.cb_pp.getText()+"','"+this.e_jabatan.getText()+"','"+this.c_band.getText()+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update karyawan set nama='"+this.e_nama.getText()+"',alamat='"+this.e_alamat.getText()+"',kota='"+this.e_kota.getText()+"',kode_pos='"+this.e_kodepos.getText()+"',no_telp='"+this.e_telp.getText()+"',npwp='"+this.e_npwp.getText()+"',bank='"+this.e_bank.getText()+"',cabang='"+this.e_cabang.getText()+"',no_rek='"+this.e_norek.getText()+"',nama_rek='"+this.e_namarek.getText()+"',kode_pp='"+this.cb_pp.getText()+"',kode_lokasi='"+this.cb_lokasi.getText()+"', jabatan='"+this.e_jabatan.getText()+"',grade='"+this.c_band.getText()+"' "+
					        "where nik = '"+this.cb_kode.getText()+"'");
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from karyawan where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
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
			if (sender == this.cb_lokasi && this.cb_lokasi.getText() != ""){				
				this.cb_pp.setSQL("select kode_pp, nama from pp where tipe = 'posting' and kode_lokasi='"+this.cb_lokasi.getText()+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			}
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.nama,a.alamat,a.kota,a.kode_pos,a.no_telp,a.npwp,a.bank,a.cabang,a.no_rek,a.nama_rek,a.kode_pp,b.nama as nama_pp,a.kode_lokasi,c.nama as nama_lokasi, a.jabatan,a.grade "+
				           " from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						   "                 inner join lokasi c on c.kode_lokasi=b.kode_lokasi "+
						   "where a.nik ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_lokasi.setText(line.kode_lokasi,line.nama_lokasi);
						this.cb_pp.setText(line.kode_pp,line.nama_pp);
						this.e_nama.setText(line.nama);
						this.e_jabatan.setText(line.jabatan);
						this.e_alamat.setText(line.alamat);
						this.e_kota.setText(line.kota);
						this.e_kodepos.setText(line.kode_pos);
						this.e_telp.setText(line.no_telp);
						this.e_npwp.setText(line.npwp);
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.c_band.setText(line.grade);
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select a.nik,a.nama,a.kode_lokasi+'-'+c.nama as lokasi,a.kode_pp+'-'+b.nama as pp,a.alamat,a.kota,a.kode_pos,a.no_telp,a.npwp,a.bank,a.cabang,a.no_rek,a.nama_rek, a.jabatan "+
			                             "from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
										 "                inner join lokasi c on c.kode_lokasi=b.kode_lokasi "+
										 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_lokasi,a.kode_pp,a.nik");
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
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(nik) from karyawan where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["nik","nama"],"and",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (NIK : "+ this.cb_kode.getText()+")");							
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
