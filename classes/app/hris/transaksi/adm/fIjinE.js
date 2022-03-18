window.app_hris_transaksi_adm_fIjinE = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_adm_fIjinE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_adm_fIjinE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Ijin : Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Ijin", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Deskripsi", maxLength:100});		
		this.cb_dept = new saiCBBL(this,{bound:[20,16,200,20],caption:"Departemen", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_buat = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_app = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK Verifikasi", multiSelection:false, maxLength:10, tag:2});
		this.cb_ijin = new saiCBBL(this,{bound:[20,19,200,20],caption:"Kode Ijin", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_max = new saiLabelEdit(this,{bound:[20,17,180,20],caption:"Maksimal Hari", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				

		this.p1 = new panel(this,{bound:[10,23,500,250],caption:"Daftar Tanggal Ijin"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:1,tag:0,
		            colTitle:["Tanggal Ijin"],
					colWidth:[[0],[100]],					
					buttonStyle:[[0],[bsDate]],															
					checkItem:true,autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});		

		this.cb1 = new portalui_checkBox(this.sgn,{bound:[120,5,100,25],caption:"Preview",selected:true});
		this.rearrangeChild(10, 23);
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
	
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_dept.setSQL("select kode_dept, nama from gr_dept where kode_lokasi='"+this.app._lokasi+"'",["kode_dept","nama"],false,["Kode","Nama"],"and","Data Departemen",true);						
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Verifikasi",true);
			this.cb_buat.setSQL("select nik, nama, kode_jab from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama","kode_jab"],false,["NIK","Nama","Kode Jab"],"and","Data NIK Pembuat",true);			
			this.cb_dept.setText(this.app._kodeDept);
			this.cb_buat.setText(this.app._userLog);
			
			this.e_nb.setSQL("select no_ijin, keterangan from gr_ijin_m where progress = '0' and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",["no_ijin","keterangan"],false,["No ijin","Keterangan"],"and","Data Ijin",true);			
			this.cb_ijin.setSQL("select sts_ijin,nama from gr_status_ijin where kode_lokasi = '"+this.app._lokasi+"'",["sts_ijin","nama"],false,["Kode","Nama"],"and","Data Ijin",true);									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_adm_fIjinE.extend(window.childForm);
window.app_hris_transaksi_adm_fIjinE.implement({
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
					sql.add("delete from gr_ijin_m where no_ijin='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_ijin_d where no_ijin='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_absen_harian_d where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul = 'IJIN'");
					
					sql.add("insert into gr_ijin_m(no_ijin,kode_lokasi,periode,tanggal,kode_dept,kode_jab,nik_buat,nik_app,keterangan,progress,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_dept.getText()+"','"+this.jab+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.e_ket.getText()+"','0',getdate(),'"+this.app._userLog+"')");
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							sql.add("insert into gr_ijin_d(no_ijin,nik,tanggal,sts_ijin,no_urut,kode_lokasi) values "+
									"('"+this.e_nb.getText()+"','"+this.cb_buat.getText()+"','"+this.sg.getCellDateValue(0,i)+"','"+this.cb_ijin.getText()+"',"+i+",'"+this.app._lokasi+"')");
						
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
									"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.sg.getCellDateValue(0,i)+"','"+this.sg.getCellDateValue(0,i)+" 08:00:00','I','IJIN', '-')");
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
									"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.sg.getCellDateValue(0,i)+"','"+this.sg.getCellDateValue(0,i)+" 17:00:00','O','IJIN', '-')");									
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
					this.sg.clear(1);
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				this.cb1.setSelected(true);
				this.sg.validasi();				
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){						
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data tanggal untuk baris ["+k+"]");
								return false;
							}
						}						
						var data = this.dbLib.getDataProvider("select nama from gr_libur where '"+this.sg.getCellDateValue(0,i)+"' between tgl_mulai and tgl_akhir and tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line = data.rs.rows[0];							
							system.alert(this,"Transaksi tidak valid.","Tanggal masuk dalam hari libur : ["+line.nama+"]");
							return false;
						}												
					}
				}
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
					this.cb1.setSelected(false);
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_ijin_m where no_ijin='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_ijin_d where no_ijin='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_absen_harian_d where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul = 'IJIN'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
	},
	doChange:function(sender){
		if (sender == this.cb_ijin) {				
			if (this.cb_ijin.getText()!="") {
				var data = this.dbLib.getDataProvider("select hari from gr_status_ijin where sts_ijin='"+this.cb_ijin.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_max.setText(floatToNilai(line.hari));
					}
				}
			}
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {		
			this.e_ket.setFocus();
			var data = this.dbLib.getDataProvider(
					   "select a.tanggal,a.keterangan,a.kode_dept,a.nik_buat,a.nik_app,a.kode_jab,"+
					   "b.nama as nama_dept,e.nama as nama_buat,f.nama as nama_app "+					   
					   "from gr_ijin_m a "+
					   "     inner join gr_dept b on a.kode_dept=b.kode_dept and a.kode_lokasi=b.kode_lokasi "+					   
					   "     inner join gr_karyawan e on a.nik_buat=e.nik and a.kode_lokasi=e.kode_lokasi "+
					   "     inner join gr_karyawan f on a.nik_app=f.nik and a.kode_lokasi=f.kode_lokasi "+					   
					   "where a.no_ijin='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);														
					this.e_ket.setText(line.keterangan);
					this.cb_dept.setText(line.kode_dept,line.nama_dept);	
					this.cb_buat.setSQL("select nik, nama,kode_jab from gr_karyawan where kode_dept ='"+this.cb_dept.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama","kode_jab"],false,["NIK","Nama","Kode Jab"],"and","Data NIK Pembuat",true);								
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_app.setText(line.nik_app,line.nama_app);					
					this.jab = line.kode_jab;
				} 
			}						
			var data = this.dbLib.getDataProvider(
					   "select a.sts_ijin,a.nama,convert(varchar,b.tanggal,103) as tanggal "+
			           "from gr_ijin_d b inner join gr_status_ijin a on a.sts_ijin=b.sts_ijin and a.kode_lokasi=b.kode_lokasi "+
					   "where b.no_ijin='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.tanggal]);
				}
			} else this.sg.clear(1);
			this.cb_ijin.setText(line.sts_ijin,line.nama);					
		}		
		if (sender == this.cb_dept) {
			if (this.cb_dept.getText()!="") {	
				this.cb_buat.setSQL("select nik, nama,kode_jab from gr_karyawan where kode_dept ='"+this.cb_dept.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama","kode_jab"],false,["NIK","Nama","Kode Jab"],"and","Data NIK Pembuat",true);			
			}
		}
		if (sender == this.cb_buat) {				
			if (this.cb_buat.getText()!="") this.jab = this.cb_buat.dataFromList[2];			
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_hris_rptIjin";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ijin='"+this.e_nb.getText()+"' ";
								this.filter2 = "1";
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
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;
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
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	}
});
