/* **********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
********************************************************************************************** */
window.app_hrmis_sdm_dashboard_dbManPwr = function(owner)
{
	try{
		if (owner)
		{
			this.cekLoad=false;
			window.app_hrmis_sdm_dashboard_dbManPwr.prototype.parent.constructor.call(this,owner);
			this.className = "app_hrmis_sdm_dashboard_dbManPwr";
			this.setWidth(500);
		    this.setHeight(425);
			this.setLeft(system.screenWidth / 2 - 250);
			this.onClose.set(this,"doClose");
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Dashboard Analisa Man Power", 2);
			uses("portalui_saiGrid;util_filterRep;util_gridLib");
			this.p1 = new portalui_panel(this,{bound:[10,10,702,150],border:3, caption:"Filter"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,127],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:1});
		}
		this.filterRep = new util_filterRep();
		this.filterRep.setSGFilterRowTipe(this.sg1,0,["0"],["3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1,1,["0"],[2]);
		this.gridLib = new util_gridLib();
		this.standar = new util_standar();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.userStatus=this.app._userStatus;
		this.tanda="=";
		this.lokasi=this.app._lokasi;
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	}catch(e){
		alert("app_hrmis_sdm_dashboard_dbManPwr.constructor "+e);
	}
};
window.app_hrmis_sdm_dashboard_dbManPwr.extend(window.portalui_childForm);
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doEllipseClick = function(sender, col, row){
	if (row === 0)
	{
		this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_lokasi, nama from hr_lokasi ",
									  "select count(*) from lokasi ",
									  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
	}
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doSelectCell = function(sender, col, row){
	if (this.userStatus==="A"){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,["0"],["3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,["0"],[2]);
	}else{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,["0"],["3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,["0"],[3]);
	}
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.mainButtonClick = function(sender){
	try
	{
		if (sender == this.app._mainForm.bClear2){ 
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
		}else
		{
			this.p1.hide();
			this.setTop(55);
			this.cekLoad=true;
			this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
			this.doLoadDashboard(this.cekLoad,this.filter);
			this.childBlock.hide();
		}
	}catch(e){
		systemAPI.alert("[app_hrmis_sdm_dashboard_dbManPwr]::mainButtonClick:"+e);
	}
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.createBlock = function()
{
	this.block2 = new portalui_panel(this.db);
	this.block2.setLeft(0);
	this.block2.setWidth(system.screenWidth);
	this.block2.setHeight(system.screenHeight-82);
	this.block2.setTop(0);
	this.block2.setBorder(0);
	this.block2.getCanvas().style.background="url(image/themes/dynpro/bg.png) repeat";
	this.block2.hide();
	
	this.childBlock = new portalui_panel(this.db);
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
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doReFresh = function(sender)
{
	if (sender === this.brefresh){
		this.panel1.free();
		this.panel2.free();
		this.panel3.free();
		this.db.free();
		this.doLoadDashboard(this.cekLoad,this.filter);
		this.childBlock.hide();
	}else if (sender === this.back){
		this.db.free();
		this.setTop(85);
		this.cekLoad=false;
		this.p1.show();
	}
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.setDetailStatus = function(detail,caption)
{
	detail.setLeft(system.screenWidth/6);
	detail.setWidth(700);
	detail.setHeight(400);
	detail.setTop(20);
	detail.setBorder(3);
	detail.setCaption(caption);
	this.panel=detail;
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doSeriesClick = function(sender,series,title)
{
	try{
		if (sender === this.fr1.chart)
		{
			this.sex = title.split(":");
			this.lokasi=series;
			this.filter="sex";
			this.block2.show();
			uses("app_hrmis_sdm_dashboard_fKlikStatus",true);
			var detail = new app_hrmis_sdm_dashboard_fKlikStatus(this);
			this.setDetailStatus(detail,"Data Pegawai "+this.sex[0]);
		}
		if (sender === this.fr2.chart)
		{
			this.filter="umur";
			this.lokasi=series;
			this.umur=title.split(":");
			this.block2.show();
			uses("app_hrmis_sdm_dashboard_fKlikStatus",true);
			var detail2 = new app_hrmis_sdm_dashboard_fKlikStatus(this);
			this.setDetailStatus(detail2,"Data Pegawai Umur : "+this.umur[0]+" Tahun");
		}
		if (sender === this.fr3.chart)
		{
			this.msKrj = title.split(":");
			this.lokasi=series;
			this.filter="masaKerja";
			this.block2.show();
			uses("app_hrmis_sdm_dashboard_fKlikStatus",true);
			var detail3 = new app_hrmis_sdm_dashboard_fKlikStatus(this);
			this.setDetailStatus(detail3,"Data Pegawai Dengan Masa Kerja : "+this.msKrj[0]+" Tahun");
		}
		if (sender === this.fr4.chart)
		{
			this.agama = title.split(":");
			this.lokasi=series;
			this.filter="agama";
			this.block2.show();
			uses("app_hrmis_sdm_dashboard_fKlikStatus",true);
			var detail4 = new app_hrmis_sdm_dashboard_fKlikStatus(this);
			this.setDetailStatus(detail4,"Data Pegawai Dengan Agama : "+this.agama[0]);
		}
		if (sender === this.fr5.chart)
		{
			this.filter="marital";
			this.marital=title.split(":");
			this.lokasi=series;
			this.block2.show();
			uses("app_hrmis_sdm_dashboard_fKlikStatus",true);
			var detail5 = new app_hrmis_sdm_dashboard_fKlikStatus(this);
			this.setDetailStatus(detail5,"Data Pegawai Berdasar Status Kawin : "+this.marital[0]);
		}
		if (sender === this.fr6.chart)
		{
			this.filter="pddkn";
			this.lokasi=series;
			this.pddkn=title.split(":");
			if (this.pddkn[0] === undefined) this.pddkn[0]="";
			this.block2.show();
			uses("app_hrmis_sdm_dashboard_fKlikStatus",true);
			var detail6 = new app_hrmis_sdm_dashboard_fKlikStatus(this);
			this.setDetailStatus(detail6,"Data Pegawai Berdasar Pendidikan : "+this.pddkn[0]);
		}
		if (sender === this.fr7.chart)
		{
			this.filter="statusPeg";
			this.lokasi=series;
			this.statPeg=title.split(":");
			this.block2.show();
			uses("app_hrmis_sdm_dashboard_fKlikStatus",true);
			var detail7 = new app_hrmis_sdm_dashboard_fKlikStatus(this);
			this.setDetailStatus(detail7,"Data Pegawai Berdasar Status : "+this.statPeg[0]);
		}
		if (sender === this.fr8.chart)
		{
			this.filter="tBantu";
			this.lokasi=series;
			this.tBantu=title.split(":");
			this.block2.show();
			uses("app_hrmis_sdm_dashboard_fKlikStatus",true);
			var detail8 = new app_hrmis_sdm_dashboard_fKlikStatus(this);
			this.setDetailStatus(detail8,"Data Pegawai Tenaga Perbantuan : "+this.tBantu[0]);
		}
		if (sender === this.fr9.chart)
		{
			this.filter="jstruk";
			this.lokasi=series;
			this.jstruk=title.split(":");
			this.block2.show();
			uses("app_hrmis_sdm_dashboard_fKlikStatus",true);
			var detail9 = new app_hrmis_sdm_dashboard_fKlikStatus(this);
			this.setDetailStatus(detail9,"Data Pegawai Jabatan Struktural : "+this.jstruk[0]);
		}
		if (sender === this.fr10.chart)
		{
			this.filter="jfung";
			this.lokasi=series;
			this.jfung=title.split(":");
			this.block2.show();
			uses("app_hrmis_sdm_dashboard_fKlikStatus",true);
			var detail10 = new app_hrmis_sdm_dashboard_fKlikStatus(this);
			this.setDetailStatus(detail10,"Data Pegawai Jabatan Fungsional : "+this.jfung[0]);
		}
		if (sender === this.fr11.chart)
		{
			this.filter="prof";
			this.lokasi=series;
			this.prof=title.split(":");
			this.block2.show();
			uses("app_hrmis_sdm_dashboard_fKlikStatus",true);
			var detail11 = new app_hrmis_sdm_dashboard_fKlikStatus(this);
			this.setDetailStatus(detail11,"Data Pegawai Berdasar Profesi : "+this.prof[0]);
		}
		if (sender === this.fr12.chart)
		{
			this.filter="hrloker";
			this.lokasi=series;
			this.hrloker=title.split(":");
			this.block2.show();
			uses("app_hrmis_sdm_dashboard_fKlikStatus",true);
			var detail12 = new app_hrmis_sdm_dashboard_fKlikStatus(this);
			this.setDetailStatus(detail12,"Data Pegawai Berdasar Lokasi Kerja : "+this.hrloker[0]);
		}
		if (sender === this.fr13.chart)
		{
			this.filter="hruker";
			this.lokasi=series;
			this.hruker=title.split(":");
			this.block2.show();
			uses("app_hrmis_sdm_dashboard_fKlikStatus",true);
			var detail13 = new app_hrmis_sdm_dashboard_fKlikStatus(this);
			this.setDetailStatus(detail13,"Data Pegawai Berdasar Unit Kerja : "+this.hruker[0]);
		}
	}catch(e){
		alert("window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doSeriesClick : "+e);
	}
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doImgClose = function(sender)
{
	this.panel.free();
	this.block2.hide();
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doTrailClose = function()
{
	this.panel.panel.free();
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doAfterResize = function(width, height)
{	
	try{
		this.getwidth=width;
		this.getheight=height;		
		//this.setTop(55);
		this.setHeight(height + 40);
		if (this.cekLoad){
			this.db.setWidth(this.width);
			this.db.setHeight(this.height-30);
			this.panel1.setWidth(this.width);
			this.panel1.setHeight(this.height-30);
			this.panel2.setWidth(this.width);
			this.panel2.setHeight(this.height-30);
			this.panel3.setWidth(this.width);
			this.panel3.setHeight(this.height-30);
			this.pControl.setWidth(this.width);
			this.pControl.setHeight(this.height-30);
			this.rearrange(this.panel1);
			this.rearrange(this.panel2);
			this.rearrange(this.panel3);
		}
	}catch(e){
		alert("app_hrmis_sdm_dashboard_dbManPwr::doAfterResize : "+e);
	}
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.rearrange = function(panel)
{
	var c,count = 0;left = 10, frCount = this.frameCount;
	var top = 10,frameWidth = this.frameWidth, frameHeight = this.frameHeight;	
	for (var i in panel.childs.objList){
		c = system.getResource(i);			
		frCount = panel.childs.getLength();		
		frameHeight = (frCount > 2 ? this.height / 2 - 50: this.height - 80);
		if (frCount <= 4)
			frameWidth = this.width / 2 - 30;
		else frameWidth = this.width / 3 - 30;
		if (c instanceof portalui_frame){
			count++;
			if (frCount > 2 && count == frCount / 2 && c.isMinimize) 
				left = 0;
			if (frCount > 2){
				if (count > 2 && frCount <= 4){ 
					top = this.height / 2 - 5;			
					if (count == 3) left = 10;
				}else if (count > 3 && frCount > 4) {
					top = this.height / 2 - 5;											
					if (count == 4) left = 10;
				}
			}			
			if (c.isMinimize) c.setTop(this.height - 50); else c.setTop(top);	
			c.setLeft(left);			
			c.setHeight(frameHeight);
			c.setWidth(frameWidth);
			left += c.width + 20;									
		}
	}			
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.createFrame = function(frame,sql,title)
{
	frame.setLeft(10);
	frame.setTop(30);
	frame.setWidth(this.width / 2 - 30);
	frame.setHeight(this.height - 80);
	frame.onAfterResize.set(this,"frameAfterResize");
	frame.setTitle("&nbsp; <span style='color:#335c9c;font-size:11;font-weight:bold;font-family:Arial'>::&nbsp;"+title+"</span>");
	
	frame.chart = new portalui_chart(frame);
	frame.chart.setLeft(5);
	frame.chart.setTop(0);
	frame.chart.setWidth(this.fr1.width-10);
	frame.chart.setHeight(this.fr1.height-35);
	frame.chart.setRightPadding(80);
	frame.chart.setChartType(2);
	frame.chart.setShowBorder(false);
	frame.chart.onSeriesClick.set(this,"doSeriesClick");
	frame.chart.setTitle("");
	minVal = 999999;
	maxVal = -999999;
	
	var data=this.dbLib.runSQL(sql);
	var result = new portalui_arrayMap();
	if (data instanceof portalui_arrayMap)
	{
		if (data.get(0) != undefined)
		{
			for (var i in data.objList)
			{
				var serie = new portalui_arrayMap();
				serie.set(data.get(i).get("nmcol1"),data.get(i).get("col2"));
				result.set(data.get(i).get("col1"),serie);
			}
		}
	}else alert(data+"\r\n"+sql);
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
					frame.chart.addSerieData(i, j, val);
			}
		}
	}
	if (minVal != 0)
		frame.chart.setMinValue(0);
	else
		frame.chart.setMinValue(0);				
	frame.chart.setMaxValue(maxVal + 1);			
	frame.chart.update();
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doLoadDashboard = function(load,filter)
{
	try{
		if (this.cekLoad){
			this.db = new portalui_panel(this);
			this.db.setLeft(0);  		
			this.db.setWidth(system.screenWidth);
			this.db.setHeight(system.screenHeight);
			this.db.setTop(0);
			this.db.setBorder(0);
			
			uses("portalui_pageControl;portalui_childPage",true);
			this.pControl = new portalui_pageControl(this.db);
			this.pControl.setBGColor(system.getConfig("form.color"));
			this.pControl.setTop(1);
			this.pControl.setWidth(this.width);
			this.pControl.setHeight(system.screenHeight);
			this.pControl.setLeft(0);
			
			this.page1 = new portalui_childPage(this.pControl);
			this.page1.setCaption("Pribadi");
			this.page1.addStyle("background:#edf0f4");
			this.page2 = new portalui_childPage(this.pControl);
			this.page2.setCaption("Riwayat");
			this.page3 = new portalui_childPage(this.pControl);
			this.page3.setCaption("Lokasi");
			
			this.back = new portalui_button(this.db);
			this.back.setLeft(system.screenWidth-180);
			this.back.setTop(2);
			this.back.setIcon("url(icon/"+system.getThemes()+"/Back.png)");
			this.back.setCaption("Back");
			this.back.onClick.set(this,"doReFresh");
			
			this.brefresh = new portalui_button(this.db);
			this.brefresh.setLeft(system.screenWidth-100);
			this.brefresh.setTop(2);
			this.brefresh.setIcon("url(icon/"+system.getThemes()+"/refresh.png)");
			this.brefresh.setCaption("Refresh");
			this.brefresh.onClick.set(this,"doReFresh");
			
			this.panel1 = new portalui_panel(this.page1);
			this.panel1.setLeft(0);  		
			this.panel1.setWidth(system.screenWidth-3);
			this.panel1.setHeight(system.screenHeight);
			this.panel1.setTop(0);
			this.panel1.setBorder(0);
			this.panel1.getCanvas().style.background = "";
			
			this.panel2 = new portalui_panel(this.page2);
			this.panel2.setLeft(0);  		
			this.panel2.setWidth(system.screenWidth-3);
			this.panel2.setHeight(system.screenHeight-110);
			this.panel2.setTop(0);
			this.panel2.setBorder(0);
			this.panel2.getCanvas().style.background = "";
			this.panel3 = new portalui_panel(this.page3);
			this.panel3.setLeft(0);  		
			this.panel3.setWidth(system.screenWidth-3);
			this.panel3.setHeight(system.screenHeight-110);
			this.panel3.setTop(0);
			this.panel3.setBorder(0);
			this.panel3.getCanvas().style.background = "";
			uses("portalui_frame;portalui_chart",true);
			this.createBlock();
			this.childBlock.show();
			
			var sql = "select a.kode_lokasi as nmcol1,a.sex as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	"+filter+" and a.sex in ('Laki-Laki','Perempuan') "+
				"	group by a.kode_lokasi,a.sex";
			this.fr1 = new portalui_frame(this.panel1);
			this.createFrame(this.fr1,sql,"Jenis Kelamin");
			
			sql ="select a.nmcol1,a.col1,a.col2 from ( "+
				"	(select a.kode_lokasi as nmcol1,'20-35' as col1,count(a.tgl_lahir) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	"+filter+" and cast(datediff (year, a.tgl_lahir, getDate()) as decimal)>19 "+
				"	and cast(datediff (year, a.tgl_lahir, getDate()) as decimal)<36 "+
				"	group by a.kode_lokasi) union "+
				"	(select a.kode_lokasi as nmcol1,'36-45' as col1,count(a.tgl_lahir) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	"+filter+" and cast(datediff (year, a.tgl_lahir, getDate()) as decimal)>35 "+
				"	and cast(datediff (year, a.tgl_lahir, getDate()) as decimal)<46 "+
				"	group by a.kode_lokasi) union "+
				"	(select a.kode_lokasi as nmcol1,'>50' as col1,count(a.tgl_lahir) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	"+filter+" and cast(datediff (year, a.tgl_lahir, getDate()) as decimal)>49 "+
				"	group by a.kode_lokasi) "+
				"	) as a";
			this.fr2 = new portalui_frame(this.panel1);
			this.createFrame(this.fr2,sql,"Umur");
			
			sql ="select a.nmcol1,a.col1,a.col2 from ( "+
				"	(select a.kode_lokasi as nmcol1,'<2' as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	"+filter+" and cast(datediff (year, a.tgl_masuk, getDate()) as decimal)<2 "+
				"	group by a.kode_lokasi) union "+
				"	(select a.kode_lokasi as nmcol1,'2<5' as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	"+filter+" and cast(datediff (year, a.tgl_masuk, getDate()) as decimal)>1 "+
				"	and cast(datediff (year, a.tgl_masuk, getDate()) as decimal)<6 "+
				"	group by a.kode_lokasi) union "+
				"	(select a.kode_lokasi as nmcol1,'6<10' as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	"+filter+" and cast(datediff (year, a.tgl_masuk, getDate()) as decimal)>5 "+
				"	and cast(datediff (year, a.tgl_masuk, getDate()) as decimal)<11 "+
				"	group by a.kode_lokasi) "+
				"	) as a";
			this.fr3 = new portalui_frame(this.panel1);
			this.createFrame(this.fr3,sql,"Masa Kerja");
			
			sql ="select a.kode_lokasi as nmcol1,a.agama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+filter+
				"	group by a.kode_lokasi,a.agama";
			this.fr4 = new portalui_frame(this.panel1);
			this.createFrame(this.fr4,sql,"Agama");
			
			sql = "select a.kode_lokasi as nmcol1,a.status as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	"+filter+" and a.status in ('TK','K0','K1','K2','K0') "+
				"	group by a.kode_lokasi,a.status";
			this.fr5 = new portalui_frame(this.panel1);
			this.createFrame(this.fr5,sql,"Status Kawin");
			
			sql = "select a.kode_lokasi as nmcol1,c.institusi as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_rwypddk c on c.nik=b.nik and b.kode_lokkonsol=c.kode_lokkonsol "+
				"	and c.tahun=(select max(tahun) from hr_rwypddk where nik=c.nik) "+filter+
				"	group by a.kode_lokasi,c.institusi,c.jurusan,c.jenjang";
			this.fr6 = new portalui_frame(this.panel1);
			this.createFrame(this.fr6,sql,"Pendidikan");
			
			sql = "select a.kode_lokasi as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_status2 c on b.kode_status=c.kode_status and b.kode_lokkonsol=c.kode_lokkonsol "+filter+
				"	group by a.kode_lokasi,c.nama";
			this.fr7 = new portalui_frame(this.panel2);
			this.createFrame(this.fr7,sql,"Status Pegawai");
			
			sql = "select a.kode_lokasi as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_bantu c on b.kode_bantu=c.kode_bantu and b.kode_lokkonsol=c.kode_lokkonsol "+filter+
				"	group by a.kode_lokasi,c.nama";
			this.fr8 = new portalui_frame(this.panel2);
			this.createFrame(this.fr8,sql,"Tenaga Perbantuan");
			
			sql = "select a.kode_lokasi as nmcol1,d.nama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_jabs c on b.nik=c.nik and b.kode_lokkonsol=c.kode_lokkonsol and c.status_aktif='1' "+
				"	left outer join hr_jabatan d on d.kode_jab=c.kode_jabs and d.kode_lokkonsol=c.kode_lokkonsol "+filter+
				"	group by a.kode_lokasi,d.nama";
			this.fr9 = new portalui_frame(this.panel2);
			this.createFrame(this.fr9,sql,"Jabatan Struktural");
			
			sql = "select a.kode_lokasi as nmcol1,d.nama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_jabf c on b.nik=c.nik and b.kode_lokkonsol=c.kode_lokkonsol and c.status_aktif='1' "+
				"	left outer join hr_jabatan d on d.kode_jab=c.kode_jabf and d.kode_lokkonsol=c.kode_lokkonsol "+filter+
				"	group by a.kode_lokasi, d.nama";
			this.fr10 = new portalui_frame(this.panel2);
			this.createFrame(this.fr10,sql,"Jabatan Fungsional");
			
			sql = "select a.kode_lokasi as nmcol1,d.nama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_rwyprofesi c on b.nik=c.nik and b.kode_lokkonsol=c.kode_lokkonsol and c.status_aktif='1' "+
				"	left outer join hr_profesi d on d.kode_profesi=c.kode_profesi2 and d.kode_lokkonsol=c.kode_lokkonsol "+filter+
				"	group by a.kode_lokasi,d.nama";
			this.fr11 = new portalui_frame(this.panel2);
			this.createFrame(this.fr11,sql,"Profesi");
			
			sql = "select a.kode_lokasi as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_lokasi c on b.kode_lokasi=c.kode_lokasi and b.kode_lokkonsol=c.kode_lokkonsol "+filter+
				"	group by a.kode_lokasi, c.nama";
			this.fr12 = new portalui_frame(this.panel3);
			this.createFrame(this.fr12,sql,"Lokasi Kerja");
			
			sql = "select a.kode_lokasi as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_loker c on b.kode_loker=c.kode_loker and b.kode_lokasi=c.kode_lokasi and b.kode_lokkonsol=c.kode_lokkonsol "+filter+
				"	group by a.kode_lokasi, c.nama";
			this.fr13 = new portalui_frame(this.panel3);
			this.createFrame(this.fr13,sql,"Unit Kerja");
			
			this.frameCount = 6;
			this.frameHeight = (this.frameCount > 2 ? this.height / 2 - 40: this.height - 80);
		}
		this.doAfterResize(this.getwidth,this.getheight);
	}catch(e){				
		this.app.alert(e,"");
	}
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doMenuClick = function(sender)
{
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doModalResult = function(sender, modalResult)
{
	if (modalResult == mrOk){		
	}
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doRequestReady = function(sender, methodName, result)
{	
	if (sender == this.fileExc){
		switch(methodName){
			case "getProperties": 			
				this.properties.setInfo(result);
				break;
		}
	}
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doToolsClick = function(sender)
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
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doKeyDown = function(sender, keyCode)
{
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.doClose = function()
{	
	this.rta.disable();
};
window.app_hrmis_sdm_dashboard_dbManPwr.prototype.frameAfterResize = function(sender, width, height)
{	
	if (sender.chart !== undefined){		
		sender.chart.setWidth(width-10);	
		sender.chart.setHeight(height-20);		
	}	
};