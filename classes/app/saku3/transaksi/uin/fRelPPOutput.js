window.app_saku3_transaksi_uin_fRelPPOutput = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fRelPPOutput.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fRelPPOutput";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Relasi Unit - Kd Output", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.cb_giat = new saiCBBL(this,{bound:[20,14,200,20],caption:"Kode Kegiatan", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.cb_out = new saiCBBL(this,{bound:[20,15,200,20],caption:"Kode Output", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
				
		this.p1 = new panel(this,{bound:[20,23,500,430],caption:"Daftar Unit/Fak"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:2,tag:9,				
				colTitle:["Kode","Nama"],
				colWidth:[[1,0],[300,80]],
				columnReadOnly:[true,[1],[0]],				
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		this.bPP = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load PP",click:[this,"doLoadPP"]});

		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_giat.setSQL("select distinct a.kdgiat, a.nmgiat from uin_giat a inner join uin_user b on a.kddept=b.kddept and a.kdunit=b.kdunit and a.kdprogram=b.kdprogram where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"' ",["kdgiat","nmgiat"],false,["Kode","Nama"],"and","Data Kegiatan",true);

			var sql = new server_util_arrayList();			
			sql.add("select kode_pp,nama from pp where kode_lokasi = '"+this.app._lokasi+"' and flag_aktif='1' ");	
			this.dbLib.getMultiDataProviderA(sql);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fRelPPOutput.extend(window.childForm);
window.app_saku3_transaksi_uin_fRelPPOutput.implement({
	doLoadPP : function() {
		var data = this.dbLib.getDataProvider("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows) {
				line = data.rs.rows[i];						
				this.sg.appendData([line.kode_pp,line.nama]);
			}
		} else this.sg.clear(1);
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
					sql.add("delete from uin_pp_output where kdoutput = '"+this.cb_out.getText()+"' and kdgiat='"+this.cb_giat.getText()+"'");								

					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) 
							sql.add("insert into uin_pp_output (kdoutput,kode_lokasi,kode_pp,kdgiat) values ('"+this.cb_out.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.cb_giat.getText()+"')");
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) 
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_out);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_giat && this.cb_giat.getText() != ""){						
				this.cb_out.setSQL("select kdoutput, nmoutput from uin_output where kdgiat='"+this.cb_giat.getText()+"'",["kdoutput","nmoutput"],false,["Kode","Nama"],"and","Data Output",true);
			}

			if (sender == this.cb_out && this.cb_out.getText()!="" && this.cb_giat.getText()!=""){						
				var strSQL = "select a.kode_pp,a.nama from pp a "+
							 "inner join uin_pp_output b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+						 
							  "where b.kdoutput='"+this.cb_out.getText()+"' and b.kdgiat ='"+this.cb_giat.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"' order by b.kode_pp";													  
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_pp,line.nama]);
					}
				} else this.sg.clear(1);									
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var pp = this.dataPP.get(sender.cells(0,row));
				if (pp) sender.cells(1,row,pp);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Unit/Fak "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
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
					this.standarLib.showListData(this, "Daftar Unit/Fak",sender,undefined, 
												  "select kode_pp,nama    from pp where flag_aktif= '1' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_pp)  from pp where flag_aktif= '1' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"Transaksi telah sukses tereksekusi (Kode : "+ this.cb_out.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;	 
					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataPP = new portalui_arrayMap();																										
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataPP.set(line.kode_pp, line.nama);										
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