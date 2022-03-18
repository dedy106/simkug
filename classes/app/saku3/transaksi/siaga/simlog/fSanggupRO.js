window.app_saku3_transaksi_siaga_simlog_fSanggupRO = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_simlog_fSanggupRO.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_simlog_fSanggupRO";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kesanggupan Repeat Order", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Kesanggupan","List Kesanggupan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Mitra","Nilai"],
					colWidth:[[4,3,2,1,0],[100,200,310,80,100]],readOnly:true,
					colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,450,20],caption:"Perihal", maxLength:150});						
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK TTD", multiSelection:false, maxLength:10, tag:2});						
		this.cb_spk = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"No SPK", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});				
		this.e_vendor = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,450,20],caption:"Mitra", readOnly:true});								
		this.e_alamat = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"Alamat", readOnly:true});								
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,14,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,260], childPage:["Item Barang","File Dok"]});						
		this.sg4 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag: 0,
		            colTitle:["ID","Item Barang","Merk","Tipe","Spesifikasi","Jumlah","Harga","PPN","Total+PPN","Kode Brg","Nama"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[150,70,80,80,80,60,150,150,150,150,30]],															
					colFormat:[[5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[]],					
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});		
			
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"No Dokumen", maxLength:50});						
		this.e_file = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"File Upload", readOnly:true, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[1],{bound:[480,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this.pc1.childPage[1],{bound:[580,15,80,18],caption:"Lihat File",click:[this,"doLihat"],visible:false});			
		
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
			
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.kode_bidang='"+this.app._kodeBidang+"' "+
			                   "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_simlog_fSanggupRO.extend(window.childForm);
window.app_saku3_transaksi_siaga_simlog_fSanggupRO.implement({	
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
						sql.add("delete from log_sanggup_m where no_sanggup= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from log_pesan_dok where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update log_spph_m set no_sanggup='-' where no_sanggup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update log_tap_m set no_sanggup='-' where no_sanggup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update log_spk_m set no_sanggup='-' where no_sanggup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}					
					
					sql.add("insert into log_sanggup_m(no_sanggup,no_spk,kode_lokasi,tgl_input,nik_user,periode,tanggal,nik_buat,keterangan,no_tap,kode_vendor,total,no_dokumen,modul) values "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_buat.getText()+"','"+this.e_ket.getText()+"','"+this.cb_spk.getText()+"','"+this.kodeVendor+"',"+nilaiToFloat(this.e_total.getText())+",'"+this.e_dok.getText()+"','RO')");					
					sql.add("insert into log_pesan_dok(no_pesan,no_gambar,nu,kode_jenis,kode_lokasi) values('"+this.e_nb.getText()+"','"+this.e_file.getText()+"',0,'SANGGUP','"+this.app._lokasi+"')");										
					sql.add("update log_spph_m set no_sanggup='"+this.e_nb.getText()+"' where no_spph='"+this.cb_spk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update log_tap_m set no_sanggup='"+this.e_nb.getText()+"' where no_spk='"+this.cb_spk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update log_spk_m set no_sanggup='"+this.e_nb.getText()+"' where no_spk='"+this.cb_spk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
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
					this.cb_spk.setSQL("select d.no_spk, d.keterangan "+
			                    "from log_spph_m a "+
			                    "inner join log_pesan_m b on a.no_spph=b.no_spph "+
								"inner join log_justerima_m c on b.no_terima=c.no_terima and c.jenis='RO' "+								
								"inner join log_tap_m d on a.no_tap=d.no_tap "+
								"inner join log_spk_m e on d.no_spk=e.no_spk "+
								"where e.periode<='"+this.e_periode.getText()+"' and d.no_sanggup='-' and d.kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data SPK",true);											
				break;
			case "simpan" :															
			case "ubah" :																											
				this.preView = "1";												
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																					
				/*
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				*/
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :					
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from log_sanggup_m where no_sanggup= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from log_pesan_dok where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
					sql.add("update log_spph_m set no_sanggup='-' where no_sanggup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update log_tap_m set no_sanggup='-' where no_sanggup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update log_spk_m set no_sanggup='-' where no_sanggup='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
			this.cb_spk.setSQL("select d.no_spk, d.keterangan "+
			                    "from log_spph_m a "+
			                    "inner join log_pesan_m b on a.no_spph=b.no_spph "+
								"inner join log_justerima_m c on b.no_terima=c.no_terima and c.jenis='RO' "+								
								"inner join log_tap_m d on a.no_tap=d.no_tap "+
								"inner join log_spk_m e on d.no_spk=e.no_spk "+
								"where e.periode<='"+this.e_periode.getText()+"' and d.no_sanggup='-' and d.kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data SPK",true);											
			this.doClick();				
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode  && this.stsSimpan ==1) this.doClick();						
		if (sender == this.cb_spk && this.cb_spk.getText()!="") {			
			var strSQL = "select a.kode_vendor,a.nama,a.alamat,b.nilai+b.ppn as total "+
			             "from vendor a inner join log_nego_m b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
			             "				inner join log_sph_m c on b.no_nego=c.no_nego "+
						 "where c.no_spph='"+this.cb_spk.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){				
					this.kodeVendor = line.kode_vendor;
					this.e_vendor.setText(line.nama);
					this.e_alamat.setText(line.alamat);
					this.e_total.setText(floatToNilai(line.total));
				}
			}
			if (this.stsSimpan == 1) {				
				var strSQL = "select a.no_urut,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.nilai_nego,a.ppn_nego as ppn,a.jumlah*(a.nilai_nego+a.ppn_nego) as total, e.kode_klpfa, e.nama "+
							 "from log_sph_d a inner join log_nego_m b on a.no_sph=b.no_sph and a.kode_lokasi=b.kode_lokasi "+						 
							 "                 inner join log_sph_m c on a.no_sph=c.no_sph "+
							 "                 inner join log_spph_d d on c.no_spph=d.no_spph and a.no_urut=d.no_urut "+
							
							 "                 inner join log_pesan_m g on d.no_spph=g.no_spph "+						 
							 "                 inner join fa_klp e on d.kode_klpfa=e.kode_klpfa and g.kode_akun=e.kode_klpakun "+							 
							 
							 "where d.no_spph='"+this.cb_spk.getText()+"' order by a.no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];												
						this.sg4.appendData([line2.no_urut,line2.item,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.nilai_nego),floatToNilai(line2.ppn),floatToNilai(line2.total),line2.kode_klpfa,line2.nama]);
					}
				} else this.sg4.clear(1);										
			}
		}		
	},	
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg3.clear(1); this.sg4.clear(1);
				this.bLihat.hide();
				this.cb_spk.setText("");				
				this.cb_spk.setSQL("select d.no_spk, d.keterangan "+
			                    "from log_spph_m a "+
			                    "inner join log_pesan_m b on a.no_spph=b.no_spph "+
								"inner join log_justerima_m c on b.no_terima=c.no_terima and c.jenis='RO' "+								
								"inner join log_tap_m d on a.no_tap=d.no_tap "+
								"inner join log_spk_m e on d.no_spk=e.no_spk "+
								"where e.periode<='"+this.e_periode.getText()+"' and d.no_sanggup='-' and d.kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data SPK",true);											
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"log_sanggup_m","no_sanggup",this.app._lokasi+"-SGP"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
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
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}									
								if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
								
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
			this.sg4.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);			
			this.cb_spk.setSQL("select d.no_spk, d.keterangan "+
			                    "from log_spph_m a "+
			                    "inner join log_pesan_m b on a.no_spph=b.no_spph "+
								"inner join log_justerima_m c on b.no_terima=c.no_terima and c.jenis='RO' "+								
								"inner join log_tap_m d on a.no_tap=d.no_tap "+
								"inner join log_spk_m e on d.no_spk=e.no_spk "+
								"where e.periode<='"+this.e_periode.getText()+"' and d.no_sanggup='-' and d.kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data SPK",true);											
		} catch(e) {
			alert(e);
		}
	},		
	doLoad3:function(sender){																				
		var strSQL = "select a.no_sanggup,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.nama,a.total as nilai "+
		             "from log_sanggup_m a "+
					 "inner join vendor b on a.kode_vendor=b.kode_vendor and b.kode_lokasi=a.kode_lokasi "+
					 "inner join log_tap_m c on a.no_sanggup=c.no_sanggup "+
					 "inner join log_spk_m d on c.no_spk=d.no_spk "+
					 "where d.no_pks='-' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='RO'";		
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
			this.sg3.appendData([line.no_sanggup,line.tgl,line.keterangan,line.nama,floatToNilai(line.nilai)]); 
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
												
				this.cb_spk.setSQL("select a.no_spk, a.keterangan from log_spk_m a inner join log_tap_m b on a.no_spk=b.no_spk where b.no_sanggup='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",["no_spk","keterangan"],false,["No SPK","Deskripsi"],"and","Data SPK",true);			
				
				var strSQL = "select a.keterangan,a.tanggal,a.nik_buat,isnull(b.no_gambar,'-') as no_gambar,a.kode_vendor,a.no_sanggup,a.no_dokumen,c.no_spph,d.no_spk "+
							 "from log_sanggup_m a "+
							 "inner join log_spph_m c on a.no_sanggup=c.no_sanggup "+
							 "inner join log_tap_m d on a.no_sanggup=d.no_sanggup "+
							 "left join log_pesan_dok b on a.no_spk=b.no_pesan and a.kode_lokasi=b.kode_lokasi and b.kode_jenis='SANGGUP' "+							 
							 "where a.no_sanggup = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);						
						this.e_dok.setText(line.no_dokumen);						
						this.cb_buat.setText(line.nik_buat);						
						this.e_file.setText(line.no_gambar);						
						this.cb_spk.setText(line.no_spk);						
					}
				}												
				var strSQL = "select a.no_urut,a.item,a.merk,a.tipe,a.catatan,a.jumlah,a.nilai_nego,a.ppn_nego as ppn,a.jumlah*(a.nilai_nego+a.ppn_nego) as total, e.kode_klpfa, e.nama "+
							 "from log_sph_d a inner join log_nego_m b on a.no_sph=b.no_sph and a.kode_lokasi=b.kode_lokasi "+						 
							 "                 inner join log_sph_m c on a.no_sph=c.no_sph "+
							 "                 inner join log_spph_d d on c.no_spph=d.no_spph and a.no_urut=d.no_urut "+
							 
							 "                 inner join log_pesan_m g on d.no_spph=g.no_spph "+						 
							 "                 inner join fa_klp e on d.kode_klpfa=e.kode_klpfa and g.kode_akun=e.kode_klpakun "+	
							 
							 "where d.no_spph='"+this.cb_spk.getText()+"' order by a.no_urut";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];												
						this.sg4.appendData([line2.no_urut,line2.item,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.nilai_nego),floatToNilai(line2.ppn),floatToNilai(line2.total),line2.kode_klpfa,line2.nama]);
					}
				} else this.sg4.clear(1);															
			}									
		} catch(e) {alert(e);}
	}
});