window.app_saku3_transaksi_yakes21_aktap_fAppWO = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_aktap_fAppWO.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_aktap_fAppWO";		
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Approve Penghapusan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Pengajuan","Data Jurnal","Cari Bukti"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:8,tag:9,
		            colTitle:["Pilih","Lok. Aktap","No Pengajuan","Tanggal","No Dokumen","Deskripsi","Nilai","Status"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,100,300,100,80,100,100,70]],
					colFormat:[[0,6],[cfButton,cfNilai]],readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[0],[alCenter]],
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,18,450,20],caption:"No Dokumen", maxLength:50});						
		this.e_status = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,18,200,20],caption:"Status WO", tag:1, readOnly:true });								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:200});						
		this.e_aktap = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,17,200,20],caption:"Nilai Perolehan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.cb_akun = new saiCBBL(this.pc2.childPage[1],{bound:[20,16,220,20],caption:"Akun Aktiva", multiSelection:false, maxLength:10, tag:2});						
		this.e_inven = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,16,200,20],caption:"Nilai Inventaris", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.e_noaju = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,18,200,20],caption:"No Pengajuan", readOnly:true,});						
		this.e_akum = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,18,200,20],caption:"Akum. Susut", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.cb_lokasi = new saiCBBL(this.pc2.childPage[1],{bound:[20,16,220,20],caption:"Lok. Aktap", readOnly:true});								
		this.e_total = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,16,200,20],caption:"Net Jurnal", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,12,995,259], childPage:["Item Aktap","Otorisasi","File Dok"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		            colTitle:["ID Aktap","Nama","Tgl Perolehan","Nilai Aktap","Akum. Susut","Catatan","Jenis","Akun Aktap"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,80,150,100,100,80,230,120]],					
					readOnly:true,					
					colFormat:[[3,4],[cfNilai,cfNilai]],checkItem: true,
					nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});				
		
		this.cb_buat = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2});						
		this.cb_app = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});								

		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3],[]],					
					colFormat:[[3],[cfButton]], 
					click:[this,"doSgBtnClickUpld"], colAlign:[[3],[alCenter]],
					readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.cb_nb = new saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"No Approve", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");			
			this.standarLib = new util_standar();
			this.stsSimpan = 1;						
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='034' where a.kode_lokasi='"+this.app._lokasi+"' and a.block='0'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_lokasi.setSQL("select kode_lokasi,nama from lokasi where flag_konsol='0'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.cb_buat.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app.setSQL("select nik,nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			
			this.cb_buat.setText(this.app._userLog);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_aktap_fAppWO.extend(window.childForm);
window.app_saku3_transaksi_yakes21_aktap_fAppWO.implement({			
	doSgBtnClickUpld: function(sender, col, row){
		try{
			if (col === 3) window.open("server/media/"+this.sgUpld.getCell(2,row));
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("update fa_woaju_m set progress='0',no_app='-' where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");						
						sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");												
						sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");																		
					}					
					
					sql.add("update fa_woaju_m set progress='1',no_app='"+this.e_nb.getText()+"' where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");
					sql.add("insert into ju_m (no_ju, kode_lokasi, no_dokumen, tanggal, keterangan, kode_pp, modul, jenis, periode, kode_curr, kurs, nilai, nik_buat, nik_setuju, tgl_input, nik_user, posted, ref1, atensi) values "+
							"('"+this.e_nb.getText()+"', '"+this.cb_lokasi.getText()+"', '"+this.e_dok.getText()+"', '"+this.dp_d1.getDateString()+"', '"+this.e_ket.getText()+"', '"+this.app._kodePP+"', 'WOAPP', 'APP', '"+this.e_periode.getText()+"', 'IDR', 1, "+nilaiToFloat(this.e_total.getText())+", '"+this.cb_buat.getText()+"', '"+this.cb_app.getText()+"', getdate(), '"+this.app._userLog+"', 'F', '"+this.cb_akun.getText()+"','-')")

					sql.add("insert into ju_j (no_ju, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, kode_curr, kurs, nik_user, tgl_input) values "+
							"('"+this.e_nb.getText()+"', '"+this.e_dok.getText()+"', '"+this.dp_d1.getDateString()+"', 0, '"+this.cb_akun.getText()+"', '"+this.e_ket.getText()+"', 'D', "+nilaiToFloat(this.e_total.getText())+", '"+this.app._kodePP+"', '-', '"+this.cb_lokasi.getText()+"', 'WOAPP', 'AKTAPLAIN', '"+this.e_periode.getText()+"', 'IDR', 1, '"+this.app._userLog+"', getdate())");

					sql.add("insert into ju_j (no_ju, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, kode_curr, kurs, nik_user, tgl_input) "+					
							"select  '"+this.e_nb.getText()+"', '"+this.e_dok.getText()+"', '"+this.dp_d1.getDateString()+"', 1, e.akun_deprs, '"+this.e_ket.getText()+"', 'D', sum(d.akum_susut), b.kode_pp, '-', b.kode_lokasi, 'WOAPP', 'AKUM', '"+this.e_periode.getText()+"', 'IDR', 1, '"+this.app._userLog+"', getdate() "+
							"from fa_woaju_d a "+
							"	 inner join fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
							"	 inner join fa_klp c on b.kode_klpfa=c.kode_klpfa "+
							"	 inner join fa_klpakun e on c.kode_klpakun=e.kode_klpakun "+
							"	 left join ("+
							"				select no_fa,sum(case dc when 'D' then nilai else -nilai end) as akum_susut "+
							"				from fasusut_d "+
							"				group by no_fa "+
							"				) d on a.no_fa=d.no_fa  "+
							"where b.jenis='A' and a.no_aju='"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' "+							
							"group by e.akun_deprs,b.kode_pp,b.kode_lokasi");

					sql.add("insert into ju_j (no_ju, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, nilai, kode_pp, kode_drk, kode_lokasi, modul, jenis, periode, kode_curr, kurs, nik_user, tgl_input) "+
							"select '"+this.e_nb.getText()+"', '"+this.e_dok.getText()+"', '"+this.dp_d1.getDateString()+"', 1, e.kode_akun, '"+this.e_ket.getText()+"', 'C', sum(zz.nilai), b.kode_pp, '-', b.kode_lokasi, 'WOAPP', 'ASET', '"+this.e_periode.getText()+"', 'IDR', 1, '"+this.app._userLog+"', getdate() "+
							"from fa_woaju_d a "+
							"	 inner join fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+
							"	 inner join fa_klp c on b.kode_klpfa=c.kode_klpfa "+
							"	 inner join fa_klpakun e on c.kode_klpakun=e.kode_klpakun "+
							"    inner join (select no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							"                from fa_nilai "+
							"				 where periode<='"+this.e_periode.getText()+"' "+
							"				 group by no_fa "+
							"				) zz on a.no_fa=zz.no_fa and a.kode_lokasi=zz.kode_lokasi "+
							"where b.jenis='A' and a.no_aju='"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' "+
							"group by e.kode_akun,b.kode_pp,b.kode_lokasi");

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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg1.clear(1); this.sg3.clear(1); 
					this.sgUpld.clear(1);											
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbAllFalse);
					this.doClick();
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";								
				this.sg1.validasi();					
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("update fa_woaju_m set progress='0',no_app='-' where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");						
				sql.add("delete from ju_m where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");												
				sql.add("delete from ju_j where no_ju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");																		
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);

		if (this.stsSimpan == 1) {
			this.doLoad3();		
			this.cb_nb.setSQL("select no_ju, keterangan from ju_m where modul ='WOAPP' and periode='"+this.e_periode.getText()+"' and posted ='F' ",["no_ju","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Approve",true);											
		}
	},
	doChange:function(sender){
		try {
			if (sender == this.e_periode  && this.stsSimpan ==1) this.doClick();	
			
			if (sender == this.cb_nb && this.cb_nb.getText() != "") {
				this.stsSimpan = 0;
				var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai,b.nama as lokasi,a.status "+
							"from fa_woaju_m a inner join lokasi b on a.kode_lokasi=b.kode_lokasi "+
							"where a.no_app='"+this.cb_nb.getText()+"' ";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU3 = data;
					this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn3.rearrange();
					this.doTampilData3(1);
				} else this.sg3.clear(1);							
				this.pc2.setActivePage(this.pc2.childPage[0]);				
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.cb_lokasi.getText()!="") {
			if (this.stsSimpan == 0) {					
				this.sg1.clear(1); this.sg3.clear(1);							
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ju_m","no_ju",this.cb_lokasi.getText()+"-AW"+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},		
	doNilaiChange1: function(){
		try{
			var aset = inventaris = akum = 0;			
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(3,i) != "" && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(6,i) == "ASET") aset += nilaiToFloat(this.sg1.cells(3,i));
					else inventaris += nilaiToFloat(this.sg1.cells(3,i));

					akum += nilaiToFloat(this.sg1.cells(4,i));					
				}
			}
			var net = aset - akum;
			this.e_aktap.setText(floatToNilai(aset));	
			this.e_inven.setText(floatToNilai(inventaris));	
			this.e_akum.setText(floatToNilai(akum));			
			this.e_total.setText(floatToNilai(net));			
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
								// this.nama_report="server_report_saku3_tu_bmhd_rptBuktiJurnalHU";
								// this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_hutang='"+this.e_nb.getText()+"' ";
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
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg1.clear(1); this.sg3.clear(1); 
			this.sgUpld.clear(1);									
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);	
			this.doLoad3();
			this.doClick();				
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){	
		try {																	
			var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.nilai,b.nama as lokasi,a.status "+
						 "from fa_woaju_m a inner join lokasi b on a.kode_lokasi=b.kode_lokasi "+				
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress ='0'";		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU3 = data;
				this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn3.rearrange();
				this.doTampilData3(1);
			} else this.sg3.clear(1);			
		}
		catch(e) {
			alert(e);
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
			this.sg3.appendData(["Pilih",line.lokasi,line.no_aju,line.tgl,line.no_dokumen,line.keterangan,floatToNilai(line.nilai),line.status]); 
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
			if (this.sg3.cells(1,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				
				this.e_noaju.setText(this.sg3.cells(2,row));								

				var strSQL = "select * from fa_woaju_m where no_aju = '"+this.e_noaju.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.cb_lokasi.setText(line.kode_lokasi);	
						this.e_status.setText(line.status);																																		
					}
				}					
				
				if (this.stsSimpan == 1) this.doClick();	
				else {
					setTipeButton(tbUbahHapus);	
					var strSQL = "select * from ju_m where no_ju = '"+this.cb_nb.getText()+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){				
							this.e_nb.setText(line.no_ju);				
							this.e_dok.setText(line.no_dokumen);
							this.e_ket.setText(line.keterangan);
							this.cb_akun.setText(line.ref1);
							this.cb_buat.setText(line.nik_buat);
							this.cb_app.setText(line.nik_setuju);							
						}
					}	
				}

				var data = this.dbLib.getDataProvider(
							"select a.no_fa, b.kode_akun, b.nama, convert(varchar,tgl_perolehan,103)  as tgl_oleh, zz.nilai,isnull(d.akum_susut,0) as akum_susut, a.keterangan, case when b.jenis='A' then 'ASET' else 'INVENTARIS' end as jenis "+
							"from fa_woaju_d a "+
							"	 inner join fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi "+							
							"	 inner join fa_klp c on b.kode_klpfa=c.kode_klpfa "+
							"	 inner join fa_klpakun e on c.kode_klpakun=e.kode_klpakun "+
							"    inner join (select no_fa,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
							"                from fa_nilai where periode<='"+this.e_periode.getText()+"' "+
							"				 group by no_fa "+
							"				) zz on a.no_fa=zz.no_fa "+
							"	 left join ("+
							"				select no_fa,sum(case dc when 'D' then nilai else -nilai end) as akum_susut "+
							"				from fasusut_d "+
							"				group by no_fa "+
							"				) d on a.no_fa=d.no_fa "+
							"where a.no_aju = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.no_fa,line.nama,line.tgl_oleh,floatToNilai(line.nilai),floatToNilai(line.akum_susut),line.keterangan,line.jenis.toUpperCase(),line.kode_akun]);
					}
				} else this.sg1.clear(1);	
				
				this.sgUpld.clear(); 						
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from pbh_dok a inner join pbh_dok_ver b on a.kode_jenis=b.kode_jenis "+
							 "where a.no_bukti = '"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar,"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);

			}									
		} catch(e) {alert(e);}
	}
});