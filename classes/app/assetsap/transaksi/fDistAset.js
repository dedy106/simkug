/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fDistAset = function(owner) {
	if (owner){
		try{
			window.app_assetsap_transaksi_fDistAset.prototype.parent.constructor.call(this,owner);
			this.maximize();
			this.className  = "app_assetsap_transaksi_fDistAset";		
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Cetak KKIL", 0);	
			uses("uploader;saiMemo;util_file;datePicker;uploader;checkBox;system_fJurnalViewer;server_report_report;reportViewer");
			this.ed_periode = new saiLabelEdit(this, {bound:[20,2,200,20], caption:"Periode", text:this.app._periode});
			this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});		
			this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
			this.ed_lokfa = new saiCBBL(this, {
				bound: [20, 30, 200, 20],
				caption: "Area Bisnis",
				multiSelection: false,
				text:this.app._kodeLokfa,
				rightLabel:this.app._namaLokfa,			
				sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
				change:[this,"doChange"]		
			});
			this.ed_kode = new saiLabelEdit(this,{bound:[20,2,250,20],caption:"No Distribusi",readOnly:true});			
			this.bGen = new button(this,{bound:[270,2,80,20],caption:"Generate",click:"doClick"});													
			this.ed_Src = new saiLabelEdit(this,{bound:[300,2,250,20],caption:"Source", visible:false});
			this.ed_nik1 = new saiCBBL(this, {
				bound: [20, 3, 200, 20],
				caption: "Officer",
				multiSelection: false,
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
			});		
			this.ed_Dst = new saiLabelEdit(this,{bound:[300,3,250,20],caption:"Pdf Folder", visible:false});
			this.bPlant = new button(this, {bound:[500,3,80,20], caption:"Up. Plant", click:"doGenerate", visible:false});
			this.bLocation = new button(this, {bound:[600,3,80,20], caption:"Up. Location", click:"doGenerate", visible:false});
			this.bPdf = new button(this, {bound:[600,3,80,20], caption:"Create Pdf", click:"doGenerate"});
			this.bFile = new button(this, {bound:[700,3,80,20], caption:"Generate File", click:"doGenerate"});
			this.bCreate = new button(this, {bound:[800,3,80,20], caption:"Generate Data", click:"doGenerate"});
			this.p1 = new panel(this,{bound:[20,11,900,230],caption:"Data Asset"});
			this.sg = new saiGrid(this.p1, {
				bound: [1, 20, 898, 180],
				colCount: 12,
				colTitle: ["Id Gabung","No Asset", "SN", "Jenis Asset", "Deskripsi Asset", "Cap Date", "Harga Perolehan", "Akm. Penyusutan", "Nilai Buku", "Deskripsi 2", "Jumlah Fisik","No Generate"],
				colWidth: [[10,9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80, 250, 80, 100, 80, 80, 150, 80, 50, 150,150]],
				colReadOnly: [true,[1,2,3,4,5,6,7,8,9],[]],
				change: [this, "doGridChange"],
				rowCount: 1,
				tag: 9,
				buttonStyle:[[0],[bsEllips]],
				ellipsClick: [this,"doEllipsClick"],
				colFormat:[[6,7,8,10],[cfNilai, cfNilai, cfNilai]]
			});		
			this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:bsView, grid:this.sg, pager:[this,"doPager"]});
			this.rearrangeChild(10,23);			
			this.setTabChildIndex();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();
			setTipeButton(tbSimpan);
			this.sysCode = 0;
			this.onClose.set(this,"doClose");		
			this.viewer = new reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);		
			uses("app_assetsap_transaksi_genKKIL",true);
			this.svrGenKKIL = new app_assetsap_transaksi_genKKIL();
			this.svrGenKKIL.addListener();
		}catch(e){
			alert(e);
		}
	}
};
window.app_assetsap_transaksi_fDistAset.extend(window.childForm);
window.app_assetsap_transaksi_fDistAset.implement({
	doClose: function(sender){				
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear){
			if (this.sysCode == 0)
				system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
			else if (this.sysCode == 1)
				system.confirm(this, "clear", "Transaksi berhasil disimpan("+this.ed_kode.getText()+".","screen akan dibersihkan?");	
		}
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.ed_kode);		
						this.sg.clear(1);
						this.sysCode = 0;
						this.ed_periode.setText(this.app._periode);
					}
				break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						var line;
						/*for (var i in this.dataKKIL){	
							line = this.dataKKIL[i];
							sql.add("insert into amu_distaset_m (no_bukti,  kode_lokasi, kode_lokfa, tanggal,  periode, nik_user, tgl_input, jenis)values"+
								"('"+line.no_bukti+"', '"+this.app._lokasi+"','"+this.ed_lokfa.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_periode.getText()+"','"+this.app._userLog+"',now(), '-')");							
							sql.add("insert into amu_distaset_d (no_bukti, kode_lokasi, no_gabung,no_fa,no_sn, periode) "+
								" values('"+line.no_bukti+"','"+this.app._lokasi+"','"+line.no_gabung+"','"+ line.no_fa+"','"+ line.no_sn+"','"+this.app._periode+"' )");
						}
						this.dbLib.execArraySQL(sql);*/
						this.svrGenKKIL.createData(this.ed_kode.getText(),this.app._lokasi, this.ed_lokfa.getText(), this.dp_tgl.getDateString(),this.app._periode );
					}
				break;
				case "ubah" :
					
				break;
				case "delete" :
					
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){       
    },
	doFindBtnClick: function(sender){		
	},
	doChange: function(sender){
		if (sender == this.ed_lokfa){
			this.sg.clear(1);			
			this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+sender.getText()+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);			
		}		
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_distaset_m','no_bukti',this.ed_lokfa.getText()+"."+this.dp_tgl.getYear()+".",'000000'));
	},
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.dbLib)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{																
							/*this.viewer.prepare();
							this.viewer.show();
							this.app._mainForm.pButton.hide();
							this.app._mainForm.reportNavigator.show();
							this.app._mainForm.reportNavigator.serverDownload = true;
							this.sysCode = 1;											
							this.nama_report = "server_report_amu_rptKKIL2";							
							this.viewer.setTotalPage(1);
							this.app._mainForm.reportNavigator.setTotalPage(1);
							this.app._mainForm.reportNavigator.rearrange();
							var result = this.report.preview(this.nama_report,"where aa.no_bukti = '"+this.ed_kode.getText()+"' and b.periode = '"+this.app._periode+"' ", 1, 1, "", "",'-');							
							this.viewer.preview(result);														
							*/
							system.info(this,result,"");
							this.svrGenKKIL.createXls(this.ed_lokfa.getText());
						}else system.info(this,result,"");
	    			break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.report){	        			
			this.viewer.preview(result);														
        }else if (sender == this.svrGenKKIL){
			alert(result);
		}
	},	
	doGridChange: function(sender, col, row,param1,result, data){	    
		if (col == 0) {
			var data = this.dbLib.getDataProvider("select no_fa, no_sn, jenis, nama, nilai, nilai_ap, nilai_buku, date_format(tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, alamat, jml_fisik from amu_asset a where no_gabung = '" + sender.cells(0,row) + "' and kode_lokasi = '" + this.app._lokasi + "' ", true);
			if (typeof data != "string"){
				if (data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					this.sg.editData(row,[line.no_fa, line.no_sn, line.jenis, line.nama, line.tgl_perolehan, parseNilai(line.nilai), parseNilai(line.nilai_ap), parseNilai(line.nilai_buku), line.alamat, line.jml_fisik],
					[1,2,3,4,5,6,7,8,9,10]);
				}
			}
		}
    },
	doEllipsClick:function(sender, col ,row){		
			switch(col)
			{
				case 0 : 
					var data = ["' '"];
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.cells(0,i) != "")
							data[data.length] = "'"+this.sg.cells(0,i)+"'";
					}
					this.standarLib.showListDataForSG(this, "Daftar Asset SAP",this.sg, this.sg.row, this.sg.col, 
													  "select a.no_gabung, a.no_fa, a.no_sn,a.nama from amu_asset a "+													  													 
													  "	inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'FISIK' and c.periode = a.periode "+													  
													  "	left outer join amu_distaset_d b on b.no_gabung = a.no_gabung and b.periode = a.periode "+
													  " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and a.periode = '"+this.app._periode+"' and b.no_gabung is null and not a.no_gabung in ("+data+")",
													  "select count(a.no_fa)  from amu_asset a "+													  
													  "	inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'FISIK' and c.periode = a.periode "+													  
													  "	left outer join amu_distaset_d b on b.no_gabung = a.no_gabung and b.periode = a.periode "+
													  " where  a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and a.periode = '"+this.app._periode+"' and b.no_gabung is null and not a.no_gabung in ("+data+")",
													  ["a.no_gabung","a.nama"],"and",["ID gabung","No Kartu Asset","No SN","Deskripsi Asset"],false);
					break;				
			}	
	},
	previewReport: function(dthtml){
		var html = "<div align='center' class='judul_laporan' style='{width:100%;font-size:14;font-weight:bold;}'><br><br>"+this.app._namalokasi.toUpperCase()+"<br>DAFTAR ARSIP per LOKASI<br>Posisi : "+this.sg1.getCell(2,1)+"<br />";
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
			this.app._mainForm.reportNavigator.serverDownload = true;
		  var dthtml = this.dbLarge.sqlToHtmlWithHeader(this.sqlScript,1,this.pager * this.viewer.getTotalPage(), this.title, this.widthTable, this.fieldType,true,this.groupBy, this.summary, this.groupHeader, undefined,"","",undefined);
		  this.previewReport(dthtml);
	      break;
	    case "pdfBtn" :      
		  var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("pdf");			
			html.add(new Date().valueOf()+"_angsKol");				
	      this.viewer.useIframe(upDownHtml(html));
	      break;
	    case "xlsBtn" :	
			/*var html = new server_util_arrayList();
			html.add(this.allHtml);			
			html.add("xls");			
			html.add(new Date().valueOf()+"_angsKol");				
			this.viewer.useIframe(upDownHtml(html));*/			
			window.location = this.report.createXls(this.nama_report,"where aa.no_bukti = '"+this.ed_kode.getText()+"' and b.periode = '"+this.app._periode+"' ", 1, 1, "", "",'-');							
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
	        this.viewer.hide();	      	
	      	this.app._mainForm.pButton.show();
	      	this.app._mainForm.reportNavigator.hide();
	      	this.app._mainForm.reportNavigator.serverDownload = false;
	      break;
	  }
	  }catch(e){
		alert(e);
	  }
	},
	doGenerate: function(sender){
		try{
			if (sender == this.bFile){
				this.svrGenKKIL.createXls(this.ed_lokfa.getText());
				return;
			}
			if (sender == this.bPdf){
				this.svrGenKKIL.createPdf(this.ed_Src.getText(), this.ed_Dst.getText());
				return;
			}
			if (sender == this.bPlant){
				this.svrGenKKIL.updatePlant();
				return;
			}
			if (sender == this.bLocation){
				this.svrGenKKIL.updateLocation();
				return;
			}
			var data = this.dbLib.getDataProvider("select a.no_gabung, a.no_fa, a.no_sn, f.kode_lokfa as divisi, e.kode_lokfa as regional, d.kode_lokfa as area  from amu_asset a "+													  													 
												  "	inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'FISIK' and c.periode = a.periode "+													  
												  "	inner join amu_lokasi d on d.kode_lokfa = a.kode_lokfa "+
												  " inner join amu_lokasi e on e.kode_lokfa = d.kode_induk "+
												  " inner join amu_lokasi f on f.kode_lokfa = e.kode_induk "+
												  "	left outer join amu_distaset_d b on b.no_gabung = a.no_gabung and b.periode = a.periode "+
												  " where a.kode_lokasi = '"+this.app._lokasi+"' and f.kode_lokfa = '"+this.ed_lokfa.getText()+"' and a.periode = '"+this.app._periode+"' and b.no_gabung is null "+
												  " union "+
												  "select a.no_gabung, a.no_fa, a.no_sn, e.kode_lokfa as divisi, d.kode_lokfa as regional,'-' as area   from amu_asset a "+													  													 
												  "	inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'FISIK' and c.periode = a.periode "+													  
												  "	inner join amu_lokasi d on d.kode_lokfa = a.kode_lokfa "+
												  " inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' "+											 
												  "	left outer join amu_distaset_d b on b.no_gabung = a.no_gabung and b.periode = a.periode "+
												  " where a.kode_lokasi = '"+this.app._lokasi+"' and e.kode_lokfa = '"+this.ed_lokfa.getText()+"' and a.periode = '"+this.app._periode+"' and b.no_gabung is null "+
												  " union " +
												  "select a.no_gabung, a.no_fa, a.no_sn, d.kode_lokfa as divisi, '-' as regional, '-' as area  from amu_asset a "+
												  "	inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'FISIK' and c.periode = a.periode "+
												  "	inner join amu_lokasi d on d.kode_lokfa = a.kode_lokfa and d.kode_induk = '00' "+											  
												  "	left outer join amu_distaset_d b on b.no_gabung = a.no_gabung and b.periode = a.periode "+
												  " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and a.periode = '"+this.app._periode+"' and b.no_gabung is null ", true);				
			var nb = this.ed_kode.getText();
			var format = this.ed_lokfa.getText()+"."+this.dp_tgl.getYear()+".";
			var nu = parseFloat(nb.substr(format.length)), numeric;		
			for (var i in data.rs.rows){
				line = data.rs.rows[i];
				numeric = nu.toString();
				if (nu.toString().length < 6){
					for (var n=numeric.length; n < 6;n++) numeric = "0" + numeric;
				}
				line.no_bukti = format +numeric;
				data.rs.rows[i] = line;
				nu++;
			}
			this.dataKKIL = data.rs.rows;			
			this.sgn.setTotalPage(Math.ceil(this.dataKKIL.length / 30));
			this.sgn.rearrange();
			this.selectData(1);
		}catch(e){
			alert(e);
		}
	},
	selectData: function(page ){
		this.sg.clear();
		var start = (page - 1) * 30;
		var line, finish = (start + 30 > this.dataKKIL.length ? this.dataKKIL.length : start + 30);
		//"Id Gabung","No Asset", "SN", "Jenis Asset", "Deskripsi Asset", "Cap Date", "Harga Perolehan", "Akm. Penyusutan", "Nilai Buku", "Deskripsi 2", "Jumlah Fisik","No Generate"
		for (var i= start; i < finish; i++){
			line = this.dataKKIL[i];
			this.sg.appendData([line.no_gabung, line.no_fa, line.no_sn, '-', '-', '-', '0', '0', '0', '-', '-', line.no_bukti]);
		}
		this.sg.setNoUrut(start);
		this.page = page;
	},
	doPager: function(sender, page){
		this.selectData(page);
		
	}
	
});
