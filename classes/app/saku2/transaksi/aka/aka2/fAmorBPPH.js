window.app_saku2_transaksi_aka_aka2_fAmorBPPH = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fAmorBPPH.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_aka2_fAmorBPPH";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Amortisasi BPP : Pembatalan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", readOnly:true});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"NIK Pembuat", readOnly:true});
		this.cb_app = new saiCBBL(this,{bound:[20,17,220,20],caption:"NIK Approve", readOnly:true});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Total Amortisasi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
	
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_aka2_fAmorBPPH.extend(window.childForm);
window.app_saku2_transaksi_aka_aka2_fAmorBPPH.implement({
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					setTipeButton(tbHapus);
				break;
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				else {
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					var perBefore = this.perLama;
					sql.add("update a set a.periode_susut='"+perBefore+"' "+
							"from aka_bill_d a inner join aka_amor_d b on a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_amor = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'");					
					
					sql.add("delete from aka_amor_m where no_amor = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");					
					sql.add("delete from aka_amor_j where no_amor = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");															
					sql.add("delete from aka_amor_d where no_amor = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");					
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
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
		if (sender == this.e_periode) {
			if (this.e_periode.getText()!="")  {
				this.e_nb.setSQL("select no_amor, keterangan from aka_amor_m where modul = 'AMOLOADPR' and posted ='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_amor","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti Amortisasi",true);
			}						
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider(
					   "select convert(varchar,tanggal,103) as tanggal,a.periode,a.keterangan,a.nik_buat,a.nik_app,b.nama as nama_buat,d.nama as nama_app,a.nilai "+
					   "from aka_amor_m a "+
			           "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
					   "	inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+			           
					   "where a.no_amor='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_app.setText(line.nik_app,line.nama_app);					
					this.e_nilai.setText(floatToNilai(line.nilai));
				} 
			}
			this.doLoadData();
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses terhapus (No Bukti : "+ this.e_nb.getText()+")","");
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