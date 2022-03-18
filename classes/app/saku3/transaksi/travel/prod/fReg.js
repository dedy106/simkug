window.app_saku3_transaksi_travel_prod_fReg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_prod_fReg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_prod_fReg";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Registrasi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;uploader;util_file;image");
		uses("saiGrid",true);				

		this.e_periode = new portalui_saiLabelEdit(this,{bound:[320,29,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:true});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,29,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,29,98,18],selectDate:[this,"doSelectDate"]});
		
		this.cb_kode = new saiLabelEdit(this,{bound:[20,10,200,20],caption:"No Registrasi",maxLength:30, change:[this,"doChange"],readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});										
		
		this.cb_paket = new saiCBBL(this,{bound:[20,28,220,20],caption:"Paket",tag:1,multiSelection:false, maxLength:10, tag:5, change:[this,"doChange"]});
		this.cb_jadwal = new saiCBBL(this,{bound:[20,22,220,20],caption:"Jadwal", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		 
		this.pc1 = new pageControl(this,{bound:[20,12,1000,550], childPage:["Daftar Registrasi","Data Paket","Data Jamaah","Data Tambahan","Dokumen"]});				
		this.cb_ref2 = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"No Jamaah Ref", maxLength:20, multiSelection:false, tag:1, readOnly:true,change:[this,"doChange"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-63],colCount:2,tag:9,
		            colTitle:["No Reg","Peserta"],
					colWidth:[[1,0],[200,100]],
					readOnly:true, 
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doChange"]});
		
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"PP / Cabang", tag:1,multiSelection:false});			
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Jenis Paket",items:["STANDAR","SEMI","EKSEKUTIF"],readOnly:true,tag:2,change:[this,"doChange"]});		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,55,100,20],caption:"Tgl Berangkat", underline:true,visible:false});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,55,98,20],visible:false});		
		this.cb_jpaket = new saiCBBL(this.pc1.childPage[1],{bound:[20,55,220,20],caption:"Jenis Promo", tag:1,multiSelection:false,change:[this,"doChange"]});			
		this.e_quota = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,42,200,20],caption:"Quota Ke-",tag:1, readOnly:true, tipeText:ttNilai,text:"0"});
		this.e_lama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,200,20],caption:"Lama Hari",tag:1, readOnly:true, tipeText:ttNilai,text:"0"});			
		this.c_curr = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,44,200,20],caption:"Currency",tag:2, readOnly:true});	
		this.e_harga = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,45,200,20],caption:"Harga Paket",tag:1, tipeText:ttNilai, text:"0"});//,readOnly:true
		this.e_diskon = new saiLabelEdit(this.pc1.childPage[1],{bound:[410,45,200,20],caption:"Diskon Biaya", tag:1,tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.c_room = new saiCBBL(this.pc1.childPage[1],{bound:[20,29,220,20],caption:"Type Room", tag:2, change:[this,"doChange"],multiSelection:false});			
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[410,29,200,20],caption:"Tot Tambahan", tag:1,tipeText:ttNilai, text:"0",readOnly:true});
		this.e_harga_room = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,51,200,20],caption:"Harga Room", tag:1,tipeText:ttNilai, text:"0"}); //,readOnly:true
		this.e_totaldok = new saiLabelEdit(this.pc1.childPage[1],{bound:[410,51,200,20],caption:"Tot Dokumen", tag:1,tipeText:ttNilai, text:"0",readOnly:true});

		this.cb_peserta = new saiCBBL(this.pc1.childPage[2],{bound:[20,11,220,20],caption:"No Jamaah", maxLength:20, rightLabelVisible:false,multiSelection:false, tag:1, change:[this,"doChange"],readOnly:true});				
		this.i_gen2 = new portalui_imageButton(this.pc1.childPage[2],{bound:[245,11,20,20],hint:"Jamaah Baru",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});										
		this.e_nama = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,260,20],caption:"Nama", tag:3});
		this.cb_ref = new saiCBBL(this.pc1.childPage[2],{bound:[290,12,220,20],caption:"No Jamaah Ref", maxLength:20, multiSelection:false, tag:1, readOnly:true});				
		this.c_jk = new saiCB(this.pc1.childPage[2],{bound:[20,15,260,20],caption:"Jenis Kelamin",items:["Laki-laki","Perempuan"], tag:3});
		this.c_status = new saiCB(this.pc1.childPage[2],{bound:[290,15,260,20],caption:"Status",items:["Menikah","Belum Menikah"], tag:3});
		this.e_tempat = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,33,260,20],caption:"Tempat Lahir",tag:3});					
		this.l_tgl3 = new portalui_label(this.pc1.childPage[2],{bound:[290,33,100,20],caption:"Tgl Lahir", underline:true});	
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[2],{bound:[390,33,160,20]});
		this.e_id = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,260,20],caption:"No. KTP/ID",  tag:3});
		this.e_ibu = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,32,260,20],caption:"Nama Ibu",tag:2,mustCheck:false});		
		this.e_nopass = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,36,260,20],caption:"No Passport", tag:3});
		this.l_issued = new portalui_label(this.pc1.childPage[2],{bound:[20,37,100,20],caption:"Issued", tag:3, underline:true});
		this.dp_issued = new portalui_datePicker(this.pc1.childPage[2],{bound:[120,37,160,20]});
		this.l_ex_pass = new portalui_label(this.pc1.childPage[2],{bound:[290,37,100,20],caption:"Expired", underline:true});
		this.dp_ex_pass = new portalui_datePicker(this.pc1.childPage[2],{bound:[390,37,160,20]});
		this.e_ki = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,38,260,20],caption:"Kantor Imigrasi",tag:3});
		this.c_pakaian = new saiCB(this.pc1.childPage[2],{bound:[20,31,180,20],caption:"Ukuran Pakaian", tag:3, items:["S","XS","L","2L","3L","4L","5L","6L","7L","8L","10"]});	
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,530,20],caption:"Alamat",tag:3});
		this.e_kp = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,180,20],caption:"Kode Pos",  tag:3,tipetext:ttAngka, maxLength:5});	
		this.e_tel = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,18,260,20],caption:"No Telepon", tag:3});
		this.e_hp = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,50,260,10],caption:"HP", tag:3});							
		this.e_email = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,260,20],labelWidth:100, caption:"Email", tag:3});
		this.e_ec_hp = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,49,260,20],caption:"HP Emergency",  tag:3});
		this.e_ec_telp = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,46,260,20],caption:"Telp Emergency", tag:3});
		this.cb_kerja = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,16,280,20],caption:"Pekerjaan",multiSelection:false,tag:3,change:[this,"doChange"]});		//rightLabelVisible:false,
		this.e_bank = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,260,20],caption:"Bank",  tag:3});				
		this.e_norek = new saiLabelEdit(this.pc1.childPage[2],{bound:[290,17,260,20],caption:"No Rekening",  tag:3});
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,35,260,20],caption:"Cabang", tag:3});
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[2],{bound:[290,35,260,20],caption:"Nama Rekening", tag:3});
		this.c_sp = new saiCB(this.pc1.childPage[2],{bound:[20,40,210,20],caption:"Status Pemesanan",items:["Belum Pernah","Pernah"], tag:9});
		this.e_th_um = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,48,210,20],caption:"Umroh Terakhir", tag:9})
		this.e_th_haj = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,47,210,20],caption:"Th Haji Terakhir", tag:9});

		this.c_agen = new saiCBBL(this.pc1.childPage[3],{bound:[20,27,260,20],caption:"Agen", tag:2, change:[this,"doChange"],multiSelection:false});	
		this.e_marketing = new saiCBBL(this.pc1.childPage[3],{bound:[20,25,260,20],caption:"Marketing", tag:2,multiSelection:false});
		this.c_info = new saiCB(this.pc1.childPage[3],{bound:[20,30,240,20],caption:"Sumber Informasi", tag:2, items:["Brosur","Internet (Web)","Baligho","Surat Kabar","Marketing","Agen Umrah"]});	

		this.sg5 = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
					colTitle:["Kode Dokumen","Nama","Jenis"],
					colWidth:[[2,1,0],[100,250,100]],
					readOnly:true,						
					autoAppend:false,defaultRow:1 });
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[4],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg5});
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[5,14,990,305], childPage:["Biaya Tambahan","Biaya Dokumen"]});				
		this.sg4 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["Kode","Nama Biaya","Tarif","Jumlah","Total"],
					colWidth:[[4,3,2,1,0],[100,80,100,400,100]],
					columnReadOnly:[true,[0,1,4],[2,3]],					
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],
					autoAppend:false,defaultRow:1,change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"]});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4});
				
		this.sg6 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
					colTitle:["Kode","Nama Biaya","Tarif","Jumlah","Total"],
					colWidth:[[4,3,2,1,0],[100,80,100,400,100]],
					columnReadOnly:[true,[0,1,2,4],[3]],					
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],
					autoAppend:false,defaultRow:1,
					change:[this,"doChangeCell6"],nilaiChange:[this,"doNilaiChange6"]});
		this.sgn6 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg6});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);		

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
					
		}catch(e){
			systemAPI.alert(e);
		}
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			this.stsSimpan = 1;
			uses("util_standar");
			this.standarLib = new util_standar();									
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);								
			this.c_room.setSQL("select no_type,nama from dgw_typeroom where kode_lokasi='"+this.app._lokasi+"'",["no_type","nama"],false,["Kode","Nama"],"and","Data Room",true);								
			this.cb_kerja.setSQL("select id_pekerjaan, nama from dgw_pekerjaan where kode_lokasi = '"+this.app._lokasi+"'",["id_pekerjaan","nama"],false,["ID Pekerjaan","Nama"],"and","Data Pekerjaan",true);								
			this.cb_peserta.setSQL("select no_peserta, nama from dgw_peserta where kode_lokasi='"+this.app._lokasi+"' ",["no_peserta","nama"],false,["No Jamaah","Nama"],"and","Data Jamaah",false);
			this.cb_ref.setSQL("select no_peserta, nama from dgw_peserta where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["no_peserta","nama"],false,["No Jamaah","Nama"],"and","Data Jamaah",false);
			this.cb_ref2.setSQL("select no_peserta, nama from dgw_peserta where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["no_peserta","nama"],false,["No Jamaah","Nama"],"and","Data Jamaah",false);
			this.cb_paket.setSQL("select no_paket, nama from dgw_paket where kode_lokasi='"+this.app._lokasi+"' ",["no_paket","nama"],false,["Kode","Nama"],"and","Data Paket",true);
			this.c_agen.setSQL("select no_agen, nama_agen from dgw_agent where kode_lokasi='"+this.app._lokasi+"' ",["no_agen","nama_agen"],false,["Kode","Nama"],"and","Data Agen",true);
			this.e_marketing.setSQL("select no_marketing, nama_marketing from dgw_marketing where kode_lokasi='"+this.app._lokasi+"' ",["no_marketing","nama_marketing"],false,["Kode","Nama"],"and","Data Marketing",false);
			
			this.cb_jpaket.setSQL("select kode_harga, nama from dgw_jenis_harga where kode_lokasi='"+this.app._lokasi+"' ",["kode_harga","nama"],false,["Kode Harga","Nama"],"and","Data Jenis Paket",true);
			this.cb_ref2.setText("-","-")	
			this.doLoadParam();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_prod_fReg.extend(window.childForm);
window.app_saku3_transaksi_travel_prod_fReg.implement({
	doLoadParam:function(sender){
		try {
			var strSQL = "select kode_biaya, nama, nilai from dgw_biaya where jenis = 'TAMBAHAN' and kode_lokasi='"+this.app._lokasi+"'";					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg4.appendData([line.kode_biaya,line.nama,floatToNilai(line.nilai),"0","0"]);
				}
			} else this.sg4.clear(1);		
			this.sg4.validasi();
			
			var strSQL = "select kode_biaya, nama, nilai from dgw_biaya where jenis = 'DOKUMEN' and kode_lokasi='"+this.app._lokasi+"'";					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg6.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg6.appendData([line.kode_biaya,line.nama,floatToNilai(line.nilai),"0","0"]);
				}
			} else this.sg6.clear(1);		
			this.sg6.validasi();
			
			var strSQL = "select no_dokumen, deskripsi, jenis from dgw_dok where kode_lokasi='"+this.app._lokasi+"'";					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg5.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg5.appendData([line.no_dokumen,line.deskripsi,line.jenis]);
				}
			} else this.sg5.clear(1);		
			
		}
		catch(e) {
			alert(e);
		}
	},	
	doLoadPaket:function(sender){	 
		if (this.cb_paket.getText() != "" && this.cb_jadwal.getText() != "") {		
			if (this.cb_ref2.getText() == "-") var filterRef = "";	
			else var filterRef = " and a.no_peserta_ref ='"+this.cb_ref2.getText()+"' ";	

			var strSQL ="select a.no_reg, b.nama "+
						"from dgw_reg a "+
						"inner join dgw_peserta b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi  "+
						"where a.no_paket='"+this.cb_paket.getText()+"' and a.no_jadwal='"+this.cb_jadwal.rightLabelCaption+"' and a.kode_lokasi='"+this.app._lokasi+"' "+filterRef;			

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;	
				this.sg1.clear();			
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.no_reg,line.nama]);
				}
			}
			else this.sg1.clear(1);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,3,4,5])){
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from dgw_reg where no_reg='"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add("delete from dgw_reg_dok where no_reg='"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");					
						sql.add("delete from dgw_reg_biaya where no_reg='"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");											
						
						if(this.paket_lama != this.cb_paket.getText() && this.jadwal_lama != this.cb_jadwal.rightLabelCaption){						
							sql.add("insert into dgw_history_jadwal(no_reg,no_paket,no_jadwal,no_paket_lama,no_jadwal_lama,kode_lokasi) values "+
									"('"+this.cb_kode.getText()+"','"+this.cb_paket.getText()+"','"+this.cb_jadwal.rightLabelCaption+"','"+this.paket_lama+"','"+this.jadwal_lama+"','"+this.app._lokasi+"')");
						}
					}

					if(this.stsSimpan==1){						
						sql.add("insert into dgw_history_jadwal(no_reg,no_paket,no_jadwal,no_paket_lama,no_jadwal_lama,kode_lokasi) values "+
								"('"+this.cb_kode.getText()+"','"+this.cb_paket.getText()+"','"+this.cb_jadwal.rightLabelCaption+"','-','-','"+this.app._lokasi+"')");
					}

					//NON-agen tidak ada fee
					if (this.c_agen.getText() == "NON") var noFee = "X";
					else var noFee = "-";

					sql.add("insert into dgw_reg(no_reg,tgl_input,no_peserta,no_paket,no_jadwal,no_agen,no_type,harga_room,info,kode_lokasi,no_quota,harga,uk_pakaian, no_marketing,kode_harga,periode, jenis,no_fee, no_peserta_ref, kode_pp, diskon) values "+
							"('"+this.cb_kode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_peserta.getText()+"','"+this.cb_paket.getText()+"','"+this.cb_jadwal.rightLabelCaption+"','"+this.c_agen.getText()+"','"+this.c_room.getText()+"','"+this.e_harga_room.getText()+"','"+this.c_info.getText()+"','"+this.app._lokasi+"',"+this.e_quota.getText()+","+nilaiToFloat(this.e_harga.getText())+",'"+this.c_pakaian.getText()+"', '"+this.e_marketing.getText()+"','"+this.cb_jpaket.getText()+"','"+this.e_periode.getText()+"','"+this.c_jenis.getText()+"','"+noFee+"','"+this.cb_ref.getText()+"','"+this.cb_pp.getText()+"',"+nilaiToFloat(this.e_diskon.getText())+")");
		
					if (this.sg5.getRowValidCount() > 0){
						for (var i=0;i < this.sg5.getRowCount();i++){
							if (this.sg5.rowValid(i)){
								sql.add("insert into dgw_reg_dok(no_reg,no_dok,ket,kode_lokasi,tgl_terima) values "+
										"('"+this.cb_kode.getText()+"','"+this.sg5.cells(0,i)+"','"+this.sg5.cells(2,i)+"','"+this.app._lokasi+"','2099-12-31')");
							}
						}						
					}
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){
								sql.add("insert into dgw_reg_biaya(no_reg,kode_biaya,tarif,jml,nilai,kode_lokasi) values "+
										"('"+this.cb_kode.getText()+"','"+this.sg4.cells(0,i)+"',"+nilaiToFloat(this.sg4.cells(2,i))+",'"+nilaiToFloat(this.sg4.cells(3,i))+"',"+nilaiToFloat(this.sg4.cells(4,i))+",'"+this.app._lokasi+"')");
							}
						}						
					}	
					if (this.sg6.getRowValidCount() > 0){
						for (var i=0;i < this.sg6.getRowCount();i++){
							if (this.sg6.rowValid(i)){
								sql.add("insert into dgw_reg_biaya(no_reg,kode_biaya,tarif,jml,nilai,kode_lokasi) values "+
										"('"+this.cb_kode.getText()+"','"+this.sg6.cells(0,i)+"',"+nilaiToFloat(this.sg6.cells(2,i))+","+nilaiToFloat(this.sg6.cells(3,i))+","+nilaiToFloat(this.sg6.cells(4,i))+",'"+this.app._lokasi+"')");
							}
						}						
					}	
					
					if (this.stsJamaah == 1) {
						sql.add("insert into dgw_peserta(no_peserta,kode_lokasi,id_peserta,nama,jk,status,alamat,kode_pos,telp,hp,email,pekerjaan,bank,cabang,norek,namarek,nopass,kantor_mig,sp,ec_telp,ec_hp,issued,ex_pass,tempat,tgl_lahir,th_haji,th_umroh,ibu) values "+
							    "('"+this.cb_peserta.getText()+"','"+this.app._lokasi+"','"+this.e_id.getText()+"','"+this.e_nama.getText()+"','"+this.c_jk.getText()+"','"+this.c_status.getText()+"','"+this.e_alamat.getText()+"','"+this.e_kp.getText()+"','"+this.e_tel.getText()+"','"+this.e_hp.getText()+"','"+this.e_email.getText()+"','"+this.cb_kerja.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.e_nopass.getText()+"','"+this.e_ki.getText()+"','"+this.c_sp.getText()+"','"+this.e_ec_telp.getText()+"','"+this.e_ec_hp.getText()+"','"+this.dp_issued.getDateString()+"','"+this.dp_ex_pass.getDateString()+"','"+this.e_tempat.getText()+"','"+this.dp_d3.getDateString()+"','"+this.e_th_haj.getText()+"','"+this.e_th_um.getText()+"','"+this.e_ibu.getText()+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();				
					
					sql.add("delete from dgw_reg where no_reg='"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from dgw_reg_dok where no_reg='"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");					
					sql.add("delete from dgw_reg_biaya where no_reg='"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");											
					
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1","2","3","4","5"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.sg4.clear(1);
				this.sg6.clear(1);
				this.doLoadPaket();
				this.doLoadParam();
				this.stsSimpan = 1;
				this.pc1.show();
				break;
			case "simpan" :
			case "ubah" :	
				this.preView = "1";
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;						
			case "hapus" :	
				this.preView = "0";
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}					
		if (this.stsSimpan == 1) {			
			this.doClick(this.i_gen);
		}
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {			
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dgw_reg","no_reg","REG/"+this.e_periode.getText().substr(2,4)+"/","0000"));

			this.doLoadParam();
			this.stsSimpan=1;
			this.cb_paket.setFocus();	
			setTipeButton(tbSimpan);	
		}			
		if (sender == this.i_gen2) {
			this.stsJamaah = 1;
			this.standarLib.clearByTag(this, new Array("3"),undefined);	
								
			var data2 = this.dbLib.getDataProvider("select substring(cast(year(getdate()) as varchar),3,2) as tahun",true);
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line = data2.rs.rows[0];							
				this.tahun = line.tahun;
			}
			this.cb_peserta.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dgw_peserta","no_peserta",this.tahun,"00000"));			
			this.cb_peserta.setSQL("select no_peserta, nama from dgw_peserta where kode_lokasi='"+this.app._lokasi+"' ",["no_peserta","nama"],false,["No Peserta","Nama"],"and","Data Peserta",false);			

			this.cb_ref.setText(this.cb_peserta.getText());
			this.cb_ref.setSQL("select no_peserta, nama from dgw_peserta where kode_lokasi='"+this.app._lokasi+"' ",["no_peserta","nama"],false,["No Peserta","Nama"],"and","Data Peserta",false);			
		}
	},	
	doChange: function(sender){		
		try{
			if (sender == this.cb_paket && this.cb_paket.getText() != "") {
				this.cb_jadwal.setText("","");
				this.cb_jadwal.setSQL("select convert(varchar,tgl_berangkat,103) as tgl_berangkat,no_jadwal from dgw_jadwal where no_closing='-' and no_paket='"+this.cb_paket.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["tgl_berangkat","no_jadwal"],false,["Jadwal","ID Jadwal"],"and","Data Jadwal",true);
			}
			
			if((sender == this.cb_paket || sender == this.cb_jpaket || sender == this.c_jenis) && this.cb_paket.getText() != "" && this.cb_jpaket.getText() != "" && this.c_jenis.getText() != "" && this.stsSimpan==1){
				var strSQL="select harga,harga_se,harga_e from dgw_harga where no_paket ='"+this.cb_paket.getText()+"' and kode_harga ='"+this.cb_jpaket.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" &&  data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];			
					if (this.c_jenis.getText() == "STANDAR") this.e_harga.setText(floatToNilai(line.harga));
					if (this.c_jenis.getText() == "SEMI") this.e_harga.setText(floatToNilai(line.harga_se));
					if (this.c_jenis.getText() == "EKSEKUTIF") this.e_harga.setText(floatToNilai(line.harga_e));						
				}
			} 

			if ((sender == this.cb_jadwal || this.cb_paket || this.cb_ref2 ) && this.cb_jadwal.getText() != "" && this.cb_paket.getText() != "" ) {													
				this.doLoadPaket(); 

				var strSQL="select a.tgl_berangkat,a.lama_hari,b.kode_curr "+
				           "from dgw_jadwal a "+
				           "inner join dgw_paket b on a.no_paket=b.no_paket and a.kode_lokasi=b.kode_lokasi "+
				           "where a.no_paket='"+this.cb_paket.getText()+"' and a.no_jadwal='"+this.cb_jadwal.rightLabelCaption+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" &&  data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];					
					this.dp_d2.setText(line.tgl_berangkat);	
					this.c_curr.setText(line.kode_curr);													
					this.e_lama.setText(floatToNilai(line.lama_hari));						
				}			

				if (this.c_jenis.getText() == "STANDAR") var strSQL="select quota as quota1 from dgw_jadwal where no_paket= '"+this.cb_paket.getText()+"' and no_jadwal = '"+this.cb_jadwal.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'";				
				if (this.c_jenis.getText() == "SEMI") var strSQL="select quota_se as quota1 from dgw_jadwal where no_paket= '"+this.cb_paket.getText()+"' and no_jadwal = '"+this.cb_jadwal.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'";				
				if (this.c_jenis.getText() == "EKSEKUTIF") var strSQL="select quota_e as quota1 from dgw_jadwal where no_paket= '"+this.cb_paket.getText()+"' and no_jadwal = '"+this.cb_jadwal.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'";				

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" &&  data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.quota1 = parseFloat(line.quota1);						
				}
				var strSQL="select COUNT(*) as jumlah from dgw_reg where no_paket= '"+this.cb_paket.getText()+"' and no_jadwal= '"+this.cb_jadwal.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" &&  data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.jumlah = parseFloat(line.jumlah);						
				}
				var quota = this.quota1 - this.jumlah;
				this.e_quota.setText(quota);								
			}
				
			if (sender == this.c_room  && this.c_room.getText() != ""  && this.c_curr.getText() != "" && this.stsSimpan==1){
				var strSQL = "select harga  "+
							 "from dgw_typeroom "+							 
				             "where kode_curr ='"+this.c_curr.getText()+"' and no_type='"+this.c_room.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.e_harga_room.setText(floatToNilai(line.harga));
					}
				}
			}
						
			if (sender == this.cb_peserta && this.cb_peserta.getText() != ""){
				this.stsJamaah = 0;
				var strSQL = "select id_peserta,nama,jk,status,telp,hp,email,alamat,kode_pos,ibu,email,pekerjaan,bank,cabang,norek,namarek,nopass,kantor_mig,sp,ec_telp,ec_hp,issued,ex_pass,tempat,tgl_lahir,th_haji,th_umroh  "+
							 "from dgw_peserta "+							 
				             "where no_peserta='"+this.cb_peserta.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.c_jk.setText(line.jk);
						this.e_id.setText(line.id_peserta);
						this.e_hp.setText(line.hp);
						this.e_tel.setText(line.telp);
						this.e_email.setText(line.email);
						this.c_status.setText(line.status);	
						this.e_kp.setText(line.kode_pos);
						this.cb_kerja.setText(line.pekerjaan);
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);	
						this.e_norek.setText(line.norek);
						this.e_namarek.setText(line.namarek);	
						this.e_nopass.setText(line.nopass);
						this.e_ki.setText(line.kantor_mig);
						this.c_sp.setText(line.sp);
						this.dp_issued.setText(line.issued);
						this.dp_ex_pass.setText(line.ex_pass);
						this.e_tempat.setText(line.tempat);
						this.dp_d3.setText(line.tgl_lahir);
						this.e_th_haj.setText(line.th_haji);
						this.e_th_um.setText(line.th_umroh);
						this.e_ec_hp.setText(line.ec_hp);
						this.e_ec_telp.setText(line.ec_telp);
						this.e_ibu.setText(line.ibu);						
					}					
				}
			}
			
			if (sender == this.c_agen && this.c_agen.getText() != ""){
				if (this.stsSimpan == 1) {
					var strSQL = "select kode_marketing from dgw_agent where no_agen= '"+this.c_agen.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";			
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){				
							this.e_marketing.setText(line.kode_marketing);
						}
					}
				}				
			}		
			
			if (sender == this.e_diskon && this.e_diskon.getText()!="") {
				this.sg4.validasi();				
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
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_dago_rptRegistrasi";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_reg='"+this.cb_kode.getText()+"' ";
								this.filter2 = this.app._namaUser;
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
								this.pc1.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.cb_kode.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
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
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","3","4","5","9"),this.e_nb);
			setTipeButton(tbAllFalse);
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.sg4.clear(1);
			this.sg6.clear(1);
			this.doLoadPaket();
			this.doLoadParam();
			this.stsSimpan = 1;
			this.pc1.show();
		} catch(e) {
			alert(e);
		}
	},					
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;	
				
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
			
				var strSQL="select a.kode_harga,a.harga, a.harga_room,a.no_paket, a.no_jadwal, convert(varchar,b.tgl_berangkat,103) as tgl_jadwal, a.no_type, b.tgl_berangkat, b.lama_hari, a.uk_pakaian, a.no_peserta, a.no_agen,a.no_jadwal,a.no_paket, a.no_marketing, a.info, a.jenis, a.no_peserta_ref, a.kode_pp, a.diskon  "+ 
						   "from dgw_reg a "+
						   "inner join dgw_jadwal b on a.no_paket=b.no_paket and a.kode_lokasi=b.kode_lokasi and a.no_jadwal=b.no_jadwal "+
						   "where a.no_reg='"+this.cb_kode.getText()+"'  and a.kode_lokasi='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" &&  data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];	
					this.paket_lama = line.no_paket;	
					this.jadwal_lama = line.no_jadwal;					
					this.dp_d2.setText(line.tgl_berangkat);	
					this.cb_paket.setText(line.no_paket);	
					this.cb_jadwal.setText(line.tgl_jadwal,line.no_jadwal);	
					this.e_lama.setText(line.lama_hari);
					this.c_room.setText(line.no_type);	
					this.cb_peserta.setText(line.no_peserta);
					this.c_pakaian.setText(line.uk_pakaian);	
					this.c_agen.setText(line.no_agen);	
					this.e_marketing.setText(line.no_marketing);	
					this.e_harga.setText(floatToNilai(line.harga));	
					this.e_harga_room.setText(floatToNilai(line.harga_room));
					this.cb_jpaket.setText(line.kode_harga);
					this.c_info.setText(line.info);	
					this.c_jenis.setText(line.jenis);	
					this.cb_ref.setText(line.no_peserta_ref);	
					this.cb_pp.setText(line.kode_pp);
					this.e_diskon.setText(floatToNilai(line.diskon));
				}
				var strSQL="select quota as quota1 from dgw_jadwal where no_paket= '"+this.cb_paket.getText()+"' and no_jadwal = '"+this.cb_jadwal.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" &&  data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.quota1 = parseFloat(line.quota1);						
				}
				var strSQL="select COUNT(*) as jumlah from dgw_reg where no_reg <> '"+this.cb_kode.getText()+"' and no_paket= '"+this.cb_paket.getText()+"' and no_jadwal= '"+this.cb_jadwal.rightLabelCaption+"' and kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" &&  data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.jumlah = line.jumlah;	
				}
				var quota = this.quota1 - this.jumlah;
				this.e_quota.setText(quota);


			//bisa nambah saat koreksi
			var strSQL = "select b.kode_biaya,isnull(a.tarif,0) as tarif,isnull(a.jml,0) as jml,isnull(a.nilai,0) as nilai,b.nama "+
						 "from  dgw_biaya b left join dgw_reg_biaya a on a.kode_biaya=b.kode_biaya and a.kode_lokasi=b.kode_lokasi and a.no_reg = '"+this.cb_kode.getText()+"' "+
						 "where b.jenis='TAMBAHAN' and b.kode_lokasi='"+this.app._lokasi+"' order by b.kode_biaya";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg4.appendData([line.kode_biaya,line.nama,floatToNilai(line.tarif),floatToNilai(line.jml),floatToNilai(line.nilai)]);
					}
				}

				var strSQL = "select a.kode_biaya,a.tarif,a.jml,a.nilai,b.nama "+
							 "from dgw_reg_biaya a "+
							 "inner join dgw_biaya b on a.kode_biaya=b.kode_biaya "+
							 "where b.jenis='DOKUMEN' and a.no_reg = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_biaya";					
				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg6.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg6.appendData([line.kode_biaya,line.nama,floatToNilai(line.tarif),floatToNilai(line.jml),floatToNilai(line.nilai)]);
					}
				}
			
				var strSQL = "select a.no_dok,a.ket,b.deskripsi "+
							 "from dgw_reg_dok a "+
							 "inner join dgw_dok b on a.no_dok=b.no_dokumen "+
							 "where a.no_reg = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_dok";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg5.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg5.appendData([line.no_dok,line.deskripsi,line.ket]);
					}
				}
						
			}
		} catch(e) {alert(e);}
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doChangeCell: function(sender, col, row){		
		if (col == 3) this.sg4.validasi();
	},
	doChangeCell6: function(sender, col, row){		
		if (col == 3) this.sg6.validasi();
	},
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(2,i) != "" && this.sg4.cells(3,i) != ""){
					this.sg4.cells(4,i,floatToNilai(Math.round(nilaiToFloat(this.sg4.cells(3,i)) * nilaiToFloat(this.sg4.cells(2,i)))));					
					tot += nilaiToFloat(this.sg4.cells(3,i)) * nilaiToFloat(this.sg4.cells(2,i));					
				}
			}			
			tot = tot - nilaiToFloat(this.e_diskon.getText());
			this.e_total.setText(floatToNilai(tot));								
		}catch(e)
		{
			systemAPI(e);
		}
	},
	doNilaiChange6: function(){
		try{			
			var tot2 = 0;			
			for (var i = 0; i < this.sg6.rows.getLength();i++){
				if (this.sg6.rowValid(i) && this.sg6.cells(2,i) != "" && this.sg6.cells(3,i) != ""){
					this.sg6.cells(4,i,floatToNilai(Math.round(nilaiToFloat(this.sg6.cells(3,i)) * nilaiToFloat(this.sg6.cells(2,i)))));					
					tot2 += nilaiToFloat(this.sg6.cells(3,i)) * nilaiToFloat(this.sg6.cells(2,i));					
				}
			}
			this.e_totaldok.setText(floatToNilai(tot2));						
		}catch(e)
		{
			systemAPI(e);
		}
	}
});