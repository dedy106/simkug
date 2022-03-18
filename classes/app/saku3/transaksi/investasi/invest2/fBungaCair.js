window.app_saku3_transaksi_investasi_invest2_fBungaCair = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_invest2_fBungaCair.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fBungaCair";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pencairan Bunga Deposito: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pencairan","List Pencairan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,410,80,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"DRK BuDep", multiSelection:false, maxLength:10, tag:2 });
		this.cb_kelola = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"MI", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.cb_depo = new saiCBBL(this.pc2.childPage[0],{bound:[20,20,220,20],caption:"No Deposito", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_tanggal = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,450,20],caption:"Tgl Deposito", readOnly:true});						
		this.e_rate = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,21,200,20],caption:"Rate", readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_basis = new saiLabelEdit(this.pc2.childPage[0],{bound:[270,21,200,20],caption:"Basis", readOnly:true, tipeText:ttNilai, text:"0"});						
		this.e_akru = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,21,200,20],caption:"Tot. Net Akru", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_nominal = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Nominal", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});							
		this.i_nonakru = new portalui_button(this.pc2.childPage[0],{bound:[690,19,80,18],caption:"Non Akru",click:[this,"doClick"]});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,19,200,20],caption:"Tot. Net Cair", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
	
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,212], childPage:["Data Akru Deposito","Deposito Tutup"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:11,tag:9,
		            colTitle:["No Akru","Keterangan","Tgl Akru","Akun Piutang","Akun Pdpt","Kode DRK","Jml Hari","Net Akru","Bruto Hitung","Pjk Hitung","Net Cair"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[90,90,80,80,60,70,70,70,70,200,100]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[10]],
					colHide:[[5],[true]],
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],
					colFormat:[[6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});	
		
		this.cb_depoTutup = new saiCBBL(this.pc1.childPage[1],{bound:[20,20,220,20],caption:"No Deposito", multiSelection:false, maxLength:10, tag:9});
		this.bPilih = new portalui_button(this.pc1.childPage[1],{bound:[120,18,80,18],caption:"Pilih Data",click:[this,"doPilih"]});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
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
			this.cb_kelola.setSQL("select kode_kelola, nama from inv_kelola",["kode_kelola","nama"],false,["Kode","Nama"],"and","Daftar Pengelola",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fBungaCair.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fBungaCair.implement({	
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
						sql.add("delete from inv_depocair_m where no_cair ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_depocair_j where no_cair ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_depoakru_d where no_cair = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_akru like 'NONAKRU-%'");
						sql.add("update a set a.tgl_akru=a.tgl_akru_seb "+
						        "from inv_depo2_m a inner join inv_depoakru_d b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
								"where b.no_cair='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update inv_depoakru_d set no_cair='-',nilai_cair=0,nilai_adm=0 where no_cair='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into inv_depocair_m(no_cair,no_depo,tanggal,keterangan,kode_curr,kurs,nilai_rev,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+nilaiToFloat(this.e_akru.getText())+","+nilaiToFloat(this.e_nilai.getText())+",'"+this.kodePP+"','"+this.cb_drk.getText()+"','F','DOCCAIR','"+this.app._userLog+"','"+this.nikMan+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','"+this.cb_kelola.getText()+"','"+this.app._userLog+"',getdate())");
					sql.add("update inv_depo2_m set tgl_akru_seb=tgl_akru, tgl_akru='"+this.dp_d1.getDateString()+"' where no_depo = '"+this.cb_depo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
										
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(10,i) != "" && this.sg.cells(10,i) != "0"){
							if (this.sg.cells(0,i).substr(0,7) != "NONAKRU") {
								sql.add("insert into inv_depocair_j(no_cair,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.sg.cells(4,i)+"','"+this.sg.cells(1,i)+"','D',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.kodePP+"','"+this.sg.cells(5,i)+"','"+this.app._lokasi+"','DOCCAIR','PDPTREV','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");															
								sql.add("insert into inv_depocair_j(no_cair,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.sg.cells(3,i)+"','"+this.sg.cells(1,i)+"','C',"+nilaiToFloat(this.sg.cells(7,i))+",'"+this.kodePP+"','"+this.sg.cells(5,i)+"','"+this.app._lokasi+"','DOCCAIR','PIUREV','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");								
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','DOCCAIR','"+this.app._lokasi+"','"+this.sg.cells(4,i)+"','"+this.kodePP+"','"+this.sg.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+nilaiToFloat(this.sg.cells(7,i))+")");																
								
								sql.add("update inv_depoakru_d set no_cair='"+this.e_nb.getText()+"',nilai_cair="+nilaiToFloat(this.sg.cells(10,i))+",nilai_adm=0 where no_depo='"+this.cb_depo.getText()+"' and no_akru='"+this.sg.cells(0,i)+"' and no_flag='-' and kode_lokasi='"+this.app._lokasi+"'");
							}
							else {
								sql.add("insert into inv_depoakru_d(no_akru,no_depo,periode,nilai,kode_lokasi,akun_piutang,akun_pdpt,kode_pp,kode_drk,dc,no_del,nilai_depo,jml_hari,tgl_awal,tgl_akhir,no_cair,no_kas,nilai_cair,pajak_akru,nilai_hitung,pajak_hitung,nilai_adm) values "+
										"('"+this.sg.cells(0,i)+"','"+this.cb_depo.getText()+"','"+this.e_periode.getText()+"',0,'"+this.app._lokasi+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"','"+this.kodePP+"','"+this.cb_drk.getText()+"','D','-',"+nilaiToFloat(this.e_nominal.getText())+",0,'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_nb.getText()+"','-',"+nilaiToFloat(this.sg.cells(10,i))+",0,0,0,0)");
																
								sql.add("update inv_depo2_m set tgl_hitungseb=tgl_hitung,tgl_hitung=(case when dateadd(MONTH,1,'"+this.dp_d1.getDateString()+"') <= tgl_selesai then dateadd(MONTH,1,'"+this.dp_d1.getDateString()+"') else tgl_selesai end)  where no_depo='"+this.cb_depo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							}							
							
							var k = i+1000;
							var j = i+2000;
							sql.add("insert into inv_depocair_j(no_cair,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"',"+k+",'"+this.sg.cells(3,i)+"','"+this.sg.cells(1,i)+"','D',"+nilaiToFloat(this.sg.cells(10,i))+",'"+this.kodePP+"','"+this.sg.cells(5,i)+"','"+this.app._lokasi+"','DOCCAIR','PIUCAIR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");							
							sql.add("insert into inv_depocair_j(no_cair,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_depo.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(4,i)+"','"+this.sg.cells(1,i)+"','C',"+nilaiToFloat(this.sg.cells(10,i))+",'"+this.kodePP+"','"+this.sg.cells(5,i)+"','"+this.app._lokasi+"','DOCCAIR','PDPTCAIR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");																	
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
					this.sg.clear(1); this.sg3.clear(1); 
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;										
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai akru tidak boleh nol atau kurang.");
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
					sql.add("delete from inv_depocair_m where no_cair ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depocair_j where no_cair ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_depoakru_d where no_cair = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_akru like 'NONAKRU-%'");
					sql.add("update a set a.tgl_akru=a.tgl_akru_seb "+
							"from inv_depo2_m a inner join inv_depoakru_d b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_cair='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update inv_depoakru_d set no_cair='-',nilai_cair=0,nilai_adm=0 where no_cair='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);			
			this.cb_depoTutup.setSQL("select distinct a.no_depo, convert(varchar,a.tgl_mulai,103) + ' - ' +a.keterangan as keterangan "+
					                 "from inv_depo2_m a "+
								     "where a.progress='Z' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_depo","a.keterangan"],false,["No Deposito","Keterangan"],"and","Daftar Deposito",true);
		}
	},
	doChange:function(sender){
		if (sender == this.cb_kelola && this.cb_kelola.getText()!="") {
			this.cb_depo.setSQL("select distinct a.no_depo, convert(varchar,a.tgl_mulai,103) + ' - ' +a.keterangan as keterangan "+
								"from inv_depo2_m a "+ //inner join inv_depoakru_d b on a.no_depo=b.no_depo and b.no_cair='-' and b.no_flag='-' 
								"where progress = '1' and a.kode_kelola='"+this.cb_kelola.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_depo","a.keterangan"],false,["No Deposito","Keterangan"],"and","Daftar Deposito",true);				
		}
		
		if (sender == this.e_periode) {
			this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);			
			this.sg.clear(1); 
			this.e_akru.setText("0");	
			this.e_nilai.setText("0");
		}
		if (sender == this.cb_depo && this.cb_depo.getText()!="") {
			var strSQL = "select convert(varchar,tgl_mulai,103)+'     -     '+convert(varchar,tgl_selesai,103) as tgl,p_bunga,basis,nilai,akun_pdpt,akun_piutang "+
			             "from inv_depo2_m where no_depo='"+this.cb_depo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_tanggal.setText(line.tgl);																				
					this.e_rate.setText(floatToNilai(line.p_bunga));
					this.e_basis.setText(floatToNilai(line.basis));
					this.e_nominal.setText(floatToNilai(line.nilai));	
					this.akunPiutang = line.akun_piutang;
					this.akunPDPT = line.akun_pdpt;
				} 
			}
			if (this.stsSimpan == 1) {
				this.e_akru.setText("0");
				this.e_nilai.setText("0");			
				var strSQL = "select a.no_akru,b.keterangan,convert(varchar,a.tgl_akhir,111) as tgl_akhir,a.akun_piutang,a.akun_pdpt,a.kode_drk,a.jml_hari,a.nilai-pajak_akru as net_akru,nilai_hitung,pajak_hitung, nilai_hitung-pajak_hitung as net_hitung "+
							 "from inv_depoakru_d a inner join inv_depoakru_m b on a.no_akru=b.no_akru and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_depo='"+this.cb_depo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_cair='-' and a.no_flag='-'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_akru,line.keterangan,line.tgl_akhir,line.akun_piutang,line.akun_pdpt,line.kode_drk,floatToNilai(line.jml_hari),floatToNilai(line.net_akru),floatToNilai(line.nilai_hitung),floatToNilai(line.pajak_hitung),floatToNilai(line.net_hitung)]);
					}
				} else this.sg.clear(1);				
			}
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0) {								
				this.e_nilai.setText("0");								
				this.e_akru.setText("0");								
				this.sg.clear(1);								
			}
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_depocair_m","no_cair",this.app._lokasi+"-DCA"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			this.stsSimpan = 1;					
			setTipeButton(tbSimpan);			
		}
		if (sender == this.i_nonakru && this.cb_depo.getText()!="") {			
			this.sg.clear();
			
			var strSQL = "select "+
			             "round(cast(datediff(DAY,tgl_akru,'"+this.dp_d1.getDateString()+"') as float),0) as jmlhari, "+
						 "round((cast(datediff(DAY,tgl_akru,'"+this.dp_d1.getDateString()+"') as float) / basis * nilai * p_bunga / 100),0) as bruto, "+
						 "round((cast(datediff(DAY,tgl_akru,'"+this.dp_d1.getDateString()+"') as float) / basis * nilai * p_bunga / 100 * 0.2),0) as pajak, "+
						 "round((cast(datediff(DAY,tgl_akru,'"+this.dp_d1.getDateString()+"') as float) / basis * nilai * p_bunga / 100 * 0.8),0) as netcair "+
			             "from inv_depo2_m where no_depo='"+this.cb_depo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					var i = this.sg.rows.getLength()+1;
					this.sg.appendData(['NONAKRU-'+i,'NONAKRU',this.dp_d1.getDateString(),this.akunPiutang,this.akunPDPT,this.cb_drk.getText(),floatToNilai(line.jmlhari),'0',floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.netcair)]);
				} 
			}
					
		}
	},			
	doChangeCell: function(sender, col, row){
		if (col == 10) this.sg.validasi();		
	},
	doNilaiChange: function(){
		try{						
			var akru = cair = pajak = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != "" && this.sg.cells(10,i) != ""){
					akru += nilaiToFloat(this.sg.cells(7,i));				
					cair += nilaiToFloat(this.sg.cells(10,i));									
				}
			}
			this.e_akru.setText(floatToNilai(akru));
			this.e_nilai.setText(floatToNilai(cair));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doPilih:function(sender){
		if (this.cb_depoTutup.getText() != "") {
			this.cb_depo.setSQL("select a.no_depo, convert(varchar,a.tgl_mulai,103) + ' - ' +a.keterangan as keterangan "+
								"from inv_depo2_m a "+
								"where a.no_depo='"+this.cb_depoTutup.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_depo","a.keterangan"],false,["No Deposito","Keterangan"],"and","Daftar Deposito",true);
			this.cb_depo.setText(this.cb_depoTutup.getText());
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
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
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																									
		var strSQL = "select distinct a.no_cair,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from inv_depocair_m a left join "+
					 "(				select distinct no_cair,kode_lokasi from inv_depoakru_d "+
					 " 				where no_flag='-' and no_kas<>'-' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.e_periode.getText()+"' "+
					 ") b on a.no_cair=b.no_cair and a.kode_lokasi=b.kode_lokasi "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' "+
					 "order by a.no_cair";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.sg3.clear();
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.page = 1;
			for (var i=0;i < this.dataJU3.rs.rows.length;i++){				
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.no_cair,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
			}
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);
		this.page = page;
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
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select * from inv_depocair_m where no_cair = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);	
						this.e_ket.setText(line.keterangan);	
						this.cb_drk.setText(line.kode_drk);												
						this.cb_kelola.setText(line.no_link);												
						this.cb_depo.setSQL("select no_depo, convert(varchar,tgl_mulai,103) + ' - ' +keterangan as keterangan from inv_depo2_m where no_depo='"+line.no_depo+"' and kode_lokasi='"+this.app._lokasi+"'",["no_depo","keterangan"],false,["No Deposito","Keterangan"],"and","Daftar Depostio",true);
						this.cb_depo.setText(line.no_depo);												
					}
				}
			
				this.e_akru.setText("0");
				this.e_nilai.setText("0");			
				var strSQL = "select a.no_akru,b.keterangan,convert(varchar,a.tgl_akhir,111) as tgl_akhir,a.akun_piutang,a.akun_pdpt,a.kode_drk,a.jml_hari,a.nilai-a.pajak_akru as net_akru,a.nilai_hitung,a.pajak_hitung,a.nilai_cair "+
							 "from inv_depoakru_d a inner join inv_depoakru_m b on a.no_akru=b.no_akru and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_depo='"+this.cb_depo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_cair='"+this.e_nb.getText()+"' and a.no_flag='-'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_akru,line.keterangan,line.tgl_akhir,line.akun_piutang,line.akun_pdpt,line.kode_drk,floatToNilai(line.jml_hari),floatToNilai(line.net_akru),floatToNilai(line.nilai_hitung),floatToNilai(line.pajak_hitung),floatToNilai(line.nilai_cair)]);
					}
				} else this.sg.clear(1);
				
			}
		} catch(e) {alert(e);}		
	}
});