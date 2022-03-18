/*
 * Backup di roojax_src_tmp/rra : sblm penambahan Approval Justifikasi dan PDRK3
 * 18-05-2011 
 * 	fund ditambahkan ke table pdrk, rev, grev, mrev ke field FUND_CTR => harusnya FUND doang. Fund  Center == Cost Center
 *  fund diambil dari rfc->GetFundAkun(wbs/drk);
 * 31-05-2011
 * PDRK-3 -> data Anggaran diambil dari Plan. Karena plan berubah saat KP06 ato update SAP
 * OPEX -> 	bisa milih Payment, Commitment ato keduanya
 * 			Cek Saldo diambil dari release - actual.
 * onGridChange : CC, Akun, Bulan, DRK (CAPEX)
 * 		- OPEX
 * 			-> 
 * */
window.app_rra_transaksi_fReschE = function(owner, options)
{
	if (owner)
	{
		window.app_rra_transaksi_fReschE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_transaksi_fReschE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form PDRK Redistribusi & Realokasi Anggaran: Koreksi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;tinymceCtrl;util_rfcLib;util_rfc;server_util_Map;uploader;util_file");
		this.e_periode = new saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true});		
		this.cbDraft = new saiLabelEdit(this,{bound:[720,10,220,20], caption:"Draft Pengajuan",tag:9, readOnly:true});
		this.l_tgl1 = new label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.e_uid = new saiLabelEdit(this,{bound:[720,11,200,20], caption:"SAP User", tag:11, visible: this.app._appState == "Q00"});
		this.e_nb = new saiCBBL(this,{bound:[20,12,222,20],caption:"No PDRK",maxLength:30,readOnly:true, multiSelection:false, change:[this,"doChange"]});		
		this.e_pwd = new saiLabelEdit(this,{bound:[720,12,200,20], caption:"SAP Password", password:true, tag:11, visible:this.app._appState == "Q00"});
		
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Nama Kegiatan", maxLength:150});		
		this.e_donor = new saiLabelEdit(this,{bound:[720,13,200,20],caption:"Nilai Donor", readOnly:true, tipeText:ttNilai, text:"0"});
		this.c_jenis = new saiCB(this,{bound:[20,14,202,20],caption:"Jenis Anggaran",items:["OPEX","CAPEX"], readOnly:true, tag:2 });
		this.e_terima = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Nilai Penerima", readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,16,900, 330], childPage:["Data PDRK","Data Donor","Data Penerima","Data Justifikasi","Dokumen Pendukung"]});
		
		this.ed_dok = new saiLabelEdit(this.pc1.childPage[0], {bound:[20,1,400,20], caption:"No. Nota Dinas"});
		this.e_file = new saiLabelEdit(this.pc1.childPage[0], {bound:[20,2,400,20], caption:"File Nota Dinas"});
		this.upld = new uploader(this.pc1.childPage[0], {bound:[430,2,80,20],caption:"Browse",autoSubmit:true, param1:"uploadTo",param2:"server/media/tmp/", param3:"object", param4:"server/media/", afterUpload:[this,"doAfterLoad"], change:[this,"doFileChange"]});
		
		this.cb_ubis = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Png Jawab", multiSelection:false, maxLength:10, bufferOption: boHALF,tag:2, change:[this,"doChange"]});
		this.cb_gubis = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Direktorat", multiSelection:false, maxLength:10, bufferOption: boHALF, tag:2});		
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, bufferOption: boFULL, bufferData: this.app._listNIK, tag:2, readOnly:true, text:this.app._userLog, rightLabelCaption:this.app._namaUser});
		this.cb_kota = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Kota", multiSelection:false, bufferOption: boHALF, maxLength:10, tag:2});
		this.pApp = new panel(this.pc1.childPage[0],{bound:[10,20,430, 100], caption:"Approval PDRK 1"});
		this.cb_app1 = new saiCBBL(this.pApp,{bound:[20,14,200,20], caption:"Png. Jwb Prog.", multiSelection:false, bufferOption: boFULL, bufferData: this.app._listNIK, maxLength:10, tag:2});
		this.cb_app2 = new saiCBBL(this.pApp,{bound:[20,15,200,20], caption:"Mengetahui", multiSelection:false, bufferOption: boFULL, bufferData: this.app._listNIK, maxLength:10, tag:2});
		this.cb_app3 = new saiCBBL(this.pApp,{bound:[20,16,200,20], caption:"Menetapkan", multiSelection:false, bufferOption: boFULL, bufferData: this.app._listNIK, maxLength:10, tag:2});
		this.pApp.rearrangeChild(23,23);
		this.pApp2 = new panel(this.pc1.childPage[0],{bound:[460,20,430, 100], caption:"Approval Justifikasi"});
		this.cb_appj1 = new saiCBBL(this.pApp2,{bound:[20,14,200,20], caption:"Png. Jwb Prog.", multiSelection:false, bufferOption: boFULL, bufferData: this.app._listNIK, maxLength:10, tag:2});
		this.cb_appj2 = new saiCBBL(this.pApp2,{bound:[20,15,200,20], caption:"Mengetahui", multiSelection:false, bufferOption: boFULL, bufferData: this.app._listNIK, maxLength:10, tag:2});
		this.pApp2.rearrangeChild(23,23);
		this.pApp3 = new panel(this.pc1.childPage[0],{bound:[10,21,430, 70], caption:"Approval PDRK3"});
		this.cb_appp3 = new saiCBBL(this.pApp3,{bound:[20,14,200,20], caption:"Png. Jwb Prog.", multiSelection:false, bufferOption: boFULL, bufferData: this.app._listNIK,maxLength:10, tag:2});
		this.cb_appp32 = new saiCBBL(this.pApp3,{bound:[20,15,200,20], caption:"Mengetahui", multiSelection:false, bufferOption: boFULL, bufferData: this.app._listNIK, maxLength:10, tag:2});
		this.pApp3.rearrangeChild(23,23);
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,15,this.pc1.width-5,this.pc1.height-40],colCount:13,tag:9,
					colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai Gar","Terpakai","Saldo","Nilai Donor","Jenis","Nilai KEEP"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,90,90,90,90,90,70,150,120,90,70,50]],
					columnReadOnly:[true,[2,4,6,7,8,9,12],[]],
					buttonStyle:[[0,1,3,5,11],[bsAuto,bsEllips,bsEllips,bsEllips,bsAuto]],
					colFormat:[[7,8,9,10,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]], pasteEnable: true,
					picklist:[[0,11],[new arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]}), new arrayMap({items:["PAYMENT","COMMITMENT","KEDUANYA"]})]],
					defaultRow:1, autoPaging:true, rowPerPage:20,afterPaste:[this,"doAfterPaste"], cellEnter:[this,"doCellEnter"],
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],autoAppend:true});
		this.sgn = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsTransNav,grid:this.sg, pager:[this,"doPager"]});
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:0,
					colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai Terima","Target Selesai","Jenis"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,130,150,70,60,60,150,70,50]],
					columnReadOnly:[true,[2,4,6],[7,8]],
					buttonStyle:[[0,1,3,5,9],[bsAuto,bsEllips,bsEllips,bsEllips,bsAuto]], pasteEnable: true,
					colFormat:[[7],[cfNilai]],
					picklist:[[0,9],[new arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]}), new arrayMap({items:["PAYMENT","COMMITMENT","KEDUANYA"]})]],
					defaultRow:1, autoPaging:true, rowPerPage:20,afterPaste:[this,"doAfterPaste"],
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsTransNav,grid:this.sg2, pager:[this,"doPager"]});
						
		this.mDesk = new tinymceCtrl(this.pc1.childPage[3],{bound:[1,10,this.pc1.width-5,this.pc1.height-25], withForm:false});
		//this.mDesk.display();
		//this.mDesk.enable();
		this.bView = new button(this.pc1.childPage[3], {bound:[this.pc1.width - 200, 10, 80, 20], caption:"View HTML", click:"doCodeClick", visible:false});
		this.bLoad = new button(this.pc1.childPage[3], {bound:[this.pc1.width - 100, 10, 80, 20], caption:"Load Template", click:"doCodeClick"});
		this.cb_templ = new saiCBBL(this.pc1.childPage[3],{bound:[this.pc1.width - 200,17,200,20],caption:"Template", visible:false, multiSelection:false, maxLength:10, tag:100, change:[this,"doChange"]});
		this.sgUpld = new saiGrid(this.pc1.childPage[4],{bound:[1,0,this.pc1.width-3,this.pc1.height - 28],colCount:3,colTitle:["Dokumen","Upload","Deskripsi"],colFormat:[[1],[cfUpload]],
					colWidth:[[2,1,0],[250,80,230]],colReadOnly:[true,[0,1],[]], change:[this,"doGridChange"], tag:3});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn3 = new sgNavigator(this.pc1.childPage[4],{bound:[1,this.sgUpld.height + 3,this.pc1.width-3,25],buttonStyle:1, grid:this.sgUpld});
		
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
			this.rfcLib = new util_rfcLib(this.app._rfcSetting);
			this.rfc = new util_rfc(undefined, this.app._rfcSetting);
			this.login = new server_util_Map({items:{user:this.app._defsapuid.uid, passwd:this.app._defsapuid.pid} });
			
			this.standarLib = new util_standar();					
			this.e_nb.setSQL("select no_pdrk, keterangan from rra_pdrk_m where kode_lokasi= '"+this.app._lokasi+"' and progress='0' and kode_ubis = '"+this.app._kodeUbis+"' and sub_jenis = 'RSH' ",["no_pdrk","keterangan"],false,["No PDRK","Keterangan"],"","Daftar PDRK",true);
			this.cb_ubis.setSQL("select kode_ubis, nama from rra_ubis where kode_lokasi='"+this.app._lokasi+"'",["kode_ubis","nama"],false,["Kode","Nama"],"and","Data Penanggungjawab Program",true);
			this.cb_gubis.setSQL("select kode_gubis, nama from rra_gubis where kode_lokasi='"+this.app._lokasi+"' ",["kode_gubis","nama"],false,["Kode","Nama"],"and","Data Direktorat",true);			
			this.cb_app1.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan ",true);
			this.cb_app2.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_app3.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_buat.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_kota.setSQL("select kode_kota, nama from rra_kota ",["kode_kota","nama"],false,["Kode Kota","Nama Kota"],"and","Data Kota",true);
			this.cb_appj1.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan ",true);
			this.cb_appj2.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_appp3.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_appp32.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
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
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;	
			this.onClose.set(this,"doClose");			
			//this.dbLib.getDataProviderA("select kode_akun, nama from rra_masakun where kode_lokasi = '"+this.app._lokasi+"' ", undefined, "akun");		
			this.dataUpload = {temporary:"",tmpfile:""};	
			this.dataCC = new arrayMap();
			this.dataAkun = this.app._listAKUN;//new arrayMap();
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_transaksi_fReschE.extend(window.childForm);
window.app_rra_transaksi_fReschE.implement({
	doClose: function(sender){
		if (this.dataUpload !="" ) this.fileUtil.deleteFiles(this.dataUpload.temporary);			
		this.dbLib.free();
		this.fileUtil.free();
		this.rfc.free();
		this.rfcLib.free();
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{			
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;			
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.upld.param2 +this.dataUpload.tmpfile;
		}catch(e){
			system.alert(this,e);
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
					setTipeButton(tbAllFalse);														
					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					this.saveFiles = "", this.dest = "", first = true;
					if (this.e_file.getText() != "-"){
						this.saveFiles = this.dataUpload.temporary;
						this.dest = this.rootDir+"/server/media/"+this.e_file.getText();
					}					
					var files = [];
					for (var i=0; i < this.sgUpld.getRowCount();i++){	
						if (this.sgUpld.cells(0,i) != ""){ 
							if (this.saveFiles != "") { 
								this.saveFiles += ";";
								this.dest += ";";
							}                               
							this.saveFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(1,i).tmpfile;
							this.dest += this.rootDir+"/server/media/" + this.sgUpld.cells(1,i).filedest;
							first = false;
							files.push({file:this.sgUpld.cells(0,i), nama:this.sgUpld.cells(2,i)});
						}
					}
					sql.add("update rra_pdrk_m set keterangan='"+this.e_ket.getText()+"',kode_ubis='"+this.cb_ubis.getText()+"', "+
						"	kode_gubis='"+this.cb_gubis.getText()+"',jenis_agg='"+this.c_jenis.getText()+"',tanggal='"+this.dp_d1.getDateString()+"' ,"+
						"	periode='"+this.e_periode.getText()+"',nik_app1='"+this.cb_app1.getText()+"',nik_app2='"+this.cb_app2.getText()+"' , "+
						"	nik_app3='"+this.cb_app3.getText()+"',justifikasi='"+urlencode(this.mDesk.getCode())+"', nik_user='"+this.app._userLog+"', tgl_input=now(), "+
						"	kode_kota='"+this.cb_kota.getText()+"', no_nd='"+this.ed_dok.getText()+"', file_nd='"+this.e_file.getText()+"',  "+
						"	nik_appjust='"+this.cb_appj1.getText()+"', nik_appjust2='"+this.cb_appj2.getText()+"', "+
						"	nik_apppdrk3='"+this.cb_appp3.getText()+"', nik_apppdrk32='"+this.cb_appp32.getText()+"' "+
						"	where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("delete from rra_anggaran where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi  = '"+this.app._lokasi+"'");
					sql.add("delete from rra_pdrk_d where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi  = '"+this.app._lokasi+"'");
					sql.add("delete from rra_pdrk_dok where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi  = '"+this.app._lokasi+"'");
					sql.add("delete from rra_pdrk_orgi where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi  = '"+this.app._lokasi+"'");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_cc,kode_drk,periode,nilai_gar,nilai_pakai,saldo,nilai,dc,target,jenis,nilai_keep) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(9,i))+","+parseNilai(this.sg.cells(10,i))+",'C','-','"+this.sg.cells(11,i).substr(0,1)+"',"+parseNilai(this.sg.cells(12,i))+")");
								sql.add("insert into rra_anggaran(no_bukti,modul,kode_cc,kode_akun,kode_drk,kode_lokasi,periode,dc,nilai,nik_user,tgl_input,nilai_gar, nilai_pakai, saldo,target,jenis) values "+
										"	('"+this.e_nb.getText()+"','RRR','"+this.sg.cells(1,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(3,i)+"','"+this.app._lokasi+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,i)+"','C',"+parseNilai(this.sg.cells(10,i))+",'"+this.app._userLog+"',now(),"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(9,i))+",'-','"+this.sg.cells(11,i).substr(0,1)+"')");
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_cc,kode_drk,periode,nilai_gar,nilai_pakai,saldo,nilai,dc,target,jenis, nilai_keep) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(5,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"',0,0,0,"+parseNilai(this.sg2.cells(7,i))+",'D','"+this.sg2.cells(8,i)+"','"+this.sg2.cells(9,i).substr(0,1)+"',0)");
								sql.add("insert into rra_anggaran(no_bukti,modul,kode_cc,kode_akun,kode_drk,kode_lokasi,periode,dc,nilai,nik_user,tgl_input,nilai_gar, nilai_pakai, saldo,target,jenis) values "+
										"	('"+this.e_nb.getText()+"','RRR','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(5,i)+"','"+this.sg2.cells(3,i)+"','"+this.app._lokasi+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"','D',"+parseNilai(this.sg2.cells(7,i))+",'"+this.app._userLog+"',now(),0,0,0,'"+this.sg2.cells(8,i)+"','"+this.sg2.cells(9,i).substr(0,1)+"')");
							}
						}
					}
					if (files.length > 0){
						var scan = "insert into rra_pdrk_dok(no_pdrk,kode_lokasi,file_dok,nama,no_urut) values ";						
						var first = true;
						var noUrut=1;
						for (var i in files){							
							scan += "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+files[i].file+"','"+files[i].nama+"',"+noUrut+")";
							sql.add(scan);																	
							scan = "insert into rra_pdrk_dok(no_pdrk,kode_lokasi,file_dok,nama,no_urut) values ";						
							noUrut++;
						}
						
					}		
					if (this.app._sapOnline){
						var line = "";
						for (var i in this.data1Thn.objList){										
							var row = this.data1Thn.get(i).get("restable");//
							var gridValue = this.data1Thn.get(i).get("value");
							var ccakun = i.split(":");
							for (var l in row.objList){//rows = 16
								line = row.get(l).get("0");
								//for (var l2 in line.objList)
								{//row																									
									var prd = (parseFloat(line.get("PERIO")) < 10 ? "0":"")+line.get("PERIO");
									if (this.c_jenis.getText() == "CAPEX")
										sql.add("insert into rra_pdrk_orgi(no_bukti, no_pdrk,periode, kode_akun, kode_cc, nilai,kode_lokasi,versi, kode_drk, fund_ctr)values "+
												"	('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+line.get("GJAHR")+prd+"','"+gridValue.get("akun")+"','"+gridValue.get("cc")+"','"+line.get("PLAN_CO")+"','"+this.app._lokasi+"','"+line.get("VERSN")+"','"+gridValue.get("drk")+"','"+line.get("FINCODE")+"')");
									else 
										sql.add("insert into rra_pdrk_orgi(no_bukti, no_pdrk,periode, kode_akun, kode_cc, nilai,kode_lokasi)values ('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+line.get("GJAHR")+prd+"','"+gridValue.get("akun")+"','"+gridValue.get("cc")+"','"+line.get("TSL10")+"','"+this.app._lokasi+"')");
								}								
							}
						}										
					}
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					setTipeButton(tbSimpan);
					system.alert(this, e,"");
				}
			}
		}catch(e){
			setTipeButton(tbSimpan);
			systemAPI.alert(e);
		}
	},
	hapus : function(){
		uses("server_util_arrayList");
		var sql = new server_util_arrayList();
		this.saveFiles = "", this.dest = "", first = true;
		if (this.e_file.getText() != "-" && this.dataUpload.temporary != ""){
			this.saveFiles = this.dataUpload.temporary;
			this.dest = this.rootDir+"/server/media/"+this.e_file.getText();
		}					
		var files = [];
		for (var i=0; i < this.sgUpld.getRowCount();i++){	
			if (this.sgUpld.cells(0,i) != ""){ 
				if (this.saveFiles != "") { 
					this.saveFiles += ";";
					this.dest += ";";
				}                               
				this.saveFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(1,i).tmpfile;
				this.dest += this.rootDir+"/server/media/" + this.sgUpld.cells(1,i).filedest;
				first = false;
				files.push({file:this.sgUpld.cells(0,i), nama:this.sgUpld.cells(2,i)});
			}
		}
		sql.add("delete from rra_pdrk_m where no_pdrk ='"+this.e_nb.getText()+"' and kode_lokasi = '"+ this.app._lokasi + "'");		
		sql.add("delete from rra_anggaran where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi = '"+ this.app._lokasi + "'");		
		sql.add("delete from rra_pdrk_d where no_pdrk ='"+this.e_nb.getText()+"' and kode_lokasi = '"+ this.app._lokasi + "'");		
		sql.add("delete from rra_pdrk_dok where no_pdrk ='"+this.e_nb.getText()+"' and kode_lokasi = '"+ this.app._lokasi + "'");		
		sql.add("delete from rra_pdrk_dok where no_pdrk ='"+this.e_nb.getText()+"' and kode_lokasi = '"+ this.app._lokasi + "'");		
		sql.add("update rra_pra_m set progress = '1' where no_pdrk = '"+this.cbDraft.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
		this.dbLib.execArraySQL(sql);
	},
	doModalResult: function(event, modalResult){
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
					this.e_uid.setText(this.app._defuidsap.uid);
					this.e_pwd.setText(this.app._defuidsap.pwd);
					setTipeButton(tbSimpan);
				break;
			case "ubah" :	
				this.sg2.validasi();
					this.login.set("user",this.e_uid.getText());
					this.login.set("passwd",this.e_pwd.getText());
					var dataAkun = new server_util_arrayList();
					var kodeAkun = "' '";
					var kodeCc ="' '";
					var drk = "' '";
					this.sg.onChange.set(this,undefined);
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (!this.sg2.rowValid(i)) continue;
						var prd = this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i) ;
						if (prd > this.app._periodeGAR){
							var k = i+1;
							system.alert(this,"Transaksi Terima tidak valid.","Periode lebih besar dari Current Periode [Baris: "+k+"]");
							return false ; 
						}
						for (var j=i;j < this.sg2.getRowCount();j++){
							if (this.sg2.cells(0,j) == this.sg2.cells(0,i) && this.sg2.cells(1,j) == this.sg2.cells(1,i) && this.sg2.cells(5,j) == this.sg2.cells(5,i) && (i != j)) {
								var k = i+1;
								system.alert(this,"Transaksi Terima tidak valid.","Duplikasi Data Anggaran.[Baris : "+k+"]");
								return false;
							}
						}
						if (this.c_jenis.getText() == "OPEX" && this.sg2.cells(9,i).toUpperCase() != "KEDUANYA"){
							this.sg2.cells(9,i,"KEDUANYA");
						}
						var versi = this.c_jenis.getText() == "CAPEX" ? this.sg2.cells(9,i) : "000";
						kodeAkun += ",'"+this.sg2.cells(5,i)+"'";
						kodeCc += ",'"+this.sg2.cells(1,i)+"'";
						dataAkun.add(new server_util_Map({items:{agg:this.c_jenis.getText(),drk:this.sg2.cells(3,i),jenis:versi,cc:this.sg2.cells(1,i), akun:this.sg2.cells(5,i), bln1:this.sg2.cells(0,i),bln2:this.sg2.cells(0,i)}}));
					}													
					{
						this.sg.validasi();
						if (nilaiToFloat(this.e_donor.getText()) != nilaiToFloat(this.e_terima.getText()) )  {
							system.alert(this,"Transaksi tidak valid.","Nilai Donor dan Terima harus sama.");
							return false;						
						}
						//kumpulkan dataGrid dengan keyMap untuk digunakan waktu cari data ke grid dari hasil rfc.
						//dataAkun untuk menampung data (periode, cc, kode_akun) untuk cekSaldo lewat RFC					
						var dataGrid = new arrayMap();																
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								var prd = this.sg2.cells(0,i) ;
								var prd2 = this.app._periodeGAR.substr(4,2);					
								if (this.app._TW.get(prd) > this.app._TW.get(prd2)) {
									this.sts_pdrk = 'ABT';
								}
								for (var j=i;j < this.sg.getRowCount();j++){
									if (this.sg.cells(0,j) == this.sg.cells(0,i) && this.sg.cells(1,j) == this.sg.cells(1,i) && this.sg.cells(5,j) == this.sg.cells(5,i) && (i != j)) {
										var k = i+1;
										system.alert(this,"Transaksi Donor tidak valid.","Duplikasi Data Anggaran.[Baris : "+k+"]");
										return false;
									}
								}
								if (this.c_jenis.getText() == "OPEX" && this.sg.cells(11,i).toUpperCase() != "KEDUANYA"){
									this.sg.cells(11,i,"KEDUANYA");
								}
								var versi = this.c_jenis.getText() == "CAPEX" ? this.sg.cells(11,i) : "000";
								kodeAkun += ",'"+this.sg.cells(5,i)+"'";
								kodeCc += ",'"+this.sg.cells(1,i)+"'";
								dataGrid.set(this.sg.cells(0,i)+":"+this.sg.cells(1,i)+":"+this.sg.cells(5,i),{index:i + 1, nilai: nilaiToFloat(this.sg.cells(10,i)), versi:this.sg.cells(11,i)});
								dataAkun.add(new server_util_Map({items:{agg:this.c_jenis.getText(),jenis:versi,drk:this.sg.cells(3,i),cc:this.sg.cells(1,i), akun:this.sg.cells(5,i), bln1:this.sg.cells(0,i),bln2:this.sg.cells(0,i)}}));
							}
						}
						this.sg.onChange.set(this,"doChangeCell");
						//ambil data RRR yang belum terposting ke RFC					
						var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.kode_akun,a.kode_cc,substr(a.periode,5,2) as periode, sum(a.nilai) as pakai "+
								"	from rra_anggaran a "+
								"	inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
								"		where a.kode_akun in ("+kodeAkun+")  and a.kode_cc in ("+kodeCc+") and a.periode like '"+this.e_periode.getText().substr(0,4)+"%'  and a.kode_lokasi= '"+this.app._lokasi+"' and lower(a.DC)= 'c' and b.flag_rfc='0' and b.no_pdrk <> '"+this.e_nb.getText()+"' "+
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
							var dataGar = this.rfc.dataGar2(this.login,  this.e_periode.getText().substr(0,4),dataAkun);
							
							if (typeof dataGar == "string"){
								system.alert(this,dataGar,"");
								return false;
							}	
							//cek di Grid nilai pendonor (dataGrid) dengan hasil terakhir RFC
							var res = dataGar.get("saldothn");
							var line, tmp;										
							for (var i in res.objList){							
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
								/*moved to bottom -->*/
								
							}															
						}
					}
					try{					
						//ambil anggaran orgi untuk pdrk-3
						if (this.app._sapOnline){
							this.data1Thn = dataGar.get("saldothn");					
							for (var i in this.data1Thn.objList){						
								var row = this.data1Thn.get(i).get("restable");//
								var gridValue = this.data1Thn.get(i).get("value");							
								for (var l in row.objList){//rows = 0 - 23
									line = row.get(l).get("0");																	
									{//row													
										var rrr = dataRRR.get(line.get("PERIO")+":"+i ) == undefined ? 0 : dataRRR.get(line.get("PERIO")+":"+i );									
										if (this.c_jenis.getText() == "CAPEX"){										
											if (parseFloat(line.get("PERIO")) == parseFloat(gridValue.get("bln1")) && (gridValue.get("versi") == "KEDUANYA" || gridValue.get("versi") == "K") )
												line.set("PLAN_CO", nilaiToFloat(line.get("PLAN_CO")) - rrr);
											else if (parseFloat(line.get("PERIO")) == parseFloat(gridValue.get("bln1")) && (gridValue.get("versi") == "PAYMENT") && line.get("VERSN") == "000")
												line.set("PLAN_CO", nilaiToFloat(line.get("PLAN_CO")) - rrr);
											else if (parseFloat(line.get("PERIO")) == parseFloat(gridValue.get("bln1")) && (gridValue.get("versi") == "COMMITMENT") && line.get("VERSN") == "007")
												line.set("PLAN_CO", nilaiToFloat(line.get("PLAN_CO")) - rrr);
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
						systemAPI.alert(this,e,"");
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
				if (this.app._sapOnline){
					if (this.e_terima.getText() == "0" || this.e_donor.getText() == "0" ){
						systema.alert(this,"Nilai terima tidak boleh Nol","");
						return false;	
					}
				}
				this.simpan();
				
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		//this.doClick();
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_pdrk_m","no_pdrk","PDRK-"+this.app._kodeUbis+"-"+this.e_periode.getText().substr(2,4)+".","0000"));
		//this.e_ket.setFocus();
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
			   this.app._mainForm.pesan(0,"Fund tidak ditemukan untuk WBS "+wbsOld+" "+wbs,fundCtr+":"+akun);
			   //system.alert(this,"Fund tidak ditemukan untuk WBS "+wbsOld+" "+wbs,fundCtr+":"+akun);
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
	/* 	--- karena error rfc untuk field TSL04 dilakukan looping dari saldo Setahun ---- 01-06-2011
	 	untuk mengambil saldo OPEX dari RFC. 
		dipakai saat onGridChange dan Simpan
		* TSL03 = actual Payment
		* TSL04 = actual Commitment
		* periode = parseFloat(this.sg.cells(0,row))
		* versi = sender.cells(11,row).toUpperCase()
	*/
	getSaldoOpex: function(restable, versi, periode){		
		var tmp = new arrayMap();
		var saldo = 0;
		var rfcRet = {	sawal 	: 0,
						pakai 	: 0,
						sisa 	: 0,
						sisaRls : 0					
			};
		for (var i in restable.objList){ 
			var line = restable.get(i).get("0");
			var lastLine = restable.get(15).get("0");
			if (parseFloat(line.get("PERIO")) == periode){
				tmp = line;								
				if (parseFloat(lastLine.get("TSL04")) != 0)
					tmp.set("TSL04", parseFloat(line.get("TSL04")) - saldo);
			}
			saldo = parseFloat(line.get("TSL04"));
		}						
		if (tmp != undefined){							
			var field = ["TSL06","TSL04"];							
			if ( versi == "PAYMENT"){
				field = ["TSL05","TSL03"];							
			}							
			var rfcRet = {	sawal : parseFloat(tmp.get(field[0])),
						pakai : parseFloat(tmp.get(field[1])),
						sisa : parseFloat(tmp.get(field[0])) - parseFloat(tmp.get(field[1])),
						sisaRls : parseFloat(tmp.get(field[0])) - parseFloat(tmp.get(field[1]))
						
			};
			if (versi == "KEDUANYA"){
				//cari saldo yang minimum
				var min = Math.min(parseFloat(tmp.get("TSL05")) - parseFloat(tmp.get("TSL03")), parseFloat(tmp.get("TSL06")) - parseFloat(tmp.get("TSL04")));
				if (min == parseFloat(tmp.get("TSL05")) - parseFloat(tmp.get("TSL03"))) //payment
				{
					field = ["TSL05","TSL03"];
				}
				rfcRet = {	sawal : parseFloat(tmp.get(field[0])),
						pakai : parseFloat(tmp.get(field[1])),
						sisa : parseFloat(tmp.get(field[0])) - parseFloat(tmp.get(field[1])),
						sisaRls : parseFloat(tmp.get(field[0])) - parseFloat(tmp.get(field[1]))
				};
				
			}
		}
		return rfcRet;
	},
	//PLAN_PAY, //RELEASE_PAY//ACTUAL_PAY//PLAN_COMT//RELEASE_COMT//ACTUAL_COMT
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
		}				
		return rfcRet;		
	},
	doChangeCell: function(sender, col, row) {
		try{
			sender.onChange.set(this,undefined);
			if (sender.userData == undefined) sender.userData = new arrayMap();
			if (col == 0){
				if (parseFloat(sender.cells(0,row)) < 1 || parseFloat(sender.cells(0,row)) > 12 ) {
					//system.alert(this,"Periode tidak dikenal "+sender.cells(0,row),"");
					this.app._mainForm.pesan(0,"Periode tidak dikenal "+sender.cells(0,row));
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
					if (this.app._sapOnline){
						if (this.c_jenis.getText() == "CAPEX"){
							var dataFund = this.getFundCtrAkun(sender.cells(3, row));
							if (dataFund == false){							
								sender.onChange.set(this,"doChangeCell");
								return;
							}
							var fund = dataFund.fund;
							var fundCtr = dataFund.fundCtr;
							var akun = dataFund.akun;
							sender.cells(1,row, fundCtr);
							sender.cells(2,row,this.dataCC.get(fundCtr));
							sender.cells(5,row, akun);
							sender.cells(6,row,this.dataAkun.get(akun));
							if (akun == ""){							
								this.app._mainForm.pesan(0,"Data akun tidak ditemukan. "+ fund +":"+fundCtr);
								sender.onChange.set(this,"doChangeCell");
								return;
							}
						}
					}
				}
				if (this.sg.cells(0,row) != "" && this.sg.cells(1,row) != "" && this.sg.cells(3,row) != "" && this.sg.cells(5,row) != "") {
					var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.kode_akun,a.kode_cc,substr(a.periode,5,2) as periode, sum(a.nilai) as pakai "+
						"	from rra_anggaran a "+
						"	inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
						"		where a.kode_akun = '"+this.sg.cells(5,row)+"'  and a.kode_cc = '"+this.sg.cells(1,row)+"' and a.periode = '"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,row)+"'  and a.kode_lokasi= '"+this.app._lokasi+"' and lower(a.DC)= 'c' and b.flag_rfc='0' and no_bukti <> '"+this.e_nb.getText()+"'"+
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
					}else {
						sender.onChange.set(this,"doChangeCell");
						return false;
					}
					var rfcRet = {sawal :0, pakai : 0, sisa : 0, sisaRls:0,
						sawalBln:0, pakaiBln:0, sisaBln:0, sisaRlsBln : 0,
						sawalPayment: 0, pakaiPayment:0, sisaPayment : 0, sisaRlsPayment:0,
						sawalCommit: 0, pakaiCommit:0, sisaCommit : 0, sisaRlsCommit : 0
					};
					if (this.app._sapOnline){
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
												IM_FT_WRTTP:"64",
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
					}
					if (line) var i = line.periode+":"+line.kode_cc+":"+line.kode_akun;
					dataRRR.set(i, (dataRRR.get(i) == undefined ? 0 : dataRRR.get(i)) );
					rfcRet.pakai = rfcRet.pakai +  dataRRR.get(i);
					rfcRet.sisa = rfcRet.sisa -  dataRRR.get(i);
					rfcRet.sisaRls = rfcRet.sisaRls -  dataRRR.get(i);					
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
						this.app._mainForm.pesan(0,"Data CC tidak ditemukan");
						sender.cells(1, row, "") ;
						sender.onChange.set(this,"doChangeCell");
						return;
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
						this.app._mainForm.pesan(0,"Data Akun tidak ditemukan");
						sender.cells(5, row, "") ;
						sender.cells(6, row, "") ;
						sender.onChange.set(this,"doChangeCell");
						return;
					}
					sender.cells(6, row, this.dataAkun.get(sender.cells(5, row)) );
				break;

			}
			if (col == 10) {
				this.sg.validasi();
				var rfcRet = sender.userData.get(row);								
				if (this.sg.cells(10,row) != "" && rfcRet != undefined){					
					if (nilaiToFloat(this.sg.cells(10,row)) <= rfcRet.sisaRls)
						this.sg.cells(12,row,this.sg.cells(10,row));
					else  this.sg.cells(12,row,floatToNilai(rfcRet.sisaRls));
				}
			}			
			sender.onChange.set(this,"doChangeCell");
		}catch(e){
			sender.onChange.set(this,"doChangeCell");
			systemAPI.alert(e);
		}
	},
	doChangeCell2: function(sender, col, row) {
		try{
			sender.onChange.set(this,undefined);			
			if (col == 0){
				if (parseFloat(sender.cells(0,row)) < 1 || parseFloat(sender.cells(0,row)) > 12 ) {					
					this.app._mainForm.pesan(0,"Periode tidak dikenal");
					this.sg2.cells(0,row,"");
					return;
				}
				if (trim(this.sg2.cells(0,row)).length == 1) this.sg2.cells(0,row,"0"+trim(this.sg2.cells(0,row)));

			}
			switch (col){
				case 1 :
					if(sender.cells(1,row) != "" && this.dataCC.get(sender.cells(1,row)) == undefined){						
						this.app._mainForm.pesan(0,"Data CC tidak ditemukan");
						sender.cells(1, row, "") ;
						sender.onChange.set(this,"doChangeCell2");
						return;
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
						this.app._mainForm.pesan(0,"Data Akun tidak ditemukan");
						sender.cells(5, row, "") ;
						sender.cells(6, row, "") ;
						sender.onChange.set(this,"doChangeCell2");
						return;
					}
					sender.cells(6, row, this.dataAkun.get(sender.cells(5, row)) );
				break;

			}
			if (col == 7) this.sg2.validasi();
			sender.onChange.set(this,"doChangeCell2");
		}catch(e){
			sender.onChange.set(this,"doChangeCell2");
			systemAPI.alert(e);
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;			
			for (var i = 0; i < this.sg.getRowCount();i++){
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
	doNilaiChange2: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.getRowCount();i++){
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
			switch(col){
				case 1 :
						this.standarLib.showListDataForSG(this, "Daftar Cost Center",this.sg, this.sg.row, this.sg.col, 
														"select kode_cc, nama  from rra_cc where kode_ubis = '"+this.cb_ubis.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
														"select count(kode_cc) from rra_cc where kode_ubis = '"+this.cb_ubis.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
														 new Array("kode_cc","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
				case 3 :
						this.standarLib.showListDataForSG(this, "Daftar DRK",this.sg, this.sg.row, this.sg.col, 
														"select kode_drk, nama  from rra_drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi = '"+this.app._lokasi+"' and tahun like '"+(this.c_jenis.getText() == "OPEX" ? "-":"%")+"'",
														"select count(kode_drk) from rra_drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi = '"+this.app._lokasi+"' and tahun like '"+(this.c_jenis.getText() == "OPEX" ? "-":"%")+"'",
														 new Array("kode_drk","nama"),"and",new Array("Kode","Nama"),true);					
						break;					
				case 5 :
						this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg, this.sg.row, this.sg.col, 
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
	doCodeClick : function(sender){
		try{
			if (sender == this.bView){				
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
	doChange: function(sender){
		
		if (sender == this.e_nb){			
			var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
					   "select date_format(a.tanggal, '%d-%m-%Y') as tanggal, a.keterangan, a.jenis_agg,a.kode_ubis,a.kode_gubis,a.nik_app1,a.nik_app2,a.nik_app3,a.nik_appjust, a.nik_appjust2, a.nik_apppdrk3, a.nik_apppdrk32, b.nama as nama_ubis,c.nama as nama_gubis,a.justifikasi,a.sts_pdrk, a.kode_kota, a.file_nd, a.no_nd, a.no_draft   "+
					   "from rra_pdrk_m a inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi "+
					   "                  inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi "+					   
					   "where a.no_pdrk='"+sender.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
					   "select file_dok, nama from rra_pra_dok where no_pdrk = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by no_urut",
					   "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai_gar,a.nilai_pakai,a.saldo,a.nilai,a.dc,a.target,a.jenis "+
						 "from rra_pdrk_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
						 "					inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "					left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
						 "where a.no_pdrk = '"+sender.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc"
					   ]}),true);			
			setTipeButton(tbAllFalse);
			if (typeof data == "object"){
				var line = data.result[0].rs.rows[0];
				if (line != undefined){		
					setTipeButton(tbUbahHapus);		
					this.cbDraft.setText(line.no_draft);
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);	
					this.c_jenis.setText(line.jenis_agg);
					this.cb_ubis.setText(line.kode_ubis,line.nama_ubis);
					this.cb_gubis.setText(line.kode_gubis,line.nama_gubis);
					this.cb_app1.setText(line.nik_app1);
					this.cb_app2.setText(line.nik_app2);
					this.cb_app3.setText(line.nik_app3);
					this.cb_appj1.setText(line.nik_appjust);
					this.cb_appj2.setText(line.nik_appjust2);
					this.cb_appp3.setText(line.nik_apppdrk3);
					this.cb_appp32.setText(line.nik_apppdrk32);

					this.cb_kota.setText(line.kode_kota);
					this.e_file.setText(line.file_nd);
					this.ed_dok.setText(line.no_nd);
					this.mDesk.setCode(urldecode(line.justifikasi));
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
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					var jenis = line.jenis == "P" ? "PAYMENT" : line.jenis == "C" ? "COMMITMENT" :"KEDUANYA";
					if (line.dc.toUpperCase() == "C")
						this.sg.appendData([line.bulan,line.kode_cc,line.nama_cc,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,floatToNilai(line.nilai_gar),floatToNilai(line.nilai_pakai),floatToNilai(line.saldo),floatToNilai(line.nilai), jenis]);
					else this.sg2.appendData([line.bulan,line.kode_cc,line.nama_cc,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,floatToNilai(line.nilai),line.target, jenis]);
				}
			} else {
				this.sg.clear(1);
				this.sg2.clear(1);
			}
		}
		if (sender == this.cb_ubis){						
			this.dbLib.getDataProviderA("select kode_cc, nama from rra_cc where kode_lokasi = '"+this.app._lokasi+"' and kode_ubis = '"+sender.getText()+"' ", undefined, "cc");
		}
		if (sender == this.cb_templ){
			try{
				var data = this.dbLib.getDataProvider("select keterangan from rra_draft where kode_draft = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ",false);
				eval("data = "+data+";");
				if (typeof data != "string" && data.rs.rows[0] != undefined){
					this.mDesk.setCode(urldecode(data.rs.rows[0].keterangan));
				}
			}catch(e){
				alert(data);
			}
		}
	},
	doRequestReady: function(sender, methodName, result, request){
		try{   
			if (sender == this.dbLib){
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
						setTipeButton(tbSimpan);  				
						if (result.toLowerCase().search("error") == -1)					
						{							
							if (this.saveFiles != ""){
								         
                                this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);
                            }else if (this.saveFiles == ""){
                                system.info(this,"transaksi telah sukses tersimpan","(ID : "+ this.e_nb.getText()+")");						
								this.standarLib.clearByTag(this, ["0","1"],this.e_nb);		
								this.sgUpld.clear(1);
							}
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			
			}
			if (sender == this.fileUtil){
				switch(methodName){
				case "copyFilesTo" : 
				   if ((typeof result == "boolean" && result == false) || result.indexOf("error") != -1){
					   system.alert(this,result,"Upload File gagal");
				   }else{ 
					  system.info(this,"transaksi telah sukses tersimpan","(ID : "+ this.e_nb.getText()+")");
					  this.standarLib.clearByTag(this, ["0","1"],this.e_nb);		
					  this.sgUpld.clear(1);
					  showProgress("delete temporary...");
					  if (this.saveFiles !="" ) this.fileUtil.deleteFiles(this.saveFiles);
				   }
				 break;
					case "deleteFiles" :
						hideProgress("delete temporary...");
					break;
				}
			}
		}
		catch(e){
			setTipeButton(tbSimpan);
			system.alert(this,"Error Execute",e);
		}
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
            systemAPI.alert(e+" "+data);
         }
    },
    doPager: function(sender, page){			
		sender.sg.doSelectPage(page);
	},
	doAfterPaste: function(sender, rowCount){		
		try{			
			sender.onChange.set(this,undefined);
			if (sender == this.sg ) var sgn = this.sgn;
			if (sender == this.sg2 ) var sgn = this.sgn2;		
			sgn.setTotalPage(sender.getTotalPage());
			sgn.rearrange();
			var tot = 0;			
			var dataAkun = new server_util_arrayList();
			var kodeAkun = "' '";
			var kodeCc = "' '";
			var dataGrid = new arrayMap();										
			for (var i = 0; i < sender.getRowCount();i++){
				if (sender == this.sg){
					if (this.sg.cells(10,i) != ""){
						dataAkun.add(new server_util_Map({items:{cc:this.sg.cells(1,i), akun:this.sg.cells(5,i), bln1:"01",bln2:this.sg.cells(0,i)}}));
						tot += nilaiToFloat(this.sg.cells(10,i));			
						kodeCc += "'"+this.sg.cells(1,i)+"'";
						kodeAkun += "'"+this.sg.cells(5,i)+"'";
						dataGrid.set(this.sg.cells(0,i)+":"+this.sg.cells(1,i)+":"+this.sg.cells(5,i),{index:i + 1, nilai: nilaiToFloat(this.sg.cells(10,i))});
					}
				}
				if (sender == this.sg2){
					if (this.sg2.cells(7,i) != "")
						tot += nilaiToFloat(this.sg2.cells(7,i));			
				}
			}
			if (sender == this.sg){
				var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.kode_akun,a.kode_cc,substr(a.periode,5,2) as periode, sum(a.nilai) as pakai "+
						"	from rra_anggaran a "+
						"	inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
						"		where a.kode_akun in ("+kodeAkun+")  and a.kode_cc in ("+kodeCc+") and a.periode like '"+this.e_periode.getText().substr(0,4)+"%'  and a.kode_lokasi= '"+this.app._lokasi+"' and lower(a.DC)= 'c' and b.flag_rfc='0' and a.no_bukti <> '"+this.e_nb.getText()+"' "+
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
				var dataGar = this.rfc.dataGar2(this.login,  this.e_periode.getText().substr(0,4),dataAkun);
						
				if (typeof dataGar == "string"){
					system.alert(this,dataGar,"");
					return false;
				}					
				var res = dataGar.get("saldo");
				var line, tmp;										
				for (var i in res.objList){					
					var gridValue = res.get(i).get("value");	
					dataRRR.set(i, (dataRRR.get(i) == undefined ? 0 : dataRRR.get(i)) );
					var line = {sawal :0, pakai : 0, sisa : 0, sisaRls:0,
						sawalBln:0, pakaiBln:0, sisaBln:0, sisaRlsBln : 0,
						sawalPayment: 0, pakaiPayment:0, sisaPayment : 0, sisaRlsPayment:0,
						sawalCommit: 0, pakaiCommit:0, sisaCommit : 0, sisaRlsCommit : 0
					};
					if (this.app._sapOnline){																									
						if (this.c_jenis.getText() == "OPEX"){
							var line = this.getSaldoOpex(res.get(i).get("restable"),gridValue.get("jenis").toUpperCase(), parseFloat(gridValue.get("bln1"))  );
						}else {
							var line = this.getSaldoCapex(res.get(i).get("restable"),gridValue.get("jenis").toUpperCase(), parseFloat(gridValue.get("bln1"))  );						
						}	
					}
					line.pakai += parseFloat(dataRRR.get(i));
					line.sisa -= parseFloat(dataRRR.get(i));
					line.sisaRls -= parseFloat(dataRRR.get(i));
					if (dataGrid.get(i) != undefined){			
						var gData = dataGrid.get(i);
						var row  = gData.index - 1;
						var rfcRet = line;
						if (this.sg.cells(10,row) != "" && rfcRet != undefined){					
							if (nilaiToFloat(this.sg.cells(10,row)) <= rfcRet.sisaRls)
								this.sg.cells(12,row,this.sg.cells(10,row));
							else  this.sg.cells(12,row,floatToNilai(rfcRet.sisaRls));
						}
						this.sg.editData(row, [line.sawal, line.pakai, line.sisa],[7,8,9]);		
					}
				}
			}
			this.e_donor.setText(floatToNilai(tot));
			sender.onChange.set(this,"doChangeCell");
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doCellEnter: function(sender, col, row){
	
	}
});


/*tmp = res.get(i).get("restable").get("0");								
for (var t in tmp.objList)
{
	var tmp2 = tmp.get(t);													
	if (this.c_jenis.getText() == "OPEX"){
		line = { sawal : tmp2.get("TSL06") ,
						 pakai :  tmp2.get("TSL04") + dataRRR.get(i),
						 sisa : tmp2.get("TSL06")- dataRRR.get(i) - tmp2.get("TSL04")
				};
	}else {
		var jenis = "COMT";
		if (gridValue.get("jenis") == "PAYMENT") jenis = "PAY";
		line = {	sawal : nilaiToFloat(tmp2.get("PLAN_CO_"+jenis)),
					pakai : nilaiToFloat(tmp2.get("ACTUAL_"+jenis)) + dataRRR.get(i),
					sisa : nilaiToFloat(tmp2.get("PLAN_CO_"+jenis)) - dataRRR.get(i) - nilaiToFloat(tmp2.get("ACTUAL_"+jenis))
			};
	}
	if (dataGrid.get(i) != undefined && dataGrid.get(i).nilai > line.sisa){
		system.alert(this,"Transaksi Donor tidak valid.","Nilai Donor melebihi Saldo Anggaran [Baris: "+dataGrid.get(i).index+"]");
		return false;
	}
}*/
