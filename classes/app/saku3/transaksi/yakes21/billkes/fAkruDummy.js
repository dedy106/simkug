window.app_saku3_transaksi_yakes21_billkes_fAkruDummy = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_billkes_fAkruDummy.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_billkes_fAkruDummy";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Jurnal Billing AKRU", 0);	
		
		uses("portalui_saiMemo;portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Jurnal","List Jurnal"]});				
		this.sg4 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Lokasi Bayar","NIK Approve"],
					colWidth:[[5,4,3,2,1,0],[150,150,100,310,100,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});

		this.bLoad4 = new portalui_imageButton(this.sgn4,{bound:[this.sgn4.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad4"]});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Diketahui Oleh", multiSelection:false, maxLength:10, tag:2});				
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,10,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});								
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,14,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.bTampil = new button(this.pc2.childPage[0],{bound:[550,14,80,18],caption:"Tampil Data",click:[this,"doTampil"]});			
		this.i_appAll = new portalui_imageButton(this.pc2.childPage[0],{bound:[640,14,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.bJurnal = new button(this.pc2.childPage[0],{bound:[668,14,80,18],caption:"Jurnal",click:[this,"doJurnal"]});			
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,995,313], childPage:["Data Billing","Jurnal Akru","Daftar Rekening","Cattn, Ver"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
				colTitle:["Status","No Bill","Tanggal","Keterangan","Total BP","Total Kunj","Total CS","Jenis"],
				colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,100,330,80,120,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
				colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],checkItem:true,
				change:[this,"doChangeCell"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK","Nama DRK"],
					colWidth:[[7,6,5,4,3,2,1,0],[150,80,80,100,260,50,250,100]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
					colFormat:[[4],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		

		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:9,
		            colTitle:["Nama Rekening","No Rekening","Bank","Cabang","Pensiun","Pegawai","PPH","Total","Bank Transfer","Kode Mitra","Nama Mitra"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[200,80,80,100,100,100,100,300,80,200,200]],
					readOnly :true,
					colFormat:[[4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick2"],autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});		
				
		this.sgctt = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
			colTitle:["Catatan"],
			colWidth:[[0],[100]],					
			readOnly:true,autoAppend:false,defaultRow:1});

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
			
			this.kodepp = "";
			var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('PPBPCC','DRKBPCC') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPBPCC") this.kodepp = line.flag;						
					if (line.kode_spro == "DRKBPCC") {
						this.cb_drk.setSQL("select kode_drk, nama from drk where tahun='"+this.e_periode.getText().substr(0,4)+"' and kode_drk='"+line.flag+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
						this.cb_drk.setText(line.flag);	
					}
				}
			}
			
			this.cb_app.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			this.doLoadCtt(this.e_nb.getText());

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_billkes_fAkruDummy.extend(window.childForm);
window.app_saku3_transaksi_yakes21_billkes_fAkruDummy.implement({				
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
						sql.add("delete from yk_hutang_m where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_hutang_j where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_hutang_d where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("update yk_bill_m set no_hutang = '-',progress ='0' where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update yk_billkunj_m set no_hutang='-',progress ='0' where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("update yk_bill_d     set no_hutang='-' where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update yk_billkunj_d set no_hutang='-' where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
										
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != "0"){
								sql.add("insert into yk_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.app._lokasi+"','HUTKES','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");								
							}
						}
					}										
					var nobukti = ""; 
					var totHut = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
							nobukti += ",'"+this.sg.cells(1,i)+"'";
							totHut += nilaiToFloat(this.sg.cells(4,i)); 
						}
					}
					//otomatis approve: no_app='X',progress='1',posted='F'
					sql.add("insert into yk_hutang_m(no_hutang,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_app,posted,tgl_input,nik_user,kode_loktuj,no_app,progress,nik_tahu) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','"+this.kodepp+"','HUTDUMMY','BILL','IDR',1,"+totHut+",'"+this.app._userLog+"','"+this.cb_app.getText()+"','F',getdate(),'"+this.app._userLog+"','"+this.app._lokasi+"','X','1','"+this.cb_app.getText()+"')");
							
					nobukti = nobukti.substr(1);	
					//nilai_bp+nilai_cc sudah dikurangi pajak, pajak di jurnal saat bayar				
					sql.add("insert into yk_hutang_d(no_hutang,kode_lokasi,no_inv,periode,kode_vendor,bank,cabang,no_rek,nama_rek,nilai_bp,nilai_cc,no_rekon,bank_trans,no_app,no_pb,no_kas,progress,kode_loktuj,pajak) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_nb.getText()+".'+b.kode_vendor,'"+this.e_periode.getText()+"', "+
							"       b.kode_vendor,e.bank,e.cabang,e.no_rek,e.nama_rek,isnull(sum(case when f.jenis <> 'PENSIUN' then a.nilai - a.pph else 0 end),0),isnull(sum(case when f.jenis = 'PENSIUN' then a.nilai - a.pph else 0 end),0),'-',e.bank_trans,'-','AKRU','AKRU','0','"+this.app._lokasi+"',0 "+
							" from yk_bill_d a "+
							"    inner join yk_loker ff on a.loker=ff.loker "+							
							"    inner join cust f on ff.kode_cust=f.kode_cust and f.jenis in ('PEGAWAI','PENSIUN','GROUP') "+							
							"    inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
							"	 inner join vendor_rek e on b.kode_vendor=e.kode_vendor and b.kode_lokasi=e.kode_lokasi and e.status='1' "+
							"    inner join yk_bill_m d on a.no_bill=d.no_bill and a.kode_lokasi=d.kode_lokasi "+
							" where a.no_bill in ("+nobukti+") and d.periode<='"+this.e_periode.getText()+"' and d.kode_lokasi='"+this.app._lokasi+"' "+
							" group by e.nama_rek,e.no_rek,e.bank,e.cabang,b.kode_vendor,b.nama,e.bank_trans");
					
					sql.add("update yk_bill_m set no_hutang = '"+this.e_nb.getText()+"',progress ='1' where no_bill in ("+nobukti+") and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_billkunj_m set no_hutang='"+this.e_nb.getText()+"',progress ='1' where no_bill in ("+nobukti+") and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update yk_bill_d     set no_hutang='"+this.e_nb.getText()+"' where no_bill in ("+nobukti+") and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_billkunj_d set no_hutang='"+this.e_nb.getText()+"' where no_bill in ("+nobukti+") and kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.sg.clear(1);this.sg2.clear(1);this.sg3.clear(1);this.sg4.clear(1);					
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
					this.doClick(this.i_gen);
				break;
			case "simpan" :	
			case "ubah" :	
				if (this.stsSimpan == 0) {
					var data = this.dbLib.getDataProvider("select distinct no_rekon from yk_hutang_d where no_rekon <> '-' and no_hutang='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																				
							system.alert(this,"Transaksi tidak valid.","No Pengajuan AKRU sudah diprogress lain [REVERSE].");
							return false;							
						}
					}
				}								
				this.preView = "1";
				this.sg2.validasi();
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
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
				var data = this.dbLib.getDataProvider("select distinct no_rekon from yk_hutang_d where no_rekon <> '-' and no_hutang='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																				
						system.alert(this,"Transaksi tidak valid.","No Pengajuan AKRU sudah diprogress lain [REVERSE].");
						return false;							
					}
				}
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from yk_hutang_m where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_hutang_j where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_hutang_d where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update yk_bill_m set no_hutang = '-',progress ='0' where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_billkunj_m set no_hutang='-',progress ='0' where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update yk_bill_d     set no_hutang='-' where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_billkunj_d set no_hutang='-' where no_hutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

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
	doTampil:function(sender){		
		if (this.e_periode.getText() != "") {
			var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.nilai,a.kunj,a.cs,a.jenis "+
			             "from yk_bill_m a "+
						 "where a.jenis = 'AKRU' and a.progress = '0' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
						 //"where a.jenis = 'AKRU' and a.progress = '0' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_bill,line.tanggal,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.kunj),floatToNilai(line.cs),line.jenis]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else system.alert(this,"Data tidak valid.","Periode harus diisi.");
	},		
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1);this.sg2.clear(1);this.sg3.clear(1);this.sg4.clear(1);
				this.e_debet.setText("0");
				this.e_kredit.setText("0");
				this.bTampil.show();
				this.i_appAll.show();
				this.bJurnal.show();
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_hutang_m","no_hutang",this.app._lokasi+"-PH"+this.e_periode.getText().substr(2,4)+".","000"));			
			this.cb_drk.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}
		if (sender == this.i_appAll) {
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) this.sg.cells(0,i,"APP");
			}
		}
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg2.cells(4,i));
					if (this.sg2.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg2.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
   	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg2.clear(1);
			this.sg2.validasi();
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
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_hutang='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1);this.sg2.clear(1);this.sg3.clear(1); this.sg4.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
			this.doClick(this.i_gen);
		} catch(e) {
			alert(e);
		}
	},
	doJurnal:function(sender){		
		try {
			if (this.cb_drk.getText()!="") {
				var nobukti = "";
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
						nobukti += ",'"+this.sg.cells(1,i)+"'";
					}
				}
				nobukti = nobukti.substr(1);
				if (nobukti == "") nobukti = "''";			
				//PIUTANG dan HUTANG AKRU hanya untuk BP/CC PEGAWAI dan PENSIUN
				var strSQL = 
							"select d.nama as ket,"+
							"       case f.jenis when 'PENSIUN' then b.akun_cc "+
							"                    when 'PEGAWAI' then b.akun_bp "+	
							"                    when 'GROUP' then b.akun_ap "+												
							"       end as kode_akun,d.nama as nama_akun,'D' as dc,"+
							"       sum(a.nilai) as nilai,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end as jenis,g.kode_drk,g.nama as nama_drk "+
							"from yk_bill_d a  "+
							"           inner join yk_loker ff on a.loker=ff.loker "+
							"           inner join cust f on ff.kode_cust=f.kode_cust and f.jenis in ('PEGAWAI','PENSIUN','GROUP') "+
							"  			inner join yk_bill_m c on a.no_bill=c.no_bill and a.kode_lokasi=c.kode_lokasi "+
							"  			inner join yk_produk b on a.kode_produk=b.kode_produk "+
							"  			inner join masakun d on (case f.jenis when 'PENSIUN' then b.akun_cc "+
							"                             			          when 'PEGAWAI' then b.akun_bp "+		
							"                             				      when 'GROUP' then b.akun_ap "+					
							"       							  end)=d.kode_akun and d.kode_lokasi = '"+this.app._lokasi+"' "+
							"  			inner join drk g on '"+this.cb_drk.getText()+"'=g.kode_drk and g.kode_lokasi='"+this.app._lokasi+"' and g.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
							"where c.no_bill in ("+nobukti+") and c.kode_lokasi='"+this.app._lokasi+"' and a.nilai <> 0 "+
							"group by d.nama,case f.jenis when 'PENSIUN' then b.akun_cc "+
							"                             when 'PEGAWAI' then b.akun_bp "+			
							"                             when 'GROUP' then b.akun_ap "+										
							"       end,d.nama,case f.jenis when 'PENSIUN' then 'CC' else 'BP' end,g.kode_drk,g.nama "+												
							"union all "+													
							
							"select "+
							"case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end as ket, "+
							"case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end as kode_akun,c.nama as nama_akun,'C' as dc, sum(a.nilai) as nilai,  "+ 
							"case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end as jenis,'-' as kode_drk,'-' as nama_drk  "+
							"from yk_bill_d a "+
							"			inner join yk_loker ff on a.loker=ff.loker "+
							"			inner join cust f on ff.kode_cust=f.kode_cust and f.jenis in ('PEGAWAI','PENSIUN','GROUP') "+						
							"			inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
							"			inner join vendor_klp bb on bb.kode_klpvendor=b.kode_klpvendor and bb.kode_lokasi=b.kode_lokasi  "+
							"			inner join masakun c on (case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end)=c.kode_akun and b.kode_lokasi=c.kode_lokasi  "+
							"			inner join yk_bill_m d on a.no_bill=d.no_bill and a.kode_lokasi=d.kode_lokasi  "+							
							"where d.no_bill in ("+nobukti+") and d.kode_lokasi='"+this.app._lokasi+"' and (a.nilai+a.pph) <> 0 "+
							"group by case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end, "+
							"         case f.jenis when 'PENSIUN' then bb.cc_hut else bb.bp_hut end,c.nama, "+
							"         case f.jenis when 'PENSIUN' then 'HUTANG PENSIUN' else 'HUTANG PEGAWAI' end "+							
							
							"order by dc desc,kode_akun";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_drk,line.nama_drk]);
					}
				}
				this.sg2.validasi();								
				this.pc1.setActivePage(this.pc1.childPage[1]);
				
				//PIUTANG dan HUTANG AKRU hanya untuk BP/CC PEGAWAI dan PENSIUN
				strSQL = "select f.nama_rek,f.no_rek,f.bank,f.cabang,a.kode_vendor,b.nama as vendor,f.bank_trans,"+
						" 		isnull(sum(case when bb.jenis = 'PENSIUN' then a.nilai else 0 end),0) as pensiun, "+
						" 		isnull(sum(case when bb.jenis <> 'PENSIUN' then a.nilai else 0 end),0) as pegawai, "+
						"       isnull(sum(a.pph),0) as pph, "+
						" 		isnull(sum(case when bb.jenis = 'PENSIUN' then a.nilai else 0 end),0) + isnull(sum(case when bb.jenis <> 'PENSIUN' then a.nilai else 0 end),0) - isnull(sum(a.pph),0) as total "+
						" from yk_bill_d a "+
						"    inner join yk_loker cc on a.loker=cc.loker "+
						"    inner join cust bb on cc.kode_cust=bb.kode_cust and bb.jenis in ('PEGAWAI','PENSIUN') "+
						"    inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
						"	 inner join vendor_rek f on b.kode_vendor=f.kode_vendor and b.kode_lokasi=f.kode_lokasi and f.status='1' "+
						"    inner join yk_bill_m d on a.no_bill=d.no_bill and a.kode_lokasi=d.kode_lokasi "+
						" where a.no_bill in ("+nobukti+") and d.progress='0' and d.periode<='"+this.e_periode.getText()+"' and d.kode_lokasi='"+this.app._lokasi+"' "+
						" group by f.nama_rek,f.no_rek,f.bank,f.cabang,a.kode_vendor,b.nama,f.bank_trans "+
						"order by f.bank_trans,a.kode_vendor+' - '+b.nama";
							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg3.appendData([line.nama_rek,line.no_rek,line.bank,line.cabang,floatToNilai(line.pensiun),floatToNilai(line.pegawai),floatToNilai(line.pph),floatToNilai(line.total),line.bank_trans,line.kode_vendor,line.vendor]);
					}
				}	
			}
			else {
				system.alert(this,"DRK tidak valid.","DRK harus dipilih.");				
			}		
		}
		catch(e) {
			systemAPI.alert("step : "+step+"; error = "+e);
		}
	},
	doLoad4:function(sender){																				
		var strSQL = "select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.kode_loktuj+' - '+c.nama as lokbayar,a.nik_app+' - '+b.nama as nama "+
		             "from yk_hutang_m a inner join karyawan b on a.nik_app=b.nik "+
					 "                   inner join lokasi c on a.kode_loktuj=c.kode_lokasi "+	
					 "				     left join (select distinct no_hutang as no_hutang "+
					 "							    from yk_hutang_d where no_rekon<>'-' and kode_lokasi='"+this.app._lokasi+"' "+
					 "							   ) d on a.no_hutang=d.no_hutang "+				 
					 "where a.modul = 'HUTDUMMY' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('1','R') and a.posted='F' and d.no_hutang is null ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU4 = data;
			this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn4.rearrange();
			this.doTampilData4(1);
		} else this.sg4.clear(1);			
	},
	doTampilData4: function(page) {
		this.sg4.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU4.rs.rows.length? this.dataJU4.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU4.rs.rows[i];													
			this.sg4.appendData([line.no_hutang,line.tgl,line.keterangan,floatToNilai(line.nilai),line.lokbayar,line.nama]); 
		}
		this.sg4.setNoUrut(start);
	},
	doPager4: function(sender, page) {
		this.doTampilData4(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg4.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.bTampil.hide();
				this.i_appAll.hide();
				this.bJurnal.hide();
				this.doLoadCtt(this.e_nb.getText());
		
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg4.cells(0,row));								
								
				var strSQL = "select keterangan,tanggal "+
							 "from yk_hutang_m "+							 
							 "where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);																																		
					}					
				}					
				var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.nilai,a.kunj,a.cs,a.jenis "+
							 "from yk_bill_m a "+
							 "where a.no_hutang = '"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["APP",line.no_bill,line.tanggal,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.kunj),floatToNilai(line.cs),line.jenis]);
					}
				} else this.sg.clear(1);				
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.jenis,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
							"from yk_hutang_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+							
							"                   left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
							"where a.no_hutang = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.jenis,line.kode_drk,line.nama_drk]);
					}
				} else this.sg2.clear(1);
								
				var strSQL = "select b.nama_rek,b.no_rek,b.bank,b.cabang,a.kode_vendor,b.nama as vendor,b.bank_trans,"+
						" 		isnull(sum(case when bb.jenis = 'PENSIUN' then a.nilai else 0 end),0) as pensiun, "+
						" 		isnull(sum(case when bb.jenis <> 'PENSIUN' then a.nilai else 0 end),0) as pegawai, "+
						"       isnull(sum(a.pph),0) as pph, "+
						" 		isnull(sum(case when bb.jenis = 'PENSIUN' then a.nilai else 0 end),0) + isnull(sum(case when bb.jenis <> 'PENSIUN' then a.nilai else 0 end),0) - isnull(sum(a.pph),0) as total "+
						" from yk_bill_d a "+
						"    inner join yk_loker cc on a.loker=cc.loker "+
						"    inner join cust bb on cc.kode_cust=bb.kode_cust and bb.jenis in ('PEGAWAI','PENSIUN') "+
						"    inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
						"    inner join yk_bill_m d on a.no_bill=d.no_bill and a.kode_lokasi=d.kode_lokasi "+
						" where d.no_hutang='"+this.e_nb.getText()+"' and d.kode_lokasi='"+this.app._lokasi+"' "+
						" group by b.nama_rek,b.no_rek,b.bank,b.cabang,a.kode_vendor,b.nama,b.bank_trans order by b.bank_trans,a.kode_vendor+' - '+b.nama";							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg3.appendData([line.nama_rek,line.no_rek,line.bank,line.cabang,floatToNilai(line.pensiun),floatToNilai(line.pegawai),floatToNilai(line.pph),floatToNilai(line.total),line.bank_trans,line.kode_vendor,line.vendor]);
					}
				}

			}									
		} catch(e) {alert(e);}
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal "+
						 "from pbh_ver_m "+
						 "where no_bukti='"+kode+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "order by convert(varchar,tanggal,103) desc";	
			
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 350px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select catatan,no_ver, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_user "+
								  "from pbh_ver_m "+
								  "where no_bukti='"+kode+"' and tanggal='"+line.tanggal+"' and kode_lokasi='"+this.app._lokasi+"' "+
								  "order by tanggal desc,convert(varchar,tgl_input,108) desc ";	

					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_ver+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}
					
	}	
});