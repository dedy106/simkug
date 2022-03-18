window.app_kopeg_pinjbrg_transaksi_fInvk = function(owner)
{
	if (owner)
	{
		window.app_kopeg_pinjbrg_transaksi_fInvk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_pinjbrg_transaksi_fInvk";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan [UDP] Kredit: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[720,11,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[720,13,200,20],caption:"No Bukti Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100,tag:1});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,343,20],caption:"Keterangan", maxLength:150,tag:1});						
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Penerima",btnClick:[this,"doBtnClick"],tag:1});				
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[710,16,200,20],caption:"Nilai Terima",tipeText:ttNilai,tag:1,text:"0"});
		this.cb_agg = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Nasabah",tag:1, readOnly:true});	
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[710,17,200,20],caption:"Saldo Piutang",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[10,30,900,303],caption:"Daftar Rincian Uang Dalam Perjalanan"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,895,280],tag:"9"});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PBRGIM','PBRGUD') and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PBRGIM") this.akunIM = line.flag;
					if (line.kode_spro == "PBRGUD") this.akunUDP = line.flag;
				}
			}			
			var prd = this.dbLib.getDataProvider("select distinct periode from kop_pbrginv_m where jenis = 'INVPBRG' and kode_lokasi = '"+this.app._lokasi+"'",true);
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
window.app_kopeg_pinjbrg_transaksi_fInvk.extend(window.portalui_childForm);
window.app_kopeg_pinjbrg_transaksi_fInvk.implement({
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
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_pbrginv_m','no_inv',this.app._lokasi+"-PBIV"+this.e_periode.getText().substr(2,4)+".",'0000'));
						sql.add(" update kop_pbrginv_m set no_link='"+this.e_nb.getText()+"',no_del = concat(no_inv,'r') where no_inv ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_pbrginv_m (no_inv,no_dokumen,keterangan,tanggal,nilai,jenis,periode,kode_pp,kode_lokasi,nik_app,posted,kurs,kode_curr,akun_ar,progress,no_del,no_link,nik_user,tgl_input) "+
							    " select concat(no_inv,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,jenis,'"+this.e_periode.getText()+"',kode_pp,kode_lokasi,nik_app,'F',kurs,kode_curr,akun_ar,'X',no_inv,'-','"+this.app._userLog+"',now() "+
								" from kop_pbrginv_m where no_inv = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_pbrginv_j (no_inv,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_inv,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_pbrginv_j where no_inv = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_depo (no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input)"+
								" select concat(no_depo,'r'),'"+this.dp_d1.getDateString()+"',keterangan,'C',nilai,kode_agg,modul,jenis,'"+this.e_periode.getText()+"',kode_lokasi,kode_pp,nik_app,no_depo,'-',kurs,kode_curr,'"+this.app._userLog+"',now() "+ 
								" from kop_depo where no_depo = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");						
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("delete from kop_pbrginv_m where no_inv='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pbrginv_j where no_inv='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_depo where no_depo ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");									
						this.nb = this.cb_nbLama.getText();
					}
					
					sql.add("insert into kop_pbrginv_m (no_inv,no_dokumen,keterangan,tanggal,nilai,jenis,periode,kode_pp,kode_lokasi,nik_app,posted,kurs,kode_curr,akun_ar,progress,no_del,no_link,nik_user,tgl_input)  values "+                              
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_nilai.getText())+",'INVPBRG','"+this.e_periode.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','F',1,'IDR','"+this.akunIM+"','0','-','-','"+this.app._userLog+"',now())");
					sql.add("insert into kop_pbrginv_j (no_inv,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunIM+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','IM','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					sql.add("insert into kop_pbrginv_j (no_inv,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunUDP+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','UDP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					sql.add("insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
				            "('"+this.nb+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_agg.getText()+"','PBRG','UDP','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cb_app.getText()+"','-','-',1,'IDR','"+this.app._userLog+"',now())");											
					
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
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))){
					system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_tot.getText())){
					system.alert(this,"Transaksi tidak valid.","Nilai terima tidak boleh melebihi saldo.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai terima tidak boleh kurang atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.perLama) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode bukti lama.");
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
						sql.add(" update kop_pbrginv_m set no_del = concat(no_inv,'r') where no_inv ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_pbrginv_m (no_inv,no_dokumen,keterangan,tanggal,nilai,jenis,periode,kode_pp,kode_lokasi,nik_app,posted,kurs,kode_curr,akun_ar,progress,no_del,no_link,nik_user,tgl_input) "+
							    " select concat(no_inv,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,jenis,'"+this.e_periode.getText()+"',kode_pp,kode_lokasi,nik_app,'F',kurs,kode_curr,akun_ar,'X',no_inv,'-','"+this.app._userLog+"',now() "+
								" from kop_pbrginv_m where no_inv = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_pbrginv_j (no_inv,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_inv,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_pbrginv_j where no_inv = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_depo (no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input)"+
								" select concat(no_depo,'r'),'"+this.dp_d1.getDateString()+"',keterangan,'C',nilai,kode_agg,modul,jenis,'"+this.e_periode.getText()+"',kode_lokasi,kode_pp,nik_app,no_depo,'-',kurs,kode_curr,'"+this.app._userLog+"',now() "+ 
								" from kop_depo where no_depo = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");						
					}
					else{
						sql.add("delete from kop_pbrginv_m where no_inv='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pbrginv_j where no_inv='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_depo where no_depo ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");									
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;	
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_pbrginv_m','no_inv',this.app._lokasi+"-PBIV"+this.e_periode.getText().substr(2,4)+".",'0000'));
		this.e_dok.setFocus();
	},
	doLoadData: function(sender){
		try{			
			if (this.cb_nbLama.getText() != ""){
				this.sg1.setColTitle(new Array("No","No Bukti","Tanggal","Keterangan","Status","Nilai"));				
				var data = this.dbLib.runSQL("select no_depo,date_format(tanggal,'%d/%m/%Y')as tanggal,keterangan,case dc when 'D' then 'IN' else 'OUT' end as dc,nilai "+
											 "	from kop_depo "+
											 "	where kode_agg='"+this.cb_nbLama.dataFromList[5]+"' and no_del='-' and modul = 'PBRG' and jenis='UDP' "+
											 "	      and no_depo <> '"+this.cb_nbLama.getText()+"' order by tanggal desc");
				this.sg1.clearAll();
				this.sg1.setData(data);
				var tot = 0;
				for (var i in data.objList){
					if (data.get(i).get("dc").toUpperCase() == 'OUT') tot = tot + parseFloat(data.get(i).get("nilai"));
					else tot = tot - parseFloat(data.get(i).get("nilai"));
				}
				
				this.e_dok.setText(this.cb_nbLama.dataFromList[1]);
				this.e_desc.setText(this.cb_nbLama.dataFromList[2]);
				this.cb_app.setText(this.cb_nbLama.dataFromList[3],this.cb_nbLama.dataFromList[4]);
				this.cb_agg.setText(this.cb_nbLama.dataFromList[5],this.cb_nbLama.dataFromList[6]);
				this.e_nilai.setText(this.cb_nbLama.dataFromList[7]);
	
				this.e_tot.setText(floatToNilai(tot));
			}
			else {
				system.alert(this,"Bukti Lama tidak valid.","Bukti Lama harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Bukti Invoice",sender,undefined, 
											  "select a.no_inv,a.no_dokumen,a.keterangan,a.nik_app,b.nama,cc.kode_agg,cc.nama as nama_agg,a.nilai from kop_pbrginv_m a "+
											  "                                  inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
											  "                                  inner join kop_depo aa on a.no_inv=aa.no_depo and a.kode_lokasi=aa.kode_lokasi "+
											  "                                  inner join kop_agg cc on aa.kode_agg=cc.kode_agg and aa.kode_lokasi=cc.kode_lokasi "+
											  "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.cb_perLama.getText()+"' and a.no_del='-' and a.progress = '0' and aa.modul='PBRG' and aa.jenis= 'UDP'", 
											  
											  "select count(no_inv)       from kop_pbrginv_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' and progress = '0' and aa.modul='PBRG' and aa.jenis= 'UDP'",
											  ["no_inv","no_dokumen","keterangan","nik_app","nama","kode_agg","nama_agg","nilai"],"and",
											  ["No Bukti","No Dokumen","Deskripsi","NIK App","Nama","Kode Agg","Nama Agg","Nilai"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg1.clearAll();
			}
			if (sender == this.cb_agg) {   
			    this.standarLib.showListData(this, "Daftar Nasabah",sender,undefined, 
											  "select kode_agg, nama  from kop_agg where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_agg) from kop_agg where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_agg","nama"],"and",["Kode","Nama"],false);
				this.e_tot.setText("0");
				this.sg1.clearAll();
			}
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan Penerima",sender,undefined, 
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