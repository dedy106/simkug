window.app_saku_sdm_report_flSdmManPower = function(owner)
{
	if (owner)
	{
		window.app_saku_sdm_report_flSdmManPower.prototype.parent.constructor.call(this,owner);
		this.className = "app_saku_sdm_report_flSdmManPower";
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Laporan Analisa Man Power", 2);
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
window.app_saku_sdm_report_flSdmManPower.extend(window.portalui_childForm);
window.app_saku_sdm_report_flSdmManPower.implement({
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
				
				this.title = new server_util_arrayList({items:["colom1","Jumlah Pegawai"]});
				if (this.jenisLap === "Pribadi")
					this.widthTable = new server_util_arrayList({items:[120,120]});
				else this.widthTable = new server_util_arrayList({items:[220,120]});
				this.fieldType = new server_util_arrayList({items:["S","N"]});
				var sqlArr = new server_util_arrayList({items:[sql]});				
				var result = this.dbLib.getMultiDataProvider(sqlArr,true);
				alert(result);
				var dthtml = this.convertResultToHTML(result);
				
				this.sqlScript = sql;
				this.viewer.setTotalPage(this.dbLib.getRowCount(this.scriptSqlCount, this.pager));
				this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		    	this.app._mainForm.reportNavigator.rearrange();
				this.previewReport(dthtml);
			}
	    }catch(e){
			systemAPI.alert("[app_saku_sdm_report_flSdmManPower]::mainButtonClick:"+e);
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
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>Analisa Man Power<br>";
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
					html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='2'>Total </td>"+
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
					if (col === 2)
						html += "<td class='header_laporan' align='center' width="+this.widthTable.get(i)+">"+this.title.get(i)+"</td>";
					col++;
				}
				html += "</tr>";
			}
			urut+=1;
			html += "<tr><td height='20' class='isi_laporan' valign='top'>"+urut+".</td>";
			for (var c in line){
				if (c === "col1" || c === "col2"){
					if (c === "col2")
						html += "<td height='20' class='isi_laporan' align='right' valign='top' >"+floatToNilai(line[c])+"</td>";
					else html += "<td height='20' class='isi_laporan' valign='top' >"+line[c]+"</td>";
				}
			}
			tot+= parseInt(line.col2);
			html += "</tr>";
			first = false;
		}
		//html += "</table>";
			html+="<tr align='right' bgcolor='#EEEEEE'><td class='isi_laporan' colspan='2'>Total </td>"+
				"<td class='isi_laporan'>"+floatToNilai(tot)+"</td></tr>";
		if (html !== ""){
			retHtml += "<table border='0' cellspacing='0' cellpadding='0'>"+
				//"<tr><td>"+htmlHeader+"</td></tr>"+
				"<tr><td>"+html+"</td></tr></table>";				
		}
		return retHtml;
	},
	getSQL: function(jnsLap,filter,tipe){
		var sql;
		if (jnsLap === "Pribadi"){
			if (tipe === 0){
				sql="select a.nmcol1,a.col1,a.col2 from ( "+
				"	(select 'Jenis Kelamin' as nmcol1,sex as col1,count(*) as col2 "+
				"	from karyawan b "+			
				"	"+filter+" and sex in ('Laki-Laki','Perempuan') "+
				"	group by col1) union "+
				"	(select 'Umur' as nmcol1,'20-35' as col1,count(b.tgl_lahir) as col2 "+
				"	from karyawan b  "+
				"	"+filter+" and cast(substring(date_sub(now(),interval substring(b.tgl_lahir,1,7) year_month),3,2) as decimal)>19 "+
				"	and cast(substring(date_sub(now(),interval substring(b.tgl_lahir,1,7) year_month),3,2) as decimal)<36 "+
				"	group by col1) union "+
				"	(select 'Umur' as nmcol1,'36-50' as col1,count(b.tgl_lahir) as col2 "+
				"	from karyawan b "+
				"	"+filter+" and cast(substring(date_sub(now(),interval substring(b.tgl_lahir,1,7) year_month),3,2) as decimal)>35 "+
				"	and cast(substring(date_sub(now(),interval substring(b.tgl_lahir,1,7) year_month),3,2) as decimal)<50 "+
				"	group by col1) union "+
				"	(select 'Umur' as nmcol1,'>50' as col1,count(b.tgl_lahir) as col2 "+
				"	from karyawan b "+
				"	"+filter+" and cast(substring(date_sub(now(),interval substring(b.tgl_lahir,1,7) year_month),3,2) as decimal)>49 "+
				"	group by col1) union "+
				"	(select 'Masa Kerja' as nmcol1,'<2' as col1,count(*) as col2 "+
				"	from karyawan b "+
				"	"+filter+" and cast(substring(date_sub(now(),interval substring(b.tgl_masuk,1,7) year_month),3,2) as decimal)<2 "+
				"	group by col1) union "+
				"	(select 'Masa Kerja' as nmcol1,'2<5' as col1,count(*) as col2 "+
				"	from karyawan b "+
				"	"+filter+" and cast(substring(date_sub(now(),interval substring(b.tgl_masuk,1,7) year_month),3,2) as decimal)>1 "+
				"	and cast(substring(date_sub(now(),interval substring(b.tgl_masuk,1,7) year_month),3,2) as decimal)<6 "+
				"	group by col1) union "+
				"	(select 'Masa Kerja' as nmcol1,'6<12' as col1,count(*) as col2 "+
				"	from karyawan b "+
				"	"+filter+" and cast(substring(date_sub(now(),interval substring(b.tgl_masuk,1,7) year_month),3,2) as decimal)>5 "+
				"	and cast(substring(date_sub(now(),interval substring(b.tgl_masuk,1,7) year_month),3,2) as decimal)<20 "+
				"	group by col1) union "+
				"	(select 'Agama' as nmcol1,agama as col1,count(*) as col2 "+
				"	from karyawan b "+
				"	"+filter+"   "+
				"	group by col1) union "+
				"	(select 'Status Kawin' as nmcol1,status as col1,count(*) as col2 "+
				"	from karyawan b "+
				"	"+filter+"  "+
				"	group by col1) union "+
				"	(select 'Pendidikan' as nmcol1,c.institusi as col1,count(*) as col2 "+
				"	from karyawan b  "+
				"	left outer join hr_rwypddk c on c.nik=b.nik and b.jenjang=c.jenjang "+
				"	and c.tahun=(select max(tahun) from hr_rwypddk where nik=c.nik) "+filter+
				"	group by col1,c.jurusan,c.jenjang) "+
				"	) as a";
			}else if (tipe === 1){
				sql="select count(*) from ( "+
				"	(select 'Jenis Kelamin' as nmcol1,a.sex as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	"+filter+" and a.sex in ('Laki-Laki','Perempuan') "+
				"	group by col1) union "+
				"	(select 'Umur' as nmcol1,'20-35' as col1,count(b.tgl_lahir) as col2 "+
				"	from karyawan b "+
				"	"+filter+" and cast(substring(date_sub(now(),interval substring(b.tgl_lahir,1,7) year_month),3,2) as decimal)>19 "+
				"	and cast(substring(date_sub(now(),interval substring(a.tgl_lahir,1,7) year_month),3,2) as decimal)<36 "+
				"	group by col1) union "+
				"	(select 'Umur' as nmcol1,'36-45' as col1,count(b.tgl_lahir) as col2 "+
				"	from karyawan b "+
				"	"+filter+" and cast(substring(date_sub(now(),interval substring(b.tgl_lahir,1,7) year_month),3,2) as decimal)>35 "+
				"	and cast(substring(date_sub(now(),interval substring(b.tgl_lahir,1,7) year_month),3,2) as decimal)<46 "+
				"	group by col1) union "+
				"	(select 'Umur' as nmcol1,'>50' as col1,count(a.tgl_lahir) as col2 "+
				"	from karyawan b "+
				"	"+filter+" and cast(substring(date_sub(now(),interval substring(b.tgl_lahir,1,7) year_month),3,2) as decimal)>49 "+
				"	group by col1) union "+
				"	(select 'Masa Kerja' as nmcol1,'<2' as col1,count(*) as col2 "+
				"	from karyawan b "+
				"	"+filter+" and cast(substring(date_sub(now(),interval substring(b.tgl_masuk,1,7) year_month),3,2) as decimal)<2 "+
				"	group by col1) union "+
				"	(select 'Masa Kerja' as nmcol1,'2<5' as col1,count(*) as col2 "+
				"	from karyawan b "+
				"	"+filter+" and cast(substring(date_sub(now(),interval substring(b.tgl_masuk,1,7) year_month),3,2) as decimal)>1 "+
				"	and cast(substring(date_sub(now(),interval substring(b.tgl_masuk,1,7) year_month),3,2) as decimal)<6 "+
				"	group by col1) union "+
				"	(select 'Masa Kerja' as nmcol1,'6<10' as col1,count(*) as col2 "+
				"	from karyawan b "+
				"	"+filter+" and cast(substring(date_sub(now(),interval substring(b.tgl_masuk,1,7) year_month),3,2) as decimal)>5 "+
				"	and cast(substring(date_sub(now(),interval substring(b.tgl_masuk,1,7) year_month),3,2) as decimal)<11 "+
				"	group by col1) union "+
				"	(select 'Agama' as nmcol1,'Islam' as col1,count(*) as col2 "+
				"	from karyawan b "+filter+
				"	group by col1) union "+
				"	(select 'Status Kawin' as nmcol1,status as col1,count(*) as col2 "+
				"	from karyawan b "+
				"	"+filter+"  "+
				"	group by col1) union "+
				"	(select 'Pendidikan' as nmcol1,c.institusi as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_rwypddk c on c.nik=b.nik and b.kode_lokkonsol=c.kode_lokkonsol "+
				"	and c.tahun=(select max(tahun) from hr_rwypddk where nik=c.nik) "+filter+
				"	group by col1,c.jurusan,c.jenjang) "+
				"	) as a";
			}
		}else if (jnsLap === "Riwayat"){
			if (tipe === 0){
				sql="select a.nmcol1,a.col1,a.col2 from ( "+
				"	(select 'Status Pegawai' as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan b"+
                "   left outer join hr_status2 c on c.kode_status=b.kode_status and b.kode_lokkonsol=c.kode_lokkonsol"+
                "   where b.kode_lokkonsol = '"+this.app._lokKonsol+"' and b.kode_lokasi = '"+this.sg1.getCell(2,0)+"' group by col1) union "+
				"	(select 'Tenaga Perbantuan' as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan b "+
                "   left outer join hr_bantu c on b.kode_bantu = c.kode_bantu and b.kode_lokkonsol = c.kode_lokkonsol "+
                "   where b.kode_lokkonsol = '"+this.app._lokKonsol+"' and b.kode_lokasi = '"+this.sg1.getCell(2,0)+"' group by col1) union "+
				"	(select 'Jabatan Struktural' as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan b "+
                "   left outer join hr_jabatan c on c.kode_jab = b.kode_jabs and b.kode_lokkonsol = c.kode_lokkonsol "+
                "   where b.kode_lokkonsol = '"+this.app._lokKonsol+"' and b.kode_lokasi = '"+this.sg1.getCell(2,0)+"' group by col1) union "+
				"	(select 'Jabatan Fungsional' as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan b "+
                "   left outer join hr_jabatan c on c.kode_jab = b.kode_jabf and b.kode_lokkonsol = c.kode_lokkonsol "+
                "   where b.kode_lokkonsol = '"+this.app._lokKonsol+"' and b.kode_lokasi = '"+this.sg1.getCell(2,0)+"' group by col1) union "+
				"	(select 'Profesi' as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan b "+
                "   left outer join hr_profesi c on c.kode_profesi = b.kode_profesi and b.kode_lokkonsol = c.kode_lokkonsol "+
                "   where b.kode_lokkonsol = '"+this.app._lokKonsol+"' and b.kode_lokasi = '"+this.sg1.getCell(2,0)+"' group by col1) "+
				"	) as a";
			}else if (tipe === 1){
				sql="select count(*) from ( "+
				"	(select 'Status Pegawai' as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_status2 c on b.kode_status=c.kode_status and b.kode_lokkonsol=c.kode_lokkonsol "+filter+
				"	group by col1) union "+
				"	(select 'Tenaga Perbantuan' as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_bantu c on b.kode_bantu=c.kode_bantu and b.kode_lokkonsol=c.kode_lokkonsol "+filter+
				"	group by col1) union "+
				"	(select 'Jabatan Struktural' as nmcol1,d.nama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_jabs c on b.nik=c.nik and b.kode_lokkonsol=c.kode_lokkonsol and c.status_aktif='1' "+
				"	left outer join hr_jabatan d on d.kode_jab=c.kode_jabs and d.kode_lokkonsol=c.kode_lokkonsol "+filter+
				"	group by col1) union "+
				"	(select 'Jabatan Fungsional' as nmcol1,d.nama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_jabf c on b.nik=c.nik and b.kode_lokkonsol=c.kode_lokkonsol and c.status_aktif='1' "+
				"	left outer join hr_jabatan d on d.kode_jab=c.kode_jabf and d.kode_lokkonsol=c.kode_lokkonsol "+filter+
				"	group by col1) union "+
				"	(select 'Profesi' as nmcol1,d.nama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_rwyprofesi c on b.nik=c.nik and b.kode_lokkonsol=c.kode_lokkonsol and c.status_aktif='1' "+
				"	left outer join hr_profesi d on d.kode_profesi=c.kode_profesi2 and d.kode_lokkonsol=c.kode_lokkonsol "+filter+
				"	group by col1) "+
				"	) as a";
			}
		}else if (jnsLap === "Lokasi"){
			if (tipe === 0){
				sql="select a.nmcol1,a.col1,a.col2 from ( "+
				"	(select 'Lokasi Kerja' as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan b left outer join hr_lokasi c on b.kode_lokasi=c.kode_lokasi and b.kode_lokkonsol=c.kode_lokkonsol "+
				"   "+filter+"  "+
				"	group by col1) union "+
				"	(select 'Unit Kerja' as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan b  left outer join hr_loker c on b.kode_loker=c.kode_loker and b.kode_lokasi=c.kode_lokasi and b.kode_lokkonsol=c.kode_lokkonsol "+
				"   "+filter+"  "+
				"	group by col1) "+
				"	) as a";
			}else if (tipe ===1){
				sql="select count(*) from ( "+
				"	(select 'Lokasi Kerja' as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_lokasi c on b.kode_lokasi=c.kode_lokasi and b.kode_lokkonsol=c.kode_lokkonsol "+filter+
				"	group by col1) union "+
				"	(select 'Unit Kerja' as nmcol1,c.nama as col1,count(*) as col2 "+
				"	from karyawan a left outer join hr_dinas2 b on a.nik=b.nik and a.kode_lokkonsol=b.kode_lokkonsol "+
				"	left outer join hr_loker c on b.kode_loker=c.kode_loker and b.kode_lokasi=c.kode_lokasi and b.kode_lokkonsol=c.kode_lokkonsol "+filter+
				"	group by col1) "+
				"	) as a";
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