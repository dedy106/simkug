window.app_saku2_transaksi_kopeg_fa_fVaLoad = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_fa_fVaLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_kopeg_fa_fVaLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Inventarisasi Fisik : Proses", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("util_dbLib",true);		
				
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Load", readOnly:true});					
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,11,250,20],caption:"No Dokumen", maxLength:50});			
		this.e_ket = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Deskripsi", maxLength:150});			
		this.bUpload = new portalui_uploader(this,{bound:[615,15,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});				
		this.e_total = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,360], childPage:["Data Inventaris","Pesan Kesalahan"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:23,tag:9,
				colTitle:["barcode","no_fa","kode_lokasi","nama","merk","tipe","no_seri","nilai","tgl_perolehan","no_bast","tgl_bast","no_po","kode_vendor","tgl_garansi","no_polis","kode_gedung","kode_prodi","kode_pnj","kode_fungsi","kode_jenis","kode_status","kode_kondisi","kode_ruang"],
				colFormat:[[7],[cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,14,690,280],labelWidth:0,tag:9,readOnly:true});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		setTipeButton(tbAllFalse);				
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		this.flagDokFree = "0"; 
		var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
		if (typeof data == "object"){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																						
				if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
			}
		}
		
	}
};
window.app_saku2_transaksi_kopeg_fa_fVaLoad.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_fa_fVaLoad.implement({		
	doAfterUpload: function(sender, result, data){		
	    try{   					    
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));				
				this.sgn.rearrange();
				this.sgn.activePage = 0;								
			}else throw(data);		
			this.doCek();					
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			var total = parseFloat(line.nilai);
			this.sg1.appendData([line.barcode,line.no_fa,line.kode_lokasi,line.nama,line.merk,line.tipe,line.no_seri,floatToNilai(line.nilai),line.tgl_perolehan,line.no_bast,line.tgl_bast,line.no_po,line.kode_vendor,line.tgl_garansi,line.no_polis,line.kode_gedung,line.kode_prodi,line.kode_pnj,line.kode_fungsi,line.kode_jenis,line.kode_status,line.kode_kondisi,line.kode_ruang]);
		}
		this.sg1.setNoUrut(start);		
	},
	doCek:function(sender){										
		try {	
			this.stsSimpan = "0";
			var line; var strSQL = "";
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();																																														
			sql.add("delete from va_fa_asset where no_bukti = '"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");			
			
			var total = 0;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				sql.add("insert into va_fa_asset(no_bukti,barcode,no_fa,kode_lokasi,nama,merk,tipe,no_seri,nilai,tgl_perolehan,no_bast,tgl_bast,no_po,kode_vendor,tgl_garansi,no_polis,kode_gedung,kode_prodi,kode_pnj,kode_fungsi,kode_jenis,kode_status,kode_kondisi,kode_ruang,tgl_input,nik_user) values "+
						"('"+this.app._userLog+"','"+line.barcode+"','"+line.no_fa+"','"+line.kode_lokasi+"','"+line.nama+"','"+line.merk+"','"+line.tipe+"','"+line.no_seri+"',"+line.nilai+",'"+line.tgl_perolehan+"','"+line.no_bast+"','"+line.tgl_bast+"','"+line.no_po+"','"+line.kode_vendor+"','"+line.tgl_garansi+"','"+line.no_polis+"','"+line.kode_gedung+"','"+line.kode_prodi+"','"+line.kode_pnj+"','"+line.kode_fungsi+"','"+line.kode_jenis+"','"+line.kode_status+"','"+line.kode_kondisi+"','"+line.kode_ruang+"',getdate(),'"+this.app._userLog+"')");							
				var total = parseFloat(line.nilai);
			}												
			this.dbLib.execArraySQL(sql);												
			this.e_total.setText(floatToNilai(total));
			
			var temu = false; var msg  = ""; this.e_memo.setText("");			
			strSQL = "select a.no_fa from va_fa_asset a left join fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+					 
			         "where b.no_fa is null and a.no_bukti = '"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					temu = true;
					msg+= "No FA (Kartu) tidak terdaftar. [kode : "+line.no_fa+"]\n";
				}
			}
			strSQL = "select a.kode_gedung from va_fa_asset a left join va_gedung b on a.kode_gedung=b.kode_gedung and a.kode_lokasi=b.kode_lokasi "+					 
			         "where b.kode_gedung is null and a.no_bukti = '"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					temu = true;
					msg+= "Kode Gedung tidak terdaftar. [kode : "+line.kode_gedung+"]\n";
				}
			}
			strSQL = "select a.kode_prodi from va_fa_asset a left join va_prodi b on a.kode_prodi=b.kode_prodi and a.kode_lokasi=b.kode_lokasi "+					 
			         "where b.kode_prodi is null and a.no_bukti = '"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					temu = true;
					msg+= "Kode Prodi tidak terdaftar. [kode : "+line.kode_prodi+"]\n";
				}
			}
			strSQL = "select a.kode_pnj from va_fa_asset a left join va_pnj b on a.kode_pnj=b.kode_pnj and a.kode_lokasi=b.kode_lokasi "+					 
			         "where b.kode_pnj is null and a.no_bukti = '"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					temu = true;
					msg+= "Kode Prodi tidak terdaftar. [kode : "+line.kode_pnj+"]\n";
				}
			}
			strSQL = "select a.kode_fungsi from va_fa_asset a left join va_fungsi b on a.kode_fungsi=b.kode_fungsi and a.kode_lokasi=b.kode_lokasi "+					 
			         "where b.kode_fungsi is null and a.no_bukti = '"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					temu = true;
					msg+= "Kode Fungsi tidak terdaftar. [kode : "+line.kode_fungsi+"]\n";
				}
			}
			strSQL = "select a.kode_jenis from va_fa_asset a left join fa_klp b on a.kode_jenis=b.kode_klpfa and a.kode_lokasi=b.kode_lokasi "+					 
			         "where b.kode_klpfa is null and a.no_bukti = '"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					temu = true;
					msg+= "Kode Jenis tidak terdaftar. [kode : "+line.kode_jenis+"]\n";
				}
			}
			strSQL = "select a.kode_status from va_fa_asset a left join va_status b on a.kode_status=b.kode_status and a.kode_lokasi=b.kode_lokasi "+					 
			         "where b.kode_status is null and a.no_bukti = '"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					temu = true;
					msg+= "Kode Status tidak terdaftar. [kode : "+line.kode_status+"]\n";
				}
			}
			strSQL = "select a.kode_kondisi from va_fa_asset a left join va_kondisi b on a.kode_kondisi=b.kode_kondisi and a.kode_lokasi=b.kode_lokasi "+					 
			         "where b.kode_kondisi is null and a.no_bukti = '"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					temu = true;
					msg+= "Kode Kondisi tidak terdaftar. [kode : "+line.kode_kondisi+"]\n";
				}
			}
			strSQL = "select a.kode_ruang from va_fa_asset a left join va_ruang b on a.kode_ruang=b.kode_ruang and a.kode_lokasi=b.kode_lokasi "+					 
			         "where b.kode_ruang is null and a.no_bukti = '"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					temu = true;
					msg+= "Kode Ruang tidak terdaftar. [kode : "+line.kode_ruang+"]\n";
				}
			}
			
			if (!temu) {						
				setTipeButton(tbSimpan);
			}
			else {				
				this.e_memo.setText(msg);
				setTipeButton(tbAllFalse);
				system.alert(this,"Transaksi tidak valid.","Lihat daftar kesalahan.");
				this.pc1.setActivePage(this.pc1.childPage[1]);
			}
		} catch(e) { 
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbAllFalse);
					this.pc1.setActivePage(this.pc1.childPage[0]);
				}
				break;
			case "simpan" :			
					if (this.flagDokFree == "1") {				
						var data = this.dbLib.getDataProvider("select no_bukti from va_load_m where no_dokumen='"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){
								system.alert(this,"No Dokumen sudah terpakai.","Terpakai di no bukti : "+line.no_bukti);
								return false;
							} 
						}
					}
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);					
					if (nilaiToFloat(this.e_total.getText()) <= 0) {
						system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
						return false;						
					}					
					this.stsSimpan = "1";
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'va_load_m','no_bukti',this.app._lokasi+"-FALD"+this.e_periode.getText().substr(2,4)+".",'000'));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							
							sql.add("insert into va_load_m(no_bukti,no_dokumen,kode_lokasi,periode,tanggal,keterangan,total,nik_user,tgl_input) values "+ 
									"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+parseNilai(this.e_total.getText())+"','"+this.app._userLog+"',getdate())");							
							sql.add("update va_fa_asset set no_bukti='"+this.e_nb.getText()+"' where no_bukti='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");
																					
															
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'va_load_m','no_bukti',this.app._lokasi+"-FALD"+this.e_periode.getText().substr(2,4)+".",'000'));
			this.e_dok.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){				
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){						
						if (this.stsSimpan=="1") {							
							this.nama_report="server_report_saku2_aka_rptLoadVeat";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbAllFalse);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} catch(e) {
			alert(e);
		}
	}
});
