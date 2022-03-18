window.app_saku2_transaksi_kopeg_kbitt_fAjuKBBrutoMrekNGar = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fAjuKBBrutoMrekNGar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fAjuKBBrutoMrekNGar";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Kas Operasional DRK: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,200,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 
		this.c_jenis = new saiCB(this,{bound:[20,11,202,20],caption:"Kode Transaksi",items:["UMUM"], readOnly:true,tag:2, visible:false});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});		
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,11,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 		
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,12,220,20],caption:"MTA",tag:2,multiSelection:false,change:[this,"doChange"]});         		
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,14,220,20],caption:"NIK Approve",tag:1,multiSelection:false});         				
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Total Bruto", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		this.e_npajak = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Total Pajak", tag:0, tipeText:ttNilai, text:"0" , readOnly:true});
		this.c_status = new saiCB(this,{bound:[20,20,200,20],caption:"Status Pajak",items:["NON","P21","P23"], readOnly:true,tag:2});				
		this.e_user = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"User input", maxLength:50});								
		this.e_file = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"File", readOnly:true, tag:9});		
		this.uploader = new uploader(this,{bound:[489,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,185], childPage:["Daftar Rekening"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
				colTitle:["Bruto","Pot Pajak","Netto","Bank","Nama Rekening","No Rekening"],
				colWidth:[[5,4,3,2,1,0],[200,200,200,90,80,80]],
				columnReadOnly:[true,[2],[0,1,3,4,5]],				
				colFormat:[[0,1,2],[cfNilai,cfNilai,cfNilai]],												
				afterPaste:[this,"doAfterPaste"],
				pasteEnable:true,autoPaging:true,rowPerPage:200,
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1,pager:[this,"doPage1"]});
				
		this.rearrangeChild(10, 23);
				
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			if (this.app._userStatus == "A") this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);
			else this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
								   "where a.flag_aktif ='1' and a.tipe = 'Posting' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);			
			this.cb_pp.setText(this.app._kodePP);
			
			this.e_user.setText(this.app._namaUser);
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							  "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fAjuKBBrutoMrekNGar.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fAjuKBBrutoMrekNGar.implement({	
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var netto = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_npajak.getText());
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,nik_app) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','-','"+this.e_ket.getText()+"',"+netto+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','A','-','-','"+this.e_user.getText()+"','NONCEK','"+this.c_status.getText()+"',"+nilaiToFloat(this.e_npajak.getText())+",'"+this.cb_app.getText()+"')");					
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,pajak,keterangan) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(5,i)+"','"+this.sg1.cells(4,i)+"','-',"+nilaiToFloat(this.sg1.cells(2,i))+","+nilaiToFloat(this.sg1.cells(1,i))+",'-')");										
							}
						}
					}
										
					sql.add("insert into it_aju_dok(no_bukti,modul,no_gambar,kode_lokasi)values('"+this.e_nb.getText()+"','AJUBBN','"+this.e_file.getText()+"','"+this.app._lokasi+"')");
					
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
					this.sg1.clear(1);
					setTipeButton(tbSimpan);					
				break;
			case "simpan" :									
				if (nilaiToFloat(this.e_npajak.getText()) != 0 && this.c_status.getText() == "NON") {
					system.alert(this,"Transaksi tidak valid.","Status NON jika Total Pajak nol.");
					return false;						
				}
				if (nilaiToFloat(this.e_npajak.getText()) == 0 && this.c_status.getText() != "NON") {
					system.alert(this,"Transaksi tidak valid.","Status NON jika Total Pajak nol.");
					return false;						
				}																
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
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_pp.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){
		if ((sender == this.cb_pp ||sender == this.e_periode)  && this.cb_pp.getText() !="" && this.e_periode.getText() !="") {
				this.cb_akun.setSQL("select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"where b.kode_flag in ('058') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);													
		}		
	},
	doChangeCell: function(sender, col , row) {
		if (sender == this.sg1) {
			if (col == 0 || col == 1) {						
				if (sender.cells(0,row) != "" && sender.cells(1,row) != "") {
					var neto = nilaiToFloat(sender.cells(0,row)) - nilaiToFloat(sender.cells(1,row));
					sender.cells(2,row,neto)
				}
				this.sg1.validasi();
			}
		}
	},
	doNilaiChange: function(){
		try{			
			var totB = totP = 0;			
			for (var i=0;i < this.sg1.getRowCount();i++){
				if (this.sg1.cells(0,i) != "" && this.sg1.cells(1,i) != "") {
					totB += nilaiToFloat(this.sg1.cells(0,i));
					totP += nilaiToFloat(this.sg1.cells(1,i)); 
				}
			}									
			this.e_nilai.setText(floatToNilai(totB));
			this.e_npajak.setText(floatToNilai(totP));
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
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
							
							this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormTu2";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
							this.filter2 = this.e_periode.getText()+"/";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);						
			setTipeButton(tbSimpan);			
			this.sg1.clear(1);
		} catch(e) {
			alert(e);
		}
	}
});