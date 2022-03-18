window.app_saku3_transaksi_optik_produksi_fAppNota = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_optik_produksi_fAppNota.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_optik_produksi_fAppNota";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval Nota", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,440], childPage:["Daftar Pesanan","Detail Pesanan","Filter Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:11,tag:0,
		      colTitle:["Jenis","ID Sys","No Resep","Status","Tanggal","Pasien","Nilai","Cabang","Pembuat","No Approve","Tgl Input"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[110,100,100,100,100,200,80,80,120,120,80]],					
					readOnly:true,colFormat:[[6],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
				
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],labelWidth:100,caption:"No Approve", readOnly:true,visible:true});								
		this.e_ver = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"No Verifikasi",maxLength:50});		
		this.e_resep = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No ID System",readOnly:true});		
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[230,12,190,20],labelWidth:80,caption:"Tanggal", tag:1, readOnly:true});				
		this.e_nota = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"No Nota",readOnly:true});
		this.e_nota2 = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[230,16,190,20],labelWidth:80,caption:"No Nota 2",readOnly:true});
		this.e_lensa = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,400,20],caption:"Lensa",readOnly:true});
		this.e_nlensa = new saiLabelEdit(this.pc1.childPage[1],{bound:[450,15,200,20],caption:"Nilai Lensa", tag:1,  tipeText:ttNilai, text:"0",readOnly:true,change:[this,"doChange"]});				
		this.e_frame = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,400,20],caption:"Frame",readOnly:true,maxLength:50});
		this.e_nframe = new saiLabelEdit(this.pc1.childPage[1],{bound:[450,16,200,20],caption:"Nilai Frame", tag:1,readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,16,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});			

		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,12,995,268], childPage:["Data Pasien","Ukuran Lensa","Pembiayaan"]});		
		this.cb_mitra = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Mitra",readOnly:true, tag:9});					
		this.cb_nik = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"NIK",readOnly:true,tag:9});				
		this.e_pasien = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,450,20],caption:"Pasien",maxLength:50});
		this.e_umur = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Umur",maxLength:2,tipeText:ttNilai,text:"0"});
		this.e_alamat = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,19,450,20],caption:"Alamat",maxLength:200});
		this.e_hp = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"No HP",maxLength:20});
		this.e_loker = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Loker - Band",tag:2});
		this.e_band = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[230,16,100,20],labelWidth:0,caption:"",readOnly:true,tag:9});

		this.sg1 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:6,tag:0,
					colTitle:["Jenis","SPH (+/-)","CYL (+/-)","AXIS(o)","ADD(+)","PD"],	
					columnReadOnly:[true,[0],[1,2,3,4,5]],						
					colWidth:[[5,4,3,2,1,0],[100,100,100,100,100,100]],					
					autoAppend:false,defaultRow:2});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		this.e_bantulensa = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,11,200,20],caption:"Bantuan Lensa", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_bantuframe = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,12,200,20],caption:"Bantuan Lengkap", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_bsendiri = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,16,200,20],caption:"Biaya Sendiri", tag:1, tipeText:ttNilai, text:"0", readOnly:true,change:[this,"doChange"]});		
		this.e_umuka = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,17,200,20],caption:"Uang Muka", tag:1, tipeText:ttNilai, text:"0", readOnly:true, change:[this,"doChange"]});				
		this.e_sisa = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,16,200,20],caption:"Tagihan", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		

		this.c_jenis = new saiCB(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Jenis",items:["MITRA","UMUM"], tag:2,change:[this,"doChange"]});
		this.cb_mitra2 = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,13,220,20],caption:"Mitra", multiSelection:false, tag:8,change:[this,"doChange"]});					
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,14,220,20],caption:"Cabang", multiSelection:false, tag:8,change:[this,"doChange"]});					
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,15,97,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);			
		this.pc1.childPage[2].rearrangeChild(10, 23);	

		this.cb_nb = new saiCBBL(this.pc1.childPage[2],{bound:[20,150,220,20],caption:"ID Sys:Rev", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});	
				
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
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			this.c_jenis.setText("MITRA");
			this.cb_mitra.setSQL("select kode_mitra,nama from optik_mitra where flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"' union select '',''",["kode_mitra","nama"],false,["Kode","Nama"],"and","Data Mitra",true);						
			this.cb_nik.setSQL("select nik,nama from optik_nik where kode_lokasi='"+this.app._lokasi+"' union select '',''",["nik","nama"],false,["Kode","Nama"],"and","Data NIK",true);						
			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Cabang",true);

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PIUOPTIK','PYTOPTIK','UMUKA','PDPTOPTIK') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "PIUOPTIK") this.akunPiutang = line.flag;						
					if (line.kode_spro == "PYTOPTIK") this.akunPyt = line.flag;						
					if (line.kode_spro == "UMUKA") this.akunUM = line.flag;	
					if (line.kode_spro == "PDPTOPTIK") this.akunPdpt = line.flag;						
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_optik_produksi_fAppNota.extend(window.childForm);
window.app_saku3_transaksi_optik_produksi_fAppNota.implement({	
	doLoad:function(sender){			
		if (this.c_jenis.getText() == "MITRA" && this.cb_pp.getText()!="" && this.cb_mitra2.getText()!="")	{
			strSQL = "select a.jenis,a.no_bukti,a.no_dokumen,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,a.pasien,a.nilai_lensa+a.nilai_frame as nilai,a.kode_pp,a.nik_user+' - '+b.nama as pembuat,a.no_app,convert(varchar,a.tgl_input,120) as tglinput "+
					 "from optik_pesan_m a "+
					 "		inner join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+
					 "where a.tgl_del is null and a.kode_mitra='"+this.cb_mitra2.getText()+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.jenis='MITRA' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' ";
		}	
		if (this.c_jenis.getText() == "UMUM" && this.cb_pp.getText()!="")	{
			strSQL = "select a.jenis,a.no_bukti,a.no_dokumen,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,a.pasien,a.nilai_lensa+a.nilai_frame as nilai,a.kode_pp,a.nik_user+' - '+b.nama as pembuat,a.no_app,convert(varchar,a.tgl_input,120) as tglinput "+
					 "from optik_pesan_m a "+
					 "		inner join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+
					 "where a.tgl_del is null and a.jenis='UMUM' and a.kode_pp='"+this.cb_pp.getText()+"' and a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' ";
		}	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);				
		this.pc2.setActivePage(this.pc2.childPage[0]);																
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];		
			this.sg.appendData([line.jenis,line.no_bukti,line.no_dokumen,line.status.toUpperCase(),line.tgl,line.pasien,floatToNilai(line.nilai),line.kode_pp,line.pembuat,line.no_app,line.tglinput]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
						sql.add("delete from optik_app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
						sql.add("update optik_pesan_m set no_app='-',progress='0',app_blen=0,app_bfr=0,no_ver='-' where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
						sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
					}
					
					sql.add("update optik_pesan_m set loker='"+this.e_loker.getText()+"',by_sendiri="+nilaiToFloat(this.e_bsendiri.getText())+",no_app='"+this.e_nb.getText()+"',progress='1',app_blen="+nilaiToFloat(this.e_bantulensa.getText())+",app_bfr="+nilaiToFloat(this.e_bantuframe.getText())+",no_ver='"+this.e_ver.getText()+"' "+
							"where no_bukti='"+this.e_resep.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						

					sql.add("insert into optik_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,no_ver) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','1','"+this.jenis+"','APP','"+this.e_resep.getText()+"','-','-','"+this.e_ver.getText()+"')");
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','APPROVE','F','-','-','"+this.ppNota+"','"+this.dp_d1.getDateString()+"','"+this.e_resep.getText()+"','"+this.e_nota.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+",0,0,'-','-','-','"+this.e_ver.getText()+"','-','-','-','-','-')");
					
					if (this.jenis=="MITRA") {
						//reklas akun_piutang ke piutang_corporate		
						var totBantu = nilaiToFloat(this.e_bantuframe.getText()) + nilaiToFloat(this.e_bantulensa.getText());
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_resep.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiuMitra+"','D',"+totBantu+","+
							totBantu+",'"+this.e_resep.getText()+"','AR','PIUMITRA','IDR',1,'"+this.ppNota+"','-','-','-','-','-','-','-','-')");														
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+this.e_resep.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunPiutang+"','C',"+totBantu+","+
							totBantu+",'"+this.e_resep.getText()+"','AR','PIUTANG','IDR',1,'"+this.ppNota+"','-','-','-','-','-','-','-','-')");																			
					}

					//reklas nilai pyt+umuka --> pdpt
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+this.akunPyt+"','D',"+parseNilai(this.e_sisa.getText())+","+
							parseNilai(this.e_sisa.getText())+",'"+this.e_resep.getText()+"','AR','PYTREV','IDR',1,'"+this.ppNota+"','-','-','-','-','-','-','-','-')");														
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',4,'"+this.akunUM+"','D',"+parseNilai(this.e_umuka.getText())+","+
							parseNilai(this.e_umuka.getText())+",'"+this.e_resep.getText()+"','AR','UMUKAREV','IDR',1,'"+this.ppNota+"','-','-','-','-','-','-','-','-')");																
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',5,'"+this.akunPdpt+"','C',"+parseNilai(this.e_total.getText())+","+
							parseNilai(this.e_total.getText())+",'"+this.e_resep.getText()+"','AR','PDPT','IDR',1,'"+this.ppNota+"','-','-','-','-','-','-','-','-')");																

					
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
					this.sg1.clear(1); this.sg.clear(1); 
					this.doClick();										
					this.pc1.setActivePage(this.pc1.childPage[0]);				
					this.pc2.setActivePage(this.pc2.childPage[0]);									
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
			case "ubah" :					
				this.preView = "1";								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																				
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
				else 
				this.simpan();				
				break;								
			case "simpancek" : this.simpan();			
				break;
				
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();									
				sql.add("delete from optik_app_m where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				sql.add("update optik_pesan_m set no_app='-',progress='0',app_blen=0,app_bfr=0,no_ver='-' where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				sql.add("delete from trans_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				sql.add("delete from trans_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		
		if (this.stsSimpan == 1) this.doClick();		
	},	
	doChange:function(sender){					
		if (sender == this.c_jenis && this.c_jenis.getText()!="") {
			this.cb_mitra2.setText("","");
			if (this.c_jenis.getText() == "MITRA") this.cb_mitra2.setSQL("select kode_mitra,nama from optik_mitra where flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_mitra","nama"],false,["Kode","Nama"],"and","Data Mitra",true);															
			else this.cb_mitra2.setSQL("select '-' as kode_mitra,'-' as nama ",["kode_mitra","nama"],false,["Kode","Nama"],"and","Data Mitra",true);															

			this.cb_nb.setSQL("select a.no_bukti,a.no_dokumen from optik_pesan_m a inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.posted='F' "+
							  "where a.tgl_del is null and a.jenis = '"+this.c_jenis.getText()+"' and a.progress='1' and a.kode_lokasi='"+this.app._lokasi+"'",["no_bukti","no_dokumen"],false,["No Resep","No Nota"],"and","Data Pesanan",true);											  
		}		
		
		if ((sender == this.e_total || sender == this.e_bantuframe || sender == this.e_bantulensa) && this.e_total.getText()!="" && this.e_bantuframe.getText()!="" && this.e_bantulensa.getText()!="") {
			var tagih = nilaiToFloat(this.e_total.getText()) - nilaiToFloat(this.e_bantuframe.getText()) - nilaiToFloat(this.e_bantulensa.getText());
			this.e_bsendiri.setText(floatToNilai(tagih));
		}
		if ((sender == this.e_umuka || sender == this.e_total) && this.e_umuka.getText()!="" && this.e_total.getText()!="") {
			var sisa = nilaiToFloat(this.e_total.getText()) - nilaiToFloat(this.e_umuka.getText());
			this.e_sisa.setText(floatToNilai(sisa));
		}
		if (sender == this.e_nlensa || sender == this.e_nframe) {
			if (this.e_nlensa.getText()!="" && this.e_nframe.getText()!="") {
				var tot = nilaiToFloat(this.e_nlensa.getText()) + nilaiToFloat(this.e_nframe.getText());
				this.e_total.setText(floatToNilai(tot));
			}
		}	

		//koreksi
		if (sender == this.cb_nb && this.cb_nb.getText()!="") {
			if (this.c_jenis.getText() == "MITRA")	{
				strSQL = "select a.jenis,a.no_bukti,a.no_dokumen,'APPROVE' as status,convert(varchar,a.tanggal,103) as tgl,a.pasien,a.nilai_lensa+a.nilai_frame as nilai,a.kode_pp,a.nik_user+' - '+b.nama as pembuat,a.no_app,convert(varchar,a.tgl_input,120) as tglinput "+
						 "from optik_pesan_m a "+
						 "		inner join trans_m c on a.no_app=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.posted='F' "+
						 "		inner join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_bukti='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' ";
			}	
			if (this.c_jenis.getText() == "UMUM")	{
				strSQL = "select a.jenis,a.no_bukti,a.no_dokumen,'APPROVE' as status,convert(varchar,a.tanggal,103) as tgl,a.pasien,a.nilai_lensa+a.nilai_frame as nilai,a.kode_pp,a.nik_user+' - '+b.nama as pembuat,a.no_app,convert(varchar,a.tgl_input,120) as tglinput "+
						 "from optik_pesan_m a "+
						 "		inner join trans_m c on a.no_app=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.posted='F' "+
						 "		inner join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_bukti='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' ";
			}	
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
			
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.pc2.setActivePage(this.pc2.childPage[0]);				
		}	
	},
	doClick:function(sender){				
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-AP"+this.e_periode.getText().substr(2,4)+".","0000"));																				
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				if (this.sg.cells(3,row) == "INPROG") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				else {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;
				}

				this.e_resep.setText(this.sg.cells(1,row));
				this.e_tgl.setText(this.sg.cells(4,row));
				
				var strSQL = "select a.*,b.akun_piutang,b.akun_pdpt "+
							 "from optik_pesan_m a "+
							 "left join optik_mitra b on a.kode_mitra=b.kode_mitra and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bukti = '"+this.e_resep.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.ppNota = line.kode_pp;
						if (this.stsSimpan == 0) this.e_nb.setText(line.no_app);	
						else this.doClick();
						this.jenis = line.jenis;										
						this.e_nota.setText(line.no_dokumen);
						this.e_nota2.setText(line.no_dok2);
						this.e_lensa.setText(line.lensa);
						this.e_nlensa.setText(floatToNilai(line.nilai_lensa));
						this.e_frame.setText(line.frame);
						this.e_nframe.setText(floatToNilai(line.nilai_frame));
						
						if (this.jenis=="MITRA") {
							this.cb_mitra.setText(line.kode_mitra);
							this.cb_nik.setText(line.nik);
							this.e_bantuframe.setReadOnly(false);
							this.e_bantulensa.setReadOnly(false);
							this.akunPiuMitra = line.akun_piutang;
							this.akunPdpt = line.akun_pdpt;
						}
						else {
							this.cb_mitra.setText("");
							this.cb_nik.setText("");
							this.e_bantuframe.setReadOnly(true);
							this.e_bantulensa.setReadOnly(true);							
						}
						this.e_pasien.setText(line.pasien);
						this.e_umur.setText(line.umur);
						this.e_alamat.setText(line.alamat);
						this.e_hp.setText(line.no_hp);
						this.e_loker.setText(line.loker);
						this.e_band.setText(line.band);

						if (this.stsSimpan==1) {
							this.e_bantulensa.setText(floatToNilai(line.bantu_len));
							this.e_bantuframe.setText(floatToNilai(line.bantu_fr));
						}
						else {
							this.e_bantulensa.setText(floatToNilai(line.app_blen));
							this.e_bantuframe.setText(floatToNilai(line.app_bfr));
						}
						this.e_umuka.setText(floatToNilai(line.umuka));		
						this.e_ver.setText(line.no_ver);				
					}
				}												
				
				var strSQL = "select * from optik_pesan_d where no_bukti='"+this.e_resep.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg1.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];		
						this.sg1.appendData([line1.jenis,line1.sph,line1.cyl,line1.axis,line1.rabun,line1.pd]);
					}
				} else this.sg1.clear(1);												
				this.sg1.validasi();	
				
				
				this.e_ver.setFocus();

				if (this.jenis == "MITRA") {					
					this.e_ver.setReadOnly(false);
				}
				else {					
					this.e_ver.setReadOnly(true);
				}
			}
		} catch(e) {alert(e);}
	},					
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_produk_rptJual";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
								//this.filter2 = this.e_periode.getText()+"/"+this.app._lokasi;
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
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi","");							
								this.clearLayar();
							} 
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),undefined);
			this.sg1.clear(1); this.sg.clear(1); 
			this.doClick();						
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.pc2.setActivePage(this.pc2.childPage[0]);							
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	}
});

