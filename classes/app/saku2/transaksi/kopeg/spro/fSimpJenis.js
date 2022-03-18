window.app_saku2_transaksi_kopeg_spro_fSimpJenis = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_spro_fSimpJenis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_spro_fSimpJenis";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Jenis Simpanan : Input/Koreksi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doLoad"]});		
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:150});		
		this.cb_jenis = new portalui_saiCB(this,{bound:[20,12,200,20],caption:"Jenis",items:["SP - Pokok","SW - Wajib","SS - Sukarela","TB - Tabungan"],change:[this,"doChange"],tag:2});
		this.cb_ar = new portalui_saiCBBL(this,{bound:[20,13,200,20],caption:"Akun Piutang",multiSelection:false, maxLength:10, tag:2});
		this.cb_simp = new portalui_saiCBBL(this,{bound:[20,14,200,20],caption:"Akun Simpanan",multiSelection:false, maxLength:10, tag:2});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[20,15,180,20],caption:"Nilai Simp.",maxLength:15,tipeText:ttNilai,text:"0"});		
		this.e_bunga = new portalui_saiLabelEdit(this,{bound:[20,16,180,20],caption:"%Bunga (Thn)",maxLength:15,tipeText:ttNilai,text:"0"});		
		this.cb1 = new portalui_checkBox(this,{bound:[20,17,200,20],caption:"Ubah Data Untuk Seluruh Kartu"});		
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_ar.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='003'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_simp.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='036'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_spro_fSimpJenis.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_spro_fSimpJenis.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kop_simp_jenis(kode_simp,nama,akun_ar,akun_simp,jenis,nilai,p_bunga,kode_lokasi,nik_user,tgl_input) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_ar.getText()+"','"+this.cb_simp.getText()+"','"+this.cb_jenis.getText().substr(0,2)+"',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_bunga.getText())+",'"+this.app._lokasi+"','"+this.app._userLog+"',getdate())");										
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update kop_simp_jenis set nama='"+this.e_nama.getText()+"',akun_ar='"+this.cb_ar.getText()+"',akun_simp='"+this.cb_simp.getText()+"',jenis='"+this.cb_jenis.getText().substr(0,2)+"',nilai="+parseNilai(this.e_nilai.getText())+",p_bunga="+parseNilai(this.e_bunga.getText())+",nik_user='"+this.app._userLog+"',tgl_input=getdate() "+
						    "where kode_simp = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
										
					if (this.cb1.isSelected()) {
						sql.add("update kop_simp_m set nilai="+parseNilai(this.e_nilai.getText())+",p_bunga="+parseNilai(this.e_bunga.getText())+" "+
							    "where kode_simp = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					}
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kop_simp_jenis where kode_simp = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
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
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);	
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
	doLoad: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select a.nama,a.jenis,a.akun_ar,a.akun_simp,a.nilai,a.p_bunga "+
				             "from kop_simp_jenis a where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_simp ='"+this.cb_kode.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						if (line.jenis == "SP") var jenis = "SP - Pokok";
						if (line.jenis == "SW") var jenis = "SW - Wajib";
						if (line.jenis == "SS") var jenis = "SS - Sukarela";
						if (line.jenis == "TB") var jenis = "TB - Tabungan";
						this.cb_jenis.setText(jenis);
						this.cb_ar.setText(line.akun_ar);
						this.cb_simp.setText(line.akun_simp);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_bunga.setText(floatToNilai(line.p_bunga));
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_kode) 
			{   
			    this.standarLib.showListData(this, "Daftar Jenis Simpanan",sender,undefined, 
											  "select kode_simp, nama  from kop_simp_jenis where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_simp) from kop_simp_jenis where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_simp","nama"],"and",["Kode Simp","Nama"],false);				
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e)
			{
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});