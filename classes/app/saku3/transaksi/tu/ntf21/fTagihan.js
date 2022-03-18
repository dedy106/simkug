window.app_saku3_transaksi_tu_ntf21_fTagihan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_ntf21_fTagihan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_ntf21_fTagihan";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembuatan Tagihan", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Billing","List Billing"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
			colTitle:["No Bukti","Tanggal","Deskripsi","Nilai","Pilih"],
			colWidth:[[4,3,2,1,0],[70,100,410,80,100]],
			colFormat:[[3,4],[cfNilai,cfButton]],readOnly:true,
			click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 
			dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Tagihan",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"NIK TTD",tag:2,multiSelection:false}); 								
		this.cb_proyek = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Proyek", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});								

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,305], childPage:["Data Tagihan","Detail Tagihan","File Dokumen","Cattn Memo"]});		
		this.cb_cust = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"Customer",readOnly:true});															
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,500,20],caption:"Nama Customer",maxLength:50});					
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,500,20],caption:"Alamat",maxLength:200});					
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,500,20],caption:"NPWP",maxLength:50});	
		this.e_pic = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,500,20],caption:"P I C",maxLength:50});			
		this.e_jabatan = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,500,20],caption:"Jabatan",maxLength:50});					
		this.e_nilaiproyek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",readOnly:true});	
		this.e_sisatagih = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Sisa Tagihan", tag:1, tipeText:ttNilai, text:"0",readOnly:true});	
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Nilai Tagihan", tag:1, tipeText:ttNilai, readOnly:true, text:"0", change:[this,"doChange"]});										
		this.e_diskon = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Ni. Potongan", tag:1, tipeText:ttNilai, text:"0", change:[this,"doChange"]});										
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"PPN 10%", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.i_ppn = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,14,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doPPN"]});				
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,visible:false,
		    colTitle:["Periode","Nilai Pdpt"],
			colWidth:[[1,0],[100,100]],					
			columnReadOnly:[true,[0,1],[]],					
			colFormat:[[1],[cfNilai]],
			autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:0,
			colTitle:["Deskripsi","Harga Satuan","Quantity","SubTotal"],
			colWidth:[[3,2,1,0],[100,100,100,500]],
			columnReadOnly:[true,[3],[]],
			colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],									
			nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});		

		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5, tag:9,
			colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
			colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
			columnReadOnly:[true,[0,1,2,3,4],[]],					
			colFormat:[[3,4],[cfUpload,cfButton]], 
			buttonStyle:[[0],[bsEllips]], 	
			click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
			ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[2],{bound:[40,50,300,100],colCount:1,tag:9,visible:false,
			colTitle:["namaFile"],
			colWidth:[[0],[180]],
			readOnly: true,autoAppend:false,defaultRow:1});

		this.sgctt = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
								colTitle:["Catatan"],
								colWidth:[[0],[100]],					
								readOnly:true,autoAppend:false,defaultRow:1});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
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
			
			this.cb_proyek.setSQL("select a.kode_proyek, a.nama from prb_proyek a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.versi='NTF21' and a.progress in ('1','2')  and a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Deskripsi"],"and","Data Proyek",true);						
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a "+
							   "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BILDISK') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																								
					if (line.kode_spro == "BILDISK") this.akunDiskon = line.flag;								
				}
			}	

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.doLoadCtt(this.e_nb.getText());

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_ntf21_fTagihan.extend(window.childForm);
window.app_saku3_transaksi_tu_ntf21_fTagihan.implement({
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
													"select kode_jenis,nama   from prb_dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
													"select count(kode_jenis) from prb_dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
													["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4)
				window.open("server/media/"+this.sgUpld.getCell(2,row));
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
	doChangeCells: function(sender, col, row){
		if ((col == 1 || col == 2) && this.sg2.cells(1,row) != "" && this.sg2.cells(2,row) != "") this.sg2.validasi();				
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.getRowCount();i++){
				if (this.sg2.cells(1,i) != "" && this.sg2.cells(2,i) != ""){
					var subttl = Math.round(nilaiToFloat(this.sg2.cells(1,i)) * nilaiToFloat(this.sg2.cells(2,i)) * 100) / 100; 
					this.sg2.cells(3,i,subttl);
					tot += nilaiToFloat(this.sg2.cells(3,i));					
				}
			}						
			this.e_nilai.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doPPN:function(sender){	
		if (this.e_nilai.getText() != "" && this.e_diskon.getText() != "") {			
			var dpp = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_diskon.getText());
			var ppn = Math.round(dpp * 0.1);	
			this.e_ppn.setText(floatToNilai(ppn));
			this.sg.validasi();			
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
						sql.add("delete from prb_prbill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from prb_prbill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						sql.add("delete from prb_prbill_cust where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						sql.add("delete from prb_rab_dok where no_rab='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='BILL'");																									
					}

					//jika sudah pernah di akru tidak dapat dikoreksi (harus ke amandemen)
					sql.add("update prb_proyek set progress='2' where progress='1' and kode_proyek ='"+this.cb_proyek.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("update prb_rab_cust set nama='"+this.e_nama.getText()+"',alamat='"+this.e_alamat.getText()+"',npwp='"+this.e_npwp.getText()+"',pic='"+this.e_pic.getText()+"',jabatan='"+this.e_jabatan.getText()+"' "+
							"where no_rab='"+this.noRABaju+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into prb_prbill_m (no_bill,kode_lokasi,no_dokumen,tanggal,keterangan,kode_proyek,kode_cust,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_piutang,nilai_ppn,modul,pph42,no_ver,no_valid,no_verppn,progress,diskon,no_batal) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_proyek.getText()+"','"+this.cb_cust.getText()+"','IDR',1,'"+this.cb_app.getText()+"','"+this.kodePP+"',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.akunPiutang+"',"+nilaiToFloat(this.e_ppn.getText())+",'BILL',0,'-','-','-','0',"+nilaiToFloat(this.e_diskon.getText())+",'-')"); 					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){		
							if (nilaiToFloat(this.sg2.cells(3,i)) != 0) {						
								sql.add("insert into prb_prbill_d(no_bill,kode_lokasi,nu,keterangan,harga,jumlah,total) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(1,i))+","+nilaiToFloat(this.sg2.cells(2,i))+","+nilaiToFloat(this.sg2.cells(3,i))+")");
							}
						}
					}

					sql.add("insert into prb_prbill_cust (no_bill,kode_lokasi,nama,alamat,npwp,pic,jabatan) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_npwp.getText()+"','"+this.e_pic.getText()+"','"+this.e_jabatan.getText()+"')");

					this.deletedFiles = "";	
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							if (this.deletedFiles != "") this.deletedFiles += ";";
							this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(2,i);
						}
					}
						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-"){
							var temu = false;
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
										temu = true;
								}
							}
							if (!temu) {
								ix++;																							 
								sql.add("insert into prb_rab_dok(no_rab,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','BILL','"+this.noRABaju+"')");								
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 	
					this.sg3.clear(1); 	
					this.sgctt.clear(1); 	
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.doClick();
					this.pc2.setActivePage(this.pc2.childPage[0]);		
					this.pc1.setActivePage(this.pc1.childPage[0]);																
				break;
			case "simpan" :			
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg2.validasi();		

				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_sisatagih.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Tagihan melebihi Sisa Tagihan.");
					return false;						
				}											
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else this.simpan();
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
					sql.add("delete from prb_prbill_m where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("delete from prb_prbill_d where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from prb_prbill_cust where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from prb_rab_dok where no_rab='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='BILL'");																
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;	
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);					
		if (this.stsSimpan == 1) this.doClick();						
	},	
	doChange:function(sender){	
		try {
			if (sender == this.cb_proyek && this.cb_proyek.getText()!="") {
				this.e_ket.setText(this.cb_proyek.rightLabelCaption);
				var strSQL =  "select a.kode_pp,a.kode_cust,f.nama as nama_cust,d.wapu,a.nilai, a.nilai-isnull(c.bill,0) as sisa, e.no_rab,f.alamat,f.npwp,f.pic,f.jabatan, "+ 
							"  f.akun_piutang "+
							"from prb_proyek a "+
							"		inner join prb_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							"		inner join prb_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi = d.kode_lokasi "+
							"		inner join prb_rabapp_m e on a.kode_proyek=e.kode_proyek and a.kode_lokasi = e.kode_lokasi "+
							"		inner join prb_rab_cust f on a.kode_cust=f.kode_cust and a.kode_lokasi = f.kode_lokasi and e.no_rab=f.no_rab and e.kode_lokasi = f.kode_lokasi "+														
							"		inner join masakun y on f.akun_piutang=y.kode_akun and f.kode_lokasi=y.kode_lokasi "+ //akun piutang harus terdaftar

							"   left join (	"+											
							"     select kode_proyek,kode_lokasi,sum(nilai) as bill "+
							"			from prb_prbill_m "+
							"			where kode_lokasi='"+this.app._lokasi+"' and kode_proyek='"+this.cb_proyek.getText()+"' and no_bill<>'"+this.e_nb.getText()+"' "+
							"			group by kode_lokasi,kode_proyek"+																		
							"    )  c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+

							"where a.versi='NTF21' and a.kode_proyek ='"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
																						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.noRABaju = line.no_rab;								

						this.cb_cust.setText(line.kode_cust,line.nama_cust);						
						this.kodePP = line.kode_pp;	//pp_kelola --> kode_pp di tabel pr_proyek			
						this.akunPiutang = line.akun_piutang;						
						this.e_nilaiproyek.setText(floatToNilai(line.nilai));	
						this.e_sisatagih.setText(floatToNilai(line.sisa));							
						
						if (this.stsSimpan == 1) {
							this.e_nama.setText(line.nama_cust);	
							this.e_alamat.setText(line.alamat);
							this.e_npwp.setText(line.npwp);
							this.e_pic.setText(line.pic);
							this.e_jabatan.setText(line.jabatan);
						}
						else {
							var data2 = this.dbLib.getDataProvider("select * from prb_prbill_cust where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",true);
							if (typeof data2 == "object"){
								var line2 = data2.rs.rows[0];							
								if (line2 != undefined){					
									this.e_nama.setText(line2.nama);	
									this.e_alamat.setText(line2.alamat);
									this.e_npwp.setText(line2.npwp);
									this.e_pic.setText(line2.pic);
									this.e_jabatan.setText(line2.jabatan);
								}
							}
						}
					}				
				}
				var strSQL = "select periode,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							 "from prb_prpyt_d where kode_lokasi='"+this.app._lokasi+"' and kode_proyek = '"+this.cb_proyek.getText()+"' "+
							 "group by periode ";
				var data = this.dbLib.getDataProvider(strSQL,true);				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.periode,floatToNilai(line.nilai)]);						
					}					
				} else this.sg.clear(1);		

				if (this.stsSimpan==1) {
					var strSQL = "select a.keterangan,a.jumlah,a.harga,a.total, b.no_rab "+
								"from prb_rabapp_d a inner join prb_rabapp_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi "+
								"where b.kode_lokasi='"+this.app._lokasi+"' and b.kode_proyek = '"+this.cb_proyek.getText()+"' and a.jenis='PDPT' "+
								"order by a.nu ";
				}
				else {					
					var strSQL = "select a.keterangan,a.jumlah,a.harga,a.total "+
								"from prb_prbill_d a "+
								"where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill = '"+this.e_nb.getText()+"' "+
								"order by a.nu ";
				}
				var data = this.dbLib.getDataProvider(strSQL,true);
				var tot = 0;
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg2.appendData([line.keterangan,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.total)]);						
					}										
				} else this.sg2.clear(1);		

				this.sgUpld.clear(); this.sgFile.clear();	
				this.deleteFiles = [];
				this.listFiles = new arrayMap();			
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar,a.no_rab "+
							 "from prb_rab_dok a "+
							 "inner join prb_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_ref = '"+this.noRABaju+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.listFiles.set(line.no_gambar,line.no_gambar); 
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);
						if (line.no_rab != this.e_nb.getText()) this.sgFile.appendData([line.no_gambar]);
					}
				} else this.sgUpld.clear(1);
			}		
		
			if ((sender == this.e_nilai || sender == this.e_ppn || sender == this.e_diskon) && this.e_nilai.getText()!="" && this.e_ppn.getText()!="" && this.e_diskon.getText()!="") {		
				this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText()) - nilaiToFloat(this.e_diskon.getText())));				
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doClick:function(sender){
		if (this.e_periode.getText()!= "" ) {							
			if (this.stsSimpan == 0){
				this.sg.clear(1); 
				this.sg3.clear(1);				
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"prb_prbill_m","no_bill",this.app._lokasi+"-BIL"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.cb_app.setFocus();
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
														
								this.nama_report="server_report_saku3_tu_rptProyekTagihan2";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 	
			this.sg3.clear(1); 	
			this.sgctt.clear(1); 	
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.doClick();
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			this.pc1.setActivePage(this.pc1.childPage[0]);																		
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																													 
		var strSQL = "select a.no_bill,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai+a.nilai_ppn-a.diskon as nilai "+
					"from prb_prbill_m a "+								 			 					 
					"where  a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='BILL' and a.progress in ('0','V','Y')";		
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
			this.sg3.appendData([line.no_bill,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick3(this.sg3,0,row);						
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
				this.doLoadCtt(this.e_nb.getText());				
				
				var strSQL = "select a.* from prb_prbill_m a where a.no_bill = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.cb_app.setText(line.nik_app);	
						this.cb_proyek.setText(line.kode_proyek);																	
						this.e_nilai.setText(floatToNilai(line.nilai));	
						this.e_diskon.setText(floatToNilai(line.diskon));	
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));												
					}
				}																		
			}									
		} catch(e) {alert(e);}
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal from prb_bill_app "+
						 "where no_bill='"+kode+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "order by convert(varchar,tanggal,103) desc";	
										
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 300px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select catatan,no_app, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_user "+
								  "from prb_bill_app "+
								  "where no_bill='"+kode+"' and tanggal='"+line.tanggal+"' and kode_lokasi='"+this.app._lokasi+"' "+
								  "order by tanggal desc,convert(varchar,tgl_input,108) desc ";	
												
					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_app+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}
					
	}		
});