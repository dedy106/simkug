window.app_saku_uat_transaksi_fHelp = function(owner)
{
	if (owner)
	{
		window.app_saku_uat_transaksi_fHelp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_uat_transaksi_fHelp";
		this.maximize();
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Help : Input", 0);
		
		uses("util_addOnLib;util_gridLib;portalui_richTextArea;server_util_arrayList");
		this.cb_menu = new portalui_saiCB(this,{bound:[20,1,200,20],caption:"Kode Menu",readOnly:false,mustCheck:false,tag:9});
		this.cb_form = new portalui_saiCBBL(this,{bound:[20,2,200,20],caption:"Kode Form",btnClick:[this,"doBtnClick"]});
		this.e_judul = new portalui_saiLabelEdit(this,{bound:[20,3,555,20],caption:"Judul"});
		this.pKet = new portalui_panel(this,{bound:[20,4,555,300],border:3,caption:"Keterangan"});
			this.mKet = new portalui_richTextArea(this.pKet,{bound:[0,20,553,278]});
			this.mKet.display();
			this.bCode = new portalui_imageButton(this.pKet,{bound:[530,2,16,16],image:"icon/dynpro/bGenLocal.png",click:[this,"doCodeClick"],hint:"Source Code(HTML)"});
		this.rearrangeChild(10, 23);		
		setTipeButton(tbSimpan);
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
window.app_saku_uat_transaksi_fHelp.extend(window.portalui_childForm);
window.app_saku_uat_transaksi_fHelp.implement({
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
					sql.add("insert into help (kode_menu,kode_form,judul,keterangan,kode_lokasi,nik_user,tgl_input ) values"+
						"('"+this.cb_menu.getText()+"','"+this.cb_form.getText()+"','"+this.e_judul.getText()+"','"+urlencode(this.mKet.getText(2))+
						"','"+this.app._lokasi+"','"+this.app._userLog+"',now())");
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
			case "simpan" :	this.simpan();
			break;
			case "simpancek" : this.simpan();			
			break;
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender === this.cb_form) 
			{   
			    this.standarLib.showListData(this, "Daftar Form",sender,undefined, 
											  "select a.kode_form,b.nama_form from menu a left join m_form b on a.kode_form=b.kode_form where a.kode_klp = '"+this.cb_menu.getText()+"' order by a.rowindex ",
											  "select count(a.kode_form) from menu a left join m_form b on a.kode_form=b.kode_form where a.kode_klp = '"+this.cb_menu.getText()+"' ",
											  ["a.kode_form","b.nama_form"],"and",["Kode Form","Nama Form"],false);
			}			
		}catch(e){
			systemAPI.alert(e);
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
	}
});