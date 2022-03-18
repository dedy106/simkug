window.app_saku3_transaksi_yspt_simak_fParamIndex = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_simak_fParamIndex.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_simak_fParamIndex";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Index Parameter Pembayaran", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_pp = new saiCBBL(this,{bound:[20,10,200,20],caption:"Sekolah", readOnly:true, tag:2, change:[this,"doChange"]});		
				
		this.p1 = new panel(this,{bound:[20,23,600,470],caption:"Daftar Index"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:3,tag:9,				
				colTitle:["Kode","Nama","Index"],
				colWidth:[[2,1,0],[80,300,100]],
				columnReadOnly:[true,[1],[0,2]],								
				colFormat:[[2],[cfNilai]],				
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);		
			this.cb_pp.setText(this.app._kodePP);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_simak_fParamIndex.extend(window.childForm);
window.app_saku3_transaksi_yspt_simak_fParamIndex.implement({
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
					sql.add("delete from sis_param_idx where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'");								
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && nilaiToFloat(this.sg.cells(2,i)) >= 0) 
							sql.add("insert into sis_param_idx (kode_pp,kode_lokasi,kode_param,idx) values ('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+")");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_pp);					
					setTipeButton(tbSimpan);
					this.doChange(this.cb_pp);
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
			if (sender == this.cb_pp  && this.cb_pp.getText() != "") {		
				var strSQL = "select a.kode_param,a.nama,isnull(b.idx ,0) as idx "+
							 "from sis_param a left join sis_param_idx b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.app._kodePP+"' "+						 	 
							 "where a.kode_lokasi = '"+this.app._lokasi+"' order by isnull(b.idx,0),a.kode_param "; 																		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_param,line.nama,line.idx]);
					}
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_pp.getText()+")");							
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