window.app_saku3_report_siaga_aset_flAset = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_siaga_aset_flAset.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku3_report_siaga_aset_flAset";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge;util_filterRep;util_gridLib;saiCBBL");	
		this.p1 = new panel(this,{bound:[10,10,702,200],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,177],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:11});
		 this.p2 = new panel(this,{bound:[10,230,702,280],border:3, caption:"Filter"});
		
		this.sg2 = new saiGrid(this.p2,{bound:[20,33,300,230], colCount:1,colTitle:["Kolom"], 
				colWidth:[[0],[200]],dblClick:[this,"doDblClick"],
				readOnly:true
			});	
				
		this.sg3 = new saiGrid(this.p2,{bound:[375,33,300,230],
				colCount:1,colTitle:["Kolom"], 
				colWidth:[[0],[200]],dblClick:[this,"doDblClick"],
				readOnly:true		
			});		
					
		this.rightBtn = new imageButton(this.p2,{bound:[335,100,22,22], image:"icon/"+system.getThemes()+"/bright.png", hint:"Geser Kanan", click:[this,"entriesClick"]});				
			
		this.leftBtn = new imageButton(this.p2,{bound:[335,190,22,22], image:"icon/"+system.getThemes()+"/bleft.png", hint:"Geser Kiri", click:[this,"entriesClick"]});		
		this.allRightBtn = new imageButton(this.p2,{bound:[335,120,22,22], image:"icon/"+system.getThemes()+"/imgLast.png",hint:"Geser Kanan Semua", click:[this,"entriesClick"]});		
		this.allLeftBtn = new imageButton(this.p2,{bound:[335,170,22,22],image:"icon/"+system.getThemes()+"/imgFirst.png", hint:"Geser Kiri Semua", click:[this,"entriesClick"]});
		
		this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.standarLib = new util_standar();
	// this.cb_kol.setSQL("select kode_jenis, nama from gr_kolom_jenis_m where kode_klp='HR'",["kode_jenis","nama"],false,["Kode Jenis","Nama"],"and","Data Kolom",true);
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.dbLarge = new util_dbLarge();
	this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
	this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Proyek","All",""));
	this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("PP","All",""));
	this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("SubPP","All",""));
	this.gridLib.SGEditData(this.sg1,4,new Array(0,1,2), new Array("Kelompok Lokasi","All",""));
	this.gridLib.SGEditData(this.sg1,5,new Array(0,1,2), new Array("Lokasi Asset","All",""));
	this.gridLib.SGEditData(this.sg1,6,new Array(0,1,2), new Array("SubLokasi","All",""));
	this.gridLib.SGEditData(this.sg1,7,new Array(0,1,2), new Array("Kategori","All",""));
	this.gridLib.SGEditData(this.sg1,8,new Array(0,1,2), new Array("SubKategori","All",""));
	this.gridLib.SGEditData(this.sg1,9,new Array(0,1,2), new Array("Kelompok Aktiva","All",""));
	this.gridLib.SGEditData(this.sg1,10,new Array(0,1,2), new Array("ID Asset","All",""));
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
	
	this.doSelectCell(this.sg1,2,3);
	this.doLoad();
	
};
window.app_saku3_report_siaga_aset_flAset.extend(window.childForm);
window.app_saku3_report_siaga_aset_flAset.implement({
	doEllipseClick: function(sender, col, row){
		try{	
			if (row ==0)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokam, nama from am_lokasi ",
												"select count(*) from am_lokasi ",
												new Array("kode_lokam","nama"),"where",new Array("kode","nama"));
			}		
			if (row ==1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Proyek",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_proyek, nama from am_proyek ",
												"select count(*) from am_proyek ",
												new Array("kode_proyek","nama"),"where",new Array("kode","nama"));
			}	
			if (row ==2)
			{
				this.filterRep.ListDataSGFilter(this, "Data PP",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_pp, nama from am_pp ",
												"select count(*) from am_pp ",
												new Array("kode_pp","nama"),"where",new Array("kode","nama"));
			}	
			if (row ==3)
			{
				this.filterRep.ListDataSGFilter(this, "Data SubPP",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_subpp, nama from am_subpp ",
												"select count(*) from am_subpp ",
												new Array("kode_subpp","nama"),"where",new Array("kode","nama"));
			}	
			if (row ==4)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kelompok",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_klp, nama from am_lokasi_klp ",
												"select count(*) from am_lokasi_klp ",
												new Array("kode_klp","nama"),"where",new Array("kode","nama"));
			}	
			if (row ==5)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_lokam, nama from am_lokasi ",
												"select count(*) from am_lokasi ",
												new Array("kode_lokam","nama"),"where",new Array("kode","nama"));
			}	
			if (row ==6)
			{
				this.filterRep.ListDataSGFilter(this, "Data SubLokasi",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_sublok, nama from am_sublok ",
												"select count(*) from am_sublok ",
												new Array("kode_sublok","nama"),"where",new Array("kode","nama"));
			}
			if (row ==7)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kategori",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_kateg, nama from am_kateg ",
												"select count(*) from am_kateg ",
												new Array("kode_kateg","nama"),"where",new Array("kode","nama"));
			}	
			if (row ==8)
			{
				this.filterRep.ListDataSGFilter(this, "Data SubKategori",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_subkateg, nama from am_subkateg ",
												"select count(*) from am_subkateg ",
												new Array("kode_subkateg","nama"),"where",new Array("kode","nama"));
			}
			if (row ==9)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kelompok Aktiva",this.sg1, this.sg1.row, this.sg1.col,
												"select kode_klpbarang, nama from am_klpbarang ",
												"select count(*) from am_klpbarang ",
												new Array("kode_klpbarang","nama"),"where",new Array("kode","nama"));
			}
			if (row ==10)
			{
				
				var filter = this.filterRep.filterStr("a.kode_proyek",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_subpp",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.kode_klp",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.kode_lokam",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("a.kode_sublok",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
							this.filterRep.filterStr("a.kode_kateg",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and")+
							this.filterRep.filterStr("a.kode_subkateg",this.sg1.getCell(1,8),this.sg1.getCell(2,8),this.sg1.getCell(3,8),"and")+
							this.filterRep.filterStr("a.kode_klpbarang",this.sg1.getCell(1,9),this.sg1.getCell(2,9),this.sg1.getCell(3,9),"and");
				this.filterRep.ListDataSGFilter(this, "Data Asset",this.sg1, this.sg1.row, this.sg1.col,
												"select a.id_aset, a.nama from am_aset a "+filter,
												"select count(*) from am_aset a "+filter,
												new Array("a.id_aset","a.nama"),"where",new Array("Kode","Nama"));
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doLoad:function(sender){						
		var strSQL = "select kode_kolom from gr_kolom where kode_klp='AM' order by nu ";	
						
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_kolom]);
			}
		} else this.sg2.clear(1);				
		
	},		
	entriesClick: function(sender, col, row){
		if (sender == this.rightBtn)
		{	
			this.sg3.appendData(new Array(this.sg2.getCell(0,this.sg2.row)));
			this.sg2.delRow(this.sg2.row);
		}else if(sender == this.leftBtn)
		{		
			this.sg2.appendData(new Array(this.sg3.getCell(0,this.sg3.row)));
			this.sg3.delRow(this.sg3.row);
		}else if (sender == this.allRightBtn)
		{	
			for (var i=0; i< this.sg2.getRowCount();i++)
				this.sg3.appendData(new Array(this.sg2.getCell(0,i)));		
			this.sg2.clear();
		}else if(sender == this.allLeftBtn)
		{		
			for (var i=0; i< this.sg3.getRowCount();i++)
				this.sg2.appendData(new Array(this.sg3.getCell(0,i)));		
			this.sg3.clear();
		}
	},
	
	doSelectCell: function(sender, col, row)
	{		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7,8,9,10],["123","123","123","123","123","123","123","123","123","123","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7,8,9,10],[2,2,2,2,2,2,2,2,2,2,2]);	
	},
	doEllipseClick2: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Kolom",sender,undefined, 
					"select kode_kolom,nama from gr_kolom where kode_klp='AM' ",
					"select count(*) from gr_kolom where kode_klp='AM' ",
				  ["kode_kolom","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("No Bukti","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Bentuk Laporan","=","TAK Kirim"));
			}else{
				this.p1.setVisible(false);
				this.p2.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				this.lokasi=this.dbLib.getPeriodeFromSQL("select nama as periode from lokasi where kode_lokasi='"+this.sg1.getCell(2,0)+"'");
		    	this.filter = this.filterRep.filterStr("a.kode_proyek",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"where")+
							this.filterRep.filterStr("a.kode_pp",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_subpp",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.kode_klp",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.kode_lokam",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("a.kode_sublok",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
							this.filterRep.filterStr("a.kode_kateg",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and")+
							this.filterRep.filterStr("a.kode_subkateg",this.sg1.getCell(1,8),this.sg1.getCell(2,8),this.sg1.getCell(3,8),"and")+
							this.filterRep.filterStr("a.kode_klpbarang",this.sg1.getCell(1,9),this.sg1.getCell(2,9),this.sg1.getCell(3,9),"and")+
							this.filterRep.filterStr("a.id_aset",this.sg1.getCell(1,10),this.sg1.getCell(2,10),this.sg1.getCell(3,10),"and");				
							
				this.filter2 = this.app._nikUser+"/"+this.sg1.getCell(2,0);
				this.showFilter = this.filterRep.showFilter(this.sg1);
				var result  = new arrayMap();		
				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				if (this.sg3.getRowValidCount() > 0)
				{
					
					sql.add("delete from gr_kolom_tmp where nik_user='"+this.app._nikUser+"' ");
					for (var i=0;i < this.sg3.getRowCount();i++)
					{
							var sql2="insert into gr_kolom_tmp(kode_lokasi,kode_kolom,nik_user,tgl_input) values ('"+this.app._lokasi+"','"+this.sg3.cells(0,i)+"','"+this.app._nikUser+"',getdate())";
							sql.add(sql2);
					}
					this.dbLib.execArraySQL(sql);
				}

				
				this.nama_report = "server_report_saku3_siaga_aset_rptAset";
				this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
				
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
				this.app._mainForm.reportNavigator.rearrange();
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, this.page,  this.pager, this.showFilter, this.lokasi,this.filter2));
				this.page = 1;
				this.allBtn = false;
				
				
			}
	    }catch(e){
			systemAPI.alert("[app_saku3_report_siaga_aset_flAset]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{			
			switch (methodName)
			{
				case "preview" : 
					if (this.sg1.getCell(2,3)!="Detail")
					{
						this.viewer.preview(result);
					}
					else
					{
						this.allHtml=this.getStringHeader()+loadCSS("server_util_laporan")+result+"</body></html>";
						this.viewer.preview(result);			
						this.viewer.hideLoading();
					}
				break;
				case "sqlToHtmlWithHeader":
					this.previewReport(result);
				break;
			}
		}catch(e){
			alert(e);
		}
	},
	doSelectedPage: function(sender, page){
		this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,page,  this.pager, this.showFilter, this.lokasi,this.filter2));
		this.page = page;
		this.allBtn = false;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'>"+this.app._namalokasi.toUpperCase()+"<br>"+this.app._namaForm.toUpperCase()+"<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
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
	        this.viewer.setVisible(false);
	      	this.p1.setVisible(true);
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      break;
	  
	  }
	},
	sg1onChange: function(sender, col , row){
	    if (col===1)
		{
	     if (this.sg1.getCell(1,row)=="All")
		 {
			this.sg1.setCell(2,row,"");
			this.sg1.setCell(3,row,"");
		 }
		} 
	},
	// doLihat: function(sender){
	// 	try{			
	// 		var strSQL =  "select a.kode_kolom,a.nama from gr_kolom a left JOIN gr_kolom_jenis_d b on a.kode_kolom=b.kode_kolom where a.kode_klp='HR' and b.kode_jenis='"+this.cb_kol.getText()+"' order by a.nu desc";
	// 		var data = this.dbLib.getDataProvider(strSQL,true);		
	// 		//alert(strSQL);
	// 		if (typeof data == "object" && data.rs.rows[0] != undefined){
	// 			this.dataJU = data;
	// 			this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/20));
	// 			this.sgn2.rearrange();
	// 			this.doTampilData(1);
	// 		} else this.sg2.clear(1);
	// 	}catch(e){
	// 		systemAPI.alert(e);
	// 	}
	// },
	doTampilData: function(page) {
		this.sg2.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg2.appendData([line.kode_kolom,line.nama]); 
		}
		this.sg2.setNoUrut(start);
	},
	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});
