window.app_hrmis_admin_fBackup = function(owner)
{
	if (owner)
	{
		window.app_hrmis_admin_fBackup.prototype.parent.constructor.call(this, owner);
		this.className = "app_hrmis_admin_fBackup";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Backup Data", 8);	
		
		this.maximize();
		uses("portalui_saiCBBL");				
		
		if (this.app._userStatus !="A")
		{
			system.alert(this,"Anda tidak ada otoritas untuk mengakses form ini","Kontak administrator anda");
			this.app._mainForm.bTutup.click();
			return false;
		}	
		uses("portalui_saiGrid;util_dbLarge;util_standar;portalui_checkBox;portalui_pageControl;portalui_childPage;portalui_saiMemo");
		this.tp1 = new portalui_pageControl(this,{bound:[20,20,800,400]});
		this.p1 = new portalui_childPage(this.tp1,{caption:"Backup Table"});
		this.p2 = new portalui_childPage(this.tp1,{caption:"Backup from SQL "});
		this.p3 = new portalui_childPage(this.tp1,{caption:"Result"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,5,795,365],colCount:2,colTitle:["Table","Backup"],colWidth:[[0,1],[650,80]], colFormat:[[1],[cfBoolean]],
            change:[this,"doSgChange"]});		
	    this.m1 = new portalui_saiMemo(this.p2,{bound:[1,5,798,380],labelWidth:0});   
		this.sg2 = new portalui_saiGrid(this.p3,{bound:[1,5,795,365],colCount:3,colTitle:["Table","Size","Download"],colWidth:[[2,1,0],[80,50,600]], colFormat:[[2],[cfButton]],
            change:[this,"doSgChange"],click:[this,"doDownload"]});		
            
        this.cb1 = new portalui_checkBox(this.p1,{bound:[2,this.p1.height - 25,100,20],caption:"Backup All",click:[this,"doClick"]});
        this.dbLib = new util_dbLarge();
		this.dbLib.addListener(this);
		this.menuStr = "";
		
		this.standarLib = new util_standar();		
		setTipeButton(tbSimpan);						
		this.rowIndex = -1;
		this.setTabChildIndex();
		this.standarLib.clearByTag(this, [0], this.e0);				
		this.dbLib.getAllTablesA();
	}
};
window.app_hrmis_admin_fBackup.extend(window.portalui_childForm);
window.app_hrmis_admin_fBackup.implement({
    mainButtonClick:function(sender){
    	if (sender == this.app._mainForm.bClear)
    		system.confirm(this, "clear", "screen akan dibersihkan?","");
    	if (sender == this.app._mainForm.bExec)
    		system.confirm(this, "simpan", "Apa data sudah benar?","");
    	if (sender == this.app._mainForm.bEdit)
    		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");
    	if (sender == this.app._mainForm.bHapus)
    		system.confirm(this, "hapus", "Yakin data akan dihapus?","");
    },
    doRequestReady: function(sender, methodName, result){
    	switch (methodName)
    		{
    			case "execArraySQL" :
    				if (result.toLowerCase().search("error") == -1)
        					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
    				else this.app._mainForm.pesan(0, result); 
    			break;
     			case "getAllTables":    			 
         			var rs = result;
            		rs = rs.split(",");
            		this.sg1.clear();
            		for (var i in rs){		
            			this.sg1.appendData([rs[i],"false"]);        			
            		}
    			break;
    			case "backupTable":
    			     this.sg2.clear();
    			     eval("result = "+result+";");
    			     for (var i in result.files) this.sg2.appendData([result.files[i].filename,result.files[i].size,"<center>Download<center>"]);
    			     this.sg2.setCellColor(0,this.sg2.getRowCount()-1,"#ff9900");
    			     this.sg2.setCellColor(1,this.sg2.getRowCount()-1,"#ff9900");
    			     this.sg2.setCellColor(2,this.sg2.getRowCount()-1,"#ff9900");
    			     this.tp1.setActivePage(this.p3);
    			break;
				case "sqlBackup":
					alert(result);
				break;
    		}
    },
    doSgChange: function(sender, col, row){
	   if (this.sg1.cells(1,row) == "true") 
            this.sg1.setCellColor(1,row,"#00ff00");      
       else this.sg1.setCellColor(1,row, row % 2 == 0 ? system.getConfig("app.color.gridRowDiff"):system.getConfig("app.color.gridText"));      
    },
    doClick: function(sender){
        for (var i=0; i < this.sg1.getRowCount();i++) this.sg1.cells(1,i,sender.isSelected().toString());
    },
    doDownload: function(sender, col, row){
        window.open(sender.cells(0,row));
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
    						uses("server_util_arrayList");
                            var tableList = new server_util_arrayList();
                            if (this.tp1.activePage == this.p1.resourceId){
                                if (!this.cb1.isSelected()){ 						
            						for (var i =0; i < this.sg1.getRowCount();i++){
            						     if (this.sg1.cells(1,i) == "true") tableList.add(this.sg1.cells(0,i)); 
                                    }
                                }
        						this.dbLib.backupTable(tableList,this.cb1.isSelected(),this.app._lokasi);
    						}else if (this.tp1.activePage == this.p2.resourceId && this.m1.getText() != "" && trim(this.m1.getText()).toLowerCase().search("select") == 0){
 						         this.dbLib.sqlBackup(this.m1.getText());
                            }
    					}catch(e){
    						alert(e);
    					}
    				}
    				break;
    			
    		}
    	}catch(e)
    	{
    		alert(e);
    	}
    }
});
