window.app_saku3_transaksi_ppbs_fPaProgramAll = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaProgramAll.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_fPaProgramAll";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Program, RKM,DRK: Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.c_tahun = new saiCB(this,{bound:[20,9,180,20],caption:"Tahun",readOnly:true,tag:2});
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Upload Data"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:9,
		            colTitle:["Kode Program","Nama Prog","Tahun","PP",  "Kode RKM","Nama RKM", "Kode DRK", "Nama DRK" ],
					colWidth:[[7,6,5,4, 3,2,1,0],[200,80,200,80, 80,80,300,100]],
					readOnly:true,
					pasteEnable:true,autoPaging:true,rowPerPage:50,afterPaste:[this,"doAfterPaste"],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}	
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_fPaProgramAll.extend(window.childForm);
window.app_saku3_transaksi_ppbs_fPaProgramAll.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			
		} catch(e) {alert(e);}
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
					
					sql.add("delete from agg_program where jenis='ALL' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
					sql.add("delete from agg_rkm where jenis='ALL' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
					sql.add("delete from agg_drk where jenis = 'ALL' and kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
						
							sql.add("insert into agg_program(kode_program,nama,kode_lokasi,flag_aktif,tahun,kode_pp,jenis) values "+
									"('"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.app._lokasi+"','1','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','ALL')");
						
							sql.add("insert into agg_rkm(kode_rkm,nama,kode_lokasi,flag_aktif,tahun,kode_program,kode_pp,jenis) values "+
									"('"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+this.app._lokasi+"','1','"+this.sg.cells(2,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','ALL')");
							
							sql.add("insert into agg_drk(kode_drk,nama,kode_lokasi,flag_aktif,tahun,kode_rkm,jenis) values "+
									"('"+this.sg.cells(6,i)+"','"+this.sg.cells(7,i)+"','"+this.app._lokasi+"','1','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','ALL')");	


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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :	
				system.confirm(this, "upload", "Apa data sudah benar?","data diform ini apa sudah benar.");
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
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