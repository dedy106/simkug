window.app_saku2_transaksi_kopeg_ppbs_fUsulanE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_ppbs_fUsulanE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_ppbs_fUsulanE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Usulan Anggaran : Edit", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.c_tahun = new saiCB(this,{bound:[20,22,202,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:0, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_pp = new saiCBBL(this,{bound:[20,18,200,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_total = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Total Usulan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.p1 = new panel(this,{bound:[20,23,900,400],caption:"Daftar Usulan Anggaran"});							
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:12,tag:0,
		            colTitle:["Kode DRK","Nama DRK","Kode Norma","Keterangan","Kode Akun","Rincian Kegiatan","Sat","Bulan","Tarif","Jumlah","Vol","Total"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,50,50,50,50,50,250,60,150,80,150,80]],					
					columnReadOnly:[true,[1,3,4,6,8,11],[0,2,5,7,9,10]],
					buttonStyle:[[0,2,7],[bsEllips,bsEllips,bsAuto]], 
					colFormat:[[8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai]],
					picklist:[[7],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],checkItem: true,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");						
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			this.c_tahun.setText("");
			var sql = new server_util_arrayList();
			sql.add("select kode_drk,nama from agg_drk where tahun='"+this.c_tahun.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("select kode_norma,nama from agg_norma where kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_ppbs_fUsulanE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_ppbs_fUsulanE.implement({	
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
					sql.add("delete from agg_usul_m where no_usul ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from agg_usul_j where no_usul ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from agg_d where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='UMUM'");
					
					sql.add("insert into agg_usul_m(no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_jurnal,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_app.getText()+"','-',getdate(),'"+this.app._userLog+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into agg_usul_j(no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(6,i)+"','"+this.c_tahun.getText()+this.sg.cells(7,i)+"',"+nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(10,i))+","+nilaiToFloat(this.sg.cells(11,i))+")");
							}
						}
					}
					sql.add("insert into agg_d(no_bukti,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,modul) "+
							"select no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,'UMUM' "+
							"from agg_usul_j where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
				this.sg.validasi();								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}				 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :						
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from agg_usul_m where no_usul ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from agg_usul_j where no_usul ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from agg_d where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='UMUM'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				break;						
		}
	},
	doSelectDate: function(sender, y,m,d){		
		
	},
	doChange:function(sender){				
		if (sender == this.c_tahun && this.c_tahun.getText() != "") {			
			this.e_nb.setSQL("select no_usul, keterangan from agg_usul_m where no_jurnal='-' and tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_usul","keterangan"],false,["No Bukti","Keterangan"],"and","Data Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {			
			var data = this.dbLib.getDataProvider("select tanggal,tahun,keterangan,nik_app,kode_pp from agg_usul_m where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);					
					this.e_ket.setText(line.keterangan);
					this.cb_pp.setText(line.kode_pp);
					this.cb_app.setText(line.nik_app);
				} 
			}			
			var strSQL = "select a.kode_drk,a.kode_norma,a.kode_akun,a.keterangan,a.satuan,substring(a.periode,5,2) as bulan,a.tarif,a.jumlah,a.vol,a.total, "+
						 "b.nama as nama_drk, c.nama as nama_norma "+
			             "from agg_usul_j a inner join agg_drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi "+
						 "				    inner join agg_norma c on a.kode_norma=c.kode_norma "+
						 "where a.no_usul='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_drk,line.nama_drk,line.kode_norma,line.nama_norma,line.kode_akun,line.keterangan,line.satuan,line.bulan,floatToNilai(line.tarif),floatToNilai(line.jumlah),floatToNilai(line.vol),floatToNilai(line.total)]);
				}
			} else this.sg.clear(1);
		}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 10 || col == 8 || col == 9) && this.sg.cells(10,row) != "" && this.sg.cells(8,row) != "" && this.sg.cells(9,row) != "") {
			var nilai = nilaiToFloat(this.sg.cells(10,row)) * nilaiToFloat(this.sg.cells(8,row)) * nilaiToFloat(this.sg.cells(9,row));
			this.sg.cells(11,row,floatToNilai(nilai));
			this.sg.validasi();
		}
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var drk = this.dataDRK.get(sender.cells(0,row));
				if (drk) sender.cells(1,row,drk);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode DRK "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkDRK");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 2) {
			if (this.sg.cells(2,row) != "") {
				var norma = this.dataNorma.get(sender.cells(2,row));
				if (norma) {					
					sender.cells(3,row,norma);										
					var data = this.dbLib.getDataProvider("select a.kode_akun,a.satuan,b.tarif from agg_norma a inner join agg_tarif b on a.kode_norma=b.kode_norma and a.kode_lokasi=b.kode_lokasi and b.tahun='"+this.c_tahun.getText()+"' where a.kode_norma='"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);	
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){					
							sender.cells(4,row,line.kode_akun);
							sender.cells(5,row,norma);
							sender.cells(6,row,line.satuan);
							sender.cells(7,row,"01");
							sender.cells(8,row,floatToNilai(line.tarif));
						} 
					}					
				}
				else {
					if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode Norma "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkNorma");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
					sender.cells(4,row,"");
					sender.cells(5,row,"");
					sender.cells(6,row,"");
					sender.cells(7,row,"");
					sender.cells(8,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(11,i) != ""){
					tot += nilaiToFloat(this.sg.cells(11,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
						    "select kode_drk,nama from agg_drk where tahun='"+this.c_tahun.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_drk) from agg_drk where tahun='"+this.c_tahun.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
							["kode_drk","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar Norma",sender,undefined, 
							"select kode_norma, nama  from agg_norma where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_norma) from agg_norma where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_norma","nama"],"and",["Kode","Nama"],false);				
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
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kopeg_ppbs_rptAggUsul";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_usul='"+this.e_nb.getText()+"' ";
								this.filter2 = this.app._lokasi+"/"+this.c_tahun.getText();
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataDRK = new portalui_arrayMap();							
							this.dataNorma = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataDRK.set(line.kode_drk, line.nama);
								}
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataNorma.set(line.kode_norma, line.nama);
								}
							}							
						}else throw result;
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