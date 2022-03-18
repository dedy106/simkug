window.app_saku_gl_master_fAkunkonsol = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_master_fAkunkonsol.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_master_fAkunkonsol";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Mapping Akun Konsolidasi", 0);	
		
		uses("portalui_saiCBBL");
		this.ed_kode = new portalui_saiCBBL(this);
		this.ed_kode.setLeft(20);
		this.ed_kode.setTop(10);
		this.ed_kode.setWidth(185);
		this.ed_kode.setCaption("Lokasi Konsolidasi");
		this.ed_kode.setText("");
		this.ed_kode.setReadOnly(false);
		this.ed_kode.setLabelWidth(100);
		this.ed_kode.setRightLabelVisible(true);
		this.ed_kode.setRightLabelCaption("");
		
		this.cb_akun = new portalui_saiCBBL(this);
		this.cb_akun.setLeft(20);
		this.cb_akun.setTop(32);
		this.cb_akun.setWidth(185);
		this.cb_akun.setCaption("Akun Konsolidasi");
		this.cb_akun.setText("");
		this.cb_akun.setReadOnly(false);
		this.cb_akun.setRightLabelCaption("");
		this.cb_akun.setRightLabelVisible(true);
		
		this.cb_lokasi = new portalui_saiCBBL(this);
		this.cb_lokasi.setLeft(20);
		this.cb_lokasi.setTop(54);
		this.cb_lokasi.setWidth(185);
		this.cb_lokasi.setCaption("Lokasi");
		this.cb_lokasi.setText("");
		this.cb_lokasi.setReadOnly(false);
		this.cb_lokasi.setRightLabelCaption("");
		this.cb_lokasi.setRightLabelVisible(true);
		
		uses("portalui_label");
		this.lblTgl1 = new portalui_label(this);
		this.lblTgl1.setTop(76);
		this.lblTgl1.setLeft(20);
		this.lblTgl1.setWidth(101);		
		this.lblTgl1.setHeight(20);		
		this.lblTgl1.setCaption("Tanggal Awal");
		this.lblTgl1.setUnderLine(true);
		
		uses("portalui_datePicker");	
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(78);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(82);
		
		this.lblTgl2 = new portalui_label(this);
		this.lblTgl2.setTop(76);
		this.lblTgl2.setLeft(300);
		this.lblTgl2.setWidth(101);		
		this.lblTgl2.setHeight(20);		
		this.lblTgl2.setCaption("Tanggal Akhir");
		this.lblTgl2.setUnderLine(true);
	
		this.dp_tgl2 = new portalui_datePicker(this);
		this.dp_tgl2.setTop(78);
		this.dp_tgl2.setLeft(378);
		this.dp_tgl2.setWidth(82);
		
		this.p1 = new portalui_panel(this);
		this.p1.setTop(100);
		this.p1.setWidth(450);
		this.p1.setLeft(10);
		this.p1.setHeight(300);
		this.p1.setCaption("Akun yang belum terelasi");
		
		uses("portalui_saiGrid",true);
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(445);
		this.sg1.setHeight(275);
		this.sg1.setColCount(2);
		this.sg1.setColTitle(new Array("Kode Akun","Nama Akun"));
		this.sg1.setColWidth(new Array(1,0),new Array(315,100));	
		this.sg1.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg1.columns.get(1).setReadOnly(true);	
				
		this.p2 = new portalui_panel(this);
		this.p2.setTop(100);
		this.p2.setWidth(450);
		this.p2.setLeft(540);
		this.p2.setHeight(300);
		this.p2.setCaption("Akun yang telah terelasi");
				
		this.sg2 = new portalui_saiGrid(this.p2);
		this.sg2.setTop(20);
		this.sg2.setLeft(1);
		this.sg2.setWidth(445);
		this.sg2.setHeight(275);
		this.sg2.setColCount(2);
		this.sg2.setColTitle(new Array("Kode Akun","Nama Akun"));
		this.sg2.setColWidth(new Array(1,0),new Array(315,100));	
		//this.sg2.columns.get(0).setButtonStyle(window.bsEllips);
		this.sg2.columns.get(1).setReadOnly(true);	
		
		
		this.refreshBtn = new portalui_button(this);
		this.refreshBtn.setTop(100);
		this.refreshBtn.setLeft(465);
		//this.refreshBtn.setHeight(21);
		//this.refreshBtn.setWidth(21);
		this.refreshBtn.setCaption("Reload");
		this.refreshBtn.setIcon("url(icon/"+system.getThemes()+"/refresh.png)");
		this.refreshBtn.setHint("Reload");
		this.refreshBtn.onClick.set(this, "entriesClick");			
		
		this.rightBtn = new portalui_button(this);
		this.rightBtn.setTop(190);
		this.rightBtn.setLeft(465);
		//this.rightBtn.setHeight(21);
		//this.rightBtn.setWidth(21);
		this.rightBtn.setCaption(">");
		this.rightBtn.setIcon("icon/"+system.getThemes()+"/bright.png");
		this.rightBtn.setHint("Move Right");
		this.rightBtn.onClick.set(this, "entriesClick");			
		
		this.leftBtn = new portalui_button(this);
		this.leftBtn.setTop(250);
		this.leftBtn.setLeft(465);
		//this.leftBtn.setWidth(22);
		//this.leftBtn.setHeight(22);
		this.leftBtn.setCaption("<");
		this.leftBtn.setIcon("icon/"+system.getThemes()+"/bleft.png");
		this.leftBtn.setHint("Move Right");
		this.leftBtn.onClick.set(this,"entriesClick");
		
		
		this.lblLast = new portalui_label(this);
		this.lblLast.setTop(990);
		this.lblLast.setCaption("");
		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			
			this.ed_kode.onChange.set(this, "doEditChange");
			this.ed_kode.onBtnClick.set(this, "FindBtnClick");
			this.cb_lokasi.onChange.set(this, "doEditChange");
			this.cb_lokasi.onBtnClick.set(this, "FindBtnClick");
			this.cb_akun.onChange.set(this, "doEditChange");
			this.cb_akun.onBtnClick.set(this, "FindBtnClick");
			this.sg1.clear(); this.sg1.appendRow(); 
			this.sg2.clear(); this.sg2.appendRow(); 
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_gl_master_fAkunkonsol.extend(window.portalui_childForm);
window.app_saku_gl_master_fAkunkonsol.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
};
window.app_saku_gl_master_fAkunkonsol.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.ed_kode);	
				this.sg1.clear(); this.sg1.appendRow();
				this.sg2.clear(); this.sg2.appendRow(); 
			}
			break;
			
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from konsol_relasi where kode_lokkonsol = '"+this.ed_kode.getText()+"' and akun_konsol = '"+this.cb_akun.getText()+"' and tgl_awal = '"+this.dp_tgl1.getDateString()+"' and tgl_akhir = '"+this.dp_tgl2.getDateString()+"'");
					if (this.app._dbEng == "mysqlt"){												
						var script = "insert into konsol_relasi(kode_lokkonsol, akun_konsol, kode_akun, kode_lokasi, tgl_awal, tgl_akhir)values";
						var first = true;
						for (var i=0; i < this.sg2.rows.getLength(); i++)
						{
							if (first){
								script += "('"+this.ed_kode.getText()+"','"+this.cb_akun.getText()+"','"+this.sg2.getCell(0,i)+"','"+this.cb_lokasi.getText()+"','"+this.dp_tgl1.getDateString()+"','"+this.dp_tgl2.getDateString()+"' )";
								first = false;								
							}else {
								script += ",('"+this.ed_kode.getText()+"','"+this.cb_akun.getText()+"','"+this.sg2.getCell(0,i)+"','"+this.cb_lokasi.getText()+"','"+this.dp_tgl1.getDateString()+"','"+this.dp_tgl2.getDateString()+"' )";
							}
						}						
						sql.add(script);
					}else{
						var script;
						var first = true;
						for (var i=0; i < this.sg2.rows.getLength(); i++)
						{
							script = "insert into konsol_relasi(kode_lokkonsol, akun_konsol, kode_akun, kode_lokasi, tgl_awal, tgl_akhir)values";
							script += ",('"+this.ed_kode.getText()+"','"+this.cb_akun.getText()+"','"+this.sg2.getCell(0,i)+"','"+this.cb_lokasi.getText()+"','"+this.dp_tgl1.getDateString()+"','"+this.dp_tgl2.getDateString()+"' )";							
							sql.add(script);
						}												
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
	this.ed_kode.setFocus();
};
window.app_saku_gl_master_fAkunkonsol.prototype.doEditChange = function(sender)
{
};											  
window.app_saku_gl_master_fAkunkonsol.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		if (sender == this.ed_kode) 
		{
			this.standarLib.showListData(this, "Data Lokasi Konsolidasi",this.ed_kode,undefined, 
										  "select kode_lokasi, nama  from lokasi where flag_konsol = '1'",
										  "select count(kode_lokasi) from lokasi where flag_konsol = '1'",
										  new Array("kode_lokasi","nama"),"and",new Array("Kode Lokasi","Deskripsi"),false);
		}
		if (sender == this.cb_akun) 
		{
			this.standarLib.showListData(this, "Data Akun Konsolidasi",this.cb_akun,undefined, 
										  "select kode_akun, nama  from masakun where kode_lokasi = '"+this.ed_kode.getText()+"'",
										  "select count(kode_akun) from masakun where kode_lokasi = '"+this.ed_kode.getText()+"'",
										  new Array("kode_akun","nama"),"and",new Array("Kode Akun","Deskripsi"),false);
		}
		if (sender == this.cb_lokasi) 
		{
			this.standarLib.showListData(this, "Data Akun Konsolidasi",this.cb_lokasi,undefined, 
										  "select kode_lokasi, nama  from lokasi where kode_lokkonsol = '"+this.ed_kode.getText()+"'",
										  "select count(kode_lokasi) from masakun where kode_lokkonsol = '"+this.ed_kode.getText()+"'",
										  new Array("kode_lokasi","nama"),"and",new Array("Kode Lokasi","Deskripsi"),false);
		}
	}catch(e)
	{
		system.alert(this,e,"");
	}
};
window.app_saku_gl_master_fAkunkonsol.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"Proses Lengkap (relasi akun konsolidasi: "+ this.ed_kode.getText()+" tersimpan.)");
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
window.app_saku_gl_master_fAkunkonsol.prototype.entriesClick = function(sender, col, row)
{
	if (sender == this.rightBtn)
	{			
		this.sg2.appendData(new Array(this.sg1.getCell(0,this.sg1.row),this.sg1.getCell(1,this.sg1.row)));
		this.sg1.delRow(this.sg1.row);
	}else if(sender == this.leftBtn)
	{		
		this.sg1.appendData(new Array(this.sg2.getCell(0,this.sg2.row),this.sg2.getCell(1,this.sg2.row)));
		this.sg2.delRow(this.sg2.row);
	}else {
		var rs = this.dbLib.runSQL("select a.kode_akun, a.nama from masakun a "+
						" left outer join konsol_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi "+
							"		and b.tgl_awal = '"+ this.dp_tgl1.getDateString()+"' and b.tgl_akhir = '"+this.dp_tgl2.getDateString()+"' "+
							"		and b.kode_lokkonsol = '"+this.ed_kode.getText()+"' and b.akun_konsol = '"+this.cb_akun.getText()+"' "+
						"where a.kode_lokasi = '"+this.cb_lokasi.getText()+"'  and b.akun_konsol is null");
		this.sg1.clear();	
		if (rs instanceof portalui_arrayMap){
			this.sg1.setData(rs);
		}
		rs = this.dbLib.runSQL("select a.kode_akun, a.nama from masakun a "+
						" inner join konsol_relasi b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi "+
							"		and b.tgl_awal = '"+ this.dp_tgl1.getDateString()+"' and b.tgl_akhir = '"+this.dp_tgl2.getDateString()+"' "+
							"		and b.kode_lokkonsol = '"+this.ed_kode.getText()+"' and b.akun_konsol = '"+this.cb_akun.getText()+"' "+
						"where a.kode_lokasi = '"+this.cb_lokasi.getText()+"'  ");
		this.sg2.clear();	
		if (rs instanceof portalui_arrayMap){
			this.sg2.setData(rs);
		}
	}
};
