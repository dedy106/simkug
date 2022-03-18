//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_frontend_alpa_fMemberBayar = function(owner,options){
	try{
		if (owner)
		{
			window.app_frontend_alpa_fMemberBayar.prototype.parent.constructor.call(this, owner,options);			
			this.className = "app_frontend_alpa_fMemberBayar";											
			this.initComponent();
			this.title = "Input Pembayaran";
		}
	}catch(e)
	{
		alert("[app_frontend_alpa_fMemberBayar]::contruct:"+e,"");
	}
};
window.app_frontend_alpa_fMemberBayar.extend(window.portalui_roundPanel);
window.app_frontend_alpa_fMemberBayar.implement({
	initComponent: function(){		
		try{
			uses("util_standar;util_file;portalui_datePicker;portalui_label;portalui_button;portalui_saiCBBL;portalui_saiLabelEdit;portalui_saiGrid;portalui_sgNavigator;portalui_uploader");
			this.standarLib = new util_standar();
			this.dbLib = new util_dbUtility();
			this.file = new util_file();
			this.file.addListener(this);
			this.dbLib.addListener(this);
			var top = document.all ? 102:103;					
			this.ePrd = new portalui_saiLabelEdit(this,{bound:[20,10,182,20],caption:"Periode",readOnly:true});
			this.lTgl = new portalui_label(this,{bound:[20,32,100,18],underline:true,caption:"Tanggal Bayar"});
			this.dp_tgl = new portalui_datePicker(this,{bound:[120,32,82,20],tag:"tglorderip",selectDate:[this,"doSelect"]});
			this.e0 = new portalui_saiCBBL(this,{bound:[20,54,250,20],caption:"No. Pembayaran",btnVisible:false,rigthLabelVisible:false});
			this.bGen = new portalui_button(this,{bound:[265,54,80,20],caption:"Generate",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doBtnClick"]});
			this.ket = new portalui_saiLabelEdit(this,{bound:[20,76,400,20],caption:"Keterangan"});
			this.nmfile = new portalui_saiLabelEdit(this,{bound:[20,98,200,20],caption:"Nama File",text:"-"});
			this.uploader = new portalui_uploader(this,{bound:[230,98,60,20],afterUpload:[this,"doAfterLoad"],param1:"uploadTo",param2:"server/media/tmp",param3:"object",autoSubmit:true,change:[this,"doFileChange"]});			
			this.nilai = new portalui_saiLabelEdit(this,{bound:[20,120,200,20],tipeText:ttNilai, alignment:alRight, caption:"Nilai Pembayaran"});
			this.p1 = new portalui_panel(this,{bound:[20,142,this.width - 35,170],border:3,caption:"Daftar Order"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,this.p1.width - 4,125],colCount:3,colTitle:["No. Order","Keterangan","Nilai Order"],colWidth:[[2,1,0],[125,375,100]],
                buttonStyle:[[0],[bsEllips]],colFormat:[[2],[cfNilai]],change:[this,"sg1onChange"],ellipsClick:[this,"doFindBtnClick"]});
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,144,this.p1.width - 4,30],grid:this.sg1,buttonStyle:2});
			this.total = new portalui_saiLabelEdit(this.sgn,{bound:[175,2,250,20],tipeText:ttNilai, alignment:alRight,caption:"Total",readOnly:true});
			this.bInput = new portalui_button(this,{bound:[20,330,80,18],caption:"Simpan",icon:"url(icon/"+system.getThemes()+"/save.png)",click:[this,"doBtnClick"]});
			this.dp_tgl.setDateString(new Date().getDateStr());
			this.rearrangeChild(5,23);
			//------
			if (this.app._mainForm.listDataForm === undefined){
				this.app._mainForm.createListData();
			}
			this.rootDir=this.file.getRootDir();
			this.file.cleanUp(this.rootDir+"/media/tmp");
		}catch(e){
			alert(e);
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
					alert(result);
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
			alert("::doChildItemsClick : "+e);
		}
	},
	doSelect: function(sender, y, m, d){
		var prd = y +""+ (m < 10 ? '0' + m: m);
		this.ePrd.setText(prd);
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
						sql.add("insert into portal_bayar_d (no_bayar,no_order,no_urut,kode_lokasi,nilai) values  "+
							"('"+this.e0.getText()+"','"+this.sg1.getCell(0,k)+"',"+(k+1)+",'"+this.app._lokasi+"',"+parseNilai(this.sg1.getCell(2,k))+") ");
					}
					this.dbLib.execArraySQL(sql);
					this.saveData = true;										
				}else alert("Belum ada item barang yang dipilih","Cek Transaksi lagi");
			}
		}catch(e){
			alert("btnClick",e);
		}
	},
	doFindBtnClick: function(sender, col, row){
		try{
			switch(col)
			{
			    case 0:
					if (sender == this.sg1){
						this.standarLib.ListDataSGFilter(this.getForm(),"Data Order",sender, 
							  sender.row, sender.col,
							  "select no_order,keterangan from portal_order_m where kode_cust='"+this.app.userlog+"' and status_bayar='0' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.ePrd.getText()+"'",
						      "select count(*) from portal_order_m where kode_cust='"+this.app.userlog+"' and status_bayar='0'  and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.ePrd.getText()+"'",
							  ["no_order","keterangan"],"and",["No Order","Keterangan"]);
					}
				break;
			}
			
		}catch(e){
			alert("doFindBtnClick : " + e);
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
			alert("doAfterLoad: "+e);
		}
	},
	doFileChange: function(sender, filename, allow, data){
		try{					
			/*if (this.tmpFile != ""){				
				this.file.deleteFile(this.tmpFile);			
			}*/
			this.nmfile.setText(filename);			
			this.namaFile=data;
			/*if (typeof(data) == "object"){								
				
				this.Folder=data.folder;
				this.tmpFile = data.tmpfile;
			}else throw(data);*/
		}catch(e){
			alert(e);
		}
	},
	sg1onChange: function(sender,col,row){
		if (sender == this.sg1){
			if (col == 0){
				try
				{
					var data = this.dbLib.getDataProvider("select a.no_order,a.keterangan,sum(b.jumlah*b.harga) as total "+
						"from portal_order_m a inner join portal_order_d b on a.no_order=b.no_order "+
						"where a.no_order='"+sender.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"group by a.no_order ",true);
					if (typeof data != "string"){
						if (data.rs != undefined && data.rs.rows[0] != undefined ){
							data = data.rs.rows[0];
							sender.setCell(1,row,data.keterangan);
							sender.setCell(2,row,floatToNilai(data.total));
						}
					}else throw(data);
					var tot=0;
					for (var k=0; k < sender.rows.getLength(); k++)
					{
						tot+=parseFloat(strToFloat(sender.getCell(2,k)));
					}
					this.total.setText(floatToNilai(tot));					
				}catch(e){
					alert( e,"");
				}
			}
		}
	},
	deleteOldFile: function(){
		//var separator = rootDir.charAt(rootDir.length-1);						
		this.file.deleteFile(rootDir +"media"+separator+this.filename);
	},
	uploadFile: function(sender){
		//var separator = this.rootDir.charAt(this.rootDir.length-1);
		this.file.copyFileTo(this.rootDir+"/media/tmp/"+this.namaFile,this.rootDir+"/media/"+this.namaFile,true);
		//this.file.deleteFile(this.tmpFile);
	}
});
