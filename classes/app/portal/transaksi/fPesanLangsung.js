window.app_portal_transaksi_fPesanLangsung = function(owner)
{
  if (owner)
	{
		window.app_portal_transaksi_fPesanLangsung.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_transaksi_fPesanLangsung";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Pemesanan Langsung : Input", 0);
		
		this.ed_periode = new portalui_saiLabelEdit(this);
		this.ed_periode.setLeft(20);
		this.ed_periode.setTop(1);
		this.ed_periode.setWidth(182);
		this.ed_periode.setCaption("Periode");		
		this.ed_periode.setReadOnly(true);
		this.ed_periode.setTag("9");
		
		this.lTgl = new portalui_label(this);
		this.lTgl.setLeft(20);
		this.lTgl.setTop(2);
		this.lTgl.setWidth(100);
		this.lTgl.setHeight(18);
		this.lTgl.setUnderLine(true);
		this.lTgl.setCaption("Tanggal Order");
		uses("portalui_datePicker",true);
		this.dp_order = new portalui_datePicker(this);
		this.dp_order.setTop(2);
		this.dp_order.setLeft(120);
		this.dp_order.setWidth(82);
		
		uses("portalui_saiCBBL",true);
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(3);
		this.e0.setWidth(250);
		this.e0.setCaption("No. Order");		
		this.e0.setReadOnly(false);
		this.e0.setBtnVisible(false);
		this.e0.setRightLabelVisible(false);
		
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(265);
		this.bGen.setTop(3);
		this.bGen.setCaption("Generate");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		this.bGen.onClick.set(this,"doGen");
		
		this.cbg = new portalui_saiCBBL(this);
		this.cbg.setLeft(20);
		this.cbg.setTop(4);
		this.cbg.setWidth(200);
		this.cbg.setCaption("Cabang");
		this.cbg.setRightLabelVisible(true);
		this.cbg.onBtnClick.set(this, "FindBtnClick");
		
		this.kota = new portalui_saiCBBL(this);
		this.kota.setLeft(20);
		this.kota.setTop(5);
		this.kota.setWidth(200);
		this.kota.setCaption("Kota");
		this.kota.setRightLabelVisible(true);
		this.kota.onBtnClick.set(this, "FindBtnClick");
		
		this.ecust = new portalui_saiCBBL(this);
		this.ecust.setLeft(20);
		this.ecust.setTop(6);
		this.ecust.setWidth(200);
		this.ecust.setCaption("Customer");
		this.ecust.setRightLabelVisible(true);
		this.ecust.onBtnClick.set(this, "FindBtnClick");		
		
		this.sales = new portalui_saiCBBL(this);
		this.sales.setLeft(20);
		this.sales.setTop(7);
		this.sales.setWidth(200);
		this.sales.setCaption("Sales");
		this.sales.setRightLabelVisible(true);
		this.sales.onBtnClick.set(this, "FindBtnClick");
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(8);
		this.e1.setWidth(400);
		this.e1.setCaption("Keterangan");		
		this.e1.setReadOnly(false);
		
		this.p1 = new portalui_panel(this);
		this.p1.setLeft(20);
		this.p1.setTop(9);
		this.p1.setWidth(680);
		this.p1.setHeight(228);
		this.p1.setName('p1');
		this.p1.setCaption('Barang');

		uses("portalui_saiGrid",true);
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setLeft(1);
		this.sg1.setTop(20);
		this.sg1.setWidth(675);
		this.sg1.setHeight(180);
		this.sg1.setName('saiSG1');
		this.sg1.setColCount(6);
		this.sg1.setReadOnly(false);
		this.sg1.setColTitle(new Array("Kode Barang","Nama","Jumlah","Harga per Item","Bonus","Sub Total"));
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
		
		this.total = new portalui_saiLabelEdit(this.sgn);
		this.total.setLeft(425);
		this.total.setTop(2);
		this.total.setWidth(250);
		this.total.setTipeText(ttNilai);
		this.total.setAlignment(alRight);
		this.total.setCaption("Total");
		this.total.setReadOnly(true);
		this.total.setLength(100);
		
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);
		this.dp_order.onSelect.set(this, "doSelect");
		this.doSelect(this.dp_order,this.dp_order.year,this.dp_order.month,this.dp_order.day);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar",true);
			this.standarLib = new util_standar();
		}catch(e)
		{
			alert("[app_portal_transaksi_fPesanLangsung]->constructor : "+e);
		}
	}
};
window.app_portal_transaksi_fPesanLangsung.extend(window.portalui_childForm);
window.app_portal_transaksi_fPesanLangsung.prototype.sg1init = function(sg)
{
	sg.setColWidth(new Array(5,4,3,2,1,0),new Array(100,100,150,100,100,100));
	sg.columns.get(0).setButtonStyle(bsEllips);
	sg.columns.get(3).setColumnFormat(cfNilai);
	sg.columns.get(4).setColumnFormat(cfNilai);
	sg.columns.get(5).setColumnFormat(cfNilai);
};
window.app_portal_transaksi_fPesanLangsung.prototype.doSelect = function(sender, year, month, day)
{
	if (month < 10)
		month = "0"+month;
	this.ed_periode.setText(year.toString()+month);
};
window.app_portal_transaksi_fPesanLangsung.prototype.doFindBtnClick = function(sender, col, row)
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
						  ["kode_produk","nama"],"and",["Kode","Nama"]);
				}
			break;
		}
	}catch(e)
	{
		alert("[GUI_investasi_transaksi_fUsulanDep] :: doFindBtnClick : " + e);
	}
};
window.app_portal_transaksi_fPesanLangsung.prototype.mainButtonClick = function(sender)
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
window.app_portal_transaksi_fPesanLangsung.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.e0);				
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
			{
				try
				{
					uses("server_util_arrayList",true);
					sql = new server_util_arrayList();
					sql.add("insert into portal_order_m (no_order,kode_cust,tanggal,keterangan,status,cabang, kota,nama,alamat,sales,periode,kode_lokasi,nik_user,tgl_input) values  "+
							"('"+this.e0.getText()+"','"+this.ecust.getText()+"','"+this.dp_order.getDate()+"','"+this.e1.getText()+"','B','"+this.cbg.getText()+"','"+this.kota.getText()+"','-','-','"+this.sales.getText()+"','"+this.ed_periode.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"','"+(new Date()).getDateStr()+"') ");
					for (var k=0; k < this.sg1.rows.getLength(); k++)
					{
						sql.add("insert into portal_order_d (no_order,kode_produk,jumlah,harga,bonus) values  "+
							"('"+this.e0.getText()+"','"+this.sg1.getCell(0,k)+"',"+this.sg1.getCell(2,k)+","+strToFloat(this.sg1.getCell(3,k))+","+strToFloat(this.sg1.getCell(4,k))+") ");
					}
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
	}
	this.e0.setFocus();
};
window.app_portal_transaksi_fPesanLangsung.prototype.keyPress = function(sender, charCode, buttonState )
{
};
window.app_portal_transaksi_fPesanLangsung.prototype.doGen = function(sender)
{
	this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "portal_order_m", "no_order", "ORD/"+this.ed_periode.getText()+"/","0000"));	
};
window.app_portal_transaksi_fPesanLangsung.prototype.sg1onChange = function(sender,col,row)
{
	if (col == 0)
	{
		try
		{
			var data = this.dbLib.runSQL("select nama,harga "+
										"from portal_produk "+
										"where kode_produk = '"+this.sg1.getCell(0,row)+"' ");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.sg1.setCell(1,row,data.get("nama"));
					this.sg1.setCell(2,row,0);
					this.sg1.setCell(3,row,floatToNilai(data.get("harga")));
					this.sg1.setCell(4,row,0);
					this.sg1.setCell(5,row,0);
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
	if (col == 2)
	{
		var subtotal=strToFloat(this.sg1.getCell(2,row))*strToFloat(this.sg1.getCell(3,row));
		this.sg1.setCell(5,row,floatToNilai(subtotal));
		this.sg1.setCell(1,row,this.sg1.getCell(1,row));
		var tot=0;
		for (var k=0; k < this.sg1.rows.getLength(); k++)
		{
			tot+=parseFloat(strToFloat(this.sg1.getCell(5,k)));
		}
		this.total.setText(floatToNilai(tot));
	}
};
window.app_portal_transaksi_fPesanLangsung.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.cbg)
			this.standarLib.showListData(this, "Data Cabang",sender,undefined,
										  "select kode_cab,nama from portal_cabang where kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_cabang where kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_cab","nama"],"where",["Kode","Nama"]);
		if (sender == this.kota)
			this.standarLib.showListData(this, "Data Kota",sender,undefined,
										  "select kode_kota,nama from portal_kota where kode_cab='"+this.cbg.getText()+"'",
										  "select count(*) from portal_kota where kode_cab='"+this.cbg.getText()+"'",
										  ["kode_kota","nama"],"where",["Kode","Nama"]);
		if (sender == this.sales)
			this.standarLib.showListData(this, "Data Sales",sender,undefined,
										  "select kode_sales,nama from portal_sales where kode_cab='"+this.cbg.getText()+"'",
										  "select count(*) from portal_sales where kode_cab='"+this.cbg.getText()+"'",
										  ["kode_sales","nama"],"where",["Kode","Nama"]);
		if (sender == this.ecust)
			this.standarLib.showListData(this, "Data Customer",sender,undefined,
										  "select kode_cust,nama from portal_cust ",
										  "select count(*) from portal_cust ",
										  ["kode_cust","nama"],"where",["Kode","Nama"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_transaksi_fPesanLangsung.prototype.doRequestReady = function(sender, methodName, result)
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