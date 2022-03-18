window.app_saku2_transaksi_kopeg_kbitt_fDokTambahUnit = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fDokTambahUnit.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fDokTambahUnit";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Tambahan Dokumen", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});		
		
		this.e_noaju = new portalui_saiCBBL(this,{bound:[20,11,222,20],caption:"No Agenda",multiSelection:false, tag:0, change:[this,"doChange"]});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,202,20],caption:"Nominal", tipeText:ttNilai, text:"0", readOnly:true});		
		this.e_pp = new saiLabelEdit(this,{bound:[20,12,550,20],caption:"PP/Unit", readOnly:true});				
		this.e_akun = new saiLabelEdit(this,{bound:[20,13,550,20],caption:"Akun", readOnly:true});				
		this.e_drk = new saiLabelEdit(this,{bound:[20,14,550,20],caption:"DRK", readOnly:true});						
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150, readOnly:true});						
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18],visible:false});

		this.pc1 = new pageControl(this,{bound:[20,12,796,250], childPage:["File Dok"]});    
		this.sgUpld = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6, tag:0,
					colTitle:["KdDok","Jenis Dokumen","Nama File","Upload","DownLoad","Jenis"],
					colWidth:[[5,4,3,2,1,0],[50,80,80,300,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4,5],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[0],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});

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

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fDokTambahUnit.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fDokTambahUnit.implement({
	isiCBagenda: function() {
		this.e_noaju.setSQL("select distinct a.no_aju, a.keterangan "+
							"from it_aju_m a "+
							"where a.progress in ('A','0','F','R','S','2','1') and a.kode_lokasi='"+this.app._lokasi+"' and a.periode >= '202003' ",["a.no_aju","a.keterangan"],false,["No Agenda","Deskripsi"],"and","Data Agenda",true);
	},	
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");        
				this.sgUpld.cells(5,row, 0);                
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
					"select kode_jenis, nama  from dok_jenis where kode_lokasi='"+this.app._lokasi+"' and kode_jenis='DOK' ", 
					"select count(*) from dok_jenis where kode_lokasi='"+this.app._lokasi+"' and kode_jenis='DOK' ", 
					["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			// if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
			if (col === 4) {
				if(this.sgUpld.getCell(5,row) == "1"){
					window.open(this.sgUpld.getCell(2,row));
				}else{
					window.open("server/media/"+this.sgUpld.getCell(2,row));
				}
			}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("delete from it_aju_dok where no_bukti = '"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into it_aju_dok(no_bukti,no_gambar,kode_lokasi,modul,jenis) values "+
									"('"+this.e_noaju.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+this.app._lokasi+"','"+this.modul+"','"+this.sgUpld.cells(5,i)+"')");															
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
					setTipeButton(tbSimpan);
					this.isiCBagenda();
					this.sgUpld.clear(1);
					this.sgFile.clear(1);
				break;
			case "simpan" :	
				if (this.sgUpld.cells(2,0) == ""){
					system.alert(this,"Transaksi tidak valid.","File Dokumen kosong.");
					return false;
				}
				else
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){		
		this.isiCBagenda();		
	},		
	doChange:function(sender){		
		if (sender==this.e_noaju) {			
			if (this.e_noaju.getText() != "") {
				var strSQL = "select a.form,a.nilai,a.kode_pp,a.keterangan,a.tanggal,a.kode_pp+' - '+b.nama as pp,a.kode_akun+' - '+c.nama as akun,a.kode_drk+' - '+isnull(d.nama,'-') as drk "+
							 "from it_aju_m a "+
							 "                inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi "+
							 "where a.no_aju = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'  ";				
				
				var data = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.kodePP = line.kode_pp;
					this.e_ket.setText(line.keterangan);				
					this.e_pp.setText(line.pp);				
					this.e_akun.setText(line.akun);				
					this.e_drk.setText(line.drk);				
					this.dp_d2.setText(line.tanggal);	
					this.e_nilai.setText(floatToNilai(line.nilai));			
					this.modul = line.form;					
				}	
								
				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(							 
							 "select a.kode_jenis,a.nama,b.no_gambar,b.jenis "+
							 "from dok_jenis a left join it_aju_dok b on a.kode_jenis='DOK' and a.kode_lokasi=b.kode_lokasi and b.no_bukti='"+this.e_noaju.getText()+"' "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and b.no_gambar is not null ",true);							 							 
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad",line.jenis]);						
					}
				} else this.sgUpld.clear(1);


			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){	
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}
													
							this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormDokAA";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_noaju.getText()+"' ";
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
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
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
			this.standarLib.clearByTag(this, new Array("0","1"),undefined);						
			setTipeButton(tbSimpan);
			this.isiCBagenda();
			this.sgUpld.clear(1);
			this.sgFile.clear(1);
		} catch(e) {
			alert(e);
		}
	}
});