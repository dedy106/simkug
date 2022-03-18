window.app_hrmis_sdm_transaksi_fHRSk = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_transaksi_fHRSk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_transaksi_fHRSk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data SK Pegawai", 0);	

		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,10,185,20],caption:"NIK Pegawai",rightLabelVisible:true,btnClick:[this,"FindBtnClick"],change:[this,"doEditChange"]});					
		this.ed_nosk = new portalui_saiCBBL(this,{bound:[20,98,300,20],caption:"Nomor SK",tag:1,btnClick:[this,"FindBtnClick"],change:[this,"doChange"],rightLabelVisible:false});				
		this.bShow = new portalui_imageButton(this,{bound:[322,98,22,22],hint:"Load Data",image:"icon/"+system.getThemes()+"/reload.png",click:[this,"doClick"]});								
		this.ed_ket = new portalui_saiLabelEdit(this,{bound:[20,186,500,20],caption:"Keterangan", tag:1});		
		this.lbltgl1 = new portalui_label(this,{bound:[20,120,101,18], underline:true,caption:"Tanggal SK"});		
		uses("portalui_datePicker;portalui_sgNavigator;portalui_checkBox;portalui_groupBox");
		this.dp_tglsk = new portalui_datePicker(this,{bound:[120,120,82,18]});		
		this.lbltgl2 = new portalui_label(this,{bound:[20,142,101,18],underline:true,caption:"Tgl Berlaku SK"});
		this.dp_tglskmulai = new portalui_datePicker(this,{bound:[120,142,82,18]});		
		this.lbltgl3 = new portalui_label(this,{bound:[20,164, 101, 18],caption:"Tgl Mulai Bekerja",underline:true});		
		this.dp_tglawal = new portalui_datePicker(this,{bound:[120,164,82,18]});				
		this.cb_aktif = new portalui_checkBox(this,{bound:[500,164,100,18],caption:"Status Aktif"});
		//this.cb_jenis = new portalui_saiCB(this,{bound:[20,165,300,20],caption:"Jenis SK",items:["ANGKAT","JABS","JABF","KENTI","PANGTI","GADAS","STATUS","PROF","MUTASI","BELAJAR","PENGHARGAAN","SANKSI"]});
		
        this.gb1 = new portalui_groupBox(this,{bound:[20,10,600,80],caption:"Jenis SK(Perubahan Status)"});
		this.cbAngkat = new portalui_checkBox(this.gb1,{bound:[5,5,100,20],caption:"Pengangkatan"});
		this.cbJabs = new portalui_checkBox(this.gb1,{bound:[125,5,100,20],caption:"Jab.Stuktural"});
		this.cbJabf = new portalui_checkBox(this.gb1,{bound:[235,5,100,20],caption:"Jab.Fungsional"});
		this.cbKenti = new portalui_checkBox(this.gb1,{bound:[345,5,100,20],caption:"Ken.Tingkat"});
		this.cbPangti = new portalui_checkBox(this.gb1,{bound:[465,5,100,20],caption:"Pangk.Tingkat"});
		this.cbGadas = new portalui_checkBox(this.gb1,{bound:[5,30,100,20],caption:"Gadas"});
		this.cbStatus = new portalui_checkBox(this.gb1,{bound:[125,30,100,20],caption:"Status Pegawai"});
		this.cbProf = new portalui_checkBox(this.gb1,{bound:[235,30,100,20],caption:"Profesi"});
		this.cbMutasi = new portalui_checkBox(this.gb1,{bound:[345,30,100,20],caption:"Mutasi"});
		this.cbBelajar = new portalui_checkBox(this.gb1,{bound:[465,30,100,20],caption:"Belajar"});
		
		this.p1 = new portalui_panel(this,{bound:[20,11,600,250],caption:"Data Param Gaji"});
		this.cb_Dok = new portalui_saiCBBL(this.p1,{bound:[20,20,300,20],caption:"Dokumen Gaji", btnClick:[this,"FindBtnClick"],change:[this,"doChange"]});
		this.sg1= new portalui_saiGrid(this.p1,{bound:[1,43,598,182],colCount:4,colTitle:["Kode","Deskripsi","Nilai","Nilai Dasar"], 
			colWidth:[[3,2,1,0],[100,100,250,80]], colFormat:[[2,3],[cfNilai, cfNilai]], colReadOnly:[true,[0,1],[]],buttonStyle:[[0],[bsEllips]],
			ellipsClick:[this,"doSgEllipsClick"],tag:9});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,225,598,25],grid:this.sg1,buttonStyle:1});
		setTipeButton(tbSimpan);		
		this.rearrangeChild(10,23);
		this.sg1.appendRow();
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.cb_nik.setSQL("select nik, nama  from karyawan where kode_lokkonsol='"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"]);
			this.cb_Dok.setSQL("select no_dok, keterangan  from gaji_param_m where kode_lokkonsol='"+this.app._lokKonsol+"' ",["no_dok","keterangan"]);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_hrmis_sdm_transaksi_fHRSk.extend(window.portalui_childForm);
window.app_hrmis_sdm_transaksi_fHRSk.implement({
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
	doModalResult: function(event, modalResult){
		var aktif = this.cb_aktif.isSelected() ? "1":"0";
		switch (event)
		{
			
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);									
					this.sg1.clear(1);
				}
				break;
			case "simpan" :
				if (modalResult == mrOk)
				{
					try
					{					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();						
						sql.add("insert into hr_sk(no_sk, nik, tgl_sk, tgl_mulai, tgl_berlaku, keterangan, kode_lokkonsol, nik_user, tgl_input, aktif)values"+
							"	('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','"+this.dp_tglsk.getDateString()+"','"+this.dp_tglawal.getDateString()+"','"+this.dp_tglskmulai.getDateString()+"','"+this.ed_ket.getText()+"','"+this.app._lokKonsol+"','"+this.app._userLog+"',now(),'"+aktif+"' )");
						sql.add("update karyawan set tgl_masuk = '"+this.dp_tglawal.getDateString()+"' where nik='"+this.cb_nik.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						for (var i=0; i < this.sg1.rows.getLength();i++){							
							if ( this.sg1.cells(0,i) != ""){								
								sql.add("insert into hr_sk_d(no_sk, nik, kode_param, value1, value2, kode_lokkonsol, no_dok)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','"+this.sg1.cells(0,i)+"','"+nilaiToFloat(this.sg1.cells(2,i))+"','"+nilaiToFloat(this.sg1.cells(3,i))+"'  ,'"+this.app._lokKonsol+"','"+this.cb_Dok.getText()+"' )");								
							}
						}											
						if (this.cbAngkat.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','ANGKAT','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");					
						if (this.cbJabs.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','JABS','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbJabf.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','JABF','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbKenti.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','KENTI','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbPangti.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','PANGTI','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbGadas.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','GADAS','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbStatus.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','STATUS','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbProf.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','PROF','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbMutasi.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','MUTASI','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbBelajar.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','BELAJAR','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");                        
						this.dbLib.execArraySQL(sql);	
					}catch(e){
						system.alert(this, e,"");
					}
				}
				break;
			case "ubah":
				if (modalResult == mrOk)
				{
					try
					{					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from hr_sk_d where no_sk = '"+this.ed_nosk.getText()+"' and nik ='"+this.cb_nik.getText()+"'  and kode_lokkonsol = '"+this.app._lokKonsol+"' ");
						sql.add("delete from hr_sk_jenis where no_sk = '"+this.ed_nosk.getText()+"' and nik ='"+this.cb_nik.getText()+"'  and kode_lokkonsol = '"+this.app._lokKonsol+"' ");
						sql.add("update karyawan set tgl_masuk = '"+this.dp_tglawal.getDateString()+"' where nik='"+this.cb_nik.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
                        sql.add("update hr_sk set tgl_sk='"+this.dp_tglsk.getDateString()+"', tgl_mulai='"+this.dp_tglawal.getDateString()+"'  "+
						", tgl_berlaku='"+this.dp_tglskmulai.getDateString()+"' , keterangan='"+this.ed_ket.getText()+"',aktif = '"+aktif+"' "+
						" where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.app._lokKonsol+"' and no_sk='"+this.ed_nosk.getText()+"' ");						
						for (var i=0; i < this.sg1.rows.getLength();i++){							
							if ( this.sg1.cells(0,i) != ""){								
								sql.add("insert into hr_sk_d(no_sk, nik, kode_param, value1, value2, kode_lokkonsol, no_dok)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','"+this.sg1.cells(0,i)+"','"+nilaiToFloat(this.sg1.cells(2,i))+"','"+nilaiToFloat(this.sg1.cells(3,i))+"'  ,'"+this.app._lokKonsol+"','"+this.cb_Dok.getText()+"' )");								
							}
						}											
						if (this.cbAngkat.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','ANGKAT','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");					
						if (this.cbJabs.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','JABS','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbJabf.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','JABF','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbKenti.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','KENTI','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbPangti.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','PANGTI','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbGadas.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','GADAS','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbStatus.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','STATUS','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbProf.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','PROF','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbMutasi.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','MUTASI','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");
						if (this.cbBelajar.isSelected()) sql.add("insert into hr_sk_jenis(no_sk, nik, jenis, kode_lokasi, kode_lokkonsol)values('"+this.ed_nosk.getText()+"','"+this.cb_nik.getText()+"','BELAJAR','"+this.app._lokasi+"','"+this.app._lokKonsol+"' )");                        
						this.dbLib.execArraySQL(sql);	
					}catch(e){
						system.alert(this, e,"");
					}
				}
			break;
			case "hapus":
				if (modalResult == mrOk)
				{
					try
					{					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						var data = this.dbLib.runSQL("select * from (SELECT no_sk from hr_dinas2 where kode_lokasi = '"+this.app._lokasi+"' "+
										"union "+
										"SELECT no_sk from hr_angkat where kode_lokasi = '"+this.app._lokasi+"' "+
										"union "+
										"SELECT no_sk from hr_gadas where kode_lokasi = '"+this.app._lokasi+"' "+
										"union "+
										"SELECT no_sk from hr_pangkal where kode_lokasi = '"+this.app._lokasi+"' "+
										"union "+
										"SELECT no_sk from hr_tingkat where kode_lokasi = '"+this.app._lokasi+"' "+
										"union "+
										"SELECT no_sk from hr_rwystatus where kode_lokasi = '"+this.app._lokasi+"' "+
										"union "+
										"SELECT no_sk from hr_rwymutasi where kode_lokasi = '"+this.app._lokasi+"' "+
										"union "+
										"SELECT no_sk from hr_rwyprofesi where kode_lokasi = '"+this.app._lokasi+"' "+
										"union "+ 
										"SELECT no_sk from hr_jabs where kode_lokasi = '"+this.app._lokasi+"' "+
										"union "+
										"SELECT no_sk from hr_jabf where kode_lokasi = '"+this.app._lokasi+"') a where no_sk = '"+this.ed_nosk.getText()+"'  ");															
						if (data instanceof portalui_arrayMap){
							if (data.getLength() > 0){
								throw ("SK tidak dapat dihapus karena sudah terpakai.");								
							}
						}
						sql.add("delete from hr_sk_jenis where no_sk = '"+this.ed_nosk.getText()+"' and nik ='"+this.cb_nik.getText()+"'  and kode_lokkonsol = '"+this.app._lokKonsol+"' ");
                        sql.add("delete from hr_sk_d where no_sk = '"+this.ed_nosk.getText()+"' and nik ='"+this.cb_nik.getText()+"'  and kode_lokkonsol = '"+this.app._lokKonsol+"' ");
						sql.add("delete from hr_sk where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol = '"+this.app._lokKonsol+"' and no_sk='"+this.ed_nosk.getText()+"' ");
						this.dbLib.execArraySQL(sql);	
					}catch(e){
						system.alert(this, e,"");
					}
				}
			break;
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)					
					    {
					      this.app._mainForm.pesan(2,"Transaksi Sukses");
					      this.app._mainForm.bClear.click();              
					    }else
					     system.info(this, result,"");
					break;
			}
		}
	},
	FindBtnClick:function(sender){
		try{
			if (sender == this.ed_nosk) 
			{
				this.standarLib.showListData(this, "Daftar SK Pegawai",sender,this.ed_ket, 
											  "select no_sk, keterangan, tgl_sk, tgl_berlaku, tgl_mulai  from hr_sk where kode_lokkonsol='"+this.app._lokKonsol+"' and nik='"+this.cb_nik.getText()+"' ",
											  "select count(no_sk) from hr_sk where kode_lokkonsol='"+this.app._lokKonsol+"' and nik='"+this.cb_nik.getText()+"'",
											  ["no_sk","ketetangan","tgl_sk","tgl_berlaku","tgl_mulai"],"and",["No SK","Keterangan","Tgl SK","Tgl Berlaku"],false);
			}
			if (sender == this.cb_nik) 
			{
				this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokkonsol='"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(nik) from karyawan where kode_lokkonsol='"+this.app._lokKonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);
				this.standarLib.clearByTag(this, new Array("1"),undefined);	
			}
			if (sender == this.cb_Dok){
				this.standarLib.showListData(this, "Daftar Dokumen",sender,undefined, 
											  "select no_dok, keterangan  from gaji_param_m where kode_lokkonsol='"+this.app._lokKonsol+"' ",
											  "select count(no_dok)       from gaji_param_m where kode_lokkonsol='"+this.app._lokKonsol+"' ",
											  ["no_dok","keterangan"],"and",["No Dokumen","Keterangan"],false);
			}
		}catch(e){
			alert(e);
		}
	},
	doChange: function(sender){				
	   if (sender == this.cb_Dok){
	       this.sg1.clear();
	       var data = this.dbLib.getDataProvider("select a.kode_param, b.nama, a.value1, a.value2 from hr_sk_d a inner join gaji_param_d b on b.kode_param = a.kode_param and b.kode_lokkonsol = a.kode_lokkonsol "+
				"	where a.nik = '"+this.cb_nik.getText()+"' and a.no_sk = '"+this.ed_nosk.getText()+"' and a.kode_lokkonsol = '"+this.app._lokKonsol+"' ",true);
			if (typeof data != "string"){	
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg1.appendData([line.kode_param, line.nama, line.value1, line.value2]);
				}
			}				
       }
       
	},
	doClick: function(sender){
	   try{
    		var data = this.dbLib.getDataProvider("select convert(varchar,tgl_sk,103) as tgl_sk, convert(varchar,tgl_berlaku,103) as tgl_berlaku, convert(varchar,tgl_mulai,103) as tgl_mulai,aktif from hr_sk where no_sk = '"+this.ed_nosk.getText()+"' and nik = '"+this.cb_nik.getText()+"' ",true);		
    		this.sg1.clear();
    	   this.cbAngkat.setSelected(false);
           this.cbJabs.setSelected(false);
           this.cbJabf.setSelected(false);
           this.cbKenti.setSelected(false);
           this.cbPangti.setSelected(false);
           this.cbGadas.setSelected(false);
           this.cbStatus.setSelected(false);
           this.cbProf.setSelected(false);
           this.cbMutasi.setSelected(false);
           this.cbBelajar.setSelected(false);
    		if (typeof data != "string" && data.rs.rows[0] !== undefined){
    			if (data.rs.rows[0] != "") {
    				setTipeButton(tbUbahHapus);
    				this.dp_tglsk.setText(data.rs.rows[0].tgl_sk);
    				this.dp_tglskmulai.setText(data.rs.rows[0].tgl_berlaku);
    				this.dp_tglawal.setText(data.rs.rows[0].tgl_mulai);
    				this.cb_aktif.setSelected(data.rs.rows[0].aktif == "1" ? true : false);
    				var sql = new server_util_arrayList();
    				sql.add("select a.kode_param, b.nama, a.value1, a.value2, a.no_dok from hr_sk_d a inner join gaji_param_d b on b.kode_param = a.kode_param and b.kode_lokkonsol = a.kode_lokkonsol "+
    					"	where a.nik = '"+this.cb_nik.getText()+"' and a.no_sk = '"+this.ed_nosk.getText()+"' and a.kode_lokkonsol = '"+this.app._lokKonsol+"' ");
    				sql.add("select jenis from hr_sk_jenis where kode_lokasi = '"+this.app._lokasi+"' and no_sk ='"+this.ed_nosk.getText()+"' and nik ='"+this.cb_nik.getText()+"' ");
    				data = this.dbLib.getMultiDataProvider(sql,true);
    				if (typeof data != "string"){	
    					var line;
    					data = data.result;
                        if (data[0] != undefined)
        					for (var i in data[0].rs.rows){
        						line = data[0].rs.rows[i];
        						this.sg1.appendData([line.kode_param, line.nama, line.value1, line.value2]);
        						if (i == 0) this.cb_Dok.setText(line.no_dok);
        					}
    					if (this.sg1.getRowCount() == 0) this.sg1.appendRow();
    					if (data[1] != undefined){
    					   for (var i in data[1].rs.rows){
    					       line = data[1].rs.rows[i];    					     
    					       switch (line.jenis){
    					           case "ANGKAT": this.cbAngkat.setSelected(true);break;
    					           case "JABS": this.cbJabs.setSelected(true);break;
    					           case "JABF": this.cbJabf.setSelected(true);break;
    					           case "KENTI": this.cbKenti.setSelected(true);break;
    					           case "PANGTI": this.cbPangti.setSelected(true);break;
    					           case "GADAS": this.cbGadas.setSelected(true);break;
    					           case "STATUS": this.cbStatus.setSelected(true);break;
    					           case "PROF": this.cbProf.setSelected(true);break;
    					           case "MUTASI": this.cbMutasi.setSelected(true);break;
    					           case "BELAJAR": this.cbBelajar.setSelected(true);break;
                               }
                           }
                        }
    				}				
    				
    			}else {
    				setTipeButton(tbSimpan);
    				this.dp_tglsk.setText(new Date().lclFormat());
    				this.dp_tglskmulai.setText(new Date().lclFormat());
    				this.dp_tglawal.setText(new Date().lclFormat());		
    				this.cb_aktif.setSelected(false);
    			}
    		}else setTipeButton(tbSimpan); 
  		}catch(e){
  		    alert(e);
        }  
	},
	doSgEllipsClick: function(sender, col, row){		
		this.standarLib.showListDataForSG(this, "Data Param Gaji",this.sg1,row, col,
				"select kode_param, nama from gaji_param_d where no_dok = '"+this.cb_Dok.getText()+"' and jenis = 'PDPT'",
				"select count(kode_param) as tot from gaji_param_d where no_dok = '"+this.cb_Dok.getText()+"' and jenis = 'PDPT'",
				["kode_param","nama"],"and",["Kode","Deskripsi"]);
	},
	doEditChange: function(sender){
        if (sender == this.cb_nik){
            var data = this.dbLib.getDataProvider("select convert(varchar,tgl_masuk,103) as tgl_masuk from karyawan where nik='"+sender.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ",true);	   
            if (typeof data != "string"){
                if (data.rs.rows[0]){
                    this.dp_tglawal.setText(data.rs.rows[0].tgl_masuk);
                }
            }
        }
    }
});
