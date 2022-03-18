window.app_saku3_transaksi_gl_fSapTbPp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_gl_fSapTbPp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_gl_fSapTbPp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Posting Transaksi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:0});
		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true, tag:2});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_nama = new saiLabelEdit(this,{bound:[20,13,300,20],caption:"Keterangan", maxLength:50, tag:1});
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
			
			this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from periode where kode_lokasi='"+this.app._lokasi+"'");
			this.e_periode.setText(this.periode);
			this.e_nama.setText("Posting SAP periode "+this.periode);
			this.doClick(this.i_gen);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_gl_fSapTbPp.extend(window.childForm);
window.app_saku3_transaksi_gl_fSapTbPp.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					this.doClick(this.i_gen);
					var nu=this.dbLib.getPeriodeFromSQL("select isnull(MAX(nu),0) as periode from sap_tb_m where kode_lokasi='"+this.app._lokasi+"'");
					var no_bukti=this.dbLib.getPeriodeFromSQL("select no_bukti as periode from sap_tb_m where kode_lokasi='"+this.app._lokasi+"' and nu="+nu);
					if (nu==0)
					{
						var sql1="insert into sap_tb_d "+
							"select '"+this.e_nb.getText()+"' as no_bukti,kode_akun,kode_lokasi,periode,kode_pp,case when so_akhir>0 then 'D' else 'C' end as dc,abs(so_akhir),abs(so_akhir) "+
							"from exs_glma_pp where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.e_periode.getText()+"' and so_akhir<>0 ";
					}
					else
					{
						var sql1="insert into sap_tb_d "+
							"select '"+this.e_nb.getText()+"' as no_bukti,a.kode_akun,a.kode_lokasi,a.periode,a.kode_pp, "+
							"	   case when abs(a.so_akhir)-isnull(b.so_akhir,0)>0 then 'D' else 'C' end as dc,abs(a.so_akhir)-isnull(b.so_akhir,0),abs(a.so_akhir) "+
							"from exs_glma_pp a "+
							"left join sap_tb_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp  "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and a.so_akhir<>0 and b.no_bukti='"+no_bukti+"' ";
					}
					sql.add("insert into sap_tb_m(no_bukti,kode_lokasi,periode,keterangan,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.e_nama.getText()+"',getdate(),'"+this.app._userLog+"')");

					sql.add(sql1);
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
					this.standarLib.clearByTag(this, new Array("2"),this.e_nb);
					this.doClick(this.i_gen);
					
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
	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sap_tb_m","no_bukti",this.app._lokasi+"-SAP"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_nama.setText("Posting SAP periode "+this.e_periode.getText());
			setTipeButton(tbSimpan);
		}
		
	},
	
	doChange:function(sender){
		
		
		
	},
	
	
	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._periode = closePeriode(this.app._periode,this.maxPeriode);
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");							
							this.app._mainForm.bClear.click();
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
	}
	
});
