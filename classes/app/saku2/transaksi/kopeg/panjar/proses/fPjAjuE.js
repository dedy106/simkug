window.app_saku2_transaksi_kopeg_panjar_proses_fPjAjuE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_panjar_proses_fPjAjuE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_panjar_proses_fPjAjuE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Input Permohonan Panjar (Proses): Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});				
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal Pakai", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 								
		this.cb_akun = new saiCBBL(this,{bound:[20,15,200,20],caption:"Akun Panjar", multiSelection:false, maxLength:10, tag:2});								
		this.cb_pp = new saiCBBL(this,{bound:[20,16,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});								
		this.cb_buat = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Pemegang", multiSelection:false, maxLength:10, tag:2});		
		this.cb_setuju = new saiCBBL(this,{bound:[20,21,200,20],caption:"Disetujui Oleh", multiSelection:false, maxLength:10, tag:2});		
		this.e_total = new saiLabelEdit(this,{bound:[780,21,220,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this,{bound:[20,12,980,287], childPage:["Item Mata Anggaran","KPA Anggaran"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],					
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});		
		
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
			
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
												
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
			this.cb_pp.setSQL("select kode_pp, nama from pp where tipe='posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_setuju.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                    "where b.kode_flag ='002' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
		
			this.dataPP = this.app._pp;
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '037' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_panjar_proses_fPjAjuE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_panjar_proses_fPjAjuE.implement({
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
					sql.add("delete from panjar2_m where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from panjar2_d where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul ='PJ2'");
										
					sql.add("insert into panjar2_m(no_panjar,kode_lokasi,no_dokumen,tanggal,due_date,keterangan,nik_buat,nik_setuju,kode_pp,nilai,periode,nik_user,tgl_input,no_ver,no_kas,progress,akun_panjar) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.cb_pp.getText()+"',"+parseNilai(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-','-','0','"+this.cb_akun.getText()+"')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into panjar2_d(no_panjar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(7,i)+"','"+this.app._lokasi+"','SPB','BBN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							}
						}
					}					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(7,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(7,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(7,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"	('"+this.e_nb.getText()+"','PJ2','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(6,i))+","+nilai+")");
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
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :				
				this.preView = "1";
				if (this.flagDokFree == "1") {				
					var data = this.dbLib.getDataProvider("select no_panjar from panjar2_m where no_panjar <> '"+this.e_nb.getText()+"' and no_dokumen='"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							system.alert(this,"No Dokumen sudah terpakai.","Terpakai di no bukti : "+line.no_panjar);
							return false;
						} 
					}
				}				
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
					/* cianjur
					else {
						if (this.sg.cells(5,i) != this.app._kodePP) {
							system.alert(this,"Transaksi tidak valid.","PP tidak sesuai dengan user penginput.");
							return false;
						}					
					}
					*/
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				this.dataAkunGar = {rs:{rows:[]}};				
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);								
				if (typeof data == "object"){
					this.dataAkunGar = data;
				} 				
				var k=0;
				for (var j=0;j < this.sg.getRowCount();j++){
					if (this.sg.rowValid(j)){
						for (var i=0;i<this.dataAkunGar.rs.rows.length;i++){
							line = this.dataAkunGar.rs.rows[i];
							if (line.kode_akun == this.sg.cells(0,j) && this.sg.cells(7,j) == "-") {		
								k = j+1;
								system.alert(this,"Transaksi tidak valid.","Akun Anggaran  Harus diisi DRK.[Baris : "+k+"]");
								return false;						
							}
						}
					}
				}								
				this.doHitungGar();
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (nilaiToFloat(this.sg2.cells(7,i))>0 && nilaiToFloat(this.sg2.cells(6,i)) < nilaiToFloat(this.sg2.cells(7,i))) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
							return false;						
						}
					}
				}																
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Permohonan tidak boleh nol atau kurang.");
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
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from panjar2_m where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from panjar2_d where no_panjar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul ='PJ2'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
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
			this.e_nb.setSQL("select a.no_panjar, a.keterangan from panjar2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "where a.progress = '0' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_panjar","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {					
			var strSQL = "select a.tanggal,a.no_dokumen,a.keterangan,a.due_date,a.nilai,a.nik_buat,a.nik_setuju,a.kode_pp,a.akun_panjar,  "+
						 "       b.nama as nama_buat,bb.nama as nama_setuju,f.nama as nama_pp,g.nama as nama_akun "+
						 "from panjar2_m a "+
						 "       inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+	
						 "       inner join karyawan bb on a.nik_setuju=bb.nik and a.kode_lokasi=bb.kode_lokasi "+							 
						 "       inner join pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi "+							 
						 "       inner join masakun g on a.akun_panjar=g.kode_akun and a.kode_lokasi=g.kode_lokasi "+							 						 
						 "where a.no_panjar='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){															
					this.dp_d1.setText(line.tanggal);					
					this.dp_d2.setText(line.due_date);				
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_setuju.setText(line.nik_setuju,line.nama_setuju);					
					this.cb_akun.setText(line.akun_panjar,line.nama_akun);					
					this.cb_pp.setText(line.kode_pp,line.nama_pp);					
					this.e_total.setText(floatToNilai(line.nilai));															
				} 
			}					
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from panjar2_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"            	     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"                    left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
						"where a.no_panjar = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			} else this.sg.clear(1);
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
						"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"              left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='PJ2' order by a.kode_akun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
				}
			} else this.sg2.clear(1);			
		}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
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
		if (col == 5) {
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}				
			}
		}
		if (col == 7) {
			if (sender.cells(7,row) != "") {
				var isAda = false;
				var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.jml != 0) isAda = true;
					} 
				}
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and b.kode_drk = '"+sender.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) sender.cells(8,row,line.nama);
					else {
						if (!isAda) sender.cells(8,row,"-");
						else {
							sender.cells(7,row,"");
							sender.cells(8,row,"");
						}
					}
				}
			}
		}
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg.cells(4,i));
				}
			}			
			this.e_total.setText(floatToNilai(totD - totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					this.sg.cells(2,row,"D");
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
			case 4 : 
					if (this.sg.cells(4,row) == "" && row > 0) {
						var sls = nilaiToFloat(this.e_debet.getText()) - nilaiToFloat(this.e_kredit.getText());
						sls = Math.abs(sls); 
						this.sg.setCell(4,row,floatToNilai(sls));
					}
				break;
			case 5 : 
					if ((this.sg.cells(5,row) == "") && (row > 0)) {
						this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					}
					else {
						this.sg.setCell(5,row,this.cb_pp.getText());
						this.sg.setCell(6,row,this.cb_pp.rightLabelCaption);
					}
				break;
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '037' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '037' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and kode_pp = '"+this.app._kodePP+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  ["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(5,i) != "-" && this.sg.cells(7,i)!= "-"){
				
				if (this.sg.cells(2,i) == "D") nilai = nilaiToFloat(this.sg.cells(4,i));
				else nilai = nilaiToFloat(this.sg.cells(4,i)) * -1;
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j) && this.sg.cells(5,i) == this.sg2.cells(2,j) && this.sg.cells(7,i) == this.sg2.cells(4,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),this.sg.cells(1,i),this.sg.cells(5,i),this.sg.cells(6,i),this.sg.cells(7,i),this.sg.cells(8,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(7,idx));
					total = total + nilai;
					this.sg2.setCell(7,idx,total);
				}
			}
		}
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(4,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(6,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(7,i));
				this.sg2.cells(8,i,floatToNilai(sls));
			}
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView=="1") {								
								this.nama_report="server_report_saku2_kopeg_panjar_rptPjAjuForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_panjar='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText();
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
							this.dataAkun = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataAkun.set(line.kode_akun, line.nama);
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
			this.sg.clear(1); this.sg2.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	}
});