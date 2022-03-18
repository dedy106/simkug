window.app_saku2_transaksi_kopeg_logistik_fPOE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_logistik_fPOE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_logistik_fPOE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Purchase Order : Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 				
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.l_tgl4 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tgl SPPH", underline:true});
		this.dp_d4 = new portalui_datePicker(this,{bound:[120,13,100,18]}); 								
		this.l_tgl5 = new portalui_label(this,{bound:[290,13,100,18],caption:"Tgl Negosiasi", underline:true});
		this.dp_d5 = new portalui_datePicker(this,{bound:[390,13,80,18]}); 										
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18]}); 				
		this.e_jml = new saiLabelEdit(this,{bound:[290,12,180,20],caption:"Jml Hari", tag:1,tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.l_tgl3 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 								
		this.cb_vendor = new saiCBBL(this,{bound:[20,15,200,20],caption:"Vendor", multiSelection:false, maxLength:10, tag:2});		
		this.e_nilai = new saiLabelEdit(this,{bound:[700,15,220,20],caption:"Nilai PO", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.e_ppn = new saiLabelEdit(this,{bound:[700,16,220,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.e_total = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,270], childPage:["Data Item Pesanan","Termin BA","Dokumen Pendukung"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:13,tag:0,
		            colTitle:["ID Pesan","Kode PP","Nilai Gar","Jumlah","Hrg Satuan","PPN","Total","Kode Brg","Nama Brg","Item Barang","Merk","Tipe","Pendanaan"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[200,200,200,200,150,80,  100,80,90,50,100,150,100]],					
					columnReadOnly:[true,[0,1,2,6,8,12],[3,4,5,7,9,10,11]],					
					colFormat:[[2,3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[7],[bsEllips]], 
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});						
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:5,tag:0,
		            colTitle:["Jenis","Termin","Keterangan","Nilai","PPN"],
					colWidth:[[4,3,2,1,0],[80,80,200,150,80]],					
					columnReadOnly:[true,[0],[1,2,3,4]],
					buttonStyle:[[0],[bsAuto]], 
					colFormat:[[3,4],[cfNilai,cfNilai]],picklist:[[0],[new portalui_arrayMap({items:["UM","ADK","FINAL","MTN"]})]],checkItem:true,
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		this.e_termin = new saiLabelEdit(this.sgn2,{bound:[670,1,220,20],caption:"Tot Termin", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
				
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
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
				}
			}			
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
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
window.app_saku2_transaksi_kopeg_logistik_fPOE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_logistik_fPOE.implement({		
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
					sql.add("delete from log_po_m where no_po='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from log_po_termin where no_po='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					//sql.add("delete from angg_r where kode_lokasi ='"+this.app._lokasi+"' and modul = 'RLOGPO' and no_bukti in (select no_pesan from log_pesan_d where no_po ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"')");
					sql.add("update log_pesan_d set no_po='-',harga=0,jum_po=0 where no_po='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					//sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from log_po_dok where no_po ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					
					sql.add("insert into log_po_m(no_po,kode_lokasi,tgl_input,nik_user,periode,tanggal,tgl_mulai,tgl_selesai,no_dokumen,keterangan,nilai,nilai_ppn,kode_vendor,nik_buat,nik_app,tgl_spph,tgl_nego) values "+
						   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'"+this.cb_vendor.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.dp_d4.getDateString()+"','"+this.dp_d5.getDateString()+"')"); 
												
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && (nilaiToFloat(this.sg.cells(6,i)) != 0)){
								var hargabruto = nilaiToFloat(this.sg.cells(4,i))+nilaiToFloat(this.sg.cells(5,i));
								sql.add("update log_pesan_d set kode_klpfa='"+this.sg.cells(7,i)+"',item='"+this.sg.cells(9,i)+"',merk='"+this.sg.cells(10,i)+"',tipe='"+this.sg.cells(11,i)+"',no_po='"+this.e_nb.getText()+"',harga="+hargabruto+",ppn="+nilaiToFloat(this.sg.cells(5,i))+",jum_po="+nilaiToFloat(this.sg.cells(3,i))+" where no_pesan+'-'+cast(no_urut as varchar)='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
						}
					}
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								var j = i+1;
								sql.add("insert into log_po_termin(no_po,kode_lokasi,jenis,nu,termin,keterangan,nilai,nilai_ppn,no_ba,akun_hutang,no_final,no_spb,modul) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"',"+j+",'"+this.sg2.cells(1,i)+"','"+this.sg2.cells(2,i)+"',"+nilaiToFloat(this.sg2.cells(3,i))+","+nilaiToFloat(this.sg2.cells(4,i))+",'-','-','-','-','-')");
							}
						}
					}	
					/*
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select a.no_pesan,'RLOGPO',a.kode_lokasi,b.kode_akun,b.kode_pp,b.kode_drk,b.periode,'"+this.e_periode.getText()+"','C',0,a.nilai "+
							"from log_pesan_d a inner join log_pesan_m b on a.no_pesan=b.no_pesan and a.kode_lokasi=b.kode_lokasi where a.no_po ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select a.no_po,'LOGPO',a.kode_lokasi,b.kode_akun,b.kode_pp,b.kode_drk,b.periode,'"+this.e_periode.getText()+"','D',0,a.harga*a.jum_po "+
							"from log_pesan_d a inner join log_pesan_m b on a.no_pesan=b.no_pesan and a.kode_lokasi=b.kode_lokasi where a.no_po ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					*/
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
							if (this.sgUpld.rowValid(i)){
								ix++;
								sql.add("insert into log_po_dok(no_po,no_gambar,nu,kode_jenis,kode_lokasi)values('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).filedest+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
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
					this.sg.clear(1); this.sg2.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi(); this.sg2.validasi();
				
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && (this.sg.cells(7,i) == "-" || this.sg.cells(7,i) == "")){
							system.alert(this,"Detail Barang tidak valid.","Kode Barang harus diisi.");
							return false;							
						}
					}
				}
				
				var cFinal = cMtn = 0;
				if (this.sg2.getRowValidCount() > 0){
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.cells(0,i) == "FINAL") cFinal++;
						if (this.sg2.cells(0,i) == "MTN") cMtn++;
					}
				}				
				if (cFinal != 1) {
					system.alert(this,"Termin tidak valid.","Jenis termin FINAL harus ada dan 1 kali.");
					return false;
				}
				if (cMtn > 1) {
					system.alert(this,"Termin tidak valid.","Jenis termin MTN (Maintenance) tidak boleh lebih dari 1 kali.");
					return false;
				}				
				/*
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){					
						if (this.sg.rowValid(i) && (nilaiToFloat(this.sg.cells(2,i)) < nilaiToFloat(this.sg.cells(5,i)))){
							var j = i+1;
							system.alert(this,"Total/Harga baris "+j+" tidak valid.","Total melebihi anggaran.");
							return false;
						}
					}
				}
				*/
				if (this.flagDokFree == "1") {				
					var data = this.dbLib.getDataProvider("select no_po from log_po_m where no_po<> '"+this.e_nb.getText()+"' and no_dokumen='"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							system.alert(this,"No Dokumen sudah terpakai.","Terpakai di no bukti : "+line.no_po);
							return false;
						} 
					}
				}										
				if ((nilaiToFloat(this.e_nilai.getText()) != this.nilai) || (nilaiToFloat(this.e_ppn.getText()) != this.ppn)) {
					system.alert(this,"Transaksi tidak valid.","Total (Nilai dan PPN) tidak sama dengan total (nilai dan PPN ) termin.");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
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
				*/
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;						
			case "hapus" :	
				this.cb1.setSelected(false);
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from log_po_m where no_po='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from log_po_termin where no_po='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where kode_lokasi ='"+this.app._lokasi+"' and modul = 'RLOGPO' and no_bukti in (select no_pesan from log_pesan_d where no_po ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"')");
					sql.add("update log_pesan_d set no_po='-',harga=0,jum_po=0 where no_po='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from log_po_dok where no_po ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
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
	doChange:function(sender){		
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.sg.clear(1); this.sg2.clear(1); 
			this.e_nb.setSQL("select distinct a.no_po, a.keterangan from log_po_m a "+
			                 "       left join log_terima_m b on a.no_po=b.no_po and a.kode_lokasi=b.kode_lokasi "+
							 "       left join log_po_termin c on a.no_po=c.no_po and a.kode_lokasi=c.kode_lokasi and c.no_ba<>'-' "+
							 "where c.no_ba is null and b.no_po is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_po","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);			
		}		
		if (sender == this.e_nb && this.e_nb.getText()!= "") {									
			var strSQL = "select a.tanggal,a.periode,a.tgl_mulai,a.tgl_selesai,a.no_dokumen,a.keterangan,a.nilai,a.nilai_ppn,a.kode_vendor,a.nik_app,nik_buat,datediff(day,a.tgl_mulai,a.tgl_selesai) as jmlhari,a.tgl_spph,a.tgl_nego "+
						 "from log_po_m a "+
						 "where a.no_po='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.dp_d2.setText(line.tgl_mulai);
					this.e_jml.setText(floatToNilai(line.jmlhari));
					this.dp_d3.setText(line.tgl_selesai);
					this.dp_d4.setText(line.tgl_spph);
					this.dp_d5.setText(line.tgl_nego);
					this.cb_vendor.setText(line.kode_vendor);
					this.cb_buat.setText(line.nik_buat);
					this.cb_app.setText(line.nik_app);
					this.e_nilai.setText(floatToNilai(line.nilai));
					this.e_ppn.setText(floatToNilai(line.nilai_ppn));
					this.doTampil();
				}
			}
			this.sgUpld.clear();
			this.deleteFiles = [];
			this.listFiles = new arrayMap();			
			var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from log_po_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_po = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
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
		if (sender == this.e_ppn && this.e_ppn.getText()!="") {
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText())));
		}					
	},	
	doTampil:function(sender){		
		var strSQL = "select a.no_pesan+'-'+cast(a.no_urut as varchar) as id_pesan,a.item,a.merk,a.tipe,b.kode_pp+' - '+c.nama as pp,a.nilai,a.jum_po,a.harga-a.ppn as harga,a.ppn,a.jum_po*a.harga as tot,d.kode_dana+' - '+d.nama as dana,a.kode_klpfa,e.nama as nama_klp "+
					 "from log_pesan_d a inner join log_pesan_m b on a.no_pesan=b.no_pesan and a.kode_lokasi=b.kode_lokasi "+
					 "                   inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi "+
					 "                   inner join log_dana d on a.kode_dana=d.kode_dana and a.kode_lokasi=d.kode_lokasi "+
					 "                   inner join fa_klp e on a.kode_klpfa=e.kode_klpfa and a.kode_lokasi=e.kode_lokasi "+
					 "where a.no_po='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					 "order by b.kode_pp,a.item";					 
		var data2 = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
			var line2;
			this.sg.clear();
			for (var i in data2.rs.rows){
				line2 = data2.rs.rows[i];						
				this.sg.appendData([line2.id_pesan,line2.pp,floatToNilai(line2.nilai),floatToNilai(line2.jum_po),floatToNilai(line2.harga),floatToNilai(line2.ppn),floatToNilai(line2.tot),line2.kode_klpfa,line2.nama_klp,line2.item,line2.merk,line2.tipe,line2.dana]);
			}
		} else this.sg.clear(1);
		
		
		var strSQL = "select jenis,termin,keterangan,nilai,nilai_ppn,nu "+
					 "from log_po_termin where no_po='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
					 "order by nu";					 
		var data2 = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
			var line2;
			this.sg2.clear();
			for (var i in data2.rs.rows){
				line2 = data2.rs.rows[i];						
				this.sg2.appendData([line2.jenis,line2.termin,line2.keterangan,floatToNilai(line2.nilai),floatToNilai(line2.nilai_ppn)]);
			}
		} else this.sg2.clear(1);		
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doChangeCell: function(sender, col, row){		
		if ((col == 4) && this.sg.cells(4,row) != "") {
			var ppn = Math.round(nilaiToFloat(this.sg.cells(4,row)) * 0.1);
			this.sg.cells(5,row,floatToNilai(ppn));			
		}
		if ((col == 3 || col == 4 || col == 5) && this.sg.cells(3,row) != "" && this.sg.cells(4,row) != "" && this.sg.cells(5,row) != "") {						
			var bruto = nilaiToFloat(this.sg.cells(4,row)) + nilaiToFloat(this.sg.cells(5,row));
			this.sg.cells(6,row,floatToNilai(nilaiToFloat(this.sg.cells(3,row)) * bruto ));			
			this.sg.validasi();											
		}		
	},
	doChangeCell2: function(sender, col, row){		
		if (col == 0) {
			if (this.sg2.cells(0,row) == "UM") this.sg2.cells(2,row,"Uang Muka");
			if (this.sg2.cells(0,row) == "ADK") this.sg2.cells(2,row,"Aktiva Dalam Konstruksi");
			if (this.sg2.cells(0,row) == "FINAL") this.sg2.cells(2,row,"Finalisasi PO/SPK");
			if (this.sg2.cells(0,row) == "MTN") this.sg2.cells(2,row,"Maintenance");
		}
		if ((col == 3 || col == 4) && this.sg2.cells(3,row) != "" && this.sg2.cells(4,row) != "") this.sg2.validasi();								
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i)){
					if (this.sg.cells(6,i) != "") tot += nilaiToFloat(this.sg.cells(6,i));
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
			this.e_total.setText(floatToNilai(Math.round(tot + nilaiToFloat(this.e_ppn.getText()))));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doNilaiChange2: function(){
		try{
			this.nilai = this.ppn = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i)){					
					this.nilai += nilaiToFloat(this.sg2.cells(3,i));
					this.ppn += nilaiToFloat(this.sg2.cells(4,i));
				}
			}
			this.e_termin.setText(floatToNilai(this.nilai+this.ppn));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kopeg_logistik_rptPo";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_po='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg2.clear(1); this.sgUpld.clear(1);
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
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 7){
					this.standarLib.showListData(this, "Daftar Kelompok Barang",sender,undefined, 
												  "select kode_klpfa,nama   from fa_klp where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_klpfa) from fa_klp where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_klpfa","nama"],"and",["Kode","Nama"],false);				
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