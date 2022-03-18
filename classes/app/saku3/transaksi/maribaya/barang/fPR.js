window.app_saku3_transaksi_maribaya_barang_fPR = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_maribaya_barang_fPR.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_maribaya_barang_fPR";
		this.itemsValue = new portalui_arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Purchase Request Barang", 0);	
				
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Pesan"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
				colTitle:["No Request","Tanggal","Keterangan","Pilih"],
				colWidth:[[3,2,1,0],[70,300,80,100]],
				colFormat:[[3],[cfButton]],						
				click:[this,"doSgBtnClick3"], colAlign:[[3],[alCenter]],													 					 
				readOnly:true,dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"No Dokumen", maxLength:100});								
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,328], childPage:["Data Item Barang","Otorisasi"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:0,
		        colTitle:["Kode","Nama Barang","Satuan","Jumlah"],					
				colWidth:[[3,2,1,0],[100,80,300,100]],					
				columnReadOnly:[true,[1,2]],								
				buttonStyle:[[0],[bsEllips]], 
				colFormat:[[3],[cfNilai]],
				ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],
				autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.cb_nik1 = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"NIK Pengaju", multiSelection:false, maxLength:10, tag:2});
		this.cb_nik2 = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
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
			
			this.cb_nik1.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],"and",["NIK","Nama"],false);				
			this.cb_nik2.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],"and",["NIK","Nama"],false);				
			this.cb_nik1.setText(this.app._userLog);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_maribaya_barang_fPR.extend(window.portalui_childForm);
window.app_saku3_transaksi_maribaya_barang_fPR.implement({		
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
						sql.add("delete from mb_pesan_m where no_pesan = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from mb_pesan_d where no_pesan = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}
					
					sql.add("insert into mb_pesan_m (no_pesan,kode_lokasi,tgl_input,nik_user,periode,kode_pp,tanggal,no_dokumen,keterangan,nik1,nik2) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_nik1.getText()+"','"+this.cb_nik2.getText()+"')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){										
								sql.add("insert into mb_pesan_d (no_pesan,kode_lokasi,periode,nu,kode_barang,satuan,jumlah,no_po) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+",'-')");

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
					this.sg.clear(1);  this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.doClick();
				}
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";								
				this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from mb_pesan_m where no_pesan = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from mb_pesan_d where no_pesan = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;									
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1);	
				this.sg3.clear(1); 							
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"mb_pesan_m","no_pesan",this.app._lokasi+"-PR"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) this.doClick();			
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select kode_barang,nama from brg_barang where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_barang) from brg_barang where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_barang","nama"],"and",["Kode","Nama"],false);				
			}
		
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0 && this.sg.cells(0,row)!="") {	
		try{		
			if (this.sg.cells(0,row) != "") {		
				var strSQL = "select a.nama,a.sat_kecil from brg_barang a "+
							 "where a.flag_aktif='1' and a.kode_barang ='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.sg.cells(1,row,line.nama);									
						this.sg.cells(2,row,line.sat_kecil);						
						this.sg.cells(3,row,"0");							
					} 				
				}				
			}
			}catch(e){
				alert(e);
			}			
		}		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_produk_rptBeli";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/"+this.app._lokasi;
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
			this.sg.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		//pesan_d belum ada yg dibuat PO
		var strSQL = "select a.no_pesan,convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
					 "from mb_pesan_m a "+
					 "		left join ("+					 
					 "			select distinct no_pesan from mb_pesan_d where no_po<>'-' and kode_lokasi='"+this.app._lokasi+"' "+					 
					 "		) b on a.no_pesan=b.no_pesan "+
				     "where b.no_pesan is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					 "order by a.no_pesan";			
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
			this.sg3.appendData([line.no_pesan,line.tgl,line.keterangan,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 3) this.doDoubleClick3(this.sg3,0,row);						
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
								
				var strSQL = "select * from mb_pesan_m where no_pesan = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);											
						this.e_dok.setText(line.no_dokumen);												
						this.e_ket.setText(line.keterangan);												
						this.cb_nik1.setText(line.nik1);												
						this.cb_nik2.setText(line.nik2);												
					}
				}												
				
				var data = this.dbLib.getDataProvider(
							"select b.kode_barang,b.nama,a.satuan,a.jumlah "+
							"from mb_pesan_d a "+
							"inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_pesan = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_barang,line.nama,line.satuan,floatToNilai(line.jumlah)]);
					}
				} else this.sg.clear(1);							
				
			}									
		} catch(e) {alert(e);}
	}
});