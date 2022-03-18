window.app_saku3_transaksi_uin_fBelanjaRev = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fBelanjaRev.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fBelanjaRev";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Revisi Anggaran Belanja", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.c_tahun = new portalui_saiLabelEdit(this,{bound:[20,22,200,20],caption:"Tahun Budget",readOnly:true,tag:2, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,444], childPage:["Daftar Revisi","Data Revisi","Data Donor","Data Penerima"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
		             colTitle:["No Bukti","Tanggal","Keterangan","Total","Pilih"],
					 colWidth:[[4,3,2,1,0],[70,100,300,100,100]],readOnly:true,
					 colFormat:[[3,4],[cfNilai,cfButton]],	
					 click:[this,"doSgBtnClick1"], colAlign:[[4],[alCenter]],													 
					 dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Revisi",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:200});				
		this.cb_ppd = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Fak/Unit Donor", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});		
		this.e_totalrd = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,16,200,20],caption:"Total Donor", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.cb_ppt = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Fak/Unit Penerima", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});		
		this.e_totalrt = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,17,200,20],caption:"Total Penerima", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					

		this.p0 = new panel(this.pc1.childPage[1],{bound:[1,23,997,317],caption:"Daftar Revisi"});							
		this.sg = new saiGrid(this.p0,{bound:[0,20,this.p0.width-5,this.p0.height-48],colCount:16,tag:0,
		            colTitle:["Status","Item Deskripsi","Kd Norma","Norma","Satuan","Harga","Vol Rev","Nilai Rev","Output","DOutput","Komponen","Dkomponen","KdAkun","IDitem","Idx","KdGiat"],
					colWidth:[[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,50,120,80,80,80,80,80,90,90,90,100,200,80,300,80]],					
					readOnly:true,
					colHide:[[2,8,9,10,11,12,13,14,15],[true,true]],
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],		
					nilaiChange:[this,"doNilaiChange"],				
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p0,{bound:[1,this.p0.height-25,this.p0.width-1,25],buttonStyle:2,grid:this.sg});		

		this.cb_giatd = new saiCBBL(this.pc1.childPage[2],{bound:[20,10,220,20],caption:"Kegiatan", multiSelection:false, maxLength:10, tag:8,change:[this,"doChange"]});
		this.cb_outd = new saiCBBL(this.pc1.childPage[2],{bound:[20,11,220,20],caption:"Output", multiSelection:false, maxLength:10, tag:8,change:[this,"doChange"]});
		this.cb_doutd = new saiCBBL(this.pc1.childPage[2],{bound:[20,12,220,20],caption:"Detail Output", multiSelection:false, maxLength:10, tag:8,change:[this,"doChange"]});
		this.cb_kompd = new saiCBBL(this.pc1.childPage[2],{bound:[20,13,220,20],caption:"Komponen", multiSelection:false, maxLength:10, tag:8,change:[this,"doChange"]});
		this.cb_dkompd = new saiCBBL(this.pc1.childPage[2],{bound:[20,14,220,20],caption:"Detail Komponen", multiSelection:false, maxLength:10, tag:8,change:[this,"doChange"]});
		this.cb_akund = new saiCBBL(this.pc1.childPage[2],{bound:[20,15,220,20],caption:"Akun", multiSelection:false, maxLength:10, tag:8,change:[this,"doChange"]});		
		this.e_totald = new saiLabelEdit(this.pc1.childPage[2],{bound:[790,15,200,20],caption:"Nilai Donor", tag:8, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bDonor = new button(this.pc1.childPage[2],{bound:[655,15,80,18],caption:"+ Tambahkan",click:[this,"addDonor"]});						
		
		//donor
		this.p1 = new panel(this.pc1.childPage[2],{bound:[1,23,997,294],caption:"Data Donor"});							
		this.sgd = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-47],colCount:11,tag:8,
		            colTitle:["Idx","Item Deskripsi","Kd Norma","Norma","Satuan","Harga","Vol","Nilai Budget","Ni Donor","Vol Donor","IDitem"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,80,90,90,60,90,80,150,80,240,50]],					
					colHide:[[0,10],[true,true]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,9,10],[8]],					
					colFormat:[[5,6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],										
					change:[this,"doChangeCelld"],nilaiChange:[this,"doNilaiChanged"],					
					autoAppend:false,defaultRow:1});
		this.sgnd = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sgd});
		
		//terima
		this.cb_giatt = new saiCBBL(this.pc1.childPage[3],{bound:[20,10,220,20],caption:"Kegiatan", multiSelection:false, maxLength:10, tag:8,change:[this,"doChange"]});
		this.cb_outt = new saiCBBL(this.pc1.childPage[3],{bound:[20,11,220,20],caption:"Output", multiSelection:false, maxLength:10, tag:8,change:[this,"doChange"]});
		this.cb_doutt = new saiCBBL(this.pc1.childPage[3],{bound:[20,12,220,20],caption:"Detail Output", multiSelection:false, maxLength:10, tag:8,change:[this,"doChange"]});
		this.cb_kompt = new saiCBBL(this.pc1.childPage[3],{bound:[20,13,220,20],caption:"Komponen", multiSelection:false, maxLength:10, tag:8,change:[this,"doChange"]});
		this.cb_dkompt = new saiCBBL(this.pc1.childPage[3],{bound:[20,14,220,20],caption:"Detail Komponen", multiSelection:false, maxLength:10, tag:8,change:[this,"doChange"]});
		this.cb_akunt = new saiCBBL(this.pc1.childPage[3],{bound:[20,18,220,20],caption:"Akun", multiSelection:false, maxLength:10, tag:8,change:[this,"doChange"]});
		this.cb_idBukti = new saiCBBL(this.pc1.childPage[3],{bound:[20,15,220,20],caption:"IDitem", multiSelection:false, maxLength:10, tag:8,change:[this,"doChange"]});
		this.e_totalt = new saiLabelEdit(this.pc1.childPage[3],{bound:[790,15,200,20],caption:"Nilai Penerima", tag:8, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.bCopy = new button(this.pc1.childPage[3],{bound:[555,15,80,18],caption:"Copy IDitem",click:[this,"doCopy"]});						
		this.bTerima = new button(this.pc1.childPage[3],{bound:[655,15,80,18],caption:"+ Tambahkan",click:[this,"addTerima"]});						

		this.p2 = new panel(this.pc1.childPage[3],{bound:[1,23,997,271],caption:"Data Penerima"});							
		this.sgt = new saiGrid(this.p2,{bound:[0,20,this.p2.width-5,this.p2.height-47],colCount:9,tag:8,
		            colTitle:["Item Deskripsi","Kd Norma","Norma","Satuan","Harga","Ni Terima","Vol Terima","IDItem","Idx"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[50,100,90,90,90,100,180,80,330]],					
					columnReadOnly:[true,[2,3,4,6,7,8],[0,1,5]],									
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],					
					buttonStyle:[[1],[bsEllips]],ellipsClick:[this,"doEllipsClickt"],
					change:[this,"doChangeCellt"],nilaiChange:[this,"doNilaiChanget"],
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPastet"],
					autoAppend:true,defaultRow:1});
		this.sgnt = new portalui_sgNavigator(this.p2,{bound:[1,this.p2.height-25,this.p2.width-1,25],buttonStyle:2,grid:this.sgt});
	
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		
			this.cb_ppd.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Fakultas/Unit",true);			
			this.cb_ppd.setText(this.app._kodePP);
			this.cb_ppt.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Fakultas/Unit",true);			
			this.cb_ppt.setText(this.app._kodePP);

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			var strSQL = "select distinct a.kdsatker,a.kdprogram,a.kddept,a.kdunit "+
						 "from uin_user a where a.nik ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.kddept = line.kddept;
					this.kdunit = line.kdunit;						
					this.kdsatker = line.kdsatker;
					this.kdprogram = line.kdprogram;																
				}
			}

			this.cb_giatd.setSQL("select distinct a.kdgiat, a.nmgiat from uin_giat a inner join uin_user b on a.kddept=b.kddept and a.kdunit=b.kdunit and a.kdprogram=b.kdprogram and a.kdgiat=b.kdgiat where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kdgiat","nmgiat"],false,["Kode","Nama"],"and","Data Kegiatan",true);		
			this.cb_giatt.setSQL("select distinct a.kdgiat, a.nmgiat from uin_giat a inner join uin_user b on a.kddept=b.kddept and a.kdunit=b.kdunit and a.kdprogram=b.kdprogram and a.kdgiat=b.kdgiat where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kdgiat","nmgiat"],false,["Kode","Nama"],"and","Data Kegiatan",true);	
			
			var sql = new server_util_arrayList();			
			sql.add("select kode_norma,nama from uin_norma where jenis='BELANJA' and kode_lokasi = '"+this.app._lokasi+"' and flag_aktif='1' and tahun='"+this.c_tahun.getText()+"' ");	
			this.dbLib.getMultiDataProviderA(sql);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fBelanjaRev.extend(window.childForm);
