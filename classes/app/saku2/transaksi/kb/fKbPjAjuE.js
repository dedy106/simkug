window.app_saku2_transaksi_kb_fKbPjAjuE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kb_fKbPjAjuE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kb_fKbPjAjuE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Pencairan Panjar: Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti KB", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.c_jenis = new saiLabelEdit(this,{bound:[20,22,202,20],caption:"Jenis", readOnly:true});				
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_pj = new saiCBBL(this,{bound:[20,15,220,20],caption:"No Panjar",readOnly:true});
		this.cb_akunpj = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun Panjar", multiSelection:false, maxLength:10, tag:2});
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.e_debet = new saiLabelEdit(this,{bound:[780,16,220,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_kredit = new saiLabelEdit(this,{bound:[780,17,220,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,980,287], childPage:["Data Item Panjar","Item Jurnal KasBank"]});
		this.sg3 = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],					
					readOnly:true,colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});				
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode CF","Nama CF"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,200,50,150,80]],					
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
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
		this.dataCF = this.app._cf;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_akunpj.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						          "where b.kode_flag = '002' and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun Panjar",true);										   
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='KBAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kb_fKbPjAjuE.extend(window.childForm);
window.app_saku2_transaksi_kb_fKbPjAjuE.implement({
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
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul ='KBUM'");
					sql.add("update yk_pjaju_m set akun_pj='-',progress='1',no_kas='-' where no_pjaju='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update yk_pjaju_m set akun_pj='"+this.cb_akunpj.getText()+"',progress='3',no_kas='"+this.e_nb.getText()+"' where no_pjaju='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','KBPJAJU','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_debet.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.cb_pj.getText()+"','-')");					
										
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"	('"+this.e_nb.getText()+"','"+this.cb_pj.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akunpj.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_debet.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBPJAJU','PJ','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
					if (this.sg.getRowValidCount() > 0){
						var j=999;
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								j = j+1;
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','-','"+this.sg.cells(7,i)+"','-','"+this.app._lokasi+"','KBPJAJU','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
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
					this.sg.clear(1); this.sg3.clear(1);
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
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
				} 
				var akunKB = false;
				var k=0;
				for (var j=0;j < this.sg.getRowCount();j++){
					if (this.sg.rowValid(j)){
						for (var i=0;i<this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.kode_akun == this.sg.cells(0,j)) {
								akunKB = true;
								if (this.sg.cells(7,j) == "-") {
									k = j+1;
									system.alert(this,"Transaksi tidak valid.","Akun KasBank harus diisi kode cash flow-nya. [Baris "+k+"]");
									return false;						
								}
							}
						}
					}
				}
				if (!akunKB) {
					system.alert(this,"Transaksi tidak valid.","Akun KasBank tidak ditemukan");
					return false;						
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();				
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
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
				else this.simpan();
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul ='KBUM'");
					sql.add("update yk_pjaju_m set akun_pj='-',progress='1',no_kas='-' where no_pjaju='"+this.cb_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			this.e_nb.setSQL("select a.no_kas, a.keterangan from kas_m a inner join yk_pjaju_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
			                 "where b.progress='3' and a.no_del='-' and a.jenis in ('KK','BK') and a.modul = 'KBPJAJU' and a.posted='F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_kas","a.keterangan"],false,["No KB","Deskripsi"],"and","Daftar Bukti KB",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.periode,a.keterangan,a.jenis,a.nik_buat,b.nama as nama_buat,a.nik_app,c.nama as nama_app, "+
					   " d.no_pjaju,d.keterangan as ket,d.akun_pj,e.nama as nama_akun "+
			           "from kas_m a "+
			           "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
			           "	inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi "+
					   "    inner join yk_pjaju_m d on a.no_kas=d.no_kas and a.kode_lokasi=d.kode_lokasi "+
					   "    inner join masakun e on d.akun_pj=e.kode_akun and e.kode_lokasi=d.kode_lokasi "+
					   "where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.c_jenis.setText(line.jenis);					
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_app.setText(line.nik_app,line.nama_app);
					this.cb_pj.setText(line.no_pjaju,line.ket);
					this.cb_akunpj.setText(line.akun_pj,line.nama_akun);
				} 
			}
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from yk_pjaju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"            	   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
						"where a.no_pjaju = '"+this.cb_pj.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			} else this.sg3.clear(1);
			
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,isnull(a.kode_cf,'-') as kode_cf,isnull(e.nama,'-') as nama_cf "+
						"from kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+						
						"             inner join neracacf e on a.kode_cf=e.kode_cf and a.kode_lokasi=e.kode_lokasi "+
						"where a.jenis = 'KB' and a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_cf,line.nama_cf]);
				}
			} else this.sg.clear(1);
			
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
			var cf = this.dataCF.get(sender.cells(7,row));
			if (cf) sender.cells(8,row,cf);
			else {
				if (trim(sender.cells(7,row)) != "") 
				system.alert(this,"Kode Arus Kas "+sender.cells(7,row)+" tidak ditemukan","Inputkan kode lainnya.","checkCF");                
				sender.cells(7,row,"");
				sender.cells(8,row,"");
			}
		}
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg3.rows.getLength();i++){
				if (this.sg3.rowValid(i) && this.sg3.cells(4,i) != ""){
					if (this.sg3.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg3.cells(4,i));
					if (this.sg3.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg3.cells(4,i));
				}
			}
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					this.sg.cells(2,row,"C");
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
			case 4 : 
					var sls = nilaiToFloat(this.e_debet.getText()) - nilaiToFloat(this.e_kredit.getText());
					sls = Math.abs(sls); 
					this.sg.setCell(4,row,floatToNilai(sls));
				break;
			case 5 : 					
					if ((this.sg.cells(5,row) == "") && (row > 0)) {
						this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					}
				break;
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and  a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and  a.kode_lokasi='"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}				
				if (col == 7){
					this.standarLib.showListData(this, "Daftar Arus Kas",sender,undefined, 
												  "select a.flag,b.nama from spro a inner join neracacf b on a.flag=b.kode_cf and a.kode_lokasi=b.kode_lokasi where kode_spro='PJCF' and a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(a.flag) from spro a inner join neracacf b on a.flag=b.kode_cf and a.kode_lokasi=b.kode_lokasi where kode_spro='PJCF' and a.kode_lokasi='"+this.app._lokasi+"'",
												  ["a.flag","b.nama"],"and",["Kode","Nama"],false);				
				}
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
								this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg3.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	}
});