window.app_saku2_transaksi_siaga_npko2_fNppE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_npko2_fNppE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_npko2_fNppE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Input Nota Permohonan Pembayaran : Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.cb_pp = new saiCBBL(this,{bound:[20,16,222,20],caption:"Unit Kerja", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_nb = new saiCBBL(this,{bound:[20,12,222,20],caption:"No NPP", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});				
		this.cb_buat = new saiCBBL(this,{bound:[20,18,200,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"Mgr/Coordinator/GM", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app2 = new saiCBBL(this,{bound:[20,18,200,20],caption:"GM/Direktur", multiSelection:false, maxLength:10, tag:2});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Untuk Pembayaran", maxLength:150});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal Bayar", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 						
		this.cb_vendor = new saiCBBL(this,{bound:[20,14,220,20],caption:"Kepada (Mitra)", multiSelection:false, maxLength:10, tag:2});								
		this.cb_npko = new saiCBBL(this,{bound:[20,17,220,20],caption:"No NPKO", readOnly:true});
		this.e_ppn = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Nilai PPN", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.c_curr = new saiCB(this,{bound:[20,19,155,20],caption:"Curr - Kurs",readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this,{bound:[180,19,40,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"]});								
		this.e_total = new saiLabelEdit(this,{bound:[700,19,220,20],caption:"Total NPP", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
				
		this.pc1 = new pageControl(this,{bound:[20,12,900,260], childPage:["Data NPKO","Jurnal Tambahan"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Nilai NPKO","NPP Original","NPP IDR","Nilai PPN"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,100,100,150,80,150,80,150,80]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,8],[7,9]],
					colFormat:[[6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Nilai IDR","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[150,80,150,80,100,100,200,50,150,80]],					
					columnReadOnly:[true,[1,5,7,9],[0,2,3,4,6,8]],
					buttonStyle:[[0,2,6,8],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4,5],[cfNilai,cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter2"],ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		
		
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
		
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;
		
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
			
			this.cb_vendor.setSQL("select kode_vendor, nama from gr_vendor where kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Pihak Ketiga",true);			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and tipe='posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Unit Kerja",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app2.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);	
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("IDR");
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
			
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='PPNM' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunPPN = line.flag;
			} else this.akunPPN = "-";
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_npko2_fNppE.extend(window.childForm);
window.app_saku2_transaksi_siaga_npko2_fNppE.implement({
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
					sql.add("delete from gr_npp_m where no_npp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update gr_npko_d set no_npp='-' where no_npp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_npp_j where no_npp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
									
					sql.add("insert into gr_npp_m(no_npp,kode_lokasi,no_npko,no_dokumen,tanggal,due_date,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,nik_gar,nik_kas,kode_vendor,kode_pp,modul,jenis,nilai,nilai_ppn,periode,nik_user,tgl_input,no_spb,akun_ppn) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_npko.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.cb_app2.getText()+"','-','"+this.cb_vendor.getText()+"','"+this.cb_pp.getText()+"','NPP','NPKO',"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-','"+this.akunPPN+"')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (nilaiToFloat(this.sg.cells(7,i)) > 0) {
									sql.add("update gr_npko_d set no_npp='"+this.e_nb.getText()+"' where no_npko='"+this.cb_npko.getText()+"' and kode_akun='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
									
									sql.add("insert into gr_npp_j(no_npp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nilai_curr,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+this.e_nb.getText()+"','"+this.cb_npko.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.sg.cells(8,i))+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.app._lokasi+"','NPP','NPKO','"+this.e_periode.getText()+"',"+parseNilai(this.sg.cells(7,i))+",'"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate())");
									sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
											"('"+this.e_nb.getText()+"','NPP','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.periodeNPKO+"','"+this.e_periode.getText()+"','D',0,"+parseNilai(this.sg.cells(8,i))+")");
									sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
											"('"+this.e_nb.getText()+"','NPPNPKO','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.periodeNPKO+"','"+this.e_periode.getText()+"','C',0,"+parseNilai(this.sg.cells(6,i))+")");
								} 																
							}						
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								
								var j = i+99;								
								sql.add("insert into gr_npp_j(no_npp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nilai_curr,kode_curr,kurs,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_npko.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg2.cells(5,i))+",'"+this.sg2.cells(6,i)+"','"+this.sg2.cells(8,i)+"','"+this.app._lokasi+"','NPP','TAMBAH','"+this.e_periode.getText()+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate())");
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
					this.sg.clear(1); this.sg2.clear(1); this.c_curr.setText("IDR"); 					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();				
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (nilaiToFloat(this.sg.cells(8,i))>nilaiToFloat(this.sg.cells(6,i))) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai IDR NPP melebihi Anggaran NPKO. [Baris : "+k+"]");
							return false;						
						}						
					}
				}																
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai NPP tidak boleh nol atau kurang.");
					return false;						
				}
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
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					this.cb1.setSelected(false);
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_npp_m where no_npp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update gr_npko_d set no_npp='-' where no_npp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_npp_j where no_npp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		var sql = new server_util_arrayList();			
		sql.add("select kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_periode.getText().substr(0,4)+"' ");
		this.dbLib.getMultiDataProviderA(sql);		
	},
	doChange:function(sender){
		if (sender == this.e_periode || sender == this.cb_pp) {			
			if (this.e_periode.getText()!="" && this.cb_pp.getText()!="") {
				this.e_nb.setSQL("select no_npp, keterangan from gr_npp_m where kode_pp ='"+this.cb_pp.getText()+"' and modul = 'NPP' and no_spb='-' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_npp","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
			}			
		}		
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			this.cb1.setSelected(true);			
			var strSQL = "select a.no_npko,a.no_dokumen,a.tanggal,a.due_date,a.keterangan,a.catatan,a.kode_curr,a.kurs,a.nik_buat,a.nik_setuju,a.nik_gar,a.nik_kas,a.kode_vendor,a.kode_pp,a.modul,a.jenis,a.nilai,a.nilai_ppn,a.periode,b.lingkup "+
			             "from gr_npp_m a inner join gr_npko_m b on a.no_npko=b.no_npko and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_npp='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);					
					this.cb_buat.setText(line.nik_buat);
					this.cb_app.setText(line.nik_setuju);
					this.cb_app2.setText(line.nik_gar);
					this.e_ket.setText(line.keterangan);					
					this.dp_d2.setText(line.due_date);
					this.cb_vendor.setText(line.kode_vendor);
					this.cb_npko.setText(line.no_npko,line.lingkup);					
					this.c_curr.setText(line.kode_curr);
					this.e_kurs.setText(floatToNilai(line.kurs));
					if (this.c_curr.getText() == "IDR") this.e_kurs.setReadOnly(true); 					
					else this.e_kurs.setReadOnly(false); 					
				} 
			}								
			var strSQL = "select a.kode_akun,a.kode_pp,a.kode_drk,a.nilai,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,a.periode,e.nilai_curr as npp_curr,e.nilai as npp_idr,f.nilai_ppn "+
					     "from  gr_npko_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						 "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "					inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
						 "                  inner join gr_npp_j e on a.no_npp=e.no_npp and a.kode_lokasi=e.kode_lokasi and a.kode_akun=e.kode_akun and e.jenis='NPKO' "+
						 "                  inner join gr_npp_m f on e.no_npp=f.no_npp and f.kode_lokasi=e.kode_lokasi "+
						 "where a.no_npko='"+this.cb_npko.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_npp='"+this.e_nb.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.nilai),floatToNilai(line.npp_curr),floatToNilai(line.npp_idr),floatToNilai(line.nilai_ppn)]);
				}
				this.periodeNPKO = line.periode;
			} else this.sg.clear(1);
			var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai_curr,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk  "+
						"from gr_npp_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+								
						"                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
						"where a.jenis='TAMBAH' and a.no_npp = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			} else this.sg2.clear(1);						
			this.sg.validasi();
		}		
		if (sender == this.e_kurs) {
			this.sg.validasi();
		}		
	},	
	doChangeCell: function(sender, col, row){		
		if ((col == 7) && (this.sg.cells(7,row) != "")) {
			totIDR = Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg.cells(7,row)));
			this.sg.cells(8,row,floatToNilai(totIDR));	
			this.sg.cells(9,row,floatToNilai(Math.round(10/100 * nilaiToFloat(this.sg.cells(7,row)))));								
			this.sg.validasi();					
		}
		if ((col == 9) && (this.sg.cells(9,row) != "")) this.sg.validasi();		
	},
	doNilaiChange: function(){
		try{			
			var totIDR=tot=ppn=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != ""){					
					tot += nilaiToFloat(this.sg.cells(7,i)) + nilaiToFloat(this.sg.cells(9,i));					
					ppn += nilaiToFloat(this.sg.cells(9,i));					
				}
			}
					
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != "" && this.e_kurs.getText() != ""){
					this.sg2.cells(5,i,floatToNilai(Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg2.cells(4,i)))));					
					if (this.sg2.cells(2,i).toUpperCase() == "D") {
						tot += nilaiToFloat(this.sg2.cells(4,i));						
					}
					if (this.sg2.cells(2,i).toUpperCase() == "C") {
						tot -= nilaiToFloat(this.sg2.cells(4,i));						
					}									
				}
			}			
			this.e_ppn.setText(floatToNilai(ppn));
			this.e_total.setText(floatToNilai(tot));
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
								this.nama_report="server_report_saku2_siaga_rptNpp";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_npp='"+this.e_nb.getText()+"' ";
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
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){							
							this.dataDRK = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataDRK.set(line.kode_drk, line.nama);
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				this.pc1.show();   
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.c_curr.setText("IDR"); 
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	},	
	doChangeCell2: function(sender, col, row){		
		if (col == 2 || col == 4) {			
			if (this.sg2.cells(2,row) != "" && this.sg2.cells(4,row) != "" && this.e_kurs.getText() != "") {				
				this.sg2.cells(5,row,Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg2.cells(4,row))));
				this.sg.validasi();			
			}
		}
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);					
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
		}
		if (col == 6) {
			if (sender.cells(6,row) != "") {
				var pp = this.dataPP.get(sender.cells(6,row));
				if (pp) sender.cells(7,row,pp);
				else {
					if (trim(sender.cells(6,row)) != "") system.alert(this,"Kode PP "+sender.cells(6,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(6,row,"");
					sender.cells(7,row,"");
				}
			}
		}
		if (col == 8) {
			if (sender.cells(8,row) != "") {
				var drk = this.dataDRK.get(sender.cells(8,row));
				if (drk) sender.cells(9,row,drk);
				else {
					if (trim(sender.cells(8,row)) != "") system.alert(this,"Kode DRK "+sender.cells(8,row)+" tidak ditemukan","Inputkan kode lainnya.","checkDRK");
					sender.cells(8,row,"");
					sender.cells(9,row,"");
				}
			}
		}
		sender.onChange.set(this,"doChangeCell2");			
	},		
	doCellEnter2: function(sender, col, row){
		switch(col){
			case 2 : 
					this.sg2.cells(2,row,"C");
			case 3 : 
					if (this.sg2.cells(3,row) == ""){
						if (row == 0) this.sg2.setCell(3,row,this.e_ket.getText());
						else this.sg2.setCell(3,row,this.sg2.cells(3,(row-1)) );
					}
				break;			
			case 6 : 
					if ((this.sg2.cells(6,row) == "") && (row > 0)) {
						this.sg2.setCell(6,row,this.sg2.cells(6,(row-1)));
						this.sg2.setCell(7,row,this.sg2.cells(7,(row-1)));
					}
					else {
						this.sg2.setCell(6,row,this.cb_pp.getText());
						this.sg2.setCell(7,row,this.cb_pp.rightLabelCaption);
					}
				break;
		}
	},		
	doEllipsClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 6){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.cb_pp.getText()+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.cb_pp.getText()+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 8){
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
												  "select kode_drk, nama  from drk where kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.e_periode.getText().substr(0,4)+"'",
												  "select count(kode_drk) from drk where kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.e_periode.getText().substr(0,4)+"'",
												  ["kode_drk","nama"],"and",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}	
});