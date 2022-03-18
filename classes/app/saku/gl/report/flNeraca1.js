// JavaScript Document
window.app_saku_gl_report_flNeraca = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_report_flNeraca.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_gl_report_flNeraca";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Neraca", 2);
//----------------------------------------------------------------------------------------------		
		this.p1 = new portalui_panel(this);
		this.p1.setWidth(720);
		this.p1.setLeft(10);
		this.p1.setTop(10);
		this.p1.setHeight(250);
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
			
			this.sg1.setRowCount(3);
			this.sg1.setCell(0,0,"Periode");
			this.sg1.setCell(0,1,"Lokasi");
			this.sg1.setCell(0,2,"kode Akun");
			
		this.p2 = new portalui_panel(this.p1);
		this.p2.setTop(140);
		this.p2.setLeft(10);
		this.p2.setWidth((this.p1.getWidth() / 2) - 20 );
		this.p2.setHeight(80);
		this.p2.setCaption("Preview Selection");
		uses("portalui_radioButton");
		this.r1 = new portalui_radioButton(this.p2);
		this.r1.setTop(25);
		this.r1.setLeft(10);
		this.r1.setCaption("Grid");
		this.r1.setWidth(50);
		this.r1.setSelected(true);
		
		this.r2 = new portalui_radioButton(this.p2);
		this.r2.setTop(45);
		this.r2.setLeft(10);
		this.r2.setCaption("Report");
		this.r2.setWidth(50);
		
		this.p3 = new portalui_panel(this.p1);
		this.p3.setTop(140);
		this.p3.setLeft((this.p1.getWidth() / 2) + 10);
		this.p3.setWidth((this.p1.getWidth() / 2) - 20 );
		this.p3.setHeight(80);
		this.p3.setCaption("Graph Type");
		uses("portalui_radioButton");
		this.r3 = new portalui_radioButton(this.p3);
		this.r3.setTop(25);
		this.r3.setLeft(10);
		this.r3.setCaption("Bar");
		this.r3.setWidth(50);
		this.r3.setSelected(true);
		
		this.r4 = new portalui_radioButton(this.p3);
		this.r4.setTop(45);
		this.r4.setLeft(10);
		this.r4.setCaption("Pie");
		this.r4.setWidth(50);
		uses("portalui_reportViewer");

		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.hide();
		
		uses("portalui_arrayList");
		var itemSearch =  new portalui_arrayList();
		itemSearch.add("kode");
		itemSearch.add("nama");
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doBtnClick","doRowPPClick", true,itemSearch);		
		
		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);
