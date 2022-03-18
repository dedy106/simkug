window.app_saku_inventory_transaksi_fBelik = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_transaksi_fBelik.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_transaksi_fBelik";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Faktur Pembelian Barang: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[723,11,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,12,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[723,12,200,20],caption:"No Bukti Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,343,20],caption:"No Dokumen", maxLength:100, tag:1});				
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150, tag:1});				
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Gudang",btnClick:[this,"doBtnClick"],tag:1});		
		this.cb_vend = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Vendor",btnClick:[this,"doBtnClick"],tag:1});
		this.e_disk = new portalui_saiLabelEdit(this,{bound:[723,16,200,20],caption:"Total Jurnal+ (net)",tipeText:ttNilai,tag:1,text:"0",readOnly:true});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Pembuat",btnClick:[this,"doBtnClick"],tag:1});
		this.e_total2 = new portalui_saiLabelEdit(this,{bound:[723,17,200,20],caption:"Total",tipeText:ttNilai,readOnly:true,text:"0", tag:1});
		this.cb_jenis = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Jenis Pembelian",btnClick:[this,"doBtnClick"],tag:2});		
		this.e_ppn = new portalui_saiLabelEdit(this,{bound:[723,18,200,20],caption:"Nilai PPN",tipeText:ttNilai,text:"0", tag:1});
		this.bTambah = new portalui_button(this,{bound:[629,18,80,18],caption:"Jurnal +",click:[this,"doTambahClick"]});		
		
		this.p1 = new portalui_panel(this,{bound:[20,19,900,295],caption:"Item Pembelian Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,248],colCount:9,tag:2,colTitle:["Kode","Nama","Tipe","Satuan","Harga","Jumlah","Bonus","SubTtl","Akun Pembelian"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[80,240,140,60,80,80,80,100,0]],colFormat:[[4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[1,2,3,7,8],[0,4,5,6]],ellipsClick:[this,"doEllipseClick"],
					change:[this,"doChangeCell"],selectCell:[this,"doSelectCell"],buttonStyle:[[0],[bsEllips]],
					defaultRow:1,nilaiChange:[this, "doSgChange"],autoAppend:true});				
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,268,900,25],buttonStyle:2,grid:this.sg});
		this.e_total = new portalui_saiLabelEdit(this.sgn,{bound:[700,3,200,20],caption:"Sub Total",tipeText:ttNilai,readOnly:true,text:"0", tag:1});		
		this.p2  = new portalui_panel(this,{bound:[20,19,900,170],caption:"Jurnal Tambahan Pembelian", visible: false});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();												
			this.jurnal = new app_saku_fJurnalViewer(this.app,{bound:[0,0,system.screenWidth,system.screenHeight],visible:false});
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('PPNM','PPPNM') and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					if (line.kode_spro == "PPNM") this.akunPPN = line.flag;
					if (line.kode_spro == "PPPNM") this.pPPN = line.value1;
				}
			}
			var prd = this.dbLib.getDataProvider("select distinct periode from inv_beli_m where kode_lokasi = '"+this.app._lokasi+"'",true);
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
window.app_saku_inventory_transaksi_fBelik.extend(window.portalui_childForm);
window.app_saku_inventory_transaksi_fBelik.implement({
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
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_beli_m","no_beli",this.app._lokasi+"-PO"+this.e_periode.getText().substr(2,4)+".","0000"));
						sql.add(" update inv_beli_m set no_link='"+this.e_nb.getText()+"',no_del = concat(no_beli,'r') where no_beli ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into inv_beli_m (no_beli,kode_lokasi,tanggal,no_dokumen,keterangan,kode_vendor,nik_buat,nilai,nilai_ppn,periode,nik_user,tgl_input,no_link,no_del,posted,kode_pp,kode_curr,akun_hutang,kode_gudang,kode_jenis)"+
								" select concat(no_beli,'r'),kode_lokasi,'"+this.dp_d1.getDateString()+"',no_dokumen,keterangan,kode_vendor,'"+this.cb_app.getText()+"',nilai,nilai_ppn,'"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-',no_beli,'F',kode_pp,kode_curr,akun_hutang,kode_gudang,kode_jenis "+ 
								" from inv_beli_m where no_beli = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into inv_beli_j (no_beli,no_dokumen,tanggal,nu,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_beli,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',nu,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from inv_beli_j where no_beli = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");									
						sql.add(" insert into inv_dt (no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk)"+
								" select concat(no_bukti,'r'),kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,case dc when 'D' then 'C' else 'D' end as dc,'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"',kode_gudang,pdisk "+ 
								" from inv_dt where no_bukti = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and modul = 'BELI'");
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("delete from inv_beli_m where no_beli='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_beli_j where no_beli='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_dt where no_bukti ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'BELI'");			
						this.nb = this.cb_nbLama.getText();
					}
					
					sql.add("insert into inv_beli_m(no_beli,kode_lokasi,tanggal,no_dokumen,keterangan,kode_vendor,nik_buat,nilai,nilai_ppn,periode,nik_user,tgl_input,no_link,no_del,posted,kode_pp,kode_curr,akun_hutang,kode_gudang,kode_jenis) values" +
						    "('"+this.nb+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.cb_vend.getText()+"','"+this.cb_app.getText()+"',"+parseNilai(this.e_total2.getText())+","+
							     parseNilai(this.e_ppn.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-','-','F','"+this.app._kodePP+"','IDR','"+this.akunap+"','"+this.cb_gudang.getText()+"','"+this.cb_jenis.getText()+"')");
					if (this.sg.getRowValidCount() > 0){
						var d="insert into inv_dt (no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk) values ";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (i > 0) d+= ",";
								d += "('"+this.nb+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(4,i))+","+parseNilai(this.sg.cells(5,i))+","+parseNilai(this.sg.cells(6,i))+",'BELI','D','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_gudang.getText()+"',0)";
							}
						}						
						sql.add(d);
					}	
					this.createJurnal();
					var d = "insert into inv_beli_j(no_beli,no_dokumen,tanggal,nu,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var s = 0;
					for (var i in this.dataJurnal.rs.rows){
						line = this.dataJurnal.rs.rows[i];
						if (line.nilai != 0) {
							if (s >0) d+=",";
							s++;
							d+="('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+s+",'"+line.kode_akun+"','"+this.e_desc.getText()+"','"+line.dc+"',"+line.nilai+",'"+line.kode_pp+"','"+line.kode_drk+"','"+this.app._lokasi+"','INVBELI','BELI','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						}
					}
					sql.add(d);								
					if (nilaiToFloat(this.e_ppn.getText()) != 0) {
						s++;
						sql.add("insert into inv_beli_j(no_beli,no_dokumen,tanggal,nu,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values" +
								"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+s+",'"+this.akunPPN+"','PPN','D',"+parseNilai(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','INVBELI','PPNBELI','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					}
					s++;
					this.nilaihut = nilaiToFloat(this.e_total2.getText()) + nilaiToFloat(this.e_ppn.getText());
					sql.add("insert into inv_beli_j(no_beli,no_dokumen,tanggal,nu,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values" +
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+s+",'"+this.akunap+"','"+this.e_desc.getText()+"','C',"+this.nilaihut+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','INVBELI','HUTBELI','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					if (this.p2.visible == true) {
						var idx = 3;
						var DC = "";
						if (this.sg2.getRowValidCount() > 0){
							var d="insert into inv_beli_j(no_beli,no_dokumen,tanggal,nu,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
							for (var i=0;i < this.sg2.getRowCount();i++){
								if (this.sg2.rowValid(i)){
									if (i > 0) d+= ",";
									if (this.sg2.cells(3,i) == "+") DC = "D"; 
									else if (this.sg2.cells(3,i) == "-") DC = "C";
									d += "('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+DC+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','INVBELI','BBNBELI','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
									idx++;
								}
							}						
							sql.add(d);
						}
					}
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
					if (this.p2.visible == true) {
						this.sg2.setTag(9);
						this.sg2.clear(1);
						this.p2.setVisible(false);
					}
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
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				if (this.nilaihut == 0){
					systemAPI.alert(this,"Transaksi tidak valid.","Nilai Hutang tidak boleh nol.");
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
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add(" update inv_beli_m set no_del = concat(no_beli,'r') where no_beli ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into inv_beli_m (no_beli,kode_lokasi,tanggal,no_dokumen,keterangan,kode_vendor,nik_buat,nilai,nilai_ppn,periode,nik_user,tgl_input,no_link,no_del,posted,kode_pp,kode_curr,akun_hutang,kode_gudang,kode_jenis)"+
								" select concat(no_beli,'r'),kode_lokasi,'"+this.dp_d1.getDateString()+"',no_dokumen,keterangan,kode_vendor,'"+this.cb_app.getText()+"',nilai,nilai_ppn,'"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-',no_beli,'F',kode_pp,kode_curr,akun_hutang,kode_gudang,kode_jenis "+ 
								" from inv_beli_m where no_beli = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");																					
						sql.add(" insert into inv_beli_j (no_beli,no_dokumen,tanggal,nu,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_beli,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',nu,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from inv_beli_j where no_beli = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");									
						sql.add(" insert into inv_dt (no_bukti,kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,dc,periode,tanggal,kode_gudang,pdisk)"+
								" select concat(no_bukti,'r'),kode_lokasi,nu,kode_brg,harga,jumlah,bonus,modul,case dc when 'D' then 'C' else 'D' end as dc,'"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"',kode_gudang,pdisk "+ 
								" from inv_dt where no_bukti = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and modul = 'BELI'");															
					}
					else{
						sql.add("delete from inv_beli_m where no_beli='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_beli_j where no_beli='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_dt where no_bukti ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'BELI'");			
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;
		}
	},
	createJurnal: function(){		
		try{
			var rows = [];
			for (var i=0;i < this.sg.getRowCount();i++){
				if (nilaiToFloat(this.sg.cells(7,i)) != 0){
					var temu = false;
					for (var j in rows){
						if (rows[j].kode_akun == this.sg.cells(8,i)) {
							rows[j].nilai += nilaiToFloat(this.sg.cells(7,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(8,i),nama:'-',dc:"D", keterangan: "-", nilai: nilaiToFloat(this.sg.cells(7,i)),kode_pp:this.app._kodePP, kode_drk:'-', jenis:'BELI'};
					}
				}
			} 
			this.dataJurnal = {rs: { 	rows:rows,
										fields : { 	kode_akun : {type:"S",length:80},
													nama :{type:"S",length:200},
													dc:{type:"S",length:50},
													keterangan:{type:"S",length:200},
													nilai:{type:"N", length:100},
													kode_pp:{type:"S",length:100},
													kode_drk:{type:"S",length:100},
													jenis:{type:"S",length:10}
											}
								   }
							};		
		}catch(e){
			system.alert(this,e,"");
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_beli_m","no_beli",this.app._lokasi+"-PO"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doLoadData:function(sender){
		if (this.cb_nbLama.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.no_dokumen,a.keterangan,a.kode_gudang,b.nama as nama_gudang,a.kode_vendor,c.nama as nama_vendor,a.nik_buat,d.nama as nama_buat,a.nilai,a.nilai_ppn,a.posted,a.periode,a.kode_jenis,x.nama as nama_jenis,a.akun_hutang,"+
												  "       e.kode_brg,f.nama as nama_brg,f.tipe,f.sat,e.harga,e.jumlah,e.bonus,(e.jumlah * e.harga) as subttl,z.akun_beli "+
												  "from inv_beli_m a inner join inv_gudang  b on a.kode_gudang=b.kode_gudang and a.kode_lokasi=b.kode_lokasi "+
												  "                  inner join vendor  c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi "+
												  "                  inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi "+
												  "                  inner join inv_dt e on a.no_beli=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.modul='BELI' "+
												  "                  inner join inv_brg f on e.kode_brg=f.kode_brg and e.kode_lokasi=f.kode_lokasi  "+
												  "                  inner join inv_beli_jenis x on a.kode_jenis=x.kode_jenis and a.kode_lokasi=x.kode_lokasi  "+
												  "                  inner join inv_brg_klp z on f.kode_klpbrg=z.kode_klpbrg and f.kode_lokasi=z.kode_lokasi  "+
												  "where a.no_beli = '"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_del='-'");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_brg,line.nama_brg,line.tipe,line.sat,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.bonus),floatToNilai(line.subttl),line.akun_beli]);
				}
				this.sg.validasi();
				if (line !== undefined){
					this.e_dok.setText(line.no_dokumen);
					this.e_desc.setText(line.keterangan);
					this.cb_gudang.setText(line.kode_gudang, line.nama_gudang);
					this.cb_vend.setText(line.kode_vendor, line.nama_vendor);
					this.cb_app.setText(line.nik_buat, line.nama_buat);
					this.cb_jenis.onChange.set(this, undefined);
					this.cb_jenis.setText(line.kode_jenis, line.nama_jenis);
					this.cb_jenis.onChange.set(this, "doChange");
					this.e_ppn.setText(floatToNilai(line.nilai_ppn));
					
					this.posted = line.posted;						
					this.perLama = line.periode;						
					this.akunap = line.akun_hutang;
				}
			}
			var data = this.dbLib.getDataProvider("select g.nu,g.kode_akun,h.nama as nama_akun,g.keterangan,case g.dc when 'D' then '+' else '-' end as dc,g.nilai "+
												  "from inv_beli_j g inner join masakun h on g.kode_akun=h.kode_akun and g.kode_lokasi=h.kode_lokasi "+
												  "where g.modul='INVBELI' and g.jenis='BBNBELI' and "+
												  "      g.no_beli = '"+this.cb_nbLama.getText()+"' and g.kode_lokasi='"+this.app._lokasi+"' order by g.nu");
			eval("data = "+data+";");
			if (typeof data == "object"){
				if (data.rs.rows[0] !== undefined) {
					this.bTambah.click();
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.keterangan,line.dc,floatToNilai(line.nilai)]);
					}
					this.sg2.validasi();
				}
			}
		}
		else {
			system.alert(this,"Faktur lama tidak valid.","Data faktur harus dipilih.");
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Faktur Pembelian",sender,undefined, 
											  "select no_beli, no_dokumen  from inv_beli_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'", 
											  "select count(no_beli) from inv_beli_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'",
											  ["no_beli","no_dokumen"],"and",["No Faktur","No Dokumen"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg.clear(1);
				if (this.p2.visible == true) {
				    this.sg2.setTag(9);
					this.sg2.clear(1);
					this.p2.setVisible(false);
				}
			}
			if (sender == this.cb_jenis) {   
			    this.standarLib.showListData(this, "Daftar Jenis Pembelian",sender,undefined, 
											  "select kode_jenis, nama, akun_hutang from inv_beli_jenis where kode_lokasi = '"+this.app._lokasi+"'",
											  "select count(kode_jenis) from inv_beli_jenis where kode_lokasi = '"+this.app._lokasi+"'",
											  ["kode_jenis","nama","akun_hutang"],"and",["Kode","Nama","Akun Hutang"],false);				
			}
			if (sender == this.cb_gudang) {   
			    this.standarLib.showListData(this, "Daftar Gudang",sender,undefined, 
											  "select kode_gudang, nama  from inv_gudang where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_gudang) from inv_gudang where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_gudang","nama"],"and",["Kode","Nama"],false);				
			}
			if (sender == this.cb_vend) {   
			    this.standarLib.showListData(this, "Daftar Vendor",sender,undefined, 
											  "select kode_vendor, nama  from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_vendor) from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_vendor","nama"],"and",["Kode Vendor","Nama"],false);				
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
	doTambahClick: function(sender){
		try{						
			if (this.p2.visible == false) {
				this.p2.setVisible(true);
				this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,120],colCount:5,tag:2,colTitle:["Kode","Nama","Keterangan","+/-","Nilai"],
					colWidth:[[0,1,2,3,4],[80,200,380,60,140]],colFormat:[[4],[cfNilai]],
					columnReadOnly:[true,[1],[0,2,3,4]],ellipsClick:[this,"doEllipseClick"],
					change:[this,"doChangeCell"],buttonStyle:[[0,3],[bsEllips,bsAuto]],
					picklist:[[3],[new portalui_arrayMap({items:["+","-"]})]],selectCell:[this,"doSelectCell"],
					defaultRow:1,nilaiChange:[this, "doSgChange2"],autoAppend:true});				
				this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[0,142,900,25],buttonStyle:2,grid:this.sg2});				
			} else {
			    this.sg2.setTag(9);
				this.sg2.clear(1);
				this.sg2.validasi();
				this.p2.setVisible(false);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChange: function(sender){
		try{			
		    if (sender == this.cb_jenis) this.akunap = this.cb_jenis.dataFromList[2];
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
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
												  "select a.kode_brg, a.nama, a.tipe, a.sat,c.akun_beli from inv_brg a inner join inv_brg_klp c on a.kode_klpbrg=c.kode_klpbrg where a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(kode_brg) from inv_brg where kode_lokasi='"+this.app._lokasi+"'",
												  ["kode_brg","nama","tipe","sat","akun_beli"],"and",["Kode","Nama","Tipe","Satuan","Akun Pembelian"],false);				
				}
			}
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun Jurnal Tambahan",sender,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag = '027' ",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag = '027' ",
											  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (sender == this.sg) {
			if (col == 0) {
				this.sg.setCell(2,row,this.sg.dataFromList[2]);
				this.sg.setCell(3,row,this.sg.dataFromList[3]);
				this.sg.setCell(8,row,this.sg.dataFromList[4]);
			}
			if ((col == 4) || (col == 5) || (col == 6)){
				if ((this.sg.getCell(4,row) != "") && (this.sg.getCell(5,row) != "")) {
					var subttl = nilaiToFloat(this.sg.getCell(4,row)) * nilaiToFloat(this.sg.getCell(5,row));
					this.sg.setCell(7,row,floatToNilai(subttl));
				}
				this.sg.validasi();
			}
		}
		if (sender == this.sg2) {
			if ((col == 3) || (col == 4)){
				this.sg2.validasi();
			}
		}
	},
	doSelectCell: function(sender, col, row){
		if (sender == this.sg) {
			if ((col == 4) && (this.sg.getCell(4,row) == "")){
				this.sg.setCell(4,row,"0");
			}
			if ((col == 5) && (this.sg.getCell(5,row) == "")){
				this.sg.setCell(5,row,"0");
			}
			if ((col == 6) && (this.sg.getCell(6,row) == "")){
				this.sg.setCell(6,row,"0");
			}
		}
		if (sender == this.sg2) {
			if ((col == 2) && (this.sg2.getCell(2,row) == "")){
				this.sg2.setCell(2,row,this.sg2.cells(1,row));
			}
		}
	},
	doSgChange: function(sender, col, row){
		var tot = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(7,i) != "")
				tot += nilaiToFloat(this.sg.cells(7,i));
		}	
		this.e_total.setText(floatToNilai(tot));
		var tot2 = (nilaiToFloat(this.e_total.getText()) + nilaiToFloat(this.e_disk.getText()));
		this.e_total2.setText(floatToNilai(tot2));
		var ppn = Math.round(this.pPPN/100 * nilaiToFloat(this.e_total2.getText()));
		this.e_ppn.setText(floatToNilai(ppn));		
	},
	doSgChange2: function(sender, col, row){		
		var tot3 = 0;			
		if (this.p2.visible == true) {
			for (var i = 0;i < this.sg2.getRowCount();i++){
				if (this.sg2.cells(4,i) != "") {
					if (this.sg2.cells(3,i) == "+")
						tot3 += nilaiToFloat(this.sg2.cells(4,i));
					else {if (this.sg2.cells(3,i) == "-") tot3 = tot3 - nilaiToFloat(this.sg2.cells(4,i));}
				}
			}
		}
		this.e_disk.setText(floatToNilai(tot3));
		var tot2 = (nilaiToFloat(this.e_total.getText()) + nilaiToFloat(this.e_disk.getText()));
		this.e_total2.setText(floatToNilai(tot2));
		var ppn = Math.round(this.pPPN/100 * nilaiToFloat(this.e_total2.getText()));
		this.e_ppn.setText(floatToNilai(ppn));		
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