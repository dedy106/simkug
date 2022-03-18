window.app_saku_uat_transaksi_fViewUAT = function(owner)
{
	try
	{
		if (owner)
		{
			window.app_saku_uat_transaksi_fViewUAT.prototype.parent.constructor.call(this, owner);
			this.className = "app_saku_uat_transaksi_fViewUAT";			
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Audit Trail Barang", 2);
			
			this.p1 = new portalui_panel(this,{bound:[10,10,720,150],caption:"Filter",border:3});
			uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[10,25,700,150],colCount:4,cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"],
			ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"],
			buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:2});
			this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doAllPageClick", "doPdfClick","doXlsClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);
		}
		uses("util_filterRep;util_gridLib");
		this.filterRep = new util_filterRep();
		this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1],["13","13"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1],[2,2]);
		this.gridLib = new util_gridLib();
		this.standar = new util_standar();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.userStatus=this.app._userStatus;
		this.tanda="=";
		this.lokasi=this.app._lokasi;
		if (this.userStatus==="A")
		{
			this.tanda="All";
			this.lokasi="";
		}
		this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
		this.gridLib.SGEditData(this.sg1,1,[0,1,2],["No. UAT","=",""]);
		
		this.p_uat = new portalui_panel(this,{bound:[10,5,755,220],caption:"Daftar UAT",border:3});
		this.p_uat.hide();
		this.sg1_uat = new portalui_saiGrid(this.p_uat,{bound:[1,20,750,200],colCount:5,
					colWidth:[[4,3,2,1,0],[100,100,250,150,100]],colTitle:["No. UAT","No. Dokumen","Keterangan","Tanggal","NIK Buat"],
					readOnly:[true],dblClick:[this, "sg1onDblClick"],autoAppend:true});
		this.p = new portalui_panel(this,{bound:[10,230,755,220],caption:"Detail Menu"});
		this.p.hide();
		this.sg = new portalui_saiGrid(this.p,{bound:[1,20,750,200],colCount:4,colTitle:["No. Form","Nama Form","Keterangan Error","Status"],
				colWidth:[[3,2,1,0],[75,300,253,80]],defaultRow:1,tag:2,readOnly:[true]});
		
		this.cektampil=true;
	}catch(e)
	{
		alert("[app_saku_uat_transaksi_fViewUAT]::contructor: "+e);
	}
};
window.app_saku_uat_transaksi_fViewUAT.extend(window.portalui_childForm);
window.app_saku_uat_transaksi_fViewUAT.implement({
	doEllipseClick: function(sender, col, row)
	{
		if (row == 0)
		{			
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1,this.sg1.row, this.sg1.col,
											  "select kode_lokasi, nama from lokasi ",
											  "select count(*) from lokasi ",
											  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
		if (row == 1)
		{			
			this.filterRep.ListDataSGFilter(this,"Data UAT",this.sg1,this.sg1.row,this.sg1.col,
											  "select no_uat,no_dokumen,keterangan from uat_m where kode_lokasi like '%"+this.sg1.getCell(2,0)+"' ",
											  "select count(*) from uat_m where kode_lokasi like '%"+this.sg1.getCell(2,0)+"' ",
											  ["no_uat","no_dokumen","keterangan"],"where",["Kode","No. Dokumen","Keterangan"]);
		}
	},
	doSelectCell: function(sender, col, row)
	{
		if (this.userStatus=="A")
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1],["13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1],[2,2]);
		}else
		{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1],["3","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1],[3,2]);
		}
	},
	sg1onDblClick: function(sender, col, row)
	{
		try
		{
			this.sg.clear(1);
			var data = this.dbLib.getDataProvider("select b.kode_form,b.nama,a.keterangan, a.flag_user "+
			"from uat_d a inner join menu b on a.kode_menu=b.kode_menu and a.kode_klp=b.kode_klp where a.no_uat = '"+this.sg1_uat.getCell(0,row)+"' order by a.nu ");
			eval("data = "+data+";");
			if (typeof data === "object"){
				var temp;
				this.sg.clear();
				for (var i in data.rs.rows){
					temp = data.rs.rows[i];
					if (temp !== undefined)
						this.sg.appendData([temp.kode_form,temp.nama,temp.keterangan,temp.flag_user]);
				}
			}
			
		}catch(e)
		{
			system.alert(this,e,data);
		}
	},
	mainButtonClick: function(sender)
	{
		try
		{
			if (sender == this.app._mainForm.bClear2)
			{ 
				if (this.cektampil)
				{
					this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
					this.gridLib.SGEditData(this.sg1,1,[0,1,2],["No. UAT","=",""]);
				}else
				{
					this.p_uat.hide();
					this.p.hide();
					this.p1.show();
				}
				this.cektampil=true;
			}else
			{
				this.cektampil=false;
				this.p1.hide();
				this.filter = this.filterRep.filterStr("kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("no_uat",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and");
				
				this.pageCount = this.dbLib.getRowCount("select count(*) from portal_produk "+this.filter, 20);
				var data = this.dbLib.getDataProvider("select * from uat_m "+this.filter);
				eval("data = "+data+";");
				if (data){
					var line;
					this.sg1_uat.clear();
					//this.standarLib.clearByTag(this,[1],undefined);
					for (var i in data.rs.rows){
						line = data.rs.rows[i];
						var temp=line.tanggal.split(" ");
						var dt=temp[0].split("-");
						this.sg1_uat.appendData([line.no_uat,line.no_dokumen,line.keterangan,dt[2]+"-"+dt[1]+"-"+dt[0],line.nik_buat]);
					}
				}
				this.p_uat.show();
				this.p.show();
			}
	    }catch(e)
		{
			alert("[app_saku_uat_transaksi_fViewUAT]::mainButtonClick:"+e);
		}
	},
	sg1onChange: function(sender, col , row)
	{
	    if (col==1)
		{
			if (this.sg1.getCell(1,row)==="All")
			{
				this.sg1.setCell(2,row,"");
				this.sg1.setCell(3,row,"");
			}
		} 
	}
});