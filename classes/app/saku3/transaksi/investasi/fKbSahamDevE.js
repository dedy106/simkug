window.app_saku3_transaksi_investasi_fKbSahamDevE = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_fKbSahamDevE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_fKbSahamDevE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Saham Deviden: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti KB", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.c_jenis = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Jenis",readOnly:true});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,202,20],caption:"No Dokumen", maxLength:50});												
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,470,20],caption:"Deskripsi", maxLength:150});												
		this.cb_rek = new saiCBBL(this,{bound:[20,19,200,20],caption:"Rekening", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.cb_akun = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun KasBank", readOnly:true, tag:2});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.e_nilai = new saiLabelEdit(this,{bound:[710,15,200,20],caption:"Total Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
				
		this.p1 = new panel(this,{bound:[10,23,900,300],caption:"Daftar Saham Deviden"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:7,tag:9,				
				colTitle:["Status","No Deviden","Tanggal","Keterangan","Saham","MI","Nilai KB"],
				colWidth:[[6,5,4,3,2,1,0],[100,100,150,250,80,100,60]],				
				readOnly:true,colFormat:[[6],[cfNilai]],				
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});						
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 23);

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
				
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='KBAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
									
			this.cb_rek.setSQL("select kode_rek, nama from bank_rek where kode_lokasi='"+this.app._lokasi+"'",["kode_rek","nama"],false,["Kode","Nama"],"and","Daftar Rekening",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approve",true);			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						       "where b.kode_flag in ('001','009') and  a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun KasBank",true);
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='SHMPPH' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunpph = line.flag;
			} else this.akunpph = "-";
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_fKbSahamDevE.extend(window.childForm);
window.app_saku3_transaksi_investasi_fKbSahamDevE.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update inv_shmdev_d set no_kas ='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
										
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','-','"+this.cb_akun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBSHMDEV','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','-','"+this.cb_rek.getText()+"')");										
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','09','-','"+this.app._lokasi+"','KBSHMDEV','KB','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'"+this.cb_rek.getText()+"')");
										
					if (this.sg.getRowValidCount() > 0){						
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+
										"(select '"+this.e_nb.getText()+"',a.no_shmdev,'"+this.dp_d1.getDateString()+"',0,a.akun_pph,'"+this.sg.cells(3,i)+"','D',sum(a.nilai_pph),'"+this.app._kodePP+"',b.kode_drk,'-','-',a.kode_lokasi,'KBSHMDEV','PPHM','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-' "+
										" from inv_shmdev_d a inner join inv_shmdev_m b on a.no_shmdev=b.no_shmdev and a.kode_lokasi=b.kode_lokasi "+
										" where a.kode_kelola='"+this.sg.cells(5,i)+"' and a.no_shmdev='"+this.sg.cells(1,i)+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
										" group by a.no_shmdev,a.akun_pph,b.kode_drk,a.kode_lokasi)");
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) "+
										"(select '"+this.e_nb.getText()+"',a.no_shmdev,'"+this.dp_d1.getDateString()+"',1,a.akun_dev,'"+this.sg.cells(3,i)+"','C',sum(a.nilai_dev),b.kode_pp,b.kode_drk,'-','-',a.kode_lokasi,'KBSHMDEV','DEVIDEN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-' "+
										" from inv_shmdev_d a inner join inv_shmdev_m b on a.no_shmdev=b.no_shmdev and a.kode_lokasi=b.kode_lokasi "+
										" where a.kode_kelola='"+this.sg.cells(5,i)+"' and a.no_shmdev='"+this.sg.cells(1,i)+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
										" group by a.no_shmdev,a.akun_dev,b.kode_pp,b.kode_drk,a.kode_lokasi)");
								
								sql.add("update inv_shmdev_d set no_kas='"+this.e_nb.getText()+"' where no_shmdev='"+this.sg.cells(1,i)+"' and kode_kelola='"+this.sg.cells(5,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
						}
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);					
					this.sg.clear(1); 
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Nilai tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update inv_shmdev_d set no_kas ='-' where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
	},	
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {			
			this.e_nb.setSQL("select no_kas, keterangan from kas_m where no_del='-' and modul = 'KBSHMDEV' and posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No KB","Deskripsi"],"and","Daftar Bukti KB",true);
		}
		if (sender == this.cb_rek && this.cb_rek.getText()!="") {			
			if (sender == this.cb_rek && this.cb_rek.getText()!="") {
				var data = this.dbLib.getDataProvider("select kode_akun from bank_rek where kode_rek='"+this.cb_rek.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.cb_akun.setText(line.kode_akun);						
					} 
				}									
			}
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select jenis,tanggal,periode,no_dokumen,keterangan,akun_kb,nik_buat,nik_app,kode_bank "+
			           "from kas_m "+			           					   					   
					   "where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;					
					this.dp_d1.setText(line.tanggal);
					this.c_jenis.setText(line.jenis);	
					this.e_dok.setText(line.no_dokumen);					
					this.e_ket.setText(line.keterangan);					
					this.cb_rek.setText(line.kode_bank);	
					this.cb_akun.setText(line.akun_kb);	
					this.cb_buat.setText(line.nik_buat);
					this.cb_app.setText(line.nik_app);										
				} 
			}						
			var strSQL = "select a.no_shmdev,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_saham,b.kode_kelola,a.nilai "+						 
			             "from inv_shmdev_m a inner join inv_shmdev_d b on a.no_shmdev = b.no_shmdev where b.no_kas='"+this.e_nb.getText()+"' and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["APP",line.no_shmdev,line.tanggal,line.keterangan,line.kode_saham,line.kode_kelola,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);			
		}
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP" && this.sg.cells(6,i) != ""){
					tot = tot + nilaiToFloat(this.sg.cells(6,i));				
				}
			}			
			this.e_nilai.setText(floatToNilai(tot));
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
							if (this.cb1.isSelected()) {								
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
			this.sg.clear(1); 
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	}
});