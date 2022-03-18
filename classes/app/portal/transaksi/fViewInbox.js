window.app_portal_transaksi_fViewInbox = function(owner)
{
  if (owner)
	{
		window.app_portal_transaksi_fViewInbox.prototype.parent.constructor.call(this,owner);
		this.className  = "app_portal_transaksi_fViewInbox";
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
		uses("portalui_saiMemo",true);
		this.psn_i = new portalui_saiMemo(this);
		this.psn_i.setTop(190);
		this.psn_i.setLeft(10);
		this.psn_i.setWidth(629);
		this.psn_i.setHeight(200);
		this.psn_i.setLabelWidth(0);
		this.psn_i.setCaption("");		
		
		//this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var brg = this.dbLib.runSQL("select dari,subyek,date_format(tanggal,'%d-%m-%Y') as tgl,no_file_dok "+
				"from portal_pesan "+
				"where kepada='admin' ");
			if (brg instanceof portalui_arrayMap)
			{
				if (brg.get(0)!=undefined)
				{
					this.sg1_psn.clear();
					this.sg1_psn.showLoading();
					this.sg1_psn.setData(brg);										
					this.sg1_psn.setColWidth(new Array(3,2,1,0),new Array(100,100,225,175));
				}
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
			alert("[app_portal_transaksi_fViewInbox]->constructor : "+e);
		}
	}
};
window.app_portal_transaksi_fViewInbox.extend(window.portalui_childForm);
window.app_portal_transaksi_fViewInbox.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{
		if (sender == this.sg1_psn)
		{
			var data = this.dbLib.runSQL("select isi_pesan from portal_pesan "+
				"where dari='"+this.sg1_psn.getCell(0,row)+"' and subyek='"+this.sg1_psn.getCell(1,row)+"'");
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{
					data = data.get(0);
					this.psn_i.setText(data.get("isi_pesan"));
				}
			}
		}
	}catch(e)
	{
		system.alert(this, e,"");
	}
};
/*
window.app_portal_transaksi_fViewInbox.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data di form ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_portal_transaksi_fViewInbox.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.kpd);				
			}
			break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
			{
				try
				{
					var id=this.standarLib.noBuktiOtomatis(this.dbLib, "portal_pesan", "no_pesan", "PSN/"+this.getPeriodeNow()+"/","0000");
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("insert into portal_pesan (no_pesan,kode_lokasi,tanggal,dari, kepada,subyek,isi_pesan,flag_email,no_file_dok,tgl_input,flag_read,periode,nik_user,modul) values  "+
							"('"+id+"','"+this.app._lokasi+"','"+(new Date).getDateStr()+"','admin','"+this.kpd.getText()+"','"+this.subjek.getText()+"','"+this.pesan.getText()+"','0','"+this.attfile.getText()+"','"+(new Date).getDateStr()+"','0','"+this.getPeriodeNow()+"','"+this.app._userLog+"','SALES') ");
					this.dbLib.execArraySQL(sql);
					this.attfile.setText("-");
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
	}
	this.kpd.setFocus();
};
window.app_portal_transaksi_fViewInbox.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		try
		{   
			switch(methodName)
    		{
    			case "execArraySQL" :    				
    				step="info";
					if (result.toLowerCase().search("error") == -1)					
		            {
		              this.app._mainForm.pesan(2,"process completed ("+ this.kpd.getText()+")");
		              this.app._mainForm.bClear.click();              
		            }else system.info(this,result,"");
    				break;
    		}
	    }catch(e)
	    {
	       alert("step : "+step+"; error = "+e);
	    }
	}
}*/