/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
*************************************************************************************************/
window.app_saku_piutang_transaksi_fUpdateMhs = function(owner)
{
  if (owner)
	{
		window.app_saku_piutang_transaksi_fUpdateMhs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fUpdateMhs";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Update Data Mahasiswa : Input/Koreksi", 0);
		
		try
		{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_uploader");
			this.e0 = new portalui_saiLabelEdit(this);
			this.e0.setLeft(20);
			this.e0.setTop(30);
			this.e0.setWidth(200);
			this.e0.setCaption("No Load");
			this.e0.setText("");
			this.e0.setReadOnly(false);
			this.e0.setLabelWidth(100);
			
			this.bGenerate = new portalui_button(this);
			this.bGenerate.setTop(30);
			this.bGenerate.setLeft(230);
			this.bGenerate.setCaption("Generate");
			this.bGenerate.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bGenerate.onClick.set(this,"doGenerate");		
			
			this.l1 = new portalui_label(this);
			this.l1.setLeft(20);
			this.l1.setTop(55);
			this.l1.setHeight(18);
			this.l1.setWidth(100);
			this.l1.setCaption("Tanggal");			
			this.l1.setUnderLine(true);
			
			this.dpTgl = new portalui_datePicker(this);
			this.dpTgl.setTop(55);
			this.dpTgl.setLeft(120);
			this.dpTgl.setWidth(100);		
			this.dpTgl.onSelect.set(this,"doSelectDate");
			
			this.eFile = new portalui_saiLabelEdit(this);
			this.eFile.setLeft(20);
			this.eFile.setTop(80);
			this.eFile.setWidth(400);
			this.eFile.setCaption("File");
			this.eFile.setText("");		
			
			this.uploader = new portalui_uploader(this);
			this.uploader.setLeft(760);
			this.uploader.setTop(80);
			this.uploader.setWidth(80);
			this.uploader.setHeight(20);		
			this.uploader.onAfterUpload.set(this,"doAfterLoad");
			this.uploader.onChange.set(this,"doFileChange");
			this.uploader.setParam4("gridupload");
			this.uploader.setParam3("text");
			this.uploader.setAutoSubmit(true);
			
			this.bValidasi = new portalui_button(this);
			this.bValidasi.setTop(80);
			this.bValidasi.setLeft(840);
			this.bValidasi.setCaption("Validasi");
			this.bValidasi.setIcon("url(icon/"+system.getThemes()+"/bCopy.png)");
			this.bValidasi.onClick.set(this,"doClick");		
			
			uses("portalui_saiTable;portalui_sgNavigator");
			this.sg1 = new portalui_saiTable(this);
			this.sg1.setTop(105);
			this.sg1.setLeft(20);
			this.sg1.setWidth(900);
			this.sg1.setHeight(300);			
			this.sg1.setColTitle(new Array("No","No Ujian","Nama MHS","Angkatan","Semester","NPM Temp","Validasi","Jurusan"));
			
			this.sgn = new portalui_sgNavigator(this);
			this.sgn.setTop(406);
			this.sgn.setLeft(20);
			this.sgn.setWidth(900);
			this.sgn.setButtonStyle(3);
			this.sgn.setGrid(this.sg1);
			this.sgn.onPager.set(this, "doSelectedPage");
			this.rowPerPage = 100;
			
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();
		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.rearrangeChild(10,23);
			this.dpTgl.setDateString(new Date().getDateStr());
		}catch(e)
		{
			alert("[app_saku_piutang_transaksi_fUpdateMhs]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fUpdateMhs.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fUpdateMhs.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		try{		
			for (var i in this.sg1.data.objList)
			{
				line = this.sg1.data.get(i);		
				if (line.get("validasi") == "NoVALID")
					throw("No Ujian "+line.get("noujian")+" a.n "+line.get("nama")+" tidak terdaftar di database.");				
			}
			system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");
		}catch(e){
			system.alert(this,e,"");
		}
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
window.app_saku_piutang_transaksi_fUpdateMhs.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0"],this.e0);				
				this.sg1.clearAll();
			}
		break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0"])))
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
					this.insertData(sql);
			}
		break;
		case "hapus" :
		   if (modalResult == mrOk)
		   {			  
				  uses("server_util_arrayList");					
					var sql = new server_util_arrayList();
					sql.add("delete from load_mhs where kode_jur='"+this.e0.getText()+"' and kode_ang='"+this.e1.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);					
		   }
		break;
	}
	this.e0.setFocus();
};
window.app_saku_piutang_transaksi_fUpdateMhs.prototype.insertData = function(sql)
{	
	var line, scriptMhs="";
	var script ="insert into loadmhs_d (no_urut, no_ujian, npm, no_bukti, nama_mhs, angkatan, semester, kode_jur, kode_lokasi) values ";	          				  	
	sql.add("insert into loadmhs_m (no_bukti, tanggal, periode, no_dokumen, keterangan, nik_user, status_load, kode_lokasi) values "+
						"('"+this.e0.getText()+"', '"+this.dpTgl.getDateString()+"','"+this.app._periode+"','-','-','"+this.app._userLog+"','1','"+this.app._lokasi+"')"); //1= mhs baru;2=mhs aktif
	if (this.app._dbEng == "mysqlt"){
		for (var i in this.sg1.data.objList)
		{
			line = this.sg1.data.get(i);		
			if (i !=0) {script += ",";}
			script += "('"+(i+1)+"','"+line.get("noujian")+"','"+line.get("npm")+"','"+this.e0.getText()+"','"+line.get("nama")+"','"+line.get("angkatan")+"','"+line.get("semester")+"' "+
						",'"+line.get("jurusan")+"','"+this.app._lokasi+"'			)";
			sql.add("update mhs set npm = '"+line.get("npm")+"' where no_ujian = '"+line.get("noujian")+"' and kode_lokasi ='"+this.app._lokasi+"'");
			
		}
		sql.add(script);		
	}else{
		for (var i in this.sg1.data.objList)
		{							
			sql.add(script + " ('"+(i+1)+"','"+line.get(this.headerFile[0])+"','"+line.get(this.headerFile[4])+"','"+this.e0.getText()+"','"+line.get(this.headerFile[1])+"','"+line.get(this.headerFile[2])+"','"+line.get(this.headerFile[3])+"' "+
						",'"+line.get(this.headerFile[6])+"','"+this.app._lokasi+"'			)");
			sql.add("update mhs set npm = '"+line.get("npm")+"' where no_ujian = '"+line.get("noujian")+"' and kode_lokasi ='"+this.app._lokasi+"'");			
		}
		sql.add(scriptMhs);
	}					
	this.dbLib.execArraySQL(sql);	
};
window.app_saku_piutang_transaksi_fUpdateMhs.prototype.doClick = function(sender)
{
	try{
		var line, rs, tmp,found,dataMhs;			
		rs = this.dbLib.loadQuery("select npm from mhs where kode_lokasi  = '"+this.app._lokasi+"' ");
		
		dataMhs = rs.split("\r\n");		
		
		if (this.sg1.data == undefined) return;				
		for (var i in this.sg1.data.objList){
			line = this.sg1.data.get(i);						
			found = dataMhs.indexOf(line.get("noujian")) != -1;
			if (!found)
				this.sg1.data.get(i).set("validasi","NoVALID");
			else this.sg1.data.get(i).set("validasi","VALID");
		}
		this.sg1.clearAll();
		this.sg1.setData(this.sg1.data,1, this.rowPerPage);
	}catch(e){
		system.alert(this,e,"");
	}
};
window.app_saku_piutang_transaksi_fUpdateMhs.prototype.doEditChange = function(sender)
{	
};
window.app_saku_piutang_transaksi_fUpdateMhs.prototype.FindBtnClick = function(sender, event)
{
};
window.app_saku_piutang_transaksi_fUpdateMhs.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_piutang_transaksi_fUpdateMhs.prototype.doAfterLoad = function(sender, result,data)
{
	try{	
	if (result){				
		var rs, arr;
		this.sg1.clearAll();			
		if (data instanceof portalui_arrayMap){			
			this.sg1.setData(data, 1);
			this.sgn.setTotalPage(data.getTotalPage(this.rowPerPage));
			this.sgn.rearrange();
			this.sgn.activePage = 0;				
		}else {
			if (data.search("\r\n") == -1) throw(data);
			var temp = data.split("\r\n");
			var header = temp[0].split(";");			
			var rowCount = parseInt(temp[2]);
			var fieldDesc = new portalui_arrayMap();
			var desc1 = new portalui_arrayMap();
			var desc2 = new portalui_arrayMap();
			this.headerFile = new Array("noujian","nama","angkatan","semester","npm","validasi","jurusan");
			for (var i in this.headerFile){
				desc1.set(this.headerFile[i],250);
				desc2.set(this.headerFile[i],"S");
			}
			fieldDesc.set(0,desc1);
			fieldDesc.set(1,desc2);
			var dataRow, line, data = temp[1].split("\n");
			var result = new portalui_arrayMap();
			for (var i in data){				
				line = new portalui_arrayMap();
				dataRow = data[i].split(";");	
				for (var r in dataRow){
					if (r == 3){
						line.set(this.headerFile[r],dataRow[r]);
						line.set("npm",dataRow[0]);
						line.set("validasi","-");
					}else if (r == 4){
						line.set("jurusan",dataRow[r]);
					}else line.set(this.headerFile[r],dataRow[r]);	
				}
				result.set(i,line);
				if (i == data.length - 2) break;
			}			
			this.headerFile = new Array("noujian","nama","angkatan","semester","npm","validasi","jurusan");
			result.setTag1(rowCount);
			result.setTag2(fieldDesc);			
			this.sg1.setData(result, 1,this.rowPerPage);
			this.sgn.setTotalPage(result.getTotalPage(this.rowPerPage));			
			this.sgn.rearrange();
			this.sgn.setButtonStyle(3);
			this.sgn.activePage = 0;	
		}
	}
	}catch(e)
	{
		alert(e);
	}
};
window.app_saku_piutang_transaksi_fUpdateMhs.prototype.doFileChange = function(sender, filename, allow)
{
	if (allow)
		this.eFile.setText(filename);
};
window.app_saku_piutang_transaksi_fUpdateMhs.prototype.doSelectedPage = function(sender, page){	
	this.sg1.clearAll();
	this.sg1.setData(this.sg1.data, page,this.rowPerPage);
};
window.app_saku_piutang_transaksi_fUpdateMhs.prototype.doGenerate = function(sender)
{
	this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "loadmhs_m", "no_bukti", "L"+this.ePeriode.substr(2),"000"));	
};
window.app_saku_piutang_transaksi_fUpdateMhs.prototype.doSelectDate = function(sender, y,m,d)
{
	this.ePeriode = (y+""+(m < 10?'0'+m:m));
	this.bGenerate.click();
};