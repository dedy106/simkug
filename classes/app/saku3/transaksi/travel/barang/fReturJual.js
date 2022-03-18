window.app_saku3_transaksi_travel_barang_fReturJual = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_travel_barang_fReturJual.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_travel_barang_fReturJual";
		this.itemsValue = new portalui_arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Retur Penjualan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,400,200,100,100]],
					colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:100});								
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_gudang = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Gudang",multiSelection:false,tag:2,change:[this,"doChange"]});
		this.cb_cust = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Customer",multiSelection:false,tag:2});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[765,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,281], childPage:["Data Barang Masuk","Item Jurnal"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9,
		            colTitle:["Kode","Nama Barang","Satuan","Jml Retur","Harga","Subtotal"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,100,330,100]],					
					columnReadOnly:[true,[1,2]],
					colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0],[bsEllips,bsEllips]], 					
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9,
		            colTitle:["Kode Akun","DC","Keterangan","Nilai","Kode PP","Jenis"],
					colWidth:[[5,4,3,2,1,0],[120,120,120,300,100,120]],					
					readOnly:true,colFormat:[[3],[cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_jurnal = new portalui_imageButton(this.sgn2,{bound:[960,2,20,20],hint:"Simulasi Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doJurnal"]});		

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
						
			this.isiCBGudang();					 
			var data = this.dbLib.getDataProvider("select top 1 kode_gudang from brg_gudang where kode_pp ='"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];					
				this.cb_gudang.setText(line.kode_gudang); 										
			}
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			
			var sql = new server_util_arrayList();
			sql.add("select a.kode_barang,b.akun_pers as kode_akun from brg_barang a inner join brg_barangklp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_travel_barang_fReturJual.extend(window.portalui_childForm);
window.app_saku3_transaksi_travel_barang_fReturJual.implement({
	isiCBGudang: function(){
		this.cb_gudang.setSQL("select a.kode_gudang, a.nama from brg_gudang a "+
							  "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
							  "where a.kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
	},
	doJurnal : function() {
		if (this.cb_cust.getText() != "") {
			var data = this.dbLib.getDataProvider("select akun_piutang from cust where kode_cust ='"+this.cb_cust.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];					
				this.akunPiutang = line.akun_piutang;										
			}	

			this.sg2.clear();
			var nilai = 0;
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) {
					nilai = nilaiToFloat(this.sg.cells(3,i)) * (nilaiToFloat(this.sg.cells(4,i))) ;
					var isAda = false;
					var idx = total = 0;

					var akun = this.dataAkunBrg.get(this.sg.cells(0,i));									
					for (var j=0;j < this.sg2.getRowCount();j++){
						if (akun == this.sg2.cells(0,j)) {
							isAda = true;
							idx = j;
							break;
						}
					}
					if (!isAda) {							
						this.sg2.appendData([akun,"D","Persediaan Barang",floatToNilai(nilai),this.app._kodePP,"RETURBRG"]);
					} 
					else { 
						total = nilaiToFloat(this.sg2.cells(3,idx));
						total = total + nilai;
						this.sg2.setCell(3,idx,total);
					}

					this.sg2.appendData([this.akunPiutang,"C","Piutang Cust Penjualan",floatToNilai(nilai),this.app._kodePP,"PIUTANG"]);

				}		
			}
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
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from brg_trans_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					

					var strSQL = "select kode_pp from brg_gudang where kode_gudang = '"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){	
							var vKodePP = line.kode_pp;											
						}
					}	
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','IV','BRGRETJUAL','F','-','-','"+vKodePP+"','"+this.dp_d1.getDateString()+"','-','Retur Pembelian No: "+this.e_nb.getText()+"','IDR',1,"+parseNilai(this.e_total.getText())+",0,0,'-','-','-','-','-','-','"+this.cb_gudang.getText()+"','"+this.cb_cust.getText()+"','-')");
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){	
								if (this.sg2.cells(5,i) == "PIUTANG") var kodeCust = this.cb_cust.getText();
								else var kodeCust = "-";	

								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"',"+parseNilai(this.sg2.cells(3,i))+","+parseNilai(this.sg2.cells(3,i))+",'"+this.sg2.cells(2,i)+"','BRGRETJUAL','"+this.sg2.cells(5,i)+"','IDR',1,'"+this.sg2.cells(4,i)+"','-','"+this.cb_cust.getText()+"','-','-','-','-','-','-')");
							}
						}						
					}
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																																										
								//modul = BRGBELI --> utk hitung spro h_avg
								sql.add("insert into brg_trans_d (no_bukti,kode_lokasi,periode,modul,form,nu,kode_gudang,kode_barang,no_batch,tgl_ed,satuan,dc,stok,jumlah,bonus,harga,hpp,p_disk,diskon,tot_diskon,total) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','BRGBELI','BRGBELI',"+i+",'"+this.cb_gudang.getText()+"','"+this.sg.cells(0,i)+"','-',getdate(),'"+this.sg.cells(2,i)+"','D',0,"+nilaiToFloat(this.sg.cells(3,i))+
										",0,"+nilaiToFloat(this.sg.cells(4,i))+",0,0,0,0,"+nilaiToFloat(this.sg.cells(5,i))+")");
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
					this.sg.clear(1);  this.sg2.clear(1); this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					this.doClick();
					this.isiCBGudang();		
				}
				break;
			case "simpan" :	
			case "ubah" :			
				this.preView = "1";		
				this.doJurnal();
				var tot = 0;
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (this.sg2.rowValid(i)){		
						if (this.sg2.cells(1,i) == "D") tot += nilaiToFloat(this.sg2.cells(3,i)); 	
						if (this.sg2.cells(1,i) == "C") tot -= nilaiToFloat(this.sg2.cells(3,i)); 	
					}
				}				
				if (tot != 0) {
					system.alert(this,"Jurnal tidak balance.","Periksa kembali jurnalnya.");
					return false;
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;
				}						
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
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
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
				this.isiCBGudang();		
				var data = this.dbLib.getDataProvider("select top 1 kode_gudang from brg_gudang where kode_pp ='"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"'",true);			
				if (typeof data == "object"){
					var line = data.rs.rows[0];					
					this.cb_gudang.setText(line.kode_gudang); 										
				}
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti","RJ/"+this.e_periode.getText().substr(2,4)+"/","0000"));			
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}
	},	
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			this.e_periode.setText(y+""+m);			
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
	doChangeCell: function(sender, col, row){
		try{
			if (col == 0 && this.sg.cells(0,row)!="") {			
				if (this.sg.cells(0,row) != "") {							
					var strSQL = "select nama,sat_kecil from brg_barang where kode_barang ='"+this.sg.cells(0,row)+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){										
							this.sg.cells(1,row,line.nama);	
							this.sg.cells(2,row,line.sat_kecil);						
							this.sg.cells(3,row,"0");
							this.sg.cells(4,row,"0");
							this.sg.cells(5,row,"0");						
						} 				
					}				
				}			
			}	
			if (col == 3 || col == 4) {
				if (this.sg.cells(3, row) != "" && this.sg.cells(4, row) != "") {
					this.sg.cells(5, row, Math.round(nilaiToFloat(this.sg.cells(4, row)) * nilaiToFloat(this.sg.cells(3, row))));
				}
			}
			this.sg.validasi();	
		} catch(e) {
			alert(e);
		}					
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != ""){
					tot += nilaiToFloat(this.sg.cells(5,i));										
				}
			}
			this.e_total.setText(floatToNilai(tot));
		}catch(e){
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChange:function(sender){		
		if (sender == this.cb_gudang && this.stsSimpan == 1) {
			this.sg.clear(1);
			this.sg3.clear(1);
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
	    			case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkunBrg = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkunBrg.set(line.kode_barang, line.kode_akun);										
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
			this.sg.clear(1);  this.sg2.clear(1); this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.doClick();		
			this.isiCBGudang();		
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																		
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai1 "+
					 "from trans_m a "+
				     "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+				 					 			 					 				 					 
					 "where a.modul='IV' and a.form='BRGRETJUAL' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' "
					 "order by a.no_bukti";			
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai1)]); 
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
												
				var strSQL = "select * from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);																		
						this.cb_gudang.setText(line.param1);
						this.cb_cust.setText(line.param2);												
					}
				}												
				
				var strSQL = "select a.kode_barang,b.nama,a.satuan,a.jumlah,a.harga,a.harga*a.jumlah as total  "+
							 "from brg_trans_d a inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+						
							 "where a.dc='D' and a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.flag_aktif='1' ";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg.appendData([line1.kode_barang,line1.nama,line1.satuan,parseFloat(line1.jumlah),parseFloat(line1.harga),parseFloat(line1.total)]);
					}
				} else this.sg.clear(1);																															
			}									
		} catch(e) {alert(e);}
	}
});