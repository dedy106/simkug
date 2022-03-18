window.app_kopeg_simpanan_transaksi_fHitbunga = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_transaksi_fHitbunga.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_simpanan_transaksi_fHitbunga";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Hitung Bunga Simpanan: Input", 0);	
		
		uses("portalui_saiCB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,503,20],caption:"Keterangan", maxLength:150});										
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Disetujui",btnClick:[this,"doBtnClick"],tag:2});				
		this.bTampil = new portalui_button(this,{bound:[619,16,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		this.e_ss = new portalui_saiLabelEdit(this,{bound:[710,16,200,20],caption:"Bunga Simp",tipeText:ttNilai,text:"0",readOnly: true});
		
		this.p1 = new portalui_panel(this,{bound:[10,30,900,343],caption:"Daftar Kartu Simpanan untuk Hitung Bunga"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,895,320],tag:"9"});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro = 'BGSIMP' and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "BGSIMP") this.akunBunga = line.flag;
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_simpanan_transaksi_fHitbunga.extend(window.portalui_childForm);
window.app_kopeg_simpanan_transaksi_fHitbunga.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpbunga_m","no_bunga",this.app._lokasi+"-BG"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kop_simpbunga_m (no_bunga,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,no_del,no_link) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+this.tot+",'"+this.e_periode.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.cb_app.getText()+"','"+this.app._userLog+"',now(),'F','IDR',1,'-','-')");
					
					var scr1 = "insert into kop_simpbunga_j (no_bunga,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
						       "kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var awal = true;
					var line = undefined;
					for (var i in this.gridJurnal.objList){
						if (!awal) { scr1 += ",";}
						line = this.gridJurnal.get(i);
						scr1 += "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+line.get("kode_akun")+
							 	"','"+this.e_desc.getText()+"','"+line.get("dc")+"',"+parseFloat(line.get("nilai"))+",'"+line.get("kode_pp")+"','-',"+
								"'"+this.app._lokasi+"','SIMPBG','SIMP','"+this.e_periode.getText()+
								"','IDR',1,'"+this.app._userLog+"',now())";
						awal = false;
					}
					i++;
					scr1 += ",";
					scr1 += "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.akunBunga+
							 	"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_ss.getText())+",'"+this.app._kodePP+"','-',"+
								"'"+this.app._lokasi+"','SIMPBG','BUNGA','"+this.e_periode.getText()+
								"','IDR',1,'"+this.app._userLog+"',now())";
								
					sql.add(scr1);
					
					scr1 = "insert into kop_simpbunga_d (no_simp,no_bunga,kode_lokasi,periode,nilai,akun_bunga,akun_simp,dc) values ";
					awal = true;
					var nosimp = [];
					for (var i=1; i <= this.sg1.getRowCount(); i++){
						if (!awal) { scr1 += ",";}
						scr1 += "('"+this.sg1.getCell(1,i)+"','"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+parseNilai(this.sg1.getCell(9,i))+",'"+this.akunBunga+"','"+this.sg1.getCell(6,i)+"','D')";
						nosimp.push("'"+this.sg1.getCell(1,i)+"'");
						awal = false;
					}
					sql.add(scr1);
					var pNext = getNextPeriode(this.e_periode.getText());
					if (nosimp != "") sql.add("update kop_simp_m set periode_bunga ='"+pNext+"' where no_simp in ("+nosimp+") and kode_lokasi = '"+this.app._lokasi+"'");
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
					this.sg1.clearAll();
				}
				break;
			case "simpan" :	
			    this.tot = nilaiToFloat(this.e_ss.getText());
				if (this.tot <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai bunga tidak boleh kurang dari atau sama dengan nol.");
					return false;
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
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpbunga_m","no_bunga",this.app._lokasi+"-BG"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doTampilClick: function(sender){
		try{			
			if (this.e_periode.getText() != "") {
				this.sg1.setColTitle(new Array("No","No Kartu","Kode","Nasabah","Jenis","Nama Simp.","Akun Simp","Saldo","% Bunga","Nilai"));				
				var data = this.dbLib.runSQL(" select x.no_simp,y.kode_agg,y.nama as nama_agg,x.jenis,concat(a.kode_simp,' - ',a.nama) as nama_simp,a.akun_simp,ifnull(aa.nilai,0)+ifnull(bb.ambil,0)+ifnull(ee.pinbuk,0)+ifnull(ff.bunga,0)  as saldo,zz.p_bunga, round((ifnull(aa.nilai,0)+ifnull(bb.ambil,0)+ifnull(ee.pinbuk,0)+ifnull(ff.bunga,0)) * zz.p_bunga/12/100) as nilai "+
				           " from kop_simp_m x inner join kop_agg y on x.kode_agg=y.kode_agg and x.kode_lokasi=y.kode_lokasi "+
						   "      inner join kop_simp_jenis a on x.kode_simp=a.kode_simp and x.kode_lokasi = a.kode_lokasi "+
						   "      inner join masakun c on a.akun_simp = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						   "      inner join kop_simp_jenis zz on zz.kode_simp = x.kode_simp and zz.kode_lokasi=x.kode_lokasi "+
						   "	     left outer join "+
 						   "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as nilai "+
						   "	               from kop_simpangs_d x inner join kop_simpangs_m y on x.no_angs=y.no_angs and x.kode_lokasi=y.kode_lokasi "+
						   "	               where y.no_del='-' group by x.kode_lokasi,x.no_simp) aa on aa.no_simp=x.no_simp and aa.kode_lokasi=x.kode_lokasi "+
						   "	     left outer join "+
						   "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then -x.nilai else x.nilai end) as ambil  "+
						   "	               from kop_simp_spbbuk x inner join spb_m y on x.no_bukti=y.no_spb and x.kode_lokasi=y.kode_lokasi "+
						   "	               where x.modul='SPB' and y.jenis='SIMP' and y.no_del='-' group by x.kode_lokasi,x.no_simp) bb on bb.no_simp=x.no_simp and bb.kode_lokasi=x.kode_lokasi "+
						   "	     left outer join  "+
						   "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then -x.nilai else x.nilai end) as pinbuk  "+
						   "	               from kop_simp_spbbuk x inner join kop_simpbuk_m y on x.no_bukti=y.no_pinbuk and x.kode_lokasi=y.kode_lokasi "+
						   "	               where x.modul='PINBUK' and y.no_del='-' group by x.kode_lokasi,x.no_simp) ee on ee.no_simp=x.no_simp and ee.kode_lokasi=x.kode_lokasi "+
						   "	     left outer join  "+
						   "	              (select x.kode_lokasi,x.no_simp,sum(case x.dc when 'D' then x.nilai else -x.nilai end) as bunga  "+
						   "	               from kop_simpbunga_d x inner join kop_simpbunga_m y on x.no_bunga=y.no_bunga and x.kode_lokasi=y.kode_lokasi "+
						   "	               where y.no_del='-' group by x.kode_lokasi,x.no_simp) ff on ff.no_simp=x.no_simp and ff.kode_lokasi=x.kode_lokasi "+
						   " where a.kode_lokasi = '"+this.app._lokasi+"' and x.status_aktif='1' and "+
						   "       x.periode_bunga<='"+this.e_periode.getText()+"' and round((ifnull(aa.nilai,0)+ifnull(bb.ambil,0)+ifnull(ee.pinbuk,0)+ifnull(ff.bunga,0)) * zz.p_bunga/12/100) > 0 order by x.jenis,x.no_simp");

				this.sg1.clearAll();
				this.sg1.setData(data);
				var totss = 0;
				for (var i in data.objList){
					totss += parseFloat(data.get(i).get("nilai"));
				}
				this.e_ss.setText(floatToNilai(totss));
				
				var row,dtJurnal = new portalui_arrayMap();
				var nemu = false;
				var dtJrnl = 0;
				var line = undefined;
				for (var i in this.sg1.data.objList) {
					line = this.sg1.data.get(i);
					kdAkun = this.sg1.data.get(i).get("akun_simp");			
					nemu = false;
					ix = 0;
					for (var j in dtJurnal.objList){		
					  if (kdAkun == dtJurnal.get(j).get("kode_akun")){
						nemu = true;
						row = dtJurnal.get(j);
						ix = j;
						break;
					  }
					}
					if (!nemu){
						row = new portalui_arrayMap();
						row.set("kode_akun",kdAkun);
						row.set("dc","C");
						row.set("keterangan","Jurnal Bunga Simpanan");
						row.set("nilai",parseFloat(this.sg1.data.get(i).get("nilai")));
						row.set("kode_pp","-");
						dtJrnl++;
						dtJurnal.set(dtJrnl,row);						
					}else {
						dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg1.data.get(i).get("nilai")));
					}
				}
				this.gridJurnal = dtJurnal;
			} 
			else {
				system.alert(this,"Periode harus valid.","Validasi field dari tanggal.");
				this.sg1.clearAll();
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
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