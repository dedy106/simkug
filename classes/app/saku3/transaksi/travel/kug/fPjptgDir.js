window.app_saku3_transaksi_travel_kug_fPjptgDir = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_kug_fPjptgDir.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_kug_fPjptgDir";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Panjar", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:3,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi"],
								colWidth:[[2,1,0],[500,80,100]],readOnly:true,
								dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Pertanggungan",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"NIK Pemegang", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.cb_pj = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"No Panjar", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,293], childPage:["Data Panjar","Item Jurnal Pertanggungan"]});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal Panjar", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18]}); 		
		this.cb_akunpj = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Akun Panjar", readOnly:true, maxLength:10, tag:2});
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"PP",readOnly:true, maxLength:10, tag:2});
		this.e_nilaipj = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Nilai Panjar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nilaiptg = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Nilai Pertanggungan", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_nilaikb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Nilai KasBank", tag:9, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.c_jenis = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,22,200,20],caption:"Jenis KB",readOnly:true, tag:9});
		this.e_kb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,23,200,20],caption:"No KasBank",maxLength:30,readOnly:true, tag:9});
		this.cb_akunkb = new saiCBBL(this.pc1.childPage[0],{bound:[20,24,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:9});
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
								colWidth:[[6,5,4,3,2,1,0],[150,80,100,300,50,180,80]],
								columnReadOnly:[true,[1,6],[0,2,3,4,5]],
								buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
								colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
								cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
								autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		

		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 22);
					
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();
		
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_jenis.setText("BM");
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Daftar NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Daftar NIK Approval",true);
			this.cb_akunkb.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						          			"where b.kode_flag in ('001','009') and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun KasBank",true);									
									
			var sql = new server_util_arrayList();
			sql.add("select kode_akun,nama from masakun where block='0' and kode_lokasi = '"+this.app._lokasi+"' ");									
			sql.add("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' ");									
			this.dbLib.getMultiDataProviderA(sql);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_kug_fPjptgDir.extend(window.childForm);
