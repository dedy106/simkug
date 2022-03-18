window.app_kopeg_piutang_fRekon2k = function(owner)
{
	if (owner)
	{
		window.app_kopeg_piutang_fRekon2k.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_piutang_fRekon2k";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekonsiliasi Hutang-Piutang via TAK: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode", readOnly:true, tag: 2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_lok1 = new portalui_saiCBBL(this,{bound:[20,31,200,20],caption:"Lokasi Piutang",readOnly:true,change:[this,"doChange"]});
		this.cb_lokLama = new portalui_saiCBBL(this,{bound:[720,31,200,20],caption:"Lokasi Piutang Lama"});
		this.cb_lok2 = new portalui_saiCBBL(this,{bound:[20,32,200,20],caption:"Lokasi Hutang",readOnly:true,change:[this,"doChange"]});
		this.cb_perLama = new portalui_saiCB(this,{bound:[720,32,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
		this.e_kb = new portalui_saiLabelEdit(this,{bound:[20,13,250,20],caption:"No Bukti Lok Piutang", readOnly: true});
		this.b_gen = new portalui_button(this,{bound:[275,13,80,18],caption:"Generate",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[720,13,200,20],caption:"No Bukti Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,24,250,20],caption:"No Bukti Lok Hutang", maxLength: 50, readOnly: true});
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,25,480,20],caption:"Keterangan", maxLength: 150});				
		this.cb_tak1 = new portalui_saiCBBL(this,{bound:[20,33,200,20],caption:"Akun TAK Piutang",btnClick:[this,"doBtnClick"]});
		this.cb_tak2 = new portalui_saiCBBL(this,{bound:[20,34,200,20],caption:"Akun TAK Hutang",btnClick:[this,"doBtnClick"]});
		this.cb_pp1 = new portalui_saiCBBL(this,{bound:[20,26,200,20],caption:"PP/Unit Piutang",readOnly:true});
		this.cb_pp2 = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"PP/Unit Hutang",readOnly:true});
		this.e_inv = new portalui_saiLabelEdit(this,{bound:[720,27,200,20],caption:"No Invoice",readOnly:true, tag:9,text:""});
		this.cb_nik1 = new portalui_saiCBBL(this,{bound:[20,28,200,20],caption:"User Piutang",btnClick:[this,"doBtnClick"]});
		this.e_spb = new portalui_saiLabelEdit(this,{bound:[720,28,200,20],caption:"No SPB",readOnly:true, tag:9,text:""});
		this.cb_nik2 = new portalui_saiCBBL(this,{bound:[20,29,200,20],caption:"User Hutang",btnClick:[this,"doBtnClick"]});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[720,29,200,20],caption:"Nilai Rekonsiliasi",tipeText:ttNilai,alignment:alLeft, readOnly:true, text:"0"});
		this.b_rekon = new portalui_button(this,{bound:[540,29,80,18],caption:"Rekon",click:[this,"doClick"]});
		this.b_batal = new portalui_button(this,{bound:[630,29,80,18],caption:"Batal",click:[this,"doClick"]});
		this.p1 = new portalui_panel(this,{bound:[20,30,900,190],caption:"Data Invoice Piutang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,165],colCount:8,colTitle:["No Invoice","Tanggal","Customer","Keterangan","Akun AR","Nama Akun","Nilai Tagihan","No SPB"],
					colWidth:[[0,1,2,3,4,5,6,7],[100,80,100,280,60,80,80,80]], colFormat:[[6],[cfNilai]],defaultRow:1,
					readOnly:true,autoAppend:false});
		
		this.p2 = new portalui_panel(this,{bound:[20,31,900,180],caption:"Data SPB Hutang"});
		this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,155],colCount:9,colTitle:["No SPB","Tanggal","Vendor","Keterangan","Akun AP","Nama Akun","Nilai SPB","No Invoice","Nilai Rekon"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[100,80,100,200,60,80,80,80,80]], colFormat:[[6,8],[cfNilai,cfNilai]],defaultRow:1, 
					readOnly:true,nilaiChange:[this, "doSgChange"],autoAppend:false});									

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
			this.sg.onCellEnter.set(this, "doCellEnter");
			this.sg2.onCellEnter.set(this, "doCellEnter2");
			
			var prd = this.dbLib.getDataProvider("select distinct periode from kop_rekon_m where kode_lokasi<>kode_lokasi2 and kode_lokasi = '"+this.app._lokasi+"' order by periode desc",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);
			this.cb_lokLama.setSQL("select a.kode_lokasi,a.nama   from lokasi a inner join lokasi b on a.kode_lokkonsol=b.kode_lokkonsol where b.kode_lokasi='"+this.app._lokasi+"'",["a.kode_lokasi","a.nama"],true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_piutang_fRekon2k.extend(window.portalui_childForm);
window.app_kopeg_piutang_fRekon2k.implement({
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
			if (parseFloat(this.perLama) < parseFloat(this.app._periode)) this.e_kb.setTag("0");
			else this.e_kb.setTag("9");
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_rekon_m","no_rekon",this.cb_lok1.getText()+"-RKN"+this.e_periode.getText().substr(2,4)+".","00000"));		
						this.e_dok.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_rekon_m","no_rekon",this.cb_lok2.getText()+"-RKN"+this.e_periode.getText().substr(2,4)+".","00000"));								
						sql.add(" update kop_rekon_m set no_link='"+this.e_kb.getText()+"',no_del = concat(no_rekon,'r') where no_rekon ='"+this.noARLama+"' and kode_lokasi = '"+this.cb_lok1.getText()+"'");
						sql.add(" update kop_rekon_m set no_link='"+this.e_dok.getText()+"',no_del = concat(no_rekon,'r') where no_rekon ='"+this.noAPLama+"' and kode_lokasi = '"+this.cb_lok2.getText()+"'");
						sql.add(" insert into kop_rekon_m (no_rekon,no_dokumen,keterangan,tanggal,nilai,periode,kode_lokasi,kode_lokasi2,akun_tak1,akun_tak2,posted,kurs,kode_curr,kode_ppar,kode_ppap,no_del,no_link,nik_ar,nik_ap,nik_user,tgl_input) "+
							    " select concat(no_rekon,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,'"+this.e_periode.getText()+"',kode_lokasi,kode_lokasi2,akun_tak1,akun_tak2,'F',kurs,kode_curr,kode_ppar,kode_ppap,no_rekon,'-',nik_ar,nik_ap,'"+this.app._userLog+"',now() "+
								" from kop_rekon_m where no_rekon = '"+this.noARLama+"' and kode_lokasi ='"+this.cb_lok1.getText()+"'");
						sql.add(" insert into kop_rekon_m (no_rekon,no_dokumen,keterangan,tanggal,nilai,periode,kode_lokasi,kode_lokasi2,akun_tak1,akun_tak2,posted,kurs,kode_curr,kode_ppar,kode_ppap,no_del,no_link,nik_ar,nik_ap,nik_user,tgl_input) "+
							    " select concat(no_rekon,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,'"+this.e_periode.getText()+"',kode_lokasi,kode_lokasi2,akun_tak1,akun_tak2,'F',kurs,kode_curr,kode_ppar,kode_ppap,no_rekon,'-',nik_ar,nik_ap,'"+this.app._userLog+"',now() "+
								" from kop_rekon_m where no_rekon = '"+this.noAPLama+"' and kode_lokasi ='"+this.cb_lok2.getText()+"'");
						sql.add(" insert into kop_rekon_j (no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_rekon,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_rekon_j where no_bukti = '"+this.noARLama+"' and kode_lokasi ='"+this.cb_lok1.getText()+"' ");						
						sql.add(" insert into kop_rekon_j (no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_rekon,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_rekon_j where no_bukti = '"+this.noAPLama+"' and kode_lokasi ='"+this.cb_lok2.getText()+"' ");														
						sql.add(" insert into kop_rekon_d (no_rekon,no_ar,periode,nilai,kode_lokasi,kode_lokasi2,dc,no_spb)"+
								" select concat(no_rekon,'r'),no_ar,'"+this.e_periode.getText()+"',nilai,kode_lokasi,kode_lokasi2,'C',no_spb "+ 
								" from kop_rekon_d where no_rekon = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.cb_lokLama.getText()+"' ");					
						sql.add("update spb_m a,kop_rekon_d b set a.progress='1' where a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi2 and b.no_rekon = '"+this.cb_nbLama.getText()+"' and b.kode_lokasi= '"+this.cb_lokLama.getText()+"'");
						this.nb = this.e_kb.getText();
						this.dok = this.e_dok.getText();
					}
					else{
						sql.add("delete from kop_rekon_m where no_rekon='"+this.noARLama+"' and kode_lokasi='"+this.cb_lok1.getText()+"'");
						sql.add("delete from kop_rekon_m where no_rekon='"+this.noAPLama+"' and kode_lokasi='"+this.cb_lok2.getText()+"'");
						sql.add("delete from kop_rekon_j where no_rekon='"+this.noARLama+"' and kode_lokasi='"+this.cb_lok1.getText()+"'");
						sql.add("delete from kop_rekon_j where no_rekon='"+this.noAPLama+"' and kode_lokasi='"+this.cb_lok2.getText()+"'");
						sql.add("update spb_m a,kop_rekon_d b set a.progress='1' where a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi2 and b.no_rekon='"+this.cb_nbLama.getText()+"' and b.kode_lokasi='"+this.cb_lokLama.getText()+"'");
						sql.add("delete from kop_rekon_d where no_rekon='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.cb_lokLama.getText()+"'");
						this.nb = this.noARLama;
						this.dok = this.noAPLama;
					}
					//piutang
					sql.add("insert into kop_rekon_m(no_rekon,no_dokumen,keterangan,tanggal,nilai,periode,kode_lokasi,kode_lokasi2,akun_tak1,akun_tak2,posted,kurs,kode_curr,kode_ppar,kode_ppap,no_del,no_link,nik_ar,nik_ap,nik_user,tgl_input) values  "+
							"('"+this.nb+"','"+this.dok+"','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.cb_lok1.getText()+"','"+this.cb_lok2.getText()+"','"+this.cb_tak1.getText()+"','"+this.cb_tak2.getText()+"','F',1,'IDR','"+this.cb_pp1.getText()+"','"+this.cb_pp2.getText()+"','-','-','"+this.cb_nik1.getText()+"','"+this.cb_nik2.getText()+"','"+this.app._userLog+"',now())");
					//hutang
					sql.add("insert into kop_rekon_m(no_rekon,no_dokumen,keterangan,tanggal,nilai,periode,kode_lokasi,kode_lokasi2,akun_tak1,akun_tak2,posted,kurs,kode_curr,kode_ppar,kode_ppap,no_del,no_link,nik_ar,nik_ap,nik_user,tgl_input) values  "+
							"('"+this.dok+"','"+this.nb+"','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.e_periode.getText()+"','"+this.cb_lok2.getText()+"','"+this.cb_lok1.getText()+"','"+this.cb_tak1.getText()+"','"+this.cb_tak2.getText()+"','F',1,'IDR','"+this.cb_pp1.getText()+"','"+this.cb_pp2.getText()+"','-','-','"+this.cb_nik1.getText()+"','"+this.cb_nik2.getText()+"','"+this.app._userLog+"',now())");					
					
					var nospb = [];
					for (var i=0; i < this.sg2.rows.getLength(); i++){
						if (this.sg2.rowValid(i)){
							if (this.sg2.cells(7,i) != "-"){
								sql.add("insert into kop_rekon_d (no_rekon,no_ar,periode,nilai,kode_lokasi,kode_lokasi2,dc,no_spb) values "+
								        "('"+this.nb+"','"+this.sg2.cells(7,i)+"','"+this.e_periode.getText()+"',"+parseNilai(this.sg2.cells(6,i))+",'"+this.cb_lok1.getText()+"','"+this.cb_lok2.getText()+"','D','"+this.sg2.cells(0,i)+"')");
								nospb.push("'"+this.sg2.getCell(0,i)+"'"); 
							}
						}
					}
					this.createJurnal();					
					var d = "insert into kop_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input )values";
					for (var i in this.dataJurnal.rs.rows){
						if (i >0) d+=",";
						line = this.dataJurnal.rs.rows[i];
						if (line.dc == "C") {
							var kdlok = this.cb_lok1.getText();
							var norekon = this.nb;
							var nodok = this.dok;
						}
						else {
							var kdlok = this.cb_lok2.getText();
							var norekon = this.dok;
							var nodok = this.nb;
						}
						d+="('"+norekon+"','"+nodok+"','"+this.dp_d1.getDateString()+"',"+i+",'"+line.kode_akun+"','"+this.e_ket.getText()+"','"+line.dc+"',"+line.nilai+",'"+this.app._kodePP+"','-','"+kdlok+"','ARUM','"+line.kode_drk+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}					
					d+=","+"('"+this.nb+"','"+this.dok+"','"+this.dp_d1.getDateString()+"',"+998+",'"+this.cb_tak1.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.cb_lok1.getText()+"','ARUM','-','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					d+=","+"('"+this.dok+"','"+this.nb+"','"+this.dp_d1.getDateString()+"',"+999+",'"+this.cb_tak2.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.cb_lok2.getText()+"','APUM','-','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					
					sql.add(d);
					sql.add("update spb_m set progress='2' where no_spb in ("+nospb+") and kode_lokasi = '"+this.cb_lok2.getText()+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_kb);
					this.sg.clear(1);
				}
				break;			
			case "ubah" :	
				this.sg2.validasi();
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg2.rowValid(i)){
						if ((nilaiToFloat(this.sg2.getCell(8,i)) != 0) && (nilaiToFloat(this.sg2.getCell(8,i)) > nilaiToFloat(this.sg2.getCell(6,i)))){
							i++;
							system.alert(this,"Nilai rekon tidak valid.","Melebihi nilai SPB. Baris["+i+"]");
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
						sql.add(" update kop_rekon_m set no_del = concat(no_rekon,'r') where no_rekon ='"+this.noARLama+"' and kode_lokasi = '"+this.cb_lok1.getText()+"'");
						sql.add(" update kop_rekon_m set no_del = concat(no_rekon,'r') where no_rekon ='"+this.noAPLama+"' and kode_lokasi = '"+this.cb_lok2.getText()+"'");
						sql.add(" insert into kop_rekon_m (no_rekon,no_dokumen,keterangan,tanggal,nilai,periode,kode_lokasi,kode_lokasi2,akun_tak1,akun_tak2,posted,kurs,kode_curr,kode_ppar,kode_ppap,no_del,no_link,nik_ar,nik_ap,nik_user,tgl_input) "+
							    " select concat(no_rekon,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,'"+this.e_periode.getText()+"',kode_lokasi,kode_lokasi2,akun_tak1,akun_tak2,'F',kurs,kode_curr,kode_ppar,kode_ppap,no_rekon,'-',nik_ar,nik_ap,'"+this.app._userLog+"',now() "+
								" from kop_rekon_m where no_rekon = '"+this.noARLama+"' and kode_lokasi ='"+this.cb_lok1.getText()+"'");
						sql.add(" insert into kop_rekon_m (no_rekon,no_dokumen,keterangan,tanggal,nilai,periode,kode_lokasi,kode_lokasi2,akun_tak1,akun_tak2,posted,kurs,kode_curr,kode_ppar,kode_ppap,no_del,no_link,nik_ar,nik_ap,nik_user,tgl_input) "+
							    " select concat(no_rekon,'r'),no_dokumen,keterangan,'"+this.dp_d1.getDateString()+"',nilai,'"+this.e_periode.getText()+"',kode_lokasi,kode_lokasi2,akun_tak1,akun_tak2,'F',kurs,kode_curr,kode_ppar,kode_ppap,no_rekon,'-',nik_ar,nik_ap,'"+this.app._userLog+"',now() "+
								" from kop_rekon_m where no_rekon = '"+this.noAPLama+"' and kode_lokasi ='"+this.cb_lok2.getText()+"'");
						sql.add(" insert into kop_rekon_j (no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_rekon,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_rekon_j where no_bukti = '"+this.noARLama+"' and kode_lokasi ='"+this.cb_lok1.getText()+"' ");						
						sql.add(" insert into kop_rekon_j (no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input)"+
								" select concat(no_rekon,'r'),no_dokumen,'"+this.dp_d1.getDateString()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,'"+this.e_periode.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now() "+ 
								" from kop_rekon_j where no_bukti = '"+this.noAPLama+"' and kode_lokasi ='"+this.cb_lok2.getText()+"' ");														
						sql.add(" insert into kop_rekon_d (no_rekon,no_ar,periode,nilai,kode_lokasi,kode_lokasi2,dc,no_spb)"+
								" select concat(no_rekon,'r'),no_ar,'"+this.e_periode.getText()+"',nilai,kode_lokasi,kode_lokasi2,'C',no_spb "+ 
								" from kop_rekon_d where no_rekon = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.cb_lokLama.getText()+"' ");					
						sql.add("update spb_m a,kop_rekon_d b set a.progress='1' where a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi2 and b.no_rekon = '"+this.cb_nbLama.getText()+"' and b.kode_lokasi= '"+this.cb_lokLama.getText()+"'");
					}
					else{
						sql.add("delete from kop_rekon_m where no_rekon='"+this.noARLama+"' and kode_lokasi='"+this.cb_lok1.getText()+"'");
						sql.add("delete from kop_rekon_m where no_rekon='"+this.noAPLama+"' and kode_lokasi='"+this.cb_lok2.getText()+"'");
						sql.add("delete from kop_rekon_j where no_rekon='"+this.noARLama+"' and kode_lokasi='"+this.cb_lok1.getText()+"'");
						sql.add("delete from kop_rekon_j where no_rekon='"+this.noAPLama+"' and kode_lokasi='"+this.cb_lok2.getText()+"'");
						sql.add("update spb_m a,kop_rekon_d b set a.progress='1' where a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi2 and b.no_rekon='"+this.cb_nbLama.getText()+"' and b.kode_lokasi='"+this.cb_lokLama.getText()+"'");
						sql.add("delete from kop_rekon_d where no_rekon='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.cb_lokLama.getText()+"'");
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;	
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_lokLama) {   
			    this.standarLib.showListData(this, "Daftar Lokasi Piutang Lama",sender,undefined, 
											  "select a.kode_lokasi,a.nama   from lokasi a inner join lokasi b on a.kode_lokkonsol=b.kode_lokkonsol where b.kode_lokasi='"+this.app._lokasi+"'",
											  "select count(a.kode_lokasi)   from lokasi a inner join lokasi b on a.kode_lokkonsol=b.kode_lokkonsol where b.kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_lokasi","nama"],"and",["Kode Lokasi","Nama "],false);				
				this.sg.clear(1); this.sg2.clear(1);
				this.cb_nbLama.setText("","");
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
			}
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Bukti Rekon",sender,undefined, 
											  "select no_rekon,no_dokumen from kop_rekon_m where kode_lokasi<>kode_lokasi2 and kode_lokasi='"+this.cb_lokLama.getText()+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'", 
											  "select count(no_rekon)     from kop_rekon_m where kode_lokasi<>kode_lokasi2 and kode_lokasi='"+this.cb_lokLama.getText()+"' and periode='"+this.cb_perLama.getText()+"' and no_del='-'", 
											  ["no_rekon","no_dokumen"],"and",["No Bukti Piutang","No Bukti Hutang"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg.clear(1);this.sg2.clear(1);
			}
			if (sender == this.cb_nik1) {   
			    this.standarLib.showListData(this, "Daftar Karyawan Piutang",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.cb_lok1.getText()+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.cb_lok1.getText()+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_nik2) {   
			    this.standarLib.showListData(this, "Daftar Karyawan Hutang",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.cb_lok2.getText()+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.cb_lok2.getText()+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
			if (sender == this.cb_tak1) {   
				this.standarLib.showListData(this, "Daftar Akun TAK Piutang",sender,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.cb_lok1.getText()+"' and b.kode_flag = '030'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.cb_lok1.getText()+"' and b.kode_flag = '030'",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama"),false);
			}
			if (sender == this.cb_tak2) {   
				this.standarLib.showListData(this, "Daftar Akun TAK Hutang",sender,undefined, 
										  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.cb_lok2.getText()+"' and b.kode_flag = '030'",
										  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.cb_lok2.getText()+"' and b.kode_flag = '030'",
										  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama"),false);
			}
		}catch(e){
			systemAPI.alert(e);
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.b_gen !== undefined) this.b_gen.click();
	},
	doCellEnter: function(sender, col, row){
		this.e_inv.setText(this.sg.cells(0,row));
	},
	doCellEnter2: function(sender, col, row){
		this.e_spb.setText(this.sg2.cells(0,row));
	},
	doSgChange: function(sender, col, row){
		var tot = 0;			
		for (var i = 0;i < this.sg2.getRowCount();i++){
			if (this.sg2.cells(8,i) != "") 
				tot += nilaiToFloat(this.sg2.cells(8,i));
		}
		this.e_nilai.setText(floatToNilai(tot));
	},
	createJurnal: function(){				
		try{
			var rows = [];
			var vKet = '-';
			if (this.e_ket.getText() != "") vKet = this.e_ket.getText();
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.cells(7,i) != "-"){
					var temu = false;
					for (var j in rows){
						if (rows[j].kode_akun == this.sg.cells(4,i)){
							rows[j].nilai += nilaiToFloat(this.sg.cells(6,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg.cells(4,i),nama:this.sg.cells(5,i),dc:"C", keterangan:vKet, nilai: nilaiToFloat(this.sg.cells(6,i)),kode_pp:this.cb_pp1.getText(), kode_drk:'ARREKON'};
					}
				}
			}
			for (var i=0;i < this.sg2.getRowCount();i++){
				if (this.sg2.cells(7,i) != "-"){
					var temu = false;
					for (var j in rows){
						if (rows[j].kode_akun == this.sg2.cells(4,i)){
							rows[j].nilai += nilaiToFloat(this.sg2.cells(6,i));
							temu = true;
						}
					}
					if (!temu){
						rows[rows.length] = {kode_akun:this.sg2.cells(4,i),nama:this.sg2.cells(5,i),dc:"D", keterangan:vKet, nilai: nilaiToFloat(this.sg2.cells(6,i)),kode_pp:this.cb_pp2.getText(), kode_drk:'APREKON'};
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
	doLoadData:function(sender){
		if (this.cb_nbLama.getText() != "") {
			var data = this.dbLib.getDataProvider(" select  a.no_rekon,a.no_dokumen,a.tanggal,a.periode,a.posted,a.keterangan,a.kode_ppar,a.kode_ppap,a.nik_ar,a.nik_ap,b.nama as nama_ppar,c.nama as nama_ppap,d.nama as nama_ar,e.nama as nama_ap, "+						
												  "         a.kode_lokasi,a.kode_lokasi2,a.akun_tak1,a.akun_tak2,f.nama as nama_lok1,g.nama as nama_lok2,h.nama as nama_tak1,i.nama as nama_tak2 "+
												  " from kop_rekon_m a inner join pp b on a.kode_ppar=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
												  " 	                     inner join pp c on a.kode_ppap=c.kode_pp and a.kode_lokasi2=c.kode_lokasi "+
												  " 	                     inner join karyawan d on a.nik_ar=d.nik and a.kode_lokasi=d.kode_lokasi "+
												  " 	                     inner join karyawan e on a.nik_ap=e.nik and a.kode_lokasi2=e.kode_lokasi "+
												  " 	                     inner join lokasi f on a.kode_lokasi=f.kode_lokasi "+
												  " 	                     inner join lokasi g on a.kode_lokasi2=g.kode_lokasi "+
												  " 	                     inner join masakun h on a.akun_tak1=h.kode_akun and a.kode_lokasi=h.kode_lokasi "+
												  " 	                     inner join masakun i on a.akun_tak2=i.kode_akun and a.kode_lokasi2=i.kode_lokasi "+
												  " where  a.kode_lokasi = '"+this.cb_lokLama.getText()+"' and a.no_rekon='"+this.cb_nbLama.getText()+"'");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];
				this.noARLama = line.no_rekon;
				this.noAPLama = line.no_dokumen;
				
				this.perLama = line.periode;
				this.posted = line.posted;
				this.e_periode.setText(line.periode);
				this.dp_d1.setText(line.tanggal);
				this.e_dok.setText(line.no_dokumen);
				this.e_ket.setText(line.keterangan);
				
				this.cb_lok1.setText(line.kode_lokasi,line.nama_lok1);
				this.cb_lok2.setText(line.kode_lokasi2,line.nama_lok2);
				this.cb_tak1.setText(line.akun_tak1,line.nama_tak1);
				this.cb_tak2.setText(line.akun_tak2,line.nama_tak2);
				this.cb_pp1.setText(line.kode_ppar,line.nama_ppar);
				this.cb_pp2.setText(line.kode_ppap,line.nama_ppap);
				this.cb_nik1.setText(line.nik_ar,line.nama_ar);
				this.cb_nik2.setText(line.nik_ap,line.nama_ap);
			}
			this.sg.clear(1);
			var data = this.dbLib.getDataProvider("select f.no_ar,date_format(f.tanggal,'%d/%m/%Y')as tanggal,concat(a.kode_cust,'-',a.nama) as cust, f.keterangan,f.akun_ar,(f.nilai+f.nilai_ppn)-ifnull(y.totbayar,0)-ifnull(z.totrekon,0) as sisa,j.nama as nama_akun,bb.no_spb from "+						
												  " 	  kop_ar_m f inner join cust a on f.kode_cust=a.kode_cust and f.kode_lokasi=a.kode_lokasi "+
												  "	          inner join kop_rekon_d bb on f.no_ar = bb.no_ar and f.kode_lokasi = bb.kode_lokasi "+					
												  "	          inner join masakun j on f.akun_ar = j.kode_akun and f.kode_lokasi = j.kode_lokasi "+					
												  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as totbayar from kop_arbayar_d where kode_lokasi='"+this.app._lokasi+"' group by no_ar,kode_lokasi) y on y.no_ar=f.no_ar and y.kode_lokasi=f.kode_lokasi "+
												  "           left outer join (select no_ar,kode_lokasi, sum(case dc when 'D' then nilai else -nilai end) as totrekon from kop_rekon_d where no_rekon <> '"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by no_ar,kode_lokasi) z on z.no_ar=f.no_ar and z.kode_lokasi=f.kode_lokasi "+
												  " where bb.kode_lokasi = '"+this.cb_lok1.getText()+"' and bb.no_rekon='"+this.cb_nbLama.getText()+"' order by f.no_ar");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					if (line !== undefined)
						this.sg.appendData([line.no_ar, line.tanggal, line.cust, line.keterangan, line.akun_ar, line.nama_akun, floatToNilai(line.sisa),line.no_spb]);
				}
			}
			this.sg2.clear(1);
			var data = this.dbLib.getDataProvider("select f.no_spb,date_format(f.tanggal,'%d/%m/%Y')as tanggal,concat(a.kode_vendor,'-',a.nama) as vendor, f.keterangan,f.akun_hutang,(f.nilai)-ifnull(y.totrekon,0) as sisa,j.nama as nama_akun,bb.no_ar,bb.nilai from "+
												  " 	  spb_m f inner join vendor a on f.kode_terima=a.kode_vendor and f.kode_lokasi=a.kode_lokasi "+
												  "	          inner join kop_rekon_d bb on f.no_spb = bb.no_spb and f.kode_lokasi = bb.kode_lokasi2 "+					
												  "	          inner join masakun j on f.akun_hutang = j.kode_akun and f.kode_lokasi = j.kode_lokasi "+					
												  "           left outer join (select no_spb,kode_lokasi2, sum(case dc when 'D' then nilai else -nilai end) as totrekon from kop_rekon_d where no_rekon <> '"+this.cb_nbLama.getText()+"' and kode_lokasi2='"+this.cb_lok2.getText()+"' group by no_spb,kode_lokasi2) y on y.no_spb=f.no_spb and y.kode_lokasi2=f.kode_lokasi "+
												  " where bb.kode_lokasi2 = '"+this.cb_lok2.getText()+"' and bb.no_rekon='"+this.cb_nbLama.getText()+"' order by f.no_spb");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					if (line !== undefined)
						this.sg2.appendData([line.no_spb, line.tanggal, line.vendor, line.keterangan, line.akun_hutang, line.nama_akun, floatToNilai(line.sisa),line.no_ar, floatToNilai(line.nilai)]);
				}
			}
			this.sg2.validasi();
		}
	},
	doChange:function(sender){
		if (sender == this.cb_lok1){
			this.cb_nik1.setSQL("select nik, nama  from karyawan where kode_lokasi='"+this.cb_lok1.getText()+"'",["nik","nama"],true);
			this.cb_tak1.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.cb_lok1.getText()+"' and b.kode_flag = '030'",["a.kode_akun","a.nama"],true);
		}
		if (sender == this.cb_lok2){
			this.cb_nik2.setSQL("select nik, nama  from karyawan where kode_lokasi='"+this.cb_lok2.getText()+"'",["nik","nama"],true);
			this.cb_tak2.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.cb_lok2.getText()+"' and b.kode_flag = '030'",["a.kode_akun","a.nama"],true);
		}
	},
	doClick:function(sender){
		if (sender == this.b_gen) {
			this.e_kb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_rekon_m","no_rekon",this.cb_lok1.getText()+"-RKN"+this.e_periode.getText().substr(2,4)+".","00000"));		
			this.e_dok.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_rekon_m","no_rekon",this.cb_lok2.getText()+"-RKN"+this.e_periode.getText().substr(2,4)+".","00000"));		
			this.e_ket.setFocus();
		} 
		else {
			if (sender == this.b_rekon) {
				if (this.e_inv.getText() != "" && this.e_spb.getText() != "") {
					if (nilaiToFloat(this.sg.cells(6,this.sg.row)) != nilaiToFloat(this.sg2.cells(6,this.sg2.row))) {
						system.alert(this,"Nilai rekonsiliasi tidak sama.","Data nilai hutang-piutang tidak sesuai.");
					}
					else {
						if (this.sg.cells(7,this.sg.row) != "-" || this.sg2.cells(7,this.sg2.row) != "-") {
							system.alert(this,"Data telah direkonsiliasi.","Data tidak valid.");
						} else {
							this.sg.setCell(7,this.sg.row,this.e_spb.getText());
							this.sg2.setCell(7,this.sg2.row,this.e_inv.getText());
							this.sg2.setCell(8,this.sg2.row,this.sg.cells(6,this.sg.row));
						}
					}
				}
				this.sg2.validasi();
			} 
			else {
				for (var i=0; i < this.sg.rows.getLength(); i++){
					if (this.sg.rowValid(i)) this.sg.setCell(7,i,'-');
				}
				for (var i=0; i < this.sg2.rows.getLength(); i++){
					if (this.sg2.rowValid(i)) {
						this.sg2.setCell(7,i,'-');
						this.sg2.setCell(8,i,'0');
					}
				}
			}
		}
	}	
});