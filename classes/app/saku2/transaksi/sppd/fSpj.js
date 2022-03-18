window.app_saku2_transaksi_sppd_fSpj = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_sppd_fSpj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_sppd_fSpj";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan SPPD: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true, change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No SPPD",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Keterangan", maxLength:150});				
		this.e_tempat = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Tempat", maxLength:150});				
		this.cb_akun = new saiCBBL(this,{bound:[20,19,200,20],caption:"Akun SPPD", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_pp = new saiCBBL(this,{bound:[20,20,200,20],caption:"Pusat Ptgjawaban", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.cb_drk = new saiCBBL(this,{bound:[20,21,200,20],caption:"DRK", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});				
		this.cb_perintah = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Perintah", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_jab = new saiLabelEdit(this,{bound:[20,17,300,20],caption:"Jabatan", maxLength:50});				
		this.cb_gar = new saiCBBL(this,{bound:[20,14,200,20],caption:"NIK Anggaran", multiSelection:false, maxLength:10, tag:2});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK SPPD", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});		
		this.e_gar = new saiLabelEdit(this,{bound:[720,16,200,20],caption:"Saldo Anggaran", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});	
		this.e_nama = new saiLabelEdit(this,{bound:[20,18,300,20],caption:"Nama SPPD", maxLength:50});				
		this.e_ut = new saiLabelEdit(this,{bound:[720,18,200,20],caption:"Nilai Transport", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});			
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Fiatur", multiSelection:false, maxLength:10, tag:2});
		this.e_uh = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Nilai Harian", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,260], childPage:["Daftar Biaya Transportasi","Daftar Uang Harian"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,		            
					colTitle:["Kode Jns","Jenis Angkutan","Kode Rute","Nama","Tempat Asal","Tempat Tujuan","Tarif","Jumlah","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,120,120,150,70,80,60]],
					columnReadOnly:[true,[0,1,2,3,4,5,8],[6,7]],
					buttonStyle:[[0,2],[bsEllips,bsEllips]], 
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kd Jenis","Jenis SPPD","Tanggal Berangkat","Tanggal Tiba","Lama Hari","Tarif","Persen","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,100,120,120,120,120,80]],
					columnReadOnly:[true,[0,1,4,7,2,3],[5,6]],
					colFormat:[[2,3,4,5,6,7],[cfDate,cfDate,cfNilai,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0,2,3],[bsEllips,bsDate,bsDate]], 					
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});					
					
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_spro = 'AKUNPD' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_akun.setText(line.flag,line.nama);
			} else this.cb_akun.setText("","");			
			
			var data = this.dbLib.getDataProvider("select kode_bidang from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodeBidang = line.kode_bidang;
			} else this.kodeBidang = "-";
			var data = this.dbLib.getDataProvider("select a.kode_spro,a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro = 'NIKMBDH' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;								
				line = data.rs.rows[0];												
				this.cb_app.setText(line.flag,line.nama);					
			} 
			else this.cb_app.setText("","");				
			this.nilai_uh = 0;			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						       "where b.kode_flag = '030' and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun SPPD",true);
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_bidang='"+this.kodeBidang+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Fiatur",true);						
			this.cb_perintah.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Perintah",true);						
			this.cb_pp.setText(this.app._kodePP);
			this.doChange(this.cb_buat);
			
			this.cb_buat.setSQL("select nik, nama from karyawan ",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);	 //anggaran kug nik yg sppd bisa area dengan bidang yg berbeda		
				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_sppd_fSpj.extend(window.childForm);
