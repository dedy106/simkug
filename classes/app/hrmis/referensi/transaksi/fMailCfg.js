window.app_hrmis_referensi_transaksi_fMailCfg = function(owner)
{
	if (owner)
	{
		window.app_hrmis_referensi_transaksi_fMailCfg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hrmis_referensi_transaksi_fMailCfg";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Konfigurasi Email: Input/Koreksi", 0);	
		
		uses("portalui_saiCB;portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable;server_util_arrayList");
		this.cb_kode = new portalui_saiCBB(this,{bound:[20,10,150,20],caption:"Kode Lokasi",btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"],maxLength:50,});
		this.e_mail = new portalui_saiLabelEdit(this,{bound:[20,11,300,20],caption:"Email", maxLength:100});
		this.e_pwd = new portalui_saiLabelEdit(this,{bound:[20,12,300,20],caption:"Password", maxLength:100, tag:1, password:true});
		this.e_tipe = new portalui_saiLabelEdit(this,{bound:[20,13,300,20],caption:"Tipe Koneksi", maxLength:100, tag:1});
		this.e_insvr = new portalui_saiLabelEdit(this,{bound:[20,14,300,20],caption:"POP3 Server", maxLength:50, tag:1});
		this.e_outsvr = new portalui_saiLabelEdit(this,{bound:[20,15,300,20],caption:"SMTP Server", maxLength:50, tag:1});
		this.e_inport = new portalui_saiLabelEdit(this,{bound:[20,16,300,20],caption:"POP3 Port", maxLength:50, tipeText:ttAngka, tag:1});
		this.e_outport = new portalui_saiLabelEdit(this,{bound:[20,17,300,20],caption:"SMTP Port", maxLength:50, tipeText:ttAngka, tag:1});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		this.cb_kode.setText(this.app._lokasi);
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
window.app_hrmis_referensi_transaksi_fMailCfg.extend(window.portalui_childForm);
window.app_hrmis_referensi_transaksi_fMailCfg.implement({
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
					var sql = new server_util_arrayList();
					sql.add("insert into mail_cfg(kode_lokasi,email,pwd,conn_type,incomingsvr,outgoingsvr,incomingport,outgoingport) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_mail.getText()+"','"+this.e_pwd.getText()+"','"+this.e_tipe.getText()+"','"+this.e_insvr.getText()+"','"+this.e_outsvr.getText()+"',"+this.e_inport.getText()+","+this.e_outport.getText()+")");
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
				try{
					var sql = new server_util_arrayList();
					sql.add("update mail_cfg set email='"+this.e_mail.getText()+"',pwd='"+this.e_pwd.getText()+"',conn_type='"+this.e_tipe.getText()+
							"',incomingsvr='"+this.e_insvr.getText()+"',outgoingsvr='"+this.e_outsvr.getText()+"',incomingport="+this.e_inport.getText()+",outgoingport="+this.e_outport.getText()+
						    " where kode_lokasi = '"+this.cb_kode.getText()+"'");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{
					var sql = new server_util_arrayList();
					sql.add("delete from mail_cfg where kode_lokasi = '"+this.cb_kode.getText()+"' ");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.cb_kode.setText(this.app._lokasi);
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
	doLoadData: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider(" select * from mail_cfg "+
					       " where kode_lokasi ='"+this.cb_kode.getText()+"' ");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];
					if (line != undefined){
					    this.cb_kode.setText(line.kode_lokasi);
						this.e_mail.setText(line.email);
						this.e_pwd.setText(line.pwd);
						this.e_tipe.setText(line.conn_type);
						this.e_insvr.setText(line.incomingsvr);
						this.e_outsvr.setText(line.outgoingsvr);
						this.e_inport.setText(line.incomingport);
						this.e_outport.setText(line.outgoingport);
						setTipeButton(tbUbahHapus);
					}
					else{
					    
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			//if (this.app._userStatus=="A")
				if (sender == this.cb_kode){
				    this.standarLib.showListData(this, "Daftar Lokasi",sender,undefined,
											  "select kode_lokasi,nama from lokasi ",
											  "select count(*) from lokasi ",
											  ["kode_lokasi","nama"],"and",["Kode","Nama"],false);
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
						if (result.toLowerCase().search("error") == -1)	{
							this.app._mainForm.pesan(2,"Data telah sukses tersimpan.");
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