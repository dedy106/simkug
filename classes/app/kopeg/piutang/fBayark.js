window.app_kopeg_piutang_fBayark = function(owner)
{
	if (owner)
	{
		window.app_kopeg_piutang_fBayark.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_piutang_fBayark";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan Pembayaran Piutang : Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode", readOnly:true, tag: 2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[720,11,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
		this.e_kb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti", readOnly: true});
		this.b_gen = new portalui_button(this,{bound:[275,13,80,18],caption:"Generate",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[720,13,200,20],caption:"No Bukti Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,24,250,20],caption:"No Dokumen", maxLength: 50,tag:1});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,25,480,20],caption:"Keterangan", maxLength: 150,tag:1});				
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,26,200,20],caption:"Penerima",btnClick:[this,"doBtnClick"], tag:1});		
		this.cbbSpb = new portalui_saiCBB(this,{bound:[720,26,200,20],caption:"No SPB/TAK", btnClick:[this,"doBtnClick"], tag:9,btnRefreshClick:[this,"doLoadDataSPB"]});
		this.cb_jenis = new portalui_saiCB(this,{bound:[20,18,180,20],caption:"Jenis Bayar",items:["INPUT","BATAL"],tag:2,change:[this,"doChange"]});
		this.cb_akunim = new portalui_saiCBBL(this,{bound:[20,30,200,20],caption:"Akun KB IM",multiSelection:false});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[720,30,200,20],caption:"Total Tagihan",tipeText:ttNilai,alignment:alLeft, readOnly:true, text:"0",tag:1});
		this.cb_pph = new portalui_saiCBBL(this,{bound:[20,29,200,20],caption:"Akun PPh",btnClick:[this,"doBtnClick"], tag:1});
		this.e_kas = new portalui_saiLabelEdit(this,{bound:[720,29,200,20],caption:"Total Pembayaran",tipeText:ttNilai,alignment:alLeft, readOnly:true, text:"0",tag:1});
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,20,200,20],caption:"PP/Unit Kerja",btnClick:[this,"doBtnClick"],tag:1,readOnly:true});
		this.e_pph = new portalui_saiLabelEdit(this,{bound:[720,20,200,20],caption:"Nilai PPh",tipeText:ttNilai,alignment:alLeft,readOnly:true,text:"0",tag:1});
		this.cb_cust = new portalui_saiCBB(this,{bound:[20,18,200,20],caption:"Customer",btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"],tag:1,readOnly:true});		
		this.i_viewer = new portalui_imageButton(this,{bound:[250,18,20,20],hint:"Tampil Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_adm = new portalui_saiLabelEdit(this,{bound:[720,18,200,20],caption:"Nilai Adm",tipeText:ttNilai,alignment:alLeft,change :[this,"doChange"],tag:1});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,290],caption:"Data Invoice"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,265],colCount:8,colTitle:["No Invoice","Tanggal","Keterangan","Akun AR","Nama Akun","Sisa Tagihan","Nilai Pelunasan","Nilai PPh"],
					colWidth:[[0,1,2,3,4,5,6,7],[100,80,300,60,80,80,80,80]], colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],defaultRow:1, 
					columnReadOnly:[true,[0,1,2,3,4,5],[6]],change:[this,"doChangeCell"],
					change:[this, "doSgChange"],autoAppend:false});						
					
		this.p2 = new portalui_panel(this,{bound:[20,36,900,240],caption:"Data SPB/TAK"});
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,190],colCount:10,tag:9,
					colTitle:["Status","Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9],[60,80,100,200,50,100,60,100,60,100]],colFormat:[[5],[cfNilai]],
					buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,7,8,9],[0]],nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCell2"],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[0,215,900,25],buttonStyle:2,grid:this.sg2});		
		
		this.rearrangeChild(10, 22);		
		setTipeButton(tbUbahHapus);
		this.setTabChildIndex();
		try
		{		    
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
		    
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();						
			this.jurnal = new app_saku_fJurnalViewer(this.app,{bound:[0,0,system.screenWidth,system.screenHeight],visible:false});									
			
			var data = this.dbLib.getDataProvider("select a.kode_spro,a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun "+
			                                      "where a.kode_spro in ('ARUMAD') and a.kode_lokasi = '"+this.app._lokasi+"' "); //'ARUMIM',
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					//if (line.kode_spro == "ARUMIM") {this.akunIM = line.flag; this.namaIM = line.nama;}
					if (line.kode_spro == "ARUMAD") {this.akunAD = line.flag; this.namaAD = line.nama;}
				}
			}
			var prd = this.dbLib.getDataProvider("select distinct periode from kop_arbayar_m where kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);
			this.e_adm.setText("0");
			this.cb_pph.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='015'",["a.kode_akun","a.nama"],true);
			this.cb_app.setSQL("select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],true);
			this.sg.onCellEnter.set(this,"doCellEnter");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_piutang_fBayark.extend(window.portalui_childForm);
window.app_kopeg_piutang_fBayark.implement({
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
			
			if (this.e_pph.getText() != "0") this.cb_pph.setTag("0");
			else this.cb_pph.setTag("9");
			if (parseFloat(this.perLama) < parseFloat(this.app._periode)) this.e_kb.setTag("0");
			else this.e_kb.setTag("9");
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					this.akunIM = this.cb_akunim.getText();
					
					if (this.cbbSpb.getText() != "" && this.cbbSpb.getText() != "-") {
						if (this.cb_jenis.getText() == "INPUT") var vProg = "0";
						else var vProg = "2"; //1 angsuran biasa sudah disetor, 2 = batal piutang 
					}
					
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_arbayar_m","no_bukti",this.app._lokasi+"-AAR"+this.e_periode.getText().substr(2,4)+".","00000"));								
						sql.add(" update kop_arbayar_m set no_link='"+this.e_kb.getText()+"',no_del = concat(no_bukti,'r') where no_bukti ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_arbayar_m (no_bukti,no_dokumen,keterangan,tanggal,nilai,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,nilai_pph,akun_pph,nilai_adm,no_spb) "+
							    " select concat(no_bukti,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,jenis,'X',akun_ar,'"+this.e_periode.getText()+"',kode_lokasi,'F',kurs,kode_curr,kode_pp,no_bukti,'-',nik_app,'"+this.app._userLog+"',now(),nilai_pph,akun_pph,nilai_adm,no_spb "+
								" from kop_arbayar_m where no_bukti = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_arbayar_j (no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_bukti,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_arbayar_j where no_bukti = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_arbayar_d (no_bukti,no_ar,periode,akun_ar,nilai,nilai_pph,kode_lokasi,dc)"+
								" select concat(no_bukti,'r'),no_ar,'"+this.e_periode.getText()+"',akun_ar,nilai,nilai_pph,kode_lokasi,'C' "+ 
								" from kop_arbayar_d where no_bukti = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");						
						this.nb = this.e_kb.getText();
					}
					else{
						sql.add("delete from kop_arbayar_m where no_bukti='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_arbayar_j where no_bukti='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_arbayar_d where no_bukti ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");									
						this.nb = this.cb_nbLama.getText();
					}
					sql.add("insert into kop_arbayar_m(no_bukti,no_dokumen,keterangan,tanggal,nilai,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,nilai_pph,akun_pph,nilai_adm,no_spb) values  "+
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_kas.getText())+",'ARBYR','"+vProg+"','"+this.akunIM+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','F',1,'IDR','"+this.app._kodePP+"','-','-','"+this.cb_app.getText()+"','"+this.app._userLog+"',now(),"+parseNilai(this.e_pph.getText())+",'"+this.cb_pph.getText()+"',"+parseNilai(this.e_adm.getText())+",'"+noSPB+"')");
					for (var i=0; i < this.sg.rows.getLength(); i++){
						if (this.sg.rowValid(i)){
							if (nilaiToFloat(this.sg.cells(6,i)) != 0){
								sql.add("insert into kop_arbayar_d (no_bukti,no_ar,periode,akun_ar,nilai,nilai_pph,kode_lokasi,dc) values "+
								        "('"+this.nb+"','"+this.sg.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.sg.cells(3,i)+"',"+parseNilai(this.sg.cells(6,i))+","+parseNilai(this.sg.cells(7,i))+",'"+this.app._lokasi+"','D')");
							}
						}
					}
					this.createJurnal();					
					var d = "insert into kop_arbayar_j(no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input )values";
					for (var i in this.dataJurnal.rs.rows){
						if (i >0) d+=",";
						line = this.dataJurnal.rs.rows[i];
						d+="('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+line.kode_akun+"','"+this.e_ket.getText()+"','"+line.dc+"',"+line.nilai+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','ARUM','"+line.kode_drk+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}
					sql.add(d);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_kb);
					this.sg.clear(1);
				}
				break;			
			case "ubah" :	
				if (this.cbbSpb.getText()!="") {
					var temu = 0;
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.cells(0,i) == "APP"){
							temu++;
							this.cb_akunim.setText(this.sg2.cells(1,i),this.sg2.cells(2,i)); // <-- akun IM diganti dgn akun SPBnya
						}
					}
					if (temu == 0 || temu > 1) {
						system.alert(this,"SPB tidak valid.","Pilihan status APP harus satu baris saja.");
						return false;
					}
				}
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))){
					system.alert(this,"Transaksi sudah diposting tidak dapat dikoreksi.","Lakukan Unposting dahulu, untuk koreksi.");
					return false;
				}
				if (nilaiToFloat(this.e_kas.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if ((this.dp_d1.toSysDate() < new Date().strToDate(this.sg.getCell(1,i))) && (this.sg.getCell(6,i) != "0")) {
							system.alert(this,"Tanggal tidak valid.","Tanggal kurang dari tgl invoice. Baris["+i+"]");
							return false;   
						}
						if (nilaiToFloat(this.sg.getCell(6,i)) > nilaiToFloat(this.sg.getCell(5,i))){
							system.alert(this,"Nilai bayar tidak valid.","Melebihi sisa piutang. Baris["+i+"]");
							return false;   
						}
					}
				}
				if (parseFloat(this.perLama) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode bukti lama.");
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
			case "hapus" : 
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add(" update kop_arbayar_m set no_del = concat(no_bukti,'r') where no_bukti ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_arbayar_m (no_bukti,no_dokumen,keterangan,tanggal,nilai,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,nilai_pph,akun_pph,nilai_adm,no_spb) "+
							    " select concat(no_bukti,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,jenis,'X',akun_ar,'"+this.e_periode.getText()+"',kode_lokasi,'F',kurs,kode_curr,kode_pp,no_bukti,'-',nik_app,'"+this.app._userLog+"',now(),nilai_pph,akun_pph,nilai_adm,no_spb "+
								" from kop_arbayar_m where no_bukti = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_arbayar_j (no_bukti,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_bukti,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_arbayar_j where no_bukti = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_arbayar_d (no_bukti,no_ar,periode,akun_ar,nilai,nilai_pph,kode_lokasi,dc)"+
								" select concat(no_bukti,'r'),no_ar,'"+this.e_periode.getText()+"',akun_ar,nilai,nilai_pph,kode_lokasi,'C' "+ 
								" from kop_arbayar_d where no_bukti = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");					
					}
					else{
						sql.add("delete from kop_arbayar_m where no_bukti='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_arbayar_j where no_bukti='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_arbayar_d where no_bukti ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");								
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;	
		}
	},
	doChange: function(sender){
		try{			
			if (sender  == this.e_adm) {
				if (this.e_pph.getText() != "" && this.e_adm.getText() != "") {
					this.sg.validasi();
					this.e_kas.setText(floatToNilai(this.nkas - nilaiToFloat(this.e_pph.getText()) - nilaiToFloat(this.e_adm.getText())));
					this.cb_pph.setTag("0");
				}
				else this.cb_pph.setTag("9");
			}
			if (sender == this.cb_jenis) {
				this.cb_akunim.setText("","");
				if (this.cb_jenis.getText() == "INPUT")
					this.cb_akunim.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='029'",["a.kode_akun","a.nama"],false, ["Kode Akun","Nama"],"and","Daftar Akun Kas IM", false);
				else
					this.cb_akunim.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='022'",["a.kode_akun","a.nama"],false, ["Kode Akun","Nama"],"and","Daftar Akun Kas IM", false);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoadData: function(sender){
		try{			
			if (this.cb_nbLama.getText() != "") {
				this.sg.clear(1);
				var data = this.dbLib.getDataProvider("select a.no_dokumen,a.keterangan,a.periode,a.tanggal,a.posted,a.kode_pp,a.nik_app,a.nilai_pph,a.nilai_adm,a.akun_pph,a.akun_ar as akun_im,aa.nama as nama_im,a.progress,a.no_spb,"+
				                                      "       b.nama as nama_app,ifnull(c.nama,'-') as nama_pph,d.nama as nama_pp,f.kode_cust, "+
													  "       f.no_ar,date_format(f.tanggal,'%d/%m/%Y')as tanggal,f.keterangan as ket,f.akun_ar,(f.nilai+f.nilai_ppn)-ifnull(y.totbayar,0)-ifnull(z.totrekon,0) as sisa,j.nama as nama_akun,e.nilai,e.nilai_pph "+
				                                      "from kop_arbayar_m a "+
													  "                 inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+
													  "                 inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
													  "                 inner join kop_arbayar_d e on a.no_bukti=e.no_bukti and a.kode_lokasi=e.kode_lokasi "+
													  "                 inner join kop_ar_m f on e.no_ar=f.no_ar and e.kode_lokasi=f.kode_lokasi "+
													  "	                inner join masakun j on f.akun_ar = j.kode_akun and f.kode_lokasi = j.kode_lokasi "+					
													  "	                inner join masakun aa on a.akun_ar = aa.kode_akun and a.kode_lokasi = aa.kode_lokasi "+					
													  "                 left outer join masakun c on a.akun_pph=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
													  "                 left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as totbayar "+
													  "                                  from kop_arbayar_d where no_bukti <> '"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
													  "                                  group by no_ar,kode_lokasi) y on y.no_ar=f.no_ar and y.kode_lokasi=f.kode_lokasi "+
													  "                 left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as totrekon from kop_rekon_d where kode_lokasi='"+this.app._lokasi+"' group by no_ar,kode_lokasi) z on z.no_ar=f.no_ar and z.kode_lokasi=f.kode_lokasi "+
													  "where a.no_bukti = '"+this.cb_nbLama.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						if (line !== undefined)
							this.sg.appendData([line.no_ar,line.tanggal,line.ket,line.akun_ar,line.nama_akun,floatToNilai(line.sisa),floatToNilai(line.nilai),floatToNilai(line.nilai_pph)]);
					}
					this.doSgChange(this.sg, 5, 0);
					
					this.perLama = line.periode;
					this.posted = line.posted;
					if (line.progress == "0") this.cb_jenis.setText("INPUT");
					else this.cb_jenis.setText("BATAL");
					
					this.e_periode.setText(line.periode);
					this.dp_d1.setText(line.tanggal);
					
					if (line.no_spb != "-") {
						this.cbbSpb.setText(line.no_spb);
						this.cb_akunim.setReadOnly(true);
					}
					else {
						this.cbbSpb.setText("");
						this.cb_akunim.setReadOnly(false);
					}
					
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.cb_akunim.setText(line.akun_im,line.nama_im);
					this.cb_pp.setText(line.kode_pp,line.nama_pp);
					this.cb_app.setText(line.nik_app,line.nama_app);
					this.cb_cust.setText(line.kode_cust);
					if (line.nama_pph != "-") this.cb_pph.setText(line.akun_pph,line.nama_pph);
					this.e_adm.setText(floatToNilai(line.nilai_adm));
					this.e_pph.setText(floatToNilai(line.nilai_pph));
				}								
			} 
			else {
				system.alert(this,"Bukti Lama tidak valid.","No Bukti Lama harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cbbSpb) {   
				this.standarLib.showListData(this, "Daftar Bukti SPB/TAK",sender,undefined, 
										  "select  * from "+
										  "(select no_spb,keterangan,'SPB' as jenis from spb_m where kode_lokasi = '"+this.app._lokasi+"'  "+
										  " union "+
										  " select no_ju as no_spb,keterangan,'TAK' as jenis from ju_m where kode_lokasi = '"+this.app._lokasi+"' and jenis='TAK' "+
										  " ) as A ", 										  
										  "select count(no_spb)     from (select no_spb, keterangan, 'SPB' as jenis from spb_m where kode_lokasi = '"+this.app._lokasi+"' "+
										  "union "+
										  "select no_ju as no_spb, keterangan, 'TAK' as jenis from ju_m where kode_lokasi = '"+this.app._lokasi+"' and jenis='TAK'  ) as b ",
										  ["no_spb","keterangan","jenis"],"WHERE",["No SPB/TAK","Deskripsi","Jenis"],false);				
				this.sg2.clear(1);
			}
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Bukti",sender,undefined, 
											  "select no_bukti,no_dokumen from kop_arbayar_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' and progress in ('0','2')", 
											  "select count(no_bukti)     from kop_arbayar_m where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-' and progress in ('0','2')", 
											  ["no_bukti","no_dokumen"],"and",["No Bukti","No Dokumen"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg.clear(1);
			}
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan Penerima",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}			
			if (sender == this.cb_pph){
				this.standarLib.showListData(this, "Daftar Akun PPh", sender, undefined,
											"select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='015'",
											"select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='015'",
											["kode_akun","nama"],"and",["Kode Akun","Nama"]);
			}
			if (sender == this.cb_akunim){
				if (this.cb_akunim.isReadOnly() == false) {
					if (this.cb_jenis.getText() == "INPUT") {
						this.standarLib.showListData(this, "Daftar Akun KB IM", sender, undefined,
												"select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='029'",
												"select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='029'",
												["kode_akun","nama"],"and",["Kode Akun","Nama"]);
					}
					else {
						this.standarLib.showListData(this, "Daftar Akun Pdpt", sender, undefined,
												"select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='022'",
												"select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='022'",
												["kode_akun","nama"],"and",["Kode Akun","Nama"]);				
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoadDataSPB: function(sender){
		if (this.cbbSpb.getText() != ""){
			this.cb_akunim.setText("",""); this.cb_akunim.setReadOnly(true);
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
			this.cb_akunim.setText("",""); this.cb_akunim.setReadOnly(false);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No Bukti : "+ this.nb+")");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;		
	    		}    		
			}catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	sgFindBtnClick: function(sender, col, row){		
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.b_gen !== undefined) this.b_gen.click();
	},
	doChangeCell: function(sender, col, row){
		if ((col == 6) && (this.sg.getCell(6,row) != "")){
			this.doSgChange(this.sg, 6, 0);
		}
		if ((col == 7) && (this.sg.getCell(7,row) != "")){
			this.doSgChange(this.sg, 7, 0);
		}
	},
	doChangeCell2: function(sender, col, row){
		if ((col == 0) && (this.sg2.getCell(1,row) != "")){
			this.cb_akunim.setText(this.sg2.cells(1,row),this.sg2.cells(2,row));
		}
	},
	doSgChange: function(sender, col, row){
		if ((col == 5)||(col == 6)||(col == 7)){
			var tot = tot2 = tot3 = 0;			
			for (var i = 0;i < this.sg.getRowCount();i++){
				if (this.sg.cells(5,i) != "") 
					tot += nilaiToFloat(this.sg.cells(5,i));
				if (this.sg.cells(6,i) != "") 
					tot2 += nilaiToFloat(this.sg.cells(6,i));
				if ((this.sg.cells(7,i) != "") && (this.sg.cells(6,i) != "0")) 
					tot3 += nilaiToFloat(this.sg.cells(7,i));
			}
			this.e_nilai.setText(floatToNilai(tot));
			this.e_pph.setText(floatToNilai(tot3));
			this.nkas = tot2;
			this.e_kas.setText(floatToNilai(this.nkas -  tot3 - nilaiToFloat(this.e_adm.getText())));
		}
	},
	createJurnal: function(){				
		try{
			this.e_kas.setText(floatToNilai(this.nkas -  tot3 - nilaiToFloat(this.e_adm.getText())));
			var rows = [];
			var vKet = '-';
			if (this.e_ket.getText() != "") vKet = this.e_ket.getText();
			this.akunIM = this.cb_akunim.getText(); this.namaIM = this.cb_akunim.rightLabelCaption;
			rows[rows.length] = {kode_akun:this.akunIM, nama: this.namaIM,dc:"D", keterangan:vKet, nilai: nilaiToFloat(this.e_kas.getText()),kode_pp:this.app._kodePP, kode_drk:'ARIM'};
			if (this.e_adm.getText() != "0") rows[rows.length] = {kode_akun:this.akunAD, nama: this.namaAD,dc:"D", keterangan:vKet, nilai: nilaiToFloat(this.e_adm.getText()),kode_pp:this.app._kodePP, kode_drk:'ARADM'};
			if (this.e_pph.getText() != "0") rows[rows.length] = {kode_akun:this.cb_pph.getText(), nama:this.cb_pph.getRightLabelCaption(),dc:"D", keterangan:vKet, nilai: nilaiToFloat(this.e_pph.getText()),kode_pp:this.app._kodePP, kode_drk:'ARPPH'};
			
			for (var i=0;i < this.sg.getRowCount();i++){
				if (nilaiToFloat(this.sg.cells(6,i)) != 0){
					var temu = false;
					for (var j in rows){
						if (rows[j].kode_akun == this.sg.cells(3,i) && rows[j].dc == "C"){
							rows[j].nilai += nilaiToFloat(this.sg.cells(6,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(3,i),nama:this.sg.cells(4,i),dc:"C", keterangan:vKet, nilai: nilaiToFloat(this.sg.cells(6,i)),kode_pp:this.app._kodePP, kode_drk:'ARAKRU'};
					}
				}
			} 
			this.dataJurnal = {rs: { 	rows:rows,
										fields : { 	kode_akun : {type:"S",length:80},
													nama :{type:"S",length:200},
													dc:{type:"S",length:50},
													keterangan:{type:"S",length:200},
													nilai:{type:"N", length:100},
													kode_pp:{type:"S",length:100},
													kode_drk:{type:"S",length:100}
											}
								   }
							};		
		}catch(e){
			system.alert(this,e,"");
		}
	},
	doCellEnter: function(sender, col, row){
		if (col == 6) {
			this.sg.setCell(6,row,this.sg.cells(5,row));
		}
	},
	doClick:function(sender){
		if (sender == this.b_gen) {
			this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_arbayar_m","no_bukti",this.app._lokasi+"-AAR"+this.e_periode.getText().substr(2,4)+".","00000"));		
			this.e_dok.setFocus();
		}
		if (sender == this.i_viewer){
			this.createJurnal();			
			this.jurnal.setData(this.dataJurnal);
			this.jurnal.show();
		}
	}	
});