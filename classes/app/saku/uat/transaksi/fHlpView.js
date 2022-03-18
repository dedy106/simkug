window.app_saku_uat_transaksi_fHlpView = function(owner)
{
	if (owner)
	{
		window.app_saku_uat_transaksi_fHlpView.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_uat_transaksi_fHlpView";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Help : View", 0);
		
		uses("util_addOnLib;util_gridLib;portalui_richTextArea;server_util_arrayList");
		this.cb_menu = new portalui_saiCB(this,{bound:[20,1,200,20],caption:"Kode Menu",readOnly:false,mustCheck:false,tag:9});
		this.bLoad = new portalui_imageButton(this,{bound:[222,1,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.pForm = new portalui_panel(this,{bound:[20,2,420,400],border:3,caption:"Form"});
		this.treev = new portalui_treeView(this.pForm,{bound:[0,20,420,380],childLength:1000,dblClick:[this,"treeClick"]});
		this.rearrangeChild(10, 23);
		this.pKet = new portalui_panel(this,{bound:[450,this.pForm.top,555,400],border:3,caption:"Keterangan"});
			this.mKet = new portalui_richTextArea(this.pKet,{bound:[0,20,553,378]});
			this.mKet.display();
			this.bCode = new portalui_imageButton(this.pKet,{bound:[530,2,16,16],image:"icon/dynpro/bGenLocal.png",click:[this,"doCodeClick"],hint:"Source Code(HTML)"});
			
		setTipeButton(tbAllFalse);
		this.setTabChildIndex();
		try
		{		    
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();
			this.idMenu = new Array();
		    this.addOnLib = new util_addOnLib();
			this.gridLib=new util_gridLib();
			
			var klp = this.dbLib.getDataProvider("select distinct kode_klp from menu");
			eval("klp= "+klp+";");
			if (klp.rs.rows[0] !== undefined){
				this.cb_menu.clearItem();
				for (var i in klp.rs.rows){
					this.cb_menu.addItem(i,klp.rs.rows[i].kode_klp);
				}
			}
			this.cb_menu.setText(this.app._kodeMenu);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_uat_transaksi_fHlpView.extend(window.portalui_childForm);
window.app_saku_uat_transaksi_fHlpView.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){
		try{
			if (this.standarLib.checkEmptyByTag(this, [0,1]))
			{
				try
				{
					var sql = new server_util_arrayList();
					sql.add("update help set judul='"+this.e_judul.getText()+"', keterangan= '"+urlencode(this.mKet.getText(2))+
						"' where kode_menu ='"+this.cb_menu.getText()+"' and kode_form='"+this.cb_form.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, new Array("0","1","2"),this.cb_menu);
					this.mKet.setText("");
				}
			break;
			case "ubah" : this.simpan();
			break;				
			case "hapus" :
				var sql = new server_util_arrayList();
				sql.add("delete from help where kode_menu ='"+this.cb_menu.getText()+"' and kode_form='"+this.cb_form.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
				this.dbLib.execArraySQL(sql);
			break;
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
							this.app._mainForm.bClear.click();
							this.mKet.setText("");
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e)
			{
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCodeClick: function(sender)
	{
		try{		
			this.mKet.toggleMode();			
			if (this.mKet.viewMode == 2){
				sender.setHint("Preview");
			}else sender.setHint("Source Code (HTML)");
		}catch(e){
			alert(e);
		}
	},
	doLoadClick: function(sender)
	{
		try{
			var nrc = this.dbLib.getDataProvider("select a.kode_menu,a.kode_form,concat(a.nama,' - ',ifnull(b.judul,'')) as nmjdl,a.level_menu "+
												"from menu a left join m_form c on a.kode_form=c.kode_form "+
												"left join help b on a.kode_form=b.kode_form and a.kode_klp=b.kode_menu "+
												"where a.kode_klp='"+this.cb_menu.getText()+"' order by rowindex",true);
			this.loadMenu(nrc.rs.rows);
		}catch(e){
			alert(e);
		}
	},
	loadMenu: function(dataMenu, str){
		try{					
			//this.block();
			this.app._mainForm.showProgress();
			if (str)
				var menu = dataMenu;//this.strToArray(dataMenu);
			else 
				var menu = dataMenu;//this.strToArray(this.menuStr);
			var rowNo = 0;
			
			var itemValues = undefined;
			if (this.treev != undefined)
				this.treev.clear();
				
			var kode = undefined;
			var nama = undefined;
			var kodeForm = undefined;
			var level = undefined;
			
			var node = undefined;					
			var len = menu.length;
			for (var r = 0;r < len;r++){
				if (str){
					itemValues = menu.get(r);			
					kode = itemValues.get(0);
					nama = itemValues.get(3);
					kodeForm = itemValues.get(1);
					level = itemValues.get(4);
				}else{
					itemValues = menu[r];			
					kode = itemValues.kode_menu;							
					nama = itemValues.nmjdl;
					kodeForm = itemValues.kode_form;
					level = itemValues.level_menu;
				}
				level++;
				if (node === undefined)
					node = new portalui_treeNode(this.treev);										
				else if (node.getLevel() == level - 1)
					node = new portalui_treeNode(node);					
				else if ((node.getLevel() == level))
					node = new portalui_treeNode(node.owner);															
				else if (node.getLevel() > level){	
					node = node.owner;
					while (node.getLevel() > level)
					    if (node.owner instanceof portalui_treeNode)
							node = node.owner;						
					node = new portalui_treeNode(node.owner);					
				}		
				node.setKodeForm(kodeForm);
				node.setKode(kode);
				node.setCaption(nama);
			}
			this.app._mainForm.hideProgress();			
			//this.unblock();
		}catch(e){
			//this.unblock();
			//this.childBlock.hide();
			systemAPI.alert("[fMain]::loadMenu : " + itemValues +" ",e);
		}
	},
	treeClick: function(item){
		try{
			var kodeForm = item.getKodeForm().toUpperCase();
			var ket = this.dbLib.getDataProvider("select keterangan from help where kode_form='"+kodeForm+"'",true);
			if (ket.rs.rows[0] !== undefined)
				this.mKet.setText(urldecode(ket.rs.rows[0].keterangan));
			else this.mKet.setText("");
		}catch(e){
			systemAPI.alert("[fMain]::treeClick : " + e,"Error Class ::"+temp);
		}
	}
});