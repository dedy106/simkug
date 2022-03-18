window.app_saku3_transaksi_dago_fAgen = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fAgen.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fAgen";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Agen", 0);			
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Agen","Data Agen"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:9,tag:9,
		            colTitle:["No Agen","Nama Agen","TTL","Alamat","No.HP","Email","Bank-Cabang","Rekening","Marketing"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,150,150,170,130,250,140,160,60]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No Agen",maxLength:10,tag:0,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,260,20],caption:"Nama Agen", maxLength:50, tag:1});
		this.e_tempat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,29,260,20],caption:"Tempat Lahir", maxLength:50, tag:1});					
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[290,29,100,18],caption:"Tgl Lahir", underline:true});	
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[390,29,100,18]});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,470,20],caption:"Alamat",maxLength:50, tag:1});
		this.e_nohp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,260,20],caption:"No. HP",maxLength:50, tag:1});
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,22,260,20],caption:"Email",maxLength:50, tag:1});			
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,260,20],caption:"Bank",maxLength:50, tag:1});
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,260,20],caption:"Cabang",maxLength:50, tag:1});
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,260,20],caption:"No Rekening",maxLength:50, tag:1});
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,260,20],caption:"Nama Rekening",maxLength:50, tag:1});
		this.cb_marketing = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Marketing", multiSelection:false, maxLength:10, tag:1, rightLabelVisible:true});				
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,23,180,20],caption:"Status Aktif",items:["1.AKTIF","0.NON"], readOnly:true,tag:2});	
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_marketing.setSQL("select no_marketing, nama_marketing from dgw_marketing where kode_lokasi='"+this.app._lokasi+"' ",["no_marketing","nama_marketing"],false,["Kode","Nama"],"and","Data Marketing",true);
			this.doLoad();	

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fAgen.extend(window.childForm);
window.app_saku3_transaksi_dago_fAgen.implement({
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
					sql.add("insert into dgw_agent(no_agen,kode_lokasi,nama_agen,alamat,flag_aktif,tempat_lahir,tgl_lahir,no_hp,email,bank,cabang,norek,namarek,kode_marketing) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.c_status.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nohp.getText()+"','"+this.e_email.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.cb_marketing.getText()+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.c_status.getText() == "1.AKTIF") vSts = "1"; else vSts = "0";					
					
					sql.add("delete from dgw_agent where no_agen='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into dgw_agent(no_agen,kode_lokasi,nama_agen,alamat,flag_aktif,tempat_lahir,tgl_lahir,no_hp,email,bank,cabang,norek,namarek,kode_marketing) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.c_status.getText()+"','"+this.e_tempat.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nohp.getText()+"','"+this.e_email.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.cb_marketing.getText()+"')");
					
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from dgw_agent where no_agen = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				//mengatur tampilan pageindex
				this.pc1.setActivePage(this.pc1.childPage[1]);				
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
				var strSQL = "select no_agen,kode_lokasi,nama_agen,alamat,flag_aktif,tempat_lahir,tgl_lahir,no_hp,email,bank,cabang,norek,namarek,kode_marketing from dgw_agent where no_agen ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama_agen);
						this.c_status.setText(line.flag_aktif);	
						this.e_tempat.setText(line.tempat_lahir);
						this.dp_d1.setText(line.tgl_lahir);
						this.e_nohp.setText(line.no_hp);
						this.e_email.setText(line.email);
						this.e_bank.setText(line.bank);	
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.norek);	
						this.e_namarek.setText(line.namarek);
						this.cb_marketing.setText(line.kode_marketing);
						this.e_alamat.setText(line.alamat);													
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
		var strSQL = "select no_agen,nama_agen,alamat,flag_aktif,tempat_lahir,tgl_lahir,no_hp,email,bank,cabang,norek,namarek,kode_marketing from dgw_agent where kode_lokasi='"+this.app._lokasi+"'";		
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
			this.sg1.appendData([line.no_agen,line.nama_agen,line.tempat_lahir+", "+line.tgl_lahir,line.alamat,line.no_hp,line.email,line.bank+" - "+line.cabang,line.norek+" - "+line.namarek,line.kode_marketing]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
