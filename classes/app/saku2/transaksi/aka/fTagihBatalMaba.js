window.app_saku2_transaksi_aka_fTagihBatalMaba = function(owner)
{
	if (owner)
	{
		try {
		window.app_saku2_transaksi_aka_fTagihBatalMaba.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_aka_fTagihBatalMaba";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Batal CaMABA: Proses", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Batal", readOnly:true});					
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_tagih = new saiLabelEdit(this,{bound:[720,12,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});			
		this.e_bayar = new saiLabelEdit(this,{bound:[720,13,200,20],caption:"Total Bayar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,380], childPage:["Data CaMABA"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:5,		
				colTitle:["No Tes","Nama","Tagihan","Nilai Bayar","Cek Batal"],
				colWidth:[[4,3,2,1,0],[100,100,100,250,100]],
				colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],
				nilaiChange:[this,"doNilaiChange"],
				afterPaste:[this,"doAfterPaste"],pasteEnable:true,autoPaging:true,rowPerPage:20,
				autoAppend:true, readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1,pager:[this,"doPage"]});		
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		
		setTipeButton(tbSimpan);				
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		} catch(e) {alert(e);}
	}
};
window.app_saku2_transaksi_aka_fTagihBatalMaba.extend(window.portalui_childForm);
window.app_saku2_transaksi_aka_fTagihBatalMaba.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			this.doNilaiChange();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
	},
	doNilaiChange: function(){
		try{
			var bayar = tot = 0; this.totBatal = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){ 
				if (this.sg1.rowValid(i)){
					//tagihan
					var strSQL = "select sum(nilai) as total from aka_mababill_d where no_tes ='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.sg1.cells(2,i,floatToNilai(line.total));							
						}						
					}
					//bayar
					var strSQL = "select sum(case dc when 'D' then nilai else -nilai end) as total from aka_mabarekon_d where no_tes ='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.sg1.cells(3,i,floatToNilai(line.total));							
						}						
					}
					//batal
					var strSQL = "select sum(case dc when 'D' then nilai else -nilai end) as totalbatal "+
					             "from aka_mababatal_d where no_tes ='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) {							
							this.sg1.cells(4, i, floatToNilai(line.totalbatal));													
						}											
					}					
					if (this.sg1.cells(4,i) == "0") {
						tot += nilaiToFloat(this.sg1.cells(2,i));
						bayar += nilaiToFloat(this.sg1.cells(3,i));
					}
					else this.totBatal += nilaiToFloat(this.sg1.cells(4,i));
				}
			}			
			this.e_tagih.setText(floatToNilai(tot));		
			this.e_bayar.setText(floatToNilai(bayar));					
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :								
					if (this.totBatal != 0) {
						system.alert(this,"Transaksi tidak valid.","Ditemukan data pembatalan.");
						return false;						
					}					
					if (nilaiToFloat(this.e_tagih.getText()) <= 0) {
						system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
						return false;						
					}		
					this.stsSimpan = "1";					
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_mababatal_m','no_batal',this.app._lokasi+"-MBTL"+this.e_periode.getText().substr(2,4)+".",'000'));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();															
							if (nilaiToFloat(this.e_bayar.getText()) != 0) var nokas = "-"; else var nokas = "X";									
							sql.add("insert into aka_mababatal_m(no_batal,no_dokumen,tanggal,keterangan,nilai_tagih,nilai_bayar,modul,nik_app,kode_lokasi,periode,nik_user,tgl_input,no_kas) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_tagih.getText())+","+parseNilai(this.e_bayar.getText())+",'BATALMABA','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+nokas+"')");
																				
							for (var i=0;i < this.sg1.getRowCount();i++){
								if (this.sg1.rowValid(i)){
									sql.add("insert into aka_mababatal_d(no_batal,no_tes,nama,periode,nilai,nilai_bayar,kode_lokasi,kode_produk,dc,modul) "+
											"select '"+this.e_nb.getText()+"',a.no_tes,a.nama,'"+this.e_periode.getText()+"',a.nilai,isnull(b.nilai,0),a.kode_lokasi,a.kode_produk,'D','BATALMABA' "+
											"from aka_mababill_d a left join aka_mabarekon_d b on a.no_tes=b.no_tes and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+
											"where a.no_tes='"+this.sg1.cells(0,i)+"' and a.kode_lokasi='"+this.app._lokasi+"'");
								}
							}							
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},		
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_mababatal_m','no_batal',this.app._lokasi+"-MBTL"+this.e_periode.getText().substr(2,4)+".",'000'));
			this.e_ket.setFocus();
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){						
						if (this.stsSimpan=="1") {							
							this.nama_report="server_report_saku2_aka_rptBillJurnal";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_batal='"+this.e_nb.getText()+"' ";
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
							this.pc1.hide();							
						}
					}else
						system.info(this, result,"");											
				break;
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
			this.standarLib.clearByTag(this, [0,1],undefined);				
			this.sg1.clear(1); 
			setTipeButton(tbSimpan);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} catch(e) {
			alert(e);
		}
	}
});
