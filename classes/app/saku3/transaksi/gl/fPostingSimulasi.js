window.app_saku3_transaksi_gl_fPostingSimulasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_gl_fPostingSimulasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_gl_fPostingSimulasi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Posting Transaksi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Posting",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		
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
			this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from gldt");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_gl_fPostingSimulasi.extend(window.childForm);
window.app_saku3_transaksi_gl_fPostingSimulasi.implement({
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
			this.doClick(this.i_gen);		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into posting_m(no_post,kode_lokasi,periode,tanggal,modul,keterangan,nik_buat,nik_app,no_del,tgl_input,nik_user,nilai) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','-',getdate(),'"+this.app._userLog+"',0)");
					$sql="select a.periode "+
						"from (select distinct periode from ju_j where periode>='"+this.periode+"' "+
						"union "+
						"select distinct periode from kas_j where periode>='"+this.periode+"' "+
						"union "+
						"select distinct periode from sis_bill_j where periode>='"+this.periode+"' "+
						"union "+
						"select distinct periode from sis_rekon_j where periode>='"+this.periode+"' "+
						"union "+
						"select distinct periode from hutang_j where periode>='"+this.periode+"' "+
						"	)a";
					var data = this.dbLib.getDataProvider($sql,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined)
					{
						this.dataJU = data;
						var line;
						for (var i=0;i < this.dataJU.rs.rows.length;i++)
						{
							line = this.dataJU.rs.rows[i];
							sql.add("exec sp_post_simulasi '"+line.periode+"'");
						}
					}
					
					
					sql.add("insert into posting_d(no_post,modul,no_bukti,status,catatan,no_del,kode_lokasi,periode) "+
							"select '"+this.e_nb.getText()+"',modul,no_bukti,'POSTING','-','-',kode_lokasi,'"+this.e_periode.getText()+"' "+
							"from gldt_tmp "+
							"group by no_bukti,modul,kode_lokasi,periode");
									
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
					this.c_modul.setText("");
					this.cb_bukti.setText("","");
					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);		
		this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"posting_m","no_post",this.app._lokasi+"-POST"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
		
	},
	
	doChange:function(sender){
		if (sender == this.e_periode || sender == this.c_jenis) this.doClick(this.i_gen);
		if (sender == this.e_periode) {
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1);
		}		
		
		if (sender == this.cb_bukti && this.cb_bukti.getText()!="") {
			try {
				this.dataJU.rs.rows = [];
				this.dataJU.rs.rows[0] = {status:"INPROG",no_bukti:this.cb_bukti.dataFromList[0],no_dokumen:this.cb_bukti.dataFromList[1],tanggal:this.cb_bukti.dataFromList[2],keterangan:this.cb_bukti.dataFromList[3],jenis:this.cb_bukti.dataFromList[4].toUpperCase()}; 
				this.sgn.setTotalPage(1);
				this.sgn.rearrange();
				this.doTampilData(1);
				this.pc1.setActivePage(this.pc1.childPage[1]);								
			}
			catch(e) {alert(e);}
		}
	},
	
	
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.nama_report="server_report_saku2_kopeg_sju_rptGlPostingSimulasiSum";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_post='"+this.e_nb.getText()+"' ";
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
	}
	
});
