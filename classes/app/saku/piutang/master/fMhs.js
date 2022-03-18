window.app_saku_piutang_master_fMhs = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_master_fMhs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_master_fMhs";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Mahasiswa : Input/Koreksi", 0);
		
		uses("portalui_saiCBBL;portalui_datePicker");
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(30);
		this.e0.setWidth(200);
		this.e0.setCaption("NPM");
		this.e0.setText("");
		this.e0.setReadOnly(false);
		this.e0.onExit.set(this, "EditExit");
		this.e0.onChange.set(this, "doEditChange");
		this.e0.onKeyPress.set(this, "keyPress");
		this.e0.onBtnClick.set(this, "FindBtnClick");
		this.e0.setLabelWidth(100);
		this.e0.setRightLabelVisible(false);
		this.e0.setRightLabelCaption(" ");
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(55);
		this.e1.setWidth(400);
		this.e1.setCaption("Nama");
		this.e1.setText("");
		this.e1.setReadOnly(false);
		
		this.eNoUjian = new portalui_saiLabelEdit(this);
		this.eNoUjian.setLeft(20);
		this.eNoUjian.setTop(80);
		this.eNoUjian.setWidth(400);
		this.eNoUjian.setCaption("No Ujian");
		this.eNoUjian.setText("");
		this.eNoUjian.setReadOnly(false);
		
		this.eJurusan = new portalui_saiCBBL(this);
		this.eJurusan.setTop(105);
		this.eJurusan.setLeft(20);
		this.eJurusan.setWidth(200);
		this.eJurusan.setCaption("Jurusan");
		this.eJurusan.setText("");
		this.eJurusan.onBtnClick.set(this,"FindBtnClick");
		
		this.eAngkatan = new portalui_saiCBBL(this);
		this.eAngkatan.setTop(130);
		this.eAngkatan.setLeft(20);
		this.eAngkatan.setWidth(200);
		this.eAngkatan.setCaption("Angkatan");
		this.eAngkatan.setText("");
		this.eAngkatan.onBtnClick.set(this,"FindBtnClick");
		
		uses("portalui_saiCB");
		this.eSemester = new portalui_saiCB(this);
		this.eSemester.setTop(155);
		this.eSemester.setLeft(20);
		this.eSemester.setWidth(200);
		this.eSemester.setCaption("Semester");
		this.eSemester.setText("");
		this.eSemester.addItem(0,"01");
		this.eSemester.addItem(1,"02");
		this.eSemester.addItem(2,"03");
		this.eSemester.addItem(3,"04");
		this.eSemester.addItem(4,"05");
		this.eSemester.addItem(5,"06");
		this.eSemester.addItem(6,"07");
		this.eSemester.addItem(7,"08");
		this.eSemester.addItem(8,"09");
		this.eSemester.addItem(9,"10");
		this.eSemester.addItem(10,"11");
		this.eSemester.addItem(11,"12");
		this.eSemester.addItem(12,"13");
		this.eSemester.addItem(13,"14");
		
		this.eKet = new portalui_saiLabelEdit(this);
		this.eKet.setLeft(20);
		this.eKet.setTop(180);
		this.eKet.setWidth(400);
		this.eKet.setCaption("Keterangan Mhs");
		this.eKet.setText("");
		this.eKet.setReadOnly(false);			
		
		this.lStatus = new portalui_label(this);
		this.lStatus.setTop(205);
		this.lStatus.setLeft(20);
		this.lStatus.setWidth(100);
		this.lStatus.setHeight(20);
		this.lStatus.setCaption("Status Mhs");
		this.lStatus.setUnderLine(true);
		this.lStatus.onClick.set(this,"labelClick");
		
		uses("portalui_checkBox");
		this.eStatus = new portalui_checkBox(this);
		this.eStatus.setTop(205);
		this.eStatus.setLeft(120);
		this.eStatus.setWidth(50);
		this.eStatus.setCaption("Aktif");
		
		this.eStatus3 = new portalui_checkBox(this);
		this.eStatus3.setTop(205);
		this.eStatus3.setLeft(250);
		this.eStatus3.setWidth(150);
		this.eStatus3.setCaption("Ganti No Ujian dgn NPM/NIM");
		this.eStatus3.onChange.set(this,"doSelected");
		
		this.lStatus2 = new portalui_label(this);
		this.lStatus2.setTop(230);
		this.lStatus2.setLeft(20);
		this.lStatus2.setWidth(100);
		this.lStatus2.setHeight(20);
		this.lStatus2.setCaption("Status Mhs baru");
		this.lStatus2.setUnderLine(true);
		this.lStatus2.onClick.set(this,"labelClick");
		
		this.eStatus2 = new portalui_checkBox(this);
		this.eStatus2.setTop(230);
		this.eStatus2.setLeft(120);
		this.eStatus2.setWidth(100);
		this.eStatus2.setCaption("NPM Belum Aktif");				
		
		this.eNPM = new portalui_saiLabelEdit(this);
		this.eNPM.setTop(230);
		this.eNPM.setLeft(250);
		this.eNPM.setWidth(170);
		this.eNPM.setCaption("NPM Baru");
		this.eNPM.hide();
		this.eNPM.setTag(2);
		
		this.p = new portalui_panel(this);
		this.p.setTop(255);
		this.p.setLeft(20);
		this.p.setWidth(400);
		this.p.setHeight(100);
		this.p.setCaption("Cari Mahasiswa berdasarkan No Ujian / NPM");		
		this.p.setTag(2);
		
		this.cNoUjian = new portalui_checkBox(this.p);
		this.cNoUjian.setTop(25);
		this.cNoUjian.setLeft(200);
		this.cNoUjian.setWidth(150);
		this.cNoUjian.setCaption("No Ujian");
		this.cNoUjian.onChange.set(this,"doSelected");
		
		this.cNPM = new portalui_checkBox(this.p);
		this.cNPM.setTop(25);
		this.cNPM.setLeft(20);
		this.cNPM.setWidth(150);
		this.cNPM.setCaption("NPM/NIM");
		this.cNPM.onChange.set(this,"doSelected");
		
		this.eCari = new portalui_saiCBBL(this.p);
		this.eCari.setLeft(20);
		this.eCari.setTop(50);
		this.eCari.setWidth(250);
		this.eCari.setCaption("NPM");
		this.eCari.onBtnClick.set(this,"FindBtnClick");
		this.eCari.setTag(2);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.rearrangeChild(10,23);
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e)
		{
			alert("[app_saku_piutang_master_fMhs]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_master_fMhs.extend(window.portalui_childForm);
window.app_saku_piutang_master_fMhs.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{		
		system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");		 
	}
	if (sender == this.app._mainForm.bEdit)
	{
		try{
			if (this.eStatus3.isSelected()){
				var rs = this.dbLib.runSQL("select Nama_MHS from MHS where NPM = '"+this.eNPM.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				if (rs instanceof portalui_arrayMap){		   
					if (rs.get(0) != undefined)
						throw('NPM Baru sama dgn Nama '+rs.get(0).get("nama")+'. Transaksi dibatalkan.');		    		    
				}
			    rs = this.dbLib.runSQL("select NPM from MHS where No_Ujian = '"+this.eNPM.getText()+"' and NPM<>'"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			    
				if (rs instanceof portalui_arrayMap){		   
					if (rs.get(0) != undefined)
						throw('NPM Baru sama dgn No Ujian utk NPM '+rs.get(0).get("NPM")+'. Transaksi dibatalkan.');		    		    
				}
			 }else{
			    var rs = this.dbLib.runSQL("select NPM from MHS where no_ujian = '"+this.eNPM.getText()+"' and NPM<>'"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			    if (rs instanceof portalui_arrayMap){		   
					if (rs.get(0) != undefined)
						throw('NPM Baru sama dgn No Ujian utk NPM '+rs.get(0).get("NPM")+'. Transaksi dibatalkan.');		    		    
				}
			 }
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data di form ini akan disimpan.");
		 }catch(e)
		 {
			system.alert(this,e,"");
		 }
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_saku_piutang_master_fMhs.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0"],this.e0);				
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, ["0"])))
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into mhs (npm, nama_mhs, no_ujian, kode_jur, kode_ang,  semester, keterangan,status, status_baru, kode_lokasi) values  "+
							"('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.eNoUjian.getText()+"','"+this.eJurusan.getText()+"' "+
								",'"+this.eAngkatan.getText()+"','"+this.eSemester.getText()+"','"+this.eKet.getText()+"','"+(this.eStatus.isSelected()? "1":"0")+"','"+(this.eStatus2.isSelected()? "1":"0")+"','"+this.app._lokasi+"') ");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
		case "ubah" :
			if (modalResult == mrOk)
			{
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				var npm = this.e0.getText();
				if (this.eStatus3.isSelected() && this.eNPM.getText() != "")
					npm = this.eNPM.getText();
				sql.add("update mhs set  "+
							"npm= '"+npm+"', "+
							"nama_mhs= '"+this.e1.getText()+"', "+
							"no_ujian = '"+this.eNoUjian.getText()+"', "+
							"kode_jur = '"+this.eJurusan.getText()+"', "+
							"kode_ang = '"+this.eAngkatan.getText()+"', "+
							"semester = '"+this.eSemester.getText()+"', "+
							"keterangan = '"+this.eKet.getText()+"', "+
							"status = '"+(this.eStatus.isSelected()? "1":"0")+"',"+
							"status_baru = '"+(this.eStatus2.isSelected()? "1":"0")+"' "+
							"	where npm = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				if (this.eStatus3.isSelected()){
						sql.add("update ar_m set ref1 = '"+this.eNPM.getText()+"' where ref1 = '"+this.e0.getText()+"' ");
						sql.add("update arkb_m set ref1 = '"+this.eNPM.getText()+"' where ref1 = '"+this.e0.getText()+"' ");						
						sql.add("update ar_j set ref1 = '"+this.eNPM.getText()+"' where ref1 = '"+this.e0.getText()+"' ");												
					}
				this.dbLib.execArraySQL(sql);	
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {			  
				  uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from mhs where npm ='"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					this.dbLib.execArraySQL(sql);	
					this.standarLib.clearByTag(this, new Array("0"),this.e0);
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_saku_piutang_master_fMhs.prototype.labelClick = function(sender)
{
	if (sender == this.lStatus)	this.eStatus.setSelected(!this.eStatus.selected);
	if (sender == this.lStatus2)this.eStatus2.setSelected(!this.eStatus2.selected);
};
window.app_saku_piutang_master_fMhs.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{
			setTipeButton(tbSimpan);
			this.eStatus3.setSelected(false);
			this.eStatus3.setEnabled(false);
			var data = this.dbLib.runSQL("select a.*, c.nama_ang, b.nama_jur  "+
					"from mhs a "+
					"inner join jurusan b on b.kode_jur = a.kode_jur and b.kode_lokasi = a.kode_lokasi "+
					"inner join angkatan c on c.kode_ang = a.kode_ang and c.kode_lokasi = a.kode_lokasi and c.kode_jur = b.kode_jur "+
					"where a.npm = '"+this.e0.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.e1.setText(data.get("nama_mhs"));
					this.eNoUjian.setText(data.get("no_ujian"));
					this.eJurusan.setText(data.get("kode_jur"));
					this.eJurusan.setRightLabelCaption(data.get("nama_jur"));
					this.eAngkatan.setText(data.get("kode_ang"));
					this.eAngkatan.setRightLabelCaption(data.get("nama_ang"));
					this.eSemester.setText(data.get("semester"));
					this.eKet.setText(data.get("keterangan"));
					this.eStatus.setSelected(data.get("status") == "1" ? true:false);
					this.eStatus2.setSelected(data.get("status_baru") == "1" ? true:false);
					if (this.eStatus2.isSelected()){
						this.eStatus3.setEnabled(true);						
					}
					setTipeButton(tbUbahHapus);
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_piutang_master_fMhs.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.eJurusan)
			this.standarLib.showListData(this, "Data Jurusan",sender,undefined, 
										  "select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from jurusan where kode_lokasi = '"+this.app._lokasi+"' ",
										  ["kode_jur","nama_jur"],"and",["Kode Jurusan","Nama Jurusan"]);
		if (sender == this.eAngkatan)
			this.standarLib.showListData(this, "Data Angkatan",sender,undefined, 
										  "select kode_ang, nama_ang from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ","select count(*) from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"'",
										  ["kode_ang","nama_ang"],"and",["Kode Angkatan","Nama Angkatan"]);
		if (sender == this.e0)
			this.standarLib.showListData2(this, "Data MHS",sender,undefined, 
										  "select npm, nama_mhs, no_ujian from mhs where kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(*) from mhs where kode_lokasi = '"+this.app._lokasi+"' ",
										  ["npm","nama_mhs"],"and",["NPM / NIM","Nama MHS","No Ujian"]);
		if (sender == this.eCari){
			if (this.cNPM.isSelected())				
				this.standarLib.showListData2(this, "Data MHS",sender,undefined, 
										  "select npm, nama_mhs, no_ujian from mhs where kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(*) from mhs where kode_lokasi = '"+this.app._lokasi+"' ",
										  ["npm","nama_mhs"],"and", ["NPM / NIM","Nama MHS","No Ujian"]);
		   else if(this.cNoUjian.isSelected())
				this.standarLib.showListData2(this, "Data MHS",sender,undefined, 
										  "select no_ujian, nama_mhs, npm from mhs where kode_lokasi = '"+this.app._lokasi+"' ",
										  "select count(*) from mhs where kode_lokasi = '"+this.app._lokasi+"' ",
										  ["no_ujian","nama_mhs"],"and",["No Ujian","Nama MHS","NPM / NIM"]);
		}
	}catch(e)
	{
		alert(e);		
	}
};
window.app_saku_piutang_master_fMhs.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		try
		{   
			switch(methodName)
    		{
    			case "execArraySQL" :    				
    				step="info";
					if (result.toLowerCase().search("error") == -1)					
		            {
		              this.app._mainForm.pesan(2,"process completed ("+ this.e0.getText()+")");
		              this.app._mainForm.bClear.click();              
		            }else system.info(this,result,"");
    			break;
    		}
	    }catch(e)
	    {
	       alert("step : "+step+"; error = "+e);
	    }
	}
};
window.app_saku_piutang_master_fMhs.prototype.doSelected = function(sender, selected)
{	
	if (sender == this.eStatus3){
		this.eNPM.setVisible(selected);
	}else {
		if (selected){		
			this.eCari.setCaption(sender.caption);
		}
		if (sender == this.cNPM)
			if (selected)
				this.cNoUjian.setSelected(false);
		if (sender == this.cNoUjian)
			if (selected)
				this.cNPM.setSelected(false);	
	}
};