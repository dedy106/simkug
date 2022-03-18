window.app_saku3_transaksi_dkm_fMuzaki = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dkm_fMuzaki.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dkm_fMuzaki";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Muzaki", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Muzaki","Data Muzaki","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:9,
		            colTitle:["Kode","Nama","Alamat","Status"],
					colWidth:[[3,2,1,0],[100,300,200,80]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,180,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});	
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Alamat", maxLength:150, tag:1});					
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"No Telpon", maxLength:50, tag:1});							
		this.e_mail = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,250,20],caption:"Email", maxLength:50, tag:1});	
		this.e_bank = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,250,20],caption:"Bank", maxLength:50, tag:1});			
		this.e_cabang = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"Cabang", maxLength:100, tag:1});			
		this.e_norek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,250,20],caption:"No Rekening", maxLength:50, tag:1});			
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,500,20],caption:"Nama Rekening", maxLength:50, tag:1});									
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,22,202,20],caption:"Jenis",items:["ANGGOTA","UMUM"], readOnly:true,tag:2});	
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[320,22,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});	
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,510,175],colCount:3,tag:0,
				colTitle:["Kode","Nama","Nilai"],
				colWidth:[[2,1,0],[100,250,80]],
				columnReadOnly:[true,[0,1],[2]],				
				colFormat:[[2],[cfNilai]],								
				change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],
				defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,510,25],buttonStyle:3,grid:this.sg2});
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
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
									
			this.onClose.set(this,"doClose");
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
			
			this.doLoad();
			
			var strSQL = "select kode_zis,nama,0 as nilai from dkm_zis where kode_lokasi='"+this.app._lokasi+"' order by kode_zis";				
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_zis,line.nama,floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dkm_fMuzaki.extend(window.childForm);
window.app_saku3_transaksi_dkm_fMuzaki.implement({
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
					sql.add("insert into dkm_muzaki(kode_muzaki,kode_lokasi,nama,alamat,no_tel,email,bank,cabang,no_rek,nama_rek,nilai,jenis) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_mail.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"',"+this.e_nilai.getText()+",'"+this.c_jenis.getText()+"')");
					
					for (var i = 0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i) && this.sg2.cells(2,i) != ""){
							sql.add("insert into dkm_muzaki_d(kode_muzaki,kode_zis,kode_lokasi,nilai) values "+
									"('"+this.cb_kode.getText()+"','"+this.sg2.cells(0,i)+"','"+this.app._lokasi+"',"+nilaiToFloat(this.sg2.cells(2,i))+")");
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
					sql.add("delete from dkm_muzaki where kode_muzaki='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from dkm_muzaki_d where kode_muzaki='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					sql.add("insert into dkm_muzaki(kode_muzaki,kode_lokasi,nama,alamat,no_tel,email,bank,cabang,no_rek,nama_rek,nilai,jenis) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_mail.getText()+"','"+this.e_bank.getText()+"','"+this.e_cabang.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"',"+this.e_nilai.getText()+",'"+this.c_jenis.getText()+"')");
					for (var i = 0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i) && this.sg2.cells(2,i) != ""){
							sql.add("insert into dkm_muzaki_d(kode_muzaki,kode_zis,kode_lokasi,nilai) values "+
									"('"+this.cb_kode.getText()+"','"+this.sg2.cells(0,i)+"','"+this.app._lokasi+"',"+nilaiToFloat(this.sg2.cells(2,i))+")");
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
					sql.add("delete from dkm_muzaki where kode_muzaki='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from dkm_muzaki_d where kode_muzaki='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
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
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select kode_zis,nama,0 as nilai from dkm_zis where kode_lokasi='"+this.app._lokasi+"' order by kode_zis";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kode_zis,line.nama,floatToNilai(line.nilai)]);
					}
				} else this.sg2.clear(1);
				
				var strSQL = "select kode_muzaki,nama,alamat,no_tel,email,bank,cabang,no_rek,nama_rek,nilai,jenis "+
				             "from dkm_muzaki "+
						     "where kode_muzaki ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_tel);						
						this.e_mail.setText(line.email);						
						this.e_bank.setText(line.bank);
						this.e_cabang.setText(line.cabang);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.e_nilai.setText(floatToNilai(line.nilai));						
						this.c_jenis.setText(line.jenis);						
						setTipeButton(tbUbahHapus);
						
						var strSQL = "select a.kode_zis,a.nama,isnull(b.nilai,0) as nilai from dkm_zis a left join dkm_muzaki_d b on a.kode_zis=b.kode_zis and a.kode_lokasi=b.kode_lokasi  and b.kode_muzaki='"+this.cb_kode.getText()+"' "+
						             "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_zis";				
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg2.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sg2.appendData([line.kode_zis,line.nama,floatToNilai(line.nilai)]);
							}
						} else this.sg2.clear(1);
					}
					else setTipeButton(tbSimpan);
				}
				else setTipeButton(tbSimpan);								
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Muzaki",sender,undefined, 
											  "select kode_muzaki, nama  from dkm_muzaki where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_muzaki) from dkm_muzaki where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_muzaki","nama"],"and",["Kode","Nama"],false);				
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
							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";
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
			if (this.e_kode2.getText() != "") var filter = " a.kode_muzaki like '%"+this.e_kode2.getText()+"%' and ";
			else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' and ";
			
			var strSQL = "select a.kode_muzaki,a.nama,a.alamat,a.jenis "+
						 "from dkm_muzaki a "+					 
						 "where "+filter+" a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_muzaki";				
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
			var strSQL = "select a.kode_muzaki,a.nama,a.alamat,a.jenis "+
						 "from dkm_muzaki a "+					 
						 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_muzaki";				
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
			this.sg1.appendData([line.kode_muzaki,line.nama,line.alamat,line.jenis]); 
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
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	},
	doNilaiChange2: function(){
		try{
			var tot = 0;			
			for (var i = 0;i < this.sg2.getRowCount();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(2,i) != ""){
					tot += nilaiToFloat(this.sg2.cells(2,i));
				}
			}						
			this.e_nilai.setText(floatToNilai(tot));					
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doChangeCell2: function(sender, col, row){
		if (col == 2 && this.sg2.cells(2,row) != "") this.sg2.validasi();			
	}
});