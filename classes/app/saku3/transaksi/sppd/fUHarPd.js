window.app_saku3_transaksi_sppd_fUHarPd = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sppd_fUHarPd.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sppd_fUHarPd";
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Uang Harian", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_status = new saiCBBL(this,{bound:[20,15,200,20],caption:"Status SPPD", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
				
		this.p1 = new panel(this,{bound:[20,23,800,450],caption:"Daftar Tarif"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:3,tag:9,				
				colTitle:["Jabatan","Nama","Tarif"],
				colWidth:[[2,1,0],[100,300,80]],
				colFormat:[[2],[cfNilai]],
				buttonStyle:[[0],[bsEllips]], 					
				ellipsClick:[this,"doEllipseClick"],
				afterPaste:[this,"doAfterPaste"],pasteEnable:true,autoPaging:true,rowPerPage:200,
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg,pager:[this,"doPage"]});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
			
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.stsSimpan = 1;		

			this.standarLib = new util_standar();			
			this.cb_status.setSQL("select sts_spj, nama from sp_status where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["sts_spj","nama"],false,["Kode","Nama"],"and","Data Status",true);
			this.sg.clear(1);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sppd_fUHarPd.extend(window.childForm);
window.app_saku3_transaksi_sppd_fUHarPd.implement({
	doAfterPaste: function(sender,totalRow){
		try {									
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					var strSQL2 = "select kode_jab from sp_jab where kode_lokasi='"+this.app._lokasi+"'";
					var dataS2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof dataS2 == "object" && dataS2.rs.rows[0] != undefined){
						this.dataBand = dataS2;
					}
					
					for (var i=0; i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) {
							this.inValid = true;										
							if (this.dataBand.rs.rows.length > 0) {
								for (var j=0;j < this.dataBand.rs.rows.length;j++){				
									if (this.sg.cells(0,i) == this.dataBand.rs.rows[j].kode_jab) {
										this.inValid = false;
										break;
									}																						
								}
								if (this.inValid) {
									system.alert(this,"Kode Jabatan "+this.sg.cells(0,i)+" tidak terdaftar.","");
									return false;
								}
							}
						}
					}

					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("delete from sp_uhar where sts_spj = '"+this.cb_status.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");							
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)) {
							sql.add("insert into sp_uhar (sts_spj,kode_jab,nilai,kode_lokasi) values ('"+this.cb_status.getText()+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+", '"+this.app._lokasi+"')");
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) 
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_status);
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
			if (this.cb_status.getText() != ""){						
				var strSQL = "select a.kode_jab, a.nilai,b.nama from sp_uhar a inner join sp_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi "+						 
				 			 "where a.sts_spj='"+this.cb_status.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_jab";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_jab,line.nama,floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);									
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doEllipseClick: function(sender, col, row){
		try{		
			if (sender == this.sg) {
                if (col == 0){
                    this.standarLib.showListData(this, "Daftar Band/Jabatan",sender,undefined, 
                            "select kode_jab,nama from sp_jab where kode_lokasi='"+this.app._lokasi+"'",
							"select count(kode_jab) from sp_jab where kode_lokasi='"+this.app._lokasi+"'",
							["kode_jab"],"and",["Kode"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_status.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});