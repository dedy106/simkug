window.app_saku_inventory_transaksi_fJualgbc = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_transaksi_fJualgbc.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_transaksi_fJualgbc";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pencairan Piutang GB: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti Bank",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,503,20],caption:"Keterangan", maxLength:150});				
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Rek. KasBank",btnClick:[this,"doBtnClick"],tag:2,change:[this,"doChange"]});
		this.e_tot2 = new portalui_saiLabelEdit(this,{bound:[723,16,200,20],caption:"Total Piutang",tipeText:ttNilai,readOnly:true,text:"0",tag:9});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Disetujui",btnClick:[this,"doBtnClick"],tag:2});		
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[723,17,200,20],caption:"Total Cair",tipeText:ttNilai,readOnly:true,text:"0"});
		this.bCair = new portalui_button(this,{bound:[545,17,80,18],caption:"Cair All",click:[this,"doCairClick"]});		
		this.bTampil = new portalui_button(this,{bound:[629,17,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		
		this.p1 = new portalui_panel(this,{bound:[20,18,900,340],caption:"Item Bukti Giro Bilyet"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,310],colCount:9,tag:2,colTitle:["Status","No Bukti","No GB","Tgl Terbit","Jth Tempo","Piutang GB","Keterangan","Cust","Nilai"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[60,100,100,70,70,60,200,100,100]],colFormat:[[8],[cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["CAIR","BELUM"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,7,8],[0]],change:[this,"doChangeCell"],autoAppend:false,
					defaultRow:1,nilaiChange:[this,"doSgChange"]});				
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_inventory_transaksi_fJualgbc.extend(window.portalui_childForm);
window.app_saku_inventory_transaksi_fJualgbc.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));		
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
							"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.akunkb+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','"+this.app._kodePP+"','KBI_GBC','BM','"+this.e_periode.getText()+
							"','IDR',1,"+parseNilai(this.e_tot.getText())+",'"+this.cb_app.getText()+"','-',now(),'"+this.app._userLog+"','F','-','-','-','"+this.cb_akun.getText()+"')");
					
					sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunkb+
							"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_tot.getText())+",'"+this.app._kodePP+"','-','-',"+
							"'"+this.app._lokasi+"','KBI_GBC','KAS',"+
							"'"+this.e_periode.getText()+"','IDR',1"+
							",'"+this.app._userLog+"',now(),'"+this.cb_akun.getText()+"')");
					
					var j = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (this.sg.getCell(0,i) == "CAIR"){
							    j++;
								sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
										"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
										"('"+this.e_nb.getText()+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(5,i)+
										"','"+this.sg.cells(6,i)+"','C',"+parseNilai(this.sg.cells(8,i))+",'"+this.app._kodePP+"','-','-',"+
										"'"+this.app._lokasi+"','KBI_GBC','PIUGB',"+
										"'"+this.e_periode.getText()+"','IDR',1"+
										",'"+this.app._userLog+"',now(),'-')");
									
								sql.add("insert into kas_d(no_kas,no_bukti,modul,catatan,no_del,kode_lokasi,nilai) values "+
										"                 ('"+this.e_nb.getText()+"','"+this.sg.cells(1,i)+"','KBI_GBC','-','-','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(8,i))+")");
								sql.add("update gb_m set progress='1' where no_gb='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.standarLib.clearByTag(this, new Array("0","9"),this.e_nb);		
					this.sg.clear(1);
				}
				break;
			case "simpan" :	
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if ((this.sg.getCell(0,i) == "CAIR") && (this.dp_d1.toSysDate() < new Date().strToDate(this.sg.getCell(3,i)))) {
							system.alert(this,"Tanggal tidak valid.","Tanggal kurang dari tgl terbit. Baris["+i+"]");
							return false;   
						}
					}
				}
			    if (nilaiToFloat(this.e_tot.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai pencairan tidak boleh kurang dari atau sama dengan nol.");
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
	doChange: function(sender){
		try{			
			if (sender == this.cb_akun) {
				this.akunkb = this.cb_akun.dataFromList[2];
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BM"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doTampilClick: function(sender){
		try{			
			if (this.cb_akun.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_gb,a.no_dokumen,date_format(a.tgl_terbit,'%d/%m/%Y') as tanggal, date_format(a.due_date,'%d/%m/%Y') as due_date,a.akun_gb,a.keterangan,b.nama,a.nilai "+
				                                      "from gb_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
													  "where a.kode_bank='"+this.cb_akun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' and progress='0' and a.jenis ='JUAL' and a.no_del='-' and a.modul='GB' ");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["BELUM",line.no_gb,line.no_dokumen,line.tanggal,line.due_date,line.akun_gb,line.keterangan,line.nama,floatToNilai(line.nilai)]);
					}
					this.sg.validasi();
				}
			}
			else {
				system.alert(this,"Rekening tidak valid.","Data rekening harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doCairClick: function(sender){
		try{			
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)){
					this.sg.setCell(0,i,"CAIR");
				}
			}
			this.sg.validasi();
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_akun) {				
				this.standarLib.showListData2(this, "Daftar Rekening Bank",sender,undefined, 
									  "select c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
									  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='IDR'",										  
									  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
									  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='IDR'",
									  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
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
		if ((col == 0) && (this.sg.getCell(0,row) != "")){
			this.sg.validasi();
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = tot2 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if ((this.sg.cells(0,i) == "CAIR")&&(this.sg.cells(8,i) != ""))
				tot1 += nilaiToFloat(this.sg.cells(8,i));
			if ((this.sg.cells(0,i) == "BELUM")&&(this.sg.cells(8,i) != ""))
				tot2 += nilaiToFloat(this.sg.cells(8,i));
		}
		this.e_tot.setText(floatToNilai(tot1));
		this.e_tot2.setText(floatToNilai(tot2));
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