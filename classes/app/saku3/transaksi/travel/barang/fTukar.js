window.app_saku3_transaksi_travel_barang_fTukar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_barang_fTukar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_barang_fTukar";
		this.itemsValue = new portalui_arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form IN-OUT / Tukar Barang", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[400,200,100,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:100});								
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_gudang = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Gudang",multiSelection:false,tag:2,change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,305], childPage:["Data Barang Keluar","Data Barang Masuk"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
		            colTitle:["Kode","Nama Barang","Satuan","Stok","Jml Keluar"],
					colWidth:[[4,3,2,1,0],[100,100,100,350,100]],					
					columnReadOnly:[true,[1,2,3]],
					colFormat:[[3,4],[cfNilai,cfNilai]],
					buttonStyle:[[0],[bsEllips,bsEllips]], 					
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
		            colTitle:["Kode","Nama Barang","Satuan","Jml Masuk"],
					colWidth:[[3,2,1,0],[100,100,350,100]],					
					columnReadOnly:[true,[1,2]],
					colFormat:[[3],[cfNilai]],
					buttonStyle:[[0],[bsEllips,bsAuto,bsDate]], 					
					ellipsClick:[this,"doEllipseClick1"],change:[this,"doChangeCell1"],
					autoAppend:true,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		this.rearrangeChild(10, 22);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);				
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			
			this.cb_gudang.setSQL("select a.kode_gudang, a.nama from brg_gudang a "+
								 "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								 "where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
			var data = this.dbLib.getDataProvider("select top 1 kode_gudang from brg_gudang where kode_pp ='"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];					
				this.cb_gudang.setText(line.kode_gudang); 										
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_barang_fTukar.extend(window.portalui_childForm);
window.app_saku3_transaksi_travel_barang_fTukar.implement({
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
			this.nik_user=this.app._userLog;						
			var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);				    
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)){						
					if (this.stsSimpan == 1)  
						var data = this.dbLib.getDataProvider("select stok from brg_stok where kode_barang='"+this.sg.cells(0,i)+"' and kode_gudang='"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nik_user='"+this.nik_user+"'",true);
					else var data = this.dbLib.getDataProvider(
									"select a.stok+isnull(b.jumlah+b.bonus,0) as stok "+
									"from brg_stok a left join brg_trans_d b on a.kode_barang = b.kode_barang and a.kode_lokasi=b.kode_lokasi and b.no_bukti='"+this.e_nb.getText()+"' and b.dc='C' "+
									"where a.kode_barang='"+this.sg.cells(0,i)+"' and a.kode_gudang='"+this.cb_gudang.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.nik_user='"+this.nik_user+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0]; 
						if (line != undefined) this.sg.cells(3,i,parseFloat(line.stok));
					}						
					if (nilaiToFloat(this.sg.cells(3,i)) < (nilaiToFloat(this.sg.cells(4,i)))) {
						var k = i+1;
						system.alert(this,"Transaksi tidak valid.","Jumlah Barang Out melebihi Stok ["+k+"]");
						return false;						
					}
					for (var j=i;j < this.sg.getRowCount();j++){
						if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
							return false;
						}
					}
				}
			}

			if (this.stsSimpan == 1) this.doClick();			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{																																							
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from brg_trans_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}										
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','IV','BRGIO','X','0','0','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','IDR',1,0,0,0,'-','-','-','-','-','-','"+this.cb_gudang.getText()+"','-','-')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){	
								sql.add("insert into brg_trans_d (no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','BRGIO','BRGIO',"+i+",'"+this.cb_gudang.getText()+"','"+this.sg.cells(0,i)+"','-',getdate(),'"+this.sg.cells(2,i)+"','C',"+nilaiToFloat(this.sg.cells(3,i))+","+
										nilaiToFloat(this.sg.cells(4,i))+",0,0,0,0,0,0,0)");
							}
						}						
					}
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){	
								var j = i+1000;																																																	
								sql.add("insert into brg_trans_d (no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','BRGIO','BRGIO',"+j+",'"+this.cb_gudang.getText()+"','"+this.sg1.cells(0,i)+"','-',getdate(),'"+this.sg1.cells(2,i)+"','D',0,"+
										nilaiToFloat(this.sg1.cells(3,i))+",0,0,0,0,0,0,0)");
							}
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
					this.sg.clear(1);  this.sg1.clear(1); this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					
					this.nik_user=this.app._userLog;						
					var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
					this.dbLib.execQuerySync(sql);				

					this.doClick();
				}
				break;
			case "simpan" :	
			case "ubah" :			
				this.preView = "1";								
				if (this.standarLib.doCekPeriode(this.dbLib,"IV",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (IV - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"IV",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (IV - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from brg_trans_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;									
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {
				this.cb_gudang.setSQL("select a.kode_gudang, a.nama from brg_gudang a "+
								 "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								 "where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
				var data = this.dbLib.getDataProvider("select top 1 kode_gudang from brg_gudang where kode_pp ='"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"'",true);			
				if (typeof data == "object"){
					var line = data.rs.rows[0];					
					this.cb_gudang.setText(line.kode_gudang); 										
				}
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti","IO/"+this.e_periode.getText().substr(2,4)+"/","0000"));			
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}
	},	
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
			
			this.nik_user=this.app._userLog;						
			var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);			

			if (this.stsSimpan == 1) this.doClick();			
		}catch(e) {alert(e);}
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0 && this.cb_gudang.getText()!=""){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select kode_barang,nama from brg_barang where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",
											  "select count(kode_barang) from brg_barang where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",
											  ["kode_barang","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doEllipseClick1: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select kode_barang,nama from brg_barang where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",
											  "select count(kode_barang) from brg_barang where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1' ",
											  ["kode_barang","nama"],"and",["Kode","Nama"],false);				
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if ( col == 0 && this.sg.cells(0,row)!="" &&  this.cb_gudang.getText()!="") {												
			if (this.stsSimpan == 1) {
				var strSQL = "select a.nama,a.sat_kecil,b.stok "+
							 "from brg_barang a inner join brg_stok b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi and b.kode_gudang='"+this.cb_gudang.getText()+"' and b.nik_user='"+this.app._userLog+"' "+
							 "where a.kode_barang='"+this.sg.cells(0,row)+"' and a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' ";						 			
			}
			else {
				var strSQL = "select a.nama,a.sat_kecil,b.stok+isnull(c.jumlah+c.bonus,0) as stok "+
							 "from brg_barang a inner join brg_stok b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi and b.kode_gudang='"+this.cb_gudang.getText()+"' and b.nik_user='"+this.app._userLog+"' "+
							 "                left join brg_trans_d c on b.kode_barang = c.kode_barang and b.kode_lokasi=c.kode_lokasi and c.no_tukar='"+this.e_nb.getText()+"' and c.dc='C' "+
							 "where a.kode_barang='"+this.sg.cells(0,row)+"' and a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' ";
			}			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.sg.cells(1,row,line.nama);			
					this.sg.cells(2,row,line.sat_kecil);	
					this.sg.cells(3,row,parseFloat(line.stok));						
					this.sg.cells(4,row,"0");											
				} 				
			}			
		}							
	},
	doChangeCell1: function(sender, col, row){
		if (col == 0 && this.sg1.cells(0,row)!="") {			
			if (this.sg1.cells(0,row) != "") {							
				var strSQL = "select nama,sat_kecil from brg_barang where kode_barang ='"+this.sg1.cells(0,row)+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.sg1.cells(1,row,line.nama);	
						this.sg1.cells(2,row,line.sat_kecil);						
						this.sg1.cells(3,row,"0");							
					} 				
				}				
			}			
		}						
	},	
	doChange:function(sender){		
		if (sender == this.cb_gudang && this.stsSimpan == 1) {
			this.sg.clear(1);
			this.sg1.clear(1);
		}				
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tukar='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1);  this.sg1.clear(1); this.sg3.clear(1);  
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			
			this.nik_user=this.app._userLog;						
			var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);		

			this.doClick();		
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan "+
		             "from trans_m a "+	
					 "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+				 					 			 					 				 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.form='BRGIO' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan]); 
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
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
												
				var strSQL = "select * from trans_m "+							 
							 "where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);																		
						this.cb_gudang.setSQL("select kode_gudang, nama from brg_gudang where kode_gudang='"+line.param1+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);									
						this.cb_gudang.setText(line.param1);												
					}
				}												
				
				this.nik_user=this.app._userLog;						
				var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
				this.dbLib.execQuerySync(sql);	
										
				var strSQL = "select a.kode_barang,b.nama,a.satuan,a.jumlah,b.pabrik,c.stok+a.jumlah as stok "+
							 "from brg_trans_d a inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+
							 "                   inner join brg_stok c on a.kode_barang=c.kode_barang and a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.nik_user+"' "+
							 "where a.dc='C' and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.flag_aktif='1' ";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg.appendData([line1.kode_barang,line1.nama,line1.satuan,parseFloat(line1.stok),parseFloat(line1.jumlah)]);
					}
				} else this.sg.clear(1);																
				
				
				var strSQL = "select a.kode_barang,b.nama,a.satuan,a.jumlah  "+
							 "from brg_trans_d a inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+
							 "                   inner join brg_stok c on a.kode_barang=c.kode_barang and a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.nik_user+"' "+
							 "where a.dc='D' and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.flag_aktif='1' ";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg1.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg1.appendData([line1.kode_barang,line1.nama,line1.satuan,parseFloat(line1.jumlah)]);
					}
				} else this.sg1.clear(1);																
			}									
		} catch(e) {alert(e);}
	}
});