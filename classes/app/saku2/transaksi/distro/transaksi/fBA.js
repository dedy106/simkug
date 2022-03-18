window.app_saku2_transaksi_distro_transaksi_fBA = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_distro_transaksi_fBA.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_distro_transaksi_fBA";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form BAST Forwarder: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});				
		this.cb_pengirim = new saiCBBL(this,{bound:[20,16,200,20],caption:"Transporter", multiSelection:false, maxLength:10, tag:2});		
		this.cb_cust = new saiCBBL(this,{bound:[20,15,200,20],caption:"Customer", multiSelection:false, maxLength:10,change:[this,"doChange"]});						
		this.cb_so = new saiCBBL(this,{bound:[20,16,220,20],caption:"No SO", multiSelection:false, maxLength:10,change:[this,"doChange"]});						
		this.e_volsisa = new saiLabelEdit(this,{bound:[20,18,180,20],caption:"Sisa Volume (ltr)", readOnly:true, tipeText:ttNilai, text:"0"});			
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Terima", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		
		this.cb_do = new saiCBBL(this,{bound:[20,16,220,20],caption:"No Penetapan", multiSelection:false, maxLength:10, change:[this,"doChange"]});								
		this.e_volume = new saiLabelEdit(this,{bound:[20,18,180,20],caption:"Volume TAP (ltr)", readOnly:true, tipeText:ttNilai, text:"0"});			
		this.e_sisa = new saiLabelEdit(this,{bound:[20,17,180,20],caption:"Sisa TAP (ltr)", readOnly:true, tipeText:ttNilai, text:"0"});			
		this.e_jumlah = new saiLabelEdit(this,{bound:[20,19,180,20],caption:"Jumlah DO (ltr)", tag:1,tipeText:ttNilai, text:"0"});
				
		this.rearrangeChild(10, 23);		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.cb_pengirim.setSQL("select kode_vendor, nama from vendor where kode_klpvendor ='FORWARDER' and kode_lokasi='"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Transporter",true);								
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_distro_transaksi_fBA.extend(window.childForm);
window.app_saku2_transaksi_distro_transaksi_fBA.implement({
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
					sql.add("insert into ds_ba_m(no_ba,kode_lokasi,periode,tanggal,no_dokumen,keterangan,tgl_input,nik_user,no_do,tgl_terima,jam,jumlah,kode_cust,no_so,kode_pengirim) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_do.getText()+"','"+this.dp_d2.getDateString()+"','00.00.00',"+parseNilai(this.e_jumlah.getText())+",'"+this.cb_cust.getText()+"','"+this.cb_so.getText()+"','"+this.cb_pengirim.getText()+"')");										
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
					this.cb_do.setSQL("select a.no_do, a.no_dokumen from ds_do_m a where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_do","no_dokumen"],false,["No Bukti","No DO"],"and","Data DO",true);			
					setTipeButton(tbSimpan);
					this.doClick(this.i_gen);					
				break;
			case "simpan" :																	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_jumlah.getText()) <= 0 || (nilaiToFloat(this.e_jumlah.getText())>nilaiToFloat(this.e_sisa.getText())) ) {
					system.alert(this,"Transaksi tidak valid.","Jumlah tidak boleh nol dan atau kurang atau melebihi sisa.");
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
		this.cb_do.setSQL("select a.no_do, a.no_dokumen from ds_do_m a where a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_do","no_dokumen"],false,["No Bukti","No DO"],"and","Data DO",true);			
		this.doClick(this.i_gen);
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ds_ba_m","no_ba",this.app._lokasi+"-BA"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_dok.setFocus();
		}		
	},		
	doChange:function(sender){
		if (sender == this.cb_do && this.cb_do.getText()!="") {
			var strSQL = "select a.vol,(a.vol-isnull(d.jumlah,0)) as sisa "+
						 "from ds_po_m a  "+						 
						 "left join (select no_do,kode_lokasi,sum(jumlah) as jumlah from ds_ba_m group by no_do,kode_lokasi) d on a.no_do=d.no_do and a.kode_lokasi=d.kode_lokasi "+
						 "where a.no_do ='"+this.cb_do.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.e_volume.setText(floatToNilai(line.vol));																			
					this.e_sisa.setText(floatToNilai(line.sisa));	
				} 
			}
		}
		if (sender == this.cb_cust && this.cb_cust.getText()!="") {			
			this.cb_so.setSQL("select no_so, catatan from ds_so_m where kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_so","catatan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);			
		}
		if (sender == this.cb_so && this.cb_so.getText()!="") {
			var strSQL = "select (a.vol-isnull(d.jumlah,0)) as sisa "+
						 "from ds_so_m a left join (select no_so,kode_lokasi,sum(jumlah) as jumlah from ds_ba_m group by no_so,kode_lokasi) d on a.no_so=d.no_so and a.kode_lokasi=d.kode_lokasi "+
						 "where a.no_so ='"+this.cb_so.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.e_volsisa.setText(floatToNilai(line.sisa));	
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
