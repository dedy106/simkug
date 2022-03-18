window.app_saku3_transaksi_yakes21_inves_fRDParam = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fRDParam.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fRDParam";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Jurnal Reksadana", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");

		this.cb_plan = new saiCBBL(this,{bound:[20,13,200,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,readOnly:true,change:[this,"doChange"]});				
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Parameter"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:3,tag:9,
		            colTitle:["Kode Param","Nama","Flag Param"],
					colWidth:[[2,1,0],[200,300,100]],
					columnReadOnly:[true,[0,1],[2]],	
					autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.stsSimpan = 1;						
			this.standarLib = new util_standar();
			
			this.cb_plan.setSQL("select kode_plan, nama from inv_plan",["kode_plan","nama"],false,["Kode","Nama"],"where","Daftar Plan Asset",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_inves_fRDParam.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fRDParam.implement({
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

					sql.add("delete from inv_rd_param where kode_plan='"+this.cb_plan.getText()+"' ");

					for (var i = 0; i < this.sg3.rows.getLength();i++){
						if (this.sg3.rowValid(i)) {
							sql.add("insert into inv_rd_param(kode_plan,kode_param,flag) values "+
									"('"+this.cb_plan.getText()+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(2,i)+"')");					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_plan);
					this.sg3.clear(1);
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :	
				this.simpan();
				break;													
		}
	},		
	doChange: function(sender){
		try{
			if (sender == this.cb_plan && this.cb_plan.getText() != "" ){
				var strSQL = "select a.kode_spro, a.nama, isnull(b.flag,'-') as flag  "+
							 "from spro a "+
							 "left join inv_rd_param b on a.kode_spro=b.kode_param and b.kode_plan='"+this.cb_plan.getText()+"' "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_spro in ( "+

							 " 'DRKRDB','PPINV','RDBBN','RDHUT', "+
							 " 'DRKRDJ','RDPIU','RDPIUGL','RDDRKSPI', "+
							 " 'RDPPHM','DRKRDJ','RDPPH' "+

							 ") order by a.kode_spro";		
							 
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg3.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg3.appendData([line1.kode_spro,line1.nama,line1.flag]);
					}
				} else this.sg3.clear(1);
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
							this.app._mainForm.pesan(2,"Transaksi telah sukses tersimpan.");							
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