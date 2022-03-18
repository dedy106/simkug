window.app_saku_inventory_transaksi_fJualretk = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_transaksi_fJualretk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_transaksi_fJualretk";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Faktur Retur Penjualan Barang: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2,change :[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[723,11,200,20],caption:"Periode Retur",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,250,20],caption:"No Retur",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,12,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[723,12,200,20],caption:"No Retur Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,343,20],caption:"No Dokumen", maxLength:100, tag:1});				
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150, tag:1});				
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Gudang",tag:2, tag:1});
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Customer",btnClick:[this,"doBtnClick"],tag:1});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Pembuat",btnClick:[this,"doBtnClick"],tag:1});
		this.e_total = new portalui_saiLabelEdit(this,{bound:[723,17,200,20],caption:"Total",tipeText:ttNilai,readOnly:true,text:"0",tag:1});
		
		this.p1 = new portalui_panel(this,{bound:[20,18,900,320],caption:"Item Retur Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,270],colCount:8,tag:2,colTitle:["Kode","Nama","Tipe","Satuan","Harga","Jumlah","Bonus","SubTtl"],
					colWidth:[[0,1,2,3,4,5,6,7],[80,240,140,60,80,80,80,100]],colFormat:[[4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[1,2,3,7],[0,4,5,6]],ellipsClick:[this,"doEllipseClick"],
					change:[this,"doChangeCell"],selectCell:[this,"doSelectCell"],buttonStyle:[[0],[bsEllips]],
					defaultRow:1,nilaiChange:[this, "doSgChange"],autoAppend:true});				
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,295,900,25],buttonStyle:2,grid:this.sg});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('RETJUAL','HUTRET') and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					if (line.kode_spro == "RETJUAL") this.akunRet = line.flag;
					if (line.kode_spro == "HUTRET") this.akunHut = line.flag;
				}
			}
			var prd = this.dbLib.getDataProvider("select distinct periode from inv_jualretur_m where kode_lokasi = '"+this.app._lokasi+"'",true);
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
window.app_saku_inventory_transaksi_fJualretk.extend(window.portalui_childForm);
window.app_saku_inventory_transaksi_fJualretk.implement({
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
					
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_jualretur_m","no_retur",this.app._lokasi+"-RSO"+this.e_periode.getText().substr(2,4)+".","0000"));		
						sql.add(" update inv_jualretur_m set no_link='"+this.e_nb.getText()+"',no_del = concat(no_retur,'r') where no_retur ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into inv_jualretur_m (no_retur,kode_lokasi,tanggal,no_dokumen,keterangan,kode_cust,nik_buat,nilai,periode,nik_user,tgl_input,no_link,no_del,posted,kode_pp,kode_curr,akun_hutang,kode_gudang, progress,no_kas)"+
								" select concat(no_retur,'r'),kode_lokasi,'"+this.dp_d1.getDateString()+"',no_dokumen,keterangan,kode_cust,'"+this.cb_app.getText()+"',nilai,'"+this.e_periode.getText()+"','"+this.app.userLog+"',now(),no_link,no_retur,'F',kode_pp,kode_curr,akun_hutang,kode_gudang, 0,'-' "+ 
								" from inv_jualretur_m where no_retur = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into inv_jualretur_j (no_retur,no_dokumen,tanggal,nu,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_retur,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',nu,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from inv_jualretur_j where no_retur = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");																					
						sql.add(" insert into inv_dt (no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk)"+
								" select concat(no_bukti,'r'),kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,case dc when 'D' then 'C' else 'D' end as dc,'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"',kode_gudang,pdisk "+ 
								" from inv_dt where no_bukti = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and modul = 'RETJUAL'");
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("delete from inv_jualretur_m where no_retur='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_jualretur_j where no_retur='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_dt where no_bukti ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'RETJUAL'");			
						this.nb = this.cb_nbLama.getText();
					}
					
					sql.add("insert into inv_jualretur_m(no_retur,kode_lokasi,tanggal,no_dokumen,keterangan,kode_cust,nik_buat,nilai,periode,nik_user,tgl_input,no_link,no_del,posted,kode_pp,kode_curr,akun_hutang,kode_gudang, progress,no_kas) values" +
						    "('"+this.nb+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.cb_cust.getText()+"','"+this.cb_app.getText()+"',"+
							parseNilai(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-','-','F','"+this.app._kodePP+"','IDR','"+this.akunHut+"','"+this.cb_gudang.getText()+"','0','-')");															
					
					if (this.sg.getRowValidCount() > 0){
						var d="insert into inv_dt (no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk) values ";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (i > 0) d+= ",";
								d += "('"+this.nb+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+","+parseNilai(this.sg.cells(6,i))+",'RETJUAL','D','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_gudang.getText()+"',0)";
							}
						}						
						sql.add(d);
					}	
					sql.add("insert into inv_jualretur_j(no_retur,no_dokumen,tanggal,nu,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values" +
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunRet+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','RETJUAL','RETUR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					sql.add("insert into inv_jualretur_j(no_retur,no_dokumen,tanggal,nu,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values" +
						    "('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunHut+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','RETJUAL','HUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
										
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
				}
				break;
			case "ubah" :	
			    for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
				if (this.progress != "0") {
					system.alert(this,"Transaksi sudah diproses kasbank.","Transaksi tidak dapat dibatalkan [Progress : "+this.progress+"].");
					return false;
				}
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				if (nilaiToFloat(this.e_total.getText()) == 0){
					systemAPI.alert(this,"Transaksi tidak valid.","Nilai retur tidak boleh nol.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" : 
				if (this.progress != "0") {
					system.alert(this,"Transaksi sudah diproses kasbank.","Transaksi tidak dapat dibatalkan [Progress : "+this.progress+"].");
					return false;
				}
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add(" update inv_jualretur_m set no_del = concat(no_retur,'r') where no_retur ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into inv_jualretur_m (no_retur,kode_lokasi,tanggal,no_dokumen,keterangan,kode_cust,nik_buat,nilai,periode,nik_user,tgl_input,no_link,no_del,posted,kode_pp,kode_curr,akun_hutang,kode_gudang, progress,no_kas)"+
								" select concat(no_retur,'r'),kode_lokasi,'"+this.dp_d1.getDateString()+"',no_dokumen,keterangan,kode_cust,'"+this.cb_app.getText()+"',nilai,'"+this.e_periode.getText()+"','"+this.app.userLog+"',now(),no_link,no_retur,'F',kode_pp,kode_curr,akun_hutang,kode_gudang, 0,'-' "+ 
								" from inv_jualretur_m where no_retur = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");							
						sql.add(" insert into inv_jualretur_j (no_retur,no_dokumen,tanggal,nu,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_retur,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',nu,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from inv_jualretur_j where no_retur = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");																					
						sql.add(" insert into inv_dt (no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk)"+
								" select concat(no_bukti,'r'),kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,case dc when 'D' then 'C' else 'D' end as dc,'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"',kode_gudang,pdisk "+ 
								" from inv_dt where no_bukti = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and modul = 'RETJUAL'");
					}
					else{
						sql.add("delete from inv_jualretur_m where no_retur='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_jualretur_j where no_retur='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_dt where no_bukti ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'RETJUAL'");			
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;
		}
	},
	doChange:function(sender){
			this.sg.clear(1);
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_jualretur_m","no_retur",this.app._lokasi+"-RSO"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doLoadData:function(sender){
		if (this.cb_nbLama.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.no_dokumen,a.keterangan,a.kode_gudang,b.nama as nama_gudang,a.kode_cust,c.nama as nama_cust,a.nik_buat,d.nama as nama_buat,a.nilai,a.posted,a.periode,a.progress, "+
												  "       e.kode_brg,f.nama as nama_brg,f.tipe,f.sat,e.harga,e.jumlah,e.bonus,(e.jumlah * e.harga) as subttl "+
												  "from inv_jualretur_m a inner join inv_gudang  b on a.kode_gudang=b.kode_gudang and a.kode_lokasi=b.kode_lokasi "+
												  "                  inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
												  "                  inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi "+
												  "                  inner join inv_dt e on a.no_retur=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.modul='RETJUAL' "+
												  "                  inner join inv_brg f on e.kode_brg=f.kode_brg and e.kode_lokasi=f.kode_lokasi  "+
												  "where a.no_retur = '"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_del='-' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_brg,line.nama_brg,line.tipe,line.sat,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.bonus),floatToNilai(line.subttl)]);
				}
				this.sg.validasi();
				if (line !== undefined){
					this.e_dok.setText(line.no_dokumen);
					this.e_desc.setText(line.keterangan);
					this.cb_gudang.setText(line.kode_gudang, line.nama_gudang);
					this.cb_cust.setText(line.kode_cust, line.nama_cust);
					this.cb_app.setText(line.nik_buat, line.nama_buat);
					this.e_total.setText(floatToNilai(line.nilai));
					
					this.progress = line.progress;						
					this.posted = line.posted;						
					this.perLama = line.periode;						
				}
			}
		}
		else {
			system.alert(this,"No Retur lama tidak valid.","Bukti retur harus dipilih.");
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Retur Penjualan",sender,undefined, 
											  "select no_retur, no_dokumen  from inv_jualretur_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'", 
											  "select count(no_retur) from inv_jualretur_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'",
											  ["no_retur","no_dokumen"],"and",["No Retur","No Dokumen"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg.clear(1);
			}
			if (sender == this.cb_cust) {   
			    this.standarLib.showListData(this, "Daftar Customer",sender,undefined, 
											  "select kode_cust, nama  from cust where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_cust) from cust where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_cust","nama"],"and",["Kode Cust","Nama"],false);				
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
											  "select a.kode_brg, a.nama, a.tipe, a.sat, a.harga from inv_brg a where a.kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from inv_brg where kode_lokasi='"+this.app._lokasi+"' ",
											  ["kode_brg","nama","tipe","sat","harga"],"and",["Kode","Nama","Tipe","Satuan","Harga"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg.setCell(2,row,this.sg.dataFromList[2]);
			this.sg.setCell(3,row,this.sg.dataFromList[3]);
			this.sg.setCell(4,row,this.sg.dataFromList[4]);
		}
		if ((col == 4) || (col == 5)){
			if ((this.sg.getCell(4,row) != "") && (this.sg.getCell(5,row) != "")) {
				var subttl = nilaiToFloat(this.sg.getCell(4,row)) * nilaiToFloat(this.sg.getCell(5,row));
				this.sg.setCell(7,row,floatToNilai(subttl));
				this.sg.validasi();
			}
		}
	},
	doSelectCell: function(sender, col, row){
		if ((col == 5) && (this.sg.getCell(5,row) == "")){
			this.sg.setCell(5,row,"0");
		}
		if ((col == 6) && (this.sg.getCell(6,row) == "")){
			this.sg.setCell(6,row,"0");
		}
	},
	doSgChange: function(sender, col, row){
		var tot = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(7,i) != "")
				tot += nilaiToFloat(this.sg.cells(7,i));
		}	
		this.e_total.setText(floatToNilai(tot));
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.nb+")");							
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