window.app_saku_inventory_transaksi_fRetjkas = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_transaksi_fRetjkas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_transaksi_fRetjkas";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengeluaran Retur Penjualan: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_jenis = new portalui_saiCB(this,{bound:[20,12,200,20],caption:"Jenis",items:["KAS","BANK"],change:[this,"doChange"],tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No KasBank",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,503,20],caption:"Keterangan", maxLength:150});						
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Rek. KasBank",btnClick:[this,"doBtnClick"],tag:2,change:[this,"doChange"]});		
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Disetujui",btnClick:[this,"doBtnClick"],tag:2});		
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Customer",btnClick:[this,"doBtnClick"],tag:2});
		this.e_totkas = new portalui_saiLabelEdit(this,{bound:[723,18,200,20],caption:"Total KasBank",tipeText:ttNilai,text:"0",readOnly:true});
		this.bRetur = new portalui_button(this,{bound:[629,18,80,18],caption:"Retur",click:[this,"doReturClick"]});		
		
		this.p1 = new portalui_panel(this,{bound:[20,19,900,290],caption:"Item Faktur Retur Penjualan Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,265],colCount:6,tag:9,
					    colTitle:["Status","No Retur","Akun Hutang","Tanggal","Keterangan","Nilai"],
						colWidth:[[0,1,2,3,4,5],[100,160,100,70,330,100]],colFormat:[[5],[cfNilai]],
						columnReadOnly:[true,[1,2,3,4,5],[0]],autoAppend:false,buttonStyle:[[0],[bsAuto]], 
						picklist:[[0],[new portalui_arrayMap({items:["BAYAR","INPROG"]})]],
						defaultRow:1,nilaiChange:[this, "doSgChange"], change:[this,"doChangeCell"]});				
					
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
window.app_saku_inventory_transaksi_fRetjkas.extend(window.portalui_childForm);
window.app_saku_inventory_transaksi_fRetjkas.implement({
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
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.akunkb+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','"+this.app._kodePP+"','KBO_RETJ','"+this.jenis+"','"+this.e_periode.getText()+
							"','IDR',1,"+parseNilai(this.e_totkas.getText())+",'"+this.cb_app.getText()+"','-',now(),'"+this.app._userLog+"','F','-','-','"+this.cb_cust.getText()+"','"+this.cb_akun.getText()+"')");
					
					sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunkb+
							"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_totkas.getText())+",'"+this.app._kodePP+"','-','-',"+
							"'"+this.app._lokasi+"','KBO_RETJ','KAS',"+
							"'"+this.e_periode.getText()+"','IDR',1"+
							",'"+this.app._userLog+"',now(),'"+this.cb_akun.getText()+"')");
					
					var j = 0;					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (this.sg.getCell(0,i) == "BAYAR"){
								j++;
								sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
										"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
										"('"+this.e_nb.getText()+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(2,i)+
										"','Bayar retur penjualan','D',"+parseNilai(this.sg.cells(5,i))+",'"+this.app._kodePP+"','-','-',"+
										"'"+this.app._lokasi+"','KBO_RETJ','RETJUAL',"+
										"'"+this.e_periode.getText()+"','IDR',1"+
										",'"+this.app._userLog+"',now(),'-')");
								sql.add("update inv_jualretur_m set progress='1', no_kas='"+this.e_nb.getText()+"' where no_retur='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								sql.add("insert into kas_d(no_kas,no_bukti,modul,catatan,no_del,kode_lokasi,nilai) values "+
										"                 ('"+this.e_nb.getText()+"','"+this.sg.cells(1,i)+"','KBORETJ','-','-','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(5,i))+")");
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
				}
				break;
			case "simpan" :	
				if (nilaiToFloat(this.e_totkas.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai kasbank tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.dp_d1.toSysDate() < new Date().strToDate(this.sg.getCell(3,i))) {
						i = i+1;
						system.alert(this,"Tanggal tidak valid.","Tanggal kurang dari tgl retur. Baris["+i+"]");
						return false;   
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
	doReturClick: function(sender){
		try{			
			if (this.cb_cust.getText() != ""){
				var data = this.dbLib.getDataProvider("select no_retur, akun_hutang, date_format(tanggal,'%d/%m/%Y') as tanggal, keterangan, nilai "+
				           "from inv_jualretur_m where progress='0' and kode_cust='"+this.cb_cust.getText()+"' and periode<= '"+this.e_periode.getText()+"' and no_del='-'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["INPROG",line.no_retur,line.akun_hutang,line.tanggal,line.keterangan,floatToNilai(line.nilai)]);
					}
					this.sg.validasi();
				}
			}
			else {
				system.alert(this,"Customer tidak valid.","Data customer harus dipilih.");
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
			if (sender == this.cb_cust) {   
			    this.standarLib.showListData(this, "Daftar Customer",sender,undefined, 
											  "select kode_cust, nama  from cust where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_cust) from cust where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_cust","nama"],"and",["Kode Cust","Nama"],false);				
				this.sg.clear(1);
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
			if (col == 0){
				this.sg.validasi();
			}
		}
	},
	doSgChange: function(sender, col, row){
		var tot2 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(0,i) == "BAYAR")
				tot2 += nilaiToFloat(this.sg.cells(5,i));
		}
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