window.app_saku3_transaksi_optik_produksi_fJualMitra2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_optik_produksi_fJualMitra2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_optik_produksi_fJualMitra2";
		this.itemsValue = new portalui_arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pesanan via Mitra", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"Cabang",multiSelection:false,readOnly:true,tag:2,change:[this,"doChange"]});						
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});

		this.pc2 = new pageControl(this,{bound:[10,10,1000,415], childPage:["Data Transaksi","List Pesanan"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["ID System","Tanggal","NIK","No Resep","Total"],
					colWidth:[[4,3,2,1,0],[100,100,100,100,120]],
					readOnly:true,
					colFormat:[[4],[cfNilai]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"ID System",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Resep",maxLength:30,change:[this,"doChange"]});
		this.e_dok2 = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[230,16,190,20],labelWidth:80,caption:"No Nota",maxLength:20,change:[this,"doChange"]});
		this.e_lensa = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,400,20],caption:"Lensa",maxLength:50});
		this.e_nlensa = new saiLabelEdit(this.pc2.childPage[0],{bound:[450,15,200,20],caption:"Nilai Lensa", tag:1,  tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_frame = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,400,20],caption:"Frame",maxLength:50});
		this.e_nframe = new saiLabelEdit(this.pc2.childPage[0],{bound:[450,16,200,20],caption:"Nilai Frame", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,16,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});			

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,290], childPage:["Data Pasien","Ukuran Lensa","Pembiayaan"]});		
		this.cb_mitra = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Mitra",multiSelection:false,tag:1,change:[this,"doChange"]});					
		this.cb_nik = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"NIK",multiSelection:false,tag:1,change:[this,"doChange"]});				
		this.e_nikes = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"NiKes",maxLength:10});
		this.e_pasien = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Pasien",maxLength:50});
		this.e_umur = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Umur",maxLength:2,tipeText:ttNilai,text:"0"});
		this.e_alamat = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,450,20],caption:"Alamat",maxLength:200});
		this.e_hp = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"No HP",maxLength:20});
		this.e_loker = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Loker - Band",maxLength:10});
		this.e_band = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[230,16,100,20],labelWidth:0,caption:"",readOnly:true});
		this.e_catatan = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,450,20],caption:"Catatan",maxLength:200});
		
		this.e_odsph = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,180,20],caption:"OD SPH (+/-)",tag:1,maxLength:6,labelWidth:80});
		this.e_odcyl = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[210,16,180,20],caption:"OD CYL (+/-)",tag:1,maxLength:6,labelWidth:80});
		this.e_odaxis = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[400,16,180,20],caption:"OD AXIS (o)",tag:1,maxLength:6,labelWidth:80});
		this.e_odadd = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[590,16,180,20],caption:"OD ADD (+)",tag:1,maxLength:6,labelWidth:80});
		this.e_odpd = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[780,16,180,20],caption:"OD PD",tag:1,maxLength:6,labelWidth:80});
		this.e_ossph = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,180,20],caption:"OS SPH (+/-)",tag:1,maxLength:6,labelWidth:80});
		this.e_oscyl = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[210,17,180,20],caption:"OS CYL (+/-)",tag:1,maxLength:6,labelWidth:80});
		this.e_osaxis = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[400,17,180,20],caption:"OS AXIS (o)",tag:1,maxLength:6,labelWidth:80});
		this.e_osadd = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[590,17,180,20],caption:"OS ADD (+)",tag:1,maxLength:6,labelWidth:80});
		this.e_ospd = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[780,17,180,20],caption:"OS PD",tag:1,maxLength:6,labelWidth:80});
		
		this.c_jenis = new saiCB(this.pc1.childPage[2],{bound:[20,24,200,20],caption:"Jenis Bantuan",items:["LENSA","LENGKAP"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_bantu = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"Nilai Bantuan", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_bantulensa = new saiLabelEdit(this.pc1.childPage[2],{bound:[220,11,200,20],caption:"Bantuan Lensa", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],visible:false});		
		this.e_bantuframe = new saiLabelEdit(this.pc1.childPage[2],{bound:[420,11,200,20],caption:"Bantuan Lengkap", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],visible:false});		
		this.e_bsendiri = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,16,200,20],caption:"Biaya Sendiri", tag:1, tipeText:ttNilai, text:"0", readOnly:true,change:[this,"doChange"]});		
		this.e_umuka = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,200,20],caption:"Uang Muka", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.cb_kas = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,14,220,20],caption:"Akun KB",multiSelection:false,tag:1,visible:false});				
		this.e_sisa = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,16,200,20],caption:"Tagihan", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		

		this.rearrangeChild(10, 22);
		this.pc2.childPage[0].rearrangeChild(10, 23);		
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
			
		setTipeButton(tbAllFalse);			
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;						
			
			this.cb_pp.setSQL("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);						
			this.cb_pp.setText(this.app._kodePP);
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			
			this.cb_mitra.setSQL("select kode_mitra,nama from optik_mitra where flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_mitra","nama"],false,["Kode","Nama"],"and","Data Mitra",true);									
			this.cb_kas.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.block ='0' and a.kode_lokasi='"+this.app._lokasi+"' union select '','' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);						
			

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PIUOPTIK','PYTOPTIK','UMUKA') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "PIUOPTIK") this.akunPiutang = line.flag;						
					if (line.kode_spro == "PYTOPTIK") this.akunPyt = line.flag;						
					if (line.kode_spro == "UMUKA") this.akunUM = line.flag;						
				}
			}
			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_optik_produksi_fJualMitra2.extend(window.portalui_childForm);
