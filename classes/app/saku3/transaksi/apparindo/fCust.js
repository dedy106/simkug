window.app_saku3_transaksi_apparindo_fCust = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_apparindo_fCust.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_apparindo_fCust";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Customer", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox"); 
		uses("saiGrid",true);		
				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,500], childPage:["Daftar Customer","Data Customer"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:9,
		            colTitle:["Kode","Nama","Alamat","No Telepon"],
					colWidth:[[3,2,1,0],[100,280,280,120]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.e_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode Anggota",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,430,20],caption:"Nama", maxLength:50, tag:1});	
		this.l_tgl = new portalui_label(this.pc1.childPage[1],{bound:[20,12,100,18],caption:"Tgl Berdiri", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,12,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,430,20],caption:"Keterangan", maxLength:50, tag:1});			
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"No Telepon", maxLength:50, tag:1});		
		this.e_fax = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"No Faximile", maxLength:50, tag:1});		
		this.e_email = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,430,20],caption:"Email", maxLength:50, tag:1});	
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,430,20],caption:"Alamat", maxLength:150, tag:1});		
		this.e_kota = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,200,20],caption:"Kota", maxLength:150, tag:1});		
		this.e_kpos = new saiLabelEdit(this.pc1.childPage[1],{bound:[260,19,190,20],caption:"Kode Pos", maxLength:150, tag:1});		
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,200,20],caption:"NPWP", maxLength:50, tag:1});			
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,15,820,230], childPage:["Data Jabatan"]});				
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:9,
		            colTitle:["Kode","Keterangan","Nama","No.HP"],
					colWidth:[[3,2,1,0],[100,280,280,120]],
					columnReadOnly:[true,[1]],					
					change:[this,"doChangeCell"],
					buttonStyle:[[0],[bsEllips]],
					ellipsClick:[this,"doEllipsClick"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg,pager:[this,"doPager4"]});
		this.bLoad = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad1"]});		

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
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_apparindo_fCust.extend(window.childForm);
window.app_saku3_transaksi_apparindo_fCust.implement({
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
					sql.add("insert into cust2(kode_cust,kode_lokasi,nama,alamat,kota,no_telp,npwp,no_fax,kode_pos,keterangan,tgl_berdiri) values "+
											 "('"+this.e_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_tel.getText()+"','"+this.e_npwp.getText()+"','"+this.e_fax.getText()+
											 "','"+this.e_kpos.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"')");
					
					for(var i=0;i < this.sg.getRowCount();i++){			
						sql.add("insert into ape_rel_jab(kode_cust,kode_jab,kode_lokasi,nama,no_hp) values "+
								"('"+this.e_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"')");
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
					sql.add("delete from cust2 where kode_cust = '"+this.e_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ape_rel_jab where kode_cust = '"+this.e_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into cust2(kode_cust,kode_lokasi,nama,alamat,kota,no_telp,npwp,no_fax,kode_pos,keterangan,tgl_berdiri) values "+
											 "('"+this.e_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_kota.getText()+"','"+this.e_tel.getText()+"','"+this.e_npwp.getText()+"','"+this.e_fax.getText()+
											 "','"+this.e_kpos.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"')");
											 
					for(var i=0;i < this.sg.getRowCount();i++){			
						sql.add("insert into ape_rel_jab(kode_cust,kode_jab,kode_lokasi,nama,no_hp) values "+
								"('"+this.e_kode.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"')");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from cust2 where kode_cust = '"+this.e_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from ape_rel_jab where kode_cust = '"+this.e_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");							
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
				var strSQL = "select *from cust2 where kode_cust ='"+this.e_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
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
						this.e_email.setText(line.email);
						this.dp_d1.setText(line.tgl_berdiri);
						this.e_ket.setText(line.keterangan);
						this.e_kpos.setText(line.kode_pos);
						
						var strSQL = "select a.kode_jab, b.nama, a.nama as nama_rel, a.no_hp "+
									 "from ape_rel_jab a inner join ape_jab b on a.kode_jab=b.kode_jab "+
									 "where a.kode_cust='"+this.e_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
						var data1 = this.dbLib.getDataProvider(strSQL,true);	
						if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
							var line1;
							this.sg.clear();
							for (var i in data1.rs.rows){
								line1 = data1.rs.rows[i];																													
								this.sg.appendData([line1.kode_jab,line1.nama,line1.nama_rel,line1.no_hp]);
							}
						} 

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
		if (col == 0) {
			if (sender.cells(0,row) != "") {
				var data = this.dbLib.getDataProvider("select nama from ape_jab where kode_jab='"+this.sg.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
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
	doLoad1:function(sender){	
		var strSQL ="select kode_jab,nama from ape_jab where kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);			
		//alert(strSQL);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line2;
			this.sg.clear();
			for (var i in data.rs.rows){
				line2 = data.rs.rows[i];							
				this.sg.appendData([line2.kode_jab,line2.nama,"-","-"]);
			}
		} else this.sg.clear(1);	
		/*if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){		
				this.sg.cells(0,row,line.kode_jab);			
				this.sg.cells(1,row,line.nama);
			}
		} else this.sg.clear(1);	

		var strSQL = "select kode_jab,nama "+
		             "from ape_jab "+					 					 
					 "where kode_lokasi='"+this.app._lokasi+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU1 = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData1(1);
		} else this.sg.clear(1);
		*/			
	},
	/*doTampilData1: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];													
			this.sg.appendData([line.kode_jab,line.nama,""]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	*/
	doEllipsClick: function(sender, col, row){
		try{							
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jabatan",sender,undefined, 
												"select kode_jab,nama from ape_jab where kode_lokasi = '"+this.app._lokasi+"'",
												"select count(kode_jab)  from ape_jab where kode_lokasi = '"+this.app._lokasi+"'",
												["kode_jab","nama"],"and",["Kode","Nama"],false);				
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
	doLoad:function(sender){								
		try {			
			var strSQL = "select kode_cust,nama,alamat +', '+ kota +', '+ kode_pos as alamat,no_telp from cust2 where kode_lokasi='"+this.app._lokasi+"' ";								
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
			this.sg1.appendData([line.kode_cust,line.nama,line.alamat,line.no_telp]); 
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
			}
		} catch(e) {alert(e);}
	}
});