//----------------------------------------------------------------------------------------------
		
		uses("portalui_treeGridItem");
		uses("portalui_treeGrid");
		this.tree = new portalui_treeGrid(this);		
		this.tree.setTop(5);
		this.tree.setLeft(5);
		this.tree.setWidth(this.getWidth() - 20);
		this.tree.setHeight(this.getHeight()-30);
		this.tree.setWidthColNo(250);
		this.tree.setDataCaption("Data / Items");
		this.tree.setColCount(6);	
		this.tree.hide();
		this.tree.onDblClick.set(this,"doDblClick");
			this.tree.columns.get(0).setTitle("Periode 1");
			this.tree.columns.get(1).setTitle("%");
			this.tree.columns.get(2).setTitle("Periode 2");
			this.tree.columns.get(3).setTitle("%");
			this.tree.columns.get(4).setTitle("Diff");
			this.tree.columns.get(5).setTitle("%");
			
		uses("util_dbLib");
		this.dblib = new util_dbLib();
		this.dblib.addListener(this);
			
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2),new  Array("1234","123","123"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,new Array(0,1,2),new  Array(0,2,2));
	
	uses("util_gridLib");
	this.gridLib = new util_gridLib();
	
	uses("util_standar");
	this.standar = new util_standar();
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Periode","=",this.app._mainForm._periode));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Versi Neraca","=",""));
	
	this.filter = "";
	uses("server_pdf_Pdf");
	this.pdf = new server_pdf_Pdf(window.system.serverApp);
	
	uses("server_graph_graph");
	this.graph = new server_graph_graph();
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());	
};
window.app_saku_gl_report_flNeraca.extend(window.portalui_childForm);
window.app_saku_gl_report_flNeraca.implement({
	doDblClick: function(sender, colIdx, rowIdx){
		alert(this.tree.getCell(colIdx, rowIdx));
	},
	doEllipseClick: function(sender, col, row){
		if (row ==1)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokasi, nama from lokasi ",
													  "select count(*) from lokasi ",
													  new Array("kode","nama"),"where");
		}
		else if (row ==2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Kelompok Neraca",this.sg1, this.sg1.row, this.sg1.col,
													  "select klp_nrc, nama from klp_nrc ",
													  "select count(*) from klp_nrc ",
													  new Array("klp_nrc","nama"),"where");
		}
	},
	doSelectCell: function(sender, col, row){
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2),new  Array("1234","123","123"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2),new  Array(0,2,2));
		
		if (row == 0)
		{
			this.standar.isiItemsWithPeriode(this.sg1.columns.get(2).pickList);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			this.p1.hide();		
			this.app._mainForm.pButton.hide();
			this.app._mainForm.reportNavigator.show();
			
			var filter = this.filterRep.filterStr("periode",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				  this.filterRep.filterStr("kode_fs",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				  
			var pageCount = this.dblib.getRowCount("select count(*) from neraca_lap "+filter, this.app._mainForm.reportNavigator.rowPerPage);	  
			this.viewer.setTotalPage(this.report.getTotalPage(filter,this.app._mainForm.reportNavigator.rowPerPage));
			this.filter = filter;
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			var showFilter = this.filterRep.showFilter(this.sg1);
			this.sql = "select kode, nama, N1 as Periode1, N2 as Persen, N3 as Periode2, N4 as Persen, N5 as diff,N6 as Persen from neraca_lap "+this.filter +" order by rowindex ";
			if (this.r2.isSelected())
			{
				var limit = this.getSQLLimit(1,this.app._mainForm.reportNavigator.rowPerPage);
				this.viewer.show();
				this.viewer.preview(this.pdf.getFullHtml(this.sql + limit));	  
				this.app._mainForm.reportNavigator.setTotalPage(pageCount);
				this.app._mainForm.reportNavigator.rearrange();
			}else
			{
				this.tree.show();
				this.dblib.listData("select kode, nama, level_spasi, level_lap, N1, N2, N3, N4, N5,N6 from neraca_lap "+filter +"order by rowindex",0,0);
			}								
		}catch(e){
			systemAPI.alert("[flTB]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		switch (methodName)
			{
				case "listData" : 
					this.menuStr = result;
					this.loadData();
					break;
				case "preview" : 
					this.viewer.preview(result);			
					break;
			}
	},
	loadData: function(){
		try
		{

			var menu = strToArray(this.menuStr);
			
			var rowNo = 0;		
			var itemValues = undefined;
			if (this.tree != undefined)
				this.tree.clear();
				
			var kode = undefined;
			var nama = undefined;
			var levelLap = undefined;
			var level = undefined;
			var item = undefined;
			var node = undefined;
			var values = Array();
			while (rowNo < menu.getLength())
			{
				itemValues = menu.get(rowNo);
				for (var i in itemValues.objList)
					if (i > 3)
					 values[i-4] = itemValues.get(i);
				kode = itemValues.get(0);	
				if (kode != "")
				{
					nama = itemValues.get(1);
					levelLap = itemValues.get(3);
					level = itemValues.get(2);				
					level++;
					if (node == undefined)
					{
						this.tree.addRowValues(this.tree,values);
						node = this.tree.rows.get(this.tree.rows.getLength()-1);
					}else if ((node instanceof portalui_treeGridItem) && (node.getLevel() == level - 1))
					{
						this.tree.addRowValues(node,values);
						node = this.tree.rows.get(this.tree.rows.getLength()-1);
					}else if ((node instanceof portalui_treeGridItem) && (node.getLevel() == level))
					{	
						this.tree.addRowValues(node.owner,values);
						node = this.tree.rows.get(this.tree.rows.getLength()-1);
					}else if ((node instanceof portalui_treeGridItem) && (node.getLevel() > level))
					{	
						if (!(node.owner instanceof portalui_treeGrid))
						{
							node = node.owner;
							while (node.getLevel() > level)
							{
								if (node.owner instanceof portalui_treeGridItem)
									node = node.owner;
							}
						}	
						this.tree.addRowValues(node.owner,values);
						node = this.tree.rows.get(this.tree.rows.getLength()-1);
					}		
					node.setDataCaption(nama);
					node.data = itemValues;
				}
				rowNo++;
			}
		}catch(e){
			systemAPI.alert("row "+ rowNo +" : "+e);
		}
	},
	doBtnClick: function(sender, text, field){
		try
		{
			if (sender == this.app._mainForm.reportNavigator.closeBtn)
			{
				this.r1.isSelected()?this.tree.hide():this.viewer.hide();		
				this.p1.show();
				this.app._mainForm.pButton.show();
				this.app._mainForm.reportNavigator.hide(0);
				
			}else if (sender == this.app._mainForm.reportNavigator.allBtn)
			{			
				this.sql = "select kode, nama, N1 as Periode1, N2 as Persen, N3 as Periode2, N4 as Persen, N5 as diff,N6 as Persen from neraca_lap "+this.filter +" order by rowindex ";
				if (this.r2.isSelected())
				{
					this.viewer.show();
					this.viewer.preview(this.pdf.getFullHtml(this.sql));	  
//				this.app._mainForm.reportNavigator.setHtml(this.pdf.getFullHtml(this.sql));
					this.app._mainForm.reportNavigator.setTotalPage(1);
					this.app._mainForm.reportNavigator.rearrange();
				}else
				{
					this.tree.show();
					this.dblib.listData("select kode, nama, level_spasi, level_lap, N1, N2, N3, N4, N5,N6 from neraca_lap "+this.filter +"order by rowindex",1,this.app._mainForm.reportNavigator.rowPerPage);
				}
			}else if ((sender == this.app._mainForm.reportNavigator.create) || (sender == this.app._mainForm.reportNavigator.edit) || (sender == this.app._mainForm.reportNavigator.del))
				this.doTransClick(sender, sender.getName());	
			else if (sender == this.app._mainForm.reportNavigator.b1)
				this.doFindClick(sender, text, field);
			else if (sender == this.app._mainForm.reportNavigator.graph)
				this.doGraphClick(sender);
			else if (sender == this.app._mainForm.reportNavigator.pdfBtn)
			{
				this.app._mainForm.reportNavigator.setAddress(this.pdf.createPdfFromSQL(this.sql, "L", "mm", "A4", 100, 7, 3));
			}else if (sender == this.app._mainForm.reportNavigator.xlsBtn)
			{
				this.app._mainForm.reportNavigator.setAddress(this.pdf.getXlsFromSQL(this.sql));
			}
		}catch(e){
			systemAPI.alert("[fromlist]::BtnClick:"+sender+":" +e);
		}
	},
	doRowPPClick: function(sender, rowperpage){
		if (this.r1.isSelected())
			this.dblib.listData("select kode, nama, level_spasi, level_lap, N1, N2, N3, N4, N5,N6 from neraca_lap "+this.filter +" order by rowindex",1,rowPerPage);
		else 
		{
			var limit = this.getSQLLimit(1,rowPerPage);
			this.viewer.show();
			this.viewer.preview(this.pdf.getFullHtml(this.sql + limit));	  		
			var pageCount = this.dblib.getRowCount("select count(*) from neraca_lap "+this.filter, rowperpage);
			this.app._mainForm.reportNavigator.setTotalPage(pageCount);
			this.app._mainForm.reportNavigator.rearrange();
			this.sql = "select kode, nama, N1 as Periode1, N2 as Persen, N3 as Periode2, N4 as Persen, N5 as diff,N6 as Persen  from neraca_lap "+this.filter +" order by rowindex";
		}
	},
	doSelectedPage: function(sender, pageSelected){
		if (this.r1.isSelected())	
			this.dblib.listData("select kode, nama, level_spasi, level_lap, N1, N2, N3, N4, N5,N6 from neraca_lap "+this.filter +"order by rowindex",
								pageSelected,this.app._mainForm.reportNavigator.rowPerPage);
		else 
		{
			var limit = this.getSQLLimit(pageSelected,this.app._mainForm.reportNavigator.rowPerPage);
			this.viewer.show();
			this.viewer.preview(this.pdf.getFullHtml(this.sql + limit));	  		
		}
		this.sql = "select kode, nama, N1 as Periode1, N2 as Persen, N3 as Periode2, N4 as Persen, N5 as diff,N6 as Persen  from neraca_lap "+this.filter +"order by rowindex";
	},
	getSQLLimit: function(page, rowPerPage){
		if (page > 0)
		{		
			var start = ((page-1) * rowPerPage);
			var end = page * rowPerPage;
			return " limit " + start + "," + rowPerPage;
		}else return "";
	},
	doGraphClick: function(sender){
	  var sql = "select nama, N1 as Periode1, N2 as Persen, N3 as Periode2, N4 as Persen, N5 as diff,N6 as Persen  from neraca_lap "+this.filter +" ";
	  var graphType = "";
	  if (this.r3.isSelected())
	    graphType = "bar";
	  else if (this.r4.isSelected())
	    graphType = "pie";
	  this.app._mainForm.reportNavigator.setAddress(this.graph.createGraph(sql, graphType, "Neraca",this.getWidth()-50, 400));
	},	
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});