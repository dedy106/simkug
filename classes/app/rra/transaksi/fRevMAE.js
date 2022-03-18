window.app_rra_transaksi_fRevMAE = function(owner)
{
	if (owner)
	{
		window.app_rra_transaksi_fRevMAE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_transaksi_fRevMAE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form PRDRK ABT Anggaran: Koreksi Review MA", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;wysiwyg;uploader;util_rfc;util_file");
		this.e_periode = new saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,202,20],caption:"No Review",maxLength:30,readOnly:true, change:[this,"doChange"], multiSelection:false});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Nama Kegiatan", maxLength:150});		
		this.cb_pdrk = new saiCBBL(this,{bound:[20,13,222,20],caption:"No PDRK", multiSelection:false, tag:1, btnVisible:false});		
		this.e_norev = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"No Review GUBIS", readOnly:true});		
		this.c_modul = new saiCB(this,{bound:[20,15,200,20],caption:"Modul",items:["RRR","ABT"], readOnly:true,tag:2});		
		this.e_donor = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Nilai Donor", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.c_jenis = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"Jenis", readOnly:true});		
		this.e_terima = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Nilai Penerima", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.pc1 = new pageControl(this,{bound:[20,16,900, 330], childPage:["Data PDRK","Data Donor","Data Penerima","Data Justifikasi","Dokumen Pendukung"]});
		
		this.ed_dok = new saiLabelEdit(this.pc1.childPage[0], {bound:[20,1,400,20], caption:"No. Nota Dinas"});
		this.e_file = new saiLabelEdit(this.pc1.childPage[0], {bound:[20,2,400,20], caption:"File Nota Dinas"});
		this.upld = new uploader(this.pc1.childPage[0], {bound:[430,2,80,20],caption:"Browse",autoSubmit:true, param1:"uploadTo",param2:"server/media/tmp/", param3:"object", param4:"server/media/", afterUpload:[this,"doAfterLoad"], change:[this,"doFileChange"]});
		
		this.cb_ubis = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Png Jawab", multiSelection:false, maxLength:10, tag:1, change:[this, "doChange"]});
		this.cb_gubis = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Direktorat", multiSelection:false, maxLength:10, tag:1});
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2, readOnly:true, text:this.app._userLog, rightLabelCaption:this.app._namaUser});
		this.cb_app1 = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"NIK Png Jawab", multiSelection:false, maxLength:10, tag:1});
		this.cb_app2 = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:1});
		this.cb_app3 = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"NIK Menetapkan", multiSelection:false, maxLength:10, tag:1});
		this.cb_kota = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Kota", multiSelection:false, maxLength:10, tag:2});
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,15,this.pc1.width-5,this.pc1.height-40],colCount:11,tag:9,
		            colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai Gar","Terpakai","Saldo","Nilai Donor"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[90,90,90,90,90,70,60,60,90,70,50]],
					columnReadOnly:[true,[2,4,6,7,8,9],[10]],
					buttonStyle:[[0,1,3,5],[bsAuto,bsEllips,bsEllips,bsEllips]], 
					colFormat:[[7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai]],
					picklist:[[0],[new arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],autoAppend:true});
		this.sgn = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
					colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai ABT","Target"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,130,150,70,60,60,150,70,50]],
					colFormat:[[7],[cfNilai]],
					columnReadOnly:[true,[2,4,6],[7,8]],
					buttonStyle:[[0,1,3,5],[bsAuto,bsEllips,bsEllips,bsEllips]], 					
					picklist:[[0],[new arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
					defaultRow:1,
					nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCell2"],autoAppend:true});
		this.sgn2 = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});
		uses("wysiwyg",true);
		this.mDesk = new wysiwyg(this.pc1.childPage[3],{bound:[1,10,this.pc1.width-25,this.pc1.height-125], withForm:false});
		this.mDesk.display();
		this.mDesk.enable();
		
		this.bView = new button(this.pc1.childPage[3], {bound:[this.pc1.width - 100, 10, 80, 20], caption:"View HTML", click:"doCodeClick"});
		this.bLoad = new button(this.pc1.childPage[3], {bound:[this.pc1.width - 200, 10, 80, 20], caption:"Load Templat", click:"doCodeClick"});
		this.cb_templ = new saiCBBL(this.pc1.childPage[3],{bound:[this.pc1.width - 200,17,200,20],caption:"Template", visible:false, multiSelection:false, maxLength:10, tag:100, change:[this,"doChange"]});
		this.sgUpld = new saiGrid(this.pc1.childPage[4],{bound:[1,0,this.pc1.width-3,this.pc1.height - 28],colCount:3,colTitle:["Dokumen","Upload","Deskripsi"],colFormat:[[1],[cfUpload]],
					colWidth:[[2,1,0],[250,80,230]], colReadOnly:[true,[0,1],[]], change:[this,"doGridChange"], tag:3});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
		this.sgn = new sgNavigator(this.pc1.childPage[4],{bound:[1,this.sgUpld.height + 3,this.pc1.width-3,25],buttonStyle:1, grid:this.sgUpld});
		
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
			this.rfc = new util_rfc();											
			this.login = new server_util_Map();				
			this.login.set("host","10.2.12.138");
			this.login.set("sysnr","Q00");
			this.login.set("client","500");
			
			this.login.set("user","AP-TRAIN20");
			this.login.set("passwd","telkom1234");
			
			this.login.set("codepage","1100");	
			uses("util_standar");
			this.standarLib = new util_standar();		
			
			this.e_nb.setSQL("select a.no_mrev, a.keterangan, a.no_pdrk from rra_mrev_m a "+
			                    "where a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"'",["no_mrev","keterangan","no_pdrk"],false,["No Review","Keterangan","No PDRK"],"and","Data Review MA",true);
			
			this.cb_pdrk.setSQL("select a.no_pdrk,a.keterangan,b.no_grev from rra_pdrk_m a inner join rra_grev_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi "+
			                    "where b.progress in ('1','2') and b.sts_pdrk = 'ABT' and b.kode_lokasi='"+this.app._lokasi+"'",["no_pdrk","keterangan","no_grev"],false,["No PDRK","Keterangan","No Review GUBIS"],"and","Data PDRK",true);
			this.cb_ubis.setSQL("select kode_ubis, nama from rra_ubis where kode_lokasi='"+this.app._lokasi+"'",["kode_ubis","nama"],false,["Kode","Nama"],"and","Data Penanggungjawab Program",true);
			this.cb_gubis.setSQL("select kode_gubis, nama from rra_gubis where kode_lokasi='"+this.app._lokasi+"'",["kode_gubis","nama"],false,["Kode","Nama"],"and","Data Direktorat",true);			
			this.cb_app1.setSQL("select nik, nama from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan ",true);
			this.cb_app2.setSQL("select nik, nama from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app3.setSQL("select nik, nama from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_kota.setSQL("select kode_kota, nama from rra_kota ",["kode_kota","nama"],false,["Kode Kota","Nama Kota"],"and","Data Kota",true);
			
			this.cb_ubis.setText(this.app._kodeUbis);
			this.cb_gubis.setText(this.app._kodeGubis);
			this.cb_app1.setText(this.app._nikApp1);
			this.cb_app2.setText(this.app._nikApp2);
			this.cb_app3.setText(this.app._nikApp3);
			this.cb_kota.setText(this.app._kota);
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.onClose.set(this,"doClose");			
			this.dbLib.getDataProviderA("select kode_akun, nama from rra_masakun where kode_lokasi = '"+this.app._lokasi+"' ", undefined, "akun");		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_transaksi_fRevMAE.extend(window.childForm);
window.app_rra_transaksi_fRevMAE.implement({
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
			if (this.c_modul.getText() != "ABT") this.sg.setTag("0"); else this.sg.setTag("9");
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
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
					var flag = this.c_modul.getText() == "RRR" ? "0" : "-";						
					sql.add("delete from rra_mrev_d where no_mrev = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("update rra_grev_m set progress='2' where no_grev='"+this.e_norev.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update rra_mrev_m set kode_ubis='"+this.cb_ubis.getText()+"',kode_gubis='"+this.cb_gubis.getText()+"' "+
						" 	,jenis_agg='"+this.c_jenis.getText()+"',tanggal='"+this.dp_d1.getDateString()+"' "+
						" 	,periode='"+this.e_periode.getText()+"',nik_buat='"+this.app._userLog+"' "+
						" 	,nik_app1='"+this.cb_app1.getText()+"',nik_app2='"+this.cb_app2.getText()+"' "+
						"	,nik_app3='"+this.cb_app3.getText()+"',sts_pdrk='"+this.c_modul.getText()+"' "+
						"	,justifikasi='"+urlencode(this.mDesk.getCode())+"',nik_user='"+this.app._userLog+"' "+
						"	,tgl_input=now(),progress='0',keterangan='"+this.e_ket.getText()+"' "+
						"	, flag_rfc='"+flag+"', kode_kota='"+this.cb_kota.getText()+"',no_nd='"+this.ed_dok.getText()+"' "+
						"	, file_nd='"+this.e_file.getText()+"' where no_mrev='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("delete from rra_anggaran where no_bukti = '"+this.cb_pdrk.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");					
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into rra_mrev_d(no_mrev,no_grev,no_pdrk,kode_lokasi,no_urut,kode_akun,kode_cc,kode_drk,periode,nilai_gar,nilai_pakai,saldo,nilai,dc,target) values "+
										"	('"+this.e_nb.getText()+"','"+this.e_norev.getText()+"','"+this.cb_pdrk.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(9,i))+","+parseNilai(this.sg.cells(10,i))+",'C','-')");
								sql.add("insert into rra_anggaran(no_bukti,modul,kode_cc,kode_akun,kode_drk,kode_lokasi,periode,dc,nilai,nik_user,tgl_input,nilai_gar, nilai_pakai, saldo,target) values "+
										"	('"+this.cb_pdrk.getText()+"','"+this.c_modul.getText()+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(3,i)+"','"+this.app._lokasi+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,i)+"','C',"+parseNilai(this.sg.cells(10,i))+",'"+this.app._userLog+"',now(),"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(9,i))+",'-')");
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into rra_mrev_d(no_mrev,no_grev,no_pdrk,kode_lokasi,no_urut,kode_akun,kode_cc,kode_drk,periode,nilai_gar,nilai_pakai,saldo,nilai,dc,target) values "+
										"	('"+this.e_nb.getText()+"','"+this.e_norev.getText()+"','"+this.cb_pdrk.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(5,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"',0,0,0,"+parseNilai(this.sg2.cells(7,i))+",'D','"+this.sg2.cells(8,i)+"')");
								sql.add("insert into rra_anggaran(no_bukti,modul,kode_cc,kode_akun,kode_drk,kode_lokasi,periode,dc,nilai,nik_user,tgl_input,nilai_gar,nilai_pakai, saldo,target) values "+
										"	('"+this.cb_pdrk.getText()+"','"+this.c_modul.getText().toUpperCase()+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(5,i)+"','"+this.sg2.cells(3,i)+"','"+this.app._lokasi+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"','D',"+parseNilai(this.sg2.cells(7,i))+",'"+this.app._userLog+"',now(),0,0,0,'"+this.sg2.cells(8,i)+"')");
							}
						}
					}
					if (files.length > 0){
						var scan = "insert into rra_mrev_dok(no_mrev,kode_lokasi,file_dok,nama,no_urut) values ";						
						var first = true;
						var noUrut=1;
						for (var i in files){							
							scan += "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+files[i].file+"','"+files[i].nama+"',"+noUrut+")";
							sql.add(scan);										
							scan = "insert into rra_mrev_dok(no_mrev,kode_lokasi,file_dok,nama,no_urut) values ";	
							noUrut++;
						}
						
					}
					var line = "";
					for (var i in this.data1Thn.objList){										
						var row = this.data1Thn.get(i);
						var ccakun = i.split(":");
						for (var l in row.objList){//rows = 16
							line = row.get(l);											
							for (var l2 in line.objList){//row																	
								//this.data1Thn.get(i).get(l).get(l2).set("TSL06", parseFloat(line.get(l2).get("TSL06")) - rrr);	
								sql.add("insert into rra_mrev_orgi(no_mrev, no_pdrk,periode, kode_akun, kode_cc, nilai,kode_lokasi)values ('"+this.e_nb.getText()+"','"+this.cb_pdrk.getText()+"','"+line.get(l2).get("GJAHR")+line.get(l2).get("PERIO")+"','"+ccakun[1]+"','"+ccakun[0]+"','"+line.get(l2).get("TSL10")+"','"+this.app._lokasi+"')");
							}								
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
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.cb_ubis.setText(this.app._kodeUbis);
					this.cb_gubis.setText(this.app._kodeGubis);
					this.cb_app1.setText(this.app._nikApp1);
					this.cb_app2.setText(this.app._nikApp2);
					this.cb_app3.setText(this.app._nikApp3);
					this.cb_kota.setText(this.app._kota);
					setTipeButton(tbSimpan);
				break;
			case "ubah" :	
				this.sg2.validasi();
				var dataAkun = new server_util_arrayList();
				var kodeAkun = "' '";
				var kodeCc ="' '";
				var drk = "' '";
				for (var j=i;j < this.sg2.getRowCount();j++){
					if (this.sg2.cells(0,j) == this.sg2.cells(0,i) && this.sg2.cells(1,j) == this.sg2.cells(1,i) && this.sg2.cells(5,j) == this.sg2.cells(5,i) && (i != j)) {
						var k = i+1;
						system.alert(this,"Transaksi Terima tidak valid.","Duplikasi Data Anggaran.[Baris : "+k+"]");
						return false;
					}
					kodeAkun += ",'"+this.sg2.cells(5,i)+"'";
					kodeCc += ",'"+this.sg2.cells(1,i)+"'";
					dataAkun.add(new server_util_Map({items:{cc:this.sg.cells(1,i), akun:this.sg.cells(5,i), bln1:"01",bln2:this.sg.cells(0,i)}}));
				}								
				if (this.c_modul.getText() != "ABT") {
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
							for (var j=i;j < this.sg.getRowCount();j++){
								if (this.sg.cells(0,j) == this.sg.cells(0,i) && this.sg.cells(1,j) == this.sg.cells(1,i) && this.sg.cells(5,j) == this.sg.cells(5,i) && (i != j)) {
									var k = i+1;
									system.alert(this,"Transaksi Donor tidak valid.","Duplikasi Data Anggaran.[Baris : "+k+"]");
									return false;
								}
							}
							kodeAkun += ",'"+this.sg.cells(5,i)+"'";
							kodeCc += ",'"+this.sg.cells(1,i)+"'";
							dataGrid.set(this.sg.cells(0,i)+":"+this.sg.cells(1,i)+":"+this.sg.cells(5,i),{index:i + 1, nilai: nilaiToFloat(this.sg.cells(10,i))});
							dataAkun.add(new server_util_Map({items:{cc:this.sg.cells(1,i), akun:this.sg.cells(5,i), bln1:"01",bln2:this.sg.cells(0,i)}}));
						}
					}					
					//ambil data RRR yang belum terposting ke RFC					
					var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.kode_akun,a.kode_cc,substr(a.periode,5,2) as periode, sum(a.nilai) as pakai from rra_anggaran a "+
							" inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
							"		where  "+
							"		a.kode_akun in ("+kodeAkun+")  and a.kode_cc in ("+kodeCc+") and a.periode like '"+this.e_periode.getText().substr(0,4)+"%' and a.kode_lokasi= '"+this.app._lokasi+"' and a.DC='C' and b.flag_rfc='0' "+
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
					//var res = this.rfc.cekSaldos(this.login,  this.e_periode.getText().substr(0,4),dataAkun,"1000","1000","64","0");
					var dataGar = this.rfc.dataGar(this.login,  this.e_periode.getText().substr(0,4),dataAkun,"1000","1000","64","0");
					
					if (typeof dataGar == "string"){
						system.alert(this,dataGar,"");
						return;
					}	
					//cek di Grid nilai pendonor (dataGrid) dengan hasil terakhir RFC
					var res = dataGar.get("saldo");
					var line, tmp;					
					for (var i in res.objList){
						tmp = res.get(i);						
						dataRRR.set(i, (dataRRR.get(i) == undefined ? 0 : dataRRR.get(i)) );												
						for (var t in tmp.objList){
							var tmp2 = tmp.get(t);														
							line = { sawal : tmp2.get("TSL10") ,
											 pakai : tmp2.get("TSL03") + tmp2.get("TSL04")+tmp2.get("TSL07") + tmp2.get("TSL08") + dataRRR.get(i),
											 sisa : tmp2.get("TSL10")- dataRRR.get(i) - (tmp2.get("TSL03") + tmp2.get("TSL04")+tmp2.get("TSL07") + tmp2.get("TSL08")+tmp2.get("TSL11") + tmp2.get("TSL12"))
									};					
							if (dataGrid.get(i) != undefined && dataGrid.get(i).nilai > line.sisa){
								system.alert(this,"Transaksi Donor tidak valid.","Nilai Donor melebihi Saldo Anggaran [Baris: "+dataGrid.get(i).index+"]");
								return;
							}
						}
					}															
				}else {
					var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.kode_akun,a.kode_cc,substr(a.periode,5,2) as periode, sum(a.nilai) as pakai from rra_anggaran a "+
							" inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
							"		where  "+
							"		a.kode_akun in ("+kodeAkun+")  and a.kode_cc in ("+kodeCc+") and a.periode like '"+this.e_periode.getText().substr(0,4)+"%' and a.kode_lokasi= '"+this.app._lokasi+"' and a.DC='C' and b.flag_rfc='0' and b.no_pdrk <> '"+this.cb_pdrk.getText()+"' "+
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
						return;
					}	
				}				
				try{					
					this.data1Thn = dataGar.get("saldothn");					
					for (var i in this.data1Thn.objList){										
						var row = this.data1Thn.get(i);							
						for (var l in row.objList){//rows = 16
							line = row.get(l);											
							for (var l2 in line.objList){//row									
								var rrr = dataRRR.get(line.get(l2).get("PERIO")+":"+i ) == undefined ? 0 : dataRRR.get(line.get(l2).get("PERIO")+":"+i );
								this.data1Thn.get(i).get(l).get(l2).set("TSL10", parseFloat(line.get(l2).get("TSL10")) - rrr);	
							}								
						}
					}
				}catch(e){
					alert(e);
				}
				this.simpan();
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
		//this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_mrev_m","no_mrev","MREV-"+this.e_periode.getText().substr(2,4)+".","0000"));					
		//this.e_ket.setFocus();
	},
	doChange:function(sender){
		
		if (sender == this.e_nb){
			try{
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
						"select a.jenis_agg,a.no_grev, date_format(a.tanggal, '%d-%m-%Y') as tanggal,a.no_pdrk,a.keterangan, a.kode_ubis,a.kode_gubis,a.nik_app1,a.nik_app2,a.nik_app3,b.nama as nama_ubis,c.nama as nama_gubis,d.nama as nama_app1,e.nama as nama_app2,f.nama as nama_app3,a.justifikasi,a.sts_pdrk, a.kode_kota, a.file_nd, a.no_nd  "+
						   "from rra_mrev_m a inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi "+
						   "                  inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi "+
						   "                  inner join rra_karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi "+
						   "                  inner join rra_karyawan e on a.nik_app2=e.nik and a.kode_lokasi=e.kode_lokasi "+
						   "                  inner join rra_karyawan f on a.nik_app3=f.nik and a.kode_lokasi=f.kode_lokasi "+					   
						   "where a.no_mrev ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",
						   "select file_dok, nama from rra_mrev_dok where no_mrev = '"+this.e_norev.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by no_urut",
						   "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai_gar,a.nilai_pakai,a.saldo,a.nilai,a.dc,a.target "+
							 "from rra_mrev_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
							 "			 	    inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "				    left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
							 "where a.no_mrev = '"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc"
					]}),true);
					if (typeof data == "object"){
					var line = data.result[0].rs.rows[0];							
					setTipeButton(tbAllFalse);
					if (line != undefined){
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);
						this.cb_pdrk.setText(line.no_pdrk);
						this.e_norev.setText(line.no_grev);
						this.c_modul.setText(line.sts_pdrk);
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
						setTipeButton(tbUbahHapus);
					} 
					this.sgUpld.clear();
					for (var i in data.result[1].rs.rows){
						line = data.result[1].rs.rows[i];
						this.sgUpld.appendData([line.file_dok, '-',line.nama]);
						this.sgUpld.rows.get(i).values[1] = {tmpfile:line.file_dok,filedest:line.file_dok};
					}
				}
				this.sg.clear(); this.sg2.clear();			
				var data = data.result[2];
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						if (line.dc == "D")
							this.sg2.appendData([line.bulan,line.kode_cc,line.nama_cc,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,floatToNilai(line.nilai),line.target]);
						else this.sg.appendData([line.bulan, line.kode_cc, line.nama_cc, line.kode_drk, line.nama_drk, line.kode_akun, line.nama_akun, floatToNilai(line.nilai_gar), floatToNilai(line.nilai_pakai), floatToNilai(line.saldo), floatToNilai(line.nilai)]);
					}
				} else this.sg2.clear(1);
			}catch(e){
				alert(e);
			}
		}
		if (sender == this.cb_ubis){
			this.dbLib.getDataProviderA("select kode_cc, nama from rra_cc where kode_lokasi = '"+this.app._lokasi+"' and kode_ubis = '"+sender.getText()+"' ", undefined, "cc");
		}
		if (sender == this.cb_templ){
				var data = this.dbLib.getDataProvider("select keterangan from rra_draft where kode_draft = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'  ",true);
				if (typeof data != "string" && data.rs.rows[0] != undefined){				
					this.mDesk.setCode(urldecode(data.rs.rows[0].keterangan));
				}
			}
		if (sender == this.cb_pdrk && this.cb_pdrk.getText()!="") {
			this.e_norev.setText(this.cb_pdrk.dataFromList[2]);
			var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
			           "select a.jenis_agg,a.kode_ubis,a.kode_gubis,a.nik_app1,a.nik_app2,a.nik_app3,b.nama as nama_ubis,c.nama as nama_gubis,d.nama as nama_app1,e.nama as nama_app2,f.nama as nama_app3,a.justifikasi,a.sts_pdrk, a.kode_kota, a.file_nd, a.no_nd  "+
			           "from rra_grev_m a inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi "+
					   "                  inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi "+
					   "                  inner join rra_karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi "+
					   "                  inner join rra_karyawan e on a.nik_app2=e.nik and a.kode_lokasi=e.kode_lokasi "+
					   "                  inner join rra_karyawan f on a.nik_app3=f.nik and a.kode_lokasi=f.kode_lokasi "+					   
					   "where a.no_grev ='"+this.e_norev.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",
					   "select file_dok, nama from rra_grev_dok where no_grev = '"+this.e_norev.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by no_urut",
					   "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai_gar,a.nilai_pakai,a.saldo,a.nilai,a.dc,a.target "+
			             "from rra_grev_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
						 "			 	    inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "				    left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
			             "where a.no_grev = '"+this.e_norev.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc"
					   ]}),true);
			if (typeof data == "object"){
				var line = data.result[0].rs.rows[0];							
				if (line != undefined){
					this.c_modul.setText(line.sts_pdrk);
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
				this.sgUpld.clear();
				for (var i in data.result[1].rs.rows){
					line = data.result[1].rs.rows[i];
					this.sgUpld.appendData([line.file_dok, '-',line.nama]);
					this.sgUpld.rows.get(i).values[1] = {tmpfile:line.file_dok,filedest:line.file_dok};
				}
			}
			this.sg.clear(); this.sg2.clear();			
			var data = data.result[2];
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.bulan,line.kode_cc,line.nama_cc,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,floatToNilai(line.nilai),line.target]);
				}
			} else this.sg2.clear(1);
		}
	},
	doChangeCell: function(sender, col, row) {
		if (this.c_modul.getText() != "ABT") {
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
					sender.cells(4, row, "-");
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
			if (col == 0 || col == 1 || col == 3 || col == 5) {		
				if (this.sg.cells(0,row) != "" && this.sg.cells(1,row) != "" && this.sg.cells(3,row) != "" && this.sg.cells(5,row) != "") {
					if (!this.app._rfcCall){
						var data = this.dbLib.getDataProvider("select a.sawal,isnull(b.pakai,0) as pakai,a.sawal-isnull(b.pakai,0) as sisa "+
								"from "+
								"( "+
								"		select kode_lokasi,kode_akun,kode_cc,sum(nilai) as sawal from rra_anggaran "+
								"		where "+
								"		kode_akun = '"+this.sg.cells(5,row)+"' and periode = '"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,row)+"' and kode_cc = '"+this.sg.cells(1,row)+"' and kode_drk = '"+this.sg.cells(3,row)+"' and kode_lokasi= '"+this.app._lokasi+"' and DC='D' and no_bukti <> '"+this.cb_pdrk.getText()+"' "+
								"		group by kode_lokasi,kode_akun,kode_cc "+
								") a left join "+
								"( "+
								"		select kode_lokasi,kode_akun,kode_cc,sum(nilai) as pakai from rra_anggaran "+
								"		where  "+
								"		kode_akun = '"+this.sg.cells(5,row)+"' and periode = '"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,row)+"' and kode_cc = '"+this.sg.cells(1,row)+"'  and kode_drk = '"+this.sg.cells(3,row)+"' and kode_lokasi= '"+this.app._lokasi+"' and DC='C' and no_bukti <> '"+this.cb_pdrk.getText()+"' "+
										"group by kode_lokasi,kode_akun,kode_cc "+
								") b on a.kode_akun=b.kode_akun and a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.sg.setCell(7,row,floatToNilai(line.sawal));
							this.sg.setCell(8,row,floatToNilai(line.pakai));
							this.sg.setCell(9,row,floatToNilai(line.sisa));
						} else {
							this.sg.setCell(7,row,"0");
							this.sg.setCell(8,row,"0");
							this.sg.setCell(9,row,"0");
						}
					}
				}else{
						var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.kode_akun,a.kode_cc,substr(a.periode,5,2) as periode, sum(a.nilai) as pakai from rra_anggaran a "+
							" inner join rra_pdrk_m b on b.no_pdrk = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
							"		where  "+
							"		a.kode_akun = '"+this.sg.cells(5,row)+"'  and a.kode_cc = '"+this.sg.cells(1,row)+"' and a.periode = '"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,row)+"'  and a.kode_lokasi= '"+this.app._lokasi+"' and a.DC='C' and b.flag_rfc='0' "+
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
						
						var res = this.rfc.cekSaldo(this.login, this.e_periode.getText().substr(0,4),"01",this.sg.cells(0,row),this.sg.cells(1,row),this.sg.cells(5,row),"1000","1000","64","0");					
						if (typeof res == "string"){
							system.alert(this,res,"");
							return;
						}
						
						var restable = res.get("restable");
						//TSL01 + TSL02 = Plan CO
						//TSL03 + TSL04 = Actual CO
						//TSL05 + TSL06 = Release FM
						//TSL07 + TSL08 = Actual FM
						//TSL09 + TSL10 = Plan FM		
						if (line == undefined) line = {periode:"",kode_cc:"", kode_akun:""};									
						var i = line.periode+":"+line.kode_cc+":"+line.kode_akun;
						if (restable.get("0") != undefined){//+ restable.get("0").get("TSL05")
							tmp = restable.get("0");
							dataRRR.set(i, (dataRRR.get(i) == undefined ? 0 : dataRRR.get(i)) );
							line = { sawal : tmp.get("TSL10") - dataRRR.get(i),
											 pakai : tmp.get("TSL03") + tmp.get("TSL04")+tmp.get("TSL07") + tmp.get("TSL08"),
											 sisa : tmp.get("TSL10")- dataRRR.get(i) - (tmp.get("TSL03") + tmp.get("TSL04")+tmp.get("TSL07") + tmp.get("TSL08")+tmp.get("TSL11") + tmp.get("TSL12"))
									};						
							if (line != undefined){
								this.sg.setCell(7,row,floatToNilai(line.sawal));
								this.sg.setCell(8,row,floatToNilai(line.pakai));
								this.sg.setCell(9,row,floatToNilai(line.sisa));
							} else {
								this.sg.setCell(7,row,"0");
								this.sg.setCell(8,row,"0");
								this.sg.setCell(9,row,"0");
							}												
						}else {
							this.sg.setCell(7,row,"0");
							this.sg.setCell(8,row,"0");
							this.sg.setCell(9,row,"0");
						}
					}
				}
			}
			if (col == 10) this.sg.validasi();
		}
	},
	doChangeCell2: function(sender, col, row){
		sender.onChange.set(this,undefined);
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
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.getCell(10,i) != ""){
					tot += nilaiToFloat(this.sg.getCell(10,i));			
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
			if (this.c_modul.getText() != "ABT") {
				switch(col){
					case 1 :
							this.standarLib.showListDataForSG(this, "Daftar Cost Center",this.sg, this.sg.row, this.sg.col, 
															"select kode_cc, nama  from rra_cc where kode_lokasi = '"+this.app._lokasi+"'",
															"select count(kode_cc) from rra_cc where kode_lokasi = '"+this.app._lokasi+"'",
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
                                system.info(this,"transaksi telah sukses tersimpan ","(ID : "+ this.e_nb.getText()+")");							
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
