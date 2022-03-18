window.app_saku2_transaksi_kopeg_simpan_fKartuE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_simpan_fKartuE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_simpan_fKartuE";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kartu Simpanan: Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_nb = new portalui_saiCBBL(this,{bound:[20,11,220,20],caption:"No Kartu",tag:0, multiSelection:false, change:[this,"doChange"]});
		this.cb_agg = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Anggota",readOnly:true});
		this.cb_simp = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"Jenis Simp",readOnly:true});
		this.e_jenis = new portalui_saiLabelEdit(this,{bound:[20,17,180,20],caption:"Kelompok",readOnly:true,tag:2});						
		this.l_tgl = new portalui_label(this,{bound:[20,13,100,18],caption:"Tgl Mulai Tagihan", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],date:new Date().getDateStr()});
		this.cb_ar = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"Piutang Simpanan",readOnly:true, tag:2});
		this.cb_titip = new portalui_saiCBBL(this,{bound:[20,12,200,20],caption:"Akun Simpanan",readOnly:true, tag:2});
		this.cb_status = new portalui_saiCB(this,{bound:[20,16,180,20],caption:"Status Pembayaran",items:["GAJI","TUNAI"],tag:2,readOnly:true});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[20,17,180,20],caption:"Nilai Simpanan",maxLength:15,tipeText:ttNilai,text:"0"});		
		this.e_bunga = new portalui_saiLabelEdit(this,{bound:[20,18,180,20],caption:"Bunga Simpanan",maxLength:15,tipeText:ttNilai,text:"0"});		
		this.cb1 = new portalui_checkBox(this,{bound:[20,19,200,20],caption:"Status AKTIF"});		
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.e_nb.setSQL("select no_simp,kode_simp from kop_simp_m where kode_lokasi = '"+this.app._lokasi+"'",["no_simp","kode_simp"],false,["Kode","Jenis"],"and","Data Kartu",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_simpan_fKartuE.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_simpan_fKartuE.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kop_simp_m where no_simp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (this.cb1.isSelected()) var stsAktif = "1"; else stsAktif = "0";
					
					var thnBln = this.dp_d1.getDateString().substr(0,4) + this.dp_d1.getDateString().substr(5,2);
					sql.add("insert into kop_simp_m (no_simp ,kode_lokasi ,kode_agg ,kode_simp ,jenis ,nilai ,p_bunga, tgl_tagih ,status_bayar ,periode_gen ,status_aktif ,nik_user ,tgl_input,periode_bunga ) values  "+
							"('"+this.e_nb.getText()+"' ,'"+this.app._lokasi+"' ,'"+this.cb_agg.getText()+"' ,'"+this.cb_simp.getText()+"' ,'"+this.e_jenis.getText()+"' ,"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_bunga.getText())+",'"+this.dp_d1.getDateString()+"' ,'"+this.cb_status.getText()+"','"+thnBln+"','"+stsAktif+"','"+this.app._userLog+"' ,now(),'"+thnBln+"' )");
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
				}
				break;
			case "ubah" :	this.simpan();
				break;
			case "hapus" :	this.simpan();
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from kop_simp_m where no_simp='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");				
				this.dbLib.execArraySQL(sql);
				break;
		}
	},
	doChange: function(sender){
		try{						
			if (sender == this.e_nb && this.e_nb.getText()!="" ) {				
				var strSQL = "select d.kode_agg,d.nama as nama_agg,a.kode_simp,a.nama as nama_simp,a.akun_ar, a.akun_simp, a.jenis, x.nilai, x.p_bunga, x.status_bayar, x.status_aktif, b.nama as nama_ar,c.nama as nama_simp "+
				             "from kop_simp_m x inner join kop_simp_jenis a on a.kode_simp=x.kode_simp and a.kode_lokasi=x.kode_lokasi "+
						     "       inner join masakun b on a.akun_ar=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							 "       inner join masakun c on a.akun_simp=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
							 "       inner join kop_agg d on x.kode_agg=d.kode_agg and x.kode_lokasi=d.kode_lokasi "+
							 "where x.no_simp='"+this.e_nb.getText()+"' and x.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.cb_agg.setText(line.kode_agg,line.nama_agg);
						this.cb_simp.setText(line.kode_simp,line.nama_simp);
						this.e_jenis.setText(line.jenis);												
						this.cb_ar.setText(line.akun_ar,line.nama_ar);						
						this.cb_titip.setText(line.akun_simp,line.nama_simp);						
						this.cb_status.setText(line.status_bayar);																								
						this.e_nilai.setText(floatToNilai(line.nilai));						
						this.e_bunga.setText(floatToNilai(line.p_bunga));							
						if (line.status_aktif == "0") this.cb1.setSelected(false);
						else this.cb1.setSelected(true);
					}
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simp_m","no_simp",this.app._lokasi+"-"+this.e_jenis.getText()+this.cb_agg.getText()+".","000"));		
		    this.dp_d1.setFocus();
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});