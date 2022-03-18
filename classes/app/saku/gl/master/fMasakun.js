window.app_saku_gl_master_fMasakun = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_master_fMasakun.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_master_fMasakun";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Master Akun", 0);	
		
		uses("portalui_saiCBBL;portalui_label;portalui_checkBox;util_standar");
		this.cb_lokasi = new portalui_saiCBBL(this,{bound:[20,10,185,20],caption:"Kode Lokasi", tag:9,multiSelection:false,
			sql:["select kode_lokasi, nama from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",["kode_lokasi","nama"],false, ["Kode Lokasi","Nama"],"and","Daftar Lokasi",true]
		});				
		this.ed_kode = new portalui_saiCBBL(this,{bound:[20,11,185,20], caption:"Kode", multiSelection:false,
			sql:["select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false, ["Kode Akun","Nama"],"and","Daftar Akun",false]
		});		
		this.bShow = new portalui_imageButton(this,{bound:[202,11,22,22], hint:"Load Data", image:"icon/"+system.getThemes()+"/reload.png", click:[this,"showClick"]});	
		this.ed_nama = new portalui_saiLabelEdit(this,{bound:[20,12,500,20], caption:"Nama", tag:1, maxLength:150});								
		this.ed_modul = new portalui_saiCB(this,{bound:[20,13,185,20],caption:"Modul", items:["Aktiva","Pasiva","LabaRugi"]});				
		this.ed_jenis = new portalui_saiCB(this,{bound:[20,14,185,20],caption:"Jenis Akun", items:["Neraca","Pendapatan","Beban"]});				
		this.cb_curr = new portalui_saiCBBL(this,{bound:[20,15,185,20],caption:"Currency", multiSelection:false, 
			sql:["select kode_curr, nama from curr ",["kode_curr","nama"],false, ["Kode Curr","Nama"], "where","Daftar Currency",true]
		});		      		
		this.lblSts = new portalui_label(this,{bound:[20,16,101,20],caption:"Status Aktif", underline:true});		
		this.cb1 = new portalui_checkBox(this,{bound:[120,16,100,20], caption:"Akun Aktif", checked:true});				
		
		setTipeButton(tbSimpan);
		this.rearrangeChild(20,23);
		this.setTabChildIndex();
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();
						
			this.ed_kode.onBtnClick.set(this, "FindBtnClick");
			this.ed_modul.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			
			this.cb_lokasi.setText(this.app._lokasi);
			this.cb_lokasi.setRightLabelCaption(this.app._namalokasi);
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_gl_master_fMasakun.extend(window.portalui_childForm);
window.app_saku_gl_master_fMasakun.implement({
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
		var block = 1;
		if (this.cb1.isSelected()) block =  0;
					
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0"),this.ed_kode);				
				}
				break;
			case "simpan" :
				if (modalResult == mrOk)
				{
					try
					{					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into masakun (kode_akun, kode_lokasi, nama, modul, jenis, kode_curr, block) values "+
								"('"+this.ed_kode.getText()+"','"+this.app._lokKonsol+"','"+this.ed_nama.getText()+"','"+
								this.ed_modul.getText().substr(0,1)+"','"+this.ed_jenis.getText()+"','"+this.cb_curr.getText()+"','"+block+"')");
								
						var strSql = " select kode_lokasi from lokasi where kode_lokkonsol = '"+this.app._lokKonsol+"' ";
						var data = this.dbLib.runSQL(strSql);
						if (data instanceof portalui_arrayMap){
							if (data.get(0) != undefined){									
								for (var i in data.objList){
									line = data.get(i);
									sql.add("insert into masakun (kode_akun, kode_lokasi, nama, modul, jenis, kode_curr, block) values "+
										    "('"+this.ed_kode.getText()+"','"+line.get("kode_lokasi")+"','"+this.ed_nama.getText()+"','"+
											this.ed_modul.getText().substr(0,1)+"','"+this.ed_jenis.getText()+"','"+this.cb_curr.getText()+"','"+block+"')");
								}
							} 
						}
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
						sql.add("update masakun set  "+
								"nama = '"+this.ed_nama.getText()+"',modul = '"+this.ed_modul.getText().substr(0,1)+"',jenis = '"+
								this.ed_jenis.getText()+"',kode_curr = '"+this.cb_curr.getText()+"',block = '"+block+
								"',kode_lokasi='"+this.cb_lokasi.getText()+
								"' where kode_akun = '"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
						this.dbLib.execArraySQL(sql);	
				}
				break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {
					uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("delete from masakun where kode_akun='"+this.ed_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
						this.dbLib.execArraySQL(sql);	
			   }
				break;
		}
	},
	doEditChange: function(sender){
		if (sender == this.ed_modul) 
		{
			if (this.ed_modul.getText() != "")
			{
				if (this.ed_modul.getText() == "LabaRugi") 
				{ 
					
					this.ed_jenis.clearItem();
					this.ed_jenis.setText("");
					this.ed_jenis.addItem(0,"Pendapatan");
					this.ed_jenis.addItem(1,"Beban");
				}else
				{
					
					this.ed_jenis.clearItem();
					this.ed_jenis.setText("");
					this.ed_jenis.addItem(0,"Neraca"); 
				}
			}
		}
	},
	showClick: function(sender){
		if (this.ed_kode.getText() != "")
		{
			try
			{
				this.standarLib.clearByTag(this, new Array("1"),undefined);				
				setTipeButton(tbSimpan);
				var line,data = this.dbLib.runSQL("select a.*,b.nama as nama_curr "+
												  "from masakun a inner join curr b on a.kode_curr=b.kode_curr "+
												  "where a.kode_akun = '"+this.ed_kode.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"'");
				if (data instanceof portalui_arrayMap)
				{
					line = data.get(0);
					if (line != undefined)
					{
						this.ed_nama.setText(line.get("nama"));
						this.ed_modul.setSelectedId(line.get("modul"));
						this.ed_jenis.setText(line.get("jenis"));
						this.cb_curr.setText(line.get("kode_curr"));
						this.cb_curr.setRightLabelCaption(line.get("nama_curr"));
						this.cb1.setSelected(line.get("block") == '0'? true:false);		
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
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.ed_kode) 
			{
				this.standarLib.showListData(this, "Daftar Master Akun",this.ed_kode,undefined, 
											  "select kode_akun, nama  from masakun where kode_lokasi='"+this.cb_lokasi.getText()+"'",
											  "select count(kode_akun) from masakun where kode_lokasi='"+this.cb_lokasi.getText()+"'",
											  new Array("kode_akun","nama"),"and",new Array("Kode Akun","Deskripsi"),false);
				this.standarLib.clearByTag(this, new Array("1"),undefined);	
			}
			if (sender == this.cb_curr) 
			{
				this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
											  "select kode_curr, nama  from curr",
											  "select count(kode_curr) from curr",
											  new Array("kode_curr","nama"),"where",new Array("Kode Currency","Deskripsi"),false);
			}
		}catch(e)
		{
			systemAPI.alert(e);
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
		              this.app._mainForm.pesan(2,"Proses Lengkap (kode akun : "+ this.ed_kode.getText()+" tersimpan.)");
		              this.app._mainForm.bClear.click();              
		            }else
				   	     system.info(this, result,"");
					break;
			}
		}
	}
});
