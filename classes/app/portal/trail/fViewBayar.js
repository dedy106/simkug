window.app_portal_trail_fViewBayar = function(owner)
{
	try
	{
		if (owner)
		{
			window.app_portal_trail_fViewBayar.prototype.parent.constructor.call(this, owner);
			this.className = "app_portal_trail_fViewBayar";			
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Audit Trail Pembayaran", 2);
			
			this.p1 = new portalui_panel(this);
			this.p1.setWidth(665);
			this.p1.setLeft(10);
			this.p1.setTop(10);
			this.p1.setHeight(124);
			this.p1.setBorder(3);
			this.p1.setCaption("Filter");
			this.p1.show();
			
			uses("portalui_saiGrid",true);
			this.sg1 = new portalui_saiGrid(this.p1);
			this.sg1.setWidth(660);
			this.sg1.setHeight(100);
			this.sg1.setLeft(1);
			this.sg1.setTop(20);
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
				this.sg1.setRowCount(4);
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
		this.filterRep.setSGFilterRowTipe(this.sg1, 0,new Array(0,1,2,3),new  Array("13","13","13","13"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,new Array(0,1,2,3),new  Array(2,0,2,2));
		
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
		this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.app._periode));
		this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Cabang","All",""));
		this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Sales","All",""));
		
		this.p_psn = new portalui_panel(this);
		this.p_psn.setLeft(10);
		this.p_psn.setTop(10);
		this.p_psn.setWidth(680);
		this.p_psn.setHeight(230);
		this.p_psn.setName('p1');
		this.p_psn.setBorder(3);
		this.p_psn.setCaption('Daftar Order');
		this.p_psn.hide();
		this.sg1_psn = new portalui_saiGrid(this.p_psn);
		this.sg1_psn.setLeft(1);
		this.sg1_psn.setTop(20);
		this.sg1_psn.setWidth(675);
		this.sg1_psn.setHeight(206);
		this.sg1_psn.setName('sg1mb');
		this.sg1_psn.setColCount(5);
		this.sg1_psn.setReadOnly(true);
		this.sg1_psn.setColTitle(new Array("No. Bayar","Sales","Tanggal","Keterangan","Dokumen","Nilai Bayar"));
		this.sg1_psn.setColWidth(new Array(4,3,2,1,0),new Array(100,100,150,100,100,100));
		this.sg1_psn.columns.get(4).setColumnFormat(cfNilai);
		this.sg1_psn.onDblClick.set(this,"sg1onDblClick");
		this.p_desk = new portalui_panel(this);
		this.p_desk.setLeft(10);
		this.p_desk.setTop(243);
		this.p_desk.setWidth(480);
		this.p_desk.setHeight(199);
		this.p_desk.setName('p1');
		this.p_desk.setBorder(3);
		this.p_desk.setCaption('Deskripsi');
		this.desk = new portalui_saiGrid(this.p_desk);
		this.desk.setTop(20);
		this.desk.setLeft(1);
		this.desk.setWidth(475);
		this.desk.setHeight(155);
		this.desk.setColCount(4);
		this.desk.setReadOnly(true);
		this.desk.setColTitle(new Array("No. Bayar","No. Order","Keterangan","Nilai Order"));
		this.desk.setColWidth(new Array(3,2,1,0),new Array(100,150,100,100));
		this.desk.columns.get(3).setColumnFormat(cfNilai);
		this.total = new portalui_saiLabelEdit(this.p_desk);
		this.total.setLeft(228);
		this.total.setTop(178);
		this.total.setWidth(250);
		this.total.setTipeText(ttNilai);
		this.total.setAlignment(alRight);
		this.total.setCaption("Total");
		this.total.setReadOnly(true);
		this.total.setLength(100);
		this.p_desk.hide();
		
		this.cektampil=true;
	}catch(e)
	{
		alert("[app_portal_trail_fViewBayar]::contructor: "+e);
	}
};
window.app_portal_trail_fViewBayar.extend(window.portalui_childForm);
window.app_portal_trail_fViewBayar.prototype.doEllipseClick= function(sender, col, row)
{
	try
	{
		if (row == 0)
		{			
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
												  "select kode_lokasi, nama from lokasi ",
												  "select count(*) from lokasi ",
												  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		if (row == 2)
		{			
			this.filterRep.ListDataSGFilter(this, "Data Cabang",this.sg1, this.sg1.row, this.sg1.col,
					  "select kode_cab, nama from portal_cabang where kode_lokasi like '%"+this.sg1.getCell(2,0)+"' ",
					  "select count(*) from portal_cabang where kode_lokasi like '%"+this.sg1.getCell(2,0)+"' ",
					  ["kode_cab","nama"],"where",["Kode","Nama"]);
		}
		if (row == 3)
		{			
			this.filterRep.ListDataSGFilter(this, "Data Sales",this.sg1, this.sg1.row, this.sg1.col,
					  "select kode_sales, nama from portal_sales where kode_cab like '%"+this.sg1.getCell(2,2)+"' ",
					  "select count(*) from portal_sales where kode_cab like '%"+this.sg1.getCell(2,2)+"' ",
					  ["kode_sales","nama"],"where",["Kode","Nama"]);
		}
	}catch(e)
	{
		alert("app_portal_trail_fViewBayar::doEllipseClick "+e)
	}
};
window.app_portal_trail_fViewBayar.prototype.doSelectCell = function(sender, col, row)
{
	if (this.userStatus=="A")
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3),new  Array("13","13","13","13"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3),new  Array(2,0,2,2));
	}else
	{
		this.filterRep.setSGFilterRowTipe(this.sg1, row,new Array(0,1,2,3),new  Array("3","13","13","13"));
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,new Array(0,1,2,3),new  Array(3,0,2,2));
	}
	if (row == 1)
	{
		if (this.sg1.getCell(1,0) == "All")
		{
			this.standar.isiItemsWithPeriodeLok(this.app._kodeLokasiKonsol,this.sg1.columns.get(2).pickList);
		}
		else
		{
			this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(2).pickList);
		}
	}	
};
window.app_portal_trail_fViewBayar.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{
		if (sender == this.sg1_psn)
		{
			var data = this.dbLib.runSQL("select a.no_bayar,a.no_order,b.keterangan, sum(c.jumlah*c.harga) as total "+
						"from portal_bayar_d a inner join portal_order_m b on a.no_order=b.no_order "+
						"inner join portal_order_d c on b.no_order=c.no_order "+
						"where a.no_bayar = '"+this.sg1_psn.getCell(0,row)+"' "+
						"group by b.no_order ");
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{
					this.p_desk.show();
					this.desk.clear();
					this.desk.setData(data);
					this.desk.setColWidth(new Array(3,2,1,0),new Array(100,150,100,100));
					this.desk.columns.get(3).setColumnFormat(cfNilai);
				}
			}
			var tot=0;
			for (var k=0; k < this.desk.rows.getLength(); k++)
			{
				tot+=parseFloat(strToFloat(this.desk.getCell(3,k)));
			}
			this.total.setText(floatToNilai(tot));
		}
	}catch(e)
	{
		system.alert(this, e,"");
	}
};
window.app_portal_trail_fViewBayar.prototype.mainButtonClick = function(sender)
{
	try
	{
		if (sender == this.app._mainForm.bClear2)
		{ 
			if (this.cektampil)
			{
				this.gridLib.SGEditData(this.sg1,0,new Array(0,1,2), new Array("Kode Lokasi",this.tanda,this.lokasi));
				this.gridLib.SGEditData(this.sg1,1,new Array(0,1,2), new Array("Periode","=",this.app._periode));
				this.gridLib.SGEditData(this.sg1,2,new Array(0,1,2), new Array("Cabang","All",""));
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Sales","All",""));
			}else
			{
				this.p_psn.hide();
				this.p_desk.hide();
				this.p1.show();
			}
			this.cektampil=true;
		}else
		{
			this.cektampil=false;
			this.p1.hide();
			this.filter = this.filterRep.filterStr("a.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
						this.filterRep.filterStr("a.periode",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
						//this.filterRep.filterStr("a.cabang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.kode_sales",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
			var data = this.dbLib.runSQL("select a.no_bayar,case when b.nama is null then c.nama else b.nama end as nmsls,a.tanggal,a.keterangan,a.no_file_dok,a.nilai "+
							"from portal_bayar_m a left outer join portal_sales b on a.kode_sales=b.kode_sales left outer join portal_cust c on a.kode_sales=c.kode_cust "+this.filter);
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{
					this.sg1_psn.clear();
					this.sg1_psn.setData(data);										
					this.sg1_psn.setColWidth(new Array(5,4,3,2,1,0),
						new Array(100,100,150,100,100,100));
					this.sg1_psn.columns.get(5).setColumnFormat(cfNilai);
				}
			}
			for (var k=0; k < this.sg1_psn.rows.getLength(); k++)
			{
				if (this.sg1_psn.getCell(4,k) != "-" && this.sg1_psn.getCell(4,k) != "")
				{
					this.sg1_psn.setCell(4,k,"<a href='server/media/"+this.sg1_psn.getCell(4,k)+"' target='_blank'>"+this.sg1_psn.getCell(4,k)+"</a>");
				}
			}
			this.p_psn.show();
		}
    }catch(e)
	{
		alert("[app_portal_trail_fViewBayar]::mainButtonClick:"+e);
	}
};
window.app_portal_trail_fViewBayar.prototype.sg1onChange = function(sender, col , row)
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