window.app_rra_transaksi_fAbtK = function(owner)
{
	if (owner)
	{
		window.app_rra_transaksi_fAbtK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_transaksi_fAbtK";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form ABT (Anggaran Bukan Kewenangan): Koreksi", 0);	
		this.maximize();
		try {
			uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;tinymceCtrl;util_rfc;server_util_Map;util_file;uploader");		
			this.e_nb = new saiCBBL(this,{bound:[20,13,242,20],caption:"No PDRK", multiSelection:false, tag:1, change:[this,"doChange"]});		
			this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true});
			this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
			this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 				
			this.e_uid = new saiLabelEdit(this,{bound:[720,11,200,20], caption:"SAP User", tag:11, visible:this.app._appState == "Q00"});		
			this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Nama Kegiatan", maxLength:150});				
			this.e_pwd = new saiLabelEdit(this,{bound:[720,14,200,20], caption:"SAP Password", password:true, tag:11, visible:this.app._appState == "Q00"});
			this.e_modul = new saiLabelEdit(this,{bound:[20,15,202,20],caption:"Modul", readOnly:true});					
			this.c_jenis = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"Jenis", readOnly:true});		
			this.e_terima = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Nilai Penerima", readOnly:true, tipeText:ttNilai, text:"0"});		
			this.pc1 = new pageControl(this,{bound:[20,16,900, 330], childPage:["Data PDRK","Data Penerima","Data Justifikasi","Dokumen Pendukung","View Dokumen"], pageChange:[this,"doPageChange"]});
			
			this.ed_dok = new saiLabelEdit(this.pc1.childPage[0], {bound:[20,1,400,20], caption:"No. Nota Dinas"});
			this.e_file = new saiLabelEdit(this.pc1.childPage[0], {bound:[20,2,400,20], caption:"File Nota Dinas"});
			this.upld = new uploader(this.pc1.childPage[0], {bound:[430,2,80,20],caption:"Browse",autoSubmit:true, param1:"uploadTo",param2:"server/media/tmp/", param3:"object", param4:"server/media/", afterUpload:[this,"doAfterLoad"], change:[this,"doFileChange"]});
			this.bOpen = new button(this.pc1.childPage[0], {bound:[540,2,80,20], caption:"Open", click:[this,"doOpenFile"]});
			
			this.cb_ubis = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Png Jawab", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
			this.cb_gubis = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Direktorat", multiSelection:false, maxLength:10, tag:1});
			this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2, readOnly:true, text:this.app._userLog, rightLabelCaption:this.app._namaUser});
			this.cb_app1 = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"NIK Png Jawab", multiSelection:false, maxLength:10, tag:1});
			this.cb_app2 = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:1});
			this.cb_app3 = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"NIK Menetapkan", multiSelection:false, maxLength:10, tag:1});
			this.cb_kota = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Kota", multiSelection:false, maxLength:10, tag:2});				
			this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
						colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai ABT","Target Selesai"],
						colWidth:[[8,7,6,5,4,3,2,1,0],[100,130,150,70,60,60,150,70,50]],
						columnReadOnly:[true,[0,2,4,6],[7,8]],
						buttonStyle:[[0,1,3,5],[bsAuto,bsEllips,bsEllips,bsEllips]], 
						colFormat:[[7],[cfNilai]],
						picklist:[[0],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
						defaultRow:1,autoPaging:true, rowPerPage:20,pasteEnable:true,
						ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
			this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});
					
			this.mDesk = new tinymceCtrl(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-25,this.pc1.height-125], withForm:false});
			this.editorReadOnly = true;
			//this.mDesk.display();
			//this.mDesk.disable();
			this.bView = new button(this.pc1.childPage[2], {bound:[this.pc1.width - 100, 10, 80, 20], caption:"Edit", click:"doCodeClick"});
			this.bLoad = new button(this.pc1.childPage[2], {bound:[this.pc1.width - 200, 10, 80, 20], caption:"Load Templat", click:"doCodeClick"});
			this.cb_templ = new saiCBBL(this.pc1.childPage[2],{bound:[this.pc1.width - 200,17,200,20],caption:"Template", visible:false, multiSelection:false, maxLength:10, tag:100, change:[this,"doChange"]});
			this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,0,this.pc1.width-3,this.pc1.height - 28],colCount:3,colTitle:["Dokumen","Upload","Deskripsi"],colFormat:[[1],[cfUpload]],
						colWidth:[[2,1,0],[250,80,230]], colReadOnly:[true,[0,1],[]], change:[this,"doGridChange"], tag:3});
			this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
			this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.sgUpld.height + 3,this.pc1.width-3,25],buttonStyle:1, grid:this.sgUpld});
			
			this.rearrangeChild(10, 22);
			this.pc1.childPage[0].rearrangeChild(10, 22);
			this.pc1.childPage[1].rearrangeChild(10, 22);
			this.pc1.childPage[2].rearrangeChild(10, 22);
			this.pc1.childPage[3].rearrangeChild(10, 22);
			setTipeButton(tbAllFalse);
			
			this.setTabChildIndex();
		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.rfc = new util_rfc();											
			this.login = new server_util_Map();							
						
						
			this.standarLib = new util_standar();		
			
			this.e_nb.setSQL("select no_pdrk,keterangan from rra_pdrk_m where progress='0' and kode_lokasi='"+this.app._lokasi+"'",["no_pdrk","keterangan"],false,["No PDRK","Keterangan"],"and","Data PDRK",true);
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
			this.e_uid.setText(this.app._defsapuid.uid);
			this.e_pwd.setText(this.app._defsapuid.pwd);
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.onClose.set(this,"doClose");
			this.dbLib.getDataProviderA("select kode_akun, nama from rra_masakun where kode_lokasi = '"+this.app._lokasi+"' ", undefined, "akun");					
			setTipeButton(tbAllFalse);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_transaksi_fAbtK.extend(window.childForm);
