window.app_saku2_transaksi_siaga_npko2_fNpkoE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_npko2_fNpkoE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_npko2_fNpkoE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form NPKO : Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;tinymceCtrl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,222,20],caption:"No NPKO", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_lokasi = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Lokasi", maxLength:150});		
		this.e_sarana = new saiLabelEdit(this,{bound:[500,13,425,20],caption:"Sarana", maxLength:150});		
		this.e_vol = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Volume", maxLength:150});		
		this.e_lingkup = new saiLabelEdit(this,{bound:[500,15,425,20],caption:"Lingkup", maxLength:150});		
		this.e_waktu = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Waktu", maxLength:150});				
		this.cb_dept = new saiCBBL(this,{bound:[20,13,200,20],caption:"Departemen", multiSelection:false, maxLength:10, tag:2});
		this.cb_pp = new saiCBBL(this,{bound:[20,14,200,20],caption:"Unit Kerja", multiSelection:false, maxLength:10, tag:2});		
		this.e_total = new saiLabelEdit(this,{bound:[700,14,220,20],caption:"Nilai NPKO", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,330], childPage:["Data Item NPKO","Kondisi Sarana","Sasaran Kegiatan","Uraian Pekerjaan","Catatan","Otorisasi"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK","Gar Thn","Gar Bln","Sisa Gar"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,100,150,80,150,80,100,150,80]],
					columnReadOnly:[true,[1,4,6],[0,2,3,5,7,8,9]],
					colFormat:[[2,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0,3,5],[bsEllips,bsEllips,bsEllips]],checkItem: true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.mFasilitas = new tinymceCtrl(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-25], withForm:false});
		this.mSasaran = new tinymceCtrl(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-25], withForm:false});
		this.mUraian = new tinymceCtrl(this.pc1.childPage[3],{bound:[1,10,this.pc1.width-5,this.pc1.height-25], withForm:false});
		this.mCatatan = new tinymceCtrl(this.pc1.childPage[4],{bound:[1,10,this.pc1.width-5,this.pc1.height-25], withForm:false});

		this.cb_buat = new saiCBBL(this.pc1.childPage[5],{bound:[20,16,200,20],caption:"Direncanakan Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this.pc1.childPage[5],{bound:[20,17,200,20],caption:"Diperiksa Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_gar = new saiCBBL(this.pc1.childPage[5],{bound:[20,18,200,20],caption:"Disetujui Oleh", multiSelection:false, maxLength:10, tag:2});
		this.cb_fiat = new saiCBBL(this.pc1.childPage[5],{bound:[20,19,200,20],caption:"Diverifikasi Oleh", multiSelection:false, maxLength:10, tag:2});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[5].rearrangeChild(10, 23);
					
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
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Unit Kerja",true);
			this.cb_dept.setSQL("select kode_dept, nama from gr_dept where kode_lokasi='"+this.app._lokasi+"'",["kode_dept","nama"],false,["Kode","Nama"],"and","Data Departemen",true);
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_gar.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_fiat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
		
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro = 'GARFREE' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_npko2_fNpkoE.extend(window.childForm);
window.app_saku2_transaksi_siaga_npko2_fNpkoE.implement({
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
					sql.add("delete from gr_npko_m where no_npko='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_npko_d where no_npko='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where modul='NPKO' and no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
										
					sql.add("insert into gr_npko_m(no_npko,kode_lokasi,periode,tanggal,kode_pp,kode_dept,lokasi,sarana,vol,lingkup,waktu,fasilitas,sasaran,uraian,catatan,nik_buat,nik_app,nik_gar,nik_fiat,nilai,kode_curr,kurs,progress,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_pp.getText()+"','"+this.cb_dept.getText()+"','"+this.e_lokasi.getText()+"','"+this.e_sarana.getText()+"','"+this.e_vol.getText()+"','"+this.e_lingkup.getText()+"','"+this.e_waktu.getText()+"','"+urlencode(this.mFasilitas.getCode())+"','"+urlencode(this.mSasaran.getCode())+"','"+urlencode(this.mUraian.getCode())+"','"+urlencode(this.mCatatan.getCode())+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.cb_gar.getText()+"','"+this.cb_fiat.getText()+"',"+parseNilai(this.e_total.getText())+",'IDR',1,'0','"+this.app._userLog+"',getdate())");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_npko_d(no_npko,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,nilai,gar_tahun,gar_bulan,gar_sd,dc,no_spb,no_npp,no_panjar) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(5,i)+"','"+this.e_periode.getText()+"',"+parseNilai(this.sg.cells(2,i))+","+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(9,i))+",'D','-','-','-')");
								if (nilaiToFloat(this.sg.cells(2,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg.cells(2,i));
								} 								
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"	('"+this.e_nb.getText()+"','NPKO','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg.cells(9,i))+","+nilai+")");										
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
					this.sg.clear(1); 
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
				var kode1 = kode2 = "";				
				if (this.flagGarFree == "0") {
					this.doHitungGar();				
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (nilaiToFloat(this.sg.cells(2,i))>0 && nilaiToFloat(this.sg.cells(9,i)) < nilaiToFloat(this.sg.cells(2,i))) {
								var k =i+1;
								system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
								return false;						
							}
							kode1 = this.sg.cells(0,i)+this.sg.cells(3,i)+this.sg.cells(5,i);
							for (var j=i;j < this.sg.getRowCount();j++){
								kode2 = this.sg.cells(0,j)+this.sg.cells(3,j)+this.sg.cells(5,j);							
								if (kode1 == kode2 && (i != j)) {
									var k = i+1;
									system.alert(this,"Transaksi tidak valid.","Duplikasi data (Akun,PP,DRK) untuk baris ["+k+"]");
									return false;
								}
							}
						}
					}
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai NPKO tidak boleh nol atau kurang.");
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
			case "ubah" :	
				this.ubah();
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
					sql.add("delete from gr_npko_m where no_npko='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_npko_d where no_npko='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where modul='NPKO' and no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);		
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			var strSQL = "select no_npko, lingkup from gr_npko_m where no_npko not in (select distinct no_npko from gr_npko_d where (no_npp<>'-' or no_panjar<>'-') and kode_lokasi='"+this.app._lokasi+"') ";
			this.e_nb.setSQL(strSQL,["no_npko","lingkup"],false,["No NPKO","Lingkup"],"and","Data NPKO",true);						
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			this.cb1.setSelected(true);			
			var strSQL = "select "+
						 "a.no_npko, a.tanggal, a.periode, a.kode_pp, a.kode_dept, a.lokasi, a.sarana, a.vol, a.lingkup, a.waktu, a.fasilitas, a.sasaran, a.uraian, a.catatan, a.nik_buat, a.nik_app, a.nik_gar, "+
						 "a.nik_fiat, a.nilai, a.kode_curr, a.kurs "+
						 "from gr_npko_m a "+
						 "where a.no_npko = '"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);					
					this.e_lokasi.setText(line.lokasi);
					this.e_sarana.setText(line.sarana);
					this.e_vol.setText(line.vol);
					this.e_lingkup.setText(line.lingkup);
					this.e_waktu.setText(line.waktu);
					this.cb_dept.setText(line.kode_dept);
					this.cb_pp.setText(line.kode_pp);
														
					this.mFasilitas.setCode(urldecode(line.fasilitas));
					this.mSasaran.setCode(urldecode(line.sasaran));
					this.mUraian.setCode(urldecode(line.uraian));
					this.mCatatan.setCode(urldecode(line.catatan));

					this.cb_buat.setText(line.nik_buat);
					this.cb_app.setText(line.nik_app);
					this.cb_gar.setText(line.nik_gar);
					this.cb_fiat.setText(line.nik_fiat);
					
				} 
			}
			var strSQL = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.nilai,a.gar_tahun,a.gar_bulan,a.gar_sd "+
			             "from gr_npko_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						 " 		inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 " 		left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
						 "where a.no_npko='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.gar_tahun),floatToNilai(line.gar_bulan),floatToNilai(line.gar_sd)]);
				}
			} else this.sg.clear(1);

			
		}
	},
	doChangeCell: function(sender, col, row){		
		if ((col == 2) && (this.sg.cells(2,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 3) {
			if (this.sg.cells(3,row) != "") {
				var pp = this.dataPP.get(sender.cells(3,row));
				if (pp) sender.cells(4,row,pp);
				else {
					if (trim(sender.cells(3,row)) != "") system.alert(this,"Kode PP "+sender.cells(3,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");
					sender.cells(3,row,"");
					sender.cells(4,row,"");
				}				
			}
		}		
		if (col == 5) {
			if (this.sg.cells(5,row) != "") {
				var isAda = false;
				var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(3,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.jml != 0) isAda = true;
					} 
				}
				var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(3,row)+"' and b.kode_drk = '"+this.sg.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) this.sg.cells(6,row,line.nama);
					else {
						if (!isAda) this.sg.cells(6,row,"-");
						else {
							this.sg.cells(5,row,"");
							this.sg.cells(6,row,"");
						}
					}
				}
			}
		}
		sender.onChange.set(this,"doChangeCell");		
		if (col == 0 || col == 3 || col == 5) {
			if (this.sg.cells(0,row) != "" && this.sg.cells(3,row) != "" && this.sg.cells(5,row) != "") {				
				var data = this.dbLib.getDataProvider("select fn_cekagg5('"+this.sg.cells(3,row)+"','"+this.app._lokasi+"','"+this.sg.cells(0,row)+"','"+this.sg.cells(5,row)+"','"+this.e_periode.getText()+"') as gar ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");
					sls = parseFloat(data[0]) - parseFloat(data[1]);
					var garbln = parseFloat(data[0]);
					var garthn = parseFloat(data[2]);				
					this.sg.cells(7,row,floatToNilai(garthn));				
					this.sg.cells(8,row,floatToNilai(garbln));				
					this.sg.cells(9,row,floatToNilai(sls));				
				}
			}
		}
	},
	doNilaiChange: function(){
		try{			
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(2,i) != ""){
					tot += nilaiToFloat(this.sg.cells(2,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){						
			case 3 : 
					if ((this.sg.cells(3,row) == "") && (row > 0)) {
						this.sg.setCell(3,row,this.sg.cells(3,(row-1)));
						this.sg.setCell(4,row,this.sg.cells(4,(row-1)));
					} 
					else {
						this.sg.setCell(3,row,this.cb_pp.getText());
						this.sg.setCell(4,row,this.cb_pp.rightLabelCaption);
					}
					
				break;
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{						
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 3){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp='"+this.sg.cells(3,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(3,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(3,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  ["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doHitungGar: function(){
		var sls = 0;
		for (var i=0;i < this.sg.getRowCount();i++){
			var data = this.dbLib.getDataProvider("select fn_cekagg5('"+this.sg.cells(3,i)+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(5,i)+"','"+this.e_periode.getText()+"') as gar ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg.cells(9,i,floatToNilai(sls));				
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_siaga_rptNpko";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_npko='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	}
});