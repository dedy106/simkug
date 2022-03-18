window.app_saku3_transaksi_yakes21_billkes_fBast = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_billkes_fBast.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_billkes_fBast";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form BAST Tagihan", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode BAST",tag:2, maxLenght:6,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data BAST","List BAST"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:9,
		            colTitle:["No Bukti","Tanggal","Jenis","Periode","Deskripsi","Progress","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,60,300,80,80,80,100]],
					colFormat:[[6],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data BAST",click:[this,"doLoad3"]});								
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});				
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});						
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Disetujui Oleh", multiSelection:false, maxLength:10, tag:2});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,17,200,20],caption:"Total BAST", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,995,313], childPage:["Filter Data","Data Piutang","Detail Billing"]});		
		this.c_periode = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Periode Bill",tag:2, maxLenght:6});
		this.cb_tujuan = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Lok. Tujuan", multiSelection:false, maxLength:10, tag:2});		
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Jenis Bill",items:["PEGAWAI","GROUP"], readOnly:true,tag:2}); 
		this.c_sort = new saiCB(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Sort by",items:["NOBUKTI","LOKER"], readOnly:true,tag:2});		
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Status Data",items:["AKUMULASI","CURRENT"], readOnly:true,tag:2});		
		this.bTampil = new button(this.pc1.childPage[0],{bound:[120,17,98,18],caption:"Tampil Data",click:[this,"doLoad"]});
		this.i_appAll = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,17,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doApp"]});					

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,
				colTitle:["Status","No Piutang","Loker","Periode","Keterangan","Modul","Jenis","Nilai","Detail"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[70,100,60,60,270,80,70,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
				colFormat:[[7,8],[cfNilai,cfButton]],
				click:[this,"doSgBtnClick"], colAlign:[[8],[alCenter]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],checkItem:true,
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],dblClick:[this,"doDoubleClick"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});
		this.i_appAll = new portalui_imageButton(this.sgn,{bound:[970,2,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:16,tag:9,
				colTitle:["Kode Mitra","No Ref","NIK","Nama","Loker","Lok Tagih","Band","NIKKES","Nama Pasien","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Nilai BP","Nilai Kunj","Nilai CS"],
				colWidth:[[15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,100,70,70,70,70,100,70,70,70,100,100,70,100,70]],
				colFormat:[[13,14,15],[cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});				
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
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
			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
			this.cb_tujuan.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi in ('"+this.app._kodeLokasiPusat+"','"+this.app._lokasi+"') ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi Tujuan",true);
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");		

			this.cb_tujuan.setText(this.app._kodeLokasiPusat);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_billkes_fBast.extend(window.childForm);
window.app_saku3_transaksi_yakes21_billkes_fBast.implement({
	doApp: function() {
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i)) 
				this.sg.cells(0,i,"APP");
		}
		this.sg.validasi();
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();															
					if (this.stsSimpan == 0) {
						sql.add("delete from yk_bast_m where no_selesai='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update yk_bill_d set no_selesai='-' where no_selesai='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update yk_billkunj_d set no_selesai='-' where no_selesai='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into yk_bast_m (no_selesai,kode_lokasi,periode,tanggal,no_dokumen,keterangan,nik_buat,nik_app,tgl_input,nik_user,modul,progress,no_kirim,no_terima,nilai,kode_loktuj,kunj,cs) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','"+this.c_jenis.getText()+"','0','-','-',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.cb_tujuan.getText()+"',0,0)");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i)=="APP"){																
								sql.add("update a set a.no_selesai='"+this.e_nb.getText()+"' "+
										"from yk_bill_d a "+
										"where a.no_hutang = '"+this.sg.cells(1,i)+"' and a.loker='"+this.sg.cells(2,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_selesai='-' and a.no_tak='-'");
								
								sql.add("update a set a.no_selesai='"+this.e_nb.getText()+"' "+
										"from yk_billkunj_d a "+
										"where a.no_hutang = '"+this.sg.cells(1,i)+"' and a.loker='"+this.sg.cells(2,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_selesai='-' and a.no_tak='-'");
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
					this.sg1.clear(1);
					this.sg3.clear(1);
					setTipeButton(tbAllFalse);				
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);					
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from yk_bast_m where no_selesai='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("update yk_bill_d set no_selesai='-' where no_selesai='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update yk_billkunj_d set no_selesai='-' where no_selesai='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
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
		this.c_periode.setText(this.e_periode.getText());
		if (this.stsSimpan == 1) this.doClick(this.i_gen);			
	},
	doClick:function(sender){
		try {
			if (sender == this.i_gen) {
				if (this.stsSimpan == 0) {									
					this.sg.clear(1);
					this.sg1.clear(1);
					this.sg3.clear(1);
					this.e_nilai.setText("0");
					this.bTampil.hide();				
					this.i_appAll.hide();
				}								
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_bast_m","no_selesai",this.app._lokasi+"-APIU"+this.e_periode.getText().substr(2,4)+".","0000"));
				this.e_dok.setFocus();
				this.stsSimpan = 1;			
				setTipeButton(tbSimpan);									
			}
			if (sender == this.i_appAll) {
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)) 
						this.sg.cells(0,i,"APP");
				}
				this.sg.validasi();
			}
		}
		catch(e) {
			alert(e);
		}		
	},
	doLoad:function(sender){	
		if (this.e_periode.getText() != "") {					
			if (this.c_status.getText() == "AKUMULASI") {
				//range periode 12 bulan = antisipasi kelewat --> supaya query bisa between dan lebih cepat	
				
				var tahun = this.c_periode.getText().substr(0,4);		
				var bulan = this.c_periode.getText().substr(4,2);		
				if (parseFloat(bulan) > 12) bulan = "12";
				var tglPeriode = tahun +"-"+ bulan +"-01";

				var perAwal=this.dbLib.getPeriodeFromSQL("select substring(convert(varchar,dateadd(month,-12,'"+tglPeriode+"'),112),1,6) as periode");				
				vOperan = " between '"+perAwal+"' and "; 				
			}
			else {
				vOperan = " = ";
			}
			
			if (this.c_sort.getText()=="LOKER") var vSort = "order by a.loker ";
			else var vSort = "order by a.no_hutang ";
			
			if (this.c_jenis.getText()=="GROUP") var vLokasi = " and c.kode_lokasi='"+this.app._lokasi+"' ";
			else var vLokasi = "  ";
			
			this.sg1.clear(1); 			
			if (this.c_jenis.getText() == "GROUP") {
				var strSQL = "select a.no_hutang,a.loker,a.periode,a.keterangan,a.modul,a.jenis,sum(a.nilai) as nilai "+
						   "from ( "+					   
						   
						   //tak terima
						   "select a.no_terima as no_hutang,b.loker,a.periode,a.keterangan,a.modul,'BP' as jenis,sum(b.nilai) as nilai "+
						   "from takterima_m a inner join yk_bill_d b on a.no_terima=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					   
						   "                   inner join yk_loker bb on b.loker=bb.loker "+
						   "                   inner join cust c on bb.kode_cust=c.kode_cust "+vLokasi+
						   "where b.no_tak='-' and b.jenis<>'AKRU' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.c_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'BILTERIMA' "+ 
						   "group by a.no_terima,b.loker,a.periode,a.keterangan,a.modul "+
						   
						   "union all "+
						   "select a.no_terima as no_hutang,b.loker,a.periode,a.keterangan,a.modul,'KJCS' as jenis,case when c.jenis = 'PENSIUN' then 0 else sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) end as nilai "+
						   "from takterima_m a inner join yk_billkunj_d b on a.no_terima=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					   
						   "                   inner join yk_loker bb on b.loker=bb.loker "+
						   "                   inner join cust c on bb.kode_cust=c.kode_cust "+vLokasi+
						   "where b.no_tak='-' and b.jenis<>'AKRU' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.c_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'BILTERIMA' "+ 
						   "group by a.no_terima,b.loker,a.periode,a.keterangan,a.modul,c.jenis "+					   					   
						   
						   //billing hutkes & barev
						   "union all "+						   
						   "select a.no_hutang,b.loker,a.periode,a.keterangan,a.modul,'BP' as jenis,sum(b.nilai) as nilai "+
						   "from yk_hutang_m a inner join yk_bill_d b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
						   "                   inner join yk_loker bb on b.loker=bb.loker "+
						   "                   inner join cust c on bb.kode_cust=c.kode_cust "+vLokasi+
						   "where b.no_tak='-' and b.jenis<>'AKRU' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.c_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('HUTKES','BAREV','REFUND') "+
						   "group by a.no_hutang,b.loker,a.periode,a.keterangan,a.modul "+
						   
						   "union all "+
						   "select a.no_hutang,b.loker,a.periode,a.keterangan,a.modul,'KJCS' as jenis,case when c.jenis = 'PENSIUN' then 0 else sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) end as nilai "+
						   "from yk_hutang_m a inner join yk_billkunj_d b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
						   "                   inner join yk_loker bb on b.loker=bb.loker "+
						   "                   inner join cust c on bb.kode_cust=c.kode_cust "+vLokasi+
						   "where b.no_tak='-' and b.jenis<>'AKRU' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.c_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('HUTKES','PDPT','PDPTREV','BAREV','KAPITASI','REFUND') "+
						   "group by a.no_hutang,b.loker,a.periode,a.keterangan,a.modul,c.jenis "+					   
						   
						   ") a where a.nilai <> 0 group by a.no_hutang,a.loker,a.periode,a.keterangan,a.modul,a.jenis "+
						   " "+vSort;
			}
			else {
				var strSQL = "select a.no_hutang,a.loker,a.periode,a.keterangan,a.modul,a.jenis,sum(a.nilai) as nilai "+
						   "from ( "+					   
						   
						   //tak terima
						   "select a.no_terima as no_hutang,b.loker,a.periode,a.keterangan,a.modul,'BP' as jenis,sum(b.nilai) as nilai "+
						   "from takterima_m a inner join yk_bill_d b on a.no_terima=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					   
						   "                   inner join yk_loker bb on b.loker=bb.loker "+
						   "                   inner join cust c on bb.kode_cust=c.kode_cust "+vLokasi+
						   "where b.jenis<>'AKRU' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.c_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'BILTERIMA' "+ 
						   "group by a.no_terima,b.loker,a.periode,a.keterangan,a.modul "+
						   
						   "union all "+
						   "select a.no_terima as no_hutang,b.loker,a.periode,a.keterangan,a.modul,'KJCS' as jenis,case when c.jenis = 'PENSIUN' then 0 else sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) end as nilai "+
						   "from takterima_m a inner join yk_billkunj_d b on a.no_terima=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					   
						   "                   inner join yk_loker bb on b.loker=bb.loker "+
						   "                   inner join cust c on bb.kode_cust=c.kode_cust "+vLokasi+
						   "where b.jenis<>'AKRU' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.c_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'BILTERIMA' "+ 
						   "group by a.no_terima,b.loker,a.periode,a.keterangan,a.modul,c.jenis "+					   					   
						   
						   //billing hutkes & barev
						   "union all "+						   
						   "select a.no_hutang,b.loker,a.periode,a.keterangan,a.modul,'BP' as jenis,sum(b.nilai) as nilai "+
						   "from yk_hutang_m a inner join yk_bill_d b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
						   "                   inner join yk_loker bb on b.loker=bb.loker "+
						   "                   inner join cust c on bb.kode_cust=c.kode_cust "+vLokasi+
						   "where b.jenis<>'AKRU' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.c_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('HUTKES','BAREV','REFUND') "+
						   "group by a.no_hutang,b.loker,a.periode,a.keterangan,a.modul "+
						   
						   "union all "+
						   "select a.no_hutang,b.loker,a.periode,a.keterangan,a.modul,'KJCS' as jenis,case when c.jenis = 'PENSIUN' then 0 else sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) end as nilai "+
						   "from yk_hutang_m a inner join yk_billkunj_d b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+
						   "                   inner join yk_loker bb on b.loker=bb.loker "+
						   "                   inner join cust c on bb.kode_cust=c.kode_cust "+vLokasi+
						   "where b.jenis<>'AKRU' and b.no_selesai = '-' and c.jenis = '"+this.c_jenis.getText()+"' and a.periode "+vOperan+" '"+this.c_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul in ('HUTKES','PDPT','PDPTREV','BAREV','KAPITASI','REFUND') "+
						   "group by a.no_hutang,b.loker,a.periode,a.keterangan,a.modul,c.jenis "+					   
						   
						   ") a where a.nilai <> 0 group by a.no_hutang,a.loker,a.periode,a.keterangan,a.modul,a.jenis "+
						   " "+vSort;			
			}			
			var data = this.dbLib.getDataProvider(strSQL,true);						  
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_hutang,line.loker,line.periode,line.keterangan,line.modul,line.jenis.toUpperCase(),floatToNilai(line.nilai),"Detail"]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
		else {
			system.alert(this,"Data tidak valid.","Periode harus diisi.");
		}
	},	
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "APP") this.sg.cells(0,row,"INPROG");
		else this.sg.cells(0,row,"APP");
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 8) {
				this.doDetail(this.sg,1,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDetail: function(sender, col , row) {
		//hanya yg piutang pegawai loker setempat
		if (this.sg.cells(1,row) != "") {
			if (this.sg.cells(6,row) == "BP") {
				var strSQL = "select a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_keluar,103) as tgl_keluar,a.icdx,a.kode_produk,a.nilai,0 as nilai_kunj,0 as nilai_cs "+
			             "from yk_bill_d a "+
						 "inner join yk_loker bb on a.loker=bb.loker "+
						 "inner join cust b on bb.kode_cust=b.kode_cust "+
						 "where a.loker= '"+this.sg.cells(2,row)+"' and a.no_hutang = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";			
			}
			else {
				var strSQL = "select '-' as kode_vendor,a.no_ref,a.nik,a.nama,a.loker,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_masuk,103) as tgl_keluar,'-' as icdx,a.kode_produk,0 as nilai,a.umum+a.gigi+a.kbia+a.matkes as nilai_kunj,a.cs as nilai_cs "+
			             "from yk_billkunj_d a "+
						 "inner join yk_loker bb on a.loker=bb.loker "+
						 "inner join cust b on bb.kode_cust=b.kode_cust "+
						 "where a.loker= '"+this.sg.cells(2,row)+"' and a.no_hutang = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";			
			}
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[2]);
		} else system.alert(this,"Data tidak valid.","Loker Peserta harus terpilih.");		
	},	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];									
			this.sg1.appendData([line.kode_vendor,line.no_ref,line.nik,line.nama,line.loker,line.kode_lokasi,line.band,line.nikkes,line.pasien,line.tgl_masuk,line.tgl_keluar,line.icdx,line.kode_produk,floatToNilai(line.nilai),floatToNilai(line.nilai_kunj),floatToNilai(line.nilai_cs)]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg.validasi();
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != "" && this.sg.cells(0,i) == "APP"){
					tot += nilaiToFloat(this.sg.cells(7,i));
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
								this.nama_report="server_report_saku3_gl_rptJuJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1);
			this.sg1.clear(1);
			this.sg3.clear(1);
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select no_selesai,convert(varchar,tanggal,103) as tgl,modul,periode,keterangan,progress,nilai+kunj-cs as nilai "+
		             "from yk_bast_m  "+					 					 
					 "where kode_lokasi='"+this.app._lokasi+"' and progress ='0' and periode = '"+this.e_periode.getText()+"'";		
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
			this.sg3.appendData([line.no_selesai,line.tgl,line.modul,line.periode,line.keterangan,line.progress,floatToNilai(line.nilai)]); 
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
				this.bTampil.hide();				
				this.i_appAll.hide();
				
				var strSQL = "select keterangan,no_dokumen,tanggal,modul,nik_app,nilai+kunj-cs as nilai,kode_loktuj "+
							 "from yk_bast_m "+							 
							 "where no_selesai = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);		
						this.c_jenis.setText(line.modul);		
						this.cb_app.setText(line.nik_app);		
						this.cb_tujuan.setText(line.kode_loktuj);		
						this.e_nilai.setText(floatToNilai(line.nilai));								
					}
				}

				var strSQL = "select a.no_hutang,a.loker,a.periode,a.keterangan,a.modul,a.jenis,sum(a.nilai) as nilai "+
					   "from ( "+					   
					   
					   "select a.no_terima as no_hutang,b.loker,a.periode,a.keterangan,a.modul,'BP' as jenis,sum(b.nilai) as nilai "+
					   "from takterima_m a inner join yk_bill_d b on a.no_terima=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					   					   
			           "where b.no_selesai = '"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+ 
					   "group by a.no_terima,b.loker,a.periode,a.keterangan,a.modul "+
					   
					   "union all "+
					   "select a.no_terima as no_hutang,b.loker,a.periode,a.keterangan,a.modul,'KJCS' as jenis,case when c.jenis = 'PENSIUN' then 0 else sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) end as nilai "+
					   "from takterima_m a inner join yk_billkunj_d b on a.no_terima=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					   					   
			           "                   inner join yk_loker bb on b.loker=bb.loker "+
					   "                   inner join cust c on bb.kode_cust=c.kode_cust "+
					   "where b.no_selesai = '"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+ 
					   "group by a.no_terima,b.loker,a.periode,a.keterangan,a.modul,c.jenis "+					   					   

					   "union all "+					   
					   "select a.no_hutang,b.loker,a.periode,a.keterangan,a.modul,'BP' as jenis,sum(b.nilai) as nilai "+
					   "from yk_hutang_m a inner join yk_bill_d b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					   			           
					   "where b.no_selesai = '"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+ 
					   "group by a.no_hutang,b.loker,a.periode,a.keterangan,a.modul "+
					   
					   "union all "+
					   "select a.no_hutang,b.loker,a.periode,a.keterangan,a.modul,'KJCS' as jenis,case when c.jenis = 'PENSIUN' then 0 else sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) end as nilai "+
					   "from yk_hutang_m a inner join yk_billkunj_d b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi "+					   
			           "                   inner join yk_loker bb on b.loker=bb.loker "+
					   "                   inner join cust c on bb.kode_cust=c.kode_cust "+
					   "where b.no_selesai = '"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+ 
					   "group by a.no_hutang,b.loker,a.periode,a.keterangan,a.modul,c.jenis "+					   
					   
					   ") a where a.nilai <> 0 group by a.no_hutang,a.loker,a.periode,a.keterangan,a.modul,a.jenis "+
					   
					   "order by a.no_hutang,a.loker ";			

				var data = this.dbLib.getDataProvider(strSQL,true);
						  
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["APP",line.no_hutang,line.loker,line.periode,line.keterangan,line.modul,line.jenis.toUpperCase(),floatToNilai(line.nilai),"Detail"]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
				
			}									
		} catch(e) {alert(e);}
	}
});