window.app_saku2_transaksi_sppd_fSpj.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_spj_m","no_spj",this.app._lokasi+"-SPPD"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();																				
					sql.add("insert into yk_spj_m(no_spj,kode_lokasi,periode,tanggal,sts_spj,kode_pp,keterangan,nik_buat,nik_app,nik_gar,nik_perintah,progress,akun_uhar,akun_tran,transport,harian,tgl_input,nik_user,kode_drk,no_kas,no_dokumen,no_ver,jabatan,nama_spj,tempat) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.cb_pp.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.cb_gar.getText()+"','"+this.cb_perintah.getText()+"','0','"+this.cb_akun.getText()+"','"+this.cb_akun.getText()+"',"+parseNilai(this.e_ut.getText())+","+parseNilai(this.e_uh.getText())+",getdate(),'"+this.app._userLog+"','"+this.cb_drk.getText()+"','-','"+this.e_dok.getText()+"','-','"+this.e_jab.getText()+"','"+this.e_nama.getText()+"','"+this.e_tempat.getText()+"')");
															
					var total = nilaiToFloat(this.e_ut.getText()) + nilaiToFloat(this.e_uh.getText());
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
							"	('"+this.e_nb.getText()+"','SPPD','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',"+parseNilai(this.e_gar.getText())+","+total+")");
							
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into yk_spj_dt(no_spj,kode_lokasi,no_urut,kode_trans,asal,tujuan,kode_jenis,nilai,jumlah,tarif) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(6,i))+")");
							}
						}
					}					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into yk_spj_dh(no_spj,kode_lokasi,no_urut,sts_spj,tgl_mulai,tgl_selesai,lama,tarif,persen,nilai) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.getCellDateValue(2,i)+"','"+this.sg2.getCellDateValue(3,i)+"',"+parseNilai(this.sg2.cells(4,i))+","+parseNilai(this.sg2.cells(5,i))+","+parseNilai(this.sg2.cells(6,i))+","+parseNilai(this.sg2.cells(7,i))+")");
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg2.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi(); this.sg2.validasi();												
				if (this.sg2.getRowValidCount() > 0){
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){
							/*
							var strSQL = "select no_spj from yk_spj_dh where nik='"+this.cb_buat.getText()+"' and tgl_mulai between '"+this.sg2.getCellDateValue(2,i)+"' and '"+this.sg2.getCellDateValue(3,i)+"' "+
										 "union "+
										 "select no_spj from yk_spj_dh where nik='"+this.cb_buat.getText()+"' and tgl_selesai between '"+this.sg2.getCellDateValue(2,i)+"' and '"+this.sg2.getCellDateValue(3,i)+"' ";
							var data = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data == "object"){
								var line = data.rs.rows[0];							
								if (line != undefined){		
									system.alert(this,"Transaksi tidak valid.","NIK sudah dibuat SPJ untuk tanggal '"+this.sg2.cells(2,i)+"' dan '"+this.sg2.cells(3,i)+"' ");
									return false;						
								} 
							}
							*/							
							var d = new Date();
							var d1 =  d.strToDate(this.sg2.cells(2, i));
							var d2 = d.strToDate(this.sg2.cells(3, i));
							if (d1 > d2) {							
								var k = i+1;
								system.alert(this,"Tanggal tidak valid.","Tanggal berangkat harus lebih awal dari tanggal tiba. (Baris: "+k+")");
								return false;
							}							
						}
					}
				}
				
				if (nilaiToFloat(this.e_ut.getText()) + nilaiToFloat(this.e_uh.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang dari nol.");
					return false;						
				}
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
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;					
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
	doChange:function(sender){		
		if (sender == this.cb_pp || sender == this.cb_akun || sender == this.e_periode || sender == this.cb_drk) {
			if (sender == this.cb_pp) {
				if (this.cb_pp.getText()!="") {
					this.cb_gar.setSQL("select nik, nama from karyawan where substring(kode_pp,1,3) ='"+this.cb_pp.getText().substr(0,3)+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);								
				}
			}
			if (this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.e_periode.getText()!="") {
				this.cb_drk.setSQL("select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.e_periode.getText().substr(0,4)+"%' and b.kode_akun='"+this.cb_akun.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);						
			}			
			if (this.cb_pp.getText()!="" && this.cb_akun.getText()!="" && this.e_periode.getText()!="" && this.cb_drk.getText()!="") {
				this.doHitungGar();
			}
		}
		if (sender == this.cb_buat) {
			this.sg2.clear(1);			
			if (this.cb_buat.getText() != "") {				
				var data2 = this.dbLib.getDataProvider("select nama,grade from karyawan where nik='"+this.cb_buat.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];							
					this.kodegrade = line2.grade;
					this.e_nama.setText(line2.nama);
				} else {this.kodegrade = ""; this.e_nama.setText("");}
			}
		}
		if (sender == this.cb_perintah && this.cb_perintah.getText() != "") {			
			var data2 = this.dbLib.getDataProvider("select jabatan from karyawan where nik='"+this.cb_perintah.getText()+"'",true);
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2 = data2.rs.rows[0];
					this.e_jab.setText(line2.jabatan);
				} else this.e_jab.setText("");				
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_spj_m","no_spj",this.app._lokasi+"-SPPD"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_dok.setFocus();	
	},
	doChangeCell: function(sender, col, row) {
		if (col == 0 && this.sg.cells(0,row) != "") {			
			this.sg.cells(2,row,"");
			this.sg.cells(3,row,"");
			this.sg.cells(4,row,"");				
			this.sg.cells(5,row,"");				
			this.sg.cells(6,row,"0");
			this.sg.cells(7,row,"0");
			this.sg.cells(8,row,"0");
		}
		if (col == 2 && this.sg.cells(2,row) != "") {
			var data = this.dbLib.getDataProvider("select nilai,asal,tujuan from yk_spj_trans where kode_jenis = '"+this.sg.cells(0,row)+"' and kode_trans='"+this.sg.cells(2,row)+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];															
				this.sg.cells(4,row,line.asal);
				this.sg.cells(5,row,line.tujuan);				
				this.sg.cells(6,row,floatToNilai(line.nilai));
				this.sg.cells(7,row,"1");				
				this.sg.setCell(8,row,floatToNilai(nilaiToFloat(this.sg.cells(6,row)) * nilaiToFloat(this.sg.cells(7,row))));				
			}
			this.sg.validasi();
		}
		if (col == 7 || col == 6 ) {
				if (this.sg.cells(6,row) != "" && this.sg.cells(7,row) != "") this.sg.setCell(8,row,floatToNilai(nilaiToFloat(this.sg.cells(6,row)) * nilaiToFloat(this.sg.cells(7,row))));
				this.sg.validasi();
		}
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.getCell(8,i) != ""){
					tot += nilaiToFloat(this.sg.getCell(8,i));			
				}
			}
			this.e_ut.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doEllipsClick: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
							this.standarLib.showListDataForSG(this, "Daftar Jenis Angkutan",this.sg, this.sg.row, this.sg.col, 
														"select kode_jenis,nama from yk_spj_jenis",
														"select count(kode_jenis) from yk_spj_jenis",
														 new Array("kode_jenis","nama"),"where",new Array("Kode","Jenis"),false);					
						break;					
				case 2 :
							this.standarLib.showListDataForSG(this, "Daftar Rute",this.sg, this.sg.row, this.sg.col, 
														"select kode_trans, asal+'-'+tujuan as keterangan from yk_spj_trans where kode_jenis = '"+this.sg.cells(0,row)+"' and flag_aktif='1' ",
														"select count(kode_trans) from yk_spj_trans where kode_jenis = '"+this.sg.cells(0,row)+"' and flag_aktif='1' ",
														 new Array("kode_trans","keterangan"),"and",new Array("Kode","Keterangan"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},			
	doEllipsClick2: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
							this.standarLib.showListDataForSG(this, "Daftar Jenis SPPD",this.sg2, this.sg2.row, this.sg2.col, 
														"select sts_spj, nama  from yk_status_spj ",
														"select count(sts_spj) from yk_status_spj ",									
														 new Array("sts_spj","nama"),"where",new Array("Kode","Jenis"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},
	doChangeCell2: function(sender, col, row) {
		if (col == 2 || col == 3 || col == 0) {
			if (col == 0) {
				var data = this.dbLib.getDataProvider("select nilai from yk_spj_harian where kode_band = '"+this.kodegrade+"' and sts_spj = '"+this.sg2.cells(0,row)+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.nilai_uh = parseFloat(line.nilai);
						this.sg2.setCell(6,row,"100");
					}
				}
			}
			if (this.sg2.cells(2,row)=="" || this.sg2.cells(3,row)=="") this.sg2.cells(4,row,"0");
			else {				
				var d = new Date();
				var d1 =  d.strToDate(this.sg2.cells(2, row));
				var d2 = d.strToDate(this.sg2.cells(3, row));
				var jumlah = d2.DateDiff(d1) + 1;
				if (parseFloat(jumlah) > 0) this.sg2.cells(4,row,floatToNilai(jumlah));
				else this.sg2.cells(4,row,"0");				
			}
		}		
		if (col == 4 && this.sg2.cells(4,row)!="") {
			this.sg2.setCell(5,row,floatToNilai(this.nilai_uh));
			this.sg2.setCell(7,row,floatToNilai( Math.round(nilaiToFloat(this.sg2.cells(5,row)) * nilaiToFloat(this.sg2.cells(4,row)) * nilaiToFloat(this.sg2.cells(6,row))/100 )));
		}
		if (col == 5 || col == 6 ) {
			if (this.sg2.cells(5,row)!="" && this.sg2.cells(6,row)!="") {
				this.sg2.setCell(7,row,floatToNilai( Math.round(nilaiToFloat(this.sg2.cells(5,row)) * nilaiToFloat(this.sg2.cells(4,row)) * nilaiToFloat(this.sg2.cells(6,row))/100 )));
			}
		}
		this.sg2.validasi();
	},	
	doNilaiChange2: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.getCell(7,i) != ""){
					tot += nilaiToFloat(this.sg2.getCell(7,i));			
				}
			}
			this.e_uh.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doHitungGar: function(){				
		var sls =0 ;
		var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+this.cb_drk.getText()+"','"+this.e_periode.getText()+"') as gar ",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];
			data = line.gar.split(";");
			sls = parseFloat(data[0]) - parseFloat(data[1]);
			this.e_gar.setText(floatToNilai(sls));			
		}
		/*
		if (this.e_periode.getText().substr(4,2) == "01" || this.e_periode.getText().substr(4,2) == "02" || this.e_periode.getText().substr(4,2) == "03") var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"01','"+this.e_periode.getText().substr(0,4)+"02','"+this.e_periode.getText().substr(0,4)+"03'";
		if (this.e_periode.getText().substr(4,2) == "04" || this.e_periode.getText().substr(4,2) == "05" || this.e_periode.getText().substr(4,2) == "06") var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"04','"+this.e_periode.getText().substr(0,4)+"05','"+this.e_periode.getText().substr(0,4)+"06'";
		if (this.e_periode.getText().substr(4,2) == "07" || this.e_periode.getText().substr(4,2) == "08" || this.e_periode.getText().substr(4,2) == "09") var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"07','"+this.e_periode.getText().substr(0,4)+"08','"+this.e_periode.getText().substr(0,4)+"09'";
		if (this.e_periode.getText().substr(4,2) == "10" || this.e_periode.getText().substr(4,2) == "11" || this.e_periode.getText().substr(4,2) == "12") var vPeriode = "'"+this.e_periode.getText().substr(0,4)+"10','"+this.e_periode.getText().substr(0,4)+"11','"+this.e_periode.getText().substr(0,4)+"12'";
				
		var data = this.dbLib.getDataProvider("select isnull(sum(transport+harian),0) as gar_pakai from yk_spj_m where kode_pp='"+this.cb_pp.getText()+"' and akun_uhar='"+this.cb_akun.getText()+"' and kode_drk='"+this.cb_drk.getText()+"' and periode in ("+vPeriode+") and kode_lokasi='"+this.app._lokasi+"' and progress='0'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;								
			line = data.rs.rows[0];			
			sls = sls - parseFloat(line.gar_pakai);
			this.e_gar.setText(floatToNilai(sls));		
		} 		
		*/
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							setTipeButton(tbSimpan);
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});