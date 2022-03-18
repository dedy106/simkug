window.app_saku_piutang_transaksi_fUploadMhs = function(owner)
{
  if (owner)
	{
		window.app_saku_piutang_transaksi_fUploadMhs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fUploadMhs";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Upload Data Mahasiswa : Input/Koreksi", 0);
		
		try
		{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;portalui_uploader");
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
			
			this.cb1 = new portalui_checkBox(this);
			this.cb1.setTop(55);
			this.cb1.setLeft(840);
			this.cb1.setWidth(100);
			this.cb1.setCaption("Upload Ulang");			
			this.cb1.setHint("Upload ulang data Mahasiswa yang sudah terupload.<br>Agar tidak error saat ada yang NPM yang sama");
			
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
			this.uploader.setParam3("object");
			this.uploader.setAutoSubmit(true);
			
			this.bValidasi = new portalui_button(this);
			this.bValidasi.setTop(80);
			this.bValidasi.setLeft(840);
			this.bValidasi.setCaption("Validasi");
			this.bValidasi.setIcon("url(icon/"+system.getThemes()+"/bCopy.png)");
			this.bValidasi.onClick.set(this,"doClick");		
			
			uses("portalui_saiTable;portalui_sgNavigator");
			this.sg1 = new portalui_saiGrid(this, {
				bound: [20, 105, 900, 300],
				colCount: 7,
				colTitle:["No Ujian","Nama MHS","Angkatan","Semester","NPM Temp","Validasi","Jurusan"],
				colWidth:[[6,5,4,3,2,1,0],[80,80,80,80,80,250,100]]
				
			});
			
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
			this.dpTgl.setDateString(new Date().getDateStr());
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.rearrangeChild(10,23);
		}catch(e)
		{
			alert("[app_saku_piutang_transaksi_fUploadMhs]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fUploadMhs.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fUploadMhs.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan){
			try{		
				for (var i in this.sg1.data.objList)
				{
					line = this.sg1.data.get(i);		
					if (line.get("validasi") == "NoVALID.3")
						throw("Angkatan "+ line.get("angkatan") +" tidak terdaftar di Master angkatan.\r\n"+							
							  " "+line.get("angkatan")+" harus didaftarkan dulu.");
					if (line.get("validasi") == "NoVALID.2")
						throw("Jurusan "+ line.get("kode_jur") +" tidak terdaftar di Master jurusan.\r\n"+							
							  " "+line.get("kode_jur")+" harus didaftarkan dulu.");	
				}
				system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");
			}catch(e){
				system.alert(this,e,"");
			}
		}
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data di form ini akan disimpan.");		
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");		
	},
	doModalResult: function(event, modalResult){
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this,["0"],this.e0);
					this.sg1.clear();
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
	},
	insertData : function(sql){	
		var line, scriptMhs ="insert into mhs (npm, nama_mhs, no_ujian, kode_jur, kode_ang,  semester, keterangan,status, status_baru, kode_lokasi) values ";
		var script ="insert into loadmhs_d (no_urut, no_ujian, npm, no_bukti, nama_mhs, angkatan, semester, kode_jur, kode_lokasi) values ";	          				  	
		sql.add("insert into loadmhs_m (no_bukti, tanggal, periode, no_dokumen, keterangan, nik_user, status_load, kode_lokasi) values "+
							"('"+this.e0.getText()+"', '"+this.dpTgl.getDateString()+"','"+this.app._periode+"','-','-','"+this.app._userLog+"','1','"+this.app._lokasi+"')"); //1= mhs baru;2=mhs aktif
		var mhs = new Array();					
		if (this.app._dbEng == "mysqlt"){		
			for (var i in this.sg1.data.objList)
			{
				line = this.sg1.data.get(i);		
				if (i !=0) {script += ",";scriptMhs += ","}
				script += "('"+(i+1)+"','"+line.get("no_ujian")+"','"+line.get("npm")+"','"+this.e0.getText()+"','"+line.get("nama")+"','"+line.get("angkatan")+"','"+line.get("semester")+"' "+
							",'"+line.get("kode_jur")+"','"+this.app._lokasi+"'			)";
				scriptMhs += "('"+line.get("npm")+"','"+line.get("nama")+"','"+line.get("no_ujian")+"','"+line.get("kode_jur")+"' "+
							",'"+line.get("angkatan")+"','"+line.get("semester")+"','-','0','1','"+this.app._lokasi+"'	)";
				mhs.push("'"+line.get("npm")+"'");			
			}
			sql.add(script);
			sql.add(scriptMhs);
		}else{
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{							
				sql.add(script + " ('"+(i+1)+"','"+line.get(this.headerFile[0])+"','"+line.get(this.headerFile[4])+"','"+this.e0.getText()+"','"+line.get(this.headerFile[1])+"','"+line.get(this.headerFile[2])+"','"+line.get(this.headerFile[3])+"' "+
							",'"+line.get(this.headerFile[6])+"','"+this.app._lokasi+"'			)");
				sql.add(scriptMhs + " ('"+line.get(this.headerFile[4])+"','"+line.get(this.headerFile[1])+"','"+line.get(this.headerFile[0])+"','"+line.get(this.headerFile[2])+"' "+
							",'"+line.get(this.headerFile[3])+"','-','0','1','"+this.app._lokasi+"'	)");
				mhs.push("'"+line.get("npm")+"'");			
			}	
		}	
		if (mhs.length > 0 && this.cb1.selected)
			sql.add("delete from mhs where npm in ("+mhs+") and kode_lokasi = '"+this.app._lokasi+"'");	
		this.dbLib.execArraySQL(sql);	
	},
	doClick: function(sender){
		try{
			var line, rs, tmp,found;			
			rs = this.dbLib.runSQL("select kode_jur from jurusan where kode_lokasi  = '"+this.app._lokasi+"' ");		
			if (rs instanceof portalui_arrayMap){
				var dataJur = new Array();			
				for (var i in rs.objList){				
					dataJur[rs.get(i).get("kode_jur")] = rs.get(i).get("kode_jur");				
				}
			}			
			rs = this.dbLib.runSQL("select kode_ang, kode_jur from angkatan where kode_lokasi  = '"+this.app._lokasi+"' ");		
			if (rs instanceof portalui_arrayMap){
				var dataAng = rs;				
			}			
			if (this.sg1.data == undefined) return;				
			for (var i in this.sg1.data.objList){
				line = this.sg1.data.get(i);			
				/*
				if (dataMhs[line.get(this.headerFile[0])] != undefined)
					this.sg1.data.get(i).set("validasi","NoVALID.1");							
				else this.sg1.data.get(i).set("validasi","VALID");			
				*/
				//if (this.sg1.data.get(i).get("validasi") == "VALID"){
					if (dataJur[line.get("kode_jur")] == undefined)
						this.sg1.data.get(i).set("validasi","NoVALID.2");								
					else this.sg1.data.get(i).set("validasi","VALID");			
				//}
				if (this.sg1.data.get(i).get("validasi") == "VALID"){	    	      					
					found = false;
					for (var j in dataAng.objList){
						tmp = dataAng.get(j);
						if (tmp.get("kode_ang") == line.get("angkatan") && tmp.get("kode_jur") == line.get("kode_jur")){
							found = true;
							break;
						}
					}
					if (!found)
						this.sg1.data.get(i).set("validasi","NoVALID.3");
					else this.sg1.data.get(i).set("validasi","VALID");
				}
				/*if (this.sg1.data.get(i).get("validasi") == "VALID"){	    	      	      
					if (datano_ujianMhs[line.get(this.headerFile[0])] != undefined)
						this.sg1.data.get(i).set("validasi","NoVALID.4");								
					else this.sg1.data.get(i).set("validasi","VALID");			
				}*/
			}
			this.sg1.clear();
			this.loadData(1, this.rowPerPage);
		}catch(e){
			system.alert(this,e,"");
		}
	},
	doEditChange: function(sender){},
	FindBtnClick: function(sender, event){},
	doRequestReady: function(sender, methodName, result){
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
	},
	doAfterLoad: function(sender, result,data){
		try{	
			if (result){	
				var rs, arr;		
				this.sg1.clear();					
				if (data instanceof portalui_arrayMap){						
					this.sg1.data = data;
					this.sgn.setTotalPage(data.getTotalPage(this.rowPerPage));
					this.sgn.rearrange();
					this.sgn.activePage = 0;				
				}else {			
					if (typeof data == "string"){
						if (data.search("\r\n") == -1) throw(data);				
						var temp = data.split("\r\n");
						var header = temp[0].split(";");			
						var rowCount = parseInt(temp[2]);
						var fieldDesc = new portalui_arrayMap();
						var desc1 = new portalui_arrayMap();
						var desc2 = new portalui_arrayMap();
						this.headerFile = new Array("no_ujian","nama","angkatan","semester","npm","validasi","kode_jur");
						for (var i in this.headerFile){
							desc1.set(this.headerFile[i],250);
							desc2.set(this.headerFile[i],"S");
						}
						fieldDesc.set(0,desc1);
						fieldDesc.set(1,desc2);
						var dataRow, line, data = temp[1].split("\n");
						var result = new portalui_arrayMap();				
						rowCount = 0;
						for (var i in data){				
							line = new portalui_arrayMap();
							dataRow = data[i].split(";");	
							for (var r in dataRow){																		
								if (r == 3){
									line.set(this.headerFile[r],dataRow[r]);
									line.set("npm",dataRow[0]);
									line.set("validasi","-");
								}else if (r == 4){
									line.set("kode_jur",dataRow[r]);
								}else line.set(this.headerFile[r],dataRow[r]);	
							}
							result.set(i,line);
							if (i == data.length - 2) break;
							rowCount++;
						}			
						this.headerFile = new Array("no_ujian","nama","angkatan","semester","npm","validasi","kode_jur");
						result.setTag1(rowCount);
						result.setTag2(fieldDesc);							
						this.sg1.setData(result, 1,this.rowPerPage);
						this.sgn.setTotalPage(result.getTotalPage(this.rowPerPage));			
						this.sgn.rearrange();
						this.sgn.setButtonStyle(3);
						this.sgn.activePage = 0;	
						this.bValidasi.click();
					}else {//json
						var rowCount = parseInt(data.rows.length);
						var fieldDesc = new portalui_arrayMap();
						var desc1 = new portalui_arrayMap();
						var desc2 = new portalui_arrayMap();
						this.headerFile = new Array("no_ujian","nama","angkatan","semester","npm","validasi","kode_jur");
						for (var i in this.headerFile){
							desc1.set(this.headerFile[i],250);
							desc2.set(this.headerFile[i],"S"); 
						}
						fieldDesc.set(0,desc1);
						fieldDesc.set(1,desc2);
						var dataRow, line;//, data = temp[1].split("\n");
						var result = new portalui_arrayMap();														
						for (var i in data.rows){				
							line = new portalui_arrayMap();					
							dataRow = data.rows[i];														
							for (var r in dataRow) {
								if (r == "semester"){
									line.set("semester",dataRow[r]);
									line.set("npm",dataRow["no_ujian"]);
									line.set("validasi","-");
								}else if (r.toLowerCase() == "kode_jur" || r == "jurusan"){
									line.set("kode_jur",dataRow[r]);
								}else line.set(r,dataRow[r]);															
							}													
							result.set(i,line);
							if (i == data.length - 2) break;
							rowCount++;
						}							
						result.setTag1(rowCount);
						result.setTag2(fieldDesc);			
						this.sg1.data = result;
						this.sgn.setTotalPage(result.getTotalPage(this.rowPerPage));			
						this.sgn.rearrange();
						this.sgn.setButtonStyle(3);
						this.sgn.activePage = 0;	
						this.loadData(1,this.rowPerPage);
					}
				}
			}
		}catch(e){
			alert(e);
		}
	},
	doFileChange: function(sender, filename, allow){
		if (allow)
			this.eFile.setText(filename);
	},
	doSelectedPage: function(sender, page){	
		this.sg1.clear();
		this.loadData(page, this.rowPerPage);
	},
	doGenerate: function(sender){
		this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "loadmhs_m", "no_bukti", "L"+this.ePeriode.substr(2),"000"));	
	},
	doSelectDate: function(sender, y,m,d){
		this.ePeriode = (y+""+(m < 10?'0'+m:m));
		this.bGenerate.click();
	},
	loadData: function(page, rowPerPage){
		var start = ( page - 1)* rowPerPage;
		var finish = ( this.sg1.data.getLength() < start + rowPerPage ? this.sg1.data.getLength() : start + rowPerPage);
		this.sg1.clear();
		var data = this.sg1.data, line,dataToAppend;		
		for (var i=start;i < finish;i++){
			line = data.get(i);
			dataToAppend = [];
			for (var c in line.objList) {
				dataToAppend.push(line.get(c));
			}
			this.sg1.appendData(dataToAppend);
		}
		this.sg1.setNoUrut(start);
	}
});