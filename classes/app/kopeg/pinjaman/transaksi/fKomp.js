window.app_kopeg_pinjaman_transaksi_fKomp = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjaman_transaksi_fKomp.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjaman_transaksi_fKomp";						
			owner.childFormConfig(this, "mainButtonClick","Form Kompensasi Pinjaman: Input", 0);			
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
			this.cbbApp = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"NIK Approve", btnClick:[this,"FindBtnClick"], readOnly:true,tag:2});
			this.cbbAgg = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"Nasabah", btnClick:[this,"FindBtnClick"], readOnly:true});
			this.eBaki = new portalui_saiLabelEdit(this, {bound:[600,27,180,20],caption:"Saldo Baki",tipeText:ttNilai, text:"0",labelWidth:80 ,readOnly:true});
			this.cbbKontrak = new portalui_saiCBB(this,{bound:[20,28,200,20],caption:"No Kontrak",btnClick:[this,"FindBtnClick"],btnRefreshClick:[this,"doLoadData"]});
			this.eDenda = new portalui_saiLabelEdit(this, {bound:[340,28,180,20],caption:"Nilai Pinalti",tipeText:ttNilai, text:"0",labelWidth:80,change:[this,"doChange"]});
			this.eTotPokok = new portalui_saiLabelEdit(this, {bound:[600,28,180,20],caption:"Angs. Pokok",tipeText:ttNilai, text:"0",labelWidth:80 ,readOnly:true});
			this.eNilai = new portalui_saiLabelEdit(this,{bound:[20,29,220,20],caption:"Nilai Kompensasi", tipeText:ttNilai, text:"0",readOnly:true});
			this.eUdp = new portalui_saiLabelEdit(this, {bound:[340,29,180,20],caption:"Nilai UDP",tipeText:ttNilai, text:"0",labelWidth:80,change:[this,"doChange"]});
			this.i_viewer = new portalui_imageButton(this,{bound:[220,29,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doChange"], visible:false});			
			this.eTotJasa = new portalui_saiLabelEdit(this,{bound:[600,29,180,20],caption:"Angs. Jasa",tipeText:ttNilai, readOnly:true, text:"0",labelWidth:80});
			
			this.p1 = new portalui_panel(this,{bound:[20,35,760,275],caption:"Daftar Cicilan Angsuran"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,758,250],colCount:7,
			    colWidth:[[0,1,2,3,4,5,6],[80,80,80,120,120,120,120]],
			    colTitle:["Cicilan Ke","Periode","Tgl Angs.","Angs. Hut Pokok","Angs. Hut Jasa","Nilai Angsuran","BAKI"],
                colFormat:[[3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai]],defaultRow:1,readOnly:true});    
			this.rearrangeChild(10,22);
			setTipeButton(tbSimpan);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.setTabChildIndex();			
			this.dataAngsuran = [];
			this.ePeriode.setText(this.dTgl.getThnBln());
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('PINJPD','PINJUD','PINJIM','PINJTP','PINJOI','PINJOE','PINJNE') and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PINJPD") this.akunPdpt = line.flag;
					if (line.kode_spro == "PINJIM") this.akunIM = line.flag;
					if (line.kode_spro == "PINJTP") this.akunTP = line.flag;
					if (line.kode_spro == "PINJOI") this.akunOI = line.flag;
					if (line.kode_spro == "PINJOE") this.akunOE = line.flag;
					if (line.kode_spro == "PINJUD") this.akunUDP = line.flag
					if (line.kode_spro == "PINJNE") this.nilaiOE = parseFloat(line.value1);
				}
			}
		}catch(e){
			systemAPI.alert("[app_kopeg_pinjaman_transaksi_fKomp]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjaman_transaksi_fKomp.extend(window.portalui_childForm);
window.app_kopeg_pinjaman_transaksi_fKomp.implement({
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
					this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjangs_m","no_angs",this.app._lokasi+"-PK"+this.ePeriode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update kop_pinj_m set status_aktif='K' where no_kontrak='"+this.cbbKontrak.getText()+"' and no_pinj = '"+this.cbbKontrak.dataFromList[1]+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("insert into kop_pinjangs_m(no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_depo,nilai_udp,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,p_fee,nilai_fee) values  "+
							"('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.eKet.getText()+"','"+this.dTgl.getDateString()+"',"+parseNilai(this.eNilai.getText())+",0,"+parseNilai(this.eUdp.getText())+","+parseNilai(this.eDenda.getText())+",'PINJKOMP','1','"+this.akunIM+"','"+this.ePeriode.getText()+"','"+this.app._lokasi+"','F',1,'IDR','"+this.app._kodePP+"','-','-','"+this.cbbApp.getText()+"','"+this.app._userLog+"',now(),0,0)");
					sql.add("insert into kop_pinjangs_d (no_angs,no_pinj,no_kontrak,tanggal,akun_ar,npokok,nbunga,kode_lokasi,dc) values "+
							"('"+this.eBukti.getText()+"','"+this.cbbKontrak.dataFromList[1]+"','"+this.cbbKontrak.getText()+"','"+this.dTgl.getDateString()+"','"+this.akunIM+"',"+parseNilai(this.eTotPokok.getText())+","+parseNilai(this.eTotJasa.getText())+",'"+this.app._lokasi+"','D')");
					
					var idx=0;
					var d="insert into kop_pinjangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";		
					d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunIM+"','"+this.eKet.getText()+"','D',"+parseNilai(this.eNilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','AR','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					
					d+= ",";
					idx++;
					d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.arPokok+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eTotPokok.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','ARPK','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					if (this.eTotJasa.getText() != "0") {
						d+= ",";
						idx++;
						d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.arJasa+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eTotJasa.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','ARJS','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}
					if (this.eUdp.getText() != "0") {
						d+= ",";
						idx++;
						d+= "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunUDP+"','"+this.eKet.getText()+"','D',"+parseNilai(this.eUdp.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','UDP','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						sql.add("insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
							    "('"+this.eBukti.getText()+"','"+this.dTgl.getDateString()+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eUdp.getText())+",'"+this.cbbAgg.getText()+"','PINJ','UDP','"+this.ePeriode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cbbApp.getText()+"','-','-',1,'IDR','"+this.app._userLog+"',now())");
					}
					if (this.eDenda.getText() != "0") {
						d+= ",";
						idx++;
						d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunPdpt+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eDenda.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','P_DENDA','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
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
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :	
				var tot = nilaiToFloat(this.eNilai.getText())+nilaiToFloat(this.eUdp.getText())+nilaiToFloat(this.eDenda.getText());
				if (tot <= 0){
					system.alert(this,"Transaksi tidak valid.","Kompensasi tidak boleh kurang dari atau sama dengan nol.");
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
			this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjangs_m","no_angs",this.app._lokasi+"-PK"+this.ePeriode.getText().substr(2,4)+".","0000"));
			this.eDok.setFocus();
		}
	},
	doChange: function(sender){
		if (sender == this.eUdp || sender == this.eDenda){
			if (this.eUdp.getText() != "" && this.eDenda.getText() != "")
				var total = nilaiToFloat(this.eBaki.getText()) - nilaiToFloat(this.eUdp.getText()) + nilaiToFloat(this.eDenda.getText());
				this.eNilai.setText(floatToNilai(total));
		}
		if (sender == this.ePeriode){
			this.sg1.clear(1); this.eBaki.setText("0"); 
		}
		if (sender == this.i_viewer){
			if ((this.eNilai.getText != "") && (this.eBaki.getText != "")){
				//var totAngs = nilaiToFloat(this.eNilai.getText()) + nilaiToFloat(this.eUdp.getText())); //+ nilaiToFloat(this.eDenda.getText() <---jgn masuk krn bukan bagian dr saldo piutang
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
			try{
				this.eUdp.setText("0");
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:["select a.cicilan_ke,date_format(ab.tanggal,'%d/%m/%Y') as tgl_angs,a.npokok,a.nbunga,ifnull(aa.nangs,0) as angs,b.nilai as baki,b.akun_piutang,b.akun_pjasa,aa.no_kontrak "+
													  "from kop_pinjbill_d a inner join kop_pinjbill_m ab on a.no_bill=ab.no_bill and a.kode_lokasi=ab.kode_lokasi "+
													  "                      inner join kop_pinj_m b on a.no_kontrak=b.no_kontrak and a.no_pinj=b.no_pinj and a.kode_lokasi=b.kode_lokasi "+
													  "                      left outer join (select no_kontrak,no_pinj,kode_lokasi,date_format(tanggal,'%Y%m') as per, sum(case dc when 'D' then npokok+nbunga else -(npokok+nbunga) end) as nangs "+
													  "                                     from kop_pinjangs_d group by no_kontrak,no_pinj,kode_lokasi,date_format(tanggal,'%Y%m')) aa "+
													  "                                     on aa.no_kontrak=a.no_kontrak and aa.no_pinj=a.no_pinj and aa.kode_lokasi=a.kode_lokasi and date_format(ab.tanggal,'%Y%m') = aa.per "+
													  "where a.no_kontrak='"+this.cbbKontrak.getText()+"' and a.no_pinj='"+this.cbbKontrak.dataFromList[1]+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.cicilan_ke",
													  "select no_kontrak,no_pinj, sum(case dc when 'D' then npokok+nbunga else -(npokok+nbunga) end) as nangs, sum(case dc when 'D' then nbunga else -nbunga end) nbunga "+
													  "  from kop_pinjangs_d a "+
													  " where a.no_kontrak='"+this.cbbKontrak.getText()+"' and a.no_pinj='"+this.cbbKontrak.dataFromList[1]+"' and a.kode_lokasi = '"+this.app._lokasi+"' group by no_kontrak,no_pinj "]}));
				
				eval("data = "+data+";");
				var periode = ""; 
				if (typeof data == "object"){
					var line;
					var dataAngs = data.result[1];
					data = data.result[0];
					line = data.rs.rows[0];
					var baki = parseFloat(line.baki);
					bakiOri = baki;
					var totBunga = 0;
					this.sg1.clear();
					this.nJasalunas = 0; this.nJasa = 0;
					var angs = (dataAngs.rs.rows[0] != undefined ? parseFloat(dataAngs.rs.rows[0].nangs) : 0 );					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];				
						periode = line.tgl_angs.substr(6,4)+line.tgl_angs.substr(3,2);
						baki = baki + parseFloat(line.nbunga) - parseFloat(line.angs);
						angs -= parseFloat(line.angs);
						bakiOri+= parseFloat(line.nbunga);
						totBunga += parseFloat(line.nbunga);
						if (parseFloat(line.angs) == 0) this.nJasalunas += parseFloat(line.nbunga);												
						this.sg1.appendData([line.cicilan_ke,periode,line.tgl_angs,floatToNilai(line.npokok),floatToNilai(line.nbunga),floatToNilai(line.angs),floatToNilai(baki)]);
						if (periode == this.ePeriode.getText() && parseFloat(line.angs) == 0) { 
							this.nJasa = parseFloat(line.nbunga);
							break;
						}
					}
					if (angs > 0) {
						this.sg1.editData(this.sg1.rowCount - 1,[floatToNilai(angs), floatToNilai(baki - angs)], [5,6]);
					}
					bakiOri = bakiOri - (dataAngs.rs.rows[0] != undefined ? parseFloat(dataAngs.rs.rows[0].nangs) : 0 );					
					this.nJasalunas = totBunga - (dataAngs.rs.rows[0] != undefined ? parseFloat(dataAngs.rs.rows[0].nbunga) : 0 );
				
					this.sg1.validasi();
					this.eBaki.setText(floatToNilai(bakiOri));
					this.eNilai.setText(floatToNilai(bakiOri));				
					this.arPokok = line.akun_piutang;
					this.arJasa = line.akun_pjasa;
					this.doChange(this.i_viewer);
				}
			}catch(e){
				alert(e);
			}
		} else {
			system.alert(this,"Kontrak dan Periode tidak valid.","");
		}
	},
	FindBtnClick: function(sender){
		if (sender == this.cbbKontrak){
			this.standarLib.showListData(this, "Daftar Kontrak",sender,undefined, 
										  "select a.no_kontrak, a.no_pinj from kop_pinj_m a inner join kop_pinj_spb b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
										  "                                                 inner join spb_m c on b.no_spb=c.no_spb and b.kode_lokasi=c.kode_lokasi "+
										  "                                                 inner join kas_d d on c.no_spb=d.no_bukti and d.kode_lokasi=c.kode_lokasi "+
										  "                                                 inner join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+
										  "where a.kode_agg='"+this.cbbAgg.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.progress = '1' and a.status_aktif in ('0','1') and c.no_del='-' and e.no_del='-'",
										  "select count(a.no_pinj) from kop_pinj_m a        inner join kop_pinj_spb b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
										  "                                                 inner join spb_m c on b.no_spb=c.no_spb and b.kode_lokasi=c.kode_lokasi "+
										  "                                                 inner join kas_d d on c.no_spb=d.no_bukti and d.kode_lokasi=c.kode_lokasi "+
										  "                                                 inner join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+
										  "where a.kode_agg='"+this.cbbAgg.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.progress = '1' and a.status_aktif in ('0','1') and c.no_del='-' and e.no_del='-'",
										  ["no_kontrak","no_pinj"],"and",["No Kontrak","No Pinjaman"],false);
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

