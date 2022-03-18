window.app_saku3_transaksi_investasi_invest2_fVerRD = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_investasi_invest2_fVerRD.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fVerRD";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Pembelian Reksadana", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});			
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,445], childPage:["Daftar Approve","Detail","Cari Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:9,tag:9,
		            colTitle:["Modul","No Bukti","Status","Tgl Settl","Deskripsi","Nilai","Pembuat","No Flag","Tgl Input"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[110,100,100,100,300,100,80,100,80]],					
					colFormat:[[5],[cfNilai]],
					autoPaging:true, rowPerPage:20,
					readOnly:true,dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});
				
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Verifikasi", readOnly:true});								
		this.e_nb2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"SPB", readOnly:true,tag:9});								
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,230,20],caption:"No Bukti", readOnly:true});		
		this.cb_sah = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Disahkan Oleh", multiSelection:false, maxLength:10, tag:2});								
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"Keterangan", readOnly:true});		
		this.cb_fiat = new saiCBBL(this.pc1.childPage[1],{bound:[20,19,220,20],caption:"Difiat Oleh", multiSelection:false, maxLength:10, tag:2});								
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,19,200,20],caption:"Tgl Settlement", readOnly:true});		
		this.cb_bdh = new saiCBBL(this.pc1.childPage[1],{bound:[20,20,220,20],caption:"Bendahara", multiSelection:false, maxLength:10, tag:2});												
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,20,200,20],caption:"Nilai SPB", readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,12,995,295], childPage:["Data Reksadana"]});				
		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:9,tag:0,				
				colTitle:["Kd RD","Nama RD","Harga Beli","Lbr Beli","Nilai Beli","Komisi","VAT","Levi","PPh"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,80,110,60,100,250,80]],
				colFormat:[[2,3,4,5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],								
				readOnly:true, defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1});				
				
		this.c_status2 = new saiCB(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Status",items:["APPROVE","REVISI"], readOnly:true,tag:9}); 
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,450,20],caption:"Deskripsi",tag:9});		
		this.bCari = new button(this.pc1.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
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
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('RDPPHM','BDH1','FIAT1','FIAT2') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];						
					if (line.kode_spro == "FIAT2") this.NIKKabid = line.flag;
					if (line.kode_spro == "FIAT1") this.NIKMan = line.flag;
					if (line.kode_spro == "BDH1") this.cb_bdh.setText(line.flag);				
					if (line.kode_spro == "RDPPHM") this.akunpph = line.flag;				
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_investasi_invest2_fVerRD.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fVerRD.implement({	
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
						sql.add("update inv_rdbeli_m set progress='1',no_spb='-' where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from spb_m where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_j where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spb_d where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
						sql.add("delete from app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from app_d where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					}
										
					sql.add("update inv_rdbeli_m set progress='2',no_spb='"+this.e_nb2.getText()+"' where no_rdbeli='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update a set no_appseb ='"+this.e_nb.getText()+"' "+
							"from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_appseb='-' "+
							"where b.no_bukti ='"+this.e_nobukti.getText()+"' and b.modul='INV_SPB' and b.kode_lokasi='"+this.app._lokasi+"'");					
					
					sql.add("insert into app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'APPROVE','"+this.modul+"','-')");
					sql.add("insert into app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
							"('"+this.e_nb.getText()+"','2','"+this.modul+"','"+this.e_nobukti.getText()+"','"+this.app._lokasi+"','-')");
					
					sql.add("insert into spb_m(no_spb,no_ver,no_bukti,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nik_buat,nik_sah,nik_fiat,nik_bdh,lok_bayar,no_fiat,no_kas,nilai,modul,progress,kode_ppasal) values "+
							"('"+this.e_nb2.getText()+"','"+this.e_nb.getText()+"','"+this.e_nobukti.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.cb_sah.getText()+"','"+this.cb_fiat.getText()+"','"+this.cb_bdh.getText()+"','"+this.app._lokasi+"','-','-',"+nilaiToFloat(this.e_total.getText())+",'"+this.modul+"','0','"+this.app._kodePP+"')");
					
					sql.add("insert into spb_d(no_spb,kode_lokasi,kode_vendor,bank,cabang,no_rek,nama_rek,nilai,keterangan,kode_lokvendor) "+
							"select '"+this.e_nb2.getText()+"','"+this.app._lokasi+"',a.kode_rdkelola,'-','-','-',b.nama,a.nilai,a.keterangan,a.kode_lokasi "+
							"from inv_rdbeli_m a inner join inv_rdkelola b on a.kode_rdkelola=b.kode_rdkelola "+
							"where a.no_rdbeli='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+
							"select '"+this.e_nb2.getText()+"',no_rdbeli,'"+this.dp_d1.getDateString()+"',0,kode_akun,keterangan,'D',nilai,kode_pp,'-',kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
							"from inv_rdbeli_j where jenis='HUT' and no_rdbeli='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into spb_j(no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) "+
							"select '"+this.e_nb2.getText()+"',no_rdbeli,'"+this.dp_d1.getDateString()+"',99,'"+this.akunpph+"',keterangan,'C',nilai_pph,kode_pp,'-',kode_lokasi,'RDBELI','PPH','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1 "+
							"from inv_rdbeli_m where no_rdbeli='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							
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
				sql.add("update inv_rdbeli_m set progress='1',no_spb='-' where no_spb='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
				
				this.e_nobukti.setText(this.sg.cells(1,baris));
				this.e_ket.setText(this.sg.cells(4,baris));
				this.e_tgl.setText(this.sg.cells(3,baris));				
				this.stsProg = this.sg.cells(2,baris);
				this.noSPB = this.sg.cells(7,baris);				
				this.e_total.setText(this.sg.cells(5,baris));				
				this.e_nb2.setText(this.noSPB);									
				this.modul = this.sg.cells(0,baris);				
				
				if (this.stsProg == "APPROVE" || this.stsProg == "REVISI") {					
					var strSQL = "select no_app from app_d where no_bukti ='"+this.e_nobukti.getText()+"'";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object") {
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.e_nb.setText(line.no_app);						
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
												
				if (this.modul == "RDBELI") {
					strSQL1 = "select a.kode_rd,b.nama,a.harga,a.jumlah,a.n_beli,a.komisi,a.vat,a.levi,a.pph "+
							 "from inv_rdbeli_d a inner join inv_rd b on a.kode_rd=b.kode_rd "+					 							 
							 "where a.no_rdbeli='"+this.e_nobukti.getText()+"' ";					
					var data1 = this.dbLib.getDataProvider(strSQL1,true);	
					if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
						var line1;
						this.sg1.clear();
						for (var i in data1.rs.rows){
							line1 = data1.rs.rows[i];																													
							this.sg1.appendData([line1.kode_rd,line1.nama,parseFloat(line1.harga),parseFloat(line1.jumlah),parseFloat(line1.n_beli),parseFloat(line1.komisi),parseFloat(line1.vat),parseFloat(line1.levi),parseFloat(line1.pph)]);
						}
					} else this.sg1.clear(1);									
				}
				
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
		var strSQL = "select a.modul,a.no_rdbeli as no_bukti,'INPROG' as status,convert(varchar,a.tgl_set,103) as tgl,a.keterangan,a.nilai,a.nik_buat+' - '+d.nama as nikuser,a.no_spb as no_flag,a.tgl_input "+
					 "from inv_rdbeli_m a inner join karyawan d on a.nik_buat=d.nik "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress = '1' and a.kode_lokasi ='"+this.app._lokasi+"' and not no_app1 is null order by a.no_rdbeli";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();f
			this.sg.clear();			
			this.page = 1;
			for (var i=0;i<this.dataJU.rs.rows.length;i++){
				var line = this.dataJU.rs.rows[i];																	
				this.sg.appendData([line.modul,line.no_bukti,line.status.toUpperCase(),line.tgl,line.keterangan,floatToNilai(line.nilai),line.nikuser,line.no_flag,line.tgl_input]);
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
		if (this.c_status2.getText() == "APPROVE") filter = " and a.progress = '2' "; 
		if (this.c_status2.getText() == "REVISI") filter = " and a.progress = 'V'  ";
		if (this.e_ket2.getText()!="") filter = " and a.keterangan like '%"+this.e_ket2.getText()+"%' ";		
		
		var strSQL = "select a.modul,a.no_rdbeli as no_bukti,case when a.progress = '2' then 'APPROVE' else 'REVISI' end as status,convert(varchar,a.tgl_set,103) as tgl,a.keterangan,a.nilai,a.nik_buat+' - '+d.nama as nikuser,a.no_spb as no_flag,a.tgl_input "+
					 "from inv_rdbeli_m a inner join karyawan d on a.nik_buat=d.nik "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+filter+" order by a.no_rdbeli";							 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.sg.clear();			
			this.page = 1;
			for (var i=0;i<this.dataJU.rs.rows.length;i++){
				var line = this.dataJU.rs.rows[i];																	
				this.sg.appendData([line.modul,line.no_bukti,line.status.toUpperCase(),line.tgl,line.keterangan,floatToNilai(line.nilai),line.nikuser,line.no_flag,line.tgl_input]);
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

