window.app_saku3_transaksi_yakes21_ifund_fIFVerif = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_ifund_fIFVerif.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_ifund_fIFVerif";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Verifikasi Pemakaian", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,12,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Pengajuan","Data Pengajuan","Filter Data"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","NIK IF","NIK Input","Pilih"],
					colWidth:[[6,5,4,3,2,1,0],[70,80,80,100,400,80,100]],
					readOnly:true,
					colFormat:[[3,6],[cfNilai,cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[6],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
				
		this.cb_if = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,11,220,20],caption:"Pemegang IF",tag:2,readOnly:true,change:[this,"doChange"]}); 	//multiSelection:false,	
		this.e_saldoif = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,18,200,20],caption:"Saldo IF", tag:1, tipeText:ttNilai, text:"0", readOnly:true});
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,12,996,351], childPage:["Item Pemakaian","Item Pajak","File Dok","Cattn Approval"]});				
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,tag:0});								
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Kuitansi", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18]}); 			
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"Uraian", maxLength:150});						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,16,200,20],caption:"Nilai Bruto", readOnly:true, tag:0, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.cb_app = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Disetujui Oleh",tag:2,readOnly:true}); // multiSelection:false       						
		this.e_netto = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,14,200,20],caption:"Nilai Verifikasi", readOnly:true, tag:0, tipeText:ttNilai, text:"0"});
	
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,219],colCount:9,tag:0,
					colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,290,50,200,80]],								
					columnReadOnly:[true,[0,1,2,4,5,6,7,8],[3]],													
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});					

		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,20,200,20],caption:"Status Pajak",items:["NON","P21","P23","P42"], readOnly:true,tag:0,change:[this,"doChange"]});						
		this.e_npersen = new saiCB(this.pc1.childPage[1],{bound:[20,21,200,20],caption:"Persentase", tag:0, visible:true,change:[this,"doChange"]});
		this.e_ndpp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Nilai DPP", tag:0, tipeText:ttNilai, text:"0",visible:true,change:[this,"doChange"]});						
		this.e_npajak = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Nilai Pajak", tag:0, tipeText:ttNilai, text:"0",visible:true,change:[this,"doChange"]});		
		
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3],[]],					
					colFormat:[[3],[cfButton]], 					
					click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]],
					readOnly:true,rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgctt = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
				colTitle:["Catatan"],
				colWidth:[[0],[100]],					
				readOnly:true,autoAppend:false,defaultRow:1});					        

		this.cb_nb = new saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"No Pengajuan", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {			

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.cb_if.setSQL("select a.nik, a.nama from karyawan a "+
							"	inner join if_nik b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1' and b.jenis='OPERASIONAL' "+
							"	inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi  "+
							"where c.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a  "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPH21','PPH23','PPH42','SAPHIF')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPH21") this.akunPPH21 = line.flag;								
					if (line.kode_spro == "PPH23") this.akunPPH23 = line.flag;
					if (line.kode_spro == "PPH42") this.akunPPH42 = line.flag;	
					if (line.kode_spro == "SAPHIF") this.akunHutIF = line.flag;								
				}
			}

			this.c_status.setText("");
			this.doLoadCtt(this.e_nb.getText());

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_ifund_fIFVerif.extend(window.childForm);
window.app_saku3_transaksi_yakes21_ifund_fIFVerif.implement({	
	isiCBbukti: function() {
		try {			
			this.cb_nb.setSQL(
				"select a.no_aju, a.keterangan from if_aju_m a "+		
				"left join if_piutang_d c on a.no_aju=c.no_aju "+		
				"where c.no_ju is null and a.periode='"+this.e_periode.getText()+"' and a.progress ='1' and a.posted='T' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_aju","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Pengajuan",true);								
		}
		catch(e) {
			alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},				
	doNilaiChange: function(){		
		try{
			var totDC = 0;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){						
					if (this.sg.cells(2,i).toUpperCase() == "D") totDC += nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totDC -= nilaiToFloat(this.sg.cells(4,i));										
				}
			}			
			this.e_nilai.setText(floatToNilai(totDC));
		}catch(e)
		{
			alert("doNilaiChange: "+e);
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

					//delete data sebelumnya jika ada
					if (this.posted == "T") {
						sql.add("delete from gldt where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	    //utk koreksi																			
						sql.add("delete from posting_m where no_post = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	//utk koreksi																			
						sql.add("delete from posting_d where no_post = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	//utk koreksi																			
					}

					sql.add("update if_aju_m set posted='T',keterangan='"+this.e_ket.getText()+"' where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					if (this.formInput != "RESTITUSI") {
						//jika ada perubahan status pajak
						//yg jenis BEBAN hanya 1 record (dipastikan di SPJ,PBBMHD,DAKEM,AJUIF,IFLOG)
						
						sql.add("update if_aju_j set nilai="+nilaiToFloat(this.e_netto.getText())+" where jenis='HUTIF' and no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update if_aju_j set keterangan='"+this.e_ket.getText()+"' where jenis='BEBAN' and no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						
						sql.add("delete from if_aju_j where jenis in ('P21','P23','P42') and no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						if (this.c_status.getText() != "NON") {
							if (this.c_status.getText() == "P21") {
								var akunPajak = this.akunPPH21; 
								var ket = 'PPh Psl 21 '+this.e_ket.getText();
							}
							if (this.c_status.getText() == "P23") {
								var akunPajak = this.akunPPH23;
								var ket = 'PPh Psl 23 '+this.e_ket.getText();
							}
							if (this.c_status.getText() == "P42") {
								var akunPajak = this.akunPPH42;
								var ket = 'PPh Psl 4 Ayat 2 '+this.e_ket.getText();
							}															
							sql.add("insert into if_aju_j(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
									"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',2,'"+this.e_periode.getText()+"','"+akunPajak+"','"+this.kodePP+"','-','C','"+ket+"',"+nilaiToFloat(this.e_npajak.getText())+",'"+this.c_status.getText()+"')");
						}	

						sql.add("update if_aju_m "+
								"set sts_pajak='"+this.c_status.getText()+"',npajak="+nilaiToFloat(this.e_npajak.getText())+", nilai_dpp="+nilaiToFloat(this.e_ndpp.getText())+",persen="+nilaiToFloat(this.e_npersen.getText())+" "+
								"where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					}					
					
					//----------------------------- POSTING ------------------------------
					sql.add("insert into posting_m(no_post,kode_lokasi,periode,tanggal,modul,keterangan,nik_buat,nik_app,no_del,tgl_input,nik_user,nilai) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',getdate(),'-','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','-',getdate(),'"+this.app._userLog+"',0)");
					sql.add("insert into posting_d(no_post,modul,no_bukti,status,catatan,no_del,kode_lokasi,periode) values "+
							"	('"+this.e_nb.getText()+"','IFVER','"+this.e_nb.getText()+"','POSTING','-','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"')");

					sql.add("insert into gldt(no_bukti, no_urut, kode_lokasi, no_dokumen, tanggal, kode_akun, dc, nilai, keterangan, kode_pp, kode_drk,  "+
							"kode_cust, kode_proyek, kode_task, kode_vendor, kode_lokarea, nik, modul, jenis, periode,  "+
							"kode_curr, kurs, nilai_curr, tgl_input, nik_user) "+						
							"select a.no_aju, a.nu, a.kode_lokasi, '-', a.tanggal, a.kode_akun, a.dc, a.nilai, a.keterangan, a.kode_pp, a.kode_drk, "+
							"'-', '-', '-', '-', '-', '-', b.modul, a.jenis, a.periode, 'IDR', 1, a.nilai, b.tgl_input, b.user_input  "+    
							"from if_aju_j a inner join if_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ");

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
					setTipeButton(tbSimpan);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.c_status.setText("");
					this.sgUpld.clear(1);
					this.doLoad3();
					this.isiCBbukti();			
				break;
			case "simpan" :																				
				this.preView = "1";				
				if (nilaiToFloat(this.e_ndpp.getText()) > nilaiToFloat(this.e_nilai.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai DPP tidak boleh melebihi Nilai Total.");
					return false;
				}
				if (nilaiToFloat(this.e_npajak.getText()) > nilaiToFloat(this.e_ndpp.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Pajak tidak boleh melebihi Nilai DPP.");
					return false;
				}

				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;
				}
				if (this.periodebukti != this.e_periode.getText()) {
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak sama dengan periode bukti");
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
					sql.add("update if_aju_m set posted='F' where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from gldt where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
					sql.add("delete from posting_m where no_post = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from posting_d where no_post = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
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
		this.isiCBbukti();
		this.doLoad3();		
	},	
	doChange:function(sender){
		try {			
			if (sender == this.c_status){
				if (this.c_status.getText() == "NON") {

					this.e_npersen.items.clear();
					var data = this.dbLib.getDataProvider("select 0  as tarif ",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						for (var i in data.rs.rows){
							line = data.rs.rows[i];													
							this.e_npersen.addItem(i,floatToNilai(line.tarif));
						}
					} 

					this.e_ndpp.setTag("9");				
					this.e_npersen.setTag("9");				
					this.e_npajak.setTag("9");	

					this.e_ndpp.setText("0");	
					this.e_npersen.setText("0");	
					this.e_npajak.setText("0");		
					this.e_netto.setText(this.e_nilai.getText());

					// this.e_ndpp.hide();	
					// this.e_npersen.hide();	
					// this.e_npajak.hide();	
										
				}
				else {
					this.e_ndpp.setTag("0");				
					this.e_npajak.setTag("0");
					this.e_npersen.setText("");

					// this.e_ndpp.show();	
					// this.e_npersen.show();					
					// this.e_npajak.show();	
									
					this.e_npersen.items.clear();
					var data = this.dbLib.getDataProvider("select tarif from yk_tarif_pajak where kode_pajak='"+this.c_status.getText()+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						for (var i in data.rs.rows){
							line = data.rs.rows[i];													
							this.e_npersen.addItem(i,floatToNilai(line.tarif));
						}
					} 
					
				}
			}
			
			if ((sender == this.e_ndpp || sender == this.e_npersen) && this.e_ndpp.getText() != "" && this.e_npersen.getText()!= "") {
				var npajak = Math.round(nilaiToFloat(this.e_ndpp.getText()) * nilaiToFloat(this.e_npersen.getText())/100 );
				this.e_npajak.setText(floatToNilai(npajak));
			}

			if ((sender == this.e_nilai || sender == this.e_npajak) && this.e_nilai.getText() != "" && this.e_npajak.getText()!= "") {
				var nilaiHut = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_npajak.getText());
				this.e_netto.setText(floatToNilai(nilaiHut));
			}

			if (sender == this.cb_nb && this.cb_nb.getText() != "") {
				var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,modul,a.keterangan,a.nilai,a.user_input as nik_input,a.nik_if as nik_if "+
							"from if_aju_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"left join if_piutang_d c on a.no_aju=c.no_aju "+	
							"where c.no_ju is null and a.posted='T' and a.no_aju='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";	
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU3 = data;
					this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn3.rearrange();
					this.doTampilData3(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
				} else this.sg3.clear(1);	
			}
		}
		catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_yakes21_if_rptIfForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbSimpan);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.c_status.setText("");
			this.sgUpld.clear(1);
			this.doLoad3();						
			this.isiCBbukti();
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																										
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,modul,a.keterangan,c.nilai,a.user_input as nik_input,a.nik_if as nik_if "+
					 "from if_aju_m a "+
					 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 
					 "inner join (select no_aju,sum(case dc when 'D' then nilai else -nilai end ) as nilai "+
					 "			  from if_aju_j "+
					 "			  where jenis <> 'HUTIF' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_aju) c on a.no_aju=c.no_aju "+
					 "where a.progress = '1' and a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_reim='-' ";	
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
			this.sg3.appendData([line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),line.nik_if,line.nik_input,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 6) {
				this.doDoubleClick3(this.sg3,0,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);
				
				this.e_nb.setText(this.sg3.cells(0,row));	
				this.doLoadCtt(this.e_nb.getText());							
								
				var strSQL = "select a.keterangan,a.kode_pp,a.tanggal,a.tgl_kuitansi,a.nik_app,a.sts_pajak,isnull(a.form,'-') as form,a.nilai_dpp,a.persen,a.npajak, "+
							 "       a.nik_setuju, a.nik_if,a.no_kasopen,a.posted,a.periode "+
							 "from if_aju_m a "+
							 "where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";									 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						
						this.posted = line.posted;
						this.periodebukti = line.periode;
						if (line.posted == "T") setTipeButton(tbHapus);
						else setTipeButton(tbSimpan);

						this.formInput = line.form;							
						this.stsPajak = line.sts_pajak;						
						this.kodePP = line.kode_pp;
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.tgl_kuitansi);
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik_setuju);																		
						this.cb_if.setText(line.nik_if);
						
						this.c_status.setText(line.sts_pajak);
						
						if (line.sts_pajak != "NON") {
							this.e_ndpp.setText(floatToNilai(line.nilai_dpp));
							this.e_npersen.setText(floatToNilai(line.persen));
							this.e_npajak.setText(floatToNilai(line.npajak));
						}
						else {
							this.e_ndpp.setText("0");
							this.e_npersen.setText("0");
							this.e_npajak.setText("0");
						}

						this.nikIF = this.cb_if.getText();
						this.noKasOpen = line.no_kasopen;	
						
						var strSQL = "select a.nik_app,a.no_kas,a.nilai - isnull(b.pakai,0) as saldo  "+
									"from if_nik a "+

									"		left join  ("+						
									"			 select a.nik_if,a.kode_lokasi,sum(a.nilai-a.npajak) as pakai "+
									"			 from if_aju_m a "+
									"			 left join if_reim_m b on a.no_reim=b.no_reim and a.kode_lokasi=b.kode_lokasi and b.no_kas <> '-' "+
									"			 where b.no_reim is null and a.nik_if='"+this.cb_if.getText()+"' and a.no_kasopen='"+this.noKasOpen+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju<>'"+this.e_nb.getText()+"' "+
									"			 group by a.nik_if,a.kode_lokasi "+												
									"		) b on a.nik = b.nik_if and a.kode_lokasi=b.kode_lokasi "+

									"where a.jenis='OPERASIONAL' and a.nik ='"+this.cb_if.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'";						   

						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){																					
								this.e_saldoif.setText(floatToNilai(line.saldo));											
							}
						}
						
					}
				}	
				
				var strSQL = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							"from if_aju_j a "+
							"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+	
							"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
							"where a.jenis not in ('HUTIF','P21','P23','P42') and a.no_aju = '"+this.e_nb.getText()+"' order by a.dc desc";									
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
				} else this.sg.clear(1);	
				
				this.sgUpld.clear(); 
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join pbh_dok_ver b on a.kode_jenis=b.kode_jenis "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, "DownLoad"]);						
					}
				} else this.sgUpld.clear(1);

			}									
		} catch(e) {alert(e);}
	},	
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal "+
						 "from pbh_ver_m "+
						 "where no_bukti='"+kode+"' and no_ver<>'"+this.noAppLama+"' "+
						 "order by convert(varchar,tanggal,103) desc";	
			
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 350px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select catatan,no_ver, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_user "+
								  "from pbh_ver_m "+
								  "where no_bukti='"+kode+"' and tanggal='"+line.tanggal+"' and no_ver<>'"+this.noAppLama+"' "+
								  "order by tanggal desc,convert(varchar,tgl_input,108) desc ";	

					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_ver+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}
					
	}
});