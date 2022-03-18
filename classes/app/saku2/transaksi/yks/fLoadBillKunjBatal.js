window.app_saku2_transaksi_yks_fLoadBillKunjBatal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fLoadBillKunjBatal.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_yks_fLoadBillKunjBatal";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Billing Kunjungan : Pembatalan", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bill", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});				
		this.cb_data = new saiCBBL(this,{bound:[20,17,222,20],caption:"Data HR Peserta", multiSelection:false, maxLength:10, tag:2});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});					
		this.e_kunj = new saiLabelEdit(this,{bound:[20,12,202,20],caption:"Nilai Kunjungan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.e_cs = new saiLabelEdit(this,{bound:[20,17,202,20],caption:"Nilai Cost Sharing", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
				
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		this.cb_data.setSQL("select no_load, keterangan from yk_peserta_m ",["no_load","keterangan"],false,["No Bukti","Keterangan"],"and","Data HR Peserta",true);			
		setTipeButton(tbHapus);		
		this.setTabChildIndex();		
	}
};
window.app_saku2_transaksi_yks_fLoadBillKunjBatal.extend(window.portalui_childForm);
window.app_saku2_transaksi_yks_fLoadBillKunjBatal.implement({	
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);									
					setTipeButton(tbHapus);
				}
				break;
			case "hapus" :	
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);					
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();								
							sql.add("delete from yk_billkunj_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("delete from yk_billkunj_d where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
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
			this.e_nb.setSQL("select no_bill, keterangan from yk_billkunj_m where no_bill not like '__-BKJ%' and progress ='0' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Deskripsi"],"and","Daftar Billing",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider(
					   "select a.tanggal,a.keterangan,a.total_kunj,a.total_cs,a.no_load,b.keterangan as ketload "+
			           "from yk_billkunj_m a inner join yk_peserta_m b on a.no_load=b.no_load "+
					   "where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.cb_data.setText(line.no_load,line.ketload);										
					this.dp_d1.setText(line.tanggal);					
					this.e_ket.setText(line.keterangan);					
					this.e_kunj.setText(floatToNilai(line.total_kunj));
					this.e_cs.setText(floatToNilai(line.total_cs));
				} 
			}				
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
