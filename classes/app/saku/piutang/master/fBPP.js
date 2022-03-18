window.app_saku_piutang_master_fBPP = function(owner)
{
	if (owner)
	{
		window.app_saku_piutang_master_fBPP.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_master_fBPP";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data SK BPP dan SKS: Input/Koreksi", 0);
		
		uses("portalui_saiCBBL");
		this.e0 = new portalui_saiCBBL(this);
		this.e0.setLeft(20);
		this.e0.setTop(30);
		this.e0.setWidth(200);
		this.e0.setCaption("Jurusan");
		this.e0.setText("");
		this.e0.setReadOnly(false);
		this.e0.onExit.set(this, "EditExit");		
		this.e0.onBtnClick.set(this, "FindBtnClick");
		this.e0.setLabelWidth(100);
		this.e0.setRightLabelCaption(" ");
		
		this.e1 = new portalui_saiCBBL(this);
		this.e1.setLeft(20);
		this.e1.setTop(55);
		this.e1.setWidth(200);
		this.e1.setCaption("Angkatan");		
		this.e1.setText("");
		this.e1.onChange.set(this, "doEditChange");		
		this.e1.onBtnClick.set(this, "FindBtnClick");				
		
		this.eProduk = new portalui_saiCBBL(this);
		this.eProduk.setTop(80);
		this.eProduk.setLeft(20);
		this.eProduk.setWidth(200);
		this.eProduk.setCaption("Produk");
		this.eProduk.setText("");
		this.eProduk.onChange.set(this, "doEditChange");
		this.eProduk.onBtnClick.set(this,"FindBtnClick");
		
		this.e2 = new portalui_saiCBBL(this);
		this.e2.setLeft(20);
		this.e2.setTop(105);
		this.e2.setWidth(200);
		this.e2.setCaption("Copy dr Angkatan");
		this.e2.setText("");
		this.e2.onBtnClick.set(this, "FindBtnClick");
		
		this.bCopy = new portalui_button(this);
		this.bCopy.setTop(130);
		this.bCopy.setLeft(120);
		this.bCopy.setCaption("Copy");
		this.bCopy.setIcon("url(icon/"+system.getThemes()+"/bCopy.png)");
		this.bCopy.onClick.set(this,"doClick");		
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this);
		this.sg1.setTop(155);
		this.sg1.setLeft(20);
		this.sg1.setWidth(700);
		this.sg1.setHeight(200);
		this.sg1.setColCount(6);
		this.sg1.setColTitle(["Sem/Mod","Nilai BPP","Jml SKS max","Nilai SKS Batas","Nilai SKS Luar Batas","Juml Bln."]);
		this.sg1.setColWidth([5,4,3,2,1,0],[80,100,100,100,120,130]);
		this.sg1.columns.get(0).setButtonStyle(bsAuto);
		this.sg1.columns.get(1).setColumnFormat(cfNilai);		
		this.sg1.columns.get(3).setColumnFormat(cfNilai);
		this.sg1.columns.get(4).setColumnFormat(cfNilai);
		this.sg1.setReadOnly(false);
		
		uses("portalui_sgNavigator");
		this.sgn = new portalui_sgNavigator(this);
		this.sgn.setTop(156);
		this.sgn.setLeft(20);
		this.sgn.setWidth(700);
		this.sgn.setGrid(this.sg1);
		this.sgn.setButtonStyle(0);
	
		var pl = new portalui_arrayMap();
		for (var i =1;i<=12;i++) pl.set(i, (i < 10 ? "0" + i : i));
		this.sg1.columns.get(0).setPicklist(pl);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.rearrangeChild(10,23);
		try
		{
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
		}catch(e)
		{
			alert("[app_saku_piutang_master_fBPP]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_master_fBPP.extend(window.portalui_childForm);
window.app_saku_piutang_master_fBPP.prototype.mainButtonClick = function(sender)
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
window.app_saku_piutang_master_fBPP.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0"],this.e0);
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, ["0"])))
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					this.insertData(sql);
				}catch(e)
				{
					system.alert(this, e,"");
				}
			}
		break;
		case "ubah" :
			if (modalResult == mrOk)
			{				
					uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from param_bpp where kode_jur='"+this.e0.getText()+"' and kode_ang='"+this.e1.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					this.insertData(sql);
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {			  
				  uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from param_bpp where kode_jur='"+this.e0.getText()+"' and kode_ang='"+this.e1.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);					
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_saku_piutang_master_fBPP.prototype.insertData = function(sql)
{	
	var script ="insert into param_bpp(semester,nilai_bpp,jml_batas,nilai_batas,nilai_luar,kode_jur,kode_ang,kode_produk,jml_bulan, kode_lokasi)values ";
	if (this.app._dbEng == "mysqlt"){
		for (var i=0; i < this.sg1.rows.getLength(); i++)
		{
			if (i ==0)
				script += "('"+this.sg1.getCell(0,i)+"','"+parseNilai(this.sg1.getCell(1,i))+"','"+parseNilai(this.sg1.getCell(2,i))+"', "+
				"'"+parseNilai(this.sg1.getCell(3,i))+"','"+parseNilai(this.sg1.getCell(4,i))+"','"+this.e0.getText()+"','"+this.e1.getText()+"',"+
				"'"+this.eProduk.getText()+"','"+parseNilai(this.sg1.getCell(5,i))+"','"+this.app._lokasi+"')";
			else script += ",('"+this.sg1.getCell(0,i)+"','"+parseNilai(this.sg1.getCell(1,i))+"','"+parseNilai(this.sg1.getCell(2,i))+"', "+
				"'"+parseNilai(this.sg1.getCell(3,i))+"','"+parseNilai(this.sg1.getCell(4,i))+"','"+this.e0.getText()+"','"+this.e1.getText()+"',"+
				"'"+this.eProduk.getText()+"','"+parseNilai(this.sg1.getCell(5,i))+"','"+this.app._lokasi+"')";
		}
		sql.add(script);
	}else{
		for (var i=0; i < this.sg1.rows.getLength(); i++)
		{							
			sql.add(script + " ('"+this.sg1.getCell(0,i)+"','"+parseNilai(this.sg1.getCell(1,i))+"','"+parseNilai(this.sg1.getCell(2,i))+"', "+
				"'"+parseNilai(this.sg1.getCell(3,i))+"','"+parseNilai(this.sg1.getCell(4,i))+"','"+this.e0.getText()+"','"+this.e1.getText()+"',"+
				"'"+this.eProduk.getText()+"','"+parseNilai(this.sg1.getCell(5,i))+"','"+this.app._lokasi+"')");
		}
		
	}					
	this.dbLib.execArraySQL(sql);	
};
window.app_saku_piutang_master_fBPP.prototype.doClick = function(sender)
{
	if (this.e2.getText() != "")
	{
		try
		{
			setTipeButton(tbSimpan);
			this.sg1.clear();
			var data = this.dbLib.runSQL("select distinct a.*, d.nama_produk  from param_bpp a "+
				    "inner join jurusan c on c.kode_jur = a.kode_jur and c.kode_lokasi = a.kode_lokasi "+
				    "inner join angkatan b on b.kode_ang = a.kode_ang and b.kode_jur = a.kode_jur and b.kode_lokasi = a.kode_lokasi "+
					"inner join produk d on d.kode_jur = a.kode_jur and d.kode_lokasi = a.kode_lokasi and d.jenis = 'BPP' and d.kode_produk = a.kode_produk "+
					"where a.kode_jur = '"+this.e0.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ang = '"+this.e2.getText()+"' ");			
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					var line, tmp = data.get(0);					
					
					for (var i in data.objList){
						line = data.get(i);
						tmp = new Array();												
						tmp[tmp.length] = line.get("semester");							
						tmp[tmp.length] = floatToNilai(parseFloat(line.get("nilai_bpp")));
						tmp[tmp.length] = line.get("jml_batas");							
						tmp[tmp.length] = floatToNilai(parseFloat(line.get("nilai_batas")));
						tmp[tmp.length] = floatToNilai(parseFloat(line.get("nilai_luar")));
						tmp[tmp.length] = line.get("jml_bulan");							
						this.sg1.appendData(tmp);
					}
					this.sg1.setNoUrut();
					setTipeButton(tbUbahHapus);
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_piutang_master_fBPP.prototype.doEditChange = function(sender)
{
	/*this.eProduk.setText(tmp.get("kode_produk"));
					this.eProduk.setRightLabelCaption(tmp.get("nama_produk"));					
					*/
	if (this.eProduk.getText() != "")
	{
		try
		{
			setTipeButton(tbSimpan);
			this.sg1.clear();
			var data = this.dbLib.runSQL("select distinct a.*, d.nama_produk  from param_bpp a "+
				    "inner join jurusan c on c.kode_jur = a.kode_jur and c.kode_lokasi = a.kode_lokasi "+
				    "inner join angkatan b on b.kode_ang = a.kode_ang and b.kode_jur = a.kode_jur and b.kode_lokasi = a.kode_lokasi "+
					"inner join produk d on d.kode_jur = a.kode_jur and d.kode_lokasi = a.kode_lokasi and d.jenis = 'BPP' and d.kode_produk = a.kode_produk "+
					"where a.kode_jur = '"+this.e0.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ang = '"+this.e1.getText()+"' and a.kode_produk = '"+this.eProduk.getText()+"' ");			
			if (data instanceof portalui_arrayMap){
				if (data.get(0) != undefined){
					var line, tmp = data.get(0);
					
					for (var i in data.objList){
						line = data.get(i);
						tmp = new Array();												
						tmp[tmp.length] = line.get("semester");							
						tmp[tmp.length] = floatToNilai(parseFloat(line.get("nilai_bpp")));
						tmp[tmp.length] = line.get("jml_batas");							
						tmp[tmp.length] = floatToNilai(parseFloat(line.get("nilai_batas")));
						tmp[tmp.length] = floatToNilai(parseFloat(line.get("nilai_luar")));
						tmp[tmp.length] = line.get("jml_bulan");							
						this.sg1.appendData(tmp);
					}
					this.sg1.setNoUrut();
					setTipeButton(tbUbahHapus);
				}else this.sg1.appendRow();
			}else throw(data);
		}catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_saku_piutang_master_fBPP.prototype.FindBtnClick = function(sender, event)
{
	try
	{
		switch(sender) {
		case this.e0 :
			this.standarLib.showListData(this, "Data Jurusan",sender,undefined, 
										  "select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from jurusan where kode_lokasi = '"+this.app._lokasi+"' ",
										  ["kode_jur","nama_jur"],"and",["Kode Jurusan","Nama Jurusan"]);
			break;
		case this.e1 :
		case this.e2 :
			this.standarLib.showListData(this, "Data Angkatan",sender,undefined, 
										  "select kode_ang, nama_ang from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.e0.getText()+"' ",
										  "select count(*) from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.e0.getText()+"'",
										  ["kode_ang","nama_ang"],"and",["Kode Angkatan","Nama Angkatan"]);
			break;
		case this.eProduk :
			this.standarLib.showListData(this, "Data Produk",sender,undefined, 
										  "select kode_produk, nama_produk from produk where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.e0.getText()+"'  and jenis = 'BPP'",
										  "select count(*) from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.e0.getText()+"' and jenis = 'BPP'",
										  ["kode_produk","nama_produk"],"and",["Kode Produk","Nama Produk"]);
			break;	
		}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_piutang_master_fBPP.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"process completed ("+ this.e0.getText()+")");
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