window.app_kopeg_simpanan_transaksi_fPbdepok = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_transaksi_fPbdepok.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_simpanan_transaksi_fPbdepok";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pindah Buku Deposit [Simp]: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[720,11,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[720,13,200,20],caption:"No Bukti Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,343,20],caption:"Keterangan", maxLength:150});						
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Karyawan",btnClick:[this,"doBtnClick"],tag:2});				
		this.cb_lokasi = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Lokasi Tujuan",btnClick:[this,"doBtnClick"],tag:2});		
		this.cb_modul = new portalui_saiCB(this,{bound:[20,18,200,20],caption:"Modul",items:["OI","PINJ","SIMP"],change:[this,"doChange"],tag:2});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[710,18,200,20],caption:"Nilai PinBuk",tipeText:ttNilai,tag:1,text:"0"});		
		this.cb_agg = new portalui_saiCBBL(this,{bound:[20,19,200,20],caption:"Nasabah",readOnly:true,tag:1});				
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[710,19,200,20],caption:"Total Deposit",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[10,30,900,290],caption:"Daftar Rincian Deposit"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,895,265],tag:"9"});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('SIMPOI','SIMPTP') and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "SIMPTP") this.akunTP = line.flag;
					if (line.kode_spro == "SIMPOI") this.akunOI = line.flag;
				}
			}
			var prd = this.dbLib.getDataProvider("select distinct periode from kop_pbdepo_m where kode_lokasi = '"+this.app._lokasi+"'",true);
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
window.app_kopeg_simpanan_transaksi_fPbdepok.extend(window.portalui_childForm);
window.app_kopeg_simpanan_transaksi_fPbdepok.implement({
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
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_pbdepo_m','no_pbdepo',this.app._lokasi+"-PBD"+this.e_periode.getText().substr(2,4)+".",'0000'));
						sql.add(" update kop_pbdepo_m set no_link = '"+this.e_nb.getText()+"',no_del = concat(no_pbdepo,'r') where no_pbdepo ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_pbdepo_m (no_pbdepo,no_dokumen,kode_agg,keterangan,tanggal,nilai,kode_loktuj,modul,periode,kode_pp,kode_lokasi,nik_app,posted,kurs,kode_curr,no_del,no_link,nik_user,tgl_input) "+
							    " select concat(no_pbdepo,'r'),no_dokumen,kode_agg,keterangan,'"+this.dp_d1.getDateString()+"',nilai,kode_loktuj,modul,'"+this.e_periode.getText()+"',kode_pp,kode_lokasi,nik_app,'F',kurs,kode_curr,no_pbdepo,'-','"+this.app._userLog+"',now() "+
								" from kop_pbdepo_m where no_pbdepo = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_pbdepo_j (no_pbdepo,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_pbdepo,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_pbdepo_j where no_pbdepo = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");		
						if (this.modul.toUpperCase() == 'OI') {
							sql.add(" insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
									" select concat(no_depo,'r'),'"+this.dp_d1.getDateString()+"',keterangan,'D',nilai,kode_agg,modul,jenis,'"+this.e_periode.getText()+"',kode_lokasi,kode_pp,nik_app,no_depo,'-',kurs,kode_curr,'"+this.app._userLog+"',now() "+
									" from kop_depo where no_depo = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						this.nb = this.e_nb.getText();
						}
					}
					else{
						sql.add("delete from kop_pbdepo_m where no_pbdepo='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pbdepo_j where no_pbdepo='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_depo where no_depo='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						this.nb = this.cb_nbLama.getText();
					}
					
					sql.add("insert into kop_pbdepo_m (no_pbdepo,no_dokumen,kode_agg,keterangan,tanggal,nilai,kode_loktuj,modul,periode,kode_pp,kode_lokasi,nik_app,posted,kurs,kode_curr,no_del,no_link,nik_user,tgl_input)  values "+
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.cb_agg.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_lokasi.getText()+"','"+this.cb_modul.getText()+"','"+this.e_periode.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','F',1,'IDR','-','-','"+this.app._userLog+"',now())");
					
					var idx = 0;
					sql.add("insert into kop_pbdepo_j (no_pbdepo,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.akunTP+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','DEPO','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					if (this.cb_modul.getText() == 'OI'){
						idx++;
						sql.add("insert into kop_pbdepo_j (no_pbdepo,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
								"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.akunOI+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','OI','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
						sql.add("insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
							"('"+this.nb+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_agg.getText()+"','SIMP','PBDEPO_OI','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cb_app.getText()+"','-','-',1,'IDR','"+this.app._userLog+"',now())");					
					}
					
					//utk pindah modul jurnal ke TAK		
					/*

							BBBBBBBBBB   EEEEEEEEEEEEE   LLLLLLLLLLLLLLLLLLL   UUUUUUUUUUUUU  MMMMMMMMMMMMMMMM
	
					*/				
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
					this.sg1.clearAll();
				}
				break;
			case "ubah" :
				if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode))){
					system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
					return false;
				}
				if ((this.cb_modul.getText() == 'OI') && (this.cb_lokasi.getText() != this.app._lokasi)) {
					system.alert(this,"Transaksi tidak valid.","OI hanya untuk lokasi yang sama.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai pinbuk tidak boleh kurang atau sama dengan nol.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_tot.getText())){
					system.alert(this,"Transaksi tidak valid.","Nilai pinbuk tidak boleh melebihi saldo deposit.");
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
						sql.add(" update kop_pbdepo_m set no_del = concat(no_pbdepo,'r') where no_pbdepo ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_pbdepo_m (no_pbdepo,no_dokumen,kode_agg,keterangan,tanggal,nilai,kode_loktuj,modul,periode,kode_pp,kode_lokasi,nik_app,posted,kurs,kode_curr,no_del,no_link,nik_user,tgl_input) "+
							    " select concat(no_pbdepo,'r'),no_dokumen,kode_agg,keterangan,'"+this.dp_d1.getDateString()+"',nilai,kode_loktuj,modul,'"+this.e_periode.getText()+"',kode_pp,kode_lokasi,nik_app,'F',kurs,kode_curr,no_pbdepo,'-','"+this.app._userLog+"',now() "+
								" from kop_pbdepo_m where no_pbdepo = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_pbdepo_j (no_pbdepo,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_pbdepo,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_pbdepo_j where no_pbdepo = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");		
						if (this.modul.toUpperCase() == 'OI') {
							sql.add(" insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
									" select concat(no_depo,'r'),'"+this.dp_d1.getDateString()+"',keterangan,'D',nilai,kode_agg,modul,jenis,'"+this.e_periode.getText()+"',kode_lokasi,kode_pp,nik_app,no_depo,'-',kurs,kode_curr,'"+this.app._userLog+"',now() "+
									" from kop_depo where no_depo = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						}
					}
					else{
						sql.add("delete from kop_pbdepo_m where no_pbdepo='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pbdepo_j where no_pbdepo='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_depo where no_depo='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;		
			
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_pbdepo_m','no_pbdepo',this.app._lokasi+"-PBD"+this.e_periode.getText().substr(2,4)+".",'0000'));
		this.e_dok.setFocus();
	},
	doLoadData: function(sender){
		try{			
			if (this.cb_nbLama.getText() != ""){
				var line,data = this.dbLib.runSQL("select a.modul,a.posted,a.periode,a.no_dokumen,a.keterangan,a.nik_app,a.kode_agg,b.nama as nama_agg,c.nama as nama_app,a.nilai,a.kode_loktuj,d.nama as nama_lok "+
				                                  "from kop_pbdepo_m a "+
												  "                   inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi "+
				                                  "                   inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi "+
												  "                   inner join lokasi d on a.kode_loktuj=d.kode_lokasi "+
												  "where a.no_pbdepo = '"+this.cb_nbLama.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'");
				
				if (data instanceof portalui_arrayMap){
					line = data.get(0);
					if (line != undefined){
						this.perLama = line.get("periode");
						this.posted = line.get("posted");
						this.modul = line.get("modul");
						this.e_desc.setText(line.get("keterangan"));
						this.e_dok.setText(line.get("no_dokumen"));
						this.cb_app.setText(line.get("nik_app"),line.get("nama_app"));
						this.cb_agg.setText(line.get("kode_agg"),line.get("nama_agg"));	
						this.cb_lokasi.setText(line.get("kode_loktuj"),line.get("nama_lok"));	
						this.e_nilai.setText(floatToNilai(parseFloat(line.get("nilai"))));	
					} 
				}
				
				this.sg1.setColTitle(new Array("No","No Bukti","Tanggal","Keterangan","Status","Nilai"));				
				var data = this.dbLib.runSQL("select no_depo,date_format(tanggal,'%d/%m/%Y')as tanggal,keterangan,case dc when 'D' then 'IN' else 'OUT' end as dc,nilai "+
											 "	from kop_depo "+
											 "	where kode_agg='"+this.cb_agg.getText()+"' and no_del='-' and modul = 'SIMP' and jenis in ('ANGS_SLS','ANGS_PKI','AMBIL','PBDEPO_OI') "+
											 "	      and no_depo <>'"+this.cb_nbLama.getText()+"' "+
											 "	order by tanggal desc");
				this.sg1.clearAll();
				this.sg1.setData(data);
				var tot = 0;
				for (var i in data.objList){
					if (data.get(i).get("dc").toUpperCase() == 'IN') tot = tot + parseFloat(data.get(i).get("nilai"));
					else tot = tot - parseFloat(data.get(i).get("nilai"));
				}
				this.e_tot.setText(floatToNilai(tot));
			}
			else {
				system.alert(this,"No Bukti Lama tidak valid.","Bukti Lama harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_modul) {
				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Bukti Invoice",sender,undefined, 
											  "select no_pbdepo,keterangan from kop_pbdepo_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' ", 											  
											  "select count(no_pbdepo)     from kop_pbdepo_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' ",
											  ["no_pbdepo","keterangan"],"and",["No Bukti","Deskripsi"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg1.clearAll();
			}
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_lokasi) {   
				this.standarLib.showListData(this, "Daftar Lokasi Tujuan",this.cb_lokasi,undefined, 
											"select a.kode_lokasi,a.nama   from lokasi a inner join lokasi b on a.kode_lokkonsol=b.kode_lokkonsol where b.kode_lokasi='"+this.app._lokasi+"'",
											"select count(a.kode_lokasi)   from lokasi a inner join lokasi b on a.kode_lokkonsol=b.kode_lokkonsol where b.kode_lokasi='"+this.app._lokasi+"'",
											["kode_lokasi","nama"],"and",["Kode Lokasi","Nama"],false);
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