window.app_saku2_master_gl_fKlpNrc = function(owner)
{
	if (owner)
	{
		window.app_saku2_master_gl_fKlpNrc.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_master_gl_fKlpNrc";
		this.setTop(60);
		this.maximize();
		this.itemsValue = new arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelompok Neraca/Final Statement/Versi Laporan", 0);	
		
//------------------------------------------------------------------------
		uses("saiCBBL;datePicker;checkBox");
		this.e0 = new saiCBBL(this,{bound:[20,30,200,20],caption:"Kode FS", change:[this,"doEditChange"],
				btnClick:[this,"FindBtnClick"]
			});
		this.e1 = new saiLabelEdit(this,{bound:[20,55,400,20],caption:"Deskripsi"});				
		this.l1 = new label(this,{bound:[20,11,100,20],caption:"Periode Aktif", underline:true});						
		this.d1 = new datePicker(this,{bound:[120,11,100,18]});				
		this.l2 = new label(this,{bound:[225,11,20,20], caption:"to"});				
		this.d2 = new datePicker(this,{bound:[240,11,100,18]});				
		this.l2 = new label(this,{bound:[350,11,120,20], caption:"(Optional)"});		
		this.l2.fnt.setItalics(true);					
		this.cb1 = new checkBox(this,{bound:[120,12,120,20],caption:"Status Aktif"});				
		setTipeButton(tbSimpan);
			
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku2_master_gl_fKlpNrc.extend(window.childForm);
//------------------------------------------------------------------ event
window.app_saku2_master_gl_fKlpNrc.implement({
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
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.e0.setText("");
					this.e0.setRightLabelCaption("");
					this.e1.setText("");				
					
				}
				break;
			case "simpan" :
				if (modalResult == mrOk)
				{
					try
					{
						var status  = '0';
						if (this.cb1.isSelected())
							status = '1';
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into fs (kode_fs, kode_lokasi,nama,tgl_awal, tgl_akhir, flag_status, tgl_input,nik_user ) values ('"+this.e0.getText()+"','"+this.app._lokasi+"','"+this.e1.getText()+"','"+this.d1.getDateString()+"','"+this.d2.getDateString()+"','"+status+"',now(),'"+this.app._userLog+"') ");
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
					try
					{
						var status  = '0';
						if (this.cb1.isSelected())
							status = '1';
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update fs set nama = '"+this.e1.getText()+"',flag_status = '"+status+"',tgl_awal='"+this.d1.getDateString()+"',tgl_akhir='"+this.d2.getDateString()+"',tgl_input=now(),nik_user='"+this.app._userLog+"' where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);	
					}
					catch(e)
					{
						system.alert(this, e,"");
					}
				}
				break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {
				    try
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						var rs = this.dbLib.runSQL("select kode_fs from neraca where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						if (rs instanceof arrayMap)
							if (rs.getTag1() != 0)
								throw("kode fs ini sudah terpakai. tidak dapat dihapus");
						sql.add("delete from  fs where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);	
					}
					catch(e)
					{
						system.alert(this, e,"");
					}
			   }
				break;
		}
		this.e0.setFocus();
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doEditChange: function(sender){
		if (this.e0.getText() != "")
		{
			try
			{			
				var data = this.dbLib.runSQL("select * from fs where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ");
							
				if (data instanceof arrayMap)
				{				
					if (data.get(0) != undefined){
						this.e1.setText(data.get(0).get("nama"));
						this.e0.setRightLabelCaption(data.get(0).get("nama"));
						this.cb1.setSelected(data.get(0).get("flag_status") == '1'?true:false);																					
						this.d1.setDateString(data.get(0).get("tgl_awal"));				
						this.d2.setDateString(data.get(0).get("tgl_akhir"));
						setTipeButton(tbUbahHapus);
					}else setTipeButton(tbSimpan);
				}else
				{
					setTipeButton(tbSimpan);
				}
			}catch(e)
			{
				system.alert(this, e,"");
			}
		}
	},
	FindBtnClick: function(sender, event){
		try
		{
			this.standarLib.showListData(this, "Data Kelompok neraca",this.e0,this.e1, 
											  "select kode_fs, nama from fs where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from fs where kode_lokasi = '"+this.app._lokasi+"' ",
											  new Array("kode_fs","nama"),"and", new Array("Kode FS","Nama"));
		}catch(e)
		{
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1){
						system.info(this,"Transaksi Sukses ("+ this.e0.getText()+")","");
						this.doModalResult("clear",mrOk);						
					}else system.alert(this, result,""); 
					break;
			}
		}
	}
});
