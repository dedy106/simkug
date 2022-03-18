window.app_saku3_transaksi_bangtel_barang_fAppPO = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_bangtel_barang_fAppPO.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bangtel_barang_fAppPO";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval BOD", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		uses("saiCBBL",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,407], childPage:["Daftar PO","Data PO","Data Proyek","File Dok"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:9,
		            colTitle:["No PO","Status","Tanggal","PP","No Dokumen","Deskripsi","Nilai","Pembuat","No Approve","Tgl Input","Kode PP"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[50,110,100,150,100,300,100,150,70,80,100]],
					colHide:[[1,8,10],[true,true,true]],
					readOnly:true,colFormat:[[6],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
				
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:0});
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No Approval", readOnly:true,visible:false});						
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,10,450,60],caption:"Catatan",tag:9,readOnly:true});				
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"No PO", readOnly:true});				
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[250,12,220,20],caption:"Total PO", readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"No Dokumen", readOnly:true});		
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[250,14,220,20],caption:"Tgl PO", readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Deskripsi", readOnly:true});				
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,450,20],caption:"PP/Unit", readOnly:true});		
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Vendor", readOnly:true});		
		this.e_buat = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"Pembuat", readOnly:true});

		this.sg4 = new saiGrid(this.pc1.childPage[1], {
			bound: [1, 5, this.pc1.width - 5, 185], colCount: 8, tag: 0,
			colTitle: ["ID Pesan", "Kd Barang", "Nama Barang", "Satuan", "Spesifikasi", "Jumlah", "Harga", "Total"],
			colWidth: [[7, 6, 5, 4, 3, 2, 1, 0], [100, 100, 100, 280, 60, 200, 80, 60]],
			colHide: [[0], [true]],			
			colFormat: [[5, 6, 7], [cfNilai, cfNilai, cfNilai]],			
			readOnly:true, 
			autoAppend: false, defaultRow: 1
		});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1], { bound: [1, this.pc1.height - 25, this.pc1.width - 1, 25], buttonStyle: 3, grid: this.sg4 });
		
		this.e_kodeproyek = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"Proyek", readOnly:true, tag:1});	
		this.e_nama = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,450,20],caption:"Deskripsi", readOnly:true, tag:1});	
		this.e_kontrak = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,450,20],caption:"No Kontrak", readOnly:true, tag:1});	
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"Total RAB", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_pakai = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"Real. Biaya", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.e_cust = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,450,20],caption:"Customer", readOnly:true, tag:1});	
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,450,20],caption:"Cabang", readOnly:true, tag:1});	

		this.sg1mp2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-4,this.pc1.height-35],colCount:4,readOnly:true,tag:9,
				colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad"],
				colWidth:[[3,2,1,0],[80,480,200,80]],
				rowCount:1,colFormat:[[3],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3,pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            
		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);
				
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
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();		
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";

			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);	
			
		}catch(e){
			systemAPI.alert(e);
		}		
	}
};
window.app_saku3_transaksi_bangtel_barang_fAppPO.extend(window.childForm);
window.app_saku3_transaksi_bangtel_barang_fAppPO.implement({	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();									
					
					if (this.c_status.getText() == "RETURN") var vStatus = "D"; else var vStatus = "1";

					sql.add("update spm_app_m set no_flag='"+this.e_nb.getText()+"' where no_bukti='"+this.e_nobukti.getText()+"' and no_flag='-' and form='APPLOG' and modul='APPLOG' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into spm_app_m (no_app,kode_lokasi,tanggal,periode,tgl_input,nik_user,status,modul,form,no_bukti,catatan,no_flag,nik_bdh,nik_fiat) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.app._userLog+"','"+vStatus+"','APPLOG','APPLOG','"+this.e_nobukti.getText()+"','"+this.e_memo.getText()+"','-','X','X')");																	
					sql.add("update log_spk_m set no_app='"+this.e_nb.getText()+"',flag_revisi='"+vStatus+"' where no_spk='"+this.e_nobukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																	
					
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg1mp2.clear(1); this.sg.clear(1); this.sg4.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.e_memo.setText("");
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :								
				this.preView = "1";								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																				
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else 
				this.simpan();				
				break;				
				
			case "simpancek" : this.simpan();			
				break;							
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
		if (this.stsSimpan == 1) {
			this.doLoad();
			this.doClick();		
		}
	},		
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spm_app_m","no_app",this.app._lokasi+"-LOG"+this.e_periode.getText().substr(2,4)+".","0000"));												
		this.e_memo.setFocus();								
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);											
				this.e_nobukti.setText(this.sg.cells(0,row));
				if (this.sg.cells(1,row) == "RETURN") this.c_status.setText(this.sg.cells(1,row));								
				else this.c_status.setText("APPROVE");								
				
				this.e_tgl.setText(this.sg.cells(2,row));
				this.e_pp.setText(this.sg.cells(3,row));
				this.e_dok.setText(this.sg.cells(4,row));
				this.e_ket.setText(this.sg.cells(5,row));
				this.e_nilai.setText(this.sg.cells(6,row));				
				this.e_buat.setText(this.sg.cells(7,row));										
				this.noAppLama = this.sg.cells(8,row);						
				this.kodePPBukti = this.sg.cells(10,row);
				this.e_memo.setText(this.sg.cells(4,row));	
												
				var strSQL = "select b.kode_vendor+' | '+b.nama as vendor, a.no_pesan "+
							"from log_spk_m a  inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi " +														
							"where a.no_spk = '" + this.e_nobukti.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "'";
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];
					if (line != undefined) {
						this.e_vendor.setText(line.vendor);						
						var strSQL = "select a.kode_proyek, a.nama, a.no_pks, b.nama as cust, d.nama as cabang "+
									 "from spm_proyek a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
									 "				   inner join log_pesan_m c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi "+
									 "				   inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
									 "where c.no_pesan ='"+line.no_pesan+"' and c.kode_lokasi='"+this.app._lokasi+"'";						   
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){				
								this.e_kodeproyek.setText(line.kode_proyek);
								this.e_nama.setText(line.nama);
								this.e_kontrak.setText(line.no_pks);						
								this.e_cust.setText(line.cust);		
								this.e_cabang.setText(line.cabang);						
							}
							else {
								this.e_kodeproyek.setText("-");
								this.e_nama.setText("-");
								this.e_kontrak.setText("-");						
								this.e_cust.setText("-");	
								this.e_cabang.setText("-");											
							}
						}

						var strSQL = "select a.nilai_or,isnull(c.bdd,0) as bdd "+
									"from spm_proyek a inner join spm_proyek_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+								
									"           	    left join ("+
									"							select kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as bdd "+
									"                       	from spm_proyek_bdd "+
									"							where kode_lokasi='"+this.app._lokasi+"' group by kode_proyek "+
									"							 ) c on a.kode_proyek=c.kode_proyek "+						 
									"where a.kode_proyek= '"+line.kode_proyek+"' and a.kode_lokasi='"+this.app._lokasi+"'";													
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){																			
								this.e_nilaior.setText(floatToNilai(line.nilai_or));
								this.e_pakai.setText(floatToNilai(line.bdd));
							}
							else {
								this.e_nilaior.setText("0");
								this.e_pakai.setText("0");
							}
						}
												
					}
				}
				
				var strSQL = "select b.kode_barang,b.nama,a.no_urut,a.item,a.merk,a.tipe as satuan,a.catatan,a.jumlah,a.harga as nilai,a.ppn,a.jumlah*a.harga as total " +
							"from log_spk_d a " +
							"inner join brg_barang b on a.kode_klpfa=b.kode_barang and a.kode_lokasi=b.kode_lokasi " +
							"where a.no_spk ='" + this.e_nobukti.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' order by a.no_urut";		
				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					var line2;
					this.sg4.clear();
					for (var i in data.rs.rows) {
						line2 = data.rs.rows[i];
						this.sg4.appendData([line2.no_urut, line2.kode_barang, line2.nama, line2.satuan, line2.catatan, floatToNilai(line2.jumlah), floatToNilai(line2.nilai), floatToNilai(line2.total)]);
					}
				} else this.sg4.clear(1);

				this.sg1mp2.clear();
				var data = this.dbLib.getDataProvider(
						"select b.kode_jenis,b.nama,a.no_gambar " +
						"from log_pesan_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi " +
						"where a.no_pesan = '" + this.e_nobukti.getText() + "' and a.kode_lokasi='" + this.app._lokasi + "' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1mp2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													 
						this.sg1mp2.appendData([line.kode_jenis, line.nama, line.no_gambar, "DownLoad"]);
					}
				} else this.sg1mp2.clear(1);
			
				if (this.sg.cells(1,row) == "INPROG") {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}				
				
			}
		} catch(e) {alert(e);}
	},			
	doLoad:function(sender){	
		try {								
			var strSQL = "select a.no_spk, case a.flag_revisi when '0' then 'INPROG' end as status, convert(varchar,a.tanggal,103) as tgl,c.kode_pp,c.kode_pp+' | '+c.nama as pp,a.no_dokumen,a.keterangan,a.nilai as total,a.nik_buat+' | '+d.nama as pembuat,a.no_app,convert(varchar,a.tgl_input,112) as tglinput  "+
						 "from log_spk_m a "+
						 "inner join log_pesan_m b on a.no_pesan=b.no_pesan and a.kode_lokasi=b.kode_lokasi "+
						 "inner join pp c on b.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi "+
						 "where a.flag_revisi='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' order by a.tanggal";												
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
			
		}
		catch(e) {
			alert(e);
		}							
	},							
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];		
			this.sg.appendData([line.no_spk,line.status.toUpperCase(),line.tgl,line.pp,line.no_dokumen,line.keterangan,floatToNilai(line.total),line.pembuat,line.no_app,line.tglinput,line.kode_pp]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								//this.nama_report="server_report_saku3_hutang_rptSpbForm";									                  
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spb='"+this.e_nb.getText()+"' ";
								this.filter2 = "";								
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;			
								this.pc1.hide();   								
							}
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
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
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg1mp2.clear(1); this.sg.clear(1); this.sg4.clear(1); 
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			this.e_memo.setText("");
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	}
});

