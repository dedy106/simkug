window.app_saku3_transaksi_tu_ntf21_fSisih = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_ntf21_fSisih.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_ntf21_fSisih";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyisihan Piutang", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_rev = new portalui_saiLabelEdit(this,{bound:[810,17,200,20],caption:"Nilai Reverse",tipeText:ttNilai,text:"0",readOnly: true});		
		this.cb_drk = new saiCBBL(this,{bound:[20,13,220,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2});								
		this.e_total = new portalui_saiLabelEdit(this,{bound:[810,13,200,20],caption:"Total Penyisihan",tipeText:ttNilai,text:"0",readOnly: true});		
		this.bProses = new portalui_button(this,{bound:[690,13,80,18],caption:"Proses Data",click:[this,"doProses"]});		
		
		this.pc3 = new pageControl(this,{bound:[20,12,1000,350], childPage:["Data Penyisihan"]});			
		this.sg1 = new saiGrid(this.pc3.childPage[0],{bound:[1,5,this.pc3.width-5,this.pc3.height-35],colCount:10,		            
				colTitle:["No Bill", "ID Project", "Bbn Sisih","Akum. Sisih", "Keterangan", "Saldo", "PP/Unit", "Umur (Bulan)", "Nilai Sisih", "Reverse"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,100,100,100,200,80,80,100,100]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,9],[8]],		
				nilaiChange:[this,"doNilaiChange1"],change:[this,"doChangeCell1"],
				colFormat:[[5,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc3.childPage[0],{bound:[1,this.pc3.height-25,this.pc3.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});	
		
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
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_ntf21_fSisih.extend(window.portalui_childForm);
window.app_saku3_transaksi_tu_ntf21_fSisih.implement({			
	doProses: function(sender, page) {		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-SSH"+this.e_periode.getText().substr(2,4)+".","0000"));		
		
		this.sg1.clear(1);		
		var strSQL = "select a.no_bill,a.kode_proyek,a.akun_bsisih,a.akun_akum,a.keterangan,round(a.total-isnull(b.bayar,0),2) as saldo,a.kode_pp,a.umur, "+
					"	round(case "+
					"		when a.umur between 6 and 12 then 0.5 * round(a.total-isnull(b.bayar,0),2) "+
					"		when a.umur > 12 then round(a.total-isnull(b.bayar,0),2) "+
					"		else 0 "+
					"	end, 0) as nilai_sisih, "+
					"	isnull(c.rev_sisih,0) as rev_sisih "+ 

					"	from ( 	"+		 						 												
					"			select a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,c.akun_bsisih,c.akun_akum,a.kode_lokasi, sum(a.nilai+  (case when a.sts_wapu='NON' then a.nilai_ppn else 0 end)  -a.diskon) as total,a.kode_pp, datediff(month,a.tanggal,getdate()) as umur "+
					"			from prb_prbill_m a  "+
					"					inner join prb_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi "+
					"					inner join prb_proyek_jenis c on b.kode_jenis=c.kode_jenis and b.kode_lokasi=c.kode_lokasi "+
					"					inner join trans_m d on a.no_bill=d.no_dokumen and a.kode_lokasi=d.kode_lokasi and d.form='PRPIU' "+
					"			where a.modul='BILL' and (a.nilai) > 0  and a.kode_lokasi='"+this.app._lokasi+"' "+
					"			group by a.kode_cust,a.no_bill,a.kode_proyek,a.keterangan,c.akun_bsisih,c.akun_akum,a.kode_lokasi,a.kode_pp,datediff(month,a.tanggal,getdate()) "+
					"		)a  "+						 
												
					"		left join ( "+
					"			select no_bill,kode_lokasi,sum(case dc when 'D' then nilai+nilai_pph+nilai_adm else -(nilai+nilai_pph+nilai_adm) end) as bayar "+
					"			from prb_prbill_bayar where  kode_lokasi='"+this.app._lokasi+"' "+
					"			group by no_bill,kode_lokasi "+
					"		) b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi "+

					"		left join ( "+
					"			select no_bill,kode_lokasi,sum(case dc when 'D' then nilai else -(nilai) end) as rev_sisih "+ // if beda tahun  then 0 
					"			from prb_sisih_d where kode_lokasi='"+this.app._lokasi+"' and substring(periode,1,4)='"+this.e_periode.getText().substr(0,4)+"' "+
					"			group by no_bill,kode_lokasi "+
					"		) c on a.no_bill=c.no_bill and a.kode_lokasi=c.kode_lokasi "+
					
					"	where round(a.total-isnull(b.bayar,0),2) > 0 and a.umur > 5 "; 

		var data = this.dbLib.getDataProvider(strSQL,true);	
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg1.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];																																			
				this.sg1.appendData([line.no_bill,line.kode_proyek,line.akun_bsisih,line.akun_akum,line.keterangan,floatToNilai(line.saldo),line.kode_pp,floatToNilai(line.umur),floatToNilai(line.nilai_sisih),floatToNilai(line.rev_sisih)]);
			}
		} else this.sg1.clear(1);	

		this.sg1.validasi();
		this.pc3.setActivePage(this.pc3.childPage[1]);
	}, 
	doNilaiChange1: function(){
		try{						
			var tot = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(8,i) != ""){
					tot += nilaiToFloat(this.sg1.cells(8,i));																					
				}
			}			
			this.e_total.setText(floatToNilai(tot));									
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange1:"+e);
		}
	},
	doChangeCell1: function(sender, col, row){
		if (col == 8 && this.sg1.cells(8,row)!="") {
			this.sg1.validasi();
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
															
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','BILLSISIH','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+nilaiToFloat(this.e_total.getText())+",0,0,'"+this.app._userLog+"','"+this.app._userLog+"','-','-','-','-','"+this.cb_drk.getText()+"','-','-')");
					
					for (var i = 0; i < this.sg1.rows.getLength();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(8,i) != "0") {	

							//reverse sisih seblmnya
							if (this.sg1.cells(9,i) != "0") {
								sql.add("update prb_sisih_d set no_ref='"+this.e_nb.getText()+"' where substring(periode,1,4) = '"+this.e_periode.getText().substr(0,4)+"' and no_sisih<>'"+this.e_nb.getText()+"' and no_ref='-' and no_bill='"+this.sg1.cells(0,i)+"' and kode_proyek='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");		
							}

							sql.add("insert into prb_sisih_d (no_sisih,kode_lokasi,periode,no_ref,kode_proyek,no_bill,akun_bsisih,akun_akum,kode_pp,kode_drk,saldo,umur,nilai,dc) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(6,i)+"','"+this.cb_drk.getText()+"',"+nilaiToFloat(this.sg1.cells(5,i))+","+nilaiToFloat(this.sg1.cells(7,i))+","+nilaiToFloat(this.sg1.cells(8,i))+",'D')");							
						}
					}

					//jurnal reverse sisih sebelumnya (tahun yg sama)
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"',kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',1,akun_bsisih,'C',sum(nilai),sum(nilai),'"+this.e_ket.getText()+"','BILLSISIH','BEBAN','IDR',1,kode_pp,kode_drk,'-','-','-','-','-','-','-' "+
							"from prb_sisih_d where no_ref='"+this.e_nb.getText()+"' "+
							"group by kode_lokasi,akun_bsisih,kode_pp,kode_drk");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"',kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',2,akun_akum,'D',sum(nilai),sum(nilai),'"+this.e_ket.getText()+"','BILLSISIH','BEBAN','IDR',1,kode_pp,kode_drk,'-','-','-','-','-','-','-' "+
							"from prb_sisih_d where no_ref='"+this.e_nb.getText()+"' "+
							"group by kode_lokasi,akun_akum,kode_pp,kode_drk");
							
					//jurnal sisih		
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select no_sisih,kode_lokasi,getdate(),'"+this.app._userLog+"',periode,'-','"+this.dp_d1.getDateString()+"',1,akun_bsisih,'D',sum(nilai),sum(nilai),'"+this.e_ket.getText()+"','BILLSISIH','BEBAN','IDR',1,kode_pp,kode_drk,'-','-','-','-','-','-','-' "+
							"from prb_sisih_d where no_sisih='"+this.e_nb.getText()+"' "+
							"group by no_sisih,kode_lokasi,periode,akun_bsisih,kode_pp,kode_drk");

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select no_sisih,kode_lokasi,getdate(),'"+this.app._userLog+"',periode,'-','"+this.dp_d1.getDateString()+"',2,akun_akum,'C',sum(nilai),sum(nilai),'"+this.e_ket.getText()+"','BILLSISIH','BEBAN','IDR',1,kode_pp,'-','-','-','-','-','-','-','-' "+
							"from prb_sisih_d where no_sisih='"+this.e_nb.getText()+"' "+
							"group by no_sisih,kode_lokasi,periode,akun_akum,kode_pp");

					sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai)  "+
							"select no_sisih,'PRSISIH',kode_lokasi,akun_bsisih,kode_pp,kode_drk,periode,periode,dc,0,sum(nilai) "+
							"from prb_sisih_d where no_sisih='"+this.e_nb.getText()+"' and dc='D' "+
							"group by no_sisih,kode_lokasi,akun_bsisih,kode_pp,kode_drk,periode,dc");									

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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg1.clear(1); 
					this.pc3.setActivePage(this.pc3.childPage[0]);
					setTipeButton(tbAllFalse);							
					this.stsSimpan = 1;	
					this.doClick();
				}
				break;
			case "simpan" :					
				this.preView = "1";
			    if (nilaiToFloat(this.e_total.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Total Penyisihan tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			this.e_periode.setText(y+""+m);
						
			this.sg1.clear(1);	
			this.e_total.setText("0");
			if (this.stsSimpan == 1) {
				this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
				this.doClick();				
			}
		}
		catch(e) {
			alert(e);
		}
	},
	doClick:function(sender){		
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-SSH"+this.e_periode.getText().substr(2,4)+".","0000"));		
		setTipeButton(tbSimpan);			
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){									
							if (this.preView == "1") {
								// this.nama_report="server_report_saku3_tu_proyek_rptPiutangPYT";
								// this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti = '"+this.e_nb.getText()+"' ";								
								this.filter2 = this.filter;
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
								this.allBtn = false									
								this.pc3.hide(); 
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
				this.pc3.show(); 			
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
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.sg1.clear(1); 
			if (this.stsSimpan == 1) this.doClick();
		} catch(e) {
			alert(e);
		}
	}
});