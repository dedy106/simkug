window.app_saku_piutang_master_fProduk = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_master_fProduk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_master_fProduk";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Produk : Input/Koreksi", 0);
		
		uses("portalui_saiCBBL");
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(30);
		this.e0.setWidth(200);
		this.e0.setCaption("Kode");
		this.e0.setText("");
		this.e0.setReadOnly(false);
		this.e0.onExit.set(this, "EditExit");
		this.e0.onChange.set(this, "doEditChange");
		this.e0.onKeyPress.set(this, "keyPress");
		this.e0.onBtnClick.set(this, "FindBtnClick");
		this.e0.setLabelWidth(100);
		this.e0.setRightLabelVisible(false);
		this.e0.setRightLabelCaption(" ");
		this.e0.setTag(1);
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(55);
		this.e1.setWidth(400);
		this.e1.setCaption("Nama");
		this.e1.setText("");
		this.e1.setReadOnly(false);
		this.e1.setTag(1);
		
		this.eAkunAR = new portalui_saiCBBL(this);
		this.eAkunAR.setLeft(20);
		this.eAkunAR.setTop(80);
		this.eAkunAR.setWidth(200);
		this.eAkunAR.setCaption("Akun Piutang");
		this.eAkunAR.setText("");
		this.eAkunAR.setReadOnly(false);
		this.eAkunAR.onBtnClick.set(this,"FindBtnClick");
		
		this.eAkunPdpt = new portalui_saiCBBL(this);
		this.eAkunPdpt.setTop(105);
		this.eAkunPdpt.setLeft(20);
		this.eAkunPdpt.setWidth(200);
		this.eAkunPdpt.setCaption("Akun Pendapatan");
		this.eAkunPdpt.setText("");
		this.eAkunPdpt.onBtnClick.set(this,"FindBtnClick");
		
		this.eAkunBbn = new portalui_saiCBBL(this);
		this.eAkunBbn.setTop(130);
		this.eAkunBbn.setLeft(20);
		this.eAkunBbn.setWidth(200);
		this.eAkunBbn.setCaption("Akun Beban");
		this.eAkunBbn.setText("");
		this.eAkunBbn.onBtnClick.set(this,"FindBtnClick");
		
		this.eAkunPdd = new portalui_saiCBBL(this);
		this.eAkunPdd.setTop(155);
		this.eAkunPdd.setLeft(20);
		this.eAkunPdd.setWidth(200);
		this.eAkunPdd.setCaption("Akun PDD");
		this.eAkunPdd.setText("");
		this.eAkunPdd.onBtnClick.set(this,"FindBtnClick");
		
		this.eBebanAR = new portalui_saiCBBL(this);
		this.eBebanAR.setTop(180);
		this.eBebanAR.setLeft(20);
		this.eBebanAR.setWidth(200);
		this.eBebanAR.setCaption("Beban Peny. AR");
		this.eBebanAR.setText("");
		this.eBebanAR.onBtnClick.set(this,"FindBtnClick");
		
		this.eAkmAR = new portalui_saiCBBL(this);
		this.eAkmAR.setTop(205);
		this.eAkmAR.setLeft(20);
		this.eAkmAR.setWidth(200);
		this.eAkmAR.setCaption("Akumulasi Peny.");
		this.eAkmAR.setText("");
		this.eAkmAR.onBtnClick.set(this,"FindBtnClick");
		
		uses("portalui_saiCB");
		this.eJenis = new portalui_saiCB(this);
		this.eJenis.setLeft(20);
		this.eJenis.setTop(230);
		this.eJenis.setWidth(200);
		this.eJenis.setCaption("Jenis");
		this.eJenis.setText("");		
		this.eJenis.addItem(0,"BPP");
		this.eJenis.addItem(1,"SKS");
		this.eJenis.addItem(2,"LAINNYA");
		
		this.eNilai = new portalui_saiLabelEdit(this);
		this.eNilai.setTop(255);
		this.eNilai.setLeft(20);
		this.eNilai.setWidth(200);
		this.eNilai.setCaption("Nilai Default");
		this.eNilai.setText("");
		this.eNilai.setTipeText(ttNilai);		
		this.eNilai.setAlignment(alRight);
		
		this.eRkmPdpt = new portalui_saiCBBL(this);
		this.eRkmPdpt.setTop(280);
		this.eRkmPdpt.setLeft(20);
		this.eRkmPdpt.setWidth(200);
		this.eRkmPdpt.setCaption("RKM Pendapatan");
		this.eRkmPdpt.setText("");
		this.eRkmPdpt.onBtnClick.set(this,"FindBtnClick");
		
		this.eRkmBbn = new portalui_saiCBBL(this);
		this.eRkmBbn.setTop(305);
		this.eRkmBbn.setLeft(20);
		this.eRkmBbn.setWidth(200);
		this.eRkmBbn.setCaption("RKM Beban");
		this.eRkmBbn.setText("");
		this.eRkmBbn.onBtnClick.set(this,"FindBtnClick");
		
		this.ePP = new portalui_saiCBBL(this);
		this.ePP.setTop(330);
		this.ePP.setLeft(20);
		this.ePP.setWidth(200);
		this.ePP.setCaption("PP");
		this.ePP.setText("");
		this.ePP.onBtnClick.set(this,"FindBtnClick");
		
		this.eJurusan = new portalui_saiCBBL(this);
		this.eJurusan.setTop(355);
		this.eJurusan.setLeft(20);
		this.eJurusan.setWidth(200);
		this.eJurusan.setCaption("Jurusan");
		this.eJurusan.setText("");
		this.eJurusan.onBtnClick.set(this,"FindBtnClick");
		
		this.eStatus = new portalui_saiCB(this);
		this.eStatus.setTop(380);
		this.eStatus.setLeft(20);
		this.eStatus.setWidth(200);
		this.eStatus.setCaption("Status");
		this.eStatus.setText("");
		this.eStatus.addItem(0,"S1");
		this.eStatus.addItem(1,"MM");		
		
		this.ePPn = new portalui_saiCBBL(this);
		this.ePPn.setTop(405);
		this.ePPn.setLeft(20);
		this.ePPn.setWidth(200);
		this.ePPn.setCaption("Akun PPN");
		this.ePPn.setText("");
		this.ePPn.onBtnClick.set(this,"FindBtnClick");
		
		this.ePPh = new portalui_saiCBBL(this);
		this.ePPh.setTop(430);
		this.ePPh.setLeft(20);
		this.ePPh.setWidth(200);
		this.ePPh.setCaption("Akun PPH");
		this.ePPh.setText("");
		this.ePPh.onBtnClick.set(this,"FindBtnClick");
		
		setTipeButton(tbSimpan);
		this.maximize();
		this.setTabChildIndex();
		this.rearrangeChild(10,23);
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e)
		{
			alert("[app_saku_piutang_master_fProduk]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_master_fProduk.extend(window.portalui_childForm);
window.app_saku_piutang_master_fProduk.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data di form ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_saku_piutang_master_fProduk.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, ["0","1"],this.e0);				
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, ["1"])))
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into produk (kode_produk, nama_produk, akun_piutang, kode_akun, akun_beban, akun_pdd, beban_susut, akun_deprs, "+									
									"jenis, nilai, kode_drk_pdpt, kode_drk_beban, kode_pp, kode_jur, status_modul, akun_ppn, akun_pph, kode_lokasi) values  "+
							"('"+this.e0.getText()+"','"+this.e1.getText()+"','"+this.eAkunAR.getText()+"','"+this.eAkunPdpt.getText()+"' "+
								" ,'"+this.eAkunBbn.getText()+"','"+this.eAkunPdd.getText()+"','"+this.eBebanAR.getText()+"' "+
								" ,'"+this.eAkmAR.getText()+"','"+this.eJenis.getText()+"','"+parseNilai(this.eNilai.getText())+"' "+
								" ,'"+this.eRkmPdpt.getText()+"','"+this.eRkmBbn.getText()+"','"+this.ePP.getText()+"','"+this.eJurusan.getText()+"' "+
								" ,'"+this.eStatus.getText()+"','"+this.ePPn.getText()+"','"+this.ePPh.getText()+"','"+this.app._lokasi+"') ");
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
		case "ubah" :
			if (modalResult == mrOk)
			{				
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("update produk set  "+
							"akun_piutang='"+this.eAkunAR.getText()+"',"+
							"kode_akun='"+this.eAkunPdpt.getText()+"',"+
							"akun_beban='"+this.eAkunBbn.getText()+"',"+
							"akun_pdd='"+this.eAkunPdd.getText()+"',"+
							"beban_susut='"+this.eBebanAR.getText()+"', "+
							"akun_deprs='"+this.eAkmAR.getText()+"', "+
							"jenis='"+this.eJenis.getText()+"',"+
							"nilai='"+parseNilai(this.eNilai.getText())+"', "+
							"kode_drk_pdpt='"+this.eRkmPdpt.getText()+"', "+
							"kode_drk_beban='"+this.eRkmBbn.getText()+"',"+
							"kode_pp='"+this.ePP.getText()+"', "+
							"kode_jur='"+this.eJurusan.getText()+"', "+
							"status_modul='"+this.eStatus.getText()+"', "+
							"akun_ppn='"+this.ePPn.getText()+"', "+
							"akun_pph='"+this.ePPh.getText()+"' "+
							"	where kode_produk = '"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					this.dbLib.execArraySQL(sql);	
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {			  
				  uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from produk where kode_produk ='"+this.e0.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					this.dbLib.execArraySQL(sql);						
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_saku_piutang_master_fProduk.prototype.labelClick = function(sender)
{
	if (sender == this.lStatus)	this.eStatus.setSelected(!this.eStatus.selected);
	if (sender == this.lStatus2) this.eStatus2.setSelected(!this.eStatus2.selected);
};
window.app_saku_piutang_master_fProduk.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{
			var rs = this.dbLib.runSQL("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ");
			if (rs instanceof portalui_arrayMap)
			{
				var akun, masakun = new Array;
				for (var i in rs.objList){
					akun = rs.get(i);
					masakun[akun.get("kode_akun")] = akun.get("nama");
				}
			}
			setTipeButton(tbSimpan);
			var data = this.dbLib.runSQL("select a.*,b.nama as nmDrkPdpt , c.nama as nmDrkBbn, d.nama as nmPP, e.nama_jur as nmJur "+
					"			from produk a "+
					"			  left outer join drk b on b.kode_drk = a.kode_drk_pdpt and a.kode_lokasi = b.kode_lokasi "+
					"			  left outer join drk c on c.kode_drk = a.kode_drk_beban and a.kode_lokasi = c.kode_lokasi "+
					"			  inner join pp d on d.kode_pp = a.kode_pp and d.kode_lokasi = a.kode_lokasi "+
					"			  inner join jurusan e on e.kode_jur = a.kode_jur and e.kode_lokasi = a.kode_lokasi "+
					"where a.kode_produk = '"+this.e0.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ");			
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.e1.setText(data.get("nama_produk"));
					this.eAkunAR.setText(data.get("akun_piutang"));
					this.eAkunAR.setRightLabelCaption(masakun[data.get("akun_piutang")]);
					this.eAkunPdpt.setText(data.get("kode_akun"));
					this.eAkunPdpt.setRightLabelCaption(masakun[data.get("kode_akun")]);
					this.eAkunBbn.setText(data.get("akun_beban"));
					this.eAkunBbn.setRightLabelCaption(masakun[data.get("akun_beban")]);
					this.eAkunPdd.setText(data.get("akun_pdd"));
					this.eAkunPdd.setRightLabelCaption(masakun[data.get("akun_pdd")]);
					this.eBebanAR.setText(data.get("beban_susut"));
					this.eBebanAR.setRightLabelCaption(masakun[data.get("beban_susut")]);
					this.eAkmAR.setText(data.get("akun_deprs"));
					this.eAkmAR.setRightLabelCaption(masakun[data.get("akun_deprs")]);
					this.eJenis.setText(data.get("jenis"));
					this.eNilai.setText(data.get("nilai"));
					this.eRkmPdpt.setText(data.get("kode_drk_pdpt"));
					this.eRkmPdpt.setRightLabelCaption(data.get("nmDrkPdpt"));
					this.eRkmBbn.setText(data.get("kode_drk_beban"));
					this.eRkmBbn.setRightLabelCaption(data.get("nmDrkBbn"));
					this.ePP.setText(data.get("kode_pp"));
					this.ePP.setRightLabelCaption(data.get("nmPP"));
					this.eJurusan.setText(data.get("kode_jur"));
					this.eJurusan.setRightLabelCaption(data.get("nmJur"));
					this.eStatus.setText(data.get("status_modul"));
					this.ePPn.setText(data.get("akun_ppn"));
					this.ePPn.setRightLabelCaption(masakun[data.get("akun_ppn")]);
					this.ePPh.setText(data.get("akun_pph"));
					this.ePPh.setRightLabelCaption(masakun[data.get("akun_pph")]);
					
					setTipeButton(tbUbahHapus);
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_piutang_master_fProduk.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		switch (sender){
		case this.eJurusan :
			this.standarLib.showListData(this, "Data Jurusan",sender,undefined, 
										  "select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from jurusan where kode_lokasi = '"+this.app._lokasi+"' ",
										  ["kode_jur","nama_jur"],"and",["Kode Jurusan","Nama Jurusan"]);
			break;
		case this.e0 :
			this.standarLib.showListData(this, "Data Produk",sender,undefined, 
										  "select kode_produk, nama_produk from produk where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from produk where kode_lokasi = '"+this.app._lokasi+"' ",
										  ["kode_produk","nama_produk"],"and",["Kode Produk","Nama Produk"]);
			break;
		case this.eRkmPdpt :
		case this.eRkmBbn :
			this.standarLib.showListData(this, "Data DRK",sender,undefined, 
										  "select kode_drk, nama from drk where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from drk where kode_lokasi = '"+this.app._lokasi+"' ",
										  ["kode_drk","nama"],"and",["Kode DRK","Nama DRK"]);
			break;
		case this.ePP :
			this.standarLib.showListData(this, "Data PP",sender,undefined, 
										  "select kode_pp, nama from pp where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from pp where kode_lokasi = '"+this.app._lokasi+"' ",
										  ["kode_pp","nama"],"and",["Kode PP","Nama PP"]);
			break;
		case this.eAkunAR :
		case this.eAkunPdpt :
		case this.eAkunBbn :
		case this.eAkunPdd :
		case this.eBebanAR :
		case this.eAkmAR :
		case this.ePPn :
		case this.ePPh :
			this.standarLib.showListData(this, "Data Master Akun",sender,undefined, 
										  "select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from masakun where kode_lokasi = '"+this.app._lokasi+"' ",
										  ["kode_akun","nama"],"and",["Kode Akun","Nama Akun"]);
			break;
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_piutang_master_fProduk.prototype.doRequestReady = function(sender, methodName, result)
{
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
		              this.app._mainForm.pesan(2,"process completed ("+ this.e0.getText()+")");
		              this.app._mainForm.bClear.click();              
		            }else system.info(this,result,"");
    			break;
    		}
		}catch(e)
		{
		   alert("step : "+step+"; error = "+e);
		}
	}
};