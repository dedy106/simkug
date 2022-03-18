window.app_saku3_transaksi_siaga_hris_fStsDidik = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_fStsDidik.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_fStsDidik";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Status Pendidikan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		uses("saiGrid",true);		

		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Pendidikan","Data Pendidikan"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode","Nama","Kode Strata","Kode Jurusan","Klp Pendidikan"],
					colWidth:[[4,3,2,1,0],[100,100,100,350,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
			
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"], tag:0});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:0});		
		this.cb_klpd = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Kode Klp Pend.",maxLength:10,multiSelection:false, tag:0});
		this.cb_strata = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Kode Strata",maxLength:10,multiSelection:false, tag:0});
		this.cb_klp = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Kode Kelompok",maxLength:10,multiSelection:false, tag:0});
		this.cb_jur = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Kode Jurusan",maxLength:10,multiSelection:false, tag:0});
		
		this.rearrangeChild(10, 22);
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
			
			this.cb_strata.setSQL("select kode_strata, nama from gr_strata where kode_lokasi = '"+this.app._lokasi+"' ",["kode_strata","nama"],false,["Kode","Nama"],"and","Data Strata",true);						
			this.cb_klp.setSQL("select kode_klpjur, nama from gr_klpjur where kode_lokasi = '"+this.app._lokasi+"'",["kode_klpjur","nama"],false,["Kode","Nama"],"and","Data Klp Jurusan",true);						
			this.cb_jur.setSQL("select kode_jur, nama from gr_jur where kode_lokasi = '"+this.app._lokasi+"'",["kode_jur","nama"],false,["Kode","Nama"],"and","Data Jurusan",true);						
			this.cb_klpd.setSQL("select kode_klpdidik, nama from gr_klpdidik where kode_lokasi = '"+this.app._lokasi+"'",["kode_klpdidik","nama"],false,["Kode","Nama"],"and","Data Klp Pendidikan",true);						
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_fStsDidik.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_fStsDidik.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_status_didik(sts_didik,nama,kode_lokasi,kode_strata,kode_klpjur,kode_jur,kode_klpdidik) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_strata.getText()+"','"+this.cb_klp.getText()+"','"+this.cb_jur.getText()+"','"+this.cb_klpd.getText()+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_status_didik where sts_didik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("insert into gr_status_didik(sts_didik,nama,kode_lokasi,kode_strata,kode_klpjur,kode_jur,kode_klpdidik) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_strata.getText()+"','"+this.cb_klp.getText()+"','"+this.cb_jur.getText()+"','"+this.cb_klpd.getText()+"')");
										
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_status_didik where sts_didik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
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
				var strSQL = "select * from gr_status_didik where sts_didik ='"+this.cb_kode.getText()+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.cb_strata.setText(line.kode_strata);
						this.cb_klp.setText(line.kode_klpjur);
						this.cb_jur.setText(line.kode_jur);						
						this.cb_klpd.setText(line.kode_klpdidik);						

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
	doLoad:function(sender){								
		var strSQL = "select * from gr_status_didik where kode_lokasi='"+this.app._lokasi+"' ";		
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
			this.sg1.appendData([line.sts_didik,line.nama,line.kode_strata,line.kode_jur,line.kode_klpdidik]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
	}
});