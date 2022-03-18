window.app_saku3_transaksi_sppd_fRoleApp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sppd_fRoleApp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sppd_fRoleApp";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Role", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.c_model = new saiCB(this,{bound:[20,10,200,20],caption:"Model Data",items:["INPUT","LOAD"], readOnly:true,tag:3,change:[this,"doChange"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Role","Data Role","UpLoad","Error Message"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
		            colTitle:["NIK","Nama"],
					colWidth:[[1,0],[300,80]],
					readOnly:true,
					autoPaging:true, rowPerPage:500,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager1"]});
				
		this.cb_nik = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,250,20],caption:"NIK", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});
		this.cb_app = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,250,20],caption:"NIK App1", multiSelection:false, maxLength:10, tag:2});
		this.cb_app2 = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,250,20],caption:"NIK App2", multiSelection:false, maxLength:10, tag:2});				
		
		this.sg = new portalui_saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
				colTitle:["NIK","NIK Approval 1","NIK Approval 2","Val NIK","Val App1","Val App2"],
				colWidth:[[5,4,3,2,1,0],[80,80,80,200,200,200]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
				readOnly:true, defaultRow:1
		});	
		
		this.sg3 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1});	
						
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg, pager:[this,"doPage"]});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.doLoad();	
			
			// "-" --->	nik approve1 tidak ada (hanya ada satu nik approve/satu atasan saja)
			//"LOS"  ---> nik yang approve di open (bebas) misal supir / ob		
			
			this.cb_nik.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Daftar Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan  where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' "+
			                   "union "+
			                   "select '-','-' "+			                   
			                   "union "+
			                   "select 'LOS','OPEN' "
			                   ,["nik","nama"],false,["NIK","Nama"],"and","Daftar Karyawan",true);			

			this.cb_app2.setSQL("select nik, nama from karyawan  where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' "+
								 "union "+
			                   	 "select 'LOS','OPEN' ",["nik","nama"],false,["NIK","Nama"],"and","Daftar Karyawan",true);	
			
			this.stsSimpan = 1;
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sppd_fRoleApp.extend(window.childForm);
window.app_saku3_transaksi_sppd_fRoleApp.implement({
		doAfterPaste: function(sender,totalRow){
		try {			
			//load data array
			var strSQL2 = "select nik from karyawan where kode_lokasi='"+this.app._lokasi+"' union select '-' union select 'los' ";
			var dataS2 = this.dbLib.getDataProvider(strSQL2,true);
			if (typeof dataS2 == "object" && dataS2.rs.rows[0] != undefined){
				this.dataNIK = dataS2;
			}

			//load data array
			var strSQL7 = "select nik from sp_role where kode_lokasi='"+this.app._lokasi+"' union select '-' union select 'los' ";
			var dataS7 = this.dbLib.getDataProvider(strSQL7,true);
			if (typeof dataS7 == "object" && dataS7.rs.rows[0] != undefined){
				this.dataNIK7 = dataS7;
			}

			this.inValid = false;
			for (var i=0; i < this.sg.getRowCount();i++){
				
				this.sg.cells(3,i,"INVALID");	
				this.sg.cells(4,i,"INVALID");				
				this.sg.cells(5,i,"INVALID");				
				
				if (this.dataNIK.rs.rows.length > 0) {				
					
					for (var j=0;j < this.dataNIK.rs.rows.length;j++){				
						if (this.sg.cells(0,i) == this.dataNIK.rs.rows[j].nik) {
							this.sg.cells(3,i,"VALID");				
						}															
					}
					
					for (var j=0;j < this.dataNIK7.rs.rows.length;j++){				
						if (this.sg.cells(0,i) == this.dataNIK7.rs.rows[j].nik) {
							this.sg.cells(3,i,"INVALID");				
						}															
					}		

					if (this.sg.cells(3,i) == "INVALID") this.inValid = true;	


					for (var j=0;j < this.dataNIK.rs.rows.length;j++){				
						if (this.sg.cells(1,i) == this.dataNIK.rs.rows[j].nik) {
							this.sg.cells(4,i,"VALID");				
						}															
					}	
					if (this.sg.cells(4,i) == "INVALID") this.inValid = true;										


					for (var j=0;j < this.dataNIK.rs.rows.length;j++){				
						if (this.sg.cells(2,i) == this.dataNIK.rs.rows[j].nik) {
							this.sg.cells(5,i,"VALID");				
						}														
						if (this.sg.cells(1,i) == this.sg.cells(2,i)) {
							this.sg.cells(5,i,"INVALID");	
						}	
					}	
					if (this.sg.cells(5,i) == "INVALID") this.inValid = true;										

				}
			}

			if (this.inValid == false) setTipeButton(tbSimpan);	
			else {
				setTipeButton(tbAllFalse);	
				this.pc1.setActivePage(this.pc1.childPage[3]);	
				this.sg3.clear();
				for (var i=0; i < this.sg.getRowCount();i++) {
					if (this.sg.cells(3,i) == "INVALID" || this.sg.cells(4,i) == "INVALID" || this.sg.cells(5,i) == "INVALID") {
						var j = i+1;
						this.sg3.appendData([j]);						
					}
				}
			}

			


			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();			
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.c_model.getText() == "INPUT") {
						if (this.cb_app.getText() == this.cb_app2.getText()) {
							system.alert(this,"NIK App1 dan NIK App2 tidak boleh sama.","");
							return false;
						}

						sql.add("insert into sp_role(nik,nik_app,nik_app2,kode_lokasi) values "+
								"('"+this.cb_nik.getText()+"','"+this.cb_app.getText()+"','"+this.cb_app2.getText()+"','"+this.app._lokasi+"')");					
					}
					
					if (this.c_model.getText() == "LOAD") {						
						if (this.sg.getRowValidCount() > 0){							
							for (var i=0; i < this.sg.getRowCount();i++){
								if(this.sg.rowValid(i)){
									if (this.sg.cells(1,i) == this.sg.cells(2,i)) {
										var k = i+1;
										system.alert(this,"NIK App1 dan NIK App2 tidak boleh sama.","Baris "+k);
										return false;
									}

									sql.add("delete from sp_role where nik ='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
									sql.add("insert into sp_role(nik,nik_app,nik_app2,kode_lokasi) values "+
											"('"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.app._lokasi+"')");					
								}
							}
						}	
					}
				
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
					sql.add("delete from sp_role where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");					
					sql.add("insert into sp_role(nik,nik_app,nik_app2,kode_lokasi) values "+
						    "('"+this.cb_nik.getText()+"','"+this.cb_app.getText()+"','"+this.cb_app2.getText()+"','"+this.app._lokasi+"')");					
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
					sql.add("delete from sp_role where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");					
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.doLoad();
					setTipeButton(tbAllFalse);
					this.sg.clear(1);
				}
				break;
			case "simpan" :					
				
				if (this.c_model.getText() == "INPUT") {
					if(this.cb_nik.getText() == this.cb_app.getText() || this.cb_nik.getText() == this.cb_app2.getText() ){
						system.alert(this,"NIK Duplikat!","Duplikasi dengan Nik  : '"+this.cb_nik.getText()+"' ");
						return false;
					}
					if(this.cb_nik.getText() == "" ){
						system.alert(this,"NIK Tidak Boleh Kosong!.","Harap Pilih NIK Karyawan");
						return false;
					}

					this.cb_nik.setTag("0");
					this.cb_app.setTag("2");
					this.cb_app2.setTag("2");					
				}
				else {
					this.cb_nik.setTag("9");
					this.cb_app.setTag("9");
					this.cb_app2.setTag("9");					
				}
				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				if (this.c_model.getText() == "INPUT") {					
					this.cb_nik.setTag("0");
					this.cb_nik.setTag("2");
					this.cb_nik.setTag("2");
				}
				else {
					this.cb_nik.setTag("9");
					this.cb_nik.setTag("9");
					this.cb_nik.setTag("9");
				}
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_nik && this.cb_nik.getText() != ""){				
				var strSQL = "select b.nik_app,b.nik_app2 "+
				             "from sp_role b   "+
						     "where b.nik ='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";					   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.cb_app.setText(line.nik_app);
						this.cb_app2.setText(line.nik_app2);
						this.stsSimpan = 0;
						setTipeButton(tbUbahHapus);						
					}
					else {
						setTipeButton(tbSimpan);
						this.stsSimpan = 1;
					}
				}								
			}			
			if (sender == this.c_model && this.c_model.getText() != ""){
				if (this.c_model.getText() == "LOAD") setTipeButton(tbSimpan);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_nik.getText()+")");							
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
		try {
			
			this.sg1.clear();
			var strSQL = "select a.nik,b.nama "+
						 "from sp_role a inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+									 
						 "order by a.nik";							
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/500));
				this.sgn1.rearrange();
				for (var i=0;i<data.rs.rows.length;i++){
					var line = this.dataJU.rs.rows[i];							
					this.sg1.appendData([line.nik,line.nama]); 
				}			
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {
		this.sg.doSelectPage(page);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);																				
				this.cb_nik.setText(this.sg1.cells(0,row));					
			}
		} catch(e) {alert(e);}
	},

	doTampilData1: function(page) {
		this.sg1.doSelectPage(page);			
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);		
	},

});