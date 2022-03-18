window.app_saku3_transaksi_belajar_fCust3 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_belajar_fCust3.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_belajar_fCust3";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Customer", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox"); 
		uses("saiGrid",true);		
				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Customer","Data Customer","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
		            colTitle:["Kode","Nama","Alamat","Kota","No Telepon","No Faximile","Email"],
					colWidth:[[6,5,4,3,2,1,0],[150,150,100,150,150,150,80]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.e_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,500,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"Alamat", maxLength:150, tag:1});		
		this.e_kota = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Kota", maxLength:50, tag:1});	
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"No Telepon", maxLength:50, tag:1});	
		this.e_fax = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"No Faximile", maxLength:50, tag:1});	
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,500,20],caption:"NPWP", maxLength:50, tag:1});	
		this.e_alamat2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"Alamat NPWP", maxLength:150, tag:1});	
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,500,20],caption:"Contact Person", maxLength:50, tag:1});	
		this.e_dep = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,500,20],caption:"Departemen", maxLength:50, tag:1});	
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,500,20],caption:"Email", maxLength:50, tag:1});	
		this.e_nohp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,500,20],caption:"Hand Phone", maxLength:50, tag:1});	
		this.e_fax2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,500,20],caption:"Faximile PIC", maxLength:50, tag:1});
		
		this.cb_kode2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode", multiSelection:false, maxLength:10,tag:9});		
		//this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});			
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_kode2.setSQL("select kode_cust ,nama from cust2 ",["kode_cust","nama"],false,["Kode","Nama"],"where","Data Customer",true);			
			//this.e_alamat2.setSQL("select kode_jur,nama_jur from jurusan ",["kode_jur","nama_jur"],false,["Kode","Nama"],"where","Data Jurusan",true);
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_belajar_fCust3.extend(window.childForm);
window.app_saku3_transaksi_belajar_fCust3.implement({
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
					sql.add("insert into cust2(kode_cust,kode_lokasi,nama,alamat,kota,no_telp,no_fax,npwp,alamat2,pic,departemen,email,no_hp,no_fax2) values "+
							"('"+this.e_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+
							"','"+this.e_tel.getText()+"','"+this.e_fax.getText()+"','"+this.e_npwp.getText()+"','"+this.e_alamat2.getText()+
							"','"+this.e_pic.getText()+"','"+this.e_dep.getText()+"','"+this.e_email.getText()+"','"+this.e_nohp.getText()+
							"','"+this.e_fax2.getText()+"')");
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
					sql.add("delete from cust2 where kode_cust = '"+this.e_kode.getText()+"'");			
					sql.add("insert into cust2(kode_cust,kode_lokasi,nama,alamat,kota,no_telp,no_fax,npwp,alamat2,pic,departemen,email,no_hp,no_fax2) values "+
							"('"+this.e_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+
							"','"+this.e_tel.getText()+"','"+this.e_fax.getText()+"','"+this.e_npwp.getText()+"','"+this.e_alamat2.getText()+
							"','"+this.e_pic.getText()+"','"+this.e_dep.getText()+"','"+this.e_email.getText()+"','"+this.e_nohp.getText()+
							"','"+this.e_fax2.getText()+"')");
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
					sql.add("delete from cust2 where kode_cust = '"+this.e_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_kode);
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
			if (sender == this.e_kode && this.e_kode.getText() != ""){
				var strSQL = "select kode_cust,nama,alamat,kota,no_telp,no_fax," +
							 "npwp,alamat2,pic,departemen,email,no_hp,no_fax2 "+
				             "from cust2 where kode_cust ='"+this.e_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_kota.setText(line.kota);
						this.e_tel.setText(line.no_telp);
						this.e_fax.setText(line.no_fax);
						this.e_npwp.setText(line.npwp);
						this.e_alamat2.setText(line.alamat2);
						this.e_pic.setText(line.pic);
						this.e_dep.setText(line.departemen);
						this.e_email.setText(line.email);
						this.e_nohp.setText(line.no_hp);
						this.e_fax2.setText(line.no_fax2);
						
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_kode.getText()+")");							
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
	doCari:function(sender){								
		try {
			if (this.cb_kode2.getText() != "") {
				var filter = " kode_cust like '%"+this.cb_kode2.getText()+"%' ";
			}
			//if (this.e_nama2.getText() != "") {
			//	var filter = filter + " nama like '%"+this.e_nama2.getText()+"%' ";
			//}
			//if (this.e_alamat2.getText() != "") {
			//	var filter = filter + " kode_jur like '%"+this.e_alamat2.getText()+"%' ";
			//}
			//else if var filter = " nama like '%"+this.e_nama2.getText()+"%' ";	
			
			var strSQL = "select kode_cust,nama,alamat,kota,no_telp,no_fax,email "+
				             "from cust2 where "+filter;
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
	doLoad:function(sender){								
		try {			
			var strSQL = "select kode_cust,nama,alamat,kota,no_telp,no_fax,email "+
				             "from cust2";								
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
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];								
			this.sg1.appendData([line.kode_cust,line.nama,line.alamat,line.kota,
								 line.no_telp,line.no_fax,line.email]); 
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
				this.pc1.setActivePage(this.pc1.childPage[1]);													
				this.e_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));						
			}
		} catch(e) {alert(e);}
	}
});