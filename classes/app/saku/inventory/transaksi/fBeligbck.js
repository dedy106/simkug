window.app_saku_inventory_transaksi_fBeligbck = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_transaksi_fBeligbck.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_transaksi_fBeligbck";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pencairan Hutang GB: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[723,11,200,20],caption:"Periode GB",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti Bank",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[723,13,200,20],caption:"No GB Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100,tag:1});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,503,20],caption:"Keterangan", maxLength:150,tag:1});				
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Rek. KasBank",tag:1});
		this.e_tot2 = new portalui_saiLabelEdit(this,{bound:[723,16,200,20],caption:"Total Hutang",tipeText:ttNilai,readOnly:true,text:"0",tag:1});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Disetujui",btnClick:[this,"doBtnClick"],tag:1});		
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[723,17,200,20],caption:"Total Cair",tipeText:ttNilai,readOnly:true,text:"0",tag:1});
		
		this.p1 = new portalui_panel(this,{bound:[20,18,900,340],caption:"Item Bukti Giro Bilyet"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,310],colCount:9,tag:2,colTitle:["Status","No Bukti","No GB","Tgl Terbit","Jth Tempo","Hutang GB","Keterangan","Vendor","Nilai"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[60,100,100,70,70,60,200,100,100]],colFormat:[[8],[cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["CAIR","BELUM"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,7,8],[0]],change:[this,"doChangeCell"],autoAppend:false,
					defaultRow:1,nilaiChange:[this,"doSgChange"]});				
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var prd = this.dbLib.getDataProvider("select distinct periode from kas_m where modul = 'KBO_GBC' and kode_lokasi = '"+this.app._lokasi+"'",true);
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
window.app_saku_inventory_transaksi_fBeligbck.extend(window.portalui_childForm);
window.app_saku_inventory_transaksi_fBeligbck.implement({
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
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.jenis+this.e_periode.getText().substr(2,4)+".","0000"));		
						sql.add("update gb_m a, kas_d b set a.progress='0' where a.no_gb=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.no_kas='"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update kas_m set no_link='"+this.e_nb.getText()+"',no_del = concat(no_kas,'r') where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
								"                   periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank)"+
								"      select concat(no_kas,'r'),kode_lokasi,no_dokumen,no_bg,akun_kb,'"+this.dp_d1.getDateString()+"',keterangan,kode_pp,modul,jenis,"+
								"             '"+this.e_periode.getText()+"',kode_curr,kurs,nilai,'"+this.cb_app.getText()+"','-',now(),'"+this.app._userLog+"','F',no_kas,'-',ref1,kode_bank "+
								"      from kas_m where no_kas = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");											
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
								"                   kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+	
								"   select concat(no_kas,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,ref1,"+
								"          kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now(),kode_bank "+
								"   from kas_j where no_kas = '"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");														
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add(" update gb_m a, kas_d b set a.progress='0' where a.no_gb=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.no_kas='"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" delete from kas_m where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" delete from kas_d where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" delete from kas_j where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						this.nb = this.cb_nbLama.getText();
					}
					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
							"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.nb+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.akunkb+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','"+this.app._kodePP+"','KBO_GBC','BK','"+this.e_periode.getText()+
							"','IDR',1,"+parseNilai(this.e_tot.getText())+",'"+this.cb_app.getText()+"','-',now(),'"+this.app._userLog+"','F','-','-','-','"+this.cb_akun.getText()+"')");
					
					sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunkb+
							"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_tot.getText())+",'"+this.app._kodePP+"','-','-',"+
							"'"+this.app._lokasi+"','KBO_GBC','KAS',"+
							"'"+this.e_periode.getText()+"','IDR',1"+
							",'"+this.app._userLog+"',now(),'"+this.cb_akun.getText()+"')");
					
					var j = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (this.sg.getCell(0,i) == "CAIR"){
							    j++;
								sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
										"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
										"('"+this.nb+"','"+this.sg.cells(1,i)+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg.cells(5,i)+
										"','"+this.sg.cells(6,i)+"','D',"+parseNilai(this.sg.cells(8,i))+",'"+this.app._kodePP+"','-','-',"+
										"'"+this.app._lokasi+"','KBO_GBC','HUTGB',"+
										"'"+this.e_periode.getText()+"','IDR',1"+
										",'"+this.app._userLog+"',now(),'-')");
									
								sql.add("insert into kas_d(no_kas,no_bukti,modul,catatan,no_del,kode_lokasi,nilai) values "+
										"                 ('"+this.nb+"','"+this.sg.cells(1,i)+"','KBO_GBC','-','-','"+this.app._lokasi+"',"+parseNilai(this.sg.cells(8,i))+")");
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);		
					this.sg.clear(1);
				}
				break;
			case "ubah" :
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if ((this.sg.getCell(0,i) == "CAIR") && (this.dp_d1.toSysDate() < new Date().strToDate(this.sg.getCell(3,i)))) {
							system.alert(this,"Tanggal tidak valid.","Tanggal kurang dari tgl terbit. Baris["+i+"]");
							return false;   
						}
					}
				}
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
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
			case "hapus" : 
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {						
						sql.add("update gb_m a, kas_d b set a.progress='0' where a.no_gb=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.no_kas='"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update kas_m set no_del = concat(no_kas,'r') where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
								"                   periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank)"+
								"      select concat(no_kas,'r'),kode_lokasi,no_dokumen,no_bg,akun_kb,'"+this.dp_d1.getDateString()+"',keterangan,kode_pp,modul,jenis,"+
								"             '"+this.e_periode.getText()+"',kode_curr,kurs,nilai,'"+this.cb_app.getText()+"','-',now(),'"+this.app._userLog+"','F',no_kas,'-',ref1,kode_bank "+
								"      from kas_m where no_kas = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");											
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
								"                   kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+	
								"   select concat(no_kas,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,ref1,"+
								"          kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now(),kode_bank "+
								"   from kas_j where no_kas = '"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");														
					}
					else{
						sql.add(" update gb_m a, kas_d b set a.progress='0' where a.no_gb=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.no_kas='"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" delete from kas_m where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" delete from kas_d where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" delete from kas_j where no_kas ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;	
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BK"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doLoadData:function(sender){
		if (this.cb_nbLama.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.no_dokumen,a.keterangan,a.kode_bank,b.nama as nama_bank,a.nik_buat,c.nama as nama_buat,a.akun_kb,a.posted,a.periode,a.nilai, "+
												  "       f.no_gb,f.no_dokumen,date_format(f.tgl_terbit,'%d/%m/%Y') as tanggal, date_format(f.due_date,'%d/%m/%Y') as due_date,f.akun_gb,f.keterangan as ket,g.nama,f.nilai "+
												  "from kas_m a inner join bank2 b on a.kode_bank=b.kode_bank and a.kode_lokasi=b.kode_lokasi "+
												  "                  inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
												  "                  inner join kas_d e on a.no_kas=e.no_kas and a.kode_lokasi=e.kode_lokasi and e.modul='KBO_GBC' "+
												  "                  inner join gb_m f on e.no_bukti=f.no_gb and e.kode_lokasi=f.kode_lokasi and f.no_del='-' and f.jenis='BELI' and f.modul='GB' "+
												  "                  inner join vendor g on f.kode_vendor=g.kode_vendor and f.kode_lokasi=g.kode_lokasi  "+
												  "where a.no_kas = '"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_del='-'");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["CAIR",line.no_gb,line.no_dokumen,line.tanggal,line.due_date,line.akun_gb,line.ket,line.nama,floatToNilai(line.nilai)]);
				}
				this.sg.validasi();
				if (line !== undefined){				
					this.e_dok.setText(line.no_dokumen);
					this.e_desc.setText(line.keterangan);
					this.cb_app.setText(line.nik_buat, line.nama_buat);
					this.e_tot.setText(floatToNilai(line.nilai));
					this.cb_akun.setText(line.kode_bank, line.nama_bank);
					
					this.akunkb = line.akun_kb;						
					this.posted = line.posted;						
					this.perLama = line.periode;						
				}
			}
		}
		else {
			system.alert(this,"No KB lama tidak valid.","Bukti KB harus dipilih.");
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
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Bukti KasBank",sender,undefined, 
											  "select no_kas, no_dokumen  from kas_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and modul='KBO_GBC' and no_del='-'", 
											  "select count(no_kas) from kas_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and modul='KBO_GBC' and no_del='-'",
											  ["no_kas","no_dokumen"],"and",["No KasBank","No Dokumen"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
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