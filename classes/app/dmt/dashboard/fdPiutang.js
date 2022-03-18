window.app_dmt_dashboard_fdPiutang = function(owner)
{
	if (owner)
	{
		window.app_dmt_dashboard_fdPiutang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_dmt_dashboard_fdPiutang";
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
		
		this.pc1 = new pageControl(this,{bound:[15,12,1000,500], childPage:["Filter","Customer","Saldo Piutang","Kartu Piutang","Invoice","Jurnal"]});
		this.bPrint = new imageButton(this.pc1.childPage[8],{bound:[800,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[8],{bound:[823,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[8],{bound:[846,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,260],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
		this.periode=this.dbLib.getPeriodeFromSQL("select distinct periode from dmt_ar_m where kode_lokasi ='"+this.app._lokasi+"'");
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi","=",this.app._lokasi]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Periode","=",this.periode]);
		this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Customer","All",""]);
		
		var frameWidth = 970;
        this.fr1 = new panel(this.pc1.childPage[1],{bound:[10,10,frameWidth,480],caption:"Status Karyawan"});									            		        							
		this.fr1.bGraph = new imageButton(this.fr1,{bound:[frameWidth - 50,2,16,16],image:"icon/dynpro/graph16.png",hint:"Mode Graphic",click:[this,"doBtnClick"], name:"graph"});
		this.fr1.bGrid = new imageButton(this.fr1,{bound:[frameWidth - 25,2,16,16],image:"icon/dynpro/tabContent2.png",hint:"Mode Table",click:[this,"doBtnClick"], name:"grid"});
		this.fr1.grid = new saiGrid(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],colCount:2,colTitle:["Group By","Jumlah"],visible:false, readOnly:true, dblClick:[this,"doGridClick"],colWidth:[[1,0],[100,200]], colAlign:[[1],[alCenter]]});		         	                        
		this.fr1.chart = new flashChart(this.fr1,{bound:[5,30,this.fr1.getClientWidth() - 30,this.fr1.getClientHeight() - 50],objectReady:[this,"doObjectReady"],title:"Status Karyawan"});		         	                        

		
		var cnv = this.pc1.childPage[2].getClientCanvas();
		this.pc1.childPage[2].addStyle("background:#ffffff");
		this.docViewer = document.createElement("iframe");
		this.docViewer.frameBorder = 0;
		this.docViewer.id = this.getFullId()+"_viewer";
		this.docViewer.style.cssText = "width:100%;height:100%";		
		cnv.appendChild(this.docViewer);
		
		var cnv2 = this.pc1.childPage[3].getClientCanvas();
		this.pc1.childPage[3].addStyle("background:#ffffff");
		this.docViewer2 = document.createElement("iframe");
		this.docViewer2.frameBorder = 0;
		this.docViewer2.id = this.getFullId()+"_viewer";
		this.docViewer2.style.cssText = "width:100%;height:100%";		
		cnv2.appendChild(this.docViewer2);
		
		var cnv3 = this.pc1.childPage[4].getClientCanvas();
		this.pc1.childPage[4].addStyle("background:#ffffff");
		this.docViewer3 = document.createElement("iframe");
		this.docViewer3.frameBorder = 0;
		this.docViewer3.id = this.getFullId()+"_viewer";
		this.docViewer3.style.cssText = "width:100%;height:100%";		
		cnv3.appendChild(this.docViewer3);
		
		var cnv4 = this.pc1.childPage[5].getClientCanvas();
		this.pc1.childPage[5].addStyle("background:#ffffff");
		this.docViewer4 = document.createElement("iframe");
		this.docViewer4.frameBorder = 0;
		this.docViewer4.id = this.getFullId()+"_viewer";
		this.docViewer4.style.cssText = "width:100%;height:100%";		
		cnv4.appendChild(this.docViewer4);


		
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
window.app_dmt_dashboard_fdPiutang.extend(window.childForm);
window.app_dmt_dashboard_fdPiutang.implement({
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
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				this.filter2 = this.sg1.getCell(2,1)+"/";
				this.pc1.setActivePage(this.pc1.childPage[1]);
				var sql = new server_util_arrayList();
				sql.add("select a.nama,isnull(b.nilai,0) as tot "+ 
						"from cust a  "+
						"left join (select a.kode_cust,sum(a.nilai+a.ppn) as nilai "+
						"		   from dmt_ar_m a "+this.filter+
						"		   group by a.kode_cust "+
						"		  )b on a.kode_cust=b.kode_cust "+
						"where isnull(b.nilai,0) >0 ");
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
			this.fr1.chart.refresh();
		}
		
	},
	getChart: function(data,swf,autoRefresh){
		if (data === undefined) return;
		if (data.rs === undefined) return;
		
		var chart = {
		  "bg_colour":"#edf5f8",
		  "y_legend":{
			"text": "Jumlah","style": "{color: #736AFF; font-size: 12px;}"
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
		    temp = {"type":"bar_3d","alpha":     1.8,"colour":    "#418aac",
				
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
				temp.values.push(parseFloat(line.tot));
				chart.x_axis.labels.labels.push(line.nama);
				if (parseFloat(line.tot) > maxValue ) maxValue = parseFloat(line.tot);
				if (parseFloat(line.tot) < minValue ) minValue = parseFloat(line.tot);		
				key.push(line.nama);
			}	
			chart.elements.push(temp);		
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
			this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
			this.filter2 = this.sg1.getCell(2,1)+"/";
			this.report = new server_report_report();
			this.docViewer.src = this.report.previewWithHeader("server_report_dmt_rptSaldoPiutang",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pc1.setActivePage(this.pc1.childPage[2]);
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
	
	
	doOpenDoc: function(kode_cust){
		this.filter2 = this.sg1.getCell(2,1)+"/"+this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+"/"+
					   this.filterRep.filterStr("a.kode_cust","=",kode_cust,kode_cust,"where");
		
		this.docViewer2.src = this.report.previewWithHeader("server_report_dmt_rptKartuPiutang",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
	    this.pc1.setActivePage(this.pc1.childPage[3]);
	},
	doOpenDoc2: function(no_bukti){
		this.filter = "where a.no_ar='"+no_bukti+"'";
		this.docViewer3.src = this.report.previewWithHeader("server_report_dmt_rptFormInvoice1",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
	    this.filter = "";
		this.filter2=this.sg1.getCell(2,1)+"/"+" where a.no_bukti='"+no_bukti+"'";
		this.docViewer4.src = this.report.previewWithHeader("server_report_dmt_rptJurnal",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();

		this.pc1.setActivePage(this.pc1.childPage[4]);
	}
	
});

/**
 * 
 * 
 * 
 * 
 * 
 * **/
