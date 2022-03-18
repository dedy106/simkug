window.app_hris_transaksi_adm_fAbsen2 = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_adm_fAbsen2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_adm_fAbsen2";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Absensi : Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Absen",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_absen = new saiCBBL(this,{bound:[20,18,200,20],caption:"Status Absensi", multiSelection:false, maxLength:10, tag:1});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Keterangan", maxLength:100});					
		this.cb_loker = new saiCBBL(this,{bound:[20,21,200,20],caption:"Loker", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_buat = new saiCBBL(this,{bound:[20,22,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this,{bound:[20,23,200,20],caption:"NIK Verifikasi", multiSelection:false, maxLength:10, tag:2});
		this.l_tgl2 = new portalui_label(this,{bound:[20,14,100,18],caption:"Tgl Awal", underline:true});		
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,14,100,18],date:new Date().getDateStr()}); 		
		this.l_tgl3 = new portalui_label(this,{bound:[20,15,100,18],caption:"Tgl Akhir", underline:true});		
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,15,100,18],date:new Date().getDateStr()}); 						
		this.i_hitung = new portalui_imageButton(this,{bound:[225,15,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.p1 = new panel(this,{bound:[10,23,460,220],caption:"Daftar Tanggal Absen",visible:true});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-25],colCount:1,tag:9,
		            colTitle:["Tanggal"],
					colWidth:[[0],[100]],															
					autoAppend:true,defaultRow:1});		

		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_absen.setSQL("select sts_absen, nama from gr_status_absen where kode_lokasi='"+this.app._lokasi+"'",["sts_absen","nama"],false,["Kode","Nama"],"and","Data Status Absensi",true);	
			this.cb_loker.setSQL("select kode_loker, nama from gr_loker where kode_lokasi='"+this.app._lokasi+"'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Lokasi Kerja",true);						
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Verifikasi",true);			
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_loker.setText(this.app._kodeLoker);
			this.cb_buat.setText(this.app._userLog);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_adm_fAbsen2.extend(window.childForm);
window.app_hris_transaksi_adm_fAbsen2.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_absen","no_absen",this.app._lokasi+"-MABS"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_absen(no_absen,kode_lokasi,periode,tanggal,kode_loker,sts_absen,nik_buat,nik_app,keterangan,progress,tgl_input,nik_user,tgl_absen,tgl_akhir) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_loker.getText()+"','"+this.cb_absen.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.e_ket.getText()+"','0',getdate(),'"+this.app._userLog+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"')");
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
									"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(0,i)+" 08:00:00','I','M-ABSEN', '-')");
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
									"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(0,i)+" 17:00:00','O','M-ABSEN', '-')");							
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				var data = this.dbLib.getDataProvider("select nama from gr_libur where '"+this.dp_d2.getDateString()+"' between tgl_mulai and tgl_akhir and tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];							
					system.alert(this,"Transaksi tidak valid.","Tanggal masuk dalam hari libur : ["+line.nama+"]");
					return false;
				}
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doChange:function(sender){
		if (this.cb_loker.getText()!="") {
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_loker ='"+this.cb_loker.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_absen","no_absen",this.app._lokasi+"-MABS"+this.e_periode.getText().substr(2,4)+".","000"));
			this.dp_d2.setFocus();
		}
		else {		
			var data = this.dbLib.getDataProvider("select datediff(day,'"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"')+1 as jumlah",true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				var jumlah = parseInt(line.jumlah);
			}					
			this.sg.clear(1);
			var j = 0;
			var tanggal = "";
			for (var i=0;i < jumlah;i++){			
				var data = this.dbLib.getDataProvider("select dateadd(day,"+i+",'"+this.dp_d2.getDateString()+"') as tanggal",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];							
					var data2 = this.dbLib.getDataProvider("select tgl_mulai from gr_libur where tahun='"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"' and '"+line.tanggal+"' between tgl_mulai and tgl_akhir",true);			
					if (typeof data2 == "object" && data2.rs.rows[0] != undefined){						
					} 
					else {
						tanggal = line.tanggal.substr(0,4)+'-'+line.tanggal.substr(5,2)+'-'+line.tanggal.substr(8,2);
						this.sg.cells(0,j,tanggal);
						this.sg.appendRow(1);
						j++;
					}					 				
				}
			}		
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
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