window.app_saku3_transaksi_yakes21_simlog_fSph = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_simlog_fSph.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_simlog_fSph";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","S P H", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Terima", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,435], childPage:["Data SPH","List SPH"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["No SPH","Tanggal","Deskripsi","Pilih"],
					colWidth:[[3,2,1,0],[70,310,80,100]],readOnly:true,
					colFormat:[[3],[cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[3],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Pembukaan SPH",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.cb_spph = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"No SPPH", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});								
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,355], childPage:["Vendor","Lampiran","File Dok"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:0,
					colTitle:["Sts Nego","Kode Vendor","Nama","Ni. Penawaran","Keterangan"],
					colWidth:[[4,3,2,1,0],[300,120,300,100,80]],					
					columnReadOnly:[true,[0,1,2],[3,4]],					
					colFormat:[[3],[cfNilai]],					
					buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["NEGO","TIDAK"]})]],
					dblClick:[this,"doDoubleClick2"],	
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,550,20],caption:"Pekerjaan", maxLength:200});
		this.e_tempat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,550,20],caption:"Tempat", maxLength:200});
		this.e_jusnego = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,550,20],caption:"Just. Negosiasi", maxLength:200});
		
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[2],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
					
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
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_simlog_fSph.extend(window.childForm);
window.app_saku3_transaksi_yakes21_simlog_fSph.implement({	
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
					"select kode_jenis, nama  from pbh_dok_ver  ", 
					"select count(*) from pbh_dok_ver ", 
					["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
	isiCBspph: function() {
		this.cb_spph.setSQL("select no_spph, keterangan from log_spph_m where periode<='"+this.e_periode.getText()+"' and modul in ('TL','PL') and no_tap='-' and kode_lokasi='"+this.app._lokasi+"'",["no_spph","keterangan"],false,["No SPPH","Deskripsi"],"and","Data SPPH",true);			
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
						sql.add("delete from log_sph_m where no_sph = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from pbh_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update log_spph_vendor set no_sph='-',status='-',nilai=0,keterangan='-' where no_sph='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("update log_spph_m set no_tap='-' where no_tap='"+this.e_nb.getText()+"'");
					}					
					
					sql.add("update log_spph_m set no_tap='"+this.e_nb.getText()+"' where no_spph='"+this.cb_spph.getText()+"'");
					sql.add("insert into log_sph_m(no_sph,kode_lokasi,tgl_input,nik_user,periode,tanggal,keterangan,no_spph,kode_vendor,no_nego,modul,tempat,justnego) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_spph.getText()+"','"+this.kodeVendor+"','-','"+this.jenispeng+"','"+this.e_tempat.getText()+"','"+this.e_jusnego.getText()+"')");					
										
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("update log_spph_vendor set no_sph='"+this.e_nb.getText()+"',tgl_terima='"+this.dp_d1.getDateString()+"',nilai="+nilaiToFloat(this.sg2.cells(3,i))+",keterangan='"+this.sg2.cells(4,i)+"',status='"+this.sg2.cells(0,i)+"' "+
										"where no_spph='"+this.cb_spph.getText()+"' and kode_vendor='"+this.sg2.cells(1,i)+"'");
							}
						}
					}
					
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','SPH','"+this.e_nb.getText()+"')");															
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg3.clear(1); this.sg2.clear(1); 
					this.sgUpld.clear(1); this.sgFile.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					setTipeButton(tbAllFalse);					
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
				sql.add("delete from log_sph_m where no_sph = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from pbh_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update log_spph_vendor set no_sph='-',status='-',nilai=0,keterangan='-' where no_sph='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				sql.add("update log_spph_m set no_tap='-' where no_tap='"+this.e_nb.getText()+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
								
		if (this.stsSimpan == 1) {			
			this.isiCBspph();
			this.doClick();				
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode  && this.stsSimpan ==1) this.doClick();	

		if (sender == this.cb_spph && this.cb_spph.getText()!="") {
			if (this.stsSimpan == 1) {
				var strSQL = "select a.kode_vendor,b.nama, c.keterangan,c.modul "+
							 "from log_spph_vendor a "+
							 "		inner join vendor b on a.kode_vendor=b.kode_vendor "+
							 "     	inner join log_spph_m c on a.no_spph=c.no_spph "+							 
							 "where a.no_spph='"+this.cb_spph.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg2.appendData(["TIDAK",line.kode_vendor,line.nama,"0","-"]);
					}
					this.e_ket.setText(line.keterangan);
					this.jenispeng = line.modul;
				} else this.sg2.clear(1);	
											
			}
		}
		
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg3.clear(1); 
				this.cb_spph.setText("");				
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"log_sph_m","no_sph",this.app._lokasi+"-SPH"+this.e_periode.getText().substr(2,4)+".","000"));						
			this.cb_spph.setFocus();
			setTipeButton(tbSimpan);			
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
							if (this.preView == "1") {																
								this.nama_report="server_report_saku3_logistik_rptSph";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and g.no_sph='"+this.e_nb.getText()+"' ";
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
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
							this.isiCBspph();
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);			
			this.sg3.clear(1); this.sg2.clear(1); this.sgUpld.clear(1); this.sgFile.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																		
		var strSQL = "select a.no_sph,convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
		             "from log_sph_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul in ('PL','TL')";					 	
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
			this.sg3.appendData([line.no_sph,line.tgl,line.keterangan,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick2: function(sender, col , row) {
		if (this.sg2.cells(0,row) == "NEGO") this.sg2.cells(0,row,"TIDAK");
		else {
			//ststus NEGO hanya satu
			for (var i=0;i < this.sg2.getRowCount();i++){
				if (this.sg2.rowValid(i)) {	
					this.sg2.cells(0,i,"TIDAK");
				}
			}			
			this.sg2.cells(0,row,"NEGO");	
			this.kodeVendor = this.sg2.cells(1,row);								
		}
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 3) {
				this.doDoubleClick3(this.sg3,0,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,row));				
				
				this.cb_spph.setSQL("select no_spph, keterangan from log_spph_m where no_tap='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_spph","keterangan"],false,["No SPPH","Deskripsi"],"and","Data SPPH",true);												
															
				var strSQL = "select a.kode_vendor,b.nama,a.status,a.keterangan,a.nilai "+
							 "from log_spph_vendor a inner join vendor b on a.kode_vendor=b.kode_vendor "+							 
							 "where a.no_sph ='"+this.e_nb.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg2.appendData([line.status,line.kode_vendor,line.nama,floatToNilai(line.nilai),line.keterangan]);
					}
				} else this.sg2.clear(1);	

				var strSQL = "select a.keterangan,a.tanggal,a.nik_terima,a.nama_serah,a.kode_vendor,a.no_spph,a.tempat,a.justnego,a.modul "+
							 "from log_sph_m a "+							 
							 "where a.no_sph = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);
						this.e_tempat.setText(line.tempat);
						this.e_jusnego.setText(line.justnego);							
						this.cb_spph.setText(line.no_spph);												
						this.jenispeng = line.modul;						
					}
				}																
				
				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(							 
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join pbh_dok_ver b on a.kode_jenis=b.kode_jenis "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);
				
			}									
		} catch(e) {alert(e);}
	}
});