window.app_saku3_transaksi_travel_kug_fPjptgDir.implement({
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
			if (nilaiToFloat(this.e_nilaikb.getText()) != 0) this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));
			else this.e_kb.setText("-"); 
			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();								
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from ptg_m where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update panjar_m set progress = '2' where no_pj='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("update panjar_m set progress = '3' where no_pj='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into ptg_m (no_ptg,no_pj,no_kas,no_dokumen,tanggal,keterangan,catatan,kode_curr,kurs,akun_pj,akun_kas,nik_buat,nik_setuju,kode_lokasi,kode_pp,modul,nilai,nilai_kas,kode_drk,progress,posted,periode,no_del,no_link,nik_user,tgl_input) values "+					
							"('"+this.e_nb.getText()+"','"+this.cb_pj.getText()+"','"+this.e_kb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','IDR',1,'"+this.cb_akunpj.getText()+"','"+this.cb_akunkb.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','PJPTG',"+parseNilai(this.e_nilaiptg.getText())+","+parseNilai(this.e_nilaikb.getText())+",'-','2','X','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate())");
					
					if (nilaiToFloat(this.e_nilaikb.getText()) != 0) this.nbJurnal = this.e_kb.getText();
					else  this.nbJurnal = this.e_nb.getText();

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
									"('"+this.nbJurnal+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','PTGDIR','F','-','-','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_pj.getText()+"','"+this.e_ket.getText()+"','IDR',1,"+
									parseNilai(this.e_nilaiptg.getText())+","+parseNilai(this.e_nilaikb.getText())+",0,'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','-','"+this.e_nb.getText()+"','"+this.e_kb.getText()+"','-','"+this.cb_akunkb.getText()+"','"+this.cb_akunpj.getText()+"','"+this.c_jenis.getText()+"')");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
												"('"+this.nbJurnal+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg.cells(4,i))+","+
												parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(3,i)+"','KB','BEBAN','IDR',1,'"+this.sg.cells(5,i)+"','-','-','-','-','-','-','-','-')");										
							}
						}
					}
					
					if (nilaiToFloat(this.e_nilaikb.getText()) != 0) {
						if (this.c_jenis.getText() == "BK") var DC = "C"; else var DC = "D"; 
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.nbJurnal+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',98,'"+this.cb_akunkb.getText()+"','"+DC+"',"+Math.abs(parseNilai(this.e_nilaikb.getText()))+","+
									Math.abs(parseNilai(this.e_nilaikb.getText()))+",'"+this.e_ket.getText()+"','KB','KAS','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");							
					}

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
									"('"+this.nbJurnal+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',99,'"+this.cb_akunpj.getText()+"','C',"+parseNilai(this.e_nilaipj.getText())+","+
									parseNilai(this.e_nilaipj.getText())+",'"+this.e_ket.getText()+"','KB','PJ','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");							

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
					this.sg.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				break;
			case "simpan" :					
			case "ubah" :	
				this.preView = "1";
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
				
				if (nilaiToFloat(this.e_nilaipj.getText()) != nilaiToFloat(this.e_nilaiptg.getText())+nilaiToFloat(this.e_nilaikb.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Pertanggungan,KasBank dan Panjar tidak balance.");
					return false;						
				}
				if (parseFloat(this.perPJ) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode panjar.["+this.perPJ+"]");
					return false;
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from ptg_m where no_ptg = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update panjar_m set progress = '2' where no_pj='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) this.doClick();
		this.e_kb.setText("");
	},
	doChange:function(sender){
		if (sender == this.cb_buat && this.cb_buat.getText()!="" && this.stsSimpan==1) 
			this.cb_pj.setSQL("select no_pj, keterangan from panjar_m where progress = '2' and nik_pengaju='"+this.cb_buat.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_pj","keterangan"],false,["No Panjar","Keterangan"],"and","Data Panjar",true);

		if (sender == this.cb_pj && this.cb_pj.getText()!="") {
			var data = this.dbLib.getDataProvider(
					   "select convert(varchar,a.tanggal,103) as tanggal,a.akun_pj,b.nama as nama_pj,a.nilai,a.periode,a.kode_pp,c.nama as nama_pp "+
					   "from panjar_m a inner join masakun b on a.akun_pj=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					   "								inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
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

		if (sender == this.e_nilaiptg) {
			var nilai = nilaiToFloat(this.e_nilaipj.getText()) - nilaiToFloat(this.e_nilaiptg.getText());
			this.e_nilaikb.setText(floatToNilai(nilai));
			
			if (nilai > 0) this.c_jenis.setText("BM");
			else this.c_jenis.setText("BK");
			
			if (this.c_jenis.getText()!="" && this.e_nilaikb.getText()!="") {
				if (nilaiToFloat(this.e_nilaikb.getText()) != 0) {
					if (this.stsSimpan == 1) this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));
				}
				else this.e_kb.setText("");
			}
		}

	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg.clear(1); 
		}
		this.stsSimpan = 1;
		setTipeButton(tbSimpan);
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ptg_m","no_ptg",this.app._lokasi+"-PTG"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
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
			case 2 : 
					if (this.sg.cells(2,row) == ""){
						if (row == 0) this.sg.setCell(2,row,"D");
						else this.sg.setCell(2,row,this.sg.cells(2,(row-1)) );
					}
				break;
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
					if ((this.sg.cells(5,row) == "") && (row == 0)) {
						this.sg.setCell(5,row,this.app._kodePP);
						this.sg.setCell(6,row,this.app._namaPP);
					}
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
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1) {
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_tpcc_kb_rptKbPjPtg";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ptg='"+this.e_nb.getText()+"' ";
								this.filter2 = this.filter+"/"+this.e_periode.getText()+"/Transaksi";
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
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.nbJurnal+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();														
							this.dataPP = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];									
									this.dataPP.set(line.kode_pp, line.nama);										
								}								
							}							
						}else throw result;
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				this.pc2.show();
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),undefined);
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.sg3.clear(1);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
		             "from trans_m a "+					 					 
					 			 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form = 'PTGDIR' and a.posted ='F'";		
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.keterangan]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var data = this.dbLib.getDataProvider(
						   "select a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.nik_buat,b.nama as nama_buat,a.nik_setuju,c.nama as nama_setuju,a.nilai as nilai_ptg,abs(a.nilai_kas) as nilai_kas,"+ 
						   " 			 d.no_pj,d.keterangan as ket_pj,convert(varchar,d.tanggal,103) as tgl_pj,d.akun_pj,e.nama as nama_pj,d.nilai as nilai_pj,d.periode as perPJ,d.kode_pp,f.nama as nama_pp, "+
						   " 			 isnull(g.param3,'-') as jenis,isnull(g.no_ref2,'-') as no_kas,isnull(g.param1,'-') as akun_kb "+
							 "from ptg_m a "+
							 "	inner join trans_m g on a.no_ptg=g.no_ref1 and a.kode_lokasi=g.kode_lokasi "+
						   "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
						   "	inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi "+
						   "  inner join panjar_m d on a.no_pj=d.no_pj and a.kode_lokasi=d.kode_lokasi "+
						   "	inner join masakun e on g.param2=e.kode_akun and g.kode_lokasi=e.kode_lokasi "+
							 "	inner join pp f on d.kode_pp=f.kode_pp and d.kode_lokasi=f.kode_lokasi "+										 
							 "where g.no_bukti='"+this.e_nb.getText()+"' and g.kode_lokasi='"+this.app._lokasi+"'",true);
							 

				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.nokas = line.no_kas;
						this.jenis = line.jenis;

						this.dp_d1.setText(line.tanggal);						
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
						this.cb_akunkb.setText(line.akun_kb);												

						setTipeButton(tbUbahHapus);
					} 
				}
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
							"from trans_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							
							"where a.jenis = 'BEBAN' and a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg.clear(1);		
				this.sg.validasi();		
			}									
		} catch(e) {alert(e);}
	}	
});
