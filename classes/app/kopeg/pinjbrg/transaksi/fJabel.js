window.app_kopeg_pinjbrg_transaksi_fJabel = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjbrg_transaksi_fJabel.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjbrg_transaksi_fJabel";						
			owner.childFormConfig(this, "mainButtonClick","Form Penarikan Barang: Input", 0);			
			this.maximize();
			//------------------------ login data ------------------------	
			uses("portalui_saiCBB;portalui_datePicker;portalui_radioButton");
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,20,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
			this.lTgl = new portalui_label(this,{bound:[20,21,100,18],caption:"Tanggal",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,21,100,18],selectDate:[this,"doSelectDate"]});
			this.eBukti = new portalui_saiLabelEdit(this,{bound:[20,23,290,20],caption:"No Bukti",readOnly:true});
			this.bGen = new portalui_button(this,{bound:[320,23,80,18],caption:"Generate", click:[this,"doClick"]});			
			this.eDok = new portalui_saiLabelEdit(this,{bound:[20,22,290,20],caption:"No Dokumen"});
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,24,500,20],caption:"Deskripsi"});
			this.cbbAkun = new portalui_saiCBBL(this,{bound:[20,12,200,20],caption:"Akun Persediaan",btnClick:[this,"FindBtnClick"],tag:2});
			this.cbbApp = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"NIK Approve", btnClick:[this,"FindBtnClick"], readOnly:true,tag:2});
			this.cbbAgg = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"Nasabah", btnClick:[this,"FindBtnClick"], readOnly:true});
			this.eBaki = new portalui_saiLabelEdit(this, {bound:[600,27,180,20],caption:"Saldo Baki",tipeText:ttNilai, text:"0",labelWidth:80 ,readOnly:true});
			this.cbbKontrak = new portalui_saiCBB(this,{bound:[20,28,200,20],caption:"No Kontrak",btnClick:[this,"FindBtnClick"],btnRefreshClick:[this,"doLoadData"]});			
			this.eTotPokok = new portalui_saiLabelEdit(this, {bound:[600,28,180,20],caption:"Angs. Pokok",tipeText:ttNilai, text:"0",labelWidth:80 ,readOnly:true});
			this.eNilai = new portalui_saiLabelEdit(this,{bound:[20,29,220,20],caption:"Nilai Penarikan", tipeText:ttNilai, text:"0",readOnly:true});
			this.i_viewer = new portalui_imageButton(this,{bound:[220,29,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doChange"], visible:false});			
			this.eTotJasa = new portalui_saiLabelEdit(this,{bound:[600,29,180,20],caption:"Angs. Jasa",tipeText:ttNilai, readOnly:true, text:"0",labelWidth:80});
			
			this.p1 = new portalui_panel(this,{bound:[20,35,760,275],caption:"Daftar Cicilan Angsuran"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,758,250],colCount:7,
			    colWidth:[[0,1,2,3,4,5,6],[80,80,80,120,120,120,120]],
			    colTitle:["Cicilan Ke","Periode","Tgl Angs.","Angs. Hut Pokok","Angs. Hut Jasa","Nilai Angsuran","BAKI"],
                colFormat:[[3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai]],defaultRow:1,readOnly:true});    
			this.p2 = new portalui_panel(this,{bound:[20,36,760,150],caption:"Daftar Barang"});
			this.sg2 = new portalui_saiGrid(this.p2,{bound:[1,20,758,130],colCount:6,tag:9,
			    colWidth:[[0,1,2,3,4,5],[80,280,100,60,120,60]],
			    colTitle:["Kd Barang","Nama Brg","Nilai","Jumlah","Subttl","Akun Pers."],
                colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],readOnly:true,defaultRow:1});
			this.rearrangeChild(10,22);
			setTipeButton(tbSimpan);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.setTabChildIndex();			
			this.dataAngsuran = [];
			this.ePeriode.setText(this.dTgl.getThnBln());
			
		}catch(e){
			systemAPI.alert("[app_kopeg_pinjbrg_transaksi_fJabel]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjbrg_transaksi_fJabel.extend(window.portalui_childForm);
window.app_kopeg_pinjbrg_transaksi_fJabel.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		else if (sender == this.app._mainForm.bSimpan){
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		}else if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		else if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{				
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pbrgangs_m","no_angs",this.app._lokasi+"-PBT"+this.ePeriode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update kop_pbrg_m set status_aktif='J' where no_kontrak='"+this.cbbKontrak.getText()+"' and no_pbrg = '"+this.cbbKontrak.dataFromList[1]+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("insert into kop_pbrgangs_m(no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_depo,nilai_udp,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,p_fee,nilai_fee) values  "+
							"('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.eKet.getText()+"','"+this.dTgl.getDateString()+"',"+parseNilai(this.eNilai.getText())+",0,0,0,'PBRGJABEL','1','"+this.cbbAkun.getText()+"','"+this.ePeriode.getText()+"','"+this.app._lokasi+"','F',1,'IDR','"+this.app._kodePP+"','-','-','"+this.cbbApp.getText()+"','"+this.app._userLog+"',now(),0,0)");
					sql.add("insert into kop_pbrgangs_d (no_angs,no_pbrg,no_kontrak,tanggal,akun_ar,npokok,nbunga,kode_lokasi,dc) values "+
							"('"+this.eBukti.getText()+"','"+this.cbbKontrak.dataFromList[1]+"','"+this.cbbKontrak.getText()+"','"+this.dTgl.getDateString()+"','"+this.cbbAkun.getText()+"',"+parseNilai(this.eTotPokok.getText())+","+parseNilai(this.eTotJasa.getText())+",'"+this.app._lokasi+"','D')");
					
					var idx=0;
					var d="insert into kop_pbrgangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";		
					d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.cbbAkun.getText()+"','"+this.eKet.getText()+"','D',"+parseNilai(this.eNilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','AR','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";					
					d+= ",";
					idx++;
					d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.arPokok+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eTotPokok.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','ARPK','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					if (this.eTotJasa.getText() != "0") {
						d+= ",";
						idx++;
						d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.arJasa+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eTotJasa.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','ARJS','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}
					sql.add(d);					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.eBukti);		
					this.sg1.clear(1);
					this.sg2.clear(1);
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :	
				var tot = nilaiToFloat(this.eNilai.getText());
				if (tot <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai penarikan tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.ePeriode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.ePeriode.getText())) {
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
	doSelectDate: function(sender, y, m, d){
       this.ePeriode.setText(sender.getThnBln());
    },
	doClick: function(sender){
		if (sender == this.bGen){
			this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pbrgangs_m","no_angs",this.app._lokasi+"-PBT"+this.ePeriode.getText().substr(2,4)+".","0000"));
			this.eDok.setFocus();
		}
	},
	doChange: function(sender){
		if (sender == this.ePeriode){
			this.sg1.clear(1); this.eBaki.setText("0"); 
		}
		if (sender == this.i_viewer){
			if ((this.eNilai.getText != "") && (this.eBaki.getText != "")){
				var totAngs = nilaiToFloat(this.eBaki.getText());
				this.eTotJasa.setText(floatToNilai(this.nJasalunas));
				totAngs = totAngs - this.nJasalunas;
				if (totAngs >= 0) this.eTotPokok.setText(floatToNilai(totAngs));
				else this.eTotPokok.setText("0");
			}
		}
	},
	doLoadData: function(sender){
		if (this.cbbKontrak.getText() != "" && (this.ePeriode.getText() != "")){
			var data = this.dbLib.getDataProvider("select a.cicilan_ke,date_format(ab.tanggal,'%d/%m/%Y') as tgl_angs,a.npokok,a.nbunga,ifnull(aa.nangs,0) as angs,b.nilai as baki,b.akun_piutang,b.akun_pjasa,aa.no_kontrak "+
			                                      "from kop_pbrgbill_d a inner join kop_pbrgbill_m ab on a.no_bill=ab.no_bill and a.kode_lokasi=ab.kode_lokasi "+
												  "                      inner join kop_pbrg_m b on a.no_kontrak=b.no_kontrak and a.no_pbrg=b.no_pbrg and a.kode_lokasi=b.kode_lokasi "+
												  "                      left outer join (select no_kontrak,no_pbrg,kode_lokasi,date_format(tanggal,'%Y%m') as per, sum(case dc when 'D' then npokok+nbunga else -(npokok+nbunga) end) as nangs "+
												  "                                     from kop_pbrgangs_d group by no_kontrak,no_pbrg,kode_lokasi,date_format(tanggal,'%Y%m')) aa "+
												  "                                     on aa.no_kontrak=a.no_kontrak and aa.no_pbrg=a.no_pbrg and aa.kode_lokasi=a.kode_lokasi and date_format(ab.tanggal,'%Y%m') = aa.per "+
												  "where a.no_kontrak='"+this.cbbKontrak.getText()+"' and a.no_pbrg='"+this.cbbKontrak.dataFromList[1]+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.cicilan_ke"); 												  
			
			eval("data = "+data+";");
			var periode = ""; 
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];
				var baki = parseFloat(line.baki);
				this.sg1.clear();
				this.nJasalunas = 0; this.nJasa = 0;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];				
					periode = line.tgl_angs.substr(6,4)+line.tgl_angs.substr(3,2);
					baki = baki + parseFloat(line.nbunga) - parseFloat(line.angs);
					if (parseFloat(line.angs) == 0) this.nJasalunas += parseFloat(line.nbunga);
					this.sg1.appendData([line.cicilan_ke,periode,line.tgl_angs,floatToNilai(line.npokok),floatToNilai(line.nbunga),floatToNilai(line.angs),floatToNilai(baki)]);
					if (periode == this.ePeriode.getText() && parseFloat(line.angs) == 0) { 
						this.nJasa = parseFloat(line.nbunga);
						break;
					}
				}
				this.sg1.validasi();
				this.eBaki.setText(floatToNilai(baki));
				this.eNilai.setText(floatToNilai(baki));				
				this.arPokok = line.akun_piutang;
				this.arJasa = line.akun_pjasa;
				this.doChange(this.i_viewer);
			}
			
			var data = this.dbLib.getDataProvider("select d.kode_brg,d.nama as nama_brg,c.harga_kont as harga,c.jumlah_kont as jumlah,c.harga_kont*c.jumlah_kont as subttl,f.kode_akun "+
					   "from kop_pbrg_m a "+
					   "inner join kop_jual_m b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi "+
					   "inner join kop_jual_d c on b.no_jual=c.no_jual and b.kode_lokasi=c.kode_lokasi "+
					   "inner join kop_brg d on c.kode_brg=d.kode_brg and c.kode_lokasi=d.kode_lokasi "+
					   "inner join kop_brg_klp f on f.kode_klpbrg=d.kode_klpbrg and f.kode_lokasi=d.kode_lokasi "+
					   "where a.no_kontrak='"+this.cbbKontrak.getText()+"' and a.no_pbrg='"+this.cbbKontrak.dataFromList[1]+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");			
			if (typeof data == "object"){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_brg,line.nama_brg,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.subttl),line.kode_akun]);
				}
				this.sg2.validasi();
			} 
		} else {
			system.alert(this,"Kontrak dan Periode tidak valid.","");
		}
	},
	FindBtnClick: function(sender){
		if (sender == this.cbbKontrak){
			this.standarLib.showListData(this, "Daftar Kontrak",sender,undefined, 
										  "select no_kontrak, no_pbrg from kop_pbrg_m where kode_agg='"+this.cbbAgg.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and progress = '2' and status_aktif in ('0','1') ",
										  "select count(no_kontrak)   from kop_pbrg_m where kode_agg='"+this.cbbAgg.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and progress = '2' and status_aktif in ('0','1') ",
										  ["no_kontrak","no_pbrg"],"and",["No Kontrak","No PBRG"],false);
			this.sg1.clear(1);
		}
		if (sender == this.cbbAgg){
			this.standarLib.showListData(this, "Daftar Nasabah",sender,undefined, 
										  "select kode_agg, nama  from kop_agg where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(kode_agg) from kop_agg where kode_lokasi ='"+this.app._lokasi+"'",
										  ["kode_agg","nama"],"and",["Kode Nasabah","Nama"],false);
			this.cbbKontrak.setText("",""); this.sg1.clear(1);
		}
		if (sender == this.cbbApp){
			this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
		if (sender == this.cbbAkun) {   
			this.standarLib.showListData(this, "Daftar Akun Persediaan Barang",sender,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='005' ",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='005' ",
										  ["kode_akun","nama"],"and",["Kode Akun","Nama Akun"],false);				
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.eBukti.getText()+")");							
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