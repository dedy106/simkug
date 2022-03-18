// JavaScript Document
window.app_saku_gl_report_flTbBank = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_report_flTbBank.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_gl_report_flTbBank";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Saldo Kas&Bank", 2);
		
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
		this.sg1.setHeight(200);
		this.sg1.setLeft(10);
		this.sg1.setTop(25);
		this.sg1.setColCount(4);
		
		
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
	}
	uses("util_filterRep");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2,3),new  Array("1234","123","123","3"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,new Array(0,1,2,3),new  Array(0,2,2,0));
	
	uses("util_gridLib");
	this.gridLib = new util_gridLib();
	
	uses("util_standar");
	this.standar = new util_standar();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	var tanda="=";
	var lokasi=this.app._lokasi;
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi",tanda,lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.app._periode));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Akun","=","111011"));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode PP ","=","01"));
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onCellExit.set(this, "doCellExit");
    this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.doSelectCell(this.sg1,2,4);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());	
};
window.app_saku_gl_report_flTbBank.extend(window.portalui_childForm);
window.app_saku_gl_report_flTbBank.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
											"select count(*) from lokasi where flag_konsol='0'",
											new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.kode_akun, a.nama from masakun a "+
													  "inner join flag_relasi b on a.kode_lokasi=a.kode_lokasi and (b.kode_flag='001' or b.kode_flag='009') and a.kode_akun=b.kode_akun "+
													  "where a.block= '0' "+
													   this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and ")+" ",
													  "select count(a.kode_akun) from masakun a "+
													  "inner join flag_relasi b on a.kode_lokasi=a.kode_lokasi and b.kode_flag='001' or b.kode_flag='009') and a.kode_akun=b.kode_akun "+
													  "where a.block= '0' "+
													  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
													  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama"]);
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.kode_pp, a.nama from pp a  "+
													   this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+" order by a.kode_cust",
													  "select count(a.kode_pp) from pp a "+
													  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
													  new Array("kode_pp","nama"),"where");
		}
	},
	doSelectCell : function(sender, col, row){
		this.sg1.columns.get(col).setReadOnly(false);
		if (this.userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3),new  Array("3","3","123","123"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3),new  Array(2,0,2,2));
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3),new  Array("3","3","123","3"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3),new  Array(3,0,2,2));
			this.sg1.columns.get(col).setReadOnly(true);
		}
		if (row == 1)
		{
			if (this.sg1.getCell(1,1) == "All")
			{
				this.standar.isiItemsWithPeriodeLok(this.app._kodeLokasiKonsol,this.sg1.columns.get(2).pickList);
			}
			else
			{
				this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(2).pickList);
			}
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Saldo Akhir","Mutasi"));
		}
		
	},
	mainButtonClick: function(sender){
		try
		{
			this.p1.setVisible(false);
		    this.viewer.prepare();
		    this.viewer.setVisible(true);
		    this.app._mainForm.pButton.setVisible(false);
		    this.app._mainForm.reportNavigator.setVisible(true);
			this.kode_lokasi=this.sg1.getCell(2,0);
			this.periode=this.sg1.getCell(2,1);
			this.kode_cust=this.sg1.getCell(2,2);
			this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						  this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
			this.showFilter = this.filterRep.showFilter(this.sg1);
			var result  = new portalui_arrayMap();
			var sql=" select a.kode_akun,a.nama,d.kode_pp,d.nama as nama_pp,ifnull(b.so_awal,0) as so_awal,ifnull(c.debet,0) as debet,ifnull(c.kredit,0) as kredit, "+
					 "	   ifnull(b.so_awal,0)+ifnull(c.debet,0)-ifnull(c.kredit,0) as so_akhir "+
					 "	from masakun a "+
					 "  cross join pp d on a.kode_lokasi=d.kode_lokasi "+
					 "	left join (select y.kode_akun,y.kode_pp,sum(case when y.dc='D' then y.nilai else -y.nilai end) so_awal "+
					 "			   from gldt_h y "+
					 "			   inner join flag_relasi z on y.kode_lokasi=z.kode_lokasi and (z.kode_flag='001' or z.kode_flag='009') and y.kode_akun=z.kode_akun "+	
					 "			   where y.periode<'"+this.periode+"' and y.kode_lokasi ='"+this.kode_lokasi+"' "+
					 "			   group by y.kode_akun,y.kode_pp "+
					 "			  ) b on a.kode_akun=b.kode_akun and d.kode_pp=b.kode_pp "+
					 "	left join (select x.kode_akun,x.kode_pp,sum(case when x.dc='D' then x.nilai else 0 end) as debet, "+
					 "					  sum(case when x.dc='C' then x.nilai else 0 end) as kredit "+
					 "			   from (select y.kode_akun,y.kode_pp,y.dc,y.nilai "+
					 "					 from gldt y "+
					 "			   		 inner join flag_relasi z on y.kode_lokasi=z.kode_lokasi and (z.kode_flag='001' or z.kode_flag='009') and y.kode_akun=z.kode_akun "+	
					 "					 where y.periode='"+this.periode+"' and y.kode_lokasi ='"+this.kode_lokasi+"' and substring(y.periode,1,4)=substring('"+this.periode+"',1,4) "+
					 "					 union all "+
					 "					 select y.kode_akun,y.kode_pp,y.dc,y.nilai "+
					 "					 from gldt_h y "+
					 "			   		 inner join flag_relasi z on y.kode_lokasi=z.kode_lokasi and (z.kode_flag='001' or z.kode_flag='009') and y.kode_akun=z.kode_akun "+	
					 "					 where y.periode='"+this.periode+"' and y.kode_lokasi ='"+this.kode_lokasi+"' and substring(y.periode,1,4)=substring('"+this.periode+"',1,4) "+
					 "					) x "+
					 "			   group by x.kode_akun,x.kode_pp "+
					 "			  ) c on a.kode_akun=c.kode_akun and d.kode_pp=c.kode_pp "+this.filter+
					 " and (so_awal<>0 or debet<>0 or kredit <>0) "+
					 "	group by a.kode_akun,d.kode_pp ";
			
			this.title = new server_util_arrayList({items:["Kode Akun","Nama Akun","Kode PP","Nama PP","Saldo Awal","Debet","Kredit","Saldo Akhir"]});			
			this.widthTable = new server_util_arrayList({items:[70,120,50,120,100,100,100,100]});
			this.fieldType = new server_util_arrayList({items:["S","S","S","s","N","N","N","N"]});		
			var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true);	
			this.sqlScript = this.sql;
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			this.previewReport(dthtml);
			
			
		}catch(e)
		{
			systemAPI.alert("[flTB]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>SALDO KAS BANK<br>Periode "+periodeToName(this.sg1.getCell(2,1))+"<br>";			
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
	},
	doCloseReportClick: function(sender){
	  switch(sender.getName())
	  {
	    case "allBtn" :
		  var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);			
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
	},
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});
	