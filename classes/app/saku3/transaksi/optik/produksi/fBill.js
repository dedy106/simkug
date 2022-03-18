window.app_saku3_transaksi_optik_produksi_fBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_optik_produksi_fBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_optik_produksi_fBill";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tagihan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Billing","List Billing"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,500,80,100]],
					colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"No Bill",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,14,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,300,20],caption:"No Dokumen", maxLength:150});									
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});									
		this.cb_mitra = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Mitra",multiSelection:false,tag:1,change:[this,"doChange"]});					
			
		this.bTampil = new button(this.pc2.childPage[0],{bound:[590,18,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.iApp = new portalui_imageButton(this.pc2.childPage[0],{bound:[690,18,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doApp"]});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,18,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,325], childPage:["Data Cabang","Data Resep","+Resep"]});
		this.sg4 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:2,tag:8,				
				colTitle:["Kode","Nama"],
				colWidth:[[1,0],[300,80]],
				columnReadOnly:[true,[1],[0]],				
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick4"],change:[this,"doChangeCell4"],
				defaultRow:1,autoAppend:true});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});	
		this.bPP = new portalui_imageButton(this.sgn4,{bound:[this.sgn4.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Cabang",click:[this,"doLoadPP"]});

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:10,tag:9,
		            colTitle:["Status","No Resep","No Nota","Tanggal","NIK","Pasien","Loker","Band","Cabang","Nilai"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,80,80,200,80,80,80,100,80]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
					buttonStyle:[[0],[bsAuto]],colFormat:[[9],[cfNilai]],
					picklist:[[0],[new portalui_arrayMap({items:["APPROVE","INPROG"]})]], dblClick:[this,"doDoubleClick"],
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.cb_resepAdd = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,18,220,20],caption:"Resep Tambah",multiSelection:false,tag:9});					
		this.bAdd = new button(this.pc1.childPage[2],{bound:[120,19,98,18],caption:"Tambah Data",click:[this,"doAdd"]});			

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);	
					
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
						
			this.cb_mitra.setSQL("select kode_mitra,nama from optik_mitra where flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_mitra","nama"],false,["Kode","Nama"],"and","Data Mitra",true);						
							
			var sql = new server_util_arrayList();			
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
					"where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1' ");		
			this.dbLib.getMultiDataProviderA(sql);
			
			
			var strSQL = "select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
						 "where a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif='1' order by a.kode_pp ";	
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					this.sg4.appendData([line.kode_pp,line.nama]);
				}
			} else this.sg4.clear(1);
				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_optik_produksi_fBill.extend(window.childForm);
