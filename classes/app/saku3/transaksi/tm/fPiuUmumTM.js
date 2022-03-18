window.app_saku3_transaksi_tm_fPiuUmumTM = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tm_fPiuUmumTM.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tm_fPiuUmumTM";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Piutang Umum", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Customer","No Dokumen","Deskripsi","Total"],
					colWidth:[[5,4,3,2,1,0],[100,250,180,250,80,100]],colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,300,20],caption:"No Dokumen", maxLength:50});
		this.e_fp = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,300,20],caption:"No Faktur Pajak", maxLength:50});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,500,20],caption:"Deskripsi", maxLength:150});						
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});						
		this.c_stsppn = new saiCB(this.pc2.childPage[0],{bound:[780,16,210,20],caption:"Status PPN",items:["PPN","NON"], readOnly:true,tag:9,change:[this,"doChange"]});
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});								
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,15,210,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});										
		this.cb_cust = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Customer",multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,19,210,20],caption:"PPN", tag:1, tipeText:ttNilai, text:"0", readOnly:true});				
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Akun Piutang", multiSelection:false, maxLength:10, tag:2});										
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,13,210,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,10,995,212], childPage:["Data Item Jurnal","Data Anggaran","File Dok"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
					colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
					colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,200,80,200,80]],
					readOnly:true,colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		//this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});

		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:0,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[2],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
			colTitle:["namaFile","status"],
			colWidth:[[1,0],[80,180]],
			readOnly: true,autoAppend:false,defaultRow:1});
			
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
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);			
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag = '003' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun Piutang",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Mengetahui",true);									
						
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','HUTPPN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;			
				}
			}		
			
			var sql = new server_util_arrayList();			
			sql.add("select a.kode_akun,a.nama from masakun a "+
					"inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' "+
					"inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='"+this.app._kodePP+"' "+
					"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");						
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.flag_aktif='1' and b.nik='"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);		

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tm_fPiuUmumTM.extend(window.childForm);
window.app_saku3_transaksi_tm_fPiuUmumTM.implement({
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
						sql.add("delete from piutang_m where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from piutang_j where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from tm_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into piutang_m(no_piutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_project,kode_cust,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_piutang,posted,nilai_ppn,nilai_pph,no_fp) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.cb_cust.getText()+"','IDR',1,'"+this.cb_app.getText()+"','"+this.cb_pp.getText()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_akun.getText()+"','F',"+parseNilai(this.e_ppn.getText())+",0,'"+this.e_fp.getText()+"')");								
					sql.add("insert into piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PIUUMUM','PIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					
					if (nilaiToFloat(this.e_ppn.getText()) != 0) {
						sql.add("insert into piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.akunPPN+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PIUUMUM','HUTPPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					}
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){															
								var j = i+1;
								sql.add("insert into piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"','IDR',1,"+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','-','"+this.app._lokasi+"','PIUUMUM','BBN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");								
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(5,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(5,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(5,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','JU','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(4,i))+","+nilai+")");
							}
						}
					}

					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into tm_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+i+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','"+this.e_nb.getText()+"')");															
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
					this.sgUpld.clear(1); this.sgFile.clear(1);
					setTipeButton(tbAllFalse);
					this.doClick();
				break;
			case "simpan" :																						
			case "ubah" :																						
				this.preView = "1";				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();				
										
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
					sql.add("delete from piutang_m where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from piutang_j where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tm_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);			
		/*
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		*/
		if (this.stsSimpan == 1) this.doClick();						
	},		
	doChange:function(sender){
		if (sender == this.c_stsppn && this.c_stsppn.getText() != "") {
			this.sg.validasi();
		}
		if (sender == this.cb_cust && this.cb_cust.getText()!="" && this.stsSimpan==1) {
			var strSQL = "select akun_piutang "+						 
						 "from cust where kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.cb_akun.setText(line.akun_piutang);					
				} 
			}
		}
	},	
	doClick:function(sender){		
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
				this.sgUpld.clear(1); this.sgFile.clear(1);				
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"piutang_m","no_piutang",this.app._lokasi+"-PU"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}
	},	
	doChangeCell: function(sender, col, row){
		if (col == 2 || col == 4) {			
			if (this.sg.cells(2,row) != "" && this.sg.cells(4,row) != "") {							
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
					if (this.sg.cells(2,i).toUpperCase() == "C") tot += nilaiToFloat(this.sg.cells(4,i));
					else tot -= nilaiToFloat(this.sg.cells(4,i));									
				}
			}						
			this.e_nilai.setText(floatToNilai(tot));			
			if (this.c_stsppn.getText() == "PPN") var ppn = Math.round(tot * 0.1);			
			else ppn = 0;
			this.e_ppn.setText(floatToNilai(ppn));			
			this.e_total.setText(floatToNilai(tot + nilaiToFloat(this.e_ppn.getText())));
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
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
			case 5 : 
					if ((this.sg.cells(5,row) == "") && (row > 0)) {
						this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					}
					else {
						this.sg.setCell(5,row,this.app._kodePP);
						this.sg.setCell(6,row,this.app._namaPP);
					}
				break;
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a "+
						    "inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' "+
						    "inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='"+this.app._kodePP+"' "+
						    "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							
							"select count(*) from ( "+
							"select a.kode_akun from masakun a "+
							"inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '034' "+
							"inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='"+this.app._kodePP+"' "+
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"') a ",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.flag_aktif='1' and b.nik='"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.flag_aktif='1' and b.nik='"+this.app._userLog+"' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
				}						
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	/*
	doHitungGar: function(){		
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(5,i) != "-"){
				if (this.sg.cells(2,i) == "D") nilai = nilaiToFloat(this.sg.cells(4,i));
				else nilai = nilaiToFloat(this.sg.cells(4,i)) * -1;
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j) && this.sg.cells(5,i) == this.sg2.cells(2,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(1,i),this.sg.cells(5,i),this.sg.cells(6,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(5,idx));
					total = total + nilai;
					this.sg2.setCell(5,idx,total);
				}
			}
		}
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','-','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','-','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);			
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(4,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(5,i));
				this.sg2.cells(6,i,floatToNilai(sls));
			}
		}
		
	},	
	*/
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
					case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_tm_rptPiutangJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_piutang='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); 	this.sg2.clear(1); this.sg3.clear(1); 
			this.sgUpld.clear(1); this.sgFile.clear(1);												
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select distinct a.no_piutang,convert(varchar,a.tanggal,103) as tgl,a.kode_cust+'-'+b.nama as cust,a.no_dokumen,a.keterangan,a.nilai+a.nilai_ppn as total "+
		             "from piutang_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 "                 left join piubayar_d c on a.no_piutang=c.no_piutang and a.kode_lokasi=c.kode_lokasi "+
					 "where c.no_bukti is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F'";						
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
			this.sg3.appendData([line.no_piutang,line.tgl,line.cust,line.no_dokumen,line.keterangan,floatToNilai(line.total)]); 
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
								
				var strSQL = "select a.tanggal,a.periode,a.no_dokumen,a.keterangan,a.kode_pp,a.akun_piutang,a.nik_app,a.kode_cust,c.nama as nama_cust,a.nilai_ppn,a.no_fp "+						 
							 "from piutang_m a inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_piutang='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);					
						this.e_dok.setText(line.no_dokumen);
						this.e_fp.setText(line.no_fp);
						this.e_ket.setText(line.keterangan);
						this.cb_pp.setText(line.kode_pp);
						this.cb_app.setText(line.nik_app);						
						this.cb_cust.setText(line.kode_cust,line.nama_cust);					
						this.cb_akun.setText(line.akun_piutang);
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));
						
						if (parseFloat(line.nilai_ppn) != 0) {
							this.c_stsppn.setText("PPN");							
						}
						else {
							this.c_stsppn.setText("NON");																					
						}
					} 
				}
				strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
						 "from piutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						 "             		 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+												 
						 "where a.jenis = 'BBN' and a.no_piutang = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];							
						this.sg.appendData([line2.kode_akun,line2.nama_akun,line2.dc,line2.keterangan,floatToNilai(line2.nilai),line2.kode_pp,line2.nama_pp]);
					}
				} else this.sg.clear(1);						
				this.sg.validasi();

				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from tm_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
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