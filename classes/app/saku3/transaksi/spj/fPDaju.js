window.app_saku3_transaksi_spj_fPDaju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spj_fPDaju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spj_fPDaju";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan SPPD (Self Service)", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data SPPD","List SPPD"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Bidang","Kegiatan","Tempat"],
					colWidth:[[4,3,2,1,0],[200,350,80,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});		
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});										
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Desk. Kegiatan", maxLength:150});				
		this.e_tempat = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Tempat", maxLength:50,tag:2});								
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,13,100,18],caption:"Tgl Kegiatan", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,13,98,18]}); 		
		this.l_tgl3 = new portalui_label(this.pc2.childPage[0],{bound:[20,14,100,18],caption:"S/D", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,14,98,18]}); 	
		
		this.cb_bidang = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Kegiatan Bidang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});								
		this.cb_nik = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"NIK", multiSelection:false, maxLength:10, tag:2});								
		this.e_nama = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Nama SPPD", tag:2, readOnly:true});							
		this.e_band = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,200,20],caption:"Band/Grade", tag:2, readOnly:true});							
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"NIK Approve1", readOnly:true, tag:2});								
		this.e_jab = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,450,20],caption:"Jabatan1", maxLength:50,tag:2});							
		this.cb_app2 = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"NIK Approve2", readOnly:true, tag:2});								
		this.e_jab2 = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,450,20],caption:"Jabatan2", maxLength:50,tag:2});							
		
				
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		this.e_memo = new saiMemo(this.pc2.childPage[0],{bound:[520,255,450,75],caption:"Cttn Approve",tag:9,visible:false});				
	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
									
			//this.cb_app.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			//this.cb_app2.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			this.cb_bidang.setSQL("select kode_bidang, nama from bidang ",["kode_bidang","nama"],false,["Kode","Nama"],"and","Data Bidang",true);			
			this.cb_nik.setSQL("select nik, nama from karyawan where nik='"+this.app._userLog+"' and flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
			
			this.cb_bidang.setText(this.app._kodeBidang);
			this.cb_nik.setText(this.app._userLog);
			this.doLoadNIK();
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BIDYAN','BIDKUG','BIDUM','BIDINV')",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "BIDYAN") this.kabidYAN = line.flag;	
					if (line.kode_spro == "BIDKUG") this.kabidKUG = line.flag;	
					if (line.kode_spro == "BIDUM") this.kabidUM = line.flag;	
					if (line.kode_spro == "BIDINV") this.kabidINV= line.flag;	
				}
			}
			
			this.e_memo.setReadOnly(true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spj_fPDaju.extend(window.childForm);
window.app_saku3_transaksi_spj_fPDaju.implement({		
	doLoadNIK: function(sender) {	
		var data2 = this.dbLib.getDataProvider("select a.nama,a.grade,b.nik_app,b.nik_app2 from karyawan a inner join pdss_role_nik b on a.nik=b.nik where a.nik='"+this.cb_nik.getText()+"'",true);
		if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
			var line2 = data2.rs.rows[0];							
			this.e_band.setText(line2.grade);
			this.e_nama.setText(line2.nama);
	
			this.jenisApp1 = line2.nik_app.toUpperCase();
			
			if (this.jenisApp1 == "BID") {		
				if (this.cb_bidang.getText() == "1") this.cb_app.setText(this.kabidYAN);
				if (this.cb_bidang.getText() == "2") this.cb_app.setText(this.kabidKUG);
				if (this.cb_bidang.getText() == "3") this.cb_app.setText(this.kabidUM); 
				if (this.cb_bidang.getText() == "4") this.cb_app.setText(this.kabidINV);
			}
			else this.cb_app.setText(line2.nik_app);
			
			this.cb_app2.setText(line2.nik_app2);
		
			var data2 = this.dbLib.getDataProvider("select nik2 from pdss_poh_nik where nik='"+this.cb_app.getText()+"' and flag_aktif='1' and '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir",true);
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line2 = data2.rs.rows[0];
				this.cb_app.setText(line2.nik2);
			}	
			
			var data2 = this.dbLib.getDataProvider("select nik2 from pdss_poh_nik where nik='"+this.cb_app2.getText()+"' and flag_aktif='1' and '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir",true);
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line2 = data2.rs.rows[0];
				this.cb_app2.setText(line2.nik2);
			}
		
			var data2 = this.dbLib.getDataProvider("select nik,nama,jabatan from karyawan where nik='"+this.cb_app.getText()+"'",true);
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line2 = data2.rs.rows[0];
				this.cb_app.setText(line2.nik,line2.nama);
				this.e_jab.setText(line2.jabatan);
			} else this.e_jab.setText("-");	
		
			var data2 = this.dbLib.getDataProvider("select nik,nama,nama,jabatan from karyawan where nik='"+this.cb_app2.getText()+"'",true);
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line2 = data2.rs.rows[0];
				this.cb_app2.setText(line2.nik,line2.nama);
				this.e_jab2.setText(line2.jabatan);
			} else this.e_jab2.setText("");	
			
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from pdss_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						
						//utk yg loncat ke app2
						sql.add("delete from pdss_app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}													
					sql.add("insert into pdss_aju_m (no_aju,kode_lokasi,periode,nik_user,tgl_input,progress,no_app1,no_app2,no_app3,tanggal,no_dokumen,keterangan,tgl_awal,tgl_akhir,kode_bidang,tempat,nik,nama,kode_pp,nik_app,jabatan,nik_app2,jabatan2) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'0','-','-','-','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.cb_bidang.getText()+"','"+this.e_tempat.getText()+"','"+this.cb_nik.getText()+"','"+this.e_nama.getText()+"','"+this.app._kodePP+"','"+this.cb_app.getText()+"','"+this.e_jab.getText()+"','"+this.cb_app2.getText()+"','"+this.e_jab2.getText()+"')");

					//utk yg loncat ke app2
					if (this.cb_app.getText() == "-") {
						sql.add("update pdss_app_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nb.getText()+"' and no_flag='-' and form='APPATS' and modul='PDSS' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into pdss_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','1','PDSS','APPATS','"+this.e_nb.getText()+"','-','-','X','X')");
						sql.add("update pdss_aju_m set no_app1='"+this.e_nb.getText()+"',progress='1' where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg3.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);										
					setTipeButton(tbAllFalse);	
					this.e_memo.setVisible(false);
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";																															
				this.simpan();				
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from pdss_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				
				//utk yg loncat ke app2
				sql.add("delete from pdss_app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
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
		if (this.stsSimpan == 1) this.doClick();		
	},
	doChange:function(sender){		
		if ((sender == this.e_periode) && this.stsSimpan ==1) this.doClick();											
		if (sender == this.cb_bidang && this.cb_bidang.getText() != "" && this.stsSimpan == 1) {
			if (this.jenisApp1 == "BID") {		
				if (this.cb_bidang.getText() == "1") this.cb_app.setText(this.kabidYAN);
				if (this.cb_bidang.getText() == "2") this.cb_app.setText(this.kabidKUG);
				if (this.cb_bidang.getText() == "3") this.cb_app.setText(this.kabidUM); 
				if (this.cb_bidang.getText() == "4") this.cb_app.setText(this.kabidINV);
				
				var data2 = this.dbLib.getDataProvider("select nik2 from pdss_poh_nik where nik='"+this.cb_app.getText()+"' and flag_aktif='1' and '"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_app.setText(line2.nik2);
				}
				var data2 = this.dbLib.getDataProvider("select nik,nama,nama,jabatan from karyawan where nik='"+this.cb_app.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_app.setText(line2.nik,line2.nama);
					this.e_jab.setText(line2.jabatan);
				} else this.e_jab.setText("");	
			}	
		}	
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {								
					this.sg3.clear(1);
				}
				this.e_memo.setVisible(false);
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pdss_aju_m","no_aju",this.app._lokasi+"-SS"+this.e_periode.getText().substr(2,4)+".","0000"));						
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}		
		}
		catch(e) {
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
								//this.nama_report="server_report_saku3_spj_rptSpjForm";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spj='"+this.e_nb.getText()+"' ";
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
								this.pc2.hide();
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);						
			setTipeButton(tbAllFalse);
			this.doClick();
			this.e_memo.setVisible(false);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.kode_bidang,a.keterangan,a.tempat "+
		             "from pdss_aju_m a "+					 					 
					 "where a.progress in ('0','A','B') and a.kode_lokasi='"+this.app._lokasi+"' and a.nik = '"+this.app._userLog+"'";		
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
			this.sg3.appendData([line.no_aju,line.tgl,line.kode_bidang,line.keterangan,line.tempat]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));
				this.e_memo.setVisible(true);
																								

				var strSQL = "select a.*,b.grade,isnull(c.catatan,'-') as cat1,isnull(d.catatan,'-') as cat2 "+
				             "from pdss_aju_m a inner join karyawan b on a.nik=b.nik "+		
				             "     left join pdss_app_m c on a.no_app1=c.no_app "+		
				             "     left join pdss_app_m d on a.no_app2=d.no_app "+					 
							 "where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);		
						this.e_ket.setText(line.keterangan);		
						this.e_tempat.setText(line.tempat);		
						this.dp_d2.setText(line.tgl_awal);		
						this.dp_d3.setText(line.tgl_akhir);		
		
						this.cb_bidang.setText(line.kode_bidang);		
						this.cb_nik.setText(line.nik);		
						this.e_nama.setText(line.nama);	
						this.e_band.setText(line.grade);			
						this.cb_app.setText(line.nik_app);		
						this.e_jab.setText(line.jabatan);
						
						this.cb_app2.setText(line.nik_app2);		
						this.e_jab2.setText(line.jabatan2);	
						
						this.e_memo.setText(line.cat1);
						if (line.cat2 != "-") this.e_memo.setText(line.cat2);	
								
					}
				}
				
				var data2 = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.cb_app.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_app.setText(line2.nik,line2.nama);
				}
				var data2 = this.dbLib.getDataProvider("select nik,nama,nama from karyawan where nik='"+this.cb_app2.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.cb_app2.setText(line2.nik,line2.nama);
				}
											
			}									
		} catch(e) {alert(e);}
	}		
});