window.app_kopeg_pinjaman_transaksi_fSpbPinjk = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjaman_transaksi_fSpbPinjk.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjaman_transaksi_fSpbPinjk";
			owner.childFormConfig(this, "mainButtonClick","Form SPB Pinjaman : Koreksi", 0);
			this.maximize();
			//------------------------ login data ------------------------	
			uses("portalui_saiCBB;portalui_datePicker;portalui_radioButton");
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true, tag:2});
			this.lTgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,11,100,18], selectDate:[this,"doSelectDate"]});
			this.cbbPerLama = new portalui_saiCB(this,{bound:[770,11,200,20],caption:"Periode SPB",mustCheck: false, tag:2});
			this.eSPB = new portalui_saiLabelEdit(this,{bound:[20,12,290,20],caption:"No SPB",readOnly:true});
			this.bGen = new portalui_button(this,{bound:[320,12,80,18],caption:"Generate", click:[this,"doClick"]});			
			this.cbbNbLama = new portalui_saiCBB(this,{bound:[770,12,200,20],caption:"No SPB Lama",readOnly:true, btnClick:[this,"FindBtnClick"], btnRefreshClick:[this,"doLoadData"]});
			this.eDok = new portalui_saiLabelEdit(this,{bound:[20,13,290,20],caption:"No Dok SLA",tag:1});
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,14,500,20],caption:"Keterangan",tag:1});
			this.lTgl = new portalui_label(this,{bound:[20,15,100,18],caption:"Tgl Jth Tempo",underline:true});
			this.dTgl2 = new portalui_datePicker(this,{bound:[120,15,100,18]});
			this.cbbLoker = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Loker",readOnly:true,tag:1});
			this.cbbPemohon = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Pemohon", btnClick:[this,"FindBtnClick"],readOnly:true,tag:1});
			this.eNilai = new portalui_saiLabelEdit(this,{bound:[770,17,200,20],caption:"Nilai Pengajuan", tipeText:ttNilai, text:"0",readOnly:true,tag:1});
			this.cbbAR = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Akun Piutang", btnClick:[this,"FindBtnClick"], readOnly:true,tag:1});			
            this.ePot = new portalui_saiLabelEdit(this, {bound:[770,18,200,20],caption:"Nilai Potongan",tipeText:ttNilai, text:"0",readOnly:true,tag:1});
			this.cbbAP = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Akun Ht. Asuransi", btnClick:[this,"FindBtnClick"], readOnly:true,tag:1});
            this.eNilaiSpb = new portalui_saiLabelEdit(this, {bound:[770,21,200,20],caption:"Nilai Approve SPB",tipeText:ttNilai, text:"0",readOnly:true,tag:1});        
			this.bApp = new portalui_button(this,{bound:[630,21,60,18],caption:"App",click:[this,"doClick"]});
            this.bInprog = new portalui_button(this,{bound:[695,21,60,18],caption:"Inprog",click:[this,"doClick"]});
			
			this.p1 = new portalui_panel(this,{bound:[20,35,950,275],caption:"Daftar Pengajuan Pinjaman"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,949,255],colCount:15,
			    colWidth:[[0,1,2,3,4,5,6,7,8,9, 10,11,12,13,14],[60,100,0,60,120,60,170,80,60,60,  60,80,50,50,50]],
			    colTitle:["Status","No Bukti","No Kontrak","Kd Nsbh","Nama Nasabah","Tgl Aju","Keterangan","Nilai Aju","Tot Biaya","Nilai Komp.",
				          "Titipan","Nilai Salur","Bea Mat.","Bea Prov.","Bea Asur."],
                colFormat:[[7,8,9,10,11,12,13,14],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
                buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
                colHide:[[2],true],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,11,12,13,14],[10]],
				defaultRow:1,nilaiChange:[this,"doSgChange"],change:[this,"doChangeCell"]});
				
			this.rearrangeChild(10,22);
			setTipeButton(tbUbahHapus);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.setTabChildIndex();			
			this.dataAngsuran = [];
			this.ePeriode.setText(this.dTgl.getThnBln());
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PINJTK','PINJIM','PINJSP','PINJMT','PINJPR','PINJJS') and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PINJSP") this.akunAP = line.flag;
					if (line.kode_spro == "PINJMT") this.akunMat = line.flag;
					if (line.kode_spro == "PINJPR") this.akunProv = line.flag;
					if (line.kode_spro == "PINJJS") this.akunPjasa = line.flag;
					if (line.kode_spro == "PINJIM") this.akunIM = line.flag;
					if (line.kode_spro == "PINJTK") this.akunTtp = line.flag;
				}
			}
			this.nMat = 0;
			this.nProv = 0;
			this.nAsur = 0;
			this.nKomp = 0;
			this.nTitip = 0;
			
			var prd = this.dbLib.getDataProvider("select distinct periode from spb_m where modul = 'KP.SPB' and jenis = 'PINJ' and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cbbPerLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cbbPerLama.setText(this.app._periode);
		}catch(e){
			systemAPI.alert("[app_kopeg_pinjaman_transaksi_fSpbPinjk]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjaman_transaksi_fSpbPinjk.extend(window.portalui_childForm);
window.app_kopeg_pinjaman_transaksi_fSpbPinjk.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		else if (sender == this.app._mainForm.bSimpan){
            if (this.dTgl2.getThnBln() < this.ePeriode.getText()){
              system.alert(this,"Periode Jatuh tempo harus sama atau lebih besar dari periode input.","");  
              return;
            } 
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		}else if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		else if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{				
			if (parseFloat(this.perLama) < parseFloat(this.app._periode)) this.eSPB.setTag(0);
			else this.eSPB.setTag(9);		
			if (this.nAsur != 0) this.cbbAP.setTag(2); else this.cbbAP.setTag(9); 
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						this.eSPB.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',this.app._lokasi+"-SPB"+this.ePeriode.getText().substr(2,4)+".",'0000'));
						sql.add(" update spb_m set no_link='"+this.eSPB.getText()+"',no_del = concat(no_spb,'r') where no_spb ='"+this.cbbNbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");						
						sql.add(" insert into spb_m (no_spb,no_dokumen,tanggal,due_date,akun_hutang,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,modul,jenis,nilai,nilai_ppn,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input) "+
							    " select concat(no_spb,'r'),no_dokumen,'"+this.dTgl.getDateString()+"',due_date,akun_hutang,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,modul,jenis,nilai,nilai_ppn,nilai_pot,'F','1','"+this.ePeriode.getText()+"',no_spb,'-','"+this.app._userLog+"',now() "+
								" from spb_m where no_spb = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");												
						sql.add(" insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_spb,'r'),no_dokumen,'"+this.dTgl.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.ePeriode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from spb_j where no_spb = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						
						sql.add(" update kop_pinj_m a,kop_pinj_spb b set progress ='0',akun_piutang='-',akun_pjasa='-' "+
						        " where a.no_pinj = b.no_pinj and a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi and b.no_spb='"+this.cbbNbLama.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" update kop_pinj_m a,kop_pinj_komp b set a.status_aktif='K' "+
						        " where a.no_pinj=b.no_pinjkomp and a.no_kontrak=b.no_kontkomp and a.kode_lokasi=b.kode_lokasi and a.status_aktif='L' and b.no_spb='"+this.cbbNbLama.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'");
						this.nb = this.eSPB.getText();
					}
					else{
						sql.add(" delete from spb_m where no_spb='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" delete from spb_j where no_spb='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" update kop_pinj_m a,kop_pinj_spb b set progress ='0',akun_piutang='-',akun_pjasa='-' "+
						        " where a.no_pinj = b.no_pinj and a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi and b.no_spb='"+this.cbbNbLama.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" update kop_pinj_m a,kop_pinj_komp b set a.status_aktif='K' "+
						        " where a.no_pinj=b.no_pinjkomp and a.no_kontrak=b.no_kontkomp and a.kode_lokasi=b.kode_lokasi and a.status_aktif='L' and b.no_spb='"+this.cbbNbLama.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ");
						sql.add(" delete from kop_pinj_spb where no_spb='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" delete from kop_pinj_komp where no_spb='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						this.nb = this.cbbNbLama.getText();
					}
					sql.add("insert into spb_m (no_spb,no_dokumen,tanggal,due_date,akun_hutang,"+
							"keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,"+
							"modul,jenis,nilai,nilai_ppn,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input)  values "+
							"('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"','"+this.dTgl2.getDateString()+
							"','"+this.akunAP+"','"+this.eKet.getText()+"','-','IDR',1,'"+this.cbbPemohon.getText()+"','-','"+this.cbbLoker.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+
							"','KP.SPB','PINJ',"+parseNilai(this.eNilaiSpb.getText())+",0,"+parseNilai(this.ePot.getText())+",'F','0','"+this.ePeriode.getText()+"','-','-','"+this.app._userLog+"',now())");
					var idx = 0;
					var d="insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					idx++;
					d+="('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.cbbAR.getText()+"','"+this.eKet.getText()+"','D',"+parseNilai(this.eNilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','AR','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					d+=",";
					
					if(this.nMat != 0) {
						idx++;
						d+="('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunMat+"','"+this.eKet.getText()+"','C',"+this.nMat+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','MAT','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						d+=",";
					}
					if(this.nProv != 0) {
						idx++;
						d+="('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunProv+"','"+this.eKet.getText()+"','C',"+this.nProv+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','PROV','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						d+=",";
					}
					if(this.nAsur != 0) {
						idx++;
						d+="('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.cbbAP.getText()+"','"+this.eKet.getText()+"','C',"+this.nAsur+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','ASUR','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						d+=",";
					}
					if(this.nKomp != 0) {
						idx++;
						d+="('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunIM+"','"+this.eKet.getText()+"','C',"+this.nKomp+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','KOMP','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						d+=",";
					}
					if (this.nTitip != 0) {
						idx++;
						d+="('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunTtp+"','"+this.eKet.getText()+"','C',"+this.nTitip+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','TTP','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						d+=",";
					}
					idx++;
					d+="('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunAP+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eNilaiSpb.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','AP','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";					
					sql.add(d);
					
					var noPinjA = [];
					var noPinjN = [];
					var d="insert into kop_pinj_spb(no_spb,kode_lokasi,no_pinj,status,no_kontrak,ntitip,no_spbtitip) values ";
					var z = 0;
					for (var i=0; i <= this.sg1.getRowCount(); i++){
						if ((this.sg1.cells(0,i) == "APP") || (this.sg1.cells(0,i) == "NOAPP")) {
							if (z >0) d+=",";
							d+="('"+this.nb+"','"+this.app._lokasi+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"',"+parseNilai(this.sg1.cells(10,i))+",'-')";
							z++;
							if ((this.sg1.cells(0,i) == "APP") && (this.sg1.cells(9,i) != "0")) {
								sql.add("insert into kop_pinj_komp (no_spb,no_pinj,no_kontrak,kode_lokasi,no_pinjkomp,no_kontkomp) "+
								       "        select '"+this.nb+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(2,i)+"','"+this.app._lokasi+"', no_pinj,no_kontrak "+
									   "        from kop_pinj_m where status_aktif='K' and kode_agg='"+this.sg1.cells(3,i)+"'");
							}
						}
						if (this.sg1.cells(0,i) == "APP") noPinjA.push("'"+this.sg1.cells(1,i)+"'");
						else if (this.sg1.cells(0,i) == "NOAPP") noPinjN.push("'"+this.sg1.cells(1,i)+"'"); 
					}
					sql.add(d);
					if (noPinjA.length != 0) sql.add("update kop_pinj_m set progress ='1',akun_piutang='"+this.cbbAR.getText()+"',akun_pjasa='"+this.akunPjasa+"' where no_pinj in ("+noPinjA+") and kode_lokasi = '"+this.app._lokasi+"'");
					if (noPinjN.length != 0) sql.add("update kop_pinj_m set progress ='X' where no_pinj in ("+noPinjN+") and kode_lokasi = '"+this.app._lokasi+"'");
					if (this.nKomp != 0) {
						sql.add("update kop_pinj_m a,kop_pinj_komp b set a.status_aktif = 'L' "+
						        "where a.no_pinj=b.no_pinjkomp and a.no_kontrak=b.no_kontkomp and a.kode_lokasi=b.kode_lokasi and a.status_aktif='K' and b.no_spb='"+this.nb+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.eSPB);		
					this.sg1.clear(1);
				}
				break;
			case "ubah" :	
				this.sg1.validasi();
				if ((this.posted == "T") && (parseFloat(this.periodeLama) >= parseFloat(this.app._periode))){
					system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
					return false;
				}
				if ((new Date()).strToDate(this.dTgl.getDate())  > (new Date()).strToDate(this.dTgl2.getDate())){
					system.alert(this,"Tanggal tidak valid."," Tanggal SPB melebihi Tgl Jatuh Temponya.");
					return false;
				}
				if (nilaiToFloat(this.eNilaiSpb.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai approve tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.periodeLama) > parseFloat(this.ePeriode.getText())){
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
				try{	
					uses("server_util_arrayList");
					sql = new server_util_arrayList();	
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add(" update spb_m set no_del = concat(no_spb,'r') where no_spb ='"+this.cbbNbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");						
						sql.add(" insert into spb_m (no_spb,no_dokumen,tanggal,due_date,akun_hutang,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,modul,jenis,nilai,nilai_ppn,nilai_pot,posted,progress,periode,no_del,no_link,nik_user,tgl_input) "+
							    " select concat(no_spb,'r'),no_dokumen,'"+this.dTgl.getDateString()+"',due_date,akun_hutang,keterangan,catatan,kode_curr,kurs,nik_buat,nik_setuju,kode_terima,kode_lokasi,kode_pp,modul,jenis,nilai,nilai_ppn,nilai_pot,'F','1','"+this.ePeriode.getText()+"',no_spb,'-','"+this.app._userLog+"',now() "+
								" from spb_m where no_spb = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");												
						sql.add(" insert into spb_j (no_spb,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_spb,'r'),no_dokumen,'"+this.dTgl.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.ePeriode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from spb_j where no_spb = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						
						sql.add(" update kop_pinj_m a,kop_pinj_spb b set progress ='0',akun_piutang='-',akun_pjasa='-' "+
						        " where a.no_pinj = b.no_pinj and a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi and b.no_spb='"+this.cbbNbLama.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" update kop_pinj_m a,kop_pinj_komp b set a.status_aktif='K' "+
						        " where a.no_pinj=b.no_pinjkomp and a.no_kontrak=b.no_kontkomp and a.kode_lokasi=b.kode_lokasi and a.status_aktif='L' and b.no_spb='"+this.cbbNbLama.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'");
					}
					else{
						sql.add(" delete from spb_m where no_spb='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" delete from spb_j where no_spb='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" update kop_pinj_m a,kop_pinj_spb b set progress ='0',akun_piutang='-',akun_pjasa='-' "+
						        " where a.no_pinj = b.no_pinj and a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi and b.no_spb='"+this.cbbNbLama.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" update kop_pinj_m a,kop_pinj_komp b set a.status_aktif='K' "+
						        " where a.no_pinj=b.no_pinjkomp and a.no_kontrak=b.no_kontkomp and a.kode_lokasi=b.kode_lokasi and a.status_aktif='L' and b.no_spb='"+this.cbbNbLama.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' ");
						sql.add(" delete from kop_pinj_spb where no_spb='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add(" delete from kop_pinj_komp where no_spb='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}		
					this.dbLib.execArraySQL(sql);	
				} catch(e){
					alert(e)
				}
				break;
		}
	},
	doSelectDate: function(sender, y, m, d){
       this.ePeriode.setText(sender.getThnBln());
    },
	doClick: function(sender){
		if (sender == this.bGen){
			this.eSPB.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'spb_m','no_spb',this.app._lokasi+"-SPB"+this.ePeriode.getText().substr(2,4)+".",'0000'));
			this.eDok.setFocus();
		}else{  
			var status = "INPROG";
			if (sender == this.bApp) status = "APP";
			else if (sender == this.bNApp) status = "NOAPP";
			for (var i=0; i < this.sg1.rows.getLength();i++){
				this.sg1.cells(0,i,status);
			}          
        }
	},
	doLoadData: function(sender){
	try{			
			if (this.cbbNbLama.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_pinj,a.no_kontrak,b.kode_agg,b.nama as nama_agg,date_format(a.tanggal,'%d/%m/%Y')as tanggal,a.keterangan,a.nilai,(a.nilai_mat+a.nilai_prov+a.nilai_asur) as tot_beban, ifnull(c.nilai,0) as nilai_komp, "+
					                                  "       a.nilai - (a.nilai_mat+a.nilai_prov+a.nilai_asur+ifnull(aa.ntitip,0)+ifnull(c.nilai,0)) as nilai_salur,a.nilai_mat,a.nilai_prov,a.nilai_asur, "+
													  "       aa.status,aa.ntitip,ab.tanggal as tgl_spb,ab.due_date,ab.posted,ab.periode,ab.no_dokumen,ab.keterangan,ac.kode_loker,ac.nama as nama_loker,ab.nik_buat,ad.nama as nama_buat,xx.akun_ar,xx.nama_ar,ifnull(ae.akun_asur,'') as akun_asur,ifnull(ae.nama_asur,'') as nama_asur "+
					                                  "from   kop_pinj_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi = b.kode_lokasi "+
													  "       inner join kop_pinj_spb aa on a.no_pinj=aa.no_pinj and a.no_kontrak=aa.no_kontrak and a.kode_lokasi=aa.kode_lokasi "+
													  "       inner join spb_m ab on aa.no_spb=ab.no_spb and aa.kode_lokasi = ab.kode_lokasi "+
													  "       inner join kop_loker ac on ab.kode_terima=ac.kode_loker and ab.kode_lokasi = ac.kode_lokasi "+
													  "       inner join karyawan ad on ab.nik_buat=ad.nik and ab.kode_lokasi = ad.kode_lokasi "+
													  "       inner join (select x.no_spb,x.kode_lokasi,y.kode_akun as akun_ar,y.nama as nama_ar "+
													  "                   from spb_j x inner join masakun y on x.kode_akun = y.kode_akun and x.kode_lokasi=y.kode_lokasi "+
													  "                   where x.jenis='AR') xx on ab.no_spb=xx.no_spb and ab.kode_lokasi=xx.kode_lokasi "+
													  "       left outer join (select x.no_spb,x.kode_lokasi,y.kode_akun as akun_asur,y.nama as nama_asur "+
													  "                        from spb_j x inner join masakun y on x.kode_akun = y.kode_akun and x.kode_lokasi=y.kode_lokasi "+
													  "                        where x.jenis='ASUR') ae on ab.no_spb=ae.no_spb and ab.kode_lokasi=ae.kode_lokasi "+
													  "       left outer join                                                         "+
					                                  "               (select z.kode_lokasi,z.kode_agg,sum(distinct x.nilai) as nilai "+
					                                  "                from kop_pinjangs_m x inner join kop_pinjangs_d y on x.no_angs=y.no_angs and x.kode_lokasi=y.kode_lokasi "+
					                                  "                                      inner join kop_pinj_m z on y.no_kontrak=z.no_kontrak and y.no_pinj=z.no_pinj and y.kode_lokasi=z.kode_lokasi "+
													  "                                      inner join kop_pinj_komp zz on zz.no_pinjkomp=z.no_pinj and zz.no_kontkomp=z.no_kontrak and zz.kode_lokasi=z.kode_lokasi "+
					                                  "                where z.status_aktif='L' and x.jenis='PINJKOMP' and x.no_del='-' and zz.no_spb='"+this.cbbNbLama.getText()+"'  and zz.kode_lokasi='"+this.app._lokasi+"' "+
					                                  "                group by z.kode_agg  )c on c.kode_agg=a.kode_agg and c.kode_lokasi=a.kode_lokasi "+
													  "where aa.no_spbtitip = '-' and aa.no_spb='"+this.cbbNbLama.getText()+"' and aa.kode_lokasi ='"+this.app._lokasi+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.status,line.no_pinj,line.no_kontrak,line.kode_agg,line.nama_agg,line.tanggal,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.tot_beban),floatToNilai(line.nilai_komp),floatToNilai(line.ntitip),floatToNilai(line.nilai_salur),floatToNilai(line.nilai_mat),floatToNilai(line.nilai_prov),floatToNilai(line.nilai_asur)]);
					}
					this.sg1.validasi();
										
					this.eDok.setText(line.no_dokumen);
					this.eKet.setText(line.keterangan);
					this.dTgl.setText(line.tgl_spb);
					this.ePeriode.setText(line.periode);
					this.dTgl2.setText(line.due_date);
					this.cbbLoker.setText(line.kode_loker, line.nama_loker);
					this.cbbPemohon.setText(line.nik_buat, line.nama_buat);
					this.cbbAR.setText(line.akun_ar, line.nama_ar);
					this.cbbAP.setText(line.akun_asur, line.nama_asur);
					this.perLama = line.periode;
					this.posted = line.posted;
				}
			}
			else {
				system.alert(this,"No SPB Lama tidak valid.","No SPB Lama harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}, 
	FindBtnClick: function(sender){
		if (sender == this.cbbNbLama) {   
			this.standarLib.showListData(this, "Daftar Bukti SPB",sender,undefined, 
										  "select no_spb, keterangan  from spb_m where modul = 'KP.SPB' and jenis = 'PINJ' and progress= '0' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cbbPerLama.getText()+"' and no_del='-'", 
										  "select count(no_spb)       from spb_m where modul = 'KP.SPB' and jenis = 'PINJ' and progress= '0' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cbbPerLama.getText()+"' and no_del='-'",
										  ["no_spb","keterangan"],"and",["No SPB","Deskripsi"],false);				
			this.standarLib.clearByTag(this, new Array("1"),undefined);		
			this.sg1.clear(1);
		}
		if (sender == this.cbbPemohon){
			this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
		if (sender == this.cbbAR){
			this.standarLib.showListData(this, "Daftar Akun Piutang",sender,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag = '003'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag = '003'",
										  ["kode_akun","nama"],"and",["Kode Akun","Nama"],false);
		}
		if (sender == this.cbbAP){
			this.standarLib.showListData(this, "Daftar Akun Hutang Asuransi",sender,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag = '024'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag = '024'",
										  ["kode_akun","nama"],"and",["Kode Akun","Nama"],false);
		}
	},
	doChangeCell: function(sender, col, row){
		if ((col == 0 || col==10) && (this.sg1.getCell(0,row) != "")){			
			if (this.sg1.cells(7,row)!="" && this.sg1.cells(8,row)!="" && this.sg1.cells(9,row)!="" && this.sg1.cells(10,row)!="") {
				var a = nilaiToFloat(this.sg1.cells(7,row)) - nilaiToFloat(this.sg1.cells(8,row)) - nilaiToFloat(this.sg1.cells(9,row)) - nilaiToFloat(this.sg1.cells(10,row));
				this.sg1.setCell(11,row,floatToNilai(a));
			}
			this.sg1.validasi();
		}
	},
	doSgChange: function(sender, col, row){
		var b = tot1 = tot2 = tot3 = 0;			
		this.nMat = 0;
		this.nProv = 0;
		this.nAsur = 0;
		this.nKomp = 0;
		this.nTitip = 0;
		for (var i = 0;i < this.sg1.getRowCount();i++){
			if ((this.sg1.cells(0,i) == "APP") && (this.sg1.cells(10,i) != "") && (this.sg1.cells(7,i) != "") && (this.sg1.cells(8,i) != "") && (this.sg1.cells(9,i) != "") &&
				(this.sg1.cells(11,i) != "") &&(this.sg1.cells(12,i) != "") && (this.sg1.cells(13,i) != "") && (this.sg1.cells(14,i) != "")) {
				
				b = nilaiToFloat(this.sg1.cells(7,i)) - nilaiToFloat(this.sg1.cells(8,i)) - nilaiToFloat(this.sg1.cells(9,i)) - nilaiToFloat(this.sg1.cells(10,i));
				this.sg1.setCell(11,i,floatToNilai(b));
				
				tot1 += nilaiToFloat(this.sg1.cells(11,i));
				tot2 += nilaiToFloat(this.sg1.cells(7,i));
				tot3 += nilaiToFloat(this.sg1.cells(8,i)) + nilaiToFloat(this.sg1.cells(9,i)) + nilaiToFloat(this.sg1.cells(10,i));
				
				this.nMat += nilaiToFloat(this.sg1.cells(12,i));
				this.nProv += nilaiToFloat(this.sg1.cells(13,i));
				this.nAsur += nilaiToFloat(this.sg1.cells(14,i));
				this.nKomp += nilaiToFloat(this.sg1.cells(9,i));
				this.nTitip += nilaiToFloat(this.sg1.cells(10,i));
			}
		}
		this.eNilaiSpb.setText(floatToNilai(tot1));
		this.eNilai.setText(floatToNilai(tot2));
		this.ePot.setText(floatToNilai(tot3));
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
