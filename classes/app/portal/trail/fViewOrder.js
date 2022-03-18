window.app_portal_trail_fViewOrder = function(owner)
{
	try
	{
		if (owner)
		{
			window.app_portal_trail_fViewOrder.prototype.parent.constructor.call(this, owner);
			this.className = "app_portal_trail_fViewOrder";			
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Audit Trail Pemesan", 2);
			
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
		this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kota","All",""));
		
		this.p_psn = new portalui_panel(this);
		this.p_psn.setLeft(10);
		this.p_psn.setTop(10);
		this.p_psn.setWidth(1000);
		this.p_psn.setHeight(230);
		this.p_psn.setName('p1');
		this.p_psn.setBorder(3);
		this.p_psn.setCaption('Daftar Order');
		this.p_psn.hide();
		this.sg1_psn = new portalui_saiGrid(this.p_psn);
		this.sg1_psn.setLeft(1);
		this.sg1_psn.setTop(20);
		this.sg1_psn.setWidth(995);
		this.sg1_psn.setHeight(206);
		this.sg1_psn.setName('sg1mb');
		this.sg1_psn.setColCount(9);
		this.sg1_psn.setReadOnly(true);
		this.sg1_psn.setColTitle(new Array("No. Order","Transaksi Dari","Cabang","Kota","Sales","Customer","Nama","Alamat","Status Bayar"));
		this.sg1_psn.setColWidth(new Array(8,7,6,5,4,3,2,1,0),
			new Array(100,200,100,100,100,80,80,100,100));
		this.sg1_psn.onDblClick.set(this,"sg1onDblClick");
		this.p_desk = new portalui_panel(this);
		this.p_desk.setLeft(10);
		this.p_desk.setTop(250);
		this.p_desk.setWidth(550);
		this.p_desk.setHeight(210);
		this.p_desk.setName('p1');
		this.p_desk.setBorder(3);
		this.p_desk.setCaption('Deskripsi');
		this.desk = new portalui_saiGrid(this.p_desk);
		this.desk.setTop(20);
		this.desk.setLeft(1);
		this.desk.setWidth(545);
		this.desk.setHeight(155);
		this.desk.setColCount(6);
		this.desk.setReadOnly(true);
		this.desk.setColTitle(new Array("No. Order","Kode Barang","Bonus","Jumlah","Harga","Sub Total"));
		this.desk.setColWidth(new Array(5,4,3,2,1,0),new Array(100,100,60,60,100,100));
		this.desk.columns.get(4).setColumnFormat(cfNilai);
		this.desk.columns.get(5).setColumnFormat(cfNilai);
		this.total = new portalui_saiLabelEdit(this.p_desk);
		this.total.setLeft(295);
		this.total.setTop(185);
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
		alert("[app_portal_trail_fViewOrder]::contructor: "+e);
	}
};
window.app_portal_trail_fViewOrder.extend(window.portalui_childForm);
window.app_portal_trail_fViewOrder.prototype.doEllipseClick= function(sender, col, row)
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
			this.filterRep.ListDataSGFilter(this, "Data Kota",this.sg1, this.sg1.row, this.sg1.col,
					  "select kode_kota, nama from portal_kota where kode_cab like '%"+this.sg1.getCell(2,2)+"' ",
					  "select count(*) from portal_kota where kode_cab like '%"+this.sg1.getCell(2,2)+"' ",
					  ["kode_kota","nama"],"where",["Kode","Nama"]);
		}
	}catch(e)
	{
		alert("app_portal_trail_fViewOrder::doEllipseClick "+e)
	}
};
window.app_portal_trail_fViewOrder.prototype.doSelectCell = function(sender, col, row)
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
			//this.standar.isiItemsWithPeriodeLok(this.sg1.getCell(2,0),this.sg1.columns.get(2).pickList);
			var rs = this.dbLib.runSQL("select distinct periode from portal_order_m where kode_lokasi = '"+this.sg1.getCell(2,0)+"' ");			
			if (rs instanceof portalui_arrayMap){
				this.sg1.columns.get(2).pickList.clear();
				var ix=0;
				for (var i in rs.objList){								
					this.sg1.columns.get(2).pickList.set(ix, rs.get(i).get("periode"));
					ix++;
				}
			}
		}
	}	
};
window.app_portal_trail_fViewOrder.prototype.sg1onDblClick = function(sender, col, row)
{
	try
	{
		if (sender == this.sg1_psn)
		{
			var data = this.dbLib.runSQL("select no_order,kode_produk,bonus,jumlah,harga, (jumlah*harga) as subtot "+
						"from portal_order_d "+
						"where no_order='"+this.sg1_psn.getCell(0,row)+"'");
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{
					this.p_desk.show();
					this.desk.clear();
					this.desk.setData(data);
					this.desk.setColWidth(new Array(5,4,3,2,1,0),new Array(100,100,60,60,100,100));
					this.desk.columns.get(4).setColumnFormat(cfNilai);
					this.desk.columns.get(5).setColumnFormat(cfNilai);
				}
			}
			var tot=0;
			for (var k=0; k < this.desk.rows.getLength(); k++)
			{
				tot+=parseFloat(strToFloat(this.desk.getCell(5,k)));
			}
			this.total.setText(floatToNilai(tot));
		}
	}catch(e)
	{
		system.alert(this, e,"");
	}
};
window.app_portal_trail_fViewOrder.prototype.mainButtonClick = function(sender)
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
				this.gridLib.SGEditData(this.sg1,3,new Array(0,1,2), new Array("Kota","All",""));
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
						this.filterRep.filterStr("a.cabang",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
						this.filterRep.filterStr("a.kota",this.sg1.getCell(1,3),this.sg1.getCell(2,3),this.sg1.getCell(3,3),"and");
			var data = this.dbLib.runSQL("select a.no_order,a.status,b.nama as nmcbg,c.nama as nmkota,d.nama as nmsls, "+
				"e.nama as nmcust,a.nama,a.alamat,a.status_bayar "+
				"from portal_order_m a left outer join portal_cabang b on a.cabang=b.kode_cab "+
				"left outer join portal_kota c on a.kota=c.kode_kota "+
				"left outer join portal_sales d on a.sales=d.kode_sales "+
				"left outer join portal_cust e on a.kode_cust=e.kode_cust "+this.filter);
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{
					this.sg1_psn.clear();
					this.sg1_psn.setData(data);
					this.sg1_psn.setColWidth(new Array(8,7,6,5,4,3,2,1,0),
								new Array(100,200,100,100,100,80,80,100,100));
				}
			}
			for (var k=0; k < this.sg1_psn.rows.getLength(); k++)
			{
				if (this.sg1_psn.getCell(1,k)=="F")
					this.sg1_psn.setCell(1,k,"Front End");
				else if (this.sg1_psn.getCell(1,k)=="B")
					this.sg1_psn.setCell(1,k,"Back End");
				else if (this.sg1_psn.getCell(1,k)=="S")
					this.sg1_psn.setCell(1,k,"Sales Menu");
				if (this.sg1_psn.getCell(2,k)=="undefined")
					this.sg1_psn.setCell(2,k,"-");
				if (this.sg1_psn.getCell(3,k)=="undefined")
					this.sg1_psn.setCell(3,k,"-");
				if (this.sg1_psn.getCell(4,k)=="undefined")
					this.sg1_psn.setCell(4,k,"-");
				if (this.sg1_psn.getCell(5,k)=="undefined")
					this.sg1_psn.setCell(5,k,"-");
				if (this.sg1_psn.getCell(6,k)=="undefined")
					this.sg1_psn.setCell(6,k,"-");
				if (this.sg1_psn.getCell(7,k)=="undefined")
					this.sg1_psn.setCell(7,k,"-");
				if (this.sg1_psn.getCell(8,k)==0)
					this.sg1_psn.setCell(8,k,"Belum Lunas");
				else this.sg1_psn.setCell(8,k,"Lunas");
			}
			this.p_psn.show();
		}
    }catch(e)
	{
		alert("[app_portal_trail_fViewOrder]::mainButtonClick:"+e);
	}
};
window.app_portal_trail_fViewOrder.prototype.sg1onChange = function(sender, col , row)
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