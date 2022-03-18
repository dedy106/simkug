window.app_saku3_transaksi_sla_fKartuPinj = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sla_fKartuPinj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sla_fKartuPinj";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kartu Pinjaman", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_cocd = new portalui_saiCBBL(this,{bound:[41,10,220,20],caption:"Data CoCd",tag:2, multiSelection:false , change:[this,"doChange"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Kartu","Daftar Kartu"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:9,
		            colTitle:["No Kartu","Kode Mitra","Nama","Nilai"],
					colWidth:[[3,2,1,0],[100,250,100,100]],
					readOnly:true,colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad1"]});		
			
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No SLA",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_dok = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,500,20],caption:"Nomor Dokumen",maxLength:50});
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,500,20],caption:"Deskripsi",maxLength:200});
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,20,995,327], childPage:["Data MoU","Schedule Angsuran","Rekap Pinjaman","Upload Dokumen"]});						
		this.cb_mitra = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Data Mitra",tag:1, multiSelection:false, change:[this,"doChange"]});
		this.cb_class = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Classification",tag:1, multiSelection:false , change:[this,"doChange"]});
		this.cb_mou = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,300,20],caption:"M o U",tag:1, multiSelection:false,change:[this,"doChange"]});
		this.e_curr = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Currency",tag:1,readOnly:true});									
		this.e_nilaimou = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Nilai",tag:1,readOnly:true,tipeText:ttNilai,text:"0"});									
		this.e_real = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,20,200,20],caption:"Realisasi",tag:1,readOnly:true,tipeText:ttNilai,text:"0"});											
		this.e_sisa = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,21,200,20],caption:"Sisa MoU",tag:1,readOnly:true,tipeText:ttNilai,text:"0"});											

		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:8,tag:0,
				colTitle:["Tgl Schedule","Akru. Bunga","Cicilan Pokok","Total Kas","Saldo Loan","Beban Bunga","Amortisasi","Ni. Tercatat Loan"],
				colWidth:[[7,6,5,4,3,2,1,0],[120,120,120,120,120,120,120,80]],
				columnReadOnly:[true,[0],[]],				
				colFormat:[[1,2,3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				pasteEnable:true,afterPaste:[this,"doAfterPaste"],
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});
				
		this.l_tgl1 = new portalui_label(this.pc2.childPage[2],{bound:[20,11,100,18],caption:"Tanggal Perjanjian", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc2.childPage[2],{bound:[120,11,100,18]}); 		
		this.c_perbunga = new saiCB(this.pc2.childPage[2],{bound:[20,12,200,20],caption:"Periode Bunga",items:["Kuartalan","Bulanan"], readOnly:true,tag:2});		
		this.c_tipe = new saiCB(this.pc2.childPage[2],{bound:[20,13,200,20],caption:"Type of Interest",items:["Floating","Fixed"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_rate = new portalui_saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"Jenis Rate",tag:2, multiSelection:false});
		this.e_bunga = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,14,200,20],caption:"Rate of Interest %",tipeText:ttNilai, text:"0"});		
		this.e_jamin = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,13,500,20],caption:"Jaminan",tag:2,maxLength:200});		
		this.e_nilai = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,29,200,20],caption:"Nilai Nominal", tipeText:ttNilai, text:"0", readOnly:true});
		this.e_nbiaya = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,26,200,20],caption:"Biaya Transaksi", tipeText:ttNilai, text:"0", readOnly:true});
		this.e_total = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,27,200,20],caption:"Ni Tercatat Loan", tipeText:ttNilai, text:"0", readOnly:true});
		this.e_thntempo = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,16,200,20],caption:"Jth Tempo(Tahun)",tipeText:ttAngka, text:"",readOnly:true});	
		this.e_basis = new portalui_saiLabelEdit(this.pc2.childPage[2],{bound:[20,17,200,20],caption:"Basis Hari",tag:2, tipeText:ttNilai, text:"0"});		
		
		this.sgUpld = new saiGrid(this.pc2.childPage[3],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5, tag:9,
				colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
				colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
				columnReadOnly:[true,[0,1,2,3,4],[]],					
				colFormat:[[3,4],[cfUpload,cfButton]], 
				buttonStyle:[[0],[bsEllips]], 	
				click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
				ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc2.childPage[3],{bound:[1,this.pc2.height - 25,this.pc2.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc2.childPage[3],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
			colTitle:["namaFile","status"],
			colWidth:[[1,0],[80,180]],
			readOnly: true,autoAppend:false,defaultRow:1});
			
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		this.pc2.childPage[0].rearrangeChild(10, 23);		
		this.pc2.childPage[2].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.c_tipe.setText("");
			this.stsSimpan = 1;			
			
			this.cb_class.setSQL("select kode_class,nama from sla_class ",["kode_class","nama"],false,["Kode","Nama"],"and","Classification",true);									
			this.cb_cocd.setSQL("select cocd,company_name from mysym_company_code",["cocd","company_name"],false,["Kode","Nama"],"and","Data CoCd",true);									
			this.cb_mitra.setSQL("select kode_mitra,nama from sla_mitra ",["kode_mitra","nama"],false,["Kode","Nama"],"and","Data Mitra",true);									
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sla_fKartuPinj.extend(window.portalui_childForm);
window.app_saku3_transaksi_sla_fKartuPinj.implement({
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
		if (sender == this.sgUpld && col == 3){ 
			if (this.uploadedFiles == undefined) this.uploadedFiles = "";
			if (this.uploadedFiles != "") this.uploadedFiles +=";";
			this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
			this.sgUpld.cells(2,row, data.tmpfile);       
			this.sgUpld.cells(4,row, "DownLoad");                
					}
			}catch(e){
					alert(e+" "+data);
			}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
													"select kode_jenis,nama   from sla_dok_jenis where kode_cocd = '"+this.cb_cocd.getText()+"'",
													"select count(kode_jenis) from sla_dok_jenis where kode_cocd = '"+this.cb_cocd.getText()+"'",
													["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4)
				window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},
	doAfterPaste: function(sender,totalRow){
		try {			
			totAmor = 0;
			for (var i=0;i < this.sg.rows.getLength();i++){						
				totAmor += nilaiToFloat(this.sg.cells(6,i));
			}			
			var j = i-1;
			this.e_thntempo.setText(this.sg.cells(0,j).substr(6,4));
			this.e_nilai.setText(this.sg.cells(4,0));
			this.e_nbiaya.setText(floatToNilai(Math.round(totAmor)));
			var selisih = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_nbiaya.getText());
			this.e_total.setText(floatToNilai(selisih));
		} catch(e) {alert(e);}
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from sla_kkp_m where no_sla = '"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
						sql.add("delete from sla_kkp_d where no_sla = '"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
						sql.add("delete from sla_dok where no_bukti='"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
					}
					
					var period = this.dp_d1.getText().substr(6,4) + this.dp_d1.getText().substr(3,2);
					sql.add("insert into sla_kkp_m (no_sla,kode_mitra,no_dok,keterangan,nik_user,tgl_input,kode_curr,progress,nilai,biaya,bunga,basis,tanggal,kode_class,periode,kode_cocd, periode_bunga,tipe_rate,kode_rate,kode_mou,jaminan) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_mitra.getText()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"',getdate(),'"+this.e_curr.getText()+"','1',"+nilaiToFloat(this.e_nilai.getText())+",'"+nilaiToFloat(this.e_nbiaya.getText())+"',"+nilaiToFloat(this.e_bunga.getText())+","+nilaiToFloat(this.e_basis.getText())+",'"+this.dp_d1.getDateString()+"','"+this.cb_class.getText()+"','"+period+"','"+this.cb_cocd.getText()+"','"+this.c_perbunga.getText()+"','"+this.c_tipe.getText()+"','"+this.cb_rate.getText()+"','"+this.cb_mou.getText()+"','"+this.e_jamin.getText()+"')");

					var tgl = vPeriod	= "";
					for (var i=0; i < this.sg.getRowCount(); i++){					
					  vPeriod = this.sg.cells(0,i).substr(6,4) + this.sg.cells(0,i).substr(3,2);
					  tgl = this.sg.cells(0,i).substr(6,4) +"-"+ this.sg.cells(0,i).substr(3,2) +"-"+ this.sg.cells(0,i).substr(0,2);
					  sql.add("insert into sla_kkp_d (no_sla,kode_cocd,nu,periode,tgl_tempo,ci_bunga,ci_pokok,ci_total,saldo,beban,amor,saldo_amor,no_bayar) values "+
					  		  "('"+this.e_nb.getText()+"','"+this.cb_cocd.getText()+"',"+i+",'"+vPeriod+"','"+tgl+"',"+nilaiToFloat(this.sg.cells(1,i))+","+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+",'-')");
					}

					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}																					
							sql.add("insert into sla_dok(no_bukti,no_gambar,nu,kode_jenis,kode_cocd,no_ref,form) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+i+"','"+this.sgUpld.cells(0,i)+"','"+this.cb_cocd.getText()+"','"+this.e_nb.getText()+"','SLA_PINJ')");								
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);		
					this.sg.clear(1);					
				}
				break;
			
			case "simpan" :	
			case "ubah" :	
				this.simpan();
				break;
			
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from sla_kkp_m where no_sla = '"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
				sql.add("delete from sla_kkp_d where no_sla = '"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
				sql.add("delete from sla_dok where no_bukti='"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);								
				break;				
		}
	},
	doChange: function(sender){
		try{		
			if (sender == this.c_tipe && this.c_tipe.getText()!= "") {
				if (this.c_tipe.getText() == "Floating") 
					this.cb_rate.setSQL("select kode_rate,nama from sla_rate_jenis where kode_rate <> 'FIXED' ",["kode_rate","nama"],false,["Kode","Nama"],"and","Data Jenis Rate",true);									
				else this.cb_rate.setSQL("select kode_rate,nama from sla_rate_jenis where kode_rate = 'FIXED' ",["kode_rate","nama"],false,["Kode","Nama"],"and","Data Jenis Rate",true);									
			}

			if (sender == this.cb_cocd && this.cb_cocd.getText() != "" && this.stsSimpan == 1) this.doClick();
			
			if ((sender == this.cb_cocd || sender == this.cb_mitra || sender == this.cb_class) && this.cb_cocd.getText()!="" && this.cb_mitra.getText()!="" && this.cb_class.getText()!="" ) {
				var strSQL = "select a.kode_mou,a.nama from sla_mou a "+					 
							 "where a.kode_cocd='"+this.cb_cocd.getText()+"' and a.kode_mitra='"+this.cb_mitra.getText()+"' and kode_class='"+this.cb_class.getText()+"'";
				this.cb_mou.setSQL(strSQL,["kode_mou","nama"],false,["ID MoU","Deskripsi"],"and","Data MoU",true);									
			} 

			if (sender == this.cb_mou && this.cb_mou.getText() != "") {
				var strSQL = "select a.kode_curr,a.nilai,isnull(b.realisasi,0) as realisasi,a.nilai-isnull(b.realisasi,0) as sisa "+
							 "from sla_mou a "+

							 "		left join ( "+
							 "          select kode_mou,sum(nilai) as realisasi "+
							 "			from sla_kkp_m where no_sla <> '"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'  "+							 
							 "			group by kode_mou "+
							 "		) b on a.kode_mou=b.kode_mou "+

						     "where a.kode_mou ='"+this.cb_mou.getText()+"' and a.kode_cocd='"+this.cb_cocd.getText()+"' ";		
							 				   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_curr.setText(line.kode_curr);
						this.e_nilaimou.setText(floatToNilai(line.nilai));	
						this.e_real.setText(floatToNilai(line.realisasi));								
						this.e_sisa.setText(floatToNilai(line.sisa));						
					}										
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doClick:function(sender){
		try {			
			if (this.cb_cocd.getText() != "") {
				var thn = this.dp_d1.getDateString().substr(2,2);
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sla_kkp_m","no_sla",this.cb_cocd.getText()+"-"+thn+".","0000"));		
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);
			}
			else system.info(this,"Data CoCd harus terisi.","Pilih data CoCd.");
		}
		catch (e) {
			alert(e);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {		
								
								for (var i=0;i < this.sgFile.getRowCount();i++){
									if (this.sgFile.cells(1,i) == "HAPUS") {
										this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
									}
								}

								//this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
								this.pc1.hide();   
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}					
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
			this.sg1.clear(1); this.sg.clear(1); 
			this.sgUpld.clear(1);
			this.sgFile.clear();		
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},
	doLoad1:function(sender){																					
		var strSQL = "select a.no_sla,a.kode_mitra,c.nama,a.nilai "+
		             "from sla_kkp_m a inner join sla_mitra c on a.kode_mitra=c.kode_mitra "+					 
					 "where a.kode_cocd='"+this.cb_cocd.getText()+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU1 = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData1(1);
		} else this.sg1.clear(1);			
	},
	doTampilData1: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];													
			this.sg1.appendData([line.no_sla,line.kode_mitra,line.nama,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg1.cells(0,row));								
								
				var strSQL = "select * from sla_kkp_m "+							 
							 "where no_sla = '"+this.e_nb.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
						this.e_curr.setText(line.kode_curr);
						this.cb_class.setText(line.kode_class);
						this.cb_mitra.setText(line.kode_mitra);
						this.cb_mou.setText(line.kode_mou);

						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_nbiaya.setText(floatToNilai(line.biaya));
						var selisih = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_nbiaya.getText());
						this.e_total.setText(floatToNilai(selisih));

						this.dp_d1.setText(line.tanggal);						
						this.e_dok.setText(line.no_dok);
						this.e_ket.setText(line.keterangan);
						this.c_perbunga.setText(line.periode_bunga);
						this.c_tipe.setText(line.tipe_rate);
						this.cb_rate.setText(line.kode_rate);
						this.e_jamin.setText(line.jaminan);
						this.e_bunga.setText(floatToNilai(line.bunga));
						this.e_basis.setText(floatToNilai(line.basis));
						this.e_nilai.setText(floatToNilai(line.nilai));
						
						var strSQL = "select *,convert(varchar,tgl_tempo,105) as tgl from sla_kkp_d where kode_cocd='"+this.cb_cocd.getText()+"' and no_sla='"+this.e_nb.getText()+"' order by nu";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];																										
								this.sg.appendData([line.tgl,floatToNilai(line.ci_bunga),floatToNilai(line.ci_pokok),floatToNilai(line.ci_total),floatToNilai(line.saldo),floatToNilai(line.beban),floatToNilai(line.amor),floatToNilai(line.saldo_amor)]);
							}
						} else this.sg.clear(1);													
						
						var j = i-1;
						this.e_thntempo.setText(this.sg.cells(0,j).substr(6,4));

						this.sgUpld.clear(); this.sgFile.clear();															
						var data = this.dbLib.getDataProvider(
								"select b.kode_jenis,b.nama,a.no_gambar from sla_dok a inner join sla_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_cocd=b.kode_cocd "+
								"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_cocd='"+this.cb_cocd.getText()+"' order by a.nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgUpld.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sgFile.appendData([line.no_gambar,"HAPUS"]);
								this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);
							}
						} else this.sgUpld.clear(1);

					}
				}					
			}									
		} catch(e) {alert(e);}
	}	
	
});

