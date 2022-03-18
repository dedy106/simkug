/**
 * @author dweexfuad
 * Jika
 * 		Plan(ref1) dan location(ref2) kosong, maka di group sesuai lokfa
 * 		Plan tidak kosong, maka di group sesuai plan
 * 		Location tidak kosong, maka group di location 
 */
window.app_assetsap_transaksi_fDistAsetAlt = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fDistAsetAlt.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fDistAsetAlt";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Distribusi Kertas Kerja Prosedur Alternatif", 0);	
		uses("uploader;saiMemo;util_file;datePicker;uploader;checkBox;system_fJurnalViewer;server_report_report;reportViewer");
		this.ed_periode = new saiLabelEdit(this, {bound:[20,2,200,20], caption:"Periode", text:this.app._periode});
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,250,20],caption:"No Distribusi",readOnly:true});
		this.bGen = new button(this,{bound:[270,2,80,20],caption:"Generate",click:"doClick"});											
		this.ed_jenis = new saiCB(this,{bound:[20,10,200,20], caption:"Jenis Prosedur", change:[this,"doChange"]});
		
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Area Bisnis",			
			btnClick:[this,"doFindBtnClick"],			
			change:[this,"doChange"]		
		});
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "Officer",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});		
		this.bFile = new button(this, {bound:[700,3,80,20], caption:"Generate File", click:"doGenerate"});
		this.bCreate = new button(this, {bound:[800,3,80,20], caption:"Generate Data", click:"doGenerate"});
		//this.bTampil = new button(this,{bound:[800,3,80,20], caption:"Tampil", click:"doTampil"});
		this.p1 = new panel(this,{bound:[20,11,900,230],caption:"Data Asset"});
		this.sg = new saiGrid(this.p1, {
			bound: [1, 20, 898, 180],
			colCount: 11,
			colTitle: ["Id Gabung","No Asset", "SN", "Jenis Asset", "Deskripsi Asset", "Cap Date", "Harga Perolehan", "Akm. Penyusutan", "Nilai Buku", "Deskripsi2", "Jumlah Fisik"],
			colWidth: [[10,9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [80, 250, 80, 100, 80, 80, 150, 80, 50, 150,150]],
			colReadOnly: [true,[1,2,3,4,5,6,7,8,9],[]],
			change: [this, "doGridChange"],
			rowCount: 1,
			tag: 9,
			buttonStyle:[[0],[bsEllips]],
			ellipsClick: [this,"doEllipsClick"],
			colFormat:[[6,7,8,10],[cfNilai, cfNilai, cfNilai]]
		});		
		this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,898,25],buttonStyle:1, grid:this.sg});
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
		this.dbLib.getDataProviderA("select kode_klp, nama from amu_alt_klp");
		uses("app_assetsap_transaksi_genAlternatif",true);
		this.svrGenKKIL = new app_assetsap_transaksi_genAlternatif();
		this.svrGenKKIL.addListener();
	}
};
window.app_assetsap_transaksi_fDistAsetAlt.extend(window.childForm);
window.app_assetsap_transaksi_fDistAsetAlt.implement({
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
						/*this.doClick();
						sql.add("insert into amu_distaset_m (no_bukti,  kode_lokasi, kode_lokfa, tanggal,  periode, nik_user, tgl_input, jenis)values"+
							"('"+this.ed_kode.getText()+"', '"+this.app._lokasi+"','"+this.ed_lokfa.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.ed_periode.getText()+"','"+this.app._userLog+"',now(), '"+this.ed_jenis.getText()+"')");
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into amu_distaset_d (no_bukti, kode_lokasi, no_gabung,no_fa,no_sn, periode) "+
								" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+ this.sg.cells(1,i)+"','"+ this.sg.cells(2,i)+"','"+this.app._periode+"' )");
							}
						}						
						this.dbLib.execArraySQL(sql);*/					
						this.svrGenKKIL.createData(this.ed_kode.getText(),this.app._lokasi, this.ed_jenis.getText(), this.dp_tgl.getDateString(),this.app._periode );
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
		if (sender == this.ed_jenis){
			/*this.ed_lokfa.setSQL("select distinct a.kode_lokfa, a.nama "+
				" from amu_lokasi a "+
				"	inner join amu_asset b on b.kode_lokfa = a.kode_lokfa and b.periode = '"+this.app._periode+"' "+
				"	inner join amu_klp_alt c on c.kode_klpfa = b.kode_klpfa and c.periode = '"+this.app._periode+"' and c.jenis_proc = '"+this.ed_jenis.getText()+"' "+
				
				
				" where a.kode_lokasi = '"+this.app._lokasi+"' ", ["a.kode_lokfa","a.nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true);
				*/
		}
	},
	doClick: function(sender){
		var jns = "";	
		switch (this.ed_jenis.getText().toLowerCase()){
			case "sentral": jns = "STRL";
			break;
			case "rce & mux": jns = "RCE";
			break;
			case "rms": jns = "RMS";
			break;
			case "skkl / skso": jns = "SKKL";
			break;
			case "modem data & imux": jns = "MDM";
			break;
			case "satelit": jns = "STLT";
			break;
			case "server": jns = "SVR";
			break;
			case "stm & ims": jns = "STM";
			break;
			case "rbs": jns = "RBS";
			break;
			case "server": jns = "SVR";
			break;
			case "jaringan": jns = "JAR";
			break;
			case "lan & wan":
			case "lan&wan":jns = "LAN";
			break;			
			case "tanah & bangunan":jns = "TB";			
			break;
		}
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_distaset_m','no_bukti',jns+"."+this.dp_tgl.getYear()+".",'000000'));
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
							this.viewer.prepare();
							this.viewer.show();
							this.app._mainForm.pButton.hide();
							this.app._mainForm.reportNavigator.show();
							this.app._mainForm.reportNavigator.serverDownload = true;
							this.sysCode = 1;											
							this.nama_report = "server_report_amu_rptAlt";
							this.viewer.setTotalPage(1);
							this.app._mainForm.reportNavigator.setTotalPage(1);
							this.app._mainForm.reportNavigator.rearrange();
							var result = this.report.preview(this.nama_report,"where aa.no_bukti = '"+this.ed_kode.getText()+"' and b.periode = '"+this.app._periode+"' ", 1, 1, "", "",this.app._periode+","+this.ed_jenis.getText());							
							this.viewer.preview(result);														
						}else system.info(this,result,"");
	    			break;
	    			case "getDataProvider":						
						result = JSON.parse(result);						
						var line;						
						for (var i in result.rs.rows) {
							line = result.rs.rows[i];
							this.ed_jenis.addItem(line.kode_klp, line.nama);
						}			
						this.doChange(this.ed_jenis);
	    			break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.report){	        			
			this.viewer.preview(result);														
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
													  "	inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'ALTERNATIF' and c.periode = a.periode "+
													  "	inner join amu_klp_alt d on d.kode_klpfa = a.kode_klpfa and d.jenis_proc = '"+this.ed_jenis.getText()+"' and d.periode = a.periode "+
													  "	left outer join amu_distaset_d b on b.no_gabung = a.no_gabung and b.periode = a.periode "+
													  " where a.kode_lokasi = '"+this.app._lokasi+"'  and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and a.periode = '"+this.app._periode+"' and b.no_gabung is null and not a.no_gabung in ("+data+")",
													  "select count(a.no_fa)  from amu_asset a "+
													  "	inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'ALTERNATIF' "+
													  "	inner join amu_klp_alt d on d.kode_klpfa = a.kode_klpfa and d.jenis_proc = '"+this.ed_jenis.getText()+"' "+
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
			window.location = this.report.createXls(this.nama_report,"where aa.no_bukti = '"+this.ed_kode.getText()+"' and b.periode = '"+this.app._periode+"' ", 1, 1, "", "",this.ed_jenis.getText());							
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
		if (sender == this.bFile){
			this.svrGenKKIL.createXls(this.ed_jenis.getText(), this.ed_lokfa.getText());
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
	},
	doTampil: function(){
		var data = this.dbLib.getDataProvider("select a.no_gabung, a.no_fa, a.no_sn, a.kode_klpfa, a.nama, a.nilai, a.nilai_ap, a.nilai_buku, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.nama2, a.jml_fisik "+
			" 	from amu_asset a "+
			"	inner join amu_klp_alt b on b.kode_klpfa = a.kode_klpfa and a.periode = b.periode "+
			" where a.kode_lokasi = '" + this.app._lokasi + "' and a.kode_lokfa= '"+this.ed_lokfa.getText()+"' and b.jenis_proc = '"+this.ed_jenis.getText()+"' ", true);
		if (typeof data != "string"){
			this.sg.clear();			
			for (var i in data.rs.rows){
				var line = data.rs.rows[i];
				this.sg.appendData([line.no_gabung, line.no_fa, line.no_sn, line.kode_klpfa, line.nama, line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku), line.nama2, line.jml_fisik]);
			}
		}
	},
	doFindBtnClick: function(sender){
		this.standarLib.showListData(this, "Daftar Lokasi Aset",sender,undefined, 
									  "select distinct a.kode_lokfa, a.nama "+
				" from amu_lokasi a "+
				"	inner join amu_asset b on b.kode_lokfa = a.kode_lokfa and b.periode = '"+this.app._periode+"' "+
				"	inner join amu_klp_alt c on c.kode_klpfa = b.kode_klpfa and c.periode = '"+this.app._periode+"' and c.jenis_proc = '"+this.ed_jenis.getText()+"' "+
				" where a.kode_lokasi = '"+this.app._lokasi+"' ",
									  "select count(*) from (select distinct a.kode_lokfa, a.nama "+
				" from amu_lokasi a "+
				"	inner join amu_asset b on b.kode_lokfa = a.kode_lokfa and b.periode = '"+this.app._periode+"' "+
				"	inner join amu_klp_alt c on c.kode_klpfa = b.kode_klpfa and c.periode = '"+this.app._periode+"' and c.jenis_proc = '"+this.ed_jenis.getText()+"' "+
				" where a.kode_lokasi = '"+this.app._lokasi+"') ",
									  ["a.kode_lokfa","a.nama"],"and",["Kode Lokasi Aset","Nama"],false);		
	}
});
