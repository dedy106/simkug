window.app_kopeg_pinjbrg_transaksi_fAngsur = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjbrg_transaksi_fAngsur.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjbrg_transaksi_fAngsur";						
			owner.childFormConfig(this, "mainButtonClick","Form Angsuran Kredit Barang: Input", 0);			
			this.maximize();
			//------------------------ login data ------------------------	
			uses("portalui_saiCBB;portalui_datePicker;portalui_radioButton");
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,20,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
			this.lTgl = new portalui_label(this,{bound:[20,21,100,18],caption:"Tanggal",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,21,100,18],selectDate:[this,"doSelectDate"]});
			this.eBukti = new portalui_saiLabelEdit(this,{bound:[20,23,290,20],caption:"No Angsuran",readOnly:true});
			this.bGen = new portalui_button(this,{bound:[320,23,80,18],caption:"Generate", click:[this,"doClick"]});			
			this.eDok = new portalui_saiLabelEdit(this,{bound:[20,22,290,20],caption:"No Dokumen"});
			this.cbbPerLama = new portalui_saiCB(this,{bound:[720,22,200,20],caption:"Periode SPB/TAK",mustCheck: false, tag:9});
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,24,500,20],caption:"Deskripsi"});
			this.cbbSpb = new portalui_saiCBB(this,{bound:[720,24,200,20],caption:"No SPB/TAK", btnClick:[this,"FindBtnClick"], tag:9,btnRefreshClick:[this,"doLoadDataSPB"]});
			this.cbbPenerima = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"Penerima", btnClick:[this,"FindBtnClick"], tag:2});
			this.cbbAgg = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"Nasabah", btnClick:[this,"FindBtnClick"], change:[this,"doChange"]});
			this.cbbKontrak = new portalui_saiCBB(this,{bound:[20,28,200,20],caption:"No Kontrak",btnClick:[this,"FindBtnClick"],btnRefreshClick:[this,"doLoadData"]});
			this.eUdp = new portalui_saiLabelEdit(this, {bound:[340,28,180,20],caption:"Nilai UDP",change:[this,"doChange"],tipeText:ttNilai, text:"0",labelWidth:80});
			this.eBaki = new portalui_saiLabelEdit(this, {bound:[740,28,180,20],caption:"Saldo Baki",tipeText:ttNilai, text:"0",labelWidth:80 ,readOnly:true});
			this.eNilai = new portalui_saiLabelEdit(this,{bound:[20,29,200,20],caption:"Nilai Angsuran", change:[this,"doChange"], tipeText:ttNilai, text:"0"});
			this.i_viewer = new portalui_imageButton(this,{bound:[220,29,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doChange"]});
			this.eDeposit = new portalui_saiLabelEdit(this, {bound:[340,29,180,20],caption:"Deposit Dipakai",change:[this,"doChange"],tipeText:ttNilai, text:"0",labelWidth:80});
			this.eTotPokok = new portalui_saiLabelEdit(this, {bound:[740,29,180,20],caption:"Angs. Pokok",tipeText:ttNilai, text:"0",labelWidth:80 ,readOnly:true});
			this.eSaldo = new portalui_saiLabelEdit(this,{bound:[20,31,200,20],caption:"Saldo Deposit",tipeText:ttNilai, readOnly:true, text:"0"});			
			this.eSls = new portalui_saiLabelEdit(this,{bound:[340,31,180,20],caption:"Sls +Pelunasan",tipeText:ttNilai, readOnly:true, text:"0",labelWidth:80});
			this.eBeban = new portalui_saiLabelEdit(this,{bound:[540,31,180,20],caption:"Beban Lunas",tipeText:ttNilai, change:[this,"doChange"],text:"0",labelWidth:80});
			this.eTotJasa = new portalui_saiLabelEdit(this,{bound:[740,31,180,20],caption:"Angs. Jasa",tipeText:ttNilai, readOnly:true, text:"0",labelWidth:80});
			
			this.p1 = new portalui_panel(this,{bound:[20,35,900,275],caption:"Daftar Rincian Billing dan Angsuran"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,900,250],colCount:10,
			    colWidth:[[0,1,2,3,4,5,6,7,8,9],[60,140,60,80,50,80,80,100,100,100]],
			    colTitle:["Status","No Bukti","Periode","Tanggal","DC","AR Pokok","AR Jasa","Nilai Pokok","Nilai Jasa","BAKI"],
                colFormat:[[7,8,9],[cfNilai,cfNilai,cfNilai]],defaultRow:1,readOnly:true});    
			this.p2 = new portalui_panel(this,{bound:[20,36,900,240],caption:"Data SPB/TAK"});
			this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,190],colCount:10,tag:9,
						colTitle:["Status","Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
						colWidth:[[0,1,2,3,4,5,6,7,8,9],[60,80,100,200,50,100,60,100,60,100]],colFormat:[[5],[cfNilai]],
						buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
						columnReadOnly:[true,[1,2,3,4,5,6,7,8,9],[0]],nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCell2"],autoAppend:true,defaultRow:1});
			this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[0,215,900,25],buttonStyle:2,grid:this.sg2});		
			this.rearrangeChild(10,22);
			setTipeButton(tbSimpan);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.setTabChildIndex();			
			this.dataAngsuran = [];
			this.ePeriode.setText(this.dTgl.getThnBln());
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('PBRGIM','PBRGTP','PBRGUD','PBRGBG','PBRGOE') and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PBRGIM") this.akunIM2 = line.flag;
					if (line.kode_spro == "PBRGTP") this.akunTP = line.flag;
					if (line.kode_spro == "PBRGUD") this.akunUDP = line.flag;
					if (line.kode_spro == "PBRGBG") this.akunPdpt = line.flag;
					if (line.kode_spro == "PBRGOE") this.akunBeban = line.flag;
				}
			}
			var prd = this.dbLib.getDataProvider("select distinct periode from spb_m where kode_lokasi = '"+this.app._lokasi+"' union select distinct periode from ju_m order by periode desc",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cbbPerLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cbbPerLama.setText(this.app._periode);
			this.cbbAgg.setSQL("select kode_agg, nama from kop_agg where kode_lokasi = '"+this.app._lokasi+"'",["kode_agg","nama"],false,["Kode","Nama"],"and","Data Nasabah");
			this.cbbPenerima.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan");
		}catch(e){
			systemAPI.alert("[app_kopeg_pinjbrg_transaksi_fAngsur]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjbrg_transaksi_fAngsur.extend(window.portalui_childForm);
window.app_kopeg_pinjbrg_transaksi_fAngsur.implement({
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
			else {this.sg2.setTag(1); var vProg = "3"; var noSPB = this.cbbSpb.getText();}
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{				
					this.i_viewer.click();
					this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pbrgangs_m","no_angs",this.app._lokasi+"-PBA"+this.ePeriode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into kop_pbrgangs_m(no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_depo,nilai_udp,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,p_fee,nilai_fee,no_spb,nilai_beban) values  "+
							"('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.eKet.getText()+"','"+this.dTgl.getDateString()+"',"+parseNilai(this.eNilai.getText())+","+parseNilai(this.eDeposit.getText())+","+parseNilai(this.eUdp.getText())+","+parseNilai(this.eSls.getText())+",'PBRGANGS','"+vProg+"','"+this.akunIM+"','"+this.ePeriode.getText()+"','"+this.app._lokasi+"','F',1,'IDR','"+this.app._kodePP+"','-','-','"+this.cbbPenerima.getText()+"','"+this.app._userLog+"',now(),0,0,'"+noSPB+"',"+parseNilai(this.eBeban.getText())+")");
					sql.add("insert into kop_pbrgangs_d (no_angs,no_pbrg,no_kontrak,tanggal,akun_ar,npokok,nbunga,kode_lokasi,dc,no_del) values "+
							"('"+this.eBukti.getText()+"','"+this.cbbKontrak.dataFromList[1]+"','"+this.cbbKontrak.getText()+"','"+this.dTgl.getDateString()+"','"+this.akunIM+"',"+parseNilai(this.eTotPokok.getText())+","+parseNilai(this.eTotJasa.getText())+",'"+this.app._lokasi+"','D','-')");
					
					var idx=0;
					var d="insert into kop_pbrgangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";		
					d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunIM+"','"+this.eKet.getText()+"','D',"+parseNilai(this.eNilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','AR','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					if (this.eDeposit.getText() != "0") {
						d+= ",";
						idx++;
						d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunTP+"','"+this.eKet.getText()+"','D',"+parseNilai(this.eDeposit.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','PK_DEPO','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						sql.add("insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
							    "('"+this.eBukti.getText()+"','"+this.dTgl.getDateString()+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eDeposit.getText())+",'"+this.cbbAgg.getText()+"','PBRG','ANGS_SLS','"+this.ePeriode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cbbPenerima.getText()+"','-','-',1,'IDR','"+this.app._userLog+"',now())");
					}					
					if (this.eSls.getText() != "0") { //<<------------ sls lebih akan diangap denda pelunasan,,hingga langsung masuk ke pdpt jasa angsuran
						d+= ",";
						idx++;
						d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunPdpt+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eSls.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','SL_PDPT','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";					
					}
					if (this.eBeban.getText() != "0") { 
						d+= ",";
						idx++;
						d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunBeban+"','"+this.eKet.getText()+"','D',"+parseNilai(this.eBeban.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','BEBAN','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}
					if (this.eUdp.getText() != "0") {
						d+= ",";
						idx++;
						d+= "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunUDP+"','"+this.eKet.getText()+"','D',"+parseNilai(this.eUdp.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','UDP','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						sql.add("insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
							    "('"+this.eBukti.getText()+"','"+this.dTgl.getDateString()+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eUdp.getText())+",'"+this.cbbAgg.getText()+"','PBRG','UDP','"+this.ePeriode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cbbPenerima.getText()+"','-','-',1,'IDR','"+this.app._userLog+"',now())");
					}
					d+= ",";
					idx++;
					d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.arPokok+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eTotPokok.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','ARPK','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					d+= ",";
					idx++;
					d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.arJasa+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eTotJasa.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','ARJS','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
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
					this.sg2.setTag(9);
					this.sg2.clear(1);					
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :	
				this.akunIM = this.akunIM2;
				if (this.cbbSpb.getText()!="") {
					var temu = 0;
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.cells(0,i) == "APP"){
							temu++;
							this.akunIM = this.sg2.cells(1,i); // <-- akun IM diganti dgn akun SPBnya
						}
					}
					if (temu == 0 || temu > 1) {
						system.alert(this,"SPB tidak valid.","Pilihan status APP harus satu baris saja.");
						return false;
					}
				}
				var tot = nilaiToFloat(this.eNilai.getText()) + nilaiToFloat(this.eDeposit.getText()) + nilaiToFloat(this.eUdp.getText()) + nilaiToFloat(this.eBeban.getText());
				if (tot <= 0){
					system.alert(this,"Transaksi tidak valid.","Angsuran tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (nilaiToFloat(this.eDeposit.getText()) > nilaiToFloat(this.eSaldo.getText())){
					system.alert(this,"Transaksi tidak valid.","Nilai pemakaian deposit tidak boleh melebihi dari saldo.");
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
			this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pbrgangs_m","no_angs",this.app._lokasi+"-PBA"+this.ePeriode.getText().substr(2,4)+".","0000"));
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
			system.alert(this,"SPB/TAK tidak valid.","No SPB/TAK harus dipilih.");
		}
	},
	doChange: function(sender){
		if (sender == this.eNilai || sender == this.eUdp || sender == this.eDeposit || sender == this.eBeban){
			this.i_viewer.click();
		}
		if (sender == this.cbbAgg) {
			var data = this.dbLib.getDataProvider("select ifnull(sum(case dc when 'D' then nilai else -nilai end),0) as saldo from kop_depo where kode_agg ='"+this.cbbAgg.getText()+"' and modul = 'PBRG' and jenis <> 'UDP' and kode_lokasi = '"+this.app._lokasi+"'");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line = data.rs.rows[0];
				this.eSaldo.setText(floatToNilai(line.saldo));
			}
		}
		if (sender == this.ePeriode){
			this.sg1.clear(1); this.eBaki.setText("0"); 
		}
		if (sender == this.i_viewer){
			if ((this.eNilai.getText() != "") && (this.eDeposit.getText() != "") && (this.eBaki.getText() != "") && (this.eUdp.getText() != "") && (this.eBeban.getText() != "")){
				var totAngs = nilaiToFloat(this.eNilai.getText()) +  nilaiToFloat(this.eDeposit.getText()) + nilaiToFloat(this.eUdp.getText()) + nilaiToFloat(this.eBeban.getText());
				if(nilaiToFloat(this.eBaki.getText())<0) {
					this.eTotPokok.setText("0");
					this.eTotJasa.setText("0");
				} else {
					var sls = totAngs -  nilaiToFloat(this.eBaki.getText());
					if (sls > 0) {
						this.eSls.setText(floatToNilai(sls));
						this.eTotJasa.setText(floatToNilai(this.nJasalunas));
						totAngs = totAngs - this.nJasalunas - sls;
						this.eTotPokok.setText(floatToNilai(totAngs));
					}
					else {
						this.eSls.setText("0");
						//bunga dimakan duluan
						if (totAngs >= this.nJasalunas) {
							this.eTotJasa.setText(floatToNilai(this.nJasalunas));
							totAngs = totAngs - this.nJasalunas;
							if (totAngs >= 0) this.eTotPokok.setText(floatToNilai(totAngs));
							else this.eTotPokok.setText("0");
						}
						else {
							this.eTotJasa.setText(floatToNilai(totAngs));
							this.eTotPokok.setText("0");
						}
					}
				}
			}
		}
	},
	doLoadData: function(sender){
		if (this.cbbKontrak.getText() != "" && (this.ePeriode.getText() != "")){
			var data = this.dbLib.getDataProvider("select 'BILL' as status,a.no_bill as no_bukti,date_format(ab.tanggal,'%Y%m') as periode,date_format(ab.tanggal,'%d/%m/%Y') as tanggal,0 as npokok,sum(case a.dc when 'D' then a.nbunga else -a.nbunga end) as nbunga,b.nilai as baki,b.akun_piutang,b.akun_pjasa,a.dc,b.nilai_tagihan "+
			                                      "from kop_pbrgbill_d a inner join kop_pbrgbill_m ab on a.no_bill=ab.no_bill and a.kode_lokasi=ab.kode_lokasi "+
												  "                      inner join kop_pbrg_m b on a.no_kontrak=b.no_kontrak and a.no_pbrg=b.no_pbrg and a.kode_lokasi=b.kode_lokasi "+												  
												  "where a.no_kontrak='"+this.cbbKontrak.getText()+"' and a.no_pbrg='"+this.cbbKontrak.dataFromList[1]+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
												  "group by a.no_bill,date_format(ab.tanggal,'%Y%m'),date_format(ab.tanggal,'%d/%m/%Y'),b.nilai,b.akun_piutang,b.akun_pjasa,a.dc,b.nilai_tagihan  "+
												  "union "+
												  "select 'ANGS' as status,a.no_angs as no_bukti,date_format(a.tanggal,'%Y%m') as periode,date_format(a.tanggal,'%d/%m/%Y') as tanggal,case a.dc when 'D' then a.npokok else -npokok end as npokok,case a.dc when 'D' then a.nbunga else -a.nbunga end as nbunga,b.nilai as baki,b.akun_piutang,b.akun_pjasa,case a.dc when 'D' then 'C' else 'D' end as dc,b.nilai_tagihan "+
			                                      "from (select a.no_angs,a.no_kontrak,a.no_pbrg,a.kode_lokasi,a.tanggal,a.dc,case a.dc when 'D' then sum(a.npokok) else -sum(npokok) end as npokok,"+
												  "      case a.dc when 'D' then sum(a.nbunga) else -sum(a.nbunga) end as nbunga from kop_pbrgangs_d a group by a.no_kontrak,a.no_pbrg,a.kode_lokasi,a.no_angs,a.tanggal,a.dc "+
												  ") a inner join kop_pbrg_m b on a.no_kontrak=b.no_kontrak and a.no_pbrg=b.no_pbrg and a.kode_lokasi=b.kode_lokasi "+												  
												  "where a.no_kontrak='"+this.cbbKontrak.getText()+"' and a.no_pbrg='"+this.cbbKontrak.dataFromList[1]+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
												  "order by periode,status desc"); 
			eval("data = "+data+";");
			var periode = ""; 
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];
				var baki = parseFloat(line.baki);
				this.sg1.clear();
				this.nJasalunas = 0; 
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.status.toUpperCase() == "BILL") { 
						baki += parseFloat(line.nbunga); 
						this.nJasalunas += parseFloat(line.nbunga);
					}
					if (line.status.toUpperCase() == "ANGS") {
						baki = baki - (parseFloat(line.npokok)+parseFloat(line.nbunga));
						this.nJasalunas = this.nJasalunas - parseFloat(line.nbunga);
					}
					this.sg1.appendData([line.status.toUpperCase(),line.no_bukti,line.periode,line.tanggal,line.dc,line.akun_piutang,line.akun_pjasa,floatToNilai(line.npokok),floatToNilai(line.nbunga),floatToNilai(baki)]);
				}
				if (this.nJasalunas<0) this.nJasalunas = 0;
				this.sg1.validasi();
				this.eBaki.setText(floatToNilai(baki));
				this.eNilai.setText(floatToNilai(line.nilai_tagihan));				
				this.arPokok = line.akun_piutang;
				this.arJasa = line.akun_pjasa;
			}
		} else {
			system.alert(this,"Kontrak dan Periode tidak valid.","");
		}
	},
	FindBtnClick: function(sender){
		if (sender == this.cbbSpb) {   
			this.standarLib.showListData(this, "Daftar Bukti SPB/TAK",sender,undefined, 
									  "select  * from "+
									  "(select no_spb,keterangan,'SPB' as jenis from spb_m where kode_lokasi = '"+this.app._lokasi+"' and periode ='"+this.cbbPerLama.getText()+"' "+
									  " union "+
									  " select no_ju as no_spb,keterangan,'TAK' as jenis from ju_m where kode_lokasi = '"+this.app._lokasi+"' and jenis='TAK' and periode ='"+this.cbbPerLama.getText()+"' "+
									  " ) as A ", 										  
									  "select count(no_spb)     from (select no_spb, keterangan, 'SPB' as jenis from spb_m where kode_lokasi = '"+this.app._lokasi+"' and periode ='"+this.cbbPerLama.getText()+"' "+
									  "union "+
									  "select no_ju as no_spb, keterangan, 'TAK' as jenis from ju_m where kode_lokasi = '"+this.app._lokasi+"' and jenis='TAK' and periode ='"+this.cbbPerLama.getText()+"' ) as b ",
									  ["no_spb","keterangan","jenis"],"WHERE",["No SPB/TAK","Deskripsi","Jenis"],false);				
			this.sg2.clear(1);
		}
		if (sender == this.cbbKontrak){
			this.standarLib.showListData(this, "Daftar Kontrak",sender,undefined, 
										  "select a.no_kontrak, a.no_pbrg from kop_pbrg_m a "+
										  "where a.kode_agg='"+this.cbbAgg.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.progress ='2' and a.status_aktif in ('0','1') ",
										  "select count(a.no_pbrg) from kop_pbrg_m a        "+
										  "where a.kode_agg='"+this.cbbAgg.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.progress ='2' and a.status_aktif in ('0','1') ",
										  ["no_kontrak","no_pbrg"],"and",["No Kontrak","No Bukti"],false);
			this.sg1.clear(1);
		}
		if (sender == this.cbbAgg){
			this.standarLib.showListData(this, "Daftar Nasabah",sender,undefined, 
										  "select kode_agg, nama  from kop_agg where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(kode_agg) from kop_agg where kode_lokasi ='"+this.app._lokasi+"'",
										  ["kode_agg","nama"],"and",["Kode Nasabah","Nama"],false);
			this.cbbKontrak.setText("",""); this.sg1.clear(1);
		}
		if (sender == this.cbbPenerima){
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

