/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
uses("portalui_sysForm");
window.app_saku_gl_transaksi_fUpdatePop = function(owner,options){
	try{
		if (owner)
		{
			window.app_saku_gl_transaksi_fUpdatePop.prototype.parent.constructor.call(this, owner,options);
			this.className = "app_saku_gl_transaksi_fUpdatePop";			
			this.isClick = false;
			this.mouseX = 0;
			this.mouseY = 0;
			this.maximize();			
			this.caption = "Update Data PP dan DRK";
			this.kode = "";
			this.nama = "";						
			this.onClose.set(this,"doClose");
			this.initComponent();		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			if (options !== undefined){
				this.updateByOptions(options);
			}
		}
	}catch(e){
		systemAPI.alert("[app_saku_gl_transaksi_fUpdatePop]::contruct:"+e);
	}
};
window.app_saku_gl_transaksi_fUpdatePop.extend(window.portalui_sysForm);
window.app_saku_gl_transaksi_fUpdatePop.implement({
	initComponent: function(){
		try{
			this.p = new portalui_panel(this,{bound:[0,0,900,425],caption:"Data Jurnal"});		
			this.sg = new portalui_saiGrid(this.p,{bound:[1,20,898,380], colCount:9,colTitle:["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM"],
				colReadOnly:[true,[0,1,2,3,4,6,8],[5,7]], colFormat:[[4],[cfNilai]],buttonStyle:[[5,7],[bsEllips,bsEllips]],
				ellipsClick:[this, "doFindBtnClick"], colAlign:[[0,3,5,7],[alCenter, alCenter, alCenter, alCenter]],
				colWidth:[[8,7,6,5,4,3,2,1,0],[150,80,150,80,100,50,150,150,80]]
			});
			this.sgn = new portalui_sgNavigator(this.p,{bound:[0,400,898,25],buttonStyle:3,grid:this.sg});		
			this.sgn.setTotalPage(1);		
			this.btn = new portalui_button(this,{bound:[20,445,80,18],caption:"Update",click:[this,"doClick"]});						
			this.btn3 = new portalui_button(this,{bound:[120,445,80,18],caption:"Cancel Update",click:[this,"doClick"]});			
			this.btn2 = new portalui_button(this,{bound:[220,445,80,18],caption:"Cancel",click:[this,"doClick"]});			
			this.standarLib = new util_standar();
		}catch(e){
			alert("initComponent of Main : " + e);
		}
	},
	doFindBtnClick: function(sender, col, row) {
		try
		{
			switch(col)
			{
				case 5 : 
					this.standarLib.showListDataForSG(this, "Daftar PP",sender, sender.row, sender.col,
													  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
													  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
													  new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);
					break;
				case 7 : 
					this.standarLib.showListDataForSG(this, "Daftar Anggaran",sender, sender.row, sender.col,
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.periode.substr(0,4)+"%' and b.kode_pp = '"+sender.getCell(5,row)+"' and b.kode_akun='"+sender.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.periode.substr(0,4)+"%' and b.kode_pp = '"+sender.getCell(5,row)+"' and b.kode_akun='"+sender.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  new Array("a.kode_drk","a.nama"),"and",new Array("Kode Anggaran","Deskripsi"),true);
					break;
			}
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},
	setData: function(no_bukti, requester, posted){
		this.no_bukti = no_bukti;
		this.posted = posted;
		this.requester = requester;
		this.periode = requester.cb_periode.getText();
		var dtJurnal = this.requester.dataEdited.get(this.no_bukti);
		if (dtJurnal){
			var line;
			this.sg.clear();				
			for (var i in dtJurnal.objList){	
				line = dtJurnal.get(i);
				this.sg.appendData([line.kode_akun, line.nama, line.keterangan, line.dc, floatToNilai(line.nilai), line.kode_pp, line.nama_pp, line.kode_drk, line.nama_drk]);
			}
				
		}else this.dbLib.getDataProviderA("select a.kode_akun, b.nama, a.keterangan, a.dc, a.nilai, a.kode_pp, a.kode_drk, c.nama as nmpp, d.nama as nmdrk "+
			" from ju_j a "+
			"	inner join masakun b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi "+
			"	left outer join pp c on c.kode_pp = a.kode_pp and c.kode_lokasi = a.kode_lokasi "+
			"	left outer join drk d on d.kode_drk = a.kode_drk and d.kode_lokasi = a.kode_lokasi "+
			" where a.no_ju = '"+no_bukti+"' and a.kode_lokasi= '"+this.app._lokasi+"' "+
			" ");				
	},
	doClick: function(sender){
		try{	
			if (sender == this.btn3){				
				this.requester.dataEdited.set(this.no_bukti, undefined);
			}
			if (sender == this.btn2) this.requester.doAfterEdit(mrCancel);		
			if (sender == this.btn){			
				var dtJurnal = new portalui_arrayMap();
				for (var i =0;i < this.sg.getRowCount();i++){
					dtJurnal.set(i,{kode_akun:this.sg.cells(0,i), nama:this.sg.cells(1,i), keterangan:this.sg.cells(2,i), dc:this.sg.cells(3,i), nilai:nilaiToFloat(this.sg.cells(4,i)), kode_pp:this.sg.cells(5,i), nama_pp:this.sg.cells(6,i), kode_drk:this.sg.cells(7,i), nama_drk:this.sg.cells(8,i), posted:this.posted});
				}
				this.requester.dataEdited.set(this.no_bukti, dtJurnal);				
				this.requester.doAfterEdit(mrOk);
			}			
			this.hide();
		}catch(e){
			alert(e);
		}
	},
	previewHtml: function(html){		
		this.ctrl.show();
		this.pPrint.show();
		var winfram= this.iframe.contentWindow;
		winfram.document.open();
		winfram.document.write(loadCSS("server_util_laporan"));		
		winfram.document.write(html);		
		winfram.document.close();					
		this.showModal();
		this.html = html;
	},
	doPrintClick: function(){
		this.iframe.contentWindow.focus();
		this.iframe.contentWindow.print();
	},	
	doPreviewClick: function(){
		printPreview(this.html);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			if (methodName == "getDataProvider"){
				eval("var data = "+result+";");
				var line;
				this.sg.clear();				
				for (var i in data.rs.rows){	
					line = data.rs.rows[i];
					this.sg.appendData([line.kode_akun, line.nama, line.keterangan, line.dc, floatToNilai(line.nilai), line.kode_pp, line.nmpp, line.kode_drk, line.nmdrk]);
				}
			}
		}
		
	},
	doClose: function(sender){		
	},
	show: function(withBlank){
		try{			
			system.addMouseListener(this);			
			this.showModal();
			this.centerize();
			this.setVisible(true);
			this.bringToFront();			
			this.getApplication().setActiveForm(this);
		}catch(e){
			systemAPI.alert(this+"::"+e,"Error Data");
		}
	},
	hide: function(){	
		try{			
			this.setVisible(false);
			if (this.requester != undefined){
				this.requester.activate();
				this.getApplication().setActiveForm(this.requester.getForm());				
				this.requester.getForm().unblock();
			}
		}catch(e){
			alert(e);
		}
	}
});

