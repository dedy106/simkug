window.app_saku3_transaksi_sju16_fPbNoted = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fPbNoted.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fPbNoted";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Pembayaran", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Permohonan","List Permohonan"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:8,tag:9,
		            colTitle:["No Bukti","Tanggal","Modul","No Dokumen","Deskripsi","Progress","Nilai Curr","Curr"],
					colWidth:[[7,6,5,4,3,2,1,0],[50,100,60,350,180,80,80,100]],
					colFormat:[[6],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});						
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,20,450,20],caption:"No Dokumen", maxLength:50});								
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[790,20,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[890,20,100,18]}); 		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_totalCurr = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,11,200,20],caption:"Total [Curr]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.c_curr = new saiCB(this.pc2.childPage[0],{bound:[20,20,155,20],caption:"Mt Uang - Kurs",readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this.pc2.childPage[0],{bound:[180,20,40,20],caption:"Kurs", tag:2, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"]});						
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,20,200,20],caption:"Total [IDR]", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bGen = new button(this.pc2.childPage[0],{bound:[650,20,98,18],caption:"Otorisasi",click:[this,"doLoadDefOto"]});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,315], childPage:["Item Pengajuan","Data Anggaran","Otorisasi","Jurnal++","Data Nominatif","File Dok"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:0,
		            colTitle:["ID Beban","Nama Beban","Keterangan","Nilai [Curr]","Kode PP","Nama PP"],
					colWidth:[[5,4,3,2,1,0],[150,80,100,270,200,80]],					
					columnReadOnly:[true,[1,5],[0,2,3,4]],
					buttonStyle:[[0,4],[bsEllips,bsEllips]], 
					colFormat:[[3],[cfNilai]],checkItem: true,
					cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:9,
					colTitle:["Kode Akun","Kode PP","Sisa Budget (Thn)","Tot Transaksi","Saldo Akhir", "Budget Thn","Budget TW","Budget Bulan"],
					colWidth:[[7,6,5,4,3,2,1,0],[120,120,120,120,120,120,100,100]],
					colHide:[[4],[true]],
					readOnly:true,colFormat:[[2,3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.cb_pp = new saiCBBL(this.pc1.childPage[2],{bound:[20,10,220,20],caption:"PP / Unit", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});								
		this.cb_buat = new saiCBBL(this.pc1.childPage[2],{bound:[20,11,220,20],caption:"NIK Pengaju", multiSelection:false, maxLength:10, tag:2});						
		this.cb_atasan = new saiCBBL(this.pc1.childPage[2],{bound:[20,15,220,20],caption:"NIK Atasan", multiSelection:false, maxLength:10, tag:2});								
		this.e_spasi = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,99,200,20],caption:"", tag:1, readOnly:true, visible:false, tag:7, text:""});				

		this.cb_app1 = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"NIK VP Finance", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,13,220,20],caption:"NIK DIRKUG", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app3 = new saiCBBL(this.pc1.childPage[2],{bound:[20,14,220,20],caption:"NIK DIRUT", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app4 = new saiCBBL(this.pc1.childPage[2],{bound:[20,15,220,20],caption:"NIK Treasury", multiSelection:false, maxLength:10, tag:2});						
		
		this.sg4 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,
					colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai [Curr]","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter4"],ellipsClick:[this,"doEllipsClick4"],change:[this,"doChangeCell4"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});		

		this.c_jenis = new saiCB(this.pc1.childPage[4],{bound:[20,11,200,20],caption:"Jenis DN",items:["ENTERTN","PROMOSI","NON-DN"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_dn = new saiCBBL(this.pc1.childPage[4],{bound:[20,10,220,20],caption:"No DN", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});								
		this.e_nilaidn = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,15,200,20],caption:"Nilai DN", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				

		this.sgUpld = new saiGrid(this.pc1.childPage[5],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[5],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[4],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[4].rearrangeChild(10, 23);	
			
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
		
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP/Unit",true);			
			this.cb_pp.setText(this.app._kodePP);
			
			this.cb_app1.setSQL("select a.nik, a.nama from karyawan a inner join sju_oto b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.status='VPFIN' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app2.setSQL("select a.nik, a.nama from karyawan a inner join sju_oto b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.status='DIRKUG' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' union select '-' as nik,'-' as nama",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app3.setSQL("select a.nik, a.nama from karyawan a inner join sju_oto b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.status='DIRUT' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'  union select '-' as nik,'-' as nama",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app4.setSQL("select a.nik, a.nama from karyawan a inner join sju_oto b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.status='MANTS' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			

			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '048' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");									
			if (this.app._userStatus == "A") sql.add("select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");			
			else sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);
			
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}			
			this.c_curr.setText("IDR");
			this.c_jenis.setText("NON-DN");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fPbNoted.extend(window.childForm);
window.app_saku3_transaksi_sju16_fPbNoted.implement({	
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
	isiNIKpp: function() { 		
		this.cb_buat.setSQL("select nik, nama from karyawan where kode_pp ='"+this.cb_pp.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);																													
		//this.cb_atasan.setSQL("select distinct a.nik, a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.cb_pp.getText()+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
		this.cb_atasan.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
	},
	doLoadDefOto: function(sender,totalRow){	
		this.cb_app2.setText("","");
		this.cb_app3.setText("","");

		var data = this.dbLib.getDataProvider(
				   "select a.nik,a.status from sju_oto a where ("+nilaiToFloat(this.e_total.getText())+" between a.awal and a.akhir) and a.kode_lokasi='"+this.app._lokasi+"' and a.flag_def='1' "+
				   "union "+
				   "select a.nik,a.status from sju_oto a where (a.akhir < "+nilaiToFloat(this.e_total.getText())+") and a.kode_lokasi='"+this.app._lokasi+"' and a.flag_def='1' "
				   ,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				if (line.status == "VPFIN") this.cb_app1.setText(line.nik);
				if (line.status == "DIRKUG") this.cb_app2.setText(line.nik);
				if (line.status == "DIRUT") this.cb_app3.setText(line.nik);
				if (line.status == "MANTS") this.cb_app4.setText(line.nik);
			}
		} 

		if (this.cb_app2.getText() == "") this.cb_app2.setText("-","-");
		if (this.cb_app3.getText() == "") this.cb_app3.setText("-","-");

		this.pc1.setActivePage(this.pc1.childPage[2]);	
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
						sql.add("delete from sju_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update sju_dne_m set no_pb='-' where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("update sju_dnp_m set no_pb='-' where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from pbh_dok where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}								
					
					var vProg = "0";
							
					if (this.c_jenis.getText() == "ENTERTN") {
						sql.add("update sju_dne_m set no_pb='"+this.e_nb.getText()+"' where no_dn = '"+this.cb_dn.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						var noDN = this.cb_dn.getText();
					}
					if (this.c_jenis.getText() == "PROMOSI") {
						sql.add("update sju_dnp_m set no_pb='"+this.e_nb.getText()+"' where no_dn = '"+this.cb_dn.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						var noDN = this.cb_dn.getText();
					}
					if (this.c_jenis.getText() == "NON-DN") var noDN = "-";

					sql.add("insert into sju_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai_curr,nilai,kode_curr,kurs,modul,progress,kode_pp, nik_buat,nik_atasan, nik_app1,nik_app2,nik_app3,nik_app4,  no_ver,no_atasan,no_app1,no_app2,no_app3,no_app4,no_kas,jenis_dn,no_dn) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_totalCurr.getText())+","+nilaiToFloat(this.e_total.getText())+",'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'PB','"+vProg+"','"+this.cb_pp.getText()+"', '"+this.cb_buat.getText()+"','"+this.cb_atasan.getText()+"','"+this.cb_app1.getText()+"','"+this.cb_app2.getText()+"','"+this.cb_app3.getText()+"','"+this.cb_app4.getText()+"','-','-','-','-','-','-','-','"+this.c_jenis.getText()+"','"+noDN+"')");
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){			
								var nilaiIDR = nilaiToFloat(this.sg1.cells(3,i)) * nilaiToFloat(this.e_kurs.getText());					
								sql.add("insert into sju_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai_curr,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,nilai) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','D',"+nilaiToFloat(this.sg1.cells(3,i))+",'"+this.sg1.cells(4,i)+"','-','"+this.app._lokasi+"','PBBAU','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiIDR+")");										
							}
						}
					}
					
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){			
								var nilaiIDR = nilaiToFloat(this.sg4.cells(4,i)) * nilaiToFloat(this.e_kurs.getText());					
								sql.add("insert into sju_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai_curr,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs,nilai) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg4.cells(0,i)+"','"+this.sg4.cells(3,i)+"','"+this.sg4.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg4.cells(4,i))+",'"+this.sg4.cells(5,i)+"','-','"+this.app._lokasi+"','PBBAU','BEBAN2','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+","+nilaiIDR+")");										
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
										"('"+this.e_nb.getText()+"','PB','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(2,i))+","+nilai+","+parseNilai(this.sg2.cells(5,i))+","+parseNilai(this.sg2.cells(6,i))+","+parseNilai(this.sg2.cells(7,i))+",'-','-','-')");
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
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+i+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','PBBAU','"+this.e_nb.getText()+"')");															
						}	
					}	

					//histori user
					sql.add("insert into sju_pb_user (no_pb,kode_lokasi,nik_user,tgl_input) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate())");
					

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
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1); 
					this.sgUpld.clear(1);
					this.sgFile.clear(1);		
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.pc1.setActivePage(this.pc1.childPage[0]);							
					this.isiNIKpp();					
					setTipeButton(tbAllFalse);										
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";												
				this.sg1.validasi();	
				this.sg4.validasi();		
				this.doHitungGar();

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
				}

				for (var i=0;i < this.sg1.getRowCount();i++){					
					if (!this.sg1.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg1.getColCount();j++){
							if (this.sg1.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Pengajuan.");
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
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Jurnal++.");
							return false;
						}
					}														
				}			
					
				if (this.c_jenis.getText() != "NON-DN") {
					if (nilaiToFloat(this.e_total.getText()) != nilaiToFloat(this.e_nilaidn.getText())) {
						system.alert(this,"Transaksi tidak valid.","Total tidak sama dengan Nilai DN.");
						return false;						
					}	
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.standarLib.doCekPeriode(this.dbLib,"KB",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (KB - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				} 
				else 
				this.simpan();
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
					sql.add("delete from sju_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from sju_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from sju_pb_user where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update sju_dne_m set no_pb='-' where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("update sju_dnp_m set no_pb='-' where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											
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

		if (this.stsSimpan == 1) {
			var d = new Date();
			var d1 = d.strToDate(this.dp_d1.getText());
			var d2 = d1.DateAdd("d",14);			
			this.dp_d2.setText(d2.getDateStr());
			
			this.doClick();		
		}
	},
	doChange:function(sender){
		if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();	
		
		if (sender == this.c_curr) {
			if (this.c_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); this.e_kurs.setText("1"); this.sg1.validasi();
			}
			else {
				this.e_kurs.setText("0");									
				this.e_kurs.setReadOnly(false); 
				this.sg1.validasi();
				this.sg4.validasi();
			}
		}

		if (sender == this.e_kurs) {
			this.sg1.validasi();
			this.sg4.validasi();
		}

		if (sender == this.cb_pp && this.cb_pp.getText()!="" && this.stsSimpan==1) {			
			this.isiNIKpp();
			this.cb_buat.setText(this.app._userLog);
		}

		if (sender == this.c_jenis && this.c_jenis.getText()!="") {
			if (this.c_jenis.getText() == "NON-DN") {
				this.cb_dn.setTag("9");
				this.e_nilaidn.setTag("9");
				this.cb_dn.setText("","");
				this.e_nilaidn.setText("0");
			}
			else {
				this.cb_dn.setTag("1");
				this.e_nilaidn.setTag("1");
				this.cb_dn.setText("","");
				this.e_nilaidn.setText("0");

				if (this.c_jenis.getText() == "ENTERTN") {					
					if (this.stsSimpan==1) this.cb_dn.setSQL("select no_dn, keterangan from sju_dne_m where no_pb='-' and kode_lokasi='"+this.app._lokasi+"'",["no_dn","keterangan"],false,["No DN","Deskripsi"],"and","Data DN",true);			
					else this.cb_dn.setSQL("select no_dn, keterangan from sju_dne_m where no_pb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_dn","keterangan"],false,["No DN","Deskripsi"],"and","Data DN",true);			
				}
				if (this.c_jenis.getText() == "PROMOSI") {
					if (this.stsSimpan==1) this.cb_dn.setSQL("select no_dn, keterangan from sju_dnp_m where no_pb='-' and kode_lokasi='"+this.app._lokasi+"'",["no_dn","keterangan"],false,["No DN","Deskripsi"],"and","Data DN",true);			
					else this.cb_dn.setSQL("select no_dn, keterangan from sju_dnp_m where no_pb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_dn","keterangan"],false,["No DN","Deskripsi"],"and","Data DN",true);			
				}
			}
		}
		if (sender == this.cb_dn && this.cb_dn.getText()!="") {
			if (this.c_jenis.getText() == "ENTERTN") {
				var strSQL = "select jumlah from sju_dne_m where no_dn='"+this.cb_dn.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_nilaidn.setText(floatToNilai(line.jumlah));						
					}
				}	
			}
			if (this.c_jenis.getText() == "PROMOSI") {
				var strSQL = "select jumlah-pph as neto from sju_dnp_m where no_dn='"+this.cb_dn.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_nilaidn.setText(floatToNilai(line.neto));						
					}
				}	
			}			
		}
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {			
					this.progSeb = "0";
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1);	
					this.sgUpld.clear(1);
					this.sgFile.clear(1);				
					this.isiNIKpp();
				}
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sju_pb_m","no_pb",this.app._lokasi+"-PB"+this.e_periode.getText().substr(2,4)+".","0000"));						
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}		
		}
		catch(e) {
			alert(e);
		}
	},
	doChangeCell1: function(sender, col, row){
		if (col == 3 && sender.cells(3,row) != "") this.sg1.validasi();

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
		if (col == 4) {
			if (sender.cells(4,row) != "") {
				var pp = this.dataPP.get(sender.cells(4,row));
				if (pp) sender.cells(5,row,pp);
				else {
					if (trim(sender.cells(4,row)) != "") system.alert(this,"Kode PP "+sender.cells(4,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(4,row,"");
					sender.cells(5,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell1");		
	},
	doChangeCell4: function(sender, col, row){
		if ((col == 2 || col == 4) && (sender.cells(4,row) != "")) this.sg4.validasi();

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
		sender.onChange.set(this,"doChangeCell4");		
	},	
	doNilaiChange: function(){		
		try{
			var tot = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(3,i) != ""){
					tot += nilaiToFloat(this.sg1.cells(3,i));					
				}
			}
			for (var i = 0; i < this.sg4.getRowCount();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(4,i) != ""){
					if (this.sg4.cells(2,i).toUpperCase() == "D") tot += nilaiToFloat(this.sg4.cells(4,i));
					if (this.sg4.cells(2,i).toUpperCase() == "C") tot -= nilaiToFloat(this.sg4.cells(4,i));
				}
			}
			this.e_totalCurr.setText(floatToNilai(tot));	
			this.e_total.setText(floatToNilai(tot * nilaiToFloat(this.e_kurs.getText())));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},		
	doCellEnter1: function(sender, col, row){
		switch(col){			
			case 2 : 
					if (this.sg1.cells(2,row) == ""){
						if (row == 0) this.sg1.setCell(2,row,this.e_ket.getText());
						else this.sg1.setCell(2,row,this.sg1.cells(2,(row-1)) );
					}
				break;			
			case 4 : 
					if (this.sg1.cells(4,row) == "") {
						if (row == 0) this.sg1.setCell(4,row,this.app._kodePP);
						else {
							this.sg1.setCell(4,row,this.sg1.cells(4,(row-1)));
							this.sg1.setCell(5,row,this.sg1.cells(5,(row-1)));
						}
					}
				break;							
		}
	},	
	doCellEnter4: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg4.cells(2,row) == ""){
						this.sg4.setCell(2,row,"D");						
					}
				break;
			case 3 : 
					if (this.sg4.cells(3,row) == ""){
						if (row == 0) this.sg4.setCell(3,row,this.e_ket.getText());
						else this.sg4.setCell(3,row,this.sg4.cells(3,(row-1)) );
					}
				break;			
			case 5 : 
					if (this.sg4.cells(5,row) == "") {
						if (row == 0) this.sg4.setCell(5,row,this.app._kodePP);
						else {
							this.sg4.setCell(5,row,this.sg4.cells(5,(row-1)));
							this.sg4.setCell(6,row,this.sg4.cells(6,(row-1)));
						}
					}
				break;							
		}
	},	
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '048' "+							
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '048' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 4){
					if (this.app._userStatus == "A") {
						var strPP = "select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
						var strPPCount = "select count(*) from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
					}
					else {
						var strPP = "select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
						var strPPCount = "select count(*) from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
					}
					
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
	doEllipsClick4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '048' "+							
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '048' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					if (this.app._userStatus == "A") {
						var strPP = "select a.kode_pp,a.nama from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
						var strPPCount = "select count(*) from pp a where a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
					}
					else {
						var strPP = "select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
						var strPPCount = "select count(*) from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'";
					}
					
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
								this.nama_report="server_report_saku3_sju16_rptBayarAju";
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
			this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sg4.clear(1);	
			this.sgUpld.clear(1);
			this.sgFile.clear(1);														
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.doChange(this.c_curr);
			this.cekRek = true;			
			setTipeButton(tbAllFalse);
			this.isiNIKpp();
			this.progSeb ="";
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){		
		if (this.cb_pp.getText()!="") {																		
			this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																			
			var strSQL = "select x.no_pb,convert(varchar,x.tanggal,103) as tgl,x.modul,x.no_dokumen,x.keterangan,x.progress,x.nilai_curr,x.kode_curr "+												
						"from sju_pb_m x inner join karyawan_pp y on x.kode_pp=y.kode_pp and x.kode_lokasi=y.kode_lokasi and y.nik='"+this.app._userLog+"' "+					 					 
						"where x.no_kas='-' and x.periode<='"+this.e_periode.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' and x.modul = 'PB' and x.progress ='0' ";
						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU3 = data;
				this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn3.rearrange();
				this.doTampilData3(1);
			} else this.sg3.clear(1);	
		}
		else system.alert(this,"PP/Unit harus terisi.","");				
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_pb,line.tgl,line.modul,line.no_dokumen,line.keterangan,line.progress,floatToNilai(line.nilai_curr),line.kode_curr]); 
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
				this.cekRek = false;
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));	
				
				var strSQL = "select a.keterangan,a.no_dokumen,a.modul,a.tanggal,a.nik_buat,a.nik_atasan,a.nik_app1,a.nik_app2,a.nik_app3,a.nik_app4,a.kode_curr,a.kurs,a.kode_pp,a.due_date , a.jenis_dn,a.no_dn "+
							 "from sju_pb_m a "+								 
							 "where a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);		
						this.dp_d2.setText(line.due_date);												
						this.c_curr.setText(line.kode_curr);												
						this.e_kurs.setText(floatToNilai(line.kurs));	
						this.cb_buat.setSQL("select distinct a.nik, a.nama from karyawan a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);														
						this.cb_buat.setText(line.nik_buat);
						this.cb_pp.setText(line.kode_pp);
						this.isiNIKpp();
						this.cb_atasan.setText(line.nik_atasan);					
						this.cb_app1.setText(line.nik_app1);						
						this.cb_app2.setText(line.nik_app2);						
						this.cb_app3.setText(line.nik_app3);						
						this.cb_app4.setText(line.nik_app4);	
						
						this.c_jenis.setText(line.jenis_dn);
						if (line.jenis_dn != "NON-DN") {							
							this.cb_dn.setText(line.no_dn);
						}
					}
				}								
											
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai_curr,a.kode_pp,c.nama as nama_pp "+
							"from sju_pb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+																				
							"where a.jenis='BEBAN' and a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_akun,line.nama_akun,line.keterangan,floatToNilai(line.nilai_curr),line.kode_pp,line.nama_pp]);
					}
				} else this.sg1.clear(1);
				
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai_curr,a.kode_pp,c.nama as nama_pp "+
							"from sju_pb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+																				
							"where a.jenis='BEBAN2' and a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg4.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),line.kode_pp,line.nama_pp]);
					}
				} else this.sg4.clear(1);
				
				var data = this.dbLib.getDataProvider( 
							"select a.kode_akun,a.kode_pp,a.saldo,a.nilai,a.saldo-a.nilai as sakhir, gar_thn,gar_tw,gar_bulan "+ 
							"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+							
							"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='PB' order by a.kode_akun",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.kode_pp,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir),floatToNilai(line.gar_thn),floatToNilai(line.gar_tw),floatToNilai(line.gar_bulan)]);
					}
				} else this.sg2.clear(1);	
				
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
	doHitungGar: function(){
		this.sg2.clear();
		
		var nilai = total = 0;
		for (var i=0;i < this.sg1.getRowCount();i++){
			if (this.sg1.rowValid(i)){				
				nilai = nilaiToFloat(this.sg1.cells(3,i)) * nilaiToFloat(this.e_kurs.getText());				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg1.cells(0,i) == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg1.cells(0,i),this.sg1.cells(4,i),"0",floatToNilai(nilai),"0","0","0","0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(3,idx));
					total = total + nilai;
					this.sg2.setCell(3,idx,total);
				}
			}
		}

		var nilai = total = 0;
		for (var i=0;i < this.sg4.getRowCount();i++){
			if (this.sg4.rowValid(i) && this.sg4.cells(2,i) != "-"){				
				if (this.sg4.cells(2,i) == "D") nilai = nilaiToFloat(this.sg4.cells(4,i)) * nilaiToFloat(this.e_kurs.getText());
				else nilai = nilaiToFloat(this.sg4.cells(4,i)) * nilaiToFloat(this.e_kurs.getText()) * -1;				
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
					this.sg2.appendData([this.sg4.cells(0,i),this.sg4.cells(5,i),"0",floatToNilai(nilai),"0","0","0","0"]);
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
	}


});