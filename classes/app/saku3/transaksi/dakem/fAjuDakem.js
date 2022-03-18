window.app_saku3_transaksi_dakem_fAjuDakem = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dakem_fAjuDakem.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dakem_fAjuDakem";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Klaim DAKEM: Input", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
				
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:6,tag:9,		            
					colTitle:["No Bukti","Tanggal","No Dokumen","Deskripsi","Progress","NIK - Nama"],
					colWidth:[[5,4,3,2,1,0],[200,80,300,120,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[780,17,200,20],caption:"Nilai", tipeText:ttNilai, text:"0", readOnly:true});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,350], childPage:["Data Klaim","Data Peserta"]});
		this.cb_app = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"NIK Approve",multiSelection:false,tag:2});		
		this.e_nik = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"NIK - Nama", maxLength:50,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[232,14,300,20],caption:"",labelWidth:0,readOnly:true});		
		this.e_mkerja = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Masa Kerja - Almt.",readOnly:true});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[232,16,300,20],caption:"Alamat",labelWidth:0,readOnly:true});		
		this.e_aw = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,512,20],caption:"Ahli Waris", maxLength:50});		
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,22,222,20],caption:"Status Ahli Waris",items:["PASANGAN","ANAK","KERABAT LAINNYA"], readOnly:true,tag:2,change:[this,"doChange"]});				
		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tgl Transfer", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,120,18]}); 
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,21,222,20],caption:"Jenis Pembayaran",items:["TUNAI","TRANSFER"],change:[this,"doChange"]});
		
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,512,20],caption:"Nama Bank", maxLength:50,tag:9});		
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,512,20],caption:"Cabang", maxLength:50,tag:9});		
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,512,20],caption:"No Rekening", maxLength:50,tag:9});		
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,512,20],caption:"Nama Rekening", maxLength:50,tag:9});		
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:9,
		            colTitle:["Status","NIKES","Nama","Tgl Meninggal","Tgl Klaim","Nilai","Status Klaim","Tgl Lahir"],					
					colWidth:[[7,6,5,4,3,2,1,0],[80,100,100,100,100,270,80,80]],
					columnReadOnly:[true,[0,1,2,3,4,6,7],[5]],
					buttonStyle:[[0],[bsAuto]],picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],colFormat:[[5],[cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});	
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
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
			this.dbLib = new util_dbLib();
			this.dbSika = new util_dbLib(undefined,'dbSIKA');
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
		    this.c_jenis.setText("TUNAI");
			this.progSeb = "0";
			
			this.akunDakem = "-"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('AKUNDAKEM') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "AKUNDAKEM") this.akunDakem = line.flag;								
				}
			}
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Daftar Karyawan",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dakem_fAjuDakem.extend(window.childForm);
window.app_saku3_transaksi_dakem_fAjuDakem.implement({
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
			if (this.c_jenis.getText() == "TUNAI") {
				this.e_bank.setTag("9");
				this.e_cabang.setTag("9");
				this.e_norek.setTag("9");
				this.e_namarek.setTag("9");
			}
			else {
				this.e_bank.setTag("0");
				this.e_cabang.setTag("0");
				this.e_norek.setTag("0");
				this.e_namarek.setTag("0");
			}
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						sql.add("delete from yk_dakem_m where no_dakem = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from yk_dakem_d where kdtrans = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					}					
					sql.add("insert into yk_dakem_m(no_dakem,kode_lokasi,periode,nik_user,tgl_input,tanggal,no_dokumen,keterangan,nik_buat,nik,aw,status_aw,tgl_transfer,jenis_bayar, bank,cabang,no_rek,nama_rek,alamat, akun_dakem,no_app,no_ver,no_spb,progress,nik_app,kode_pp) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"', '"+this.e_ket.getText()+"', '"+this.app._userLog+"', '"+this.e_nik.getText()+"', '"+this.e_aw.getText()+"', '"+this.c_status.getText()+"', '"+this.dp_d2.getDateString()+"', '"+this.c_jenis.getText()+"', '"+this.e_bank.getText()+"', '"+this.e_cabang.getText()+"', '"+this.e_norek.getText()+"', '"+this.e_namarek.getText()+"','"+this.e_alamat.getText()+"','"+this.akunDakem+"','-','-','-','0','"+this.cb_app.getText()+"','"+this.app._kodePP+"')");					
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(6,i) == "BELUM" && this.sg.cells(0,i) == "APP"){
								sql.add("insert into yk_dakem_d(kdtrans,nik,nikkes,namaaw,statusaw,nominal,tglmeninggal,namabank,norek,cabang,no_kas,kode_lokasi,periode,nama_nikes,tgl_lahir) values "+
										"('"+this.e_nb.getText()+"', '"+this.e_nik.getText()+"', '"+this.sg.cells(1,i)+"', '"+this.e_aw.getText()+"', '"+this.c_status.getText()+"', "+nilaiToFloat(this.sg.cells(5,i))+", '"+this.sg.getCellDateValue(3,i)+"', '"+this.e_bank.getText()+"', '"+this.e_norek.getText()+"', '"+this.e_cabang.getText()+"', '-', '"+this.app._lokasi+"', '"+this.e_periode.getText()+"','"+this.sg.cells(2,i)+"','"+this.sg.getCellDateValue(7,i)+"')");
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
					setTipeButton(tbAllFalse);
					this.sg.clear(1); this.sg3.clear(1);
					this.doClick(this.i_gen);					
				break;
			case "simpan" :					
			case "ubah" :					
				this.preView = "1";															
				if (this.progSeb != "0" && this.progSeb != "R" && this.progSeb != "U" && this.progSeb != "V") {
					system.alert(this,"Transaksi tidak valid.","Progress transaksi tidak sesuai.");
					return false;						
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
				if (this.progSeb == "0") {
					var sql = new server_util_arrayList();				
					sql.add("delete from yk_dakem_m where no_dakem = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_dakem_d where kdtrans = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					this.dbLib.execArraySQL(sql);				
				}
				else system.alert(this,"Transaksi tidak valid.","Progress transaksi tidak sesuai.");
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
	doChange:function(sender){
		if (this.stsSimpan==1) {
			if (sender == this.e_nik || this.e_nik.getText()!="") {
				var data = this.dbSika.getDataProvider("select id_jns_peserta from v_peserta_dakem where nikes = '"+this.e_nik.getText()+".000' and nik='"+this.e_nik.getText()+"' ",true);	
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.jenis = line.id_jns_peserta;					
					} else this.jenis = "00";
				}
							
				if (this.jenis == "21" || this.jenis == "22" || this.jenis == "23" || this.jenis == "24") {			
					var data = this.dbSika.getDataProvider("select almt,nm_peserta,nikes,floor(datediff(day,tgl_capeg,tgl_henti_kerja)/365.2199) as mkerja from v_peserta_dakem where nikes = '"+this.e_nik.getText()+".000' and nik='"+this.e_nik.getText()+"' ",true);	
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){					
							this.e_nama.setText(line.nm_peserta);					
							this.e_mkerja.setText(line.mkerja);																		
							this.e_alamat.setText(line.almt);			
						} 
					}	
					if (this.stsSimpan == 1) {
						var strSQL = "select convert(varchar,tgl_lhr,103) as tgl_lhr,nikes,nm_peserta,convert(varchar,cast(tgl_meninggal as date),103) as tgl_meninggal,'-' as status,0 as nilai from v_peserta_dakem where nik='"+this.e_nik.getText()+"' and tgl_meninggal is not null";
						var data = this.dbSika.getDataProvider(strSQL,true);	
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];																						
								this.sg.appendData(["INPROG",line.nikes,line.nm_peserta,line.tgl_meninggal,line.status,floatToNilai(line.nilai),"BELUM",line.tgl_lhr]);
							}
						} 
						else {
							this.sg.clear(1);	
							system.info(this,"Tidak ada peserta berstatus meninggal","Hubungi Admin SIKA.");
						}
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){					
								var data = this.dbLib.getDataProvider("select convert(varchar,tglmeninggal,103) as tgl,nominal from yk_dakem_d where nikkes='"+this.sg.cells(1,i)+"' ",true);	
								if (typeof data == "object"){
									var line = data.rs.rows[0];							
									if (line != undefined){					
										this.sg.cells(4,i,line.tgl)
										this.sg.cells(5,i,floatToNilai(line.nominal))
										this.sg.cells(6,i,"SUDAH");							
									}
									else {
										var strSQL = "select (case when substring('"+this.sg.cells(1,i)+"',8,3) = '000' then kk "+
													 " when substring('"+this.sg.cells(1,i)+"',8,3) like '_00' then pas "+
													 " when substring('"+this.sg.cells(1,i)+"',8,3) like '___' then anak end) as nilai "+
													 "from yk_dakem_tarif where "+nilaiToFloat(this.e_mkerja.getText())+" between mk1 and mk2";							
										var data0 = this.dbLib.getDataProvider(strSQL,true);	
										if (typeof data0 == "object"){
											var line0 = data0.rs.rows[0];							
											if (line0 != undefined){					
												this.sg.cells(5,i,floatToNilai(line0.nilai));
											} 
										}	 						
									}
								}					
							}
						}
					}								
					this.sg.validasi();
				}
				else {
					if (this.jenis != "00") {
						system.alert(this,"Transaksi tidak valid.","NIK tidak berstatus 21-22-23-24 (Pensiun)");
						this.sg.clear(1);
					}
				}			
			}
		}
		if (sender == this.c_jenis || this.c_jenis.getText()!="") {
			if (this.c_jenis.getText() == "TUNAI") {
				this.e_bank.setReadOnly(true);
				this.e_cabang.setReadOnly(true);
				this.e_norek.setReadOnly(true);
				this.e_namarek.setReadOnly(true);
			}
			else {
				this.e_bank.setReadOnly(false);
				this.e_cabang.setReadOnly(false);
				this.e_norek.setReadOnly(false);
				this.e_namarek.setReadOnly(false);
			}
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if (this.stsSimpan == 0)  {
				this.sg.clear(1);
				this.sg3.clear(1);
				this.progSeb = "0";
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"yk_dakem_m","no_dakem",this.app._lokasi+"-DKM"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},		
	doChangeCell: function(sender, col, row){
		if ((col == 0 || col == 5) && (this.sg.cells(5,row) != "")) this.sg.validasi();
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) == "BELUM" && this.sg.cells(0,i) == "APP" && this.sg.cells(5,i) != "") 
				  tot += nilaiToFloat(this.sg.cells(5,i));				
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
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spj='"+this.e_nb.getText()+"' ";
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
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																						
		var strSQL = "select a.no_dakem,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.progress,b.nikkes +' - '+ b.nama_nikes as nikes "+
		             "from yk_dakem_m a inner join yk_dakem_d b on a.no_dakem=b.kdtrans and a.kode_lokasi = b.kode_lokasi "+					 					 
					 "where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','U','R','V') order by a.tanggal";		
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
			this.sg3.appendData([line.no_dakem,line.tgl,line.no_dokumen,line.keterangan,line.progress,line.nikes]); 
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
				this.progSeb = this.sg3.cells(4,row);				
				if (this.progSeb == "V") {
					var modulApp = "DAKEM_SPB"; 
					var vRelasi = " a.no_ver=b.no_app and ";
				}
				else {
					var modulApp = "DAKEM_APP"; 
					var vRelasi = " a.no_app=b.no_app and ";
				}									
				
				var data4 = this.dbLib.getDataProvider("select nikkes from yk_dakem_d where kdtrans='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);	
				if (typeof data4 == "object"){
					var line4 = data4.rs.rows[0];							
					if (line4 != undefined){										
						this.nikkes = line4.nikkes;
					}						
				}			
				var strSQL = "select * from yk_dakem_m where no_dakem='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_app.setText(line.nik_app);					
						this.dp_d1.setText(line.tanggal);	
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.e_nik.setText(line.nik);
						this.e_aw.setText(line.aw);
						this.c_status.setText(line.status_aw);					
						this.dp_d2.setText(line.tgl_transfer);	
						this.c_jenis.setText(line.jenis_bayar);											
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.norek);
						this.e_namarek.setText(line.namarek);
											
						var data0 = this.dbSika.getDataProvider("select almt,nm_peserta,nikes,floor(datediff(day,tgl_capeg,tgl_henti_kerja)/365.2199) as mkerja from v_peserta_dakem where nikes = '"+this.e_nik.getText()+".000' and nik='"+this.e_nik.getText()+"' ",true);	
						if (typeof data0 == "object"){
							var line0 = data0.rs.rows[0];							
							if (line0 != undefined){					
								this.e_nama.setText(line0.nm_peserta);					
								this.e_mkerja.setText(line0.mkerja);			
								this.e_alamat.setText(line0.almt);								
							} 
						}							
						var strSQL = "select convert(varchar,tgl_lhr,103) as tgl_lhr,nikes,nm_peserta,convert(varchar,cast(tgl_meninggal as date),103) as tgl_meninggal,'-' as status,0 as nilai from v_peserta_dakem where nikes = '"+this.nikkes+"' and nik='"+this.e_nik.getText()+"' and tgl_meninggal is not null";					
						var data1 = this.dbSika.getDataProvider(strSQL,true);	
						if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
							var line1;
							this.sg.clear();
							for (var i in data1.rs.rows){
								line1 = data1.rs.rows[i];																													
								this.sg.appendData(["APP",line1.nikes,line1.nm_peserta,line1.tgl_meninggal,line1.status,floatToNilai(line1.nilai),"BELUM",line1.tgl_lhr]);
							}
						} else this.sg.clear(1);									
						
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){					
								var data2 = this.dbLib.getDataProvider("select convert(varchar,tglmeninggal,103) as tgl,nominal from yk_dakem_d where nikkes='"+this.sg.cells(1,i)+"' ",true);	
								if (typeof data2 == "object"){
									var line2 = data2.rs.rows[0];							
									if (line2 != undefined){					
										this.sg.cells(4,i,line2.tgl)
										this.sg.cells(5,i,floatToNilai(line2.nominal))
										this.sg.cells(6,i,"BELUM");																		
									}						
								}					
							}
						}
					}
					this.sg.validasi();
				}				
			}									
		} catch(e) {alert(e);}
	}	
});
