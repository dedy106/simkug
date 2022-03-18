window.app_saku2_dashboard_gl_fDbTbTrailKonsol = function(owner)
{
	if (owner)
	{
		window.app_saku2_dashboard_gl_fDbTbTrailKonsol.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_dashboard_gl_fDbTbTrailKonsol";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick",this.app._namaForm, 2);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		uses("util_filterRep;util_standar;util_gridLib");
		this.filterRep = new util_filterRep();
		this.standar = new util_standar();	
		this.gridLib = new util_gridLib();
		this.dbLib = new util_dbLib();
			
		//this.p1 = new panel(this,{bound:[20,10,702,110],border:3, caption:"Filter"});
		this.pc1 = new pageControl(this,{bound:[15,12,900,500], childPage:["Filter","TB Summary","TB Detail","TB Lokasi","Buku Besar","Jurnal Transaksi","Memo Jurnal"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,97],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:3});
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.app._periode));
		this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Akun","All",""));
				
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Lokasi","Saldo Awal","Debet","Kredit","Saldo Akhir"],
					colWidth:[[6,5,4,3,2,1,0],[110,110,110,110,40,280,80]],
					colFormat:[[3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai]],readOnly: true,defaultRow:1,
					dblClick:[this,"doDoubleClick"]});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,250,25],buttonStyle:4,grid:this.sg,pager:[this,"doPager"]});		
		
		this.e_akun = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,600,20],caption:"Kode Akun", tag:1, readOnly:true});		
		this.e_sawal = new saiLabelEdit(this.pc1.childPage[2],{bound:[658,10,200,20], caption:"Saldo Awal", tag:9, readOnly:true,tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[4],{bound:[1,11,this.pc1.width-5,this.pc1.height-63],colCount:9,tag:9,
		            colTitle:["No Bukti","No Dokumen","Tanggal","Keterangan","Kode PP","Kode DRK","Debet","Kredit","Balance"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,90,90,70,60,200,60,80,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1,
					dblClick:[this,"doDoubleClick2"]});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[4],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsViewExt,grid:this.sg2,pager:[this,"doPager2"]});
		
		this.sg3 = new saiGrid(this.pc1.childPage[5],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:9,
		            colTitle:["No Bukti","No Dokumen","Tanggal","Kode Akun","Nama Akun","Kode PP","Kode DRK","Keterangan","Debet","Kredit"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[90,90,200,60,50,200,80,60,80,80]],
					readOnly:true,colFormat:[[8,9],[cfNilai,cfNilai]],autoAppend:true,defaultRow:1,
					dblClick:[this,"doDoubleClick3"]});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[5],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsViewExt,grid:this.sg3,pager:[this,"doPager3"]});
		
		this.sg4 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Lokasi","Saldo Awal","Debet","Kredit","Saldo Akhir"],
					colWidth:[[6,5,4,3,2,1,0],[110,110,110,110,40,280,80]],
					colFormat:[[3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai]],readOnly: true,defaultRow:1,
					dblClick:[this,"doDoubleClick4"]});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,250,25],buttonStyle:4,grid:this.sg,pager:[this,"doPager"]});		

		this.sg5 = new saiGrid(this.pc1.childPage[3],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Lokasi","Saldo Awal","Debet","Kredit","Saldo Akhir"],
					colWidth:[[6,5,4,3,2,1,0],[110,110,110,110,40,280,80]],
					colFormat:[[3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai]],readOnly: true,defaultRow:1,
					dblClick:[this,"doDoubleClick5"]});
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,250,25],buttonStyle:4,grid:this.sg,pager:[this,"doPager"]});		

		var cnv = this.pc1.childPage[6].getClientCanvas();
		this.pc1.childPage[6].addStyle("background:#ffffff");
		this.docViewer = document.createElement("iframe");
		this.docViewer.frameBorder = 0;
		this.docViewer.id = this.getFullId()+"_viewer";
		this.docViewer.style.cssText = "width:100%;height:95%;scrolling=yes;";		
		cnv.appendChild(this.docViewer);
			
		this.bPrint = new imageButton(this.pc1.childPage[6],{bound:[800,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[6],{bound:[823,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[6],{bound:[846,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);
		this.pc1.childPage[2].rearrangeChild(10, 22);
		this.pc1.childPage[3].rearrangeChild(10, 22);
		
		this.maximize();		
		this.setTabChildIndex();
		this.pager=50;
	}
};
window.app_saku2_dashboard_gl_fDbTbTrailKonsol.extend(window.childForm);
window.app_saku2_dashboard_gl_fDbTbTrailKonsol.implement({
	doEllipseClick:function(sender, col, row)
	{
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Daftar Lokasi",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_lokasi, nama from lokasi where flag_konsol<>'1' ",
											  "select count(kode_lokasi) from lokasi where flag_konsol<>'1' ",
											  ["kode_lokasi","nama"],"and",["Kode","Nama"]);
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Akun",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_akun,nama from masakun "+
											  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
											  "select count(kode_akun) from masakun "+
											  this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0)," where "),
											  new Array("kode_akun","nama"),"where");
		}
	},
	doSelectCell:function(sender, col, row)
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2],["123","3","123"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2],[2,0,2]);
		if (row == 1)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from periode where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList]);
		}
	},
	mainButtonClick:function(sender)
	{
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi","=",this.app._lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.app._periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Kode Akun","All",""));
			}
			else
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where") +
							this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_akun",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and");
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
				var sql = "call sp_glma_tmp ('"+this.kode_lokasi+"','"+this.kode_lokasi1+"','"+this.kode_lokasi2+"','"+this.sg1.getCell(2,1)+"','"+this.app._nikUser+"')";
				
				this.dbLib.execQuerySync(sql);	
				var strSQL= "select kode_akun,nama,kode_lokasi,so_awal,debet,kredit,so_akhir "+
							"from glma_tmp where nik_user='"+this.app._nikUser+"' and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0) order by kode_akun ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);
							
			}
		}catch(e)
		{
			alert("[app_budget_report_flAggRkap]::mainButtonClick:"+e);
		}
	},
	doTampilData: function(page) {
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.kode_akun,line.nama,line.kode_lokasi,floatToNilai(line.so_awal),floatToNilai(line.debet),floatToNilai(line.kredit),floatToNilai(line.so_akhir)]);

		}
		this.sg.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	doDoubleClick: function(sender, col , row) 
	{
		if (this.sg.cells(4,row)!=0 || this.sg.cells(5,row)!=0)
		{
			var sql = "call sp_glma_lok_trail_tmp ('"+this.sg.cells(0,row)+"','"+this.kode_lokasi+"','"+this.kode_lokasi1+"','"+this.kode_lokasi2+"','"+this.sg1.getCell(2,1)+"','"+this.app._nikUser+"')";
			
			this.dbLib.execQuerySync(sql);	
			var strSQL= "select kode_akun,nama,kode_lokasi,so_awal,debet,kredit,so_akhir "+
						"from glma_tmp where nik_user='"+this.app._nikUser+"' and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0) order by kode_akun ";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.dataJU = data;
				this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
				this.sgn4.rearrange();
				this.doTampilData4(1);
			} else this.sg4.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[2]);
		}
	},
	doTampilData4: function(page) {
		this.sg4.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg4.appendData([line.kode_akun,line.nama,line.kode_lokasi,floatToNilai(line.so_awal),floatToNilai(line.debet),floatToNilai(line.kredit),floatToNilai(line.so_akhir)]);

		}
		this.sg4.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[2]);
	},
	doDoubleClick4: function(sender, col , row) 
	{
		if (this.sg4.cells(4,row)!=0 || this.sg4.cells(5,row)!=0)
		{
			var sql = "call sp_glma_lok_detail_trail_tmp ('"+this.sg4.cells(0,row)+"','"+this.sg4.cells(2,row)+"','"+this.sg4.cells(2,row)+"','"+this.sg4.cells(2,row)+"','"+this.sg1.getCell(2,1)+"','"+this.app._nikUser+"')";
			
			this.dbLib.execQuerySync(sql);	
			var strSQL= "select kode_akun,nama,kode_lokasi,so_awal,debet,kredit,so_akhir "+
						"from glma_tmp where nik_user='"+this.app._nikUser+"' and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0) order by kode_akun ";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.dataJU = data;
				this.sgn5.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
				this.sgn5.rearrange();
				this.doTampilData5(1);
			} else this.sg5.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[3]);
		}
	},
	doTampilData5: function(page) {
		this.sg5.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg5.appendData([line.kode_akun,line.nama,line.kode_lokasi,floatToNilai(line.so_awal),floatToNilai(line.debet),floatToNilai(line.kredit),floatToNilai(line.so_akhir)]);

		}
		this.sg5.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[3]);
	},
	doDoubleClick5: function(sender, col , row) 
	{
		if (this.sg5.cells(4,row)!=0 || this.sg5.cells(5,row)!=0)
		{
			this.e_akun.setText(this.sg.cells(0,row)+' - '+this.sg.cells(1,row));
			this.e_sawal.setText(this.sg.cells(3,row));
			var sql = "call sp_bb ('"+this.sg5.cells(0,row)+"','"+this.sg5.cells(0,row)+"','"+this.sg5.getCell(2,0)+"','"+this.sg1.getCell(2,1)+"','"+this.sg1.getCell(2,1)+"','"+this.app._nikUser+"','0')";
			
			this.dbLib.execQuerySync(sql);	
			var strSQL= "select no_bukti,no_dokumen,date_format(tanggal,'%d/%m/%Y') as tanggal,keterangan,kode_pp,kode_drk,debet,kredit,saldo "+
						" from bb_tmp  "+
						"where kode_akun='"+this.sg5.cells(0,row)+"' and nik_user='"+this.app._nikUser+"' order by no_urut";		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined)
			{
				var line;
				this.dataJU = data;
				this.sgn2.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
				this.sgn2.rearrange();
				this.doTampilData2(1);
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[4]);
		}
	},
	doTampilData2: function(page) {
		this.sg2.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg2.appendData([line.no_bukti,line.no_dokumen,line.tanggal,line.keterangan,line.kode_pp,line.kode_drk,floatToNilai(line.debet),floatToNilai(line.kredit),floatToNilai(line.saldo)]);
		}
		this.sg2.setNoUrut(start);
	},
	doDoubleClick2: function(sender, col , row) 
	{
		var tabel = "(select * from gldt where no_bukti='"+this.sg2.cells(0,row)+"' and periode='"+this.sg1.getCell(2,1)+"' and kode_lokasi='"+this.sg5.getCell(2,0)+"' "+
      		        " union all "+
				    " select * from gldt_h where no_bukti='"+this.sg2.cells(0,row)+"' and periode='"+this.sg1.getCell(2,1)+"' and kode_lokasi='"+this.sg5.getCell(2,0)+"')";
		var strSQL= "select a.no_bukti,a.no_dokumen,date_format(tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,b.nama as nama_akun,a.kode_pp,a.kode_drk,a.keterangan,case when a.dc='D' then nilai else 0 end as debet,"+
					"case when a.dc='C' then nilai else 0 end as kredit from "+tabel+" a "+
					"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"order by a.tanggal, a.no_bukti ";
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined)
		{
			var line;
			this.dataJU = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/this.pager));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[5]);
		
	},
	doDoubleClick3: function(sender, col , row) 
	{
		try{
			uses("server_report_report");
			var nama_report="";
			var no_bukti=this.sg3.cells(0,row);
			this.filter=" where no_bukti='"+no_bukti+"'";
			nama_report="server_report_saku2_gl_rptGlJurnal";
			this.report = new server_report_report();
			this.showFilter = "";
			this.lokasi = "";
			this.docViewer.src = this.report.previewWithHeader(nama_report,this.filter, 1,1, this.showFilter, this.lokasi,this.filter2)+"&resource="+ this.resourceId+"&fullId="+this.getFullId();
			this.pc1.setActivePage(this.pc1.childPage[6]);
		}catch(e){
			systemAPI.alert(e);
		}
		
	},
	doPrintClick : function(sender){
		switch (sender){
			case this.bPrint :
				var win = window.open("");
				win.document.write(loadCSS("server_util_laporan"));
				win.document.write(this.docViewer.contentWindow.document.body.innerHTML);
				win.document.close();
			break;
			case this.bExcel :
				 var html = new server_util_arrayList();
				html.add(this.docViewer.contentWindow.document.body.innerHTML);			
				html.add("xls");			
				html.add(new Date().valueOf());				
			    var win = window.open("");
				win.location = upDownHtml(html);
			break;
			case this.bEmail :
				this.mailFrm = new portalui_ConfirmMail(this);
				this.mailFrm.setBound((this.width/2)-125,this.height/2-100,250,100);
				this.mailFrm.setCaption(this.mailFrm.title);
				this.mailFrm.setBorder(3);
				this.mailFrm.onConfirmClick.set(this, "doConfirmClick");
			break;
		}
	},
	doConfirmClick: function(sender){
		try{
			
			if (sender === this.mailFrm.bConfirm){
				var to = this.mailFrm.getEmail();
				if (to !== ""){
					this.mailFrm.free();
					var d = new Date();
					var subject = this.app._namaForm;
					var pesan = loadCSS("server_util_laporan")+this.docViewer.contentWindow.document.body.innerHTML;
					this.mail.send(undefined,to,subject,pesan);
				}else{
					systemAPI.alert("Alamat email belum diisi!");
				}
			}
		}catch(e){
			alert("[doConfirmClick]: sender= "+sender+"; error= "+e);
		}
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		this.page = page;
		var start = (page - 1) * this.pager;
		var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg3.appendData([line.no_bukti,line.no_dokumen,line.tanggal,line.kode_akun,line.nama_akun,line.kode_pp,line.kode_drk,line.keterangan,floatToNilai(line.debet),floatToNilai(line.kredit)]);
		}
		this.sg3.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doPager2: function(sender, page) {
		this.doTampilData2(page);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	}
});