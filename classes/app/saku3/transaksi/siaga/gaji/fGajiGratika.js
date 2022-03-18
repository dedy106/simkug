window.app_saku3_transaksi_siaga_gaji_fGajiGratika = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_gaji_fGajiGratika.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_gaji_fGajiGratika";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Gaji Karyawan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 				
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,visible:false});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this,{bound:[810,13,200,20],caption:"Total Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						

		this.pc1 = new pageControl(this,{bound:[20,19,1000,385], childPage:["Daftar Gaji","Error Msg","List Bukti"]});
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:14,
					colTitle:["NIK", "Nama","Gapok","Konjungtur","Tunj Jab","Tunj Khusus","Lembur","Iur Koperasi","Pot Koperasi","Pot Asuransi","Rapel Gaji","Tunj Posisi","THR","Remunerasi"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2, 1,0],
							  [80,80,80,80,80,80,80,80,80,80,80,80, 150,80]],
					colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],
					          [cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
					readOnly:true, defaultRow:1
					});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager1"]});		
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-10],colCount:2,tag:9,
				colTitle:["NIK INVALID","Pesan"],
				colWidth:[[1,0],[500,200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});

		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi"],
					colWidth:[[2,1,0],[500,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		

		this.bRefresh = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn1.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);

		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);			
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_gaji_fGajiGratika.extend(window.childForm);
window.app_saku3_transaksi_siaga_gaji_fGajiGratika.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();						

			this.doCekDataNIK();				
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doCekDataNIK: function() {
		this.sg2.clear(); 	

		var strSQL = "select nik from hr_karyawan where kode_lokasi ='"+this.app._lokasi+"'";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataNIK = data;
		}				
		
		var total = 0;
		for (var i=0; i < this.sg1.getRowCount();i++){
			var inValid = true;
			for (var j=0;j < this.dataNIK.rs.rows.length;j++){
				if (this.sg1.cells(0,i) == this.dataNIK.rs.rows[j].nik) {
					inValid = false;
				}
			}	
			if (inValid) {
				var k = i+1;
				this.sg2.appendData([this.sg1.cells(0,i) + " [Baris - " + k +"]","NIK tidak terdaftar di Sistem."]);						
			}

			total += nilaiToFloat(this.sg1.cells(2,i)) + nilaiToFloat(this.sg1.cells(3,i)) + nilaiToFloat(this.sg1.cells(4,i)) + nilaiToFloat(this.sg1.cells(5,i)) + nilaiToFloat(this.sg1.cells(6,i)) + nilaiToFloat(this.sg1.cells(7,i)) + 
					 nilaiToFloat(this.sg1.cells(8,i)) + nilaiToFloat(this.sg1.cells(9,i)) + nilaiToFloat(this.sg1.cells(10,i)) + nilaiToFloat(this.sg1.cells(11,i)) + nilaiToFloat(this.sg1.cells(12,i))+ nilaiToFloat(this.sg1.cells(13,i));
		}
		this.e_nilai.setText(floatToNilai(total));
		if (this.sg2.getRowCount() != 0) {
			system.alert(this,"Terdapat Data Tidak Valid","");
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}		
	},
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
					
					sql.add("insert into hr_gaji_m (no_gaji,kode_lokasi,tanggal,periode,tgl_transfer,keterangan,nik_buat,tgl_input,nik_user,flag_penilaian,pesan,no_kas,nik_app,nik_fiat,nik_ver,no_pos,no_tak,posted,no_dokumen,modul) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','-','-','-','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._userLog+"','-','-','F','-','PAYLOAD')");
					
					for (var i=0;i < this.sg1.getRowCount();i++){	
						sql.add("insert into hr_gaji_d (no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir,dc,kode_drk) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','GAPOK','-','-',"+nilaiToFloat(this.sg1.cells(2,i))+",'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','-')");	

						sql.add("insert into hr_gaji_d (no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir,dc,kode_drk) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','KONJ','-','-',"+nilaiToFloat(this.sg1.cells(3,i))+",'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','-')");	

						sql.add("insert into hr_gaji_d (no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir,dc,kode_drk) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','TJAB','-','-',"+nilaiToFloat(this.sg1.cells(4,i))+",'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','-')");	

						sql.add("insert into hr_gaji_d (no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir,dc,kode_drk) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','TSUS','-','-',"+nilaiToFloat(this.sg1.cells(5,i))+",'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','-')");	

						sql.add("insert into hr_gaji_d (no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir,dc,kode_drk) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','LEMBUR','-','-',"+nilaiToFloat(this.sg1.cells(6,i))+",'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','-')");	

						sql.add("insert into hr_gaji_d (no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir,dc,kode_drk) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','IKOP','-','-',"+nilaiToFloat(this.sg1.cells(7,i))+",'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','-')");	

						sql.add("insert into hr_gaji_d (no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir,dc,kode_drk) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','PKOP','-','-',"+nilaiToFloat(this.sg1.cells(8,i))+",'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','-')");	

						sql.add("insert into hr_gaji_d (no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir,dc,kode_drk) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','PASUR','-','-',"+nilaiToFloat(this.sg1.cells(9,i))+",'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','-')");	

						sql.add("insert into hr_gaji_d (no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir,dc,kode_drk) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','RPL','-','-',"+nilaiToFloat(this.sg1.cells(10,i))+",'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','-')");	

						sql.add("insert into hr_gaji_d (no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir,dc,kode_drk) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','TPOS','-','-',"+nilaiToFloat(this.sg1.cells(11,i))+",'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','-')");	

						sql.add("insert into hr_gaji_d (no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir,dc,kode_drk) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','THR','-','-',"+nilaiToFloat(this.sg1.cells(12,i))+",'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','-')");	
						
						sql.add("insert into hr_gaji_d (no_gaji,kode_lokasi,nik,periode,kode_param,kode_loker,kode_akun,nilai,tgl_awal,tgl_akhir,dc,kode_drk) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','REMU','-','-',"+nilaiToFloat(this.sg1.cells(13,i))+",'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','-','-')");	
								
					}

					//update akun, dc
					sql.add("update a set a.kode_akun=b.kode_akun, a.dc=b.dc "+
							"from hr_gaji_d a inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); 	 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from hr_gaji_m where kode_lokasi='"+this.app._lokasi+"' and no_gaji='"+this.e_nb.getText()+"'");
					sql.add("delete from hr_gaji_d where kode_lokasi='"+this.app._lokasi+"' and no_gaji='"+this.e_nb.getText()+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				break;			
		}
	},	
	doSelectDate: function(sender, y,m,d){
		var sem = "";
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}		
		if (this.stsSimpan == 1) this.doClick();
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {									
			this.sg1.clear(1);this.sg2.clear(1);this.sg3.clear(1);
			this.e_nilai.setText("0");			
		}	
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hr_gaji_m","no_gaji",this.app._lokasi+"-PAY"+this.e_periode.getText().substr(2,4)+".","0000"));
		setTipeButton(tbSimpan);
		this.stsSimpan = 1;				
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Periode : "+ this.e_nb.getText()+")");							
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
	},

	doLoad3:function(sender){																		
		var strSQL = "select a.no_gaji,convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
		             "from hr_gaji_m a "+				 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'PAYLOAD' and a.posted='F'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_gaji,line.tgl,line.keterangan]); 
		}
		this.sg3.setNoUrut(start);
		this.page = 0;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
		this.page = page-1;
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbHapus);
				this.stsSimpan = 0;			
				var baris = (this.page * 20) + row; 
				this.e_nb.setText(this.sg3.cells(0,baris));	

				var data = this.dbLib.getDataProvider(
						   "select a.* "+						  
						   "from hr_gaji_m a "+
						   "where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);	
						this.e_ket.setText(line.keterangan);						
					} 
				}	

			}									
		} catch(e) {alert(e);}
	}
		

});