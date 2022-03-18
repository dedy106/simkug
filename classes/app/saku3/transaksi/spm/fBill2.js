window.app_saku3_transaksi_spm_fBill2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spm_fBill2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fBill2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Piutang Proyek", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Billing","List Billing"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],		            
					colWidth:[[3,2,1,0],[100,410,80,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,500,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,500,20],caption:"Deskripsi", maxLength:150});						
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[750,18,210,20],caption:"Saldo Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});												
		//this.cb_pph = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"Akun PPh", multiSelection:false, maxLength:10, tag:9,visible:false});										
		this.cb_proyek = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Proyek", multiSelection:false, maxLength:20, tag:1,change:[this,"doChange"]});						
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[750,14,210,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});												
		//this.e_pph = new saiLabelEdit(this.pc2.childPage[0],{bound:[750,14,210,20],caption:"Nilai PPh", tag:1,tipeText:ttNilai, text:"0",change:[this,"doChange"],visible:false});								
		this.cb_cust = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Customer",readOnly:true, change:[this,"doChange"]});															
		//this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[750,19,210,20],caption:"PPN", tag:1, tipeText:ttNilai, text:"0", readOnly:true, change:[this,"doChange"]});				
		
		this.e_fp = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,250,20],caption:"Faktur Pajak", maxLength:50});
		this.e_kui = new saiLabelEdit(this.pc2.childPage[0],{bound:[280,17,240,20],caption:"No Kuitansi",labelWidth:80, maxLength:50,readOnly:true});
		this.e_ppn = new saiLabelEdit(this.pc2.childPage[0],{bound:[750,17,210,20],caption:"PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});	//fee jtk bisa diubah	
		this.i_ppn = new portalui_imageButton(this.pc2.childPage[0],{bound:[970,17,20,20],hint:"Hit PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doPPN"]});				
		
		this.e_pic = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,250,20],caption:"P I C", readOnly:true});
		this.e_telpic = new saiLabelEdit(this.pc2.childPage[0],{bound:[280,18,240,20],caption:"Telp PIC",labelWidth:80, readOnly:true});
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[750,18,210,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,233], childPage:["Data Billing","File Dok"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:3,tag:0,
		            colTitle:["Kode PP","Nama PP","Nilai Bill"],
					colWidth:[[2,1,0],[100,400,100]],	
					buttonStyle:[[0],[bsEllips]],				
					columnReadOnly:[true,[1],[2]],					
					colFormat:[[2],[cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],ellipsClick:[this,"doEllipsClick"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sgUpld = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

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
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
	
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			
			this.cb_proyek.setSQL("select kode_proyek, nama from spm_proyek where kode_pp='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_proyek","nama"],false,["Kode","Deskripsi"],"and","Data Proyek",true);			
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			//this.cb_pph.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag = '015' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','HUTPPN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;			
				}
			}		
			this.dataPP = this.app._pp;				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spm_fBill2.extend(window.childForm);
