/* **********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
********************************************************************************************** */
window.app_saku_dashboard_dbHr = function(owner)
{
    if (owner)
    {
		try{
			this.className = "app_saku_dashboard_dbHr";
	        window.app_saku_dashboard_dbHr.prototype.parent.constructor.call(this, owner);        
	        this.setWidth(500);
	        this.setHeight(425);
			this.setLeft(system.screenWidth / 2 - 250);			
			this.setCaption("roojaXIDE");
			this.onClose.set(this,"doClose");
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			
			uses("portalui_pageControl;portalui_childPage",true);
			this.pControl = new portalui_pageControl(this);
			this.pControl.setBGColor(system.getConfig("form.color"));
			this.pControl.setTop(1);
			this.pControl.setWidth(this.width);
			this.pControl.setHeight(this.height);
			this.pControl.setLeft(0);
			
			this.page1 = new portalui_childPage(this.pControl);
			this.page1.setCaption("Karyawan");
			this.page2 = new portalui_childPage(this.pControl);
		    this.page2.setCaption("Penggajian");
			this.page3 = new portalui_childPage(this.pControl);
		    this.page3.setCaption("Kesehatan");
			
			this.brefresh = new portalui_button(this);
			this.brefresh.setLeft(system.screenWidth-100);
			this.brefresh.setTop(2);
			this.brefresh.setIcon("url(icon/"+system.getThemes()+"/refresh.png)");
			this.brefresh.setCaption("Refresh");
			this.brefresh.onClick.set(this,"doReFresh");
			
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Dashboard HRMIS", 0);	
			
			this.doLoadDashboard();
			this.createBlock();
		}catch(e){				
			this.app.alert(e,"");
		}
    }
};
window.app_saku_dashboard_dbHr.extend(window.portalui_childForm);
window.app_saku_dashboard_dbHr.prototype.createBlock = function()
{
	this.block = new portalui_panel(this);
	this.block.setLeft(0);
	this.block.setWidth(system.screenWidth);
	this.block.setHeight(system.screenHeight-82);
	this.block.setTop(0);
	this.block.setBorder(0);
	this.block.getCanvas().style.background="url(image/themes/dynpro/bg.png) repeat";
	this.block.hide();
	
	this.childBlock = new portalui_panel(this);
	this.childBlock.setLeft(0);  		
	this.childBlock.setWidth(system.screenWidth);
	this.childBlock.setHeight(system.screenHeight-82);
	this.childBlock.setTop(0);
	this.childBlock.setBorder(0);
	this.childBlock.setColor("#FFF");
	this.childBlock.getCanvas().style.zIndex = 999999;
	this.childBlock.hide();
	
	this.load = new portalui_image(this.childBlock);
	this.load.setLeft(this.childBlock.getWidth() / 2 - 15);
	this.load.setTop(this.childBlock.getHeight() / 2 - 30);
	this.load.setWidth(31);
	this.load.setHeight(31);
	this.load.setImage("image/gridload.gif");
};
window.app_saku_dashboard_dbHr.prototype.doReFresh = function(sender)
{
	this.childBlock.show();
	this.panel1.free();
	this.doLoadDashboard();
	this.doAfterResize(this.getwidth,this.getheight);
	this.childBlock.hide();
};
window.app_saku_dashboard_dbHr.prototype.doLoadDashboard = function()
{
	try{
		this.panel1 = new portalui_panel(this.page1);
		this.panel1.setLeft(0);  		
		this.panel1.setWidth(system.screenWidth-3);
		this.panel1.setHeight(system.screenHeight-110);
		this.panel1.setTop(0);
		this.panel1.setBorder(0);
		this.panel1.getCanvas().style.background = "";
		uses("portalui_frame",true);
		uses("portalui_chart",true);
		this.fr1 = new portalui_frame(this.panel1);			
		this.fr1.setLeft(10);
		this.fr1.setTop(30);
		this.fr1.setWidth(this.width / 2 - 30);
		this.fr1.setHeight(this.height - 80);	        
		this.fr1.onAfterResize.set(this,"frameAfterResize");
		this.fr1.setTitle("&nbsp; Status Pegawai");
		
		this.fr1.chart = new portalui_chart(this.fr1);
		this.fr1.chart.setLeft(5);
		this.fr1.chart.setTop(0);
		this.fr1.chart.setWidth(this.fr1.width-10);
		this.fr1.chart.setHeight(this.fr1.height-35);
		this.fr1.chart.setRightPadding(0);
		this.fr1.chart.setChartType(2);
		this.fr1.chart.setShowBorder(false);
		this.fr1.chart.onSeriesClick.set(this,"doSeriesClick");
		this.fr1.chart.setTitle("");
		minVal = 999999;
		maxVal = -999999;
		
		var data = this.dbLib.runSQL("select d.nama,d.kode_lokasi,count(a.kode_status) as jum "+
			"from (select b.kode_status,b.nama,c.kode_lokasi from hr_status2 b cross join hr_lokasi c where b.kode_lokkonsol=c.kode_lokkonsol) d "+
			"left outer join hr_dinas2 a on d.kode_lokasi=a.kode_lokasi and a.kode_status=d.kode_status "+
			"group by d.kode_status,d.kode_lokasi "+
			"order by d.nama,d.kode_lokasi");
		var result = new portalui_arrayMap();
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				var status="";
				var cek=false;
				for (var i in data.objList)
				{
					if (status!=data.get(i).get("nama"))
					{
						if (i == 0) var statusAwal=data.get(i).get("nama");
						if (cek) result.set(status,serie);
						var serie = new portalui_arrayMap();
						serie.set(data.get(i).get("kode_lokasi"),data.get(i).get("jum"));
						cek=true;
						status=data.get(i).get("nama");
					}else
					{
						serie.set(data.get(i).get("kode_lokasi"),data.get(i).get("jum"));
						status=data.get(i).get("nama");
					}
				}
				result.set(status,serie);
			}
		}
		if (result instanceof portalui_arrayMap)
		{
			var serie;
			var cekNol=false;
			for (var i in result.objList)
			{
				serie = result.objList[i];
				for (var j in serie.objList)
				{
					if (serie.objList[j] != 0)
					{
						if (serie.objList[j] < minVal)
							minVal = parseInt(serie.objList[j], 10);
						if (serie.objList[j] > maxVal)
							maxVal = parseInt(serie.objList[j], 10);
						val = serie.objList[j];
						cekNol=true;
					}else cekNol=false;
					if (cekNol)
					{
						if (result.objList[statusAwal].objList[j]==0)
							this.fr1.chart.addSerieData(statusAwal, j, undefined);
						this.fr1.chart.addSerieData(i, j, val);
					}
				}
			}
		}
		if (minVal != 0)
			this.fr1.chart.setMinValue(0);
		else
			this.fr1.chart.setMinValue(0);				
		this.fr1.chart.setMaxValue(maxVal + 1);			
		this.fr1.chart.update();
		
		this.fr2 = new portalui_frame(this.panel1);			
		this.fr2.setLeft(this.width / 2 - 10);
		this.fr2.setTop(30);
		this.fr2.setWidth(this.width / 2 - 30);
		this.fr2.setHeight(this.height - 80);	        
		this.fr2.onAfterResize.set(this,"frameAfterResize");
		this.fr2.setTitle("&nbsp; Lokasi Kerja");
		this.fr2.chart = new portalui_chart(this.fr2);
		this.fr2.chart.setLeft(5);
		this.fr2.chart.setTop(0);
		this.fr2.chart.setWidth(this.fr2.width - 10);
		this.fr2.chart.setHeight(this.fr2.height - 35);
		this.fr2.chart.setRightPadding(0);
		this.fr2.chart.setChartType(2);
		this.fr2.chart.setShowBorder(false);
		this.fr2.chart.onSeriesClick.set(this,"doSeriesClick");
		this.fr2.chart.setTitle("");
		minVal = 999999;
		maxVal = -999999;	
		data = this.dbLib.runSQL("select d.kode_lokasi,count(a.kode_status) as jum "+
			"from (select b.kode_status,b.nama,c.kode_lokasi from hr_status2 b cross join hr_lokasi c where b.kode_lokkonsol=c.kode_lokkonsol) d "+
			"left outer join hr_dinas2 a on d.kode_lokasi=a.kode_lokasi and a.kode_status=d.kode_status "+
			"group by d.kode_lokasi order by d.kode_lokasi");
		var result = new portalui_arrayMap();
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				for (var i in data.objList)
				{
					var serie = new portalui_arrayMap();
					serie.set("Loker",data.get(i).get("jum"));
					result.set(data.get(i).get("kode_lokasi"),serie);
				}
			}
		}
		if (result instanceof portalui_arrayMap)
		{
			var serie;
			var cekNol=false;
			for (var i in result.objList)
			{
				serie = result.objList[i];
				for (var j in serie.objList)
				{
					if (serie.objList[j] != 0)
					{
						if (serie.objList[j] < minVal)
							minVal = parseInt(serie.objList[j], 10);
						if (serie.objList[j] > maxVal)
							maxVal = parseInt(serie.objList[j], 10);
						val = serie.objList[j];
						cekNol=true;
					}else cekNol=false;
					if (cekNol)
						this.fr2.chart.addSerieData(i, j, val);
				}
			}
		}
		
		if (minVal != 0)
			this.fr2.chart.setMinValue(0);
		else
			this.fr2.chart.setMinValue(0);				
		this.fr2.chart.setMaxValue(maxVal + 1);			
		this.fr2.chart.update();
		
		this.fr3 = new portalui_frame(this.panel1);			
		this.fr3.setLeft(10);
		this.fr3.setTop(30);
		this.fr3.setWidth(this.width / 2 - 30);
		this.fr3.setHeight(this.height - 80);	        
		this.fr3.onAfterResize.set(this,"frameAfterResize");
		this.fr3.setTitle("&nbsp; Jabatan Struktural");					

		this.fr3.chart = new portalui_chart(this.fr3);
		this.fr3.chart.setLeft(5);
		this.fr3.chart.setTop(0);
		this.fr3.chart.setWidth(this.fr1.width-10);
		this.fr3.chart.setHeight(this.fr1.height-35);
		this.fr3.chart.setRightPadding(0);
		this.fr3.chart.setChartType(2);
		this.fr3.chart.setShowBorder(false);
		this.fr3.chart.onSeriesClick.set(this,"doSeriesClick");
		this.fr3.chart.setTitle("");
		minVal = 999999;
		maxVal = -999999;
		
		var data = this.dbLib.runSQL("select d.nama,d.kode_lokasi,count(a.kode_jabs) as jum "+
						"from (select b.kode_jab,b.nama,c.kode_lokasi,b.jenis from hr_jabatan b cross join hr_lokasi c where b.kode_lokkonsol=c.kode_lokkonsol) d "+
						"left outer join hr_jabs a on d.kode_lokasi=a.kode_lokasi and a.kode_jabs=d.kode_jab and a.status_aktif='1' "+
						"where d.jenis='STRUKTURAL' "+
						"group by d.nama,d.kode_lokasi "+
						"order by d.nama,d.kode_lokasi");
		var result = new portalui_arrayMap();
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				var status="";
				var cek=false;
				for (var i in data.objList)
				{
					if (status!=data.get(i).get("nama"))
					{
						if (i == 0) var statusAwal=data.get(i).get("nama");
						if (cek) result.set(status,serie);
						var serie = new portalui_arrayMap();
						serie.set(data.get(i).get("kode_lokasi"),data.get(i).get("jum"));
						cek=true;
						status=data.get(i).get("nama");
					}else
					{
						serie.set(data.get(i).get("kode_lokasi"),data.get(i).get("jum"));
						status=data.get(i).get("nama");
					}
				}
				result.set(status,serie);
			}
		}
		if (result instanceof portalui_arrayMap)
		{
			var serie;
			var cekNol=false;
			for (var i in result.objList)
			{
				serie = result.objList[i];
				for (var j in serie.objList)
				{
					if (serie.objList[j] != 0)
					{
						if (serie.objList[j] < minVal)
							minVal = parseInt(serie.objList[j], 10);
						if (serie.objList[j] > maxVal)
							maxVal = parseInt(serie.objList[j], 10);
						val = serie.objList[j];
						cekNol=true;
					}else cekNol=false;
					if (cekNol)
					{
						if (result.objList[statusAwal].objList[j]==0)
							this.fr3.chart.addSerieData(statusAwal, j, undefined);
						this.fr3.chart.addSerieData(i, j, val);
					}
				}
			}
		}
		
		if (minVal != 0)
			this.fr3.chart.setMinValue(0);
		else
			this.fr3.chart.setMinValue(0);				
		this.fr3.chart.setMaxValue(maxVal + 1);			
		this.fr3.chart.update();	
		
		this.fr4 = new portalui_frame(this.panel1);			
		this.fr4.setLeft(10);
		this.fr4.setTop(30);
		this.fr4.setWidth(this.width / 2 - 30);
		this.fr4.setHeight(this.height - 80);	        
		this.fr4.onAfterResize.set(this,"frameAfterResize");
		this.fr4.setTitle("&nbsp; Jabatan Fungsional");					
		
		this.fr4.chart = new portalui_chart(this.fr4);
		this.fr4.chart.setLeft(5);
		this.fr4.chart.setTop(0);
		this.fr4.chart.setWidth(this.fr1.width-10);
		this.fr4.chart.setHeight(this.fr1.height-35);
		this.fr4.chart.setRightPadding(0);
		this.fr4.chart.setChartType(2);
		this.fr4.chart.setShowBorder(false);
		this.fr4.chart.onSeriesClick.set(this,"doSeriesClick");
		this.fr4.chart.setTitle("");
		minVal = 999999;
		maxVal = -999999;	
		var data = this.dbLib.runSQL("select d.nama,d.kode_lokasi,count(a.kode_jabf) as jum "+
						"from (select b.kode_jab,b.nama,c.kode_lokasi,b.jenis from hr_jabatan b cross join hr_lokasi c where b.kode_lokkonsol=c.kode_lokkonsol) d "+
						"left outer join hr_jabf a on d.kode_lokasi=a.kode_lokasi and a.kode_jabf=d.kode_jab and a.status_aktif='1' "+
						"where d.jenis='FUNGSIONAL' "+
						"group by d.nama,d.kode_lokasi "+
						"order by d.nama,d.kode_lokasi");
		var result = new portalui_arrayMap();
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				var status="";
				var cek=false;
				for (var i in data.objList)
				{
					if (status!=data.get(i).get("nama"))
					{
						if (i == 0) var statusAwal=data.get(i).get("nama");
						if (cek) result.set(status,serie);
						var serie = new portalui_arrayMap();
						serie.set(data.get(i).get("kode_lokasi"),data.get(i).get("jum"));
						cek=true;
						status=data.get(i).get("nama");
					}else
					{
						serie.set(data.get(i).get("kode_lokasi"),data.get(i).get("jum"));
						status=data.get(i).get("nama");
					}
				}
				result.set(status,serie);
			}
		}
		if (result instanceof portalui_arrayMap)
		{
			var serie;
			var cekNol=false;
			for (var i in result.objList)
			{
				serie = result.objList[i];
				for (var j in serie.objList)
				{
					if (serie.objList[j] != 0)
					{
						if (serie.objList[j] < minVal)
							minVal = parseInt(serie.objList[j], 10);
						if (serie.objList[j] > maxVal)
							maxVal = parseInt(serie.objList[j], 10);
						val = serie.objList[j];
						cekNol=true;
					}else cekNol=false;
					if (cekNol)
					{
						if (result.objList[statusAwal].objList[j]==0)
							this.fr4.chart.addSerieData(statusAwal, j, undefined);
						this.fr4.chart.addSerieData(i, j, val);
					}
				}
			}
		}
		if (minVal != 0)
			this.fr4.chart.setMinValue(0);
		else
			this.fr4.chart.setMinValue(0);				
		this.fr4.chart.setMaxValue(maxVal + 1);			
		this.fr4.chart.update();	
		
		this.fr5 = new portalui_frame(this.panel1);			
		this.fr5.setLeft(10);
		this.fr5.setTop(30);
		this.fr5.setWidth(this.width / 2 - 30);
		this.fr5.setHeight(this.height - 80);	        
		this.fr5.onAfterResize.set(this,"frameAfterResize");
		this.fr5.setTitle("&nbsp; Tenaga Perbantuan");					
		
		this.fr5.chart = new portalui_chart(this.fr5);
		this.fr5.chart.setLeft(5);
		this.fr5.chart.setTop(0);
		this.fr5.chart.setWidth(this.fr1.width-10);
		this.fr5.chart.setHeight(this.fr1.height-35);
		this.fr5.chart.setRightPadding(0);
		this.fr5.chart.setChartType(2);
		this.fr5.chart.setShowBorder(false);
		this.fr5.chart.onSeriesClick.set(this,"doSeriesClick");
		this.fr5.chart.setTitle("");
		minVal = 999999;
		maxVal = -999999;
		data = this.dbLib.runSQL("select d.kode_lokasi,count(a.kode_bantu) as jum "+
			"from (select b.kode_bantu,b.nama,c.kode_lokasi from hr_bantu b cross join hr_lokasi c where b.kode_lokkonsol=c.kode_lokkonsol) d "+
			"left outer join hr_dinas2 a on d.kode_lokasi=a.kode_lokasi and a.kode_bantu=d.kode_bantu "+
			"group by d.kode_lokasi order by d.kode_lokasi");
		var result = new portalui_arrayMap();
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				for (var i in data.objList)
				{
					var serie = new portalui_arrayMap();
					serie.set("Loker",data.get(i).get("jum"));
					result.set(data.get(i).get("kode_lokasi"),serie);
				}
			}
		}
		if (result instanceof portalui_arrayMap)
		{
			var serie;
			var cekNol=false;
			for (var i in result.objList)
			{
				serie = result.objList[i];
				for (var j in serie.objList)
				{
					if (serie.objList[j] != 0)
					{
						if (serie.objList[j] < minVal)
							minVal = parseInt(serie.objList[j], 10);
						if (serie.objList[j] > maxVal)
							maxVal = parseInt(serie.objList[j], 10);
						val = serie.objList[j];
						cekNol=true;
					}else cekNol=false;
					if (cekNol)
						this.fr5.chart.addSerieData(i, j, val);
				}
			}
		}
		
		if (minVal != 0)
			this.fr5.chart.setMinValue(0);
		else
			this.fr5.chart.setMinValue(0);				
		this.fr5.chart.setMaxValue(maxVal + 1);			
		this.fr5.chart.update();	
		
		this.fr6 = new portalui_frame(this.panel1);			
		this.fr6.setLeft(10);
		this.fr6.setTop(30);
		this.fr6.setWidth(this.width / 2 - 30);
		this.fr6.setHeight(this.height - 80);	        
		this.fr6.onAfterResize.set(this,"frameAfterResize");
		this.fr6.setTitle("&nbsp; Profesi");					
		
		this.fr6.chart = new portalui_chart(this.fr6);
		this.fr6.chart.setLeft(5);
		this.fr6.chart.setTop(0);
		this.fr6.chart.setWidth(this.fr1.width-10);
		this.fr6.chart.setHeight(this.fr1.height-35);
		this.fr6.chart.setRightPadding(0);
		this.fr6.chart.setChartType(2);
		this.fr6.chart.setShowBorder(false);
		this.fr6.chart.onSeriesClick.set(this,"doSeriesClick");
		this.fr6.chart.setTitle("");
		minVal = 999999;
		maxVal = -999999;
		var data = this.dbLib.runSQL("select a.nama,count(b.kode_profesi2) as jum "+
					"from hr_profesi a left outer join hr_rwyprofesi b on a.kode_profesi=b.kode_profesi2 and a.kode_lokkonsol=b.kode_lokkonsol "+
					"group by a.nama");
		var result = new portalui_arrayMap();
		if (data instanceof portalui_arrayMap)
		{
			if (data.get(0) != undefined)
			{
				for (var i in data.objList)
				{
					var serie = new portalui_arrayMap();
					serie.set("Profesi",data.get(i).get("jum"));
					result.set(data.get(i).get("nama"),serie);
				}
			}
		}
		if (result instanceof portalui_arrayMap)
		{
			var serie;
			var cekNol=false;
			for (var i in result.objList)
			{
				serie = result.objList[i];
				for (var j in serie.objList)
				{
					if (serie.objList[j] != 0)
					{
						if (serie.objList[j] < minVal)
							minVal = parseInt(serie.objList[j], 10);
						if (serie.objList[j] > maxVal)
							maxVal = parseInt(serie.objList[j], 10);
						val = serie.objList[j];
						cekNol=true;
					}else cekNol=false;
					if (cekNol)
						this.fr6.chart.addSerieData(i, j, val);
				}
			}
		}
		
		if (minVal != 0)
			this.fr6.chart.setMinValue(0);
		else
			this.fr6.chart.setMinValue(0);				
		this.fr6.chart.setMaxValue(maxVal + 1);			
		this.fr6.chart.update();
		
		this.frameCount = 6;
		this.frameHeight = (this.frameCount > 2 ? this.height / 2 - 40: this.height - 80);
	}catch(e){				
		this.app.alert(e,"");
	}
};
window.app_saku_dashboard_dbHr.prototype.doSeriesClick = function(sender,series,title)
{
	try{
		if (sender == this.fr1.chart)
		{
			this.statusPeg = title.split(":");
			this.lokasi=series;
			this.filter="status";
			this.block.show();
			uses("app_saku_dashboard_fKlikStatus",true);
			var detail = new app_saku_dashboard_fKlikStatus(this);
			detail.setLeft(system.screenWidth/6);
			detail.setWidth(700);
			detail.setHeight(400);
			detail.setTop(20);
			detail.setBorder(3);
			detail.setCaption(this.statusPeg[0]);
			this.panel=detail;
		}
		if (sender == this.fr2.chart)
		{
			this.filter="loker";
			var temp=title.split(":");
			this.lokasi=temp[0];
			this.block.show();
			uses("app_saku_dashboard_fKlikStatus",true);
			var detail2 = new app_saku_dashboard_fKlikStatus(this);
			detail2.setLeft(system.screenWidth/6);
			detail2.setWidth(700);
			detail2.setHeight(400);
			detail2.setTop(20);
			detail2.setBorder(3);
			detail2.setCaption("Loker : "+this.lokasi);
			this.panel=detail2;
		}
		if (sender == this.fr3.chart)
		{
			this.statusPeg = title.split(":");
			this.lokasi=series;
			this.filter="jabs";
			this.block.show();
			uses("app_saku_dashboard_fKlikStatus",true);
			var detail3 = new app_saku_dashboard_fKlikStatus(this);
			detail3.setLeft(system.screenWidth/6);
			detail3.setWidth(700);
			detail3.setHeight(400);
			detail3.setTop(20);
			detail3.setBorder(3);
			detail3.setCaption(this.statusPeg[0]+" Loker : "+this.lokasi);
			this.panel=detail3;
		}
		if (sender == this.fr4.chart)
		{
			this.statusPeg = title.split(":");
			this.lokasi=series;
			this.filter="jabf";
			this.block.show();
			uses("app_saku_dashboard_fKlikStatus",true);
			var detail4 = new app_saku_dashboard_fKlikStatus(this);
			detail4.setLeft(system.screenWidth/6);
			detail4.setWidth(700);
			detail4.setHeight(400);
			detail4.setTop(20);
			detail4.setBorder(3);
			detail4.setCaption(this.statusPeg[0]+" Loker : "+this.lokasi);
			this.panel=detail4;
		}
		if (sender == this.fr5.chart)
		{
			this.filter="bantu";
			var temp=title.split(":");
			this.lokasi=temp[0];
			this.block.show();
			uses("app_saku_dashboard_fKlikStatus",true);
			var detail5 = new app_saku_dashboard_fKlikStatus(this);
			detail5.setLeft(system.screenWidth/6);
			detail5.setWidth(700);
			detail5.setHeight(400);
			detail5.setTop(20);
			detail5.setBorder(3);
			detail5.setCaption("Loker : "+this.lokasi);
			this.panel=detail5;
		}
		if (sender == this.fr6.chart)
		{
			this.filter="profesi";
			var temp=title.split(":");
			this.nmProfesi=temp[0];
			this.block.show();
			uses("app_saku_dashboard_fKlikStatus",true);
			var detail6 = new app_saku_dashboard_fKlikStatus(this);
			detail6.setLeft(system.screenWidth/6);
			detail6.setWidth(700);
			detail6.setHeight(400);
			detail6.setTop(20);
			detail6.setBorder(3);
			detail6.setCaption("Profesi : "+this.nmProfesi);
			this.panel=detail6;
		}
	}catch(e){
		alert("window.app_saku_dashboard_dbHr.prototype.doSeriesClick : "+e);
	}
};
window.app_saku_dashboard_dbHr.prototype.doImgClose = function(sender)
{
	this.panel.free();
	this.block.hide();
};
window.app_saku_dashboard_dbHr.prototype.doTrailClose = function()
{
	this.panel.panel.free();
};
window.app_saku_dashboard_dbHr.prototype.doAfterResize = function(width, height)
{	
	try{
		this.getwidth=width;
		this.getheight=height;
		this.frameHeight = (this.frameCount > 2 ? height / 2 - 50: height - 80);
		if (this.frameCount <= 4)
			this.frameWidth = width / 2 - 30;
		else this.frameWidth = width / 3 - 30;
		this.setTop(55);
		this.setHeight(height + 40);
		this.panel1.setWidth(this.width);
		this.panel1.setHeight(this.height-50);
		this.pControl.setWidth(this.width);
		this.pControl.setHeight(this.height-50);
		this.rearrange();
	}catch(e){
		alert(e);
	}
};
window.app_saku_dashboard_dbHr.prototype.rearrange = function()
{
	var c,count = 0;left = 10;
	var top = 30;
	for (var i in this.panel1.childs.objList){
		c = system.getResource(i);			
		if (c instanceof portalui_frame){
			count++;
			if (this.frameCount > 2 && count == this.frameCount / 2 && c.isMinimize) 
				left = 0;
			if (this.frameCount > 2){
				if (count > 2 && this.frameCount <= 4){ 
					top = this.height / 2 - 5;			
					if (count == 3) left = 10;
				}else if (count > 3 && this.frameCount > 4) {
					top = this.height / 2 - 5;											
					if (count == 4) left = 10;
				}
			}			
			if (c.isMinimize) c.setTop(this.height - 50); else c.setTop(top);	
			c.setLeft(left);			
			c.setHeight(this.frameHeight);
			c.setWidth(this.frameWidth);
			left += c.width + 20;									
		}
	}			
};
window.app_saku_dashboard_dbHr.prototype.doMenuClick = function(sender)
{
};
window.app_saku_dashboard_dbHr.prototype.doModalResult = function(sender, modalResult)
{
	if (modalResult == mrOk){		
	}
};
window.app_saku_dashboard_dbHr.prototype.doRequestReady = function(sender, methodName, result)
{	
	if (sender == this.fileExc){
		switch(methodName){
			case "getProperties": 			
				this.properties.setInfo(result);
				break;
		}
	}
};
window.app_saku_dashboard_dbHr.prototype.doToolsClick = function(sender)
{
	if (sender == this.b1)
		this.rta.doTextFormat("forecolor","", sender.left, sender.top);	
	if (sender == this.b2)
			this.rta.getSelection();
	if (sender == this.b4)
		this.rta.getSelectContainer();
	if (sender == this.b3)
		this.rta.toggleMode();
	if (sender == this.b5)
		this.rta.setSelection();
	try{
		//alert(this.toXML());		
	}catch(e){
		alert(e);
	}
};
window.app_saku_dashboard_dbHr.prototype.doKeyDown = function(sender, keyCode)
{
};
window.app_saku_dashboard_dbHr.prototype.doClose = function()
{	
	this.rta.disable();
};
window.app_saku_dashboard_dbHr.prototype.frameAfterResize = function(sender, width, height)
{	
	if (sender.chart !== undefined){		
		sender.chart.setWidth(width-10);	
		sender.chart.setHeight(height-20);		
	}	
};