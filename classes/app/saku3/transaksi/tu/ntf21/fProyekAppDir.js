window.app_saku3_transaksi_tu_ntf21_fProyekAppDir = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_ntf21_fProyekAppDir.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_ntf21_fProyekAppDir";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Approve Tahap II - Aktivasi Proyek", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.l_tgl3 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,12,100,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Proyek","Data Proyek","Filter Cari"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:9,
		      	colTitle:["No Proyek","Customer","No Dokumen","Deskripsi","Nilai","Detail"],
			  	colWidth:[[5,4,3,2,1,0],[60,100,300,200,200,100]],
			  	click:[this,"doSgBtnClick3"], colAlign:[[5],[alCenter]],													 
			  	colFormat:[[4,5],[cfNilai,cfButton]],readOnly:true,
			  	dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.e_nb = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"No Approve", readOnly:true,visible:false});				
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","REVISI"], readOnly:true,tag:2});		
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,14,220,20],caption:"NIK Approve",tag:2,multiSelection:false});
		this.e_memo = new saiMemo(this.pc2.childPage[1],{bound:[20,10,450,40],caption:"Catatan Aktifasi",tag:9,readOnly:true});		
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,20,996,306], childPage:["Data Proyek","Distribusi Akru","File Dokumen","Detail RAB","Cattn Memo"]});
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,readOnly:true}); 					
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,13,400,20],caption:"Bank", tag:1, readOnly:true});			
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"ID Proyek", change:[this,"doChange"],readOnly:true});					
		this.e_rab = new saiLabelEdit(this.pc1.childPage[0],{bound:[250,11,200,20],caption:"No RAB",readOnly:true});							
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,11,400,20],caption:"Nama Rekening",readOnly:true,tag:1});			
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,430,20],caption:"No Kontrak", maxLength:50, tag:1,readOnly:true});	
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,10,400,20],caption:"No Rekening", readOnly:true, tag:1});			
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,430,20],caption:"Deskripsi", maxLength:200, tag:1,readOnly:true});					
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],readOnly:true}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[250,13,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[350,13,98,18],readOnly:true}); 
		this.l_tgl4 = new portalui_label(this.pc1.childPage[0],{bound:[20,16,100,18],caption:"TglMax Admintrasi", underline:true});
		this.dp_d4 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,16,98,18],readOnly:true}); 		
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Jenis",tag:1,readOnly:true}); 						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});
		this.e_persenor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Persen OR", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});								
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[0],{bound:[250,15,200,20],caption:"Nilai OR", tag:1, tipeText:ttNilai, text:"0", readOnly:true,readOnly:true});										
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0", readOnly:true});	
		this.e_pph4 = new saiLabelEdit(this.pc1.childPage[0],{bound:[250,19,200,20],caption:"Nilai PPh", tag:1, tipeText:ttNilai, text:"0", readOnly:true});						
		this.e_jumlah = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Jml Jadwal", tag:1, tipeText:ttNilai, text:"0",readOnly:true});			

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		        colTitle:["Periode","Nilai Pend","Nilai Beban"],
			    colWidth:[[2,1,0],[150,150,100]],
			  	columnReadOnly:[true,[1],[]],
			  	readOnly:true,
			  	colFormat:[[1,2],[cfNilai,cfNilai]],	
			  	nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
				
		this.sg1mp2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-4,this.pc1.height-33],colCount:4,readOnly:true,tag:9,
				colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad"],
				colWidth:[[3,2,1,0],[80,480,200,80]],
				rowCount:1,colFormat:[[3],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3,pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            

		this.sgr = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:1,
				colTitle:["Kegiatan","Quantity","Harga Satuan","SubTotal","Jenis"],
				colWidth:[[4,3,2,1,0],[80,100,100,100,500]],
				readOnly:true,
				colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],	
				autoAppend:false,defaultRow:1});
		this.sgnr = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgr});		
		
		this.sgctt = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
				colTitle:["Catatan"],
				colWidth:[[0],[100]],					
				readOnly:true,autoAppend:false,defaultRow:1});

		this.c_status2 = new saiCB(this.pc2.childPage[2],{bound:[20,10,200,20],caption:"Status",items:["APPROVE"], readOnly:true,tag:2});
		this.cb_cust2 = new portalui_saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"Customer",tag:9,multiSelection:false}); 				
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,10,98,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);	
		
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
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d3,this.dp_d3.year,this.dp_d3.month,this.dp_d3.day);
			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_cust2.setSQL("select kode_cust,nama from prb_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_jenis.setSQL("select kode_jenis,nama from prb_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);			
			this.cb_app.setSQL("select nik,nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);
			
			this.dataPP = this.app._pp;	
			this.cb_pp.setText(this.app._kodePP);		
			this.cb_app.setText(this.app._userLog);

			this.doLoadCtt(this.e_rab.getText());

			this.nilaiMax = 0;
			var strSQL = "select value2 from spro where kode_lokasi ='"+this.app._lokasi+"' and kode_spro = 'APPNTF'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){		
					this.nilaiMax = parseFloat(line.value2);
				}				
			}				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_ntf21_fProyekAppDir.extend(window.childForm);
