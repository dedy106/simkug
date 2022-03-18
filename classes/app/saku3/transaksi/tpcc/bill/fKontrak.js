window.app_saku3_transaksi_tpcc_bill_fKontrak = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tpcc_bill_fKontrak.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tpcc_bill_fKontrak";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data PKS", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
        this.pc1 = new pageControl(this,{bound:[20,12,1000,460], childPage:["Daftar PKS","Data PKS","Filter Cari"]});
        
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["ID","No Dokumen","Keterangan","Customer","Divisi","Total"],
					colWidth:[[5,4,3,2,1,0],[100,300,200,300,200,100]],
					colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"ID Kontrak",readOnly:true,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"No Dokumen", maxLength:100});				
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"Keterangan", maxLength:200});				
		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Customer",multiSelection:false,change:[this,"doChange"]});
		this.e_div = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"Divisi", readOnly:true});				
		this.e_alamat = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,500,20],caption:"Alamat", readOnly:true});				
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18],selectDate:[this,"doChange"]}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,12,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,12,100,18]}); 		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Nilai", tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Nilai PPN",  tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Total",  tipeText:ttNilai, text:"0", readOnly:true});		
		
		this.sgUpld = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,167],colCount:5,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload","Download"],
					colWidth:[[4,3,2,1,0],[80,80,400,200,80]], 
					colFormat:[[3,4],[cfUpload,cfButton]], buttonStyle:[[0],[bsEllips]], 
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,rowCount:1,change:[this,"doGridChange"],tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.e_nb2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"ID",maxLength:10,tag:9});		
		this.e_dok2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"No Dokumen",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		
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
								
            this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
			
			this.stsSimpan = 1;
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);											
			
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.tahun = line.tahun.substr(2,2);
				}
			}
			
			this.doClick();	
			this.doLoad();								
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tpcc_bill_fKontrak.extend(window.portalui_childForm);
window.app_saku3_transaksi_tpcc_bill_fKontrak.implement({	
	doGridChange: function(sender, col, row,param1,result, data){
	    try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);         
				this.sgUpld.cells(4,row, "Download");             
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
												  "select kode_jenis,nama   from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_jenis) from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}					
			}
		}catch(e){
			systemAPI.alert(e);
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
			if (this.stsSimpan == 1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kontrak_m","no_kontrak",this.app._lokasi+"-PKS"+this.tahun+".","00000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						this.deleteFiles = [];
						for (var i in this.listFiles.objList) {
							var ketemu = false;
							for (var j=0;j < this.sgUpld.getRowCount();j++){
								ketemu = i == this.sgUpld.cells(2,j);
								if (ketemu) break;
							}
							if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
						}								
						sql.add("delete from kontrak_m where no_kontrak = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						sql.add("delete from kontrak_dok where no_kontrak='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
					}
					
					var perAwal = this.dp_d1.getDateString().substr(0,4) + this.dp_d1.getDateString().substr(5,2);
					var perAkhir = this.dp_d2.getDateString().substr(0,4) + this.dp_d2.getDateString().substr(5,2);
					sql.add("insert into kontrak_m(no_kontrak,kode_lokasi,nik_user,tgl_input,tgl_awal,tgl_akhir,no_dok,kode_cust,keterangan,nilai,nilai_ppn,per_awal,per_akhir,per_tagih,kode_produk) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_dok.getText()+"','"+this.cb_cust.getText()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'"+perAwal+"','"+perAkhir+"','"+perAwal+"','-')");
										
					var ix=0;                   
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;											
							sql.add("insert into kontrak_dok(no_kontrak,no_gambar,nu,kode_jenis,kode_lokasi) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");
						}	
					}	
					
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
					this.sg1.setTag("0");
					this.dataJU.rs.rows = [];
					this.sgUpld.clear(1);
					this.sg1.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.doLoad();
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :				
			case "ubah" :	
				this.preView = "1";								
			    this.simpan();
				break;			
			case "hapus" :	
				this.preView = "0";								
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from kontrak_m where no_kontrak = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
				sql.add("delete from kontrak_dok where no_kontrak='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									

				this.deletedFiles = "";	
				for (var i=0;i < this.sgUpld.getRowCount();i++){
					if (this.sgUpld.rowValid(i)){
						if (this.deletedFiles != "") this.deletedFiles += ";";
						this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(2,i);
					}
				}
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kontrak_m","no_kontrak",this.app._lokasi+"-PKS"+this.tahun+".","00000"));
		this.e_dok.setFocus();
	},		
	doChange:function(sender){
		try {
			if (sender == this.cb_cust && this.cb_cust.getText() != "") {
				var strSQL = "select divisi,alamat from cust where kode_cust ='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);				
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_div.setText(line.divisi);	
						this.e_alamat.setText(line.alamat);	
					}
				}				
			}
			if (sender == this.e_nilai && this.e_nilai.getText()!=""){
				this.e_ppn.setText(floatToNilai(Math.round(Math.abs(nilaiToFloat(this.e_nilai.getText())*0.1))));
				this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText())));
			}
			if (sender == this.e_ppn && this.e_ppn.getText()!=""){
				this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText())));
			}		
			if (sender == this.dp_d1 && this.stsSimpan==1) {
				var strSQL = "select dateadd(month,12,'"+this.dp_d1.getDateString()+"') as tgl ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d2.setText(line.tgl);						
					}					
				}
			}
			
			if (sender == this.e_nb && this.e_nb.getText() != ""){								
				var strSQL = "select a.*,isnull(b.no_gambar,'-') as no_gambar from kontrak_m a "+
				             "left join kontrak_dok b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_kontrak ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";									 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
						this.dp_d1.setText(line.tgl_awal);
						this.dp_d2.setText(line.tgl_akhir);
						this.e_dok.setText(line.no_dok);
						this.e_ket.setText(line.keterangan);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));											
						this.cb_cust.setText(line.kode_cust);	

						this.sgUpld.clear();						
						this.listFiles = new arrayMap();	
						var strSQL= "select b.kode_jenis,b.nama,a.no_gambar "+
									"from kontrak_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
									"where a.no_kontrak = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){							
							var line;
							this.sgUpld.clear();
							for (var i in data.rs.rows){								
								line = data.rs.rows[i];		
								this.listFiles.set(line.no_gambar,line.no_gambar); 													
								this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);
							}
						} else this.sgUpld.clear(1);
				
						setTipeButton(tbUbahHapus);
						this.stsSimpan = 0;
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
						this.stsSimpan = 1;											
					}
				}
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){s
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							if(this.preView == "1"){
								this.nama_report = "server_report_saku3_travel_bill_rptKontrak";
								this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_kontrak='" + this.e_nb.getText() + "' ";
								this.filter2 = this.app._periode;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc1.hide();
							}else{
								this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
								this.app._mainForm.bClear.click();
							}
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCari:function(sender){								
		try {
			if (this.e_nb2.getText() != "") var filter = " a.no_kontrak like '%"+this.e_nb2.getText()+"%' ";
			else var filter = " a.no_dok like '%"+this.e_dok2.getText()+"%' ";
			
			var strSQL = "select a.no_kontrak,a.no_dok,a.keterangan,b.nama as cust,b.divisi,a.nilai+nilai_ppn as total from kontrak_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
			             "where "+filter+" and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_kontrak";								
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {
			var strSQL = "select a.no_kontrak,a.no_dok,a.keterangan,b.nama as cust,b.divisi,a.nilai+nilai_ppn as total "+
						 "from kontrak_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.no_kontrak desc";
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.no_kontrak,line.no_dok,line.keterangan,line.cust,line.divisi,floatToNilai(line.total)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.e_nb.setText(this.sg1.cells(0,row));																
			}
		} catch(e) {alert(e);}
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
			this.sg1.setTag("0");
			this.dataJU.rs.rows = [];
			this.sgUpld.clear(1);
			this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.doLoad();
			setTipeButton(tbSimpan);						
		} catch(e) {
			alert(e);
		}
	},
});