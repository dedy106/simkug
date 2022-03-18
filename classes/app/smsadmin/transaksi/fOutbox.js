/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
window.app_smsadmin_transaksi_fOutbox = function(owner)
{
	if (owner)
	{
		window.app_smsadmin_transaksi_fOutbox.prototype.parent.constructor.call(this,owner);
		this.className  = "app_smsadmin_transaksi_fOutbox";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.bSend.setCaption("Refresh");
		this.app._mainForm.childFormConfig(this, "mainButtonClick","SMS Outbox", 7);	
		this.onClose.set(this,"doClose");
//------------------------------------------------------------------------
		this.pager = 50;
		uses("portalui_FEtabPanel");
		this.tp = new portalui_FEtabPanel(this);
		this.tp.setTop(10);
		this.tp.setLeft(10);
		this.tp.setWidth(200);
		//this.tp.setHeight(this.height - 50);
		this.tp.addPage(["Folder","Cust Group"]);
		
		this.treev = new portalui_treeView(this.tp.childPage[1]);
		this.treev.setTop(10);
		this.treev.setLeft(10);
		this.treev.setWidth(180);		
		this.treev.childLength = 200;
		this.treev.onDblClick.set(this, "treeClick");						
		
		this.treev1 = new portalui_treeView(this.tp.childPage[0]);
		this.treev1.setTop(10);
		this.treev1.setLeft(10);
		this.treev1.setWidth(180);		
		this.treev1.childLength = 200;
		this.treev1.onDblClick.set(this, "treeClick");						
		
		this.sg = new portalui_saiGrid(this);
		this.sg.setTop(10);
		this.sg.setLeft(230);							
		this.sg.setColCount(5);
		this.sg.setColTitle(["Customer","No Telp","Message","Date","Status"]);
		this.sg.setColWidth([0,1,2,3,4],[150,100,350,110,50]);
		this.sg.setReadOnly(true);
		
		this.sgn = new portalui_sgNavigator(this);
		this.sgn.setTop(this.sg.height + this.sg.top);
		this.sgn.setLeft(230);
		this.sgn.setButtonStyle(3);
		this.sgn.setWidth(this.sg.width);
		this.sgn.setGrid(this.sg);
		this.sgn.onPager.set(this, "doSelectedPage");
		
				
		this.timer = new portalui_timer(this);
		this.timer.onTimer.set(this,"doClick");
		this.timer.setInterval(5000);
		this.timer.setEnabled(false);
		this.maximize();		
		this.setTabChildIndex();
		//this.rearrangeChild(10,23);
		try
		{
			uses("util_dbLib");
			this.dbLib = new util_dbLib(window.system.serverApp);		
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			uses("server_sms_sms");
			this.sms = new server_sms_sms();
			this.sms.addListener(this);
			this.loadFolder = true;
			this.dbLib.loadQueryA("select kode_folder as kode_klpcust, kode_lokasi, nama, level_spasi, level_lap, tipe, sum_header, kode_induk, rowindex, tgl_input, nik_user from sms_folder where kode_lokasi = '"+this.app._lokasi+"'  order by rowindex",0,0);						
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_smsadmin_transaksi_fOutbox.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_smsadmin_transaksi_fOutbox.prototype.mainButtonClick = function(sender)
{

	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}else
	if (sender == this.app._mainForm.bSend)
	{
		this.doClick();
	}
};
window.app_smsadmin_transaksi_fOutbox.prototype.doAfterResize = function(event, height, width)
{
	this.sg.setWidth(this.width - this.tp.width - 50);
	this.sg.setHeight(this.height - 75);
	this.tp.setHeight(this.height - 50);
	this.treev.setHeight(this.height - 100);
	this.treev1.setHeight(this.height - 100);
	this.sgn.setTop(this.sg.height + this.sg.top);
	this.sgn.setWidth(this.sg.width);
};
window.app_smsadmin_transaksi_fOutbox.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{				
				
			}
			break;		
	}	
};

window.app_smsadmin_transaksi_fOutbox.prototype.doClick = function(sender)
{
	try{
		this.timer.setEnabled(false);
		var dt = this.sms.outbox();
		if (dt instanceof portalui_arrayMap){
			this.sg.clear();
			var data;
			for (var i in dt.objList){
				data = [];
				for (var j in dt.get(i).objList) 
					data.push(dt.get(i).get(j));
				this.sg.appendData(data);
			}
		}else alert(dt);
		this.timer.setEnabled(true);
	}catch(e){
		alert(e);
	}
};

window.app_smsadmin_transaksi_fOutbox.prototype.doRequestReady = function(sender, methodName, result)
{	
	try{
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "runQuery" : 								
					if (this.loadFolder){
						this.loadMenu(result, this.treev1);				
						this.dbLib.loadQueryA("select kode_klpcust, kode_lokasi, nama, level_spasi, level_lap, tipe, sum_header, kode_induk, rowindex, tgl_input, nik_user from sms_klpcust where kode_lokasi = '"+this.app._lokasi+"'  order by rowindex",0,0);				
						this.loadFolder = false;
					}else this.loadMenu(result, this.treev);								
					break;				
				case "getDataProviderPage" : 	
					var dtInbox = result;
					dtInbox = eval('(' + dtInbox+')');		
					if (typeof(dtInbox) == "object"){
						var line,data = [];
						this.sg.clear();
						for (var i in dtInbox.rs.rows){
							line = dtInbox.rs.rows[i];			
							this.sg.appendData([line.nama, line.no_telp, line.tanggal, line.pesan, line.flag_kirim]);
						}
					}
					break;	
			}
		}
	}catch(e){
		alert(e);
	}
};

