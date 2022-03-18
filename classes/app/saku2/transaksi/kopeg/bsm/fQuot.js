window.app_saku2_transaksi_kopeg_bsm_fQuot = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_bsm_fQuot.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_bsm_fQuot";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Quotation: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,70,20],labelWidth:0,caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,10,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,98,18],selectDate:[this,"doSelectDate"]}); 						
		this.pc2 = new pageControl(this,{bound:[10,11,1000,450], childPage:["Data Quotation","Daftar Quotation","Cari Data"]});		
		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:8,tag:9,		            
					colTitle:["No Quotation","Status","Tanggal","Tertanggung","Curr","Sum Insured","Tgl Mulai","Tgl Selesai"],
					colWidth:[[7,6,5,4,3,2,1,0],[70,70,100,50,200,70,70,100]],
					readOnly:true,colFormat:[[5],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager"]});		
		this.bLoad2 = new portalui_imageButton(this.sgn2,{bound:[this.sgn2.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Polis",click:[this,"doLoad2"]});						
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"No Quotation",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,14,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.cb_tipe = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"COB",tag:2,multiSelection:false,change:[this,"doChange"]}); 		
		this.cb_cust = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Tertanggung",tag:1,multiSelection:false}); 		
		this.cb_pic = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Acc Exec",tag:2,multiSelection:false}); 		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Period of Insurance", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doChange"]}); 		
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[260,11,98,18]}); 		
		this.c_curr = new saiCB(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Sum Insured",readOnly:true,tag:2});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[260,14,100,20],caption:"", labelWidth:0, tag:1, tipeText:ttNilai, text:"0"});						
		this.e_file = new saiLabelEdit(this.pc2.childPage[0],{bound:[450,14,430,20],caption:"File Upload", readOnly:true, tag:8});		
		this.uploader = new uploader(this.pc2.childPage[0],{bound:[900,14,80,18],caption:"Browse File+", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.mDesk = new tinymceCtrl(this.pc2.childPage[0],{bound:[5,13,990,300], withForm:false});
		
		this.cb_cust3 = new portalui_saiCBBL(this.pc2.childPage[2],{bound:[20,12,202,20],caption:"Tertanggung",tag:9,multiSelection:false,change:[this,"doChange"]}); 				
		this.e_quo3 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,13,300,20],caption:"No Dokumen", tag:9, maxLength:50});								
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		uses("server_report_report;portalui_reportViewer");
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);
		
	
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		this.fileUtil = new util_file();
		this.fileUtil.addListener(this);
		this.rootDir = this.app._rootDir;
		this.separator = "/";							
		this.fileBfr = "";
					
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_tipe.setSQL("select kode_tipe, nama from sju_tipe where kode_lokasi='"+this.app._lokasi+"'",["kode_tipe","nama"],false,["Kode","Nama"],"and","Data Tipe",true);
			this.cb_cust.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);					
			this.cb_cust3.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);			
			this.cb_pic.setSQL("select kode_pic, nama from sju_pic where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pic","nama"],false,["Kode","Nama"],"and","Data Acc Exec",true);
			
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("IDR");						
									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_bsm_fQuot.extend(window.childForm);
