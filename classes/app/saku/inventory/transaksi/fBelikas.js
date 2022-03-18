window.app_saku_inventory_transaksi_fBelikas = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_transaksi_fBelikas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_transaksi_fBelikas";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembayaran Pembelian [KB]: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_jenis = new portalui_saiCB(this,{bound:[20,12,200,20],caption:"Jenis",items:["KAS","BANK"],change:[this,"doChange"],tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No KasBank",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,503,20],caption:"Keterangan", maxLength:150});				
		this.e_tothut = new portalui_saiLabelEdit(this,{bound:[723,15,200,20],caption:"Total Hutang",tipeText:ttNilai,readOnly:true,text:"0"});
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Rek. KasBank",btnClick:[this,"doBtnClick"],tag:2,change:[this,"doChange"]});
		this.e_totbayar = new portalui_saiLabelEdit(this,{bound:[723,16,200,20],caption:"Total Bayar",tipeText:ttNilai,text:"0",readOnly:true});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Disetujui",btnClick:[this,"doBtnClick"],tag:2});		
		this.e_totret = new portalui_saiLabelEdit(this,{bound:[723,17,200,20],caption:"Total Retur",tipeText:ttNilai,text:"0",readOnly:true,tag:9});
		this.cb_vend = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Vendor",btnClick:[this,"doBtnClick"],tag:2});
		this.e_totkas = new portalui_saiLabelEdit(this,{bound:[723,18,200,20],caption:"Total KasBank",tipeText:ttNilai,text:"0",readOnly:true});
		this.bTampil = new portalui_button(this,{bound:[545,18,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		this.bRetur = new portalui_button(this,{bound:[629,18,80,18],caption:"Retur",click:[this,"doReturClick"]});		
		
		this.p1 = new portalui_panel(this,{bound:[20,18,900,295],caption:"Item Faktur Pembelian Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,270],colCount:8,tag:2,colTitle:["No Faktur","Akun Hut","Tanggal","Keterangan","Netto","Total Bayar","Sisa Hutang","Nilai Bayar"],
					colWidth:[[0,1,2,3,4,5,6,7],[100,60,70,230,100,100,100,100]],colFormat:[[4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[7]],change:[this,"doChangeCell"],autoAppend:false,
					defaultRow:1,nilaiChange:[this, "doSgChange"]});				
		this.p2 = new portalui_panel(this,{bound:[20,19,900,145],caption:"Item Faktur Retur Pembelian Barang", visible: false});
					
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.jenis = "KK";
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_inventory_transaksi_fBelikas.extend(window.portalui_childForm);
window.app_saku_inventory_transaksi_fBelikas.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{									
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.jenis+this.e_periode.getText().substr(2,4)+".","0000"));		
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
							"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.akunkb+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','"+this.app._kodePP+"','KBO_BELI','"+this.jenis+"','"+this.e_periode.getText()+
							"','IDR',1,"+parseNilai(this.e_totkas.getText())+",'"+this.cb_app.getText()+"','-',now(),'"+this.app._userLog+"','F','-','-','"+this.cb_vend.getText()+"','"+this.cb_akun.getText()+"')");
					
					sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunkb+
							"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_totkas.getText())+",'"+this.app._kodePP+"','-','-',"+
							"'"+this.app._lokasi+"','KBO_BELI','KAS',"+
							"'"+this.e_periode.getText()+"','IDR',1"+
							",'"+this.app._userLog+"',now(),'"+this.cb_akun.getText()+"')");
					
					var j = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (nilaiToFloat(this.sg.getCell(7,i)) != 0){
							    j++;
								sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
										"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
										"('"+this.e_nb.getText()+"','"+this.sg.cells(0,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(1,i)+
										"','"+this.sg.cells(3,i)+"','D',"+parseNilai(this.sg.cells(7,i))+",'"+this.app._kodePP+"','-','-',"+
										"'"+this.app._lokasi+"','KBO_BELI','HUTBELI',"+
										"'"+this.e_periode.getText()+"','IDR',1"+
										",'"+this.app._userLog+"',now(),'-')");
									
								sql.add("insert into kas_d(no_kas,no_bukti,modul,catatan,no_del,kode_lokasi,nilai) values "+
										"                 ('"+this.e_nb.getText()+"','"+this.sg.cells(0,i)+"','INVBELI','-','-','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(7,i))+")");
							}
						}
					}
					if (this.e_totret.getText() != "0") {
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (this.sg2.getCell(0,i) == "OFFSET"){
								    j++;
									sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
											"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
											"('"+this.e_nb.getText()+"','"+this.sg2.cells(1,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg2.cells(2,i)+
											"','Offset retur pembelian','C',"+parseNilai(this.sg2.cells(5,i))+",'"+this.app._kodePP+"','-','-',"+
											"'"+this.app._lokasi+"','KBO_BELI','RETBELI',"+
											"'"+this.e_periode.getText()+"','IDR',1"+
											",'"+this.app._userLog+"',now(),'-')");									
									sql.add("update inv_beliretur_m set progress='1', no_kas='"+this.e_nb.getText()+"' where no_retur='"+this.sg2.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
									sql.add("insert into kas_d(no_kas,no_bukti,modul,catatan,no_del,kode_lokasi,nilai) values "+
											"                 ('"+this.e_nb.getText()+"','"+this.sg2.cells(1,i)+"','RETBELI','-','-','"+this.app._lokasi+"',"+parseNilai(this.sg2.cells(5,i))+")");
								}
							}
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
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg.clear(1);
					if (this.p2.visible == true) {
					    this.sg2.setTag(9);
						this.sg2.clear(1);
						this.p2.setVisible(false);
					}
				}
				break;
			case "simpan" :	
			    if (this.e_totret.getText() == "0") this.e_totret.setTag("9"); else this.e_totret.setTag("0");
				if ((nilaiToFloat(this.e_totkas.getText()) <= 0) || ((nilaiToFloat(this.e_totkas.getText())+nilaiToFloat(this.e_totret.getText())) > nilaiToFloat(this.e_tothut.getText()))){
					system.alert(this,"Transaksi tidak valid.","Nilai kasbank dan atau retur tidak boleh kurang dari atau sama dengan nol / melebihi sisa hutang.");
					return false;
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (nilaiToFloat(this.sg.getCell(7,i)) > nilaiToFloat(this.sg.getCell(6,i))){
							system.alert(this,"Nilai bayar tidak valid.","Melebihi sisa hutang. Baris["+i+"]");
							return false;   
						}
					if (this.dp_d1.toSysDate() < new Date().strToDate(this.sg.getCell(2,i))) {
							system.alert(this,"Tanggal tidak valid.","Tanggal kurang dari tgl faktur. Baris["+i+"]");
							return false;   
						}
					}
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
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_akun) {
				this.akunkb = this.cb_akun.dataFromList[2];
			}
			if (sender == this.cb_jenis) {
				if (this.cb_jenis.getText().toUpperCase() == "KAS") this.jenis = "KK";
				if (this.cb_jenis.getText().toUpperCase() == "BANK") this.jenis = "BK";
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.jenis+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doTampilClick: function(sender){
		try{			
			if (this.cb_vend.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_beli,a.akun_hutang,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.nilai+a.nilai_ppn as nilai,ifnull(b.totbayar,0)+ifnull(c.totgb,0) as totbayar,(a.nilai+a.nilai_ppn - (ifnull(b.totbayar,0)+ifnull(c.totgb,0))) as sisahut,0 as nilaibayar "+
				                                      "from inv_beli_m a left outer join "+
													  "                     (select y.no_bukti,x.kode_lokasi,sum(y.nilai) as totbayar from kas_m x inner join kas_d y on x.no_kas=y.no_kas and x.kode_lokasi=y.kode_lokasi "+
													  "                      where x.kode_lokasi='"+this.app._lokasi+"' and y.modul='INVBELI' and x.no_del='-'"+
													  "                      group by y.no_bukti,x.kode_lokasi) b on a.no_beli=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+  
													  "                  left outer join "+
													  "                     (select y.no_bukti,x.kode_lokasi,sum(y.nilai) as totgb from gb_m x inner join gb_d y on x.no_gb=y.no_gb and x.kode_lokasi=y.kode_lokasi "+
													  "                      where x.kode_lokasi='"+this.app._lokasi+"' and y.modul='GBBELI' and x.no_del='-'"+
													  "                      group by y.no_bukti,x.kode_lokasi) c on a.no_beli=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+  
													  "where a.kode_vendor='"+this.cb_vend.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' "+
													  "      and (a.nilai+a.nilai_ppn - (ifnull(b.totbayar,0)+ifnull(c.totgb,0)))>0");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.no_beli,line.akun_hutang,line.tanggal,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.totbayar),floatToNilai(line.sisahut),floatToNilai(line.nilaibayar)]);
					}
					this.sg.validasi();
				}
			}
			else {
				system.alert(this,"Vendor tidak valid.","Data vendor harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doReturClick: function(sender){
		try{			
			if (this.cb_vend.getText() != ""){
				if (this.p2.visible == false) {
					this.p2.setVisible(true);
					this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,125],colCount:6,tag:9,
					    colTitle:["Status","No Retur","Akun Piutang","Tanggal","Keterangan","Nilai"],
						colWidth:[[0,1,2,3,4,5],[100,160,100,70,330,100]],colFormat:[[5],[cfNilai]],
						columnReadOnly:[true,[1,2,3,4,5],[0]],autoAppend:false,buttonStyle:[[0],[bsAuto]], 
						picklist:[[0],[new portalui_arrayMap({items:["OFFSET","INPROG"]})]],
						defaultRow:1,nilaiChange:[this, "doSgChange2"], change:[this,"doChangeCell"]});				
				} else this.p2.setVisible(false);
				
				var data = this.dbLib.getDataProvider("select no_retur, akun_piutang, date_format(tanggal,'%d/%m/%Y') as tanggal, keterangan, nilai "+
				           "from inv_beliretur_m where progress='0' and kode_vendor='"+this.cb_vend.getText()+"' and periode<= '"+this.e_periode.getText()+"' and no_del='-'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData(["INPROG",line.no_retur,line.akun_piutang,line.tanggal,line.keterangan,floatToNilai(line.nilai)]);
					}
					this.sg2.validasi();
				}
			}
			else {
				system.alert(this,"Vendor tidak valid.","Data vendor harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_akun) {
				if (this.cb_jenis.getText().toUpperCase() == 'KAS') {
					this.standarLib.showListData(this, "Daftar Rekening Kas",sender,undefined, 
											  "select c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
											  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='IDR'",										  
											  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
											  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='IDR'",
											  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
				} else
					if (this.cb_jenis.getText().toUpperCase() == 'BANK') {
						this.standarLib.showListData2(this, "Daftar Rekening Bank",sender,undefined, 
											  "select c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
											  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='IDR'",										  
											  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
											  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='IDR'",
											  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
				}
			}
			if (sender == this.cb_vend) {   
			    this.standarLib.showListData(this, "Daftar Vendor",sender,undefined, 
											  "select kode_vendor, nama  from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_vendor) from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_vendor","nama"],"and",["Kode Vendor","Nama"],false);				
				this.sg.clear(1);
				if (this.p2.visible == true) this.sg2.clear(1);
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
	doChangeCell: function(sender, col, row){
		if (sender == this.sg) {
			if ((col == 7) && (this.sg.getCell(7,row) != "")){
				this.sg.validasi();
			}
		}
		if (sender == this.sg2) {
			if (col == 0){
				this.sg2.validasi();
			}
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = tot2 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(6,i) != "")
				tot1 += nilaiToFloat(this.sg.cells(6,i));
			if (this.sg.cells(7,i) != "")
				tot2 += nilaiToFloat(this.sg.cells(7,i));
		}
		this.e_tothut.setText(floatToNilai(tot1));
		this.e_totbayar.setText(floatToNilai(tot2));
		tot2 = tot2 - nilaiToFloat(this.e_totret.getText());
		this.e_totkas.setText(floatToNilai(tot2));
	},
	doSgChange2: function(sender, col, row){
		var tot2 = 0;			
		for (var i = 0;i < this.sg2.getRowCount();i++){
			if (this.sg2.cells(0,i) == "OFFSET")
				tot2 += nilaiToFloat(this.sg2.cells(5,i));
		}
		this.e_totret.setText(floatToNilai(tot2));
		tot2 = nilaiToFloat(this.e_totbayar.getText()) - tot2;
		this.e_totkas.setText(floatToNilai(tot2));
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
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