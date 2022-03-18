window.app_portal_transaksi_fPHTK = function(owner)
{
  if (owner)
	{
		window.app_portal_transaksi_fPHTK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_transaksi_fPHTK";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","PHT : Koreksi", 0);
		
		uses("portalui_saiCBBL",true);
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(10);
		this.e0.setWidth(200);
		this.e0.setCaption("Kode Konten");		
		this.e0.setReadOnly(true);
		this.e0.onExit.set(this, "EditExit");
		this.e0.onChange.set(this, "doEditChange");
		this.e0.onKeyPress.set(this, "keyPress");
		this.e0.onBtnClick.set(this, "FindBtnClick");		
		this.e0.setRightLabelVisible(false);
		
		this.ecust = new portalui_saiCBBL(this);
		this.ecust.setLeft(20);
		this.ecust.setTop(33);
		this.ecust.setWidth(200);
		this.ecust.setCaption("Customer");
		this.ecust.setRightLabelVisible(true);
		this.ecust.onBtnClick.set(this, "FindBtnClick");
		
		uses("portalui_saiCB",true);
		this.periodeAwal = new portalui_saiCB(this);
		this.periodeAwal.setTop(56);
		this.periodeAwal.setLeft(20);
		this.periodeAwal.setWidth(200);
		this.periodeAwal.setCaption("Periode Awal");
		this.periodeAwal.setLength(100);
		this.periodeAwal.setTag("9");
		
		this.periodeAkhir = new portalui_saiCB(this);
		this.periodeAkhir.setTop(79);
		this.periodeAkhir.setLeft(20);
		this.periodeAkhir.setWidth(200);
		this.periodeAkhir.setCaption("Periode Akhir");
		this.periodeAkhir.setLength(100);
		this.periodeAkhir.setTag("9");
		
		this.ed_nilai = new portalui_saiLabelEdit(this);
		this.ed_nilai.setLeft(20);
		this.ed_nilai.setTop(102);
		this.ed_nilai.setWidth(250);
		this.ed_nilai.setTipeText(ttNilai);
		this.ed_nilai.setAlignment(alRight);
		this.ed_nilai.setCaption("Nilai");
		this.ed_nilai.setText("");
		this.ed_nilai.setReadOnly(false);
		this.ed_nilai.setLength(100);
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(125);
		this.e1.setWidth(400);
		this.e1.setCaption("Keterangan");		
		this.e1.setReadOnly(false);
		
		this.el = new portalui_label(this);
		this.el.setLeft(20);
		this.el.setTop(148);
		this.el.setWidth(100);
		this.el.setUnderLine(true);
		this.el.setCaption("Status Aktif");
		uses("portalui_checkBox",true);
		this.cbaktif = new portalui_checkBox(this);
		this.cbaktif.setTop(152);
		this.cbaktif.setLeft(120);
		this.cbaktif.setWidth(80);
		this.cbaktif.setCaption("Aktif");
		
		this.p1 = new portalui_panel(this);
		this.p1.setLeft(20);
		this.p1.setTop(171);
		this.p1.setWidth(530);
		this.p1.setHeight(228);
		this.p1.setName('p1');
		this.p1.setCaption('Detail PHT');
		
		uses("portalui_saiGrid",true);
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setLeft(1);
		this.sg1.setTop(20);
		this.sg1.setWidth(526);
		this.sg1.setHeight(180);
		this.sg1.setName('saiSG1');
		this.sg1.setColCount(5);
		this.sg1.setReadOnly(false);
		this.sg1.setColTitle(new Array("No. Faktur","Tanggal","Nilai Omset","Nilai Retur","Jenis"));
		this.sg1init(this.sg1);
		this.sg1.onChange.set(this,"sg1onChange");
		this.sg1.onEllipsClick.set(this,"doFindBtnClick");
		
		uses("portalui_sgNavigator",true);
		this.sgn = new portalui_sgNavigator(this.p1);
		this.sgn.setTop(202);
		this.sgn.setLeft(1);
		this.sgn.setWidth(678);
		this.sgn.setName('sgn');
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(2);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			if (system.activeApplication._mainForm.lib != undefined)
			{
				var periode = system.activeApplication._mainForm.lib.getAllPeriode();
				periode = periode.split("\r\n");
				var first = true;
				for (var i in periode)
				{
					if (first)
					{
						first = false;
						continue;
					}
					this.periodeAwal.addItem(i,periode[i]);
					this.periodeAkhir.addItem(i,periode[i]);
				}
			}
		}catch(e)
		{
			alert("[app_portal_transaksi_fPHTK]->constructor : "+e);
		}
	}
};
window.app_portal_transaksi_fPHTK.extend(window.portalui_childForm);
window.app_portal_transaksi_fPHTK.prototype.sg1init = function(sg)
{
	sg.setColWidth(new Array(4,3,2,1,0),new Array(100,100,100,100,100));
	sg.columns.get(1).setButtonStyle(bsDate);
	sg.columns.get(2).setColumnFormat(cfNilai);
	sg.columns.get(3).setColumnFormat(cfNilai);
};
/*
window.app_portal_transaksi_fPHTK.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_periode.setText(year.toString()+month);
};
window.app_portal_transaksi_fPHTK.prototype.doFindBtnClick = function(sender, col, row) //ellipse click
{
	try
	{
		switch(col)
		{
		    case 0:
				if (sender == this.sg1)
		        {
					this.standarLib.ListDataSGFilter(this,"Data Barang",this.sg1, 
						  this.sg1.row, this.sg1.col,
						  "select kode_produk,nama from portal_produk ",
						  "select count(*) from portal_produk ",
						  new Array("kode_produk","nama"),"and",new Array("Kode","Nama"));
				}
			break;
		}
		
	}catch(e)
	{
		alert("[GUI_investasi_transaksi_fUsulanDep] :: doFindBtnClick : " + e);
	}
	
};*/
window.app_portal_transaksi_fPHTK.prototype.mainButtonClick = function(sender)
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
window.app_portal_transaksi_fPHTK.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.e0);
				this.cbaktif.setSelected(false);
			}
		break;
		case "ubah" :
			if (modalResult == mrOk)
			{				
				uses("server_util_arrayList",true);					
				var sql = new server_util_arrayList();
				sql.add("update portal_cust_pht set kode_cust='"+this.ecust.getText()+
				"',periode_awal='"+this.periodeAwal.getText()+"',periode_akhir='"+this.periodeAkhir.getText()+
				"',nilai="+strToFloat(this.ed_nilai.getText())+
				",keterangan='"+this.e1.getText()+"',status='"+(this.cbaktif.selected ? '1':'0')+
				"' where no_kontrak = '"+this.e0.getText()+"' ");
				sql.add("delete from portal_cust_pht_d where no_kontrak='"+this.e0.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				for (var k=0; k < this.sg1.rows.getLength(); k++)
				{
					sql.add("insert into portal_cust_pht_d (no_kontrak,no_faktur,tanggal,omset,nilai_retur,jenis,kode_lokasi) values  "+
						"('"+this.e0.getText()+"','"+this.sg1.getCell(0,k)+"','"+this.sg1.getCellDateValue(1,k)+"',"+strToFloat(this.sg1.getCell(2,k))+","+strToFloat(this.sg1.getCell(3,k))+",'"+this.sg1.getCell(4,k)+"','"+this.app._lokasi+"') ");
				}
				this.dbLib.execArraySQL(sql);
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {			  
				uses("server_util_arrayList",true);					
				var sql = new server_util_arrayList();
				sql.add("delete from portal_cust_pht_d where no_kontrak='"+this.e0.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from portal_cust_pht where no_kontrak='"+this.e0.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				this.dbLib.execArraySQL(sql);
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_portal_transaksi_fPHTK.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{
			var data = this.dbLib.runSQL("select * from portal_cust_pht where no_kontrak = '"+this.e0.getText()+"'");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.ecust.setText(data.get("kode_cust"));
					this.periodeAwal.setText(data.get("periode_awal"));
					this.periodeAkhir.setText(data.get("periode_akhir"));
					this.ed_nilai.setText(floatToNilai(parseFloat(data.get("nilai"))));
					this.e1.setText(data.get("keterangan"));
					this.cbaktif.setSelected((data.get("status") == 1 ? true:false));
					var rs = this.dbLib.runSQL("select no_faktur,tanggal,omset,nilai_retur,jenis from portal_cust_pht_d where no_kontrak = '"+this.e0.getText()+"'");
					if (rs instanceof portalui_arrayMap)
					{
						if (rs.get(0) != undefined)
						{	
							this.sg1.clear();					
							this.sg1.setData(rs);										
							this.sg1init(this.sg1);
						}
					}
					for (var k=0; k < this.sg1.rows.getLength(); k++)
					{
						var dt=this.sg1.getCell(1,k).split(" ");
						dt=dt[0].split("-");
						dt=dt[2]+"/"+dt[1]+"/"+dt[0];
						this.sg1.setCell(1,k,dt);
					}
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_transaksi_fPHTK.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ecust)
			this.standarLib.showListData(this, "Data Customer",sender,undefined,
										  "select kode_cust,nama from portal_cust ",
										  "select count(*) from portal_cust ",
										  ["kode_cust","nama"],"where",["Kode","Nama"]);
		if (sender == this.e0)
			this.standarLib.showListData(this, "Data PHT",sender,undefined,
										  "select no_kontrak,keterangan from portal_cust_pht ",
										  "select count(*) from portal_cust_pht ",
										  ["no_kontrak","keterangan"],"where",["No Kontrak","Keterangan"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_transaksi_fPHTK.prototype.doRequestReady = function(sender, methodName, result)
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