window.app_saku2_transaksi_kopeg_bsm_fQuot.implement({		
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
	mainButtonClick: function(sender, desk){
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
						sql.add("delete from bsm_quot_m where no_quot='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from bsm_quot_dok where no_quot='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					} 										
					sql.add("insert into bsm_quot_m (no_quot,tanggal,kode_lokasi,periode,tgl_input,nik_user,kode_tipe,kode_cust,kode_pic,tgl_mulai,tgl_selesai,kode_curr,total,catat,progress,no_app,no_placing,no_polis) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_tipe.getText()+"','"+this.cb_cust.getText()+"','"+this.cb_pic.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+urlencode(this.mDesk.getCode())+"','0','-','-','-')");					
					sql.add("insert into bsm_quot_dok(no_quot,no_gambar,kode_lokasi) values ('"+this.e_nb.getText()+"','"+this.e_file.getText()+"','"+this.app._lokasi+"')");										
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
					this.standarLib.clearByTag(this, new Array("0","1","8"),this.e_nb);						
					this.sg2.clear(1); 
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
					sql.add("delete from bsm_quot_m where no_quot='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from bsm_quot_dok where no_quot='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				break								
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.dp_d2.setText(this.dp_d1.getText());		
		if (this.stsSimpan == 1) this.doClick();
	},	
	doChange:function(sender){
		try {			
			if (sender == this.dp_d2 && this.stsSimpan == 1) {				
				var data = this.dbLib.getDataProvider("select dateadd(month,12,'"+this.dp_d2.getDateString()+"') as tgl ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d3.setText(line.tgl);						
					}					
				}
			}							
		}
		catch (e) {
			alert(e);
		}
	},		
	doClick:function(sender){
		if (this.stsSimpan == 0) {									
			this.sg2.clear(1); 
		}	
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"bsm_quot_m","no_quot",this.app._lokasi+"-QT"+this.e_periode.getText().substr(2,4)+".","00000"));
		this.cb_tipe.setFocus();		
		this.stsSimpan = 1;		
		setTipeButton(tbSimpan);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1) {
							if (this.preView == "1") {								
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}
								if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);								
								
								this.nama_report = "server_report_saku2_kopeg_sju_rptPrQuo";
								this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_quo='" + this.e_nb.getText() + "' ";
								this.filter2 = "";
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
								this.pc2.hide();
							}
							else {
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}									
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
								this.clearLayar();
							}							
						}
						else {
							if (result.toLowerCase().search("primary key") == -1) {
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
			this.standarLib.clearByTag(this, new Array("0","1","8"),this.e_nb);						
			this.sg2.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},	
	doLoad2:function(sender){												
		var strSQL = "select a.no_quot, "+
					 "case a.progress when '0' then 'AJU' "+					 
					 "end as status,"+
					 "convert(varchar,a.tanggal,103) as tanggal,b.kode_cust+'-'+b.nama as cust,a.kode_curr,a.total,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai "+		             
					 "from bsm_quot_m a "+					 
		             "inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress in ('0') and a.kode_lokasi='"+this.app._lokasi+"' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn2.rearrange();
			this.doTampilData(1);
		} else this.sg2.clear(1);					
	},
	doTampilData: function(page) {
		this.sg2.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg2.appendData([line.no_quot,line.status.toUpperCase(),line.tanggal,line.cust,line.kode_curr,floatToNilai(line.total),line.tgl_mulai,line.tgl_selesai]); 
		}
		this.sg2.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doCari:function(sender){										
		var strSQL = "select a.no_quot, "+
					 "case a.progress when '0' then 'AJU' "+					 
					 "end as status,"+
					 "convert(varchar,a.tanggal,103) as tanggal,b.kode_cust+'-'+b.nama as cust,a.kode_curr,a.total,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai "+		             
					 "from bsm_quot_m a "+					 
		             "inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 
					 "where a.kode_cust like '%"+this.cb_cust3.getText()+"%' and a.no_quot like '%"+this.e_quo3.getText()+"%' and a.periode<='"+this.e_periode.getText()+"' and a.progress in ('0','R') and a.kode_lokasi='"+this.app._lokasi+"' ";					 		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn2.rearrange();
			this.doTampilData(1);
		} else this.sg2.clear(1);
		this.pc2.setActivePage(this.pc2.childPage[0]);	
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg2.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);														
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;
				this.e_nb.setText(this.sg2.cells(0,row));				
				
				var strSQL = "select a.*,isnull(c.no_gambar,'-') as no_gambar "+
				             "from bsm_quot_m a "+							 
							 "        left join bsm_quot_dok c on a.no_quot=c.no_quot and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_quot='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.progress = line.progress;						
						this.dp_d1.setText(line.tanggal);																	
						this.cb_tipe.setText(line.kode_tipe);
						this.cb_pic.setText(line.kode_pic);
						this.cb_cust.setText(line.kode_cust);
						this.dp_d2.setText(line.tgl_mulai);					
						this.dp_d3.setText(line.tgl_selesai);					
						this.c_curr.setText(line.kode_curr);
						this.e_nilai.setText(floatToNilai(line.total));						
						this.mDesk.setCode(urldecode(line.catat));																			
						this.e_file.setText(line.no_gambar);
						this.fileBfr = line.no_gambar;						
					}
				}								
			}			
			this.pc2.setActivePage(this.pc2.childPage[0]);	
		} catch(e) {alert(e);}
	}
});