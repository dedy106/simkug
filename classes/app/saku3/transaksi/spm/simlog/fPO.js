window.app_saku3_transaksi_spm_simlog_fPO = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spm_simlog_fPO.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_simlog_fPO";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Purchase Order", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data PO","List PO"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Mitra","Nilai"],
					colWidth:[[4,3,2,1,0],[100,200,310,80,100]],readOnly:true,
					colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No PO",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,450,20],caption:"No Dokumen", maxLength:50});						
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});							
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"PP / Cabang Req", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.cb_pesan = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"No Request", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,14,200,20],caption:"Nilai PO", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.cb_vendor = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Vendor", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,18,200,20],caption:"Nilai PPN", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.i_hit2 = new portalui_imageButton(this.pc2.childPage[0],{bound:[975,18,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/copyentries.png",click:[this,"doHitung"]});
		this.e_alamat = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Alamat", readOnly:true});								
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,14,200,20],caption:"Total PO", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,245], childPage:["Item Barang","Otorisasi"]});						
		this.sg4 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag: 0,
		            colTitle:["ID","Item Barang","Merk","Tipe","Spesifikasi","Jumlah","Harga","Total+"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,150,150,150,150,30]],															
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,7],[5,6]],					
					change:[this,"doChangeCell4"],nilaiChange:[this,"doNilaiChange4"],
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});		
		
		this.cb_diket = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Diketahui", multiSelection:false, maxLength:10, tag:2});				
		this.cb_dir = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Direktur", multiSelection:false, maxLength:10, tag:2});						
		this.cb_proyek = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Proyek", readOnly:true, tag:2});														
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
					
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
			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_diket.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);			
			this.cb_dir.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);			
			this.cb_proyek.setSQL("select kode_proyek,nama from spm_proyek where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' union select '-','-'",["kode_proyek","nama"],false,["Kode","Deskripsi"],"and","Data Proyek",true);					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spm_simlog_fPO.extend(window.childForm);
