window.app_saku3_transaksi_bpr_fTakTerima = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_bpr_fTakTerima.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fTakTerima";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form TAK Terima", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["Daftar Kirim","Penerimaan","Cari Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:13,tag:9,
		            colTitle:["Modul","No Bukti","Status","Tanggal","Due Date","PP Kirim","No Dokumen","Deskripsi","Nilai","Pembuat","No Terima","Lok. Kirim","Tgl Input"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[110,60,100,150,100,350,150,150,80,80,80,100,80]],
					readOnly:true,colFormat:[[8],[cfNilai]],					
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,13,450,40],caption:"Keterangan",tag:9,readOnly:true});				
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Terima", readOnly:true});										
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,20,995,328], childPage:["Detail Terima","Jurnal Terima","Otorisasi","Controlling"]});				
		this.e_nobukti = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Kirim", readOnly:true});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,450,20],caption:"Deskripsi", readOnly:true});		
		this.e_modul = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Modul", readOnly:true,change:[this,"doChange"]});						
		this.e_tgl = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Tgl Bukti", readOnly:true});		
		this.e_duedate = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,200,20],caption:"Due Date", readOnly:true});				
		this.e_pp = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,450,20],caption:"PP/Unit", readOnly:true});		
		this.e_buat = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Pembuat", readOnly:true});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"No Dokumen", readOnly:true});
		this.e_akun = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Akun TAK", readOnly:true});
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Nilai TAK - D/C", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_dcTak = new saiLabelEdit(this.pc2.childPage[0],{bound:[225,19,80,20],caption:"", labelWidth:0, readOnly:true});
		this.e_terima = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,20,200,20],caption:"Total Terima", readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sgv = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1,
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"]
					});
		this.sgnv = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sgv});		
		
		this.cb_buat = new saiCBBL(this.pc2.childPage[2],{bound:[20,11,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_periksa = new saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"Diapprove Oleh", multiSelection:false, maxLength:10, tag:2});

		this.sg2 = new saiGrid(this.pc2.childPage[3],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["Kode MTA","Kode PP","Budget Tersedia","Tot Transaksi","Sisa Budget"],
					colWidth:[[4,3,2,1,0],[120,120,120,100,100]],					
					readOnly:true,colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[3],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[960,2,20,20],hint:"Cek Budget",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		
		
		
		this.e_nb2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,220,20],caption:"No Terima",tag:9});		
		this.bCari = new button(this.pc1.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);			
				
		setTipeButton(tbSimpan);
		this.maximize();		
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_periksa.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
					
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
					"where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1' ");			
			this.dbLib.getMultiDataProviderA(sql);

			
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_bpr_fTakTerima.extend(window.childForm);
window.app_saku3_transaksi_bpr_fTakTerima.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			this.doNilaiChange();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
	},
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (sender.cells(2,row) == ""){
						sender.setCell(2,row,"C");						
					}
				break;
			case 3 : 
					if (sender.cells(3,row) == ""){
						if (row == 0) sender.setCell(3,row,this.e_ket.getText());
						else sender.setCell(3,row,sender.cells(3,(row-1)) );
					}
				break;			
			case 5 : 
					if (sender.cells(5,row) == "") {
						if (row == 0) sender.setCell(5,row,this.app._kodePP);
						else {
							sender.setCell(5,row,sender.cells(5,(row-1)));
							sender.setCell(6,row,sender.cells(6,(row-1)));
						}
					}
				break;							
		}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (sender.cells(4,row) != "")) sender.validasi();
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
			var totT = 0;									
			for (var i = 0; i < this.sgv.getRowCount();i++){
				if (this.sgv.rowValid(i) && this.sgv.cells(4,i) != ""){
					if (this.sgv.cells(2,i).toUpperCase() == "D") totT += nilaiToFloat(this.sgv.cells(4,i));
					if (this.sgv.cells(2,i).toUpperCase() == "C") totT -= nilaiToFloat(this.sgv.cells(4,i));
				}
			}			
			this.e_terima.setText(floatToNilai(totT));		
			
			this.totBalance = totT;
			if (this.e_dcTak.getText() == "D") 	this.totBalance += nilaiToFloat(this.e_nilai.getText());
			else this.totBalance -= nilaiToFloat(this.e_nilai.getText());
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},
	doEllipsClick: function(sender, col, row){
		try{						
			if (col == 0){				
						this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
							"select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",   
							"select count(*) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"where",["Kode","Nama"],false);									
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'",
							"select count(*) from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'",
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
				}				
					
		}catch(e){
			systemAPI.alert(e);
		}
	},


	mainButtonClick: function(sender, desk){
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
			if (this.stsProg == "INPROG") this.doClick();			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																								
					if (this.stsProg != "INPROG") {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update trans_m set progress='0',no_ref1='-' where no_ref1='"+this.e_nb.getText()+"' and kode_lokasi='"+this.kodeLokAsal+"'");					
					}					
					
					var nilaiTAK = Math.abs(nilaiToFloat(this.e_terima.getText()));
					sql.add("update trans_m set progress='1',no_ref1='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.kodeLokAsal+"'");					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','TK','TTUMUM','F','0','0','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_memo.getText()+"','IDR',1,"+nilaiTAK+",0,0,'"+this.cb_buat.getText()+"','"+this.cb_periksa.getText()+"','-','"+this.e_nobukti.getText()+"','-','-','"+this.kodeLokAsal+"','"+this.akunTAK+"','-')");
										
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunTAK+"','"+this.e_dcTak.getText()+"',"+nilaiTAK+","+nilaiTAK+",'"+this.e_memo.getText()+"','TK','TAK','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','"+this.kodeLokAsal+"','-','-')");							
					if (this.sgv.getRowValidCount() > 0){
						for (var i=0;i < this.sgv.getRowCount();i++){
							if (this.sgv.rowValid(i)){
								var j=i+100;
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sgv.cells(0,i)+"','"+this.sgv.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sgv.cells(4,i))+","+nilaiToFloat(this.sgv.cells(4,i))+",'"+this.sgv.cells(3,i)+"','TK','NONTAK','IDR',1,'"+this.sgv.cells(5,i)+"','-','-','-','-','-','-','-','-')");
							}
						}
					}
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(3,i)) > 0) {
									var DC = "C"; 
									var nilai = nilaiToFloat(this.sg2.cells(3,i));
								} else {
									var DC = "D";
									var nilai = nilaiToFloat(this.sg2.cells(3,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_gar,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai,gar_thn,gar_tw,gar_bulan,no_ref,param1,param2) values "+
										"('"+this.e_nb.getText()+"','TK','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(2,i))+","+nilai+",0,0,0,'-','-','-')");
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
					this.sg.clear(1); this.sg2.clear(1); this.sgv.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.e_memo.setText("");									
				break;
			case "simpan" :							
			case "ubah" :														
				this.preView = "1";				
				this.sgv.validasi();			
				for (var i=0;i < this.sgv.getRowCount();i++){					
					if (!this.sgv.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sgv.getColCount();j++){
							if (this.sgv.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Jurnal.");
							return false;
						}
					}										
				}		
				
				//cek budget				
				this.dataAkunGar = {rs:{rows:[]}};
				this.doHitungGar();
				var data = this.dbLib.getDataProvider("select kode_gar from masgar where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}				
				for (var i=0;i < this.sg2.getRowCount();i++) {
					for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
						var line = this.dataAkunGar.rs.rows[j];
						if (line.kode_gar == this.sg2.cells(0,i)) {		
							if (nilaiToFloat(this.sg2.cells(4,i)) < 0) {
								var k =i+1;
								system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
								return false;						
							}							
						}
					}
				}

				if (this.totBalance != 0) {
					system.alert(this,"Transaksi tidak valid.","Jurnal tidak Balance.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"TK",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (TK - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else this.simpan();
				
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"TK",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (TK - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}						
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update trans_m set progress='0',no_ref1='-' where no_ref1='"+this.e_nb.getText()+"' and kode_lokasi='"+this.kodeLokAsal+"'");					
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
		this.doClick();
		this.doLoad();
	},		
	doClick:function(sender){
		if (this.stsProg == "INPROG") {						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-TT"+this.e_periode.getText().substr(2,4)+".","0000"));												
			this.e_memo.setFocus();						
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {							
				this.pc1.setActivePage(this.pc1.childPage[1]);
				
				this.stsProg = this.sg.cells(2,row);
				this.e_nobukti.setText(this.sg.cells(1,row));	
				this.kodeLokAsal = this.sg.cells(11,row);				

				var strSQL = "select a.form,a.tanggal,a.no_dokumen,a.keterangan,a.nilai1,a.param2,a.no_ref1, "+
							 "b.kode_pp+' | '+b.nama as pp, c.nik+' | '+c.nama as buat, d.kode_akun+' | '+d.nama as akun_tak, case when e.dc='D' then 'C' else 'D' end as dc "+
							 "from trans_m a "+
							 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+							 
							 "inner join karyawan c on a.nik1=c.nik and a.kode_lokasi=c.kode_lokasi "+							 
							 "inner join masakun d on a.param2=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+	
							 "inner join trans_j e on a.no_bukti=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.kode_akun=a.param2 "+						 
							 "where a.no_bukti = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.kodeLokAsal+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_modul.setText(line.form);											
						this.e_tgl.setText(line.tanggal);
						this.e_duedate.setText(line.tanggal);
						this.e_pp.setText(line.pp);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.e_nilai.setText(floatToNilai(line.nilai1));
						this.e_buat.setText(line.buat);	
						this.e_akun.setText(line.akun_tak);										
						this.e_dcTak.setText(line.dc.toUpperCase());										
						this.akunTAK = line.param2;
						
						this.noTerima = line.no_ref1;							
					}
				}	

				if (this.stsProg == "INPROG") {
					setTipeButton(tbSimpan); 
					this.doClick();				
				}
				else {
					this.e_nb.setText(this.noTerima);									
					setTipeButton(tbUbahHapus);			  
					var data = this.dbLib.getDataProvider("select f.tanggal,f.periode,f.nik1,f.nik2,f.keterangan as memo,  a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
							   "from trans_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							   "                   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													
							   "                   inner join trans_m f on a.no_bukti=f.no_bukti and a.kode_lokasi=f.kode_lokasi "+							   
							   "where a.jenis='NONTAK' and a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sgv.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];												
							this.sgv.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);						
						}
						this.cb_buat.setText(line.nik1);						
						this.cb_periksa.setText(line.nik2);						
						this.dp_d1.setText(line.tanggal);
						this.e_periode.setText(line.periode);
						this.e_memo.setText(line.memo);
					} else this.sgv.clear(1);								
				}
				
			
			}
		} catch(e) {alert(e);}
	},			
	doLoad:function(sender){																		
		var strSQL = "select a.no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.form as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai1 as nilai,c.nik+' - '+c.nama as pembuat,a.no_ref1 as no_terima,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput "+
		             "from trans_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "               inner join karyawan c on a.nik1=c.nik and a.kode_lokasi=c.kode_lokasi "+					 
					 "where a.progress='0' and a.param1='"+this.app._lokasi+"' and a.modul+a.form in ('TKTKUMUM') and a.periode<='"+this.e_periode.getText()+"' ";
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);					
	},			
	doCari:function(sender){						
		var filter = "";
		if (this.e_nb2.getText() != "") filter = " and a.no_ref1 = '"+this.e_nb2.getText()+"' "; 
		
		var strSQL = "select a.no_bukti,case when a.progress = '0' then 'INPROG' else 'FINAL' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.form as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai1 as nilai,c.nik+' - '+c.nama as pembuat,a.no_ref1 as no_terima,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput "+
		             "from trans_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "               inner join karyawan c on a.nik1=c.nik and a.kode_lokasi=c.kode_lokasi "+					 
					 "where a.param1='"+this.app._lokasi+"' and a.modul+a.form in ('TKTKUMUM') and a.periode<='"+this.e_periode.getText()+"' "+filter;
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	},	
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];			
			this.sg.appendData([line.modul.toUpperCase(),line.no_bukti,line.status.toUpperCase(),line.tgl,line.tgl2,line.pp,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_terima,line.kode_lokasi,line.tglinput]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doHitungGar: function(){
		this.dataAkunGar = {rs:{rows:[]}};		
		var data = this.dbLib.getDataProvider("select kode_gar from masgar where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataAkunGar = data;
		}

		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			for (var n=0;n<this.dataAkunGar.rs.rows.length;n++) {
				var line = this.dataAkunGar.rs.rows[n];
				if (line.kode_gar == this.sg.cells(0,i)) {		
					if (this.sg.rowValid(i) && this.sg.cells(2,i) != "-"){				
						if (this.sg.cells(2,i) == "D") nilai = nilaiToFloat(this.sg.cells(4,i));
						else nilai = nilaiToFloat(this.sg.cells(4,i)) * -1;				
						var isAda = false;
						var idx = total = 0;
						for (var j=0;j < this.sg2.getRowCount();j++){
							if (this.sg.cells(0,i) == this.sg2.cells(0,j)) {
								isAda = true;
								idx = j;
								break;
							}
						}
						if (!isAda) {
							this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(5,i),"0",floatToNilai(nilai),"0"]);
						} 
						else { 
							total = nilaiToFloat(this.sg2.cells(3,idx));
							total = total + nilai;
							this.sg2.setCell(3,idx,total);
						}
					}
				}
			}
		}

		var sakhir = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_release1('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','-','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_release2('"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','-','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");			
				this.sg2.cells(2,i,floatToNilai(parseFloat(data[0])));
				sakhir = parseFloat(data[0]) - nilaiToFloat(this.sg2.cells(3,i));
				this.sg2.cells(4,i,floatToNilai(sakhir));
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
								this.nama_report="server_report_saku3_bpr_rptTakTerima";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
								this.pc1.hide();   															
							}
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg2.clear(1); this.sgv.clear(1); this.sg.clear(1);
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.e_memo.setText("");
			setTipeButton(tbSimpan);			
		} catch(e) {
			alert(e);
		}
	}		
});

