window.app_portal_transaksi_fPesanLangsungK = function(owner)
{
  if (owner)
	{
		window.app_portal_transaksi_fPesanLangsungK.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_transaksi_fPesanLangsungK";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this,"mainButtonClick","Pemesanan Langsung : Koreksi",0);
		
		uses("portalui_saiCBBL",true);
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(1);
		this.e0.setWidth(220);
		this.e0.setCaption("No. Order");		
		this.e0.setReadOnly(false);
		this.e0.onExit.set(this, "EditExit");
		this.e0.onChange.set(this, "doEditChange");
		this.e0.onKeyPress.set(this, "keyPress");
		this.e0.onBtnClick.set(this, "FindBtnClick");		
		this.e0.setRightLabelVisible(false);
		
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
		
		this.cbg = new portalui_saiCBBL(this);
		this.cbg.setLeft(20);
		this.cbg.setTop(3);
		this.cbg.setWidth(200);
		this.cbg.setCaption("Cabang");
		this.cbg.setRightLabelVisible(true);
		this.cbg.onBtnClick.set(this, "FindBtnClick");
		
		this.kota = new portalui_saiCBBL(this);
		this.kota.setLeft(20);
		this.kota.setTop(4);
		this.kota.setWidth(200);
		this.kota.setCaption("Kota");
		this.kota.setRightLabelVisible(true);
		this.kota.onBtnClick.set(this, "FindBtnClick");
		
		this.ecust = new portalui_saiCBBL(this);
		this.ecust.setLeft(20);
		this.ecust.setTop(5);
		this.ecust.setWidth(200);
		this.ecust.setCaption("Customer");
		this.ecust.setRightLabelVisible(true);
		this.ecust.onBtnClick.set(this, "FindBtnClick");		
		
		this.sales = new portalui_saiCBBL(this);
		this.sales.setLeft(20);
		this.sales.setTop(6);
		this.sales.setWidth(200);
		this.sales.setCaption("Sales");
		this.sales.setRightLabelVisible(true);
		this.sales.onBtnClick.set(this, "FindBtnClick");
		
		this.e1 = new portalui_saiLabelEdit(this);
		this.e1.setLeft(20);
		this.e1.setTop(7);
		this.e1.setWidth(400);
		this.e1.setCaption("Keterangan");		
		this.e1.setReadOnly(false);
		
		this.e2 = new portalui_saiLabelEdit(this);
		this.e2.setLeft(20);
		this.e2.setTop(8);
		this.e2.setWidth(400);
		this.e2.setCaption("Transaksi dari");
		this.e2.setReadOnly(true);
		
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
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e)
		{
			alert("[app_portal_transaksi_fPesanLangsungK]->constructor : "+e);
		}
	}
};
window.app_portal_transaksi_fPesanLangsungK.extend(window.portalui_childForm);
window.app_portal_transaksi_fPesanLangsungK.prototype.sg1init = function(sg)
{
	sg.setColWidth(new Array(5,4,3,2,1,0),new Array(100,100,150,100,100,100));
	sg.columns.get(0).setButtonStyle(bsEllips);
	sg.columns.get(3).setColumnFormat(cfNilai);
	sg.columns.get(4).setColumnFormat(cfNilai);
	sg.columns.get(5).setColumnFormat(cfNilai);
};
window.app_portal_transaksi_fPesanLangsungK.prototype.doFindBtnClick = function(sender, col, row)
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
window.app_portal_transaksi_fPesanLangsungK.prototype.mainButtonClick = function(sender)
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
window.app_portal_transaksi_fPesanLangsungK.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.e0);				
			}
		break;
		case "ubah" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
			{
				try
				{
					uses("server_util_arrayList",true);
					sql = new server_util_arrayList();
					sql.add("update portal_order_m set kode_cust='"+this.ecust.getText()+"',tanggal='"+this.dp_order.getDate()+
					"',keterangan='"+this.e1.getText()+"',status='B'"+
					",cabang='"+this.cbg.getText()+"',kota='"+this.kota.getText()+
					"',nama='-',alamat='-',sales='"+this.sales.getText()+
					"' where no_order = '"+this.e0.getText()+"' ");
					sql.add("delete from portal_order_d where no_order='"+this.e0.getText()+"'");
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
		case "hapus" :
		   if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
		   {			  
				uses("server_util_arrayList",true);					
				var sql = new server_util_arrayList();
				sql.add("delete from portal_order_d where no_order='"+this.e0.getText()+"'");
				sql.add("delete from portal_order_m where no_order='"+this.e0.getText()+"'");
				this.dbLib.execArraySQL(sql);
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_portal_transaksi_fPesanLangsungK.prototype.keyPress = function(sender, charCode, buttonState )
{
};
window.app_portal_transaksi_fPesanLangsungK.prototype.doEditChange = function(sender)
{
	if (this.e0.getText() != "")
	{
		try
		{
			var data = this.dbLib.runSQL("select a.*,b.nama as nmcust,c.nama as nmcbg,d.nama as nmkota,e.nama as nmsls "+
				"from portal_order_m a inner join portal_cust b on a.kode_cust=b.kode_cust "+
				"inner join portal_cabang c on a.cabang=c.kode_cab "+
				"inner join portal_kota d on a.kota=d.kode_kota "+
				"inner join portal_sales e on a.sales=e.kode_sales "+
				"where a.no_order = '"+this.e0.getText()+"' ");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.cbg.setText(data.get("cabang"));
					this.cbg.setRightLabelCaption(data.get("nmcbg"));
					this.kota.setText(data.get("kota"));
					this.kota.setRightLabelCaption(data.get("nmkota"));
					this.ecust.setText(data.get("kode_cust"));
					this.ecust.setRightLabelCaption(data.get("nmcust"));
					this.sales.setText(data.get("sales"));
					this.sales.setRightLabelCaption(data.get("nmsls"));
					this.dp_order.setDateString(data.get("tanggal"));
					this.e1.setText(data.get("keterangan"));
					if (data.get("status") == "B")
						this.e2.setText("BackEnd");
					if (data.get("status") == "F")
						this.e2.setText("FrontEnd");
					if (data.get("status") == "S")
						this.e2ep.setText("FrontEnd : Sales Menu");
					var brg = this.dbLib.runSQL("select a.kode_produk,b.nama,a.jumlah,a.harga,a.bonus, (a.jumlah*a.harga) as subtot "+
										"from portal_order_d a inner join portal_produk b on a.kode_produk=b.kode_produk "+
										"where a.no_order = '"+this.e0.getText()+"' ");
					if (brg instanceof portalui_arrayMap)
					{
						if (brg.get(0)!=undefined)
						{
							this.sg1.clear();
							this.sg1.showLoading();
							this.sg1.setData(brg);										
							this.sg1init(this.sg1);
						}
					}
					var tot=0;
					for (var k=0; k < this.sg1.rows.getLength(); k++)
					{
						tot+=parseFloat(strToFloat(this.sg1.getCell(5,k)));
					}
					this.total.setText(floatToNilai(tot));
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_transaksi_fPesanLangsungK.prototype.sg1onChange = function(sender,col,row)
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
window.app_portal_transaksi_fPesanLangsungK.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.e0)
			this.standarLib.showListData(this, "Data Order",sender,undefined, 
										"select no_order,keterangan from portal_order_m","select count(*) from portal_order_m",
										["no_order","keterangan"],"where",["No Order","Keterangan"]);
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
window.app_portal_transaksi_fPesanLangsungK.prototype.doRequestReady = function(sender, methodName, result)
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