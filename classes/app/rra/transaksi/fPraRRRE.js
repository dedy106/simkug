/*
 * TSL01 + TSL02 = Plan 
 * TSL03 + TSL04 = Actual FM (Payment + Commitment)
 * TSL05 + TSL06 = Release FM (Payment + Commitment)
 * TSL07 + TSL04 = Actual FM
 * TSL09 + TSL10 = Plan FM (Payment + Commitment)
 * */
window.app_rra_transaksi_fPraRRRE = function(owner, options)
{
	if (owner)
	{
		window.app_rra_transaksi_fPraRRRE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_transaksi_fPraRRRE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Draft PDRK Rescheduling, Redistribusi & Realokasi Anggaran: Koreksi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;tinymceCtrl;util_rfcLib;util_rfc;server_util_Map;uploader;util_file");		
		this.e_periode = new saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_uid = new saiLabelEdit(this,{bound:[720,11,200,20], caption:"SAP User", tag:11, visible:this.app._appState == "Q00"});
		this.e_nb = new saiCBBL(this,{bound:[20,12,222,20],caption:"No PDRK",maxLength:30,readOnly:true, multiSelection:false, change:[this,"doChange"]});		
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
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, bufferOption: boFULL, bufferData: this.app._listNIK, tag:2, readOnly:true, text:this.app._userLog, rightLabelCaption:this.app._namaUser});		
		this.cb_app1 = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"NIK Png Jawab", bufferOption: boFULL, bufferData: this.app._listNIK,  multiSelection:false, maxLength:10, tag:2});
		this.cb_app2 = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"NIK Mengetahui",bufferOption: boFULL, bufferData: this.app._listNIK,  multiSelection:false, maxLength:10, tag:2});
		this.cb_app3 = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"NIK Menetapkan", bufferOption: boFULL, bufferData: this.app._listNIK, multiSelection:false, maxLength:10, tag:2});
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
		
		this.maximize();
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.rfcLib = new util_rfcLib(this.app._rfcSetting);
			this.rfc = new util_rfc(undefined, this.app._rfcSetting);
			this.login = new server_util_Map({items:{user:this.app._defsapuid.uid, passwd:this.app._defsapuid.pid} });
			
			this.standarLib = new util_standar();					
			this.cb_ubis.setSQL("select kode_ubis, nama from rra_ubis where kode_lokasi='"+this.app._lokasi+"'",["kode_ubis","nama"],false,["Kode","Nama"],"and","Data Penanggungjawab Program",true);
			this.cb_gubis.setSQL("select kode_gubis, nama from rra_gubis where kode_lokasi='"+this.app._lokasi+"'",["kode_gubis","nama"],false,["Kode","Nama"],"and","Data Direktorat",true);			
			this.cb_app1.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan ",true);
			this.cb_app2.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_app3.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_buat.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_kota.setSQL("select kode_kota, nama from rra_kota ",["kode_kota","nama"],false,["Kode Kota","Nama Kota"],"and","Data Kota",true);
			this.e_nb.setSQL("select no_pdrk, keterangan from rra_pra_m where kode_lokasi = '"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"' and progress = '0'",["no_pdrk","keterangan"],false,["No Draft PDRK","Keterangan"],"and","Data Draft PRDK ("+this.app._nmUbis+")",true);
			
			this.cb_ubis.setText(this.app._kodeUbis);
			this.cb_gubis.setText(this.app._kodeGubis);
			this.cb_app1.setText(this.app._nikApp1);
			this.cb_app2.setText(this.app._nikApp2);
			this.cb_app3.setText(this.app._nikApp3);
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
			setTipeButton(tbUbahHapus);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_transaksi_fPraRRRE.extend(window.childForm);
