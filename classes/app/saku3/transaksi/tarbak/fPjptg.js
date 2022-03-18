window.app_saku3_transaksi_tarbak_fPjptg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_fPjptg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_fPjptg";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Panjar: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Panjar","List Panjar"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Pertgg","No Panjar","Tanggal","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,500,80,120,120]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"No Pertanggungan",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[245,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"NIK Pemegang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.cb_pj = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"No Panjar", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,280], childPage:["Data Panjar","Item Jurnal Pertanggungan","Data Anggaran"]});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal Panjar", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18]}); 		
		this.cb_akunpj = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Akun Panjar", readOnly:true, maxLength:10, tag:2});
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"PP",readOnly:true, maxLength:10, tag:2});
		this.e_nilaipj = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Nilai Panjar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nilaiptg = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Nilai Pertanggungan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_nilaikb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Nilai KasBank", tag:9, tipeText:ttNilai, text:"0"});				
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,22,200,20],caption:"Jenis KB",items:["BM","BK"], readOnly:true,tag:9,change:[this,"doChange"]});
		this.e_kb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,23,200,20],caption:"No KasBank",maxLength:30,readOnly:true, tag:9});
		this.cb_akunkb = new saiCBBL(this.pc1.childPage[0],{bound:[20,24,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:9});
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,280,50,200,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		

		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,200,80,200,80]],
					readOnly:true,colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);
					
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);		
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.c_jenis.setText("BM");
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Daftar NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Daftar NIK Approval",true);
			this.cb_akunkb.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						          "where b.kode_flag in ('001','009') and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun KasBank",true);									
			this.flagGarFree = "0"; this.flagDokFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_fPjptg.extend(window.childForm);
