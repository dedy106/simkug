window.app_kopeg_master_fDana = function(owner)
{
	if (owner)
	{
		window.app_kopeg_master_fDana.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_master_fDana";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","MoU Sumber Dana : Input/Koreksi", 0);	
		
		uses("portalui_saiCB,portalui_saiCBBL;portalui_saiCBB;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,290,20],caption:"No Bukti",btnClick:[this,"doBtnClick"],rightLabelVisible:false});
		this.bLoad = new portalui_imageButton(this,{bound:[310,10,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.lTgl = new portalui_label(this,{bound:[20,21,100,18],caption:"Tanggal MoU",underline:true});
		this.dTgl = new portalui_datePicker(this,{bound:[120,21,100,18],selectDate:[this,"doSelectDate"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,11,290,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,12,600,20],caption:"Keterangan", maxLength:150});		
		this.cb_vendor = new portalui_saiCBBL(this,{bound:[20,13,200,20],caption:"Pihak Ketiga",btnClick:[this,"doBtnClick"]});
		this.cb_jenis = new portalui_saiCB(this,{bound:[20,14,200,20],caption:"Jenis Peruntukan",items:["PUANG","KBRG","ALL"],tag:2});		
		this.e_nilai = new portalui_saiLabelEdit(this,{bound:[20,15,200,20],caption:"Nilai MoU",tipeText:ttNilai,tag:1,text:"0"});
		this.bTampil = new portalui_button(this,{bound:[829,15,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
		
		this.p1 = new portalui_panel(this,{bound:[10,16,900,343],caption:"Daftar Sumber Dana"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,895,320],tag:"9"});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_kopeg_master_fDana.extend(window.portalui_childForm);
window.app_kopeg_master_fDana.implement({
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
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kop_dana_m(no_bukti,no_kontrak,keterangan,tanggal,kode_vendor,jenis,nilai,kode_lokasi) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.dTgl.getDateString()+"','"+this.cb_vendor.getText()+"','"+this.cb_jenis.getText()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.app._lokasi+"')");										
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update kop_dana_m set no_kontrak='"+this.e_dok.getText()+"',keterangan='"+this.e_ket.getText()+"',kode_vendor='"+this.cb_vendor.getText()+"',jenis='"+this.cb_jenis.getText()+"',tanggal='"+this.dTgl.getDateString()+"',nilai="+parseNilai(this.e_nilai.getText())+" "+
						    "where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
										
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kop_dana_m "+
						    "where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
										
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);	
				setTipeButton(tbAllFalse);
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
	doLoadClick: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.tanggal,a.no_kontrak,a.keterangan,a.kode_vendor,b.nama,a.jenis,a.nilai "+
				           " from kop_dana_m a inner join vendor b on a.kode_vendor = b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
					       " where a.kode_lokasi = '"+this.app._lokasi+"' and a.no_bukti ='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined)
					{
						this.e_dok.setText(line.no_kontrak);
						this.e_ket.setText(line.keterangan);
						this.cb_vendor.setText(line.kode_vendor,line.nama);
						this.cb_jenis.setText(line.jenis);
						this.e_ket.setText(line.keterangan);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.dTgl.setText(line.tanggal);
						setTipeButton(tbUbahHapus);
					}
					else
					{
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){
		try{			
			this.sg1.setColTitle(new Array("No","No Bukti","No Dokumen","Tgl MoU","Keterangan","Vendor","Jenis","Nilai"));				
			var data = this.dbLib.runSQL(" select a.no_bukti,a.no_kontrak,a.tanggal,a.keterangan,b.nama,a.jenis,a.nilai from kop_dana_m a "+
					   " inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi = b.kode_lokasi "+
					   " where a.kode_lokasi = '"+this.app._lokasi+"' ");
			this.sg1.clearAll();
			this.sg1.setData(data);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_kode) 
			{   
			    this.standarLib.showListData(this, "Daftar Bukti Sumber Dana",sender,undefined, 
											  "select no_bukti, no_kontrak  from kop_dana_m where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(no_bukti) from kop_dana_m       where kode_lokasi='"+this.app._lokasi+"'",
											  ["no_bukti","no_kontrak"],"and",["No Bukti","No Dokumen"],false);				
			}
			if (sender == this.cb_vendor) 
			{   
			    this.standarLib.showListData(this, "Daftar Pihak Ketiga",sender,undefined, 
											  "select kode_vendor, nama  from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_vendor) from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_vendor","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e)
			{
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});