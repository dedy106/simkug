window.app_mede_transaksi_fPo = function(owner)
{
	if (owner)
	{
		window.app_mede_transaksi_fPo.prototype.parent.constructor.call(this,owner);
		this.className  = "app_mede_transaksi_fPo";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Form Purchase Order : Input",0);

		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],caption:"Periode",readOnly:true, tag:9});
		this.lblTgl1 = new portalui_label(this,{bound:[20,32,101,20],caption:"Tanggal",underline:true});			
		uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;util_standar;util_addOnLib;app_saku_fJurnalViewer");	
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120, 34, 82,18]});
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,56,230,20],caption:"No PO",readOnly:true});
		this.bGen = new portalui_button(this,{bound:[256,56, 80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)"});
		this.ed_dok = new portalui_saiLabelEdit(this,{bound:[20,78, 310, 20],caption:"No Dok. Kontrak",maxLength:50});
		this.ed_desc = new portalui_saiLabelEdit(this,{bound:[20,100,500,20],caption:"Deskripsi",maxLength:150});
		this.cb_curr = new portalui_saiCBBL(this,{bound:[20,122,185,20],caption:"Currency dan Kurs",readOnly:true, rightLabelVisible:false});
		this.ed_kurs = new portalui_saiLabelEdit(this,{bound:[205,122, 45, 20],labelWidth:0,tipeText:ttNilai, alignment:alRight, readOnly:true});
		this.cb_vendor = new portalui_saiCBBL(this,{bound:[20,144, 185, 20],caption:"Vendor",readOnly:true});
		this.cb_pembuat = new portalui_saiCBBL(this,{bound:[20,166,185, 20],caption:"Penanggung Jawab", readOnly:true});
		this.lbltgl2 = new portalui_label(this,{bound:[20,188, 101, 20],caption:"Tanggal Mulai",underline:true});		
		this.dp_tgl2 = new portalui_datePicker(this,{bound:[120,190,82,18]});
		this.lbltgl3 = new portalui_label(this,{bound:[250,188, 101, 20],caption:"Tanggal Selesai",underline:true});		
		this.dp_tgl3 = new portalui_datePicker(this,{bound:[350,190,82,18]});
		this.ed_denda = new portalui_saiLabelEdit(this,{bound:[680,144,220,20],tipeText:ttNilai, caption:"% Denda/1000",alignment:alRight,text:"0"});
		this.ed_ppn = new portalui_saiLabelEdit(this,{bound:[680,166,220,20],caption:"Nilai PPN",tipeText:ttNilai, alignment:alRight,text:"0"});		
		this.ed_nilai = new portalui_saiLabelEdit(this,{bound:[680,188,220,20],caption:"Nilai PO",tipeText:ttNilai, alignment:alRight,text:"0", readOnly:true});		
		this.bGar = new portalui_imageButton(this,{bound:[900,188,22,22],hint:"Hitung Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png"});		
		this.p1 = new portalui_panel(this,{bound:[20,210,900,260],caption:"Daftar Item Barang"});		
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,895,210],colCount:12,colTitle:["No PR","RKM","Keterangan","Satuan","Kode Akun","Qty","Harga","SubTotal","Kode PP","Kode RKM","Harga PR","Periode PR"],
			colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[60,100,60,60,100,100,50,80,50,200,80,110]],buttonStyle:[[0],[bsEllips]],colReadOnly:[true,[1,3,4,5,7,8,9,10,11],[]],
			colFormat:[[5,6,7,10],[cfNilai,cfNilai, cfNilai, cfNilai]]});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,234,899,25],buttonStyle:2,grid:this.sg1});
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();						
			this.addOnLib = new util_addOnLib();			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(["Kode Akun","Kode PP","Kode RKM","Periode","Nilai","Saldo Anggaran"]);
			this.jurnal.p.setCaption('Data Anggaran');
		
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.bGar.onClick.set(this, "garClick");
			this.ed_nilai.onChange.set(this, "doEditChange");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_vendor.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			//this.ed_dok.onBtnClick.set(this, "FindBtnClick");
			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			
			this.standarLib.clearByTag(this, [0,9],this.dp_tgl1);
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(1);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");			
			var data = this.dbLib.runSQL("select value1 from spro where kode_spro = 'PPPNM' and kode_lokasi='"+this.app._lokasi+"'");
			var row = undefined;			
			row = data.get(0);
			if (row !== undefined)
				this.pppn = row.get("value1");
			this.ed_ppn.setText("0");
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_mede_transaksi_fPo.extend(window.portalui_childForm);
window.app_mede_transaksi_fPo.implement({
	mainButtonClick:function(sender){
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
		for (var i=0; i < this.sg1.rows.getLength(); i++)
		{
			for (var j=i; j < this.sg1.rows.getLength(); j++)
			{
				if (((this.sg1.getCell(0,i)) == (this.sg1.getCell(0,j))) && ((this.sg1.getCell(2,i)) == (this.sg1.getCell(2,j))) && 
				   ((this.sg1.getCell(4,i)) == (this.sg1.getCell(4,j))) && (i != j) )
				{
					var a = i+1; var b = j+1;
					system.alert(this,"Data [PR, Akun dan Barang] tidak boleh duplikasi.","[baris "+b+" dan "+a+"]");
					return false;
				}
			}		
		}
		this.hitungGar();
		for (var i in this.gridJurnal.objList)
		{
			line = this.gridJurnal.get(i);
			if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0))
			{
				system.alert(this,"Nilai PO melebihi saldo anggaran.","Periksa kembali data anggaran.");
				return false;
			}
		}
		if ( (new Date()).strToDate(this.dp_tgl3.getDate())  < (new Date()).strToDate(this.dp_tgl2.getDate()))
		{
			system.alert(this,"Tanggal mulai tidak valid.","Tanggal selesai harus lebih besar dari tanggal mulai kontrak.");
			return false;
		}
		if  (nilaiToFloat(this.ed_nilai.getText()) <= 0)
		{
			system.alert(this,"Nilai PO tidak valid.","Nilai tidak boleh nol atau kurang");
			return false;
		}
		
		this.bGen.click();
		if (this.standarLib.checkEmptyByTag(this, new Array("0")))
		{
			try
			{
				var tgl = new Date();
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				
				sql.add("insert into doc_po_m (no_po,kode_lokasi,no_dokumen,kode_vendor,tanggal,tgl_mulai,tgl_selesai,keterangan,kode_pp,progress,"+
						"             periode,kode_curr,kurs,nilai,nilai_ppn,p_denda,nik_pnj,tgl_input,nik_user,no_del,no_link) values  "+
						"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.cb_vendor.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.dp_tgl2.getDate()+"','"+this.dp_tgl3.getDate()+"','"+this.ed_desc.getText()+"','-','0','"+
						     this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+","+
							 parseNilai(this.ed_ppn.getText())+","+parseNilai(this.ed_denda.getText())+",'"+this.cb_pembuat.getText()+"',now(),'"+this.app._userLog+"','-','-')");
				
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{			
					var j = i+1;
					sql.add("insert into doc_po_d (no_po,no_pr,no_urut,kode_brg,kode_lokasi,kode_sat,kode_akun,jumlah,nilai,status) values "+	
							"('"+this.ed_nb.getText()+"','"+this.sg1.getCell(0,i)+"',"+j+",'"+this.sg1.getCell(2,i)+"','"+this.app._lokasi+"','"+
							this.sg1.getCell(3,i)+"','"+this.sg1.getCell(4,i)+"',"+parseNilai(this.sg1.getCell(5,i))+","+parseNilai(this.sg1.getCell(6,i))+",'1')");
				}
			
				//------------------------------------------------------------------------------------------ ANGGARAN ------------------------------------------------------------------------------
				var scr1 = "insert into angg_r (no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values ";
				var baris1 = true;
				var line = undefined;
				var DC = "";
				for (var i in this.gridJurnal.objList)
				{
					if (!baris1) { scr1 += ",";}	
					line = this.gridJurnal.get(i);
					DC = "D";
					scr1 += "('"+this.ed_nb.getText()+"','PO','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_pp")+"','"+line.get("kode_drk")+
						"','"+line.get("periode")+"','"+this.ed_period.getText()+"','"+DC+"',"+parseFloat(line.get("saldo_gar"))+","+Math.abs(parseFloat(line.get("nilai")))+")";
					baris1 = false;
				}	
				var npr = 0;
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{			
					if (!baris1) { scr1 += ",";}	
					DC = "C";
					npr = nilaiToFloat(this.sg1.getCell(11,i)) * nilaiToFloat(this.sg1.getCell(6,i));
					scr1 += "('"+this.sg1.getCell(0,i)+"','PO','"+this.app._lokasi+"','"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(9,i)+"','"+this.sg1.getCell(10,i)+
						"','"+this.sg1.getCell(12,i)+"','"+this.ed_period.getText()+"','"+DC+"',0,"+npr+")";
					baris1 = false;
				}
				
				sql.add(scr1);
				
				this.dbLib.execArraySQL(sql);	
			}catch(e){
				system.alert(this, e,"");
			}
		}
	},
	doModalResult : function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, [0,9],undefined);				
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg1.clear(1);
					this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
				}
				break;
				
			case "simpan" :
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
		}
	},
	genClick : function(sender){
		try
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'po_m','no_po',this.app._lokasi+"-PO"+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_dok.setFocus();
			}else
				system.alert(this,"Periode harus valid.","");		
		}catch (e){
			alert(e);
		}
	},
