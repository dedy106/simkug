window.app_rra_transaksi_fRevFC = function(owner)
{
	if (owner)
	{
		window.app_rra_transaksi_fRevFC.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_transaksi_fRevFC";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form PDRK Redistribusi, Realokasi, Reschedule Anggaran: Review FC", 0);	
		if (this.showLoading) this.showLoading("Generate UI");
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;tinymceCtrl;util_rfc;util_rfcLib;server_util_Map;util_file;uploader;server_report_report");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_rfc = new saiLabelEdit(this,{bound:[720,11,200,20],caption:"Status KEEP", tag:99, readOnly:true});		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,222,20],caption:"No Review",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[245,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.cb_rev = new saiLabelEdit(this,{bound:[720,12,200,20],caption:"No Review(sblm)", tag:1, readOnly:true});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});		
		this.e_uid = new saiLabelEdit(this,{bound:[720,14,200,20], caption:"SAP User", tag:11});
		this.cb_pdrk = new saiCBBL(this,{bound:[20,13,222,20],caption:"No PDRK", multiSelection:false, tag:1, change:[this,"doChange"]});		
		this.e_pwd = new saiLabelEdit(this,{bound:[720,13,200,20], caption:"SAP Password", password:true, tag:11});
		this.e_modul = new saiLabelEdit(this,{bound:[20,15,202,20],caption:"Modul", readOnly:true});		
		this.e_donor = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Nilai Donor", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.c_jenis = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"Jenis", readOnly:true});		
		this.e_terima = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Nilai Penerima", readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,16,900, 350], childPage:["Data PDRK","Data Donor","Data Penerima","Data Justifikasi","Dokumen Pendukung","View Dokumen","Dokumen PDRK","Nota Kajian","Nota Pengantar"], pageChange:[this,"doPageChange"]});
		
		this.ed_dok = new saiLabelEdit(this.pc1.childPage[0], {bound:[20,1,400,20], caption:"No. Nota Dinas"});
		this.e_file = new saiLabelEdit(this.pc1.childPage[0], {bound:[20,2,400,20], caption:"File Nota Dinas"});
		this.upld = new uploader(this.pc1.childPage[0], {bound:[430,2,80,20],caption:"Browse",autoSubmit:true, param1:"uploadTo",param2:"server/media/tmp/", param3:"object", param4:"server/media/", afterUpload:[this,"doAfterLoad"], change:[this,"doFileChange"]});
		this.bOpen = new button(this.pc1.childPage[0], {bound:[540,2,80,20], caption:"Open", click:[this,"doOpenFile"]});
		
		this.cb_ubis = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Png Jawab", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_gubis = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Direktorat", multiSelection:false, maxLength:10, tag:1});
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2, readOnly:true, bufferOption: boHALF, bufferData: this.app._listNIK});
		this.cb_kota = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Kota", multiSelection:false, maxLength:10, tag:2});
		this.cb_reviewer = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Reviewer Pengelola", multiSelection:false, maxLength:10, bufferOption: boHALF, bufferData: this.app._listNIK, tag:2});
		this.pApp = new panel(this.pc1.childPage[0],{bound:[10,20,430, 100], caption:"Approval PDRK 1"});
		this.cb_app1 = new saiCBBL(this.pApp,{bound:[20,14,200,20],caption:"Png. Jwb Prog.", multiSelection:false, bufferOption: boHALF, bufferData: this.app._listNIK, maxLength:10, tag:2});
		this.cb_app2 = new saiCBBL(this.pApp,{bound:[20,15,200,20],caption:"Mengetahui", multiSelection:false, bufferOption: boHALF, bufferData: this.app._listNIK,  maxLength:10, tag:2});
		this.cb_app3 = new saiCBBL(this.pApp,{bound:[20,16,200,20],caption:"Menetapkan", multiSelection:false,bufferOption: boHALF, bufferData: this.app._listNIK,  maxLength:10, tag:2});
		this.pApp.rearrangeChild(23,23);
		this.pApp2 = new panel(this.pc1.childPage[0],{bound:[460,20,430, 100], caption:"Approval Justifikasi"});
		this.cb_appj1 = new saiCBBL(this.pApp2,{bound:[20,14,200,20],caption:"Png. Jwb Prog.", multiSelection:false, bufferOption: boHALF, bufferData: this.app._listNIK,  maxLength:10, tag:2});
		this.cb_appj2 = new saiCBBL(this.pApp2,{bound:[20,15,200,20],caption:"Mengetahui", multiSelection:false, bufferOption: boHALF, bufferData: this.app._listNIK, maxLength:10, tag:2});
		this.pApp2.rearrangeChild(23,23);
		this.pApp3 = new panel(this.pc1.childPage[0],{bound:[10,21,430, 70], caption:"Approval PDRK3"});
		this.cb_appp3 = new saiCBBL(this.pApp3,{bound:[20,14,200,20],caption:"Png. Jwb Prog.", multiSelection:false,bufferOption: boHALF, bufferData: this.app._listNIK, maxLength:10, tag:2});
		this.cb_appp32 = new saiCBBL(this.pApp3,{bound:[20,15,200,20],caption:"Mengetahui", multiSelection:false, bufferOption: boHALF, bufferData: this.app._listNIK, maxLength:10, tag:2});
		this.pApp3.rearrangeChild(23,23);

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,15,this.pc1.width-5,this.pc1.height-40],colCount:13,tag:9,
					colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai Gar","Terpakai","Saldo","Nilai Donor","Jenis","Nilai Keep"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,90,90,90,90,90,70,60,60,90,70,50]],
					columnReadOnly:[true,[2,4,6,7,8,9],[]],
					buttonStyle:[[0,1,3,5,11],[bsAuto,bsEllips,bsEllips,bsEllips,bsAuto]],
					colFormat:[[7,8,9,10,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]], pasteEnable: true,
					picklist:[[0,11],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]}), new arrayMap({items:["PAYMENT","COMMITMENT","KEDUANYA"]})]],
					defaultRow:1, autoPaging:true, rowPerPage:20,afterPaste:[this,"doAfterPaste"], cellEnter:[this,"doCellEnter"],
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsTransNav,grid:this.sg, pager:[this,"doPager"]});
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:0,
					colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai Terima","Target Selesai","Jenis"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,130,150,70,60,60,150,70,50]],
					columnReadOnly:[true,[2,4,6],[7,8]],
					buttonStyle:[[0,1,3,5,9],[bsAuto,bsEllips,bsEllips,bsEllips,bsAuto]], pasteEnable: true,
					colFormat:[[7],[cfNilai]],
					picklist:[[0,9],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]}), new arrayMap({items:["PAYMENT","COMMITMENT","KEDUANYA"]})]],
					defaultRow:1, autoPaging:true, rowPerPage:20,afterPaste:[this,"doAfterPaste"],
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsTransNav,grid:this.sg2, pager:[this,"doPager"]});

		var cnv = this.pc1.childPage[5].getClientCanvas();
		this.docViewer = document.createElement("iframe");
		this.docViewer.frameBorder = 0;
		this.docViewer.id = this.getFullId()+"_viewer";
		this.docViewer.style.cssText = "width:100%;height:100%";		
		cnv.appendChild(this.docViewer);
		this.viewer = new reportViewer(this.pc1.childPage[6],{bound:[0,0,this.pc1.width - 3, this.pc1.height - 25]});
		this.dataUpload = undefined;
		this.mDesk = new tinymceCtrl(this.pc1.childPage[3],{bound:[1,10,this.pc1.width-5,this.pc1.height-15], withForm:false});
		this.mDesk2 = new tinymceCtrl(this.pc1.childPage[7],{bound:[1,10,this.pc1.width-5,this.pc1.height-15], withForm:false});
		this.editorReadOnly = true;
		
		this.bView = new button(this.pc1.childPage[3], {bound:[this.pc1.width - 100, 10, 80, 20], caption:"Edit", click:"doCodeClick"});
		this.bLoad = new button(this.pc1.childPage[3], {bound:[this.pc1.width - 200, 10, 80, 20], caption:"Load Templat", click:"doCodeClick"});
		this.cb_templ = new saiCBBL(this.pc1.childPage[3],{bound:[this.pc1.width - 200,17,200,20],caption:"Template", visible:false, multiSelection:false, maxLength:10, tag:100, change:[this,"doChange"]});
		this.sgUpld = new saiGrid(this.pc1.childPage[4],{
						bound:[1,0,this.pc1.width-3,this.pc1.height - 28],
						colCount:3,
						colTitle:["Dokumen","Upload","Deskripsi"],
						colFormat:[[1],[cfUpload]],
						colWidth:[[2,1,0],[250,80,230]],
						colReadOnly:[true,[0,1],[]],
						change:[this,"doGridChange"],
						tag:3,
						dblClick:[this,"doOpenFileGrid"],
						hint:"Double Click untuk membuka filenya"
					});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgnUpld = new sgNavigator(this.pc1.childPage[4],{bound:[1,this.sgUpld.height + 3,this.pc1.width-3,25],buttonStyle:1, grid:this.sgUpld});
		
		this.rearrangeChild(10, 22);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);
		this.pc1.childPage[2].rearrangeChild(10, 22);
		this.pc1.childPage[3].rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.rfcLib = new util_rfcLib();
			this.rfc = new util_rfc();
			this.standarLib = new util_standar();					
			
			this.cb_pdrk.setSQL("select a.no_pdrk,b.keterangan,'REV' as modul, a.no_rev as no_review "+
										 "from rra_rev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi "+
										 (this.app._statusLokasiUser == "FC" ? "" : "	inner join rra_finop_ubis cc on cc.kode_ubis = a.kode_ubis and cc.kode_lokasi = a.kode_lokasi and cc.kode_cc = '"+this.app._kodeCC+"' ")+
										 "where a.sts_pdrk in ('RRR',"+(this.app._statusLokasiUser == "FC" ? "'STB'" : "' '")+") and a.progress='1' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+										 
										 "union "+
										 "select a.no_pdrk,b.keterangan,'GREV' as modul, a.no_grev "+
										 "from rra_grev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi "+
										 (this.app._statusLokasiUser == "FC" ? "" : "	inner join rra_finop_ubis cc on cc.kode_ubis = a.kode_ubis and cc.kode_lokasi = a.kode_lokasi and cc.kode_cc = 'XX' ")+
										 "where a.sts_pdrk in ('RRR',"+(this.app._statusLokasiUser == "FC" ? "'OPN'" : "' '")+") and a.progress='1' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
										 "union "+
										 "select a.no_pdrk,b.keterangan,'MREV' as modul, a.no_mrev "+
										 "from rra_mrev_m a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi "+
										 (this.app._statusLokasiUser == "FC" ? "" : "	inner join rra_finop_ubis cc on cc.kode_ubis = a.kode_ubis and cc.kode_lokasi = a.kode_lokasi and cc.kode_cc = 'XX' ")+
										 "where a.sts_pdrk in ('RRR','ABT') and a.progress='1' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",["no_pdrk","keterangan","modul","no_review"],false,["No PDRK","Keterangan","modul","No Review"],"and","Data PDRK",true);
			this.cb_ubis.setSQL("select kode_ubis, nama from rra_ubis where kode_lokasi='"+this.app._lokasi+"'",["kode_ubis","nama"],false,["Kode","Nama"],"and","Data Penanggungjawab Program",true);
			this.cb_gubis.setSQL("select kode_gubis, nama from rra_gubis where kode_lokasi='"+this.app._lokasi+"'",["kode_gubis","nama"],false,["Kode","Nama"],"and","Data Direktorat",true);			
			this.cb_app1.setSQL("select nik, nama,jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan ",true);
			this.cb_app2.setSQL("select nik, nama,jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_app3.setSQL("select nik, nama,jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_buat.setSQL("select nik, nama,jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_kota.setSQL("select kode_kota, nama from rra_kota ",["kode_kota","nama"],false,["Kode Kota","Nama Kota"],"and","Data Kota",true);
			this.cb_appj1.setSQL("select nik, nama,jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan ",true);
			this.cb_appj2.setSQL("select nik, nama,jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_appp3.setSQL("select nik, nama,jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_appp32.setSQL("select nik, nama,jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_reviewer.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' ",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan ",true);
			this.cb_ubis.setText(this.app._kodeUbis);
			this.cb_gubis.setText(this.app._kodeGubis);
			this.cb_app1.setText(this.app._nikApp1);
			this.cb_app2.setText(this.app._nikApp2);
			this.cb_app3.setText(this.app._nikApp3);

			this.cb_appj1.setText(this.app._nikApp1);
			this.cb_appj2.setText(this.app._nikApp2);
			this.cb_appp3.setText(this.app._nikApp1);
			this.cb_appp32.setText(this.app._nikApp2);
			this.cb_kota.setText(this.app._kota);
			this.e_uid.setText(this.app._defsapuid.uid);
			this.e_pwd.setText(this.app._defsapuid.pwd);
			this.login = new server_util_Map();
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.onClose.set(this,"doClose");
			this.dbLib.getDataProviderA("select kode_akun, nama from rra_masakun where kode_lokasi = '"+this.app._lokasi+"' ", undefined, "akun");					
			this.report = new server_report_report();
		}catch(e){
			systemAPI.alert(e);
		}
		this.hideLoading("Generate UI");
	}
};
window.app_rra_transaksi_fRevFC.extend(window.childForm);
window.app_rra_transaksi_fRevFC.implement({
	doClose: function(sender){
		if (this.dataUpload !="" ) this.fileUtil.deleteFiles(this.dataUpload.temporary);
		this.dbLib.free();
		this.fileUtil.free();
		this.rfc.free();
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{			
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;			
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.upld.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
		}
	},
	doOpenFileGrid: function(sender, col, row){
		if (sender.cells(0,row) != "-" && sender.cells(0,row) != "") {
			this.docViewer.src = "server/media/"+sender.cells(0,row);
			this.pc1.setActivePage(this.pc1.childPage[5]);
		}
	},
	doOpenFile :function(sender){		
		//downloadFile(this.fileUtil.getFileContents( this.rootDir+"/server/media/"+this.e_file.getText()),this.getFullId()+"_viewer");
		if (this.e_file.getText() != "-" && this.e_file.getText() != ""){
			this.docViewer.src = "server/media/"+this.e_file.getText();
			this.pc1.setActivePage(this.pc1.childPage[5]);
		}
	},
	doPageChange: function(sender, activePage){		
		if (activePage == this.pc1.childPage[3]){			
			this.mDesk.setReadOnly(this.editorReadOnly);			
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
			if (this.e_modul.getText() == "RRR") this.sg.setTag("0"); else this.sg.setTag("9");
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{
					setTipeButton(tbAllFalse);										
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_frev_m","no_frev","FREV-"+this.app._kodeUbis+"-"+this.e_periode.getText().substr(2,4)+".","0000"));					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					
					this.saveFiles = "", this.dest = "", first = true;
					if (this.e_file.getText() != "-" && this.dataUpload){
						this.saveFiles = this.dataUpload.temporary;
						this.dest = this.rootDir+"/server/media/"+this.e_file.getText();
					}
					var files = [];
					for (var i=0; i < this.sgUpld.getRowCount();i++){	
						if (this.sgUpld.cells(0,i) != ""){ 
							if (!first) { 
								this.saveFiles += ";";
								this.dest += ";";
							}                               
							this.saveFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(1,i).tmpfile;
							this.dest += this.rootDir+"/server/media/" + this.sgUpld.cells(1,i).filedest;
							first = false;
							files.push({file:this.sgUpld.cells(0,i), nama:this.sgUpld.cells(2,i)});
						}
					}							
					var flag = this.e_modul.getText() == "RRR" ? "1" : "-";
					var prog = this.e_modul.getText() == "RRR" ? "0" : "-";
					sql.add("update rra_pdrk_m set progress='F3' where no_pdrk = '"+this.cb_pdrk.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");										
					if (this.jenis.toUpperCase() == "REV") sql.add("update rra_rev_m set progress='2' where no_rev='"+this.cb_rev.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.jenis.toUpperCase() == "GREV") sql.add("update rra_grev_m set progress='2' where no_grev='"+this.cb_rev.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.jenis.toUpperCase() == "MREV") sql.add("update rra_mrev_m set progress='2' where no_mrev='"+this.cb_rev.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							
					sql.add("insert into rra_frev_m(no_frev,kode_lokasi,no_pdrk,kode_ubis,kode_gubis,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi,nik_user,tgl_input,progress,keterangan, flag_rfc, kode_kota,no_nd, file_nd, nik_appjust, nik_appjust2, nik_apppdrk3, nik_apppdrk32, sts_appjust, sts_appjust2, sts_apppdrk3, sts_apppdrk32, nik_review) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pdrk.getText()+"','"+this.cb_ubis.getText()+"','"+this.cb_gubis.getText()+"','"+this.c_jenis.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app1.getText()+"','"+this.cb_app2.getText()+"','"+this.cb_app3.getText()+"','"+this.e_modul.getText()+"',null,'"+this.app._userLog+"',now(),'"+prog+"','"+this.e_ket.getText()+"','"+flag+"','"+this.cb_kota.getText()+"','"+this.ed_dok.getText()+"','"+this.e_file.getText()+"','"+this.cb_appj1.getText()+"','"+this.cb_appj2.getText()+"','"+this.cb_appp3.getText()+"','"+this.cb_appp32.getText()+"','0','0','0','0','"+this.cb_reviewer.getText()+"')");
					sql.add(new server_util_Map({items:{tipe:"clob",table:"rra_frev_m",field:"justifikasi", filter :" no_frev = '"+this.e_nb.getText()+"' ",value:urlencode(this.mDesk.getCode())}})); 	
					sql.add(new server_util_Map({items:{tipe:"clob",table:"rra_frev_m",field:"kajian", filter :" no_frev = '"+this.e_nb.getText()+"' ",value:urlencode(this.mDesk2.getCode())}})); 	
					sql.add("delete from rra_anggaran where no_bukti = '"+this.cb_pdrk.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into rra_frev_d(no_frev,no_pdrk,kode_lokasi,no_urut,kode_akun,kode_cc,kode_drk,periode,nilai_gar,nilai_pakai,saldo,nilai,dc,target,jenis,nilai_keep) values "+
										"	('"+this.e_nb.getText()+"','"+this.cb_pdrk.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(9,i))+","+parseNilai(this.sg.cells(10,i))+",'C','-','"+this.sg.cells(11,i).substr(0,1)+"',"+parseNilai(this.sg.cells(12,i))+")");
								sql.add("insert into rra_anggaran(no_bukti,modul,kode_cc,kode_akun,kode_drk,kode_lokasi,periode,dc,nilai,nik_user,tgl_input,nilai_gar, nilai_pakai, saldo, target,jenis) values "+
										"	('"+this.cb_pdrk.getText()+"','"+this.e_modul.getText().toUpperCase()+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(3,i)+"','"+this.app._lokasi+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,i)+"','C',"+parseNilai(this.sg.cells(10,i))+",'"+this.app._userLog+"',now(),"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(9,i))+",'-','"+this.sg.cells(11,i).substr(0,1)+"')");
							}
						}
					}
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into rra_frev_d(no_frev,no_pdrk,kode_lokasi,no_urut,kode_akun,kode_cc,kode_drk,periode,nilai_gar,nilai_pakai,saldo,nilai,dc,target,jenis) values "+
										"	('"+this.e_nb.getText()+"','"+this.cb_pdrk.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(5,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"',0,0,0,"+parseNilai(this.sg2.cells(7,i))+",'D','"+this.sg2.cells(8,i)+"','"+this.sg2.cells(9,i).substr(0,1)+"')");
								sql.add("insert into rra_anggaran(no_bukti,modul,kode_cc,kode_akun,kode_drk,kode_lokasi,periode,dc,nilai,nik_user,tgl_input,nilai_gar,nilai_pakai, saldo,target,jenis) values "+
										"	('"+this.cb_pdrk.getText()+"','"+this.e_modul.getText().toUpperCase()+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(5,i)+"','"+this.sg2.cells(3,i)+"','"+this.app._lokasi+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"','D',"+parseNilai(this.sg2.cells(7,i))+",'"+this.app._userLog+"',now(),0,0,0,'"+this.sg2.cells(8,i)+"','"+this.sg2.cells(9,i).substr(0,1)+"')");
							}
						}
					}
					if (files.length > 0){
						var scan = "insert into rra_frev_dok(no_frev,kode_lokasi,file_dok,nama,no_urut) values ";						
						var first = true;
						var noUrut=1;
						for (var i in files){							
							scan += "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+files[i].file+"','"+files[i].nama+"',"+noUrut+")";
							sql.add(scan);										
							scan = "insert into rra_frev_dok(no_frev,kode_lokasi,file_dok,nama,no_urut) values ";	
							noUrut++;
						}
						
					}
					
					var line = "";
					for (var i in this.data1Thn.objList){										
						var row = this.data1Thn.get(i).get("restable");//
						var gridValue = this.data1Thn.get(i).get("value");
						var ccakun = i.split(":");
						for (var l in row.objList){//rows = 16
							line = row.get(l).get("0");
							//for (var l2 in line.objList)
							{//row																	
								//this.data1Thn.get(i).get(l).get(l2).set("TSL06", parseFloat(line.get(l2).get("TSL06")) - rrr);
								var prd = (parseFloat(line.get("PERIO")) < 10 ? "0":"")+line.get("PERIO");
								if (this.c_jenis.getText() == "CAPEX")
									sql.add("insert into rra_frev_orgi(no_frev, no_pdrk,periode, kode_akun, kode_cc, nilai,kode_lokasi,versi, kode_drk, fund_ctr)values "+
											"	('"+this.e_nb.getText()+"','"+this.cb_pdrk.getText()+"','"+line.get("GJAHR")+prd+"','"+gridValue.get("akun")+"','"+gridValue.get("cc")+"','"+line.get("PLAN_CO")+"','"+this.app._lokasi+"','"+line.get("VERSN")+"','"+gridValue.get("drk")+"','"+line.get("FINCODE")+"')");
								else 
									sql.add("insert into rra_frev_orgi(no_frev, no_pdrk,periode, kode_akun, kode_cc, nilai,kode_lokasi)values ('"+this.e_nb.getText()+"','"+this.cb_pdrk.getText()+"','"+line.get("GJAHR")+prd+"','"+gridValue.get("akun")+"','"+gridValue.get("cc")+"','"+line.get("TSL10")+"','"+this.app._lokasi+"')");
							}								
						}
					}
					this.keepSAP = this.e_rfc.getText() == "Belum" ;//|| this.keepIsBeda;										
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					if (this.hideLoading) this.hideLoading("wait....");
					setTipeButton(tbSimpan);
					systemAPI.alert(e);
				}
			}
		}catch(e){
			if (this.hideLoading) this.hideLoading("wait....");
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		try{
			if (modalResult != mrOk) return false;
			switch (event){
				case "clear" :
					if (modalResult == mrOk)
						this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
						this.sg.clear(1); this.sg2.clear(1);
						this.pc1.setActivePage(this.pc1.childPage[0]);
						this.cb_buat.setText(this.app._userLog, this.app._namaUser);
						this.cb_ubis.setText(this.app._kodeUbis);
						this.cb_gubis.setText(this.app._kodeGubis);
						this.cb_app1.setText(this.app._nikApp1);
						this.cb_app2.setText(this.app._nikApp2);
						this.cb_app3.setText(this.app._nikApp3);
						this.cb_appj1.setText(this.app._nikApp1);
						this.cb_appj2.setText(this.app._nikApp2);
						this.cb_appp3.setText(this.app._nikApp1);
						this.cb_appp32.setText(this.app._nikApp2);
						this.cb_kota.setText(this.app._kota);
						this.e_uid.setText(this.app._defsapuid.uid);
						this.e_pwd.setText(this.app._defsapuid.pwd);
						setTipeButton(tbSimpan);
					break;
				case "simpan" :	
					if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br> initialization...");
					this.sg2.validasi();
					this.login.set("user",this.e_uid.getText());
					this.login.set("passwd",this.e_pwd.getText());
					this.keepIsBeda = false;
					var dataAkun = new server_util_arrayList();
					var kodeAkun = "' '";
					var kodeCc ="' '";
					var drk = "' '";
					var totalPerBulan = new arrayMap();
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (!this.sg2.rowValid(i)) continue;
						var prd = this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i) ;
						if (prd > this.app._periodeGAR && this.sub_jenis == "RRA"){
							var k = i+1;
							throw("Transaksi Terima tidak valid. Periode lebih besar dari Current Periode [Baris: "+k+"]");							
						}
						var prd = this.sg2.cells(0,i) ;
						var prd2 = this.app._periodeGAR.substr(4,2);					
						if ((this.app._TW.get(prd) < this.app._TW.get(prd2))){
							var k = i+1;
							throw("Transaksi Terima tidak valid. Periode kurang dari Triwulan sekarang [Baris: "+k+"]");							
						}
						/*for (var j=i;j < this.sg2.getRowCount();j++){
							if (this.sg2.cells(0,j) == this.sg2.cells(0,i) && this.sg2.cells(1,j) == this.sg2.cells(1,i) && this.sg2.cells(5,j) == this.sg2.cells(5,i) && (i != j)) {
								var k = i+1;
								throw("Transaksi Terima tidak valid. Duplikasi Data Anggaran.[Baris : "+k+"]");								
							}
						}*/
						if (this.c_jenis.getText() == "OPEX" && this.sg2.cells(9,i).toUpperCase() != "KEDUANYA"){
							this.sg2.cells(9,i,"KEDUANYA");
						}
						var versi = this.c_jenis.getText() == "CAPEX" ? this.sg2.cells(9,i) : "000";
						kodeAkun += ",'"+this.sg2.cells(5,i)+"'";
						kodeCc += ",'"+this.sg2.cells(1,i)+"'";
						dataAkun.add(new server_util_Map({items:{agg:this.c_jenis.getText(),drk:this.sg2.cells(3,i),jenis:versi,cc:this.sg2.cells(1,i), akun:this.sg2.cells(5,i), bln1:this.sg2.cells(0,i),bln2:this.sg2.cells(0,i)}}));
						var tot = totalPerBulan.get(this.sg2.cells(0,i));
						if (tot == undefined){
							tot = {totDonor : 0, totTerima: nilaiToFloat(this.sg2.cells(7,i))};
						}else {
							tot.totTerima += nilaiToFloat(this.sg2.cells(7,i));
						}	
						totalPerBulan.set(this.sg2.cells(0,i), tot);
					}								
					if (this.e_modul.getText() == "RRR") {
						this.sg.validasi();
						if (nilaiToFloat(this.e_donor.getText()) != nilaiToFloat(this.e_terima.getText()) )  {
							throw("Transaksi tidak valid. Nilai Donor dan Terima harus sama.");							
						}
						//kumpulkan dataGrid dengan keyMap untuk digunakan waktu cari data ke grid dari hasil rfc.
						//dataAkun untuk menampung data (periode, cc, kode_akun) untuk cekSaldo lewat RFC					
						var dataGrid = new arrayMap();										
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								var prd = this.e_periode.getText().substr(0,4)+this.sg.cells(0,i) ;
								if (prd > this.app._periodeGAR && this.sub_jenis == "RRA"){
									var k = i+1;
									throw("Transaksi Donor tidak valid. Periode lebih besar dari Current Periode [Baris: "+k+"]");									
								}
								var prd = this.sg.cells(0,i) ;
								var prd2 = this.app._periodeGAR.substr(4,2);					
								if ((this.app._TW.get(prd) < this.app._TW.get(prd2))){
									var k = i+1;
									throw("Transaksi Terima tidak valid. Periode kurang dari Triwulan sekarang [Baris: "+k+"]");									
								}
								/*for (var j=i;j < this.sg.getRowCount();j++){
									if (this.sg.cells(0,j) == this.sg.cells(0,i) && this.sg.cells(1,j) == this.sg.cells(1,i) && this.sg.cells(5,j) == this.sg.cells(5,i) && (i != j)) {
										var k = i+1;
										throw("Transaksi Donor tidak valid. Duplikasi Data Anggaran.[Baris : "+k+"]");										
									}
								}*/
								if (this.c_jenis.getText() == "OPEX" && this.sg.cells(11,i).toUpperCase() != "KEDUANYA"){
									this.sg.cells(11,i,"KEDUANYA");
								}
								//untuk keyMap dari Orig
								var id = this.sg.cells(0,i)+":"+this.sg.cells(1,i)+":"+this.sg.cells(5,i)+":"+this.sg.cells(3,i)+":"+this.sg.cells(11,i).substr(0,1);
								var dataOri = this.dataOrig.get(id);
								if (dataOri == undefined){
									error_log("orig undeifned");
									this.keepIsBeda = true;
								}else { 
									if (dataOri.nilai != nilaiToFloat(this.sg.cells(10,i))){
										error_log("orig:"+dataOri.nilai +":"+this.sg.cells(10,i));
										this.keepIsBeda = true;
									}
								}
								var versi = this.c_jenis.getText() == "CAPEX" ? this.sg.cells(11,i) : "000";
								kodeAkun += ",'"+this.sg.cells(5,i)+"'";
								kodeCc += ",'"+this.sg.cells(1,i)+"'";
								dataGrid.set(this.sg.cells(0,i)+":"+this.sg.cells(1,i)+":"+this.sg.cells(5,i),{index:i + 1, nilai: nilaiToFloat(this.sg.cells(10,i))});
								dataAkun.add(new server_util_Map({items:{agg:this.c_jenis.getText(),jenis:versi,drk:this.sg.cells(3,i),cc:this.sg.cells(1,i), akun:this.sg.cells(5,i), bln1:this.sg.cells(0,i),bln2:this.sg.cells(0,i)}}));
								var tot = totalPerBulan.get(this.sg.cells(0,i));
								if (tot == undefined){
									tot = {totDonor : nilaiToFloat(this.sg.cells(10,i)), totTerima: 0};
								}else {
									tot.totDonor += nilaiToFloat(this.sg.cells(10,i));
								}	
								totalPerBulan.set(this.sg.cells(0,i), tot);
							}
						}
						this.sg.onChange.set(this,"doChangeCell");
						for (var i in totalPerBulan.objList){
							if (totalPerBulan.get(i).totDonor != totalPerBulan.get(i).totTerima && this.sub_jenis == "RRA"){
								throw ("Total perbulan donor harus sama dengan total per bulan penerima");
							}
						}
						if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br>GetData yang belum posting...");
						//ambil data RRR yang belum terposting ke RFC					
						var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
								"select a.kode_lokasi,a.kode_akun,a.kode_cc, a.kode_drk, sum(case when b.flag_rfc='1' then a.nilai * -1 else a.nilai end) as pakai "+
								"	from rra_anggaran a "+
								"	inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
								"		where a.kode_akun in ("+kodeAkun+")  and a.kode_cc in ("+kodeCc+") and a.periode like '"+this.e_periode.getText().substr(0,4)+"%'  and a.kode_lokasi= '"+this.app._lokasi+"' and lower(a.DC)= 'c' and ((b.flag_rfc = '0' and b.no_pdrk <> '"+this.cb_pdrk.getText()+"') or (b.flag_rfc = '1' and b.no_pdrk = '"+this.cb_pdrk.getText()+"')) "+
								"group by a.kode_lokasi,a.kode_akun,a.kode_cc,a.kode_drk ",
								
								"select a.kode_lokasi,a.kode_akun,a.kode_cc, a.kode_drk, substr(a.periode,5,2) as periode, sum(a.nilai) as pakai "+
								"	from rra_anggaran a "+
								"	inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
								"		where a.kode_akun in ("+kodeAkun+")  and a.kode_cc in ("+kodeCc+") and a.periode like '"+this.e_periode.getText().substr(0,4)+"%'  and a.kode_lokasi= '"+this.app._lokasi+"' and lower(a.DC)= 'c' and (b.flag_rfc = '1' and b.no_pdrk = '"+this.cb_pdrk.getText()+"') "+
								"group by a.kode_lokasi,a.kode_akun,a.kode_cc,a.kode_drk, a.periode "
								]}),true);						
						//gunakan keyMap = periode:cc:kodeAkun, agar cepat waktu cari data
						var dataRRRAll = new arrayMap();
						var dataRRR = new arrayMap();
						if (typeof data != "string"){
							var line;
							var data2 = data.result[1];
							for (var i in data2.rs.rows){
								line = data2.rs.rows[i];							
								dataRRR.set(line.periode+":"+line.kode_cc+":"+line.kode_akun+":"+line.kode_drk,parseFloat(line.pakai));
							}
							data = data.result[0];
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								dataRRRAll.set(line.kode_cc+":"+line.kode_akun+":"+line.kode_drk,parseFloat(line.pakai));
							}
						}else {
							throw(data);
							return;
						}	
											
						if (this.app._sapOnline){									
							if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br>Ambil saldo SAP via RFC...");
							var dataGar = this.rfc.dataGar2(this.login,  this.e_periode.getText().substr(0,4),dataAkun);
							
							if (typeof dataGar == "string"){
								throw(dataGar);								
							}	
							//cek di Grid nilai pendonor (dataGrid) dengan hasil terakhir RFC
							var res = dataGar.get("saldothn");
							var line, tmp;							
							var dataTemp = new arrayMap();								
							for (var row=0; row < this.sg.getRowCount(); row++){
								if (!this.sg.rowValid(row)) continue;
								if (this.c_jenis.getText() == "OPEX")
									var i = this.sg.cells(1,row)+":"+this.sg.cells(5,row)+":"+this.sg.cells(3,row)+":000";
								else var i = this.sg.cells(1,row)+":"+this.sg.cells(5,row)+":"+this.sg.cells(3,row);
								
								var ix = this.sg.cells(1,row)+":"+this.sg.cells(5,row)+":"+this.sg.cells(3,row);
								var ix2 = this.sg.cells(0,row)+":"+this.sg.cells(1,row)+":"+this.sg.cells(5,row)+":"+this.sg.cells(3,row);
								dataRRRAll.set(ix, (dataRRRAll.get(ix) == undefined ? 0 : dataRRRAll.get(ix)) );
								if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br>Proses get Saldo "+ix2);
								if (this.c_jenis.getText() == "OPEX"){									
									var line = this.getSaldoOpex(res.get(i).get("restable"), this.sg.cells(11,row).toUpperCase(), parseFloat(this.sg.cells(0,row))  );
								}else {
									var line = this.getSaldoCapex(res.get(i).get("restable"),this.sg.cells(11,row).toUpperCase(), parseFloat(this.sg.cells(0,row)) );
								}	
								
								var akunCC = this.sg.cells(1,row)+":"+this.sg.cells(3,row)+":"+this.sg.cells(5,row);	
								var tmp = dataTemp.get(akunCC);
								var prd = this.e_periode.getText().substr(0,4)+this.sg.cells(0,i) ;
								if (prd <= this.app._periodeGAR){
									if (tmp == undefined){
										tmp = { gar:parseFloat(line.sawal) - parseFloat(dataRRRAll.get(ix)),
												pakai:parseFloat(line.pakai), saldo:parseFloat(line.sisa) - parseFloat(dataRRRAll.get(ix)), 
												donor:nilaiToFloat(this.sg.cells(10,row)),lastDonor:nilaiToFloat(this.sg.cells(10,row))};																											
									}else {																				
										tmp.saldo -= tmp.lastDonor;
										tmp.gar -= tmp.lastDonor;																		
										line.sisa -= tmp.lastDonor ;									
										tmp.donor += nilaiToFloat(this.sg.cells(10,row));
										tmp.lastDonor = nilaiToFloat(this.sg.cells(10,row));									
										
									}											
								}
								if (dataRRR.get(ix2) != undefined)
									line.releaseBln += dataRRR.get(ix2);								
								if (nilaiToFloat(this.sg.cells(10,row)) > line.releaseBln){
									throw("Transaksi Donor tidak valid. Nilai Donor melebihi Release Anggaran [Baris: "+(row + 1).toString()+"].<br>."+this.sg.cells(10,row)+" > "+line.releaseBln);
								}
								dataTemp.set(akunCC, tmp);																
								line.sisa -= parseFloat(dataRRRAll.get(ix));								
								if (nilaiToFloat(this.sg.cells(10,row)) > line.sisa){
									//throw("Transaksi Donor tidak valid. Nilai Donor melebihi Saldo Anggaran [Baris: "+(row + 1).toString()+"].<br>."+this.sg.cells(10,row)+" > "+line.sisa);									
								}
							}			
							/*for (var i in res.objList){							
								var gridValue = res.get(i).get("value");	
								dataRRR.set(i, (dataRRR.get(i) == undefined ? 0 : dataRRR.get(i)) );
								if (this.c_jenis.getText() == "OPEX"){
									var line = this.getSaldoOpex(res.get(i).get("restable"),gridValue.get("jenis").toUpperCase(), parseFloat(gridValue.get("bln1"))  );
								}else {
									var line = this.getSaldoCapex(res.get(i).get("restable"),gridValue.get("jenis").toUpperCase(), parseFloat(gridValue.get("bln1"))  );
								}	
								line.pakai += parseFloat(dataRRR.get(i));
								line.sisa -= parseFloat(dataRRR.get(i));
								if (dataGrid.get(i) != undefined && dataGrid.get(i).nilai > line.sisa){
									system.alert(this,"Transaksi Donor tidak valid.","Nilai Donor melebihi Saldo Anggaran [Baris: "+dataGrid.get(i).index+"]");
									return false;
								}
								//-- moved temporary to bottom -->
								
							}*/																				
						}			
					}else {
						if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br>ambil data yang belum terposting..");
						var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.kode_akun,a.kode_cc,substr(a.periode,5,2) as periode, sum(a.nilai) as pakai "+
								"	from rra_anggaran a "+
								"	inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
								"		where a.kode_akun in ("+kodeAkun+")  and a.kode_cc in ("+kodeCc+") and a.periode like '"+this.e_periode.getText().substr(0,4)+"%'  and a.kode_lokasi= '"+this.app._lokasi+"' and lower(a.DC)= 'c' and b.flag_rfc='0' and b.no_pdrk <> '"+this.cb_pdrk.getText()+"' "+
								"group by a.kode_lokasi,a.kode_akun,a.kode_cc,a.periode "+
								"",true);						
						
						//gunakan keyMap = periode:cc:kodeAkun, agar cepat waktu cari data
						var dataRRR = new arrayMap();
						if (typeof data != "string"){
							var line;
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								dataRRR.set(line.periode+":"+line.kode_cc+":"+line.kode_akun,parseFloat(line.pakai));
							}						
						}		
						if (this.app._sapOnline){			
							if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br>ambil saldo SAP via RFC...");
							var dataGar = this.rfc.dataGar2(this.login,  this.e_periode.getText().substr(0,4),dataAkun,"1000","1000","64","0");
							
							if (typeof dataGar == "string"){
								system.alert(this,dataGar,"");
								if (this.hideLoading) this.hideLoading("wait....");
								return false;
							}
						}
					}
					try{					
						if (this.app._sapOnline){
							this.data1Thn = dataGar.get("saldothn");					
							for (var i in this.data1Thn.objList){						
								if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br>Generate PDRK3...");
								var row = this.data1Thn.get(i).get("restable");//
								var gridValue = this.data1Thn.get(i).get("value");							
								for (var l in row.objList){//rows = 0 - 23
									line = row.get(l).get("0");									
									//for (var l2 in line.objList)
									{//row
										var rrr = dataRRR.get(line.get("PERIO")+":"+i ) == undefined ? 0 : dataRRR.get(line.get("PERIO")+":"+i );									
										if (this.c_jenis.getText() == "CAPEX"){										
											if (parseFloat(line.get("PERIO")) == parseFloat(gridValue.get("bln1")) && (gridValue.get("versi") == "KEDUANYA" || gridValue.get("versi") == "K") )
												line.set("PLAN_CO", parseFloat(line.get("PLAN_CO")) - rrr);
											else if (parseFloat(line.get("PERIO")) == parseFloat(gridValue.get("bln1")) && (gridValue.get("versi") == "PAYMENT") && line.get("VERSN") == "000")
												line.set("PLAN_CO", parseFloat(line.get("PLAN_CO")) - rrr);
											else if (parseFloat(line.get("PERIO")) == parseFloat(gridValue.get("bln1")) && (gridValue.get("versi") == "COMMITMENT") && line.get("VERSN") == "007")
												line.set("PLAN_CO", parseFloat(line.get("PLAN_CO")) - rrr);
										}else  {
											if (parseFloat(line.get("PERIO")) == parseFloat(gridValue.get("bln1")) && (gridValue.get("versi") == "PAYMENT") )
												line.set("TSL09", parseFloat(line.get("TSL09")) - rrr);	
											else 
												line.set("TSL10", parseFloat(line.get("TSL10")) - rrr);	
										}
									}								
								}
							}
						}
					}catch(e){
						if (this.hideLoading) this.hideLoading("wait....");
						system.alert(this,e,"");
						return false;
					}
					/*var sql  = new server_util_arrayList({items:[
						"select a.kode_filter, kode_flag1, kode_flag2 from rra_filterakun a ",
						"select distinct kode_flag from rra_flag_relasi where kode_akun in (' ', "+akunDonor+" ) ",
						"select distinct kode_flag from rra_flag_relasi where kode_akun in (' ', "+akunTerima+" ) "
					]});				
					var data = this.dbLib.getMultiDataProvider(sql, true);							
					if (typeof data != "string" ){
						try{
							var dtFilter = data.result[0].rs.rows;
							var filter = new arrayMap();
							for (var i in dtFilter){
								var line = dtFilter[i];
								filter.set(line.kode_flag1+":"+line.kode_flag2, line.kode_filter);
							}
							var dtDonor = data.result[1].rs.rows;
							var dtTerima = data.result[2].rs.rows;												
							for (var i in dtDonor){
								var line = dtDonor[i];
								for (var j in dtTerima){
									var line2 = dtTerima[j];
									if (line.kode_flag == "MAN" && line2.kode_flag != "MAN"){
										system.alert(this,"Transaksi tidak valid","Akun-akun mandatory tidak boleh dipindahkan ke akun lain.");
										return false;
									}
									if (line.kode_flag == "KON" && line2.kode_flag != "KON"){
										system.alert(this,"Transaksi tidak valid","Akun-akun konsultan tidak boleh dipindahkan ke akun lain.");
										return false;
									}
									if (line2.kode_flag == "SPPD" && line.kode_flag != "SPPD"){
										system.alert(this,"Transaksi tidak valid","Akun-akun SPPD tidak boleh menerima dari akun lain.");
										return false;
									}
									if (filter.get(line.kode_flag+":"+line2.kode_flag)){
										system.alert(this,"Transaksi tidak valid","Akun-akun "+line.kode_flag+" tidak boleh dipindahkan ke "+line2.kode_flag+".");
										return false;
									}
								}
							}
						}catch(e){
							alert(e);
						}
					}else alert(data);				
					* 
					*/
					this.simpan();
					break;				
				case "simpancek" : this.simpan();			
					break;
				case "ubah" :	
					this.ubah();
					break;				
				case "hapus" :	
					this.hapus();
					break;				
			}
			return false;
		}catch(e){
			if (this.hideLoading) this.hideLoading("wait....");
			system.alert(this,e,"");
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		//this.e_nb.setText("");
		this.doClick();
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_frev_m","no_frev","FREV-"+this.app._kodeUbis+"-"+this.e_periode.getText().substr(2,4)+".","0000"));
		//this.e_ket.setFocus();
	},
	doChange:function(sender){
		try{
			if (sender == this.cb_ubis){
				this.dbLib.getDataProviderA("select kode_cc, nama from rra_cc where kode_lokasi = '"+this.app._lokasi+"' and kode_ubis = '"+sender.getText()+"'", undefined, "cc");		
			}
			if (sender == this.cb_templ){
				var data = this.dbLib.getDataProvider("select keterangan from rra_draft where kode_draft = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ",true);
				if (typeof data != "string" && data.rs.rows[0] != undefined){				
					this.mDesk.setCode(urldecode(data.rs.rows[0].keterangan));
				}
			}
			if (sender == this.cb_pdrk && this.cb_pdrk.getText()!="") {
				this.jenis = sender.dataFromList[2];
				this.cb_rev.setText(sender.dataFromList[3]);
				this.table = {master:"rra_rev_m", detail:"rra_rev_d", dok :"rra_rev_dok", field:"no_rev"};
				switch(this.jenis){
					case "PDRK" : this.table = {master:"rra_pdrk_m", detail:"rra_pdrk_d", dok :"rra_pdrk_dok", field:"no_pdrk"};
					break;
					case "REV" : this.table = {master:"rra_rev_m", detail:"rra_rev_d", dok :"rra_rev_dok", field:"no_rev"};
					break;
					case "GREV" : this.table = {master:"rra_grev_m", detail:"rra_grev_d", dok :"rra_grev_dok", field:"no_grev"};
					break;
					case "MREV" : this.table = {master:"rra_mrev_m", detail:"rra_mrev_d", dok :"rra_mrev_dok", field:"no_mrev"};
					break;
					
					
				}
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
						   "select a.no_pdrk,a.jenis_agg,a.kode_ubis,a.kode_gubis,a.nik_app1,a.nik_app2,a.nik_app3,b.nama as nama_ubis,c.nama as nama_gubis,d.nama as nama_app1,e.nama as nama_app2,f.nama as nama_app3,a.justifikasi,a.sts_pdrk, a.kode_kota, a.file_nd, a.no_nd, a.nik_appjust, a.nik_appjust2, a.nik_apppdrk3, a.nik_apppdrk32, g.flag_rfc, a.flag_rfc as flag, a.nik_review, a.keterangan, a.nik_buat, a.kajian   "+
						   "from "+this.table.master+" a inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi "+
						   "                  inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi "+
						   "                  left outer join rra_karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi "+
						   "                  left outer join rra_karyawan e on a.nik_app2=e.nik and a.kode_lokasi=e.kode_lokasi "+
						   "                  left outer join rra_karyawan f on a.nik_app3=f.nik and a.kode_lokasi=f.kode_lokasi "+
						   "                  inner join rra_pdrk_m g on a.no_pdrk = g.no_pdrk and a.kode_lokasi=g.kode_lokasi "+
						   "where a."+this.table.field+"='"+this.cb_rev.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
						   "select file_dok, nama from "+this.table.dok+" where "+this.table.field+" = '"+this.cb_rev.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by no_urut",
						   "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai_gar,a.nilai_pakai,a.saldo,a.nilai,a.dc,a.target, a.jenis, a.nilai_keep "+
							 "from "+this.table.detail+" a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
							 "					inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "					left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
							 "where a."+this.table.field+" = '"+this.cb_rev.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc"
						   ]}),false);				
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.result[0].rs.rows[0];
					if (line != undefined){
					
						this.e_rfc.setText(line.flag_rfc == "0" ? "Belum" : "Sudah");
						this.e_modul.setText(line.sts_pdrk);						
						this.c_jenis.setText(line.jenis_agg);
						this.cb_ubis.setText(line.kode_ubis,line.nama_ubis);
						this.cb_gubis.setText(line.kode_gubis,line.nama_gubis);
						this.cb_app1.setText(line.nik_app1,line.nama_app1);
						this.cb_app2.setText(line.nik_app2,line.nama_app2);
						this.cb_app3.setText(line.nik_app3,line.nama_app3);
						this.cb_buat.setText(line.nik_buat);
						this.e_ket.setText(line.keterangan);
						this.cb_appj1.setText(line.nik_appjust);
						this.cb_appj2.setText(line.nik_appjust2);
						this.cb_appp3.setText(line.nik_apppdrk3);
						this.cb_appp32.setText(line.nik_apppdrk32);
						this.cb_reviewer.setText(line.nik_review);
						this.cb_kota.setText(line.kode_kota);
						this.e_file.setText(line.file_nd);
						this.ed_dok.setText(line.no_nd);
						this.mDesk.setCode(urldecode(line.justifikasi));
						this.mDesk2.setCode(urldecode(line.kajian));
						this.flagRFC = {flagpdrk : line.flag_rfc, flagrev: line.flag};
						if ( line.flag_rfc == "1" )						
							this.e_rfc.setText(line.flag_rfc != line.flag  ? "Belum" : "Sudah");
						this.filter = "where a.no_pdrk = '"+sender.getText()+"'";
						this.filter2 = "/"+this.app._periode+"/"+this.e_modul.getText()+"/"+this.app._kodeUbis+"/"+this.app._namaForm;									
						var url = [
							this.report.previewWithHeader("server_report_rra_rptPdrk1",this.filter, 1,  1, this.showFilter, this.app._namaLokasi,this.filter2),
							this.report.previewWithHeader("server_report_rra_rptPdrk2",this.filter, 1,  1, this.showFilter, this.app._namaLokasi,this.filter2),
							this.report.previewWithHeader("server_report_rra_rptPdrk3",this.filter, 1,  1, this.showFilter, this.app._namaLokasi,this.filter2),
							this.report.previewWithHeader("server_report_rra_rptSukka",this.filter, 1,  1, this.showFilter, this.app._namaLokasi,this.filter2)
							];
						this.viewer.previewMultiPage(url, true, ["PDRK-1","PDRK-2","PDRK-3","SUKKA"]);
					} 
					this.sgUpld.clear();
					for (var i in data.result[1].rs.rows){
						line = data.result[1].rs.rows[i];
						this.sgUpld.appendData([line.file_dok, {tmpfile:line.file_dok,filedest:line.file_dok},line.nama]);
						this.sgUpld.rows.get(i).values[1] = {tmpfile:line.file_dok,filedest:line.file_dok};
						this.sgUpld.rows.get(i).setHint("Double Click untuk membuka file");
					}
				}
				
				this.sg.clear(); this.sg2.clear();			
				//var data = this.dbLib.getDataProvider(strSQL,true);
				data = data.result[2];
				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.dataOrig = new arrayMap();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];
						var jenis = line.jenis == "P" ? "PAYMENT" : line.jenis == "C" ? "COMMITMENT" :"KEDUANYA";
						//error_log("LOG:"+line.bulan+":"+line.kode_cc+":"+line.kode_akun+":"+line.kode_drk+":"+line.jenis);
						if (line.dc.toUpperCase() == "C"){
							this.sg.appendData([line.bulan,line.kode_cc,line.nama_cc,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,floatToNilai(line.nilai_gar),floatToNilai(line.nilai_pakai),floatToNilai(line.saldo),floatToNilai(line.nilai), jenis, floatToNilai(line.nilai_keep)]);
							this.dataOrig.set(line.bulan+":"+line.kode_cc+":"+line.kode_akun+":"+line.kode_drk+":"+line.jenis,{periode:line.bulan, cc:line.kode_cc, drk:line.kode_drk, akun:line.kode_akun, sawal: line.nilai_gar, pakai:line.nilai_pakai, sisa:line.saldo, nilai:line.nilai, jenis:line.jenis, keep: line.nilai_keep});
						}else this.sg2.appendData([line.bulan,line.kode_cc,line.nama_cc,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,floatToNilai(line.nilai),line.target, jenis]);
					}
				} else {
					this.sg.clear(1);
					this.sg2.clear(1);
				}
				
				if (this.e_modul.getText() == "ABT") this.sg.clear(1);
			}
		}catch(e){
			alert(e);
		}
	},
    callRFC : function(func,imp, expTable, impTable, exp){
       var login = new server_util_Map({items:{
               user : this.e_uid.getText(),
               passwd : this.e_pwd.getText()}
               } );
       var sapImp = new server_util_Map({items: imp});
       var sapExpTable = new server_util_arrayList({items:expTable});
       var sapImpTable = new server_util_Map({items: impTable});
       exp = new server_util_arrayList({items:exp});
       return this.rfcLib.callRFCSynch(login, func, sapImp, sapExpTable, sapImpTable, exp,  true);
   },
   getFundCtrAkun: function(wbs){
       var wbsOld = wbs;
       wbs = wbs.replace(/-/gi,"");
       var data = this.callRFC("ZFMFI_FMDERIVER",{IM_POSID: wbs},undefined, undefined,["EX_FIPEX","EX_FISTL","EX_GEBER"]);
       if (typeof data == "string"){
          system.alert(this,data,"");
          return false;
       }else {
          var fund = data.get("EX_GEBER");
          var fundCtr = data.get("EX_FISTL");
          this.fund = fund;
          var akun = data.get("EX_FIPEX");
          if (fund == "") {
              system.alert(this,"Fund tidak ditemukan untuk WBS "+wbsOld+" "+wbs,fundCtr+":"+akun);
              return false;
          }
       }
       if (akun == ""){
          //call From RollUpMinus
          var data = this.callRFC("ZFMFI_FUND",{
                  IM_FINCODE: fund,
                  IM_GJAHR:this.e_periode.getText().substr(0,4),
                  IM_KOKRS:"1000",
                  IM_VERSN:"000" },
                  ["T_RESULT"],undefined ,["EX_RETURN"]);
          if (typeof data == "string"){
              system.alert(this, data,"");
              return false;
          }else {
              var listAkun = new arrayList();
              var rows, line, expData = data.get("T_RESULT");
              for (var i in expData.objList){
                  rows = expData.get(i);
                  for (var j in rows.objList){
                      line = rows.get(j).getArray();
                      listAkun.add(line);
                      akun = line.FIPOS;
                  }
              }
          }
      }
       return {fund: fund,
               fundCtr : fundCtr,
               akun: akun};
   },
   getSaldoOpex: function(restable, versi, periode){		
	    try{
			var tmp = new arrayMap();
			var saldo = 0;
			var rfcRet = {	sawal 	: 0,
							pakai 	: 0,
							sisa 	: 0,
							sisaRls : 0,						
							ReleaseBlnC	: 0, ReleaseBlnP	:0, sisaBln		: 0, sisaRlsBln 	: 0, releaseBln : 0,
							sawalPayment: 0, pakaiPayment	:0, sisaPayment : 0, sisaRlsPayment	: 0, planPayment: 0,
							sawalCommit	: 0, pakaiCommit	:0, sisaCommit 	: 0, sisaRlsCommit 	: 0, planCommit	: 0
			};					
			for (var i in restable.objList){ 
				var line = restable.get(i).get("0");
				var lastLine = restable.get(15).get("0");				
				if (parseFloat(line.get("PERIO")) == periode){
					tmp = line;								
					if (parseFloat(lastLine.get("TSL04")) != 0)
						tmp.set("TSL04", parseFloat(line.get("TSL04")) - saldo);
					rfcRet.releaseBlnC = parseFloat(tmp.get("TSL06"));
					rfcRet.releaseBlnP = parseFloat(tmp.get("TSL05"));					
				}
				saldo = parseFloat(line.get("TSL04"));			
			}							
			if (tmp != undefined){							
				
				for (var i in restable.objList){ 
					var line = restable.get(i).get("0");				
					rfcRet.sawalPayment += parseFloat(line.get("TSL05"));
					rfcRet.pakaiPayment += parseFloat(line.get("TSL03"));
					rfcRet.planPayment += parseFloat(line.get("TSL09"));
					rfcRet.sawalCommit += parseFloat(line.get("TSL06"));
					rfcRet.pakaiCommit += parseFloat(line.get("TSL04"));
					rfcRet.planCommit += parseFloat(line.get("TSL10"));				
				}						
				if ( versi == "PAYMENT"){
					rfcRet.sawal = rfcRet.sawalPayment;
					rfcRet.pakai = rfcRet.pakaiPayment;									
				}else {
					rfcRet.sawal = rfcRet.sawalCommit;
					rfcRet.pakai = rfcRet.pakaiCommit;								
				}
				rfcRet.sisa = rfcRet.sawal - rfcRet.pakai;
				rfcRet.sisaRls = rfcRet.sisa;
				if (versi == "KEDUANYA"){
					//cari saldo yang minimum, yg kecil harusnya commit				
					var min = Math.min(rfcRet.sawalPayment - rfcRet.pakaiPayment, rfcRet.sawalCommit - rfcRet.pakaiCommit);
					if (min == rfcRet.sawalPayment - rfcRet.pakaiPayment) //payment
					{
						rfcRet.sawal = rfcRet.sawalPayment;
						rfcRet.pakai = rfcRet.pakaiPayment;	
						rfcRet.releaseBln = rfcRet.releaseBlnP;						
					}else {
						rfcRet.sawal 	= rfcRet.sawalCommit;
						rfcRet.pakai 	= rfcRet.pakaiCommit;					
						rfcRet.releaseBln = rfcRet.releaseBlnC;						
					}
					rfcRet.sisa = rfcRet.sawal - rfcRet.pakai,
					rfcRet.sisaRls = rfcRet.sisa;
				}
				
			}							
			return rfcRet;
		}catch(e){
			error_log(e);
			return rfcRet;
		}
	},	
	getSaldoCapex: function(restable, versi, periode){		
		var tmp = restable;
		var rfcRet = {sawal :0, pakai : 0, sisa : 0, sisaRls:0,
			sawalBln:0, pakaiBln:0, sisaBln:0, sisaRlsBln : 0,
			sawalPayment: 0, pakaiPayment:0, sisaPayment : 0, sisaRlsPayment:0,
			sawalCommit: 0, pakaiCommit:0, sisaCommit : 0, sisaRlsCommit : 0
		};
		for (var i in restable.objList){																		
			var item = restable.get(i).get("0");		

			if (versi == "PAYMENT" && item.get("VERSN") == "000" && periode == parseFloat(item.get("PERIO")) ){
				rfcRet.sawalBln = parseFloat(item.get("PLAN_CO"));
				rfcRet.pakaiBln = nilaiToFloat(item.get("ACTUAL"));
				rfcRet.sisaBln = parseFloat(item.get("PLAN_CO")) - nilaiToFloat(item.get("ACTUAL"));								
				rfcRet.sisaRlsBln = nilaiToFloat(item.get("RELEASE")) - nilaiToFloat(item.get("ACTUAL"));								
			}else if (versi != "PAYMENT" && item.get("VERSN") == "007" && periode == parseFloat(item.get("PERIO")) ){
				rfcRet.sawalBln = parseFloat(item.get("PLAN_CO"));
				rfcRet.pakaiBln = nilaiToFloat(item.get("ACTUAL"));
				rfcRet.sisaBln = parseFloat(item.get("PLAN_CO")) - nilaiToFloat(item.get("ACTUAL"));								
				rfcRet.sisaRlsBln = nilaiToFloat(item.get("RELEASE")) - nilaiToFloat(item.get("ACTUAL"));								
			}	
			if (trim(item.get("VERSN")) == "000"){
				rfcRet.sawalPayment += parseFloat(item.get("PLAN_CO"));
				rfcRet.pakaiPayment += nilaiToFloat(item.get("ACTUAL"));
				rfcRet.sisaPayment += parseFloat(item.get("PLAN_CO")) - nilaiToFloat(item.get("ACTUAL"));								
				rfcRet.sisaRlsPayment += nilaiToFloat(item.get("RELEASE")) - nilaiToFloat(item.get("ACTUAL"));								
			}else if (trim(item.get("VERSN")) == "007"){
				rfcRet.sawalCommit += parseFloat(item.get("PLAN_CO"));
				rfcRet.pakaiCommit += nilaiToFloat(item.get("ACTUAL"));
				rfcRet.sisaCommit += parseFloat(item.get("PLAN_CO")) - nilaiToFloat(item.get("ACTUAL"));								
				rfcRet.sisaRlsCommit += nilaiToFloat(item.get("RELEASE")) - nilaiToFloat(item.get("ACTUAL"));								
			}							
			if (versi == "KEDUANYA" || versi == ""){
				rfcRet.sisa = Math.min(rfcRet.sisaPayment, rfcRet.sisaCommit) ;
				rfcRet.sawal = rfcRet.sisa == rfcRet.sisaPayment ? rfcRet.sawalPayment : rfcRet.sawalCommit ;
				rfcRet.pakai = rfcRet.sisa == rfcRet.sisaPayment ? rfcRet.pakaiPayment : rfcRet.pakaiCommit ;
				rfcRet.sisaRls = Math.min(rfcRet.sisaRlsPayment, rfcRet.sisaRlsCommit);								
			}else {
				if (versi == "PAYMENT"){
					rfcRet.sawal = rfcRet.sawalPayment;
					rfcRet.pakai = rfcRet.pakaiPayment;
					rfcRet.sisa = rfcRet.sisaPayment;
					rfcRet.sisaRls = rfcRet.sisaRlsPayment;
				}else{
					rfcRet.sawal = rfcRet.sawalCommit;
					rfcRet.pakai = rfcRet.pakaiCommit;
					rfcRet.sisa = rfcRet.sisaCommit;
					rfcRet.sisaRls = rfcRet.sisaRlsCommit;
				}
			}
			rfcRet.releaseBln = rfcRet.sawal;
		}				
		return rfcRet;		
	},
    doChangeCell: function(sender, col, row) {
        try{
			sender.onChange.set(this,undefined);			
           if (sender.userData == undefined) sender.userData = new arrayMap();
           if (col == 0){
               if (parseFloat(sender.cells(0,row)) < 1 || parseFloat(sender.cells(0,row)) > 12 ) {
                   system.alert(this,"Periode tidak dikenal "+sender.cells(0,row),"");
                   sender.cells(0,row,"");
                   sender.onChange.set(this,"doChangeCell");
                   return;
               }
               if (trim(this.sg.cells(0,row)).length == 1) this.sg.cells(0,row,"0"+trim(this.sg.cells(0,row)));
           }
           var rfcRet = {sawal:0, pakai :0, sisa:0};
           if (col == 0 || col == 1 || col == 3 || col == 5 || col == 11) {
                if (this.sg.cells(3,row) != "")
                {
                   if (this.c_jenis.getText() == "CAPEX"){
                       var dataFund = this.getFundCtrAkun(sender.cells(3, row));
                       if (dataFund == false){
                           sender.onChange.set(this,"doChangeCell");
                           return;
                       }
                       var fund = dataFund.fund;
                       var fundCtr = dataFund.fundCtr;
                       var akun = dataFund.akun;
                       this.fund = fund;
                       sender.cells(1,row, fundCtr);
                       sender.cells(2,row,this.dataCC.get(fundCtr));
                       sender.cells(5,row, akun);
                       sender.cells(6,row,this.dataAkun.get(akun));
                       if (akun == ""){
                           system.alert(this, "Data akun tidak ditemukan. "+ fund +":"+fundCtr,"");
                           sender.onChange.set(this,"doChangeCell");
                           return;
                       }
                   }
               }
               if (this.sg.cells(0,row) != "" && this.sg.cells(1,row) != "" && this.sg.cells(3,row) != "" && this.sg.cells(5,row) != "") {
                   var data = this.dbLib.getDataProvider("select kode_akun, kode_cc, kode_drk, sum(pakai) as pakai from ( "+
						" select a.kode_lokasi,a.kode_akun,a.kode_cc, kode_drk, sum(a.nilai) as pakai "+
                       "	from rra_anggaran a "+
                       "	inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
                       "		where a.kode_akun = '"+this.sg.cells(5,row)+"'  and a.periode like '"+this.e_periode.getText().substr(0,4)+"%'  and a.kode_cc = '"+this.sg.cells(1,row)+"'  and a.kode_lokasi= '"+this.app._lokasi+"' and lower(a.DC)= 'c' and b.flag_rfc='0' and no_bukti <> '"+this.cb_pdrk.getText()+"'"+ //and a.periode = '"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,row)+"' 
                       "group by a.kode_lokasi,a.kode_akun,a.kode_cc, kode_drk "+
                       " union "+
                       "select a.kode_lokasi,a.kode_akun,a.kode_cc, kode_drk, sum(a.nilai) * -1 as pakai "+
                       "	from rra_anggaran a "+
                       "	inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
                       "		where a.kode_akun = '"+this.sg.cells(5,row)+"'  and a.periode like '"+this.e_periode.getText().substr(0,4)+"%'  and a.kode_cc = '"+this.sg.cells(1,row)+"'  and a.kode_lokasi= '"+this.app._lokasi+"' and lower(a.DC)= 'c' and b.flag_rfc='1' and no_bukti = '"+this.cb_pdrk.getText()+"'"+ //and a.periode = '"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,row)+"'
                       "group by a.kode_lokasi,a.kode_akun, a.kode_cc, kode_drk )  group by kode_akun, kode_cc, kode_drk",true);  
                   //gunakan keyMap = periode:cc:kodeAkun, agar cepat waktu cari data                   
                   var dataRRR = new arrayMap();
                   if (typeof data != "string"){
                       var line;
                       for (var i in data.rs.rows){
                           line = data.rs.rows[i];                           
                           dataRRR.set(line.kode_cc+":"+line.kode_akun+":"+line.kode_drk,parseFloat(line.pakai));
                       }
                   }else {
                       sender.onChange.set(this,"doChangeCell");
                       return false;
                   }
                   var rfcRet = {sawal :0, pakai : 0, sisa : 0, sisaRls:0,
						sawalBln:0, pakaiBln:0, sisaBln:0, sisaRlsBln : 0,
						sawalPayment: 0, pakaiPayment:0, sisaPayment : 0, sisaRlsPayment:0,
						sawalCommit: 0, pakaiCommit:0, sisaCommit : 0, sisaRlsCommit : 0
					};
                   if (this.c_jenis.getText() == "OPEX")
                   {
                       var res = this.callRFC("ZFMFI_CEKSALDO_1THN", {
                                           IM_ACCGROUP:"E",
                                           IM_FICTR:sender.cells(1,row),
                                           IM_FIKRS:"1000",
                                           IM_KOKRS:"1000",
                                           IM_VERSN:"000",
                                           IM_FIPEX:sender.cells(5,row),
                                           IM_GJAHR:this.e_periode.getText().substr(0,4),
                                           IM_FT_WRTTP:"64"
                                           //IM_PERFROM:"0" + this.sg.cells(0,row),
                                           //IM_PERTO:"0"+this.sg.cells(0,row)
                                       },
                                       ["T_SALDO_1THN"],
                                       undefined,
                                       []);
                       if (typeof res == "string"){
                           system.alert(this,res,"");
                           sender.onChange.set(this,"doChangeCell");
                           return;
                       }
						var restable = res.get("T_SALDO_1THN");						
						var rfcRet = this.getSaldoOpex(restable, sender.cells(11,row).toUpperCase(), parseFloat(this.sg.cells(0,row)));
                   }else {
                       //listData From Pickist
                        var wbs = sender.cells(3,row).replace(/-/gi,"");		
						var saldo = this.callRFC("ZFMFI_CEKSALDO_CAPEX_1THN",{
											IM_GEBER:this.fund,
											IM_POSID:wbs,
											IM_FICTR:sender.cells(1,row),
											IM_FIKRS:"1000",
											IM_FIPEX:sender.cells(5,row),
											IM_GJAHR:this.e_periode.getText().substr(0,4)
										},
										["T_SALDO_1THN"],
										undefined,
										undefined);
						if (typeof saldo == "string"){
							system.alert(this,saldo,"");
							sender.onChange.set(this,"doChangeCell");
							return;
						}
						var restable = saldo.get("T_SALDO_1THN");//RESTABLE						
						var rfcRet = this.getSaldoCapex(restable, sender.cells(11,row).toUpperCase(), parseFloat(this.sg.cells(0,row)));						                       
                   }

                   if (line) var i = line.kode_cc+":"+line.kode_akun+":"+line.kode_drk;
                   dataRRR.set(i, (dataRRR.get(i) == undefined ? 0 : dataRRR.get(i)) );                   
                   rfcRet.sawal -=  parseFloat(dataRRR.get(i));
                   rfcRet.sisa -=  parseFloat(dataRRR.get(i));
                   rfcRet.sisaRls -= parseFloat(dataRRR.get(i));
					if (rfcRet != undefined){
						this.sg.setCell(7,row,floatToNilai(rfcRet.sawal));
						this.sg.setCell(8,row,floatToNilai(rfcRet.pakai));
						this.sg.setCell(9,row,floatToNilai(rfcRet.sisa));
						if (this.sg.cells(10,row) != ""){
							if (nilaiToFloat(this.sg.cells(10,row)) <= rfcRet.sisaRls)
								this.sg.cells(12,row,this.sg.cells(10,row));
							else  this.sg.cells(12,row,floatToNilai(rfcRet.sisaRls));
						}
					} else {
						this.sg.setCell(7,row,"0");
						this.sg.setCell(8,row,"0");
						this.sg.setCell(9,row,"0");
						this.sg.setCell(12,row,"0");
					}					
					sender.userData.set(row,rfcRet);
               }
           }
           switch (col){
               case 1 :
                   if(sender.cells(1,row) != "" && this.dataCC.get(sender.cells(1,row)) == undefined){
                       if (this.locateCC(sender, 2,row,sender.cells(1,row)) == false){
							this.app._mainForm.pesan(0,"Data CC tidak ditemukan");
							sender.cells(1, row, "") ;							
							sender.onChange.set(this,"doChangeCell");
							return;
						}
                   }
                   sender.cells(2, row, this.dataCC.get(sender.cells(1,row)) );
               break;
               case 3 :
                   if (this.c_jenis.getText() == "OPEX")
                       sender.cells(4, row, "-");
                   //else sender.cells(4, row, this.dataDrk.get(sender.cells(3,row)) );
               break;
               case 5 :
                   if(sender.cells(5,row) != "" && this.dataAkun.get(sender.cells(5,row)) == undefined){
						if (this.locateAkun(sender, 6,row,sender.cells(5,row)) == false){
							this.app._mainForm.pesan(0,"Data akun tidak ditemukan");
							sender.cells(5, row, "") ;
							sender.cells(6, row, "") ;			
							sender.onChange.set(this,"doChangeCell2");
							return;
						}
                   }
                   sender.cells(6, row, this.dataAkun.get(sender.cells(5, row)) );
               break;

           }
            if (col == 10) {
				
				var rfcRet = sender.userData.get(row);								
				if (this.sg.cells(10,row) != "" && rfcRet != undefined){					
					if (nilaiToFloat(this.sg.cells(10,row)) <= rfcRet.sisaRls)
						this.sg.cells(12,row,this.sg.cells(10,row));
					else  this.sg.cells(12,row,floatToNilai(rfcRet.sisaRls));
				}else if (this.sg.cells(10,row) != ""){
					this.sg.cells(12,row,this.sg.cells(10,row));
				}				
			}
			this.sg.validasi();
            sender.onChange.set(this,"doChangeCell");
        }catch(e){
            sender.onChange.set(this,"doChangeCell");
            system.alert(this,e,"");
        }
	},
	/**
	 * Jika gagal, pakai menu keep/Release SAP (belum di bisa dipanggil dari Release SAP)
	 */
	release: function(sql){
		try{									
					uses("server_util_arrayList");					
					var noRRR = "'"+this.cb_rev.getText()+"'";					
					var dataAkun = new server_util_arrayList();
					var dataAkun2 = new server_util_arrayList();
					if (this.e_rfc.getText() == "Belum")
						var data = this.dbLib.getDataProvider(
							"select status, jns, no_bukti, kode_akun, kode_cc, kode_drk, periode, nilai, prd, versi from ("+							
							"select 'NEW' as status, 'FC' as jns, a.no_frev as no_bukti,a.kode_akun, a.kode_cc, a.kode_drk,substr(a.periode,5,2) as periode, -1 * ifnull(a.nilai_keep,a.nilai) as nilai, a.periode as prd, a.jenis as versi  from rra_frev_d a where a.no_frev in ('"+this.e_nb.getText()+"') and dc='C'  "+
							") a "+
							"order by versi,periode, kode_cc, kode_akun",true);
					else 
						var data = this.dbLib.getDataProvider(
							"select status, jns, no_bukti, kode_akun, kode_cc, kode_drk, periode, nilai, prd, versi from ("+
							"select 'OLD' as status, jns, no_bukti, kode_akun, kode_cc, kode_drk, periode, nilai, prd,versi from ("+
							"select 'UB' as jns,a.no_pdrk as no_bukti,a.kode_akun, a.kode_cc, a.kode_drk,substr(a.periode,5,2) as periode, ifnull(a.nilai_keep,a.nilai) as nilai, a.periode as prd, a.jenis as versi  from rra_pdrk_d a where a.no_pdrk in ('"+this.cb_pdrk.getText()+"') and dc='C' "+
							" union "+
							"select 'GB',a.no_grev as no_bukti,a.kode_akun, a.kode_cc, a.kode_drk,substr(a.periode,5,2) as periode, ifnull(a.nilai_keep,a.nilai) as nilai, a.periode as prd, a.jenis as versi  from rra_grev_d a where a.no_grev in ("+noRRR+") and dc='C' "+
							" union "+
							"select 'MA',a.no_mrev as no_bukti,a.kode_akun, a.kode_cc, a.kode_drk,substr(a.periode,5,2) as periode, ifnull(a.nilai_keep,a.nilai) as nilai, a.periode as prd, a.jenis as versi  from rra_mrev_d a where a.no_mrev in ("+noRRR+") and dc='C' "+
							") a  "+
							" union "+
							"select 'NEW' as status, 'FC', a.no_frev as no_bukti,a.kode_akun, a.kode_cc, a.kode_drk,substr(a.periode,5,2) as periode, -1 * ifnull(a.nilai_keep,a.nilai) as nilai, a.periode as prd, a.jenis as versi  from rra_frev_d a where a.no_frev in ('"+this.e_nb.getText()+"') and dc='C'  "+
							") a "+
							"order by versi,periode, kode_cc, kode_akun",true);
					
					if (typeof data != "string"){
						var line;
						for (var i in data.rs.rows){
							line = data.rs.rows[i];
							//untuk MA yang mengambil dana diatas current periode... update plant aja							
							var nilai = line.nilai;
							if (line.prd > this.app._periodeGAR)
								dataAkun2.add(new server_util_Map({items:{fikrs:"1000",
																		  kokrs:"1000",
																		  no_bukti:line.no_bukti,
																		  drk:line.kode_drk,
																		  jenis:line.jns,
																		  akun:line.kode_akun,
																		  cc:line.kode_cc,
																		  bln:"0"+line.periode,
																		  versi : line.versi,
																		  nilai: nilai}}));
							else 							
								dataAkun.add(new server_util_Map({items:{fikrs:"1000",
																		 kokrs:"1000",
																		 no_bukti:line.no_bukti,
																		 drk:line.kode_drk,
																		 jenis:line.jns,
																		 akun:line.kode_akun,
																		 cc:line.kode_cc,
																		 bln:"0"+line.periode,
																		 versi : line.versi,
																		 nilai: nilai }}));
						}
					}else {
						system.alert(this,data,"");
						return false;
					}					
					if (this.c_jenis.getText() == "OPEX"){
						var res = this.rfc.release(this.login,  this.e_periode.getText().substr(0,4),dataAkun," ");
					}else {
						var res = this.rfc.releaseCapex(this.login,  this.e_periode.getText().substr(0,4),dataAkun);
					}
					
					if (typeof res == "string")
					{
						system.alert(this, "RFC Response:", res);
						return false;
					}					
					var status = res.get("ex_return");					
					if (status == "FAILED"){						
						var msg = res.get("msg");						
						for (var i in res.objList){							
							if (i == "log") {																					
								var line, text = "";
								for (var l in res.get("log").objList){
									line = res.get("log").get(l);
									for (var m in line.objList){
										for (var g in line.get(m).objList)
											text += m+":"+line.get(m).get(g);
										text += "<br>";
									}
								}
								var data = res.get("data");
								var dt = "";
								for (var o in data.objList) {
									if (dt != "") dt += ",";
									dt += o+":"+data.get(o);
								}
								var dataSuccess = res.get("success");
								var dtSuccess = "<table class='kotak' border=1><tr><td>No Review</td><td>Akun</td><td>Cost Center</td><td>Bulan</td><td>Nilai</td></tr>";
								for (var d in dataSuccess.objList){
									line = dataSuccess.get(d);
									dtSuccess += "<tr><td>"+line.get()+"</td>:<td>"+line.get("akun") +"</td>:<td>"+line.get("cc")+"</td>:<td>"+line.get("bln")+"</td>:<td>"+line.get("nilai")+"</td></tr>";
									
								}
								dtSuccess += "</table>";
								system.alert(this,"Error RFC:"+msg+"<br> "+ dt+"<br>"+text, dtSuccess);
								return false;
							}
						}
						return false;
					}
					if (status == "SUCCESS" || dataAkun.getLength() == 0){
						if (dataAkun2.getLength() > 0) {
							var res = this.rfc.keepPlan(this.login,  this.e_periode.getText().substr(0,4),dataAkun2," ");
							var status = res.get("ex_return");										
							if (status == "FAILED"){
								//cek KP06 = update CO
								var log = res.get("KP06");						
								if (log && log.get("ex_return") == "FAILED") {							
									if (log.get("msg") == undefined) this.showAlert(log, log.get("data"), log.get("proses"));
									else system.alert(this,log.get("msg"),"");
									return false;
								}
								log = res.get("FM9C");						
								if (log &&  log.get("ex_return") == "FAILED") {											
									for (var i in log.objList) alert(i +":"+log.get(i));
									if (log.get("msg") == undefined) this.showAlert(log, log.get("data"), log.get("proses"));
									else system.alert(this,log.get("msg"),"");
									return false;
								}			
							}
						}
					}
					var e_nb = this.standarLib.noBuktiOtomatis(this.dbLib,"rra_app_m","no_app","FCKEP-"+this.e_periode.getText().substr(2,4)+".","0000");
					if (status == 'SUCCESS') {
						//var sql = new server_util_arrayList();
						sql.add("insert into rra_app_m(no_app, kode_lokasi,tanggal,keterangan,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,jenis_form) values " +
							"('" + e_nb +"','" +this.app._lokasi +"','" +this.dp_d1.getDateString() +"','" +this.e_ket.getText() +
							"','" +this.e_modul.getText() +"','" +this.e_periode.getText() +"','-','" +this.app._userLog +
							"','" +this.app._userLog +"','" +this.app._userLog +"',now(),'FCKEP')");
						sql.add("insert into rra_app_d(no_app,modul,no_bukti,kode_lokasi,sts_pdrk,catatan) values " +
								"('" +e_nb +"','" +this.e_modul.getText() +"','" +this.e_nb.getText() +"','" +this.app._lokasi +
								"','" +this.jenis.toUpperCase() +"','" + this.cb_pdrk.getText() + "')");
						var updateFlag = this.e_modul.getText() == "RRR" ? " flag_rfc = '1'":" flag_rfc = '2'";
						if (this.jenis.toUpperCase() == "REV") 
							sql.add("update rra_rev_m set "+updateFlag+" where no_pdrk='" + this.cb_pdrk.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						if (this.jenis.toUpperCase() == "GREV") 
							sql.add("update rra_grev_m set "+updateFlag+" where no_pdrk='" + this.cb_pdrk.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");
						if (this.jenis.toUpperCase() == "MREV") 
							sql.add("update rra_mrev_m set flag_rfc='1' where no_pdrk='" + this.cb_pdrk.getText() + "' and kode_lokasi='" + this.app._lokasi + "'");						
						this.dbLib.execArraySQL(sql, undefined, this);
						return true;
					}else {
						system.alert(this,"Status :"+status,"");
						return false;
					}
				}
				catch(e){
					setTipeButton(tbSimpan);
					system.alert(this, e,"");
					return false;
				}
	},
	doChangeCell2: function(sender, col, row) {
		sender.onChange.set(this,undefined);
		if (col == 0){
			if (trim(this.sg2.cells(0,row)).length == 1) this.sg2.cells(0,row,"0"+trim(this.sg2.cells(0,row)));
		}
		switch (col){
			case 1 :
				if(sender.cells(1,row) != "" && this.dataCC.get(sender.cells(1,row)) == undefined){
					if (this.locateCC(sender, 2,row,sender.cells(1,row)) == false){
						this.app._mainForm.pesan(0,"Data CC tidak ditemukan");
						sender.cells(1, row, "") ;							
						sender.onChange.set(this,"doChangeCell2");
						return;
					}
				}					
				sender.cells(2, row, this.dataCC.get(sender.cells(1,row)) );
			break;
			case 3 :
				if (this.c_jenis.getText() == "OPEX"){
					sender.cells(4, row, "-");
				}else {
					var dataFund = this.getFundCtrAkun(sender.cells(3,row));
					sender.cells(1,row, dataFund.fundCtr);
					sender.cells(2,row, this.dataCC.get(sender.cells(1,row)));
					sender.cells(5,row, dataFund.akun);
					sender.cells(6,row, this.dataAkun.get(sender.cells(5,row)));
					//sender.cells(4, row, this.dataDrk.get(sender.cells(3,row)) );
				}
			break;
			case 5 :				
				if(sender.cells(5,row) != "" && this.dataAkun.get(sender.cells(5,row)) == undefined){
					if (this.locateAkun(sender, 6,row,sender.cells(5,row)) == false){
						this.app._mainForm.pesan(0,"Data akun tidak ditemukan");
						sender.cells(5, row, "") ;
						sender.cells(6, row, "") ;			
						sender.onChange.set(this,"doChangeCell2");
						return;
					}
									
				}										
				sender.cells(6, row, this.dataAkun.get(sender.cells(5, row)) );
			break;
			
		}
		if (col == 7) this.sg2.validasi();
		sender.onChange.set(this,"doChangeCell2");
	},
	doNilaiChange: function(sender){
		try{
			var tot = 0;
			var data = new arrayMap();				
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.cells(1,i) != "" && this.sg.cells(3,i) != "" && this.sg.cells(5,i) != ""){
					var akunCC = this.sg.cells(1,i)+":"+this.sg.cells(3,i)+":"+this.sg.cells(5,i);	
					var tmp = data.get(akunCC);
					if (tmp == undefined){
						tmp = {gar:nilaiToFloat(this.sg.cells(7,i)), pakai:nilaiToFloat(this.sg.cells(8,i)), saldo:nilaiToFloat(this.sg.cells(9,i)), donor:nilaiToFloat(this.sg.cells(10,i)),lastDonor:nilaiToFloat(this.sg.cells(10,i))};
					}else {
						//gar - donor yg terpakai
						this.sg.cells(7,i, floatToNilai(tmp.gar - tmp.lastDonor));
						this.sg.cells(9,i, floatToNilai(tmp.saldo - tmp.lastDonor));
						
						tmp.saldo -= tmp.lastDonor;
						tmp.gar -= tmp.lastDonor;
						
						tmp.donor += nilaiToFloat(this.sg.cells(10,i));
						tmp.lastDonor = nilaiToFloat(this.sg.cells(10,i));
						
					}					
					data.set(akunCC, tmp)
				}
				
				if (this.sg.cells(10,i) != ""){
					tot += nilaiToFloat(this.sg.cells(10,i));			
				}
			}			
			this.e_donor.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doNilaiChange2: function(sender){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.getCell(7,i) != ""){
					tot += nilaiToFloat(this.sg2.getCell(7,i));			
				}
			}
			this.e_terima.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doEllipsClick: function(sender, col, row) {
		try{
			if (this.e_modul.getText() != "ABT") {
				switch(col){
					case 1 :
							this.standarLib.showListDataForSG(this, "Daftar Cost Center",this.sg, this.sg.row, this.sg.col, 
															"select kode_cc, nama  from rra_cc where kode_ubis = '"+this.cb_ubis.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
															"select count(kode_cc) from rra_cc where kode_ubis = '"+this.cb_ubis.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
															 new Array("kode_cc","nama"),"and",new Array("Kode","Nama"),false);					
							break;					
					case 3 :
							this.standarLib.showListDataForSG(this, "Daftar DRK",this.sg, this.sg.row, this.sg.col, 
															"select kode_drk, nama  from rra_drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi = '"+this.app._lokasi+"'",
															"select count(kode_drk) from rra_drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi = '"+this.app._lokasi+"'",
															 new Array("kode_drk","nama"),"and",new Array("Kode","Nama"),true);					
							break;					
					case 5 :
							this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg, this.sg.row, this.sg.col, 
															"select kode_akun, nama  from rra_masakun where kode_lokasi = '"+this.app._lokasi+"'",
															"select count(kode_akun) from rra_masakun where kode_lokasi = '"+this.app._lokasi+"'",
															 new Array("kode_akun","nama"),"and",new Array("Kode","Nama"),false);					
							break;					
							
				}						
			}
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},
	doEllipsClick2: function(sender, col, row) {
		try{
			switch(col){
				case 1 :
						this.standarLib.showListDataForSG(this, "Daftar Cost Center",this.sg2, this.sg2.row, this.sg2.col, 
														"select kode_cc, nama  from rra_cc where kode_ubis = '"+this.cb_ubis.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
														"select count(kode_cc) from rra_cc where kode_ubis = '"+this.cb_ubis.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
														 new Array("kode_cc","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
				case 3 :
						this.standarLib.showListDataForSG(this, "Daftar DRK",this.sg2, this.sg2.row, this.sg2.col, 
														"select kode_drk, nama  from rra_drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi = '"+this.app._lokasi+"'",
														"select count(kode_drk) from rra_drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi = '"+this.app._lokasi+"'",
														 new Array("kode_drk","nama"),"and",new Array("Kode","Nama"),true);					
						break;					
				case 5 :
						this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg2, this.sg2.row, this.sg2.col, 
														"select kode_akun, nama  from rra_masakun where kode_lokasi = '"+this.app._lokasi+"'",
														"select count(kode_akun) from rra_masakun where kode_lokasi = '"+this.app._lokasi+"'",
														 new Array("kode_akun","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
						
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doCodeClick : function(sender)
	{
		try{		
			if (sender == this.bView){				
				this.editorReadOnly = !this.editorReadOnly;
				this.mDesk.setReadOnly(this.editorReadOnly);
			}
			if (sender == this.bLoad){
				this.standarLib.showListData(this, "Daftar Draft Justifikasi",this.cb_templ,undefined, 
											  "select kode_draft, nama  from rra_draft where kode_lokasi ='"+this.app._lokasi+"' and upper(jenis) = upper('JUST')",
											  "select count(kode_draft) from rra_draft where kode_lokasi ='"+this.app._lokasi+"' and upper(jenis) = upper('JUST')",
											  ["kode_draft","nama"],"and", ["Kode Draft","Nama"],false);
			}
		}catch(e){
			alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result, request){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
					case "getDataProvider":						
						result = JSON.parse(result);												
						if (request == "akun"){
							this.dataAkun = new arrayMap();							
							var line;							
							for (var i in result.rs.rows){
								line = result.rs.rows[i];
								this.dataAkun.set(line.kode_akun, line.nama);
							}							
						}else if (request == "cc"){
							this.dataCC = new arrayMap();							
							var line;
							for (var i in result.rs.rows){
								line = result.rs.rows[i];
								this.dataCC.set(line.kode_cc, line.nama);
							}
						}
					break;
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							if (this.saveFiles != ""){//baru
                                //system.info(this,"transaksi telah sukses tersimpan","(ID : "+ this.e_nb.getText()+")");
                                if (this.hideLoading) this.hideLoading("wait....");
                                this.app._mainForm.pesan(2,"Upload files..........");              
                                this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);                                                  
                                if (this.keepSAP) {         
									var sql = new server_util_arrayList();	                       									
									//keepSAP                                
									this.keepSAP = false;									
									this.release(sql); 
								}
                            }else if (this.saveFiles == ""){  								                             
								if (this.hideLoading) this.hideLoading("wait....");
                                if (this.keepSAP) {         
									var sql = new server_util_arrayList();	                       						
									//keepSAP                                
									this.keepSAP = false;									
									this.release(sql); 
								}else system.info(this,"transaksi telah sukses tersimpan","(ID : "+ this.e_nb.getText()+")");						
								this.standarLib.clearByTag(this, ["0","1"],this.e_nb);		
								this.sgUpld.clear(1);
								setTipeButton(tbSimpan);
							}
						}else {
							if (this.hideLoading) this.hideLoading("wait....");
							system.info(this,result,"");
							setTipeButton(tbSimpan);
						}
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	    if (sender == this.fileUtil){
			switch(methodName){
		    case "copyFilesTo" : 
			   if ((typeof result == "boolean" && result == false) || result.indexOf("error") != -1){
				   system.alert(this,result,"Upload File gagal");
			   }else{ 
				  system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.e_nb.getText()+")");
				  this.standarLib.clearByTag(this, ["0","1"],this.e_nb);		
				  this.sgUpld.clear(1);
				  showProgress("delete temporary...");
				  if (this.saveFiles !="" ) this.fileUtil.deleteFiles(this.saveFiles);
			   }
			   if (this.hideLoading) this.hideLoading("wait....");
			   setTipeButton(tbSimpan);
			 break;
				case "deleteFiles" :
					if (this.hideLoading) this.hideLoading("wait....");
					hideProgress("delete temporary...");
				break;
            }
		}
	},
	locateCC : function(sender, col, row, cc){
		var data = this.dbLib.getDataProvider("select nama from rra_cc where kode_cc = '"+cc+"' and kode_lokasi = '"+this.app._lokasi+"' ", true);
		if (typeof data == "string"){
			error_log(data);
			return false;
		}
		if (data.rs.rows[0] !== undefined){
			sender.cells(col, row, data.rs.rows[0].nama );
			return true;
		}else return false;
	},
	locateAkun : function(sender, col, row, akun){
		var data = this.dbLib.getDataProvider("select nama from rra_masakun where kode_akun = '"+akun+"' and kode_lokasi = '"+this.app._lokasi+"' ", true);
		if (typeof data == "string"){
			error_log(data);
			return false;
		}
		if (data.rs.rows[0] !== undefined){
			sender.cells(col, row, data.rs.rows[0].nama );
			return true;
		}else return false;
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{			
        	if (sender == this.sgUpld && col == 1){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + data.tmpfile;
                this.sgUpld.cells(0,row, data.filedest);
            }
         }catch(e){
            alert(e+" "+data);
         }
    },
    showAlert: function(res, data, proses){
		var status = "";
		var hasExReturn = false;
		for (var i in res.objList){									
			if (res.get("ex_return") == "FAILED"){
					var line, text = "";
					hasExReturn = true;
					for (var l in res.get("log").objList){
						line = res.get("log").get(l);
						for (var m in line.objList){
							for (var g in line.get(m).objList)
								text += m+":"+line.get(m).get(g);
							text += "<br>";
						}
					}					
					if (res.get("errlog")){
						for (var l in res.get("errlog").objList){
							line = res.get("errlog").get(l);
							for (var m in line.objList){
								for (var g in line.get(m).objList)
									text += m+":"+line.get(m).get(g);
								text += "<br>";
							}
						}
					}
					var dt = "";
					for (var o in data.objList) {
						if (dt != "") dt += ",";
						dt += o+":"+data.get(o);
					}
					/*
					var tSaldo,sld = this.rfc.cekSaldo(this.login, this.e_periode.getText().substr(0,4),"01",data.get("bln").substr(1),data.get("cc"),data.get("akun"),"1000","1000","64","0");					
					
					if (typeof sld == "string"){						
						tSaldo = "";
					}else {
						var restable = sld.get("restable");
						var tmp = restable.get("0");
						tSaldo = "";
						for (var s in tmp.objList){
							if (tSaldo != "") tSaldo += ", ";							
							tSaldo += s+":"+tmp.get(s);
						}						
					}*/
					system.alert(this,"Error RFC:"+proses+"<br>"+dt+"<br>",text);
					return;
			}
			if (!hasExReturn){
				for (var r in res.get(i).objList){										
					var status = res.get(i).get("ex_return");
					if (status == 'FAILED'){					
						var line, text = "";
						for (var l in res.get(i).get("log").objList){
							line = res.get(i).get("log").get(l);
							for (var m in line.objList){
								for (var g in line.get(m).objList)
									text += m+":"+line.get(m).get(g);
								text += "<br>";
							}
						}						
						if (res.get("errlog")){
							for (var l in res.get("errlog").objList){
								line = res.get("errlog").get(l);
								for (var m in line.objList){
									for (var g in line.get(m).objList)
										text += m+":"+line.get(m).get(g);
									text += "<br>";
								}
							}
						}
						var dt = "";
						for (var o in data.objList) {
							if (dt != "") dt += ",";
							dt += o+":"+data.get(o);
						}
						/*var tSaldo,sld = this.rfc.cekSaldo(this.login, this.e_periode.getText().substr(0,4),"01",data.get("bln").substr(1),data.get("cc"),data.get("akun"),"1000","1000","64","0");					
						
						if (typeof sld == "string"){						
							tSaldo = "";
						}else {
							var restable = sld.get("restable");
							var tmp = restable.get("0");
							tSaldo = "";
							for (var s in tmp.objList){
								if (tSaldo != "") tSaldo += ", ";							
								tSaldo += s+":"+tmp.get(s);
							}						
						}					*/
						system.alert(this,"Error RFC:"+proses+"<br>"+dt+"<br>",text);
						return;
					}
				}
			}
		}
	}
});
