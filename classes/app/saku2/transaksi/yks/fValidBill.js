window.app_saku2_transaksi_yks_fValidBill = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fValidBill.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_fValidBill";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Validasi Loker Data Billing: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		uses("util_dbLib",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_data = new saiCBBL(this,{bound:[20,17,222,20],caption:"Data HR Peserta", multiSelection:false, maxLength:10, tag:2});
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.bTampil = new button(this,{bound:[810,17,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.i_app = new portalui_imageButton(this,{bound:[900,17,20,20],hint:"App All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,320], childPage:["Data Billing","Detail Billing","NIK Tidak Terdaftar"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
				colTitle:["Status","No Bill","Tanggal","Keterangan","No Hut/KB","Modul"],
				colWidth:[[5,4,3,2,1,0],[70,100,360,80,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5],[]],				
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],checkItem:true,
				change:[this,"doChangeCell"],dblClick:[this,"doDoubleClick"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:17,tag:9,
				colTitle:["Kode Mitra","No Ref","NIK","Nama","Loker","Loker Valid","Area Host","Band","NIKKES","Nama Pasien","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Nilai","Nilai Kunj","Nilai CS"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,100,70,70,70,70,100,70,70,70,100,100,100,70,100,70]],
				colFormat:[[14,15,16],[cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});				
		this.sg3 = new portalui_saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:1,tag:9,
				colTitle:["NIK"],
				colWidth:[[0],[70]],				
				readOnly:true, defaultRow:1});
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_data.setSQL("select no_load, keterangan from yk_peserta_m ",["no_load","keterangan"],false,["No Bukti","Keterangan"],"and","Data HR Peserta",true);			
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
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_fValidBill.extend(window.childForm);
window.app_saku2_transaksi_yks_fValidBill.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-VAL"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into yk_valid_m(no_valid,kode_lokasi,no_load,periode,tanggal,no_dokumen,keterangan,nik_buat,nik_app,tgl_input,nik_user,modul,progress,posted) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_data.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','VALID','X','X')");	
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i)=="APP"){								
								if (this.sg.cells(5,i)=="RESTITUSI" || this.sg.cells(5,i)=="NONRESTITUSI") {
									sql.add("update yk_bill_m set no_valid='"+this.e_nb.getText()+"',progress='2' where no_bill = '"+this.sg.cells(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
									sql.add("update a set a.flag_aktif='1',a.no_valid='"+this.e_nb.getText()+"',a.loker_valid = b.loker,a.loker_bast=b.loker "+
											"from yk_bill_d a inner join yk_peserta_d b on a.nik=b.nik and b.no_load='"+this.cb_data.getText()+"' "+
											"where a.no_bill = '"+this.sg.cells(1,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");
								} 
								if (this.sg.cells(5,i)=="KUNJUNGAN") {
									sql.add("update yk_billkunj_m set no_valid='"+this.e_nb.getText()+"',progress='1' where no_bill = '"+this.sg.cells(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"' ");
									sql.add("update a set a.flag_aktif='1',a.no_valid='"+this.e_nb.getText()+"',a.loker_valid = b.loker,a.loker_bast=b.loker "+
											"from yk_billkunj_d a inner join yk_peserta_d b on a.nik=b.nik and b.no_load='"+this.cb_data.getText()+"' "+
											"where a.no_bill = '"+this.sg.cells(1,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");
								}
								if (this.sg.cells(5,i)=="TAKTERIMA" || this.sg.cells(5,i)=="BAREV") {									
									sql.add("update yk_valid_m set no_valid2='"+this.e_nb.getText()+"',progress='1' where no_valid = '"+this.sg.cells(1,i)+"' and kode_lokasi = '"+this.app._lokasi+"'");
									sql.add("update a set a.flag_aktif='1',a.no_valid='"+this.e_nb.getText()+"',a.loker_valid = b.loker,a.loker_bast=b.loker "+
											"from yk_bill_d a inner join yk_peserta_d b on a.nik=b.nik and b.no_load='"+this.cb_data.getText()+"' "+
											"where a.no_bill = '"+this.sg.cells(1,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif<>'X' ");
									sql.add("update a set a.flag_aktif='1',a.no_valid='"+this.e_nb.getText()+"',a.loker_valid = b.loker,a.loker_bast=b.loker "+
											"from yk_billkunj_d a inner join yk_peserta_d b on a.nik=b.nik and b.no_load='"+this.cb_data.getText()+"' "+
											"where a.no_bill = '"+this.sg.cells(1,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.flag_aktif<>'X' ");
								}
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
					this.sg.clear(1);
					this.sg1.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :		
				var NIKtemu = false;
				var nobill = ""; 
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
						nobill += ",'"+this.sg.cells(1,i)+"'";
					}					
				}					
				nobill = nobill.substr(1); 					
				if (nobill == "") nobill = "''"; 				
				this.sg3.clear(1); 					
				var strSQL = "select distinct nik from yk_bill_d where no_valid='-' and nik not in "+
							 "(select nik from yk_peserta_d where no_load='"+this.cb_data.getText()+"') and kode_lokasi='"+this.app._lokasi+"' and no_bill in ("+nobill+") "+
							 "union "+
							 "select distinct nik from yk_billkunj_d where no_valid='-' and nik not in "+
							 "(select nik from yk_peserta_d where no_load='"+this.cb_data.getText()+"') and kode_lokasi='"+this.app._lokasi+"' and no_bill in ("+nobill+") ";
				var data = this.dbLib.getDataProvider(strSQL,true);			
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					this.sg3.showLoading();			
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg3.appendData([line.nik]);
						NIKtemu = true;
					}
					this.sg3.hideLoading();			
				} else this.sg3.clear(1);
				if (NIKtemu){
					system.alert(this,"Data Tidak valid.","Lihat daftar NIK tidak terdaftar.");
					return false;
				}
				
				var temu = false;
				for (var i=0;i < this.sg.getRowCount();i++) {
					if (this.sg.rowValid(i) && this.sg.cells(0,i)=="APP") temu = true;
				}
				if (!temu){
					system.alert(this,"Data Tidak valid.","Harus ada status yang di approve untuk validasi.");
					return false;
				}
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
				else this.simpan();
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
		this.e_nb.setText("");
		this.sg.clear(1);
		this.sg1.clear(1);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_valid_m","no_valid",this.app._lokasi+"-VAL"+this.e_periode.getText().substr(2,4)+".","000"));
			this.cb_data.setFocus();
		} 
		else {
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)) this.sg.cells(0,i,"APP");
			}
		}
	},
	doLoad:function(sender){	
		if (this.e_periode.getText() != "") {
			this.sg1.clear(1); 	
			this.pc1.setActivePage(this.pc1.childPage[1]);			
			var data = this.dbLib.getDataProvider(
				"select no_bill,convert(varchar,tanggal,103) as tanggal,keterangan,case jenis when 'RESTITUSI' then no_kasres else no_hutang end as no_bukti,jenis "+
				"from yk_bill_m where jenis in ('RESTITUSI','NONRESTITUSI') and progress = '1' and periode<='"+this.e_periode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
				"union "+								
				"select no_bill,convert(varchar,tanggal,103) as tanggal,keterangan,no_bill as no_bukti,'KUNJUNGAN' jenis  "+
				"from yk_billkunj_m where no_valid='-' and progress = '0' and periode<='"+this.e_periode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
				"union "+
				"select no_valid as no_bill,convert(varchar,tanggal,103) as tanggal,keterangan,no_valid as no_bukti,modul as jenis "+
				"from yk_valid_m where modul in ('TAKTERIMA','BAREV') and progress = '0' and periode<='"+this.e_periode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "+
				"order by jenis ",true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				this.sg1.showLoading();			
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_bill,line.tanggal,line.keterangan,line.no_bukti,line.jenis.toUpperCase()]);
				}
				this.sg1.hideLoading();			
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else {
			system.alert(this,"Data tidak valid.","Periode harus diisi.");
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "" && this.cb_data.getText()!="") {
			if (this.sg.cells(5,row) == "NONRESTITUSI" || this.sg.cells(5,row) == "RESTITUSI") {
				var strSQL = "select a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker,b.loker as loker_valid,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_keluar,103) as tgl_keluar,a.icdx,a.kode_produk,a.nilai,a.nilai_kunj,a.nilai_cs "+
							 "from yk_bill_d a inner join yk_bill_m c on a.no_bill=c.no_bill and a.kode_lokasi=c.kode_lokasi "+
							 "                 inner join (select x.no_load,x.nik,x.loker,y.jenis,y.kode_lokasi "+
							 "		                       from yk_peserta_d x inner join cust y on x.loker=y.kode_cust) b on a.nik=b.nik and b.no_load = '"+this.cb_data.getText()+"' "+
							 "where a.no_bill='"+this.sg.cells(1,row)+"' and "+
							 " (case a.jenis when 'NONRESTITUSI' then a.no_hutang else c.no_kasres end) = '"+this.sg.cells(4,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);
				} else this.sg1.clear(1);
			}						
			if (this.sg.cells(5,row) == "KUNJUNGAN") {			
				var strSQL = "select  '-' as kode_vendor,a.no_ref,a.nik,a.nama,a.loker,b.loker as loker_valid,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_masuk,103) as tgl_keluar,'-' as icdx,a.kode_produk,0 as nilai,(a.umum+a.gigi+a.kbia+a.matkes) as nilai_kunj,a.cs as nilai_cs "+
							 "from yk_billkunj_d a inner join "+
							 "      (select x.no_load,x.nik,x.loker,y.jenis,y.kode_lokasi "+
							 "		 from yk_peserta_d x inner join cust y on x.loker=y.kode_cust) b on a.nik=b.nik and b.no_load = '"+this.cb_data.getText()+"' "+
							 "where a.no_bill='"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"'";																										
				var data = this.dbLib.getDataProvider(strSQL,true,500);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);
				} else this.sg1.clear(1);					
			}
			if (this.sg.cells(5,row) == "TAKTERIMA" || this.sg.cells(5,row) == "BAREV") {			
				var strSQL = "select a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker,b.loker as loker_valid,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_keluar,103) as tgl_keluar,a.icdx,a.kode_produk,a.nilai,a.nilai_kunj,a.nilai_cs "+
							 "from yk_bill_d a inner join (select x.no_load,x.nik,x.loker,y.jenis,y.kode_lokasi "+
							 "		                       from yk_peserta_d x inner join cust y on x.loker=y.kode_cust) b on a.nik=b.nik and b.no_load = '"+this.cb_data.getText()+"' "+
							 "where flag_aktif<>'X' and a.no_bill='"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
							 "union "+
							 "select  '-' as kode_vendor,a.no_ref,a.nik,a.nama,a.loker,b.loker as loker_valid,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_masuk,103) as tgl_keluar,'-' as icdx,a.kode_produk,0 as nilai,(a.umum+a.gigi+a.kbia+a.matkes) as nilai_kunj,a.cs as nilai_cs "+
							 "from yk_billkunj_d a inner join "+
							 "      (select x.no_load,x.nik,x.loker,y.jenis,y.kode_lokasi "+
							 "		 from yk_peserta_d x inner join cust y on x.loker=y.kode_cust) b on a.nik=b.nik and b.no_load = '"+this.cb_data.getText()+"' "+
							 "where flag_aktif<>'X' and a.no_bill='"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"'";																										
				var data = this.dbLib.getDataProvider(strSQL,true,500);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);
				} else this.sg1.clear(1);					
			}			
			this.pc1.setActivePage(this.pc1.childPage[1]);
		} else system.alert(this,"Data tidak valid.","HR Peserta harus diisi.");
	},	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg1.appendData([line.kode_vendor,line.no_ref,line.nik,line.nama,line.loker,line.loker_valid,line.kode_lokasi,line.band,line.nikkes,line.pasien,line.tgl_masuk,line.tgl_keluar,line.icdx,line.kode_produk,floatToNilai(line.nilai),floatToNilai(line.nilai_kunj),floatToNilai(line.nilai_cs)]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
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
