window.app_saku3_transaksi_piutang_fPiutangGroup = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_piutang_fPiutangGroup.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_piutang_fPiutangGroup";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesain Piutang Group: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Lok Asal","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,410,180,80,80,100]],colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Akun Penyelesaian", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		
		this.e_noapp = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,202,20],caption:"No BAST", maxLength:200});						
		
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,202,20],caption:"Saldo Budget", readOnly:true,tipeText:ttNilai, text:"0"});		
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,202,20],caption:"Total", readOnly:true,tipeText:ttNilai, text:"0"});		
		this.bTampil = new button(this.pc2.childPage[0],{bound:[500,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});			
		this.bJurnal = new button(this.pc2.childPage[0],{bound:[620,17,80,18],caption:"Jurnal",click:[this,"doJurnal"]});			
		this.i_appAll = new portalui_imageButton(this.pc2.childPage[0],{bound:[710,17,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
			
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,252], childPage:["Daftar Approve Piutang","Jurnal"]});						
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:9,
				colTitle:["Status","No Piutang","Loker","Tanggal","Keterangan","Modul","Jenis","Nilai","Kunj","CS","No BAST"],
				colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,80,80,100,60,60,260,80,70,100,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[]],
				colFormat:[[7,8,9],[cfNilai,cfNilai,cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],checkItem:true,
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,100,240,50,200,100]],
					columnReadOnly:[true,[0,1,2,4,5,6],[3]],
					colFormat:[[4],[cfNilai]],					
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='PPBPCC' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodepp = line.flag;
			} else this.kodepp = '-';
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_piutang_fPiutangGroup.extend(window.childForm);
window.app_saku3_transaksi_piutang_fPiutangGroup.implement({
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from yk_hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update yk_bill_d set no_piutang='-' where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update yk_billkunj_d set no_piutang='-' where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into yk_hutang_m(no_hutang,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,tgl_input,nik_user,kode_loktuj,no_app,progress) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','SLSGR','SLSGR','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.cb_app.getText()+"','F',getdate(),'"+this.app._userLog+"','"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"','X')");							
					if (this.sg2.getRowValidCount() > 0){
						var j=0;						
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
							    j = i+1;
								sql.add("insert into yk_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.cb_pp.getText()+"','"+this.sg2.cells(6,i)+"','"+this.app._lokasi+"','SLSGR','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");																
							}
						}
					}
					sql.add("insert into yk_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','SLSGR','TTP','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");																
					var nobukti = ""; 
					var nokunj = ""; 
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
							if (this.sg.cells(6,i) == "BP") nobukti += ",'"+this.sg.cells(1,i)+this.sg.cells(2,i)+this.sg.cells(10,i)+"'";
							if (this.sg.cells(6,i) == "KJCS") nokunj += ",'"+this.sg.cells(1,i)+this.sg.cells(2,i)+this.sg.cells(10,i)+"'";
						}
					}		
					
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_nb.getText()+"','SLSGR','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_nilai.getText())+")");
					
					if (nobukti != "") nobukti = nobukti.substr(1);		
					if (nokunj != "") nokunj = nokunj.substr(1);		
					
					if (nobukti == "") nobukti = "''";
					else sql.add("update yk_bill_d set no_piutang='"+this.e_nb.getText()+"' where no_hutang+loker+no_selesai in ("+nobukti+") and kode_lokasi='"+this.app._lokasi+"' ");
					if (nokunj == "") nokunj = "''";
					else sql.add("update yk_billkunj_d set no_piutang='"+this.e_nb.getText()+"' where no_hutang+loker+no_selesai in ("+nokunj+") and kode_lokasi='"+this.app._lokasi+"' ");
					
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
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :					
			case "ubah" :							
				this.dataKB = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataKB = data;
				} 
				var akunKB = false;				
				for (var i=0;i<this.dataKB.rs.rows.length;i++){
					line = this.dataKB.rs.rows[i];
					if (line.kode_akun == this.cb_akun.getText()) {
						akunKB = true;								
					}
				}				
				if (akunKB) {
					system.alert(this,"Transaksi tidak valid.","Akun KasBank tidak boleh dipakai.");
					return false;						
				}				
				this.dataAkunGar = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}				
				for (var j=0;j<this.dataAkunGar.rs.rows.length;j++){
					line = this.dataAkunGar.rs.rows[j];
					if (line.kode_akun == this.cb_akun.getText() && this.cb_drk.getText() == "-") {								
						system.alert(this,"Transaksi tidak valid.","Akun Penyelesaian Anggaran Harus diisi DRK");
						return false;						
					}
					if (line.kode_akun == this.cb_akun.getText() && this.cb_drk.getText() != "-") {								
						if (nilaiToFloat(this.e_saldo.getText()) < nilaiToFloat(this.e_nilai.getText())) {
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi.");
							return false;						
						}
					}
				}
					
				var totD = totC = 0;
				for (var i = 0; i < this.sg2.rows.getLength();i++){
					if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
						if (this.sg2.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg2.cells(4,i));
						if (this.sg2.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg2.cells(4,i));
					}
				}
				totD += nilaiToFloat(this.e_nilai.getText());
				if (totD != totC) {
					system.alert(this,"Transaksi tidak valid.","Debet dan Kredit tidak balance.");
					return false;						
				}
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_nilai.getText()) <= 0 || totD == 0) {
					system.alert(this,"Transaksi tidak valid.","Total / Jurnal tidak boleh nol atau kurang.");
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
					sql.add("delete from yk_hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update yk_bill_d set no_piutang='-' where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_billkunj_d set no_piutang='-' where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doChange:function(sender){
		if (sender == this.cb_akun && this.cb_akun.getText()!="") {
			var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.stsGar = line.status_gar;
				} 
			}
			if (this.stsGar == "1") {				
				this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
			}
			else {				
				this.cb_drk.setSQL("select '-' as kode_drk, '-' as nama ",["kode_drk","nama"],false,["Kode","Nama"],"where","Data DRK",true);											
			}
		}
		if (sender == this.e_periode || sender == this.cb_akun || sender == this.cb_pp || sender == this.cb_drk) {
			this.e_saldo.setText("0");				
			if (this.cb_akun.getText()!="" && this.cb_pp.getText()!="" && this.cb_drk.getText()!="") {
				if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"') as gar ",true);
				else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					data = line.gar.split(";");
					var sls = parseFloat(data[0]) - parseFloat(data[1]);
					this.e_saldo.setText(floatToNilai(sls));				
				}				
			}
		}
	},	
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg3.clear(1); this.sg2.clear(1); 
				this.e_nilai.setText("0");								
			}			
			if (sender == this.i_gen) {
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_hutang_m","no_hutang",this.app._lokasi+"-SLP"+this.e_periode.getText().substr(2,4)+".","0000"));
				this.stsSimpan = 1;
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}
			if (sender == this.i_appAll) {
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							this.sg.cells(0,i,"INPROG");							
						}
					}
				}
				
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (this.e_noapp.getText() == "") this.sg.cells(0,i,"APP");
							else {
								if (this.e_noapp.getText() == this.sg.cells(10,i)) this.sg.cells(0,i,"APP");
							}
						}
					}
				}
				this.sg.validasi();
			}
		}		
	},	
	doLoadData:function(sender){						  
		var data = this.dbLib.getDataProvider(
				   "select a.no_hutang,a.loker,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,a.jenis,sum(a.nilai) as nilai,sum(a.kunj) as kunj,sum(a.cs) as cs,a.no_selesai "+
				   "from ( "+					   
				   
				   "select a.no_terima as no_hutang,b.loker,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,'BP' as jenis,sum(b.nilai) as nilai,0 as kunj,0 as cs,b.no_selesai "+
				   "from takterima_m a inner join yk_bill_d b on a.no_terima=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					   
				   "                   inner join yk_loker bb on b.loker=bb.loker "+
				   "                   inner join cust c on bb.kode_cust=c.kode_cust and c.kode_lokasi='"+this.app._lokasi+"' "+ 
				   "where b.jenis<>'AKRU' and b.no_piutang='-' and b.no_selesai <> '-' and c.jenis = 'GROUP' and a.periode <= '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('BILTERIMA','TMTERIMA') "+ 
				   "group by a.no_terima,b.loker,convert(varchar,a.tanggal,103),a.keterangan,a.modul,b.no_selesai "+
				   "union all "+
				   "select a.no_terima as no_hutang,b.loker,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,'KJCS' as jenis,0 as nilai,case when c.jenis = 'PENSIUN' then 0 else sum(b.umum+b.gigi+b.kbia+b.matkes) end as kunj,case when c.jenis = 'PENSIUN' then 0 else sum(b.cs) end as cs,b.no_selesai "+
				   "from takterima_m a inner join yk_billkunj_d b on a.no_terima=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					   
				   "                   inner join yk_loker bb on b.loker=bb.loker "+
				   "                   inner join cust c on bb.kode_cust=c.kode_cust and c.kode_lokasi='"+this.app._lokasi+"' "+ 
				   "where b.jenis<>'AKRU' and b.no_piutang='-' and b.no_selesai <> '-' and c.jenis = 'GROUP' and a.periode <= '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('BILTERIMA','TMTERIMA') "+ 
				   "group by a.no_terima,b.loker,convert(varchar,a.tanggal,103),a.keterangan,a.modul,c.jenis,b.no_selesai "+					   					   
				   "union all "+
				   
				   "select a.no_hutang,b.loker,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,'BP' as jenis,sum(b.nilai) as nilai,0 as kunj,0 as cs,b.no_selesai "+
				   "from yk_hutang_m a inner join yk_bill_d b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
				   "                   inner join yk_loker bb on b.loker=bb.loker "+
				   "                   inner join cust c on bb.kode_cust=c.kode_cust and c.kode_lokasi='"+this.app._lokasi+"' "+ 
				   "where b.jenis<>'AKRU' and b.no_piutang='-' and b.no_selesai <> '-' and c.jenis = 'GROUP' and a.periode <= '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('HUTKES','BAREV') "+
				   "group by a.no_hutang,b.loker,convert(varchar,a.tanggal,103),a.keterangan,a.modul,b.no_selesai "+
				   "union all "+
				   "select a.no_hutang,b.loker,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,'KJCS' as jenis,0 as nilai,case when c.jenis = 'PENSIUN' then 0 else sum(b.umum+b.gigi+b.kbia+b.matkes) end as kunj,case when c.jenis = 'PENSIUN' then 0 else sum(b.cs) end as cs,b.no_selesai "+
				   "from yk_hutang_m a inner join yk_billkunj_d b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
				   "                   inner join yk_loker bb on b.loker=bb.loker "+
				   "                   inner join cust c on bb.kode_cust=c.kode_cust and c.kode_lokasi='"+this.app._lokasi+"' "+ 
				   "where b.jenis<>'AKRU' and b.no_piutang='-' and b.no_selesai <> '-' and c.jenis = 'GROUP' and a.periode <= '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('HUTKES','PDPT','PDPTREV','BAREV','KAPITASI') "+
				   "group by a.no_hutang,b.loker,convert(varchar,a.tanggal,103),a.keterangan,a.modul,c.jenis,b.no_selesai "+					   
				   
				   ") a where a.nilai+a.kunj+abs(cs) <> 0 group by a.no_hutang,a.loker,convert(varchar,a.tanggal,103),a.keterangan,a.modul,a.jenis,a.no_selesai "+
				   " order by a.loker,a.no_selesai",true);				   
					  
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData(["INPROG",line.no_hutang,line.loker,line.tanggal,line.keterangan,line.modul,line.jenis.toUpperCase(),floatToNilai(line.nilai),floatToNilai(line.kunj),floatToNilai(line.cs),line.no_selesai]);
			}
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	},
	doJurnal:function(sender){				
		this.sg2.clear(0); 		
		var nobukti = ""; 
		var nokunj = ""; 
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
				if (this.sg.cells(6,i) == "BP") nobukti += ",'"+this.sg.cells(1,i)+this.sg.cells(2,i)+this.sg.cells(10,i)+"'";
				if (this.sg.cells(6,i) == "KJCS") nokunj += ",'"+this.sg.cells(1,i)+this.sg.cells(2,i)+this.sg.cells(10,i)+"'";
			}
		}		
		if (nobukti != "") nobukti = nobukti.substr(1);		
		if (nokunj != "") nokunj = nokunj.substr(1);		
		
		if (nobukti == "") nobukti = "''";
		if (nokunj == "") nokunj = "''";
		
		var ket = this.e_ket.getText();
		if (ket == "") ket = "-";
							
		var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,'"+ket+"' as ket,a.nilai,a.jenis "+
					"from "+
					"( "+					
							"select 'SLSPIUBP' as jenis,a.kode_lokasi,case b.jenis "+
							"		 	when 'GROUP' then c.akun_ap "+
							"	    end as kode_akun,  "+
							"	    'C' as dc, sum(a.nilai) as nilai  "+
							"from yk_bill_d a "+
							"         inner join yk_loker bb on a.loker = bb.loker "+
							"         inner join cust b on bb.kode_cust = b.kode_cust "+
							"         inner join yk_produk c on a.kode_produk = c.kode_produk  "+
							"where a.nilai>0 and b.jenis = 'GROUP' and a.no_hutang+a.loker+a.no_selesai in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+							
		                    "group by a.kode_lokasi,case b.jenis "+
							"		 	when 'GROUP' then c.akun_ap "+							
							"	    end "+
							"union all "+
							
							"select 'SLSPIUBP' as jenis,a.kode_lokasi,case b.jenis "+
							"		 	when 'GROUP' then c.akun_ap "+
							"	    end as kode_akun,  "+
							"	    'D' as dc, abs(sum(a.nilai)) as nilai  "+
							"from yk_bill_d a "+
							"         inner join yk_loker bb on a.loker = bb.loker "+
							"         inner join cust b on bb.kode_cust = b.kode_cust "+
							"         inner join yk_produk c on a.kode_produk = c.kode_produk  "+
							"where a.nilai<0 and b.jenis = 'GROUP' and a.no_hutang+a.loker+a.no_selesai in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+							
		                    "group by a.kode_lokasi,case b.jenis "+
							"		 	when 'GROUP' then c.akun_ap "+							
							"	    end "+
							"union all "+
													
							//KUNJ
							"select 'SLSPIUKUNJ' as jenis,a.kode_lokasi,c.akun_pap as kode_akun,  "+
							"	   'C' as dc, sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai "+
							"from yk_billkunj_d a "+
							"         inner join yk_loker bb on a.loker = bb.loker "+
							"         inner join cust b on bb.kode_cust = b.kode_cust "+
							"         inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where b.jenis = 'GROUP' and (a.umum+a.gigi+a.kbia+a.matkes) > 0 and a.no_hutang+a.loker+a.no_selesai in ("+nokunj+") and a.kode_lokasi='"+this.app._lokasi+"' "+							
							"group by  a.kode_lokasi,c.akun_pap "+
							
							"union all "+
							"select 'SLSPIUKUNJ' as jenis,a.kode_lokasi,c.akun_pap as kode_akun,  "+
							"	   'D' as dc, abs(sum(a.umum+a.gigi+a.kbia+a.matkes)) as nilai "+
							"from yk_billkunj_d a "+
							"         inner join yk_loker bb on a.loker = bb.loker "+
							"         inner join cust b on bb.kode_cust = b.kode_cust "+
							"         inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where b.jenis = 'GROUP' and (a.umum+a.gigi+a.kbia+a.matkes)< 0 and a.no_hutang+a.loker+a.no_selesai in ("+nokunj+") and a.kode_lokasi='"+this.app._lokasi+"' "+							
							"group by  a.kode_lokasi,c.akun_pap "+

							"union all "+
							
							//CS
							"select 'SLSPIUCS' as jenis,a.kode_lokasi,c.akun_piucs as kode_akun,  "+
							"	   'D' as dc, sum(a.cs) as nilai "+
							"from yk_billkunj_d a "+
							"         inner join yk_loker bb on a.loker = bb.loker "+
							"         inner join cust b on bb.kode_cust = b.kode_cust "+
							"		  inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where b.jenis = 'GROUP' and a.cs> 0 and a.no_hutang+a.loker+a.no_selesai in ("+nokunj+") and a.kode_lokasi='"+this.app._lokasi+"' "+							
							"group by  a.kode_lokasi,c.akun_piucs "+														
							"union all "+							
							"select 'SLSPIUCS' as jenis,a.kode_lokasi,c.akun_piucs as kode_akun,  "+
							"	   'C' as dc, abs(sum(a.cs)) as nilai "+
							"from yk_billkunj_d a "+
							"         inner join yk_loker bb on a.loker = bb.loker "+
							"         inner join cust b on bb.kode_cust = b.kode_cust "+
							"		  inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where b.jenis = 'GROUP' and a.cs< 0 and a.no_hutang+a.loker+a.no_selesai in ("+nokunj+") and a.kode_lokasi='"+this.app._lokasi+"' "+							
							"group by  a.kode_lokasi,c.akun_piucs "+																					
							
					") a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"order by a.dc desc,a.kode_akun";
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),"9000001"]);
			}
		}		
		this.sg2.validasi();
		this.pc1.setActivePage(this.pc1.childPage[1]);				
	},
	doChangeCell: function(sender, col, row){
		if ((col == 0) && (this.sg.cells(0,row) != "")) {
			this.sg2.clear(1);					
			this.sg.validasi();		
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){
					tot += nilaiToFloat(this.sg.cells(7,i)) + nilaiToFloat(this.sg.cells(8,i)) - nilaiToFloat(this.sg.cells(9,i));					
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
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
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
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
								this.pc2.hide();
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
			this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.kode_lokasi,a.no_dokumen,a.keterangan,a.nilai "+
		             "from yk_hutang_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'SLSGR' and a.posted ='F'";		
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
			this.sg3.appendData([line.no_hutang,line.tgl,line.kode_lokasi,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select keterangan,no_dokumen,tanggal,nik_setuju,kode_pp,kode_loktuj as drk,no_app as akun "+
							 "from yk_hutang_m "+
							 "where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);												
						this.cb_app.setText(line.nik_setuju);							
						this.cb_pp.setText(line.kode_pp);													
						this.cb_drk.setText(line.drk);											
						this.cb_akun.setText(line.akun);																													
					}
				}										
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.jenis,a.kode_drk "+
							"from yk_hutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+							
							"                   left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							"where a.jenis <> 'TTP' and a.no_hutang = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.jenis,line.kode_drk]);
					}
				} else this.sg2.clear(1);				
				
				
				var data = this.dbLib.getDataProvider(
					   "select a.no_hutang,a.loker,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,a.jenis,sum(a.nilai) as nilai,sum(a.kunj) as kunj,sum(a.cs) as cs,a.no_selesai "+
					   "from ( "+					   
					   
					   "select a.no_terima as no_hutang,b.loker,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,'BP' as jenis,sum(b.nilai) as nilai,0 as kunj,0 as cs,b.no_selesai "+
					   "from takterima_m a inner join yk_bill_d b on a.no_terima=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					   
					   "                   inner join yk_loker bb on b.loker=bb.loker "+
					   "                   inner join cust c on bb.kode_cust=c.kode_cust and c.kode_lokasi='"+this.app._lokasi+"' "+ 
					   "where b.no_piutang='"+this.e_nb.getText()+"' and b.no_selesai <> '-' and c.jenis = 'GROUP' and a.periode <= '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('BILTERIMA','TMTERIMA') "+ 
					   "group by a.no_terima,b.loker,convert(varchar,a.tanggal,103),a.keterangan,a.modul,b.no_selesai "+
					   "union all "+
					   "select a.no_terima as no_hutang,b.loker,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,'KJCS' as jenis,0 as nilai,case when c.jenis = 'PENSIUN' then 0 else sum(b.umum+b.gigi+b.kbia+b.matkes) end as kunj,case when c.jenis = 'PENSIUN' then 0 else sum(b.cs) end as cs,b.no_selesai "+
					   "from takterima_m a inner join yk_billkunj_d b on a.no_terima=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					   
					   "                   inner join yk_loker bb on b.loker=bb.loker "+
					   "                   inner join cust c on bb.kode_cust=c.kode_cust and c.kode_lokasi='"+this.app._lokasi+"' "+ 
					   "where b.no_piutang='"+this.e_nb.getText()+"' and b.no_selesai <> '-' and c.jenis = 'GROUP' and a.periode <= '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('BILTERIMA','TMTERIMA') "+ 
					   "group by a.no_terima,b.loker,convert(varchar,a.tanggal,103),a.keterangan,a.modul,c.jenis,b.no_selesai "+					   					   
					   "union all "+
					   
					   "select a.no_hutang,b.loker,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,'BP' as jenis,sum(b.nilai) as nilai,0 as kunj,0 as cs,b.no_selesai "+
					   "from yk_hutang_m a inner join yk_bill_d b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
					   "                   inner join yk_loker bb on b.loker=bb.loker "+
					   "                   inner join cust c on bb.kode_cust=c.kode_cust and c.kode_lokasi='"+this.app._lokasi+"' "+ 
					   "where b.no_piutang='"+this.e_nb.getText()+"' and b.no_selesai <> '-' and c.jenis = 'GROUP' and a.periode <= '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('HUTKES','BAREV') "+
					   "group by a.no_hutang,b.loker,convert(varchar,a.tanggal,103),a.keterangan,a.modul,b.no_selesai "+
					   "union all "+
					   "select a.no_hutang,b.loker,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,'KJCS' as jenis,0 as nilai,case when c.jenis = 'PENSIUN' then 0 else sum(b.umum+b.gigi+b.kbia+b.matkes) end as kunj,case when c.jenis = 'PENSIUN' then 0 else sum(b.cs) end as cs,b.no_selesai "+
					   "from yk_hutang_m a inner join yk_billkunj_d b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
					   "                   inner join yk_loker bb on b.loker=bb.loker "+
					   "                   inner join cust c on bb.kode_cust=c.kode_cust and c.kode_lokasi='"+this.app._lokasi+"' "+ 
					   "where b.no_piutang='"+this.e_nb.getText()+"' and b.no_selesai <> '-' and c.jenis = 'GROUP' and a.periode <= '"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('HUTKES','PDPT','PDPTREV','BAREV','KAPITASI') "+
					   "group by a.no_hutang,b.loker,convert(varchar,a.tanggal,103),a.keterangan,a.modul,c.jenis,b.no_selesai "+					   
					   
					   ") a where a.nilai+a.kunj+abs(cs) <> 0 group by a.no_hutang,a.loker,convert(varchar,a.tanggal,103),a.keterangan,a.modul,a.jenis,a.no_selesai "+
					   " order by a.loker,a.no_selesai",true);
						  
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["APP",line.no_hutang,line.loker,line.tanggal,line.keterangan,line.modul,line.jenis.toUpperCase(),floatToNilai(line.nilai),floatToNilai(line.kunj),floatToNilai(line.cs),line.no_selesai]);
					}
				} else this.sg.clear(1);
				this.pc1.setActivePage(this.pc1.childPage[0]);		
			
			}									
		} catch(e) {alert(e);}
	}	
});