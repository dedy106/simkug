window.app_kopeg_simpanan_transaksi_fAngsur = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_transaksi_fAngsur.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_simpanan_transaksi_fAngsur";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan Angsuran Simpanan: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiCBB;portalui_saiEdit;portalui_datePicker;portalui_saiGrid");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Angsuran",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.cbbPerLama = new portalui_saiCB(this,{bound:[720,14,200,20],caption:"Periode SPB/TAK",mustCheck: false, tag:9});
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,343,20],caption:"Keterangan", maxLength:150});				
		this.cbbSpb = new portalui_saiCBB(this,{bound:[720,15,200,20],caption:"No SPB/TAK Pot.", btnClick:[this,"doBtnClick"], tag:9,btnRefreshClick:[this,"doLoadDataSPB"]});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Penerima",btnClick:[this,"doBtnClick"],tag:2});		
		this.cb_agg = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Nasabah",btnClick:[this,"doBtnClick"],tag:1,change:[this,"doChange"]});
		this.cb_simp = new portalui_saiCBBL(this,{bound:[20,18,250,20],caption:"No Kartu",btnClick:[this,"doBtnClick"],tag:1,rightLabelVisible:false});
		this.e_saldo = new portalui_saiLabelEdit(this,{bound:[500,18,200,20],caption:"Saldo Deposit",tipeText:ttNilai,readOnly: true,text:0,tag:1});
		this.e_sls = new portalui_saiLabelEdit(this,{bound:[720,18,200,20],caption:"Nilai Selisih",tipeText:ttNilai,readOnly: true,text:0,tag:1});		
		this.e_angsur = new portalui_saiLabelEdit(this,{bound:[20,19,230,20],caption:"Angsuran",tipeText:ttNilai,change:[this,"doChange"],tag:1});
		this.i_viewer = new portalui_imageButton(this,{bound:[250,19,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungClick"]});
		this.bTampil = new portalui_button(this,{bound:[280,19,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		this.e_depo = new portalui_saiLabelEdit(this,{bound:[500,19,200,20],caption:"Deposit Terpakai",tipeText:ttNilai,change:[this,"doChange"],tag:1});
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[720,19,200,20],caption:"Total Simpanan",tipeText:ttNilai,readOnly: true, tag:1,change:[this,"doChange"]});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,290],caption:"Daftar Tagihan Simpanan"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,265],colCount:8,tag:2,colTitle:["Status","No Kartu","Jenis","No Bukti","Keterangan","Periode","Akun Piut.","Nilai"],
					colWidth:[[0,1,2,3,4,5,6,7],[80,120,80,120,230,60,60,100]],colFormat:[[7],[cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["CAIR","BELUM"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,7],[0]],change:[this,"doChangeCell"],autoAppend:false,
					defaultRow:1,nilaiChange:[this,"doSgChange"]});				
		this.p2 = new portalui_panel(this,{bound:[20,36,900,240],caption:"Data SPB/TAK"});
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,190],colCount:10,tag:9,
					colTitle:["Status","Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9],[60,80,100,200,50,100,60,100,60,100]],colFormat:[[5],[cfNilai]],
					buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,7,8,9],[0]],nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCell2"],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[0,215,900,25],buttonStyle:2,grid:this.sg2});		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.e_angsur.setText("0");
			this.e_depo.setText("0");
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('SIMPIM','SIMPTP','SIMPOE','SIMPNE') and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "SIMPIM") this.akunIM2 = line.flag;
					if (line.kode_spro == "SIMPTP") this.akunTP = line.flag;
					if (line.kode_spro == "SIMPOE") this.akunOE = line.flag;
					if (line.kode_spro == "SIMPNE") this.nilaiOE = parseFloat(line.value1);
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
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_simpanan_transaksi_fAngsur.extend(window.portalui_childForm);
window.app_kopeg_simpanan_transaksi_fAngsur.implement({
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
			if (this.cbbSpb.getText() == "" || this.cbbSpb.getText() == "-") {this.sg2.setTag(9); var vProg = "0"; var noSPB = "-";}
			else {this.sg2.setTag(1); var vProg = "1"; var noSPB = this.cbbSpb.getText();}
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpangs_m","no_angs",this.app._lokasi+"-SA"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();										
					sql.add("insert into kop_simpangs_m(no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_lain,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,no_spb) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_angsur.getText())+","+parseNilai(this.e_depo.getText())+","+parseNilai(this.e_sls.getText())+",'SIMPANGS','"+vProg+"','"+this.akunIM+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','F',1,'IDR','"+this.app._kodePP+"','-','-','"+this.cb_app.getText()+"','"+this.app._userLog+"',now(),'"+noSPB+"')");
					
					var idx = 0;
					if (nilaiToFloat(this.e_sls.getText()) > 0){
						idx++;
						sql.add("insert into kop_simpangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							    "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.akunTP+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_sls.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','ANGS_TP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");							
						sql.add("insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
							    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_sls.getText())+",'"+this.cb_agg.getText()+"','SIMP','ANGS_SLS','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cb_app.getText()+"','-','-',1,'IDR','"+this.app._userLog+"',now())");					
					} 
					else {
						if (nilaiToFloat(this.e_sls.getText()) < 0){
							idx++;
							var n_sls = Math.abs(nilaiToFloat(this.e_sls.getText()));
							sql.add("insert into kop_simpangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
								    "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.akunOE+"','"+this.e_desc.getText()+"','D',"+n_sls+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','ANGS_OE','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");							
						}
					}					
					if (nilaiToFloat(this.e_depo.getText()) > 0){
						idx++;
						sql.add("insert into kop_simpangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							    "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.akunTP+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_depo.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','ANGS_DP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");
						sql.add("insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
							    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_depo.getText())+",'"+this.cb_agg.getText()+"','SIMP','ANGS_PKI','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cb_app.getText()+"','-','-',1,'IDR','"+this.app._userLog+"',now())");											
					}
					idx++;
					sql.add("insert into kop_simpangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.akunIM+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_angsur.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','ANGS_IM','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");							
					var d="insert into kop_simpangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var s="insert into kop_simpangs_d (no_angs,no_simp,no_bill,akun_ar,nilai,kode_lokasi,dc) values ";
					var z = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (this.sg.cells(0,i) == "CAIR") {
								if (z > 0) d+= ","; if (z > 0) s+= ",";
								idx++;
								d += "('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg.cells(6,i)+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.sg.cells(7,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','ANGS_AR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
								s += "('"+this.e_nb.getText()+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(6,i)+"',"+parseNilai(this.sg.cells(7,i))+",'"+this.app._lokasi+"','D')";
								z++;
							}
						}
					}						
					sql.add(d); sql.add(s);
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
					this.sg.clear(1);
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
				if (nilaiToFloat(this.e_depo.getText() < 0)){
					system.alert(this,"Transaksi tidak valid.","Nilai pengambilan deposit tidak boleh kurang dari nol.");
					return false;
				}
				var nilai = nilaiToFloat(this.e_angsur.getText()) + nilaiToFloat(this.e_depo.getText());
			    if (nilai <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai pencairan tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (nilaiToFloat(this.e_depo.getText()) > nilaiToFloat(this.e_saldo.getText())){
					system.alert(this,"Transaksi tidak valid.","Nilai pengambilan deposit tidak boleh melebihi dari saldo.");
					return false;
				}
				if ((nilaiToFloat(this.e_sls.getText()) < 0) && (Math.abs(nilaiToFloat(this.e_sls.getText())) > this.nilaiOE)){
					system.alert(this,"Transaksi tidak valid.","Selisih kurang angsuran tidak boleh kurang dari batas OE ["+floatToNilai(this.nilaiOE)+"].");
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
	doChange: function(sender){
		try{			
			if (sender == this.cb_agg){
				if (this.cb_agg.getText() != "") {
					var data = this.dbLib.getDataProvider("select ifnull(sum(case dc when 'D' then nilai else -nilai end),0) as saldo from kop_depo where kode_agg ='"+this.cb_agg.getText()+"' and modul in ('SIMP','PINJ') and jenis <> 'UDP' and kode_lokasi = '"+this.app._lokasi+"'");
					eval("data = "+data+";");
					if (typeof data == "object"){
						var line = data.rs.rows[0];
						this.e_saldo.setText(floatToNilai(line.saldo));
					}
				}
			}
			else {
				if ((this.e_angsur.getText != "") && (this.e_depo.getText != "") && (this.e_tot.getText != "")){
					var sls = nilaiToFloat(this.e_angsur.getText()) +  nilaiToFloat(this.e_depo.getText()) -  nilaiToFloat(this.e_tot.getText());
					this.e_sls.setText(floatToNilai(sls));
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpangs_m","no_angs",this.app._lokasi+"-SA"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
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
	doTampilClick: function(sender){
		try{			
			if (this.cb_simp.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_simp,a.jenis,b.nilai-ifnull(d.bayar,0) as saldo,b.akun_ar,b.periode,b.no_bill,c.keterangan as ket "+
                                                      "from  kop_simp_m a inner join kop_simp_d b on a.no_simp=b.no_simp  and a.kode_lokasi=b.kode_lokasi "+
													  "                   inner join kop_simpbill_m c on b.no_bill=c.no_bill and b.kode_lokasi=c.kode_lokasi and c.no_del='-' "+
									                  "         left outer join "+  //<----------DC gak dilihat ...karena dibutuhkan saldo posisi terakhir
									                  "              (select y.no_simp, y.no_bill, y.kode_lokasi, sum(y.nilai) as bayar "+
									                  "               from kop_simpangs_d y inner join kop_simpangs_m x on y.no_angs=x.no_angs and y.kode_lokasi=x.kode_lokasi "+
									                  "               where y.no_simp = '"+this.cb_simp.getText()+"' and x.no_del='-' "+
									                  "               group by y.no_simp, y.no_bill, y.kode_lokasi) d on b.no_simp=d.no_simp and b.no_bill=d.no_bill and b.kode_lokasi=d.kode_lokasi "+
									                  "where  a.no_simp = '"+this.cb_simp.getText()+"' and b.nilai>ifnull(d.bayar,0) and a.kode_lokasi= '"+this.app._lokasi+"' order by a.no_simp,b.periode");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["BELUM",line.no_simp,line.jenis,line.no_bill,line.ket,line.periode,line.akun_ar,floatToNilai(line.saldo)]);
					}
					this.sg.validasi();
				}
			}
			else {
				system.alert(this,"Kartu simpanan tidak valid.","Kartu Simpanan harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doHitungClick: function(sender){
		try{			
			var nilai = nilaiToFloat(this.e_angsur.getText()) + nilaiToFloat(this.e_depo.getText());
			this.e_sls.setText("0");
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)){
					this.sg.setCell(0,i,"BELUM");
				}
			}
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i)){
					if (nilai >= nilaiToFloat(this.sg.cells(7,i))) {
						this.sg.setCell(0,i,"CAIR");
						nilai = nilai - nilaiToFloat(this.sg.cells(7,i));
					}
				}
			}
			this.e_sls.setText(floatToNilai(nilai));
			this.sg.validasi();			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cbbSpb) {   
				this.standarLib.showListData(this, "Daftar Bukti SPB/TAK",sender,undefined, 
										  "select  * from "+
										  "(select no_spb,keterangan,'SPB' as jenis from spb_m where kode_lokasi = '"+this.app._lokasi+"' and periode ='"+this.cbbPerLama.getText()+"' "+
										  " union "+
										  " select no_ju as no_spb,keterangan,'TAK' as jenis from ju_m where kode_lokasi = '"+this.app._lokasi+"' and jenis='TAK' and periode ='"+this.cbbPerLama.getText()+"' "+
										  " ) as A ", 										  
										  "select count(no_spb) from "+
										  "(select no_spb from spb_m where kode_lokasi = '"+this.app._lokasi+"' and periode ='"+this.cbbPerLama.getText()+"' "+
										  " union "+
										  " select no_ju as no_spb from ju_m where kode_lokasi = '"+this.app._lokasi+"' and jenis='TAK' and periode ='"+this.cbbPerLama.getText()+"' ) as b ",
										  ["no_spb","keterangan","jenis"],"WHERE",["No SPB/TAK","Deskripsi","Jenis"],false);				
				this.sg2.clear(1);
			}
			if (sender == this.cb_simp) {				
				this.standarLib.showListData(this,"Daftar Kartu Simpanan",sender,undefined, 
											  "select a.no_simp, b.nama as kode_simp  from kop_simp_m a inner join kop_simp_jenis b on a.kode_simp=b.kode_simp and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_agg='"+this.cb_agg.getText()+"'",
											  "select count(no_simp) from kop_simp_m where kode_lokasi='"+this.app._lokasi+"' and kode_agg='"+this.cb_agg.getText()+"'",
											  ["no_simp","kode_simp"],"and",["No Kartu","Jenis"],false);				
				this.sg.clear(1);
			}
			if (sender == this.cb_agg) {				
				this.standarLib.showListData(this,"Daftar Nasabah",sender,undefined, 
											  "select kode_agg, nama  from kop_agg where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_agg) from kop_agg where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_agg","nama"],"and",["Kode","Nama"],false);				
				this.cb_simp.setText("");
				this.sg.clear(1);
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
	doChangeCell: function(sender, col, row){
		if ((col == 0) && (this.sg.getCell(0,row) != "")){
			this.sg.validasi();
		}
	},
	doSgChange: function(sender, col, row){
		var tot1 = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if ((this.sg.cells(0,i) == "CAIR")&&(this.sg.cells(7,i) != ""))
				tot1 += nilaiToFloat(this.sg.cells(7,i));
		}
		this.e_tot.setText(floatToNilai(tot1));
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
