window.app_saku3_transaksi_klinik_fPeriksa = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_klinik_fPeriksa.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_klinik_fPeriksa";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pemeriksaan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;uploader;util_file;image;saiMemo");
		uses("saiGrid",true);				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Registrasi","Data Pemeriksaan","Rekap MedRec","Detail MedRec"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:16,tag:9,
		            colTitle:["No Reg","Tanggal","No Peserta","Mitra","ID Peserta","Nama","Nama Ayah","Nama Ibu","Tmp Lahir","Tgl Lahir","Sex","Gol Darah","Alamat","No HP","No Telpon","Pekerjaan"],
					colWidth:[[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[100,80,80,300,80,60,70,100,150,150,200,80,150,80,120,100]],
					readOnly:true, 
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,500,20],caption:"Bukti", tag:9, readOnly:true,visible:false});							
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"No Registrasi",readOnly:true,maxLength:10,change:[this,"doChange"]});		
		this.e_peserta = new saiLabelEdit(this.pc1.childPage[1],{bound:[320,10,200,20],caption:"No Peserta", tag:1, readOnly:true,change:[this,"doChange"]});					
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Nama", tag:1, readOnly:true});							
		this.e_umur = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,500,20],caption:"Umur",tag:1, readOnly:true,});					
		this.e_bb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,200,20],caption:"Berat Badan (kg)",tag:1, tipeText:ttNilai, text:"0"});							
		this.e_tb = new saiLabelEdit(this.pc1.childPage[1],{bound:[320,19,200,20],caption:"Tinggi Badan (cm)",tag:1, tipeText:ttNilai, text:"0"});					
		this.e_tdarah = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,21,200,20],caption:"Tek Darah (mmHg)",tag:1,maxlength:10});					
		this.e_suhu = new saiLabelEdit(this.pc1.childPage[1],{bound:[320,21,200,20],caption:"Suhu Badan (c)",tag:1, tipeText:ttNilai, text:"0"});			
		this.e_tarif = new saiLabelEdit(this.pc1.childPage[1],{bound:[760,21,200,20],caption:"Tarif Dokter", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]}); //boleh di-nol kalo temennya dokter
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"Alamat",tag:1, readOnly:true});					
		this.e_tottindak = new saiLabelEdit(this.pc1.childPage[1],{bound:[760,13,200,20],caption:"Tot Tindakan", tag:1, tipeText:ttNilai, text:"0",readOnly:true,change:[this,"doChange"]}); 
		this.e_mitra = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"Mitra", tag:1, readOnly:true});					
		this.e_totobat = new saiLabelEdit(this.pc1.childPage[1],{bound:[760,14,200,20],caption:"Tot Resep", tag:1, tipeText:ttNilai, text:"0",readOnly:true,change:[this,"doChange"]}); 
		this.e_jk = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,230,20],caption:"Sex", tag:1, readOnly:true});							
		this.e_goldar = new saiLabelEdit(this.pc1.childPage[1],{bound:[320,15,200,20],caption:"Gol Darah", tag:1, readOnly:true});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[760,15,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true}); 
		this.uploader = new uploader(this.pc1.childPage[1],{bound:[20,16,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"],visible:false});				
		
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:17,tag:9,
		            colTitle:["Tanggal","No Reg","No Periksa","Dokter","Diag Utama","Diag Kerja","Diag Tambahan","Tgl Kontrol","Tgl CheckUp","Tensi","BB","TB","Suhu","Anamnesa","Sts Present","Mitra Rujuk","Periksa Rujuk"],
					colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[200,200,300,300,  70,70,70,100,80,80, 200,200,200,150,120,120,80]],
					readOnly:true, 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		
		this.e_noperiksa2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,220,20],caption:"No Periksa", tag:9, readOnly:true});					
		this.e_tanggal2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[260,15,200,20],caption:"Tgl Periksa", tag:9, readOnly:true});					
		this.e_dokter2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,16,440,20],caption:"Dokter", tag:9, readOnly:true});					
		this.e_anam2 = new saiMemo(this.pc1.childPage[3],{bound:[20,10,440,80],caption:"Anamnesa",tag:9});
		this.e_status2 = new saiMemo(this.pc1.childPage[3],{bound:[20,11,440,80],caption:"Status Present",tag:9});		
		this.e_diag21 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,440,20],caption:"Diagnosa Utama", tag:9, readOnly:true});					
		this.e_diag22 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,16,440,20],caption:"Diagnosa Kerja", tag:9, readOnly:true});					
		this.e_diag23 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,17,440,20],caption:"Diagnosa Tambah", tag:9, readOnly:true});					
		this.e_tglkontrol2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,440,20],caption:"Tgl Kontrol", tag:9, readOnly:true});					
		this.e_tglcekup2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,16,440,20],caption:"Tgl Check Up", tag:9, readOnly:true});					
		this.e_rs2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,17,440,20],caption:"Diagnosa Tambah", tag:9, readOnly:true});					
		this.e_periksa2 = new saiMemo(this.pc1.childPage[3],{bound:[20,11,440,60],caption:"Hal/Periksa",tag:9});		
		this.e_anam2.setReadOnly(true);
		this.e_status2.setReadOnly(true);
		this.e_periksa2.setReadOnly(true);
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[3].rearrangeChild(10, 23);			
		this.img = new image(this.pc1.childPage[1],{bound:[550,10,160,180]});			
		
		this.sg21 = new saiGrid(this.pc1.childPage[3],{bound:[480,8,500,200],colCount:3,tag:9,
		            colTitle:["Kode","Deskripsi Tindakan","Jumlah"],
					colWidth:[[2,1,0],[80,300,80]],					
					readOnly:true,					
					colFormat:[[2],[cfNilai]],
					autoAppend:false,defaultRow:1});
		
		this.sg22 = new saiGrid(this.pc1.childPage[3],{bound:[480,218,500,200],colCount:5,tag:9,
		            colTitle:["Kode","Nama Obat","Pabrik","Satuan","Jumlah"],
					colWidth:[[4,3,2,1,0],[80,70,100,300,80]],					
					readOnly:true,					
					colFormat:[[4],[cfNilai]],
					autoAppend:false,defaultRow:1});
									
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,200,995,228], childPage:["Anamnesa","Tindakan","Resep","Rujukan"]});				
		this.e_anam = new saiMemo(this.pc2.childPage[0],{bound:[10,10,440,100],caption:"Anamnesa",tag:1});
		this.e_status = new saiMemo(this.pc2.childPage[0],{bound:[10,11,440,100],caption:"Status Present",tag:1});		
		
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-45],colCount:5,tag:9,
		            colTitle:["Kode","Deskripsi","Harga","Jumlah","Total"],
					colWidth:[[4,3,2,1,0],[80,80,80,400,100]],					
					columnReadOnly:[true,[1,2,4],[0,3]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],ellipsClick:[this,"doEllipsClick"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-5,25],buttonStyle:2,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-45],colCount:7,tag:9,
		            colTitle:["Nama Obat","Kode","Satuan","Stok","Harga","Jumlah","SubTtl"],					
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,80,80,400]],					
					colHide:[[1],[true]],					
					columnReadOnly:[true,[0,1,2,3,4,6],[5]],
					colFormat:[[3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0],[bsEllips]], 														   
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					autoAppend:true,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-5,25],buttonStyle:2,grid:this.sg2});		
		
		this.e_rs = new saiLabelEdit(this.pc2.childPage[3],{bound:[10,12,440,20],caption:"Mitra", tag:9, maxlength: 50});					
		this.e_periksa = new saiMemo(this.pc2.childPage[3],{bound:[10,10,440,150],caption:"Hal/Periksa",tag:9});
		
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		this.pc2.childPage[2].rearrangeChild(10, 23);	
		this.pc2.childPage[3].rearrangeChild(10, 23);	
		
		this.cb_diag1 = new saiCBBL(this.pc2.childPage[0],{bound:[500,11,220,20],caption:"Diagnosa Utama", multiSelection:false, maxLength:10, tag:1, labelWidth:120});				
		this.cb_diag2 = new saiCBBL(this.pc2.childPage[0],{bound:[500,36,220,20],caption:"Diagnosa Kerja", multiSelection:false, maxLength:10, tag:1, labelWidth:120});				
		this.cb_diag3 = new saiCBBL(this.pc2.childPage[0],{bound:[500,61,220,20],caption:"Diagnosa Tambahan", multiSelection:false, maxLength:10, tag:1, labelWidth:120});				
		this.l_tgl1 = new portalui_label(this.pc2.childPage[0],{bound:[500,87,120,18],caption:"Tanggal Kontrol", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc2.childPage[0],{bound:[620,86,90,18]}); 		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[500,112,120,18],caption:"Tanggal Check Up", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[620,111,90,18]}); 		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			uses("util_standar");
			this.standarLib = new util_standar();						
			this.ppKlinik = "";			
			var data = this.dbLib.getDataProvider("select kode_pp from kli_klinik_user where kode_lokasi='"+this.app._lokasi+"' and nik='"+this.app._userLog+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.ppKlinik = line.kode_pp;
			}			
			var data = this.dbLib.getDataProvider("select cast(year(getdate()) as varchar) + right('0' + RTRIM(MONTH(getdate())), 2) + right('0' + RTRIM(DAY(getdate())), 2) as periode ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.thnBln = line.periode.substr(2,6);
				this.periode = line.periode.substr(0,6);
			}								
			this.cb_diag1.setSQL("select kode_icd, nama from kli_icd where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["kode_icd","nama"],false,["Kode","Nama"],"and","Data ICD",true);
			this.cb_diag2.setSQL("select kode_icd, nama from kli_icd where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["kode_icd","nama"],false,["Kode","Nama"],"and","Data ICD",true);
			this.cb_diag3.setSQL("select kode_icd, nama from kli_icd where kode_lokasi='"+this.app._lokasi+"'  union select '-','-' ",["kode_icd","nama"],false,["Kode","Nama"],"and","Data ICD",true);
			
			var data = this.dbLib.getDataProvider("select tarif from kli_dokter where kode_dokter='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.e_tarif.setText(floatToNilai(line.tarif));
			}
			
			this.doLoad();			
			
			var sql = new server_util_arrayList();
			sql.add("select kode_tindak,nama from kli_tindak where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("select kode_obat,nama from kli_obat where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'");			
			this.dbLib.getMultiDataProviderA(sql);
			
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kli_periksa_m","no_periksa",this.app._lokasi+"-PR"+this.thnBln+this.ppKlinik+".","0000"));						
			this.nik_user=this.app._userLog;						
			var sql = "call sp_kli_stok ('"+this.periode+"','"+this.app._lokasi+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);				
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('KLIPIUDOK','KLIPDPTDOK','KLIPIUTDK','KLIPDPTTDK') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "KLIPIUDOK") this.akunPiuDok = line.flag;			
					if (line.kode_spro == "KLIPDPTDOK") this.akunPdptDok = line.flag;													
					if (line.kode_spro == "KLIPIUTDK") this.akunPiuTdk = line.flag;			
					if (line.kode_spro == "KLIPDPTTDK") this.akunPdptTdk = line.flag;													
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_klinik_fPeriksa.extend(window.childForm);
window.app_saku3_transaksi_klinik_fPeriksa.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kli_periksa_m","no_periksa",this.app._lokasi+"-PR"+this.thnBln+this.ppKlinik+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																		
					sql.add("update kli_reg set progress='1' where no_reg='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into kli_periksa_m(no_periksa,kode_lokasi,tanggal,kode_pp,kode_dokter,no_reg,no_peserta,bb,tb,suhu,tdarah,anamnesa,sts_present,kode_icd1,kode_icd2,kode_icd3,tgl_kontrol,tgl_cekup,periode,mitra_rujuk,perihal,progress,tarif,posted) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.ppKlinik+"','"+this.app._userLog+"','"+this.cb_kode.getText()+"','"+this.e_peserta.getText()+"',"+nilaiToFloat(this.e_bb.getText())+","+nilaiToFloat(this.e_tb.getText())+","+nilaiToFloat(this.e_suhu.getText())+",'"+this.e_tdarah.getText()+"','"+this.e_anam.getText()+"','"+this.e_status.getText()+"','"+this.cb_diag1.getText()+"','"+this.cb_diag2.getText()+"','"+this.cb_diag3.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.periode+"','"+this.e_rs.getText()+"','"+this.e_periksa.getText()+"','0',"+nilaiToFloat(this.e_tarif.getText())+",'F')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																																											
								sql.add("insert into kli_periksa_tindak(no_periksa,kode_lokasi,periode,nu,kode_tindak,jumlah,harga) values "+  
									   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.periode+"',"+i+",'"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(2,i))+")");								
							}
						}						
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){																																											
								sql.add("insert into kli_periksa_obat(no_periksa,kode_lokasi,periode,nu,kode_obat,kode_pp,sat_kecil,jumlah,harga) values "+  
									   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.periode+"',"+i+",'"+this.sg2.cells(1,i)+"','"+this.ppKlinik+"','"+this.sg2.cells(2,i)+"',"+nilaiToFloat(this.sg2.cells(5,i))+","+nilaiToFloat(this.sg2.cells(4,i))+")");								
							}
						}						
					}
					
					if (nilaiToFloat(this.e_tarif.getText())!=0) {
						sql.add("insert into kli_periksa_j(no_periksa,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-',getdate(),0,'"+this.akunPiuDok+"','Pemerksaan No: "+this.cb_kode.getText()+"','D',"+nilaiToFloat(this.e_tarif.getText())+",'"+this.ppKlinik+"','-','"+this.app._lokasi+"','PERIKSA','PIUDOK','"+this.periode+"','"+this.app._userLog+"',getdate(),'IDR',1)");
						sql.add("insert into kli_periksa_j(no_periksa,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-',getdate(),1,'"+this.akunPdptDok+"','Pemerksaan No: "+this.cb_kode.getText()+"','C',"+nilaiToFloat(this.e_tarif.getText())+",'"+this.ppKlinik+"','-','"+this.app._lokasi+"','PERIKSA','PDPTDOK','"+this.periode+"','"+this.app._userLog+"',getdate(),'IDR',1)");																							
					}
					if (nilaiToFloat(this.e_tottindak.getText())!=0) {
						sql.add("insert into kli_periksa_j(no_periksa,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-',getdate(),0,'"+this.akunPiuTdk+"','Pemerksaan No: "+this.cb_kode.getText()+"','D',"+nilaiToFloat(this.e_tottindak.getText())+",'"+this.ppKlinik+"','-','"+this.app._lokasi+"','PERIKSA','PIUDOK','"+this.periode+"','"+this.app._userLog+"',getdate(),'IDR',1)");
						sql.add("insert into kli_periksa_j(no_periksa,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-',getdate(),1,'"+this.akunPdptTdk+"','Pemerksaan No: "+this.cb_kode.getText()+"','C',"+nilaiToFloat(this.e_tottindak.getText())+",'"+this.ppKlinik+"','-','"+this.app._lokasi+"','PERIKSA','PDPTDOK','"+this.periode+"','"+this.app._userLog+"',getdate(),'IDR',1)");
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.sg.clear(1);
				this.sg2.clear(1);
				this.sg3.clear(1);
				this.sg21.clear(1);
				this.sg22.clear(1);
				//var sql = "call sp_klinik_stok ('"+this.periode+"','"+this.app._lokasi+"','"+this.ppKlinik+"','"+this.app._userLog+"')";
				//this.dbLib.execQuerySync(sql);			
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.pc2.setActivePage(this.pc2.childPage[0]);	
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kli_periksa_m","no_periksa",this.app._lokasi+"-PR"+this.thnBln+this.ppKlinik+".","0000"));
				break;
			case "simpan" :	
				//var sql = "call sp_klinik_stok ('"+this.periode+"','"+this.app._lokasi+"','"+this.ppKlinik+"','"+this.app._userLog+"')";
				//this.dbLib.execQuerySync(sql);			
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){						
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data tindakan untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (this.sg2.rowValid(i)){
						/*
						var data = this.dbLib.getDataProvider("select stok from apo_brg_stok where kode_brg='"+this.sg.cells(0,i)+"'  and kode_gudang='"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nik_user='"+this.nik_user+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0]; 
							if (line != undefined) this.sg.cells(4,i,floatToNilai(line.stok));
						}						
						if (nilaiToFloat(this.sg.cells(4,i)) < (nilaiToFloat(this.sg.cells(7,i))+nilaiToFloat(this.sg.cells(8,i)))) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Jumlah melebihi Stok ["+k+"]");
							return false;						
						}
						*/
						for (var j=i;j < this.sg2.getRowCount();j++){
							if (this.sg2.cells(0,j) == this.sg2.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data obat untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},		
	doChange: function(sender){
		try{			
			if (sender == this.e_peserta && this.e_peserta.getText() != ""){
				var strSQL = "select a.foto,a.nama,a.alamat,a.kode_mitra+' - '+b.nama as mitra,a.jk,a.kode_goldar "+
							 "from kli_peserta a inner join kli_mitra b on a.kode_mitra=b.kode_mitra and a.kode_lokasi=b.kode_lokasi "+							 
				             "where a.no_peserta='"+this.e_peserta.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.img.setImage(this.uploader.param4+line.foto);				
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_mitra.setText(line.mitra);
						this.e_jk.setText(line.jk);
						this.e_goldar.setText(line.kode_goldar);						
					}
				}
			}			
			if (sender == this.e_tarif) {				
				if (this.e_tarif.getText()!="" && this.e_tottindak.getText()!="" && this.e_totobat.getText()!="") {
					this.e_total.setText(floatToNilai(nilaiToFloat(this.e_tarif.getText())+nilaiToFloat(this.e_tottindak.getText())+nilaiToFloat(this.e_totobat.getText())));
			}
		}
		}catch(e){
			systemAPI.alert(e);
		}  
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {							
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));																					
				this.e_peserta.setText(this.sg1.cells(2,row));				
				
				var strSQL = "select * from kli_reg where no_reg='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_bb.setText(floatToNilai(line.bb));						
						this.e_tb.setText(floatToNilai(line.tb));						
						this.e_suhu.setText(floatToNilai(line.suhu));						
						this.e_tdarah.setText(line.tdarah);			
						this.antri = line.no_urut;
						this.umur = line.umur;						
						this.e_umur.setText(line.umur);
					}
				}
				var strSQL = "select convert(varchar,x.tanggal,103) as tanggal,x.no_reg,x.no_periksa,x.kode_dokter+' - '+y.nama as dokter,x.kode_icd1+'-'+isnull(a.nama,'-') as diag1,x.kode_icd2+'-'+isnull(b.nama,'-') as diag2,x.kode_icd3+'-'+isnull(c.nama,'-') as diag3,convert(varchar,x.tgl_kontrol,103) as tgl_kontrol,convert(varchar,x.tgl_cekup,103) as tgl_cekup,x.tdarah,x.bb,x.tb,x.suhu,x.anamnesa,x.sts_present,x.mitra_rujuk,x.perihal  "+
							 "from kli_periksa_m x "+
							 "  inner join kli_dokter y on x.kode_dokter=y.kode_dokter and x.kode_lokasi=y.kode_lokasi "+
							 "  left join kli_icd a on x.kode_icd1=a.kode_icd and x.kode_lokasi=a.kode_lokasi "+
							 "  left join kli_icd b on x.kode_icd2=b.kode_icd and x.kode_lokasi=b.kode_lokasi "+
							 "  left join kli_icd c on x.kode_icd3=c.kode_icd and x.kode_lokasi=c.kode_lokasi "+							 
							 "where x.no_peserta='"+this.e_peserta.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"' order by x.tanggal,x.no_periksa desc";		
				var data = this.dbLib.getDataProvider(strSQL,true);		
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU3 = data;
					this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/40));
					this.sgn3.rearrange();
					this.doTampilData3(1);
				} else this.sg3.clear(1);								
			}
		} catch(e) {alert(e);}
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 40;
		var finish = (start + 40 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+40);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];																
			this.sg3.appendData([line.tanggal,line.no_reg,line.no_periksa,line.dokter,line.diag1,line.diag2,line.diag3,line.tgl_kontrol,line.tgl_cekup,line.tdarah,line.bb,line.tb,line.suhu,line.anamnesa,line.sts_present,line.mitra_rujuk,line.perihal]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {							
				this.pc1.setActivePage(this.pc1.childPage[3]);																		
				this.e_noperiksa2.setText(this.sg3.cells(2,row));
				this.e_tanggal2.setText(this.sg3.cells(0,row));
				this.e_dokter2.setText(this.sg3.cells(3,row));
				this.e_anam2.setText(this.sg3.cells(13,row));
				this.e_status2.setText(this.sg3.cells(14,row));
				this.e_diag21.setText(this.sg3.cells(4,row));
				this.e_diag22.setText(this.sg3.cells(5,row));
				this.e_diag23.setText(this.sg3.cells(6,row));
				this.e_tglkontrol2.setText(this.sg3.cells(7,row));
				this.e_tglcekup2.setText(this.sg3.cells(8,row));
				this.e_rs2.setText(this.sg3.cells(15,row));
				this.e_periksa2.setText(this.sg3.cells(16,row));													
				
				var data = this.dbLib.getDataProvider("select a.kode_tindak,b.nama,a.jumlah from kli_periksa_tindak a inner join kli_tindak b on a.kode_tindak=b.kode_tindak and a.kode_lokasi=b.kode_lokasi where a.no_periksa='"+this.e_noperiksa2.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg21.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg21.appendData([line.kode_tindak,line.nama,floatToNilai(line.jumlah)]);
					}
				} else this.sg21.clear(1);			
				
				var data = this.dbLib.getDataProvider("select a.kode_obat,b.nama,b.pabrik,a.sat_kecil,a.jumlah from kli_periksa_obat a inner join kli_obat b on a.kode_obat=b.kode_obat and a.kode_lokasi=b.kode_lokasi where a.no_periksa='"+this.e_noperiksa2.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg22.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg22.appendData([line.kode_obat,line.nama,line.pabrik,line.sat_kecil,floatToNilai(line.jumlah)]);
					}
				} else this.sg22.clear(1);							
			}
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    										
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");						
	    			break;	      		
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataTindak = new portalui_arrayMap();
							this.dataObat = new portalui_arrayMap();
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataTindak.set(line.kode_tindak, line.nama);
								}
							}
							if (result.result[1]){
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataObat.set(line.kode_obat, line.nama);
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
	doLoad:function(sender){								
		var strSQL = "select x.no_reg,convert(varchar,x.tanggal,120) as tanggal,a.no_peserta,a.id_peserta,a.kode_mitra+' - '+b.nama as mitra,a.nama,a.ayah,a.ibu,a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.jk,a.kode_goldar,a.alamat,a.no_hp,a.no_tel,a.kerja "+
		             "from kli_reg x inner join kli_peserta a on a.no_peserta=x.no_peserta and a.kode_lokasi=x.kode_lokasi "+
					 "               inner join kli_mitra b on a.kode_mitra=b.kode_mitra and a.kode_lokasi=b.kode_lokasi "+					 
					 "where x.progress='0' and x.kode_dokter='"+this.app._userLog+"' and x.kode_lokasi='"+this.app._lokasi+"' order by x.tanggal";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);					
	},	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.no_reg,line.tanggal,line.no_peserta,line.mitra,line.id_peserta,line.nama,line.ayah,line.ibu,line.tempat,line.tgl_lahir,line.jk,line.kode_goldar,line.alamat,line.no_hp,line.no_tel,line.kerja]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Tindakan",sender,undefined, 
						    "select kode_tindak,nama from kli_tindak where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_tindak) from kli_tindak where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",
							["kode_tindak","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {			
			if (sender.cells(0,row) != "") {				
				var tindak = this.dataTindak.get(sender.cells(0,row));				
				if (tindak) {
					sender.cells(1,row,tindak);
					var strSQL = "select tarif from kli_tindak where kode_tindak='"+this.sg.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'";			
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																				
							this.sg.cells(2,row,floatToNilai(line.tarif));							
						}
					}
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Tindak "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
					sender.cells(3,row,"");
					sender.cells(4,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
		if (col == 3) {
			if (sender.cells(2,row) != "" && sender.cells(3,row) != "") {
				sender.cells(4,row,floatToNilai(Math.round(nilaiToFloat(sender.cells(2,row)) * nilaiToFloat(sender.cells(3,row)))));
				this.doNilaiChange();
			}
		}
	},
	doEllipsClick2: function(sender, col, row){
		try{		
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item Obat",sender,undefined, 
											  "select nama,kode_obat from kli_obat where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(*) from kli_obat where kode_lokasi='"+this.app._lokasi+"'",
											  ["nama","kode_obat"],"and",["Nama","Kode"],false);				
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell2: function(sender, col, row){				
		if ((col == 0 || col == 1) && sender.cells(1,row)!="") {			
			if (this.stsSimpan == 1) {
				var strSQL = "select a.sat_kecil,a.hna,b.stok "+
							 "from kli_obat a inner join kli_stok b on a.kode_obat=b.kode_obat and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.ppKlinik+"' and b.nik_user='"+this.app._userLog+"' "+
							 "where a.kode_obat='"+sender.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";						 			
			}
			else {
				var strSQL = "select a.sat_kecil,a.hna,b.stok+isnull(c.jumlah+c.bonus,0) as stok "+
							 "from kli_obat a inner join kli_stok b on a.kode_obat=b.kode_obat and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.ppKlinik+"' and b.nik_user='"+this.app._userLog+"' "+
							 "                left join kli_jual_d c on b.kode_obat = c.kode_obat and b.kode_lokasi=c.kode_lokasi and c.no_jual='"+this.e_nb.getText()+"' "+
							 "where a.kode_obat='"+sender.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			}		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					sender.cells(2,row,line.sat_kecil);	
					sender.cells(3,row,parseFloat(line.stok));	
					sender.cells(4,row,parseFloat(line.hna));	
					sender.cells(5,row,"0");						
					sender.cells(6,row,"0");				
				} 				
			}
		}		
		if (col == 5) {
			if (sender.cells(4,row) != "" && sender.cells(5,row) != "") {
				sender.cells(6,row,floatToNilai(Math.round(nilaiToFloat(sender.cells(4,row)) * nilaiToFloat(sender.cells(5,row)))));
				this.doNilaiChange();
			}
		}		
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					tot += nilaiToFloat(this.sg.cells(4,i));										
				}
			}
			var tot2 = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(6,i) != ""){
					tot2 += nilaiToFloat(this.sg2.cells(6,i));										
				}
			}			
			this.e_tottindak.setText(floatToNilai(tot));			
			this.e_totobat.setText(floatToNilai(tot2));			
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_tarif.getText())+nilaiToFloat(this.e_tottindak.getText())+nilaiToFloat(this.e_totobat.getText())));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	}
});