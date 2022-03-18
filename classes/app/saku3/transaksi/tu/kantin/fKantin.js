window.app_saku3_transaksi_tu_kantin_fKantin = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kantin_fKantin.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kantin_fKantin";
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kantin", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Kantin","Data Kantin"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		            colTitle:["Kode Kantin","Nama","Alamat","Telp","PIC"],
					colWidth:[[4,3,2,1,0],[100,100,300,250,80]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Kode Kantin", maxLength:10, tag:0,change:[this,"doChange"]});

		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"Nama", maxLength:50, tag:1});
		this.e_telp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,300,20],caption:" No. Telp", maxLength:50, tag:1});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Alamat", maxLength:50, tag:1});
		this.cb_pic = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"PIC", maxLength:50, tag:1,multiSelection:false});
		this.cb_piutang = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Akun Piutang", maxLength:50, tag:1,multiSelection:false});
		this.cb_titipan = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Akun Titipan", maxLength:50, tag:1,multiSelection:false});
		this.cb_pdpt = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Akun Pendapatan", maxLength:50, tag:1,multiSelection:false});
		this.cb_bymhd = new saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Akun BYMHD", maxLength:50, tag:1,multiSelection:false});
		this.cb_beban = new saiCBBL(this.pc1.childPage[1],{bound:[20,19,220,20],caption:"Beban Sharing", maxLength:50, tag:1,multiSelection:false});

		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"PP / Unit", maxLength:50, tag:1,multiSelection:false});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
			
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			
			this.cb_pic.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data PIC",true);
			this.cb_piutang.setSQL("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode akun","Nama"],"and","Data Akun Kas Bank",false);
			this.cb_pdpt.setSQL("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode akun","Nama"],"and","Data Akun Kas Bank",false);
			this.cb_titipan.setSQL("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode akun","Nama"],"and","Data Akun Kas Bank",false);
			this.cb_bymhd.setSQL("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode akun","Nama"],"and","Data Akun Kas Bank",false);
			this.cb_beban.setSQL("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode akun","Nama"],"and","Data Akun Kas Bank",false);

			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",false);

			this.doLoad();			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_kantin_fKantin.extend(window.childForm);
window.app_saku3_transaksi_tu_kantin_fKantin.implement({
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
					sql.add("insert into ktu_kantin(kode_kantin,kode_lokasi,nama,pic,telp,alamat,akun_piutang,akun_titipan,akun_pdpt,akun_bymhd,akun_beban, kode_pp) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_pic.getText()+"','"+this.e_telp.getText()+"','"+this.e_alamat.getText()+"','"+this.cb_piutang.getText()+"','"+this.cb_titipan.getText()+"','"+this.cb_pdpt.getText()+"','"+this.cb_bymhd.getText()+"','"+this.cb_beban.getText()+"','"+this.cb_pp.getText()+"')");
					
					sql.add("INSERT INTO brg_gudang (kode_gudang, kode_lokasi, nama, pic, telp, alamat, kode_pp) VALUES "+
							"('"+this.cb_kode.getText()+"', '"+this.app._lokasi+"', '"+this.e_nama.getText()+"', '-', '-', '"+this.e_alamat.getText()+"', '"+this.cb_pp.getText()+"')");

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
					sql.add("delete from ktu_kantin where kode_kantin = '"+this.cb_kode.getText()+"' ");			
					sql.add("delete from brg_gudang where kode_gudang = '"+this.cb_kode.getText()+"' ");			

					sql.add("insert into ktu_kantin(kode_kantin,kode_lokasi,nama,pic,telp,alamat,akun_piutang,akun_titipan,akun_pdpt,akun_bymhd,akun_beban, kode_pp) values "+
							"	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.cb_pic.getText()+"','"+this.e_telp.getText()+"','"+this.e_alamat.getText()+"','"+this.cb_piutang.getText()+"','"+this.cb_titipan.getText()+"','"+this.cb_pdpt.getText()+"','"+this.cb_bymhd.getText()+"','"+this.cb_beban.getText()+"','"+this.cb_pp.getText()+"')");
							
					sql.add("INSERT INTO brg_gudang (kode_gudang, kode_lokasi, nama, pic, telp, alamat, kode_pp) VALUES "+
							"('"+this.cb_kode.getText()+"', '"+this.app._lokasi+"', '"+this.e_nama.getText()+"', '-', '-', '"+this.e_alamat.getText()+"', '"+this.cb_pp.getText()+"')");
		
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
					sql.add("delete from ktu_kantin where kode_kantin = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from brg_gudang where kode_gudang = '"+this.cb_kode.getText()+"' ");			
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
				var strSQL = "select * from ktu_kantin where kode_kantin ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);	
						this.e_telp.setText(line.telp);	
						this.e_alamat.setText(line.alamat);	
						this.cb_pic.setText(line.pic);
						this.cb_piutang.setText(line.akun_piutang);	
						this.cb_titipan.setText(line.akun_titipan);
						this.cb_pdpt.setText(line.akun_pdpt);
						this.cb_bymhd.setText(line.akun_bymhd);
						this.cb_beban.setText(line.akun_beban);
						this.cb_pp.setText(line.kode_pp);
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
		var strSQL = "select kode_kantin,nama,pic,telp,alamat from ktu_kantin where kode_lokasi='"+this.app._lokasi+"' ";		
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
			this.sg1.appendData([line.kode_kantin,line.nama,line.alamat,line.telp,line.pic]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
