/**
 * @author dweexfuad
 */
window.app_assetsap_master_fKaryawan = function(owner)
{
	if (owner)
	{
		window.app_assetsap_master_fKaryawan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_assetsap_master_fKaryawan";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Karyawan", 0);	

		uses("saiCBBL;util_standar");
		this.cb_lokasi = new saiCBBL(this,{bound:[20, 10,185,20], caption:"Kode Lokasi", tag:9, readOnly:true
			//sql:["select kode_lokasi, nama from lokasi ", ["kode_lokasi","nama"], false, ["Kode Lokasi","Nama"],"where","Daftar Lokasi",true]
		});		
		
		this.ed_kode = new saiCBBL(this,{bound:[20,11,185,20],caption:"NIK", multiSelection:false, 
			change:[this,"doEditChange"],
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],false, ["nik","nama"],"and","Daftar Karyawan",false]
		});													
		this.ed_nama = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Nama",maxLength:100, tag:1});				
		this.cb_pp = new saiCBBL(this,{bound:[20,13,185,20],caption:"Lokasi/Area",multiSelection:false,
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ",["kode_lokfa","nama"], false, ["Kode Area","nama"],"and","Daftar Lokasi /Area/UBIS",true]
		});				
		this.ed_alamat = new saiLabelEdit(this,{bound:[20,14,600,20], caption:"Alamat", maxLength:150});						
		
		this.ed_jabatan = new saiLabelEdit(this, {
			bound: [20, 120, 400, 20],
			caption: "Jabatan",			
			tag:1					
		});		
		
		this.ed_tel = new saiLabelEdit(this,{bound:[20,15,250,20], caption:"No Telepon"});		
		
		this.ed_mail = new saiLabelEdit(this,{bound:[20,16,250,20], caption:"Email"});				
		
		setTipeButton(tbSimpan);			
		this.rearrangeChild(10,23);
		this.setTabChildIndex();
		try
		{		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();
			
			this.cb_lokasi.setText(this.app._lokasi);
			this.cb_lokasi.setRightLabelCaption(this.app._namalokasi);
			
		}catch(e)
		{
			systemAPI.alert(e);
		}
	}
};
window.app_assetsap_master_fKaryawan.extend(window.childForm);
window.app_assetsap_master_fKaryawan.implement({
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
					this.standarLib.clearByTag(this, [0,1],this.ed_kode);				
				break;
			case "simpan" :
				if (modalResult == mrOk)
				{
					try
					{					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into amu_karyawan (nik, kode_lokasi, nama, alamat, kode_jab, no_telp, email, kode_lokfa) values "+
								"('"+this.ed_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.ed_nama.getText()+"','"+this.ed_alamat.getText()+"','"+
									 this.ed_jabatan.getText()+"','"+this.ed_tel.getText()+"','"+this.ed_mail.getText()+"','"+this.cb_pp.getText()+"')");
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
						sql.add("update amu_karyawan set  "+
								"  kode_lokfa='"+this.cb_pp.getText()+"',nama='"+this.ed_nama.getText()+"',alamat='"+this.ed_alamat.getText()+
								"',kode_jab='"+this.ed_jabatan.getText()+"',no_telp='"+this.ed_tel.getText()+"',email='"+this.ed_mail.getText()+							
								"' where nik='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
						this.dbLib.execArraySQL(sql);	
				}
				break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {
					uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("delete from amu_karyawan where nik='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
						this.dbLib.execArraySQL(sql);	
			   }
				break;
		}
	},
	doEditChange: function(sender){		
		if (this.ed_kode.getText() != "")
		{
			try
			{
				this.standarLib.clearByTag(this, new Array("1"),undefined);	
				var data = this.dbLib.getDataProvider(" select a.nama,a.alamat,a.kode_jab,a.no_telp,a.email,a.kode_lokfa, b.nama as nmpp "+
											 " from amu_karyawan a "+
											 " left outer join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_lokasi = a.kode_lokasi "+
											 " where a.nik='"+this.ed_kode.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"'", true);
				if (typeof data != "string")
				{
					if (data.rs.rows[0] != undefined)
					{									
						line = data.rs.rows[0];
						this.ed_nama.setText(line.nama);
						this.cb_pp.setText(line.kode_lokfa, line.nmpp);
						this.ed_alamat.setText(line.alamat);
						this.ed_jabatan.setText(line.kode_jab);
						this.ed_tel.setText(line.no_telp);
						this.ed_mail.setText(line.email);
						setTipeButton(tbUbahHapus);
					} else
					{
						setTipeButton(tbSimpan);
					}
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
	doRequestReady: function(sender, methodName, result){
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
	}
});
