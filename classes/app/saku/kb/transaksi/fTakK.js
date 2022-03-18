window.app_saku_kb_transaksi_fTakK = function(owner){
	if (owner)
	{
		window.app_saku_kb_transaksi_fTakK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_kb_transaksi_fTakK";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form TAK Kas Bank Kirim : Koreksi", 0);
		
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],caption:"Periode",readOnly:true, tag:9});			
		this.lblTgl1 = new portalui_label(this,{bound:[20,32,101,20], caption:"Tanggal", underline:true});		
		
		uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;util_standar;util_addOnLib;util_dbLarge;app_saku_fJurnalViewer");	
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,34,82,18]});			
		this.cb_jenis = new portalui_saiCB(this,{bound:[20,56,185,20], caption:"Jenis",items:["KAS","BANK"], readOnly:true});				
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,78,230,20], caption:"No TAK KasBank", readOnly:true});			
		this.bGen = new portalui_button(this,{bound:[256,78,80,20],caption:"Gen", icon:"url(icon/"+system.getThemes()+"/process.png"});				
		this.cb_periode = new portalui_saiCB(this,{bound:[700,78,185,20],caption:"Periode Lama", change:[this,"doChange"]});	
		this.ed_desc = new portalui_saiLabelEdit(this,{bound:[20,100,500,20], caption:"Deskripsi",maxLength:150});						
		this.cb_bukti = new portalui_saiCBBL(this,{bound:[700,100,185,20],caption:"No TAK Lama",multiSelection:false});	
		this.bShow = new portalui_imageButton(this,{bound:[900,100,22,22],hint:"Load Data", image:"icon/"+system.getThemes()+"/reload.png", click:[this,"doLoadData"]});		
		
		this.cb_curr = new portalui_saiCBBL(this,{bound:[20,122,185,20],caption:"Currency dan Kurs"});				
		this.ed_kurs = new portalui_saiLabelEdit(this,{bound:[205,122,45,20],labelWidth:0, tipeText:ttNilai, alignment:alRight, readOnly:true});				
		this.ed_dok = new portalui_saiLabelEdit(this,{bound:[290,122,230,20],caption:"No Dokumen",maxLength:50});								
		this.cb_lokasi = new portalui_saiCBBL(this,{bound:[700,122,185,20],caption:"Lokasi Terima",multiSelection:false,
			sql:["select kode_lokasi, nama from lokasi where kode_lokasi <> '"+this.app._lokasi+"'  ",["kode_lokasi","nama"],false,["Kode Lokasi","Nama"],"and","Daftar Lokasi",true]
		});	
		
		this.cb_akun = new portalui_saiCBBL(this,{bound:[20,144,185,20],caption:"Akun TAK", multiSelection:false,	
			sql:["select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode Akun","Nama"],"and","Daftar Akun",true]			
		});		
					
		this.cb_pembuat = new portalui_saiCBBL(this,{bound:[20,166,185,20], caption:"Dibuat Oleh", multiSelection:false, 
			sql:["select nik, nama  from karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"],false, ["NIK","Nama"],"and","Daftar Karyawan", true ]
		});		
		
		this.ed_giro = new portalui_saiLabelEdit(this,{bound:[20,188,230,20],caption:"No BG/ Cheque",tag:9});		
		
		this.ed_debet = new portalui_saiLabelEdit(this,{bound:[700,144,220,20], caption:"Total Debet", tipeText:ttNilai, text:"0", readOnly:true});		
		this.ed_kredit = new portalui_saiLabelEdit(this,{bound:[700,166,220,20], caption:"Total Kredit", tipeText:ttNilai, text:"0", readOnly:true});				

		this.ed_nilai = new portalui_saiLabelEdit(this,{bound:[700,188,220,20], caption:"Nilai KasBank", readOnly:true, tipeText:ttNilai});		
	    this.p1 = new portalui_panel(this,{bound:[20,210,900,260], caption:"Daftar Item Jurnal Peruntukan Kasbank"});	    		
		
    	this.sg1 = new portalui_saiGrid(this.p1);
    	this.sg1.setLeft(1);
	    this.sg1.setTop(20);
    	this.sg1.setWidth(895);
    	this.sg1.setHeight(210);
	    this.sg1.setColCount(11);
		this.sg1.setColTitle(["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM","Kode Bank","Nama Bank"]);
		this.sg1.setColWidth([10,9,8,7,6,5,4,3,2,1,0],[100,80,180,80,100,80,120,30,250,120,80]);
		this.sg1.setReadOnly(false);
		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setReadOnly(true);	
		this.sg1.columns.get(3).setButtonStyle(window.bsAuto);
		var val = new portalui_arrayMap();
		    val.set(1, "D");
			val.set(2, "C");	
		this.sg1.columns.get(3).setPicklist(val);
		this.sg1.columns.get(3).setReadOnly(true);
		this.sg1.columns.get(4).setColumnFormat(window.cfNilai);
		this.sg1.columns.get(5).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(6).setReadOnly(true);
		this.sg1.columns.get(7).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(8).setReadOnly(true);
		this.sg1.columns.get(9).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(10).setReadOnly(true);
		
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(234);
		this.sgn.setLeft(1);
		this.sgn.setWidth(899);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);		    
		    this.standarLib = new util_standar();			
			this.addOnLib = new util_addOnLib();
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.cb_jenis.onChange.set(this,"doEditChange");
			this.bGen.onClick.set(this, "genClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_akun.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_akun.onBtnClick.set(this, "FindBtnClick");
			//this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onChange.set(this, "doCellExit");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onCellEnter.set(this, "doCellEnter");
			
			this.standarLib.clearByTag(this,["0","9"],this.dp_tgl1);				
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(); this.sg1.appendRow();
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			this.cb_pembuat.setText(this.app._userLog, this.app._namaUser);
			var val = this.dbLib.loadQuery("select distinct periode from kas_m where kode_lokasi='"+this.app._lokasi+"' and jenis like 'T%' and not (periode < '"+this.app._periode.substr(0,4)+"01') order by periode");
			var val = val.split("\r\n");
			var val1 = new portalui_arrayMap(); 
			for (var j in val)
			{
				if (j>0)
				{                   
					var isi = val[j].split(";");             
					this.cb_periode.addItem(j,val[j].split(";"));
				}
			}
			this.cb_periode.setText(this.app._periode);
			this.dbLarge = new util_dbLarge();
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_kb_transaksi_fTakK.extend(window.portalui_childForm);
window.app_saku_kb_transaksi_fTakK.implement({
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
		
		this.bGen.click();
		if (this.standarLib.checkEmptyByTag(this, new Array("0")))
		{
			try
			{
				var tgl = new Date();
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				
			if (parseFloat(this.cb_periode.getText()) < parseFloat(this.app._periode)) 
			{
				sql.add("update kas_m set no_link='"+this.ed_nb.getText()+"',no_del = concat(no_kas,'r') where no_kas ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
						"                   periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank)"+
						"      select concat(no_kas,'r'),kode_lokasi,no_dokumen,no_bg,akun_kb,'"+this.dp_tgl1.getDate()+"',keterangan,kode_pp,modul,jenis,"+
						"             '"+this.ed_period.getText()+"',kode_curr,kurs,nilai,'"+this.cb_pembuat.getText()+"',nik_app,now(),'"+this.app._userLog+"','F',no_kas,'-','-',kode_bank "+
						"      from kas_m where no_kas = '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");					
				
				sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"                   kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+	
						"   select concat(no_kas,'r'),no_dokumen,'"+this.dp_tgl1.getDate()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,ref1,"+
						"          kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now(),kode_bank "+
						"   from kas_j where no_kas = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");								
				
				sql.add("insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+	
						"   select concat(no_bukti,'r'),modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
						"   from angg_r where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");										
				this.nb = this.ed_nb.getText();
			}
			else
			{
				sql.add("delete from kas_j where no_kas='"+this.cb_bukti.getText()+"'");
				sql.add("delete from kas_m where no_kas='"+this.cb_bukti.getText()+"'");
				sql.add("delete from angg_r where no_bukti ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'KBINP'");			
				this.nb = this.cb_bukti.getText();
			}
				sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
						"             periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank,kode_lokasi2, no_bukti2) values  "+
						"('"+this.nb+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.ed_giro.getText()+"','"+this.cb_akun.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','-','KBI_NP','"+this.jenis+"','"+
						     this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+",'"+this.cb_pembuat.getText()+"','-',now(),'"+this.app._userLog+"','F','-','-','-','"+this.cb_akun.getText()+"','"+this.cb_lokasi.getText()+"','-')");
				var nilaiTak = (nilaiToFloat(this.ed_nilai.getText()));
				var dc = nilaiTak < 0 ? "C" :"D";
				nilaiTak = Math.abs(nilaiTak);
				
				sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
						"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
						"('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',0,'"+this.cb_akun.getText()+
						"','"+this.ed_desc.getText()+"','"+dc+"',"+nilaiTak+",'-','-','-','"+this.app._lokasi+"','KBI_NP','TAK',"+
						"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
						",'"+this.app._userLog+"',now(),'"+this.cb_akun.getText()+"')");
				
				var j = 0;
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{		
					if (this.sg1.rowValid(i)){
						j++;
						sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
								"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+	
								"('"+this.nb+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+j+",'"+this.sg1.getCell(0,i)+
								"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i)+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+"',"+
								"'-','"+this.app._lokasi+"','KBI_NP','TAK','"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
								",'"+this.app._userLog+"',now(),'"+this.sg1.getCell(9,i)+"')");
						
						sql.add("insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+	
								"('"+this.nb+"','KBINP','"+this.app._lokasi+"','"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+"','"+
								this.ed_period.getText()+"','"+this.ed_period.getText()+"','"+this.sg1.getCell(3,i)+"',0,"+parseNilai(this.sg1.getCell(4,i))+")");
					}
				}		
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
					this.standarLib.clearByTag(this,["0","9"],undefined);				
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg1.clear();  this.sg1.appendRow();
					this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
				}
				break;
				
			case "ubah" :
				if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
				{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}		
				if (parseFloat(this.app._periode) < parseFloat(this.ed_period.getText())) 
				{
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
			case "hapus":
				var tgl = new Date();
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				
				if (parseFloat(this.cb_periode.getText()) < parseFloat(this.app._periode)) 
				{
					sql.add("update kas_m set no_link='"+this.ed_nb.getText()+"',no_del = concat(no_kas,'r') where no_kas ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,"+
							"                   periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank)"+
							"      select concat(no_kas,'r'),kode_lokasi,no_dokumen,no_bg,akun_kb,'"+this.dp_tgl1.getDate()+"',keterangan,kode_pp,modul,jenis,"+
							"             '"+this.ed_period.getText()+"',kode_curr,kurs,nilai,'"+this.cb_pembuat.getText()+"',nik_app,now(),'"+this.app._userLog+"','F',no_kas,'-','-',kode_bank "+
							"      from kas_m where no_kas = '"+this.cb_bukti.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");					
					
					sql.add("insert into kas_j (no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,ref1,"+
							"                   kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+	
							"   select concat(no_kas,'r'),no_dokumen,'"+this.dp_tgl1.getDate()+"',no_urut,kode_akun,keterangan,case dc when 'D' then 'C' else 'D' end as dc,nilai,kode_pp,kode_drk,ref1,"+
							"          kode_lokasi,modul,jenis,'"+this.ed_period.getText()+"',kode_curr,kurs,'"+this.app._userLog+"',now(),kode_bank "+
							"   from kas_j where no_kas = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");								
					
					sql.add("insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) "+	
							"   select concat(no_bukti,'r'),modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,'"+this.ed_period.getText()+"',case dc when 'D' then 'C' else 'D' end as dc,0,nilai "+
							"   from angg_r where no_bukti = '"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");										
					this.nb = this.ed_nb.getText();
				}
				else
				{
					sql.add("delete from kas_j where no_kas='"+this.cb_bukti.getText()+"'");
					sql.add("delete from kas_m where no_kas='"+this.cb_bukti.getText()+"'");
					sql.add("delete from angg_r where no_bukti ='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and modul = 'KBINP'");			
					this.nb = this.cb_bukti.getText();
				}
				this.dbLib.execArraySQL(sql);
			break;
		}
	},
	genClick: function(sender){
		try
		{
			if ((this.ed_period.getText() != "") && (this.jenis != undefined))
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kas_m','no_kas',this.app._lokasi+"-"+this.jenis+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_desc.setFocus();
			}
			else
			{
				system.alert(this,"Periode dan jenis kasbank harus valid.","");
			}
		}
		catch (e)
		{
			alert(e);
		}
	},
	doSelect: function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period.setText(year.toString()+month);
	},
	doChange: function(sender){
		if (sender == this.cb_periode){
			this.cb_bukti.setText("");
			this.cb_bukti.setSQL("select no_kas, keterangan from kas_m where kode_lokasi = '"+this.app._lokasi+"' and periode = '"+this.cb_periode.getText()+"' and no_bukti2 = '-'  and jenis like 'T%' and posted = 'F'",["no_kas","keterangan"],false,["No KAS","Keterangan"],"and","Daftar TAK Kirim",true);
			
		}
	},
	doEditChange: function(sender){	
		if (sender == this.ed_period)
		{
			this.ed_nb.setText("");
			//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "")) this.bGen.click();
		}
		
		if (sender == this.cb_jenis)
		{
			this.ed_nb.setText("");
			if (this.cb_jenis.getText() == "KAS")
			{
				this.jenis = "TBKM";
			}
			if (this.cb_jenis.getText() == "BANK")
			{
				this.jenis = "TBBM";
			}
		}
		
		if (sender == this.cb_curr)
		{
			this.cb_akun.setText("");
			if (this.cb_curr.getText() == "IDR")
			{	
				this.ed_kurs.setText("1");
				this.ed_kurs.setReadOnly(true);
			}
			else
			{
				this.ed_kurs.setReadOnly(false);
			}
		}	
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_akun) 
			{
			    if (this.cb_jenis.getText().toUpperCase() == 'KAS') {
					/*
					this.standarLib.showListData(this, "Daftar Akun Kas",this.cb_akun,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
											  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
					*/
					this.standarLib.showListData2(this, "Daftar Rekening Kas",this.cb_akun,undefined, 
											  "select  distinct c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
											  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",										  
											  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
											  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='001' and a.kode_curr='"+this.cb_curr.getText()+"'",
											  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
				} else
					if (this.cb_jenis.getText().toUpperCase() == 'BANK') {
					/*
						this.standarLib.showListData(this, "Daftar Akun Bank",this.cb_akun,undefined, 
											  "select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
											  "select count(a.kode_akun)  from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
											  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
					*/
					this.standarLib.showListData2(this, "Daftar Rekening Bank",this.cb_akun,undefined, 
											  "select  distinct c.kode_bank, c.nama as nama_bank , a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
											  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",										  
											  "select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
											  "                                          inner join bank2 c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  "+
											  "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_flag='009' and a.kode_curr='"+this.cb_curr.getText()+"'",
											  ["c.kode_bank","c.nama","a.kode_akun","a.nama"],"and",["Kode Rek","Nama Rek","Kode Akun","Nama Akun"],false);
				}
			}
			if (sender == this.cb_curr) 
			{
			    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
											  "select kode_curr, nama from curr ",
											  "select count(kode_curr) from curr",
											  ["kode_curr","nama"],"where",["Kode Currency","Deskripsi"],false);
			}
			if (sender == this.cb_pembuat) 
			{   
			    this.standarLib.showListData(this, "Daftar Petugas Cashier",this.cb_pembuat,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama Karyawan"],false);
			}
		}
		catch(e)
		{
			alert(e);
		}
	},
	doFindBtnClick: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col, 
													  "select a.kode_akun, a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
													  "select count(a.kode_akun)  from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
													  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);
					break;
				case 5 : 
					this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
													  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
													  ["kode_pp","nama"],"and",["Kode PP","Deskripsi"],false);
					break;
				case 7 : 
					this.standarLib.showListDataForSG(this, "Daftar RKM",this.sg1, this.sg1.row, this.sg1.col,
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  ["a.kode_drk","a.nama"],"and",["Kode RKM","Deskripsi"],true);
					break;
				case 9 : 
					this.standarLib.showListDataForSG(this, "Daftar KasBank",this.sg1, this.sg1.row, this.sg1.col,
													  "select  distinct kode_bank, nama  from bank2 where kode_lokasi = '"+this.app._lokasi+"' and kode_akun='"+this.sg1.getCell(0,this.sg1.row)+"'",
													  "select count(kode_bank) from bank2 where kode_lokasi = '"+this.app._lokasi+"' and kode_akun='"+this.sg1.getCell(0,this.sg1.row)+"'",
													  ["kode_bank","nama"],"and",["Kode KasBank","Deskripsi"],true);
					break;
			}
		}catch(e)
		{
			alert("[app_saku_kb_transaksi_fTakK] : doFindBtnClick : " + e);
		}
	},
	doNilaiChange: function(){
		try
		{
			var totD = totC = nKB = 0; 
			for (var i = 0; i < this.sg1.rows.getLength();i++)
			{
				if (this.sg1.getCell(4,i) != "")
				{
					if (this.sg1.getCell(3, i).toUpperCase() == "D")					
						totD += nilaiToFloat(this.sg1.getCell(4,i));			
					if (this.sg1.getCell(3, i).toUpperCase() == "C")					
						totC += nilaiToFloat(this.sg1.getCell(4,i));			
				}
			}
			nKB = totC - totD;
			this.ed_debet.setText(floatToNilai(totD));
			this.ed_kredit.setText(floatToNilai(totC));
			this.ed_nilai.setText(floatToNilai(nKB));
		}catch(e)
		{
			alert("[app_saku_kb_transaksi_fTakK]::doNilaiChange:"+e);
		}
	},
	doCellEnter: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 2 : 
							if (this.sg1.getCell(2,row) == "")
							this.sg1.setCell(2,row,this.ed_desc.getText());
					break;
				case 3 : 
							if (this.sg1.getCell(3,row) == "")
							this.sg1.setCell(3,row,"C");
					break;
				case 5 : 
							if ((this.sg1.getCell(5,row) == "") && (row > 0)) {
							this.sg1.setCell(5,row,this.sg1.getCell(5,(row-1)));
							this.sg1.setCell(6,row,this.sg1.getCell(6,(row-1)));
							}
					break;
			}
		}catch(e)
		{
			alert("app_saku_kb_transaksi_fTakK::doCellEnter : " + e);
			}	
	},
	doCellExit: function(sender, col, row) {
		try
		{
			switch(col)
			{
				case 3 : 
				case 4 : 
							this.sg1.validasi();
					break;
			}
		}catch(e)
		{
			alert("doFindBtnClick : " + e);
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
						system.info(this,"Transaksi Sukses ("+ this.nb+")");
						if (this.jurnalViewer === undefined){
							this.jurnalViewer = new app_saku_fJurnalViewer(this.app,{bound:[this.width / 2 - 400,70,800,450]});									
						}
						this.jurnalViewer.previewHtml(this.dbLarge.getJurnalHtml("select a.no_kas as no_ju,a.no_dokumen,a.kode_lokasi,a.periode,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tanggal1,a.keterangan,a.kode_lokasi, "+
									"	   a.nik_buat,b.nama as nama_buat,b.jabatan as jabatan_buat,a.nik_app as nik_setuju,c.nama as nama_setuju,c.jabatan as jabatan_setuju "+
									"from kas_m a "+
									"left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
									"left join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi "+
									"where a.no_kas = '"+this.nb+"' and a.kode_lokasi = '"+this.app._lokasi+"'",
									"select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  "+
									"from kas_j a "+
									"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"where a.no_kas='"+this.nb+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
									"order by a.dc desc "));
									
						this.doModalResult("clear",mrOk);
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
	},
	doLoadData: function(sender){
		try{
			var data = this.dbLib.getDataProvider("select a.jenis, a.keterangan as ket, a.tanggal,a.kode_curr, a.kurs, a.no_dokumen, a.kode_bank as akuntak, b.kode_akun, c.nama, b.keterangan, b.dc, b.nilai, b.kode_pp, ifnull(d.nama,'-') as nmpp, b.kode_drk, ifnull(e.nama,'-') as nmdrk, b.kode_bank, ifnull(f.nama,'-') as nmbank, a.kode_lokasi2, a.nik_buat "+
							" from kas_m a inner join kas_j b on b.no_kas = a.no_kas and b.kode_lokasi = a.kode_lokasi and b.kode_akun <> a.kode_bank "+
							" inner join masakun c on c.kode_akun = b.kode_akun and c.kode_lokasi = a.kode_lokasi "+
							" left outer join pp d on d.kode_pp = b.kode_pp and d.kode_lokasi = b.kode_lokasi "+
							" left outer join drk e on e.kode_drk = b.kode_drk and e.kode_lokasi = b.kode_lokasi "+
							" left outer join bank2 f on f.kode_bank = b.kode_bank and f.kode_lokasi = b.kode_lokasi "+
							"where a.no_kas = '"+this.cb_bukti.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);			
			if (typeof data != "string"){
				this.sg1.clear();			
				if (data.rs.rows[0]){
					var line = data.rs.rows[0];					
					this.ed_desc.setText(line.ket);
					this.cb_jenis.setText(line.jenis);
					this.jenis = line.jenis;
					this.ed_dok.setText(line.no_dokumen);
					this.dp_tgl1.setText(line.tanggal);
					this.cb_curr.setText(line.kode_curr);
					this.ed_kurs.setText(line.kurs);
					this.cb_akun.setText(line.akuntak);
					this.cb_lokasi.setText(line.kode_lokasi2);
					this.cb_pembuat.setText(line.nik_buat);
					for (var i in data.rs.rows){
						line = data.rs.rows[i];
						this.sg1.appendData([line.kode_akun, line.nama,line.keterangan, line.dc.toUpperCase(), floatToNilai(line.nilai), line.kode_pp, line.nmpp, line.kode_drk, line.nmdrk, line.kode_bank, line.nmbank]);
					}
					setTipeButton(tbUbahHapus);
				}else setTipeButton(tbAllFalse);
			}else setTipeButton(tbAllFalse);
		}catch(e){
			systemAPI.alert(e);
		}
	}
});
