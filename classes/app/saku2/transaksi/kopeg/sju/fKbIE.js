window.app_saku2_transaksi_kopeg_sju_fKbIE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fKbIE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fKbIE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Produksi: Input/Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 				
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Jurnal","Data Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No KasBank","Tanggal","Status","Bank - No Ref.","Deskripsi"],
					colWidth:[[4,3,2,1,0],[400,300,80,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.c_jenis = new saiCBBL(this.pc2.childPage[1],{bound:[20,17,222,20],caption:"Jenis Dok", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,11,202,20],caption:"Status",items:["MCM","TRANSFER","CHEQUE","GIRO"], readOnly:true,tag:2});
		this.e_bank = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,320,20],caption:"Bank - No Ref.",maxLength:30});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[1],{bound:[350,14,120,20],caption:"",  labelWidth:0, maxLength:30});				
		this.e_debet = new saiLabelEdit(this.pc2.childPage[1],{bound:[770,14,220,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[1],{bound:[770,17,220,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[5,12,990,280], childPage:["Data Item Jurnal","Referensi Jurnal"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:15,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Penanggung","Nama","Tertanggung","Nama","COB","Nama","PIC","Nama"],
					colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[150,80,150,80,150,80,150,80,150,80,100,200,50,150,80]],					
					columnReadOnly:[true,[1,6,8,10,12,14],[0,2,3,4,5,7,9,11,13]],
					buttonStyle:[[0,2,5,7,9,11,13],[bsEllips,bsAuto,bsEllips,bsEllips,bsEllips,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.cb_ref = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Bukti Ref", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_jenis.setSQL("select no_dokumen, nama from sju_dokumen where modul = 'KB' and kode_lokasi='"+this.app._lokasi+"'",["no_dokumen","nama"],false,["Format","Nama"],"and","Data Format Dokumen",true);
			this.cb_ref.setSQL("select no_bukti, keterangan from sju_jurnalref_m where modul='KB' and kode_lokasi='"+this.app._lokasi+"'",["no_bukti","keterangan"],false,["Bukti","Deskripsi"],"and","Data Referensi JU",true);
			
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
			this.dataPP = this.app._pp;
			this.c_jenis.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fKbIE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fKbIE.implement({
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
			if (this.stsSimpan == 1) this.doClick();			
			if (this.e_periode.getText().substr(2,4) != this.e_nb.getText().substr(3,4)) {
				system.alert(this,"Transaksi tidak valid.","No Bukti tidak sesuai periode-nya.");
				return false;
			}			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from sju_kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					}
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_status.getText()+"','"+this.e_dok.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','KBASUR','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_debet.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.e_bank.getText()+"','-')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"	('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+parseNilai(this.sg.cells(4,i))+",'"+this.sg.cells(5,i)+"','-','-','-','"+this.app._lokasi+"','KBASUR','UMUM','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
								sql.add("insert into sju_kas_j(no_kas,kode_lokasi,no_urut,kode_vendor,kode_cust,kode_tipe,kode_pic) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(7,i)+"','"+this.sg.cells(9,i)+"','"+this.sg.cells(11,i)+"','"+this.sg.cells(13,i)+"')");
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :																	
			case "ubah" :						
				this.preView = "1";				
				this.dataAkunProd = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag = '044' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunProd = data;
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
					else {
						for (var j=0;j<this.dataAkunProd.rs.rows.length;j++){
							line = this.dataAkunProd.rs.rows[j];
							if (line.kode_akun == this.sg.cells(0,i)) {		
								if (this.sg.cells(7,i) == "-" || this.sg.cells(9,i) == "-" || this.sg.cells(11,i) == "-") {
								var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Kolom Insurer, Insured, COB Harus diisi.[Baris : "+k+"]");
								return false;
								}
							}
						}
					}
				}
				this.dataJU = {rs:{rows:[]}};
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
				this.preView = "0";
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
					sql.add("delete from sju_kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
		if (this.stsSimpan == 1) this.doClick();
		this.doLoad3();		
	},
	doChange:function(sender){
		if (sender == this.c_jenis && this.c_jenis.getText()!="") {			
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' "+
					"left join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi and c.kode_flag in ('001','009') "+
					"where c.kode_akun is null and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' "+
					"union "+
					"select a.kode_akun,a.nama from masakun a inner join sju_dokakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.no_dokumen = '"+this.c_jenis.getText()+"' "+
					"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' ",							
					"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("select kode_vendor,nama from sju_vendor where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ");
			sql.add("select kode_cust,nama from sju_cust where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ");
			sql.add("select kode_tipe,nama from sju_tipe where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ");
			sql.add("select kode_pic,nama from sju_pic where kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ");			
			this.dbLib.getMultiDataProviderA(sql);
		
		}
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan ==1) this.doClick();
		if (sender == this.cb_ref && this.cb_ref.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_vendor,isnull(d.nama,'-') as nama_vendor,a.kode_cust,isnull(e.nama,'-') as nama_cust,a.kode_tipe,isnull(f.nama,'-') as nama_tipe,a.dc,a.nilai,a.keterangan  "+
					   "from sju_jurnalref_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					   "                       inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					   "                       left join sju_vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+
					   "                       left join sju_cust e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi "+
					   "                       left join sju_tipe f on a.kode_tipe=f.kode_tipe and a.kode_lokasi=f.kode_lokasi "+
					   "where a.no_bukti='"+this.cb_ref.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_vendor,line.nama_vendor,line.kode_cust,line.nama_cust,line.kode_tipe,line.nama_tipe,"-","-"]);
				}
			} else this.sg.clear(1);
			this.sg.validasi();				
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		}
	},
	doClick:function(sender){
		try{
			if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
				if (this.stsSimpan == 0) {					
					this.sg.clear(1);
				}
				this.stsSimpan = 1;
				var AddFormat = this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/___%"+this.c_jenis.getText().substr(2,3);
				var data = this.dbLib.getDataProvider("select isnull(max(no_kas),0) as no_kas from kas_m where no_kas like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.no_kas == "0") this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/001"+this.c_jenis.getText().substr(2,3));
						else {
							var idx = parseFloat(line.no_kas.substr(8,3)) + 1;
							idx = idx.toString();
							if (idx.length == 1) var nu = "00"+idx;
							if (idx.length == 2) var nu = "0"+idx;
							if (idx.length == 3) var nu = idx;
							this.e_nb.setText(this.c_jenis.getText().substr(0,2)+"/"+this.e_periode.getText().substr(2,4)+"/"+nu+this.c_jenis.getText().substr(2,3));						
						}
					} 
				}
				this.e_bank.setFocus();
				setTipeButton(tbSimpan);
			}
		}
		catch(e) {alert(e);}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) {
					sender.cells(1,row,akun);
					var data = this.dbLib.getDataProvider("select normal from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							sender.cells(2,row,line.normal);
						}
					}
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
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
			if (this.sg.cells(7,row) != "") {
				var vendor = this.dataVendor.get(sender.cells(7,row));
				if (vendor) sender.cells(8,row,vendor);
				else {
					if (trim(sender.cells(7,row)) != "") system.alert(this,"Kode Insured "+sender.cells(7,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(7,row,"");
					sender.cells(8,row,"");
				}				
			}
		}
		if (col == 9) {
			if (this.sg.cells(9,row) != "") {
				var cust = this.dataCust.get(sender.cells(9,row));
				if (cust) sender.cells(10,row,cust);
				else {
					if (trim(sender.cells(9,row)) != "") system.alert(this,"Kode Insurer "+sender.cells(9,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(9,row,"");
					sender.cells(10,row,"");
				}				
			}
		}
		if (col == 11) {
			if (this.sg.cells(11,row) != "") {
				var tipe = this.dataTipe.get(sender.cells(11,row));
				if (tipe) sender.cells(12,row,tipe);
				else {
					if (trim(sender.cells(11,row)) != "") system.alert(this,"Type Insurance "+sender.cells(11,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(11,row,"");
					sender.cells(12,row,"");
				}				
			}
		}
		if (col == 13) {
			if (this.sg.cells(13,row) != "") {
				var pic = this.dataPic.get(sender.cells(13,row));
				if (pic) sender.cells(14,row,pic);
				else {
					if (trim(sender.cells(13,row)) != "") system.alert(this,"PIC "+sender.cells(13,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(13,row,"");
					sender.cells(14,row,"");
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
			this.e_debet.setText(floatToNilai(Math.round(totD * 100) / 100));
			this.e_kredit.setText(floatToNilai(Math.round(totC * 100)/100));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
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
				break;
			case 7 : 
					if ((this.sg.cells(7,row) == "") && (row > 0)) {
						this.sg.setCell(7,row,this.sg.cells(7,(row-1)));
						this.sg.setCell(8,row,this.sg.cells(8,(row-1)));
					}
				break;				
			case 9 : 
					if ((this.sg.cells(9,row) == "") && (row > 0)) {
						this.sg.setCell(9,row,this.sg.cells(9,(row-1)));
						this.sg.setCell(10,row,this.sg.cells(10,(row-1)));
					}
				break;			
			case 11 : 
					if ((this.sg.cells(11,row) == "") && (row > 0)) {
						this.sg.setCell(11,row,this.sg.cells(11,(row-1)));
						this.sg.setCell(12,row,this.sg.cells(12,(row-1)));
					}
				break;
			case 13 : 
					if ((this.sg.cells(13,row) == "") && (row > 0)) {
						this.sg.setCell(13,row,this.sg.cells(13,(row-1)));
						this.sg.setCell(14,row,this.sg.cells(14,(row-1)));
					}
				break;
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){				
						this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from (select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' "+
							"left join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi and c.kode_flag in ('001','009') "+
							"where c.kode_akun is null and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' "+
							"union "+
							"select a.kode_akun,a.nama from masakun a inner join sju_dokakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.no_dokumen = '"+this.c_jenis.getText()+"' "+
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"')a ",																													
							"select count(a.kode_akun) from ( "+
							"select a.kode_akun,a.nama "+
							"from masakun a "+
							"inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '035' "+
							"left join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi and c.kode_flag in ('001','009') "+
							"where c.kode_akun is null and a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' "+
							"union "+
							"select a.kode_akun,a.nama from masakun a "+
							"inner join sju_dokakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.no_dokumen = '"+this.c_jenis.getText()+"' "+
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' "+
							")a ",
							["a.kode_akun","a.nama"],"where",["Kode","Nama"],false);									
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){					
					this.standarLib.showListData(this, "Daftar Penanggung",sender,undefined, 
							"select kode_vendor, nama  from sju_vendor where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_vendor) from sju_vendor where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_vendor","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 9){					
					this.standarLib.showListData(this, "Daftar Tertanggung",sender,undefined, 
							"select kode_cust, nama  from sju_cust where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_cust) from sju_cust where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_cust","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 11){					
					this.standarLib.showListData(this, "Daftar COB",sender,undefined, 
							"select kode_tipe, nama  from sju_tipe where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_tipe) from sju_tipe where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_tipe","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 13){					
					this.standarLib.showListData(this, "Daftar PIC",sender,undefined, 
							"select kode_pic, nama  from sju_pic where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_pic) from sju_pic where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_pic","nama"],"and",["Kode","Nama"],false);				
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
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_kopeg_sju_rptKbJurnalBukti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter2 ="";
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
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();							
							this.dataVendor = new portalui_arrayMap();							
							this.dataCust = new portalui_arrayMap();							
							this.dataTipe = new portalui_arrayMap();	
							this.dataPic = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataVendor.set(line.kode_vendor, line.nama);									
								}
							}
							if (result.result[2]){	    			        
								var line;
								for (var i in result.result[2].rs.rows){
									line = result.result[2].rs.rows[i];
									this.dataCust.set(line.kode_cust, line.nama);
								}
							}
							if (result.result[3]){	    			        
								var line;
								for (var i in result.result[3].rs.rows){
									line = result.result[3].rs.rows[i];
									this.dataTipe.set(line.kode_tipe, line.nama);
								}
							}
							if (result.result[4]){	    			        
								var line;
								for (var i in result.result[4].rs.rows){
									line = result.result[4].rs.rows[i];
									this.dataPic.set(line.kode_pic, line.nama);
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
				this.pc2.show();   
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
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.doLoad3();
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen as status,a.ref1+' - '+a.no_bg as no_ref,a.keterangan "+
		             "from kas_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KBASUR' and a.posted ='F'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_kas,line.tgl,line.status,line.no_ref,line.keterangan]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select keterangan,akun_kb,no_dokumen,ref1,jenis,no_bg,tanggal "+
							 "from kas_m "+							 
							 "where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);	
						this.c_jenis.setText(line.jenis);					
						this.c_status.setText(line.no_dokumen);					
						this.e_dok.setText(line.no_bg);					
						this.e_ket.setText(line.keterangan);
						this.e_bank.setText(line.ref1);																
					}
				}								
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp, "+
							"aa.kode_cust,aa.kode_tipe,aa.kode_pic,aa.kode_vendor,isnull(e.nama ,'-') as nama_cust,isnull(f.nama,'-') as nama_vendor,isnull(g.nama,'-') as nama_tipe,isnull(h.nama,'-') as nama_pic "+
							"from kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"             inner join sju_kas_j aa on a.no_kas=aa.no_kas and a.kode_lokasi=aa.kode_lokasi and a.no_urut=aa.no_urut "+						
							"             left  join sju_cust e on aa.kode_cust=e.kode_cust and aa.kode_lokasi=e.kode_lokasi "+
							"             left  join sju_vendor f on aa.kode_vendor=f.kode_vendor and aa.kode_lokasi=f.kode_lokasi "+
							"             left  join sju_tipe g on aa.kode_tipe=g.kode_tipe and aa.kode_lokasi=g.kode_lokasi "+						
							"             left  join sju_pic h on aa.kode_pic=h.kode_pic and aa.kode_lokasi=h.kode_lokasi "+						
							"where a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_vendor,line.nama_vendor,line.kode_cust,line.nama_cust,line.kode_tipe,line.nama_tipe,line.kode_pic,line.nama_pic]);
					}
				} else this.sg.clear(1);			
			}									
		} catch(e) {alert(e);}
	}
});