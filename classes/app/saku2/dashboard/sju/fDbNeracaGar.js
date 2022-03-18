window.app_saku2_dashboard_sju_fDbNeracaGar = function(owner)
{
	if (owner)
	{
		window.app_saku2_dashboard_sju_fDbNeracaGar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_dashboard_sju_fDbNeracaGar";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","", 2);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;server_report_report");
		uses("childPage;panel;flashChart;timer;toolbar;pageControl;portalui_ConfirmMail;server_util_mail");
		uses("util_filterRep;util_standar;util_gridLib");
		this.filterRep = new util_filterRep();
		this.standar = new util_standar();	
		this.gridLib = new util_gridLib();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		//this.p1 = new panel(this,{bound:[20,10,702,110],border:3, caption:"Filter"});
		
		this.pc1 = new pageControl(this,{bound:[15,12,1000,500], childPage:["Filter","Pendapatan Usaha ","Beban Usaha","Beban Non usaha","Investasi","Beban                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ","Data Trail"]});
		this.bPrint = new imageButton(this.pc1.childPage[6],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[6],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[6],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,97],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.app._periode));
		this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode FS","=",this.app._kodeFs));
		var frameWidth = 970;
      
        this.fr1 = new panel(this.pc1.childPage[1],{bound:[10,10,frameWidth,480],caption:"Aktiva Lancar"});									            		        							
		this.fr1.bGraph = new imageButton(this.fr1,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr1.bGrid = new imageButton(this.fr1,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr1.grid = new saiGrid(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr1.chart = new flashChart(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Bulan",name:"fr1"});		         	                        

		this.fr2 = new panel(this.pc1.childPage[2],{bound:[10,10,frameWidth,480],caption:"Aktiva Tidak Berwujud"});									            		        							
		this.fr2.bGraph = new imageButton(this.fr2,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr2.bGrid = new imageButton(this.fr2,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr2.grid = new saiGrid(this.fr2,{bound:[5,30,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr2.chart = new flashChart(this.fr2,{bound:[5,30,this.fr2.getClientWidth() - 30,this.fr2.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Obyek Kerugian"});		         	                        

		this.fr3 = new panel(this.pc1.childPage[3],{bound:[10,10,frameWidth,480],caption:"Kewajiban"});									            		        							
		this.fr3.bGraph = new imageButton(this.fr3,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr3.bGrid = new imageButton(this.fr3,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr3.grid = new saiGrid(this.fr3,{bound:[5,30,this.fr3.getClientWidth() - 30,this.fr3.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr3.chart = new flashChart(this.fr3,{bound:[5,30,this.fr3.getClientWidth() - 30,this.fr3.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Penyebab Kerugian"});		         	                        

		this.fr4 = new panel(this.pc1.childPage[4],{bound:[10,10,frameWidth,480],caption:"Pendapatan Operasional"});									            		        							
		this.fr4.bGraph = new imageButton(this.fr4,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr4.bGrid = new imageButton(this.fr4,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr4.grid = new saiGrid(this.fr4,{bound:[5,30,this.fr4.getClientWidth() - 30,this.fr4.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr4.chart = new flashChart(this.fr4,{bound:[5,30,this.fr4.getClientWidth() - 30,this.fr4.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Lokasi"});		         	                        

		this.fr6 = new panel(this.pc1.childPage[5],{bound:[10,10,frameWidth,480],caption:"Klaim Per Lokasi"});									            		        							
		this.fr6.bGraph = new imageButton(this.fr6,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr6.bGrid = new imageButton(this.fr6,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr6.grid = new saiGrid(this.fr6,{bound:[5,30,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr6.chart = new flashChart(this.fr6,{bound:[5,30,this.fr6.getClientWidth() - 30,this.fr6.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Lokasi"});		         	                        

			
		var cnv = this.pc1.childPage[6].getClientCanvas();
			this.pc1.childPage[6].addStyle("background:#ffffff");
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
window.app_saku2_dashboard_sju_fDbNeracaGar.extend(window.childForm);
window.app_saku2_dashboard_sju_fDbNeracaGar.implement({
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
		if (row ==0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_lokasi, nama from lokasi where flag_konsol='0' ",
											"select count(*) from lokasi where flag_konsol='0'",
											new Array("kode_lokasi","nama"),"and",new Array("kode","nama"));
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data FS",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_fs,nama from fs "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+" order by kode_fs",
													  "select count(kode_fs) from fs "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
													  new Array("kode_fs","nama"),"where");
		}
	},
	doSelectCell:function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2],["23","3","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2],[2,0,2]);
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from periode where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
		}
	
	},
	mainButtonClick:function(sender)
	{
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				//clear	
			}
			else 
			if (sender == this.app._mainForm.bBack)
			{
				if (this.link=="")
				{
					this.p1.setVisible(true);
					this.app._mainForm.pButton.setVisible(true);
					this.viewer.setVisible(false);
					this.app._mainForm.reportNavigator.setVisible(false);
				}
				if (this.link=="1")
				{
					this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId());
					this.link="";
				}
				if (this.link=="2")
				{
					this.doOpenTb(this.kode_neraca,this.kode_lokasi);
				}
				if (this.link=="3")
				{
					this.doOpenBb(this.kode_akun,this.kode_lokasi);
				}
				
			}
			else
			{
				var periode2=this.sg1.getCell(2,1)
				if (this.sg1.getCell(3,1)!="")
				{
					periode2=this.sg1.getCell(3,1);
				}
				
				sql="call sp_neraca_sju ('"+this.sg1.getCell(2,2)+"','A','S',5,'"+this.sg1.getCell(2,1)+"','"+periode2+"','"+this.sg1.getCell(2,0)+"','"+this.sg1.getCell(2,0)+"','"+this.sg1.getCell(2,0)+"','"+this.app._nikUser+"')";
				this.dbLib.execQuerySync(sql);
				this.pc1.setActivePage(this.pc1.childPage[1]);
				var sql = new server_util_arrayList();
				sql.add("select a.kode_neraca+'-'+b.nama as nama,abs(round(b.n2/1000,0)) as tot,abs(round(b.n3/1000,0)) as gar "+
						"from db_grafik_d a "+
						"inner join neraca_tmp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca "+
						"where b.nik_user='"+this.app._nikUser+"' and a.kode_grafik='DB04' order by a.no");
				sql.add("select a.kode_neraca+'-'+b.nama as nama,abs(round(b.n2/1000,0)) as tot,abs(round(b.n3/1000,0)) as gar  "+
						"from db_grafik_d a "+
						"inner join neraca_tmp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca "+
						"where b.nik_user='"+this.app._nikUser+"' and a.kode_grafik='DB05' order by a.no");
				sql.add("select a.kode_neraca+'-'+b.nama as nama,abs(round(b.n2/1000,0)) as tot,abs(round(b.n3/1000,0)) as gar  "+
						"from db_grafik_d a "+
						"inner join neraca_tmp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca "+
						"where b.nik_user='"+this.app._nikUser+"' and a.kode_grafik='DB06' order by a.no");
				sql.add("select a.kode_neraca+'-'+b.nama as nama,abs(round(b.n2/1000,0)) as tot,abs(round(b.n3/1000,0)) as gar  "+
						"from db_grafik_d a "+
						"inner join neraca_tmp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca "+
						"where b.nik_user='"+this.app._nikUser+"' and a.kode_grafik='DB02' order by a.no");
				sql.add("select a.kode_neraca+'-'+b.nama as nama,abs(round(b.n2/1000,0)) as tot,abs(round(b.n3/1000,0)) as gar  "+
						"from db_grafik_d a "+
						"inner join neraca_tmp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca "+
						"where b.nik_user='"+this.app._nikUser+"' and a.kode_grafik='DB07' order by a.no");
				
						
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
			this.getChart(this.fr6.chart.data, this.fr6.chart);
			this.fr1.chart.refresh();
			this.fr2.chart.refresh();
			this.fr3.chart.refresh();
			this.fr4.chart.refresh();
			this.fr6.chart.refresh();
			
		}
		
	},
	getChart: function(data,swf,autoRefresh){
		if (data === undefined) return;
		if (data.rs === undefined) return;
		
		var chart = {
		  "bg_colour":"#edf5f8",
		  "y_legend":{
			"text": "Jumlah (Dalam Juta)","style": "{color: #736AFF; font-size: 12px;}"
		  },
		  "elements":[],
		  "x_axis":{
			"stroke": 1,"tick_height": 10,"colour":"#d000d0","grid_colour": "#00ff00","labels":{"labels":[],"rotate": -45},"3d": 5 
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
		    temp = {"type":"bar_3d","alpha":     1.8,"colour":    "#FF9900",
				
				  "font-size--": 10,
				  "linkCtrl": swf.resourceId.toString(),
				  "on-click": "system.getResource("+this.resourceId+").doChartClickGar",
				  "values" :   [],
				  "on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
				}		
			temp2 = {"type":"bar_3d","alpha":     1.8,"colour":    "#418aac",
				
				  "font-size--": 10,
				  "linkCtrl": swf.resourceId.toString(),
				  "on-click": "system.getResource("+this.resourceId+").doChartClick",
				  "values" :   [],
				  "on-show":	{"type": (!systemAPI.browser.msie ? "grow-up":"")}
				}	
			var key = [];
			for (var i in data.rs.rows){
				line = data.rs.rows[i];  						
				var r = Math.floor(Math.random()*256),g = Math.floor(Math.random()*256),b = Math.floor(Math.random()*256);
				var color = (r+256 * g + 65536 * b).toString(16);
				temp.values.push(parseFloat(line.gar));
				temp2.values.push(parseFloat(line.tot));
				chart.x_axis.labels.labels.push(line.nama);
				if (parseFloat(line.tot) > maxValue ) maxValue = parseFloat(line.tot);
				if (parseFloat(line.tot) < minValue ) minValue = parseFloat(line.tot);	
				
				key.push(line.nama);
			}	
			chart.elements.push(temp);
			chart.elements.push(temp2);		
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
		swf.keyIndex = key;		
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
			var title = sender.keyIndex[index];
			var tmp=title.split('-');
			var kode_neraca=tmp[0];
			this.report = new server_report_report();
			var kode_lokasi=this.sg1.getCell(2,0);
			this.filter = "";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = this.app._nikUser+"/"+this.sg1.getCell(2,1)+"/"+kode_neraca+"/"+kode_lokasi+"/"+this.sg1.getCell(2,2) ;
			this.docViewer.src = this.report.previewWithHeader("server_report_saku2_gl_rptTBLajurTrail2",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pc1.setActivePage(this.pc1.childPage[6]);
		}
		catch (e){
			alert(e);
		}
	},
	doChartClickGar: function(sender,index,title){	
		
		eval("sender="+sender+"");
		try{
			var title = sender.keyIndex[index];
			var tmp=title.split('-');
			var kode_neraca=tmp[0];
			this.report = new server_report_report();
			var kode_lokasi=this.sg1.getCell(2,0);
			var tahun=this.sg1.getCell(2,0).substr(0,4);
			this.filter = "";
			this.filter2 = this.app._nikUser+"/"+this.sg1.getCell(2,1)+"/"+kode_neraca+"/"+kode_lokasi+"/"+this.sg1.getCell(2,2) ;
			this.showFilter = "";
			this.lokasi = "";
			this.docViewer.src = this.report.previewWithHeader("server_report_saku2_gar_rptAggBulanNeraca2",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pc1.setActivePage(this.pc1.childPage[6]);
		}
		catch (e){
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
			this.sg.appendData([line.no_klaim,line.no_dokumen,line.tanggal,line.nama_lok,line.nama_obyek,line.nama_sebab,floatToNilai(line.nilai),floatToNilai(line.nilai_adjust),floatToNilai(line.nilai_bayar)]);
		}
		this.sg.setNoUrut(start);
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
							this.fr6.chart.data = data.result[4];
							this.fr6.sql = this.sql.get(4);	
            		        this.setData(this.fr6.grid,data.result[4]);
							this.getChart(this.fr6.chart.data,this.fr4.chart);
							this.fr6.chart.refresh();
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
	
	doOpenBb: function(kode_akun,kode_lokasi){
		this.kode_akun=kode_akun;
		this.kode_lokasi=kode_lokasi;
		this.link="2";
		this.filter2 = kode_lokasi+"/"+this.sg1.getCell(2,1)+"/"+this.app._nikUser+"/"+kode_akun;
		this.filter="";
		this.docViewer.src = this.report.previewWithHeader("server_report_saku2_gl_rptBukuBesarTrail",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();

	},
	doOpenJurnal: function(no_bukti,kode_lokasi){
		this.no_bukti=no_bukti;
		this.kode_lokasi=kode_lokasi;
		this.link="3";
		this.filter = "where no_bukti='"+no_bukti+"' and kode_lokasi='"+kode_lokasi+"' ";
		this.filter2="";
		nama_report="server_report_saku2_gl_rptGlJurnal";
		this.docViewer.src = this.report.previewWithHeader("server_report_saku2_gl_rptGlJurnal",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();

	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doOpenDoc: function(){
	   this.pc1.setActivePage(this.pc1.childPage[8]);
	}
});