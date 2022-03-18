window.app_hris_dashboard_fDbSdm = function(owner)
{
	if (owner)
	{
		window.app_hris_dashboard_fDbSdm.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_dashboard_fDbSdm";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Dashboard", 2);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;server_report_report");
		uses("childPage;panel;flashChart;timer;toolbar;pageControl;portalui_ConfirmMail;server_util_mail");
		uses("util_filterRep;util_standar;util_gridLib");
		this.filterRep = new util_filterRep();
		this.standar = new util_standar();	
		this.gridLib = new util_gridLib();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		//this.p1 = new panel(this,{bound:[20,10,702,110],border:3, caption:"Filter"});
		
		this.pc1 = new pageControl(this,{bound:[15,12,1000,500], childPage:["Filter","Status Karyawan","Jabatan","Kompetensi","Pendidikan","Umur","Lokasi Kerja","Data Karyawan","Data CV"]});
		this.bPrint = new imageButton(this.pc1.childPage[8],{bound:[800,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[8],{bound:[823,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[8],{bound:[846,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,97],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:2});
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Tahun Berjalan","=","2011"));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Jenis Laporan","=","Rekap Karyawan"));
		
		var frameWidth = 970;
        this.fr1 = new panel(this.pc1.childPage[1],{bound:[10,10,frameWidth,480],caption:"Status Karyawan"});									            		        							
		this.fr1.bGraph = new imageButton(this.fr1,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr1.bGrid = new imageButton(this.fr1,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr1.grid = new saiGrid(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr1.chart = new flashChart(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Status Karyawan"});		         	                        

		this.fr2 = new panel(this.pc1.childPage[2],{bound:[10,10,frameWidth,480],caption:"Jabatan"});									            		        							
		this.fr2.bGraph = new imageButton(this.fr2,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr2.bGrid = new imageButton(this.fr2,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr2.grid = new saiGrid(this.fr2,{bound:[5,30,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr2.chart = new flashChart(this.fr2,{bound:[5,30,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Jabatan"});		         	                        

		this.fr3 = new panel(this.pc1.childPage[3],{bound:[10,10,frameWidth,480],caption:"Functional / Competency"});									            		        							
		this.fr3.bGraph = new imageButton(this.fr3,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr3.bGrid = new imageButton(this.fr3,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr3.grid = new saiGrid(this.fr3,{bound:[5,30,this.fr3.getClientWidth() - 30,this.fr3.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr3.chart = new flashChart(this.fr3,{bound:[5,30,this.fr3.getClientWidth() - 30,this.fr3.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Functional / Competency"});		         	                        

		this.fr4 = new panel(this.pc1.childPage[4],{bound:[10,10,frameWidth,480],caption:"Pendidikan"});									            		        							
		this.fr4.bGraph = new imageButton(this.fr4,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr4.bGrid = new imageButton(this.fr4,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr4.grid = new saiGrid(this.fr4,{bound:[5,30,this.fr4.getClientWidth() - 30,this.fr4.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr4.chart = new flashChart(this.fr4,{bound:[5,30,this.fr4.getClientWidth() - 30,this.fr4.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Pendidikan"});		         	                        

		this.fr5 = new panel(this.pc1.childPage[5],{bound:[10,10,frameWidth,480],caption:"Group Umur"});									            		        							
		this.fr5.bGraph = new imageButton(this.fr5,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr5.bGrid = new imageButton(this.fr5,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr5.grid = new saiGrid(this.fr5,{bound:[5,30,this.fr5.getClientWidth() - 30,this.fr5.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr5.chart = new flashChart(this.fr5,{bound:[5,30,this.fr5.getClientWidth() - 30,this.fr5.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Group Umur"});		         	                        

		this.fr6 = new panel(this.pc1.childPage[6],{bound:[10,10,frameWidth,480],caption:"Lokasi Kerja"});									            		        							
		this.fr6.bGraph = new imageButton(this.fr6,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr6.bGrid = new imageButton(this.fr6,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr6.grid = new saiGrid(this.fr6,{bound:[5,30,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr6.chart = new flashChart(this.fr6,{bound:[5,30,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Lokasi Kerja"});		         	                        

		this.sg = new saiGrid(this.pc1.childPage[7],{bound:[1,11,this.pc1.width-5,this.pc1.height-80],colCount:8,tag:9,
		            colTitle:["NIK","Nama","Grade","Direktorat","Departemen","Loker","Jabatan","Status SDM"],
					colWidth:[[7,6,5,4,3,2,1,0],[120,200,200,200,200,50,200,60,80]],
					readOnly:true,autoAppend:true,defaultRow:1,
					dblClick:[this,"doDoubleClick"]});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[7],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsViewExt,grid:this.sg,pager:[this,"doPager"]});
		
		var cnv = this.pc1.childPage[8].getClientCanvas();
			this.pc1.childPage[8].addStyle("background:#ffffff");
			this.docViewer = document.createElement("iframe");
			this.docViewer.frameBorder = 0;
			this.docViewer.id = this.getFullId()+"_viewer";
			this.docViewer.style.cssText = "width:100%;height:100%";		
			cnv.appendChild(this.docViewer);
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);
		this.pc1.childPage[2].rearrangeChild(10, 22);
		this.pc1.childPage[3].rearrangeChild(10, 22);
		
		this.timer = new timer(this);
        this.timer.setInterval(1000);
        this.timer.setEnabled(false);
        this.timer.onTimer.set(this,"doTimer");
		
		this.maximize();		
		this.setTabChildIndex();
		this.pager=50;
		this.mail = new server_util_mail(undefined,this.app._lokasi);
		this.mail.addListener(this);
	}
};
window.app_hris_dashboard_fDbSdm.extend(window.childForm);
window.app_hris_dashboard_fDbSdm.implement({
	doPrintClick : function(sender){
		switch (sender){
			case this.bPrint :
				var win = window.open("");
				win.document.write(loadCSS("server_util_laporan"));
				win.document.write(this.docViewer.contentWindow.document.body.innerHTML);
				win.document.close();
			break;
			case this.bExcel :
				 var html = new server_util_arrayList();
				html.add(this.docViewer.contentWindow.document.body.innerHTML);			
				html.add("xls");			
				html.add(new Date().valueOf());				
			    var win = window.open("");
				win.location = upDownHtml(html);
			break;
			case this.bEmail :
				this.mailFrm = new portalui_ConfirmMail(this);
				this.mailFrm.setBound((this.width/2)-125,this.height/2-100,250,100);
				this.mailFrm.setCaption(this.mailFrm.title);
				this.mailFrm.setBorder(3);
				this.mailFrm.onConfirmClick.set(this, "doConfirmClick");
			break;
		}
	},
	doConfirmClick: function(sender){
		try{
			
			if (sender === this.mailFrm.bConfirm){
				var to = this.mailFrm.getEmail();
				if (to !== ""){
					this.mailFrm.free();
					var d = new Date();
					var subject = this.app._namaForm;
					var pesan = loadCSS("server_util_laporan")+this.docViewer.contentWindow.document.body.innerHTML;
					this.mail.send(undefined,to,subject,pesan);
				}else{
					systemAPI.alert("Alamat email belum diisi!");
				}
			}
		}catch(e){
			alert("[doConfirmClick]: sender= "+sender+"; error= "+e);
		}
	},
	doEllipseClick:function(sender, col, row)
	{
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_lokasi, nama from lokasi where flag_konsol<>'1' ",
											  "select count(kode_lokasi) from lokasi where flag_konsol<>'1' ",
											  ["kode_lokasi","nama"],"and",["Kode","Nama"]);
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_akun,nama from masakun "+
											  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
											  "select count(kode_akun) from masakun "+
											  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
											  new Array("kode_akun","nama"),"where");
		}
	},
	doSelectCell:function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2],["123","3","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2],[2,0,2]);
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from periode where kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList]);
		}
	},
	mainButtonClick:function(sender)
	{
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.app._periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Akun","All",""));
			}
			else
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				if (this.sg1.getCell(1,0) == "Range")
				{
					this.kode_lokasi=this.app._kodeLokasiKonsol;
					this.kode_lokasi1=this.sg1.getCell(2,0);
					this.kode_lokasi2=this.sg1.getCell(3,0);
				}
				if (this.sg1.getCell(1,0) == "=")
				{
					this.kode_lokasi=this.sg1.getCell(2,0);
					this.kode_lokasi1=this.sg1.getCell(2,0);
					this.kode_lokasi2=this.sg1.getCell(2,0);
				}		
				this.pc1.setActivePage(this.pc1.childPage[1]);
				var sql = new server_util_arrayList();
				sql.add("select a.nama,isnull(b.jum,0) as tot "+
						"from gr_status_sdm a "+
						"left join (select sts_sdm,count(nik) as jum "+
						"		   from gr_karyawan "+
						"		   group by sts_sdm  "+
						"		  )b on a.sts_sdm=b.sts_sdm "+
						"where isnull(b.jum,0)>0 ");
				sql.add("select a.nama,isnull(b.jum,0) as tot "+
						"from gr_klpjab a "+
						"left join (select kode_klpjab,count(nik) as jum "+
						"		   from gr_karyawan a "+
						"		   inner join gr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi "+
						"		   group by b.kode_klpjab  "+
						"		  )b on a.kode_klpjab=b.kode_klpjab "+
						"where isnull(b.jum,0)>0 ");
				sql.add("select a.nama,isnull(b.jum,0) as tot "+
						"from gr_komp a "+
						"left join (select kode_komp,count(nik) as jum "+
						"		   from gr_karyawan a "+
						"		   inner join gr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi "+
						"		   group by b.kode_komp  "+
						"		  )b on a.kode_komp=b.kode_komp "+
						"where isnull(b.jum,0)>0 ");
				sql.add("select a.nama,isnull(b.jum,0) as tot "+
						"from gr_klpdidik a "+
						"left join (select kode_klpdidik,count(nik) as jum "+
						"		   from gr_karyawan a "+
						"		   inner join gr_status_didik b on a.sts_didik=b.sts_didik and a.kode_lokasi=b.kode_lokasi "+
						"		   group by b.kode_klpdidik  "+
						"		  )b on a.kode_klpdidik=b.kode_klpdidik "+
						"where isnull(b.jum,0)>0 ");
				this.dbLib.getMultiDataProviderA(sql);
				this.count = 0;
				this.sql = sql;
			}
		}catch(e)
		{
			alert("[app_budget_report_flAggRkap]::mainButtonClick:"+e);
		}
	},
	doBtnClick: function(sender){
		try{
			if (sender.name == "graph"){
				sender.owner.grid.hide();
				sender.owner.chart.show();
			}else{
				sender.owner.grid.show();
				sender.owner.chart.hide();
			}
			
			this.firstLoad = false;
		}catch(e){
			alert(e);
		}
	},
	doTimer: function(sender){
		this.timer.setEnabled(false);
		if (this.pc1.activePage == this.pc1.childPage[1].resourceId){
			this.getChart(this.fr1.chart.data, this.fr1.chart);
			this.getChart(this.fr2.chart.data, this.fr2.chart);
			this.getChart(this.fr3.chart.data, this.fr3.chart);
			this.getChart(this.fr4.chart.data, this.fr4.chart);
			this.fr1.chart.refresh();
			this.fr2.chart.refresh();
			this.fr3.chart.refresh();
			this.fr4.chart.refresh();
		}
		
	},
	getChart: function(data,swf){
		if (data === undefined) return;
		if (data.rs === undefined) return;
		var chart = {
		  "bg_colour":"#edf5f8",
		  "y_legend":{
			"text": "Jumlah","style": "{color: #736AFF; font-size: 12px;}"
		  },
		  "elements":[],
		  "x_axis":{
			"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":[swf.title]},"3d": 5 
		   },
		  "y_axis":{
			"stroke":4,"tick_length": 3,"colour":"#d000d0","grid_colour": "#00ff00","offset":0,"max":20,"steps":10
		  },
		  "tooltip":{
			"text": "Global Tooltip<br>val=#val#, top=#top#"
		  }
		};  
		var line,temp="", maxValue = -999999999,minValue = 999999999;				
		if (data.rs.rows[0]!==undefined)
		{
			/* untuk komparasi	antara series1 dan series2		 
				var line,temp="", maxValue = -999999999,minValue = 999999999;
				var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var sapColor = (r+256 * g + 65536 * b).toString(16);
				r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var veatColor = (r+256 * g + 65536 * b).toString(16);
				var series1 = {"type":"bar","alpha":     0.8,"colour":    "#ff9900",
					  "tip":       "SAP AM (#val#)",
					  "text":      "SAP AM",
					  "font-size--": 10,
					  "values" :   [],
					  "linkCtrl": swf.resourceId.toString(),
					  "on-click": "system.getResource("+this.resourceId+").doChartClick",
					  "on-show":	{"type": ""}
					};
				var series2 = {"type":"bar","alpha":     0.8,"colour":    "#0000ff",
					  "tip":       "Hasil Lapangan (#val#) ",
					  "text":      "INV.LAP",
					  "font-size--": 10,
					  "values" :   [],
					  "linkCtrl": swf.resourceId.toString(),
					  "on-click": "system.getResource("+this.resourceId+").doChartClick",
					  "on-show":	{"type":(!systemAPI.browser.msie ? "grow-up":"") }
					};
				swf.labels = [];				
				if (data.rs.rows[0]!==undefined)
				{
					for (var i in data.rs.rows){
						line = data.rs.rows[i];  						
						series1.values.push(Math.round(line.totsap));						
						series2.values.push( Math.round(line.totlap));												
						chart.x_axis.labels.labels.push(line.nama);
						swf.labels.push(line.nama);
						if (parseFloat(line.totsap) > maxValue ) maxValue = parseFloat(line.totsap);
						if (parseFloat(line.totsap) < minValue ) minValue = parseFloat(line.totsap);						
						if (parseFloat(line.totlap) > maxValue ) maxValue = parseFloat(line.totlap);
						if (parseFloat(line.totlap) < minValue ) minValue = parseFloat(line.totlap);												
					}									
				}else{
					var line,temp="", maxValue = 0,minValue = 0;			
				}    			
				chart.elements.push(series1);
				chart.elements.push(series2);
			 * */
			for (var i in data.rs.rows){
				line = data.rs.rows[i];  						
				var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var color = (r+256 * g + 65536 * b).toString(16);
				temp = {"type":"bar_3d","alpha":     1.8,"colour":    "#"+ color,
				  "tip":       line.nama +"(#val#)",
				  "text--":      line.nama,
				  "font-size--": 10,
				  "linkCtrl": swf.resourceId.toString(),
				  "on-click": "system.getResource("+this.resourceId+").doChartClick",
				  "values" :   [parseFloat(line.tot)],
				  "on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
				};
				chart.elements.push(temp);							
				if (parseFloat(line.tot) > maxValue ) maxValue = parseFloat(line.tot);
				if (parseFloat(line.tot) < minValue ) minValue = parseFloat(line.tot);						
			}									
		}else{
			var line,temp="", maxValue = 0,minValue = 0;
			var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var color = (r+256 * g + 65536 * b).toString(16);
				temp = {"type":"bar_3d","alpha":     1.8,"colour":    "#"+ color,
				  "tip":       "",
				  "text--":      "",
				  "font-size--": 10,
				  "on-click": "system.getResource("+this.resourceId+").doChartClick",
				  "values" :   [0],
				  "on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
				};
				chart.elements.push(temp);	
		}    			
			
		chart.y_axis.max = maxValue + 10;						
		swf.setChartData(chart); 
	},  
	doObjectReady: function(sender){
	   try{	 
			if (sender.data != undefined){
				this.getChart(sender.data,sender);
				sender.refresh();
			}
			/*this.count++;
		    if (this.pc1.activePage == this.pc1.childPage[1].resourceId  ){
				this.timer.setEnabled(true);
				this.count = 0;
			}else if (this.pc1.activePage == this.pc1.childPage[2].resourceId && this.count == 5){
				this.timer.setEnabled(true);
				this.count = 0;
			}*/
        }catch(e){
            alert(e);
        }
    },    
	doChartClick: function(sender,index,title){	
		eval("sender="+sender+"");
		try{
			var sql = "select a.nik,a.nama,a.kode_grade,b.nama as loker,c.nama as jab,d.nama as dept,e.nama as dir,f.nama as status_sdm "+
						"from gr_karyawan a "+
						"inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
						"inner join gr_jab c on a.kode_jab=c.kode_jab and a.kode_lokasi=c.kode_lokasi "+
						"inner join gr_dept d on a.kode_dept=d.kode_dept and a.kode_lokasi=d.kode_lokasi "+
						"inner join gr_dir e on a.kode_dir=e.kode_dir and a.kode_lokasi=e.kode_lokasi  "+
						"inner join gr_status_sdm f on a.sts_sdm=f.sts_sdm and a.kode_lokasi=f.kode_lokasi "+
						"inner join gr_klpjab g on c.kode_klpjab=g.kode_klpjab and c.kode_lokasi=g.kode_lokasi "+
						"inner join gr_komp h on c.kode_komp=h.kode_komp and c.kode_lokasi=h.kode_lokasi "+
						"inner join gr_status_didik i on a.sts_didik=i.sts_didik and a.kode_lokasi=i.kode_lokasi "+
						"inner join gr_klpdidik j on i.kode_klpdidik=j.kode_klpdidik and i.kode_lokasi=j.kode_lokasi ";
			if (sender==this.fr1.chart)
			{
				sql=sql+"where f.nama='"+title+"' ";
			}
			if (sender==this.fr2.chart)
			{
				sql=sql+"where g.nama='"+title+"' ";
			}
			if (sender==this.fr3.chart)
			{
				sql=sql+"where h.nama='"+title+"'";
			}
			if (sender==this.fr4.chart)
			{
				sql=sql+"where j.nama='"+title+"'";
			}
			sql=sql+"order by a.nik"
			
			var data = this.dbLib.getDataProvider(sql,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
				this.sgn.rearrange();
				this.doTampilData(1);
				this.pc1.setActivePage(this.pc1.childPage[7]);
			
			} else this.sg.clear(1);
		}
		catch (e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
	   if (sender == this.dbLib){
	       try{
    	       switch(methodName){
    	           case "getMultiDataProvider":					
    	                var data = JSON.parse(result);
    	                if (typeof data != "string"){
    	                    this.count = 0;
							this.dataProvider = data;			
							this.fr1.chart.data = data.result[0];
							this.fr1.sql = this.sql.get(0);	
            		        this.setData(this.fr1.grid,data.result[0]);
							this.getChart(this.fr1.chart.data,this.fr1.chart);
							this.fr1.chart.refresh();
							this.fr2.chart.data = data.result[1];
							this.fr2.sql = this.sql.get(1);	
            		        this.setData(this.fr2.grid,data.result[1]);
							this.getChart(this.fr2.chart.data,this.fr2.chart);
							this.fr2.chart.refresh();
							this.fr3.chart.data = data.result[2];
							this.fr3.sql = this.sql.get(2);	
            		        this.setData(this.fr3.grid,data.result[2]);
							this.getChart(this.fr3.chart.data,this.fr3.chart);
							this.fr3.chart.refresh();
							this.fr4.chart.data = data.result[3];
							this.fr4.sql = this.sql.get(3);	
            		        this.setData(this.fr4.grid,data.result[3]);
							this.getChart(this.fr4.chart.data,this.fr4.chart);
							this.fr4.chart.refresh();
						}else throw result;
    	           break;
               }
            }catch(e){
                systemAPI.alert(this+"$request()",e);
            }
       }
    },
	setData: function(grid, data){
		grid.clear();
		for (var i in data.rs.rows){
			grid.appendData([data.rs.rows[i].nama, data.rs.rows[i].tot]);
		}			
	},
	
	doDoubleClick: function(sender, col , row) 
	{
		try{
		
			this.report = new server_report_report();
			this.filter = "where a.nik='"+this.sg.cells(0,row)+"'";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer.src = this.report.previewWithHeader("server_report_hris_rptCvSk",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
			this.pc1.setActivePage(this.pc1.childPage[8]);
		}catch(e){
			alert(e);
		}
	},
	doTampilData: function(page) {
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.nik,line.nama,line.kode_grade,line.loker,line.jab,line.dept,line.dir,line.status_sdm]);
		}
		this.sg.setNoUrut(start);
	},
	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	
});

/**
 * 
 * 
 * 
 * 
 * 
 * **/
