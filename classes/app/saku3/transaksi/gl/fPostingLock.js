window.app_saku3_transaksi_gl_fPostingLock = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_gl_fPostingLock.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_gl_fPostingLock";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Posting Locked", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.p1 = new panel(this,{bound:[20,23,500,300],caption:"Posting Locked"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:3,tag:0,				
				colTitle:["Status","Kode","Nama Lokasi"],
				colWidth:[[2,1,0],[220,80,80]],
				columnReadOnly:[true,[1,2],[0]],				
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["OPEN","LOCK"]})]],checkItem:true,
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
			
			var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.nama,isnull(b.flag_lock,'OPEN') as flag_lock   "+
					   "from lokasi a left join posting_lock b on a.kode_lokasi=b.kode_lokasi where a.flag_konsol='0' order by a.kode_lokasi",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.sg.appendData([line.flag_lock.toUpperCase(),line.kode_lokasi,line.nama]);
				}
			} else this.sg.clear(1);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_gl_fPostingLock.extend(window.childForm);
window.app_saku3_transaksi_gl_fPostingLock.implement({
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
					sql.add("delete from posting_lock");
					for (var i=0;i < this.sg.getRowCount();i++){						
						sql.add("insert into posting_lock(kode_lokasi,flag_lock) values ('"+this.sg.cells(1,i)+"','"+this.sg.cells(0,i)+"')");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);					
					setTipeButton(tbSimpan);
					var data = this.dbLib.getDataProvider("select a.kode_lokasi,a.nama,isnull(b.flag_lock,'LOCK') as flag_lock   "+
							   "from lokasi a left join posting_lock b on a.kode_lokasi=b.kode_lokasi where a.flag_konsol='0' order by a.kode_lokasi",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];													
							this.sg.appendData([line.flag_lock.toUpperCase(),line.kode_lokasi,line.nama]);
						}
					} else this.sg.clear(1);					
				break;
			case "simpan" :					
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
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