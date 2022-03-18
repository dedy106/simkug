window.app_kopeg_pinjaman_transaksi_fAngsurKol = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjaman_transaksi_fAngsurKol.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjaman_transaksi_fAngsurKol";						
			owner.childFormConfig(this, "mainButtonClick","Form Angsuran Kolektif : Input", 0);			
			this.maximize();
			//------------------------ login data ------------------------	
			uses("portalui_saiCBB;portalui_datePicker;portalui_radioButton;portalui_uploader;portalui_checkBox");
			uses("portalui_saiCBB",true);
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,20,200,20],caption:"Periode",readOnly:true,tag:2});
			this.lTgl = new portalui_label(this,{bound:[20,21,100,18],caption:"Tanggal",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,21,100,18],selectDate:[this,"doSelectDate"]});
			this.eBukti = new portalui_saiLabelEdit(this,{bound:[20,23,290,20],caption:"No Angsuran",readOnly:true});
			this.bGen = new portalui_button(this,{bound:[320,23,80,18],caption:"Generate", click:[this,"doClick"]});			
			this.eDok = new portalui_saiLabelEdit(this,{bound:[20,25,290,20],caption:"No Dokumen"});
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,26,500,20],caption:"Keterangan"});
			this.cbbPenerima = new portalui_saiCBBL(this,{
				bound:[20,27,200,20],
				caption:"Penerima", 								
				tag:2,
				multiSelection: false,
				sql : ["select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Daftar Karyawan",true]
			});
			this.cStatus = new portalui_saiCB(this,{bound:[20,19,200,20],caption:"Status Bayar",items:["AUTODEBET","CASH"],tag:2});
			this.cbbLoker = new portalui_saiCBB(this, {
				bound: [20, 28, 200, 20],
				caption: "Loker",
				btnRefreshClick: [this, "doLoadData"],
				multiSelection: true,
				sql: ["select kode_loker, nama  from kop_loker where kode_lokasi ='"+this.app._lokasi+"'",["kode_loker","nama"],true,["Kode Loker","Nama"],"and","Lokasi Kerja",true ]
			});
			this.i_viewer = new portalui_imageButton(this,{bound:[240,28,20,20],hint:"Semua Periode",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoadData"]});
			this.eTagihan = new portalui_saiLabelEdit(this,{bound:[20,29,200,20],caption:"Total Tagihan", tipeText:ttNilai, text:"0" ,readOnly : true});
			this.cbbPerLama = new portalui_saiCB(this,{bound:[720,29,200,20],caption:"Periode SPB/TAK",mustCheck: false, tag:9});
			this.eAngs = new portalui_saiLabelEdit(this, {bound:[20,30,200,20],caption:"Nilai Angsuran",tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
			this.cb_angs = new portalui_checkBox(this,{bound:[230,30,100,20],caption:"Hitung dr Upload", checked:true});
			this.cbbSpb = new portalui_saiCBB(this,{bound:[720,30,200,20],caption:"No SPB/TAK", btnClick:[this,"FindBtnClick"], tag:9,btnRefreshClick:[this,"doLoadDataSPB"]});
			this.eFee = new portalui_saiLabelEdit(this, {bound:[20,31,130,20],caption:"% Fee Collection",tipeText:ttNilai, text:"0",change:[this,"doChange"]});
			this.eFeeNilai = new portalui_saiLabelEdit(this,{bound:[150,31,70,20],labelWidth:0,tipeText:ttNilai, text:"0"});			
			this.eTotPokok = new portalui_saiLabelEdit(this,{bound:[720,31,200,20],caption:"Total Pokok",tipeText:ttNilai, readOnly:true, text:"0"});
			this.eSls = new portalui_saiLabelEdit(this,{bound:[20,32,200,20],caption:"Sls Angsuran",tipeText:ttNilai, readOnly:true, text:"0"});
            this.eTotJasa = new portalui_saiLabelEdit(this,{bound:[720,32,200,20],caption:"Total Jasa",tipeText:ttNilai, readOnly:true, text:"0"});
            this.bLoadInv = new portalui_button(this,{bound:[240,32,120,18],caption:"Data Upload tak Match",click:[this,"doVisible"],visible:false});	
			this.uploader = new portalui_uploader(this,{bound:[460,32,80,20],param4:"gridupload",param3:"object",autoSubmit:true,afterUpload:[this,"doAfterLoad"]});			
			this.bHitung = new portalui_button(this,{bound:[545,32,80,18],caption:"Hitung Load",click:[this,"doMatching"]});				
			this.bInvalid = new portalui_button(this,{bound:[365,32,80,18],caption:"Data Tagih tdk Match",click:[this,"doVisible"],visible:false});			
			this.bUpload = new portalui_button(this,{bound:[630,32,80,18],caption:"Data Upload",click:[this,"doVisible"]});				
			
            this.p1 = new portalui_panel(this,{bound:[20,35,900,320],caption:"Daftar Cicilan yang telah diakru per Loker"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,898,265],colCount:12,
			    colTitle:["No Kontrak","Kode Agg","Nasabah","Cicilan Ke","Tgl Angs","Nilai Pokok","Nilai Jasa","Nilai Tagihan","Nilai Angsur","AR Pokok","AR Jasa","No Pinj"],
                colWidth:[[0,1,2,3,4,5,6,7,8,9,10,11],[130,80,200,60,60,100,100,100,100,0,0,0]],
				colFormat:[[5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai]],
                columnReadOnly:[true,[0,1,2,3,4,5,6,7,9,10,11],[8]], colHide:[[1,9,10,11],true],defaultRow:1,
				change:[this,"doChangeCell"],nilaiChange:[this,"doSgChange"]});
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,288,895,25],grid:this.sg, buttonStyle:bsViewExt, pager:[this,"doPager"]});
			this.p3 = new portalui_panel(this,{bound:[20,35,900,320],caption:"Daftar Upload", visible:false});
			this.p3.sg = new portalui_saiGrid(this.p3,{bound:[0,20,895,265],colCount:5,tag:9,
						colTitle:["Kode Agg","Nama","Tagihan","Bayar","Terpakai"],
						colWidth:[[4,3,2,1,0],[100,100,100,250,80]],colFormat:[[2,3,4],[cfNilai, cfNilai, cfNilai]],				
						readOnly:true,
						defaultRow:1});				
			this.p3.sgn = new portalui_sgNavigator(this.p3,{bound:[1,288,895,25],grid:this.p3.sg, buttonStyle:bsViewExt, pager:[this,"doPager"]});
			this.p4 = new portalui_panel(this,{bound:[20,35,900,320],caption:"Daftar Anggota tidak ada di upload", visible:false});
			this.p4.sg = new portalui_saiGrid(this.p4,{bound:[0,20,895,265],colCount:5,tag:9,
						colTitle:["Kode Agg","Nama","No Kartu","Tagihan","Angsuran"],
						colWidth:[[4,3,2,1,0],[100,100,130,250,80]],colFormat:[[3,4],[cfNilai, cfNilai]],				
						readOnly:true,
						defaultRow:1});				
			this.p4.sgn = new portalui_sgNavigator(this.p4,{bound:[1,288,895,25],grid:this.p4.sg, buttonStyle:bsViewExt, pager:[this,"doPager"]});
			this.p5 = new portalui_panel(this,{bound:[20,35,900,320],caption:"Daftar Anggota ada di upload dan tidak ada didaftar", visible:false});
			this.p5.sg = new portalui_saiGrid(this.p5,{bound:[0,20,895,265],colCount:5,tag:9,
						colTitle:["Kode Agg","Nama","Tagihan","Bayar","Terpakai"],
						colWidth:[[4,3,2,1,0],[100,100,130,250,80]],colFormat:[[3,4],[cfNilai, cfNilai]],				
						readOnly:true,
						defaultRow:1});				
			this.p5.sgn = new portalui_sgNavigator(this.p5,{bound:[1,288,895,25],grid:this.p5.sg, buttonStyle:bsViewExt, pager:[this,"doPager"]});
			
			this.p2 = new portalui_panel(this,{bound:[20,36,900,240],caption:"Data SPB/TAK Potongan Gaji"});
			this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,190],colCount:10,tag:9,
						colTitle:["Status","Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
						colWidth:[[0,1,2,3,4,5,6,7,8,9],[60,80,100,200,50,100,60,100,60,100]],colFormat:[[5],[cfNilai]],
						buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
						columnReadOnly:[true,[1,2,3,4,5,6,7,8,9],[0]],nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCell2"],autoAppend:true,defaultRow:1});
			this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[0,215,900,25],buttonStyle:bsViewExt,grid:this.sg2});		
			this.rearrangeChild(10,22);
			setTipeButton(tbSimpan);
			
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
			var prd = this.dbLib.getDataProvider("select distinct periode from spb_m where kode_lokasi = '"+this.app._lokasi+"' union select distinct periode from ju_m order by periode desc",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cbbPerLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cbbPerLama.setText(this.app._periode);
		}catch(e){
			systemAPI.alert("[app_kopeg_pinjaman_transaksi_fAngsurKol]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjaman_transaksi_fAngsurKol.extend(window.portalui_childForm);
window.app_kopeg_pinjaman_transaksi_fAngsurKol.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjangs_m","no_angs",this.app._lokasi+"-PA"+this.ePeriode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var nPiuIM =  nilaiToFloat(this.eAngs.getText()) - nilaiToFloat(this.eFeeNilai.getText()) ;
					//nPiuIM ====>> nilai uang yg diterima, nila angsur = nilai uang yg diterima+nilai fee kolektif
					sql.add("insert into kop_pinjangs_m(no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_depo,nilai_udp,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,p_fee,nilai_fee,no_spb) values  "+
							"('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.eKet.getText()+"','"+this.dTgl.getDateString()+"',"+nPiuIM+",0,0,"+parseNilai(this.eSls.getText())+",'PINJKOL','"+vProg+"','"+this.akunIM+"','"+this.ePeriode.getText()+"','"+this.app._lokasi+"','F',1,'IDR','"+this.app._kodePP+"','-','-','"+this.cbbPenerima.getText()+"','"+this.app._userLog+"',now(),"+parseNilai(this.eFee.getText())+","+parseNilai(this.eFeeNilai.getText())+",'"+noSPB+"')");
					var z = 0;
					var vPokok = vJasa = 0;
					var d="insert into kop_pinjangs_d (no_angs,no_pinj,no_kontrak,tanggal,akun_ar,npokok,nbunga,kode_lokasi,dc) values ";				
					var line;
					for (var i in this.dataPinjaman.rs.rows){
						line = this.dataPinjaman.rs.rows[i];
						if (line.angsuran > 0){
							if (z > 0) d += ",";
							if (parseFloat(line.angsuran) >= parseFloat(line.nbunga)) {
								vJasa = parseFloat(line.nbunga);
								vPokok = parseFloat(line.angsuran) - vJasa;
							}
							else {
								vJasa = parseFloat(line.angsuran);
								vPokok = 0;
							}
							d += "('"+this.eBukti.getText()+"','"+line.no_pinj+"','"+line.no_kontrak+"','"+this.dTgl.getDateString()+"','"+this.akunIM+"',"+vPokok+","+vJasa+",'"+this.app._lokasi+"','D')";
							z++;
						}
					}
					sql.add(d);	
					var idx=0;
					var d="insert into kop_pinjangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";		
					d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunIM+"','"+this.eKet.getText()+"','D',"+nPiuIM+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','AR','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					if (nilaiToFloat(this.eFeeNilai.getText()) != 0) {
						d+= ",";
						idx++;
						d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunBF+"','"+this.eKet.getText()+"','D',"+parseNilai(this.eFeeNilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','BYFEE','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}
					if (nilaiToFloat(this.eSls.getText()) < 0) {
						d+= ",";
						idx++;
						var vSls = nilaiToFloat(this.eSls.getText()) * -1;
						d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunOE+"','"+this.eKet.getText()+"','D',"+vSls+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','SLS_ANGS','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					} else {
						if (nilaiToFloat(this.eSls.getText()) > 0) {
						d+= ",";
						idx++;
						var vSls = nilaiToFloat(this.eSls.getText());
						d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunOI+"','"+this.eKet.getText()+"','C',"+vSls+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','SLS_ANGS','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						}
					}
					this.createJurnal();
					var line = undefined;
					idx++;
					for (var i in this.gridJurnal.objList){
						d+= ",";
						line = this.gridJurnal.get(i);
						d+= "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+line.get("kode_akun")+"','"+this.eKet.getText()+"','C',"+parseFloat(line.get("nilai"))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','"+line.get("kode_drk")+"','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						idx++;
					}
					/*
					if (this.p2.visible == true) {
						if (this.sg2.getRowValidCount() > 0){
							for (var i=0;i < this.sg2.getRowCount();i++){
								if (this.sg2.rowValid(i)){
									d+= ","+"('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.sg2.cells(3,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','ADD','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
									idx++;
								}
							}						
						}
					}
					*/					
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
				if ((nilaiToFloat(this.eSls.getText()) < 0) && (Math.abs(nilaiToFloat(this.eSls.getText())) > this.nilaiOE)){
					system.alert(this,"Transaksi tidak valid.","Selisih kurang angsuran tidak boleh kurang dari batas OE ["+floatToNilai(this.nilaiOE)+"].");
					return false;
				}
				var tot = nilaiToFloat(this.eAngs.getText());
				if (tot <= 0){
					system.alert(this,"Transaksi tidak valid.","Angsuran tidak boleh kurang dari atau sama dengan nol.");
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
		if (this.cbbLoker.getText() != "" && this.ePeriode.getText() != ""){
			if(sender == this.i_viewer) var fltperiode = "<=";
			else var fltperiode = "=";
			var loker = "";
			if (this.cbbLoker.dataSelection){				
				//var filter = this.cbbLoker.dataFilter;									
				var filterLoker = "and "+this.cbbLoker.convertFilter("c.kode_loker");
			}else{
				loker ="'"+this.cbbLoker.getText()+"'"; 
				var filterLoker = "and c.kode_loker in ("+loker+")";
			}
			var data = this.dbLib.getDataProvider("select b.no_kontrak,b.kode_agg,c.nama,a.cicilan_ke,date_format(ab.tanggal,'%d/%m/%Y') as tgl_angs,a.npokok,a.nbunga,(a.npokok+a.nbunga) as ntagih,b.akun_piutang,b.akun_pjasa,b.no_pinj "+
			                                      "from kop_pinjbill_d a inner join kop_pinjbill_m ab on a.no_bill=ab.no_bill and a.kode_lokasi=ab.kode_lokasi "+
												  "                      inner join kop_pinj_m b on a.no_kontrak =b.no_kontrak and a.no_pinj=b.no_pinj and a.kode_lokasi=b.kode_lokasi "+
												  "                      inner join kop_agg c on b.kode_agg=c.kode_agg and b.kode_lokasi=c.kode_lokasi "+
												  "					     inner join kop_pinj_spb bb on b.no_kontrak=bb.no_kontrak and b.kode_lokasi=bb.kode_lokasi "+
												  "                      inner join spb_m cc on bb.no_spb=cc.no_spb and bb.kode_lokasi=cc.kode_lokasi "+
												  "                      inner join kas_d dd on cc.no_spb=dd.no_bukti and dd.kode_lokasi=cc.kode_lokasi "+
												  "                      inner join kas_m ee on dd.no_kas=ee.no_kas and dd.kode_lokasi=ee.kode_lokasi "+
												  "                      left outer join (select no_kontrak,no_pinj,kode_lokasi,date_format(tanggal,'%Y%m') as per, sum(case dc when 'D' then npokok+nbunga else -(npokok+nbunga) end) as nangs "+
												  "                                     from kop_pinjangs_d group by no_kontrak,no_pinj,kode_lokasi,date_format(tanggal,'%Y%m')) aa "+
												  "                                     on aa.no_kontrak=a.no_kontrak and aa.no_pinj=a.no_pinj and aa.kode_lokasi=a.kode_lokasi and date_format(ab.tanggal,'%Y%m') = aa.per "+
												  "where b.status_bayar = '"+this.cStatus.getText().substr(0,1)+"' and ab.no_del='-' and c.kode_lokasi = '"+this.app._lokasi+"' "+filterLoker+" and b.status_aktif='1' and b.progress = '1' and cc.no_del='-' and ee.no_del='-' and date_format(ab.tanggal,'%Y%m') "+fltperiode+" '"+this.ePeriode.getText()+"' and aa.per is null "+
												  "order by c.kode_agg,b.no_kontrak,a.cicilan_ke");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				if (typeof data == "object") {
					this.dataPinjaman = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length / 30));
					var tot = 0, line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];
						tot += parseFloat(line.ntagih);
					}
					this.eTagihan.setText(floatToNilai(tot));					
					this.sgn.rearrange(0);
					this.selectPage(1);
				}			
			}
		} else {
			system.alert(this,"Loker dan Periode tidak valid.","");
		}
	},
	FindBtnClick: function(sender){
		if (sender == this.cbbSpb) {   
			this.standarLib.showListData(this, "Daftar Bukti SPB/TAK",sender,undefined, 
										  "select  * from (select no_spb,keterangan,'SPB' as jenis from spb_m where kode_lokasi = '"+this.app._lokasi+"' and periode ='"+this.cbbPerLama.getText()+"' "+
										  "union "+
										  "select no_ju as no_spb,keterangan,'TAK' as jenis from ju_m where kode_lokasi = '"+this.app._lokasi+"' and jenis='TAK' and periode ='"+this.cbbPerLama.getText()+"') as A ", 
										  "select count(no_spb)     from (select no_spb, keterangan, 'SPB' as jenis from spb_m where kode_lokasi = '"+this.app._lokasi+"' and periode ='"+this.cbbPerLama.getText()+"' "+
										  "union "+
										  "select no_ju as no_spb, keterangan, 'TAK' as jenis from ju_m where kode_lokasi = '"+this.app._lokasi+"' and jenis='TAK' and periode ='"+this.cbbPerLama.getText()+"') as b ",
										  ["no_spb","keterangan","jenis"],"WHERE",["No SPB/TAK","Deskripsi","Jenis"],false);				
			this.sg2.clear(1);
		}
		if (sender == this.cbbLoker){
			this.standarLib.showListData(this, "Daftar Loker",sender,undefined, 
										  "select kode_loker, nama  from kop_loker where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(kode_loker) from kop_loker where kode_lokasi ='"+this.app._lokasi+"'",
										  ["kode_loker","nama"],"and",["Kode Loker","Nama"],false);
		}
		if (sender == this.cbbPenerima){
			this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
	},
	doMatchClick: function(){
		if (this.dataPinjaman === undefined) return;
		var tot1 = tot2 = tot3 = tot4 = 0;			
		var saldo = 0,nilai = nilaiToFloat(this.eAngs.getText());
		var line;
		saldo = nilai;
		for (var  i in this.dataPinjaman.rs.rows){
			line = this.dataPinjaman.rs.rows[i];						
			
			if (saldo > parseFloat(line.nbunga)){
				if (saldo >= parseFloat(line.ntagih))
					line.angsuran = parseFloat(line.ntagih);
				else line.angsuran = saldo;
				tot2 += parseFloat(line.nbunga);	
				tot1 += parseFloat(line.angsuran) - parseFloat(line.nbunga);					
			}else{
				tot2 += saldo;
				tot1 += 0;
				line.angsuran = saldo;
			}
			tot3 += parseFloat(line.ntagih);
			saldo -= parseFloat(line.angsuran);
			this.dataPinjaman.rs.rows[i] = line;
			//tot4 += parseFloat(line.angsuran);
		}				
		this.eTotPokok.setText(floatToNilai(tot1));
		this.eTotJasa.setText(floatToNilai(tot2));		
		//this.eTagihan.setText(floatToNilai(tot3));		
		
		var sls = nilaiToFloat(this.eAngs.getText()) - (nilaiToFloat(this.eTotPokok.getText()) + nilaiToFloat(this.eTotJasa.getText()));
		this.eSls.setText(floatToNilai(sls));
		var nFee = Math.round(nilaiToFloat(this.eFee.getText()) / 100 * nilaiToFloat(this.eAngs.getText()));
		this.eFeeNilai.setText(floatToNilai(nFee));		
		this.selectPage(1);
	},
	doHitungClick: function(){
		if (this.dataPinjaman === undefined) return;
		var tot1 = tot2 = tot3 = tot4 = 0;					
		var line;		
		for (var  i in this.dataPinjaman.rs.rows){
			line = this.dataPinjaman.rs.rows[i];						
			
			if (parseFloat(line.angsuran) > parseFloat(line.nbunga)){				
				tot2 += parseFloat(line.nbunga);	
				tot1 += parseFloat(line.angsuran) - parseFloat(line.nbunga);					
			}else{
				tot2 += saldo;
				tot1 += 0;				
			}
			tot3 += parseFloat(line.ntagih);			
			tot4 += parseFloat(line.angsuran);
		}				
		this.eTotPokok.setText(floatToNilai(tot1));
		this.eTotJasa.setText(floatToNilai(tot2));		
		//this.eTagihan.setText(floatToNilai(tot3));								
		this.eAngs.setText(floatToNilai(tot4));
	},
	doSgChange: function(sender, col, row){		
		this.doHitungClick();
	},
	doChangeCell: function(sender, col, row){		
		if (col == 8) {			
			this.dataPinjaman.rs.rows[(this.page - 1)* 30 + row].angsuran = parseFloat(parseNilai(sender.cell(8,row)));
			this.sg1.validasi();
		}
	},
	createJurnal : function() {
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var nreal,ix,dtJrnl = 0,line;
		for (var i in this.dataPinjaman.rs.rows){
			line = this.dataPinjaman.rs.rows[i];
			kdAkun = line.akun_pjasa;
			kdDRK = 'ARJS';
			if (parseFloat(line.angsuran) > parseFloat(line.nbunga)) {
				nreal = parseFloat(line.nbunga);
			} else nreal = parseFloat(line.angsuran);
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
		for (var i in this.dataPinjaman.rs.rows){
			line = this.dataPinjaman.rs.rows[i];
			nreal = parseFloat(line.angsuran) - parseFloat(line.nbunga);
			if (nreal > 0) {
				kdAkun = line.akun_piutang;
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.eBukti.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doAfterLoad: function(sender, result, data, filename){
		this.p3.hide();
		if (result) {
			this.dataUpload = new portalui_arrayMap();
			this.dataAsli = data;
			var line;							
			var tot = 0;
			for (var i in data.rows){
				line = data.rows[i];					
				this.dataUpload.set(trim(line.kode_agg), {kode_agg:trim(line.kode_agg),nilai_angs:parseFloat(line.nilai_bayar), terpakai:0, nama:line.nama, ntagih:parseFloat(line.tagihan)});
				tot += parseFloat(line.nilai_bayar);					
			}						
			this.p3.sgn.setTotalPage(Math.ceil(data.rows.length / 30));
			this.p3.sgn.rearrange(0);
			this.selectLoad(1);
		}
	},
	doMatching: function(sender){
		try{	
			if (this.cb_angs.isChecked() && this.dataUpload && typeof this.dataUpload != "string") {				
				for (var i in this.dataUpload.objList){
					this.dataUpload.get(i).terpakai = 0;
				}
				var data,angs, dataInvalid = new portalui_arrayMap();
				var total = 0, saldo, tot1 = 0, tot2 = 0, tot3 = 0, tot4 = 0;
				for (var i in this.dataPinjaman.rs.rows){
					data = this.dataPinjaman.rs.rows[i];
					angs = this.dataUpload.get(trim(data.kode_agg)); 					
					this.dataPinjaman.rs.rows[i].angsuran = 0;
					if (angs){						
						saldo = parseFloat(angs.nilai_angs) - parseFloat(angs.terpakai);
						if (saldo > parseFloat(data.nbunga)){				
							tot2 += parseFloat(data.nbunga);
							bunga = parseFloat(data.nbunga);
							if (saldo >= parseFloat(data.ntagih)){
								tot1 += parseFloat(data.ntagih) - parseFloat(data.nbunga);					
								pokok = parseFloat(data.ntagih) - parseFloat(data.nbunga);					
							}else {
								tot1 += saldo - parseFloat(data.nbunga);					
								pokok = saldo - parseFloat(data.nbunga);					
							}
						}else{
							tot2 += saldo;
							tot1 += 0;
							pokok = 0;
							bunga = saldo;
						}
						angs.terpakai += pokok + bunga;
						this.dataPinjaman.rs.rows[i].angsuran = pokok + bunga;						
						tot4 += parseFloat(pokok + bunga);
						this.dataUpload.set(data.kode_agg,angs);						
					}else {
						dataInvalid.set(data.kode_agg, {kode_agg:data.kode_agg,ntagih:data.ntagih, nbayar:0, nama:data.nama, kontrak:data.no_pinj });
					}
				}			
				this.eAngs.setText(floatToNilai(tot4));
				this.eTotPokok.setText(floatToNilai(tot1));
				this.eTotJasa.setText(floatToNilai(tot2));		
				this.selectPage(1);
				if (dataInvalid.getLength() > 0){
					systemAPI.alert("Ada data tagihan tidak sama dengan nilai pembayaran.",dataInvalid.getLength()+" data");
					var data;
					this.p4.sg.clear();
					for (var i in dataInvalid.objList){
						data = dataInvalid.get(i);
						this.p4.sg.appendData([data.kode_agg, data.nama, data.kontrak, floatToNilai(data.ntagih),floatToNilai(data.nbayar)]);
					}
					this.p4.show();	
					this.bInvalid.show();						
				}
				this.doCheckUploadNotMatch();
			}else this.doMatchClick();
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doCheckUploadNotMatch: function(){
		var line;
		this.p5.sg.clear();
		for (var i in this.dataUpload.objList){
			line = this.dataUpload.get(i);
			if ((line.terpakai == 0 || (line.nilai_angs - line.terpakai != 0)) && line.nilai_angs != 0){
				this.bLoadInv.show();
				if (line) this.p5.sg.appendData([trim(line.kode_agg), line.nama, floatToNilai(line.ntagih), floatToNilai(line.nilai_angs), floatToNilai(line.terpakai)]);
			}
		}
	},
	selectPage: function(page){
		this.sg1.clear();
		var rowPerPage = 30;
		var start = (page - 1) * rowPerPage;
		var finish = start + rowPerPage;
		if (finish > this.dataPinjaman.rs.rows.length) finish = this.dataPinjaman.rs.rows.length;
		for (var i = start;i < finish;i++){
			line = this.dataPinjaman.rs.rows[i];
			this.sg1.appendData([line.no_kontrak,line.kode_agg,line.nama,line.cicilan_ke,line.tgl_angs,floatToNilai(line.npokok),floatToNilai(line.nbunga),floatToNilai(line.ntagih),floatToNilai(line.angsuran),line.akun_piutang,line.akun_pjasa,line.no_pinj]);
		}
		this.sg1.validasi();
		this.sg1.setNoUrut(start);
		this.page = page;		
	},
	selectLoad: function(page){
		if (this.dataUpload === undefined) return;
		this.p3.sg.clear();
		var rowPerPage = 30;
		var start = (page - 1) * rowPerPage;
		var finish = start + rowPerPage;
		if (finish > this.dataAsli.rows.length) finish = this.dataAsli.rows.length;
		for (var i = start;i < finish;i++){
			line = this.dataAsli.rows[i];
			line = this.dataUpload.get(trim(line.kode_agg));
			if (line) this.p3.sg.appendData([trim(line.kode_agg), line.nama, floatToNilai(line.ntagih), floatToNilai(line.nilai_angs), floatToNilai(line.terpakai)]);
		}
		this.p3.sg.setNoUrut(start);
		this.page2 = page;				
	},
	doPager: function(sender, page){
		if (sender == this.sgn) this.selectPage(page);
		if (sender == this.p3.sgn) this.selectLoad(page);
		if (sender == this.p4.sgn) this.selectLoad(page);		
	},	
	doVisible: function(sender){				
		if (sender == this.bUpload) {
			this.p3.setVisible(!this.p3.visible);
			if (this.p3.visible) this.selectLoad(1);
		}
		if (sender == this.bInvalid) this.p4.setVisible(!this.p4.visible);
		if (sender == this.bLoadInv) this.p5.setVisible(!this.p5.visible);
	},
	doChangeCell2: function(sender, col, row){
		sender.onChange.set(this,undefined);
		var ix = -1;
		for (var i=0;i < sender.getRowCount();i++){
			if (sender.cells(0,i) == "APP"){
				if (ix > -1) sender.cells(0,ix,"INPROG");
				ix = i;
				this.eAngs.setText(sender.cells(5,i));
			}
		}
		sender.onChange.set(this,"doChangeCell2");
	}
});

