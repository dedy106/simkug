window.app_saku3_transaksi_yakes21_budget_fRRAlocal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_budget_fRRAlocal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_budget_fRRAlocal";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reprogramming Release ", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;util_gridLib");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pengajuan"]});						
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.c_grup = new saiCB(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Group Akun",readOnly:true,tag:2,change:[this,"doChange"]});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_terima = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Nilai Penerima", tag:9, tipeText:ttNilai, text:"0", readOnly:true});
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});								
		this.e_donor = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total Pemberi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_lok2 = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Lokasi Pemberi", readOnly:true, maxLength:10, tag:2,change:[this,"doChange"],visible:false});		
		this.cb_lok1 = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Lokasi Penerima", readOnly:true, maxLength:10, tag:2,change:[this,"doChange"],visible:false});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,5,995,305], childPage:["Pemberi","Penerima","Cek Anggaran","File Dok","Cattn. Apprv"]});								
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
		            colTitle:["Kode MTA","Nama MTA","Kode PP","Nama PP","Kode DRK","Nama DRK","TW","Saldo","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,80,150,80,150,80,150,80]],					
					columnReadOnly:[true,[1,3,5,7],[0,2,4,6,8]],
					colFormat:[[7,8],[cfNilai,cfNilai]],						
					buttonStyle:[[0,2,4,6],[bsEllips,bsEllips,bsEllips,bsAuto]], 
					//picklist:[[6],[new portalui_arrayMap({items:["TW1","TW2","TW3","TW4"]})]], 					
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],					
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});				

		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
					colTitle:["Kode MTA","Nama MTA","Kode PP","Nama PP","Kode DRK","Nama DRK","TW","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,200,80,150,80,150,80]],					
					columnReadOnly:[true,[1,3,5],[0,2,4,6,7]],
					colFormat:[[7],[cfNilai]],					
					buttonStyle:[[0,2,4,6],[bsEllips,bsEllips,bsEllips,bsAuto]], 					
					//picklist:[[6],[new portalui_arrayMap({items:["TW1","TW2","TW3","TW4"]})]], 					
					ellipsClick:[this,"doEllipsClick4"],change:[this,"doChangeCell4"],nilaiChange:[this,"doNilaiChange"],
				autoAppend:true,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});				

		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","TW"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7],[cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgnG = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgnG,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[3],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});

		this.sgctt = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
				colTitle:["Catatan"],
				colWidth:[[0],[100]],					
				readOnly:true,autoAppend:false,defaultRow:1});					        
					
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
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
			this.gridLib = new util_gridLib();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);

			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;				
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			

			if (this.app._lokasi == "99") var akunCapex = " union select '12' "; else var akunCapex = "";   
			this.c_grup.items.clear();
			var data = this.dbLib.getDataProvider("select distinct substring(kode_akun,1,4) as grup from masakun where kode_lokasi ='"+this.app._lokasi+"' and kode_akun like '51%' and kode_akun not like '5107%' "+akunCapex,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.c_grup.addItem(i,line.grup);					
				}
			}	
			
			this.cb_app.setSQL("select distinct a.nik, a.nama from karyawan a inner join karyawan_pp b  on a.nik=b.nik and b.kode_pp='"+this.app._kodePP+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			this.cb_lok1.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi <> '00'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.cb_lok2.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi <> '00'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);

			if (this.app._lokasi != "99") {
				var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('GARAPP') and kode_lokasi = '"+this.app._lokasi+"'",true);			
				if (typeof data == "object"){
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																												
						if (line.kode_spro == "GARAPP") {
							this.cb_app.setText(line.flag);
						}
					}
				}
			}

			this.cb_lok1.setText(this.app._lokasi);
			this.cb_lok2.setText(this.app._lokasi);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_budget_fRRAlocal.extend(window.childForm);
