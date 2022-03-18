//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_saku_gl_report_flBB3 = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_report_flBB3.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_gl_report_flBB3";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Buku Besar", 2);
		
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
			
			this.sg1.setRowCount(7);
			
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
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2,3,4,5,6),new  Array("1234","123","123","123","123","3","123"));
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 0,new Array(0,1,2,3,4,5,6),new  Array(0,2,2,2,2,0,1));
	
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
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Akun","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kode PP","All",""));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Kode DRK","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Tampil Mutasi Nol","=","Tidak"));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("Tanggal","All",""));
	this.doSelectCell(this.sg1,2,5);
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onCellExit.set(this, "doCellExit");
    this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = 1;
};
window.app_saku_gl_report_flBB3.extend(window.portalui_childForm);
window.app_saku_gl_report_flBB3.implement({
	doEllipseClick: function(sender, col, row){
		if (row ==0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											"select kode_lokasi, nama from lokasi where flag_konsol='0'",
											"select count(*) from lokasi where flag_konsol='0'",
											["kode_lokasi","nama"],"and",["Kode","Nama"]);
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
													  "select a.kode_akun, a.nama from masakun a where a.block= '0' "+
													   this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and ")+" ",
													  "select count(a.kode_akun) from masakun a where a.block= '0'"+
													  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
													  ["kode_akun","a.nama"],"and",["Kode Akun","Nama"]);
		}
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_pp, nama from pp "+
													   this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+" order by kode_pp",
													  "select count(kode_pp) from pp "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
													  ["kode_pp","nama"],"and",["Kode PP","Nama"]);
		}
		if (row == 4)
		{
			this.filterRep.ListDataSGFilter(this, "Data RKM",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_drk, nama from drk "+
													   this.filterRep.filterStr("tahun",this.sg1.getCell(1,0),this.sg1.getCell(2,0).substr(0,4),this.sg1.getCell(3,0).substr(0,4)," where ")+
													   this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and ")+" order by kode_drk",
													  "select count(kode_drk) from drk "+
													  this.filterRep.filterStr("tahun",this.sg1.getCell(1,0),this.sg1.getCell(2,0).substr(0,4),this.sg1.getCell(3,0).substr(0,4)," where ")+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," and "),
													  ["kode_drk","nama"],"and",["Kode DRK","Nama"]);
		}	
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5,6),new  Array("1234","123","123","123","123","3","123"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5,6),new  Array(2,0,2,2,2,0,1));
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4,5,6),new  Array("1234","123","123","123","123","3","123"));
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4,5,6),new  Array(2,0,2,2,2,0,1));
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Neraca Percobaan","Neraca Lajur"));
		}	
		if (row == 1)
		{			
			if (this.sg1.getCell(1,0) == "All")
			{
				if (col==2)
				{
					this.standar.isiItemsWithPeriodeLok(this.app._kodeLokasiKonsol,this.sg1.columns.get(2).pickList);
				}
				if (col==3)
				{
					this.standar.isiItemsWithPeriodeLok(this.app._kodeLokasiKonsol,this.sg1.columns.get(3).pickList);
				}
			}
			else
			{
				if (col==2)
				{
					this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(2).pickList);
				}
				if (col==3)
				{
					this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(3).pickList);
				}
			}
		}
		if (row == 5)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Tidak","Ya"));
		}
	},
	mainButtonClick: function(sender){
		try{
			this.p1.setVisible(false);
			this.viewer.prepare();
			this.viewer.setVisible(true);
			this.app._mainForm.pButton.setVisible(false);
			this.app._mainForm.reportNavigator.setVisible(true);
			this.nik_user=this.app._nikUser;
			this.lokasi=this.app._namalokasi;
			this.dbname = this.app._dbEng;
			this.filter=this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
				  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
			      this.filterRep.filterStr("kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
                    " and nik_user='"+this.nik_user+"'";
						
			this.filter2=this.filterRep.filterStr("periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where") +
				  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
						this.filterRep.filterStr("kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("kode_pp",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
						this.filterRep.filterStr("kode_drk",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");
			if (this.sg1.getCell(1,0) == "All")
			{
				this.kode_lokasi=this.app._kodeLokasiKonsol;
				this.kode_lokasi1=this.app._kodeLokasi1;
				this.kode_lokasi2=this.app._kodeLokasi2;
			}
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
			if (this.app._dbEng == "mysqlt")
			{
				var sql = "call sp_glma_tmp ('"+this.kode_lokasi+"','"+this.kode_lokasi1+"','"+this.kode_lokasi2+"','"+this.sg1.getCell(2,1)+"','"+this.nik_user+"')";
			}
			this.dthtml = "";
			this.dbLib.execQuerySync(sql);
			this.nama_report="server_report_gl_rptBB";
			this.scriptSqlCount = "select count(kode_akun) as tot from glma_tmp "+this.filter;
			this.sqlScript = "select * from glma_tmp " + this.filter +" and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0) order by kode_akun ";
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
			this.dbLib.getDataProviderPageA(this.sqlScript,1,this.pager);
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
			this.app._mainForm.reportNavigator.rearrange();
			
			//this.report.preview(this.nama_report,this.filter, 1, this.pager, this.showFilter, this.lokasi,this.filter2);
			this.page = 1;
			this.allBtn = false;
		}catch(e){
			systemAPI.alert("[flBB]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
	    if (sender == this.dbLib){	       	       
	       switch (methodName)
   		   {
                case "getDataProviderPage" : 
                    eval("result = "+result);                    
                    if (this.status){                        
                        this.dthtml += this.convertToHtml(result);                                             
                        if (this.totPageD > 0){
                            if (this.totPageD == this.pageD){                                                                
                                this.previewReport(this.dthtml);
                                this.status = undefined;
                                return false;
                            }
                            this.pageD++;
                            this.dbLib.getDataProviderPageA(this.sqlScriptD,this.pageD,200);
                        }else{                            
                           this.previewReport(this.dthtml);
                           this.status = undefined; 
                        }
                    }else{ 
                        this.dthtml = this.convertToHeader(result);                     
                    }
                break;
                case "getRowCount":
                    this.totPageD = result;
                break;
	       }
        }
	    if (sender == this.report){
    		switch (methodName){
    			case "preview" : 
    				this.viewer.preview(result);			
    				break;
    			
    		}
   		}
	},
	previewReport: function(dthtml){		
		this.viewer.preview(dthtml);
		this.allHtml = dthtml;
	},
	doSelectedPage: function(sender, page){
		this.dbLib.getDataProviderPageA(this.sqlScript,page,this.pager);
		this.page = page;
		this.allBtn = false;
	},
	doCloseReportClick: function(sender){		
	  switch(sender.getName())
	  {
	    case "allBtn" :
			this.page = 1;
			this.allBtn = true;
			this.dbLib.getDataProviderPageA(this.sqlScript,1,this.pager * this.viewer.getTotalPage());
			break;
	    case "pdfBtn" :
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_bb");				
	        this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_bb");				
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
			var result = this.dbLib.getDataProviderPage(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),true);
			var dthtml = this.convertToHtml(result);
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
	},
	convertToHtml: function(result){
	     try{  
	        var saldo=this.saldo;
			var debet=this.debet,kredit=this.kredit,line, html = "";			
			for (var i in result.rs.rows){
			    line = result.rs.rows[i]; 
				saldo = saldo + Math.round(parseFloat(line.debet)) - Math.round(parseFloat(line.kredit));	
				debet = debet + Math.round(parseFloat(line.debet));
				kredit= kredit +Math.round(parseFloat(line.kredit));	
				html += "<tr>"+
                    "<td valign='top' class='isi_laporan'>"+line.no_bukti+"</td>"+
                	"<td valign='top' class='isi_laporan'>"+line.no_dokumen+"</td>"+
                    "<td height='20' valign='top' class='isi_laporan'>"+line.tanggal+"</td>"+
                    "<td valign='top' class='isi_laporan'>"+line.keterangan+"</td>"+
                    "<td valign='top' class='isi_laporan'>"+line.kode_pp+"</td>"+
                    "<td valign='top' class='isi_laporan'>"+line.kode_drk+"</td>"+
                    "<td valign='top' class='isi_laporan'><div align='right' >"+floatToNilai(Math.round(parseFloat(line.debet)))+"</div></td>"+
                    "<td valign='top' class='isi_laporan'><div align='right'>"+floatToNilai(Math.round(parseFloat(line.kredit)))+"</div></td>"+
                    "<td valign='top' class='isi_laporan'><div align='right'>"+floatToNilai(Math.round(parseFloat(saldo)))+"</div></td>"+
                  "</tr>";                  
			}
			this.saldo = saldo;
			this.debet = debet;
			this.kredit = kredit;
			if (this.totPageD == this.pageD || this.totPageD == 0){
    			html +="<tr>"+
                    "<td height='20' colspan='6' valign='top' class='sum_laporan'><div align='right'>Mutasi</div></td>"+
                    "<td valign='top' class='sum_laporan'><div align='right'>"+floatToNilai(parseFloat(debet))+"</div></td>"+
                    "<td valign='top' class='sum_laporan'><div align='right'>"+floatToNilai(parseFloat(kredit))+"</div></td>"+
                    "<td valign='top' class='sum_laporan'></td>"+
                  "</tr>"+
                  "<tr>"+
                    "<td height='20' colspan='8' valign='top' class='sum_laporan'><div align='right'>Saldo Akhir </div></td>"+
                    "<td valign='top' class='sum_laporan'><div align='right'>"+floatToNilai(parseFloat(saldo))+"</span></div></td>"+
                  "</tr>"+
                "</table><br>";
            }
        return html;						
        }catch(e){
            alert(e);
        }
    },
    convertToHeader: function(result){     
        try{   
            if (result.rs.rows[0] !== undefined){
                var line = result.rs.rows[0];
                var html ="<table border='1' cellspacing='0' cellpadding='1' class='kotak'>"+
                  "<tr>"+
                    "<td height='23' colspan='9' class='header_laporan'><table width='622' border='0' cellspacing='2' cellpadding='1'>"+
                      "<tr>"+
                        "<td width='100' class='header_laporan'>Periode </td>"+
                        "<td width='496' class='header_laporan'>:&nbsp;"+line.periode+"</td>"+
                      "</tr>"+
                      "<tr>"+
                        "<td class='header_laporan'>Kode Akun  </td>"+
                        "<td class='header_laporan'>:&nbsp;"+line.kode_akun+"</td>"+
                      "</tr>"+
                      "<tr>"+
                        "<td class='header_laporan'>Nama Akun </td>"+
                        "<td class='header_laporan'>:&nbsp;"+line.nama+"</td>"+
                      "</tr>"+
                      "<tr>"+
                        "<td class='header_laporan'>Kode Lokasi </td>"+
                        "<td class='header_laporan'>:&nbsp;"+line.kode_lokasi+"</td>"+
                      "</tr>"+
                    "</table></td>"+
                  "</tr>"+
                  "<tr>"+
                    "<td height='23' colspan='8' class='header_laporan'><div align='right'>Saldo Awal </div></td>"+
                    "<td class='header_laporan'><div align='right'>"+floatToNilai(Math.round(parseFloat(line.so_awal)))+"</div></td>"+
                  "</tr>"+
                  "<tr bgcolor='#CCCCCC'>"+
                    "<td width='74' height='23' class='header_laporan'><div align='center'>No Bukti</div></td>"+
                	"<td width='74' height='23' class='header_laporan'><div align='center'>No Dokumen</div></td>"+
                    "<td width='69' class='header_laporan'><div align='center'>Tanggal</div></td>"+
                    "<td width='233' class='header_laporan'><div align='center'>Keterangan</div></td>"+
                    "<td width='50' class='header_laporan'><div align='center'>Kode PP</div></td>"+
                    "<td width='50' class='header_laporan'><div align='center'>Kode RKM</div></td>"+
                    "<td width='90' class='header_laporan'><div align='center'>Debet</div></td>"+
                    "<td width='90' class='header_laporan'><div align='center'>Kredit</div></td>"+
                    "<td width='90' class='header_laporan'><div align='center'>Balance</div></td>"+
                  "</tr>";
                  
                  this.sqlScriptD = "select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan, "+
                          "         case when a.dc='D' then nilai else 0 end as debet, "+
                          "         case when a.dc='C' then nilai else 0 end as kredit "+
                          "  from (select * from gldt_h "+this.filter2+" "+ 
                          "      union all "+
                          "  select * from gldt "+this.filter2+" ) a "+
                          "  where a.kode_akun='"+line.kode_akun+"' and a.kode_lokasi='"+line.kode_lokasi+"' "+
                          "  order by a.tanggal";
                  this.scriptSqlCountD = "select count(*) as tot "+
                          "  from (select * from gldt_h "+this.filter2+" "+ 
                          "      union all "+
                          "  select * from gldt "+this.filter2+" ) a "+
                          "  where a.kode_akun='"+line.kode_akun+"' and a.kode_lokasi='"+line.kode_lokasi+"' ";
                  this.dbLib.getRowCountA(this.scriptSqlCountD, 200);
                  this.saldo = Math.round(parseFloat(line.so_awal));
                  this.debet = 0;
                  this.kredit = 0;
                  this.status = "getDetail";              
                  this.pageD = 1;
                  this.dbLib.getDataProviderPageA(this.sqlScriptD,1,200);
                  return html;
            }else return "";
        }catch(e){
            alert(e);
        }
    }
});
