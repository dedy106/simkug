window.app_kopeg_simpanan_master_fJenis = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_master_fJenis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_simpanan_master_fJenis";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Jenis Simpanan : Input/Koreksi", 0);	
		
		uses("portalui_saiCBBL;portalui_saiCBB;portalui_saiEdit;portalui_datePicker;portalui_saiTable;portalui_checkBox");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",btnClick:[this,"doBtnClick"],rightLabelVisible:false});
		this.bLoad = new portalui_imageButton(this,{bound:[225,10,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:150});		
		this.cb_jenis = new portalui_saiCB(this,{bound:[20,12,200,20],caption:"Jenis",items:["SP","SW","SS","TB"],change:[this,"doChange"],tag:2});
		this.cb_ar = new portalui_saiCBBL(this,{bound:[20,13,200,20],caption:"Akun Piutang",btnClick:[this,"doBtnClick"]});
		this.cb_simp = new portalui_saiCBBL(this,{bound:[20,14,200,20],caption:"Akun Simpanan",btnClick:[this,"doBtnClick"]});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[20,15,200,20],caption:"Nilai Simp.",maxLength:15,tipeText:ttNilai,text:"0"});		
		this.e_bunga = new portalui_saiLabelEdit(this,{bound:[20,16,200,20],caption:"%Bunga Simp.",maxLength:15,tipeText:ttNilai,text:"0"});		
		this.cb1 = new portalui_checkBox(this,{bound:[680,16,200,20],caption:"Ubah Untuk Seluruh Kartu"});		
		this.bTampil = new portalui_button(this,{bound:[829,16,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		
		this.p1 = new portalui_panel(this,{bound:[10,30,900,323],caption:"Daftar Jenis Simpanan"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,895,300],tag:"9"});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_simpanan_master_fJenis.extend(window.portalui_childForm);
window.app_kopeg_simpanan_master_fJenis.implement({
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
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_ar.getText()+"','"+this.cb_simp.getText()+"','"+this.cb_jenis.getText()+"',"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_bunga.getText())+",'"+this.app._lokasi+"','"+this.app._userLog+"',now())");										
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
					sql.add("update kop_simp_jenis set nama='"+this.e_nama.getText()+"',akun_ar='"+this.cb_ar.getText()+"',akun_simp='"+this.cb_simp.getText()+"',jenis='"+this.cb_jenis.getText()+"',nilai="+parseNilai(this.e_nilai.getText())+",p_bunga="+parseNilai(this.e_bunga.getText())+",nik_user='"+this.app._userLog+"',tgl_input=now() "+
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
					sql.add("delete from kop_simp_jenis "+
						    "where kode_simp = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
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
		
		switch (event)
		{
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
	doLoadClick: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider(" select a.nama,a.jenis,a.akun_ar,a.akun_simp,b.nama as nama_ar,c.nama as nama_simp,a.nilai,a.p_bunga "+
				           " from kop_simp_jenis a inner join masakun b on a.akun_ar = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					       "                       inner join masakun c on a.akun_simp = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						   " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_simp ='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined)
					{
						this.e_nama.setText(line.nama);
						this.cb_jenis.setText(line.jenis);
						this.cb_ar.setText(line.akun_ar,line.nama_ar);
						this.cb_simp.setText(line.akun_simp,line.nama_simp);
						this.e_nilai.setText(floatToNilai(parseFloat(line.nilai)));
						this.e_bunga.setText(floatToNilai(parseFloat(line.p_bunga)));
						setTipeButton(tbUbahHapus);
					}
					else
					{
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){
		try{			
			this.sg1.setColTitle(new Array("No","Kode Simp","Nama","Jenis","Akun Piut.","Akun Simp","Nilai","% Bunga"));				
			var data = this.dbLib.runSQL(" select a.kode_simp,a.nama,a.jenis,concat(a.akun_ar,' - ',b.nama) as nama_ar,concat(a.akun_simp,' - ',c.nama) as nama_simp,a.nilai,a.p_bunga "+
			           " from kop_simp_jenis a "+
					   "      inner join masakun b on a.akun_ar = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+    
					   "      inner join masakun c on a.akun_simp = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					   " where a.kode_lokasi = '"+this.app._lokasi+"' ");
			this.sg1.clearAll();
			this.sg1.setData(data);
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
			if (sender == this.cb_ar) {
			    this.standarLib.showListData(this, "Daftar Akun Piutang",sender,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='003' ",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='003' ",
											  ["kode_akun","nama"],"and",["Kode Akun","Nama Akun"],false);				
			}
			if (sender == this.cb_simp) {   
			    this.standarLib.showListData(this, "Daftar Akun Simpanan",sender,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='024' ",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='024' ",
											  ["kode_akun","nama"],"and",["Kode Akun","Nama Akun"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
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