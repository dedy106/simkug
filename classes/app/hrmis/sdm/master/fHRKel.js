window.app_hrmis_sdm_master_fHRKel = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_master_fHRKel.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_sdm_master_fHRKel";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Data Keluarga : Input/Koreksi",0);
		
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(10);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("NIK Pegawai");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(false);
		this.ed_kode.setRightLabelCaption("");
		this.ed_kode.setTag("9");

		this.bShow = new portalui_imageButton(this);
		this.bShow.setLeft(202);
		this.bShow.setTop(10);
		this.bShow.setHint("Load Data");
		this.bShow.setImage("icon/"+system.getThemes()+"/reload.png");
		this.bShow.setWidth(22);
		this.bShow.setHeight(22);
		
		this.ed_nama = new portalui_saiLabelEdit(this);
		this.ed_nama.setLeft(20);
		this.ed_nama.setTop(32);
		this.ed_nama.setWidth(400);
		this.ed_nama.setCaption("Nama Pegawai");
		this.ed_nama.setText("");
		this.ed_nama.setReadOnly(true);
		this.ed_nama.setLength(100);
		this.ed_nama.setTag("9");
		
		this.ed_nama2 = new portalui_saiLabelEdit(this);
		this.ed_nama2.setLeft(20);
		this.ed_nama2.setTop(54);
		this.ed_nama2.setWidth(400);
		this.ed_nama2.setCaption("Nama Anggota");
		this.ed_nama2.setText("");
		this.ed_nama2.setReadOnly(false);
		this.ed_nama2.setLength(100);
		this.ed_nama2.setTag("1");
		
		this.ed_status = new portalui_saiCB(this);
		this.ed_status.setTop(76);
		this.ed_status.setLeft(20);
		this.ed_status.setWidth(200);
		this.ed_status.setReadOnly(true);
		this.ed_status.setCaption("Status Keluarga");
		this.ed_status.addItem(0,"Ayah");
		this.ed_status.addItem(1,"Ibu");
		this.ed_status.addItem(2,"Suami");
		this.ed_status.addItem(3,"Istri");
		this.ed_status.addItem(4,"Anak");
		this.ed_status.addItem(5,"Ayah Mertua");
		this.ed_status.addItem(6,"Ibu Mertua");
		this.ed_status.setLength(100);
		this.ed_status.setTag("9");
		
		this.ed_status2 = new portalui_saiCB(this);
		this.ed_status2.setTop(98);
		this.ed_status2.setLeft(20);
		this.ed_status2.setWidth(200);
		this.ed_status2.setReadOnly(true);
		this.ed_status2.setCaption("Status");
		this.ed_status2.addItem(0,"Hidup");
		this.ed_status2.addItem(1,"Meninggal");
		this.ed_status2.setLength(100);
		this.ed_status2.setTag("9");
		
		this.ed_tmptlhr = new portalui_saiLabelEdit(this);
		this.ed_tmptlhr.setLeft(20);
		this.ed_tmptlhr.setTop(120);
		this.ed_tmptlhr.setWidth(250);
		this.ed_tmptlhr.setCaption("Tempat Lahir");
		this.ed_tmptlhr.setText("");
		this.ed_tmptlhr.setReadOnly(false);
		this.ed_tmptlhr.setLength(100);
		this.ed_tmptlhr.setTag("1");
		
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(142);
		this.lbltgl1.setLeft(20);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setCaption("Tanggal Lahir");
		this.lbltgl1.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tgllhr = new portalui_datePicker(this);
		this.dp_tgllhr.setTop(144);
		this.dp_tgllhr.setLeft(120);
		this.dp_tgllhr.setWidth(82);
		
		this.lbltgl1 = new portalui_label(this);
		this.lbltgl1.setTop(164);
		this.lbltgl1.setLeft(20);
		this.lbltgl1.setWidth(101);		
		this.lbltgl1.setHeight(20);		
		this.lbltgl1.setCaption("Tanggal Nikah");
		this.lbltgl1.setUnderLine(true);
		
		this.dp_tglnkh = new portalui_datePicker(this);
		this.dp_tglnkh.setTop(166);
		this.dp_tglnkh.setLeft(120);
		this.dp_tglnkh.setWidth(82);
		
		this.ed_alamat = new portalui_saiLabelEdit(this);
		this.ed_alamat.setLeft(20);
		this.ed_alamat.setTop(186);
		this.ed_alamat.setWidth(400);
		this.ed_alamat.setCaption("Alamat");
		this.ed_alamat.setText("");
		this.ed_alamat.setReadOnly(false);
		this.ed_alamat.setLength(100);
		this.ed_alamat.setTag("1");
		
		this.ed_kota = new portalui_saiLabelEdit(this);
		this.ed_kota.setLeft(20);
		this.ed_kota.setTop(208);
		this.ed_kota.setWidth(250);
		this.ed_kota.setCaption("Kota");
		this.ed_kota.setText("");
		this.ed_kota.setReadOnly(false);
		this.ed_kota.setLength(100);
		this.ed_kota.setTag("1");
		
		this.ed_provinsi = new portalui_saiLabelEdit(this);
		this.ed_provinsi.setLeft(20);
		this.ed_provinsi.setTop(230);
		this.ed_provinsi.setWidth(250);
		this.ed_provinsi.setCaption("Provinsi");
		this.ed_provinsi.setText("");
		this.ed_provinsi.setReadOnly(false);
		this.ed_provinsi.setLength(100);
		this.ed_provinsi.setTag("1");
		
		this.ed_kodepos = new portalui_saiLabelEdit(this);
		this.ed_kodepos.setLeft(500);
		this.ed_kodepos.setTop(76);
		this.ed_kodepos.setWidth(250);
		this.ed_kodepos.setTipeText(ttAngka);
		this.ed_kodepos.setCaption("Kode Pos");
		this.ed_kodepos.setText("");
		this.ed_kodepos.setReadOnly(false);
		this.ed_kodepos.setLength(5);
		this.ed_kodepos.setTag("1");
		
		this.ed_telepon = new portalui_saiLabelEdit(this);
		this.ed_telepon.setLeft(500);
		this.ed_telepon.setTop(98);
		this.ed_telepon.setWidth(250);
		this.ed_telepon.setCaption("Telepon");
		this.ed_telepon.setText("");
		this.ed_telepon.setReadOnly(false);
		this.ed_telepon.setLength(100);
		this.ed_telepon.setTag("1");
		
		this.ed_sex = new portalui_saiCB(this);
		this.ed_sex.setTop(120);
		this.ed_sex.setLeft(500);
		this.ed_sex.setWidth(200);
		this.ed_sex.setReadOnly(true);
		this.ed_sex.setCaption("Jenis Kelamin");
		this.ed_sex.addItem(0,"Laki-Laki");
		this.ed_sex.addItem(1,"Perempuan");
		this.ed_sex.setLength(100);
		this.ed_sex.setTag("9");
		
		this.ed_status3 = new portalui_saiCB(this);
		this.ed_status3.setTop(142);
		this.ed_status3.setLeft(500);
		this.ed_status3.setWidth(200);
		this.ed_status3.setReadOnly(true);
		this.ed_status3.setCaption("Status Pekerjaan");
		this.ed_status3.addItem(0,"Pegawai");
		this.ed_status3.addItem(1,"Siswa");
		this.ed_status3.addItem(2,"Mahasiswa");
		this.ed_status3.addItem(3,"PNS");
		this.ed_status3.addItem(4,"Pensiun");
		this.ed_status3.addItem(5,"Tidak Bekerja");
		this.ed_status3.addItem(6,"Bekerja");
		this.ed_status3.setLength(100);
		this.ed_status3.setTag("9");
		
		this.ed_inst = new portalui_saiLabelEdit(this);
		this.ed_inst.setLeft(500);
		this.ed_inst.setTop(164);
		this.ed_inst.setWidth(250);
		this.ed_inst.setCaption("Institusi");
		this.ed_inst.setText("");
		this.ed_inst.setReadOnly(false);
		this.ed_inst.setLength(100);
		this.ed_inst.setTag("1");
		
		this.ed_status4 = new portalui_saiCB(this);
		this.ed_status4.setTop(186);
		this.ed_status4.setLeft(500);
		this.ed_status4.setWidth(200);
		this.ed_status4.setReadOnly(true);
		this.ed_status4.setCaption("Status Tanggungan");
		this.ed_status4.addItem(0,"Tanggungan");
		this.ed_status4.addItem(1,"Bukan Tanggungan");
		this.ed_status4.setLength(100);
		this.ed_status4.setTag("9");
		
		this.ed_status5 = new portalui_saiCB(this);
		this.ed_status5.setTop(208);
		this.ed_status5.setLeft(500);
		this.ed_status5.setWidth(200);
		this.ed_status5.setReadOnly(true);
		this.ed_status5.setCaption("Status Anak");
		this.ed_status5.addItem(0,"Kandung");
		this.ed_status5.addItem(1,"Angkat");
		this.ed_status5.addItem(2,"Tiri");
		this.ed_status5.setLength(100);
		this.ed_status5.setTag("9");
		
		this.ed_nik = new portalui_saiLabelEdit(this);
		this.ed_nik.setLeft(500);
		this.ed_nik.setTop(230);
		this.ed_nik.setWidth(250);
		this.ed_nik.setCaption("NIK Anggota");
		this.ed_nik.setText("");
		this.ed_nik.setReadOnly(false);
		this.ed_nik.setLength(100);
		this.ed_nik.setTag("1");
		
		this.bhistory = new portalui_button(this);
		this.bhistory.setTop(230);
		this.bhistory.setLeft(925);
		this.bhistory.setCaption("Tampil");
		
	    	this.p1 = new portalui_panel(this);
	    	this.p1.setLeft(20);
	    	this.p1.setTop(254);
	    	this.p1.setWidth(980);
	    	this.p1.setHeight(203);
	    	this.p1.setName('p1');
	    	this.p1.setCaption('Anggota Keluarga');
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(975);
		this.sg1.setHeight(180);			
		this.sg1.setColCount(17);
		this.sg1.setTag("9");
		this.sg1.setReadOnly(true);
		this.sg1.setColTitle(["Nama","Status Keluarga","Status","Tempat Lahir","Tgl Lahir","Tgl Nikah","Alamat","Kota","Provinsi","Kode Pos","Telepon","Jenis Kelamin","Status Pekerjaan","Institusi","Status Tanggungan","Status Anak","NIK"]);
		this.sg1init(this.sg1);
		this.sg1.onDblClick.set(this, "sg1onDblClick");
		
		setTipeButton(tbSimpan);
		this.ed_status.onChange.set(this,"onChange");
		this.ed_nama2.onChange.set(this,"onChange");
		this.bhistory.onClick.set(this, "showClick");
		this.ed_kode.onBtnClick.set(this, "FindBtnClick");
		this.bShow.onClick.set(this, "show2Click");

		this.status="";
		this.nourut=0;
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.sg1.clear();  this.sg1.appendRow();
			var line,data = this.dbLib.runSQL("select kode_lokkonsol from lokasi where kode_lokasi = '"+this.app._lokasi+"'");
			if (data instanceof portalui_arrayMap)
			{
				line = data.get(0);
				if (line != undefined)
				{
					this.lokkonsol= line.get("kode_lokkonsol");
				}
			}
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_hrmis_sdm_master_fHRKel.extend(window.portalui_childForm);
window.app_hrmis_sdm_master_fHRKel.implement({
    doLoadData: function(){
        var dt=this.sg1.getCell(4,row).split("/");
		var dtlhr=dt[2]+"-"+dt[1]+"-"+dt[0];
		var data = this.dbLib.runSQL("select no_urut,tgl_lahir,tgl_nikah "+
									 "from hr_keluarga "+
									 "where nik='"+this.ed_kode.getText()+"' and nama='"+this.ed_nama2.getText()+
									 "' and kode_lokkonsol='"+this.lokkonsol+"'");
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				setTipeButton(tbUbahHapus);
				line = data.get(0);		
				this.nourut=parseInt(line.get("no_urut"));				
				this.ed_status.setText(this.sg1.cells(1,row));
				this.ed_status2.setText(this.sg1.cells(2,row));
				this.ed_tmptlhr.setText(this.sg1.cells(3,row));
				this.dp_tgllhr.setDateString(line.get("tgl_lahir"));
				this.dp_tglnkh.setDateString(line.get("tgl_nikah"));
				this.ed_alamat.setText(this.sg1.cells(6,row));
				this.ed_kota.setText(this.sg1.cells(7,row));
				this.ed_provinsi.setText(this.sg1.cells(8,row));
				this.ed_kodepos.setText(this.sg1.cells(9,row));
				this.ed_telepon.setText(this.sg1.cells(10,row));
				this.ed_sex.setText(this.sg1.cells(11,row));
				this.ed_status3.setText(this.sg1.cells(12,row));
				this.ed_inst.setText(this.sg1.cells(13,row));
				this.ed_status4.setText(this.sg1.cells(14,row));
				this.ed_status5.setText(this.sg1.cells(15,row));
				this.ed_nik.setText(this.sg1.cells(16,row));
			}
			else
			{
				setTipeButton(tbSimpan);
			}
		}
    },
});
window.app_hrmis_sdm_master_fHRKel.prototype.sg1init = function(sg)
{
	sg.setColWidth([16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
					[80,100,100,100,100,100,100,100,100,100,150,80,80,100,80,100,150]);
};
        
window.app_hrmis_sdm_master_fHRKel.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{			
		var dt=this.sg1.getCell(4,row).split("/");
		var dtlhr=dt[2]+"-"+dt[1]+"-"+dt[0];
		var data = this.dbLib.runSQL("select no_urut,tgl_lahir,tgl_nikah "+
									 "from hr_keluarga "+
									 "where nik='"+this.ed_kode.getText()+"' and nama='"+this.sg1.cells(0,row)+
									 "' and status_family='"+this.sg1.cells(1,row)+"' and tgl_lahir='"+dtlhr+"' and kode_lokkonsol='"+this.lokkonsol+"'");
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				setTipeButton(tbUbahHapus);
				line = data.get(0);		
				this.nourut=parseInt(line.get("no_urut"));
				this.ed_nama2.onChange.set(undefined,undefined);
				this.ed_nama2.setText(this.sg1.cells(0,row));
				this.ed_nama2.onChange.set(this,"doChange");
				this.ed_status.setText(this.sg1.cells(1,row));
				this.ed_status2.setText(this.sg1.cells(2,row));
				this.ed_tmptlhr.setText(this.sg1.cells(3,row));
				this.dp_tgllhr.setDateString(line.get("tgl_lahir"));
				this.dp_tglnkh.setDateString(line.get("tgl_nikah"));
				this.ed_alamat.setText(this.sg1.cells(6,row));
				this.ed_kota.setText(this.sg1.cells(7,row));
				this.ed_provinsi.setText(this.sg1.cells(8,row));
				this.ed_kodepos.setText(this.sg1.cells(9,row));
				this.ed_telepon.setText(this.sg1.cells(10,row));
				this.ed_sex.setText(this.sg1.cells(11,row));
				this.ed_status3.setText(this.sg1.cells(12,row));
				this.ed_inst.setText(this.sg1.cells(13,row));
				this.ed_status4.setText(this.sg1.cells(14,row));
				this.ed_status5.setText(this.sg1.cells(15,row));
				this.ed_nik.setText(this.sg1.cells(16,row));
			}
			else
			{
				setTipeButton(tbSimpan);
			}
		}
	}catch(e)
	{
		system.alert(this, e,"");
	}
};
window.app_hrmis_sdm_master_fHRKel.prototype.mainButtonClick = function(sender)
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
window.app_hrmis_sdm_master_fHRKel.prototype.doModalResult = function(event, modalResult)
{			
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);
				this.sg1.clear(); this.sg1.appendRow();
				setTipeButton(tbSimpan);
			}
			break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0","1"))))
			{
				try
				{					
					var data = this.dbLib.runSQL("select max(no_urut) as maks from hr_keluarga where nik='"+this.ed_kode.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{
							line = data.get(0);		
							if (line.get("maks")==undefined)
								this.nourut=1;
							else this.nourut=parseInt(line.get("maks"))+1;
						}
					}
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					if ((this.ed_status.getText() == "Suami") || (this.ed_status.getText() == "Istri"))
					{
						dt=this.dp_tglnkh.getDateString().split("/");
						var dtnkh=dt[0]+"-"+dt[1]+"-"+dt[2];
					}else
					{
						var dtnkh="0000-00-00";
					}
					sql.add("insert into hr_keluarga (nik,no_urut,nama,status_family,status,tgl_lahir,tgl_nikah,alamat,kota,provinsi,kodepos,no_telp,sex,status_kerja,institusi,status_tanggungan,status_anak,nik2,tempat_lahir,kode_lokkonsol) values ('"+
					this.ed_kode.getText()+"','"+this.nourut+"','"+this.ed_nama2.getText()+"','"+this.ed_status.getText()+"','"+this.ed_status2.getText()+"','"+this.dp_tgllhr.getDate()+"','"+dtnkh+"','"+this.ed_alamat.getText()+"','"+this.ed_kota.getText()+"','"+this.ed_provinsi.getText()+"','"+this.ed_kodepos.getText()+"','"+this.ed_telepon.getText()+"','"+this.ed_sex.getText()+"','"+this.ed_status3.getText()+"','"+this.ed_inst.getText()+"','"+this.ed_status4.getText()+"','"+this.ed_status5.getText()+"','"+this.ed_nik.getText()+"','"+this.ed_tmptlhr.getText()+"','"+this.lokkonsol+"')");
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
					sql.add("update hr_keluarga set nama='"+this.ed_nama2.getText()+"',status_family='"+this.ed_status.getText()+
					"',status='"+this.ed_status2.getText()+"',tgl_lahir='"+this.dp_tgllhr.getDate()+"',tgl_nikah='"+this.dp_tglnkh.getDate()+
					"',alamat='"+this.ed_alamat.getText()+"',kota='"+this.ed_kota.getText()+"',provinsi='"+this.ed_provinsi.getText()+
					"',kodepos='"+this.ed_kodepos.getText()+"',no_telp='"+this.ed_telepon.getText()+"',sex='"+this.ed_sex.getText()+
					"',status_kerja='"+this.ed_status3.getText()+"',institusi='"+this.ed_inst.getText()+"',status_tanggungan='"+this.ed_status4.getText()+
					"',status_anak='"+this.ed_status5.getText()+"',nik2='"+this.ed_nik.getText()+"',tempat_lahir='"+this.ed_tmptlhr.getText()+
					"' where nik='"+this.ed_kode.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and no_urut="+this.nourut);
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
				sql.add("delete from hr_keluarga where nik='"+this.ed_kode.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"' and no_urut="+this.nourut);
				this.dbLib.execArraySQL(sql);	
		   }
			break;
	}
};
window.app_hrmis_sdm_master_fHRKel.prototype.show2Click = function(sender)
{
	if (this.ed_kode.getText() != "")
	{
		try
		{
			var data = this.dbLib.runSQL("select nama from karyawan "+
								 "where nik='"+this.ed_kode.getText()+"' and kode_lokkonsol='"+this.lokkonsol+"'");
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					line = data.get(0);
					this.ed_nama.setText(line.get("nama"));					
				} 
			}
			this.bhistory.click();
			
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_hrmis_sdm_master_fHRKel.prototype.showClick = function(sender)
{
	if (sender == this.bhistory)
	{
		if (this.ed_kode.getText() != "")
		{
			try
			{			
				var data = this.dbLib.runSQL("select b.nama,b.status_family,b.status,b.tempat_lahir,b.tgl_lahir,b.tgl_nikah,b.alamat,"+
											 "       b.kota,provinsi,b.kodepos,b.no_telp,b.sex,b.status_kerja,b.institusi,b.status_tanggungan,b.status_anak,b.nik2 "+
											 "from karyawan a inner join hr_keluarga b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
											 "where a.nik='"+this.ed_kode.getText()+"' and b.kode_lokkonsol='"+this.lokkonsol+"'");
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{
						line = data.get(0);		
						this.sg1.clear();
						this.sg1.setData(data);										
						this.sg1init(this.sg1);
						for (var i=0;i < this.sg1.getRowCount();i++)
						{
							var dt=this.sg1.getCell(4,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(4,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
							dt=this.sg1.getCell(5,i).split(" ");
							dt=dt[0].split("-");
							this.sg1.setCell(5,i,dt[2]+"/"+dt[1]+"/"+dt[0]);
						}
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
	}
};
window.app_hrmis_sdm_master_fHRKel.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Daftar Karyawan",this.ed_kode,this.ed_nama, 
										  "select nik, nama  from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi +"' ",
										  "select count(nik) from karyawan where kode_lokkonsol='"+this.lokkonsol+"' and kode_lokasi = '"+this.app._lokasi +"' ",
										  new Array("nik","nama"),"and",new Array("NIK","Nama"),false);
			this.standarLib.clearByTag(this, new Array("1"),undefined);	
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_hrmis_sdm_master_fHRKel.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_hrmis_sdm_master_fHRKel.prototype.onChange = function(sender)
{
   if (sender == this.ed_nama2){
        this.doLoadData();
   }
   if (sender == this.ed_status)
   {
		try
        {   			
			this.ed_status4.setReadOnly(false);
			this.ed_status4.addItem(0,"Tanggungan");
			this.ed_status4.addItem(1,"Bukan Tanggungan");
			this.ed_status5.setReadOnly(false);
			this.ed_status5.addItem(0,"Kandung");
			this.ed_status5.addItem(1,"Angkat");
			this.ed_status5.addItem(2,"Tiri");
			this.ed_nik.setReadOnly(false);
			switch (this.ed_status.getText())
			{
				case "Ayah" :
					this.ed_sex.setText("Laki-Laki");
					this.ed_status4.setText("-");
					this.ed_status5.setText("-");
					this.ed_nik.setText("-");
					//this.dp_tglnkh.setReadOnly(true);
					this.ed_status4.setReadOnly(true);
					//for (var i=0;i<2;i++) {this.ed_status4.delItem(i); this.ed_status4.addItem(0,"-");}
					this.ed_status5.setReadOnly(true);
					for (var i=0;i<3;i++) {this.ed_status5.delItem(i); this.ed_status5.addItem(0,"-");}
					this.ed_nik.setReadOnly(true);
				break;
				case "Ibu" :
					this.ed_sex.setText("Perempuan");
					this.ed_status4.setText("-");
					this.ed_status5.setText("-");
					this.ed_nik.setText("-");
					this.ed_status4.setReadOnly(true);
					//for (var i=0;i<2;i++) {this.ed_status4.delItem(i); this.ed_status4.addItem(0,"-");}
					this.ed_status5.setReadOnly(true);
					for (var i=0;i<3;i++) {this.ed_status5.delItem(i); this.ed_status5.addItem(0,"-");}
					this.ed_nik.setReadOnly(true);
				break;
				case "Suami" :
					this.ed_sex.setText("laki-Laki");
					this.ed_status4.setText("-");
					this.ed_status5.setText("-");
					this.ed_status4.setReadOnly(true);
					//for (var i=0;i<2;i++) {this.ed_status4.delItem(i); this.ed_status4.addItem(0,"-");}
					this.ed_status5.setReadOnly(true);
					for (var i=0;i<3;i++) {this.ed_status5.delItem(i); this.ed_status5.addItem(0,"-");}
					this.ed_nik.setText("-");
				break;
				case "Istri" :
					this.ed_sex.setText("Perempuan");
					this.ed_status4.setText("-");
					this.ed_status5.setText("-");
					this.ed_status4.setReadOnly(true);
					//for (var i=0;i<2;i++) {this.ed_status4.delItem(i); this.ed_status4.addItem(0,"-");}
					this.ed_status5.setReadOnly(true);
					for (var i=0;i<3;i++) {this.ed_status5.delItem(i); this.ed_status5.addItem(0,"-");}
					this.ed_nik.setText("-");
				break;
				case "Anak" :
					this.ed_nik.setText("-");
					this.ed_nik.setReadOnly(true);
					var line,data = this.dbLib.runSQL("select count(nama) jml from hr_keluarga where kode_lokkonsol = '"+this.lokkonsol+"' and nik = '"+this.ed_kode.getText()+"' and status_family='anak' and status_tanggungan='tanggungan' ");
					if (data instanceof portalui_arrayMap)
					{
						line = data.get(0);
						if (line != undefined)
						{
							if (line.get("jml") >= 3)
								for (var i=0;i<2;i++) {this.ed_status4.delItem(i); this.ed_status4.addItem(0,"Bukan Tanggungan");}
						}
					}
				break;
				case "Ayah Mertua" :
					this.ed_sex.setText("Laki-Laki");
					this.ed_status4.setText("-");
					this.ed_status5.setText("-");
					this.ed_nik.setText("-");
					this.ed_status4.setReadOnly(true);
					for (var i=0;i<2;i++) {this.ed_status4.delItem(i);}
					this.ed_status5.setReadOnly(true);
					for (var i=0;i<3;i++) {this.ed_status5.delItem(i);}
					this.ed_nik.setReadOnly(true);
				break;
				case "Ibu Mertua" :
					this.ed_sex.setText("Perempuan");
					this.ed_status4.setText("-");
					this.ed_status5.setText("-");
					this.ed_nik.setText("-");
					this.ed_status4.setReadOnly(true);
					for (var i=0;i<2;i++) {this.ed_status4.delItem(i);}
					this.ed_status5.setReadOnly(true);
					for (var i=0;i<3;i++) {this.ed_status5.delItem(i);}
					this.ed_nik.setReadOnly(true);
				break;
			}          
		}catch(e)
		{
			alert("onChange "+e);
		}       
   }
};
