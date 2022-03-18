window.app_saku3_transaksi_siaga_hris_fKlpJab = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_fKlpJab.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_fKlpJab";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelompok Jabatan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Klp Jabatan","Data Klp Jabatan"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
		            colTitle:["Kode","Nama"],
								colWidth:[[1,0],[300,100]],
								readOnly:true,
								dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Kode", maxLength:10, tag:0,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Nama", maxLength:50, tag:0});
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-86],colCount:2,tag:0,
								colTitle:["Kd Grade","Deskripsi"],					
								colWidth:[[1,0],[300,100]],					
								columnReadOnly:[true,[1],[0]],								
								buttonStyle:[[0],[bsEllips]], 								
								ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
								autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});			

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

			var sql = new server_util_arrayList();
			sql.add("select kode_grade,nama from gr_grade where kode_lokasi = '"+this.app._lokasi+"'");												
			this.dbLib.getMultiDataProviderA(sql);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_fKlpJab.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_fKlpJab.implement({
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
					sql.add("insert into gr_klpjab(kode_klpjab,nama,kode_lokasi) values "+
								"	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"')");
					for (var i=0;i < this.sg.getRowCount();i++) {
						if (this.sg.rowValid(i)){			
							sql.add("insert into gr_klpjab_grade (kode_klpjab,kode_grade,kode_lokasi) values ('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"')");							
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_klpjab where kode_klpjab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from gr_klpjab_grade where kode_klpjab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					
					sql.add("insert into gr_klpjab(kode_klpjab,nama,kode_lokasi) values "+
								"	('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"')");
								
					for (var i=0;i < this.sg.getRowCount();i++) {
						if (this.sg.rowValid(i)){			
							sql.add("insert into gr_klpjab_grade (kode_klpjab,kode_grade,kode_lokasi) values ('"+this.cb_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"')");							
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_klpjab where kode_klpjab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from gr_klpjab_grade where kode_klpjab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				var strSQL = "select * from gr_klpjab where kode_klpjab ='"+this.cb_kode.getText()+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);			
						var strSQL = "select b.kode_grade,b.nama "+
												 "from gr_klpjab_grade a inner join gr_grade b on a.kode_grade=b.kode_grade and a.kode_lokasi=b.kode_lokasi "+
												 "where a.kode_klpjab='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];																		
								this.sg.appendData([line.kode_grade,line.nama]);
							}
						} else this.sg.clear(1);					
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
		var strSQL = "select kode_klpjab,nama from gr_klpjab order by kode_klpjab";		
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
			this.sg1.appendData([line.kode_klpjab,line.nama]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doChangeCell: function(sender, col, row){
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {				
				var namaref = this.dataGrade.get(sender.cells(0,row));
				if (namaref) {
					sender.cells(1,row,namaref);										
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Grade "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");					
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCell");	
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Grade",sender,undefined, 
						  "select kode_grade,nama from gr_grade a where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from gr_grade a where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_grade","nama"],"and",["Kode","Nama"],false);				
				}							
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
						
						case "getMultiDataProvider":
							eval("result = "+result+";");
							if (typeof result != "string"){
								this.dataGrade = new portalui_arrayMap();							
								if (result.result[0]){	    			        
									var line;
									for (var i in result.result[0].rs.rows){
										line = result.result[0].rs.rows[i];									
										this.dataGrade.set(line.kode_grade, line.nama);										
									}								
								}																					
							}else throw result;
						break;

	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});