window.app_rra_transaksi_fAbtK.implement({
	doClose: function(sender){
		if (this.dataUpload !="" ) this.fileUtil.deleteFiles(this.dataUpload.temporary);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
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
					sql.add("insert into rra_pdrk_log select * from rra_pdrk_m where no_pdrk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					
					sql.add("insert into rra_pdrk_logd select *  from rra_pdrk_d where no_pdrk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					sql.add("update rra_pdrk_m set keterangan='"+this.e_ket.getText()+"',kode_ubis='"+this.cb_ubis.getText()+"', "+
						" kode_gubis ='"+this.cb_gubis.getText()+"',jenis_agg='"+this.c_jenis.getText()+"',tanggal='"+this.dp_d1.getDateString()+"' "+
						" ,periode='"+this.e_periode.getText()+"',nik_buat='"+this.app._userLog+"',nik_app1='"+this.cb_app1.getText()+"' "+
						",nik_app2='"+this.cb_app2.getText()+"',nik_app3='"+this.cb_app3.getText()+"',justifikasi='"+urldecode(this.mDesk.getCode())+"', tgl_update=now(),kode_kota='"+this.cb_kota.getText()+"', no_nd='"+this.ed_dok.getText()+"', file_nd ='"+this.e_file.getText()+"' where no_pdrk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from rra_anggaran where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");					
					sql.add("delete from rra_pdrk_d where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");										
					sql.add("delete from rra_pdrk_dok where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");										
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_cc,kode_drk,periode,nilai_gar,nilai_pakai,saldo,nilai,dc,target) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(5,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"',0,0,0,"+parseNilai(this.sg2.cells(7,i))+",'D','"+this.sg2.cells(8,i)+"')");								
								sql.add("insert into rra_anggaran(no_bukti,modul,kode_cc,kode_akun,kode_drk,kode_lokasi,periode,dc,nilai,nik_user,tgl_input,nilai_gar,nilai_pakai, saldo,target) values "+
										"	('"+this.e_nb.getText()+"','"+this.e_modul.getText().toUpperCase()+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(5,i)+"','"+this.sg2.cells(3,i)+"','"+this.app._lokasi+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"','D',"+parseNilai(this.sg2.cells(7,i))+",'"+this.app._userLog+"',now(),0,0,0,'"+this.sg2.cells(8,i)+"')");
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
	hapus: function(){			
		try{							
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
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
					var flag = this.e_modul.getText() == "RRR" ? "0" : "-";	
					sql.add("insert into rra_pdrk_log select no_pdrk,kode_lokasi,keterangan,kode_ubis,kode_gubis,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi, nik_user, tgl_input,progress, kode_kota, no_nd, file_nd, flag_rfc, now() from rra_pdrk_m where no_pdrk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					sql.add("insert into rra_pdrk_logd select *  from rra_pdrk_d where no_pdrk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					sql.add("delete from rra_pdrk_m  where no_pdrk='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from rra_anggaran where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");					
					sql.add("delete from rra_pdrk_d where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");										
					sql.add("delete from rra_pdrk_dok where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");															
										
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
		this.formEvent = event;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.e_uid.setText(this.app._defsapuid.uid);
					this.e_pwd.setText(this.app._defsapuid.pwd);
					setTipeButton(tbSimpan);
				break;
			case "ubah" :				
				this.sg2.validasi();				
				if (this.e_terima.getText() == "0"){
					systema.alert(this,"Nilai terima tidak boleh Nol","");
					return false;
				}
				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
		return false;
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		//this.e_nb.setText("");
		this.doClick();
	},
	doClick:function(sender){		
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
			if (sender == this.e_nb && this.e_nb.getText()!="") {
				setTipeButton(tbAllFalse);
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
						   "select a.keterangan, a.jenis_agg,a.kode_ubis,a.kode_gubis,a.nik_app1,a.nik_app2,a.nik_app3,b.nama as nama_ubis,c.nama as nama_gubis,d.nama as nama_app1,e.nama as nama_app2,f.nama as nama_app3,a.justifikasi,a.sts_pdrk, a.kode_kota, a.file_nd, a.no_nd   "+
						   "from rra_pdrk_m a inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi "+
						   "                  inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi "+
						   "                  inner join rra_karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi "+
						   "                  inner join rra_karyawan e on a.nik_app2=e.nik and a.kode_lokasi=e.kode_lokasi "+
						   "                  inner join rra_karyawan f on a.nik_app3=f.nik and a.kode_lokasi=f.kode_lokasi "+
						   "where a.no_pdrk='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
						   "select file_dok, nama from rra_pdrk_dok where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by no_urut",
						   "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai_gar,a.nilai_pakai,a.saldo,a.nilai,a.dc,a.target "+
							 "from rra_pdrk_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
							 "					inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "					left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
							 "where a.no_pdrk = '"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc"
						   ]}),true);
				if (typeof data == "object"){
					var line = data.result[0].rs.rows[0];
					if (line != undefined){
						this.e_ket.setText(line.keterangan);
						this.e_modul.setText(line.sts_pdrk);
						this.c_jenis.setText(line.jenis_agg);
						this.cb_ubis.setText(line.kode_ubis,line.nama_ubis);
						this.cb_gubis.setText(line.kode_gubis,line.nama_gubis);
						this.cb_app1.setText(line.nik_app1,line.nama_app1);
						this.cb_app2.setText(line.nik_app2,line.nama_app2);
						this.cb_app3.setText(line.nik_app3,line.nama_app3);
						this.cb_kota.setText(line.kode_kota);
						this.e_file.setText(line.file_nd);
						this.ed_dok.setText(line.no_nd);
						this.mDesk.setCode(urldecode(line.justifikasi));
					} 
					setTipeButton(tbUbahHapus);
					this.sgUpld.clear();
					for (var i in data.result[1].rs.rows){
						line = data.result[1].rs.rows[i];
						this.sgUpld.appendData([line.file_dok, '-',line.nama]);
						this.sgUpld.rows.get(i).values[1] = {tmpfile:line.file_dok,filedest:line.file_dok};
					}
				}
				
				this.sg2.clear();			
				//var data = this.dbLib.getDataProvider(strSQL,true);
				data = data.result[2];
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.bulan,line.kode_cc,line.nama_cc,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,floatToNilai(line.nilai),line.target]);
					}
				} else {
					this.sg2.clear(1);
				}
								
			}
		}catch(e){
			alert(e);
		}
	},
	doChangeCell: function(sender, col, row) {		
	},
	doChangeCell2: function(sender, col, row) {
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
	},
	doNilaiChange: function(){
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
	doEllipsClick: function(sender, col, row) {		
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
                                system.info(this,"transaksi telah sukses tersimpan","(ID : "+ this.e_nb.getText()+")");
                                this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);
                            }else if (this.saveFiles == ""){
                                system.info(this,"transaksi telah sukses tersimpan","(ID : "+ this.e_nb.getText()+")");						
								this.standarLib.clearByTag(this, ["0","1"],this.e_nb);		
								this.sgUpld.clear(1);
							}
						}else {
							system.info(this,result,"");
							setTipeButton(tbUbahHapus);					
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
    },
    doPager: function(sender, page){			
		sender.sg.doSelectPage(page);
	},
	doAfterPaste: function(sender, rowCount){		
		try{						
			if (sender == this.sg2 ) var sgn = this.sgn2;		
			sgn.setTotalPage(sender.getTotalPage());
			sgn.rearrange();			
			if (sender == this.sg2){		
				var tot = 0;	
				for (var i = 0; i < this.sg2.getRowCount();i++){
					if (this.sg2.cells(7,i) != ""){
						tot += nilaiToFloat(this.sg2.cells(7,i));			
					}
				}
				this.e_terima.setText(floatToNilai(tot));
			}
		}catch(e){
			alert(e);
		}
	}
});
