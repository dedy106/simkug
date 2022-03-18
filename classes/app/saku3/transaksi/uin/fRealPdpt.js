window.app_saku3_transaksi_uin_fRealPdpt = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fRealPdpt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fRealPdpt";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Realisasi Pendapatan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.c_tahun = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		this.cb_pp = new saiCBBL(this,{bound:[20,16,220,20],caption:"Fak/Unit", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Pengajuan","Daftar Pengajuan"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
					 colTitle:["No Bukti","Tanggal","Keterangan","Total","Detail"],
					 colWidth:[[4,3,2,1,0],[60,100,300,100,100]],readOnly:true,
					 colFormat:[[3,4],[cfNilai,cfButton]],	
					 click:[this,"doSgBtnClick1"], colAlign:[[4],[alCenter]],													 
					 dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Pengajuan",click:[this,"doLoad"]});				

		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_rek = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Rekening", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Keterangan", maxLength:200});				
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,12,996,305], childPage:["Controlling","Detail RAB"]});						
		this.cb_giat = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Kegiatan", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_budget = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Total Budget", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});							
		this.e_real = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Total Realisasi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});									
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,200,20],caption:"Total RAB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
			
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:9,tag:0,
		            colTitle:["Deskripsi","Kd Norma","Norma","Satuan","Harga","Vol","Jumlah","IDBukti","Idx"],										
					colWidth:[[8,7,6,5,4,3,2,1,0],[50,100,90,90,90,100,180,80,300]],
					columnReadOnly:[true,[2,3,4,5,7,8],[0,1,6]],		
					colHide:[[7,8],[true,true]],			
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[1],[bsEllips]],ellipsClick:[this,"doEllipsClick"],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],					
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			
			var strSQL = "select distinct a.kdsatker,a.kdprogram,a.kddept,a.kdunit "+
						 "from uin_user a where a.nik ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.kddept = line.kddept;
					this.kdunit = line.kdunit;						
					this.kdsatker = line.kdsatker;
					this.kdprogram = line.kdprogram;																
				}
			}

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Fakultas/Unit",true);			
			this.cb_pp.setText(this.app._kodePP);

			this.cb_rek.setSQL("select kode_rek, nama from uin_rek where kode_lokasi='"+this.app._lokasi+"'",["kode_rek","nama"],false,["Kode","Nama"],"and","Data Rekening",true);			
			this.cb_giat.setSQL("select distinct a.kdgiat, a.nmgiat from uin_giat a inner join uin_user b on a.kddept=b.kddept and a.kdunit=b.kdunit and a.kdprogram=b.kdprogram  and a.kdgiat=b.kdgiat where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kdgiat","nmgiat"],false,["Kode","Nama"],"and","Data Kegiatan",true);		
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fRealPdpt.extend(window.childForm);
window.app_saku3_transaksi_uin_fRealPdpt.implement({	
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from uin_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from uin_aju_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}
					
					var data = this.dbLib.getDataProvider("select kdakun from uin_rek where kode_rek='"+this.cb_rek.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){			
							this.kdAkun = line.kdakun;
						} 
					}

					sql.add("insert into uin_aju_m(no_aju,kode_lokasi,tanggal,periode,nik_user,tgl_input,no_dokumen,keterangan,nik_buat,jab_buat,nik_app,jab_app,kode_pp,progress,nilai,ppn,pph,jenis,no_fisik,no_ver,no_nota,no_spm,no_sppd) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.periode+"','"+this.app._userLog+"',getdate(),'-','"+this.e_ket.getText()+"','-','-','-','-','"+this.cb_pp.getText()+"','9',"+nilaiToFloat(this.e_total.getText())+",0,0,'PDPT','"+this.cb_rek.getText()+"','X','X','X','X')");					

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.periode+"','KB','PDPT','F','-','-','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+",0,0,'"+this.app._userLog+"','-','-','-','-','-','"+this.cb_rek.getText()+"','-','-')");
		
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.periode+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.kdAkun+"','D',"+parseNilai(this.e_total.getText())+","+
							parseNilai(this.e_total.getText())+",'"+this.e_ket.getText()+"','PDPT','KB','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)) {													
								sql.add("insert into uin_aju_d(no_aju,kode_lokasi,no_urut,kode_norma,keterangan,satuan,tarif,vol,total,tahun,kode_atensi,ppn,pph,dc,idbukti,nu, kdoutput,kdsoutput,kdkmpnen,kdskmpnen,kode_akun, kdsatker,kddept,kdunit,kdprogram,kdgiat) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(1,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+",'"+this.c_tahun.getText()+"','-',0,0,'D','"+this.sg.cells(7,i)+"',"+this.sg.cells(8,i)+", '-','-','-','-','"+this.cb_akun.getText()+"','"+this.kdsatker+"','"+this.kddept+"','"+this.kdunit+"','"+this.kdprogram+"','"+this.cb_giat.getText()+"')");
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.periode+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.cb_akun.getText()+"','C',"+parseNilai(this.sg.cells(6,i))+","+
										parseNilai(this.sg.cells(6,i))+",'"+this.sg.cells(0,i)+"','PDPT','PDPT','IDR',1,'"+this.cb_pp.getText()+"','-','-','-','-','-','-','-','-')");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from uin_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from uin_aju_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1);
					setTipeButton(tbAllFalse);	
					this.pc1.setActivePage(this.pc1.childPage[0]);				
					this.pc2.setActivePage(this.pc2.childPage[0]);				
				}
				break;
			case "simpan" :	
			case "ubah" :
				this.sg.validasi();				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Pengajuan tidak boleh nol atau kurang.");
					return false;
				}
				else
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.c_tahun.setText(y);
		this.periode = (y+""+m);		

		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);			
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1); 				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BM"+this.c_tahun.getText().substr(2,2)+".","00000"));			
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},
	loadRefGar: function() {
		var strSQL = "select distinct a.idbukti,a.nu,a.keterangan,a.kode_norma,c.nama,a.satuan,a.tarif,0 as vol,0 as total "+
					 "from uin_usul_d a "+
					 "inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi and b.no_close <> '-' "+
					 "inner join uin_norma c on a.kode_norma=c.kode_norma and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+
					 "where a.tahun='"+this.c_tahun.getText()+"' and a.kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit='"+this.kdunit+"' and a.kdprogram='"+this.kdprogram+"' and a.kdgiat='"+this.cb_giat.getText()+"' "+
					 "and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_akun='"+this.cb_akun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.idbukti,a.nu";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];		
				this.sg.appendData([line.keterangan,line.kode_norma,line.nama,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total),line.idbukti,line.nu]);
			}
			this.sg.validasi();
		} else this.sg.clear(1);	
	},
	cekBudget: function() {			
		var data = this.dbLib.getDataProvider("select fn_uinGarRekap('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.kdsatker+"','"+this.kddept+"','"+this.kdunit+"','"+this.kdprogram+"','"+this.cb_giat.getText()+"','-','-','-','-','"+this.cb_akun.getText()+"','"+this.e_nb.getText()+"') as gar ",true);					
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];
			data = line.gar.split(";");			
			this.e_budget.setText(floatToNilai(parseFloat(data[0])));
			this.e_real.setText(floatToNilai(parseFloat(data[1])));
		}
	},
	doChange: function(sender){
		try{				
			if (sender == this.cb_giat && this.cb_giat.getText() != ""){												
				this.cb_akun.setSQL("select a.kdakun, b.nmakun from uin_pdpt a inner join uin_akun b on a.kdakun=b.kdakun "+
									"where a.thang='"+this.c_tahun.getText()+"' and a.kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit ='"+this.kdunit+"' and a.kdprogram = '"+this.kdprogram+"' and a.kdgiat='"+this.cb_giat.getText()+"' "
									,["a.kdakun","a.nmakun"],false,["Kode","Nama"],"and","Data Akun",true);
			}		
			if (sender==this.cb_akun) {
				if (this.cb_akun.getText()!="") {
					var sql = new server_util_arrayList();			
					sql.add("select distinct c.kode_norma,c.nama  from uin_usul_d a "+
							"inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi and b.no_close<>'-' "+
							"inner join uin_norma c on a.kode_norma=c.kode_norma and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+
							"where b.tahun='"+this.c_tahun.getText()+"' and b.kdsatker='"+this.kdsatker+"' and b.kddept='"+this.kddept+"' and b.kdunit='"+this.kdunit+"' and b.kdprogram='"+this.kdprogram+"' and b.kdgiat='"+this.cb_giat.getText()+"'  "+
							"and b.kode_pp='"+this.cb_pp.getText()+"' and b.kode_akun='"+this.cb_akun.getText()+"'  and b.kode_lokasi='"+this.app._lokasi+"' and c.flag_aktif='1'");												
					this.dbLib.getMultiDataProviderA(sql);
					
					this.cekBudget();
					if (this.stsSimpan == 1) this.loadRefGar();
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doEllipsClick: function(sender, col, row) {
		try {		
			switch(col){				
				case 1 :
						this.standarLib.showListDataForSG(this, "Daftar Norma",this.sg, this.sg.row, this.sg.col, 
														"select distinct  c.kode_norma,c.nama  from uin_usul_d a "+
														"inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi and b.no_close <> '-' "+
														"inner join uin_norma c on a.kode_norma=c.kode_norma and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+
														"where b.tahun='"+this.c_tahun.getText()+"' and b.kdsatker='"+this.kdsatker+"' and b.kddept='"+this.kddept+"' and b.kdunit='"+this.kdunit+"' and b.kdprogram='"+this.kdprogram+"' and b.kdgiat='"+this.cb_giat.getText()+"' "+
														"and b.kode_pp='"+this.cb_pp.getText()+"' and a.kode_akun='"+this.cb_akun.getText()+"'  and b.kode_lokasi='"+this.app._lokasi+"' and c.flag_aktif='1'",

														"select count(*) from ( "+
														"	select distinct c.kode_norma from uin_usul_d a "+
														"	inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi and b.no_close <> '-' "+
														"	inner join uin_norma c on a.kode_norma=c.kode_norma and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+
														"	where b.tahun='"+this.c_tahun.getText()+"' and b.kdsatker='"+this.kdsatker+"' and b.kddept='"+this.kddept+"' and b.kdunit='"+this.kdunit+"' and b.kdprogram='"+this.kdprogram+"' and b.kdgiat='"+this.cb_giat.getText()+"' "+
														"	and b.kode_pp='"+this.cb_pp.getText()+"' and a.kode_akun='"+this.cb_akun.getText()+"'  and b.kode_lokasi='"+this.app._lokasi+"' and c.flag_aktif='1' "+														
														") a ",

														new Array("kode_norma","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},				
	doChangeCell: function(sender, col, row){
		try {
			if (col == 6 && this.sg.cells(6,row) != "") {
				var jum = nilaiToFloat(this.sg.cells(6,row)) / nilaiToFloat(this.sg.cells(4,row));
				this.sg.cells(5,row,jum);
				this.sg.validasi();
			}
			
			sender.onChange.set(undefined,undefined);			
			if (col == 1) {
				if (sender.cells(1,row) != "") {				
					var norma = this.dataNorma.get(sender.cells(1,row));
					if (norma) {
						sender.cells(2,row,norma);

						var data = this.dbLib.getDataProvider("select * from uin_norma where kode_norma='"+sender.cells(1,row)+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"' ",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){							
								sender.cells(3,row,line.satuan);
								sender.cells(4,row,line.nilai);
							}
						}
					}
					else {                                    
						if (trim(sender.cells(1,row)) != "") system.alert(this,"Kode Norma "+sender.cells(1,row)+" tidak ditemukan","Inputkan kode lainnya.","checkNorma");                
						sender.cells(1,row,"");
						sender.cells(2,row,"");
						sender.cells(3,row,"");
						sender.cells(4,row,"");						
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
			var tot=ppn=pph=neto=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != ""){					
					tot += nilaiToFloat(this.sg.cells(6,i));						
				}
			}
			this.e_total.setText(floatToNilai(tot));						
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;
					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							
							this.dataNorma = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataNorma.set(line.kode_norma, line.nama);										
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
	doLoad:function(sender){	
		try{		
			var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
						 "from uin_aju_m a "+
						 "where jenis='PDPT' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode like '"+this.c_tahun.getText()+"%' and a.kode_pp='"+this.cb_pp.getText()+"' order by a.no_aju desc";							 						
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);						
		}
		catch(e) {
			alert(e);
		}
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),"Detail"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgBtnClick1: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick(this.sg1,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.e_nb.setText(this.sg1.cells(0,row));	
														
				var data = this.dbLib.getDataProvider("select a.tanggal,a.keterangan,b.param1 "+
													  "from uin_aju_m a inner join trans_m b on a.no_aju=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
													  "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.dp_d1.setText(line.tanggal);											
						this.e_ket.setText(line.keterangan);						
						this.cb_rek.setText(line.param1);	
					} 
				}			
				var strSQL = "select a.*,b.nama "+
							 "from uin_aju_d a inner join uin_norma b on a.kode_norma=b.kode_norma and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
							 "where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.keterangan,line.kode_norma,line.nama,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total),line.idbukti,line.nu]);
					}				
					this.cb_giat.setText(line.kdgiat);	
					this.cb_akun.setText(line.kode_akun);		
				} else this.sg.clear(1);	
				this.sg.validasi();
				
			}
		} catch(e) {alert(e);}
	}
});