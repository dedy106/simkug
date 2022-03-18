window.app_saku3_transaksi_yspt_dikti_fRekBeaAlokasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_dikti_fRekBeaAlokasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_dikti_fRekBeaAlokasi";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pelunasan Tagihan Beasiswa [Alokasi]", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_piutang = new saiLabelEdit(this,{bound:[790,11,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_nilai = new saiLabelEdit(this,{bound:[790,12,200,20],caption:"Total Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_sisa = new saiLabelEdit(this,{bound:[790,17,200,20],caption:"Tot Sisa Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new button(this,{bound:[650,17,100,20],caption:"Data Bill",click:[this,"doLoad"]});			
		
		this.pc1 = new pageControl(this,{bound:[5,12,1000,380], childPage:["Alokasi Beasiswa","Data Tagihan","Data Pelunasan","Error Msg","Hapus Bukti"]});
		this.cb_bukti = new saiCBBL(this.pc1.childPage[0],{bound:[20,18,220,20],caption:"No Alokasi", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_ppkirim = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"PP Beban", readOnly:true, maxLength:10, tag:2 });
		this.cb_titip = new saiCBBL(this.pc1.childPage[0],{bound:[20,20,220,20],caption:"Akun Beban", readOnly:true, maxLength:10, tag:2 });
		this.e_nilaialok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Nilai Alokasi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:0,
		      		colTitle:["N I M","Nama","No Bill","Akun Piutang","Saldo","Pelunasan","Kode Param"],					
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,120,200,120]],					
					colFormat:[[4,5],[cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,5,400,this.pc1.height-33],colCount:3,
					colTitle:["N I M","Nilai Bayar","Sisa Pelunasan"],
					colWidth:[[2,1,0],[100,100,100]],
					colFormat:[[1,2],[cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:1000,afterPaste:[this,"doAfterPaste"], 
					readOnly:true, defaultRow:1
					});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager1"]});		

		this.sg2 = new portalui_saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-10],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});			

		this.c_periode = new saiCB(this.pc1.childPage[4],{bound:[20,22,200,20],caption:"Periode",readOnly:true,tag:9, change:[this,"doChange"]});
		this.cb_bukti2 = new saiCBBL(this.pc1.childPage[4],{bound:[20,16,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:9, change:[this,"doChange"]});
		this.e_nilai2 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,18,200,20],caption:"Nilai", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.bDel = new button(this.pc1.childPage[4],{bound:[120,16,80,18],caption:"Hapus Bukti",click:[this,"doDelete"]});
		
		this.bRefresh = new portalui_imageButton(this.sgn1,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[4].rearrangeChild(10, 23);	

		setTipeButton(tbSimpan);

		this.bRekon = new button(this.pc1.childPage[2],{bound:[420,10,100,20],caption:"Rekon Pelunasan", click:[this,"doRekon"]});
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_titip.setSQL("select a.kode_akun, a.nama from masakun a "+
								 "inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('034') "+
								 "where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);
			
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='SISCD' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunCD = line.flag;
			} else this.akunCD = "";
			
			if (this.akunCD == "") {
				system.alert(this,"SPRO CD (SISCD) tidak ditemukan.","");
			}

			this.c_periode.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode from trans_m where form = 'MHSALOKBEA' and kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode.addItem(i,line.periode);
				}
			}	

			this.c_periode.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_dikti_fRekBeaAlokasi.extend(window.childForm);
