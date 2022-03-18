window.app_saku2_transaksi_kopeg_gl_fJuLoadTB = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_gl_fJuLoadTB.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_gl_fJuLoadTB";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal TB : Load TB", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_debet = new saiLabelEdit(this,{bound:[700,12,220,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_kredit = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bUpload = new portalui_uploader(this,{bound:[570,17,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,360], childPage:["Data Trial Balance"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:4,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Debet","Kredit"],
					colWidth:[[3,2,1,0],[100,100,200,80]],					
					readOnly:true,colFormat:[[2,3],[cfNilai,cfNilai]],nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
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
		this.dataAkun = this.app._masakun;		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_gl_fJuLoadTB.extend(window.childForm);
window.app_saku2_transaksi_kopeg_gl_fJuLoadTB.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 1000));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);					
   		}catch(e){
   		   this.sg.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 1000;
		var finish = start + 1000;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg.clear();		
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			
			var akun = this.dataAkun.get(line.kode_akun);
			if (!akun) {
				this.sg.clear(1);
				system.alert(this,"Data tidak valid.","Akun '"+line.kode_akun+"' tidak terdaftar.");
				return false;				
			}															
			this.sg.appendData([line.kode_akun,akun,floatToNilai(line.debet),floatToNilai(line.kredit)]);
		}
		this.sg.setNoUrut(start);
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-JU"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','-','JU','LOADTB','IDR',1,"+parseNilai(this.e_debet.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"','T','-','-','-',getdate(),'"+this.app._userLog+"')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (nilaiToFloat(this.sg.cells(2,i)) > 0) {var vDC = "D"; var vNilai = nilaiToFloat(this.sg.cells(2,i));}
								else {var vDC = "C"; var vNilai = nilaiToFloat(this.sg.cells(3,i));}
								sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.e_ket.getText()+"','"+vDC+"',"+vNilai+",'-','-','-','-','-','-','-','-','"+this.app._lokasi+"','JU','LOADTB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-')");
							}
						}
					}
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi); 
					if (this.app._periode == this.e_periode.getText()) var t_gldt = " gldt "; else var t_gldt = " gldt_h ";
					sql.add("insert into "+t_gldt+"(no_bukti,no_urut,kode_lokasi,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,modul,jenis,periode,kode_curr,kurs,nilai_curr,tgl_input,nik_user) "+
							"select no_ju,no_urut,kode_lokasi,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,kode_drk,'-','-','-','-','-','-',modul,jenis,periode,kode_curr,kurs,nilai,getdate(),nik_user "+
							"from ju_j where no_ju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.sg.validasi();																	
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
					return false;						
				}	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi); 				
				if (parseFloat(this.e_periode.getText()) > parseFloat(this.app._periode))
				{
					system.alert(this,"Transaksi tidak valid.","Periode upload melebihi periode sistem (Sistem : "+this.app._periode+").");
					return false;						
				}
				else this.simpan();
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-JU"+this.e_periode.getText().substr(2,4)+".","0000"));		
		setTipeButton(tbSimpan);
	},	
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(2,i) != "") totD += nilaiToFloat(this.sg.cells(2,i));
				if (this.sg.rowValid(i) && this.sg.cells(3,i) != "") totC += nilaiToFloat(this.sg.cells(3,i));
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
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
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});


/*

kode_akun | nama_akun | debet | kredit
---------------------------------------
          |           |       |
		  |           |       |
---------------------------------------
*/