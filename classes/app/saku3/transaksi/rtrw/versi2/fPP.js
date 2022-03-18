window.app_saku3_transaksi_rtrw_versi2_fPP = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rtrw_versi2_fPP.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rtrw_versi2_fPP";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data RT", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["List RT","Entry Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["Kode","Nama","Ketua","Alamat"],
					colWidth:[[3,2,1,0],[300,200,100,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Nama", maxLength:50, tag:1});
		this.e_ketua = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Ketua RT", maxLength:100, tag:1});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,550,20],caption:"Alamat RT", maxLength:100, tag:1});
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,550,20],caption:"Bank", maxLength:200, tag:1});
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,550,20],caption:"No Rekening", maxLength:100, tag:1});
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,550,20],caption:"Nama Rekening", maxLength:100, tag:1});
		
		
		this.cb_kas = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Akun Kas", multiSelection:false, maxLength:10, tag:2});							
		this.cb_kasRW = new saiCBBL(this.pc1.childPage[1],{bound:[20,19,220,20],caption:"Akun Kas RW", multiSelection:false, maxLength:10, tag:2});							
		this.cb_pdpt = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Akun Pdpt RT", multiSelection:false, maxLength:10, tag:2});							
		this.cb_titip = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Akun Titipan RW", multiSelection:false, maxLength:10, tag:2});							
		
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
			
			this.cb_kas.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_kasRW.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_pdpt.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_titip.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rtrw_versi2_fPP.extend(window.childForm);
window.app_saku3_transaksi_rtrw_versi2_fPP.implement({
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
					sql.add("insert into pp(kode_pp,kode_lokasi,nama,ketua,alamat,level_spasi,rowindex,flag_aktif,bank,no_rek,nama_rek, akun_kas,akun_kastitip,akun_titip,akun_pdpt) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_ketua.getText()+"','"+this.e_alamat.getText()+"',0,0,'1','"+this.e_bank.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"', '"+this.cb_kas.getText()+"','"+this.cb_kasRW.getText()+"','"+this.cb_titip.getText()+"','"+this.cb_pdpt.getText()+"')");					
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
					sql.add("delete from pp where kode_pp = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into pp(kode_pp,kode_lokasi,nama,ketua,alamat,level_spasi,rowindex,flag_aktif,bank,no_rek,nama_rek, akun_kas,akun_kastitip,akun_titip,akun_pdpt) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_ketua.getText()+"','"+this.e_alamat.getText()+"',0,0,'1','"+this.e_bank.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"', '"+this.cb_kas.getText()+"','"+this.cb_kasRW.getText()+"','"+this.cb_titip.getText()+"','"+this.cb_pdpt.getText()+"')");					
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
					sql.add("delete from pp where kode_pp = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");													
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
				var strSQL = "select * from pp where kode_pp ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_ketua.setText(line.ketua);	
						this.e_alamat.setText(line.alamat);	
						this.e_bank.setText(line.bank);	
						this.e_norek.setText(line.no_rek);	
						this.e_namarek.setText(line.nama_rek);	

						this.cb_kas.setText(line.akun_kas);	
						this.cb_kasRW.setText(line.akun_kastitip);	
						this.cb_titip.setText(line.akun_titip);	
						this.cb_pdpt.setText(line.akun_pdpt);	
						
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
		var strSQL = "select a.kode_pp,a.nama,a.ketua,a.alamat "+
		             "from pp a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_pp";		
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
			this.sg1.appendData([line.kode_pp,line.nama,line.ketua,line.alamat]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
