window.app_saku3_transaksi_ppbs_fPaSinkronRkm = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaSinkronRkm.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_fPaSinkronRkm";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Sinkorinisasi RKM", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.c_tahun = new saiCB(this,{bound:[20,13,180,20],caption:"Tahun",readOnly:true,tag:9,change:[this,"doChange"]});
		this.bLoad = new button(this,{bound:[120,16,80,18],caption:"Sinkronisasi",click:[this,"doSinc"]});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select distinct tahun from agg_pp order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			
			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_fPaSinkronRkm.extend(window.childForm);
window.app_saku3_transaksi_ppbs_fPaSinkronRkm.implement({	
	doSinc: function() {
		uses("server_util_arrayList");
		var sql = new server_util_arrayList();

		sql.add("delete from agg_d where kode_lokasi='"+this.app._lokasi+"' and substring(periode,1,4)='"+this.c_tahun.getText()+"' and modul='RKM'");
		sql.add("insert into agg_d( no_bukti, kode_lokasi, kode_pp, kode_drk, kode_akun, kode_norma, keterangan, satuan, periode, tarif, jumlah, vol, total, modul, nu) "+
				"select  a.no_bukti, a.kode_lokasi, a.kode_pp, a.kode_ip as kode_drk, a.kode_akun, '-' as kode_norma, b.nama as keterangan, 'Paket' as satuan, a.periode, a.nilai as tarif, 1 as jumlah, 1 as vol, a.nilai as total, 'RKM' as modul, 1 as nu "+
				"from rkm_target_d a "+
				"inner join rkm_ip b on a.kode_ip=b.kode_ip and a.kode_lokasi=b.kode_lokasi and substring(a.periode,1,4)=b.tahun "+
				"where a.kode_lokasi='"+this.app._lokasi+"' and substring(a.periode,1,4)='"+this.c_tahun.getText()+"'");
		
		sql.add("insert into agg_drk "+
				"SELECT kode_pu as kode_drk, tahun, kode_lokasi, nama, '1' as flag_aktif, kode_ss as kode_rkm, '-' as jenis "+
				"FROM rkm_pu where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"' "+
				"and kode_pu not in (select kode_drk from agg_drk where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"') ");

		sql.add("insert into agg_program "+
				"SELECT   kode_ts as kode_program, kode_lokasi, tahun, nama, '1' as flag_aktif, '-' as kode_pp, '-' as jenis "+
				"FROM   rkm_ts where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"' "+        
				"and kode_ts not in (select kode_program from agg_program where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"') ");

		sql.add("insert into agg_rkm "+
				"SELECT    kode_ss as     kode_rkm, kode_lokasi, tahun, nama, '1' as flag_aktif,kode_ts as  kode_program, '-' as kode_pp, '-' as jenis "+
				"FROM rkm_ss where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"' "+
				"and kode_ss not in (select kode_rkm from agg_rkm where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"') ");

		setTipeButton(tbAllFalse);
		this.dbLib.execArraySQL(sql);
	},
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					setTipeButton(tbAllFalse);					
				}
				break;						
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi.");							
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