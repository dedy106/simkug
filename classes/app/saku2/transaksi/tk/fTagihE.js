window.app_saku2_transaksi_tk_fTagihE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_tk_fTagihE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_tk_fTagihE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tagihan Siswa: Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});								
		this.cb_akun = new saiCBBL(this,{bound:[20,13,200,20],caption:"Akun Piutang", multiSelection:false, maxLength:10, tag:2});								
		this.cb_app = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});								
		this.cb_siswa = new saiCBBL(this,{bound:[20,12,200,20],caption:"Siswa", readOnly:true});						
		this.e_tingkat = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Tingkat", readOnly:true});						
		this.e_total = new saiLabelEdit(this,{bound:[610,14,210,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this,{bound:[20,20,800,290],caption:"Data Item Biaya"});		
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:7,tag:0,
		            colTitle:["Kode Biaya","Nama","DC","Kode Akun","Tarif","Potongan","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,80,80,80,250,80]],					
					columnReadOnly:[true,[1,2,3,4,6],[0,5]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],checkItem:true,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});		
		
		this.rearrangeChild(10, 23);
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();						
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag = '003' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun Piutang",true);						
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Mengetahui",true);									
			var sql = new server_util_arrayList();			
			sql.add("select kode_tarif, nama from tk_tarif where kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_tk_fTagihE.extend(window.childForm);
window.app_saku2_transaksi_tk_fTagihE.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from tk_piutang_m where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tk_piutang_j where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tk_piutang_d where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into tk_piutang_m(no_piutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_siswa,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_piutang,posted) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_siswa.getText()+"','"+this.cb_app.getText()+"','"+this.app._kodePP+"',"+parseNilai(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_akun.getText()+"','F')");
									
					sql.add("insert into tk_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.app_kodePP+"','-','"+this.app._lokasi+"','PIUTK','PIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){															
								var j = i+1;
								sql.add("insert into tk_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(3,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','IDR',1,"+parseNilai(this.sg.cells(6,i))+","+parseNilai(this.sg.cells(6,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PIUTK','PDPT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");								
								sql.add("insert into tk_piutang_d(no_piutang,kode_lokasi,kode_tarif,dc,tarif,pot,nilai) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"',"+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+","+parseNilai(this.sg.cells(6,i))+")");								
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
					setTipeButton(tbUbahHapus);					
				break;
			case "ubah" :																						
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();															
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from tk_piutang_m where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tk_piutang_j where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from tk_piutang_d where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}							
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!= "") {
			this.e_nb.setSQL("select no_piutang, keterangan from tk_piutang_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
			                 "and no_piutang not in (select distinct no_piutang from tk_piubayar_d)",["no_piutang","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);			
		}		
		if (sender == this.e_nb && this.e_nb.getText()!="") {			
			var strSQL = "select a.tanggal,a.periode,a.no_dokumen,a.keterangan,a.akun_piutang,a.nik_app,a.kode_siswa,c.nama as nama_siswa,c.kode_tingkat,d.kode_tingkat+' - '+d.nama as tingkat "+						 
						 "from tk_piutang_m a inner join tk_siswa c on a.kode_siswa=c.kode_siswa and a.kode_lokasi=c.kode_lokasi "+
						 "                    inner join tk_tingkat d on d.kode_tingkat=c.kode_tingkat and d.kode_lokasi=c.kode_lokasi "+
						 "where a.no_piutang='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);										
					this.e_ket.setText(line.keterangan);
					this.cb_app.setText(line.nik_app);
					this.cb_akun.setText(line.akun_piutang);
					this.cb_siswa.setText(line.kode_siswa,line.nama_siswa);					
					this.e_tingkat.setText(line.tingkat);
					this.kodeTingkat = line.kode_tingkat;
				} 
			}			
			strSQL = "select a.kode_tarif,a.dc,a.tarif,a.pot,a.nilai,b.nama,b.kode_akun  "+
					 "from tk_piutang_d a inner join tk_tarif b on a.kode_tarif=b.kode_tarif and a.kode_lokasi=b.kode_lokasi "+
					 "where a.no_piutang = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line2;
				this.sg.clear();
				for (var i in data.rs.rows){
					line2 = data.rs.rows[i];							
					this.sg.appendData([line2.kode_tarif,line2.nama,line2.dc,line2.kode_akun,floatToNilai(line2.tarif),floatToNilai(line2.pot),floatToNilai(line2.nilai)]);
				}
			} else this.sg.clear(1);						
			this.sg.validasi();
		}				
	},		
	doChangeCell: function(sender, col, row){
		if (col == 5) {			
			if (this.sg.cells(5,row) != "") {											
				this.sg.cells(6,row,floatToNilai(nilaiToFloat(this.sg.cells(4,row)) - nilaiToFloat(this.sg.cells(5,row))));
				this.sg.validasi();			
			}
		}
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row)); 
				if (akun) { 
					sender.cells(1,row,akun);										
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Tarif "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
					sender.cells(3,row,"");
					sender.cells(4,row,"");
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}
				
				var data = this.dbLib.getDataProvider("select kode_akun,dc,nilai from tk_tarif where kode_tarif='"+this.sg.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.sg.cells(2,row,line.dc);
						this.sg.cells(3,row,line.kode_akun);
						this.sg.cells(4,row,floatToNilai(line.nilai));
						this.sg.cells(5,row,"0");
						this.sg.cells(6,row,floatToNilai(line.nilai));
					} 
				}
			}
		}				
		sender.onChange.set(this,"doChangeCell");			
		this.sg.validasi();
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != ""){															
					if (this.sg.cells(2,i).toUpperCase() == "C") tot += nilaiToFloat(this.sg.cells(6,i));
					else tot -= nilaiToFloat(this.sg.cells(6,i));									
				}
			}						
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Tarif",sender,undefined, 
												  "select kode_tarif,nama    from tk_tarif where kode_tingkat='"+this.kodeTingkat+"' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_tarif)  from tk_tarif where kode_tingkat='"+this.kodeTingkat+"' and  kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_tarif","nama"],"and",["Kode","Nama"],false);				
				}							
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
					case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_siaga_rptPiutangJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_piutang='"+this.e_nb.getText()+"' ";
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
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataAkun.set(line.kode_tarif, line.nama);
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
			setTipeButton(tbUbahHapus);			
		} catch(e) {
			alert(e);
		}
	}
});