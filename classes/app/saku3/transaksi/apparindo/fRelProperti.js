window.app_saku3_transaksi_apparindo_fRelProperti = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_apparindo_fRelProperti.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_apparindo_fRelProperti";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Relasi Properti", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox"); 
		uses("saiGrid",true);		
				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Relasi Properti","Data Relasi Properti"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:2,tag:9,
		            colTitle:["Kode Cust","Tahun"],
					colWidth:[[1,0],[120,120]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_cust = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Kode Anggota", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_th = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Tahun", maxLength:50, tag:2,change:[this,"doChange"]});				

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,15,550,305], childPage:["Data Properti"]});				
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:2,
		            colTitle:["Kode","Nama","Nilai"],
					colWidth:[[2,1,0],[100,300,80]],
					columnReadOnly:[true,[1]],					
					change:[this,"doChangeCell"],
					colFormat:[[2],[cfNilai]],
					buttonStyle:[[0],[bsEllips]],
					ellipsClick:[this,"doEllipsClick"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg,pager:[this,"doPager4"]});
		this.bLoad = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad1"]});		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_cust.setSQL("select kode_cust, nama from cust2 where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Daftar Customer",true);
			
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.e_th.setText(line.tahun);
			}
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_apparindo_fRelProperti.extend(window.childForm);
window.app_saku3_transaksi_apparindo_fRelProperti.implement({
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
					for(var i=0;i < this.sg.getRowCount();i++){			
						sql.add("insert into ape_rel_properti(kode_cust,kode_properti,kode_lokasi,value,tahun) values "+
								"('"+this.cb_cust.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+nilaiToFloat(this.sg.cells(2,i))+"','"+this.e_th.getText()+"')");
					}
					setTipeButton(tbSimpan);
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
					sql.add("delete from ape_rel_properti where kode_cust = '"+this.cb_cust.getText()+"' and tahun = '"+this.e_th.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			

					for(var i=0;i < this.sg.getRowCount();i++){			
						sql.add("insert into ape_rel_properti(kode_cust,kode_properti,kode_lokasi,value,tahun) values "+
								"('"+this.cb_cust.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+nilaiToFloat(this.sg.cells(2,i))+"','"+this.e_th.getText()+"')");
					}				
					setTipeButton(tbSimpan);
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
					sql.add("delete from ape_rel_properti where kode_cust = '"+this.cb_cust.getText()+"' and tahun = '"+this.e_th.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					setTipeButton(tbSimpan);
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
					this.standarLib.clearByTag(this, new Array("0","1","9","2"),this.cb_cust);
					setTipeButton(tbSimpan);
					this.sg.clear(1);
					this.doLoad();
					var data = this.dbLib.getDataProvider("select year(getdate()) as tahun",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line = data.rs.rows[0];							
						this.e_th.setText(line.tahun);
					}
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
			if (sender == this.cb_cust || this.e_th && this.cb_cust.getText() != "" && this.e_th.getText() != ""){
				var strSQL = "select a.kode_properti,b.nama,a.value from ape_rel_properti a inner join ape_properti b on a.kode_properti=b.kode_properti where a.kode_cust ='"+this.cb_cust.getText()+"' and a.tahun ='"+this.e_th.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   				
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					setTipeButton(tbUbahHapus);
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg.appendData([line1.kode_properti,line1.nama,parseFloat(line1.value)]);
					}  
				} else this.standarLib.clearByTag(this, new Array("1"),undefined);
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
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"));
			this.sg.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbSimpan);						
		} catch(e) {
			alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			if (sender.cells(0,row) != "") {
				var data = this.dbLib.getDataProvider("select nama from ape_properti where kode_properti='"+this.sg.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.sg.cells(1,row,line.nama);
					}
				}			
			}
		}					
		if (col == 3 ) this.sg.validasi();	
	},
	doLoad:function(sender){								
		try {			
			var strSQL = "select kode_cust,tahun from ape_rel_properti where kode_lokasi='"+this.app._lokasi+"' group by kode_cust,tahun ";								
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	},	
	doLoad1:function(sender){																		
		var strSQL = "select kode_properti,nama "+
		             "from ape_properti "+					 					 
					 "where kode_lokasi='"+this.app._lokasi+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU1 = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData1(1);
		} else this.sg.clear(1);			
	},
	doTampilData1: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];													
			this.sg.appendData([line.kode_properti,line.nama,0]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	doEllipsClick: function(sender, col, row){
		try{							
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Properti",sender,undefined, 
												"select kode_properti,nama from ape_properti where kode_lokasi = '"+this.app._lokasi+"'",
												"select count(kode_properti)  from ape_properti where kode_lokasi = '"+this.app._lokasi+"'",
												["kode_properti","nama"],"and",["Kode","Nama"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];								
			this.sg1.appendData([line.kode_cust,line.tahun]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;	
				this.pc1.setActivePage(this.pc1.childPage[0]);													
				this.cb_cust.setText(this.sg1.cells(0,row));
				this.e_th.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}
});