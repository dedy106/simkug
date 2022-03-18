window.app_saku3_transaksi_siaga_fKbBeban = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_fKbBeban.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_fKbBeban";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank SPB", 0);	
		uses("rowGrid",true);
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Pembayaran","List Pembayaran","Filter Cari"]});		
		this.sg5 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,490,180,80,120]],colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn5 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg5,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn5,{bound:[this.sgn5.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Jenis",items:["CK","BK"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_cabang = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Cabang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.cb_bank = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Kas/Bank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[245,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.cb_spb = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,240,20],caption:"No SPB", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});					
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});
		this.e_atensi = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Atensi", readOnly:true});						
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[760,14,210,20],caption:"Total Debet (IDR)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.c_curr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,160,20],caption:"Mt Uang - Kurs", tag:0, readOnly:true, text:"IDR",change:[this,"doChange"]});				
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[190,19,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"]});				
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[760,19,210,20],caption:"Total Kredit (IDR)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.e_nilaiCurr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,20,220,20],caption:"Nilai Curr", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_sls = new saiLabelEdit(this.pc2.childPage[0],{bound:[760,20,210,20],caption:"Selisih (IDR)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,185], childPage:["Item KasBank","Jurnal Tambahan","Item Permintaan","Data Anggaran","NoBukti Baru"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Nilai IDR"],
					colWidth:[[5,4,3,2,1,0],[100,100,350,60,250,80]],					
					columnReadOnly:[true,[1,5],[0,2,3,4]],
					buttonStyle:[[0,2],[bsEllips,bsAuto]], 
					colFormat:[[4,5],[cfNilai,cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai IDR"],
					colWidth:[[4,3,2,1,0],[100,350,60,250,80]],					
					columnReadOnly:[true,[1],[0,2,3,4]],
					buttonStyle:[[0,2],[bsEllips,bsAuto]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					ellipsClick:[this,"doEllipsClick4"],change:[this,"doChangeCell4"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});				
		
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Nilai IDR","Kode PP","Nama PP","Jenis"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[60,100,50,100,100,250,40,150,80]],					
					readOnly:true,colFormat:[[4,5],[cfNilai,cfNilai]],nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});					
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});
		
		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[4,3,2,1,0],[100,100,100,500,100]],
					readOnly:true,colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Budget",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		
		
		
		this.cb2 = new portalui_checkBox(this.pc1.childPage[4],{bound:[20,10,100,25],caption:"Ubah No Bukti",selected:false});
		this.c_jenis2 = new saiCB(this.pc1.childPage[4],{bound:[20,12,200,20],caption:"Jenis",items:["CK","BK"], readOnly:true,tag:4,change:[this,"doChange2"]});
		this.e_cabang2 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,13,180,20],caption:"Cabang", readOnly:true, text:"",tag:4,change:[this,"doChange2"]});						
		this.cb_bank2 = new saiCBBL(this.pc1.childPage[4],{bound:[20,14,200,20],caption:"Kas/Bank", multiSelection:false, maxLength:10,tag:4,change:[this,"doChange2"]});			
		this.e_bulan = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,13,180,20],caption:"Periode", readOnly:true, text:"",change:[this,"doChange2"],tag:4});						
		this.e_nu = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,14,180,20],caption:"No Urut", maxLength:3, text:"0",change:[this,"doChange2"],tipeText:ttNilai,tag:4});
		this.e_nb2 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,16,220,20],caption:"No Bukti Baru", readOnly:true,tag:4});								
		

		this.cb_bukti = new saiCBBL(this.pc2.childPage[2],{bound:[20,13,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:9});
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});						
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc2.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[4].rearrangeChild(10, 23);	

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_jenis.setText("CK");
						
			this.cb_cabang.setSQL("select kode_cabang, nama from gr_cabang where kode_lokasi='"+this.app._lokasi+"'",["kode_cabang","nama"],false,["Kode","Nama"],"and","Data Cabang",true);
			this.cb_bank.setSQL("select kode_bank, nama from gr_bank where kode_lokasi='"+this.app._lokasi+"'",["kode_bank","nama"],false,["Kode","Nama"],"and","Data Bank",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			this.cb_bank.setText("KAS");
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}				
			var data = this.dbLib.getDataProvider("select a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_cabang.setText(line.kode_cabang,line.nama);
			} else this.cb_cabang.setText("","");								
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_fKbBeban.extend(window.childForm);
window.app_saku3_transaksi_siaga_fKbBeban.implement({
	doLoadBuktiCari : function() {
		var strSQL = "select a.no_kas,a.keterangan "+
		             "from kas_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.modul='KBBEBAN'";		
		this.cb_bukti.setSQL(strSQL,["no_kas","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);			
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
					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 
						sql.add("update gr_spb2_m set no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					}
					
					this.nb = this.e_nb.getText();
					if (this.cb2.isSelected()) {
						this.nb = this.e_nb2.getText();
						this.c_jenis.setText(this.c_jenis2.getText());
						this.cb_bank.setText(this.cb_bank.getText(),this.cb_bank.rightLabelCaption);
					}
					
					
					sql.add("update gr_spb2_m set no_kas='"+this.nb+"' where no_spb='"+this.cb_spb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.nb+"','"+this.app._lokasi+"','-','-','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_cabang.getText()+"','KBBEBAN','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"','"+parseNilai(this.e_kurs.getText())+"',"+this.nilaiKB+",'"+this.cb_buat.getText()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_spb.getText()+"','"+this.e_atensi.getText()+"','"+this.cb_bank.getText()+"')");
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){							
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"('"+this.nb+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg3.cells(0,i)+"','"+this.sg3.cells(3,i)+"','"+this.sg3.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg3.cells(5,i))+",'"+this.sg3.cells(6,i)+"','-','-','"+this.e_atensi.getText()+"','"+this.app._lokasi+"','KBBEBAN','BEBAN','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg3.cells(4,i))+")");
							}
						}
					}
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){							
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"('"+this.nb+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg4.cells(0,i)+"','"+this.sg4.cells(3,i)+"','"+this.sg4.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg4.cells(4,i))+",'"+this.app._kodePP+"','-','-','"+this.e_atensi.getText()+"','"+this.app._lokasi+"','KBBEBAN','TAMBAH','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg4.cells(4,i))+")");
							}
						}
					}
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){							
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"('"+this.nb+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg.cells(5,i))+",'"+this.app._kodePP+"','-','-','"+this.e_atensi.getText()+"','"+this.app._lokasi+"','KBBEBAN','KB','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'"+this.cb_bank.getText()+"',"+nilaiToFloat(this.sg.cells(4,i))+")");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1); this.sg5.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.c_curr.setText("IDR");
					setTipeButton(tbSimpan);
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
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
				} 
				this.nilaiKB=0;
				var akunKB = false;
				var k=0;
				for (var j=0;j < this.sg.getRowCount();j++){
					if (this.sg.rowValid(j)){
						for (var i=0;i<this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.kode_akun == this.sg.cells(0,j)) {
								akunKB = true;								
								if (this.c_jenis.getText().substr(1,1)=="D" && this.sg.cells(2,j)=="D") {
									this.nilaiKB += nilaiToFloat(this.sg.cells(4,j));
								}
								if (this.c_jenis.getText().substr(1,1)=="K" && this.sg.cells(2,j)=="C") {
									this.nilaiKB += nilaiToFloat(this.sg.cells(4,j));
								}
							}
						}
					}
				}
				if (!akunKB) {
					system.alert(this,"Transaksi tidak valid.","Akun KasBank tidak ditemukan");
					return false;						
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				
				//jurnal harus sama dengan nilai curr awal
				/*
				if (nilaiToFloat(this.e_nilaiCurr.getText()) != this.totCurr) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit (curr) tidak sama dengan Nilai Curr.");
					return false;						
				}
				*/	
				
				this.dataAkunGar = {rs:{rows:[]}};	
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}
				this.doHitungGar();
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg2.getRowCount();i++){
						for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
							var line = this.dataAkunGar.rs.rows[j];
							if (line.kode_akun == this.sg2.cells(0,i)) {		
								if (nilaiToFloat(this.sg2.cells(3,i))>0 && nilaiToFloat(this.sg2.cells(2,i)) < nilaiToFloat(this.sg2.cells(3,i))) {
									var k =i+1;
									system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
									return false;						
								}							
							}
						}
					}
				}			
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Kurs,Total Debet atau Kredit tidak boleh nol atau kurang.");
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
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); 
					sql.add("update gr_spb2_m set no_kas='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);
			if (m=="01") this.Aperiode = "A";
			if (m=="02") this.Aperiode = "B";
			if (m=="03") this.Aperiode = "C";
			if (m=="04") this.Aperiode = "D";
			if (m=="05") this.Aperiode = "E";
			if (m=="06") this.Aperiode = "F";
			if (m=="07") this.Aperiode = "G";
			if (m=="08") this.Aperiode = "H";
			if (m=="09") this.Aperiode = "I";
			if (m=="10") this.Aperiode = "J";
			if (m=="11") this.Aperiode = "K";
			if (m=="12") this.Aperiode = "L";			
		}
		else {
			this.e_periode.setText(this.app._periode);		
			if (m=="13") this.Aperiode = "M";			
			if (m=="14") this.Aperiode = "N";			
			if (m=="15") this.Aperiode = "O";			
			if (m=="16") this.Aperiode = "P";						
		}
		if (this.stsSimpan == 1) this.doClick();
		this.doChange(this.c_curr);

		this.doLoadBuktiCari();
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="" && this.stsSimpan == 1) {
			this.cb_spb.setSQL("select no_spb, keterangan from gr_spb2_m where sts_spb2 is null and progress is null and no_kas='-' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spb","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar SPB",true);
		}
		if (sender == this.c_jenis || sender == this.cb_cabang || sender == this.cb_bank) {
			if (this.stsSimpan == 1) this.doClick();				
		}								
		if (sender == this.cb_spb && this.cb_spb.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.nama,a.keterangan,a.kode_curr,a.nilai  "+
			           "from gr_spb2_m a where a.no_spb='"+this.cb_spb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_ket.setText(line.keterangan);
					this.e_atensi.setText(line.nama);
					this.c_curr.setText(line.kode_curr);
					this.e_nilaiCurr.setText(floatToNilai(line.nilai));					
					this.nilaiCurrAwal = line.nilai;
					if (this.c_curr.getText() == "IDR") this.e_kurs.setReadOnly(true); 					
					else this.e_kurs.setReadOnly(false); 
				} 
			}		
				
			var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.nilai_curr,a.kode_pp,c.nama as nama_pp,isnull(x.kode_flag,'-') as jenis "+
						"from gr_beban_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+								
						"                  inner join gr_beban_m z on a.no_beban=z.no_beban and a.kode_lokasi=z.kode_lokasi "+
						"                  left join flag_relasi x on b.kode_akun=x.kode_akun and b.kode_lokasi=x.kode_lokasi and x.kode_flag='029' "+
						"where z.no_spb = '"+this.cb_spb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_beban,a.dc desc",true);
						
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];		
					this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.jenis]);
				}
			} else this.sg3.clear(1);									
			this.sg3.validasi();		
		}					
		if (sender == this.e_kurs) {
			this.sg.validasi();
		}
		if (sender == this.c_curr && this.stsSimpan == 1) {
			if (this.c_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); this.e_kurs.setText("1"); this.sg.validasi();
			}
			else {
				var strSQL = "select kurs from gr_kurs where kode_curr ='"+this.c_curr.getText()+"' and ('"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir) ";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.e_kurs.setText(floatToNilai(line.kurs));
					else this.e_kurs.setText("0");					
				}
				this.e_kurs.setReadOnly(false); this.sg.validasi();
			}
		}
	},	
	doChange2:function(sender){									
		var idx = parseFloat(this.e_nu.getText());
		idx = idx.toString();
		if (idx.length == 1) var nu = "00"+idx;
		if (idx.length == 2) var nu = "0"+idx;
		if (idx.length == 3) var nu = idx;						
		this.e_nb2.setText(this.c_jenis2.getText() + nu + "/" + this.e_bulan.getText() + "/" + this.e_periode.getText().substr(2,2) + "/" + this.e_cabang2.getText() +"/" +this.cb_bank2.getText());
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1); this.sg5.clear(1); 
			this.cb_spb.setSQL("select no_spb, keterangan from gr_spb2_m where no_kas='-' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spb","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar SPB",true);
		}
		this.stsSimpan = 1;
		if (this.c_jenis.getText()!= "" && this.cb_cabang.getText()!= "" && this.cb_bank.getText()!= "") {			
			var AddFormat = "/"+this.Aperiode+"/"+this.e_periode.getText().substr(2,2)+"/"+this.cb_cabang.getText()+"/";			
			var data = this.dbLib.getDataProvider("select isnull(max(substring(no_kas,3,20)),0) as no_kas from kas_m where no_kas like '_____"+AddFormat+"%"+this.cb_bank.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_kas == "0") this.e_nb.setText(this.c_jenis.getText()+"001"+AddFormat+this.cb_bank.getText());
					else {
						var idx = parseFloat(line.no_kas.substr(0,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText(this.c_jenis.getText()+nu+AddFormat+this.cb_bank.getText());
					}
				} 
			}
			this.e_ket.setFocus();
		}
	},
	doChangeCell: function(sender, col, row){		
		if (col == 2 || col == 4) {			
			if (this.sg.cells(2,row) != "" && this.sg.cells(4,row) != "" && this.e_kurs.getText() != "") {				
				this.sg.cells(5,row,Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg.cells(4,row))));
				this.sg.validasi();			
			}
		}		
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
		sender.onChange.set(this,"doChangeCell");			
	},
	doChangeCell4: function(sender, col, row){					
		if (col == 2 || col == 4) {			
			if (this.sg4.cells(2,row) != "" && this.sg4.cells(4,row) != "") {								
				this.sg.validasi();			
			}
		}
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
		sender.onChange.set(this,"doChangeCell4");			
	},
	doNilaiChange: function(){
		try{
			this.totCurr = 0;
			var totD = totC = 0;
			for (var i = 0; i < this.sg3.rows.getLength();i++){
				if (this.sg3.rowValid(i) && this.sg3.cells(4,i) != "" && this.e_kurs.getText() != ""){
					if (this.sg3.cells(8,i) != "029") this.sg3.cells(5,i,floatToNilai(Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg3.cells(4,i)))));					
					
					if (this.sg3.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg3.cells(5,i));
					if (this.sg3.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg3.cells(5,i));
				}
			}			
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != "" && this.e_kurs.getText() != ""){
					this.sg.cells(5,i,floatToNilai(Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg.cells(4,i)))));					
					if (this.sg.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg.cells(5,i));						
					if (this.sg.cells(2,i).toUpperCase() == "C") {
						totC += nilaiToFloat(this.sg.cells(5,i));
						this.totCurr += nilaiToFloat(this.sg.cells(4,i));
					}
				}
			}
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(4,i) != ""){					
					if (this.sg4.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg4.cells(4,i));						
					if (this.sg4.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg4.cells(4,i));						
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
			var sls = totD - totC;
			this.e_sls.setText(floatToNilai(sls));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg.cells(2,row) == ""){
						this.sg.setCell(2,row,"C");						
					}
				break;
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0)
						{
							this.sg.setCell(3,row,this.e_ket.getText());
							this.sg.setCell(4,row,floatToNilai(this.nilaiCurrAwal));							
						}
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
			case 6 : 
					if ((this.sg.cells(6,row) == "") && (row > 0)) {
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
						this.sg.setCell(7,row,this.sg.cells(7,(row-1)));
					}
					else {
						this.sg.setCell(6,row,this.app._kodePP);
						this.sg.setCell(7,row,this.app._namaPP);
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
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}						
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg4.getRowCount();i++){
			if (this.sg4.rowValid(i) && this.sg4.cells(2,i) != "-"){				
				if (this.sg4.cells(2,i) == "D") nilai = nilaiToFloat(this.sg4.cells(4,i));
				else nilai = nilaiToFloat(this.sg4.cells(4,i)) * -1;				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg4.cells(0,i) == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg4.cells(0,i),this.sg4.cells(1,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(3,idx));
					total = total + nilai;
					this.sg2.setCell(3,idx,total);
				}
			}
		}
		
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg7('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg8('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(2,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(3,i));
				this.sg2.cells(4,i,floatToNilai(sls));
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
								this.nama_report="server_report_saku2_siaga_rptBuktiBank";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.nb+"' ";
								this.filter2 = this.app._namaUser;
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1); this.sg5.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			setTipeButton(tbSimpan);
			this.c_curr.setText("IDR");
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_link as no_dokumen,a.keterangan,a.nilai "+
		             "from kas_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.modul='KBBEBAN' order by a.no_kas";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn5.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn5.rearrange();
			this.doTampilData3(1);
		} else this.sg5.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg5.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg5.appendData([line.no_kas,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg5.setNoUrut(start);
		this.page3 = 0;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
		this.page3 = page - 1;
	},
	doCari:function(sender){	
		this.pc2.setActivePage(this.pc2.childPage[1]);																		
		var strSQL = "select no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_link as no_dokumen,a.keterangan,a.nilai "+
		             "from kas_m a "+					 					 
					 "where a.no_kas='"+this.cb_bukti.getText()+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.modul='KBBEBAN' order by a.no_kas";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg5.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;		
				
				//var baris = (this.page3 * 20) + row; 		
				//this.e_nb.setText(this.sg5.cells(0,baris));								
				this.e_nb.setText(this.sg5.cells(0,row));
				
				this.cb_spb.setSQL("select no_spb, keterangan from gr_spb2_m where no_kas='"+this.e_nb.getText()+"' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spb","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar SPB",true);
								
				var data = this.dbLib.getDataProvider("select a.no_spb,a.nama,a.keterangan,a.kode_curr,a.nilai  "+
						   "from gr_spb2_m a where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.cb_spb.setText(line.no_spb,line.keterangan);
						this.e_atensi.setText(line.nama);
						this.c_curr.setText(line.kode_curr);
						this.e_nilaiCurr.setText(floatToNilai(line.nilai));					
						if (this.c_curr.getText() == "IDR") this.e_kurs.setReadOnly(true); 					
						else this.e_kurs.setReadOnly(false); 
					} 
				}
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.nilai_curr,a.kode_pp,c.nama as nama_pp,isnull(x.kode_flag,'-') as jenis  "+
							"from gr_beban_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+								
							"                  inner join gr_beban_m z on a.no_beban=z.no_beban and a.kode_lokasi=z.kode_lokasi "+
							"                  left join flag_relasi x on b.kode_akun=x.kode_akun and b.kode_lokasi=x.kode_lokasi "+
							"where z.no_spb = '"+this.cb_spb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_beban,a.dc desc ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.jenis]);
					}
				} else this.sg3.clear(1);									
				this.sg3.validasi();	
						
				var data = this.dbLib.getDataProvider("select a.tanggal,a.periode,a.keterangan,a.jenis,a.nik_buat,b.nama as nama_buat,a.kode_pp,c.nama as nama_cab,a.kode_bank,d.nama as nama_bank,a.kode_curr,a.kurs,a.ref1 "+
						   "from kas_m a "+
						   "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
						   "	inner join gr_cabang c on a.kode_pp=c.kode_cabang and a.kode_lokasi=c.kode_lokasi "+
						   "	inner join gr_bank d on a.kode_bank=d.kode_bank and a.kode_lokasi=d.kode_lokasi "+
						   "where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);
						this.c_jenis.setText(line.jenis);					
						this.cb_cabang.setText(line.kode_pp,line.nama_cab);
						this.cb_bank.setText(line.kode_bank,line.nama_bank);
						this.e_ket.setText(line.keterangan);
						this.e_atensi.setText(line.ref1);
						this.cb_buat.setText(line.nik_buat,line.nama_buat);					
						this.c_curr.setText(line.kode_curr);
						this.e_kurs.setText(floatToNilai(line.kurs));
						if (this.c_curr.getText() == "IDR") this.e_kurs.setReadOnly(true); 					
						else this.e_kurs.setReadOnly(false); 
					
						this.c_jenis2.setText(line.jenis);					
						this.e_cabang2.setText(line.kode_pp);
						this.cb_bank2.setText(line.kode_bank,line.nama_bank);
						this.e_bulan.setText(this.e_nb.getText().substr(6,1));
					} 
				}		
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.nilai_curr  "+
							"from kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+							
							"where a.jenis = 'KB' and a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);			
			
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai  "+
							"from kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+							
							"where a.jenis = 'TAMBAH' and a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai)]);
					}
				} else this.sg4.clear(1);	
			
					
			}									
		} catch(e) {alert(e);}
	}
});