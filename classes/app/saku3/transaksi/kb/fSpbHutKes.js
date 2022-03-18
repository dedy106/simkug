window.app_saku3_transaksi_kb_fSpbHutKes = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_kb_fSpbHutKes.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kb_fSpbHutKes";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi - Surat Perintah Bayar: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,445], childPage:["Daftar Bukti","Verifikasi","Daftar Atensi","Cari Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:13,tag:0,		            
					colTitle:["Modul","No Bukti","Status","Tanggal","Bank","Lok. Asal","Deskripsi","Nilai BP","Nilai CC","Total","Tgl Input","No SPB","Lok TM"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[60,100,110,90,90,90,250,60,80,70,60,100,60]],
					readOnly:true,colFormat:[[7,8,9],[cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});
						
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,202,20],caption:"Status",items:["APPROVE"], readOnly:true,tag:2,change:[this,"doChange"]}); //,"REVISI"
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,13,450,80],caption:"Catatan",tag:9,readOnly:true});
		
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Verifikasi", readOnly:true});						
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,200,20],caption:"No Bukti", readOnly:true});		
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,12,200,20],caption:"Modul", readOnly:true,change:[this,"doChange"]});				
		this.e_nb2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"No SPB", readOnly:true,tag:9});						
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,200,20],caption:"Tgl Bukti", readOnly:true});
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,13,200,20],caption:"Bank", readOnly:true});				
		this.cb_sah = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Disahkan Oleh", multiSelection:false, maxLength:10, tag:2});								
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,200,20],caption:"Total PB", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_fiat = new saiCBBL(this.pc1.childPage[1],{bound:[20,19,220,20],caption:"Difiat Oleh", multiSelection:false, maxLength:10, tag:2});								
		this.e_totalRek = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,19,200,20],caption:"Total Atensi", readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_bdh = new saiCBBL(this.pc1.childPage[1],{bound:[20,20,220,20],caption:"Bendahara", multiSelection:false, maxLength:10, tag:2});								
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,20,450,20],caption:"Deskripsi", readOnly:true});				
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,210],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,270,50,200,80]],					
					readOnly:true,colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});		
		
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-40],colCount:8,tag:0,
		            colTitle:["Kode Atensi","Nama","Bank","Cabang","No Rekening","Nama Rekening","Nilai","Bank Transfer"],
					colWidth:[[7,6,5,4,3,2,1,0],[200,100,150,150,150,80,150,80]],					
					columnReadOnly:[true,[0,1,2,3,4,5,7],[6]],colFormat:[[6],[cfNilai]],
					change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager1"]});		
				
		this.c_status2 = new saiCB(this.pc1.childPage[3],{bound:[20,10,200,20],caption:"Status",items:["INPROG","APPROVE","REVISI"], readOnly:true,tag:9}); 
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,15,450,20],caption:"Deskripsi",tag:9});		
		this.bCari = new button(this.pc1.childPage[3],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);			
		this.pc1.childPage[3].rearrangeChild(10, 23);	
				
		setTipeButton(tbSimpan);
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			this.c_status.setText("");									
			this.cb_sah.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_fiat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_bdh.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BDH1','TAKHUT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "BDH1") this.cb_bdh.setText(line.flag);
					if (line.kode_spro == "TAKHUT") this.akunTakHut = line.flag;			
				}
			}	

		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_kb_fSpbHutKes.extend(window.childForm);
