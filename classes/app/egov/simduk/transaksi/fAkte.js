window.app_egov_simduk_transaksi_fAkte = function(owner)
{
	if (owner)
	{
		window.app_egov_simduk_transaksi_fAkte.prototype.parent.constructor.call(this,owner);
		this.className  = "app_egov_simduk_transaksi_fAkte";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Akte: Input/Koreksi", 0);	
		
		uses("portalui_saiCB;portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiTable");
		this.cb_kode = new portalui_saiCBB(this,{bound:[20,10,300,20],caption:"No Akta Lahir",btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"],maxLength:50,});				
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,11,280,20],caption:"No NIK / Reg", maxLength:100});		
		this.l_tgl = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,12,100,18],date:new Date().getDateStr()});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,13,400,20],caption:"Nama", maxLength:100, tag:1});		
		this.e_tempat = new portalui_saiLabelEdit(this,{bound:[20,14,400,20],caption:"Tempat Lahir", maxLength:100, tag:1});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,15,100,18],caption:"Tanggal Lahir", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,15,100,18],date:new Date().getDateStr()});
		this.cb_gender = new portalui_saiCB(this,{bound:[20,16,150,20],caption:"Jenis Kelamin",items:["L","P"],maxLength:1,mustCheck : true, tag:1});
		this.cb_anak = new portalui_saiCB(this,{bound:[20,17,150,20],caption:"Anak Ke",items:["1","2"],mustCheck : false, tag:1});
		this.e_ayah = new portalui_saiLabelEdit(this,{bound:[20,18,400,20],caption:"Nama Ayah", maxLength:50, tag:1});		
		this.e_ibu = new portalui_saiLabelEdit(this,{bound:[20,19,400,20],caption:"Nama Ibu", maxLength:50, tag:1});				
		this.cb_goldar = new portalui_saiCB(this,{bound:[20,20,150,20],caption:"Gol Darah",items:["A","B","AB","O"],mustCheck : true, tag:1});
		this.cb_rhesus = new portalui_saiCB(this,{bound:[20,21,150,20],caption:"Rhesus",items:["Rh+","Rh-"],mustCheck : true, tag:1});
		this.bTampil = new portalui_button(this,{bound:[829,21,80,18],caption:"Tampil",click:[this,"doTampilClick"]});			
		
		this.p1 = new portalui_panel(this,{bound:[10,30,900,265],caption:"Daftar Akta Kelahiran"});
		this.sg1 = new portalui_saiTable(this.p1,{bound:[1,20,895,240],tag:"9"});		
	
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
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
window.app_egov_simduk_transaksi_fAkte.extend(window.portalui_childForm);
window.app_egov_simduk_transaksi_fAkte.implement({
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
					sql.add("insert into egov_akte(no_akte,no_dok,tanggal,nama,tgl_lahir,tempat,nama_ayah,nama_ibu,anak_ke,gender,tgl_input,nik_user,gol_darah,rhesus) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_nama.getText()+"','"+this.dp_d2.getDateString()+"','"+this.e_tempat.getText()+"','"+this.e_ayah.getText()+"','"+this.e_ibu.getText()+"',"+this.cb_anak.getText()+",'"+this.cb_gender.getText()+"',now(),'"+this.app._userLog+"','"+this.cb_goldar.getText()+"','"+this.cb_rhesus.getText()+"')");					
					this.dbLib.execArraySQL(sql);
					this.sg1.clearAll();
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update egov_akte set no_dok='"+this.e_dok.getText()+"',tanggal='"+this.dp_d1.getDateString()+"',nama='"+this.e_nama.getText()+"',tgl_lahir='"+this.dp_d2.getDateString()+"',tempat='"+this.e_tempat.getText()+"',nama_ayah='"+this.e_ayah.getText()+"',nama_ibu='"+this.e_ibu.getText()+"',anak_ke="+this.cb_anak.getText()+",gender='"+this.cb_gender.getText()+"',tgl_input=now(),nik_user ='"+this.app.userLog+"',gol_darah='"+this.cb_goldar.getText()+"',rhesus='"+this.cb_rhesus.getText()+"'"+
						    "where  no_akte = '"+this.cb_kode.getText()+"'");
					this.dbLib.execArraySQL(sql);
					this.sg1.clearAll();
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from egov_akte where no_akte = '"+this.cb_kode.getText()+"' ");
					this.dbLib.execArraySQL(sql);
					this.sg1.clearAll();
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
				var data = this.dbLib.getDataProvider(" select no_dok,date_format(tanggal,'%d/%m/%Y') as tanggal,nama,date_format(tgl_lahir,'%d/%m/%Y') as tgl_lahir,tempat,nama_ayah,nama_ibu,anak_ke,gender,tgl_input,nik_user,gol_darah,rhesus from egov_akte "+
					       " where no_akte ='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
					    this.e_dok.setText(line.no_dok);
						this.dp_d1.setText(line.tanggal);
						this.e_nama.setText(line.nama);
						this.e_tempat.setText(line.tempat);
						this.dp_d2.setText(line.tgl_lahir);
						this.cb_gender.setText(line.gender);
						this.cb_anak.setText(line.anak_ke);
						this.e_ayah.setText(line.nama_ayah);
						this.e_ibu.setText(line.nama_ibu);
						this.cb_goldar.setText(line.gol_darah);
						this.cb_rhesus.setText(line.rhesus);
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
	doTampilClick: function(sender){
		try{			
			this.sg1.setColTitle(new Array("No","No Akta","No NIK/Reg","Tanggal","Nama","Tempat Lahir","Tgl Lahir","Anak Ke","Jns Kelamin","Nama Ayah","Nama Ibu","Gol Darah","Rh+"));				
			var data = this.dbLib.runSQL(" select no_akte,no_dok,date_format(tanggal,'%d/%m/%Y') as tanggal,nama,tempat,date_format(tgl_lahir,'%d/%m/%Y') as tgl_lahir,anak_ke,gender,nama_ayah,nama_ibu,gol_darah,rhesus from egov_akte ");
			this.sg1.clearAll();
			this.sg1.setData(data);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Nomor Akta",sender,undefined, 
											  "select no_akte, nama,no_dok  from egov_akte ",
											  "select count(no_akte) from egov_akte ",
											  ["no_akte","nama","no_dok"],"and",["No Akta","Nama","No NIK/Reg"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No Akta : "+ this.cb_kode.getText()+")");							
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