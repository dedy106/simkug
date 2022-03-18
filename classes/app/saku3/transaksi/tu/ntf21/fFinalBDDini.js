window.app_saku3_transaksi_tu_ntf21_fFinalBDDini = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_ntf21_fFinalBDDini.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_ntf21_fFinalBDDini";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reklasifikasi BDD ke Beban Inisiasi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"No Bukti",maxLength:30,readOnly:true});		
		this.e_total = new portalui_saiLabelEdit(this,{bound:[790,13,200,20],caption:"Total",tipeText:ttNilai,text:"0",readOnly: true});		
		this.bProses = new portalui_button(this,{bound:[690,13,80,18],caption:"Proses Data",click:[this,"doProses"]});		
		
		this.pc3 = new pageControl(this,{bound:[20,12,1000,410], childPage:["Data BDD"]});			
		this.sg1 = new saiGrid(this.pc3.childPage[0],{bound:[1,5,this.pc3.width-5,this.pc3.height-35],colCount:9,		            
				colTitle:["ID Kegiatan","Keterangan","Akun BDD","Akun Beban","Kode PP","Kode DRK","Saldo BDD","Total Beban","Nilai Beban"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,120,80,80,80,270,100]],
				colHide:[[7],[true]],				
				colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
				readOnly: true,autoAppend:false,defaultRow:1});
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
			this.noPiu = "";
			this.array_noPIU = [];
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_ntf21_fFinalBDDini.extend(window.portalui_childForm);
window.app_saku3_transaksi_tu_ntf21_fFinalBDDini.implement({			
	doProses: function(sender, page) {		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-FBD"+this.e_periode.getText().substr(2,4)+".","0000"));		
		
		this.sg1.clear(1);		
		var strSQL = "select a.kode_proyek,a.nama, "+					
					"isnull(c.saldo_bdd,0) as saldo_bdd, "+
					"isnull(e.total_beban,0) as total_beban, "+					
					"isnull(c.saldo_bdd,0) - isnull(e.total_beban,0) as nilai_beban "+
					
					",d.akun_bdd,d.akun_beban,d.kode_drkb,a.kode_pp "+
					
					"from prb_proyek a "+
					"inner join prb_proyek_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi "+
					
					//bdd yg sudah kas/di bymhd ato bdd dari inisiasi yg tidak ada it-aju-m-nya
					"left join ( "+
					"		select a.kode_proyek,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as saldo_bdd "+
					"		from prb_prbdd_d a "+
					"		left join it_aju_m b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
					"		where a.kode_lokasi ='"+this.app._lokasi+"' and "+
					"		((b.no_aju is null) or (not b.no_aju is null and b.no_kas<>'-') or (not b.no_aju is null and b.no_juspb<>'-') or (b.modul='PJPTG' and b.progress='4') ) "+
					"		group by a.kode_proyek "+
					"		) c on a.kode_proyek=c.kode_proyek "+
					
					"left join (  "+
					"		select kode_proyek,sum(case dc when 'D' then nilai else -nilai end) as total_beban "+
					"		from prb_beban_reklas where kode_lokasi ='"+this.app._lokasi+"' "+
					"		group by kode_proyek "+
					"		) e on a.kode_proyek=e.kode_proyek "+
					
					"where a.kode_lokasi='"+this.app._lokasi+"' and a.modul='INISIASI' and "+
					
					"		isnull(c.saldo_bdd,0) - isnull(e.total_beban,0) > 0 "+					
					"		and isnull(c.saldo_bdd,0) > 0 ";
					

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
			
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.nilai_beban);																	
			}
			this.e_total.setText(floatToNilai(tot));
		
		} else this.sg1.clear(1);		
		this.pc3.setActivePage(this.pc3.childPage[1]);
	}, 
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];
			this.sg1.appendData([line.kode_proyek,line.nama,line.akun_bdd,line.akun_beban,line.kode_pp,line.kode_drkb,floatToNilai(line.saldo_bdd),floatToNilai(line.total_beban),floatToNilai(line.nilai_beban)]);
		}
		this.sg1.setNoUrut(start);		
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
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AR','FBDDINI','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','Finalisasi BDD Inisiasi periode "+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_total.getText())+",0,0,'"+this.app._userLog+"','"+this.app._userLog+"','-','-','-','-','-','-','-')");
					
					for (var i=0;i < this.dataJU.rs.rows.length;i++) {
						var line = this.dataJU.rs.rows[i];	
						
						sql.add("insert into prb_beban_reklas (no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,nik_user,kode_proyek,form) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+line.akun_beban+"','"+line.kode_pp+"','"+line.kode_drkb+"','"+line.nama+"','D',"+parseFloat(line.nilai_beban)+",getdate(),'"+this.app._userLog+"','"+line.kode_proyek+"','FBDDINI')");
						sql.add("insert into prb_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,nik_user,kode_proyek,form) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+line.akun_bdd+"','"+line.kode_pp+"','"+line.nama+"','C',"+parseFloat(line.nilai_beban)+",getdate(),'"+this.app._userLog+"','"+line.kode_proyek+"','FBDDINI')");

						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+line.kode_proyek+"','"+this.dp_d1.getDateString()+"',1,'"+line.akun_beban+"','D',"+parseFloat(line.nilai_beban)+","+parseFloat(line.nilai_beban)+",'"+line.nama+"','FBDDINI','BEBAN','IDR',1,'"+line.kode_pp+"','"+line.kode_drkb+"','-','-','-','-','-','-','-')");
						sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','"+line.kode_proyek+"','"+this.dp_d1.getDateString()+"',2,'"+line.akun_bdd+"','C',"+parseFloat(line.nilai_beban)+","+parseFloat(line.nilai_beban)+",'"+line.nama+"','FBDDINI','BDD','IDR',1,'"+line.kode_pp+"','-','-','-','-','-','-','-','-')");

						sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
								"('"+this.e_nb.getText()+"','FINALBDD','"+this.app._lokasi+"','"+line.akun_beban+"','"+line.kode_pp+"','"+line.kode_drkb+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','D',0,"+parseNilai(line.nilai_beban)+")");									
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
					system.alert(this,"Transaksi tidak valid.","Total Akru tidak boleh kurang dari atau sama dengan nol.");
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
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
			
		this.sg1.clear(1);	
		this.e_total.setText("0");
		if (this.stsSimpan == 1) this.doClick();				
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg1.clear(1);
			this.bTampil.setVisible(true);
		}
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-FBD"+this.e_periode.getText().substr(2,4)+".","0000"));		
		setTipeButton(tbSimpan);			
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){									
							if (this.preView == "1") {
								this.nama_report="server_report_saku3_tu_proyek_rptPiutangPYT";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti = '"+this.e_nb.getText()+"' ";								
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