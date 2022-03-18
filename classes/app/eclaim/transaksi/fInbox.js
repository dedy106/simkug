window.app_eclaim_transaksi_fInbox = function(owner)
{
  if (owner)
	{
		window.app_eclaim_transaksi_fInbox.prototype.parent.constructor.call(this,owner);
		this.className  = "app_eclaim_transaksi_fInbox";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Inbox");
		
		this.p_psn = new portalui_panel(this);
		this.p_psn.setLeft(10);
		this.p_psn.setTop(10);
		this.p_psn.setWidth(630);
		this.p_psn.setHeight(170);
		this.p_psn.setName('p1');
		this.p_psn.setBorder(3);
		this.p_psn.setCaption('Daftar Pesan');
		uses("portalui_saiGrid",true);
		this.sg1_psn = new portalui_saiGrid(this.p_psn);
		this.sg1_psn.setLeft(1);
		this.sg1_psn.setTop(20);
		this.sg1_psn.setWidth(625);
		this.sg1_psn.setHeight(146);
		this.sg1_psn.setName('sg1mb');
		this.sg1_psn.setColCount(4);
		this.sg1_psn.setReadOnly(true);
		this.sg1_psn.setColTitle(new Array("Dari","Subyek","Tanggal","Attachment"));
		this.sg1_psn.setColWidth(new Array(3,2,1,0),new Array(100,100,225,175));
		this.sg1_psn.onDblClick.set(this, "sg1onDblClick");		
		this.psn_i = new portalui_control(this,{bound:[10,190,629,200]});		
		this.psn_i.addStyle("border:1px solid #999999");
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var brg = this.dbLib.getDataProvider("select dari,subyek,date_format(tanggal,'%d-%m-%Y') as tgl,no_file_dok "+
				"from eclaim_pesan where kepada='"+this.app._userLog+"' order by tanggal asc");				
			eval("brg="+brg+";");
			if (typeof brg != "string")
			{				
				this.sg1_psn.clear();
				for (var i in brg.rs.rows){
					line = brg.rs.rows[i];
					this.sg1_psn.appendData([line.dari, line.subyek, line.tgl, line.no_file_dok]);
				}								
				this.sg1_psn.setColWidth(new Array(3,2,1,0),new Array(100,100,225,175));
			}
			for (var k=0; k < this.sg1_psn.rows.getLength(); k++)
			{
				if (this.sg1_psn.getCell(3,k) != "-" && this.sg1_psn.getCell(3,k) != "")
				{
					this.sg1_psn.setCell(3,k,"<a href='server/media/"+this.sg1_psn.getCell(3,k)+"' target='_blank'>"+this.sg1_psn.getCell(3,k)+"</a>");
				}
			}
		}catch(e)
		{
			alert("[app_eclaim_transaksi_fInbox]->constructor : "+e);
		}
	}
};
window.app_eclaim_transaksi_fInbox.extend(window.portalui_childForm);
window.app_eclaim_transaksi_fInbox.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{
		if (sender == this.sg1_psn)
		{
			var data = this.dbLib.runSQL("select isi_pesan from eclaim_pesan "+
				"where dari='"+this.sg1_psn.getCell(0,row)+"' and subyek='"+this.sg1_psn.getCell(1,row)+"'");
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{
					data = data.get(0);
					this.psn_i.getCanvas().innerHTML = data.get("isi_pesan");
				}
			}
		}
	}catch(e)
	{
		system.alert(this, e,"");
	}
};