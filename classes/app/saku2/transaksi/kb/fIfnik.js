window.app_saku2_transaksi_kb_fIfnik = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kb_fIfnik.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kb_fIfnik";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pemegang Imprest Fund", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"NIK",maxLength:10,multiSelection:false,change:[this,"doChange"]});		
		this.cb_pp = new saiCBBL(this,{bound:[20,18,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});		
		this.e_nilai = new saiLabelEdit(this,{bound:[20,19,200,20],caption:"Nilai", maxLength:50, tag:1, tipeText:ttNilai});	
		this.cb_tahu = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});		
		this.cb_setuju = new saiCBBL(this,{bound:[20,20,200,20],caption:"NIK Menyetujui", multiSelection:false, maxLength:10, tag:2});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();									
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP Pemegang",true);
			this.cb_kode.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pemegang",true);
			this.cb_tahu.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Mengetahui",true);			
			this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Menyetujui",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kb_fIfnik.extend(window.childForm);
window.app_saku2_transaksi_kb_fIfnik.implement({
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
					sql.add("insert into yk_if_m(nik,kode_lokasi,nilai,nik_tahu,nik_setuju,kode_pp) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_tahu.getText()+"','"+this.cb_setuju.getText()+"','"+this.cb_pp.getText()+"')");
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
					sql.add("update yk_if_m set kode_pp='"+this.cb_pp.getText()+"',nilai="+parseNilai(this.e_nilai.getText())+",nik_tahu='"+this.cb_tahu.getText()+"',nik_setuju='"+this.cb_setuju.getText()+"' "+
					        "where nik = '"+this.cb_kode.getText()+"'");
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
					sql.add("delete from yk_if_m where nik = '"+this.cb_kode.getText()+"'");			
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
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.nilai,a.nik_tahu,a.nik_setuju,b.nama as nama_tahu,c.nama as nama_setuju,a.kode_pp,d.nama as nama_pp "+
				           " from yk_if_m a inner join karyawan b on a.nik_tahu=b.nik and a.kode_lokasi=b.kode_lokasi "+
						   "                inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi "+
						   "                inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
						   "where a.nik ='"+this.cb_kode.getText()+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.cb_pp.setText(line.kode_pp,line.nama_pp);
						this.cb_tahu.setText(line.nik_tahu,line.nama_tahu);
						this.cb_setuju.setText(line.nik_setuju,line.nama_setuju);
						this.e_nilai.setText(floatToNilai(line.nilai));
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						var data = this.dbLib.getDataProvider("select a.kode_pp,d.nama as nama_pp "+
								   " from karyawan a inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
								   " where a.nik ='"+this.cb_kode.getText()+"' ",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){						
								this.cb_pp.setText(line.kode_pp,line.nama_pp);					
							}					
						}						
						setTipeButton(tbSimpan);
					}
				}
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (NIK : "+ this.cb_kode.getText()+")");							
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