window.app_saku3_transaksi_spro_fPeserta = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spro_fPeserta.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spro_fPeserta";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Peserta", 0);	
		this.maximize();
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;server_RemoteObject2");
		this.e_nikes = new saiLabelEdit(this,{bound:[20,10,200,20],caption:"NIKES",maxLength:20,tag:9});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,12,300,20],caption:"Nama",maxLength:500,tag:9});		
		this.bLoad = new button(this,{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		this.bSynch = new button(this,{bound:[this.width - 120,11,80,18],caption:"Synch All",click:[this,"doSynch"]});			
		
		this.sg1 = new saiGrid(this,{bound:[1,5,this.width-25,this.height-120],colCount:19,tag:9,
		            colTitle:["STATUS","NIKES","Nama","Jenis","NIK","Nama Karyawan","Nomor Peserta","Status Nikah","Tgl Mulai Kerja","Tgl Pensiun","Pas. Anak Ke","Umur", "Kota Lahir","Alamat","Kelamin","Band","Jabatan","Grade","Status Aktif"],
					colWidth:[[18,17,16,1,5,14,13,12,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,80]],
					readOnly:true, rowPerPage:20,autoPaging:true, 
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					//colFormat : [[0],[cfBoolean]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this,{bound:[1,this.height-100,this.width-25,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
				
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib2 = new util_dbLib(undefined, "mssqlsika");
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.remoteObject = new server_RemoteObject2(undefined, "server_process_yakes_synchSika", this.app._dbSetting+":mssqlsika");
			this.remoteObject.addListener(this);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spro_fPeserta.extend(window.childForm);
window.app_saku3_transaksi_spro_fPeserta.implement({
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
					var nikes = ["' '"];
					for (var i=0; i < this.sg1.getRowCount(); i++){
						if (this.sg1.cells(0,i) == "APP")
							nikes.push("'"+this.sg1.cells(1,i)+"'");
					}
					var data = this.dbLib2.getDataProvider("select * from v_peserta where nikes in ("+nikes+") ", true);
					if (typeof data != "string"){
						for (var i = 0; i < data.rs.rows.length; i++){
							var line = data.rs.rows[i];
							var tmp = [];
							var field = "";
							for (var f in line){
								if (field != "") field += ",";
								field += f;
								if (f == "tgl_mulai_kerja" || f ==  "tgl_pensiun" || f ==  "tgl_capeg" || f == "tgl_lhr_kyw" || f == "tgl_faskes" || f == "tgl_nonaktif" || f == "tgl_akhir" || f == "tgl_nikah_kyw"){
									if (trim(line[f]) != "" && trim(line[f])!="-" )
										tmp.push("'"+line[f].substring(0,10)+"'");
									else tmp.push("null"); 
								}else 
									tmp.push("'"+trim(line[f])+"'");
							}
							sql.add("delete from yk_peserta where nikes = '"+line.nikes+"'");
							sql.add("delete from dbsimkug.dbo.yk_peserta where nikes = '"+line.nikes+"'");
							
							sql.add("insert into yk_peserta(jenis_peserta, jns_peserta, group_kel ,id_jns_peserta, kd_kelas_prwt, no_kk, nik, nomor_pst, nikes, photo, st_nikah, nm_kyw, nm_peserta, tgl_mulai_kerja, tgl_pensiun, tgl_capeg, pas_anak_ke, kota_lhr, umur, jl1, almt_kyw1,telp_kyw1, kodepos_kyw1, kota_kyw1, jl2, almt_kyw2, telp_kyw2, kodepos_kyw2, kota_kyw2, telp_kantor, tgl_lhr_kyw, kelamin, tgl_faskes, tgl_nonaktif, kd_agama, gol_drh_kyw, kd_band, klas_posisi, kdgrade, jabatan, kd_bagian, st_aktif, kd_pa, kd_sub_pa, kdtpk, kdarea, plafon, tgl_akhir, kd_faskes, no_hp, hr_host, tgl_nikah_kyw) "+
								 	" values("+tmp+")");							
									
							sql.add("insert into dbsimkug.dbo.yk_peserta(jenis_peserta, jns_peserta, group_kel ,id_jns_peserta, kd_kelas_prwt, no_kk, nik, nomor_pst, nikes, photo, st_nikah, nm_kyw, nm_peserta, tgl_mulai_kerja, tgl_pensiun, tgl_capeg, pas_anak_ke, kota_lhr, umur, jl1, almt_kyw1,telp_kyw1, kodepos_kyw1, kota_kyw1, jl2, almt_kyw2, telp_kyw2, kodepos_kyw2, kota_kyw2, telp_kantor, tgl_lhr_kyw, kelamin, tgl_faskes, tgl_nonaktif, kd_agama, gol_drh_kyw, kd_band, klas_posisi, kdgrade, jabatan, kd_bagian, st_aktif, kd_pa, kd_sub_pa, kdtpk, kdarea, plafon, tgl_akhir, kd_faskes, no_hp, hr_host, tgl_nikah_kyw) "+
								 	" values("+tmp+")");							
						}
						if (sql.getLength() > 0){
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}
					}
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			system.alert(this,e,"");
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from yk_loker where loker='"+this.cb_kode.getText()+"'");
					sql.add("insert into yk_loker(loker,nama,kode_cust) values ('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_cust.getText()+"')");
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
					sql.add("delete from yk_loker where loker='"+this.cb_kode.getText()+"'");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
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
				var strSQL = "select loker,nama,kode_cust from yk_loker where loker ='"+this.cb_kode.getText()+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
						this.cb_cust.setText(line.kode_cust);						
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}								
			if (sender == this.cb_cust && this.cb_cust.getText() != ""){				
				var strSQL = "select jenis,kode_lokasi from cust where kode_cust ='"+this.cb_cust.getText()+"' ";						   								
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_jenis.setText(line.jenis);												
						this.e_lokasi.setText(line.kode_lokasi);												
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nikes.getText()+")");							
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
	    if (sender == this.remoteObject){
	    	var msg = JSON.parse(result);
	    	system.info(this,msg.dbmessage ,msg.msg);
	    }
	},
	doCari:function(sender){								
		try {
			if (this.e_nikes.getText() != "" && this.e_nama.getText() != "")
				var strSQL = "select * from v_peserta "+
						 " where nikes like '"+this.e_nikes.getText()+"%' and nm_peserta like '%"+this.e_nama.getText()+"%' "+
						 "order by nikes";							
			else if (this.e_nikes.getText() != ""){
				var strSQL = "select * from v_peserta "+
						 " where nikes like '"+this.e_nikes.getText()+"%'  "+
						 "order by nikes";							
			}else var strSQL = "select * from v_peserta "+
						 " where nm_peserta like '%"+this.e_nama.getText()+"%' "+
						 "order by nikes";							
			var data = this.dbLib2.getDataProvider(strSQL,true);	
			this.sg1.clear(1);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				for (var i =0; i < data.rs.rows.length; i++){
					var line = data.rs.rows[i];
					//"NIKES","Nama","Jenis","NIK","Nama Karyawan","Nomor Peserta","Status Nikah","Tgl Mulai Kerja","Tgl Pensiun","Pas. Anak Ke","Umur", "Kota Lahir","Alamat","Kelamin","Band","Jabatan","Grade","Status Aktif"
					this.sg1.appendData(["INPROG",line.nikes,line.nm_peserta,line.jns_peserta, line.nik, line.nm_kyw,line.nomor_pst, line.st_nikah, line.tgl_mulai_kerja, line.tgl_pensiun, line.pas_anak_ke, line.umur, line.kota_lhr, line.almt_kyw1, line.kelamin,line.kd_band,line.jabatan, line.kdgrade, line.st_aktif]);
				}

			}		
			this.sgn1.setTotalPage(Math.ceil(this.sg1.getRowCount() / 20));
			this.sgn1.rearrange();	
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {			
				
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg1.appendData([line.loker,line.nama,line.cust,line.jenis,line.kode_lokasi]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.sg1.doSelectPage(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbSimpan);
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));									
			}
		} catch(e) {alert(e);}
	},
	doSynch: function(){
		this.remoteObject.params.clear();
		this.remoteObject.callAsynch("synchSika");
		
	}
});