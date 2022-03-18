window.app_kopeg_simpanan_transaksi_fAkruk = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_transaksi_fAkruk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_simpanan_transaksi_fAkruk";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Simpanan: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[710,11,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});				
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[710,13,200,20],caption:"No Bukti Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_sp = new portalui_saiLabelEdit(this,{bound:[710,14,200,20],caption:"Simp. Pokok",tipeText:ttNilai,text:"0",readOnly: true});
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,503,20],caption:"Keterangan", maxLength:150});								
		this.e_sw = new portalui_saiLabelEdit(this,{bound:[710,15,200,20],caption:"Simp. Wajib",tipeText:ttNilai,text:"0",readOnly: true});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Disetujui",btnClick:[this,"doBtnClick"],tag:2});				
		this.e_ss = new portalui_saiLabelEdit(this,{bound:[710,16,200,20],caption:"Simp. Sukarela",tipeText:ttNilai,text:"0",readOnly: true});
		
		this.p2 = new portalui_panel(this,{bound:[20,35,900,200],caption:"Daftar Jurnal Akru Simpanan"});
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[1,20,898,175],colCount:9,
			    colWidth:[[0,1,2,3,4,5,6,7,8],[80,120,80,100,80,110,80,110,100]],
				colTitle:["Kode Loker","Nama Loker","Jenis","Nama Simp.","Akun Piut.","Nama Akun","Akun Simp.","Nama Akun","Total Akru"],
                colFormat:[[8],[cfNilai]],dblClick:[this,"doDblClick"],
                readOnly:true, defaultRow:1,nilaiChange:[this,"doSgChange"]}); 
				
		this.p1 = new portalui_panel(this,{bound:[20,30,900,343],caption:"Daftar Kartu Simpanan untuk Akrual"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,895,320],tag:"9"});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var prd = this.dbLib.getDataProvider("select distinct periode from kop_simpbill_m where modul= 'PGAJI' and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_simpanan_transaksi_fAkruk.extend(window.portalui_childForm);
window.app_kopeg_simpanan_transaksi_fAkruk.implement({
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
		    if (parseFloat(this.perLama) < parseFloat(this.app._periode)) this.e_nb.setTag("0");
			else this.e_nb.setTag("9");
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var pBefore = this.cb_perLama.getText();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpbill_m","no_bill",this.app._lokasi+"-BS"+this.e_periode.getText().substr(2,4)+".","0000"));
						sql.add(" update kop_simpbill_m set set no_link='"+this.e_nb.getText()+"',no_del = concat(no_bill,'r') where no_bill ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_simpbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,no_del,no_link,modul) "+
							    " select concat(no_bill,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,'"+this.e_periode.getText()+"',kode_pp,kode_lokasi,'"+this.cb_app.getText()+"','"+this.app._useLog+"',now(),'F',kode_curr,kurs,no_bill,'-',modul "+
								" from kop_simpbill_m where no_bill = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_simpbill_j (no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_bill,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_simpbill_j where no_bill = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_simp_d (no_simp,no_bill,kode_lokasi,periode,nilai,akun_ar,akun_simp,dc)"+
								" select no_simp,concat(no_bill,'r'),kode_lokasi,periode,nilai,akun_ar,akun_simp,'C' "+ 
								" from kop_simp_d where no_bill = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("update kop_simp_m a,kop_simp_d b set a.periode_gen ='"+pBefore+"' where a.no_simp = b.no_simp and a.kode_lokasi=b.kode_lokasi and a.kode_lokasi = '"+this.app._lokasi+"' and b.no_bill = '"+this.cb_nbLama.getText()+"' ");
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("delete from kop_simpbill_m where no_bill='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_simpbill_j where no_bill='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update kop_simp_m a,kop_simp_d b set a.periode_gen ='"+pBefore+"' where a.no_simp = b.no_simp and a.kode_lokasi=b.kode_lokasi and a.kode_lokasi = '"+this.app._lokasi+"' and b.no_bill = '"+this.cb_nbLama.getText()+"' ");
						sql.add("delete from kop_simp_d where no_bill ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");									
						this.nb = this.cb_nbLama.getText();
					}
				
					sql.add("insert into kop_simpbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,no_del,no_link,modul) values  "+
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+this.tot+",'"+this.e_periode.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',now(),'F','IDR',1,'-','-','PGAJI')");
					var scr1 = "insert into kop_simpbill_j (no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						       "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var baris1 = true;
					var line = undefined;
					var idx = 0;
					for (var i=0; i<this.sg2.rows.getLength(); i++){
						if (!baris1) { scr1 += ",";}	
						scr1 += "('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg2.cells(4,i)+
							 	"','"+this.e_desc.getText()+"','D',"+parseNilai(this.sg2.cells(8,i))+",'"+this.app._kodePP+"','-',"+
								"'"+this.app._lokasi+"','SIMPBILL','ARSIMP','"+this.e_periode.getText()+
								"','IDR',1,'"+this.app._userLog+"',now())";
						idx++;
						scr1 += ",";
						scr1 += "('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg2.cells(6,i)+
							 	"','"+this.e_desc.getText()+"','C',"+parseNilai(this.sg2.cells(8,i))+",'"+this.app._kodePP+"','-',"+
								"'"+this.app._lokasi+"','SIMPBILL','APSIMP','"+this.e_periode.getText()+
								"','IDR',1,'"+this.app._userLog+"',now())";
						baris1 = false;
						idx++;
					}					
					sql.add(scr1);					
					sql.add("insert into kop_simp_d (no_simp,no_bill,kode_lokasi,periode,nilai,akun_ar,akun_simp,dc) "+
							"select x.no_simp,'"+this.nb+"',x.kode_lokasi,'"+this.e_periode.getText()+"',x.nilai,a.akun_ar,a.akun_simp,'D' "+
							"from kop_simp_m x inner join kop_agg y on x.kode_agg=y.kode_agg and x.kode_lokasi=y.kode_lokasi "+
						    "      inner join kop_simp_jenis a on x.kode_simp=a.kode_simp and x.kode_lokasi = a.kode_lokasi "+
						    " where a.kode_lokasi = '"+this.app._lokasi+"' and x.status_aktif='1' and "+
						    "      ((x.jenis in ('SP','SW')) or (x.jenis='SS' and x.status_bayar='AUTODEBET')) and "+
						    "      x.periode_gen<='"+this.e_periode.getText()+"' and x.tgl_tagih <= '"+this.dp_d1.getDateString()+"'");
					var pNext = getNextPeriode(this.e_periode.getText());
					sql.add("update kop_simp_m a,kop_simp_d b set a.periode_gen ='"+pNext+"' where a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi and b.no_bill='"+this.nb+"' and b.kode_lokasi = '"+this.app._lokasi+"' and a.jenis<>'SP' ");
					sql.add("update kop_simp_m a,kop_simp_d b set a.periode_gen ='999999' where a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi and b.no_bill='"+this.nb+"' and b.kode_lokasi = '"+this.app._lokasi+"' and a.jenis='SP' ");
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
					this.sg1.clearAll();
				}
				break;
			case "ubah" :	
			    if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				this.tot = nilaiToFloat(this.e_sp.getText()) + nilaiToFloat(this.e_sw.getText()) + nilaiToFloat(this.e_ss.getText());
				if (this.tot <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai pengakuan tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
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
			case "hapus" : 
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var pBefore = this.cb_perLama.getText();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add(" update kop_simpbill_m set no_del = concat(no_bill,'r') where no_bill ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_simpbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,no_del,no_link,modul) "+
							    " select concat(no_bill,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,'"+this.e_periode.getText()+"',kode_pp,kode_lokasi,'"+this.cb_app.getText()+"','"+this.app._useLog+"',now(),'F',kode_curr,kurs,no_bill,'-',modul "+
								" from kop_simpbill_m where no_bill = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_simpbill_j (no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_bill,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_simpbill_j where no_bill = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_simp_d (no_simp,no_bill,kode_lokasi,periode,nilai,akun_ar,akun_simp,dc)"+
								" select no_simp,concat(no_bill,'r'),kode_lokasi,periode,nilai,akun_ar,akun_simp,'C' "+ 
								" from kop_simp_d where no_bill = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");						
						sql.add("update kop_simp_m a,kop_simp_d b set a.periode_gen ='"+pBefore+"' where a.no_simp = b.no_simp and a.kode_lokasi=b.kode_lokasi and a.kode_lokasi = '"+this.app._lokasi+"' and b.no_bill = '"+this.cb_nbLama.getText()+"' ");
					}
					else{
						sql.add("delete from kop_simpbill_m where no_bill='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_simpbill_j where no_bill='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update kop_simp_m a,kop_simp_d b set a.periode_gen ='"+pBefore+"' where a.no_simp = b.no_simp and a.kode_lokasi=b.kode_lokasi and a.kode_lokasi = '"+this.app._lokasi+"' and b.no_bill = '"+this.cb_nbLama.getText()+"' ");
						sql.add("delete from kop_simp_d where no_bill ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");									
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpbill_m","no_bill",this.app._lokasi+"-BS"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doLoadData: function(sender){
		try{			
			if (this.cb_nbLama.getText() != "") {
				this.sg1.clearAll();
				var data = this.dbLib.getDataProvider("select xx.kode_loker,xx.nama as nama_loker,x.jenis,concat(a.kode_simp,' - ',a.nama) as nama_simp,a.akun_ar,b.nama as nama_ar,a.akun_simp,c.nama as nama_asimp,sum(x.nilai) as total, "+
						   "      bb.no_dokumen,bb.keterangan,bb.nik_app,cc.nama as nama_app,bb.periode,bb.posted "+
						   " from kop_simp_m x inner join kop_agg y on x.kode_agg=y.kode_agg and x.kode_lokasi=y.kode_lokasi "+
						   "      inner join kop_simp_jenis a on x.kode_simp=a.kode_simp and x.kode_lokasi = a.kode_lokasi "+
						   "      inner join masakun b on a.akun_ar = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+    
						   "      inner join masakun c on a.akun_simp = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						   "      inner join kop_loker xx on xx.kode_loker = y.kode_loker and xx.kode_lokasi=y.kode_lokasi "+
						   "      inner join kop_simp_d aa on aa.no_simp=x.no_simp and aa.kode_lokasi=x.kode_lokasi  "+
						   "      inner join kop_simpbill_m bb on bb.no_bill=aa.no_bill and aa.kode_lokasi=bb.kode_lokasi  "+
						   "      inner join karyawan cc on cc.nik=bb.nik_app and cc.kode_lokasi=bb.kode_lokasi  "+
						   " where aa.kode_lokasi = '"+this.app._lokasi+"' and aa.no_bill = '"+this.cb_nbLama.getText()+"' "+
						   " group by xx.kode_loker,a.akun_ar,a.akun_simp order by xx.kode_loker,x.jenis,x.no_simp");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_loker,line.nama_loker,line.jenis,line.nama_simp,line.akun_ar,line.nama_ar,line.akun_simp,line.nama_asimp,floatToNilai(parseFloat(line.total))]);
					}
					this.sg2.validasi();
					this.posted = line.posted;
					this.perLama = line.periode;
					
					this.e_dok.setText(line.no_dokumen);
					this.e_desc.setText(line.keterangan);
					this.cb_app.setText(line.nik_app,line.nama_app);
				}
			} 
			else {
				system.alert(this,"No Bukti harus valid.","Pilih no bukti akru.");
				this.sg1.clearAll();
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Bukti Akru",sender,undefined, 
											  "select a.no_bill,a.no_dokumen,a.keterangan,a.nik_app,b.nama  from kop_simpbill_m a inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.cb_perLama.getText()+"' and a.no_del='-' and a.modul = 'PGAJI' ", 
											  "select count(no_bill)       from kop_simpbill_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' and modul = 'PGAJI'",
											  ["no_bill","no_dokumen","keterangan","nik_app","nama"],"and",["No Bukti","No Dokumen","Deskripsi","NIK App","Nama"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg1.clearAll();
			}
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doDblClick: function(sender, col, row){
		if (this.sg2.getCell(0,row) != "") {
			this.sg1.setColTitle(new Array("No","No Kartu","Tgl Awal Tagih","Kode","Nasabah","Jenis","Nama Simp.","Akun Piut.","Akun Simp","Nilai","Posted","Periode"));				
			var data = this.dbLib.runSQL(" select x.no_simp,x.tgl_tagih,y.kode_agg,y.nama as nama_agg,x.jenis,concat(a.kode_simp,' - ',a.nama) as nama_simp,a.akun_ar,a.akun_simp,x.nilai "+
					   " from kop_simp_m x inner join kop_agg y on x.kode_agg=y.kode_agg and x.kode_lokasi=y.kode_lokasi "+
					   "      inner join kop_simp_jenis a on x.kode_simp=a.kode_simp and x.kode_lokasi = a.kode_lokasi "+
					   "      inner join kop_simp_d aa on aa.no_simp=x.no_simp and aa.kode_lokasi=x.kode_lokasi "+
					   " where aa.no_bill='"+this.cb_nbLama.getText()+"' and y.kode_loker='"+this.sg2.getCell(0,row)+"' and  x.jenis='"+this.sg2.getCell(2,row)+"' and a.akun_ar='"+this.sg2.getCell(4,row)+"' and a.akun_simp='"+this.sg2.getCell(6,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
					   "      order by x.jenis,x.no_simp");

			this.sg1.clearAll();
			this.sg1.setData(data);
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = tot2 = tot3 = 0;			
		for (var i = 0;i < this.sg2.getRowCount();i++){
			if (this.sg2.cells(8,i) != "") {
				if (this.sg2.cells(2,i) == "SP") tot1 += nilaiToFloat(this.sg2.cells(8,i));
				if (this.sg2.cells(2,i) == "SW") tot2 += nilaiToFloat(this.sg2.cells(8,i));
				if (this.sg2.cells(2,i) == "SS") tot3 += nilaiToFloat(this.sg2.cells(8,i));
			}
		}
		this.e_sp.setText(floatToNilai(tot1));
		this.e_sw.setText(floatToNilai(tot2));
		this.e_ss.setText(floatToNilai(tot3));
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.nb +")");							
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