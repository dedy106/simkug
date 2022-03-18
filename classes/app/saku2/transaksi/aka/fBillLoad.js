window.app_saku2_transaksi_aka_fBillLoad = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fBillLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_aka_fBillLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Tagihan : Proses", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Load", readOnly:true});					
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});			
		this.cb_pp = new saiCBBL(this,{bound:[20,14,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});
		this.cb_drk = new saiCBBL(this,{bound:[20,15,200,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});
		this.bUpload = new portalui_uploader(this,{bound:[820,15,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,354],caption:"Data Billing Mahasiswa"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:11,
				colTitle:["NIM","Nama","Jalur","Beasiswa","Status","Prodi","Angkatan","BPP","UP3","SDP2","Total"],
				colFormat:[[7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		this.cb_pp.setSQL("select kode_pp, nama from pp where tipe ='posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Pusat Pertanggungjawaban",true);		

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
			
		setTipeButton(tbSimpan);				
	}
};
window.app_saku2_transaksi_aka_fBillLoad.extend(window.portalui_childForm);
window.app_saku2_transaksi_aka_fBillLoad.implement({
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
			
			var line;
			this.bpp=this.up3=this.sdp2 = 0;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				this.bpp = this.bpp + parseFloat(line.bpp);
				this.up3 = this.up3 + parseFloat(line.up3);
				this.sdp2 = this.sdp2 + parseFloat(line.sdp2);
			}
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
			this.sg1.appendData([
			line.nim,line.nama,line.jalur,line.beasiswa,line.status,line.prodi,line.angkatan,floatToNilai(line.bpp),floatToNilai(line.up3),floatToNilai(line.sdp2),floatToNilai(line.total)]);
		}
		this.sg1.setNoUrut(start);
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
					var page = 1;
					this.dataMHS = new arrayMap();
					var data = this.dbLib.getDataProvider("select count(nim) as tot from aka_mahasiswa", true);
					if (typeof data != "string") totPage = Math.ceil(data.rs.rows[0].tot / 1000);
					for (var page=1; page <= totPage; page++){  
						var data = this.dbLib.getDataProviderPage("select nim from aka_mahasiswa",page, 1000, true);			
						if (typeof data == "object"){
							this.dataJU = data;			
							for (var i in this.dataJU.rs.rows){
								line = this.dataJU.rs.rows[i];
								this.dataMHS.set(line.nim, line);
							}
						}
					}					
					for (var j=0; j < this.dataUpload.rows.length;j++){
						line1 = this.dataUpload.rows[j];
						if (this.dataMHS.get(line1.nim) == undefined) {
							system.alert(this,"Transaksi tidak valid.","NIM tidak terdaftar. [kode "+line1.nik+" - "+(j+2).toString()+"]");							
							return false;						
						}						
					}
					
					
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_bill_m','no_bill',this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".",'000'));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							
							sql.add("insert into aka_bill_m(no_bill,no_dokumen,kode_lokasi,periode,tanggal,keterangan,kode_pp,kode_drk,jenis,posted,nik_user,tgl_input) values "+ 
									"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BLOAD','F','"+this.app._userLog+"',getdate())");						
							var line;
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];
								sql.add("insert into aka_bill_load(no_bill,jenis,kode_lokasi,periode,nim,nama,kode_jalur,flag_bea,flag_status,kode_jur,kode_akt,bpp,up3,sdp2) values "+
										"	('"+this.e_nb.getText()+"','BLOAD','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+line.nim+"','"+line.nama+"','"+line.jalur+"','"+line.beasiswa+"','"+line.status+"','"+line.prodi+"','"+line.angkatan+"',"+parseNilai(line.bpp)+","+parseNilai(line.up3)+","+parseNilai(line.sdp2)+")");
							}							
							
							sql.add("insert into aka_bill_d (no_bill,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut) "+
									"select b.no_bill,b.kode_lokasi,b.no_bill+'-'+b.nim,b.nim,'"+this.e_periode.getText()+"','BPP', a.akun_piutang,a.akun_pdpt,a.akun_pdd,b.bpp as nilai,'"+this.e_periode.getText()+"' "+
									"from aka_bill_load b inner join aka_produk a on 'BPP' = a.kode_produk and b.kode_lokasi=a.kode_lokasi "+
									"where b.no_bill = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select b.no_bill,b.kode_lokasi,b.no_bill+'-'+b.nim,b.nim,'"+this.e_periode.getText()+"','UP3', a.akun_piutang,a.akun_pdpt,a.akun_pdd,b.up3 as nilai,'"+this.e_periode.getText()+"' "+
									"from aka_bill_load b inner join aka_produk a on 'UP3' = a.kode_produk and b.kode_lokasi=a.kode_lokasi "+
									"where b.no_bill = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' "+
									"union "+
									"select b.no_bill,b.kode_lokasi,b.no_bill+'-'+b.nim,b.nim,'"+this.e_periode.getText()+"','SDP2', a.akun_piutang,a.akun_pdpt,a.akun_pdd,b.sdp2 as nilai,'"+this.e_periode.getText()+"' "+
									"from aka_bill_load b inner join aka_produk a on 'SDP2' = a.kode_produk and b.kode_lokasi=a.kode_lokasi "+
									"where b.no_bill = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' ");
							
							var data = this.dbLib.getDataProvider("select kode_produk,akun_piutang,akun_pdpt,akun_pdd from aka_produk where kode_lokasi='"+this.app._lokasi+"'",true);
							if (typeof data == "object" && data.rs.rows[0] != undefined){
								var line; var nilai = 0; var akunCR = ""; var jenis = "";
								for (var i in data.rs.rows){
									line = data.rs.rows[i];							
									if (line.kode_produk.toUpperCase() == "BPP") {
										nilai = this.bpp;
										akunCR = line.akun_pdd;
										jenis = "BPP";
									} 
									if (line.kode_produk.toUpperCase() == "UP3") {
										nilai = this.up3;
										akunCR = line.akun_pdpt;
										jenis = "UP3";
									} 
									if (line.kode_produk.toUpperCase() == "SDP2") {
										nilai = this.sdp2;
										akunCR = line.akun_pdpt;
										jenis = "SDP2";
									}
									sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) values "+
												"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',0,'"+line.akun_piutang+"','"+this.e_ket.getText()+"','D',"+nilai+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BLOAD','PIUT"+jenis+"','"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate())");
									sql.add("insert into aka_bill_j(no_bill,kode_lokasi,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,modul,jenis,periode,no_dokumen,kode_curr,kurs,nik_user,tgl_input) values "+
												"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',1,'"+akunCR+"','"+this.e_ket.getText()+"','C',"+nilai+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','BLOAD','PDPT"+jenis+"','"+this.e_periode.getText()+"','-','IDR',1,'"+this.app._userLog+"',getdate())");									
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
	doChange: function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="")
			this.cb_drk.setSQL("select kode_drk, nama from drk where tipe ='posting' and kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_periode.getText().substr(0,4)+"' ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
	},
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_bill_m','no_bill',this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".",'000'));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},		
	/*
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
	*/
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){						
						if (this.stsSimpan=="1") {							
							this.nama_report="server_report_saku2_aka_rptBillJurnal";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
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
							//this.pc1.hide();							
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
				//this.pc1.show();   
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
		} catch(e) {
			alert(e);
		}
	}
});