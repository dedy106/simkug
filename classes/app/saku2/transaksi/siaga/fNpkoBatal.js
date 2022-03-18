window.app_saku2_transaksi_siaga_fNpkoBatal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fNpkoBatal.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_siaga_fNpkoBatal";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form NPKO : Batal", 0);	
		
		this.maximize();		
		uses("portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No NPKO", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_lokasi = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Lokasi", maxLength:150, readOnly:true});		
		this.e_sarana = new saiLabelEdit(this,{bound:[500,13,425,20],caption:"Sarana", maxLength:150, readOnly:true});		
		this.e_vol = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Volume", maxLength:150, readOnly:true});		
		this.e_lingkup = new saiLabelEdit(this,{bound:[500,15,425,20],caption:"Lingkup", maxLength:150, readOnly:true});		
		this.e_waktu = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Waktu", maxLength:150, readOnly:true});				
		this.cb_dept = new saiCBBL(this,{bound:[20,13,200,20],caption:"Departemen", multiSelection:false, maxLength:10, tag:1, readOnly:true});
		this.cb_pp = new saiCBBL(this,{bound:[20,14,200,20],caption:"Unit Kerja", multiSelection:false, maxLength:10, tag:1, readOnly:true});		
		this.e_total = new saiLabelEdit(this,{bound:[20,15,220,20],caption:"Nilai NPKO", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		setTipeButton(tbHapus);		
		this.setTabChildIndex();		
	}
};
window.app_saku2_transaksi_siaga_fNpkoBatal.extend(window.portalui_childForm);
window.app_saku2_transaksi_siaga_fNpkoBatal.implement({	
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
						
						sql.add("delete from gr_npko_m where no_npko = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from gr_npko_d where no_npko = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						
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
			this.e_nb.setSQL("select distinct a.no_npko, a.lingkup from gr_npko_m a left join (select no_npko,no_spb,kode_lokasi from gr_npko_d where no_spb<>'-' and kode_lokasi='"+this.app._lokasi+"') b on a.no_npko=b.no_npko and a.kode_lokasi=b.kode_lokasi "+
			                 "where b.no_spb is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_npko","a.lingkup"],false,["No NPKO","Lingkup"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {					
			var strSQL = "select a.tanggal,a.lokasi,a.sarana,a.vol,a.lingkup,a.waktu,a.kode_dept,a.kode_pp,b.nama as nama_dept,c.nama as nama_pp,a.nilai "+
						 "from gr_npko_m a inner join gr_dept b on a.kode_dept=b.kode_dept and a.kode_lokasi=b.kode_lokasi "+
						 "                 inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "where a.no_npko='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.dp_d1.setText(line.tanggal);					
					this.e_lokasi.setText(line.lokasi);
					this.e_sarana.setText(line.sarana);
					this.e_vol.setText(line.vol);
					this.e_lingkup.setText(line.lingkup);
					this.e_waktu.setText(line.waktu);
					this.cb_dept.setText(line.kode_dept,line.nama_dept);
					this.cb_pp.setText(line.kode_pp,line.nama_pp);
					this.e_total.setText(floatToNilai(line.nilai));					
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
