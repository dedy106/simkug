// JavaScript Document
window.app_saku3_report_medrec_flRestKlpBiayaGrafik = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_medrec_flRestKlpBiayaGrafik.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_medrec_flRestKlpBiayaGrafik";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",":"+this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib;highchart");	
		this.pg1 = new pageControl(this,{bound:[0,0,this.width - 20, this.height -30], childPage:["Filter","Grafik","Tabel"], pageChange:[this,"doPageChange"]});
			
		this.p1 = new panel(this.pg1.childPage[0],{bound:[10,10,702,240],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,217],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
		
		this.viewer = new reportViewer(this.pg1.childPage[2],{bound:[0,0,this.width - 35, this.height - 35]});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	try{
		this.filterRep = new util_filterRep();
		this.gridLib = new util_gridLib();
		this.standar = new util_standar();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.dbLarge = new util_dbLarge();
		this.userStatus=this.app._userStatus;
		this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from dbexs.dbo.exs_harian ");
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","All",""));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
		this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Output Laporan","=","Layar"));
		this.sg1.onSelectCell.set(this, "doSelectCell");
		this.sg1.onCellExit.set(this, "doCellExit");
		this.sg1.onEllipsClick.set(this, "doEllipseClick");
		this.sg1.onChange.set(this, "sg1onChange");
		this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());	
		/*kirim mail*/
		uses("server_util_mail;portalui_ConfirmMail;");
		this.mail = new server_util_mail(undefined,this.app._lokasi);
		this.mail.addListener(this);
		this.chart = new highchart(this.pg1.childPage[1],{bound:[0,0,this.width - 25, this.height - 30], click:[this,"doClick"]});
		
	}catch(e){
		alert(e);
	}
};
window.app_saku3_report_medrec_flRestKlpBiayaGrafik.extend(window.portalui_childForm);
window.app_saku3_report_medrec_flRestKlpBiayaGrafik.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_lokasi, nama from lokasi where flag_konsol='0' order by kode_lokasi",
											"select count(*) from lokasi where flag_konsol='0'",
											new Array("kode_lokasi","nama"),"where",new Array("kode","nama"));
		}
		
		
	},
	doSelectCell: function(sender, col, row){
		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2),new  Array("123","123","123"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2),new  Array(2,0,2));
		
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from dbexs.dbo.exs_harian order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		
	},
	mainButtonClick: function(sender){
		try
		{
			this.pg1.setActivePage(this.pg1.childPage[1]);
			//this.p1.setVisible(false);
			this.viewer.prepare();
		
			//this.pg1.show();
			//this.app._mainForm.pButton.setVisible(false);
			//this.app._mainForm.reportNavigator.setVisible(true);
			this.lokasi=this.dbLib.getPeriodeFromSQL("select nama as periode from lokasi where kode_lokasi='"+this.sg1.getCell(2,0)+"'");
			this.filter=this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
						" and substring(a.kode_produk,1,1)='4'"
			this.filter2 = this.sg1.getCell(2,1)+"/"+this.sg1.getCell(1,1)+"/"+this.sg1.getCell(3,1);
			this.nama_report="server_report_saku3_medrec_rptRjtpKlpBiaya";
			this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		//	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		//	this.app._mainForm.reportNavigator.rearrange();
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
			this.page = 1;
			this.allBtn = false;
			
			
			var data = this.dbLib.getDataProvider("select a.kode_klp,a.awal,a.akhir,isnull(b.n1,0) as n1,isnull(b.n2,0) as n2,isnull(b.n3,0) as n3,isnull(b.n4,0) as n4 "+
					" ,isnull(b.n5,0) as n5, "+
					"		   isnull(b.n6,0) as n6,isnull(b.n7,0) as n7,isnull(b.n8,0) as n8,isnull(b.n9,0) as n9,isnull(b.n10,0) as n10,isnull(b.n11,0) as n11, "+
					"		   isnull(b.n12,0) as n12, isnull(b.total,0) as total"+
					"	from exs_klp_biaya a "+
					"	left join (select b.kode_klp, "+
					"					sum(case when substring(a.periode,5,2)='01' then 1 else 0 end) as n1, "+
					"					sum(case when substring(a.periode,5,2)='02' then 1 else 0 end) as n2, "+
					"					sum(case when substring(a.periode,5,2)='03' then 1 else 0 end) as n3, "+
					"					sum(case when substring(a.periode,5,2)='04' then 1 else 0 end) as n4, "+
					"					sum(case when substring(a.periode,5,2)='05' then 1 else 0 end) as n5, "+
					"					sum(case when substring(a.periode,5,2)='06' then 1 else 0 end) as n6, "+
					"					sum(case when substring(a.periode,5,2)='07' then 1 else 0 end) as n7, "+
					"					sum(case when substring(a.periode,5,2)='08' then 1 else 0 end) as n8, "+
					"					sum(case when substring(a.periode,5,2)='09' then 1 else 0 end) as n9, "+
					"					sum(case when substring(a.periode,5,2)='10' then 1 else 0 end) as n10, "+
					"					sum(case when substring(a.periode,5,2)='11' then 1 else 0 end) as n11, "+
					"					sum(case when substring(a.periode,5,2)='12' then 1 else 0 end) as n12, "+
					"					sum(case when substring(a.periode,5,2) between '01' and '12' then 1 else 0 end) as total "+
					"				FROM dbexs.dbo.exs_harian a "+
					"				left join exs_klp_biaya b on a.n21 between b.awal and b.akhir "+
					"				 "+ this.filter + 
					"				group by b.kode_klp "+
					"			  )b on a.kode_klp=b.kode_klp "+
					"	order by a.kode_klp", true);
			var categories = [];
			var series1 = {name:"Juli", data:[], color:"green"};
			var series2 = {name:"Totals", data:[], color:"blue"};
			for (var i = 0; i < data.rs.rows.length; i++){
				var line = data.rs.rows[i];
				categories.push(line.kode_klp);
				series1.data.push(parseFloat(line.n7));
				series2.data.push(parseFloat(line.total));
			}
			var options = {
				chart: {
		                renderTo: 'container',
		                type: 'line',
		                marginRight: 130,
		                marginBottom: 25,
		                resourceId:this.chart.resourceId
		            },
		            title: {
		                text: 'Realisasi Pengobatan RJTP',
		                x: -20 //center
		            },
		            subtitle: {
		                text: 'Bulan Juli',
		                x: -20
		            },
		            xAxis: {
		                categories: categories
		            },
		            yAxis: {
		                title: {
		                    text: ''
		                },
		                plotLines: [{
		                    value: 0,
		                    width: 1,
		                    color: '#808080'
		                }]
		            },
		            tooltip: {
		                formatter: function() {
		                        return '<b>'+ this.series.name +'</b><br/>'+
		                        this.x +': '+ this.y +' ';
		                }
		            },
		            
		            plotOptions: {
										column: {
											pointPadding: 0.2,
						                    borderWidth: 0,
										},
									 	series: {
									 		cursor :"pointer",
						                   
						                    point : {
						                    	events: {
						                    		click: function(e){
						                    			var resource = this.series.chart.options.chart.resourceId;
						                    			system.getResource(resource).pointClick(this.series.name, this.x, this.y);
						                    		}
						                    	}
						                    }
                						},
                						point : {

                						}
                				},
		            series: []
		        };
				options.series.push(series1);
				options.series.push(series2);
				this.chart.setChartData(options);
		}catch(e){
			alert(e);
			systemAPI.alert("[flJurnal]::mainButtonClick:"+e);
		}
	},
	doClick: function(sender,seriesName, x, y){
		alert(seriesName +":"+x+":"+y);
	}, 
	doRequestReady: function(sender, methodName, result){
		if (sender == this.report){
			/*kirim mail*/
			this.allHtml=this.getStringHeader()+loadCSS("server_util_laporan")+result+"</body></html>";
			switch (methodName)
			{
				case "preview" :
					this.viewer.preview(result);			
					this.viewer.hideLoading();
					break;
				
			}/*kirim mail*/
		}else if (sender === this.mail){
			if (methodName === "sendMail"){
				system.confirm(this, "Kirim Laporan","Pengiriman Sukses.","Laporan dikirim ke e-mail Anda.");
			}
		}
	},
	getStringHeader: function(){
		return  "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>"+
				"<html xmlns='http://www.w3.org/1999/xhtml'>"+
				"<head>"+
				"<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />"+
				"<title>Preview</title>"+
				"</head>"+
				"<body>";
	},
	doSelectedPage: function(sender, page){
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,page,  this.pager, this.showFilter, this.lokasi,this.filter2));
		this.page = page;
		this.allBtn = false;
	},
	doCloseReportClick: function(sender){	
	    switch(sender.getName()){
	    case "allBtn" :
			this.page = 1;
			this.allBtn = true;
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2));
			break;
	    case "pdfBtn" :
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
	      break;
	    case "xlsBtn" :
	      this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));       
	      break; 
		case "PreviewBtn" :
			window.open(this.report.previewWithHeader(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
			break;		  
		case "PrintBtn" :
	      try
	      {
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, (this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
			window.frames[this.viewer.getFullId() +"_iframe"].focus();
	        window.frames[this.viewer.getFullId() +"_iframe"].print();
	        
	        var cnv = undefined;
	        if (cnv != undefined)
	        {
	          cnv.focus();
	          cnv.print();
	        }
	      }catch(e)
	      {alert(e);}
	      
	      break; /*kirim mail*/
		case "MailBtn" :
			sender.owner = new portalui_ConfirmMail(this);
			sender.owner.setBound((this.width/2)-125,this.height/2-100,250,100);
			sender.owner.setCaption(sender.owner.title);
			sender.owner.setBorder(3);
		break;
	    default :
			this.pg1.hide();
	        //this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      break;
	  
	  }
	},/*kirim mail*/
	doConfirmClick: function(sender){
		try{
			if (sender === sender.owner.bConfirm){
				var to = sender.owner.getEmail();
				if (to !== ""){
					sender.owner.free();
					var d = new Date();
					var subject = this.app._namaForm;
					var pesan = this.viewer.getContent();
					this.mail.send(undefined,to,subject,pesan);
				}else{
					systemAPI.alert("Alamat email belum diisi!");
				}
			}else if (sender === sender.owner.bCancel){
				sender.owner.free();
			}
		}catch(e){
			alert("[doConfirmClick]: sender= "+sender+"; error= "+e);
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
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});
