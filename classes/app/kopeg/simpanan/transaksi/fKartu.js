window.app_kopeg_simpanan_transaksi_fKartu = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_transaksi_fKartu.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_simpanan_transaksi_fKartu";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kartu Simpanan: Input", 0);	
		
		uses("portalui_saiCB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_agg = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Nasabah",btnClick:[this,"doBtnClick"],tag:0});
		this.cb_simp = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"Jenis Simp.",btnClick:[this,"doBtnClick"],change:[this,"doChange"],tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,250,20],caption:"No Kartu",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,12,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.l_tgl = new portalui_label(this,{bound:[20,13,100,18],caption:"Tgl Awal Tagihan", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],date:new Date().getDateStr()});
		this.e_ar = new portalui_saiLabelEdit(this,{bound:[20,14,400,20],caption:"Akun Piutang", readOnly:true, tag:2});		
		this.e_simp = new portalui_saiLabelEdit(this,{bound:[20,15,400,20],caption:"Akun Simpanan", readOnly:true, tag:2});		
		this.cb_status = new portalui_saiCB(this,{bound:[20,16,200,20],caption:"Status Pembayaran",items:["AUTODEBET","TUNAI"],tag:2});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai Simpanan",maxLength:15,tipeText:ttNilai,text:"0"});		
		this.bTampil = new portalui_button(this,{bound:[829,17,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		
		this.p1 = new portalui_panel(this,{bound:[10,30,900,303],caption:"Daftar Kartu Simpanan"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,895,280],tag:"9"});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_simpanan_transaksi_fKartu.extend(window.portalui_childForm);
window.app_kopeg_simpanan_transaksi_fKartu.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simp_m","no_simp",this.app._lokasi+"-"+this.jenis+this.cb_agg.getText()+".","000"));		
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var thnBln = this.dp_d1.getDateString().substr(0,4) + this.dp_d1.getDateString().substr(5,2);
					sql.add("insert into kop_simp_m (no_simp ,kode_lokasi ,kode_agg ,kode_simp ,jenis ,nilai ,tgl_tagih ,status_bayar ,periode_gen ,status_aktif ,nik_user ,tgl_input,periode_bunga ) values  "+
							"('"+this.e_nb.getText()+"' ,'"+this.app._lokasi+"' ,'"+this.cb_agg.getText()+"' ,'"+this.cb_simp.getText()+"' ,'"+this.jenis+"' ,"+parseNilai(this.e_nilai.getText())+",'"+this.dp_d1.getDateString()+"' ,'"+this.cb_status.getText()+"','"+thnBln+"','1','"+this.app._userLog+"' ,now(),'"+thnBln+"' )");
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
					this.sg1.clear(1);
				}
				break;
			case "simpan" :	this.simpan();
				break;
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_simp) {
				this.jenis = this.cb_simp.dataFromList[2];
				this.e_ar.setText(this.cb_simp.dataFromList[3]);
				this.e_simp.setText(this.cb_simp.dataFromList[4]);
				this.e_nilai.setText(this.cb_simp.dataFromList[5]);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_simp_m","no_simp",this.app._lokasi+"-"+this.jenis+this.cb_agg.getText()+".","000"));		
		    this.dp_d1.setFocus();
	},
	doTampilClick: function(sender){
		try{			
			if (this.cb_simp.getText() != "") {
				this.sg1.setColTitle(new Array("No","No Kartu","Tgl Awal Tagih","Nasabah","Jenis","Akun Piut.","Akun Simp","Nilai","Sts Bayar","Sts Aktif"));				
				var data = this.dbLib.runSQL(" select x.no_simp,x.tgl_tagih,concat(y.kode_agg,' - ',y.nama) as nasabah,concat(a.kode_simp,' - ',a.nama) as jenis,concat(a.akun_ar,' - ',b.nama) as nama_ar,concat(a.akun_simp,' - ',c.nama) as nama_simp,x.nilai,x.status_bayar,case x.status_aktif when '1' then 'Aktif' else 'Tidak' end as sts_aktif "+
				           " from kop_simp_m x inner join kop_agg y on x.kode_agg=y.kode_agg and x.kode_lokasi=y.kode_lokasi "+
						   "      inner join kop_simp_jenis a on x.kode_simp=a.kode_simp and x.kode_lokasi = a.kode_lokasi "+
						   "      inner join masakun b on a.akun_ar = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+    
						   "      inner join masakun c on a.akun_simp = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						   " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_simp = '"+this.cb_simp.getText()+"'");
				this.sg1.clearAll();
				this.sg1.setData(data);
			} 
			else {
				system.alert(this,"Jenis Simpanan harus dipilih.","");
				this.sg1.clearAll();
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_agg) {   
			    this.standarLib.showListData(this, "Daftar Nasabah",sender,undefined, 
											  "select kode_agg, nama  from kop_agg where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_agg) from kop_agg where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_agg","nama"],"and",["Kode","Nama"],false);
			}
			if (sender == this.cb_simp) {   
			    this.standarLib.showListData(this, "Daftar Jenis Simpanan",sender,undefined, 
											  "select a.kode_simp, a.nama, a.jenis, concat(a.akun_ar,' - ',b.nama) as akun_ar, concat(a.akun_simp,' - ',c.nama) as akun_simp,a.nilai  "+
											  "from kop_simp_jenis a inner join masakun b on a.akun_ar=b.kode_akun and a.kode_lokasi=b.kode_lokasi inner join masakun c on a.akun_simp=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
											  "where a.kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_simp)        from kop_simp_jenis where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_simp","nama","jenis","akun_ar","akun_simp","nilai"],"and",["Kode","Nama","Jenis","Akun Piutang","Akun Simpanan","Nilai"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});