window.app_saku3_transaksi_sapyakes_fVendor = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fVendor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fVendor";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Vendor", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_lokasi = new saiCBBL(this,{bound:[20,13,200,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Vendor","Data Vendor","Histori PKS","Data Pendukung","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
		            colTitle:["Kode","Nama","Alamat","Kelompok","Bank Transfer","Bank","Rekening"],
					colWidth:[[6,5,4,3,2,1,0],[150,200,80,150,250,200,80]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,180,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1,change:[this,"doChange"]});	
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Alamat", maxLength:150, tag:1,change:[this,"doChange"]});					
		this.e_kodesap = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Kode Vendor SAP", maxLength:7, tag:1});									
		this.e_reksap = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,200,20],caption:"Kode Rek SAP", maxLength:10, tag:1});								
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"No Telpon", maxLength:50, tag:1});							
		this.e_fax = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"No Faximile", maxLength:50, tag:1});
		this.e_mail = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,250,20],caption:"Email", maxLength:50, tag:1});	
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[1],{bound:[290,15,230,20],caption:"NPWP", maxLength:50, tag:1});	
		this.e_alamat2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,500,20],caption:"Alamat NPWP", maxLength:150, tag:1});	
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,250,20],caption:"P I C", maxLength:50, tag:1});			
		this.e_pictel = new saiLabelEdit(this.pc1.childPage[1],{bound:[290,18,230,20],caption:"No Tel PIC", maxLength:50, tag:1});		
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,250,20],caption:"Bank", maxLength:50, tag:1});			
		this.c_btrans = new saiCB(this.pc1.childPage[1],{bound:[290,12,230,20],caption:"Bank Transfer",items:["MANDIRI","BNI","BRI"], readOnly:true,tag:2});		
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"Cabang", maxLength:50, tag:1});			
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,250,20],caption:"No Rekening", maxLength:50, tag:1});			
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,500,20],caption:"Nama Rekening", maxLength:50, tag:1});							
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,250,20],caption:"Penilaian", maxLength:50, tag:1});
		this.e_spek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,500,20],caption:"Spesifikasi", maxLength:200, tag:1});		
		this.cb_klp = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,270,20],caption:"Kelompok Vendor", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});						
		
		this.cb_akun1= new saiCBBL(this.pc1.childPage[1],{bound:[20,15,270,20],caption:"Akun Hutang1",  readOnly:true,tag:0});						
		this.cb_akun2 = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,270,20],caption:"Akun Hutang2", readOnly:true,tag:0});						
				
		this.cb_pph = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,270,20],caption:"Akun Hut. PPh", multiSelection:false, maxLength:10, tag:0});						
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,22,202,20],caption:"Jenis Kapitasi",items:["NON","KAPITASI"], readOnly:true,tag:2});	
		//this.c_flag = new saiCB(this.pc1.childPage[1],{bound:[20,23,202,20],caption:"Flag Kontrak",items:["0. YKT"], readOnly:true,tag:2});	//,"1. TM"
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,170],colCount:3,tag:9,
		            colTitle:["No PKS","Tgl Mulai","Tgl Selesai"],
					colWidth:[[2,1,0],[100,100,200]],
					buttonStyle:[[1,2],[bsDate,bsDate]], 
					autoAppend:true,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2,pager:[this,"doPager2"]});
		
		this.sgFile = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,150],colCount:4,tag:9,click:[this,"doSgBtnClick"],
		            colTitle:["Kode Jenis","Jenis Dokumen","Dokumen","File"],colWidth:[[3,2,1,0],[80,350,300,80]],readOnly:true,autoAppend:false,defaultRow:1});						
		this.sgnFile = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgFile});		
				
		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-45],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Dokumen","Upload"],
					    colWidth:[[3,2,1,0],[80,480,200,80]], 
						colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});		
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[4],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		this.pc1.childPage[3].rearrangeChild(10, 23);		
		this.pc1.childPage[4].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi<>'00'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);						
			this.cb_akun1.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '024' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_akun2.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '024' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_pph.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '024' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			
			this.onClose.set(this,"doClose");
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
			
			this.cb_lokasi.setText(this.app._lokasi);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fVendor.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fVendor.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into vendor(kode_vendor,kode_lokasi,nama,alamat,no_tel,email,npwp,pic,alamat2,bank,cabang,no_rek,nama_rek,no_fax,no_pictel,spek,kode_klpvendor,penilaian,bank_trans,akun_pph,jenis,kode_rek,kode_sap) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_mail.getText()+"','"+this.e_npwp.getText()+"','"+this.e_pic.getText()+"','"+this.e_alamat2.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.e_fax.getText()+"','"+this.e_pictel.getText()+"','"+this.e_spek.getText()+"','"+this.cb_klp.getText()+"','"+this.e_nilai.getText()+"','"+this.c_btrans.getText()+"','"+this.cb_pph.getText()+"','"+this.c_jenis.getText()+"','"+this.e_reksap.getText()+"','"+this.e_kodesap.getText()+"')"); //,'"+this.c_flag.getText().substr(0,1)+"'
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){							
							sql.add("insert into vendor_pks(kode_vendor,kode_lokasi,tgl_mulai,tgl_selesai,no_pks) values "+
									"('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.sg2.getCellDateValue(1,i)+"','"+this.sg2.getCellDateValue(2,i)+"','"+this.sg2.cells(0,i)+"')");							
						}	
					}
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into vendor_dok(kode_vendor,no_gambar,nu,kode_jenis,kode_lokasi)values('"+this.cb_kode.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.cb_lokasi.getText()+"')");								
						}	
					}
					
					sql.add("insert into sap_spe_gl (kode_mitra,jenis,kode_akun,spe_gl) values ('"+this.e_kodesap.getText()+"','VENDOR','"+this.cb_akun1.getText()+"','-') ");
					if (this.cb_akun1.getText()!=this.cb_akun2.getText()) {
						sql.add("insert into sap_spe_gl (kode_mitra,jenis,kode_akun,spe_gl) values ('"+this.e_kodesap.getText()+"','VENDOR','"+this.cb_akun2.getText()+"','1') ");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from vendor_dok where kode_vendor='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					sql.add("delete from vendor_pks where kode_vendor='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					sql.add("delete from sap_spe_gl where kode_mitra='"+this.e_kodesap.getText()+"'");
					
					sql.add("update vendor set nama='"+this.e_nama.getText()+"',alamat='"+this.e_alamat.getText()+"',no_tel='"+this.e_tel.getText()+"',email='"+this.e_mail.getText()+"',npwp='"+this.e_npwp.getText()+"',pic='"+this.e_pic.getText()+"',alamat2='"+this.e_alamat2.getText()+"',bank='"+this.e_bank.getText()+"',cabang='"+this.e_cabang.getText()+"',no_rek='"+this.e_norek.getText()+"',nama_rek='"+this.e_namarek.getText()+"',no_fax='"+this.e_fax.getText()+"',no_pictel='"+this.e_pictel.getText()+"',spek='"+this.e_spek.getText()+"',kode_klpvendor='"+this.cb_klp.getText()+"',penilaian='"+this.e_nilai.getText()+"',bank_trans='"+this.c_btrans.getText()+"',akun_pph='"+this.cb_pph.getText()+"',jenis='"+this.c_jenis.getText()+"',kode_rek='"+this.e_reksap.getText()+"',kode_sap='"+this.e_kodesap.getText()+"' "+ //  flag='"+this.c_flag.getText().substr(0,1)+"'
					        "where kode_vendor = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){							
							sql.add("insert into vendor_pks(kode_vendor,kode_lokasi,tgl_mulai,tgl_selesai,no_pks) values "+
									"('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.sg2.getCellDateValue(1,i)+"','"+this.sg2.getCellDateValue(2,i)+"','"+this.sg2.cells(0,i)+"')");							
						}	
					}
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;								
							sql.add("insert into vendor_dok(kode_vendor,no_gambar,nu,kode_jenis,kode_lokasi)values('"+this.cb_kode.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.cb_lokasi.getText()+"')");								
						}							
					}
					for (var i in this.listFiles.objList) {
						var ketemu = false;
						for (var j=0;j < this.sgUpld.getRowCount();j++){
							ketemu = i == this.sgUpld.cells(2,j);
							if (ketemu) break;
						}
						if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
					}
					
					sql.add("insert into sap_spe_gl (kode_mitra,jenis,kode_akun,spe_gl) values ('"+this.e_kodesap.getText()+"','VENDOR','"+this.cb_akun1.getText()+"','-') ");
					if (this.cb_akun1.getText()!=this.cb_akun2.getText()) {
						sql.add("insert into sap_spe_gl (kode_mitra,jenis,kode_akun,spe_gl) values ('"+this.e_kodesap.getText()+"','VENDOR','"+this.cb_akun2.getText()+"','1') ");
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
					sql.add("delete from vendor_dok where kode_vendor='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					sql.add("delete from vendor_pks where kode_vendor='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					sql.add("delete from vendor where kode_vendor = '"+this.cb_kode.getText()+"'");			
					sql.add("delete from sap_spe_gl where kode_mitra='"+this.e_kodesap.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					
					this.deletedFiles = "";	
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							if (this.deletedFiles != "") this.deletedFiles += ";";
							this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(2,i);
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					this.sgUpld.clear(1); this.sg2.clear(1); this.sgFile.clear(1);
					this.doLoad();
					setTipeButton(tbAllFalse);
				}
				break;
			case "simpan" :	
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
	doChange: function(sender){
		try{
			if (sender == this.cb_klp && this.cb_klp.getText() != ""){
				
				var strSQL = "select bp_hut,cc_hut  "+
				             "from vendor_klp "+
						     "where kode_klpvendor ='"+this.cb_klp.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
						this.cb_akun1.setText(line.bp_hut);
						this.cb_akun2.setText(line.cc_hut);
					}
				}
				
			}
			
			if (sender == this.cb_lokasi && this.cb_lokasi.getText() != "") {
				this.cb_klp.setSQL("select kode_klpvendor, nama from vendor_klp where kode_lokasi='"+this.cb_lokasi.getText()+"'",["kode_klpvendor","nama"],false,["Kode","Nama"],"and","Data Kelompok",true);			
				this.doLoad();
			}
			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select kode_vendor,nama,alamat,no_tel,email,npwp,alamat2,pic,bank,cabang,no_rek,nama_rek,no_fax,no_pictel,spek,kode_klpvendor,penilaian,bank_trans,akun_pph,jenis,kode_rek,kode_sap "+//,flag 
				             "from vendor "+
						     "where kode_vendor ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'";						   
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[strSQL, 
						 "select a.kode_jenis, b.nama, a.no_gambar, a.nu from vendor_dok a "+
						 " inner join dok_jenis b on b.kode_jenis = a.kode_jenis "+
						 " where a.kode_vendor = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.nu "]}),true);				
				if (typeof data == "object"){
					var line = data.result[0].rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_tel);						
						this.e_fax.setText(line.no_fax);						
						this.e_mail.setText(line.email);
						this.e_npwp.setText(line.npwp);
						this.e_alamat2.setText(line.alamat2);
						this.e_pic.setText(line.pic);						
						this.e_pictel.setText(line.no_pictel);
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.cb_klp.setText(line.kode_klpvendor)
						this.cb_pph.setText(line.akun_pph)
						this.e_spek.setText(line.spek);
						this.e_nilai.setText(line.penilaian);
						this.c_btrans.setText(line.bank_trans);
						this.c_jenis.setText(line.jenis);		
						this.e_kodesap.setText(line.kode_sap);
						this.e_reksap.setText(line.kode_rek);
			
						
						//if (line.flag == "0") this.c_flag.setText("0. YKT");
						//else this.c_flag.setText("1. TM");
						
						this.sgUpld.clear();
						this.deleteFiles = [];
						this.listFiles = new arrayMap();
						if (data.result[1].rs.rows[0] != undefined) {
							for (var i = 0; i < data.result[1].rs.rows.length; i++){
								line = data.result[1].rs.rows[i]; 
								this.listFiles.set(line.no_gambar,line.no_gambar); 
								this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar}]);
							}
						}							
						else this.sgUpld.clear(1);			
						var data = this.dbLib.getDataProvider("select a.kode_jenis, b.nama, a.no_gambar, a.nu from vendor_dok a "+
								   "inner join dok_jenis b on b.kode_jenis = a.kode_jenis "+
								   "where a.kode_vendor = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.nu ",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgFile.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sgFile.appendData([line.kode_jenis,line.nama,line.no_gambar,"Open"]);
							}
						} else this.sgFile.clear(1);			
						var data = this.dbLib.getDataProvider("select no_pks,convert(varchar,tgl_mulai,103) as tgl1,convert(varchar,tgl_selesai,103) as tgl2 "+
						           "from vendor_pks  "+								   
								   "where kode_vendor = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"' order by tgl_selesai desc",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg2.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg2.appendData([line.no_pks,line.tgl1,line.tgl2]);
							}
						} else this.sg2.clear(1);									
						setTipeButton(tbUbah);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
												
			}
			if (sender == this.e_alamat && this.e_alamat.getText() != ""){
				this.e_alamat2.setText(this.e_alamat.getText());
			}
			if (sender == this.e_nama && this.e_nama.getText() != ""){
				this.e_namarek.setText(this.e_nama.getText());
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Vendor",sender,undefined, 
											  "select kode_vendor, nama  from vendor where kode_lokasi='"+this.cb_lokasi.getText()+"'",
											  "select count(kode_vendor) from vendor where kode_lokasi='"+this.cb_lokasi.getText()+"'",
											  ["kode_vendor","nama"],"and",["Kode","Nama"],false);				
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
												  "select kode_jenis,nama   from dok_jenis where modul='LOG'",
												  "select count(kode_jenis) from dok_jenis where modul='LOG'",
												  ["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}					
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{
        	if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;                
                this.sgUpld.cells(2,row, data.tmpfile);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    },
	doSgBtnClick: function(sender, col, row){
		try{
			window.open("server/media/"+this.sgFile.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") var filter = " a.kode_vendor like '%"+this.e_kode2.getText()+"%' and ";
			else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' and ";
			
			var strSQL = "select a.kode_vendor,a.nama,a.alamat,a.kode_klpvendor+' - '+b.nama as klp,a.bank_trans,a.bank+' - '+a.cabang as bank,a.no_rek+' - '+a.nama_rek as rek,a.kode_klpvendor "+
						 "from vendor a inner join vendor_klp b on a.kode_klpvendor=b.kode_klpvendor and a.kode_lokasi=b.kode_lokasi  "+					 
						 "where "+filter+" a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.kode_klpvendor,a.kode_vendor";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {
			var strSQL = "select a.kode_vendor,a.nama,a.alamat,a.kode_klpvendor+' - '+b.nama as klp,a.bank_trans,a.bank+' - '+a.cabang as bank,a.no_rek+' - '+a.nama_rek as rek,a.kode_klpvendor "+
						 "from vendor a inner join vendor_klp b on a.kode_klpvendor=b.kode_klpvendor and a.kode_lokasi=b.kode_lokasi  "+					 
						 "where a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.kode_klpvendor,a.kode_vendor";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
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
			this.sg1.appendData([line.kode_vendor,line.nama,line.alamat,line.klp,line.bank_trans,line.bank,line.rek]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbah);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}
});