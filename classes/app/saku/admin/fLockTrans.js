window.app_saku_admin_fLockTrans = function(owner){
	if (owner){
		window.app_saku_admin_fLockTrans.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku_admin_fLockTrans";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Set Lock/Unlock All Transactions", 8);			
		this.maximize();
		uses("portalui_saiCBBL;portalui_saiGrid;util_standar");	
		if (this.app._userStatus !="A")
		{
			system.alert(this,"Anda tidak ada otoritas untuk mengakses form ini","Kontak administrator anda");
			this.app._mainForm.bTutup.click();
			return false;
		}	
		this.p1 = new portalui_panel(this,{bound:[20,20,500,400],caption:"Data Lokasi"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,25,this.p1.width-2,345],colCount:3,colTitle:["Lokasi","Nama Lokasi","Lock"],
            colWidth:[[0,1,2],[80,250,80]],buttonStyle:[[2],[bsAuto]]});
		this.sg1.columns.get(2).pickList.set(0,"0");
		this.sg1.columns.get(2).pickList.set(1,"1");					
		this.btn = new portalui_button(this.p1,{bound:[10,375,80,20],caption:"Lock All",icon:"url(icon/"+system.getThemes()+"/lock.png)",click:[this,"doClick"]});
		this.btn2 = new portalui_button(this.p1,{bound:[100,375,80,20],caption:"Unlock All",icon:"url(icon/"+system.getThemes()+"/unlock.png)",click:[this,"doClick"]});
		this.dbLib = new util_dbUtility();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();		
		setTipeButton(tbSimpan);						
		this.rowIndex = -1;
		this.setTabChildIndex();
		this.standarLib.clearByTag(this, [0], this.e0);				
		var isnull = this.app._dbEng == "mysqlt"? "ifnull":"isnull";
		this.dbLib.getDataProviderA("select a.kode_lokasi, a.nama, "+isnull+"(b.status,'0') as status "+
				"from lokasi a left outer join locktrans b on b.kode_lokasi = a.kode_lokasi order by a.kode_lokasi");					
		
	}
};
window.app_saku_admin_fLockTrans.extend(window.portalui_childForm);
window.app_saku_admin_fLockTrans.implement({
    mainButtonClick: function(sender){
    	if (sender == this.app._mainForm.bClear)
    		system.confirm(this, "clear", "screen akan dibersihkan?","");
    	else if (sender == this.app._mainForm.bSimpan || sender == this.app._mainForm.bExec)
    		system.confirm(this, "simpan", "Apa data sudah benar?","");
    	else if (sender == this.app._mainForm.bEdit)
    		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");
    	else  if (sender == this.app._mainForm.bHapus)
    		system.confirm(this, "hapus", "Yakin data akan dihapus?","");
    },
    doRequestReady: function(sender, methodName, result){
    	switch (methodName)
		{			
			case "getDataProvider":
			     eval("this.locktrans = "+result);
			     if (typeof this.locktrans != "string"){
        			this.locktrans = this.locktrans.rs.rows;			
        			var line, tmp = new portalui_arrayMap();			
        			this.sg1.clear();
        			for (var i in this.locktrans){				
                        line = this.locktrans[i];
       					tmp.set(line.kode_lokasi,[line.kode_lokasi, line.nama, line.status]);
       					this.sg1.appendData([line.kode_lokasi, line.nama, line.status]);        				
        			}						
        			this.locktrans = tmp.getArray();			
        		}else this.locktrans =undefined;			
			break;
            case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
				else this.app._mainForm.pesan(0, result); 
				break;
		}
    },
    doModalResult :function(event, modalResult, value){
    	try{
    		switch (event){
    			case "clear" :
    				if (modalResult == mrOk)
    					this.e0.clear();
    				break;
    			case "simpan" :
    				if (modalResult == mrOk)
    				{
    					try{
    						var script = "";
    						var first = true; 
    						sql = new server_util_arrayList();
    						sql.add("delete from locktrans");
    						if (this.app._dbEng == "mysqlt"){
    							script = "insert into locktrans (kode_lokasi, status, user_id, tgl_modified) values";
    							for (var i in this.sg1.rows.objList){							
    								if (!first) script += ",";
    								script += "('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.app._userLog+"',now())";
    								first = false;														
    							}	
								sql.add(script);
    						}else{
    							for (var i in this.sg1.rows.objList){							    								
    								sql.add("insert into locktrans (kode_lokasi, status, user_id, tgl_modified) values('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.app._userLog+"',getDate())");    									
    							}
    						}    						
    						this.dbLib.execArraySQL(sql);
    					}catch(e){
    						system.alert(e);
    					}		
    				}
    				break;
    			
    		}
    	}catch(e){
    		systemAPI.alert(this+"$doModalResult()",e);
    	}
    },
    doClick : function(sender){
    	if (sender == this.btn){
    		for (var i = 0;i < this.sg1.getRowCount();i++)
    			this.sg1.setCell(2,i,'1');	
    	}else if (sender == this.btn2)
    		for (var i = 0;i < this.sg1.getRowCount();i++)
    			this.sg1.setCell(2,i,'0');	
    }
});
