window.app_saku_mb_grafik_flSdmGrafik = function(owner)
{
	if (owner)
	{
		window.app_saku_mb_grafik_flSdmGrafik.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_mb_grafik_flSdmGrafik";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Grafik Perhitungan SDM", 2);
		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(150);
		this.p1.setBorder(3);
		this.p1.setCaption("Filter");
		
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1);
		this.sg1.setWidth(700);
		this.sg1.setHeight(100);
		this.sg1.setLeft(10);
		this.sg1.setTop(25);
		this.sg1.setColCount(4);
		this.sg1.onCellExit.set(this, "doCellExit");
		this.sg1.onSelectCell.set(this, "doSelectCell");
		this.sg1.onEllipsClick.set(this, "doEllipseClick");
		this.sg1.onChange.set(this, "sg1onChange");
		
			this.sg1.columns.get(0).setColWidth(250);
			this.sg1.columns.get(0).setTitle("Filter");
			this.sg1.columns.get(0).setReadOnly(true);
			
			this.sg1.columns.get(1).setTitle("Type");
			this.sg1.columns.get(1).setButtonStyle(window.bsAuto);
			var val = new portalui_arrayMap();
			val.set(1, "All");
			val.set(2, "=");
			val.set(3, "Range");
			val.set(4, "Like");
			val.set(5, "<=");
			this.sg1.columns.get(1).setPicklist(val);
			
			this.sg1.columns.get(2).setColWidth(150);
			this.sg1.columns.get(2).setTitle("From");
			this.sg1.columns.get(3).setColWidth(150);
			this.sg1.columns.get(3).setTitle("To");
			
			this.sg1.setRowCount(4);
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);

		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);
		uses("portalui_chart",true);uses("portalui_checkBox");
		this.p2 = new portalui_panel(this,{bound:[10,180,920,300],caption:"Grafik SDM"});
		this.chart1 = new portalui_chart(this.p2,{bound:[0,20,920,280],chartType:2, title:"Grafik SDM",afterDraw:[this,"onAfterDrawChart"],
			rightPadding:150, bottomPadding:40});
		this.cb_cetak = new portalui_checkBox(this.p1, {bound:[10,this.sg1.top + this.sg1.height + 4, 100,20],caption:"Cetak"});
		
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3],["13","13","3","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3],[2,2,0,0]);
	
	uses("util_gridLib");
	this.gridLib = new util_gridLib();
	
	uses("util_standar");
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;	
	this.gridLib.SGEditData(this.sg1,0,[0,1,2], ["Kode Klp","All",""]);	
	this.gridLib.SGEditData(this.sg1,1,[0,1,2], ["Kode Gedung","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2], ["Jenis Laporan","=","Jabatan"]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2], ["Chart Style","=","Bar"]);	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_mb_grafik_flSdmGrafik.extend(window.portalui_childForm);
window.app_saku_mb_grafik_flSdmGrafik.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row == 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kelompok Gedung",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_klpgedung, nama  from mb_gedung_klp where kode_lokasi ='"+this.app._lokasi+"' ",
														  "select count(*) from mb_gedung_klp where kode_lokasi ='"+this.app._lokasi+"' ",
														  ["kode_klpgedung","nama"],"and",["Kode","Nama"]);
			}	
			if (row == 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Gedung",this.sg1, this.sg1.row, this.sg1.col,
														  "select kode_gedung, nama  from mb_gedung where kode_lokasi ='"+this.app._lokasi+"' "+
														  this.filterRep.filterStr("kode_klpgedung",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and"),
														  "select count(*) from mb_gedung where kode_lokasi ='"+this.app._lokasi+"' "+
														  this.filterRep.filterStr("kode_klpgedung",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and"),
														  ["kode_gedung","nama"],"and",["Kode","Nama"]);
			}		
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["13","13","3","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[2,2,0,0]);		
		try{
			if (row == 2){
				this.sg1.columns.get(2).setPicklist(new portalui_arrayMap({items:["Jabatan","Kelompok Jbtn"]}));
			}
			if (row == 3){
				this.sg1.columns.get(2).setPicklist(new portalui_arrayMap({items:["Bar","Line","Pie"]}));
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2], ["Kode Klp","All",""]);	
				this.gridLib.SGEditData(this.sg1,1,[0,1,2], ["Kode Gedung","All",""]);	
				this.gridLib.SGEditData(this.sg1,2,[0,1,2], ["Jenis Laporan","=","Jabatan"]);	
				this.gridLib.SGEditData(this.sg1,3,[0,1,2], ["Chart Style","=","Bar"]);	
			}
			else
			{
				if (this.cb_cetak.isSelected()){
					this.p1.setVisible(false);
					this.p2.hide();
			    	this.viewer.prepare();
			    	this.viewer.setVisible(true);
			    	this.app._mainForm.pButton.setVisible(false);
			    	this.app._mainForm.reportNavigator.setVisible(true);
				}
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							  this.filterRep.filterStr("e.kode_klpgedung",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							  this.filterRep.filterStr("e.kode_gedung",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				if (this.sg1.cells(2,2)=="Jabatan")
				{
					var sql="select a.nama,c.nama as kriteria,d.nilai as nilai_kritria,a.bmin,a.bmax,b.jumlah,f.nilai as umr, "+
											 "ifnull(case when d.nilai>bmin then round(d.nilai/bmin)*b.jumlah end,0) as sdm, "+
											 "ifnull(case when d.nilai>bmin then round(d.nilai/bmin)*b.jumlah end,0)*f.nilai as nilai, "+
											 "ifnull(case when d.nilai>bmax then round(d.nilai/bmax)*b.jumlah end,0) as sdm_efisien, "+
											 "ifnull(case when d.nilai>bmax then round(d.nilai/bmax)*b.jumlah end,0)*f.nilai as nilai_efisien "+ 
											 "from mb_job a "+
											 "inner join mb_kriteria_job b on a.kode_job=b.kode_job "+
											 "inner join mb_kriteria c on b.kode_kriteria=c.kode_kriteria "+
											 "inner join mb_kriteria_gedung d on c.kode_kriteria=d.kode_kriteria and b.kode_indek=d.kode_indek "+
											 "inner join mb_gedung e on d.kode_gedung=e.kode_gedung "+
											 "inner join mb_umr f on e.kode_kota=f.kode_kota and f.tahun='2009' "+
											 this.filter;											
					this.scriptSqlCount = "select count(*) "+
											"from mb_job a "+
											 "inner join mb_kriteria_job b on a.kode_job=b.kode_job "+
											 "inner join mb_kriteria c on b.kode_kriteria=c.kode_kriteria "+
											 "inner join mb_kriteria_gedung d on c.kode_kriteria=d.kode_kriteria and b.kode_indek=d.kode_indek  "+
											 "inner join mb_gedung e on d.kode_gedung=e.kode_gedung "+
											 "inner join mb_umr f on e.kode_kota=f.kode_kota and f.tahun='2009' "+
											 this.filter;				
					this.title = new server_util_arrayList({items:["Nama Jabatan","Kriteria","Nilai Kriteria","Min","Max","Jumlah","UMR","SDM","Nilai SDM","SDM Efisien","Nilai Efisien"]});			
					this.widthTable = new server_util_arrayList({items:[150, 150,80,50,50,50,80,50,80,50,80]});
					this.fieldType = new server_util_arrayList({items:["S","S","N","N","N","N","N","N","N","N","N"]});			
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","Y","Y","Y","Y"]});			

				}
				else
				{
					var sql="select g.nama,c.nama as kriteria,d.nilai as nilai_kriteria,sum(b.jumlah) as jumlah, "+
											 "sum(ifnull(case when d.nilai>bmin then round(d.nilai/bmin)*b.jumlah end,0)) as sdm, "+
											 "sum(ifnull(case when d.nilai>bmin then round(d.nilai/bmin)*b.jumlah end,0)*f.nilai) as nilai, "+
											 "sum(ifnull(case when d.nilai>bmax then round(d.nilai/bmax)*b.jumlah end,0)) as sdm_efisien, "+
											 "sum(ifnull(case when d.nilai>bmax then round(d.nilai/bmax)*b.jumlah end,0)*f.nilai) as nilai_efisien "+ 
											 "from mb_job a "+
											 "inner join mb_kriteria_job b on a.kode_job=b.kode_job "+
											 "inner join mb_kriteria c on b.kode_kriteria=c.kode_kriteria "+
											 "inner join mb_kriteria_gedung d on c.kode_kriteria=d.kode_kriteria and b.kode_indek=d.kode_indek "+
											 "inner join mb_gedung e on d.kode_gedung=e.kode_gedung "+
											 "inner join mb_umr f on e.kode_kota=f.kode_kota and f.tahun='2009' "+
											 "inner join mb_job_klp g on a.kode_klpjob=g.kode_klpjob "+this.filter+
											 " group by a.kode_klpjob "+
											 "order by a.kode_klpjob";
					this.scriptSqlCount = "select count(*) "+
										"from mb_job a "+
											 "inner join mb_kriteria_job b on a.kode_job=b.kode_job "+
											 "inner join mb_kriteria c on b.kode_kriteria=c.kode_kriteria "+
											 "inner join mb_kriteria_gedung d on c.kode_kriteria=d.kode_kriteria and b.kode_indek=d.kode_indek "+
											 "inner join mb_gedung e on d.kode_gedung=e.kode_gedung "+
											 "inner join mb_umr f on e.kode_kota=f.kode_kota and f.tahun='2009' "+
											 "inner join mb_job_klp g on a.kode_klpjob=g.kode_klpjob "+											 											 
											 this.filter+
											 "group by a.kode_klpjob ";
					this.title = new server_util_arrayList({items:["Nama Jabatan","Kriteria","Nilai Kriteria","Jumlah","SDM","Nilai SDM","SDM Efisien","Nilai Efisien"]});			
					this.widthTable = new server_util_arrayList({items:[150, 150,80,40,40,90,40,90]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","N","N","N","N","N"]});			
					this.summary = new server_util_arrayList({items:["N","N","N","N","Y","Y","Y","Y"]});			

				}
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true,undefined,this.summary);	
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();	
				this.sqlHtml = dthtml;
				this.previewReport(dthtml);				
				this.previewGrafik(sql);
			}
	    }catch(e){
			systemAPI.alert("[app_saku_mb_grafik_flSdmGrafik]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		switch (methodName)
		{
			case "preview" : 
				this.viewer.preview(result);			
				break;
			
		}
	},
	doSelectedPage: function(sender, page){
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,false);			
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>HITUNG SDM<br>";			
		var d = new Date();
		html += "<br><span style='font-size:9;'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<div align='center'>"+dthtml+"</div>";
		this.viewer.preview(html);					
		this.allHtml = html;
	},
	doCloseReportClick: function(sender){
	  switch(sender.getName())
	  {
	    case "allBtn" :
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);			
		  this.previewReport(dthtml);			
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_pulau");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_pulau");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
		case "PreviewBtn" :        
			var win = window.open("");
			win.document.write(loadCSS("server_util_laporan"));
			win.document.write(this.allHtml);
			win.document.close();
		break;
		case "PrintBtn" :        		
	      try
	      {        
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,false);			
			this.previewReport(dthtml);
			this.viewer.enabledIframe();	
	        var winfram= window.frames[this.viewer.getFullId() +"_iframe"];
			winfram.document.open();
			winfram.document.write(loadCSS("server_util_laporan"));
			winfram.document.write(this.allHtml);
			winfram.document.close();
			window.frames[this.viewer.getFullId() +"_iframe"].focus();
	        window.frames[this.viewer.getFullId() +"_iframe"].print();
	      }catch(e)
	      {alert(e);}      
	      break;   
	    case "create" :    
	    case "edit"   :
	    case "del" 	  :
	    case "graph"  :
	      break;   
	    default :
	        this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
			this.p2.show();
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      break;  
	  }
	},
	sg1onChange: function(sender, col , row){
	    if (col==1)
		{
	     if (this.sg1.getCell(1,row)=="All")
		 {
			this.sg1.setCell(2,row,"");
			this.sg1.setCell(3,row,"");
		 }
		}
		if (col == 2 && row == 3){			
			switch(this.sg1.cells(2,3)){
				case "Bar" : this.chart1.setChartType(2); break;
				case "Line" : this.chart1.setChartType(1); break;
				case "Pie" : this.chart1.setChartType(3); break;
			}
		}
	},
	doRowPerPageChange: function(sender, rowperpage){		
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	},
	previewGrafik: function(sql){		
		switch(this.sg1.cells(2,3)){
			case "Bar" : this.chart1.setChartType(2); break;
			case "Line" : this.chart1.setChartType(1); break;
			case "Pie" : this.chart1.setChartType(3); break;
		}
		var data = this.dbLib.getDataProvider(sql,true);
		var line,series = "", sdm="{",ef="{";
		var maxValue = -99999999,minValue = 999999999;		
		for (var i in data.rs.rows){
			line = data.rs.rows[i];
			if (i > 0){
				sdm += ",";
				ef += ",";
			}
			if (maxValue < parseFloat(line.sdm)) maxValue = parseFloat(line.sdm);
			if (minValue > parseFloat(line.sdm)) minValue = parseFloat(line.sdm);
			if (maxValue < parseFloat(line.sdm_efisien)) maxValue = parseFloat(line.sdm_efisien);
			if (minValue > parseFloat(line.sdm_efisien)) minValue = parseFloat(line.sdm_efisien);
			sdm += "\"" + line.nama+"\":"+line.sdm;
			ef += "\""+line.nama +"\":"+line.sdm_efisien;
		}
		this.chart1.setMaxValue(maxValue);
		this.chart1.setMinValue(minValue);
		sdm += "}";
		ef += "}";
		series = "{\"sdm\" : "+sdm+",\"sdm efisien\" :"+ef +"}";			
		series = eval("("+series+")");	
		this.chart1.setDataProvider(series);				
		if (this.cb_cetak.isSelected()){
			var canvas = this.chart1.getChartImage();
			var painter = this.chart1.getPainter();		
			var html = "</br></br><div style='position:relative;left:10;width:100;height:"+this.p2.height+"'>"+this.chart1.getCanvas().innerHTML;
			html = html.replace("id"," ");				
			html += "<image style='"+painter.style.cssText+"' src='"+canvas+"'/></div>";						
			this.sqlHtml += html;			
			this.previewReport(this.sqlHtml);
		}		
	},
	onAfterDrawChart : function(sender, chartType){		
	},
	makeDataURI : function(strData, strMime) {
		return "data:" + strMime + ";base64," + strData;
	},
	// generates a <img> object containing the imagedata
	makeImageObject: function(strSource) {
		var oImgElement = document.createElement("img");
		oImgElement.src = strSource;
		return oImgElement;
	}
});
	