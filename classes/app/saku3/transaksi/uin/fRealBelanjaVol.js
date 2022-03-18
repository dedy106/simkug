window.app_saku3_transaksi_uin_fRealBelanjaVol = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fRealBelanjaVol.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fRealBelanjaVol";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form RAB Realisasi [By Vol]", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.c_tahun = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		this.cb_pp = new saiCBBL(this,{bound:[20,16,220,20],caption:"Fak/Unit", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Pengajuan","Daftar Pengajuan"]});				
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
					 colTitle:["No Agenda","Tanggal","Keterangan","Total","Pilih"],
					 colWidth:[[4,3,2,1,0],[70,100,300,100,100]],readOnly:true,
					 colFormat:[[3,4],[cfNilai,cfButton]],	
					 click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 
					 dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});			
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Pengajuan",click:[this,"doLoad3"]});				

		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,11,200,20],caption:"Total Pengajuan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Agenda",maxLength:30,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,12,200,20],caption:"Total PPN", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,22,200,20],caption:"Jenis",items:["BLU","RM"], readOnly:true,tag:2});
		this.e_pph = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,22,200,20],caption:"Total PPh", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:200});				
		this.e_neto = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,17,200,20],caption:"Net Pengajuan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,12,995,305], childPage:["Detail RAB","Rekap RAB","Controlling","Otorisasi","Verifikasi"]});										
		this.cb_giat = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Kegiatan", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_out = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Output", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_dout = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Detail Output", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_komp = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Komponen", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_dkomp = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Detail Komponen", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Akun", multiSelection:false, maxLength:10, tag:7,change:[this,"doChange"]});
		this.e_totaju = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,15,200,20],caption:"Total Jumlah", tag:7, readOnly:true, tipeText:ttNilai, text:"0"});							
		this.bAju = new button(this.pc2.childPage[0],{bound:[655,15,80,18],caption:"+ Tambahkan",click:[this,"addAju"]});						

		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,127],colCount:15,tag:8,
		            colTitle:["KdTrm","Nama Penerima","Deskripsi","Kd Norma","Norma","Satuan","Harga","Vol","Jumlah","PPN","PPh","Total","Saldo Budget","IDitem","Idx"],
					colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[50,100,80,80,60,60,80,60,80,60,150,60,220,150,60]],					
					columnReadOnly:[true,[1,3,4,5,6,8,11,12,13,14],[0,2,7,9,10]],		
					colHide:[[3,13,14],[true,true,true]],			
					colFormat:[[6,7,8,9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0],[bsEllips]],ellipsClick:[this,"doEllipsClick"],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],					
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		
		this.bSize = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/tabCont2.png", hint:"Sizing",click:[this,"doSizing"]});				

		this.sg1 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:20,tag:0,
					colTitle:["KdTrm","Nama Penerima","Deskripsi","Kd Norma","Norma","Satuan","Harga","Vol","Jumlah","PPN","PPh","Total","Output","DOutput","Komponen","Dkomponen","KdAkun","IDitem","ID","KdGiat"],
					colWidth:[[19,18,17,16,15,14,13,12, 11,10,9,8,7,6,5,4,3,2,1,0],[80,50,120,80,80,80,80,80,  80,80,80,80,60,80,60,150,60,250,150,60]],					
					readOnly:true,		
					colHide:[[0,3,12,13,14,15,16,17,18,19],[true,true,true,true,true,true,true,true,true,true]],		
					colFormat:[[6,7,8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],				
					nilaiChange:[this,"doNilaiChange1"],					
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg1});		
	
		this.sg2 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:8,tag:9, 
					colTitle:["KdGiat","KdOut","KdSOut","KdKmpnen","KdSKmpnen","KdAkun","Saldo Budget","Ni Pengajuan"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100]],
					colFormat:[[6,7],[cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});		
		this.bHitGar = new portalui_imageButton(this.sgn2,{bound:[this.sgn2.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Hitung Budget",click:[this,"doHitungGar"]});				

		this.cb_buat = new saiCBBL(this.pc2.childPage[3],{bound:[20,10,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_app = new saiCBBL(this.pc2.childPage[3],{bound:[20,13,220,20],caption:"NIK PPK", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_bdh = new saiCBBL(this.pc2.childPage[3],{bound:[20,14,220,20],caption:"NIK Bendahara", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		

		this.e_nover = new saiLabelEdit(this.pc2.childPage[4],{bound:[20,17,200,20],caption:"No Verifikasi", tag:9, readOnly:true});				
		this.e_catatan = new saiLabelEdit(this.pc2.childPage[4],{bound:[20,18,450,20],caption:"Catatan", tag:9, readOnly:true});				
		this.sg4 = new saiGrid(this.pc2.childPage[4],{bound:[1,5,this.pc2.width-5,219],colCount:4,tag:9, 
					colTitle:["Status","Catatan","Kd Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[350,80,250,80]],										
					readOnly:true,					
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[4],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3});		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[3].rearrangeChild(10, 23);	
		this.pc2.childPage[4].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Fakultas/Unit",true);			
			this.cb_pp.setText(this.app._kodePP);
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.cb_pp.getText()+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);				
			this.cb_buat.setText(this.app._userLog);
			
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

			this.cb_giat.setSQL("select distinct a.kdgiat, a.nmgiat from uin_giat a inner join uin_user b on a.kddept=b.kddept and a.kdunit=b.kdunit and a.kdprogram=b.kdprogram and a.kdgiat=b.kdgiat where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kdgiat","nmgiat"],false,["Kode","Nama"],"and","Data Kegiatan",true);		

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fRealBelanjaVol.extend(window.childForm);
window.app_saku3_transaksi_uin_fRealBelanjaVol.implement({		
	doHitungGar: function() {		
		this.sg2.clear();
		var nilai = 0;
		for (var i=0;i < this.sg1.rows.getLength();i++){						
			if (this.sg1.rowValid(i)) {
				nilai = nilaiToFloat(this.sg1.cells(8,i));
				var isAda = false;
				var idx = totalnilai = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg2.cells(1,j) == this.sg1.cells(12,i) && this.sg2.cells(2,j) == this.sg1.cells(13,i) && 
						this.sg2.cells(3,j) == this.sg1.cells(14,i) && this.sg2.cells(4,j) == this.sg1.cells(15,i) && 
						this.sg2.cells(5,j) == this.sg1.cells(16,i) && this.sg2.cells(0,j) == this.sg1.cells(19,i) ) {
						isAda = true;
						idx = j;
						break;
					}
				}				
				if (!isAda) {
					this.sg2.appendData([this.sg1.cells(19,i),this.sg1.cells(12,i),this.sg1.cells(13,i),this.sg1.cells(14,i),this.sg1.cells(15,i),this.sg1.cells(16,i),"0",floatToNilai(nilai)]);
				} 
				else { 
					totalnilai = nilaiToFloat(this.sg2.cells(7,idx));
					totalnilai = totalnilai + nilai;
					this.sg2.setCell(7,idx,totalnilai);
				}								
			}				
		}

		for (var i=0;i < this.sg2.getRowCount();i++){
			var data = this.dbLib.getDataProvider("select fn_uinGarRekap('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.kdsatker+"','"+this.kddept+"','"+this.kdunit+"','"+this.kdprogram+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(4,i)+"','"+this.sg2.cells(5,i)+"','"+this.e_nb.getText()+"') as gar ",true);					
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(6,i,floatToNilai(sls));				
			}
		}

	},
	cekCBBL: function() {		
		this.statusCB = true;
		var data = this.dbLib.getDataProvider("select a.kdakun from uin_d_akun a inner join uin_akun b on a.kdakun=b.kdakun "+
											  "where a.thang='"+this.c_tahun.getText()+"' and kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit ='"+this.kdunit+"' and a.kdprogram = '"+this.kdprogram+"' and a.kdgiat='"+this.cb_giat.getText()+"' and a.kdoutput='"+this.cb_out.getText()+"' and a.kdsoutput='"+this.cb_dout.getText()+"' and a.kdkmpnen='"+this.cb_komp.getText()+"' and a.kdskmpnen='"+this.cb_dkomp.getText()+"' and a.kdakun='"+this.cb_akun.getText()+"' ",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line == undefined){			
				this.statusCB = false;
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from uin_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from uin_aju_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from uin_aju_r where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("insert into uin_aju_m(no_aju,kode_lokasi,tanggal,periode,nik_user,tgl_input,no_dokumen,keterangan,nik_buat,jab_buat,nik_app,jab_app,kode_pp,progress,nilai,ppn,pph,jenis,no_fisik,no_ver,no_nota,no_spm,no_sppd,nik_bdh,jabatan_bdh,nilai_pj) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.periode+"','"+this.app._userLog+"',getdate(),'-','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','-','"+this.cb_app.getText()+"','-','"+this.cb_pp.getText()+"','0',"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_pph.getText())+",'"+this.c_jenis.getText()+"','-','-','-','-','-','"+this.cb_bdh.getText()+"','-',0)");					

					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)) {
								sql.add("insert into uin_aju_d(no_aju,kode_lokasi,no_urut,kode_norma,keterangan,satuan,tarif,vol,total,tahun,kode_atensi,ppn,pph,dc,idbukti,nu, kdoutput,kdsoutput,kdkmpnen,kdskmpnen,kode_akun,kode_pp,kdsatker,kddept,kdunit,kdprogram,kdgiat) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg1.cells(3,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(5,i)+"',"+nilaiToFloat(this.sg1.cells(6,i))+","+nilaiToFloat(this.sg1.cells(7,i))+","+nilaiToFloat(this.sg1.cells(8,i))+",'"+this.c_tahun.getText()+"','"+this.sg1.cells(0,i)+"',"+nilaiToFloat(this.sg1.cells(9,i))+","+nilaiToFloat(this.sg1.cells(10,i))+",'D','"+this.sg1.cells(17,i)+"',"+this.sg1.cells(18,i)+", '"+this.sg1.cells(12,i)+"','"+this.sg1.cells(13,i)+"','"+this.sg1.cells(14,i)+"','"+this.sg1.cells(15,i)+"','"+this.sg1.cells(16,i)+"', '"+this.cb_pp.getText()+"','"+this.kdsatker+"','"+this.kddept+"','"+this.kdunit+"','"+this.kdprogram+"','"+this.sg1.cells(19,i)+"')");
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)) {
								sql.add("insert into uin_aju_r(no_aju,kode_lokasi,no_urut,kdgiat,kdoutput,kdsoutput,kdkmpnen,kdskmpnen,kode_akun,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(4,i)+"','"+this.sg2.cells(5,i)+"',"+nilaiToFloat(this.sg2.cells(6,i))+","+nilaiToFloat(this.sg2.cells(7,i))+")");
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
					sql.add("delete from uin_aju_r where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg1.clear(1); this.sg.clear(1); this.sg2.clear(1);
					setTipeButton(tbAllFalse);	
					this.pc1.setActivePage(this.pc1.childPage[0]);				
					this.pc2.setActivePage(this.pc2.childPage[0]);				
				}
				break;
			case "simpan" :	
			case "ubah" :					
				this.doHitungGar();		
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (nilaiToFloat(this.sg2.cells(7,i)) > nilaiToFloat(this.sg2.cells(6,i))) {
						system.alert(this,"Transaksi tidak valid.","Nilai Pengajuan melebihi Saldo Anggaran. (KdAkun : "+this.sg2.cells(5,i)+") ");
						return false;
					}
				}					
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Pengajuan harus lebih dari nol.");
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
				this.sg1.clear(1);				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"uin_aju_m","no_aju",this.app._lokasi+"-"+this.c_tahun.getText().substr(2,2)+".","00000"));			
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},
	loadRefGar: function() {
		var strSQL = "select distinct a.idbukti,a.nu,a.keterangan,a.kode_norma,c.nama,a.satuan,a.tarif,0 as vol,0 as total  "+
					 "from uin_usul_d a "+
					 "inner join uin_usul_m b on a.idbukti=b.no_usul and a.kode_lokasi=b.kode_lokasi and b.no_close <> '-' "+
					 "inner join uin_norma c on a.kode_norma=c.kode_norma and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+					 
					 "where a.tahun='"+this.c_tahun.getText()+"' and a.kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit='"+this.kdunit+"' and a.kdprogram='"+this.kdprogram+"' and a.kdgiat='"+this.cb_giat.getText()+"' and a.kdoutput='"+this.cb_out.getText()+"' and a.kdsoutput='"+this.cb_dout.getText()+"' and a.kdkmpnen='"+this.cb_komp.getText()+"' and a.kdskmpnen='"+this.cb_dkomp.getText()+"' "+
					 "and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_akun='"+this.cb_akun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					 "order by a.idbukti,a.nu";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			var vol = total = 0;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];		

				//saldo database
				var dataGar = this.dbLib.getDataProvider("select fn_uinGarDetail('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.kdsatker+"','"+this.kddept+"','"+this.kdunit+"','"+this.kdprogram+"','"+this.cb_giat.getText()+"','"+this.cb_out.getText()+"','"+this.cb_dout.getText()+"','"+this.cb_komp.getText()+"','"+this.cb_dkomp.getText()+"','"+this.cb_akun.getText()+"','"+line.idbukti+"',"+line.nu+",'"+this.e_nb.getText()+"') as gar ",true);					
				if (typeof dataGar == "object" && dataGar.rs.rows[0] != undefined){
					var lineGar = dataGar.rs.rows[0];						
					dataGar = lineGar.gar.split(";");						
					total = parseFloat(dataGar[0]);
					vol = parseFloat(dataGar[1]);				
				}
				
				//pengurang temp
				for (var j=0;j < this.sg1.getRowCount();j++) {
					if (line.idbukti+line.nu == this.sg1.cells(17,j)+this.sg1.cells(18,j)) {
						var vol = vol - nilaiToFloat(this.sg1.cells(7,j));
						var total = total - nilaiToFloat(this.sg1.cells(8,j));
					}
				}

				this.sg.appendData(["-","-",line.keterangan,line.kode_norma,line.nama,line.satuan,floatToNilai(line.tarif),vol,total,"0","0",total,total,line.idbukti,line.nu]);
			}
			this.sg.validasi();
		} else this.sg.clear(1);	
	},	
	doChange: function(sender){
		try{
			if (sender==this.cb_pp && this.cb_pp.getText()!="") {				
				this.cb_buat.setSQL("select a.nik, a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.cb_pp.getText()+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
				this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.cb_pp.getText()+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
				this.cb_bdh.setSQL("select a.nik, a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.cb_pp.getText()+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			}

			if (sender == this.cb_giat && this.cb_giat.getText() != ""){
				this.cb_out.setSQL("select a.kdoutput, a.nmoutput from uin_output a inner join uin_pp_output b on a.kdoutput=b.kdoutput and a.kdgiat=b.kdgiat and b.kode_pp='"+this.cb_pp.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' where a.kdgiat='"+this.cb_giat.getText()+"'",["kdoutput","nmoutput"],false,["Kode","Nama"],"and","Data Output",true);
			}
			if (sender == this.cb_out && this.cb_out.getText() != ""){
				this.cb_dout.setSQL("select kdsoutput, nmsoutput from uin_soutput "+
									"where thang='"+this.c_tahun.getText()+"' and kddept='"+this.kddept+"' and kdunit ='"+this.kdunit+"' and kdprogram = '"+this.kdprogram+"' and kdgiat='"+this.cb_giat.getText()+"' and kdoutput='"+this.cb_out.getText()+"'"
									,["kdsoutput","nmsoutput"],false,["Kode","Nama"],"and","Data Output",true);
			}
			if (sender == this.cb_dout && this.cb_dout.getText() != ""){
				this.cb_komp.setSQL("select kdkmpnen, nmkmpnen from uin_kmpnen "+
									"where thang='"+this.c_tahun.getText()+"' and kddept='"+this.kddept+"' and kdunit ='"+this.kdunit+"' and kdprogram = '"+this.kdprogram+"' and kdgiat='"+this.cb_giat.getText()+"' and kdoutput='"+this.cb_out.getText()+"' and kdsoutput='"+this.cb_dout.getText()+"' "
									,["kdkmpnen","nmkmpnen"],false,["Kode","Nama"],"and","Data Komponen",true);
			}
			if (sender == this.cb_komp && this.cb_komp.getText() != ""){
				this.cb_dkomp.setSQL("select kdskmpnen, urskmpnen from uin_d_skmpnen "+
									"where thang='"+this.c_tahun.getText()+"' and kdsatker='"+this.kdsatker+"' and kddept='"+this.kddept+"' and kdunit ='"+this.kdunit+"' and kdprogram = '"+this.kdprogram+"' and kdgiat='"+this.cb_giat.getText()+"' and kdoutput='"+this.cb_out.getText()+"' and kdsoutput='"+this.cb_dout.getText()+"' and kdkmpnen='"+this.cb_komp.getText()+"' "
									,["kdskmpnen","urskmpnen"],false,["Kode","Nama"],"and","Data Detail Komponen",true);
			}
			if (sender == this.cb_dkomp && this.cb_dkomp.getText() != ""){
				this.cb_akun.setSQL("select a.kdakun, b.nmakun "+
									"from uin_d_akun a inner join uin_akun b on a.kdakun=b.kdakun "+
									//"				   inner join uin_akun_jenis c on b.kdakun=c.kdakun and c.jenis='"+this.c_jenis.getText()+"' "+
									"where a.thang='"+this.c_tahun.getText()+"' and kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit ='"+this.kdunit+"' and a.kdprogram = '"+this.kdprogram+"' and a.kdgiat='"+this.cb_giat.getText()+"' and a.kdoutput='"+this.cb_out.getText()+"' and a.kdsoutput='"+this.cb_dout.getText()+"' and a.kdkmpnen='"+this.cb_komp.getText()+"' and a.kdskmpnen='"+this.cb_dkomp.getText()+"' "
									,["a.kdakun","a.nmakun"],false,["Kode","Nama"],"and","Data Akun",true);
			}
			if (sender==this.cb_giat || sender==this.cb_out || sender==this.cb_dout || sender==this.cb_komp || sender==this.cb_dkomp || sender==this.cb_akun) {
				if (this.cb_giat.getText()!="" && this.cb_out.getText()!="" && this.cb_dout.getText()!="" && this.cb_komp.getText()!="" && this.cb_dkomp.getText()!="" && this.cb_akun.getText()!="") {
					
					var sql = new server_util_arrayList();			
					sql.add("select distinct c.kode_norma,c.nama  "+
							"from uin_usul_d a "+
							"inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi and b.no_close <> '-' "+
							"inner join uin_norma c on a.kode_norma=c.kode_norma and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun "+
							"where a.tahun='"+this.c_tahun.getText()+"' and a.kdsatker='"+this.kdsatker+"' and a.kddept='"+this.kddept+"' and a.kdunit='"+this.kdunit+"' and a.kdprogram='"+this.kdprogram+"' and a.kdgiat='"+this.cb_giat.getText()+"' and a.kdoutput='"+this.cb_out.getText()+"' and a.kdsoutput='"+this.cb_dout.getText()+"' and a.kdkmpnen='"+this.cb_komp.getText()+"' and a.kdskmpnen='"+this.cb_dkomp.getText()+"' "+
							"and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_akun='"+this.cb_akun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and c.flag_aktif='1'");

					sql.add("select kode_atensi,nama from uin_atensi where kode_lokasi='"+this.app._lokasi+"' union select '-','-'");		
					this.dbLib.getMultiDataProviderA(sql);
					
					this.loadRefGar();
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doEllipsClick: function(sender, col, row) {
		try {		
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Atensi",sender, sender.row, sender.col, 
														"select kode_atensi, nama  from uin_atensi where kode_lokasi='"+this.app._lokasi+"'",
														"select count(*) from uin_atensi where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_atensi","nama"),"and",new Array("Kode","Nama"),false);					
						break;									
			}						
		}catch(e)
		{
			systemAPI.alert("doEllipsClick: " + e);
		}
	},				
	doChangeCell: function(sender, col, row){
		try {
			if ((col == 7 || col == 9 || col == 10) && (this.sg.cells(7,row) != "" && this.sg.cells(9,row) != "" && this.sg.cells(10,row) != "")) {
				var vol = nilaiToFloat(this.sg.cells(7,row)) * nilaiToFloat(this.sg.cells(6,row));
				this.sg.cells(8,row,vol);

				var neto = nilaiToFloat(this.sg.cells(8,row)) + nilaiToFloat(this.sg.cells(9,row)) - nilaiToFloat(this.sg.cells(10,row));
				this.sg.cells(11,row,neto);

				this.sg.validasi();
			}
			
			sender.onChange.set(undefined,undefined);
			if (col == 0) {
				if (sender.cells(0,row) != "") {				
					var atensi = this.dataAtensi.get(sender.cells(0,row));
					if (atensi) sender.cells(1,row,atensi);																
					else {                                    
						if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Atensi "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
						sender.cells(0,row,"");
						sender.cells(1,row,"");					
					}				
				}
			}	
			if (col == 3) {
				if (sender.cells(3,row) != "") {				
					var norma = this.dataNorma.get(sender.cells(3,row));
					if (norma) {
						sender.cells(4,row,norma);

						var data = this.dbLib.getDataProvider("select * from uin_norma where kode_norma='"+sender.cells(3,row)+"' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"' ",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){							
								sender.cells(5,row,line.satuan);
								sender.cells(6,row,line.nilai);
							}
						}
					}
					else {                                    
						if (trim(sender.cells(3,row)) != "") system.alert(this,"Kode Norma "+sender.cells(3,row)+" tidak ditemukan","Inputkan kode lainnya.","checkNorma");                
						sender.cells(3,row,"");
						sender.cells(4,row,"");
						sender.cells(5,row,"");
						sender.cells(6,row,"");
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
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != ""){					
					tot += nilaiToFloat(this.sg.cells(8,i));						
				}
			}
			this.e_totaju.setText(floatToNilai(tot));						
		}catch(e)
		{
			alert("doNilaiChange: "+e);
		}
	},
	doNilaiChange1: function(){
		try{
			var tot=ppn=pph=neto=0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(8,i) != ""){					
					tot += nilaiToFloat(this.sg1.cells(8,i));	
					ppn += nilaiToFloat(this.sg1.cells(9,i));					
					pph += nilaiToFloat(this.sg1.cells(10,i));					
					neto += nilaiToFloat(this.sg1.cells(11,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
			this.e_ppn.setText(floatToNilai(ppn));			
			this.e_pph.setText(floatToNilai(pph));			
			this.e_neto.setText(floatToNilai(neto));			
		}catch(e)
		{
			alert("doNilaiChange1: "+e);
		}
	},
	addAju: function() {
		try {
			if (this.e_totaju.getText()!="0") {
				this.cekCBBL();
				if (!this.statusCB) {
					system.alert(this,"Transaksi tidak valid.","Data Referesnsi tidak konsisten (Output s/d Akun).");
					return false;
				}

				if (this.sg.getRowValidCount() > 0){
					var stsValid = true;
					for (var i=0;i < this.sg.getRowCount();i++){						
						if (this.sg.rowValid(i) && this.sg.cells(8,i) != "0") {
							if (this.sg.cells(0,i) == "-") stsValid = false;
							if (nilaiToFloat(this.sg.cells(8,i))>nilaiToFloat(this.sg.cells(12,i))) {
								stsValid = false;
								var k = i+1;
								system.alert(this,"Data tidak valid.","Jumlah melebihi saldo anggaran. (Baris : "+k+")");
								return false;
							}
						}
					}

					if (stsValid) {
						if (this.sg1.cells(0,0) == "") this.sg1.clear();
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(8,i) != "0") {						
								this.sg1.appendData([this.sg.cells(0,i),this.sg.cells(1,i), this.sg.cells(2,i),this.sg.cells(3,i),this.sg.cells(4,i),this.sg.cells(5,i),this.sg.cells(6,i),this.sg.cells(7,i),this.sg.cells(8,i),this.sg.cells(9,i),this.sg.cells(10,i),this.sg.cells(11,i),this.cb_out.getText(),this.cb_dout.getText(),this.cb_komp.getText(),this.cb_dkomp.getText(),this.cb_akun.getText(),this.sg.cells(13,i),this.sg.cells(14,i),this.cb_giat.getText()]);								
							}
						}
					}
					else {
						system.alert(this,"Data tidak valid.","Penerima tidak boleh '-', Hapus record jika tidak terpakai.");
						return false;
					}
				}

				this.sg.clear(1);
				this.cb_akun.setText("","");
				this.pc2.setActivePage(this.pc2.childPage[1]);
			} 
			else system.alert(this,"Data tidak boleh nol.","");
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
							this.dataAtensi = new portalui_arrayMap();	

							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataNorma.set(line.kode_norma, line.nama);										
								}								
							}	
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];									
									this.dataAtensi.set(line.kode_atensi, line.nama);										
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
	doLoad3:function(sender){	
		try{		
			var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai+a.ppn-a.pph  as nilai  "+
						 "from uin_aju_m a "+
						 "where a.progress in ('0','V') and a.kode_lokasi='"+this.app._lokasi+"' and a.periode like '"+this.c_tahun.getText()+"%' and a.kode_pp='"+this.cb_pp.getText()+"' order by a.no_aju desc";							 						
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn3.rearrange();
				this.doTampilData3(1);
			} else this.sg3.clear(1);						
		}
		catch(e) {
			alert(e);
		}
	},		
	doTampilData3: function(page) {		
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg3.appendData([line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick3(this.sg3,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.pc2.setActivePage(this.pc2.childPage[1]);
				this.e_nb.setText(this.sg3.cells(0,row));	
														
				var data = this.dbLib.getDataProvider(
								"select a.*,isnull(b.keterangan,'-') as catatan "+
								"from uin_aju_m a left join uin_ver_m b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
								"where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.dp_d1.setText(line.tanggal);											
						this.e_ket.setText(line.keterangan);
						this.c_jenis.setText(line.jenis);
						this.cb_buat.setText(line.nik_buat);	
						this.cb_app.setText(line.nik_app);	
						this.cb_bdh.setText(line.nik_bdh);	
						this.e_nover.setText(line.no_ver);
						this.e_catatan.setText(line.catatan);
					} 
				}			
				var strSQL = "select a.*,b.nama,c.nama as atensi, a.total+a.ppn-a.pph as neto "+
							 "from uin_aju_d a inner join uin_norma b on a.kode_norma=b.kode_norma and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
							 "				   inner join uin_atensi c on a.kode_atensi=c.kode_atensi and a.kode_lokasi=c.kode_lokasi "+
							 "where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_atensi,line.atensi,line.keterangan,line.kode_norma,line.nama,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.neto),line.kdoutput,line.kdsoutput,line.kdkmpnen,line.kdskmpnen,line.kode_akun,line.idbukti,line.nu,line.kdgiat]);
					}					
				} else this.sg1.clear(1);	
				this.sg1.validasi();

				var strSQL = "select isnull(b.status,'UNCHECK') as status,isnull(b.catatan,'-') as catatan,a.kode_dok,a.nama "+
							 "from uin_dok_ver a left join uin_ver_d b on a.kode_dok=b.kode_dok and a.kode_lokasi=b.kode_lokasi and b.no_ver='"+this.e_nover.getText()+"' "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.idx";							 											 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];						
						this.sg4.appendData([line.status.toUpperCase(),line.catatan,line.kode_dok,line.nama]);
					}					
				} else this.sg4.clear(1);	
				
			}
		} catch(e) {alert(e);}
	},
	doSizing: function() {		
		if (this.bAju.getTop() != 10) {
			this.bAju.setTop(10);
			this.e_totaju.setTop(10);
			this.sg.setTop(33);
			this.sg.setHeight(242);
		}
		else {
			this.bAju.setTop(125);
			this.e_totaju.setTop(125);
			this.sg.setTop(148);
			this.sg.setHeight(127);
		}		
	}
});