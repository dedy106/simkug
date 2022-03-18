window.app_saku3_transaksi_uin_fRekening = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fRekening.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fRekening";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Rekening", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		

		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar Rekening","Data Rekening"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Pilih"],
					colWidth:[[2,1,0],[70,300,100]],
					colFormat:[[2],[cfButton]],
					click:[this,"doSgBtnClick1"], colAlign:[[2],[alCenter]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		

		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:20,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,400,20],caption:"Bank", maxLength:50, tag:1});	
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,400,20],caption:"Cabang", maxLength:50, tag:1});	
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,400,20],caption:"No Rekening", maxLength:50, tag:1});	
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,400,20],caption:"Nama Rekening", maxLength:50, tag:1});	
		this.cb_akun = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Kode Akun", multiSelection:false, maxLength:10, tag:1});
		
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
			
			this.cb_akun.setSQL("select kdakun, nmakun from uin_akun where kdkbkpk='111'",["kdakun","nmakun"],false,["Kode","Nama"],"and","Data Akun",true);						
			this.doLoad();

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fRekening.extend(window.childForm);
window.app_saku3_transaksi_uin_fRekening.implement({
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
					sql.add("insert into uin_rek(kode_rek,nama,kode_lokasi,bank,cabang,no_rek,nama_rek,kdakun) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.cb_akun.getText()+"')");
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
					sql.add("delete from uin_rek where kode_rek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into uin_rek(kode_rek,nama,kode_lokasi,bank,cabang,no_rek,nama_rek,kdakun) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.cb_akun.getText()+"')");
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
					sql.add("delete from uin_rek where kode_rek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
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
				var strSQL = "select * from uin_rek where kode_rek ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);	
						this.e_bank.setText(line.bank);	
						this.e_cabang.setText(line.cabang);	
						this.e_norek.setText(line.no_rek);	
						this.e_namarek.setText(line.nama_rek);								
						this.cb_akun.setText(line.kdakun);								
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}								
			}		
			if (sender == this.c_tahun && this.c_tahun.getText()!="") {
				this.doLoad();
			}	
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Rekening",sender,undefined, 
											  "select kode_rek, nama  from uin_rek where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(*) from uin_rek where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_rek","nama"],"where",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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
	},
	doSgBtnClick1: function(sender, col, row){
		try{
			if (col === 2) this.doDoubleClick(this.sg1,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));						
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select a.kode_rek,a.nama "+
		             "from uin_rek a "+					 
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_rek ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_rek,line.nama,"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});