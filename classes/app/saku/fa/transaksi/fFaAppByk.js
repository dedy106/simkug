window.app_saku_fa_transaksi_fFaAppByk = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_transaksi_fFaAppByk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fa_transaksi_fFaAppByk";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kapitalisasi Asset Non PO: Input", 0);	
		
		
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],caption:"Periode",readOnly:true});
		uses("portalui_label;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_saiGrid");
		this.lbltgl1 = new portalui_label(this,{bound:[20,2,101,18],caption:"Tanggal",underline:true});		
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,2,82,18]});
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,3,220,20],caption:"No Bukti",readOnly:true});
		this.bGen = new portalui_button(this,{bound:[246,3,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)"});
		this.ed_dok = new portalui_saiLabelEdit(this,{bound:[20,4,300,20],caption:"No Dokumen"});
		this.ed_desc = new portalui_saiLabelEdit(this,{bound:[20,5,500,20],caption:"Deskripsi"});		
		this.cb_curr = new portalui_saiCBBL(this,{bound:[20,6,185,20],caption:"Currency - Kurs",rightLabelVisible:false});
		this.ed_kurs = new portalui_saiLabelEdit(this,{bound:[205,6,40,20],caption:"",labelWidth:0,readOnly:true,text:"1", tipeText:ttNilai});
		this.cb_buat = new portalui_saiCBBL(this,{bound:[20,7,185,20],caption:"Dibuat Oleh"});
		this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,8,185,20],caption:"Disetujui Oleh"});				
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,9,185,20],caption:"PP"});
		this.cb_drk = new portalui_saiCBBL(this,{bound:[20,10,185,20],caption:"RKM"});
		this.cb_jenis = new portalui_saiCB(this,{bound:[735,10,188,20],caption:"Jns Kapitalisasi"});
		this.cb_klpfa = new portalui_saiCBBL(this,{bound:[20,11,185,20],caption:"Kelompok Asset"});						
		this.b_load = new portalui_button(this,{bound:[735,11,80,20],caption:"Load Asset", click:"doTampil"});
		this.b_setSpb = new portalui_button(this,{bound:[835,11,80,20],caption:"Approve", click:"doTampil"});
		this.cb_jenis.addItem("S","SPB");
		this.cb_jenis.addItem("B","BARU");
		this.cb_jenis.setTag("9");
		this.cb_jenis.setReadOnly(true);
		this.cb_jenis.setLabelWidth(85);
		
		this.pgCtrl = new portalui_pageControl(this,{bound:[20,11,900,250],childPage:["Data Asset","Item Jurnal SPB"]});						
		this.sg0 = new portalui_saiGrid(this.pgCtrl.childPage[0],{bound:[1,1,895,220],colCount:10,
			colTitle:["Data Asset","Barcode","Deskripsi","No Approve","Akun SPB","Nilai Approve","Klp Asset","Akun Asset","Lokasi Asset","Nilai Asset"],
			colWidth:[[9,8,7,6,5,4,3,2,1,0],[110,110,110,110,120,120,120,80,150,110]],buttonStyle:[[0],[bsEllips]],
			colReadOnly:[true,[1,2,4,7,8,9],[]],colFormat:[[5,9],[cfNilai, cfNilai]],rowCount:1}); 
	    this.sgn0 = new portalui_sgNavigator(this.pgCtrl.childPage[0],{bound:[1,222,899,25],buttonStyle:2,grid:this.sg0});
		this.ed_nilai = new portalui_saiLabelEdit(this.sgn0,{bound:[300,3,250,20],caption:"Total Asset", tipeText:ttNilai,readOnly:true});
		this.ed_totRkn = new portalui_saiLabelEdit(this.sgn0,{bound:[600,3,250,20],caption:"Total Rekon Asset", tipeText:ttNilai,readOnly:true});
		
		this.sg1 = new portalui_saiGrid(this.pgCtrl.childPage[1],{bound:[1,1,895,220],colCount:12,
			colTitle:["No SPB","Deskripsi","Kode Akun","Nama Akun","Keterangan","DC","Sisa Nilai SPB","Nilai Kapitalisasi","Kode Dept.","Nama Dept.","Kode DRK","Nama DRK"],
			colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[150,80,100,80,110,110,130,120,120,80,150,110]],
			buttonStyle:[[0,2],[bsEllips,bsEllips]], colReadOnly:[true,[1,3,4,5,6,8,9,10,11],[]],colFormat:[[6,7],[cfNilai, cfNilai]]}); 
	    this.sgn = new portalui_sgNavigator(this.pgCtrl.childPage[1],{bound:[1,222,899,25],buttonStyle:2,grid:this.sg1});
		this.ed_spb = new portalui_saiLabelEdit(this.sgn,{bound:[710,2,185,20],caption:"Total Rekon SPB",tipeText:ttNilai, readOnly:true});
		
		this.sg2 = new portalui_saiGrid(this.pgCtrl.childPage[1],{bound:[1,1,895,220],colCount:9,
			colTitle:["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
			colWidth:[[8,7,6,5,4,3,2,1,0],[180,80,100,80,120,30,250,120,80]],
			buttonStyle:[[0,3,5,7],[bsEllips,bsEllips,bsEllips,bsEllips]],colReadOnly:[true,[3,6,8],[]],
			colFormat:[[4],[cfNilai]],visible:false, tag:2});
		var val = new portalui_arrayMap({items:["C"]});		
		this.sg2.columns.get(3).setPicklist(val);		
		this.sgn2 = new portalui_sgNavigator(this.pgCtrl.childPage[1],{bound:[1,222,899,25],grid:this.sg2,buttonStyle:2,visible:false,tag:2});
		this.ed_total = new portalui_saiLabelEdit(this.sgn2,{bound:[710,2,185,20],caption:"Total Jurnal",tipeText:ttNilai, readOnly:true,tag:2});
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);
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
			this.cb_jenis.onChange.set(this, "doEditChange");
			
			
			this.cb_pp.setSQL("select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe= 'posting'",["kode_pp","nama"]);
			this.cb_setuju.setSQL("select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"]);
			this.cb_buat.setSQL("select nik,nama   from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"]);			
			this.cb_curr.setSQL("select kode_curr,nama   from curr",["kode_curr","nama"]);			
			this.cb_klpfa.setSQL("select kode_klpfa,nama   from fa_klp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting'",["kode_klpfa","nama"]);
			
			this.sg0.onNilaiChange.set(this, "doNilaiChange");
			this.sg0.onEllipsClick.set(this, "doFindBtnClick");			
			this.sg0.onCellExit.set(this, "doCellExit");			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onCellExit.set(this, "doCellExit");			
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onChange.set(this, "doSGChange");
			this.sg2.onEllipsClick.set(this, "do2FindBtnClick");
			this.sg2.onNilaiChange.set(this, "do2NilaiChange");			
			this.sg2.onCellExit.set(this, "do2CellExit");
			this.sg2.onCellEnter.set(this, "do2CellEnter");
			
			this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			this.cb_jenis.setText("SPB");
			this.sg1.clear(1);this.sg0.clear(1);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_fa_transaksi_fFaAppByk.extend(window.portalui_childForm);
