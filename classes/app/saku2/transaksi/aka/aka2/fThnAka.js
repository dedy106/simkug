window.app_saku2_transaksi_aka_aka2_fThnAka = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fThnAka.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_aka_aka2_fThnAka";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tahun Akademik", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Thn Akademik",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.p1 = new portalui_panel(this,{bound:[20,189,800,344],caption:"Periode"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:1,tag:9,
				colTitle:["Periode"],
				colWidth:[[0],[200]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
				readOnly:true, defaultRow:1
		});		
		this.sgn1 = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.setTabChildIndex();				
		
		setTipeButton(tbSimpan);				
	}
};
window.app_saku2_transaksi_aka_aka2_fThnAka.extend(window.portalui_childForm);
window.app_saku2_transaksi_aka_aka2_fThnAka.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();			
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg1.doSelectPage(page);
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :					
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					this.sg1.setTag("0");
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();								
							sql.add("delete from aka_tahunaka where kode_lokasi='"+this.app._lokasi+"' and tahunaka='"+this.cb_kode.getText()+"'");
							for (var i=0;i < this.sg1.getRowCount();i++){									
								sql.add("insert into aka_tahunaka(tahunaka,periode,kode_lokasi) values "+
										"('"+this.cb_kode.getText()+"','"+this.sg1.cells(0,i)+"','"+this.app._lokasi+"')");
							}							
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;			
		}
	},	
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select periode from aka_tahunaka where kode_lokasi='"+this.app._lokasi+"' and tahunaka='"+this.cb_kode.getText()+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.periode]);
					}
				} else this.sg1.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Tahun Akademik",sender,undefined, 
											  "select distinct tahunaka as tahunaka from aka_tahunaka where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(*) from (select distinct tahunaka from aka_tahunaka where kode_lokasi='"+this.app._lokasi+"') a",
											  ["tahunaka","tahunaka"],"and",["Tahun Akademik","Tahun Akademik"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.cb_kode.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
