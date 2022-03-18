window.app_saku3_transaksi_siaga_hris_adm_fIjin = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fIjin.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_adm_fIjin";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Ijin", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);

		this.e_periode = new portalui_saiLabelEdit(this,{bound:[30,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[30,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[130,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Ijin","List Ijin"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		              	colTitle:["No. Ijin","Keterangan","Sub Direktorat","NIK Pembuat","NIK Verifikasi"],
					  	colWidth:[[4,3,2,1,0],[100,100,120,450,120]],		
					  	readOnly:true,
						dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[10,12,202,20],caption:"No Ijin",maxLength:30,readOnly:true,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[215,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,14,450,20],caption:"Keterangan", maxLength:100});		
		this.cb_dept = new saiCBBL(this.pc1.childPage[0],{bound:[10,16,220,20],caption:"Sub Direktorat", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_buat = new saiCBBL(this.pc1.childPage[0],{bound:[10,17,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[10,18,220,20],caption:"NIK Verifikasi", multiSelection:false, maxLength:10, tag:2});
		this.cb_ijin = new saiCBBL(this.pc1.childPage[0],{bound:[10,19,220,20],caption:"Kode Ijin", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_max = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,17,200,20],caption:"Maksimal Hari", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.p1 = new panel(this.pc1.childPage[0],{bound:[10,23,500,255],caption:"Daftar Tanggal Ijin"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-47],colCount:1,tag:0,
		            colTitle:["Tanggal Ijin"],
					colWidth:[[0],[120]],					
					buttonStyle:[[0],[bsDate]],															
					checkItem:true,autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[120,5,100,25],caption:"Preview",selected:true,visible:false});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			//this.cb_dept.setSQL("select kode_so, nama from gr_so where getdate() between tgl_awal and tgl_akhir and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_so","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);						
			this.cb_dept.setSQL("select kode_dept, nama from gr_dept where flag_aktif = '1' and kode_lokasi='"+this.app._lokasi+"'",["kode_dept","nama"],false,["Kode","Nama"],"and","Data Departemen",true);						
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Verifikasi",true);
			this.cb_buat.setSQL("select nik, nama, kode_jab from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama","kode_jab"],false,["NIK","Nama","Kode Jab"],"and","Data NIK Pembuat",true);			
			var strSQL = "select * from gr_karyawan "+							 
						 "where nik = '"+this.app._userLog+"' ";							 					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.cb_dept.setText(line.kode_dept);
					this.cb_buat.setText(line.nik);					
				}
			}	
			this.cb_ijin.setSQL("select sts_ijin,nama from gr_status_ijin where kode_lokasi = '"+this.app._lokasi+"'",["sts_ijin","nama"],false,["Kode","Nama"],"and","Data Ijin",true);									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fIjin.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_adm_fIjin.implement({
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
					if (this.stsSimpan == 1) this.doClick(this.i_gen);	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
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
	ubah: function(){			
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_ijin_m where no_ijin='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_ijin_d where no_ijin='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_absen_harian_d where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul = 'IJIN'");
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
					this.sg1.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					if (this.stsSimpan == 1) this.doClick(this.i_gen);
				break;
			case "simpan" :	
				this.sg.validasi();				
				var jmlHari = 0;
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){						
						jmlHari = jmlHari + 1;
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
				var hariMax = nilaiToFloat(this.e_max.getText());
				if (hariMax == 0) hariMax = 1000; // jika maksimal = nol ,,,tidak diproteksi	
				if (hariMax < jmlHari) {
					system.alert(this,"Transaksi tidak valid.","Jumlah Hari melebihi Maksimalnya ("+hariMax+")");
					return false;
				}				
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);		
	},
	doChange:function(sender){
		if (sender == this.cb_dept) {
			if (this.cb_dept.getText()!="") {	
				this.cb_buat.setSQL("select nik, nama,kode_jab from gr_karyawan where kode_dept ='"+this.cb_dept.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama","kode_jab"],false,["NIK","Nama","Kode Jab"],"and","Data NIK Pembuat",true);			
			}
		}
		if (sender == this.cb_buat) {				
			if (this.cb_buat.getText()!="") this.jab = this.cb_buat.dataFromList[2];			
		}
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
		if (sender == this.e_nb && this.e_nb.getText()!="" && this.stsSimpan==0) {		
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
					//this.cb_buat.setSQL("select nik, nama,kode_jab from gr_karyawan where kode_dept ='"+this.cb_dept.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama","kode_jab"],false,["NIK","Nama","Kode Jab"],"and","Data NIK Pembuat",true);								
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
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_ijin_m","no_ijin",this.app._lokasi+"-IJN"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
		this.stsSimpan = 1;
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));										
			}
		} catch(e) {alert(e);}
	},

	doLoad:function(sender){						
		var strSQL = "select a.no_ijin,a.keterangan,a.kode_dept+' | '+b.nama as dept,a.nik_buat,a.nik_app "+
					 "from gr_ijin_m a "+
					 "inner join gr_dept b on a.kode_dept=b.kode_dept and a.kode_lokasi=b.kode_lokasi "+
					 "where a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_ijin desc";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},

	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_ijin,line.keterangan,line.dept,line.nik_buat,line.nik_app]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
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
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});
