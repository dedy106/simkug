window.app_saku2_transaksi_distro_transaksi_fSO = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_distro_transaksi_fSO.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_distro_transaksi_fSO";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Sales Order: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,225,20],caption:"No SO", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,12,200,20],caption:"NIK Administrasi", multiSelection:false, maxLength:10, tag:2});						
		this.cb_cust = new saiCBBL(this,{bound:[20,18,200,20],caption:"Customer", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_alamat = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Alamat Invoice",readOnly:true});
		this.e_pic = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"UP Invoice",readOnly:true});		
		this.e_gudang = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Gudang", maxLength:150});						
		this.e_upgudang = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"U.P Gudang", maxLength:50});				
		this.e_tel = new saiLabelEdit(this,{bound:[20,15,250,20],caption:"No Telpon", maxLength:50});						
		this.e_catat = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Catatan", maxLength:150});								
		
		this.e_brg = new saiLabelEdit(this,{bound:[20,12,450,20],caption:"Item Barang", maxLength:100});								
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Kirim", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 		
		this.e_vol = new saiLabelEdit(this,{bound:[20,14,180,20],caption:"Volume (ltr)", tag:1, tipeText:ttNilai, text:"0"});		
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_distro_transaksi_fSO.extend(window.childForm);
window.app_saku2_transaksi_distro_transaksi_fSO.implement({
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
			this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();									
					sql.add("insert into ds_so_m(no_so,kode_lokasi,tanggal,periode,nik_user,tgl_input,kode_cust,gudang,pic_gudang,no_tel,catatan,item_brg,tgl_kirim,vol,nilai,no_po) values "+
					        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_cust.getText()+"','"+this.e_gudang.getText()+"','"+this.e_upgudang.getText()+"','"+this.e_tel.getText()+"','"+this.e_catat.getText()+"','"+this.e_brg.getText()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_vol.getText())+",0,'-')");					
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
					this.doClick(this.i_gen);
				break;
			case "simpan" :					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_vol.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai atau Volume tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
		this.doClick(this.i_gen);
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ds_so_m","no_so",this.app._lokasi+"-SO"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
		}		
	},	
	doChange:function(sender){
		if (sender == this.cb_cust && this.cb_cust.getText()!="") {
			var data = this.dbLib.getDataProvider("select alamat,pic from cust where kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.e_alamat.setText(line.alamat);										
					this.e_pic.setText(line.pic);
				} 
			}
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1) {
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Bukti : "+ this.e_nb.getText()+")");							
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