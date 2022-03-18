window.app_saku3_transaksi_sapyakes_fDepoAkru = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fDepoAkru.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fDepoAkru";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Bunga Deposito", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,410,80,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Post SAP", multiSelection:false, maxLength:10, tag:2,visible:false });		
		this.e_rev = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total Reverse", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"DRK BuDep", multiSelection:false, maxLength:10, tag:2 });		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Total Akru", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[690,18,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		  
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,325], childPage:["DOC/Deposito"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:15,tag:0,
		            colTitle:["No Deposito","Keterangan","Akun Piutang","Akun Pdpt","Tgl Awal","Tgl Akhir","Jml Hari","Basis","Rate","Nominal","Net Akru","Net Hitung","Nilai Rev","Pajak Akru","Pajak Hitung"],
					colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,70,70,70,80,80,80,80,150,100]],
					colFormat:[[6,7,8,9,10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],					
					colHide:[[13,14],[true,true]],
					autoPaging:true, rowPerPage:20,
					readOnly:true,
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});		
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.app._periode.substr(0,4)+"-"+this.app._periode.substr(4,2)+"-01')+1,0))) tgl_akhir ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.dp_d1.setText(line.tgl_akhir);
			}
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			//this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.app._kodeBidang+"' and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join sap_nik_post b on a.nik=b.nik "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
							   
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BUDEPDRK','PPINV','MANIV') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];						
					if (line.kode_spro == "BUDEPDRK") this.cb_drk.setText(line.flag);
					if (line.kode_spro == "PPINV") this.kodePP = line.flag;				
					if (line.kode_spro == "MANINV") this.nikMan = line.flag;				
				}
			}
			
			var data = this.dbLib.getDataProvider("select nik from sap_nik_post where kode_lokasi ='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				this.cb_app.setText(line.nik);
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fDepoAkru.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fDepoAkru.implement({
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
					if (this.stsSimpan == 0) {
						sql.add("update inv_depoakru_d set no_flag='-' where no_flag='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update a set a.tgl_hitung=a.tgl_hitungseb "+
						        "from inv_depo2_m a inner join inv_depoakru_d b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
								"where b.no_akru='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("delete from inv_depoakru_m where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_depoakru_j where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_depoakru_d where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from glsap where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into inv_depoakru_m(no_akru,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input,progress) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.kodePP+"','"+this.cb_drk.getText()+"','F','DOCAKRU','"+this.app._userLog+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate(),'0')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								//reverse akru seb								
								sql.add("update inv_depoakru_d set no_flag='"+this.e_nb.getText()+"' where no_depo='"+this.sg.cells(0,i)+"' and dc='D' and no_flag='-' and kode_lokasi='"+this.app._lokasi+"' and no_cair='-'");
								sql.add("insert into inv_depoakru_d(no_akru,no_depo,periode,nilai,kode_lokasi,akun_piutang,akun_pdpt,kode_pp,kode_drk,dc,no_del,nilai_depo,jml_hari,tgl_awal,tgl_akhir,no_cair,no_kas,nilai_cair,pajak_akru,nilai_hitung,pajak_hitung,nilai_adm,no_flag) "+
										"select '"+this.e_nb.getText()+"',no_depo,'"+this.e_periode.getText()+"',nilai,kode_lokasi,akun_piutang,akun_pdpt,kode_pp,kode_drk,'C',no_del,nilai_depo,jml_hari,tgl_awal,tgl_akhir,'"+this.e_nb.getText()+"','"+this.e_nb.getText()+"',nilai_cair,pajak_akru,nilai_hitung,pajak_hitung,nilai_adm,no_akru "+
										"from inv_depoakru_d where no_depo='"+this.sg.cells(0,i)+"' and no_flag='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
										
								var akruBruto = nilaiToFloat(this.sg.cells(10,i)) + nilaiToFloat(this.sg.cells(13,i));
								var hitungBruto = nilaiToFloat(this.sg.cells(11,i)) + nilaiToFloat(this.sg.cells(14,i));																
								sql.add("insert into inv_depoakru_d(no_akru,no_depo,periode,nilai,kode_lokasi,akun_piutang,akun_pdpt,kode_pp,kode_drk,dc,no_del,nilai_depo,jml_hari,tgl_awal,tgl_akhir,no_cair,no_kas,nilai_cair,pajak_akru,nilai_hitung,pajak_hitung,nilai_adm,no_flag) values "+
										"('"+this.e_nb.getText()+"','"+this.sg.cells(0,i)+"','"+this.e_periode.getText()+"',"+akruBruto+",'"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.kodePP+"','"+this.cb_drk.getText()+"','D','-',"+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(6,i))+",'"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','-','-',0,"+nilaiToFloat(this.sg.cells(13,i))+","+hitungBruto+","+nilaiToFloat(this.sg.cells(14,i))+",0,'-')");								
								sql.add("update inv_depo2_m set tgl_hitungseb=tgl_hitung,tgl_hitung=(case when dateadd(MONTH,1,tgl_hitung) <= tgl_selesai then dateadd(MONTH,1,tgl_hitung) else tgl_selesai end)  where no_depo='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
						}
					}
					
					sql.add("insert into inv_depoakru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select no_akru,'-','"+this.dp_d1.getDateString()+"',0,akun_piutang,'"+this.e_ket.getText()+"','D',sum(nilai-pajak_akru),'"+this.kodePP+"','-','"+this.app._lokasi+"','DOCAKRU','PIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from inv_depoakru_d where no_akru = '"+this.e_nb.getText()+"' and no_flag='-' group by no_akru,akun_piutang");
					sql.add("insert into inv_depoakru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select no_akru,'-','"+this.dp_d1.getDateString()+"',1,akun_pdpt,'"+this.e_ket.getText()+"','C',sum(nilai-pajak_akru),'"+this.kodePP+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','DOCAKRU','PDPT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from inv_depoakru_d where no_akru = '"+this.e_nb.getText()+"' and no_flag='-' group by no_akru,akun_pdpt");					
					
					//reverse akru seb, pake drk eksisting
					sql.add("insert into inv_depoakru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select no_flag,'-','"+this.dp_d1.getDateString()+"',99,akun_piutang,'"+this.e_ket.getText()+"','C',sum(nilai-pajak_akru),'"+this.kodePP+"','-','"+this.app._lokasi+"','DOCAKRU','PIUREV','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from inv_depoakru_d where no_flag = '"+this.e_nb.getText()+"' group by no_flag,akun_piutang");					
					sql.add("insert into inv_depoakru_j (no_akru,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select no_flag,'-','"+this.dp_d1.getDateString()+"',98,akun_pdpt,'"+this.e_ket.getText()+"','D',sum(nilai-pajak_akru),'"+this.kodePP+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','DOCAKRU','PDPTREV','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from inv_depoakru_d where no_flag = '"+this.e_nb.getText()+"' group by no_flag,akun_pdpt");				
					
					
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod)  "+
							"select '"+this.e_nb.getText()+"',no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,tgl_input,nik_user,'-','-','-','-','-','-','-' ,'-','-','-' "+
							"from inv_depoakru_j where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); 
					this.sg3.clear(1); 
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.bTampil.show();
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai akru tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_rev.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Reverse tidak boleh kurang dari nol.");
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
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update inv_depoakru_d set no_flag='-' where no_flag='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update a set a.tgl_hitung=a.tgl_hitungseb "+
							"from inv_depo2_m a inner join inv_depoakru_d b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_akru='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("delete from inv_depoakru_m where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depoakru_j where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depoakru_d where no_akru='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from glsap where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);
			this.dataJU.rs.rows = [];
			this.sg.clear(1); 
			this.e_nilai.setText("0");
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {								
				this.e_nilai.setText("0");								
				this.sg.clear(1);
				this.bTampil.show();
			}			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depoakru_m","no_akru",this.app._lokasi+"-DAK"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			this.stsSimpan = 1;					
			setTipeButton(tbSimpan);			
		}
	},
	doLoadData: function(sender){
		this.e_nilai.setText("0");								
		var strSQL = "select a.no_depo,a.keterangan,a.akun_piutang,a.akun_pdpt,"+
		             "convert(varchar,a.tgl_akru,111) as tgl_akru, "+		             
					 "convert(varchar,case when a.tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end ,111) as tgl_akhir, "+
					 "datediff(day,a.tgl_akru,case when a.tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) as jml_hari,"+
					 "a.basis,a.p_bunga,a.nilai, "+					 
					 "round((cast(datediff(day,a.tgl_akru,case when a.tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) as float) / a.basis * a.nilai * a.p_bunga/100 * 0.8),0) as nilai_akru, "+					 
					 "round((cast(datediff(day,a.tgl_akru,case when dateadd(MONTH,1,a.tgl_hitung) <= a.tgl_selesai then dateadd(MONTH,1,a.tgl_hitung) else a.tgl_selesai end) as float)  / a.basis * a.nilai * a.p_bunga/100 * 0.8),0) as nilai_hitung, "+
					 
					 "round((cast(datediff(day,a.tgl_akru,case when a.tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) as float) / a.basis * a.nilai * a.p_bunga/100 * 0.2),0) as pajak_akru, "+					 
					 "round((cast(datediff(day,a.tgl_akru,case when dateadd(MONTH,1,a.tgl_hitung) <= a.tgl_selesai then dateadd(MONTH,1,a.tgl_hitung) else a.tgl_selesai end) as float)  / a.basis * a.nilai * a.p_bunga/100 * 0.2),0) as pajak_hitung, "+
					 
					 "isnull(b.reverse,0) as reverse "+
					 "from inv_depo2_m a "+
					 "    left join ( "+
					 "                select no_depo,kode_lokasi,sum(nilai-pajak_akru) as reverse "+
					 "                from inv_depoakru_d "+
					 "                where no_cair = '-' and no_flag='-' and kode_lokasi='"+this.app._lokasi+"' group by no_depo,kode_lokasi "+
					 "     ) b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
					 "where a.progress = '1' "+ 
					 "and a.tgl_akru <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) "+
					 "and datediff(month,a.tgl_akru,a.tgl_selesai) <> 0 "+
					 "and a.tgl_akru<a.tgl_selesai order by a.no_depo";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			
			var line;
			var tot = rev = 0;
			this.sg.clear();
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];			
				tot += parseFloat(line.nilai_akru);
				rev += parseFloat(line.reverse);
				this.sg.appendData([line.no_depo,line.keterangan,line.akun_piutang,line.akun_pdpt,line.tgl_akru,line.tgl_akhir,floatToNilai(line.jml_hari),floatToNilai(line.basis),floatToNilai(line.p_bunga),floatToNilai(line.nilai),floatToNilai(line.nilai_akru),floatToNilai(line.nilai_hitung),floatToNilai(line.reverse),floatToNilai(line.pajak_akru),floatToNilai(line.pajak_hitung)]);
			}
			this.e_rev.setText(floatToNilai(rev));
			this.e_nilai.setText(floatToNilai(tot));
			
		} else this.sg.clear(1);	
	},	
	doTampilData: function(page) {
		this.sg.doSelectPage(page);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_akru='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
								this.pc2.hide();   
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
				this.pc2.show();   
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
			setTipeButton(tbSimpan);			
			this.stsSimpan = 1;
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.sg.clear(1); 
			this.sg3.clear(1); 
			this.dataJU.rs.rows = [];					
			this.bTampil.show();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																									
		var strSQL = "select distinct a.no_akru,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from inv_depoakru_m a left join "+			 					 
					 "(				select distinct no_akru,kode_lokasi from inv_depoakru_d "+
					 " 				where no_flag='-' and no_cair<>'-' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.e_periode.getText()+"' "+
					 ") b on a.no_akru=b.no_akru and a.kode_lokasi=b.kode_lokasi "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.progress = '0' "+
					 "order by a.no_akru";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.sg3.clear();
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.page = 1;
			for (var i=0;i < this.dataJU3.rs.rows.length;i++){				
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.no_akru,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
			}
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);
		this.page=page;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {		
		try{
			var baris = ((this.page-1) * 20) + row;
			if (this.sg3.cells(0,baris) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.bTampil.hide();
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select * from inv_depoakru_m where no_akru = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);	
						this.e_ket.setText(line.keterangan);	
						this.cb_drk.setText(line.kode_drk);	
						this.cb_app.setText(line.nik_setuju);											
					}
				}
				
				this.e_nilai.setText("0");								
				var strSQL = "select a.no_depo,a.keterangan,a.akun_piutang,a.akun_pdpt,"+
							 "convert(varchar,a.tgl_akru,111) as tgl_akru, "+		             
							 "convert(varchar,case when a.tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end ,111) as tgl_akhir, "+
							 "datediff(day,a.tgl_akru,case when a.tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) as jml_hari,"+
							 "a.basis,a.p_bunga,a.nilai, "+					 
							 "round((cast(datediff(day,a.tgl_akru,case when a.tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) as float) / a.basis * a.nilai * a.p_bunga/100 * 0.8),0) as nilai_akru, "+
							 "round((cast(datediff(day,a.tgl_akru,case when dateadd(MONTH,1,a.tgl_hitungseb) <= a.tgl_selesai then dateadd(MONTH,1,a.tgl_hitungseb) else a.tgl_selesai end) as float)  / a.basis * a.nilai * a.p_bunga/100 * 0.8),0) as nilai_hitung, "+
							 
							 "round((cast(datediff(day,a.tgl_akru,case when a.tgl_selesai<=(dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) as float) / a.basis * a.nilai * a.p_bunga/100 * 0.2),0) as pajak_akru, "+					 
							 "round((cast(datediff(day,a.tgl_akru,case when dateadd(MONTH,1,a.tgl_hitungseb) <= a.tgl_selesai then dateadd(MONTH,1,a.tgl_hitungseb) else a.tgl_selesai end) as float)  / a.basis * a.nilai * a.p_bunga/100 * 0.2),0) as pajak_hitung, "+
							 
							 "isnull(b.reverse,0) as reverse "+
							 "from inv_depo2_m a "+
							 "	  inner join inv_depoakru_d c on a.no_depo=c.no_depo and a.kode_lokasi=c.kode_lokasi and c.no_flag='-' "+
							 "    left join ( "+
							 "                select no_depo,kode_lokasi,sum(nilai-pajak_akru) as reverse "+
							 "                from inv_depoakru_d "+
							 "                where no_cair ='-' and no_flag='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_depo,kode_lokasi "+
							 "     ) b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
							 "where c.no_akru='"+this.e_nb.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' order by a.no_depo";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					
					var line;
					var tot = rev = 0;
					this.sg.clear();
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];			
						tot += parseFloat(line.nilai_akru);
						rev += parseFloat(line.reverse);
						this.sg.appendData([line.no_depo,line.keterangan,line.akun_piutang,line.akun_pdpt,line.tgl_akru,line.tgl_akhir,floatToNilai(line.jml_hari),floatToNilai(line.basis),floatToNilai(line.p_bunga),floatToNilai(line.nilai),floatToNilai(line.nilai_akru),floatToNilai(line.nilai_hitung),floatToNilai(line.reverse),floatToNilai(line.pajak_akru),floatToNilai(line.pajak_hitung)]);
					}
					this.e_rev.setText(floatToNilai(rev));
					this.e_nilai.setText(floatToNilai(tot));
					
				} else this.sg.clear(1);					
			}
		} catch(e) {alert(e);}		
	}
});