window.app_saku3_transaksi_yspt_dikti_fRekBeaAlokasi.implement({
	doDelete: function() {		
		if (this.cb_bukti2.getText() != "") {
			var sql = new server_util_arrayList();
			sql.add("delete from trans_m where no_bukti='"+this.cb_bukti2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("delete from trans_j where no_bukti='"+this.cb_bukti2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("delete from dikti_bill_rekon where no_rekon='"+this.cb_bukti2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("delete from dikti_cd where no_bukti='"+this.cb_bukti2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
			sql.add("update dikti_beagar_d set no_ref = '-' where no_ref='"+this.cb_bukti2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

			this.dbLib.execArraySQL(sql);

			this.c_periode.setText("");
			this.cb_bukti2.setText("");
			this.e_nilai2.setText("0");
		}
	},
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();										
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doCekDataSiswa: function() {
		var strSQL = "select a.nim from dikti_mhs a inner join dikti_mhs_status b on a.kode_status=b.kode_status and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"'";					// and b.flag_aktif='1' <---- tidak pakai syarat
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataNIM = data;
		}				

		this.inValid = false;
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(0,i,"INVALID | "+this.sg1.cells(0,i));					
			for (var j=0;j < this.dataNIM.rs.rows.length;j++){
				if (this.sg1.cells(0,i).substr(10,20) == this.dataNIM.rs.rows[j].nim) {					
					this.sg1.cells(0,i,this.dataNIM.rs.rows[j].nim);				
				}
			}	
			if (this.sg1.cells(0,i).substr(0,7) == "INVALID") this.inValid = true;									
		}	

		this.sg2.clear();
		for (var i=0; i < this.sg1.getRowCount();i++) {
			if (this.sg1.cells(0,i).substr(0,7) == "INVALID") {
				var j = i+1;
				this.sg2.appendData([j]);						
			}
		}
	},
	doRekon: function(sender){				
		try {
			this.doCekDataSiswa();
			if (this.inValid) {				
				this.pc1.setActivePage(this.pc1.childPage[2]);	
				system.alert(this,"Data tidak valid.","Terdapat data mahasiswa yang tidak terdaftar NIM-nya.");
				return false;										
			} 
			else {
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					this.dataJU.rs.rows[i].lunas = 0;				
				}	
				var totSisaRekon = 0;
				for (var i=0; i < this.sg1.getRowCount();i++){								
					var nilaiBayar = nilaiToFloat(this.sg1.cells(1,i));	
				
					for (var j=0;j < this.dataJU.rs.rows.length;j++){
						if (this.sg1.cells(0,i) == this.dataJU.rs.rows[j].nim) {
							if (nilaiBayar >= (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas))) {
								nilaiBayar = nilaiBayar - (parseFloat(this.dataJU.rs.rows[j].saldo) - parseFloat(this.dataJU.rs.rows[j].lunas));
								this.dataJU.rs.rows[j].lunas += (parseFloat(this.dataJU.rs.rows[j].saldo)-parseFloat(this.dataJU.rs.rows[j].lunas));
							}
							else {
								this.dataJU.rs.rows[j].lunas += nilaiBayar;
								nilaiBayar = 0;							
								break;
							}												
						}
					}	
				
					if (nilaiBayar != 0) {
						this.sg1.cells(2,i,floatToNilai(nilaiBayar));	
						totSisaRekon += nilaiBayar;				
					}			
				}
			
				var tot = sisa = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot = tot + parseFloat(line.lunas);				
				}
				this.e_nilai.setText(floatToNilai(tot));
				this.e_sisa.setText(floatToNilai(totSisaRekon));
			
				this.pc1.setActivePage(this.pc1.childPage[0]);			
				this.doTampilData(1);	
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-REK"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("update dikti_beagar_d set no_ref = '"+this.e_nb.getText()+"' where no_gar='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					var total = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_sisa.getText());
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,due_date,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','MI','MHSALOKBEA','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"', '-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_sisa.getText())+",0,'-','-','-','-','-','-','-','"+this.cb_titip.getText()+"','-')");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.cb_titip.getText()+"','D',"+total+","+
							total+",'"+this.e_ket.getText()+"','MHSALOKBEA','TITIP','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");											

					this.doHitungAR();
					var line = undefined;
					for (var i in this.gridAR.objList){
						line = this.gridAR.get(i);		
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+line.get("kode_akun")+"','C',"+parseFloat(line.get("nilai"))+","+
								parseFloat(line.get("nilai"))+",'"+this.e_ket.getText()+"','MHSALOKBEA','PIUT','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");											
					}		

					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (parseFloat(line.lunas) != 0){									
							sql.add("insert into dikti_bill_rekon(no_rekon,kode_lokasi,periode,no_bill,nim,kode_param,akun_titip,akun_piutang,nilai,nilai_cd,dc,modul) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+line.no_bill+"','"+line.nim+"','"+line.kode_param+"','"+this.cb_titip.getText()+"','"+line.akun_piutang+"',"+parseFloat(line.lunas)+",0,'D','MHSALOKBEA')");
						}						
					}
					
					for (var i=0; i < this.sg1.getRowCount();i++){
						if (nilaiToFloat(this.sg1.cells(2,i)) != 0) {				
							sql.add("insert into dikti_cd(no_bukti,nim,periode,nilai,kode_lokasi,akun_cd,kode_param,dc,modul,no_ref1) values "+
									"('"+this.e_nb.getText()+"','"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(2,i))+",'"+this.app._lokasi+"','"+this.akunCD+"','-','D','MHSALOKBEA','-')");
							
							var k = i + 100000;
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+k+",'"+this.akunCD+"','C',"+nilaiToFloat(this.sg1.cells(2,i))+","+
									nilaiToFloat(this.sg1.cells(2,i))+",'"+this.e_ket.getText()+"','MHSALOKBEA','CD','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
												
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh kurang atau sama dengan nol.");
					return false;						
				}
				if (nilaiToFloat(this.e_sisa.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Sisa pelunasan tidak boleh kurang nol.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_nilaialok.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan pelunasan melebihi nilai alokasi.");
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;					
		this.e_periode.setText(y+""+m)
		this.e_nb.setText("");
		var strSQL = "select a.no_gar,a.keterangan "+
					 "from dikti_beagar_m a inner join ( "+
					 "    select distinct no_gar,kode_lokasi from dikti_beagar_d where no_ref = '-' and kode_lokasi='"+this.app._lokasi+"' "+
					 " ) b on a.no_gar=b.no_gar and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";			  
		this.cb_bukti.setSQL(strSQL,["no_gar","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Alokasi",true);
	},
	doChange:function(sender){
		if (sender == this.cb_bukti && this.cb_bukti.getText()!="") {
			var strSQL = "select a.*,b.nilai "+
						"from dikti_beagar_m a inner join dikti_beagar_d b on a.no_gar=b.no_gar and a.kode_lokasi=b.kode_lokasi "+							 
						"where a.no_gar = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";								
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					this.cb_titip.setText(line.kode_akun);					
					this.cb_ppkirim.setText(line.kode_pp);	
					this.e_nilaialok.setText(floatToNilai(line.nilai));					
				}
			}
		}

		if (sender == this.c_periode && this.c_periode.getText()!="") {
			this.cb_bukti2.setSQL("select no_bukti,keterangan from trans_m where posted='F' and kode_lokasi='"+this.app._lokasi+"' and form='MHSALOKBEA' and periode='"+this.c_periode.getText()+"'",["no_bukti","keterangan"],false,["Bukti","Deskripsi"],"and","Daftar Pelunasan",true);	
		}
		if (sender == this.cb_bukti2 && this.cb_bukti2.getText()!="") {
			var strSQL = "select nilai1 from trans_m where no_bukti='"+this.cb_bukti2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_nilai2.setText(floatToNilai(line.nilai1));
					
				}				
			}
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-REK"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},
	doLoad: function(sender){			
		this.e_piutang.setText("0");
		this.e_nilai.setText("0");		
		this.dataJU = {rs:{rows:[]}};					
		var strSQL = "SELECT a.nim,a.nama,a.no_bill,a.akun_piutang,a.tot_bill-isnull(b.tot_lunas,0) as saldo,0 as lunas,0 as sisa,a.kode_param,a.idx "+
						"FROM "+
						"("+
						"		select "+
						"		a.nim,c.nama,a.no_bill,a.akun_piutang,a.kode_param,d.idx,sum(a.nilai) as tot_bill "+
						"		from dikti_bill_d a "+
						"		inner join dikti_mhs c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi "+
						"		inner join dikti_param d on a.kode_param = d.kode_param and a.kode_lokasi=d.kode_lokasi "+					
						"		where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
						"		group by a.nim,c.nama,a.no_bill,a.akun_piutang,a.kode_param,d.idx "+
						") a "+						 
						"LEFT JOIN "+						 
						"( "+
						"		select no_bill,nim,kode_lokasi,kode_param,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
						"       from dikti_bill_rekon "+
						"		where kode_lokasi='"+this.app._lokasi+"' "+
						"		group by nim,no_bill,kode_lokasi,kode_param "+
						") b on a.nim=b.nim and a.no_bill=b.no_bill and a.kode_param=b.kode_param "+

						"WHERE (a.tot_bill-isnull(b.tot_lunas,0)) > 0 "+
						"ORDER by a.nim,a.idx";
	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.saldo);
			}		
			this.e_piutang.setText(floatToNilai(tot));
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];			
			this.sg.appendData([line.nim,line.nama,line.no_bill,line.akun_piutang,floatToNilai(line.saldo),floatToNilai(line.lunas),line.kode_param]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},		
	doHitungAR: function() {
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var ix,dtJrnl = 0;
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];
			if (parseFloat(line.lunas) != 0){
				kdAkun = line.akun_piutang;
				nemu = false;
				ix = 0;
				for (var j in dtJurnal.objList){		
				  if ((kdAkun == dtJurnal.get(j).get("kode_akun"))){
					nemu = true;
					row = dtJurnal.get(j);
					ix = j;
					break;
				  }
				}
				if (!nemu){
					row = new portalui_arrayMap();
					row.set("kode_akun",kdAkun);
					row.set("nilai",parseFloat(line.lunas));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.lunas));
			}
		}
		this.gridAR = dtJurnal;
	}, 
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							this.nama_report="server_report_saku3_siswa_rptSisJurnalRekonYpt";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rekon='"+this.e_nb.getText()+"' ";
							this.filter = this.filter2;
							this.viewer.prepare();
							this.viewer.setVisible(true);
							this.app._mainForm.pButton.setVisible(false);
							this.app._mainForm.reportNavigator.setVisible(true);
							this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
							this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
							this.app._mainForm.reportNavigator.rearrange();
							this.showFilter = undefined;
							this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
							this.page = 1;
							this.allBtn = false;
							this.pc1.hide();							
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});