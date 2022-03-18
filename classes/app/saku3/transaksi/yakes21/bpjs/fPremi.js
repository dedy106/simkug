window.app_saku3_transaksi_yakes21_bpjs_fPremi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_bpjs_fPremi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_bpjs_fPremi";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Iuran Premi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[5,12,1000,430], childPage:["Data Premi","List Premi"]});	
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
					colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
					colWidth:[[4,3,2,1,0],[70,100,300,80,100]],
					readOnly:true,
					colFormat:[[3,4],[cfNilai,cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,13,200,20],caption:"Jenis",items:["PEGAWAI","PENSIUN","YAKES"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Kode Akun", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"] });		
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,12,200,20],caption:"Saldo Budget", tag:1, readOnly:true, tipeText:ttNilai, text:"0",visible:false});			
		this.cb_drk = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"DRK",tag:1,multiSelection:false,change:[this,"doChange"]});         				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});			

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,282], childPage:["Data Premi","Atensi","Otorisasi","Error Msg"]});		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:12,
					colTitle:["No Kartu", "NIK", "NPP", "Nama", "Hub Klg", "Tgl Lahir", 
							  "Faskes1", "FaskesG", "Tmt", "Sts Peserta", "Nilai","Valid FASKES1"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100,100,100,100,100]],
					colFormat:[[10],[cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
					readOnly:true, defaultRow:1
					});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager1"]});		
		this.bRefresh = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn1.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.cb_vendor = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Vendor", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"] });			
		this.cb_rek = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"ID Rekening", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Bank - Cabang", readOnly:true});			
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"No Rekening", readOnly:true});			
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Nama Rekening", readOnly:true});			
		this.e_banktrans = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Bank Transfer", readOnly:true});						

		this.cb_buat = new saiCBBL(this.pc1.childPage[2],{bound:[20,16,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app = new saiCBBL(this.pc1.childPage[2],{bound:[20,15,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});								
		this.cb_ver = new saiCBBL(this.pc1.childPage[2],{bound:[20,14,220,20],caption:"NIK Verifikator", multiSelection:false, maxLength:10, tag:2});						

		this.sg2 = new portalui_saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-10],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1
		});	
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);

		setTipeButton(tbSimpan);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi ='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
					
			this.cb_app.setSQL("select distinct a.nik, a.nama from karyawan a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_pp ='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_ver.setSQL("select nik, nama from karyawan where flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			this.c_jenis.setText("PENSIUN");

			var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('PPBPCC','GARAPP','NIKVER','DRKBPCC') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PPBPCC") this.kodepp = line.flag;	
					if (line.kode_spro == "GARAPP") this.cb_app.setText(line.flag);	
					if (line.kode_spro == "NIKVER") this.cb_ver.setText(line.flag);	

					if (line.kode_spro == "DRKBPCC") {
						this.cb_drk.setSQL("select kode_drk, nama from drk where tahun='"+this.e_periode.getText().substr(0,4)+"' and kode_drk='"+line.flag+"' and kode_lokasi = '"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
						this.cb_drk.setText(line.flag);	
					}

				}
			}

			this.cb_buat.setText(this.app._userLog);
			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_bpjs_fPremi.extend(window.childForm);
