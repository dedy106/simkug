window.app_saku3_transaksi_optik_produksi_fVendor = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_optik_produksi_fVendor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_optik_produksi_fVendor";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Vendor", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Vendor","Data Vendor","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Alamat"],
					colWidth:[[2,1,0],[400,300,80]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,180,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1,change:[this,"doChange"]});	
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Alamat", maxLength:150, tag:1,change:[this,"doChange"]});					
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"No Telpon", maxLength:50, tag:1});							
		this.e_fax = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"No Faximile", maxLength:50, tag:1});
		this.e_mail = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,250,20],caption:"Email", maxLength:50, tag:1});	
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[1],{bound:[290,15,230,20],caption:"NPWP", maxLength:50, tag:1});	
		this.e_alamat2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,500,20],caption:"Alamat NPWP", maxLength:150, tag:1});	
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,250,20],caption:"P I C", maxLength:50, tag:1});			
		this.e_pictel = new saiLabelEdit(this.pc1.childPage[1],{bound:[290,18,230,20],caption:"No Tel PIC", maxLength:50, tag:1});		
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,250,20],caption:"Bank", maxLength:50, tag:1});			
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"Cabang", maxLength:50, tag:1});			
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,250,20],caption:"No Rekening", maxLength:50, tag:1});			
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,500,20],caption:"Nama Rekening", maxLength:50, tag:1});
		this.cb_akun = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Akun Hutang",multiSelection:false,tag:2});							
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.doLoad();	
			this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_optik_produksi_fVendor.extend(window.childForm);
window.app_saku3_transaksi_optik_produksi_fVendor.implement({
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
					sql.add("insert into vendor(kode_vendor,kode_lokasi,nama,alamat,no_tel,email,npwp,pic,alamat2,bank,cabang,no_rek,nama_rek,no_fax,no_pictel,spek,kode_klpvendor,penilaian,bank_trans,akun_hutang) values "+
						    "('"+this.cb_kode.getText()+"', '"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_mail.getText()+"','"+this.e_npwp.getText()+"','"+this.e_pic.getText()+"','"+this.e_alamat2.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.e_fax.getText()+"','"+this.e_pictel.getText()+"','-','-','-','-','"+this.cb_akun.getText()+"')");
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
					
					sql.add("update vendor set akun_hutang='"+this.cb_akun.getText()+"',nama='"+this.e_nama.getText()+"',alamat='"+this.e_alamat.getText()+"',no_tel='"+this.e_tel.getText()+"',email='"+this.e_mail.getText()+"',npwp='"+this.e_npwp.getText()+"',pic='"+this.e_pic.getText()+"',alamat2='"+this.e_alamat2.getText()+"',bank='"+this.e_bank.getText()+"',cabang='"+this.e_cabang.getText()+"',no_rek='"+this.e_norek.getText()+"',nama_rek='"+this.e_namarek.getText()+"',no_fax='"+this.e_fax.getText()+"',no_pictel='"+this.e_pictel.getText()+"' "+ 
					        "where kode_vendor = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
										
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
					sql.add("delete from vendor where kode_vendor = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);					
					this.doLoad();
					setTipeButton(tbAllFalse);
				}
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
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select akun_hutang,kode_vendor,nama,alamat,no_tel,email,npwp,alamat2,pic,bank,cabang,no_rek,nama_rek,no_fax,no_pictel "+
				             "from vendor "+
						     "where kode_vendor ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);				
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_tel);						
						this.e_fax.setText(line.no_fax);						
						this.e_mail.setText(line.email);
						this.e_npwp.setText(line.npwp);
						this.e_alamat2.setText(line.alamat2);
						this.e_pic.setText(line.pic);						
						this.e_pictel.setText(line.no_pictel);
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.cb_akun.setText(line.akun_hutang);
						
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}								
			}
			if (sender == this.e_alamat && this.e_alamat.getText() != ""){
				this.e_alamat2.setText(this.e_alamat.getText());
			}
			if (sender == this.e_nama && this.e_nama.getText() != ""){
				this.e_namarek.setText(this.e_nama.getText());
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Mitra",sender,undefined, 
											  "select kode_vendor, nama  from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_vendor) from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_vendor","nama"],"and",["Kode","Nama"],false);				
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
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
	},
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") var filter = " a.kode_vendor like '%"+this.e_kode2.getText()+"%' and ";
			else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' and ";
			
			var strSQL = "select a.kode_vendor,a.nama,a.alamat "+
						 "from vendor a "+					 
						 "where "+filter+" a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_vendor";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {
			var strSQL = "select a.kode_vendor,a.nama,a.alamat "+
						 "from vendor a "+					 
						 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_vendor";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.kode_vendor,line.nama,line.alamat]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbah);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}
});