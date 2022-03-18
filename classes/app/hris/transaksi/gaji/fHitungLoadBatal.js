window.app_hris_transaksi_gaji_fHitungLoadBatal = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_gaji_fHitungLoadBatal.prototype.parent.constructor.call(this, owner);
		this.className = "app_hris_transaksi_gaji_fHitungLoadBatal";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan Gaji : Batal", 0);	
		
		this.maximize();		
		uses("portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Gaji", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});							
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:100});	
		this.e_pesan = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Pesan", maxLength:100});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal Transfer", underline:true}); 
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18],date:new Date().getDateStr()}); 
		this.cb_buat = new saiCBBL(this,{bound:[20,16,205,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:1});
				
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		setTipeButton(tbHapus);		
		this.setTabChildIndex();		
	}
};
window.app_hris_transaksi_gaji_fHitungLoadBatal.extend(window.portalui_childForm);
window.app_hris_transaksi_gaji_fHitungLoadBatal.implement({	
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
					if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
						return false;
					}	
					else {	
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();
						
						sql.add("delete from gr_gaji_m where no_gaji='"+this.e_nb.getText()+"' and periode='"+this.e_periode.getText()+"'");
						sql.add("delete from gr_gaji_d where no_gaji='"+this.e_nb.getText()+"' and periode='"+this.e_periode.getText()+"'");
						sql.add("delete from gr_gaji_load where no_gaji='"+this.e_nb.getText()+"' and periode='"+this.e_periode.getText()+"'");

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
		if (sender == this.e_periode && this.e_periode.getText()!="") {									
			this.e_nb.setSQL("select no_gaji, keterangan from gr_gaji_m where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_gaji","keterangan"],false,["No Gaji","Deskripsi"],"and","Daftar Bukti",true);			
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var strSQL = "select a.no_gaji,a.periode,a.tanggal,a.keterangan,a.tgl_transfer,a.nik_buat,a.pesan,b.nama nama_buat "+						 
						 "from gr_gaji_m a inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);										
					this.e_ket.setText(line.kas_ket);
					this.e_pesan.setText(line.pesan);
					this.dp_d2.setText(line.tgl_transfer);					
					this.cb_buat.setText(line.nik_buat,line.nama_buat);					
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