window.app_saku3_transaksi_spm_simlog_fPO.implement({	
	doHitung: function(sender) {		
		if (sender == this.i_hit2) {			
			if (this.e_nilai.getText()!="") 
				if (this.e_ppn.getText() == "0")
					this.e_ppn.setText(floatToNilai(Math.round((nilaiToFloat(this.e_nilai.getText())) * 0.1)));											
				else this.e_ppn.setText("0");
		}
	},
	isiCbVendor: function() {
		this.cb_vendor.setSQL("select kode_vendor, nama from vendor  where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);			
	},
	isiCbPesan : function() {
		var strSQL = "select a.no_pesan,a.keterangan "+
					 "from log_pesan_m a "+
					 "		left join (  "+
					 
					 "		select distinct no_pesan,kode_lokasi "+
					 "		from log_pesan_d "+
					 "		where no_po<>'-' and kode_lokasi='"+this.app._lokasi+"' "+

					 "		) b on a.no_pesan=b.no_pesan and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.kode_pp='"+this.cb_pp.getText()+"' and b.no_pesan is null and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";	

		this.cb_pesan.setSQL(strSQL,["no_pesan","keterangan"],false,["No Request","Deskripsi"],"and","Data PR",true);			
	},
	doChangeCell4: function(sender, col, row){
		if (col == 5 || col == 6) {
			if (this.sg4.cells(5,row) != "" && this.sg4.cells(6,row) != "") {
				var tot = nilaiToFloat(this.sg4.cells(5,row)) * nilaiToFloat(this.sg4.cells(6,row));
				this.sg4.cells(7,row,floatToNilai(tot));
				this.sg4.validasi();		
			}
		}
	},
	doNilaiChange4: function(){
		try{
			var nilai =  0;
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(7,i) != ""){					
					nilai += nilaiToFloat(this.sg4.cells(7,i));
				}
			}
			this.e_nilai.setText(floatToNilai(nilai));											
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
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
						sql.add("delete from log_po_m where no_po = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from log_po_d where no_po = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update log_pesan_d set no_po='-',jum_po=0,harga_po=0 where no_po='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					
					sql.add("insert into log_po_m(no_po,no_ba,no_pesan,kode_lokasi,tgl_input,nik_user,periode,tanggal,nik_diket,nik_dir,no_dokumen,keterangan,kode_vendor,nilai,ppn,kode_proyek,pp_pesan) values "+
							"('"+this.e_nb.getText()+"','-','"+this.cb_pesan.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_diket.getText()+"','"+this.cb_dir.getText()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_vendor.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'"+this.cb_proyek.getText()+"','"+this.cb_pp.getText()+"')");					
					
					for (var i=0;i < this.sg4.getRowCount();i++){
						if (this.sg4.rowValid(i)){
							sql.add("insert into log_po_d(no_po,kode_lokasi,no_pesan,no_urut,item,merk,tipe,catatan,jumlah,harga,ppn,kode_klpfa) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pesan.getText()+"',"+this.sg4.cells(0,i)+", '"+this.sg4.cells(1,i)+"','"+this.sg4.cells(2,i)+"','"+this.sg4.cells(3,i)+"','"+this.sg4.cells(4,i)+"',"+nilaiToFloat(this.sg4.cells(5,i))+","+nilaiToFloat(this.sg4.cells(6,i))+",0,'-')");
							sql.add("update log_pesan_d set no_po='"+this.e_nb.getText()+"',jum_po="+nilaiToFloat(this.sg4.cells(5,i))+",harga_po="+nilaiToFloat(this.sg4.cells(6,i))+" where no_urut="+this.sg4.cells(0,i)+" and no_pesan='"+this.cb_pesan.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);			
					this.sg4.clear(1); this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);			
					setTipeButton(tbAllFalse);								
					this.isiCbVendor();		
					this.stsSimpan = 1;
					this.doClick();		
				break;
			case "simpan" :															
			case "ubah" :																											
				this.preView = "1";												
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																					
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;
				}
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :					
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from log_po_m where no_po = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from log_po_d where no_po = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("update log_pesan_d set no_po='-',jum_po=0,harga_po=0 where no_po='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
				
		if (this.stsSimpan == 1) {
			this.doClick();					
			this.isiCbVendor();		
		}
	},
	doChange:function(sender){		
		if (sender == this.cb_pp && this.cb_pp.getText()!="" && this.stsSimpan==1) {									
			this.isiCbPesan();
		}					
		if (sender == this.cb_pesan && this.cb_pesan.getText()!="") {									
			if (this.stsSimpan == 1) {				
				var strSQL = "select b.kode_proyek,a.no_urut,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.harga,a.jumlah * a.harga as total "+
							 "from log_pesan_d a inner join log_pesan_m b on a.no_pesan=b.no_pesan and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_pesan='"+this.cb_pesan.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_po='-' order by a.no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];												
						this.sg4.appendData([line2.no_urut,line2.item,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.harga),floatToNilai(line2.total)]);
					}
					this.cb_proyek.setText(line2.kode_proyek);
				} else this.sg4.clear(1);										
			}
		}		
		if (sender == this.cb_vendor && this.cb_vendor.getText()!="") {									
			var data = this.dbLib.getDataProvider("select alamat from vendor where kode_vendor='"+this.cb_vendor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){													
					this.e_alamat.setText(line.alamat);
				}
			}	
		}
		if ((sender == this.e_nilai || sender == this.e_ppn) && this.e_nilai.getText()!="" && this.e_ppn.getText()!="") {									
			var tot = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText());
			this.e_total.setText(floatToNilai(tot));
		}
	},	
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg3.clear(1); 
				this.sg4.clear(1);				
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"log_po_m","no_po",this.app._lokasi+"-PO"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {																
								this.nama_report="server_report_saku3_logistik_rptSpk";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and k.no_po='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);			
			this.sg4.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);						
			this.isiCbVendor();		
			this.stsSimpan = 1;
			this.doClick();	
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																				
		var strSQL = "select a.no_po,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.nama,a.nilai+ppn as nilai "+
		             "from log_po_m a "+
					 "inner join vendor b on a.kode_vendor=b.kode_vendor and b.kode_lokasi=a.kode_lokasi "+
					 "where a.no_ba='-' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
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
			this.sg3.appendData([line.no_po,line.tgl,line.keterangan,line.nama,floatToNilai(line.nilai)]); 
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
				
				var strSQL = "select * from log_po_m where no_po = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);						
						this.e_dok.setText(line.no_dokumen);						
						this.cb_diket.setText(line.nik_diket);						
						this.cb_dir.setText(line.nik_dir);	
						this.e_ppn.setText(floatToNilai(line.ppn));
						this.cb_pp.setText(line.pp_pesan);
						this.cb_pesan.setSQL("select no_pesan, keterangan from log_pesan_m  where no_pesan='"+line.no_pesan+"' and kode_lokasi='"+this.app._lokasi+"'",["no_pesan","keterangan"],false,["No Req","Deskripsi"],"and","Data Request",true);			
						this.cb_pesan.setText(line.no_pesan);
						this.cb_vendor.setSQL("select kode_vendor, nama from vendor where kode_vendor='"+line.kode_vendor+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);			
						this.cb_vendor.setText(line.kode_vendor);						
					}
				}												
				var strSQL = "select a.no_urut,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.harga,a.jumlah * a.harga as total "+
							 "from log_po_d a "+							 
							 "where a.no_po ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];												
						this.sg4.appendData([line2.no_urut,line2.item,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.harga),floatToNilai(line2.total)]);
					}
				} else this.sg4.clear(1);											
			}									
		} catch(e) {alert(e);}
	}
});