/*
showClick : function(sender)
{
	try
	{
		this.sg1.showLoading();
		var line,data = this.dbLib.runSQL(" select a.kode_brg,b.nama,b.kode_sat,a.jumlah,a.nilai,a.jumlah*a.nilai as tot,a.keterangan "+
		                                  " from pr_d a inner join barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
										  " where a.no_pr='"+this.cb_pr.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{									
				this.sg1.clear();
				for (var i in data.objList)
				{
					line = data.get(i);
					this.gridLib.SGAppendData(this.sg1,new Array(0,1,2,3,4,5,6),
					new Array(line.get("kode_brg"),line.get("nama"),line.get("kode_sat"),line.get("keterangan"),floatToNilai(parseFloat(line.get("jumlah"))),
					floatToNilai(parseFloat(line.get("nilai"))),floatToNilai(parseFloat(line.get("tot")))));					
				}
			} 
		}			
		this.sg1.validasi();
		this.sg1.hideLoading();
	}catch(e)
	{
		alert("[ShowClick:"+e);
	}
},
*/
	
	doSelect:  function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period.setText(year.toString()+month);	
	},
	doEditChange: function(sender){
		if (sender == this.ed_period)
		{
			this.ed_nb.setText("");
			//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "")) this.bGen.click();
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
		
		if (sender == this.ed_nilai)
		{
			if ((this.ed_nilai.getText() != "0") && (this.ed_nilai.getText() != undefined))
			{
				//var nppn = this.pppn / 100 * nilaiToFloat(this.ed_nilai.getText());
				//this.ed_ppn.setText(format_number(nppn,2,',','.')); 
				var nppn = Math.round(this.pppn / 100 * nilaiToFloat(this.ed_nilai.getText()));
				this.ed_ppn.setText(floatToNilai(nppn)); 
			} else
			{
				this.ed_ppn.setText("0");
			}
		}
	},
	FindBtnClick : function(sender, event){
		try
		{		
			/*
			if (sender == this.ed_dok) 
			{
				this.standarLib.showListData(this, "Daftar Dokumen Kontrak/SPK/PKS ",this.ed_dok,undefined, 
											  "select no_dokumen,keterangan from po_m where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.ed_period.getText()+"' and progress<> '0'",
											  "select count(no_dokumen) 	from po_m where kode_lokasi='"+this.app._lokasi+"' and periode<='"+this.ed_period.getText()+"' and progress<> '0'",
											  new Array("no_dokumen","keterangan"),"and",new Array("No Dokumen","Keterangan"),false);
			}
			*/
			if (sender == this.cb_vendor) 
			{
				this.standarLib.showListData(this, "Daftar Vendor",this.cb_vendor,undefined, 
											  "select kode_vendor,nama   from doc_vendor where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_vendor) from doc_vendor where kode_lokasi='"+this.app._lokasi+"'",
											  new Array("kode_vendor","nama"),"and",new Array("Kode Vendor","Nama Vendor"),false);
			}
			if (sender == this.cb_curr) 
			{
			    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
											  "select kode_curr, nama from curr ",
											  "select count(kode_curr) from curr",
											  new Array("kode_curr","nama"),"where",new Array("Kode Currency","Deskripsi"),false);
			}
			if (sender == this.cb_pembuat) 
			{   
			    this.standarLib.showListData(this, "Daftar Penanggung Jawab",this.cb_pembuat,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  new Array("nik","nama"),"and",new Array("NIK","Nama Karyawan"),false);
			}
		}catch(e){
			alert(e);
		}
	},
	doCellExit: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 2 : 
						var line,data = this.dbLib.runSQL(" select a.kode_sat,a.kode_akun,a.jumlah,a.nilai,b.kode_pp,b.kode_drk,b.periode "+
								"from pr_d a inner join pr_m b on a.no_pr=b.no_pr and a.kode_lokasi=b.kode_lokasi "+
										"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_brg='"+this.sg1.getCell(2,row)+"' and a.no_pr = '"+this.sg1.getCell(0,row)+"' ");
						if (data instanceof portalui_arrayMap)
						{
							line = data.get(0);
							if (line != undefined)
							{
								this.sg1.setCell(3,row,line.get("kode_sat"));
								this.sg1.setCell(4,row,line.get("kode_akun"));
								this.sg1.setCell(5,row,floatToNilai(parseFloat(line.get("jumlah"))));
								this.sg1.setCell(6,row,floatToNilai(parseFloat(line.get("nilai"))));
								this.sg1.setCell(7,row,"0");
								this.sg1.setCell(8,row,line.get("kode_pp"));
								this.sg1.setCell(9,row,line.get("kode_drk"));
								this.sg1.setCell(10,row,floatToNilai(parseFloat(line.get("nilai"))));
								this.sg1.setCell(11,row,line.get("periode"));
							} 
						}				
					break;
				case 7 : 
						var total = nilaiToFloat(this.sg1.getCell(5,row)) * nilaiToFloat(this.sg1.getCell(6,row));
						this.sg1.setCell(7,row,floatToNilai(total));
						this.sg1.validasi();
					break;
			}
		}catch(e){
			alert("[app_mede_transaksi_fPo] : doFindBtnClick : " + e);
		}
	},
	doFindBtnClick : function(sender, col, row) {
		try
		{
			switch(col)
			{
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Purchase Request",this.sg1, this.sg1.row, this.sg1.col, 
													  "select distinct a.no_pr,b.nama as nama_drk  "+
													  "from pr_m a inner join drk b on a.kode_drk=b.kode_drk and a.kode_lokasi = b.kode_lokasi and b.tahun = substring(a.periode,1,4) "+
													  "            inner join pr_d c on a.no_pr=c.no_pr and a.kode_lokasi=c.kode_lokasi "+
													  "            left outer join po_d d on c.no_pr=d.no_pr and c.kode_lokasi=d.kode_lokasi and c.kode_brg=d.kode_brg and c.kode_akun=d.kode_akun and d.status = '1' "+
													  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.progress = '1' and d.no_po is null",
													  
													  "select count(distinct a.no_pr)  "+
													  "from pr_m a inner join drk b on a.kode_drk=b.kode_drk and a.kode_lokasi = b.kode_lokasi and b.tahun = substring(a.periode,1,4) "+
													  "            inner join pr_d c on a.no_pr=c.no_pr and a.kode_lokasi=c.kode_lokasi "+
													  "            left outer join po_d d on c.no_pr=d.no_pr and c.kode_lokasi=d.kode_lokasi and c.kode_brg=d.kode_brg and c.kode_akun=d.kode_akun and d.status ='1' "+
													  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.progress = '1' and d.no_po is null",
													  new Array("no_pr","nama_drk"),"and",new Array("No PR","RKM"),false);
					break;
				case 2 : 
					this.standarLib.showListDataForSG(this, "Daftar Barang PR",this.sg1, this.sg1.row, this.sg1.col, 
													  "select a.kode_brg,b.nama from pr_d a "+
													  "                         inner join barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi = b.kode_lokasi "+
													  "							left outer join po_d c on a.no_pr=c.no_pr and a.kode_brg=c.kode_brg and a.kode_lokasi = c.kode_lokasi and c.status = '1'"+
													  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_pr = '"+this.sg1.getCell(0,row)+"' and c.no_po is null ",
													  "select count(a.kode_brg) from pr_d a "+
													  "                         inner join barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi = b.kode_lokasi "+
													  "							left outer join po_d c on a.no_pr=c.no_pr and a.kode_brg=c.kode_brg and a.kode_lokasi = c.kode_lokasi and c.status = '1'"+
													  "where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_pr = '"+this.sg1.getCell(0,row)+"' and c.no_po is null ",
													  new Array("a.kode_brg","b.nama"),"and",new Array("Kode Barang","Nama"),false);
					break;
			}
		}catch(e)
		{
			alert("[app_mede_transaksi_fPo] : doFindBtnClick : " + e);
		}
	},
	doNilaiChange : function(){
		try
		{
			var tot = 0;  
			for (var i = 0; i < this.sg1.rows.getLength();i++)
			{
				if (this.sg1.getCell(8,i) != "")
				{
					tot += nilaiToFloat(this.sg1.getCell(8,i));			
				}
			}
			this.ed_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_mede_transaksi_fPo]::doNilaiChange:"+e);
		}
	},
	hitungGar: function(){
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var ngar,nreal,ix,dtJrnl = 0;
		var periode = kdAkun = kdPP = kdDRK = "";
		
		for (var i=0; i < this.sg1.rows.getLength(); i++)
		{
			kdAkun = this.sg1.getCell(4,i);
			kdPP = this.sg1.getCell(8,i);
			kdDRK = this.sg1.getCell(9,i);
			periode = this.sg1.getCell(11,i);
			
			nreal = nilaiToFloat(this.sg1.getCell(7,i));		
			ngar = nilaiToFloat(this.sg1.getCell(10,i)) * nilaiToFloat(this.sg1.getCell(5,i));		
			nemu = false;
			ix = 0;
						
			for (var j in dtJurnal.objList)
			{		
			  if ((kdAkun == dtJurnal.get(j).get("kode_akun")) && (kdPP == dtJurnal.get(j).get("kode_pp")) && 
			      (kdDRK == dtJurnal.get(j).get("kode_drk")) && (periode == dtJurnal.get(j).get("periode"))) 
			  {
				nemu = true;
				row = dtJurnal.get(j);
				ix = j;
				break;
			  }
			}
			
			if (!nemu){
				row = new portalui_arrayMap();
				row.set("kode_akun",kdAkun);
				row.set("kode_pp",kdPP);
				row.set("kode_drk",kdDRK);
				row.set("periode",periode);
				row.set("nilai",nreal);
				row.set("saldo_gar",ngar);
				dtJrnl++;
				dtJurnal.set(dtJrnl,row);						
			}else {
				dtJurnal.get(ix).set("nilai",row.get("nilai") + nreal);				
				dtJurnal.get(ix).set("saldo_gar",row.get("saldo_gar") + ngar);				
			}
		}
		
		if (dtJurnal.getLength() > 0){
			var desc1 = new portalui_arrayMap();
			desc1.set("kode_akun",125);
			desc1.set("kode_pp",125);
			desc1.set("kode_drk",125);
			desc1.set("periode",75);
			desc1.set("nilai",150);
			desc1.set("saldo_gar",150);
			
			var desc2 = new portalui_arrayMap();
			desc2.set("kode_akun","S");
			desc2.set("kode_pp","S");
			desc2.set("kode_drk","S");	
			desc2.set("periode","S");	
			desc2.set("nilai","N");
			desc2.set("saldo_gar","N");
			
			var dataDesc = new portalui_arrayMap();
			dataDesc.set(0,desc1);
			dataDesc.set(1,desc2);
			dtJurnal.setTag2(dataDesc);
		}
		this.gridJurnal = dtJurnal;
		//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		
		var line = undefined;
		var sls = 0;
		for (var i in this.gridJurnal.objList)
		{
			line = this.gridJurnal.get(i);
			var baris,data = this.dbLib.runSQL("select fn_cekagg2('"+line.get("kode_pp")+"','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_drk")+"','"+line.get("periode")+"') as gar ");
			if (data instanceof portalui_arrayMap)
			{
				baris = data.get(0);
				if (baris != undefined)
				{
					baris = baris.get("gar");
					data = baris.split(";");
					sls = parseFloat(line.get("saldo_gar")) + parseFloat(data[0]) - parseFloat(data[1]);
					line.set("saldo_gar",sls);
					this.gridJurnal.set(i,line);		
				} 
			} else alert(data);
		}	
	},
	garClick : function(sender){
		try
		{
			if (this.ed_nilai.getText() != "0")
			{
				this.jurnal.sg.clear();
				this.hitungGar();
				if (this.gridJurnal != undefined){				
					this.jurnal.setData(this.gridJurnal);
					this.jurnal.showModal();
				}
			}
		} catch	(e)
		{
			alert(e);
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
			}catch(e)
			{
				alert("step : "+step+"; error = "+e);
			}
	    }
	}
});