window.app_saku3_transaksi_tu_ntf21_fProyekAppDir.implement({	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"prb_proyek_app","no_app",this.app._lokasi+"-AK"+this.e_periode.getText().substr(2,4)+".","0000"));				
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.c_status.getText()=="APPROVE")  var prog = "1";
					else var prog = "N";												
					
					sql.add("update prb_proyek_app set no_appseb = '"+this.e_nb.getText()+"' where no_appseb ='-' and no_bukti='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='AKTIF_PR2'");
					sql.add("insert into prb_proyek_app (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,no_bukti,modul,no_appseb,catatan,no_rab,nik_app) values "+
									"('"+this.e_nb.getText()+"','"+this.dp_d3.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.c_status.getText()+"','"+this.cb_kode.getText()+"','AKTIF_PR2','-','"+this.e_memo.getText()+"','"+this.e_rab.getText()+"','"+this.cb_app.getText()+"')");

					if (prog == "1") {
						sql.add("update prb_proyek set progress='"+prog+"',no_app2='"+this.e_nb.getText()+"', tgl_app2='"+this.dp_d3.getDateString()+"' where kode_proyek ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update prb_rabapp_m set progress='3',no_appaktif='"+this.e_nb.getText()+"' where no_rab='"+this.e_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					else {
						//dihapus/dimatikan ..loncat ke pengajuan						
						sql.add("delete from prb_rabapp_m where no_rab = '"+this.e_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						sql.add("delete from prb_rabapp_d where no_rab = '"+this.e_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from prb_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						sql.add("delete from prb_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");													
						
						sql.add("update prb_rab_m set progress='"+prog+"',no_app_proyek='"+this.e_nb.getText()+"' where no_rab ='"+this.e_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;				
					this.sg.clear(1);
					this.sg3.clear(1);
					this.sg1mp2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.doClick();		
					this.doLoad3();		
					this.pc2.show();   
				break;
			case "simpan" :	
			case "ubah" :	
				this.preView = "1";	
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				this.simpan();					
				break;				
			case "simpancek" : this.simpan();			
				break;							
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();				
				sql.add("delete from prb_proyek_app where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update prb_proyek set progress='A',no_app2='-' where no_app2='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");				
				sql.add("update prb_rabapp_m set no_appaktif = '-' where no_rab='"+this.e_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		this.doLoad3();
		this.doClick();		
	},			
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg1.clear(1); 
			this.sg3.clear(1); 	
			this.sg1mp2.clear(1);		
		}
		this.noAppLama = "-";
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"prb_proyek_app","no_app",this.app._lokasi+"-AK"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.c_status.setFocus();
		setTipeButton(tbSimpan);			
	},	
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select a.*,c.jenis_pph42, x.no_rab,	isnull(b.catatan,'-') as catatan,isnull(b.nik_user,'"+this.app._userLog+"') as nik_app "+
							 "from prb_proyek a "+
							 "inner join prb_proyek_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+
							 "inner join prb_rabapp_m x on a.kode_proyek=x.kode_proyek and a.kode_lokasi=x.kode_lokasi "+
							 "left  join prb_proyek_app b on a.kode_proyek=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.no_appseb='-' and b.modul='AKTIF_PR2' "+
							 "where a.versi = 'NTF21' and a.kode_proyek ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";	
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						
						this.noAppLama = line.no_app;		
						var strSQL = "select catatan from prb_proyek_app where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
						var data3 = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data3 == "object"){
							var line3 = data3.rs.rows[0];							
							if (line3 != undefined){		
								this.e_memo.setText(line3.catatan);
							}
						}					
						this.e_rab.setText(line.no_rab);
						this.doLoadCtt(this.e_rab.getText());

						this.e_memo.setText(line.catatan);		
						this.e_nama.setText(line.nama);
						this.e_dok.setText(line.no_pks);						
						this.cb_pp.setText(line.kode_pp);
						this.cb_app.setText(line.nik_app);						
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						this.dp_d4.setText(line.tgl_admin);						
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));
						this.e_pph4.setText(floatToNilai(line.pph42));
						this.e_persenor.setText(floatToNilai(line.p_or));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.cb_jenis.setText(line.kode_jenis);						
						this.e_jumlah.setText(floatToNilai(line.jumlah));

						this.e_bank.setText(line.bank);
						this.e_namarek.setText(line.nama_rek);
						this.e_norek.setText(line.no_rek);
						
						var data = this.dbLib.getDataProvider("select * from prb_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg.appendData([line.periode,floatToNilai(line.nilai_pend),floatToNilai(line.nilai_beban)]);
							}
						} 
						else this.sg.clear(1);	
						
						this.sg1mp2.clear();
						var data = this.dbLib.getDataProvider(
								"select b.kode_jenis,b.nama,a.no_gambar from prb_rab_dok a inner join prb_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_rab = '"+this.e_rab.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);

						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg1mp2.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];													 
								this.sg1mp2.appendData([line.kode_jenis, line.nama, line.no_gambar, "DownLoad"]);
							}
						} else this.sg1mp2.clear(1);

						var data2 = this.dbLib.getDataProvider("select * from prb_rabapp_d where no_rab = '"+this.e_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by jenis desc,nu",true);
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
							var line2;
							this.sgr.clear();
							for (var i in data2.rs.rows){
								line2 = data2.rs.rows[i];												
								this.sgr.appendData([line2.keterangan,floatToNilai(line2.jumlah),floatToNilai(line2.harga),floatToNilai(line2.total),line2.jenis]);
							}
						} 
						else this.sgr.clear(1);	

					}					
				}
			}
			
			if (sender == this.e_persenor && this.e_persenor.getText() != "") {				
				var nilaiOR = Math.round(nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_persenor.getText())/100);
				this.e_nilaior.setText(floatToNilai(nilaiOR));
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
								this.nama_report="server_report_saku3_tu_proyek_rptProyekApp";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_app='"+this.e_nb.getText()+"' ";
								this.filter2 = this.filter;
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
								this.allBtn = false									
								this.pc2.hide(); 
							}
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.cb_kode.getText()+")","");							
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
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;				
			this.sg.clear(1);
			this.sg3.clear(1);
			this.sg1mp2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.doClick();		
			this.doLoad3();					
			this.pc2.show(); 
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){		
		this.pc2.setActivePage(this.pc2.childPage[0]);																			
		var strSQL = "select a.kode_proyek,b.nama,a.no_pks,a.nama as keterangan,a.nilai "+
					 "from prb_proyek a "+					 					 
					 "inner join prb_rabapp_m c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+					 					 
					 "inner join prb_rab_cust b on c.no_rab=b.no_rab and c.kode_cust=b.kode_cust and c.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.versi = 'NTF21' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress='A' order by a.kode_proyek";	
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
			this.sg3.appendData([line.kode_proyek,line.nama,line.no_pks,line.keterangan,floatToNilai(line.nilai),"Detail"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 5) this.doDoubleClick3(this.sg3,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																						
				this.cb_kode.setText(this.sg3.cells(0,row));												
			}									
		} catch(e) {alert(e);}
	},
	doCari:function(sender){	
		this.stsSimpan=0;		
		setTipeButton(tbUbahHapus);			
		var filter = "";

		if (this.c_status2.getText() == "APPROVE") filter = " and a.progress = '1' and a.nilai > "+this.nilaiMax+" ";		
		var strSQL = "select a.kode_proyek,b.nama,a.no_pks,a.nama as keterangan,a.nilai "+
					 "from prb_proyek a "+
					 "inner join prb_rabapp_m c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+					 					 
					 "inner join prb_rab_cust b on c.no_rab=b.no_rab and c.kode_cust=b.kode_cust and c.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.versi = 'NTF21' and a.kode_lokasi='"+this.app._lokasi+"' "+filter+" and a.kode_cust='"+this.cb_cust2.getText()+"' order by a.kode_proyek desc";							 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);	
		this.pc2.setActivePage(this.pc2.childPage[0]);	
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal from prb_proyek_app "+
						"where no_rab='"+kode+"' and kode_lokasi='"+this.app._lokasi+"' and no_app<>'"+this.noAppLama+"' "+
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
								  "from prb_proyek_app "+
								  "where no_rab='"+kode+"' and tanggal='"+line.tanggal+"' and kode_lokasi='"+this.app._lokasi+"' and no_app<>'"+this.noAppLama+"' "+
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