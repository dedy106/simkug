window.app_saku3_report_siaga_hris_karyawan_flKaryawanV = function(owner)
{
	if (owner)
	{
		window.app_saku3_report_siaga_hris_karyawan_flKaryawanV.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_report_siaga_hris_karyawan_flKaryawanV";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","", 2);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;server_report_report");
		uses("childPage;panel;flashChart;timer;toolbar;pageControl;portalui_ConfirmMail;server_util_mail");
		uses("util_filterRep;util_standar;util_gridLib");
		this.filterRep = new util_filterRep();
		this.standar = new util_standar();	
		this.gridLib = new util_gridLib();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		//this.p1 = new panel(this,{bound:[20,10,702,110],border:3, caption:"Filter"});
		
		this.pc1 = new pageControl(this,{bound:[15,12,1000,500], childPage:["Filter","Data Informasi","Detail Informasi"]});
		this.bPrint = new imageButton(this.pc1.childPage[2],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel = new imageButton(this.pc1.childPage[2],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail = new imageButton(this.pc1.childPage[2],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.bPrint2 = new imageButton(this.pc1.childPage[3],{bound:[850,0,22,20], hint:"Print", image:"icon/"+system.getThemes()+"/print.png",click:[this,"doPrintClick"]});
		this.bExcel2 = new imageButton(this.pc1.childPage[3],{bound:[873,0,22,20], hint:"Excel", image:"icon/"+system.getThemes()+"/excel.png", click:[this,"doPrintClick"]});
		this.bEmail2 = new imageButton(this.pc1.childPage[3],{bound:[896,0,22,20], hint:"Email", image:"icon/"+system.getThemes()+"/sendMail.png",click:[this,"doPrintClick"]});
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,20,700,387],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:19});
				
		var nik="";
		var tanda="All";
		if (this.app._userStatus!="A")
		{
			tanda="=";
			nik=this.app._userLog;
		}
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Lokasi Kerja","All",""]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Direktorat","All",""]);
		this.gridLib.SGEditData(this.sg1,2,[0,1,2],["Departemen","All",""]);
		this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jabatan","All",""]);
		this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Status SDM","All",""]);
		this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Grade","All",""]);
		this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Pihak Ketiga","All",""]);
		this.gridLib.SGEditData(this.sg1,7,[0,1,2],["Provinsi","All",""]);
		this.gridLib.SGEditData(this.sg1,8,[0,1,2],["Kota","All",""]);
		this.gridLib.SGEditData(this.sg1,9,[0,1,2],["Gender","All",""]);
		this.gridLib.SGEditData(this.sg1,10,[0,1,2],["Gol Darah","All",""]);
		this.gridLib.SGEditData(this.sg1,11,[0,1,2],["Agama","All",""]);
		this.gridLib.SGEditData(this.sg1,12,[0,1,2],["Strata","All",""]);
		this.gridLib.SGEditData(this.sg1,13,[0,1,2],["Jurusan","All",""]);
		this.gridLib.SGEditData(this.sg1,14,[0,1,2],["NIK",tanda,nik]);
		this.gridLib.SGEditData(this.sg1,15,[0,1,2],["Jenis Laporan","=","Kedinasan"]);	
		this.gridLib.SGEditData(this.sg1,16,[0,1,2],["Periode Masuk","All",""]);
		this.gridLib.SGEditData(this.sg1,17,[0,1,2],["Status Aktif","=","Ya"]);	
		this.gridLib.SGEditData(this.sg1,18,[0,1,2],["Tahun","All",""]);	
		this.doSelectCell(this.sg1,2,17);	
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,11,this.pc1.width-5,this.pc1.height-50],colCount:15,tag:9,
		            colTitle:["NIK","Nama","Status","Tgl Masuk","Grade","Tgl Lahir","Umur","Masa Kerja","Lokasi Kerja","Direktorat","Departemen","Jabatan","Tgl Bekerja","Strata","Jurusan"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60,150,100,60,40,60,40,40,40,60,40,60,100,150,60]], 
					readOnly:true,autoAppend:true,defaultRow:1,rowPagerPage : 20,autoPaging : true,
					dblClick:[this,"doDoubleClick"]});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:-1,grid:this.sg,pager:[this,"doPager"]});
		
		var cnv = this.pc1.childPage[2].getClientCanvas();
		this.pc1.childPage[2].addStyle("background:#ffffff");
		this.docViewer = document.createElement("iframe");
		this.docViewer.frameBorder = 0;
		this.docViewer.id = this.getFullId()+"_viewer";
		this.docViewer.style.cssText = "width:100%;height:100%";		
		cnv.appendChild(this.docViewer);
		
		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);
		this.pc1.childPage[2].rearrangeChild(10, 22);
		
		this.timer = new timer(this);
        this.timer.setInterval(1000);
        this.timer.setEnabled(false);
        this.timer.onTimer.set(this,"doTimer");
		
		this.maximize();		
		this.setTabChildIndex();
		this.pager=50;
		this.mail = new server_util_mail(undefined,this.app._lokasi);
		this.mail.addListener(this);
		
		
	}
};
window.app_saku3_report_siaga_hris_karyawan_flKaryawanV.extend(window.childForm);
window.app_saku3_report_siaga_hris_karyawan_flKaryawanV.implement({
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
			case this.bPrint2 :
				var win = window.open("");
				win.document.write(loadCSS("server_util_laporan"));
				win.document.write(this.docViewer2.contentWindow.document.body.innerHTML);
				win.document.close();
			break;
			case this.bExcel2 :
				 var html = new server_util_arrayList();
				html.add(this.docViewer2.contentWindow.document.body.innerHTML);			
				html.add("xls");			
				html.add(new Date().valueOf());				
			    var win = window.open("");
				win.location = upDownHtml(html);
			break;
			case this.bEmail2 :
				this.mailFrm = new portalui_ConfirmMail(this);
				this.mailFrm.setBound((this.width/2)-125,this.height/2-100,250,100);
				this.mailFrm.setCaption(this.mailFrm.title);
				this.mailFrm.setBorder(3);
				this.mailFrm.onConfirmClick.set(this, "doConfirmClick2");
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
	doConfirmClick2: function(sender){
		try{
			
			if (sender === this.mailFrm.bConfirm){
				var to = this.mailFrm.getEmail();
				if (to !== ""){
					this.mailFrm.free();
					var d = new Date();
					var subject = this.app._namaForm;
					var pesan = loadCSS("server_util_laporan")+this.docViewer2.contentWindow.document.body.innerHTML;
					this.mail.send(undefined,to,subject,pesan);
				}else{
					systemAPI.alert("Alamat email belum diisi!");
				}
			}
		}catch(e){
			alert("[doConfirmClick]: sender= "+sender+"; error= "+e);
		}
	},
	doEllipseClick:function(sender, col, row)
	{
		if (row == 0)
			{
				if (this.app._userStatus=="L")
				{
					this.filterRep.ListDataSGFilter(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
													"select a.kode_loker,a.nama "+
													"from gr_loker a "+
													"inner join gr_karyawan_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
													"where a.kode_lokasi = '"+this.app._lokasi+"' and b.nik='"+this.app._userLog+"'",
													"select count(a.kode_loker) "+
													"from gr_loker a "+
													"inner join gr_karyawan_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
													"where a.kode_lokasi = '"+this.app._lokasi+"' and b.nik='"+this.app._userLog+"'",
													["a.kode_loker","a.nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
				}
				else
				{
					this.filterRep.ListDataSGFilter(this, "Data Lokasi Kerja",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_loker, nama from gr_loker where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_loker  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_loker","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
				}
			}	
			if (row == 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Direktorat",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_dir, nama from gr_dir where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_dir  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_dir","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
				
			}	
			if (row == 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Departemen",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_dept, nama from gr_dept where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_dept  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_dept","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 3)
			{
				this.filterRep.ListDataSGFilter(this, "Data Jabatan",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_jab, nama from gr_jab where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_jab  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_jab","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 4)
			{
				this.filterRep.ListDataSGFilter(this, "Data Status SDM",this.sg1, this.sg1.row, this.sg1.col,
													"select sts_sdm, nama from gr_status_sdm where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_status_sdm  where kode_lokasi = '"+this.app._lokasi+"' ",
													["sts_sdm","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}	
			if (row == 5)
			{
				this.filterRep.ListDataSGFilter(this, "Data Grade",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_grade, nama from gr_grade where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_grade  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_grade","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 6)
			{
				this.filterRep.ListDataSGFilter(this, "Data Pihak Ketiga",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_vendor, nama from gr_vendor where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_vendor  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_vendor","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 7)
			{
				this.filterRep.ListDataSGFilter(this, "Data Provinsi",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_prov, nama from gr_prov  ",
													"select count(*) from gr_prov  ",
													["kode_prov","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 8)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kota",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_kota, nama from gr_kota where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_kota  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_kota","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 9)
			{
				this.filterRep.ListDataSGFilter(this, "Data Kota",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_kota, nama from gr_kota where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_kota  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_kota","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 11)
			{
				this.filterRep.ListDataSGFilter(this, "Data Agama",this.sg1, this.sg1.row, this.sg1.col,
													"select sts_agama, nama from gr_status_agama where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_status_agama  where kode_lokasi = '"+this.app._lokasi+"' ",
													["sts_agama","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 12)
			{
				this.filterRep.ListDataSGFilter(this, "Data Strata",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_strata, nama from gr_strata where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_strata  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_strata","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 13)
			{
				this.filterRep.ListDataSGFilter(this, "Data Jurusan",this.sg1, this.sg1.row, this.sg1.col,
													"select kode_jur, nama from gr_jur where kode_lokasi = '"+this.app._lokasi+"' ",
													"select count(*) from gr_jur  where kode_lokasi = '"+this.app._lokasi+"' ",
													["kode_jur","nama"],"and",["Kode","Nama"], false, this.sg1.cells(1,row) == "in");
			}
			if (row == 14)
			{
				this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("a.kode_dir",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_dept",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_jab",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.sts_sdm",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.kode_grade",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("a.kode_vendor",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
							this.filterRep.filterStr("a.kode_prov",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and")+
							this.filterRep.filterStr("a.kode_kota",this.sg1.getCell(1,8),this.sg1.getCell(2,8),this.sg1.getCell(3,8),"and")+
							this.filterRep.filterStr("a.sex",this.sg1.getCell(1,9),this.sg1.getCell(2,9),this.sg1.getCell(3,10),"and")+
							this.filterRep.filterStr("a.gol_darah",this.sg1.getCell(1,10),this.sg1.getCell(2,10),this.sg1.getCell(3,10),"and")+
							this.filterRep.filterStr("a.sts_agama",this.sg1.getCell(1,11),this.sg1.getCell(2,11),this.sg1.getCell(3,11),"and")+
							this.filterRep.filterStr("a.kode_strata",this.sg1.getCell(1,12),this.sg1.getCell(2,12),this.sg1.getCell(3,12),"and")+
							this.filterRep.filterStr("a.kode_jur",this.sg1.getCell(1,13),this.sg1.getCell(2,13),this.sg1.getCell(3,13),"and");
				this.filterRep.ListDataSGFilter(this, "Data Karyawan",this.sg1, this.sg1.row, this.sg1.col,
													"select a.nik, a.nama from gr_karyawan a "+this.filter,
													"select count(*) from gr_karyawan a "+this.filter,
													["a.nik","a.nama"],"and",["NIK","Nama"], false, this.sg1.cells(1,row) == "in");			}
		
	},
	doSelectCell:function(sender, col, row)
	{
		if (this.app._userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],["123i","123i","123i","123i","123i","123i","123i","123i","123i","13","13","123i","123i","123i","123i","3","1236","3","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],[2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,0,0,0]);
		}
		else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],["123i","123i","123i","123i","123i","123i","123i","123i","123i","13","13","123i","123i","123i","3","3","1236","3","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0]);
		}
		if (row == 9)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("L","P"));
		}
		if (row == 10)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("A","AB","B","O"));
		}
		if (row == 15)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Pribadi","Pendidikan","Keluarga","Kedinasan","Karyawan","Karyawan Baru","Karyawan Keluar"));
		}	
		if (row == 17)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,new Array("Ya","Tidak"));
		}
		if (row == 16)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct substring(convert(varchar,tgl_masuk,103),7,4)+substring(convert(varchar,tgl_masuk,103),4,2) as periode "+
										"from gr_karyawan where kode_lokasi='"+this.app._lokasi+"' order by periode desc ",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
		if (row == 18)
		{
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct (year(tgl_masuk)) as tahun from gr_karyawan where kode_lokasi='"+this.app._lokasi+"' order by tahun desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);

		}
		
	},
	mainButtonClick:function(sender)
	{
		try
		{
			
			if (sender == this.app._mainForm.bClear2)
			{ 
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1), new Array("Periode","All"));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1), new Array("Kelompok","All"));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1), new Array("No Konten","All"));
			}
			else
			{
				var flag_aktif=" and a.flag_aktif<>'X' ";
				if (this.sg1.getCell(2,17)=="Tidak")
				{
					flag_aktif=" and a.flag_aktif='X' ";
				}
				var tgl_masuk="";
				if (this.sg1.getCell(1,16)=="<=")
				{
					tgl_masuk=" and substring(convert(varchar,a.tgl_masuk,103),7,4)+substring(convert(varchar,a.tgl_masuk,103),4,2)<='"+this.sg1.getCell(2,16)+"' ";
				}
				if (this.sg1.getCell(1,16)=="=")
				{
					tgl_masuk=" and substring(convert(varchar,a.tgl_masuk,103),7,4)+substring(convert(varchar,a.tgl_masuk,103),4,2)='"+this.sg1.getCell(2,16)+"' ";
				}
				if (this.sg1.getCell(1,16)=="Range")
				{
					tgl_masuk=" and substring(convert(varchar,a.tgl_masuk,103),7,4)+substring(convert(varchar,a.tgl_masuk,103),4,2) between '"+this.sg1.getCell(2,16)+"' and '"+this.sg1.getCell(3,16)+"'";
				}
				var tahun="";
				if (this.sg1.getCell(2,18)!="")
				{
					tahun=" and  year(a.tgl_masuk)<='"+this.sg1.getCell(2,18)+"' ";
				}
		    	this.filter = this.filterRep.filterStr("a.kode_lokasi","=",this.app._lokasi,this.app._lokasi,"where")+
							this.filterRep.filterStr("a.kode_loker",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"and")+
							this.filterRep.filterStr("a.kode_dir",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("a.kode_dept",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("a.kode_jab",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and")+
							this.filterRep.filterStr("a.sts_sdm",this.sg1.getCell(1,4),this.sg1.getCell(2,4),this.sg1.getCell(3,4),"and")+
							this.filterRep.filterStr("a.kode_grade",this.sg1.getCell(1,5),this.sg1.getCell(2,5),this.sg1.getCell(3,5),"and")+
							this.filterRep.filterStr("a.kode_vendor",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
							this.filterRep.filterStr("a.kode_prov",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and")+
							this.filterRep.filterStr("a.kode_kota",this.sg1.getCell(1,8),this.sg1.getCell(2,8),this.sg1.getCell(3,8),"and")+
							this.filterRep.filterStr("a.sex",this.sg1.getCell(1,9),this.sg1.getCell(2,9),this.sg1.getCell(3,10),"and")+
							this.filterRep.filterStr("a.gol_darah",this.sg1.getCell(1,10),this.sg1.getCell(2,10),this.sg1.getCell(3,10),"and")+
							this.filterRep.filterStr("a.sts_agama",this.sg1.getCell(1,11),this.sg1.getCell(2,11),this.sg1.getCell(3,11),"and")+
							this.filterRep.filterStr("a.kode_strata",this.sg1.getCell(1,12),this.sg1.getCell(2,12),this.sg1.getCell(3,12),"and")+
							this.filterRep.filterStr("a.kode_jur",this.sg1.getCell(1,13),this.sg1.getCell(2,13),this.sg1.getCell(3,13),"and")+
							this.filterRep.filterStr("a.nik",this.sg1.getCell(1,14),this.sg1.getCell(2,14),this.sg1.getCell(3,14),"and")+flag_aktif+tgl_masuk+tahun;
							
				var sql = "select a.nik,a.nama,i.nama as status_sdm,date_format(a.tgl_masuk,'%d/%m/%Y') as tgl_masuk,a.kode_grade,date_format(a.tgl_lahir,'%d/%m/%Y') as tgl_lahir,DATEDIFF(year,a.tgl_lahir,getdate()) as umur,DATEDIFF(year,a.tgl_masuk,getdate()) as masa_kerja,d.nama as loker,e.nama as dir,f.nama as dept, "+
								"	   g.nama as jabatan,date_format(a.tgl_masuk,'%d/%m/%Y') as tgl_awal_sk,a.kode_strata,k.nama as nama_jur "+
								"from gr_karyawan a  "+
								"inner join gr_loker d on a.kode_loker=d.kode_loker and a.kode_lokasi=d.kode_lokasi "+
								"inner join gr_dir e on a.kode_dir=e.kode_dir and a.kode_lokasi=e.kode_lokasi "+
								"inner join gr_dept f on a.kode_dept=f.kode_dept and a.kode_lokasi=e.kode_lokasi "+
								"inner join gr_jab g on a.kode_jab=g.kode_jab and a.kode_lokasi=g.kode_lokasi "+
								"inner join gr_status_sdm i on a.sts_sdm=i.sts_sdm and a.kode_lokasi=i.kode_lokasi "+
								"inner join gr_strata j on a.kode_strata=j.kode_strata and a.kode_lokasi=j.kode_lokasi "+
								"inner join gr_jur k on a.kode_jur=k.kode_jur and a.kode_lokasi=k.kode_lokasi "+
								"left join gr_dinas l on a.nik=l.nik and a.kode_lokasi=l.kode_lokasi and l.flag_aktif='1' "+
								"left join gr_sk m on l.nik=m.nik and l.no_sk=m.no_sk "+this.filter+
								"order by a.nik ";
				
				var data = this.dbLib.getDataProvider(sql,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
					this.pc1.setActivePage(this.pc1.childPage[1]);
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
		var line;
		//var start = (page - 1) * this.pager;
		//var finish = (start + this.pager > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.pager);
		//for (var i=start;i<finish;i++){
		for (var i=0;i<this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.nik,line.nama,line.status_sdm,line.tgl_masuk,line.kode_grade,line.tgl_lahir,line.umur,line.masa_kerja,line.loker,line.dir,line.dept,line.jabatan,line.tgl_awal_sk,line.kode_strata,line.nama_jur]);
		}
		this.sg.setNoUrut(0);
	},
	doPager: function(sender, page) {
		this.sg.doSelectPage(page);
		this.page = page;
	},
	doDoubleClick: function(sender, col , row) 
	{
		try{
		
			this.report = new server_report_report();
			this.filter = "where no_konten='"+this.sg.cells(0,row)+"'";
			this.showFilter = "";
			this.lokasi = "";
			this.filter2 = "";
			this.docViewer.src = this.report.previewWithHeader("server_report_hris_rptInformasi",this.filter, 1,1, this.showFilter, this.lokasi,this.filter2);
			this.pc1.setActivePage(this.pc1.childPage[2]);
		}catch(e){
			alert(e);
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
	}
	
	
	
});