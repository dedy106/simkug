window.app_saku2_transaksi_aka_aka2_fBillHapus = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fBillHapus.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_aka_aka2_fBillHapus";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Tagihan : Pembatalan", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,220,20],caption:"No Load", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", readOnly:true});			
		this.cb_pp = new saiCBBL(this,{bound:[20,14,220,20],caption:"PP", readOnly:true});
		this.e_total = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		
		setTipeButton(tbHapus);				
	}
};
window.app_saku2_transaksi_aka_aka2_fBillHapus.extend(window.portalui_childForm);
window.app_saku2_transaksi_aka_aka2_fBillHapus.implement({
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
							sql.add("delete from aka_bill_m where no_bill ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
							sql.add("delete from aka_bill_d where no_bill ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
							sql.add("delete from aka_bill_h where no_bill ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
							sql.add("delete from aka_bill_bea where no_bill ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
							sql.add("delete from aka_bill_j where no_bill ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
							sql.add("delete from angg_r where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
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
	doChange: function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select no_bill, keterangan from aka_bill_m where posted ='F' and jenis = 'BLOAD' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Load","Deskripsi"],"and","Daftar Bukti Load Billing",true);			
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider(
					   "select convert(varchar,tanggal,103) as tanggal,keterangan,kode_pp "+
					   "from aka_bill_m  "+			           
					   "where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);
					this.cb_pp.setText(line.kode_pp,line.nama_pp);					
				} 
			}
			var data = this.dbLib.getDataProvider(
					   "select sum(case dc when 'D' then nilai else -nilai end) as total "+
					   "from aka_bill_d "+			           
					   "where no_bill='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_total.setText(floatToNilai(line.total));					
				} 
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses Terhapus.("+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
