window.app_saku3_transaksi_tu_rra_fRROpenLok = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_rra_fRROpenLok.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_rra_fRROpenLok";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Transfer Anggaran", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,225,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_lokdonor = new saiCBBL(this,{bound:[20,16,200,20],caption:"Lokasi Budget",  multiSelection:false, maxLength:10, tag:1 });
		this.cb_lokterima = new saiCBBL(this,{bound:[20,18,200,20],caption:"Lok. Konsolidasi", maxLength:10, tag:2, readOnly:true});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.e_kredit = new saiLabelEdit(this,{bound:[800,16,200,20],caption:"Tot. Penambahan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.e_debet = new saiLabelEdit(this,{bound:[800,17,200,20],caption:"Tot. Pengurangan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,16,1000,280], childPage:["Data Mutasi","File Dok"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:10,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Periode","Saldo","Nilai","T/K"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[60,100,100,80,150,80,150,80,150,80]],
					columnReadOnly:[true,[1,3,5,6,7],[0,2,4,8,9]],
					buttonStyle:[[0,2,4,6,9],[bsEllips,bsEllips,bsEllips,bsAuto,bsAuto]], 
					colFormat:[[7,8],[cfNilai,cfNilai]],
					picklist:[[6,9],[new portalui_arrayMap({items:["03","06","09","12"]}),new portalui_arrayMap({items:["T","K"]})]],					
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					pasteEnable:true,autoPaging:true,rowPerPage:1000,afterPaste:[this,"doAfterPaste"],
					checkItem:true,autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg, pager:[this,"doPage"]});		
		
		// this.cb_aju = new saiCBBL(this.pc1.childPage[2],{bound:[20,11,220,20],caption:"No Pengajuan", multiSelection:false, maxLength:10, tag:9});		
		// this.bLoad = new button(this.pc1.childPage[2],{bound:[120,14,98,18],caption:"Load Data",click:[this,"doTampil"]});			

		this.sgUpld = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:0,
					colTitle:["KdDok","Jenis Dokumen","Nama File","Upload","DownLoad"],
					colWidth:[[4,3,2,1,0],[80,80,300,200,80]], 
					columnReadOnly:[true,[0,1,2,3,4],[]],					
					colFormat:[[3,4],[cfUpload,cfButton]], 
					buttonStyle:[[0],[bsEllips]], 	
					click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
					ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[1],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
					colTitle:["namaFile","status"],
					colWidth:[[1,0],[80,180]],
					readOnly: true,autoAppend:false,defaultRow:1});

		this.rearrangeChild(10, 23);
		//this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
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
			
			this.cb_lokdonor.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi<> '20'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi Donor",true);
			this.cb_lokterima.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi='20'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi Terima",true);			

			this.cb_buat.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");

			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			
			this.cb_lokdonor.setText(this.app._lokasi);
			this.cb_lokterima.setText("20");
			
			var sql = new server_util_arrayList(); 
			sql.add("select kode_akun, nama from masakun where block='0' and kode_lokasi='"+this.cb_lokdonor.getText()+"'");
			sql.add("select kode_pp, nama from pp where tipe='posting' and kode_lokasi='"+this.cb_lokdonor.getText()+"' and flag_aktif ='1'");				
			this.dbLib.getMultiDataProviderA(sql);	

			// this.isiCbAju();

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_rra_fRROpenLok.extend(window.childForm);
window.app_saku3_transaksi_tu_rra_fRROpenLok.implement({
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
	// isiCbAju: function() {
	// 	this.cb_aju.setSQL("select no_pdrk, keterangan from rra_pdrk_m where progress='A' and kode_lokasi='"+this.app._lokasi+"'",["no_pdrk","keterangan"],false,["No Aju","Deksripsi"],"and","Data Pengajuan",true);
	// },	
	doAfterPaste: function(sender,totalRow){
		try {
			if (sender == this.sg) {				
				this.sgn.setTotalPage(sender.getTotalPage());
				this.sgn.rearrange();
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							this.doChangeCell(this.sg,0,i);
							this.doChangeCell(this.sg,2,i);
							this.doChangeCell(this.sg,4,i);
							this.doChangeCell(this.sg,6,i);
							this.doChangeCell(this.sg,8,i);
						}
					}
				}
				this.doNilaiChange(this.sg);			
			}
			
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		if (sender == this.sgn) this.sg.doSelectPage(page);
		if (sender == this.sgn2) this.sg2.doSelectPage(page);
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-TGR"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					// if (this.cb_aju.getText() != "") {
					// 	sql.add("delete from anggaran_m where no_agg='"+this.cb_aju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					// 	sql.add("delete from rra_pdrk_m where no_pdrk='"+this.cb_aju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					// 	sql.add("delete from rra_pdrk_d where no_pdrk='"+this.cb_aju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					// 	sql.add("delete from it_aju_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					// }

					sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText().substr(0,4)+"','IDR',"+parseNilai(this.e_debet.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','TAKGAR')");

					sql.add("insert into rra_pdrk_m(no_pdrk,kode_lokasi,keterangan,kode_pp,kode_bidang,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi, nik_user, tgl_input,progress,modul) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','-','-','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.cb_app.getText()+"','TAKGAR','-','"+this.app._userLog+"',getdate(),'1','TAKGAR')");
							
					var periode ="";
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								periode = this.e_periode.getText().substr(0,4)+this.sg.cells(6,i);
								if (this.sg.cells(9,i) == "T") {
									var DClokal = "D";
									var DCtak = "C";
								}
								else {
									var DClokal = "C";
									var DCtak = "D";
								}
								sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_lokdonor.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+periode+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+",'"+DClokal+"','-')");
								sql.add("insert into anggaran_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul,buffer) values "+		
										"('"+this.e_nb.getText()+"','"+this.cb_lokdonor.getText()+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(4,i)+"',1,'"+periode+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(8,i))+",'"+DClokal+"','-','"+this.app._userLog+"',getdate(),'RRA',0)");

								sql.add("insert into anggaran_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul,buffer) values "+		
										"('"+this.e_nb.getText()+"','"+this.cb_lokterima.getText()+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(4,i)+"',1,'"+periode+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(8,i))+",'"+DCtak+"','-','"+this.app._userLog+"',getdate(),'RRA',0)");
							}
						}
					}
				
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into it_aju_dok(no_bukti,no_gambar,kode_lokasi,modul) values "+
									"('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+this.app._lokasi+"','RRRMULTI')");															
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
					this.sg.clear(1); 					
					this.sgUpld.clear(1);
					this.sgFile.clear(1);
					setTipeButton(tbSimpan);
					this.isiCbAju();
				break;
			case "simpan" :					
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
				
				this.sg.validasi();
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){	
						if ((nilaiToFloat(this.sg.cells(8,i)) > nilaiToFloat(this.sg.cells(7,i))) && this.sg.cells(9,i)=="K") {
							var x = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai melebihi Saldo untuk baris ["+x+"]");
							return false;
						}
						for (var j=i;j < this.sg.getRowCount();j++){
							//if ((this.sg.cells(0,j)+this.sg.cells(2,j)+this.sg.cells(4,j)+this.sg.cells(6,j)) == (this.sg.cells(0,i)+this.sg.cells(2,i)+this.sg.cells(4,i)+this.sg.cells(6,i)) && (i != j)) {
							if ((i != j) && (this.sg.cells(0,i)==this.sg.cells(0,j)) && (this.sg.cells(2,i)==this.sg.cells(2,j))  && (this.sg.cells(4,i)==this.sg.cells(4,j)) && (this.sg.cells(6,i)==this.sg.cells(6,j)) ) {	
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_kredit.getText()) < 0 || nilaiToFloat(this.e_debet.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.app._periode.substr(0,4) > this.e_periode.getText().substr(0,4)){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi harus dalam tahun anggaran yang sama.["+this.app._periode.substr(0,4)+"]");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			// case "ubah" :	
			// 	this.ubah();
			// 	break;				
			// case "hapus" :	
			// 	this.hapus();
			// 	break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		
		this.e_nb.setText("");		
	},		
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"anggaran_m","no_agg",this.app._lokasi+"-TGR"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
	},
	doChangeCell: function(sender, col, row){
		try {
			if ((col == 6 || col == 8 || col == 9 ) && (this.sg.cells(8,row) != "")) this.sg.validasi();
			sender.onChange.set(undefined,undefined);
			if (col == 0) {
				if (this.sg.cells(0,row) != "") {
					var akun = this.dataAkun.get(sender.cells(0,row));
					if (akun) sender.cells(1,row,akun);
					else {                                    
						if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
						sender.cells(0,row,"");
						sender.cells(1,row,"");
					}				
				}
			}
			if (col == 2) {
				if (this.sg.cells(2,row) != "") {
					var pp = this.dataPP.get(sender.cells(2,row));
					if (pp) sender.cells(3,row,pp);
					else {
						if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode PP "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
						sender.cells(2,row,"");
						sender.cells(3,row,"");
					}				
				}
			}
			if (col == 4) {
				if (this.sg.cells(4,row) != "") {
					var isAda = false;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) isAda = true;
						} 
					}
					var data = this.dbLib.getDataProvider("select distinct a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and b.kode_drk = '"+this.sg.cells(4,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) this.sg.cells(5,row,line.nama);
						else {
							if (!isAda) this.sg.cells(4,row,"-");
							else {
								this.sg.cells(4,row,"");
								this.sg.cells(5,row,"");
							}
						}
					}
				}
			}
			if (col == 0 || col == 2 || col == 4 || col == 6) {
				if (this.sg.cells(0,row) !="") {
					//var data = this.dbLib.getDataProvider("select fn_cekaggBulan('"+this.sg.cells(2,row)+"','"+this.cb_lokdonor.getText()+"','"+this.sg.cells(0,row)+"','"+this.sg.cells(4,row)+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(6,row)+"','"+this.e_nb.getText()+"') as gar ",true);
					var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg.cells(2,row)+"','"+this.cb_lokdonor.getText()+"','"+this.sg.cells(0,row)+"','"+this.sg.cells(4,row)+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(6,row)+"') as gar ",true);			

					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];
						data = line.gar.split(";");
						sls = parseFloat(data[0]) - parseFloat(data[1]);
						this.sg.cells(7,row,floatToNilai(sls));				
					}						
				}
			}		
			sender.onChange.set(this,"doChangeCell");		
		}
		catch(e) {
			alert(e);
		}
	},	
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != ""){					
					if (this.sg.cells(9,i) == "T") totD += nilaiToFloat(this.sg.cells(8,i));
					if (this.sg.cells(9,i) == "K") totC += nilaiToFloat(this.sg.cells(8,i));
				}
			}			
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},   
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.cb_lokdonor.getText()+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.cb_lokdonor.getText()+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 4){					
					var vSts = true;
					var data = this.dbLib.getDataProvider("select count(distinct a.kode_drk) as jml from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.jml != 0) var vSts = false; 
						} 
					}
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.cb_lokdonor.getText()+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.sg.cells(0,row)+"' and b.kode_pp = '"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.cb_lokdonor.getText()+"'",
													  ["a.kode_drk","a.nama"],"and",["Kode DRK","Nama DRK"],vSts);
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
							
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}
							
							this.nama_report="server_report_saku2_gar_rptAggPdrk";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pdrk='"+this.e_nb.getText()+"' ";
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
							this.pc1.hide();						
						}else system.info(this,result,"");
					break;
					
	      			case "getMultiDataProvider":
	    			    eval("result = "+result+";");
	    			    if (typeof result != "string"){
                            this.dataAkun = new portalui_arrayMap();
							this.dataPP = new portalui_arrayMap();

							if (result.result[0]){	    			        
	    			            var line;
	    			            for (var i in result.result[0].rs.rows){
	    			                line = result.result[0].rs.rows[i];
	    			                this.dataAkun.set(line.kode_akun, line.nama);
                                }
                            }
							if (result.result[1]){	    			        
	    			            var line;
	    			            for (var i in result.result[1].rs.rows){
	    			                line = result.result[1].rs.rows[i];
	    			                this.dataPP.set(line.kode_pp, line.nama);
                                }
                            }
							
                        }else throw result;
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
				this.pc1.show();   
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
			this.sg.clear(1); 			
			setTipeButton(tbSimpan);
			// this.isiCbAju();
		} catch(e) {
			alert(e);
		}
	}
	
});