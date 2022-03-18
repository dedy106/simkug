window.app_kopeg_simpanan_transaksi_fAngsurkolk = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_transaksi_fAngsurkolk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_simpanan_transaksi_fAngsurkolk";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penerimaan Angsuran Kolektif Simp : Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[720,11,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Angsuran",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,13,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[720,13,200,20],caption:"No Angsuran Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,343,20],caption:"No Dokumen", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,343,20],caption:"Keterangan", maxLength:150});				
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Penerima",btnClick:[this,"doBtnClick"],tag:2});		
		this.cbbSpb = new portalui_saiCBB(this,{bound:[720,16,200,20],caption:"No SPB/TAK", btnClick:[this,"doBtnClick"], tag:9,btnRefreshClick:[this,"doLoadDataSPB"]});
		this.cb_loker = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Lokasi Kerja",tag:1,change:[this,"doChange"],readOnly:true});
		this.e_sls = new portalui_saiLabelEdit(this,{bound:[720,17,200,20],caption:"Nilai Selisih",tipeText:ttNilai,readOnly: true,text:0,tag:1});		
		this.e_angsur = new portalui_saiLabelEdit(this,{bound:[20,18,230,20],caption:"Nilai Angsur Kol.",tipeText:ttNilai,change:[this,"doChange"],tag:1});
		this.i_viewer = new portalui_imageButton(this,{bound:[250,18,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungClick"]});
		this.e_tot = new portalui_saiLabelEdit(this,{bound:[720,18,200,20],caption:"Total Simpanan",tipeText:ttNilai,readOnly: true,tag:1,change:[this,"doChange"]});
		
		this.p1 = new portalui_panel(this,{bound:[20,30,900,320],caption:"Daftar Tagihan Simpanan"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,290],colCount:8,tag:2,colTitle:["Status","No Kartu","Jenis","No Bukti","Keterangan","Nasabah","Akun Piut.","Nilai"],
					colWidth:[[0,1,2,3,4,5,6,7],[80,120,80,120,190,100,60,100]],colFormat:[[7],[cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["CAIR","BELUM"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,7],[0]],change:[this,"doChangeCell"],autoAppend:false,
					defaultRow:1,nilaiChange:[this,"doSgChange"]});				
		
		this.p4 = new portalui_panel(this,{bound:[20,36,900,240],caption:"Data SPB/TAK"});
		this.sg4 = new portalui_saiGrid(this.p4,{bound:[0,20,895,190],colCount:10,tag:9,
					colTitle:["Status","Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9],[60,80,100,200,50,100,60,100,60,100]],colFormat:[[5],[cfNilai]],
					buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					columnReadOnly:[true,[1,2,3,4,5,6,7,8,9],[0]],nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCell2"],autoAppend:true,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.p4,{bound:[0,215,900,25],buttonStyle:2,grid:this.sg4});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.e_angsur.setText("0");
			this.e_tot.setText("0");
		
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('SIMPIM','SIMPOI','SIMPOE','SIMPNE') and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "SIMPIM") this.akunIM2 = line.flag;
					if (line.kode_spro == "SIMPOI") this.akunOI = line.flag;
					if (line.kode_spro == "SIMPOE") this.akunOE = line.flag;
					if (line.kode_spro == "SIMPNE") this.nilaiOE = parseFloat(line.value1);
				}
			}
			var prd = this.dbLib.getDataProvider("select distinct periode from kop_simpangs_m where jenis = 'ANGS_KOL' and kode_lokasi = '"+this.app._lokasi+"' order by periode desc",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_simpanan_transaksi_fAngsurkolk.extend(window.portalui_childForm);
window.app_kopeg_simpanan_transaksi_fAngsurkolk.implement({
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
			if (this.cbbSpb.getText() == "" || this.cbbSpb.getText() == "-" ) {this.sg4.setTag(9); var vProg = "0"; var noSPB = "-";}
			else {this.sg4.setTag(1); var vProg = "1"; var noSPB = this.cbbSpb.getText();}
			if (parseFloat(this.perLama) < parseFloat(this.app._periode)) this.e_nb.setTag("0");
			else this.e_nb.setTag("9");				
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simpangs_m","no_angs",this.app._lokasi+"-SA"+this.e_periode.getText().substr(2,4)+".","0000"));
						sql.add(" update kop_simpangs_m set no_link='"+this.e_nb.getText()+"',no_del = concat(no_angs,'r') where no_angs ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_simpangs_m (no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_lain,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,no_spb) "+
							    " select concat(no_angs,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,nilai_lain,nilai_sls,jenis,'X',akun_ar,'"+this.e_periode.getText()+"',kode_lokasi,'F',kurs,kode_curr,kode_pp,no_angs,'-','"+this.cb_app.getText()+"','"+this.app._useLog+"',now(),no_spb "+
								" from kop_simpangs_m where no_angs = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_simpangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_angs,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_simpangs_j where no_angs = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_simpangs_d (no_angs,no_simp,no_bill,akun_ar,nilai,kode_lokasi,dc)"+
								" select concat(no_angs,'r'),no_simp,no_bill,akun_ar,nilai,kode_lokasi,'C' "+ 
								" from kop_simpangs_d where no_angs = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_depo (no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input)"+
								" select concat(no_depo,'r'),'"+this.dp_d1.getDateString()+"',keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_agg,modul,jenis,'"+this.e_periode.getText()+"',kode_lokasi,kode_pp,'"+this.cb_app.getText()+"',no_depo,'-',kurs,kode_curr,'"+this.app._userLog+"',now() "+ 
								" from kop_depo where no_depo = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");						
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("delete from kop_simpangs_m where no_angs='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_simpangs_j where no_angs='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_simpangs_d where no_angs ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
						sql.add("delete from kop_depo where no_depo ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
						this.nb = this.cb_nbLama.getText();
					}
					
					sql.add("insert into kop_simpangs_m(no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_lain,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,no_spb) values  "+
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_angsur.getText())+",0,"+parseNilai(this.e_sls.getText())+",'ANGS_KOL','0','"+this.akunIM+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','F',1,'IDR','"+this.app._kodePP+"','-','-','"+this.cb_app.getText()+"','"+this.app._userLog+"',now(),'"+noSPB+"')");
					var idx = 0;
					if (nilaiToFloat(this.e_sls.getText()) > 0){
						idx++;
						sql.add("insert into kop_simpangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							    "('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.akunOI+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.e_sls.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','ANGS_TP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");							
						sql.add("insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
							    "('"+this.nb+"','"+this.dp_d1.getDateString()+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_sls.getText())+",'"+this.cb_loker.getText()+"','SIMP','ANGS_SLS','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cb_app.getText()+"','-','-',1,'IDR','"+this.app._userLog+"',now())");					
					} 
					else {
						if (nilaiToFloat(this.e_sls.getText()) < 0){
							idx++;
							var n_sls = Math.abs(nilaiToFloat(this.e_sls.getText()));
							sql.add("insert into kop_simpangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
								    "('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.akunOE+"','"+this.e_desc.getText()+"','D',"+n_sls+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','ANGS_OE','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");							
						}
					}					
					idx++;
					sql.add("insert into kop_simpangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.akunIM+"','"+this.e_desc.getText()+"','D',"+parseNilai(this.e_angsur.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','ANGS_IM','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())");												
					var d="insert into kop_simpangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
					var s="insert into kop_simpangs_d (no_angs,no_simp,no_bill,akun_ar,nilai,kode_lokasi,dc) values ";
					var z = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (this.sg.cells(0,i) == "CAIR") {
								if (z > 0) d+= ","; if (z > 0) s+= ",";
								idx++;
								d += "('"+this.nb+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+idx+",'"+this.sg.cells(6,i)+"','"+this.e_desc.getText()+"','C',"+parseNilai(this.sg.cells(7,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SIMP','ANGS_AR','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
								s += "('"+this.nb+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(6,i)+"',"+parseNilai(this.sg.cells(7,i))+",'"+this.app._lokasi+"','D')";
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
					this.sg4.setTag(9);
					this.sg4.clear(1);					
				}
				break;
			case "ubah" :	
				this.akunIM = this.akunIM2;
				if (this.cbbSpb.getText()!="" && this.cbbSpb.getText() != "-" ) {
					var temu = 0;
					for (var i=0;i < this.sg4.getRowCount();i++){
						if (this.sg4.cells(0,i) == "APP"){
							temu++;
							this.akunIM = this.sg4.cells(1,i); // <-- akun IM diganti dgn akun SPBnya
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
				var nilai = nilaiToFloat(this.e_angsur.getText());
			    if (nilai <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai pencairan tidak boleh kurang dari atau sama dengan nol.");
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
			case "hapus" : 
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						sql.add(" update kop_simpangs_m set no_del = concat(no_angs,'r') where no_angs ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_simpangs_m (no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_lain,nilai_sls,jenis,progress,akun_ar,periode,kode_lokasi,posted,kurs,kode_curr,kode_pp,no_del,no_link,nik_app,nik_user,tgl_input,no_spb) "+
							    " select concat(no_angs,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,nilai_lain,nilai_sls,jenis,'X',akun_ar,'"+this.e_periode.getText()+"',kode_lokasi,'F',kurs,kode_curr,kode_pp,no_angs,'-','"+this.cb_app.getText()+"','"+this.app._useLog+"',now(),no_spb "+
								" from kop_simpangs_m where no_angs = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_simpangs_j (no_angs,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_angs,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_simpangs_j where no_angs = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_simpangs_d (no_angs,no_simp,no_bill,akun_ar,nilai,kode_lokasi,dc)"+
								" select concat(no_angs,'r'),no_simp,no_bill,akun_ar,nilai,kode_lokasi,'C' "+ 
								" from kop_simpangs_d where no_angs = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add(" insert into kop_depo (no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input)"+
								" select concat(no_depo,'r'),'"+this.dp_d1.getDateString()+"',keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_agg,modul,jenis,'"+this.e_periode.getText()+"',kode_lokasi,kode_pp,'"+this.cb_app.getText()+"',no_depo,'-',kurs,kode_curr,'"+this.app._userLog+"',now() "+ 
								" from kop_depo where no_depo = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");						
					}
					else{
						sql.add("delete from kop_simpangs_m where no_angs='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_simpangs_j where no_angs='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_simpangs_d where no_angs ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
						sql.add("delete from kop_depo where no_depo ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");			
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
			if (sender == this.e_angsur){
				if ((this.e_angsur.getText != "") && (this.e_tot.getText != "")){
					var sls = nilaiToFloat(this.e_angsur.getText()) - nilaiToFloat(this.e_tot.getText());
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
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg4.appendData(["INPROG",line.kode_akun,line.nama_akun,line.ket,line.dc.toUpperCase(),floatToNilai(line.sisa),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			}
			this.sg4.validasi();
		}
		else {
			system.alert(this,"SPB/TAK Gaji tidak valid.","No SPB/TAK harus dipilih.");
		}
	},
	doLoadData: function(sender){
		try{			
			if (this.cb_nbLama.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.no_simp,a.jenis,b.nilai-ifnull(d.bayar,0) as saldo,b.akun_ar,b.periode,b.no_bill,c.keterangan as ket,f.nama as nama_agg, "+
													  "       bb.tanggal as tgl_angs,bb.akun_ar,bb.no_spb,bb.periode,bb.posted,bb.no_dokumen,bb.keterangan,bb.nik_app,cc.nama as nama_app,g.kode_loker,g.nama as nama_loker,bb.nilai as n_angs,bb.nilai_lain as n_depo,bb.nilai_sls as n_sls "+
                                                      "from kop_simp_m a inner join kop_simp_d b on a.no_simp=b.no_simp  and a.kode_lokasi=b.kode_lokasi "+
													  "                   inner join kop_simpbill_m c on b.no_bill=c.no_bill and b.kode_lokasi=c.kode_lokasi and c.no_del='-' "+
													  "                   inner join kop_agg f on a.kode_agg=f.kode_agg and a.kode_lokasi=f.kode_lokasi "+
													  "                   inner join kop_loker g on f.kode_loker=g.kode_loker and g.kode_lokasi=f.kode_lokasi "+													  
													  "                   inner join kop_simpangs_d aa on aa.no_simp=a.no_simp and aa.kode_lokasi=a.kode_lokasi and aa.no_bill=c.no_bill and aa.kode_lokasi=c.kode_lokasi "+
													  "                   inner join kop_simpangs_m bb on bb.no_angs=aa.no_angs and aa.kode_lokasi=bb.kode_lokasi "+
									                  "                   inner join karyawan cc on bb.nik_app=cc.nik and aa.kode_lokasi=cc.kode_lokasi "+
													  "         left outer join "+
									                  "              (select y.no_simp, y.no_bill, y.kode_lokasi, sum(y.nilai) as bayar "+ //<----------DC gak dilihat ...karena dibutuhkan saldo posisi terakhir
									                  "               from kop_simpangs_d y inner join kop_simpangs_m x on y.no_angs=x.no_angs and y.kode_lokasi=x.kode_lokasi "+
									                  "               where x.no_angs <> '"+this.cb_nbLama.getText()+"' and x.no_del='-' "+
									                  "               group by y.no_simp, y.no_bill, y.kode_lokasi) d on b.no_simp=d.no_simp and b.no_bill=d.no_bill and b.kode_lokasi=d.kode_lokasi "+
									                  "where bb.no_angs = '"+this.cb_nbLama.getText()+"' and bb.kode_lokasi= '"+this.app._lokasi+"' order by a.no_simp,b.periode");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["BELUM",line.no_simp,line.jenis,line.no_bill,line.ket,line.nama_agg,line.akun_ar,floatToNilai(line.saldo)]);
					}
					this.e_angsur.setText(floatToNilai(parseFloat(line.n_angs)));
					this.e_sls.setText(floatToNilai(parseFloat(line.n_sls)));
					this.e_dok.setText(line.no_dokumen);
					this.e_desc.setText(line.ket);
					this.cb_app.setText(line.nik_app,line.nama_app);
					this.cb_loker.setText(line.kode_loker,line.nama_loker);
					if (line.no_spb != "-") this.cbbSpb.setText(line.no_spb);
					else this.cbbSpb.setText("");
					this.dp_d1.setText(line.tgl_angs);
					this.e_periode.setText(line.periode);
					this.akunIM = line.akun_ar;
					this.perLama = line.periode;
					this.posted = line.posted;
					
					this.sg.validasi();
					var tot = parseFloat(line.n_angs) + parseFloat(line.n_sls);
					this.e_tot.setText(floatToNilai(tot));
				}
			}
			else {
				system.alert(this,"Lokasi kerja tidak valid.","Loker harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doHitungClick: function(sender){
		try{			
			var nilai = nilaiToFloat(this.e_angsur.getText());
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
										  "select  * from (select no_spb,keterangan,'SPB' as jenis from spb_m where kode_lokasi = '"+this.app._lokasi+"' "+
										  "union "+
										  "select no_ju as no_spb,keterangan,'TAK' as jenis from ju_m where kode_lokasi = '"+this.app._lokasi+"' and jenis='TAK' ) as A ", 
										  "select count(no_spb) from (select no_spb from spb_m where kode_lokasi = '"+this.app._lokasi+"' "+
										  "union "+
										  "select no_ju as no_spb from ju_m where kode_lokasi = '"+this.app._lokasi+"' and jenis='TAK') as b ",
										  ["no_spb","keterangan","jenis"],"WHERE",["No SPB/TAK","Deskripsi","Jenis"],false);				
				this.sg4.clear(1);
			}
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Bukti Angsuran",sender,undefined, 
											  "select no_angs, keterangan  from kop_simpangs_m where jenis='ANGS_KOL' and ((progress= '0' and no_spb='-') or (progress= '1' and no_spb<>'-')) and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'", 
											  "select count(no_angs)       from kop_simpangs_m where jenis='ANGS_KOL' and ((progress= '0' and no_spb='-') or (progress= '1' and no_spb<>'-')) and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'",
											  ["no_angs","keterangan"],"and",["No Angs","Deskripsi"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
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