window.app_saku3_transaksi_yakes21_bpjs_fPremi.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();	
			
			var tot = 0 ;
			for (var i=0; i < this.sg1.getRowCount();i++){
				tot += nilaiToFloat(this.sg1.cells(10,i));	
			}	
			this.e_total.setText(floatToNilai(tot));

			setTipeButton(tbAllFalse);
			this.inValid = false;			
			this.doCekDataFaskes1();

			if (this.inValid) {
				system.alert(this,"Data tidak valid.","Terdapat data Faskes1 yang tidak terdaftar.");
				return false;						
			} 
			else {
				setTipeButton(tbSimpan);
			}
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},		
	doCekDataFaskes1: function() {		
		var strSQL = "select kode_tpkk from yk_tpkk ";					
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataTPKK = dataS;
		}				
		this.inValid = false;
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(11,i,"INVALID");
			for (var j=0;j < this.dataTPKK.rs.rows.length;j++){
				if (this.sg1.cells(6,i) == this.dataTPKK.rs.rows[j].kode_tpkk) {					
					this.sg1.cells(11,i,"VALID");				
				}
			}	
			if (this.sg1.cells(11,i) == "INVALID") this.inValid = true;									
		}	

		this.pc1.setActivePage(this.pc1.childPage[1]);	

		this.sg2.clear();
		for (var i=0; i < this.sg1.getRowCount();i++) {
			if (this.sg1.cells(11,i) == "INVALID") {
				var j = i+1;
				this.sg2.appendData([j+" - "+this.sg1.cells(6,i)]);						
			}
		}
	},
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_bpjs_m","no_bpjs",this.app._lokasi+"-PRM"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into yk_bpjs_m(no_bpjs,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_app,posted,tgl_input,nik_user,kode_loktuj,no_app,progress,  akun_debet,kode_drk,kode_vendor) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','"+this.kodepp+"','BPJSPREMI','"+this.c_jenis.getText()+"','IDR',1,"+nilaiToFloat(this.e_total.getText())+",'"+this.app._userLog+"','"+this.cb_app.getText()+"','X',getdate(),'"+this.app._userLog+"','"+this.app._lokasi+"','-','0', '"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_vendor.getText()+"')");

					sql.add("insert into yk_bpjs_j(no_bpjs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_total.getText())+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','BPJSPREMI','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");								
					sql.add("insert into yk_bpjs_j(no_bpjs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.kodeSAP+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunHutang+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_total.getText())+",'"+this.kodepp+"','-','"+this.app._lokasi+"','BPJSPREMI','HUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");								

					for (var i=0; i < this.sg1.getRowCount();i++){
						if (nilaiToFloat(this.sg1.cells(2,i)) != 0) {				
							sql.add("insert into yk_bpjs_d ( nu, no_bpjs, kode_lokasi, no_kartu, nik, npp, nama, hub_klg, tgl_lahir, faskes1, faskesg, tmt, sts_peserta, nilai, periode, jenis) values "+
									"("+i+", '"+this.e_nb.getText()+"', '"+this.app._lokasi+"', '"+this.sg1.cells(0,i)+"', '"+this.sg1.cells(1,i)+"', '"+this.sg1.cells(2,i)+"', '"+this.sg1.cells(3,i)+"', '"+this.sg1.cells(4,i)+"', '"+this.sg1.cells(5,i)+"', '"+this.sg1.cells(6,i)+"', '"+this.sg1.cells(7,i)+"', '"+this.sg1.cells(8,i)+"', '"+this.sg1.cells(9,i)+"', "+nilaiToFloat(this.sg1.cells(10,i))+", '"+this.e_periode.getText()+"', '"+this.c_jenis.getText()+"')");							
						}
					}			

					sql.add("insert into pbh_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_buat,no_hutang,no_spb,no_ver,akun_hutang,nik_ver,bank_trans,no_nota,no_kas) values  "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'PBBPJS','X','"+this.kodepp+"','"+this.cb_app.getText()+"','"+this.cb_buat.getText()+"','"+this.e_nb.getText()+"','-','-','"+this.akunHutang+"','"+this.cb_ver.getText()+"','NONBT','-','-')");

					sql.add("insert into pbh_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.akunHutang+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_total.getText())+",'"+this.kodepp+"','-','"+this.app._lokasi+"','PBBPJS','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										

					sql.add("insert into pbh_rek(kode_vendor,nu,no_bukti,kode_lokasi,modul,nama_rek,no_rek,bank,nama,bruto,pajak,nilai) values "+
							"('"+this.cb_vendor.getText()+"',"+this.cb_rek.getText()+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','PBBPJS','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.e_bank.getText()+"','"+this.cb_vendor.rightLabelCaption+"',"+nilaiToFloat(this.e_total.getText())+",0,"+nilaiToFloat(this.e_total.getText())+")");

					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"('"+this.e_nb.getText()+"','PBBPJS','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','C',"+nilaiToFloat(this.e_saldo.getText())+","+nilaiToFloat(this.e_total.getText())+")");		

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
					this.sg1.clear(1); 	this.sg2.clear(1); 					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (this.inValid) {
					system.alert(this,"Transaksi tidak valid.","Data tidak dapat disimpan.");
					return false;						
				}
				if (this.stsGar == "1") {									
					if (nilaiToFloat(this.e_total.getText()) > nilaiToFloat(this.e_saldo.getText())) {
						system.alert(this,"Transaksi tidak valid.","Nilai transaksi melebihi Saldo Budget.");
						return false;						
					}
				}
				if (nilaiToFloat(this.e_total.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh kurang nol.");
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
					sql.add("delete from yk_bpjs_m where no_bpjs='"+this.e_nb.getText()+"'");	
					sql.add("delete from yk_bpjs_j where no_bpjs='"+this.e_nb.getText()+"'");	
					sql.add("delete from yk_bpjs_d where no_bpjs='"+this.e_nb.getText()+"'");	

					sql.add("delete from pbh_pb_m where no_pb='"+this.e_nb.getText()+"'");	
					sql.add("delete from pbh_pb_j where no_pb='"+this.e_nb.getText()+"'");	
					sql.add("delete from pbh_rek where no_bukti='"+this.e_nb.getText()+"'");
					sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"'");	
				}				
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);	
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_bpjs_m","no_bpjs",this.app._lokasi+"-PRM"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},
	doChange:function(sender){		
		try {
			if (sender == this.c_jenis && this.c_jenis.getText()!="") {
				if (this.c_jenis.getText() == "PEGAWAI") {
					this.cb_akun.setText("11050308");
					this.akunHutang = "21010101";
				}
				if (this.c_jenis.getText() == "PENSIUN") {
					this.cb_akun.setText("61010201");
					this.akunHutang = "21010102";
				}
				if (this.c_jenis.getText() == "YAKES") {
					this.cb_akun.setText("21080102");
					this.akunHutang = "21010101";
				}
			}

			if ((sender == this.cb_akun || sender == this.e_periode) && this.cb_akun.getText()!="" && this.e_periode.getText()!="") {
				var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.stsGar = line.status_gar;
					} 
				}
				if (this.stsGar == "1") this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join angg_r b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode1,1,4) and b.periode1 like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp = '"+this.kodepp+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.modul='RELEASE'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);							
				else this.cb_drk.setSQL("select '-' as kode_drk, '-' as nama ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);							
			}

			if ((sender == this.cb_akun || sender == this.cb_drk || sender == this.e_periode) && this.cb_akun.getText()!="" && this.cb_drk.getText()!="" && this.e_periode.getText()!="") {
				var data = this.dbLib.getDataProvider("select fn_saldoRilis('"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as saldo ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];					
					this.e_saldo.setText(floatToNilai(line.saldo));                       
				}
			}

			if (sender == this.cb_vendor && this.cb_vendor.getText()!="") {
				this.cb_rek.setSQL("select nu, bank+'-'+cabang as bank from vendor_rek where kode_vendor='"+this.cb_vendor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nu","bank"],false,["Kode","Bank"],"and","Data Rekening",true);
			}

			if (sender == this.cb_rek && this.cb_rek.getText()!="") {
				var data = this.dbLib.getDataProvider("select * from vendor_rek where nu="+this.cb_rek.getText()+" and kode_vendor='"+this.cb_vendor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.e_bank.setText(line.bank+' - '+line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.e_banktrans.setText(line.bank_trans);
					}
				}
			}
		}
		catch(e) {
			alert(e);
		}

	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							//this.nama_report="server_report_saku3_siswa_rptSisJurnalRekonYptNon";
							//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); 					
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																								
		var strSQL = "select a.no_bpjs,convert(varchar,a.tanggal,103) as tgl,modul,a.keterangan,a.nilai "+
		             "from yk_bpjs_m a "+					 						 
					 "where a.posted<>'T' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R') order by a.no_bpjs";		
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
			this.sg3.appendData([line.no_bpjs,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 4) {
				this.doDoubleClick3(this.sg3,0,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);
				setTipeButton(tbHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));	
								
				var strSQL = "select a.*,b.nik_buat,b.nik_app,b.nik_ver,c.nu "+
							 "from yk_bpjs_m a "+
							 "inner join pbh_pb_m b on a.no_bpjs=b.no_pb "+
							 "inner join pbh_rek c on a.no_bpjs=c.no_bukti "+
							 "where a.no_bpjs = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";														
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.cb_vendor.setText(line.kode_vendor);						
						this.cb_buat.setText(line.nik_buat);
						this.cb_app.setText(line.nik_app);
						this.cb_ver.setText(line.nik_ver);
						this.cb_akun.setText(line.akun_debet);						
						this.cb_drk.setText(line.kode_drk);	
						this.cb_rek.setText(line.nu);
						this.e_total.setText(floatToNilai(line.nilai));
					}
				}	
				
				var strSQL = "select top 20 * from yk_bpjs_d where no_bpjs ='"+this.e_nb.getText()+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.no_kartu,line.nik,line.npp,line.nama,line.hub_klg,line.tgl_lahir,line.faskes1,line.faskesg,line.tmt,line.sts_peserta,floatToNilai(line.nilai),"VALID"]);
					}
				} else this.sg1.clear(1);

			}									
		} catch(e) {alert(e);}
	}
});