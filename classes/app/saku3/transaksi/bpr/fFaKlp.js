window.app_saku3_transaksi_bpr_fFaKlp = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fFaKlp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fFaKlp";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kelompok Barang", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datecpker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		

		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Klp Barang","Data Klp Barang"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["Kode Klp","Nama","Klp Akun","Jenis"],
					colWidth:[[3,2,1,0],[100,100,200,80]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode Klp",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Nama", maxLength:50, tag:1});							
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Jenis",items:["ASET","INVENTARIS"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_klpakun = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Kelompok Akun",maxLength:20,multiSelection:false});		

		this.rearrangeChild(10, 23);
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

		this.cb_klpakun.setSQL("select kode_klpakun, nama from fa_klpakun where kode_lokasi = '"+this.app._lokasi+"'",["kode_klpakun","nama"],false,["Kode","Nama"],"and","Data Kelompok Akun",true);						
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fFaKlp.extend(window.childForm);
window.app_saku3_transaksi_bpr_fFaKlp.implement({
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
					if (this.c_jenis.getText() == "ASET") vSts = "A"; else vSts = "I";									
					sql.add("insert into fa_klp(kode_klpfa,nama,kode_klpakun,kode_lokasi,jenis) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_klpakun.getText()+"','"+this.app._lokasi+"','"+vSts+"')");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"")
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();		
					if (this.c_jenis.getText() == "ASET") vSts = "A"; else vSts = "I";												
					sql.add("update fa_klp set nama='"+this.e_nama.getText()+"',kode_klpakun='"+this.cb_klpakun.getText()+"',jenis='"+vSts+"' "+
					        "where kode_klpfa = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from fa_klp where kode_klpfa = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
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
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from fa_klp where kode_klpfa ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_nama.setText(line.nama);	
						this.cb_klpakun.setText(line.kode_klpakun);	
						
						if (line.jenis == "A") this.c_jenis.setText("ASET");
						else this.c_jenis.setText("INVENTARIS");									

						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
			
			if (sender == this.c_jenis && this.c_jenis.getText()!="") {
				if (this.c_jenis.getText() == "ASET") {
					this.cb_klpakun.setTag("0");
					this.cb_klpakun.show();
				}
				else {
					this.cb_klpakun.setTag("9");
					this.cb_klpakun.setText("-","-");
					this.cb_klpakun.hide();
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
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){								
		var strSQL = "select a.kode_klpfa,a.nama,a.kode_klpakun, case when a.jenis='A' then 'ASET' else 'INVENTARIS' end as jenis "+
		             "from fa_klp a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},
	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_klpfa,line.nama,line.kode_klpakun,line.jenis.toUpperCase()]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
