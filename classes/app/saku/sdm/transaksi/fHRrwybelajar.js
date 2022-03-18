window.app_saku_sdm_transaksi_fHRrwybelajar = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_transaksi_fHRrwybelajar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_sdm_transaksi_fHRrwybelajar";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Riwayat Tugas Belajar: Input/Koreksi", 0);	
		uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox");
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,10,185,20],caption:"NIK Pegawai",tag:9,rightLabelVisible:false});				
		this.bShow2 = new portalui_imageButton(this,{bound:[202,10,22,22],hint:"Load Data",image:"icon/"+system.getThemes()+"/reload.png"});		
        this.ed_nama = new portalui_saiLabelEdit(this,{bound:[20,32,350,20],caption:"Nama",readOnly:true,tag:9});
		this.ed_tmplahir = new portalui_saiLabelEdit(this,{bound:[20,33,240,20],caption:"Tempat / Tgl Lahir",tag:9,readOnly:true});		
		this.ed_tgllahir = new portalui_saiLabelEdit(this,{bound:[270,33,100,20],labelWidth:0,readOnly:true,tag:9,caption:""});
		this.ed_alamat = new portalui_saiLabelEdit(this,{bound:[20,34,450,20],caption:"Alamat",readOnly:true,tag:9});
		this.ed_tjab = new portalui_saiLabelEdit(this,{bound:[500,34,185,20],caption:"Tunj. Jabatan(%)",tipeText:ttNilai,text:"0",tag:3});				
		this.ed_nosk = new portalui_saiCBBL(this,{bound:[20,97,350,20],caption:"Nomor SK",tag:1,btnClick:[this,"FindBtnClick"],change:[this,"doChange"],rightLabelVisible:false});				
		this.cb_jenjang = new portalui_saiCB(this,{bound:[500,97,185,20],caption:"Jenjang Pendidikan", readOnly:true,tag:3});		
		this.cb_jenjang.addItem(0,"SD");
		this.cb_jenjang.addItem(1,"SLTP");
		this.cb_jenjang.addItem(2,"SLTA");
		this.cb_jenjang.addItem(3,"D1");
		this.cb_jenjang.addItem(4,"D2");
		this.cb_jenjang.addItem(5,"D3");
		this.cb_jenjang.addItem(6,"D4");
		this.cb_jenjang.addItem(7,"S1");
		this.cb_jenjang.addItem(8,"S2");
		this.cb_jenjang.addItem(9,"S3");
        //--------------------
		this.cb_pid = new portalui_saiCBBL(this,{bound:[20,35,205,20],caption:"No. PID Induk",rightLabelVisible:false,tag:2});
		this.bShow = new portalui_imageButton(this,{bound:[230,35,22,22],hint:"Tampil Data",image:"icon/"+system.getThemes()+"/reload.png"});
		
        this.ed_jurusan = new portalui_saiLabelEdit(this,{bound:[500,35,300,20],caption:"Jurusan",tag:3});		
		
		this.lbltgl1 = new portalui_label(this,{bound:[20,120,101,18],caption:"Tanggal Masuk",underline:true});
		uses("portalui_datePicker");	
		this.dp_tglmasuk = new portalui_datePicker(this,{bound:[120,120,82,20]});		
        this.ed_institusi = new portalui_saiLabelEdit(this,{bound:[500,120,300,20],caption:"Institusi",tag:3});				
        
		this.lbltgl2 = new portalui_label(this,{bound:[20,142,101,18],caption:"Tanggal Lulus",underline:true});
		this.dp_tgllulus = new portalui_datePicker(this,{bound:[120,142,82,20]});
		this.cb_lulus = new portalui_checkBox(this,{bound:[230,142,100,20],caption:"Status Lulus"});
		
		this.ed_aman1 = new portalui_saiLabelEdit(this,{bound:[20,164,350,20],caption:"Amandemen 1",maxLength:30,tag:3});				
		this.lbltgl3 = new portalui_label(this,{bound:[500,164,101,18],underline:true,caption:"Tanggal Berlaku"});				
		this.dp_tglaman11 = new portalui_datePicker(this,{bound:[600,164,82,20]});
		this.lbltgl4 = new portalui_label(this,{bound:[690,164,20,18],caption:"s.d",underline:true});				
		this.dp_tglaman12 = new portalui_datePicker(this,{bound:[720,164,82,20]});		
		
		this.ed_aman2 = new portalui_saiLabelEdit(this,{bound:[20,165,350,20],caption:"Amandemen 2",maxLength:30,tag:3});						
		this.lbltgl5 = new portalui_label(this,{bound:[500,165,101,18],caption:"Tanggal Berlaku",underline:true});				
		this.dp_tglaman21 = new portalui_datePicker(this,{bound:[600,165,82,20]});				
		this.lbltgl6 = new portalui_label(this,{bound:[690,165,20,18],caption:"s.d",underline:true});						
		this.dp_tglaman22 = new portalui_datePicker(this,{bound:[720,165,82,20]});				
		
		this.ed_aman3 = new portalui_saiLabelEdit(this,{bound:[20,166,350,20],caption:"Amandemen 3",maxLength:30,tag:3});		
		this.lbltgl7 = new portalui_label(this,{bound:[500,166,101,18],caption:"Tanggal Berlaku",underline:true});								
		this.dp_tglaman31 = new portalui_datePicker(this,{bound:[600,166,82,20]});						
		this.lbltgl8 = new portalui_label(this,{bound:[690,166,20,18],caption:"s.d",underline:true});						
		this.dp_tglaman32 = new portalui_datePicker(this,{bound:[720,166,82,20]});						
		
	    this.p1 = new portalui_panel(this);
	    this.p1.setLeft(20);
	    this.p1.setTop(230);
	    this.p1.setWidth(930);
	    this.p1.setHeight(238);
	    this.p1.setName('p1');
	    this.p1.setCaption('Riwayat Tugas Belajar');
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(927);
		this.sg1.setHeight(185);			
		this.sg1.setColCount(4);
		this.sg1.setTag("4");
		this.sg1.setReadOnly(false);
		this.sg1.setColTitle(["Semester","IPS/IPK","Keterangan Biaya","Nilai"]);
		this.sg1init(this.sg1);
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(210);
		this.sgn.setLeft(1);
		this.sgn.setWidth(929);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		
		setTipeButton(tbSimpan);		
		this.cb_nik.onBtnClick.set(this, "FindBtnClick");
		//this.cb_nik.onChange.set(this, "doEditChange");
		this.cb_pid.onBtnClick.set(this, "FindBtnClick");
		this.bShow.onClick.set(this,"showClick");
		this.bShow2.onClick.set(this, "show2Click");
		
		this.nourut=0;
		this.setTabChildIndex();
		this.rearrangeChild(10,23);
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			
			this.lokkonsol = this.app._lokKonsol;
			this.sg1.clear(1); 
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_sdm_transaksi_fHRrwybelajar.extend(window.portalui_childForm);
window.app_saku_sdm_transaksi_fHRrwybelajar.prototype.sg1init = function(sg)
{
	sg.columns.get(1).setColumnFormat(window.cfNilai);
	sg.columns.get(3).setColumnFormat(window.cfNilai);
	sg.setColWidth([3,2,1,0],[250,250,200,200]);
};
window.app_saku_sdm_transaksi_fHRrwybelajar.prototype.doEditChange = function(sender)
{
	if (this.cb_nik.getText() != "")
	{
		var line,data = this.dbLib.runSQL("select nama, alamat, tempat_lahir ,tgl_lahir "+
		                                  "from karyawan where kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' ");
		if (data instanceof portalui_arrayMap)
		{
			line = data.get(0);
			if (line != undefined)
			{
				this.ed_tmplahir.setText(line.get("tempat_lahir"));
				var dt=line.get("tgl_lahir").split(" ");
					dt=dt[0].split("-");
				this.ed_tgllahir.setText(dt[2]+"/"+dt[1]+"/"+dt[0]);							
				this.ed_alamat.setText(line.get("alamat"));
				this.ed_nama.setText(line.get("nama"));
			}
		}
	}
};
window.app_saku_sdm_transaksi_fHRrwybelajar.prototype.mainButtonClick = function(sender)
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
window.app_saku_sdm_transaksi_fHRrwybelajar.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1","2","3","4"),this.cb_nik);
				this.sg1.clear(1); 
				setTipeButton(tbSimpan);
			}
			break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1","2","3","9"))))
			{
				try
				{					
					var tgl = new Date();
					uses("server_util_arrayList");
					sql = new server_util_arrayList();					
					sql.add("insert into hr_belajar_m (nik,no_pid,tgl_masuk,tgl_lulus,aman1,aman2,aman3,tgl_aman11,tgl_aman12,tgl_aman21,tgl_aman22,tgl_aman31,tgl_aman32,jenjang,jurusan,institusi, "+
					        "                          kode_lokkonsol,user_id,tgl_input, tjab,status,no_sk) "+
					        "values ('"+this.cb_nik.getText()+"','"+this.cb_pid.getText()+"','"+this.dp_tglmasuk.getDate()+"','"+
							            this.dp_tgllulus.getDate()+"','"+this.ed_aman1.getText()+"','"+this.ed_aman2.getText()+"','"+
										this.ed_aman3.getText()+"','"+this.dp_tglaman11.getDate()+"','"+this.dp_tglaman12.getDate()+"','"+
										this.dp_tglaman21.getDate()+"','"+this.dp_tglaman22.getDate()+"','"+this.dp_tglaman31.getDate()+"','"+
										this.dp_tglaman32.getDate()+"','"+this.cb_jenjang.getText()+"','"+this.ed_jurusan.getText()+"','"+this.ed_institusi.getText()+"','" +										
										this.lokkonsol+"','"+this.app._userLog+"',now(),'"+nilaiToFloat(this.ed_tjab.getText())+"','"+(this.cb_lulus.isSelected()?"1":"0")+"','"+this.ed_nosk.getText()+"')");
					
					var idx = 0;
					var scr1 = "insert into hr_belajar_d (nik,no_pid,kode_lokkonsol,no_urut,semester,ipk,keterangan,nilai) values ";
					var baris1 = true;
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						if (this.sg1.rowValid(i)) {	
							if (!baris1) { scr1 += ",";}	
								scr1 += "('"+this.cb_nik.getText()+"','"+this.cb_pid.getText()+"','"+this.lokkonsol+"',"+idx+",'"+this.sg1.getCell(0,i)+
										"',"+parseNilai(this.sg1.getCell(1,i))+",'"+this.sg1.getCell(2,i)+"',"+parseNilai(this.sg1.getCell(3,i))+")";
								baris1 = false;
						}
					}	
					if (!baris1) sql.add(scr1);
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
			break;
		case "ubah" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1","2","3","9"))))
			{
				try
				{
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();										
					sql.add("update hr_belajar_m set tgl_masuk='"+this.dp_tglmasuk.getDate()+"',tgl_lulus='"+this.dp_tgllulus.getDate()+"',"+
					        "aman1='"+this.ed_aman1.getText()+"',aman2='"+this.ed_aman2.getText()+
							"',aman3='"+this.ed_aman3.getText()+"',tgl_aman11='"+this.dp_tglaman11.getDate()+"',tgl_aman12='"+this.dp_tglaman12.getDate()+"', tgl_aman21='"+
							this.dp_tglaman21.getDate()+"',tgl_aman22='"+this.dp_tglaman22.getDate()+"',tgl_aman31='"+this.dp_tglaman31.getDate()+"',tgl_aman32='"+this.dp_tglaman32.getDate()+
							"',jenjang='"+this.cb_jenjang.getText()+"',jurusan='"+this.ed_jurusan.getText()+"',institusi='"+this.ed_institusi.getText()+"' "+
							", tjab = '"+nilaiToFloat(this.ed_tjab.getText())+"', status='"+(this.cb_lulus.isSelected()?"1":"0")+"' "+
							",,no_sk='"+this.ed_nosk.getText()+"' "+
							" where nik = '"+this.cb_nik.getText()+"' and kode_lokkonsol ='"+this.lokkonsol+"' and no_pid='"+this.cb_pid.getText()+"' ");
					
					sql.add("delete from hr_belajar_d where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and no_pid='"+this.cb_pid.getText()+"'");
					var idx = 0;
					var scr1 = "insert into hr_belajar_d (nik,no_pid,kode_lokkonsol,no_urut,semester,ipk,keterangan,nilai) values ";
					var baris1 = true;
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						if (!baris1) { scr1 += ",";}	
						scr1 += "('"+this.cb_nik.getText()+"','"+this.cb_pid.getText()+"','"+this.lokkonsol+"',"+idx+",'"+this.sg1.getCell(0,i)+
								"',"+parseNilai(this.sg1.getCell(1,i))+",'"+this.sg1.getCell(2,i)+"',"+parseNilai(this.sg1.getCell(3,i))+")";
						baris1 = false;
					}	
					if (!baris1) sql.add(scr1);
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
				sql.add("delete from hr_belajar_d where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and no_pid='"+this.cb_pid.getText()+"'");
				sql.add("delete from hr_belajar_m where nik='"+this.cb_nik.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and no_pid='"+this.cb_pid.getText()+"'");
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_saku_sdm_transaksi_fHRrwybelajar.prototype.show2Click = function(sender)
{
	if (this.cb_nik.getText() != "")
	{
		try
		{
			this.doEditChange(this.cb_nik);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_sdm_transaksi_fHRrwybelajar.prototype.showClick = function(sender)
{
	if (this.cb_pid.getText() != "")
	{
		try
		{			
			var data = this.dbLib.runSQL("select tgl_masuk,tgl_lulus,aman1,aman2,aman3,jenjang,jurusan,institusi,tgl_aman11,tgl_aman12,tgl_aman21,tgl_aman22,tgl_aman31,tgl_aman32, tjab, status, no_sk "+
									     "from hr_belajar_m "+
									     "where no_pid='"+this.cb_pid.getText()+"' and kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' ");
	
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{
					setTipeButton(tbUbahHapus);
					line = data.get(0);		
					this.dp_tglmasuk.setDateString(line.get("tgl_masuk"));
					this.dp_tgllulus.setDateString(line.get("tgl_lulus"));
					this.ed_aman1.setText(line.get("aman1"));
					this.ed_aman2.setText(line.get("aman2"));
					this.ed_aman3.setText(line.get("aman3"));
					this.cb_jenjang.setText(line.get("jenjang"));
					this.ed_jurusan.setText(line.get("jurusan"));
					this.ed_institusi.setText(line.get("institusi"));
					this.ed_tjab.setText(floatToNilai(line.get("tjab")));
					this.dp_tglaman11.setDateString(line.get("tgl_aman11"));
					this.dp_tglaman12.setDateString(line.get("tgl_aman12"));
					this.dp_tglaman21.setDateString(line.get("tgl_aman21"));
					this.dp_tglaman22.setDateString(line.get("tgl_aman22"));
					this.dp_tglaman31.setDateString(line.get("tgl_aman31"));
					this.dp_tglaman32.setDateString(line.get("tgl_aman32"));
					this.cb_lulus.setSelected(line.get("status") == "1");
					this.ed_nosk.setText(line.get("no_sk"));
				}
				else
				{
					setTipeButton(tbSimpan);
				}
			}
			
			this.sg1.clear();									   
			var data = this.dbLib.runSQL("select semester, ipk, keterangan,nilai "+
								 "from hr_belajar_d "+
								 "where kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.cb_nik.getText()+"' and no_pid = '"+this.cb_pid.getText()+"' ");

			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{
					line = data.get(0);		
					this.sg1.setData(data);										
				} else
				{
					this.sg1.clear(1);
				}
			}
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_sdm_transaksi_fHRrwybelajar.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cb_nik) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",this.cb_nik,this.ed_nama, 
										  "select nik, nama  from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(nik) from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
			this.standarLib.clearByTag(this, new Array("1","2","3"),undefined);	
			this.sg1.clear(1);
		}
		if (sender == this.cb_pid) 
		{
			if (this.cb_nik.getText() != "") 
			{
				this.standarLib.showListData(this, "Daftar No PID Induk",sender,undefined, 
										  "select no_pid, jenjang  from hr_belajar_m where kode_lokkonsol='"+this.lokkonsol+"' and nik='"+this.cb_nik.getText()+"' ",
										  "select count(no_pid)    from hr_belajar_m where kode_lokkonsol='"+this.lokkonsol+"' and nik='"+this.cb_nik.getText()+"' ",
										  new Array("no_pid","jenjang"),"and",new Array("No PID","Jenjang"),false);
				this.standarLib.clearByTag(this, new Array("3"),undefined);	
			}
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
window.app_saku_sdm_transaksi_fHRrwybelajar.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_sdm_transaksi_fHRrwybelajar.implement({
    doLoadData: function(nik, sk){        
    },
	doChange: function(sender){	    
		if (sender == this.ed_nosk){
			try{
                var data = this.dbLib.getDataProvider("select a.tgl_sk, a.tgl_mulai, a.tgl_berlaku, datediff(now(),a.tgl_mulai) as jmlhari,ifnull(b.jenis,'') as jenis  from hr_sk a left outer join hr_sk_jenis b on b.no_sk = a.no_sk and b.nik = a.nik and b.kode_lokkonsol = a.kode_lokkonsol where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and a.nik = '"+this.cb_nik.getText()+"' and a.no_sk='"+this.ed_nosk.getText()+"'",true);                
			}catch(e){
				alert(e);
			}
		}		
	}
});
