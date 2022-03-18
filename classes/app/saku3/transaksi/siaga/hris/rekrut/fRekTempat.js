window.app_saku3_transaksi_siaga_hris_rekrut_fRekTempat = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_rekrut_fRekTempat.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_rekrut_fRekTempat";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penempatan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker;label");
		this.cb_nik = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,multiSelection:false, change:[this,"doChange"]});
		this.cb_sk = new saiCBBL(this,{bound:[20,11,300,20],caption:"No SK",maxLength:10,multiSelection:false, readOnly:true,change:[this,"doChange"]});
		this.e_tgl = new saiLabelEdit(this,{bound:[20,19,180,20],caption:"Tanggal SK", tag:1, readOnly:true, text:""});		
		this.cb_loker = new saiCBBL(this,{bound:[20,12,200,20],caption:"Loker",maxLength:10,multiSelection:false,tag:2});
		this.cb_grade = new saiCBBL(this,{bound:[20,13,200,20],caption:"Grade",maxLength:10,multiSelection:false,tag:2});
		this.cb_vendor = new saiCBBL(this,{bound:[20,14,200,20],caption:"Vendor",maxLength:10,multiSelection:false,tag:2});
		this.cb_dir = new saiCBBL(this,{bound:[20,15,200,20],caption:"Direktorat",maxLength:10,multiSelection:false,tag:2});
		this.cb_dept = new saiCBBL(this,{bound:[20,16,200,20],caption:"Departemen",maxLength:10,multiSelection:false,tag:2});
		this.cb_jab = new saiCBBL(this,{bound:[20,17,200,20],caption:"Jabatan",maxLength:10,multiSelection:false,tag:2});
		this.cb_sts = new saiCBBL(this,{bound:[20,18,200,20],caption:"Status",maxLength:10,multiSelection:false,tag:2});
		this.cb_nip = new saiCBBL(this,{bound:[20,20,200,20],caption:"NIP",maxLength:10,multiSelection:false, change:[this,"doTampilClick"],tag:1, readOnly:true});
				
		this.p1 = new panel(this,{bound:[10,21,900,203],caption:"Data Seleksi per NIP"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,895,150],readOnly:true,tag:9,
		colTitle: ["No Seleksi","Tanggal","No Referensi","Hadir","Hasil"]});		
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
			
			this.cb_nik.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Karyawan",true);
			this.cb_loker.setSQL("select kode_loker, nama from gr_loker where kode_lokasi='"+this.app._lokasi+"'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Loker",true);
			this.cb_grade.setSQL("select kode_grade, nama from gr_grade where kode_lokasi='"+this.app._lokasi+"'",["kode_grade","nama"],false,["Kode","Nama"],"and","Data Grade",true);
			this.cb_vendor.setSQL("select kode_vendor, nama from gr_vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
			this.cb_dir.setSQL("select kode_dir, nama from gr_dir where kode_lokasi='"+this.app._lokasi+"'",["kode_dir","nama"],false,["Kode","Nama"],"and","Data Direktorat",true);
			this.cb_dept.setSQL("select kode_dept, nama from gr_dept where kode_lokasi='"+this.app._lokasi+"'",["kode_dept","nama"],false,["Kode","Nama"],"and","Data Departemen",true);
			this.cb_jab.setSQL("select kode_jab, nama from gr_jab where kode_lokasi='"+this.app._lokasi+"'",["kode_jab","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);
			this.cb_sts.setSQL("select sts_sdm, nama from gr_status_sdm where kode_lokasi='"+this.app._lokasi+"'",["sts_sdm","nama"],false,["Kode","Nama"],"and","Data Status SDM",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_rekrut_fRekTempat.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_rekrut_fRekTempat.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_dinas(nik,no_sk,kode_lokasi,kode_loker,kode_grade,kode_vendor,kode_dir,kode_dept,kode_jab,kode_pb,sts_sdm,mk_tahun,mk_bulan,nik_user,tgl_input,flag_aktif,flag_form) values "+
						    "	('"+this.cb_nik.getText()+"','"+this.cb_sk.getText()+"','"+this.app._lokasi+"','"+this.cb_loker.getText()+"','"+this.cb_grade.getText()+"','"+this.cb_vendor.getText()+"','"+this.cb_dir.getText()+"','"+this.cb_dept.getText()+"','"+this.cb_jab.getText()+"','NON','"+this.cb_sts.getText()+"',0,0,'"+this.app._userLog+"',getdate(),'1','REKRUT')");
					
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update gr_dinas set  kode_loker='"+this.cb_loker.getText()+"',kode_grade='"+this.cb_grade.getText()+"',kode_vendor='"+this.cb_vendor.getText()+"',kode_dir='"+this.cb_dir.getText()+"',kode_dept='"+this.cb_dept.getText()+"',kode_jab='"+this.cb_jab.getText()+"',sts_sdm='"+this.cb_sts.getText()+"',nik_user='"+this.app._userLog+"',tgl_input=getdate() "+
						    "where no_sk='"+this.cb_sk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					sql.add("delete from gr_dinas where no_sk = '"+this.cb_sk.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1","2","9"),this.cb_nik);
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
			if (sender == this.cb_nik){
				if (this.cb_nik.getText() != "") {
					this.cb_sk.setSQL("select a.no_sk,a.nama,convert(varchar,a.tgl_masuk,103) as tanggal "+
					                  "from gr_sk a left join ("+
									  "	    select no_sk,kode_lokasi from gr_dinas where flag_form <> 'REKRUT' union "+
									  "     select no_sk,kode_lokasi from gr_rwyharga union "+
									  "     select no_sk,kode_lokasi from gr_rwysanksi "+
									  ") b "+
									  "     on a.no_sk=b.no_sk and a.kode_lokasi=b.kode_lokasi where a.nik = '"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_sk is null ",
									  ["a.no_sk","a.nama","tanggal"],false,["No SK","Keterangan","Tgl SK"],"and","Data SK Karyawan",true);
					
					var data = this.dbLib.getDataProvider("select a.nip,b.nama from gr_karyawan a inner join gr_rekrut_pelamar b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi "+
					                                      "where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.cb_nip.setText(line.nip,line.nama);
						}
					}
				}
			}
			if (sender == this.cb_sk){
				if (this.cb_sk.getText() != ""){
					this.e_tgl.setText(this.cb_sk.dataFromList[2]);
					var data = this.dbLib.getDataProvider(
						  "select a.kode_loker,a.kode_grade,a.kode_vendor,a.kode_dir,a.kode_dept,a.kode_jab,a.sts_sdm,x.nip, "+
						  "       b.nama as nama_loker, c.nama as nama_grade, d.nama as nama_vendor, e.nama as nama_dir, f.nama as nama_dept, g.nama as nama_jab, h.nama as nama_sts, i.nama as nama_nip "+
						  "from gr_dinas a inner join gr_karyawan x on x.nik=a.nik and a.kode_lokasi=x.kode_lokasi "+
						  "     inner join gr_loker b on a.kode_loker = b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
						  "     inner join gr_grade c on a.kode_grade = c.kode_grade and a.kode_lokasi=c.kode_lokasi "+
						  "     inner join gr_vendor d on a.kode_vendor = d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+
						  "     inner join gr_dir e on a.kode_dir = e.kode_dir and a.kode_lokasi=e.kode_lokasi "+
						  "     inner join gr_dept f on a.kode_dept = f.kode_dept and a.kode_lokasi=f.kode_lokasi "+
						  "     inner join gr_jab g on a.kode_jab = g.kode_jab and a.kode_lokasi=g.kode_lokasi "+
						  "     inner join gr_status_sdm h on a.sts_sdm = h.sts_sdm and a.kode_lokasi=h.kode_lokasi "+
						  "     inner join gr_rekrut_pelamar i on x.nip = i.nip and x.kode_lokasi=i.kode_lokasi "+
						  "where a.no_sk = '"+this.cb_sk.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_form = 'REKRUT' ",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];							
						this.cb_loker.setText(line.kode_loker,line.nama_loker);
						this.cb_grade.setText(line.kode_grade,line.nama_grade);
						this.cb_vendor.setText(line.kode_vendor,line.nama_vendor);
						this.cb_dir.setText(line.kode_dir,line.nama_dir);
						this.cb_dept.setText(line.kode_dept,line.nama_dept);
						this.cb_jab.setText(line.kode_jab,line.nama_jab);
						this.cb_sts.setText(line.sts_sdm,line.nama_sts);
						this.cb_nip.setText(line.nip,line.nama_nip);
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("2"),undefined);
						this.sg1.clear(1);
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
			if (this.cb_nik.getText() != "") {
				var temp = this.dbLib.runSQL("select a.no_seleksi,convert(varchar,b.tanggal,103) as tanggal,a.flag_hadir,a.hasil "+
						   "from gr_rekrut_seleksi_d a inner join gr_rekrut_seleksi_m b on a.no_seleksi=b.no_seleksi and a.kode_lokasi=b.kode_lokasi "+
						   "where a.nip = '"+this.cb_nip.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by b.tanggal desc");
				if (temp instanceof arrayMap) {
					this.sg1.setData(temp,true,20);
					this.sgn.setTotalPage(this.sg1.pageCount);				
					this.sgn.rearrange();
					this.sgn.activePage = 0;
				}else systemAPI.alert(temp);
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_sk.getText()+")");							
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