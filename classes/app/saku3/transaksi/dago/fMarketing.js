window.app_saku3_transaksi_dago_fMarketing = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fMarketing.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fMarketing";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Input Marketing", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Tahun",maxLength:4,tag:2,tipeText:ttAngka,change:[this,"doChange"]});		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Marketing","Data Marketing"]});						
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:3,tag:9,
		            colTitle:["No Marketing","Nama Marketing","Jenis Marketing"],
					colWidth:[[2,1,0],[80,250,100]], 
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"No Marketing",maxLength:30,readOnly:true});
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,13,400,20],caption:"Nama Marketing", maxLength:50});				
		this.e_produk = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,400,20],caption:"Jenis Marketing", maxLength:50});				
		this.e_quota = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,200,20],caption:"Kode Lokasi", tag:1, maxLength:50});		
		this.c_aktif = new saiCB(this.pc2.childPage[1],{bound:[20,22,200,20],caption:"Status Aktif",items:["Y","T"], readOnly:true,tag:2});		
		
		
		this.rearrangeChild(10, 22);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
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
			
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					this.e_tahun.setText(line.tahun);
				}
			}
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("USD");
			this.cb_kelas.setSQL("select kode_kelas, nama from haj_kelas where kode_lokasi = '"+this.app._lokasi+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas Produk",true);						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fMarketing.extend(window.portalui_childForm);
window.app_saku3_transaksi_dago_fMarketing.implement({
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
					if (this.stsSimpan == 1) this.doClick();										
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.stsSimpan == 0) {
						sql.add("delete from haj_jadwal where no_jadwal = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}										
					if (this.c_aktif.getText()=="Y") var flagAktif = "1"; else var flagAktif = "0"; 
					sql.add("insert into haj_jadwal(no_jadwal,kode_lokasi,nama,quota,lama_hari,kode_curr,harga,diskon,cash_back,flag_aktif,tahun,kode_kelas,tanggal,nik_user,tgl_input,fee) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_quota.getText())+","+nilaiToFloat(this.e_lama.getText())+",'"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_harga.getText())+","+nilaiToFloat(this.e_diskon.getText())+",0,'"+flagAktif+"','"+this.e_tahun.getText()+"','"+this.cb_kelas.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),"+nilaiToFloat(this.e_fee.getText())+")");										
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
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);							
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
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from haj_jadwal where no_jadwal = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;									
		}
	},
	doClick:function(sender){
		try {
			if (this.e_tahun.getText()!= "") {
				if (this.stsSimpan == 0) {									
					this.cb_kelas.setSQL("select kode_kelas, nama from haj_kelas where kode_lokasi = '"+this.app._lokasi+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas Produk",true);								
				}
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"haj_jadwal","no_jadwal",this.app._lokasi+"-MK"+this.e_tahun.getText()+".","0000"));								
				this.e_ket.setFocus();
				setTipeButton(tbSimpan);			
			}
		}
		catch(e) {
			alert(e);
		}
	},			
	doChange:function(sender){				
		if (sender == this.e_tahun && this.e_tahun.getText()!="") {			
			if (this.stsSimpan == 1) this.doClick();
			this.doLoad3();		
		}
		if (sender == this.cb_kelas && this.cb_kelas.getText()!="") {			
			var data = this.dbLib.getDataProvider("select a.kode_produk+' - '+a.nama as produk from haj_produk a inner join haj_kelas b on a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi where b.kode_kelas='"+this.cb_kelas.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_produk.setText(line.produk);										
				}
			}
		}
		if (sender == this.e_harga || sender == this.e_diskon) {			
			if (this.e_harga.getText()!="" && this.e_diskon.getText()!="") {
				this.e_neto.setText(floatToNilai(nilaiToFloat(this.e_harga.getText())-nilaiToFloat(this.e_diskon.getText())));
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
								this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_jadwal='"+this.e_nb.getText()+"' ";
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
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.doLoad3();
			setTipeButton(tbAllFalse);						
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																				
		var strSQL = "select a.no_jadwal,a.nama,b.kode_kelas+' - '+b.nama as kelas,c.kode_produk+' - '+c.nama as produk,a.lama_hari,a.quota,a.kode_curr,a.harga,a.diskon,convert(varchar,a.tanggal,103) as tgl "+
		             "from haj_jadwal a inner join haj_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "                  inner join haj_produk c on b.kode_produk=c.kode_produk and c.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.tahun='"+this.e_tahun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1' order by a.tanggal";		
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
			this.sg3.appendData([line.no_jadwal,line.nama,line.tgl,line.kelas,line.produk,floatToNilai(line.lama_hari),floatToNilai(line.quota),line.kode_curr,floatToNilai(line.harga),floatToNilai(line.diskon)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,row));								
												
				var strSQL = "select no_jadwal,nama,lama_hari,quota,kode_curr,harga,diskon,kode_kelas,tanggal,fee "+
							 "from haj_jadwal "+							 
							 "where no_jadwal = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.dp_d1.setText(line.tanggal);					
						this.e_ket.setText(line.nama);					
						this.e_lama.setText(floatToNilai(line.lama_hari));												
						this.e_quota.setText(floatToNilai(line.quota));
						this.e_harga.setText(floatToNilai(line.harga));																		
						this.e_diskon.setText(floatToNilai(line.diskon));												
						this.e_fee.setText(floatToNilai(line.fee));												
						
						this.cb_kelas.setSQL("select kode_kelas, nama from haj_kelas where kode_kelas='"+line.kode_kelas+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas Produk",true);									
						this.cb_kelas.setText(line.kode_kelas);												
					}
				}																
			}									
		} catch(e) {alert(e);}
	}
});