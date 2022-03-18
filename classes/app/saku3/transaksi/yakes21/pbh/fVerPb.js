window.app_saku3_transaksi_yakes21_pbh_fVerPb = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_yakes21_pbh_fVerPb.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_pbh_fVerPb";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Verifikasi Transaksi", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,440], childPage:["Daftar Bukti","Detail Bukti","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:14,tag:0,
		            colTitle:["Pilih","Modul","No Bukti","Status","Tanggal","Due Date","PP","No Dokumen","Deskripsi","Nilai","Pembuat","No Ver","Tgl Input","Kode PP"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[50,110,100,150,100,300,100,210,70,70,80,100,80,70]],                    
					readOnly:true,colFormat:[[0,9],[cfButton,cfNilai]],
					click:[this,"doSgBtnClick"], colAlign:[[0],[alCenter]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
				
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:0});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No App", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});						
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"No Bukti", readOnly:true});		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,12,450,20],caption:"No Dokumen", readOnly:true});		
		this.e_buat = new saiLabelEdit(this.pc1.childPage[1],{bound:[750,12,220,20],caption:"Pembuat", readOnly:true});
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Modul", visible:false, readOnly:true,change:[this,"doChange"]});				
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Tgl Bukti", readOnly:true});
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,13,450,20],caption:"PP/Unit", readOnly:true});				
		this.e_nilairek = new saiLabelEdit(this.pc1.childPage[1],{bound:[750,13,220,20],caption:"Total Rekening", readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_duedate = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Due Date", readOnly:true});				
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,14,450,20],caption:"Deskripsi", readOnly:true});					
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[750,14,220,20],caption:"Total Jurnal", readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,18,996,252], childPage:["Item Jurnal","Item Pajak","Rekening","File Dok","Budget","Cattn Verf.","Ref. Jurnal"]});							
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,290,50,200,80]],								
					readOnly:true,														
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange3"],
					autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3});					

		this.sg4 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:9,
					colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,290,50,200,80]],								
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]], picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					ellipsClick:[this,"doEllipsClick4"],change:[this,"doChangeCell4"],nilaiChange:[this,"doNilaiChange3"],
					autoAppend:true,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg4});					

		this.sgRek = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:10,tag:0,
					colTitle:["Kode Vendor","ID","Bank","Atensi","No Rekening","Nama Rekening","Bruto","Potongan","Netto","ID"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[50,100,80,100,240,120,170,160,40,70]],	
					colHide:[[0],[true]],									
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[1],[bsEllips]], 
					columnReadOnly:[true,[0,1,2,3,4,5,6,8,9],[7]],
					ellipsClick:[this,"doEllipsClickRek"],change:[this,"doChangeCellRek"],nilaiChange:[this,"doNilaiChangeRek"],					
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sgRek,pager:[this,"doPager1"]});					
				
		this.sgUpld = new saiGrid(this.pc2.childPage[3],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3],[]],					
					colFormat:[[3],[cfButton]], 					 	
					click:[this,"doSgBtnClickUpld"], colAlign:[[3],[alCenter]],
					readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});		
		this.sgnUpld = new sgNavigator(this.pc2.childPage[3],{bound:[1,this.pc2.height - 25,this.pc2.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sg2 = new saiGrid(this.pc2.childPage[4],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:8,tag:9,
					colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100, 200,80,100,80,150,80]],
					readOnly:true,colFormat:[[6,7],[cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[4],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});
		
		this.sgctt = new saiGrid(this.pc2.childPage[5],{bound:[1,5,this.pc2.width-12,this.pc2.height-15],colCount:1,tag:9, 
					colTitle:["Catatan"],
					colWidth:[[0],[100]],					
					readOnly:true,autoAppend:false,defaultRow:1});					        

		this.sgRef = new saiGrid(this.pc2.childPage[6],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:9,tag:9,
					colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,290,50,200,80]],								
					readOnly:true,														
					colFormat:[[4],[cfNilai]],					
					autoAppend:false,defaultRow:1});		
		this.sgnRef = new portalui_sgNavigator(this.pc2.childPage[6],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sgRef});					


		this.cb_nb = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"No Pengajuan", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
				
		setTipeButton(tbAllFalse);
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
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
			
			this.stsSimpan = 1;
            this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);	
			this.doLoad();	  
			this.doLoadCtt(this.e_nobukti.getText());    
			
			var sql = new server_util_arrayList();
			sql.add("select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi <> '00'");			
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '063' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");									
			this.dbLib.getMultiDataProviderA(sql);		
			
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_yakes21_pbh_fVerPb.extend(window.childForm);
window.app_saku3_transaksi_yakes21_pbh_fVerPb.implement({					
	doSgBtnClickUpld: function(sender, col, row){
		try{
			if (col === 3) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},		
	doEllipsClick4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '063' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from (select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '063' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"') x",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					var strPP = "select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi <> '00'";
					var strPPCount = "select count(*) from pp a where a.flag_aktif= '1' and a.kode_lokasi <> '00'";                    
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							strPP,
							strPPCount,
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
				}												
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCellRek: function(sender, col, row) {
		try {
			sender.onChange.set(undefined,undefined);
			if (col == 1 && this.sgRek.cells(1,row) != "") {
				var str = "select bank,no_rek,nama_rek from vendor_rek where kode_vendor ='"+this.sgRek.cells(0,row)+"' and nu='"+this.sgRek.cells(1,row)+"' ";
				var data = this.dbLib.getDataProvider(str,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];																					
					this.sgRek.cells(2,row,line.bank);	
					this.sgRek.cells(4,row,line.no_rek);	
					this.sgRek.cells(5,row,line.nama_rek);	
					//colTitle:["Kode Vendor","ID","Bank","Atensi","No Rekening","Nama Rekening","Bruto","Potongan","Netto","ID"],
				}
			}
			sender.onChange.set(this,"doChangeCellRek");	

			if (col == 7 && this.sgRek.cells(7,row) != "") {
				var netto = nilaiToFloat(this.sgRek.cells(6,row)) - nilaiToFloat(this.sgRek.cells(7,row));
				this.sgRek.cells(8,row,netto);
				this.sgRek.validasi();		
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doEllipsClickRek: function(sender, col, row){
		try{			
			if (sender == this.sgRek) {
				if (col == 1){
					this.standarLib.showListData(this, "Daftar Rek",sender,undefined, 
						    "select nu,bank,no_rek+' - '+nama_rek as rek from vendor_rek where kode_vendor='"+this.sgRek.cells(0,row)+"'",
							"select count(*) from vendor_rek where kode_vendor='"+this.sgRek.cells(0,row)+"'",
							["nu","bank","rek"],"and",["ID","Bank","Rekening"],false);				
				}																
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell4: function(sender, col, row){
		try {
			if ((col == 2 || col == 4) && (sender.cells(4,row) != "")) this.sg4.validasi();
			sender.onChange.set(undefined,undefined);	    
			if (col == 0) {
				if (sender.cells(0,row) != "") {				
					var akun = this.dataAkunPjk.get(sender.cells(0,row));				
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
			sender.onChange.set(this,"doChangeCell4");		
		}
		catch(e){
			alert(e);
		}				
	},			
	doNilaiChange3: function(){		
		try{
			var totDC = 0;
			for (var i = 0; i < this.sg3.getRowCount();i++){
				if (this.sg3.rowValid(i) && this.sg3.cells(4,i) != ""){	
					if (this.e_modul.getText() == "PINBUK") {
						if (this.sg3.cells(2,i).toUpperCase() == "D") totDC += nilaiToFloat(this.sg3.cells(4,i));
					}
					else {				
						if (this.sg3.cells(2,i).toUpperCase() == "D") totDC += nilaiToFloat(this.sg3.cells(4,i));
						if (this.sg3.cells(2,i).toUpperCase() == "C") totDC -= nilaiToFloat(this.sg3.cells(4,i));					
					}
				}
			}
			
			for (var i = 0; i < this.sg4.getRowCount();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(4,i) != ""){
					if (this.sg4.cells(2,i).toUpperCase() == "D") totDC += nilaiToFloat(this.sg4.cells(4,i));
					if (this.sg4.cells(2,i).toUpperCase() == "C") totDC -= nilaiToFloat(this.sg4.cells(4,i));
				}
			}
			
			this.e_nilai.setText(floatToNilai(totDC));
		}catch(e)
		{
			alert("doNilaiChange3: "+e);
		}		
	},		
	doNilaiChangeRek: function(){		
		try{
			var tot = 0;
			for (var i = 0; i < this.sgRek.getRowCount();i++){
				if (this.sgRek.rowValid(i) && this.sgRek.cells(8,i) != ""){
					if (this.e_modul.getText() == "PINBUK") {
						if (nilaiToFloat(this.sgRek.cells(8,i)) > 0) tot += nilaiToFloat(this.sgRek.cells(8,i));
					}
					else tot += nilaiToFloat(this.sgRek.cells(8,i));
				}
			}
			this.e_nilairek.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("doNilaiChange3: "+e);
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																								
					if (this.c_status.getText() == "APPROVE") {
						if (this.e_modul.getText() == "IFCLOSE" || this.e_modul.getText() == "PJPTG") 
							var vStatus = "8"; //-->langsung ke penerimaan kas (tanpa SPB-sah-fiat) 
						else var vStatus = "2"; 
					}
					else var vStatus = "V";										
					
					sql.add("update pbh_ver_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-' and form='VERPB' and modul='"+this.e_modul.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into pbh_ver_m (no_ver,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
                            "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','"+this.e_modul.getText()+"','VERPB','"+this.e_nobukti.getText()+"','"+this.e_memo.getText()+"','-','X','X')");
                    													
				    sql.add("update pbh_pb_m set no_ver='"+this.e_nb.getText()+"',progress='"+vStatus+"',nilai="+nilaiToFloat(this.e_nilai.getText())+" where no_pb='"+this.e_nobukti.getText()+"' ");							 
					
					if (vStatus == "2") {
						//----------------- update pajak					
						sql.add("delete from pbh_pb_j where no_pb='"+this.e_nobukti.getText()+"' and jenis='PAJAK' ");
						if (this.sg4.getRowValidCount() > 0){
							for (var i=0;i < this.sg4.getRowCount();i++){
								if (this.sg4.rowValid(i)){										
									sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
											"('"+this.e_nobukti.getText()+"','"+this.e_dok.getText()+"','"+this.tglBukti+"',"+i+",'"+this.sg4.cells(0,i)+"','"+this.sg4.cells(3,i)+"','"+this.sg4.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg4.cells(4,i))+",'"+this.sg4.cells(5,i)+"','-','"+this.lokBukti+"','"+this.e_modul.getText()+"','PAJAK','"+this.perBukti+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
								}
							}
						}
						//----------------- update rekening					
						if (this.e_modul.getText() != "PBDAKEM" && this.sgRek.getRowValidCount() > 0){
							for (var i=0;i < this.sgRek.getRowCount();i++){
								if (this.sgRek.rowValid(i)){										
									sql.add("update pbh_rek set pajak="+nilaiToFloat(this.sgRek.cells(7,i))+",nilai="+nilaiToFloat(this.sgRek.cells(8,i))+",nu="+this.sgRek.cells(1,i)+",bank='"+this.sgRek.cells(2,i)+"',no_rek='"+this.sgRek.cells(4,i)+"',nama_rek='"+this.sgRek.cells(5,i)+"' "+
											"where no_bukti='"+this.e_nobukti.getText()+"' and kode_vendor='"+this.sgRek.cells(0,i)+"' and id="+this.sgRek.cells(9,i)+" ");								
								}
							}
						}

					}

					if (vStatus == "V") {
						if (this.e_modul.getText() == "PBSPJ"){
							sql.add("update  pdss_aju_m set progress='V' where no_aju='"+this.e_nobukti.getText()+"'");																
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
					this.sgRek.clear(1); this.sg3.clear(1); this.sg2.clear(1); this.sgUpld.clear(1); this.sgRef.clear(1);	
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.e_memo.setText("");
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
			case "ubah" :					
				//this.preView = "1";													
				this.preView = "0";													
				this.sgRek.validasi();
				this.sg3.validasi();
								
				if (this.c_status.getText() == "APPROVE" && nilaiToFloat(this.e_nilai.getText()) != nilaiToFloat(this.e_nilairek.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Jurnal dan Total Rekening tidak sama.");
					return false;						
				}
				else 
				this.simpan();				
				break;				
				
			case "simpancek" : this.simpan();			
				break;
				
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();									
				sql.add("delete from pbh_ver_m where no_ver='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'");				
				sql.add("update pbh_pb_m set no_ver='-',progress='1' where no_pb='"+this.e_nobukti.getText()+"' ");								
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) {
			this.doClick();		
			this.cb_nb.setSQL("select no_pb, keterangan from pbh_pb_m where periode<='"+this.e_periode.getText()+"' and progress in ('2','V','8') ",["no_pb","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);				
		}
	},	
	doChange:function(sender){										
		if (sender == this.cb_nb && this.cb_nb.getText() != "") {
			var strSQL = "select a.due_date,a.no_pb as no_bukti,case a.progress when '2' then 'APPROVE' when '8' then 'APPROVE' else 'RETURN' end as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_ver as no_ver1,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
						 "from pbh_pb_m a "+
						 "		inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "      inner join karyawan c on a.nik_user=c.nik "+
						 "where a.progress in ('2','V','8') and a.no_pb='"+this.cb_nb.getText()+"' and a.modul in ('PBSDM','PBBAU','PBBMHD','PBBA', 'PBADK','PJAJU','PJPTG','PBDAKEM','PBSPJ','PINBUK','PBHKES','PBBPJS','PBBAST','PBADK','OBLIBELI','SHMBELI','RDBELI','SPBELI','DEPOSWA','MIFEE','PBAKRU') ";//ganti progress tidak lewat verifikasi 'IFREIM','IFCLOSE',
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);								
			
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		}
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pbh_ver_m","no_ver",this.app._lokasi+"-VER"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_memo.setFocus();								
    },	
    doSgBtnClick: function(sender, col, row){
		try{
			if (col === 0) {
				this.doDoubleClick(this.sgRek,1,row);
			}
		}catch(e){
			alert(e);
		}
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(1,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);											
				if (this.sg.cells(3,row) == "RETURN") this.c_status.setText(this.sg.cells(3,row));								
				else this.c_status.setText("APPROVE");		

				this.e_modul.setText(this.sg.cells(1,row));
				this.e_nobukti.setText(this.sg.cells(2,row));					                											
				this.e_tgl.setText(this.sg.cells(4,row));
				this.tglBukti = this.e_tgl.getText().substr(6,4)+"-"+this.e_tgl.getText().substr(3,2)+"-"+this.e_tgl.getText().substr(0,2);
				this.perBukti = this.e_tgl.getText().substr(6,4)+this.e_tgl.getText().substr(3,2);
				this.lokBukti = this.e_nobukti.getText().substr(0,2);
				this.e_duedate.setText(this.sg.cells(5,row));
				this.e_pp.setText(this.sg.cells(6,row));
				this.e_dok.setText(this.sg.cells(7,row));
				this.e_ket.setText(this.sg.cells(8,row));						
				this.e_buat.setText(this.sg.cells(10,row));										
				this.noVerLama = this.sg.cells(11,row);						
				this.kodePPBukti = this.sg.cells(13,row);
				this.e_memo.setText(this.sg.cells(8,row));		
				
				this.doLoadCtt(this.e_nobukti.getText());      
				this.doLoadRek();
				this.doLoadJurnal();
				this.doLoadGar();				
				this.doLoadRefJurnal();

				this.sgUpld.clear(); 
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join pbh_dok_ver b on a.kode_jenis=b.kode_jenis "+
							 "where a.no_bukti = '"+this.e_nobukti.getText()+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar,"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);
				
				if (this.sg.cells(3,row) == "INPROG") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					setTipeButton(tbHapus);
					this.stsSimpan = 0;
					var str = "select catatan from pbh_ver_m where no_ver ='"+this.noVerLama+"' and kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(str,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];																		
						this.e_memo.setText(line.catatan);	
					}
				}				
			}
		} catch(e) {alert(e);}
	},		
	doLoadRek:function(){
		var strSQL1 = "select a.kode_vendor,a.nu,a.bank,a.nama,a.no_rek,a.nama_rek,a.bruto,a.pajak,a.bruto-a.pajak as netto, a.id "+
					  "from pbh_rek a "+
					  "where a.no_bukti ='"+this.e_nobukti.getText()+"' ";
		var data = this.dbLib.getDataProvider(strSQL1,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sgRek.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																		
				this.sgRek.appendData([line.kode_vendor,line.nu,line.bank,line.nama,line.no_rek,line.nama_rek,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.netto),line.id]);
			}
		} else this.sgRek.clear(1);	
		this.sgRek.validasi();												
	},	
	doLoadJurnal:function(){				
		//this.e_modul.getText() == "IFREIM" || this.e_modul.getText() == "IFCLOSE" ||--> tidak lewat verifikasi
		if (this.e_modul.getText() == "PBBMHD" || 
			this.e_modul.getText() == "PJAJU"  || this.e_modul.getText() == "PJPTG" || this.e_modul.getText() == "PBDAKEM" || this.e_modul.getText() == "PBSPJ" ||
			this.e_modul.getText() == "PINBUK" || this.e_modul.getText() == "PBHKES" || this.e_modul.getText() == "PBSDM" || this.e_modul.getText() == "PBBPJS" || 
			this.e_modul.getText() == "PBBAST" || this.e_modul.getText() == "PBADK"  || this.e_modul.getText() == "OBLIBELI" || this.e_modul.getText() == "SHMBELI" || 
			this.e_modul.getText() == "RDBELI" || this.e_modul.getText() == "SPBELI" || this.e_modul.getText() == "DEPOSWA" || this.e_modul.getText() == "MIFEE" || 
			this.e_modul.getText() == "PBAKRU")   {
			
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from pbh_pb_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00' "+	
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
						"where a.jenis in ('BEBAN','TAMBAH','AKUNIF','PANJAR','TUJUAN','SUMBER','PENSIUN','PEGAWAI') and a.no_pb = '"+this.e_nobukti.getText()+"' order by a.dc desc";		

			var strSQL4 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
						"from pbh_pb_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi<>'00' "+							
						"where a.jenis = 'PAJAK' and a.no_pb = '"+this.e_nobukti.getText()+"' ";						
		}		
		var data = this.dbLib.getDataProvider(strSQL3,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg3.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
			}
		} else this.sg3.clear(1);	
		var data = this.dbLib.getDataProvider(strSQL4,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg4.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg4.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
			}
		} else this.sg4.clear(1);			
		this.sg3.validasi();			
	},
	doLoadGar:function(){	
		if (this.e_modul.getText() != "PBHKES") {
			var strSQL2 = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.saldo,case a.modul when 'PJPTG' then case a.dc when 'C' then a.nilai else -a.nilai end else a.nilai end as nilai "+
						"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"				 inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00' "+
						"				 inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode1,1,4)=d.tahun "+
						"where no_bukti='"+this.e_nobukti.getText()+"'";
		}
		else {
			if (this.e_modul.getText() == "PBHKES") {
				var strSQL2 = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.saldo,case a.modul when 'PJPTG' then case a.dc when 'C' then a.nilai else -a.nilai end else a.nilai end as nilai "+
						"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"				 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"				 inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode1,1,4)=d.tahun "+
						"				 inner join yk_bill_m e on e.no_bill=a.no_bukti "+
						"where e.no_hutang='"+this.e_nobukti.getText()+"'";
			}
		}
		var data = this.dbLib.getDataProvider(strSQL2,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.saldo),floatToNilai(line.nilai)]);
			}
		} else this.sg2.clear(1);	
	},
	doLoad:function(sender){			
		strSQL = "select a.due_date,a.no_pb as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,'-' as no_dokumen,a.keterangan,a.nilai,a.nik_user as pembuat,a.no_ver as no_ver1,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
				 "from pbh_pb_m a "+
				 "		inner join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi<>'00' "+				 
				 "where a.progress='1' and a.modul in ('PBBAU','PBBMHD','PBBA','PBADK','PJAJU','PJPTG','PBDAKEM','PBSPJ','PINBUK','PBHKES','PBSDM','PBBPJS','PBBAST','PBADK','OBLIBELI','SHMBELI','RDBELI','SPBELI','DEPOSWA','MIFEE','PBAKRU') order by no_pb";  //  tidak lewat verifikasi  'IFREIM','IFCLOSE',
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);							
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg.appendData(["Pilih",line.modul.toUpperCase(),line.no_bukti,line.status.toUpperCase(),line.tgl,line.tgl2,line.pp,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_ver1,line.tglinput,line.kode_pp]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doLoadRefJurnal:function(){		
		try {
			if (this.e_modul.getText() == "PBBMHD" || this.e_modul.getText() == "PBSPJ") {
				var strRef = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from hutang_j a "+
						"	  inner join pbh_pb_m x on a.no_hutang=x.no_hutang and a.kode_lokasi=x.kode_lokasi "+						
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00'"+	
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
						"where a.jenis<>'BMHD' and x.no_pb = '"+this.e_nobukti.getText()+"' order by a.dc desc,b.kode_akun";		
			}
			//tidak lewat verifikasi
			// if (this.e_modul.getText() == "IFREIM" || this.e_modul.getText() == "IFCLOSE") {
			// 	var strRef = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
			// 			"from if_aju_j a "+
			// 			"	  inner join if_aju_m x on a.no_aju=x.no_aju and a.kode_lokasi=x.kode_lokasi "+
			// 			"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			// 			"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00'"+	
			// 			"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
			// 			"where a.jenis<>'HUTIF' and x.no_reim = '"+this.e_nobukti.getText()+"' order by a.dc desc,b.kode_akun";		
			// }
			if (this.e_modul.getText() == "PJAJU") {
				var strRef = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from panjar2_d a "+
						"	  inner join pbh_pb_m x on a.no_panjar=x.no_pb and a.kode_lokasi=x.kode_lokasi "+						
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00' "+	
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
						"where x.no_pb = '"+this.e_nobukti.getText()+"' order by a.dc desc,b.kode_akun";		
			}
			if (this.e_modul.getText() == "PJPTG") {
				var strRef = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from panjarptg2_j a "+
						"	  inner join pbh_pb_m x on a.no_ptg=x.no_pb and a.kode_lokasi=x.kode_lokasi "+						
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00' "+	
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
						"where x.no_pb = '"+this.e_nobukti.getText()+"' order by a.dc desc,b.kode_akun";		
			}
			if (this.e_modul.getText() == "PBDAKEM") {
				var strRef = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from hutang_j a "+						
						"	  inner join yk_dakem_m z on z.no_dakem=a.no_hutang and z.kode_lokasi=a.kode_lokasi "+						
						"	  inner join pbh_pb_m x on x.no_pb=z.no_ver and x.kode_lokasi=z.kode_lokasi "+						
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00' "+							
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
						"where a.jenis<>'HUTANG' and x.no_pb = '"+this.e_nobukti.getText()+"' order by a.dc desc,b.kode_akun";		
			}
			if (this.e_modul.getText() == "PINBUK") {
				var strRef = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,'-' as kode_drk,'-' as nama_drk "+
						"from pbh_pb_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00'"+	
						"where a.no_pb = '"+this.e_nobukti.getText()+"' order by a.dc desc,b.kode_akun";		
			}
			if (this.e_modul.getText() == "PBHKES") {
				var strRef = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,'-' as kode_drk,'-' as nama_drk "+
						"from yk_hutang_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00'"+	
						"	  inner join pbh_pb_m d on a.no_hutang=d.no_hutang "+
						"where d.no_pb = '"+this.e_nobukti.getText()+"' order by a.dc desc,b.kode_akun";		
			}
			
			//if (this.e_modul.getText() == "PBSDM") ---> jenis noted item tidak ada refjurnal
			//if (this.e_modul.getText() == "DEPOSWA") ---> jenis noted item tidak ada refjurnal
			
			if (this.e_modul.getText() == "PBBPJS") {
				var strRef = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,'-' as kode_drk,'-' as nama_drk "+
						"from yk_bpjs_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00'"+	
						"	  inner join pbh_pb_m d on a.no_bpjs=d.no_hutang "+
						"where d.no_pb = '"+this.e_nobukti.getText()+"' order by a.dc desc,b.kode_akun";		
			}

			if (this.e_modul.getText() == "PBBAST" || this.e_modul.getText() == "PBADK" || this.e_modul.getText() == "PBAKRU") {
				var strRef = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,'-' as kode_drk,'-' as nama_drk "+
						"from hutang_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00'"+	
						"	  inner join pbh_pb_m d on a.no_hutang=d.no_hutang "+
						"where d.no_pb = '"+this.e_nobukti.getText()+"' order by a.dc desc,b.kode_akun";		
			}

			if (this.e_modul.getText() == "OBLIBELI") {
				var strRef = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,isnull(d.kode_drk,'-') as kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from inv_oblibeli_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00'"+							
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
						"where a.no_beli = '"+this.e_nobukti.getText()+"' order by a.dc desc,b.kode_akun";		
			}
			if (this.e_modul.getText() == "SHMBELI") {
				var strRef = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,isnull(d.kode_drk,'-') as kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from inv_shmbeli_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00'"+							
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
						"where a.no_shmbeli = '"+this.e_nobukti.getText()+"' order by a.dc desc,b.kode_akun";		
			}
			if (this.e_modul.getText() == "RDBELI") {
				var strRef = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,isnull(d.kode_drk,'-') as kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from inv_rdbeli_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00'"+							
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
						"where a.no_rdbeli = '"+this.e_nobukti.getText()+"' order by a.dc desc,b.kode_akun";		
			}
			if (this.e_modul.getText() == "SPBELI") {
				var strRef = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,isnull(d.kode_drk,'-') as kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from inv_spbeli_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00'"+							
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
						"where a.no_spbeli = '"+this.e_nobukti.getText()+"' order by a.dc desc,b.kode_akun";		
			}
			if (this.e_modul.getText() == "MIFEE") {
				var strRef = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,isnull(d.kode_drk,'-') as kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from inv_discre_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and c.kode_lokasi <> '00'"+							
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
						"where a.no_bukti = '"+this.e_nobukti.getText()+"' order by a.dc desc,b.kode_akun";		
			}

			var data = this.dbLib.getDataProvider(strRef,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgRef.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sgRef.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			} else this.sgRef.clear(1);	
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
								this.nama_report="server_report_saku3_pbh_ypt_rptVer";									                  
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ver='"+this.e_nb.getText()+"' ";
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
							this.dataPP = new portalui_arrayMap();														
							this.dataAkunPjk = new portalui_arrayMap();																												
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataPP.set(line.kode_pp, line.nama);										
								}								
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];									
									this.dataAkunPjk.set(line.kode_akun, line.nama);										
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
			this.sgRek.clear(1); this.sg3.clear(1); this.sg2.clear(1);  
			this.sgUpld.clear(1); 
			this.sgRef.clear(1);	
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.e_memo.setText("");
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
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

