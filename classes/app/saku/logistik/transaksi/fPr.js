window.app_saku_logistik_transaksi_fPr = function(owner)
{
	if (owner)
	{
		window.app_saku_logistik_transaksi_fPr.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_logistik_transaksi_fPr";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Form Purchase Request: Input",0);
		
		this.ed_period = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],readOnly:true, tag:9,caption:"Periode"});
		this.lblTgl1 = new portalui_label(this,{bound:[20,32,101,20],caption:"Tanggal",underline:true});
		uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;util_standar;app_saku_fJurnalViewer");	
		this.dp_tgl1 = new portalui_datePicker(this,{bound:[120,34,82,18]});		
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,56,230,20],caption:"No PR",readOnly:true});		
		this.bGen = new portalui_button(this,{bound:[256,56,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)"});		
		this.ed_desc = new portalui_saiLabelEdit(this,{bound:[20,78,500,20],caption:"Deskripsi",maxLength:150});
		this.cb_curr = new portalui_saiCBBL(this,{bound:[20,100,185,20],caption:"Currency dan Kurs",readOnly:true,rightLabelVisible:false});
		this.ed_kurs = new portalui_saiLabelEdit(this,{bound:[205,100,45,20],labelWidth:0,tipeText:ttNilai, alignment:alRight,readOnly:true});
		this.ed_dok = new portalui_saiLabelEdit(this,{bound:[290,100,230,20],caption:"No Dokumen",maxLength:50});
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,122,185,20],caption:"PP",readOnly:true});
		this.cb_drk = new portalui_saiCBBL(this,{bound:[20,144,185,20],caption:"Data RKM",readOnly:true});
		this.cb_pembuat = new portalui_saiCBBL(this,{bound:[20,166,185,20],caption:"Dibuat Oleh",readOnly:true});		
		this.cb_setuju = new portalui_saiCBBL(this,{bound:[20,188,185,20],caption:"Disetujui Oleh",readOnly:true});
		this.ed_nilai = new portalui_saiLabelEdit(this,{bound:[680,188,220,20],caption:"Nilai PR",tipeText:ttNilai,alignment:alRight,readOnly:true});
		this.bGar = new portalui_imageButton(this,{bound:[900,188,22,22],hint:"Hitung Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png"});
		
		this.p1 = new portalui_panel(this,{bound:[20,210,900,260],caption:"Daftar Item Barang"});	
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,895,210],colCount:9,colTitle:["Kode Akun","Nama Akun","Kode Brg","Nama Barang","Satuan","Keterangan","Qty","Nilai","SubTotal"],
			buttonStyle:[[0,2],[bsEllips,bsEllips]],colReadOnly:[[1,3,4,8],[],true],colFormat:[[6,7,8],[cfNilai, cfNilai, cfNilai]]});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,234,899,25],grid:this.sg1,buttonStyle:2});
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.standarLib = new util_standar();			
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(["Kode Akun","Kode PP","Kode RKM","Nilai","Saldo Anggaran"]);
			this.jurnal.p.setCaption('Data Anggaran');		
			
			this.standarLib.clearByTag(this, [0,9],this.dp_tgl1);				

			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.bGar.onClick.set(this, "garClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");
			this.cb_drk.onBtnClick.set(this, "FindBtnClick");
			this.cb_pembuat.onBtnClick.set(this, "FindBtnClick");
			this.cb_setuju.onBtnClick.set(this, "FindBtnClick");
			this.cb_pp.onBtnClick.set(this, "FindBtnClick");
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
						
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(1);
			this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
			var pp = this.app._pp.split(";");
			this.cb_pp.setText(pp[0]);
			this.cb_pp.setRightLabelCaption(pp[1]);			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_logistik_transaksi_fPr.extend(window.portalui_childForm);
