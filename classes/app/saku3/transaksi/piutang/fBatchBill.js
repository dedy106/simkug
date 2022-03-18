window.app_saku3_transaksi_piutang_fBatchBill = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_piutang_fBatchBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_piutang_fBatchBill";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Batch Billing: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Batch","List Batch"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Total BP","Tot Kunjungan","Total CS"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,310,80,100]],colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Billing",click:[this,"doLoad3"]});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,12,220,20],caption:"Total BP", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"NIK Approve",tag:2,multiSelection:false}); 						
		this.e_kunj = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,13,220,20],caption:"Tot. Kunjungan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.bLoad = new button(this.pc2.childPage[0],{bound:[480,17,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.e_cs = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,220,20],caption:"Tot. Cost Sharing", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,350], childPage:["Daftar Billing","Detail Billing"]});		
		this.sg5 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:10,tag:0,
		            colTitle:["Status","No Bill","No Invoice","Jenis","Tanggal","Deskripsi","Mitra","Nilai","Kunjungan","CS"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,80,200,210,70,80,120,100,80]],colFormat:[[7,8,9],[cfNilai,cfNilai,cfNilai]],										
					readOnly:true,buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["BATCH","INPROG"]})]],
					nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDoubleClick5"],change:[this,"doChangeCell5"],autoAppend:false,defaultRow:1});		
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg5,pager:[this,"doPager5"]});		
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-30],colCount:35,tag:9,
					colTitle:["NIK","Nama","Loker","Band","Nikes","Nama Pasien","Dokter","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Nilai Kunj","Nilai CS",
							  "Jasa Dokter","KB-KIA","Jasa Dokter Gigi","Jasa Dokter Spe.","UGD","Tindakan Medis","Obat/Bhn Obat","Alkes","Pem. Penunjang","Kamar","Kamar Operasi","Ruang Perwtn Khusus","Kacamata dan Alat Rehab","Biaya Adm Lainnya","PPH","Kunj UMUM","Kunj GIGI","Kunj KBKIA","MATKES","CS",
							  "Kode Keg","No Rujuk"],
					colWidth:[[34,33,32,31,30, 29,28,27,26,25,24,23,22,21,20,19,18,17,16,15, 14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
							  [80,80,  80,80,80,80,80, 80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,    80,80,70,70,70,70,70,100,70,70,100,100,70]],
					colFormat:[[32,31,30, 13,14, 29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai]],
					readOnly:true, defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});				
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
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
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a where a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_piutang_fBatchBill.extend(window.childForm);
window.app_saku3_transaksi_piutang_fBatchBill.implement({	
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
						sql.add("delete from yk_batch_m where no_batch = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update yk_bill_m set no_batch='-',progress='0' where no_batch = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}										
					for (var i=0;i < this.dataJU5.rs.rows.length;i++){
						line = this.dataJU5.rs.rows[i];
						if (line.status.toUpperCase() == "BATCH") {
							sql.add("update yk_bill_m set no_batch='"+this.e_nb.getText()+"',progress='1' where no_bill = '"+line.no_bill+"' and kode_lokasi='"+this.app._lokasi+"'");														
						}
					}					
					sql.add("insert into yk_batch_m(no_batch,kode_lokasi,tanggal,keterangan,periode,nik_app,nik_user,tgl_input,nilai,kunj,cs,progress,no_hutang) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',getdate(),"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_kunj.getText())+","+nilaiToFloat(this.e_cs.getText())+",'0','-')");										
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
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.sg1.clear(1); this.sg3.clear(1); this.sg5.clear(1); 
					setTipeButton(tbAllFalse);					
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";												
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total BP tidak boleh nol atau kurang.");
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
				sql.add("delete from yk_batch_m where no_batch = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("update yk_bill_m set no_batch='-',progress='0' where no_batch = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}		
		if (this.stsSimpan == 1) this.doClick();				
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.stsSimpan ==1) this.doClick();						
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg3.clear(1); this.sg1.clear(1); this.sg5.clear(1);				
				this.dataJU5 = {rs:{rows:[]}};
				this.e_total.setText("0");
				this.e_kunj.setText("0");
				this.e_cs.setText("0");
				this.bLoad.show();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_batch_m","no_batch",this.app._lokasi+"-BC"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_app.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doLoad:function(sender){		
		this.dataJU5 = {rs:{rows:[]}};
		var strSQL = "select 'INPROG' as status,a.no_bill,a.jenis,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_vendor+' - '+b.nama as mitra,a.nilai,a.kunj,a.cs "+
		             "from yk_bill_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+					 
					 "where a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='MITRA'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU5 = data;
			this.sgn5.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn5.rearrange();
			this.doTampilData5(1);
		} else this.sg5.clear(1);						
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doTampilData5: function(page) {		
		this.sg5.clear(); this.sg1.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU5.rs.rows.length? this.dataJU5.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU5.rs.rows[i];												
			this.sg5.appendData([line.status.toUpperCase(),line.no_bill,line.no_dokumen,line.jenis,line.tgl,line.keterangan,line.mitra,floatToNilai(line.nilai),floatToNilai(line.kunj),floatToNilai(line.cs)]);
		}
		this.sg5.setNoUrut(start);		
	},
	doPager5: function(sender, page) {
		this.doTampilData5(page);
	},	
	doChangeCell5: function(sender, col , row) {
		if (col == 0) {			
			this.dataJU5.rs.rows[((this.page-1)*20) + row].status = this.sg5.cells(0,row);			
			var bp = kunj = cs = 0;
			for (var i=0;i < this.dataJU5.rs.rows.length;i++){
				line = this.dataJU5.rs.rows[i];
				if (line.status.toUpperCase() == "BATCH") {
					bp += parseFloat(line.nilai);
					kunj += parseFloat(line.kunj);
					cs += parseFloat(line.cs);
				}
			}			
			this.e_total.setText(floatToNilai(bp));
			this.e_kunj.setText(floatToNilai(kunj));
			this.e_cs.setText(floatToNilai(cs));
		}
	},
	doDoubleClick5: function(sender, col , row) {		
		try {
			if (this.sg5.cells(1,row) != "") {
				this.dbLib.execQuerySync("call sp_yk_bill ('"+this.sg5.cells(1,row)+"','"+this.app._lokasi+"')");			
				var data = this.dbLib.getDataProvider("select *,kode_produk as kode_biaya from yk_bill_lap where no_bill='"+this.sg5.cells(1,row)+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut",true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;					
					this.sg1.clear();				
					this.selectPage(undefined, 1);
					this.sgn.setTotalPage(Math.ceil(this.dataJU.rs.rows.length / 20));
					this.sgn.rearrange();
					this.sgn.activePage = 0;	
					
				} else this.sg1.clear(1);													
				this.pc1.setActivePage(this.pc1.childPage[1]);
			}		
		}
		catch(e) {
			alert(e);
		}
	},						
	selectPage: function(sender,page){
		try {
			var start = (page - 1) * 20;
			var finish = start + 20;			
			finish = (finish > this.dataJU.rs.rows.length ? this.dataJU.rs.rows.length : finish);
			this.sg1.clear();
			for (var i=start; i < finish;i++){
				line = this.dataJU.rs.rows[i];
				this.sg1.appendData([line.nik,line.nama,line.loker,line.band,line.nikkes,line.pasien,line.dokter,line.tgl_masuk,line.tgl_keluar,line.icdx,line.kode_biaya,0,0,  	
									 floatToNilai(line.n1),floatToNilai(line.n2),floatToNilai(line.n3),floatToNilai(line.n4),floatToNilai(line.n5),floatToNilai(line.n6),floatToNilai(line.n7),floatToNilai(line.n8),floatToNilai(line.n9),floatToNilai(line.n11),floatToNilai(line.n12),floatToNilai(line.n13),floatToNilai(line.n14),floatToNilai(line.n15),floatToNilai(line.pph),
									 floatToNilai(line.umum),floatToNilai(line.gigi),floatToNilai(line.kbia),floatToNilai(line.matkes),floatToNilai(line.cs),line.kode_keg,line.no_rujuk]);
			}
			this.sg1.setNoUrut(start);
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
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.dataJU5 = {rs:{rows:[]}};
			this.sg1.clear(1); this.sg3.clear(1); this.sg5.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_batch,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.kunj,a.cs "+
		             "from yk_batch_m a "+					 					 
					 "where progress ='0' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
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
			this.sg3.appendData([line.no_batch,line.tgl,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.kunj),floatToNilai(line.cs)]); 
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
				this.bLoad.hide();
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select keterangan,nik_app,tanggal,nilai,kunj,cs from yk_batch_m "+							 
							 "where no_batch = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.cb_app.setText(line.nik_app);
						this.e_ket.setText(line.keterangan);												
						this.e_total.setText(floatToNilai(line.nilai));
						this.e_kunj.setText(floatToNilai(line.kunj));
						this.e_cs.setText(floatToNilai(line.cs));
					}
				}								
				this.dataJU5 = {rs:{rows:[]}};
				
				var strSQL = "select 'BATCH' as status,a.no_bill,a.jenis,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_vendor+' - '+b.nama as mitra,a.nilai,a.kunj,a.cs "+
							 "from yk_bill_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+					 
							 "where a.no_batch='"+this.e_nb.getText()+"' and a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis='MITRA'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU5 = data;
					this.sgn5.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn5.rearrange();
					this.doTampilData5(1);
				} else this.sg5.clear(1);						
				this.pc1.setActivePage(this.pc1.childPage[0]);												
			}									
		} catch(e) {alert(e);}
	}
});