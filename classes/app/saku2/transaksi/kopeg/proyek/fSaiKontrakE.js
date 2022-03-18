window.app_saku2_transaksi_kopeg_proyek_fSaiKontrakE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_proyek_fSaiKontrakE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_proyek_fSaiKontrakE";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Kontrak Sewa: Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"ID Kontrak", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,500,20],caption:"No Dokumen", maxLength:100});				
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,14,500,20],caption:"Keterangan", maxLength:200});				
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Customer",multiSelection:false,tag:1});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doChange"]}); 		
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18]}); 		
		this.e_nilai = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Nilai", tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_ppn = new saiLabelEdit(this,{bound:[20,16,200,20],caption:"Nilai PPN",  tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_total = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Total Tagihan",  tipeText:ttNilai, text:"0", readOnly:true});		
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();						
			this.e_nb.setSQL("select no_kontrak, keterangan from sai_kontrak_m where kode_lokasi = '"+this.app._lokasi+"'",["no_kontrak","keterangan"],false,["ID Kontrak","Keterangan"],"and","Data Kontrak",true);														
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);																	
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_proyek_fSaiKontrakE.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_proyek_fSaiKontrakE.implement({	
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
					sql.add("delete from sai_kontrak_m where no_kontrak='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					var perAwal = this.dp_d1.getDateString().substr(0,4) + this.dp_d1.getDateString().substr(5,2);
					var perAkhir = this.dp_d2.getDateString().substr(0,4) + this.dp_d2.getDateString().substr(5,2);
					sql.add("insert into sai_kontrak_m(no_kontrak,kode_lokasi,nik_user,tgl_input,tgl_awal,tgl_akhir,no_dok,kode_cust,keterangan,nilai,nilai_ppn,per_awal,per_akhir,per_tagih) values "+
						   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.e_dok.getText()+"','"+this.cb_cust.getText()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+",'"+perAwal+"','"+perAkhir+"','"+perAwal+"')");
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
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);							
					setTipeButton(tbUbahHapus);
				}
				break;
			case "ubah" :	
			    this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sai_kontrak_m where no_kontrak='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);				
				break;				
		}
	},			
	doChange:function(sender){
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select * from sai_kontrak_m where no_kontrak='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.dp_d1.setText(line.tgl_awal);
					this.dp_d2.setText(line.tgl_akhir);
					this.e_dok.setText(line.no_dok);
					this.e_ket.setText(line.keterangan);
					this.e_nilai.setText(floatToNilai(line.nilai));
					this.e_ppn.setText(floatToNilai(line.nilai_ppn));
					this.cb_cust.setText(line.kode_cust);
				}
			}
		}		
		if (sender == this.e_nilai && this.e_nilai.getText()!=""){
			this.e_ppn.setText(floatToNilai(Math.abs(nilaiToFloat(this.e_nilai.getText())*0.1)));
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText())));
		}
		if (sender == this.e_ppn && this.e_ppn.getText()!=""){
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText()) + nilaiToFloat(this.e_ppn.getText())));
		}		
		if (sender == this.dp_d1) {
			var strSQL = "select dateadd(month,12,'"+this.dp_d1.getDateString()+"') as tgl ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.dp_d2.setText(line.tgl);						
				}					
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
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