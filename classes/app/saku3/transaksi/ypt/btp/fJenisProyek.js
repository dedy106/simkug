window.app_saku3_transaksi_ypt_btp_fJenisProyek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ypt_btp_fJenisProyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ypt_btp_fJenisProyek";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jenis Proyek", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Jenis","Data Jenis"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:2,tag:9,
		            colTitle:["Kode","Nama"],
					colWidth:[[1,0],[300,80]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1,change:[this,"doChange"]});			
		this.cb_piu = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Akun Piutang", multiSelection:false, maxLength:10, tag:1});				
		this.cb_pdpt = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Akun Pendapatan", multiSelection:false, maxLength:10, tag:1});						
		this.cb_bdd = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Akun BDD", multiSelection:false, maxLength:10, tag:1});				
		this.cb_bmhd = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Akun BYMHD", multiSelection:false, maxLength:10, tag:1});				
		this.cb_beban = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Akun Beban", multiSelection:false, maxLength:10, tag:1});				
		
		this.c_tahun = new saiCB(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Tahun Anggaran", readOnly:true,tag:2,change:[this,"doChange"]});	
		this.cb_drkp = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"DRK Pdpt", multiSelection:false, maxLength:10, tag:1});						
		this.cb_drkb = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"DRK Beban", multiSelection:false, maxLength:10, tag:1});						

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

			this.cb_bdd.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_piu.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_pdpt.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_bmhd.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_beban.setSQL("select kode_akun,nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select distinct max(substring(periode,1,4)) as tahun from periode where kode_lokasi='"+this.app._lokasi+"' union select year(getdate()) ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			this.c_tahun.setText(this.app._periode.substr(0,4));

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ypt_btp_fJenisProyek.extend(window.childForm);
window.app_saku3_transaksi_ypt_btp_fJenisProyek.implement({
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
					sql.add("insert into pr_jenis(kode_jenis,kode_lokasi,nama,akun_bdd,akun_piutang,akun_pdpt,akun_bmhd,kode_pp,akun_pyt,kelompok, akun_beban, tahun,kode_drkb,kode_drkp) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_bdd.getText()+"','"+this.cb_piu.getText()+"','"+this.cb_pdpt.getText()+"','"+this.cb_bmhd.getText()+"','-','-','-','"+this.cb_beban.getText()+"','"+this.c_tahun.getText()+"','"+this.cb_drkb.getText()+"','"+this.cb_drkp.getText()+"')");							
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
					sql.add("delete from pr_jenis where kode_jenis= '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
					
					sql.add("insert into pr_jenis(kode_jenis,kode_lokasi,nama,akun_bdd,akun_piutang,akun_pdpt,akun_bmhd,kode_pp,akun_pyt,kelompok, akun_beban, tahun,kode_drkb,kode_drkp) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_bdd.getText()+"','"+this.cb_piu.getText()+"','"+this.cb_pdpt.getText()+"','"+this.cb_bmhd.getText()+"','-','-','-','"+this.cb_beban.getText()+"','"+this.c_tahun.getText()+"','"+this.cb_drkb.getText()+"','"+this.cb_drkp.getText()+"')");							
					
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
					sql.add("delete from pr_jenis where kode_jenis = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
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
					this.doLoad();
					setTipeButton(tbAllFalse);
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
			if (sender == this.c_tahun && this.c_tahun.getText()!="") {
				this.cb_drkp.setSQL("select a.kode_drk, a.nama from drk a where a.tahun='"+this.c_tahun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK Pendapatan",true);		
				this.cb_drkb.setSQL("select a.kode_drk, a.nama from drk a where a.tahun='"+this.c_tahun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK Beban",true);																													 				
			}

			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from pr_jenis "+
						     "where kode_jenis ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);				
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.cb_bdd.setText(line.akun_bdd);
						this.cb_piu.setText(line.akun_piutang);
						this.cb_pdpt.setText(line.akun_pdpt);
						this.cb_bmhd.setText(line.akun_bmhd);
						this.cb_beban.setText(line.akun_beban);		
						
						this.c_tahun.setText(line.tahun);	
						this.cb_drkb.setText(line.kode_drkb);	
						this.cb_drkp.setText(line.kode_drkp);	

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
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Jenis",sender,undefined, 
											  "select kode_jenis, nama  from pr_jenis where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(*) from pr_jenis where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_jenis","nama"],"and",["Kode","Nama"],false);				
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
			var strSQL = "select a.kode_jenis,a.nama "+
						 "from pr_jenis a "+					 
						 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_jenis";				
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
		var start = (page - 1) * 200;
		var finish = (start + 200 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+200);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.kode_jenis,line.nama]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbah);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}
});