window.app_saku3_transaksi_optik_produksi_fJualMitra2.implement({		
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
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
						sql.add("delete from optik_pesan_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
						sql.add("delete from optik_pesan_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
					}	

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','JMITRA','F','-','-','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_dok2.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+",0,0,'-','-','-','-','-','-','"+this.cb_nik.getText()+"','-','-')");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akunPiutang+"','D',"+parseNilai(this.e_sisa.getText())+","+
							parseNilai(this.e_sisa.getText())+",'"+this.e_dok.getText()+"','AR','PIUTANG','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");							
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',9,'"+this.akunPyt+"','C',"+parseNilai(this.e_sisa.getText())+","+
							parseNilai(this.e_sisa.getText())+",'"+this.e_dok.getText()+"','AR','PYT','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");														
							
					if (nilaiToFloat(this.e_umuka.getText()) > 0) {
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.cb_kas.getText()+"','D',"+parseNilai(this.e_umuka.getText())+","+
								parseNilai(this.e_umuka.getText())+",'"+this.e_dok.getText()+"','AR','KB','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");																			
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',8,'"+this.akunUM+"','C',"+parseNilai(this.e_umuka.getText())+","+
								parseNilai(this.e_umuka.getText())+",'"+this.e_dok.getText()+"','AR','UMUKA','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");																			
					}
					
					sql.add("insert into optik_pesan_m (no_bukti,tanggal,kode_lokasi,periode,kode_pp,no_dokumen,no_dok2,jenis,kode_mitra,nik,pasien,umur,alamat,no_hp,loker,band,lensa,frame,nilai_lensa,nilai_frame,bantu_len,bantu_fr,by_sendiri,umuka,progress,no_app,app_blen,app_bfr, no_tagih,n_tagih,akun_kas,nik_user,tgl_input,no_ver,catatan,nikes,user_del,tgl_del) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_pp.getText()+"','"+this.e_dok.getText()+"','"+this.e_dok2.getText()+"','MITRA','"+this.cb_mitra.getText()+"','"+this.cb_nik.getText()+"','"+this.e_pasien.getText()+"',"+parseNilai(this.e_umur.getText())+",'"+this.e_alamat.getText()+"','"+this.e_hp.getText()+"','"+this.e_loker.getText()+"','"+this.e_band.getText()+"','"+this.e_lensa.getText()+"','"+this.e_frame.getText()+"',"+parseNilai(this.e_nlensa.getText())+","+parseNilai(this.e_nframe.getText())+",  "+parseNilai(this.e_bantulensa.getText())+","+parseNilai(this.e_bantuframe.getText())+", "+parseNilai(this.e_bsendiri.getText())+","+parseNilai(this.e_umuka.getText())+", '0', '-',0,0,'-',"+parseNilai(this.e_sisa.getText())+",'"+this.cb_kas.getText()+"','"+this.app._userLog+"',getdate(),'-','"+this.e_catatan.getText()+"','"+this.e_nikes.getText()+"','-',NULL)");	
					sql.add("insert into optik_pesan_d (no_bukti,kode_lokasi,jenis,sph,cyl,axis,rabun,pd) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','OD','"+this.e_odsph.getText()+"','"+this.e_odcyl.getText()+"','"+this.e_odaxis.getText()+"','"+this.e_odadd.getText()+"','"+this.e_odpd.getText()+"')");

					sql.add("insert into optik_pesan_d (no_bukti,kode_lokasi,jenis,sph,cyl,axis,rabun,pd) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','OS','"+this.e_ossph.getText()+"','"+this.e_oscyl.getText()+"','"+this.e_osaxis.getText()+"','"+this.e_osadd.getText()+"','"+this.e_ospd.getText()+"')");
							

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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb); 
					this.sg3.clear();
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					this.doClick();			
					this.e_dok.setText(this.cb_pp.getText()+"-"+this.e_periode.getText().substr(2,4)+".");		
				}
				break;
			case "simpan" :	
			case "ubah" :
				this.preView = "1";	
				if (nilaiToFloat(this.e_total.getText()) < 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh bernilai nol atau kurang.");
					return false;
				}
				if (nilaiToFloat(this.e_umuka.getText()) > nilaiToFloat(this.e_bsendiri.getText()) ) {
					system.alert(this,"Transaksi tidak valid.","Uang Muka tidak boleh melebihi biaya sendiri.");
					return false;
				}	
				if (this.standarLib.doCekPeriode(this.dbLib,"AR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (AR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";
				if (this.standarLib.doCekPeriode(this.dbLib,"AR",this.app._lokasi,this.app._userStatus,this.e_periode.getText()) == "0") {
					system.alert(this,"Periode transaksi modul tidak valid (AR - LOCKED).","Hubungi Administrator Sistem.");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					
					sql.add("update optik_pesan_m set user_del='"+this.app._userLog+"', tgl_del=getdate() where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;									
		}
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "" && this.cb_pp.getText()!="") {
				if (this.stsSimpan == 0) {	
					this.sg3.clear();					
				}
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"optik_pesan_m","no_bukti",this.cb_pp.getText()+"-"+this.e_periode.getText().substr(2,4)+".","0000"));												
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			this.e_periode.setText(y+""+m);			
			this.e_dok.setText(this.cb_pp.getText()+"-"+this.e_periode.getText().substr(2,4)+".");
			if (this.stsSimpan == 1) this.doClick();			
		}catch(e) {alert(e);}
	},	
	doChange:function(sender){		
		try {			
			if (sender == this.cb_pp && this.cb_pp.getText()!="") {
				this.doClick();
			}
			/*
			if (sender == this.e_dok && this.e_dok.getText()!="") {
				var nota = this.e_dok.getText();
				if (nota.length == 1) nota = "00000"+nota;
				if (nota.length == 2) nota = "0000"+nota;
				if (nota.length == 3) nota = "000"+nota;
				if (nota.length == 4) nota = "00"+nota;
				if (nota.length == 5) nota = "0"+nota;
				if (nota.length == 6) nota = nota;

				this.e_dok.setText(nota);
			}
			*/
			if (sender == this.e_dok2 && this.e_dok2.getText()!="") {
				var nota = this.e_dok2.getText();
				if (nota.length == 1) nota = "00000"+nota;
				if (nota.length == 2) nota = "0000"+nota;
				if (nota.length == 3) nota = "000"+nota;
				if (nota.length == 4) nota = "00"+nota;
				if (nota.length == 5) nota = "0"+nota;
				if (nota.length == 6) nota = nota;

				this.e_dok2.setText(nota);
			}
			if ((sender == this.c_jenis || sender == this.e_bantu) && this.c_jenis.getText()!="" && this.e_bantu.getText()!="") {
				if (this.c_jenis.getText()=="LENSA") {
					this.e_bantulensa.setText(this.e_bantu.getText());
					this.e_bantuframe.setText("0");
				}
				else {
					this.e_bantuframe.setText(this.e_bantu.getText());
					this.e_bantulensa.setText("0");
				}
			}
			if ((sender == this.e_total || sender == this.e_bantuframe || sender == this.e_bantulensa) && this.e_total.getText()!="" && this.e_bantuframe.getText()!="" && this.e_bantulensa.getText()!="") {
				var tagih = nilaiToFloat(this.e_total.getText()) - nilaiToFloat(this.e_bantuframe.getText()) - nilaiToFloat(this.e_bantulensa.getText());
				this.e_bsendiri.setText(floatToNilai(tagih));
			}
			if ((sender == this.e_umuka || sender == this.e_total) && this.e_umuka.getText()!="" && this.e_total.getText()!="") {
				var sisa = nilaiToFloat(this.e_total.getText()) - nilaiToFloat(this.e_umuka.getText());
				this.e_sisa.setText(floatToNilai(sisa));

				if (sender == this.e_umuka) {
					if (this.e_umuka.getText() == "0") {
						this.cb_kas.setTag("9");
						this.cb_kas.hide();
					}
					else {
						this.cb_kas.setTag("1");
						this.cb_kas.show();						
					}
				}
			}
			if (sender == this.e_nlensa || sender == this.e_nframe) {
				if (this.e_nlensa.getText()!="" && this.e_nframe.getText()!="") {
					var tot = nilaiToFloat(this.e_nlensa.getText()) + nilaiToFloat(this.e_nframe.getText());
					this.e_total.setText(floatToNilai(tot));
				}
			}		
			if (sender == this.cb_mitra && this.cb_mitra.getText()!="") {
				this.cb_nik.setSQL("select nik,nama from optik_nik where kode_mitra ='"+this.cb_mitra.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data NIK",true);						
			}
			if (sender == this.cb_nik && this.cb_nik.getText()!="") {
				var data = this.dbLib.getDataProvider("select loker,band from optik_nik where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_loker.setText(line.loker);						
						this.e_band.setText(line.band);						
					} 
				}	
			}
		}
		catch(e) {
			alert(e);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_optik_rptNota";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/"+this.app._lokasi;
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
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
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
			this.sg3.clear();
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.doClick();
			this.e_dok.setText(this.cb_pp.getText()+"-"+this.e_periode.getText().substr(2,4)+".");
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){			
		var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.nilai1,a.param1 as nik "+
					 "from trans_m a inner join optik_pesan_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+				     
					 "where b.tgl_del is null and a.modul='AR' and a.form='JMITRA' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.kode_pp='"+this.cb_pp.getText()+"' "+
					 "order by a.no_bukti";			
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
			this.sg3.appendData([line.no_bukti,line.tgl,line.nik,line.no_dokumen,floatToNilai(line.nilai1)]); 
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
												
				var strSQL = "select a.tanggal,b.* from trans_m a inner join optik_pesan_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_dok2.setText(line.no_dok2);
						this.e_lensa.setText(line.lensa);
						this.e_nlensa.setText(floatToNilai(line.nilai_lensa));
						this.e_frame.setText(line.frame);
						this.e_nframe.setText(floatToNilai(line.nilai_frame));
						
						this.cb_mitra.setText(line.kode_mitra);
						this.cb_nik.setText(line.nik);
						this.e_nikes.setText(line.nikes);
						this.e_pasien.setText(line.pasien);
						this.e_umur.setText(line.umur);
						this.e_alamat.setText(line.alamat);
						this.e_hp.setText(line.no_hp);
						this.e_loker.setText(line.loker);
						this.e_band.setText(line.band);
						this.e_catatan.setText(line.catatan);

						if (parseFloat(line.bantu_len) != 0) {
							this.c_jenis.setText("LENSA");
							this.e_bantu.setText(nilaiToFloat(line.bantu_len));
						}
						else {
							this.c_jenis.setText("LENGKAP");
							this.e_bantu.setText(nilaiToFloat(line.bantu_fr));
						}
						this.e_bsendiri.setText(floatToNilai(line.by_sendiri));
						this.e_umuka.setText(floatToNilai(line.umuka));
						this.cb_kas.setText(line.akun_kas);
					}
				}												
				
				var strSQL = "select * from optik_pesan_d where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1=data1.rs.rows[0];
					var line2=data1.rs.rows[1];

					this.e_odsph.setText(line1.sph);
					this.e_odcyl.setText(line1.cyl);
					this.e_odaxis.setText(line1.axis);
					this.e_odadd.setText(line1.rabun);
					this.e_odpd.setText(line1.pd);

					this.e_ossph.setText(line2.sph);
					this.e_oscyl.setText(line2.cyl);
					this.e_osaxis.setText(line2.axis);
					this.e_osadd.setText(line2.rabun);
					this.e_ospd.setText(line2.pd);
				} 												
									
			}									
		} catch(e) {alert(e);}
	}
	
});