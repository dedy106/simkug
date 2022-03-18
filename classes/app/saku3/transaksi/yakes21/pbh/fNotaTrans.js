window.app_saku3_transaksi_yakes21_pbh_fNotaTrans = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_pbh_fNotaTrans.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_pbh_fNotaTrans";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Nota Transfer", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Nota","List Nota"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
				colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
				colWidth:[[4,3,2,1,0],[70,100,300,80,100]],
				colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
				click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
				dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[10,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[215,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[790,12,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[890,12,98,18]}); 						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[10,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_nilainota = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total Nota", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});					
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,996,350], childPage:["Filter Data","Daftar PB","Rekening","Edit NOTA"]});		
		this.cb_lokasi = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:9});		
		this.bTampil = new button(this.pc1.childPage[0],{bound:[120,19,98,18],caption:"Tampil PB",click:[this,"doLoad"]});		
		this.e_spasi = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,450,20],caption:"Spasi", maxLength:50,visible:false});	
		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,300,20],caption:"Nomor", maxLength:50});				
		this.cb_btrans = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Bank Transfer", multiSelection:false, maxLength:10,change:[this,"doChange"]});
		this.e_nmbank = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Nama Bank", maxLength:150});				
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,300,20],caption:"No Rekening", maxLength:150,readOnly:true});				
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Nama Rekening", maxLength:150,readOnly:true});				
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Alamat", maxLength:150,readOnly:true});				
		this.cb_nik1 = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10});
		this.cb_nik2 = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Mengetahui", multiSelection:false, maxLength:10});

		this.sg5 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		        colTitle:["Status","No PB","Tanggal","Deskripsi","Nilai PB","Lok. Pengaju","Bank Trans","No SPB"],
				colWidth:[[7,6,5,4,3,2,1,0],[100,100,80,100,280,80,120,80]],colFormat:[[4],[cfNilai]],										
				readOnly:true,buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["NOTA","INPROG"]})]],				
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell5"],autoAppend:false,defaultRow:1});		
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg5,pager:[this,"doPager5"]});		
		
		this.sg4 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:9,
				colTitle:["Bank","Atensi","No Rekening","Nama Rekening","Bruto","Potongan","Netto","Jenis","By Transfer","ID"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[50,80,80,100,80,100,250,100,150,170]],										
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],				
				buttonStyle:[[8],[bsAuto]],picklist:[[8],[new portalui_arrayMap({items:["YAKES","MITRA"]})]],
				colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],												
				defaultRow:1,autoAppend:false});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});
		
		this.cb_pbAdd = new portalui_saiCBBL(this.pc1.childPage[3],{bound:[20,18,220,20],caption:"No PB Tambah",multiSelection:false,tag:9});					
		this.bAdd = new button(this.pc1.childPage[3],{bound:[120,19,98,18],caption:"Tambah Data",click:[this,"doAdd"]});	
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where flag_konsol='0'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);						
			this.cb_btrans.setSQL("select kode_btrans, nama from bank_trans where flag_aktif='1'",["kode_btrans","nama"],false,["Kode","Nama"],"and","Data Bank",true);						
			this.cb_nik1.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_nik2.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

			var data = this.dbLib.getDataProvider("select kode_spro,value1 from spro where kode_spro in ('MAXBYTRANS') ",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "MAXBYTRANS") this.maxByTrans = parseFloat(line.value1);																										
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_pbh_fNotaTrans.extend(window.childForm);
window.app_saku3_transaksi_yakes21_pbh_fNotaTrans.implement({		
	doAdd: function() {	
		try {
			var temu = false;
			for (var i = 0; i < this.sg5.rows.getLength();i++){
				if (this.sg5.rowValid(i) && this.sg5.cells(1,i) == this.cb_pbAdd.getText()){
					temu = true;
					break;
				}
			}
			if (!temu) {			
				var strSQL = "select 'NOTA' as status,a.no_pb,a.no_spb,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,b.nama as lokasi,a.bank_trans "+
							 "from pbh_pb_m a inner join lokasi b on a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_pb = '"+this.cb_pbAdd.getText()+"' and a.progress='3' and a.no_spb<>'-' and a.modul not in ('IFCLOSE','PJPTG')";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.sg5.appendData([line.status.toUpperCase(),line.no_pb,line.tgl,line.keterangan,floatToNilai(line.nilai),line.lokasi,line.bank_trans,line.no_spb]);		 
					}					
				}			
			}			
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
		catch(e) {
			alert(e);
		}

	},
	isiPBAdd: function() {	
		try {						
			if (this.cb_lokasi.getText() == "") var filterData2 = " ";
			else var filterData2 = " a.kode_lokasi='"+this.cb_lokasi.getText()+"' and ";

			var filter = filterData2;
			var strSQL = "select no_pb,keterangan from pbh_pb_m where "+filter+" progress='3' and no_spb<>'-' ";					
			this.cb_pbAdd.setSQL(strSQL,["no_pb","keterangan"],false,["No PB","Keterangan"],"and","Data PB",true);						
		}
		catch(e) {
			alert(e);
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from pbh_nota where no_nota = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update a set a.by_transfer='-' "+
								"from pbh_rek a inner join pbh_pb_m b on a.no_bukti=b.no_pb "+
								"where b.no_nota = '"+this.e_nb.getText()+"'");																	
						sql.add("update a set pbh_pb_m set progress='3', no_nota='-' where no_nota = '"+this.e_nb.getText()+"'");																	
					}			

					sql.add("insert into pbh_nota (no_nota,no_dokumen,kode_lokasi,periode,nik_user,tgl_input,tanggal,due_date,keterangan,nilai, kode_btrans,nama,no_rek,alamat,nik1,nik2 ) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilainota.getText())+", '"+this.cb_btrans.getText()+"','"+this.e_nmbank.getText()+"','"+this.e_norek.getText()+"','"+this.e_alamat.getText()+"','"+this.cb_nik1.getText()+"','"+this.cb_nik2.getText()+"')");
														
					for (var i = 0; i < this.sg5.rows.getLength();i++){
						if (this.sg5.rowValid(i) && this.sg5.cells(0,i) == "NOTA"){							
							sql.add("update pbh_pb_m set progress='4', no_nota='"+this.e_nb.getText()+"' where no_pb = '"+this.sg5.cells(1,i)+"' ");																				
						}
					}

					for (var i = 0; i < this.sg4.rows.getLength();i++){
						if (this.sg4.rowValid(i)) {
							sql.add("update pbh_rek set by_transfer='"+this.sg4.cells(8,i)+"' where id = '"+this.sg4.cells(9,i)+"' ");	
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
					this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					setTipeButton(tbAllFalse);		
					this.doLoad3();		
					this.doLoad();	
				break;
			case "simpan" :															
			case "ubah" :																			
				this.preView = "1";								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_nilainota.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai SPB tidak boleh nol atau kurang.");
					return false;						
				}				
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from pbh_nota where no_nota = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update a set a.by_transfer='-' "+
								"from pbh_rek a inner join pbh_pb_m b on a.no_bukti=b.no_pb "+
								"where b.no_nota = '"+this.e_nb.getText()+"'");																	
				sql.add("update pbh_pb_m set progress='3', no_nota='-' where no_nota = '"+this.e_nb.getText()+"'");											
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);				
		if (this.stsSimpan == 1) {
			if (m == 1) var bulan = "I";
			if (m == 2) var bulan = "II";
			if (m == 3) var bulan = "III";
			if (m == 4) var bulan = "IV";
			if (m == 5) var bulan = "V";
			if (m == 6) var bulan = "VI";
			if (m == 7) var bulan = "VII";
			if (m == 8) var bulan = "VIII";
			if (m == 9) var bulan = "IX";
			if (m == 10) var bulan = "X";
			if (m == 11) var bulan = "XI";
			if (m == 12) var bulan = "XII";

			this.e_dok.setText("   /KU.430/YAKES-22/ "+bulan+" /"+y);
			this.doClick();				
			this.doLoad3();			
		}
	},
	getOtorisasi: function() {
		try {
			if (this.e_nilainota.getText() != "") {
				var strSQL = "select nik_sah,nik_fiat from pbh_otorisasi where "+nilaiToFloat(this.e_nilainota.getText())+" between nilai_min and nilai_max and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						if (nilaiToFloat(this.e_nilainota.getText()) <= 500000000) 
							this.cb_nik1.setText(this.app._userLog);
						else this.cb_nik1.setText(line.nik_sah);																

						this.cb_nik2.setText(line.nik_fiat);											
					} 
				}
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.stsSimpan ==1) this.doClick();		
		if (sender == this.cb_btrans && this.cb_btrans.getText()!="") {
			var strSQL = "select * from bank_trans where kode_btrans ='"+this.cb_btrans.getText()+"' ";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.e_nmbank.setText(line.nama);	
					this.e_alamat.setText(line.alamat);																
					this.e_norek.setText(line.no_rek);																
					this.e_namarek.setText(line.nama_rek);																
				}
			}
		}
		if (sender == this.e_nilainota && this.e_nilainota.getText()!="0") {
			this.getOtorisasi();
		}				
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1); 										
				this.e_nilainota.setText("0");
				this.doLoad3();
				this.doLoad();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pbh_nota","no_nota",this.app._lokasi+"-NTR"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doLoad: function(sender){				
		try {
			if (this.cb_lokasi.getText() == "") var filterData2 = " ";
			else var filterData2 = " a.kode_lokasi='"+this.cb_lokasi.getText()+"' and ";
			var filter = filterData2;

			var strSQL = "select 'INPROG' as status,a.no_pb,a.no_spb,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,b.nama as lokasi,a.bank_trans "+
						"from pbh_pb_m a "+
						"inner join lokasi b on a.kode_lokasi=b.kode_lokasi "+
						"inner join spb_m c on a.no_spb=c.no_spb and c.progress='2' "+
						"where "+filter+" a.progress='3' and a.no_spb <> '-' and a.modul not in ('IFCLOSE','PJPTG') ";					 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg5.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					this.sg5.appendData([line.status.toUpperCase(),line.no_pb,line.tgl,line.keterangan,floatToNilai(line.nilai),line.lokasi,line.bank_trans,line.no_spb]);
				}
			} else this.sg5.clear(1);	
			this.sg5.validasi();
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
		catch(e) {
			alert(e);
		}
	},	
	doChangeCell5: function(sender, col , row) {
		if (col == 0) {
			this.sg5.validasi();
			this.doLoadRek();			
		}		
	},
	doNilaiChange: function(){
		try{
			var tot = 0;			
			for (var i = 0; i < this.sg5.rows.getLength();i++){
				if (this.sg5.rowValid(i) && this.sg5.cells(4,i) != "" && this.sg5.cells(0,i) == "NOTA"){
					tot += nilaiToFloat(this.sg5.cells(4,i));					
				}
			}			
			this.e_nilainota.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doLoadRek: function() {
		var line = noPB = "";		
		for (var i = 0; i < this.sg5.rows.getLength();i++){
			if (this.sg5.rowValid(i) && this.sg5.cells(0,i) == "NOTA"){
				noPB += ",'"+this.sg5.cells(1,i)+"'";
			}
		}

		noPB = noPB.substr(1);							
		if (noPB != "") {					
            var strSQL = "select a.id, a.bank,a.nama,a.no_rek,a.nama_rek,a.bruto,a.pajak,a.nilai, case when a.modul='PINBUK-C' then 'SUMBER' else 'TUJUAN' end jenis, case when a.nilai > "+this.maxByTrans+" then 'MITRA' else 'YAKES' end as bytrans "+
						 "from pbh_rek a inner join pbh_pb_m b on a.no_bukti=b.no_pb and a.kode_lokasi=b.kode_lokasi "+
						 "where b.no_pb in ("+noPB+") ";   						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg4.appendData([line.bank,line.nama,line.no_rek,line.nama_rek,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.nilai),line.jenis.toUpperCase(),line.bytrans.toUpperCase(),line.id]);
				}
			} else this.sg4.clear(1);					
		}
		else system.alert(this,"Data tidak valid.","Tidak ada PB yang berstatus NOTA.");			
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_pbh_ypt_rptSpb";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);			
			this.sg4.clear(1); this.sg5.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);			
			this.doClick();			
			this.doLoad3();
			this.doLoad();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){
		var strSQL = "select a.no_nota,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from pbh_nota a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";		
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
			this.sg3.appendData([line.no_nota,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
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
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,row));								
				this.isiPBAdd();
								
				var strSQL = "select * from pbh_nota where no_nota = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);	
						this.dp_d2.setText(line.due_date);						
						this.e_ket.setText(line.keterangan);
						this.e_dok.setText(line.no_dokumen);	
						
						this.cb_btrans.setText(line.kode_btrans);
						this.e_norek.setText(line.no_rek);
						this.cb_nik1.setText(line.nik1);
						this.cb_nik2.setText(line.nik2);
					}
				}								
									 
                var strSQL = "select 'NOTA' as status,b.no_pb,b.no_spb,convert(varchar,b.tanggal,103) as tgl,b.keterangan,b.nilai,c.nama as lokasi,b.bank_trans "+
							 "from pbh_pb_m b inner join lokasi c on b.kode_lokasi=c.kode_lokasi "+
							 "where b.progress='4' and b.no_nota='"+this.e_nb.getText()+"' and modul not in ('IFCLOSE','PJPTG')";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg5.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																	
						this.sg5.appendData([line.status.toUpperCase(),line.no_pb,line.tgl,line.keterangan,floatToNilai(line.nilai),line.lokasi,line.bank_trans,line.no_spb]);
					}
				} else this.sg5.clear(1);	

				this.doLoadRek();
				this.pc1.setActivePage(this.pc1.childPage[0]);																			
			}									
		} catch(e) {alert(e);}
	}

});