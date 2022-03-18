window.app_saku2_transaksi_yks_fRekonE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fRekonE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_fRekonE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekon Pembayaran Hutang: Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Rekon", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.e_debet = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_kredit = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		
		this.bJurnal = new button(this,{bound:[618,17,80,18],caption:"Jurnal",click:[this,"doJurnalClick"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,300], childPage:["Data Pelunasan Hutang","Detail Jurnal Rekon"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:9,
				colTitle:["Status","No Hutang","No App","Tanggal","Keterangan","Pegawai","Pensiun","Total","No Kas","Lokasi KB","Bank Transfer"],
				colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[80,80,100,100,100,100,200,80,100,100,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[]],
				colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
				checkItem:true,
				change:[this,"doChangeCell"],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis"],
					colWidth:[[5,4,3,2,1,0],[80,100,260,50,250,100]],
					columnReadOnly:[true,[0,1,2,4,5],[3]],
					colFormat:[[4],[cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
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
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_fRekonE.extend(window.childForm);
window.app_saku2_transaksi_yks_fRekonE.implement({
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
										
					sql.add("delete from yk_rekon_m where no_rekon ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_rekon_d where no_rekon ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_rekon_j where no_rekon ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_kashutang_d set no_rekon ='-',kode_lokrek='-' where no_rekon ='"+this.e_nb.getText()+"' and kode_lokrek='"+this.app._lokasi+"'");
					sql.add("update yk_hutang_d set no_rekon ='-',kode_lokrek='-' where no_rekon ='"+this.e_nb.getText()+"' and kode_lokrek='"+this.app._lokasi+"'");
								
					
					sql.add("insert into yk_rekon_m(no_rekon,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','REKON','HUT','IDR',1,"+parseNilai(this.e_debet.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F',getdate(),'"+this.app._userLog+"')");	
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								
								sql.add("insert into yk_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','REKON','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
							}
						}
					}
					var nobukti = nokas = noapp = "";
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
							nobukti += ",'"+this.app._lokasi+this.sg.cells(1,i)+"'";
							nokas += ",'"+this.sg.cells(9,i)+this.sg.cells(8,i)+"'";
							noapp += ",'"+this.app._lokasi+this.sg.cells(2,i)+"'";
						
							sql.add("insert into yk_rekon_d(no_rekon,kode_lokasi,periode,no_hutang,no_app,no_kas,modul,nilai_bp,nilai_cc) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(8,i)+"','REKON',"+parseNilai(this.sg.cells(5,i))+","+parseNilai(this.sg.cells(6,i))+")");
						}
					}
					nobukti = nobukti.substr(1);
					nokas = nokas.substr(1);
					noapp = noapp.substr(1);
					sql.add("update yk_kashutang_d set no_rekon ='"+this.e_nb.getText()+"',kode_lokrek='"+this.app._lokasi+"' where kode_lokhut+no_hutang in ("+nobukti+") and kode_lokhut+no_app in ("+noapp+") and kode_lokkas+no_kas in ("+nokas+")");
					sql.add("update yk_hutang_d set no_rekon ='"+this.e_nb.getText()+"',kode_lokrek='"+this.app._lokasi+"' where kode_lokasi+no_hutang in ("+nobukti+") and kode_lokasi+no_app in ("+noapp+") and kode_lokkas+no_kas in ("+nokas+")");
					
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
					this.sg.clear(1);this.sg2.clear(1);
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
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
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from yk_rekon_m where no_rekon ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_rekon_d where no_rekon ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_rekon_j where no_rekon ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_kashutang_d set no_rekon ='-',kode_lokrek='-' where no_rekon ='"+this.e_nb.getText()+"' and kode_lokrek='"+this.app._lokasi+"'");
					sql.add("update yk_hutang_d set no_rekon ='-',kode_lokrek='-' where no_rekon ='"+this.e_nb.getText()+"' and kode_lokrek='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);		
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select no_rekon, keterangan from yk_rekon_m "+
			                 "where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_rekon","keterangan"],false,["No Rekon","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.periode,a.tanggal,a.no_dokumen,a.keterangan,a.nik_buat,a.nik_setuju,b.nama as nama_buat,c.nama as nama_setuju from yk_rekon_m a "+
			           "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
					   "    inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi "+
					   "where a.no_rekon='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);					
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_app.setText(line.nik_setuju,line.nama_setuju);					
				} 
			}
			var data = this.dbLib.getDataProvider(
					   "select a.no_hutang,a.no_app,convert(varchar,b.tanggal,103) as tanggal,b.keterangan,a.bp,a.cc,a.total,a.no_kas,a.bank_trans,c.kode_lokasi as kode_lokkas "+
			           "from yk_kashutang_d a inner join yk_hutang_m b on a.no_hutang=b.no_hutang and a.kode_lokhut=b.kode_lokasi "+
					   "                      inner join kas_m c on a.no_kas=c.no_kas and a.kode_lokkas=c.kode_lokasi "+
			           "where a.no_app<>'X' and c.periode<='"+this.e_periode.getText()+"' and a.kode_lokhut='"+this.app._lokasi+"' and a.no_rekon='"+this.e_nb.getText()+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["APP",line.no_hutang,line.no_app,line.tanggal,line.keterangan,floatToNilai(line.bp),floatToNilai(line.cc),floatToNilai(line.total),line.no_kas,line.kode_lokkas,line.bank_trans]);
				}
			} else this.sg.clear(1);

			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.jenis "+
						"from yk_rekon_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+												
						"where  a.no_rekon = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.jenis]);
				}
			} else this.sg2.clear(1);
			this.sg2.validasi();

			this.pc1.setActivePage(this.pc1.childPage[0]);	
		}
	},		 
	doJurnalClick:function(sender){		
		this.sg2.clear(); 
		var nobukti = nokas = noapp = "";
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
				nobukti += ",'"+this.sg.cells(10,i)+this.app._lokasi+this.sg.cells(1,i)+"'";
				nokas += ",'"+this.sg.cells(9,i)+this.sg.cells(8,i)+"'";
				noapp += ",'"+this.app._lokasi+this.sg.cells(2,i)+"'";
			}
		}
		nobukti = nobukti.substr(1);
		nokas = nokas.substr(1);
		noapp = noapp.substr(1);
		
		var strSQL = "select c.flag as kode_akun,d.nama as nama_akun,'C' as dc,'MUTASI KEWAJIBAN' as ket,sum(a.nilai_bp+a.nilai_cc) as nilai,'TAK' as jenis "+
					 "from yk_hutang_d a "+					 
					 "	   inner join spro c on c.kode_lokasi='"+this.app._lokasi+"' and c.kode_spro = 'TAKHUT' "+
					 "	   inner join masakun d on d.kode_lokasi=c.kode_lokasi and c.flag=d.kode_akun    "+
					 "where a.no_rekon='"+this.e_nb.getText()+"' and a.bank_trans+a.kode_lokasi+a.no_hutang in ("+nobukti+") and a.kode_lokasi+a.no_app in ("+noapp+") and a.kode_lokkas+a.no_kas in ("+nokas+") "+
					 "group by c.flag,d.nama "+
					 "union "+
					 
					"select "+
					"case f.jenis when 'PENSIUN' then "+
					"   case when substring(a.kode_produk,1,1) = '1' then bb.cc_rjtp "+ 
					"		 when substring(a.kode_produk,1,1) = '2' then bb.cc_rjtl "+
					"		 when substring(a.kode_produk,1,1) = '3' then bb.cc_ri "+
					"		 when substring(a.kode_produk,1,1) = '4' then bb.cc_res "+
					"   end "+
					"else "+
					"   case when substring(a.kode_produk,1,1) = '1' then bb.bp_rjtp "+
					"		 when substring(a.kode_produk,1,1) = '2' then bb.bp_rjtl "+
					"		 when substring(a.kode_produk,1,1) = '3' then bb.bp_ri "+
					"		 when substring(a.kode_produk,1,1) = '4' then bb.bp_res "+
					"   end "+
					"end as kode_akun, b.nama as nama_akun,'D' as dc, "+
					"case f.jenis when 'PENSIUN' then 'PEMBYR HUTANG PENSIUN' else 'PEMBYR HUTANG PEGAWAI' end as ket, "+
					"sum(a.nilai-a.pph) as nilai, case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end as jenis "+
					"from yk_bill_d a "+
					"inner join cust f on a.loker=f.kode_cust "+
					
					"inner join (select distinct aa.no_hutang,aa.kode_lokasi,aa.bank_trans,aa.kode_vendor,bb.kode_klpvendor "+
					"            from yk_hutang_d aa inner join vendor bb on aa.kode_vendor=bb.kode_vendor and aa.kode_lokasi=bb.kode_lokasi) y on a.no_hutang=y.no_hutang and a.kode_vendor=y.kode_vendor and a.kode_lokasi=y.kode_lokasi "+
					
					"inner join vendor_klp bb on bb.kode_klpvendor=y.kode_klpvendor and bb.kode_lokasi=y.kode_lokasi  "+					
					"inner join masakun b on b.kode_lokasi=a.kode_lokasi and b.kode_akun = (case f.jenis when 'PENSIUN' then "+
					"   case when substring(a.kode_produk,1,1) = '1' then bb.cc_rjtp "+
					"		 when substring(a.kode_produk,1,1) = '2' then bb.cc_rjtl "+
					"		 when substring(a.kode_produk,1,1) = '3' then bb.cc_ri "+
					"	     when substring(a.kode_produk,1,1) = '4' then bb.cc_res "+
					"   end "+
					"else "+
					"   case when substring(a.kode_produk,1,1) = '1' then bb.bp_rjtp "+
					"		 when substring(a.kode_produk,1,1) = '2' then bb.bp_rjtl "+
					"		 when substring(a.kode_produk,1,1) = '3' then bb.bp_ri "+
					"		 when substring(a.kode_produk,1,1) = '4' then bb.bp_res "+
					"   end "+
					"end) "+
					"where  y.bank_trans+a.kode_lokasi+a.no_hutang in ("+nobukti+") and a.kode_lokasi+a.no_app in ("+noapp+") "+
					"group by b.nama,"+
					"case f.jenis when 'PENSIUN' then "+
					"   case when substring(a.kode_produk,1,1) = '1' then bb.cc_rjtp "+
					"		 when substring(a.kode_produk,1,1) = '2' then bb.cc_rjtl "+
					"	     when substring(a.kode_produk,1,1) = '3' then bb.cc_ri "+
					"	     when substring(a.kode_produk,1,1) = '4' then bb.cc_res "+
					"   end "+
					"else "+
					"   case when substring(a.kode_produk,1,1) = '1' then bb.bp_rjtp "+
					"		 when substring(a.kode_produk,1,1) = '2' then bb.bp_rjtl "+
					"		 when substring(a.kode_produk,1,1) = '3' then bb.bp_ri "+
					"		 when substring(a.kode_produk,1,1) = '4' then bb.bp_res "+
					"   end "+
					"end,case f.jenis when 'PENSIUN' then 'PEMBYR HUTANG PENSIUN' else 'PEMBYR HUTANG PEGAWAI' end, "+
					"case f.jenis when 'PENSIUN' then 'PENSIUN' else 'PEGAWAI' end "+
					
					 "order by dc desc";
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase()]);
			}
		}
		this.sg2.validasi();
		this.pc1.setActivePage(this.pc1.childPage[1]);
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
   	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg2.clear(1);
			this.sg2.validasi();
		}
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