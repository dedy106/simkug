window.app_hrmis_sdm_transaksi_fHRangkat = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_transaksi_fHRangkat.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_transaksi_fHRangkat";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pegangkatan Pegawai: Input/Koreksi", 0);	

		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,10,185,20],caption:"NIK Pegawai",rightLabelVisible:false,change:[this,"doChange"]});			
		this.bShow = new portalui_imageButton(this,{bound:[202,10,22,22],hint:"Load Data",image:"icon/"+system.getThemes()+"/reload.png"});				
		this.ed_nama = new portalui_saiLabelEdit(this,{bound:[20,32,450,20],caption:"Nama",readOnly:true, maxLength:100,tag:1});		
		this.cb_status = new portalui_saiCBBL(this,{bound:[20,54,185, 20],caption:"Status Pegawai",tag:1,change:[this,"doChange"]});				
		this.cb_bantu = new portalui_saiCBBL(this,{bound:[20,76,185, 20],caption:"Tenaga Perbantuan",tag:1});
		this.ed_nosk = new portalui_saiCBBL(this,{bound:[20,98,350,20],caption:"Nomor SK",tag:1,btnClick:[this,"FindBtnClick"],change:[this,"doChange"]});				
		this.lbltgl1 = new portalui_label(this,{bound:[20,120,101,20], underline:true,caption:"Tanggal SK"});		
		uses("portalui_datePicker;portalui_saiGrid");
		this.dp_tglsk = new portalui_datePicker(this,{bound:[120,122,82,16],btnVisible:false, readOnly:true});		
		this.lbltgl2 = new portalui_label(this,{bound:[20,142,101,20],underline:true,caption:"Tgl Berlaku SK"});
		this.dp_tglskmulai = new portalui_datePicker(this,{bound:[120,144,82,16],btnVisible:false, readOnly:true});		
		this.lbltgl3 = new portalui_label(this,{bound:[20,164, 101, 20],caption:"Tgl Mulai Bekerja",underline:true});		
		this.dp_tglawal = new portalui_datePicker(this,{bound:[120,166,82,16]});		
		this.ed_jabs = new portalui_saiLabelEdit(this,{bound:[20,186,350,20],caption:"Jabatan Struktural", tag:1});		
		this.cb_jabs = new portalui_saiCBBL(this,{bound:[20,208,185,20],caption:"Setingkat Struktural", tag:1,});		
		this.ed_jabf = new portalui_saiLabelEdit(this,{bound:[20,231,350,20],caption:"Jabatan Fungsional", tag:1});		
		this.cb_jabf = new portalui_saiCBBL(this,{bound:[20,254,185,20],caption:"Setingkat Fungsional", tag:1});		
		this.cb_jenjang = new portalui_saiCB(this,{bound:[500, 254, 185, 20], caption:"Jenjang Pendidikan", labelWidth:120,readOnly:true, tag:1,items:["SD","SLTP","SLTA","D1","D2","D3","D4","S1","S2","S3"]});				
		this.ed_jurusan = new portalui_saiLabelEdit(this,{bound:[500,231,350,20],caption:"Jurusan",labelWidth:120,maxLength:50,tag:1 });				
		this.ed_pangkal = new portalui_saiLabelEdit(this,{bound:[500,32, 150,20],caption:"Pangkal Tingkat",maxLength:10,labelWidth:120,tag:1,change:[this,"doChange"]});
		this.ed_tingkat = new portalui_saiLabelEdit(this,{bound:[500, 54, 150, 20],caption:"Tingkat",labelWidth:120, maxLength:10, tag:1});		
		this.ed_tahun = new portalui_saiLabelEdit(this,{bound:[500,76,150,20],caption:"Masa Kerja[Thn - Bln]",labelWidth:120, tipeText:ttAngka, alignment:alRight, tag:1});
		this.ed_bulan = new portalui_saiLabelEdit(this,{bound:[670, 76, 30, 20],caption:"",labelWidth:0,tipeText:ttAngka,alignment:alRight,text:"0",tag:1});				
		this.ed_gaji = new portalui_saiLabelEdit(this,{bound:[500,98,200,20],caption:"Gaji Dasar",tipeText:ttNilai, labelWidth:120, maxLength:15,text:"0",tag:1,alignment:alRight});		
		this.cb_pp = new portalui_saiCBBL(this,{bound:[500,120, 205, 20],caption:"Lokasi Kerja",labelWidth:120, tag:1});		
		this.cb_loker = new portalui_saiCBBL(this,{bound:[500,142, 205, 20],caption:"Unit Kerja",labelWidth:120,tag:1});				
		this.cb_profesi = new portalui_saiCBBL(this,{bound:[500, 164, 205, 20],caption:"Profesi",labelWidth:120,tag:1});
		this.ed_tpokok = new portalui_saiLabelEdit(this,{bound:[500, 186, 350,20],caption:"Tugas Pokok",tag:1,labelWidth:120, maxLength:100,tag:1});		
		this.ed_desc = new portalui_saiLabelEdit(this,{bound:[500, 208, 350, 20],caption:"Keterangan",labelWidth:120, maxLength:150, tag:1});				
		this.bhistory = new portalui_button(this,{bound:[873,254, 80,20],caption:"Tampil"});		
		this.p1 = new portalui_panel(this,{bound:[20, 277, 930, 237],caption:"Data Pengangkatan",name:"P1"});	    	
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(927);
		this.sg1.setHeight(213);			
		this.sg1.setColCount(24);
		this.sg1.setTag("2");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(["NIK","Nama","Nomor SK","Tgl SK","Tgl Berlaku","Status","Perbantuan","Tgl Mulai Kerja","Pangkal Tk","Tingkat",
		                               "Jab Struk.","Setingkat Jab. Struk","Jab Fung.","Setingkat Jab. Fung.","Ms Krj (Tahun)","Ms Krj (Bulan)","Gaji Dasar","Loker","Unit Kerja","Profesi","Tgs Pokok","Keterangan","Jenjang","Jurusan"]);
		this.sg1init(this.sg1);
		
		setTipeButton(tbSimpan);				
		this.lokkonsol= this.app._lokKonsol;
		this.cb_nik.onBtnClick.set(this, "FindBtnClick");
		this.cb_jabs.onBtnClick.set(this, "FindBtnClick");
		this.cb_jabs.setSQL("select kode_jab, nama  from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and jenis = 'STRUKTURAL'",["kode_jab","nama"]);
		this.cb_jabf.onBtnClick.set(this, "FindBtnClick");
		this.cb_jabf.setSQL("select kode_jab, nama  from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and jenis = 'FUNGSIONAL'",["kode_jab","nama"]);
		
        this.cb_pp.onBtnClick.set(this, "FindBtnClick");
        this.cb_pp.setSQL("select kode_lokasi, nama  from hr_lokasi where kode_lokkonsol='"+this.lokkonsol+"'",["kode_lokasi","nama"]);
		this.cb_loker.setSQL("select kode_loker, nama  from hr_loker where tipe= 'posting'",["kode_loker","nama"]);			
		this.cb_loker.onBtnClick.set(this, "FindBtnClick");
		this.cb_profesi.onBtnClick.set(this, "FindBtnClick");
		this.cb_profesi.setSQL("select kode_profesi, nama  from hr_profesi where kode_lokkonsol='"+this.lokkonsol+"'",["kode_profesi","nama"]);
				
		this.cb_status.onBtnClick.set(this, "FindBtnClick");		
        this.cb_status.setSQL("select kode_status, nama  from hr_status2 where kode_lokkonsol='"+this.lokkonsol+"'",["kode_status","nama"]);
		this.cb_bantu.setSQL("select kode_bantu, nama  from hr_bantu where kode_lokkonsol='"+this.lokkonsol+"'",["kode_bantu","nama"]);
		this.cb_bantu.onBtnClick.set(this, "FindBtnClick");
		this.bhistory.onClick.set(this,"showClick");
		this.sg1.onDblClick.set(this, "sg1onDblClick");
		this.bShow.onClick.set(this, "show2Click");
		
		this.nourut=0;
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			
			this.sg1.clear(1); 			
			this.cb_pp.setText(this.app._lokasi, this.app._namalokasi);
		}catch(e)
		{
			alert(e);
		}		
	}
};
window.app_hrmis_sdm_transaksi_fHRangkat.extend(window.portalui_childForm);
window.app_hrmis_sdm_transaksi_fHRangkat.prototype.sg1init = function(sg)
{
	sg.setColWidth([19,18,17,16,15,14,13,12,11,10, 9,8,7,6,5,4,3,2,1,0],
				[120,100,80,100,80,100,80,80,80,80, 80,80,80,100,100,80,80,100,100,80]);
};
window.app_hrmis_sdm_transaksi_fHRangkat.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{		
	   this.doLoadData(this.sg1.cells(0,row), this.sg1.cells(2, row));	
	}catch(e)
	{
		system.alert(this, e,"");
	}
};
window.app_hrmis_sdm_transaksi_fHRangkat.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_hrmis_sdm_transaksi_fHRangkat.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0","1","2"],this.cb_nik);
				this.sg1.clear(1); 
				this.cb_pp.setText(this.app._lokasi, this.app._namalokasi);
				setTipeButton(tbSimpan);
			}
			break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0","1","9"])))
			{
				try
				{					
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();					
					sql.add("insert into hr_dinas2 (nik,no_sk,tgl_sk,tgl_skmulai,tgl_masuk,kode_status,kode_bantu,pangkal,tingkat,kode_jabs,kode_jabf,mk_tahun,mk_bulan,gadas,kode_lokasi,"+
					        "                       kode_loker,kode_profesi,tugas_pokok,keterangan,kode_lokkonsol,user_id,tgl_input, jenjang, jurusan,jabs_baru,jabf_baru) "+
					        "values ('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							            this.dp_tglskmulai.getDate()+"','"+this.dp_tglawal.getDate()+"','"+this.cb_status.getText()+"','"+
										this.cb_bantu.getText()+"','"+this.ed_pangkal.getText()+"','"+this.ed_tingkat.getText()+"','"+this.cb_jabs.getText()+"','"+this.cb_jabf.getText()+"',"+parseNilai(this.ed_tahun.getText())+","+parseNilai(this.ed_bulan.getText())+","+
										parseNilai(this.ed_gaji.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_loker.getText()+"','"+
										this.cb_profesi.getText()+"','"+this.ed_tpokok.getText()+"','"+this.ed_desc.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'"+this.cb_jenjang.getText()+"','"+this.ed_jurusan.getText()+"','"+this.ed_jabs.getText()+"','"+this.ed_jabf.getText()+"' )");
					sql.add("update karyawan set tgl_masuk = '"+this.dp_tglawal.getDate()+"' where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"' ");
					
					if (this.jenisSK.search("ANGKAT") > -1){ 
                        sql.add("delete from hr_angkat where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
    					sql.add("insert into hr_angkat(nik, no_sk,tgl_sk, tgl_skmulai, tgl_masuk, jenjang, jurusan, pangkal, tingkat, mk_tahun, mk_bulan, gadas, kode_lokasi, kode_loker, keterangan, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
    						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
    							this.dp_tglskmulai.getDate()+"','"+this.dp_tglawal.getDate()+"','"+this.cb_jenjang.getText()+"','"+this.ed_jurusan.getText()+"','"+this.ed_pangkal.getText()+"','"+this.ed_tingkat.getText()+"', "+
    							parseNilai(this.ed_tahun.getText())+","+parseNilai(this.ed_bulan.getText())+","+parseNilai(this.ed_gaji.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_loker.getText()+"', "+
    							"'"+this.ed_desc.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					}
                    if (this.jenisSK.search("GADAS") > -1) sql.add("insert into hr_gadas(nik, no_sk, tgl_sk, tgl_skmulai, tingkat, mk_tahun, mk_bulan, gadas, keterangan, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.ed_tingkat.getText()+"', "+parseNilai(this.ed_tahun.getText())+","+parseNilai(this.ed_bulan.getText())+","+parseNilai(this.ed_gaji.getText())+", "+
							"'"+this.ed_desc.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");					
					if (this.jenisSK.search("PANGTI") > -1) sql.add("insert into hr_pangkal(nik, no_sk, tgl_sk, tgl_skmulai, pangkal1, pangkal2, tingkat1, tingkat2, keterangan, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.ed_pangkal.getText()+"','"+this.ed_pangkal.getText()+"','"+this.ed_tingkat.getText()+"','"+this.ed_tingkat.getText()+"', "+
							"'"+this.ed_desc.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					if (this.jenisSK.search("KENTI") > -1) sql.add("insert into hr_tingkat(nik, no_sk, tgl_sk, tgl_skmulai,tingkat1, tingkat2, mk_tahun, mk_bulan, gadas, keterangan, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.ed_tingkat.getText()+"','"+this.ed_tingkat.getText()+"', "+
							parseNilai(this.ed_tahun.getText())+","+parseNilai(this.ed_bulan.getText())+","+parseNilai(this.ed_gaji.getText())+", "+
							"'"+this.ed_desc.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					if (this.jenisSK.search("STATUS") > -1) sql.add("insert into hr_rwystatus(nik, no_sk, tgl_sk, tgl_skmulai, kode_status1, kode_status2, nik1, nik2, keterangan, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.cb_status.getText()+"','"+this.cb_status.getText()+"','"+this.cb_nik.getText()+"','"+this.cb_nik.getText()+"', "+							
							"'"+this.ed_desc.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					if (this.jenisSK.search("MUTASI") > -1) sql.add("insert into hr_rwymutasi(nik, no_sk, tgl_sk, tgl_skmulai,kode_lokasi, kode_lokasi2, kode_loker, kode_loker2, keterangan, nilai, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.cb_pp.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_loker.getText()+"','"+this.cb_loker.getText()+"','"+this.ed_desc.getText()+"',0,"+							
							"'"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					if (this.jenisSK.search("PROF") > -1) sql.add("insert into hr_rwyprofesi(nik, no_sk, tgl_sk, tgl_skmulai, kode_profesi1, kode_profesi2, keterangan, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.cb_profesi.getText()+"','"+this.cb_profesi.getText()+"','"+this.ed_desc.getText()+"',"+
							"'"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					if (this.jenisSK.search("JABS") > -1) sql.add("insert into hr_jabs(nik, no_sk, tgl_sk, tgl_skmulai, tingkat, jab_lama, jab_baru, kode_jabs, kode_lokasi, kode_loker, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.ed_tingkat.getText()+"','"+this.cb_jabs.getText()+"','"+this.ed_jabs.getText()+"','"+this.cb_jabs.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_loker.getText()+"',"+							
							"'"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					if (this.jenisSK.search("JABF") > -1) sql.add("insert into hr_jabf(nik, no_sk, tgl_sk, tgl_skmulai,tingkat, jab_lama, jab_baru, kode_jabf, kode_lokasi, kode_loker, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.ed_tingkat.getText()+"','"+this.ed_jabf.getText()+"','"+this.ed_jabf.getText()+"','"+this.cb_jabf.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_loker.getText()+"',"+							
							"'"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
		case "ubah" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();										
					sql.add("update hr_dinas2 set no_sk='"+this.ed_nosk.getText()+"',tgl_sk='"+this.dp_tglsk.getDate()+"',tgl_skmulai='"+this.dp_tglskmulai.getDate()+"',tgl_masuk='"+this.dp_tglawal.getDate()+"',kode_status='"+
					        this.cb_status.getText()+"',kode_bantu='"+this.cb_bantu.getText()+"',pangkal='"+this.ed_pangkal.getText()+"',tingkat='"+this.ed_tingkat.getText()+"',kode_jabs='"+this.cb_jabs.getText()+"',kode_jabf='"+this.cb_jabf.getText()+"',mk_tahun="+parseNilai(this.ed_tahun.getText())+
							",mk_bulan="+parseNilai(this.ed_bulan.getText())+",gadas="+parseNilai(this.ed_gaji.getText())+",kode_lokasi='"+this.cb_pp.getText()+"',"+
							"kode_loker='"+this.cb_loker.getText()+"',kode_profesi='"+this.cb_profesi.getText()+"',tugas_pokok='"+this.ed_tpokok.getText()+"',keterangan='"+this.ed_desc.getText()+"',user_id='"+this.app._userLog+"',tgl_input=now() "+
							", jenjang='"+this.cb_jenjang.getText()+"', jurusan='"+this.ed_jurusan.getText()+"' , jabs_baru='"+this.ed_jabs.getText()+"', jabf_baru='"+this.ed_jabf.getText()+"'  "+
							" where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol ='"+this.lokkonsol+"'");
					sql.add("update karyawan set tgl_masuk = '"+this.dp_tglawal.getDate()+"' where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"' ");
					if (this.jenisSK.search("ANGKAT") > -1) sql.add("delete from hr_angkat where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
					if (this.jenisSK.search("GADAS") > -1) sql.add("delete from hr_gadas where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
					if (this.jenisSK.search("PANGTI") > -1) sql.add("delete from hr_pangkal where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
					if (this.jenisSK.search("KENTI") > -1) sql.add("delete from hr_tingkat where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
					if (this.jenisSK.search("STATUS") > -1) sql.add("delete from hr_rwystatus where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
					if (this.jenisSK.search("MUTASI") > -1) sql.add("delete from hr_rwymutasi where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
					if (this.jenisSK.search("PROF") > -1) sql.add("delete from hr_rwyprofesi where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
					if (this.jenisSK.search("JABS") > -1) sql.add("delete from hr_jabs where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
					if (this.jenisSK.search("JABF") > -1) sql.add("delete from hr_jabf where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
					
					if (this.jenisSK.search("ANGKAT") > -1) sql.add("insert into hr_angkat(nik, no_sk,tgl_sk, tgl_skmulai, tgl_masuk, jenjang, jurusan, pangkal, tingkat, mk_tahun, mk_bulan, gadas, kode_lokasi, kode_loker, keterangan, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.dp_tglawal.getDate()+"','"+this.cb_jenjang.getText()+"','"+this.ed_jurusan.getText()+"','"+this.ed_pangkal.getText()+"','"+this.ed_tingkat.getText()+"', "+
							parseNilai(this.ed_tahun.getText())+","+parseNilai(this.ed_bulan.getText())+","+parseNilai(this.ed_gaji.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_loker.getText()+"', "+
							"'"+this.ed_desc.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					if (this.jenisSK.search("GADAS") > -1) sql.add("insert into hr_gadas(nik, no_sk, tgl_sk, tgl_skmulai, tingkat, mk_tahun, mk_bulan, gadas, keterangan, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.ed_tingkat.getText()+"', "+parseNilai(this.ed_tahun.getText())+","+parseNilai(this.ed_bulan.getText())+","+parseNilai(this.ed_gaji.getText())+", "+
							"'"+this.ed_desc.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");					
					if (this.jenisSK.search("PANTI") > -1) sql.add("insert into hr_pangkal(nik, no_sk, tgl_sk, tgl_skmulai, pangkal1, pangkal2, tingkat1, tingkat2, keterangan, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.ed_pangkal.getText()+"','"+this.ed_pangkal.getText()+"','"+this.ed_tingkat.getText()+"','"+this.ed_tingkat.getText()+"', "+
							"'"+this.ed_desc.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					if (this.jenisSK.search("KENTI") > -1) sql.add("insert into hr_tingkat(nik, no_sk, tgl_sk, tgl_skmulai,tingkat1, tingkat2, mk_tahun, mk_bulan, gadas, keterangan, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.ed_tingkat.getText()+"','"+this.ed_tingkat.getText()+"', "+
							parseNilai(this.ed_tahun.getText())+","+parseNilai(this.ed_bulan.getText())+","+parseNilai(this.ed_gaji.getText())+", "+
							"'"+this.ed_desc.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					if (this.jenisSK.search("STATUS") > -1) sql.add("insert into hr_rwystatus(nik, no_sk, tgl_sk, tgl_skmulai, kode_status1, kode_status2, nik1, nik2, keterangan, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.cb_status.getText()+"','"+this.cb_status.getText()+"','"+this.cb_nik.getText()+"','"+this.cb_nik.getText()+"', "+							
							"'"+this.ed_desc.getText()+"','"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					if (this.jenisSK.search("MUTASI") > -1) sql.add("insert into hr_rwymutasi(nik, no_sk, tgl_sk, tgl_skmulai,kode_lokasi, kode_lokasi2, kode_loker, kode_loker2, keterangan, nilai, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.cb_pp.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_loker.getText()+"','"+this.cb_loker.getText()+"','"+this.ed_desc.getText()+"',0,"+							
							"'"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					if (this.jenisSK.search("PROF") > -1) sql.add("insert into hr_rwyprofesi(nik, no_sk, tgl_sk, tgl_skmulai, kode_profesi1, kode_profesi2, keterangan, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.cb_profesi.getText()+"','"+this.cb_profesi.getText()+"','"+this.ed_desc.getText()+"',"+
							"'"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					if (this.jenisSK.search("JABS") > -1) sql.add("insert into hr_jabs(nik, no_sk, tgl_sk, tgl_skmulai, tingkat, jab_lama, jab_baru, kode_jabs, kode_lokasi, kode_loker, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.ed_tingkat.getText()+"','"+this.ed_jabs.getText()+"','"+this.ed_jabs.getText()+"','"+this.cb_jabs.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_loker.getText()+"',"+							
							"'"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					if (this.jenisSK.search("JABF") > -1) sql.add("insert into hr_jabf(nik, no_sk, tgl_sk, tgl_skmulai,tingkat, jab_lama, jab_baru, kode_jabf, kode_lokasi, kode_loker, kode_lokkonsol, user_id, tgl_input, status_aktif)values"+
						"('"+this.cb_nik.getText()+"','"+this.ed_nosk.getText()+"','"+this.dp_tglsk.getDate()+"','"+
							this.dp_tglskmulai.getDate()+"','"+this.ed_tingkat.getText()+"','"+this.ed_jabf.getText()+"','"+this.ed_jabf.getText()+"','"+this.cb_jabf.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_loker.getText()+"',"+							
							"'"+this.lokkonsol+"','"+this.app._userLog+"',now(),'1')");
					
					this.dbLib.execArraySQL(sql);	
				}catch(e)
				{
					system.alert(this, e,"");
				}					
			}
			break;
		case "hapus" :
		   if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
		   {
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				sql.add("delete from hr_angkat where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
				sql.add("delete from hr_gadas where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
				sql.add("delete from hr_pangkal where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
				sql.add("delete from hr_tingkat where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
				sql.add("delete from hr_rwystatus where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
				sql.add("delete from hr_rwymutasi where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
				sql.add("delete from hr_rwyprofesi where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
				sql.add("delete from hr_jabs where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
				sql.add("delete from hr_jabf where nik ='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' ");
				sql.add("delete from hr_dinas2 where nik='"+this.cb_nik.getText()+"' and no_sk='"+this.ed_nosk.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' ");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_hrmis_sdm_transaksi_fHRangkat.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.lokkonsol != "")
		{
			try
			{			
				this.sg1.clear();									   
				var data = this.dbLib.runSQL("select distinct a.nik,d.nama,a.no_sk,j.tgl_sk as tgl_sks ,j.tgl_mulai as tgl_skmulai,e.nama as nama_status,ifnull(g.nama,'-') as nama_bantu,a.tgl_masuk,a.pangkal,a.tingkat,ifnull(h.nama,'-') as nama_jabs,a.jabs_baru, ifnull(i.nama,'-') as nama_jabf, a.jabf_baru, "+
				                     "               a.mk_tahun,a.mk_bulan,a.gadas,b.nama as nama_lokasi, c.nama as nama_loker,f.nama as nama_profesi,a.tugas_pokok,a.keterangan,a.jenjang, a.jurusan "+
									 "from hr_dinas2 a left outer join hr_lokasi b on a.kode_lokasi=b.kode_lokasi and a.kode_lokkonsol = b.kode_lokkonsol "+
									 "                 left outer join hr_loker c on a.kode_loker=c.kode_loker and c.kode_lokasi = a.kode_lokasi and a.kode_lokkonsol = c.kode_lokkonsol "+
									 "                 left outer join karyawan d on a.nik=d.nik and d.kode_lokasi = a.kode_lokasi and  a.kode_lokkonsol = d.kode_lokkonsol "+
									 "                 left outer join hr_status2 e on a.kode_status=e.kode_status and a.kode_lokkonsol = e.kode_lokkonsol "+
									 "                 left outer join hr_profesi f on a.kode_profesi=f.kode_profesi and a.kode_lokkonsol = f.kode_lokkonsol "+
									 "                 left outer join hr_bantu g on a.kode_bantu=g.kode_bantu and a.kode_lokkonsol = g.kode_lokkonsol "+
									 "                 left outer join hr_jabatan h on a.kode_jabs=h.kode_jab and a.kode_lokkonsol = h.kode_lokkonsol "+
									 "                 left outer join hr_jabatan i on a.kode_jabf=i.kode_jab and a.kode_lokkonsol = i.kode_lokkonsol "+
									 "                 left outer join hr_sk j on j.no_sk=a.no_sk and j.kode_lokkonsol = a.kode_lokkonsol and j.nik = a.nik "+
									 "where a.kode_lokkonsol = '"+this.lokkonsol+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik = '"+this.cb_nik.getText()+"' ");

				if (data instanceof portalui_arrayMap)
				{					
					if (data.get(0) != undefined)
					{
						line = data.get(0);		
						this.sg1.setData(data);										
						
						for (var i=0;i < this.sg1.getRowCount();i++)
						{
							var dt=this.sg1.getCell(3,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(3,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
							
							dt=this.sg1.getCell(4,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(4,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
							
							dt=this.sg1.getCell(7,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(7,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
						}
					} else
					{
						this.sg1.clear(1);
					}
				}else alert(data);
			}catch(e)
			{
				system.alert(this, e,"");
			}
		}
	}
};
window.app_hrmis_sdm_transaksi_fHRangkat.prototype.show2Click = function(sender)
{
	if (this.cb_nik.getText() != "")
	{
		try
		{
			var data = this.dbLib.runSQL("select nama from karyawan "+
								 "where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					line = data.get(0);
					this.ed_nama.setText(line.get("nama"));					
				} 
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_hrmis_sdm_transaksi_fHRangkat.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_nik) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",this.cb_nik,this.ed_nama, 
										  "select nik, nama  from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(nik) from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"' ",
										  ["nik","nama"],"and",["NIK","Nama"],false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);	
		}
		if (sender == this.cb_pp) 
		{
			this.standarLib.showListData(this, "Daftar Lokasi Kerja",this.cb_pp,undefined, 
										  "select kode_lokasi, nama  from hr_lokasi where kode_lokkonsol='"+this.lokkonsol+"' ",
										  "select count(kode_lokasi) from hr_lokasi where kode_lokkonsol='"+this.lokkonsol+"' ",
										  ["kode_lokasi","nama"],"and",["Kode","Deskripsi"],false);
			this.cb_loker.setText("");
			this.cb_loker.setRightLabelCaption("");
		}
		if (sender == this.cb_loker) 
		{			
            this.standarLib.showListData(this, "Daftar Unit Kerja",this.cb_loker,undefined, 
										  "select kode_loker, nama  from hr_loker where kode_lokasi='"+this.cb_pp.getText()+"' and tipe= 'posting'",
										  "select count(kode_loker) from hr_loker where kode_lokasi='"+this.cb_pp.getText()+"' and tipe= 'posting'",
										  new Array("kode_loker","nama"),"and",new Array("Kode","Deskripsi"),false);
		}
		if (sender == this.cb_jabs) 
		{
			this.standarLib.showListData(this, "Daftar Jabatan Struktural",sender,undefined, 
										  "select kode_jab, nama  from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and jenis = 'STRUKTURAL'",
										  "select count(kode_jab) from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and jenis = 'STRUKTURAL'",
										  new Array("kode_jab","nama"),"and",new Array("Kode","Deskripsi"),true);
		}
		if (sender == this.cb_jabf) 
		{
			this.standarLib.showListData(this, "Daftar Jabatan Fungsional",sender,undefined, 
										  "select kode_jab, nama  from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and jenis = 'FUNGSIONAL'",
										  "select count(kode_jab) from hr_jabatan where kode_lokkonsol='"+this.lokkonsol+"' and jenis = 'FUNGSIONAL'",
										  new Array("kode_jab","nama"),"and",new Array("Kode","Deskripsi"),true);
		}
		if (sender == this.cb_status) 
		{
			this.standarLib.showListData(this, "Daftar Status Pegawai",sender,undefined, 
										  "select kode_status, nama  from hr_status2 where kode_lokkonsol='"+this.lokkonsol+"'",
										  "select count(kode_status) from hr_status2 where kode_lokkonsol='"+this.lokkonsol+"'",
										  new Array("kode_status","nama"),"and",new Array("Kode","Deskripsi"),false);
		}
		if (sender == this.cb_bantu) 
		{
            this.standarLib.showListData(this, "Daftar Perusahan Rekanan SDM",sender,undefined, 
										  "select kode_bantu, nama  from hr_bantu where kode_lokkonsol='"+this.lokkonsol+"'",
										  "select count(kode_bantu) from hr_bantu where kode_lokkonsol='"+this.lokkonsol+"'",
										  new Array("kode_bantu","nama"),"and",new Array("Kode","Deskripsi"),true);
		}
		if (sender == this.cb_profesi) 
		{
            this.standarLib.showListData(this, "Daftar Profesi Pegawai",sender,undefined, 
										  "select kode_profesi, nama  from hr_profesi where kode_lokkonsol='"+this.lokkonsol+"'",
										  "select count(kode_profesi) from hr_profesi where kode_lokkonsol='"+this.lokkonsol+"'",
										  new Array("kode_profesi","nama"),"and",new Array("Kode","Deskripsi"),false);
		}
		if (sender == this.ed_nosk) 
		{
			this.standarLib.showListData(this, "Daftar SK Pegawai",sender,undefined, 
										  "select no_sk, keterangan, tgl_sk, tgl_berlaku  from hr_sk where kode_lokkonsol='"+this.lokkonsol+"' and nik ='"+this.cb_nik.getText()+"' ",
										  "select count(no_sk) from hr_sk where kode_lokkonsol='"+this.lokkonsol+"' and nik ='"+this.cb_nik.getText()+"'",
										  ["no_sk","ketetangan","tgl_sk","tgl_berlaku"],"and",["No SK","Keterangan","Tgl SK","Tgl Berlaku"],false);
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_hrmis_sdm_transaksi_fHRangkat.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		switch	(methodName)
		{
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)					
	            {
	              this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nama.getText()+")");
	              this.app._mainForm.bClear.click();              
	            }else
			   	     system.info(this, result,"");
				break;
		}
	}
};

window.app_hrmis_sdm_transaksi_fHRangkat.prototype.hitungClick = function(sender)
{
	try
	{
		if (this.cb_nik.getText() != "")
		{
			var line,data = this.dbLib.runSQL("select datediff (day,tgl_mulai,getDate()) as jmlhari "+
			                                  "from hr_sk where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"' and no_sk = '"+ this.ed_nosk.getText()+"' ");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					var thnbln = dayToYear(line.get("jmlhari"));
					this.ed_tahun.setText(thnbln[0]);
					this.ed_bulan.setText(thnbln[1]);
				}
			}
		}
	} catch	(e)
	{
		alert(e);
	}
};
window.app_hrmis_sdm_transaksi_fHRangkat.implement({
    doLoadData: function(nik, sk){
        var data = this.dbLib.runSQL("select distinct a.kode_status,a.kode_bantu,a.no_sk,h.tgl_sk,h.tgl_berlaku as tgl_skmulai,ifnull(bb.tgl_masuk,h.tgl_mulai) as tgl_masuk,a.pangkal,a.tingkat,a.kode_jabs,a.kode_jabf,"+
		                             "       a.mk_tahun,a.mk_bulan,a.gadas,a.kode_lokasi,a.kode_loker,a.kode_profesi,a.tugas_pokok,a.keterangan,"+
		                             "       b.nama as nama_lokasi, c.nama as nama_loker,ifnull(x.nama,'-') as nama_bantu,"+
		                             "       d.nama as nama_status,e.nama as nama_profesi,ifnull(f.nama,'-') as nama_jabs,ifnull(g.nama,'-') as nama_jabf, a.jenjang, a.jurusan, a.jabs_baru, a.jabf_baru "+
									 "from hr_dinas2 a inner join karyawan bb on bb.nik = a.nik and bb.kode_lokasi = a.kode_lokasi "+
                                     "   left join hr_lokasi b on a.kode_lokasi=b.kode_lokasi and a.kode_lokkonsol = b.kode_lokkonsol "+
									 "                 left join hr_loker c on a.kode_loker=c.kode_loker and a.kode_lokkonsol = c.kode_lokkonsol "+
									 "                 left join hr_status2 d on a.kode_status=d.kode_status and a.kode_lokkonsol = d.kode_lokkonsol "+
									 "                 left join hr_profesi e on a.kode_profesi=e.kode_profesi and a.kode_lokkonsol = e.kode_lokkonsol "+
									 "                 left join hr_sk h on h.no_sk=a.no_sk and h.kode_lokkonsol = a.kode_lokkonsol "+
									 "                 left outer join hr_bantu x on a.kode_bantu=x.kode_bantu and a.kode_lokkonsol = x.kode_lokkonsol "+
									 "                 left outer join hr_jabatan f on a.kode_jabs=f.kode_jab and a.kode_lokkonsol = f.kode_lokkonsol "+
									 "                 left outer join hr_jabatan g on a.kode_jabf=g.kode_jab and a.kode_lokkonsol = g.kode_lokkonsol "+
									 "where a.nik='"+nik+"' and a.no_sk = '"+ sk +"' and a.kode_lokkonsol = '"+this.lokkonsol+"' ");
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				setTipeButton(tbUbahHapus);
				line = data.get(0);
				//this.cb_nik.setText(nik);
				//this.ed_nama.setText(this.sg1.cells(1,));
				this.ed_nosk.onChange.set(undefined, undefined);
				this.cb_status.setText(line.get("kode_status"),line.get("nama_status"));
				this.cb_bantu.setText(line.get("kode_bantu"),line.get("nama_bantu"));
				this.ed_nosk.setText(line.get("no_sk"));
				this.dp_tglsk.setDateString(line.get("tgl_sk"));
				this.dp_tglskmulai.setDateString(line.get("tgl_skmulai"));
				this.dp_tglawal.setDateString(line.get("tgl_masuk"));
				this.cb_jabs.setText(line.get("kode_jabs"),line.get("nama_jabs"));
				this.cb_jabf.setText(line.get("kode_jabf"),line.get("nama_jabf"));
				this.ed_jabs.setText(line.get("jabs_baru"));
				this.ed_jabf.setText(line.get("jabf_baru"));
				this.ed_pangkal.setText(line.get("pangkal"));
				this.ed_tingkat.setText(line.get("tingkat"));
				this.ed_tahun.setText(line.get("mk_tahun"));
				this.ed_bulan.setText(line.get("mk_bulan"));
				this.ed_gaji.setText(floatToNilai(parseFloat(line.get("gadas"))));
				this.cb_pp.setText(line.get("kode_lokasi"));
				this.cb_pp.setRightLabelCaption(line.get("nama_lokasi"));
				this.cb_loker.setText(line.get("kode_loker"));
				this.cb_loker.setRightLabelCaption(line.get("nama_loker"));
				this.cb_profesi.setText(line.get("kode_profesi"),line.get("nama_profesi"));
				this.ed_tpokok.setText(line.get("tugas_pokok"));
				this.ed_desc.setText(line.get("keterangan"));
				this.cb_jenjang.setText(line.get("jenjang"));
				this.ed_jurusan.setText(line.get("jurusan"));
				this.ed_nosk.onChange.set(this, "doChange");				
				this.doChange(this.ed_nosk, true);
			}
			else
			{
				setTipeButton(tbSimpan);
			}
		}
    },
	doChange: function(sender, reload){
	    if (sender == this.cb_nik){
	       this.sg1.clear(1);	       
	       return false;
        }
		if (sender == this.ed_nosk){
			try{
                var data = this.dbLib.getDataProvider("select a.tgl_sk, a.tgl_mulai, a.tgl_berlaku, datediff (day,a.tgl_mulai,getDate()) as jmlhari,ifnull(b.jenis,'') as jenis  from hr_sk a left outer join hr_sk_jenis b on b.no_sk = a.no_sk and b.nik = a.nik and b.kode_lokkonsol = a.kode_lokkonsol where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and a.nik = '"+this.cb_nik.getText()+"' and a.no_sk='"+this.ed_nosk.getText()+"'",true);			
				if (data.rs.rows[0] !== undefined){
					this.dp_tglsk.setText(data.rs.rows[0].tgl_sk);
					this.dp_tglskmulai.setText(data.rs.rows[0].tgl_berlaku);
					this.dp_tglawal.setText(data.rs.rows[0].tgl_mulai);
					var thnbln = dayToYear(data.rs.rows[0].jmlhari);
					this.ed_tahun.setText(thnbln[0]);
					this.ed_bulan.setText(thnbln[1]);
					this.jenisSK = "";
					for (var i in data.rs.rows) this.jenisSK += ","+data.rs.rows[i].jenis;
				}
				if (!reload) this.doLoadData(this.cb_nik.getText(), sender.getText());
			}catch(e){
				alert(e);
			}
		}
		if (sender == this.ed_pangkal && sender.getText() != "" ){	
			try{
				var data = this.dbLib.getDataProvider("select max(tarif) as tarif from hr_gadaspangkal where  pangti =  case when "+sender.getText()+" >= pangti then pangti else "+sender.getText()+"  end",true);			
				if (data.rs.rows[0] !== undefined){
					this.ed_gaji.setText(floatToNilai(data.rs.rows[0].tarif));
				}
			}catch(e){
				alert(e);
			}
		}
		if (sender == this.cb_status){
			if (this.cb_status.getText() != '4')
				this.cb_bantu.setText('-','-');
		}
	}
});
