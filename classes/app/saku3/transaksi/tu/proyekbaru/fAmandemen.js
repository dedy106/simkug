window.app_saku3_transaksi_tu_proyekbaru_fAmandemen = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_proyekbaru_fAmandemen.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_proyekbaru_fAmandemen";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Amandemen Proyek", 0);			

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Proyek","List Proyek"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["No Proyek","Customer","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,300,200,200,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.l_tgl3 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate3"]}); 		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false, change:[this,"doChange"]}); 					
		this.cb_kode = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"ID Proyek", multiSelection:false, change:[this,"doChange"]});	
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,996,348], childPage:["Referensi RAB","Data Proyek","Distribusi Akru","File Dokumen","Catatan"]});				
		this.sgr = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,338],colCount:5,tag:1,
		            colTitle:["Kegiatan","Quantity","Harga Satuan","SubTotal","Jenis"],
					colWidth:[[4,3,2,1,0],[80,100,100,100,500]],
					readOnly:true,
					colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],	
					autoAppend:false,defaultRow:1});
		this.sgnr = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgr});		
		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,430,20],caption:"No Kontrak", maxLength:50, tag:1});	
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,430,20],caption:"Deskripsi", maxLength:200, tag:1});			
		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Customer",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,14,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,14,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Jenis",tag:2,readOnly:true}); 						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});
		this.e_nilaippn = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0"});				
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,14,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doPPN"]});						
		this.e_persenor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Persen OR", tag:1, tipeText:ttNilai, text:"0",readOnly:true}); //,change:[this,"doChange"]								
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai OR", tag:1, tipeText:ttNilai, text:"0", readOnly:true});								
		this.e_jumlah = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Jml Jadwal", tag:1, tipeText:ttNilai, text:"0"});	
		this.bJadwal = new button(this.pc1.childPage[1],{bound:[250,14,80,18],caption:"Buat Jadwal",click:[this,"doJadwal"]});					
		
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
		            colTitle:["Periode","Nilai Pend","Nilai Beban","Nilai BMHD"],
					colWidth:[[3,2,1,0],[100,150,150,100]],
					columnReadOnly:[true,[0,3],[1,2]],
					colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],	
					nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg1mp2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-4,this.pc1.height-35],colCount:4,readOnly:true,tag:9,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]],
					rowCount:1,colFormat:[[3],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3, 
					pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            

		this.e_memo = new saiMemo(this.pc1.childPage[4],{bound:[20,10,450,80],caption:"Cttn Amandemen",tag:1});
			
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
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
			
			this.doSelectDate3(this.dp_d3,this.dp_d3.year,this.dp_d3.month,this.dp_d3.day);
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true); //kode_pp='"+this.app._kodePP+"' and
			this.cb_cust.setSQL("select kode_cust,nama from prb_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_jenis.setSQL("select kode_jenis,nama from prb_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);			
			this.cb_kode.setSQL("select kode_proyek,nama from prb_proyek where versi='PRO20' and modul='PROYEK' and kode_lokasi='"+this.app._lokasi+"' and progress in ('1','2') and flag_aktif='1'",["kode_proyek","nama"],false,["Kode","Nama"],"and","Data Proyek",true);
			
			this.cb_pp.setText(this.app._kodePP);		

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_proyekbaru_fAmandemen.extend(window.childForm);
window.app_saku3_transaksi_tu_proyekbaru_fAmandemen.implement({		
	doChangeCells: function(sender, col, row){						
		if (col == 1 || col == 2 ) {				
			this.sg.validasi();
		}
	},	
	doNilaiChange: function(){
		try{			
			var pdpt = beban = 0;						
			for (var i = 0; i < this.sg.getRowCount();i++) {
				if (this.sg.rowValid(i) && this.sg.cells(1,i) != "" && this.sg.cells(2,i) != "") {					
					pdpt += nilaiToFloat(this.sg.cells(1,i));
					beban += nilaiToFloat(this.sg.cells(2,i));					
				}
			}			
			this.e_nilai.setText(floatToNilai(pdpt));			
			this.e_nilaior.setText(floatToNilai(beban));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doHitungBMHD: function() {							
		this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
		for (var i=0;i < this.sg.getRowCount();i++) {
			if (this.sg.rowValid(i)){		
				//jika periode schedul sudah terlewati closing, BMHD otomatis		
				if (nilaiToFloat(this.sg.cells(0,i)) < nilaiToFloat(this.app._periode)) {
					var strSQL = "select sum(case a.dc when 'D' then a.nilai else -a.nilai end) as beban_periode " +
						"		from prb_prbeban_d a " +
						"		left join ( " +
						"				  select a.no_aju,a.no_kas,a.kode_lokasi " +
						"			      from it_aju_m a inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi " +
						"				  where b.kode_lokasi='" + this.app._lokasi + "' " +
						"		) b on a.no_bukti = b.no_aju and a.kode_lokasi=b.kode_lokasi " +

						"		where a.modul = 'AJUBEBAN' and a.kode_lokasi='" + this.app._lokasi + "' "+
						" 			  and a.periode = '" + this.sg.cells(0,i) + "'  " +
						"			  and (  isnull(b.no_kas,'-') <> '-' or (a.no_ref1<>'-') ) " +
						
						"where a.kode_proyek = '"+this.cb_kode.getText()+"' and a.periode = '" + this.sg.cells(0,i) + "' and a.kode_lokasi='" + this.app._lokasi + "' ";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){									
							this.sg.cells(3,i,parseFloat(line.beban_periode));
						}
					}	
				}	
			}
		}

	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
		}catch(e){
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
					this.sg.appendData([period,floatToNilai(nilai),floatToNilai(nilaior),"0"]);
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
															
				
				this.doHitungBMHD();

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
					
					//--------------------------------------------  proyek  -------------------------------------------
					//historikan perubahan
					sql.add("insert into prb_proyek_his (kode_proyek,kode_lokasi,nik_user,tgl_input,  catatan,tgl_mulai,tgl_selesai,nilai,nilai_or,nilai_ppn,p_or,jumlah,no_pks,versi) "+
							"select kode_proyek,kode_lokasi,'"+this.app._userLog+"',getdate(),  '"+this.e_memo.getText()+"',tgl_mulai,tgl_selesai,nilai,nilai_or,nilai_ppn,p_or,jumlah,no_pks,versi "+
							"from prb_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	

					//data perubahan proyek
					sql.add("delete from prb_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("update prb_proyek "+
							"set nama='"+this.e_nama.getText()+"',no_pks='"+this.e_dok.getText()+"',tgl_mulai='"+this.dp_d1.getDateString()+"',tgl_selesai='"+this.dp_d2.getDateString()+
							"',nilai="+nilaiToFloat(this.e_nilai.getText())+",nilai_or="+nilaiToFloat(this.e_nilaior.getText())+",p_or="+nilaiToFloat(this.e_persenor.getText())+
							",nilai_ppn="+nilaiToFloat(this.e_nilaippn.getText())+",jumlah="+nilaiToFloat(this.e_jumlah.getText())+
							",tgl_app='"+this.dp_d1.getDateString()+"',nik_buat='"+this.app._userLog+"' "+
						    "where kode_lokasi='"+this.app._lokasi+"' and kode_proyek='"+this.cb_kode.getText()+"' ");						
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){								
							sql.add("insert into prb_proyek_d(kode_proyek,kode_lokasi,nu,periode,nilai_pend,nilai_beban) values "+
									"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(1,i))+","+nilaiToFloat(this.sg.cells(2,i))+")");
						}
					}	

					//--------------------------------------------  piutang  -------------------------------------------
					//jurnal reverse piutanglama (ambil dari trans_m yg no_ref3='-'/belum direverse) dan buat jurnal amandemen piutang baru
					var noPiutang = this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-AMN"+this.periodeJurnal.substr(2,4)+".","0000");		
					////param 1 =dc,param 2= akun_pyt, param 3 = PRPIU (status jurnal), no_ref2=kode_proyek, no_ref3--> flag_sudah amandemen
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) "+
							"select '"+noPiutang+"',kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.periodeJurnal+"','AR','AMD','F','-','-','"+this.cb_pp.getText()+"','"+this.dp_d3.getDateString()+"',no_bukti,'"+this.e_nama.getText()+"','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",0,0,'-','-','-',no_ref1,'"+this.cb_kode.getText()+"','-','D',param2,'PRPIU' "+
							"from trans_m "+
							"where no_ref3='-' and no_ref2='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
					//jurnal reverse piutang lama											
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3)  "+
							"select '"+noPiutang+"',b.kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.periodeJurnal+"',b.no_bukti,'"+this.dp_d3.getDateString()+"',b.nu,b.kode_akun,case b.dc when 'D' then 'C' else 'D' end,b.nilai,b.nilai_curr,'Rev '+b.no_bukti,'AMDPIU-R',b.jenis,b.kode_curr,b.kurs,b.kode_pp,b.kode_drk,b.kode_cust,b.kode_vendor,b.no_fa,b.no_selesai,b.no_ref1,b.no_ref2,b.no_ref3 "+
							"from trans_m a inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_ref3='-' and a.no_ref2='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					//data jurnal piutang awal di flag supaya tidak bisa reverse lagi		
					sql.add("update trans_m set no_ref3='"+noPiutang+"' where no_bukti <> '"+noPiutang+"' and no_ref3='-' and no_ref2 ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
		
					//jurnal piutang baru
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+noPiutang+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.periodeJurnal+"','"+this.cb_kode.getText()+"','"+this.dp_d3.getDateString()+"',0,'"+this.akunPiutang+"','D',"+nilaiToFloat(this.e_nilai.getText())+","+
							nilaiToFloat(this.e_nilai.getText())+",'"+this.e_nama.getText()+"','AMDPIU','PIU','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");				
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+noPiutang+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.periodeJurnal+"','"+this.cb_kode.getText()+"','"+this.dp_d3.getDateString()+"',0,'"+this.akunPYT+"','C',"+nilaiToFloat(this.e_nilai.getText())+","+
							nilaiToFloat(this.e_nilai.getText())+",'"+this.e_nama.getText()+"','AMDPIU','PYT','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");				

					//--------------------------------------------  reverse distribusi pyt -------------------------------------------
					sql.add("insert into prb_prpyt_d(no_bukti,kode_lokasi,kode_proyek,periode_dis,periode,akun_pyt,akun_pdpt,kode_pp,kode_drk,nilai,dc,modul)  "+							
							"select '"+noPiutang+"',kode_lokasi,kode_proyek,periode_dis,'"+this.periodeJurnal+"',akun_pyt,akun_pdpt,kode_pp,'"+this.drkPdpt+"',sum(case dc when 'D' then nilai else -nilai end),'D','AMDPYT' "+
							"from prb_prpyt_d "+
							"where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							"group by kode_lokasi,kode_proyek,periode_dis,akun_pyt,akun_pdpt,kode_pp");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+noPiutang+"',kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.periodeJurnal+"',kode_proyek,'"+this.dp_d3.getDateString()+"',98,akun_pdpt,'D',nilai,nilai,'"+this.e_nama.getText()+"','AMDPYT','PDPT','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-' "+
							"from prb_prpyt_d   "+
							"where no_bukti='"+noPiutang+"' and kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+noPiutang+"',kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.periodeJurnal+"',kode_proyek,'"+this.dp_d3.getDateString()+"',99,akun_pyt,'C',nilai,nilai,'"+this.e_nama.getText()+"','AMDPYT','PYTDIS','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-' "+
							"from prb_prpyt_d   "+
							"where no_bukti='"+noPiutang+"' and kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					//--------------------------------------------  reverse akru bmhd -------------------------------------------	
					// sep andin/muhe/sai
					//if schbaru < realisasi maka masuk aja gpp meski minus di laporan komparasi
					// 	 schbaru > realisasi -- juga masuk aja
					//if ada saldo bmhd bln lalu atau bulan ini -- maka reverse semua SADLO BMHD, 
					//    tapi utk yg BULAN LALU AKRU lagi sisa sch-realisiasi utk bmhd-nya
 
					var revBMHD = 0;
					var strSQL = "select a.kode_proyek,c.akun_beban,c.akun_bmhd,c.kode_drkb,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as revbmhd "+
								 "from prb_bmhd_d a inner join prb_proyek b on a.kode_proyek =b.kode_proyek and a.kode_lokasi=b.kode_lokasi and b.versi='PRO20' "+
								 "					inner join prb_proyek_jenis c on b.kode_jenis =c.kode_jenis and b.kode_lokasi=c.kode_lokasi "+
								 "where a.kode_lokasi='" + this.app._lokasi + "' and a.kode_proyek='"+this.cb_kode.getText()+"' "+
								 "group by a.kode_proyek,c.akun_beban,c.akun_bmhd,c.kode_drkb";

					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){									
							revBMHD = parseFloat(line.revbmhd);

							var akunBeban = line.akun_beban;
							var akunBMHD = line.akun_bmhd;
							var drkBeban = line.kode_drkb;
						}
					}					
					
					if (revBMHD != 0) {
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+noPiutang+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.periodeJurnal+"','"+this.cb_kode.getText()+"','"+this.dp_d3.getDateString()+"',666,'"+akunBMHD+"','D',"+revBMHD+","+revBMHD+",'"+this.e_nama.getText()+"','AMDRBMHD','BMHD','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+noPiutang+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.periodeJurnal+"','"+this.cb_kode.getText()+"','"+this.dp_d3.getDateString()+"',667,'"+akunBeban+"','C',"+revBMHD+","+revBMHD+",'"+this.e_nama.getText()+"','AMDRBMHD','BEBAN','IDR',1,'"+this.app._kodePP+"','"+drkBeban+"','-','-','-','-','-','-','-')");
							
						sql.add("insert into prb_bmhd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1) values " +
								"('" + noPiutang + "','" + this.app._lokasi + "','"+this.periodeJurnal+"','" + this.dp_d3.getDateString() + "','" + akunBMHD + "','" + this.cb_pp.getText() + "','" + this.e_nama.getText() + "','C'," + revBMHD + ",getdate(),'" + this.cb_kode.getText() + "','AMDRBMHD','-')");
					}

					//mem-bmhd periode yg lalu yg bebannya belum ke"makan" sbg beban
					this.doHitungBMHD();
					for (var i=0;i < this.sg.getRowCount();i++) {
						if (this.sg.rowValid(i) && nilaiToFloat(this.sg.cells(3,i) > 0)) {		
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+noPiutang+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.periodeJurnal+"','"+this.cb_kode.getText()+"','"+this.dp_d3.getDateString()+"',555,'"+akunBeban+"','D',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(3,i))+",'"+this.e_nama.getText()+"','AMDBMHD','BEBAN','IDR',1,'"+this.cb_pp.getText()+"','"+drkBeban+"','-','-','-','-','-','-','-')");
							sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+noPiutang+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.periodeJurnal+"','"+this.cb_kode.getText()+"','"+this.dp_d3.getDateString()+"',556,'"+akunBMHD+"','C',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(3,i))+",'"+this.e_nama.getText()+"','AMDBMHD','BMHD','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");

							sql.add("insert into prb_bmhd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1) values " +
									"('" + noPiutang + "','" + this.app._lokasi + "','" + this.sg.cells(0,i) + "','" + this.dp_d3.getDateString() + "','" + akunBMHD + "','" + this.cb_pp.getText() + "','" + this.e_nama.getText() + "','D'," + nilaiToFloat(this.sg.cells(3,i)) + ",getdate(),'" + this.cb_kode.getText() + "','AMDBMHD','-')");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.stsSimpan = 1;				
					this.sg.clear(1);
					this.sg1mp2.clear(1);
					this.sg3.clear(1);
					this.sgr.clear(1);					
					this.pc1.setActivePage(this.pc1.childPage[0]);						
				break;			
			case "ubah" :								
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
		}
	},
	doSelectDate3: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			this.periodeJurnal = y+""+m;				
		}
		catch (e) {
			alert(e);
		}			
	},
	doSelectDate: function(sender, y,m,d){
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
	doPPN:function(sender){	
		if (this.e_nilai.getText() != "") {				
			var nilaiPPN = Math.round(nilaiToFloat(this.e_nilai.getText()) * 10/100);
			this.e_nilaippn.setText(floatToNilai(nilaiPPN));				
		}			
	},				
	doChange: function(sender){
		try{									
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){				
				var strSQL = "select a.*,c.kode_drkp,c.kode_drkb,c.akun_piutang,c.akun_pyt from prb_proyek a inner join prb_proyek_jenis c on a.kode_jenis =c.kode_jenis and a.kode_lokasi=c.kode_lokasi where a.versi='PRO20' and a.kode_proyek ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.akunPiutang = line.akun_piutang;
						this.akunPYT = line.akun_pyt;							
						this.drkPdpt = line.kode_drkp;	
						this.drkBeban = line.kode_drkb;					
						this.e_nama.setText(line.nama);
						this.e_dok.setText(line.no_pks);						
						this.cb_pp.setText(line.kode_pp);
						this.cb_cust.setText(line.kode_cust);						
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);						
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_nilaippn.setText(floatToNilai(line.nilai_ppn));
						this.e_persenor.setText(floatToNilai(line.p_or));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.cb_jenis.setText(line.kode_jenis);
						this.e_jumlah.setText(floatToNilai(line.jumlah));
						
						this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
						var data = this.dbLib.getDataProvider("select * from prb_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg.appendData([line.periode,floatToNilai(line.nilai_pend),floatToNilai(line.nilai_beban),"0"]);
							}
						} 
						else this.sg.clear(1);	

						this.sg1mp2.clear();
						var data2 = this.dbLib.getDataProvider(
								"select b.kode_jenis,b.nama,a.no_gambar from prb_rab_dok a inner join prb_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_ref = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);							
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
							var line2;
							this.sg1mp2.clear();
							for (var i in data2.rs.rows){
								line2 = data2.rs.rows[i];										
								this.sg1mp2.appendData([line2.kode_jenis, line2.nama, line2.no_gambar, "DownLoad"]);
							}
						} else this.sg1mp2.clear(1);
												
						var strSQL = "select no_rab,kode_pp from prb_rabapp_m where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){																
								var data2 = this.dbLib.getDataProvider("select * from prb_rabapp_d where no_rab = '"+line.no_rab+"' and kode_lokasi='"+this.app._lokasi+"' order by jenis desc,nu",true);
								if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
									var line;
									this.sgr.clear();
									for (var i in data2.rs.rows){
										line = data2.rs.rows[i];												
										this.sgr.appendData([line.keterangan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total),line.jenis]);
									}
								} 
								else this.sgr.clear(1);												
							}					
						}																	
						setTipeButton(tbUbah);
					}					
				}
			}
			
			if ((sender == this.e_nilai || sender == this.e_nilaior) && this.e_nilai.getText() != "" && this.e_nilaior.getText() != "") {				
				var persen = Math.round(nilaiToFloat(this.e_nilaior.getText()) / nilaiToFloat(this.e_nilai.getText()) * 10000) / 100;
				this.e_persenor.setText(floatToNilai(persen));
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});