window.app_saku_logistik_transaksi_fPr.implement({
	mainButtonClick: function(sender)}{
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
		if (this.standarLib.checkEmptyByTag(this, [0]))
		{
			try
			{
				var tgl = new Date();
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				
				sql.add("insert into pr_m (no_pr,no_po,kode_lokasi,no_dokumen,kode_drk,tanggal,keterangan,kode_pp,progress,"+
						"             periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,no_del,no_link) values  "+
						"('"+this.ed_nb.getText()+"','-','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.cb_drk.getText()+"','"+this.dp_tgl1.getDate()+"','"+this.ed_desc.getText()+"','"+this.cb_pp.getText()+"','0','"+
						 this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_nilai.getText())+","+
					     "'"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+"',now(),'"+this.app._userLog+"','-','-')");
				
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{			
					var j = i+1;
					sql.add("insert into pr_d (no_pr,no_urut,kode_akun,kode_brg,kode_lokasi,kode_sat,keterangan,jumlah,nilai) values "+	
							"('"+this.ed_nb.getText()+"',"+j+",'"+this.sg1.getCell(0,i)+"','"+this.sg1.getCell(2,i)+"','"+this.app._lokasi+"','"+this.sg1.getCell(4,i)+"','"+this.sg1.getCell(5,i)+"',"+parseNilai(this.sg1.getCell(6,i))+","+parseNilai(this.sg1.getCell(7,i))+")");
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
					if (parseFloat(line.get("nilai")) < 0) {DC = "C";}
					else {DC = "D";}
					scr1 += "('"+this.ed_nb.getText()+"','PR','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_pp")+"','"+line.get("kode_drk")+
						"','"+this.ed_period.getText()+"','"+this.ed_period.getText()+"','"+DC+"',"+parseFloat(line.get("saldo_gar"))+","+Math.abs(parseFloat(line.get("nilai")))+")";
					baris1 = false;
				}	
				sql.add(scr1);
				
				this.dbLib.execArraySQL(sql);	
			}catch(e){
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
					this.standarLib.clearByTag(this, new Array("0","9"),undefined);				
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg1.clear();  this.sg1.appendRow();
					this.cb_curr.setText("IDR"); this.ed_kurs.setText("1");
					var pp = this.app._pp.split(";");
					this.cb_pp.setText(pp[0]);
					this.cb_pp.setRightLabelCaption(pp[1]);
				}
				break;
				
			case "simpan" :
				for (var i=0; i < this.sg1.rows.getLength(); i++)
				{
					for (var j=i; j < this.sg1.rows.getLength(); j++)
					{
						if (((this.sg1.getCell(0,i)) == (this.sg1.getCell(0,j))) && ((this.sg1.getCell(2,i)) == (this.sg1.getCell(2,j))) && (i != j) )
						{
							var a = i+1; var b = j+1;
							system.alert(this,"Data [Akun dan Barang] tidak boleh duplikasi.","[baris "+b+" dan "+a+"]");
							return false;
						}
					}		
				}
				if  (nilaiToFloat(this.ed_nilai.getText()) <= 0)
				{
					system.alert(this,"Nilai PR tidak valid.","Nilai tidak boleh nol atau kurang");
					return false;
				}
				this.hitungGar();
				for (var i in this.gridJurnal.objList)
				{
					line = this.gridJurnal.get(i);
					if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0))
					{
						system.alert(this,"Nilai pengajuan PR melebihi saldo anggaran.","Periksa kembali data anggaran.");
						return false;
					}
				}	
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
	genClick: function(sender){
		try
		{
			if (this.ed_period.getText() != "")
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'pr_m','no_pr',this.app._lokasi+"-PR"+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_desc.setFocus();
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
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_drk) 
			{								  
				this.standarLib.showListData(this, "Daftar RKM",this.cb_drk,undefined, 
											  " select distinct d.kode_drk, d.nama from anggaran_d b "+
											  "       inner join pp c on b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp "+
											  "       inner join drk d on b.kode_lokasi=d.kode_lokasi and b.kode_drk=d.kode_drk and d.tahun ='"+this.ed_period.getText().substr(0,4)+"' "+ //and upper(d.jenis_akun) = 'INVESTASI'
											  " where b.kode_lokasi = '"+this.app._lokasi+"' and c.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%'",
											  " select count(distinct d.kode_drk) from anggaran_d b "+
											  "       inner join pp c on b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp "+
											  "       inner join drk d on b.kode_lokasi=d.kode_lokasi and b.kode_drk=d.kode_drk and d.tahun ='"+this.ed_period.getText().substr(0,4)+"'  "+ //and upper(d.jenis_akun) = 'INVESTASI'
											  " where b.kode_lokasi = '"+this.app._lokasi+"' and c.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%'",
											  new Array("kode_drk","nama"),"and",new Array("Kode RKM","Deskripsi"),false);
				this.sg1.clear(); this.sg1.appendRow();
			}
			if (sender == this.cb_pp) 
			{   
			    if (this.app._userStatus != 'A') 
				{var sts = " and kode_pp = '"+this.app._kodePP+"'";} 
				else {var sts = " ";}
				this.standarLib.showListData(this, "Daftar PP",this.cb_pp,undefined, 
											  "select kode_pp,nama   from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' "+sts,
											  "select count(kode_pp) from pp where kode_lokasi='"+this.app._lokasi+"' and tipe='posting' "+sts,
											  new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);
				this.sg1.clear(); this.sg1.appendRow();
			}
			if (sender == this.cb_curr) 
			{
			    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
											  "select kode_curr, nama  from curr",
											  "select count(kode_curr) from curr",
											  new Array("kode_curr","nama"),"where",new Array("Kode Currency","Deskripsi"),false);
			}
			if (sender == this.cb_pembuat) 
			{   
			    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_pembuat,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'",
											  new Array("nik","nama"),"and",new Array("NIK","Nama Karyawan"),false);
			}
			if (sender == this.cb_setuju) 
			{   
			    this.standarLib.showListData(this, "Daftar Karyawan",this.cb_setuju,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  new Array("nik","nama"),"and",new Array("NIK","Nama Karyawan"),false);
			}
		}catch(e){
			alert(e);
		}
	},
	doCellExit : function(sender, col, row){
		try
		{
			switch(col)
			{
				case 2 : 
						var line,data = this.dbLib.runSQL(" select nama,kode_sat,concat(merk,' ',tipe) as ket,harga_ref from barang_m where kode_lokasi='"+this.app._lokasi+"' and kode_brg='"+this.sg1.getCell(2,row)+"'");
						if (data instanceof portalui_arrayMap)
						{
							line = data.get(0);
							if (line != undefined)
							{
								this.sg1.setCell(3,row,line.get("nama"));
								this.sg1.setCell(4,row,line.get("kode_sat"));
								this.sg1.setCell(5,row,line.get("ket"));
								this.sg1.setCell(6,row,"0");
								this.sg1.setCell(7,row,floatToNilai(parseFloat(line.get("harga_ref"))));
								this.sg1.setCell(8,row,"0");
							} 
						}				
					break;
				case 6 :
				case 7 : 
						var total = nilaiToFloat(this.sg1.getCell(6,row)) * nilaiToFloat(this.sg1.getCell(7,row));
						this.sg1.setCell(8,row,floatToNilai(total));
						this.sg1.validasi();
					break;
			}
		}catch(e){
			alert("[app_saku_logistik_transaksi_fPr] : doFindBtnClick : " + e);
		}
	},
	doFindBtnClick : function(sender, col, row){
		try
		{
			switch(col)
			{
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col, 
														"select distinct a.kode_akun, a.nama from masakun a inner join anggaran_d b on a.kode_akun = b.kode_akun where b.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_drk='"+this.cb_drk.getText()+"'",
														"select distinct count(a.kode_akun)  from masakun a inner join anggaran_d b on a.kode_akun = b.kode_akun where b.kode_pp='"+this.cb_pp.getText()+"' and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_drk='"+this.cb_drk.getText()+"'",
														new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
					break;
				case 2 : 
					this.standarLib.showListDataForSG(this, "Daftar Item Barang",this.sg1, this.sg1.row, this.sg1.col, 
													  "select kode_brg,nama   from barang_m where kode_lokasi = '"+this.app._lokasi+"'",
													  "select count(kode_brg) from barang_m where kode_lokasi = '"+this.app._lokasi+"'",
													  new Array("kode_brg","nama"),"and",new Array("Kode Barang","Nama Barang"),false);
					break;
			}
		}catch(e){
			alert("[app_saku_logistik_transaksi_fPr] : doFindBtnClick : " + e);
		}
	},
	doNilaiChange: function(){
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
			alert("[app_saku_logistik_transaksi_fPr]::doNilaiChange:"+e);
		}
	},
	hitungGar : function(){
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var nreal,ix,dtJrnl = 0;
		var kdAkun = "";
		
		for (var i=0; i < this.sg1.rows.getLength(); i++)
		{
			kdAkun = this.sg1.getCell(0,i);
			nreal = nilaiToFloat(this.sg1.getCell(8,i));		
			nemu = false;
			ix = 0;
			
			for (var j in dtJurnal.objList)
			{		
			  if (kdAkun == dtJurnal.get(j).get("kode_akun")) 
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
				row.set("kode_pp",this.cb_pp.getText());
				row.set("kode_drk",this.cb_drk.getText());
				row.set("nilai",nreal);
				row.set("saldo_gar",0);
				dtJrnl++;
				dtJurnal.set(dtJrnl,row);						
			}else {
				dtJurnal.get(ix).set("nilai",row.get("nilai") + nreal);				
			}
		}
		
		if (dtJurnal.getLength() > 0){
			var desc1 = new portalui_arrayMap();
			desc1.set("kode_akun",150);
			desc1.set("kode_pp",150);
			desc1.set("kode_drk",150);
			desc1.set("nilai",150);
			desc1.set("saldo_gar",150);
			
			var desc2 = new portalui_arrayMap();
			desc2.set("kode_akun","S");
			desc2.set("kode_pp","S");
			desc2.set("kode_drk","S");	
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
			var baris,data = this.dbLib.runSQL("select fn_cekagg2('"+line.get("kode_pp")+"','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_drk")+"','"+this.ed_period.getText()+"') as gar ");
			if (data instanceof portalui_arrayMap)
			{
				baris = data.get(0);
				if (baris != undefined)
				{
					baris = baris.get("gar");
					if (baris == undefined)	{
						system.alert(this,"Data untuk Akun:"+line.get("kode_akun") +", PP: "+line.get("kode_pp")+", drk: "+line.get("kode_drk")+" Periode "+this.ed_period.getText()+" anggaran tidak ada","Cek Data Anggarannya");
						return;
					}	
					data = baris.split(";");
					sls = parseFloat(data[0]) - parseFloat(data[1]);
					line.set("saldo_gar",sls);
					this.gridJurnal.set(i,line);		
				} 
			} else alert(data);
		}
	},
	garClick: function(sender){
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
		} catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName){
				case "execArraySQL" :
					step="info";
					if (result.toLowerCase().search("error") == -1)					
					{
						this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.ed_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else system.info(this,result,"");
					break;				
				}    		
			}catch(e){
				alert("step : "+step+"; error = "+e);
			}
	    }
	}
});