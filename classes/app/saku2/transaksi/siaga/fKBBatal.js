window.app_saku2_transaksi_siaga_fKBBatal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fKBBatal.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_siaga_fKBBatal";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank: Batal", 0);	
		
		this.maximize();		
		uses("portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti KB", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});							
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", readOnly:true,tag:1});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"NIK Pembuat", readOnly:true,tag:1});				
		this.e_modul = new saiLabelEdit(this,{bound:[20,13,200,20],caption:"Modul", readOnly:true,tag:1});				
		this.cb_bukti = new saiCBBL(this,{bound:[20,17,220,20],caption:"No Bukti",readOnly:true, tag:1});
		this.e_bank = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Acc. Bank", readOnly:true,tag:1});				
		this.e_akun = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Kode Akun", readOnly:true,tag:1});				
		this.e_via = new saiLabelEdit(this,{bound:[20,16,200,20],caption:"Jenis", readOnly:true,tag:1});				
		this.e_bg = new saiLabelEdit(this,{bound:[270,16,200,20],caption:"No BG", readOnly:true,tag:1});								
		this.e_curr = new saiLabelEdit(this,{bound:[20,14,145,20],caption:"Curr - Kurs", readOnly:true,tag:1});				
		this.e_kurs = new saiLabelEdit(this,{bound:[170,14,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"0"});		
		this.e_nilai = new saiLabelEdit(this,{bound:[270,14,200,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
				
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		setTipeButton(tbHapus);		
		this.setTabChildIndex();		
	}
};
window.app_saku2_transaksi_siaga_fKBBatal.extend(window.portalui_childForm);
window.app_saku2_transaksi_siaga_fKBBatal.implement({	
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
						sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from gr_kas_d where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("update gr_kaslist_d set no_kas='-' where modul='"+this.e_modul.getText()+"' and no_bukti='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						if (this.e_modul.getText() == "SPB") sql.add("update gr_spb_m set no_kas='-' where no_spb='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			this.e_nb.setSQL("select no_kas, keterangan from kas_m where posted ='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kas","keterangan"],false,["No KasBank","Deskripsi"],"and","Daftar KasBank",true);			
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var strSQL = "select no_bukti,modul from gr_kas_d where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.e_modul.setText(line.modul);										
				} 
			}
			switch(this.e_modul.getText()){
				case "SPB" :
						var strSQL = "select a.no_spb as no_bukti,a.keterangan,a.nilai,b.via,b.no_bg,b.kode_bank+' | '+c.nama as bank,d.kode_akun+' | '+d.nama as akun,"+
									 "       x.periode,x.tanggal,x.kode_curr,x.kurs,x.keterangan as kas_ket,x.nik_buat,y.nama as nama_buat "+
									 "from gr_spb_m a inner join gr_kaslist_d b on a.no_kaslist=b.no_kaslist and a.kode_lokasi=b.kode_lokasi "+
									 "                inner join bank c on b.kode_bank=c.kode_bank and b.kode_lokasi=c.kode_lokasi "+
									 "                inner join masakun d on c.kode_akun=d.kode_akun and d.kode_lokasi=c.kode_lokasi "+
									 "                inner join kas_m x on a.no_kas=x.no_kas and a.kode_lokasi=x.kode_lokasi "+
									 "                inner join karyawan y on x.nik_buat=y.nik and x.kode_lokasi=y.kode_lokasi "+
									 "where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;				
					
			}
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);					
					this.cb_bukti.setText(line.no_bukti,line.keterangan);
					this.e_ket.setText(line.kas_ket);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.e_curr.setText(line.kode_curr);
					this.e_kurs.setText(floatToNilai(line.kurs));
					this.e_nilai.setText(floatToNilai(line.nilai));								
					this.e_bank.setText(line.bank);
					this.e_akun.setText(line.akun);
					this.e_via.setText(line.via);
					this.e_bg.setText(line.no_bg);
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
