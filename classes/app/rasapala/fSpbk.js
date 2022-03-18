window.app_rasapala_fSpbk = function(owner)
{
	if (owner)
	{
		window.app_rasapala_fSpbk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rasapala_fSpbk";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Hutang Apotek: Koreksi", 0);	
		
		uses("portalui_checkBox;portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_saiTable");
		this.e_periode = new portalui_saiLabelEdit(this, {
			bound: [20, 10, 200, 20],
			caption: "Periode",
			readOnly: true,
			change: [this, "doChange"]
		});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[720,11,200,20],caption:"Periode Bukti",mustCheck: false, tag:1});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Hutang",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[720,13,200,20],caption:"No Hutang Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,250,20],caption:"No Dokumen", maxLength:100,tag:2});		
		//this.e_fp = new portalui_saiLabelEdit(this,{bound:[320,14,250,20],caption:"No Faktur Pajak", maxLength:30, tag:9});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,550,20],caption:"Keterangan", maxLength:150,tag:2});						
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Jth Tempo", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18],date:new Date().getDateStr()});		
		this.cb_ap = new portalui_saiCBBL(this,{bound:[20,19,200,20],caption:"Akun Hutang",btnClick:[this,"doBtnClick"],tag:2});				
		this.e_disk = new portalui_saiLabelEdit(this,{bound:[720,19,200,20],caption:"Nilai Diskon [Ket]",tipeText:ttNilai,tag:9,text:0});
		this.cb_buat = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Dibuat Oleh",btnClick:[this,"doBtnClick"],tag:2});		
		this.e_tambah = new portalui_saiLabelEdit(this,{bound:[720,16,200,20],caption:"Nilai Pengajuan",tipeText:ttNilai,readOnly: true, tag:2,change:[this,"doChange"]});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Disetujui Oleh",btnClick:[this,"doBtnClick"],tag:2});		
		this.e_pot = new portalui_saiLabelEdit(this,{bound:[720,17,200,20],caption:"Nilai Potongan",tipeText:ttNilai,readOnly: true, tag:2,change:[this,"doChange"]});
		this.cb_vendor = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Vendor",btnClick:[this,"doBtnClick"],tag:2,change:[this,"doChange"]});		
		this.e_spp = new portalui_saiLabelEdit(this,{bound:[720,18,200,20],caption:"Nilai Hutang",tipeText:ttNilai,readOnly: true, tag:2,text:"0"});
		this.p2 = new portalui_panel(this,{bound:[20,30,900,250],caption:"Daftar Item Jurnal Hutang"});
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,200],colCount:8,tag:1,
		            colTitle:["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Jenis"],
					colWidth:[[0,1,2,3,4,5,6,7],[80,150,250,50,100,60,150,80]],colFormat:[[4],[cfNilai]],
					buttonStyle:[[0,3,5,7],[bsEllips,bsAuto,bsEllips,bsAuto]], 
					picklist:[[3],[new portalui_arrayMap({items:["D","C"]}),new portalui_arrayMap({items:["BAYAR","KOREKSI","RETUR","NON"]})]],ellipsClick:[this,"doEllipseClick2"],checkItem:true,
					columnReadOnly:[true,[1],[0]],nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCell2"],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[0,225,900,25],buttonStyle:2,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[840,5,100,25],caption:"Preview",selected:false});
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.sg2.onCellEnter.set(this,"doCellEnter2");

			this.cb_ap.setSQL("select kode_akun, nama from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],true);
			this.cb_buat.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
			this.cb_app.setSQL("select nik,nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],true);
			this.cb_vendor.setSQL("select kode_vendor,nama from vendor where kode_lokasi = '"+this.app._lokasi+"'",["kode_vendor","nama"],true);
			var sql = new server_util_arrayList(); 
			sql.add("select kode_akun, nama from masakun where block='0' and kode_lokasi='"+this.app._lokasi+"'");
			sql.add("select kode_pp, nama from pp where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
			this.e_tambah.setText("0"); this.e_pot.setText("0"); 
			uses("server_report_report;portalui_reportViewer");
			this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
			this.viewer.hide();
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);
			
			var prd = this.dbLib.getDataProvider("select distinct periode from spb_m where progress = '0' and kode_lokasi = '"+this.app._lokasi+"' and modul='SPB' and jenis = 'APOTEK' order by periode desc",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rasapala_fSpbk.extend(window.portalui_childForm);
window.app_rasapala_fSpbk.implement({
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
			if (parseFloat(this.perLama) == parseFloat(this.e_periode.getText())) this.e_nb.setTag("9");
			else this.e_nb.setTag("0");
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',this.app._lokasi+"-HUT"+this.e_periode.getText().substr(2,4)+".",'0000'));
						sql.add(" update spb_m set no_link='"+this.e_nb.getText()+"',no_del = concat(no_spb,'r') where no_spb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into spb_m (no_spb,no_dokumen,tanggal,due_date,akun_hutang,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,modul,jenis,nilai,nilai_ppn,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input,no_fpajak,progress_fp) "+
							    " select concat(no_spb,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',due_date,akun_hutang,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,modul,jenis,nilai,nilai_ppn,nilai_pot,'F','1','"+this.e_periode.getText()+"',no_spb,'-','"+this.app._userLog+"',now(),no_fpajak,progress_fp "+
								" from spb_m where no_spb = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");												
						sql.add(" insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_spb,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from spb_j where no_spb = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("delete from spb_m where no_spb='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_j where no_spb='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						this.nb = this.cb_nbLama.getText();
					}
					this.akunAP = this.cb_ap.getText();
					var total = nilaiToFloat(this.e_spp.getText());
					sql.add("insert into spb_m (no_spb,no_dokumen,tanggal,due_date,akun_hutang,"+
							"keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,"+
							"modul,jenis,nilai,nilai_ppn,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input,no_fpajak,progress_fp,nilai_disk)  values "+
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+
							"','"+this.akunAP+"','"+this.e_desc.getText()+"','-','IDR',1,'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.cb_vendor.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+
							"','SPB','APOTEK',"+total+",0,"+parseNilai(this.e_pot.getText())+",'F','1','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',now(),'-','0',"+parseNilai(this.e_disk.getText())+")");
					var idx = 0;
					var scr1 = "";
					for (var i=0; i < this.sg2.rows.getLength(); i++){
						if (this.sg2.rowValid(i)) {
							scr1 = "insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
							   "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
							scr1 += "('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDate()+"',"+idx+",'"+this.sg2.getCell(0,i)+
									"','"+this.sg2.getCell(2,i)+"','"+this.sg2.getCell(3,i)+"',"+parseNilai(this.sg2.getCell(4,i))+",'"+this.sg2.getCell(5,i)+"','-',"+
									"'"+this.app._lokasi+"','SPB','"+this.sg2.getCell(7,i)+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
							idx++;
							sql.add(scr1);
						}
					}	
					idx++;
					var nilaihutang = total + this.hutdebet;
					scr1 = "insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
							   "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					scr1 += "('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDate()+"',"+idx+",'"+this.akunAP+
							"','"+this.e_desc.getText()+"','C',"+nilaihutang+",'"+this.app._kodePP+"','-',"+
							"'"+this.app._lokasi+"','SPB','AP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					sql.add(scr1);
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
				if (modalResult == mrOk) {
					this.app._mainForm.setActiveControl(this.app._mainForm.cb1);
					this.standarLib.clearByTag(this, new Array("1","3","9"),this.e_nb);		
					this.sg2.clear(1); 
				}
				break;
			case "ubah" :
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
                this.sg2.validasi();
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))){
					system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
					return false;
				}
				if ((new Date()).strToDate(this.dp_d1.getDate())  > (new Date()).strToDate(this.dp_d2.getDate())){
					system.alert(this,"Tanggal tidak valid."," Tanggal Akru melebihi Tgl Jatuh Temponya.");
					return false;
				}
				if (nilaiToFloat(this.e_spp.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai Akun tidak boleh kurang atau sama dengan nol.");
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
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				try{	
					uses("server_util_arrayList");
					sql = new server_util_arrayList();	
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add(" update spb_m set no_del = concat(no_spb,'r') where no_spb ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into spb_m (no_spb,no_dokumen,tanggal,due_date,akun_hutang,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,modul,jenis,nilai,nilai_ppn,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input,no_fpajak,progress_fp) "+
							    " select concat(no_spb,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',due_date,akun_hutang,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,modul,jenis,nilai,nilai_ppn,nilai_pot,'F','1','"+this.e_periode.getText()+"',no_spb,'-','"+this.app._userLog+"',now(),no_fpajak,progress_fp "+
								" from spb_m where no_spb = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");												
						sql.add(" insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_spb,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from spb_j where no_spb = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					}
					else{
						sql.add("delete from spb_m where no_spb='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_j where no_spb='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}		
					this.dbLib.execArraySQL(sql);	
				} catch(e){
					alert(e)
				}
			break;
		}
	},
	doChange:function(sender){
		if ((sender == this.e_tambah) || (sender == this.e_pot)) {
			if (this.e_pot.getText()!="" && this.e_tambah.getText()!="") {
				this.e_spp.setText(floatToNilai(nilaiToFloat(this.e_tambah.getText())-nilaiToFloat(this.e_pot.getText())));
			}
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',this.app._lokasi+"-HUT"+this.e_periode.getText().substr(2,4)+".",'0000'));
		this.e_dok.setFocus();
	},
	doLoadData:function(sender){ 
		if (this.cb_nbLama.getText() != ""){
			var data = this.dbLib.getDataProvider("select a.no_dokumen,a.keterangan,a.nik_buat,a.nik_setuju,b.nama as nama_buat,c.nama as nama_setuju,a.due_date,a.kode_terima,d.nama as nama_terima,a.periode,a.posted,a.tanggal,a.akun_hutang,aa.nama as nama_akun,no_fpajak,  "+
											      "       x.kode_akun,y.nama as nama_akun,x.keterangan as ket,x.dc,x.nilai,x.kode_pp,ifnull(z.nama,'-') as nama_pp "+
												  "from spb_m a inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
												  "             inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi "+
												  "             inner join vendor d on a.kode_terima=d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+
												  "             inner join spb_j x on a.no_spb=x.no_spb and a.kode_lokasi=x.kode_lokasi "+
												  "             inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi "+
												  "             inner join masakun aa on a.akun_hutang=aa.kode_akun and a.kode_lokasi=aa.kode_lokasi "+
												  "             left outer join pp z on x.kode_pp=z.kode_pp and x.kode_lokasi=z.kode_lokasi "+
												  "where x.jenis='BBN' and a.no_spb='"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.ket,line.dc.toUpperCase(),floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
				}
				this.perLama = line.periode;
				this.posted = line.posted;
				
				this.e_periode.setText(line.periode);
				this.dp_d1.setText(line.tanggal);
				this.dp_d2.setText(line.due_date);
				this.e_dok.setText(line.no_dokumen);
				//this.e_fp.setText(line.no_fpajak);
				this.e_desc.setText(line.keterangan);
				this.cb_ap.setText(line.akun_hutang,line.nama_akun);
				this.cb_buat.setText(line.nik_buat,line.nama_buat);
				this.cb_app.setText(line.nik_setuju,line.nama_setuju);
				this.cb_vendor.setText(line.kode_terima,line.nama_terima);
			}
			this.sg2.validasi();
		}
		else {
			system.alert(this,"No SPB Lama tidak valid.","No SPB Lama harus dipilih.");
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Akru Hutang",sender,undefined, 
											  "select no_spb,no_dokumen from spb_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' and progress = '1' and modul='SPB' and jenis='APOTEK' and progress_fp='0' and posted ='F'", 
											  "select count(no_spb)     from spb_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' and progress = '1' and modul='SPB' and jenis='APOTEK' and progress_fp='0' and posted ='F'", 
											  ["no_spb","no_dokumen"],"and",["No Akru","No Dokumen"],false);				
				this.standarLib.clearByTag(this, new Array("2","9"),undefined);		
				this.sg2.clear(1);
			}

			if (sender == this.cb_buat) {   
			    this.standarLib.showListData(this, "Dibuat Oleh",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Disetujui Oleh",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_vendor) {   
			    this.standarLib.showListData(this, "Daftar Vendor",sender,undefined, 
											  "select kode_vendor, nama  from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_vendor) from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_vendor","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_ap) {   
			    this.standarLib.showListData(this, "Daftar Akun Hutang",sender,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='024'",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='024'",
											  ["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doEllipseClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell2: function(sender, col, row){
	   try{
           if ((col == 3 || col == 4 || col == 7) && (this.sg2.getCell(4,row) != "")) sender.validasi();
		   sender.onChange.set(undefined,undefined);
    	   if (col == 0) {
                var akun = this.dataAkun.get(sender.cells(0,row));
                if(akun)
                    sender.cells(1,row,akun);
                else {                                    
                    if (trim(sender.cells(0,row)) != "") system.alert(this,"Akun "+sender.cells(0,row)+" tidak ditemukan","Coba akun yang lainnya.","checkAkun");                
                    sender.cells(0,row,"");
                    sender.cells(1,row,"");
                }
            }
			if (col == 5) {
                var pp = this.dataPP.get(sender.cells(5,row));
                if (pp) sender.cells(6,row,pp);
                else sender.cells(6,row,"-");
            }
            if (col == 3){
                if (this.sg2.getCell(3, row).toUpperCase() != "C" && this.sg2.getCell(3, row).toUpperCase() != "D")
                    this.sg2.cells(3,row,"D");            
                else this.sg2.cells(3,row,this.sg2.getCell(3, row).toUpperCase());            
            }
            sender.onChange.set(this,"doChangeCell2");
        }catch(e){
            sender.onChange.set(this,"doChangeCell2");
        }
    },
	doNilaiChange2: function(){
		try{
			var tot1 = tot2 = tot3 = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.getCell(4,i) != ""){
					if (this.sg2.getCell(3,i).toUpperCase() == "D") tot1 += nilaiToFloat(this.sg2.getCell(4,i));			
					if (this.sg2.getCell(3,i).toUpperCase() == "D" && this.sg2.getCell(7,i).toUpperCase() != "NON") tot3 += nilaiToFloat(this.sg2.getCell(4,i));			
					if (this.sg2.getCell(3,i).toUpperCase() == "C") tot2 += nilaiToFloat(this.sg2.getCell(4,i));			
				}
			}
			this.e_tambah.setText(floatToNilai(tot1));
			this.e_pot.setText(floatToNilai(tot2+tot3));
			this.hutdebet = tot3;
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doCellEnter2: function(sender, col, row){
		try{
			switch(col){
				case 2 : 
				        if (this.sg2.getCell(2,row) == ""){
				            if (row == 0) this.sg2.setCell(2,row,this.e_desc.getText());
							else this.sg2.setCell(2,row,this.sg2.getCell(2,(row-1)) );
				        }
					break;
			}
		}catch(e)
		{
			alert("doCellEnter : " + e);
		}	
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.nb+")");	
							if (this.cb1.isSelected()) {
								this.nama_report="server_report_kopeg_rptSpbH";
								this.filter1 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.nb+"' ";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter1,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.status=true;
								this.report.preview(this.nama_report,this.filter1,1,1,this.showFilter, this.app._lokasi,this.filter2);
								this.page = 1;
								this.allBtn = false;
							} else this.clearLayar(); //this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
	    			    eval("result = "+result+";");
	    			    if (typeof result != "string"){
                            this.dataAkun = new portalui_arrayMap();
							this.dataPP = new portalui_arrayMap();
							this.dataDRK = new portalui_arrayMap();
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
	    			                this.dataPP.set(line.kode_pp, line.nama);
                                }
                            }
                            if (result.result[2]){
	    			            var line;
	    			            for (var i in result.result[2].rs.rows){
	    			                line = result.result[2].rs.rows[i];
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
		if (methodName === "preview"){
			if (this.status){
				this.status=false;
				this.viewer.preview(result);
				this.report.preview("server_report_kopeg_rptSpbH2",this.filter1,1,1, this.showFilter,this.app._lokasi,this.filter2);
			}else this.viewer.preview(result,true);
		}
	},
	doCloseReportClick: function(sender)
	{
		switch(sender.getName())
		{
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter1,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter1,1,1, this.showFilter,this.app._namalokasi,this.filter2));
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
				this.clearLayar();//this.app._mainForm.bClear.click();    
			break;
		}
	},	
	clearLayar : function(){
		this.standarLib.clearByTag(this, new Array("1","3"),this.e_nb);		
		this.sg2.clear(1); 
	}
});
