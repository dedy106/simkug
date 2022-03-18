window.app_portal_trail_fViewDoc = function(owner)
{
	try
	{
		if (owner)
		{
			window.app_portal_trail_fViewDoc.prototype.parent.constructor.call(this, owner);
			this.className = "app_portal_trail_fViewDoc";			
			this.maximize();
			
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Audit Trail Dokumen", 2);
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			//uses("util_number",true);
	  		//this.numLib = new util_number();
	  		uses("util_gridLib",true);
	  		this.gridLib=new util_gridLib();
			
			this.p = new portalui_panel(this);
			this.p.setWidth(555);
			this.p.setLeft(20);
			this.p.setTop(5);
			this.p.setHeight(260);
			this.p.setBorder(3);
			this.p.setCaption("Jenis File");
			
			uses("portalui_mdGrid",true);
			this.mg1 = new portalui_mdGrid(this.p);
			this.mg1.setTop(20);
			this.mg1.setWidth(551);
			this.mg1.setLeft(1);
			this.mg1.setHeight(237);
			this.mg1.setColCount(2);
			this.mg1.setReadOnly(true);
			this.mg1.columns.get(0).setTitle("Kode");
			this.mg1.columns.get(0).setColWidth(100);
			this.mg1.columns.get(1).setTitle("Nama");
			this.mg1.columns.get(1).setColWidth(430);
			this.mg1.onExpand.set(this, "mgOnExpand");
			
			this.p_psn = new portalui_panel(this);
			this.p_psn.setLeft(20);
			this.p_psn.setTop(270);
			this.p_psn.setWidth(555);
			this.p_psn.setHeight(170);
			this.p_psn.setName('p1');
			this.p_psn.setBorder(3);
			this.p_psn.setCaption('Detail');
			uses("portalui_saiGrid",true);
			this.sg1_psn = new portalui_saiGrid(this.p_psn);
			this.sg1_psn.setLeft(1);
			this.sg1_psn.setTop(20);
			this.sg1_psn.setWidth(550);
			this.sg1_psn.setHeight(146);
			this.sg1_psn.setName('sg1mb');
			this.sg1_psn.setColCount(5);
			this.sg1_psn.setReadOnly(true);
			this.sg1_psn.setColTitle(new Array("No. File","Nama","Folder","Tipe","Size"));
			this.sg1_psn.setColWidth(new Array(4,3,2,1,0),new Array(100,100,100,100,125));
		}
	}catch(e)
	{
		alert("[app_portal_trail_fViewDoc]::contructor: "+e);
	}
};
window.app_portal_trail_fViewDoc.extend(window.portalui_childForm);
window.app_portal_trail_fViewDoc.prototype.mgOnExpand = function(sender)
{
	if (sender.owner == this.mg1)
	{
		var node = this.mg1.rows.get(sender.rowIndex);
		this.mg2 = new portalui_mdGrid(node);
		this.mg2.setName(sender.getCellValue(0));		
		this.mg2.setTop(0);
		this.mg2.setLeft(1);
		this.mg2.setWidth(505);
		this.mg2.setHeight(250);
		this.mg2.setColCount(4);
		this.mg2.columns.get(0).setTitle("No. Dokumen");
		this.mg2.columns.get(0).setColWidth(100);
		this.mg2.columns.get(1).setTitle("No. File");
		this.mg2.columns.get(1).setColWidth(100);
		this.mg2.columns.get(2).setTitle("Nama");
		this.mg2.columns.get(2).setColWidth(100);
		this.mg2.columns.get(3).setTitle("Keterangan");
		this.mg2.columns.get(3).setColWidth(200);
		this.mg2.onClick.set(this, "doDblClick");
		var doc=this.dbLib.loadQuery("select no_dok_file,no_file,nama,keterangan from portal_dokumen where kode_jenis='"+sender.getCellValue(0)+"'");
		if (doc != undefined)
		{
			var data=doc.split("\r\n");
			this.mg2.clear();
			for (var j in data)
			{
				if (j>0)
				{
					var isi2=data[j].split(";");
					this.mg2.appendRow(this.mg2);
					this.mg2.setCell(0,j-1,isi2[0]);
					this.mg2.setCell(1,j-1,isi2[1]);
					this.mg2.setCell(2,j-1,isi2[2]);
					this.mg2.setCell(3,j-1,isi2[3]);
				}
			}
		}
	}
};
window.app_portal_trail_fViewDoc.prototype.doDblClick = function(sender,col,row)
{
	try
	{
		var doc = this.dbLib.loadQuery("select no_file,nama,folder,tipe,size from portal_file "+
			"where no_file='"+sender.getCellValue(1)+"' ");
		if (doc != undefined)
		{
			var data=doc.split("\r\n");
			this.sg1_psn.clear();
			for (var j in data)
			{
				if (j>0)
				{
					var isi2=data[j].split(";");
					this.sg1_psn.appendRow();
					this.sg1_psn.setCell(0,j-1,isi2[0]);
					this.sg1_psn.setCell(1,j-1,isi2[1]);
					this.sg1_psn.setCell(2,j-1,"server/"+isi2[2]);
					this.sg1_psn.setCell(3,j-1,isi2[3]);
					this.sg1_psn.setCell(4,j-1,isi2[4]);
				}
			}
		}
	}catch(e)
	{
		system.alert(this, e,"");
	}
};
window.app_portal_trail_fViewDoc.prototype.execTrail = function()
{
	try
	{
		var temp = this.dbLib.loadQuery("select kode_jenis,nama from portal_jenis_file ");
		if (temp != undefined) 
		{
			var rs=temp.split("\r\n");
			this.mg1.clear();
			for (var i in rs)
			{
				if (i>0)
				{
					var isi=rs[i].split(";");
					this.mg1.appendRow(this.mg1);
					this.mg1.setCell(0,i-1,isi[0]);
					this.mg1.setCell(1,i-1,isi[1]);
					var node = this.mg1.rows.get(i-1);
					this.mg = new portalui_mdGrid(node);
					this.mg.setTop(0);
					this.mg.setLeft(1);
					this.mg.setHeight(270);
				}
			}
		}
    }catch(e)
	{
		alert("[app_portal_trail_fViewDoc]::execTrail:"+e);
	}
};
window.app_portal_trail_fViewDoc.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{
		}else
		{
			this.execTrail();
		}
    }catch(e)
	{
		alert("[app_portal_trail_fViewDoc]::mainButtonClick:"+e);
	}
};