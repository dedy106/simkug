window.app_hris_master_gaji_fAkunNik = function(owner)
{
	if (owner)
	{
		window.app_hris_master_gaji_fAkunNik.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_master_gaji_fAkunNik";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Akun Karyawan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_nik = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,multiSelection:false,change:[this,"doChange"]});
		this.cb_gaji = new saiCBBL(this,{bound:[20,11,200,20],caption:"Akun Gaji",maxLength:10,multiSelection:false,tag:1});
		this.cb_pph = new saiCBBL(this,{bound:[20,12,200,20],caption:"Akun PPH",maxLength:10,multiSelection:false,tag:1});
		this.cb_jamsos = new saiCBBL(this,{bound:[20,13,200,20],caption:"Akun Jamsostek",maxLength:10,multiSelection:false,tag:1});
		this.cb_jiwas = new saiCBBL(this,{bound:[20,14,200,20],caption:"Akun Jiwasraya",maxLength:10,multiSelection:false,tag:1});
		this.cb_akdhk = new saiCBBL(this,{bound:[20,15,200,20],caption:"Akun AKDHK",maxLength:10,multiSelection:false,tag:1});
		this.bTampil = new button(this,{bound:[829,15,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});
		this.p1 = new panel(this,{bound:[10,23,900,353],caption:"Daftar Akun Karyawan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,895,300],colCount:12,tag:1,
		            colTitle:["NIK","Nama","Akun Gaji","Nama Akun Gaji","Akun PPH","Nama Akun PPH","Akun Jamsostek","Nama Akun Jamsostek","Akun Jiwasraya","Nama Akun Jiwasraya","Akun AKDHK","Nama Akun ADHK"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[150,80,150,80,150,80,150,80,150,80,200,70]],
					columnReadOnly:[true,[11,10,9,8,7,6,5,4,3,2,0],[1]],
					defaultRow:1,
					autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,330,899,25],buttonStyle:3,grid:this.sg});
			
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_nik.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.cb_gaji.setSQL("select kode_akun, nama from gr_masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun Gaji",true);			
			this.cb_pph.setSQL("select kode_akun, nama from gr_masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun PPH",true);			
			this.cb_jamsos.setSQL("select kode_akun, nama from gr_masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun Jamsostek",true);			
			this.cb_jiwas.setSQL("select kode_akun, nama from gr_masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun Jiwasraya",true);			
			this.cb_akdhk.setSQL("select kode_akun, nama from gr_masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun AKDHK",true);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_master_gaji_fAkunNik.extend(window.childForm);
window.app_hris_master_gaji_fAkunNik.implement({
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
					sql.add("insert into gr_gaji_akun(nik, kode_lokasi, akun_gaji, akun_pph, akun_jamsos, akun_jiwas, akun_akdhk) values "+
							"('"+this.cb_nik.getText()+"','"+this.app._lokasi+"','"+this.cb_gaji.getText()+"','"+this.cb_pph.getText()+"','"+this.cb_jamsos.getText()+"','"+this.cb_jiwas.getText()+"','"+this.cb_akdhk.getText()+"')");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik);
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_gaji_akun where nik = '"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");			
					sql.add("insert into gr_gaji_akun(nik, kode_lokasi, akun_gaji, akun_pph, akun_jamsos, akun_jiwas, akun_akdhk) values "+
							"('"+this.cb_nik.getText()+"','"+this.app._lokasi+"','"+this.cb_gaji.getText()+"','"+this.cb_pph.getText()+"','"+this.cb_jamsos.getText()+"','"+this.cb_jiwas.getText()+"','"+this.cb_akdhk.getText()+"')");
							
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik);
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_gaji_akun where nik = '"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");			
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik);
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik);
					this.sg.clear(1);
				setTipeButton(tbUbahHapus);
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
	doChange: function(sender){
		try{
			if (this.cb_nik.getText() != ""){
				this.standarLib.clearByTag(this, new Array("1"),this.cb_nik);
				var data = this.dbLib.getDataProvider(
				            "select a.akun_gaji,a.akun_pph,a.akun_jamsos,a.akun_jiwas,a.akun_akdhk "+
							"from gr_gaji_akun a "+
							"where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_gaji.setText(line.akun_gaji);
						this.cb_pph.setText(line.akun_pph);
						this.cb_jamsos.setText(line.akun_jamsos);
						this.cb_jiwas.setText(line.akun_jiwas);
						this.cb_akdhk.setText(line.akun_akdhk);
						setTipeButton(tbUbahHapus);
					}
					else{
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
			var data = this.dbLib.getDataProvider("select a.nik,b.nama,a.akun_gaji,c.nama as nama_gaji,a.akun_pph,d.nama as nama_pph,"+
						"a.akun_jamsos,e.nama as nama_jamsos,a.akun_jiwas,f.nama as nama_jiwas,a.akun_akdhk,g.nama as nama_akdhk  "+
						"from gr_gaji_akun a "+
						"inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
						"inner join gr_masakun c on a.akun_gaji=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						"inner join gr_masakun d on a.akun_pph=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
						"inner join gr_masakun e on a.akun_jamsos=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
						"inner join gr_masakun f on a.akun_jiwas=f.kode_akun and a.kode_lokasi=f.kode_lokasi "+
						"inner join gr_masakun g on a.akun_akdhk=g.kode_akun and a.kode_lokasi=g.kode_lokasi "+
						"where a.kode_lokasi='"+this.app._lokasi+"' order by a.nik",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						this.sg.appendData([line.nik,line.nama,line.akun_gaji,line.nama_gaji,line.akun_pph,line.nama_pph,line.akun_jamsos,line.nama_jamsos,line.akun_jiwas,line.nama_jiwas,line.akun_akdhk,line.nama_akdhk]);
					}
				} else this.sg.clear(1);
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_nik.getText()+")");							
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