window.app_saku3_transaksi_tu_proyek_fProyekUbah = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyek_fProyekUbah.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyek_fProyekUbah";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Amandemen Proyek", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["List Proyek","Data Proyek"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Proyek","Customer","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,300,200,200,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,readOnly:true, change:[this,"doChange"]}); 					
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"ID Proyek", readOnly:true, change:[this,"doChange"]});	
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2,visible:false});
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,20,996,370], childPage:["Data RAB","Data Proyek","Distribusi Akru","File Dokumen","Approval","Reversal"]});
		
		this.cb_pprab = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Unit RAB",tag:1,readOnly:true,change:[this,"doChange"] }); 							
		this.cb_rab = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"No RAB",tag:1,readOnly:true}); 				
		this.e_totrab = new saiLabelEdit(this.pc1.childPage[0],{bound:[770,13,200,20],caption:"Total RAB", tag:1, tipeText:ttNilai, text:"0", readOnly:true});								

		this.sgr = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,283],colCount:4,tag:1,
		            colTitle:["Kegiatan","Quantity","Harga Satuan","SubTotal"],
					colWidth:[[3,2,1,0],[100,100,100,500]],
					columnReadOnly:[true,[3],[]],
					colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],	
					pasteEnable:true,afterPaste:[this,"doAfterPaste"], 
					nilaiChange:[this,"doNilaiChangeR"],change:[this,"doChangeCellsR"],autoAppend:true,defaultRow:1});
		this.sgnr = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sgr});		
		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,430,20],caption:"No Kontrak", maxLength:50, tag:1});	
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,550,20],caption:"Deskripsi", maxLength:200, tag:1});			
		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Customer",tag:2,multiSelection:false});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,14,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,14,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Jenis",tag:2,readOnly:true}); 						
		this.e_jenissewa = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Kategori Proyek", readOnly:true, tag:1,change:[this,"doChange"]});			
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		//this.e_nilaippn = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0"});				
		//this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,14,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doPPN"]});				

		this.e_ppn = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0"});	
		this.bPPN = new portalui_button(this.pc1.childPage[1],{bound:[250,19,80,18],caption:"Hitung",click:[this,"doHitungPajak"]});							
		this.e_pph4 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,200,20],caption:"PPh 4 ayat 1", tag:1, tipeText:ttNilai, text:"0"});						
		
		
		this.e_persenor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Persen OR", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai OR", tag:1, tipeText:ttNilai, text:"0", readOnly:true});						
		
		this.e_jumlah = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Jml Jadwal", tag:1, tipeText:ttNilai, text:"0"});	
		this.bJadwal = new button(this.pc1.childPage[1],{bound:[250,14,80,18],caption:"Buat Jadwal",click:[this,"doJadwal"]});			
		
		this.cb_drkp = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"DRK Pendapatan",tag:2,multiSelection:false}); 						
		this.cb_drkb = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"DRK Beban",tag:2,multiSelection:false}); 						
		
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["Periode","Nilai Pend","Nilai Beban"],
					colWidth:[[2,1,0],[150,150,100]],
					columnReadOnly:[true,[1],[]],
					colFormat:[[1,2],[cfNilai,cfNilai]],	
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		
		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload"],
					    colWidth:[[3,2,1,0],[80,480,200,80]], 
						colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.e_noapp = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,11,200,20],caption:"No Approve", readOnly:true, tag:9});
		this.e_memo = new saiMemo(this.pc1.childPage[4],{bound:[20,10,450,80],caption:"Catatan Approve",tag:9,readOnly:true});
		

		this.l_tgl3 = new portalui_label(this.pc1.childPage[5],{bound:[20,13,100,18],caption:"Tgl Reverse", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[5],{bound:[120,13,98,18],selectDate:[this,"doSelectDate3"]}); 		
		this.e_periode = new saiLabelEdit(this.pc1.childPage[5],{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:1});	
		this.e_nopiu = new saiLabelEdit(this.pc1.childPage[5],{bound:[20,11,200,20],caption:"No Piutang",readOnly:true,tag:1});	
		this.e_nopyt = new saiLabelEdit(this.pc1.childPage[5],{bound:[20,12,200,20],caption:"No PYT Dist",readOnly:true,tag:1});	
		this.e_norekon = new saiLabelEdit(this.pc1.childPage[5],{bound:[20,13,200,20],caption:"No Rekon AR",readOnly:true,tag:1});	
		this.cb_titip = new portalui_saiCBBL(this.pc1.childPage[5],{bound:[20,15,220,20],caption:"Akun Titipan",tag:2,multiSelection:false}); 						

		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[4].rearrangeChild(10, 23);
		this.pc1.childPage[5].rearrangeChild(10, 23);	
		
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
			this.doSelectDate3(this.dp_d3,this.dp_d3.year,this.dp_d3.month,this.dp_d3.day);
			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true); //kode_pp='"+this.app._kodePP+"' and
			this.cb_pprab.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_cust.setSQL("select kode_cust,nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_jenis.setSQL("select kode_jenis,nama from tu_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);
			
			this.cb_titip.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);

			this.e_memo.setReadOnly(true);	
			
			this.cb_pp.setText(this.app._kodePP);	


		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyek_fProyekUbah.extend(window.childForm);
