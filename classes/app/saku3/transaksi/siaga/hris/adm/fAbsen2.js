window.app_saku3_transaksi_siaga_hris_adm_fAbsen2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fAbsen2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_adm_fAbsen2";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Absensi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[30,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[30,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[130,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 

		this.pc1 = new pageControl(this,{bound:[20,12,840,460], childPage:["Data Absensi Multi","List Absensi Multi"]});	
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[10,12,200,20],caption:"No Absensi",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[215,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,17,460,20],caption:"Keterangan", maxLength:100});					
		this.cb_absen = new saiCBBL(this.pc1.childPage[0],{bound:[10,18,220,20],caption:"Status Absensi", multiSelection:false, maxLength:10, tag:1});
		this.cb_loker = new saiCBBL(this.pc1.childPage[0],{bound:[10,21,220,20],caption:"Unit Kerja", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[10,22,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[10,23,220,20],caption:"NIK Verifikasi", multiSelection:false, maxLength:10, tag:2});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[10,14,100,18],caption:"Tgl Awal", underline:true});		
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[110,14,100,18],date:new Date().getDateStr()}); 		
		this.l_tgl3 = new portalui_label(this.pc1.childPage[0],{bound:[10,15,100,18],caption:"Tgl Akhir", underline:true});		
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[0],{bound:[110,15,100,18],date:new Date().getDateStr()}); 						
		this.i_hitung = new portalui_imageButton(this.pc1.childPage[0],{bound:[215,15,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.p1 = new panel(this.pc1.childPage[0],{bound:[10,23,460,250],caption:"Daftar Tanggal",visible:true});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-25],colCount:1,tag:2,
		            colTitle:["Tanggal"],
					colWidth:[[0],[180]],															
					autoAppend:true,defaultRow:1});		

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["No. Absensi","Tanggal","Keterangan"],
					colWidth:[[2,1,0],[400,100,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});				
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_absen.setSQL("select sts_absen, nama from gr_status_absen where kode_lokasi='"+this.app._lokasi+"'",["sts_absen","nama"],false,["Kode","Nama"],"and","Data Status Absensi",true);	
			//this.cb_loker.setSQL("select kode_so, nama from gr_so where getdate() between tgl_awal and tgl_akhir and tipe='posting' and  kode_lokasi='"+this.app._lokasi+"'",["kode_so","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);						
			this.cb_loker.setSQL("select kode_loker, nama from gr_loker where flag_aktif='1' and  kode_lokasi='"+this.app._lokasi+"'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Unit Kerja",true);						
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Verifikasi",true);			
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			

			var strSQL = "select * from gr_karyawan "+							 
						 "where nik = '"+this.app._userLog+"' ";							 					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.cb_loker.setText(line.kode_loker);
					this.cb_buat.setText(line.nik);					
				}
			}	


		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fAbsen2.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_adm_fAbsen2.implement({
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);					
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan==0) {
						sql.add("delete from gr_absen where no_absen='"+this.e_nb.getText()+"'");
						sql.add("delete from gr_absen_harian_d where no_load='"+this.e_nb.getText()+"'");
					}

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
					this.stsSimpan = 1;
					if (this.stsSimpan == 1) this.doClick(this.i_gen);
				break;
			case "simpan" :	
			case "ubah" :				
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
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from gr_absen where no_absen='"+this.e_nb.getText()+"'");
				sql.add("delete from gr_absen_harian_d where no_load='"+this.e_nb.getText()+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;	
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doChange:function(sender){
		if (this.cb_loker.getText()!="") {
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_loker ='"+this.cb_loker.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
		}			
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_absen","no_absen",this.app._lokasi+"-MABS"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
			this.stsSimpan = 1;
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));	
				
				var strSQL = "select * from gr_absen "+							 
							 "where no_absen = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_ket.setText(line.keterangan);
						this.cb_absen.setText(line.sts_absen);
						this.cb_loker.setText(line.kode_loker);
						this.cb_buat.setText(line.nik_buat);
						this.cb_app.setText(line.nik_app);
						this.dp_d2.setText(line.tgl_absen);
						this.dp_d3.setText(line.tgl_akhir);
					}
				}	

				var strSQL = "select convert(varchar,tanggal,111) as tanggal from gr_absen_harian_d where  jenis='I' and no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];							
						this.sg.appendData([line2.tanggal]);
					}
				} else this.sg.clear(1);	
				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){
		if (this.e_periode.getText()!="") {						
			var strSQL = "select a.no_absen,convert(varchar,a.tgl_absen,103) as tanggal,a.keterangan "+
						"from gr_absen a "+
						"where a.progress='0' and a.tgl_akhir is not null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_absen desc";		
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
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
			this.sg1.appendData([line.no_absen,line.tanggal,line.keterangan]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
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