window.app_hrmis_sdm_report_flSdmDmgrfi = function(owner)
{
	if (owner)
	{
		window.app_hrmis_sdm_report_flSdmDmgrfi.prototype.parent.constructor.call(this,owner);
		this.className = "app_hrmis_sdm_report_flSdmDmgrfi";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Demografi", 2);
		uses("portalui_saiGrid;portalui_reportViewer;server_report_report");
		uses("util_filterRep;util_gridLib");
		this.p1 = new portalui_panel(this,{bound:[10,10,702,150],border:3, caption:"Filter"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,700,127],colCount:4, cellExit:[this,"doCellExit"], selectCell:[this,"doSelectCell"], ellipsClick:[this,"doEllipseClick"], change:[this,"sg1onChange"], colWidth:[[0,2,3],[250,150,150]],colTitle:["Filter","Type","Form","To"], buttonStyle:[[1],[bsAuto]],columnReadOnly:[true,[0],[]],rowCount:2});
		this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
	this.filterRep = new util_filterRep();
	this.filterRep.setSGFilterRowTipe(this.sg1,0,[0,1],["13","13"]);
	this.filterRep.setSGFilterRowButtonStyle(this.sg1,1,[0,1],[2,0]);
	this.gridLib = new util_gridLib();
	this.standar = new util_standar();
	this.dbLib = new util_dbLib();
	this.dbLib.addListener(this);
	this.userStatus=this.app._userStatus;
	this.tanda="=";
	this.lokasi=this.app._lokasi;
	this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
	this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Jenis Laporan","=","Pribadi"]);
	this.pager = 1;
};
window.app_hrmis_sdm_report_flSdmDmgrfi.extend(window.portalui_childForm);
window.app_hrmis_sdm_report_flSdmDmgrfi.implement({
	doEllipseClick: function(sender, col, row){
		if (row == 0)
		{
			this.filterRep.ListDataSGFilter(this, "Data Lokasi",this.sg1, this.sg1.row, this.sg1.col,
										  "select kode_lokasi, nama from hr_lokasi ",
										  "select count(*) from lokasi ",
										  ["kode_lokasi","nama"],"where",["Kode","Nama"]);
		}
	},
	doSelectCell: function(sender, col, row){
		if (this.userStatus==="A"){
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1],["13","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1],[2,0]);
		}else{
			this.filterRep.setSGFilterRowTipe(this.sg1, row,[0,1],["3","13"]);
			this.filterRep.setSGFilterRowButtonStyle(this.sg1, row,[0,1],[3,0]);
		}
		if (row === 1){
			this.sg1.columns.get(2).pickList.clear();
			this.gridLib.SGIsiItemsFromArray(this.sg1.columns.get(2).pickList,["Pribadi","Riwayat","Lokasi"]);
		}
	},
	mainButtonClick: function(sender){
		try
		{
			if (sender == this.app._mainForm.bClear2){ 
				this.gridLib.SGEditData(this.sg1,0,[0,1,2],["Kode Lokasi",this.tanda,this.lokasi]);
				this.gridLib.SGEditData(this.sg1,1,[0,1,2],["Jenis Laporan","=","Pribadi"]);
			}else
			{
				this.p1.setVisible(false);
		    	this.viewer.prepare();
		    	this.viewer.setVisible(true);
		    	this.app._mainForm.pButton.setVisible(false);
		    	this.app._mainForm.reportNavigator.setVisible(true);
				
		    	this.filter = this.filterRep.filterStr("b.kode_lokasi",this.sg1.getCell(1,0),this.sg1.getCell(2,0),this.sg1.getCell(3,0),"where");
				this.showFilter = this.filterRep.showFilter(this.sg1);
				this.jenisLap = this.sg1.getCell(2,1);
				var result  = new portalui_arrayMap();
				var sql = this.getSQL(this.jenisLap,this.filter,0);
				this.scriptSqlCount = this.getSQL(this.jenisLap,this.filter,1);
				
				this.title = new server_util_arrayList({items:["colom1","Laki-Laki","Perempuan","Jumlah Pegawai"]});
				if (this.jenisLap === "Pribadi")
					this.widthTable = new server_util_arrayList({items:[120,100,100,100]});
				else this.widthTable = new server_util_arrayList({items:[220,100,100,100]});
				this.fieldType = new server_util_arrayList({items:["S","N"]});
				var sqlArr = new server_util_arrayList({items:[sql]});				
				var result = this.dbLib.getMultiDataProvider(sqlArr,true);
				var dthtml = this.convertResultToHTML(result);
				
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_hrmis_sdm_report_flSdmDmgrfi]::mainButtonClick:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		switch (methodName)
		{
			case "preview" : 
				this.viewer.preview(result);			
			break;
		}
	},
	doSelectedPage: function(sender, page){
		var data = this.dbLib.getDataProviderPage(this.sqlScript,page,this.pager,true);			
		var dthtml = this.convertResultToHTML(undefined, data);
		this.previewReport(dthtml);			
		this.page=page;
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Analisa Demografi<br>";
		var d = new Date();
		html += "<br><span style='{font-size:9;}'>Dicetak "+ d.toLocaleString()+"</span>";
		html += "</div>";
		html += "<center>"+dthtml+"</center>";
		this.viewer.preview(html);
		this.allHtml = html;
	},
	doCloseReportClick: function(sender){
	  switch(sender.getName())
	  {
	    case "allBtn" :
			var data = this.dbLib.getDataProviderPage(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),true);
			var dthtml = this.convertResultToHTML(undefined, data);
		  this.previewReport(dthtml);
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_manPower");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
	      var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_manPower");				
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
			var data = this.dbLib.getDataProviderPage(this.sqlScript,1,this.pager * this.viewer.getTotalPage(),true);
			var dthtml = this.convertResultToHTML(undefined, data);
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
	doRowPerPageChange: function(sender, rowperpage){
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));	    	
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	},
	convertResultToHTML: function(result,data){
		result = result.result;
		if (data === undefined)
			table = result[0];			
		else table = data;
		var first = true;
		var no_bill = "";
		var retHtml = "";
		var html = "";
		var table, line, urut,tot;
		for (var r in table.rs.rows){
			line = table.rs.rows[r];
			if (no_bill != line.nmcol1){
				first = true;
				no_bill = line.nmcol1;
				if (html !== ""){
					html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='4'>Total </td>"+
						"<td class='isi_laporan'>"+floatToNilai(tot)+"</td></tr>";
					html += "</table>";
					retHtml += "<table border='0' cellspacing='0' cellpadding='0' >"+
						//"<tr><td>"+htmlHeader+"</td></tr>"+
						"<tr><td>"+html+"</td></tr></table></br></br>";				
				}
			}
			if (first){
				urut=0;
				tot=0;
				html = "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>"+
					"<tr bgcolor='#cccccc'>"+
							"<td class='header_laporan' align='center' width=25>No</td>";
				var col=1;
				for (var i in this.title.objList){
					if (col === 1)
						html += "<td class='header_laporan' align='center' width="+this.widthTable.get(i)+">"+this.frontUpperCase(line.nmcol1)+"</td>";
					else
						html += "<td class='header_laporan' align='center' width="+this.widthTable.get(i)+">"+this.title.get(i)+"</td>";
					col++;
				}
				html += "</tr>";
			}
			urut+=1;
			html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut+".</td>";
			for (var c in line){
				if (c === "col1" || c === "male" || c === "female" || c === "col2"){
					if (c === "male" || c === "female" || c === "col2")
						html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
					else html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
				}
			}
			tot+= parseInt(line.col2);
			html += "</tr>";
			first = false;
		}
		html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='4'>Total </td>"+
				"<td class='isi_laporan'>"+floatToNilai(tot)+"</td></tr>";
		if (html !== ""){
			retHtml += "<table border='0' cellspacing='0' cellpadding='0'>"+
				"<tr><td>"+html+"</td></tr></table>";				
		}
		return retHtml;
	},
	getSQL: function(jnsLap,filter,tipe){
		var sql;
		if (jnsLap === "Pribadi"){
			if (tipe === 0){
				sql="select a.nmcol1,a.col1,a.male,a.female,a.col2 from ( "+
				"	(select 'Umur' as nmcol1,'20-35' as col1 "+
                "      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
                "      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
                "      , count(sex) as col2 "+
                "    from karyawan a "+
                "        where cast(datediff (year,a.tgl_lahir,getdate()) as decimal)>19 "+
                "        and cast(datediff (year,a.tgl_lahir,getdate()) as decimal)<36 "+
                "        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.sg1.getCell(2,0)+"' "+
                "    ) union "+
				"	(select 'Umur' as nmcol1,'36-45' as col1 "+
                "      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
                "      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
                "      , count(sex) as col2 "+
                "    from karyawan a "+
                "        where cast(datediff (year,a.tgl_lahir,getdate()) as decimal)>35 "+
                "        and cast(datediff (year,a.tgl_lahir,getdate()) as decimal)<46 "+
                "        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.sg1.getCell(2,0)+"' "+
                "    ) union "+
				"	(select 'Umur' as nmcol1,'>45' as col1 "+
                "      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
                "      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
                "      , count(sex) as col2 "+
                "    from karyawan a "+
                "        where cast(datediff (year,a.tgl_lahir,getdate()) as decimal)>45 "+
                "        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.sg1.getCell(2,0)+"' "+
                "    ) union "+
				"	(select 'Masa Kerja' as nmcol1,'<2' as col1 "+
                "      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
                "      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
                "      , count(sex) as col2 "+
                "    from karyawan a "+
                "        where cast(datediff (year,a.tgl_masuk,getdate()) as decimal)<2 "+
                "        and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.sg1.getCell(2,0)+"' "+
                "    ) union "+
				"	(select 'Masa Kerja' as nmcol1,'2 - 5' as col1 "+
                "      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
                "      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
                "      , count(sex) as col2 "+
                "    from karyawan a "+
                "        where cast(datediff (year,a.tgl_masuk,getdate()) as decimal)>=2 and "+
                "        cast(datediff (year,a.tgl_masuk,getdate()) as decimal)<=5 and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.sg1.getCell(2,0)+"' "+
                "    ) union "+
				"	(select 'Masa Kerja' as nmcol1,'6 - 10' as col1 "+
                "      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
                "      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
                "      , count(sex) as col2 "+
                "    from karyawan a "+
                "        where cast(datediff (year,a.tgl_masuk,getdate()) as decimal)>5 and "+
                "        cast(datediff (year,a.tgl_masuk,getdate()) as decimal)<=10 and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.sg1.getCell(2,0)+"' "+
                "    ) union "+
                "	(select 'Masa Kerja' as nmcol1,'>10' as col1 "+
                "      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
                "      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
                "      , count(sex) as col2 "+
                "    from karyawan a "+
                "        where cast(datediff (year,a.tgl_masuk,getdate()) as decimal)>10 and a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.sg1.getCell(2,0)+"' "+
                "    ) union "+
				"	(select 'Agama' as nmcol1,a.agama as col1 "+
                "      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
                "      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
                "      , count(sex) as col2 "+
                "    from karyawan a "+
                "        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.sg1.getCell(2,0)+"' "+
                "    group by a.agama) union "+
				"	(select 'Status Kawin' as nmcol1,a.status as col1 "+
                "      , sum(case when a.sex = 'laki-laki' then 1 else 0 end) as male "+
                "      , sum(case when a.sex = 'perempuan' then 1 else 0 end) as female "+
                "      , count(sex) as col2 "+
                "    from karyawan a "+
                "        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and kode_lokasi = '"+this.sg1.getCell(2,0)+"' "+
                "    group by a.status) union "+
				"	(select 'Pendidikan' as nmcol1, b.jenjang as col1 "+
                "    , count(c.sex) as male "+
                "    , count(d.sex) as female "+
                "    , count(c.sex)  + count(d.sex) as col2 "+
                "  from hr_dinas2 b "+
                "    left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = b.kode_lokkonsol and c.sex = 'laki-laki' and c.kode_lokasi = b.kode_lokasi "+
                "    left outer join karyawan d on d.nik = b.nik and d.kode_lokkonsol = b.kode_lokkonsol and d.sex = 'perempuan' and d.kode_lokasi = b.kode_lokasi "+
                " where b.kode_lokkonsol = '"+this.app._lokKonsol+"' and b.kode_lokasi = '"+this.sg1.getCell(2,0)+"' group by b.jenjang) "+
				"	) as a";
			}else if (tipe === 1){
				sql="select 1 ";
			}
		}else if (jnsLap === "Riwayat"){
			if (tipe === 0){
				sql="select a.nmcol1,a.col1,a.male,a.female,a.col2 from ( "+
				"	(select 'Status Pegawai' as nmcol1, a.nama as col1 "+
                "      , count(c.sex) as male "+
                "      , count(d.sex) as female "+
                "      , count(c.sex)  + count(d.sex) as col2 "+
                "    from hr_status2 a "+
                "      left outer join hr_dinas2 b on b.kode_status = a.kode_status and b.kode_lokkonsol = a.kode_lokkonsol  and b.kode_lokasi = '"+this.sg1.getCell(2,0)+"' "+
                "      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.sex = 'laki-laki' and c.kode_lokasi = b.kode_lokasi "+
                "      left outer join karyawan d on d.nik = b.nik and d.kode_lokkonsol = a.kode_lokkonsol and d.sex = 'perempuan' and d.kode_lokasi = b.kode_lokasi "+
                "   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' group by col1) union "+
				"	(select 'Tenaga Perbantuan' as nmcol1, a.nama as col1 "+
                "      , count(c.sex) as male "+
                "      , count(d.sex) as female "+
                "      , count(c.sex)  + count(d.sex) as col2 "+
                "    from hr_bantu a "+
                "      left outer join hr_dinas2 b on b.kode_bantu = a.kode_bantu and b.kode_lokkonsol = a.kode_lokkonsol  and b.kode_lokasi = '"+this.sg1.getCell(2,0)+"' "+
                "      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.sex = 'laki-laki' and c.kode_lokasi = b.kode_lokasi "+
                "      left outer join karyawan d on d.nik = b.nik and d.kode_lokkonsol = a.kode_lokkonsol and d.sex = 'perempuan' and d.kode_lokasi = b.kode_lokasi "+
                "   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' group by col1) union "+
				"	(select 'Jabatan Struktural', a.nama as col1 "+
                "          , count(b.sex) as male "+
                "          , count(d.sex) as female "+
                "          , count(b.sex)  + count(d.sex) as col2 "+
                "        from hr_jabatan a "+
                "          inner join hr_jabs e on a.kode_jab = e.kode_jabs and e.kode_lokkonsol = a.kode_lokkonsol and e.status_aktif = '1' "+
                "          inner join hr_dinas2 c on c.kode_jabs = e.kode_jabs and e.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = '"+this.sg1.getCell(2,0)+"' "+
                "          left outer join karyawan b on b.nik = c.nik and b.kode_lokkonsol = a.kode_lokkonsol and b.sex = 'laki-laki' and b.kode_lokasi = c.kode_lokasi "+
                "          left outer join karyawan d on d.nik = c.nik and d.kode_lokkonsol = a.kode_lokkonsol and d.sex = 'perempuan'and d.kode_lokasi = c.kode_lokasi "+
                "        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and (a.jenis = 'STRUKTURAL' or a.kode_jab = '-') group by a.nama) union "+
				"	(select 'Jabatan Fungsional', a.nama as col1 "+
                "          , count(b.sex) as male "+
                "          , count(d.sex) as female "+
                "          , count(b.sex)  + count(d.sex) as col2 "+
                "        from hr_jabatan a "+
                "          inner join hr_jabf e on a.kode_jab = e.kode_jabf and e.kode_lokkonsol = a.kode_lokkonsol and e.status_aktif = '1' "+
                "          inner join hr_dinas2 c on c.kode_jabf = e.kode_jabf and e.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = '"+this.sg1.getCell(2,0)+"' "+
                "          left outer join karyawan b on b.nik = c.nik and b.kode_lokkonsol = a.kode_lokkonsol and b.sex = 'laki-laki' and b.kode_lokasi = c.kode_lokasi "+
                "          left outer join karyawan d on d.nik = c.nik and d.kode_lokkonsol = a.kode_lokkonsol and d.sex = 'perempuan'and d.kode_lokasi = c.kode_lokasi "+
                "        where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and (a.jenis = 'FUNGSIONAL' or a.kode_jab = '-') group by a.nama) union "+
				"	(select 'Profesi', a.nama as col1 "+
                "          , count(b.sex) as male "+
                "          , count(d.sex) as female "+
                "          , count(b.sex)  + count(d.sex) as col2 "+
                "        from hr_profesi a "+
                "          inner join hr_rwyprofesi e on a.kode_profesi = e.kode_profesi2 and e.kode_lokkonsol = a.kode_lokkonsol and e.status_aktif = '1' "+
                "          inner join hr_dinas2 c on c.kode_profesi = e.kode_profesi2 and e.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.kode_lokasi = '"+this.sg1.getCell(2,0)+"' "+
                "          left outer join karyawan b on b.nik = c.nik and b.kode_lokkonsol = a.kode_lokkonsol and b.sex = 'laki-laki' and b.kode_lokasi = c.kode_lokasi "+
                "          left outer join karyawan d on d.nik = c.nik and d.kode_lokkonsol = a.kode_lokkonsol and d.sex = 'perempuan'and d.kode_lokasi = c.kode_lokasi "+
                "        where a.kode_lokkonsol = '"+this.app._lokKonsol+"'  group by a.nama) "+
				"	) as a";
			}else if (tipe === 1){
				sql="select 1 ";
			}
		}else if (jnsLap === "Lokasi"){
			if (tipe === 0){
				sql="select a.nmcol1,a.col1,a.male,a.female,a.col2 from ( "+
				"	(select 'Lokasi Kerja' as nmcol1, a.nama as col1 "+
                "      , count(c.sex) as male "+
                "      , count(d.sex) as female "+
                "      , count(c.sex)  + count(d.sex) as col2 "+
                "    from hr_lokasi a "+
                "      left outer join hr_dinas2 b on b.kode_lokasi = a.kode_lokasi and b.kode_lokkonsol = a.kode_lokkonsol "+
                "      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.sex = 'laki-laki' and c.kode_lokasi = b.kode_lokasi "+
                "      left outer join karyawan d on d.nik = b.nik and d.kode_lokkonsol = a.kode_lokkonsol and d.sex = 'perempuan' and d.kode_lokasi = b.kode_lokasi "+
                "   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and a.kode_lokasi = '"+this.sg1.getCell(2,0)+"' group by col1) union "+
				"	(select 'Unit Kerja' as nmcol1, a.nama as col1 "+
                "      , count(c.sex) as male "+
                "      , count(d.sex) as female "+
                "      , count(c.sex)  + count(d.sex) as col2 "+
                "    from hr_loker a "+
                "      left outer join hr_dinas2 b on b.kode_loker = a.kode_loker and b.kode_lokasi = a.kode_lokasi and b.kode_lokkonsol = a.kode_lokkonsol "+
                "      left outer join karyawan c on b.nik = c.nik and c.kode_lokkonsol = a.kode_lokkonsol and c.sex = 'laki-laki' and c.kode_lokasi = b.kode_lokasi "+
                "      left outer join karyawan d on d.nik = b.nik and d.kode_lokkonsol = a.kode_lokkonsol and d.sex = 'perempuan' and d.kode_lokasi = b.kode_lokasi "+
                "   where a.kode_lokkonsol = '"+this.app._lokKonsol+"' and a.kode_lokasi = '"+this.sg1.getCell(2,0)+"' group by col1) "+
				"	) as a";
			}else if (tipe ===1){
				sql="select 1 ";
			}
		}
		return sql;
	},
	frontUpperCase: function(field){
		var temp = field.split(" "),text="",tmp;
		for (var i=0;i<temp.length;i++){
			tmp=temp[i].charAt(0).toUpperCase()+temp[i].substr(1);
			text=text+tmp+" ";
		}
		return RTrim(text);
	}
});
