// JavaScript Document
window.app_saku_fa_trail_fTrailFaSaldo = function(owner)
{
	if (owner)
	{
		window.app_saku_fa_trail_fTrailFaSaldo.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_fa_trail_fTrailFaSaldo";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Audit Trail Saldo Asset", 2);
		
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
		this.sg1.onCellExit.set(this, "doCellExit");
		
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
			
		uses("portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this);
		this.viewer.setWidth(this.getWidth());
		this.viewer.setHeight(this.getHeight());
		this.viewer.setTop(0);
		this.viewer.setVisible(false);
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doAllPageClick", "doPdfClick","doXlsClick",true);		


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
	
	var tanda="=";
	var lokasi=this.app._lokasi;
	if (this.userStatus=="A")
	{
		tanda="All";
		lokasi="";
	}
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Periode","=",this.app._mainForm._periode));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Lokasi/Cabang",tanda,lokasi));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("Kelompok Asset","All"));
	
	this.sg1.onSelectCell.set(this, "doSelectCell");
	//this.doSelectCell(this.sg1,2,4);
	this.compArray = new Array("this.p1","this.p2","this.p4","this.p5");
	this.gridArray = new Array("this.sg1","this.sg2","this.sg4","this.sg5");
	this.actComp = 1;
};
window.app_saku_fa_trail_fTrailFaSaldo.extend(window.portalui_childForm);
window.app_saku_fa_trail_fTrailFaSaldo.prototype.doSg3DblClick = function(sender, colIdx, rowIdx)
{  
	try
	{
	
	if (this.p4 != undefined) this.p4.free();
	this.actComp = 3;
	this.p2.setVisible(false);
	
	this.p4 = new portalui_panel(this);
	this.p4.setWidth(900);
	this.p4.setLeft(10);
	this.p4.setTop(5);
	this.p4.setHeight(480);
	this.p4.setBorder(3);
	this.p4.setCaption("Audit Trail Buku Besar");
	
	this.e3 = new portalui_saiLabelEdit(this.p4);
	this.e3.setTop(25);
	this.e3.setLeft(10);
	this.e3.setWidth(500);
	this.e3.setCaption("Kode Akun");
	this.e3.setText(this.sg2.getCell(1,rowIdx)+" - "+this.sg2.getCell(2,rowIdx));
		
	this.e4 = new portalui_saiLabelEdit(this.p4);
	this.e4.setTop(50);
	this.e4.setLeft(10);
	this.e4.setWidth(400);
	this.e4.setCaption("Kode Lokasi");
	this.e4.setText(this.sg1.getCell(2,1));
	
	this.e5 = new portalui_saiLabelEdit(this.p4);
	this.e5.setTop(75);
	this.e5.setLeft(10);
	this.e5.setWidth(150);
	this.e5.setCaption("Periode");
	this.e5.setText(this.sg1.getCell(2,0));
	
	this.e6 = new portalui_saiLabelEdit(this.p4);
	this.e6.setTop(75);
	this.e6.setLeft(675);
	this.e6.setWidth(200);
	this.e6.setCaption("Saldo Awal");
	this.e6.setText(this.sg2.getCell(3,rowIdx));
	this.e6.setTipeText(ttNilai);
	this.e6.setAlignment(alRight);
	this.e6.setReadOnly(true);
	
	
	uses("portalui_saiTable");
	this.sg4 = new portalui_saiTable(this.p4);
	this.sg4.setTop(100);
	this.sg4.setLeft(10);
	this.sg4.setWidth(880);
	this.sg4.setHeight(340);	
	this.sg4.setColTitle(new Array("No","No Bukti","Tanggal","Keterangan","Kode PP","Kode DRK","Debet","Kredit","Balance"));
	
	this.e7 = new portalui_saiLabelEdit(this.p4);
	this.e7.setTop(450);
	this.e7.setLeft(30);
	this.e7.setWidth(200);
	this.e7.setCaption("Total Debet");
    this.e7.setText(this.sg2.getCell(4,rowIdx));
	this.e7.setTipeText(ttNilai);
	this.e7.setAlignment(alRight);
	this.e7.setReadOnly(true);
	
	this.e8 = new portalui_saiLabelEdit(this.p4);
	this.e8.setTop(450);
	this.e8.setLeft(250);
	this.e8.setWidth(200);
	this.e8.setCaption("Total Kredit");
	this.e8.setText(this.sg2.getCell(5,rowIdx));
	this.e8.setTipeText(ttNilai);
	this.e8.setAlignment(alRight);
	this.e8.setReadOnly(true);
	
	var mutasi=nilaiToFloat(this.sg2.getCell(4,rowIdx))-nilaiToFloat(this.sg2.getCell(5,rowIdx));
	this.e9 = new portalui_saiLabelEdit(this.p4);
	this.e9.setTop(450);
	this.e9.setLeft(470);
	this.e9.setWidth(200);
	this.e9.setCaption("Total Mutasi");
	this.e9.setText(floatToNilai(mutasi));
	this.e9.setTipeText(ttNilai);
	this.e9.setAlignment(alRight);
	this.e9.setReadOnly(true);
	
	this.e10 = new portalui_saiLabelEdit(this.p4);
	this.e10.setTop(450);
	this.e10.setLeft(690);
	this.e10.setWidth(200);
	this.e10.setCaption("Saldo Akhir");
	this.e10.setText(this.sg2.getCell(5,rowIdx));
	this.e10.setTipeText(ttNilai);
	this.e10.setAlignment(alRight);
	this.e10.setReadOnly(true);
			
		this.sg4.clearAll();
		var sql="select a.no_kas as no_bukti,a.tanggal,a.keterangan,a.kode_pp,a.kode_drk, "+
				"case when a.dc='D' then nilai else 0 end as debet, "+
				"case when a.dc='C' then nilai else 0 end as kredit,0.0 as balance "+
				"from kas_j a "+
				"where kode_akun='"+this.sg2.getCell(1,rowIdx)+"' and periode='"+this.sg1.getCell(2,0)+"' and kode_lokasi='"+this.sg1.getCell(2,1)+"' "+
				"order by a.tanggal, a.no_kas ";
		var line,data = this.dbLib.runSQL(sql);				
		if (data instanceof portalui_arrayMap)
		{			
			this.sg4.setData(data);
		}
		else throw(data);
		//this.sg4.hideLoading();
		this.SetSg4Mutasi();
		this.sg4.onDblClick.set(this, "doSg4DblClick");
		
	}catch(e){
		system.alert(this,e,"");
	}
	
};
window.app_saku_fa_trail_fTrailFaSaldo.prototype.SetSg4Mutasi = function()
{
	try
	{
		var debet = kredit = mutasi = 0;
		var so_awal=nilaiToFloat(this.e6.getText());		
		for (var i = 1; i <= this.sg4.getRowCount();i++)
		{
			debet = nilaiToFloat(this.sg4.getCell(6,i));			
			kredit = nilaiToFloat(this.sg4.getCell(7,i));
			mutasi = so_awal + debet - kredit; 
			this.sg4.setCell(8,i,floatToNilai(mutasi));	
			so_awal = mutasi;
		}
		this.e10.setText(floatToNilai(so_awal));
	}catch(e)
	{
		alert("[app_saku_fa_trail_fTrailFaSaldo]::SetSg4Mutasi:"+e);
	}
};
window.app_saku_fa_trail_fTrailFaSaldo.prototype.doSg4DblClick = function(sender, colIdx, rowIdx)
{	
	try{
	if (this.p5 != undefined) this.p5.free();
	this.actComp = 4;
	
	this.p4.setVisible(false);
	
	this.p5 = new portalui_panel(this);
	this.p5.setWidth(900);
	this.p5.setLeft(10);
	this.p5.setTop(5);
	this.p5.setHeight(480);
	this.p5.setBorder(3);
	this.p5.setCaption("Audit Trail Transaksi Jurnal");
	
	this.e11 = new portalui_saiLabelEdit(this.p5);
	this.e11.setTop(25);
	this.e11.setLeft(10);
	this.e11.setWidth(200);
	this.e11.setCaption("No Bukti");
	this.e11.setText(this.sg4.getCell(1,rowIdx));
		
	this.e12 = new portalui_saiLabelEdit(this.p5);
	this.e12.setTop(50);
	this.e12.setLeft(10);
	this.e12.setWidth(180);
	this.e12.setCaption("Tanggal");
	this.e12.setText(this.sg4.getCell(2,rowIdx));
	
	this.e13 = new portalui_saiLabelEdit(this.p5);
	this.e13.setTop(75);
	this.e13.setLeft(10);
	this.e13.setWidth(500);
	this.e13.setCaption("Keterangan");
	this.e13.setText(this.sg4.getCell(3,rowIdx));
	
	this.e14 = new portalui_saiLabelEdit(this.p5);
	this.e14.setTop(100);
	this.e14.setLeft(10);
	this.e14.setWidth(400);
	this.e14.setCaption("Lokasi");
	this.e14.setText(this.sg1.getCell(2,1));
	
	this.e15 = new portalui_saiLabelEdit(this.p5);
	this.e15.setTop(125);
	this.e15.setLeft(10);
	this.e15.setWidth(150);
	this.e15.setCaption("Periode");
	this.e15.setText(this.sg1.getCell(2,0));
	
	this.e16 = new portalui_saiLabelEdit(this.p5);
	this.e16.setTop(100);
	this.e16.setLeft(675);
	this.e16.setWidth(200);
	this.e16.setCaption("Total Debet");
	this.e16.setText(this.sg4.getCell(6,rowIdx));
	this.e16.setTipeText(ttNilai);
	this.e16.setAlignment(alRight);
	this.e16.setReadOnly(true);
	
	this.e17 = new portalui_saiLabelEdit(this.p5);
	this.e17.setTop(125);
	this.e17.setLeft(675);
	this.e17.setWidth(200);
	this.e17.setCaption("Total Kredit");
	this.e17.setText(this.sg4.getCell(7,rowIdx));
 	this.e17.setTipeText(ttNilai);
	this.e17.setAlignment(alRight);
	this.e17.setReadOnly(true);
	
	uses("portalui_saiTable");
	this.sg5 = new portalui_saiTable(this.p5);
	this.sg5.setTop(150);
	this.sg5.setLeft(10);
	this.sg5.setWidth(880);
	this.sg5.setHeight(320);	
	this.sg5.setColTitle(new Array("No","Kode Akun","Nama Akun","Keterangan","Kode PP","Kode DRK","Debet","Kredit"));		
	}catch(e){
		alert(e);
	}
	try
	{		
		this.sg5.clearAll();
		var sql="select a.no_kas as no_bukti,a.tanggal,a.keterangan,a.kode_pp,a.kode_drk, "+
				"case when a.dc='D' then nilai else 0 end as debet, "+
				"case when a.dc='C' then nilai else 0 end as kredit,0.0 as balance "+
				"from kas_j a "+
				"where no_kas='"+this.sg4.getCell(1,rowIdx)+"' and periode='"+this.sg1.getCell(2,0)+"' and kode_lokasi='"+this.sg1.getCell(2,1)+"' "+
				"order by a.tanggal, a.no_kas ";
		var line,data = this.dbLib.runSQL(sql);
		if (data instanceof portalui_arrayMap)
		{
			this.sg5.setData(data);
		}
		else throw(data);
		//this.sg5.hideLoading();
		this.SetSg5Mutasi();
	}
	catch(e)
	{
		system.alert(this,e,"");
	}
	
};
window.app_saku_fa_trail_fTrailFaSaldo.prototype.SetSg5Mutasi = function()
{
	try
	{
		var debet = kredit = 0;
		for (var i = 1; i <= this.sg5.getRowCount();i++)
		{
			debet += nilaiToFloat(this.sg5.getCell(6,i));			
			kredit += nilaiToFloat(this.sg5.getCell(7,i));
		}
		this.e16.setText(floatToNilai(debet));
		this.e17.setText(floatToNilai(kredit));
	}catch(e)
	{
		alert("[app_saku_fa_trail_fTrailFaSaldo]::SetSg4Mutasi:"+e);
	}
};
window.app_saku_fa_trail_fTrailFaSaldo.prototype.doEllipseClick= function(sender, col, row)
{

		if (row ==1)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokasi, nama from lokasi "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," where ")+" order by kode_lokasi",
													  "select count(*) from lokasi "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1)," where ")+" order by kode_lokasi",
													  new Array("kode_lokasi","nama"),"where");
		}
		if (row == 2)
		{
			var sql1="select kode_klpakun,nama from fa_klpakun "+
			         this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
					 " order by kode_klpakun ";
			var sql2="select count(kode_klpakun) from fa_klpakun "+
			         this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where");
			
			this.filterRep.ListDataSGFilter(this, "Data Kelompok Asset",this.sg1, this.sg1.row, this.sg1.col,sql1,sql2,new Array("kode_klpakun","Nama"),"and");
		}
		
};
window.app_saku_fa_trail_fTrailFaSaldo.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4),new  Array("1234","123","123","3","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4),new  Array(0,2,2,0,0));
	}
	else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3,4),new  Array("1234","3","123","3","3"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3,4),new  Array(0,2,2,0,0));
	}
	if (row == 0)
	{
		this.standar.isiItemsWithPeriode(this.sg1.columns.get(2).pickList);
	}
	if (row == 3)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Neraca Percobaan","Neraca Lajur","12 Periode"));
	}
	if (row == 4)
	{
		this.sg1.columns.get(2).pickList.clear();
		this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Tidak","Ya"));
	}
	
};
window.app_saku_fa_trail_fTrailFaSaldo.prototype.mainButtonClick = function(sender)
{	
	if (sender == this.app._mainForm.bPreview){
		try
		{
			
			this.nik_user=this.app._nikUser;
			this.dbname = this.app._dbEng;
			this.nik_user=this.app._nikUser;
			sql="call sp_fa_saldo ('"+this.sg1.getCell(2,1)+"','"+this.sg1.getCell(2,0)+"','"+this.nik_user+"')";

			this.dbLib.execQuerySync(sql);
			
			
				this.isReport = false;
				if (this.p1.visible){ 
					if (this.p2 != undefined) this.p2.free();
					this.actComp = 2;
					this.p1.setVisible(false);
					
					this.p2 = new portalui_panel(this);
					this.p2.setWidth(900);
					this.p2.setLeft(10);
					this.p2.setTop(5);
					this.p2.setHeight(480);
					this.p2.setBorder(3);
					this.p2.setCaption("Audit Trail Saldo Asset");
					
					uses("portalui_saiTable");	
					this.sg2 = new portalui_saiTable(this.p2);
			    	this.sg2.setLeft(10);
					this.sg2.setTop(25);
			    	this.sg2.setWidth(880);
			    	this.sg2.setHeight(440);
					this.sg2.setColTitle(new Array("No","Kode","Nama","Saldo Awal","Debet","Kredit","Saldo Akhir"));
					this.sg2.setTag("2");
					this.sg2.onDblClick.set(this, "doSg3DblClick");
					
					try
					{		
						this.sg2.clearAll();
						var line,data = this.dbLib.runSQL("select kode_fa,nama,n1,n2,n3,n4 from fa_tmp where nik_user='"+this.nik_user+"' order by kode_fa ");
						if (data instanceof portalui_arrayMap)
						{						
							this.sg2.setData(data);
						}
						else throw(data);					
					}
					catch(e)
					{
						system.alert(this,e,"");
					}
				}else {
					if (this.actComp > 1){
						var html,script = this.gridArray[this.actComp-1];	
						html = loadCSS("server_util_laporan");
						eval("html += "+script+".gridToHTML()");												
						script = this.compArray[this.actComp-1];	
						eval(script+".hide()");						
						this.viewer.prepare();
						this.viewer.setVisible(true);						
						this.app._mainForm.pButton.setVisible(false);
						this.app._mainForm.reportNavigator.setVisible(true);						
						this.showFilter = this.filterRep.showFilter(this.sg1);
						//this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,30));						
						var header = "";
						switch(this.actComp){
						
						case	3 : header = "<table>"+
											"<tr><td>Kode Akun</td>"+
											"<td>:</td>"+
											"<td>"+this.e3.getText()+"</td>"+
											"</tr>"+
											"<tr><td>Kode Lokasi</td>"+
											"<td>:</td>"+
											"<td>"+this.e4.getText()+"</td>"+
											"</tr>"+
											"<tr><td>Periode</td>"+
											"<td>:</td>"+
											"<td>"+this.e5.getText()+"</td>"+
											"</tr>"+
											"<tr><td>Saldo Awal</td>"+
											"<td>:</td>"+
											"<td>"+this.e6.getText()+"</td>"+
											"</tr>"+
										 "</table>";
								break;
						case	4 : header = "<table>"+
											"<tr><td>No Bukti</td>"+
											"<td>:</td>"+
											"<td>"+this.e11.getText()+"</td>"+
											"</tr>"+
											"<tr><td>Tanggal</td>"+
											"<td>:</td>"+
											"<td>"+this.e12.getText()+"</td>"+
											"</tr>"+
											"<tr><td>Keterangan</td>"+
											"<td>:</td>"+
											"<td>"+this.e13.getText()+"</td>"+
											"</tr>"+
											"<tr><td>Lokasi</td>"+
											"<td>:</td>"+
											"<td>"+this.e14.getText()+"</td>"+
											"</tr>"+
											"<tr><td>Periode</td>"+
											"<td>:</td>"+
											"<td>"+this.e15.getText()+"</td>"+
											"</tr>"+
											"<tr><td>Total Debet</td>"+
											"<td>:</td>"+
											"<td>"+this.e16.getText()+"</td>"+
											"</tr>"+
											"<tr><td>Total Kredit</td>"+
											"<td>:</td>"+
											"<td>"+this.e17.getText()+"</td>"+
											"</tr>"+
										 "</table>";
								break;
						}
						this.gridHTML = "<br><br>"+header+html;
						this.viewer.preview(header+html);
					}
				}
			
		}catch(e)
		{
			alert("[flNeraca]::mainButtonClick:"+e);
		}
	}
	if (sender == this.app._mainForm.bBack){		
		if (this.viewer.visible){
			this.viewer.setVisible(false);
	      	//this.p1.setVisible(true);
			script = this.compArray[this.actComp-1];	
			eval(script+".show()");						
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
		}else if (this.actComp > 1){
			var script = this.compArray[this.actComp-1];	
			//alert(script+".hide()");
			eval(script+".hide()");			
			this.actComp--;
			script = this.compArray[this.actComp-1];	
			//alert(script+".show()");
			eval(script+".show()");			
			
		}
	}
};
window.app_saku_fa_trail_fTrailFaSaldo.prototype.doRequestReady = function(sender, methodName, result)
{
		switch (methodName)
		{
			case "preview" : 
				this.viewer.preview(result);			
				break;
			
		}
};
window.app_saku_fa_trail_fTrailFaSaldo.prototype.doSelectedPage = function(sender, page)
{
	this.report.preview(this.nama_report,this.filter, page, 30, "YAKES", this.showFilter,this.filter2);	
};
window.app_saku_fa_trail_fTrailFaSaldo.prototype.doCloseReportClick = function(sender)
{
	//alert(sender.getName());
  switch(sender.getName())
  {
    case "allBtn" :
		this.report.preview(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * 30, this.showFilter, "YAKES TELKOM",this.filter2);       
		break;
    case "pdfBtn" :      
		var cnv  = $(this.viewer.getFullId()+"_preview");
		if (cnv != undefined)
			cnv.style.display = "none";
		if (this.isReport)
			this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * 30, "Y A K E S",this.showFilter));
		else{ 					
			uses("server_util_arrayList");
			var html = new server_util_arrayList();
			html.add(this.gridHTML);			
			html.add("pdf");			
			html.add("neraca");		
			this.viewer.useIframe(upDownHtml(html));
		}   
      break;
    case "xlsBtn" :		
		if (this.isReport)
			this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * 30, "Y A K E S",this.showFilter));       
		else{ 				
			uses("server_util_arrayList");
			var html = new server_util_arrayList();
			html.add(this.gridHTML);			
			html.add("xls");			
			html.add("neraca");
			this.viewer.useIframe(upDownHtml(html));
		}      
      break; 
	case "PrintBtn" :
      try
      {
		var winfram= window.frames[this.viewer.getFullId() +"_iframe"];
		if (this.isReport)
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1, 30, this.showFilter, "YAKES TELKOM",this.filter2));
		else{ 					
			var cnv  = $(this.viewer.getFullId()+"_preview");
			if (cnv != undefined)
				cnv.style.display = "none";
			cnv  = $(this.viewer.getFullId()+"_iframe");
			if (cnv != undefined)
				cnv.style.display = "";
			winfram.document.open();
			winfram.document.write(loadCSS("server_util_laporan"));
			winfram.document.write(this.gridHTML);
			winfram.document.close();
		}
		winfram.focus();
        winfram.print();
        
        var cnv = undefined;
        if (cnv != undefined)
        {
          cnv.focus();
          cnv.print();
        }
      }catch(e)
      {alert(e);}
      
      break; 
    default :
        this.viewer.setVisible(false);
      	//this.p1.setVisible(true);
		script = this.compArray[this.actComp-1];	
		eval(script+".show()");						
      	this.app._mainForm.pButton.setVisible(true);
      	this.app._mainForm.reportNavigator.setVisible(false);  
      break;
  
  }
};
window.app_saku_fa_trail_fTrailFaSaldo.prototype.doAllPageClick = function(sender)
{
	this.report.preview(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * 30, this.app._namaLokasi,this.showFilter);	
};
window.app_saku_fa_trail_fTrailFaSaldo.prototype.doPdfClick = function(sender)
{
	this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * 30, this.app._namaLokasi,this.showFilter));
};
window.app_saku_fa_trail_fTrailFaSaldo.prototype.doXlsClick = function()
{
	this.viewer.useIframe(this.report.createXls(this.nama_report,this.filter, 1, this.viewer.getTotalPage() * 30, this.app._namaLokasi,this.showFilter));
};