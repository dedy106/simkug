window.app_saku3_transaksi_pbh_ypt_fDokOnline = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_pbh_ypt_fDokOnline.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_pbh_ypt_fDokOnline";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Serah-Terima Dokumen Online", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});				
		this.e_noaju = new portalui_saiCBBL(this,{bound:[20,11,222,20],caption:"No Bukti",multiSelection:false, change:[this,"doChange"]});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nominal", tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_modul = new saiLabelEdit(this,{bound:[20,20,200,20],caption:"Modul", readOnly:true});							
		this.e_tanggal = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Tgl Pengajuan", readOnly:true});							
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,550,20],caption:"Deskripsi", readOnly:true});							
		this.cb_terima = new portalui_saiCBBL(this,{bound:[20,12,220,20],caption:"NIK Penerima",tag:2,multiSelection:false});			
		this.e_serah = new saiLabelEdit(this,{bound:[20,19,300,20],caption:"Diserahkan Oleh", maxLength:100});							
		this.e_catat = new saiLabelEdit(this,{bound:[20,13,550,20],caption:"Catatan", maxLength:200});							
		
		this.pc2 = new pageControl(this,{bound:[5,18,991,252], childPage:["Rekening","Item Jurnal","File Dok"]});			
		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:9,
		            colTitle:["Bank","Atensi","No Rekening","Nama Rekening","Bruto","Potongan","Keterangan"],
					colWidth:[[6,5,4,3,2,1,0],[200,80,100,150,150,150,150]],										
					colFormat:[[4,5],[cfNilai,cfNilai]],
					readOnly:true,					
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});					
				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,290,50,200,80]],								
					readOnly:true,
					colFormat:[[4],[cfNilai]], 					
					autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3});					

		this.sgUpld = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height - 25,this.pc2.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc2.childPage[2],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});
					
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.openAwal = "0"; 
			this.openAkhir = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,value1,value2 from spro where kode_spro in ('OPEN_JAM') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];																	
				this.openAwal = parseInt(line.value1);								
				this.openAkhir = parseInt(line.value2);								
			}

			this.formLock = 0;
			var data = this.dbLib.getDataProvider("SELECT cast (substring(CONVERT(VARCHAR(8),GETDATE(),108) ,1,2) as int) as jam_now",true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				var line = data.rs.rows[0];				
				if (parseInt(line.jam_now) < this.openAwal || parseInt(line.jam_now) > this.openAkhir) {
					this.formLock = 1;					
				}
			}

			var data = this.dbLib.getDataProvider("SELECT FORMAT(getdate(), 'dddd') AS hari",true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				var line = data.rs.rows[0];
				if (line.hari == "Sunday" || line.hari == "Saturday") {
					this.formLock = 1;	
				}
			}

			if (this.formLock == 1) {
				system.alert(this,"Form tidak bisa digunakan.","Akses Form ini Berbatas Waktu.");					
			}

			this.cb_terima.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Penerima",true);
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro in ('NIK_DOK') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];																	
				this.cb_terima.setText(line.flag);									
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_pbh_ypt_fDokOnline.extend(window.childForm);
window.app_saku3_transaksi_pbh_ypt_fDokOnline.implement({	
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");                
			}
		}catch(e){
			alert(e+" "+data);
		}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
					"select kode_jenis, nama  from dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
					"select count(*) from dok_jenis where kode_lokasi='"+this.app._lokasi+"' ", 
					["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pbh_ver_m","no_ver",this.app._lokasi+"-OL"+this.e_periode.getText().substr(2,4)+".","0000"));												
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into pbh_ver_m (no_ver,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat,ref1) values "+
                            "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','S','"+this.e_modul.getText()+"','VEROL','"+this.e_noaju.getText()+"','"+this.e_catat.getText()+"','-','"+this.cb_terima.getText()+"','X','"+this.e_serah.getText()+"')");
                    		
					sql.add("update pbh_pb_m set progress='S', no_fisik='"+this.e_nb.getText()+"' where no_pb='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					//dokumen
					sql.add("delete from pbh_dok where no_bukti = '"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																		
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into pbh_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_noaju.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','"+this.e_modul.getText()+"','"+this.e_noaju.getText()+"')");															
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);		
					this.sg1.clear(1);
					this.sg3.clear(1);
					this.sgUpld.clear(1);
					this.sgFile.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.isiCBnoaju();
					setTipeButton(tbSimpan);
				break;
			case "simpan" :		
				this.formLock = 0;
				var data = this.dbLib.getDataProvider("SELECT cast (substring(CONVERT(VARCHAR(8),GETDATE(),108) ,1,2) as int) as jam_now",true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line = data.rs.rows[0];
					if (parseInt(line.jam_now) < this.openAwal || parseInt(line.jam_now) > this.openAkhir) {
						this.formLock = 1;					
					}
				}

				var data = this.dbLib.getDataProvider("SELECT FORMAT(getdate(), 'dddd') AS hari",true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line = data.rs.rows[0];
					if (line.hari == "Sunday" || line.hari == "Saturday") {
						this.formLock = 1;	
					}
				}

				if (this.formLock == 1) {
					system.alert(this,"Form tidak bisa digunakan.","Akses Form ini Berbatas Waktu.");					
					return false;
				}	
				else						
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		this.doClick();
		this.isiCBnoaju();
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pbh_ver_m","no_ver",this.app._lokasi+"-OL"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_noaju.setFocus();
		setTipeButton(tbSimpan);
	},	
	isiCBnoaju: function() {		
		var strSQL = "select a.no_pb,a.keterangan "+
						"from pbh_pb_m a "+
						"where a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' ";								
		this.e_noaju.setSQL(strSQL,["a.no_pb","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Data Bukti",true);		
	},
	doChange:function(sender){		
		if (sender == this.e_noaju && this.e_noaju.getText() != "") {						
			var strSQL = "select a.modul,a.keterangan,convert(varchar,a.tanggal,103) as tgl,a.nilai "+
							"from pbh_pb_m a "+
							"where a.no_pb = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' ";								
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				this.e_nilai.setText(floatToNilai(line.nilai));
				this.e_modul.setText(line.modul);
				this.e_tanggal.setText(line.tgl);				
				this.e_ket.setText(line.keterangan);	
				this.doLoadRek();	
				this.doLoadJurnal();				
				
				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bukti = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);

			}
			else {
				this.e_nilai.setText("0");
				this.e_modul.setText("");
				this.e_tanggal.setText("");				
				this.e_ket.setText("");	
				this.sg1.clear(1);
				this.sg3.clear(1);
				this.sgUpld.clear(1); 
				this.sgFile.clear(1);	
			}							
		}
	},
	doLoadRek:function(){
		var strSQL1 = "select bank,nama,no_rek,nama_rek,bruto,pajak,'"+this.e_ket.getText()+"' as keterangan "+
					  "from pbh_rek where no_bukti ='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL1,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																		
				this.sg1.appendData([line.bank,line.nama,line.no_rek,line.nama_rek,floatToNilai(line.bruto),floatToNilai(line.pajak),line.keterangan.toUpperCase()]);
			}
		} else this.sg1.clear(1);	
		this.sg1.validasi();												
	},	
	doLoadJurnal:function(){		
		if (this.e_modul.getText() == "PBBAU" || this.e_modul.getText() == "PBBMHD") {			  
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from pbh_pb_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+	
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
						"where a.no_pb = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
		}

		if (this.e_modul.getText() == "IFREIM" || this.e_modul.getText() == "IFCLOSE") {			  
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from hutang_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+	
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
						"where a.jenis = 'BEBAN' and a.no_hutang = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
		}

		if (this.e_modul.getText() == "PJAJU") {			  
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from panjar_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+	
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
						"where a.jenis = 'BEBAN' and a.no_pj = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
		}

		if (this.e_modul.getText() == "PJPTG") {			  
			var strSQL3 = "select b.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk "+
						"from ptg_j a "+
						"	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"     inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+	
						"     left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+																															  
						"where a.jenis = 'BEBAN' and a.no_ptg = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
		}

		var data = this.dbLib.getDataProvider(strSQL3,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg3.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];												
				this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
			}
		} else this.sg3.clear(1);	
		this.sg3.validasi();		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){	
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}

							//this.nama_report="server_report_saku2_kopeg_kbitt_rptBebanFormDok";
							//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_noaju.getText()+"' ";
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
			setTipeButton(tbSimpan);
			this.sg1.clear(1);
			this.sg3.clear(1);
			this.sgUpld.clear(1);
			this.sgFile.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.isiCBnoaju();
		} catch(e) {
			alert(e);
		}
	}
});