window.app_saku2_transaksi_siaga_fKbPtgLebihE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fKbPtgLebihE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fKbPtgLebihE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Penyelesaian Panjar (CK,BK): Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,16,240,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});								
		this.c_jenis = new portalui_saiLabelEdit(this,{bound:[20,10,180,20],caption:"Jenis",tag:2,readOnly:true});		
		this.cb_cabang = new saiCBBL(this,{bound:[20,13,200,20],caption:"Cabang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.cb_bank = new saiCBBL(this,{bound:[20,14,200,20],caption:"Kas/Bank", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});			
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});						
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});								
		this.cb_ptg = new saiCBBL(this,{bound:[20,13,240,20],caption:"Bukti Pertgg.",readOnly:true,multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});
		this.cb_panjar = new saiCBBL(this,{bound:[20,14,240,20],caption:"No Panjar", readOnly:true});							
		this.e_debet = new saiLabelEdit(this,{bound:[790,14,210,20],caption:"Total Debet (IDR)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.c_curr = new saiLabelEdit(this,{bound:[20,19,160,20],caption:"Mt Uang - Kurs", tag:0, readOnly:true, text:"IDR"});				
		this.e_kurs = new saiLabelEdit(this,{bound:[190,19,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"],tag:2});				
		this.e_kredit = new saiLabelEdit(this,{bound:[790,19,210,20],caption:"Total Kredit (IDR)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.e_nilaiCurr = new saiLabelEdit(this,{bound:[20,20,220,20],caption:"Nilai Curr", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_sls = new saiLabelEdit(this,{bound:[790,20,210,20],caption:"Selisih (IDR)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,980,235], childPage:["Data Item Jurnal","Item Pertanggungan","NoBukti Baru"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:8,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Nilai IDR","Kode PP","Nama PP"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,50,100,100,300,40,150,80]],					
					columnReadOnly:[true,[1,5,7],[0,2,3,4,6]],
					buttonStyle:[[0,2,6],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4,5],[cfNilai,cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Nilai IDR","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[150,80,150,80,100,100,200,50,150,80]],					
					nilaiChange:[this,"doNilaiChange"],readOnly:true,colFormat:[[4,5],[cfNilai,cfNilai]],autoAppend:false,defaultRow:1});					
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});		
		
		this.cb2 = new portalui_checkBox(this.pc1.childPage[2],{bound:[20,10,100,25],caption:"Ubah No Bukti",selected:false});
		this.c_jenis2 = new saiCB(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"Jenis",items:["CK","BK"], readOnly:true,tag:4,change:[this,"doChange2"]});
		this.e_cabang2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,180,20],caption:"Cabang", readOnly:true, text:"",tag:4,change:[this,"doChange2"]});						
		this.cb_bank2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"Kas/Bank", multiSelection:false, maxLength:10,tag:4,change:[this,"doChange2"]});			
		this.e_bulan = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,180,20],caption:"Periode", readOnly:true, text:"",change:[this,"doChange2"],tag:4});						
		this.e_nu = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,180,20],caption:"No Urut", maxLength:3, text:"0",change:[this,"doChange2"],tipeText:ttNilai,tag:4});
		this.e_nb2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,16,220,20],caption:"No Bukti Baru", readOnly:true,tag:4});								
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);

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
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}				
			var data = this.dbLib.getDataProvider("select a.kode_cabang,b.nama from gr_karyawan_cab a inner join gr_cabang b on a.kode_cabang=b.kode_cabang and a.kode_lokasi=b.kode_lokasi where a.flag_aktif ='1' and a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_cabang.setText(line.kode_cabang,line.nama);
			} else this.cb_cabang.setText("","");	
			this.cb_bank2.setSQL("select kode_bank, nama from gr_bank where kode_lokasi='"+this.app._lokasi+"'",["kode_bank","nama"],false,["Kode","Nama"],"and","Data Bank",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fKbPtgLebihE.extend(window.childForm);
window.app_saku2_transaksi_siaga_fKbPtgLebihE.implement({
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
					sql.add("update gr_panjarptg_m set progress='0', no_kas='-' where no_ptg='"+this.cb_ptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					this.nb = this.e_nb.getText();
					if (this.cb2.isSelected()) {
						this.nb = this.e_nb2.getText();
						this.c_jenis.setText(this.c_jenis2.getText());
						this.cb_bank.setText(this.cb_bank.getText(),this.cb_bank.rightLabelCaption);
					}
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.nb+"','"+this.app._lokasi+"','"+this.cb_ptg.getText()+"','-','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_cabang.getText()+"','KBPJPTGL','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"','"+parseNilai(this.e_kurs.getText())+"',"+this.nilaiKB+",'"+this.cb_buat.getText()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','F','-','"+this.cb_panjar.getText()+"','"+this.cb_panjar.getText()+"','"+this.cb_bank.getText()+"')");
					sql.add("update gr_panjarptg_m set progress='1', no_kas='"+this.nb+"' where no_ptg='"+this.cb_ptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){							
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"('"+this.nb+"','"+this.cb_ptg.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg.cells(5,i))+",'"+this.sg.cells(6,i)+"','-','-','"+this.cb_panjar.getText()+"','"+this.app._lokasi+"','KBPJPTGL','KB','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'"+this.cb_bank.getText()+"',"+nilaiToFloat(this.sg.cells(4,i))+")");
							}
						}
					}
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){		
								var j=i+99;
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"('"+this.nb+"','"+this.cb_ptg.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg3.cells(0,i)+"','"+this.sg3.cells(3,i)+"','"+this.sg3.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg3.cells(5,i))+",'"+this.sg3.cells(6,i)+"','"+this.sg3.cells(8,i)+"','-','"+this.cb_panjar.getText()+"','"+this.app._lokasi+"','KBPJPTGL','PTG','"+this.e_periode.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_kurs.getText())+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg3.cells(4,i))+")");
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
					this.sg.clear(1); this.sg.clear(3);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.c_curr.setText("IDR");
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				if (this.cb2.isSelected()) {				
					this.doCheck();					
					if (this.ketemu) {
						system.alert(this,"Transaksi tidak valid.","No Bukti Baru sudah terpakai.");
						return false;
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
				}
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
				} 
				this.nilaiKB=0;
				var akunKB = false;
				var k=0;
				for (var j=0;j < this.sg.getRowCount();j++){
					if (this.sg.rowValid(j)){
						for (var i=0;i<this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.kode_akun == this.sg.cells(0,j)) {
								akunKB = true;		
                                if (this.c_jenis.getText().substr(1,1)=="D" && this.sg.cells(2,j)=="D") {
									this.nilaiKB += nilaiToFloat(this.sg.cells(4,j));
								}
								if (this.c_jenis.getText().substr(1,1)=="K" && this.sg.cells(2,j)=="C") {
									this.nilaiKB += nilaiToFloat(this.sg.cells(4,j));
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
					system.alert(this,"Transaksi tidak valid.","Nilai Kurs,Total Debet atau Kredit tidak boleh nol atau kurang.");
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
				this.cb1.setSelected(false);
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					this.nb = this.e_nb2.getText();
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update gr_panjarptg_m set progress='0', no_kas='-' where no_ptg='"+this.cb_ptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12)this.e_periode.setText(y+""+m);			
		else this.e_periode.setText(this.app._periode);									
	},
	doChange2:function(sender){									
		var idx = parseFloat(this.e_nu.getText());
		idx = idx.toString();
		if (idx.length == 1) var nu = "00"+idx;
		if (idx.length == 2) var nu = "0"+idx;
		if (idx.length == 3) var nu = idx;						
		this.e_nb2.setText(this.c_jenis2.getText() + nu + "/" + this.e_bulan.getText() + "/" + this.e_periode.getText().substr(2,2) + "/" + this.e_cabang2.getText() +"/" +this.cb_bank2.getText());
	},
	doCheck:function(sender){	
		this.ketemu = false;		
		var data = this.dbLib.getDataProvider("select keterangan "+
			           "from kas_m where no_kas='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				this.ketemu = true;
			} 
		}
	},
	doChange:function(sender){	
		if (sender == this.e_periode && this.e_periode.getText()!="") {			
			this.e_nb.setSQL("select a.no_kas, a.keterangan from kas_m a inner join gr_panjarptg_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
			                 "where b.progress ='1' and a.modul = 'KBPJPTGL' and a.posted='F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_kas","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}	
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			this.cb1.setSelected(true);						
			var data = this.dbLib.getDataProvider("select a.no_ptg,a.keterangan,a.kode_curr,a.kurs,a.nilai_curr,c.no_panjar,c.keterangan as ket_pj  "+
			           "from gr_panjarptg_m a inner join gr_panjar_m c on a.no_panjar=c.no_panjar and a.kode_lokasi=c.kode_lokasi "+
					   "where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.cb_ptg.setText(line.no_ptg,line.keterangan);
					this.cb_panjar.setText(line.no_panjar,line.ket_pj);										
					this.c_curr.setText(line.kode_curr);
					this.e_kurs.setText(floatToNilai(line.kurs));
					this.e_nilaiCurr.setText(floatToNilai(line.nilai_curr));					
					if (this.c_curr.getText() == "IDR") this.e_kurs.setReadOnly(true); 					
					else this.e_kurs.setReadOnly(false); 
				} 
			}
			var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.nilai_curr,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk  "+
						"from gr_panjarptg_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"                      inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+								
						"                      left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
						"where a.no_ptg = '"+this.cb_ptg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			} else this.sg3.clear(1);									
			this.sg3.validasi();					
			var data = this.dbLib.getDataProvider("select a.tanggal,a.periode,a.keterangan,a.jenis,a.nik_buat,b.nama as nama_buat,a.kode_pp,c.nama as nama_cab,a.kode_bank,d.nama as nama_bank,a.kode_curr,a.kurs "+
			           "from kas_m a "+
			           "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
			           "	inner join gr_cabang c on a.kode_pp=c.kode_cabang and a.kode_lokasi=c.kode_lokasi "+
					   "	inner join gr_bank d on a.kode_bank=d.kode_bank and a.kode_lokasi=d.kode_lokasi "+
					   "where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.c_jenis.setText(line.jenis);					
					this.cb_cabang.setText(line.kode_pp,line.nama_cab);
					this.cb_bank.setText(line.kode_bank,line.nama_bank);
					this.e_ket.setText(line.keterangan);					
					this.cb_buat.setText(line.nik_buat,line.nama_buat);					
					this.c_curr.setText(line.kode_curr);
					this.e_kurs.setText(floatToNilai(line.kurs));
					if (this.c_curr.getText() == "IDR") this.e_kurs.setReadOnly(true); 					
					else this.e_kurs.setReadOnly(false); 
					
					this.c_jenis2.setText(line.jenis);					
					this.e_cabang2.setText(line.kode_pp);
					this.cb_bank2.setText(line.kode_bank,line.nama_bank);
					this.e_bulan.setText(this.e_nb.getText().substr(6,1));
				} 				
			}				
			var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.nilai_curr,a.kode_pp,c.nama as nama_pp "+
						"from kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+														
						"where a.jenis = 'KB' and a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
				}
			} else this.sg.clear(1);			
		}		
		if (sender == this.e_kurs) {
			this.sg.validasi();
		}	
	},	
	doChangeCell: function(sender, col, row){
		if (col == 2 || col == 4) {			
			if (this.sg.cells(2,row) != "" && this.sg.cells(4,row) != "" && this.e_kurs.getText() != "") {				
				this.sg.cells(5,row,Math.round(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg.cells(4,row))));
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
		sender.onChange.set(this,"doChangeCell");			
	},
	doNilaiChange: function(){
		try{
			this.totCurr = 0;
			var totD = totC = 0;			
			for (var i = 0; i < this.sg3.rows.getLength();i++){
				if (this.sg3.rowValid(i) && this.sg3.cells(4,i) != "" && this.e_kurs.getText() != ""){
					this.sg3.cells(5,i,floatToNilai(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg3.cells(4,i))));					
					if (this.sg3.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg3.cells(5,i));
					if (this.sg3.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg3.cells(5,i));
				}
			}
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != "" && this.e_kurs.getText() != ""){
					this.sg.cells(5,i,floatToNilai(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg.cells(4,i))));					
					if (this.sg.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg.cells(5,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") {
						totC += nilaiToFloat(this.sg.cells(5,i));
						this.totCurr += nilaiToFloat(this.sg.cells(4,i));
					}
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
			var sls = totD - totC;
			this.e_sls.setText(floatToNilai(sls));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg.cells(2,row) == ""){
						this.sg.setCell(2,row,"D");						
					}
				break;
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
			case 6 : 
					if ((this.sg.cells(6,row) == "") && (row > 0)) {
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
						this.sg.setCell(7,row,this.sg.cells(7,(row-1)));
					}
					else {
						this.sg.setCell(6,row,this.app._kodePP);
						this.sg.setCell(7,row,this.app._namaPP);
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
				if (col == 6){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
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
								this.nama_report="server_report_saku2_siaga_rptBuktiBank";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.nb+"' ";
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
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.nb+")","");							
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
			this.c_curr.setText("IDR");
		} catch(e) {
			alert(e);
		}
	}
});