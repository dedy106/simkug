window.app_saku3_transaksi_yakes_inves_fRDDevApp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fRDDevApp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fRDDevApp";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval Deviden Reksadana -Akru", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,350,80,100]],
					colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,210,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[235,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_sap = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,222,20],caption:"NIK Post SAP", multiSelection:false, maxLength:10, tag:2,visible:false});											
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2,visible:false});						
		this.cb_plan = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,230,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,readOnly:true,change:[this,"doChange"]});		
		this.e_deviden = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,13,200,20],caption:"Total Deviden", tipeText:ttNilai, text:"0", readOnly:true});												
		this.cb_akru = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,230,20],caption:"No Akru", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});			
		this.e_pph = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,200,20],caption:"Total PPh", tipeText:ttNilai, text:"0", readOnly:true});										
		this.cb_kelola = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,230,20],caption:"Manajer Investasi", maxLength:10, tag:2,readOnly:true});						
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,12,200,20],caption:"Total KasBank", tipeText:ttNilai, text:"0", readOnly:true});				

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,996,259], childPage:["Data Reksadana","File Dok"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:0,				
				colTitle:["Kode RD","Nama","Nilai Deviden","Nilai PPH","Nilai KasBank"],
				colWidth:[[4,3,2,1,0],[100,100,100,240,80]],				
				columnReadOnly:[true,[0,1,3,4],[2]],
				colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],								
				change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});				
				
		this.sgUpld = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
				colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
				colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
				columnReadOnly:[true,[0,1,2,3,4],[]],					
				colFormat:[[3,4],[cfUpload,cfButton]], 
				buttonStyle:[[0],[bsEllips]], 	
				click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
				ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[1],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
				colTitle:["namaFile","status"],
				colWidth:[[1,0],[80,180]],
				readOnly: true,autoAppend:false,defaultRow:1});		
				
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
					
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
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
												
			this.cb_kelola.setSQL("select kode_rdkelola, nama from inv_rdkelola where flag_aktif<>'2'",["kode_rdkelola","nama"],false,["Kode","Nama"],"where","Data MI",true);			
			this.cb_plan.setSQL("select kode_plan, nama from inv_plan",["kode_plan","nama"],false,["Kode","Nama"],"where","Daftar Plan Asset",true);			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PLAN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);																										
				}
			}

			this.cb_sap.setSQL("select a.nik, a.nama from karyawan a inner join sap_nik_post b on a.nik=b.nik "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			var data = this.dbLib.getDataProvider("select nik from sap_nik_post where kode_lokasi ='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];	
				this.cb_sap.setText(line.nik);
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fRDDevApp.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fRDDevApp.implement({
	isiCBAkru: function() {
		this.cb_akru.setSQL("select no_rddev, keterangan from inv_rddev_m where periode<='"+this.e_periode.getText()+"' and no_final='-' and kode_lokasi='"+this.app._lokasi+"'",["no_rddev","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Akru",true);								
	},
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
					"select kode_jenis,nama   from inv_dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and modul ='RD'",
					"select count(kode_jenis) from inv_dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and modul ='RD'",
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
					  sql.add("update inv_rddev_m set no_final='-' where no_rddev='"+this.cb_akru.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");									
					  sql.add("delete from inv_rddev_m where no_rddev = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					  sql.add("delete from inv_rddev_d where no_rddev = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					  sql.add("delete from inv_rddev_j where no_rddev = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					  sql.add("delete from glsap where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					  sql.add("delete from inv_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='RDDEV'");			
					}

					//jurnal balik
					sql.add("update inv_rddev_m set no_final='"+this.e_nb.getText()+"' where no_rddev='"+this.cb_akru.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");									
					
					sql.add("insert into inv_rddev_d(no_rddev,kode_lokasi,kode_rd,nilai_kb,nilai_pph,nilai_dev,akun_dev,akun_pph,no_kas,akun_piutang,jum_lbr,dev_lbr,kode_plan) "+
							"select '"+this.e_nb.getText()+"',kode_lokasi,kode_rd,-nilai_kb,-nilai_pph,-nilai_dev,akun_dev,akun_pph,'X',akun_piutang,-jum_lbr,dev_lbr,kode_plan "+
							"from inv_rddev_d where no_rddev='"+this.cb_akru.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into inv_rddev_j(no_rddev,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"',no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,nik_user,tgl_input "+
							"from inv_rddev_j where no_rddev='"+this.cb_akru.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					//jurnl approval		
					sql.add("insert into inv_rddev_m(no_rddev,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,kode_drk,kode_rdkelola,periode,nilai,nik_buat,tgl_input,nik_user,no_kas,progress,no_app1,modul,posted, nik_app,kode_plan,no_final,tgl_cum,nilai_lbr,mode) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.cb_kelola.getText()+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','-','0','-','APPDEV','F', '"+this.cb_sap.getText()+"','"+this.cb_plan.getText()+"','"+this.cb_akru.getText()+"','"+this.dp_d1.getDateString()+"',0,'-')");																					
					sql.add("insert into inv_rddev_j(no_rddev,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiuGL+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_deviden.getText())+",'"+this.kodepp+"','-','"+this.app._lokasi+"','APPDEV','PIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(4,i) != "0"){															
							var data = this.dbLib.getDataProvider("select a.akun_dev from inv_rdklp a inner join inv_rd b on a.kode_rdklp=b.kode_rdklp where b.kode_rd='"+this.sg.cells(0,i)+"'",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line = data.rs.rows[0];							
								var akunDev = line.akun_dev;												
							}
							
							sql.add("insert into inv_rddev_d(no_rddev,kode_lokasi,kode_rd,nilai_kb,nilai_pph,nilai_dev,akun_dev,akun_pph,no_kas,akun_piutang,jum_lbr,dev_lbr,kode_plan) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(2,i))+",'"+akunDev+"','"+this.akunPPh+"','-','"+this.akunPiuGL+"',0,0,'"+this.cb_plan.getText()+"')");
						
							sql.add("insert into inv_rddev_j(no_rddev,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+akunDev+"','"+this.e_ket.getText()+" - "+this.sg.cells(0,i)+"','C',"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','APPDEV','DEVIDEN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");	
						
						}
					}
					
					sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap,kode_rek,no_payment,paymetod)  "+
							"select no_rddev,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,'IDR',1,nilai,tgl_input,nik_user,'-','-','-','-','-','-','-','-','-','-' "+
							"from inv_rddev_j where no_rddev='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					//dokumen						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into inv_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','RDDEV','"+this.e_nb.getText()+"')");															
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
					this.sg3.clear(1);	
					this.sgUpld.clear(1);
					this.sgFile.clear(1);		
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.doClick(this.i_gen);
					this.pc2.setActivePage(this.pc2.childPage[0]);						
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					this.isiCBAkru();
				break;
			case "simpan" :					
			case "ubah" :									
				this.preView = "1";
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i) && nilaiToFloat(this.sg.cells(4,i)) < 0){
						var j = i+1;
						system.alert(this,"Transaksi tidak valid.","Nilai Kas tidak boleh kurang dari nol (Baris : "+j+").");
						return false;
					}
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
					sql.add("update inv_rddev_m set no_final='-' where no_rddev='"+this.cb_akru.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");									
					sql.add("delete from inv_rddev_m where no_rddev = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_rddev_d where no_rddev = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from inv_rddev_j where no_rddev = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");															
					sql.add("delete from glsap where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from inv_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='RDDEV'");								
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
		this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
		if (this.stsSimpan == 1) {
			this.isiCBAkru();
			this.doClick(this.i_gen);
		}
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0){
				this.sg.clear(1); 				
				this.sg3.clear(1);
				this.sgUpld.clear(1);
				this.sgFile.clear(1);			
				this.isiCBAkru();
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_rddev_m","no_rddev",this.app._lokasi+"-ARDV"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
		}	
	},		
	doChange: function(sender) {
		if (sender == this.cb_plan && this.cb_plan.getText()!="") {					
			var data = this.dbLib.getDataProvider("select kode_param,flag from inv_rd_param where kode_plan = '"+this.cb_plan.getText()+"' and kode_param in ('RDPPHM','RDPIUGL','DRKRDJ','PPINV')",true);						
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_param == "RDPIUGL") this.akunPiuGL = line.flag; 																		
					if (line.kode_param == "PPINV") this.kodepp = line.flag;								
					if (line.kode_param == "DRKRDJ") this.cb_drk.setText(line.flag);
					if (line.kode_param == "RDPPHM") this.akunPPh = line.flag;	
				}
			}
		}
		if (sender == this.cb_akru && this.cb_akru.getText()!="" && this.stsSimpan==1) {			
			var strSQL = "select * from inv_rddev_m where no_rddev= '"+this.cb_akru.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){									
					this.cb_plan.setText(line.kode_plan);										
					this.cb_kelola.setText(line.kode_rdkelola);					
				}
			}
			var strSQL = "select b.kode_rd,b.nama,a.nilai_kb,a.nilai_pph,a.nilai_dev "+
						 "from inv_rddev_d a inner join inv_rd b on a.kode_rd=b.kode_rd "+
						 "where a.no_rddev='"+this.cb_akru.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){ 
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_rd,line.nama,floatToNilai(line.nilai_dev),floatToNilai(line.nilai_pph),floatToNilai(line.nilai_kb)]);
				}
			} else this.sg.clear(1);	 
		}
	},
	doChangeCell: function(sender, col, row){		
		if (col == 2 || col == 3) {	
		    if (this.sg.cells(2,row) != "" && this.sg.cells(3,row)) {
				var nilaiKas = nilaiToFloat(this.sg.cells(2,row)) - nilaiToFloat(this.sg.cells(3,row));			
				this.sg.cells(4,row,floatToNilai(nilaiKas));			
				this.sg.validasi();
			}
		}
	},
	doNilaiChange: function(){
		try{
			var kas = dev = pph = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(2,i) != ""){
					dev += nilaiToFloat(this.sg.cells(2,i));				
					pph += nilaiToFloat(this.sg.cells(3,i));				
					kas += nilaiToFloat(this.sg.cells(4,i));				
				}
			}			
			this.e_deviden.setText(floatToNilai(dev));
			this.e_pph.setText(floatToNilai(pph));
			this.e_total.setText(floatToNilai(kas));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
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
								//this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
			this.sg.clear(1);
			this.sg3.clear(1);		
			this.sgUpld.clear(1);
			this.sgFile.clear(1);			
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.doClick(this.i_gen);
			this.pc2.setActivePage(this.pc2.childPage[0]);						
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.isiCBAkru();		
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){														
		var strSQL = "select a.no_rddev,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from inv_rddev_m a "+
					 "where a.modul='APPDEV' and a.posted = 'F' and a.progress in ('0','M') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
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
			this.sg3.appendData([line.no_rddev,line.tgl,line.keterangan,line.nilai,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);	
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select * from inv_rddev_m where no_rddev= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.cb_akru.setSQL("select no_rddev, keterangan from inv_rddev_m where no_rddev='"+line.no_final+"' and kode_lokasi='"+this.app._lokasi+"'",["no_rddev","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Akru",true);								
						this.cb_akru.setText(line.no_final);																																							
						this.dp_d1.setText(line.tanggal);											
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);
						this.cb_plan.setText(line.kode_plan);
						this.cb_drk.setText(line.kode_drk);						
						this.cb_kelola.setText(line.kode_rdkelola);												
					}
				}
				var strSQL = "select b.kode_rd,b.nama,a.nilai_kb,a.nilai_pph,a.nilai_dev "+
							 "from inv_rddev_d a inner join inv_rd b on a.kode_rd=b.kode_rd "+
							 "where a.no_rddev='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jum_lbr>0";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){ 
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_rd,line.nama,floatToNilai(line.nilai_dev),floatToNilai(line.nilai_pph),floatToNilai(line.nilai_kb)]);
					}
				} else this.sg.clear(1);	
				
				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from inv_dok a inner join inv_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
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