window.app_saku3_transaksi_sju16_fVendorPB = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fVendorPB.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fVendorPB";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Vendor", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["List Penanggung","Entry Data","Filter Cari"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,6,this.pc1.width-6,this.pc1.height-33],colCount:5,tag:9,
		            colTitle:["Kode","Nama","NPWP","Alamat","PIC"],
					colWidth:[[4,3,2,1,0],[200,350,80,250,80]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"Nama", maxLength:50, tag:1});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Alamat", maxLength:150, tag:1});	
		this.e_kota = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Kota", maxLength:50, tag:1});	
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"No Telepon", maxLength:50, tag:1});	
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,500,20],caption:"NPWP", maxLength:50, tag:1});	
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,500,20],caption:"Contact Person", maxLength:50, tag:1});	
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,500,20],caption:"Email", maxLength:50, tag:1});	
		this.e_nohp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,500,20],caption:"Hand Phone", maxLength:50, tag:1});	

		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Bank", maxLength:50, tag:1});	
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"No Rekening", maxLength:50, tag:1});	
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,500,20],caption:"Nama Rekening", maxLength:50, tag:1});	
		
		this.e_kodec = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,19,200,20],caption:"Kode", maxLength:50, tag:9});	
		this.e_namac = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,20,300,20],caption:"Nama", maxLength:50, tag:9});							
		this.bCari = new button(this.pc1.childPage[2],{bound:[120,14,80,18],caption:"Cari Data",click:[this,"doCari"]});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		setTipeButton(tbAllFalse);
				
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doLoad();					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fVendorPB.extend(window.childForm);
window.app_saku3_transaksi_sju16_fVendorPB.implement({
	doCari: function() {
		if (this.e_kodec.getText() == "") var filter = " ";
		else var filter = " and kode_vendor like '"+this.e_kodec.getText()+"%' ";
		
		if (this.e_namac.getText() == "") var filter = filter + " ";
		else var filter = filter + " and nama like '"+this.e_namac.getText()+"%' ";

		
		var strSQL = "select kode_vendor,nama,npwp,alamat,pic "+
		             "from sju_vendor_pb "+
					 "where kode_lokasi='"+this.app._lokasi+"' "+filter+" order by kode_vendor";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);	
		this.pc1.setActivePage(this.pc1.childPage[0]);				
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
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into sju_vendor_pb(kode_vendor,kode_lokasi,nama,alamat,kota,no_tel,npwp,pic,email,no_hp,bank,no_rek,nama_rek) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_tel.getText()+"','"+this.e_npwp.getText()+"','"+this.e_pic.getText()+"','"+this.e_email.getText()+"','"+this.e_nohp.getText()+"','"+this.e_bank.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"')");					
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from sju_vendor_pb where kode_vendor = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into sju_vendor_pb(kode_vendor,kode_lokasi,nama,alamat,kota,no_tel,npwp,pic,email,no_hp,bank,no_rek,nama_rek) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_tel.getText()+"','"+this.e_npwp.getText()+"','"+this.e_pic.getText()+"','"+this.e_email.getText()+"','"+this.e_nohp.getText()+"','"+this.e_bank.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"')");					
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sju_vendor_pb where kode_vendor = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
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
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var strSQL = "select * from sju_vendor_pb where kode_vendor ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);	
						this.e_alamat.setText(line.alamat);
						this.e_kota.setText(line.kota);
						this.e_tel.setText(line.no_tel);
						this.e_npwp.setText(line.npwp);
						this.e_pic.setText(line.pic);
						this.e_email.setText(line.email);
						this.e_nohp.setText(line.no_hp);
						this.e_bank.setText(line.bank);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
			}
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){	
		var strSQL = "select kode_vendor,nama,npwp,alamat,pic "+
		             "from sju_vendor_pb "+
					 "where kode_lokasi='"+this.app._lokasi+"' order by kode_vendor";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);		
	},		
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_vendor,line.nama,line.npwp,line.alamat,line.pic]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
