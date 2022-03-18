/*
	apabila ptg ada nilai kas...yg diposting bukti kas
*/
window.app_saku2_transaksi_kopeg_panjar_fPjptgE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_panjar_fPjptgE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_panjar_fPjptgE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Panjar: Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Pertanggungan", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_app = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pemegang", readOnly:true, tag:1});		
		this.cb_pj = new saiCBBL(this,{bound:[20,17,200,20],caption:"No Panjar",  readOnly:true, tag:1});
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,307], childPage:["Data Panjar","Item Jurnal Pertanggungan","Data Anggaran"]});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal Panjar", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,100,18]}); 		
		this.cb_akunpj = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Akun Panjar", readOnly:true, maxLength:10, tag:2});
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"PP",readOnly:true, maxLength:10, tag:2});
		this.e_nilaipj = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Nilai Panjar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nilaiptg = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Nilai Pertanggungan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.e_nilaikb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Nilai KasBank", tag:9, tipeText:ttNilai, text:"0"});				
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,22,202,20],caption:"Jenis KB",items:["KM","BM","KK","BK"], readOnly:true,tag:9,change:[this,"doChange"]});
		this.e_kb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,23,202,20],caption:"No KasBank",maxLength:30,readOnly:true, tag:9});
		this.cb_akunkb = new saiCBBL(this.pc1.childPage[0],{bound:[20,24,200,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:9});
		this.cb_cf = new saiCBBL(this.pc1.childPage[0],{bound:[20,25,200,20],caption:"CashFlow", multiSelection:false, maxLength:10, tag:9});
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],
					colMaxLength:[[7,5,3,2,0],[10,10,150,1,20]],
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		

		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[875,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);
					
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_jenis.setText("KM");

			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Daftar NIK Approval",true);
			this.cb_akunkb.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						          "where b.kode_flag in ('001','009') and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun KasBank",true);									
			this.cb_cf.setSQL("select kode_cf, nama from neracacf where kode_lokasi='"+this.app._lokasi+"'",["kode_cf","nama"],false,["Kode","Nama"],"and","Daftar Arus Kas",true);
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join neracacf b on a.flag=b.kode_cf and a.kode_lokasi=b.kode_lokasi where kode_spro='PJCF' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_cf.setText(line.flag,line.nama);
			} else this.cb_cf.setText("","");
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
window.app_saku2_transaksi_kopeg_panjar_fPjptgE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_panjar_fPjptgE.implement({
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
			this.e_kb.setText(this.nokas);
			if (this.nokas == "-" && nilaiToFloat(this.e_nilaikb.getText()) != 0) this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.nokas != "-" && nilaiToFloat(this.e_nilaikb.getText()) != 0 && this.jenis != this.c_jenis.getText()) this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","000"));
			if (nilaiToFloat(this.e_nilaikb.getText()) == 0) this.e_kb.setText("-");
			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("delete from kas_m where no_kas = '"+this.nokas+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.nokas+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ptg_m where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ptg_j where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.nb+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (nilaiToFloat(this.e_nilaikb.getText()) != 0) var posted = "X"; else var posted = "F";
					//-------------------------------------------------- modul ptg
					sql.add("insert into ptg_m (no_ptg,no_pj,no_kas,no_dokumen,tanggal,keterangan,catatan,kode_curr,kurs,akun_pj,akun_kas,nik_buat,nik_setuju,kode_lokasi,kode_pp,modul,nilai,nilai_kas,kode_drk,progress,posted,periode,no_del,no_link,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_pj.getText()+"','"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','IDR',1,'"+this.cb_akunpj.getText()+"','"+this.cb_akunkb.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','PJPTG',"+parseNilai(this.e_nilaiptg.getText())+","+parseNilai(this.e_nilaikb.getText())+",'-','2','"+posted+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate())");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into ptg_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(7,i)+"','"+this.app._lokasi+"','PJPTG','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
							}
						}
					}
					if (nilaiToFloat(this.e_nilaikb.getText()) != 0) {
						if (this.c_jenis.getText() == "KK" || this.c_jenis.getText() == "BK") var DC = "C"; else var DC = "D"; 
						sql.add("insert into ptg_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',98,'"+this.cb_akunkb.getText()+"','"+this.e_ket.getText()+"','"+DC+"',"+parseNilai(this.e_nilaikb.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PJPTG','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}
					sql.add("insert into ptg_j(no_ptg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.cb_akunpj.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilaipj.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PJPTG','PJ','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");								
					//--------------------------------------------------- modul kb
					if (nilaiToFloat(this.e_nilaikb.getText()) != 0) {
						this.nb = this.e_kb.getText();
						sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
								"('"+this.e_kb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.cb_akunkb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','KBPTG','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilaikb.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_cf.getText()+"','"+this.e_nb.getText()+"','-')");
						if (this.sg.getRowValidCount() > 0){
							for (var i=0;i < this.sg.getRowCount();i++){
								if (this.sg.rowValid(i)){
									sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
											"	('"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(7,i)+"','-','-','"+this.app._lokasi+"','KBPTG','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
								}
							}
						}
						if (this.c_jenis.getText() == "KK" || this.c_jenis.getText() == "BK") var DC = "C"; else var DC = "D"; 
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
								"	('"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',98,'"+this.cb_akunkb.getText()+"','"+this.e_ket.getText()+"','"+DC+"',"+parseNilai(this.e_nilaikb.getText())+",'"+this.cb_pp.getText()+"','-','"+this.cb_cf.getText()+"','-','"+this.app._lokasi+"','KBPTG','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
								"	('"+this.e_kb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.cb_akunpj.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilaipj.getText())+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','KBPTG','PJ','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
					} else this.nb = this.e_nb.getText();
					//--------------------------------------------------- real gar
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(7,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(7,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(7,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"	('"+this.nb+"','PJPTG','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
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
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :
				if (this.flagDokFree == "1" && this.e_dok.getText()!= "-") {
					var data = this.dbLib.getDataProvider("select no_kas from kas_m where no_dokumen='"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_kas<>'"+this.e_kb.getText()+"' ",true);
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
					this.cb_cf.setTag("0");
					if (this.c_jenis.getText()=="-" || this.cb_akunkb.getText()=="-" || this.cb_cf.getText()=="-") {
						system.alert(this,"Transaksi tidak valid.","Lengkapi data-data kasbank.");
						return false;
					}
				} else {
					this.e_nilaikb.setTag("9");
					this.c_jenis.setTag("9");
					this.e_kb.setTag("9");
					this.cb_akunkb.setTag("9");
					this.cb_cf.setTag("9");
				}				
				this.doHitungGar();
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (nilaiToFloat(this.sg2.cells(7,i))>0 && nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
							return false;						
						}
					}
				}
				if (this.c_jenis.getText() == "KK" || this.c_jenis.getText() == "BK") var nilaikb = nilaiToFloat(this.e_nilaikb.getText()) * -1; 
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kas_m where no_kas = '"+this.nokas+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.nokas+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ptg_m where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ptg_j where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.nb+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update panjar_m set progress = '2' where no_pj='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select a.no_ptg, a.keterangan from ptg_m a where a.nilai_kas=0 and a.posted = 'F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							  "union "+
			                  "select a.no_ptg, a.keterangan from ptg_m a inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi where b.no_del='-' and a.nilai_kas<>0 and b.posted = 'F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",["a.no_ptg","a.keterangan"],false,["No PTG","Deskripsi"],"and","Daftar Bukti PJPTG",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			this.nb = this.e_nb.getText();
			var data = this.dbLib.getDataProvider(
					   "select a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.nik_buat,b.nama as nama_buat,a.nik_setuju,c.nama as nama_setuju,a.nilai as nilai_ptg,abs(a.nilai_kas) as nilai_kas,"+ 
					   " d.no_pj,d.keterangan as ket_pj,convert(varchar,d.tanggal,103) as tgl_pj,d.akun_pj,e.nama as nama_pj,d.nilai as nilai_pj,d.periode as perPJ,d.kode_pp,f.nama as nama_pp, "+
					   " isnull(g.jenis,'-') as jenis,isnull(g.no_kas,'-') as no_kas,isnull(g.akun_kb,'-') as akun_kb,isnull(g.nama_kb,'-') as nama_kb,isnull(g.kode_cf,'-') as kode_cf,isnull(g.nama_cf,'-') as nama_cf, isnull(g.posted,'-') as posted_kb "+
			           "from ptg_m a "+
			           "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
			           "	inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi "+
					   "    inner join panjar_m d on a.no_pj=d.no_pj and a.kode_lokasi=d.kode_lokasi "+
					   "	inner join masakun e on d.akun_pj=e.kode_akun and d.kode_lokasi=e.kode_lokasi "+
					   "	inner join pp f on d.kode_pp=f.kode_pp and d.kode_lokasi=f.kode_lokasi "+
					   "    left join (select a.no_kas,a.kode_lokasi,a.jenis,a.akun_kb,b.nama as nama_kb,a.no_link as kode_cf,c.nama as nama_cf,a.posted "+
					   "               from kas_m a inner join masakun b on a.akun_kb=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					   "					        inner join neracacf c on a.no_link=c.kode_cf and a.kode_lokasi=c.kode_lokasi "+
					   ") g on a.no_kas=g.no_kas and a.kode_lokasi=g.kode_lokasi "+
					   "where a.no_ptg='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
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
					
					this.cb_pj.setText(line.no_pj,line.ket_pj);
					this.dp_d2.setText(line.tgl_pj);
					this.cb_akunpj.setText(line.akun_pj,line.nama_pj);
					this.e_nilaipj.setText(floatToNilai(line.nilai_pj));
					this.perPJ = line.perPJ;
					this.cb_pp.setText(line.kode_pp,line.nama_pp);
					this.c_jenis.setText(line.jenis);
					this.e_kb.setText(line.no_kas);
					this.cb_akunkb.setText(line.akun_kb,line.nama_kb);
					this.cb_cf.setText(line.kode_cf,line.nama_cf);
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
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from ptg_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"             left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.jenis = 'BEBAN' and a.no_ptg = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			} else this.sg.clear(1);
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
						"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"              left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.no_bukti = '"+this.nb+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='PJPTG' order by a.kode_akun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
				}
			} else this.sg2.clear(1);			
		}		
		if (sender == this.e_nilaikb || sender == this.c_jenis) {
			if (this.c_jenis.getText()!="" && this.e_nilaikb.getText()!="") {
				if (nilaiToFloat(this.e_nilaikb.getText()) != 0) this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","000"));
				else this.e_kb.setText("");
			}
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
				//sender.cells(7,row,"");
				//sender.cells(8,row,"");
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
				//sender.cells(7,row,"");
				//sender.cells(8,row,"");
			}
		}
		if (col == 7) {
			if (sender.cells(7,row) != "") {
				var isAda = false;
				var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.jml != 0) isAda = true;
					} 
				}
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and b.kode_drk = '"+sender.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) sender.cells(8,row,line.nama);
					else {
						if (!isAda) sender.cells(8,row,"-");
						else {
							sender.cells(7,row,"");
							sender.cells(8,row,"");
						}
					}
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
				if (col == 7){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  ["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
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
			if (this.sg.rowValid(i) && this.sg.cells(5,i) != "-" && this.sg.cells(7,i)!= "-"){
				
				if (this.sg.cells(2,i) == "D") nilai = nilaiToFloat(this.sg.cells(4,i));
				else nilai = nilaiToFloat(this.sg.cells(4,i)) * -1;
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j) && this.sg.cells(5,i) == this.sg2.cells(2,j) && this.sg.cells(7,i) == this.sg2.cells(4,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(1,i),this.sg.cells(5,i),this.sg.cells(6,i),this.sg.cells(7,i),this.sg.cells(8,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(7,idx));
					total = total + nilai;
					this.sg2.setCell(7,idx,total);
				}
			}
		}
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.nb+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(6,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(7,i));
				this.sg2.cells(8,i,floatToNilai(sls));
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});