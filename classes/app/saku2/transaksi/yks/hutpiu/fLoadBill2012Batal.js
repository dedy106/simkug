window.app_saku2_transaksi_yks_hutpiu_fLoadBill2012Batal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_hutpiu_fLoadBill2012Batal.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_yks_hutpiu_fLoadBill2012Batal";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Billing Pengobatan dan Kunjungan 2012: Pembatalan", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bill", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});						
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});			
		this.c_jenis = new saiLabelEdit(this,{bound:[20,13,202,20],caption:"Jenis Load", readOnly:true, tag:1});
		this.e_total = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"Total Net Biaya", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_kunj = new saiLabelEdit(this,{bound:[20,15,202,20],caption:"Total Kunjungan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_cs = new saiLabelEdit(this,{bound:[20,16,202,20],caption:"Total Cost Sharing", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,344],visible:false,caption:"Data Bill Pengobatan"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:17,tag:9,
				colTitle:["Kode Mitra","No Ref","NIK","Nama","Loker","Band","NIKKES","Nama Pasien","Dokter","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Nilai","Nilai Kunj","Nilai CS","PPh"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,100,70,70,70,70,70,100,70,70,100,100,70,100,70]],
				colFormat:[[13,14,15,16],[cfNilai,cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
				
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		setTipeButton(tbHapus);		
		this.setTabChildIndex();		
	}
};
window.app_saku2_transaksi_yks_hutpiu_fLoadBill2012Batal.extend(window.portalui_childForm);
window.app_saku2_transaksi_yks_hutpiu_fLoadBill2012Batal.implement({	
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
					this.sg1.clear(1); 
					setTipeButton(tbHapus);
				}
				break;
			case "hapus" :	
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);					
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();								
							sql.add("delete from yk_bill_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("delete from yk_bill_d where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("delete from yk_billkunj_m where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("delete from yk_billkunj_d where no_bill = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							sql.add("delete from angg_r  where modul = 'BILL' and no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
							
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
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
	},	
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select no_bill, keterangan from yk_bill_m where no_bill like '__-BKJ%' and progress ='0' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_bill","keterangan"],false,["No Bill","Deskripsi"],"and","Daftar Billing",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.tanggal,a.keterangan,a.nilai,a.jenis from yk_bill_m a where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.dp_d1.onSelect.set(this,undefined);
					this.dp_d1.setText(line.tanggal);
					this.c_jenis.setText(line.jenis);
					this.e_ket.setText(line.keterangan);					
					this.e_total.setText(floatToNilai(line.nilai));
				} 
			}
			var data = this.dbLib.getDataProvider("select a.total_kunj,a.total_cs from yk_billkunj_m a where a.no_bill='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
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
						this.app._mainForm.pesan(2,"Transaksi Sukses tereksekusi : ("+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
