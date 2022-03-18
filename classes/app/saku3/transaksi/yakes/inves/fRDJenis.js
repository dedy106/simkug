window.app_saku3_transaksi_yakes_inves_fRDJenis = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fRDJenis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fRDJenis";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jenis Reksadana", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["List Jenis","Data Jenis"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Pilih"],
					colWidth:[[2,1,0],[70,400,100]],
					readOnly:true, readOnly:true, autoPaging:true, rowPerPage:20,
					colFormat:[[2],[cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[2],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:100, tag:1});	
		this.cb_rd = new saiCBBL(this.pc2.childPage[1],{bound:[20,12,220,20],caption:"Akun RD", multiSelection:false, maxLength:10, tag:2});						
		//this.cb_spi = new saiCBBL(this.pc2.childPage[1],{bound:[20,13,220,20],caption:"Akun SPI", multiSelection:false, maxLength:10, tag:2});						
		this.cb_gl = new saiCBBL(this.pc2.childPage[1],{bound:[20,14,220,20],caption:"Akun GainLoss", multiSelection:false, maxLength:10, tag:2});						
		this.cb_nt = new saiCBBL(this.pc2.childPage[1],{bound:[20,15,220,20],caption:"Akun SPI", multiSelection:false, maxLength:10, tag:2});	//akunnaikturun
		this.cb_dev = new saiCBBL(this.pc2.childPage[1],{bound:[20,16,220,20],caption:"Akun Deviden", multiSelection:false, maxLength:10, tag:2});						
		
		this.cb_rdhts = new saiCBBL(this.pc2.childPage[1],{bound:[20,12,220,20],caption:"Akun RD HTS", multiSelection:false, maxLength:10, tag:2});						
		this.cb_nthts = new saiCBBL(this.pc2.childPage[1],{bound:[20,15,220,20],caption:"Akun SPI HTS", multiSelection:false, maxLength:10, tag:2});						

		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,17,200,20],caption:"Status",items:["DAKES","DAKEM"], readOnly:true,tag:0});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.stsSimpan = 1;						
			this.standarLib = new util_standar();
				
			this.doLoad3();
			
			this.cb_rd.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"where","Daftar Akun",true);						
			//this.cb_spi.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"where","Daftar Akun",true);						
			this.cb_gl.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"where","Daftar Akun",true);						
			this.cb_nt.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"where","Daftar Akun",true);						
			this.cb_dev.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"where","Daftar Akun",true);						
			
			this.cb_rdhts.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"where","Daftar Akun",true);						
			this.cb_nthts.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"where","Daftar Akun",true);						

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fRDJenis.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fRDJenis.implement({
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
					sql.add("insert into inv_rdklp(kode_rdklp,nama,akun_rd,akun_spi,akun_gl,akun_nt,akun_dev,status_dana, akun_rdhts,akun_nthts) values "+					
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_rd.getText()+"','"+this.cb_rd.getText()+"','"+this.cb_gl.getText()+"','"+this.cb_nt.getText()+"','"+this.cb_dev.getText()+"','"+this.c_status.getText()+"', '"+this.cb_rdhts.getText()+"','"+this.cb_nthts.getText()+"')");
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
					sql.add("delete from inv_rdklp where kode_rdklp='"+this.cb_kode.getText()+"'");							                     					
					sql.add("insert into inv_rdklp(kode_rdklp,nama,akun_rd,akun_spi,akun_gl,akun_nt,akun_dev,status_dana, akun_rdhts,akun_nthts) values "+					
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_rd.getText()+"','"+this.cb_rd.getText()+"','"+this.cb_gl.getText()+"','"+this.cb_nt.getText()+"','"+this.cb_dev.getText()+"','"+this.c_status.getText()+"', '"+this.cb_rdhts.getText()+"','"+this.cb_nthts.getText()+"')");
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
					this.doLoad3();
					this.pc2.setActivePage(this.pc2.childPage[0]);														
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "ubah" :	
				this.ubah();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				var sql = new server_util_arrayList();
				sql.add("delete from inv_rdklp where kode_rdklp='"+this.cb_kode.getText()+"'");							                     
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},	
	doLoad3:function(sender){														
		var strSQL = "select kode_rdklp,nama from inv_rdklp order by status_dana desc,kode_rdklp";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
			this.page=1;
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.kode_rdklp,line.nama,"Pilih"]); 
			}			
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);								
		this.page = page;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 2) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = ((this.page-1) * 20) + row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[1]);														
				this.cb_kode.setText(this.sg3.cells(0,baris));	
				this.e_nama.setText(this.sg3.cells(1,baris));									
			}
		} catch(e) {alert(e);}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from inv_rdklp where kode_rdklp ='"+this.cb_kode.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.cb_rd.setText(line.akun_rd);
						//this.cb_spi.setText(line.akun_spi);
						this.cb_gl.setText(line.akun_gl);
						this.cb_nt.setText(line.akun_nt);
						this.cb_dev.setText(line.akun_dev);
						this.c_status.setText(line.status_dana);

						this.cb_rdhts.setText(line.akun_rdhts);
						this.cb_nthts.setText(line.akun_nthts);
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
	}
});