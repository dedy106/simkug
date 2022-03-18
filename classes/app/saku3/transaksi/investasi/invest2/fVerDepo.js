window.app_saku3_transaksi_investasi_invest2_fVerDepo = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_investasi_invest2_fVerDepo.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fVerDepo";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Deposito: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});			
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,445], childPage:["Daftar Approve","Detail","Cari Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:9,
		            colTitle:["No Bukti","Status","Tgl Penempatan","Deskripsi","Nilai","Pembuat","No Flag","Tgl Input"],
					colWidth:[[7,6,5,4,3,2,1,0],[110,100,100,100,300,100,80,100]],					
					colFormat:[[4],[cfNilai]],
					autoPaging:true, rowPerPage:20,
					readOnly:true,dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});
				
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Verifikasi", readOnly:true});								
		this.e_nb2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"SPB", readOnly:true,tag:9});								
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,230,20],caption:"No Bukti", readOnly:true});		
		this.cb_sah = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Disahkan Oleh", multiSelection:false, maxLength:10, tag:2});								
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"Keterangan", readOnly:true});		
		this.cb_fiat = new saiCBBL(this.pc1.childPage[1],{bound:[20,19,220,20],caption:"Difiat Oleh", multiSelection:false, maxLength:10, tag:2});								
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,19,200,20],caption:"Tgl Penempatan", readOnly:true});		
		this.cb_bdh = new saiCBBL(this.pc1.childPage[1],{bound:[20,20,220,20],caption:"Bendahara", multiSelection:false, maxLength:10, tag:2});												
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,20,200,20],caption:"Nilai SPB", readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,12,995,295], childPage:["Data Penempatan","Nota Penempatan","Nota PinBuk"]});		
		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:10,tag:9,
		            colTitle:["Kd Cabang","Nama","Bank","Nominal","Rek Cair","Nama Rek","Rek Bunga","Nama Rek","Jenis","Status"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[ 70,70,150,60,150,60,100,60,150,60]],
					colFormat:[[3],[cfNilai]],
					readOnly:true,
					nilaiChange:[this,"doNilaiChange"],
					autoPaging:true, rowPerPage:20,
					autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1});
		
		this.cb_bsumber = new saiCBBL(this.pc2.childPage[1],{bound:[20,11,220,20],caption:"Bank Sumber", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_nomor1 = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,350,20],caption:"Nomor", tag:8, maxLength:50});										
		this.e_hal1 = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,350,20],caption:"Perihal", tag:8, maxLength:100});										
		this.cb_ttd1 = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,15,220,20],caption:"NIK Kabid",tag:8,multiSelection:false,change:[this,"doChange"]});         						
		this.e_jab1 = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,350,20],caption:"Jabatan", tag:8, maxLength:50});										
		this.cb_ttd2 = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,17,220,20],caption:"NIK Man PBH",tag:8,multiSelection:false,change:[this,"doChange"]});         						
		this.e_jab2 = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,18,350,20],caption:"Jabatan", tag:8, maxLength:50});
		
		this.cb_bsumber2 = new saiCBBL(this.pc2.childPage[2],{bound:[20,11,220,20],caption:"Bank Sumber", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		this.e_nomor2 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,10,350,20],caption:"Nomor", tag:8, maxLength:50});										
		this.e_dari2 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,14,350,20],caption:"Perihal", tag:8, maxLength:100});										
		this.e_hal2 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,16,350,20],caption:"Perihal", tag:8, maxLength:100});										
		this.cb_ttd3 = new portalui_saiCBBL(this.pc2.childPage[2],{bound:[20,15,220,20],caption:"NIK Kabid",tag:8,multiSelection:false,change:[this,"doChange"]});         						
		this.e_jab3 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,16,350,20],caption:"Jabatan", tag:8, maxLength:50});										
		this.cb_ttd4 = new portalui_saiCBBL(this.pc2.childPage[2],{bound:[20,17,220,20],caption:"NIK Man PBH",tag:8,multiSelection:false,change:[this,"doChange"]});         						
		this.e_jab4 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,18,350,20],caption:"Jabatan", tag:8, maxLength:50});
		
		this.c_status2 = new saiCB(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Status",items:["INPROG","APPROVE","REVISI"], readOnly:true,tag:9}); 
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,450,20],caption:"Deskripsi",tag:9});		
		this.bCari = new button(this.pc1.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		this.pc2.childPage[2].rearrangeChild(10, 23);	
		
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			this.cb_sah.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_fiat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_bdh.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			this.cb_ttd1.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_ttd2.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_ttd3.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_ttd4.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BDH1','FIAT1','FIAT2') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];						
					if (line.kode_spro == "FIAT2") this.NIKKabid = line.flag;
					if (line.kode_spro == "FIAT1") this.NIKMan = line.flag;
					if (line.kode_spro == "BDH1") this.cb_bdh.setText(line.flag);				
				}
			}

			
			this.cb_bsumber.setSQL("select kode_bank, nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"and","Data Rekening",true);			
			this.e_nomor1.setText("     /KU000/YAKES-20/2015");
			this.e_hal1.setText("Pemindahbukuan Dana");
			this.cb_ttd1.setText(this.NIKKabid);
			this.cb_ttd2.setText(this.NIKMan);
			
			this.cb_bsumber2.setSQL("select kode_bank, nama from inv_bank",["kode_bank","nama"],false,["Kode","Nama"],"and","Data Rekening",true);			
			this.e_nomor2.setText("     /KU000/YAKES-20/2015");
			this.e_dari2.setText("KABIDKUG YAKES-TELKOM");
			this.e_hal2.setText("Pemindahbukuan Dana");
			this.cb_ttd3.setText(this.NIKKabid);
			this.cb_ttd4.setText(this.NIKMan);
			
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_investasi_invest2_fVerDepo.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fVerDepo.implement({	
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
			if (this.stsSimpan == 1) this.doClick();			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,8])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																											
					if (this.stsSimpan == 0) {
						sql.add("update inv_shop_m set progress='1',no_spb='-',bsumber='-' where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update inv_depo2_m set bsumber='-' where no_shop='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_spb_surat where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						sql.add("delete from spb_m where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_j where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_d where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
						sql.add("delete from app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from app_d where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					}
										
					sql.add("update inv_shop_m set progress='2',no_spb='"+this.e_nb2.getText()+"',bsumber='"+this.cb_bsumber.getText()+"' where no_shop='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update inv_depo2_m set bsumber='"+this.cb_bsumber.getText()+"' where no_shop='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update a set no_appseb ='"+this.e_nb.getText()+"' "+
							"from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_appseb='-' "+
							"where b.no_bukti ='"+this.e_nobukti.getText()+"' and b.modul='INV_SPB' and b.kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'APPROVE','INV_SPB','-')");
					sql.add("insert into app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
							"('"+this.e_nb.getText()+"','2','INV_SPB','"+this.e_nobukti.getText()+"','"+this.app._lokasi+"','-')");
					
					sql.add("insert into spb_m(no_spb,no_ver,no_bukti,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nik_buat,nik_sah,nik_fiat,nik_bdh,lok_bayar,no_fiat,no_kas,nilai,modul,progress,kode_ppasal) values "+
							"('"+this.e_nb2.getText()+"','"+this.e_nb.getText()+"','"+this.e_nobukti.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.cb_sah.getText()+"','"+this.cb_fiat.getText()+"','"+this.cb_bdh.getText()+"','"+this.app._lokasi+"','-','-',"+nilaiToFloat(this.e_total.getText())+",'INV_SPB','0','"+this.app._kodePP+"')");
					
					sql.add("insert into spb_d(no_spb,kode_lokasi,kode_vendor,bank,cabang,no_rek,nama_rek,nilai,keterangan,kode_lokvendor) "+
							"select '"+this.e_nb2.getText()+"','"+this.app._lokasi+"',a.bdepo,b.kode_bankklp,b.nama,b.no_rek,b.nama_rek,a.nilai,a.keterangan,a.kode_lokasi "+
							"from inv_depo2_m a inner join inv_bank b on a.bdepo=b.kode_bank "+
							"where a.no_shop='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");												
					
					sql.add("insert into spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+
							"select '"+this.e_nb2.getText()+"',a.no_depo,'"+this.dp_d1.getDateString()+"',0,a.akun_depo,b.keterangan,'D',a.nilai,'"+this.app._kodePP+"','-',a.kode_lokasi,a.jenis,a.status_dana,'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
							"from inv_depo2_m a inner join inv_shop_m b on a.no_shop=b.no_shop "+
							"where a.no_shop='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.cb_bsumber2.getText() != "") {
						sql.add("insert into inv_spb_surat(no_spb,no_bukti,kode_lokasi,bsumber,nomor1,hal1,ttd1,ttd2,jab1,jab2, bsumber2,nomor2,dari2,hal2,ttd3,ttd4,jab3,jab4,progress,no_fiat,no_kas) values "+
								"('"+this.e_nb2.getText()+"','"+this.e_nobukti.getText()+"','"+this.app._lokasi+"','"+this.cb_bsumber.getText()+"','"+this.e_nomor1.getText()+"','"+this.e_hal1.getText()+"','"+this.cb_ttd1.getText()+"','"+this.cb_ttd2.getText()+"','"+this.e_jab1.getText()+"','"+this.e_jab2.getText()+"', '"+this.cb_bsumber2.getText()+"','"+this.e_nomor2.getText()+"','"+this.e_dari2.getText()+"','"+this.e_hal2.getText()+"','"+this.cb_ttd3.getText()+"','"+this.cb_ttd4.getText()+"','"+this.e_jab3.getText()+"','"+this.e_jab4.getText()+"','0','-','-')");
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
					this.sg1.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";												
				var data = this.dbLib.getDataProvider("select progress from spb_m where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						if (line.progress == "1" || line.progress == "2") {
							system.alert(this,"Transaksi tidak valid.","No SPB sudah difiat / dibayar.");
							return false;
						}
					}
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}				
				else this.simpan();				
				break;								
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";							
				var data = this.dbLib.getDataProvider("select progress from spb_m where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
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
				sql.add("update inv_shop_m set progress='1',no_spb='-',bsumber='-' where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update inv_depo2_m set bsumber='-' where no_shop='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from inv_spb_surat where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				sql.add("delete from spb_m where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from spb_j where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from spb_d where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
				sql.add("delete from app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from app_d where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
				this.dbLib.execArraySQL(sql);				
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
		this.doClick();
		this.doLoad();
	},		
	doChange : function(sender){		
		if (this.stsSimpan == 1) {			
			if (sender == this.cb_ttd1 && this.cb_ttd1.getText() != "") {
				var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_ttd1.getText()+"' ",true);			
				if (typeof data == "object"){
					var line = data.rs.rows[0];												
					this.e_jab1.setText(line.jabatan);
				}
			}
			if (sender == this.cb_ttd2 && this.cb_ttd2.getText() != "") {
				var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_ttd2.getText()+"' ",true);			
				if (typeof data == "object"){
					var line = data.rs.rows[0];												
					this.e_jab2.setText(line.jabatan);
				}
			}
			if (sender == this.cb_ttd3 && this.cb_ttd3.getText() != "") {
				var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_ttd3.getText()+"' ",true);			
				if (typeof data == "object"){
					var line = data.rs.rows[0];												
					this.e_jab3.setText(line.jabatan);
				}
			}
			if (sender == this.cb_ttd4 && this.cb_ttd4.getText() != "") {
				var data = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_ttd4.getText()+"' ",true);			
				if (typeof data == "object"){
					var line = data.rs.rows[0];												
					this.e_jab4.setText(line.jabatan);
				}
			}			
		}
	},
	doClick:function(sender){
		if (this.e_nobukti.getText()!="" && this.stsSimpan == 1) {						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"app_m","no_app",this.app._lokasi+"-VER"+this.e_periode.getText().substr(2,4)+".","0000"));															
			this.e_nb2.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spb_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","0000"));															
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			var baris = ((this.page-1) * 20) + row;
			if (this.sg.cells(0,baris) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.pc2.setActivePage(this.pc2.childPage[0]);														
				
				this.e_nobukti.setText(this.sg.cells(0,baris));
				this.e_ket.setText(this.sg.cells(3,baris));
				this.e_tgl.setText(this.sg.cells(2,baris));				
				this.stsProg = this.sg.cells(1,baris);
				this.noSPB = this.sg.cells(6,baris);				
				this.e_total.setText(this.sg.cells(4,baris));				
				this.e_nb2.setText(this.noSPB);									
				
				if (this.stsProg == "APPROVE" || this.stsProg == "REVISI") {					
					var strSQL = "select no_app from app_d where no_bukti ='"+this.e_nobukti.getText()+"'";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object") {
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.e_nb.setText(line.no_app);						
						}	
					}

					var strSQL = "select * from inv_spb_surat where no_spb ='"+this.e_nb2.getText()+"'";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object") {
						var line = data.rs.rows[0];							
						if (line != undefined){													
							this.cb_bsumber.setText(line.bsumber);
							this.e_nomor1.setText(line.nomor1);
							this.e_hal1.setText(line.hal1);
							this.cb_ttd1.setText(line.ttd1);
							this.e_jab1.setText(line.jab1);
							this.cb_ttd2.setText(line.ttd2);
							this.e_jab2.setText(line.jab2);							
							this.cb_bsumber2.setText(line.bsumber2);
							this.e_nomor2.setText(line.nomor2);
							this.e_dari2.setText(line.dari2);
							this.e_hal2.setText(line.hal2);
							this.cb_ttd3.setText(line.ttd3);
							this.e_jab3.setText(line.jab3);
							this.cb_ttd4.setText(line.ttd4);
							this.e_jab4.setText(line.jab4);							
						}	
					}
					
					setTipeButton(tbUbahHapus);									
					this.stsSimpan = 0;
				}
				else {
					setTipeButton(tbSimpan);					
					this.stsSimpan = 1;					
				}				
				
				this.doClick();
				this.doFiat();					
												
				var strSQL = "select a.bdepo,b.nama,b.kode_bankklp,a.nilai,a.bcair,c.nama as nama_cair,a.bbunga,d.nama as nama_bunga,a.jenis,a.status_dana "+
							 "from inv_depo2_m a "+
							 "inner join inv_bank b on a.bdepo=b.kode_bank "+
							 "inner join inv_bank c on a.bcair=c.kode_bank "+
							 "inner join inv_bank d on a.bbunga=d.kode_bank "+
							 "where a.no_shop = '"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];			
						this.sg1.appendData([line.bdepo,line.nama,line.kode_bankklp,floatToNilai(line.nilai),line.bcair,line.nama_cair,line.bbunga,line.nama_bunga,line.jenis,line.status_dana]);
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
		var strSQL = "select a.no_shop,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.nik_user+' - '+d.nama as nikuser,a.no_spb as no_flag,a.tgl_input "+
						 "from inv_shop_m a inner join karyawan d on a.nik_user=d.nik "+
						 "where a.modul='SHOP' and a.progress = '1' and a.no_spb='-' and a.kode_lokasi ='"+this.app._lokasi+"' order by a.no_shop";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.sg.clear();			
			this.page = 1;
			for (var i=0;i<this.dataJU.rs.rows.length;i++){
				var line = this.dataJU.rs.rows[i];																	
				this.sg.appendData([line.no_shop,line.status.toUpperCase(),line.tgl,line.keterangan,floatToNilai(line.nilai),line.nikuser,line.no_flag,line.tgl_input]);
			}
		} else this.sg.clear(1);					
	},						
	doTampilData: function(page) {
		this.sg.doSelectPage(page);
		this.page = page;
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},		
	doCari:function(sender){										
		var filter = "";
		if (this.c_status2.getText() == "INPROG") filter = " and a.progress = '1' "; 
		if (this.c_status2.getText() == "APPROVE") filter = " and a.progress = '2' "; 
		if (this.c_status2.getText() == "REVISI") filter = " and a.progress = 'V'  ";
		if (this.e_ket2.getText()!="") filter = " and a.keterangan like '%"+this.e_ket2.getText()+"%' ";		
		
		var strSQL = "select a.no_shop,'"+this.c_status2.getText()+"' as status,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.nik_user+' - '+d.nama as nikuser,a.no_spb as no_flag,a.tgl_input "+
					 "from inv_shop_m a "+
					 "			inner join karyawan d on a.nik_user=d.nik "+
					 "where a.kode_lokasi ='"+this.app._lokasi+"' "+filter+" order by a.no_shop";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.sg.clear();			
			this.page = 1;
			for (var i=0;i<this.dataJU.rs.rows.length;i++){
				var line = this.dataJU.rs.rows[i];																	
				this.sg.appendData([line.no_shop,line.status.toUpperCase(),line.tgl,line.keterangan,floatToNilai(line.nilai),line.nikuser,line.no_flag,line.tgl_input]);
			}
		} else this.sg.clear(1);							
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {								
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
			this.sg1.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},		
	doNilaiChange: function(){		
		try{
			var tot = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(3,i) != ""){										
					tot += nilaiToFloat(this.sg1.cells(3,i));					
				}
			}			
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	}
});

