window.app_saku3_transaksi_ypt_logistik_fPengadaan2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_logistik_fPengadaan2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_logistik_fPengadaan2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengadaan", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Terima", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]});		

		this.pc1 = new pageControl(this,{bound:[10,18,1000,440], childPage:["Daftar Request","Data Pengadaan","Data Budget","Maksud - Tujuan","Aspek Strategis","Cari Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:0,
		            colTitle:["No Request","Tanggal","PP","No Dokumen","Deskripsi","Nilai","Pilih","Mode"],
					colWidth:[[7,6,5,4,3,2,1,0],[50,70,100,300,150,150,80,100]],
					colHide:[[7],[true]],
					readOnly:true,colFormat:[[5],[cfNilai]],
					click:[this,"doSgBtnClick"], colAlign:[[6],[alCenter]],													 
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});		
		
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Pengadaan", readOnly:true});						
		this.e_ket3 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:200});
		this.e_nopesan = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"No Request", readOnly:true});
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,11,200,20],caption:"Modul", readOnly:true,visible:false});						
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Tgl Bukti", readOnly:true});
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[230,13,240,20],caption:"No Dokumen", readOnly:true});
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"PP/Unit", readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Ket Request", readOnly:true});
		this.e_file = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"File Jus. Kebthn", readOnly:true, tag:9});		
		this.bLihat = new button(this.pc1.childPage[1],{bound:[490,16,80,18],caption:"Lihat File",click:[this,"doLihat"]});		
		this.e_file2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"File Upload", readOnly:true, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[1],{bound:[490,15,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat2 = new button(this.pc1.childPage[1],{bound:[620,15,80,18],caption:"Lihat File",click:[this,"doLihat2"],visible:false});			
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Sisa Ni. Request", readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_nilaiada = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,14,200,20],caption:"Nilai Pengadaan", readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,192],colCount:8,
		            colTitle:["Item Barang","Merk","Tipe","Spesifikasi","Volume","Harga","Jumlah","ID"],
					colWidth:[[7,6,5,4,3,2,1,0],[50,80,80,60,200,150,150,220]],															
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[7],[0,1,2,3,4,5,6]], 
					change:[this,"doChangeCell3"],nilaiChange:[this,"doNilaiChange3"],
					autoAppend:true,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg3});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:9, 
					colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});

		this.mDesk1 = new tinymceCtrl(this.pc1.childPage[3],{bound:[5,5,990,420], withForm:false});
		this.mDesk2 = new tinymceCtrl(this.pc1.childPage[4],{bound:[5,5,990,420], withForm:false});
		
		this.e_ket2= new saiCBBL(this.pc1.childPage[5],{bound:[20,13,220,20],caption:"No Pengadaan", multiSelection:false, maxLength:10, tag:9});		
		this.bCari = new button(this.pc1.childPage[5],{bound:[120,10,98,18],caption:"Cari Data",click:[this,"doCari"]});			
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[5].rearrangeChild(10, 23);			
				
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
							   
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_logistik_fPengadaan2.extend(window.childForm);
window.app_saku3_transaksi_ypt_logistik_fPengadaan2.implement({	
	isiCBnoAda: function() {
		this.e_ket2.setSQL("select no_terima ,keterangan from log_justerima_m where periode<='"+this.e_periode.getText()+"' and progress='0' and kode_lokasi='"+this.app._lokasi+"'",["no_terima","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Pengadaan",true);
	},
	doLihat2: function(sender){
		try{
			if (this.e_file2.getText() != "" || this.e_file2.getText() != "-") window.open("server/media/"+this.e_file2.getText());
		}catch(e){
			alert(e);
		}
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file2.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
			alert(e);
		}
	},
	doLihat: function(sender){
		try{
			if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());
		}catch(e){
			alert(e);
		}
	},

	doChangeCell3: function(sender, col, row){
		if (col == 4 || col == 5 ) {
			if (this.sg3.cells(4,row) != "" && this.sg3.cells(5,row) != "") {
				this.sg3.cells(6,row,floatToNilai(nilaiToFloat(this.sg3.cells(4,row)) * nilaiToFloat(this.sg3.cells(5,row))));
				this.sg3.validasi();		
			}
		}
	},
	doNilaiChange3: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg3.rows.getLength();i++){
				if (this.sg3.rowValid(i) && this.sg3.cells(6,i) != ""){					
					tot += nilaiToFloat(this.sg3.cells(6,i));
				}
			}
			this.e_nilaiada.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	mainButtonClick: function(sender, desk){
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
						sql.add("delete from log_justerima_m where no_terima='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from log_justerima_d where no_terima='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from log_pesan_dok where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
										
					sql.add("insert into log_justerima_m(no_terima,no_pesan,kode_lokasi,tgl_input,nik_user,periode,tanggal,nik_serah,nik_terima,jenis,keterangan,progress,nilai) values "+
						   "('"+this.e_nb.getText()+"','"+this.e_nopesan.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','-','-','"+this.e_ket3.getText()+"','0',"+nilaiToFloat(this.e_nilaiada.getText())+")"); 							

					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){
								sql.add("insert into log_justerima_d(no_terima,kode_lokasi,no_urut,item,merk,tipe,catatan,jumlah,nilai,harga,no_po,no_ba,kode_dana,jum_po,kode_klpfa,ppn,no_pesan) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg3.cells(0,i)+"','"+this.sg3.cells(1,i)+"','"+this.sg3.cells(2,i)+"','"+this.sg3.cells(3,i)+"',"+nilaiToFloat(this.sg3.cells(4,i))+","+nilaiToFloat(this.sg3.cells(5,i))+",0,'-','-','-',0,'-',0,'"+this.e_nopesan.getText()+"')");
								
								//ditandai supaya tidak ke load lagi
								if (this.stsSimpan==1) {
									sql.add("update log_pesan_d set no_po='"+this.e_nb.getText()+"' where no_pesan='"+this.e_nopesan.getText()+"' and no_urut="+this.sg3.cells(7,i)+" and kode_lokasi='"+this.app._lokasi+"'");
								}		

							}
						}
					}
							
					sql.add("insert into log_pesan_dok(no_pesan,no_gambar,nu,kode_jenis,kode_lokasi) values('"+this.e_nb.getText()+"','"+this.e_file2.getText()+"',0,'APPLOG','"+this.app._lokasi+"')");					
					sql.add("update log_pesan_m set progress='2' where no_pesan='"+this.e_nopesan.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					

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
					this.sg2.clear(1); this.sg3.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					setTipeButton(tbAllFalse);
					this.bLihat2.hide();
					this.isiCBnoAda();	
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "0"; //report belum ada
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);		

				if (nilaiToFloat(this.e_nilaiada.getText()) > nilaiToFloat(this.e_nilai.getText())) {
					system.alert(this,"Transaksi tidak valid.","No Pengadaan melebihi Sisa Nilai Request.");
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
				
				var data = this.dbLib.getDataProvider("select no_terima from log_justerima_m where no_terima <> '"+this.e_nb.getText()+"' and no_pesan='"+this.e_nopesan.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line == undefined){													
						sql.add("update log_pesan_m set progress='1',no_terima='-' where no_pesan='"+this.e_nopesan.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					}
				}	
				
				sql.add("delete from log_justerima_m where no_terima='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from log_justerima_d where no_terima='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from log_pesan_dok where no_pesan='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

				sql.add("update log_pesan_d set no_po='-' where no_po='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);	
		this.isiCBnoAda();	
		this.doClick();
		this.doLoad();
	},	
	doClick:function(sender){		
		if (this.e_nopesan.getText()!="") {						
			if (this.stsSimpan==0) {
				this.bLihat2.hide();
			}
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"log_justerima_m","no_terima",this.app._lokasi+"-LOG"+this.e_periode.getText().substr(2,4)+".","0000"));															
		}
	},		
	doSgBtnClick: function(sender, col, row){
		try{
			if (col == 6) this.doDoubleClick(this.sg,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{			
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.e_nopesan.setText(this.sg.cells(0,row));								
				this.e_tgl.setText(this.sg.cells(1,row));				
				this.e_pp.setText(this.sg.cells(2,row));
				this.e_dok.setText(this.sg.cells(3,row));
				this.e_ket.setText(this.sg.cells(4,row));
				this.e_nilai.setText(this.sg.cells(5,row));		
				var modeInput = this.sg.cells(7,row).toUpperCase();
				
				if (modeInput != "INPUT") {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;		
					this.e_nb.setText(this.sg.cells(7,row));			

					var strSQL = "select no_gambar from log_pesan_dok where kode_jenis='APPLOG' and no_pesan = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){															
							this.e_file.setText(line.no_gambar);	
							this.fileBfr = line.no_gambar;
						}
					}
					
					var strSQL = "select keterangan from log_justerima_m where no_terima = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";											
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){															
							this.e_ket3.setText(line.keterangan);								
						}
					}

				}
				else {
					this.doClick();				
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				
				var strSQL = "select a.nik_app+' - '+b.nama as tahu,c.no_gambar,a.maksud,a.aspek,a.kode_lokasi "+
							 "from log_pesan_m a "+
				             "inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
							 "inner join log_pesan_dok c on a.no_pesan=c.no_pesan and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_pesan='"+this.e_nopesan.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																							
						this.e_file.setText(line.no_gambar);													
						this.mDesk1.setCode(urldecode(line.maksud));
						this.mDesk2.setCode(urldecode(line.aspek));						
					}
				}
				
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
							"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"              left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode1,1,4) "+
							"where a.no_bukti = '"+this.e_nopesan.getText()+"' and a.modul='LOGREQ' order by a.kode_akun",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
					}
				} else this.sg2.clear(1);										
				
				
				if (this.stsSimpan == 1) var strSQL = "select no_urut,item,merk,tipe,catatan,jumlah,nilai,jumlah*nilai as total from log_pesan_d where no_pesan='"+this.e_nopesan.getText()+"' and no_po='-' order by no_urut";							
				else var strSQL = "select no_urut,item,merk,tipe,catatan,jumlah,nilai,jumlah*nilai as total from log_justerima_d where no_terima='"+this.e_nb.getText()+"' order by no_urut";							

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];												
						this.sg3.appendData([line2.item,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.nilai),floatToNilai(line2.total),line2.no_urut]);
					}
				} else this.sg3.clear(1);				
				
			}
		} catch(e) {alert(e);}
	},		
	doLoad:function(sender){														
		var strSQL = "select a.tanggal,a.no_pesan,convert(varchar,a.tanggal,103) as tgl,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai-isnull(d.pengadaan,0) as sisa,'input' as mode "+
					 "from log_pesan_m a "+
					 "					 inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 
					 "					 left join ( "+
					 "						select no_pesan,kode_lokasi,sum(nilai*jumlah) as pengadaan "+
					 "						from log_justerima_d where kode_lokasi='"+this.app._lokasi+"' "+
					 "						group by no_pesan,kode_lokasi "+
					 "			          ) d on a.no_pesan=d.no_pesan and a.kode_lokasi=d.kode_lokasi "+					 
					 "where a.progress in ('1','2') and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+ 					 
					 "order by a.tanggal";							 			 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},	
	doCari:function(sender){						
		var filter = "";		
		if (this.e_ket2.getText()!="") filter = " and c.no_terima like '%"+this.e_ket2.getText()+"%' ";		
				
		var strSQL = "select distinct a.tanggal, a.no_pesan,"+
		             "convert(varchar,a.tanggal,103) as tgl,b.kode_pp+' - '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai-isnull(d.pengadaan,0) as sisa, c.no_terima as mode "+
					 "from log_pesan_m a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "					 inner join log_justerima_d c on a.no_pesan=c.no_pesan and a.kode_lokasi=c.kode_lokasi "+
					 "					 left join ( "+
					 "						select no_pesan,kode_lokasi,sum(nilai * jumlah) as pengadaan "+
					 "						from log_justerima_d where no_terima<>'"+this.e_ket2.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
					 "						group by no_pesan,kode_lokasi "+
					 "			          ) d on a.no_pesan=d.no_pesan and a.kode_lokasi=d.kode_lokasi "+							 			 					 		 
					 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" ";									

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];			
			this.sg.appendData([line.no_pesan,line.tgl,line.pp,line.no_dokumen,line.keterangan,floatToNilai(line.sisa),"Pilih",line.mode]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
							
								this.nama_report = "server_report_saku2_kopeg_sju_rptPrQuo";
								this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_app='" + this.e_nb.getText() + "' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc1.hide();								
							}
							else {
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_nb.getText() + ")", "");
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
			this.sg2.clear(1); this.sg3.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);						
			setTipeButton(tbAllFalse);
			this.bLihat2.hide();
			this.isiCBnoAda();	
		} catch(e) {
			alert(e);
		}
	}
});