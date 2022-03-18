window.app_saku3_transaksi_siaga_fa_fFawo = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_fa_fFawo.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_fa_fFawo";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form WriteOff Aktiva Tetap : Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_beban = new saiCBBL(this,{bound:[20,15,220,20],caption:"Akun Beban", multiSelection:false, maxLength:10, tag:2 });
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		
		this.cb_fa = new saiCBBL(this,{bound:[20,18,220,20],caption:"No Aktiva Tetap", multiSelection:false, maxLength:10, change:[this,"doChange"]});		
		this.e_seri = new portalui_saiLabelEdit(this,{bound:[20,19,430,20],caption:"Nomor Seri",readOnly:true});
		this.e_tipe = new portalui_saiLabelEdit(this,{bound:[500,19,500,20],caption:"Tipe",readOnly:true});
		this.e_merk = new portalui_saiLabelEdit(this,{bound:[20,17,430,20],caption:"Merk",readOnly:true});
		this.e_pp = new portalui_saiLabelEdit(this,{bound:[500,17,500,20],caption:"PP",readOnly:true});
		
		this.e_hp = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Nilai Perolehan", readOnly: true, tag:3, tipeText:ttNilai, text:"0"});		
		this.e_residu = new saiLabelEdit(this,{bound:[250,18,200,20],caption:"Nilai Residu",readOnly: true,  tag:3, tipeText:ttNilai, text:"0"});		
		this.e_akun = new portalui_saiLabelEdit(this,{bound:[500,18,500,20],caption:"Akun Aktap",readOnly:true, tag:3});
		this.e_totSusut = new saiLabelEdit(this,{bound:[20,20,200,20],caption:"Total Penyusutan", readOnly: true, tag:3, tipeText:ttNilai, text:"0"});		
		this.e_buku = new saiLabelEdit(this,{bound:[250,20,200,20],caption:"Nilai Buku", tag:4, readOnly: true, tipeText:ttNilai, text:"0"});				
		this.e_ap = new portalui_saiLabelEdit(this,{bound:[500,20,500,20],caption:"Akun Akumulasi", tag:3, readOnly:true});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_fa.setSQL("select a.no_fa, a.nama from fa_asset a "+					
					"inner join ("+
					"				select kode_lokasi,no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
					"              from fa_nilai "+
					"				where periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
					"				group by kode_lokasi,no_fa "+
					"			  ) zz on a.no_fa=zz.no_fa and a.kode_lokasi=zz.kode_lokasi "+
					
					"    inner join (select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
					"	             from fasusut_d group by no_fa,kode_lokasi) b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
					"where a.jenis='A' and a.progress ='2' and zz.nilai-b.tot_susut = a.nilai_residu and a.kode_lokasi='"+this.app._lokasi+"'",
			["a.no_fa","a.nama"],false,["No Aktap","Nama"],"and","Daftar Aktiva Tetap",true);
											
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='FAAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");

			this.cb_buat.setText(this.app._userLog);

			this.cb_beban.setSQL("select a.kode_akun, a.nama from masakun a where a.jenis='Beban' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_fa_fFawo.extend(window.childForm);
window.app_saku3_transaksi_siaga_fa_fFawo.implement({
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
			this.doClick(this.i_gen);			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2,3])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update fa_asset set progress = 'W' where no_fa='"+this.cb_fa.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into fawoapp_m(no_woapp,no_wo,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,nilai_ap,kode_pp,kode_drk,posted,nik_buat,nik_setuju,kode_lokasi,periode,no_del,no_link,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_hp.getText())+","+parseNilai(this.e_totSusut.getText())+",'"+this.pp+"','-','F','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate())");					
					sql.add("insert into fawoapp_d(no_woapp,kode_lokasi,no_fa,periode,nilai,nilai_ap,kode_akun,akun_ap,kode_pp,kode_drk,akun_beban) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_fa.getText()+"','"+this.e_periode.getText()+"',"+parseNilai(this.e_hp.getText())+","+parseNilai(this.e_totSusut.getText())+",'"+this.kodeakun+"','"+this.akunap+"','"+this.pp+"','-','"+this.cb_beban.getText()+"')");					
					
					var beban = nilaiToFloat(this.e_residu.getText()) + nilaiToFloat(this.e_buku.getText());
					sql.add("insert into fawoapp_j(no_woapp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_beban.getText()+"','"+this.e_ket.getText()+"','D',"+beban+",'"+this.pp+"','-','"+this.app._lokasi+"','FAWO','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
					sql.add("insert into fawoapp_j(no_woapp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.akunap+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_totSusut.getText())+",'"+this.pp+"','-','"+this.app._lokasi+"','FAWO','AP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					sql.add("insert into fawoapp_j(no_woapp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',2,'"+this.kodeakun+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_hp.getText())+",'"+this.pp+"','-','"+this.app._lokasi+"','FAWO','AKTAP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					
					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+
							"select no_woapp,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,dc,0,nilai "+
							"from fawoapp_j where jenis = 'BEBAN' and dc= 'D' and no_woapp = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					setTipeButton(tbAllFalse);					
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1","3","4"),this.e_nb);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
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
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);
			if (m=="01") this.Aperiode = "A";
			if (m=="02") this.Aperiode = "B";
			if (m=="03") this.Aperiode = "C";
			if (m=="04") this.Aperiode = "D";
			if (m=="05") this.Aperiode = "E";
			if (m=="06") this.Aperiode = "F";
			if (m=="07") this.Aperiode = "G";
			if (m=="08") this.Aperiode = "H";
			if (m=="09") this.Aperiode = "I";
			if (m=="10") this.Aperiode = "J";
			if (m=="11") this.Aperiode = "K";
			if (m=="12") this.Aperiode = "L";			
		}
		else {
			this.e_periode.setText(this.app._periode);		
			if (m=="13") this.Aperiode = "M";			
			if (m=="14") this.Aperiode = "N";			
			if (m=="15") this.Aperiode = "O";			
			if (m=="16") this.Aperiode = "P";						
		}
		this.doClick(this.i_gen);
	},
	doChange:function(sender){				
		if (sender == this.cb_fa && this.cb_fa.getText()!="") {
			var strSQL = "select a.no_seri,a.merk,a.tipe,zz.nilai,a.nilai_residu,isnull(d.tot_susut,0) as tot_susut,(zz.nilai-a.nilai_residu-isnull(d.tot_susut,0)) as nilai_buku, "+
						 "       b.kode_akun,x.nama as nama_akun,b.akun_deprs,y.nama as nama_deprs,a.kode_pp,c.nama as nama_pp,a.umur "+
						 "from fa_asset a  "+
						 "inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi "+
						 "inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "inner join masakun x on b.kode_akun=x.kode_akun and b.kode_lokasi=x.kode_lokasi "+
						 "inner join masakun y on b.akun_deprs=y.kode_akun and b.kode_lokasi=y.kode_lokasi "+

						 "inner join ("+
						 "				select kode_lokasi,no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
						 "              from fa_nilai "+
						 "				where no_fa='"+this.cb_fa.getText()+"' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "				group by kode_lokasi,no_fa "+
						 "			  ) zz on a.no_fa=zz.no_fa and a.kode_lokasi=zz.kode_lokasi "+

						 "left join ("+
						 "   		    select no_fa,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_susut "+
						 "	  			from fasusut_d where no_fa='"+this.cb_fa.getText()+"' group by no_fa,kode_lokasi "+
						 "	 		  ) d on a.no_fa=d.no_fa and a.kode_lokasi=d.kode_lokasi "+

						 "where a.jenis='A' and a.no_fa='"+this.cb_fa.getText()+"' and a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"'";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){	
					this.e_seri.setText(line.no_seri);
					this.e_tipe.setText(line.tipe);
					this.e_merk.setText(line.merk);
					this.e_pp.setText(line.kode_pp+ " - " + line.nama_pp);
					this.e_akun.setText(line.kode_akun+ " - " + line.nama_akun);
					this.e_ap.setText(line.akun_deprs+ " - " + line.nama_deprs);
					this.e_hp.setText(floatToNilai(line.nilai));
					this.e_residu.setText(floatToNilai(line.nilai_residu));
					this.e_totSusut.setText(floatToNilai(line.tot_susut));
					this.e_buku.setText(floatToNilai(line.nilai_buku));
					
					this.akunap = line.akun_deprs;
					this.pp = line.kode_pp;
					this.kodeakun = line.kode_akun;
					this.umur = line.umur;
				}
			} else this.standarLib.clearByTag(this, new Array("3","4"),undefined);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.e_periode.getText()!= "" ) {				
				var AddFormat = "/"+this.Aperiode+"/"+this.e_periode.getText().substr(2,2);
				var data = this.dbLib.getDataProvider("select isnull(max(substring(no_woapp,5,20)),0) as no_woapp from fawoapp_m where no_woapp like '_______"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.no_woapp == "0") this.e_nb.setText("WOFA001"+AddFormat);
						else {
							var idx = parseFloat(line.no_woapp.substr(0,3)) + 1;
							idx = idx.toString();							
							if (idx.length == 1) var nu = "00"+idx;
							if (idx.length == 2) var nu = "0"+idx;
							if (idx.length == 3) var nu = idx;
							this.e_nb.setText("WOFA"+nu+AddFormat);
						}
					} 
				}
				this.e_dok.setFocus();
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});