window.app_saku3_transaksi_investasi_fSahamDevE = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_fSahamDevE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_fSahamDevE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Deviden Saham: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_drk = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2});						
		this.cb_saham = new saiCBBL(this,{bound:[20,12,200,20],caption:"Saham", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_total = new saiLabelEdit(this,{bound:[710,12,200,20],caption:"Total KasBank", tipeText:ttNilai, text:"0", readOnly:true});				
		
		this.p1 = new panel(this,{bound:[10,23,900,300],caption:"Daftar Saham Per MI"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:5,tag:0,				
				colTitle:["Kode MI","Nama","Nilai KasBank","Nilai PPH","Nilai Deviden"],
				colWidth:[[4,3,2,1,0],[100,100,100,240,80]],
				columnReadOnly:[true,[0,1,3,4],[2]],
				colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],								
				change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});				
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
				
		this.rearrangeChild(10, 23);
					
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
									
			this.cb_saham.setSQL("select kode_saham, nama from inv_saham ",["kode_saham","nama"],false,["Kode","Nama"],"where","Data Saham",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
					
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPINV','SHMDEVMI','SHMDEVSW','SHMPPHM') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "SHMDEVMI") this.akunDevMI = line.flag;			
					if (line.kode_spro == "SHMDEVSW") this.akunDevSWA = line.flag;	
					if (line.kode_spro == "SHMPPHM") this.akunPPh = line.flag;								
					if (line.kode_spro == "PPINV") this.kodepp = line.flag;								
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_fSahamDevE.extend(window.childForm);
window.app_saku3_transaksi_investasi_fSahamDevE.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					sql.add("delete from inv_shmdev_m where no_shmdev = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_shmdev_d where no_shmdev = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					
					sql.add("insert into inv_shmdev_m(no_shmdev,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,kode_drk,kode_saham,periode,nilai,nik_buat,tgl_input,nik_user) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.cb_saham.getText()+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"')");								
													
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(2,i) != "0"){
							var data = this.dbLib.getDataProvider("select jenis from inv_kelola where kode_kelola='"+this.sg.cells(0,i)+"'",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line = data.rs.rows[0];							
								if (line.jenis == "MI") var akunDev = this.akunDevMI;
								else var akunDev = this.akunDevSWA;
							}								
							sql.add("insert into inv_shmdev_d(no_shmdev,kode_lokasi,kode_kelola,nilai_kb,nilai_pph,nilai_dev,akun_dev,akun_pph,no_kas) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+",'"+akunDev+"','"+this.akunPPh+"','-')");
						}
					}
					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
					this.sg.clear(1);
					setTipeButton(tbUbahHapus);					
				break;
			case "ubah" :					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_shmdev_m where no_shmdev = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_shmdev_d where no_shmdev = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);					
	},
	doChange:function(sender){		
		if (sender == this.e_periode && this.e_periode.getText()!="") {			
			this.e_nb.setSQL("select no_shmdev,keterangan from inv_shmdev_m where no_shmdev not in (select no_shmdev from inv_shmdev_d where no_kas <>'-') "+
			                 "and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
							 ["no_shmdev","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti ",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select tanggal,periode,no_dokumen,keterangan,kode_drk,nik_buat,kode_saham "+
			           "from inv_shmdev_m "+			           					   					   
					   "where no_shmdev='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;					
					this.dp_d1.setText(line.tanggal);					
					this.e_dok.setText(line.no_dokumen);					
					this.e_ket.setText(line.keterangan);					
					this.cb_saham.setText(line.kode_saham);	
					this.cb_buat.setText(line.nik_buat);
					this.cb_drk.setText(line.kode_drk);										
				} 
			}			
			var strSQL = "select b.kode_kelola,b.nama,a.nilai_kb,a.nilai_pph,a.nilai_dev from inv_shmdev_d a inner join inv_kelola b on a.kode_kelola=b.kode_kelola where a.no_shmdev='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_kelola,line.nama,floatToNilai(line.nilai_kb),floatToNilai(line.nilai_pph),floatToNilai(line.nilai_dev)]);
				}
			} else this.sg.clear(1);						
		}
	},		
	doChangeCell: function(sender, col, row){		
		if (col == 2) {			
			var nilaiDev = Math.round(nilaiToFloat(this.sg.cells(2,row)) * 100/85);
			var nilaiPPh = nilaiDev - nilaiToFloat(this.sg.cells(2,row));
			this.sg.cells(3,row,floatToNilai(nilaiPPh));
			this.sg.cells(4,row,floatToNilai(nilaiDev));
			
			this.sg.validasi();
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(2,i) != ""){
					tot += nilaiToFloat(this.sg.cells(2,i));				
				}
			}			
			this.e_total.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Bukti : "+ this.e_nb.getText()+")");							
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