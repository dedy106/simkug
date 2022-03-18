window.app_saku3_transaksi_sppd_fLoadTrans = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sppd_fLoadTrans.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sppd_fLoadTrans";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Transportasi (Upload)", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");	
		
		this.c_tipe = new saiCB(this,{bound:[20,10,200,20],caption:"Tipe Inputan",items:["TAMBAH","UBAH"], readOnly:true,tag:0,change:[this,"doChange"]});				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Tarif","Error Message"]});					
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,				
				colTitle:["Kode","Asal","Tujuan","KdJenis Transp","Tarif","Val Kode","Val Jenis"],
				colWidth:[[6,5,4,3,2,1,0],[80,80,80,100,200,200,100]],
				colFormat:[[4],[cfNilai]],
				readOnly:true,
				afterPaste:[this,"doAfterPaste"],pasteEnable:true,autoPaging:true,rowPerPage:20,
				defaultRow:1,autoAppend:true});
		
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:1,tag:9,
				colTitle:["Baris INVALID"],
				colWidth:[[0],[200]],autoAppend:false,
				readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPage"]});				
		
		this.rearrangeChild(10, 23);

		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	
			this.sg.clear(1);
			this.sg3.clear(1);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sppd_fLoadTrans.extend(window.childForm);
window.app_saku3_transaksi_sppd_fLoadTrans.implement({
	doAfterPaste: function(sender,totalRow){
		try {			
			this.standarLib.clearByTag(this, new Array("3"));
			
			//load data array
			var strSQL2 = "select kode_trans from sp_trans where kode_lokasi='"+this.app._lokasi+"'";
			var dataS2 = this.dbLib.getDataProvider(strSQL2,true);
			if (typeof dataS2 == "object" && dataS2.rs.rows[0] != undefined){
				this.dataTrans = dataS2;
			}

			var strSQL = "select kode_jenis from sp_jenis where kode_lokasi='"+this.app._lokasi+"'";
			var dataS = this.dbLib.getDataProvider(strSQL,true);
			if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
				this.dataJenis = dataS;
			}

			this.inValid = false;

			//jika mode = TAMBAH DATA
			if (this.c_tipe.getText() == "TAMBAH") {		
				for (var i=0; i < this.sg.getRowCount();i++){
					this.sg.cells(5,i,"VALID");				
					
					if (this.dataTrans.rs.rows.length > 0) {
						for (var j=0;j < this.dataTrans.rs.rows.length;j++){				
							if (this.sg.cells(0,i) == this.dataTrans.rs.rows[j].kode_trans) {
								this.sg.cells(5,i,"INVALID");				
							}															
						}	
						if (this.sg.cells(5,i) == "INVALID") this.inValid = true;										
					}
				}	
			}
			else {
				for (var i=0; i < this.sg.getRowCount();i++){
					this.sg.cells(5,i,"INVALID");				
					
					if (this.dataTrans.rs.rows.length > 0) {
						for (var j=0;j < this.dataTrans.rs.rows.length;j++){				
							if (this.sg.cells(0,i) == this.dataTrans.rs.rows[j].kode_trans) {
								this.sg.cells(5,i,"VALID");				
							}															
						}	
						if (this.sg.cells(5,i) == "INVALID") this.inValid = true;										
					}
				}
			}

			//cek data jenis
			for (var i=0; i < this.sg.getRowCount();i++){
				this.sg.cells(6,i,"INVALID");				
				
				if (this.dataJenis.rs.rows.length > 0) {
					for (var j=0;j < this.dataJenis.rs.rows.length;j++){				
						if (this.sg.cells(3,i) == this.dataJenis.rs.rows[j].kode_jenis) {
							this.sg.cells(6,i,"VALID");				
						}															
					}	
					if (this.sg.cells(6,i) == "INVALID") this.inValid = true;										
				}
			}

			//cek kode sama dgn kode yg diatas
			
			for (var i=0; i < this.sg.getRowCount();i++){
				if (this.sg.cells(5,i) == "VALID"){
					for (var n=0; n < i;n++){
						if(this.sg.cells(0,i) == this.sg.cells(0,n)){
							this.sg.cells(5,i,"INVALID");
						}
					}
				}
				if (this.sg.cells(5,i) == "INVALID") this.inValid = true;
			}

			if (this.inValid == false) setTipeButton(tbSimpan);	
			else {
				setTipeButton(tbAllFalse);	
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				this.sg3.clear();
				for (var i=0; i < this.sg.getRowCount();i++) {
					if (this.sg.cells(5,i) == "INVALID" || this.sg.cells(6,i) == "INVALID") {
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	

					if (this.c_tipe.getText() == "TAMBAH") {
						for (var i=0;i < this.sg.getRowCount();i++) {
							if (this.sg.rowValid(i)) 
								var nama = this.sg.cells(1,i) + " - " + this.sg.cells(2,i);
								sql.add("insert into sp_trans (kode_trans,asal,tujuan,kode_jenis,tarif,flag_aktif,nama,kode_lokasi) values "+
										"('"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+",'1','"+nama+"','"+this.app._lokasi+"')");
						}							
					}

					if (this.c_tipe.getText() == "UBAH") {
						for (var i=0;i < this.sg.getRowCount();i++){	
							var nama = this.sg.cells(1,i) + " - " + this.sg.cells(2,i);								
							sql.add("update sp_trans set asal='"+this.sg.cells(1,i)+"',tujuan='"+this.sg.cells(2,i)+"',kode_jenis='"+this.sg.cells(3,i)+"',tarif="+nilaiToFloat(this.sg.cells(1,i))+",'1',nama='"+nama+"' "+
									"where kode_trans = '"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");	
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
					this.standarLib.clearByTag(this, new Array("0","1"));
					this.sg.clear(1); 
					this.sg3.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				if (this.inValid) {
					system.alert(this,"Terdapat data yang Invalid.","Cek Error Message.");
					return false;
				}
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.c_tipe && this.c_tipe.getText() != ""){						
				this.sg.clear(1);									
				this.sg3.clear(1);									
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
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