window.app_saku3_transaksi_yspt_simak_fKbBillKoreksi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_simak_fKbBillKoreksi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_simak_fKbBillKoreksi";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Koreksi Billing KasBank", 0);	
		
		uses("portalui_saiMemo;portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.cb_pp = new saiCBBL(this,{bound:[20,17,220,20],caption:"Sekolah", readOnly:true, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Periode", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_akun = new saiCBBL(this,{bound:[20,13,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_total = new saiLabelEdit(this,{bound:[790,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this,{bound:[5,12,1000,360], childPage:["Data Tagihan"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
		            colTitle:["NIS","No Ref","Parameter","Nilai Koreksi","NIS-Valid","Param-Valid"],					
					colWidth:[[5,4,3,2,1,0],[100,100,100,100,150,100]],					
					colFormat:[[3],[cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],					
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
					nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	
				
		this.sgJ = new saiGrid(this.pc1.childPage[0],{bound:[100,50,500,200],colCount:3,tag:0,visible:false,
			colTitle:["Parameter","Akun Piutang","Nilai"],					
			colWidth:[[2,1,0],[100,100,100]],					
			colFormat:[[2],[cfNilai]],
			readOnly:true,autoAppend:false,defaultRow:1});

		this.rearrangeChild(10, 23);		
		setTipeButton(tbSimpan);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
			this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.kode_lokasi='"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode","Nama"],"where","Daftar Akun",true);			

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};

window.app_saku3_transaksi_yspt_simak_fKbBillKoreksi.extend(window.childForm);
window.app_saku3_transaksi_yspt_simak_fKbBillKoreksi.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			var tot = 0;
			for (var i=0; i < this.sg.getRowCount();i++){
				tot += nilaiToFloat(this.sg.cells(3,i));
			}	
			this.e_total.setText(floatToNilai(tot));


			this.sgJ.clear();
			var nilai = 0;
			for (var i=0;i < this.sg.rows.getLength();i++){						
				if (this.sg.rowValid(i)) {
					nilai = nilaiToFloat(this.sg.cells(3,i));
					var isAda = false;
					var idx = totalnilai = 0;
					for (var j=0;j < this.sgJ.getRowCount();j++){
						if (this.sg.cells(2,i) == this.sgJ.cells(0,j)) {
							isAda = true;
							idx = j;
							break;
						}
					}
					
					if (!isAda) {
						this.sgJ.appendData([this.sg.cells(2,i),"-",floatToNilai(nilai)]);
					} 
					else { 
						totalnilai = nilaiToFloat(this.sgJ.cells(2,idx));
						totalnilai = totalnilai + nilai;
						this.sgJ.setCell(2,idx,totalnilai);
					}								
				}
			}

			for (var i = 0; i < this.sgJ.rows.getLength();i++){
				if (this.sgJ.rowValid(i)) {				
					var strSQL = "select akun_piutang from sis_param where kode_param='"+this.sgJ.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"' ";
					var data0 = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data0 == "object"){
						var line0 = data0.rs.rows[0];		
						if (line0 != undefined){
							this.sgJ.cells(1,i,line0.akun_piutang);
						}						
					}	
						
				}
			}

			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();	

			this.doCekDataSiswa();

		} catch(e) {alert(e);}
	},
	doPager: function(sender,page){
		this.sg.doSelectPage(page);
	},	
	doCekDataSiswa: function() {		
		var strSQL = "select nis from sis_siswa where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' ";
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataNIS = dataS;
		}
				
		this.inValid = false;		
		for (var i=0; i < this.sg.getRowCount();i++){
			this.sg.cells(4,i,"INVALID");
			for (var j=0;j < this.dataNIS.rs.rows.length;j++){
				if (this.sg.cells(0,i) == this.dataNIS.rs.rows[j].nis) {					
					this.sg.cells(4,i,"VALID");				
				}
			}	
			if (this.sg.cells(4,i) == "INVALID") this.inValid = true;									
		}	


		var strSQL = "select kode_param from sis_param where kode_lokasi='"+this.app._lokasi+"' ";
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataParam = dataS;
		}

		for (var i=0; i < this.sg.getRowCount();i++){
			this.sg.cells(5,i,"INVALID");
			for (var j=0;j < this.dataParam.rs.rows.length;j++){
				if (this.sg.cells(2,i) == this.dataParam.rs.rows[j].kode_param) {					
					this.sg.cells(5,i,"VALID");				
				}
			}	
			if (this.sg.cells(5,i) == "INVALID") this.inValid = true;									
		}	

		if (this.inValid) {
			setTipeButton(tbAllFalse);
		}
		else setTipeButton(tbSimpan);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','KBBILKOR','BK','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");																
						
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_total.getText())+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','KBBILKOR','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_total.getText())+")");

					//jurnal per tanggal transaksi
					for (var i=0;i < this.sgJ.rows.getLength();i++){																									
						sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sgJ.cells(1,i)+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.sgJ.cells(2,i))+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','KBBILKOR','PIUTANG','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sgJ.cells(2,i))+")");													
					}

					//-------------------

					sql.add("INSERT INTO sis_bill_m (no_bill, kode_lokasi, periode, tanggal, keterangan, kode_pp, modul, jenis, kode_curr, kurs, nilai, nik_buat, nik_app, posted, tgl_input, nik_user, kode_tingkat) VALUES "+
							"('"+this.e_nb.getText()+"', '"+this.app._lokasi+"', '"+this.e_periode.getText()+"', '"+this.dp_d1.getDateString()+"', '"+this.e_ket.getText()+"', '"+this.cb_pp.getText()+"', 'KBBILKOR', 'KBBILKOR', 'IDR', 1, "+nilaiToFloat(this.e_total.getText())+", '"+this.app._userLog+"', '"+this.app._userLog+"', 'X', getdate(), '"+this.app._userLog+"', '-') ");

					for (var i=0;i < this.sg.rows.getLength();i++){		
						sql.add("INSERT INTO sis_bill_d (no_bill, kode_lokasi, nis, kode_kelas, kode_param, nilai, dc, periode, akun_piutang, modul, kode_pp, kode_ta, kode_sem, no_ref) VALUES "+
								"('"+this.e_nb.getText()+"', '"+this.app._lokasi+"', '"+this.sg.cells(0,i)+"', 'UPDATE', '"+this.sg.cells(2,i)+"', "+nilaiToFloat(this.sg.cells(3,i))+", 'D', '"+this.e_periode.getText()+"', 'UPDATE', 'KBBILKOR', '"+this.cb_pp.getText()+"', '-', '-', '"+this.sg.cells(1,i)+"')");		
					}
					
					sql.add("update a set a.kode_kelas=b.kode_kelas "+
							"from sis_bill_d a inner join sis_siswa b on a.nis=b.nis and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"'");

					sql.add("update a set a.akun_piutang=b.akun_piutang "+
							"from sis_bill_d a inner join sis_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"'");

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
					this.standarLib.clearByTag(this, new Array("0","1"),this.dp_d1);
					this.sg.clear(1);  this.sgJ.clear(1); 
					this.cb_pp.setText(this.app._kodePP);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
												
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh kurang/sama dengan nol.");
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;					
		this.e_periode.setText(y+""+m)		
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BK"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.cb_akun.setFocus();			
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							//this.nama_report="server_report_saku3_siswa_rptSisJurnalRekonYptNon";
							//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.dp_d1);
			this.sg.clear(1);  this.sgJ.clear(1); 
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});