window.app_saku3_transaksi_uin_fBelanjaRev.implement({	
	cekCBBLd: function() {		
		this.statusCBd = true;
		var data = this.dbLib.getDataProvider("select a.kdakun from uin_d_akun a inner join uin_akun b on a.kdakun=b.kdakun "+
											  "where a.thang='"+this.c_tahun.getText()+"' and kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit ='"+this.kdunit+"' and a.kdprogram = '"+this.kdprogram+"' and a.kdgiat='"+this.cb_giatd.getText()+"' and a.kdoutput='"+this.cb_outd.getText()+"' and a.kdsoutput='"+this.cb_doutd.getText()+"' and a.kdkmpnen='"+this.cb_kompd.getText()+"' and a.kdskmpnen='"+this.cb_dkompd.getText()+"' and a.kdakun='"+this.cb_akund.getText()+"' ",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line == undefined){			
				this.statusCBd = false;
			} 
		}		
	},
	cekCBBLt: function() {		
		this.statusCBt = true;
		var data = this.dbLib.getDataProvider("select a.kdakun from uin_d_akun a inner join uin_akun b on a.kdakun=b.kdakun "+
											  "where a.thang='"+this.c_tahun.getText()+"' and kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit ='"+this.kdunit+"' and a.kdprogram = '"+this.kdprogram+"' and a.kdgiat='"+this.cb_giatt.getText()+"' and a.kdoutput='"+this.cb_outt.getText()+"' and a.kdsoutput='"+this.cb_doutt.getText()+"' and a.kdkmpnen='"+this.cb_kompt.getText()+"' and a.kdskmpnen='"+this.cb_dkompt.getText()+"' and a.kdakun='"+this.cb_akunt.getText()+"' ",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line == undefined){			
				this.statusCBt = false;
			} 
		}		
	},	
	addDonor: function() {
		try {
			if (this.e_totald.getText()!="0") {
				if (this.sgd.getRowValidCount() > 0){
					this.cekCBBLd();
					if (!this.statusCBd) {
						system.alert(this,"Transaksi tidak valid.","Data Referensi Donor tidak konsisten (Output s/d Akun).");
						return false;
					}
					var stsValid = true;
					for (var i=0;i < this.sgd.getRowCount();i++){
						if (this.sgd.rowValid(i) && this.sgd.cells(8,i) != "0") {
							if (nilaiToFloat(this.sgd.cells(8,i))>nilaiToFloat(this.sgd.cells(7,i))) {
								stsValid = false;
								var k = i+1;
								system.alert(this,"Data tidak valid.","Nilai Donor melebihi saldo anggaran. (Baris : "+k+")");
								return false;
							}
						}
					}

					if (stsValid) {
						if (this.sg.cells(0,0) == "") this.sg.clear();
						for (var i=0;i < this.sgd.getRowCount();i++){
							if (this.sgd.rowValid(i) && this.sgd.cells(8,i) != "0") {						
								this.sg.appendData(["DONOR",this.sgd.cells(1,i),this.sgd.cells(2,i),this.sgd.cells(3,i),this.sgd.cells(4,i),this.sgd.cells(5,i),this.sgd.cells(9,i),this.sgd.cells(8,i),this.cb_outd.getText(),this.cb_doutd.getText(),this.cb_kompd.getText(),this.cb_dkompd.getText(),this.cb_akund.getText(),this.sgd.cells(10,i),this.sgd.cells(0,i),this.cb_giatd.getText()]);
							}
						}
					}
				}

				this.sgd.clear(1);
				this.cb_akund.setText("","");
				this.pc1.setActivePage(this.pc1.childPage[1]);
			} 
			else system.alert(this,"Data tidak boleh nol.","");
		}
		catch(e) {
			alert(e);
		}
	},
	addTerima: function() {
		try {
			if (this.e_totalt.getText()!="0") {
				if (this.sgt.getRowValidCount() > 0){		
					this.cekCBBLt();
					if (!this.statusCBt) {
						system.alert(this,"Transaksi tidak valid.","Data Referensi Penerima tidak konsisten (Output s/d Akun).");
						return false;
					}		
					if (this.sg.cells(0,0) == "") this.sg.clear();
					for (var i=0;i < this.sgt.getRowCount();i++){
						if (this.sgt.rowValid(i) && this.sgt.cells(5,i) != "0") {												
							this.sg.appendData(["TERIMA",this.sgt.cells(0,i),this.sgt.cells(1,i),this.sgt.cells(2,i),this.sgt.cells(3,i),this.sgt.cells(4,i),this.sgt.cells(6,i),this.sgt.cells(5,i),this.cb_outt.getText(),this.cb_doutt.getText(),this.cb_kompt.getText(),this.cb_dkompt.getText(),this.cb_akunt.getText(),this.sgt.cells(7,i),this.sgt.cells(8,i),this.cb_giatt.getText()]);
						}
					}				
				}

				this.sgt.clear(1);
				this.pc1.setActivePage(this.pc1.childPage[1]);
			}
			else system.alert(this,"Data tidak boleh nol.","");
		}
		catch(e) {
			alert(e);
		}
	},
	doCopy: function() {
		if (this.cb_idBukti.getText()!="") {
			var strSQL = "select distinct a.keterangan,a.kode_norma,b.nama,a.satuan,a.tarif "+
						 "from uin_usul_d a "+
						 "inner join uin_norma b on a.kode_norma=b.kode_norma and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
						 "where a.no_usul = '"+this.cb_idBukti.getText()+"' and a.nu="+this.cb_idBukti.rightLabelCaption+" and a.kode_lokasi='"+this.app._lokasi+"'";						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgt.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					this.sgt.appendData([line.keterangan,line.kode_norma,line.nama,line.satuan,floatToNilai(line.tarif),"0","0",this.cb_idBukti.getText(),this.cb_idBukti.rightLabelCaption]);
				}				
			} else this.sgt.clear(1);
		}
	},
	doAfterPastet: function(sender,totalRow){
		try {
			this.sgnt.setTotalPage(sender.getTotalPage());
			this.sgnt.rearrange();
			this.doNilaiChanget();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sgt.doSelectPage(page);
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
					var tahun=this.c_tahun.getText();

					//no_close diisi supaya budget bisa dipakai
					sql.add("insert into uin_usul_m(no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_close,tgl_input,nik_user,total,form,status,kode_pp2) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+tahun+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_ppd.getText()+"','"+this.app._userLog+"','"+this.e_nb.getText()+"',getdate(),'"+this.app._userLog+"',"+nilaiToFloat(this.e_totalrd.getText())+",'BLJREV','REVISI','"+this.cb_ppt.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)) {
								if (this.sg.cells(0,i) == "DONOR") {
									var dc = "C"; 
									var kodePP = this.cb_ppd.getText();	
									var idbukti = this.sg.cells(13,i);
									var nu = this.sg.cells(14,i);																	
								} 
								else {
									var dc = "D";		
									var kodePP = this.cb_ppt.getText();				
									if (this.sg.cells(13,i) == "-") {
										var idbukti = this.e_nb.getText();  //idbaru
										var nu = i;												
									}
									else {
										var idbukti = this.sg.cells(13,i); //idref
										var nu = this.sg.cells(14,i);
									}
									
								}
								
								//idbukti+nu adalah key dr nousul
								sql.add("insert into uin_usul_d(no_usul,kode_lokasi,nu,kode_norma,keterangan,satuan,tarif,vol,total,tahun,dc,kdsatker,kdprogram,kdgiat,kddept,kdunit,kdoutput,kdsoutput,kdkmpnen,kdskmpnen,kode_akun,kode_pp,idbukti,no_park) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+nu+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(4,i)+"',"+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+",'"+this.c_tahun.getText()+"','"+dc+"','"+this.kdsatker+"','"+this.kdprogram+"','"+this.sg.cells(15,i)+"','"+this.kddept+"','"+this.kdunit+"','"+this.sg.cells(8,i)+"','"+this.sg.cells(9,i)+"','"+this.sg.cells(10,i)+"','"+this.sg.cells(11,i)+"','"+this.sg.cells(12,i)+"','"+kodePP+"','"+idbukti+"','-')");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from uin_usul_m where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from uin_usul_d where no_usul = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sgd.clear(1); this.sgt.clear(1);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
				break;
			case "simpan" :	
			case "ubah" :					
				if (nilaiToFloat(this.e_totalrd.getText()) != nilaiToFloat(this.e_totalrt.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Revisi Donor dan Penerima tidak sama.");
					return false;
				}
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{			
			if ((sender == this.c_tahun || sender == this.cb_ppd || sender == this.cb_ppt) && this.c_tahun.getText() != "" && this.cb_ppd.getText()!="" && this.cb_ppt.getText()!=""){
				this.doLoad();									
			}

			if (sender == this.cb_giatd && this.cb_giatd.getText() != ""){								
				this.cb_outd.setSQL("select a.kdoutput, a.nmoutput from uin_output a inner join uin_pp_output b on a.kdoutput=b.kdoutput and a.kdgiat=b.kdgiat and b.kode_pp='"+this.cb_ppd.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' where a.kdgiat='"+this.cb_giatd.getText()+"'",["kdoutput","nmoutput"],false,["Kode","Nama"],"and","Data Output",true);
			}

			if (sender == this.cb_giatt && this.cb_giatt.getText() != ""){								
				this.cb_outt.setSQL("select a.kdoutput, a.nmoutput from uin_output a inner join uin_pp_output b on a.kdoutput=b.kdoutput and a.kdgiat=b.kdgiat and b.kode_pp='"+this.cb_ppt.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' where a.kdgiat='"+this.cb_giatt.getText()+"'",["kdoutput","nmoutput"],false,["Kode","Nama"],"and","Data Output",true);
			}

			if (sender == this.cb_outd && this.cb_outd.getText() != ""){								
				this.cb_doutd.setSQL("select kdsoutput, nmsoutput from uin_soutput "+
									 "where thang='"+this.c_tahun.getText()+"' and kddept='"+this.kddept+"' and kdunit ='"+this.kdunit+"' and kdprogram = '"+this.kdprogram+"' and kdgiat='"+this.cb_giatd.getText()+"' and kdoutput='"+this.cb_outd.getText()+"'"
									 ,["kdsoutput","nmsoutput"],false,["Kode","Nama"],"and","Data Output",true);
			}

			if (sender == this.cb_outt && this.cb_outt.getText() != ""){								
				this.cb_doutt.setSQL("select kdsoutput, nmsoutput from uin_soutput "+
									 "where thang='"+this.c_tahun.getText()+"' and kddept='"+this.kddept+"' and kdunit ='"+this.kdunit+"' and kdprogram = '"+this.kdprogram+"' and kdgiat='"+this.cb_giatt.getText()+"' and kdoutput='"+this.cb_outt.getText()+"'"
									 ,["kdsoutput","nmsoutput"],false,["Kode","Nama"],"and","Data Output",true);
			}

			if (sender == this.cb_doutd && this.cb_doutd.getText() != ""){				
				this.cb_kompd.setSQL("select kdkmpnen, nmkmpnen from uin_kmpnen "+
									 "where thang='"+this.c_tahun.getText()+"' and kddept='"+this.kddept+"' and kdunit ='"+this.kdunit+"' and kdprogram = '"+this.kdprogram+"' and kdgiat='"+this.cb_giatd.getText()+"' and kdoutput='"+this.cb_outd.getText()+"' and kdsoutput='"+this.cb_doutd.getText()+"' "
									 ,["kdkmpnen","nmkmpnen"],false,["Kode","Nama"],"and","Data Komponen",true);
			}
			if (sender == this.cb_doutt && this.cb_doutt.getText() != ""){				
				this.cb_kompt.setSQL("select kdkmpnen, nmkmpnen from uin_kmpnen "+
									 "where thang='"+this.c_tahun.getText()+"' and kddept='"+this.kddept+"' and kdunit ='"+this.kdunit+"' and kdprogram = '"+this.kdprogram+"' and kdgiat='"+this.cb_giatt.getText()+"' and kdoutput='"+this.cb_outt.getText()+"' and kdsoutput='"+this.cb_doutt.getText()+"' "
									 ,["kdkmpnen","nmkmpnen"],false,["Kode","Nama"],"and","Data Komponen",true);
			}

			if (sender == this.cb_kompd && this.cb_kompd.getText() != ""){				
				this.cb_dkompd.setSQL("select kdskmpnen, urskmpnen from uin_d_skmpnen "+
									  "where thang='"+this.c_tahun.getText()+"' and kdsatker='"+this.kdsatker+"' and kddept='"+this.kddept+"' and kdunit ='"+this.kdunit+"' and kdprogram = '"+this.kdprogram+"' and kdgiat='"+this.cb_giatd.getText()+"' and kdoutput='"+this.cb_outd.getText()+"' and kdsoutput='"+this.cb_doutd.getText()+"' and kdkmpnen='"+this.cb_kompd.getText()+"' "
									  ,["kdskmpnen","urskmpnen"],false,["Kode","Nama"],"and","Data Detail Komponen",true);
			}
			if (sender == this.cb_kompt && this.cb_kompt.getText() != ""){				
				this.cb_dkompt.setSQL("select kdskmpnen, urskmpnen from uin_d_skmpnen "+
									  "where thang='"+this.c_tahun.getText()+"' and kdsatker='"+this.kdsatker+"' and kddept='"+this.kddept+"' and kdunit ='"+this.kdunit+"' and kdprogram = '"+this.kdprogram+"' and kdgiat='"+this.cb_giatt.getText()+"' and kdoutput='"+this.cb_outt.getText()+"' and kdsoutput='"+this.cb_doutt.getText()+"' and kdkmpnen='"+this.cb_kompt.getText()+"' "
									  ,["kdskmpnen","urskmpnen"],false,["Kode","Nama"],"and","Data Detail Komponen",true);
			}

			if (sender == this.cb_dkompd && this.cb_dkompd.getText() != ""){				
				this.cb_akund.setSQL("select a.kdakun, b.nmakun from uin_d_akun a inner join uin_akun b on a.kdakun=b.kdakun "+
								 	 "where a.thang='"+this.c_tahun.getText()+"' and a.kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit ='"+this.kdunit+"' and a.kdprogram = '"+this.kdprogram+"' and a.kdgiat='"+this.cb_giatd.getText()+"' and a.kdoutput='"+this.cb_outd.getText()+"' and a.kdsoutput='"+this.cb_doutd.getText()+"' and a.kdkmpnen='"+this.cb_kompd.getText()+"' and a.kdskmpnen='"+this.cb_dkompd.getText()+"' "
									 ,["a.kdakun","a.nmakun"],false,["Kode","Nama"],"and","Data Akun",true);
			}
			if (sender == this.cb_dkompt && this.cb_dkompt.getText() != ""){				
				this.cb_akunt.setSQL("select a.kdakun, b.nmakun from uin_d_akun a inner join uin_akun b on a.kdakun=b.kdakun "+
								 	 "where a.thang='"+this.c_tahun.getText()+"' and a.kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit ='"+this.kdunit+"' and a.kdprogram = '"+this.kdprogram+"' and a.kdgiat='"+this.cb_giatt.getText()+"' and a.kdoutput='"+this.cb_outt.getText()+"' and a.kdsoutput='"+this.cb_doutt.getText()+"' and a.kdkmpnen='"+this.cb_kompt.getText()+"' and a.kdskmpnen='"+this.cb_dkompt.getText()+"' "
									 ,["a.kdakun","a.nmakun"],false,["Kode","Nama"],"and","Data Akun",true);
			}

			if (sender==this.cb_giatd || sender==this.cb_outd || sender==this.cb_doutd || sender==this.cb_kompd || sender==this.cb_dkompd || sender==this.cb_akund) {
				if (this.cb_giatd.getText()!="" && this.cb_outd.getText()!="" && this.cb_doutd.getText()!="" && this.cb_kompd.getText()!="" && this.cb_dkompd.getText()!="" && this.cb_akund.getText()!="") {					
					this.loadBudgetd();					
				}
			}

			if (sender==this.cb_giatt || sender==this.cb_outt || sender==this.cb_doutt || sender==this.cb_kompt || sender==this.cb_dkompt || sender==this.cb_akunt) {
				if (this.cb_giatt.getText()!="" && this.cb_outt.getText()!="" && this.cb_doutt.getText()!="" && this.cb_kompt.getText()!="" && this.cb_dkompt.getText()!="" && this.cb_akunt.getText()!="") {					
					this.cb_idBukti.setSQL("select distinct a.idbukti,a.nu,a.keterangan from uin_usul_d a "+
											"where a.tahun='"+this.c_tahun.getText()+"' and a.kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit ='"+this.kdunit+"' and a.kdprogram = '"+this.kdprogram+"' and a.kdgiat='"+this.cb_giatt.getText()+"' and a.kdoutput='"+this.cb_outt.getText()+"' and a.kdsoutput='"+this.cb_doutt.getText()+"' and a.kdkmpnen='"+this.cb_kompt.getText()+"' and a.kdskmpnen='"+this.cb_dkompt.getText()+"' and a.kode_akun='"+this.cb_akunt.getText()+"' "											
									       ,["a.idbukti","a.nu","a.keterangan"],false,["IDitem","Idx","Deskripsi"],"and","Data Usulan",true);
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	loadBudgetd:function() {
		try{			
			var strSQL = "select distinct a.idbukti,a.nu,a.keterangan,c.kode_norma,c.nama,a.satuan,a.tarif,0 as vol,0 as total "+
						 "from uin_usul_d a "+
						 "inner join uin_usul_m b on a.idbukti=b.no_usul and a.kode_lokasi=b.kode_lokasi and b.no_close <> '-' "+
						 "inner join uin_norma c on a.kode_norma=c.kode_norma and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+
						 "where a.tahun='"+this.c_tahun.getText()+"' and a.kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit='"+this.kdunit+"' and a.kdprogram='"+this.kdprogram+"' and a.kdgiat='"+this.cb_giatd.getText()+"' and a.kdoutput='"+this.cb_outd.getText()+"' and a.kdsoutput='"+this.cb_doutd.getText()+"' and a.kdkmpnen='"+this.cb_kompd.getText()+"' and a.kdskmpnen='"+this.cb_dkompd.getText()+"' and "+
						 "      a.kode_pp='"+this.cb_ppd.getText()+"' and a.kode_akun='"+this.cb_akund.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+						 
						 "order by a.idbukti,a.nu";								 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgd.clear();
				var vol = total = 0;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];

					//saldo database
					var dataGar = this.dbLib.getDataProvider("select fn_uinGarDetail('"+this.cb_ppd.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.kdsatker+"','"+this.kddept+"','"+this.kdunit+"','"+this.kdprogram+"','"+this.cb_giatd.getText()+"','"+this.cb_outd.getText()+"','"+this.cb_doutd.getText()+"','"+this.cb_kompd.getText()+"','"+this.cb_dkompd.getText()+"','"+this.cb_akund.getText()+"','"+line.idbukti+"',"+line.nu+",'-') as gar ",true);					
					if (typeof dataGar == "object" && dataGar.rs.rows[0] != undefined){
						var lineGar = dataGar.rs.rows[0];						
						dataGar = lineGar.gar.split(";");						
						total = parseFloat(dataGar[0]);
						vol = parseFloat(dataGar[1]);				
					}
					
					//pengurang temp
					for (var j=0;j < this.sg.getRowCount();j++) {
						if ((this.sg.cells(0,j) == "DONOR") && (line.idbukti+line.nu == this.sg.cells(13,j)+this.sg.cells(14,j))) {
							vol = vol - nilaiToFloat(this.sg.cells(6,j));
							total = total - nilaiToFloat(this.sg.cells(7,j));
						}
					}
				
					this.sgd.appendData([line.nu,line.keterangan,line.kode_norma,line.nama,line.satuan,floatToNilai(line.tarif),floatToNilai(vol),floatToNilai(total),"0","0",line.idbukti]);
				}
				this.sgd.validasi();
			} else this.sgd.clear(1);
			
		}
		catch(e) {
			alert(e);
		}
	},	
	doSelectDate: function(sender, y,m,d){		
		this.c_tahun.setText(y);
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);			
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1); 
				this.sgd.clear(1); 
				this.sgt.clear(1); 				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"uin_usul_m","no_usul",this.app._lokasi+"-RVB"+this.c_tahun.getText().substr(2,2)+".","00000"));			
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},
	doNilaiChange: function(){
		try{
			var totD=totC=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != ""){					
					if (this.sg.cells(0,i) == "DONOR") totC += nilaiToFloat(this.sg.cells(7,i));					
					if (this.sg.cells(0,i) == "TERIMA") totD += nilaiToFloat(this.sg.cells(7,i));					
				}
			}
			this.e_totalrt.setText(floatToNilai(totD));			
			this.e_totalrd.setText(floatToNilai(totC));			
		}catch(e)
		{
			alert("doNilaiChange: "+e);
		}
	},
	doChangeCelld: function(sender, col, row){
		try {
			//yang di hitung vol = nilai donor/harga sat
			if ((col == 8) && (this.sgd.cells(8,row) != "")) {				
				var jum = nilaiToFloat(this.sgd.cells(8,row)) / nilaiToFloat(this.sgd.cells(5,row));
				this.sgd.cells(9,row,parseFloat(jum));

				this.sgd.validasi();
			}
		}catch(e)
		{
			alert("doChangeCelld: "+e);
		}
	},
	doNilaiChanged: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sgd.rows.getLength();i++){
				if (this.sgd.rowValid(i) && this.sgd.cells(8,i) != ""){					
					tot += nilaiToFloat(this.sgd.cells(8,i));					
				}
			}
			this.e_totald.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("doNilaiChanged: "+e);
		}
	},
	doEllipsClickt: function(sender, col, row) {
		try
		{
			switch(col){
				case 1 :
						this.standarLib.showListDataForSG(this, "Daftar Norma",sender, sender.row, sender.col, 
														"select kode_norma, nama  from uin_norma where jenis='BELANJA' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'",
														"select count(*) from uin_norma where jenis='BELANJA' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'",
														 new Array("kode_norma","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("doEllipsClickt: " + e);
		}
	},				
	doChangeCellt: function(sender, col, row){
		try {
			if (col == 0) {
				this.sgt.cells(7,row,"-");
				this.sgt.cells(8,row,"-");
			}
			if ((col == 5) && (this.sgt.cells(5,row) != "")) {
				var jum = nilaiToFloat(this.sgt.cells(5,row)) / nilaiToFloat(this.sgt.cells(4,row));
				this.sgt.cells(6,row,parseFloat(jum));
				this.sgt.validasi();
			}

			sender.onChange.set(undefined,undefined);
			if (col == 1) {
				if (sender.cells(1,row) != "") {				
					var norma = this.dataNorma.get(sender.cells(1,row));
					if (norma) {
						sender.cells(2,row,norma);

						var data = this.dbLib.getDataProvider("select * from uin_norma where kode_norma='"+sender.cells(1,row)+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"' ",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){							
								sender.cells(3,row,line.satuan);
								sender.cells(4,row,line.nilai);
							}
						}
					}
					else {                                    
						if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Norma "+sender.cells(1,row)+" tidak ditemukan","Inputkan kode lainnya.","checkNorma");                
						sender.cells(2,row,"");
						sender.cells(3,row,"");
						sender.cells(4,row,"");
					}				
				}
			}		
			sender.onChange.set(this,"doChangeCellt");	
		}
		catch(e) {
			alert("doChangeCellt: " + e);
		}	
	},
	doNilaiChanget: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sgt.rows.getLength();i++){
				if (this.sgt.rowValid(i) && this.sgt.cells(5,i) != ""){					
					tot += nilaiToFloat(this.sgt.cells(5,i));					
				}
			}
			this.e_totalt.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("doNilaiChanget: "+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"Transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;
					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataNorma = new portalui_arrayMap();																										
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataNorma.set(line.kode_norma, line.nama);										
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
		try{		
			//acuan pp = pp donor yg budgetnya berkurang
			var strSQL = "select a.no_usul,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.total "+
						 "from uin_usul_m a "+
						 "where a.form='BLJREV' and a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.c_tahun.getText()+"' and a.kode_pp='"+this.cb_ppd.getText()+"' and a.status='REVISI' order by a.no_usul desc";													
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);						
		}
		catch(e) {
			alert(e);
		}
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_usul,line.tgl,line.keterangan,floatToNilai(line.total),"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgBtnClick1: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick(this.sg1,0,row);						
		}catch(e){
			alert(e);
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.e_nb.setText(this.sg1.cells(0,row));	
														
				var data = this.dbLib.getDataProvider("select * from uin_usul_m where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.dp_d1.setText(line.tanggal);					
						this.cb_ppd.setText(line.kode_pp);
						this.cb_ppt.setText(line.kode_pp2);
						this.e_ket.setText(line.keterangan);						
					} 
				}			
				var strSQL = "select a.*, b.nama, case a.dc when 'D' then 'TERIMA' else 'DONOR' end as status "+
							 "from uin_usul_d a "+
							 "inner join uin_norma b on a.kode_norma=b.kode_norma and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
							 "where a.no_usul = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];	
						this.sg.appendData([line.status.toUpperCase(),line.keterangan,line.kode_norma,line.nama,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total),line.kdoutput,line.kdsoutput,line.kdkmpnen,line.kdskmpnen,line.kode_akun,line.idbukti,line.nu,line.kdgiat]);
					}
					this.sg.validasi();
				} else this.sg.clear(1);	
				
			}
		} catch(e) {alert(e);}
	}
});