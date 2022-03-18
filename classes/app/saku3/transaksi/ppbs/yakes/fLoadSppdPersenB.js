window.app_saku3_transaksi_ppbs_yakes_fLoadSppdPersenB = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_yakes_fLoadSppdPersenB.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_ppbs_yakes_fLoadSppdPersenB";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Biaya Perjalanan Dinas (Cek Outlook): Batal", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,220,20],caption:"No BPD", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.cb_akun = new saiCBBL(this,{bound:[20,13,220,20],caption:"Akun BPD", readOnly:true});		
		this.cb_pp = new saiCBBL(this,{bound:[20,11,220,20],caption:"PP", readOnly:true});		
		this.e_total = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.rearrangeChild(10, 23);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
				
		setTipeButton(tbHapus);		
		
		this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Daftar PP",true);
		var tahun = parseFloat(this.dp_d1.year) + 1;
		this.e_tahun.setText(tahun);			
		this.nik_user = this.app._nikUser;
		
	}
};
window.app_saku3_transaksi_ppbs_yakes_fLoadSppdPersenB.extend(window.portalui_childForm);
window.app_saku3_transaksi_ppbs_yakes_fLoadSppdPersenB.implement({			
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					setTipeButton(tbHapus);					
				}
				break;
			case "hapus" :							
					if (this.prog != "0") {
						system.alert(this,"Transaksi tidak valid.","Transaksi ABAU telah di Close.");
						return false;
					}
					if (nilaiToFloat(this.e_total.getText()) <= 0 ) {
						system.alert(this,"Transaksi tidak valid.","Transaksi tidak boleh nol atau kurang.");
						return false;						
					}
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{														
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();																																											
							sql.add("delete from agg_pd_m where no_pd ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_tahun.getText()+"'");
							sql.add("delete from agg_pd_d where no_pd ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_tahun.getText()+"'");
							sql.add("delete from agg_d where no_bukti ='"+this.e_nb.getText()+"' and modul='BSPPD' and kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.e_tahun.getText()+"'");
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
							setTipeButton(tbHapus);
						}
					}
				break;
		}
	},		
	doChange: function(sender){	
		if (sender == this.e_tahun && this.e_tahun.getText()!= "") {						
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'ABAU' and tahun = '"+this.e_tahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}
			//this.e_nb.setSQL("select a.no_pd, a.kode_pp from agg_pd_m a inner join pp b on a.kode_pp=b.kode_pp where b.kode_lokasi <> '00' and b.kode_bidang='"+this.app._kodeBidang+"' and a.tahun='"+this.e_tahun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_pd","a.kode_pp"],false,["No BPD","Deskripsi"],"and","Daftar Bukti",true);
						this.e_nb.setSQL("select a.no_pd, a.kode_pp from agg_pd_m a where  a.tahun='"+this.e_tahun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_pd","a.kode_pp"],false,["No BPD","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!= "") {
			this.cb_pp.setText(this.e_nb.rightLabelCaption);
			var data = this.dbLib.getDataProvider("select kode_akun,nilai from agg_pd_m where no_pd='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.cb_akun.setText(line.kode_akun);
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
						this.app._mainForm.pesan(2,"Transaksi Sukses tersimpan");
						this.app._mainForm.bClear.click();              						
					}else {
						system.info(this, result,"");											
						setTipeButton(tbHapus);
					}
				break;
			}
		}		
	}	
});
