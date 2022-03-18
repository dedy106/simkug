window.app_saku3_transaksi_dago_fPesan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dago_fPesan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dago_fPesan";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pesan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;uploader;util_file;image");
		uses("saiGrid",true);
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Pesan","Daftar Pesan"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["No. Pesan","Tanggal","Keterangan","Jenis"],
					colWidth:[[3,2,1,0],[150,300,150,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,20],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,20]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,400,20],caption:"Keterangan",tag:1});			
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Jenis", tag:1, items:["ALL","PAKET/JADWAL","JAMAAH"], change:[this,"doChange"]});	
		this.cb_paket = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Paket",tag:1,multiSelection:false, maxLength:10,change:[this,"doChange"]});
		this.cb_jadwal = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Jadwal", multiSelection:false, maxLength:10, tag:1});
		this.cb_jamaah = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Jamaah",tag:1,multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.bValid = new button(this.pc1.childPage[0],{bound:[875,15,80,18],caption:"Tampil Data",click:[this,"doCari"]});					

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,14,990,255], childPage:["Data Broadcast Pesan"]});				
		this.sg4 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,500,this.pc2.height-35],colCount:2,tag:1,
		            colTitle:["ID Jamaah","No. Handphone"],
					colWidth:[[1,0],[250,150]],
					columnReadOnly:[true,[0,1]],
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.e_memo = new saiMemo(this.pc2.childPage[0],{bound:[520,5,430,200],caption:"Catatan",tag:1,readOnly:true});				
		setTipeButton(tbSimpan);
		this.setTabChildIndex();

		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doLoad();
			this.cb_jamaah.setSQL("select no_peserta, nama from dgw_peserta where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["no_peserta","nama"],false,["No Jamaah","Nama"],"and","Data Jamaah",false);
			this.cb_paket.setSQL("select no_paket, nama from dgw_paket where kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["no_paket","nama"],false,["Kode","Nama"],"and","Data Paket",true);
			this.c_jenis.setText("ALL");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dago_fPesan.extend(window.childForm);
window.app_saku3_transaksi_dago_fPesan.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					this.nb = this.standarLib.noBuktiOtomatis(this.dbLib,"dgw_pesan_m","no_pesan",this.app._lokasi+"-MSG.","000000000");			

					sql.add("insert into dgw_pesan_m(no_pesan,kode_lokasi,tgl_input,nik_user,pesan,jenis,no_paket,no_jadwal,no_peserta,ket) values "+
							"('"+this.nb+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_memo.getText()+"','"+this.c_jenis.getText()+"','"+this.cb_paket.getText()+"','"+this.cb_jadwal.getText()+"','"+this.cb_jamaah.getText()+"','"+this.e_ket.getText()+"')");
					
					var line;
					for (var i=0;i < this.dataJU4.rs.rows.length;i++){
					line = this.dataJU4.rs.rows[i];
						sql.add("insert into dgw_pesan_d(no_pesan,no_peserta,kode_lokasi) values "+
										"('"+this.nb+"','"+line.no_peserta+"','"+this.app._lokasi+"')");
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
					
					sql.add("delete from dgw_reg where no_reg='"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from dgw_reg_dok where no_reg='"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");					
					sql.add("delete from dgw_reg_biaya where no_reg='"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");											
					
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1","2"),this.cb_kode);
				setTipeButton(tbSimpan);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.stsSimpan=1;
				this.sg4.clear(1);
				this.doLoad();
				break;
			case "simpan" :
			case "ubah" :	
				this.preView = "1";
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;						
			case "hapus" :	
				this.preView = "0";
				this.hapus();
				break;				
		}
	},
	doCari:function(sender){								
		this.pc1.setActivePage(this.pc1.childPage[0]);

		if(this.c_jenis.getText()=="PAKET/JADWAL"){
			var strSQL = "select a.no_peserta, a.hp "+
						 "from  dgw_peserta a "+
						 "inner join dgw_reg b on a.no_peserta = b.no_peserta and a.kode_lokasi=b.kode_lokasi "+
						 "where b.no_paket='"+this.cb_paket.getText()+"' and b.no_jadwal ='"+this.cb_jadwal.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "
		}
		if(this.c_jenis.getText()=="JAMAAH"){
			var strSQL = "select no_peserta, hp from dgw_peserta where no_peserta='"+this.cb_jamaah.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "
		}
		if(this.c_jenis.getText()=="ALL"){
			var strSQL = "select no_peserta, hp from dgw_peserta where kode_lokasi='"+this.app._lokasi+"' "
		}

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU4 = data;
			this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn4.rearrange();
			this.doTampilData4(1);
		} else this.sg4.clear(1);
	},

	doTampilData4: function(page) {
		this.sg4.clear();
		var line2;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU4.rs.rows.length? this.dataJU4.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line2 = this.dataJU4.rs.rows[i];													
			this.sg4.appendData([line2.no_peserta,line2.hp]); 
		}
		this.sg4.setNoUrut(start);
	},

	doPager4: function(sender, page) {
		this.doTampilData4(page);
	},

	doChange: function(sender){	
		try{	
			if (sender == this.cb_paket && this.cb_paket.getText() != "") {
				this.cb_jadwal.setSQL("select no_jadwal, convert(varchar,tgl_berangkat,103) as tgl_berangkat from dgw_jadwal where no_paket='"+this.cb_paket.getText()+"' and kode_lokasi='"+this.app._lokasi+"' union select '-','-' ",["no_jadwal","tgl_berangkat"],false,["ID Jadwal","Jadwal"],"and","Data Jadwal",true);
			}
			if(sender == this.c_jenis && this.c_jenis.getText() != ""){
				if(this.c_jenis.getText()=="ALL"){
					this.cb_paket.setReadOnly(true);
					this.cb_paket.setTag("9");
					this.cb_paket.setText("");

					this.cb_jadwal.setReadOnly(true);
					this.cb_jadwal.setTag("9");
					this.cb_jadwal.setText("");

					this.cb_jamaah.setReadOnly(true);
					this.cb_jamaah.setTag("9");
					this.cb_jamaah.setText("");
				}

				if(this.c_jenis.getText()=="PAKET/JADWAL"){
					this.cb_paket.setReadOnly(false);
					this.cb_paket.setTag("9");
					this.cb_paket.setText("");

					this.cb_jadwal.setReadOnly(false);
					this.cb_jadwal.setTag("9");
					this.cb_jadwal.setText("");
					this.cb_jamaah.setReadOnly(true);
					this.cb_jamaah.setTag("9");
					this.cb_jamaah.setText("");
				}
				if(this.c_jenis.getText()=="JAMAAH"){
					this.cb_paket.setReadOnly(true);
					this.cb_paket.setTag("9");
					this.cb_paket.setText("");

					this.cb_jadwal.setReadOnly(true);
					this.cb_jadwal.setTag("9");
					this.cb_jadwal.setText("");

					this.cb_jamaah.setReadOnly(false);
					this.cb_jamaah.setTag("9");
					this.cb_jamaah.setText("");
				}
			}
		}catch(e){
				systemAPI.alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbAllFalse);
				this.nb = this.sg1.cells(0,row);
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.dp_d1.setText(this.sg1.cells(1,row));
				this.e_ket.setText(this.sg1.cells(2,row));
				this.c_jenis.setText(this.sg1.cells(3,row));				
			}

			var strSQL = "select no_paket,no_jadwal,no_peserta,pesan from dgw_pesan_m where no_pesan ='"+this.nb+"' and kode_lokasi='"+this.app._lokasi+"' ";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){	
					this.cb_paket.setText(line.no_paket);
					this.cb_jadwal.setText(line.no_jadwal);
					this.cb_jamaah.setText(line.no_peserta);
					this.e_memo.setText(line.pesan);
				}
			}
			var strSQL = "select a.no_peserta, b.hp "+
						 "from dgw_pesan_d a "+
						 "inner join dgw_peserta b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_pesan ='"+this.nb+"' and a.kode_lokasi='"+this.app._lokasi+"' ";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];			
					this.sg4.appendData([line.no_peserta,line.hp]);
				}
			}

		} catch(e) 
		{
			alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi.");							
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
		try {			
			var strSQL = "select no_pesan, tgl_input, ket, jenis from dgw_pesan_m where kode_lokasi = '"+this.app._lokasi+"' ";								
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
			this.sg1.appendData([line.no_pesan,line.tgl_input,line.ket,line.jenis]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});