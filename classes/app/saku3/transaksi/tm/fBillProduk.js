window.app_saku3_transaksi_tm_fBillProduk = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tm_fBillProduk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tm_fBillProduk";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Produk Billing", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["List Produk","Data Produk"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:2,tag:9,
		            colTitle:["Kode","Nama"],
					colWidth:[[1,0],[400,100]],
					readOnly:true, readOnly:true, autoPaging:true, rowPerPage:20,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:100, tag:1});	
		this.cb_piutang = new saiCBBL(this.pc2.childPage[1],{bound:[20,12,220,20],caption:"Akun Piutang", multiSelection:false, maxLength:10, tag:2});						
	
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,22,995,335], childPage:["Data Pendpatan"]});			
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:0,				
				colTitle:["Kode Akun","Nama","Kode DRK","Nama DRK"],
				colWidth:[[3,2,1,0],[250,80,250,80]],
				columnReadOnly:[true,[1,3],[0,2]],
				buttonStyle:[[0,2],[bsEllips,bsEllips]], 
				ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.stsSimpan = 1;						
			this.standarLib = new util_standar();
				
			this.doLoad3();
			
			this.cb_piutang.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"where","Daftar Akun",true);						
			
			var strSQL = "select year(GETDATE()) as tahun";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){								
					this.tahun = line.tahun;					
				}
			}
				
			var sql = new server_util_arrayList();
			sql.add("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'");			
			sql.add("select kode_drk, nama from drk where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.tahun+"'");			
			this.dbLib.getMultiDataProviderA(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tm_fBillProduk.extend(window.childForm);
window.app_saku3_transaksi_tm_fBillProduk.implement({
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
					sql.add("insert into bill_produk(kode_produk,nama,akun_piutang,akun_pdpt,kode_drk,kode_lokasi) values "+					
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_piutang.getText()+"','-','-','"+this.app._lokasi+"')");					
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into bill_produk_d(kode_produk,kode_lokasi,kode_akun,kode_drk,tahun) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.tahun+"')");
							}
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from bill_produk where kode_produk='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from bill_produk_d where kode_produk='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						                     					
					
					sql.add("insert into bill_produk(kode_produk,nama,akun_piutang,akun_pdpt,kode_drk,kode_lokasi) values "+					
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_piutang.getText()+"','-','-','"+this.app._lokasi+"')");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into bill_produk_d(kode_produk,kode_lokasi,kode_akun,kode_drk,tahun) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.tahun+"')");
							}
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad3();
					this.pc2.setActivePage(this.pc2.childPage[0]);	
					this.sg.clear(1);													
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
				sql.add("delete from bill_produk where kode_produk='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from bill_produk_d where kode_produk='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								                     
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},	
	doLoad3:function(sender){														
		var strSQL = "select kode_produk,nama from bill_produk order by kode_produk";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
			this.page=1;
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.kode_produk,line.nama]); 
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
				var strSQL = "select * from bill_produk where kode_produk ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.cb_piutang.setText(line.akun_piutang);
						var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.kode_drk,c.nama as nama_drk  "+
									   "from bill_produk_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									   "                     inner join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi "+					   
									   "where a.kode_produk='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];													
								this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_drk,line.nama_drk]);
							}
					
						} else this.sg.clear(1);	
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
	doChangeCell: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg.cells(0,row) != "") {				
				var akun = this.dataAkun.get(sender.cells(0,row));			
				if (akun) sender.cells(1,row,akun);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		if (col == 2) {
			if (this.sg.cells(2,row) != "") {
				var drk = this.dataDRK.get(sender.cells(2,row));
				if (drk) sender.cells(3,row,drk);
				else {
					if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode DRK "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select kode_akun,nama   from masakun where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_akun) from masakun where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
							"select kode_drk,nama   from drk where kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.tahun+"'",
							"select count(kode_drk) from drk where kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.tahun+"'",
							["kode_drk","nama"],"and",["Kode","Nama"],false);				
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
	      			case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();														
							this.dataDRK = new portalui_arrayMap();												
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];									
									this.dataDRK.set(line.kode_drk, line.nama);										
								}								
							}
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});