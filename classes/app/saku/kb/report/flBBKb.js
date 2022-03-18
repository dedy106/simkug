//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.app_saku_kb_report_flBBKb = function(owner)
{
	if (owner)
	{
		window.app_saku_kb_report_flBBKb.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_kb_report_flBBKb";
		this.maximize();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Buku Besar KasBank", 2);
		
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
			
			this.sg1.setRowCount(8);
			
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);		


		uses("server_report_simpleReport");
		this.report = new server_report_simpleReport();
		//this.report.addListener(this);
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
	this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Sort by","=","Tanggal, No. Dokumen"));
	this.doSelectCell(this.sg1,2,5);
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onCellExit.set(this, "doCellExit");
    this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	/*kirim mail*/
	uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
};
window.app_saku_kb_report_flBBKb.extend(window.portalui_childForm);
window.app_saku_kb_report_flBBKb.implement({
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
												  "select a.kode_akun, a.nama from masakun a "+
												  "inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												  "where a.block= '0' and (b.kode_flag='001' or b.kode_flag='009') "+
												  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,1)," and ")+
												  " order by a.kode_akun",
												  "select count(a.kode_akun) from masakun a "+
												  "inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												  "where a.block= '0' and (b.kode_flag='001' or b.kode_flag='009') "+
												  this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,1)," and "),
												  new Array("a.kode_akun","nama"),"and",new Array("kode akun","nama"));
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
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["1234","123","123","123","123","3","123","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[2,0,2,2,2,0,1,0]);
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["1234","123","123","123","123","3","123","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[3,0,2,2,2,0,1,0]);
		}
		if (row == 3)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Neraca Percobaan","Neraca Lajur"));
		}	
		if (row == 1)
		{
		this.sg1.columns.get(2).pickList.clear();
		this.dbLib.setItemsFromSQL("select distinct periode from kas_j where kode_lokasi='"+this.app._lokasi+"' order by periode",[this.sg1.columns.get(2).pickList]);
		}
		if (row === 5)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Tidak","Ya"));
		}
		if (row === 7)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Tanggal, No. Bukti","Tanggal, No. Dokumen"]);
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
			switch(this.sg1.getCell(1,2)){
    			case "All":
    			    var data = this.dbLib.getDataProvider("select max(kode_akun) as kd1, min(kode_akun) as kd2 from masakun where kode_lokasi = '"+this.app._lokasi+"' ",true); 
    			    if (typeof data != "string"){
    			        if (data.rs.rows[0]){
    			            this.kode_akun1=data.rs.rows[0].kd2;    				
        				    this.kode_akun2=data.rs.rows[0].kd1;           				    
                        }else{ 
        			        this.kode_akun1="";    				
        				    this.kode_akun2="";  
       				    }
                    }else{
                        this.kode_akun1="";    				
    				    this.kode_akun2=""; 
                    }                     
                break;
                case "Range" :
    				this.kode_akun1=this.sg1.getCell(2,2);
    				this.kode_akun2=this.sg1.getCell(3,2);
    				break;
			     case "=" :
    				this.kode_akun1=this.sg1.getCell(2,2);
    				this.kode_akun2=this.sg1.getCell(2,2);
                    break;
		    };
		    var tampilNol = this.sg1.getCell(2,5).toLowerCase() == "ya" ? "1" : "0";
		    switch(this.sg1.getCell(1,1)){
		        case "All":
    				var periode1="";
    				var periode2=""; 
                break;
                case "Range" :
    				var periode1=this.sg1.getCell(2,1);
    				var periode2=this.sg1.getCell(3,1);
    				break;
			     case "=" :
    				var periode1=this.sg1.getCell(2,1);
    				var periode2=this.sg1.getCell(2,1);    				
                    break;  
		    }
		    this.filter = "where nik_user = '"+this.nik_user+"' "+this.filterRep.filterStr("kode_pp",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and") +
		          this.filterRep.filterStr("kode_drk",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and");

			var sql = "call sp_bbkas ('"+this.kode_akun1+"','"+this.kode_akun2+"','"+this.sg1.getCell(2,0)+"','"+periode1+"','"+periode2+"','"+this.nik_user+"','"+tampilNol+"')";
			this.dbLib.execQuery(sql);						
			this.filter2 = periode1;
			this.kd_akun = "";
			this.pageHtml = new portalui_arrayMap();						
			this.page = 1;
			this.nama_report = "server_report_gl_rptBB2";
			this.sql = "select no_urut,a.kode_akun,a.nama,a.kode_lokasi,periode,so_awal, "+
								" no_bukti,no_dokumen,date_format(tanggal,'%d/%m/%Y') as tanggal,keterangan,kode_pp,kode_drk,debet,kredit,totdebet, totkredit, saldo "+
							   " from bb_tmp a "+this.filter+" order by no_urut";
			this.sqlTotal = "select count(*) as jml from bb_tmp a "+this.filter+"";    		
			this.showFilter = periode1 == periode2 ? "Periode "+monthName["ID"][periode1.substr(4,2)] +" "+periode1.substr(0,4):"Periode "+monthName["ID"][periode1.substr(4,2)]+" - "+monthName["ID"][periode2.substr(4,2)] +" "+periode1.substr(0,4);
		}catch(e){
			systemAPI.alert("[flBB]::mainButtonClick:"+e);
		}
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
		}else if (sender === this.dbLib){
		    try{
                switch (methodName)
    			{
					case "execQuery":												
						this.viewer.setTotalPage(this.dbLib.getRowCount(this.sqlTotal,this.pager));
						this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
						this.app._mainForm.reportNavigator.rearrange();
						this.dbLib.getDataProviderPageA(this.sql,1,this.pager);									
						this.listAkun = new portalui_arrayMap();
						this.sawalAkunPerPage = new portalui_arrayMap();
						this.allBtn = false;
					break;
    				case "getDataProviderPage" :
    				    eval("result = "+result);		
                        var tanggal = new Date().lclFullFormat();		    
    				    var allHtml="<div align='center'>";
    				    allHtml += "<table border='0' cellspacing='0' cellpadding='0' width ='100%'>";
                        allHtml += "<tr>";
                        allHtml += "        <td colspan='2' class='lokasi_laporan'><div align='center'>"+this.lokasi+"</div></td>";
                        allHtml += "      </tr>";
                        allHtml += "      <tr>";
                        allHtml += "        <td  class='lokasi_laporan'><div align='center'>Laporan Buku Besar</div></td>";
                        allHtml += "      </tr>";
                        allHtml += "      <tr>";
                        allHtml += "        <td class='lokasi_laporan'><div align='center'>"+this.showFilter+"</div></td>";
                        allHtml += "      </tr>";
                        allHtml += "      <tr>";
                        allHtml += "        <td class='tanggal_laporan'><div align='center'>Dicetak : "+tanggal+"</div></td>";
                        allHtml += "      </tr>";
                        allHtml += "    </table>";
                        allHtml += this.previewReport(result);
                        allHtml +="</div>";                
						this.pageHtml.set(this.page, allHtml);
    				    this.viewer.preview(allHtml);
    					break;
    				
    			}  
   			}catch(e){
   			  alert(e);
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
		if (this.pageHtml.get(page) === undefined){
			this.dbLib.getDataProviderPageA(this.sql,page,this.pager);
		}else{
			this.viewer.preview(this.pageHtml.get(page));
		}
		this.page = page;
		this.allBtn = false;
		
	},
	doCloseReportClick: function(sender){		
	  switch(sender.getName())
	  {
	    case "allBtn" :
			this.page = 1;
			this.allBtn = true;
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page, this.viewer.getTotalPage() * this.pager, this.showFilter, this.lokasi,this.filter2));
			break;
	    case "pdfBtn" :
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, this.page,this.allBtn ? this.viewer.getTotalPage() * this.pager:this.pager, this.showFilter, this.lokasi,this.filter2));
	      break;
	    case "xlsBtn" :
	      this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter, this.page,this.allBtn ? this.viewer.getTotalPage() * this.pager :this.pager, this.showFilter, this.lokasi,this.filter2));       
	      break; 		
		case "MailBtn" :
			sender.owner = new portalui_ConfirmMail(this);
			sender.owner.setBound((this.width/2)-125,this.height/2-100,250,100);
			sender.owner.setCaption(sender.owner.title);
			sender.owner.setBorder(3);
		break;
	    default :
	        this.viewer.setVisible(false);
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
					var subject = "Laporan Buku Besar "+d.toLocaleString();
					var pesan = this.allHtml;
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
		this.viewer.setTotalPage(this.dbLib.getRowCount(this.sqlTotal,this.pager));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	},	
	previewReport: function(result){
	    try{
    	    var line, html = "", kd_akun = "", diff,retHtml = "",htmlHeader = "",first = true, saldo=0,debet=0,kredit=0, data,sawal=0,sawalTmp,saldoTmp,saldoSblm,mtsKredit,mtsDebet;    	
    	    var beda = false;
            for (var i in result.rs.rows){
                line = result.rs.rows[i];
                beda = this.kd_akun != line.kode_akun;				
                if (this.kd_akun != line.kode_akun){                                        
					if(this.kd_akun != "" && !first){
						retHtml +="<tr>"+
							"<td height='20' colspan='6' valign='top' class='sum_laporan'><div align='right'>Mutasi</div></td>"+
							"<td valign='top' class='sum_laporan'><div align='right'>"+floatToNilai(Math.round(parseFloat(debet)))+"</div></td>"+
							"<td valign='top' class='sum_laporan'><div align='right'>"+floatToNilai(Math.round(parseFloat(kredit)))+"</div></td>"+
							"<td valign='top' class='sum_laporan'></td>"+
						  "</tr>"+
						  "<tr>"+
							"<td height='20' colspan='8' valign='top' class='sum_laporan'><div align='right'>Saldo Akhir </div></td>"+
							"<td valign='top' class='sum_laporan'><div align='right'>"+floatToNilai(Math.round(parseFloat(saldo)))+"</span></div></td>"+
						  "</tr>";		
						retHtml += "</table></br></br>";
					}
					saldo = parseFloat(line.saldo) - parseFloat(line.debet) + parseFloat(line.kredit);
                    sawal = saldo;                    
                    this.kd_akun = line.kode_akun;  
					htmlHeader = "<table width='622' border='0' cellspacing='2' cellpadding='1'>"+
							"  <tr>"+
							"    <td width='100' class='header_laporan'>Periode </td>"+
							"    <td width='496' class='header_laporan'>:&nbsp;"+line.periode+"</td>"+
							"  </tr>"+
							"  <tr>"+
							"    <td class='header_laporan'>Kode Akun  </td>"+
							"    <td class='header_laporan'>:&nbsp;"+line.kode_akun+"</td>"+
							"  </tr>"+
							"  <tr>"+
							"    <td class='header_laporan'>Nama Akun </td>"+
							"    <td class='header_laporan'>:&nbsp;"+line.nama+"</td>"+
							"  </tr>"+
							"  <tr>"+
							"    <td class='header_laporan'>Kode Lokasi </td>"+
							"    <td class='header_laporan'>:&nbsp;"+line.kode_lokasi+"</td>"+
							"  </tr>"+
							"</table>";										
					retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>";																		
					retHtml += "<tr><td height='23' colspan='9' class='header_laporan'>"+htmlHeader+"</td></tr>"+
							"<tr>"+
							"    <td height='23' colspan='8' class='header_laporan'><div align='right'>Saldo Awal </div></td> "+
							"   <td class='header_laporan'><div align='right'>"+floatToNilai(Math.round(parseFloat(sawal)))+"</div></td>"+
							"</tr>";												
					retHtml += "<tr bgcolor='#CCCCCC'>"+
						"    <td width='74' height='23' class='header_laporan'><div align='center'>No Bukti</div></td>"+
						"	 <td width='74' height='23' class='header_laporan'><div align='center'>No Dokumen</div></td>"+
						"    <td width='69' class='header_laporan'><div align='center'>Tanggal</div></td>"+
						"    <td width='233' class='header_laporan'><div align='center'>Keterangan</div></td>"+
						"    <td width='50' class='header_laporan'><div align='center'>Kode PP</div></td>"+
						"    <td width='50' class='header_laporan'><div align='center'>Kode RKM</div></td>"+
						"    <td width='90' class='header_laporan'><div align='center'>Debet</div></td>"+
						"    <td width='90' class='header_laporan'><div align='center'>Kredit</div></td>"+
						"    <td width='90' class='header_laporan'><div align='center'>Balance</div></td>"+
						"  </tr>";
					 html= "";    				
    			}else if (first && this.kd_akun == line.kode_akun){
					retHtml += "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>";																		
					retHtml += "<tr bgcolor='#CCCCCC'>"+
						"    <td width='74' height='23' class='header_laporan'><div align='center'>No Bukti</div></td>"+
						"	 <td width='74' height='23' class='header_laporan'><div align='center'>No Dokumen</div></td>"+
						"    <td width='69' class='header_laporan'><div align='center'>Tanggal</div></td>"+
						"    <td width='233' class='header_laporan'><div align='center'>Keterangan</div></td>"+
						"    <td width='50' class='header_laporan'><div align='center'>Kode PP</div></td>"+
						"    <td width='50' class='header_laporan'><div align='center'>Kode RKM</div></td>"+
						"    <td width='90' class='header_laporan'><div align='center'>Debet</div></td>"+
						"    <td width='90' class='header_laporan'><div align='center'>Kredit</div></td>"+
						"    <td width='90' class='header_laporan'><div align='center'>Balance</div></td>"+
						"  </tr>";
				}
                saldo = Math.round(parseFloat(line.saldo));
    			debet = parseFloat(line.totdebet),kredit = parseFloat(line.totkredit);    				
                retHtml += "<tr>"+
                      "  <td valign='top' class='isi_laporan'>"+line.no_bukti+"</td>"+
                      "	 <td valign='top' class='isi_laporan'>"+line.no_dokumen+"</td>"+
                      "  <td height='20' valign='top' class='isi_laporan'>"+line.tanggal+"</td>"+
                      "  <td valign='top' class='isi_laporan'>"+line.keterangan+"</td>"+
                      "  <td valign='top' class='isi_laporan'>"+line.kode_pp+"</td>"+
                      "  <td valign='top' class='isi_laporan'>"+line.kode_drk+"</td>"+
                      "  <td valign='top' class='isi_laporan'><div align='right' >"+floatToNilai(Math.round(parseFloat(line.debet)))+"</div></td>"+
                      "  <td valign='top' class='isi_laporan'><div align='right'>"+floatToNilai(Math.round(parseFloat(line.kredit)))+"</div></td>"+
                      "  <td valign='top' class='isi_laporan'><div align='right'>"+floatToNilai(Math.round(parseFloat(saldo)))+"</div></td>"+
                      "</tr>";    
				first = false;
            }			            
			if (beda || (result.rs.rows.length < this.pager && !beda)){
				retHtml +="<tr>"+
						"<td height='20' colspan='6' valign='top' class='sum_laporan'><div align='right'>Mutasi</div></td>"+
						"<td valign='top' class='sum_laporan'><div align='right'>"+floatToNilai(Math.round(parseFloat(debet)))+"</div></td>"+
						"<td valign='top' class='sum_laporan'><div align='right'>"+floatToNilai(Math.round(parseFloat(kredit)))+"</div></td>"+
						"<td valign='top' class='sum_laporan'></td>"+
					  "</tr>"+
					  "<tr>"+
						"<td height='20' colspan='8' valign='top' class='sum_laporan'><div align='right'>Saldo Akhir </div></td>"+
						"<td valign='top' class='sum_laporan'><div align='right'>"+floatToNilai(Math.round(parseFloat(saldo)))+"</span></div></td>"+
					  "</tr>";							
			}
			retHtml += "</table></br></br>";
    		return retHtml;
   		}catch(e){
   		   alert(e);
        }
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
