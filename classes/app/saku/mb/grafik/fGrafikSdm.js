window.app_saku_mb_grafik_fGrafikSdm = function(owner)
{
	if (owner)
	{
		window.app_saku_mb_grafik_fGrafikSdm.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_mb_grafik_fGrafikSdm";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Grafik Kriteria SDM", 0);	
		
		
				
		this.p1 = new portalui_panel(this);
		this.p1.setTop(12);
		this.p1.setWidth(970);
		this.p1.setLeft(10);
		this.p1.setHeight(415);
		this.p1.setCaption("Hasil Perhitungan");
		
		this.img = new portalui_image(this);													
			this.img.setBound(420,40,550,249);			
			this.img.setImage("image/themes/dynpro/mb.jpg");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setTop(20);
		this.sg1.setLeft(1);
		this.sg1.setWidth(400);
		this.sg1.setHeight(389);
		
		
		
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
			
			
			this.sg1.clear();
			var data = this.dbLib.runSQL("SELECT a.nama,"+
       "IFNULL(CASE WHEN c.nilai>MAX THEN ROUND(c.nilai/MAX)*b.jumlah END,0) AS sdm "+
"FROM mb_job a "+
"INNER JOIN mb_kriteria_job b ON a.kode_job=b.kode_job "+
"INNER JOIN mb_kriteria c ON b.kode_kriteria=c.kode_kriteria "+
"INNER JOIN mb_kriteria_gedung d ON c.kode_kriteria=d.kode_kriteria "+
"INNER JOIN mb_gedung e ON d.kode_gedung=e.kode_gedung "+
"INNER JOIN mb_umr f ON e.kode_kota=f.kode_kota AND f.tahun='2009'");							 
			this.sg1.showLoading();
			this.sg1.setData(data);
			this.sg1.hideLoading();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_mb_grafik_fGrafikSdm.extend(window.portalui_childForm);
window.app_saku_mb_grafik_fGrafikSdm.prototype.mainButtonClick = function(sender){
	if (sender == this.app._mainForm.bClear)
		system.confirm(this, "clear", "screen akan di-refresh?","form inputan ini akan di-refresh");	
	if (sender == this.app._mainForm.bSimpan)
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	if (sender == this.app._mainForm.bEdit)
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	if (sender == this.app._mainForm.bHapus)
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
};
window.app_saku_mb_grafik_fGrafikSdm.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, [0],undefined);	
					this.sg1.clear();
				var data = this.dbLib.runSQL("select kode_spro,nama,modul,flag,value1,value2,keterangan from spro where kode_lokasi='40'");							 
				this.sg1.showLoading();
				if (data instanceof portalui_arrayMap)
				{	
					if (data.get(0) != undefined)
					{									
						for (var i in data.objList)
						{
							line = data.get(i);
							this.sg1.appendData([line.get("kode_spro"),line.get("nama"),line.get("modul"),line.get("flag"),line.get("value1"),line.get("value2"),line.get("keterangan")]);					
						}
					} else {this.sg1.appendRow();}
				}else {throw(data); this.sg1.appendRow();}
				this.sg1.hideLoading();
			}
			break;			
		case "simpan" :
			if (modalResult == mrOk)
			{
				try
				{
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					
					for (var i=0; i < this.sg1.rows.getLength(); i++)
					{
						sql.add("update spro set nama='"+this.sg1.getCell(1,i)+"', modul='"+this.sg1.getCell(2,i)+"', flag='"+this.sg1.getCell(3,i)+"', value1="+strToFloat(this.sg1.getCell(4,i))+", value2="+strToFloat(this.sg1.getCell(5,i))+", keterangan='"+this.sg1.getCell(6,i)+"' where kode_spro='"+this.sg1.getCell(0,i)+"' and kode_lokasi='40'");
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
};									  
window.app_saku_mb_grafik_fGrafikSdm.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"Proses Lengkap (perubahan data spro telah disimpan.)");
		              this.app._mainForm.bClear.click();              
		            }else system.info(this,result,"");
    				break;
    		}
	    }catch(e)
	    {
	       systemAPI.alert("step : "+step+"; error = "+e);
	    }    
	}
};