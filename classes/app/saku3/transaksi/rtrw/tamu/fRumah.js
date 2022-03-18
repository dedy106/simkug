window.app_saku3_transaksi_rtrw_tamu_fRumah = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rtrw_tamu_fRumah.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rtrw_tamu_fRumah";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Rumah", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_rt = new saiCBBL(this,{bound:[20,15,220,20],caption:"RT", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});							

		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Rumah","Data Rumah"]});
		this.sg3 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		            colTitle:["Blok","No Rumah","Nama KK"],
					colWidth:[[2,1,0],[300,100,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_blok = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Blok", multiSelection:false,rightLabelCaption:false,  maxLength:10, tag:2,change:[this,"doChange"]});							
		this.e_nomor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Rumah",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,400,20],caption:"Kepala Keluarga",maxLength:50});		
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Jenis",items:["PENGHUNI","KONTRAK","MAHASISWA","MAHASISWI","KANTOR"], readOnly:true,tag:2});
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Status Iuran",items:["LUNAS","TUNGGAK","KOSONG"], readOnly:true,tag:2});
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[5,12,990,300], childPage:["Data Penghuni","Kendaraan"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:0,
		            colTitle:["Nama","Alias","Jk","No HP","Keterangan"],					
					colWidth:[[4,3,2,1,0],[200,200,80,200,200]],										
					buttonStyle:[[2],[bsAuto]], 			
					picklist:[[2],[new portalui_arrayMap({items:["L","P"]})]],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		

		this.sg1 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
					colTitle:["No Polisi","Jenis","Merk","Warna","Ciri Khusus"],					
					colWidth:[[4,3,2,1,0],[200,200,200,100,100]],		
					buttonStyle:[[1],[bsAuto]], 			
					picklist:[[1],[new portalui_arrayMap({items:["MOTOR","MOBIL"]})]],								
					autoAppend:true,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg1});		

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
			
			this.cb_rt.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data RT",true);
			this.cb_rt.setText(this.app._kodePP);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rtrw_tamu_fRumah.extend(window.childForm);
window.app_saku3_transaksi_rtrw_tamu_fRumah.implement({
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

					sql.add("insert into rt_rumah_m (blok,nomor,kode_lokasi,kode_pp,nama_kk,status,jenis,nik_user,tgl_input) values "+
							"('"+this.cb_blok.getText()+"','"+this.e_nomor.getText()+"','"+this.app._lokasi+"','"+this.cb_rt.getText()+"','"+this.e_nama.getText()+"','"+this.c_status.getText()+"','"+this.c_jenis.getText()+"','"+this.app._userLog+"',getdate())");

					if (this.sg.getRowValidCount() > 0) {
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){		
									sql.add("insert into rt_rumah_d (blok,nomor,kode_lokasi,nu,nama,alias,jk,no_hp,keterangan,foto,tgl_awal,tgl_akhir,flag_aktif) values "+
											"('"+this.cb_blok.getText()+"','"+this.e_nomor.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"','-',getdate(),'2099-12-31','1')");
							}
						}
					}		

					if (this.sg1.getRowValidCount() > 0) {
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg.rowValid(i)){		
									sql.add("insert into rt_rumah_kbm (blok,nomor,kode_lokasi,nu,nopol,jenis,merk,warna,keterangan,foto,tgl_awal,tgl_akhir,flag_aktif) values "+
											"('"+this.cb_blok.getText()+"','"+this.e_nomor.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','-',getdate(),'2099-12-31','1')");
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

					sql.add("delete from rt_rumah_m where blok='"+this.cb_blok.getText()+"' and nomor='"+this.e_nomor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					//historis belum dipakai
					sql.add("delete from rt_rumah_d where blok='"+this.cb_blok.getText()+"' and nomor='"+this.e_nomor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from rt_rumah_kbm where blok='"+this.cb_blok.getText()+"' and nomor='"+this.e_nomor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																		


					sql.add("insert into rt_rumah_m (blok,nomor,kode_lokasi,kode_pp,nama_kk,status,jenis,nik_user,tgl_input) values "+
							"('"+this.cb_blok.getText()+"','"+this.e_nomor.getText()+"','"+this.app._lokasi+"','"+this.cb_rt.getText()+"','"+this.e_nama.getText()+"','"+this.c_status.getText()+"','"+this.c_jenis.getText()+"','"+this.app._userLog+"',getdate())");

					sql.add("update rt_rumah_d set tgl_akhir = getdate(),flag_aktif='0' where blok='"+this.cb_blok.getText()+"' and nomor='"+this.e_nomor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update rt_rumah_kbm set tgl_akhir = getdate(),flag_aktif='0' where blok='"+this.cb_blok.getText()+"' and nomor='"+this.e_nomor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					if (this.sg.getRowValidCount() > 0) {
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){		
									sql.add("insert into rt_rumah_d (blok,nomor,kode_lokasi,nu,nama,alias,jk,no_hp,keterangan,foto,tgl_awal,tgl_akhir,flag_aktif) values "+
											"('"+this.cb_blok.getText()+"','"+this.e_nomor.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"','-',getdate(),'2099-12-31','1')");
							}
						}
					}		

					if (this.sg1.getRowValidCount() > 0) {
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg.rowValid(i)){		
									sql.add("insert into rt_rumah_kbm (blok,nomor,kode_lokasi,nu,nopol,jenis,merk,warna,keterangan,foto,tgl_awal,tgl_akhir,flag_aktif) values "+
											"('"+this.cb_blok.getText()+"','"+this.e_nomor.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"','"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"','-',getdate(),'2099-12-31','1')");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from rt_rumah_m where blok='"+this.cb_blok.getText()+"' and nomor='"+this.e_nomor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from rt_rumah_d where blok='"+this.cb_blok.getText()+"' and nomor='"+this.e_nomor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from rt_rumah_kbm where blok='"+this.cb_blok.getText()+"' and nomor='"+this.e_nomor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																		
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_blok);	
					this.sg.clear(1);
					this.sg1.clear(1);
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
			if (sender == this.cb_rt && this.cb_rt.getText()!="") {				
				this.doLoad();
				this.cb_blok.setSQL("select blok,kode_pp from rt_blok where kode_lokasi='"+this.app._lokasi+"'",["blok","kode_pp"],false,["Blok","RT"],"and","Data Blok",true);
			}


			if ((sender == this.cb_blok || sender == this.e_nomor) && this.cb_blok.getText() != "" && this.e_nomor.getText() != ""){
				var strSQL = "select * from rt_rumah_m "+
						     "where blok ='"+this.cb_blok.getText()+"' and nomor='"+this.e_nomor.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[strSQL]}),true);				
				if (typeof data == "object"){
					var line = data.result[0].rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama_kk);
						this.c_jenis.setText(line.jenis);
						this.c_status.setText(line.status);

						var data = this.dbLib.getDataProvider(
									"select * "+
									"from rt_rumah_d "+									
									"where flag_aktif='1' and blok = '"+this.cb_blok.getText()+"' and nomor='"+this.e_nomor.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg.appendData([line.nama,line.alias,line.jk,line.no_hp,line.keterangan]);
							}
						} else this.sg.clear(1);
						
						
						var data = this.dbLib.getDataProvider(
									"select * "+
									"from rt_rumah_kbm "+									
									"where flag_aktif='1' and blok = '"+this.cb_blok.getText()+"' and nomor='"+this.e_nomor.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg1.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg1.appendData([line.nopol,line.jenis,line.merk,line.warna,line.keterangan]);
							}
						} else this.sg1.clear(1);


						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						this.sg.clear(1);
						this.sg1.clear(1);
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");														
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
			var strSQL = "select blok,nomor,nama_kk "+
						 "from rt_rumah_m "+					 
						 "order by blok,nomor";				
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
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg3.appendData([line.blok,line.nomor,line.nama_kk]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_blok.setText(this.sg3.cells(0,row));	
				this.e_nomor.setText(this.sg3.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}
});