window.app_saku2_transaksi_yks_fBastRev = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fBastRev.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_fBastRev";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reverse Detail Piutang: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick2"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		this.cb_piutang = new saiCBBL(this,{bound:[20,19,220,20],caption:"No Piutang", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});		
		this.e_debet = new saiLabelEdit(this,{bound:[720,19,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		this.c_modul = new saiCB(this,{bound:[20,18,202,20],caption:"Modul",items:["BILLING","KUNJUNGAN"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.bTampil = new button(this,{bound:[515,18,80,18],caption:"Tampil Data",click:[this,"doTampil"]});			
		this.bJurnal = new button(this,{bound:[615,18,80,18],caption:"Jurnal",click:[this,"doJurnal"]});			
		this.e_kredit = new saiLabelEdit(this,{bound:[720,18,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,260],childPage:["Data Peserta","Detail Billing","Jurnal Reverse"]});		
		this.sg0 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:0,
		            colTitle:["NIK","Nama"],
					colWidth:[[1,0],[200,80]],
					columnReadOnly:[true,[1],[0]],
					buttonStyle:[[0],[bsEllips]], 					
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell0"],
					autoAppend:true,defaultRow:1});
		this.sgn0 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg0});		
		
		this.sg = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:23,tag:0,
				colTitle:["Status","No Urut","No Bill","Jenis","Kode Mitra","Tgl Masuk","NIK","Nama","Loker Valid","Loker BAST","Area Host","Band","NIKKES","Nama Pasien","Kode Biaya","Nama Biaya","ICD-X","Nilai","Umum","Gigi","KBKIA","MatKes","CS"],
				colWidth:[[22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,80,60,100,70,100,70,70,70,80,70,100,70,100,70,70,80,60,60]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],[]],
				colFormat:[[17,18,19,20,21,22],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				buttonStyle:[[0],[bsAuto]], 
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
				change:[this,"doChangeCell"],autoAppend:false,defaultRow:1
		});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,100,240,50,200,100]],
					columnReadOnly:[true,[0,1,2,4,5,6],[3]],
					colFormat:[[4],[cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[840,5,100,25],caption:"Preview",selected:true});
	
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
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");		
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='PPBPCC' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodepp = line.flag;
			} else this.kodepp = '-';
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_fBastRev.extend(window.childForm);
window.app_saku2_transaksi_yks_fBastRev.implement({
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
			//loker bast jadi loker --- kayak tak terima...bill yg lama di matikan,,bill baru create
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-BAREV"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into yk_valid_m(no_valid,kode_lokasi,no_load,periode,tanggal,no_dokumen,keterangan,nik_buat,nik_app,tgl_input,nik_user,modul,progress,posted) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','BAREV','0','F')");	
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into yk_valid_j(no_valid,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.app._lokasi+"','BAREV','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
								if (this.sg2.cells(6,i) != "-") {
									sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
											"	('"+this.e_nb.getText()+"','BAREV','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+this.sg2.cells(2,i)+"',0,"+parseNilai(this.sg2.cells(4,i))+")");
								}								
							}
						}
					}
					
					sql.add("insert into yk_valid_d(no_valid,kode_lokasi,no_bill,nilai,modul,keterangan,periode,dc,progress,no_kirim,no_reklas,kode_cust,kode_produk) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','-',sum(case dc when 'C' then nilai else -nilai end),'BAREV','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','C','0','-','-','-','-' "+
							"from yk_valid_j where jenis in ('PIUTANG','PIUKUNJ','PIUCS') and no_valid='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");

					//--------------
					var kunci=idx=""; 
					for (var i=0;i < this.sg.getRowCount();i++){			
						if (this.sg.rowValid(i) && this.sg.cells(0,i)== "APP") {
							//nu,nobill,nik,nikkes,kodebiaya
							kunci = this.sg.cells(1,i)+this.sg.cells(2,i)+this.sg.cells(6,i)+this.sg.cells(12,i)+this.sg.cells(14,i);
							idx += ",'"+kunci+"'";
						}			
					}
					idx = idx.substr(1);			
					if (idx == "") idx = "''";		
					
					
					if (this.c_modul.getText() == "BILLING") {
						//yg minusnya
						sql.add("insert into yk_bill_d (no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,band,nikkes,pasien,dokter,tgl_masuk,tgl_keluar,icdx,kode_produk,nilai,nilai_kunj,nilai_cs,pph,loker_valid,no_hutang,no_piutang,loker_bast,no_kas,jenis,periode,no_app,no_valid,no_tak,flag_aktif,no_selesai) "+
								"select '"+this.e_nb.getText()+"',a.no_urut,a.kode_lokasi,a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker,a.band,a.nikkes,a.pasien,a.dokter,a.tgl_masuk,a.tgl_keluar,a.icdx,a.kode_produk,-a.nilai,-a.nilai_kunj,-a.nilai_cs,a.pph,a.loker_valid,a.no_bill,'"+this.e_nb.getText()+"',a.loker_bast,a.no_piutang,a.jenis,'"+this.e_periode.getText()+"',a.no_bill,a.no_valid,'-','X','-' "+
								"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust inner join yk_produk c on a.kode_produk=c.kode_produk "+
								"where a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.flag_aktif ='1' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_piutang = '"+this.cb_piutang.getText()+"' ");
						//yg barunya
						sql.add("insert into yk_bill_d (no_bill,no_urut,kode_lokasi,kode_vendor,no_ref,nik,nama,loker,band,nikkes,pasien,dokter,tgl_masuk,tgl_keluar,icdx,kode_produk,nilai,nilai_kunj,nilai_cs,pph,loker_valid,no_hutang,no_piutang,loker_bast,no_kas,jenis,periode,no_app,no_valid,no_tak,flag_aktif,no_selesai) "+
								"select '"+this.e_nb.getText()+"',a.no_urut,a.kode_lokasi,a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker_bast,a.band,a.nikkes,a.pasien,a.dokter,a.tgl_masuk,a.tgl_keluar,a.icdx,a.kode_produk,a.nilai,a.nilai_kunj,a.nilai_cs,a.pph,'-',a.no_bill,'-','-',a.no_bill,a.jenis,'"+this.e_periode.getText()+"',a.no_bill,'-','-','0','-' "+
								"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust inner join yk_produk c on a.kode_produk=c.kode_produk "+
								"where a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.flag_aktif ='1' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_piutang = '"+this.cb_piutang.getText()+"' ");						
						sql.add("update a set a.flag_aktif='X' "+
								"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
								"where a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.flag_aktif ='1' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_piutang = '"+this.cb_piutang.getText()+"' ");
					}
					if (this.c_modul.getText() == "KUNJUNGAN")	{
						//yg minusnya
						sql.add("insert into yk_billkunj_d(no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,band,nikkes,pasien,dokter,tgl_masuk,kode_produk,loker_valid,no_piutang,loker_bast,no_kas,periode,umum,gigi,kbia,matkes,cs,no_valid,no_tak,flag_aktif,jenis,no_selesai) "+
								"select '"+this.e_nb.getText()+"',a.no_urut,a.kode_lokasi,a.no_ref,a.nik,a.nama,a.loker,a.band,a.nikkes,a.pasien,a.dokter,a.tgl_masuk,a.kode_produk,a.loker_valid,'"+this.e_nb.getText()+"',a.loker_bast,a.no_piutang,'"+this.e_periode.getText()+"',-a.umum,-a.gigi,-a.kbia,-a.matkes,-a.cs,a.no_valid,'-','X',a.jenis,'-' "+
								"from yk_billkunj_d a inner join cust b on a.loker_valid=b.kode_cust "+
								"where a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.flag_aktif ='1' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_piutang='"+this.cb_piutang.getText()+"' ");
						//yg baru
						sql.add("insert into yk_billkunj_d(no_bill,no_urut,kode_lokasi,no_ref,nik,nama,loker,band,nikkes,pasien,dokter,tgl_masuk,kode_produk,loker_valid,no_piutang,loker_bast,no_kas,periode,umum,gigi,kbia,matkes,cs,no_valid,no_tak,flag_aktif,jenis,no_selesai) "+
								"select '"+this.e_nb.getText()+"',a.no_urut,a.kode_lokasi,a.no_ref,a.nik,a.nama,a.loker_bast,a.band,a.nikkes,a.pasien,a.dokter,a.tgl_masuk,a.kode_produk,'-','-','-',a.no_bill,'"+this.e_periode.getText()+"',a.umum,a.gigi,a.kbia,a.matkes,a.cs,'-','-','0',a.jenis,'-' "+
								"from yk_billkunj_d a inner join cust b on a.loker_valid=b.kode_cust "+
								"where a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.flag_aktif ='1' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_piutang='"+this.cb_piutang.getText()+"' ");						
						sql.add("update a set a.flag_aktif='X' "+
								"from yk_billkunj_d a inner join cust b on a.loker_valid=b.kode_cust "+
								"where a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.flag_aktif ='1' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_piutang='"+this.cb_piutang.getText()+"' ");
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg0.clear(1); this.sg.clear(1); this.sg2.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
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
				this.simpan();				
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.cb_piutang.setSQL("select no_valid, keterangan from yk_valid_m where periode <= '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul ='BAST'",["no_valid","keterangan"],false,["No Bukti","Keterangan"],"and","Data Bukti Piutang",true);
		this.e_nb.setText("");
	},
	doClick2:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-BAREV"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_dok.setFocus();
	},
	doChange : function(sender) {
		if (sender == this.cb_piutang || this.cb_piutang.getText()!="") {						
			this.sg.clear(1);
			this.sg2.clear(1);			
			var sql = new server_util_arrayList(); 
			sql.add("select distinct nik, nama from yk_bill_d where no_piutang ='"+this.cb_piutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
			        "union "+
				    "select distinct nik, nama from yk_billkunj_d where no_piutang ='"+this.cb_piutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
			this.dbLib.getMultiDataProviderA(sql);							
		}		
		if (sender == this.c_modul || this.c_modul.getText()!="") {						
			this.sg.clear(1);
			this.sg2.clear(1);			
		}
	},			
	doTampil:function(sender){	
		this.pc1.setActivePage(this.pc1.childPage[0]);
		var nik=""; 
		for (var i=0;i < this.sg0.getRowCount();i++){			
			if (this.sg0.rowValid(i)) {
				nik += ",'"+this.sg0.cells(0,i)+"'";
			}			
		}
		nik = nik.substr(1);			
		if (nik == "") nik = "''";		
		
		this.sg.clear();		
		if (this.c_modul.getText() == "BILLING")
			var strSQL = "select a.no_urut,a.no_bill,a.jenis,a.kode_vendor,convert(varchar,a.tgl_masuk,103) as tgl_masuk,a.nik,a.nama,a.loker_valid,a.loker_bast,b.kode_lokasi,a.band,a.nikkes,a.pasien,a.kode_produk,c.nama as nama_produk,a.icdx,a.nilai,0 as umum,0 as gigi,0 as kbia, 0 as matkes, 0 as cs  "+
						 "from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust inner join yk_produk c on a.kode_produk=c.kode_produk "+
						 "where a.kode_lokasi=b.kode_lokasi and a.nik in ("+nik+") and a.flag_aktif ='1' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_piutang = '"+this.cb_piutang.getText()+"' and a.no_selesai='-' "+
						 "order by a.nik,a.no_bill,a.no_urut ";							 
		if (this.c_modul.getText() == "KUNJUNGAN")			 
			var strSQL = "select a.no_urut,a.no_bill,a.jenis,'-' as kode_vendor,convert(varchar,a.tgl_masuk,103) as tgl_masuk,a.nik,a.nama,a.loker_valid,a.loker_bast,b.kode_lokasi,a.band,a.nikkes,a.pasien,a.kode_produk,c.nama as nama_produk,'-' as icdx,0 as nilai,a.umum,a.gigi,a.kbia,a.matkes,a.cs "+
						 "from yk_billkunj_d a inner join cust b on a.loker_valid=b.kode_cust inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					     "where a.kode_lokasi=b.kode_lokasi and a.nik in ("+nik+") and a.flag_aktif ='1' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_piutang='"+this.cb_piutang.getText()+"'  and a.no_selesai='-' ";
					     "order by a.nik,a.no_bill,,a.no_urut ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData(["INPROG",line.no_urut,line.no_bill,line.jenis,line.kode_vendor,line.tgl_masuk,line.nik,line.nama,line.loker_valid,line.loker_bast,line.kode_lokasi,line.band,line.nikkes,line.pasien,line.kode_produk,line.nama_produk,line.icdx,floatToNilai(line.nilai),floatToNilai(line.umum),floatToNilai(line.gigi),floatToNilai(line.kbia),floatToNilai(line.matkes),floatToNilai(line.cs)]);
			}
		}
		this.pc1.setActivePage(this.pc1.childPage[1]);		
	},
	doJurnal:function(sender){			
		this.pc1.setActivePage(this.pc1.childPage[1]);
		var kunci=idx=""; 
		for (var i=0;i < this.sg.getRowCount();i++){			
			if (this.sg.rowValid(i) && this.sg.cells(0,i)== "APP") {
				//nu,nobill,nik,nikkes,kodebiaya
				kunci = this.sg.cells(1,i)+this.sg.cells(2,i)+this.sg.cells(6,i)+this.sg.cells(12,i)+this.sg.cells(14,i);
				idx += ",'"+kunci+"'";
			}			
		}
		idx = idx.substr(1);			
		if (idx == "") idx = "''";		
		
		this.sg2.clear(); 				
		var ket = this.e_ket.getText();
		if (ket == "") ket = "-";		
		if (this.c_modul.getText() == "BILLING") {
			var strSQL ="select a.kode_akun,b.nama as nama_akun,a.dc,'"+ket+"' as ket,a.nilai,a.jenis,a.kode_drk "+
					"from "+
					"( "+	
					
					"select case b.jenis when 'PENSIUN' then 'CC' else 'PIUTANG' end as jenis,"+
					"       case b.jenis when 'PENSIUN' then c.akun_cc "+
					"		 			 when 'PEGAWAI' then c.akun_bp "+
					"					 when 'GROUP' then c.akun_ap "+
					"					 when 'MITRA' then c.akun_mitra "+
					"	    end as kode_akun,  "+
					"	    'C' as dc, sum(a.nilai) as nilai, "+
					"	    case b.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end as kode_drk,a.kode_lokasi "+
					"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+ 
					"		          inner join yk_produk c on a.kode_produk=c.kode_produk "+
					"where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.no_piutang='"+this.cb_piutang.getText()+"'  and a.no_selesai='-' "+
					"group by  a.kode_lokasi, "+
					"	  case b.jenis when 'PENSIUN' then c.akun_cc "+
					"				   when 'PEGAWAI' then c.akun_bp "+
					"				   when 'GROUP' then c.akun_ap "+
					"				   when 'MITRA' then c.akun_mitra "+
					"		  end, "+
					"		  case b.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end,case b.jenis when 'PENSIUN' then 'CC' else 'PIUTANG' end "+
					"union "+
					"select 'R-BPCC' as jenis,"+
					"       case b.jenis when 'PENSIUN' then c.akun_cc "+
					"					 when 'PEGAWAI' then c.akun_unbill "+
					"					 when 'GROUP' then c.akun_ap "+
					"					 when 'MITRA' then c.akun_mitra "+
					"	    end as kode_akun,  "+
					"	    'D' as dc, sum(a.nilai) as nilai, "+
					"	    case b.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end as kode_drk,a.kode_lokasi "+
					"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+					
					"		          inner join yk_produk c on a.kode_produk=c.kode_produk "+
					"where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.no_piutang='"+this.cb_piutang.getText()+"' and a.no_selesai='-' "+
					"group by  a.kode_lokasi, "+
					"	  case b.jenis when 'PENSIUN' then c.akun_cc "+
					"				   when 'PEGAWAI' then c.akun_unbill "+
					"				   when 'GROUP' then c.akun_ap "+
					"				   when 'MITRA' then c.akun_mitra "+ 
					"		  end, "+
					"		  case b.jenis when 'PENSIUN' then c.kode_drkcc else c.kode_drkbp end "+
					
				    ") a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"order by a.dc desc,a.kode_akun ";							
		}			
		if (this.c_modul.getText() == "KUNJUNGAN") {
			var strSQL ="select a.kode_akun,b.nama as nama_akun,a.dc,'"+ket+"' as ket,a.nilai,a.jenis,a.kode_drk "+
					"from "+
					"( "+	
					
					//KUNJ
					"select 'PIUKUNJ' as jenis,c.akun_pku as kode_akun,  "+
					"	   'C' as dc, sum(a.umum) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and a.flag_aktif='1' and a.umum<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+")  and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_pku,c.drk_kunj "+
					"union "+
					"select 'PIUKUNJ' as jenis,c.akun_pkg as kode_akun,  "+
					"	   'C' as dc, sum(a.gigi) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and a.flag_aktif='1' and a.gigi<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+")  and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_pkg,c.drk_kunj "+
					"union "+
					"select 'PIUKUNJ' as jenis,c.akun_pkb as kode_akun,  "+
					"	   'C' as dc, sum(a.kbia) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+ 
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and a.flag_aktif='1' and a.kbia<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+")  and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_pkb,c.drk_kunj "+
					"union "+
					"select 'PIUKUNJ' as jenis,c.akun_pmk as kode_akun,  "+
					"	   'C' as dc, sum(a.matkes) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and a.flag_aktif='1' and a.matkes<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_pmk,c.drk_kunj "+
					"union "+
					
					"select 'UMUM' as jenis,c.akun_ku as kode_akun,  "+
					"	   'D' as dc, sum(a.umum) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and a.flag_aktif='1' and a.umum<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+")  and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_ku,c.drk_kunj "+
					"union "+
					"select 'GIGI' as jenis,c.akun_kg as kode_akun,  "+
					"	   'D' as dc, sum(a.gigi) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and a.flag_aktif='1' and a.gigi<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+")  and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_kg,c.drk_kunj "+
					"union "+
					"select 'KBKIA' as jenis,c.akun_kb as kode_akun,  "+
					"	   'D' as dc, sum(a.kbia) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+ 
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and a.flag_aktif='1' and a.kbia<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+")  and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_kb,c.drk_kunj "+
					"union "+
					"select 'MATKES' as jenis,c.akun_mk as kode_akun,  "+
					"	   'D' as dc, sum(a.matkes) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and a.flag_aktif='1' and a.matkes<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_mk,c.drk_kunj "+
					"union "+				
					//CS
					"select 'HUTCS' as jenis,c.akun_hutcs as kode_akun,  "+
					"	   'C' as dc, sum(a.cs) as nilai, "+
					"	   '-'  as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'KUNJ' and a.flag_aktif='1' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_hutcs,c.drk_kunj "+
					"union "+
					"select 'PIUCS' as jenis,c.akun_piucs as kode_akun,  "+
					"	   'D' as dc, sum(a.cs) as nilai, "+
					"	   '-'  as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+					
					"where a.jenis = 'KUNJ' and a.flag_aktif='1' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_piucs,c.drk_kunj "+
					"union "+
					
					//TAKTERIMA					
					"select 'PIUKUNJ' as jenis,c.akun_pku as kode_akun,  "+
					"	   'C' as dc, sum(a.umum) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'TAKTERIMA' and a.flag_aktif='1' and a.umum<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+")  and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_pku,c.drk_kunj "+
					"union "+
					"select 'PIUKUNJ' as jenis,c.akun_pkg as kode_akun,  "+
					"	   'C' as dc, sum(a.gigi) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'TAKTERIMA' and a.flag_aktif='1' and a.gigi<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+")  and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_pkg,c.drk_kunj "+
					"union "+
					"select 'PIUKUNJ' as jenis,c.akun_pkb as kode_akun,  "+
					"	   'C' as dc, sum(a.kbia) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+ 
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'TAKTERIMA' and a.flag_aktif='1' and a.kbia<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+")  and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_pkb,c.drk_kunj "+
					"union "+
					"select 'PIUKUNJ' as jenis,c.akun_pmk as kode_akun,  "+
					"	   'C' as dc, sum(a.matkes) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'TAKTERIMA' and a.flag_aktif='1' and a.matkes<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_pmk,c.drk_kunj "+
					"union "+
					"select 'R-UNBILKJ' as jenis,c.akun_unbill as kode_akun,  "+
					"	   'D' as dc, sum(a.umum+a.gigi+a.kbia+a.matkes) as nilai, "+
					"	   c.drk_kunj as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'TAKTERIMA' and a.flag_aktif='1' and a.umum+a.gigi+a.kbia+a.matkes<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_unbill,c.drk_kunj "+
					"union "+
					
					//TAKCS
					"select 'HUTCS' as jenis,c.akun_unbill as kode_akun,  "+
					"	   'C' as dc, sum(a.cs) as nilai, "+
					"	   '-'  as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			          inner join yk_kunj c on a.kode_produk=c.kode_produk "+
					"where a.jenis = 'TAKTERIMA' and a.flag_aktif='1' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_unbill,c.drk_kunj "+
					"union "+
					"select 'PIUCS' as jenis,c.akun_piucs as kode_akun,  "+
					"	   'D' as dc, sum(a.cs) as nilai, "+
					"	   '-'  as kode_drk,a.kode_lokasi "+
					"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
					"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+					
					"where a.jenis = 'TAKTERIMA' and a.flag_aktif='1' and a.cs<> 0 and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_lokasi=b.kode_lokasi and (cast(a.no_urut as varchar)+a.no_bill+a.nik+a.nikkes+a.kode_produk) in ("+idx+") and a.no_piutang='"+this.cb_piutang.getText()+"' "+
					"group by  a.kode_lokasi,c.akun_piucs,c.drk_kunj "+
	
	
				    ") a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"order by a.dc desc,a.kode_akun ";							
		}
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),ket,floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_drk]);
			}
		}
		this.sg2.validasi();
		this.pc1.setActivePage(this.pc1.childPage[2]);
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg2.cells(4,i));
					if (this.sg2.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg2.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg0) {
				if (col == 0){
					if (this.c_modul.getText() == "BILLING")
						this.standarLib.showListData(this, "Daftar NIK",sender,undefined, 
												  "select distinct nik, nama from yk_bill_d where no_piutang ='"+this.cb_piutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",												  												  
												  "select count(distinct nik) from yk_bill_d where no_piutang ='"+this.cb_piutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",
												  ["nik","nama"],"and",["NIK","Nama"],false);				
					else
						this.standarLib.showListData(this, "Daftar NIK",sender,undefined, 
												  "select distinct nik, nama from yk_billkunj_d where no_piutang ='"+this.cb_piutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",
												  "select count(distinct nik) from yk_billkunj_d where no_piutang ='"+this.cb_piutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",
												  ["nik","nama"],"and",["NIK","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell0: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg0.cells(0,row) != "") {
				var nik = this.dataNIK.get(sender.cells(0,row));
				if (nik) sender.cells(1,row,nik);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"NIK "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkNIK");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}
			}
		}
		sender.onChange.set(this,"doChangeCell0");		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan.");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
	    			    eval("result = "+result+";");
	    			    if (typeof result != "string"){
                            this.dataNIK = new portalui_arrayMap();
	    			        if (result.result[0]){	    			        
	    			            var line;
	    			            for (var i in result.result[0].rs.rows){
	    			                line = result.result[0].rs.rows[i];
	    			                this.dataNIK.set(line.nik, line.nama);
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
	}
});