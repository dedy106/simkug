//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_kopeg_fCustBayar = function(owner){
	try{
		if (owner)
		{
			window.app_frontend_kopeg_fCustBayar.prototype.parent.constructor.call(this, owner);
			window.app_frontend_kopeg_fCustBayar.prototype.parent.setBorder.call(this, 0);		
			window.app_frontend_kopeg_fCustBayar.prototype.parent.setColor.call(this, "");		
			this.className = "app_frontend_kopeg_fCustBayar";											
			this.initComponent();		
			this.title = "Input Pembayaran";
		}
	}catch(e)
	{
		systemAPI.alert("[app_frontend_kopeg_fCustBayar]::contruct:"+e,"");
	}
};
window.app_frontend_kopeg_fCustBayar.extend(window.portalui_panel);
window.app_frontend_kopeg_fCustBayar.implement({
	initComponent: function(){		
		try{
			uses("util_standar;util_file;portalui_image;portalui_datePicker;portalui_label;portalui_button");
			uses("portalui_saiCBBL;portalui_saiLabelEdit;portalui_saiGrid;portalui_sgNavigator");			
			uses("portalui_uploader",true);
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.file = new util_file();								
			this.dbLib.addListener(this);
			var top = document.all ? 102:103;					
			this.ePrd = new portalui_saiLabelEdit(this);
			this.ePrd.setBound(20,10,182,20);
			this.ePrd.setCaption("Periode");		
			this.ePrd.setReadOnly(true);			
			this.lTgl = new portalui_label(this);
			this.lTgl.setBound(20,32,100,18);
			this.lTgl.setUnderLine(true);
			this.lTgl.setCaption("Tanggal Bayar");				
			this.dp_tgl = new portalui_datePicker(this);
			this.dp_tgl.setBound(120,32,82,20);
			this.dp_tgl.setTag("tglorderip");
			this.dp_tgl.onSelect.set(this, "doSelect");			
			this.e0 = new portalui_saiCBBL(this);
			this.e0.setBound(20,54,250,20);
			this.e0.setCaption("No. Pembayaran");		
			this.e0.setReadOnly(false);
			this.e0.setBtnVisible(false);
			this.e0.setRightLabelVisible(false);
			this.bGen = new portalui_button(this);
			this.bGen.setBound(265,54,80,20);
			this.bGen.setCaption("Generate");
			this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bGen.onClick.set(this,"doBtnClick");			
			this.ket = new portalui_saiLabelEdit(this);
			this.ket.setBound(20,76,400,20);
			this.ket.setCaption("Keterangan");
			this.ket.setReadOnly(false);
			this.nmfile = new portalui_saiLabelEdit(this);
			this.nmfile.setBound(20,98,200,20);
			this.nmfile.setCaption("Nama File");
			this.nmfile.setReadOnly(false);
			this.uploader = new portalui_uploader(this);
			this.uploader.setBound(230,98,60,20);		
			this.uploader.onAfterUpload.set(this,"doAfterLoad");
			this.uploader.setParam4("data");			
			this.uploader.setAutoSubmit(true);
			this.uploader.onChange.set(this,"doFileChange");
			this.nilai = new portalui_saiLabelEdit(this);
			this.nilai.setBound(20,120,200,20);
			this.nilai.setTipeText(ttNilai);
			this.nilai.setAlignment(alRight);
			this.nilai.setCaption("Nilai Pembayaran");
			this.nilai.setReadOnly(false);
			this.nilai.setLength(100);			
			this.p1 = new portalui_panel(this);
			this.p1.setBound(20,142,430,170);
			this.p1.setBorder(3);
			this.p1.setName('p1');
			this.p1.setCaption('Daftar Order');			
			this.sg1 = new portalui_saiGrid(this.p1);
			this.sg1.setBound(1,20,425,128);
			this.sg1.setName('saiSG1');
			this.sg1.setColCount(3);
			this.sg1.setReadOnly(false);
			this.sg1.setColTitle(["No. Order","Keterangan","Nilai Order"]);
			this.sg1.setColWidth([2,1,0],[125,175,100]);
			this.sg1.columns.get(0).setButtonStyle(bsEllips);
			this.sg1.columns.get(2).setColumnFormat(cfNilai);
			this.sg1.onChange.set(this,"sg1onChange");
			this.sg1.onEllipsClick.set(this,"doFindBtnClick");
			this.sgn = new portalui_sgNavigator(this.p1);
			this.sgn.setBound(1,144,428,30);
			this.sgn.setName('sgn');
			this.sgn.setGrid(this.sg1);
			this.sgn.setButtonStyle(2);
			this.total = new portalui_saiLabelEdit(this.sgn);
			this.total.setBound(175,2,250,20);
			this.total.setTipeText(ttNilai);
			this.total.setAlignment(alRight);
			this.total.setCaption("Total");
			this.total.setReadOnly(true);
			this.total.setLength(100);
			this.bInput = new portalui_button(this);
			this.bInput.setBound(20,330,80,18);
			this.bInput.setCaption("Simpan");
			this.bInput.setIcon("url(icon/"+system.getThemes()+"/save.png)");
			this.bInput.onClick.set(this,"doBtnClick");			
					
			this.dp_tgl.setDateString(new Date().getDateStr());
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
					this.standarLib.clearByTag(this, [0],this.e0);
					this.sg1.clear();
					this.uploadFile();	
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
		if (sender == this.ecust)
			this.standarLib.showListData(this.getForm(), "Data Klp Customer",sender,undefined, 
										  "select kode_klp_cust, nama from portal_klp_cust",
										  "select count(*) from portal_klp_cust",
										  ["kode_klp_cust","nama"],"where",["Kode Klp Cust","Nama"]);
		if (sender == this.cbg)
			this.standarLib.showListData(this.getForm(), "Data Cabang",sender,undefined, 
										  "select kode_cab, nama from portal_cabang where kode_lokasi='"+this.app._lokasi+"' ","select count(*) from portal_cabang where kode_lokasi='"+this.app._lokasi+"' ",
										  ["kode_cab","nama"],"where",["Kode Cabang","Nama"]);
		if (sender == this.kota)
			this.standarLib.showListData(this.getForm(), "Data Kota",sender,undefined,
										  "select kode_kota,nama from portal_kota where kode_cab='"+this.cab.getText()+"'",
										  "select count(*) from portal_kota where kode_cab='"+this.cab.getText()+"'",
										  ["kode_kota","nama"],"where",["Kode Kota","Nama"]);
		
	},
	doBtnClick: function(sender){
		try{
			if (sender == this.bGen){
				this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "portal_bayar_m", "no_bayar", "BYR/"+this.ePrd.getText()+"/","0000"));
			}else{
				if (this.sg1.allRowValid){														
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("insert into portal_bayar_m (no_bayar,kode_sales,tanggal,keterangan,no_file_dok, periode,kode_lokasi,nik_user,tgl_input,nilai) values  "+
							"('"+this.e0.getText()+"','"+this.app.userlog+"','"+this.dp_tgl.getDate()+"','"+this.ket.getText()+"','"+this.nmfile.getText()+"','"+this.ePrd.getText()+"','"+this.app._lokasi+"','"+this.app.userlog+"','"+(new Date).getDateStr()+"',"+parseNilai(this.nilai.getText())+") ");
					for (var k=0; k < this.sg1.rows.getLength(); k++)
					{						
						sql.add("update portal_order_m set status_bayar='1' where no_order='"+this.sg1.getCell(0,k)+"' ");
						sql.add("insert into portal_bayar_d (no_bayar,no_order,no_urut,kode_lokasi) values  "+
							"('"+this.e0.getText()+"','"+this.sg1.getCell(0,k)+"',"+(k+1)+",'"+this.app._lokasi+"') ");
					}
					this.dbLib.execArraySQL(sql);
					this.saveData = true;										
				}else systemAPI.alert("Belum ada item barang yang dipilih","Cek Transaksi lagi");
			}
		}catch(e){
			systemAPI.alert("btnClick",e);
		}
	},
	doFindBtnClick: function(sender, col, row){
		try{
			switch(col)
			{
			    case 0:
					if (sender == this.sg1){
						this.standarLib.ListDataSGFilter(this.getForm(),"Data Barang",sender, 
							  sender.row, sender.col,
							  "select no_order,keterangan from portal_order_m where kode_cust='"+this.app.userlog+"' and status_bayar='0' and status in ('F','C') ",
						      "select count(*) from portal_order_m where kode_cust='"+this.app.userlog+"' and status_bayar='0' and status in ('F','C') ",
						  ["no_order","keterangan"],"and",["No Order","Keterangan"]);
					}
				break;
			}
			
		}catch(e){
			systemAPI.alert("doFindBtnClick : " + e);
		}
	},
	doAfterLoad: function(sender, result, data, filename){
		try{			
			if (!result && this.saveData)
			{				
				this.saveData = false;
			}else if (this.saveData){
				this.saveData = false;			
			}
		}catch(e){
			systemAPI.alert("doAfterLoad: "+e);
		}
	},
	doFileChange: function(sender, filename, allow, data){
		try{					
			if (this.tmpFile != ""){				
				this.file.deleteFile(this.tmpFile);			
			}
			this.nmfile.setText(filename);			
			sender.setParam2("");
			if (typeof(data) == "object"){								
				this.namaFile=data.filename;
				this.Folder=data.folder;
				this.tmpFile = data.tmpfile;
			}else throw(data);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	sg1onChange: function(sender,col,row){
		if (sender == this.sg1){
			if (col == 0){
				try
				{
					var data = this.dbLib.runSQL("select a.no_order,a.keterangan,sum(b.jumlah*b.harga) as total "+
						"from portal_order_m a inner join portal_order_d b on a.no_order=b.no_order "+
						"where a.no_order='"+sender.getCell(0,row)+"' "+
						"group by a.no_order ");
					if (data instanceof portalui_arrayMap){
						if (data.get(0) != undefined){
							data = data.get(0);
							sender.setCell(1,row,data.get("keterangan"));
							sender.setCell(2,row,floatToNilai(data.get("total")));
						}
					}else throw(data);
					var tot=0;
					for (var k=0; k < sender.rows.getLength(); k++)
					{
						tot+=parseFloat(strToFloat(sender.getCell(2,k)));
					}
					this.total.setText(floatToNilai(tot));					
				}catch(e){
					systemAPI.alert( e,"");
				}
			}
		}
	},
	deleteOldFile: function(){
		var rootDir = this.file.getRootDir();										
		var separator = rootDir.charAt(rootDir.length-1);						
		this.file.deleteFile(rootDir +"media"+separator+this.filename);
	},
	uploadFile: function(sender){
		if (this.tmpFile != ""){
			var rootDir = this.file.getRootDir();										
			var separator = rootDir.charAt(rootDir.length-1);						
			this.file.copyFileTo(this.tmpFile,rootDir+this.Folder+separator+this.namaFile,true);
			this.file.deleteFile(this.tmpFile);
			this.tmpFile = "";
		}
	}
});