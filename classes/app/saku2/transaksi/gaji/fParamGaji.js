window.app_saku2_transaksi_gaji_fParamGaji = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gaji_fParamGaji.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gaji_fParamGaji";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Gaji", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.c_tahun = new saiCB(this,{bound:[20,22,182,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Kode Param",btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"],maxLength:20});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama Param", maxLength:100});			
		this.c_dc = new saiCB(this,{bound:[20,12,150,20],caption:"D/C",items:["D","C"], readOnly:true,tag:2});
		this.c_jenis = new saiCB(this,{bound:[20,13,150,20],caption:"Jenis",items:["I","R","L"], readOnly:true,tag:2});  //I = Input, R = Rumus, L = Load .. L di reset setalah hitung gaji jadi nol (0)
		this.c_pajak = new saiCB(this,{bound:[20,14,150,20],caption:"Flag Pajak",items:["1","0"], readOnly:true,tag:2}); //penghasilan kena pajak		
		this.c_dplk = new saiCB(this,{bound:[20,18,150,20],caption:"DPLK",items:["1","0"], readOnly:true,tag:2});        //penghasilan rumus dplk		
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Akun Gaji", multiSelection:false,tag:1});
		this.cb_drk = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"DRK", multiSelection:false,tag:1});		
		
		this.e_bank = new portalui_saiLabelEdit(this,{bound:[20,11,300,20],caption:"Nama Bank", maxLength:50});			
		this.e_cabang = new portalui_saiLabelEdit(this,{bound:[420,11,300,20],caption:"Cabang", maxLength:150});			
		this.e_norek = new portalui_saiLabelEdit(this,{bound:[20,16,300,20],caption:"No Rekening", maxLength:50});			
		this.e_namarek = new portalui_saiLabelEdit(this,{bound:[420,16,300,20],caption:"Nama Rekening", maxLength:150});			
		this.e_nilaitunj = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"N. Tunjangan", tag:1, tipeText:ttNilai, text:"0"});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Nilai Adm", tag:1, tipeText:ttNilai, text:"0"});
		this.e_nilaifix = new saiLabelEdit(this,{bound:[20,20,200,20],caption:"Nilai Fixed", tag:1, tipeText:ttNilai, text:"0"});
		this.c_bulan = new saiCB(this,{bound:[20,22,200,20],caption:"Bulan",items:["-","01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:2});
		this.bTampil = new portalui_button(this,{bound:[829,22,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,900,430],caption:"Daftar Parameter Gaji"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,895,400],colCount:16,tag:9,
		            colTitle:["Kode Param","Nama","D/C","Jenis","Sts Pajak","Sts DPLK","Kode Akun","Nama Akun","Kode DRK","Nama DRK","Tahun","Bank","Cabang","No Rekening","Nama Rekening","Nilai Adm","Bulan","Nilai Fixed"],
					colWidth:[[16,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,100,100,100,100,50,150,80,150,80,60,60,60,50,200,80]],
					readOnly:true,defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,425,899,25],buttonStyle:3,grid:this.sg});	
			
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}		
			this.c_tahun.setText("");
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gaji_fParamGaji.extend(window.portalui_childForm);
window.app_saku2_transaksi_gaji_fParamGaji.implement({
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
					sql.add("insert into hr_gaji_param(kode_param,kode_lokasi,nama,dc,kode_akun,kode_drk,jenis,flag_pajak,flag_dplk,tahun,bank,cabang,no_rek,nama_rek,nilai_adm,bulan,nilai_fix,flag_rutin,flag_rumus,nilai_tunj) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.c_dc.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.c_jenis.getText()+"','"+this.c_pajak.getText().substr(0,1)+"','"+this.c_dplk.getText().substr(0,1)+"','"+this.c_tahun.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.c_bulan.getText()+"',"+parseNilai(this.e_nilaifix.getText())+",'1','1',"+nilaiToFloat(this.e_nilaitunj.getText())+")");
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
					sql.add("update hr_gaji_param set bulan='"+this.c_bulan.getText()+"',nilai_fix="+parseNilai(this.e_nilaifix.getText())+",tahun='"+this.c_tahun.getText()+"',kode_drk='"+this.cb_drk.getText()+"',flag_pajak='"+this.c_pajak.getText().substr(0,1)+"',flag_dplk='"+this.c_dplk.getText().substr(0,1)+"',jenis='"+this.c_jenis.getText()+"',dc='"+this.c_dc.getText()+"',nama='"+this.e_nama.getText()+"',kode_akun='"+this.cb_akun.getText()+"',bank='"+this.e_bank.getText()+"',cabang='"+this.e_cabang.getText()+"',no_rek='"+this.e_norek.getText()+"',nama_rek='"+this.e_namarek.getText()+"',nilai_tunj="+nilaiToFloat(this.e_nilaitunj.getText())+"   "+
						    "where kode_param = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
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
					sql.add("delete from hr_gaji_param where kode_param = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
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
			if (sender == this.c_tahun && this.c_tahun.getText()!="") {
				this.cb_drk.setSQL("select kode_drk, nama from drk where tahun='"+this.c_tahun.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
			}
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.nama,a.dc,a.kode_akun,b.nama as nama_akun,a.jenis,a.flag_pajak,a.flag_dplk,a.tahun,a.kode_drk,isnull(c.nama,'-') as nama_drk,bank,cabang,no_rek,nama_rek,nilai_adm,bulan,nilai_fix,nilai_tunj "+
				           "from hr_gaji_param a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						   "                     left join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+
						   "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_param='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.c_dc.setText(line.dc);
						this.c_jenis.setText(line.jenis);
						this.c_pajak.setText(line.flag_pajak);
						this.c_dplk.setText(line.flag_dplk);
						this.cb_akun.setText(line.kode_akun,line.nama_akun);
						this.cb_drk.setText(line.kode_drk,line.nama_drk);						
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.c_bulan.setText(line.bulan);
						this.e_nilai.setText(floatToNilai(line.nilai_adm));
						this.e_nilaifix.setText(floatToNilai(line.nilai_fix));
						this.e_nilaitunj.setText(floatToNilai(line.nilai_tunj));
						setTipeButton(tbUbahHapus);
					}
					else{
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Parameter",sender,undefined, 
											  "select kode_param, nama  from hr_gaji_param where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_param) from hr_gaji_param where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_param","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){		
		var data = this.dbLib.getDataProvider("select a.kode_param, a.nama, a.dc, a.kode_akun, b.nama as nama_akun,a.jenis,a.flag_pajak,a.flag_dplk,a.kode_drk,isnull(c.nama,'-') as nama_drk,a.tahun,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai_adm,a.bulan,a.nilai_fix "+
			           "from hr_gaji_param a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					   "                     left join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+
					   "where a.kode_lokasi = '"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_param,line.nama,line.dc,line.jenis,line.flag_pajak,line.flag_dplk,line.kode_akun,line.nama_akun,line.kode_drk,line.nama_drk,line.tahun,line.bank,line.cabang,line.no_rek,line.nama_rek,line.nilai_adm,line.bulan,line.nilai_fix]);
			}
		} else this.sg.clear(1);									
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