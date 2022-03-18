window.app_saku2_transaksi_kopeg_kbitt_fRekBank= function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fRekBank.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fRekBank";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Rekening Bank", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Rek Bank","Data Rek Bank"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
		            colTitle:["Detail","Kode Rek","Nama Rek","Bank","Cabang"],
                    colWidth:[[4,3,2,1,0],[200,120,200,120,80]],
                    colFormat:[[0],[cfButton]],
                    click:[this,"doSgBtnClick1"], colAlign:[[0],[alCenter]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode Rek",maxLength:10,change:[this,"doChange"]});		
        this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Nama Rek", maxLength:50, tag:1});	
        this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Nomor Rek", maxLength:50, tag:1});	
        this.e_nama2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Nama", maxLength:50, tag:1});	
        this.cb_bank = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Kode Bank", multiSelection:false, maxLength:10});			
        this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Cabang", maxLength:50, tag:1});	
        this.cb_akun = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Kode Akun", multiSelection:false, maxLength:10});		
		
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
            
            this.cb_bank.setSQL("select kode_bank,nama from bank where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' ",["kode_bank","nama"],false,["Kode Bank","Nama Bank"],"and","Data Bank",true);	
            this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag in ('001','009') and a.kode_lokasi='"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode Akun","Nama Akun"],"and","Data Akun",true);	
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fRekBank.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fRekBank.implement({
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
					sql.add("insert into bank_rek(kode_rek,kode_lokasi,nama_rek,no_rek,kode_bank,kode_akun,cabang,nama,kode_pp,jenis) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_norek.getText()+"','"+this.cb_bank.getText()+"','"+this.cb_akun.getText()+"','"+this.e_cabang.getText()+"','"+this.e_nama2.getText()+"','"+this.app._kodePP+"','-')");					
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from bank_rek where kode_rek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into bank_rek(kode_rek,kode_lokasi,nama_rek,no_rek,kode_bank,kode_akun,cabang,nama,kode_pp,jenis) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_norek.getText()+"','"+this.cb_bank.getText()+"','"+this.cb_akun.getText()+"','"+this.e_cabang.getText()+"','"+this.e_nama2.getText()+"','"+this.app._kodePP+"','-')");					
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
					sql.add("delete from bank_rek where kode_rek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");													
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
			if (this.cb_kode.getText() != ""){
				var strSQL = "select * from bank_rek where kode_rek ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
                        this.e_nama.setText(line.nama_rek);	
                        this.e_norek.setText(line.no_rek);		
                        this.e_nama2.setText(line.nama);		
                        this.cb_bank.setText(line.kode_bank);
                        this.cb_akun.setText(line.kode_akun);			
                        this.e_cabang.setText(line.cabang);		
                        																					
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
	doSgBtnClick1: function(sender, col, row){
		try{
			if (col === 0) this.doDoubleClick(this.sg1,0,row);						
		}catch(e){
			alert(e);
		}
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(1,row));	
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
		var strSQL = "select a.kode_rek,a.nama_rek,a.kode_bank,b.nama as nama_bank,a.no_rek,a.cabang "+
                     "from bank_rek a "+
                     "inner join bank b on a.kode_bank=b.kode_bank and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_rek";		
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
			this.sg1.appendData(["Detail",line.kode_rek,line.nama_rek,line.nama_bank,line.cabang]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
