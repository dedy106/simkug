window.app_saku3_transaksi_yakes21_budget_fAppFinal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_budget_fAppFinal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_budget_fAppFinal";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve Budget", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;util_gridLib");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Pengajuan","Data Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:7,tag:9,		            
				colTitle:["Pilih","No Pengajuan","Tanggal","No Dokumen","Deskripsi","Progress","Nilai"],
				colWidth:[[6,5,4,3,2,1,0],[100,100,300,120,100,120,70]],
				readOnly:true,
				colFormat:[[0,6],[cfButton,cfNilai]],
				click:[this,"doSgBtnClick3"], colAlign:[[0],[alCenter]],
				dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
				
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","RETURN","NONAPP"], readOnly:true,tag:0});
		this.e_nb = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"No App", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc2.childPage[1],{bound:[20,10,550,60],caption:"Catatan",tag:9,readOnly:true});						

		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,5,995,310], childPage:["Rekap RRA","Pemberi","Penerima","File Dok","Cattn. Appr"]});						
		this.e_noaju = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,202,20],caption:"No Pengajuan",maxLength:30,readOnly:true});
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Tanggal", readOnly:true});		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", readOnly:true});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Deskripsi", readOnly:true});						
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", readOnly:true, tag:2});								
		this.c_jenis = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,9,200,20],caption:"Jenis Budget", readOnly:true});		
		this.e_donor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Total Pemberi", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_terima = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Nilai Penerima", readOnly:true, tipeText:ttNilai, text:"0"});		

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
		            colTitle:["Kode MTA","Nama MTA","Kode PP","Nama PP","Kode DRK","Nama DRK","TW","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,200,80,150,80,180,80]],					
					readOnly:true,
					colFormat:[[7],[cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.sg4 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:0,
					colTitle:["Kode MTA","Nama MTA","Kode PP","Nama PP","Kode DRK","Nama DRK","TW","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,200,80,150,80,180,80]],					
					readOnly:true, colFormat:[[7],[cfNilai]],					
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});				

		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3],[]],					
					colFormat:[[3],[cfButton]], 
					click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]],
					readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgctt = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
				colTitle:["Catatan"],
				colWidth:[[0],[100]],					
				readOnly:true,autoAppend:false,defaultRow:1});					        
					
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		
		try {
			this.gridLib = new util_gridLib();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);

			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.stsBoleh = "1";
			var data = this.dbLib.getDataProvider("select kode_spro,flag,keterangan from spro where kode_spro in ('GARAPP') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																												
					if (line.kode_spro == "GARAPP") {
						if (line.flag != this.app._userLog) {
							this.stsBoleh = "0";
							system.alert(this,"Akse menu tidak valid.","Menu hanya untuk NIK Approval Budget.");
							return false;							
						}
					}
				}
			}
				
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.doLoadCtt(this.e_noaju.getText());  

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_budget_fAppFinal.extend(window.childForm);
window.app_saku3_transaksi_yakes21_budget_fAppFinal.implement({	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{									
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_app_m","no_app",this.app._lokasi+"-APG"+this.e_periode.getText().substr(2,4)+".","0000"));															
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
									
					if (this.c_status.getText() == "APPROVE") var vStatus = "2"; 
					if (this.c_status.getText() == "RETURN") var vStatus = "A";	
					if (this.c_status.getText() == "NONAPP") var vStatus = "Z";			
					
					if (this.c_jenis.getText() == "ANGGARAN") var jenis = "RRA";											
					else var jenis = "RRRMULTI";
					
					sql.add("update rra_app_m set no_flag='"+this.e_nb.getText()+"' where no_pdrk='"+this.e_noaju.getText()+"' and no_flag='-' and modul='APPGAR' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into rra_app_m (no_app, kode_lokasi, tanggal, keterangan, modul, periode, no_pdrk, nik_buat, nik_app, nik_user, tgl_input, jenis_form, status, no_flag) values "+		
							"('"+this.e_nb.getText()+"', '"+this.app._lokasi+"', '"+this.dp_d1.getDateString()+"', '"+this.e_memo.getText()+"', 'APPGAR', '"+this.e_periode.getText()+"', '"+this.e_noaju.getText()+"', '"+this.app._userLog+"', '-', '"+this.app._userLog+"', getdate(), 'APPGAR','"+vStatus+"','-')");
					sql.add("update rra_pdrk_m set progress='"+vStatus+"',no_app2='"+this.e_nb.getText()+"' where no_pdrk='"+this.e_noaju.getText()+"' ");												
					
					if (this.c_status.getText() == "NONAPP") {
						//direject langsung oleh unit budget / grounded.. usulan dikembalikan lg
						if (this.c_jenis.getText() == "ANGGARAN") {
							sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) "+		
									"select no_agg,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,volume,periode,nilai_sat,nilai,'D',satuan,'"+this.app._userLog+"',getdate(),'X-"+jenis+"' "+
									"from anggaran_d "+
									"where no_agg='"+this.e_noaju.getText()+"' and dc ='C'");
						}
						else {
							sql.add("insert into angg_r (no_bukti, modul, kode_lokasi, kode_akun, kode_pp, kode_drk, periode1, periode2, dc, saldo, nilai) "+
								 	"select no_bukti, modul, kode_lokasi, kode_akun, kode_pp, kode_drk, periode1, periode2, 'D', 0, nilai "+
									"from angg_r "+
									"where no_bukti='"+this.e_noaju.getText()+"' and dc='C'");					
						}
					}

					if (this.c_status.getText() == "APPROVE") {		
						if (this.c_jenis.getText() == "ANGGARAN") {				
							sql.add("insert into anggaran_d(no_agg,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) "+		
									"select no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,1,periode,nilai,nilai,dc,'-','"+this.app._userLog+"',getdate(),'"+jenis+"' "+
									"from rra_pdrk_d "+
									"where no_pdrk='"+this.e_noaju.getText()+"' and dc='D'");
						}

						//langsung rilis
						sql.add("insert into angg_r (no_bukti, modul, kode_lokasi, kode_akun, kode_pp, kode_drk, periode1, periode2, dc, saldo, nilai) "+
								"select no_pdrk,'RELEASE',kode_lokasi,kode_akun,kode_pp,kode_drk,periode,periode,'D',0,nilai "+
								"from rra_pdrk_d "+
								"where no_pdrk='"+this.e_noaju.getText()+"' and dc='D'");														
					}

					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_noaju);			
					this.sg.clear(1); 					
					this.sg4.clear(1);	
					this.sgUpld.clear(1);						
					this.e_memo.setText("");			
					setTipeButton(tbAllFalse);								
					this.doLoad3();
					this.pc2.setActivePage(this.pc2.childPage[0]);				
					this.pc1.setActivePage(this.pc1.childPage[0]);				
				break;
			case "simpan" :					
			case "ubah" :	
				this.preView = "1";
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;								
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {		
			if (m < 10) m = "0" + m;			
			this.e_periode.setText(y+""+m);			
			this.doLoad3();			
		}
		catch(e) {
			alert(e);
		}
	},						
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(7,i) != ""){					
					totD += nilaiToFloat(this.sg4.cells(7,i));
				}
			}						
			
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != ""){					
					totC += nilaiToFloat(this.sg.cells(7,i));
				}
			}						

			this.e_terima.setText(floatToNilai(totD));
			this.e_donor.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},   		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){									
							if (this.preView == "1") {										
								// this.nama_report = "server_report_saku3_rra_rptAggDis";
								// this.filter = " where a.kode_lokasi='" + this.app._lokasi + "' and a.no_pdrk='" + this.e_noaju.getText() + "' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report, this.filter, 1, this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report, this.filter, 1, 1, this.showFilter, this.app._namalokasi, this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();								
							}
							else {
								system.info(this, "Transaksi telah sukses tereksekusi (No Bukti : " + this.e_noaju.getText() + ")", "");
								this.clearLayar();
							}
						}						
	    			break;									
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :				
				this.pc2.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_noaju);			
			this.sg.clear(1); 			
			this.sg4.clear(1);		
			this.sgUpld.clear(1);				
			this.e_memo.setText("");									
			setTipeButton(tbAllFalse);								
			this.doLoad3();
			this.pc2.setActivePage(this.pc2.childPage[0]);				
			this.pc1.setActivePage(this.pc1.childPage[0]);				
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){		
		//nik login sesuai spro GARAPP
		if (this.stsBoleh == "1") {																				
			var strSQL = "select a.no_pdrk,convert(varchar,a.tanggal,103) as tgl,b.no_dokumen,a.keterangan,case a.progress when '1' then 'Pengajuan' end as progress,a.tanggal,b.nilai "+
						"from rra_pdrk_m a "+
						"inner join anggaran_m b on a.no_pdrk=b.no_agg "+					 					 					 						
						"where a.modul = 'PUSAT' and a.progress = '1'  order by a.tanggal";					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU3 = data;
				this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn3.rearrange();
				this.doTampilData3(1);
			} else this.sg3.clear(1);	
		}				
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData(["Pilih",line.no_pdrk,line.tgl,line.no_dokumen,line.keterangan,line.progress.toUpperCase(),floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 0) {
				this.doDoubleClick3(this.sg3,1,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
								
				this.c_status.setFocus();
				setTipeButton(tbSimpan);			
				
				this.e_noaju.setText(this.sg3.cells(1,row));
				this.e_tgl.setText(this.sg3.cells(2,row));																											
				this.e_memo.setText(this.sg3.cells(4,row));

				this.doLoadCtt(this.e_noaju.getText()); 

				var strSQL = "select b.no_dokumen,a.nik_app1,a.tanggal,a.keterangan,a.jenis_agg "+
							 "from rra_pdrk_m a inner join anggaran_m b on a.no_pdrk=b.no_agg  "+							 
							 "inner join karyawan c on a.nik_app1=c.nik "+
							 "where a.no_pdrk='"+this.e_noaju.getText()+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.c_jenis.setText(line.jenis_agg);
						this.cb_app.setText(line.nik_app1,line.nama);					
						this.dp_d1.setText(line.tanggal);	
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);							
					}
				}

				var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_pp,b.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai "+
							 "from rra_pdrk_d a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "				    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "				    inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
							 "where a.no_pdrk='"+this.e_noaju.getText()+"' and a.dc ='C' ";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear(1);
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						if (line.bulan == "01")	var tw = "TW1";
						if (line.bulan == "04")	var tw = "TW2";
						if (line.bulan == "07")	var tw = "TW3";
						if (line.bulan == "10")	var tw = "TW4";				
						this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,tw,floatToNilai(line.nilai)]);						
					}
				} else this.sg.clear(1);	
				
				var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_pp,b.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai "+
							 "from rra_pdrk_d a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "				    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "				    inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
							 "where a.no_pdrk='"+this.e_noaju.getText()+"' and a.dc ='D' ";					
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg4.clear(1);
					for (var i in data.rs.rows){
						line = data.rs.rows[i];		
						if (line.bulan == "01")	var tw = "TW1";
						if (line.bulan == "04")	var tw = "TW2";
						if (line.bulan == "07")	var tw = "TW3";
						if (line.bulan == "10")	var tw = "TW4";				
						this.sg4.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,tw,floatToNilai(line.nilai)]);
					}
				} else this.sg4.clear(1);

				this.sg.validasi();

				this.sgUpld.clear(); 
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join inv_dok_jenis b on a.kode_jenis=b.kode_jenis "+
							 "where a.no_bukti = '"+this.e_noaju.getText()+"'  order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar,"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);
											
			}									
		} catch(e) {alert(e);}
	},
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal "+
						 "from rra_app_m "+
						 "where no_pdrk='"+kode+"' and no_app<>'"+this.noAppLama+"' "+
						 "order by convert(varchar,tanggal,103) desc";	
			
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 350px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select keterangan as catatan,no_app as no_ver, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_app as nik_user "+
								  "from rra_app_m "+
								  "where no_pdrk='"+kode+"' and tanggal='"+line.tanggal+"' and no_app<>'"+this.noAppLama+"' "+
								  "order by tanggal desc,convert(varchar,tgl_input,108) desc ";	

					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_ver+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}
					
	}	
});
