window.app_saku3_transaksi_piutang_fMutasiTitipan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_piutang_fMutasiTitipan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_piutang_fMutasiTitipan";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Mutasi Titipan Piutang: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Jurnal","List Jurnal"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,
		            colTitle:["No Bukti","Tanggal","Lok Tujuan","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,410,180,80,80,100]],colFormat:[[5],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_titip = new saiCBBL(this.pc2.childPage[0],{bound:[20,22,220,20],caption:"Akun Titipan", multiSelection:false, maxLength:10, tag:2});
		this.cb_tak = new saiCBBL(this.pc2.childPage[0],{bound:[20,21,220,20],caption:"Akun Mutasi", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,22,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.cb_lokasi = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"Lokasi Tujuan", multiSelection:false, maxLength:10, tag:2});		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,202,20],caption:"Total Mutasi", readOnly:true,tipeText:ttNilai, text:"0"});		
		this.bTampil = new button(this.pc2.childPage[0],{bound:[620,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});			
		this.i_appAll = new portalui_imageButton(this.pc2.childPage[0],{bound:[710,17,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
			
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,255], childPage:["Daftar Approve Piutang"]});						
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:0,		            
					colTitle:["Status","Lokasi","No Bukti","Periode","Keterangan","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,350,80,150,70,80]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					colFormat:[[5],[cfNilai]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					change:[this,"doChangeCell"],dblClick:[this,"doDoubleClick"],nilaiChange:[this,"doNilaiChange"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true,visible:false});		
					
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi not in ('"+this.app._kodeLokasiKonsol+"','"+this.app._kodeLokasiPusat+"')",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun ",true);
			this.cb_tak.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                   "where b.kode_flag = '016' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun TAK",true);			
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_piutang_fMutasiTitipan.extend(window.childForm);
window.app_saku3_transaksi_piutang_fMutasiTitipan.implement({
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from dbexs.dbo.yk_lap_m where no_selesai in (select no_selesai from yk_bast_m where no_kirim='"+this.e_nb.getText()+"')");
						sql.add("delete from dbexs.dbo.yk_lap_d where no_selesai in (select no_selesai from yk_bast_m where no_kirim='"+this.e_nb.getText()+"')");
						
						sql.add("delete from takkirim_m where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from takkirim_j where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update yk_bast_m set progress='0',no_kirim='-' where no_kirim='"+this.e_nb.getText()+"'");
					}
										
					sql.add("insert into takkirim_m(no_kirim,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user,kode_loktuj,progress,no_terima,due_date) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','TAKAPP','PIU','IDR',1,"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._userLog+"','"+this.cb_app.getText()+"','F','-','"+this.cb_titip.getText()+"','"+this.cb_tak.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_lokasi.getText()+"','0','-','"+this.dp_d1.getDateString()+"')");					
					
					sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','TAKAPP','TITIP','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");					
					sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_tak.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','TAKAPP','TAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){								
								sql.add("update yk_bast_m set progress='1',no_kirim='"+this.e_nb.getText()+"' where no_selesai='"+this.sg.cells(2,i)+"' and kode_lokasi='"+this.sg.cells(1,i)+"'");
							
								sql.add("insert into dbexs.dbo.yk_lap_m (no_selesai,kode_lokasi,no_flag) values ('"+this.sg.cells(2,i)+"','"+this.sg.cells(1,i)+"','-')");
								sql.add("insert into dbexs.dbo.yk_lap_d (nik,nama_kar,nikkes,pasien,tgl_masuk,tgl_keluar,periode,kode_vendor,nama_vendor,kode_icd,nama_icd,nilai,kunj,matkes,no_selesai) "+
										"select a.nik,a.nama,a.nikkes,a.pasien,a.tgl_masuk,a.tgl_keluar,a.periode,d.kode_vendor,d.nama,e.kode_icdx,e.nama,sum(a.nilai) as nilai,0,0,a.no_selesai "+
										"from yk_bill_d a "+
										"inner join yk_loker b on a.loker=b.loker "+
										"inner join cust c on b.kode_cust=c.kode_cust and c.jenis='PEGAWAI' "+
										"inner join vendor d on a.kode_vendor = d.kode_vendor and a.kode_lokasi=d.kode_lokasi "+
										"inner join yk_icdx e on a.icdx= e.kode_icdx "+
										"inner join yk_bast_m f on a.no_selesai=f.no_selesai "+
										"where f.no_selesai='"+this.sg.cells(2,i)+"' and f.kode_lokasi='"+this.sg.cells(1,i)+"' "+
										"group by "+
										"a.nik,a.nama,a.nikkes,a.pasien,a.tgl_masuk,a.tgl_keluar,a.periode,d.kode_vendor,d.nama,e.kode_icdx,e.nama,a.no_selesai "+
										" "+
										"union all "+
										" "+
										"select a.nik,a.nama,a.nikkes,a.pasien,a.tgl_masuk,a.tgl_masuk,a.periode,'-','-','-','-',0,sum(a.umum+a.gigi+a.kbia-a.cs) as kunj,SUM(a.matkes),a.no_selesai "+
										"from yk_billkunj_d a "+
										"inner join yk_loker b on a.loker=b.loker "+
										"inner join cust c on b.kode_cust=c.kode_cust and c.jenis='PEGAWAI' "+
										"inner join yk_bast_m f on a.no_selesai=f.no_selesai "+
										"where f.no_selesai='"+this.sg.cells(2,i)+"' and f.kode_lokasi='"+this.sg.cells(1,i)+"' "+
										"group by "+
										"a.nik,a.nama,a.nikkes,a.pasien,a.tgl_masuk,a.tgl_masuk,a.periode,a.no_selesai "+
										"");

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
					this.sg.clear(1); this.sg3.clear(1); 
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai TAK tidak boleh nol atau kurang.");
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
					sql.add("delete from dbexs.dbo.yk_lap_m where no_selesai in (select no_selesai from yk_bast_m where no_kirim='"+this.e_nb.getText()+"')");
					sql.add("delete from dbexs.dbo.yk_lap_d where no_selesai in (select no_selesai from yk_bast_m where no_kirim='"+this.e_nb.getText()+"')");
						
					sql.add("delete from takkirim_m where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from takkirim_j where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update yk_bast_m set progress='0',no_kirim='-' where no_kirim='"+this.e_nb.getText()+"'");
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
		if (this.stsSimpan == 1) this.doClick(this.i_gen);				
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg.clear(1); this.sg3.clear(1); 
				this.e_nilai.setText("0");				
			}			
			if (sender == this.i_gen) {
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takkirim_m","no_kirim",this.app._lokasi+"-TPIU"+this.e_periode.getText().substr(2,4)+".","0000"));
				this.stsSimpan = 1;
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}
			if (sender == this.i_appAll) {
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							this.sg.cells(0,i,"APP");
						}
					}
				}
				this.sg.validasi();
			}
		}
	},
	doLoadData:function(sender){				
		var strSQL = "select a.no_selesai,a.kode_lokasi,a.periode,a.keterangan,isnull(b.nilai,0)+isnull(c.kunj,0) as nilai "+
					 "	from yk_bast_m a "+
					 "left join ( "+
					 "			select no_selesai,kode_lokasi,sum(nilai) as nilai "+
					 "			from yk_bill_d "+
					 "			where no_selesai <> '-' and kode_lokasi='"+this.cb_lokasi.getText()+"' group by no_selesai,kode_lokasi) b on a.no_selesai=b.no_selesai and a.kode_lokasi=b.kode_lokasi "+
					 "left join ( "+
					 "			select no_selesai,kode_lokasi,sum(umum+gigi+kbia+matkes-cs) as kunj "+
					 "			from yk_billkunj_d "+
					 "			where no_selesai <> '-' and kode_lokasi='"+this.cb_lokasi.getText()+"' group by no_selesai,kode_lokasi) c on a.no_selesai=c.no_selesai and a.kode_lokasi=c.kode_lokasi "+
					 "	where a.kode_lokasi='"+this.cb_lokasi.getText()+"' and a.modul = 'PEGAWAI' and a.progress ='0' and a.kode_loktuj='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData(["INPROG",line.kode_lokasi,line.no_selesai,line.periode,line.keterangan,floatToNilai(line.nilai)]);
			}
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doChangeCell: function(sender, col, row){
		if ((col == 0) && (this.sg.cells(0,row) != "")) this.sg.validasi();		
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != "" && this.sg.cells(0,i) == "APP"){
					tot += nilaiToFloat(this.sg.cells(5,i));
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
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kirim='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); this.sg3.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_kirim,convert(varchar,a.tanggal,103) as tgl,a.kode_loktuj,a.no_dokumen,a.keterangan,a.nilai "+
		             "from takkirim_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'TAKAPP' and a.posted ='F'";		
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
			this.sg3.appendData([line.no_kirim,line.tgl,line.kode_loktuj,line.no_dokumen,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select keterangan,no_dokumen,tanggal,nik_setuju,kode_loktuj "+
							 "from takkirim_m "+							 
							 "where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);												
						this.cb_app.setText(line.nik_setuju);												
						this.cb_lokasi.setText(line.kode_loktuj);												
					}
				}								
				var strSQL = "select a.no_selesai,a.kode_lokasi,a.periode,a.keterangan,isnull(b.nilai,0)+isnull(c.kunj,0) as nilai "+
							 "	from yk_bast_m a "+
							 "left join ( "+
							 "			select no_selesai,kode_lokasi,sum(nilai) as nilai "+
							 "			from yk_bill_d "+
							 "			where no_selesai <> '-' and kode_lokasi='"+this.cb_lokasi.getText()+"' group by no_selesai,kode_lokasi) b on a.no_selesai=b.no_selesai and a.kode_lokasi=b.kode_lokasi "+
							 "left join ( "+
							 "			select no_selesai,kode_lokasi,sum(umum+gigi+kbia+matkes-cs) as kunj "+
							 "			from yk_billkunj_d "+
							 "			where no_selesai <> '-' and kode_lokasi='"+this.cb_lokasi.getText()+"' group by no_selesai,kode_lokasi) c on a.no_selesai=c.no_selesai and a.kode_lokasi=c.kode_lokasi "+
							 "	where a.no_kirim='"+this.e_nb.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["APP",line.kode_lokasi,line.no_selesai,line.periode,line.keterangan,floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);
			}									
		} catch(e) {alert(e);}
	}	
});