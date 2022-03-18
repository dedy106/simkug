window.app_assetsap_report_flTransfer = function(owner)
{
	if (owner)
	{
		window.app_assetsap_report_flTransfer.prototype.parent.constructor.call(this,owner);
		this.className = "app_assetsap_report_flTransfer";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Daftar Upload Aset", 2);
		uses("saiGrid;reportViewer;server_report_report;util_dbLarge");
		uses("util_filterRep;util_gridLib");
		this.p1 = new panel(this,{bound:[10,10,702,180],border:3, caption:"Filter"});
		this.sg1 = new saiGrid(this.p1,{bound:[1,20,700,157],colCount:4,cellExit:[this,"doCellExit"],
				selectCell:[this,"doSelectCell"],ellipsClick:[this,"doEllipseClick"],change:[this,"sg1onChange"],
				colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], 
				buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:8});
		this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1, 0,[0,1],["13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1, 1,[0,1],[2,2]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.dbLarge = new util_dbLarge();
	this.userStatus=this.app._userStatus;
	this.tanda="=";	
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["APC/Gl Acc","All",""]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Asset Class","All",""]);
	this.gridLib.SGEditData(this.sg1,2,[0,1,2],["BA","All",""]);
	this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Report","=","Rekap"]);
	this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Inventarisasi","=","Fisik"]);
	this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Group per","=","Asset Class"]);
	this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Plant","All",""]);
	this.gridLib.SGEditData(this.sg1,7,[0,1,2],["Periode","=","201006"]);
	
	this.pager = parseInt(this.app._mainForm.reportNavigator.cb.getText());
};
window.app_assetsap_report_flTransfer.extend(window.childForm);
window.app_assetsap_report_flTransfer.implement({
	doEllipseClick: function(sender, col, row){
		try{			
			if (row === 0)
			{
				this.filterRep.ListDataSGFilter(this, "Data APC/ Gl Acc",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_klpakun, nama from amu_klpakun where kode_lokasi = '"+this.app._lokasi+"' ",											
											  "select count(*) from amu_klpakun  where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_klpakun","nama"],"and",["APC/GL Acc","Desc"]);
			}				
			if (row === 1)
			{
				this.filterRep.ListDataSGFilter(this, "Data Asset Class",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_klpfa, nama from amu_klp where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(*) from amu_klp  where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_klpfa","nama"],"and",["Class","Asset Class"]);
			}		
			if (row === 6)
			{
				this.filterRep.ListDataSGFilter(this, "Data Plant",this.sg1, this.sg1.row, this.sg1.col,
											  "select distinct a.kode_lokfa, a.nama from amu_lokasi a "+
												" inner join amu_asset b on b.ref1 = a.kode_lokfa where a.kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(*) from (select distinct a.kode_lokfa, a.nama from amu_lokasi a "+
												" inner join amu_asset b on b.ref1 = a.kode_lokfa where a.kode_lokasi = '"+this.app._lokasi+"') a ",
											  ["a.kode_lokfa","a.nama"],"and",["Plant","Plant Desc"]);
			}		
			if (row === 2)
			{
				this.filterRep.ListDataSGFilter(this, "Data Lokasi Aset/ BA",this.sg1, this.sg1.row, this.sg1.col,
											  "select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ",
											  "select count(*) from amu_lokasi  where kode_lokasi = '"+this.app._lokasi+"' ",
											  ["kode_lokfa","nama"],"and",["BA","Desc"]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectCell: function(sender, col, row){		
		this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1,2,3,4,5,6,7],["123","123","123","3","13","3","123","3"]);
		this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1,2,3,4,5,6,7],[2,2,2,0,0,0,2,0]);			
		if (row == 3) {
			this.sg1.columns.get(2).setPicklist(new portalui_arrayMap({items:["Rekap","Detail"]}));			
		}
		if (row == 4) {
			this.sg1.columns.get(2).setPicklist(new portalui_arrayMap({items:["FISIK","ALTERNATIF"]}));			
		}
		if (row == 5) {
			this.sg1.columns.get(2).setPicklist(new portalui_arrayMap({items:["Asset Class","Class per APC","BA","BA Class Asset","Divisi","Divisi s/d Area","Divisi Class Asset","Prosedur/Divisi","Divisi/Prosedur","Lokasi VEAT"]}));			
		}
		if (row == 7){
			this.sg1.columns.get(2).pickList.clear();
			this.dbLib.setItemsFromSQL("select distinct periode from periode where kode_lokasi='"+this.app._lokasi+"' order by periode desc",[this.sg1.columns.get(2).pickList,this.sg1.columns.get(3).pickList]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender === this.app._mainForm.bClear2){				
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["APC/Gl Acc","All",""]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Asset Class","All",""]);
				this.gridLib.SGEditData(this.sg1,2,[0,1,2],["BA","All",""]);
				this.gridLib.SGEditData(this.sg1,3,[0,1,2],["Jenis Report","=","Rekap"]);
				this.gridLib.SGEditData(this.sg1,4,[0,1,2],["Jenis Inventarisasi","=","Fisik"]);
				this.gridLib.SGEditData(this.sg1,5,[0,1,2],["Group per","=","Asset Class"]);
				this.gridLib.SGEditData(this.sg1,6,[0,1,2],["Plant","All"," "]);
				this.gridLib.SGEditData(this.sg1,7,[0,1,2],["Periode","=","201006"]);
			}else{
				this.app._mainForm.reportNavigator.serverDownload = true;
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
								
		    	this.filter = this.filterRep.filterStr("b.kode_klpakun",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where")+
							this.filterRep.filterStr("b.kode_klpfa",this.sg1.getCell(1,1),this.sg1.getCell(2,1),this.sg1.getCell(3,1),"and")+
							this.filterRep.filterStr("b.kode_lokfa",this.sg1.getCell(1,2),this.sg1.getCell(2,2),this.sg1.getCell(3,2),"and")+
							this.filterRep.filterStr("b.ref1",this.sg1.getCell(1,6),this.sg1.getCell(2,6),this.sg1.getCell(3,6),"and")+
							this.filterRep.filterStr("b.periode",this.sg1.getCell(1,7),this.sg1.getCell(2,7),this.sg1.getCell(3,7),"and");
				this.showFilter = this.filterRep.showFilter(this.sg1);						
				var status = (this.sg1.cells(2,4).toLowerCase() == "fisik" ? " and c.jenis_proc = 'FISIK' ": this.sg1.cells(2,4).toLowerCase() == "alternatif" ? " and c.jenis_proc = 'ALTERNATIF' ": " ");
				var result  = new arrayMap();				
				if (this.sg1.cells(2,3) == "Rekap"){
					switch (this.sg1.cells(2,5).toLowerCase()){
						case "asset class":
							var sql = "select b.kode_klpfa,d.nama, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+
								" inner join amu_klp d on d.kode_klpfa = b.kode_klpfa "+
								" "+(status == " "?"left outer":"inner")+" join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.kode_klpfa = b.kode_klpfa and c.periode = b.periode   "+status+" "+								
									this.filter +" group by b.kode_klpfa, d.nama order by b.kode_klpfa" ;						
							error_log(sql);
							this.title = new server_util_arrayList({items:["Class","Nama","Count of Asset","Acquis. val","Accum.dep.","Book.val"]});
							this.widthTable = new server_util_arrayList({items:[80,150,150,100,100,120]});
							this.fieldType = new server_util_arrayList({items:["S","S","N","N","N","N"]});												
							this.summary = new server_util_arrayList({items:["S","S","Y","Y","Y","Y"]});	
							this.groupBy = undefined;					
							this.groupHeader = undefined;
						break;
						case "class per apc":
							var sql = "select b.kode_klpakun,b.kode_klpfa,d.nama, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
								" inner join amu_klp d on d.kode_klpfa = b.kode_klpfa "+
									this.filter +" group by b.kode_klpakun,b.kode_klpfa, d.nama order by b.kode_klpfa" ;							
						
							this.title = new server_util_arrayList({items:["APC","Class","Nama","Count of Asset","Acquis. val","Accum.dep.","Book.val"]});
							this.widthTable = new server_util_arrayList({items:[80,80,150,150,100,100,120]});
							this.fieldType = new server_util_arrayList({items:["S","S","S","N","N","N","N"]});												
							this.summary = new server_util_arrayList({items:["S","S","S","Y","Y","Y","Y"]});	
							this.groupBy = undefined;					
							this.groupHeader = undefined;
						break;
						case "ba":
							var sql = "select b.kode_lokfa, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by b.kode_lokfa order by b.kode_lokfa" ;							
							this.title = new server_util_arrayList({items:["BA","Count of Asset","Acquis. val","Accum.dep.","Book.val"]});
							this.widthTable = new server_util_arrayList({items:[80,150,100,100,120]});
							this.fieldType = new server_util_arrayList({items:["S","N","N","N","N"]});												
							this.summary = new server_util_arrayList({items:["S","Y","Y","Y","Y"]});	
							this.groupBy = undefined;					
							this.groupHeader = undefined;
						break;
						case "ba class asset":
							var sql = "select b.kode_lokfa,d.nama, b.kode_klpfa, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa "+
									this.filter +" group by b.kode_lokfa, d.nama, b.kode_klpfa order by b.kode_lokfa" ;
							this.title = new server_util_arrayList({items:["BA","Nama BA","Class","Count of Asset","Acquis. val","Accum.dep.","Book.val"]});
							this.widthTable = new server_util_arrayList({items:[80,150,80,150,100,100,120]});
							this.fieldType = new server_util_arrayList({items:["S","S","S","N","N","N","N"]});												
							this.summary = new server_util_arrayList({items:["S","S","S","Y","Y","Y","Y"]});	
							this.groupBy = new server_util_arrayList({items:["kode_lokfa","nama"]});
							this.groupHeader = new server_util_arrayList({items:["kode_lokfa"]});
						break;
						case "divisi":
							status = (this.sg1.cells(2,4).toLowerCase() == "fisik" ? " and c.jenis_proc = 'FISIK' ": this.sg1.cells(2,4).toLowerCase() == "alternatif" ? " and c.jenis_proc = 'ALTERNATIF' ": " ");							
							
							var sql = "select ubis, nama, sum(totalaset), sum(nilai)as nilai, sum(nilaiap) as nilaiap, sum(nilai_buku) as nilaibuku from (select f.kode_lokfa as ubis,count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa "+
								" inner join amu_lokasi e on e.kode_lokfa = d.kode_induk "+
								" inner join amu_lokasi f on f.kode_lokfa = e.kode_induk "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by f.kode_lokfa "+
								" union all "+ 
								"select e.kode_lokfa, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa "+
								" inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by e.kode_lokfa  "+
								" union all "+
								"select b.kode_lokfa, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa and d.kode_induk = '00'  "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by b.kode_lokfa ) a inner join amu_lokasi b on b.kode_lokfa = a.ubis group by ubis,nama order by ubis ";
													
							this.title = new server_util_arrayList({items:["Divisi","Nama","Count of Asset","Acquis. val","Accum.dep.","Book.val"]});
							this.widthTable = new server_util_arrayList({items:[80,150,150,100,100,120]});
							this.fieldType = new server_util_arrayList({items:["S","S","N","N","N","N"]});												
							this.summary = new server_util_arrayList({items:["S","S","Y","Y","Y","Y"]});	
							this.groupBy = undefined;					
							this.groupHeader = undefined;
						break;
						case "divisi class asset":
							status = (this.sg1.cells(2,4).toLowerCase() == "fisik" ? " and c.jenis_proc = 'FISIK' ": this.sg1.cells(2,4).toLowerCase() == "alternatif" ? " and c.jenis_proc = 'ALTERNATIF' ": " ");
						
							var sql = "select ubis, nama, kode_klpfa,sum(totalaset), sum(nilai)as nilai, sum(nilaiap) as nilaiap, sum(nilai_buku) as nilaibuku from "+
								"(select f.kode_lokfa as ubis,b.kode_klpfa,count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa "+
								" inner join amu_lokasi e on e.kode_lokfa = d.kode_induk "+
								" inner join amu_lokasi f on f.kode_lokfa = e.kode_induk "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by f.kode_lokfa, b.kode_klpfa "+
								" union all "+ 
								"select e.kode_lokfa, b.kode_klpfa, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa "+
								" inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by e.kode_lokfa, b.kode_klpfa  "+
								" union all "+
								"select b.kode_lokfa, b.kode_klpfa, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa and d.kode_induk = '00'  "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by b.kode_lokfa, b.kode_klpfa ) a inner join amu_lokasi b on b.kode_lokfa = a.ubis group by ubis,nama, kode_klpfa order by ubis ";
						
							this.title = new server_util_arrayList({items:["Divisi","Nama","Class","Count of Asset","Acquis. val","Accum.dep.","Book.val"]});
							this.widthTable = new server_util_arrayList({items:[80,150,,150,100,100,120]});
							this.fieldType = new server_util_arrayList({items:["S","S","S","N","N","N","N"]});												
							this.summary = new server_util_arrayList({items:["S","S","S","Y","Y","Y","Y"]});	
							this.groupBy = new server_util_arrayList({items:["ubis","nama"]});
							this.groupHeader = new server_util_arrayList({items:["ubis"]});
						break;
						case "divisi/prosedur":
							status = (this.sg1.cells(2,4).toLowerCase() == "fisik" ? " and c.jenis_proc = 'FISIK' ": this.sg1.cells(2,4).toLowerCase() == "alternatif" ? " and c.jenis_proc = 'ALTERNATIF' ": " ");							
							var sql = "select ubis, nama, jenis_proc,sum(totalaset), sum(nilai)as nilai, sum(nilaiap) as nilaiap, sum(nilai_buku) as nilaibuku from "+
								"(select f.kode_lokfa as ubis,k.jenis_proc,count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa "+
								" inner join amu_lokasi e on e.kode_lokfa = d.kode_induk "+
								" inner join amu_lokasi f on f.kode_lokfa = e.kode_induk "+
								" inner join amu_klp_alt k on k.kode_klpfa = b.kode_klpfa and k.periode = b.periode "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by f.kode_lokfa, k.jenis_proc "+
								" union all "+ 
								"select e.kode_lokfa, k.jenis_proc, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa "+
								" inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' "+
								" inner join amu_klp_alt k on k.kode_klpfa = b.kode_klpfa and k.periode = b.periode "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by e.kode_lokfa, k.jenis_proc  "+
								" union all "+
								"select b.kode_lokfa, k.jenis_proc, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa and d.kode_induk = '00'  "+
								" inner join amu_klp_alt k on k.kode_klpfa = b.kode_klpfa and k.periode = b.periode "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by b.kode_lokfa, k.jenis_proc ) a inner join amu_lokasi b on b.kode_lokfa = a.ubis group by ubis,nama, jenis_proc order by ubis ";
						
							this.title = new server_util_arrayList({items:["Divisi","Nama","Prosedur","Count of Asset","Acquis. val","Accum.dep.","Book.val"]});
							this.widthTable = new server_util_arrayList({items:[80,150,,150,100,100,120]});
							this.fieldType = new server_util_arrayList({items:["S","S","S","N","N","N","N"]});												
							this.summary = new server_util_arrayList({items:["S","S","S","Y","Y","Y","Y"]});	
							this.groupBy = new server_util_arrayList({items:["ubis","nama"]});
							this.groupHeader = new server_util_arrayList({items:["ubis"]});
						break;
						case "prosedur/divisi":
							status = (this.sg1.cells(2,4).toLowerCase() == "fisik" ? " and c.jenis_proc = 'FISIK' ": this.sg1.cells(2,4).toLowerCase() == "alternatif" ? " and c.jenis_proc = 'ALTERNATIF' ": " ");							
							var sql = "select jenis_proc,ubis, nama, sum(totalaset), sum(nilai)as nilai, sum(nilaiap) as nilaiap, sum(nilai_buku) as nilaibuku from "+
								"(select f.kode_lokfa as ubis,k.jenis_proc,count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa "+
								" inner join amu_lokasi e on e.kode_lokfa = d.kode_induk "+
								" inner join amu_lokasi f on f.kode_lokfa = e.kode_induk "+
								" inner join amu_klp_alt k on k.kode_klpfa = b.kode_klpfa and k.periode = b.periode "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by k.jenis_proc,f.kode_lokfa "+
								" union all "+ 
								"select e.kode_lokfa, k.jenis_proc, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa "+
								" inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' "+
								" inner join amu_klp_alt k on k.kode_klpfa = b.kode_klpfa and k.periode = b.periode "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by k.jenis_proc,e.kode_lokfa  "+
								" union all "+
								"select b.kode_lokfa, k.jenis_proc, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa and d.kode_induk = '00'  "+
								" inner join amu_klp_alt k on k.kode_klpfa = b.kode_klpfa and k.periode = b.periode "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by k.jenis_proc,b.kode_lokfa  ) a inner join amu_lokasi b on b.kode_lokfa = a.ubis group by jenis_proc,ubis,nama order by jenis_proc,ubis ";
						
							this.title = new server_util_arrayList({items:["Prosedur","Divisi","Nama","Count of Asset","Acquis. val","Accum.dep.","Book.val"]});
							this.widthTable = new server_util_arrayList({items:[80,150,,150,100,100,120]});
							this.fieldType = new server_util_arrayList({items:["S","S","S","N","N","N","N"]});												
							this.summary = new server_util_arrayList({items:["S","S","S","Y","Y","Y","Y"]});	
							this.groupBy = new server_util_arrayList({items:["jenis_proc"]});
							this.groupHeader = new server_util_arrayList({items:["jenis_proc"]});
						break;
						case "lokasi veat":
							status = (this.sg1.cells(2,4).toLowerCase() == "fisik" ? " and c.jenis_proc = 'FISIK' ": this.sg1.cells(2,4).toLowerCase() == "alternatif" ? " and c.kode_lokfa = b.kode_lokfa and c.jenis_proc = 'ALTERNATIF' ": " ");							
							var sql = "select ubis, nama, jenis_proc,sum(totalaset), sum(nilai)as nilai, sum(nilaiap) as nilaiap, sum(nilai_buku) as nilaibuku from "+
								"(select f.kode_lokfa as ubis,k.jenis_proc,count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa "+
								" inner join amu_lokasi e on e.kode_lokfa = d.kode_induk "+
								" inner join amu_lokasi f on f.kode_lokfa = e.kode_induk "+
								" inner join amu_klp_alt k on k.kode_klpfa = b.kode_klpfa and k.periode = b.periode "+
								" inner join amu_bagiklp_d c on c.peride = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by f.kode_lokfa, k.jenis_proc "+
								" union all "+ 
								"select e.kode_lokfa, k.jenis_proc, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa "+
								" inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' "+
								" inner join amu_klp_alt k on k.kode_klpfa = b.kode_klpfa and k.periode = b.periode "+
								" inner join amu_bagiklp_d c on c.peride = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by e.kode_lokfa, k.jenis_proc  "+
								" union all "+
								"select b.kode_lokfa, k.jenis_proc, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa and d.kode_induk = '00'  "+
								" inner join amu_klp_alt k on k.kode_klpfa = b.kode_klpfa and k.periode = b.periode "+
								" inner join amu_bagiklp_d c on c.peride = b.periode and  c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by b.kode_lokfa, k.jenis_proc ) a inner join amu_lokasi b on b.kode_lokfa = a.ubis group by ubis,nama, jenis_proc order by ubis ";
						
							this.title = new server_util_arrayList({items:["Divisi","Nama","Prosedur","Count of Asset","Acquis. val","Accum.dep.","Book.val"]});
							this.widthTable = new server_util_arrayList({items:[80,150,,150,100,100,120]});
							this.fieldType = new server_util_arrayList({items:["S","S","S","N","N","N","N"]});												
							this.summary = new server_util_arrayList({items:["S","S","S","Y","Y","Y","Y"]});	
							this.groupBy = new server_util_arrayList({items:["ubis","nama"]});
							this.groupHeader = new server_util_arrayList({items:["ubis"]});
						break;
						case "divisi s/d area":
							status = (this.sg1.cells(2,4).toLowerCase() == "fisik" ? " and c.jenis_proc = 'FISIK' ": this.sg1.cells(2,4).toLowerCase() == "alternatif" ? "  and c.jenis_proc = 'ALTERNATIF' ": " ");							
							var sql = "select * from (select f.kode_lokfa as ubis, e.kode_lokfa as sbis, b.kode_lokfa, b.kode_klpfa, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa "+
								" inner join amu_lokasi e on e.kode_lokfa = d.kode_induk "+
								" inner join amu_lokasi f on f.kode_lokfa = e.kode_induk "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by f.kode_lokfa, e.kode_lokfa, b.kode_lokfa, b.kode_klpfa "+
								" union "+ 
								"select e.kode_lokfa, b.kode_lokfa,'-', b.kode_klpfa, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa "+
								" inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by e.kode_lokfa, b.kode_lokfa, b.kode_klpfa "+
								" union "+
								"select b.kode_lokfa,'-','-', b.kode_klpfa, count(b.no_gabung) as totalaset, sum(b.nilai) as nilai, sum(b.nilai_ap) as nilaiap, sum(b.nilai_buku) as nilai_buku "+
								" from amu_asset b "+								
								" inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa and d.kode_induk = '00'  "+
								" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
									this.filter +" group by b.kode_lokfa, b.kode_klpfa) a order by ubis, sbis, kode_lokfa ";
						
							this.title = new server_util_arrayList({items:["Divisi","Regional","AREA","Class","Count of Asset","Acquis. val","Accum.dep.","Book.val"]});
							this.widthTable = new server_util_arrayList({items:[80,80,80,80,150,100,100,120]});
							this.fieldType = new server_util_arrayList({items:["S","S","S","S","N","N","N","N"]});												
							this.summary = new server_util_arrayList({items:["S","S","S","S","Y","Y","Y","Y"]});	
							this.groupBy = undefined;					
							this.groupHeader = undefined;
						break;
						
					}
					
					var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
				}else{
					
					var sql = "select b.no_fa, b.no_sn, b.nama, b.nama2, b.kode_klpakun, b.kode_klpfa, b.kode_lokfa, b.ref1, b.ref2, date_format(b.tgl_perolehan,'%d-%m-%Y') as tgl, b.nilai, b.nilai_ap, b.nilai_buku "+
						" from amu_asset b "+
						" inner join inventupl c on c.klpfa = b.kode_klpfa "+
						" inner join (select distinct periode, kode_klpfa, jenis_proc from amu_bagiklp_d ) c on c.periode = b.periode and c.kode_klpfa = b.kode_klpfa   "+status+" "+
							this.filter +" order by b.no_fa, b.no_sn" ;
					
					this.title = new server_util_arrayList({items:["NKA","SNo.","Asset Description","Description","APC","Group","BA","Plant","Lokasi","Cap. Date","Acquis.Val","Accum.Val","Book.Val"]});
					this.widthTable = new server_util_arrayList({items:[80,50,220,220,80,80,80,80,80,80,100,100,100]});
					this.fieldType = new server_util_arrayList({items:["S","S","S","S","S","S","S","S","S","S","N","N","N"]});												
					this.groupBy = undefined;
					this.summary = new server_util_arrayList({items:["N","N","N","N","N","N","N","N","N","N","Y","Y","Y"]});	
					this.groupHeader = undefined;
					//var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);					
					this.scriptSqlCount = "select count(*) as tot from ("+ sql +") a ";
					this.finish = this.pager;
					this.sqlScript = sql;
					this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
					this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
					this.app._mainForm.reportNavigator.rearrange();
					var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Data Hasil Upload Aset<br>untuk  "+(this.sg1.getCell(2,4).toLowerCase() == "fisik" ? "Inventarisasi Fisik":"Prosedur Alternatif")+"<br />";
					var d = new Date();
					html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
					html += "</div>";
					var dthtml = this.dbLarge.sqlToHtmlWithHeaderR(this.sqlScript,1,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader, undefined,html,"",undefined);						
					previewReport(dthtml,"server/simpleServer.php",this.viewer.getFullId()+"_iframe");
					return;
				}
				this.scriptSqlCount = "select count(*) as tot from ("+ sql +") a ";
				this.finish = this.pager;
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_assetsap_report_flTransfer]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{			
			switch (methodName)
			{
				case "preview" : 
					this.viewer.preview(result);
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
		this.finish = this.pager;
		//var dthtml = this.dbLib.sqlToHtml(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
		//this.previewReport(dthtml);			
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Data Rekap upload Aset<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		var dthtml = this.dbLarge.sqlToHtmlWithHeaderR(this.sqlScript,page,this.pager, this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader, undefined,html,"",undefined);						
		previewReport(dthtml,"server/simpleServer.php",this.viewer.getFullId()+"_iframe");
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Data Rekap upload Aset<br>untuk : "+(this.sg1.getCell(2,4).toLowerCase() == "fisik" ? "Inventarisasi Fisik":"Prosedur Alternatif")+"<br />";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
	},
	doCloseReportClick: function(sender){
		try{
	  switch(sender.getName())
	  {
	    case "allBtn" :		  
			//var dthtml = this.dbLib.sqlToHtml(sql,1,this.pager, this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
			this.finish  = this.pager * this.viewer.getTotalPage();
			if (this.sg1.cells(2,3) == "Rekap"){
				var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true, this.groupBy, this.summary, this.groupHeader);
				this.previewReport(dthtml);			
			}else {
				var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Data upload Aset<br>Untuk : "+(this.sg1.getCell(2,4).toLowerCase() == "fisik" ? "Inventarisasi Fisik":"Prosedur Alternatif")+"<br />";
				var d = new Date();
				html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
				html += "</div>";
				var dthtml = this.dbLarge.sqlToHtmlWithHeaderR(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader, undefined,html,"",undefined);						
				previewReport(dthtml,"server/simpleServer.php",this.viewer.getFullId()+"_iframe");
			}
			break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_angsKol");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :				
			var file = this.dbLib.sqlToXls2(this.sqlScript,this.title, "DataRekapAset.xls");
			downloadFile(file);
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
			var dthtml = this.dbLib.sqlToHtml(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true);
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
	      	this.app._mainForm.reportNavigator.serverDownload = false;
	      break;
	  }
	  }catch(e){
		alert(e);
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
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});
