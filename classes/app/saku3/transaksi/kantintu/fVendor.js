window.app_saku3_transaksi_kantintu_fVendor = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kantintu_fVendor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kantintu_fVendor";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Vendor", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Vendor","Data Vendor"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:9,
		            colTitle:["Kode","Nama","Alamat","Max Piutang","Max Hari","PIC","No HP","Email"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,150,80,80,300,200,60]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,180,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});							
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Alamat", maxLength:100, tag:1});			
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"No Telpon", maxLength:50, tag:1});					
		this.e_fax = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"Faximile", maxLength:50, tag:1});			
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,500,20],caption:"Email", maxLength:50, tag:1});			
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,500,20],caption:"NPWP", maxLength:50, tag:1});			
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,500,20],caption:"Contact Person", maxLength:50, tag:1});		
		this.e_hp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,500,20],caption:"No HP", maxLength:50, tag:1});			
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,23,180,20],caption:"Status Aktif",items:["1.AKTIF","0.NON"], readOnly:true,tag:2});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
		this.maximize();		
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
window.app_saku3_transaksi_kantintu_fVendor.extend(window.childForm);
window.app_saku3_transaksi_kantintu_fVendor.implement({
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
					sql.add("insert into kli_vendor(kode_vendor,kode_lokasi,nama,flag_aktif,alamat,alamat2,no_tel,no_tel2,no_fax,email,npwp,pic) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','1','"+this.e_alamat.getText()+"','-','"+this.e_tel.getText()+"','"+this.e_hp.getText()+"','"+this.e_fax.getText()+"','"+this.e_email.getText()+"','"+this.e_npwp.getText()+"','"+this.e_pic.getText()+"')");
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
					if (this.c_status.getText() == "1.AKTIF") vSts = "1"; else vSts = "0";					
					sql.add("update kli_vendor set nama='"+this.e_nama.getText()+"',alamat='"+this.e_alamat.getText()+"',telp='"+this.e_tel.getText()+"',hp='"+this.e_hp.getText()+"',fax='"+this.e_fax.getText()+"',email='"+this.e_email.getText()+"',npwp='"+this.e_npwp.getText()+"',cp='"+this.e_pic.getText()+"' "+
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
					sql.add("delete from kli_vendor where kode_vendor = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				var strSQL = "select nama from kli_vendor where kode_vendor ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);																		
						/*
						var strSQL = "select nama,flag_aktif,alamat,alamat2,no_tel,no_tel2,no_fax,email,npwp,pic,max_piu,max_hari "+
									 "from kli_vendor where kode_vendordor = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){													
								this.e_nama.setText(line.nama);									
								this.e_alamat.setText(line.alamat);									
								this.e_maxpiu.setText(floatToNilai(line.max_piu));									
								this.e_maxhari.setText(floatToNilai(line.max_hari));															
								this.e_tel.setText(line.no_tel);									
								this.e_fax.setText(line.no_fax);									
								this.e_email.setText(line.email);									
								this.e_npwp.setText(line.npwp);									
								this.e_alamat2.setText(line.alamat2);									
								this.e_pic.setText(line.pic);									
								this.e_hp.setText(line.line.no_tel2);															
								if (line.status == "0") var status = "1.AKTIF"; else var status = "0.NON"; 
								this.c_status.setText(status);									
							}
						}
						*/
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
				var strSQL = "select nama,alamat,no_tel,hp,fax,email,npwp,cp "+
							 "from kli_vendor where kode_vendor = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){													
						this.e_nama.setText(line.nama);									
						this.e_alamat.setText(line.alamat);																								
						this.e_tel.setText(line.no_tel);									
						this.e_fax.setText(line.no_fax);									
						this.e_email.setText(line.email);									
						this.e_npwp.setText(line.npwp);									
						this.e_pic.setText(line.cp);									
						this.e_hp.setText(line.hp);															
						if (line.status == "0") var status = "1.AKTIF"; else var status = "0.NON"; 
						this.c_status.setText(status);									
					}
				}				
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
		var strSQL = "select a.kode_vendor,a.nama,a.alamat,a.pic,a.no_tel2,a.email "+
		             "from kli_vendor a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"'";		
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
			this.sg1.appendData([line.kode_vendor,line.nama,line.alamat,floatToNilai(line.max_piu),floatToNilai(line.max_hari),line.pic,line.no_tel2,line.email]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});