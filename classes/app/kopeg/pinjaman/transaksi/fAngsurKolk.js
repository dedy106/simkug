window.app_kopeg_pinjaman_transaksi_fAngsurKolk = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjaman_transaksi_fAngsurKolk.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjaman_transaksi_fAngsurKolk";						
			owner.childFormConfig(this, "mainButtonClick","Form Angsuran Kolektif : Koreksi", 0);			
			this.maximize();
			//------------------------ login data ------------------------	
			uses("portalui_saiCBB;portalui_datePicker;portalui_radioButton");
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,20,200,20],caption:"Periode",readOnly:true,tag:2});
			this.lTgl = new portalui_label(this,{bound:[20,21,100,18],caption:"Tanggal",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,21,100,18],selectDate:[this,"doSelectDate"]});
			this.cbbPerLama = new portalui_saiCB(this,{bound:[720,21,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
			this.eBukti = new portalui_saiLabelEdit(this,{bound:[20,23,290,20],caption:"No Angsuran",readOnly:true});
			this.bGen = new portalui_button(this,{bound:[320,23,80,18],caption:"Generate", click:[this,"doClick"]});			
			this.cbbNbLama = new portalui_saiCBB(this,{bound:[720,23,200,20],caption:"No Angs Lama",readOnly:true, btnClick:[this,"FindBtnClick"], btnRefreshClick:[this,"doLoadData"]});
			this.eDok = new portalui_saiLabelEdit(this,{bound:[20,25,290,20],caption:"No Dokumen"});
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,26,500,20],caption:"Keterangan"});
			this.cbbPenerima = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"Penerima", btnClick:[this,"FindBtnClick"], readOnly:true,tag:2});
			this.cbbLoker = new portalui_saiCBB(this,{bound:[20,28,200,20],caption:"Loker",readOnly:true});
			this.eTagihan = new portalui_saiLabelEdit(this,{bound:[20,29,200,20],caption:"Total Tagihan", tipeText:ttNilai, text:"0" ,readOnly : true});
			this.eAngs = new portalui_saiLabelEdit(this, {bound:[20,30,200,20],caption:"Nilai Angsuran",tipeText:ttNilai, text:"0",change:[this,"doChange"]});
			this.cbbSpb = new portalui_saiCBB(this,{bound:[720,30,200,20],caption:"No SPB/TAK", btnClick:[this,"FindBtnClick"], tag:9,btnRefreshClick:[this,"doLoadDataSPB"]});
			this.eFee = new portalui_saiLabelEdit(this, {bound:[20,31,130,20],caption:"% Fee Collection",tipeText:ttNilai, text:"0",change:[this,"doChange"]});
			this.eFeeNilai = new portalui_saiLabelEdit(this,{bound:[150,31,70,20],labelWidth:0,tipeText:ttNilai, text:"0"});			
			this.eTotPokok = new portalui_saiLabelEdit(this,{bound:[720,31,200,20],caption:"Total Pokok",tipeText:ttNilai, readOnly:true, text:"0"});
			this.eSls = new portalui_saiLabelEdit(this,{bound:[20,32,200,20],caption:"Sls Angsuran",tipeText:ttNilai, readOnly:true, text:"0"});
            this.eTotJasa = new portalui_saiLabelEdit(this,{bound:[720,32,200,20],caption:"Total Jasa",tipeText:ttNilai, readOnly:true, text:"0"});
			
            this.p1 = new portalui_panel(this,{bound:[20,35,900,240],caption:"Daftar Cicilan yang telah diakru per Loker"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,215],colCount:12,
			    colTitle:["No Kontrak","Kode Agg","Nasabah","Cicilan Ke","Tgl Angs","Nilai Pokok","Nilai Jasa","Nilai Tagihan","Nilai Angsur","AR Pokok","AR Jasa","No Pinj"],
                colWidth:[[0,1,2,3,4,5,6,7,8,9,10,11],[130,0,200,60,60,100,100,100,100,0,0,0]],
				colFormat:[[5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai]],
                columnReadOnly:[true,[0,1,2,3,4,5,6,7,9,10,11],[8]], colHide:[[1,9,10,11],true],defaultRow:1,
				change:[this,"doChangeCell"],nilaiChange:[this,"doSgChange"]});
			
			this.p2 = new portalui_panel(this,{bound:[20,36,900,240],caption:"Data SPB/TAK Potongan Gaji"});
			this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,190],colCount:10,tag:9,
						colTitle:["Status","Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
						colWidth:[[0,1,2,3,4,5,6,7,8,9],[60,80,100,200,50,100,60,100,60,100]],colFormat:[[5],[cfNilai]],
						buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
						columnReadOnly:[true,[1,2,3,4,5,6,7,8,9],[0]],nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCell2"],autoAppend:true,defaultRow:1});
			this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[0,215,900,25],buttonStyle:2,grid:this.sg2});		
			
			this.rearrangeChild(10,22);
			setTipeButton(tbUbahHapus);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.setTabChildIndex();			
			this.dataAngsuran = [];
			this.ePeriode.setText(this.dTgl.getThnBln());
						
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('PINJIM','PINJOI','PINJOE','PINJNE','PINJFE') and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PINJIM") this.akunIM2 = line.flag;
					if (line.kode_spro == "PINJOI") this.akunOI = line.flag;
					if (line.kode_spro == "PINJOE") this.akunOE = line.flag;
					if (line.kode_spro == "PINJFE") this.akunBF = line.flag;
					if (line.kode_spro == "PINJNE") this.nilaiOE = parseFloat(line.value1);
				}
			}
			var sql = new server_util_arrayList();
			sql.add("select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"' and block = '0'");
			this.dbLib.getMultiDataProviderA(sql);
			var prd = this.dbLib.getDataProvider("select distinct periode from kop_pinjangs_m where jenis = 'PINJKOL' and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof prd == "object"){
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cbbPerLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cbbPerLama.setText(this.app._periode);
		}catch(e){
			systemAPI.alert("[app_kopeg_pinjaman_transaksi_fAngsurKolk]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjaman_transaksi_fAngsurKolk.extend(window.portalui_childForm);
window.app_kopeg_pinjaman_transaksi_fAngsurKolk.implement({
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
			if (this.cbbSpb.getText() == "" || this.cbbSpb.getText() == "-") {this.sg2.setTag(9); var vProg = "0"; var noSPB = "-";}
			else {this.sg2.setTag(1); var vProg = "1"; var noSPB = this.cbbSpb.getText();}
			if (parseFloat(this.perLama) < parseFloat(this.app._periode)) this.eBukti.setTag(0);
			else this.eBukti.setTag(9);		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjangs_m","no_angs",this.app._lokasi+"-PA"+this.ePeriode.getText().substr(2,4)+".","0000"));
						sql.add(" update kop_pinjangs_m set no_link='"+this.eBukti.getText()+"',no_del = concat(no_angs,'r') where no_angs ='"+this.cbbNbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_pinjangs_m (no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_depo,nilai_udp,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,p_fee,nilai_fee,no_spb) "+
							    " select concat(no_angs,'r'),no_dokumen,keterangan,'"+this.dTgl.getDateString()+"',nilai,nilai_depo,nilai_udp,nilai_sls,jenis,'X',akun_ar,'"+this.ePeriode.getText()+"',kode_lokasi,'F',kurs,kode_curr,kode_pp,no_angs,'-','"+this.cbbPenerima.getText()+"','"+this.app._useLog+"',now(),p_fee,nilai_fee,no_spb "+
								" from kop_pinjangs_m where no_angs = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_pinjangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_angs,'r'),no_dokumen,'"+this.dTgl.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.ePeriode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_pinjangs_j where no_angs = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("insert into kop_pinjangs_d (no_angs,no_pinj,no_kontrak,tanggal,akun_ar,npokok,nbunga,kode_lokasi,dc)"+
								" select concat(no_angs,'r'),no_pinj,no_kontrak,tanggal,akun_ar,npokok,nbunga,kode_lokasi,'C' "+ 
								" from kop_pinjangs_d where no_angs = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						this.nb = this.eBukti.getText();
					}
					else{
						sql.add("delete from kop_pinjangs_m where no_angs='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pinjangs_j where no_angs='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pinjangs_d where no_angs ='"+this.cbbNbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
						this.nb = this.cbbNbLama.getText();
					}
					var nPiuIM =  nilaiToFloat(this.eAngs.getText()) - nilaiToFloat(this.eFeeNilai.getText());
					sql.add("insert into kop_pinjangs_m(no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_depo,nilai_udp,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,p_fee,nilai_fee,no_spb) values  "+
							"('"+this.nb+"','"+this.eDok.getText()+"','"+this.eKet.getText()+"','"+this.dTgl.getDateString()+"',"+nPiuIM+",0,0,"+parseNilai(this.eSls.getText())+",'PINJKOL','0','"+this.akunIM+"','"+this.ePeriode.getText()+"','"+this.app._lokasi+"','F',1,'IDR','"+this.app._kodePP+"','-','-','"+this.cbbPenerima.getText()+"','"+this.app._userLog+"',now(),"+parseNilai(this.eFee.getText())+","+parseNilai(this.eFeeNilai.getText())+",'"+noSPB+"')");
					var z = 0;
					var vPokok = vJasa = 0;
					var d="insert into kop_pinjangs_d (no_angs,no_pinj,no_kontrak,tanggal,akun_ar,npokok,nbunga,kode_lokasi,dc) values ";
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(8,i) != "0"){
							if (z > 0) d+= ",";
							if (nilaiToFloat(this.sg1.cells(8,i)) >= nilaiToFloat(this.sg1.cells(6,i))) {
								vJasa = nilaiToFloat(this.sg1.cells(6,i));
								vPokok = nilaiToFloat(this.sg1.cells(8,i)) - vJasa;
							}
							else {
								vJasa = nilaiToFloat(this.sg1.cells(8,i));
								vPokok = 0;
							}
							d += "('"+this.nb+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(0,i)+"','"+this.dTgl.getDateString()+"','"+this.akunIM+"',"+vPokok+","+vJasa+",'"+this.app._lokasi+"','D')";
							z++;
						}
					}
					sql.add(d);	
					var idx=0;
					var d="insert into kop_pinjangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";		
					d += "('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunIM+"','"+this.eKet.getText()+"','D',"+nPiuIM+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','AR','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					if (nilaiToFloat(this.eFeeNilai.getText()) != 0) {
						d+= ",";
						idx++;
						d += "('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunBF+"','"+this.eKet.getText()+"','D',"+parseNilai(this.eFeeNilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','BYFEE','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}
					if (nilaiToFloat(this.eSls.getText()) < 0) {
						d+= ",";
						idx++;
						var vSls = nilaiToFloat(this.eSls.getText()) * -1;
						d += "('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunOE+"','"+this.eKet.getText()+"','D',"+vSls+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','SLS_ANGS','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					} else {
						if (nilaiToFloat(this.eSls.getText()) > 0) {
						d+= ",";
						idx++;
						var vSls = nilaiToFloat(this.eSls.getText());
						d += "('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunOI+"','"+this.eKet.getText()+"','C',"+vSls+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','SLS_ANGS','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						}
					}
					this.createJurnal();
					var line = undefined;
					idx++;
					for (var i in this.gridJurnal.objList){
						d+= ",";
						line = this.gridJurnal.get(i);
						d+= "('"+this.nb+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+line.get("kode_akun")+"','"+this.eKet.getText()+"','C',"+parseFloat(line.get("nilai"))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','"+line.get("kode_drk")+"','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						idx++;
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
				}
				break;
			case "ubah" :	
				this.akunIM = this.akunIM2;
				if (this.cbbSpb.getText()!="" && this.cbbSpb.getText() != "-" ) {
					var temu = 0;
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.cells(0,i) == "APP"){
							temu++;
							this.akunIM = this.sg2.cells(1,i); // <-- akun IM diganti dgn akun SPBnya
						}
					}
					if (temu == 0 || temu > 1) {
						system.alert(this,"SPB/TAK tidak valid.","Pilihan status APP harus satu baris saja.");
						return false;
					}
				}
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				if ((nilaiToFloat(this.eSls.getText()) < 0) && (Math.abs(nilaiToFloat(this.eSls.getText())) > this.nilaiOE)){
					system.alert(this,"Transaksi tidak valid.","Selisih kurang angsuran tidak boleh kurang dari batas OE ["+floatToNilai(this.nilaiOE)+"].");
					return false;
				}
				var tot = nilaiToFloat(this.eAngs.getText());
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
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add(" update kop_pinjangs_m set no_del = concat(no_angs,'r') where no_angs ='"+this.cbbNbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_pinjangs_m (no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_depo,nilai_udp,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,p_fee,nilai_fee) "+
							    " select concat(no_angs,'r'),no_dokumen,keterangan,'"+this.dTgl.getDateString()+"',nilai,nilai_depo,nilai_udp,nilai_sls,jenis,'X',akun_ar,'"+this.ePeriode.getText()+"',kode_lokasi,'F',kurs,kode_curr,kode_pp,no_angs,'-','"+this.cbbPenerima.getText()+"','"+this.app._useLog+"',now(),p_fee,nilai_fee "+
								" from kop_pinjangs_m where no_angs = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_pinjangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_angs,'r'),no_dokumen,'"+this.dTgl.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.ePeriode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_pinjangs_j where no_angs = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("insert into kop_pinjangs_d (no_angs,no_pinj,no_kontrak,tanggal,akun_ar,npokok,nbunga,kode_lokasi,dc)"+
								" select concat(no_angs,'r'),no_pinj,no_kontrak,tanggal,akun_ar,npokok,nbunga,kode_lokasi,'C' "+ 
								" from kop_pinjangs_d where no_angs = '"+this.cbbNbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					}
					else{
						sql.add("delete from kop_pinjangs_m where no_angs='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pinjangs_j where no_angs='"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_pinjangs_d where no_angs ='"+this.cbbNbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
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
	doChange: function(sender){
		if (sender == this.eFee) {
			var nFee = Math.round(nilaiToFloat(this.eFee.getText()) / 100 * nilaiToFloat(this.eAngs.getText()));
			this.eFeeNilai.setText(floatToNilai(nFee));
		}
		if (sender == this.eAngs) {
			var sls = nilaiToFloat(this.eAngs.getText()) - (nilaiToFloat(this.eTotPokok.getText()) + nilaiToFloat(this.eTotJasa.getText()));
			this.eSls.setText(floatToNilai(sls));
			var nFee = Math.round(nilaiToFloat(this.eFee.getText()) / 100 * nilaiToFloat(this.eAngs.getText()));
			this.eFeeNilai.setText(floatToNilai(nFee));
		}
	},
	doClick: function(sender){
		if (sender == this.bGen){
			this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjangs_m","no_angs",this.app._lokasi+"-PA"+this.ePeriode.getText().substr(2,4)+".","0000"));
			this.eDok.setFocus();
		}
	},
	doLoadDataSPB: function(sender){
		if (this.cbbSpb.getText() != ""){
			if (this.cbbSpb.dataFromList[2].toUpperCase() == "SPB") {
				var data = this.dbLib.getDataProvider("select x.kode_akun,y.nama as nama_akun,x.keterangan as ket,x.dc,x.nilai-ifnull(c.totpakai,0) as sisa,x.kode_pp,ifnull(z.nama,'-') as nama_pp,x.kode_drk,ifnull(zz.nama,'-') as nama_drk "+
												  "from spb_j x "+
												  "             inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi "+
												  "             left outer join pp z on x.kode_pp=z.kode_pp and x.kode_lokasi=z.kode_lokasi "+
												  "             left outer join drk zz on x.kode_drk=zz.kode_drk and x.kode_lokasi=zz.kode_lokasi and zz.tahun=substring(x.periode,1,4) "+
												  "             left outer join (select no_gaji,kode_akun,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as totpakai "+
												  "                              from kop_gajispb_d where kode_lokasi='"+this.app._lokasi+"' group by no_gaji,kode_akun,kode_lokasi) c on c.kode_akun=x.kode_akun and c.no_gaji=x.no_spb and x.kode_lokasi=c.kode_lokasi "+
												  "where x.dc='C' and x.no_spb='"+this.cbbSpb.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'");
			}
			else {
				var data = this.dbLib.getDataProvider("select x.kode_akun,y.nama as nama_akun,x.keterangan as ket,x.dc,x.nilai as sisa,x.kode_pp,ifnull(z.nama,'-') as nama_pp,x.kode_drk,ifnull(zz.nama,'-') as nama_drk "+
												  "from ju_j x "+
												  "             inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi "+
												  "             left outer join pp z on x.kode_pp=z.kode_pp and x.kode_lokasi=z.kode_lokasi "+
												  "             left outer join drk zz on x.kode_drk=zz.kode_drk and x.kode_lokasi=zz.kode_lokasi and zz.tahun=substring(x.periode,1,4) "+
												  "where x.dc='C' and x.no_ju='"+this.cbbSpb.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'");
			}
			eval("data = "+data+";");				
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData(["INPROG",line.kode_akun,line.nama_akun,line.ket,line.dc.toUpperCase(),floatToNilai(line.sisa),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			}
			this.sg2.validasi();
		}
		else {
			system.alert(this,"SPB/TAK Gaji tidak valid.","No SPB/TAK harus dipilih.");
		}
	},
	doLoadData: function(sender){
		if (this.cbbNbLama.getText() != ""){
			var data = this.dbLib.getDataProvider("select b.no_kontrak,b.kode_agg,c.nama,a.cicilan_ke,date_format(ab.tanggal,'%d/%m/%Y') as tgl_angs,a.npokok,a.nbunga,(a.npokok+a.nbunga) as ntagih,b.akun_piutang,b.akun_pjasa,b.no_pinj, "+
			                                      "       e.akun_ar,e.no_spb,f.kode_loker,f.nama as nama_loker,e.tanggal as tgl_angs,e.posted,e.periode,e.no_dokumen,e.keterangan,e.nik_app,g.nama as nama_app,e.p_fee,e.nilai_fee,e.nilai_sls "+
												  "from kop_pinjbill_d a inner join kop_pinjbill_m ab on a.no_bill=ab.no_bill and a.kode_lokasi=ab.kode_lokasi "+
												  "                      inner join kop_pinj_m b on a.no_kontrak =b.no_kontrak and a.no_pinj=b.no_pinj and a.kode_lokasi=b.kode_lokasi "+
												  "                      inner join kop_agg c on b.kode_agg=c.kode_agg and b.kode_lokasi=c.kode_lokasi "+
												  "                      inner join kop_pinjangs_d d on a.no_kontrak=d.no_kontrak and a.no_pinj=d.no_pinj and a.kode_lokasi=d.kode_lokasi "+
												  "                      inner join kop_pinjangs_m e on d.no_angs=e.no_angs and e.kode_lokasi=d.kode_lokasi "+
												  "                      inner join kop_loker f on c.kode_loker=f.kode_loker and c.kode_lokasi=f.kode_lokasi "+
												  "                      inner join karyawan g on e.nik_app=g.nik and e.kode_lokasi=g.kode_lokasi "+
												  "                      left outer join (select no_kontrak,no_pinj,kode_lokasi,date_format(tanggal,'%Y%m') as per, sum(case dc when 'D' then npokok+nbunga else -(npokok+nbunga) end) as nangs "+
												  "                                     from kop_pinjangs_d where no_angs<>'"+this.cbbNbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_kontrak,no_pinj,kode_lokasi,date_format(tanggal,'%Y%m')) aa "+
												  "                                     on aa.no_kontrak=a.no_kontrak and aa.no_pinj=a.no_pinj and aa.kode_lokasi=a.kode_lokasi and date_format(ab.tanggal,'%Y%m') = aa.per "+
												  "where ab.no_del='-' and e.no_angs='"+this.cbbNbLama.getText()+"' and e.kode_lokasi='"+this.app._lokasi+"' and date_format(ab.tanggal,'%Y%m')=date_format(e.tanggal,'%Y%m') "+
												  "order by c.kode_agg,b.no_kontrak,a.cicilan_ke");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];				
					this.sg1.appendData([line.no_kontrak,line.kode_agg,line.nama,line.cicilan_ke,line.tgl_angs,floatToNilai(line.npokok),floatToNilai(line.nbunga),floatToNilai(line.ntagih),floatToNilai(line.ntagih),line.akun_piutang,line.akun_pjasa,line.no_pinj]);
				}
				this.sg1.validasi();
				
				this.posted = line.posted;
				this.perLama = line.periode;
				
				this.eDok.setText(line.no_dokumen);
				this.eKet.setText(line.keterangan);
				this.cbbPenerima.setText(line.nik_app,line.nama_app);
				this.cbbLoker.setText(line.kode_loker);
				this.dTgl.setText(line.tgl_angs);
				this.e_periode.setText(line.periode);
				if (line.no_spb != "-") this.cbbSpb.setText(line.no_spb);
				else this.cbbSpb.setText("");
				this.akunIM = line.akun_ar;	
				this.eFee.onChange.set(undefined,undefined);
				this.eAngs.onChange.set(undefined,undefined);
				this.eAngs.setText(floatToNilai(parseFloat(line.nilai) + parseFloat(line.nilai_fee)));
				this.eFee.setText(floatToNilai(parseFloat(line.p_fee)));
				this.eFeeNilai.setText(floatToNilai(parseFloat(line.nilai_fee)));
				this.eSls.setText(floatToNilai(parseFloat(line.nilai_sls)));
				this.eFee.onChange.set(this,"doChange");
				this.eAngs.onChange.set(this,"doChange");
			}
			var data = this.dbLib.getDataProvider("select g.no_urut,g.kode_akun,h.nama as nama_akun,g.keterangan,g.dc,g.nilai "+
												  "from kop_pinjangs_j g inner join masakun h on g.kode_akun=h.kode_akun and g.kode_lokasi=h.kode_lokasi "+
												  "where g.modul='PINJ' and g.jenis='ADD' and "+
												  "      g.no_angs = '"+this.cbbNbLama.getText()+"' and g.kode_lokasi='"+this.app._lokasi+"' order by g.no_urut");
			eval("data = "+data+";");
			if (typeof data == "object"){
				if (data.rs.rows[0] !== undefined) {
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,line.keterangan,line.dc,floatToNilai(line.nilai)]);
					}
					this.sg2.validasi();
				}
			}			
		} else {
			system.alert(this,"No Angsuran Lama tidak valid.","No Angsuran Lama harus dipilih.");
		}
	},
	FindBtnClick: function(sender){
		if (sender == this.cbbSpb) {   
			this.standarLib.showListData(this, "Daftar Bukti SPB/TAK",sender,undefined, 
										  "select  * from (select no_spb,keterangan,'SPB' as jenis from spb_m where kode_lokasi = '"+this.app._lokasi+"' "+
										  "union "+
										  "select no_ju as no_spb,keterangan,'TAK' as jenis from ju_m where kode_lokasi = '"+this.app._lokasi+"' and jenis='TAK' ) as A ", 
										  "select count(no_spb)     from (select no_spb, keterangan, 'SPB' as jenis from spb_m where kode_lokasi = '"+this.app._lokasi+"' "+
										  "union "+
										  "select no_ju as no_spb, keterangan, 'TAK' as jenis from ju_m where kode_lokasi = '"+this.app._lokasi+"' and jenis='TAK' ) as b ",
										  ["no_spb","keterangan","jenis"],"WHERE",["No SPB/TAK","Deskripsi","Jenis"],false);				
			this.sg2.clear(1);
		}
		if (sender == this.cbbNbLama) {   
			this.standarLib.showListData(this, "Daftar Bukti Angsuran",sender,undefined, 
										  "select no_angs, keterangan  from kop_pinjangs_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cbbPerLama.getText()+"' and no_del='-' and jenis='PINJKOL' and progress='0'", 
										  "select count(no_angs)       from kop_pinjangs_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cbbPerLama.getText()+"' and no_del='-' and jenis='PINJKOL' and progress='0'",
										  ["no_angs","keterangan"],"and",["No Angsur","Deskripsi"],false);				
			this.standarLib.clearByTag(this, new Array("1"),undefined);		
			this.sg1.clear(1);
		}
		if (sender == this.cbbPenerima){
			this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = tot2 = tot3 = tot4 = 0;			
		for (var i = 0;i < this.sg1.getRowCount();i++){
			if ((this.sg1.cells(5,i) != "") && (this.sg1.cells(6,i) != "") && (this.sg1.cells(7,i) != "") && (this.sg1.cells(8,i) != "")) {
				if (nilaiToFloat(this.sg1.cells(8,i)) > nilaiToFloat(this.sg1.cells(6,i))) {
					tot2 += nilaiToFloat(this.sg1.cells(6,i));
					tot1 += nilaiToFloat(this.sg1.cells(8,i)) - nilaiToFloat(this.sg1.cells(6,i));
				} else {
					tot2 += nilaiToFloat(this.sg1.cells(8,i));
					tot1 += 0;
				}
				tot3 += nilaiToFloat(this.sg1.cells(7,i));
				tot4 += nilaiToFloat(this.sg1.cells(8,i));
			}
		}
		this.eTotPokok.setText(floatToNilai(tot1));
		this.eTotJasa.setText(floatToNilai(tot2));
		
		this.eTagihan.setText(floatToNilai(tot3));
		this.eAngs.setText(floatToNilai(tot4));
	},
	doChangeCell: function(sender, col, row){		
		if (col == 8) {
			this.sg1.validasi();
		}
	},
	createJurnal : function() {
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var nreal,ix,dtJrnl = 0;
		for (var i=0; i < this.sg1.rows.getLength(); i++){
			kdAkun = this.sg1.getCell(10,i);
			kdDRK = 'ARJS';
			if (nilaiToFloat(this.sg1.getCell(8,i)) > nilaiToFloat(this.sg1.getCell(6,i))) {
				nreal = nilaiToFloat(this.sg1.getCell(6,i));
			} else nreal = nilaiToFloat(this.sg1.getCell(8,i));
			nemu = false;
			ix = 0;
			for (var j in dtJurnal.objList){		
			  if (kdAkun == dtJurnal.get(j).get("kode_akun") && kdDRK == dtJurnal.get(j).get("kode_drk")) {
				nemu = true;
				row = dtJurnal.get(j);
				ix = j;
				break;
			  }
			}
			if (!nemu){
				row = new portalui_arrayMap();
				row.set("kode_akun",kdAkun);
				row.set("kode_drk",kdDRK);
				row.set("nilai",nreal);
				dtJrnl++;
				dtJurnal.set(dtJrnl,row);						
			}else {
				dtJurnal.get(ix).set("nilai",row.get("nilai") + nreal);				
			}
		}
		for (var i=0; i < this.sg1.rows.getLength(); i++){
			nreal = nilaiToFloat(this.sg1.getCell(8,i)) - nilaiToFloat(this.sg1.getCell(6,i));
			if (nreal > 0) {
				kdAkun = this.sg1.getCell(9,i);
				kdDRK = 'ARPK';
				nemu = false;
				ix = 0;
				for (var j in dtJurnal.objList){		
				  if (kdAkun == dtJurnal.get(j).get("kode_akun") && kdDRK == dtJurnal.get(j).get("kode_drk")) {
					nemu = true;
					row = dtJurnal.get(j);
					ix = j;
					break;
				  }
				}
				if (!nemu){
					row = new portalui_arrayMap();
					row.set("kode_akun",kdAkun);
					row.set("kode_drk",kdDRK);
					row.set("nilai",nreal);
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else {
					dtJurnal.get(ix).set("nilai",row.get("nilai") + nreal);				
				}
			}
		}
		if (dtJurnal.getLength() > 0){
			var desc1 = new portalui_arrayMap();
			desc1.set("kode_akun",150);
			desc1.set("kode_drk",150);
			desc1.set("nilai",150);
			var desc2 = new portalui_arrayMap();
			desc2.set("kode_akun","S");
			desc2.set("kode_drk","S");	
			desc2.set("nilai","N");
			var dataDesc = new portalui_arrayMap();
			dataDesc.set(0,desc1);
			dataDesc.set(1,desc2);
			dtJurnal.setTag2(dataDesc);
		}
		this.gridJurnal = dtJurnal;
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
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataAkun.set(line.kode_akun, line.nama);
								}
							}
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});