window.app_kopeg_simpanan_transaksi_fKartuk = function(owner)
{
	if (owner)
	{
		window.app_kopeg_simpanan_transaksi_fKartuk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_simpanan_transaksi_fKartuk";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kartu Simpanan: Koreksi", 0);	
		
		uses("portalui_saiCB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_agg = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Nasabah",btnClick:[this,"doBtnClick"],tag:0});
		this.cb_nb = new portalui_saiCBBL(this,{bound:[20,11,250,20],caption:"No Kartu",btnClick:[this,"doBtnClick"],change:[this,"doChange"],tag:2});
		this.e_jenis = new portalui_saiLabelEdit(this,{bound:[20,12,400,20],caption:"Jenis Simp.", readOnly:true, tag:1});		
		this.l_tgl = new portalui_label(this,{bound:[20,13,100,18],caption:"Tgl Awal Tagihan", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],date:new Date().getDateStr()});
		this.e_ar = new portalui_saiLabelEdit(this,{bound:[20,14,400,20],caption:"Akun Piutang", readOnly:true, tag:1});		
		this.e_simp = new portalui_saiLabelEdit(this,{bound:[20,15,400,20],caption:"Akun Simpanan", readOnly:true, tag:1});		
		this.cb_status = new portalui_saiCB(this,{bound:[20,16,200,20],caption:"Status Pembayaran",items:["AUTODEBET","TUNAI"],tag:1});
		this.cb_aktif = new portalui_saiCB(this,{bound:[220,16,200,20],caption:"Status Keaktifan",items:["AKTIF","TIDAK"],tag:1});
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai Simpanan",maxLength:15,tag:1,tipeText:ttNilai,text:"0"});				
		this.bTampil = new portalui_button(this,{bound:[829,17,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		
		this.p1 = new portalui_panel(this,{bound:[10,30,900,303],caption:"Daftar Kartu Simpanan"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,895,280],tag:"9"});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
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
window.app_kopeg_simpanan_transaksi_fKartuk.extend(window.portalui_childForm);
window.app_kopeg_simpanan_transaksi_fKartuk.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var thnBln = this.dp_d1.getDateString().substr(0,4) + this.dp_d1.getDateString().substr(5,2);
					if (this.cb_aktif.getText() == "AKTIF") var stsAktif = "1";
					else var stsAktif = "0";
					sql.add("update kop_simp_m set tgl_tagih='"+this.dp_d1.getDateString()+"',nilai= "+parseNilai(this.e_nilai.getText())+",status_bayar='"+this.cb_status.getText()+"',status_aktif='"+stsAktif+"',periode_gen='"+thnBln+"',nik_user='"+this.app._userLog+"',tgl_input=now(),periode_bunga='"+thnBln+"' where no_simp ='"+this.cb_nb.getText()+"'");					
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
					this.standarLib.clearByTag(this, new Array("0","1","2"),undefined);				
					this.sg1.clear(1);
				}
				break;
			case "ubah" :	this.simpan();
				break;
			case "hapus" : 
					var sql = new server_util_arrayList();
					var noSimp = "";
					var data = this.dbLib.getDataProvider("select distinct no_simp from kop_simp_m where no_simp='"+this.cb_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					eval("data = "+data+";");
					if (typeof data == "object"){
						var line;
						for (var i in data.rs.rows){
							noSimp = line.no_simp;
						}
					}
					if (noSimp != "") {
						sql.add("delete from kop_simp_m where no_simp ='"+this.cb_nb.getText()+"'");
						this.dbLib.execArraySQL(sql);
					}
					else system.alert(this,"Transaksi tidak valid.","Kartu sudah digunakan.");
				break;
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_nb) {
				if (this.cb_nb.getText() != "") {
					this.e_jenis.setText(this.cb_nb.dataFromList[1]);
					this.dp_d1.setText(this.cb_nb.dataFromList[2]);
					this.e_ar.setText(this.cb_nb.dataFromList[3]);
					this.e_simp.setText(this.cb_nb.dataFromList[4]);
					this.e_nilai.setText(this.cb_nb.dataFromList[5]);
					this.cb_status.setText(this.cb_nb.dataFromList[6]);
					this.cb_aktif.setText(this.cb_nb.dataFromList[7].toUpperCase());
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){
		try{			
			if (this.cb_agg.getText() != "") {
				this.sg1.setColTitle(new Array("No","No Kartu","Tgl Awal Tagih","Nasabah","Jenis","Akun Piut.","Akun Simp","Nilai","Sts Bayar","Sts Aktif"));				
				var data = this.dbLib.runSQL(" select x.no_simp,x.tgl_tagih,concat(y.kode_agg,' - ',y.nama) as nasabah,concat(a.kode_simp,' - ',a.nama) as jenis,concat(a.akun_ar,' - ',b.nama) as nama_ar,concat(a.akun_simp,' - ',c.nama) as nama_simp,x.nilai,x.status_bayar,case x.status_aktif when '1' then 'Aktif' else 'Tidak' end as sts_aktif "+
				           " from kop_simp_m x inner join kop_agg y on x.kode_agg=y.kode_agg and x.kode_lokasi=y.kode_lokasi "+
						   "      inner join kop_simp_jenis a on x.kode_simp=a.kode_simp and x.kode_lokasi = a.kode_lokasi "+
						   "      inner join masakun b on a.akun_ar = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+    
						   "      inner join masakun c on a.akun_simp = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						   " where a.kode_lokasi = '"+this.app._lokasi+"' and x.kode_agg = '"+this.cb_agg.getText()+"'");
				this.sg1.clearAll();
				this.sg1.setData(data);
			} 
			else {
				system.alert(this,"Nasabah harus dipilih.","");
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
				this.sg1.clearAll();
				this.standarLib.clearByTag(this, new Array("1","2"),undefined);		
			}
			if (sender == this.cb_nb) {   
			    this.standarLib.showListData(this, "Daftar Kartu Simpanan",sender,undefined, 
											   " select x.no_simp,concat(a.kode_simp,' - ',a.nama) as jenis,date_format(x.tgl_tagih,'%d/%m/%Y')as tgl_tagih, "+
											   "        concat(a.akun_ar,' - ',b.nama) as nama_ar,concat(a.akun_simp,' - ',c.nama) as nama_simp,x.nilai,x.status_bayar,"+
											   "        case x.status_aktif when '1' then 'AKTIF' else 'TIDAK' end as sts_aktif "+
									           " from kop_simp_m x inner join kop_agg y on x.kode_agg=y.kode_agg and x.kode_lokasi=y.kode_lokasi "+
											   "      inner join kop_simp_jenis a on x.kode_simp=a.kode_simp and x.kode_lokasi = a.kode_lokasi "+
											   "      inner join masakun b on a.akun_ar = b.kode_akun and a.kode_lokasi=b.kode_lokasi "+    
											   "      inner join masakun c on a.akun_simp = c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
											   " where a.kode_lokasi = '"+this.app._lokasi+"' and x.kode_agg = '"+this.cb_agg.getText()+"'",
											   "select count(no_simp) from kop_simp_m where kode_lokasi='"+this.app._lokasi+"' and kode_agg='"+this.cb_agg.getText()+"' ",
											  ["no_simp","jenis","tgl_tagih","nama_ar","nama_simp","nilai","status_bayar","sts_aktif"],"and",["No Kartu","Jenis","Tgl Tagih","Akun AR","Akun Simp","Nilai","Sts Bayar","Sts Aktif"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (No : "+ this.cb_nb.getText()+")");							
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