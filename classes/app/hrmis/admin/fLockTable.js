window.app_hrmis_admin_fLockTable = function(owner)
{
	if (owner)
	{
		window.app_hrmis_admin_fLockTable.prototype.parent.constructor.call(this, owner);
		this.className = "app_hrmis_admin_fLockTable";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Set Table To Lock", 0);	
		
		this.maximize();
		uses("portalui_saiCBBL");				
		
		if (this.app._userStatus !="A")
		{
			system.alert(this,"Anda tidak ada otoritas untuk mengakses form ini","Kontak administrator anda");
			this.app._mainForm.bTutup.click();
			return false;
		}	
		this.p1 = new portalui_panel(this,{bound:[20,20,500,400],caption:"Data Table"});
		uses("portalui_saiGrid;util_dbLib;util_standar");
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,25,498,345],colCount:2,colTitle:["Table","Lock"],colWidth:[[0,1],[250,80]], change:[this,"doSgChange"]});
		this.sg1.columns.get(1).setButtonStyle(bsAuto);
		this.sg1.columns.get(1).pickList.set(0,"0");
		this.sg1.columns.get(1).pickList.set(1,"1");
	
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.menuStr = "";
		
		this.standarLib = new util_standar();		
		setTipeButton(tbSimpan);						
		this.rowIndex = -1;
		this.setTabChildIndex();
		this.standarLib.clearByTag(this, [0], this.e0);				
		this.dbLib.getDataProviderA("select nm_table, status from locktable order by nm_table");				
	}
};
window.app_hrmis_admin_fLockTable.extend(window.portalui_childForm);
window.app_hrmis_admin_fLockTable.implement({
    mainButtonClick:function(sender){
    	if (sender == this.app._mainForm.bClear)
    		system.confirm(this, "clear", "screen akan dibersihkan?","");
    	if (sender == this.app._mainForm.bSimpan)
    		system.confirm(this, "simpan", "Apa data sudah benar?","");
    	if (sender == this.app._mainForm.bEdit)
    		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");
    	if (sender == this.app._mainForm.bHapus)
    		system.confirm(this, "hapus", "Yakin data akan dihapus?","");
    },
    doRequestReady: function(sender, methodName, result){
    	switch (methodName)
    		{
    			case "listData" : 				
    				this.menuStr = result;
    				this.loadMenu();
    				break;
    			case "execArraySQL" :
    				if (result.toLowerCase().search("error") == -1)
        					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
    				else this.app._mainForm.pesan(0, result); 
    			break;
     			case "getDataProvider":     			        		
    			 eval("this.allTable = "+result);
                 if (typeof this.allTable != "string"){
        			var line, tmp = new portalui_arrayMap();			
        			for (var i in this.allTable.rs.rows){				
      					line = this.allTable.rs.rows[i];
      					tmp.set(line.nm_table,line.status);    				
        			}						
        			this.allTable = tmp.getArray();			
        		}else this.allTable =undefined;			
        		var rs = this.dbLib.getAllTables();
        		rs = rs.split(",");
        		this.sg1.clear();
        		for (var i in rs){		
        			eval("var status = this.allTable == undefined ? '0': (this.allTable."+rs[i]+") ? (this.allTable."+rs[i]+") : '0'");
        			this.sg1.appendData([rs[i],status]);        			
        		}
        		for (var i=0;i < this.sg1.getRowCount();i++){
        		   if (this.sg1.cells(1,i) == "1") this.sg1.setCellColor(1,i,"#ff0000");
                }
    			break;
    		}
    },
    doSgChange: function(sender, col, row){
	   if (this.sg1.cells(1,row) == "1") this.sg1.setCellColor(1,row,"#ff0000");      
    },
    doModalResult : function(event, modalResult, value){
    	try
    	{
    		switch (event)
    		{
    			case "clear" :
    				if (modalResult == mrOk){
    					this.e0.clear();
    				}
    				break;
    			case "simpan" :
    				if (modalResult == mrOk)
    				{
    					try{
    						var script = "";
    						var first = true; 
    						sql = new server_util_arrayList();
    						sql.add("delete from locktable");
    						if (this.app._dbEng == "mysqlt"){
    							script = "insert into locktable (nm_table, status, user_id, tgl_modified) values";
    							for (var i in this.sg1.rows.objList){							
    								if (!first) script += ",";
    								script += "('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"','"+this.app._userLog+"',now())";
    								first = false;														
    							}	
    						}else{
    							for (var i in this.sg1.rows.objList){							
    								if (!first) script += ",";
    								script += "insert into locktable (nm_table, status, user_id, tgl_modified) values('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"','"+this.app._userLog+"',getDate());go;";
    								first = false;														
    							}
    						}
    						sql.add(script);
    						this.dbLib.execArraySQL(sql);
    					}
    					catch(e)
    					{
    						system.alert(e);
    					}
    	
    	
    				}
    				break;
    			
    		}
    	}catch(e)
    	{
    		alert("[fNeraca]::doModalResult:"+e);
    	}
    }
});
