//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_saku3_transaksi_bpr_fMenu = function(owner){
	if (owner){
		try{
			window.app_saku3_transaksi_bpr_fMenu.prototype.parent.constructor.call(this, owner);
			this.className = "app_saku3_transaksi_bpr_fMenu";
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Setting Menu", 0);					
			this.maximize();
			this.e0 = new portalui_saiCB(this);
			this.e0.setBound(20,20,250,20);
			this.e0.setCaption("Kode Menu");
			this.e0.setReadOnly(false);
			this.e0.setMustCheck(false);		
						
			this.btn = new portalui_imageButton(this);
			this.btn.setBound(280,20,21,21);
			this.btn.setHint("Reload");
			this.btn.setImage("icon/"+system.getThemes()+"/reload.png");
			this.btn.onClick.set(this, "doClick");
			
			this.treev = new portalui_treeView(this);
			this.treev.setBound(20,68,700,this.height - 100);
			this.treev.childLength = 700;
			this.treev.onDblClick.set(this, "treeClick");					
			
			this.addBtn = new portalui_imageButton(this);
			this.addBtn.setBound(27,45,22,22);
			this.addBtn.setImage("icon/"+system.getThemes()+"/createentries.png");
			this.addBtn.setHint("create new entries");
			this.addBtn.onClick.set(this,"entriesClick");
			
			this.editBtn = new portalui_imageButton(this);
			this.editBtn.setBound(47,45,22,22);
			this.editBtn.setImage("icon/"+system.getThemes()+"/editentries.png");
			this.editBtn.setHint("edit entries");
			this.editBtn.onClick.set(this,"entriesClick");
			
			this.delBtn = new portalui_imageButton(this);
			this.delBtn.setBound(67,45,22,22);
			this.delBtn.setImage("icon/"+system.getThemes()+"/delentries.png");
			this.delBtn.setHint("delete entries");
			this.delBtn.onClick.set(this,"entriesClick");
			
			this.downBtn = new portalui_imageButton(this);
			this.downBtn.setBound(87,45,22,22);
			this.downBtn.setImage("icon/"+system.getThemes()+"/down.png");
			this.downBtn.setHint("Move Down");
			this.downBtn.onClick.set(this,"entriesClick");
			
			this.upBtn = new portalui_imageButton(this);
			this.upBtn.setBound(107,45,22,22);
			this.upBtn.setImage("icon/"+system.getThemes()+"/up.png");
			this.upBtn.setHint("Move Up");
			this.upBtn.onClick.set(this,"entriesClick");
			
			this.leftBtn = new portalui_imageButton(this);
			this.leftBtn.setBound(127,45,22,22);
			this.leftBtn.setImage("icon/"+system.getThemes()+"/bleft.png");
			this.leftBtn.setHint("Geser Kiri");
			this.leftBtn.onClick.set(this,"entriesClick");
			
			this.rightBtn = new portalui_imageButton(this);
			this.rightBtn.setBound(147,45,22,22);
			this.rightBtn.setImage("icon/"+system.getThemes()+"/bright.png");
			this.rightBtn.setHint("Geser Kanan");
			this.rightBtn.onClick.set(this,"entriesClick");
			
			this.rootBtn = new portalui_imageButton(this);
			this.rootBtn.setBound(167,45,22,22);
			this.rootBtn.setImage("icon/"+system.getThemes()+"/imgSelect.png");
			this.rootBtn.setHint("Tidak ada yang pilih");
			this.rootBtn.setCaption("R");
			this.rootBtn.onClick.set(this,"entriesClick");
						
			this.dblib = this.app.dbLib;
			this.dblib.addListener(this);			
			this.e0.setText(this.app._kodeMenu);			
			var klp = this.dblib.getDataProvider("select distinct kode_klp from menu");					
			eval("klp= "+klp+";");
			if (klp.rs.rows[0] !== undefined) {
				this.e0.clearItem();
				for (var i in klp.rs.rows){							
					this.e0.addItem(i,klp.rs.rows[i].kode_klp);
				}
			}
			this.menuStr = "";
			
			setTipeButton(tbSimpan);						
			this.rowIndex = 0;		
			this.setTabChildIndex();
			this.onClose.set(this, "doClose");

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fMenu.extend(window.portalui_childForm);
window.app_saku3_transaksi_bpr_fMenu.implement({
	doClose: function(sender){
		this.dblib.delListener(this);
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)	
			system.confirm(this, "clear", "screen akan dibersihkan?","");		
		else if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","");
		else if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");
		else if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","");		
	},
	doRequestReady: function(sender, methodName, result, request){
		if (sender == this.dblib && this == request){			
			switch (methodName){
				
				case "getDataProvider" : 									
					eval("this.menuStr = "+result+";");
					this.loadMenu();					
					break;
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1)
						system.info(this, "transaction completed","");
					else
						system.alert(this, result,"");
					break;
			}
		}
	},
	doModalResult: function(event, modalResult, value){
		switch (event){
			case "Add" :
			   if ( modalResult == mrOk){
	    			var valArray = value.split(";");
	    			var node = this.selectedItem;
	    			if (node == undefined)
	    			  node = new portalui_treeNode(this.treev);
	    			else
	    			  node = new portalui_treeNode(this.selectedItem);
	    			node.setKode(valArray[0]);
	    			node.setCaption(valArray[1]);	
	    			node.setKodeForm(valArray[2]);
	    			if (trim(valArray[2]) != "")
				       node.setShowKode(true);
				    else node.setShowKode(false);
				}
				break;
			case "Edit" :
				if (modalResult == mrOk){
					var item = this.selectedItem;
					var valArray = value.split(";");
					item.setKode(valArray[0]);
					item.setCaption(valArray[1]);
					item.setKodeForm(valArray[2]);
					if (trim(valArray[2]) != "")
				       item.setShowKode(true);
				    else item.setShowKode(false);
				}
				break;
			case "Remove" :
				if (modalResult == mrOk)			
					 this.treev.delItem(this.selectedItem);
				break;
			case "clear" :
				if (modalResult == mrOk)
					this.treev.clear();
				break;
			case "simpan" :
				if (modalResult == mrOk){
					this.rowindex = 0;
					var value = this.getTreeData(this.treev);
					var sqlScripts = value.split(";");
					try{						
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from menu where kode_klp = '"+this.e0.getText()+"'");
						for (var i in sqlScripts)
						{
						   if (trim(sqlScripts[i])!= "")
						       sql.add(sqlScripts[i]);
						}
						this.dblib.execArraySQL(sql, undefined, this);						
					}catch(e){
						systemAPI.alert(e);
					}
				}
				break;		
		}
	},
	loadMenu: function(){
		try{
			var menu = this.menuStr;
			var rowNo = 0;			
			var itemValues = undefined;
			if (this.treev != undefined)
				this.treev.clear();				
			var kode = undefined;
			var nama = undefined;
			var kodeForm = undefined;
			var level = undefined;			
			var node = undefined;
			for (var rowNo in menu.rs.rows)
			{
				itemValues = menu.rs.rows[rowNo];					
				kode = itemValues.kode_menu;
				nama = itemValues.nama;
				kodeForm = itemValues.kode_form;
				level = itemValues.level_menu;
				level++;
				if (node == undefined)
					node = new portalui_treeNode(this.treev);
				else if (node.getLevel() == level - 1)
					node = new portalui_treeNode(node);								
				else if ((node.getLevel() == level))
					node = new portalui_treeNode(node.owner);				
				else if (node.getLevel() > level)
				{
					node = node.owner;
					while (node.getLevel() > level)
					    if (node.owner instanceof portalui_treeNode)
							node = node.owner;					
					node = new portalui_treeNode(node.owner);								
				}		
				node.setKodeForm(kodeForm);
				node.setKode(kode);
				node.setCaption(nama);
				node.setShowKode(true);				
				node.data = itemValues;				
			}			
		}catch(e){
			systemAPI.alert(rowNo +" "+e);
		}
	},
	doClick: function(sender){		
		this.dblib.getDataProviderA("select * from menu where kode_klp = '"+this.e0.getText()+"' order by rowindex",undefined, this);		
	},
	entriesClick: function(sender){
		try{
			uses("app_saku3_transaksi_bpr_fMenuDetail");	
			if (this.entryMenu !== undefined) this.entryMenu.free();
			this.entryMenu = new app_saku3_transaksi_bpr_fMenuDetail(this.app);
			this.entryMenu.setBound((this.app._mainForm.width / 2)- 200,(this.app._mainForm.height / 2) - 150,400,200);
			this.entryMenu.doAfterResize(this.entryMenu.width, this.entryMenu.height);				
			if (sender == this.addBtn){
				var item = this.treev.getSelectedItem();
				if (item != undefined){
					this.selectedItem = item;		
					this.entryMenu.setCaption(item.getCaption());
					this.entryMenu.setItemParent(item);
				}else{
					this.selectedItem = undefined;		
					this.entryMenu.setCaption("Create Entries");			
				}
				this.entryMenu.event = "Add";
				this.entryMenu.formRequester = this;
				this.entryMenu.e0.setReadOnly(false);
				this.entryMenu.e0.setText("");
				this.entryMenu.e1.setText("");
				this.entryMenu.e2.setText("");
				this.entryMenu.showModal();		
			}else if (sender == this.editBtn){
				var item = this.treev.getSelectedItem();
				this.selectedItem = item;
				this.entryMenu.event = "Edit";
				this.entryMenu.formRequester = this;
				this.entryMenu.setCaption(item.getCaption());
				this.entryMenu.setItemParent(item);
				this.entryMenu.e0.setText(item.getKode());				
				this.entryMenu.e1.setText(trim(item.getCaption()));
				this.entryMenu.e2.setText(item.getKodeForm());
				this.entryMenu.showModal();		
			}else if (sender == this.rootBtn){
				this.treev.doSelectItem(undefined);	
				this.selectedItem = undefined;				
			}else if (sender == this.delBtn){
				var item = this.treev.getSelectedItem();	
				this.selectedItem = item;
				system.confirm(this, "Remove","Yakin menu "+item.getCaption()+" akan dihapus?");
			}else if (sender == this.upBtn){
				var item = this.treev.getSelectedItem();
				var owner = item.owner;
				var child ,tmp;				
				for (var i=0; i < owner.childsIndex.length;i++)
				{
					tmp = system.getResource(owner.childsIndex[i]);								
					if (tmp.childIndex == (item.childIndex - 1)) 
						child = tmp;																	
				}
				if (child != undefined)
					this.switchItem(item, child);					
			}else if (sender == this.downBtn){
				var item = this.treev.getSelectedItem();
				var owner = item.owner;
				var child ,tmp;
				for (var i=0; i < owner.childsIndex.length;i++)
				{
					tmp = system.getResource(owner.childsIndex[i]);
					if (tmp.childIndex == (item.childIndex + 1)) 
						child = tmp;																
				}				
				if (child != undefined)
					this.switchItem(item, child);				
			}else if (sender == this.leftBtn){
				var item = this.treev.getSelectedItem();
				var owner = item.owner;
				var child = owner;
				if (child != undefined)
				{	
					if (owner instanceof portalui_treeView) return false;
					this.moveItem(item, owner.owner);
				}
			}else if (sender == this.rightBtn){
				var item = this.treev.getSelectedItem();
				var owner = item.owner;				
				var child,tmp;
				for (var i=0;i < owner.childsIndex.length;i++)
				{			
					tmp = system.getResource(owner.childsIndex[i])	;			
					if (tmp != undefined && tmp.childIndex == (item.childIndex - 1)) 
						child = tmp;																	
				}
				if (child != undefined)									
					this.moveItem(item, child);
			}			
		}catch(e){
			system.alert(this, "FMenu::Entries Click",e);
		}
	},
	treeClick: function(item){	
	},
	getTreeData: function(node){
		var result = "";
		var child = undefined;
		if (node instanceof portalui_treeView){
			for (var i=0; i < node.childsIndex.length;i++){
				child = system.getResource(node.childsIndex[i]);
				if(child != undefined)
					result += this.getTreeData(child);	
			}
		}else{
			this.rowIndex++;
			result += "insert into menu (kode_menu, nama, level_menu, kode_form, rowindex, kode_klp) values ";
			result += "('" +node.getKode() +"','" + trim(node.getCaption());
			result += "','"+(node.getLevel() - 1).toString()+"','"+node.getKodeForm()+"','"+this.rowIndex+"','"+this.e0.getText()+"');";
			if (node.isHasChild())
				for (var i=0;i < node.childsIndex.length;i++)
				{
					child = system.getResource(node.childsIndex[i]);
					if(child != undefined)
						result += this.getTreeData(child);	
				}
			
		}
		return result;
	},
	doChange: function(sender){
		this.treev.clear();
	},
	copyChilds: function(from, to){
		var temp = undefined;
		for (var i=0; i < from.childsIndex.length;i++){
			temp = system.getResource(from.childsIndex[i]);						
			chld = new portalui_treeNode(to);
			chld.setKodeForm(temp.getKodeForm());
			chld.setKode(temp.getKode());
			chld.setCaption(temp.getCaption());
			chld.setShowKode(temp.showKode);													
			chld.data = temp.data;
			if (temp.childs.getLength() != 0)
				this.copyChilds(temp,chld);			
		}
		from.clearChild();
		to.setShowKode(true);
	},
	switchItem: function(from, to){
		var item = from; 
		var child = to;
		var kdForm ,kd,caption ,tmp;
		kdForm = child.getKodeForm();
		kd = child.getKode();	
		caption = child.getCaption();
		child.setKodeForm(item.getKodeForm());
		child.setKode(item.getKode());
		child.setCaption(item.getCaption());				
		child.setShowKode(true);	
		child.data = item.data;
		item.setKodeForm(kdForm);
		item.setKode(kd);
		item.setCaption(caption);
		item.setShowKode(true);							
		item.owner.rearrange();
		child.doSelect();					
		if (item.childs.getLength() != 0){
			tmp = new portalui_treeNode(this.treev);
			this.copyChilds(item, tmp);	
		}				
		if (child.childs.getLength() != 0)
			this.copyChilds(child, item);												
		if (tmp instanceof portalui_treeNode){
			if (tmp.childs.getLength() != 0){
				this.copyChilds(tmp, child);
				this.treev.delItem(tmp);
			}				
		}	
	},
	moveItem: function(item, owner){	
		var tmp, child = new portalui_treeNode(owner);
		child.setKodeForm(item.getKodeForm());
		child.setKode(item.getKode());
		child.setCaption(item.getCaption());				
		child.setShowKode(item.showKode);					
		if (item.childs.getLength() != 0){
			tmp = new portalui_treeNode(this.treev);
			this.copyChilds(item, tmp);	
		}									
		if (tmp instanceof portalui_treeNode){
			if (tmp.childs.getLength() != 0)
			{				
				this.copyChilds(tmp, child);			
				this.treev.delItem(tmp);
			}				
		}		
		child.doSelect();
		this.treev.delItem(item);
	}
});
