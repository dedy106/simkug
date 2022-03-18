window.app_saku2_transaksi_kopeg_kbitt_fAppDokkoronaCek = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fAppDokkoronaCek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fAppDokkoronaCek";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Lihat Dokumen", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});		
		
		this.e_noaju = new portalui_saiCBBL(this,{bound:[20,11,222,20],caption:"No Agenda",multiSelection:false, tag:0, change:[this,"doChange"]});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,202,20],caption:"Nominal", tipeText:ttNilai, text:"0", readOnly:true});		
		this.e_pp = new saiLabelEdit(this,{bound:[20,12,550,20],caption:"PP/Unit", readOnly:true});				
		this.e_akun = new saiLabelEdit(this,{bound:[20,13,550,20],caption:"Akun", readOnly:true});				
		this.e_drk = new saiLabelEdit(this,{bound:[20,14,550,20],caption:"DRK", readOnly:true});						
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Uraian", maxLength:150, readOnly:true});						
		this.e_modul = new saiLabelEdit(this,{bound:[20,17,202,20],caption:"Modul", maxLength:150, readOnly:true});						
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18],visible:false});

		this.pc1 = new pageControl(this,{bound:[20,12,796,250], childPage:["File Dok"]});    
		this.sgUpld = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:0,
					colTitle:["KdDok","Jenis Dokumen","Nama File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,300,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[0],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
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
		
		setTipeButton(tbAllFalse);
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
			
			

			var strSQL = "select status_admin from hakakses where nik='"+this.app._userLog+"' ";								
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];				
				this.stsAdmin = line.status_admin;					
			}	


		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fAppDokkoronaCek.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fAppDokkoronaCek.implement({
	isiCBagenda: function() {
		if (this.stsAdmin=="U")
			this.e_noaju.setSQL("select distinct a.no_aju, a.keterangan "+
								"from it_aju_m a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								"where a.progress in ('A','0','1','2','3','S','R') and a.kode_lokasi='"+this.app._lokasi+"' and a.periode >= '202001' ",["a.no_aju","a.keterangan"],false,["No Agenda","Deskripsi"],"and","Data Agenda",true);
		else 
			this.e_noaju.setSQL("select distinct a.no_aju, a.keterangan "+
								"from it_aju_m a "+
								"where a.progress in ('A','0','1','2','3','S','R') and a.kode_lokasi='"+this.app._lokasi+"' and a.periode >= '202001' ",["a.no_aju","a.keterangan"],false,["No Agenda","Deskripsi"],"and","Data Agenda",true);
	},	
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
					"select kode_jenis, nama  from dok_jenis where kode_lokasi='"+this.app._lokasi+"' and kode_jenis='DOK' ", 
					"select count(*) from dok_jenis where kode_lokasi='"+this.app._lokasi+"' and kode_jenis='DOK' ", 
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);															
					this.isiCBagenda();
					this.sgUpld.clear(1);
					this.sgFile.clear(1);
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
		this.isiCBagenda();		
	},		
	doChange:function(sender){		
		if (sender==this.e_noaju) {			
			if (this.e_noaju.getText() != "") {
				var strSQL = "select a.form,a.nilai,a.kode_pp,a.keterangan,a.tanggal,a.kode_pp+' - '+b.nama as pp,a.kode_akun+' - '+c.nama as akun,a.kode_drk+' - '+isnull(d.nama,'-') as drk "+
							 "from it_aju_m a "+
							 "                inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "                inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi "+
							 "where a.no_aju = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('A','0','1','2','3','S')  ";				
				
				var data = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.kodePP = line.kode_pp;
					this.e_ket.setText(line.keterangan);				
					this.e_pp.setText(line.pp);				
					this.e_akun.setText(line.akun);				
					this.e_drk.setText(line.drk);				
					this.dp_d2.setText(line.tanggal);	
					this.e_nilai.setText(floatToNilai(line.nilai));			
					this.e_modul.setText(line.form);
					this.modul = line.form;					
				}	
								
				this.sgUpld.clear(); 
				var data = this.dbLib.getDataProvider(							 
							 "select a.kode_jenis,a.nama,b.no_gambar "+
							 "from dok_jenis a left join it_aju_dok b on a.kode_jenis='DOK' and a.kode_lokasi=b.kode_lokasi and b.no_bukti='"+this.e_noaju.getText()+"' "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and b.no_gambar is not null ",true);							 							 
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);


			}
		}
	}	
});