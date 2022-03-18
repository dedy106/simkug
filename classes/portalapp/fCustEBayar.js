//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalapp_fCustEBayar = function(owner){
	try{
		if (owner)
		{
			window.portalapp_fCustEBayar.prototype.parent.constructor.call(this, owner);
			window.portalapp_fCustEBayar.prototype.parent.setBorder.call(this, 0);		
			window.portalapp_fCustEBayar.prototype.parent.setColor.call(this, "");		
			this.className = "portalapp_fCustEBayar";											
			this.initComponent();		
			this.title = "Edit Pembayaran";
		}
	}catch(e)
	{
		systemAPI.alert("[portalapp_fCustEBayar]::contruct:"+e,"");
	}
};
window.portalapp_fCustEBayar.extend(window.portalui_panel);
window.portalapp_fCustEBayar.implement({
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
			this.e0.setReadOnly(true);
			this.e0.setBtnVisible(true);
			this.e0.setRightLabelVisible(false);
			this.e0.onBtnClick.set(this,"FindBtnClick");
			this.e0.onChange.set(this,"doEditChange");			
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
			this.loadFile = false;
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
					if (this.action == "hapus" || this.loadFile) 
						this.deleteOldFile();				
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
		if (sender == this.e0)
			this.standarLib.showListData(this.getForm(), "Data Pembayaran",sender,undefined, 
										  "select no_bayar,keterangan from portal_bayar_m where kode_sales='"+this.app.userlog+"' ",
										  "select count(*) from portal_bayar_m where kode_sales='"+this.app.userlog+"' ",										
										  ["no_bayar","Keterangan"],"where",["No Bukti","Keterangan"]);
		
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
			if (sender == this.bHapus){
				this.btnBayar="hapus";
				this.formBayar=true;
				uses("server_util_arrayList");					
				var sql = new server_util_arrayList();
				sql.add("delete from portal_bayar_d where no_bayar='"+this.e0.getText()+"'");
				sql.add("delete from portal_bayar_m where no_bayar='"+this.e0.getText()+"'");
				for (var k=0; k < this.sg1eb.rows.getLength(); k++)
					sql.add("update portal_order_m set status_bayar='0' where no_order='"+this.sg1.getCell(0,k)+"' ");				
				this.dbLib.execArraySQL(sql);
			}else{
				this.btnBayar="ubah";
				this.formBayar=true;
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				sql.add("update portal_bayar_m set tanggal='"+this.dp_tgl.getDate()+
						"',keterangan='"+this.ket.getText()+"',no_file_dok='"+this.nmfile.getText()+
						"',periode='"+this.ePrd.getText()+
						"',nilai="+parseNilai(this.nilai.getText())+
						" where no_bayar = '"+this.e0.getText()+"' and kode_sales = '"+this.app.userlog+"' ");
				for (var k=0; k < this.jumrowbyr; k++)
					sql.add("update portal_order_m set status_bayar='0' where no_order='"+this.tmp_eb[k]+"' ");				
				sql.add("delete from portal_bayar_d where no_bayar='"+this.e0.getText()+"'")
				for (var k=0; k < this.sg1.rows.getLength(); k++){
					var urut=k+1;
					sql.add("update portal_order_m set status_bayar='1' where no_order='"+this.sg1.getCell(0,k)+"' ");
					sql.add("insert into portal_bayar_d (no_bayar,no_order,no_urut,kode_lokasi) values  "+
						"('"+this.e0.getText()+"','"+this.sg1.getCell(0,k)+"',"+urut+",'"+this.app._lokasi+"') ");
				}
				this.dbLib.execArraySQL(sql);
				this.saveData = true;
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
			this.loadFile = true;
		}catch(e){
			systemAPI.alert("doAfterLoad: "+e);
		}
	},
	doEditChange: function(sender){
		try{
			var data = this.dbLib.getDataProvider("select * from portal_bayar_m "+
						"where no_bayar = '"+this.e0.getText()+"' and kode_sales='"+this.app.userlog+"' ");
			eval("data = "+data+";");
			if (typeof(data) == "object"){
				if (data.rs.rows != undefined){
					data = data.rs.rows[0];					
					this.dp_tgl.setDateString(data.tanggal);
					this.ket.setText(data.keterangan);
					this.nmfile.setText(data.no_file_dok);
					this.filename=data.no_file_dok;
					this.nilai.setText(floatToNilai(data.nilai));
					var brg = this.dbLib.getDataProvider("select a.no_order,b.keterangan, sum(c.jumlah*c.harga) as total "+
						"from portal_bayar_d a inner join portal_order_m b on a.no_order=b.no_order "+
						"inner join portal_order_d c on b.no_order=c.no_order "+
						"where a.no_bayar = '"+this.e0.getText()+"' "+
						"group by b.no_order ");
					data = brg;
					eval("brg = "+brg+";");
					if (typeof(brg) == "object")
					{
						if (brg.rs.rows[0]!=undefined)
						{
							this.sg1.clear();
							this.sg1.showLoading();
							this.sg1.setData(brg);										
							this.sg1.setColWidth([2,1,0],[125,175,100]);
							this.sg1.columns.get(0).setButtonStyle(bsEllips);
							this.sg1.columns.get(2).setColumnFormat(cfNilai);
						}
					}
					var tot=0;
					this.tmp_eb=[];
					for (var k=0; k < this.sg1.rows.getLength(); k++)
					{
						this.tmp_eb[k]=this.sg1.getCell(0,k);
						tot+=parseFloat(nilaiToFloat(this.sg1.getCell(2,k)));
					}
					this.total.setText(floatToNilai(tot));
					this.jumrowbyr=this.sg1.rows.getLength();					
				}
			}else throw(data);
		}catch(e){
			systemAPI.alert(e, data);
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