window.app_saku3_transaksi_rtrw_versi2_fWargaIn = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rtrw_versi2_fWargaIn.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rtrw_versi2_fWargaIn";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Warga Masuk", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,480], childPage:["Data Baru","Daftar Masuk","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
			        colTitle:["N I K","Nama","No Rumah","No Masuk","No Keluar"],
					colWidth:[[4,3,2,1,0],[100,100,100,200,120]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});		

		this.cb_rumah = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"No Rumah", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});				
		this.e_pemilik = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,500,20],caption:"Pemilik",readOnly:true, tag:1});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,500,20],caption:"Alamat Pemilik",readOnly:true, tag:1});
		this.e_rt = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,500,20],caption:"RT - RW",readOnly:true, tag:1});

		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Masuk", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,100,18]}); 								
		this.c_stsin = new saiCB(this.pc1.childPage[0],{bound:[20,29,200,20],caption:"Status Masuk",items:["DATANG","LAHIR"], readOnly:true,tag:2});
		this.cb_nik = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"NIK Penghuni", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});				
		this.e_status = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Status Keluarga",readOnly:true, tag:1});

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,2,995,262], childPage:["Data Penghuni"]});
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,345],colCount:5,tag:9,
				colTitle:["No Masuk","Tgl Masuk","N I K","Nama","Sts Keluarga"],
				colWidth:[[4,3,2,1,0],[100,300,100,80,100]],
				readOnly:true,				
				defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});

		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"N I K",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.tahun = line.tahun;
				} 
			}	

			this.cb_rumah.setSQL("select a.kode_rumah, a.alamat from rt_rumah a inner join karyawan_pp b on a.rt=b.kode_pp and a.rw=b.kode_lokasi "+
								 "where b.nik='"+this.app._userLog+"' and b.kode_lokasi='"+this.app._lokasi+"'",["kode_rumah","alamat"],false,["No Rumah","Alamat"],"and","Data Rumah",true);			
			
			//yg belum meninggal left join ke rt_warga_out and status = meninggal
			this.cb_nik.setSQL("select nik,nama from rt_warga",["nik","nama"],false,["NIK","Nama"],"where","Data Warga",true);			
												
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rtrw_versi2_fWargaIn.extend(window.childForm);
window.app_saku3_transaksi_rtrw_versi2_fWargaIn.implement({
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
					var nb = this.standarLib.noBuktiOtomatis(this.dbLib,"rt_warga_in","no_masuk",this.app._lokasi+"-IN"+this.tahun+".","0000");
					sql.add("insert into rt_warga_in (no_masuk,tanggal,kode_lokasi,kode_rumah,nik,sts_masuk,no_keluar,tgl_input,nik_user) values "+
						    "('"+nb+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.cb_rumah.getText()+"','"+this.cb_nik.getText()+"','"+this.c_stsin.getText()+"','-',getdate(),'"+this.app._userLog+"')");
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
					sql.add("delete from rt_warga_in where no_masuk='"+this.noIN+"' ");					
					sql.add("insert into rt_warga_in (no_masuk,tanggal,kode_lokasi,kode_rumah,nik,sts_masuk,no_keluar,tgl_input,nik_user) values "+
						    "('"+this.noIN+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.cb_rumah.getText()+"','"+this.cb_nik.getText()+"','"+this.c_stsin.getText()+"','-',getdate(),'"+this.app._userLog+"')");
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
					sql.add("delete from rt_warga_in where no_masuk='"+this.noIN+"' ");					
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
					this.sg1.clear(1);
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :	
				var strSQL = "select no_masuk from rt_warga_in where nik='"+this.cb_nik.getText()+"' and kode_rumah='"+this.cb_rumah.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];												
					system.alert(this,"Transaksi tidak valid.","NIK sudah terdaftar di rumah tersebut.["+line.no_masuk+"]");
					return false;
				}
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				var strSQL = "select no_masuk from rt_warga_in where nik='"+this.cb_nik.getText()+"' and kode_rumah='"+this.cb_rumah.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_masuk <> '"+this.noIN+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];												
					system.alert(this,"Transaksi tidak valid.","NIK sudah terdaftar di rumah tersebut.["+line.no_masuk+"]");
					return false;
				}
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_rumah && this.cb_rumah.getText() != ""){
				var strSQL = "select b.nik+' | '+b.nama as pemilik, b.no_hp+' | '+b.alamat as alamat,'RT : '+a.rt+' / RW : '+a.rw as rtrw from rt_rumah a inner join rt_warga b on a.kode_pemilik=b.nik where a.kode_rumah='"+this.cb_rumah.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];												
					this.e_pemilik.setText(line.pemilik);						
					this.e_alamat.setText(line.alamat);	
					this.e_rt.setText(line.rtrw.toUpperCase());						
				}

				var strSQL = "select a.no_masuk,convert(varchar,a.tanggal,103) as tanggal,b.nik,b.nama,b.sts_keluarga,b.tgl_lahir "+
							 "from rt_warga_in a inner join rt_warga b on a.nik=b.nik "+
							 "where a.no_keluar='-' and a.kode_rumah='"+this.cb_rumah.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							 "order by b.tgl_lahir";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg2.appendData([line.no_masuk,line.tanggal,line.nik,line.nama,line.sts_keluarga]);
					}
				} else this.sg2.clear(1);	

			}

			if (sender == this.cb_nik && this.cb_nik.getText() != ""){
				var strSQL = "select sts_keluarga from rt_warga where nik='"+this.cb_nik.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];												
					this.e_status.setText(line.sts_keluarga);						
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_nik.getText()+")");	
							this.doChange(this.cb_rumah);													
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
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") var filter = " b.nik like '%"+this.e_kode2.getText()+"%' and ";
			else var filter = " b.nama like '%"+this.e_nama2.getText()+"%' and ";
			
				var strSQL = "select b.nik,b.nama,a.kode_rumah,a.no_masuk,a.no_keluar "+
						 "from rt_warga_in a "+
						 "inner join rt_warga b on a.nik=b.nik "+
						 "inner join rt_rumah c on a.kode_rumah=c.kode_rumah and a.kode_lokasi=c.kode_lokasi "+
						 "inner join karyawan_pp d on c.rt=d.kode_pp and c.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
						 "where "+filter+" a.kode_lokasi='"+this.app._lokasi+"' and a.no_keluar='-' "+					 
						 "order by a.no_masuk";					
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[1]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {
			var strSQL = "select b.nik,b.nama,a.kode_rumah,a.no_masuk,a.no_keluar "+
						 "from rt_warga_in a "+
						 "inner join rt_warga b on a.nik=b.nik "+
						 "inner join rt_rumah c on a.kode_rumah=c.kode_rumah and a.kode_lokasi=c.kode_lokasi "+
						 "inner join karyawan_pp d on c.rt=d.kode_pp and c.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_keluar='-' "+					 
						 "order by a.no_masuk";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[1]);
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
		var fino_aggh = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<fino_aggh;i++){
			line = this.dataJU.rs.rows[i];																			
			this.sg1.appendData([line.nik,line.nama,line.kode_rumah,line.no_masuk,line.no_keluar]); 
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
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.noIN = this.sg1.cells(3,row);		


				var strSQL = "select * from rt_warga_in where no_masuk='"+this.noIN+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];		
					this.cb_rumah.setText(line.kode_rumah);					
					this.cb_nik.setText(line.nik);
					this.dp_d1.setText(line.tanggal);
					this.c_stsin.setText(line.sts_masuk);
				}

			}
		} catch(e) {alert(e);}
	}
});