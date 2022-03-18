window.app_saku3_transaksi_ypt_ginas_fGajiTelU = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_ginas_fGajiTelU.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_ypt_ginas_fGajiTelU";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Penggajian Tel-U", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[230,11,80,20],caption:"",tag:2,readOnly:true,change:[this,"doChange"],labelWidth:0,visible:false});		
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,410], childPage:["Rekap Data","Detail Gaji","Error Msg","List Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[3],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
					colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,490,180,80,100]],colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[3],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,300,20],caption:"No Dokumen", maxLength:50});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});
		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tanggal Transfer", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18]}); 
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});	
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});								
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"PP / Unit", multiSelection:false, maxLength:10, tag:2});								
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});								
		this.e_totpdpt = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Total Pdpt", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_totpot = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Total Potongan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Total Transfer", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.sg1 = new portalui_saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:14,tag:9,
				colTitle:["NIK","Nama","%Kinerja",
						  "Gaji","TunJab","Lembur","TunKom","Rapel", 
						  "Kosumba","Kehadiran","Kocitel","BPJS","KKPT","GIAT"],
				colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,80,80,80,80,80,80, 200,100]],
				colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				readOnly:true,
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		

		this.sg2 = new portalui_saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg2, pager:[this,"doPage2"]});		

		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		
		this.rearrangeChild(10,23);	
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.setTabChildIndex();				
		
		setTipeButton(tbAllFalse);
		
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			this.stsSimpan = 1;		
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);		
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);		

			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);					

			this.cb_buat.setText(this.app._userLog);
			this.cb_pp.setText(this.app.kodePP);
		}catch(e){
			systemAPI.alert(e);
		}

	}
};
window.app_saku3_transaksi_ypt_ginas_fGajiTelU.extend(window.portalui_childForm);
window.app_saku3_transaksi_ypt_ginas_fGajiTelU.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();	
			this.doValid();			
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doValid: function() {
		try {
			this.inValid = false;
			
			//cek data NIK
			var strSQL = "select nik,nama from hr_karyawan where kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataNIK = data;
			}		

			var totpdpt = totpot = total = 0;
			
			for (var i=0; i < this.sg1.getRowCount();i++){
				this.sg1.cells(1,i,"INVALID");

				totpdpt += nilaiToFloat(this.sg1.cells(3,i)) + 
						   nilaiToFloat(this.sg1.cells(4,i)) + nilaiToFloat(this.sg1.cells(5,i)) + 
						   nilaiToFloat(this.sg1.cells(6,i)) + nilaiToFloat(this.sg1.cells(7,i));

				totpot +=  nilaiToFloat(this.sg1.cells(8,i)) + nilaiToFloat(this.sg1.cells(9,i)) + 
						   nilaiToFloat(this.sg1.cells(10,i)) + nilaiToFloat(this.sg1.cells(11,i)) + 
						   nilaiToFloat(this.sg1.cells(12,i)) + nilaiToFloat(this.sg1.cells(13,i));		  
				
				if (this.dataNIK.rs.rows.length > 0) {
					for (var j=0;j < this.dataNIK.rs.rows.length;j++){				
						if (this.sg1.cells(0,i) == this.dataNIK.rs.rows[j].nik) {
							this.sg1.cells(1,i,this.dataNIK.rs.rows[j].nama);							
						}															
					}	
					if (this.sg1.cells(1,i) == "INVALID") this.inValid = true;									
				}											
			}	
		
			if (this.inValid == false) {
				setTipeButton(tbSimpan);	

				this.e_totpdpt.setText(floatToNilai(totpdpt));
				this.e_totpot.setText(floatToNilai(totpot));
				total = totpdpt - totpot;
				this.e_total.setText(floatToNilai(total));
			}
			else {
				system.alert(this,"Terdapat data NIK yang tidak valid.","");
				this.e_totpdpt.setText("0");
				this.e_totpot.setText("0");
				this.e_total.setText("0");

				this.pc2.setActivePage(this.pc2.childPage[1]);	
				this.sg2.clear();
				for (var i=0; i < this.sg1.getRowCount();i++) {
					if (this.sg1.cells(1,i) == "INVALID") {
						var j = i+1;
						this.sg2.appendData([j]);						
					}
				}
			}
		}
		catch(e) {
			alert(e);
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into hr_gaji_m(no_gaji,kode_lokasi,periode,tanggal,no_dokumen,keterangan,nik_buat,nik_app,posted,tgl_transfer,tgl_input,nik_user,nilai,kode_pp,kode_drk,form) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+
								 this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F','"+this.dp_d2.getDateString()+"',getdate(),'"+this.app._userLog+"',"+nilaiToFloat(this.e_total.getText())+",'"+
								 this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','GJTELU')");					

					for (var i=0;i < this.sg1.getRowCount();i++){	

						sql.add("insert into hr_gaji_loadtelu(no_gaji,kode_lokasi,nik,kinerja,gadas,tunjab,lembur,tukom,rapel,kosumba,hadir,kocitel,bpjs,kkpt,giat) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"', '"+this.sg1.cells(0,i)+"',"+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(3,i))+","+nilaiToFloat(this.sg1.cells(4,i))+","+
								nilaiToFloat(this.sg1.cells(5,i))+","+nilaiToFloat(this.sg1.cells(6,i))+","+nilaiToFloat(this.sg1.cells(7,i))+","+nilaiToFloat(this.sg1.cells(8,i))+","+
								nilaiToFloat(this.sg1.cells(9,i))+","+nilaiToFloat(this.sg1.cells(10,i))+","+nilaiToFloat(this.sg1.cells(11,i))+","+nilaiToFloat(this.sg1.cells(12,i))+","+
								nilaiToFloat(this.sg1.cells(13,i))+")");

						//pdpt
						sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_akun,periode,nilai,dc) values "+
								"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','TGDAS','"+this.app._lokasi+"','X','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(3,i))+",'X')");
						sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_akun,periode,nilai,dc) values "+
								"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','TTJAB','"+this.app._lokasi+"','X','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(4,i))+",'X')");		
						sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_akun,periode,nilai,dc) values "+
								"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','TLBR','"+this.app._lokasi+"','X','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(5,i))+",'X')");		
						sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_akun,periode,nilai,dc) values "+
								"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','TTKOM','"+this.app._lokasi+"','X','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(6,i))+",'X')");
						sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_akun,periode,nilai,dc) values "+
								"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','TRPL','"+this.app._lokasi+"','X','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(7,i))+",'X')");
						
						//potongan		
						sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_akun,periode,nilai,dc) values "+
								"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','TKSUM','"+this.app._lokasi+"','X','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(8,i))+",'X')");
						sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_akun,periode,nilai,dc) values "+
								"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','THDR','"+this.app._lokasi+"','X','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(9,i))+",'X')");
						sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_akun,periode,nilai,dc) values "+
								"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','TKOCI','"+this.app._lokasi+"','X','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(10,i))+",'X')");										
						sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_akun,periode,nilai,dc) values "+
								"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','TBPJS','"+this.app._lokasi+"','X','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(11,i))+",'X')");				
						sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_akun,periode,nilai,dc) values "+
								"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','TKKPT','"+this.app._lokasi+"','X','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(12,i))+",'X')");							
						sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_akun,periode,nilai,dc) values "+
								"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','TGIAT','"+this.app._lokasi+"','X','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(13,i))+",'X')");										
					}

					sql.add("update a set a.kode_akun=b.kode_akun, a.dc=b.dc "+
							"from hr_gaji_d a inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");

					sql.add("insert into hr_gaji_j(no_gaji,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,kode_akun,'"+this.e_ket.getText()+"',dc,sum(nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','HRGAJI',kode_param,periode,'IDR',1,'"+this.app._userLog+"',getdate() "+
							"from hr_gaji_d "+
							"where no_gaji='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"group by kode_akun,dc,kode_param,periode");

					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_gaji,'HRGAJI',kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,0,sum(nilai) "+
							"from hr_gaji_j where no_gaji='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"group by no_gaji,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,dc");

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
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); this.sg3.clear(1); 					
					setTipeButton(tbSimpan);
					if (this.stsSimpan == 1) this.doClick();		
				}
				break;
			case "simpan" :	
					this.preView = "1";		
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	

					if (nilaiToFloat(this.e_total.getText()) <= 0) {
						system.alert(this,"Transaksi tidak valid.","Nilai Transfer tidak boleh kurang atau sama dengan nol.");
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
					else 
					this.simpan();
				break;		
			case "simpancek" : this.simpan();		
				break;			
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from hr_gaji_m where no_gaji = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hr_gaji_loadtelu where no_gaji = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hr_gaji_d where no_gaji = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hr_gaji_j where no_gaji = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		this.cb_drk.setSQL("select kode_drk, nama from drk where tahun='"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);		
		if (this.stsSimpan == 1) this.doClick();		
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.stsSimpan == 1) {						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hr_gaji_m","no_gaji",this.app._lokasi+"-GJ"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses dieksekusi.");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	},
	doLoad3:function(sender){																		
		var strSQL = "select no_gaji,convert(varchar,tanggal,103) as tgl,no_dokumen,keterangan,nilai "+
		             "from hr_gaji_m a "+					 					 
					 "where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and posted ='F' and form ='GJTELU'";		
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
			this.sg3.appendData([line.no_gaji,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from hr_gaji_m "+							 
							 "where no_gaji = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.tgl_transfer);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_buat.setText(line.nik_buat);
						this.cb_app.setText(line.nik_app);
						this.cb_pp.setText(line.kode_pp);
						this.cb_drk.setText(line.kode_drk);
						this.e_total.setText(floatToNilai(line.nilai));						
					}
				}								
				
				var strSQL = "select sum(case dc when 'D' then nilai else 0 end) as totpdpt, sum(case dc when 'C' then nilai else 0 end) as totpot "+
							 "from hr_gaji_d "+							 
							 "where no_gaji = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_totpdpt.setText(floatToNilai(line.totpdpt));
						this.e_totpot.setText(floatToNilai(line.totpot));								
					}
				}	
				
			}									
		} catch(e) {alert(e);}
	}

});
