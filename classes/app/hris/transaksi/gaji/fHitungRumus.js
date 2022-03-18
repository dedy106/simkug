window.app_hris_transaksi_gaji_fHitungRumus = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_gaji_fHitungRumus.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_gaji_fHitungRumus";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan Gaji Rumusan: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Gaji",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:100});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal Transfer", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18],date:new Date().getDateStr()}); 
		this.cb_buat = new saiCBBL(this,{bound:[20,16,205,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:1});
		this.cb_param = new saiCBBL(this,{bound:[20,17,205,20],caption:"Parameter", multiSelection:false, maxLength:10, tag:1});
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			this.cb_param.setSQL("select kode_param, nama from gr_gaji_param where kode_lokasi='"+this.app._lokasi+"'",["kode_param","nama"],false,["Kode","Nama"],"and","Data Parameter",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_gaji_fHitungRumus.extend(window.childForm);
window.app_hris_transaksi_gaji_fHitungRumus.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_gaji_m","no_gaji",this.app._lokasi+"-GJ"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_gaji_m(no_gaji,kode_lokasi,periode,tanggal,keterangan,tgl_transfer,nik_buat,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"')");					
					
					
					if (this.cb_param.getText() == "CUTI" || this.cb_param.getText() == "BAS" || this.cb_param.getText() == "THR") {
						sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
								"select distinct '"+this.e_nb.getText()+"',a.nik,a.kode_param,a.kode_lokasi,x.kode_loker,y.akun_gaji, "+
								"'"+this.e_periode.getText()+"', isnull(b.nilai,0) as nilai "+
								"from gr_gaji_nik a "+
								"inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
								"inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
								"left join (select nik,kode_lokasi,sum(nilai) as nilai from gr_gaji_nik where kode_param in ('GDAS','TPOS','TPRES','TRANS','TSUS') group by nik,kode_lokasi) b on b.nik=a.nik and b.kode_lokasi=a.kode_lokasi "+
								"where a.kode_param = '"+this.cb_param.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON'");
					}					
					setTipeButton(tbAllFalse);					
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_gaji_m","no_gaji",this.app._lokasi+"-GJ"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
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