window.app_saku3_transaksi_maribaya_barang_fPO = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_maribaya_barang_fPO.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_maribaya_barang_fPO";
		this.itemsValue = new portalui_arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Purchase Order Barang", 0);	
				
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List PO"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No PO","Tanggal","Keterangan","Nilai Net","Pilih"],
								colWidth:[[4,3,2,1,0],[70,100,300,80,100]],
								readOnly:true,
								colFormat:[[3,4],[cfNilai,cfButton]],
								click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 					 
								dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_vendor = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Vendor",multiSelection:false,tag:1});
		this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,450,20],caption:"No Dokumen", maxLength:100});								
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});						
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Grand Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,305], childPage:["Purchase Req","Data Item Barang","Otorisasi"]});		
		this.cb_pesan = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"No Request",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.e_tglpr = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Tgl Request", readOnly:true});								
		this.e_ket2 = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", readOnly:true});								
		this.e_pp = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"PP / Unit", readOnly:true});								

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-205,this.pc1.height-33],colCount:7,tag:0,
		            colTitle:["ID","Kode","Nama Barang","Satuan","Jumlah","Harga","SubTtl"],					
								colWidth:[[6,5,4,3,2,1,0],[100,80,80,50,320,80,30]],					
								columnReadOnly:[true,[0,1,2,3,4]],																 
								colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
								change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
								autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.cb_nik1 = new saiCBBL(this.pc1.childPage[2],{bound:[20,10,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_nik2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,11,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	

		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[800,5,160,20],caption:"SubTotal", tag:1, readOnly:true, tipeText:ttNilai, text:"0", labelWidth:60});		
		this.e_diskon = new saiLabelEdit(this.pc1.childPage[1],{bound:[800,28,160,20],caption:"Diskon ", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"], labelWidth:60});				
		this.i_hit1 = new portalui_imageButton(this.pc1.childPage[1],{bound:[965,28,20,20],hint:"Hitung %",image:"icon/"+system.getThemes()+"/copyentries.png",click:[this,"doHitung"]});				
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[1],{bound:[800,51,160,20],caption:"PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true, labelWidth:60});		
		this.i_hit2 = new portalui_imageButton(this.pc1.childPage[1],{bound:[965,51,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/copyentries.png",click:[this,"doHitung"]});		
		this.e_biaya = new saiLabelEdit(this.pc1.childPage[1],{bound:[800,74,160,20],caption:"Biaya+ ", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"], labelWidth:60});				
		
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
					
			this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_lokasi = '"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);
			this.cb_nik1.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],"and",["NIK","Nama"],false);				
			this.cb_nik2.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],"and",["NIK","Nama"],false);				
			this.cb_nik1.setText(this.app._userLog);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_maribaya_barang_fPO.extend(window.portalui_childForm);
window.app_saku3_transaksi_maribaya_barang_fPO.implement({	
	isiCBPesan: function() {
		this.cb_pesan.setSQL("select a.no_pesan,a.keterangan from mb_pesan_m a inner join (select distinct no_pesan from mb_pesan_d where kode_lokasi='"+this.app._lokasi+"' and no_po='-') b on a.no_pesan=b.no_pesan where a.kode_lokasi='"+this.app._lokasi+"'",["a.no_pesan","a.keterangan"],false,["No PR","Nama"],"and","Data Request",true);
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
						sql.add("delete from mb_po_m where no_po = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from mb_po_d where no_po = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
						sql.add("update mb_pesan_d set no_po='-' where no_po = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					}

					//no_ref1=no_pesan, no_ref2=no_ba
					sql.add("insert into mb_po_m (no_po,kode_lokasi,tgl_input,nik_user,periode,tanggal,no_dokumen,keterangan,nilai1,nilai2,nilai3,nilai4,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"',"+
							parseNilai(this.e_total.getText())+","+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_diskon.getText())+","+parseNilai(this.e_biaya.getText())+",'"+this.cb_nik1.getText()+"','"+this.cb_nik2.getText()+"','-','"+this.cb_pesan.getText()+"','-','-','"+this.cb_vendor.getText()+"','-','-')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){										
								if (nilaiToFloat(this.sg.cells(6,i)) !=0) {
									sql.add("insert into mb_po_d (no_po,no_pesan,kode_lokasi,periode,nu,kode_barang,satuan,jumlah,harga,total) values "+
													"('"+this.e_nb.getText()+"','"+this.cb_pesan.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+this.sg.cells(0,i)+",'"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+")");
									sql.add("update mb_pesan_d set no_po='"+this.e_nb.getText()+"' where no_pesan = '"+this.cb_pesan.getText()+"' and nu="+this.sg.cells(0,i)+" and kode_lokasi='"+this.app._lokasi+"'");							
								}
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
					this.sg.clear(1); this.sg3.clear();
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.isiCBPesan();
					this.doClick();
				}
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";			
				this.sg.validasi();	
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;
				}															
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from mb_po_m where no_po = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from mb_po_d where no_po = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
				sql.add("update mb_pesan_d set no_po='-' where no_po = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				this.isiCBPesan();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"mb_po_m","no_po",this.app._lokasi+"-PO"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.cb_vendor.setFocus();
			setTipeButton(tbSimpan);			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) {
			this.isiCBPesan();
			this.doClick();			
		}
	},	
	doChangeCell: function(sender, col, row){		
		if (col == 5) {
			if (this.sg.cells(5,row) != "") {				
				this.sg.cells(6,row,parseFloat(nilaiToFloat(this.sg.cells(4,row)) * nilaiToFloat(this.sg.cells(5,row))));
			}
		}		
		this.sg.validasi();		
	},
	doHitung: function(sender) {
		if (sender == this.i_hit1) {
			if (this.e_nilai.getText()!="") {
				if (nilaiToFloat(this.e_diskon.getText()) < 100) { 							
					this.e_diskon.setText(floatToNilai(Math.round(nilaiToFloat(this.e_nilai.getText()) * (nilaiToFloat(this.e_diskon.getText()) / 100))));			
				}
				else system.alert(this,"Persentase melebihi 100%","");
			}
		}
		if (sender == this.i_hit2) {			
			if (this.e_diskon.getText()!="" && this.e_nilai.getText()!="") 
				if (this.e_ppn.getText() == "0")
					this.e_ppn.setText(floatToNilai(Math.round((nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText()))*10/100)));						
				else this.e_ppn.setText("0");
		}
	},
	doNilaiChange: function(){
		try{
			this.bonus = this.diskon = 0;
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != ""){
					tot += nilaiToFloat(this.sg.cells(6,i));					
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
			this.e_total.setText(floatToNilai(tot-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText()) +nilaiToFloat(this.e_biaya.getText())));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doChange:function(sender){
		try {
			if (sender == this.cb_pesan && this.cb_pesan.getText()!="") {
				var strSQL = "select convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp+' | '+b.nama as pp from mb_pesan_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where a.no_pesan = '"+this.cb_pesan.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";									
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_tglpr.setText(line.tgl);
						this.e_ket2.setText(line.keterangan);
						this.e_pp.setText(line.pp);
					}				
				}	

				if (this.stsSimpan==1) {
					var strSQL = "select a.nu,b.kode_barang,b.nama,a.satuan,a.jumlah "+
											 "from mb_pesan_d a "+
											 "inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+									 
											 "where a.no_po='-' and a.no_pesan = '"+this.cb_pesan.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];												
							this.sg.appendData([line.nu,line.kode_barang,line.nama,line.satuan,floatToNilai(line.jumlah),"0","0"]);
						}
					} else this.sg.clear(1);	
				}						
			}
			if (sender == this.e_ppn || sender == this.e_nilai || sender == this.e_diskon || sender == this.e_biaya) {
				if (this.e_nilai.getText()!="" && this.e_ppn.getText()!="" && this.e_diskon.getText()!="" && this.e_biaya.getText()!="") {
					this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText()) +nilaiToFloat(this.e_biaya.getText()) ));
				}
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
			this.isiCBPesan();
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_po,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai1 "+
								 "from mb_po_m a "+				     
								 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
								 "order by a.no_po";			
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
			this.sg3.appendData([line.no_po,line.tgl,line.keterangan,floatToNilai(line.nilai1),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row);						
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
								
				var strSQL = "select * from mb_po_m where no_po = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.dp_d1.setText(line.tanggal);								
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);			
						this.e_diskon.setText(floatToNilai(line.nilai3));												
						this.e_ppn.setText(floatToNilai(line.nilai2));	
						this.e_biaya.setText(floatToNilai(line.nilai4));	
						
						this.cb_pesan.setSQL("select no_pesan, keterangan from mb_pesan_m where no_pesan='"+line.no_ref1+"' and kode_lokasi='"+this.app._lokasi+"'",["no_pesan","keterangan"],false,["No Request","Deskripsi"],"and","Data Request",true);															
						this.cb_pesan.setText(line.no_ref1);						
						this.cb_vendor.setText(line.param1);				
						
						this.cb_nik1.setText(line.nik1);												
						this.cb_nik2.setText(line.nik2);												

					}
				}												
				
				var data = this.dbLib.getDataProvider("select a.nu,b.kode_barang,b.nama,a.satuan,a.jumlah,a.harga,a.total "+
										"from mb_po_d a "+
										"inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi "+
										"where a.no_po = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.nu,line.kode_barang,line.nama,line.satuan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total)]);
					}
				} else this.sg.clear(1);		
				this.sg.validasi();					
				
			}									
		} catch(e) {alert(e);}
	}
});