window.app_saku3_transaksi_yakes21_budget_fRRAlocal.implement({	
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");                
			}
		}catch(e){
			alert(e+" "+data);
		}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
					"select kode_jenis, nama  from pbh_dok_ver  ", 
					"select count(*) from pbh_dok_ver ", 
					["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						sql.add("delete from anggaran_m where no_agg='"+this.e_nb.getText()+"'");
						sql.add("delete from anggaran_d where no_agg='"+this.e_nb.getText()+"'");
						sql.add("delete from rra_pdrk_m where no_pdrk='"+this.e_nb.getText()+"'");
						sql.add("delete from rra_pdrk_d where no_pdrk='"+this.e_nb.getText()+"'");
						sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"'");
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"'");
					} 					
					sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText().substr(0,4)+"','IDR',"+parseNilai(this.e_donor.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.app._userLog+"','"+this.cb_app.getText()+"','RRLC')");					
					sql.add("insert into rra_pdrk_m(no_pdrk,kode_lokasi,lok_donor,keterangan,kode_pp,kode_bidang,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi, nik_user, tgl_input,progress,modul,no_app1,no_app2) values "+
						    "('"+this.e_nb.getText()+"','"+this.cb_lok1.getText()+"','"+this.cb_lok2.getText()+"','"+this.e_ket.getText()+"','-','-','-','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"','-','-','RRLC','-','"+this.app._userLog+"',getdate(),'2','AREA','-','-')");
					
					var periode = "";
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){						
								if (this.sg.cells(6,i) == "TW1") var bulan = "01";
								if (this.sg.cells(6,i) == "TW2") var bulan = "04";
								if (this.sg.cells(6,i) == "TW3") var bulan = "07";
								if (this.sg.cells(6,i) == "TW4") var bulan = "10";

								periode = this.e_periode.getText().substr(0,4)+ bulan;
								sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_lok2.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+periode+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+",'C','-')");
								// sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) values "+		
								// 		"('"+this.e_nb.getText()+"','"+this.cb_lok2.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"',1,'"+periode+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(8,i))+",'C','-','"+this.app._userLog+"',getdate(),'RRLC')");																		
								sql.add("insert into angg_r (no_bukti, modul, kode_lokasi, kode_akun, kode_pp, kode_drk, periode1, periode2, dc, saldo, nilai) values "+
										"('"+this.e_nb.getText()+"', 'RELEASE', '"+this.cb_lok2.getText()+"', '"+this.sg.cells(0,i)+"', '"+this.sg.cells(2,i)+"', '"+this.sg.cells(4,i)+"', '"+periode+"', '"+periode+"', 'C', "+parseNilai(this.sg.cells(7,i))+", "+parseNilai(this.sg.cells(8,i))+")");			
							}
						}
					}
					
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){						
								if (this.sg4.cells(6,i) == "TW1") var bulan = "01";
								if (this.sg4.cells(6,i) == "TW2") var bulan = "04";
								if (this.sg4.cells(6,i) == "TW3") var bulan = "07";
								if (this.sg4.cells(6,i) == "TW4") var bulan = "10";

								periode = this.e_periode.getText().substr(0,4)+ bulan;
								sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_lok1.getText()+"',"+i+",'"+this.sg4.cells(0,i)+"','"+this.sg4.cells(2,i)+"','"+this.sg4.cells(4,i)+"','"+periode+"',0,"+parseNilai(this.sg4.cells(7,i))+",'D','-')");								
								// sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) values "+		
								// 		"('"+this.e_nb.getText()+"','"+this.cb_lok1.getText()+"',"+i+",'"+this.sg4.cells(0,i)+"','"+this.sg4.cells(2,i)+"','"+this.sg4.cells(4,i)+"',1,'"+periode+"',"+parseNilai(this.sg4.cells(7,i))+","+parseNilai(this.sg4.cells(7,i))+",'D','-','"+this.app._userLog+"',getdate(),'RRLC')");										
								sql.add("insert into angg_r (no_bukti, modul, kode_lokasi, kode_akun, kode_pp, kode_drk, periode1, periode2, dc, saldo, nilai) values "+
										"('"+this.e_nb.getText()+"', 'RELEASE', '"+this.cb_lok1.getText()+"', '"+this.sg4.cells(0,i)+"', '"+this.sg4.cells(2,i)+"', '"+this.sg4.cells(4,i)+"', '"+periode+"', '"+periode+"', 'D', 0, "+parseNilai(this.sg4.cells(7,i))+")");				
							}
						}
					}
					
					//dokumen						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','RRLC','"+this.e_nb.getText()+"')");															
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
					this.sg.clear(1); 					
					this.sg2.clear(1); 
					this.sg4.clear(1);	
					this.sgUpld.clear(1);
					this.sgFile.clear();					
					setTipeButton(tbAllFalse);													
					this.pc2.setActivePage(this.pc2.childPage[0]);				
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					this.doClick();				
				break;
			case "simpan" :					
			case "ubah" :	
				this.preView = "1";
				
				var jml = this.c_grup.getText().length;
				
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
					else {
						if (this.sg.cells(0,i).substr(0,jml) != this.c_grup.getText()) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Akun Pemberi tidak sesuai group akun (Baris "+k+").");
							return false;
						}
					}
				}		
				
				for (var i=0;i < this.sg4.getRowCount();i++){					
					if (!this.sg4.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg4.getColCount();j++){
							if (this.sg4.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}	
					else {
						if (this.sg4.cells(0,i).substr(0,jml) != this.c_grup.getText()) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Akun Penerima tidak sesuai group akun (Baris "+k+").");
							return false;
						}
					}
				}		

				this.sg.validasi();
				this.sg4.validasi();
				
				var k=0;
				this.doHitungGar();
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (nilaiToFloat(this.sg2.cells(7,i))>0 && nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
						var k =i+1;
						system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
						return false;						
					}
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_terima.getText()) != nilaiToFloat(this.e_donor.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Terima dan Pemberi tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_terima.getText()) <= 0 || nilaiToFloat(this.e_donor.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Terima atau Pemberi tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.app._periode.substr(0,4) > this.e_periode.getText().substr(0,4)){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi harus dalam tahun anggaran yang sama.["+this.app._periode.substr(0,4)+"]");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();					
				sql.add("delete from anggaran_m where no_agg='"+this.e_nb.getText()+"'");
				sql.add("delete from anggaran_d where no_agg='"+this.e_nb.getText()+"'");
				sql.add("delete from rra_pdrk_m where no_pdrk='"+this.e_nb.getText()+"'");
				sql.add("delete from rra_pdrk_d where no_pdrk='"+this.e_nb.getText()+"'");
				sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"'");
				sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"'");
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {		
			if (m < 10) m = "0" + m;			
			this.e_periode.setText(y+""+m);
			
			if (m == "01" || m == "02" || m == "03" ) this.gridLib.SGIsiItemsFromArray(this.sg.columns.get(6).pickList,new Array("TW1"));	
			if (m == "01" || m == "02" || m == "03" ) this.gridLib.SGIsiItemsFromArray(this.sg4.columns.get(6).pickList,new Array("TW1"));	

			if (m == "04" || m == "05" || m == "06" ) this.gridLib.SGIsiItemsFromArray(this.sg.columns.get(6).pickList,new Array("TW2"));	
			if (m == "04" || m == "05" || m == "06" ) this.gridLib.SGIsiItemsFromArray(this.sg4.columns.get(6).pickList,new Array("TW2"));	

			if (m == "07" || m == "08" || m == "09" ) this.gridLib.SGIsiItemsFromArray(this.sg.columns.get(6).pickList,new Array("TW3"));	
			if (m == "07" || m == "08" || m == "09" ) this.gridLib.SGIsiItemsFromArray(this.sg4.columns.get(6).pickList,new Array("TW3"));	

			if (m == "10" || m == "11" || m == "12" ) this.gridLib.SGIsiItemsFromArray(this.sg.columns.get(6).pickList,new Array("TW4"));	
			if (m == "10" || m == "11" || m == "12" ) this.gridLib.SGIsiItemsFromArray(this.sg4.columns.get(6).pickList,new Array("TW4"));	

			if (this.stsSimpan == 1) this.doClick();			
		}
		catch(e) {
			alert(e);
		}
	},			
	doClick:function(sender){
		if (this.stsSimpan == 0)  {
			this.standarLib.clearByTag(this, new Array("9"),undefined);			
			this.sg.clear(1);						
			this.sg2.clear(1);
			this.sg4.clear(1);						
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-RRA"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
		setTipeButton(tbSimpan);			
	},	
	doChange:function(sender){
		if (sender == this.c_grup && this.c_grup.getText()!="") {
			this.sg.clear(1);
			this.sg4.clear(1);
			this.sg2.clear(1);
		}
	},	
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(7,i) != ""){					
					totD += nilaiToFloat(this.sg4.cells(7,i));
				}
			}						
			
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != ""){					
					totC += nilaiToFloat(this.sg.cells(8,i));
				}
			}						

			this.e_terima.setText(floatToNilai(totD));
			this.e_donor.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},   	
	doHitungGar: function(){
        try {
            this.sg2.clear();
            var nilai = total = 0;
            for (var i=0;i < this.sg.getRowCount();i++){
                if (this.sg.rowValid(i) && this.sg.cells(8,i) != "0"){              
                    nilai = nilaiToFloat(this.sg.cells(8,i));
                    
                    var isAda = false;
                    var idx = total = 0;
                    for (var j=0;j < this.sg2.getRowCount();j++){
                        if (this.sg.cells(0,i) == this.sg2.cells(0,j) && this.sg.cells(2,i) == this.sg2.cells(2,j) && this.sg.cells(4,i) == this.sg2.cells(4,j) && this.sg.cells(6,i) == this.sg2.cells(8,j)) {
                            isAda = true;
                            idx = j;
                            break;
                        }
                    }
                    if (!isAda) {
                        this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(1,i),this.sg.cells(2,i),this.sg.cells(3,i),this.sg.cells(4,i),this.sg.cells(5,i),"0",floatToNilai(nilai),this.sg.cells(6,i)]);
                    } 
                    else { 
                        total = nilaiToFloat(this.sg2.cells(7,idx));
                        total = total + nilai;
                        this.sg2.setCell(7,idx,total);
                    }
                }
            }

            for (var i=0;i < this.sg2.getRowCount();i++){   
				if (this.sg2.cells(8,i) == "TW1") var bulan = "01";
				if (this.sg2.cells(8,i) == "TW2") var bulan = "04";
				if (this.sg2.cells(8,i) == "TW3") var bulan = "07";
				if (this.sg2.cells(8,i) == "TW4") var bulan = "10";

				var data = this.dbLib.getDataProvider("select fn_saldoRilis('"+this.cb_lok2.getText()+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText().substr(0,4)+bulan+"','"+this.e_nb.getText()+"') as saldo ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];										
					this.sg2.cells(6,i,floatToNilai(line.saldo));                      
				}
            }
			
        }
        catch(e) {
            alert(e);
        }
    },  
	doChangeCell: function(sender, col, row){
		if ((col == 6 || col == 8) && (this.sg.cells(8,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);

	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {				
				var data = this.dbLib.getDataProvider("select nama from masakun where kode_akun like '"+this.c_grup.getText()+"%' and kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg.cells(1,row,line.nama);
					else {						
						this.sg.cells(0,row,"");
						this.sg.cells(1,row,"");						
					}
				}
			}
		}
		if (col == 2) {
			if (this.sg.cells(2,row) != "") {		
				var data = this.dbLib.getDataProvider("select nama from pp where kode_pp='"+sender.cells(2,row)+"' and kode_lokasi='"+this.cb_lok2.getText()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg.cells(3,row,line.nama);
					else {						
						this.sg.cells(2,row,"");
						this.sg.cells(3,row,"");						
					}
				}
			}
		}
		if (col == 4) {
			if (this.sg.cells(4,row) != "") {
				var isAda = false;
				var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.jml != 0) isAda = true;
					} 
				}
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and b.kode_drk = '"+this.sg.cells(4,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg.cells(5,row,line.nama);
					else {
						if (!isAda) this.sg.cells(4,row,"-");
						else {
							this.sg.cells(4,row,"");
							this.sg.cells(5,row,"");
						}
					}
				}
			}
		}
		if (col == 0 || col == 2 || col == 4 || col == 6) {
			if (sender.cells(0,row) != "" && sender.cells(2,row) != "" && sender.cells(4,row) != "" && sender.cells(6,row) != "") {
				
				var totSeb = 0;
				for (var j=0; j < this.sg.getRowCount();j++){
					if (j < row && sender.cells(0,row) == this.sg.cells(0,j) && sender.cells(2,row) == this.sg.cells(2,j) && sender.cells(4,row) == this.sg.cells(4,j) && sender.cells(6,row) == this.sg.cells(6,j)) {
						totSeb += nilaiToFloat(this.sg.cells(8,j));
					}
				}			
				
				if (sender.cells(6,row) == "TW1") var bulan = "01";
				if (sender.cells(6,row) == "TW2") var bulan = "04";
				if (sender.cells(6,row) == "TW3") var bulan = "07";
				if (sender.cells(6,row) == "TW4") var bulan = "10";

				var data = this.dbLib.getDataProvider("select fn_saldoRilis('"+this.cb_lok2.getText()+"','"+sender.cells(0,row)+"','"+sender.cells(2,row)+"','"+sender.cells(4,row)+"','"+this.e_periode.getText().substr(0,4)+bulan+"','"+this.e_nb.getText()+"') as saldo ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];			
					var saldo = parseFloat(line.saldo) - totSeb;							
					sender.cells(7,row,floatToNilai(saldo));                      
				}
														
			}
		}			
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Mata Anggaran",sender,undefined, 
								"select kode_akun,nama    from masakun where status_gar ='1' and block= '0' and kode_lokasi = '"+this.app._lokasi+"' and kode_akun like '"+this.c_grup.getText()+"%'",
								"select count(kode_akun)  from masakun where status_gar ='1' and block= '0' and kode_lokasi = '"+this.app._lokasi+"' and kode_akun like '"+this.c_grup.getText()+"%'",
								["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 												  
								"select a.kode_pp, a.nama  from pp a where a.kode_lokasi = '"+this.cb_lok2.getText()+"' and a.flag_aktif ='1'",
								"select count(*) from pp a where a.kode_lokasi = '"+this.cb_lok2.getText()+"' and a.flag_aktif ='1'",						
								["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
						
				}
				if (col == 4){							
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.cb_lok2.getText()+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}

					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
								"select distinct a.kode_drk, a.nama from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.cb_lok2.getText()+"'",
								"select count(distinct a.kode_drk)  from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.cb_lok2.getText()+"'",
								["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
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
					this.standarLib.showListData(this, "Daftar Mata Anggaran",sender,undefined, 
								"select kode_akun,nama    from masakun where status_gar ='1' and block= '0' and kode_lokasi = '"+this.app._lokasi+"' and kode_akun like '"+this.c_grup.getText()+"%'",
								"select count(kode_akun)  from masakun where status_gar ='1' and block= '0' and kode_lokasi = '"+this.app._lokasi+"' and kode_akun like '"+this.c_grup.getText()+"%'",
								["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 												  
								"select a.kode_pp, a.nama  from pp a where a.kode_lokasi = '"+this.cb_lok1.getText()+"' and a.flag_aktif ='1'",
								"select count(*)  from pp a where a.kode_lokasi = '"+this.cb_lok1.getText()+"' and a.flag_aktif ='1'",						
								["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
						
				}
				if (col == 4){										
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
								"select a.kode_drk, a.nama from drk a where a.tahun='"+this.e_periode.getText().substr(0,4)+"' and a.kode_lokasi='"+this.cb_lok1.getText()+"'",
								"select count(*) from drk a where a.tahun='"+this.e_periode.getText().substr(0,4)+"' and a.kode_lokasi='"+this.cb_lok1.getText()+"'",
								["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],false);
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell4: function(sender, col, row){
		if ((col == 6 || col == 8) && (this.sg4.cells(7,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);

	    if (col == 0) {
			if (this.sg4.cells(0,row) != "") {
				var data = this.dbLib.getDataProvider("select nama from masakun where kode_akun like '"+this.c_grup.getText()+"%' and kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg4.cells(1,row,line.nama);
					else {						
						this.sg4.cells(0,row,"");
						this.sg4.cells(1,row,"");						
					}
				}				
			}
		}
		if (col == 2) {
			if (this.sg4.cells(2,row) != "") {
				var data = this.dbLib.getDataProvider("select nama from pp where kode_pp='"+sender.cells(2,row)+"' and kode_lokasi='"+this.cb_lok1.getText()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg4.cells(3,row,line.nama);
					else {						
						this.sg4.cells(2,row,"");
						this.sg4.cells(3,row,"");						
					}
				}				
			}
		}
		if (col == 4) {
			if (this.sg4.cells(4,row) != "") {				
				var data = this.dbLib.getDataProvider("select a.nama from drk a where a.kode_drk='"+sender.cells(4,row)+"' and a.tahun='"+this.e_periode.getText().substr(0,4)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg4.cells(5,row,line.nama);
					else {						
						this.sg4.cells(4,row,"");
						this.sg4.cells(5,row,"");						
					}
				}
			}
		}			
		sender.onChange.set(this,"doChangeCell4");		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){		
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}

							if (this.preView == "1") {										
								this.nama_report = "server_report_saku3_yakes21_budget_rptBudgetRra";
								this.filter = " where a.no_pdrk='" + this.e_nb.getText() + "' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();								
							}
							else {
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
								this.clearLayar();
							}
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);			
			this.sg.clear(1); 
			this.sg2.clear(1); 
			this.sg4.clear(1);		
			this.sgUpld.clear(1);
			this.sgFile.clear();									
			setTipeButton(tbAllFalse);											
			this.pc2.setActivePage(this.pc2.childPage[0]);				
			this.pc1.setActivePage(this.pc1.childPage[0]);		
			this.doClick();						
		} catch(e) {
			alert(e);
		}
	}	
});
