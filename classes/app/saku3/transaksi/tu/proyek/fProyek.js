window.app_saku3_transaksi_tu_proyek_fProyek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fProyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fProyek";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Proyek", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.l_tgl3 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,460], childPage:["Data Proyek","List Proyek"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Proyek","Customer","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,300,200,200,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false, change:[this,"doChange"]}); 					
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,10,200,20],caption:"ID Proyek", readOnly:true, change:[this,"doChange"]});	
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,10,200,20],caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2,visible:false});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,996,381], childPage:["Data RAB","Data Proyek","Distribusi Akru","File Dokumen","Approval"]});		
		this.cb_pprab = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Unit RAB",tag:1,multiSelection:false,change:[this,"doChange"] }); 							
		this.cb_rab = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"No RAB",tag:1,multiSelection:false}); 				
		this.bRAB = new button(this.pc1.childPage[0],{bound:[880,13,80,18],caption:"Load Data",click:[this,"doLoadRAB"]});			

		this.sgr = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,295],colCount:5,tag:1,
		            colTitle:["Kegiatan","Quantity","Harga Satuan","SubTotal","Jenis"],
					colWidth:[[4,3,2,1,0],[80,100,100,100,500]],
					readOnly:true,
					colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],	
					autoAppend:false,defaultRow:1});
		this.sgnr = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgr});		
		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,430,20],caption:"No Kontrak", maxLength:50, tag:1});	
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,430,20],caption:"Deskripsi", maxLength:200, tag:1});			
		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Customer",tag:2,multiSelection:false});
		//this.cb_app = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Png. Jawab",tag:2,multiSelection:false}); 						
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,13,98,18],selectDate:[this,"doSelectDate1"]}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,14,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,14,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Jenis",tag:2,readOnly:true}); 						
		this.e_jenissewa = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Kategori Proyek", readOnly:true, tag:1,change:[this,"doChange"]});			
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		
		//this.e_nilaippn = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0"});				
		//this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,14,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doPPN"]});				
		
		this.e_persenor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Persen OR", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai OR", tag:1, tipeText:ttNilai, text:"0", readOnly:true});								
		this.e_jumlah = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Jml Jadwal", tag:1, tipeText:ttNilai, text:"0"});	
		this.bJadwal = new button(this.pc1.childPage[1],{bound:[250,14,80,18],caption:"Buat Jadwal",click:[this,"doJadwal"]});			
		
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0", visible:false});	
		this.bPPN = new portalui_button(this.pc1.childPage[1],{bound:[250,19,80,18],caption:"Hitung",click:[this,"doHitungPajak"],visible:false});							
		this.e_pph4 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,200,20],caption:"PPh 4 ayat 1", tag:1, tipeText:ttNilai, text:"0",visible:false});						
		
		this.cb_drkp = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"DRK Pendapatan",tag:2,multiSelection:false}); 						
		this.cb_drkb = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"DRK Beban",tag:2,multiSelection:false}); 						
		
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["Periode","Nilai Pend","Nilai Beban"],
					colWidth:[[2,1,0],[150,150,100]],
					columnReadOnly:[true,[1],[]],
					colFormat:[[1,2],[cfNilai,cfNilai]],	
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		
		/*
		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload"],
					    colWidth:[[3,2,1,0],[80,480,200,80]], 
						colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});
		*/

		this.sg1mp2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-4,this.pc1.height-35],colCount:4,readOnly:true,tag:9,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]],
					rowCount:1,colFormat:[[3],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3, 
									pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            


		this.e_noapp = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,11,200,20],caption:"No Approve", readOnly:true, tag:9});
		this.e_memo = new saiMemo(this.pc1.childPage[4],{bound:[20,10,450,80],caption:"Catatan Approve",tag:9,readOnly:true});
		
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[4].rearrangeChild(10, 23);	
		
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
			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true); //kode_pp='"+this.app._kodePP+"' and
			this.cb_pprab.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_cust.setSQL("select kode_cust,nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_jenis.setSQL("select kode_jenis,nama from tu_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);
			//this.cb_app.setSQL("select a.nik,a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
			//				   "where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);
			
			this.e_memo.setReadOnly(true);	
			
			this.cb_pp.setText(this.app._kodePP);		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fProyek.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fProyek.implement({	
	doHitungPajak: function(sender){
		var sepuluhPersen = 0.1 * nilaiToFloat(this.e_nilai.getText());
		this.e_ppn.setText(floatToNilai(sepuluhPersen));
		this.e_pph4.setText(floatToNilai(sepuluhPersen));
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},
	doLoadRAB: function() {
		try {
			if (this.cb_rab.getText() != "") {
				var strSQL = "select a.*,b.jenis_sewa from tu_rabapp_m a inner join tu_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_rab='"+this.cb_rab.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){									
						this.e_nama.setText(line.keterangan);
						this.e_dok.setText(line.no_dok);
						this.cb_cust.setText(line.kode_cust);
						//this.cb_app.setText(line.nik_app);
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);

						this.periodeRAB = line.periode;
						this.cb_drkp.setSQL("select a.kode_drk, a.nama from drk a inner join tu_proyek_drk b on a.kode_drk=b.kode_drk and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi and b.status='PDPT' where a.tahun='"+this.periodeRAB.substr(0,4)+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK Pendapatan",true);		
						this.cb_drkb.setSQL("select a.kode_drk, a.nama from drk a inner join tu_proyek_drk b on a.kode_drk=b.kode_drk and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi and b.status='BEBAN' where a.tahun='"+this.periodeRAB.substr(0,4)+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK Beban",true);																													 				
						
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_persenor.setText(floatToNilai(line.p_or));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.cb_jenis.setText(line.kode_jenis);
						this.e_jenissewa.setText(line.jenis_sewa);

						this.e_ppn.setText(floatToNilai(line.ppn));
						this.e_pph4.setText(floatToNilai(line.pph4));
						
						var data = this.dbLib.getDataProvider("select * from tu_rabapp_d where no_rab = '"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by jenis desc,nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgr.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sgr.appendData([line.keterangan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total),line.jenis]);
							}
						} 
						else this.sgr.clear(1);						

					}					
				}


				this.sg1mp2.clear();
				var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from tu_rab_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_rab = '"+this.cb_rab.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1mp2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													 
						this.sg1mp2.appendData([line.kode_jenis, line.nama, line.no_gambar, "DownLoad"]);
					}
				} else this.sg1mp2.clear(1);

			}
		} catch(e) {
			alert(e);
		}
	},
	doJadwal: function(sender){
		try{			
			if (this.periode != "" && this.e_jumlah.getText() != "") {
				this.sg.clear(1);
				
				var tot = totb = 0;
				var jum = nilaiToFloat(this.e_jumlah.getText());
				var nilai = Math.round(nilaiToFloat(this.e_nilai.getText()) / nilaiToFloat(this.e_jumlah.getText()));
				var nilaior = Math.round(nilaiToFloat(this.e_nilaior.getText()) / nilaiToFloat(this.e_jumlah.getText()));
				
				var period = this.periode;				
				for (var i=0;i < jum;i++){
					this.sg.appendData([period,floatToNilai(nilai),floatToNilai(nilaior)]);
					period = getNextPeriode(period);	
					tot += nilai;	
					totb += nilaior;	
				}		
					
				nilai = nilaiToFloat(this.e_nilai.getText()) - tot;
				nilai = nilai + nilaiToFloat(this.sg.cells(1,i-1));
				this.sg.cells(1,i-1,nilai);				
				
				nilaior = nilaiToFloat(this.e_nilaior.getText()) - totb;
				nilaior = nilaior + nilaiToFloat(this.sg.cells(2,i-1));
				this.sg.cells(2,i-1,nilaior);				
				
																			
				this.pc1.setActivePage(this.pc1.childPage[2]);			
			} 
			else {
				system.alert(this,"Periode dan jumlah harus valid.","Filter dari tanggal mulai.");
				this.sg1.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from tu_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						sql.add("delete from tu_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");													
						sql.add("delete from tu_proyek_dok where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update tu_rabapp_m set progress='1',kode_proyek='-' where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					}
					
					sql.add("update tu_rabapp_m set progress='2',kode_proyek='"+this.cb_kode.getText()+"' where no_rab='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");

					sql.add("insert into tu_proyek(kode_proyek,nama,flag_aktif,kode_lokasi,no_pks,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,p_or,kode_jenis,nilai_ppn,jumlah, kode_drkp,kode_drkb, nik_app,progress,no_app, tgl_app, pph4, tanggal) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_nilaior.getText())+","+nilaiToFloat(this.e_persenor.getText())+",'"+this.cb_jenis.getText()+"',"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_jumlah.getText())+",'"+this.cb_drkp.getText()+"','"+this.cb_drkb.getText()+"','-','0','-','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_pph4.getText())+",'"+this.dp_d3.getDateString()+"')");
				
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){								
							sql.add("insert into tu_proyek_d(kode_proyek,kode_lokasi,nu,periode,nilai_pend,nilai_beban) values "+
									"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(1,i))+","+nilaiToFloat(this.sg.cells(2,i))+")");
						}
					}
					/*
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into tu_proyek_dok(kode_proyek,no_gambar,nu,kode_jenis,kode_lokasi) values ('"+this.cb_kode.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
						}	
					}
					*/	
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from tu_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from tu_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");													
					sql.add("delete from tu_proyek_dok where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update tu_rabapp_m set progress='1',kode_proyek='-' where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					/*
					this.deletedFiles = "";	
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							if (this.deletedFiles != "") this.deletedFiles += ";";
							this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(2,i);
						}
					}
					*/
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.stsSimpan = 1;				
					this.sg.clear(1);
					this.sg3.clear(1);
					this.sgr.clear(1);					
					this.pc1.setActivePage(this.pc1.childPage[0]);						
				break;
			case "simpan" :	
			case "ubah" :		
					if (this.stsSimpan == 0) {
						var strSQL = "select sum(case dc when 'D' then nilai else -nilai end) as nilai_piu "+
									 "from tu_prpiutang_j "+
									 "where jenis = 'PIU' and no_dokumen='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									 "group by no_dokumen,kode_lokasi ";										 			 																											 
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){														
								this.nilaipiu = parseFloat(line.nilai_piu);									
							}
						}
					
						var totbaru = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText());
						if (totbaru < this.nilaipiu) {
							system.alert(this,"Nilai Proyek tidak valid.","Nilai Proyek kurang dari piutang yang telah di akru (PYT).");
							return false;
						}
					}	
						
					var tot = totb = 0;
					for (var i = 0; i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(1,i) != ""){										
							tot += nilaiToFloat(this.sg.cells(1,i));
							totb += nilaiToFloat(this.sg.cells(2,i));					
						}
					}	
					if (tot != nilaiToFloat(this.e_nilai.getText())) {
						system.alert(this,"Nilai Proyek tidak valid.","Nilai Proyek dan Total Pendapatan tidak sama.");
						return false;
					}
					if (totb != nilaiToFloat(this.e_nilaior.getText())) {
						system.alert(this,"Nilai Proyek tidak valid.","Nilai OR dan Total Beban tidak sama.");
						return false;
					}
					else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
							
			case "hapus" :					
				var totbaru = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText());
				if (totbaru < this.nilaipiu) {
					system.alert(this,"Nilai Proyek tidak valid.","Nilai Proyek kurang dari piutang yang telah di akru (PYT).");
					return false;
				}
				else this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = y+""+m;	
		if (this.stsSimpan==1) this.doClick();		
	},
	doSelectDate1: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = y+""+m;					
	},
	doSelectDate2: function(sender, y,m,d){		
		var strSQL = "select datediff(month,'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"') + 1  as jml ";																																	 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){														
				this.e_jumlah.setText(floatToNilai(line.jml));								
			}
		}																												 
					
	},
	doClick:function(sender){		
		try {
			if (this.stsSimpan==0) {
				this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true); //kode_pp='"+this.app._kodePP+"' and
				this.bRAB.show();		
				this.cb_rab.setText("");	
				this.cb_pprab.setText("");	
				this.sgr.clear(1);		
				this.sg.clear(1);	
			}
			setTipeButton(tbSimpan);
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_proyek","kode_proyek",this.cb_pp.getText()+"-"+this.periode.substr(2,4)+".","0000"));						
			this.e_dok.setFocus();	
			this.stsSimpan = 1;		
		}
		catch(e) {
			alert(e);
		}
	},
	/*
	doPPN:function(sender){	
		if (this.e_nilai.getText() != "") {				
			var nilaiPPN = Math.round(nilaiToFloat(this.e_nilai.getText()) * 10/100);
			this.e_nilaippn.setText(floatToNilai(nilaiPPN));				
		}			
	},
	*/				
	doChange: function(sender){
		try{
			if (sender == this.cb_pp && this.cb_pp.getText() != "" && this.stsSimpan==1) {
				this.doClick();
			}			
			if (sender == this.cb_pprab && this.cb_pprab.getText() != "" && this.stsSimpan==1) {
				this.cb_rab.setSQL("select no_rab,keterangan from tu_rabapp_m a where kode_pp='"+this.cb_pprab.getText()+"' and progress='1' and kode_lokasi='"+this.app._lokasi+"'",["no_rab","keterangan"],false,["No RAB","Deskripsi"],"and","Data RAB",true);
			}
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){	
				this.stsSimpan = 0;					
				var strSQL = "select a.*,isnull(b.catatan,'-') as catatan,c.jenis_sewa from tu_proyek a "+
							 "inner join tu_proyek_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+
							 "left join tu_proyek_app b on a.kode_proyek=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.no_appseb='-'  "+
							 "where a.kode_proyek ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.e_noapp.setText(line.no_app);	
						this.e_memo.setText(line.catatan);

						this.e_nama.setText(line.nama);
						this.e_dok.setText(line.no_pks);						
						this.cb_pp.setText(line.kode_pp);
						this.cb_cust.setText(line.kode_cust);
						//this.cb_app.setText(line.nik_app);
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						this.dp_d3.setText(line.tanggal);
						
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));
						

						this.e_persenor.setText(floatToNilai(line.p_or));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.cb_jenis.setText(line.kode_jenis);
						this.e_jenissewa.setText(line.jenis_sewa);
						this.e_jumlah.setText(floatToNilai(line.jumlah));
						
						this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

						this.cb_drkp.setText(line.kode_drkp);
						this.cb_drkb.setText(line.kode_drkb);	
						
						if (line.flag_aktif == "0") this.c_status.setText("0. NONAKTIF");
						else this.c_status.setText("1. AKTIF");
						
						var data = this.dbLib.getDataProvider("select * from tu_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg.appendData([line.periode,floatToNilai(line.nilai_pend),floatToNilai(line.nilai_beban)]);
							}
						} 
						else this.sg.clear(1);	
						
						/*
						this.sgUpld.clear();
						this.deleteFiles = [];
						this.listFiles = new arrayMap();			
						var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from tu_proyek_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
								"where a.kode_proyek = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgUpld.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.listFiles.set(line.no_gambar,line.no_gambar); 
								this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar}]);
							}
						} else this.sgUpld.clear(1);
						*/


						var strSQL = "select no_rab,kode_pp from tu_rabapp_m where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){									
								this.cb_pprab.setSQL("select kode_pp,nama from pp where kode_pp='"+line.kode_pp+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
								this.cb_rab.setSQL("select no_rab,keterangan from tu_rabapp_m  where no_rab='"+line.no_rab+"' and kode_lokasi='"+this.app._lokasi+"'",["no_rab","keterangan"],false,["No RAB","Deskripsi"],"and","Data RAB",true);									
								
								this.cb_pprab.setText(line.kode_pp);
								this.cb_rab.setText(line.no_rab);


								var data = this.dbLib.getDataProvider("select * from tu_rabapp_d where no_rab = '"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by jenis desc,nu",true);
								if (typeof data == "object" && data.rs.rows[0] != undefined){
									var line;
									this.sgr.clear();
									for (var i in data.rs.rows){
										line = data.rs.rows[i];												
										this.sgr.appendData([line.keterangan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total),line.jenis]);
									}
								} 
								else this.sgr.clear(1);						
							}					
						}

						this.bRAB.hide();																	
						setTipeButton(tbUbahHapus);
					}					
				}
			}
			
			if (sender == this.e_persenor && this.e_persenor.getText() != "") {				
				var nilaiOR = Math.round(nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_persenor.getText())/100);
				this.e_nilaior.setText(floatToNilai(nilaiOR));
			}
			
			if (sender==this.e_jenissewa && this.e_jenissewa.getText()!="") {
				if (this.e_jenissewa.getText() == "SEWA") {
					this.e_ppn.setReadOnly(false);
					this.e_pph4.setReadOnly(false);
					this.e_ppn.setTag("1");
					this.e_pph4.setTag("1");
					this.bPPN.show();
					this.e_ppn.show();
					this.e_pph4.show();
				}
				else {
					this.e_ppn.setReadOnly(true);
					this.e_pph4.setReadOnly(true);
					this.e_ppn.setTag("9");
					this.e_pph4.setTag("9");
					this.bPPN.hide();
					this.e_ppn.hide();
					this.e_pph4.hide();
				}
			}
						
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	/*
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
												  "select kode_jenis,nama   from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_jenis) from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}					
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
                this.sgUpld.cells(2,row, data.tmpfile);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    },
	*/
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();

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
	doLoad3:function(sender){																				
		var strSQL = "select a.kode_proyek,b.nama,a.no_pks,a.nama as keterangan,a.nilai "+
		             "from tu_proyek a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where  a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R') ";		
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
			this.sg3.appendData([line.kode_proyek,line.nama,line.no_pks,line.keterangan,floatToNilai(line.nilai)]); 
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
				this.cb_kode.setText(this.sg3.cells(0,row));												
			}									
		} catch(e) {alert(e);}
	}
});