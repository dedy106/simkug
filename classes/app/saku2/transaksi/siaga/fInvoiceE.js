window.app_saku2_transaksi_siaga_fInvoiceE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fInvoiceE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fInvoiceE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Piutang Umum: Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,16,240,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_pp = new saiCBBL(this,{bound:[20,16,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.cb_drk = new saiCBBL(this,{bound:[20,12,200,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});						
		this.cb_akun = new saiCBBL(this,{bound:[20,13,200,20],caption:"Akun Piutang", multiSelection:false, maxLength:10, tag:2});						
		this.cb_buat = new saiCBBL(this,{bound:[20,14,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});				
		this.cb_cust = new saiCBBL(this,{bound:[20,19,200,20],caption:"Customer", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});							
		this.e_nilaiCurr = new saiLabelEdit(this,{bound:[790,19,210,20],caption:"Nilai Curr", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.c_curr = new saiCB(this,{bound:[20,20,160,20],caption:"Mt Uang - Kurs",readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this,{bound:[190,20,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"]});				
		this.e_nilai = new saiLabelEdit(this,{bound:[790,20,210,20],caption:"Nilai IDR", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
				
		this.p1 = new portalui_panel(this,{bound:[20,12,980,250],caption:"Item Deskripsi Tagihan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:6,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Nilai IDR"],
					colWidth:[[5,4,3,2,1,0],[100,100,330,50,250,100]],					
					columnReadOnly:[true,[1,5],[0,2,3,4]],
					buttonStyle:[[0,2],[bsEllips,bsAuto]], 
					colFormat:[[4,5],[cfNilai,cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		//this.dataAkun = this.app._masakun;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag = '003' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun Piutang",true);			
			this.cb_cust.setSQL("select kode_cust, nama from gr_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Mengetahui",true);			
			this.cb_pp.setSQL("select kode_pp, nama from pp where tipe='posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");						
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
			
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('021','022') where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fInvoiceE.extend(window.childForm);
window.app_saku2_transaksi_siaga_fInvoiceE.implement({
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
					sql.add("delete from gr_piutang_m where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_piutang_j where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into gr_piutang_m(no_piutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_cust,kode_curr,kurs,nik_buat,nik_app,kode_pp,nilai_curr,nilai,periode,nik_user,tgl_input,akun_piutang,kode_drk,posted,nilai_ppn) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_cust.getText()+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.cb_pp.getText()+"',"+parseNilai(this.e_nilaiCurr.getText())+","+parseNilai(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','F',"+this.nilaiPPN+")");					
					sql.add("insert into gr_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_nilaiCurr.getText())+","+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','PIUTANG','PIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");																		
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){															
								var j = i+1;
								sql.add("insert into gr_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','PIUTANG','PDPT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");								
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
					this.c_curr.setText("IDR");
					setTipeButton(tbUbahHapus);					
				break;
			case "ubah" :						
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag = '021' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
				}
				var k=0;
				this.nilaiPPN = 0;
				for (var j=0;j < this.sg.getRowCount();j++){
					if (this.sg.rowValid(j)){
						for (var i=0;i<this.dataJU.rs.rows.length;i++){
							line = this.dataJU.rs.rows[i];
							if (line.kode_akun == this.sg.cells(0,j)) this.nilaiPPN = nilaiToFloat(this.sg.cells(4,j));								
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
				}				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();				
				if (nilaiToFloat(this.e_nilaiCurr.getText()) <= 0 || nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Kurs,Nilai Curr dan Nilai IDR tidak boleh nol atau kurang.");
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_piutang_m where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_piutang_j where no_piutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);					
	},
	doChange:function(sender){		
		if (sender == this.e_periode && this.e_periode.getText()!="") {	
			//abaikan dc, yg penting kalo udah ada bayar gak boleh koreksi meski secara total = 0
			this.e_nb.setSQL("select a.no_piutang, a.keterangan from gr_piutang_m a "+
			                 "       left join (select no_piutang,kode_lokasi,sum(nilai_kas+nilai_lain) as bayar from gr_piutangbayar_d group by no_piutang,kode_lokasi) b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
			                 "where isnull(b.bayar,0) = 0 and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_piutang","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);					
		}	
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			this.cb1.setSelected(true);			
			var data = this.dbLib.getDataProvider("select a.tanggal,a.periode,a.no_dokumen,a.keterangan,a.nik_buat,b.nama as nama_buat,a.kode_pp,c.nama as nama_pp,a.nik_app,d.nama as nama_app,a.akun_piutang,f.nama as nama_akun,a.kode_cust,g.nama as nama_cust,a.kode_curr,a.kurs,h.kode_drk,h.nama as nama_drk "+
			           "from gr_piutang_m a "+
			           "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
			           "	inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					   "	inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+
					   "    inner join masakun f on a.akun_piutang=f.kode_akun and a.kode_lokasi=f.kode_lokasi "+					   
					   "    inner join gr_cust g on a.kode_cust=g.kode_cust and a.kode_lokasi=g.kode_lokasi "+
					   "    inner join drk h on a.kode_drk=h.kode_drk and a.kode_lokasi=h.kode_lokasi and substring(a.periode,1,4)=h.tahun "+
					   "where a.no_piutang='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);					
					this.cb_pp.setText(line.kode_pp,line.nama_pp);
					this.cb_app.setText(line.nik_app,line.nama_app);
					this.e_ket.setText(line.keterangan);					
					this.e_dok.setText(line.no_dokumen);					
					this.cb_buat.setText(line.nik_buat,line.nama_buat);					
					this.cb_akun.setText(line.akun_piutang,line.nama_akun);		
					this.cb_cust.setText(line.kode_cust,line.nama_cust);	
					this.cb_drk.setText(line.kode_drk,line.nama_drk);	
					this.c_curr.setText(line.kode_curr);					
					this.e_kurs.setText(floatToNilai(line.kurs));					
					if (this.c_curr.getText() == "IDR") this.e_kurs.setReadOnly(true); 					
					else this.e_kurs.setReadOnly(false); 
				} 
			}
			var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.nilai_curr "+
						"from gr_piutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+						
						"where a.jenis = 'PDPT' and a.no_piutang = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);									
			this.sg.validasi();						
		}		
		if (sender == this.cb_pp && this.cb_pp.getText()!="")
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
		if (sender == this.c_curr) {
			if (this.c_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); this.e_kurs.setText("1"); this.sg.validasi();
			}
			else {
				this.e_kurs.setReadOnly(false); this.e_kurs.setText("0"); this.sg.validasi();
			}
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
		sender.onChange.set(this,"doChangeCell");			
	},	
	doNilaiChange: function(){
		try{
			var totCurr = tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != "" && this.e_kurs.getText() != ""){
					this.sg.cells(5,i,floatToNilai(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg.cells(4,i))));					
					if (this.sg.cells(2,i).toUpperCase() == "D") {
						totCurr -= nilaiToFloat(this.sg.cells(4,i));
						tot -= nilaiToFloat(this.sg.cells(5,i));
					}
					else {
						totCurr += nilaiToFloat(this.sg.cells(4,i));
						tot += nilaiToFloat(this.sg.cells(5,i));
					}					
				}
			}			
			this.e_nilaiCurr.setText(floatToNilai(totCurr));
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg.cells(2,row) == ""){
						this.sg.setCell(2,row,"C");						
					}
				break;			
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun,a.nama    from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('022','021') and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(a.kode_akun)    from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('022','021') and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
												  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
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
	    			case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses tereksekusi");
						this.app._mainForm.bClear.click();              
					}else {
						system.info(this, result,"");											
						setTipeButton(tbUbahHapus);
					}
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
	}	
});