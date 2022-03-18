window.app_saku2_transaksi_kopeg_logistik_fTerimaE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_logistik_fTerimaE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_logistik_fTerimaE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan Barang : Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 				
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_vendor = new saiCBBL(this,{bound:[20,14,220,20],caption:"Vendor", readOnly:true});
		this.cb_po = new saiCBBL(this,{bound:[20,15,220,20],caption:"No PO", readOnly:true});								
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.e_pic = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"Pengirim", maxLength:50});		
		this.bGen = new button(this,{bound:[835,16,80,18],caption:"Detail",click:[this,"doDetail"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,280], childPage:["Data Item PO","Detail Barang","Dokumen Pendukung"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:13,
		            colTitle:["ID","Item Barang","Merk","Tipe","Harga","Sisa Jml PO","Jml Terima","Kode Akun","Kode Klp","Nama Klp","Kode Unit","Nama","Kode Dana"], 
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,150,80,150,80,80,80,80,80,150,150,200,100]],
					buttonStyle:[[8,10],[bsEllips,bsEllips]], 
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,7,8,9,10,11,12],[6]], 					
					ellipsClick:[this,"doEllipsClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,
		            colTitle:["ID","No Tag","Item Barang","Merk","Tipe","No Seri","Harga","Kode Akun","Klp Aset","Kode Unit"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[60,60,60,80,100,150,150,200,120,100]],
					colFormat:[[6],[cfNilai]],
					columnReadOnly:[true,[0,2,3,4,6,7,8,9],[1,5]],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"selectPage"]});			
		
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Dokumen","Upload"],
					    colWidth:[[3,2,1,0],[80,480,200,80]], 
						colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='LOGAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			this.flagGarFree = "0"; this.flagDokFree = "0";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','DOKFREE','PPSUSUT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
					if (line.kode_spro == "PPSUSUT") this.ppSusut = line.flag;	
				}
			}			
			this.cb_buat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
						
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";				
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_logistik_fTerimaE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_logistik_fTerimaE.implement({	
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
					sql.add("delete from log_terima_m where no_terima='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from fa_asset where no_baps='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from log_terima_dok where no_terima ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					
					sql.add("insert into log_terima_m(no_terima,kode_lokasi,tgl_input,nik_user,periode,tanggal,no_dokumen,keterangan,kode_vendor,no_po,nik_buat,nik_app,pengirim) values "+
						   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_vendor.getText()+"','"+this.cb_po.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.e_pic.getText()+"')"); 
							
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into fa_asset(no_fa,barcode,kode_lokasi,kode_klpfa,kode_klpakun,kode_akun,umur,persen,nama,merk,tipe,no_seri,nilai,nilai_residu,kode_pp,kode_pp_susut,tgl_perolehan,tgl_susut,periode,periode_susut,progress,nik_user,tgl_input,no_baps,kode_lokfa,nik_pnj,no_po,id_pesan,kode_vendor,tgl_baps,kode_unit,jenis) values "+
										"('"+this.sg2.cells(1,i)+"','"+this.sg2.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(8,i)+"','-','"+this.sg2.cells(7,i)+"',0,0,'"+this.sg2.cells(2,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(4,i)+"','"+this.sg2.cells(5,i)+"',"+nilaiToFloat(this.sg2.cells(6,i))+",1,'-','"+this.ppSusut+"','"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','1','"+this.app._userLog+"',getdate(),'"+this.e_nb.getText()+"','-','-','"+this.cb_po.getText()+"','"+this.sg2.cells(0,i)+"','"+this.cb_vendor.getText()+"','"+this.dp_d1.getDateString()+"','"+this.sg2.cells(9,i)+"','A')");
							}
						}
					}					
					sql.add("update a set a.nilai_susut=round(a.nilai/c.umur,0), a.kode_klpakun=c.kode_klpakun, a.umur=c.umur, a.persen=c.persen, a.kode_pp=e.kode_pp, a.kode_dana=d.kode_dana "+
					        "from fa_asset a inner join fa_klp b on a.kode_klpfa=b.kode_klpfa and a.kode_lokasi=b.kode_lokasi "+
							"                inner join fa_klpakun c on a.kode_akun=c.kode_akun and c.kode_lokasi=a.kode_lokasi "+
							"                inner join log_pesan_d d on a.id_pesan=d.no_pesan+'-'+cast(d.no_urut as varchar) and a.kode_lokasi=d.kode_lokasi and a.no_po=d.no_po "+
							"                inner join log_pesan_m e on d.no_pesan=e.no_pesan and a.kode_lokasi=d.kode_lokasi and a.no_po=d.no_po "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.no_baps='"+this.e_nb.getText()+"'");
					
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
							if (this.sgUpld.rowValid(i)){
								ix++;
								sql.add("insert into log_terima_dok(no_terima,no_gambar,nu,kode_jenis,kode_lokasi)values('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).filedest+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
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
					this.sg.clear(1); this.sg2.clear(1); this.sgUpld.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && (nilaiToFloat(this.sg.cells(5,i)) < nilaiToFloat(this.sg.cells(6,i)))){
							var j = i+1;
							system.alert(this,"Jumlah terima baris "+j+" tidak valid.","Jumlah terima melebihi sisa PO.");
							return false;
						}
					}
				}				
				if (this.flagDokFree == "1") {				
					var data = this.dbLib.getDataProvider("select no_terima from log_terima_m where no_terima<>'"+this.e_nb.getText()+"' and no_dokumen='"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							system.alert(this,"No Dokumen sudah terpakai.","Terpakai di no bukti : "+line.no_po);
							return false;
						} 
					}
				}														
				/*
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 				
				else
				*/				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.cb1.setSelected(false);
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				/*
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {
				*/
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from log_terima_m where no_terima='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from fa_asset where no_baps='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from log_terima_dok where no_terima ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					this.deletedFiles = "";	
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							if (this.deletedFiles != "") this.deletedFiles += ";";
							this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(2,i);
						}
					}
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				//}
				break				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}		
	},
	doDetail:function(sender){		
		this.sg2.clear();
		for (var i=0;i < this.sg.getRowCount();i++){
			if (nilaiToFloat(this.sg.cells(6,i)) > nilaiToFloat(this.sg.cells(5,i))) {
				this.sg2.clear(1);
				var k = i+1;
				system.alert(this,"Jumlah terima baris "+k+" tidak valid.","Jumlah terima melebihi sisa PO.");
				return false;
			} 
			else {				
				var strSQL = "select kode_agg from fa_klpakun where kode_akun='"+this.sg.cells(7,i)+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.kodeAgg = line.kode_agg;
					}
				}
				var nuAkhir = 0;
				var formatID = this.e_periode.getText().substr(2,2) + this.kodeAgg + this.sg.cells(10,i) + this.sg.cells(12,i) + this.sg.cells(8,i); 
				var strSQL = "select isnull(max(no_fa),0) as no_fa from fa_asset where no_fa like '"+formatID+"____%' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						nuAkhir = parseFloat(line.no_fa.substr(line.no_fa.length-4,4));						
					}
				}	
				for (var k=0;k < this.sg2.getRowCount();k++){
					if (this.sg2.rowValid(k)){
						if (formatID == this.sg2.cells(1,k).substr(0,10)) nuAkhir = parseFloat(this.sg2.cells(1,k).substr(this.sg2.cells(1,k).length-4,4));
					}
				}
				for (var j=0;j < nilaiToFloat(this.sg.cells(6,i));j++){
				    var k = nuAkhir+j+1;
					var idx = k.toString();
					if (idx.length == 1) var nu = "000"+idx;
					if (idx.length == 2) var nu = "00"+idx;
					if (idx.length == 3) var nu = "0"+idx;
					if (idx.length == 4) var nu = idx;
						
					var noTag = formatID+nu;
					this.sg2.appendData([this.sg.cells(0,i),noTag,this.sg.cells(1,i),this.sg.cells(2,i),this.sg.cells(3,i),"-",this.sg.cells(4,i),this.sg.cells(7,i),this.sg.cells(8,i),this.sg.cells(10,i)]);
				}
			}
		}
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},	
	doChange:function(sender){		
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.sg.clear(1); this.sg2.clear(1); 
			this.e_nb.setSQL("select distinct a.no_terima, a.keterangan from log_terima_m a "+
							 "       left join fa_asset b on a.no_terima=b.no_baps and a.kode_lokasi=b.kode_lokasi and b.progress<>'1' "+
							 "where b.no_fa is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_terima","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);			
		}		
		if (sender == this.e_nb && this.e_nb.getText()!= "") {									
			var strSQL = "select a.tanggal,a.periode,a.no_dokumen,a.keterangan,a.kode_vendor,a.no_po,a.nik_app,a.nik_buat,b.keterangan as ket_po,c.nama as nama_vendor,a.pengirim "+
						 "from log_terima_m a inner join log_po_m b on a.no_po=b.no_po and a.kode_lokasi=b.kode_lokasi "+
						 "                    inner join vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi "+
						 "where a.no_terima='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);					
					this.cb_vendor.setText(line.kode_vendor,line.nama_vendor);
					this.cb_po.setText(line.no_po,line.ket_po);
					this.cb_buat.setText(line.nik_buat);
					this.cb_app.setText(line.nik_app);										
					this.e_pic.setText(line.pengirim);
				}
			}
			var strSQL = "select a.no_pesan+'-'+cast(a.no_urut as varchar) as id,a.item,a.merk,a.tipe,a.harga,a.jum_po-isnull(d.jml_terima,0) as jumlah,b.kode_akun,isnull(c.kode_klpfa,'-') as kode_klpfa,isnull(c.nama,'-') as nama_klpfa,e.jum_aset,isnull(ee.kode_prodi,'-') as kode_prodi,isnull(ee.nama,'-') as nama_prodi,a.kode_dana "+
			             "from log_pesan_d a inner join log_pesan_m b on a.no_pesan=b.no_pesan and a.kode_lokasi=b.kode_lokasi "+
						 "                   inner join (select id_pesan,no_po,kode_lokasi,count(no_fa) as jum_aset from fa_asset where no_baps='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_po='"+this.cb_po.getText()+"' group by id_pesan,no_po,kode_lokasi) e on e.id_pesan=a.no_pesan+'-'+cast(a.no_urut as varchar) and e.no_po=a.no_po and a.kode_lokasi=e.kode_lokasi "+
						 "                   inner join (select top 1 a.id_pesan,a.no_po,a.kode_lokasi,a.kode_klpfa,b.nama from fa_asset a inner join fa_klp b on a.kode_klpfa=b.kode_klpfa and a.kode_lokasi=b.kode_lokasi where a.no_baps='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_po='"+this.cb_po.getText()+"' group by a.id_pesan,a.no_po,a.kode_lokasi,a.kode_klpfa,b.nama) c on c.id_pesan=a.no_pesan+'-'+cast(a.no_urut as varchar) and c.no_po=a.no_po and a.kode_lokasi=c.kode_lokasi "+						 
						 "                   left join (select id_pesan,no_po,kode_lokasi,count(no_fa) as jml_terima from fa_asset where no_baps<>'"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_po='"+this.cb_po.getText()+"' group by id_pesan,no_po,kode_lokasi) d on d.id_pesan=a.no_pesan+'-'+cast(a.no_urut as varchar) and d.no_po=a.no_po and a.kode_lokasi=d.kode_lokasi "+						 
						 "                   inner join (select top 1 a.id_pesan,a.no_po,a.kode_lokasi,b.kode_prodi,b.nama from fa_asset a inner join va_prodi b on a.kode_unit=b.kode_prodi and a.kode_lokasi=b.kode_lokasi where a.no_baps='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_po='"+this.cb_po.getText()+"' group by a.id_pesan,a.no_po,a.kode_lokasi,b.kode_prodi,b.nama) ee on ee.id_pesan=a.no_pesan+'-'+cast(a.no_urut as varchar) and ee.no_po=a.no_po and a.kode_lokasi=ee.kode_lokasi "+						 
						 "where a.no_po='"+this.cb_po.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "order by a.item";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line2;
				this.sg.clear();
				for (var i in data.rs.rows){
					line2 = data.rs.rows[i];							
					this.sg.appendData([line2.id,line2.item,line2.merk,line2.tipe,floatToNilai(line2.harga),floatToNilai(line2.jumlah),floatToNilai(line2.jum_aset),line2.kode_akun,line2.kode_klpfa,line2.nama_klpfa,line2.kode_prodi,line2.nama_prodi,line2.kode_dana]);
				}
			} else this.sg.clear(1);									
			var strSQL = "select id_pesan,no_fa,nama,merk,tipe,no_seri,nilai,kode_akun,kode_klpfa,kode_unit "+
			             "from fa_asset "+
						 "where no_baps='"+this.e_nb.getText()+"' and no_po='"+this.cb_po.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "order by no_fa";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line2;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line2 = data.rs.rows[i];							
					this.sg2.appendData([line2.id_pesan,line2.no_fa,line2.nama,line2.merk,line2.tipe,line2.no_seri,floatToNilai(line2.nilai),line2.kode_akun,line2.kode_klpfa,line2.kode_unit]);
				}
			} else this.sg2.clear(1);									
			this.sgUpld.clear();
			this.deleteFiles = [];
			this.listFiles = new arrayMap();			
			var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from log_terima_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_terima = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgUpld.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.listFiles.set(line.no_gambar,line.no_gambar); 
					this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar}]);
				}
			} else this.sgUpld.clear(1);						
		}				
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {				
				if (col == 8){
					this.standarLib.showListData(this, "Daftar Kelompok",sender,undefined, 
							"select a.kode_klpfa, a.nama  from fa_klp a inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi where b.kode_lokasi = '"+this.app._lokasi+"' and b.kode_akun ='"+this.sg.cells(7,row)+"'",
							"select count(a.kode_klpfa) from fa_klp a inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi where b.kode_lokasi = '"+this.app._lokasi+"' and b.kode_akun ='"+this.sg.cells(7,row)+"'",
							["a.kode_klpfa","a.nama"],"and",["Kode","Nama"],false);				
				}				
			}
			if (col == 10){
					this.standarLib.showListData(this, "Daftar Unit",sender,undefined, 
							"select kode_prodi, nama  from va_prodi where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_prodi) from va_prodi where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_prodi","nama"],"and",["Kode","Nama"],false);				
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
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kopeg_logistik_rptTerima";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_terima='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
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
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1);  this.sg2.clear(1); this.sgUpld.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
												  "select kode_jenis,nama   from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_jenis) from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}	
				if (col == 10){
					this.standarLib.showListData(this, "Daftar Unit",sender,undefined, 
							"select kode_prodi, nama  from va_prodi where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_prodi) from va_prodi where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_prodi","nama"],"and",["Kode","Nama"],false);				
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
                this.sgUpld.cells(2,row, data.filedest);
                
            }
         }catch(e){
            alert(e+" "+data);
         }
    }	
});