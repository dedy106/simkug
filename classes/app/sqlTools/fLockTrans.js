window.app_sqlTools_fLockTrans = function(owner)
{
	if (owner)
	{
		window.app_sqlTools_fLockTrans.prototype.parent.constructor.call(this, owner);
		this.className = "app_sqlTools_fLockTrans";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Set Lock/Unlock All Transactions", 8);	
		
		this.maximize();
		uses("portalui_saiCBBL");
		uses("util_dbLib");
		
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
		this.p1.setCaption("Data Lokasi");
		
		uses("portalui_saiSG");
		this.sg1 = new portalui_saiSG(this.p1);
		this.sg1.setTop(25);
		this.sg1.setLeft(0);
		this.sg1.setHeight(345);
		this.sg1.setWidth(500);
		this.sg1.setColCount(3);
		this.sg1.setColTitle(new Array("Lokasi","Nama Lokasi","Lock"));
		this.sg1.setColWidth(new Array(0,1,2),new Array(80,250,80));
		this.sg1.columns.get(2).setButtonStyle(bsAuto);
		this.sg1.columns.get(2).pickList.set(0,"0");
		this.sg1.columns.get(2).pickList.set(1,"1");
					
		this.btn = new portalui_button(this.p1);
		this.btn.setTop(375);
		this.btn.setLeft(20);	
		this.btn.setCaption("Lock All");
		this.btn.setIcon("url(icon/"+system.getThemes()+"/lock.png)");
		this.btn.onClick.set(this,"doClick");
		
		this.btn2 = new portalui_button(this.p1);
		this.btn2.setTop(375);
		this.btn2.setLeft(100);	
		this.btn2.setCaption("Unlock All");
		this.btn2.setIcon("url(icon/"+system.getThemes()+"/unlock.png)");
		this.btn2.onClick.set(this,"doClick");
		
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
		
		var isnull = this.app._dbEng == "mysqlt"? "ifnull":"isnull";
		this.locktrans = this.dbLib.loadQuery("select a.kode_lokasi, a.nama, "+isnull+"(b.status,'0') as status "+
				"from lokasi a left outer join locktrans b on b.kode_lokasi = a.kode_lokasi order by a.kode_lokasi");			
		if (this.locktrans != "" && this.locktrans.search("\r\n") != -1){
			this.locktrans = this.locktrans.split("\r\n");			
			var line, tmp = new portalui_arrayMap();			
			this.sg1.clear();
			for (var i=0;i < this.locktrans.length;i++){				
				if (i > 0){
					line = this.locktrans[i].split(";");															
					tmp.set(line[0],line[1],line[2]);
					this.sg1.appendData(new Array(line[0],line[1],line[2]));
				}								
			}						
			this.locktrans = tmp.getArray();			
		}else this.locktrans =undefined;			
		
	}
}

window.app_sqlTools_fLockTrans.extend(window.portalui_childForm);

window.app_sqlTools_fLockTrans.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","");
	}
	if (sender == this.app._mainForm.bSimpan || sender == this.app._mainForm.bExec)
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

window.app_sqlTools_fLockTrans.prototype.doRequestReady = function(sender, methodName, result)
{

	switch (methodName)
		{			
			case "execArraySQL" :
				if (result.toLowerCase().search("error") == -1)
					this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
				else this.app._mainForm.pesan(0, result); 
				break;
		}
}
window.app_sqlTools_fLockTrans.prototype.doModalResult = function(event, modalResult, value)
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
						sql.add("delete from locktrans");
						if (this.app._dbEng == "mysqlt"){
							script = "insert into locktrans (kode_lokasi, status, user_id, tgl_modified) values";
							for (var i in this.sg1.rows.objList){							
								if (!first) script += ",";
								script += "('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.app._userLog+"',now())";
								first = false;														
							}	
						}else{
							for (var i in this.sg1.rows.objList){							
								if (!first) script += ",";
								script += "insert into locktrans (kode_lokasi, status, user_id, tgl_modified) values('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.app._userLog+"',getDate());go;";
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
window.app_sqlTools_fLockTrans.prototype.doClick = function(sender)
{
	if (sender == this.btn){
		for (var i = 0;i < this.sg1.getRowCount();i++)
			this.sg1.setCell(2,i,'1');	
	}else if (sender == this.btn2)
		for (var i = 0;i < this.sg1.getRowCount();i++)
			this.sg1.setCell(2,i,'0');	
}