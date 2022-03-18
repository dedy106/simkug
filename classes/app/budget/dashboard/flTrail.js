window.app_budget_dashboard_flTrail = function(owner)
{
	if (owner)
	{
		window.app_budget_dashboard_flTrail.prototype.parent.constructor.call(this,owner);
		this.className = "app_budget_dashboard_flTrail";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Audit Trail Rekapitulasi RKAP", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_standar;util_gridLib;util_filterRep");		
		this.p1 = new portalui_panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:5});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		this.p2 = new panel(this, {bound:[0,0,this.width-5, this.height - 10], caption:"Laporan Rekapitulasi RKAP", visible:false});
		this.bClose1 = new imageButton(this.p2,{bound:[this.p2.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});		
		this.sg2 = new saiGrid(this.p2,{bound:[1,20,this.p2.width - 2, this.p2.height - 50],colCount:10,
			colTitle:"Kode, Deskripsi, ANGG-2010, REAL S/D AGT 2010, EST. REAL 2010,SELISIH ANGG VS EST. REAL 2010,% PENYERAPAN,USULAN RKA 2011,GROWTH RKA 11 vs RKA 10,GROWTH RKA'11 vs EST.10 ",
			colFormat:[[9,8,7,6,5,4,3,2],[cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
			colWidth:[[9,8,7,6,5,4,3,2,1,0],[150,150,150,150,150,150,150,100,200,100]], dblClick:[this,"doSgClick"],readOnly: true
		 });
		this.sgn2 = new sgNavigator(this.p2, {bound:[1,this.sg2.height+23,this.p2.width - 2, 25], buttonStyle:bsViewExt, grid:this.sg2, xlsClick:[this,"doXlsClick"], pager:[this,"doPager"]});
		this.p3 = new panel(this, {bound:[0,0,this.width-5, this.height - 10], caption:"Laporan Detail Rekapitulasi RKAP", visible:false});
		
		this.bClose2 = new imageButton(this.p3,{bound:[this.p3.width - 60,1,45,16],image:"icon/dynpro/pnlclose.png",click:[this,"doClick"]});		
		this.sg3 = new saiGrid(this.p3,{bound:[1,20,this.p3.width - 2, this.p2.height - 50],colCount:10,
			colTitle:"Kode, Deskripsi, ANGG-2010, REAL S/D AGT 2010, EST. REAL 2009,SELISIH ANGG VS EST. REAL 2010,% PENYERAPAN,USULAN RKA 2011,GROWTH RKA 11 vs RKA 10,GROWTH RKA'11 vs EST.10 ",
			colFormat:[[9,8,7,6,5,4,3,2],[cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
			colWidth:[[9,8,7,6,5,4,3,2,1,0],[150,150,150,150,150,150,150,100,200,100]], 
			readOnly:true,
		 });
		 this.sgn3 = new sgNavigator(this.p3, {bound:[1,this.sg3.height+23,this.p3.width - 2, 25], buttonStyle:bsViewExt, grid:this.sg3, xlsClick:[this,"doXlsClick"], pager:[this,"doPager"]});
	}	
	this.filterRep = new util_filterRep();
		
	this.standar = new util_standar();	
	this.gridLib = new util_gridLib();
	
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	if (this.app._lokKonsol!="")
	{
		this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_d ");
	}
	else
	{
		this.tahun=this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_d where kode_lokasi='"+this.app._lokasi+"'");
	}
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun Anggaran","=",this.tahun));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Versi ","=","FS1"));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jenis ","=","Summary"));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Versi Anggaran ","=","Original"));
	this.sg1.onCellExit.set(this, "doCellExit");
	this.sg1.onSelectCell.set(this, "doSelectCell");
	this.sg1.onEllipsClick.set(this, "doEllipseClick");
	this.sg1.onChange.set(this, "sg1onChange");
	this.doSelectCell(this.sg1,2,4);
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	
	/*kirim mail*/
	/*uses("server_util_mail;portalui_ConfirmMail");
	this.mail = new server_util_mail(undefined,this.app._lokasi);
	this.mail.addListener(this);
	this.mail.setUser("admin@roojax.com","saisai","tls");
	this.mail.configSmtp("smtp.gmail.com",465);
	* */
};
window.app_budget_dashboard_flTrail.extend(window.portalui_childForm);
window.app_budget_dashboard_flTrail.implement({
	doClick: function(sender){
		if (sender == this.bClose1) {
			this.p1.show();
			this.p2.hide();
		}
		if (sender == this.bClose2) {
			this.p2.show();
			this.p3.hide();
		}
	},
	doEllipseClick: function(sender, col, row){	
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_lokasi, nama from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
													  "select count(kode_lokasi) from lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
													  ["kode_lokasi","nama"],"and",["Kode","Nama"]);
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data FS",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_fs,nama from agg_fs "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where ")+" order by kode_fs",
													  "select count(kode_fs) from agg_fs "+
													  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
													  new Array("kode_fs","nama"),"where");
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.app._userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["123","3","13","3","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[2,0,2,0,0]);
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4],["3","3","13","3","3"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4],[3,0,2,0,0]);
		}
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct tahun from agg_d where kode_lokasi='"+this.app._lokasi+"' order by tahun",[this.sg1.columns.get(2).pickList]);
		}
		if (row == 3)
			{
				this.sg1.columns.get(2).pickList.clear();
				this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Summary","Detail"));
			}
		if (row == 4)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Original","Evaluasi"));
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Tahun Anggaran","=",this.tahun));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Versi ","=","FS1"));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Jenis ","=","Summary"));
				this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Versi Anggaran ","=","Original"));
				
			}else if (sender == this.app._mainForm.bBack){
				if (this.dataReq == 1){
					
					this.p1.show();
					this.app._mainForm.pButton.show();				
					this.p2.hide();
				}else {
					
					this.p3.hide();
					this.p2.show();
					this.dataReq = 1;
				}
			}else
			{
				this.p2.show();
				this.p1.setVisible(false);				
				//this.app._mainForm.pButton.setVisible(false);								
				this.lokasi=this.app._namalokasi;
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
				  this.filterRep.filterStr("a.tahun",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
				  this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
				if (this.sg1.getCell(2,4)=='Original')
				{
					this.ver ="0";
				}
				else
				{
					this.ver = "1";
				}
					
				this.filter2 = this.app._nikUser+"/"+this.sg1.getCell(2,1)+"/"+this.sg1.getCell(2,3)+"/"+this.sg1.getCell(2,4)+"/"+this.ver;
				this.showFilter = this.filterRep.showFilter(this.sg1);
				if (this.sg1.getCell(2,0) == this.app._kodeLokasiKonsol)
				{
					this.kode_lokasi=this.app._kodeLokasiKonsol;
					this.kode_lokasi1=this.app._kodeLokasi1;
					this.kode_lokasi2=this.app._kodeLokasi2;
				}
				else
				{
					this.kode_lokasi=this.sg1.getCell(2,0);
					this.kode_lokasi1=this.sg1.getCell(2,0);
					this.kode_lokasi2=this.sg1.getCell(2,0);
				}	
				sql="call sp_agg_rkap ('"+this.sg1.getCell(2,2)+"','"+this.ver+"','"+this.sg1.getCell(2,1)+"','"+this.kode_lokasi+"','"+this.kode_lokasi1+"','"+this.kode_lokasi2+"','"+this.app._nikUser+"')";
				
				//this.dbLib.execQuerySync(sql);				
				var ret = this.dbLib.execQuerySync(sql);					
				if (ret.search("error") == -1){
					this.dataReq = 1;		
					this.sql = "select nik_user,kode_neraca,kode_lokasi,tipe,nama,level_spasi,round(n0,0) as n0,round(n1,0) as n1,"+
								"round(n2,0) as n2,round(n3,0) as n3,round(n4,0) as n4,round(n5,0) as n5,round(n6,0) as n6,round(n7,0) as n7, "+
							   "convert(decimal(5,2),case when n0<>0 then (n2/n0)*100 else 0 end,0) as g03,	"+
								"convert(decimal(5,2),case when n0<>0 then ((n5-n0)/n0)*100 else 0 end,0)  as g01, "+ 
								"convert(decimal(5,2),case when n2<>0 then ((n5-n2)/n2)*100 else 0 end,0)  as g02 "+
								" from agg_neraca_tmp where modul='B' and nik_user='"+this.app._nikUser+"' order by rowindex";		
					
					this.dbLib.getDataProviderA(this.sql);
					this.page = 1;
					this.allBtn = false;				
				}else {
					this.p1.show();
					this.app._mainForm.pButton.show();				
					this.p2.hide();
					system.alert(this, "Error Request",ret);
				}
			}
		}catch(e)
		{
			alert("[app_budget_dashboard_flTrail]::mainButtonClick:"+e);
		}
	},
	doPager: function(sender,page){
		if (this.dataReq == 1){
			var start = (page - 1) * 30;
			var finish = (start + 30 > this.dataRKAP.rs.rows.length ? this.dataRKAP.rs.rows.length:start+30);
			var line;
			this.sg2.clear();
			for (var  i=start; i < finish;i++){
				line = this.dataRKAP.rs.rows[i];
				this.sg2.appendData([line.kode_neraca, line.nama, floatToNilai(line.n0), floatToNilai(line.n1), floatToNilai(line.n2), floatToNilai(line.n3), floatToNilai(line.g03),floatToNilai(line.n5), floatToNilai(line.g01), floatToNilai(line.g02) ]);
			}			
			this.sg2.setNoUrut(start);
		}else {
			var start = (page - 1) * 30;
			var finish = (start + 30 > this.dataDetail.rs.rows.length ? this.dataDetail.rs.rows.length:start+30);
			var line, data;
			this.sg3.clear();
			for (var  i=start; i < finish;i++){
				line = this.dataDetail.rs.rows[i];
				/*data = [line.kode_akun, line.nama];
				//for (var c in line){
					if (c != "kode_akun" && c != "nama") data[data.length] = floatToNilai(line[c]);
				}
				this.sg3.appendData(data);
				*/
				this.sg3.appendData([line.kode_akun, line.nama, floatToNilai(line.rka), floatToNilai(line.realisasi), floatToNilai(line.outlook), floatToNilai(line.selisih), floatToNilai(line.penyerapan),floatToNilai(line.usulan), floatToNilai(line.growth1), floatToNilai(line.growth2) ]);

			}			
			this.sg3.setNoUrut(start);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{
			if (sender == this.dbLib){
				result = JSON.parse(result);
				if (result){
					if (this.dataReq == 1){
						this.dataRKAP = result;
						this.sgn2.setTotalPage(Math.ceil(result.rs.rows.length/ 30));
						this.sgn2.rearrange();
						this.sgn2.activePage = 0;
						this.doPager(this.sgn2,1);
					}else {
						this.dataDetail = result;
						this.sgn3.setTotalPage(Math.ceil(result.rs.rows.length/ 30));
						this.sgn3.rearrange();
						this.sgn3.activePage = 0;
						this.doPager(this.sgn3,1);
					}
				}
			}
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
		}catch(e){
			alert(e);
		}
	},
	getStringHeader: function(){	
	},
	doConfirmClick: function(sender){		
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
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add("PosisiSpp");				
		  this.viewer.useIframe(upDownHtml(html));
		  break;/*kirim mail*/
		case "MailBtn" :
			sender.owner = new portalui_ConfirmMail(this);
			sender.owner.setBound((this.width/2)-125,this.height/2-100,250,100);
			sender.owner.setCaption(sender.owner.title);
			sender.owner.setBorder(3);
		break;
		case "xlsBtn" :	
			var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add("PosisiSpp");				
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
	doXlsClick: function(sender){
		var title = new server_util_arrayList({items:["Kode","Deskripsi","ANGG-2009","REAL S/D AGT 2009", "EST. REAL 2009","SELISIH ANGG VS EST. REAL 2009",
			"% PENYERAPAN","USULAN RKA 2010","GROWTH RKA 10 vs RKA 09","GROWTH RKA'10 vs EST.09"]
			});
		if (this.dataReq == 1)
			window.location = this.dbLib.sqlToXls2(this.sql, title, "rkap.xls");
		else window.location = this.dbLib.sqlToXls2(this.sql2, title, "detailrkap.xls");
	},
	doSgClick: function(sender, col, row){
		this.dataReq = 2;
		this.p3.show();
		this.lokasi=this.sg1.getCell(2,0);
		this.tahun=this.sg1.getCell(2,1);
		this.tahun2=this.sg1.getCell(2,1)-1;
		this.kode=this.sg2.cells(0,row);
		this.p3.setCaption("Detail Rekapitulasi "+this.kode);
		this.sql2 = "select a.kode_akun,a.nama,round(isnull(d.rka,0),0) as rka,round(isnull(d.realisasi,0),0) as realisasi,round(isnull(d.outlook,0),0) as outlook, "+
					"			round(isnull(d.rka,0)-isnull(d.outlook,0),0) as selisih, "+
					"			convert(decimal(5,2),case when isnull(d.rka,0)<>0 then (isnull(d.outlook,0)/isnull(d.rka,0))*100 else 0 end,0) as penyerapan, "+
					"			round(isnull(f.usulan,0),0) as usulan, "+
					"			convert(decimal(5,2),case when isnull(d.rka,0)<>0 then ((isnull(f.usulan,0)-isnull(d.rka,0))/isnull(d.rka,0))*100 else 0 end,0) as growth1, "+
					"			convert(decimal(5,2),case when isnull(d.outlook,0)<>0 then ((isnull(f.usulan,0)-isnull(d.outlook,0))/isnull(d.outlook,0))*100 else 0 end,0) as growth2 "+
					"from agg_masakun a "+
					"inner join agg_relakungar e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
					"left join (select a.kode_akun,sum(a.rka) as rka,sum(a.realisasi) as realisasi,sum(a.outlook) as outlook "+
					"			from agg_outlook a "+
					"			inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"			where a.kode_lokasi='"+this.lokasi+"' and a.tahun='"+this.tahun2+"' and b.kode_neraca='"+this.kode+"' "+ 
					"			group by a.kode_akun "+
					"			)d on a.kode_akun=d.kode_akun "+
					"left join (select a.kode_akun,sum(a.nilai) as usulan "+
					"			from agg_d a "+
					"			inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"			where a.kode_lokasi='"+this.lokasi+"' and a.tahun='"+this.tahun+"' and b.kode_neraca='"+this.kode+"'  "+
					"			group by a.kode_akun "+
					"			)f on a.kode_akun=f.kode_akun "+			
					"where a.kode_lokasi='"+this.lokasi+"' and e.kode_neraca='"+this.kode+"'  and (isnull(d.rka,0)<>0 or isnull(d.realisasi,0)<>0 or isnull(d.outlook,0)<>0 or isnull(f.usulan,0)<>0) order by a.kode_akun";
		
		this.dbLib.getDataProviderA(this.sql2);
	}
});
