window.app_mina_fAgg = function(owner)
{
	if (owner)
	{
		window.app_mina_fAgg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_mina_fAgg";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Anggota", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.i_gen = new portalui_imageButton(this,{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_kit = new saiLabelEdit(this,{bound:[20,11,300,20],caption:"Starter Kit", maxLength:50, tag:1});	
		this.e_form = new saiLabelEdit(this,{bound:[20,12,300,20],caption:"Kode Formulir", maxLength:50, tag:1,change:[this,"doChange"]});			
		this.cb_upline = new saiCBBL(this,{bound:[20,18,200,20],caption:"Upline", readOnly:true, tag:1});
		this.cb_ajak = new saiCBBL(this,{bound:[20,17,200,20],caption:"Pengajak", multiSelection:false, maxLength:10, tag:1});
		this.c_jenis = new saiCB(this,{bound:[20,22,202,20],caption:"Jenis",items:["MINAPLUS","KONVPLUS"], readOnly:true,tag:2});
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_ktp = new saiLabelEdit(this,{bound:[20,13,400,20],caption:"No Identitas", maxLength:50, tag:1});	
		this.e_alamat = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Alamat", maxLength:150, tag:1});	
		this.e_kota = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Kota", maxLength:50, tag:1});	
		this.e_kodepos = new saiLabelEdit(this,{bound:[240,13,180,20],caption:"Kode Pos", maxLength:5, tipeText:ttAngka, tag:1});	
		this.e_telp = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"No Telpon", maxLength:50, tag:1});	
		this.e_hp = new saiLabelEdit(this,{bound:[20,16,200,20],caption:"No HP", maxLength:20, tag:1});	
		this.e_tempat = new saiLabelEdit(this,{bound:[20,13,300,20],caption:"Tempat Lahir", maxLength:50, tag:1});	
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal Lahir", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 
		this.e_ibu = new saiLabelEdit(this,{bound:[20,20,300,20],caption:"Nama Ibu", maxLength:50, tag:1});	
		this.e_bank = new saiLabelEdit(this,{bound:[20,19,300,20],caption:"Bank", maxLength:50, tag:1});	
		this.e_cabang = new saiLabelEdit(this,{bound:[20,20,300,20],caption:"Cabang", maxLength:50, tag:1});	
		this.e_norek = new saiLabelEdit(this,{bound:[20,21,300,20],caption:"No Rekening", maxLength:50, tag:1});	
		this.e_namarek = new saiLabelEdit(this,{bound:[20,22,300,20],caption:"Nama Rekening", maxLength:50, tag:1});	
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_ajak.setSQL("select kode_agg, nama from mina_agg where status_aktif='1'",["kode_agg","nama"],false,["Kode","Nama"],"and","Data Anggota",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_mina_fAgg.extend(window.childForm);
window.app_mina_fAgg.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into mina_agg(kode_agg,kode_ajak,kode_upline,nama,alamat,kota,kode_pos,no_telp,no_hp,tempat,tgl_lahir ,nama_ibu ,bank ,cabang,no_rek ,nama_rek,dana_motor,dana_religi,dana_pensiun,dana_ajak,dana_tht,dana_agg,ambil_motor,ambil_religi,ambil_pensiun,ambil_ajak,ambil_tht,ambil_agg,status_aktif,no_id,no_kit,jenis) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.cb_ajak.getText()+"','"+this.cb_upline.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_kodepos.getText()+"','"+this.e_telp.getText()+"','"+this.e_hp.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ibu.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"',0,0,0,0,0,0, 0,0,0,0,0,0,'0','"+this.e_ktp.getText()+"','"+this.e_kit.getText()+"','"+this.c_jenis.getText()+"')");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update mina_agg set jenis='"+this.c_jenis.getText()+"',kode_ajak='"+this.cb_ajak.getText()+"',kode_upline='"+this.cb_upline.getText()+"',nama='"+this.e_nama.getText()+"',alamat='"+this.e_alamat.getText()+"',kota='"+this.e_kota.getText()+"',kode_pos='"+this.e_kodepos.getText()+"',no_telp='"+this.e_telp.getText()+"',no_hp='"+this.e_hp.getText()+"',tempat='"+this.e_tempat.getText()+"',tgl_lahir='"+this.dp_d1.getDateString()+"',nama_ibu='"+this.e_ibu.getText()+"',bank='"+this.e_bank.getText()+"',cabang='"+this.e_cabang.getText()+"',no_rek='"+this.e_norek.getText()+"',nama_rek='"+this.e_namarek.getText()+"',no_id='"+this.e_ktp.getText()+"',no_kit='"+this.e_kit.getText()+"' "+
						    "where kode_agg='"+this.cb_kode.getText()+"'");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from mina_agg where kode_agg = '"+this.cb_kode.getText()+"'");			
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
				if (this.aktif != "0") {
					if (this.upline != this.cb_upline.getText() || this.ajak != this.cb_ajak.getText()) {
						system.alert(this,"Upline dan Pengajak tidak boleh berubah","Anggota sudah progres transaksi titipan.");
						return false;
					}
				}						
				var temu = false;
				var data = this.dbLib.getDataProvider("select kode_agg from mina_agg where no_kit ='"+this.e_kit.getText()+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						temu = true;
					}					
				}				
				if (temu){
					system.alert(this,"Transaksi tidak valid.","Starter KIT sudah terpakai.[Anggota : "+line.kode_agg+"]");
					return false;
				} 
				else this.simpan();
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
	doClick:function(sender){
		var data = this.dbLib.getDataProvider("select substring(convert(varchar,getdate(),103),9,2)+substring(convert(varchar,getdate(),103),4,2) as periode",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];										
			this.periode=line.periode;
		} 		
		this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"mina_agg","kode_agg",this.periode+".","00000"));		
		this.e_kit.setFocus();
		this.aktif = "0";
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode) {
				if (this.cb_kode.getText() != ""){
					var data = this.dbLib.getDataProvider("select a.*,isnull(b.nama,'-') as nama_ajak,isnull(c.nama,'-') as nama_upline,isnull(c.no_kit,'-') as no_form,a.status_aktif "+
							   "from mina_agg a left join mina_agg b on a.kode_ajak=b.kode_agg "+
							   "				left join mina_agg c on a.kode_upline=c.kode_agg "+
							   "where a.kode_agg ='"+this.cb_kode.getText()+"' ",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.cb_ajak.setText(line.kode_ajak,line.nama_ajak);
							this.cb_upline.setText(line.kode_upline,line.nama_upline);
							this.e_kit.setText(line.no_kit);
							this.e_form.setText(line.no_form);
							this.c_jenis.setText(line.jenis);
							this.e_nama.setText(line.nama);
							this.e_ktp.setText(line.no_id);
							this.e_alamat.setText(line.alamat);						
							this.e_kota.setText(line.kota);
							this.e_kodepos.setText(line.kode_pos);
							this.e_telp.setText(line.no_telp);
							this.e_hp.setText(line.no_hp);
							this.e_tempat.setText(line.tempat);
							this.dp_d1.setText(line.tgl_lahir);
							this.e_ibu.setText(line.nama_ibu);						
							this.e_bank.setText(line.bank);
							this.e_cabang.setText(line.cabang);
							this.e_norek.setText(line.no_rek);
							this.e_namarek.setText(line.nama_rek);
							
							this.aktif = line.status_aktif;
							this.upline = line.kode_upline;
							this.ajak = line.kode_ajak;
							setTipeButton(tbUbahHapus);
						}
						else{
							this.standarLib.clearByTag(this, new Array("1"),undefined);
							setTipeButton(tbSimpan);
						}
					}
				}
			}
			else {
				if (this.e_form.getText() != "") {
					var data = this.dbLib.getDataProvider("select kode_agg,nama from mina_agg where no_kit ='"+this.e_form.getText()+"' ",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.cb_upline.setText(line.kode_agg,line.nama);						
						}
						else{
							system.alert(this,"Form tidak valid.","Kode Formulir tidak terdaftar.");
							return false;						
						}
					} 
					else {
						system.alert(this,"Form tidak valid.","Kode Formulir tidak terdaftar.");
						return false;						
					}				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Anggota",sender,undefined, 
											  "select kode_agg, nama  from mina_agg ",
											  "select count(kode_agg) from mina_agg ",
											  ["kode_agg","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
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
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});