window.app_rra_transaksi_fPraRRRE.implement({
	doClose: function(sender){
		if (this.dataUpload.temporary !="" ) this.fileUtil.deleteFiles(this.dataUpload.temporary);			
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
					sql.add("update rra_pra_m set keterangan= '"+this.e_ket.getText()+"',jenis_agg='"+this.c_jenis.getText()+"' "+
							" , tanggal='"+this.dp_d1.getDateString()+"',periode='"+this.e_periode.getText()+"' "+
							" , nik_buat='"+this.app._userLog+"',nik_app1='"+this.cb_app1.getText()+"' "+
							" , nik_app2='"+this.cb_app2.getText()+"',nik_app3='"+this.cb_app3.getText()+"' "+
							" , sts_pdrk='"+this.c_modul.getText()+"' "+
							" , nik_user='"+this.app._userLog+"', tgl_input=now(),kode_kota='"+this.cb_kota.getText()+"' "+
							" , no_nd='"+this.ed_dok.getText()+"', file_nd='"+this.e_file.getText()+"'  "+
							
						    " where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add(new server_util_Map({items:{tipe:"clob",table:"rra_pra_m",field:"justifikasi",value:urlencode(this.mDesk.getCode()), filter:" no_pdrk = '"+this.e_nb.getText()+"' "}})); 						
					sql.add("delete from rra_anggaran where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi = '"+ this.app._lokasi + "'");		
					sql.add("delete from rra_pra_d where no_pdrk ='"+this.e_nb.getText()+"' and kode_lokasi = '"+ this.app._lokasi + "'");		
					sql.add("delete from rra_pra_dok where no_pdrk ='"+this.e_nb.getText()+"' and kode_lokasi = '"+ this.app._lokasi + "'");		
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
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(5,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"',0,0,0,"+parseNilai(this.sg2.cells(7,i))+",'D','"+this.sg2.cells(8,i)+"','"+this.sg.cells(9,i).substr(0,1)+"')");
								sql.add("insert into rra_anggaran(no_bukti,modul,kode_cc,kode_akun,kode_drk,kode_lokasi,periode,dc,nilai,nik_user,tgl_input,nilai_gar, nilai_pakai, saldo,target,jenis) values "+
										"	('"+this.e_nb.getText()+"','"+this.c_modul.getText()+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(5,i)+"','"+this.sg2.cells(3,i)+"','"+this.app._lokasi+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"','D',"+parseNilai(this.sg2.cells(7,i))+",'"+this.app._userLog+"',now(),0,0,0,'"+this.sg2.cells(8,i)+"','"+this.sg.cells(9,i).substr(0,1)+"')");
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
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					setTipeButton(tbUbahHapus);
					system.alert(this, e,"");
				}
			}
		}catch(e){
			setTipeButton(tbSimpan);
			systemAPI.alert(e);
		}
	},
	hapus: function(){
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
		sql.add("delete from rra_pra_m where no_pdrk ='"+this.e_nb.getText()+"' and kode_lokasi = '"+ this.app._lokasi + "'");		
		sql.add("delete from rra_anggaran where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi = '"+ this.app._lokasi + "'");		
		sql.add("delete from rra_pra_d where no_pdrk ='"+this.e_nb.getText()+"' and kode_lokasi = '"+ this.app._lokasi + "'");		
		sql.add("delete from rra_pra_dok where no_pdrk ='"+this.e_nb.getText()+"' and kode_lokasi = '"+ this.app._lokasi + "'");		
		this.dbLib.execArraySQL(sql);
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		this.event = event;
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
			case "ubah" :	
				setTipeButton(tbAllFalse);	
				this.sg.validasi();
				this.sg2.validasi();
				if (nilaiToFloat(this.e_donor.getText()) != nilaiToFloat(this.e_terima.getText()) )  {
					system.alert(this,"Transaksi tidak valid.","Nilai Donor dan Terima harus sama.");
					return false;						
				}				
				//select akum dari rra_flagrelasi dan rra_filterakun
				// jika ada di kondisi tersebut maka batal / tidak boleh
				var akunDonor = [];
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){						
						var prd = this.e_periode.getText().substr(0,4)+this.sg.cells(0,i) ;
						if (prd > this.app._periodeGAR){
							var k = i+1;
							system.alert(this,"Transaksi Donor tidak valid.","Periode lebih besar dari Current Periode [Baris: "+k+"]");
							setTipeButton(tbUbahHapus);	
							return ; 
						}
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && this.sg.cells(1,j) == this.sg.cells(1,i) && this.sg.cells(5,j) == this.sg.cells(5,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi Donor tidak valid.","Duplikasi Data Anggaran.[Baris : "+k+"]");
								setTipeButton(tbUbahHapus);	
								return false;
							}
						}
						if (akunDonor.indexOf("'"+this.sg.cells(5,i)+"'") == -1) akunDonor.push("'"+this.sg.cells(5,i)+"'");
					}
				}
				var akunTerima = [];
				for (var i=0;i < this.sg2.getRowCount();i++){				
					var prd = this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i) ;
					if (prd > this.app._periodeGAR){
						var k = i+1;
						system.alert(this,"Transaksi Terima tidak valid.","Periode lebih besar dari Current Periode [Baris: "+k+"]");
						return ; 
					}
					for (var j=0;j < this.sg2.getRowCount();j++){
						if (this.sg2.cells(0,j) == this.sg2.cells(0,i) && this.sg2.cells(1,j) == this.sg2.cells(1,i) && this.sg2.cells(5,j) == this.sg2.cells(5,i) && (i != j)) {
							var k = i+1;
							system.alert(this,"Transaksi Terima tidak valid.","Duplikasi Data Anggaran.[Baris : "+k+"]");
							setTipeButton(tbUbahHapus);	
							return false;
						}
					}					
					if (akunTerima.indexOf("'"+this.sg2.cells(5,i)+"'") == -1) akunTerima.push("'"+this.sg2.cells(5,i)+"'");
				}	
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
				
				break;				
			case "simpancek" : this.simpan();			
				break;
			//case "ubah" :	
			//	this.simpan();
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
		this.dbLib.getDataProviderA("select kode_drk, nama from rra_drk where kode_lokasi = '"+this.app._lokasi+"' and tahun = '"+y+"'", undefied, "drk");
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_pra_m","no_pdrk","DT-"+this.app._kodeUbis+"-"+this.e_periode.getText().substr(2,4)+".","0000"));
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
	doChangeCell: function(sender, col, row) {
		try{
			sender.onChange.set(this,undefined);
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
								system.alert(this, "Data akun tidak ditemukan. "+ fund +":"+fundCtr,"");
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
							var tmp = new arrayMap();
							var saldo = 0;
							for (var i in restable.objList){
								var line = restable.get(i).get("0");
								var lastLine = restable.get(15).get("0");
								if (parseFloat(line.get("PERIO")) == parseFloat(this.sg.cells(0,row))){
									tmp = line;								
									if (parseFloat(lastLine.get("TSL04")) != 0)
										tmp.set("TSL04", parseFloat(line.get("TSL04")) - saldo);
								}
								saldo = parseFloat(line.get("TSL04"));
							}
							//tmp = restable.get("0");
							if (tmp != undefined){
								//tmp = restable.get("0").get("0");
								var field = ["TSL06","TSL04"];							
								if (sender.cells(11,row).toUpperCase() == "PAYMENT"){
									field = ["TSL05","TSL03"];							
								}							
								rfcRet = {	sawal : parseFloat(tmp.get(field[0])),
											pakai : parseFloat(tmp.get(field[1])),
											sisa : parseFloat(tmp.get(field[0])) - parseFloat(tmp.get(field[1]))
								};
								if (sender.cells(11,row).toUpperCase() == "KEDUANYA"){
									//cari saldo yang minimum
									var min = Math.min(parseFloat(tmp.get("TSL05")) - parseFloat(tmp.get("TSL03")), parseFloat(tmp.get("TSL06")) - parseFloat(tmp.get("TSL04")));
									if (min == parseFloat(tmp.get("TSL05")) - parseFloat(tmp.get("TSL03"))) //payment
									{
										field = ["TSL05","TSL03"];
									}
									rfcRet = {	sawal : parseFloat(tmp.get(field[0])),
											pakai : parseFloat(tmp.get(field[1])),
											sisa : parseFloat(tmp.get(field[0])) - parseFloat(tmp.get(field[1]))
									};
									
								}
							}
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
							//PLAN_PAY, //RELEASE_PAY//ACTUAL_PAY//PLAN_COMT//RELEASE_COMT//ACTUAL_COMT
							var tmp = restable;
							var rfcRet = {sawal :0, pakai : 0, sisa : 0, sawalBln:0, pakaiBln:0, sisaBln:0,
								sawalPayment: 0, pakaiPayment:0, sisaPayment : 0,
								sawalCommit: 0, pakaiCommit:0, sisaCommit : 0
							};
							for (var i in restable.objList){																		
								var item = restable.get(i).get("0");														
								if (sender.cells(11,row).toUpperCase() == "PAYMENT" && item.get("VERSN") == "000" && parseFloat(this.sg.cells(0,row)) == parseFloat(item.get("PERIO")) ){
									rfcRet.sawalBln = parseFloat(item.get("PLAN_CO"));
									rfcRet.pakaiBln = nilaiToFloat(item.get("ACTUAL"));
									rfcRet.sisaBln = parseFloat(item.get("PLAN_CO")) - nilaiToFloat(item.get("ACTUAL"));								
								}else if (sender.cells(11,row).toUpperCase() != "PAYMENT" && item.get("VERSN") == "007" && parseFloat(this.sg.cells(0,row)) == parseFloat(item.get("PERIO")) ){
									rfcRet.sawalBln = parseFloat(item.get("PLAN_CO"));
									rfcRet.pakaiBln = nilaiToFloat(item.get("ACTUAL"));
									rfcRet.sisaBln = parseFloat(item.get("PLAN_CO")) - nilaiToFloat(item.get("ACTUAL"));								
								}	
								if (trim(item.get("VERSN")) == "000"){
									rfcRet.sawalPayment += parseFloat(item.get("PLAN_CO"));
									rfcRet.pakaiPayment += nilaiToFloat(item.get("ACTUAL"));
									rfcRet.sisaPayment += parseFloat(item.get("PLAN_CO")) - nilaiToFloat(item.get("ACTUAL"));								
								}else if (trim(item.get("VERSN")) == "007"){
									rfcRet.sawalCommit += parseFloat(item.get("PLAN_CO"));
									rfcRet.pakaiCommit += nilaiToFloat(item.get("ACTUAL"));
									rfcRet.sisaCommit += parseFloat(item.get("PLAN_CO")) - nilaiToFloat(item.get("ACTUAL"));								
								}							
								if (sender.cells(11, row).toUpperCase() == "KEDUANYA" || sender.cells(11, row).toUpperCase() == ""){
									rfcRet.sisa = Math.min(rfcRet.sisaPayment, rfcRet.sisaCommit) ;
									rfcRet.sawal = rfcRet.sisa == rfcRet.sisaPayment ? rfcRet.sawalPayment : rfcRet.sawalCommit ;
									rfcRet.pakai = rfcRet.sisa == rfcRet.sisaPayment ? rfcRet.pakaiPayment : rfcRet.pakaiCommit ;
									
								}else {
									if (sender.cells(11,row).toUpperCase() == "PAYMENT"){
										rfcRet.sawal = rfcRet.sawalPayment;
										rfcRet.pakai = rfcRet.pakaiPayment;
										rfcRet.sisa = rfcRet.sisaPayment;
									}else{
										rfcRet.sawal = rfcRet.sawalCommit;
										rfcRet.pakai = rfcRet.pakaiCommit;
										rfcRet.sisa = rfcRet.sisaCommit;
									}
								}
							}						
						}
					}
					if (line) var i = line.periode+":"+line.kode_cc+":"+line.kode_akun;
					dataRRR.set(i, (dataRRR.get(i) == undefined ? 0 : dataRRR.get(i)) );
					rfcRet.pakai = rfcRet.pakai +  dataRRR.get(i);
					rfcRet.sisa = rfcRet.sisa -  dataRRR.get(i);					
					if (rfcRet != undefined){
						this.sg.setCell(7,row,floatToNilai(rfcRet.sawal));
						this.sg.setCell(8,row,floatToNilai(rfcRet.pakai));
						this.sg.setCell(9,row,floatToNilai(rfcRet.sisa));
					} else {
						this.sg.setCell(7,row,"0");
						this.sg.setCell(8,row,"0");
						this.sg.setCell(9,row,"0");
					}					
				}
			}
			switch (col){
				case 1 :
					if(sender.cells(1,row) != "" && this.dataCC.get(sender.cells(1,row)) == undefined){
						system.alert(this,"Data CC tidak ditemukan","");
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
						system.alert(this,"Data Akun tidak ditemukan","");
						sender.cells(5, row, "") ;
						sender.cells(6, row, "") ;
						sender.onChange.set(this,"doChangeCell");
						return;
					}
					sender.cells(6, row, this.dataAkun.get(sender.cells(5, row)) );
				break;

			}
			if (col == 10) this.sg.validasi();
			sender.onChange.set(this,"doChangeCell");
		}catch(e){
			sender.onChange.set(this,"doChangeCell");			
			alert(e);
		}
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
		if (sender == this.e_nb){
			try{
				//load draft
				
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
						   "select date_format(a.tanggal,'%d-%m-%Y') as tanggal, a.keterangan, a.jenis_agg,a.kode_ubis,a.kode_gubis,a.nik_app1,a.nik_app2,a.nik_app3,b.nama as nama_ubis,c.nama as nama_gubis,d.nama as nama_app1,e.nama as nama_app2,f.nama as nama_app3,a.justifikasi,a.sts_pdrk, a.kode_kota, a.file_nd, a.no_nd, a.nik_appjust   "+
						   "from rra_pra_m a inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi "+
						   "                  inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi "+
						   "                  left outer join rra_karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi "+
						   "                  left outer join rra_karyawan e on a.nik_app2=e.nik and a.kode_lokasi=e.kode_lokasi "+
						   "                  left outer join rra_karyawan f on a.nik_app3=f.nik and a.kode_lokasi=f.kode_lokasi "+
						   "where a.no_pdrk='"+sender.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
						   "select file_dok, nama from rra_pra_dok where no_pdrk = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by no_urut",
						   "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai_gar,a.nilai_pakai,a.saldo,a.nilai,a.dc,a.target,a.jenis "+
							 "from rra_pra_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
							 "					inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "					left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
							 "where a.no_pdrk = '"+sender.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc"
						   ]}),false);
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.result[0].rs.rows[0];
					if (line != undefined){					
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);					
						this.c_jenis.setText(line.jenis_agg);
						this.cb_ubis.setText(line.kode_ubis,line.nama_ubis);
						this.cb_gubis.setText(line.kode_gubis,line.nama_gubis);
						this.cb_app1.setText(line.nik_app1,line.nama_app1);
						this.cb_app2.setText(line.nik_app2,line.nama_app2);
						this.cb_app3.setText(line.nik_app3,line.nama_app3);						
						this.cb_appRev.setText(line.nik_appjust);												

						this.cb_kota.setText(line.kode_kota);
						this.e_file.setText(line.file_nd);
						this.ed_dok.setText(line.no_nd);
						this.mDesk.setCode(urldecode(line.justifikasi));
						setTipeButton(tbUbahHapus);	
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
			}catch(e){
				error_log(e);
			}
		}
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
						if (result.toLowerCase().search("error") == -1)					
						{							
							if (this.saveFiles != ""){//baru
                                //system.info(this,"transaksi telah sukses tersimpan","(ID : "+ this.e_nb.getText()+")");
                                if (this.dest !="" ) this.fileUtil.deleteFiles(this.dest);
                            }else if (this.saveFiles == ""){
                                system.info(this,"transaksi telah sukses tersimpan","(ID : "+ this.e_nb.getText()+")");						
								this.standarLib.clearByTag(this, ["0","1"],this.e_nb);		
								this.sgUpld.clear(1);
							}
						}else {
							system.alert(this,result,"");
							setTipeButton(tbUbahHapus);								
						}
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
			setTipeButton(tbUbahHapus);	
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
	
	}
});
