window.app_saku3_transaksi_logistik_fPbADK = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_logistik_fPbADK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_logistik_fPbADK";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Permohonan Bayar UM/ADK: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Permohonan","List Permohonan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:7,tag:9,
		            colTitle:["No Bukti","Tanggal","Modul","No Dokumen","Deskripsi","Progress","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,60,350,180,80,80,100]],
					colFormat:[[6],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});						
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[770,12,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[870,12,100,18]}); 		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,348], childPage:["Otorisasi","Data Permohonan","Data Approval"]});
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		this.cb_tahu = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});						
				
		this.cb_spk = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Data SPK", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});						
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Kode Mitra", readOnly:true,tag:4});				
		this.e_namavendor = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Nama Mitra", readOnly:true,tag:4});				
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Bank", readOnly:true,tag:4});				
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"No Rekening", readOnly:true,tag:4});				
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Cabang", readOnly:true,tag:4});				
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"Nama Rekening", readOnly:true,tag:4});								
		this.e_saldo = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Saldo SPK", tag:4, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Nilai PB", tag:4, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
				
		this.e_noapp = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,450,20],caption:"No Approve/Ver", tag:9, readOnly:true});
		this.e_memo = new saiMemo(this.pc1.childPage[2],{bound:[20,12,450,150],caption:"Catatan",tag:9, readOnly:true});
		this.e_memo.setReadOnly(true);
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
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
			this.flagGarFree = "0"; this.flagDokFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('LOGADK','HUTLOG','GARFREE','DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;		
					if (line.kode_spro == "LOGADK") this.akunADK = line.flag;			
					if (line.kode_spro == "HUTLOG") this.akunHutang = line.flag;							
				}
			}						
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_bidang='"+this.app._kodeBidang+"' "+
			                   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);						
			this.cb_tahu.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_bidang='"+this.app._kodeBidang+"' "+
			                   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);						
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_logistik_fPbADK.extend(window.childForm);
window.app_saku3_transaksi_logistik_fPbADK.implement({		
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,4])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from yk_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_pb_d where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						
						sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from log_pbadk_d where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}								
					else {
						this.kodeLokAsal = this.app._lokasi;
						this.modul = "PBADK";
					}					
					if (this.progSeb == "V") var vProg = "1"; else var vProg = "0";					
					
					sql.add("insert into yk_pb_m (no_pb,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai,modul,progress,kode_pp,nik_app,nik_tahu,no_hutang,no_app,no_spb,no_ver,kode_bidang,kode_loktuj,nilai_final) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.modul+"','"+vProg+"','"+this.app._kodePP+"','"+this.cb_app.getText()+"','"+this.cb_tahu.getText()+"','"+this.cb_spk.getText()+"','"+this.noAppLama+"','-','"+this.noVerLama+"','"+this.app._kodeBidang+"','"+this.app._lokasi+"',"+nilaiToFloat(this.e_nilai.getText())+")");							
					sql.add("insert into yk_pb_d(no_pb,kode_lokasi,kode_lokvendor,kode_vendor,bank,cabang,no_rek,nama_rek,nilai,keterangan) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.kodeLokAsal+"','"+this.e_vendor.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.e_ket.getText()+"')");
					sql.add("insert into yk_pb_j(no_pb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunHutang+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','"+this.modul+"','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");															
					
							
					sql.add("insert into hutang_m(no_hutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_project,kode_vendor,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_hutang,posted,nilai_ppn,modul,no_ref) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','-','"+this.e_vendor.getText()+"','IDR',1,'"+this.app._userLog+"','"+this.app._kodePP+"',"+parseNilai(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.akunHutang+"','F',0,'LOGADK','"+this.cb_spk.getText()+"')");
					sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_spk.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunADK+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGADK','ADK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					sql.add("insert into hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_spk.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.akunHutang+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_nilai.getText())+","+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOGADK','HUT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					
					sql.add("insert into log_pbadk_d(no_pb,no_spk,kode_lokasi,periode,dc,nilai,no_bast,akun_adk) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_spk.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'-','"+this.akunADK+"')");
					
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
					this.standarLib.clearByTag(this, new Array("0","1","4"),this.e_nb);
					this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					setTipeButton(tbAllFalse);					
					this.stsSimpan = 1;			
					this.progSeb ="";
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";												
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																					
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai PB melebihi Saldo.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Bayar tidak boleh nol atau kurang.");
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
				this.preView = "0";				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from yk_pb_m where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_pb_j where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_pb_d where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					
					sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from log_pbadk_d where no_pb = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
		if (this.stsSimpan == 1) {
			this.doClick();		
			this.cb_spk.setSQL("select a.no_spk, a.keterangan "+
							   "from log_spk_m a "+
							   "   inner join log_tap_m c on a.no_spk=c.no_spk and a.kode_lokasi=c.kode_lokasi "+
							   "   inner join log_pesan_m d on c.no_spph=d.no_spph and c.kode_lokasi=d.kode_lokasi and d.jenis='CAPEX' "+
							   "left join (select distinct kode_lokasi,no_dokumen from hutang_m where kode_lokasi='"+this.app._lokasi+"') e on a.no_spk=e.no_dokumen and a.kode_lokasi=e.kode_lokasi "+
							   "left join ("+
							   "	select no_spk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) adk "+
							   "    from log_pbadk_d where kode_lokasi='"+this.app._lokasi+"' group by no_spk,kode_lokasi "+
							   "	) b on a.no_spk=b.no_spk and a.kode_lokasi=b.kode_lokasi "+
			                   "where e.no_dokumen is null and a.total > isnull(b.adk,0) and a.periode<='"+this.e_periode.getText()+"' and a.no_pks <> '-' and a.kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data SPK",true);		
		}
					
	},
	doChange:function(sender){
		if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();					
		if (sender == this.cb_spk && this.cb_spk.getText() != "") {
			var strSQL = "select b.kode_vendor,b.nama,b.bank,b.cabang,b.no_rek,b.nama_rek,a.total - isnull(c.adk,0) as saldo "+
			             "from log_spk_m a "+
			             "  inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
			             "  left join ("+
						 "	select no_spk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) adk "+
						 "    from log_pbadk_d where kode_lokasi='"+this.app._lokasi+"' group by no_spk,kode_lokasi "+
						 "	) c on a.no_spk=c.no_spk and a.kode_lokasi=c.kode_lokasi "+
						 "where a.no_spk='"+this.cb_spk.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){													
					this.e_vendor.setText(line.kode_vendor);
					this.e_namavendor.setText(line.nama);
					this.e_bank.setText(line.bank);
					this.e_norek.setText(line.no_rek);
					this.e_cabang.setText(line.cabang);
					this.e_namarek.setText(line.nama_rek);
					this.e_saldo.setText(floatToNilai(line.saldo));
				}
			}
		}	
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {			
					this.progSeb = "0";					
					this.sg3.clear(1); 
					this.standarLib.clearByTag(this, new Array("4"),this.e_nb);
				}					
				this.noAppLama = "-";
				this.noVerLama = "-";
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_pb_m","no_pb",this.app._lokasi+"-PB"+this.e_periode.getText().substr(2,4)+".","0000"));						
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
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
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_hutang_rptPbForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pb='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
			this.standarLib.clearByTag(this, new Array("0","1","4"),this.e_nb);
            this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			setTipeButton(tbAllFalse);
			this.stsSimpan = 1;				
			this.progSeb ="";
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																						
		if (this.app._userStatus == "A") var pp = ""; else var pp = " a.kode_pp = '"+this.app._kodePP+"' and "; 
		var strSQL = "select a.no_pb,convert(varchar,a.tanggal,103) as tgl,a.modul,a.no_dokumen,a.keterangan,a.progress,a.nilai "+
		             "from yk_pb_m a inner join hutang_m b on a.no_pb=b.no_hutang "+					 					 
					 "where b.posted='F' and "+pp+" a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'PBADK' and a.progress in ('0','R','V') ";					 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);							
		this.dataHutang();				
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_pb,line.tgl,line.modul,line.no_dokumen,line.keterangan,line.progress,floatToNilai(line.nilai)]); 
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
				this.progSeb = this.sg3.cells(5,row);
				this.modul = this.sg3.cells(2,row);				
				this.kodeLokAsal = this.app._lokasi;
				
				if (this.progSeb == "V") {
					var modulApp = "PBAKRU_SPB"; 
					var vRelasi = " a.no_ver=b.no_app and ";
				}
				else {
					var modulApp = "PB_APP"; 
					var vRelasi = " a.no_app=b.no_app and ";
				}				
				var strSQL = "select a.nilai_final,a.nilai-isnull(c.tambah,0) as nilai,a.no_hutang,a.no_ver as no_verlama,a.no_app as no_applama,a.keterangan,a.no_dokumen,a.modul,a.due_date,a.tanggal,a.nik_tahu,a.nik_app,a.progress,isnull(b.no_app,'-') as no_app,isnull(b.catatan,'-') as catatan "+
							 "from yk_pb_m a left join ("+
							 "        select a.kode_lokasi,a.no_app,a.catatan from app_d a inner join app_m b "+
							 "        on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_appseb='-' and b.modul='"+modulApp+"') b on "+vRelasi+" a.kode_lokasi=b.kode_lokasi "+							 
							 "               left join ("+
							 "        select no_pb,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tambah "+
							 "        from yk_pb_j where jenis='TAMBAH' and no_pb='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' group by no_pb,kode_lokasi "+
							 ") c on a.no_pb=c.no_pb and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_pb = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.dp_d2.setText(line.due_date);
						this.cb_app.setText(line.nik_app);
						this.cb_tahu.setText(line.nik_tahu);
						this.e_noapp.setText(line.no_app);					
						this.e_memo.setText(line.catatan);	
						this.noAppLama = line.no_applama;
						this.noVerLama = line.no_verlama;
						this.noHut = line.no_hutang;
						this.e_nilai.setText(floatToNilai(line.nilai_final));
					}
				}												
									
			}									
		} catch(e) {alert(e);}
	}
});