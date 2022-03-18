window.app_saku3_transaksi_yakes21_fSikaApiTes = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_fSikaApiTes.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_fSikaApiTes";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","TES API", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_nik = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"NIK",tag:2});
		this.bTampil = new portalui_button(this,{bound:[20,13,100,20],caption:"Tampil API SIKA",hint:"Load",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoadSIKA"]});
        this.bTampil2 = new portalui_button(this,{bound:[140,13,100,20],caption:"Tampil API SAI",hint:"Load",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoadSAI"]});
		this.rearrangeChild(10, 23);
					
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
			//this.dbSika = new util_dbLib(undefined,'dbSIKA');
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_fSikaApiTes.extend(window.childForm);
window.app_saku3_transaksi_yakes21_fSikaApiTes.implement({
    doLoadSAI:function(sender){
        this.nikkessika = this.e_nik.getText()+'.000';
        console.log('klik tampil sai');
        this.app.services.getPesertaDakem(this.nikkessika, function(res) {	
            if(res.status == 'success'){
                if(typeof res.data == 'object' && res.data.length > 0){
                    line = res.data[0];
                    system.alert(this,'Sukses', JSON.stringify(line));
                }else{	
                    system.alert(this,'NIK Tidak ditemukan ('+self.nikkessika+')', res.message);
                    return false;
                }	
            }else{	
                system.alert(this,'NIK Tidak ditemukan ('+self.nikkessika+')', res.message);
                return false;
            }
        })
    },
    doLoadSIKA:function(sender){
        this.nikkessika = this.e_nik.getText()+'.000';
        console.log('klik tampil sika');
        this.app.services.getPesertaDakemSIKA(this.nikkessika, function(res) {	
            if(res.status){
                system.alert(this,'Sukses', JSON.stringify(res));
            }else{	
                system.alert(this,'NIK Tidak ditemukan ('+self.nikkessika+')', res.message);
                return false;
            }
        })
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);		
				// if (this.c_dana.getText() == "PUSAT" && nilaiToFloat(this.e_saldoif.getText()) > this.niBawah ) {
				// 	system.alert(this,"Transaksi tidak valid.","Dana IF masih bersaldo melebihi tarif dakem terendah.");
				// 	return false;
				// }			

				if (this.c_dana.getText() == "PUSAT" && this.c_jenis.getText()=="TUNAI") {
					system.alert(this,"Transaksi tidak valid.","Dana PUSAT tidak boleh berjenis TUNAI.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) > nilaiToFloat(this.e_saldoif.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh melebihi Saldo IF.");
					return false;
				}
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

					
					sql.add("delete from if_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from if_aju_j where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					
					sql.add("delete from hutang_m where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from hutang_j where no_hutang = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					
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
		try {			
			
		}
		catch(e) {
			alert(e);
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
								// this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								// this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_spj='"+this.e_nb.getText()+"' ";
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
			this.isiCBnik();
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																						
		var strSQL = "select a.no_dakem,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,b.nikkes +' - '+ b.nama_nikes as nikes,'IFUND' as dana "+
		             "from yk_dakem_m a "+
					 "inner join yk_dakem_d b on a.no_dakem=b.kdtrans and a.kode_lokasi = b.kode_lokasi "+					 					 
					 "inner join if_aju_m c on a.no_dakem=c.no_aju and a.kode_lokasi=c.kode_lokasi and c.form='DAKEM' "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and c.progress in ('0','R') "+
					 "union  "+
					 "select a.no_dakem,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,b.nikkes +' - '+ b.nama_nikes as nikes,'PUSAT' as dana "+
		             "from yk_dakem_m a "+
					 "inner join yk_dakem_d b on a.no_dakem=b.kdtrans and a.kode_lokasi = b.kode_lokasi "+					 					 					 					 
					 "where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R') "+
					 " ";		

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
			this.sg3.appendData([line.no_dakem,line.tgl,line.no_dokumen,line.keterangan,line.nikes,line.dana.toUpperCase(),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 6) {
				this.doDoubleClick3(this.sg3,0,row);
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));	
				this.c_dana.setText(this.sg3.cells(5,row));																							
				
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
						this.progSeb = line.progress;							
						this.dp_d1.setText(line.tanggal);	
						this.e_dok.setText(line.no_dokumen);					
						this.e_ket.setText(line.keterangan);
						this.cb_app.setText(line.nik_app);
						this.e_nik.setText(line.nik);
						this.e_aw.setText(line.aw);
						this.c_status.setText(line.status_aw);					
						this.dp_d2.setText(line.tgl_transfer);	
						this.c_jenis.setText(line.jenis_bayar);											
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);

						this.nikkessika = this.e_nik.getText()+'.000';
						this.niksika = this.e_nik.getText();
						var self = this;
						this.app.services.getPesertaDakem(this.nikkessika, function(res) {	
							if(res.status == 'success'){
								if(typeof res.data == 'object' && res.data.length > 0){
									line = res.data[0];
									
									// varibel miliday sebagai pembagi untuk menghasilkan hari
									var miliday = 24 * 60 * 60 * 1000;
									//buat object Date
									var tanggal1 = new Date(line.TGL_CAPEG);
									var tanggal2 = new Date(line.TGL_HENTI_KERJA);
									// Date.parse akan menghasilkan nilai bernilai integer dalam bentuk milisecond
									var tglPertama = Date.parse(tanggal1);
									var tglKedua = Date.parse(tanggal2);
									var mkerja = Math.floor(((tglKedua - tglPertama) / miliday)/365.2199);
									
									self.e_nama.setText(line.NM_PESERTA);					
									self.e_mkerja.setText(mkerja);					
									self.e_alamat.setText(line.ALMT);
								}else{	
									system.alert(this,'NIK Tidak ditemukan ('+self.nikkessika+')', res.message);
									return false;
								}	
							}else{	
								system.alert(this,'NIK Tidak ditemukan ('+self.nikkessika+')', res.message);
								return false;
							}
						})

						var datap2 = [];
						var self2 = this;
						this.app.services.getPesertaDakemByNIK(this.niksika, function(res2) {	
							if(res2.status == 'success'){
								if(typeof res2.data == 'object' && res2.data.length > 0){
									datap2 = res2.data;
									if (typeof datap2 == "object" && datap2.length > 0){
										var line2;
										self2.sg.clear();
										for (var i in datap2){
											line2 = datap2[i];					
											if(line2.TGL_MENINGGAL != null){
												// conver tgl meninggal 2021-01-01 to 01/01/2021
												var date_str = line2.TGL_MENINGGAL.split(' ');
												var str = date_str[0].split('-');
												var tgl_meninggal = str[2]+'/'+str[1]+'/'+str[0];
												// end convert

												var tmp = line2.TGL_LHR.split(' ');
												var arr_bln = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
												var idx = arr_bln.indexOf(tmp[0])+1;
												idx = idx.toString();
												var bln = (idx.length == 1 ? '0'+idx : idx);
												if(tmp.length == 5){
													var tgl = (tmp[2].length == 1 ? '0'+tmp[2] : tmp[2]);
													tgl_lahir = tgl+"/"+bln+"/"+tmp[3];
												}else{
													var tgl = (tmp[1].length == 1 ? '0'+tmp[1] : tmp[1]);
													tgl_lahir = tgl+"/"+bln+"/"+tmp[2];
												}
												self2.sg.appendData(["APP",line2.NIKES,line2.NM_PESERTA,tgl_meninggal,'-',0,"BELUM",tgl_lahir]);
											}
										}
									} 
									else {
										self2.sg.clear(1);	
										system.info(this,"Tidak ada peserta berstatus meninggal","Hubungi Admin SIKA.");
									}
									
									for (var i=0;i < self2.sg.getRowCount();i++){
										if (self2.sg.rowValid(i)){					
											var data2 = self2.dbLib.getDataProvider("select convert(varchar,tglmeninggal,103) as tgl,nominal from yk_dakem_d where nikkes='"+self2.sg.cells(1,i)+"' ",true);	
											if (typeof data2 == "object"){
												var line2 = data2.rs.rows[0];							
												if (line2 != undefined){					
													self2.sg.cells(4,i,line2.tgl)
													self2.sg.cells(5,i,floatToNilai(line2.nominal))
													self2.sg.cells(6,i,"BELUM");		
												}						
											}					
										}
									}
								}else{	
									system.alert(this,'NIK Tidak ditemukan ('+self2.niksika+')', res2.message);
									return false;
								}	
							}else{	
								system.alert(this,'NIK Tidak ditemukan ('+self2.niksika+')', res2.message);
								return false;
							}
						});
															
					}
					this.sg.validasi();
				}				
			}									
		} catch(e) {alert(e);}
	}	
});
