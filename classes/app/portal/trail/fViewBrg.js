window.app_portal_trail_fViewBrg = function(owner)
{
	try
	{
		if (owner)
		{
			window.app_portal_trail_fViewBrg.prototype.parent.constructor.call(this, owner);
			this.className = "app_portal_trail_fViewBrg";			
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Audit Trail Barang", 2);
			
			this.p1 = new portalui_panel(this);
			this.p1.setWidth(720);
			this.p1.setLeft(10);
			this.p1.setTop(10);
			this.p1.setHeight(150);
			this.p1.setBorder(3);
			this.p1.setCaption("Filter");
			this.p1.show();
			
			uses("portalui_saiGrid",true);
			this.sg1 = new portalui_saiGrid(this.p1);
			this.sg1.setWidth(700);
			this.sg1.setHeight(100);
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
				this.sg1.columns.get(3).setColWidth(150);
				this.sg1.columns.get(3).setTitle("To");
				this.sg1.setRowCount(2);
				uses("portalui_reportViewer",true);
				this.viewer = new portalui_reportViewer(this);
				this.viewer.setWidth(this.getWidth());
				this.viewer.setHeight(this.getHeight());
				this.viewer.setTop(0);
				this.viewer.setVisible(false);
				this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doAllPageClick", "doPdfClick","doXlsClick",true);
				uses("server_report_report",true);
				this.report = new server_report_report();
				this.report.addListener(this);
		}
		uses("util_filterRep",true);
		this.filterRep = new util_filterRep();
		this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1),new  Array("13","13"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,new Array(0,1),new  Array(2,2));
		
		uses("util_gridLib",true);
		this.gridLib = new util_gridLib();
		uses("util_standar",true);
		this.standar = new util_standar();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		
		this.userStatus=this.app._userStatus;
		this.tanda="=";
		this.lokasi=this.app._lokasi;
		if (this.userStatus=="A")
		{
			this.tanda="All";
			this.lokasi="";
		}
		this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi",this.tanda,this.lokasi));
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Kategori","=",""));
		
		this.p_psn = new portalui_panel(this);
		this.p_psn.setLeft(10);
		this.p_psn.setTop(10);
		this.p_psn.setWidth(855);
		this.p_psn.setHeight(260);
		this.p_psn.setName('p1');
		this.p_psn.setBorder(3);
		this.p_psn.setCaption('Daftar Barang');
		this.p_psn.hide();
		this.sg1_psn = new portalui_saiGrid(this.p_psn);
		this.sg1_psn.setLeft(1);
		this.sg1_psn.setTop(20);
		this.sg1_psn.setWidth(850);
		this.sg1_psn.setHeight(206);
		this.sg1_psn.setName('sg1mb');
		this.sg1_psn.setColCount(7);
		this.sg1_psn.setReadOnly(true);
		this.sg1_psn.setColTitle(new Array("Kode","Nama","Harga","Deskripsi","Satuan","Digunakan Untuk","Part Number"));
		this.sg1_psn.setColWidth(new Array(6,5,4,3,2,1,0),new Array(100,100,80,150,100,100,80));
		this.sg1_psn.columns.get(2).setColumnFormat(cfNilai);
		this.sg1_psn.onDblClick.set(this, "sg1onDblClick");
		uses("portalui_sgNavigator",true);
		this.sgNav =  new portalui_sgNavigator(this.p_psn);
		this.sgNav.setTop(230);
		this.sgNav.setLeft(1);
		this.sgNav.setWidth(297);
		this.sgNav.setGrid(this.sg1_psn);
		this.sgNav.setColor(this.p_psn.bgColor);
		this.sgNav.setBorder(0);
		this.sgNav.onPager.set(this, "doSelectedPage");
		this.p_img = new portalui_panel(this);
		this.p_img.setLeft(10);
		this.p_img.setTop(271);
		this.p_img.setWidth(400);
		this.p_img.setHeight(190);
		this.p_img.setName('p1');
		this.p_img.setBorder(3);
		this.p_img.setCaption('Gambar ');
		this.p_img.hide();
		this.img = new portalui_image(this.p_img);
		this.img.setWidth(398);
		this.img.setHeight(169);		
		this.img.setLeft(1);		
		this.img.setTop(20);	
		
		this.cektampil=true;
	}catch(e)
	{
		alert("[app_portal_trail_fViewBrg]::contructor: "+e);
	}
};
window.app_portal_trail_fViewBrg.extend(window.portalui_childForm);
window.app_portal_trail_fViewBrg.prototype.doSelectedPage = function(sender, page)
{
	//this.dbLib.listData(this.scriptSql, page, this.pager);
	this.sg1_psn.clear();
	var rs = this.dbLib.listDataObj("select kode_produk,nama,harga,desk_pendek,satuan, jenis_motor,case when part_number='' or part_number is null then '-' else part_number end as pn from portal_produk "+this.filter, page,20);				
	if (rs instanceof portalui_arrayMap)
			this.sg1_psn.setData(rs);	
	//this.eStatus.setCaption("Page "+page+" of "+this.pageCount);
};
window.app_portal_trail_fViewBrg.prototype.doEllipseClick= function(sender, col, row)
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
		this.filterRep.ListDataSGFilter(this, "Data Kategori",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_kategori,nama from portal_kategori where tipe='Posting' ",
											  "select count(*) from portal_kategori where tipe='Posting' ",
											  ["kode_kategori","nama"],"where",["Kode","Nama"]);
	}
};
window.app_portal_trail_fViewBrg.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1),new  Array("13","13"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2),new  Array(2,2,0));
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1),new  Array("3","13"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1),new  Array(3,2));
	}
};
window.app_portal_trail_fViewBrg.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{
		if (sender == this.sg1_psn)
		{
			var data = this.dbLib.runSQL("select c.folder,c.nama "+
				"from portal_produk a left outer join portal_dokumen b on a.no_dok_file=b.no_dok_file "+
				"left outer join portal_file c on b.no_file=c.no_file "+
				"where a.kode_produk='"+this.sg1_psn.getCell(0,row)+"'");
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{
					data = data.get(0);
					this.p_img.show();
					this.img.setImage("server/"+data.get("folder")+"/"+data.get("nama"));
				}
			}
		}
	}catch(e)
	{
		system.alert(this, e,"");
	}
};
window.app_portal_trail_fViewBrg.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			if (this.cektampil)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi",this.tanda,this.lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Kategori","=",""));
			}else
			{
				this.p_psn.hide();
				this.p_img.hide();
				this.p1.show();
			}
			this.cektampil=true;
		}else
		{
			this.cektampil=false;
			this.p1.hide();
			this.filter = this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("kode_kategori",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
			
			this.pageCount = this.dbLib.getRowCount("select count(*) from portal_produk "+this.filter, 20);
			this.sgNav.setTotalPage(this.pageCount);
			this.sgNav.rearrange();
			this.sgNav.activePage = 0;	
			this.sgNav.setButtonStyle(3);
			var data = this.dbLib.listDataObj("select kode_produk,nama,harga,desk_pendek,satuan, jenis_motor,case when part_number='' or part_number is null then '-' else part_number end as pn from portal_produk "+this.filter,1,20);
			
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{
					this.sg1_psn.clear();
					this.sg1_psn.setData(data);							
					this.sg1_psn.setColWidth(new Array(6,5,4,3,2,1,0),
						new Array(100,100,80,150,100,100,80));
					this.sg1_psn.columns.get(2).setColumnFormat(cfNilai);
				}
			}
			if (this.pageCount > 0)
			{
				if (this.sgNav.imgBtn1 != undefined)
					this.sgNav.setSelectedPage(this.sgNav.imgBtn1);
			}
			this.p_psn.show();
		}
    }catch(e)
	{
		alert("[app_portal_trail_fViewBrg]::mainButtonClick:"+e);
	}
};
window.app_portal_trail_fViewBrg.prototype.sg1onChange = function(sender, col , row)
{
    if (col==1)
	{
     if (this.sg1.getCell(1,row)=="All")
	 {
		this.sg1.setCell(2,row,"");
		this.sg1.setCell(3,row,"");
	 }
	} 
};