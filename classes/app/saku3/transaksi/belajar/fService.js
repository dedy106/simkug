window.app_saku3_transaksi_belajar_fService = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_belajar_fService.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_belajar_fService";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Test get data from API", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar","Data","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:2,tag:9,
		            colTitle:["Kode Jenis","Nama Jenis"],
					colWidth:[[1,0],[350,100]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode Jenis",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama Jenis", maxLength:50, tag:1});
		this.e_tes = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Hasil Service", maxLength:50, readOnly:true, tag:1});
        // this.cb_nik = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,222,20],caption:"NIK",tag:1,multiSelection:false,change:[this,"doChange"]});
		this.e_nik = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"NIK Esaku (dbtoko)", maxLength:50,tag:1,change:[this,"doChange"] });	
		this.e_namanik = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,400,20],caption:"Nama", maxLength:50, readOnly:true,tag:1});			
		this.e_menu = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Kode Menu", maxLength:20, readOnly:true,tag:1});	
		this.e_status = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Status Admin", maxLength:20, readOnly:true, tag:1});
		this.e_nikes = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"NIKES SIKA", maxLength:50,tag:1,change:[this,"doChange"] });	
		this.e_namasika = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,400,20],caption:"Nama", maxLength:50, readOnly:true,tag:1});		
		this.e_jk = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Jenis Kelamin", maxLength:50, readOnly:true,tag:1});		
		this.e_tgllahir = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Tgl Lahir", maxLength:50, readOnly:true,tag:1});	
		 

		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode Jenis",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama Jenis",maxLength:50,tag:9});		
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
            // this.app.services.showMe(jenis, function(data) {
            //     this.cb_nik.setBufferData(data);
            // });	
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_belajar_fService.extend(window.childForm);
window.app_saku3_transaksi_belajar_fService.implement({
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
					sql.add("insert into dev_jenis(kode_jenis,nama,kode_lokasi) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"')");
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
					sql.add("delete from dev_jenis where kode_jenis = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("insert into dev_jenis(kode_jenis,nama,kode_lokasi) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"')");
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
					sql.add("delete from dev_jenis where kode_jenis = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
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
                
                var jenis = this.cb_kode.getText();
                var self = this;
                this.app.services.showMe(jenis, function(data) {			
                    self.e_tes.setText(data);	
                });	

				var strSQL = "select kode_jenis,nama "+
				             "from dev_jenis where kode_jenis ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						setTipeButton(tbUbahHapus);
					}
					else{		
						this.e_nama.setText('');
						// this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}	
			if (sender == this.e_nik && this.e_nik.getText() != ""){
                
                var nik = this.e_nik.getText();
                var self = this;
                this.app.services.showProfile(nik, function(data) {	
					if(typeof data == 'object' && data.length > 0){
						self.e_namanik.setText(data[0].nama);		
						self.e_menu.setText(data[0].kode_klp_menu);			
						self.e_status.setText(data[0].status_admin);	
					}else{
						self.e_namanik.setText('');		
						self.e_menu.setText('');			
						self.e_status.setText('');
						system.alert(this,'NIK Tidak ditemukan',"Data NIK tidak terdapat di api esaku (dbtoko)");
					}		
                });	
			}
			if (sender == this.e_nikes && this.e_nikes.getText() != ""){
                console.log('doChange:',+this.e_nikes.getText());
                var niksika = this.e_nikes.getText();
                var self = this;
                this.app.services.getPesertaSIKA(niksika, function(res) {	
					if(res.status == 'success'){
						if(typeof res.data == 'object' && res.data.length > 0){
							var line = res.data[0];
							self.e_namasika.setText(line.NM_KYW);		
							self.e_jk.setText(line.KELAMIN);			
							self.e_tgllahir.setText(line.TGL_LAHIR);	
						}	
					}else{
						self.e_namasika.setText('');		
						self.e_jk.setText('');			
						self.e_tgllahir.setText('');
						system.alert(this,'NIKES Tidak ditemukan', res.message);
					}
                });	
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
			var filter='';
			if (this.e_kode2.getText() != "") {
				filter = " kode_jenis like '%"+this.e_kode2.getText()+"%' ";
			}
			if (this.e_nama2.getText() != "") {
				filter =" nama like '%"+this.e_nama2.getText()+"%' ";	
			}
			if (this.e_kode2.getText() != "" && this.e_nama2.getText() != "") {
				filter = " kode_jenis like '%"+this.e_kode2.getText()+"%' and nama like '%"+this.e_nama2.getText()+"%'";
			}
			
			if(filter != ''){
				var strSQL = "select kode_jenis,nama from dev_jenis "+						 
						 "where "+filter+" and kode_lokasi='"+this.app._lokasi+"'";
			}else{
				var strSQL = "select kode_jenis,nama from dev_jenis where kode_lokasi='"+this.app._lokasi+"'";
			}
			
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
			var strSQL = "select kode_jenis, nama from dev_jenis where kode_lokasi='"+this.app._lokasi+"'";								
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			console.log("doLoad");		
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
			this.sg1.appendData([line.kode_jenis,line.nama]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}   
		} catch(e) {alert(e);}
	}

});