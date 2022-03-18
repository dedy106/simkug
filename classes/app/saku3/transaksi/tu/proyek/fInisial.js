window.app_saku3_transaksi_tu_proyek_fInisial = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fInisial.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fInisial";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Inisialisasi", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 		

		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Kegiatan","List Kegiatan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:9,
		            colTitle:["ID Kegiatan","Deskripsi","Nilai"],
					colWidth:[[2,1,0],[200,300,100]],
					colFormat:[[2],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false, change:[this,"doChange"]}); 					
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,10,200,20],caption:"ID Kegiatan", readOnly:true, change:[this,"doChange"]});	
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,250,20],caption:"No Dokumen", maxLength:100, tag:1});			
		this.e_nama = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,430,20],caption:"Deskripsi", maxLength:200, tag:1});			
		this.cb_jenis = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Jenis",tag:2,multiSelection:false}); 						
		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,16,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,16,98,18]});
		this.l_tgl3 = new portalui_label(this.pc2.childPage[0],{bound:[20,17,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,17,98,18]});

		this.e_nilaior = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Nilai Budget", tag:1, tipeText:ttNilai, text:"0"});						
		this.cb_drkb = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"DRK Beban",tag:2,multiSelection:false}); 						
		
		this.cb_buat = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Dibuat Oleh",tag:2,multiSelection:false}); 					
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Diperiksa Oleh",tag:2,multiSelection:false}); 					
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);


		try {
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true); //kode_pp='"+this.app._kodePP+"' and
			this.cb_jenis.setSQL("select kode_jenis,nama from tu_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);
			
			this.cb_pp.setText(this.app._kodePP);	
			
			this.cb_buat.setSQL("select nik, nama from karyawan a where a.flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Karyawan",true);	
			this.cb_app.setSQL("select nik, nama from karyawan a where a.flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Karyawan",true);												

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fInisial.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fInisial.implement({			
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from tu_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
					}					
					sql.add("insert into tu_proyek(kode_proyek,nama,flag_aktif,kode_lokasi,no_pks,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,p_or,kode_jenis,nilai_ppn,jumlah, kode_drkp,kode_drkb, nik_app,progress,no_app, tgl_app,nik_buat) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','1','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.cb_pp.getText()+"','-','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"',0,"+nilaiToFloat(this.e_nilaior.getText())+",0,'"+this.cb_jenis.getText()+"',0,0,'-','"+this.cb_drkb.getText()+"','"+this.cb_app.getText()+"','X','INISIAL','"+this.dp_d1.getDateString()+"','"+this.cb_buat.getText()+"')");
					
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from tu_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.stsSimpan = 1;									
					this.sg3.clear(1);									
					this.pc2.setActivePage(this.pc2.childPage[0]);						
				break;
			case "simpan" :	
			case "ubah" :		
					this.preView = "1";					
					if (nilaiToFloat(this.e_nilaior.getText()) <= 0) {
						system.alert(this,"Nilai tidak valid.","Nilai Budget tidak boleh nol atau kurang.");
						return false;
					}
					else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
							
			case "hapus" :		
				this.preView = "0";								
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = y+""+m;			
		this.cb_drkb.setSQL("select a.kode_drk, a.nama from drk a inner join tu_proyek_drk b on a.kode_drk=b.kode_drk and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi and b.status='BEBAN' where a.tahun='"+this.periode.substr(0,4)+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK Beban",true);																													 				
	},
	doClick:function(sender){		
		try {
			if (this.stsSimpan==0) {
				this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true); //kode_pp='"+this.app._kodePP+"' and				
			}
			setTipeButton(tbSimpan);
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_proyek","kode_proyek",this.cb_pp.getText()+"-IN"+this.periode.substr(2,4)+".","000"));						
			this.e_nama.setFocus();	
			this.stsSimpan = 1;		
		}
		catch(e) {
			alert(e);
		}
	},					
	doChange: function(sender){
		try{
			if (sender == this.cb_pp && this.cb_pp.getText() != "" && this.stsSimpan==1) {
				this.doClick();
			}		
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){				
				var strSQL = "select * from tu_proyek "+
							 "where kode_proyek ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.dp_d1.setText(line.tgl_app);	
						this.dp_d2.setText(line.tgl_mulai);	
						this.dp_d3.setText(line.tgl_selesai);	
						this.e_dok.setText(line.no_pks);
						this.e_nama.setText(line.nama);
						this.cb_pp.setText(line.kode_pp);
						this.dp_d1.setText(line.tgl_mulai);
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.cb_jenis.setText(line.kode_jenis);
						this.cb_drkb.setText(line.kode_drkb);	
						this.cb_buat.setText(line.nik_buat);
						this.cb_app.setText(line.nik_app);						
						this.stsSimpan = 0;							
						setTipeButton(tbUbahHapus);
					}					
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
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_tu_proyek_rptInsl";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_proyek='"+this.cb_kode.getText()+"' ";
								this.filter2 = this.filter;
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
								this.allBtn = false									
								this.pc2.hide(); 
							}
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.cb_kode.getText()+")","");							
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
			setTipeButton(tbAllFalse);
			this.stsSimpan = 1;									
			this.sg3.clear(1);									
			this.pc2.setActivePage(this.pc2.childPage[0]);						
		} catch(e) {
			alert(e);
		}
	},		

	doLoad3:function(sender){																				
		var strSQL = "select a.kode_proyek,a.nama as keterangan,a.nilai_or as nilai "+
		             "from tu_proyek a "+					 					 
					 "where  a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('X') ";		
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
			this.sg3.appendData([line.kode_proyek,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.cb_kode.setText(this.sg3.cells(0,row));												
			}									
		} catch(e) {alert(e);}
	}
});