window.app_saku3_transaksi_spm_fBill2.implement({
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
					this.standarLib.showListData(this, "Daftar Jenis Dok",sender,undefined, 
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
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
												  "select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
												  "select count(*) from pp where kode_lokasi='"+this.app._lokasi+"'  and flag_aktif='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPPN:function(sender){	
		if (this.e_nilai.getText() != "") {
			var ppn = Math.round(nilaiToFloat(this.e_nilai.getText()) * 0.1);	
			this.e_ppn.setText(floatToNilai(ppn));
			this.sg.validasi();
		}		
	},
	doFPajak: function(sender){
		if (this.e_fp.getText()!="-"){
			var noAwal = noAkhir = "-";
			var data = this.dbLib.getDataProvider("select no_awal,no_akhir from spm_fpajak where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					noAwal = line.no_awal;
					noAkhir = line.no_akhir;
				} 			
				var data = this.dbLib.getDataProvider("select isnull(max(no_fpajak),0) as no_fp from spm_piutang_m where no_fpajak between '"+noAwal+"' and '"+noAkhir+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){											
						if (line.no_fp == "0") {
							//this.e_fp.setText(noAwal);
						  this.e_fp.setText(this.kodeWapu+noAwal.substr(2,16));
						}
						else {							
							if (noAkhir == line.no_fp) {								
								alert("No Faktur Pajak Aktif telah habis.["+noAkhir+"]");
								this.e_fp.setText("-");
							}
							else {
								var noFormat = this.kodeWapu + line.no_fp.substr(2,11);							
								var idx = parseFloat(line.no_fp.substr(11,8)) + 1;
								idx = idx.toString();
								if (idx.length == 1) var nu = "0000000"+idx;
								if (idx.length == 2) var nu = "000000"+idx;
								if (idx.length == 3) var nu = "00000"+idx;
								if (idx.length == 4) var nu = "0000"+idx;
								if (idx.length == 5) var nu = "000"+idx;
								if (idx.length == 6) var nu = "00"+idx;
								if (idx.length == 7) var nu = "0"+idx;
								if (idx.length == 8) var nu = idx;
								this.e_fp.setText(noFormat+nu);
							}
						}						
					} 
				}			
			}
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
						this.deleteFiles = [];					
						for (var i in this.listFiles.objList) {
							var ketemu = false;
							for (var j=0;j < this.sgUpld.getRowCount();j++){
								ketemu = i == this.sgUpld.cells(2,j);
								if (ketemu) break;
							}
							if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
						}
						sql.add("delete from spm_piutang_m where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_piutang_j where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_piutang_d where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_proyek_dok where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																						
					}
					
					sql.add("insert into spm_piutang_m(no_piutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_proyek,kode_cust,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_piutang,posted,nilai_ppn,modul,nilai_pph,akun_pph,no_fpajak,no_kui) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_proyek.getText()+"','"+this.cb_cust.getText()+"','IDR',1,'"+this.app._userLog+"','"+this.app._kodePP+"',"+parseNilai(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.akunPiu+"','F',"+parseNilai(this.e_ppn.getText())+",'BILL',0,'-','"+this.e_fp.getText()+"','"+this.e_kui.getText()+"')");									
					
					sql.add("insert into spm_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiu+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PIUUMUM','PIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");															
					
					/*		
					if (nilaiToFloat(this.e_pph.getText()) != 0) {
						sql.add("insert into spm_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',88,'"+this.cb_pph.getText()+"','"+this.e_ket.getText()+"','D','IDR',1,"+parseNilai(this.e_pph.getText())+","+parseNilai(this.e_pph.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PIUUMUM','PPHM','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");										
					}
					*/
					if (nilaiToFloat(this.e_ppn.getText()) != 0) {
						sql.add("insert into spm_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
								"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',99,'"+this.akunPPN+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PIUUMUM','HUTPPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					}
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){															
								var j = i+1;
								sql.add("insert into spm_piutang_d(no_piutang,kode_lokasi,periode,kode_proyek,kode_pp,nilai,dc,no_ref) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_proyek.getText()+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'D','-')");
								sql.add("insert into spm_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.akunPdpt+"','"+this.e_ket.getText()+"','C','IDR',1,"+parseNilai(this.sg.cells(2,i))+","+parseNilai(this.sg.cells(2,i))+",'"+this.sg.cells(0,i)+"','-','"+this.app._lokasi+"','PIUUMUM','PDPT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");								
							}
						}
					}

					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-"){
							ix++;
							sql.add("insert into spm_proyek_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','"+this.cb_proyek.getText()+"')");								
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
					this.sg.clear(1); this.sgUpld.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.doClick();
					this.pc2.setActivePage(this.pc2.childPage[0]);																		
				break;
			case "simpan" :			
			case "ubah" :		
				this.preView = "1";				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();		
				
				if (this.e_pic.getText() == "-" || this.e_telpic.getText() == "-") {
					system.alert(this,"Transaksi tidak valid.","Data PIC dan Telpon PIC harus valid.");
					return false;
				}
				
				if (this.flagGarFree == "0") {									
					for (var i=0;i < this.sg.getRowCount();i++){
						if (!this.sg.rowValid(i)){
							var isKosong = true;
							for (var j=0;j < this.sg.getColCount();j++){
								if (this.sg.cells(j,i) != "") {
									isKosong = false;
									break;
								}
							}						
							if (!isKosong) {
								system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
								return false;
							}
						}						
					}									
				}				
				
				if (this.e_fp.getText() != "-") {
					var strSQL = "select no_piutang from spm_piutang_m where no_piutang <> '"+this.e_nb.getText()+"' and no_fpajak='"+this.e_fp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
					var data3 = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data3 == "object"){
						var line3 = data3.rs.rows[0];							
						if (line3 != undefined){		
							system.alert(this,"Transaksi tidak valid.","No Faktur Pajak telah terpakai untuk No Bukti "+line3.no_piutang);
							return false;							
						}
					}	
				}
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldo.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai tagihan tidak boleh kurang dari Saldo.");
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

					this.deleteFiles = [];					
					for (var i in this.listFiles.objList) {
						var ketemu = false;
						for (var j=0;j < this.sgUpld.getRowCount();j++){
							ketemu = i == this.sgUpld.cells(2,j);
							if (ketemu) break;
						}
						if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
					}
					
					sql.add("delete from spm_piutang_m where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spm_piutang_j where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spm_piutang_d where no_piutang='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spm_proyek_dok where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																						
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;	
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		/*
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}
		*/			
		this.e_periode.setText(y+""+m);			

		if (this.stsSimpan == 1) {
			this.doClick();						
			
			//kalo ganti periode, generate lagi kuitansinya
			if (this.e_kui.getText()!="") this.doChange(this.cb_proyek);
		}
	},	
	doChange:function(sender){	
		if (sender == this.cb_cust && this.cb_cust.getText()!="") {
			var strSQL = "select wapu,pic,tel_pic from cust "+
			             "where kode_cust ='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){												
					this.kodeWapu = line.wapu;
					this.e_pic.setText(line.pic);
					this.e_telpic.setText(line.tel_pic);
				}				
			}
			if (this.stsSimpan == 1) this.doFPajak();
		}
			
		if (sender == this.cb_proyek && this.cb_proyek.getText()!="") {
			/*
			var strSQL = "select a.kode_cust,b.akun_piutang,b.akun_pdpt,a.nilai,c.kode_flag "+
			             "from spm_proyek a inner join spm_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
						 "  			    inner join spm_flagkui_d c on b.akun_piutang=c.kode_akun and b.kode_lokasi=c.kode_lokasi "+
			             "where a.kode_proyek ='"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
			14/9/2018
			*/
			var strSQL = "select a.kode_cust,b.akun_piutang,b.akun_pdpt,a.nilai,a.kode_pp "+
			             "from spm_proyek a inner join spm_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+						 
						 "where a.kode_proyek ='"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){											
					this.cb_cust.setText(line.kode_cust);					
					this.akunPiu = line.akun_piutang;
					this.akunPdpt = line.akun_pdpt;
					this.kontrak = parseFloat(line.nilai);
					
					if (this.stsSimpan == 1) {
						/*
						var AddFormat = "/FA/"+line.kode_flag+"/"+this.e_periode.getText().substr(4,2)+"/"+this.e_periode.getText().substr(0,4);			
						var data = this.dbLib.getDataProvider("select isnull(max(substring(no_kui,1,30)),0) as no_kui from ( "+
									"select no_kui,kode_lokasi from spm_piutang_m where kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select no_kui,kode_lokasi from piutang_m where kode_lokasi='"+this.app._lokasi+"' "+
									") a where no_kui like '___"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){
								if (line.no_kui == "0") this.e_kui.setText("0001"+AddFormat);
								else {
									var idx = parseFloat(line.no_kui.substr(0,4)) + 1;
									idx = idx.toString();
									if (idx.length == 1) var nu = "000"+idx;
									if (idx.length == 2) var nu = "00"+idx;
									if (idx.length == 3) var nu = "0"+idx;
									if (idx.length == 4) var nu = idx;
									this.e_kui.setText(nu+AddFormat);
								}
							} 
						}
						14/9/2018
						*/
						
						//........./FA/Sypuma-00/9/2018
						var AddFormat = "/FA/SYPUMA-__/"+this.e_periode.getText().substr(4,2)+"/"+this.e_periode.getText().substr(0,4);	
						var AddFormat2 = "/FA/SYPUMA-"+line.kode_pp+"/"+this.e_periode.getText().substr(4,2)+"/"+this.e_periode.getText().substr(0,4);			
						
						var data = this.dbLib.getDataProvider("select isnull(max(substring(no_kui,1,30)),0) as no_kui from ( "+
									"select no_kui,kode_lokasi from spm_piutang_m where kode_lokasi='"+this.app._lokasi+"' "+
									"union "+
									"select no_kui,kode_lokasi from piutang_m where kode_lokasi='"+this.app._lokasi+"' "+
									") a where no_kui like '%___"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){
								if (line.no_kui == "0") this.e_kui.setText("0001"+AddFormat2);
								else {
									var idx = parseFloat(line.no_kui.substr(0,4)) + 1;
									idx = idx.toString();
									if (idx.length == 1) var nu = "000"+idx;
									if (idx.length == 2) var nu = "00"+idx;
									if (idx.length == 3) var nu = "0"+idx;
									if (idx.length == 4) var nu = idx;
									this.e_kui.setText(nu+AddFormat2);
								}
							} 
						}

					}
					
				}				
			}			
			
			var strSQL = "select isnull(sum(case dc when 'D' then nilai else -nilai end),0) as tagih "+
						  "from spm_piutang_d "+
						  "where kode_proyek ='"+this.cb_proyek.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_piutang<>'"+this.e_nb.getText()+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){																
					this.e_saldo.setText(floatToNilai(this.kontrak - parseFloat(line.tagih)));
				}				
			}			
			
		}		
		if ((sender == this.e_ppn) && this.e_ppn.getText()!="") {			 //|| this.e_pph  && this.e_pph.getText()!=""
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText()) )); // - nilaiToFloat(this.e_pph.getText()) 
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spm_piutang_m","no_piutang",this.app._lokasi+"-PR"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
		}
	},	
	doChangeCell: function(sender, col, row){
		if (col == 2) this.sg.validasi();				
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg.cells(0,row) != "") {				
				var pp = this.dataPP.get(sender.cells(0,row));				
				if (pp) sender.cells(1,row,pp);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode PP "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCell");						
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(2,i) != ""){										
					tot += nilaiToFloat(this.sg.cells(2,i));									
				}
			}						
			this.e_nilai.setText(floatToNilai(tot));			
			//this.e_ppn.setText(floatToNilai(Math.round(tot * 0.1)));			
			this.e_total.setText(floatToNilai(tot + nilaiToFloat(this.e_ppn.getText()) )); //- nilaiToFloat(this.e_pph.getText()) 
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
					case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_spm_rptProyekPiutangJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_piutang='"+this.e_nb.getText()+"' ";
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
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
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
			this.sg.clear(1); this.sgUpld.clear(1);	
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.doClick();
			this.pc2.setActivePage(this.pc2.childPage[0]);																		
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																								
		var strSQL = "select a.no_piutang,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from spm_piutang_m a "+					 					 
					 "where a.kode_pp='"+this.app._kodePP+"' and a.posted='F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='BILL'";					 
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
			this.sg3.appendData([line.no_piutang,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
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
				
				var strSQL = "select * "+
							 			 "from spm_piutang_m a "+								 
							 			 "where a.no_piutang = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);						
						this.dp_d1.setText(line.tanggal);
						this.cb_proyek.setText(line.kode_proyek);											
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));
						//this.e_pph.setText(floatToNilai(line.nilai_pph));	
						//this.cb_pph.setText(line.akun_pph);
						this.e_fp.setText(line.no_fpajak);
						this.e_kui.setText(line.no_kui);
					}
				}								
				
				var data = this.dbLib.getDataProvider("select a.kode_pp,b.nama,a.nilai "+
							"from spm_piutang_d a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_piutang = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_pp",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kode_pp,line.nama,floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);	
				
				this.sgUpld.clear();				
				this.listFiles = new arrayMap();			
				var data = this.dbLib.getDataProvider(
						   "select b.kode_jenis,b.nama,a.no_gambar from spm_proyek_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
						   "where a.no_ref = '"+this.cb_proyek.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgUpld.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.listFiles.set(line.no_gambar,line.no_gambar); 
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);
					}
				} else this.sgUpld.clear(1);

			}									
		} catch(e) {alert(e);}
	}	
});