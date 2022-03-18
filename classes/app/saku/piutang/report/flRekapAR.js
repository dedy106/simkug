window.app_saku_piutang_report_flRekapAR = function(owner)
{
	try{
		if (owner)
		{		
			window.app_saku_piutang_report_flRekapAR.prototype.parent.constructor.call(this,owner);
			this.className = "app_saku_piutang_report_flRekapAR";
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Rekap Piutang",2);
			
			this.p1 = new portalui_panel(this);
			this.p1.setWidth(720);
			this.p1.setLeft(10);
			this.p1.setTop(10);
			this.p1.setHeight(200);
			this.p1.setBorder(3);
			this.p1.setCaption("Filter");
			
			uses("portalui_saiGrid");
			this.sg1 = new portalui_saiGrid(this.p1);
			this.sg1.setWidth(700);
			this.sg1.setHeight(150);
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
				this.sg1.columns.get(2).setReadOnly(true);
				this.sg1.columns.get(3).setColWidth(150);
				this.sg1.columns.get(3).setTitle("To");
				this.sg1.setRowCount(5);
				
			uses("portalui_reportViewer");
			this.viewer = new portalui_reportViewer(this);
			this.viewer.setWidth(this.getWidth());
			this.viewer.setHeight(this.getHeight());
			this.viewer.setTop(0);
			this.viewer.setVisible(false);
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
			
			//uses("server_report_report");
			//this.report = new server_report_report();
			//this.report.addListener(this);
		}
		uses("util_filterRep");
		this.filterRep = new util_filterRep();		
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1,2,3,4],[2,2,0,0,0]);
		this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1,2,3,4],["13","3i","13","13","13"]);
		
		uses("util_gridLib;util_standar");
		this.gridLib = new util_gridLib();
		this.standar = new util_standar();
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		
		this.userStatus=this.app._userStatus;
		this.tanda="=";
		this.lokasi=this.app._lokasi;		
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi","=",this.app._lokasi]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Jurusan","=",""]);
		this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Angkatan","All",""]);
		this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Periode","=",this.app._periode]);
		this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Report Format","=","S1"]);
		this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	}catch(e){
		system.alert(this,e,"");
	}
};
window.app_saku_piutang_report_flRekapAR.extend(window.portalui_childForm);
window.app_saku_piutang_report_flRekapAR.prototype.doEllipseClick= function(sender, col, row)
{
	if (row == 0)
	{				
		this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
									  "select kode_lokasi, nama from lokasi ",
									  "select count(*) from lokasi ",
									  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
	}
	if (row == 1)
	{
		var multiSelection = false;
		if (this.sg1.cells(1,row) == "in") multiSelection = true;
		this.standar.ListDataSGFilter2(this, "Data Jurusan",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_jur,nama_jur from jurusan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									"select count(*) from jurusan "+this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where"),
									["kode_jur","nama_jur"],"and",["Kode Jurusan","Nama"], false, multiSelection);
	}
	if (row == 2)
	{
		this.standar.ListDataSGFilter2(this, "Data Angkatan",this.sg1, this.sg1.row, this.sg1.col,
									"select kode_ang,nama_ang from angkatan "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
									"select cpunt(*) from angkatan "+
										this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
										this.filterRep.filterStr("kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and"),
									["kode_ang","nama_ang"],"and",["Kode angkatan","Angkatan"]);
	}
};
window.app_saku_piutang_report_flRekapAR.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{		
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,2,2,0,0]);
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["13","3i","13","136","13"]);
	}else
	{		
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,2,2,0,0]);
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3i","13","136","13"]);
	}
	if (row == 3)
	{
		if (this.sg1.getCell(1,0) == "All")
		{
			this.standar.isiItemsWithPeriodeLok(this.app._kodeLokasiKonsol,this.sg1.columns.get(2).pickList);
		}else
		{
			this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(2).pickList);
		}
	}
	if (row == 4)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.sg1.columns.get(2).pickList.set(0,"S1");
		this.sg1.columns.get(2).pickList.set(1,"S2");
	}
};
window.app_saku_piutang_report_flRekapAR.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi",this.tanda,this.lokasi]);
			this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Jurusan","=",""]);
			this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Angkatan","All",""]);
			this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Periode","=",this.app._periode]);
			this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Report Format","=","S1"]);
		}else
		{
			this.p1.setVisible(false);
	    	this.viewer.prepare();
	    	this.viewer.setVisible(true);
	    	this.app._mainForm.pButton.setVisible(false);
	    	this.app._mainForm.reportNavigator.setVisible(true);
			
	    	this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("a.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("a.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");	    	
	    	this.showFilter = this.filterRep.showFilter(this.sg1);
	    	var isnull = this.app._dbEng == "mysqlt" ? "ifnull" :"isnull";
			switch(this.sg1.getCell(1,2)){
    			case "All":
    			    var data = this.dbLib.getDataProvider("select max(kode_ang) as kd1, min(kode_ang) as kd2 from angkatan where kode_lokasi = '"+this.app._lokasi+"' ",true); 
    			    if (typeof data != "string"){
    			        if (data.rs.rows[0]){
    			            this.angk1=data.rs.rows[0].kd2;    				
        				    this.angk2=data.rs.rows[0].kd1;           				    
                        }else{ 
        			        this.angk1="";    				
        				    this.angk2="";  
       				    }
                    }else{
                        this.angk1="";    				
    				    this.angk2=""; 
                    }                     
                break;
                case "Range" :
    				this.angk1=this.sg1.getCell(2,2);
    				this.angk2=this.sg1.getCell(3,2);
    				break;
			     case "=" :
    				this.angk1=this.sg1.getCell(2,2);
    				this.angk2=this.sg1.getCell(2,2);
                    break;
		    };
		    var jurusan= this.sg1.getCell(2,1).replace(/,/gi,"|");
		    if (this.sg1.getCell(1,3) == "=")
				var sql = "call sp_rekaparbln ('"+this.sg1.getCell(2,0)+"','"+jurusan+"','"+this.sg1.getCell(3,1)+"','"+this.angk1+"','"+this.angk2+"','"+this.sg1.getCell(2,3)+"','"+this.app._nikUser+"')";						
		    else 
				var sql = "call sp_rekapar ('"+this.sg1.getCell(2,0)+"','"+jurusan+"','"+this.sg1.getCell(3,1)+"','"+this.angk1+"','"+this.angk2+"','"+this.sg1.getCell(2,3)+"','"+this.app._nikUser+"')";						
			
			var ret = this.dbLib.execQuerySync(sql);			
			if (ret.toLowerCase().search("error") > -1) systemAPI.alert(ret);			
			if (this.sg1.cells(2,4) == "S1"){			
				var sql = "select a.kode_jur, b.nama_jur,a.kode_ang, a.nama_ang, "+
                        " sum(bpp_sblm - byr_bppsblm) as sawal, sum(bpp - byr_bpp) as bpp, sum(sdp2 - byr_sdp2) as sdp2, sum(up3 - byr_up3) as up3, sum(sks - byr_sks) as sks, sum(cuti - byr_cuti) as cuti, sum(wisuda - byr_wisuda) as wisuda, sum(denda - byr_denda) as denda, "+
                        " sum((bpp - byr_bpp) + (sdp2 - byr_sdp2) + (up3 - byr_up3) + (sks - byr_sks) + (cuti - byr_cuti) + (wisuda - byr_wisuda)+ (denda - byr_denda)) as jumlah "+
				        "   from angkatan a inner join jurusan b on b.kode_jur = a.kode_jur and a.kode_lokasi = b.kode_lokasi "+
				        "   inner join tmp_rekapar c on c.kode_ang = a.kode_ang and c.kode_jur = a.kode_jur and c.kode_lokasi = a.kode_lokasi "+
				        this.filter + 
				        "   and nik_user = '"+this.app._nikUser+"' "+
				        "group by a.kode_jur, b.nama_jur, a.kode_ang, a.nama_ang "+
						"order by a.kode_jur, b.nama_jur, a.kode_ang";
                
                this.scriptSqlCount = "select count(*) "+
						"from angkatan a inner join jurusan b on b.kode_jur = a.kode_jur and a.kode_lokasi = b.kode_lokasi "+
						this.filter+"   and nik_user = '"+this.app._nikUser+"' ";				
				var title = new server_util_arrayList();			
				title.add("Kode Jur");title.add("Jurusan");title.add("Angkatan");title.add("Thn Ajaran");title.add("Saldo Awal");title.add("BPP");
				title.add("SDP2");title.add("UP3");title.add("SKS");title.add("Cuti");title.add("wisuda");title.add("Denda");title.add("Jumlah");			
				var width = new server_util_arrayList();			
				width.add(100);width.add(250);width.add(100);width.add(100);width.add(100);width.add(100);
				width.add(100);width.add(100);width.add(100);width.add(100);width.add(100);width.add(100);width.add(100);			
				var fieldType = new server_util_arrayList();			
				fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("N");fieldType.add("N");
				fieldType.add("N");fieldType.add("N");fieldType.add("N");fieldType.add("N");fieldType.add("N");fieldType.add("N");fieldType.add("N");						
				var groupBy = new server_util_arrayList();			
				groupBy.add("kode_jur");groupBy.add("nama_jur");
				var groupHeader = new server_util_arrayList({items:["kode_jur"]});							
				var summary = new server_util_arrayList({items:["N","N","N","N","Y","Y","Y","Y","Y","Y","Y","Y","Y"]});							
				this.dbLib.sqlToHtmlA(sql,1,this.pager, title, width, fieldType,true,groupBy, summary,groupHeader);			
			}else {				
				var sql = "select concat(b.kode_jur,'-',b.nama_jur) as jurusan , concat(a.kode_ang, '-',a.nama_ang) as angkatan, c.kode_produk, c.nama_produk "+
						"	, "+isnull+"(d.bpp,0) - "+isnull+"(e.bpp,0) as nilai  "+
						"from angkatan a inner join jurusan b on b.kode_jur = a.kode_jur and a.kode_lokasi = b.kode_lokasi "+
						"	inner join produk c on c.kode_jur = b.kode_jur and c.kode_lokasi = b.kode_lokasi "+
						"	left outer join ("+this.getProdukMhs()+") d on d.kode_jur = a.kode_jur and d.kode_ang = a.kode_ang and d.kode_lokasi = a.kode_lokasi  and d.kode_produk = c.kode_produk "+
						"	left outer join ("+this.getByrProdukMhs()+") e on e.kode_jur = a.kode_jur and e.kode_ang = a.kode_ang and e.kode_lokasi = a.kode_lokasi and e.kode_produk = c.kode_produk "+
						this.filter+
						"order by b.kode_jur, a.kode_ang, c.kode_produk";
				this.scriptSqlCount = "select count(*) as tot "+
						"from angkatan a inner join jurusan b on b.kode_jur = a.kode_jur and a.kode_lokasi = b.kode_lokasi "+
						"	inner join produk c on c.kode_jur = b.kode_jur and c.kode_lokasi = b.kode_lokasi "+this.filter;
				
				var title = new server_util_arrayList();			
				title.add("Jurusan");title.add("Angkatan");title.add("Kode Produk");title.add("Nama Produk");title.add("Nilai");
				var width = new server_util_arrayList();			
				width.add(150);width.add(100);width.add(80);width.add(150);width.add(100);
				var fieldType = new server_util_arrayList();			
				fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("S");fieldType.add("N");				
				var groupBy = new server_util_arrayList();			
				groupBy.add("jurusan");groupBy.add("angkatan");
				var groupHeader,summary = new server_util_arrayList({tems:["N","N","N","N","Y"]});										
				this.dbLib.sqlToHtmlA(sql,1,this.pager, title, width, fieldType,true,groupBy,summary);
			}						
			this.title = title;
			this.widthTable = width;
			this.fieldType = fieldType;
			this.sqlScript = sql;
			this.groupBy = groupBy;
			this.summary = summary;
			this.groupHeader = groupHeader;
			this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
			this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	    	this.app._mainForm.reportNavigator.rearrange();
			//this.previewReport(dthtml);
		}
    }catch(e)
	{
		alert("[app_saku_piutang_report_flRekapAR]::mainButtonClick:"+e);
	}
};
window.app_saku_piutang_report_flRekapAR.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.report){
			switch (methodName)
			{
				case "preview" : 
					this.viewer.preview(result);			
					break;
				
			}
	}
	if (sender == this.dbLib){
		if (methodName == "sqlToHtml"){	
			if (result == undefined)
				system.alert(this,"Permintaan data gagal","Mungkin data terlalu besar. Gunakan <i>Pagi</i>ng saja.");
			else this.previewReport(result);
		}
	}
};
window.app_saku_piutang_report_flRekapAR.prototype.doSelectedPage = function(sender, page)
{	
	this.dbLib.sqlToHtmlA(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy,this.summary,this.groupHeader);
	//this.previewReport(dthtml);
	this.page=page;
};
window.app_saku_piutang_report_flRekapAR.prototype.previewReport = function(dthtml)
{
	var html = "<div align='center'><br><br>"+
				"<div class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>LAPORAN REKAP PIUTANG</div><br>";			
	html += "<br><div align='center' style='{font-size:9;font-family:arial;font-weight:normal;}'>"+ this.showFilter+"</div>";
	var d = new Date();	
	html += "<div align='center' style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</div><br>";
	html += "</div>";
	html += "<center>"+dthtml+"</center>";
	this.viewer.preview(html);
	this.allHtml = html;
};
window.app_saku_piutang_report_flRekapAR.prototype.doCloseReportClick = function(sender)
{
  switch(sender.getName())
  {
    case "allBtn" :
		this.page = 1;
	  this.dbLib.sqlToHtmlA(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,this.groupBy,this.summary,this.groupHeader);			
	  this.previewReport(dthtml);			
      break;
    case "pdfBtn" :      
	  var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("pdf");			
		html.add("RekapAR");				
      this.viewer.useIframe(upDownHtml(html));
      break;
    case "xlsBtn" :	
      var html = new server_util_arrayList();
		html.add(this.allHtml);			
		html.add("xls");			
		html.add("RekapAR");				
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
		//var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);			
		//this.previewReport(dthtml);
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
};
window.app_saku_piutang_report_flRekapAR.prototype.getProdukMhs = function()
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, b.kode_produk, "+
						"	  sum(b.jumlah * b.nilai) as bpp"+						
						"	  from armhs_m a "+
						"	    inner join armhs_d b on b.no_invoice = a.no_invoice and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.periode","<=",this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur, b.kode_produk";
};
window.app_saku_piutang_report_flRekapAR.prototype.getByrProdukMhs = function()
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, b.kode_produk, "+
						"	  sum(b.disc + case when substring(b.akun_piutang,1,1) = '1' then 1 else -1 end * b.nilai) as bpp "+						
						"	  from arbyrmhs_m a "+
						"	    inner join arbyrmhs_d b on b.no_bukti = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.periode","<=",this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur, b.kode_produk";
};
window.app_saku_piutang_report_flRekapAR.prototype.getInvoiceMhs = function()
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, "+
						"	  sum(case when c.nama_produk like '%BPP%' then b.jumlah * b.nilai else 0 end) as bpp, "+
						"	  sum(case when c.nama_produk like '%SDP2%' then b.jumlah * b.nilai else 0 end) as sdp2,"+
						"	  sum(case when c.nama_produk like '%UP3%' then b.jumlah * b.nilai else 0 end) as up3,"+
						"	  sum(case when c.nama_produk like '%SKS%' then b.jumlah * b.nilai else 0 end) as sks,"+
						" 	  sum(case when c.nama_produk like '%CUTI%' then b.jumlah * b.nilai else 0 end) as cuti,"+
						"	  sum(case when c.nama_produk like '%WISUDA%' then b.jumlah * b.nilai else 0 end) as wisuda,"+
						"	  sum(case when c.nama_produk like '%DENDA%' then b.jumlah * b.nilai else 0 end) as denda "+
						"	  from armhs_m a "+
						"	    inner join armhs_d b on b.no_invoice = a.no_invoice and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.periode","<=",this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur";
};
window.app_saku_piutang_report_flRekapAR.prototype.getByrMhs = function()
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, "+
						"	  sum(case when c.nama_produk like '%BPP%' then b.disc + b.nilai else 0 end) as bpp, "+
						"	  sum(case when c.nama_produk like '%SDP2%' then b.disc + b.nilai else 0 end) as sdp2,"+
						"	  sum(case when c.nama_produk like '%UP3%' then b.disc + b.nilai else 0 end) as up3,"+
						"	  sum(case when c.nama_produk like '%SKS%' then b.disc + b.nilai else 0 end) as sks,"+
						" 	  sum(case when c.nama_produk like '%CUTI%' then b.disc + b.nilai else 0 end) as cuti,"+
						"	  sum(case when c.nama_produk like '%WISUDA%' then b.disc + b.nilai else 0 end) as wisuda,"+
						"	  sum(case when c.nama_produk like '%DENDA%' then b.disc + b.nilai else 0 end) as denda "+
						"	  from arbyrmhs_m a "+
						"	    inner join arbyrmhs_d b on b.no_bukti = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.periode","<=",this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur";
};
window.app_saku_piutang_report_flRekapAR.prototype.getBPPBefore = function()
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, "+
						"	  sum(case when c.nama_produk like '%BPP%' then b.jumlah * b.nilai else 0 end) as bpp "+						
						"	  from armhs_m a "+
						"	    inner join armhs_d b on b.no_invoice = a.no_invoice and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.periode","<",this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur";
};
window.app_saku_piutang_report_flRekapAR.prototype.getBPPByrBefore = function()
{
	return "select a.kode_lokasi, d.kode_ang, d.kode_jur, "+
						"	  sum(case when c.nama_produk like '%BPP%' then b.disc + b.nilai else 0 end) as bpp "+						
						"	  from arbyrmhs_m a "+
						"	    inner join arbyrmhs_d b on b.no_bukti = a.no_bukti and b.kode_lokasi = a.kode_lokasi "+
						"	    inner join produk c on c.kode_produk = b.kode_produk and c.kode_lokasi = b.kode_lokasi "+
						"	    inner join mhs d on d.npm = a.ref1 and d.kode_lokasi = a.kode_lokasi "+
						this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("d.kode_jur",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						this.filterRep.filterStr("d.kode_ang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.periode","<",this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+																	
						"	group by a.kode_lokasi, d.kode_ang, d.kode_jur";
};
window.app_saku_piutang_report_flRekapAR.prototype.sg1onChange = function(sender, col , row)
{
    if (col==1)
	{
	     if (this.sg1.getCell(1,row)=="All")
		 {
			this.sg1.setCell(2,row,"");
			this.sg1.setCell(3,row,"");
		 }else if (this.sg1.getCell(1,row)=="Range"){
			if (this.sg1.cells(3,row) == "") this.sg1.setCell(3,row,this.sg1.cells(2,row));
		 }
	} else if (col == 2){
		if (this.sg1.getCell(1,row)=="Range"){
			if (this.sg1.cells(3,row) == "") this.sg1.setCell(3,row,this.sg1.cells(2,row));
		}
	}
};
window.app_saku_piutang_report_flRekapAR.prototype.doRowPerPageChange = function(sender, rowperpage)
{
	this.pager = rowperpage;
	this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
	this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
	this.app._mainForm.reportNavigator.rearrange();
	this.doSelectedPage(undefined, 1);
};
