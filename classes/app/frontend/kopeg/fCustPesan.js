//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_kopeg_fCustPesan = function(owner){
	try{
		if (owner)
		{
			window.app_frontend_kopeg_fCustPesan.prototype.parent.constructor.call(this, owner);
			window.app_frontend_kopeg_fCustPesan.prototype.parent.setBorder.call(this, 0);		
			window.app_frontend_kopeg_fCustPesan.prototype.parent.setColor.call(this, "");		
			this.className = "app_frontend_kopeg_fCustPesan";											
			this.initComponent();		
			this.title = "Input Pemesanan";
		}
	}catch(e)
	{
		systemAPI.alert("[app_frontend_kopeg_fCustPesan]::contruct:"+e,"");
	}
};
window.app_frontend_kopeg_fCustPesan.extend(window.portalui_panel);
window.app_frontend_kopeg_fCustPesan.implement({
	initComponent: function(){		
		try{
			uses("util_standar;portalui_image;portalui_datePicker;portalui_label;portalui_button");
			uses("portalui_saiCBBL;portalui_saiLabelEdit;portalui_saiGrid;portalui_sgNavigator");			
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			var top = document.all ? 102:103;					
			this.ePrd = new portalui_saiLabelEdit(this);
			this.ePrd.setBound(20,10,182,20);
			this.ePrd.setCaption("Periode");		
			this.ePrd.setReadOnly(true);
			this.ePrd.setTag("9");			
			this.lTgl = new portalui_label(this);
			this.lTgl.setBound(20,32,100,18);
			this.lTgl.setUnderLine(true);
			this.lTgl.setCaption("Tanggal Order");							
			this.dp_orderip = new portalui_datePicker(this);
			this.dp_orderip.setBound(120,32,82,20);
			this.dp_orderip.setTag("tglorderip");
			this.dp_orderip.onSelect.set(this, "doSelect");						
			this.e0ip = new portalui_saiCBBL(this);
			this.e0ip.setBound(20,54,250,20);
			this.e0ip.setCaption("No. Order");		
			this.e0ip.setReadOnly(false);
			this.e0ip.setBtnVisible(false);
			this.e0ip.setRightLabelVisible(false);			
			this.bGen = new portalui_button(this);
			this.bGen.setBound(265,54,80,20);
			this.bGen.setCaption("Generate");
			this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bGen.onClick.set(this,"doBtnClick");						
			this.cbgip = new portalui_saiCBBL(this);
			this.cbgip.setBound(20,76,200,20);
			this.cbgip.setCaption("Cabang");
			this.cbgip.setRightLabelVisible(true);
			this.cbgip.onBtnClick.set(this, "FindBtnClick");
			this.cab=this.cbgip;			
			this.kotaip = new portalui_saiCBBL(this);
			this.kotaip.setBound(20,98,200,20);
			this.kotaip.setCaption("Kota");
			this.kotaip.setRightLabelVisible(true);
			this.kotaip.onBtnClick.set(this, "FindBtnClick");			
			this.ecustip = new portalui_saiCBBL(this);
			this.ecustip.setBound(20,120,200,20);
			this.ecustip.setCaption("Customer");			
			this.ecustip.setReadOnly(true);
			this.ecustip.setBtnVisible(false);
			this.ecustip.onBtnClick.set(this, "FindBtnClick");			
			this.salesip = new portalui_saiCBBL(this);
			this.salesip.setBound(20,142,200,20);
			this.salesip.setCaption("Sales");
			this.salesip.setRightLabelVisible(true);
			this.salesip.onBtnClick.set(this, "FindBtnClick");			
			this.e1ip = new portalui_saiLabelEdit(this);
			this.e1ip.setBound(20,164,400,20);
			this.e1ip.setCaption("Keterangan");		
			this.e1ip.setReadOnly(false);						
			this.p1ip = new portalui_panel(this);
			this.p1ip.setBound(20,186,396,175);
			this.p1ip.setBorder(3);
			this.p1ip.setName('p1');
			this.p1ip.setCaption('Barang');						
			this.sg1ip = new portalui_saiGrid(this.p1ip);
			this.sg1ip.setBound(1,20,401,128);
			this.sg1ip.setName('saiSG1');
			this.sg1ip.setColCount(6);
			this.sg1ip.setReadOnly(false);
			this.sg1ip.setColTitle(["Kode Barang","Nama","Satuan","Jumlah","Harga per Item","Sub Total"]);
			this.sg1ip.setColWidth([5,4,3,2,1,0],[100,100,76,100,100,100]);
			this.sg1ip.columns.get(0).setButtonStyle(bsEllips);
			this.sg1ip.columns.get(3).setColumnFormat(cfNilai);
			this.sg1ip.columns.get(4).setColumnFormat(cfNilai);
			this.sg1ip.columns.get(5).setColumnFormat(cfNilai);
			this.sg1ip.onChange.set(this,"sg1onChange");
			this.sg1ip.onEllipsClick.set(this,"doFindBtnClick");						
			this.sgnip = new portalui_sgNavigator(this.p1ip);
			this.sgnip.setBound(1,148,393,25);
			this.sgnip.setName('sgn');
			this.sgnip.setGrid(this.sg1ip);
			this.sgnip.setButtonStyle(2);			
			this.totalip = new portalui_saiLabelEdit(this.sgnip);
			this.totalip.setBound(300,2,250,20);
			this.totalip.setTipeText(ttNilai);
			this.totalip.setAlignment(alRight);
			this.totalip.setCaption("Total");
			this.totalip.setReadOnly(true);
			this.totalip.setLength(100);
			this.bInput = new portalui_button(this);
			this.bInput.setBound(20,368,80,20);
			this.bInput.setCaption("Simpan");
			this.bInput.setIcon("url(icon/"+system.getThemes()+"/save.png)");
			this.bInput.onClick.set(this,"doBtnClick");
			this.bInput.setTag("inputip");
			this.ecustip.setText(this.app.userlog);
			this.ecustip.setRightLabelCaption(this.app.username);
			this.dp_orderip.setDateString(new Date().getDateStr());
			this.rearrangeChild(5,23);
			//------
			if (this.app._mainForm.listDataForm === undefined){
				this.app._mainForm.createListData();
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSizeChange: function(width, height){		
		this.sg1ip.setWidth(width - 40);
		this.p1ip.setWidth(width - 40);
		this.sgnip.setWidth(width - 40);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			if (methodName == "getDataProvider"){
				eval("result = "+result+";");
				if (result.rs != undefined){
					var data = result.rs.rows[0];								
				}
			}else if (methodName == "execArraySQL"){								
				if (result.toLowerCase().search("error") != -1)
					systemAPI.alert(result);
				else {
					system.info(this.app._mainForm,result,"");
					this.standarLib.clearByTag(this, [0],this.e0ip);
					this.sg1ip.clear();
				}
			}
		}
	},
	doChildItemsClick: function(sender,id,item){
		try{			
		}catch(e){
			systemAPI.alert("::doChildItemsClick : "+e);
		}
	},
	doSelect: function(sender, y, m, d){
		var prd = y +""+ (m < 10 ? '0' + m: m);
		this.ePrd.setText(prd);
	},
	FindBtnClick : function(sender){
		if (sender == this.ecustip)
			this.standarLib.showListData(this.getForm(), "Data Klp Customer",sender,undefined, 
										  "select kode_klp_cust, nama from portal_klp_cust",
										  "select count(*) from portal_klp_cust",
										  ["kode_klp_cust","nama"],"where",["Kode Klp Cust","Nama"]);
		if (sender == this.cbgip)
			this.standarLib.showListData(this.getForm(), "Data Cabang",sender,undefined, 
										  "select kode_cab, nama from portal_cabang where kode_lokasi='"+this.app._lokasi+"' ",
										  "select count(*) from portal_cabang where kode_lokasi='"+this.app._lokasi+"' ",
										  ["kode_cab","nama"],"and",["Kode Cabang","Nama"]);
		if (sender == this.kotaip)
			this.standarLib.showListData(this.getForm(), "Data Kota",sender,undefined,
										  "select kode_kota,nama from portal_kota where kode_cab='"+this.cab.getText()+"'",
										  "select count(*) from portal_kota where kode_cab='"+this.cab.getText()+"'",
										  ["kode_kota","nama"],"and",["Kode Kota","Nama"]);
		if (sender == this.salesip)
			this.standarLib.showListData(this.getForm(), "Data Sales",sender,undefined,
										  "select kode_sales,nama from portal_sales where kode_cab='"+this.cab.getText()+"'",
										  "select count(*) from portal_sales where kode_cab='"+this.cab.getText()+"'",
										  ["kode_sales","nama"],"and",["Kode Sales","Nama"]);
	},
	doBtnClick: function(sender){
		try{
			if (sender == this.bGen){
				this.e0ip.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "portal_order_m", "no_order", "ORD/"+this.ePrd.getText()+"/","0000"));
			}else{
				if (this.sg1ip.allRowValid){
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into portal_order_m (no_order,kode_cust,tanggal,keterangan,status,cabang, kota,nama,alamat,sales,periode,kode_lokasi,nik_user,tgl_input) values "+
							"('"+this.e0ip.getText()+"','"+this.ecustip.getText()+"','"+this.dp_orderip.getDate()+"','"+this.e1ip.getText()+"','C','"+this.cbgip.getText()+"','"+this.kotaip.getText()+"','-','-','"+this.salesip.getText()+"','"+this.getForm().getPeriodeNow()+"','"+this.app._lokasi+"','"+this.app.userlog+"','"+(new Date()).getDateStr()+"') ");
					for (var k=0; k < this.sg1ip.rows.getLength(); k++)
					{
						sql.add("insert into portal_order_d (no_order,kode_produk,jumlah,harga) values  "+
							"('"+this.e0ip.getText()+"','"+this.sg1ip.getCell(0,k)+"',"+parseNilai(this.sg1ip.getCell(3,k))+","+parseNilai(this.sg1ip.getCell(4,k))+") ");
					}
					this.dbLib.execArraySQL(sql);
				}else systemAPI.alert("Belum ada item barang yang dipilih","Cek Transaksi lagi");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doFindBtnClick: function(sender, col, row){
		try{
			switch(col)
			{
			    case 0:
					if (sender == this.sg1ip){
						this.standarLib.ListDataSGFilter(this.getForm(),"Data Barang",sender, 
							  sender.row, sender.col,
							  "select kode_produk,nama from portal_produk ",
							  "select count(*) from portal_produk ",
							  ["kode_produk","nama"],"where",["Kode","Nama"]);
					}
				break;
			}
		}catch(e){
			systemAPI.alert("doFindBtnClick : " + e);
		}
	},
	sg1onChange: function(sender,col,row){
		if (col == 0){
			try{
				var data = this.dbLib.runSQL("select nama,harga,satuan "+
											"from portal_produk "+
											"where kode_produk = '"+sender.getCell(0,row)+"' ");
				if (data instanceof portalui_arrayMap){
					if (data.get(0) != undefined){
						data = data.get(0);
						sender.setCell(1,row,data.get("nama"));
						sender.setCell(2,row,data.get("satuan"));
						sender.setCell(3,row,0);
						sender.setCell(4,row,floatToNilai(data.get("harga")));
						sender.setCell(5,row,0);
					}
				}else throw(data);
			}catch(e){
				systemAPI.alert(e,"");
			}
		}
		if (col == 3){
			var subtotal=strToFloat(sender.getCell(3,row))*strToFloat(sender.getCell(4,row));
			sender.setCell(5,row,floatToNilai(subtotal));
			sender.setCell(1,row,sender.getCell(1,row));
			var tot=0;
			for (var k=0; k < sender.rows.getLength(); k++){
				tot+=parseFloat(strToFloat(sender.getCell(5,k)));
			}
			this.totalip.setText(floatToNilai(tot));
		}
	}
});