window.app_saku_fa_transaksi_fFaAppByk.implement({
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
		if (this.cb_jenis.getText() == "SPB") var sgTag = "3"; else  var sgTag = "4";
		if (this.standarLib.checkEmptyByTag(this, new Array("0","1",sgTag)))
		{
			try
			{
				var tgl = new Date(), no_fa = [], faScript = [], scriptJurnal = [];
				uses("server_util_arrayList");
				sql = new server_util_arrayList();				
				var idx=0, akunAsset = "", totalAsset = 0;	
				for (var i=0;i < this.sg0.getRowCount();i++){
					if (this.sg0.cells(3,i) != "-" && this.sg0.cells(3,i) != ""){
						no_fa.push("'"+this.sg0.cells(0,i)+"'");
						if (this.cb_jenis.getText() == "SPB") 
							faScript.push("('"+this.ed_nb.getText()+"','"+this.sg0.cells(0,i)+"','"+this.sg0.getCell(3,i)+"','"+this.sg0.getCell(4,i)+"','"+this.app._lokasi+"',"+parseNilai(this.sg0.getCell(5,i))+",'SPB-FA')"); 
						else 
							faScript.push("('"+this.ed_nb.getText()+"','"+this.sg0.cells(0,i)+"','-','"+this.sg0.getCell(4,i)+"','"+this.app._lokasi+"',"+parseNilai(this.sg0.getCell(5,i))+",'SPB-FA')"); 
						if (akunAsset != this.sg0.cells(7,i)){
							if (totalAsset != 0)
								scriptJurnal.push("('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+idx+",'"+akunAsset+
									"','"+this.ed_desc.getText()+"','D',"+totalAsset+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"',"+
									"'"+this.app._lokasi+"','FA_APP','ASSET','"+this.ed_period.getText()+
									"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+								
									",'"+this.app._userLog+"',now())");
							akunAsset = this.sg0.cells(7,i);
							idx++;
						}
						totalAsset += nilaiToFloat(this.sg0.cells(5,i));						
					}
				}
				if (totalAsset != 0 && akunAsset != "")
					scriptJurnal.push("('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+idx+",'"+akunAsset+
						"','"+this.ed_desc.getText()+"','D',"+totalAsset+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"',"+
						"'"+this.app._lokasi+"','FA_APP','ASSET','"+this.ed_period.getText()+
						"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+								
						",'"+this.app._userLog+"',now())");
				
				sql.add("update fa_asset set progress='1' where no_fa in ("+no_fa+") and kode_lokasi = '"+this.app._lokasi+"'");
				
				sql.add("insert into fa_app (no_faapp,no_spb,no_dokumen,kode_lokasi,tanggal,keterangan,kode_curr,kurs,no_fa,nilai,kode_pp,kode_drk,modul,posted,nik_buat,nik_setuju,periode,no_del,no_link,nik_user,tgl_input) values "+
						"('"+this.ed_nb.getText()+"','-','"+this.ed_dok.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+",'-',"+parseNilai(this.ed_nilai.getText())+",'"+
						this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.cb_jenis.getText()+"','F','"+this.cb_buat.getText()+"','"+this.cb_setuju.getText()+"','"+this.ed_period.getText()+"','-','-',"+
						"'"+this.app._userLog+"','now()')");						
				
				sql.add("insert into fa_j (no_faapp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+scriptJurnal);
				
				idx++;				
				sql.add("insert into fa_spb (no_faapp,no_fa,no_spb,kode_akun,kode_lokasi,nilai,status) values "+faScript);
				
				if (this.cb_jenis.getText() == "SPB")
				{											
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{			
						sql.add("insert into fa_j (no_faapp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
								"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
								"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+idx+",'"+this.sg1.getCell(2,i)+
								"','"+this.sg1.getCell(0,i)+"','C',"+parseNilai(this.sg1.getCell(7,i))+",'"+this.sg1.getCell(8,i)+"','"+this.sg1.getCell(10,i)+"',"+
								"'"+this.app._lokasi+"','FA_APP','SPB','"+this.ed_period.getText()+
								"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
								",'"+this.app._userLog+"',now())");
						idx++;
					}
				}else
				{
					for (var i=0; i < this.sg2.rows.getLength(); i++)
					{			
						sql.add("insert into fa_j (no_faapp,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,"+
								"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
								"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+idx+",'"+this.sg2.getCell(0,i)+
								"','"+this.sg2.getCell(2,i)+"','"+this.sg2.getCell(3,i)+"',"+parseNilai(this.sg2.getCell(4,i))+",'"+this.sg2.getCell(5,i)+"','"+this.sg2.getCell(7,i)+"',"+
								"'"+this.app._lokasi+"','FA_APP','BARU','"+this.ed_period.getText()+
								"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
								",'"+this.app._userLog+"',now())");
						idx++;
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);	
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
					this.cb_jenis.setText("SPB");
					this.sg1.clear(); this.sg1.appendRow();
				}
				break;
			
			case "simpan" :	
				if (parseFloat(this.app._periode) > parseFloat(this.ed_period.getText()))
				{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (this.cb_jenis.getText() == "SPB")
				{
					if (nilaiToFloat(this.ed_spb.getText()) != nilaiToFloat(this.ed_nilai.getText()))
					{
						system.alert(this,"Data SPB tidak valid.","Nilai total SPB tidak sama dengan nilai asset.");
						return false;
					}
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						for (var j=i; j < this.sg1.rows.getLength(); j++)
						{
							if (((this.sg1.getCell(0,i)) == (this.sg1.getCell(0,j))) && ((this.sg1.getCell(2,i)) == (this.sg1.getCell(2,j))) && (i != j) )
							{
								var a = i+1; var b = j+1;
								system.alert(this,"Data SPB tidak boleh duplikasi.","[baris "+b+" dan "+a+"]");
								return false;
							}
						}		
					}
				}
				else
				{
					if (nilaiToFloat(this.ed_total.getText()) != nilaiToFloat(this.ed_nilai.getText()))
					{
						system.alert(this,"Data jurnal tidak valid.","Nilai total jurnal tidak sama dengan nilai asset.");
						return false;
					}
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
		if (sender == this.cb_jenis)
		{
			if (this.cb_jenis.getText() == "SPB") {this.sg1.show(); this.sg2.hide(); this.sg1.clear(1); this.sgn2.hide();this.sgn1.show();}
			else {this.sg2.show(); this.sg1.hide();this.sgn2.show();this.sgn1.hide();}
		}
		
	},
	FindBtnClick: function(sender, event){
		try
		{
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
											  new Array("kode_drk","nama"),"and",new Array("Kode RKM","Deskripsi"),false);			
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
	doSGChange: function(sender, col, row) {
		try
		{
			switch(col)
			{
				case 1:
						this.sg1.setCell(3,row,""); this.sg1.setCell(2,row,""); 
					break;			
			}
		} catch(e)
		{
			alert(e);
		}
	},
	doCellExit: function(sender, col, row){
		if (sender == this.sg1){
			try
			{
				switch(col)
				{
					case 2: 
							var line,data = this.dbLib.runSQL(" select a.keterangan,a.dc,a.nilai-ifnull(e.nilai,0) as sisa,a.kode_pp,ifnull(c.nama,'-') as nama_pp,a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
															  " from spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
															  "              left outer join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
															  "              left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
															  "              left outer join "+
															  "                   (select x.no_spb,x.kode_akun,x.kode_lokasi,sum(x.nilai) as nilai "+
															  "                    from fa_spb x inner join fa_app y on x.no_faapp=y.no_faapp and x.kode_lokasi=y.kode_lokasi "+
															  "                    where x.status = 'SPB-FA' and y.no_del= '-' group by x.no_spb,x.kode_akun,x.kode_lokasi) e    "+
															  "                    on a.no_spb=e.no_spb and a.kode_lokasi=e.kode_lokasi and a.kode_akun=e.kode_akun "+
															  " where a.kode_akun = '"+this.sg1.getCell(2,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_spb='"+this.sg1.getCell(0,row)+"' and a.dc = 'D' ");
															  
							if (data instanceof portalui_arrayMap)
							{
								line = data.get(0);
								if (line != undefined)
								{
									this.sg1.setCell(4,row,line.get("keterangan"));
									this.sg1.setCell(5,row,line.get("dc"));
									this.sg1.setCell(6,row,floatToNilai(parseFloat(line.get("sisa"))));
									this.sg1.setCell(7,row,"0");
									this.sg1.setCell(8,row,line.get("kode_pp"));
									this.sg1.setCell(9,row,line.get("nama_pp"));
									this.sg1.setCell(10,row,line.get("kode_drk"));
									this.sg1.setCell(11,row,line.get("nama_drk"));
								} else
								{
									this.sg1.setCell(4,row,"");
									this.sg1.setCell(5,row,"");
									this.sg1.setCell(6,row,"");
									this.sg1.setCell(7,row,"");
									this.sg1.setCell(8,row,"");
									this.sg1.setCell(9,row,"");
									this.sg1.setCell(10,row,"");
									this.sg1.setCell(11,row,"");
								}
							}			
						break;
					case 7:
							this.sg1.validasi();
						break;
					
				}
			}catch(e)
			{
				alert("[app_saku_fa_transaksi_fFaAppByk] : doFindBtnClick : " + e);
			}
		}else if (sender == this.sg0){
			if (col == 0){
				var data = this.dbLib.getDataProvider("select a.no_fa,a.nama, a.barcode, a.kode_klpfa, a.kode_akun, a.kode_lokfa, a.nilai "+
					" from fa_asset a inner join fa_d b on a.no_fa=b.no_fa and a.kode_lokasi = b.kode_lokasi and b.no_fr = 'NONPO' "+
					" where a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' and a.kode_klpfa = '"+this.cb_klpfa.getText()+"' and a.no_fa = '"+sender.cells(0,row)+"' ",true);
				if (typeof data != "string"){
					var line, total= 0;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];
						total += parseFloat(line.nilai);
						this.sg0.appendData([line.no_fa, line.barcode, line.nama, '-','-',floatToNilai(line.nilai),line.kode_klpfa, line.kode_akun, line.kode_lokfa, floatToNilai(line.nilai)]);
					}
					this.sg0.validasi();
				}
			}else if (this.ed_jenis.getText() == "SPB" && col == 3 && sender.cells(col, row) != "-" && sender.cells(col, row) != ""){
				//cari SPB di sg1
				var found = false;
				for (var i=0;i < this.sg1.getRowCount();i++){
					found = this.sg1.cells(0,i) == sender.cells(col, row);
					if (found) break;
				}
				if (!found) {
					system.alert(this,"SPB "+sender.cells(col, row)+" tidak ditemukan","Kolom akan diset -.");
					sender.cells(col, row, "-");
				}
			}
		}
	},
	do2CellExit: function(sender, col, row) {
		try
		{
			switch(col)
			{
				case 3 : 
				case 4 : 
							this.sg2.validasi();
					break;
			}
		}catch(e)
		{
			alert("doFindBtnClick : " + e);
		}
	},
	doFindBtnClick: function(sender, col, row){
		try
		{
			if (sender == this.sg0){				
				this.standarLib.showListDataForSG(this, "Daftar Asset",this.sg1, this.sg1.row, this.sg1.col, 
					" select a.no_fa, a.nama from fa_asset a inner join fa_d b on a.no_fa=b.no_fa and a.kode_lokasi = b.kode_lokasi and b.no_fr = 'NONPO' "+
					" where a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' and a.kode_klpfa = '"+this.cb_klpfa.getText()+"' ",
					"select count(*)   from fa_asset a inner join fa_d b on a.no_fa=b.no_fa and a.kode_lokasi = b.kode_lokasi and b.no_fr = 'NONPO' "+
					" where a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' and a.kode_klpfa = '"+this.cb_klpfa.getText()+"' ",
					["no_fa","nama"],"and",["No Asset","Keterangan"],false);
			}
			if (sender == this.sg1){
				switch(col)
				{
					case 0 : 
						this.standarLib.showListDataForSG(this, "Daftar SPB",this.sg1, this.sg1.row, this.sg1.col, 
														  "select no_spb,keterangan from spb_m where kode_lokasi = '"+this.app._lokasi+"' and no_del='-' and periode<='"+this.ed_period.getText()+"' and modul <> 'SPPLOG' and progress='2' ",
														  "select count(no_spb)     from spb_m where kode_lokasi = '"+this.app._lokasi+"' and no_del='-' and periode<='"+this.ed_period.getText()+"' and modul <> 'SPPLOG' and progress='2' ",
														  new Array("no_spb","keterangan"),"and",new Array("No SPB","Keterangan"),false);
						break;
					case 2 : 
						this.standarLib.showListDataForSG(this, "Daftar Akun Debet SPB",this.sg1, this.sg1.row, this.sg1.col, 
														  "select a.kode_akun,b.nama from spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_spb='"+this.sg1.getCell(0,row)+"' and a.dc='D'",
														  "select count(a.kode_akun) from spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_spb='"+this.sg1.getCell(0,row)+"' and a.dc='D'",
														  new Array("kode_akun","nama"),"and",new Array("Kode Akun","Nama Akun"),false);
						break;
				}
			}
		}catch(e)
		{
			alert("[app_saku_fa_transaksi_fFaAppByk] : doFindBtnClick : " + e);
		}
	},
	do2FindBtnClick: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg2, this.sg2.row, this.sg2.col, 
													  "select a.kode_akun, a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and (a.jenis = 'Pendapatan' or a.modul = 'P')",
													  "select count(a.kode_akun)  from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"' and (a.jenis = 'Pendapatan' or a.modul = 'P')",
													  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
					break;
				case 5 : 
					this.standarLib.showListDataForSG(this, "Daftar PP",this.sg2, this.sg2.row, this.sg2.col,
													  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
													  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
													  new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);
					break;
				case 7 : 
					this.standarLib.showListDataForSG(this, "Daftar RKM",this.sg2, this.sg2.row, this.sg2.col,
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg2.getCell(5,row)+"' and b.kode_akun='"+this.sg2.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg2.getCell(5,row)+"' and b.kode_akun='"+this.sg2.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  new Array("a.kode_drk","a.nama"),"and",new Array("Kode RKM","Deskripsi"),true);
					break;
			}
		}catch(e)
		{
			alert("[app_saku_kb_transaksi_nonpro_kb_fKbin] : doFindBtnClick : " + e);
		}
	},
	doNilaiChange: function(sender){
		if (sender == this.sg1){
			try
			{
				var spb = 0;
				for (var i = 0; i < this.sg1.rows.getLength();i++)
				{
					if (this.sg1.getCell(7,i) != "")
					{
						spb += nilaiToFloat(this.sg1.getCell(7,i));
					}
				}
				this.ed_spb.setText(floatToNilai(spb));
			}catch(e)
			{
				alert("doNilaiChange:"+e);
			}
		}else if (sender == this.sg0){
			var spb = 0, total = 0;
			for (var i = 0; i < sender.rows.getLength();i++)
			{
				if (sender.cells(9,i) != "" && sender.cells(3,i) !="-" && sender.cells(3,i) !="")
					total += nilaiToFloat(sender.cells(9,i));				
				if (sender.cells(5,i) != "" && sender.cells(3,i) !="-" && sender.cells(3,i) !="")
					spb += nilaiToFloat(sender.cells(5,i));				
			}
			this.ed_totRkn.setText(floatToNilai(spb));	
			this.ed_nilai.setText(floatToNilai(total));
		}
	},
	do2NilaiChange: function(){
		try
		{
			var total = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++)
			{
				if (this.sg2.getCell(4,i) != "")
				{
					total += nilaiToFloat(this.sg2.getCell(4,i));
				}
			}
			this.ed_total.setText(floatToNilai(total));
		}catch(e)
		{
			alert("doNilaiChange:"+e);
		}
	},
	do2CellEnter: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 2 : 
							if (this.sg2.getCell(2,row) == "")
								this.sg2.setCell(2,row,this.ed_desc.getText());
					break;
				case 3 : 
							if (this.sg2.getCell(3,row) == "")
								this.sg2.setCell(3,row,"C");
					break;
				case 5 : 
							this.sg2.setCell(5,row,this.cb_pp.getText());
							this.sg2.setCell(6,row,this.cb_pp.rightLabelCaption);
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
						this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.ed_nb.getText()+")");
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
	},
	doTampil: function(sender){
		if (sender == this.b_load){
			var data = this.dbLib.getDataProvider("select a.no_fa,a.nama, a.barcode, a.kode_klpfa, a.kode_akun, a.kode_lokfa, a.nilai "+
				" from fa_asset a inner join fa_d b on a.no_fa=b.no_fa and a.kode_lokasi = b.kode_lokasi and b.no_fr = 'NONPO' "+
				" where a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' and a.kode_klpfa = '"+this.cb_klpfa.getText()+"' ",true);
			if (typeof data != "string"){
				var line, total= 0;
				this.sg0.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];				
					this.sg0.appendData([line.no_fa, line.barcode, line.nama,'-','-',floatToNilai(line.nilai),line.kode_klpfa, line.kode_akun, line.kode_lokfa, floatToNilai(line.nilai)]);
				}
				this.sg0.validasi();
			}
			
		}else{
			for (var i=0; i < this.sg0.getRowCount();i++){
				this.sg0.cells(3,i,this.sg1.cells(0,0));
			}
			this.sg0.validasi();
		}
	}
});