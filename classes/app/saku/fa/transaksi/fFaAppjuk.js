window.app_saku_fa_transaksi_fFaAppjuk = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFaAppjuk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFaAppjuk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve Asset Non PO via JU: Input", 0);	
		
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],caption:"Periode",readOnly:true});
		uses("portalui_imageButton;portalui_label;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_saiGrid");
		this.lbltgl1 = new portalui_label(this,{bound:[20,2,101,18],caption:"Tanggal",underline:true});		
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,2,82,18]});
		this.cb_perLama = new portalui_saiCB(this,{bound:[720,2,200,20],caption:"Periode Bukti",mustCheck: true, change:[this,"doEditChange"],tag:2});
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,3,220,20],caption:"No Bukti",readOnly:true});
		this.bGen = new portalui_button(this,{bound:[246,3,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)"});
		this.cb_nbLama = new portalui_saiCBBL(this,{bound:[720,3,200,20],caption:"No Bukti Lama",rightLabelVisible:false});				
		this.iShow = new portalui_imageButton(this,{bound:[920,3,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/reload.png"});				
		this.ed_dok = new portalui_saiLabelEdit(this,{bound:[20,4,300,20],caption:"No Dokumen",tag:1});
		this.ed_desc = new portalui_saiLabelEdit(this,{bound:[20,5,500,20],caption:"Deskripsi",tag:1});		
		this.cb_curr = new portalui_saiCBBL(this,{bound:[20,6,185,20],caption:"Currency - Kurs",rightLabelVisible:false});
		this.ed_kurs = new portalui_saiLabelEdit(this,{bound:[205,6,40,20],caption:"",labelWidth:0,readOnly:true,text:"1", tipeText:ttNilai});
		this.cb_perJU = new portalui_saiCB(this,{bound:[720,6,200,20],caption:"Periode JU",mustCheck: true, change:[this,"doEditChange"],tag:2});
		this.cb_buat = new portalui_saiCBBL(this,{bound:[20,7,185,20],caption:"Dibuat Oleh"});
		this.cb_ju = new portalui_saiCBBL(this,{bound:[720,7,200,20],caption:"No Bukti JU",rightLabelVisible:false,tag:1});
		this.iShow2 = new portalui_imageButton(this,{bound:[920,7,20,20],hint:"Tampil Jurnal",image:"icon/"+system.getThemes()+"/reload.png"});				
		this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,8,185,20],caption:"Disetujui Oleh"});				
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,9,185,20],caption:"PP"});
		this.cb_drk = new portalui_saiCBBL(this,{bound:[20,10,185,20],caption:"RKM"});
		this.ed_ju = new portalui_saiLabelEdit(this,{bound:[720,10,200,20],caption:"Nilai JU", tipeText:ttNilai,readOnly:true,text:"0",tag:1});		
		this.cb_klpfa = new portalui_saiCBBL(this,{bound:[20,3,185,20],caption:"Kelompok Asset",rightLabelVisible:false,tag:9});				
		this.ed_nilai = new portalui_saiLabelEdit(this,{bound:[720,3,200,20],caption:"Total Asset", tipeText:ttNilai,readOnly:true,text:"0",tag:1});
		this.b_load = new portalui_button(this,{bound:[535,3,80,20],caption:"Load Asset", click:"doTampil"});
		this.b_setSpb = new portalui_button(this,{bound:[620,3,80,20],caption:"Approve", click:"doTampil"});

		this.p1 = new portalui_panel(this,{bound:[20,30,900,160],caption:"Daftar Item Jurnal Umum"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,133],colCount:9,tag:2,
		            colTitle:["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[80,100,200,50,100,60,100,60,100]],colFormat:[[4],[cfNilai]],
					readOnly:true,nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});
					
		this.p0 = new portalui_panel(this,{bound:[20,12,900,300],caption:"Daftar Data Asset Non PO belum diapprove"});
		this.sg0 = new portalui_saiGrid(this.p0,{bound:[0,20,895,250],colCount:10,
			colTitle:["No Approve","Data Asset","Barcode","Deskripsi","Akun SPB","Nilai Approve","Klp Asset","Akun Asset","Lokasi Asset","Nilai Asset"],
			colWidth:[[9,8,7,6,5,4,3,2,1,0],[110,110,110,110,120,120,120,80,150,110]],buttonStyle:[[0],[bsEllips]],
			colReadOnly:[true,[1,2,4,7,8,9],[]],colFormat:[[5,9],[cfNilai, cfNilai]],rowCount:1}); 
	    this.sgn0 = new portalui_sgNavigator(this.p0,{bound:[1,270,899,25],buttonStyle:2,grid:this.sg0});
		
		this.rearrangeChild(10,22);
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
			
			this.bGen.onClick.set(this, "genClick");
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this,"doSelect");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_buat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");			
			this.cb_klpfa.onBtnClick.set(this, "FindBtnClick");			
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			this.cb_pp.onChange.set(this,"doEditChange");
			this.cb_drk.onBtnClick.set(this, "FindBtnClick");
			this.cb_ju.onBtnClick.set(this, "FindBtnClick");			
			this.cb_nbLama.onBtnClick.set(this, "FindBtnClick");			
			
			this.cb_pp.setSQL("select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",["kode_pp","nama"]);
			this.cb_setuju.setSQL("select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"]);
			this.cb_buat.setSQL("select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"]);			
			this.cb_curr.setSQL("select kode_curr,nama   from curr",["kode_curr","nama"]);			
			this.cb_klpfa.setSQL("select kode_klpfa,nama   from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",["kode_klpfa","nama"]);
			
			this.sg0.onNilaiChange.set(this, "doNilaiChange");
			this.sg0.onEllipsClick.set(this, "doFindBtnClick");			
			this.sg0.onCellExit.set(this, "doCellExit");		
			this.iShow.onClick.set(this, "doLoadData");			
			this.iShow2.onClick.set(this, "doLoadData");			
			
			this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			this.sg0.clear(1);
			
			var prd = this.dbLib.getDataProvider("select distinct periode from fa_app where kode_lokasi = '"+this.app._lokasi+"' and modul='JU' order by periode desc",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);
			
			var prd = this.dbLib.getDataProvider("select distinct periode from ju_m where kode_lokasi = '"+this.app._lokasi+"' order by periode desc",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perJU.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perJU.setText(this.app._periode);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_fa_transaksi_fFaAppjuk.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFaAppjuk.implement({
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
		if (parseFloat(this.perLama) < parseFloat(this.app._periode)) this.ed_nb.setTag("0");
		else this.ed_nb.setTag("9");
		if (this.standarLib.checkEmptyByTag(this, new Array("0","1"))){
			try{
				var tgl = new Date(), no_fa = [], faScript = [];
				uses("server_util_arrayList");
				sql = new server_util_arrayList();				
				if (parseFloat(this.periodeLama) < parseFloat(this.app._periode)){
					this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fa_app','no_faapp',this.app._lokasi+"-ASA"+this.ed_period.getText().substr(2,4)+".",'0000'));				
					sql.add("update fa_asset a, fa_spb b set a.progress='0' where a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi and b.no_faapp='"+this.cb_nbLama.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("update fa_app set no_link='"+this.ed_nb.getText()+"',no_del = concat(no_faapp,'r') where no_faapp ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("insert into fa_app (no_faapp,no_spb,no_dokumen,kode_lokasi,tanggal,keterangan,kode_curr,kurs,no_fa,nilai,kode_pp,kode_drk,modul,posted,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input)"+
							"      select concat(no_faapp,'r'),'-',no_dokumen,kode_lokasi,'"+this.dp_tgl1.getDate()+"',keterangan,kode_curr,kurs,no_fa,nilai,kode_pp,kode_drk,modul,'X',nik_buat,nik_setuju,'"+this.ed_period.getText()+"',no_faapp,no_link,'"+this.app._userLog+"',now() "+
							"      from fa_app where no_faapp = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");					
					this.nb = this.ed_nb.getText();
				}
				else {
					sql.add("update fa_asset a, fa_spb b set a.progress='0' where a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi and b.no_faapp='"+this.cb_nbLama.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("delete from fa_app where no_faapp='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from fa_spb where no_faapp='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					this.nb = this.cb_nbLama.getText();
				}
			
				var idx=0, akunAsset = "", totalAsset = 0;	
				for (var i=0;i < this.sg0.getRowCount();i++){
					if (this.sg0.cells(0,i) != "-" && this.sg0.cells(0,i) != ""){
						no_fa.push("'"+this.sg0.cells(1,i)+"'");
						faScript.push("('"+this.nb+"','"+this.sg0.cells(1,i)+"','"+this.cb_ju.getText()+"','"+this.sg0.getCell(4,i)+"','"+this.app._lokasi+"',"+parseNilai(this.sg0.getCell(5,i))+",'JU')"); 
					}
				}
				sql.add("update fa_asset set progress='1' where no_fa in ("+no_fa+") and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add("insert into fa_app (no_faapp,no_spb,no_dokumen,kode_lokasi,tanggal,keterangan,kode_curr,kurs,no_fa,nilai,kode_pp,kode_drk,modul,posted,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input) values "+
						"('"+this.nb+"','"+this.cb_ju.getText()+"','"+this.ed_dok.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'-',"+parseNilai(this.ed_nilai.getText())+",'"+
						this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','JU','X','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"','-','-',"+
						"'"+this.app._userLog+"','now()')");						
				
				sql.add("insert into fa_spb (no_faapp,no_fa,no_spb,kode_akun,kode_lokasi,nilai,status) values "+faScript);
				this.dbLib.execArraySQL(sql);	
			}
			catch(e)
			{
				system.alert(this, e,"");
			}
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);	
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
					this.sg.clear(1);  this.sg0.clear(1); 
				}
				break;
			
			case "ubah" :	
				if ((nilaiToFloat(this.ed_ju.getText())  <= 0) || (nilaiToFloat(this.ed_nilai.getText()) <= 0)){
					system.alert(this,"Transaksi tidak valid.","Nilai JU atau Asset tidak boleh kurang atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else
					{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;
				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" : 
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.periodeLama) < parseFloat(this.app._periode)){		
						sql.add("update fa_asset a, fa_spb b set a.progress='0' where a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi and b.no_faapp='"+this.cb_nbLama.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("update fa_app set no_del = concat(no_faapp,'r') where no_faapp ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("insert into fa_app (no_faapp,no_spb,no_dokumen,kode_lokasi,tanggal,keterangan,kode_curr,kurs,no_fa,nilai,kode_pp,kode_drk,modul,posted,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input)"+
								"      select concat(no_faapp,'r'),'-',no_dokumen,kode_lokasi,'"+this.dp_tgl1.getDate()+"',keterangan,kode_curr,kurs,no_fa,nilai,kode_pp,kode_drk,modul,'X',nik_buat,nik_setuju,'"+this.ed_period.getText()+"',no_faapp,no_link,'"+this.app._userLog+"',now() "+
								"      from fa_app where no_faapp = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");					
					}
					else {
						sql.add("update fa_asset a, fa_spb b set a.progress='0' where a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi and b.no_faapp='"+this.cb_nbLama.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'");
						sql.add("delete from fa_app where no_faapp='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
						sql.add("delete from fa_spb where no_faapp='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;
		}
	},
	genClick: function(sender){
		try
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'fa_app','no_faapp',this.app._lokasi+"-ASA"+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_dok.setFocus();
			}
			else
			{
				system.alert(this,"Periode harus valid.","");			
			}
		}catch (e){
			alert(e);
		}
	},
	doSelect: function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period.setText(year.toString()+month);
		this.cb_drk.setSQL( " select distinct d.kode_drk, d.nama from anggaran_d b "+
							  "       inner join pp c on b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp "+
							  "       inner join drk d on b.kode_lokasi=d.kode_lokasi and b.kode_drk=d.kode_drk and d.tahun ='"+this.ed_period.getText().substr(0,4)+"' and upper(d.jenis_akun) = 'INVESTASI' "+ 
							  " where b.kode_lokasi = '"+this.app._lokasi+"' and c.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%'",["kode_brg","nama"]);
	},
	doEditChange: function(sender){
		if (sender == this.ed_pp){
			this.cb_drk.setSQL( " select distinct d.kode_drk, d.nama from anggaran_d b "+
							  "       inner join pp c on b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp "+
							  "       inner join drk d on b.kode_lokasi=d.kode_lokasi and b.kode_drk=d.kode_drk and d.tahun ='"+this.ed_period.getText().substr(0,4)+"' and upper(d.jenis_akun) = 'INVESTASI' "+ 
							  " where b.kode_lokasi = '"+this.app._lokasi+"' and c.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%'",["kode_brg","nama"]);
			
		}
		if (sender == this.ed_period)
		{
			this.ed_nb.setText("");
			//if (this.ed_period.getText() != "") this.bGen.click();
		}
		if (sender == this.cb_perJU){
		      this.cb_ju.setSQL("select no_ju, no_dokumen from ju_m where modul = 'JU' and periode='"+this.cb_perJU.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",["no_ju","no_dokumen"],true);
        }		
		if (sender == this.cb_perLama){
		      this.cb_nbLama.setSQL("select no_faapp, no_dokumen from fa_app where modul = 'JU' and periode='"+this.cb_perLama.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'",["no_faapp","no_dokumen"],true);
        }
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_nbLama) {
			    if (this.cb_perLama.getText() != "") {
				  this.standarLib.showListData(this, "Daftar Bukti Approve Periode "+this.cb_perLama.getText(),this.cb_nbLama,undefined, 
													 "select no_faapp, no_dokumen from fa_app where modul = 'JU' and periode='"+this.cb_perJU.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'", 
													 "select count(no_faapp)      from fa_app where modul = 'JU' and periode='"+this.cb_perJU.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'", 
													 new Array("no_faapp","no_dokumen"),"and", new Array("No Bukti","No Dokumen"),false);
				}
				this.standarLib.clearByTag(this, new Array("1"),undefined);	
				this.sg.clear(1);
			}
			if (sender == this.cb_ju) {
			    if (this.cb_perJU.getText() != "") {
				  this.standarLib.showListData(this, "Daftar Bukti JU Periode "+this.cb_perJU.getText(),this.cb_ju,undefined, 
													 "select no_ju, no_dokumen from ju_m where modul = 'JU' and periode='"+this.cb_perJU.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'", 
													 "select count(no_ju)      from ju_m where modul = 'JU' and periode='"+this.cb_perJU.getText()+"' and no_del='-' and kode_lokasi='"+this.app._lokasi+"'", 
													 new Array("no_ju","no_dokumen"),"and", new Array("No Bukti","No Dokumen"),false);
				}
				this.sg.clear(1);
				for (var i=0; i < this.sg0.getRowCount();i++){
					this.sg0.cells(0,i,'-');
				}
				this.sg0.validasi();
			}
			if (sender == this.cb_pp) 
			{   
				this.standarLib.showListData(this, "Daftar PP",this.cb_pp,undefined, 
											  "select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											  new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);				
			}
			if (sender == this.cb_drk) 
			{   
				this.standarLib.showListData(this, "Daftar RKM",this.cb_drk,undefined, 
											  " select distinct d.kode_drk, d.nama from anggaran_d b "+
											  "       inner join pp c on b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp "+
											  "       inner join drk d on b.kode_lokasi=d.kode_lokasi and b.kode_drk=d.kode_drk and d.tahun ='"+this.ed_period.getText().substr(0,4)+"' and upper(d.jenis_akun) = 'INVESTASI' "+ 
											  " where b.kode_lokasi = '"+this.app._lokasi+"' and c.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%'",
											  " select count(distinct d.kode_drk) from anggaran_d b "+
											  "       inner join pp c on b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp "+
											  "       inner join drk d on b.kode_lokasi=d.kode_lokasi and b.kode_drk=d.kode_drk and d.tahun ='"+this.ed_period.getText().substr(0,4)+"' and upper(d.jenis_akun) = 'INVESTASI' "+ 
											  " where b.kode_lokasi = '"+this.app._lokasi+"' and c.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%'",
											  new Array("kode_drk","nama"),"and",new Array("Kode RKM","Deskripsi"),true);			
			}
			if (sender == this.cb_buat) 
			{   
				this.standarLib.showListData(this, "Daftar Karyawan",this.cb_buat,undefined, 
											  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);
			}
			if (sender == this.cb_setuju) 
			{   
				this.standarLib.showListData(this, "Daftar Karyawan",this.cb_setuju,undefined, 
											  "select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);
			}
			if (sender == this.cb_curr) 
			{   
				this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
											  "select kode_curr,nama   from curr",
											  "select count(kode_curr) from curr",
											  ["kode_curr","nama"],"and",["Kode Curr","Deskripsi"],false);
			}
			if (sender == this.cb_klpfa) 
			{   
				this.standarLib.showListData(this, "Daftar Kelompok Asset",sender,undefined, 
											  "select kode_klpfa,nama   from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											  "select count(*) from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",
											  ["kode_klpfa","nama"],"and",["Kode Klp Asset","Deskripsi"],false);
			}
		}
		catch(e)
		{
			alert(e);
		}
	},
	doCellExit: function(sender, col, row){
		if (sender == this.sg0){
			if (col == 1){
				var data = this.dbLib.getDataProvider("select a.no_fa,a.nama, a.barcode, a.kode_klpfa, a.kode_akun, a.kode_lokfa, a.nilai "+
					" from fa_asset a inner join fa_d b on a.no_fa=b.no_fa and a.kode_lokasi = b.kode_lokasi and b.no_fr = 'NONPO' "+
					" where a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' and a.kode_klpfa = '"+this.cb_klpfa.getText()+"' and a.no_fa = '"+sender.cells(1,row)+"' ",true);
				if (typeof data != "string"){
					var line, total= 0;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];
						total += parseFloat(line.nilai);
						this.sg0.appendData(['-',line.no_fa, line.barcode, line.nama, '-',floatToNilai(line.nilai),line.kode_klpfa, line.kode_akun, line.kode_lokfa, floatToNilai(line.nilai)]);
					}
					this.sg0.validasi();
				}
			}
		}
	},
	doFindBtnClick: function(sender, col, row){
		try{
			if (sender == this.sg0){				
				this.standarLib.showListDataForSG(this, "Daftar Asset",this.sg0, this.sg0.row, this.sg0.col, 
					" select a.no_fa, a.nama from fa_asset a inner join fa_d b on a.no_fa=b.no_fa and a.kode_lokasi = b.kode_lokasi and b.no_fr = 'NONPO' "+
					" where a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' and a.kode_klpfa = '"+this.cb_klpfa.getText()+"' ",
					"select count(*)   from fa_asset a inner join fa_d b on a.no_fa=b.no_fa and a.kode_lokasi = b.kode_lokasi and b.no_fr = 'NONPO' "+
					" where a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' and a.kode_klpfa = '"+this.cb_klpfa.getText()+"' ",
					["no_fa","nama"],"and",["No Asset","Keterangan"],false);
			}
		}catch(e)
		{
			alert("[app_saku_fa_transaksi_fFaAppjuk] : doFindBtnClick : " + e);
		}
	},
	doNilaiChange: function(sender){
		if (sender == this.sg){
			var total = 0;
			for (var i = 0; i < sender.rows.getLength();i++){
				if (sender.cells(4,i) != "" && sender.cells(3,i) != "D")
					total += nilaiToFloat(sender.cells(4,i));				
			}
			this.ed_ju.setText(floatToNilai(total));
		}
		if (sender == this.sg0){
			var total = 0;
			for (var i = 0; i < sender.rows.getLength();i++){
				if (sender.cells(9,i) != "" && sender.cells(0,i) !="-" && sender.cells(0,i) !="" )
					total += nilaiToFloat(sender.cells(9,i));				
			}
			this.ed_nilai.setText(floatToNilai(total));
		}
	},
	doLoadData : function(sender) {
		try {
			if (sender == this.iShow) {
				this.sg0.clear(1);
				var data = this.dbLib.getDataProvider("select a.no_spb,c.no_fa,c.nama,c.barcode,c.kode_klpfa,c.kode_akun,c.kode_lokfa,c.nilai,a.periode,"+
													  "       a.no_dokumen,a.keterangan,a.kode_curr,a.kurs,a.nik_buat,a.nik_setuju,a.kode_pp,a.kode_drk,"+
													  "       d.nama as nama_buat,e.nama as nama_setuju,f.nama as nama_pp,ifnull(g.nama,'-') as nama_drk,h.periode as perju "+
				                                      "from fa_app a inner join fa_spb b on a.no_faapp=b.no_faapp and a.kode_lokasi=b.kode_lokasi "+
													  "              inner join fa_asset c on b.no_fa=c.no_fa and b.kode_lokasi=c.kode_lokasi "+
				                                      "              inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi "+
													  "              inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi "+
													  "              inner join pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi "+
													  "              inner join ju_m h on a.no_spb=h.no_ju and a.kode_lokasi=h.kode_lokasi "+
													  "              left outer join drk g on a.kode_drk=g.kode_drk and a.kode_lokasi=g.kode_lokasi and g.tahun=substring(a.periode,1,4) "+
													  "where a.no_faapp='"+this.cb_nbLama.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ");
				eval("data = "+data+";");				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg0.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg0.appendData([line.no_spb, line.no_fa, line.barcode, line.nama,'-',floatToNilai(line.nilai),line.kode_klpfa, line.kode_akun, line.kode_lokfa, floatToNilai(line.nilai)]);
					}
					this.perLama = line.periode;
					this.ed_dok.setText(line.no_dokumen);
					this.ed_desc.setText(line.keterangan);
					this.cb_curr.setText(line.kode_curr);
					this.ed_kurs.setText(floatToNilai(line.kurs));
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_setuju.setText(line.nik_setuju,line.nama_setuju);
					this.cb_pp.setText(line.kode_pp,line.nama_pp);
					this.cb_drk.setText(line.kode_drk,line.nama_drk);
					this.cb_perJU.setText(line.perju);
					this.cb_ju.setText(line.no_spb);
				}
				this.sg0.validasi();
				
				this.sg.clear(1);
				var data = this.dbLib.getDataProvider("select x.kode_akun,y.nama as nama_akun,x.dc,x.keterangan,x.nilai,x.kode_pp,ifnull(z.nama,'-') as nama_pp,x.kode_drk,ifnull(zz.nama,'-') as nama_drk "+
						   "from ju_j x inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi "+
						   "	        left outer join pp z on x.kode_pp=z.kode_pp and x.kode_lokasi=z.kode_lokasi "+
						   "            left outer join drk zz on x.kode_drk=zz.kode_drk and x.kode_lokasi=zz.kode_lokasi and zz.tahun=substring(x.periode,1,4) "+
						   " where x.kode_lokasi = '"+this.app._lokasi+"' and x.no_ju ='"+this.cb_ju.getText()+"'");
				eval("data = "+data+";");				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_akun,line.nama_akun,line.keterangan,line.dc.toUpperCase(),floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
					}
				}
				this.sg.validasi();
			}
			if (sender == this.iShow2) {
				if (this.cb_ju.getText() != "") {
					this.sg.clear(1);
					var data = this.dbLib.getDataProvider("select x.kode_akun,y.nama as nama_akun,x.dc,x.keterangan,x.nilai,x.kode_pp,ifnull(z.nama,'-') as nama_pp,x.kode_drk,ifnull(zz.nama,'-') as nama_drk "+
							   "from ju_j x inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi "+
							   "	        left outer join pp z on x.kode_pp=z.kode_pp and x.kode_lokasi=z.kode_lokasi "+
							   "            left outer join drk zz on x.kode_drk=zz.kode_drk and x.kode_lokasi=zz.kode_lokasi and zz.tahun=substring(x.periode,1,4) "+
							   " where x.kode_lokasi = '"+this.app._lokasi+"' and x.no_ju ='"+this.cb_ju.getText()+"'");
					eval("data = "+data+";");				
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg.appendData([line.kode_akun,line.nama_akun,line.keterangan,line.dc.toUpperCase(),floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
						}
					}
					this.sg.validasi();
				}
				else {
					system.alert(this,"Bukti JU tidak valid.","No Bukti JU harus dipilih.");
				}
			}
		} 
		catch(e) {
			alert(e);
		}
	},
	doTampil: function(sender){
		if (sender == this.b_load){
			if (this.cb_klpfa.getText() != "") {
				var data = this.dbLib.getDataProvider("select a.no_fa,a.nama, a.barcode, a.kode_klpfa, a.kode_akun, a.kode_lokfa, a.nilai "+
					" from fa_asset a inner join fa_d b on a.no_fa=b.no_fa and a.kode_lokasi = b.kode_lokasi and b.no_fr = 'NONPO' "+
					" where a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' and a.kode_klpfa = '"+this.cb_klpfa.getText()+"' ",true);
				if (typeof data != "string"){
					var line, total= 0;
					this.sg0.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];				
						this.sg0.appendData(['-', line.no_fa, line.barcode, line.nama,'-',floatToNilai(line.nilai),line.kode_klpfa, line.kode_akun, line.kode_lokfa, floatToNilai(line.nilai)]);
					}
					this.sg0.validasi();
				}
			}
			else {
				system.alert(this,"Kelompok Asset tidak valid.","Kelompok Asset harus dipilih.");
			}
		}
		else {
			if (this.cb_ju.getText() != "") {
				for (var i=0; i < this.sg0.getRowCount();i++){
					this.sg0.cells(0,i,this.cb_ju.getText());
				}
				this.sg0.validasi();
			} 
			else {
				system.alert(this,"Bukti JU tidak valid.","No Bukti JU harus dipilih.");
			}
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
						step="info";
					if (result.toLowerCase().search("error") == -1)					
					{
						this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.nb+")");
						this.app._mainForm.bClear.click();              
					}else system.info(this,result,"");
					break;
				break;
				}    		
			}
			catch(e)
			{
				alert("step : "+step+"; error = "+e);
			}
		}
	}
});