window.app_saku_inventory_report_flAgingPC = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_report_flAgingPC.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_inventory_report_flAgingPC";
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Aging Piutang Per Customer", 2);
		this.p1 = new portalui_panel(this,{bound:[10,10,720,200],border:3, caption:"Filter"});
		uses("portalui_saiGrid");
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[10,25,700,170],colCount:4,cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"],
			ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"],
			buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		uses("server_report_report");
		this.report = new server_report_report();
		this.report.addListener(this);		
	}
	uses("util_filterRep;util_gridLib;util_standar");
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2],["3","13","3"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2],[2,2,1]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);	
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Customer","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Posisi Tanggal","<=",new Date().lclFormat()]);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_saku_inventory_report_flAgingPC.extend(window.portalui_childForm);
window.app_saku_inventory_report_flAgingPC.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row === 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_lokasi, nama from lokasi ",
											  "select count(*) from lokasi ",
											  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
			}
			if (row === 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Customer",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_cust, nama  from cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
											  "select count(*) from cust where kode_lokasi ='"+this.sg1.getCell(2,0)+"' ",
											  ["kode_cust","nama"],"and",["Kode","Nama Customer"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2],["3","13","26"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2],[2,2,1]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1,row,[0,1,2],["3","13","26"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1,row,[0,1,2],[3,2,1]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Customer","All",""]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Posisi Tanggal","<=",new Date().lclFormat()]);
			}else
			{
				uses("server_util_arrayList");
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("a.kode_cust",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("c.tanggal",this.sg1.getCell(1,2),this.sg1.getCellDateValue(2,2),this.sg1.getCellDateValue(3,2),"and");
				
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new portalui_arrayMap();
				this.filter2 = this.filterRep.filterStr("c.tanggal",this.sg1.getCell(1,2),this.sg1.getCellDateValue(2,2),this.sg1.getCellDateValue(3,2),"and");
				this.filter3 = this.filterRep.filterStr("e.tanggal",this.sg1.getCell(1,2),this.sg1.getCellDateValue(2,2),this.sg1.getCellDateValue(3,2),"and");
				var tanggal = this.sg1.getCellDateValue(2,2);
				var sql = "select a.kode_cust,a.nama,sum(b.aging1) as aging1,sum(b.aging2) as aging2,sum(b.aging3) as aging3,sum(b.aging4) as aging4 "+
						"	from cust a "+
						"	inner join (select kode_cust,kode_lokasi,tanggal "+
						"				from inv_jual_m "+
						"				group by kode_cust) c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
						"	left join (select a.kode_lokasi,a.kode_cust, "+
						"				  case when datediff('"+tanggal+"',a.tanggal)<=30 then ifnull(a.nilai+a.nilai_ppn,0)-ifnull(b.nilai,0)-ifnull(d.nilai,0) else 0 end as aging1, "+
						"				  case when (datediff('"+tanggal+"',a.tanggal)>30 and datediff('"+tanggal+"',a.tanggal)<=60) then ifnull(a.nilai+a.nilai_ppn,0)-ifnull(b.nilai,0)-ifnull(d.nilai,0) else 0 end as aging2, "+
						"				  case when (datediff('"+tanggal+"',a.tanggal)>60 and datediff('"+tanggal+"',a.tanggal)<=90) then ifnull(a.nilai+a.nilai_ppn,0)-ifnull(b.nilai,0)-ifnull(d.nilai,0) else 0 end as aging3, "+
						"				  case when datediff('"+tanggal+"',a.tanggal)>90 then ifnull(a.nilai+a.nilai_ppn,0)-ifnull(b.nilai,0)-ifnull(d.nilai,0) else 0 end as aging4 "+
						"		   from inv_jual_m a  "+
						"		   left join kas_d b on a.no_jual=b.no_bukti and a.kode_lokasi=b.kode_lokasi  "+
						"		   left join kas_m c on b.no_kas=c.no_kas and b.kode_lokasi=c.kode_lokasi "+this.filter2+
						"		   left join gb_d d on a.no_jual=d.no_bukti and a.kode_lokasi=d.kode_lokasi  "+
						"		   left join gb_m e on d.no_gb=e.no_gb and d.kode_lokasi=e.kode_lokasi "+this.filter3+
						"		   where ifnull(a.nilai+a.nilai_ppn,0)-ifnull(b.nilai,0)-ifnull(d.nilai,0)>0 "+
						"		   )b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+this.filter+
						"	group by a.kode_cust order by a.kode_cust ";
				this.scriptSqlCount = "select count(a.kode_cust) "+
						"	from cust a "+
						"	inner join (select kode_cust,kode_lokasi,tanggal "+
						"				from inv_jual_m"+
						"				group by kode_cust) c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+this.filter;
				
				this.title = new server_util_arrayList({items:["Kode Cust","Nama Customer","0 - 30 Hari","31 - 60 Hari","61 - 90 Hari","> 90 Hari"]});
				this.widthTable = new server_util_arrayList({items:[60,250,100,100,100,100]});
				this.fieldType = new server_util_arrayList({items:["S","S","N","N","N","N"]});
				var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title,  this.widthTable, this.fieldType,true);
				
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku_inventory_report_flAgingPC]::mainButtonClick:"+e);
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
		var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var header = "AGING PIUTANG PER CUSTOMER";
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>"+header+"<br>";
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
			html.add(new Date().valueOf()+"_kb");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_kb");				
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
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);
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