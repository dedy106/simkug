//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_saku_inventory_transaksi_fPackingList = function(owner,options){
	try{
		if (owner)
		{
			window.app_saku_inventory_transaksi_fPackingList.prototype.parent.constructor.call(this, owner,options);			
			this.className = "app_saku_inventory_transaksi_fPackingList";
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Packing List",0);				
            this.initComponent();		
            this.onClose.set(this,"doClose");			
            setTipeButton(tbSimpan);
		}
	}catch(e)
	{
		alert("[app_saku_inventory_transaksi_fPackingList]::contruct:"+e,"");
	}
};
window.app_saku_inventory_transaksi_fPackingList.extend(window.portalui_childForm);
window.app_saku_inventory_transaksi_fPackingList.implement({
	initComponent: function(){		
		try{
			uses("portalui_datePicker;portalui_label;portalui_saiCBBL;portalui_saiLabelEdit;portalui_saiGrid;portalui_sgNavigator;portalui_checkBox");
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.dbLib.addListener(this);
			var top = document.all ? 102:103;					
			this.ePrd = new portalui_saiLabelEdit(this,{bound:[10,10,182,20],caption:"Periode",readOnly:true,tag:"9"});
			this.lTgl = new portalui_label(this,{bound:[10,32,100,18],underline:true,caption:"Tanggal"});
			this.dp_orderip = new portalui_datePicker(this,{bound:[110,32,82,20],selectDate:[this,"doSelect"]});
			this.eJam = new portalui_saiLabelEdit(this,{bound:[10,71,180,20],caption:"Jam Pengiriman"});
			this.e0ip = new portalui_saiCBBL(this,{bound:[10,54,250,20],caption:"No. Packing",btnVisible:false});
			this.bGen = new portalui_button(this,{bound:[255,54,80,20],caption:"Generate",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doBtnClick"]});			
			this.eKet = new portalui_saiLabelEdit(this,{bound:[10,76,500,20],caption:"Keterangan"});
			this.eMobil = new portalui_saiLabelEdit(this,{bound:[10,71,200,20],caption:"No Mobil"});
			this.eSopir = new portalui_saiCBBL(this,{bound:[10,72,200,20],caption:"Sopir"});
			this.eCust = new portalui_saiCBBL(this,{bound:[10,75,200,20],caption:"Tujuan",btnClick:[this,"FindBtnClick"]});
			this.eDeliver = new portalui_saiCBBL(this,{bound:[10,77,200,20],caption:"Schedule Delivery",btnClick:[this,"FindBtnClick"]});
			this.eOrder = new portalui_saiCBBL(this,{bound:[10,78,200,20],caption:"Sales Order",btnClick:[this,"FindBtnClick"]});
			
			this.p1ip = new portalui_panel(this,{bound:[10,186,800,250],border:3,name:"P1",caption:"Sales Order"});
			this.sg1ip = new portalui_saiGrid(this.p1ip,{bound:[1,20,this.p1ip.width - 4,203],name:"saiSG1",colCount:9,colTitle:["Kode Barang","Nama Barang","Rak 01","Rak 02","Rak 03","Rak 04","Rak 05","Satuan","Satuan Kecil"],
                colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,200,100]],buttonStyle:[[0],[bsEllips]],colFormat:[[2,3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
                change:[this,"sg1onChange"],ellipsClick:[this,"doFindBtnClick"],colReadOnly:[true,[1,3,5],[]],rowCount:1,picklist:[[7,8],[new portalui_arrayMap({items:["Pack","Ball","Roll"]}),new portalui_arrayMap({items:["Mtr","Pcs","Kg","Lbr"]})]]});
			this.sgnip = new portalui_sgNavigator(this.p1ip,{bound:[1,225,this.p1ip.width-1,25],grid:this.sg1ip,buttonStyle:2});
			this.totalip = new portalui_saiLabelEdit(this.sgnip,{bound:[this.sgnip.width - 252,2,250,20],tipeText:ttNilai, alignment:alRight, caption:"Total",readOnly:true});
			this.dp_orderip.setDateString(new Date().getDateStr());
			this.rearrangeChild(5,23);
			this.setTabChildIndex();
			//------
			if (this.app._mainForm.listDataForm === undefined){
				this.app._mainForm.createListData();
			}			
		}catch(e){
			alert(e);
		}
	},
	doSizeChange: function(width, height){				
	},
	doRequestReady: function(sender, methodName, result){
	    try{
    		if (sender == this.dbLib){
    			if (methodName == "getDataProvider"){
    				eval("result = "+result+";");
    				if (result.rs != undefined){
    					var data = result.rs.rows[0];								
    				}
    			}else if (methodName == "execArraySQL"){								
    				if (result.toLowerCase().search("error") != -1){
    				    if (result.toLowerCase().search("duplicate") != -1){
    				         system.info("No Bukti sudah ada. No Bukti akan digenerate lagi");
    				        this.bGen.click();
    				    }else  throw (result);    				    
    				}else{    				    
    					system.info(this.app._mainForm,"Transaksi sukses.","");
    					this.standarLib.clearByTag(this, [0],this.e0ip);
    					this.sg1ip.clear(1);						
    				}
    			}
    		}    		
   		}catch(e){
   		   this.app._mainForm.unblock();
   		   systemAPI.alert(this+"$onRequest()",e);
        }
	},
	doChildItemsClick: function(sender,id,item){
		try{			
		}catch(e){
			alert("::doChildItemsClick : "+e);
		}
	},
	doSelect: function(sender, y, m, d){
		var prd = y +""+ (m < 10 ? '0' + m: m);
		this.ePrd.setText(prd);
	},
	FindBtnClick : function(sender){
		if (sender == this.ecustip)
			this.standarLib.showListData(this, "Data Customer",sender,undefined, 
										  "select kode_cust, nama from portal_cust where kode_lokasi='"+this.app._lokasi+"' and kota = '"+this.kotaip.getText()+"' ",
										  "select count(*) from portal_cust where kode_lokasi='"+this.app._lokasi+"' and kota = '"+this.kotaip.getText()+"' ",
										  ["kode_cust","nama"],"and",["Kode Cust","Nama"]);		
	},
	doBtnClick: function(sender){
		try{
			if (sender == this.bGen){
				this.e0ip.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "inv_pl_m", "no_pl", "PL/"+this.ePrd.getText()+"/","0000"));
			}else{
				if (this.sg1ip.allRowValid()){
					var sql = new server_util_arrayList();
					sql.add("insert into portal_order_m (no_order,kode_cust,tanggal,keterangan,status,cabang, kota,nama,alamat,sales,periode,kode_lokasi,nik_user,tgl_input,status_bayar) values "+
							"('"+this.e0ip.getText()+"','"+this.ecustip.getText()+"','"+this.dp_orderip.getDate()+"','"+this.e1ip.getText()+"','C','"+this.cab.getText()+"','"+this.kotaip.getText()+"','-','-','"+this.salesip.getText()+"','"+this.getForm().getPeriodeNow()+"','"+this.app._lokasi+"','"+this.app.userlog+"','"+(new Date()).getDateStr()+"','0') ");
					for (var k=0; k < this.sg1ip.rows.getLength(); k++)
					{
						sql.add("insert into portal_order_d (no_order,kode_produk,jumlah,harga,bonus,kode_lokasi) values  "+
							"('"+this.e0ip.getText()+"','"+this.sg1ip.getCell(0,k)+"',"+parseNilai(this.sg1ip.getCell(3,k))+","+parseNilai(this.sg1ip.getCell(4,k))+","+parseNilai(this.sg1ip.getCell(5,k))+",'"+this.app._lokasi+"') ");
					}
					this.id = this.e0ip.getText();
					this.tglOrder = this.dp_orderip.getDate();
					this.dbLib.execArraySQL(sql);
				}else alert("Belum ada item barang yang dipilih","Cek Transaksi lagi");
			}
		}catch(e){
			alert(e);
		}
	},
	doFindBtnClick: function(sender, col, row){
		try{
			switch(col)
			{
			    case 0:
					if (sender == this.sg1ip){
						this.standarLib.ListDataSGFilter(this,"Data Barang",sender, 
							  sender.row, sender.col,
							  "select kode_produk,nama from portal_produk where kode_lokasi = '"+this.app._lokasi+"' ",
							  "select count(*) from portal_produk where kode_lokasi = '"+this.app._lokasi+"' ",
							  ["kode_produk","nama"],"and",["Kode","Nama"]);
					}
				break;
			}
		}catch(e){
			alert("doFindBtnClick : " + e);
		}
	},
	sg1onChange: function(sender,col,row){
	    try{   
    		if (col === 0){
    			try{
    				var data = this.dbLib.getDataProvider("select nama,harga,satuan "+
    											"from portal_produk "+
    											"where kode_produk = '"+sender.getCell(0,row)+"' and kode_lokasi ='"+this.app._lokasi+"' ",true);
    				if (typeof data != "string"){
    					if (data.rs.rows[0] != undefined){
    						data = data.rs.rows[0];
    						sender.setCell(1,row,data.nama);
    						sender.setCell(2,row,data.satuan);
    						sender.setCell(3,row,floatToNilai(data.harga));
    						sender.setCell(4,row,0);
    						sender.setCell(5,row,0);
    						sender.setCell(6,row,0);
    					}
    				}else throw(data);
    			}catch(e){
    				alert(e,"");
    			}
    		}
    		if (col === 4){
    			var subtotal=strToFloat(sender.getCell(3,row))*strToFloat(sender.getCell(4,row));
    			sender.setCell(6,row,floatToNilai(subtotal));
    			sender.setCell(1,row,sender.getCell(1,row));
    			var tot=0;
    			for (var k=0; k < sender.rows.getLength(); k++){
    				tot+=parseFloat(strToFloat(sender.getCell(6,k)));
    			}
    			this.totalip.setText(floatToNilai(tot));
    		}    	
	   }catch(e){
	       alert(e);
        }
    }
});
