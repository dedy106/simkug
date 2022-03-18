window.app_saku3_transaksi_siaga_simlog_fPbAppLogTU = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_simlog_fPbAppLogTU.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_simlog_fPbAppLogTU";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve Purchase Request", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		this.l_tgl1 = new portalui_label(this,{bound:[20,10,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,440], childPage:["Daftar PR","Data Approval","Cari Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:11,tag:0,
		            colTitle:["No PR","Status","Tanggal","Modul","PP","No Dokumen","Deskripsi","Nilai","Pembuat","No App","Mengetahui"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[120,100,120,100,320,120,150,70,70,80,100]],
					readOnly:true,colFormat:[[7],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Status",items:["APPROVE","RETURN"], readOnly:true,tag:2}); 
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[20,13,450,37],caption:"Catatan Approve",tag:9,readOnly:true});		
		this.e_proyek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,22,450,20],caption:"Proyek", readOnly:true});				
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"No Approve", readOnly:true});				
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,12,200,20],caption:"Modul", readOnly:true});						
		this.e_curr = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,200,20],caption:"Kode Curr", readOnly:true});						
		this.e_kurs = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,12,200,20],caption:"Kurs PR", readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_noreq = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"No PR", readOnly:true});		
		this.e_nilaiCurr = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,11,200,20],caption:"Nilai Req. Curr", readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[770,11,200,20],caption:"Nilai Req. IDR", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Tgl PR", readOnly:true});
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"No Dokumen", readOnly:true});
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"PP/Unit", readOnly:true});
		this.e_buat = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,11,450,20],caption:"Pembuat", readOnly:true});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Deskripsi", readOnly:true});
		this.e_tahu = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Mengetahui", readOnly:true});

		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[2,18,995,203], childPage:["Data Budget","Detail PR","Maksud-Tujuan","Aspek Strategis"]});		
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,170],colCount:5,tag:9,
					colTitle:["Kode Akun","Nama Akun","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[4,3,2,1,0],[100,100,100,500,100]],
					readOnly:true,colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});

		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,
					colTitle:["Item Barang","Merk","Tipe","Spesifikasi","Jumlah","Hrg Curr","Total Curr"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,60,180,180,180,180]],															
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
					readOnly:true,					
					autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3});		

		this.mDesk1 = new tinymceCtrl(this.pc2.childPage[2],{bound:[1,5,990,303], withForm:false});
		this.mDesk2 = new tinymceCtrl(this.pc2.childPage[3],{bound:[1,5,990,303], withForm:false});

		this.c_status2 = new saiCB(this.pc1.childPage[2],{bound:[20,10,202,20],caption:"Status",items:["INPROG","APPROVE","RETURN"], readOnly:true,tag:9});
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,15,450,20],caption:"Deskripsi",tag:9});		
		this.bCari = new button(this.pc1.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		

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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_status.setText("");			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_simlog_fPbAppLogTU.extend(window.childForm);
window.app_saku3_transaksi_siaga_simlog_fPbAppLogTU.implement({	
	mainButtonClick: function(sender, desk){
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
					
					if (this.c_status.getText()=="APPROVE") var prog = "1";	
					else var prog = "R";																				
					
					
					if (this.e_modul.getText() == "LOGREQ") {
						sql.add("update log_pesan_m set progress='"+prog+"',no_app='"+this.e_nb.getText()+"' where no_pesan='"+this.e_noreq.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						var modul = 'LOGREQ_APP';
					}
					
					sql.add("update a set no_appseb ='"+this.e_nb.getText()+"' "+
							"from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and a.no_appseb='-' "+
							"where b.no_bukti ='"+this.e_noreq.getText()+"' and b.modul='"+modul+"' and b.kode_lokasi='"+this.app._lokasi+"'");												

					sql.add("insert into app_m (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_appseb) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','"+modul+"','-')");
					sql.add("insert into app_d (no_app,status,modul,no_bukti,kode_lokasi,catatan) values "+
							"('"+this.e_nb.getText()+"','"+prog+"','"+modul+"','"+this.e_noreq.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");
										
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
					this.sg2.clear(1);
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.c_status.setText("");
					this.e_memo.setText("");
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1"; 
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);												
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";

				if (this.e_modul.getText() == "LOGREQ") {
					var data = this.dbLib.getDataProvider("select distinct progress from log_pesan_m where progress not in ('1','R') and no_pesan='"+this.e_noreq.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																				
							system.alert(this,"Transaksi tidak valid.","No Pengajuan LOGREQ sudah diprogress lain.");
							return false;							
						}
					}
				}

				uses("server_util_arrayList");
				var sql = new server_util_arrayList();												
				if (this.e_modul.getText() == "LOGREQ") {
					sql.add("update log_pesan_m set progress='0',no_app='-' where no_pesan='"+this.e_noreq.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					var modul = "LOGREQ_APP";
				}				
				var data = this.dbLib.getDataProvider("select a.no_app from app_m a inner join app_d b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi and b.no_bukti='"+this.e_noreq.getText()+"' "+
													  "where a.no_appseb='-' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='"+modul+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						sql.add("delete from app_m where no_app='"+line.no_app+"' and kode_lokasi='"+this.app._lokasi+"'");									
						sql.add("delete from app_d where no_app='"+line.no_app+"' and kode_lokasi='"+this.app._lokasi+"'");									
					}
				}				
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.doClick();
		this.doLoad();
	},	
	doClick:function(sender){
		if (this.e_noreq.getText()!="") {						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"app_m","no_app",this.app._lokasi+"-APP"+this.e_periode.getText().substr(2,4)+".","0000"));									
			this.c_status.setFocus();						
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				
				this.e_noreq.setText(this.sg.cells(0,row));								
				this.e_tgl.setText(this.sg.cells(2,row));				
				this.e_pp.setText(this.sg.cells(4,row));
				this.e_dok.setText(this.sg.cells(5,row));
				this.e_ket.setText(this.sg.cells(6,row));
				this.e_nilai.setText(this.sg.cells(7,row));
				this.e_buat.setText(this.sg.cells(8,row));						
				this.e_modul.setText(this.sg.cells(3,row));
				//this.e_tahu.setText(this.app._userLog+" - "+this.app._namaUser);
				this.e_tahu.setText(this.sg.cells(10,row));						
				this.stsProg = this.sg.cells(1,row);	
				
				var strSQL = "select no_urut,item,merk,tipe,catatan,jumlah,nilai,jumlah*nilai as total from log_pesan_d where no_pesan='"+this.e_noreq.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut";							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line2;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line2 = data.rs.rows[i];												
						this.sg3.appendData([line2.item,line2.merk,line2.tipe,line2.catatan,floatToNilai(line2.jumlah),floatToNilai(line2.nilai),floatToNilai(line2.total)]);
					}
				} else this.sg3.clear(1);

				var strSQL = "select a.nilai_curr,a.kode_curr,a.kurs, a.maksud, a.aspek, a.kode_proyek+' - '+b.nama as proyek, isnull(c.catatan,'-') as catatan "+
							 "from log_pesan_m a "+
							 "	   inner join log_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi "+
							 "	   left join app_d c on c.no_app=a.no_app and a.kode_lokasi=c.kode_lokasi and c.modul ='LOGREQ_APP' "+
							 "where a.no_pesan = '"+this.e_noreq.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){														
						this.e_proyek.setText(line.proyek);
						this.e_memo.setText(line.catatan);
						this.mDesk1.setCode(urldecode(line.maksud));
						this.mDesk2.setCode(urldecode(line.aspek));
						this.e_curr.setText(line.kode_curr);
						this.e_kurs.setText(floatToNilai(line.kurs));
						this.e_nilaiCurr.setText(floatToNilai(line.nilai_curr));
					}
				}

				this.doClick();
				if (this.stsProg == "APPROVE" || this.stsProg == "RETURN") {
					setTipeButton(tbUbahHapus);
					this.stsSimpan = 0;
				}
				else {
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
				}
				
				var modulGar = this.e_modul.getText();
				
				var data = this.dbLib.getDataProvider(
							"select a.kode_akun,b.nama as nama_akun,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
							"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+						
							"where a.no_bukti = '"+this.e_noreq.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='"+modulGar+"' order by a.kode_akun",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_akun,line.nama_akun,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
					}
				} else this.sg2.clear(1);						
				
								
			}
		} catch(e) {alert(e);}
	},		
	doLoad:function(sender){												
		if (this.app._userStatus == "A") var nikApp = ""; else var nikApp = " a.nik_app = '"+this.app._userLog+"' and "; 
		var strSQL = "select a.tanggal,a.no_pesan,'INPROG' as status,convert(varchar,a.tanggal,103) as tgl,'LOGREQ' as modul,d.kode_pp+' | '+d.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' | '+c.nama as pembuat,cc.nik+' | '+cc.nama as nik_tahu,a.no_app "+ 
					 "from log_pesan_m a "+
					 "		inner join karyawan c on a.nik_ttd1=c.nik and a.kode_lokasi=c.kode_lokasi "+
					 "		inner join karyawan cc on a.nik_ttd2=cc.nik and a.kode_lokasi=cc.kode_lokasi "+
					 "		inner join pp  d on a.kode_ppaju=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+					 
					 "where "+nikApp+" a.progress='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' "+					 
					 "order by a.tanggal";		

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},		
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.no_pesan,line.status.toUpperCase(),line.tgl,line.modul.toUpperCase(),line.pp,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),line.pembuat,line.no_app,line.nik_tahu]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doCari:function(sender){						
		var filter = "";
		if (this.c_status2.getText() == "INPROG") filter = " and a.progress = '0' "; 
		if (this.c_status2.getText() == "APPROVE") filter = " and a.progress = '1' "; 
		if (this.c_status2.getText() == "RETURN") filter = " and a.progress = 'R'  "; 		

		if (this.e_ket2.getText()!="") filter = " and a.keterangan like '%"+this.e_ket2.getText()+"%' ";						
		if (this.app._userStatus == "A") var nikApp = ""; else var nikApp = " a.nik_app = '"+this.app._userLog+"' and "; 

		var strSQL = "select a.tanggal,a.no_pesan,"+
		             "case when a.progress = '0' then 'INPROG' "+
					 "     when a.progress = '1' then 'APPROVE' "+
					 "     when a.progress = 'R' then 'RETURN' "+
					 "end as status,"+
					 "convert(varchar,a.tanggal,103) as tgl,'LOGREQ' as modul,b.kode_pp+' | '+b.nama as pp,a.no_dokumen,a.keterangan,a.nilai,c.nik+' | '+c.nama as pembuat,a.no_app "+					 
		             "from log_pesan_m a inner join pp b on a.kode_ppaju=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "					 inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+					 
					 "where "+nikApp+" a.kode_lokasi='"+this.app._lokasi+"' "+filter+" "+					 
					 "order by a.tanggal";							
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	},
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}									
								if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
								
								this.nama_report="server_report_saku3_siaga_simlog_rptApp";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_app='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
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
								this.pc2.hide();
							} 
							else {
								if (this.fileBfr && this.dataUpload) {
									if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
								}
								system.info(this,"Transaksi telah sukses tereksekusi (No PR : "+ this.e_nb.getText()+")","");							
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
			this.sg2.clear(1);
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.c_status.setText("");
			this.e_memo.setText("");
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	}
});