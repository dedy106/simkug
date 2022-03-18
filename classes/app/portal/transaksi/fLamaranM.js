window.app_portal_transaksi_fLamaranM = function(owner)
{
	try
	{
		if (owner)
		{
			window.app_portal_transaksi_fLamaranM.prototype.parent.constructor.call(this, owner);
			this.className = "app_portal_transaksi_fLamaranM";			
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Monitoring Lamaran", 0);
			
			uses("portalui_saiCBBL",true);
			uses("portalui_saiGrid",true);
			uses("portalui_datePicker",true);
			uses("util_gridLib",true);
			this.gridLib = new util_gridLib();
			uses("util_standar",true);
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			
			this.lwg = new portalui_saiCBBL(this);
			this.lwg.setLeft(20);
			this.lwg.setTop(1);
			this.lwg.setWidth(230);
			this.lwg.setCaption("Lowongan");
			this.lwg.setReadOnly(false);
			this.lwg.onBtnClick.set(this, "FindBtnClick");
			this.lwg.onChange.set(this, "doEditChange");
			this.lwg.setRightLabelVisible(true);
			this.lTgl = new portalui_label(this);
			this.lTgl.setLeft(20);
			this.lTgl.setTop(2);
			this.lTgl.setWidth(100);
			this.lTgl.setHeight(18);
			this.lTgl.setUnderLine(true);
			this.lTgl.setCaption("Tanggal Akhir");
			this.tglend = new portalui_datePicker(this);
			this.tglend.setTop(2);
			this.tglend.setLeft(120);
			this.tglend.setWidth(82);
			this.bGen = new portalui_button(this);
			this.bGen.setLeft(20);
			this.bGen.setTop(3);
			this.bGen.setCaption("Tampil");
			this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bGen.onClick.set(this,"doGen");
			this.p_psn = new portalui_panel(this);
			this.p_psn.setLeft(20);
			this.p_psn.setTop(4);
			this.p_psn.setWidth(930);
			this.p_psn.setHeight(330);
			this.p_psn.setName('p1');
			this.p_psn.setBorder(3);
			this.p_psn.setCaption('Daftar Lamaran Masuk');
			this.sg1_psn = new portalui_saiGrid(this.p_psn);
			this.sg1_psn.setLeft(1);
			this.sg1_psn.setTop(20);
			this.sg1_psn.setWidth(926);
			this.sg1_psn.setHeight(306);
			this.sg1_psn.setName('sg1mb');
			this.sg1_psn.setColCount(7);
			this.sg1_psn.setReadOnly(false);
			this.sg1_psn.setColTitle(new Array("User ID","Nama","Alamat","Email","Status","Keterangan","File CV"));
			this.sg1_psn.setColWidth(new Array(6,5,4,3,2,1,0),
				new Array(100,200,100,100,200,100,100));
			this.sg1_psn.columns.get(4).setButtonStyle(bsAuto);
			this.sg1_psn.columns.get(4).pickList.set(0,"DITERIMA");
			this.sg1_psn.columns.get(4).pickList.set(1,"DITOLAK");
			this.sg1_psn.columns.get(4).pickList.set(2,"PROGRESS");
			this.sg1_psn.columns.get(0).setReadOnly(true);
			this.sg1_psn.columns.get(1).setReadOnly(true);
			this.sg1_psn.columns.get(2).setReadOnly(true);
			this.sg1_psn.columns.get(3).setReadOnly(true);
			this.sg1_psn.columns.get(4).setReadOnly(true);
			this.sg1_psn.columns.get(6).setReadOnly(true);
			
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
		}
	}catch(e)
	{
		alert("[app_portal_transaksi_fLamaranM]::contructor: "+e);
	}
};
window.app_portal_transaksi_fLamaranM.extend(window.portalui_childForm);
window.app_portal_transaksi_fLamaranM.prototype.mainButtonClick = function(sender)
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
window.app_portal_transaksi_fLamaranM.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.lwg);
				this.sg1_psn.clear();
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
			{
				try
				{
					uses("server_util_arrayList",true);
					var sql = new server_util_arrayList();
					for (var i=0; i<this.sg1_psn.rows.getLength(); i++)
					{
						if (this.sg1_psn.getCell(4,i)=="PROGRESS")
							var status="P";
						if (this.sg1_psn.getCell(4,i)=="DITOLAK")
							var status="R";
						if (this.sg1_psn.getCell(4,i)=="DITERIMA")
							var status="A";
						sql.add("update portal_pelamar_konten set status='"+status+
						"', keterangan='"+this.sg1_psn.getCell(5,i)+
						"' where nip='"+this.sg1_psn.getCell(0,i)+"' and kode_konten='"+this.lwg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					this.dbLib.execArraySQL(sql);	
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
	}
	this.lwg.setFocus();
};
window.app_portal_transaksi_fLamaranM.prototype.doGen = function(sender)
{
	if (sender == this.bGen)
	{
		var rs = this.dbLib.runSQL("select a.nip,a.nama,a.alamat,a.email,b.status,b.keterangan,a.dokumen "+
					"from portal_pelamar a inner join portal_pelamar_konten b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi "+
					"where b.kode_konten='"+this.lwg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
		if (rs instanceof portalui_arrayMap)
		{
			if (rs.get(0)!=undefined)
			{
				this.sg1_psn.clear();
				this.sg1_psn.showLoading();
				this.sg1_psn.setData(rs);
				this.sg1_psn.setColWidth(new Array(6,5,4,3,2,1,0),new Array(100,200,100,100,200,100,100));
				this.sg1_psn.columns.get(4).setButtonStyle(bsAuto);
				this.sg1_psn.columns.get(4).pickList.set(0,"DITERIMA");
				this.sg1_psn.columns.get(4).pickList.set(1,"DITOLAK");
				this.sg1_psn.columns.get(4).pickList.set(2,"PROGRESS");
				this.sg1_psn.columns.get(0).setReadOnly(true);
				this.sg1_psn.columns.get(1).setReadOnly(true);
				this.sg1_psn.columns.get(2).setReadOnly(true);
				this.sg1_psn.columns.get(3).setReadOnly(true);
				this.sg1_psn.columns.get(4).setReadOnly(true);
				this.sg1_psn.columns.get(6).setReadOnly(true);
			}
		}
		for (var k=0; k < this.sg1_psn.rows.getLength(); k++)
		{
			if (this.sg1_psn.getCell(4,k)=="P")
				this.sg1_psn.setCell(4,k,"PROGRESS");
			if (this.sg1_psn.getCell(4,k)=="A")
				this.sg1_psn.setCell(4,k,"DITERIMA");
			if (this.sg1_psn.getCell(4,k)=="R")
				this.sg1_psn.setCell(4,k,"DITOLAK");
			if (this.sg1_psn.getCell(6,k) != "-" && this.sg1_psn.getCell(6,k) != "")
			{
				this.sg1_psn.setCell(6,k,"<a href='server/media/"+this.sg1_psn.getCell(6,k)+"' target='_blank'>"+this.sg1_psn.getCell(6,k)+"</a>");
			}
		}
	}
};
window.app_portal_transaksi_fLamaranM.prototype.doEditChange = function(sender)
{
	if (this.lwg.getText() != "")
	{
		try
		{
			var data = this.dbLib.runSQL("select tanggal from portal_konten where kode_konten='"+this.lwg.getText()+"' ");
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					data = data.get(0);
					this.tglend.setDateString(data.get("tanggal"));
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_portal_transaksi_fLamaranM.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.lwg)
			this.standarLib.showListData(this, "Data Lowongan",sender,undefined,
										  "select kode_konten,judul from portal_konten where kode_klp='K05' and status_aktif='1' and status_front='1' and kode_lokasi='"+this.app._lokasi+"'",
										  "select count(*) from portal_konten where kode_klp='K05' and status_aktif='1' and status_front='1' and kode_lokasi='"+this.app._lokasi+"'",
										  ["kode_konten","judul"],"where",["Kode","Judul"]);
	}catch(e)
	{
		alert(e);
	}
};
window.app_portal_transaksi_fLamaranM.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"process completed ("+ this.lwg.getText()+")");
		              this.app._mainForm.bClear.click();              
		            }else system.info(this,result,"");
    			break;
    		}
	    }catch(e)
	    {
	       alert("step : "+step+"; error = "+e);
	    }
	}
};