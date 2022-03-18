window.app_saku3_transaksi_siaga_aset_fsubLokasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_aset_fsubLokasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_aset_fsubLokasi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Lokasi", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Lokasi","Data Lokasi"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
		            colTitle:["Kode","Nama","Keterangan","PP","SubPP","Klp","Lokasi"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,250,150,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_subpp = new saiCBBL(this.pc1.childPage[1],{bound:[20,19,220,20],caption:"Sub PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_klp = new saiCBBL(this.pc1.childPage[1],{bound:[20,20,220,20],caption:"Kelompok", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_lokam = new saiCBBL(this.pc1.childPage[1],{bound:[20,21,220,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Kode", maxLength:10, tag:0,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Nama", maxLength:50, tag:0});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Keterangan", maxLength:50, tag:0});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
			
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_pp.setSQL("select kode_pp, nama from am_pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_klp.setSQL("select kode_klp, nama from am_lokasi_klp where kode_lokasi='"+this.app._lokasi+"'",["kode_klp","nama"],false,["Kode","Nama"],"and","Data Kelompok",true);
			this.doLoad();			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_aset_fsubLokasi.extend(window.childForm);
window.app_saku3_transaksi_siaga_aset_fsubLokasi.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into am_sublok(kode_sublok,nama,keterangan,kode_lokam,kode_klp,kode_pp,kode_subpp,kode_lokasi) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_ket.getText()+"','"+this.cb_lokam.getText()+"','"+this.cb_klp.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_subpp.getText()+"',  '"+this.app._lokasi+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					sql.add("delete from am_sublok where kode_sublok='"+this.cb_kode.getText()+"' and kode_lokam='"+this.cb_lokam.getText()+"' and kode_klp='"+this.cb_klp.getText()+"'  and kode_subpp='"+this.cb_subpp.getText()+"'  and kode_pp='"+this.cb_pp.getText()+"'  and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into am_sublok(kode_sublok,nama,keterangan,kode_lokam,kode_klp,kode_pp,kode_subpp,kode_lokasi) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_ket.getText()+"','"+this.cb_lokam.getText()+"','"+this.cb_klp.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_subpp.getText()+"',  '"+this.app._lokasi+"')");

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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from am_sublok where kode_sublok='"+this.cb_kode.getText()+"' and kode_lokam='"+this.cb_lokam.getText()+"' and kode_klp='"+this.cb_klp.getText()+"'  and kode_subpp='"+this.cb_subpp.getText()+"'  and kode_pp='"+this.cb_pp.getText()+"'  and kode_lokasi='"+this.app._lokasi+"'");
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
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
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
			if (sender == this.cb_pp && this.cb_pp.getText()!="") {
				//this.cb_kode.setText("");
				this.cb_subpp.setSQL("select kode_subpp, nama from am_subpp where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_subpp","nama"],false,["Kode","Nama"],"and","Data Sub PP",true);
			}
			if (sender == this.cb_klp && this.cb_klp.getText()!="") {
				//this.cb_kode.setText("");
				this.cb_lokam.setSQL("select kode_lokam, nama from am_lokasi where kode_klp='"+this.cb_klp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_lokam","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			}
			/*
			if (sender == this.cb_subpp && this.cb_lokam.getText()!="") {
				this.cb_kode.setText("");
			}
			*/
			
			if (sender == this.cb_kode) {
				if (this.cb_kode.getText() != "" && this.cb_lokam.getText() != "" && this.cb_klp.getText() != "" && this.cb_pp.getText() != "" && this.cb_subpp.getText() != ""){
					var strSQL = "select * from am_sublok where kode_sublok ='"+this.cb_kode.getText()+"' and kode_klp='"+this.cb_klp.getText()+"' and kode_lokam='"+this.cb_lokam.getText()+"' and kode_pp='"+this.cb_pp.getText()+"' and kode_subpp='"+this.cb_subpp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							this.e_nama.setText(line.nama);		
							this.e_ket.setText(line.keterangan);																			
							setTipeButton(tbUbahHapus);
						}
						else{
							this.standarLib.clearByTag(this, new Array("1"),undefined);
							setTipeButton(tbSimpan);
						}
					}
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
				
				this.cb_pp.setText(this.sg1.cells(3,row));										
				this.cb_subpp.setText(this.sg1.cells(4,row));										
				this.cb_klp.setText(this.sg1.cells(5,row));										
				this.cb_lokam.setText(this.sg1.cells(6,row));										

				this.cb_kode.setText(this.sg1.cells(0,row));										
			}
		} catch(e) {alert(e);}
	},

	doLoad:function(sender){						
		var strSQL = "select a.* from am_sublok a where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_sublok";		
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
			this.sg1.appendData([line.kode_sublok,line.nama,line.keterangan,line.kode_pp,line.kode_subpp,line.kode_klp,line.kode_lokam]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});