window.app_rra_transaksi_fAbt = function(owner)
{
	if (owner)
	{
		window.app_rra_transaksi_fAbt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_transaksi_fAbt";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form PDRK ABT Anggaran: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;tinymceCtrl;util_file;util_rfcLib;util_rfc;uploader");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true, change:[this,"doChange"]});
		this.cbDraft = new saiCBBL(this,{bound:[720,10,220,20], caption:"Draft Pengajuan", multiSelection:false, change:[this,"doChange"], tag:9,
			sql : ["select no_pdrk, keterangan from rra_pra_m where kode_lokasi= '"+this.app._lokasi+"' and progress='1' ",["no_pdrk","keterangan"],false,["No PDRK","Keterangan"],"","Daftar Draft PDRK",true]
		});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,222,20],caption:"No PDRK",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[245,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Nama Kegiatan", maxLength:150});		
		this.c_jenis = new saiCB(this,{bound:[20,14,202,20],caption:"Jenis Anggaran",items:["OPEX","CAPEX"], readOnly:true, tag:2});
		this.e_terima = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Nilai ABT", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.pc1 = new pageControl(this,{bound:[20,16,900, 330], childPage:["Data PDRK","Data ABT","Data Justifikasi","Dokumen Pendukung","Nota Kajian(CAPEX)"]});
		
		this.ed_dok = new saiLabelEdit(this.pc1.childPage[0], {bound:[20,1,400,20], caption:"No. Nota Dinas"});
		this.e_file = new saiLabelEdit(this.pc1.childPage[0], {bound:[20,2,400,20], caption:"File Nota Dinas"});
		this.upld = new uploader(this.pc1.childPage[0], {bound:[430,2,80,20],caption:"Browse",autoSubmit:true, param1:"uploadTo",param2:"server/media/tmp/", param3:"object", param4:"server/media/", afterUpload:[this,"doAfterLoad"], change:[this,"doFileChange"]});
		
		this.cb_ubis = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Png Jawab", multiSelection:false, maxLength:10, bufferOption: boHALF,tag:2, change:[this,"doChange"]});
		this.cb_gubis = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Direktorat", multiSelection:false, maxLength:10, bufferOption: boHALF, tag:2});		
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"NIK Review", multiSelection:false, maxLength:10, bufferOption: boFULL, bufferData: this.app._listNIK, tag:2, readOnly:true, text:this.app._userLog, rightLabelCaption:this.app._namaUser});			
		
		this.cb_app1 = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"NIK Png Jawab", bufferOption: boFULL, bufferData: this.app._listNIK,  multiSelection:false, maxLength:10, tag:2});
		this.cb_app2 = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"NIK Mengetahui",bufferOption: boFULL, bufferData: this.app._listNIK,  multiSelection:false, maxLength:10, tag:2});
		this.cb_app3 = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"NIK Menetapkan", bufferOption: boFULL, bufferData: this.app._listNIK, multiSelection:false, maxLength:10, tag:2});
		this.cb_kota = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Kota", multiSelection:false, bufferOption: boHALF,  maxLength:10, tag:2});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
					colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai ABT","Target"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,130,150,70,60,60,150,70,50]],
					columnReadOnly:[true,[2,4,6],[7,8]],
					buttonStyle:[[0,1,3,5],[bsAuto,bsEllips,bsEllips,bsEllips]], 
					colFormat:[[7],[cfNilai]],
					picklist:[[0],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});
		
		this.mDesk = new tinymceCtrl(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-25], withForm:false});
		this.mDesk2 = new tinymceCtrl(this.pc1.childPage[4],{bound:[1,10,this.pc1.width-5,this.pc1.height-25], withForm:false});
		//this.mDesk.display();
		//this.mDesk.enable();		
		this.bView = new button(this.pc1.childPage[2], {bound:[this.pc1.width - 200, 10, 80, 20], caption:"View HTML", click:"doCodeClick", visible:false});
		this.bLoad = new button(this.pc1.childPage[2], {bound:[this.pc1.width - 100, 10, 80, 20], caption:"Load Template", click:"doCodeClick"});
		this.cb_templ = new saiCBBL(this.pc1.childPage[2],{bound:[this.pc1.width - 200,17,200,20],caption:"Template", visible:false, multiSelection:false, maxLength:10, tag:100, change:[this,"doChange"]});
		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,0,this.pc1.width-5,this.pc1.height - 35],colCount:3,colTitle:["Dokumen","Upload","Deskripsi"],colFormat:[[1],[cfUpload]],
					colWidth:[[2,1,0],[250,80,230]], colReadOnly:[true,[0,1],[]], change:[this,"doGridChange"], tag:3, rowCount:1});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn3 = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.sgUpld.height,this.pc1.width-3,25],buttonStyle:1, grid:this.sgUpld});
		
		this.rearrangeChild(10, 22);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);
		this.pc1.childPage[2].rearrangeChild(10, 22);
		this.pc1.childPage[3].rearrangeChild(0, 22);
		
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
			this.standarLib = new util_standar();		
			
			this.cb_ubis.setSQL("select kode_ubis, nama from rra_ubis where kode_lokasi='"+this.app._lokasi+"'",["kode_ubis","nama"],false,["Kode","Nama"],"and","Data Penanggungjawab Program",true);
			this.cb_gubis.setSQL("select kode_gubis, nama from rra_gubis where kode_lokasi='"+this.app._lokasi+"'",["kode_gubis","nama"],false,["Kode","Nama"],"and","Data Direktorat",true);			
			this.cb_app1.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan ",true);
			this.cb_app2.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_app3.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_buat.setSQL("select nik, nama, jabatan from rra_karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_ubis = '"+this.app._kodeUbis+"'",["nik","nama","jabatan"],false,["NIK","Nama","Jabatan"],"and","Data Karyawan",true);
			this.cb_kota.setSQL("select kode_kota, nama from rra_kota ",["kode_kota","nama"],false,["Kode Kota","Nama Kota"],"and","Data Kota",true);
			
			this.cb_ubis.setText(this.app._kodeUbis);
			this.cb_gubis.setText(this.app._kodeGubis);
			this.cb_app1.setText(this.app._nikApp1);
			this.cb_app2.setText(this.app._nikApp2);
			this.cb_app3.setText(this.app._nikApp3);
			this.cb_kota.setText(this.app._kota);
			this.cb_buat.setText(this.app._userLog, this.app._namaUser);
			
			this.rootDir = this.app._rootDir;
			this.doClick();
			this.onClose.set(this,"doClose");			
			this.dbLib.getDataProviderA("select kode_akun, nama from rra_masakun where kode_lokasi = '"+this.app._lokasi+"' ", undefined, "akun");		
			this.app._mainForm.bDraft.show();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_transaksi_fAbt.extend(window.childForm);