window.app_saku3_transaksi_kb_fSpbHutKes.implement({	
	mainButtonClick: function(sender, desk){
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
			this.doClick();			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.c_status.getText()=="APPROVE") var prog = "2";																	
					if (this.c_status.getText()=="REVISI")  var prog = "V";												
					
					if (this.noSPB == "-") this.e_nb2.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spb_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","0000"));									
					else {
						this.e_nb2.setText(this.noSPB);
						sql.add("delete from spb_m where no_spb='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_j where no_spb='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_d where no_spb='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");								
					}																						
					if (this.kodeLokAsal != this.app._kodeLokasiPusat)
						sql.add("update yk_hutang_d set progress='"+prog+"',no_ver='"+this.e_nb.getText()+"',no_spb='"+this.e_nb2.getText()+"' where bank_trans='"+this.e_bank.getText()+"' and no_hutang='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.kodeLokAsal+"'");
					else sql.add("update yk_hutang_d set progress='"+prog+"',no_ver='"+this.e_nb.getText()+"',no_spb='"+this.e_nb2.getText()+"' where bank_trans='"+this.e_bank.getText()+"' and no_hutang='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.kodeLokTM+"'");
					
					var modulSPB = this.e_modul.getText()+"_SPB";
					
					sql.add("update a set no_appseb ='"+this.e_nb.getText()+"' "+
							"from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_appseb='-' "+
							"where b.no_bukti ='"+this.e_nobukti.getText()+"' and b.modul='"+modulSPB+"' and b.kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','"+modulSPB+"','-')");
					sql.add("insert into app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
							"('"+this.e_nb.getText()+"','"+prog+"','"+modulSPB+"','"+this.e_nobukti.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");
															
					var duedate = this.e_tgl.getText().substr(6,4)+"-"+this.e_tgl.getText().substr(3,2)+"-"+this.e_tgl.getText().substr(0,2);
					if (this.c_status.getText()=="APPROVE") { 						
						sql.add("insert into spb_m(no_spb,no_ver,no_bukti,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nik_buat,nik_sah,nik_fiat,nik_bdh,lok_bayar,no_fiat,no_kas,nilai,modul,progress,kode_ppasal) values "+
								"('"+this.e_nb2.getText()+"','"+this.e_nb.getText()+"','"+this.e_nobukti.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+duedate+"','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.cb_sah.getText()+"','"+this.cb_fiat.getText()+"','"+this.cb_bdh.getText()+"','"+this.app._lokasi+"','-','-',"+nilaiToFloat(this.e_total.getText())+",'"+modulSPB+"','0','"+this.kodeLokAsal+"2000')");
						if (this.sg1.getRowValidCount() > 0){
							for (var i=0;i < this.sg1.getRowCount();i++){
								if (this.sg1.rowValid(i)){
									if (this.kodeLokAsal != this.app._kodeLokasiPusat)
										sql.add("insert into spb_d(no_spb,kode_lokasi,kode_vendor,bank,cabang,no_rek,nama_rek,nilai,keterangan,kode_lokvendor) values "+
												"('"+this.e_nb2.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(5,i)+"',"+nilaiToFloat(this.sg1.cells(6,i))+",'"+this.sg1.cells(7,i)+"','"+this.kodeLokAsal+"')");
									else
										sql.add("insert into spb_d(no_spb,kode_lokasi,kode_vendor,bank,cabang,no_rek,nama_rek,nilai,keterangan,kode_lokvendor) values "+
												"('"+this.e_nb2.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(5,i)+"',"+nilaiToFloat(this.sg1.cells(6,i))+",'"+this.sg1.cells(7,i)+"','"+this.kodeLokTM+"')");
								}
							}
						}						
						if (this.sg3.getRowValidCount() > 0){
							for (var i=0;i < this.sg3.getRowCount();i++){
								if (this.sg3.rowValid(i)){
									sql.add("insert into spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
											"('"+this.e_nb2.getText()+"','"+this.e_nobukti.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg3.cells(0,i)+"','"+this.sg3.cells(3,i)+"','"+this.sg3.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg3.cells(4,i))+",'"+this.sg3.cells(5,i)+"','"+this.sg3.cells(7,i)+"','"+this.app._lokasi+"','SPB','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
								}
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg1.clear(1); this.sg3.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.c_status.setText("");
					this.e_memo.setText("");
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";				
				var data = this.dbLib.getDataProvider("select progress from spb_m where no_spb='"+this.noSPB+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						if (line.progress == "1" || line.progress == "2") {
							system.alert(this,"Transaksi tidak valid.","No SPB sudah difiat / dibayar.");
							return false;
						}
					}
				}								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																				
				if (this.c_status.getText()=="APPROVE") {										
					this.cb_sah.setTag("2");
					this.cb_fiat.setTag("2");
					this.cb_bdh.setTag("2");					
					this.sg3.setTag("2");					
				}
				else {
					this.cb_sah.setTag("9");
					this.cb_fiat.setTag("9");
					this.cb_bdh.setTag("9");					
					this.sg3.setTag("9");
				}				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_total.getText()) != nilaiToFloat(this.e_totalRek.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total harus sama dengan Total Rekeningnya.");
					return false;						
				}
				else this.simpan();				
				break;								
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				var data = this.dbLib.getDataProvider("select progress from spb_m where no_spb='"+this.noSPB+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						if (line.progress == "1" || line.progress == "2") {
							system.alert(this,"Transaksi tidak valid.","No SPB sudah difiat / dibayar.");
							return false;
						}
					}
				}								
				var sql = new server_util_arrayList();				
				if (this.kodeLokAsal != this.app._kodeLokasiPusat) sql.add("update yk_hutang_d set progress='1',no_ver='-',no_spb='-' where bank_trans='"+this.e_bank.getText()+"' and no_hutang='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.kodeLokAsal+"'");								
				else sql.add("update yk_hutang_d set progress='1',no_ver='-',no_spb='-' where bank_trans='"+this.e_bank.getText()+"' and no_hutang='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.kodeLokTM+"'");								
				sql.add("delete from spb_m where no_spb='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from spb_j where no_spb='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from spb_d where no_spb='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");								
				
				var data = this.dbLib.getDataProvider("select a.no_app from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and b.no_bukti='"+this.e_nobukti.getText()+"' "+
													  "where a.no_appseb='-' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul like '%_SPB'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						sql.add("delete from app_m where no_app='"+line.no_app+"' and kode_lokasi='"+this.app._lokasi+"'");									
						sql.add("delete from app_d where no_app='"+line.no_app+"' and kode_lokasi='"+this.app._lokasi+"'");									
					}
				}
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
			this.doClick();
			this.doLoad();
		}
		catch(e) {
			alert(e);
		}
	},		
	doChange:function(sender){		
		try {
			if (sender == this.c_status && this.c_status.getText()!="") {
				if (this.c_status.getText() == "APPROVE") {				
					if (this.noSPB == "-") this.e_nb2.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spb_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","0000"));																						
					else this.e_nb2.setText(this.noSPB);								
				}
				else this.e_nb2.setText("-");
			}		
			if (sender == this.e_modul && this.e_modul.getText()!="") {			
				this.cb_sah.setReadOnly(false);
				this.cb_fiat.setReadOnly(false);
				this.cb_bdh.setReadOnly(false);			
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){
		try {
			if (this.e_nobukti.getText()!="") {						
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"app_m","no_app",this.app._lokasi+"-VER"+this.e_periode.getText().substr(2,4)+".","0000"));												
				this.c_status.setFocus();						
			}
		}
		catch(e) {
			alert(e);
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.e_modul.setText(this.sg.cells(0,row));
				this.e_nobukti.setText(this.sg.cells(1,row));								
				this.e_tgl.setText(this.sg.cells(3,row));
				this.e_ket.setText(this.sg.cells(6,row));
				this.e_total.setText(this.sg.cells(9,row));
				this.noSPB = this.sg.cells(11,row);						
				this.stsProg = this.sg.cells(2,row);
				this.kodeLokAsal = this.sg.cells(5,row);				
				this.e_bank.setText(this.sg.cells(4,row));
				this.e_nb2.setText(this.noSPB);					
				this.kodeLokTM = this.sg.cells(12,row);				
				
				this.doClick();								
				if (this.stsProg == "APPROVE" || this.stsProg == "REVISI") setTipeButton(tbUbahHapus);									
				else setTipeButton(tbSimpan);					
				
				this.doFiat();																
				
				if (this.kodeLokAsal != this.app._lokasi) {
					var strSQL4 = "select b.kode_akun,b.nama as nama_akun,'D' as dc,'"+this.e_ket.getText()+"' as keterangan,a.nilai,c.kode_pp,c.nama as nama_pp,'-' as kode_drk,'-' as nama_drk "+
								  "from (select no_hutang,kode_lokasi,sum(nilai_bp+nilai_cc) as nilai "+
								  "      from yk_hutang_d "+
								  "      where no_hutang='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.kodeLokAsal+"' and bank_trans='"+this.e_bank.getText()+"' "+
								  "      group by no_hutang,kode_lokasi) a "+
								  "inner join masakun b on b.kode_akun='"+this.akunTakHut+"' and b.kode_lokasi='"+this.kodeLokAsal+"' "+								  
								  "inner join pp c on c.kode_lokasi='"+this.app._lokasi+"' and c.kode_pp='"+this.app._kodePP+"' "+								  
								  "where a.no_hutang = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.kodeLokAsal+"'";															
				}
				else {
					if (this.kodeLokAsal != this.app._kodeLokasiPusat) {
						var strSQL4 = "select c.bp_hut as kode_akun,d.nama as nama_akun,'D' as dc,'HUTANG PEGAWAI' as keterangan,sum(a.nilai_bp) as nilai,e.kode_pp,e.nama as nama_pp,'-' as kode_drk,'-' as nama_drk "+
									 "from yk_hutang_d a "+					 
									 "     inner join vendor b on a.kode_vendor = b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
									 "     inner join vendor_klp c on b.kode_klpvendor = c.kode_klpvendor and c.kode_lokasi=b.kode_lokasi "+
									 "     inner join masakun d on c.bp_hut = d.kode_akun and c.kode_lokasi=d.kode_lokasi "+
									 "     inner join pp e on e.kode_lokasi='"+this.app._lokasi+"' and e.kode_pp='"+this.app._kodePP+"' "+								  
									 "where a.bank_trans='"+this.e_bank.getText()+"' and a.no_hutang='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nilai_bp > 0 "+
									 "group by c.bp_hut,d.nama,e.kode_pp,e.nama "+
									 "union "+					 
									 "select c.cc_hut as kode_akun,d.nama as nama_akun,'D' as dc,'HUTANG PENSIUN' as keterangan,sum(a.nilai_cc) as nilai,e.kode_pp,e.nama as nama_pp,'-' as kode_drk,'-' as nama_drk "+
									 "from yk_hutang_d a "+					 
									 "     inner join vendor b on a.kode_vendor = b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
									 "     inner join vendor_klp c on b.kode_klpvendor = c.kode_klpvendor and c.kode_lokasi=b.kode_lokasi "+
									 "     inner join masakun d on c.cc_hut = d.kode_akun and c.kode_lokasi=d.kode_lokasi "+
									 "     inner join pp e on e.kode_lokasi='"+this.app._lokasi+"' and e.kode_pp='"+this.app._kodePP+"' "+								  
									 "where a.bank_trans='"+this.e_bank.getText()+"' and a.no_hutang='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nilai_cc > 0 "+
									 "group by c.cc_hut,d.nama,e.kode_pp,e.nama "+					 
									 "order by dc desc";				
					}
					else {
						var strSQL4 = "select c.bp_hut as kode_akun,d.nama as nama_akun,'D' as dc,'HUTANG PEGAWAI' as keterangan,sum(a.nilai_bp) as nilai,e.kode_pp,e.nama as nama_pp,'-' as kode_drk,'-' as nama_drk "+
									 "from yk_hutang_d a "+					 
									 "     inner join vendor b on a.kode_vendor = b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
									 "     inner join vendor_klp c on b.kode_klpvendor = c.kode_klpvendor and c.kode_lokasi=b.kode_lokasi "+
									 "     inner join masakun d on c.bp_hut = d.kode_akun and c.kode_lokasi=d.kode_lokasi "+
									 "     inner join pp e on e.kode_lokasi='"+this.app._lokasi+"' and e.kode_pp='"+this.app._kodePP+"' "+								  
									 "where a.bank_trans='"+this.e_bank.getText()+"' and a.no_hutang='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.kodeLokTM+"' and a.nilai_bp > 0 "+
									 "group by c.bp_hut,d.nama,e.kode_pp,e.nama "+
									 "union "+					 
									 "select c.cc_hut as kode_akun,d.nama as nama_akun,'D' as dc,'HUTANG PENSIUN' as keterangan,sum(a.nilai_cc) as nilai,e.kode_pp,e.nama as nama_pp,'-' as kode_drk,'-' as nama_drk "+
									 "from yk_hutang_d a "+					 
									 "     inner join vendor b on a.kode_vendor = b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
									 "     inner join vendor_klp c on b.kode_klpvendor = c.kode_klpvendor and c.kode_lokasi=b.kode_lokasi "+
									 "     inner join masakun d on c.cc_hut = d.kode_akun and c.kode_lokasi=d.kode_lokasi "+
									 "     inner join pp e on e.kode_lokasi='"+this.app._lokasi+"' and e.kode_pp='"+this.app._kodePP+"' "+								  
									 "where a.bank_trans='"+this.e_bank.getText()+"' and a.no_hutang='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.kodeLokTM+"' and a.nilai_cc > 0 "+
									 "group by c.cc_hut,d.nama,e.kode_pp,e.nama "+					 
									 "order by dc desc";										
					}
				}				
				if (this.stsProg == "INPROG") {							
					if (this.kodeLokAsal != this.app._kodeLokasiPusat) {
						var strSQL3 = "select a.kode_vendor,b.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai_bp+a.nilai_cc as nilai,a.bank_trans as keterangan "+
									  "from yk_hutang_d a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
									  "                   inner join yk_hutang_m c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi "+ 
									  "where a.bank_trans ='"+this.e_bank.getText()+"' and c.no_hutang='"+this.e_nobukti.getText()+"' and c.kode_loktuj='"+this.app._lokasi+"' order by a.bank_trans ";									
					}
					else {
						var strSQL3 = "select a.kode_vendor,b.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai_bp+a.nilai_cc as nilai,a.bank_trans as keterangan "+
									  "from yk_hutang_d a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
									  "                   inner join yk_hutang_m c on a.no_hutang=c.no_hutang "+ 
									  "where a.kode_lokasi='"+this.kodeLokTM+"' and a.bank_trans ='"+this.e_bank.getText()+"' and c.no_hutang='"+this.e_nobukti.getText()+"' and c.kode_loktuj='"+this.app._lokasi+"' order by a.bank_trans ";									
					}
				}
				if (this.stsProg == "APPROVE" || this.stsProg == "REVISI") {													  
					var strSQL3 = "select a.kode_vendor,b.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai,a.keterangan "+
								  "from spb_d a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokvendor=b.kode_lokasi "+
								  "where a.no_spb='"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"' ";												
				}				
				if (this.stsProg == "FIAT") {										
					var strSQL3 = "select a.kode_vendor,b.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai,a.keterangan "+
								  "from spb_d a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokvendor=b.kode_lokasi "+
								  "where a.no_spb='"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"' ";																
				}										
																					
				var nilai = 0;
				var data = this.dbLib.getDataProvider(strSQL4,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						if (line.dc.toUpperCase()=="D") nilai += parseFloat(line.nilai);
						else nilai -= parseFloat(line.nilai);
						this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan.toUpperCase(),floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
				} else this.sg3.clear(1);							
				this.e_total.setText(floatToNilai(nilai));								
				
				var data = this.dbLib.getDataProvider(strSQL3,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																		
						this.sg1.appendData([line.kode_vendor,line.nama,line.bank,line.cabang,line.no_rek,line.nama_rek,floatToNilai(line.nilai),line.keterangan]);
					}
				} else this.sg1.clear(1);											
			}
		} catch(e) {alert(e);}
	},		
	doFiat:function(sender){					
		var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('FIAT1','FIAT2') and "+nilaiToFloat(this.e_total.getText())+" between value1 and value2 and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){													
				var kodeSpro = line.kode_spro;
				this.cb_fiat.setText(line.flag);						
			}
			if (kodeSpro == "FIAT2") {
				var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='FIAT1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.cb_sah.setText(line.flag);
					}
				}
			}
			else {
				var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='FIAT0' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.cb_sah.setText(line.flag);
					}
				}
			}
		}
	},
	doLoad:function(sender){		
		try {			
			var strSQL = "select 'INPROG' as status,a.modul,a.no_hutang,b.bank_trans,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.bp,b.cc,b.bp+b.cc as total,convert(varchar,a.tgl_input,120) as tglinput,b.no_spb,b.kode_lokasi as lok_tm "+
						 "from yk_hutang_m a "+
						 "inner join ( "+
						 "  select no_hutang,kode_lokasi,bank_trans,no_spb,SUM(nilai_bp) as bp,SUM(nilai_cc) as cc "+
						 "  from yk_hutang_d where no_spb='-' group by no_hutang,kode_lokasi,bank_trans,no_spb "+
						 "  ) b on a.no_hutang=b.no_hutang "+ //and a.kode_lokasi=b.kode_lokasi  
						 "where a.kode_loktuj = '"+this.app._lokasi+"' and a.progress='1' and a.modul='HUTKES' and a.jenis <> 'AKRU' "+
						 "union all "+
						 
						 //--fiat koreksi					 
						 "select 'FIAT' as status,a.modul,a.no_hutang,b.bank_trans,a.kode_lokasi,CONVERT(varchar,a.tanggal,103) as tgl,a.keterangan,b.bp,b.cc,b.bp+b.cc as total,convert(varchar,a.tgl_input,120) as tglinput,b.no_spb,b.kode_lokasi as lok_tm "+
						 "from yk_hutang_m a "+
						 "inner join ( "+
						 "  select no_hutang,kode_lokasi,bank_trans,no_spb,SUM(nilai_bp) as bp,SUM(nilai_cc) as cc "+
						 "  from yk_hutang_d where no_spb='-' group by no_hutang,kode_lokasi,bank_trans,no_spb "+
						 "  ) b on a.no_hutang=b.no_hutang "+ //and a.kode_lokasi=b.kode_lokasi 
						 "inner join spb_m d on d.no_spb=b.no_spb and d.progress='K' "+
						 "where a.kode_loktuj = '"+this.app._lokasi+"' and a.progress='2' and a.modul='HUTKES' and a.jenis <> 'AKRU' "+
						 
						 "order by a.kode_lokasi,a.no_hutang ";
						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);					
		}
		catch(e) {
			alert(e);
		}
	},				
	doCari:function(sender){								
		var filter = filter2 = "";
		if (this.c_status2.getText() == "INPROG") filter = " where progress = '1' "; 
		if (this.c_status2.getText() == "APPROVE") filter = " where progress = '2' "; 
		if (this.c_status2.getText() == "REVISI") filter = " where progress = 'V'  "; 					
		if (this.e_ket2.getText()!="") var filter2 = " and a.keterangan like '%"+this.e_ket2.getText()+"%' ";		
		
		var strSQL = "select '"+this.c_status2.getText()+"' as status,a.modul,a.no_hutang,b.bank_trans,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.bp,b.cc,b.bp+b.cc as total,convert(varchar,a.tgl_input,120) as tglinput,b.no_spb,b.kode_lokasi as lok_tm "+
					 "from yk_hutang_m a "+
					 "inner join ( "+
					 "  select no_hutang,kode_lokasi,bank_trans,no_spb,SUM(nilai_bp) as bp,SUM(nilai_cc) as cc "+
					 "  from yk_hutang_d "+filter+" group by no_hutang,kode_lokasi,bank_trans,no_spb "+
					 "  ) b on a.no_hutang=b.no_hutang "+ //and a.kode_lokasi=b.kode_lokasi 
					 "where a.modul='HUTKES' and a.kode_loktuj = '"+this.app._lokasi+"' "+filter2;		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);				
	},		
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg.appendData([line.modul.toUpperCase(),line.no_hutang,line.status.toUpperCase(),line.tgl,line.bank_trans,line.kode_lokasi,line.keterangan,floatToNilai(line.bp),floatToNilai(line.cc),floatToNilai(line.total),line.tglinput,line.no_spb,line.lok_tm]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								if (this.c_status.getText() == "APPROVE") {								
									this.nama_report="server_report_saku2_kopeg_sju_rptPrQuo";
									this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_app='"+this.e_nb.getText()+"' ";
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
									this.pc1.hide();   
								}
								else {
									system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
									this.clearLayar();
								}
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg1.clear(1); this.sg3.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.c_status.setText("");
			this.e_memo.setText("");
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},	
	doChangeCell1: function(sender, col, row){
		if (col == 6 && sender.cells(6,row) != "") sender.validasi();
	},		
	doNilaiChange: function(){		
		try{
			var totRek = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(6,i) != ""){										
					totRek += nilaiToFloat(this.sg1.cells(6,i));					
				}
			}			
			this.e_totalRek.setText(floatToNilai(totRek));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	}
});

