window.app_saku3_transaksi_tarbak_simlog_fPbLogADK = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simlog_fPbLogADK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_simlog_fPbLogADK";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Permohonan Bayar UM/ADK", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Nilai","Pilih"],
					colWidth:[[5,4,3,2,1,0],[70,100,300,200,80,100]],
					colFormat:[[4,5],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[5],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});						
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[790,12,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[890,12,98,18]}); 		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,450,20],caption:"No Dokumen", maxLength:50});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,338], childPage:["Data Permohonan","Otorisasi","Cattn. Memo","File Dok"]});				
		this.cb_spk = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Data SPK", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Kode Mitra", readOnly:true,tag:4});				
		this.e_namavendor = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,16,450,20],caption:"Nama Mitra", readOnly:true,tag:4});				
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Bank", readOnly:true,tag:4});				
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,17,450,20],caption:"No Rekening", readOnly:true,tag:4});				
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,450,20],caption:"Cabang", readOnly:true,tag:4});				
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,18,450,20],caption:"Nama Rekening", readOnly:true,tag:4});								
		this.e_nspk = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Nilai SPK", tag:4, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Saldo SPK", tag:4, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_bruto = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Nilai PB", tag:4, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Nilai PPN", tag:4, tipeText:ttNilai, text:"0", change:[this,"doChange"]});				
		this.i_ppn = new portalui_imageButton(this.pc1.childPage[0],{bound:[235,14,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doPPN"]});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Total PB", tag:4, tipeText:ttNilai, text:"0",readOnly:true});				

		this.cb_app = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		this.cb_tahu = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});						
		
		this.sgctt = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
					colTitle:["Catatan"],
					colWidth:[[0],[100]],					
					readOnly:true,autoAppend:false,defaultRow:1});

		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, 
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload","DownLoad"],
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
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
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
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPNM','LOGADK','HUTLOG') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																							
					if (line.kode_spro == "LOGADK") this.akunADK = line.flag;			
					if (line.kode_spro == "HUTLOG") this.akunHutang = line.flag;
					if (line.kode_spro == "PPNM") this.akunPPN = line.flag;							
				}
			}						
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
			                   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);						
			this.cb_tahu.setSQL("select a.nik, a.nama from karyawan a "+
			                   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);						
			   
			this.doLoadCtt(this.e_nb.getText());
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simlog_fPbLogADK.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simlog_fPbLogADK.implement({
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
					this.standarLib.showListData(this, "Daftar Jenis Dok",sender,undefined, 
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
			if (col === 4)
				window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
	isiSPK : function() {
		this.cb_spk.setSQL("select a.no_spk, a.keterangan "+
						   "from log_spk_m a "+
						   "     left join ("+
						   "	     select no_spk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) adk "+
						   "         from log_pbadk_d where kode_lokasi='"+this.app._lokasi+"' group by no_spk,kode_lokasi "+
						   "	  ) b on a.no_spk=b.no_spk and a.kode_lokasi=b.kode_lokasi "+
						   "where a.no_ba='-' and a.nilai > isnull(b.adk,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "
						   ,["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data SPK",true);		
	},	
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,4])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from log_pbadk_d where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}								
					
					sql.add("insert into pbh_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_tahu,no_hutang,no_app,no_spb,no_ver,kode_bidang,kode_loktuj,nilai_final,posted,kode_proyek,no_app2,no_app3,no_fiat,no_kas,akun_hutang) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'PBADK','0','"+this.app._kodePP+"','"+this.cb_app.getText()+"','"+this.cb_tahu.getText()+"','-','-','-','-','"+this.app._kodePP+"','"+this.app._lokasi+"',"+nilaiToFloat(this.e_nilai.getText())+",'X','-','-','-','-','-','-')");
					sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunHutang+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBADK','HUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
					sql.add("insert into pbh_rek(no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','PBADK','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.e_bank.getText()+"','"+this.e_namavendor.getText()+"',"+nilaiToFloat(this.e_bruto.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_nilai.getText())+")");
					
					sql.add("insert into log_pbadk_d(no_pb,no_spk,kode_lokasi,periode,dc,nilai,no_bast,akun_adk) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_spk.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','D',"+nilaiToFloat(this.e_bruto.getText())+",'-','"+this.akunADK+"')");
							
					//no_dokumen--> '-', supaya tidak dianggap jurnal hutang bast
					sql.add("insert into hutang_m(no_hutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_project,kode_vendor,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_hutang,posted,nilai_ppn,modul,no_ref) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.e_vendor.getText()+"','IDR',1,'"+this.app._userLog+"','"+this.app._kodePP+"',"+parseNilai(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.akunHutang+"','F',0,'LOGADK','"+this.cb_spk.getText()+"')");

					sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_spk.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunADK+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_bruto.getText())+","+parseNilai(this.e_bruto.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGADK','ADK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_spk.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPPN+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGADK','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");					
					sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_spk.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunHutang+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGADK','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					
					//dokumen						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','PBADK','"+this.e_nb.getText()+"')");															
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
					this.standarLib.clearByTag(this, new Array("0","1","4"),this.e_nb);
					this.sg3.clear(1); 
					this.sgUpld.clear(1);
					this.sgFile.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					setTipeButton(tbAllFalse);					
					this.stsSimpan = 1;								
					this.isiSPK();
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";												
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																					
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai PB melebihi Saldo.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Bayar tidak boleh nol atau kurang.");
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
					sql.add("delete from pbh_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from pbh_rek where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from log_pbadk_d where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");															
					sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		
		if (this.stsSimpan == 1) {
			this.doClick();		
			this.isiSPK();
		}			
	},
	doChange:function(sender){
		try{
			if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();					
			if (sender == this.cb_spk && this.cb_spk.getText() != "") {
				var strSQL = "select b.kode_vendor,b.nama,b.bank,b.cabang,b.no_rek,b.nama_rek,a.nilai - isnull(c.adk,0) as saldo,a.nilai "+
							"from log_spk_m a "+
							"  inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
							"  left join ("+
							"			select no_spk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) adk "+
							"    		from log_pbadk_d where kode_lokasi='"+this.app._lokasi+"' and no_pb<>'"+this.e_nb.getText()+"' group by no_spk,kode_lokasi "+
							"			) c on a.no_spk=c.no_spk and a.kode_lokasi=c.kode_lokasi "+
							"where a.no_spk='"+this.cb_spk.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_vendor.setText(line.kode_vendor);
						this.e_namavendor.setText(line.nama);
						this.e_bank.setText(line.bank);
						this.e_norek.setText(line.no_rek);
						this.e_cabang.setText(line.cabang);
						this.e_namarek.setText(line.nama_rek);
						this.e_nspk.setText(floatToNilai(line.nilai));
						this.e_saldo.setText(floatToNilai(line.saldo));
					}
				}
			}	
			
			if ((sender == this.e_bruto || sender == this.e_ppn) && this.e_bruto.getText()!="" && this.e_ppn.getText()!="") {			
				var pb = nilaiToFloat(this.e_bruto.getText()) + nilaiToFloat(this.e_ppn.getText());
				this.e_nilai.setText(floatToNilai(pb));
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doPPN: function() {
		if (this.e_bruto.getText() !="") {
			var ppn = Math.round(nilaiToFloat(this.e_bruto.getText()) * 0.1);
			this.e_ppn.setText(floatToNilai(ppn));
		}
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {											
					this.sg3.clear(1); 
					this.sgUpld.clear(1);
					this.sgFile.clear(1);
					this.standarLib.clearByTag(this, new Array("4"),this.e_nb);					
					this.isiSPK();
				}					
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pbh_pb_m","no_pb",this.app._lokasi+"-PB"+this.e_periode.getText().substr(2,4)+".","0000"));										
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}		
		}
		catch(e) {
			alert(e);
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
								this.nama_report="server_report_saku3_hutang_rptPbForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","4"),this.e_nb);
			this.sg3.clear(1); 
			this.sgUpld.clear(1);
			this.sgFile.clear(1);	
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			setTipeButton(tbAllFalse);
			this.stsSimpan = 1;				
			this.progSeb ="";
			this.isiSPK();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){				
		var strSQL = "select a.no_pb,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai "+
		             "from pbh_pb_m a inner join hutang_m b on a.no_pb=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where b.posted='F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'PBADK' and a.progress in ('0','V') "+
					 "and a.kode_pp in (select kode_pp from karyawan_pp where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"') "+
					 "order by a.no_pb";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);							
		this.dataHutang();				
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_pb,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 5) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));	
				this.doLoadCtt(this.e_nb.getText());			
				
				var strSQL = "select a.keterangan,a.no_dokumen,a.modul,a.due_date,a.tanggal,a.nik_tahu,a.nik_app,b.no_spk,c.bruto,c.pajak "+
							 "from pbh_pb_m a "+
							 "inner join log_pbadk_d b on a.no_pb = b.no_pb and a.kode_lokasi=b.kode_lokasi "+								 
							 "inner join pbh_rek c on a.no_pb = c.no_bukti and a.kode_lokasi=c.kode_lokasi "+								 					 
							 "where a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.due_date);
						this.cb_app.setText(line.nik_app);
						this.cb_tahu.setText(line.nik_tahu);		
						this.cb_spk.setSQL("select a.no_spk, a.keterangan from log_spk_m a where a.no_spk='"+line.no_spk+"' and a.kode_lokasi='"+this.app._lokasi+"' ",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data SPK",true);		
						this.cb_spk.setText(line.no_spk);
						this.e_bruto.setText(floatToNilai(line.bruto));									
						this.e_ppn.setText(floatToNilai(line.pajak));									
					}
				}	

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
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal "+
						 "from pbh_ver_m "+
						 "where no_bukti='"+kode+"' and kode_lokasi='"+this.app._lokasi+"' "+
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
								  "where no_bukti='"+kode+"' and tanggal='"+line.tanggal+"' and kode_lokasi='"+this.app._lokasi+"' "+
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