window.app_saku3_transaksi_optik_produksi_fBill.implement({	
	doAdd: function() {	
		var temu = false;
		for (var i = 0; i < this.sg.rows.getLength();i++){
			if (this.sg.rowValid(i) && this.sg.cells(1,i) == this.cb_resepAdd.getText()){
				temu = true;
				break;
			}
		}
		if (!temu) {
			var strSQL = "select 'APPROVE' as status,no_bukti,no_dokumen,convert(varchar,tanggal,103) as tgl,nik,pasien,loker,band,kode_pp,app_blen+app_bfr as nilai "+
						"from optik_pesan_m a "+
						"where a.tgl_del is null and a.no_bukti = '"+this.cb_resepAdd.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					this.sg.appendData([line.status.toUpperCase(),line.no_bukti,line.no_dokumen,line.tgl,line.nik,line.pasien,line.loker,line.band,line.kode_pp,floatToNilai(line.nilai)]);
				}
			}	
		}
		this.sg.validasi();
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	isiResepAdd: function() {	
		try {	
			var vPP = "";
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i)){
					vPP += ",'"+this.sg4.cells(0,i)+"'";
				}
			}
			vPP = vPP.substr(1);		

			var strSQL = "select no_bukti,no_dokumen "+
						 "from optik_pesan_m "+
						 "where tgl_del is null and kode_pp in ("+vPP+") and progress='1' and periode<='"+this.e_periode.getText()+"' and kode_mitra='"+this.cb_mitra.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";					 			
			this.cb_resepAdd.setSQL(strSQL,["no_bukti","no_dokumen"],false,["No Resep","No Nota"],"and","Data Resep",true);						
		}
		catch(e) {
			alert(e);
		}
	},
	doLoad: function(sender){		
		var vPP = "";
		for (var i = 0; i < this.sg4.rows.getLength();i++){
			if (this.sg4.rowValid(i)){
				vPP += ",'"+this.sg4.cells(0,i)+"'";
			}
		}
		vPP = vPP.substr(1);	

		if (this.cb_mitra.getText() != "" && this.e_periode.getText() != "") {			
			var strSQL = "select 'INPROG' as status,no_bukti,no_dokumen,convert(varchar,tanggal,103) as tgl,nik,pasien,loker,band,kode_pp,app_blen+app_bfr as nilai "+
						 "from optik_pesan_m "+
						 "where tgl_del is null and kode_pp in ("+vPP+") and progress='1' and periode<='"+this.e_periode.getText()+"' and kode_mitra='"+this.cb_mitra.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					this.sg.appendData([line.status.toUpperCase(),line.no_bukti,line.no_dokumen,line.tgl,line.nik,line.pasien,line.loker,line.band,line.kode_pp,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);									
		}
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	doLoadPP : function() {
		var data = this.dbLib.getDataProvider("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows) {
				line = data.rs.rows[i];						
				this.sg4.appendData([line.kode_pp,line.nama]);
			}
		} else this.sg4.clear(1);
	},	
	doChangeCell4: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    			
		if (col == 0) {
			if (this.sg4.cells(0,row) != "") {
				var pp = this.dataPP.get(sender.cells(0,row));
				if (pp) sender.cells(1,row,pp);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Cabang "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCell4");		
	},
	doEllipsClick4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Cabang",sender,undefined, 
							"select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",
							"select count(*) from (select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"') a",
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
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
						sql.add("delete from optik_tagih_m where no_tagih = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update optik_pesan_m set no_tagih='-',progress='1' where no_tagih='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
					}					
					
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APPROVE"){
							sql.add("update optik_pesan_m set no_tagih='"+this.e_nb.getText()+"',progress='2' where no_bukti='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}
					
					sql.add("insert into optik_tagih_m (no_tagih,no_kas,no_dokumen,tanggal,keterangan,kode_mitra,akun_piutang,nilai,kode_lokasi,kode_pp,periode,nik_user,tgl_input) values "+
					        "('"+this.e_nb.getText()+"','-','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_mitra.getText()+"','"+this.akunPiutang+"',"+parseNilai(this.e_nilai.getText())+",'"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())")
					
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
					setTipeButton(tbAllFalse);
					this.sg.clear(1);
					this.sg3.clear(1);
					this.cb_resepAdd.setText("","");
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";
				this.sg.validasi();
				
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
					sql.add("delete from optik_tagih_m where no_tagih = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update optik_pesan_m set no_tagih='-',progress='1' where no_tagih='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
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
		if (this.stsSimpan == 1) this.doClick();		
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1);				
				this.sg3.clear(1);
				this.bTampil.show();
				this.iApp.show();					
				this.e_nilai.setText("0");				
			}				
			this.stsSimpan = 1; 
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"optik_tagih_m","no_tagih",this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".","0000"));			
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);
		}		
	},
	doChange:function(sender){		
		if (sender == this.cb_mitra && this.cb_mitra.getText()!="") {
			var data = this.dbLib.getDataProvider("select akun_piutang from optik_mitra where kode_mitra='"+this.cb_mitra.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.akunPiutang = line.akun_piutang;									
				} 
			}	
			if (this.stsSimpan==0) this.isiResepAdd();
		}
	},
	doApp:function(sender){
		for (var i = 0; i < this.sg.rows.getLength();i++){
			if (this.sg.rowValid(i)){
				this.sg.cells(0,i,"APPROVE");
			}
		}
	},	
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "INPROG") this.sg.cells(0,row,"APPROVE");
		else this.sg.cells(0,row,"INPROG");		
	},	
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.sg.validasi();
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;			
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(9,i) != "" && this.sg.cells(0,i) == "APPROVE"){
					tot += nilaiToFloat(this.sg.cells(9,i));					
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
								//this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanForm";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataPP = new portalui_arrayMap();	
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
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
			setTipeButton(tbAllFalse);
			this.bTampil.show();
			this.iApp.show();	
			this.sg.clear(1); this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.cb_resepAdd.setText("","");			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																								
		var strSQL = "select a.no_tagih,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from optik_tagih_m a "+		              
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
			this.sg3.appendData([line.no_tagih,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.bTampil.hide();	
				this.iApp.hide();	 			
				
				this.e_nb.setText(this.sg3.cells(0,row));												
				
				var strSQL = "select * "+
				             "from optik_tagih_m a "+
				             "where a.no_tagih = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);																				
						this.e_ket.setText(line.keterangan);		
						this.cb_mitra.setText(line.kode_mitra);																		
					}
				}			
				
				var strSQL = "select 'APPROVE' as status,no_bukti,no_dokumen,convert(varchar,tanggal,103) as tgl,nik,pasien,loker,band,kode_pp,app_blen+app_bfr as nilai "+
							"from optik_pesan_m "+
							"where tgl_del is null and no_tagih='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];																	
						this.sg.appendData([line.status.toUpperCase(),line.no_bukti,line.no_dokumen,line.tgl,line.nik,line.pasien,line.loker,line.band,line.kode_pp,floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);
				
			}									
		} catch(e) {alert(e);}
	}
});