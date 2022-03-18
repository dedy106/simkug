window.app_saku2_transaksi_kopeg_ppbs_fUsulPoltekLoad = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_ppbs_fUsulPoltekLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_ppbs_fUsulPoltekLoad";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Usulan Anggaran (Poltek): Load", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;portalui_saiMemo");
		this.c_tahun = new saiCB(this,{bound:[20,22,202,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.cb_pp = new saiCBBL(this,{bound:[20,16,200,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:2});		
		this.e_total = new saiLabelEdit(this,{bound:[700,16,220,20],caption:"Total Usulan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.bHitung = new button(this,{bound:[505,16,80,18],caption:"Hitung",click:[this,"doHitung"]});
		this.bUpload = new portalui_uploader(this,{bound:[600,16,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,370], childPage:["Data Usulan Anggaran","Pesan Kesalahan"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:31,tag:0,
		            colTitle:["Rincian Kegiatan","Tarif"
					          ,"Jan Vol","Jan Jml","Feb Vol","Feb Jml","Mar Vol","Mar Jml"  
							  ,"Apr Vol","Apr Jml","Mei Vol","Mei Jml","Jun Vol","Jun Jml"
							  ,"Jul Vol","Jul Jml","Agu Vol","Agu Jml","Sep Vol","Sep Jml"
							  ,"Okt Vol","Okt Jml","Nop Vol","Nop Jml","Des Vol","Des Jml"
					          ,"Total","Kode Akun","Nama Akun","Kode DRK","Nama DRK"],
					colWidth:[[30,29,28,27, 26, 25,24,23,22,21,20, 19,18,17,16,15,14 ,13,12,11,10,9,8 ,7,6,5,4,3,2 ,1,0],[150,80,150,80, 100  ,80,50,80,50,80,50 ,80,50,80,50,80,50 ,80,50,80,50,80,50 ,80,50,80,50,80,50 ,80,250]],					
					readOnly:true,colFormat:[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],[cfNilai, cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, cfNilai]],					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg, pager:[this,"selectPage"]});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,10,600,280],labelWidth:0,tag:9,readOnly:true});
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			//this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"' and block='0' and status_gar='1' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");						
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_ppbs_fUsulPoltekLoad.extend(window.childForm);
window.app_saku2_transaksi_kopeg_ppbs_fUsulPoltekLoad.implement({	
	doAfterUpload: function(sender, result, data){		
	    try{   		
			this.e_total.setText("0");
			this.stsTampil = "LOAD";
			this.dataUpload = data;
			if (result) {								
				this.sg.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);					
   		}catch(e){
   		   this.sg.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		if (this.stsTampil == "LOAD") {
			var start = (page - 1) * 20;
			var finish = start + 20;
			finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
			this.sg.clear();
			for (var i=start; i < finish;i++){
				line = this.dataUpload.rows[i];			
				this.sg.appendData([line.rincian,floatToNilai(line.tarif),floatToNilai(line.janvol),floatToNilai(line.jantot),floatToNilai(line.febvol),floatToNilai(line.febtot),floatToNilai(line.marvol),floatToNilai(line.martot),  
									floatToNilai(line.aprvol),floatToNilai(line.aprtot),floatToNilai(line.meivol),floatToNilai(line.meitot),floatToNilai(line.junvol),floatToNilai(line.juntot),  	
									floatToNilai(line.julvol),floatToNilai(line.jultot),floatToNilai(line.aguvol),floatToNilai(line.agutot),floatToNilai(line.sepvol),floatToNilai(line.septot),  
									floatToNilai(line.oktvol),floatToNilai(line.okttot),floatToNilai(line.nopvol),floatToNilai(line.noptot),floatToNilai(line.desvol),floatToNilai(line.destot),
									floatToNilai(line.total),line.kode_akun,line.nama_akun,line.kode_drk,line.nama_drk]);
			}
			this.sg.setNoUrut(start);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else {
			this.sg.clear();
			var line;
			this.page = page;
			var start = (page - 1) * 20;
			var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
			for (var i=start;i<finish;i++){
				line = this.dataJU.rs.rows[i];							
				this.sg.appendData([line.keterangan,floatToNilai(line.tarif),floatToNilai(line.janvol),floatToNilai(line.jantot),floatToNilai(line.febvol),floatToNilai(line.febtot),floatToNilai(line.marvol),floatToNilai(line.martot),  
									floatToNilai(line.aprvol),floatToNilai(line.aprtot),floatToNilai(line.meivol),floatToNilai(line.meitot),floatToNilai(line.junvol),floatToNilai(line.juntot),  	
									floatToNilai(line.julvol),floatToNilai(line.jultot),floatToNilai(line.aguvol),floatToNilai(line.agutot),floatToNilai(line.sepvol),floatToNilai(line.septot),  
									floatToNilai(line.oktvol),floatToNilai(line.okttot),floatToNilai(line.nopvol),floatToNilai(line.noptot),floatToNilai(line.desvol),floatToNilai(line.destot),
									floatToNilai(line.total),line.kode_akun,line.nama_akun,line.kode_drk,line.nama_drk]);
			}
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
			this.stsSimpan = "1";
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into agg_usul_m(no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_jurnal,tgl_input,nik_user,kode_akun,kode_drk) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_app.getText()+"','-',getdate(),'"+this.app._userLog+"','-','-')");
					
					sql.add("insert into agg_usul_j(no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',kode_drk,kode_akun,'-',keterangan,'-','"+this.c_tahun.getText()+"01',tarif,1,janvol,jantot from agg_usul_tmp where jantot <> 0 and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into agg_usul_j(no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',kode_drk,kode_akun,'-',keterangan,'-','"+this.c_tahun.getText()+"02',tarif,1,febvol,febtot from agg_usul_tmp where febtot <> 0 and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into agg_usul_j(no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',kode_drk,kode_akun,'-',keterangan,'-','"+this.c_tahun.getText()+"03',tarif,1,marvol,martot from agg_usul_tmp where martot <> 0 and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");							
					
					sql.add("insert into agg_usul_j(no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',kode_drk,kode_akun,'-',keterangan,'-','"+this.c_tahun.getText()+"04',tarif,1,aprvol,aprtot from agg_usul_tmp where aprtot <> 0 and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into agg_usul_j(no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',kode_drk,kode_akun,'-',keterangan,'-','"+this.c_tahun.getText()+"05',tarif,1,meivol,meitot from agg_usul_tmp where meitot <> 0 and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into agg_usul_j(no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',kode_drk,kode_akun,'-',keterangan,'-','"+this.c_tahun.getText()+"06',tarif,1,junvol,juntot from agg_usul_tmp where juntot <> 0 and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");							
							
					sql.add("insert into agg_usul_j(no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',kode_drk,kode_akun,'-',keterangan,'-','"+this.c_tahun.getText()+"07',tarif,1,julvol,jultot from agg_usul_tmp where jultot <> 0 and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into agg_usul_j(no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',kode_drk,kode_akun,'-',keterangan,'-','"+this.c_tahun.getText()+"08',tarif,1,aguvol,agutot from agg_usul_tmp where agutot <> 0 and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into agg_usul_j(no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',kode_drk,kode_akun,'-',keterangan,'-','"+this.c_tahun.getText()+"09',tarif,1,sepvol,septot from agg_usul_tmp where septot <> 0 and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");							
							
					sql.add("insert into agg_usul_j(no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',kode_drk,kode_akun,'-',keterangan,'-','"+this.c_tahun.getText()+"10',tarif,1,oktvol,okttot from agg_usul_tmp where okttot <> 0 and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into agg_usul_j(no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',kode_drk,kode_akun,'-',keterangan,'-','"+this.c_tahun.getText()+"11',tarif,1,nopvol,noptot from agg_usul_tmp where noptot <> 0 and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into agg_usul_j(no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total) "+
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"',kode_drk,kode_akun,'-',keterangan,'-','"+this.c_tahun.getText()+"12',tarif,1,desvol,destot from agg_usul_tmp where destot <> 0 and nik_user='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");							
					
					sql.add("insert into agg_d(no_bukti,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,modul) "+
							"select no_usul,kode_lokasi,kode_pp,kode_drk,kode_akun,kode_norma,keterangan,satuan,periode,tarif,jumlah,vol,total,'UMUM' "+
							"from agg_usul_j where no_usul='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("delete from agg_usul_tmp where nik_user = '"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
					this.sg.clear(1); this.e_memo.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
				this.sg.validasi();								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}				 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){		
		this.c_tahun.setText(y+1);		
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_usul_m","no_usul",this.app._lokasi+"-PPBS"+this.c_tahun.getText()+".","000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);
	},	
	doNilaiChange: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(26,i) != ""){
					tot += nilaiToFloat(this.sg.cells(26,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
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
							if (this.stsSimpan=="1") {
								if (this.cb1.isSelected()) {								
									this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
									this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
									this.pc1.hide();								
								} 
								else {
									system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
									this.clearLayar();
								} 
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
				this.pc1.show(); 
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1);  this.e_memo.setText("-");	
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},
	doHitung:function(sender){										
		try {	
			this.e_total.setText("0");
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_usul_m","no_usul",this.app._lokasi+"-PPBS"+this.c_tahun.getText()+".","000"));
			this.stsSimpan = "0";
			var line; var strSQL = "";
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();																																											
			sql.add("delete from agg_usul_tmp where nik_user = '"+this.app._userLog+"'");			
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];								
				sql.add("insert into agg_usul_tmp(no_usul,kode_lokasi,keterangan,tarif,janvol,jantot,febvol,febtot,marvol,martot,aprvol,aprtot,meivol,meitot,junvol,juntot,julvol,jultot,aguvol,agutot,sepvol,septot,oktvol,okttot,nopvol,noptot,desvol,destot,total,kode_akun,nama_akun,kode_drk,nama_drk,nik_user) values "+
						"('"+this.app._userLog+"','"+this.app._lokasi+"','"+line.rincian+"',"+line.tarif+","+line.janvol+","+line.jantot+","+line.febvol+","+line.febtot+","+line.marvol+","+line.martot+","+line.aprvol+","+line.aprtot+","+line.meivol+","+line.meitot+","+line.junvol+","+line.juntot+","+line.julvol+","+line.jultot+","+line.aguvol+","+line.agutot+","+line.sepvol+","+line.septot+","+line.oktvol+","+line.okttot+","+line.nopvol+","+line.noptot+","+line.desvol+","+line.destot+","+line.total+",'"+line.kode_akun+"','"+line.nama_akun+"','"+line.kode_drk+"','"+line.nama_drk+"','"+this.app._userLog+"')");
			}			
			sql.add("update a set a.jantot=round(a.tarif*a.janvol,0),a.febtot=round(a.tarif*a.febvol,0),a.martot=round(a.tarif*a.marvol,0) "+
					"            ,a.aprtot=round(a.tarif*a.aprvol,0),a.meitot=round(a.tarif*a.meivol,0),a.juntot=round(a.tarif*a.junvol,0) "+
					"            ,a.jultot=round(a.tarif*a.julvol,0),a.agutot=round(a.tarif*a.aguvol,0),a.septot=round(a.tarif*a.sepvol,0) "+
					"            ,a.okttot=round(a.tarif*a.oktvol,0),a.noptot=round(a.tarif*a.nopvol,0),a.destot=round(a.tarif*a.desvol,0) "+
					"            ,a.nama_akun=isnull(b.nama,'-'),a.nama_drk=isnull(c.nama,'-') "+
					"from agg_usul_tmp a left join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"					 left join agg_drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and c.tahun='"+this.c_tahun.getText()+"' "+
					"where a.nik_user = '"+this.app._userLog+"'");
			this.dbLib.execArraySQL(sql);						
			strSQL = "select sum(jantot+febtot+martot+aprtot+meitot+juntot+jultot+agutot+septot+okttot+noptot+destot) as total from agg_usul_tmp where nik_user = '"+this.app._userLog+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.e_total.setText(floatToNilai(line.total));
				} 
			}
			var temu = false; var msg  = "";
			this.e_memo.setText("");			
			strSQL = "select distinct kode_akun from agg_usul_tmp where nama_akun='-' and nik_user = '"+this.app._userLog+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																													
					temu = true;
					msg+= "Kode Akun tidak terdaftar. [kode : "+line.kode_akun+"]\n";
				}
			}		
			strSQL = "select distinct kode_drk from agg_usul_tmp where nama_drk='-' and nik_user = '"+this.app._userLog+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																													
					temu = true;
					msg+= "Kode DRK tidak terdaftar. [kode : "+line.kode_drk+"]\n";
				}
			}
			if (!temu) {						
				this.stsTampil = "HITUNG";			
				strSQL = "select *,(jantot+febtot+martot+aprtot+meitot+juntot+jultot+agutot+septot+okttot+noptot+destot) as total from agg_usul_tmp where nik_user = '"+this.app._userLog+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();				
					this.selectPage(undefined, 1);		
				} else this.sg.clear(1);																
			}
			else {
				this.e_memo.setText(msg);
				this.e_total.setText("0");
				system.alert(this,"Transaksi tidak valid.","Lihat daftar kesalahan");
			}			
		} catch(e) {
			alert(e);
		}		
	}
});