window.app_rra_transaksi_fAbt.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_pdrk_m","no_pdrk","PDRK-"+this.app._kodeUbis+"-"+this.e_periode.getText().substr(2,4)+".","0000"));
					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					this.saveFiles = "", this.dest = "", first = true;
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
					
					sql.add("insert into rra_pdrk_m(no_pdrk,kode_lokasi,keterangan,kode_ubis,kode_gubis,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi, nik_user, tgl_input,progress, kode_kota, no_nd, file_nd, sub_jenis) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"','"+this.cb_ubis.getText()+"','"+this.cb_gubis.getText()+"','"+this.c_jenis.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"','"+this.cb_app1.getText()+"','"+this.cb_app2.getText()+"','"+this.cb_app3.getText()+"','ABT',null,'"+this.app._userLog+"',now(),'0','"+this.cb_kota.getText()+"','"+this.ed_dok.getText()+"','"+this.e_file.getText()+"','ABT')");
					sql.add(new server_util_Map({items:{tipe:"clob",table:"rra_pdrk_m",field:"justifikasi", filter :" no_pdrk = '"+this.e_nb.getText()+"' ",value:urlencode(this.mDesk.getCode())}})); 						
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_cc,kode_drk,periode,nilai_gar,nilai_pakai,saldo,nilai,dc,target) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(5,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"',0,0,0,"+parseNilai(this.sg2.cells(7,i))+",'D','"+this.sg2.cells(8,i)+"')");								
								sql.add("insert into rra_anggaran(no_bukti,modul,kode_cc,kode_akun,kode_drk,kode_lokasi,periode,dc,nilai,nik_user,tgl_input) values "+
									"	('"+this.e_nb.getText()+"','ABT','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(5,i)+"','"+this.sg2.cells(3,i)+"','"+this.app._lokasi+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"','D',"+parseNilai(this.sg2.cells(7,i))+",'"+this.app._userLog+"',now())");
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
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql, undefined, this);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	simpandraft: function(){			
		try{						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_pra_m","no_pdrk","DRAFT-"+this.app._kodeUbis+"-"+this.e_periode.getText().substr(2,4)+".","0000"));
			//if (this.standarLib.checkEmptyByTag(this, [0,1,2]))
			{
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
					sql.add("insert into rra_pra_m(no_pdrk,kode_lokasi,keterangan,kode_ubis,kode_gubis,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi, nik_user, tgl_input,progress, kode_kota, no_nd, file_nd, flag_rfc, nik_appjust, nik_appjust2, nik_apppdrk3, nik_apppdrk32, sts_appjust, sts_appjust2, sts_apppdrk3, sts_apppdrk32, sub_jenis, nik_review) values "+//
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"','"+this.cb_ubis.getText()+"','"+this.cb_gubis.getText()+"','"+this.c_jenis.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app1.getText()+"','"+this.cb_app2.getText()+"','"+this.cb_app3.getText()+"','"+this.sts_pdrk+"',null, "+
								"'"+this.app._userLog+"',now(),'1','"+this.cb_kota.getText()+"','"+this.ed_dok.getText()+"','"+this.e_file.getText()+"','0','"+this.cb_appj1.getText()+"','"+this.cb_appj2.getText()+"','"+this.cb_appp3.getText()+"','"+this.cb_appp32.getText()+"','0','0','0','0','"+this.sub_jenis+"','"+this.cb_reviewer.getText()+"')");					
					sql.add(new server_util_Map({items:{tipe:"clob",table:"rra_pra_m",field:"justifikasi",value:urlencode(this.mDesk.getCode()), filter:" no_pdrk = '"+this.e_nb.getText()+"' "}})); 	
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into rra_pra_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_cc,kode_drk,periode,nilai_gar,nilai_pakai,saldo,nilai,dc,target,jenis,nilai_keep) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(9,i))+","+parseNilai(this.sg.cells(10,i))+",'C','-','"+this.sg.cells(11,i).substr(0,1)+"',"+parseNilai(this.sg.cells(12,i))+")");								
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into rra_pra_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_cc,kode_drk,periode,nilai_gar,nilai_pakai,saldo,nilai,dc,target,jenis, nilai_keep) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(5,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"',0,0,0,"+parseNilai(this.sg2.cells(7,i))+",'D','"+this.sg2.cells(8,i)+"','"+this.sg2.cells(9,i).substr(0,1)+"',0)");								
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
					this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.cb_ubis.setText(this.app._kodeUbis);
					this.cb_gubis.setText(this.app._kodeGubis);
					this.cb_app1.setText(this.app._nikApp1);
					this.cb_app2.setText(this.app._nikApp2);
					this.cb_app3.setText(this.app._nikApp3);
					this.cb_kota.setText(this.app._kota);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.sg2.validasi();
				if (nilaiToFloat(this.e_terima.getText())<=0)  {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;						
				}
				for (var j=i;j < this.sg2.getRowCount();j++){
					var prd = this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i) ;
					if (prd > this.app._periodeGAR){
						var k = i+1;
						system.alert(this,"Transaksi Terima tidak valid.","Periode lebih besar dari Current Periode [Baris: "+k+"]");
						return ; 
					}
					if (this.sg2.cells(0,j) == this.sg2.cells(0,i) && this.sg2.cells(1,j) == this.sg2.cells(1,i) && this.sg2.cells(5,j) == this.sg2.cells(5,i) && (i != j)) {
						var k = i+1;
						system.alert(this,"Transaksi Terima tidak valid.","Duplikasi Data Anggaran.[Baris : "+k+"]");
						return false;
					}
				}								
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
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);				
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_pdrk_m","no_pdrk","PDRK-"+this.app._kodeUbis+"-"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);
	},
	doChangeCell2: function(sender, col, row) {
		sender.onChange.set(this,undefined);
		if (col == 0){
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
				sender.cells(4, row, "-");
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
	doChange: function(sender){
		if (sender == this.cb_ubis){
			this.dbLib.getDataProviderA("select kode_cc, nama from rra_cc where kode_lokasi = '"+this.app._lokasi+"' and kode_ubis = '"+sender.getText()+"' ", undefined, "cc");
		}
		if (sender == this.e_periode){
			this.doClick();
		}
		if (sender == this.cb_templ){
			var data = this.dbLib.getDataProvider("select keterangan from rra_draft where kode_draft = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ",true);
			if (typeof data != "string" && data.rs.rows[0] != undefined){				
				this.mDesk.setCode(urldecode(data.rs.rows[0].keterangan));
			}
		}
	},
	doNilaiChange2: function(){
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
				this.mDesk.toggleMode();			
				if (this.mDesk.viewMode == 2){
					sender.setHint("Preview");
				}else sender.setHint("Source Code (HTML)");
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
		if (sender == this.dbLib  && (request == "akun" || request == "cc" || request == "drk" || request == this) ){
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
                                system.info(this,"transaksi telah sukses tersimpan","(ID : "+ this.e_nb.getText()+")");
                                this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true, undefined, this);
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
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	    if (sender == this.fileUtil && this == request){
			switch(methodName){
		    case "copyFilesTo" : 
			   if ((typeof result == "boolean" && result == false) || result.indexOf("error") != -1){
				   system.alert(this,result,"Upload File gagal");
			   }else{ 
				  system.info(this,"transaksi telah sukses tersimpan (ID : "+ this.e_nb.getText()+")","");
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
    }
});