window.app_saku3_transaksi_tarbak_fPjptg.implement({
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
			if (this.stsSimpan == 1) {
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ptg_m","no_ptg",this.app._lokasi+"-PJPTG"+this.e_periode.getText().substr(2,4)+".","0000"));
				if (nilaiToFloat(this.e_nilaikb.getText()) != 0) this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));
				else this.e_kb.setText("-"); 
			}			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();								
					if (this.stsSimpan == 0) {
						sql.add("update panjar_m set progress = '2' where no_pj='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ptg_m where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from ptg_j where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						
						sql.add("delete from kas_m where no_kas = '"+this.e_kb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from kas_j where no_kas = '"+this.e_kb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																		
					}
					
					if (nilaiToFloat(this.e_nilaikb.getText()) != 0) var posted = "X"; else var posted = "F";
					sql.add("update panjar_m set progress = '3' where no_pj='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					//-------------------------------------------------- modul ptg
					sql.add("insert into ptg_m (no_ptg,no_pj,no_kas,no_dokumen,tanggal,keterangan,catatan,kode_curr,kurs,akun_pj,akun_kas,nik_buat,nik_setuju,kode_lokasi,kode_pp,modul,nilai,nilai_kas,kode_drk,progress,posted,periode,no_del,no_link,nik_user,tgl_input) values "+					
							"('"+this.e_nb.getText()+"','"+this.cb_pj.getText()+"','"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','IDR',1,'"+this.cb_akunpj.getText()+"','"+this.cb_akunkb.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','PJPTG',"+parseNilai(this.e_nilaiptg.getText())+","+parseNilai(this.e_nilaikb.getText())+",'-','2','"+posted+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate())");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into ptg_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','-','"+this.app._lokasi+"','PJPTG','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
							}
						}
					}
					if (nilaiToFloat(this.e_nilaikb.getText()) != 0) {
						if (this.c_jenis.getText() == "BK") var DC = "C"; else var DC = "D"; 
						sql.add("insert into ptg_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',98,'"+this.cb_akunkb.getText()+"','"+this.e_ket.getText()+"','"+DC+"',"+parseNilai(this.e_nilaikb.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PJPTG','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}
					sql.add("insert into ptg_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.cb_akunpj.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilaipj.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PJPTG','PJ','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");								
					
					
					//--------------------------------------------------- modul kb
					if (nilaiToFloat(this.e_nilaikb.getText()) != 0) {						
						sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
								"('"+this.e_kb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.cb_akunkb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','KBPTG','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilaikb.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.e_nb.getText()+"','-')");
						if (this.sg.getRowValidCount() > 0){
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i)){
									sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
											"	('"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','-','-','-','"+this.app._lokasi+"','KBPTG','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
								}
							}
						}
						if (this.c_jenis.getText() == "BK") var DC = "C"; else var DC = "D"; 
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
								"	('"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',98,'"+this.cb_akunkb.getText()+"','"+this.e_ket.getText()+"','"+DC+"',"+parseNilai(this.e_nilaikb.getText())+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','KBPTG','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
								"	('"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.cb_akunpj.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilaipj.getText())+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','KBPTG','PJ','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
					} 
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(5,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(5,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(5,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"	('"+this.e_nb.getText()+"','PJPTG','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(4,i))+","+nilai+")");
							}
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg3.clear(1); this.sg.clear(1); this.sg2.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";		
				if (this.flagDokFree == "1" && this.e_dok.getText()!= "-") {
					var data = this.dbLib.getDataProvider("select no_kas from kas_m where no_dokumen='"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							system.alert(this,"No Dokumen sudah terpakai.","Terpakai di no bukti : "+line.no_kas);
							return false;
						} 
					}
				}
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}
				}
				this.sg.validasi();	
				this.dataJU = {rs:{rows:[]}};				
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
				} 				
				var k=0;
				for (var j=0;j < this.sg.getRowCount();j++){
					if (this.sg.rowValid(j)){
						for (var i=0;i<this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.kode_akun == this.sg.cells(0,j)) {		
								k = j+1;
								system.alert(this,"Transaksi tidak valid.","Akun KasBank tidak diperkenankan.[Baris : "+k+"]");
								return false;						
							}
						}
					}
				}
				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilaikb.getText()) != 0) {
					this.e_nilaikb.setTag("0");
					this.c_jenis.setTag("0");
					this.e_kb.setTag("0");
					this.cb_akunkb.setTag("0");					
				} else {
					this.e_nilaikb.setTag("9");
					this.c_jenis.setTag("9");
					this.e_kb.setTag("9");
					this.cb_akunkb.setTag("9");					
				}				
				this.doHitungGar();
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (nilaiToFloat(this.sg2.cells(5,i)) > 0 && nilaiToFloat(this.sg2.cells(4,i)) < nilaiToFloat(this.sg2.cells(5,i))) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
							return false;						
						}
					}
				}
				if (this.c_jenis.getText() == "BK") var nilaikb = nilaiToFloat(this.e_nilaikb.getText()) * -1; 
				else var nilaikb = nilaiToFloat(this.e_nilaikb.getText());
				if (nilaiToFloat(this.e_nilaipj.getText()) != nilaiToFloat(this.e_nilaiptg.getText())+nilaikb) {
					system.alert(this,"Transaksi tidak valid.","Total Pertanggungan,KasBank dan Panjar tidak sama.");
					return false;						
				}
				if (parseFloat(this.perPJ) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode panjar.["+this.perPJ+"]");
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
					sql.add("update panjar_m set progress = '2' where no_pj='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ptg_m where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from ptg_j where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					
					sql.add("delete from kas_m where no_kas = '"+this.e_kb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from kas_j where no_kas = '"+this.e_kb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																		
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
		if (this.stsSimpan == 1) this.doClick();		
	},
	doChange:function(sender){
		if (sender == this.cb_buat && this.cb_buat.getText()!="") {
			this.cb_pj.setSQL("select no_pj, keterangan from panjar_m where progress = '2' and nik_pengaju='"+this.cb_buat.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_pj","keterangan"],false,["No Panjar","Keterangan"],"and","Data Panjar",true);			
		}
		if (sender == this.cb_pj && this.cb_pj.getText()!="") {
			var data = this.dbLib.getDataProvider(
					   "select convert(varchar,a.tanggal,103) as tanggal,a.akun_pj,b.nama as nama_pj,a.nilai,a.periode,a.kode_pp,c.nama as nama_pp "+
					   "from panjar_m a inner join masakun b on a.akun_pj=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					   "				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					   "where a.no_pj='"+this.cb_pj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perPJ = line.periode;
					this.dp_d2.setText(line.tanggal);
					this.cb_akunpj.setText(line.akun_pj,line.nama_pj);
					this.cb_pp.setText(line.kode_pp,line.nama_pp);
					this.e_nilaipj.setText(floatToNilai(line.nilai));
				} 
			}
		}
		if (sender == this.e_nilaikb || sender == this.c_jenis) {
			if (this.c_jenis.getText()!="" && this.e_nilaikb.getText()!="") {
				if (nilaiToFloat(this.e_nilaikb.getText()) != 0) this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));
				else this.e_kb.setText("");
			}
		}
	},
	doClick:function(sender){
		try {
			if (this.stsSimpan == 0) {					
				this.sg3.clear(1); this.sg.clear(1); this.sg2.clear(1);
				this.e_nilaikb.setText("0");							
				this.cb_buat.setText("");
				this.cb_pj.setText("");				
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ptg_m","no_ptg",this.app._lokasi+"-PJPTG"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);
		}
		catch(e) {
			alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 5) {
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") tot = tot + nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") tot = tot - nilaiToFloat(this.sg.cells(4,i));
				}
			}
			this.e_nilaiptg.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
			case 4 : 
					if (this.sg.cells(4,row) == "" && row > 0) {
						var sls = nilaiToFloat(this.e_debet.getText()) - nilaiToFloat(this.e_kredit.getText());
						sls = Math.abs(sls); 
						this.sg.setCell(4,row,floatToNilai(sls));
					}
				break;
			case 5 : 
					if ((this.sg.cells(5,row) == "") && (row > 0)) {
						this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					}
				break;
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(5,i) != "-"){
				
				if (this.sg.cells(2,i) == "D") nilai = nilaiToFloat(this.sg.cells(4,i));
				else nilai = nilaiToFloat(this.sg.cells(4,i)) * -1;
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j) && this.sg.cells(5,i) == this.sg2.cells(2,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(1,i),this.sg.cells(5,i),this.sg.cells(6,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(5,idx));
					total = total + nilai;
					this.sg2.setCell(5,idx,total);
				}
			}
		}
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg2NonDRK('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"') as gar ",true);									 
			else var data = this.dbLib.getDataProvider("select fn_cekagg3NonDRK('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);			     			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(4,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(5,i));
				this.sg2.cells(6,i,floatToNilai(sls));
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {
								this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
								this.pc2.hide();   
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg3.clear(1); this.sg.clear(1); this.sg2.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																								
		var strSQL = "select a.no_ptg,a.no_pj,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai from ptg_m a where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and posted='F' and nilai_kas=0 "+
					 "union "+
					 "select a.no_ptg,a.no_pj,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai from ptg_m a inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi where b.no_del='-' and a.nilai_kas<>0 and b.posted = 'F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";	
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
			this.sg3.appendData([line.no_ptg,line.no_pj,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.nik_buat,b.nama as nama_buat,a.nik_setuju,c.nama as nama_setuju,a.nilai as nilai_ptg,abs(a.nilai_kas) as nilai_kas,"+ 
						     " d.no_pj,d.keterangan as ket_pj,convert(varchar,d.tanggal,103) as tgl_pj,d.akun_pj,e.nama as nama_pj,d.nilai as nilai_pj,d.periode as perPJ,d.kode_pp,f.nama as nama_pp, "+
						     " isnull(g.jenis,'-') as jenis,isnull(g.no_kas,'-') as no_kas,isnull(g.akun_kb,'-') as akun_kb,isnull(g.nama_kb,'-') as nama_kb,isnull(g.posted,'-') as posted_kb "+
						     "from ptg_m a "+
						     "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
						     "	inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi "+
						     "  inner join panjar_m d on a.no_pj=d.no_pj and a.kode_lokasi=d.kode_lokasi "+
						     "	inner join masakun e on d.akun_pj=e.kode_akun and d.kode_lokasi=e.kode_lokasi "+
						     "	inner join pp f on d.kode_pp=f.kode_pp and d.kode_lokasi=f.kode_lokasi "+
						     "  left join (select a.no_kas,a.kode_lokasi,a.jenis,a.akun_kb,b.nama as nama_kb,a.posted "+
						     "             from kas_m a inner join masakun b on a.akun_kb=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+						     
						     "            ) g on a.no_kas=g.no_kas and a.kode_lokasi=g.kode_lokasi "+
						     "where a.no_ptg='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.nokas = line.no_kas;
						this.jenis = line.jenis;
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_buat.setText(line.nik_buat,line.nama_buat);
						this.cb_app.setText(line.nik_setuju,line.nama_setuju);
						this.e_nilaiptg.setText(floatToNilai(line.nilai));
						this.e_nilaikb.setText(floatToNilai(line.nilai_kas));
						
						this.cb_pj.setSQL("select no_pj, keterangan from panjar_m where no_pj='"+line.no_pj+"' and kode_lokasi='"+this.app._lokasi+"'",["no_pj","keterangan"],false,["No Panjar","Keterangan"],"and","Data Panjar",true);						
						this.cb_pj.setText(line.no_pj,line.ket_pj);
						this.dp_d2.setText(line.tgl_pj);
						this.cb_akunpj.setText(line.akun_pj,line.nama_pj);
						this.e_nilaipj.setText(floatToNilai(line.nilai_pj));
						this.perPJ = line.perPJ;
						this.cb_pp.setText(line.kode_pp,line.nama_pp);
						this.c_jenis.setText(line.jenis);
						this.e_kb.setText(line.no_kas);
						this.cb_akunkb.setText(line.akun_kb,line.nama_kb);
						if (this.e_nilaikb.getText() != "0") {
							this.nb = this.e_kb.getText();					
							if (line.posted_kb == "T") {
								system.alert(this,"Pertanggungan sudah diposting untuk kasbank-nya.","Unposting untuk no bukti kasbank-nya.");
								setTipeButton(tbAllFalse);
							}
							else setTipeButton(tbUbahHapus);
						}						
					} 
				}
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
							"from ptg_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							
							"where a.jenis = 'BEBAN' and a.no_ptg = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg.clear(1);
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
							"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							
							"where a.no_bukti = '"+this.nb+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='PJPTG' order by a.kode_akun",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
					}
				} else this.sg2.clear(1);			
			}									
		} catch(e) {alert(e);}
	}
});