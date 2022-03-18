window.app_saku3_transaksi_kb_fSpbVer = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_kb_fSpbVer.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kb_fSpbVer";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi - Surat Perintah Bayar: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,445], childPage:["Daftar Bukti","Verifikasi","Item Verifikasi","Jurnal Permohonan","Cari Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:14,tag:0,
		            colTitle:["Modul","No Bukti","Status","Tanggal","Due Date","PP","No Dokumen","Deskripsi","Nilai","Pembuat","No Flag","Lok. Asal","Tgl Input","Kode PP"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[50,110,60,100,150,100,400,100,150,70,70,80,100,80]],
					colHide:[[13],[true]],					
					readOnly:true,colFormat:[[8],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});
		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Status",items:["APPROVE"], readOnly:true,tag:2,change:[this,"doChange"]}); //,"REVISI"
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,13,450,80],caption:"Catatan",tag:9,readOnly:true});
		this.e_memo2 = new saiMemo(this.pc1.childPage[1],{bound:[520,13,450,80],caption:"Catatan App.",tag:9,readOnly:true});
				
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Verifikasi", readOnly:true});						
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,230,20],caption:"No Bukti", readOnly:true});		
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,12,200,20],caption:"Modul", readOnly:true,change:[this,"doChange"]});				
		this.e_nb2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"SPB/TAK/DOK", readOnly:true,tag:9});						
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,230,20],caption:"Tgl Bukti", readOnly:true});
		this.e_duedate = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,13,200,20],caption:"Due Date", readOnly:true});				
		this.cb_sah = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Disahkan Oleh", multiSelection:false, maxLength:10, tag:2});								
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"No Dokumen", readOnly:true});
		this.cb_fiat = new saiCBBL(this.pc1.childPage[1],{bound:[20,19,220,20],caption:"Difiat Oleh", multiSelection:false, maxLength:10, tag:2});								
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,19,450,20],caption:"PP/Unit", readOnly:true});		
		this.cb_bdh = new saiCBBL(this.pc1.childPage[1],{bound:[20,20,220,20],caption:"Bendahara", multiSelection:false, maxLength:10, tag:2});								
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,20,450,20],caption:"Deskripsi", readOnly:true});		
		this.cb_lokbayar = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Lokasi Bayar", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});								
		this.e_buat = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"Pembuat", readOnly:true});
		this.cb_akun = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Akun Mutasi", multiSelection:false, maxLength:10, tag:9});								
		this.e_app = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"Approve", readOnly:true});		
		this.e_bidang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,450,20],caption:"Bidang Tujuan", readOnly:true});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Nilai Permohonan", readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,11,200,20],caption:"Total", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_nilaiVer = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Nilai Verifikasi", readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_totalRek = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,200,20],caption:"Total Rekening", readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.sg1 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,240],colCount:9,tag:0,
		            colTitle:["Kode Atensi","Nama","Bank","Cabang","No Rekening","Nama Rekening","Nilai","Pajak","Keterangan"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[200,80,100,150,150,150,80,150,80]],					
					columnReadOnly:[true,[0,1,2,3,4,5,8],[6,7]],colFormat:[[6,7],[cfNilai,cfNilai]],
					change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager1"]});		
				
		this.sgv = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,130],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6,8],[0,2,3,4,5,7]],
					buttonStyle:[[0,2,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgnv = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sgv});		
				
		this.sg3 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,220],colCount:9,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,270,50,200,80]],					
					readOnly:true,colFormat:[[4],[cfNilai]],nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});		
		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,6,this.pc1.width-5,200],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
				
		this.c_status2 = new saiCB(this.pc1.childPage[4],{bound:[20,10,200,20],caption:"Status",items:["INPROG","APPROVE","REVISI"], readOnly:true,tag:9}); //,"FIAT"
		this.c_modul2 = new saiCB(this.pc1.childPage[4],{bound:[20,11,200,20],caption:"Modul",items:["PB","PANJAR","IFREIM","DAKEM"], readOnly:true,tag:9});
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,15,450,20],caption:"Deskripsi",tag:9});		
		this.bCari = new button(this.pc1.childPage[4],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);			
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		this.pc1.childPage[4].rearrangeChild(10, 23);	
				
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
			this.e_memo2.setReadOnly(true);
			this.c_status.setText("");									
			this.cb_sah.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_fiat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_bdh.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_lokbayar.setSQL("select kode_lokasi, nama from lokasi where flag_pusat='1' union select kode_lokasi,nama from lokasi where kode_lokasi='"+this.app._lokasi+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi Bayar",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag='016' and a.kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun Mutasi",true);
			this.cb_lokbayar.setText(this.app._lokasi);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BDH1','HUTSPB','TAKHUT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "BDH1") this.cb_bdh.setText(line.flag);
					if (line.kode_spro == "HUTSPB") this.akunHutSPB = line.flag;			
					if (line.kode_spro == "TAKHUT") this.akunTakHut = line.flag;			
				}
			}			
			this.lokasiPusat = this.app._kodeLokasiPusat;			
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '047' "+					
			        "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");												
			sql.add("select kode_pp,nama from pp where kode_lokasi = '"+this.app._lokasi+"'"); //kode_bidang='"+this.app._kodeBidang+"' and 
			this.dbLib.getMultiDataProviderA(sql);			
			
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_kb_fSpbVer.extend(window.childForm);
window.app_saku3_transaksi_kb_fSpbVer.implement({	
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
			if ((this.e_modul.getText() == "PJ2" || this.e_modul.getText() == "PJLOG" || this.e_modul.getText() == "IFREIM" || this.e_modul.getText() == "DAKEM") && this.cb_lokbayar.getText() != this.app._lokasi) {
				system.alert(this,"Transaksi tidak valid.","Lokasi bayar harus sama dengan lokasi transaksi.");				
				return false;
			}
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
			var data = this.dbLib.getDataProvider("select no_terima,posted,periode from takkirim_m where no_kirim='"+this.noSPB+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){													
					if (line.posted == "T" || line.no_terima != "-") {						
						system.alert(this,"Transaksi tidak valid.","No TAK sudah diterima / diposting.");
						return false;
					}
					if (parseFloat(line.periode) < parseFloat(this.e_periode.getText())){						
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
						return false;
					}
				}
			}
			
			var data = this.dbLib.getDataProvider("select periode,no_terima from dokkirim_m where no_kirim='"+this.noSPB+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){													
					if (line.no_terima != "-") {						
						system.alert(this,"Transaksi tidak valid.","No Kirim sudah diterima.");
						return false;
					}
					if (parseFloat(line.periode) < parseFloat(this.e_periode.getText())){						
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
						return false;
					}
				}
			}
			if (nilaiToFloat(this.e_total.getText()) <= 0) {				
				system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
				return false;						
			}
			if (nilaiToFloat(this.e_total.getText()) != nilaiToFloat(this.e_totalRek.getText())) {				
				system.alert(this,"Transaksi tidak valid.","Total harus sama dengan Total Rekeningnya.");
				return false;						
			}
			
			if (this.c_status.getText()=="APPROVE") {
				if (this.e_modul.getText() == "PBNONGAR") { 
					this.cb_sah.setTag("9");
					this.cb_fiat.setTag("9");
					this.cb_bdh.setTag("9");					
					this.cb_akun.setTag("9");					
					this.sg3.setTag("9");					
				}
				else {
					if (this.cb_lokbayar.getText() == this.app._lokasi) {
						this.cb_sah.setTag("2");
						this.cb_fiat.setTag("2");
						this.cb_bdh.setTag("2");					
						this.cb_akun.setTag("9");					
						this.sg3.setTag("2");
					} 
					else {
						this.cb_sah.setTag("2");
						this.cb_fiat.setTag("2");
						this.cb_bdh.setTag("2");					
						this.cb_akun.setTag("2");					
						this.sg3.setTag("2");
						//--
						
						
					}
				}
			}
			else {
				this.cb_sah.setTag("9");
				this.cb_fiat.setTag("9");
				this.cb_bdh.setTag("9");					
				this.cb_akun.setTag("9");					
				this.sg3.setTag("9");
			}
			
				
				
			this.doClick();			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.c_status.getText()=="APPROVE") { 
						if (this.e_modul.getText() == "PBGAR" || this.e_modul.getText() == "PBNONGAR" || this.e_modul.getText() == "PBTAK" || 
						    this.e_modul.getText() == "PBADK" || this.e_modul.getText() == "PBDOK" || this.e_modul.getText() == "PBAKRU"   || this.e_modul.getText() == "PJ2" || this.e_modul.getText() == "PJLOG" ||
							this.e_modul.getText() == "IFREIM" || this.e_modul.getText() == "DAKEM") var prog = "2";												
					} 				
					if (this.c_status.getText()=="REVISI")  {
						if (this.e_modul.getText() == "PBGAR" || this.e_modul.getText() == "PBNONGAR" || this.e_modul.getText() == "PBTAK" || 
						    this.e_modul.getText() == "PBADK" || this.e_modul.getText() == "PBDOK" || this.e_modul.getText() == "PBAKRU"   || this.e_modul.getText() == "PJ2" || this.e_modul.getText() == "PJLOG" ||
							this.e_modul.getText() == "IFREIM" || this.e_modul.getText() == "DAKEM") var prog = "V";												
					}					 					
					
					if (this.e_modul.getText() == "PBGAR" || this.e_modul.getText() == "PBNONGAR" || this.e_modul.getText() == "PBTAK" || 
					     this.e_modul.getText() == "PBADK" || this.e_modul.getText() == "PBDOK" || this.e_modul.getText() == "PBAKRU" || this.e_modul.getText() == "PJ2" || this.e_modul.getText() == "PJLOG" ||
						this.e_modul.getText() == "IFREIM" || this.e_modul.getText() == "DAKEM") {
						
						sql.add("delete from spb_m where no_spb='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_j where no_spb='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_d where no_spb='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");								
						
						sql.add("delete from takkirim_m where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from takkirim_j where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_takkirim_d where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");								
						
						sql.add("delete from dokkirim_m where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from dokkirim_d where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");								
									
						
						if (this.cb_lokbayar.getText() == this.app._lokasi) {
							if (this.noSPB == "-") this.e_nb2.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spb_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","0000"));									
							else {
								this.e_nb2.setText(this.noSPB);								
							}
						}
						else {
							if (this.e_modul.getText() != "PBNONGAR") {
								if (this.noSPB == "-") this.e_nb2.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takkirim_m","no_kirim",this.app._lokasi+"-TK"+this.e_periode.getText().substr(2,4)+".","0000"));									
								else {
									this.e_nb2.setText(this.noSPB);
									sql.add("delete from takkirim_m where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
									sql.add("delete from takkirim_j where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
									sql.add("delete from yk_takkirim_d where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");								
								}
							}
							else {
								if (this.noSPB == "-") this.e_nb2.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dokkirim_m","no_kirim",this.app._lokasi+"-DK"+this.e_periode.getText().substr(2,4)+".","0000"));									
								else {
									this.e_nb2.setText(this.noSPB);
									sql.add("delete from dokkirim_m where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
									sql.add("delete from dokkirim_d where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");								
								}
								
							}
						}						
						
						if (this.e_modul.getText().substr(0,2) == "PB") {
							sql.add("update yk_pb_m set progress='"+prog+"',no_ver='"+this.e_nb.getText()+"',no_spb='"+this.e_nb2.getText()+"',kode_loktuj='"+this.cb_lokbayar.getText()+"' where no_pb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							var modulSPB = this.e_modul.getText()+"_SPB";
						}
						if (this.e_modul.getText() == "PJ2" || this.e_modul.getText() == "PJLOG") {
							sql.add("update panjar2_m set progress='"+prog+"',no_ver='"+this.e_nb.getText()+"',no_spb='"+this.e_nb2.getText()+"' where no_panjar='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							var modulSPB = this.e_modul.getText()+"_SPB";
						}
						if (this.e_modul.getText() == "IFREIM") {
							sql.add("update if_reim_m set progress='"+prog+"',no_ver='"+this.e_nb.getText()+"',no_spb='"+this.e_nb2.getText()+"' where no_reim='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							var modulSPB = this.e_modul.getText()+"_SPB";
						}
						if (this.e_modul.getText() == "DAKEM") {
							sql.add("update yk_dakem_m set progress='"+prog+"',no_ver='"+this.e_nb.getText()+"',no_spb='"+this.e_nb2.getText()+"' where no_dakem='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							var modulSPB = this.e_modul.getText()+"_SPB";
						}						
					}
					sql.add("update a set no_appseb ='"+this.e_nb.getText()+"' "+
							"from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_appseb='-' "+
							"where b.no_bukti ='"+this.e_nobukti.getText()+"' and b.modul='"+modulSPB+"' and b.kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','"+modulSPB+"','-')");
					sql.add("insert into app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
							"('"+this.e_nb.getText()+"','"+prog+"','"+modulSPB+"','"+this.e_nobukti.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");
															
					var duedate = this.e_duedate.getText().substr(6,4)+"-"+this.e_duedate.getText().substr(3,2)+"-"+this.e_duedate.getText().substr(0,2);
					if (this.c_status.getText()=="APPROVE") { 
						if (this.cb_lokbayar.getText() == this.app._lokasi) {																					
							sql.add("insert into spb_m(no_spb,no_ver,no_bukti,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nik_buat,nik_sah,nik_fiat,nik_bdh,lok_bayar,no_fiat,no_kas,nilai,modul,progress,kode_ppasal) values "+
									"('"+this.e_nb2.getText()+"','"+this.e_nb.getText()+"','"+this.e_nobukti.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+duedate+"','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.cb_sah.getText()+"','"+this.cb_fiat.getText()+"','"+this.cb_bdh.getText()+"','"+this.cb_lokbayar.getText()+"','-','-',"+nilaiToFloat(this.e_total.getText())+",'"+modulSPB+"','0','"+this.kodePPasal+"')");
							if (this.sg1.getRowValidCount() > 0){
								for (var i=0;i < this.sg1.getRowCount();i++){
									if (this.sg1.rowValid(i)){
										sql.add("insert into spb_d(no_spb,kode_lokasi,kode_vendor,bank,cabang,no_rek,nama_rek,nilai,pajak,keterangan,kode_lokvendor) values "+
												"('"+this.e_nb2.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(5,i)+"',"+nilaiToFloat(this.sg1.cells(6,i))+","+nilaiToFloat(this.sg1.cells(7,i))+",'"+this.sg1.cells(8,i)+"','"+this.kodeLokAsal+"')");
									}
								}
							}						
							if (this.sg3.getRowValidCount() > 0){
								for (var i=0;i < this.sg3.getRowCount();i++){
									if (this.sg3.rowValid(i)){
										sql.add("insert into spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
												"('"+this.e_nb2.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg3.cells(0,i)+"','"+this.sg3.cells(3,i)+"','"+this.sg3.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg3.cells(4,i))+",'"+this.sg3.cells(5,i)+"','"+this.sg3.cells(7,i)+"','"+this.app._lokasi+"','SPB','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
									}
								}
							}
							if (this.sgv.getRowValidCount() > 0){
								for (var i=0;i < this.sgv.getRowCount();i++){
									if (this.sgv.rowValid(i)){
										sql.add("insert into spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
												"('"+this.e_nb2.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sgv.cells(0,i)+"','"+this.sgv.cells(3,i)+"','"+this.sgv.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sgv.cells(4,i))+",'"+this.sgv.cells(5,i)+"','"+this.sgv.cells(7,i)+"','"+this.app._lokasi+"','SPB','VER','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
									}
								}
							}														
						}
						if (this.cb_lokbayar.getText() != this.app._lokasi) {
							if (this.e_modul.getText() != "PBNONGAR") {																
								sql.add("insert into takkirim_m(no_kirim,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user,kode_loktuj,progress,no_terima,due_date) values "+
										"('"+this.e_nb2.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','TAKSPB','KIRIM','IDR',1,"+nilaiToFloat(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','F','-','-','"+this.e_nb.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_lokbayar.getText()+"','0','-','"+duedate+"')");
													
								if (this.sg1.getRowValidCount() > 0){
									for (var i=0;i < this.sg1.getRowCount();i++){
										if (this.sg1.rowValid(i)){										
											sql.add("insert into yk_takkirim_d(no_kirim,kode_lokasi,no_kas,kode_lokkas,keterangan,no_rek,nama_rek,bank,cabang,nilai,pajak,jenis,kode_vendor,akun_tak) values "+
													"('"+this.e_nb2.getText()+"','"+this.app._lokasi+"','-','"+this.cb_lokbayar.getText()+"','"+this.sg1.cells(8,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"',"+nilaiToFloat(this.sg1.cells(6,i))+","+nilaiToFloat(this.sg1.cells(7,i))+",'-','"+this.sg1.cells(0,i)+"','"+this.cb_akun.getText()+"')");
										}
									}
								}
								if (this.sg3.getRowValidCount() > 0){
									for (var i=0;i < this.sg3.getRowCount();i++){
										if (this.sg3.rowValid(i)){															           
											sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
													"('"+this.e_nb2.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg3.cells(0,i)+"','"+this.sg3.cells(3,i)+"','"+this.sg3.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg3.cells(4,i))+",'"+this.sg3.cells(5,i)+"','"+this.sg3.cells(7,i)+"','"+this.app._lokasi+"','TAKSPB','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
										}
									}
								}
								if (this.sgv.getRowValidCount() > 0){
									for (var i=0;i < this.sgv.getRowCount();i++){
										if (this.sgv.rowValid(i)){
											sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
													"('"+this.e_nb2.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sgv.cells(0,i)+"','"+this.sgv.cells(3,i)+"','"+this.sgv.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sgv.cells(4,i))+",'"+this.sgv.cells(5,i)+"','"+this.sgv.cells(7,i)+"','"+this.app._lokasi+"','TAKSPB','VER','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");										
										}
									}
								}
								sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb2.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','TAKSPB','TAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
							}
							if (this.e_modul.getText() == "PBNONGAR") {																
								sql.add("insert into dokkirim_m(no_kirim,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,ref1,tgl_input,nik_user,kode_loktuj,kode_bidang,progress,no_terima,due_date) values "+		
										"('"+this.e_nb2.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','PBNONGAR','KIRIM','IDR',1,"+nilaiToFloat(this.e_totalRek.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','"+this.e_nobukti.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_lokbayar.getText()+"','"+this.kodeBidangTuj+"','0','-','"+duedate+"')");
								if (this.sg1.getRowValidCount() > 0){
									for (var i=0;i < this.sg1.getRowCount();i++){
										if (this.sg1.rowValid(i)){										
											sql.add("insert into dokkirim_d(no_kirim,kode_lokasi,kode_loktuj,keterangan,no_rek,nama_rek,bank,cabang,nilai,pajak,jenis,kode_vendor) values "+
													"('"+this.e_nb2.getText()+"','"+this.app._lokasi+"','"+this.cb_lokbayar.getText()+"','"+this.sg1.cells(8,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"',"+nilaiToFloat(this.sg1.cells(6,i))+","+nilaiToFloat(this.sg1.cells(7,i))+",'-','"+this.sg1.cells(0,i)+"')");
										}
									}
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
					this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sgv.clear(1); 
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																				
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
				var data = this.dbLib.getDataProvider("select no_terima,posted from takkirim_m where no_kirim='"+this.noSPB+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						if (line.posted == "T" || line.no_terima != "-") {
							system.alert(this,"Transaksi tidak valid.","No TAK sudah diterima / diposting.");
							return false;
						}
						else {
							if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
								system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
								return false;
							}
						}
					}
				}
				var data = this.dbLib.getDataProvider("select periode,no_terima from dokkirim_m where no_kirim='"+this.noSPB+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						if (line.no_terima != "-") {
							system.alert(this,"Transaksi tidak valid.","No Kirim sudah diterima.");
							return false;
						}
						if (parseFloat(line.periode) < parseFloat(this.e_periode.getText())){
							system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
							return false;
						}
					}
				}
				var sql = new server_util_arrayList();				
				
				sql.add("update yk_pb_m set progress='1',no_ver='-',no_spb='-',kode_loktuj='"+this.app._lokasi+"' where no_pb='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				sql.add("update panjar2_m set progress='1',no_ver='-',no_spb='-' where no_panjar='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				sql.add("update if_reim_m set progress='1',no_ver='-',no_spb='-' where no_reim='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				sql.add("update yk_dakem_m set progress='1',no_ver='-',no_spb='-' where no_dakem='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				sql.add("update yk_kasaju_m set progress='1',no_ver='-',no_spb='-' where no_kasaju='"+this.e_nobukti.getText()+"' and kode_lokbayar='"+this.app._lokasi+"'");				
				
				sql.add("delete from spb_m where no_spb='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from spb_j where no_spb='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from spb_d where no_spb='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");								
				sql.add("delete from takkirim_m where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from takkirim_j where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from yk_takkirim_d where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");								
				sql.add("delete from dokkirim_m where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from dokkirim_d where no_kirim='"+this.noSPB+"' and kode_lokasi='"+this.app._lokasi+"'");								
				
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
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.doClick();
		this.doLoad();
	},	
	doChange:function(sender){		
		if ((sender == this.c_status || sender == this.cb_lokbayar) && this.c_status.getText()!="" && this.cb_lokbayar.getText()!="") {
			if (this.c_status.getText() == "APPROVE") {
				if (this.cb_lokbayar.getText() == this.app._lokasi) {					
					if (this.noSPB == "-") this.e_nb2.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spb_m","no_spb",this.app._lokasi+"-SPB"+this.e_periode.getText().substr(2,4)+".","0000"));																						
					else this.e_nb2.setText(this.noSPB);
				}
				else {
					if (this.e_modul.getText() != "PBNONGAR") this.e_nb2.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takkirim_m","no_kirim",this.app._lokasi+"-TK"+this.e_periode.getText().substr(2,4)+".","0000"));		
					else this.e_nb2.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dokkirim_m","no_kirim",this.app._lokasi+"-DK"+this.e_periode.getText().substr(2,4)+".","0000"));		
				}
			}
			else this.e_nb2.setText("-");
		}
		if ((sender == this.e_nilai || sender == this.e_nilaiVer) && this.e_nilai.getText()!="" && this.e_nilaiVer.getText()!="") {			
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_nilaiVer.getText())));
		}
		if (sender == this.e_modul && this.e_modul.getText()!="") {
			if (this.e_modul.getText() != "PBNONGAR") {
				this.cb_lokbayar.setSQL("select kode_lokasi, nama from lokasi where flag_pusat='1' union select kode_lokasi,nama from lokasi where kode_lokasi='"+this.app._lokasi+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi Bayar",true);			
				this.cb_sah.setReadOnly(false);
				this.cb_fiat.setReadOnly(false);
				this.cb_bdh.setReadOnly(false);
				this.cb_akun.setReadOnly(false);				
			}
			else {
				this.cb_lokbayar.setSQL("select kode_lokasi, nama from lokasi where flag_pusat='1'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi Bayar",true);			
				this.cb_lokbayar.setText(this.lokasiPusat);								
				this.cb_sah.setReadOnly(true);
				this.cb_fiat.setReadOnly(true);
				this.cb_bdh.setReadOnly(true);
				this.cb_akun.setReadOnly(true);				
			}
		}
	},
	doClick:function(sender){
		if (this.e_nobukti.getText()!="") {						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"app_m","no_app",this.app._lokasi+"-VER"+this.e_periode.getText().substr(2,4)+".","0000"));												
			this.c_status.setFocus();						
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.e_modul.setText(this.sg.cells(0,row));
				this.e_nobukti.setText(this.sg.cells(1,row));								
				this.e_tgl.setText(this.sg.cells(3,row));
				this.e_duedate.setText(this.sg.cells(4,row));
				this.e_pp.setText(this.sg.cells(5,row));
				this.e_dok.setText(this.sg.cells(6,row));
				this.e_ket.setText(this.sg.cells(7,row));
				this.e_nilai.setText(this.sg.cells(8,row));
				this.e_buat.setText(this.sg.cells(9,row));										
				this.noSPB = this.sg.cells(10,row);						
				this.stsProg = this.sg.cells(2,row);
				this.kodeLokAsal = this.sg.cells(11,row);
				this.kodePPasal = this.sg.cells(13,row);
				this.e_nb2.setText(this.noSPB);					
				
				this.doClick();								
				if (this.stsProg == "APPROVE" || this.stsProg == "REVISI") setTipeButton(tbUbahHapus);									
				else setTipeButton(tbSimpan);					
				
				if (this.e_modul.getText() != "PBNONGAR") this.doFiat();																
							
				if (this.e_modul.getText() == "PBTAK" || this.e_modul.getText() == "PBDOK") {
					if (this.e_modul.getText() == "PBTAK") var strLokAsal = "select kode_lokasi from takkirim_m where no_terima='"+this.e_nobukti.getText()+"' and kode_loktuj='"+this.app._lokasi+"'";
					else var strLokAsal = "select kode_lokasi from dokkirim_m where no_terima='"+this.e_nobukti.getText()+"' and kode_loktuj='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strLokAsal,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){													
							this.kodeLokAsal = line.kode_lokasi;
						}
					}				
				}
												
				var strSQL2 = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
							  "from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							  "              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							  "              left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode1,1,4) "+
							  "where a.no_bukti = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_akun";
				
				if (this.e_modul.getText().substr(0,2) == "PB") {
					var strSQL4 = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
								  "from yk_pb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								  "               inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													
								  "               left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+													
								  "where a.jenis in ('BEBAN','TAMBAH') and a.no_pb = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut";
				}				  
				if (this.e_modul.getText() == "PJ2" || this.e_modul.getText() == "PJLOG") {
					var strSQL4 = "select b.kode_akun,b.nama as nama_akun,'D' as dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,'-' as kode_drk,'-' as nama_drk "+
								  "from panjar2_m a inner join masakun b on a.akun_panjar=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								  "                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+																					  
								  "where a.no_panjar = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				}
				if (this.e_modul.getText() == "IFREIM") {
					var strSQL4 = "select b.kode_akun,b.nama as nama_akun,'D' as dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,'-' as kode_drk,'-' as nama_drk "+
								  "from if_reim_m a inner join masakun b on a.akun_hutang=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								  "                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+																					  
								  "where a.no_reim = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				}
				if (this.e_modul.getText() == "DAKEM") {
					var strSQL4 = "select b.kode_akun,b.nama as nama_akun,'D' as dc,a.keterangan,x.nominal as nilai,a.kode_pp,c.nama as nama_pp,'-' as kode_drk,'-' as nama_drk "+
								  "from yk_dakem_m a inner join masakun b on a.akun_dakem=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								  "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+																					  
								  "                  inner join yk_dakem_d x on a.no_dakem=x.kdtrans and a.kode_lokasi=x.kode_lokasi "+
								  "where a.no_dakem = '"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";					
				}
//----------------------------------------				
				if (this.stsProg == "INPROG") {
					if (this.e_modul.getText().substr(0,2) == "PB") {
						var strSQL  = "select a.nik_app+' - '+b.nama as nik_app,a.kode_pp,c.catatan,a.kode_bidang+' - '+f.nama as bidang,a.kode_bidang,'' as catat_verseb,a.kode_loktuj "+
									  "from yk_pb_m a inner join karyawan b on a.nik_app=b.nik "+
									  "               inner join app_d c on a.no_app=c.no_app and a.kode_lokasi=c.kode_lokasi "+
									  "               inner join app_m d on c.no_app=d.no_app and c.kode_lokasi=d.kode_lokasi and d.no_appseb='-' and c.status='1' "+
									  "               inner join bidang f on a.kode_bidang=f.kode_bidang "+
									  "where a.no_pb='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
						var strSQL3 = "select a.kode_vendor,b.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai,a.pajak,a.keterangan "+
									  "from yk_pb_d a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokvendor=b.kode_lokasi "+
									  "where a.no_pb='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
					}					
					if (this.e_modul.getText() == "PJ2" || this.e_modul.getText() == "PJLOG") {
						var strSQL  = "select a.nik_setuju+' - '+b.nama as nik_app,a.kode_pp,c.catatan,f.kode_bidang+' - '+f.nama as bidang,f.kode_bidang,'' as catat_verseb,a.kode_lokasi as kode_loktuj  "+
									  "from panjar2_m a inner join karyawan b on a.nik_setuju=b.nik "+
								   	  "				    inner join app_d c on a.no_app=c.no_app and a.kode_lokasi=c.kode_lokasi "+
									  "				    inner join app_m d on c.no_app=d.no_app and c.kode_lokasi=d.kode_lokasi and d.no_appseb='-' and c.status='1' "+
									  "				    inner join pp g on a.kode_pp=g.kode_pp  and a.kode_lokasi=g.kode_lokasi "+
									  "				    inner join bidang f on g.kode_bidang=f.kode_bidang "+
									  "where a.no_panjar='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"; 
						var strSQL3 = "select a.nik as kode_vendor,a.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,b.nilai,0 as pajak,b.keterangan "+
									  "from karyawan a inner join panjar2_m b on a.nik=b.nik_buat and a.kode_lokasi=b.kode_lokasi "+
									  "where b.no_panjar='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";															  
					}
					if (this.e_modul.getText() == "IFREIM") {
						var strSQL  = "select a.nik_buat+' - '+b.nama as nik_app,a.kode_pp,'-' as catatan,f.kode_bidang+' - '+f.nama as bidang,f.kode_bidang,'' as catat_verseb,a.kode_lokasi as kode_loktuj  "+
									  "from if_reim_m a inner join karyawan b on a.nik_buat=b.nik "+								   	  
									  "				    inner join pp g on a.kode_pp=g.kode_pp  and a.kode_lokasi=g.kode_lokasi "+
									  "				    inner join bidang f on g.kode_bidang=f.kode_bidang "+
									  "where a.no_reim='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"; 
						var strSQL3 = "select a.nik as kode_vendor,a.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,b.nilai,0 as pajak,b.keterangan "+
									  "from karyawan a inner join if_reim_m b on a.nik=b.nik_buat and a.kode_lokasi=b.kode_lokasi "+
									  "where b.no_reim='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";															  
					}
					if (this.e_modul.getText() == "DAKEM") {
						var strSQL  = "select a.nik_buat+' - '+b.nama as nik_app,a.kode_pp,'-' as catatan,f.kode_bidang+' - '+f.nama as bidang,f.kode_bidang,'' as catat_verseb,a.kode_lokasi as kode_loktuj  "+
									  "from yk_dakem_m a inner join karyawan b on a.nik_buat=b.nik "+								   	  
									  "			  	     inner join pp g on a.kode_pp=g.kode_pp  and a.kode_lokasi=g.kode_lokasi "+
									  "				     inner join bidang f on g.kode_bidang=f.kode_bidang "+									  
									  "where a.no_dakem='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'"; 
						var strSQL3 = "select '-' as kode_vendor,a.aw as nama,a.bank,a.cabang,a.no_rek,a.nama_rek,x.nominal as nilai,a.keterangan "+
									  "from yk_dakem_m a inner join yk_dakem_d x on a.no_dakem=x.kdtrans and a.kode_lokasi=x.kode_lokasi "+
									  "where a.no_dakem='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";															  						
					}					
				}
//---------------------------------------------
				if (this.stsProg == "APPROVE" || this.stsProg == "REVISI") {
					if (this.e_modul.getText().substr(0,2) == "PB") {
						var strSQL  = "select a.nik_app+' - '+b.nama as nik_app,a.kode_pp,c.catatan,a.kode_bidang+' - '+f.nama as bidang,a.kode_bidang,cc.catatan as catat_verseb,a.kode_loktuj "+
									  "from yk_pb_m a inner join karyawan b on a.nik_app=b.nik "+
									  "               inner join app_d c on a.no_app=c.no_app and a.kode_lokasi=c.kode_lokasi "+
									  "               inner join app_m d on c.no_app=d.no_app and c.kode_lokasi=d.kode_lokasi and d.no_appseb='-' and c.status='1' "+
									  "               inner join bidang f on a.kode_bidang=f.kode_bidang "+
									  "               inner join app_d cc on a.no_ver=cc.no_app and a.kode_lokasi=cc.kode_lokasi "+
									  "               inner join app_m dd on cc.no_app=dd.no_app and cc.kode_lokasi=dd.kode_lokasi and dd.no_appseb='-' "+
									  "where a.no_pb='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
						
						var strSQL3 = "select a.kode_vendor,b.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai,a.pajak,a.keterangan "+
									  "from spb_d a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokvendor=b.kode_lokasi "+
									  "where a.no_spb='"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									  "union "+
									  "select a.kode_vendor,b.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai,a.pajak,a.keterangan "+
									  "from yk_takkirim_d a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
									  "where a.no_kirim='"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									  "union "+
									  "select a.kode_vendor,b.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai,a.pajak,a.keterangan "+
									  "from dokkirim_d a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
									  "where a.no_kirim='"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
					}
					if (this.e_modul.getText() == "PJ2" || this.e_modul.getText() == "PJLOG") {
						var strSQL  = "select a.nik_setuju+' - '+b.nama as nik_app,a.kode_pp,c.catatan,f.kode_bidang+' - '+f.nama as bidang,f.kode_bidang,cc.catatan as catat_verseb,a.kode_lokasi as kode_loktuj "+
									  "from panjar2_m a inner join karyawan b on a.nik_setuju=b.nik "+
									  "                 inner join app_d c on a.no_app=c.no_app and a.kode_lokasi=c.kode_lokasi "+
									  "                 inner join app_m d on c.no_app=d.no_app and c.kode_lokasi=d.kode_lokasi and d.no_appseb='-' and c.status='1' "+
									  "                 inner join pp g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi "+
									  "                 inner join bidang f on g.kode_bidang=f.kode_bidang "+
									  "                 inner join app_d cc on a.no_ver=cc.no_app and a.kode_lokasi=cc.kode_lokasi "+
									  "                 inner join app_m dd on cc.no_app=dd.no_app and cc.kode_lokasi=dd.kode_lokasi and dd.no_appseb='-' "+
									  "where a.no_panjar='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
									  
						var strSQL3 = "select a.kode_vendor,b.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai,a.pajak,a.keterangan "+
									  "from spb_d a inner join karyawan b on a.kode_vendor=b.nik and a.kode_lokvendor=b.kode_lokasi "+
									  "where a.no_spb='"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"' ";						
					}
					if (this.e_modul.getText() == "IFREIM") {
						var strSQL  = "select a.nik_buat+' - '+b.nama as nik_app,a.kode_pp,'-' as catatan,f.kode_bidang+' - '+f.nama as bidang,f.kode_bidang,cc.catatan as catat_verseb,a.kode_lokasi as kode_loktuj "+
									  "from if_reim_m a inner join karyawan b on a.nik_buat=b.nik "+									  
									  "                 inner join pp g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi "+
									  "                 inner join bidang f on g.kode_bidang=f.kode_bidang "+
									  "                 inner join app_d cc on a.no_ver=cc.no_app and a.kode_lokasi=cc.kode_lokasi "+
									  "                 inner join app_m dd on cc.no_app=dd.no_app and cc.kode_lokasi=dd.kode_lokasi and dd.no_appseb='-' "+
									  "where a.no_reim='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
									  
						var strSQL3 = "select a.kode_vendor,b.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai,a.pajak,a.keterangan "+
									  "from spb_d a inner join karyawan b on a.kode_vendor=b.nik and a.kode_lokvendor=b.kode_lokasi "+
									  "where a.no_spb='"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"' ";						
					}
					if (this.e_modul.getText() == "DAKEM") {
						var strSQL  = "select a.nik_buat+' - '+b.nama as nik_app,a.kode_pp,'-' as catatan,f.kode_bidang+' - '+f.nama as bidang,f.kode_bidang,cc.catatan as catat_verseb,a.kode_lokasi as kode_loktuj "+
									  "from yk_dakem_m a inner join karyawan b on a.nik_buat=b.nik "+									  
									  "                  inner join pp g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi "+
									  "                  inner join bidang f on g.kode_bidang=f.kode_bidang "+
									  "                  inner join app_d cc on a.no_ver=cc.no_app and a.kode_lokasi=cc.kode_lokasi "+
									  "                  inner join app_m dd on cc.no_app=dd.no_app and cc.kode_lokasi=dd.kode_lokasi and dd.no_appseb='-' "+									  
									  "where a.no_dakem='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
									  
						var strSQL3 = "select '-' as kode_vendor,b.aw as nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai,a.pajak,b.keterangan "+
									  "from spb_d a "+
									  "              inner join yk_dakem_m b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi "+														  									  
									  "where a.no_spb='"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"' ";												
					}										
					var strSQL5 = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
								  "from spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								  "             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													
								  "             left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+													
								  "where a.jenis='VER' and a.no_spb = '"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
								  "union "+
								  "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
								  "from takkirim_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								  "                  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													
								  "                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+													
								  "where a.jenis='VER' and a.no_kirim = '"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"' ";					
					var data = this.dbLib.getDataProvider(strSQL5,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sgv.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];																				
							this.sgv.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
						}
					} else this.sgv.clear(1);							
					this.sgv.validasi();
				}
				
				if (this.stsProg == "FIAT") {
					if (this.e_modul.getText().substr(0,2) == "PB") {
						var strSQL  = "select a.nik_app+' - '+b.nama as nik_app,a.kode_pp,c.catatan,a.kode_bidang+' - '+f.nama as bidang,a.kode_bidang,'' as catat_verseb,a.kode_loktuj "+
									  "from yk_pb_m a inner join karyawan b on a.nik_app=b.nik "+
									  "               inner join spb_m e on a.no_spb=e.no_spb and a.kode_lokasi=e.kode_lokasi "+
									  "               inner join app_d c on c.no_app=e.no_fiat and e.kode_lokasi=c.kode_lokasi "+
									  "               inner join app_m d on c.no_app=d.no_app and c.kode_lokasi=d.kode_lokasi and d.no_appseb='-' "+
									  "               inner join bidang f on a.kode_bidang=f.kode_bidang "+
									  "where e.no_spb='"+this.noSPB+"' and e.kode_lokasi='"+this.app._lokasi+"'";
						var strSQL3 = "select a.kode_vendor,b.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai,0 as pajak,a.keterangan "+
									  "from spb_d a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokvendor=b.kode_lokasi "+
									  "where a.no_spb='"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					}
					if (this.e_modul.getText() == "PJ2" || this.e_modul.getText() == "PJLOG") {
						var strSQL  = "select a.nik_setuju+' - '+b.nama as nik_app,a.kode_pp,c.catatan,f.kode_bidang+' - '+f.nama as bidang,f.kode_bidang,'' as catat_verseb,a.kode_lokasi as kode_loktuj "+
									  "from panjar2_m a inner join karyawan b on a.nik_setuju=b.nik "+
									  "                 inner join spb_m e on a.no_spb=e.no_spb and a.kode_lokasi=e.kode_lokasi "+
									  "                 inner join app_d c on c.no_app=e.no_fiat and e.kode_lokasi=c.kode_lokasi "+
									  "                 inner join app_m d on c.no_app=d.no_app and c.kode_lokasi=d.kode_lokasi and d.no_appseb='-' "+
									  "                 inner join pp g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi "+
									  "                 inner join bidang f on g.kode_bidang=f.kode_bidang "+									  
									  "where e.no_spb='"+this.noSPB+"' and e.kode_lokasi='"+this.app._lokasi+"'";
						
						var strSQL3 = "select a.kode_vendor,b.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai,0 as pajak,a.keterangan "+
									  "from spb_d a inner join karyawan b on a.kode_vendor=b.nik and a.kode_lokvendor=b.kode_lokasi "+
									  "where a.no_spb='"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					}
					if (this.e_modul.getText() == "IFREIM") {
						var strSQL  = "select a.nik_buat+' - '+b.nama as nik_app,a.kode_pp,'-' as catatan,f.kode_bidang+' - '+f.nama as bidang,f.kode_bidang,'' as catat_verseb,a.kode_lokasi as kode_loktuj "+
									  "from if_reim_m a inner join karyawan b on a.nik_buat=b.nik "+
									  "                 inner join spb_m e on a.no_spb=e.no_spb and a.kode_lokasi=e.kode_lokasi "+
									  "                 inner join pp g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi "+
									  "                 inner join bidang f on g.kode_bidang=f.kode_bidang "+									  
									  "where e.no_spb='"+this.noSPB+"' and e.kode_lokasi='"+this.app._lokasi+"'";
						
						var strSQL3 = "select a.kode_vendor,b.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai,0 as pajak,a.keterangan "+
									  "from spb_d a inner join karyawan b on a.kode_vendor=b.nik and a.kode_lokvendor=b.kode_lokasi "+
									  "where a.no_spb='"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					}
					if (this.e_modul.getText() == "DAKEM") {
						var strSQL  = "select a.nik_buat+' - '+b.nama as nik_app,a.kode_pp,'-' as catatan,f.kode_bidang+' - '+f.nama as bidang,f.kode_bidang,'' as catat_verseb,a.kode_lokasi as kode_loktuj "+
									  "from yk_dakem_m a inner join karyawan b on a.nik_buat=b.nik "+
									  "                  inner join spb_m e on a.no_spb=e.no_spb and a.kode_lokasi=e.kode_lokasi "+
									  "                  inner join pp g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi "+
									  "                  inner join bidang f on g.kode_bidang=f.kode_bidang "+									  
									  "where e.no_spb='"+this.noSPB+"' and e.kode_lokasi='"+this.app._lokasi+"'";
						
						var strSQL3 = "select '-' as kode_vendor,a.nama_rek as nama,a.bank,a.cabang,a.no_rek,a.nama_rek,a.nilai,0 as pajak,a.keterangan "+
									  "from spb_d a "+
									  "where a.no_spb='"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					}					
					var strSQL5 = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
								  "from spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								  "             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+													
								  "             left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+													
								  "where a.jenis='VER' and a.no_spb = '"+this.noSPB+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut";
					var data = this.dbLib.getDataProvider(strSQL5,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sgv.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];																				
							this.sgv.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
						}
					} else this.sgv.clear(1);							
					this.sgv.validasi();
				}						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_bidang.setText(line.bidang);
						this.e_app.setText(line.nik_app);					
						this.e_memo2.setText(line.catatan);							
						this.e_memo.setText(line.catat_verseb);							
						this.kodePPBukti = line.kode_pp;
						this.kodeBidangTuj = line.kode_bidang;
						this.cb_lokbayar.setText(line.kode_loktuj);
					}
				}														
				if (this.e_modul.getText() != "PBNONGAR") {
					var data = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg2.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];													
							this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
						}
					} else this.sg2.clear(1);									
					var nilai = 0;
					var data = this.dbLib.getDataProvider(strSQL4,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg3.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];												
							if (line.dc.toUpperCase()=="D") nilai += parseFloat(line.nilai);
							else nilai -= parseFloat(line.nilai);
							this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
						}
					} else this.sg3.clear(1);							
					this.e_nilai.setText(floatToNilai(nilai));				
				}				
				var data = this.dbLib.getDataProvider(strSQL3,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																		
						this.sg1.appendData([line.kode_vendor,line.nama,line.bank,line.cabang,line.no_rek,line.nama_rek,floatToNilai(line.nilai),floatToNilai(line.pajak),line.keterangan]);
					}
				} else this.sg1.clear(1);											
			}
		} catch(e) {alert(e);}
	},		
	doFiat:function(sender){			
		var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('FIAT1','FIAT2') and "+nilaiToFloat(this.e_nilai.getText())+" between value1 and value2 and kode_lokasi='"+this.app._lokasi+"'",true);
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
		var strSQL = "select a.due_date,a.no_pb as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_spb,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
		             "from yk_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "               inner join karyawan c on a.nik_user=c.nik "+
					 "where a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' "+
					 "union "+
					 "select a.due_date,a.no_panjar as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_spb,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
		             "from panjar2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "                 inner join karyawan c on a.nik_buat=c.nik "+
					 "where a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' "+					 					 					 
					 "union "+
					 "select a.tanggal,a.no_reim as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_spb,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
		             "from if_reim_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "                 inner join karyawan c on a.nik_buat=c.nik "+
					 "where a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='IFREIM' and a.periode<='"+this.e_periode.getText()+"' "+
					 "union "+
					 "select a.tanggal,a.no_dakem as no_bukti,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DAKEM' as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,d.nominal as nilai,c.nik+' - '+c.nama as pembuat,a.no_spb,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
		             "from yk_dakem_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "                  inner join karyawan c on a.nik_buat=c.nik "+
					 "                  inner join yk_dakem_d d on a.no_dakem=d.kdtrans and a.kode_lokasi=d.kode_lokasi "+
					 "where a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' "+					 
					 
					 //--fiat koreksi
					 "union "+
					 "select a.due_date,a.no_pb as no_bukti,'FIAT' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,d.nilai,c.nik+' - '+c.nama as pembuat,a.no_spb,a.kode_lokasi, convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
		             "from yk_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "               inner join karyawan c on a.nik_user=c.nik "+
					 "               inner join spb_m d on d.no_spb=a.no_spb and d.kode_lokasi=a.kode_lokasi and d.progress='K' "+
					 "where a.progress='2' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' "+					 
					 "union "+
					 "select a.due_date,a.no_panjar as no_bukti,'FIAT' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,d.nilai,c.nik+' - '+c.nama as pembuat,a.no_spb,a.kode_lokasi, convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
		             "from panjar2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "                 inner join karyawan c on a.nik_buat=c.nik "+
					 "                 inner join spb_m d on d.no_spb=a.no_spb and d.kode_lokasi=a.kode_lokasi and d.progress='K' "+
					 "where a.progress='2' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' "+					 
					 "union "+
					 "select a.tanggal,a.no_reim as no_bukti,'FIAT' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,d.nilai,c.nik+' - '+c.nama as pembuat,a.no_spb,a.kode_lokasi, convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
		             "from if_reim_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "                 inner join karyawan c on a.nik_buat=c.nik "+
					 "                 inner join spb_m d on d.no_spb=a.no_spb and d.kode_lokasi=a.kode_lokasi and d.progress='K' "+
					 "where a.progress='2' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='IFREIM' and a.periode<='"+this.e_periode.getText()+"' "+					 
					 "union "+
					 "select a.tanggal,a.no_dakem as no_bukti,'FIAT' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DAKEM' as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,d.nilai,c.nik+' - '+c.nama as pembuat,a.no_spb,a.kode_lokasi, convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
		             "from yk_dakem_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "                  inner join karyawan c on a.nik_buat=c.nik "+
					 "                  inner join spb_m d on d.no_spb=a.no_spb and d.kode_lokasi=a.kode_lokasi and d.progress='K' and a.periode<='"+this.e_periode.getText()+"' "+
					 "where a.progress='2' and a.kode_lokasi='"+this.app._lokasi+"' "+					 					 
					 
					 "order by due_date";					 
					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);					
	},				
	doCari:function(sender){						
		var filter = "";
		if (this.c_status2.getText() == "INPROG") filter = " and a.progress = '1' "; 
		if (this.c_status2.getText() == "APPROVE") filter = " and a.progress = '2' "; 
		if (this.c_status2.getText() == "REVISI") filter = " and a.progress = 'V'  "; 					
		if (this.e_ket2.getText()!="") filter = " and a.keterangan like '%"+this.e_ket2.getText()+"%' ";		
		
		if (this.c_status2.getText() == "INPROG" || this.c_status2.getText() == "APPROVE" || this.c_status2.getText() == "REVISI") {
			if (this.c_modul2.getText() == "PB") {
				var strSQL = "select a.no_pb as no_bukti,'"+this.c_status2.getText()+"' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_spb,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from yk_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "               inner join karyawan c on a.nik_user=c.nik "+							 							 
							 "where a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.due_date";							
			}		
			if (this.c_modul2.getText() == "PANJAR") {
				var strSQL = "select a.no_panjar as no_bukti,'"+this.c_status2.getText()+"' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_spb,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from panjar2_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                 inner join karyawan c on a.nik_buat=c.nik "+							 							 
							 "where a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.due_date";							
			}
			if (this.c_modul2.getText() == "IFREIM") {
				var strSQL = "select a.no_reim as no_bukti,'"+this.c_status2.getText()+"' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_spb,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from if_reim_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                 inner join karyawan c on a.nik_buat=c.nik "+							 							 
							 "where a.periode ='"+this.e_periode.getText()+"' and a.modul='IFREIM' and a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.tanggal";							
			}
			if (this.c_modul2.getText() == "DAKEM") {
				var strSQL = "select a.no_dakem as no_bukti,'"+this.c_status2.getText()+"' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.tanggal,103) as tgl2,'DAKEM' as modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,d.nominal as nilai,c.nik+' - '+c.nama as pembuat,a.no_spb,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput,b.kode_pp "+
							 "from yk_dakem_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                  inner join karyawan c on a.nik_buat=c.nik "+							 							 
							 "                  inner join yk_dakem_d d on a.no_dakem=d.kdtrans and a.kode_lokasi=d.kode_lokasi "+
							 "where a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+filter+" order by a.tanggal";							
			}									
		}				
		
		/*
		if (this.c_status2.getText() == "FIAT") {
			if (this.c_modul2.getText() == "PB") {
				var strSQL = "select a.no_pb as no_bukti,'FIAT' as status,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.modul,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' - '+c.nama as pembuat,a.no_spb,a.kode_lokasi,convert(varchar,a.tgl_input,120) as tglinput "+
				"from yk_pb_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
				"               inner join karyawan c on a.nik_user=c.nik "+
				"               inner join spb_m d on d.no_spb=a.no_spb and d.kode_lokasi=a.kode_lokasi and d.progress='K' "+
				"where a.progress in ('2') and a.kode_lokasi='"+this.app._lokasi+"' and a.keterangan like '%"+this.e_ket2.getText()+"%' order by a.due_date";
			}			
		}
		*/
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
			this.sg.appendData([line.modul.toUpperCase(),line.no_bukti,line.status.toUpperCase(),line.tgl,line.tgl2,line.pp,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_spb,line.kode_lokasi,line.tglinput,line.kode_pp]); 
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
									this.nama_report="server_report_saku3_hutang_rptSpbForm";									                  
									this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb2.getText()+"' ";
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();							
							this.dataPP = new portalui_arrayMap();							
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
			this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); this.sgv.clear(1); 
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
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (sender.cells(2,row) == ""){
						sender.setCell(2,row,"C");						
					}
				break;
			case 3 : 
					if (sender.cells(3,row) == ""){
						if (row == 0) sender.setCell(3,row,this.e_ket.getText());
						else sender.setCell(3,row,sender.cells(3,(row-1)) );
					}
				break;			
			case 5 : 
					if (sender.cells(5,row) == "") {
						if (row == 0) sender.setCell(5,row,this.kodePPBukti);
						else {
							sender.setCell(5,row,sender.cells(5,(row-1)));
							sender.setCell(6,row,sender.cells(6,(row-1)));
						}
					}
				break;							
		}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (sender.cells(4,row) != "")) sender.validasi();
		sender.onChange.set(undefined,undefined);	    
		if (this.e_modul.getText()!="PBNONGAR") {
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
				if (sender.cells(7,row) != "") {							
					var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and b.kode_drk = '"+sender.cells(7,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) this.sg1.cells(8,row,line.nama);
						else {						
							sender.cells(7,row,"-");
							sender.cells(8,row,"-");						
						}
					}
				}
			}
		}
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){		
		try{
			var totRek = totVer = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(6,i) != ""){										
					totRek += nilaiToFloat(this.sg1.cells(6,i));					
				}
			}
			if (this.e_modul.getText()!="PBNONGAR") {
				for (var i = 0; i < this.sgv.getRowCount();i++){
					if (this.sgv.rowValid(i) && this.sgv.cells(4,i) != ""){
						if (this.sgv.cells(2,i).toUpperCase() == "D") totVer += nilaiToFloat(this.sgv.cells(4,i));
						if (this.sgv.cells(2,i).toUpperCase() == "C") totVer -= nilaiToFloat(this.sgv.cells(4,i));
					}
				}
			}
			this.e_totalRek.setText(floatToNilai(totRek));
			this.e_nilaiVer.setText(floatToNilai(totVer));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sgv && this.e_modul.getText()!="PBNONGAR") {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '047' "+							
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '047' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'", // and kode_bidang='"+this.app._kodeBidang+"'
							"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'", // and kode_bidang='"+this.app._kodeBidang+"'
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}				
				if (col == 7){					
					var vUnion = "";
					var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+sender.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.status_gar != "1") var vUnion = " union select '-','-' "; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
							"select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' "+vUnion ,
							"select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+sender.cells(0,row)+"' and b.kode_pp = '"+sender.cells(5,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' ",
							["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],false);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
});

