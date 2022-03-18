window.app_saku3_transaksi_sju16_fKb = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fKb.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fKb";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 				
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Status","Bank - No Ref.","Deskripsi","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,300,200,80,80,100]],
					readOnly:true,
					colFormat:[[5],[cfNilai]],	
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});
		
		this.c_jenis = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,222,20],caption:"Jenis Dok", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,11,202,20],caption:"Status",items:["MCM","TRANSFER","CHEQUE","GIRO"], readOnly:true,tag:2});
		this.e_bank = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,320,20],caption:"Bank - No Ref.",maxLength:30});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[350,14,120,20],caption:"",  labelWidth:0, maxLength:30});				
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[740,14,220,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[740,17,220,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.i_budget = new portalui_imageButton(this.pc2.childPage[0],{bound:[970,17,20,20],hint:"Cek Budget",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,280], childPage:["Data Item Jurnal","Otorisasi","Controlling","Daftar Nominatif","File Dok"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:17,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Penanggung","Nama","Tertanggung","Nama","COB","Nama","Acc Markt.","Nama","Kode Keg","Kegiatan"],					
					colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[150,80,150,80,150,80,150,80,150,80,150,80,100,200,50,150,80]],					
					columnReadOnly:[true,[1,6,8,10,12,14,16],[0,2,3,4,5,7,9,11,13,15]],
					buttonStyle:[[0,2,5,7,9,11,13,15],[bsEllips,bsAuto,bsEllips,bsEllips,bsEllips,bsEllips,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.cb_buat = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_periksa = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Diperiksa Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_fiat = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Difiat Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_otorisasi = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Otorisasi Oleh", multiSelection:false, maxLength:10, tag:2});

		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		            colTitle:["Kode Akun","Kode PP","Sisa Budget (Thn)","Tot Transaksi","Saldo Akhir", "Budget Thn","Budget TW","Budget Bulan"],
					colWidth:[[7,6,5,4,3,2,1,0],[120,120,120,120,120,120,100,100]],
					colHide:[[4],[true]],
					readOnly:true,colFormat:[[2,3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		
		this.sg4 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
					colTitle:["No DN","Keterangan","Nilai","Nama Pihak"],
					colWidth:[[3,2,1,0],[300,100,300,100]],					
					columnReadOnly:[true,[1,2,3],[0]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[2],[cfNilai]],
					ellipsClick:[this,"doEllipsClick4"],change:[this,"doChangeCell4"],
					autoAppend:true,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});		
			
		this.sgUpld = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[4],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[4],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});	

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);			
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);			
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.dataAkun = new portalui_arrayMap();							
			this.dataVendor = new portalui_arrayMap();							
			this.dataCust = new portalui_arrayMap();							
			this.dataTipe = new portalui_arrayMap();	
			this.dataPic = new portalui_arrayMap();	
			this.dataPP = new portalui_arrayMap();
			this.dataKeg = new portalui_arrayMap();

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_jenis.setSQL("select distinct a.no_dokumen, a.nama "+
								"from sju_dokumen a "+
								"	inner join sju_dokakun b on a.no_dokumen=b.no_dokumen and a.kode_lokasi=b.kode_lokasi "+
								"   inner join sju_dokumen_form c on a.no_dokumen=c.no_dokumen and c.kode_form = 'KU009' "+
								"   inner join sju_dokumen_pp d on a.no_dokumen=d.no_dokumen and a.kode_lokasi=d.kode_lokasi "+
								"	inner join karyawan_pp e on d.kode_pp=e.kode_pp and d.kode_lokasi=e.kode_lokasi "+								
								"where e.kode_lokasi='"+this.app._lokasi+"' and e.nik='"+this.app._userLog+"'",["no_dokumen","nama"],false,["Format","Nama"],"and","Data Format Dokumen",true);
							
			this.c_jenis.setText("");

			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_periksa.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_fiat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_otorisasi.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.cb_buat.setText(this.app._userLog);
			this.cb_periksa.setText("-");
			this.cb_fiat.setText("-");
			this.cb_otorisasi.setText("-");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fKb.extend(window.childForm);
window.app_saku3_transaksi_sju16_fKb.implement({
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
					"select kode_jenis, nama  from dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
					"select count(*) from dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
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
			if (this.e_periode.getText().substr(2,4) != this.e_nb.getText().substr(3,4)) {
				system.alert(this,"Transaksi tidak valid.","No Bukti tidak sesuai periode-nya.");
				return false;
			}			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_ttd where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update sju_dne_m set no_flag='-' where no_flag='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','KB','KB','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_debet.getText())+",0,0,'"+this.cb_buat.getText()+"','"+this.cb_periksa.getText()+"','"+this.cb_fiat.getText()+"','"+this.e_bank.getText()+"','"+this.e_dok.getText()+"','-','"+this.cb_otorisasi.getText()+"','"+this.c_status.getText()+"','"+this.c_jenis.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"',"+parseNilai(this.sg.cells(4,i))+","+
										parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(3,i)+"','KB','"+this.c_jenis.getText()+"','IDR',1,'"+this.sg.cells(5,i)+"','-','"+this.sg.cells(9,i)+"','"+this.sg.cells(7,i)+"','-','-','"+this.sg.cells(11,i)+"','"+this.sg.cells(13,i)+"','"+this.sg.cells(15,i)+"')");
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
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai,gar_thn,gar_tw,gar_bulan,no_ref,param1,param2) values "+
										"('"+this.e_nb.getText()+"','KB','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(2,i))+","+nilai+","+parseNilai(this.sg2.cells(5,i))+","+parseNilai(this.sg2.cells(6,i))+","+parseNilai(this.sg2.cells(7,i))+",'-','-','-')");
							}
						}
					}

					sql.add("insert into sju_ttd (no_bukti,kode_lokasi,nik_buat,nik_periksa,nik_fiat,nik_oto) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.cb_periksa.getText()+"','"+this.cb_fiat.getText()+"','"+this.cb_otorisasi.getText()+"')");

					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){
								sql.add("update sju_dne_m set no_flag='"+this.e_nb.getText()+"' where no_dn='"+this.sg4.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
						}
					}	
					
					//dokumen											
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+i+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','KB','"+this.e_nb.getText()+"')");															
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
					this.sg.clear(1); 
					this.sg2.clear(1); 
					this.sg3.clear(1); 
					this.sg4.clear(1); 
					this.sgUpld.clear(1);
					this.sgFile.clear(1);		
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :																	
			case "ubah" :						
				this.preView = "1";		
				this.sg.validasi();
				this.doHitungGar();

				this.akunDN = false;
				this.dataAkunDN = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_akun from sju_dn_akun where kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunDN = data;
				}					
				this.dataAkunGar = {rs:{rows:[]}};				
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}				
				for (var i=0;i < this.sg2.getRowCount();i++) {
					for (var j=0;j<this.dataAkunGar.rs.rows.length;j++) {
						var line = this.dataAkunGar.rs.rows[j];
						if (line.kode_akun == this.sg2.cells(0,i)) {		
							if (nilaiToFloat(this.sg2.cells(4,i)) < 0) {
								var k =i+1;
								system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
								return false;						
							}							
						}
					}
					for (var m=0;m<this.dataAkunDN.rs.rows.length;m++) {
						var line = this.dataAkunDN.rs.rows[m];
						if (line.kode_akun == this.sg2.cells(0,i)) {		
							this.akunDN = true;							
						}
					}
				}
				
				if (this.akunDN && this.sg4.getRowValidCount() == 0) {
					system.alert(this,"Transaksi tidak valid.","Ditemukan Akun Nominatif, Transaksi harus disertai Daftar Nominatif");
					return false;						
				}				
				this.dataAkunProd = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag = '044' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunProd = data;
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
					else {
						for (var j=0;j<this.dataAkunProd.rs.rows.length;j++){
							line = this.dataAkunProd.rs.rows[j];
							if (line.kode_akun == this.sg.cells(0,i)) {		
								if (this.sg.cells(7,i) == "-" || this.sg.cells(9,i) == "-" || this.sg.cells(11,i) == "-") {
								var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Kolom Insurer, Insured, COB Harus diisi.[Baris : "+k+"]");
								return false;
								}
							}
						}
					}
				}
				this.dataJU = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
				} 
				var akunKB = false;
				var k=0;
				for (var j=0;j < this.sg.getRowCount();j++){
					if (this.sg.rowValid(j)){
						for (var i=0;i<this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.kode_akun == this.sg.cells(0,j)) {
								akunKB = true;								
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
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
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
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from sju_ttd where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update sju_dne_m set no_flag='-' where no_flag='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (sender == this.c_jenis && this.c_jenis.getText()!="") {				
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a "+
					"	inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' "+
					"	inner join relakun_pp x on a.kode_akun=x.kode_akun and a.kode_lokasi=x.kode_lokasi "+
					"	inner join karyawan_pp y on x.kode_pp=y.kode_pp and y.kode_lokasi=x.kode_lokasi and y.nik='"+this.app._userLog+"' "+			
					"	left join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi and c.kode_flag in ('001','009') "+
					"where c.kode_akun is null and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' "+
					
					"union "+
					"select a.kode_akun,a.nama from masakun a inner join sju_dokakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.no_dokumen = '"+this.c_jenis.getText()+"' "+
					"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' ",							
					"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");
			
			sql.add("select kode_vendor,nama from sju_vendor where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ");
			sql.add("select distinct a.kode_cust,a.nama from sju_cust a inner join karyawan_pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
					"where a.kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ");
			sql.add("select kode_tipe,nama from sju_tipe where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ");
			sql.add("select kode_pic,nama from sju_pic where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ");
			
			if (this.app._userStatus == "U")
				sql.add("select a.kode_pp,a.nama from pp a where a.kode_pp='"+this.app._kodePP+"'  and a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1' ");
			else 
				sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1' ");			

			sql.add("select kode_keg,nama from sju_keg where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ");			
			this.dbLib.getMultiDataProviderA(sql);
		
		}
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan ==1) this.doClick();		
	},
	doClick:function(sender){
		try{
			if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
				if (this.stsSimpan == 0) {					
					this.sg.clear(1);
					this.sg3.clear(1);
					this.sgUpld.clear(1);
					this.sgFile.clear(1);				
				}
				this.stsSimpan = 1;
				var AddFormat = this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/___%"+this.c_jenis.getText().substr(2,3);
				var data = this.dbLib.getDataProvider("select isnull(max(no_bukti),0) as no_bukti from trans_m where no_bukti like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.no_bukti == "0") this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/001"+this.c_jenis.getText().substr(2,3));
						else {
							var idx = parseFloat(line.no_bukti.substr(8,3)) + 1;
							idx = idx.toString();
							if (idx.length == 1) var nu = "00"+idx;
							if (idx.length == 2) var nu = "0"+idx;
							if (idx.length == 3) var nu = idx;
							this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/"+nu+this.c_jenis.getText().substr(2,3));						
						}
					} 
				}
				this.e_bank.setFocus();
				setTipeButton(tbSimpan);
			}			
		}
		catch(e) {alert(e);}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {				
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) {
					sender.cells(1,row,akun);
					var data = this.dbLib.getDataProvider("select normal from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							sender.cells(2,row,line.normal);
						}
					}
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
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
		if (col == 7) {
			if (this.sg.cells(7,row) != "") {
				var vendor = this.dataVendor.get(sender.cells(7,row));
				if (vendor) sender.cells(8,row,vendor);
				else {
					if (trim(sender.cells(7,row)) != "") system.alert(this,"Kode Tertanggung "+sender.cells(7,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(7,row,"");
					sender.cells(8,row,"");
				}				
			}
		}
		if (col == 9) {
			if (this.sg.cells(9,row) != "") {
				var cust = this.dataCust.get(sender.cells(9,row));
				if (cust) sender.cells(10,row,cust);
				else {
					if (trim(sender.cells(9,row)) != "") system.alert(this,"Kode Penanggung "+sender.cells(9,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(9,row,"");
					sender.cells(10,row,"");
				}				
			}
		}
		if (col == 11) {
			if (this.sg.cells(11,row) != "") {
				var tipe = this.dataTipe.get(sender.cells(11,row));
				if (tipe) sender.cells(12,row,tipe);
				else {
					if (trim(sender.cells(11,row)) != "") system.alert(this,"COB "+sender.cells(11,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(11,row,"");
					sender.cells(12,row,"");
				}				
			}
		}
		if (col == 13) {
			if (this.sg.cells(13,row) != "") {
				var pic = this.dataPic.get(sender.cells(13,row));
				if (pic) sender.cells(14,row,pic);
				else {
					if (trim(sender.cells(13,row)) != "") system.alert(this,"Acc. Marketing "+sender.cells(13,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(13,row,"");
					sender.cells(14,row,"");
				}				
			}
		}
		if (col == 15) {
			if (this.sg.cells(15,row) != "") {
				var keg = this.dataKeg.get(sender.cells(15,row));
				if (keg) sender.cells(16,row,keg);
				else {
					if (trim(sender.cells(15,row)) != "") system.alert(this,"Kode Kegiatan "+sender.cells(15,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(15,row,"");
					sender.cells(16,row,"");
				}				
			}
		}
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(Math.round(totD * 100) / 100));
			this.e_kredit.setText(floatToNilai(Math.round(totC * 100)/100));
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
			case 7 : 
					if ((this.sg.cells(7,row) == "") && (row > 0)) {
						this.sg.setCell(7,row,this.sg.cells(7,(row-1)));
						this.sg.setCell(8,row,this.sg.cells(8,(row-1)));
					}
				break;				
			case 9 : 
					if ((this.sg.cells(9,row) == "") && (row > 0)) {
						this.sg.setCell(9,row,this.sg.cells(9,(row-1)));
						this.sg.setCell(10,row,this.sg.cells(10,(row-1)));
					}
				break;			
			case 11 : 
					if ((this.sg.cells(11,row) == "") && (row > 0)) {
						this.sg.setCell(11,row,this.sg.cells(11,(row-1)));
						this.sg.setCell(12,row,this.sg.cells(12,(row-1)));
					}
				break;
			case 13 : 
					if ((this.sg.cells(13,row) == "") && (row > 0)) {
						this.sg.setCell(13,row,this.sg.cells(13,(row-1)));
						this.sg.setCell(14,row,this.sg.cells(14,(row-1)));
					}
				break;
			case 15 : 
				if ((this.sg.cells(15,row) == "") && (row > 0)) {
					this.sg.setCell(15,row,this.sg.cells(15,(row-1)));
					this.sg.setCell(16,row,this.sg.cells(16,(row-1)));
				}
				break;	
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){				
						this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select distinct a.kode_akun,a.nama from ("+							
							"select a.kode_akun,a.nama "+
							"from masakun a "+
							"	inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' "+									
							"	inner join relakun_pp x on a.kode_akun=x.kode_akun and a.kode_lokasi=x.kode_lokasi "+
							"	inner join karyawan_pp y on x.kode_pp=y.kode_pp and y.kode_lokasi=x.kode_lokasi and y.nik='"+this.app._userLog+"' "+			
							"	left join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi and c.kode_flag in ('001','009') "+
							"where c.kode_akun is null and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' "+							
							"union "+
							"select a.kode_akun,a.nama "+
							"from masakun a inner join sju_dokakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.no_dokumen = '"+this.c_jenis.getText()+"' "+
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' "+							
							")a ",																																				
							"select count(a.kode_akun) from ( "+
							"select a.kode_akun,a.nama "+
							"from masakun a "+
							"	inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' "+
							"	inner join relakun_pp x on a.kode_akun=x.kode_akun and a.kode_lokasi=x.kode_lokasi "+
							"	inner join karyawan_pp y on x.kode_pp=y.kode_pp and y.kode_lokasi=x.kode_lokasi and y.nik='"+this.app._userLog+"' "+			
							"	left join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi and c.kode_flag in ('001','009') "+
							"where c.kode_akun is null and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' "+
							"union "+
							"select a.kode_akun,a.nama from masakun a "+
							"inner join sju_dokakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.no_dokumen = '"+this.c_jenis.getText()+"' "+
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' "+
							")a ",
							["a.kode_akun","a.nama"],"where",["Kode","Nama"],false);									
				}
				if (col == 5){
					if (this.app._userStatus == "U") {
						var strSQL1 = "select a.kode_pp, a.nama from pp a where a.kode_pp='"+this.app._kodePP+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'";
						var strSQL2 = "select count(*) from pp a where a.kode_pp='"+this.app._kodePP+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'";
					}
					else {
						var strSQL1 = "select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'";
						var strSQL2 = "select count(*) from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif ='1'";
					}
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							strSQL1,
							strSQL2,
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){					
					this.standarLib.showListData(this, "Daftar Penanggung",sender,undefined, 
							"select kode_vendor, nama  from sju_vendor where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_vendor) from sju_vendor where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_vendor","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 9){					
					this.standarLib.showListData(this, "Daftar Tertanggung",sender,undefined, 
							"select kode_cust,nama from (select distinct a.kode_cust as kode_cust,a.nama as nama from sju_cust a inner join karyawan_pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' union select '-','-') a ",
							"select count(*) from (select distinct a.kode_cust,a.nama from sju_cust a inner join karyawan_pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi = '"+this.app._lokasi+"' union select '-' as kode_cust,'-' as nama) a ",
							["kode_cust","nama"],"where",["Kode","Nama"],false);				
				}
				if (col == 11){					
					this.standarLib.showListData(this, "Daftar COB",sender,undefined, 
							"select kode_tipe, nama  from sju_tipe where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_tipe) from sju_tipe where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_tipe","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 13){					
					this.standarLib.showListData(this, "Daftar Acc. Marketing",sender,undefined, 
							"select kode_pic, nama  from sju_pic where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_pic) from sju_pic where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_pic","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 15){					
					this.standarLib.showListData(this, "Daftar Kegiatan",sender,undefined, 
							"select kode_keg, nama  from sju_keg where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_keg) from sju_keg where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_keg","nama"],"and",["Kode","Nama"],false);				
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
					this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(5,i),"0",floatToNilai(nilai),"0","0","0","0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(3,idx));
					total = total + nilai;
					this.sg2.setCell(3,idx,total);
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

				this.sg2.cells(5,i,floatToNilai(parseFloat(data[1])));
				this.sg2.cells(6,i,floatToNilai(parseFloat(data[2])));
				this.sg2.cells(7,i,floatToNilai(parseFloat(data[3])));
			}
		}

		this.pc1.setActivePage(this.pc1.childPage[2]);				
	},
	doEllipsClick4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar DN",sender,undefined, 
						    "select no_dn,keterangan from sju_dne_m where no_flag='-' and kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from sju_dne_m where no_flag='-' and kode_lokasi = '"+this.app._lokasi+"'",
							["no_dn","keterangan"],"and",["No DN","Keterangan"],false);				
				}
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doChangeCell4: function(sender, col, row){
		if (sender == this.sg4 && col == 0) {
			var strSQL = "select * from sju_dne_m where no_dn = '"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					sender.cells(1,row,line.keterangan);
					sender.cells(2,row,line.jumlah);
					sender.cells(3,row,line.nama_pihak);
				}
				else {
					sender.cells(1,row,"");
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}
			}
		}
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
								this.nama_report="server_report_saku3_sju16_rptGlJurnalBukti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
								this.filter2 ="";
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();							
							this.dataVendor = new portalui_arrayMap();							
							this.dataCust = new portalui_arrayMap();							
							this.dataTipe = new portalui_arrayMap();	
							this.dataPic = new portalui_arrayMap();	
							this.dataPP = new portalui_arrayMap();	
							this.dataKeg = new portalui_arrayMap();														
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
									this.dataVendor.set(line.kode_vendor, line.nama);									
								}
							}
							if (result.result[2]){	    			        
								var line;
								for (var i in result.result[2].rs.rows){
									line = result.result[2].rs.rows[i];
									this.dataCust.set(line.kode_cust, line.nama);
								}
							}
							if (result.result[3]){	    			        
								var line;
								for (var i in result.result[3].rs.rows){
									line = result.result[3].rs.rows[i];
									this.dataTipe.set(line.kode_tipe, line.nama);
								}
							}
							if (result.result[4]){	    			        
								var line;
								for (var i in result.result[4].rs.rows){
									line = result.result[4].rs.rows[i];
									this.dataPic.set(line.kode_pic, line.nama);
								}
							}
							if (result.result[5]){	    			        
								var line;
								for (var i in result.result[5].rs.rows){
									line = result.result[5].rs.rows[i];
									this.dataPP.set(line.kode_pp, line.nama);
								}
							}
							if (result.result[6]){	    			        
								var line;
								for (var i in result.result[6].rs.rows){
									line = result.result[6].rs.rows[i];
									this.dataKeg.set(line.kode_keg, line.nama);
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
			this.sg.clear(1); 
			this.sg2.clear(1); 
			this.sg3.clear(1); 
			this.sg4.clear(1); 
			this.sgUpld.clear(1);
			this.sgFile.clear(1);				
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen as status,a.no_ref1+' - '+a.no_ref2 as no_ref,a.keterangan,a.nilai1 "+
		             "from trans_m a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"'  "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KB' and a.posted ='F' and a.form='KB'";				
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_bukti,line.tgl,line.status,line.no_ref,line.keterangan,floatToNilai(line.nilai1)]); 
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								

				var strSQL = "select * from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);	
						this.c_jenis.setText(line.param3);					
						this.c_status.setText(line.param2);
						this.e_bank.setText(line.no_ref1);
						this.e_dok.setText(line.no_ref2);
						this.e_ket.setText(line.keterangan);						
					}
				}	
				
				var strSQL = "select * from sju_ttd where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
										
						this.cb_buat.setText(line.nik_buat);
						this.cb_periksa.setText(line.nik_periksa);
						this.cb_fiat.setText(line.nik_fiat);
						this.cb_otorisasi.setText(line.nik_oto);
						
					}
				}	
				
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp, "+
							"a.kode_cust,a.no_ref1,a.kode_vendor,a.no_ref2,a.no_ref3,isnull(e.nama,'-') as nama_cust,isnull(f.nama,'-') as nama_vendor,isnull(g.nama,'-') as nama_tipe,isnull(h.nama,'-') as nama_pic, isnull(i.nama,'-') as nama_keg "+
							"from trans_j a "+
							"			 inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"            inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+						
							"            left  join sju_cust e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi "+
							"            left  join sju_vendor f on a.kode_vendor=f.kode_vendor and a.kode_lokasi=f.kode_lokasi "+
							"            left  join sju_tipe g on a.no_ref1=g.kode_tipe and a.kode_lokasi=g.kode_lokasi "+	
							"            left  join sju_pic h on a.no_ref2=h.kode_pic and a.kode_lokasi=h.kode_lokasi "+						
							"            left  join sju_keg i on a.no_ref3=i.kode_keg and a.kode_lokasi=i.kode_lokasi "+						
							"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_vendor,line.nama_vendor,line.kode_cust,line.nama_cust,line.no_ref1,line.nama_tipe,line.no_ref2,line.nama_pic,line.no_ref3,line.nama_keg]);
					}
				} else this.sg.clear(1);

				var data = this.dbLib.getDataProvider( 
							"select a.kode_akun,a.kode_pp,a.saldo,case a.dc when 'D' then a.nilai else -a.nilai end as nilai,a.saldo-a.nilai as sakhir, gar_thn,gar_tw,gar_bulan "+ 
							"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							
							"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='KB' order by a.kode_akun",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.kode_pp,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir),floatToNilai(line.gar_thn),floatToNilai(line.gar_tw),floatToNilai(line.gar_bulan)]);
					}
				} else this.sg2.clear(1);	

				var data = this.dbLib.getDataProvider("select * from sju_dne_m where no_flag = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_dn",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.no_dn,line.keterangan,floatToNilai(line.jumlah),line.nama_pihak]);
					}
				} else this.sg4.clear(1);	


				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);
				
				
			}									
		} catch(e) {alert(e);}
	}
});