window.app_saku3_transaksi_tu_proyek_fProyekUbah.implement({	
	doHitungPajak: function(sender){
		var sepuluhPersen = 0.1 * nilaiToFloat(this.e_nilai.getText());
		this.e_ppn.setText(floatToNilai(sepuluhPersen));
		this.e_pph4.setText(floatToNilai(sepuluhPersen));
	},
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgr.validasi();
		} catch(e) {alert(e);}
	},
	doChangeCellsR: function(sender, col, row){
		if ((col == 1 || col == 2) && this.sgr.cells(1,row) != "" && this.sgr.cells(2,row) != "") this.sgr.validasi();				
	},
	doNilaiChangeR: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sgr.getRowCount();i++){
				if (this.sgr.cells(1,i) != "" && this.sgr.cells(2,i) != ""){
					var subttl = Math.round(nilaiToFloat(this.sgr.cells(1,i)) * nilaiToFloat(this.sgr.cells(2,i)) * 100) / 100; 
					this.sgr.cells(3,i,subttl);
					tot += nilaiToFloat(this.sgr.cells(3,i));					
				}
			}						
			this.e_totrab.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doLoadRAB: function() {
		try {
			if (this.cb_rab.getText() != "") {
				var strSQL = "select * from tu_rabapp_m where no_rab='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){									
						this.e_nama.setText(line.keterangan);
						this.e_dok.setText(line.no_dok);
						this.cb_cust.setText(line.kode_cust);
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_persenor.setText(floatToNilai(line.p_or));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.cb_jenis.setText(line.kode_jenis);
						
						var data = this.dbLib.getDataProvider("select * from tu_rabapp_d where no_rab = '"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgr.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sgr.appendData([line.keterangan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total)]);
							}
						} 
						else this.sgr.clear(1);						

					}					
				}

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
					}
					
					sql.add("insert into tu_proyek(kode_proyek,nama,flag_aktif,kode_lokasi,no_pks,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,p_or,kode_jenis,nilai_ppn,jumlah, kode_drkp,kode_drkb, nik_app,progress,no_app, pph4) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_nilaior.getText())+","+nilaiToFloat(this.e_persenor.getText())+",'"+this.cb_jenis.getText()+"',"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_jumlah.getText())+",'"+this.cb_drkp.getText()+"','"+this.cb_drkb.getText()+"','-','1','"+this.e_noapp.getText()+"',"+nilaiToFloat(this.e_pph4.getText())+")");
				
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){								
							sql.add("insert into tu_proyek_d(kode_proyek,kode_lokasi,nu,periode,nilai_pend,nilai_beban) values "+
									"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(1,i))+","+nilaiToFloat(this.sg.cells(2,i))+")");
						}
					}
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into tu_proyek_dok(kode_proyek,no_gambar,nu,kode_jenis,kode_lokasi) values ('"+this.cb_kode.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
						}	
					}	

					//====================================================  REVERSE ====================================================
					//--rev akru piutang pd pyt
					sql.add("insert into tu_prpiutang_m (no_bukti,no_dokumen,tanggal,keterangan,akun_piutang,akun_pyt,nik_buat,nik_app,kode_lokasi,kode_pp,modul,nilai,posted,periode,nik_user,tgl_input, kode_pp2,dc)  "+
					        "select top 1 '"+this.e_nopiu.getText()+"',no_dokumen,'"+this.dp_d3.getDateString()+"','Reverse Akru Piutang Proyek : "+this.cb_kode.getText()+"',akun_pyt,akun_piutang,'"+this.app._userLog+"','"+this.app._userLog+"',kode_lokasi,kode_pp,modul,0,'F','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(), kode_pp2,'C' "+
							"from tu_prpiutang_m where no_dokumen = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
					sql.add("insert into tu_prpiutang_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)  "+
							"select '"+this.e_nopiu.getText()+"',no_dokumen,'"+this.dp_d3.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',getdate() "+
							"from tu_prpiutang_j "+
							"where no_dokumen='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					//--rev akru pyt pd pdpt
					sql.add("insert into tu_prpyt_m (no_bukti,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_drk,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,modul)  "+
							"select top 1 '"+this.e_nopyt.getText()+"','"+this.cb_kode.getText()+"','Reverse Akru PYT Proyek : "+this.cb_kode.getText()+"','"+this.dp_d3.getDateString()+"',0,'"+this.e_periode.getText()+"',kode_pp,kode_drk,kode_lokasi,'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'F','IDR',1,modul "+
							"from tu_prpyt_d "+
							"where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into tu_prpyt_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nopyt.getText()+"','"+this.cb_kode.getText()+"','"+this.dp_d3.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',getdate() "+
							"from tu_prpyt_j "+
							"where no_dokumen='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				
					//--rev pelunasan piutang
					sql.add("insert into ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user) "+
						    "select top 1 '"+this.e_norekon.getText()+"',a.kode_lokasi,'"+this.e_periode.getText()+"','"+this.dp_d3.getDateString()+"',a.no_dokumen,'Reverse Rekon Proyek : "+this.cb_kode.getText()+"',a.kode_pp,a.modul,a.jenis,a.kode_curr,a.kurs,0,'"+this.app._userLog+"','"+this.app._userLog+"','F',a.no_del,a.no_link,a.ref1,getdate(),'"+this.app._userLog+"' "+
							"from ju_m a "+
							"     inner join ju_j b on a.no_ju=b.no_ju and a.kode_lokasi=b.kode_lokasi and b.jenis = 'PIU' and b.modul='PIUPRO' "+
							"     inner join tu_prbill_m c on c.no_bill=b.no_dokumen and a.kode_lokasi=b.kode_lokasi and b.jenis = 'PIU' and b.modul='PIUPRO' "+
							"where c.kode_proyek='"+this.cb_kode.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"'");					


					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) "+
						    "select '"+this.e_norekon.getText()+"',b.no_dokumen,'"+this.dp_d3.getDateString()+"',b.no_urut,b.kode_akun,b.keterangan,case b.dc when 'D' then 'C' else 'D' end,b.nilai,b.kode_pp,b.kode_drk,b.kode_cust,b.kode_proyek,b.kode_task,b.kode_vendor,b.kode_lokarea,b.nik,b.kode_lokasi,b.modul,b.jenis,'"+this.e_periode.getText()+"',b.kode_curr,b.kurs,'"+this.app._userLog+"',getdate(),b.no_ref,b.ket_ref "+
							"from ju_j b "+
							"     inner join tu_prbill_m c on c.no_bill=b.no_dokumen and c.kode_lokasi=b.kode_lokasi and b.jenis = 'PIU' and b.modul='PIUPRO' "+
							"where c.kode_proyek='"+this.cb_kode.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) "+
						    "select '"+this.e_norekon.getText()+"',b.no_dokumen,'"+this.dp_d3.getDateString()+"',999,'"+this.cb_titip.getText()+"','Reverse Rekon Proyek : "+this.cb_kode.getText()+"','C',sum(b.nilai),b.kode_pp,'-','-','-','-','-','-','-','"+this.app._lokasi+"','PIUPRO','TITIP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-','-' "+
							"from ju_j b "+
							"     inner join tu_prbill_m c on c.no_bill=b.no_dokumen and c.kode_lokasi=b.kode_lokasi and b.jenis = 'PIU' and b.modul='PIUPRO' and b.dc='D' "+
							"where c.kode_proyek='"+this.cb_kode.getText()+"' and c.kode_lokasi='"+this.app._lokasi+"' "+
							"group by b.no_dokumen,b.kode_pp");


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
			//case "simpan" :	
			case "ubah" :		
					/*
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
					
						var totbaru = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_nilaippn.getText());
						if (totbaru < this.nilaipiu) {
							system.alert(this,"Nilai Proyek tidak valid.","Nilai Proyek kurang dari piutang yang telah di akru (PYT).");
							return false;
						}
					}	
					*/
						
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
					if (nilaiToFloat(this.e_totrab.getText()) != nilaiToFloat(this.e_nilaior.getText())) {
						system.alert(this,"Nilai Proyek tidak valid.","Nilai OR dan Total Beban tidak sama.");
						return false;
					}
					else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
							
			/*
			case "hapus" :					
				var totbaru = nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_nilaippn.getText());
				if (totbaru < this.nilaipiu) {
					system.alert(this,"Nilai Proyek tidak valid.","Nilai Proyek kurang dari piutang yang telah di akru (PYT).");
					return false;
				}
				else this.hapus();
				break;	
			*/			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = y+""+m;	
		
		this.cb_drkp.setSQL("select a.kode_drk, a.nama from drk a inner join tu_proyek_drk b on a.kode_drk=b.kode_drk and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi and b.status='PDPT' where a.tahun='"+this.periode.substr(0,4)+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK Pendapatan",true);		
		this.cb_drkb.setSQL("select a.kode_drk, a.nama from drk a inner join tu_proyek_drk b on a.kode_drk=b.kode_drk and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi and b.status='BEBAN' where a.tahun='"+this.periode.substr(0,4)+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK Beban",true);																													 				
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
	doSelectDate3: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		

		this.e_nopiu.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_prpiutang_m","no_bukti",this.app._lokasi+"-PIU"+this.e_periode.getText().substr(2,4)+".","0000"));	
		this.e_nopyt.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"tu_prpyt_m","no_bukti",this.app._lokasi+"-PYT"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_norekon.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.app._lokasi+"-RPP"+this.e_periode.getText().substr(2,4)+".","0000"));						
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
			if (sender == this.cb_pprab && this.cb_pprab.getText() != "" && this.stsSimpan==1) {
				this.cb_rab.setSQL("select no_rab,keterangan from tu_rabapp_m a where kode_pp='"+this.cb_pprab.getText()+"' and progress='1' and kode_lokasi='"+this.app._lokasi+"'",["no_rab","keterangan"],false,["No RAB","Deskripsi"],"and","Data RAB",true);
			}
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){

				var strSQL = "select a.*,c.jenis_sewa,isnull(b.catatan,'-') as catatan "+
							 "from tu_proyek a "+
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
						
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						
						this.e_nilai.setText(floatToNilai(line.nilai));
						//this.e_nilaippn.setText(floatToNilai(line.nilai_ppn));
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));
						this.e_pph4.setText(floatToNilai(line.pph4));
						

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

						var strSQL = "select no_rab,kode_pp from tu_rabapp_m where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){									
								this.cb_pprab.setSQL("select kode_pp,nama from pp where kode_pp='"+line.kode_pp+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
								this.cb_rab.setSQL("select no_rab,keterangan from tu_rabapp_m  where no_rab='"+line.no_rab+"' and kode_lokasi='"+this.app._lokasi+"'",["no_rab","keterangan"],false,["No RAB","Deskripsi"],"and","Data RAB",true);									
								
								this.cb_pprab.setText(line.kode_pp);
								this.cb_rab.setText(line.no_rab);

								var data = this.dbLib.getDataProvider("select * from tu_rabapp_d where no_rab = '"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
								if (typeof data == "object" && data.rs.rows[0] != undefined){
									var line;
									this.sgr.clear();
									for (var i in data.rs.rows){
										line = data.rs.rows[i];												
										this.sgr.appendData([line.keterangan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total)]);
									}
								} 
								else this.sgr.clear(1);						
							}					
						}
						
						this.stsSimpan = 0;	
						setTipeButton(tbUbah);
						
					}					
				}
			}
			
			if (sender == this.e_persenor && this.e_persenor.getText() != "") {				
				var nilaiOR = Math.round(nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_persenor.getText())/100);
				this.e_nilaior.setText(floatToNilai(nilaiOR));
			}
			
			if (sender == this.e_jenissewa && this.e_jenissewa.getText()!="") {
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
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.progress not in ('0','R') ";	//a.kode_pp='"+this.app._kodePP+"' and 
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
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																						
				this.cb_kode.setText(this.sg3.cells(0,row));												
			}									
		} catch(e) {alert(e);}
	}
});