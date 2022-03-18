window.app_saku3_transaksi_tarbak_fKbpanjar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_fKbpanjar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_fKbpanjar";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Pencairan Panjar: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Panjar","List Panjar"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No KasBank","No Panjar","Tanggal","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,500,80,100,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});				
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,22,200,20],caption:"Jenis",items:["BK"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti KB",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_pj = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Panjar", readOnly:true});		
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"No Dokumen", maxLength:50});		
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tgl Pertangg.", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18]}); 		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,18,200,20],caption:"Nilai Panjar", tag:1, tipeText:ttNilai, text:"0"});		
		this.cb_pj = new saiCBBL(this.pc2.childPage[0],{bound:[20,21,220,20],caption:"Akun Panjar", multiSelection:false, maxLength:10, tag:2});
		this.cb_kas = new saiCBBL(this.pc2.childPage[0],{bound:[20,22,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2});
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,23,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_buat = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"NIK Pemegang", multiSelection:false, maxLength:10, tag:1});
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
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
			this.stsSimpan = 1;
			this.c_jenis.setText("BK");
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pemegang",true);
			this.cb_pp.setSQL("select kode_pp, nama from pp where tipe='posting' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif ='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Pusat Pertanggungjawaban",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.cb_kas.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						       "where b.kode_flag in ('001','009') and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun KasBank",true);						
			this.cb_pj.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						       "where b.kode_flag = '002' and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun Panjar",true);			
			this.flagDokFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('DOKFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];																						
				if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;			
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_fKbpanjar.extend(window.childForm);
window.app_saku3_transaksi_tarbak_fKbpanjar.implement({
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
						sql.add("delete from panjar_m where no_pj = '"+this.e_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
						sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					}					
					sql.add("insert into panjar_m (no_pj,no_kas,no_dokumen,tanggal,due_date,keterangan,catatan,kode_curr,kurs,akun_pj,nik_pengaju,nik_setuju,kode_lokasi,kode_pp,modul,nilai,nilai_pot,kode_drk,progress,periode,no_del,no_link,nik_user,tgl_input) values  "+
							"('"+this.e_pj.getText()+"','"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_ket.getText()+"','-','IDR',1,'"+this.cb_pj.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','PJ_DIR',"+parseNilai(this.e_nilai.getText())+",0,'-','2','"+this.e_periode.getText()+"','-','-','"+this.app._userLog+"',getdate())");					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.cb_kas.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','KBPJ','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.e_pj.getText()+"','-')");					
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"	('"+this.e_nb.getText()+"','"+this.e_pj.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_pj.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','KBPJ','PJ','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"	('"+this.e_nb.getText()+"','"+this.e_pj.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_kas.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_pp.getText()+"','-','-','-','"+this.app._lokasi+"','KBPJ','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");							
					
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
					this.sg3.clear(1);
					setTipeButton(tbAllFalse);				
				break;
			case "simpan" :				
			case "ubah" :				
				this.preView = "1";		
				if (this.flagDokFree == "1") {				
					var data = this.dbLib.getDataProvider("select no_kas from kas_m where no_dokumen='"+this.e_dok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							system.alert(this,"No Dokumen sudah terpakai.","Terpakai di no bukti : "+line.no_kas);
							return false;
						} 
					}
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai panjar tidak boleh nol atau kurang.");
					return false;						
				}
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
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";		
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from panjar_m where no_pj = '"+this.e_pj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				}
				break;					
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}		
		var data = this.dbLib.getDataProvider("select convert(varchar,dateadd(day, 25, '"+this.dp_d1.getDateString()+"'),103) as due_date ",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.dp_d2.setText(line.due_date);
		}
		if (this.stsSimpan == 1) this.doClick();		
	},
	doChange:function(sender){
		if (sender == this.c_jenis) this.e_nb.setText("");
		//if (sender == this.cb_pp && this.cb_pp.getText()!="") this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pemegang",true);
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg3.clear(1);
			this.e_nilai.setText("0");			
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_pj.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"panjar_m","no_pj",this.app._lokasi+"-PJ"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_dok.setFocus();
		setTipeButton(tbSimpan);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {
								this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
			this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																								
		var strSQL = "select a.no_kas,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from kas_m a inner join panjar_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi and b.progress='2' "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and posted='F'";	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_kas,line.no_dokumen,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
				
				var strSQL = "select b.no_pj,a.no_dokumen,b.due_date,a.keterangan,a.nilai,b.akun_pj,a.akun_kb,b.kode_pp,b.nik_pengaju,b.nik_setuju "+
				             "from kas_m a inner join panjar_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi "+				             
							 "where a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_pj.setText(line.no_pj);
						this.e_dok.setText(line.no_dokumen);
						this.dp_d2.setText(line.due_date);
						this.e_ket.setText(line.keterangan);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.cb_pj.setText(line.akun_pj);
						this.cb_kas.setText(line.akun_kb);
						this.cb_pp.setText(line.kode_pp);
						this.cb_buat.setText(line.nik_pengaju);
						this.cb_app.setText(line.nik_setuju);
					}
				}																				
			}									
		} catch(e) {alert(e);}
	}
});