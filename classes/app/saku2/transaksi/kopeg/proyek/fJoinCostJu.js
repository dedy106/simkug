window.app_saku2_transaksi_kopeg_proyek_fJoinCostJu = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_proyek_fJoinCostJu.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_proyek_fJoinCostJu";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Hapus Join Cost: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,12,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false,change:[this,"doChange"]}); 				
		this.cb_id = new portalui_saiCBBL(this,{bound:[20,19,220,20],caption:"ID Project",tag:1,multiSelection:false,change:[this,"doChange"]}); 				
		this.e_uraian = new saiLabelEdit(this,{bound:[20,16,550,20],caption:"Nama Project", readOnly:true});				
		this.e_nproyek = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.c_jenis = new saiCB(this,{bound:[20,12,200,20],caption:"Jenis",items:["JU","KB"], readOnly:true,change:[this,"doChange"],tag:2});	
		this.c_periode2 = new saiCB(this,{bound:[20,13,182,20],caption:"Periode",readOnly:true,change:[this,"doChange"],tag:2});		
		this.cb_nb = new portalui_saiCBBL(this,{bound:[20,19,220,20],caption:"No Bukti",tag:1,multiSelection:false}); 
		this.e_nilai = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai", tag:1, tipeText:ttNilai, text:"0",readOnly:false});
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
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif ='1' and tipe = 'Posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi/Unit",true);						
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);
			this.c_periode2.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode from ju_m where kode_lokasi='"+this.app._lokasi+"' "+
												"union "+
												"select distinct periode from kas_m where kode_lokasi='"+this.app._lokasi+"' "+
												"order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode2.addItem(i,line.periode);
				}
			}		
			this.c_periode2.setText(this.app._periode);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_proyek_fJoinCostJu.extend(window.childForm);
window.app_saku2_transaksi_kopeg_proyek_fJoinCostJu.implement({	
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
					sql.add("insert into pr_joincost_d (no_aju,kode_lokasi,no_proyek,nilai,no_proyek_awal) values "+
							"('"+this.cb_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_id.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+",'-')");
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
					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doChange:function(sender){
		if (sender==this.cb_pp && this.cb_pp.getText()!="") {	
			
			this.cb_id.setText("","");
			this.cb_id.setSQL("select no_proyek, keterangan from pr_proyek_m where kode_pp='"+this.cb_pp.getText()+"'  and kode_lokasi='"+this.app._lokasi+"'",["no_proyek","keterangan"],false,["ID Project","Deskripsi"],"and","Data Project",true);									
					
		}
		if (sender==this.c_jenis&& this.c_jenis.getText()!="") {
			this.cb_nb.setText("","");
			if (this.c_jenis.getText()=="JU")
			{
				this.cb_nb.setSQL("select no_ju, keterangan from ju_m where periode='"+this.c_periode2.getText()+"'  and kode_lokasi='"+this.app._lokasi+"'",["no_ju","keterangan"],false,["No Bukti","Keterangan"],"and","Data Jurnal",true);
			}
			else
			{
				this.cb_nb.setSQL("select no_kas, keterangan from kas_m where periode='"+this.c_periode2.getText()+"'  and kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No Bukti","Keterangan"],"and","Data Jurnal",true);									
			}
		}
		if (sender==this.c_periode2&& this.c_periode2.getText()!="") {
			this.cb_nb.setText("","");
			if (this.c_jenis.getText()=="JU")
			{
				this.cb_nb.setSQL("select no_ju, keterangan from ju_m where periode='"+this.c_periode2.getText()+"'  and kode_lokasi='"+this.app._lokasi+"'",["no_ju","keterangan"],false,["No Bukti","Keterangan"],"and","Data Jurnal",true);
			}
			else
			{
				this.cb_nb.setSQL("select no_kas, keterangan from kas_m where periode='"+this.c_periode2.getText()+"'  and kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No Bukti","Keterangan"],"and","Data Jurnal",true);									
			}
		}
		if (sender==this.cb_id && this.cb_id.getText()!="") {
			var strSQL = "select a.keterangan,a.nilai "+
			             "from pr_proyek_m a "+						 
						 "where a.no_proyek = '"+this.cb_id.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];				
				this.e_uraian.setText(line.keterangan);
				this.e_nproyek.setText(floatToNilai(line.nilai));								
			}
			
									
			
			
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tereksekusi","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}		
});