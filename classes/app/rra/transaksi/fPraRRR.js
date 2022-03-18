/*
 * TSL01 + TSL02 = Plan 
 * TSL03 + TSL04 = Actual FM (Payment + Commitment)
 * TSL05 + TSL06 = Release FM (Payment + Commitment)
 * TSL07 + TSL04 = Actual FM
 * TSL09 + TSL10 = Plan FM (Payment + Commitment)
 * */
window.app_rra_transaksi_fPraRRR = function(owner, options)
{
	if (owner)
	{
		window.app_rra_transaksi_fPraRRR.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_transaksi_fPraRRR";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Draft PDRK Rescheduling, Redistribusi & Realokasi Anggaran: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;tinymceCtrl;util_rfcLib;util_rfc;server_util_Map;uploader;util_file");
		this.e_periode = new saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_uid = new saiLabelEdit(this,{bound:[720,11,200,20], caption:"SAP User", tag:11, visible:this.app._appState == "Q00"});
		this.e_nb = new saiLabelEdit(this,{bound:[20,12,222,20],caption:"No PDRK",maxLength:30,readOnly:true});
		this.i_gen = new imageButton(this,{bound:[245,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_pwd = new saiLabelEdit(this,{bound:[720,12,200,20], caption:"SAP Password", password:true, tag:11, visible:this.app._appState == "Q00"});
		
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});				
		this.c_jenis = new saiCB(this,{bound:[20,15,202,20],caption:"Jenis Anggaran",items:["OPEX","CAPEX"], readOnly:true, tag:2});		
		this.e_donor = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Nilai Donor", readOnly:true, tipeText:ttNilai, text:"0"});
		this.c_modul = new saiCB(this,{bound:[20,14,202,20],caption:"Modul",items:["RRR","ABT"], readOnly:true, tag:2, change:[this,"doChange"]});		
		this.e_terima = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Nilai Penerima", readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.pc1 = new pageControl(this,{bound:[20,16,900, 330], childPage:["Data PDRK","Data Donor","Data Penerima","Data Justifikasi","Dokumen Pendukung"]});
		
		this.ed_dok = new saiLabelEdit(this.pc1.childPage[0], {bound:[20,1,400,20], caption:"No. Nota Dinas"});
		this.e_file = new saiLabelEdit(this.pc1.childPage[0], {bound:[20,2,400,20], caption:"File Nota Dinas"});
		this.upld = new uploader(this.pc1.childPage[0], {bound:[430,2,80,20],caption:"Browse",autoSubmit:true, param1:"uploadTo",param2:"server/media/tmp/", param3:"object", param4:"server/media/", afterUpload:[this,"doAfterLoad"], change:[this,"doFileChange"]});
		
		
		this.cb_ubis = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Png Jawab", multiSelection:false, maxLength:10, bufferOption: boHALF,tag:2, change:[this,"doChange"]});
		this.cb_gubis = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Direktorat", multiSelection:false, maxLength:10, bufferOption: boHALF, tag:2});		
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, bufferOption: boHALF, bufferData: this.app._listNIK, tag:2, readOnly:true, text:this.app._userLog, rightLabelCaption:this.app._namaUser});			
		
		this.cb_app1 = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"NIK Png Jawab", bufferOption: boHALF, bufferData: this.app._listNIK,  multiSelection:false, maxLength:10, tag:2});
		this.cb_app2 = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"NIK Mengetahui",bufferOption: boHALF, bufferData: this.app._listNIK,  multiSelection:false, maxLength:10, tag:2});
		this.cb_app3 = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"NIK Menetapkan", bufferOption: boHALF, bufferData: this.app._listNIK, multiSelection:false, maxLength:10, tag:2});
		this.cb_kota = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Kota", multiSelection:false, bufferOption: boHALF,  maxLength:10, tag:2});
		this.cb_appRev = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Reviewer", bufferOption: boHALF, bufferData: this.app._listNIK,  multiSelection:false, maxLength:10, tag:2});
		
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,15,this.pc1.width-5,this.pc1.height-40],
					colCount:12,
					tag:9,
					colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai Gar","Terpakai","Saldo","Nilai Donor","Jenis Budget"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,90,90,90,90,90,70,60,120,90,70,50]],
					columnReadOnly:[true,[2,4,6,7,8,9],[]],
					buttonStyle:[[0,1,3,5,11],[bsAuto,bsEllips,bsEllips,bsEllips,bsAuto]],
					colFormat:[[7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai]],
					pasteEnable: true,
					picklist:[[0,11],[new arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]}), new arrayMap({items:["PAYMENT","COMMITMENT","KEDUANYA"]})]],
					defaultRow:1,
					autoPaging:true,
					rowPerPage:20,
					afterPaste:[this,"doAfterPaste"],
					cellEnter:[this,"doCellEnter"],
					ellipsClick:[this,"doEllipsClick"],
					change:[this,"doChangeCell"],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:true});
		this.sgn = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsTransNav,grid:this.sg, pager:[this,"doPager"]});
		this.b_view = new button(this.sgn,{bound:[this.sgn.width - 100,1,90,20],caption:"View Budget", click:[this,"doViewBudget"]});
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],
					colCount:10,
					tag:0,
					colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai Terima","Target Selesai","Jenis Budget"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,130,150,70,60,120,150,70,50]],
					columnReadOnly:[true,[2,4,6],[7,8]],
					buttonStyle:[[0,1,3,5,9],[bsAuto,bsEllips,bsEllips,bsEllips,bsAuto]],
					pasteEnable: true,
					colFormat:[[7],[cfNilai]],
					picklist:[[0,9],[new arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]}), new arrayMap({items:["PAYMENT","COMMITMENT","KEDUANYA"]})]],
					defaultRow:1,
					autoPaging:true,
					rowPerPage:20,
					afterPaste:[this,"doAfterPaste"],
					ellipsClick:[this,"doEllipsClick2"],
					change:[this,"doChangeCell2"],
					nilaiChange:[this,"doNilaiChange2"],
					autoAppend:true});
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
		this.pView = new panel(this.pc1.childPage[1],{bound:[this.pc1.width - 320,5,300,this.pc1.height - 25], caption:"Data Anggaran"});
		this.gridView = new saiGrid(this.pView,{bound:[0,20,300,this.pView.height - 40], colCount:5, colTitle:"Periode, Plan, Release, Actual, Saldo",
									colWidth:[[4,3,2,1,0],[100,100,100,100,50]],readOnly:true, tag : 99,
									colFormat:[[1,2,3,4],[cfNilai, cfNilai,cfNilai, cfNilai]]
									});
		this.bOk = new button(this.pView,{bound:[0,this.pView.height - 20,this.pView.width,20], caption:"OK", click:[this,"doViewClick"]});
		this.pView.hide();
		setTipeButton(tbSimpan);
		this.maximize();
		this.setTabChildIndex();
		try {
			this.dbLib = this.app.dbLib;
			this.dbLib.addListener(this);
			if (this.app._rfcLib == undefined)
				this.app._rfcLib = new util_rfcLib(this.app._rfcSetting);			
			if (this.app._rfc == undefined)	
				this.app._rfc = new util_rfc(undefined, this.app._rfcSetting);
			if (this.app._fileUtil == undefined)	
				this.app._fileUtil = new util_file();
				
			this.fileUtil = this.app._fileUtil;			
			this.fileUtil.addListener(this);
				
			this.rfcLib = this.app._rfcLib;
			this.rfc = this.app._rfc;
			this.login = new server_util_Map({items:{user:this.app._defsapuid.uid, passwd:this.app._defsapuid.pid} });
			
			this.standarLib = new util_standar();					
			this.cb_ubis.setSQL("select kode_ubis, nama from rra_ubis where kode_lokasi='"+this.app._lokasi+"'",["kode_ubis","nama"],false,["Kode","Nama"],"and","Data Penanggungjawab Program",true);
			this.cb_gubis.setSQL("select kode_gubis, nama from rra_gubis where kode_lokasi='"+this.app._lokasi+"'",["kode_gubis","nama"],false,["Kode","Nama"],"and","Data Direktorat",true);			
			this.cb_app1.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan ",true);
			this.cb_app2.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_app3.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_buat.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_kota.setSQL("select kode_kota, nama from rra_kota ",["kode_kota","nama"],false,["Kode Kota","Nama Kota"],"and","Data Kota",true);
			this.cb_appRev.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			
			this.cb_ubis.setText(this.app._kodeUbis);
			this.cb_gubis.setText(this.app._kodeGubis);
			this.cb_app1.setText(this.app._nikApp1);
			this.cb_app2.setText(this.app._nikApp2);
			this.cb_app3.setText(this.app._nikApp3);
			this.cb_kota.setText(this.app._kota);
			this.e_uid.setText(this.app._defsapuid.uid);
			this.e_pwd.setText(this.app._defsapuid.pwd);
						
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
window.app_rra_transaksi_fPraRRR.extend(window.childForm);
window.app_rra_transaksi_fPraRRR.implement({
	doClose: function(sender){
		if (this.dataUpload !="" ) this.fileUtil.deleteFiles(this.dataUpload.temporary, undefined, this);			
		this.dbLib.delListener(this);
		this.fileUtil.delListener(this);		
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_pra_m","no_pdrk","DRAFT-"+this.app._kodeUbis+"-"+this.e_periode.getText().substr(2,4)+".","0000"));
					
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
					sql.add("insert into rra_pra_m(no_pdrk,kode_lokasi,keterangan,kode_ubis,kode_gubis,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi, nik_user, tgl_input,progress, kode_kota, no_nd, file_nd, flag_rfc, nik_appjust) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"','"+this.cb_ubis.getText()+"','"+this.cb_gubis.getText()+"','"+this.c_jenis.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"','"+this.cb_app1.getText()+"','"+this.cb_app2.getText()+"','"+this.cb_app3.getText()+"','"+this.c_modul.getText()+"',null,'"+this.app._userLog+"',now(),'0','"+this.cb_kota.getText()+"','"+this.ed_dok.getText()+"','"+this.e_file.getText()+"','0','"+this.cb_appRev.getText()+"')");
					sql.add(new server_util_Map({items:{tipe:"clob",table:"rra_pra_m",field:"justifikasi",value:urlencode(this.mDesk.getCode()), filter:" no_pdrk = '"+this.e_nb.getText()+"' "}})); 						
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into rra_pra_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_cc,kode_drk,periode,nilai_gar,nilai_pakai,saldo,nilai,dc,target, jenis) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(9,i))+","+parseNilai(this.sg.cells(10,i))+",'C','-','"+this.sg.cells(11,i).substr(0,1)+"')");
								sql.add("insert into rra_anggaran(no_bukti,modul,kode_cc,kode_akun,kode_drk,kode_lokasi,periode,dc,nilai,nik_user,tgl_input,nilai_gar, nilai_pakai, saldo,target,jenis) values "+
										"	('"+this.e_nb.getText()+"','"+this.c_modul.getText()+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(3,i)+"','"+this.app._lokasi+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,i)+"','C',"+parseNilai(this.sg.cells(10,i))+",'"+this.app._userLog+"',now(),"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(9,i))+",'-','"+this.sg.cells(11,i).substr(0,1)+"')");
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into rra_pra_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_cc,kode_drk,periode,nilai_gar,nilai_pakai,saldo,nilai,dc,target,jenis) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(5,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"',0,0,0,"+parseNilai(this.sg2.cells(7,i))+",'D','"+this.sg2.cells(8,i)+"','"+this.sg2.cells(9,i).substr(0,1)+"')");
								sql.add("insert into rra_anggaran(no_bukti,modul,kode_cc,kode_akun,kode_drk,kode_lokasi,periode,dc,nilai,nik_user,tgl_input,nilai_gar, nilai_pakai, saldo,target,jenis) values "+
										"	('"+this.e_nb.getText()+"','"+this.c_modul.getText()+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(5,i)+"','"+this.sg2.cells(3,i)+"','"+this.app._lokasi+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"','D',"+parseNilai(this.sg2.cells(7,i))+",'"+this.app._userLog+"',now(),0,0,0,'"+this.sg2.cells(8,i)+"','"+this.sg2.cells(9,i).substr(0,1)+"')");
							}
						}
					}
					if (files.length > 0){
						var scan = "insert into rra_pra_dok(no_pdrk,kode_lokasi,file_dok,nama,no_urut) values ";						
						var first = true;
						var noUrut=1;
						for (var i in files){							
							scan += "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+files[i].file+"','"+files[i].nama+"',"+noUrut+")";
							sql.add(scan);																	
							scan = "insert into rra_pra_dok(no_pdrk,kode_lokasi,file_dok,nama,no_urut) values ";						
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
										sql.add("insert into rra_pra_orgi(no_bukti, no_pdrk,periode, kode_akun, kode_cc, nilai,kode_lokasi,versi, kode_drk, fund_ctr)values "+
												"	('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+line.get("GJAHR")+prd+"','"+gridValue.get("akun")+"','"+gridValue.get("cc")+"','"+line.get("PLAN_CO")+"','"+this.app._lokasi+"','"+line.get("VERSN")+"','"+gridValue.get("drk")+"','"+line.get("FINCODE")+"')");
									else 
										sql.add("insert into rra_pra_orgi(no_bukti, no_pdrk,periode, kode_akun, kode_cc, nilai,kode_lokasi)values ('"+this.e_nb.getText()+"','"+this.e_nb.getText()+"','"+line.get("GJAHR")+prd+"','"+gridValue.get("akun")+"','"+gridValue.get("cc")+"','"+line.get("TSL10")+"','"+this.app._lokasi+"')");
								}								
							}
						}										
					}
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql, undefined, this);
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
					this.cb_kota.setText(this.app._kota);					
					this.e_uid.setText(this.app._defsapuid.uid);
					this.e_pwd.setText(this.app._defsapuid.pwd);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				try{
					//if (this.c_modul.getText() != "ABT") this.sg.setTag("0"); else this.sg.setTag("9");
					if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br> initialization...");
					this.sg2.validasi();
					this.login.set("user",this.e_uid.getText());
					this.login.set("passwd",this.e_pwd.getText());
					var dataAkun = new server_util_arrayList();
					var kodeAkun = "' '";
					var kodeCc ="' '";
					var drk = "' '";
					this.sub_jenis = "RRA";
					this.sts_pdrk = "RRS";
					
					var totalPerBulan = new arrayMap();
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (!this.sg2.rowValid(i)) continue;
						var prd = this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i) ;
						if (prd > this.app._periodeGAR){
							var k = i+1;
							//throw("Transaksi Terima tidak valid. Periode lebih besar dari Current Periode [Baris: "+k+"]");							
							//							
						}
						var prd = this.sg2.cells(0,i) ;
						var prd2 = this.app._periodeGAR.substr(4,2);					
						if ((this.app._TW.get(prd) < this.app._TW.get(prd2))){
							var k = i+1;
							throw("Transaksi Terima tidak valid. Periode kurang dari Triwulan sekarang [Baris: "+k+"]");							
						}
						for (var j=i;j < this.sg2.getRowCount();j++){
							if (this.sg2.cells(0,j) == this.sg2.cells(0,i) && this.sg2.cells(1,j) == this.sg2.cells(1,i) && this.sg2.cells(5,j) == this.sg2.cells(5,i) && (i != j)) {
								var k = i+1;
								throw("Transaksi Terima tidak valid. Duplikasi Data Anggaran.[Baris : "+k+"]");								
							}
						}
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
					if (this.c_modul.getText() != "ABT") 
					{
						this.sg.validasi();
						if (nilaiToFloat(this.e_donor.getText()) != nilaiToFloat(this.e_terima.getText()) && (this.sub_jenis == "RRA" || this.sub_jenis == "RSH" || this.sub_jenis == "RRS"  ))  {
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
									//throw("Transaksi Donor tidak valid. Periode lebih besar dari Current Periode [Baris: "+k+"]");									
									this.c_modul.setText('ABT');
									this.sub_jenis = 'RRS';									
								}
								var prd = this.sg.cells(0,i) ;
								var prd2 = this.app._periodeGAR.substr(4,2);					
								if ((this.app._TW.get(prd) < this.app._TW.get(prd2))){
									var k = i+1;
									throw("Transaksi Terima tidak valid. Periode kurang dari Triwulan sekarang [Baris: "+k+"]");									
								}
								for (var j=i;j < this.sg.getRowCount();j++){
									if (this.sg.cells(0,j) == this.sg.cells(0,i) && this.sg.cells(1,j) == this.sg.cells(1,i) && this.sg.cells(5,j) == this.sg.cells(5,i) && (i != j)) {
										var k = i+1;
										throw("Transaksi Donor tidak valid. Duplikasi Data Anggaran.[Baris : "+k+"]");										
									}
								}
								if (this.c_jenis.getText() == "OPEX" && this.sg.cells(11,i).toUpperCase() != "KEDUANYA"){
									this.sg.cells(11,i,"KEDUANYA");
								}
								//untuk keyMap dari Orig
								var id = this.sg.cells(0,i)+":"+this.sg.cells(1,i)+":"+this.sg.cells(5,i)+":"+this.sg.cells(3,i)+":"+this.sg.cells(11,i).substr(0,1);								
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
							if (totalPerBulan.get(i).totDonor != totalPerBulan.get(i).totTerima && (this.sub_jenis == "RRA" || this.sub_jenis == "RRS")){
								throw ("Total perbulan donor harus sama dengan total per bulan penerima");
							}
						}
						if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br> ambil data yang terposting...");
						//ambil data RRR yang belum terposting ke RFC					
						var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.kode_akun,a.kode_cc,substr(a.periode,5,2) as periode, sum(a.nilai) as pakai "+
								"	from rra_anggaran a "+
								"	inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
								"		where a.kode_akun in ("+kodeAkun+")  and a.kode_cc in ("+kodeCc+") and a.periode like '"+this.e_periode.getText().substr(0,4)+"%'  and a.kode_lokasi= '"+this.app._lokasi+"' and lower(a.DC)= 'c' and b.flag_rfc='0' "+
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
							if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br> Cek Saldo SAP...");
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
								
								dataRRR.set(i, (dataRRR.get(i) == undefined ? 0 : dataRRR.get(i)) );
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
										tmp = { gar:parseFloat(line.sawal), pakai:parseFloat(line.pakai), saldo:parseFloat(line.sisa), 
												donor:nilaiToFloat(this.sg.cells(10,row)),lastDonor:nilaiToFloat(this.sg.cells(10,row))};
									}else {																				
										tmp.saldo -= tmp.lastDonor;
										tmp.gar -= tmp.lastDonor;
										line.sisa -= tmp.lastDonor;
										tmp.donor += nilaiToFloat(this.sg.cells(10,row));
										tmp.lastDonor = nilaiToFloat(this.sg.cells(10,row));									
									}					
								}
								if (nilaiToFloat(this.sg.cells(10,row)) > line.releaseBln && this.sub_jenis == "RRA"){
								//	throw("Transaksi Donor tidak valid. Nilai Donor melebihi Release Anggaran [Baris: "+(row + 1).toString()+"].<br>."+this.sg.cells(10,row)+" > "+line.releaseBln);
								}else if (( this.sub_jenis == "RSH" || this.sub_jenis == "RRS" )&& nilaiToFloat(this.sg.cells(10,row)) > line.planBln){
								//	throw("Transaksi Donor tidak valid. Nilai Donor melebihi Plan Anggaran [Baris: "+(row + 1).toString()+"].<br>."+this.sg.cells(10,row)+" > "+line.planBln);
								}
								dataTemp.set(akunCC, tmp);
								line.sisa -= parseFloat(dataRRR.get(i));
								if (nilaiToFloat(this.sg.cells(10,row)) > line.sisa && this.sub_jenis == "RRA"){
								//	throw("Transaksi Donor tidak valid. Nilai Donor melebihi Saldo Anggaran [Baris: "+(row + 1).toString()+"].<br>."+this.sg.cells(10,row)+" > "+line.sisa);									
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
						if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br> ambil yang belum terposting...");
						var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.kode_akun,a.kode_cc,substr(a.periode,5,2) as periode, sum(a.nilai) as pakai "+
								"	from rra_anggaran a "+
								"	inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
								"		where a.kode_akun in ("+kodeAkun+")  and a.kode_cc in ("+kodeCc+") and a.periode like '"+this.e_periode.getText().substr(0,4)+"%'  and a.kode_lokasi= '"+this.app._lokasi+"' and lower(a.DC)= 'c' and b.flag_rfc='0' "+
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
						if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br> cek SALDO SAP untuk PDRK...");
						if (this.app._sapOnline){			
							var dataGar = this.rfc.dataGar2(this.login,  this.e_periode.getText().substr(0,4),dataAkun,"1000","1000","64","0");
							
							if (typeof dataGar == "string"){
								throw(dataGar);
								return false;
							}
						}
					}
					try{
						if (this.app._sapOnline){
							if (this.showLoading) this.showLoading("Silahkan tunggu.<br>Sedang diproses....!!!<br> generate PDRK...");
							this.data1Thn = dataGar.get("saldothn");					
							for (var i in this.data1Thn.objList){						
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
						if (this.hideLoading) this.hideLoading();
						system.alert(this,e,"");
						return false;
					}
					/*//select akum dari rra_flagrelasi dan rra_filterakun
					// jika ada di kondisi tersebut maka batal / tidak boleh
					var akunDonor = [];
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){						
							var prd = this.e_periode.getText().substr(0,4)+this.sg.cells(0,i) ;
							var tw1 = this.app._TW.get(this.sg.cells(0,i));
							var tw2 = this.app._TW.get(this.app._periodeGAR.substr(4,2));
							if (prd > this.app._periodeGAR){
								var k = i+1;
								system.alert(this,"Transaksi Donor tidak valid.","Periode lebih besar dari Current Periode [Baris: "+k+"]");
								return ; 
							}else if (tw1 != tw2){
								var k = i+1;
								system.alert(this,"Transaksi Donor tidak valid.","Periode tidak dalam triwulan berjalan [Baris: "+k+"]");
								return ; 
							}
							for (var j=i;j < this.sg.getRowCount();j++){
								if (this.sg.cells(0,j) == this.sg.cells(0,i) && this.sg.cells(1,j) == this.sg.cells(1,i) && this.sg.cells(5,j) == this.sg.cells(5,i) && (i != j)) {
									var k = i+1;
									system.alert(this,"Transaksi Donor tidak valid.","Duplikasi Data Anggaran.[Baris : "+k+"]");
									return false;
								}
							}
							if (akunDonor.indexOf("'"+this.sg.cells(5,i)+"'") == -1) akunDonor.push("'"+this.sg.cells(5,i)+"'");
						}
					}
					var akunTerima = [];
					for (var i=0;i < this.sg2.getRowCount();i++){				
						var prd = this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i) ;
						var tw1 = this.app._TW.get(this.sg2.cells(0,i));
						var tw2 = this.app._TW.get(this.app._periodeGAR.substr(4,2));
						if (prd > this.app._periodeGAR){
							var k = i+1;
							system.alert(this,"Transaksi Terima tidak valid.","Periode lebih besar dari Current Periode [Baris: "+k+"]");
							return ; 
						}else if (tw1 != tw2){
								var k = i+1;
								system.alert(this,"Transaksi Terima tidak valid.","Periode tidak dalam triwulan berjalan [Baris: "+k+"]");
								return ; 
						}
						for (var j=0;j < this.sg2.getRowCount();j++){
							if (this.sg2.cells(0,j) == this.sg2.cells(0,i) && this.sg2.cells(1,j) == this.sg2.cells(1,i) && this.sg2.cells(5,j) == this.sg2.cells(5,i) && (i != j)) {
								var k = i+1;
								system.alert(this,"Transaksi Terima tidak valid.","Duplikasi Data Anggaran.[Baris : "+k+"]");
								return false;
							}
						}					
						if (akunTerima.indexOf("'"+this.sg2.cells(5,i)+"'") == -1) akunTerima.push("'"+this.sg2.cells(5,i)+"'");
					}	
					*/
					//CEK MANDATORY
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
							system.alert(this,"Nilai terima tidak boleh Nol","");
							return false;
						}
					}
					this.simpan();
				}catch(e){
					if (this.hideLoading) this.hideLoading();
					system.alert(this, e,"");
				}
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
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.doClick();
		this.dbLib.getDataProviderA("select kode_drk, nama from rra_drk where kode_lokasi = '"+this.app._lokasi+"' and tahun = '"+y+"'", undefined, "drk");
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_pra_m","no_pdrk","DRAFT-"+this.app._kodeUbis+"-"+this.e_periode.getText().substr(2,4)+".","0000"));
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
				var act = line.get("TSL04");//cek minus, karena ada yang minus
				if (act.indexOf("-") > -1) line.set("TSL04", parseFloat(line.get("TSL04")) * -1);
				act = line.get("TSL03");//cek minus
				if (act.indexOf("-") > -1) line.set("TSL03", parseFloat(line.get("TSL03")) * -1);
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
				rfcRet.planBln = rfcRet.planBlnP;
			}else {
				rfcRet.sawal = rfcRet.sawalCommit;
				rfcRet.pakai = rfcRet.pakaiCommit;
				rfcRet.planBln = rfcRet.planBlnC;				
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
					rfcRet.planBln = rfcRet.planBlnP;
				}else {
					rfcRet.sawal 	= rfcRet.sawalCommit;
					rfcRet.pakai 	= rfcRet.pakaiCommit;					
					rfcRet.releaseBln = rfcRet.releaseBlnC;
					rfcRet.planBln = rfcRet.planBlnC;
				}
				rfcRet.sisa = rfcRet.sawal - rfcRet.pakai,
				rfcRet.sisaRls = rfcRet.sisa;
			}
			
		}				
		return rfcRet;
	},
	//PLAN_PAY, //RELEASE_PAY//ACTUAL_PAY//PLAN_COMT//RELEASE_COMT//ACTUAL_COMT
	getSaldoCapex: function(restable, versi, periode){		
		var tmp = restable;
		var rfcRet = {sawal :0, pakai : 0, sisa : 0, sisaRls:0,
			sawalBln:0, pakaiBln:0, sisaBln:0, sisaRlsBln : 0,
			ReleaseBlnC	: 0, ReleaseBlnP	:0, sisaBln		: 0, sisaRlsBln 	: 0, releaseBln : 0,
			sawalPayment: 0, pakaiPayment:0, sisaPayment : 0, sisaRlsPayment:0,
			sawalCommit: 0, pakaiCommit:0, sisaCommit : 0, sisaRlsCommit : 0,
			planBln 	: 0, planBlnC 		:0, planBlnP 	: 0
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
			rfcRet.planBln = rfcRet.sisaBln;
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
                   this.app._mainForm.pesan(0,"Periode tidak dikenal.");
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
                           //system.alert(this, "Data akun tidak ditemukan. "+ fund +":"+fundCtr,"");
                           this.app._mainForm.pesan(0,"Akun tidak ditemukan. "+ fund +":"+fundCtr);
                           sender.onChange.set(this,"doChangeCell");
                           return;
                       }
                   }
               }
               if (this.sg.cells(0,row) != "" && this.sg.cells(1,row) != "" && this.sg.cells(3,row) != "" && this.sg.cells(5,row) != "") {
                   var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.kode_akun,a.kode_cc,substr(a.periode,5,2) as periode, sum(a.nilai) as pakai "+
                       "	from rra_anggaran a "+
                       "	inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
                       "		where a.kode_akun = '"+this.sg.cells(5,row)+"'  and a.kode_cc = '"+this.sg.cells(1,row)+"' and a.periode = '"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,row)+"'  and a.kode_lokasi= '"+this.app._lokasi+"' and lower(a.DC)= 'c' and b.flag_rfc='0' "+
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
						sawalCommit: 0, pakaiCommit:0, sisaCommit : 0, sisaRlsCommit : 0,
						planBln : 0, planBlnC : 0, planBlnP : 0
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
                    rfcRet.sawal = rfcRet.sawal -  parseFloat(dataRRR.get(i));
                    rfcRet.sisa = rfcRet.sisa -  parseFloat(dataRRR.get(i));
                    rfcRet.sisaRls = rfcRet.sisaRls -  dataRRR.get(i);
					rfcRet.planBln = rfcRet.planBln -  parseFloat(dataRRR.get(i));
					if (rfcRet != undefined){
						if (this.sub_jenis == "RSH" || this.sub_jenis == "RRS"){
							this.sg.setCell(7,row,floatToNilai(rfcRet.planBln));
							this.sg.setCell(8,row,floatToNilai(0));
							this.sg.setCell(9,row,floatToNilai(rfcRet.planBln));
						}else {
							this.sg.setCell(7,row,floatToNilai(rfcRet.sawal));
							this.sg.setCell(8,row,floatToNilai(rfcRet.pakai));
							this.sg.setCell(9,row,floatToNilai(rfcRet.sisa));
							if (this.sg.cells(10,row) != ""){
								if (nilaiToFloat(this.sg.cells(10,row)) <= rfcRet.sisaRls)
									this.sg.cells(12,row,this.sg.cells(10,row));
								else  this.sg.cells(12,row,floatToNilai(rfcRet.sisaRls));
							}
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
                       //system.alert(this,"Data Akun tidak ditemukan","");
                       this.app._mainForm.pesan(0,"Akun tidak ditemukan. "+sender.cells(5,row));
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
				}else if (this.sg.cells(10,row) != ""){
					this.sg.cells(12,row,this.sg.cells(10,row));
				}
			}
            sender.onChange.set(this,"doChangeCell");
        }catch(e){
            sender.onChange.set(this,"doChangeCell");
            system.alert(this,e,"");
        }

	},
	locateCC : function(sender, col, row, cc){
		var data = this.dbLib.getDataProvider("select nama from rra_cc where kode_cc = '"+cc+"' and kode_ubis = '"+this.cb_ubis.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ",true);
		if (typeof data == "string"){
			error_log(data);
			return false;
		}
		if (data.rs.rows[0] !== undefined){
			sender.cells(col, row, data.rs.rows[0].nama );
			return true;
		}else return false;
	},
	doChangeCell2: function(sender, col, row) {
		sender.onChange.set(this,undefined);
		if (col == 0){			
			if (parseFloat(sender.cells(0,row)) < 1 || parseFloat(sender.cells(0,row)) > 12 ) {
				system.alert(this,"Periode tidak dikenal","");
				this.sg2.cells(0,row,"");
				return;
			}
			if (trim(this.sg2.cells(0,row)).length == 1) this.sg2.cells(0,row,"0"+trim(this.sg2.cells(0,row)));
			
		}
		switch (col){
			case 1 :
				if(sender.cells(1,row) != "" && this.dataCC.get(sender.cells(1,row)) == undefined){
					system.alert(this,"Data CC tidak ditemukan","");
					sender.cells(1, row, "") ;
					sender.onChange.set(this,"doChangeCell2");
					return;
				}					
				sender.cells(2, row, this.dataCC.get(sender.cells(1,row)) );
			break;
			case 3 :
				if (this.c_jenis.getText() == "OPEX"){
					sender.cells(4, row, "-");
				}else if (this.app._sapOnline){
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
					system.alert(this,"Data Akun tidak ditemukan","");
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
				//this.mDesk.toggleMode();			
				//if (this.mDesk.viewMode == 2){
				//	sender.setHint("Preview");
				//}else sender.setHint("Source Code (HTML)");
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
		if (sender == this.c_modul){
			if (sender.getText() == "RRR")
				this.sg.setTag(1);
			else 
				this.sg.setTag(9);
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
			if (sender == this.dbLib && (request == "akun" || request == "cc" || request == "drk" || request == this) ){
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
						}else if (request == "drk"){
							this.dataDrk = new arrayMap();
							var line;
							for (var i in result.rs.rows){
								line = result.rs.rows[i];
								this.dataDrk.set(line.kode_drk, line.nama);
							}
						}
					break;
	    			case "execArraySQL" :
						if (this.hideLoading) this.hideLoading();	    				
						setTipeButton(tbSimpan);
						if (result.toLowerCase().search("error") == -1)					
						{							
							if (this.saveFiles != ""){//baru
                                //system.info(this,"transaksi telah sukses tersimpan","(ID : "+ this.e_nb.getText()+")");
                                this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true, undefined, this);
                            }else if (this.saveFiles == ""){
                                system.info(this,"transaksi telah sukses tersimpan","(ID : "+ this.e_nb.getText()+")");						
								this.standarLib.clearByTag(this, ["0","1"],this.e_nb);		
								this.sgUpld.clear(1);
							}
						}else {
							system.alert(this,result,"");
							setTipeButton(tbSimpan);
						}
	    			break;
	      		break;
	    		}    		
			
			}
			if (sender == this.fileUtil && this == request){
				switch(methodName){
				case "copyFilesTo" : 
				
				   if ((typeof result == "boolean" && result == false) || result.indexOf("error") != -1){
					   system.alert(this,result,"Upload File gagal");
				   }else{ 
					  system.info(this,"transaksi telah sukses tersimpan","(ID : "+ this.e_nb.getText()+")");
					  this.standarLib.clearByTag(this, ["0","1"],this.e_nb);		
					  this.sgUpld.clear(1);
					  showProgress("delete temporary...");
					  if (this.saveFiles !="" ) this.fileUtil.deleteFiles(this.saveFiles, undefined, this);
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
            alert(e+" "+data);
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
						"	inner join rra_pra_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
						"		where a.kode_akun in ("+kodeAkun+")  and a.kode_cc in ("+kodeCc+") and a.periode like '"+this.e_periode.getText().substr(0,4)+"%'  and a.kode_lokasi= '"+this.app._lokasi+"' and lower(a.DC)= 'c' and b.flag_rfc='0' "+
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
				var dataGar = this.rfc.dataGar(this.login,  this.e_periode.getText().substr(0,4),dataAkun,"1000","1000","64","0");
				
				if (typeof dataGar == "string"){
					system.alert(this,dataGar,"");
					return false;
				}
				var res = dataGar.get("saldo");
				var line, tmp;					
				for (var i in res.objList){
					tmp = res.get(i);						
					dataRRR.set(i, (dataRRR.get(i) == undefined ? 0 : dataRRR.get(i)) );												
					for (var t in tmp.objList){
						var tmp2 = tmp.get(t);														
						line = { sawal : tmp2.get("TSL06") ,
										 pakai : tmp2.get("TSL04")+- dataRRR.get(i),
										 sisa : tmp2.get("TSL06")- dataRRR.get(i) - tmp2.get("TSL04")
								};					
						if (dataGrid.get(i) != undefined){			
							var gData = dataGrid.get(i);
							this.sg.editData(gData.index - 1, [line.sawal, line.pakai, line.sisa],[7,8,9]);
						}
					}
				}
			}
			this.e_donor.setText(floatToNilai(tot));
			sender.onChange.set(this,"doChangeCell");
		}catch(e){
			alert(e);
		}
	},
	doCellEnter: function(sender, col, row){
	
	},
	doViewBudget: function(sender){
		try{
			var row = this.sg.row;
			var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.kode_akun,a.kode_cc,substr(a.periode,5,2) as periode, sum(a.nilai) as pakai "+
					"	from rra_anggaran a "+
					"	inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
					"		where a.kode_akun in ('"+this.sg.cells(5,row)+"')  and a.kode_cc in ('"+this.sg.cells(1,row)+"') and a.periode like '"+this.e_periode.getText().substr(0,4)+"%'  and a.kode_lokasi= '"+this.app._lokasi+"' and lower(a.DC)= 'c' and b.flag_rfc='0' "+
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
				
			
			this.login = new server_util_Map({items:{user:this.e_uid.getText(), passwd: this.e_pwd.getText()}});
			var dataAkun = new server_util_arrayList();
			dataAkun.add(new server_util_Map({items:{agg:this.c_jenis.getText(),drk:this.sg.cells(3,row),jenis:'0',cc:this.sg.cells(1,row), akun:this.sg.cells(5,row), bln1:this.sg.cells(0,row),bln2:this.sg.cells(0,row)}}));					
			
			var dataGar = this.rfc.dataGar2(this.login,  this.e_periode.getText().substr(0,4),dataAkun);
			if (typeof dataGar == "string"){
				system.alert(this,dataGar,"");
				return false;
			}	
			this.data1Thn = dataGar.get("saldothn");					
			var line = "";
			this.gridView.clear();
			var tot = {plan:0, release:0, actual:0, avail: 0};
			for (var i in this.data1Thn.objList){										
				var row = this.data1Thn.get(i).get("restable");
				var gridValue = this.data1Thn.get(i).get("value");						
				var ccakun = i.split(":");				
				for (var l in row.objList){//rows = 16
					line = row.get(l);											
					for (var l2 in line.objList){//row																	
						//this.data1Thn.get(i).get(l).get(l2).set("TSL06", parseFloat(line.get(l2).get("TSL06")) - rrr);\
						var prd = (line.get(l2).get("PERIO") < 10 ? "0":"")+line.get(l2).get("PERIO");
						var plan = line.get(l2).get("TSL10").split(".");
						var real = line.get(l2).get("TSL06").split(".");
						var act = line.get(l2).get("TSL04").split(".");	
						real = parseFloat(real[0]);
						var idRRR = prd +":"+ccakun[0]+":"+ccakun[1];
						if (dataRRR.get(idRRR)){							
							real -=  dataRRR.get(idRRR) ;							
						}
						this.gridView.appendData([prd,floatToNilai(plan[0]),floatToNilai(real),floatToNilai(act[0]),floatToNilai(parseFloat(real) - parseFloat(act[0]))]);
						tot.plan += parseFloat(plan[0]);
						tot.release += real;
						tot.actual += parseFloat(act[0]);
						tot.avail += real - parseFloat(act[0]);
					}								
				}
			}
			this.gridView.appendData(["Total", floatToNilai(tot.plan), floatToNilai(tot.release), floatToNilai(tot.actual), floatToNilai(tot.avail)]);
			for (var i=0;i< this.gridView.getColCount();i++)
				this.gridView.setCellColor(i,this.gridView.getRowCount() - 1, "#f4c214");
			this.pView.show();
		}catch(e){
			error_log(e);
		}
		
	},
	doViewClick:function(sender){
		this.pView.hide();
	}
});
