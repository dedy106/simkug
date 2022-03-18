window.app_kopeg_pinjaman_transaksi_fKompk = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjaman_transaksi_fKompk.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjaman_transaksi_fKompk";						
			owner.childFormConfig(this, "mainButtonClick","Form Kompensasi Pinjaman: Koreksi", 0);			
			this.maximize();
			//------------------------ login data ------------------------	
			uses("portalui_saiCBB;portalui_datePicker;portalui_radioButton");
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,20,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
			this.lTgl = new portalui_label(this,{bound:[20,21,100,18],caption:"Tanggal",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,21,100,18],selectDate:[this,"doSelectDate"]});
			this.cbbPerLama = new portalui_saiCB(this,{bound:[600,21,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
			this.eBukti = new portalui_saiLabelEdit(this,{bound:[20,23,290,20],caption:"No Bukti",readOnly:true});
			this.bGen = new portalui_button(this,{bound:[320,23,80,18],caption:"Generate", click:[this,"doClick"]});			
			this.cbbNbLama = new portalui_saiCBB(this,{bound:[600,23,200,20],caption:"No Bukti Lama",readOnly:true, btnClick:[this,"FindBtnClick"], btnRefreshClick:[this,"doLoadData"]});
			this.eDok = new portalui_saiLabelEdit(this,{bound:[20,22,290,20],caption:"No Dokumen",tag:1});
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,24,500,20],caption:"Deskripsi",tag:1});
			this.cbbApp = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"NIK Approve", btnClick:[this,"FindBtnClick"], readOnly:true,tag:1});
			this.cbbAgg = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"Nasabah", readOnly:true,tag:1});
			this.eBaki = new portalui_saiLabelEdit(this, {bound:[600,27,180,20],caption:"Saldo Baki",tipeText:ttNilai, text:"0",labelWidth:80 ,readOnly:true,tag:1});
			this.cbbKontrak = new portalui_saiCBB(this,{bound:[20,28,200,20],caption:"No Kontrak",readOnly:true,tag:1});
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
			setTipeButton(tbUbahHapus);
			
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
			var prd = this.dbLib.getDataProvider("select distinct periode from kop_pinjangs_m where no_del='-' and jenis = 'PINJKOMP' and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof prd == "object"){
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cbbPerLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cbbPerLama.setText(this.app._periode);
		}catch(e){
			systemAPI.alert("[app_kopeg_pinjaman_transaksi_fKompk]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjaman_transaksi_fKompk.extend(window.portalui_childForm);
window.app_kopeg_pinjaman_transaksi_fKompk.implement({
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
			if (parseFloat(this.perLama) < parseFloat(this.app._periode)) this.eBukti.setTag(0);
			else this.eBukti.setTag(9);		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjangs_m","no_angs",this.app._lokasi+"-PK"+this.ePeriode.getText().substr(2,4)+".","0000"));
						sql.add(" update kop_pinjangs_m set no_link='"+this.eBukti.getText()+"',no_del = concat(no_angs,'r') where no_angs ='"+this.cbbNbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_pinjangs_m (no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_depo,nilai_udp,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,p_fee,nilai_fee) "+
							    " select concat(no_angs,'r'),no_dokumen,keterangan,'"+this.dTgl.getDateString()+"',nilai,nilai_depo,nilai_udp,nilai_sls,jenis,'X',akun_ar,'"+this.ePeriode.getText()+"',kode_lokasi,'F',kurs,kode_curr,kode_pp,no_angs,'-','"+this.cbbApp.getText()+"','"+this.app._useLog+"',now(),p_fee,nilai_fee "+
								" from kop_pinjangs_m where no_angs = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_pinjangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_angs,'r'),no_dokumen,'"+this.dTgl.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.ePeriode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_pinjangs_j where no_angs = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");						
						sql.add("insert into kop_pinjangs_d (no_angs,no_pinj,no_kontrak,tanggal,akun_ar,npokok,nbunga,kode_lokasi,dc)"+
								" select concat(no_angs,'r'),no_pinj,no_kontrak,tanggal,akun_ar,npokok,nbunga,kode_lokasi,'C' "+ 
								" from kop_pinjangs_d where no_angs = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_depo (no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input)"+
								" select concat(no_depo,'r'),'"+this.dTgl.getDateString()+"',keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_agg,modul,jenis,'"+this.ePeriode.getText()+"',kode_lokasi,kode_pp,'"+this.cbbApp.getText()+"',no_depo,'-',kurs,kode_curr,'"+this.app._userLog+"',now() "+ 
								" from kop_depo where no_depo = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("update kop_pinj_m set status_aktif='1' where no_kontrak='"+this.cbbKontrak.getText()+"' and no_pinj = '"+this.noPinjLama+"' and kode_lokasi = '"+this.app._lokasi+"'");
						this.nb = this.eBukti.getText();
					}
					else{
						sql.add("delete from kop_pinjangs_m where no_angs='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pinjangs_j where no_angs='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pinjangs_d where no_angs ='"+this.cbbNbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
						sql.add("delete from kop_depo where no_depo ='"+this.cbbNbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
						sql.add("update kop_pinj_m set status_aktif='1' where no_kontrak='"+this.cbbKontrak.getText()+"' and no_pinj = '"+this.noPinjLama+"' and kode_lokasi = '"+this.app._lokasi+"'");
						this.nb = this.cbbNbLama.getText();
					}
					
					sql.add("update kop_pinj_m set status_aktif='K' where no_kontrak='"+this.cbbKontrak.getText()+"' and no_pinj = '"+this.noPinjLama+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					sql.add("insert into kop_pinjangs_m(no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_depo,nilai_udp,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,p_fee,nilai_fee) values  "+
							"('"+this.nb+"','"+this.eDok.getText()+"','"+this.eKet.getText()+"','"+this.dTgl.getDateString()+"',"+parseNilai(this.eNilai.getText())+",0,"+parseNilai(this.eUdp.getText())+","+parseNilai(this.eDenda.getText())+",'PINJKOMP','1','"+this.akunIM+"','"+this.ePeriode.getText()+"','"+this.app._lokasi+"','F',1,'IDR','"+this.app._kodePP+"','-','-','"+this.cbbApp.getText()+"','"+this.app._userLog+"',now(),0,0)");
					sql.add("insert into kop_pinjangs_d (no_angs,no_pinj,no_kontrak,tanggal,akun_ar,npokok,nbunga,kode_lokasi,dc) values "+
							"('"+this.nb+"','"+this.noPinjLama+"','"+this.cbbKontrak.getText()+"','"+this.dTgl.getDateString()+"','"+this.akunIM+"',"+parseNilai(this.eTotPokok.getText())+","+parseNilai(this.eTotJasa.getText())+",'"+this.app._lokasi+"','D')");
					
					var idx=0;
					var d="insert into kop_pinjangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";		
					d += "('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunIM+"','"+this.eKet.getText()+"','D',"+parseNilai(this.eNilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','AR','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					d+= ",";
					idx++;
					d += "('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.arPokok+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eTotPokok.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','ARPK','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					if (this.eTotJasa.getText() != "0") {
						d+= ",";
						idx++;
						d += "('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.arJasa+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eTotJasa.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','ARJS','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}
					if (this.eUdp.getText() != "0") {
						d+= ",";
						idx++;
						d+= "('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunUDP+"','"+this.eKet.getText()+"','D',"+parseNilai(this.eUdp.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','UDP','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						sql.add("insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
							    "('"+this.nb+"','"+this.dTgl.getDateString()+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eUdp.getText())+",'"+this.cbbAgg.getText()+"','PINJ','UDP','"+this.ePeriode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cbbApp.getText()+"','-','-',1,'IDR','"+this.app._userLog+"',now())");
					}
					if (this.eDenda.getText() != "0") {
						d+= ",";
						idx++;
						d += "('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunPdpt+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eDenda.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','P_DENDA','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
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
			case "ubah" :	
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				if (this.status != "K") {
					system.alert(this,"Kompensasi tidak dapat dibatalkan.","Progress sudah berubah dari K menjadi "+this.status+".");
					return false;
				}
				var tot = nilaiToFloat(this.eNilai.getText())+nilaiToFloat(this.eUdp.getText())+nilaiToFloat(this.eDenda.getText());
				if (tot <= 0){
					system.alert(this,"Transaksi tidak valid.","Angsuran tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.perLama) > parseFloat(this.ePeriode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode bukti lama.");
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
			case "hapus" : 
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				if (this.status != "K") {
					system.alert(this,"Kompensasi tidak dapat dibatalkan.","Progress sudah berubah dari K menjadi "+this.status+".");
					return false;
				}
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add(" update kop_pinjangs_m set no_del = concat(no_angs,'r') where no_angs ='"+this.cbbNbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_pinjangs_m (no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_depo,nilai_udp,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,p_fee,nilai_fee) "+
							    " select concat(no_angs,'r'),no_dokumen,keterangan,'"+this.dTgl.getDateString()+"',nilai,nilai_depo,nilai_udp,nilai_sls,jenis,'X',akun_ar,'"+this.ePeriode.getText()+"',kode_lokasi,'F',kurs,kode_curr,kode_pp,no_angs,'-','"+this.cbbApp.getText()+"','"+this.app._useLog+"',now(),p_fee,nilai_fee "+
								" from kop_pinjangs_m where no_angs = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_pinjangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_angs,'r'),no_dokumen,'"+this.dTgl.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.ePeriode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_pinjangs_j where no_angs = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");						
						sql.add("insert into kop_pinjangs_d (no_angs,no_pinj,no_kontrak,tanggal,akun_ar,npokok,nbunga,kode_lokasi,dc)"+
								" select concat(no_angs,'r'),no_pinj,no_kontrak,tanggal,akun_ar,npokok,nbunga,kode_lokasi,'C' "+ 
								" from kop_pinjangs_d where no_angs = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_depo (no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input)"+
								" select concat(no_depo,'r'),'"+this.dTgl.getDateString()+"',keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_agg,modul,jenis,'"+this.ePeriode.getText()+"',kode_lokasi,kode_pp,'"+this.cbbApp.getText()+"',no_depo,'-',kurs,kode_curr,'"+this.app._userLog+"',now() "+ 
								" from kop_depo where no_depo = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("update kop_pinj_m set status_aktif='1' where no_kontrak='"+this.cbbKontrak.getText()+"' and no_pinj = '"+this.noPinjLama+"' and kode_lokasi = '"+this.app._lokasi+"'");
					}
					else{
						sql.add("delete from kop_pinjangs_m where no_angs='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pinjangs_j where no_angs='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pinjangs_d where no_angs ='"+this.cbbNbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
						sql.add("delete from kop_depo where no_depo ='"+this.cbbNbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
						sql.add("update kop_pinj_m set status_aktif='1' where no_kontrak='"+this.cbbKontrak.getText()+"' and no_pinj = '"+this.noPinjLama+"' and kode_lokasi = '"+this.app._lokasi+"'");
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
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
		if (sender == this.i_viewer){
			if ((this.eNilai.getText != "") && (this.eBaki.getText != "")){
				//var totAngs = nilaiToFloat(this.eNilai.getText()) + nilaiToFloat(this.eUdp.getText()); //+ nilaiToFloat(this.eDenda.getText() <---jgn masuk krn bukan bagian dr saldo piutang
				var totAngs = nilaiToFloat(this.eBaki.getText());
				this.eTotJasa.setText(floatToNilai(this.nJasalunas));
				totAngs = totAngs - this.nJasalunas;
				if (totAngs >= 0) this.eTotPokok.setText(floatToNilai(totAngs));
				else this.eTotPokok.setText("0");
			}
		}
	},
	doLoadData: function(sender){
		if (this.cbbNbLama.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.cicilan_ke,date_format(ab.tanggal,'%d/%m/%Y') as tgl_angs,a.npokok,a.nbunga,ifnull(aa.nangs,0) as angs,b.nilai as baki,b.akun_piutang,b.akun_pjasa,"+
												  "       y.posted,y.periode,y.nilai,y.nilai_udp,y.nilai_sls,y.nik_app,z.nama as nama_app,b.kode_agg,zz.nama as nama_agg,b.no_kontrak,b.no_pinj,y.keterangan,y.no_dokumen,b.status_aktif "+
			                                      "from kop_pinjbill_d a inner join kop_pinjbill_m ab on a.no_bill=ab.no_bill and a.kode_lokasi=ab.kode_lokasi "+
												  "                      inner join kop_pinj_m b on a.no_kontrak=b.no_kontrak and a.no_pinj=b.no_pinj and a.kode_lokasi=b.kode_lokasi "+
												  "                      inner join kop_pinjangs_d x on x.no_kontrak=b.no_kontrak and x.no_pinj=b.no_pinj and x.kode_lokasi=b.kode_lokasi "+
												  "                      inner join kop_pinjangs_m y on x.no_angs=y.no_angs and x.kode_lokasi=y.kode_lokasi "+
												  "                      inner join karyawan z on y.nik_app=z.nik and z.kode_lokasi=y.kode_lokasi "+
												  "                      inner join kop_agg zz on b.kode_agg=zz.kode_agg and zz.kode_lokasi=b.kode_lokasi "+
												  "                      left outer join (select no_kontrak,no_pinj,kode_lokasi,date_format(tanggal,'%Y%m') as per, sum(case dc when 'D' then npokok+nbunga else -(npokok+nbunga) end) as nangs "+
												  "                                     from kop_pinjangs_d where no_angs <> '"+this.cbbNbLama.getText()+"' group by no_kontrak,no_pinj,kode_lokasi,date_format(tanggal,'%Y%m')) aa "+
												  "                                     on aa.no_kontrak=a.no_kontrak and aa.no_pinj=a.no_pinj and aa.kode_lokasi=a.kode_lokasi and date_format(ab.tanggal,'%Y%m') = aa.per "+
												  "where y.no_angs='"+this.cbbNbLama.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.cicilan_ke"); 												  
			
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
				this.arPokok = line.akun_piutang;
				this.arJasa = line.akun_pjasa;
				
				this.posted = line.posted;
				this.perLama = line.periode;
				this.noPinjLama = line.no_pinj;
				this.status = line.status_aktif;
				
				this.eDok.setText(line.no_dokumen);
				this.eKet.setText(line.keterangan);
				this.cbbApp.setText(line.nik_app,line.nama_app);
				this.cbbAgg.setText(line.kode_agg,line.nama_agg);
				this.cbbKontrak.setText(line.no_kontrak);
				this.eNilai.setText(floatToNilai(parseFloat(line.nilai)));
				this.eUdp.setText(floatToNilai(parseFloat(line.nilai_udp)));
				this.eDenda.setText(floatToNilai(parseFloat(line.nilai_sls)));
				
				this.doChange(this.i_viewer);
			}
		}
		else {
			system.alert(this,"No Angsuran Lama tidak valid.","No Angsuran Lama harus dipilih.");
		}
	},
	FindBtnClick: function(sender){
		if (sender == this.cbbNbLama) {   
			this.standarLib.showListData(this, "Daftar Bukti Angsuran",sender,undefined, 
										  "select no_angs, keterangan  from kop_pinjangs_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cbbPerLama.getText()+"' and no_del='-' and jenis='PINJKOMP' and progress='1'", 
										  "select count(no_angs)       from kop_pinjangs_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cbbPerLama.getText()+"' and no_del='-' and jenis='PINJKOMP' and progress='1'",
										  ["no_angs","keterangan"],"and",["No Komp","Deskripsi"],false);				
			this.standarLib.clearByTag(this, new Array("1"),undefined);		
			this.sg1.clear(1);
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

