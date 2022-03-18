window.GUI_tools_fLockTable = function(owner)
{
	if (owner)
	{
		window.GUI_tools_fLockTable.prototype.parent.constructor.call(this, owner);
		this.className = "GUI_tools_fLockTable";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Set Table To Lock", 0);	
		
		this.maximize();
		uses("controls_saiCBBL");				
		
		if (this.app._userStatus !="A")
		{
			system.alert(this,"Anda tidak ada otoritas untuk mengakses form ini","Kontak administrator anda");
			this.app._mainForm.bTutup.click();
			return false;
		}	
		this.p1 = new portalui_panel(this);
		this.p1.setTop(20);
		this.p1.setLeft(20);
		this.p1.setWidth(500);
		this.p1.setHeight(400);
		this.p1.setCaption("Data Table");
		
		uses("portalui_saiSG");
		this.sg1 = new portalui_saiSG(this.p1);
		this.sg1.setTop(25);
		this.sg1.setLeft(0);
		this.sg1.setHeight(345);
		this.sg1.setWidth(500);
		this.sg1.setColCount(2);
		this.sg1.setColTitle(new Array("Table","Lock"));
		this.sg1.setColWidth(new Array(0,1),new Array(250,80));
		this.sg1.columns.get(1).setButtonStyle(bsAuto);
		this.sg1.columns.get(1).pickList.set(0,"0");
		this.sg1.columns.get(1).pickList.set(1,"1");
		
		uses("util_dbLib");		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.menuStr = "";
		
		uses("util_standar");
		this.standarLib = new util_standar();
		
		setTipeButton(tbSimpan);				
		
		this.rowIndex = -1;
		this.setTabChildIndex();
		this.standarLib.clearByTag(this, new Array("0"), this.e0);		
		
		this.allTable = this.dbLib.loadQuery("select nm_table, status from locktable order by nm_table");		
		if (this.allTable != "" && this.allTable.search("\r\n") != -1){
			this.allTable = this.allTable.split("\r\n");			
			var line, tmp = new portalui_arrayMap();			
			for (var i=0;i < this.allTable.length;i++){				
				if (i > 0){
					line = this.allTable[i].split(";");															
					tmp.set(line[0],line[1]);
				}								
			}						
			this.allTable = tmp.getArray();			
		}else this.allTable =undefined;			
		var rs = this.dbLib.getAllTables();
		rs = rs.split(",");
		this.sg1.clear();
		for (var i in rs){		
			eval("var status = this.allTable == undefined ? '0':this.allTable."+rs[i]);
			this.sg1.appendData(new Array(rs[i],status));
		}
	}
}

window.app_sqlTools_fLockTable.extend(window.portalui_childForm);

window.app_sqlTools_fLockTable.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","");
	}
}

window.app_sqlTools_fLockTable.prototype.doRequestReady = function(sender, methodName, result)
{

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
		}
}
window.app_sqlTools_fLockTable.prototype.doModalResult = function(event, modalResult, value)
{
	try
	{
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
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
