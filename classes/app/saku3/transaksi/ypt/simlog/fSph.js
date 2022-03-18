window.app_saku3_transaksi_ypt_simlog_fSph = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_simlog_fSph.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_simlog_fSph";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form SPH", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Terima", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data SPH","List SPH"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No SPH","Tanggal","Deskripsi","Mitra","Nilai"],
					colWidth:[[4,3,2,1,0],[100,200,310,80,100]],readOnly:true,
					colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"No SPH",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[245,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Perihal", maxLength:150,tag:1});								
		this.cb_spph = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,240,20],caption:"No SPPH", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});						
		this.cb_vendor = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,240,20],caption:"Mitra", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});						
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,13,200,20],caption:"Tot Penawaran", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_alamat = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Alamat", readOnly:true,tag:1});										
		this.c_stsppn = new saiCB(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Status PPN",items:["PPN","NON"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_serah = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"Yang Menyerahkan", maxLength:50,tag:1});						
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Nilai PPN", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,240,20],caption:"Yang Menerima", multiSelection:false, maxLength:10, tag:2});				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,245], childPage:["Item Barang","File Dok"]});				
		this.sg4 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag: 0,
		            colTitle:["Item Barang","ID","Merk","Tipe","Spesifikasi","Jumlah","Harga","Total"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,80,60,200,150,150,30,200]],					
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,7],[2,3,4,5,6]],
					buttonStyle:[[0],[bsEllips]], 
					ellipsClick:[this,"doEllipsClick4"],change:[this,"doChangeCell4"],nilaiChange:[this,"doNilaiChange4"],
					autoAppend:true,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg4});		
		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"No Dokumen", maxLength:50,tag:9});						
		this.e_file = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"File Upload", readOnly:true, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[1],{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this.pc1.childPage[1],{bound:[580,15,80,18],caption:"Lihat File",click:[this,"doLihat"],visible:false});			
		
		//kontrol jumlah
		this.sgTmp = new saiGrid(this.pc1.childPage[1],{bound:[1,5,500,200],colCount:3,tag: 0, visible:false,
			colTitle:["ID","Sisa","Jum"],
			colWidth:[[2,1,0],[100,100,100]],					
			colFormat:[[1,2],[cfNilai,cfNilai]],
			readOnly:true,			
			autoAppend:false,defaultRow:1});	

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
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a "+
								"where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);						
															
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_simlog_fSph.extend(window.childForm);
window.app_saku3_transaksi_ypt_simlog_fSph.implement({	
	doIsiCbSpph: function() {
		var strSQL = "select distinct a.no_spph, a.keterangan "+
					 "from sl_spph_m a "+
					 "	   inner join sl_spph_vendor b on a.no_spph=b.no_spph and a.kode_lokasi=b.kode_lokasi "+
					 " 	   left join sl_sph_d c on b.no_spph=c.no_spph and c.kode_lokasi=b.kode_lokasi and c.kode_vendor=b.kode_vendor "+
					 "where c.no_sph is null and a.periode<='"+this.e_periode.getText()+"' and a.modul = 'PO-SPK' and a.no_tap='-' and a.kode_lokasi='"+this.app._lokasi+"'";
		this.cb_spph.setSQL(strSQL,["no_spph","keterangan"],false,["No SPPH","Deskripsi"],"and","Data SPPH",true);				
	},
	doLihat: function(sender){
		try{
			if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());
		}catch(e){
			alert(e);
		}
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
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
						sql.add("delete from sl_sph_m where no_sph = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sl_sph_d where no_sph='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("delete from sl_pesan_dok where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
						sql.add("update sl_spph_vendor set no_sph='-' where no_sph='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					}					
					
					sql.add("insert into sl_sph_m(no_sph,kode_lokasi,tgl_input,nik_user,periode,tanggal,nik_terima,nama_serah,keterangan,no_spph,kode_vendor,nilai,ppn,no_nego,no_dokumen,modul, kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_buat.getText()+"','"+this.e_serah.getText()+"','"+this.e_ket.getText()+"','"+this.cb_spph.getText()+"','"+this.cb_vendor.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'-','"+this.e_dok.getText()+"','"+this.jenisLog+"','IDR',1)");					
					sql.add("update sl_spph_vendor set no_sph='"+this.e_nb.getText()+"' where no_spph='"+this.cb_spph.getText()+"' and kode_vendor='"+this.cb_vendor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into sl_pesan_dok(no_pesan,no_gambar,nu,kode_jenis,kode_lokasi) values('"+this.e_nb.getText()+"','"+this.e_file.getText()+"',0,'SPH','"+this.app._lokasi+"')");					
					
					//no_urut = id_spph
					//id_sph = id sph utk negosiasi
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){								
								sql.add("insert into sl_sph_d(no_sph,no_spph,kode_vendor,kode_lokasi,no_pesan,no_urut,item,merk,tipe,catatan,jumlah,nilai,   ppn,nilai_nego,ppn_nego,id_sph) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_spph.getText()+"','"+this.cb_vendor.getText()+"','"+this.app._lokasi+"','-',"+this.sg4.cells(1,i)+",'"+this.sg4.cells(0,i)+"','"+this.sg4.cells(2,i)+"','"+this.sg4.cells(3,i)+"','"+this.sg4.cells(4,i)+"',"+nilaiToFloat(this.sg4.cells(5,i))+","+nilaiToFloat(this.sg4.cells(6,i))+",0,0,0,"+i+")");
							}
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
					this.sg3.clear(1); this.sg4.clear(1); this.sgTmp.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					setTipeButton(tbAllFalse);			
					this.doIsiCbSpph();
				break;
			case "simpan" :															
			case "ubah" :		
				//kontrol jumlah										
				this.sg4.validasi();
				for (var j=0;j < this.sgTmp.getRowCount();j++){
					var jum = 0;
					for (var i=0;i < this.sg4.getRowCount();i++){
						if (this.sg4.cells(1,i) == this.sgTmp.cells(0,j)) {
							jum += nilaiToFloat(this.sg4.cells(5,i))
						}
					}
					this.sgTmp.cells(2,j,jum);
				}
				for (var i=0;i < this.sgTmp.getRowCount();i++){
					if (nilaiToFloat(this.sgTmp.cells(1,i)) < nilaiToFloat(this.sgTmp.cells(2,i))) {						
						system.alert(this,"Transaksi tidak valid.","Jumlah penawaran melebihi jumlah pesanan.ID Barang: "+this.sgTmp.cells(0,i)+" - Sisa Pesanan: "+this.sgTmp.cells(1,i));
						return false;
					}
				}
				
				this.preView = "1";																				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :					
				this.preView = "0";
				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from sl_sph_m where no_sph = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from sl_sph_d where no_sph='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
				sql.add("delete from sl_pesan_dok where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				sql.add("update sl_spph_vendor set no_sph='-' where no_sph='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
		if (this.stsSimpan == 1) {
			this.cb_spph.setText("","");
			this.doIsiCbSpph();
			this.doClick();				
		}
	},
	doChange:function(sender){
		try {
			if (sender == this.e_periode  && this.stsSimpan ==1) this.doClick();						
			if (sender == this.cb_spph && this.cb_spph.getText()!="") {
				if (this.stsSimpan == 1) {				
					this.cb_vendor.setSQL("select a.kode_vendor, a.nama "+
										"from vendor a inner join sl_spph_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
										"              left join sl_sph_d c on b.no_spph=c.no_spph and c.kode_lokasi=b.kode_lokasi and c.kode_vendor=b.kode_vendor "+
										"where c.no_sph is null and b.no_spph='"+this.cb_spph.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",["a.kode_vendor","a.nama"],false,["Kode","Nama"],"and","Data Vendor",true);			
				
					var strSQL = "select modul from sl_spph_m "+
								"where no_spph ='"+this.cb_spph.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line2 = data.rs.rows[0];																		
						this.jenisLog = line2.modul;						
					}
					
					var strSQL = "select a.no_urut,a.item, a.jumlah "+
								 "from sl_spph_d a "+							 
								 "where a.no_spph ='"+this.cb_spph.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line2;
						this.sgTmp.clear();
						this.sg4.clear();
						for (var i in data.rs.rows){
							line2 = data.rs.rows[i];												
							this.sgTmp.appendData([line2.no_urut,floatToNilai(line2.jumlah),"0"]);	
							
							//default
							this.sg4.appendData([line2.item,line2.no_urut,"-","-","-","0","0","0"]);						
							this.doChangeCell4(this.sg4,1,i);
						}					
					} 
				}					
			}
			if (sender == this.cb_vendor && this.cb_vendor.getText()!="") {
				var strSQL = "select alamat from vendor where kode_vendor='"+this.cb_vendor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_alamat.setText(line.alamat);
					}
				}
			}	
			if (sender == this.c_stsppn && this.c_stsppn.getText() != "") {
				this.sg4.validasi();
			}				
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg3.clear(1); this.sg4.clear(1); 
				this.bLihat.hide();
				this.cb_spph.setText("");
				this.cb_vendor.setText("");
				this.doIsiCbSpph();
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sl_sph_m","no_sph",this.app._lokasi+"-SPH"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},
	doChangeCell4: function(sender, col, row){
		if (col == 1) {
			var strSQL = "select b.modul,a.merk,a.tipe,a.catatan,a.jumlah,a.harga,a.jumlah * a.harga as total "+
						 "from sl_spph_d a inner join sl_spph_m b on a.no_spph=b.no_spph and a.kode_lokasi=b.kode_lokasi "+						 
						 "where a.no_spph ='"+this.cb_spph.getText()+"' and a.no_urut='"+sender.cells(1,row)+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line2 = data.rs.rows[0];				
				sender.cells(2,row,line2.merk);
				sender.cells(3,row,line2.tipe);
				sender.cells(4,row,line2.catatan);
				sender.cells(5,row,line2.jumlah);
				sender.cells(6,row,line2.harga);
				sender.cells(7,row,line2.total);
			}			 
		}

		if (col == 5 || col == 6) {
			if (this.sg4.cells(5,row) != "" && this.sg4.cells(6,row) != "") {
				this.sg4.cells(7,row,nilaiToFloat(this.sg4.cells(5,row)) * (nilaiToFloat(this.sg4.cells(6,row)) ));
				this.sg4.validasi();		
			}
		}		
	},
	doNilaiChange4: function(){
		try{
			var tot = ppn = 0;
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(6,i) != "" && this.sg4.cells(5,i) != ""){					
					tot += nilaiToFloat(this.sg4.cells(6,i)) * nilaiToFloat(this.sg4.cells(5,i));					
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
			if (this.c_stsppn.getText() == "PPN") {
				ppn = Math.round(tot * 0.1);						
				this.e_ppn.setText(floatToNilai(ppn));			
			} 
			else {
				ppn = 0;
				this.e_ppn.setText("0");			
			}
			this.e_total.setText(floatToNilai(tot+ppn));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doEllipsClick4: function(sender, col, row){
		try{			
			if (sender == this.sg4) {
				if (col == 0){
					var strD = "select a.item, a.no_urut "+
							   "from sl_spph_d a inner join sl_spph_m b on a.no_spph=b.no_spph and a.kode_lokasi=b.kode_lokasi "+							   
							   "where a.no_spph ='"+this.cb_spph.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";

					var strR = "select count(*) from ( "+
								"select a.item, a.no_urut "+
								"from sl_spph_d a inner join sl_spph_m b on a.no_spph=b.no_spph and a.kode_lokasi=b.kode_lokasi "+								
								"where a.no_spph ='"+this.cb_spph.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
								") x";

					this.standarLib.showListData(this, "Daftar Barang",sender,undefined, 
												  strD,
												  strR,
												  ["a.item","a.no_urut"],"and",["Item Barang","ID Barang"],false);				
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
							if (this.preView == "1") {								
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}									
								if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
								
								this.nama_report="server_report_saku3_logistik_rptSph";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and g.no_sph='"+this.e_nb.getText()+"' ";
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
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}
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
			this.sg4.clear(1); this.sg3.clear(1); this.sgTmp.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);			
			this.doIsiCbSpph();
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																		
		var strSQL = "select a.no_sph,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.nama,a.nilai+a.ppn as nilai "+
		             "from sl_sph_m a inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_nego='-' and a.modul = 'PO-SPK'";		
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
			this.sg3.appendData([line.no_sph,line.tgl,line.keterangan,line.nama,floatToNilai(line.nilai)]); 
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
				this.bLihat.show();
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				this.cb_vendor.setSQL("select a.kode_vendor, a.nama "+
									  "from vendor a inner join sl_sph_m b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+									  
									  "where b.no_sph='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",
									  ["a.kode_vendor","a.nama"],false,["Kode","Nama"],"and","Data Vendor",true);			
									  
				var strSQL = "select a.modul,a.keterangan,a.tanggal,a.nik_terima,a.nama_serah,b.no_gambar,a.kode_vendor,a.no_spph, "+
							 "a.no_dokumen,a.ppn "+
							 "from sl_sph_m a "+
							 "	inner join sl_spph_m c on a.no_spph=c.no_spph and a.kode_lokasi=c.kode_lokasi "+
							 "	inner join sl_pesan_dok b on a.no_sph=b.no_pesan and a.kode_lokasi=b.kode_lokasi and b.kode_jenis='SPH' "+							 							 
							 "where a.no_sph = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);						
						this.e_dok.setText(line.no_dokumen);						
						this.cb_buat.setText(line.nik_terima);						
						this.e_serah.setText(line.nama_serah);						
						this.e_file.setText(line.no_gambar);	

						var strSQL = "select a.no_spph, a.keterangan "+
						 			 "from sl_spph_m a "+
						 			 "where a.no_spph='"+line.no_spph+"' and a.kode_lokasi='"+this.app._lokasi+"'";
						this.cb_spph.setSQL(strSQL,["no_spph","keterangan"],false,["No SPPH","Deskripsi"],"and","Data SPPH",true);		

						this.cb_spph.setText(line.no_spph);						
						this.cb_vendor.setText(line.kode_vendor);	
						if (parseFloat(line.ppn) == 0) this.c_stsppn.setText("NON");							
						else this.c_stsppn.setText("PPN");							
						this.jenisLog = line.modul;
						
					}
				}																
				var strSQL = "select a.no_urut,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.nilai,a.jumlah * a.nilai  as total "+
							 "from sl_sph_d a "+
							 "where a.no_sph ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];												
						this.sg4.appendData([line2.item,line2.no_urut,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.nilai),floatToNilai(line2.total)]);
					}
				} else this.sg4.clear(1);	
				
				//untuk kontrol
				var strSQL = "select a.no_urut,a.item, a.jumlah "+
							 "from sl_spph_d a "+							 
							 "where a.no_spph ='"+this.cb_spph.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sgTmp.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];												
						this.sgTmp.appendData([line2.no_urut,floatToNilai(line2.jumlah),"0"]);							
					}					
				} 
				
			}									
		} catch(e) {alert(e);}
	}
});