window.app_smsadmin_transaksi_fOutbox.prototype.doClose = function(){
	this.app._mainForm.bSend.setCaption("Send");
};
window.app_smsadmin_transaksi_fOutbox.prototype.loadMenu = function(daftarNrc, treev)
{
	try
	{		
		this.isStr = true;
		system.showProgress();
		var menu = strToArray(daftarNrc);
		var rowNo = 0;		
		var itemValues = undefined;
		if (treev != undefined)
			treev.clear();
			
		var kode = undefined;
		var nama = undefined;
		var levelLap = undefined;
		var level = undefined;
		var item = undefined;
		var node = undefined;
		var line, ix = -1;
		
		var kdNrc = '-';					
		//while (rowNo < menu.getLength())
		for (var r in menu.objList)
		{
			itemValues = menu.objList[r];			
			if (this.isStr){				
				kode = itemValues.get(0);									
				var itemTmp = new portalui_arrayMap();
				itemTmp.set("kode_klpcust",itemValues.get(0));
				itemTmp.set("kode_lokasi", itemValues.get(1));
				itemTmp.set("nama", itemValues.get(2));
				itemTmp.set("level_spasi", itemValues.get(3));
				itemTmp.set("level_lap", itemValues.get(4));				
				itemTmp.set("tipe", itemValues.get(5));
				itemTmp.set("sum_header", itemValues.get(6));
				itemTmp.set("kode_induk", itemValues.get(7));
				itemTmp.set("rowindex", itemValues.get(8));
				itemTmp.set("tgl_input", itemValues.get(9));
				itemTmp.set("nik_user",itemValues.get(10));
				itemValues = itemTmp;
			}	
			kode = itemValues.get("kode_klpcust");										
			if (kode != "")
			{	
				nama = itemValues.objList["nama"];
				levelLap = itemValues.objList["level_lap"];
				level = itemValues.objList["level_spasi"];								
				
				level++;
				if (node == undefined)
				{
					node = new portalui_treeNode(treev);
				}else if ((node instanceof portalui_treeNode) && (node.getLevel() == level - 1))
				{
					node = new portalui_treeNode(node);
				}else if ((node instanceof portalui_treeNode) && (node.getLevel() == level))
				{	
					node = new portalui_treeNode(node.owner);
				}else if ((node instanceof portalui_treeNode) && (node.getLevel() > level))
				{	
					if (!(node.owner instanceof portalui_treeView))
					{
						node = node.owner;
						while (node.getLevel() > level)
						{
							if (node.owner instanceof portalui_treeNode)
								node = node.owner;
						}
					}
	
					node = new portalui_treeNode(node.owner);				
				}		
				node.setKodeForm(levelLap);
				node.setKode(kode);
				node.setCaption(nama);
				node.setShowKode(true);
				node.data = itemValues;														
			}
			rowNo++;
		}
		system.hideProgress();
	}catch(e)
	{
		system.hideProgress();
		alert("row "+ rowNo +" : "+e);
	}
};
window.app_smsadmin_transaksi_fOutbox.prototype.treeClick = function(item)
{
	try{
		if (item.owner == this.treev){
			var cust = this.getPostingLevel(item);
			cust = cust.split(";");			
			this.sqlScript = "select ifnull(b.nama, '-') as nama, a.no_telp, a.tanggal, a.pesan, a.flag_kirim from sms_outbox a "+
				"	left outer join sms_cust b on b.no_telp = a.no_telp "+
				"where b.kode_klpcust in ("+cust+")";									
			this.scriptSqlCount ="select count(*) as tot from sms_outbox a "+
				"	left outer join sms_cust b on b.no_telp = a.no_telp "+
				"where b.kode_klpcust in ("+cust+")";										
		}else {
			if (item.getKode() == "R000" || item.getCaption() == "Inbox"){
				this.sqlScript = "select ifnull(b.nama, '-') as nama, a.no_telp, a.tanggal, a.pesan, a.flag_kirim from sms_outbox a "+
				"	left outer join sms_cust b on b.no_telp = a.no_telp ";
				this.scriptSqlCount = "select count(*) as tot from sms_outbox a "+
				"	left outer join sms_cust b on b.no_telp = a.no_telp ";
			}else {
				this.sqlScript = "select ifnull(b.nama, '-') as nama, a.no_telp, a.tanggal, a.pesan, a.flag_kirim from sms_outbox a "+
				"	left outer join sms_cust b on b.no_telp = a.no_telp "+
				" where kode_folder = '"+item.getKode()+"'";
				this.scriptSqlCount = "select count(*) as tot from sms_outbox a "+
				"	left outer join sms_cust b on b.no_telp = a.no_telp "+
				" where kode_folder = '"+item.getKode()+"'";
			}		
		}		
		this.dbLib.getDataProviderPageA(this.sqlScript, 1, this.pager);		
		this.pageCount = this.dbLib.getRowCount(this.scriptSqlCount, this.pager);		
		this.sgn.setTotalPage(this.pageCount);
		this.sgn.rearrange();
		this.sgn.setButtonStyle(3);
	}catch(e){
		alert(e +" "+dtInbox);
	}
};

window.app_smsadmin_transaksi_fOutbox.prototype.getPostingLevel = function(item)
{	
	if (item.data.get("tipe") == "Posting")
		return "'"+item.getKode()+"'";
	else if (item.childs.getLength() > 0){
		var posLvl = "";
		for (var i in item.childs.objList){						
			posLvl += ";"+this.getPostingLevel(system.getResource(item.childs.get(i)));
		}		
		posLvl = posLvl.substr(1);				
		return posLvl;
	}
};
window.app_smsadmin_transaksi_fOutbox.prototype.doSelectedPage = function(sender, page)
{
	this.dbLib.getDataProviderPageA(this.sqlScript, page, this.pager);	
};