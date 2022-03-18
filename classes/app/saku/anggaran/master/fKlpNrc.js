window.app_saku_anggaran_master_fKlpNrc = function(owner)
{
	if (owner)
	{
		window.app_saku_anggaran_master_fKlpNrc.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_anggaran_master_fKlpNrc";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Versi Laporan", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar");
			this.elokasi = new portalui_saiCBBL(this,{bound:[20,20,150,20],caption:"Lokasi", multiSelection:false,change:[this,"doEditChange"]});				
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Klp", multiSelection:false,change:[this,"doEditChange"]});					
			this.e1 = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama Klp"});
			this.l1 = new portalui_label(this,{bound:[20,23,100,20],caption:"Periode Aktif",underline:true});
			this.d1 = new portalui_datePicker(this,{bound:[120,23,100,18]});
			this.l2 = new portalui_label(this,{bound:[225,23,20,20], caption:"to"});
			this.d2 = new portalui_datePicker(this,{bound:[240,23,100,18]});			
			this.l2 = new portalui_label(this,{bound:[350,23,120,20], caption:"(Optional)"});
			this.l2.fnt.setItalics(true);								
			this.cb1 = new portalui_checkBox(this,{bound:[120,25,120,20],caption:"Status Aktif"});			
			
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();					
			this.elokasi.setText(this.app._lokasi);
			var lokasi = (this.app._userStatus == "A" ? "%" : this.app._lokasi);				
			this.elokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi like '"+lokasi+"' ",["kode_lokasi","nama"],undefined,["Kode","Nama"],"and","Data Lokasi");			
			this.e0.setSQL("select kode_fs, nama from angg_fs where kode_lokasi = '"+this.app._lokasi+"' ",["kode_fs","nama"],undefined,["Kode FS","Nama"],"and","Data Versi Laporan",false);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_anggaran_master_fKlpNrc.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_saku_anggaran_master_fKlpNrc.implement({
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
		if (modalResult != mrOk) return;
		try{
			var status  = this.cb1.isSelected() ? '1': '0';
			switch (event)
			{
				case "clear" :
					this.e0.setText("");
					this.e0.setRightLabelCaption("");
					this.e1.setText("");												
					break;
				case "simpan" :
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into angg_fs (kode_fs, kode_lokasi,nama,tgl_awal, tgl_akhir, flag_status, tgl_input,nik_user ) values ('"+this.e0.getText()+"','"+this.app._lokasi+"','"+this.e1.getText()+"','"+this.d1.getDate()+"','"+this.d2.getDate()+"','"+status+"','"+(new Date).getDateStr()+"','"+this.app._userLog+"') ");
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update angg_fs set nama = '"+this.e1.getText()+"',flag_status = '"+status+"',tgl_awal='"+this.d1.getDate()+"',tgl_akhir='"+this.d2.getDate()+"',tgl_input='"+(new Date).getDateStr()+"',nik_user='"+this.app._userLog+"' where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						var rs = this.dbLib.runSQL("select kode_fs from neraca where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						if (rs instanceof portalui_arrayMap)
							if (rs.getTag1() != 0)
								throw("kode fs ini sudah terpakai. tidak dapat dihapus");
						sql.add("delete from  angg_fs where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
						this.dbLib.execArraySQL(sql);											   
					break;
			}
			this.e0.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doEditChange: function(sender){
		if (sender === this.elokasi){
			this.e0.setSQL("select kode_fs, nama from angg_fs where kode_lokasi = '"+this.app._lokasi+"' ",["kode_fs","nama"],undefined,["Kode FS","Nama"],"and","Data Versi Laporan",false);
		}
		if(sender == this.e0){
			if (this.e0.getText() != "")
			{
				try
				{			
					var data = this.dbLib.runSQL("select * from angg_fs where kode_fs = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ");
								
					if (data instanceof portalui_arrayMap)
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
						setTipeButton(tbSimpan);					
				}catch(e){
					system.alert(this, e,"");
				}
			}
		}
	},	
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});