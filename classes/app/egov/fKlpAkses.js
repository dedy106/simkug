//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_egov_fKlpAkses = function(owner){
	if (owner){
		try{
			window.app_egov_fKlpAkses.prototype.parent.constructor.call(this, owner);
			this.className = "app_egov_fKlpAkses";
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Kelompok Akses", 0);	
			this.maximize();
						
			this.e0 = new portalui_saiCB(this);
			this.e0.setBound(20,20,250,20);
			this.e0.setCaption("<font color="+system.getConfig("app.color.labelCaption")+">Kelompok Akses</font>");
			this.e0.setText("");
			this.e0.setReadOnly(false);
			this.e0.setLength(10);
			this.e0.setMustCheck(false);
						
			this.p1 = new portalui_panel(this);
			this.p1.setBound(20,45,700,400);
			this.p1.setBorder(3);
			this.p1.setCaption("Relasi Form dengan kelompok Akses");
			
			uses("portalui_imageButton;portalui_saiGrid");
			this.btn = new portalui_imageButton(this);
			this.btn.setBound(270,20,22,22);
			this.btn.setHint("Reload");
			this.btn.setImage("icon/"+system.getThemes()+"/reload.png");
			this.btn.onClick.set(this, "doClick");
						
			this.sg1 = new portalui_saiGrid(this.p1);
			this.sg1.setBound(10,40,320,300);
			this.sg1.setColCount(2);			
				this.sg1.columns.get(0).setTitle("Kode");
				this.sg1.columns.get(0).setColWidth(80);
				this.sg1.columns.get(1).setTitle("Nama");
				this.sg1.columns.get(1).setColWidth(180);
			this.sg1.setReadOnly(true);	
			this.sg2 = new portalui_saiGrid(this.p1);
			this.sg2.setBound(370,40,320,300);
			this.sg2.setColCount(2);			
				this.sg2.columns.get(0).setTitle("Kode");
				this.sg2.columns.get(0).setColWidth(80);
				this.sg2.columns.get(1).setTitle("Nama");
				this.sg2.columns.get(1).setColWidth(180);
			this.sg2.setReadOnly(true);	
			this.b1 = new portalui_imageButton(this.p1);
			this.b1.setBound(340,100,22,22);	
			this.b1.setImage("icon/"+system.getThemes()+"/imgFirst.png");
			this.b1.onClick.set(this,"doBtnClick");
			
			this.b2 = new portalui_imageButton(this.p1);
			this.b2.setBound(340,122,22,22);	
			this.b2.setImage("icon/"+system.getThemes()+"/imgLeft.png");
			this.b2.onClick.set(this,"doBtnClick");
			
			this.b3 = new portalui_imageButton(this.p1);
			this.b3.setBound(340,164,22,22);	
			this.b3.setImage("icon/"+system.getThemes()+"/imgRight.png");
			this.b3.onClick.set(this,"doBtnClick");
			
			this.b4 = new portalui_imageButton(this.p1);
			this.b4.setBound(340,186,22,22);	
			this.b4.setImage("icon/"+system.getThemes()+"/imgLast.png");
			this.b4.onClick.set(this,"doBtnClick");
			
			this.pF = new portalui_panel(this.p1);
			this.pF.setBound(10,340,680,55);			
			this.pF.setCaption("Search Text");
			
			this.eFind = new portalui_saiLabelEdit(this.pF);
			this.eFind.setBound(100,25,450,20);
			this.eFind.setCaption("Search");
			this.eFind.setText("");
			
			this.bFind = new portalui_button(this.pF);
			this.bFind.setBound(550,25,80,20);			
			this.bFind.setCaption("Find");
			this.bFind.onClick.set(this,"doBtnClick");
			
			
			uses("util_dbLib;util_standar");
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			var rs = this.dbLib.runSQL("select distinct kode_klp_akses from klp_akses_m");
			if (rs instanceof portalui_arrayMap){
				for (var i in rs.objList){
					this.e0.addItem(i,rs.get(i).get("kode_klp_akses"));
				}
			}			
			this.standar = new util_standar();			
			setTipeButton(tbSimpan);
		}catch(e)
		{
			systemAPI.alert("[app_egov_fKlpAkses]::constructor:"+e);
		}
		
		this.setTabChildIndex();
	}
};
window.app_egov_fKlpAkses.extend(window.portalui_childForm);
window.app_egov_fKlpAkses.implement({
	doClick: function(sender){	
		try{
			this.sg1.showLoading();
			var rs = this.dbLib.getDataProvider("Select a.kode_form, a.nama_form from m_form a "+	
								" left outer join klp_akses_m b on b.kode_form = a.kode_form and  b.kode_klp_akses = '"+this.e0.getText()+"'"+
								"where b.kode_klp_akses is null");
			this.sg1.clear();
			eval("rs="+rs+";");
			if (typeof(rs) == "object"){
				var line, data = [];
				for (var i in rs.rs.rows){
					data = [];
					data.push(rs.rs.rows[i].kode_form);			
					data.push(rs.rs.rows[i].nama_form);			
					this.sg1.appendData(data);
				}
			}
			this.sg1.hideLoading();
			this.sg2.showLoading();
			var rs = this.dbLib.getDataProvider("Select a.Kode_Form, b.Nama_Form from klp_akses_m a "+
												"	inner join m_form b on b.kode_form = a.kode_form "+		
												"where Kode_Klp_Akses = '"+this.e0.getText()+"'");	
			this.sg2.clear();
			eval("rs="+rs+";");					
			if (typeof(rs) == "object"){
				var line, data = [];
				for (var i in rs.rs.rows){
					data = [];
					data.push(rs.rs.rows[i].kode_form);			
					data.push(rs.rs.rows[i].nama_form);			
					this.sg2.appendData(data);
				}
			}	
			this.sg2.hideLoading();
		}catch(e){
			this.sg2.hideLoading();
			this.sg1.hideLoading();
			systemAPI.alert(e,"Error dalam pengambilan data");
		}
	},
	doRequestReady: function(sender, methodName, result){
		try
		{
			switch(methodName)
			{
				case "execQuery" :
				case "execArraySQL" :
					if (result.search("error") == -1)
						system.info(this, result, "");
					else system.alert(this, result, "");
					break;			
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	findText: function(sg, text){
		try{
			var value = undefined;
			var i = 0;		
			for (i = this.startFind; i < sg.rows.getLength(); i++)
			{
				for (var j in sg.columns.objList)
				{
					value = sg.getCell(j,i);
					value = value.toLowerCase();
					text = text.toLowerCase();
					if (value.search(text) != -1)  
					{
						this.startFind = i + 1;
						sg.goToRow(i);	
						return value;
					}
				}
			}
			return "";
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender){	
		try{
			showProgress();
			if (sender == this.bFind)
			{
				this.startFind = 0;	
				if (this.findText(this.sg1,this.eFind.getText()) == "")
					this.findText(this.sg2,this.eFind.getText());
			}else if (sender == this.b1)
			{
				var rowCount = this.sg2.getRowCount();
				var values = [];
				for (var i = 0; i < rowCount;i++)
				{				
					values[0] = this.sg2.getCell(0,i);
					values[1] = this.sg2.getCell(1,i);		
					this.sg1.addRowValues(values);	
				}
				this.sg2.clear();
			}else if (sender == this.b2)
			{
				if (this.sg2.rows.getLength() > 0){
					var values = [];
					values[0] = this.sg2.getCell(0,this.sg2.row);
					values[1] = this.sg2.getCell(1,this.sg2.row);		
					this.sg1.addRowValues(values);
					this.sg2.delRow(this.sg2.row);
				}
			}else if (sender == this.b3)
			{	
				if (this.sg1.rows.getLength() > 0){
					var values = [];
					values[0] = this.sg1.getCell(0,this.sg1.row);
					values[1] = this.sg1.getCell(1,this.sg1.row);		
					this.sg2.addRowValues(values);
					this.sg1.delRow(this.sg1.row);
				}
			}else if (sender == this.b4)
			{
				var rowCount = this.sg1.getRowCount();
				var values = [];
				for (var i = 0; i < rowCount;i++)
				{				
					values[0] = this.sg1.getCell(0,i);
					values[1] = this.sg1.getCell(1,i);		
					this.sg2.addRowValues(values);	
				}
				this.sg1.clear();
			}
			hideProgress();
		}catch(e){
			systemAPI.alert(e);
		}
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","");	
		else if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","");
		else if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","");
		else if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","");	
	},
	doModalResult: function(event, modalResult, value){
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.sg1.clear();
					this.sg2.clear();
					this.e0.setText("");
					this.eFind.setText("");				
				}
				break;
			case "simpan" :
				if (modalResult == mrOk)
				{
					var rows = undefined;
					var values = "";
					var sqlValue = "";
					var sql2 = "insert into klp_akses_m (kode_klp_akses, kode_form, user_id, tgl_input) values ";
					for (var i = 0; i < this.sg2.rows.getLength(); i++)
					{				
						values = "'"+this.e0.getText()+"','"+this.sg2.getCell(0,i)+"','"+this.app._userLog+"',now()";
						sqlValue += ",(" + values +")";
					}
					sqlValue = sqlValue.substr(1);
					sql2 += sqlValue;
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from klp_akses_m where kode_klp_akses = '"+this.e0.getText()+"' ");
					sql.add(sql2);
					this.dbLib.execArraySQL(sql);		
				}
				break;
			case "ubah" :
				
				if (modalResult == mrOk)
				{
					var rows = undefined;
					var values = "";
					var sqlValue = "";
					
					var sql2 = "insert into klp_akses_m (kode_klp_akses, kode_form) values ";
					for (var i = 0; i < this.sg2.rows.getLength(); i++)
					{				
						values = "'"+this.e0.getText()+"','"+this.sg2.getCell(0,i)+"'";
						sqlValue += ",(" + values +")";
					}
					sqlValue = sqlValue.substr(1);
					sql2 += sqlValue;
					uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from klp_akses_m where kode_klp_akses = '"+this.e0.getText()+"'");
					sql.add(sql2);
					this.dbLib.execArraySQL(sql);		
				}			
				break;
			case "hapus" :
				if (modalResult == mrOk)
					this.dbLib.execQuery("delete from klp_akses_m where kode_klp_akses = '"+this.e0.getText()+"'");						
				break;
		}
	}
});