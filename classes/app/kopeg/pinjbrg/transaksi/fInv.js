window.app_kopeg_pinjbrg_transaksi_fInv = function(owner)
{
	if (owner)
	{
		window.app_kopeg_pinjbrg_transaksi_fInv.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_pinjbrg_transaksi_fInv";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan [UDP] Kredit: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,343,20],caption:"Keterangan", maxLength:150});						
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Penerima",btnClick:[this,"doBtnClick"],tag:2});				
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[710,16,200,20],caption:"Nilai Terima",tipeText:ttNilai,tag:1,text:"0"});
		this.cb_agg = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Nasabah",btnClick:[this,"doBtnClick"],tag:2});		
		this.bTampil = new portalui_button(this,{bound:[619,17,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[710,17,200,20],caption:"Saldo Piutang",tipeText:ttNilai,readOnly: true, tag:1,text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[10,30,900,303],caption:"Daftar Rincian Uang Dalam Perjalanan"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,895,280],tag:"9"});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
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
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_pinjbrg_transaksi_fInv.extend(window.portalui_childForm);
window.app_kopeg_pinjbrg_transaksi_fInv.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_pbrginv_m','no_inv',this.app._lokasi+"-PBIV"+this.e_periode.getText().substr(2,4)+".",'0000'));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					sql.add("insert into kop_pbrginv_m (no_inv,no_dokumen,keterangan,tanggal,nilai,jenis,periode,kode_pp,kode_lokasi,nik_app,posted,kurs,kode_curr,akun_ar,progress,no_del,no_link,nik_user,tgl_input)  values "+                              
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_nilai.getText())+",'INVPBRG','"+this.e_periode.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','F',1,'IDR','"+this.akunIM+"','0','-','-','"+this.app._userLog+"',now())");					
					sql.add("insert into kop_pbrginv_j (no_inv,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.akunIM+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','IM','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					sql.add("insert into kop_pbrginv_j (no_inv,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunUDP+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','UDP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
					sql.add("insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
				            "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_agg.getText()+"','PBRG','UDP','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cb_app.getText()+"','-','-',1,'IDR','"+this.app._userLog+"',now())");											
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
			case "simpan" :
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_tot.getText())){
					system.alert(this,"Transaksi tidak valid.","Nilai terima tidak boleh melebihi saldo.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai terima tidak boleh kurang atau sama dengan nol.");
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
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_pbrginv_m','no_inv',this.app._lokasi+"-PBIV"+this.e_periode.getText().substr(2,4)+".",'0000'));
		this.e_dok.setFocus();
	},
	doTampilClick: function(sender){
		try{			
			if (this.cb_agg.getText() != ""){
				this.sg1.setColTitle(new Array("No","No Bukti","Tanggal","Keterangan","Status","Nilai"));				
				var data = this.dbLib.runSQL("select no_depo,date_format(tanggal,'%d/%m/%Y')as tanggal,keterangan,case dc when 'D' then 'IN' else 'OUT' end as dc,nilai "+
											 "	from kop_depo "+
											 "	where kode_agg='"+this.cb_agg.getText()+"' and no_del='-' and modul = 'PBRG' and jenis='UDP' "+
											 "	      and periode <='"+this.e_periode.getText()+"' "+
											 "	order by tanggal desc");
				this.sg1.clearAll();
				this.sg1.setData(data);
				var tot = 0;
				for (var i in data.objList){
					if (data.get(i).get("dc").toUpperCase() == 'OUT') tot = tot + parseFloat(data.get(i).get("nilai"));
					else tot = tot - parseFloat(data.get(i).get("nilai"));
				}
				this.e_tot.setText(floatToNilai(tot));
			}
			else {
				system.alert(this,"Nasabah tidak valid.","Nasabah harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
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