window.app_saku3_transaksi_yakes21_inves_fObligor = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fObligor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fObligor";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jenis Obligasi", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["List Jenis","Data Jenis","Filter Cari"]});		
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
		this.c_jenis = new saiCB(this.pc2.childPage[1],{bound:[20,12,220,20],caption:"Jenis",items:["PEMERINTAH","KORPORASI"], readOnly:true,tag:2});		
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,14,220,20],caption:"Status",items:["KONVESIONAL","SYARIAH"], readOnly:true,tag:2});				
		
		this.cb_akuntrading = new saiCBBL(this.pc2.childPage[1],{bound:[20,16,220,20],caption:"Akun Trading", multiSelection:false, tag:2});						
		this.cb_akunhts = new saiCBBL(this.pc2.childPage[1],{bound:[20,11,220,20],caption:"Akun HTS", multiSelection:false, tag:2});								
		this.cb_akunamor = new saiCBBL(this.pc2.childPage[1],{bound:[20,12,220,20],caption:"Akun Amor/SPI", multiSelection:false, tag:2});						
		this.cb_akunoci = new saiCBBL(this.pc2.childPage[1],{bound:[20,13,220,20],caption:"Akun OCI", multiSelection:false, tag:2});						
		this.cb_akungl = new saiCBBL(this.pc2.childPage[1],{bound:[20,14,220,20],caption:"Akun GainLoss", multiSelection:false, tag:2});						
		this.cb_akunkupon = new saiCBBL(this.pc2.childPage[1],{bound:[20,15,220,20],caption:"Akun Kupon", multiSelection:false, tag:2});						

		this.e_nama2 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,11,400,20],caption:"by Nama", maxLength:100, tag:9});	
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,15,98,18],caption:"Cari",click:[this,"doCari"]});			

		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);		
		this.pc2.childPage[2].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			
			this.stsSimpan = 1;						
			this.standarLib = new util_standar();

			this.cb_akunhts.setSQL("select kode_akun,nama from masakun  where block='0' and kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_akuntrading.setSQL("select kode_akun,nama from masakun  where block='0' and kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_akunamor.setSQL("select kode_akun,nama from masakun  where block='0' and kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_akunoci.setSQL("select kode_akun,nama from masakun  where block='0' and kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_akungl.setSQL("select kode_akun,nama from masakun  where block='0' and kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_akunkupon.setSQL("select kode_akun,nama from masakun  where block='0' and kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
				
			this.doLoad3();		

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_inves_fObligor.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fObligor.implement({			
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
					sql.add("insert into inv_obligor(kode_obligor,nama,jenis,status,akun_hts,akun_trading,akun_amor,akun_oci,akun_gl,akun_kupon) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.c_jenis.getText()+"','"+this.c_status.getText()+"','"+this.cb_akunhts.getText()+"','"+this.cb_akuntrading.getText()+"','"+this.cb_akunamor.getText()+"','"+this.cb_akunoci.getText()+"','"+this.cb_akungl.getText()+"','"+this.cb_akunkupon.getText()+"')");	
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
					sql.add("delete from inv_obligor where kode_obligor='"+this.cb_kode.getText()+"'");			
					sql.add("insert into inv_obligor(kode_obligor,nama,jenis,status,akun_hts,akun_trading,akun_amor,akun_oci,akun_gl,akun_kupon) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.c_jenis.getText()+"','"+this.c_status.getText()+"','"+this.cb_akunhts.getText()+"','"+this.cb_akuntrading.getText()+"','"+this.cb_akunamor.getText()+"','"+this.cb_akunoci.getText()+"','"+this.cb_akungl.getText()+"','"+this.cb_akunkupon.getText()+"')");	
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
				sql.add("delete from inv_obligor where kode_obligor='"+this.cb_kode.getText()+"'");			
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},	
	doCari:function(sender){														
		var strSQL = "select kode_obligor,nama from inv_obligor where nama like '%"+this.e_nama2.getText()+"%' order by kode_obligor";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.page = 1;
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();	
			this.doTampilData3(1);		
			this.pc2.setActivePage(this.pc2.childPage[0]);																			
		} else this.sg3.clear(1);			
	},
	doLoad3:function(sender){		
		try {												
			var strSQL = "select kode_obligor,nama from inv_obligor order by kode_obligor";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.page = 1;
				this.dataJU3 = data;
				this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn3.rearrange();	
				this.doTampilData3(1);			
			} else this.sg3.clear(1);	
		}
		catch(e) {
			alert(e);
		}		
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.kode_obligor,line.nama,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);	
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
			var baris = row;
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
				var strSQL = "select * from inv_obligor where kode_obligor ='"+this.cb_kode.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);												
						this.c_jenis.setText(line.jenis);												
						this.c_status.setText(line.status);												

						this.cb_akunhts.setText(line.akun_hts);												
						this.cb_akuntrading.setText(line.akun_trading);												
						this.cb_akunamor.setText(line.akun_amor);												
						this.cb_akunoci.setText(line.akun_oci);												
						this.cb_akungl.setText(line.akun_gl);												
						this.cb_akunkupon.setText(line.akun_kupon);												
						
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
						if (result.toLowerCase().search("error") == -1)	{											
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

