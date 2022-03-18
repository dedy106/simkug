window.app_saku2_dashboard_gar_fDbGarPp = function(owner)
{
	if (owner)
	{
		window.app_saku2_dashboard_gar_fDbGarPp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_dashboard_gar_fDbGarPp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","", 2);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;server_report_report");
		uses("childPage;panel;flashChart;timer;toolbar;pageControl;portalui_ConfirmMail;server_util_mail");
		uses("util_filterRep;util_standar;util_gridLib;util_xlsChart");
		this.filterRep = new util_filterRep();
		this.standar = new util_standar();	
		this.gridLib = new util_gridLib();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		//this.p1 = new panel(this,{bound:[20,10,702,110],border:3, caption:"Filter"});
		
		this.pc1 = new pageControl(this,{bound:[15,12,1000,500], childPage:["Filter","Target Realisasi Kegiatan","Detail Kegiatan" ,"Data Trail"]});
		this.bPrint = new imageButton(this.pc1.childPage[6],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[6],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[6],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,200],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:4});
		this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from periode where kode_lokasi='"+this.app._lokasi+"'");
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2,3), new Array("Lokasi","=",this.app._lokasi,""));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
		this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode PP","=",this.app._kodePP));
		this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Anggaran","=","Bulanan"));
		var frameWidth = 970;
      
        this.fr1 = new panel(this.pc1.childPage[1],{bound:[10,10,frameWidth,480],caption:"Aktiva Lancar"});									            		        							
		this.fr1.bGraph = new imageButton(this.fr1,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr1.bGrid = new imageButton(this.fr1,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr1.bXls = new imageButton(this.fr1,{bound:[frameWidth - 75,2,18,16],image:"icon/dynpro/excel2.png",hint:"Save to excel",click:[this,"doBtnClick"], name:"xls"});
		this.fr1.grid = new saiGrid(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],colCount:3,colTitle:["Group By","Anggaran","Realisasi"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[2,1,0],[100,100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr1.chart = new flashChart(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Bulan",name:"fr1"});		         	                        

		var cnv = this.pc1.childPage[3].getClientCanvas();
			this.pc1.childPage[3].addStyle("background:#ffffff");
			this.docViewer = document.createElement("iframe");
			this.docViewer.frameBorder = 0;
			this.docViewer.id = this.getFullId()+"_viewer";
			this.docViewer.style.cssText = "width:100%;height:100%";		
			cnv.appendChild(this.docViewer);
			
		var cnv2 = this.pc1.childPage[2].getClientCanvas();
			this.pc1.childPage[2].addStyle("background:#ffffff");
			this.docViewer2 = document.createElement("iframe");
			this.docViewer2.frameBorder = 0;
			this.docViewer2.id = this.getFullId()+"_viewer";
			this.docViewer2.style.cssText = "width:100%;height:100%";		
			cnv2.appendChild(this.docViewer2);
			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		
		this.timer = new timer(this);
        this.timer.setInterval(1000);
        this.timer.setEnabled(false);
        this.timer.onTimer.set(this,"doTimer");
		
		this.maximize();		
		this.setTabChildIndex();
		this.pager=50;
		this.mail = new server_util_mail(undefined,this.app._lokasi);
		this.mail.addListener(this);
		this.xlsChart = new util_xlsChart();
	}
};
window.app_saku2_dashboard_gar_fDbGarPp.extend(window.childForm);
window.app_saku2_dashboard_gar_fDbGarPp.implement({
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
				var filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and");
				var tahun=this.sg1.getCell(2,1).substr(0,4);
				if (this.app._userStatus=="A")
				{
					var sql="select a.kode_pp, a.nama "+
						"from pp a "+
						"inner join (select a.kode_pp,a.kode_lokasi from anggaran_d a "+
						"			where substring(a.periode,1,4)='"+tahun+"' "+filter+
						"			group by kode_pp,kode_lokasi "+
						"		   )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"where a.tipe='Posting' "+filter;
					var sql2="select count(a.kode_pp) "+
						"from pp a "+
						"inner join (select a.kode_pp,a.kode_lokasi from anggaran_d a "+
						"			where substring(a.periode,1,4)='"+tahun+"' "+filter+
						"			group by kode_pp,kode_lokasi "+
						"		   )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"where a.tipe='Posting' "+filter;
				}
				if (this.app._userStatus=="P")
				{
					var sql="select a.kode_pp, a.nama "+
						"from pp a "+
						"inner join (select a.kode_pp,a.kode_lokasi from anggaran_d a "+
						"			where substring(a.periode,1,4)='"+tahun+"' "+filter+
						"			group by kode_pp,kode_lokasi "+
						"		   )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"inner join karyawan_pp c on a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp "+
						"where a.tipe='Posting' and c.nik='"+this.app._userLog+"' "+filter;
					var sql2="select count(a.kode_pp) "+
						"from pp a "+
						"inner join (select a.kode_pp,a.kode_lokasi from anggaran_d a "+
						"			where substring(a.periode,1,4)='"+tahun+"' "+filter+
						"			group by kode_pp,kode_lokasi "+
						"		   )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						"inner join karyawan_pp c on a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp "+
						"where a.tipe='Posting' and c.nik='"+this.app._userLog+"' "+filter;
					
				}
				this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,sql,sql2,
												new Array("a.kode_pp","a.nama"),"and",new Array("kode pp","nama"));
		}
	},
	doSelectCell:function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3],["3","3","3","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3],[2,0,2,0]);
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from periode where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Bulanan","Sampai Dengan"));
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
				sql="exec sp_agg_pakai '"+this.sg1.getCell(2,0)+"','Beban','"+this.sg1.getCell(2,1)+"','"+this.app._nikUser+"'";
				this.dbLib.execQuerySync(sql);
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.doDetail();
				var sql = new server_util_arrayList();
				if (this.sg1.getCell(2,3)=="Bulanan")
				{
					sql.add("select a.kode_akun+'-'+a.kode_drk as nama,case when sum(a.n3)>0 then sum(a.n3) else 0 end as gar,case when sum(a.n4)>0 then sum(a.n4) else 0 end as tot  "+
						"from glma_drk_tmp a "+
						"where a.kode_lokasi='"+this.sg1.getCell(2,0)+"' and a.kode_pp='"+this.sg1.getCell(2,2)+"' and a.periode='"+this.sg1.getCell(2,1)+"' and nik_user='"+this.app._nikUser+"' "+
						"group by a.kode_pp,a.kode_drk,a.kode_akun ");
				}
				else
				{
					sql.add("select  a.kode_akun+'-'+a.kode_drk as nama,case when sum(a.n2)>0 then sum(a.n2) else 0 end as gar,case when sum(a.n5)>0 then sum(a.n5) else 0 end as tot "+
						"from glma_drk_tmp a "+
						"where a.kode_lokasi='"+this.sg1.getCell(2,0)+"' and a.kode_pp='"+this.sg1.getCell(2,2)+"' and a.periode='"+this.sg1.getCell(2,1)+"' and nik_user='"+this.app._nikUser+"' "+
						"group by a.kode_pp,a.kode_drk,a.kode_akun ");
				}
				
				this.dbLib.getMultiDataProviderA(sql);
				this.count = 0;
				this.sql = sql;
				
			}
		}catch(e)
		{
			alert("[app_budget_report_flAggRkap]::mainButtonClick:"+e);
		}
	},
	doSaveXls: function(sender){
			var panel = sender.owner;
				this.xlsChart.series = new server_util_arrayList();		
				this.xlsChart.setFilename("grafik.xls");
				var data = [], series = new arrayMap(), colTitle = [];
				for (var i=0; i < panel.grid.getRowCount(); i++){
					for (var c=0; c < panel.grid.getColCount(); c++){
						colTitle[c] = panel.grid.columns.get(c).title;
						if (data[c] === undefined) {
							data[c] = [];
							if (c > 0){
								var col = this.xlsChart.indexToColumn(c);
								var colCat = this.xlsChart.indexToColumn(0);
								var max = panel.grid.getRowCount()+1;								
								series.set(c, {title: panel.grid.columns.get(c).title, categories:"$"+colCat+"$2:$"+colCat+max, values:"$"+col+"$2:$"+col+"$"+max });
							}
						}
						data[c][data[c].length] = c > 0 ? parseFloat(nilaiToFloat(panel.grid.cells(c, i))) : panel.grid.cells(c, i);									
					}					
				}				
				this.xlsChart.setData(data);
				this.xlsChart.setColTitle(colTitle);
				this.xlsChart.setChartType("column");
				var serie;
				for (var i in series.objList){
					serie = series.get(i);
					this.xlsChart.addSeries(serie.title,serie.categories,serie.values);
					
				}							
				this.xlsChart.setTitle("Grafik Keuangan");
				this.xlsChart.setXTitle("Jumlah (dalam ribuan)");
				this.xlsChart.setYTitle("Keterangan");
				//window.open( this.xlsChart.getChart() );
				
				downloadFile(this.xlsChart.getChart() );
	},
	doGraph: function(sender){
		var panel = sender.owner;
		panel.grid.hide();
		panel.chart.show();
	},
	doGrid: function(sender){
		var panel = sender.owner;
		panel.grid.show();
		panel.chart.hide();
	},
	doBtnClick: function(sender){
		try{
			
			if (sender == this.fr1.bXls ){
				this.doSaveXls(sender);				
			}
			
			
			if (sender == this.fr1.bGraph ){
				this.doGraph(sender);
			}
			if (sender == this.fr1.bGrid ){
				this.doGrid(sender);
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
			this.fr1.chart.refresh();
			this.fr2.chart.refresh();
			
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
			var kode_akun=tmp[0];
			var kode_drk=tmp[1];
			this.report = new server_report_report();
			var kode_lokasi=this.sg1.getCell(2,0);
			var tahun=this.sg1.getCell(2,1).substr(0,4);
			var kode_pp=this.sg1.getCell(2,2);
			this.filter = " and a.kode_akun='"+kode_akun+"' and a.kode_pp='"+kode_pp+"' and a.kode_drk='"+kode_drk+"' ";
			this.filter2 = this.app._nikUser+"/"+this.sg1.getCell(2,1);
			this.showFilter = "";
			this.lokasi = "";
			this.docViewer.src = this.report.previewWithHeader("server_report_saku2_gar_rptAggPakai",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pc1.setActivePage(this.pc1.childPage[3]);
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
			var kode_akun=tmp[0];
			var kode_drk=tmp[1];
			this.report = new server_report_report();
			var kode_lokasi=this.sg1.getCell(2,0);
			var tahun=this.sg1.getCell(2,1).substr(0,4);
			var kode_pp=this.sg1.getCell(2,2);
			this.filter = " and a.kode_akun='"+kode_akun+"' and a.kode_pp='"+kode_pp+"' and a.kode_drk='"+kode_drk+"' ";
			this.filter2 = this.app._nikUser+"/"+this.sg1.getCell(2,1);
			this.showFilter = "";
			this.lokasi = "";
			this.docViewer.src = this.report.previewWithHeader("server_report_saku2_gar_rptAggPakai",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pc1.setActivePage(this.pc1.childPage[3]);
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
			grid.appendData([data.rs.rows[i].nama, data.rs.rows[i].gar,data.rs.rows[i].tot]);
		}	
		
	},
	
	doOpenGar: function(kode_akun,kode_lokasi,tahun,kode_pp,kode_drk){
		this.pc1.setActivePage(this.pc1.childPage[3]);
		this.kode_akun=kode_akun;
		this.kode_lokasi=kode_lokasi;
		this.tahun=tahun;
		this.link="1";
		filter = "where x.kode_akun='"+kode_akun+"' and x.kode_lokasi='"+kode_lokasi+"' and substring(x.periode,1,4)='"+tahun+"' and x.kode_pp='"+kode_pp+"' and x.kode_drk='"+kode_drk+"' ";
		filter2=this.app._nikUser+"/"+tahun;
		nama_report="server_report_saku2_gar_rptAggBulanTrail";
		this.docViewer.src = this.report.previewWithHeader(nama_report,filter, 1,1, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();

	},
	doOpenKartu: function(kode_akun,kode_lokasi,tahun,kode_pp,kode_drk){
		this.pc1.setActivePage(this.pc1.childPage[3]);
		this.kode_akun=kode_akun;
		this.kode_lokasi=kode_lokasi;
		this.tahun=tahun;
		this.kode_pp=kode_pp;
		this.kode_drk=kode_drk;
		this.link="1";
		var sql = "call sp_angg_d ('"+kode_lokasi+"','Beban','"+tahun+"','"+this.app._nikUser+"')";
		this.dbLib.execQuerySync(sql);	
		filter = "where a.kode_akun='"+kode_akun+"' and a.kode_lokasi='"+kode_lokasi+"' and substring(a.periode,1,4)='"+tahun+"' and a.kode_pp='"+kode_pp+"' and a.kode_drk='"+kode_drk+"' ";
		filter2="Beban/"+tahun+"/"+this.app._nikUser+"/"+this.sg1.getCell(2,1);
		nama_report="server_report_saku2_gar_rptAggKpaAkunBln";
		this.docViewer.src = this.report.previewWithHeader(nama_report,filter, 1,1, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();

	},
	doOpenJurnal: function(no_bukti,kode_lokasi,periode){
		this.no_bukti=no_bukti;
		this.kode_lokasi=kode_lokasi;
		this.periode=periode;
		this.link="2";
		filter = "where no_bukti='"+no_bukti+"' and kode_lokasi='"+kode_lokasi+"' and periode='"+periode+"'";
		filter2="";
		
		nama_report="server_report_saku2_gl_rptGlJurnal";
		this.docViewer.src = this.report.previewWithHeader(nama_report,filter, 1,1, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();

	},
	doDetail: function() 
	{
		this.report = new server_report_report();
		this.showFilter = "";
		this.lokasi = "";
		var kode_pp=this.sg1.getCell(2,2);
		filter = " and a.kode_pp='"+kode_pp+"' ";
		filter2 = this.app._nikUser+"/"+this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,3);
		nama_report="server_report_saku2_gar_rptAggPakaiPp";
		this.docViewer2.src = this.report.previewWithHeader(nama_report,filter, 1,1, this.showFilter, this.lokasi,filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doOpenDoc: function(){
	   this.pc1.setActivePage(this.pc1.childPage[8]);
	}
});