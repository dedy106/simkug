window.app_saku2_transaksi_kopeg_logistik_fTakBAE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_logistik_fTakBAE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_logistik_fTakBAE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form TAK Hutang PO: Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Keterangan", maxLength:150});						
		this.cb_lokasi = new saiCBBL(this,{bound:[20,15,220,20],caption:"Lok. Tujuan", multiSelection:false, maxLength:10, tag:2});				
		this.cb_tak = new saiCBBL(this,{bound:[20,14,220,20],caption:"Akun TAK", multiSelection:false, maxLength:10, tag:2});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"Diajukan Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.cb_tahu = new saiCBBL(this,{bound:[20,18,220,20],caption:"Diketahui Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.e_total = new saiLabelEdit(this,{bound:[700,18,220,20],caption:"Nilai TAK", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,320], childPage:["Data Akru Hutang","Detail Jurnal","Dokumen Pendukung"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:13,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","PP","Approve","Pihak Ketiga","Bank","Cabang","No Rekening","Nama Rekening","Nilai"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,200,150,200,150,200,150,150,200,60,150,150,80]],
					colFormat:[[12],[cfNilai]],
					readOnly:true,					
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],
					colFormat:[[4],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
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
						
			this.cb_buat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
			this.cb_tahu.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);													
			this.cb_tak.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '040' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);		
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi not in ('"+this.app._lokasi+"','"+this.app._kodeLokasiKonsol+"') and kode_lokkonsol='"+this.app._kodeLokasiKonsol+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);													
						
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";							
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_logistik_fTakBAE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_logistik_fTakBAE.implement({
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
					sql.add("delete from takkirim_m where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from takkirim_j where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from takkirim_d where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from takkirim_dok where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update log_po_termin set modul='-',no_spb='-' where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into takkirim_m(no_kirim,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user,kode_loktuj,progress) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nb.getText()+"','"+this.e_ket.getText()+"','-','TAKLOG','KIRIM','IDR',1,"+parseNilai(this.e_total.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_tahu.getText()+"','F','-','-','-',getdate(),'"+this.app._userLog+"','"+this.cb_lokasi.getText()+"','0')");
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "TAK"){
							sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+line.akun_hutang+"','"+line.keterangan+"','D',"+line.nilai+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','TAKLOG','HUTLOG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					
							sql.add("insert into log_takkirim_d(no_kirim,kode_lokasi,no_bukti,modul,nilai,bank,cabang,no_rek,nama_rek,akun_hutang) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.no_ba+"','LOG',"+line.nilai+",'"+line.bank+"','"+line.cabang+"','"+line.no_rek+"','"+line.nama_rek+"','"+line.akun_hutang+"')");																											
							if (line.jenis.toUpperCase() == "NONMTN")
								sql.add("update log_po_termin set modul='TAKLOG',no_spb='"+this.e_nb.getText()+"' where no_ba='"+line.no_ba+"' and no_po='"+line.no_po+"' and kode_lokasi='"+this.app._lokasi+"'");
							else sql.add("update log_po_termin set modul='TAKLOG',no_spb='"+this.e_nb.getText()+"' where no_final='"+line.no_ba+"' and no_po='"+line.no_po+"' and kode_lokasi='"+this.app._lokasi+"'");
						}						
					}
					
					sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.cb_tak.getText()+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','TAKLOG','TAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into takkirim_dok(no_kirim,no_gambar,nu,kode_jenis,kode_lokasi)values('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).filedest+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
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
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai TAK tidak boleh nol atau kurang.");
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
				this.cb1.setSelected(false);
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from takkirim_m where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from takkirim_j where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from takkirim_d where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from takkirim_dok where no_kirim='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update log_po_termin set modul='-',no_spb='-' where no_spb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			this.sg.clear(1); this.sg2.clear(1);
			this.e_nb.setSQL("select no_kirim, keterangan from takkirim_m where progress = '0' and posted ='F' and modul = 'TAKLOG' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kirim","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);						
		}
		if (sender == this.e_nb && this.e_nb.getText()!= "") {					
			var strSQL = "select a.tanggal,a.periode,a.keterangan,a.nik_buat,a.nik_setuju,a.kode_loktuj,b.kode_akun "+
						 "from takkirim_m a inner join takkirim_j b on a.no_kirim=b.no_kirim and a.kode_lokasi=b.kode_lokasi and b.jenis='TAK' "+
						 "where a.no_kirim='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);
					this.cb_lokasi.setText(line.kode_loktuj);
					this.cb_tak.setText(line.kode_akun);
					this.cb_buat.setText(line.nik_buat);
					this.cb_tahu.setText(line.nik_setuju);
				} 
			}		
			this.doLoad();
		
			this.sgUpld.clear();
			this.deleteFiles = [];
			this.listFiles = new arrayMap();			
			var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from takkirim_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_kirim = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
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
	doLoad:function(sender){
		if (this.e_periode.getText()!="") {
			var strSQL = "select 'TAK' as status,a.no_ba,a.no_po,convert(varchar,b.tanggal,103) as tanggal,b.keterangan,d.kode_pp+' - '+d.nama as pp,b.nik_app+' - '+e.nama as approve,f.kode_vendor+' - '+f.nama as vendor,f.bank,f.cabang,f.no_rek,f.nama_rek,b.nilai+b.nilai_ppn+b.nilai_tambah as nilai,a.akun_hutang,'NONMTN' as jenis "+
						 "from log_po_termin a "+
						 "     inner join log_ba_m b on a.no_ba=b.no_ba and a.kode_lokasi=b.kode_lokasi "+
						 "     inner join log_po_m c on a.no_po=c.no_po and a.kode_lokasi=c.kode_lokasi "+						 
						 "     inner join pp d on b.kode_pp=d.kode_pp and d.kode_lokasi=b.kode_lokasi "+						 
						 "     inner join karyawan e on b.nik_app=e.nik and b.kode_lokasi=e.kode_lokasi "+
						 "     inner join vendor f on c.kode_vendor=f.kode_vendor and c.kode_lokasi=f.kode_lokasi "+						 
						 "where a.jenis<>'MTN' and a.no_spb = '"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
						 "union "+
						 "select 'TAK' as status,a.no_final,a.no_po,convert(varchar,b.tanggal,103) as tanggal,b.keterangan,d.kode_pp+' - '+d.nama as pp,b.nik_app+' - '+e.nama as approve,f.kode_vendor+' - '+f.nama as vendor,f.bank,f.cabang,f.no_rek,f.nama_rek,b.nilai+b.nilai_ppn+b.nilai_tambah as nilai,a.akun_hutang,'MTN' as jenis "+
						 "from log_po_termin a "+
						 "     inner join log_ba_m b on a.no_final=b.no_ba and a.kode_lokasi=b.kode_lokasi "+
						 "     inner join log_po_m c on a.no_po=c.no_po and a.kode_lokasi=c.kode_lokasi "+						 
						 "     inner join pp d on b.kode_pp=d.kode_pp and d.kode_lokasi=b.kode_lokasi "+						 
						 "     inner join karyawan e on b.nik_app=e.nik and b.kode_lokasi=e.kode_lokasi "+
						 "     inner join vendor f on c.kode_vendor=f.kode_vendor and c.kode_lokasi=f.kode_lokasi "+						 
						 "where a.jenis='MTN' and no_final <> '-' and a.no_spb = '"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
						 "order by tanggal";
						 
			var tot = 0;			 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];				
					tot += parseFloat(line.nilai);				
				}
				this.e_total.setText(floatToNilai(tot));
				
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();				
				this.doTampilData(1);
			} else this.sg.clear(1);
		}
	},
	doTampilData: function(page) {		
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;		
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);		
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg.appendData([line.status.toUpperCase(),line.no_ba,line.no_po,line.tanggal,line.keterangan,line.pp,line.approve,line.vendor,line.bank,line.cabang,line.no_rek,line.nama_rek,floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},		
	doDoubleClick: function(sender, col , row) {	
		strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
				 "from log_ba_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
				 "                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
				 "                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
				 "where a.no_ba = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
			}
		} else this.sg2.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kb_rpttak";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kirim='"+this.e_nb.getText()+"' ";
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